---
sidebar_key: "cli-reference/ip/dns/adlist/index"
sidebar_position: 1
title: "adlist"
sidebar_label: 'adlist'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dns/adlist
captured_at: '2026-11-01T21:23:54+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dns/adlist {#ipdnsadlist}
**类型：** 目录

广告拦截列表。对于这些列表中的名称，路由器使用 `0.0.0.0` 和 `::`（TTL 2 秒）应答 A 和 AAAA 查询，而不向上游查询；其他查询类型（例如 MX 或 HTTPS）则转发到上游。只会拦截精确名称，而不会拦截其子域。这些名称保存在 DNS 缓存内存中，并计入 [`/ip/dns`](../index.md) 中的 `cache-size`：每个名称约占 75 字节，因此 76 500 个名称约占用 5.6 MiB。当缓存过小时，导入会停止，并记录日志消息 `adlist read: max cache size reached` 和 `could not add name, stopping import`，`name-count` 会显示已导入的名称数量；之后提高 `cache-size` 不会补全列表，因此请删除该 adlist 并重新添加。路由器每 4 小时重新检查一次列表。最多可添加 64 个 adlist。静态 `FWD` 条目可使名称免于所有 adlist 的拦截；仅静态 A 条目则不会。有关示例，请参阅 [DNS](../../../../network-management/dns.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">该 adlist 已禁用，不会拦截任何内容。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="file" typ="file">
路由器上包含要拦截名称的文件，格式与 `/file/print` 显示的一致。每行一个名称，使用小写，格式为以下之一：
- `0.0.0.0 name`、`127.0.0.1 name` 或 `::1 name` - Hosts 文件格式。
- `name` - 仅名称。

以 `#` 开头的行以及名称后的注释会被忽略。不支持 `*.example.com` 等通配符以及一行包含多个名称。
</ArgTableRow>
<ArgTableRow arg="url" typ="string">列表的 URL，格式与 `file` 相同，例如公共 hosts 文件。路由器会下载该列表并在其存储中保留一份副本（不会显示在 `/file` 中）。</ArgTableRow>
<ArgTableRow arg="ssl-verify" typ="bool">路由器是否根据内置信任存储和 `/certificate` 中的证书来验证 `url` 服务器的证书。检查失败时，路由器不会导入该列表，并在 `dns` 主题中记录 `http client error: SSL: ...`。对于使用自签名证书的服务器，导入其 CA 证书或设置 `ssl-verify=no`。默认值：yes.</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="match-count" typ="num">从此列表应答的查询数量。</ArgTableRow>
<ArgTableRow arg="name-count" typ="num">从此列表导入的名称数量。</ArgTableRow>
</ArgTable>
