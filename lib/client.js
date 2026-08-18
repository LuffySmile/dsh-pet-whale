window.__ModuleLoader__.load({
	id: "dsh-pet-whale",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let React = require("react");

		const CSS = `
.dshpet-root {
  position: fixed;
  z-index: 9999;
  pointer-events: auto;
  user-select: none;
  -webkit-user-select: none;
  cursor: grab;
  touch-action: none;
}
.dshpet-root.dragging { cursor: grabbing; }
.dshpet-pos-0 { right: 22px; bottom: 22px; }
.dshpet-pos-1 { left: 22px; bottom: 22px; }
.dshpet-pos-2 { left: 22px; top: 22px; }
.dshpet-pos-3 { right: 22px; top: 22px; }

.dshpet-mover { width: 100%; height: 100%; will-change: transform; }
.dshpet-roaming { left: 0 !important; top: 0 !important; right: auto !important; bottom: auto !important; }

.dshpet-scene {
  width: 75px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dshpet-svg { width: 66px; height: 66px; overflow: visible; }

/* 休息时朝屏幕内侧：右下/右上 → 头朝左；左下/左上 → 头朝右 */
.dshpet-f-left .dshpet-svg {
  transform: scaleX(-1);
  transform-box: view-box;
  transform-origin: 50% 50%;
}

.dshpet-body, .dshpet-tail, .dshpet-fin { fill: url(#dshpet-grad); }
.dshpet-belly { fill: rgba(255,255,255,0.32); }
.dshpet-mouth { fill: none; stroke: #0d4038; stroke-width: 0.5; stroke-linecap: round; opacity: 0.45; }
.dshpet-eye-white { fill: #ffffff; }
.dshpet-eye-pupil { fill: #0d4038; }
.dshpet-eye-close { fill: none; stroke: #0d4038; stroke-width: 1.1; stroke-linecap: round; }

/* 尾巴摆动 + 胸鳍拍动：绕根部旋转，纯 CSS 驱动 */
.dshpet-tail-g {
  transform-box: view-box;
  transform-origin: 12.6px 29.8px;
  animation: dshpet-tail-wag 0.9s ease-in-out infinite;
}
.dshpet-fin-g {
  transform-box: view-box;
  transform-origin: 22px 33px;
  animation: dshpet-fin-wag 1.8s ease-in-out infinite;
}
@keyframes dshpet-tail-wag {
  0%, 100% { transform: rotate(20deg); }
  50% { transform: rotate(-20deg); }
}
@keyframes dshpet-fin-wag {
  0%, 100% { transform: rotate(-6deg); }
  50% { transform: rotate(10deg); }
}
.dshpet-whale-thinking .dshpet-tail-g { animation-duration: 1.6s; }
.dshpet-whale-working .dshpet-tail-g { animation-duration: 0.55s; }
.dshpet-whale-spraying .dshpet-tail-g { animation-duration: 0.7s; }
.dshpet-whale-idle .dshpet-tail-g,
.dshpet-whale-idle .dshpet-fin-g { animation: none; }

.dshpet-water { fill: rgba(255,255,255,0.32); transform-origin: 50% 50%; animation: dshpet-wave 3.2s ease-in-out infinite; }
.dshpet-bubble { fill: rgba(255,255,255,0.6); animation: dshpet-bubble-rise 2.6s ease-in infinite; }
.dshpet-bubble-fast { animation-duration: 1.6s; }
.dshpet-z { fill: #d7fff4; animation: dshpet-zzz 3s ease-out infinite; }
.dshpet-jet { fill: rgba(190,245,235,0.92); transform-origin: 50% 100%; animation: dshpet-jet 0.8s ease-in-out infinite; }
.dshpet-plume { transform-origin: 50% 100%; animation: dshpet-plume 0.8s ease-in-out infinite; }
.dshpet-plume path { fill: rgba(190,245,235,0.72); }
.dshpet-spray { transform-box: view-box; transform-origin: 40.5px 14px; animation: dshpet-sway 2.4s ease-in-out infinite; }
.dshpet-drop { fill: rgba(190,245,235,0.95); animation: dshpet-drop 0.8s ease-out infinite; }

.dshpet-whale-thinking { transform-origin: 50% 62%; animation: dshpet-swim 3.4s ease-in-out infinite; }
.dshpet-whale-idle { transform-origin: 50% 58%; animation: dshpet-breathe 4.4s ease-in-out infinite; }
.dshpet-whale-working { transform-origin: 50% 62%; animation: dshpet-busy 1.2s ease-in-out infinite; }
.dshpet-whale-spraying { transform-origin: 50% 62%; animation: dshpet-busy 0.9s ease-in-out infinite; }

@keyframes dshpet-swim {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(-2.5deg); }
}
@keyframes dshpet-breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}
@keyframes dshpet-busy {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  30% { transform: translateY(-2.5px) rotate(-1.2deg); }
  60% { transform: translateY(-0.8px) rotate(0.8deg); }
}
@keyframes dshpet-wave {
  0%, 100% { transform: scaleX(1); opacity: 0.5; }
  50% { transform: scaleX(1.1); opacity: 0.85; }
}
@keyframes dshpet-bubble-rise {
  0% { transform: translateY(0); opacity: 0; }
  15% { opacity: 0.85; }
  100% { transform: translateY(-18px); opacity: 0; }
}
@keyframes dshpet-zzz {
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  25% { opacity: 0.95; }
  100% { transform: translateY(-9px) rotate(-10deg); opacity: 0; }
}
@keyframes dshpet-jet {
  0%, 100% { transform: scaleY(0.65); opacity: 0.8; }
  50% { transform: scaleY(1.05); opacity: 1; }
}
@keyframes dshpet-plume {
  0%, 100% { transform: scaleY(0.7); opacity: 0.6; }
  50% { transform: scaleY(1.1); opacity: 1; }
}
@keyframes dshpet-sway {
  0%, 100% { transform: rotate(-2.5deg); }
  50% { transform: rotate(2.5deg); }
}
@keyframes dshpet-drop {
  0% { transform: translate(0, 0); opacity: 0; }
  15% { opacity: 1; }
  100% { transform: translate(var(--dx, 3px), var(--dy, -16px)); opacity: 0; }
}

/* 状态气泡：独立 fixed 固定在屏幕右下角上方，不跟随鲸鱼，常驻显示 */
.dshpet-bubble {
  position: fixed;
  right: 22px;
  bottom: 150px;
  width: 178px;
  background: rgba(8, 36, 38, 0.94);
  color: #eef1ff;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  padding: 8px 10px;
  font-size: 11.5px;
  line-height: 1.45;
  box-shadow: 0 8px 22px rgba(0,0,0,0.35);
  pointer-events: auto;
  font-family: system-ui, -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  z-index: 100;
}
.dshpet-bubble-head { display: flex; align-items: center; gap: 5px; font-weight: 600; margin-bottom: 2px; }
.dshpet-bubble-emoji { font-size: 13px; }
.dshpet-bubble-title { font-size: 12px; flex: 1; }
.dshpet-bubble-close {
  border: none; cursor: pointer; background: none; color: rgba(238,241,255,0.7);
  font-size: 14px; line-height: 1; padding: 1px 4px; border-radius: 6px; font-family: inherit;
}
.dshpet-bubble-close:hover { background: rgba(255,255,255,0.14); color: #fff; }
.dshpet-bubble-detail { font-size: 11px; opacity: 0.82; }
.dshpet-bubble-actions { display: flex; gap: 8px; margin-top: 6px; }
.dshpet-btn {
  border: none; cursor: pointer; color: #fff;
  background: var(--pet-accent, #0e8ea6);
  border-radius: 7px; padding: 3px 9px; font-size: 11px;
  font-family: inherit;
}
.dshpet-btn:hover { filter: brightness(1.12); }
.dshpet-btn.ghost { background: rgba(255,255,255,0.14); }

.dshpet-restore {
  position: fixed; right: 20px; bottom: 20px;
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: var(--pet-accent, #0e8ea6); color: #fff; font-size: 15px;
  box-shadow: 0 5px 14px rgba(0,0,0,0.3);
  cursor: pointer; z-index: 9999; pointer-events: auto;
  transition: transform 0.15s ease;
}
.dshpet-restore:hover { transform: scale(1.08); }

/* 设置页：桌面宠物 */
.dshpet-settings {
  font-family: system-ui, -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
}
.dshpet-settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 6px 2px;
}
.dshpet-settings-title { font-size: 14px; font-weight: 600; }
.dshpet-settings-desc { font-size: 12px; opacity: 0.7; margin-top: 3px; }
.dshpet-settings-note { font-size: 11.5px; opacity: 0.55; margin-top: 10px; }
.dshpet-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  flex: none;
}
.dshpet-switch input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.dshpet-switch-slider {
  width: 40px;
  height: 22px;
  border-radius: 11px;
  background: rgba(128,128,128,0.4);
  transition: background 0.2s ease;
  position: relative;
}
.dshpet-switch-slider::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.2s ease;
}
.dshpet-switch input:checked + .dshpet-switch-slider { background: var(--pet-accent, #0e8ea6); }
.dshpet-switch input:checked + .dshpet-switch-slider::after { transform: translateX(18px); }

/* 设置页：颜色色盘 */
.dshpet-settings-color { margin-top: 16px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); }
.dshpet-settings-swatches { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 10px; }
.dshpet-swatch {
  width: 26px; height: 26px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.28);
  cursor: pointer; padding: 0;
  transition: transform 0.12s ease, border-color 0.12s ease, box-shadow 0.12s ease;
}
.dshpet-swatch:hover { transform: scale(1.12); }
.dshpet-swatch.active {
  transform: scale(1.15);
  border-color: #fff;
  box-shadow: 0 0 0 3px rgba(0,0,0,0.35);
}
.dshpet-settings-custom { display: flex; align-items: center; gap: 10px; margin-top: 12px; }
.dshpet-settings-custom-label { font-size: 12px; opacity: 0.75; }
.dshpet-settings-custom input[type="color"] {
  width: 36px; height: 28px; padding: 1px;
  border: 1px solid rgba(255,255,255,0.28);
  border-radius: 6px; background: none; cursor: pointer;
}

/* 全屏海洋：执行任务时覆盖屏幕下 2/3；pointer-events:none 点击穿透，不挡操作 */
.dshpet-ocean {
  position: fixed;
  left: 0;
  right: 0;
  top: 33.3%;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.9s ease;
  background:
    radial-gradient(ellipse at 50% -12%, rgba(160,220,230,0.2), rgba(0,0,0,0) 55%),
    linear-gradient(180deg, rgba(35,150,215,0.2), rgba(14,120,160,0.28) 45%, rgba(10,95,115,0.34) 72%, rgba(16,82,72,0.36));
}
.dshpet-ocean-on { opacity: 1; }

/* 海面波浪线 */
.dshpet-ocean-surface {
  position: absolute;
  top: -2px;
  left: 0;
  right: 0;
  height: 18px;
  overflow: hidden;
}
.dshpet-ocean-wave {
  position: absolute;
  left: 0;
  top: 0;
  width: 200%;
  height: 18px;
  animation: dshpet-wave-scroll 6s linear infinite;
}
.dshpet-ocean-wave-2 { top: 5px; animation-duration: 9s; animation-direction: reverse; }
@keyframes dshpet-wave-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* 光柱 */
.dshpet-ocean-ray {
  position: absolute;
  top: -12%;
  left: 6%;
  width: 20vw;
  height: 135%;
  background: linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0));
  transform: rotate(18deg);
  animation: dshpet-ray 8s ease-in-out infinite;
}
.dshpet-ocean-ray-2 { left: 34%; width: 14vw; animation-delay: 2.6s; }
.dshpet-ocean-ray-3 { left: 66%; width: 18vw; animation-delay: 5.2s; }
@keyframes dshpet-ray {
  0%, 100% { opacity: 0.3; transform: rotate(18deg) translateX(0); }
  50% { opacity: 0.75; transform: rotate(18deg) translateX(2.5vw); }
}

/* 上升气泡 */
.dshpet-ocean-bubble {
  position: absolute;
  bottom: -8vh;
  border-radius: 50%;
  background: rgba(255,255,255,0.32);
  box-shadow: inset 0 -1px 2px rgba(255,255,255,0.5);
  animation: dshpet-ocean-bubble 9s linear infinite;
}
@keyframes dshpet-ocean-bubble {
  0% { transform: translateY(0); opacity: 0; }
  8% { opacity: 0.65; }
  90% { opacity: 0.3; }
  100% { transform: translateY(-80vh); opacity: 0; }
}

/* 底部波光 */
.dshpet-ocean-sheen {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 24%;
  background: repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0 60px, rgba(255,255,255,0) 60px 130px);
  animation: dshpet-sheen 14s linear infinite;
}
@keyframes dshpet-sheen {
  0% { transform: translateX(0); }
  100% { transform: translateX(-130px); }
}

/* 海底：海藻 */
.dshpet-ocean-floor { position: absolute; inset: 0; }
.dshpet-seaweed {
  position: absolute;
  bottom: -4px;
  transform-origin: 50% 100%;
  animation: dshpet-seaweed-sway 4.6s ease-in-out infinite alternate;
}
.dshpet-seaweed svg { width: 100%; height: auto; display: block; }
@keyframes dshpet-seaweed-sway {
  0% { transform: rotate(-3.5deg); }
  100% { transform: rotate(3.5deg); }
}

/* 海底：小鱼（贴底游过，方向/速度各异） */
.dshpet-fish { position: absolute; animation: dshpet-fish-swim 26s linear infinite; }
.dshpet-fish svg { width: 100%; height: auto; display: block; animation: dshpet-fish-bob 3s ease-in-out infinite; }
.dshpet-fish-rev { animation-direction: reverse; }
.dshpet-fish-rev .dshpet-fish-flip { transform: scaleX(-1); }
@keyframes dshpet-fish-swim {
  0% { transform: translateX(-12vw); }
  100% { transform: translateX(112vw); }
}
@keyframes dshpet-fish-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

/* 海底：小虾（原地小步挪动） */
.dshpet-shrimp { position: absolute; animation: dshpet-shrimp-scuttle 16s ease-in-out infinite; }
.dshpet-shrimp svg { width: 100%; height: auto; display: block; }
@keyframes dshpet-shrimp-scuttle {
  0%, 100% { transform: translateX(0) translateY(0); }
  12% { transform: translateX(7px) translateY(-2px); }
  24% { transform: translateX(15px) translateY(0); }
  36% { transform: translateX(21px) translateY(-2px); }
  48% { transform: translateX(28px) translateY(0); }
  60% { transform: translateX(21px) translateY(-2px); }
  72% { transform: translateX(13px) translateY(0); }
  86% { transform: translateX(6px) translateY(-2px); }
}

@media (prefers-color-scheme: dark) {
  .dshpet-body, .dshpet-tail, .dshpet-fin { fill: #e9fffb; }
  .dshpet-belly { fill: rgba(6,58,52,0.45); }
  .dshpet-mouth { stroke: #a7f0e3; opacity: 0.5; }
  .dshpet-eye-white { fill: #0d4038; }
  .dshpet-eye-pupil { fill: #c7fff3; }
  .dshpet-eye-close { stroke: #c7fff3; }
  .dshpet-bubble { background: rgba(4,26,28,0.95); }
}
`;

		// 侧视鲸鱼（头朝右）：身体 / 尾巴 / 胸鳍分离成独立部件，尾巴可摆动
		const BODY = 'M 12 27.5 C 12 19, 19 13.5, 29 14 C 36 14.5, 42 18, 44.5 22.5 C 46.5 26, 46 29, 44 30.5 C 40 33.5, 33 36, 25 35.8 C 18 35.6, 13.5 33, 12 27.5 Z';
		const TAIL = 'M 13.2 28.2 C 9.5 26.5, 5 25.2, 2.2 23.8 C 4.2 26.2, 7.5 28.6, 10.5 29.6 C 8.5 31.8, 5 34.6, 2.8 36.8 C 5.5 34.4, 9.5 32, 13.4 30.2 C 13.6 29.5, 13.5 28.8, 13.2 28.2 Z';
		const FIN = 'M 20 32.5 C 21 34.5, 20.5 37.5, 19 39 C 22 38, 25.5 36.5, 27 35.5 C 25 34.5, 22.5 33.5, 20 32.5 Z';
		const BELLY = 'M 15 33.6 C 20 35.4, 30 35.4, 38 32.3 C 34 35, 24 35.2, 15 33.6 Z';

		const LABELS = {
			idle: { emoji: '💤', name: '空闲 · 睡觉中', detail: '暂无任务，小鲸鱼在打盹' },
			thinking: { emoji: '🌊', name: '思考中 · 巡游', detail: '模型正在思考，小鲸鱼在屏幕上游荡' },
			working: { emoji: '🐬', name: '执行任务 · 巡游', detail: '工具执行中，小鲸鱼在全屏游来游去' },
			spraying: { emoji: '💦', name: '长时间任务 · 喷水', detail: '任务持续超过 5 分钟，小鲸鱼边游边喷水' },
		};

		// 跨渲染保留的交互状态
		const dragState = { current: null };
		const clickState = { suppress: false };

		// 启用/停用 + 鲸鱼颜色偏好：localStorage 持久化，设置页可随时调整
		const PET_LS_KEY = 'dsh-pet-whale:enabled';
		const PET_COLOR_KEY = 'dsh-pet-whale:color';
		const DEFAULT_COLOR = '#33d6c4';
		const petPref = {
			enabled: true,
			color: DEFAULT_COLOR,
			listeners: new Set(),
			read() {
				try {
					const v = typeof localStorage !== 'undefined' ? localStorage.getItem(PET_LS_KEY) : null;
					this.enabled = v === null ? true : v !== 'false';
					const c = typeof localStorage !== 'undefined' ? localStorage.getItem(PET_COLOR_KEY) : null;
					this.color = c && /^#[0-9a-fA-F]{6}$/.test(c) ? c : DEFAULT_COLOR;
				} catch (_) { this.enabled = true; this.color = DEFAULT_COLOR; }
			},
			setEnabled(enabled) {
				this.enabled = enabled;
				try { localStorage.setItem(PET_LS_KEY, enabled ? 'true' : 'false'); } catch (_) {}
				this.notify();
			},
			setColor(color) {
				this.color = color;
				try { localStorage.setItem(PET_COLOR_KEY, color); } catch (_) {}
				this.notify();
			},
			notify() {
				for (const fn of [...this.listeners]) { try { fn(this); } catch (_) {} }
			},
			subscribe(fn) {
				this.listeners.add(fn);
				return () => this.listeners.delete(fn);
			},
		};
		petPref.read();

		// 颜色工具：hex → 变亮/变暗（t>0 向白、t<0 向黑）
		function hexToRgb(hex) {
			let h = String(hex || '').replace('#', '');
			if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
			const n = parseInt(h, 16);
			if (Number.isNaN(n)) return { r: 51, g: 214, b: 196 };
			return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
		}
		function tint(hex, t) {
			const c = hexToRgb(hex);
			const target = t >= 0 ? 255 : 0;
			const k = Math.abs(t);
			const r = Math.round(c.r + (target - c.r) * k);
			const g = Math.round(c.g + (target - c.g) * k);
			const b = Math.round(c.b + (target - c.b) * k);
			return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
		}

		function formatDuration(ms) {
			if (!ms || ms < 0) return '';
			const s = Math.floor(ms / 1000);
			if (s < 60) return s + ' 秒';
			const m = Math.floor(s / 60);
			return m + ' 分 ' + (s % 60) + ' 秒';
		}

		function Pet() {
			const [state, setState] = React.useState('idle');
			const [inflight, setInflight] = React.useState(0);
			const [duration, setDuration] = React.useState(0);
			const [bubble, setBubble] = React.useState(false);
			const [hidden, setHidden] = React.useState(false);
			const [corner, setCorner] = React.useState(0);
			const [pos, setPos] = React.useState(null);
			const [dragging, setDragging] = React.useState(false);
			const [gliding, setGliding] = React.useState(false);
			const [, bumpPref] = React.useReducer((x) => x + 1, 0);
			const [dark, setDark] = React.useState(false);

			// 偏好（启用/颜色）变化时重渲染
			React.useEffect(() => petPref.subscribe(bumpPref), []);

			// 跟随系统明暗，让鲸鱼在暗色模式下更亮
			React.useEffect(() => {
				try {
					const mq = window.matchMedia('(prefers-color-scheme: dark)');
					setDark(mq.matches);
					const fn = (e) => setDark(e.matches);
					mq.addEventListener('change', fn);
					return () => mq.removeEventListener('change', fn);
				} catch (_) { return undefined; }
			}, []);

			// 鲸鱼渐变色：由用户选择的基色派生（暗色模式整体提亮）
			const petC1 = tint(petPref.color, dark ? 0.6 : 0.2);
			const petC2 = tint(petPref.color, dark ? 0.18 : -0.2);

			React.useEffect(() => {
				let alive = true;
				const tick = () => {
					fetch('/pet/state', { cache: 'no-store' })
						.then((r) => (r.ok ? r.json() : null))
						.then((data) => {
							if (!alive || !data) return;
							if (typeof data.state === 'string') setState(data.state);
							if (typeof data.inflight === 'number') setInflight(data.inflight);
							if (typeof data.duration === 'number') setDuration(data.duration);
						})
						.catch(() => {});
				};
				tick();
				const timer = setInterval(tick, 800);
				return () => { alive = false; clearInterval(timer); };
			}, []);

			// 只要有任何活动（思考/执行/喷水）鲸鱼就一直在屏幕上游；完全空闲才游回角落睡觉
			const active = state !== 'idle';
			const roaming = active || gliding;

			// 休息朝向：朝屏幕内侧（右侧角落/右半屏 → 头朝左，左侧 → 头朝右）
			const idleFacingLeft = state === 'idle' && (pos
				? (typeof window !== 'undefined' && pos.x + 40 > window.innerWidth / 2)
				: (corner === 0 || corner === 3));

			// 全屏自由巡游：JS 驱动，随机目标点 + 平滑转向 + 偶尔悬停，路线永不重复
			const moverRef = React.useRef(null);
			const roamState = React.useRef({ x: null, y: null, tx: null, ty: null, angle: 0, dwell: 0, mode: 'rest', returnFrom: null, returnTo: null, returnT: 0, facing: 1 });

			React.useEffect(() => {
				const mover = moverRef.current;
				if (!mover) return undefined;
				let raf = 0;
				let last = performance.now();
				const rs = roamState.current;

				const pickTarget = () => {
					const vw = window.innerWidth;
					const vh = window.innerHeight;
					const m = 18;
					const maxX = Math.max(m + 60, vw - 90);
					const minY = Math.max(m, Math.round(vh * 0.34));
					const maxY = Math.max(minY + 60, vh - 100);
					rs.tx = m + Math.random() * (maxX - m);
					rs.ty = minY + Math.random() * (maxY - minY);
				};

				// 统一定位：朝右游正常绘制；朝左游水平镜像（补 75px 偏移保持原位），让鲸鱼始终面朝游向
				const setMover = (x, y, tilt, facing) => {
					if (facing > 0) {
						mover.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) rotate(' + tilt.toFixed(2) + 'deg)';
					} else {
						mover.style.transform = 'translate(' + (x + 75).toFixed(1) + 'px,' + y.toFixed(1) + 'px) rotate(' + (-tilt).toFixed(2) + 'deg) scaleX(-1)';
					}
				};

				if (!active) {
					// 回窝：从当前巡游位置平滑游回睡觉角落
					if (rs.mode === 'roam') {
						rs.mode = 'return';
						const vw = window.innerWidth;
						const vh = window.innerHeight;
						rs.returnFrom = { x: rs.x, y: rs.y };
						rs.returnTo = { x: Math.max(18, vw - 100), y: Math.max(18, vh - 100) };
						rs.returnT = 0;
						rs.facing = rs.returnTo.x >= rs.returnFrom.x ? 1 : -1;
						setGliding(true);
						setMover(rs.x, rs.y, 0, rs.facing);
						const step = (now) => {
							const dt = Math.min(0.05, (now - last) / 1000);
							last = now;
							rs.returnT += dt / 0.8;
							const t = Math.min(1, rs.returnT);
							const ease = t * t * (3 - 2 * t);
							const x = rs.returnFrom.x + (rs.returnTo.x - rs.returnFrom.x) * ease;
							const y = rs.returnFrom.y + (rs.returnTo.y - rs.returnFrom.y) * ease;
							setMover(x, y, 0, rs.facing);
							if (t < 1) raf = requestAnimationFrame(step);
							else {
								rs.mode = 'rest';
								mover.style.transform = 'none';
								setGliding(false);
							}
						};
						raf = requestAnimationFrame(step);
					} else {
						mover.style.transform = 'none';
					}
					return () => cancelAnimationFrame(raf);
				}

				// 巡游：thinking / working / spraying 都游，速度随状态变化
				if (rs.mode === 'rest') {
					rs.x = Math.max(18, window.innerWidth - 100);
					rs.y = Math.max(18, window.innerHeight - 100);
					rs.facing = 1;
				}
				if (rs.tx === null) pickTarget();
				rs.mode = 'roam';
				setMover(rs.x, rs.y, 0, rs.facing);

				const step = (now) => {
					const dt = Math.min(0.05, (now - last) / 1000);
					last = now;
					const vw = window.innerWidth;
					const vh = window.innerHeight;
					let speed;
					if (state === 'spraying') speed = Math.max(vw, vh) * 0.055;
					else if (state === 'working') speed = Math.max(vw, vh) * 0.1;
					else speed = Math.max(vw, vh) * 0.06;
					if (rs.dwell > 0) {
						rs.dwell -= dt;
						rs.angle *= Math.max(0, 1 - dt * 4);
					} else {
						const dx = rs.tx - rs.x;
						const dy = rs.ty - rs.y;
						const dist = Math.hypot(dx, dy);
						const move = speed * dt;
						if (dist <= move || dist < 1) {
							rs.x = rs.tx;
							rs.y = rs.ty;
							rs.dwell = 0.4 + Math.random() * 1.4;
							pickTarget();
						} else {
							rs.x += (dx / dist) * move;
							rs.y += (dy / dist) * move;
						}
						rs.facing = dx >= 0 ? 1 : -1;
						const targetAngle = dist > 1 ? Math.atan2(dy, dx) : rs.angle;
						let diff = targetAngle - rs.angle;
						while (diff > Math.PI) diff -= Math.PI * 2;
						while (diff < -Math.PI) diff += Math.PI * 2;
						rs.angle += diff * Math.min(1, dt * 2.5);
					}
					const tilt = Math.sin(rs.angle) * 16;
					setMover(rs.x, rs.y, tilt, rs.facing);
					raf = requestAnimationFrame(step);
				};
				raf = requestAnimationFrame(step);
				return () => cancelAnimationFrame(raf);
			}, [active, state]);

			const onPointerDown = (e) => {
				// 点在状态气泡上时不进入拖拽逻辑
				try { if (e.target && e.target.closest && e.target.closest('.dshpet-bubble')) { dragState.current = null; return; } } catch (_) {}
				if (roaming) { dragState.current = null; return; }
				let base = null;
				try {
					const rect = e.currentTarget.getBoundingClientRect();
					base = { x: rect.left, y: rect.top };
				} catch (_) { base = null; }
				dragState.current = { px: e.clientX, py: e.clientY, base, moved: false };
				setDragging(true);
				try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
			};

			const onPointerMove = (e) => {
				const d = dragState.current;
				if (!d) return;
				const dx = e.clientX - d.px;
				const dy = e.clientY - d.py;
				if (!d.moved && (Math.abs(dx) + Math.abs(dy)) > 4) d.moved = true;
				if (d.moved && d.base) {
					setPos({ x: Math.max(0, d.base.x + dx), y: Math.max(0, d.base.y + dy) });
				}
			};

			const onPointerUp = () => {
				const d = dragState.current;
				dragState.current = null;
				setDragging(false);
				if (d && d.moved) clickState.suppress = true;
			};

			const onClick = () => {
				if (clickState.suppress) { clickState.suppress = false; return; }
				setBubble(true); // 只打开、常驻，仅 × 关闭
			};

			const stop = (e) => { e.stopPropagation(); };

			// 设置页停用后完全不显示
			if (!petPref.enabled) return null;

			if (hidden) {
				return React.createElement('div', {
					className: 'dshpet-restore',
					onClick: () => setHidden(false),
					title: '显示桌面宠物',
				}, '🐳');
			}

			const label = LABELS[state] || LABELS.idle;
			let detail;
			if (state === 'working') detail = inflight + ' 个工具执行中 · 已持续 ' + formatDuration(duration);
			else if (state === 'spraying') detail = '已持续 ' + formatDuration(duration) + '（超 5 分钟）· ' + inflight + ' 个工具执行中';
			else detail = label.detail;

			const rootClass = 'dshpet-root'
				+ (pos ? '' : ' dshpet-pos-' + corner)
				+ (dragging ? ' dragging' : '')
				+ (roaming ? ' dshpet-roaming' : '')
				+ (state === 'spraying' ? ' dshpet-spraying' : '')
				+ (idleFacingLeft ? ' dshpet-f-left' : '');

			const whale = React.createElement('div', {
				className: rootClass,
				style: Object.assign(
					pos && !roaming ? { left: pos.x + 'px', top: pos.y + 'px' } : {},
					{ ['--pet-accent']: petC2 },
				),
				onPointerDown: onPointerDown,
				onPointerMove: onPointerMove,
				onPointerUp: onPointerUp,
				onPointerCancel: onPointerUp,
				onClick: onClick,
				title: 'DeepSeek 鲸 · 拖动移动，点击查看状态',
			},
				React.createElement('div', { className: 'dshpet-mover', ref: moverRef },
					React.createElement('div', { className: 'dshpet-scene dshpet-scene-' + state },
						React.createElement('svg', { className: 'dshpet-svg', viewBox: '0 0 50 50' },
							React.createElement('defs', null,
								React.createElement('linearGradient', { id: 'dshpet-grad', x1: '0', y1: '0', x2: '1', y2: '1' },
									React.createElement('stop', { offset: '0%', stopColor: petC1 }),
									React.createElement('stop', { offset: '100%', stopColor: petC2 }),
								),
							),
							(state === 'thinking' || state === 'working' || state === 'spraying') ? React.createElement('ellipse', { className: 'dshpet-water', cx: '25', cy: '45.8', rx: '22', ry: '3.4' }) : null,
							React.createElement('g', { className: 'dshpet-whale dshpet-whale-' + state },
								React.createElement('path', { className: 'dshpet-body', d: BODY }),
								React.createElement('path', { className: 'dshpet-belly', d: BELLY }),
								React.createElement('path', { className: 'dshpet-mouth', d: 'M41.6 27.6 Q43.4 29.2 42 30.4' }),
								React.createElement('g', { className: 'dshpet-tail-g' },
									React.createElement('path', { className: 'dshpet-tail', d: TAIL }),
								),
								React.createElement('g', { className: 'dshpet-fin-g' },
									React.createElement('path', { className: 'dshpet-fin', d: FIN }),
								),
								state === 'idle'
									? React.createElement('g', null,
										React.createElement('circle', { className: 'dshpet-eye-white', cx: '37.5', cy: '20.6', r: '2.05' }),
										React.createElement('path', { className: 'dshpet-eye-close', d: 'M36.3 20.7 Q37.5 19.35 38.7 20.7' }),
									)
									: React.createElement('g', null,
										React.createElement('circle', { className: 'dshpet-eye-white', cx: '37.5', cy: '20.6', r: '2.05' }),
										React.createElement('circle', { className: 'dshpet-eye-pupil', cx: '38.05', cy: '20.55', r: '0.85' }),
									),
								state === 'thinking' ? React.createElement('g', null,
									React.createElement('circle', { className: 'dshpet-bubble', cx: '7', cy: '41', r: '0.55' }),
									React.createElement('circle', { className: 'dshpet-bubble', cx: '11', cy: '43', r: '0.75', style: { animationDelay: '0.7s' } }),
									React.createElement('circle', { className: 'dshpet-bubble', cx: '15', cy: '41.5', r: '0.45', style: { animationDelay: '1.4s' } }),
								) : null,
								state === 'working' ? React.createElement('g', null,
									React.createElement('circle', { className: 'dshpet-bubble dshpet-bubble-fast', cx: '7', cy: '41', r: '0.5' }),
									React.createElement('circle', { className: 'dshpet-bubble dshpet-bubble-fast', cx: '11', cy: '43', r: '0.7', style: { animationDelay: '0.5s' } }),
									React.createElement('circle', { className: 'dshpet-bubble dshpet-bubble-fast', cx: '15', cy: '41.5', r: '0.4', style: { animationDelay: '1s' } }),
								) : null,
								state === 'spraying' ? React.createElement('g', { className: 'dshpet-spray' },
									React.createElement('path', { className: 'dshpet-jet', d: 'M39.7 14 C39.5 10.5 40 7.5 40.5 5.2 C41 7.5 41.5 10.5 41.3 14 Z' }),
									React.createElement('g', { className: 'dshpet-plume' },
										React.createElement('path', { d: 'M40.5 5.2 C38.6 4.5 36.9 3.3 36.1 1.7 C37.9 2.5 39.5 3.7 40.5 5.2 Z' }),
										React.createElement('path', { d: 'M40.5 5.2 C40.1 4.4 40 3.4 40 2.4 C40.4 3.2 40.5 4.2 40.5 5.2 Z', style: { animationDelay: '0.15s' } }),
										React.createElement('path', { d: 'M40.5 5.2 C42.4 4.5 44.1 3.3 44.9 1.7 C43.1 2.5 41.5 3.7 40.5 5.2 Z', style: { animationDelay: '0.3s' } }),
									),
									React.createElement('circle', { className: 'dshpet-drop', cx: '36.1', cy: '2.4', r: '0.45', style: { ['--dx']: '-6px', ['--dy']: '-14px', animationDelay: '0.05s' } }),
									React.createElement('circle', { className: 'dshpet-drop', cx: '38.3', cy: '1.4', r: '0.5', style: { ['--dx']: '-3px', ['--dy']: '-18px', animationDelay: '0.2s' } }),
									React.createElement('circle', { className: 'dshpet-drop', cx: '40.5', cy: '0.8', r: '0.55', style: { ['--dx']: '0px', ['--dy']: '-22px', animationDelay: '0.35s' } }),
									React.createElement('circle', { className: 'dshpet-drop', cx: '42.7', cy: '1.4', r: '0.5', style: { ['--dx']: '3px', ['--dy']: '-18px', animationDelay: '0.5s' } }),
									React.createElement('circle', { className: 'dshpet-drop', cx: '44.9', cy: '2.4', r: '0.45', style: { ['--dx']: '6px', ['--dy']: '-14px', animationDelay: '0.65s' } }),
									React.createElement('circle', { className: 'dshpet-drop', cx: '39', cy: '1.9', r: '0.35', style: { ['--dx']: '-1.5px', ['--dy']: '-24px', animationDelay: '0.1s' } }),
									React.createElement('circle', { className: 'dshpet-drop', cx: '42', cy: '1.9', r: '0.35', style: { ['--dx']: '1.5px', ['--dy']: '-24px', animationDelay: '0.4s' } }),
								) : null,
							),
							state === 'idle' ? React.createElement('g', null,
								React.createElement('text', { className: 'dshpet-z', x: '40', y: '6', fontSize: '4.6' }, 'Z'),
								React.createElement('text', { className: 'dshpet-z', x: '43.5', y: '3.4', fontSize: '3.8', style: { animationDelay: '0.9s' } }, 'z'),
								React.createElement('text', { className: 'dshpet-z', x: '46.5', y: '1.2', fontSize: '3.1', style: { animationDelay: '1.8s' } }, 'z'),
							) : null,
						),
					),
				),
			);

			const statusBubble = bubble ? React.createElement('div', { className: 'dshpet-bubble', onClick: stop },
				React.createElement('div', { className: 'dshpet-bubble-head' },
					React.createElement('span', { className: 'dshpet-bubble-emoji' }, label.emoji),
					React.createElement('span', { className: 'dshpet-bubble-title' }, label.name),
					React.createElement('button', { className: 'dshpet-bubble-close', onClick: (e) => { e.stopPropagation(); setBubble(false); }, title: '关闭状态' }, '×'),
				),
				React.createElement('div', { className: 'dshpet-bubble-detail' }, detail),
				React.createElement('div', { className: 'dshpet-bubble-actions' },
					React.createElement('button', { className: 'dshpet-btn ghost', onClick: (e) => { e.stopPropagation(); setPos(null); setCorner((c) => (c + 1) % 4); } }, '换位置'),
					React.createElement('button', { className: 'dshpet-btn', onClick: (e) => { e.stopPropagation(); setHidden(true); } }, '隐藏'),
				),
			) : null;

			// 全屏海洋：执行任务时覆盖屏幕下 2/3（点击穿透），鲸鱼在海洋中巡游
			const ocean = React.createElement('div', { className: 'dshpet-ocean' + (active ? ' dshpet-ocean-on' : '') },
				React.createElement('div', { className: 'dshpet-ocean-surface' },
					React.createElement('svg', { className: 'dshpet-ocean-wave', viewBox: '0 0 200 12', preserveAspectRatio: 'none' },
						React.createElement('path', { d: 'M0 6 Q 25 0, 50 6 T 100 6 T 150 6 T 200 6', fill: 'none', stroke: 'rgba(255,255,255,0.55)', strokeWidth: '2' }),
					),
					React.createElement('svg', { className: 'dshpet-ocean-wave dshpet-ocean-wave-2', viewBox: '0 0 200 12', preserveAspectRatio: 'none' },
						React.createElement('path', { d: 'M0 6 Q 25 12, 50 6 T 100 6 T 150 6 T 200 6', fill: 'none', stroke: 'rgba(255,255,255,0.35)', strokeWidth: '2' }),
					),
				),
				React.createElement('div', { className: 'dshpet-ocean-ray' }),
				React.createElement('div', { className: 'dshpet-ocean-ray dshpet-ocean-ray-2' }),
				React.createElement('div', { className: 'dshpet-ocean-ray dshpet-ocean-ray-3' }),
				OCEAN_BUBBLES.map((b, i) =>
					React.createElement('div', {
						key: 'b' + i,
						className: 'dshpet-ocean-bubble',
						style: {
							left: b.left,
							width: b.size + 'px',
							height: b.size + 'px',
							animationDuration: b.dur + 's',
							animationDelay: b.delay + 's',
						},
					}),
				),
				React.createElement('div', { className: 'dshpet-ocean-sheen' }),
				React.createElement('div', { className: 'dshpet-ocean-floor' },
					React.createElement('div', { className: 'dshpet-seaweed', style: { left: '5%', width: '46px' } }, seaweedSvg()),
					React.createElement('div', { className: 'dshpet-seaweed', style: { left: '26%', width: '38px', animationDelay: '1.4s' } }, seaweedSvg()),
					React.createElement('div', { className: 'dshpet-seaweed', style: { left: '56%', width: '30px', animationDelay: '2.8s' } }, seaweedSvg()),
					React.createElement('div', { className: 'dshpet-seaweed', style: { left: '72%', width: '52px', animationDelay: '2.2s' } }, seaweedSvg()),
					React.createElement('div', { className: 'dshpet-seaweed', style: { left: '88%', width: '36px', animationDelay: '0.7s' } }, seaweedSvg()),
					FISH_SPECS.map((f, i) =>
						React.createElement('div', {
							key: 'f' + i,
							className: 'dshpet-fish' + (f.reverse ? ' dshpet-fish-rev' : ''),
							style: {
								width: f.size + 'px',
								bottom: f.bottom + '%',
								animationDuration: f.dur + 's',
								animationDelay: f.delay + 's',
							},
						},
							React.createElement('div', { className: 'dshpet-fish-flip' }, fishSvg(f.color)),
						),
					),
					SHRIMP_SPECS.map((s, i) =>
						React.createElement('div', {
							key: 's' + i,
							className: 'dshpet-shrimp',
							style: {
								left: s.left + '%',
								bottom: '1.5%',
								width: (26 + (i % 3) * 4) + 'px',
								animationDelay: s.delay + 's',
							},
						}, shrimpSvg(s.color)),
					),
				),
			);

			// 鲸鱼与状态气泡是两个独立的 fixed 层：气泡固定在屏幕角落，不随鲸鱼移动
			return React.createElement('div', { style: { width: 0, height: 0 } },
				ocean,
				whale,
				statusBubble,
			);
		}

		// 海底生物 SVG 工厂
		function fishSvg(color) {
			return React.createElement('svg', { viewBox: '0 0 16 10' },
				React.createElement('path', { d: 'M2 5 C2 2.6 5 1.6 9 1.9 C12 2.1 13.6 3.4 13.6 5 C13.6 6.6 12 7.9 9 8.1 C5 8.4 2 7.4 2 5 Z', fill: color }),
				React.createElement('path', { d: 'M13.6 5 L16.2 3.3 L16.2 6.7 Z', fill: color }),
				React.createElement('circle', { cx: '4.6', cy: '4.2', r: '0.8', fill: '#1d2333' }),
			);
		}
		function shrimpSvg(color) {
			return React.createElement('svg', { viewBox: '0 0 20 12' },
				React.createElement('path', { d: 'M2 10 C3.5 4.5 9 1.8 16 3.6 C12.5 5.2 10 6.6 8.2 8.8 C6.6 10.6 4.2 11.2 2 10 Z', fill: color }),
				React.createElement('path', { d: 'M16 3.6 C17.4 2.2 18.2 1.4 19 0.8', stroke: color, strokeWidth: '1', fill: 'none', strokeLinecap: 'round' }),
				React.createElement('path', { d: 'M7 5 L5 3.4 M7.4 7 L5.2 6.2 M10 4.6 L8.4 2.8', stroke: color, strokeWidth: '0.7', strokeLinecap: 'round', fill: 'none' }),
				React.createElement('circle', { cx: '14.6', cy: '3.4', r: '0.7', fill: '#1d2333' }),
			);
		}
		function seaweedSvg() {
			return React.createElement('svg', { viewBox: '0 0 60 80' },
				React.createElement('path', { d: 'M12 80 C10 62 18 55 16 40 C14 28 20 20 18 8', stroke: '#2ea86b', strokeWidth: '4', fill: 'none', strokeLinecap: 'round' }),
				React.createElement('path', { d: 'M30 80 C32 64 26 56 28 42 C30 30 24 22 26 10', stroke: '#3ec98a', strokeWidth: '5', fill: 'none', strokeLinecap: 'round' }),
				React.createElement('path', { d: 'M46 80 C44 66 50 58 48 46 C46 34 52 26 50 14', stroke: '#279a5f', strokeWidth: '4', fill: 'none', strokeLinecap: 'round' }),
			);
		}

		// 海底生物配色
		const FISH_COLORS = ['#ffb86b', '#ffe08a', '#7fdbda', '#f4a7b9', '#a3d9a5', '#8ec5ff', '#ffa69e', '#d4b8ff'];

		// 海洋元素分布（确定性生成：35 气泡 / 15 小鱼 / 10 小虾）
		const OCEAN_BUBBLES = Array.from({ length: 35 }, (_, i) => ({
			left: ((i * 7 + 3) % 95) + '%',
			size: 5 + ((i * 13) % 14),
			dur: 8 + ((i * 7) % 7),
			delay: ((i * 11) % 80) / 10,
		}));
		const FISH_SPECS = Array.from({ length: 15 }, (_, i) => ({
			bottom: 3 + ((i * 17) % 25),
			size: 14 + ((i * 11) % 17),
			dur: 18 + ((i * 13) % 26),
			reverse: i % 3 === 2,
			delay: ((i * 19) % 100) / 10,
			color: FISH_COLORS[i % FISH_COLORS.length],
		}));
		const SHRIMP_SPECS = Array.from({ length: 10 }, (_, i) => ({
			left: (3 + i * 9.5) % 88,
			delay: ((i * 13) % 60) / 10,
			color: i % 2 === 0 ? '#ff9e6d' : '#f4a7b9',
		}));

		// 设置页：Settings → Plugins → 桌面宠物
		const PRESET_COLORS = [
			'#33d6c4', '#4d7cfe', '#34d399', '#f472b6', '#a78bfa',
			'#fbbf24', '#fb7185', '#38bdf8', '#f97316', '#64748b',
		];

		function PetSettings() {
			const [, bumpPref] = React.useReducer((x) => x + 1, 0);
			React.useEffect(() => petPref.subscribe(bumpPref), []);

			const base = petPref.color;
			const accent = tint(base, -0.2);

			return React.createElement('div', { className: 'dshpet-settings', style: { ['--pet-accent']: accent } },
				React.createElement('div', { className: 'dshpet-settings-row' },
					React.createElement('div', { className: 'dshpet-settings-info' },
						React.createElement('div', { className: 'dshpet-settings-title' }, '桌面宠物 🐳'),
						React.createElement('div', { className: 'dshpet-settings-desc' }, '空闲睡觉 / 思考巡游 / 执行任务满屏游 / 超 5 分钟喷水'),
					),
					React.createElement('label', { className: 'dshpet-switch' },
						React.createElement('input', {
							type: 'checkbox',
							checked: petPref.enabled,
							onChange: (e) => { e.stopPropagation(); petPref.setEnabled(e.target.checked); },
						}),
						React.createElement('span', { className: 'dshpet-switch-slider' }),
					),
				),
				React.createElement('div', { className: 'dshpet-settings-note' }, '关闭后鲸鱼立即隐藏；可随时重新开启。'),
				React.createElement('div', { className: 'dshpet-settings-color' },
					React.createElement('div', { className: 'dshpet-settings-title' }, '鲸鱼颜色'),
					React.createElement('div', { className: 'dshpet-settings-swatches' },
						PRESET_COLORS.map((c) =>
							React.createElement('button', {
								key: c,
								className: 'dshpet-swatch' + (c.toLowerCase() === base.toLowerCase() ? ' active' : ''),
								style: { background: c },
								title: c,
								onClick: (e) => { e.stopPropagation(); petPref.setColor(c); },
							}),
						),
					),
					React.createElement('div', { className: 'dshpet-settings-custom' },
						React.createElement('span', { className: 'dshpet-settings-custom-label' }, '自定义'),
						React.createElement('input', {
							type: 'color',
							value: base,
							onChange: (e) => { e.stopPropagation(); petPref.setColor(e.target.value); },
						}),
					),
				),
			);
		}

		const inject = ["slots"];

		function apply(ctx) {
			const tagId = "dsh-pet-whale/pet.css";
			if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
				const tag = document.createElement("style");
				tag.dataset.plugin = "dsh-pet-whale";
				tag.dataset.pluginCss = tagId;
				tag.textContent = CSS;
				document.head.appendChild(tag);
			}
			const slots = ctx.get("slots");
			if (slots === undefined) return;
			slots.inject("shell.overlay", () => slots.register(
				{ name: "shell.overlay", id: "dsh-pet-whale", order: 100000 },
				() => React.createElement(Pet),
			));
			slots.inject("settings.plugins.tab", () => slots.register(
				{ name: "settings.plugins.tab", id: "dsh-pet-whale", order: 20, label: "桌面宠物" },
				() => React.createElement(PetSettings),
			));
		}

		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
