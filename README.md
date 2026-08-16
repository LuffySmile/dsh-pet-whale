# dsh-pet-whale 🐳

<p align="center">
  <img src="assets/banner.svg" width="900" alt="dsh-pet-whale 封面">
</p>

DeepSeek Harness 桌面宠物：一只会游泳、会喷水的 DeepSeek 小鲸鱼，常驻在 Web/桌面端界面角落。

> 非官方插件，与 DeepSeek 官方无关；鲸鱼形象来自 DeepSeek Harness 的品牌图标风格。

## ✨ 功能

- **空闲** → 游回角落**睡觉**（闭眼 + 呼吸起伏 + Zzz）
- **思考中** → 在**整个屏幕自由巡游**（随机路线，永不重复）
- **执行任务** → 全屏快速游来游去，**尾巴摆动幅度加大**
- **任务持续超过 5 分钟** → **边游边喷水** 💦
- 点击鲸鱼 → 状态气泡**常驻显示**（固定在右下角，点 × 关闭）
- 支持拖动、四角切换、隐藏/恢复、明暗主题自适应

## 📦 安装

### 方式一：npm 包（推荐）

```bash
dsh plugin --profile web add dsh-pet-whale
```

### 方式二：GitHub clone

```bash
git clone https://github.com/LuffySmile/dsh-pet-whale.git
dsh plugin --profile web add file:<克隆到的路径>
```

### 方式三：本地源码

```bash
dsh plugin --profile web add file:D:\路径\dsh-pet-whale
```

### 挂载（所有方式都需要）

`dsh plugin add` 只负责安装包，还需要在 profile 的补丁层挂载它。在
`~/.dsh/profiles/web/cordis.patch.yml` 中追加：

```yaml
# --- dsh-pet-whale managed ---
- insert:
    - id: dsh-pet-whale
      name: dsh-pet-whale
      inject:
        - webServer
# --- end dsh-pet-whale managed ---
```

然后**彻底重启 dsh web**（桌面端需先关掉正在运行的实例，否则会复用旧进程）。

> 安装时若提示 *"declares no dsh.bundle — installed as a plain dependency"* 属正常现象：
> 本包是 `dsh.client` 客户端插件，挂载靠上面的 insert 行。

## 🔄 更新

```bash
dsh plugin --profile web add dsh-pet-whale@latest
```

## 🗑️ 卸载

```bash
dsh plugin --profile web remove dsh-pet-whale
```

并删除 `cordis.patch.yml` 中的 insert 段（以及 `~/.dsh/profiles/web/node_modules/dsh-pet-whale` 残留目录）。

## 🧑‍💻 开发

```bash
npm test          # 渲染回归测试（发布前必跑）
npm run check     # 语法检查
```

改完代码后，把 `lib/` 同步到安装副本，重启 dsh web 生效：

```bash
# 若用 file: 方式安装（pnpm 符号链接），改源码即生效，无需复制
```

## 📤 发布

### 手动发布

```bash
npm version patch     # 版本号 +1（自动跑 prepublishOnly 测试）
git tag v0.1.1 && git push --tags
npm publish
```

### 自动发布（GitHub Actions）

仓库已内置 `.github/workflows/publish.yml`：**推送 `v*` tag 时自动跑测试并发布到 npm**。

首次使用需要配一次 token：

1. 在 [npmjs.com → Access Tokens](https://www.npmjs.com/settings/LuffySmile/tokens) 创建一个 **Granular Access Token**（权限：只给 `dsh-pet-whale` 这个包 `Read and write`）
2. 在 GitHub 仓库 **Settings → Secrets and variables → Actions → New repository secret** 添加：
   - Name: `NPM_TOKEN`
   - Value: 刚创建的 token

之后日常发布只需：

```bash
npm version patch
git push --tags
```

推送 tag 后 Actions 自动完成测试 + 发布。

## 📄 License

MIT
