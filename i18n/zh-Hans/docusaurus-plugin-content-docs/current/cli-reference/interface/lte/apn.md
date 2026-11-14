---
sidebar_key: "cli-reference/interface/lte/apn"
sidebar_position: 1
title: "apn"
sidebar_label: 'apn'
source: https://manual.mikrotik.com/docs/cli-reference/interface/lte/apn
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/lte/apn {#interfacelteapn}
**条件：** !smips
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default">default</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="apn" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="use-peer-dns" typ="bool"></ArgTableRow>
<ArgTableRow arg="use-network-apn" typ="bool">在 LTE 模式下使用网络提供的 APN</ArgTableRow>
<ArgTableRow arg="add-default-route" typ="bool"></ArgTableRow>
<ArgTableRow arg="default-route-distance" typ="num"></ArgTableRow>
<ArgTableRow arg="ip-type" typ="enum (ipv4 | ipv6 | auto)">请求的 PDN 类型</ArgTableRow>
<ArgTableRow arg="authentication" typ="enum (none | pap | chap)"></ArgTableRow>
<ArgTableRow arg="user" typ="string"></ArgTableRow>
<ArgTableRow arg="password" typ="string"></ArgTableRow>
<ArgTableRow arg="passthrough-interface" typ="iface_enum { none:0 }"></ArgTableRow>
<ArgTableRow arg="passthrough-mac" typ="alt { auto: enum (static | auto)
, passthrough-peer: macAddr
 }">auto 将从第一个数据包中学习 MAC</ArgTableRow>
<ArgTableRow arg="passthrough-subnet-size" typ="alt { subnet-enum: enum (auto | 32) { auto:0, 32:32 }
, subnet-size: num [16 .. 32]
 }"></ArgTableRow>
<ArgTableRow arg="ipv6-interface" typ="iface_enum { none:0 }">用于通告 IPv6 前缀的接口</ArgTableRow>
</ArgTable>
