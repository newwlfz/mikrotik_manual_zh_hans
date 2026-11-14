---
sidebar_key: "cli-reference/ip/upnp/interfaces"
sidebar_position: 1
title: "interfaces"
sidebar_label: 'interfaces'
source: https://manual.mikrotik.com/docs/cli-reference/ip/upnp/interfaces
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/upnp/interfaces {#ipupnpinterfaces}
**类型：** 目录

UPnP 服务的接口分配：哪个接口连接到 Internet（`external`），以及本地 UPnP 客户端连接的是哪些接口（`internal`）。每个外部接口都会获得自己的 WANConnectionDevice 服务，因此可以同时启用多个外部接口。请参阅 [UPnP 指南页面](../../../firewall-and-quality-of-service/upnp.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">disabled。UPnP 不使用该接口。新条目创建时即为 enabled。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">接口名称。在 `internal` 接口上，控制服务监听其地址的 TCP 端口 2828，并从该接口发出 SSDP 通告。</ArgTableRow>
<ArgTableRow arg="type" typ="enum (external | internal) { external:1, internal:2 }" mandatory="1">
UPnP 接口角色：
- `external` - 面向互联网的接口。客户端端口映射的动态 dst-nat 规则会使用该接口作为 `in-interface`，并使用其地址作为 `dst-address` 来创建。
- `internal` - UPnP 客户端所连接的本地接口。
</ArgTableRow>
<ArgTableRow arg="forced-ip" typ="super { forced-ip: ipAddr
 }">将此地址用作该接口的外部 IP 地址：它会在 `GetExternalIPAddress` 响应中报告给客户端，并在动态 dst-nat 规则中用作 `dst-address`。当外部接口具有多个地址时设置。未设置时，使用该接口的主地址。</ArgTableRow>
</ArgTable>
