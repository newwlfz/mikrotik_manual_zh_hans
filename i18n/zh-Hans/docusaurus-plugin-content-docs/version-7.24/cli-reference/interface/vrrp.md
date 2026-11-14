---
sidebar_key: "cli-reference/interface/vrrp"
sidebar_position: 38
title: "vrrp"
sidebar_label: "vrrp"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/interface/vrrp
captured_at: '2026-11-01T21:27:41+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/vrrp {#interfacevrrp}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">无效</ArgTableRow>
<ArgTableRow arg="G" typ="grp-authority">grp-authority</ArgTableRow>
<ArgTableRow arg="g" typ="grp-member">grp-member</ArgTableRow>
<ArgTableRow arg="R" typ="running">running</ArgTableRow>
<ArgTableRow arg="M" typ="master">master</ArgTableRow>
<ArgTableRow arg="B" typ="backup">backup</ArgTableRow>
<ArgTableRow arg="F" typ="failure">failure</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="arp" typ="enum (disabled | enabled | proxy-arp | reply-only | local-proxy-arp) { disabled:0, enabled:1, proxy-arp:2, reply-only:3, local-proxy-arp:4 }"></ArgTableRow>
<ArgTableRow arg="arp-timeout" typ="alt { arp-timeout: enum (auto) { auto:0 }
, arp-timeout: time
 }"></ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1"></ArgTableRow>
<ArgTableRow arg="group-master" typ="iface_enum { :0, none:0, self }">deprecated</ArgTableRow>
<ArgTableRow arg="group-authority" typ="iface_enum { :0, none:0, self }">控制整个组的 VRRP interface-authority</ArgTableRow>
<ArgTableRow arg="vrid" typ="num"></ArgTableRow>
<ArgTableRow arg="priority" typ="num"></ArgTableRow>
<ArgTableRow arg="interval" typ="time"></ArgTableRow>
<ArgTableRow arg="preemption-mode" typ="bool"></ArgTableRow>
<ArgTableRow arg="authentication" typ="enum (none | simple | ah) { none:0, simple:1, ah:2 }"></ArgTableRow>
<ArgTableRow arg="password" typ="string"></ArgTableRow>
<ArgTableRow arg="on-backup" typ="alt { script: string
 }"></ArgTableRow>
<ArgTableRow arg="on-master" typ="alt { script: string
 }"></ArgTableRow>
<ArgTableRow arg="on-fail" typ="alt { script: string
 }"></ArgTableRow>
<ArgTableRow arg="version" typ="enum (2 | 3) { 2:2, 3:3 }"></ArgTableRow>
<ArgTableRow arg="v3-protocol" typ="enum (ipv4 | ipv6) { ipv4:1, ipv6:2 }"></ArgTableRow>
<ArgTableRow arg="v3-checksum-as-v2" typ="bool">控制 v3 ipv4 数据包是否包含伪首部校验和</ArgTableRow>
<ArgTableRow arg="sync-connection-tracking" typ="bool">master 与 backup 之间的连接跟踪数据交换</ArgTableRow>
<ArgTableRow arg="remote-address" typ="ipAddr">强制指定 Conntrack 数据的发送方或接收方地址</ArgTableRow>
<ArgTableRow arg="connection-tracking-mode" typ="enum (passive-active | active-active) { passive-active:0, active-active:1 }"></ArgTableRow>
<ArgTableRow arg="connection-tracking-port" typ="num">用于 Conntrack 数据同步的端口</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="mtu" typ="num"></ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr"></ArgTableRow>
</ArgTable>
