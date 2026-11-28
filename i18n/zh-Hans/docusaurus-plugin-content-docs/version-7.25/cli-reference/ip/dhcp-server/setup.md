---
title: "setup"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dhcp-server/setup
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/ip/dns"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/dhcp-server/setup 
**类型：** 命令

交互式设置，可一步创建 IP 地址池、DHCP 网络和 DHCP 服务器。它会依次询问每个值，并根据接口地址建议网络、网关和地址范围，根据服务器默认值建议租约时间。示例请参阅 [DHCP Server](/docs/network-management/dhcp/server)。

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="interface" typ="iface_enum">Interface to run the DHCP server on.</ArgTableRow>
<ArgTableRow arg="network" typ="composite { address: ipAddr
, netmask: num [ .. 32]
 }">Network to give out addresses in, for example `192.168.88.0/24`. Suggested from the address of the interface.</ArgTableRow>
<ArgTableRow arg="gateway" typ="ipAddr">Default gateway sent to clients. Suggested from the address of the interface.</ArgTableRow>
<ArgTableRow arg="relay" typ="ipAddr">Address of the DHCP relay, when the clients are not directly connected.</ArgTableRow>
<ArgTableRow arg="ippool" typ="multi { range: composite { min: ipAddr
, max: ipAddr
 }
 }">Address range to give out, for example `192.168.88.2-192.168.88.254`. The setup creates an IP pool with this range.</ArgTableRow>
<ArgTableRow arg="send-dns" typ="bool">Whether the DHCP server sends DNS servers to clients. The setup requires `yes` or `no`.</ArgTableRow>
<ArgTableRow arg="dns-servers" typ="multi { address: ipAddr
 }">DNS servers sent to clients. Leave empty to send the DNS servers from the router's DNS settings (`/ip/dns`).</ArgTableRow>
<ArgTableRow arg="lease-time" typ="time">Lease time of the new server. Suggested: 1800s.</ArgTableRow>
</ArgTable>
