---
title: "logging"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/logging
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/logging 
**类型：** 目录

用于决定保留哪些日志消息以及将其发送到何处的规则。每条规则按主题选择消息，并可选用正则表达式进行匹配，然后将消息传递给 [`/system/logging/action`](/docs/cli-reference/system/logging/action) 中的 action。默认规则将 `info`、`error` 和 `warning` 消息传递给 `memory` action，将 `critical` 消息传递给 `echo`；其他消息（例如 `debug`）在规则明确要求之前不会记录。请参阅 [Log](/docs/diagnostics-monitoring-and-troubleshooting/log)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">The rule is disabled.</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">The rule is invalid.</ArgTableRow>
<ArgTableRow arg="*" typ="default">One of the four default rules: `info`, `error` and `warning` to `memory`, `critical` to `echo`.</ArgTableRow>
<ArgTableRow arg="Y" typ="managed"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="topics" typ="multi { array-id, array-id, topic: super { !
, topic: enum
 }
 }">
Topics a message must carry to match. A message matches only when it has every topic listed: `topics=dhcp,debug` matches DHCP debug messages, not all DHCP messages and all debug messages. To log several topics, add one rule per topic. A rule without topics matches every message, debug messages included.

主题前的 `!` 会排除带有该主题的消息，例如 `topics=ntp,debug,!packet` 会记录 NTP 调试消息，但不包含数据包转储。主题在 [Log](/docs/diagnostics-monitoring-and-troubleshooting/log#topics) 页面中有说明。路由器接受：`account`、`acme-client`、`amt`、`async`、`backup`、`bfd`、`bgp`、`bridge`、`calc`、`caps`、`certificate`、`clock`、`container`、`critical`、`ddns`、`debug`、`dhcp`、`discover`、`disk`、`dns`、`dot1x`、`dude`、`e-mail`、`error`、`event`、`evpn`、`fetch`、`firewall`、`gps`、`gsm`、`health`、`hotspot`、`igmp-proxy`、`info`、`interface`、`ipsec`、`iscsi`、`isdn`、`isis`、`kvm`、`l2tp`、`ldp`、`lora`、`lte`、`manager`、`mme`、`mpls`、`mqtt`、`mvrp`、`natpmp`、`netinstall`、`netwatch`、`ntp`、`ospf`、`ovpn`、`packet`、`pim`、`poe-in`、`poe-out`、`pon`、`ppp`、`pppoe`、`pptp`、`ptp`、`queue`、`radius`、`radvd`、`raw`、`read`、`rip`、`route`、`rpki`、`rproxy`、`rsvp`、`script`、`sertcp`、`simulator`、`smb`、`snmp`、`socksify`、`ssh`、`ssld`、`sstp`、`state`、`store`、`stp`、`system`、`telephony`、`tftp`、`timer`、`tr069`、`update`、`upnp`、`ups`、`vpls`、`vrrp`、`warning`、`watchdog`、`web-proxy`、`wiliot`、`wireguard`、`wireless`、`write`、`zerotier`。
</ArgTableRow>
<ArgTableRow arg="prefix" typ="string">添加到规则传递的每条消息前面的文本，格式为 `<prefix>: <message>`。前缀属于存储的消息，也属于发送的消息。</ArgTableRow>
<ArgTableRow arg="regex" typ="string">与消息文本及其额外字段匹配的正则表达式。如果不匹配，即使主题匹配，规则也不会传递该消息。</ArgTableRow>
<ArgTableRow arg="action" typ="enum">来自 [`/system/logging/action`](/docs/cli-reference/system/logging/action) 的 action，用于接收匹配的消息。每条匹配的规则都会将消息传递给自己的 action；当两条规则将同一消息传递给同一个 action 时，该 action 只接收一次。默认值：memory。</ArgTableRow>
</ArgTable>
