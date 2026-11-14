---
sidebar_key: "cli-reference/tool/sniffer/protocol"
sidebar_position: 4
title: "protocol"
sidebar_label: 'protocol'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/sniffer/protocol
captured_at: '2026-11-01T21:25:58+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/sniffer/protocol {#toolsnifferprotocol}
**类型：** 目录

按 MAC 协议、IP 协议和端口统计最后一次抓包的包数与字节数，以及每一行占全部已抓取字节的比例。一个包会统计在它所属的每一行中：对于 TCP 包，会统计在 `ip` 行、`ip`/`tcp` 行以及其每个端口对应的行中。参见[数据包嗅探器](../../../diagnostics-monitoring-and-troubleshooting/packet-sniffer.md)。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="protocol" typ="enum ()">MAC（L2）协议，例如 `ip`、`arp`、`ipv6` 或 `802.2`。</ArgTableRow>
<ArgTableRow arg="ip-protocol" typ="enum (ip) { ip:0 }">IP 协议，例如 `icmp`、`tcp` 或 `udp`。在统计整个 MAC 协议的行上为空。</ArgTableRow>
<ArgTableRow arg="port" typ="enum ()">端口，在已知时附带其服务名称，例如 `80 (http)`。在统计整个协议的行上为空。</ArgTableRow>
<ArgTableRow arg="packets" typ="num">此行中已抓取的包数。</ArgTableRow>
<ArgTableRow arg="bytes" typ="num">此行中已抓取的字节数。</ArgTableRow>
<ArgTableRow arg="share" typ="num">此行字节数占全部已抓取字节的比例，以百分比表示。</ArgTableRow>
</ArgTable>
