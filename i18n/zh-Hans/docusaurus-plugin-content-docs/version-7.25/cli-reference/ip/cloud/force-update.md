---
sidebar_key: "cli-reference/ip/cloud/force-update"
sidebar_position: 4
title: "force-update"
sidebar_label: 'force-update'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/cloud/force-update
captured_at: '2026-11-01T21:23:48+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/cloud/force-update {#ipcloudforce-update}
**类型：**命令

立即向云服务器发送 DDNS 更新，例如在互联网连接发生变化之后。当 DDNS 关闭时（`ddns-enabled=auto` 且未启用 Back To Home（远程回家）），它不会执行任何操作，也不会设置时钟。
