---
sidebar_key: "cli-reference/tool/traffic-generator/raw-packet-template"
sidebar_position: 6
title: "raw-packet-template"
sidebar_label: 'raw-packet-template'
source: https://manual.mikrotik.com/docs/cli-reference/tool/traffic-generator/raw-packet-template
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/traffic-generator/raw-packet-template {#tooltraffic-generatorraw-packet-template}
**类型：** 目录
从原始报头字符串构建数据包内容。当您需要 packet-template 构建器无法表达的低层数据包时，请使用此项。请参阅[流量生成器](../../../diagnostics-monitoring-and-troubleshooting/traffic-generator.md)指南。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">RAW 数据包模板的描述性名称。</ArgTableRow>
<ArgTableRow arg="port" typ="enum">端口名称（来自 port 菜单），数据包通过该端口发送出去。</ArgTableRow>
<ArgTableRow arg="header" typ="string">以十六进制字符串表示的 RAW 数据包头部；它完整定义了头部栈。</ArgTableRow>
<ArgTableRow arg="data" typ="enum (uninitialized | random | specific-byte | incrementing) { uninitialized:0, random:1, specific-byte:2, incrementing:3 }">数据包载荷（头部之后的部分）的填充方式：uninitialized（不置零；最快）、specific-byte（使用 data-byte 填充）、incrementing（字节 00 01 02 ...）、random（随机字节；最慢）。</ArgTableRow>
<ArgTableRow arg="data-byte" typ="num">当 data=specific-byte 时用于填充载荷的字节。</ArgTableRow>
<ArgTableRow arg="random-byte-offsets-and-masks" typ="multi { array-id, array-id, offset-and-mask: composite { offset: num [ .. 256]
, mask: num [ .. 255]
 }
 }">数据包中的字节偏移量，每个都带有一个位掩码，这些位置将被填入随机值。</ArgTableRow>
<ArgTableRow arg="random-ranges" typ="object { random-range: super { offset: num [ .. 256]
, [width] :enum (8 | 16 | 32) { 8:8, 16:16, 32:32 }
, [range] :range
 }
 }">位于给定字节偏移处的字段将被填入随机值：`width` 设置字段大小（8、16 或 32 位），`range` 设置取值范围。</ArgTableRow>
<ArgTableRow arg="ip-header-offset" typ="multi { ip-header-offset: num [ .. 65535]
 }">IPv4 头部在数据包中的字节偏移量，以便生成器能够定位并解析它。</ArgTableRow>
<ArgTableRow arg="ipv6-header-offset" typ="multi { ipv6-header-offset: num [ .. 65535]
 }">IPv6 头在数据包中的字节偏移量。</ArgTableRow>
<ArgTableRow arg="udp-header-offset" typ="multi { udp-header-offset: num [ .. 65535]
 }">UDP 头在数据包中的字节偏移量。</ArgTableRow>
<ArgTableRow arg="udp-compute-checksum" typ="multi { udp-compute-checksum: bool
 }">UDP 校验和是否由生成器计算。</ArgTableRow>
<ArgTableRow arg="tcp-header-offset" typ="multi { tcp-header-offset: num [ .. 65535]
 }">TCP 头在数据包中的字节偏移量。</ArgTableRow>
<ArgTableRow arg="special-footer" typ="bool">是否在生成的数据包后附加特殊尾部。</ArgTableRow>
<ArgTableRow arg="compute-checksum-from-offset" typ="num">计算 2 字节校验和的起始字节偏移量；例如 14 表示跳过以太网头。no-checksum 表示禁用校验和。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="header-length" typ="num">数据包头部的总长度（以字节为单位）。</ArgTableRow>
</ArgTable>
