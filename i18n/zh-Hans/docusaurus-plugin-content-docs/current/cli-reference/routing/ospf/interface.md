---
sidebar_key: "cli-reference/routing/ospf/interface"
sidebar_position: 4
title: "interface"
sidebar_label: 'interface'
source: https://manual.mikrotik.com/docs/cli-reference/routing/ospf/interface
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/ospf/interface {#routingospfinterface}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum" unset="1"></ArgTableRow>
<ArgTableRow arg="address" typ="address (flags=4i)" unset="1"></ArgTableRow>
<ArgTableRow arg="area" typ="enum"></ArgTableRow>
<ArgTableRow arg="instance-id" typ="num" unset="1"></ArgTableRow>
<ArgTableRow arg="type" typ="enum (broadcast | nbma | ptp | ptp-unnumbered | ptmp | ptmp-broadcast | virtual-link)">
该接口上的 OSPF 网络类型。请注意，如果接口配置不存在，则默认网络类型在 PtP 接口上为 'ptp'，在所有其他接口上为 'broadcast'。
- `broadcast` - 适用于以太网和其他支持多播的链路层的网络类型。选举指定路由器。
- `nbma` - 非广播多路访问。协议数据包发送到每个邻居的单播地址。需要手动配置邻居。选举指定路由器。
- `ptp` - 适用于仅由两个节点组成的网络。不选举指定路由器。
- `ptmp` - 点对多点。比 NBMA 更容易配置，因为它不需要手动配置邻居。不选举指定路由器。这是最稳健的网络类型，因此适用于无线网络，如果 'broadcast' 模式对它们来说效果不够理想。
- `ptp-unnumbered` - 与 ptp 的工作方式相同，不同之处在于远端邻居没有与特定 PTP 接口关联的 IP 地址。例如，在 Cisco 设备上使用 IP unnumbered 的情况。
- `virtual-link` - 用于虚拟链路的接口。
</ArgTableRow>
<ArgTableRow arg="auth" typ="enum (simple | md5 | sha1 | sha256 | sha384 | sha512)" unset="1"></ArgTableRow>
<ArgTableRow arg="auth-key" typ="string" unset="1"></ArgTableRow>
<ArgTableRow arg="auth-id" typ="num" unset="1"></ArgTableRow>
<ArgTableRow arg="cost" typ="num"></ArgTableRow>
<ArgTableRow arg="priority" typ="num"></ArgTableRow>
<ArgTableRow arg="passive" typ="switch"></ArgTableRow>
<ArgTableRow arg="use-bfd" typ="bool" unset="1"></ArgTableRow>
<ArgTableRow arg="retransmit-interval" typ="time"></ArgTableRow>
<ArgTableRow arg="transmit-delay" typ="time"></ArgTableRow>
<ArgTableRow arg="hello-interval" typ="time"></ArgTableRow>
<ArgTableRow arg="dead-interval" typ="time"></ArgTableRow>
<ArgTableRow arg="vlink-transit-area" typ="enum" unset="1">两台路由器共有的非骨干区域，虚拟链路将经由该区域建立。虚拟链路不能通过 stub 区域建立。</ArgTableRow>
<ArgTableRow arg="vlink-neighbor-id" typ="ipAddr" unset="1">指定应通过虚拟链路连接的邻居的 **router-id**。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="state" typ="enum (down | loopback | ptp | passive | waiting | standby | dr-other | bdr | dr)"></ArgTableRow>
<ArgTableRow arg="dr" typ="ipAddr"></ArgTableRow>
<ArgTableRow arg="bdr" typ="ipAddr"></ArgTableRow>
<ArgTableRow arg="vlink-remote-address" typ="address (flags=46)"></ArgTableRow>
</ArgTable>
