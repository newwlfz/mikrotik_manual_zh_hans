---
title: "文档更新 - 2026年10月23日"
date: 2026-10-23T00:00:00.000Z
slug: /changelog-2026-10-23
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

# 文档更新 - 2026年10月23日 {#documentation-updates---october-23-2026}

October 23, 2026

2026年10月23日所做文档更改的摘要。

## 认证与 AAA[​](#authentication--aaa "认证与 AAA 的直接链接") {#authentication--aaa}

-   **[Certificates](/docs/authentication-authorization-accounting/certificates)**、**[User](/docs/authentication-authorization-accounting/user)**：具有弱 RSA 公共指数（7 或更低）的证书和 SSH 密钥仍可继续使用，但会在 `/certificate/print`、`/user/ssh-keys` 和 `/user/ssh-keys/private` 输出中被标记为注释 `key uses insecure RSA public exponent!`。请将它们替换为更强的密钥。此内容也已添加到 7.25 手册中。

## 管理工具[​](#management-tools "管理工具的直接链接") {#management-tools}

-   **[SSH](/docs/management-tools/ssh)**：具有弱公共指数的 RSA 主机密钥会被自动重新生成，并记录该事件（`host key uses insecure RSA public exponent! Host key will be regenerated!`）。在任何重新生成之后，固定了旧密钥的客户端会报告指纹不匹配。此内容也已添加到 7.25 手册中。

**Tags:**

-   [文档变更日志](/changelog/tags/changelog "文档更新的每日摘要")
