---
sidebar_key: "cli-reference/ip/dhcp-server/alert/index"
sidebar_position: 1
title: "alert"
sidebar_label: 'alert'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dhcp-server/alert
captured_at: '2026-11-01T21:23:51+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dhcp-server/alert {#ipdhcp-serveralert}
**类型：** 目录

检测接口上的未知（非法）DHCP 服务器。该警报大约每分钟自行发送一次 DHCPDISCOVER，并将它看到的每个 DHCP 回复的来源与 `valid-server` 进行核对。未知服务器会使用 `dhcp,critical` 主题记录日志，列在 `unknown-server` 中，并触发 `on-alert`。由于该警报自身会发送 DHCP 请求，请勿在路由器运行 DHCP 客户端的接口上使用它。详情请参见 [DHCP 服务器](../../../../network-management/dhcp/server.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">该警报已禁用。新建的警报在创建时处于禁用状态。</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">警报配置无效。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">用于监视 DHCP 服务器的接口。</ArgTableRow>
<ArgTableRow arg="valid-server" typ="multi { mac-address: macAddr
 }">该接口上允许的 DHCP 服务器的 MAC 地址。来自其他服务器的回复会触发警报。</ArgTableRow>
<ArgTableRow arg="on-alert" typ="alt { script: string
 }">检测到未知 DHCP 服务器时要运行的脚本。</ArgTableRow>
<ArgTableRow arg="alert-timeout" typ="alt { symbolic-names: enum (none) { none:0 }
, time-interval: time
 }">检测到的服务器被遗忘之前经过的时间。如果之后该服务器仍然存在，则会触发新警报。使用 `none` 时，检测到的服务器永远不会被遗忘。默认值：1h。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="unknown-server" typ="multi { mac-address: macAddr
 }">检测到的未知 DHCP 服务器的 MAC 地址。</ArgTableRow>
</ArgTable>
