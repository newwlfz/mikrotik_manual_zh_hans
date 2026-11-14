---
sidebar_key: "cli-reference/system/ntp/client/servers"
sidebar_position: 2
title: "servers"
sidebar_label: 'servers'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/ntp/client/servers
captured_at: '2026-11-01T21:25:33+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/ntp/client/servers {#systemntpclientservers}
**类型：** 目录

客户端的 NTP 服务器。静态条目在此处添加，或通过 [`/system/ntp/client`](./index.md) 中的 `servers` 添加；从 DHCP 学习到的条目（当 DHCP 客户端设置了 `use-peer-ntp=yes` 时）为动态条目。请参阅 [NTP](../../../../system-information-and-utilities/ntp.md) 指南。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">该条目已禁用。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态条目，从 DHCP 学习得到。动态条目无法编辑。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="address (flags=46D)" mandatory="1">NTP 服务器的 IP 地址或域名。IPv4 和 IPv6 地址可以带有 `@vrf` 后缀，链路本地 IPv6 地址可以带有 `%interface` 后缀。域名通过 `/ip/dns` 解析；结果显示在 `resolved-address` 中。</ArgTableRow>
<ArgTableRow arg="min-poll" typ="num">向该服务器查询的最短间隔，以 2 的幂表示秒数（6 表示每 64 秒一次）。必须小于 `max-poll`。范围：3..17。默认值：6。</ArgTableRow>
<ArgTableRow arg="max-poll" typ="num">向该服务器查询的最长间隔，以 2 的幂表示秒数（10 表示每 1024 秒一次）。范围：3..17。默认值：10。</ArgTableRow>
<ArgTableRow arg="iburst" typ="bool">启用后，客户端会在添加服务器后立即发送一组间隔约一秒的查询突发，以便快速获得初始估算。默认值：yes。</ArgTableRow>
<ArgTableRow arg="auth-key" typ="enum (none) { none:0 }">来自 [`/system/ntp/key`](../key.md) 的密钥，用于验证该服务器的回复。未通过验证的回复会被拒绝（crypto NAK），客户端不会进行同步。默认值：none。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="resolved-address" typ="address (flags=46)">`address` 中的域名所解析到的 IP 地址。</ArgTableRow>
</ArgTable>
