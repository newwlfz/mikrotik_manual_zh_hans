---
sidebar_key: "cli-reference/routing/ospf/neighbor"
sidebar_position: 6
title: "neighbor"
sidebar_label: 'neighbor'
source: https://manual.mikrotik.com/docs/cli-reference/routing/ospf/neighbor
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/ospf/neighbor {#routingospfneighbor}
**类型：** 目录

当前活动 OSPF 邻居的列表。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="V" typ="virtual">virtual</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="instance" typ="enum"></ArgTableRow>
<ArgTableRow arg="area" typ="enum"></ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum">发现该邻居的接口名称。</ArgTableRow>
<ArgTableRow arg="address" typ="address (flags=46i)">OSPF 邻居路由器的 IP 地址。</ArgTableRow>
<ArgTableRow arg="priority" typ="num"></ArgTableRow>
<ArgTableRow arg="router-id" typ="ipAddr">邻居路由器的 **RouterID**</ArgTableRow>
<ArgTableRow arg="dr" typ="ipAddr">指定路由器的 IP 地址。</ArgTableRow>
<ArgTableRow arg="bdr" typ="ipAddr">备用指定路由器的 IP 地址。</ArgTableRow>
<ArgTableRow arg="state" typ="string">
- `Down` - 尚未从邻居收到任何 Hello 数据包。
- `Attempt` - 仅适用于 NBMA 云。该状态表示未从邻居收到最近的信息。
- `Init` - 已从邻居收到 Hello 数据包，但尚未建立双向通信（其自身的 RouterID 未列在 Hello 数据包中）。
- `2-way` - 该状态表示已建立双向通信。DR 和 BDR 选举在此状态期间进行。路由器根据其是 DR 还是 BDR，以及链路是 point-to-point 还是虚拟链路来建立邻接关系。
- `ExStart` - 路由器尝试建立用于数据包信息交换的初始序列号。ID 较高的路由器成为主路由器并开始交换。
- `Exchange` - 路由器交换数据库描述（DD）数据包。
- `Loading` - 在此状态下，交换实际的链路状态信息。向邻居发送链路状态请求数据包，以请求在 Exchange 状态期间发现的任何新 LSA。
- `Full` - 邻接关系已完成，邻居路由器完全邻接。LSA 信息在相邻路由器之间同步。路由器仅与其 DR 和 BDR 达到 Full 状态。P2P 链路是一个例外。
</ArgTableRow>
<ArgTableRow arg="state-changes" typ="num"></ArgTableRow>
<ArgTableRow arg="ls-retransmits" typ="num"></ArgTableRow>
<ArgTableRow arg="ls-requests" typ="num"></ArgTableRow>
<ArgTableRow arg="db-summaries" typ="num"></ArgTableRow>
<ArgTableRow arg="adjacency" typ="time">自邻接关系形成以来经过的时间。</ArgTableRow>
<ArgTableRow arg="timeout" typ="time"></ArgTableRow>
</ArgTable>
