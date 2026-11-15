# 翻译记忆库：哪些入库，哪些不入库

这个目录是翻译流水线的本地状态。**不是所有文件都该进 git**：判断标准只有一条——
它能不能从仓库里已有的东西（`i18n/` 下的 overlay，加上另一份记忆）重建出来。

- 能重建、或者只是本机日志的：**不入库**，留在本地（或在 `.gitignore` 里）。
- 千字节级、重建会丢信息的状态：**入库**，因为 CI 的下一批翻译要靠它接着上一批跑。
- 体积大又重建不了：**归档到 GitHub Release**，需要时下载回这个目录。

`.gitignore` 里对应的规则注释会指回本文件；改策略时两处一起改。

## 一、入库（提交到 git）

| 文件 | 体积 | 作用 |
| --- | --- | --- |
| `keep-english.json` | 696 KiB | 故意保持英文的块。删了它，每批都会重新送翻，`pending` 永远归不了零。 |
| `comment-memory.json` | 20 KiB | 代码围栏里行首注释的译文，保证一条注释只翻一次。 |
| `run.json` | 523 B | 上一批的日志（停止原因、`pending`、token 成本）。 |
| `state/translation-state.json`（仓库根 `state/`） | 158 KiB | 每页翻译进度，`translate:verify` / `pending` 都读它。 |

这四份都在千字节级，是“接着上一批继续”的最小状态。**它们必须入库**：CI 的翻译
job 从仓库恢复状态，不入库等于每批从零开始。

## 二、不入库：可重建的大记忆

| 文件 | 体积 | 重建方式 |
| --- | --- | --- |
| `model-memory.json` | 25.3 MiB | `npm run translate:harvest` 从 `i18n/` 的 overlay 反向配对英文/中文块，重建模型记忆。 |
| `tm-global.zh-Hans.json` | 13.9 MiB | 纯派生：每次 `npm run translate:apply` 由 `translation-memory` + `model-memory` + `comment-memory` 合并重建。删掉只是下一批慢一点（要重新合并），不会丢译文。 |
| `table-memory.json` | 321 KiB | 表格行的翻译缓存。跑 `node tools/translate/tables.mjs` 时按 overlay/模型记忆补建；未命中的行才会调用模型。 |
| `usage.jsonl` | 519 B | 本地成本流水，`tools/translate/lib/provider.mjs` 追加写入。属于本机日志，不是可移植状态。 |

`model-memory.json` 虽然能重建，但重建结果依赖当时的 overlay；把它留一份归档（见下）
只是让新克隆“开箱即热”，不是必需。

## 三、不可重建：`translation-memory.json`

`translation-memory.json`（18.2 MiB）是已审校的旧版语料对齐结果，**无法从当前仓库重建**
——生成它的 legacy 语料已经从工作区移除。丢了它，模型只能重翻，等于丢掉审校过的措辞。

它归档在 release **`memory-v1`**：

- Release 页面：<https://github.com/newwlfz/mikrotik_manual_zh_hans/releases/tag/memory-v1>
- `translation-memory.json`（18.2 MiB）：
  <https://github.com/newwlfz/mikrotik_manual_zh_hans/releases/download/memory-v1/translation-memory.json>
- `model-memory.json`（25.3 MiB，可重建，随附一份热启动副本）：
  <https://github.com/newwlfz/mikrotik_manual_zh_hans/releases/download/memory-v1/model-memory.json>

下载回本目录（仓库是公开的，不需要 token）：

```bash
cd work/translate
curl -L -O https://github.com/newwlfz/mikrotik_manual_zh_hans/releases/download/memory-v1/translation-memory.json
# 可选：热启动的模型记忆
curl -L -O https://github.com/newwlfz/mikrotik_manual_zh_hans/releases/download/memory-v1/model-memory.json
```

有 `gh` 时等价于：

```bash
gh release download memory-v1 -R newwlfz/mikrotik_manual_zh_hans -D work/translate
```

## 四、变更流程

1. 正常翻译/审校，大记忆随便改，**不要 `git add` 它们**（`.gitignore` 已经挡住；
   `git status` 里它们根本不该出现）。
2. 需要长期保留新的 `translation-memory.json` 时，**新建**一个 `memory-v2` release
   （tag 从当时 `main` 创建），把资产传上去；**不要覆盖 `memory-v1`**：旧 tag 要能
   一直下载到 v1 的内容。
3. 同时更新本文件的资产 URL/体积，并在提交信息里写清 `memory-v2`。
4. 派生物（`tm-global`、`table-memory`、`usage.jsonl`、以及其他一次性备份）直接删或
   移到仓库外的 `../work/translate-archive/`；它们不该长期躺在 `work/translate/` 里，
   否则每次 `ls` 都要和 40 MB 的噪声打交道。

## 五、本地归档目录

仓库外（工作区 `work/translate-archive/`）保留了一份派生物副本，仅作本机排查用，
不发布、不提交：

| 文件 | 体积 | 说明 |
| --- | --- | --- |
| `translation-memory.before-html-links.json` | 18.2 MiB | 链接改写前的一次性快照，零引用。 |
| `tm-global.zh-Hans.json` | 13.9 MiB | 旧的合并结果，纯派生。 |
| `legacy-index.json` | 2.5 MiB | 旧 legacy 索引，已失效。 |
| `table-memory.json` | 321 KiB | 表格行缓存。 |
| `usage.jsonl` | 519 B | 旧的成本流水。 |

确认没用了就可以连同目录一起删。
