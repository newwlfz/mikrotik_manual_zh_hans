---
sidebar_key: "cli-reference/ip/socks/access"
sidebar_position: 1
title: "access"
sidebar_label: 'access'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/socks/access
captured_at: '2026-11-01T21:24:26+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/socks/access {#ipsocksaccess}
**类型：** 目录

服务器在拨号连接所请求的目标之前评估的访问控制列表。规则按顺序检查，第一条匹配的规则决定结果。不匹配任何规则的请求会被允许，因此空列表允许所有请求，而限制性列表需要在末尾添加一条 `deny` 规则。更多信息，请参阅 [SOCKS](../../../network-management/socks/index.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">disabled。该规则未被使用。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="src-address" typ="super { !
, alt-address: alt { range: ipRange
, src-ipv6: ip6Prefix
 }
 }">SOCKS 客户端（请求方）的地址或子网。未设置时匹配任意。</ArgTableRow>
<ArgTableRow arg="src-port" typ="super { !
, min: num [0 .. 65535]
, [max] -num [0 .. 65535]
 }">客户端连接的源 TCP 端口。未设置时匹配任意。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="super { !
, alt-address: alt { range: ipRange
, dst-ipv6: ip6Prefix
, dst-domain: string
 }
 }">客户端请求的目标：IP 地址、范围或域名。域名仅匹配按名称请求目标的客户端（SOCKS5 域名地址类型）。[`socksify`](../socksify.md) 客户端始终按 IP 地址请求，因此域名规则不会匹配经 socksify 处理的流量。</ArgTableRow>
<ArgTableRow arg="dst-port" typ="super { !
, min: num [0 .. 65535]
, [max] -num [0 .. 65535]
 }">请求的目标端口或范围，例如 `21` 或 `1024-65535`。未设置时匹配任意。</ArgTableRow>
<ArgTableRow arg="action" typ="enum (deny | allow) { deny:0, allow:1 }">
服务器对匹配请求执行的操作。
- `allow` (默认) - 将连接转发到目标。
- `deny` - 拒绝连接。
</ArgTableRow>
</ArgTable>
