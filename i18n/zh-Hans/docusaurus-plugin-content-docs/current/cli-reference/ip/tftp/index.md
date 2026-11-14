---
sidebar_key: "cli-reference/ip/tftp"
title: "tftp"
sidebar_label: 'tftp'
source: https://manual.mikrotik.com/docs/cli-reference/ip/tftp
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/tftp {#iptftp}
**类型：** 目录

TFTP 服务器的访问规则。只要至少存在一条规则，服务器就会运行（`/ip/service` 中 UDP 端口 69 上的动态 `tftpd` 条目）。每个请求都会按顺序与规则进行匹配，第一条同时匹配客户端地址和请求文件名的规则起决定作用；没有任何规则匹配的请求会被拒绝，并返回 `permission denied!`。参见 [TFTP](../../../system-information-and-utilities/tftp.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">该规则已禁用，不会被使用。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="ip-addresses" typ="object { ip-addresses: alt { ip6: ip6Prefix
, ip: ipRange
 }
 }">该规则适用的客户端地址：IPv4 地址、范围或前缀，或 IPv6 前缀。空值（默认）表示任意客户端。</ArgTableRow>
<ArgTableRow arg="req-filename" typ="string">作为正则表达式的请求文件名；空值（默认）匹配任意名称。区分大小写。不以 `^` 开头的值必须匹配整个名称（`phone\.cfg` 只匹配 `phone.cfg`，`.*\.cfg` 匹配每个 `.cfg` 名称）；锚点会添加在整个值的前后，因此请将备选项写在分组中，例如 `(aaa|bbb)\.bin`。以 `^` 开头的值按原样使用。这里的名称是客户端请求的名称，而不是路由器上的路径。在提供文件夹或所请求名称的规则中，诸如 `.*` 这样的模式或空值也会匹配指向文件夹外部的名称：请使用诸如 `[^/.][^/]*` 这样的模式，该模式不允许斜杠，也不允许开头的点。</ArgTableRow>
<ArgTableRow arg="real-filename" typ="string">该规则所提供的内容。为空（默认）时提供所请求的名称本身；文件表示为每个匹配的请求提供该文件；文件夹会置于所请求名称之前（`real-filename=tftp` 对 `phone.cfg` 或 `/phone.cfg` 的请求以 `tftp/phone.cfg` 应答）。上传内容会写入同一位置。该值按字面使用：不支持诸如 `\1` 这样引用 `req-filename` 各部分的写法。</ArgTableRow>
<ArgTableRow arg="allow" typ="bool">`yes` 允许匹配的请求，`no` 会以 `permission denied!` 拒绝这些请求。默认值：yes。</ArgTableRow>
<ArgTableRow arg="read-only" typ="bool">当为 `yes` 时，上传会失败并返回 `illegal operation`。设置为 `no` 可接受上传。默认值：yes。</ArgTableRow>
<ArgTableRow arg="allow-rollover" typ="bool">允许传输超过 65535 个块：在第 65535 块之后，路由器会从第 0 块继续，客户端必须支持这一点。如果未启用，此类传输会在达到限制时失败并返回 `illegal operation`。默认值：no。</ArgTableRow>
<ArgTableRow arg="allow-overwrite" typ="bool">当 `read-only=no` 时，允许上传替换现有文件。如果未启用，上传会失败并返回 `file exists`。默认值：no。</ArgTableRow>
<ArgTableRow arg="reading-window-size" typ="alt { window-size: enum (none | pipelining) { none:0 }
 }">
- `none`（默认）- 在前一个块被确认后发送下载的每个块。
- `pipelining` - 在等待确认之前发送下载的多个块，从而加快下载速度。
</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="hits" typ="num">该规则应答的请求数。</ArgTableRow>
</ArgTable>
