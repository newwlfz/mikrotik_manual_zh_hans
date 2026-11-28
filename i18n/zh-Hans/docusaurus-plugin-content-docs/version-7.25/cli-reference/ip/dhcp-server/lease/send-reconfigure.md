---
title: "send-reconfigure"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dhcp-server/lease/send-reconfigure
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/dhcp-server/lease/send-reconfigure 
**类型：** 命令

向租约的客户端发送 Reconfigure（FORCERENEW）消息，使客户端立即续租。该功能仅适用于已获取 reconfigure key 的客户端，这要求服务器上配置 `use-reconfigure=yes`，并且客户端请求该 key，例如配置了 `allow-reconfigure=yes` 的 RouterOS DHCP 客户端。
