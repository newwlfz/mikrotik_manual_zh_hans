---
sidebar_key: "cli-reference/routing/ospf/interface-template"
sidebar_position: 3
title: "interface-template"
sidebar_label: 'interface-template'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/ospf/interface-template
captured_at: '2026-11-01T21:25:14+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/ospf/interface-template {#routingospfinterface-template}
**类型：** 目录

接口模板定义通用的网络和接口匹配项，以及要为匹配的接口分配哪些参数。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="area" typ="enum" mandatory="1">匹配接口将关联到的 OSPF 区域。</ArgTableRow>
<ArgTableRow arg="interfaces" typ="object { interface: iface_enum
 }" unset="1">匹配器。要匹配的接口。接受特定接口名称或接口列表的名称。</ArgTableRow>
<ArgTableRow arg="instance-id" typ="num"></ArgTableRow>
<ArgTableRow arg="networks" typ="object { network: address (flags=46/)
 }" unset="1">匹配器。与该区域关联的网络前缀。OSPF 将在所有至少有一个地址落在该范围内的接口上启用。请注意，此检查使用地址的网络前缀（即不是本地地址）。对于点对点接口，这意味着远程端点的地址。</ArgTableRow>
<ArgTableRow arg="prefix-list" typ="enum" unset="1">包含应通告到 v3 接口的网络的地址列表名称。</ArgTableRow>
<ArgTableRow arg="type" typ="enum (broadcast | nbma | ptp | ptp-unnumbered | ptmp | ptmp-broadcast)">
此接口上的 OSPF 网络类型。请注意，如果接口配置不存在，则默认网络类型在 PtP 接口上为 'ptp'，在所有其他接口上为 'broadcast'。
- `broadcast` - 适用于以太网和其他支持多播的链路层的网络类型。选举指定路由器。
- `nbma` - 非广播多路访问。协议数据包会发送到每个邻居的单播地址。需要手动配置邻居。选举指定路由器。
- `ptp` - 适用于仅由两个节点组成的网络。不选举指定路由器。
- `ptmp` - 点对多点。比 NBMA 更易于配置，因为它不需要手动配置邻居。不选举指定路由器。这是最稳健的网络类型，因此如果 'broadcast' 模式对无线网络来说效果不够好，则适合无线网络
- `ptp-unnumbered` - 与 ptp 相同，不同之处在于远程邻居没有与特定 PTP 接口关联的 IP 地址。例如，在 Cisco 设备上使用 IP unnumbered 的情况。
</ArgTableRow>
<ArgTableRow arg="retransmit-interval" typ="time">在此时间间隔之后，丢失的链路状态通告将被重新发送。当路由器向其邻居发送链路状态通告（LSA）时，该 LSA 会一直保留到收到确认为止。如果未及时收到确认（参见 transmit-delay），路由器将尝试重新发送该 LSA。</ArgTableRow>
<ArgTableRow arg="transmit-delay" typ="time">链路状态传输延迟是在接口上传输链路状态更新数据包所需的估计时间。</ArgTableRow>
<ArgTableRow arg="hello-interval" typ="time">路由器在此接口上发出的 **HELLO** 数据包之间的间隔。此间隔越小，检测到拓扑变化的速度就越快；代价是更多的 OSPF 协议流量。对于特定网络上的所有路由器，此值必须相同，否则它们之间不会形成邻接关系。</ArgTableRow>
<ArgTableRow arg="dead-interval" typ="time">指定邻居被宣告为失效之后的时间间隔。此间隔会在 hello 数据包中通告。对于特定网络上的所有路由器，此值必须相同，否则它们之间不会形成邻接关系。</ArgTableRow>
<ArgTableRow arg="priority" typ="num">
路由器优先级。用于在广播网络中确定指定路由器。优先级值最高的路由器优先。优先级值为 0 表示该路由器完全没有资格成为指定路由器或备份指定路由器。

默认值为 128；如果你为 DR/BDR 选举设置了严格的优先级，请注意这一点。
</ArgTableRow>
<ArgTableRow arg="cost" typ="num">以链路状态度量表示的接口开销。</ArgTableRow>
<ArgTableRow arg="passive" typ="switch">如果启用，则路由器不会在匹配的接口上发送或接收 OSPF 流量。</ArgTableRow>
<ArgTableRow arg="auth" typ="enum (simple | md5 | sha1 | sha256 | sha384 | sha512)" unset="1">
指定 OSPF 协议消息的认证方法。

- `simple` - 明文认证。
- `md5` - 带密钥的消息摘要 5 认证。
- `sha*` - HMAC-SHA 认证 RFC5709。

如果未设置该参数，则不使用认证。
</ArgTableRow>
<ArgTableRow arg="auth-key" typ="string" unset="1">要使用的认证密钥，应在此网段的所有邻居上匹配。</ArgTableRow>
<ArgTableRow arg="auth-id" typ="num" unset="1">密钥 ID 用于计算消息摘要（在启用 MD5 或 SHA 认证时使用）。该值应与同一区域的所有 OSPF 路由器匹配。</ArgTableRow>
<ArgTableRow arg="use-bfd" typ="bool" unset="1"></ArgTableRow>
</ArgTable>
