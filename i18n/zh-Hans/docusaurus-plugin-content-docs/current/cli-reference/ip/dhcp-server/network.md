---
sidebar_key: "cli-reference/ip/dhcp-server/network"
sidebar_position: 5
title: "network"
sidebar_label: 'network'
source: https://manual.mikrotik.com/docs/cli-reference/ip/dhcp-server/network
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dhcp-server/network {#ipdhcp-servernetwork}
**类型：** 目录

发送给 DHCP 客户端的设置。服务器会把包含客户端地址的网络条目的设置发送给客户端。详情请参阅 [DHCP 服务器](../../../network-management/dhcp/server.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dynamic">该网络是动态创建的。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="composite { address: ipAddr
, netmask: num [ .. 32]
 }">此条目适用的网络，例如 `192.168.88.0/24`。</ArgTableRow>
<ArgTableRow arg="gateway" typ="multi { address: ipAddr
 }">发送给客户端的默认网关（选项 3）。可以列出多个网关。</ArgTableRow>
<ArgTableRow arg="netmask" typ="num">当子网掩码需要与 `address` 的掩码不同时，以前缀长度形式发送给客户端的子网掩码。使用 `0` 时，将使用 `address` 的掩码。</ArgTableRow>
<ArgTableRow arg="dns-server" typ="alt { server: multi { address: ipAddr
 }
 }">发送给客户端的 DNS 服务器（选项 6）。未设置时，服务器会发送路由器自身使用的 DNS 服务器（`/ip/dns`）。</ArgTableRow>
<ArgTableRow arg="dns-none" typ="bool">是否完全不发送 DNS 服务器，连路由器自身的 DNS 服务器也不发送。默认值：no。</ArgTableRow>
<ArgTableRow arg="wins-server" typ="multi { address: ipAddr
 }">发送给客户端的 WINS 服务器（选项 44）。</ArgTableRow>
<ArgTableRow arg="ntp-server" typ="alt { server: multi { address: ipAddr
 }
 }">发送给客户端的 NTP 服务器（选项 42）。未设置时，服务器会发送路由器自身使用的 NTP 服务器。</ArgTableRow>
<ArgTableRow arg="ntp-none" typ="bool">是否完全不发送 NTP 服务器，连路由器自身的 NTP 服务器也不发送。默认值：no。</ArgTableRow>
<ArgTableRow arg="caps-manager" typ="multi { address: ipAddr
 }">发送给客户端的 CAPsMAN 地址（选项 138）。</ArgTableRow>
<ArgTableRow arg="domain" typ="string">发送给客户端的域名（选项 15）。</ArgTableRow>
<ArgTableRow arg="next-server" typ="ipAddr">用于网络引导下一步的服务器地址，在 `siaddr` 字段中发送，例如 TFTP 服务器。未设置时，将发送 DHCP 服务器的地址。</ArgTableRow>
<ArgTableRow arg="boot-file-name" typ="string">用于网络引导的引导文件名，在 `file` 字段中发送。</ArgTableRow>
<ArgTableRow arg="dhcp-option" typ="multi { array-id, option: enum
 }">在此网络中发送给客户端的选项（`/ip/dhcp-server/option`）。服务器和租约的选项优先。</ArgTableRow>
<ArgTableRow arg="dhcp-option-set" typ="enum (none)">在此网络中发送给客户端的选项集（`/ip/dhcp-server/option/sets`）。服务器和租约的选项优先。</ArgTableRow>
<ArgTableRow arg="cmr-none" typ="bool">不会向客户端发送任何服务器信息</ArgTableRow>
<ArgTableRow arg="cmr-server" typ="ipAddr">若未设置，则当启用 CMR 时将包含 DHCP 服务器的 IP 地址；若已设置，则即使禁用 CMR 也始终包含该自定义 IP 地址</ArgTableRow>
</ArgTable>
