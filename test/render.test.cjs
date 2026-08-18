// Pet client render regression test: catches render-time runtime errors (TDZ, typos...)
// 发布前必跑：npm test（package.json 的 prepublishOnly 会自动调用）
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '..', 'lib', 'client.js'), 'utf8');

// ---- stub browser/module environment ----
global.window = { __ModuleLoader__: { load: (handoff) => { global.__handoff = handoff; } } };
// no global.document/localStorage → CSS injection & pref read fall back safely

// ---- stub React ----
const hookStore = { effects: [], state: [], refs: [] };
let cursor = 0;
function resetHooks() {
  cursor = 0;
  hookStore.effects = [];
  hookStore.state = [];
  hookStore.refs = [];
}
const React = {
  createElement: (type, props, ...children) => {
    if (typeof type === 'function') return type(props);
    return { type, props: props || null, children };
  },
  useState: (initial) => {
    const i = cursor++;
    if (hookStore.state[i] === undefined) hookStore.state[i] = initial;
    return [hookStore.state[i], (v) => { hookStore.state[i] = typeof v === 'function' ? v(hookStore.state[i]) : v; }];
  },
  useEffect: (fn, deps) => { hookStore.effects.push({ fn, deps }); },
  useRef: (initial) => {
    const i = cursor++;
    if (!hookStore.refs[i]) hookStore.refs[i] = { current: initial };
    return hookStore.refs[i];
  },
  useReducer: (reducer, init) => {
    const i = cursor++;
    if (hookStore.state[i] === undefined) hookStore.state[i] = typeof init === 'function' ? init() : init;
    return [hookStore.state[i], () => {}];
  },
};

// ---- execute the bundle factory ----
global.__handoff = null;
let factoryError = null;
let apply;
let inject;
try {
  new Function(src)();
  const handoff = global.__handoff;
  if (!handoff) throw new Error('bundle did not register via __ModuleLoader__.load');
  const m = { exports: {} };
  const result = handoff.factory((spec) => {
    if (spec === 'react') return React;
    throw new Error('unexpected require: ' + spec);
  });
  apply = result.apply;
  inject = result.inject;
} catch (e) {
  factoryError = e;
}

if (factoryError) {
  console.error('FAIL factory:', factoryError.message);
  process.exit(1);
}
if (typeof apply !== 'function' || !Array.isArray(inject)) {
  console.error('FAIL: bundle exports invalid apply/inject');
  process.exit(1);
}

// ---- stub slots service + run apply, collect ALL registrations ----
const injectCbs = [];
const registrations = [];
const fakeSlots = {
  inject: (name, cb) => { injectCbs.push(cb); },
  register: (opts, comp) => { registrations.push({ opts, comp }); return comp; },
};
const fakeCtx = { get: (name) => (name === 'slots' ? fakeSlots : undefined) };
apply(fakeCtx);
if (injectCbs.length === 0) { console.error('FAIL: slots.inject never called'); process.exit(1); }
injectCbs.forEach((cb) => cb());
if (registrations.length === 0) { console.error('FAIL: no slot registered'); process.exit(1); }

// ---- render every registered component (one pass each) ----
let failed = false;
for (const { opts, comp } of registrations) {
  try {
    resetHooks();
    comp();
    console.log('OK render:', opts.name, '[' + opts.id + ']', 'hooks:', hookStore.state.length + 's/' + hookStore.effects.length + 'e');
    for (const eff of hookStore.effects) console.log('    effect deps:', JSON.stringify(eff.deps));
  } catch (e) {
    failed = true;
    console.error('FAIL render:', opts.name, '[' + opts.id + ']', e.name, e.message);
  }
}
process.exit(failed ? 1 : 0);
