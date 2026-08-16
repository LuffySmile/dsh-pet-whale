# 开发与发布指南（维护者）

> 面向维护者；使用者请阅读仓库根目录的 README。

## 🧑‍💻 本地开发

```bash
npm test          # 渲染回归测试（发布前必跑）
npm run check     # 语法检查
```

改完代码后，把 `lib/` 同步到本地安装副本，重启 dsh web 生效：

```bash
# 若用 file: 方式安装（pnpm 符号链接），改源码即生效，无需复制
# 否则手动复制到 ~/.dsh/profiles/web/node_modules/dsh-pet-whale/lib/ 后重启
```

## 📤 发布到 npm

### 手动发布

```bash
npm version patch     # 版本号 +1（自动跑 prepublishOnly 测试）
git tag v0.1.1 && git push --tags
npm publish
```

> `package.json` 的 `publishConfig.registry` 已固定为官方仓库
> `https://registry.npmjs.org`，不受本机 npm 镜像配置影响。

### 自动发布（GitHub Actions）

仓库内置 `.github/workflows/publish.yml`：**推送 `v*` tag 时自动跑测试并发布到 npm**。

首次使用需要配一次 token：

1. 在 [npmjs.com → Access Tokens](https://www.npmjs.com/settings/LuffySmile/tokens)
   创建 **Granular Access Token**（权限：只给 `dsh-pet-whale` 这个包 `Read and write`）
2. 在 GitHub 仓库 **Settings → Secrets and variables → Actions →
   New repository secret** 添加：
   - Name: `NPM_TOKEN`
   - Value: 刚创建的 token

之后日常发布只需：

```bash
npm version patch
git push --tags
```

推送 tag 后 Actions 自动完成测试 + 发布。

> 网络提示：本机访问 www.npmjs.com 可能被网络层拦截（403），注册账号需更换网络
> （手机热点/VPN）；发布通道 `registry.npmjs.org` 通常不受影响。
