---
title: "动态 DNS"
description: "Dynamic DNS Update Tool 使用符合 RFC 的算法为动态 IP 地址提供域名记录的安全更新，仅支持 hmac-md5。它需要 BIND DNS 服务器，并使用 IP、DNS server、key 和 TTL 等指定属性。"
tags:
  - 'dns-updates'
  - 'dynamic-ip'
  - 'hmac-md5'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/dynamic-dns
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**子菜单：** `/tool/dns-update`

**标准：** `RFC 2136, RFC 3007`

动态 DNS 更新工具可使域名始终指向动态 IP 地址。它向拥有待更新区域的名称服务器发送域名系统更新请求。还支持安全的 DNS 更新。

DNS 更新工具仅支持一种算法：**hmac-md5**。这是唯一提议用于签署 DNS 消息的算法。

:::warning
DNS 更新工具仅适用于 BIND 服务器；它不适用于 DynDNS、EveryDNS 或任何其他类似服务。
:::

## 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **address** (*IP*; Default: ) | 定义与域名关联的 IP 地址。 |
| **dns-server** (*IP*; Default: ) | 接收更新的 DNS 服务器。 |
| **key** (*string*; Default: ) | 用于访问服务器的授权密钥。 |
| **key-name** (*string*; Default: ) | 用于访问服务器的授权密钥名称（类似用户名）。 |
| **name** (*string*; Default: ) | 附加到 IP 地址的名称。 |
| **ttl** (*integer*; Default: ) | 条目的生存时间（以秒为单位）。 |
| **zone** (*string*; Default: ) | 更新域名所在的 DNS 区域。 |

:::warning
路由器上的系统时钟时间与 DNS 服务器时间的差值不能超过 5 分钟。否则，DNS 服务器将忽略该请求。
:::

## 示例 {#example}

指示 23.34.45.56 DNS 服务器将 myzone.com 区域中的 mydomain 名称与 68.42.14.4 IP 地址重新关联，并指定密钥名称为 dns-update-key，实际密钥为 updates：

```ros
[admin@MikroTik] tool> dns-update dns-server=23.34.45.56 name=mydomain \
\... zone=myzone.com address=68.42.14.4 key-name=dns-update-key key=update
```
