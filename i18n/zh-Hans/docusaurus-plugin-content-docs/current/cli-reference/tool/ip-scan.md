---
sidebar_key: "cli-reference/tool/ip-scan"
sidebar_position: 10
title: "ip-scan"
sidebar_label: 'ip-scan'
source: https://manual.mikrotik.com/docs/cli-reference/tool/ip-scan
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/ip-scan {#toolip-scan}
**条件：** !smips
**类型：** 命令

查找网络中的主机，仅限 IPv4。使用 `address-range` 时，路由器会探测该范围内的每个地址，并列出有应答的主机；仅使用 `interface` 时，它不发送任何探测，而是列出它在该接口流量中看到的地址。扫描会一直运行，直到你停止它，或持续 `duration` 指定的时长。有关示例，请参阅 [IP 扫描](../../diagnostics-monitoring-and-troubleshooting/ip-scan.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dhcp">dhcp</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum">要监听的接口。未指定 `address-range` 时，路由器不会向主机发送探测，而是列出它在该接口流量中看到的地址，包括来自其他子网的地址。</ArgTableRow>
<ArgTableRow arg="address-range" typ="ipRange">要扫描的地址：可以是 `192.168.88.0/24` 这样的前缀、`192.168.88.1-192.168.88.254` 这样的范围，或单个地址。在直连子网上，路由器通过 ARP 请求查找主机；在其他网络上，则通过 ICMP 回显请求查找。同时指定 `interface` 时，路由器会扫描该范围。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="ipAddr">主机的地址。该范围内路由器自身的地址也会列出。</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">主机的 MAC 地址，来自其 ARP 应答。仅适用于直连子网上的主机。</ArgTableRow>
<ArgTableRow arg="time" typ="num">对 ICMP 回显请求的响应时间。主机不响应 ping 时为空。</ArgTableRow>
<ArgTableRow arg="dns" typ="string">通过路由器的 DNS 解析器对该地址进行反向 DNS 查询得到的名称。</ArgTableRow>
<ArgTableRow arg="snmp" typ="string">主机的系统名称（`sysName`），当其使用团体名 `public` 应答 SNMPv1 请求时显示。</ArgTableRow>
<ArgTableRow arg="netbios" typ="string">主机的 NetBIOS 名称，当其应答 UDP 端口 137 上的 NetBIOS 名称查询时显示。</ArgTableRow>
</ArgTable>
