---
title: "文档更新 - 2026年7月6日"
date: 2026-07-06
slug: /changelog-2026-07-06
source: https://manual.mikrotik.com/changelog/changelog-2026-07-06
captured_at: '2026-11-04T06:08:09+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026年7月6日所做的文档变更摘要。

## 桥接与交换 {#bridging--switching}

- **[Bridge](/docs/bridging-and-switching)**：记录了 STP/MSTP 优先级字段的有效值步进规则。Bridge 和 MSTI 优先级必须以 4096（0x1000）为步长设置——最低的 12 位会被忽略——并给出了完整的有效十六进制/十进制值列表；bridge port 和 MST-override port 优先级必须以 16（0x10）为步长设置，并且现在使用显式的 0x00–0xf0 值集合。此外还修复了在迁移过程中损坏的 port-cost-mode path-cost 参考表，将其呈现为同时包含 Long 和 Short 两列的正确可折叠表格。
- **[Spanning Tree Protocol](/docs/bridging-and-switching/user-guides/spanning-tree-protocol)**：将相同的优先级步进规则和有效值细节应用到了 CIST/MSTI/端口优先级的说明中。

## 系统 {#system}

- **[Neighbor discovery](/docs/system-information-and-utilities/neighbor-discovery)**：新增了 "LLDP neighbors" 一节，记录了只读的 /ip/neighbor/lldp 菜单，该菜单仅针对通过 LLDP 发现的邻居显示详细的 LLDP TLV（chassis ID、port ID、system name/description），并附有示例输出，以及一条说明：lldpRemTable SNMP 表会排除仅由 CDP/MNDP 发现的条目。
