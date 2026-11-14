---
sidebar_key: "cli-reference/ipv6/dhcp-client/index"
sidebar_position: 1
title: "dhcp-client"
sidebar_label: "dhcp-client"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ipv6/dhcp-client
captured_at: '2026-11-01T21:29:03+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/dhcp-client {#ipv6dhcp-client}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">无效</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1"></ArgTableRow>
<ArgTableRow arg="request" typ="ubit (info, address, prefix)" mandatory="1"></ArgTableRow>
<ArgTableRow arg="accept-prefix-without-address" typ="bool">即使未提供地址也接受前缀（仅在同时请求了地址和前缀时应用）</ArgTableRow>
<ArgTableRow arg="add-default-route" typ="bool">定义是否将默认路由添加到 DHCP 服务器（如果响应经过中继，则添加到直接中继）</ArgTableRow>
<ArgTableRow arg="default-route-distance" typ="num"></ArgTableRow>
<ArgTableRow arg="default-route-tables" typ="object { table: alt { table-distance: composite { table: alt { table-default: enum (default) { default:0xffffffff }
, table: enum
 }
, distance: num [1 .. 255]
 }
, table: alt { table-default: enum (default) { default:0xffffffff }
, table: enum
 }
 }
 }"></ArgTableRow>
<ArgTableRow arg="check-gateway" typ="enum (none | arp | ping | bfd)"></ArgTableRow>
<ArgTableRow arg="use-peer-dns" typ="bool">是否接受 DHCP 服务器通告的 DNS 设置</ArgTableRow>
<ArgTableRow arg="use-interface-duid" typ="bool">使用根据当前接口 MAC 生成的 DUID</ArgTableRow>
<ArgTableRow arg="custom-duid" typ="string">用作客户端 DUID，覆盖 use-interface-duid</ArgTableRow>
<ArgTableRow arg="validate-server-duid" typ="bool"></ArgTableRow>
<ArgTableRow arg="rapid-commit" typ="bool">如有可能，使用 Rapid Commit</ArgTableRow>
<ArgTableRow arg="allow-reconfigure" typ="bool"></ArgTableRow>
<ArgTableRow arg="dhcp-options" typ="multi { array-id, option: enum
 }"></ArgTableRow>
<ArgTableRow arg="pool-name" typ="string">从接收到的前缀创建的地址池名称（仅在请求了前缀时应用）</ArgTableRow>
<ArgTableRow arg="pool-prefix-length" typ="num">从接收到的前缀创建的地址池的前缀长度（仅在请求了前缀时应用）；如果未设置，将自动确定前缀长度</ArgTableRow>
<ArgTableRow arg="prefix-hint" typ="ip6Prefix"></ArgTableRow>
<ArgTableRow arg="prefix-address-lists" typ="multi { array-id, prefix-address-list: string
 }">接收到的前缀将添加到的地址列表（仅在请求了前缀时应用）</ArgTableRow>
<ArgTableRow arg="script" typ="alt { script: string
 }"></ArgTableRow>
<ArgTableRow arg="custom-iapd-id" typ="num"></ArgTableRow>
<ArgTableRow arg="custom-iana-id" typ="num"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="enum (stopped | searching... | requesting... | bound | renewing... | rebinding... | stopping... | declining... | error | idle | requesting-info... | confirming...)"></ArgTableRow>
<ArgTableRow arg="duid" typ="string"></ArgTableRow>
<ArgTableRow arg="dhcp-server-v6" typ="ip6Addr"></ArgTableRow>
<ArgTableRow arg="prefix" typ="composite { prefix: ip6Prefix
, expires-after: time
 }"></ArgTableRow>
<ArgTableRow arg="address" typ="composite { address: ip6Addr
, expires-after: time
 }"></ArgTableRow>
<ArgTableRow arg="reconfigure-key" typ="string"></ArgTableRow>
<ArgTableRow arg="reconfigure-last-counter" typ="string"></ArgTableRow>
</ArgTable>
