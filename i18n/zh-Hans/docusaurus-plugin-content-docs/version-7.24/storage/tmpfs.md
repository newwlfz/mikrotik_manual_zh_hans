---
title: "Tmpfs"
description: "Tmpfs 允许将 RAM 用作文件系统，可配置最大大小，但会在重启或断电时清除。"
tags:
  - 'storage'
  - 'tmpfs'
source: https://manual.mikrotik.com/docs/7.24/storage/tmpfs
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "containers"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

:::info
此功能需要 [Storage](/docs/storage) 软件包。
:::

Tmpfs 允许将部分 RAM 用作文件系统。它不能用作块设备。

:::warning

tmpfs 会在重启或断电时清除。
:::

## 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **tmpfs-max-size** | tmpfs 文件系统的最大大小 |

## 配置示例 {#configuration-example}

```ros
add type=tmpfs tmpfs-max-size=10G
```
