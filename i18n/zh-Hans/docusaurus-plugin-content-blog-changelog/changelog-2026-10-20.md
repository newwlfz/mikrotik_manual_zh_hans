---
title: "文档更新 - 2026年10月20日"
date: 2026-10-20
slug: /changelog-2026-10-20
source: https://manual.mikrotik.com/changelog/changelog-2026-10-20
captured_at: '2026-11-04T06:09:05+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 10 月 20 日所做的文档变更摘要。

## 管理工具 {#management-tools}

- **[CMR](/docs/management-tools/cmr)**：已对照 CMR 服务器检查了设备选择、仪表板和 WiFi 日志示例。[/cmr/device/dashboard](/docs/cli-reference/cmr/device/dashboard) 和 [/cmr/device/wifi-logs](/docs/cli-reference/cmr/device/wifi-logs) 命令接受 labels，并且 labels 会将 WiFi 日志条目限制为所选设备。设备列表过滤器示例对 labels 使用 ~，因为 labels= 只匹配整个标签列表。layout 链接输出示例已重新排版。CLI 应用流量视图会显示流量计数器，并且 place-before 说明已恢复，因为测试表明该参数仍会将规则添加到末尾。在通过 CMR 升级的设备群上重新检查：处于最新状态或离线的受覆盖设备会在任何升级发生之前停止 fail-policy=stop 作业；升级和重启日志消息来自新的 Example rules 部分；rebooted 也会在 upgrade 和 reboot 命令重启时触发；WiFi 日志监视器具有 clients 视图；脚本中使用 labels 的 as-value 已被记录。
