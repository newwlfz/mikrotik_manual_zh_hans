---
sidebar_key: "cli-reference/system/license/renew"
sidebar_position: 3
title: "renew"
sidebar_label: 'renew'
source: https://manual.mikrotik.com/docs/cli-reference/system/license/renew
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/license/renew {#systemlicenserenew}
**系统能力：** chr
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="account" typ="string">MikroTik.com 账户用户名。</ArgTableRow>
<ArgTableRow arg="password" typ="string">MikroTik.com 账户密码。</ArgTableRow>
<ArgTableRow arg="level" typ="enum (p1 | p10 | p-unlimited) { p1:1, p10:2, p-unlimited:3 }">所需的 CHR 许可证级别。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="string">续订操作的状态。</ArgTableRow>
</ArgTable>
