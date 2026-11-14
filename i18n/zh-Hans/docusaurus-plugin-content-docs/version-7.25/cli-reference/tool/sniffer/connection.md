---
sidebar_key: "cli-reference/tool/sniffer/connection"
sidebar_position: 1
title: "connection"
sidebar_label: 'connection'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/sniffer/connection
captured_at: '2026-11-01T21:26:00+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/sniffer/connection {#toolsnifferconnection}
**类型：** 目录

最近一次捕获中看到的 TCP 连接。请参阅 [数据包嗅探器](../../../diagnostics-monitoring-and-troubleshooting/packet-sniffer.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="A" typ="active">活动连接。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="src-address" typ="composite { address: ipAddr
, port: enum ()
 }">打开连接的一侧的地址和端口，并附带已知的服务名称。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="composite { address: ipAddr
, port: enum ()
 }">另一侧的地址和端口，并附带已知的服务名称，例如 `192.168.88.36:80 (http)`。</ArgTableRow>
<ArgTableRow arg="bytes" typ="composite { in: num
, out: num
 }">捕获到的由源端和目标端发送的字节数，以 源/目标 的形式显示。</ArgTableRow>
<ArgTableRow arg="resends" typ="composite { in: num
, out: num
 }">从源端和目标端观察到的重传次数（源/目标）。</ArgTableRow>
<ArgTableRow arg="mss" typ="composite { in: num
, out: num
 }">源端和目标端通告的 TCP 最大报文段长度（源/目标）。</ArgTableRow>
</ArgTable>
