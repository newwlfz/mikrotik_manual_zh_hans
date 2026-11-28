---
title: "force-update"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/cloud/force-update
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/ip/dhcp-client"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/cloud/force-update 
**类型：** 命令

立即向云服务器发送 DDNS 更新，例如在互联网连接发生变化后。当 DDNS 关闭时（`ddns-enabled=auto` 且没有 Back To Home（远程回家）），该操作不会执行任何操作，也不会设置时钟。
