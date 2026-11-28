---
title: "interface-template"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/ospf/interface-template
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## routing/ospf/interface-template 
**类型：** 目录

接口模板定义通用网络和接口匹配条件，以及分配给匹配接口的参数。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">inactive</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="area" typ="enum" mandatory="1">The OSPF area to which the matching interface will be associated.</ArgTableRow>
<ArgTableRow arg="interfaces" typ="object { interface: iface_enum
 }" unset="1">Matcher. Interfaces to match. Accepts specific interface names or the name of the interface list.</ArgTableRow>
<ArgTableRow arg="instance-id" typ="num"></ArgTableRow>
<ArgTableRow arg="networks" typ="object { network: address (flags=46/)
 }" unset="1">Matcher. The network prefix associated with the area. OSPF will be enabled on all interfaces that have at least one address falling within this range. Note that the network prefix of the address is used for this check (i.e. not the local address). For point-to-point interfaces, this means the address of the remote endpoint.</ArgTableRow>
<ArgTableRow arg="prefix-list" typ="enum" unset="1">Name of the address list containing networks that should be advertised to the v3 interface.</ArgTableRow>
<ArgTableRow arg="type" typ="enum (broadcast | nbma | ptp | ptp-unnumbered | ptmp | ptmp-broadcast)">
The OSPF network type on this interface. Note that if interface configuration does not exist, the default network type is 'ptp' on PtP interfaces and 'broadcast' on all other interfaces.
- `broadcast` - Network type suitable for Ethernet and other multicast capable link layers. Elects designated router.
- `nbma` - Non-Broadcast Multiple Access. Protocol packets are sent to each neighbor's unicast address. Requires manual configuration of neighbors. Elects designated router.
- `ptp` - Suitable for networks that consist only of two nodes. Does not elect a designated router.
- `ptmp` - Point-to-Multipoint. Easier to configure than NBMA because it requires no manual configuration of a neighbor. Does not elect a designated router. This is the most robust network type and as such suitable for wireless networks, if 'broadcast' mode does not work well enough for them
- `ptp-unnumbered` - Works the same as ptp, except that the remote neighbor does not have an associated IP address to a specific PTP interface. For example, in case IP unnumbered is used on Cisco devices.
</ArgTableRow>
<ArgTableRow arg="retransmit-interval" typ="time">Time interval after which the lost link state advertisement will be resent. When a router sends a link state advertisement (LSA) to its neighbor, the LSA is kept until the acknowledgment is received. If the acknowledgment was not received in time (see transmit-delay), the router will try to retransmit the LSA.</ArgTableRow>
<ArgTableRow arg="transmit-delay" typ="time">Link-state transmit delay is the estimated time it takes to transmit a link-state update packet on the interface.</ArgTableRow>
<ArgTableRow arg="hello-interval" typ="time">The interval between **HELLO** packets that the router sends out on this interface. The smaller this interval is, the faster topological changes will be detected; the tradeoff is more OSPF protocol traffic. This value must be the same for all the routers on a specific network, otherwise, adjacency between them will not form.</ArgTableRow>
<ArgTableRow arg="dead-interval" typ="time">Specifies the interval after which a neighbor is declared dead. This interval is advertised in hello packets. This value must be the same for all routers on a specific network, otherwise, adjacency between them will not form.</ArgTableRow>
<ArgTableRow arg="priority" typ="num">
Router's priority. Used to determine the designated router in a broadcast network. The router with the highest priority value takes precedence. Priority value 0 means the router is not eligible to become a designated or backup designated router at all.

默认值为 128，如果为 DR/BDR 选举设置了严格优先级，请记住这一点。
</ArgTableRow>
<ArgTableRow arg="cost" typ="num">接口开销，以链路状态度量值表示。</ArgTableRow>
<ArgTableRow arg="passive" typ="switch">启用后，路由器不会在匹配的接口上发送或接收 OSPF 流量。</ArgTableRow>
<ArgTableRow arg="auth" typ="enum (simple | md5 | sha1 | sha256 | sha384 | sha512)" unset="1">
指定 OSPF 协议消息的认证方法。

- `simple` - 明文认证。
- `md5` - 带密钥的 Message Digest 5 认证。
- `sha*` - HMAC-SHA 认证 RFC5709。

如果未设置该参数，则不使用认证。
</ArgTableRow>
<ArgTableRow arg="auth-key" typ="string" unset="1">要使用的认证密钥，应与网段内所有邻居保持一致。</ArgTableRow>
<ArgTableRow arg="auth-id" typ="num" unset="1">密钥 id 用于计算消息摘要（启用 MD5 或 SHA 认证时使用）。该值应与同一区域内所有 OSPF 路由器保持一致。</ArgTableRow>
<ArgTableRow arg="use-bfd" typ="bool" unset="1"></ArgTableRow>
</ArgTable>
