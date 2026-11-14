---
sidebar_key: "network-management/proxy/reverse-proxy"
sidebar_position: 1
title: "反向代理"
sidebar_label: "反向代理"
description: "MikroTik RouterOS 上的反向代理服务允许使用简单的 URL（而非 NAT 规则）将 HTTPS 流量路由到服务器或应用程序，并可配置 IP/端口和 SNI 设置，但需要禁用端口 443 上默认的 www-ssl 服务。"
tags:
  - 'reverse-proxy'
  - 'certificates'
source: https://manual.mikrotik.com/docs/7.24/network-management/proxy/reverse-proxy
captured_at: '2026-11-04T11:32:43+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

反向代理是一项服务，当应用设置中启用 "use-https" 参数时，它允许路由器通过一个简单的 URL（而不是 IP 地址并创建单独的目标 NAT 规则）将 HTTPS 流量发送到路由器后面的服务器或 RouterOS 容器/应用。

:::danger
请注意，默认情况下，反向代理服务使用 HTTPS 端口 443，与默认的 www-ssl 服务端口相同。要使反向代理正常工作，您需要确保 www-ssl 服务已禁用或使用不同的 TCP 端口。（[/ip/service 文档](../../system-information-and-utilities/services.md)
:::

:::info
SMIPS 设备不支持反向代理（hAP lite、hAP lite TC 和 hAP mini）。
:::

### 属性说明 {#property-description}

**子菜单：** `/ip/reverse-proxy`

| 属性 | 说明 |
| :-- | :-- |
| **disabled**（*yes* \| *no*；默认：**yes**） | 反向代理记录是否处于活动状态。 |
| **ip-address**(IPv4/IPv6; 默认：**0.0.0.0** ) | 需要代理连接到的服务器的 IP 地址。 |
| **port**(integer: 0..65535; 默认：**0**) | 服务器的监听端口。 |
| **sni** (string; 默认： ) | 服务器的服务器名称指示（SNI）。 |
| **certificate**(certificate; 默认：**none**) | 特定反向代理实例所使用的[证书](../../authentication-authorization-accounting/certificates.md)名称。设置为 **none** 时，反向代理实例将使用在 `/ip/service` 菜单中设置的反向代理服务证书。 |
| **vrf** (name; 默认：main ) | 要使用的虚拟路由转发（VRF）实例。 |
| **comment**(string; 默认： ) | 项目的描述性名称。 |
