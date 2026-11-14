---
sidebar_key: "cli-reference/ip/dhcp-relay"
title: "dhcp-relay"
sidebar_label: 'dhcp-relay'
source: https://manual.mikrotik.com/docs/cli-reference/ip/dhcp-relay
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dhcp-relay {#ipdhcp-relay}
**类型：** 目录

DHCP 中继会把其接口上客户端的 DHCP 请求转发到其他网络中的 DHCP 服务器，并将服务器回复传回客户端。新建中继默认处于禁用状态；添加后请启用。有关概述和示例，请参见 [DHCP 中继](../../../network-management/dhcp/relay.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">中继已禁用。新建中继默认处于禁用状态。</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">中继配置无效。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">中继的名称。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">中继在该接口上监听来自客户端的 DHCP 请求。</ArgTableRow>
<ArgTableRow arg="dhcp-server-vrf" typ="enum">用于访问 DHCP 服务器的 VRF。当它与 `interface` 的 VRF 不同时，服务器发送到 `local-address` 的回复必须被引入此 VRF，例如通过 dst-nat 规则。默认值：main。</ArgTableRow>
<ArgTableRow arg="dhcp-server" typ="multi { address: ipAddr
 }" mandatory="1">要将请求转发到的 DHCP 服务器。中继会将每个请求转发给所有这些服务器。</ArgTableRow>
<ArgTableRow arg="delay-threshold" typ="alt { const: enum (none) { none:0 }
, time: time
 }">请求要被转发时，seconds-elapsed 字段（`secs`）必须达到的最小值，因此中继只会转发已经尝试了该时长的客户端。使用 `none` 时，所有请求都会被转发。默认值：none。</ArgTableRow>
<ArgTableRow arg="local-address" typ="ipAddr">中继写入转发请求的网关地址字段（`giaddr`）中的地址。DHCP 服务器会将回复发送到此地址，并通过其 `relay` 属性选择服务器。使用 `0.0.0.0` 时，会使用 `interface` 的一个地址。默认值：0.0.0.0。</ArgTableRow>
<ArgTableRow arg="add-relay-info" typ="bool">是否向转发的请求添加中继代理信息（option 82）。circuit ID 为 `interface` 的 MAC 地址，remote ID 为客户端的 MAC 地址；如果设置了 `relay-info-remote-id`，则为该值。默认值：no。</ArgTableRow>
<ArgTableRow arg="relay-info-remote-id" typ="string">作为 option 82 中的 remote ID 发送的文本，用来代替客户端的 MAC 地址。仅在 `add-relay-info=yes` 时使用。</ArgTableRow>
<ArgTableRow arg="local-address-as-src-ip" typ="bool">是否从 `local-address` 而不是从通向服务器的接口地址发送转发的请求。默认值：no。</ArgTableRow>
</ArgTable>
