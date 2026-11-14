---
sidebar_key: "cli-reference/ip/neighbor"
title: "neighbor"
sidebar_label: 'neighbor'
source: https://manual.mikrotik.com/docs/cli-reference/ip/neighbor
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/neighbor {#ipneighbor}
**类型：** 目录

邻居列表显示二层广播域中所有已发现的邻居、每个邻居所连接的接口、其 IP 和 MAC 地址以及其他相关参数。通过 MNDP、CDP 和 LLDP 发现的邻居会一起显示在这里。要查看 LLDP 发现的邻居的完整 LLDP 详细信息，请使用 [`/ip/neighbor/lldp`](./lldp.md) 菜单。

为避免内存耗尽，每个接口的邻居条目数上限为（总内存 MB 数）* 16。

```ros
[admin@MikroTik] /ip/neighbor/print 
 # INTERFACE ADDRESS         MAC-ADDRESS       IDENTITY   VERSION    BOARD      
 0 ether13   192.168.33.2    00:0C:42:00:38:9F MikroTik   5.99       RB1100AHx2
 1 ether11   1.1.1.4         00:0C:42:40:94:25 test-host  5.8        RB1000   
 2 Local     10.0.11.203     00:02:B9:3E:AD:E0 c2611-r1   Cisco I...                    
 3 Local     10.0.11.47      00:0C:42:84:25:BA 11.47-750  5.7        RB750  
 4 Local     10.0.11.254     00:0C:42:70:04:83 tsys-sw1   5.8        RB750G    
 5 Local     10.0.11.202     00:17:5A:90:66:08 c7200      Cisco I...
```

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="multi { interface: iface_enum
 }">发现设备所连接的接口名称。同时显示主接口和实际从接口。</ArgTableRow>
<ArgTableRow arg="address" typ="alt { address4: ipAddr
, address6: ip6Addr
 }">发现设备上配置的最高 IP 地址。</ArgTableRow>
<ArgTableRow arg="address4" typ="ipAddr">发现设备上配置的 IPv4 地址。</ArgTableRow>
<ArgTableRow arg="address6" typ="ip6Addr">发现设备上配置的 IPv6 地址。</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">远程设备的 MAC 地址。可用于通过 mac-telnet 进行连接。</ArgTableRow>
<ArgTableRow arg="identity" typ="string">发现设备所配置的系统标识。</ArgTableRow>
<ArgTableRow arg="platform" typ="string">平台名称，例如 "MikroTik"、"cisco"。</ArgTableRow>
<ArgTableRow arg="version" typ="string">远程设备上所安装软件的版本号。</ArgTableRow>
<ArgTableRow arg="unpack" typ="enum (none | simple | uncompress-headers | uncompress-all) { none:0x00, simple:0x01, uncompress-headers:0x03, uncompress-all:0x07 }">邻居所通告的 [IP 打包](../../../system-information-and-utilities/ip-packing.md) 解包设置。只有当路由器通告解包时，它才会向该邻居进行打包。`simple`、`uncompress-headers` 和 `uncompress-all` 分别对应 `unpacking` 的值 `simple`、`compress-headers` 和 `compress-all`。</ArgTableRow>
<ArgTableRow arg="age" typ="time">自上次收到发现报文以来经过的时间间隔。</ArgTableRow>
<ArgTableRow arg="uptime" typ="time">远程设备的运行时间。仅对安装了 RouterOS 的设备显示。</ArgTableRow>
<ArgTableRow arg="software-id" typ="string">远程设备上的 RouterOS 软件 ID。仅适用于安装了 RouterOS 的设备。</ArgTableRow>
<ArgTableRow arg="board" typ="string">RouterBoard 型号。仅对安装了 RouterOS 的设备显示。</ArgTableRow>
<ArgTableRow arg="ipv6" typ="bool">该设备是否启用了 IPv6。</ArgTableRow>
<ArgTableRow arg="interface-name" typ="string">邻居设备上连接到该二层广播域的接口名称。适用于 CDP。</ArgTableRow>
<ArgTableRow arg="system-description" typ="string">链路层发现协议（LLDP）报告的系统描述。</ArgTableRow>
<ArgTableRow arg="system-caps" typ="ubit (other, repeater, bridge, wlan-ap, router, telephone, docsis-cable-device, station-only)">LLDP 报告的系统能力。</ArgTableRow>
<ArgTableRow arg="system-caps-enabled" typ="ubit (other, repeater, bridge, wlan-ap, router, telephone, docsis-cable-device, station-only)">LLDP 报告的已启用系统能力。</ArgTableRow>
<ArgTableRow arg="discovered-by" typ="ubit (cdp, lldp, mndp)">发现该邻居所使用的发现协议。</ArgTableRow>
<ArgTableRow arg="running" typ="multi { array-id, cap: string
 }" unset="1">邻居设备上正在运行的功能列表。目前仅列出 CAPsMAN 功能。</ArgTableRow>
</ArgTable>
