---
title: "代理"
description: "RouterOS 提供两种 Web 代理：Web 代理转发、过滤和缓存网络中客户端的 Web 请求，反向代理使路由器后面的 Web 服务器可通过主机名经 HTTPS 访问。"
tags:
  - 'proxy'
  - 'reverse-proxy'
source: https://manual.mikrotik.com/docs/7.25/network-management/proxy
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

代理接受来自客户端的请求，并代表客户端连接到服务器。RouterOS 有两个用于 Web 流量的代理，它们的工作方向相反：

| Proxy | Menu | Clients | Servers | Use it to |
| :-- | :-- | :-- | :-- | :-- |
| [Web proxy](/docs/network-management/proxy/web-proxy) | `/ip/proxy` | 在你的网络中 | 在互联网上 | 过滤和缓存用户的 Web 请求，或将其发送到另一个代理。 |
| [Reverse proxy](/docs/network-management/proxy/reverse-proxy) | `/ip/reverse-proxy` | 在互联网上 | 路由器后方 | 通过主机名使路由器后方的 Web 服务器可通过 HTTPS 访问。 |

对于 Web 浏览器以外的应用，RouterOS 还在 `/ip/socks` 中提供了 [SOCKS proxy](/docs/network-management/socks)。
