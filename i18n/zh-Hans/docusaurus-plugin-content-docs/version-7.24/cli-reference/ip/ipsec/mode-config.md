---
sidebar_key: "cli-reference/ip/ipsec/mode-config"
sidebar_position: 5
title: "mode-config"
sidebar_label: "mode-config"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/ipsec/mode-config
captured_at: '2026-11-01T21:28:47+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ipsec/mode-config {#ipipsecmode-config}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default">default</ArgTableRow>
<ArgTableRow arg="R" typ="responder">responder</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="responder" typ="bool">对端应请求或发送配置</ArgTableRow>
<ArgTableRow arg="system-dns" typ="bool">向对端发送系统 DNS 服务器</ArgTableRow>
<ArgTableRow arg="static-dns" typ="object { address: alt { address4: ipAddr
 }
 }">发送给对端的 DNS 服务器，与 system-dns 互斥</ArgTableRow>
<ArgTableRow arg="address" typ="ipAddr"></ArgTableRow>
<ArgTableRow arg="address-pool" typ="enum (none) { none:-1 }">从此地址池中为对端分配一个地址</ArgTableRow>
<ArgTableRow arg="address-prefix-length" typ="num">所分配地址的子网掩码</ArgTableRow>
<ArgTableRow arg="split-include" typ="object { subnet: alt { subnet4: ipPrefix
 }
 }">额外的受保护子网</ArgTableRow>
<ArgTableRow arg="split-dns" typ="multi { array-id, dns: string
 }">要使用内部服务器解析的 DNS 名称</ArgTableRow>
<ArgTableRow arg="src-address-list" typ="enum ()">要添加到发起方 srcnat 链的地址列表名称</ArgTableRow>
<ArgTableRow arg="connection-mark" typ="enum ()">要添加到发起方 srcnat 链的 conection-mark</ArgTableRow>
<ArgTableRow arg="use-responder-dns" typ="enum (no | yes | exclusively)">发送的 DNS 服务器是否应由发起方使用</ArgTableRow>
</ArgTable>
