---
title: "文档更新 - 2026 年 10 月 14 日"
date: 2026-10-14
slug: /changelog-2026-10-14
source: https://manual.mikrotik.com/changelog/changelog-2026-10-14
captured_at: '2026-11-04T06:09:01+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 10 月 14 日所做的文档变更摘要。

## 系统 {#system}

- **[Device mode](/docs/system-information-and-utilities/device-mode)**：在 RouterOS 7.26beta1 上重写并测试。所有示例与输出均已更新，并验证了其工作机制：通过 reset 或 mode 按钮或重新上电进行确认（普通重启不会完成确认）、模式替换与按功能单独更新、print config 仅显示非默认设置、更新尝试计数器及其重置窗口（activation-timeout），以及已禁用功能的配置会以未激活状态创建。

## CLI 参考 {#cli-reference}

- **[/system/device-mode](/docs/cli-reference/system/device-mode)**、**[/system/device-mode/update](/docs/cli-reference/system/device-mode/update)**：菜单简介和所有参数说明均已补全，包括每个功能开关所控制的工具和菜单（bandwidth-test 下的 speed-test、traffic-gen 下的 ping-speed）以及尝试计数器的重置窗口。
