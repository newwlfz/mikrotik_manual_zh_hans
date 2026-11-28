---
title: "Wi-Fi 5 (802.11ac)"
description: "MikroTik 802.11ac（Wi-Fi 5）ARM 设备可通过两种方式驱动：使用 wifi-qcom-ac 软件包通过新的 /interface/wifi 菜单配置（WPA3、快速漫游、新 CAPsMAN），或使用 wireless 软件包通过旧版 /interface/wireless 菜单配置（Nstreme、Nv2、旧 CAPsMAN）。本页可帮助你在两种方式之间做出选择，并提供相应配置参考的链接。"
tags:
  - 'wifi'
  - 'wireless'
  - '802-11ac'
source: https://manual.mikrotik.com/docs/7.24/wireless/wifi-ac
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

本节介绍基于 ARM 的 MikroTik **802.11ac（Wi-Fi 5）** 设备。这些产品较为特殊：**同一硬件可通过两个 RouterOS 菜单中的任意一个进行配置**，具体取决于安装的驱动软件包。请选择与所需功能匹配的方案。
:::warning
`wifi-qcom-ac` 驱动占用资源非常多。建议将 WiFi 5（802.11ac）设备与其原始 `wireless` 驱动配合使用，因为该驱动更轻量。
:::

## 运行 802.11ac 设备的两种方式 {#two-ways-to-run-an-80211ac-device}

| 如果需要…… | 安装软件包 | 配置位置 | 文档 |
| :-- | :-- | :-- | :-- |
| WPA3、快速漫游（802.11r）、新版 CAPsMAN | `routeros` + `wifi-qcom-ac` | `/interface/wifi` | [Wi-Fi 6 / 7（802.11ax/be）](/docs/wireless/wifi) — `/interface/wifi` 菜单为共用菜单 |
| Nstreme、Nv2、WDS、HWMP+ mesh、旧版 CAPsMAN | `routeros` + `wireless` | `/interface/wireless` | [802.11 a/b/g/n](/docs/wireless/abgn) — `/interface/wireless` 菜单为共用菜单 |

内置 radio 不能同时使用这两个软件包 — 切换方法请参阅[替换“wireless”软件包](/docs/wireless/wifi)。

:::info
新版 `/interface/wifi` 菜单管理 **Wi-Fi 5 wave2 及更新**接口，因此运行 `wifi-qcom-ac` 的 802.11ac 设备与 [Wi-Fi 6 / 7（802.11ax/be）](/docs/wireless/wifi) 下记录的 802.11ax/be 设备使用完全相同的配置。因此，本节链接到该参考文档，而不重复其内容。
:::

## 可选择驱动的设备 {#devices-with-a-choice-of-driver}

以下 802.11ac ARM 型号可运行 `wifi-qcom-ac`（新版 `/interface/wifi` 菜单）或 `wireless`（旧版 `/interface/wireless` 菜单）：

> Audience、Audience LTE kit、Chateau（D53 的所有型号）、hAP ac²、hAP ac³、cAP ac、cAP XL ac、LDF 5 ac、LHG XL 5 ac、LHG XL 52 ac、NetMetal ac²、mANTBox 52 15s、wAP ac（RBwAPG-5HacD2HnD）、SXTsq 5 ac

要根据设备类型和 CAPsMAN 场景选择软件包，请参阅 [Wireless overview](/docs) 中的决策表。
