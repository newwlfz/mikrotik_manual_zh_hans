---
sidebar_key: "cli-reference/system/logging/index"
sidebar_position: 2
title: "logging"
sidebar_label: 'logging'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/logging
captured_at: '2026-11-01T21:25:32+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/logging {#systemlogging}
**类型：** 目录

决定保留哪些日志消息以及将它们发送到何处的规则。每条规则按主题选择消息，也可选地按正则表达式选择消息，并将它们传递给 [`/system/logging/action`](./action/index.md) 中的动作。默认规则将 `info`、`error` 和 `warning` 消息传递给 `memory` 动作，将 `critical` 消息传递给 `echo`；其他消息（例如 `debug`）在规则要求之前不会被记录。请参阅[日志](../../../diagnostics-monitoring-and-troubleshooting/log/index.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">规则已禁用。</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">规则无效。</ArgTableRow>
<ArgTableRow arg="*" typ="default">四条默认规则之一：`info`、`error` 和 `warning` 发送到 `memory`，`critical` 发送到 `echo`。</ArgTableRow>
<ArgTableRow arg="Y" typ="managed"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="topics" typ="multi { array-id, array-id, topic: super { !
, topic: enum
 }
 }">
消息为匹配而必须携带的主题。仅当消息包含列出的每个主题时才会匹配：`topics=dhcp,debug` 匹配 DHCP 调试消息，而不是所有 DHCP 消息和所有调试消息。要记录多个主题，请为每个主题添加一条规则。没有主题的规则会匹配所有消息，包括调试消息。

主题前的 `!` 会排除携带该主题的消息，例如 `topics=ntp,debug,!packet` 会记录 NTP 调试消息但不包含数据包转储。这些主题在[日志](../../../diagnostics-monitoring-and-troubleshooting/log/index.md#topics)页面中描述。路由器接受：`account`, `acme-client`, `amt`, `async`, `backup`, `bfd`, `bgp`, `bridge`, `calc`, `caps`, `certificate`, `clock`, `container`, `critical`, `ddns`, `debug`, `dhcp`, `discover`, `disk`, `dns`, `dot1x`, `dude`, `e-mail`, `error`, `event`, `evpn`, `fetch`, `firewall`, `gps`, `gsm`, `health`, `hotspot`, `igmp-proxy`, `info`, `interface`, `ipsec`, `iscsi`, `isdn`, `isis`, `kvm`, `l2tp`, `ldp`, `lora`, `lte`, `manager`, `mme`, `mpls`, `mqtt`, `mvrp`, `natpmp`, `netinstall`, `netwatch`, `ntp`, `ospf`, `ovpn`, `packet`, `pim`, `poe-in`, `poe-out`, `pon`, `ppp`, `pppoe`, `pptp`, `ptp`, `queue`, `radius`, `radvd`, `raw`, `read`, `rip`, `route`, `rpki`, `rproxy`, `rsvp`, `script`, `sertcp`, `simulator`, `smb`, `snmp`, `socksify`, `ssh`, `ssld`, `sstp`, `state`, `store`, `stp`, `system`, `telephony`, `tftp`, `timer`, `tr069`, `update`, `upnp`, `ups`, `vpls`, `vrrp`, `warning`, `watchdog`, `web-proxy`, `wiliot`, `wireguard`, `wireless`, `write`, `zerotier`。
</ArgTableRow>
<ArgTableRow arg="prefix" typ="string">添加在规则传递的每条消息前面的文本，格式为 `<prefix>: <message>`。前缀是存储消息和已发送消息的一部分。</ArgTableRow>
<ArgTableRow arg="regex" typ="string">与消息文本以及其后的消息额外字段进行匹配的正则表达式。当它不匹配时，即使主题匹配，规则也不会传递该消息。</ArgTableRow>
<ArgTableRow arg="action" typ="enum">从 [`/system/logging/action`](./action/index.md) 接收匹配消息的动作。每条匹配的规则都会将消息传递到自己的动作；当两条规则将同一条消息传递到同一个动作时，该动作只会接收一次。默认值：memory。</ArgTableRow>
</ArgTable>
