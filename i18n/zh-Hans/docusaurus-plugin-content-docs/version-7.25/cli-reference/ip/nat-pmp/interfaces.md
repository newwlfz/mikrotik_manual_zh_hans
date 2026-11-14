---
sidebar_key: "cli-reference/ip/nat-pmp/interfaces"
sidebar_position: 1
title: "interfaces"
sidebar_label: 'interfaces'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/nat-pmp/interfaces
captured_at: '2026-11-01T21:24:16+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/nat-pmp/interfaces {#ipnat-pmpinterfaces}
**类型：** 目录

NAT-PMP 服务的接口分配：连接到 Internet 的接口（`external`）以及 NAT-PMP 客户端所连接的接口（`internal`）。该列表只接受一个外部接口（`only one external interface can be added to the list`）。请参阅 [NAT-PMP 指南页面](../../../firewall-and-quality-of-service/nat-pmp.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">disabled。该接口不由 NAT-PMP 使用。新建条目时处于 enabled 状态。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">接口名称。在 `internal` 接口上，服务监听客户端请求，并向组播组 224.0.0.1、UDP 端口 5350 发送外部地址通告。</ArgTableRow>
<ArgTableRow arg="type" typ="enum (external | internal)" mandatory="1">
NAT-PMP 接口角色：
- `external` - 面向 Internet 的接口。只允许一个外部接口。
- `internal` - NAT-PMP 客户端所连接的本地接口。
</ArgTableRow>
<ArgTableRow arg="forced-ip" typ="super { forced-ip: ipAddr
 }">向客户端报告此地址作为路由器的外部地址，而不是接口地址，例如当外部接口有多个地址时。</ArgTableRow>
</ArgTable>
