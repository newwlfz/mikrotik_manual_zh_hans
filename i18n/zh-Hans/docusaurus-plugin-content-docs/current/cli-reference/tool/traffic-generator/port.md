---
sidebar_key: "cli-reference/tool/traffic-generator/port"
sidebar_position: 4
title: "port"
sidebar_label: 'port'
source: https://manual.mikrotik.com/docs/cli-reference/tool/traffic-generator/port
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/traffic-generator/port {#tooltraffic-generatorport}
**类型：** Directory
端口将接口绑定到流量生成器，用于发送和接收生成的数据包。参见 [流量生成器](../../../diagnostics-monitoring-and-troubleshooting/traffic-generator.md) 指南。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">无效</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">端口的描述性名称。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">与该端口关联的接口名称。必填。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="first-header" typ="enum (mac | vlan | ip | udp | raw | ipv6 | tcp) { mac:1, vlan:2, ip:3, udp:4, raw:5, ipv6:6, tcp:7 }">建议从此接口发出的数据包使用的第一个首部。创建数据包模板时可以使用。</ArgTableRow>
</ArgTable>
