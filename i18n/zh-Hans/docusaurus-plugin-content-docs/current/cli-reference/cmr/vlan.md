---
sidebar_key: "cli-reference/cmr/vlan"
sidebar_position: 7
title: "vlan"
sidebar_label: 'vlan'
source: https://manual.mikrotik.com/docs/cli-reference/cmr/vlan
captured_at: '2026-11-09T11:35:47.715Z'
pagination_next: "cli-reference/cmr/wifi"
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/vlan {#cmrvlan}
**软件包：** cmr
**类型：** Directory

`/cmr/vlan` 菜单在选定的 CMR 客户端上创建网桥和 VLAN 配置。每条规则通过 `labels` 选择设备，通过 `port-labels` 选择端口（与设备的接口名称以及 `/cmr/device` 中分配的端口标签进行匹配），列出 `vlan-ids`，并为每个端口分配一个 `role`。在选定的设备上，该规则会创建一个名为 `cmr-bridge` 的专用网桥，启用 VLAN 过滤，并将选定的端口移入其中。删除规则会恢复之前的配置。请参阅 CMR 指南的 [VLAN 配置](../../management-tools/cmr.md#vlan-provisioning) 部分。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">VLAN 配置规则已禁用。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="labels" typ="object" unset="1">选择此规则所配置的 CMR 客户端。支持 + 和 - 符号分别作为 AND 和 AND NOT 运算符；如果未提供符号，则使用 OR 运算符。如果省略，则该规则适用于所有已连接的设备。</ArgTableRow>
<ArgTableRow arg="port-labels" typ="object" unset="1" mandatory="1">按接口名称（例如 `ether1`）或按在 `/cmr/device` 中分配给端口的端口标签（例如 `uplink`）选择要在所选设备上配置的端口。该参数为必填项，因此规则始终会指明其配置的端口。</ArgTableRow>
<ArgTableRow arg="vlan-ids" typ="multi { vlan-range: range [1 .. 4094]
 }" mandatory="1">分配给所选端口的 VLAN ID，采用逗号分隔列表或范围形式，例如 `100,200` 或 `100-200`。在 trunk 端口上，每个 VLAN ID 都会打上标签；在 access 端口上，仅使用第一个 VLAN ID 作为该端口的 PVID。</ArgTableRow>
<ArgTableRow arg="role" typ="enum (access | trunk)" unset="1">
分配给所选端口的端口角色：
- `access`（默认）- 该端口属于单个 VLAN，该 VLAN 被设置为该端口的 PVID，并承载未打标签的帧
- `trunk` - 该端口承载多个 VLAN；帧会带有 802.1Q 标头标签，以便对端能够区分它们
</ArgTableRow>
</ArgTable>
