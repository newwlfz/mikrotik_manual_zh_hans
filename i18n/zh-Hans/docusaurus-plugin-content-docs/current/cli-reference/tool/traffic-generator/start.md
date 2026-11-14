---
sidebar_key: "cli-reference/tool/traffic-generator/start"
sidebar_position: 7
title: "start"
sidebar_label: 'start'
source: https://manual.mikrotik.com/docs/cli-reference/tool/traffic-generator/start
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/traffic-generator/start {#tooltraffic-generatorstart}
**类型：** 命令
在后台启动流量生成器。所有参数都会覆盖流和报文模板中配置的值（与快速命令中的行为相同）。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="test-id" typ="num">测试会话 ID（参见 general traffic-generator 菜单）。</ArgTableRow>
<ArgTableRow arg="measure-out-of-order" typ="bool">是否为此测试测量并报告乱序接收的数据包。</ArgTableRow>
<ArgTableRow arg="cpu-core" typ="multi { array-id, array-id, cpu-core: range [0 .. 255]
 }">流所绑定的 CPU 核心或核心范围（0-255），用于多核测试。</ArgTableRow>
<ArgTableRow arg="stream" typ="multi { stream: enum
 }">要启动的流的名称。</ArgTableRow>
<ArgTableRow arg="port" typ="multi { port: enum
 }">要从中开始发送的端口。</ArgTableRow>
<ArgTableRow arg="interface" typ="multi { port: iface_enum
 }">要从中开始发送的接口；每个接口都隐含一个端口。</ArgTableRow>
<ArgTableRow arg="id" typ="multi { id: num [0 .. 255]
 }">要启动的流 ID。</ArgTableRow>
<ArgTableRow arg="packet-size" typ="multi { array-id, array-id, packet-size: range [1 .. 65535]
 }">覆盖生成的数据包大小（以字节为单位）；范围会生成随机大小。</ArgTableRow>
<ArgTableRow arg="pps" typ="multi { pps: num
 }">覆盖每秒数据包速率。</ArgTableRow>
<ArgTableRow arg="mbps" typ="multi { mbps: num
 }">覆盖每秒兆比特速率。</ArgTableRow>
<ArgTableRow arg="tx-template" typ="multi { tx-template: enum
 }">覆盖用作数据包内容来源的数据包模板（最多 16 个）。</ArgTableRow>
<ArgTableRow arg="packet-count" typ="multi { packet-count: num
 }">覆盖要发送的数据包数量。</ArgTableRow>
</ArgTable>
