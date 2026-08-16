// Pet client render regression test: catches render-time runtime errors (TDZ, typos...)
// 发布前必跑：npm test（package.json 的 prepublishOnly 会自动调用）
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '..', 'lib', 'client.js'), 'utf8');

// ---- stub browser/module environment ----
global.window = { __ModuleLoader__: { load: (handoff) => { global.__handoff = handoff; } } };
// no global.document → CSS injection skipped via typeof check

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

// ---- stub slots service + run apply to capture the component ----
let injectCb = null;
let registered = null;
const fakeSlots = {
  inject: (name, cb) => { injectCb = cb; },
  register: (opts, comp) => { registered = comp; return comp; },
};
const fakeCtx = { get: (name) => (name === 'slots' ? fakeSlots : undefined) };
apply(fakeCtx);
if (!injectCb) { console.error('FAIL: slots.inject not called'); process.exit(1); }
injectCb();
if (!registered) { console.error('FAIL: slots.register not called'); process.exit(1); }

// ---- render the pet component (one pass) ----
try {
  resetHooks();
  registered();
  console.log('OK: component rendered without error');
  for (const eff of hookStore.effects) console.log('    effect deps:', JSON.stringify(eff.deps));
} catch (e) {
  console.error('FAIL render:', e.name, e.message);
  process.exit(1);
}
process.exit(0);
