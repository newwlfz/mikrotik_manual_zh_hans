---
sidebar_key: "cli-reference/interface/wireguard/index"
sidebar_position: 1
title: "wireguard"
sidebar_label: 'wireguard'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/wireguard
captured_at: '2026-11-01T21:23:18+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/wireguard {#interfacewireguard}
**类型：** 目录

[WireGuard](../../../virtual-private-networks/wireguard.md) 在对等节点之间创建由公钥标识的加密 IP 隧道。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">项目是否被禁用。</ArgTableRow>
<ArgTableRow arg="R" typ="running">接口是否正在运行。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">隧道的名称。</ArgTableRow>
<ArgTableRow arg="mtu" typ="num">Layer3 最大传输单元。</ArgTableRow>
<ArgTableRow arg="listen-port" typ="num">WireGuard 服务用于监听传入会话的端口。</ArgTableRow>
<ArgTableRow arg="private-key" typ="string">base64 私钥。如果未指定，则在创建接口时自动生成。每个网络接口都有一个私钥和一个对等节点列表。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">指定 WireGuard UDP 套接字使用哪个 VRF 来确定加密数据包的发送或接收方式。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="public-key" typ="string">根据私钥计算得出的 base64 公钥。公钥用于对等节点之间相互认证。</ArgTableRow>
</ArgTable>
