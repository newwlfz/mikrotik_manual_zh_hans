---
title: "peer"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/ipsec/peer
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/ip/ipsec/policy"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/ipsec/peer 
**类型：** 目录

对等体配置设置用于在 IKE 守护进程之间建立连接。该连接随后用于协商 SA 的密钥和算法。交换模式是对等体之间唯一的标识符，这意味着只要使用不同的 exchange-mode，就可以存在多个具有相同 remote-address 的对等体配置。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">Whether an item is disabled.</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">Whether the item was created dynamically.</ArgTableRow>
<ArgTableRow arg="R" typ="responder">Whether this peer will act as a responder only (listen to incoming requests) and not initiate a connection.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Peer name.</ArgTableRow>
<ArgTableRow arg="address" typ="alt { prefix6: ip6Prefix
, prefix4: ipPrefix
, dns: string
 }">Remote address of the peer. If the remote peer's address matches this prefix, then the peer configuration is used in authentication and establishment of Phase 1. If several peer's addresses match several configuration entries, the most specific one (i.e. the one with the largest netmask) will be used.</ArgTableRow>
<ArgTableRow arg="local-address" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }">Local address to use for the connection.</ArgTableRow>
<ArgTableRow arg="passive" typ="bool">Passive peer does not initiate the connection. The enabled passive mode also indicates that the peer is an xauth responder, and disabled passive mode - xauth initiator.</ArgTableRow>
<ArgTableRow arg="port" typ="num">Communication port used (when the router is an initiator) to connect to the remote peer when the remote peer uses a non-default port.</ArgTableRow>
<ArgTableRow arg="profile" typ="enum">IPsec profile to use.</ArgTableRow>
<ArgTableRow arg="exchange-mode" typ="enum (main | aggressive | ike2)">
ISAKMP phase 1 exchange modes according to [RFC 2408](https://datatracker.ietf.org/doc/html/rfc2408#section-4.1). The `main` mode relaxes [rfc2409 section 5.4](https://datatracker.ietf.org/doc/html/rfc2409#section-5.4), to allow pre-shared-key authentication in the `main` mode. `ike2` mode enables Ikev2 [RFC 7296](https://datatracker.ietf.org/doc/html/rfc7296).  

IKEv2 会忽略以下参数：`proposal-check`、`compatibility-options`、`lifebytes`、`dpd-maximum-failures`、`nat-traversal`。
</ArgTableRow>
<ArgTableRow arg="send-initial-contact" typ="bool">指定是否发送“initial contact”IKE 数据包，或等待远端。该数据包应触发删除当前源地址的旧对等体 SA。通常，在 road warrior 场景中，客户端是发起方，该参数应设置为 no。如果 ikev1 启用了 modecfg 或 xauth，则不会发送 initial contact。</ArgTableRow>
<ArgTableRow arg="ppk-secret" typ="string">静态 PPK secret，使用“static-ppk-secret”ID，当该对等体不存在一次性密钥/psk 时使用。请确保该密钥具有 256 位熵。</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="current-address" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }">Current remote address of the peer.</ArgTableRow>
</ArgTable>
