---
title: "adlist"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dns/adlist
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/dns/adlist 
**类型：** 目录

广告拦截列表。对于这些列表中的名称，路由器不再向上游查询，而是使用 `0.0.0.0` 和 `::`（TTL 2 s）应答 A 和 AAAA 查询；其他查询类型（如 MX 或 HTTPS）会转发到上游。仅拦截完全匹配的名称，不拦截其子域。这些名称保存在 DNS 缓存内存中，并计入 [`/ip/dns`](/docs/cli-reference/ip) 中的 `cache-size`：每个名称约占 75 字节，因此 76 500 个名称约占 5.6 MiB。当缓存过小时，导入会停止，并记录日志消息 `adlist read: max cache size reached` 和 `could not add name, stopping import`，`name-count` 显示已导入的名称数量；之后增大 `cache-size` 不会补全列表，因此请删除 adlist 并重新添加。路由器每 4 小时重新检查一次列表。最多可添加 64 个 adlist。静态 `FWD` 条目会使某个名称不受所有 adlist 影响；仅静态 A 条目不会。示例请参阅 [DNS](/docs/network-management/dns)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">The adlist is disabled and blocks nothing.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="file" typ="file">
File on the router with the names to block, as `/file/print` shows it. One name per line, in lower case, in one of these formats:
- `0.0.0.0 name`, `127.0.0.1 name` or `::1 name` - Hosts file format.
- `name` - Just the name.

以 `#` 开头的行以及名称后的注释会被忽略。不支持通配符（如 `*.example.com`）和一行多个名称。
</ArgTableRow>
<ArgTableRow arg="url" typ="string">与 `file` 格式相同的列表 URL，例如公共 hosts 文件。路由器会下载该列表，并在其存储中保留一份副本（不会显示在 `/file` 中）。</ArgTableRow>
<ArgTableRow arg="ssl-verify" typ="bool">路由器是否根据内置信任存储和 `/certificate` 中的证书验证 `url` 服务器的证书。检查失败时，路由器不会导入该列表，并在 `dns` 主题中记录 `http client error: SSL: ...`。对于使用自签名证书的服务器，请导入其 CA 证书或设置 `ssl-verify=no`。默认值：yes。</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="match-count" typ="num">Number of queries answered from this list.</ArgTableRow>
<ArgTableRow arg="name-count" typ="num">Number of names imported from this list.</ArgTableRow>
</ArgTable>
