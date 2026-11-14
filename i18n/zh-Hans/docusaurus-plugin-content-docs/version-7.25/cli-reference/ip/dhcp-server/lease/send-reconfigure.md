---
sidebar_key: "cli-reference/ip/dhcp-server/lease/send-reconfigure"
sidebar_position: 3
title: "send-reconfigure"
sidebar_label: 'send-reconfigure'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dhcp-server/lease/send-reconfigure
captured_at: '2026-11-01T21:23:53+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dhcp-server/lease/send-reconfigure {#ipdhcp-serverleasesend-reconfigure}
**类型:** Command

向该租约的客户端发送 Reconfigure（FORCERENEW）消息，使客户端立即续租。它仅对获得了 reconfigure 密钥的客户端有效，这要求服务器上设置 `use-reconfigure=yes`，并且客户端请求该密钥，例如使用 `allow-reconfigure=yes` 的 RouterOS DHCP 客户端。
