---
sidebar_key: "cli-reference/ip/cloud/back-to-home-file/settings/remove-certificate"
sidebar_position: 1
title: "remove-certificate"
sidebar_label: 'remove-certificate'
source: https://manual.mikrotik.com/docs/cli-reference/ip/cloud/back-to-home-file/settings/remove-certificate
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/cloud/back-to-home-file/settings/remove-certificate {#ipcloudback-to-home-filesettingsremove-certificate}
**系统能力：** cloud-vpn
**类型：** 命令

从 `/certificate` 中删除文件共享证书。仅当不存在共享时该命令才有效；否则会失败并显示 `cannot remove certificate while file shares active`。下一次创建共享时会请求新证书。参见[停止文件共享](../../../../../network-management/cloud/file-share.md#stop-file-share)。
