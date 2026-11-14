---
sidebar_key: "cli-reference/ipv6/dhcp-server/binding/send-reconfigure"
sidebar_position: 2
title: "send-reconfigure"
sidebar_label: 'send-reconfigure'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ipv6/dhcp-server/binding/send-reconfigure
captured_at: '2026-11-01T21:24:36+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/dhcp-server/binding/send-reconfigure {#ipv6dhcp-serverbindingsend-reconfigure}
**类型：** 命令

向该绑定的客户端发送一条 Reconfigure 消息，使客户端立即进行续约。要求服务器上设置 `use-reconfigure=yes`，并且客户端接受 Reconfigure 消息，例如启用了 `allow-reconfigure=yes` 的 RouterOS DHCPv6 客户端。
