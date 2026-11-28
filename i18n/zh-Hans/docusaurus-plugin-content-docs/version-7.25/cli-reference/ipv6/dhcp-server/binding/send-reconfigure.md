---
title: "send-reconfigure"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ipv6/dhcp-server/binding/send-reconfigure
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/ipv6/dhcp-server/option"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ipv6/dhcp-server/binding/send-reconfigure 
**类型：** 命令

向绑定的客户端发送 Reconfigure 消息，使客户端立即续租。要求服务器上设置 `use-reconfigure=yes`，并且客户端接受 Reconfigure 消息，例如设置了 `allow-reconfigure=yes` 的 RouterOS DHCPv6 客户端。
