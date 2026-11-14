---
sidebar_key: "cli-reference/ip/dhcp-server/matcher"
sidebar_position: 4
title: "matcher"
sidebar_label: 'matcher'
source: https://manual.mikrotik.com/docs/cli-reference/ip/dhcp-server/matcher
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dhcp-server/matcher {#ipdhcp-servermatcher}
**类型：** 目录

从特定 IP 池向请求中包含匹配 DHCP 选项（例如供应商类标识符或主机名）的客户端分配地址。具有静态租约的客户端即使被匹配器匹配，也会保留其静态租约。有关示例，请参见 [DHCP 服务器](../../../network-management/dhcp/server.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">匹配器已禁用。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">匹配器的名称。</ArgTableRow>
<ArgTableRow arg="server" typ="enum (all)" mandatory="1">匹配器适用的 DHCP 服务器，或使用 `all` 表示所有服务器。</ArgTableRow>
<ArgTableRow arg="address-pool" typ="enum (static-only)">用于为匹配客户端分配地址的 IP 池。</ArgTableRow>
<ArgTableRow arg="option-set" typ="enum (none)">要发送给匹配客户端的选项集（`/ip/dhcp-server/option/sets`）。</ArgTableRow>
<ArgTableRow arg="code" typ="alt { number: num [1 .. 254]
, option: enum (vendor-specific) { vendor-specific:43 }
 }" mandatory="1">要匹配的 DHCP 选项代码（1-254）。</ArgTableRow>
<ArgTableRow arg="value" typ="string" mandatory="1">要在选项中查找的值，可以是文本，也可以是带 `0x` 前缀的十六进制值。</ArgTableRow>
<ArgTableRow arg="matching-type" typ="enum (exact | substring)" mandatory="1">
`value` 与选项的比较方式：
- `exact` - 选项必须等于 `value`。
- `substring` - `value` 可以出现在选项中的任意位置。

当两个 substring 匹配器匹配同一个选项时，应用哪一个匹配器是随机的。
</ArgTableRow>
</ArgTable>
