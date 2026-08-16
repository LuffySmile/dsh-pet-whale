/**
 * DeepSeek 桌面宠物（鲸鱼）—— 宿主半。
 *
 * 状态机：
 *   idle     → 完全空闲（睡觉）
 *   thinking → agent 运行中但无工具执行（原地游泳）
 *   working  → 有工具正在执行（在屏幕上游来游去）
 *   spraying → 同一段任务连续活动超过 LONG_TASK_MS（5 分钟）→ 喷水
 *
 * 任务时长从"第一次工具执行"开始累计；思考空档（agent 仍在 running）
 * 不断开计时，只有真正回到空闲才清零。通过 webServer 注册 /pet/state
 * JSON 路由供客户端轮询。行配置声明 inject: [webServer] 等待服务就绪。
 */

const LONG_TASK_MS = 5 * 60 * 1000;

export function apply(ctx) {
	const runningAgents = new Set();
	let inflight = 0;
	let workingSince = 0;

	// agent 状态：idle <-> running
	ctx.on('agent/status', (payload) => {
		if (!payload || !payload.agent) return;
		if (payload.status === 'running') runningAgents.add(payload.agent);
		else runningAgents.delete(payload.agent);
	});

	ctx.on('agent/disposed', (payload) => {
		if (payload && payload.agent) runningAgents.delete(payload.agent);
	});

	// 工具执行期间计入 inflight（waterfall 必须调用并返回 next）
	ctx.on('tools/execute', async (exec, next) => {
		inflight += 1;
		try {
			return await next();
		} finally {
			inflight -= 1;
			if (inflight < 0) inflight = 0;
		}
	});

	const current = () => {
		const now = Date.now();
		if (inflight > 0) {
			if (workingSince === 0) workingSince = now;
			const duration = now - workingSince;
			return { state: duration >= LONG_TASK_MS ? 'spraying' : 'working', duration };
		}
		if (runningAgents.size > 0) {
			// 思考中：保留已累计的任务时长，思考空档不断开 5 分钟计时
			return { state: 'thinking', duration: workingSince ? now - workingSince : 0 };
		}
		workingSince = 0;
		return { state: 'idle', duration: 0 };
	};

	const webServer = ctx.get('webServer');
	if (webServer === undefined) return;

	ctx.effect(() => webServer.register({
		path: '/pet/state',
		handler: async (req, res) => {
			const { state, duration } = current();
			const body = JSON.stringify({ state, duration, inflight, agents: runningAgents.size });
			res.writeHead(200, {
				'content-type': 'application/json; charset=utf-8',
				'cache-control': 'no-store',
			});
			res.end(body);
		},
	}));
}
