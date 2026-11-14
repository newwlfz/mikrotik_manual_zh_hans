---
sidebar_key: "cli-reference/interface/lte/at-chat"
sidebar_position: 2
title: "at-chat"
sidebar_label: "at-chat"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/interface/lte/at-chat
captured_at: '2026-11-01T21:27:26+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/lte/at-chat {#interfacelteat-chat}
**条件：** !smips
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="input" typ="string">向调制解调器发送命令，并在返回前等待任意输出</ArgTableRow>
<ArgTableRow arg="wait" typ="alt { wait: enum (no | yes) { no:0, yes:3 }
 }">始终等待 3 秒</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="output" typ="string"></ArgTableRow>
</ArgTable>
