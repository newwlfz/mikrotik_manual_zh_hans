# LLM 配置（翻译）

`tools/translate` 会把仍是英文的文本块发到一个兼容 OpenAI chat-completions
的接口。接口地址、模型和密钥属于连接配置，不是仓库内容：它们从不入库，
`config/translation.yml` 也不再保存它们。

## 变量

| 名称 | 必填 | 默认值 | 含义 |
| --- | --- | --- | --- |
| `LLM_BASE_URL` | 是 | — | 兼容 OpenAI 的 API 基地址，例如 `https://api.deepseek.com/v1` 或 `https://opencode.ai/zen/v1`。以 `/v1` 结尾时自动补 `/chat/completions`；已经带 `/chat/completions` 的完整地址原样使用。尾部斜杠会被忽略；查询串和片段会被拒绝。 |
| `LLM_MODEL` | 是 | — | 精确的模型名，例如 `deepseek-v4.1-flash`。 |
| `LLM_API_KEY` | 是 | — | 服务商密钥。**只认这个变量名。** |
| `LLM_TIMEOUT_MS` | 否 | `120000` | 单次请求超时，毫秒。 |
| `LLM_MAX_RETRIES` | 否 | `3` | 可重试失败（`408`、`429`、`5xx`、超时、网络错误）后的重试次数；`0` 表示不重试。 |
| `LLM_EXTRA_HEADERS` | 否 | — | 额外请求头的 JSON 对象，例如 `{"X-Org":"team"}`；不得设置 `Authorization`。 |

所有工具输出和日志里，`LLM_API_KEY` 只显示前 4 位和后 4 位（如
`oc_s…DKIc`），绝不打印完整值。

`OPENCODE_API_KEY` 已弃用，请改名（**deprecated, rename it to
`LLM_API_KEY`**）。检测到旧名时工具会打印警告。

## 取值顺序

按下面的顺序取第一个非空值：

1. `process.env`（CI 就是这样注入的）；
2. `<仓库根>/.env.local`；
3. `<工作区根>/.env.local`，即仓库的上一级目录。

文件不会覆盖 `process.env` 中已经存在的值。解析支持 `KEY=VALUE`、
`export KEY=VALUE`、`#` 注释行、单/双引号包裹和行尾空白。

## GitHub Actions 配置位置

在运行翻译的仓库（`mikrotik_manual_zh_hans`）里配置：

1. **Settings → Secrets and variables → Actions**；
2. **Variables** 页（非密钥，日志可见）：
   - `LLM_BASE_URL`
   - `LLM_MODEL`
   - 可选：`LLM_TIMEOUT_MS`、`LLM_MAX_RETRIES`、`LLM_EXTRA_HEADERS`
3. **Secrets** 页（打码）：
   - `LLM_API_KEY`

翻译工作流需要把它们映射进 job 环境，例如：

```yaml
env:
  LLM_BASE_URL: ${{ vars.LLM_BASE_URL }}
  LLM_MODEL: ${{ vars.LLM_MODEL }}
  LLM_API_KEY: ${{ secrets.LLM_API_KEY }}
  LLM_TIMEOUT_MS: ${{ vars.LLM_TIMEOUT_MS }}
  LLM_MAX_RETRIES: ${{ vars.LLM_MAX_RETRIES }}
```

变量为空时工具**不会**回退到默认 endpoint 或模型：
`verify:llm --dry-run` 和翻译任务都会直接报出缺哪个变量。

## 本地使用

```bash
cp .env.local.example .env.local
# 填入 LLM_BASE_URL、LLM_MODEL、LLM_API_KEY
node tools/translate/verify-llm.mjs --dry-run
node tools/translate/verify-llm.mjs
```

`.env.local` 在两个仓库都已被 git 忽略。放在仓库根或工作区根都可以：
仓库根优先，`process.env` 优先于两者。

## 自检

`npm run verify:llm -- --dry-run`：只校验变量是否齐全、URL 是否合法、数值
是否有效，打印脱敏后的配置；成功 `exit 0`，失败 `exit 1` 并列出缺少的变量
和查找过的文件。

`npm run verify:llm`：发一个最小请求（`把 hello 翻译成中文`，
`max_tokens: 32`），打印脱敏后的 base URL、模型、HTTP 状态、耗时和返回文本。

| 结果 | 含义与处理 |
| --- | --- |
| `401` | `LLM_API_KEY` 无效或已吊销，换新 key。 |
| `402` | key 有效但账户余额不足，去服务商充值。 |
| `404` | 端点或模型名错：检查 `LLM_BASE_URL`（通常以 `/v1` 结尾）和精确的 `LLM_MODEL`。 |
| `429` | 被限流：稍后重试、减小批次，或调大 `LLM_MAX_RETRIES`。 |
| 超时 | 调大 `LLM_TIMEOUT_MS`，或检查到服务商的网络。 |
| 缺变量 | 按报错列出的变量名，在环境变量、`<仓库>/.env.local` 或 `<工作区>/.env.local` 中补齐。 |

## 不需要配置 LLM 的仓库

只有运行 `tools/translate` 的仓库需要 `LLM_*`。**总管仓（hub/content 仓库）
和英文站构建都不调用 LLM，不需要任何变量或密钥**；密钥只放在翻译仓库。
