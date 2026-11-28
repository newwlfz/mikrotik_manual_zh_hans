---
title: "alert"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dhcp-server/alert
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/dhcp-server/alert 
**类型：** 目录

检测接口上的未知（ rogue ）DHCP 服务器。该告警大约每分钟发送一次自身的 DHCPDISCOVER，并根据 `valid-server` 检查其看到的每个 DHCP 回复的源。未知服务器会以 `dhcp,critical` 主题记录到日志，列入 `unknown-server`，并触发 `on-alert`。由于该告警会自行发送 DHCP 请求，请勿在路由器运行 DHCP 客户端的接口上使用它。详情请参阅 [DHCP Server](/docs/network-management/dhcp/server)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">The alert is disabled. New alerts are created disabled.</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">The alert configuration is invalid.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">Interface to watch for DHCP servers.</ArgTableRow>
<ArgTableRow arg="valid-server" typ="multi { mac-address: macAddr
 }">MAC addresses of the DHCP servers that are allowed on the interface. Replies from other servers raise an alert.</ArgTableRow>
<ArgTableRow arg="on-alert" typ="alt { script: string
 }">Script to run when an unknown DHCP server is detected.</ArgTableRow>
<ArgTableRow arg="alert-timeout" typ="alt { symbolic-names: enum (none) { none:0 }
, time-interval: time
 }">Time after which a detected server is forgotten. If the server is still present afterwards, a new alert is raised. With `none`, detected servers are never forgotten. Default: 1h.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="unknown-server" typ="multi { mac-address: macAddr
 }">MAC addresses of the unknown DHCP servers that were detected.</ArgTableRow>
</ArgTable>
