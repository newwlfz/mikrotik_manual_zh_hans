---
sidebar_key: "cli-reference/routing/id"
sidebar_position: 7
title: "id"
sidebar_label: 'id'
source: https://manual.mikrotik.com/docs/cli-reference/routing/id
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/id {#routingid}
**类型：** 目录

全局 Router ID 选举配置。可以显式配置 Router ID，或从路由器的某个 IP 地址中选举产生。

对于每个 VRF 表，RouterOS 会添加一个动态 ID 实例，该实例从该 VRF 中的某个 IP 地址选举 Router ID：

```text
[admin@rack1_b33_CCR1036] /routing/id> print
Flags: D - DYNAMIC, I - INACTIVE
Columns: NAME, DYNAMIC-ID, SELECT-DYNAMIC-ID, SELECT-FROM-VRF
#   NAME   DYNAMIC-ID      SELECT-D   SELE
0 D main   111.111.111.2   only-vrf   main

```

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">如果获取有效 ID 时出现问题，则该项可能变为非活动状态。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="id" typ="ipAddr" unset="1">要显式设置的 Router ID。如果未设置 Router ID，RouterOS 可以从已配置的某个 IP 地址中选举它。参见 `select-dynamic-id` 和 `select-from-vrf`。</ArgTableRow>
<ArgTableRow arg="select-dynamic-id" typ="ubit (any, only-static, only-loopback, only-vrf, only-active, lowest)" unset="1">
选择 RouterOS 用于 Router ID 选举的 IP 地址：
- `any` - 路由器上找到的任何地址都可以被选举为 Router ID。
- `lowest` - 选择最小的 IP 地址。
- `only-static` - 仅选择静态配置的地址。
- `only-active` - 仅从活动 IP 地址中选择 ID。
- `only-loopback` - 仅从环回地址中选择 ID（环回地址是任何非点对点 /32 地址）。
- `only-vrf` - 仅从选定的 VRF 中选择 ID。与 `select-from-vrf` 配合使用。
</ArgTableRow>
<ArgTableRow arg="select-from-vrf" typ="enum" unset="1">用于为 ID 选举选择 IP 地址的 VRF。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="dynamic-id" typ="ipAddr">当前选定的 ID。</ArgTableRow>
</ArgTable>
