---
sidebar_key: "system-information-and-utilities/interface-lists"
sidebar_position: 7
title: "接口列表"
sidebar_label: "接口列表"
description: "RouterOS 中的 Interface Lists 允许定义接口集合，以便在各种配置中简化管理。主菜单列出预定义和自定义的 Interface Lists，而 member 子菜单处理静态配置的成员。动态接口会根据 flags 自动包含或排除，bridge 需要谨慎处理以避免意外行为。"
tags:
  - 'interface-lists'
  - 'firewall'
  - 'bridging'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/interface-lists
captured_at: '2026-11-07T17:11:03.548Z'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

允许定义一组接口，以便在 Neighbor Discovery、Firewall、Bridge 和 Internet Detect 等不同的基于接口的配置部分中更轻松地进行接口管理。

## 列表 {#lists}

**子菜单：** `/interface/list`

此菜单包含有关路由器上所有可用接口列表的信息。有四个预定义列表 - `all`（包含所有接口）、`none`（不包含任何接口）、`dynamic`（包含动态接口）和 `static`（包含静态接口）。也可以创建其他接口列表。

:::info
动态接口是指带有 `dynamic` 标志的接口。任何不带 dynamic 标志的接口都将属于 `static` 接口列表。
:::

| 属性 | 描述 |
| :-- | :-- |
| **name** (*string*) | 接口列表的名称 |
| **include** (*string*) | 定义其成员被包含在该列表中的接口列表。可以添加多个列表，以逗号分隔 |
| **exclude** (*string*) | 定义其成员被排除在该列表之外的接口列表。可以添加多个列表，以逗号分隔 |

成员按以下顺序添加到接口列表：

1. 将 Include 成员添加到接口列表。
2. 从列表中移除 Exclude 成员。
3. 将静态配置的成员添加到列表中。

## 成员 {#members}

**子菜单：** `/interface/list/member`

此子菜单包含有关每个接口列表中静态配置的接口成员的信息。请注意，通过 include 和 exclude 语句动态添加的接口不会显示在此子菜单中。

| 属性 | 描述 |
| :-- | :-- |
| **interface** (*string*) | 接口的名称 |
| **list** (*string*) | 接口列表的名称 |

:::info
在使用网桥和列表时需要格外小心。将网桥添加为成员并不等同于添加它的所有端口！而将所有从属端口添加为成员也不等同于添加网桥本身。这尤其会影响邻居发现的功能。
:::
