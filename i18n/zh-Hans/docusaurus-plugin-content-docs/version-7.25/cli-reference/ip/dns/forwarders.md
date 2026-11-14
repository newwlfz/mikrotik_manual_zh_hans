---
sidebar_key: "cli-reference/ip/dns/forwarders"
sidebar_position: 3
title: "forwarders"
sidebar_label: 'forwarders'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dns/forwarders
captured_at: '2026-11-01T21:23:55+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dns/forwarders {#ipdnsforwarders}
**类型：** 目录

为静态 `FWD` 条目命名上游服务器组：将 [`/ip/dns/static`](./static.md) 中某个条目的 `forward-to` 设置为该转发器名称。每个查询会依次轮换使用 `dns-servers` 和 `doh-servers` 中的下一个服务器（轮询）。无响应的服务器不会被跳过：在 `query-total-timeout` 之后，发送给它的查询会以 SERVFAIL 失败，因此请只列出可正常工作的服务器。有关示例，请参阅 [DNS](../../../network-management/dns.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">转发器已禁用。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">转发器的名称，在静态 `FWD` 条目中用作 `forward-to`。</ArgTableRow>
<ArgTableRow arg="dns-servers" typ="multi { address (flags=46D)
 }">转发器的 DNS 服务器，形式为 IP 地址或 DNS 名称，例如 `dns-servers=1.1.1.1,8.8.8.8`。</ArgTableRow>
<ArgTableRow arg="doh-servers" typ="multi { string
 }">转发器的 DoH 服务器 URL，例如 `doh-servers=https://dns.google/dns-query`。路由器通过 `/ip/dns` 中的 `servers` 查找它们的主机名。</ArgTableRow>
<ArgTableRow arg="verify-doh-cert" typ="bool">路由器是否根据 `/certificate` 和内置信任存储验证 DoH 服务器的证书。证书不受信任的服务器会在日志中失败，并显示 `SSL: ssl: no trusted CA certificate found (6)`。此默认值与 `/ip/dns` 中的 `verify-doh-cert` 不同。默认值：yes.</ArgTableRow>
</ArgTable>
