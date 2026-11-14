---
sidebar_key: "storage/tmpfs"
sidebar_position: 12
title: "临时文件系统（Tmpfs）"
sidebar_label: "临时文件系统"
description: "Tmpfs 允许将 RAM 用作文件系统，最大大小可配置，但在重启或断电后会被清除。"
tags:
  - 'storage'
  - 'tmpfs'
source: https://manual.mikrotik.com/docs/7.24/storage/tmpfs
captured_at: '2026-11-04T11:33:20+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info
此功能需要 [存储](./index.md) 软件包。
:::

Tmpfs 允许将一部分 RAM 用作文件系统。它不能用作块设备。

:::warning

tmpfs 在重启或断电后会被清除。

:::

## 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **tmpfs-max-size** | tmpfs 文件系统的最大大小 |

## 配置示例 {#configuration-example}

```ros
add type=tmpfs tmpfs-max-size=10G
```
