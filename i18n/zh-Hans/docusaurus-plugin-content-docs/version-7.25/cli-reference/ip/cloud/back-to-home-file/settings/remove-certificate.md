---
title: "remove-certificate"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/cloud/back-to-home-file/settings/remove-certificate
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/ip/cloud/back-to-home-file/settings"
pagination_next: "cli-reference/ip/cloud/back-to-home-user"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/cloud/back-to-home-file/settings/remove-certificate 
**Syscap：** cloud-vpn
**类型：** Command

从 `/certificate` 删除 File Share 证书。仅当不存在共享时该命令才有效；否则会失败并返回 `cannot remove certificate while file shares active`。下一次共享会请求新证书。请参阅 [停止 File Share](/docs/network-management/cloud/file-share#stop-file-share)。
