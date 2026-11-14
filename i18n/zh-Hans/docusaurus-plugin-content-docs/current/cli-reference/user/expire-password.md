---
sidebar_key: "cli-reference/user/expire-password"
sidebar_position: 3
title: "expire-password"
sidebar_label: 'expire-password'
source: https://manual.mikrotik.com/docs/cli-reference/user/expire-password
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## user/expire-password {#userexpire-password}
**类型：** 命令

使所选用户的密码过期（在 [`/user`](./index.md) 中设置 `E` 标志）。在下一次交互式登录时，系统会要求用户设置新密码；使用 `/user/set` 设置新密码也会清除该标志。完整指南请参阅 [用户](../../authentication-authorization-accounting/user.md)。
