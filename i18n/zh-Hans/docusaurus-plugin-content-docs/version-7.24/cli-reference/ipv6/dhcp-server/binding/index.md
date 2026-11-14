---
sidebar_key: "cli-reference/ipv6/dhcp-server/binding/index"
sidebar_position: 1
title: "binding"
sidebar_label: "binding"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ipv6/dhcp-server/binding
captured_at: '2026-11-01T21:29:04+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/dhcp-server/binding {#ipv6dhcp-serverbinding}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="I" typ="invalid">无效</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="R" typ="radius">radius</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="alt { prefix: ip6Prefix
 }">为客户端分配单个地址或前缀</ArgTableRow>
<ArgTableRow arg="duid" typ="string" mandatory="1">十六进制字符串</ArgTableRow>
<ArgTableRow arg="iaid" typ="num" mandatory="1"></ArgTableRow>
<ArgTableRow arg="ia-type" typ="enum (na | pd)"></ArgTableRow>
<ArgTableRow arg="server" typ="enum (all)">可向客户端提供此绑定的服务器名称</ArgTableRow>
<ArgTableRow arg="life-time" typ="time"></ArgTableRow>
<ArgTableRow arg="prefix-pool" typ="enum">对于地址，使用前缀长度为 128 的地址池</ArgTableRow>
<ArgTableRow arg="dhcp-option" typ="multi { array-id, option: alt { option: enum
, option-set: enum
 }
 }"></ArgTableRow>
<ArgTableRow arg="rate-limit" typ="string">客户端的比特率限制</ArgTableRow>
<ArgTableRow arg="allow-dual-stack-queue" typ="bool"></ArgTableRow>
<ArgTableRow arg="address-lists" typ="multi { array-id, address-list: string
 }">将把绑定前缀/地址添加到的地址列表（覆盖服务器的 address-lists 参数）</ArgTableRow>
<ArgTableRow arg="insert-queue-before" typ="enum (first | bottom) { first:0, bottom:0xffffffff }"></ArgTableRow>
<ArgTableRow arg="parent-queue" typ="enum (none) { none:0 }"></ArgTableRow>
<ArgTableRow arg="queue-type" typ="enum"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="active-server" typ="enum (none)"></ArgTableRow>
<ArgTableRow arg="status" typ="enum (waiting | offered | bound)"></ArgTableRow>
<ArgTableRow arg="expires-after" typ="time"></ArgTableRow>
<ArgTableRow arg="last-seen" typ="alt { symbolic-names: enum (never | sometime) { never:0xffffffff, sometime:0xfffffffe }
, time: time
 }"></ArgTableRow>
<ArgTableRow arg="client-address" typ="ip6Addr"></ArgTableRow>
<ArgTableRow arg="reconfigure-key" typ="string"></ArgTableRow>
<ArgTableRow arg="reconfigure-last-sent" typ="string"></ArgTableRow>
<ArgTableRow arg="reconfigure-status" typ="string"></ArgTableRow>
</ArgTable>
