---
sidebar_key: "cli-reference/routing/pimsm/instance"
sidebar_position: 3
title: "instance"
sidebar_label: 'instance'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/pimsm/instance
captured_at: '2026-11-01T21:25:17+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/pimsm/instance {#routingpimsminstance}
**条件：** !smips
**类型：** 目录

instance 菜单定义主要的 PIM-SM 设置。随后，该实例用于所有其他与 PIM 相关的配置，例如 interface-template、静态 RP 和 Bootstrap Router。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="vrf" typ="enum">用于控制连接的 VRF 名称。</ArgTableRow>
<ArgTableRow arg="name" typ="string">实例的名称。</ArgTableRow>
<ArgTableRow arg="afi" typ="enum (ip | ipv6)">指定 PIM 的地址族。</ArgTableRow>
<ArgTableRow arg="switch-to-spt" typ="bool">达到组播数据带宽阈值时是否切换到最短路径树（SPT）。如果禁用此选项，路由器将不会从协议阶段一（注册封装）进入原生组播流量转发。建议启用此选项。</ArgTableRow>
<ArgTableRow arg="switch-to-spt-interval" typ="time">用于统计组播数据带宽的时间间隔，与 `switch-to-spt-bytes` 配合使用，以确定是否达到切换阈值。</ArgTableRow>
<ArgTableRow arg="switch-to-spt-bytes" typ="num">组播数据带宽阈值。如果在指定的时间间隔内达到此阈值，就会切换到最短路径树（SPT）。如果配置值为 0，则会立即切换。</ArgTableRow>
<ArgTableRow arg="crp-advertise-contained" typ="bool">当前未实现。</ArgTableRow>
<ArgTableRow arg="bsm-forward-back" typ="bool">当前未实现。</ArgTableRow>
<ArgTableRow arg="rp-hash-mask-length" typ="num">哈希掩码允许更改将多少个组映射到其中一个匹配的 RP。</ArgTableRow>
<ArgTableRow arg="rp-static-override" typ="bool">更改静态 RP 的选择优先级。禁用时，bootstrap RP 集具有更高的优先级。启用时，静态 RP 具有更高的优先级。</ArgTableRow>
<ArgTableRow arg="ssm-range" typ="address (flags=46/)">当前未实现。</ArgTableRow>
</ArgTable>
