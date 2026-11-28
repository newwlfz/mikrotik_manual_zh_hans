---
title: "server"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/pppoe-server/server
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/interface/pptp-client"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## interface/pppoe-server/server 
**类型：** 目录

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">Whether an item is disabled.</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">Whether the server configuration is invalid.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="service-name" typ="string">The PPPoE service name. Server accepts clients that send a PADI message with service-names that match this setting, or if the service-name field in the PADI message is not set.</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum { <l2tp>:0xfffffffe }" mandatory="1">Interface that the clients are connected to.</ArgTableRow>
<ArgTableRow arg="max-mtu" typ="num">Maximum Transmission Unit. The optimal value is the MTU of the interface the tunnel is working over reduced by 20 (so, for 1500-byte Ethernet link, set the MTU to 1480 to avoid fragmentation of packets).</ArgTableRow>
<ArgTableRow arg="max-mru" typ="num">Maximum Receive Unit. The optimal value is the MTU of the interface the tunnel is working over reduced by 20 (so, for 1500-byte Ethernet link, set the MTU to 1480 to avoid fragmentation of packets).</ArgTableRow>
<ArgTableRow arg="mrru" typ="num">Maximum packet size that can be received on the link. If a packet is bigger than tunnel MTU, it is split into multiple packets, allowing full-size IP or Ethernet packets to be sent over the tunnel.</ArgTableRow>
<ArgTableRow arg="authentication" typ="ubit (pap, chap, mschap1, mschap2)">Authentication methods that the server accepts.</ArgTableRow>
<ArgTableRow arg="keepalive-timeout" typ="enum (disabled) { disabled:0 }">Defines the time period (in seconds) after which the router starts sending keepalive packets every second. If no traffic and no keepalive responses arrive for twice the `keepalive-timeout`, the non-responding client is disconnected. Set to `disabled` to turn off echo packets.</ArgTableRow>
<ArgTableRow arg="one-session-per-host" typ="bool">Allow only one session per host (determined by MAC address). If a host tries to establish a new session, the old one is closed.</ArgTableRow>
<ArgTableRow arg="max-sessions" typ="num">Maximum number of clients that the AC can serve. `0` means no limitation.</ArgTableRow>
<ArgTableRow arg="pado-delay" typ="num">Delay in milliseconds before sending PADO response.</ArgTableRow>
<ArgTableRow arg="default-profile" typ="enum">Specifies which PPP profile configuration is used when establishing the tunnel.</ArgTableRow>
<ArgTableRow arg="accept-empty-service" typ="bool">Accept PADI with empty service name if no matching PPPoE service is available.</ArgTableRow>
<ArgTableRow arg="pppoe-over-vlan-range" typ="multi { vlan-range: range [1 .. 4094]
 }">
This setting allows a PPPoE server to operate over 802.1Q VLANs. Supports a range of VLAN IDs and individual VLANs specified with comma-separated values, for example: `100-115,120,122,128-130`.  

指定 VLAN ID 后，PPPoE 服务器将接受来自客户端的 802.1Q 标记数据包，并使用相同的 VLAN 进行回复。然后，可以使用 `accept-untagged` 属性选择在同一接口上接受或丢弃未标记的 PPPoE 客户端。  
即使是在 VLAN 接口上，也可以使用 `pppoe-over-vlan-range` 设置配置 PPPoE 服务器，从而支持 QinQ 配置。但请注意，内层 VLAN 标记应为 802.1Q。
</ArgTableRow>
<ArgTableRow arg="accept-untagged" typ="bool">指定 `pppoe-over-vlan-range` 时，是否接受接口上的未标记（非 VLAN）PPPoE 数据包。</ArgTableRow>
</ArgTable>
