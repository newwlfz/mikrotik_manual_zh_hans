# MikroTik Manual Mirror · English hub 仓库

英文站点在此构建：<https://newwlfz.github.io/mikrotik_manual_i18n/>。它也是三个站点的唯一事实来源：内容从 <https://manual.mikrotik.com/> 同步进来，经过修正后推送到简体和繁体中文翻译仓库。

简体和繁体站点不在本仓库中构建。每个站点都有自己的仓库（`mikrotik_manual_zh_hans`、`mikrotik_manual_zh_hant`），仅保存各自的翻译。本仓库根目录的 `locales.json` 是三个站点共享的语言注册表：导航栏语言下拉菜单、每个页面上的 `hreflang` 标签，以及中文浏览器的首次访问重定向，都由它生成。

## 每天会发生什么

1. `.github/workflows/sync.yml` 每天 03:00 UTC（北京时间 11:00）先发送带条件的、基于 ETag 的请求。如果官方站点没有变化，本次运行结束，不提交也不构建。
2. 只有官方站点发生变化时才会运行同步（在 CI 中为 `node tools/sync/index.mjs --update`；本地等价命令是 `npm run sync`）：它会获取新内容、切换版本、重建侧边栏和 CLI 数据、将结果提交回 `main`，然后显式派发 `pages.yml`。
3. `pages.yml` 构建英文站点，运行 `npm run verify:deploy`，并发布站点。
4. 同一工作流中的 `publish-content` 任务使用 `CROSS_REPO_TOKEN` 将内容推送到两个语言仓库，并触发 `content-fanout`；收到事件后，它们会翻译、构建并部署。

同步失败时不会提交任何内容，只会创建一个 `sync failed:` issue；线上站点保持上一版本。详情请参阅 `guides/CI.md` 和 `guides/ARCHITECTURE-MULTISITE.md`。

## 哪些要编辑，哪些不要编辑

| 路径 | 内容 | 操作 |
| --- | --- | --- |
| `docs/`、`versioned_docs/`、`hardware/`、`blog/`、`changelog/`、`data/` | 同步输出 | 不要手动编辑。下一次同步会替换整个目录树。要进行更改，请编辑上游源或 `tools/sync/`。 |
| `sidebars.ts`、`sidebars-hardware.ts`、`versioned_sidebars/`、`versions.json` | 同步输出 | 同上；它们也会被推送到语言仓库。 |
| `upstream/`、`build/`、`.docusaurus/` | 获取缓存和构建输出 | 不要编辑或提交。 |
| `tools/`、`config/`、`src/`、`docusaurus.config.ts` | 流水线和配置 | 真正的更改在这里进行。同步规则位于 `config/mirror.yml`；站点外壳位于 `src/`。 |
| `.github/workflows/`、`guides/` | CI 和文档 | 更改工作流时在此编辑。 |
| `locales.json` | 语言注册表 | 可编辑，但一次编辑会影响三个站点（见下文）。 |

编辑 `locales.json` 是仓库级事件。hub 会将其发布到两个语言仓库；共享的关键字段（`default`、每个语言区域的 `repo` / `baseUrl` / `site` / `available`）必须一致，而 `tagline` / `label` / `siteTitle` 按站点保持本地化，故意不要求逐字节相同。每当 `available` 标志从 `false` 翻转为 `true`，或地址发生变化时，必须重建 hub 和两个站点，以使语言下拉菜单、`hreflang` 和重定向元数据保持一致。编辑后，依次运行 `npm run locales:check` 和 `npm run content:publish:dry`，确认计划，然后才运行 `npm run content:publish`。注册表中的 `default` 必须为 `en`。

使用 `npm run locale:add` 添加语言区域。先查看计划：

```bash
npm run locale:add -- --code ru-RU --label Русский --dry-run
```

它只会创建目录脚手架并在 `locales.json` 中注册该语言区域；不会创建 GitHub 仓库，也不会写入任何 secrets。之后仍需手动创建仓库、授予 `CROSS_REPO_TOKEN` 访问权限、在新仓库中配置 LLM 变量，并再次运行 publish。命令参数请参阅 `--help`，决策依据请参阅 `guides/DECISIONS.md`（D7，以及 README 策略的 D9）。

如果要从已发布的 Release 而不是本地模板进行引导，请在新且空的仓库内运行以下命令：

```bash
node <你的 hub checkout 路径>/templates/locale-repo/tools/bootstrap/from-release.mjs \
  --locale zh-Hant --label 繁體中文 --repo newwlfz/mikrotik_manual_zh_hant --slug zh_hant
```

将 `<你的 hub checkout 路径>` 替换为 hub checkout 的真实绝对路径；本机上的真实示例为 `/home/evan/mikrotik_manual_i18n/mikrotik_manual_i18n`（仅作示例——不要照抄）。

从模板 checkout 中，同一命令是 `npm run bootstrap:from-release -- --locale ... --dir <empty target>`。它会下载 Release tarball 和 manifest，验证 `archive.sha256` 以及每个文件的 SHA-256，展开内容和路径中的 11 个占位符，再次检查没有残留，然后才写入目录树并打印可复制的 `git init` / `add` / `commit` / `push` 命令。它不会提交、推送或更改凭据；`--dry-run` 只验证并打印计划。人工前置条件仍然适用：创建空仓库、授予 `CROSS_REPO_TOKEN` 访问权限、设置 LLM 变量/secret 和 Pages 源，并在 `locales.json` 中注册该语言区域。完整步骤请参阅 `guides/ONBOARDING.md`（zh-Hant 请参阅 `guides/ZH_HANT_RUNBOOK.md`）。

模板包含一个共享的英文 `README.md`。脚手架始终展开其中的 11 个占位符，并将其写为新仓库根目录的 `README.md`；模板中没有按语言区域划分的 README 文件。语言仓库自己的 README 由该仓库的 `translate` 工作流根据 hub 发布的英文 `hub-docs/` 源进行本地化——它是翻译产物，不是模板变体。维护者不应手动编辑脚手架生成的 README，也不应向模板添加特定语言的 README 文件。本 hub 自己的 README 保持英文，且不包含任何私有地址。

## 常用命令

```bash
npm ci                          # install dependencies first
npm run sync:probe              # only ask the official site "have you changed?", writes nothing
npm run build                   # CLI data -> Docusaurus -> Pagefind -> llms.txt
npm run verify:deploy           # verify the deploy shape
npm run serve                   # single-site Docusaurus preview (not the three-site server below)
npm run locales:check           # validate locales.json
npm run content:publish:dry     # print what would be pushed, write nothing remote
npm run content:publish         # real push; requires CROSS_REPO_TOKEN
```

使用 `npm run build` 构建，不要直接运行 `npx docusaurus build`：npm 脚本会在 Docusaurus 之后运行 Pagefind 和 llms 重写，导航栏搜索依赖该步骤。

## 本地预览（三个站点一起）

三个仓库是在同一工作根目录下并排存在的 checkout；每个都会生成一个 `build/`。构建想查看的站点；未构建的站点会返回 404。已部署的站点是公开的：

- English <https://newwlfz.github.io/mikrotik_manual_i18n/>
- Simplified Chinese <https://newwlfz.github.io/mikrotik_manual_zh_hans/>
- Traditional Chinese <https://newwlfz.github.io/mikrotik_manual_zh_hant/>

要进行本地预览，请从工作根目录（包含三个 checkout 和 `work/` 的目录）构建站点，然后运行共享静态服务器：

```bash
(cd mikrotik_manual_i18n && npm ci && \
  SITE_LOCALE=en SITE_URL=https://newwlfz.github.io BASE_URL=/mikrotik_manual_i18n/ \
  ASSET_HOST=true npm run build)
(cd mikrotik_manual_zh_hans && npm ci && \
  SITE_LOCALE=zh-Hans SITE_URL=https://newwlfz.github.io BASE_URL=/mikrotik_manual_zh_hans/ \
  ASSET_ORIGIN=https://newwlfz.github.io/mikrotik_manual_i18n npm run build)
(cd mikrotik_manual_zh_hant && npm ci && \
  SITE_LOCALE=zh-Hant SITE_URL=https://newwlfz.github.io BASE_URL=/mikrotik_manual_zh_hant/ \
  ASSET_ORIGIN=https://newwlfz.github.io/mikrotik_manual_i18n npm run build)
node work/serve-multi-i18n.mjs
```

`work/serve-multi-i18n.mjs` 是一个普通的 Node 静态服务器，用于挂载三个 `build/` 目录树。它默认监听端口 `3030`；设置 `PORT` 可使用其他端口。挂载路径和目录名称都从 `locales.json` 读取；`/` 会重定向到英文站点。`npm run serve` 只是 Docusaurus 的单站点预览，不是这个共享服务器。

使用的变量：

| 变量 | 示例中的值 | 含义 |
| --- | --- | --- |
| `SITE_URL` | `https://newwlfz.github.io` | 本站点的源，用于 canonical / hreflang |
| `BASE_URL` | `/mikrotik_manual_i18n/` 等 | 每个站点的路径前缀，包含开头和结尾的 `/` |
| `SITE_LOCALE` | `en` / `zh-Hans` / `zh-Hant` | 一次只构建一个语言区域 |
| `ASSET_ORIGIN` | `https://newwlfz.github.io/mikrotik_manual_i18n` | 中文站点从英文站点加载图片、PDF 和视频；不带结尾斜杠 |
| `ASSET_HOST` | `true` | 仅 hub：在精简构建中保留完整的 `build/img` |
| `BUILD_HEAP_MB` | 三个 CI 工作流中均为 `6144` | 在每个 `.github/workflows/pages.yml` 的 env 中设置的 Node 堆大小（hub、简体和繁体均为 6144）；除非设置该变量，否则裸工具在本地回退到 4 GiB |

`CROSS_REPO_TOKEN` 是 secret 的名称，不是要写入文档的值：本地它来自环境变量或 `.env.local`，在 CI 中来自 GitHub Secrets（本仓库的 Settings → Secrets and variables → Actions）。缺少它时，publish 会明确报错；dry run 不需要它。

更多设计说明请参阅 `ARCHITECTURE.md`、`TRANSLATION.md` 和 `guides/`。
