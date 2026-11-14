# MikroTik 手册 — 简体中文镜像站

**本仓库只构建 `zh-Hans` 一个语种。** 英文站是另一个仓库
（`repo_en`）、另一个 GitHub Pages 站点；两个仓库共用**同一份**
`docusaurus.config.ts`，站点之间的全部差异由环境变量提供（见
[部署变量](#部署变量)）。中文站不产生 `build/zh-Hans/` 子目录：`build/`
根就是中文站。

- 文档源：<https://manual.mikrotik.com/> 的镜像内容（英文正文）+
  `i18n/zh-Hans/` 翻译覆盖层；
- 翻译覆盖层：4,704 个文件，约 39 MB，是本仓库**唯一**的中文真源；
- 内容（`docs/`、`versioned_docs/`、`static/`、`hardware/`、`blog/`、
  `changelog/`、`data/`）由 hub 的内容发布提供，**不入库**；
- 产物：约 712 MB（24,804 个文件，含 pagefind 索引），全部路由在
  `build/` 根；`llms.txt`/`llms-full.txt` 只写中文，`pagefind` 索引
  6,079 个中文页（另有 1 个英文页是抓取下来的 WebFig 示例
  `assets/295239801_index2.html`，带 `lang="en"`）。

## 快速开始

```bash
npm ci                        # 或本地复用英文仓的依赖：ln -s ../repo_en/node_modules node_modules
npm run content:fetch         # 从 ../repo_en 取内容（本地模拟 hub content release）
SITE_URL=http://127.0.0.1:3013 BASE_URL=/mikrotik_manual_zh_hans/ SITE_LOCALE=zh-Hans \
LOCALE_EN_URL=http://127.0.0.1:3013 LOCALE_EN_BASE_URL=/mikrotik_manual_i18n/ \
LOCALE_ZH_URL=http://127.0.0.1:3013 LOCALE_ZH_BASE_URL=/mikrotik_manual_zh_hans/ \
BUILD_HEAP_MB=6144 npm run build
npm run verify:deploy
```

`npm run build` 依次执行：CLI 数据生成 → `docusaurus build --locale
zh-Hans --out-dir build` → `pagefind` → `tools/build/llms.mjs`。

## 内容获取

`docs/`、`versioned_docs/`、`static/`、`hardware/`、`blog/`、`changelog/`、
`data/` 是**内容**：由 hub 的内容发布（content release）产出，本仓库不
维护它们，`.gitignore` 全部忽略。`npm run content:fetch` 是本地替身：

```bash
node tools/content/fetch-local.mjs                 # 从 ../repo_en 复制
node tools/content/fetch-local.mjs --source=../repo_en --only=docs,static
node tools/content/fetch-local.mjs --dry-run
```

它按文件复制，目标已存在且大小相同就跳过（第二次运行几乎零成本），并把
来源 commit、各 section 的文件数/字节数写进 `.content/fetch.json`。
生产环境把这一步替换成从 hub 下载 release（例如
`gh release download <content-tag> --dir .content`）即可，后续构建不感知
来源。

## 部署变量

两个站点用**同一份** `docusaurus.config.ts`，所有差异都在环境变量里：

| 变量 | 缺省 | 含义 |
| --- | --- | --- |
| `SITE_LOCALE` | `en` | 本次构建产出的语种；中文站固定传 `zh-Hans` |
| `SITE_URL` | `https://newwlfz.github.io` | 本站绝对域名（`canonical`/`hreflang`） |
| `BASE_URL` | 随 `SITE_LOCALE`：`/mikrotik_manual_i18n/` 或 `/mikrotik_manual_zh_hans/` | 本站路径前缀 |
| `LOCALE_EN_URL` | `SITE_URL` | 英文站绝对域名 |
| `LOCALE_EN_BASE_URL` | 当前语种时等于 `BASE_URL`，否则 `/mikrotik_manual_i18n/` | 英文站路径前缀 |
| `LOCALE_ZH_URL` | `SITE_URL` | 中文站绝对域名 |
| `LOCALE_ZH_BASE_URL` | 当前语种时等于 `BASE_URL`，否则 `/mikrotik_manual_zh_hans/` | 中文站路径前缀 |
| `BUILD_HEAP_MB` | `10240` | Node 堆上限（`build:lowmem` 用 6144） |

`localeConfigs.en` / `localeConfigs['zh-Hans']` 都显式带
`url`/`baseUrl`/`htmlLang`/`label`。显式值有两个作用：语言下拉与
`hreflang` 指向**另一个仓库的站点**，而不是本产物的 `/zh-Hans/` 子目录；
同时 Docusaurus 由 `baseUrl - siteConfig.baseUrl` 推导非默认语种的输出
目录，显式值让 `--locale zh-Hans` 也写到 `build/` 根。

`translate` 只对**本次构建的语种**打开（`siteLocale === 'zh-Hans'`）：在
Docusaurus 3.10 里它不只是“是否导出翻译清单”，还决定 docs 插件是否读
`i18n/<locale>/`、navbar/footer/sidebar 标签是否翻译。英文仓构建时该值
恒为 `false`，与本仓共用同一份配置而不受影响。

## 路由

| 内容 | 中文站（本仓库） | 英文站（`repo_en`） |
| --- | --- | --- |
| RouterOS 当前版 | `/mikrotik_manual_zh_hans/docs/...` | `/mikrotik_manual_i18n/docs/...` |
| RouterOS 归档版 | `/mikrotik_manual_zh_hans/docs/<version>/...` | `/mikrotik_manual_i18n/docs/<version>/...` |
| 硬件指南 | `/mikrotik_manual_zh_hans/hardware/...` | `/mikrotik_manual_i18n/hardware/...` |
| 产品新闻 | `/mikrotik_manual_zh_hans/blog/...` | `/mikrotik_manual_i18n/blog/...` |
| 文档变更 | `/mikrotik_manual_zh_hans/changelog/...` | `/mikrotik_manual_i18n/changelog/...` |

当前文档版本是 7.26（`data/manifests/current-version.json`），归档版本是
7.25 与 7.24（`versions.json`）。

## 跨站语言入口

- 语言下拉：`localeDropdown` 直接使用两个 `localeConfigs` 的
  `url`+`baseUrl`，在中文页点「English」是整页跳转到英文站同一路径；
- `hreflang`：每页输出 `en`、`zh-Hans` 与 `x-default` 三条 `alternate`，
  分别指向两个站点的同一路径；`canonical` 指向中文站自身；
- 首屏脚本：`<head>` 里的自动跳转脚本**只在 `SITE_LOCALE=en` 时注入**。
  中文站已经是目标语种，不做「跳中文」逻辑（
  `src/clientModules/locale-detect.js` 也读
  `<meta name="docusaurus-site-locale">` 做同样的短路）。

## 目录

```text
repo_zh_hans/
├─ config/                  # 语种无关配置 + glossary/translation-patches
├─ i18n/zh-Hans/            # 中文翻译覆盖层（唯一入库的内容）
├─ src/                     # 主题、组件、客户端模块
├─ tools/                   # 构建 / 校验 / 内容获取
│  ├─ content/fetch-local.mjs
│  └─ build/{index,slim,llms}.mjs
├─ docs/ versioned_docs/ static/ hardware/ blog/ changelog/ data/   # 内容，git-ignored
├─ work/translate/          # 翻译记忆（TM），原型阶段 git-ignored
└─ work/verify/             # 本地双站点联调脚本与报告，git-ignored
```

## 本地双站点联调

`work/verify/multisite-local.mjs` 在同一个端口上同时挂载两个产物：

```text
/mikrotik_manual_i18n/*      -> ../repo_en/build
/mikrotik_manual_zh_hans/*   -> build
/                            -> 302 英文站
```

它用 Playwright 走完整浏览器路径，验证英文入口、语言下拉互跳、
`hreflang`/`canonical`、归档版本路由与产物形状，输出逐条 JSON：

```bash
node work/verify/multisite-local.mjs          # 需要两个产物都已构建
node work/verify/multisite-local.mjs --json
```

## 已知未完成项

- **翻译记忆（TM）**：`work/translate/*.json`（约 79 MB）只在原型阶段
  本地使用，尚未决定是否入库（Git LFS 或内容 release 二选一）。
- **pagefind 的 1 个英文页**：`assets/295239801_index2.html` 是抓取下来的
  WebFig 示例（自带 `lang="en"`），pagefind 因此报告 1 个英文页；如需
  严格“只索引中文”，在 `pagefind` 参数里加 `--exclude "assets/*.html"`。
- **`slim` 适配**：单语种产物下 `tools/build/slim.mjs` 只做
  `build/img` 剪枝；中文站的 `build/img` 引用与英文站一致，但没有针对
  中文资源目录做额外裁剪。
