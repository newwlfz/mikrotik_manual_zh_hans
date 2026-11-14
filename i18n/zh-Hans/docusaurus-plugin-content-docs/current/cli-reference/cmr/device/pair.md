---
sidebar_key: "cli-reference/cmr/device/pair"
sidebar_position: 3
title: "pair"
sidebar_label: 'pair'
source: https://manual.mikrotik.com/docs/cli-reference/cmr/device/pair
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/device/pair {#cmrdevicepair}
**软件包：** cmr
**类型：** Command

开始与所选设备进行配对。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="labels" typ="object" unset="1">选择要使用 labels 配对的设备。支持 + 和 - 符号分别作为 AND 和 AND NOT 运算符；如果未提供符号，则使用 OR 运算符。</ArgTableRow>
<ArgTableRow arg="username" typ="string" unset="1">当设备需要时用于配对的用户名。</ArgTableRow>
<ArgTableRow arg="password" typ="string" unset="1">当设备需要时用于配对的密码。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="device" typ="enum">正在配对的设备。</ArgTableRow>
<ArgTableRow arg="status" typ="string">配对状态。</ArgTableRow>
</ArgTable>
