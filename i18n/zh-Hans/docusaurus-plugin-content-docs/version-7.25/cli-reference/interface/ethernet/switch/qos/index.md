---
sidebar_key: "cli-reference/interface/ethernet/switch/qos/index"
sidebar_position: 1
title: "qos"
sidebar_label: 'qos'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/qos
captured_at: '2026-11-01T21:22:37+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/qos {#interfaceethernetswitchqos}
**系统能力：** rbswitch 和 crs_prestera
**类型：** 目录

整个 QoS 硬件配置位于 `/in/eth/sw/qos` 下。这种集中式方法允许您将所有 QoS 相关配置项存储在一个位置，便于使用 `/in/eth/sw/qos/export` 监控和导出设置。

QoS 条目有两个主要标志指示符：

- **H** - 硬件卸载条目。
- **I** - 非活动条目。
