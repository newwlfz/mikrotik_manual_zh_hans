---
sidebar_key: "cli-reference/ip/dhcp-server/setup"
sidebar_position: 7
title: "setup"
sidebar_label: 'setup'
source: https://manual.mikrotik.com/docs/cli-reference/ip/dhcp-server/setup
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dhcp-server/setup {#ipdhcp-serversetup}
**类型：** 命令

交互式设置，可一步创建 IP 池、DHCP 网络和 DHCP 服务器。它会依次询问每个值，并根据接口地址建议网络、网关和地址范围，并根据服务器默认值建议租约时间。有关示例，请参见 [DHCP 服务器](../../../network-management/dhcp/server.md)。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum">用于运行 DHCP 服务器的接口。</ArgTableRow>
<ArgTableRow arg="network" typ="composite { address: ipAddr
, netmask: num [ .. 32]
 }">用于分配地址的网络，例如 `192.168.88.0/24`。根据接口地址建议。</ArgTableRow>
<ArgTableRow arg="gateway" typ="ipAddr">发送给客户端的默认网关。根据接口地址建议。</ArgTableRow>
<ArgTableRow arg="relay" typ="ipAddr">当客户端不是直接连接时，DHCP 中继的地址。</ArgTableRow>
<ArgTableRow arg="ippool" typ="multi { range: composite { min: ipAddr
, max: ipAddr
 }
 }">要分配的地址范围，例如 `192.168.88.2-192.168.88.254`。该设置会使用此范围创建 IP 池。</ArgTableRow>
<ArgTableRow arg="send-dns" typ="bool">DHCP 服务器是否向客户端发送 DNS 服务器。该设置要求输入 `yes` 或 `no`。</ArgTableRow>
<ArgTableRow arg="dns-servers" typ="multi { address: ipAddr
 }">发送给客户端的 DNS 服务器。留空则发送路由器 DNS 设置（`/ip/dns`）中的 DNS 服务器。</ArgTableRow>
<ArgTableRow arg="lease-time" typ="time">新服务器的租约时间。建议值：1800s。</ArgTableRow>
</ArgTable>
