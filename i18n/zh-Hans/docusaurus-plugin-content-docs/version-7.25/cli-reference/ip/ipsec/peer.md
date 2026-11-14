---
sidebar_key: "cli-reference/ip/ipsec/peer"
sidebar_position: 6
title: "peer"
sidebar_label: 'peer'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/ipsec/peer
captured_at: '2026-11-01T21:24:10+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ipsec/peer {#ipipsecpeer}
**类型：** 目录

对等方配置设置用于在 IKE 守护进程之间建立连接。此连接随后用于为 SA 协商密钥和算法。交换模式是各对等方之间的唯一标识符，这意味着只要使用不同的 exchange-mode，就可以存在多个具有相同 remote-address 的对等方配置。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">该项是否已禁用。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">该项是否是动态创建的。</ArgTableRow>
<ArgTableRow arg="R" typ="responder">该对等方是否仅充当响应方（监听传入请求）而不发起连接。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">对等方名称。</ArgTableRow>
<ArgTableRow arg="address" typ="alt { prefix6: ip6Prefix
, prefix4: ipPrefix
, dns: string
 }">对等方的远程地址。如果远程对等方的地址与此前缀匹配，则该对等方配置将用于阶段 1 的身份验证和建立。如果多个对等方地址与多个配置条目匹配，则将使用最具体的一项（即具有最大子网掩码的那一项）。</ArgTableRow>
<ArgTableRow arg="local-address" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }">用于连接的本地地址。</ArgTableRow>
<ArgTableRow arg="passive" typ="bool">被动对等方不发起连接。启用被动模式还表示该对等方是 xauth 响应方，而禁用被动模式则表示它是 xauth 发起方。</ArgTableRow>
<ArgTableRow arg="port" typ="num">当路由器作为发起方且远程对等方使用非默认端口时，用于连接到远程对等方的通信端口。</ArgTableRow>
<ArgTableRow arg="profile" typ="enum">要使用的 IPsec 配置文件。</ArgTableRow>
<ArgTableRow arg="exchange-mode" typ="enum (main | aggressive | ike2)">
根据 [RFC 2408](https://datatracker.ietf.org/doc/html/rfc2408#section-4.1) 的 ISAKMP 阶段 1 交换模式。`main` 模式放宽了 [rfc2409 第 5.4 节](https://datatracker.ietf.org/doc/html/rfc2409#section-5.4)，以允许在 `main` 模式下进行 pre-shared-key 认证。`ike2` 模式启用 Ikev2 [RFC 7296](https://datatracker.ietf.org/doc/html/rfc7296)。  

IKEv2 会忽略的参数：`proposal-check`、`compatibility-options`、`lifebytes`、`dpd-maximum-failures`、`nat-traversal`。
</ArgTableRow>
<ArgTableRow arg="send-initial-contact" typ="bool">指定是发送“初始联系”IKE 数据包还是等待远端；该数据包应触发移除当前源地址的旧对等方 SA。通常，在 road warrior 部署中，客户端是发起方，此参数应设置为 no。如果为 ikev1 启用了 modecfg 或 xauth，则不会发送初始联系。</ArgTableRow>
<ArgTableRow arg="ppk-secret" typ="string">当此对等方不存在一次性密钥/psk 时，使用的带有 "static-ppk-secret" ID 的静态 PPK 密钥；请确保该密钥具有 256 bits 的熵。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="current-address" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }">对等方当前的远程地址。</ArgTableRow>
</ArgTable>
