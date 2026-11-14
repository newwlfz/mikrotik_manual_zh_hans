---
sidebar_key: "cli-reference/zerotier/controller/index"
sidebar_position: 1
title: "controller"
sidebar_label: 'controller'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/zerotier/controller
captured_at: '2026-11-01T21:26:14+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## zerotier/controller {#zerotiercontroller}
**包：** zerotier
**类型：** 目录

Zerotier 配置控制器。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">项目是否被禁用。</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">控制器是否处于非活动状态。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="disabled" typ="bool">项目是否被禁用。</ArgTableRow>
<ArgTableRow arg="instance" typ="enum" mandatory="1">ZeroTier 实例名称。</ArgTableRow>
<ArgTableRow arg="name" typ="string" mandatory="1">此控制器的短名称。</ArgTableRow>
<ArgTableRow arg="network" typ="string">16 位网络 ID。</ArgTableRow>
<ArgTableRow arg="private" typ="bool">启用访问控制。</ArgTableRow>
<ArgTableRow arg="broadcast" typ="bool">允许接收广播 (FF:FF:FF:FF:FF:FF) 数据包。</ArgTableRow>
<ArgTableRow arg="mtu" typ="num">网络 MTU。</ArgTableRow>
<ArgTableRow arg="multicast-limit" typ="num">多播数据包的最大接收者数量。</ArgTableRow>
<ArgTableRow arg="ip-range" typ="super { first: address (flags=4)
, [last] [ -address (flags=4)]
 }">IP 范围，例如 172.16.16.1-172.16.16.254。</ArgTableRow>
<ArgTableRow arg="ip6-range" typ="super { first: address (flags=6)
, [last] [ -address (flags=6)]
 }">IPv6 范围，例如 `fd00:feed:feed:beef::-fd00:feed:feed:beef:ffff:ffff:ffff:ffff`。</ArgTableRow>
<ArgTableRow arg="ip6-rfc4193" typ="bool">rfc4193 模式为每个成员在 /88 网络上提供一个 /128。</ArgTableRow>
<ArgTableRow arg="ip6-6plane" typ="bool">在 /40 网络内为每个成员提供一个 /80，并使用 NDP 模拟将该 /80 下的所有 IP 路由到其所有者。</ArgTableRow>
<ArgTableRow arg="routes" typ="object { route: super { dst: address (flags=46/)
, [gw] [ @address (flags=46)]
 }
 }">按以下格式推送路由：`Routes ::= Route[,Routes] Route ::= Dst[@Gw]`。</ArgTableRow>
</ArgTable>
