---
title: "network"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dhcp-server/network
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/ip/dhcp-server/option"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/dhcp-server/network 
**类型：** 目录

发送给 DHCP 客户端的设置。服务器向客户端发送包含该客户端地址的 network 条目的设置。详情请参阅 [DHCP Server](/docs/network-management/dhcp/server)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="D" typ="dynamic">The network was created dynamically.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="address" typ="composite { address: ipAddr
, netmask: num [ .. 32]
 }">Network this entry applies to, for example `192.168.88.0/24`.</ArgTableRow>
<ArgTableRow arg="gateway" typ="multi { address: ipAddr
 }">Default gateway sent to clients (option 3). More than one gateway can be listed.</ArgTableRow>
<ArgTableRow arg="netmask" typ="num">Subnet mask sent to clients, as a prefix length, when it should differ from the mask of `address`. With `0`, the mask of `address` is used.</ArgTableRow>
<ArgTableRow arg="dns-server" typ="alt { server: multi { address: ipAddr
 }
 }">DNS servers sent to clients (option 6). When not set, the server sends the DNS servers the router itself uses (`/ip/dns`).</ArgTableRow>
<ArgTableRow arg="dns-none" typ="bool">Whether to send no DNS servers at all, not even those of the router. Default: no.</ArgTableRow>
<ArgTableRow arg="wins-server" typ="multi { address: ipAddr
 }">WINS servers sent to clients (option 44).</ArgTableRow>
<ArgTableRow arg="ntp-server" typ="alt { server: multi { address: ipAddr
 }
 }">NTP servers sent to clients (option 42). When not set, the server sends the NTP servers the router itself uses.</ArgTableRow>
<ArgTableRow arg="ntp-none" typ="bool">Whether to send no NTP servers at all, not even those of the router. Default: no.</ArgTableRow>
<ArgTableRow arg="caps-manager" typ="multi { address: ipAddr
 }">CAPsMAN addresses sent to clients (option 138).</ArgTableRow>
<ArgTableRow arg="domain" typ="string">Domain name sent to clients (option 15).</ArgTableRow>
<ArgTableRow arg="next-server" typ="ipAddr">Address of the server for the next step of network boot, sent in the `siaddr` field, for example a TFTP server. When not set, the address of the DHCP server is sent.</ArgTableRow>
<ArgTableRow arg="boot-file-name" typ="string">Name of the boot file for network boot, sent in the `file` field.</ArgTableRow>
<ArgTableRow arg="dhcp-option" typ="multi { array-id, option: enum
 }">Options (`/ip/dhcp-server/option`) sent to clients in this network. Options of the server and of the lease take precedence.</ArgTableRow>
<ArgTableRow arg="dhcp-option-set" typ="enum (none)">Option set (`/ip/dhcp-server/option/sets`) sent to clients in this network. Options of the server and of the lease take precedence.</ArgTableRow>
</ArgTable>
