---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/dynamic-dns"
sidebar_position: 18
title: "动态 DNS"
sidebar_label: "动态 DNS"
description: "动态 DNS 更新工具支持使用符合 RFC 的算法为动态 IP 地址安全更新域名记录，但仅支持 hmac-md5。它需要 BIND DNS 服务器，并与 IP、DNS server、key 和 TTL 等指定属性配合工作。"
tags:
  - 'dns-updates'
  - 'dynamic-ip'
  - 'hmac-md5'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/dynamic-dns
captured_at: '2026-11-04T11:27:55+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**子菜单：** `/tool/dns-update`

**标准：** `RFC 2136, RFC 3007`

动态 DNS 更新工具提供了一种让域名始终指向动态 IP 地址的方法。它通过向拥有待更新区域的名称服务器发送域名系统更新请求来工作。也支持安全 DNS 更新。

DNS 更新工具仅支持一种算法 - **hmac-md5**。它是用于对 DNS 消息进行签名的唯一提议算法。

:::warning
DNS 更新工具仅适用于 BIND 服务器；它无法与 DynDNS、EveryDNS 或任何其他类似服务配合使用。
:::

## 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **address** (*IP*; 默认： ) | 定义与域名关联的 IP 地址。 |
| **dns-server** (*IP*; 默认： ) | 要将更新发送到的 DNS 服务器。 |
| **key** (*string*; 默认： ) | 用于访问服务器的授权密钥。 |
| **key-name** (*string*; 默认： ) | 用于访问服务器的授权密钥名称（类似于用户名）。 |
| **name** (*string*; 默认： ) | 要附加到 IP 地址的名称。 |
| **ttl** (*integer*; 默认： ) | 该项的生存时间（以秒为单位）。 |
| **zone** (*string*; 默认： ) | 要更新域名的 DNS 区域。 |

:::warning
路由器上的系统时钟时间与 DNS 服务器的时间相差不能超过 5 分钟。否则，DNS 服务器将忽略此请求。
:::

## 示例 {#example}

要告诉 23.34.45.56 DNS 服务器将 myzone.com 区域中的 mydomain 名称（重新）关联到 68.42.14.4 IP 地址，并指定密钥名称为 dns-update-key、实际密钥为 update：

```ros
[admin@MikroTik] tool> dns-update dns-server=23.34.45.56 name=mydomain \
\... zone=myzone.com address=68.42.14.4 key-name=dns-update-key key=update
```
