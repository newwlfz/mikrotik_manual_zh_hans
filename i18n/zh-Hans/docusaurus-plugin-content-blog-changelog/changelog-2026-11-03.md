---
title: "文档更新 - 2026年11月3日"
date: 2026-11-03T00:00:00.000Z
slug: /changelog-2026-11-03
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

# 文档更新 - 2026年11月3日 {#documentation-updates---november-3-2026}

November 3, 2026

2026年11月3日文档变更摘要。

## 无线[​](#wireless "Direct link to Wireless") {#wireless}

-   **[配置 EasyMesh](/docs/wireless/wifi/configuring-easymesh)**：Wi-Fi EasyMesh 的新指南，Wi-Fi EasyMesh 是 Wi-Fi Alliance 针对多 AP 网络的标准，可在 `wifi-qcom` 和 `wifi-qcom-ac` 上的 CLI 中使用。它解释了控制器、代理和控制器兼代理角色以及前传和回传网络，然后逐步介绍控制器和代理配置、通过有线回传或通过无线回传使用 WPS 按钮进行入网、`topology`、`bss` 和 `sta` 状态表以及故障排除。[Wi-Fi](/docs/wireless/wifi#wifi-easymesh) 页面链接到该指南，并将 `easymesh` 列为 `manager` 值。

## 桥接与交换[​](#bridging--switching "Direct link to Bridging & Switching") {#bridging--switching}

-   **[桥接与交换](/docs/bridging-and-switching#arp-inspection-and-ip-source-guard)**：IP Source Guard 会在不受信任的端口上阻止 MAC Telnet、MAC WinBox 和 MAC ping，因为这些数据包携带源地址 `0.0.0.0`，且不匹配任何 DHCP snooping 绑定。新的警告和 `ip-source-guard` 描述说明了这一点，[MAC server](/docs/management-tools/mac-server) 页面也提到了这一点。
-   **[L3 硬件卸载](/docs/bridging-and-switching/l3-hardware-offloading#crs3xx-switch-98dx3xxx-and-98dx2xxx-series)**：CRS3xx 98DX3xxx 和 98DX2xxx 章节将 VRRP 卸载列为这些交换机芯片缺少的功能之一，现在以警告形式显示。

## 容器[​](#containers "Direct link to Containers") {#containers}

-   **[Apps](/docs/containers/apps)**：`auto-update` 描述指出，自动更新会在设备重启时触发。

**Tags:**

-   [文档变更日志](/changelog/tags/changelog "文档更新的每日摘要")
