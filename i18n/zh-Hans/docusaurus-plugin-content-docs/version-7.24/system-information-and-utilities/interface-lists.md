---
title: "接口列表"
description: "RouterOS 中的接口列表允许定义接口集合，以便在各种配置中简化管理。主菜单列出预定义和自定义接口列表，member 子菜单用于处理静态配置的成员。动态接口会根据标志自动加入或排除，网桥需要谨慎处理，以避免出现意外行为。"
tags:
  - 'interface-lists'
  - 'firewall'
  - 'bridging'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/interface-lists
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

允许定义一组接口，以便在基于接口的不同配置部分（例如 Neighbor Discovery、Firewall、Bridge 和 Internet Detect）中更轻松地管理接口。

## Lists

**子菜单：** `/interface/list`

此菜单包含路由器上所有可用接口列表的信息。共有四个预定义列表：`all`（包含所有接口）、`none`（不包含任何接口）、`dynamic`（包含动态接口）和 `static`（包含静态接口）。也可以创建其他接口列表。

:::info
动态接口是带有“dynamic”标志的接口。任何没有 dynamic 标志的接口都属于 `static` 接口列表。
:::

| 属性 | 描述 |
| :-- | :-- |
| **name**（*string*） | 接口列表的名称 |
| **include**（*string*） | 定义其成员被包含在该列表中的接口列表。可以添加多个列表，以逗号分隔 |
| **exclude**（*string*） | 定义其成员从该列表中排除的接口列表。可以添加多个列表，以逗号分隔 |

成员按以下顺序添加到接口列表：

1. 将 include 成员添加到接口列表。
2. 从列表中移除 exclude 成员。
3. 将静态配置的成员添加到列表。

## Members

**子菜单：** `/interface/list/member`

此子菜单包含有关每个接口列表中静态配置的接口成员的信息。请注意，通过 include 和 exclude 语句动态添加的接口不会显示在此子菜单中。

| 属性 | 说明 |
| :-- | :-- |
| **interface** (*string*) | 接口名称 |
| **list** (*string*) | 接口列表名称 |

:::info
处理网桥和列表时必须谨慎。将网桥添加为成员与添加其所有端口并不相同！将所有从属端口添加为成员与添加网桥本身也不相同。这尤其可能影响邻居发现功能。
:::
