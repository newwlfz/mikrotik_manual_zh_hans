---
sidebar_key: "network-management/proxy/index"
sidebar_position: 2
title: "代理"
sidebar_label: "代理"
description: "RouterOS 有两种 Web 代理：Web 代理会转发、过滤并缓存网络中客户端的 Web 请求，而反向代理则使路由器后方的 Web 服务器能够通过主机名经 HTTPS 访问。"
tags:
  - 'proxy'
  - 'reverse-proxy'
source: https://manual.mikrotik.com/docs/7.25/network-management/proxy
captured_at: '2026-11-04T11:21:09+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

代理接受来自客户端的请求，并代表客户端连接到服务器。RouterOS 有两种用于 Web 流量的代理，它们的工作方向相反：

| 代理 | 菜单 | 客户端 | 服务器 | 用途 |
| :-- | :-- | :-- | :-- | :-- |
| [Web 代理](./web-proxy.md) | `/ip/proxy` | 位于你的网络中 | 位于互联网上 | 过滤并缓存用户的 Web 请求，或将其转发到另一个代理。 |
| [反向代理](./reverse-proxy.md) | `/ip/reverse-proxy` | 位于互联网上 | 位于路由器后方 | 使路由器后方的 Web 服务器可通过主机名以 HTTPS 访问。 |

对于 Web 浏览器以外的应用程序，RouterOS 还在 `/ip/socks` 中提供了 [SOCKS 代理](../socks/index.md)。
