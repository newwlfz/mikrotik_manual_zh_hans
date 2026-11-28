---
title: "mode-config"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/ipsec/mode-config
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/ipsec/mode-config 
**类型：** 目录

ISAKMP 和 IKEv2 配置属性在此菜单中配置。

:::note
并非所有 IKE 实现都支持由 `split-include` 选项提供的多个分离网络。
:::

:::note
如果 RouterOS 客户端是发起方，它始终发送 CISCO UNITY 扩展，而 RouterOS 仅支持该扩展中的 split-include。
:::

:::note
Cisco Unity Split DNS（属性类型 28675）和 RFC8598（属性类型 25）这两个属性均受支持，ROS 会响应这些属性，但仅作为响应方。
:::

:::note
不能同时使用 `system-dns` 和 `static-dns`；ROS 只能使用一个 DNS。
:::

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="*" typ="default">Whether the item is the default.</ArgTableRow>
<ArgTableRow arg="R" typ="responder">Whether the item acts as a responder.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1">Mode config entry name.</ArgTableRow>
<ArgTableRow arg="responder" typ="bool">Specifies whether the configuration will work as an initiator (client) or responder (server). The initiator will request mode-config parameters from the responder.</ArgTableRow>
<ArgTableRow arg="system-dns" typ="bool">When this option is enabled, DNS addresses will be taken from /ip/dns.</ArgTableRow>
<ArgTableRow arg="static-dns" typ="object { address: alt { address4: ipAddr
 }
 }">Manually specified DNS server IP addresses to be sent to the client.</ArgTableRow>
<ArgTableRow arg="address" typ="ipAddr">Address to assign to the peer.</ArgTableRow>
<ArgTableRow arg="address-pool" typ="enum (none) { none:-1 }">issue one address for peer from this pool</ArgTableRow>
<ArgTableRow arg="address-prefix-length" typ="num">issued address netmask</ArgTableRow>
<ArgTableRow arg="split-include" typ="object { subnet: alt { subnet4: ipPrefix
 }
 }">List of subnets in CIDR format, which will be tunneled. Subnets will be sent to the peer using the CISCO UNITY extension. A remote peer will create specific dynamic policies.</ArgTableRow>
<ArgTableRow arg="split-dns" typ="multi { array-id, dns: string
 }">List of DNS names that will be resolved using a system-dns=yes or static-dns= setting.</ArgTableRow>
<ArgTableRow arg="src-address-list" typ="enum ()">Specifying an address list will generate dynamic source NAT rules. This parameter is only available with responder=no. A roadWarrior client with NAT</ArgTableRow>
<ArgTableRow arg="connection-mark" typ="enum ()">conection-mark to be added to srcnat chain for initiator</ArgTableRow>
<ArgTableRow arg="use-responder-dns" typ="enum (no | yes | exclusively)">if the dns servers sent should be used by the initiator</ArgTableRow>
</ArgTable>
