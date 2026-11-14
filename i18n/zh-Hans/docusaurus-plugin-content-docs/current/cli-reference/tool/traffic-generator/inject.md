---
sidebar_key: "cli-reference/tool/traffic-generator/inject"
sidebar_position: 2
title: "inject"
sidebar_label: 'inject'
source: https://manual.mikrotik.com/docs/cli-reference/tool/traffic-generator/inject
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/traffic-generator/inject {#tooltraffic-generatorinject}
**类型：** 命令
将原始数据注入到接口。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum">将原始数据注入到的接口。</ArgTableRow>
<ArgTableRow arg="data" typ="string">要注入的原始数据，以十六进制字符串表示。</ArgTableRow>
<ArgTableRow arg="priority" typ="num" unset="1">注入数据包的优先级。</ArgTableRow>
</ArgTable>
