---
sidebar_key: "cli-reference/routing/bgp/template"
sidebar_position: 6
title: "template"
sidebar_label: 'template'
source: https://manual.mikrotik.com/docs/cli-reference/routing/bgp/template
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/bgp/template {#routingbgptemplate}
**条件：** !smips
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default">default</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="routing-table" typ="enum" unset="1">用于安装路由的路由表名称。覆盖实例参数。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum" unset="1">BGP 连接所使用的 VRF 名称。默认使用 "main" 路由表。</ArgTableRow>
<ArgTableRow arg="templates" typ="multi { template: enum
 }" unset="1">用于继承参数值的模板名称列表。实用功能，可轻松配置具有重叠配置选项的组。</ArgTableRow>
<ArgTableRow arg="as" typ="as" unset="1">32 位 BGP 自治系统号。该值接受 AS-Plain 或 AS-Dot 格式。覆盖实例 ASN，并使用以下格式配置 BGP 联盟：_`confederation_as/as`_。例如，如果你的 AS 是 34，联盟 AS 是 43，则设置 `as=43/34`。</ArgTableRow>
<ArgTableRow arg="nexthop-choice" typ="enum (default | force-self | propagate)" unset="1">影响发出的 **NEXT\_HOP** 属性选择。在过滤器中设置的下一跳始终优先，并且在路由反射时不会被更改，除非是在过滤器中设置的。   default - 按 [`RFC 4271`](https://tools.ietf.org/html/rfc4271) 所述选择下一跳   force-self - 使用连接到对等体的接口的本地地址作为下一跳   propagate - 传播收到的下一跳；如果路由具有 BGP **NEXT\_HOP** 属性，则将其用作下一跳；否则回退到默认情况</ArgTableRow>
<ArgTableRow arg="multihop" typ="bool" unset="1">当远端对等体距离超过一跳时启用。此选项会影响发出的下一跳选择，如 [`RFC 4271`](https://tools.ietf.org/html/rfc4271) 所述（仅适用于 eBGP，不包括联盟本地的 iBGP 对等体）。它还会影响：是否接受来自不在同一网络中的对等体的连接（此检查使用连接的远端地址）；是否接受 NEXT\_HOP 属性与用于建立连接的地址不在同一网络中的传入路由；从此对等体安装的路由的目标作用域；来自多跳或 iBGP 对等体的路由默认通过 IGP 路由解析其下一跳</ArgTableRow>
<ArgTableRow arg="hold-time" typ="alt { special: enum (infinity) { infinity:0 }
, number: time [3 .. 65535]
 }" unset="1">指定与对等体协商时要使用的 BGP Hold Time 值。根据 BGP 规范，如果路由器在 **OPEN** 消息的 Hold Time 字段指定的时间段内未收到连续的 **KEEPALIVE** 和/或 **UPDATE** 和/或 **NOTIFICATION** 消息，则与对等体的 BGP 连接将被关闭。将使用两个对等体中最小的 `hold-time` 值（请注意，特殊值 0 或 'infinity' 低于任何其他值）*   infinity - 永不过期连接，也从不发送 keepalive 消息。</ArgTableRow>
<ArgTableRow arg="keepalive-time" typ="time" unset="1">keepalive 消息之间的间隔；如果未设置，则默认 keepalive 为 `hold-time` 的 1/3。</ArgTableRow>
<ArgTableRow arg="afi" typ="ubit (ip, ipv6, l2vpn, l2vpn-cisco, vpnv4, vpnv6, evpn)" unset="1">此对等体可交换路由信息的地址族列表。远端对等体必须支持 BGP capabilities 可选参数（通常都支持），才能协商除 IP 以外的任何地址族。</ArgTableRow>
<ArgTableRow arg="cisco-vpls-nlri-len-fmt" typ="enum (auto-bits | auto-bytes | bits | bytes)" unset="1">VPLS NLRI 长度格式类型。用于与 Cisco VPLS 兼容。\[\[阅读更多>>\]\]。</ArgTableRow>
<ArgTableRow arg="output.remove-private-as" typ="bool" unset="1">如果设置，则当 BGP **AS-PATH** 属性仅包含私有 AS 号时，在发送路由更新前移除该属性。移除过程发生在应用路由过滤器之前，以及在本地 AS 号前置到 AS 路径之前。</ArgTableRow>
<ArgTableRow arg="output.as-override" typ="bool" unset="1">如果设置，则在向该对等体发送路由更新之前，将 BGP **AS-PATH** 属性中远端对等体 AS 号的所有实例替换为本地 AS 号。发生在路由过滤器和 prepend 之前。</ArgTableRow>
<ArgTableRow arg="use-bfd" typ="bool" unset="1">是否使用 BFD 协议以更快检测连接状态。</ArgTableRow>
<ArgTableRow arg="save-to" typ="string" unset="1">用于将 BGP 协议特定数据包内容（Exported PDU）保存为 pcap 格式的文件名。此方法可为调试目的更简单地捕获特定对等体的数据包。</ArgTableRow>
<ArgTableRow arg="output.add-path" typ="ubit (ip, ipv6)" unset="1">为指定地址族启用发送附加路径（BGP Addpath）。</ArgTableRow>
<ArgTableRow arg="output.affinity" typ="enum (main | alone | remote-as | instance | afi | vrf | input)" unset="1">配置输出多核处理。请阅读 [路由协议多核支持](../../../user-guides/routing-and-networking-protocols/routing-protocol-multi-core-support.md) 文章以了解更多信息。   **alone** - 每个会话的输入和输出在各自独立的进程中处理，当核心和对等体很多时，这很可能是最佳选项   **afi, instance, vrf, remote-as** - 尝试在具有相似参数的进程中运行新会话的输入/输出   **main** - 在主进程中运行输入/输出（在单核上可能提升性能，甚至在核心数较少的多核设备上也可能如此）   **input** - 在与输入相同的进程中运行输出（只能为输出亲和性设置）</ArgTableRow>
<ArgTableRow arg="output.redistribute" typ="ubit (connected, static, rip, ospf, isis, bgp, vpn, dhcp, fantasy, modem, bgp-mpls-vpn, slaac)" unset="1">启用指定路由类型的重分发。</ArgTableRow>
<ArgTableRow arg="output.filter-select" typ="enum" unset="1">用于前缀选择的路由选择链名称。如果未指定，则使用默认选择。</ArgTableRow>
<ArgTableRow arg="output.filter-chain" typ="enum" unset="1">用于输出前缀的路由过滤链名称。如果未指定链，则 BGP 默认接受所有内容。</ArgTableRow>
<ArgTableRow arg="output.network" typ="enum" unset="1">用于发送本地网络的地址列表名称。仅当路由表中存在匹配的 IGP 路由且其 **ORIGIN** 属性设置为 IGP 时，才会发送该网络；其他分发方法的 **ORIGIN** 属性设置为 INCOMPLETE。</ArgTableRow>
<ArgTableRow arg="output.network-blackhole" typ="bool" unset="1"></ArgTableRow>
<ArgTableRow arg="output.default-originate" typ="enum (never | if-installed | always)" unset="1">指定默认路由（0.0.0.0/0）的分发方法。'if-installed' 选项可用于仅在路由表中存在相应 IGP 路由时分发默认路由。</ArgTableRow>
<ArgTableRow arg="output.default-prepend" typ="num" unset="1">将本地 ASN 前置多少次。</ArgTableRow>
<ArgTableRow arg="output.no-client-to-client-reflection" typ="bool" unset="1">在 Route Reflector 设置中禁用客户端到客户端路由反射。</ArgTableRow>
<ArgTableRow arg="output.no-early-cut" typ="bool" unset="1">early cut 是一种机制，用于（基于默认 RFC 行为）推测发送的 NLRI 在远端对等体接收时会发生什么。如果算法确定该 NLRI 将被丢弃，则对等体甚至不会尝试发送它。然而，在特定场景中可能不希望出现这种行为，此时应使用此选项禁用 early cut 功能。Early cut 适用于 eBGP 会话。</ArgTableRow>
<ArgTableRow arg="output.keep-sent-attributes" typ="bool" unset="1">在内存中存储已发送前缀的属性，`dump-saved-advertisements` 命令需要此功能才能工作。默认情况下，为节省路由器内存，不会存储已发送的前缀。仅应在调试目的下、需要查看当前通告的前缀时启用此选项。</ArgTableRow>
<ArgTableRow arg="input.add-path" typ="ubit (ip, ipv6)" unset="1">为指定地址族接受收到的附加路径（BGP Addpath）。</ArgTableRow>
<ArgTableRow arg="input.attr-error-handling" typ="enum (default | revised)"></ArgTableRow>
<ArgTableRow arg="input.affinity" typ="enum (main | alone | remote-as | instance | afi | vrf)" unset="1">
配置输入多核处理。请阅读 [路由协议多核支持](../../../user-guides/routing-and-networking-protocols/routing-protocol-multi-core-support.md) 文章以了解更多信息。
- **alone** - 每个会话的输入和输出在各自独立的进程中处理，当核心和对等体很多时，这很可能是最佳选项。
- **afi, instance, vrf, remote-as** - 尝试在具有相似参数的进程中运行新会话的输入/输出。
- **main** - 在主进程中运行输入/输出（在单核上可能提升性能，甚至在核心数较少的多核设备上也可能如此）。
</ArgTableRow>
<ArgTableRow arg="input.filter" typ="enum" unset="1">用于输入前缀的路由过滤链名称。这发生在 NLRI 处理后。如果未指定链，则 BGP 默认接受所有内容。</ArgTableRow>
<ArgTableRow arg="input.filter-nlri" typ="enum" unset="1">过滤链名称，该过滤链会在传入的 IPv4/IPv6 NLRI 被存储到内存之前直接对其进行过滤，从而显著减少内存占用。常规输入过滤链只能拒绝前缀，这意味着它仍会占用内存，并会在 /routing 路由表中显示为 "not active, filtered"。应用更改需要重启会话。</ArgTableRow>
<ArgTableRow arg="input.allow-as" typ="num" unset="1">指示在丢弃前缀之前，允许你自己的 AS 号在 AS-PATH 中出现多少次。</ArgTableRow>
<ArgTableRow arg="input.accept-nlri" typ="enum" unset="1">ipv4/6 地址列表名称。一种使用特定 NLRI 过滤传入更新的快捷方式。它允许在传入消息被解析和存储到内存之前直接对其进行过滤，从而显著减少内存占用。常规输入过滤链只能拒绝前缀，这意味着它仍会占用内存，并会在 /routing 路由表中显示为 "not active, filtered"。应用更改需要重启会话。</ArgTableRow>
<ArgTableRow arg="input.filter-communities" typ="enum" unset="1">一种使用特定 communities 过滤传入更新的快捷方式。它允许在传入消息被解析和存储到内存之前直接对其进行过滤，从而显著减少内存占用。常规输入过滤链只能拒绝前缀，这意味着它仍会占用内存，并会在 /routing 路由表中显示为 "not active, filtered"。应用更改需要刷新会话。</ArgTableRow>
<ArgTableRow arg="input.filter-ext-communities" typ="enum" unset="1">一种使用特定 extended communities 过滤传入更新的快捷方式。它允许在传入消息被解析和存储到内存之前直接对其进行过滤，从而显著减少内存占用。常规输入过滤链只能拒绝前缀，这意味着它仍会占用内存，并会在 /routing 路由表中显示为 "not active, filtered"。应用更改需要刷新会话。</ArgTableRow>
<ArgTableRow arg="input.filter-large-communities" typ="enum" unset="1">一种使用特定 large communities 过滤传入更新的快捷方式。它允许在传入消息被解析和存储到内存之前直接对其进行过滤，从而显著减少内存占用。常规输入过滤链只能拒绝前缀，这意味着它仍会占用内存，并会在 /routing 路由表中显示为 "not active, filtered"。应用更改需要刷新会话。</ArgTableRow>
<ArgTableRow arg="input.accept-communities" typ="enum" unset="1">一种使用特定 communities 过滤传入更新的快捷方式。它允许在传入消息被解析和存储到内存之前直接对其进行过滤，从而显著减少内存占用。常规输入过滤链只能拒绝前缀，这意味着它仍会占用内存，并会在 /routing 路由表中显示为 "not active, filtered"。应用更改需要刷新会话。</ArgTableRow>
<ArgTableRow arg="input.accept-ext-communities" typ="enum" unset="1">一种使用特定 extended communities 过滤传入更新的快捷方式。它允许在传入消息被解析和存储到内存之前直接对其进行过滤，从而显著减少内存占用。常规输入过滤链只能拒绝前缀，这意味着它仍会占用内存，并会在 /routing 路由表中显示为 "not active, filtered"。应用更改需要刷新会话。</ArgTableRow>
<ArgTableRow arg="input.accept-large-communities" typ="enum" unset="1">一种使用特定 large communities 过滤传入更新的快捷方式。它允许在传入消息被解析和存储到内存之前直接对其进行过滤，从而显著减少内存占用。常规输入过滤链只能拒绝前缀，这意味着它仍会占用内存，并会在 /routing 路由表中显示为 "not active, filtered"。应用更改需要刷新会话。</ArgTableRow>
<ArgTableRow arg="input.filter-unknown" typ="enum" unset="1">一种使用特定 "unknown" 属性过滤传入更新的快捷方式。它允许在传入消息被解析和存储到内存之前直接对其进行过滤，从而显著减少内存占用。常规输入过滤链只能拒绝前缀，这意味着它仍会占用内存，并会在 /routing 路由表中显示为 "not active, filtered"。应用更改需要刷新会话。</ArgTableRow>
<ArgTableRow arg="input.limit-process-routes-ipv4" typ="enum (10 | 100 | 1000 | 10000 | 100000 | 1000000 | 10000000) { 10:10, 100:100, 1000:1000, 10000:10000, 100000:100000, 1000000:1000000, 10000000:10000000 }" unset="1">尝试将接收的 IPv4 路由数量限制为指定数目。此数目并不代表该对等体将要安装到路由表中的确切路由数量。如果达到限制，必须使用 [BGP 会话 "clear"](./session/clear.md) 命令重置该标志。</ArgTableRow>
<ArgTableRow arg="input.limit-process-routes-ipv6" typ="enum (10 | 100 | 1000 | 10000 | 100000 | 1000000 | 10000000) { 10:10, 100:100, 1000:1000, 10000:10000, 100000:100000, 1000000:1000000, 10000000:10000000 }" unset="1">尝试将接收的 IPv6 路由数量限制为指定数目。此数目并不代表该对等体将要安装到路由表中的确切路由数量。如果达到限制，必须使用 BGP 会话 "clear" 命令重置该标志。</ArgTableRow>
</ArgTable>
