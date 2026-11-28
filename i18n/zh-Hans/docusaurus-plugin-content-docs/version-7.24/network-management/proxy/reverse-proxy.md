---
title: "反向代理"
description: "MikroTik RouterOS 上的反向代理服务允许使用简单 URL 将 HTTPS 流量路由到服务器或应用，而无需 NAT 规则；该服务支持配置 IP / 端口和 SNI 设置，但需要禁用端口 443 上的默认 www-ssl 服务。"
tags:
  - 'reverse-proxy'
  - 'certificates'
source: https://manual.mikrotik.com/docs/7.24/network-management/proxy/reverse-proxy
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "network-management/proxy"
pagination_next: "network-management/socks"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

反向代理是一种服务，当应用设置中启用 `use-https` 参数时，允许路由器通过简单 URL 而不是 IP 地址，将 HTTPS 流量发送到路由器后面的服务器或 RouterOS 容器 / 应用，而无需创建单独的目标 NAT 规则。

:::danger
请注意，默认情况下，reverse-proxy 服务使用 HTTPS 端口 443，与默认 www-ssl 服务端口相同。要使 reverse-proxy 正常工作，需要确保 www-ssl 服务已禁用或使用其他 TCP 端口。([/ip/service documentation](/docs/system-information-and-utilities/services)
:::

:::info
SMIPS 设备（hAP lite、hAP lite TC 和 hAP mini）不支持 Reverse Proxy。
:::

### 属性说明 {#property-description}

**子菜单：** `/ip/reverse-proxy`

| 属性 | 说明 |
| :-- | :-- |
| **disabled** (*yes* \| *no*；默认值：**yes**) | 反向代理记录是否处于活动状态。 |
| **ip-address**(IPv4/IPv6；默认值：**0.0.0.0** ) | 要代理连接的服务器 IP 地址。 |
| **port**(整数：0..65535；默认值：**0**) | 服务器的监听端口。 |
| **sni** (字符串；默认值： ) | 服务器的 Server Name Indication。 |
| **certificate**(certificate；默认值：**none**) | 特定 reverse-proxy 实例使用的 [证书](/docs/authentication-authorization-accounting/certificates) 名称。设置为 **none** 时，reverse-proxy 实例将使用 `/ip/service` 菜单中 reverse-proxy 服务设置的证书。 |
| **vrf** (名称；默认值：main ) | 要使用的 Virtual Routing and Forwarding 实例。 |
| **comment**(字符串；默认值： ) | 项目的描述性名称。 |
