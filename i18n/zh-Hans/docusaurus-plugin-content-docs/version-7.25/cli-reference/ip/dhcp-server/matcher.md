---
title: "matcher"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dhcp-server/matcher
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/dhcp-server/matcher 
**类型：** 目录

根据客户端请求中包含的匹配 DHCP 选项（例如供应商类别标识符或主机名），从指定 IP 池分配地址。具有静态租约的客户端即使被匹配器匹配，也会保留其静态租约。示例请参阅 [DHCP Server](/docs/network-management/dhcp/server)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">The matcher is disabled.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1">Name of the matcher.</ArgTableRow>
<ArgTableRow arg="server" typ="enum (all)" mandatory="1">DHCP server the matcher applies to, or `all` for every server.</ArgTableRow>
<ArgTableRow arg="address-pool" typ="enum (static-only)">IP pool to give matching clients an address from.</ArgTableRow>
<ArgTableRow arg="option-set" typ="enum (none)">Option set (`/ip/dhcp-server/option/sets`) to send to matching clients.</ArgTableRow>
<ArgTableRow arg="code" typ="alt { number: num [1 .. 254]
, option: enum (vendor-specific) { vendor-specific:43 }
 }" mandatory="1">Code of the DHCP option to match (1-254).</ArgTableRow>
<ArgTableRow arg="value" typ="string" mandatory="1">Value to look for in the option, as text or as hex with the `0x` prefix.</ArgTableRow>
<ArgTableRow arg="matching-type" typ="enum (exact | substring)" mandatory="1">
How `value` is compared with the option:
- `exact` - The option must be equal to `value`.
- `substring` - `value` can appear anywhere in the option.

当两个子字符串匹配器匹配同一选项时，应用哪一个匹配器是随机的。
</ArgTableRow>
</ArgTable>
