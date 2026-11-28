---
title: "qos"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/qos
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## interface/ethernet/switch/qos 
**Syscap：** rbswitch 和 crs_prestera
**Type：** Directory

整个 QoS 硬件配置位于 `/in/eth/sw/qos` 下。这种集中式方法可让你将所有 QoS 相关配置项存储在一个位置，便于使用 `/in/eth/sw/qos/export` 监控和导出设置。

QoS 条目有两个主要标志指示符：

- **H** - 硬件卸载条目。
- **I** - 非活动条目。
