---
sidebar_key: "cli-reference/ip/ipsec/mode-config"
sidebar_position: 5
title: "mode-config"
sidebar_label: 'mode-config'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/ipsec/mode-config
captured_at: '2026-11-01T21:24:14+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ipsec/mode-config {#ipipsecmode-config}
**类型：** 目录

此菜单配置 ISAKMP 和 IKEv2 配置属性。

:::note
并非所有 IKE 实现都支持由 `split-include` 选项提供的多个拆分网络。
:::

:::note
如果 RouterOS 客户端是发起方，它始终发送 CISCO UNITY 扩展，并且 RouterOS 仅支持此扩展中的 split-include。
:::

:::note
同时支持 Cisco Unity Split DNS（属性类型 28675）和 RFC8598（属性类型 25）这两个属性，但 ROS 仅以 responder 身份响应这些属性。
:::

:::note
不能同时使用 `system-dns` 和 `static-dns`；ROS 只能使用一个 DNS。
:::

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default">该项是否为默认项。</ArgTableRow>
<ArgTableRow arg="R" typ="responder">该项是否充当 responder。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">模式配置条目名称。</ArgTableRow>
<ArgTableRow arg="responder" typ="bool">指定该配置将作为 initiator（客户端）还是 responder（服务器）工作。initiator 将从 responder 请求 mode-config 参数。</ArgTableRow>
<ArgTableRow arg="system-dns" typ="bool">启用此选项后，将从 /ip/dns 获取 DNS 地址。</ArgTableRow>
<ArgTableRow arg="static-dns" typ="object { address: alt { address4: ipAddr
 }
 }">手动指定要发送给客户端的 DNS 服务器 IP 地址。</ArgTableRow>
<ArgTableRow arg="address" typ="ipAddr">要分配给对等体的地址。</ArgTableRow>
<ArgTableRow arg="address-pool" typ="enum (none) { none:-1 }">从该地址池中为对等体分配一个地址。</ArgTableRow>
<ArgTableRow arg="address-prefix-length" typ="num">所分配地址的掩码。</ArgTableRow>
<ArgTableRow arg="split-include" typ="object { subnet: alt { subnet4: ipPrefix
 }
 }">采用 CIDR 格式的子网列表，这些子网将被隧道传输。子网将使用 CISCO UNITY 扩展发送给对等体。远程对等体将创建特定的动态策略。</ArgTableRow>
<ArgTableRow arg="split-dns" typ="multi { array-id, dns: string
 }">将使用 system-dns=yes 或 static-dns= 设置解析的 DNS 名称列表。</ArgTableRow>
<ArgTableRow arg="src-address-list" typ="enum ()">指定地址列表将生成动态源 NAT 规则。此参数仅在 responder=no 时可用。带 NAT 的 roadWarrior 客户端</ArgTableRow>
<ArgTableRow arg="connection-mark" typ="enum ()">要为 initiator 添加到 srcnat 链的 conection-mark</ArgTableRow>
<ArgTableRow arg="use-responder-dns" typ="enum (no | yes | exclusively)">发送的 DNS 服务器是否应由 initiator 使用</ArgTableRow>
</ArgTable>
