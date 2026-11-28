---
title: "arp"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/arp
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/ip/cloud"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/arp 
**类型：** 目录

尽管 IP 数据包使用 IP 地址寻址，但必须使用硬件地址将数据从一台主机传输到另一台主机。地址解析协议用于将 OSI 第 3 层 IP 地址映射到 OSI 第 2 层 MAC 地址。路由器有一张当前使用的 ARP 条目表。通常，该表是动态构建的；但为提高网络安全性，可以通过添加静态条目来部分或完全静态构建该表。要了解 ARP 的工作原理，请阅读[网络基础](/docs/getting-started/networking-fundamentals#arp-and-tying-it-all-together)。

:::info
ARP 条目的默认最大数量取决于已安装的 RAM 容量。可以使用命令 "`/ip/settings/set max-neighbor-entries=`x" 进行调整，详情请参阅 [IPv4 设置](/docs/cli-reference/ip/settings)。
:::

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">Whether the ARP entry is disabled.</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">Whether the entry is not valid.</ArgTableRow>
<ArgTableRow arg="H" typ="dhcp">Whether the ARP entry is added by DHCP server.</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">Whether the entry is dynamically created.</ArgTableRow>
<ArgTableRow arg="P" typ="published">published</ArgTableRow>
<ArgTableRow arg="C" typ="complete">Complete flag is included in ARP entries when the ARP `status` is permanent, reachable, stale, probe, or delay.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="address" typ="ipAddr">IP address to be mapped.</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">MAC address to be mapped to.</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">Interface name the IP address is assigned to.</ArgTableRow>
<ArgTableRow arg="published" typ="bool">Static proxy-arp entry for individual IP addresses. When an ARP query is received for the specific IP address, the device will respond with its own MAC address. No need to set proxy-arp on the interface itself for all the MAC addresses to be proxied. The interface will respond to an ARP request only when the device has an active route towards the destination.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="status" typ="string">
Shows the ARP entry state.
- `delay` - neighbor entry validation is currently delayed.
- `failed` - ARP resolution has failed.
- `incomplete` - system does not have the MAC address information for the IP address.
- `permanent` - ARP entry is considered permanent and will not be removed.
- `probe` - neighbor is being probed.
- `reachable` - ARP resolution is successful, the MAC address is known.
- `stale` - entry is still valid but aged.
</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">Indicates which VRF this ARP entry is associated with.</ArgTableRow>
</ArgTable>
