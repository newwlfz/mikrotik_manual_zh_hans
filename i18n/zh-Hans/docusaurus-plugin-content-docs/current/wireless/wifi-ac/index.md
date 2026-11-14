---
sidebar_key: "wireless/wifi-ac"
sidebar_position: 2
title: "Wi-Fi 5（802.11ac）"
sidebar_label: "Wi-Fi 5"
description: "MikroTik 802.11ac（Wi-Fi 5）ARM 设备有两种驱动方式：通过新的 `/interface/wifi` 菜单并使用 `wifi-qcom-ac` 软件包（WPA3、快速漫游、新的 CAPsMAN），或者通过传统的 `/interface/wireless` 菜单并使用 `wireless` 软件包（Nstreme、Nv2、旧版 CAPsMAN）。本页帮助您在两者之间做出选择，并链接到相应的配置参考文档。"
tags:
  - 'wifi'
  - 'wireless'
  - '802-11ac'
source: https://manual.mikrotik.com/docs/wireless/wifi-ac
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本节介绍 MikroTik **802.11ac (Wi-Fi 5)** 的 ARM 架构设备。这些产品比较特殊：**同一硬件可以通过两个 RouterOS 菜单之一进行配置**，具体取决于安装了哪个驱动包。请选择与您所需功能相匹配的那一个。
:::warning
`wifi-qcom-ac` 驱动非常占用资源。我们建议 WiFi 5 (802.11ac) 设备使用其原有的 `wireless` 驱动，因为后者较为轻量。
:::

## 运行 802.11ac 设备的两种方式 {#two-ways-to-run-an-80211ac-device}

| 如果您需要… | 安装包 | 配置位置 | 文档 |
| :-- | :-- | :-- | :-- |
| WPA3、快速漫游 (802.11r)、新的 CAPsMAN | `routeros` + `wifi-qcom-ac` | `/interface/wifi` | [Wi-Fi 6 / 7 (802.11ax/be)](../wifi/index.md) — `/interface/wifi` 菜单是共用的 |
| Nstreme、Nv2、WDS、HWMP+ 网状组网、旧的 CAPsMAN | `routeros` + `wireless` | `/interface/wireless` | [802.11 a/b/g/n](../abgn/index.md) — `/interface/wireless` 菜单是共用的 |

内置射频上不能同时使用这两个包 — 有关如何切换，请参阅[替换 'wireless' 包](../wifi/index.md)。

:::info
新的 `/interface/wifi` 菜单管理 **Wi-Fi 5 wave2 及更新**的接口，因此运行 `wifi-qcom-ac` 的 802.11ac 设备使用的配置，与 [Wi-Fi 6 / 7 (802.11ax/be)](../wifi/index.md) 下记录的 802.11ax/be 设备完全相同。因此本节链接到该参考文档，而不重复其内容。
:::

## 可选择驱动的设备 {#devices-with-a-choice-of-driver}

以下 802.11ac ARM 型号可以运行 `wifi-qcom-ac`（新的 `/interface/wifi` 菜单）或 `wireless`（旧版 `/interface/wireless` 菜单）：

> Audience、Audience LTE kit、Chateau（D53 的所有变体）、hAP ac²、hAP ac³、cAP ac、cAP XL ac、LDF 5 ac、LHG XL 5 ac、LHG XL 52 ac、NetMetal ac²、mANTBox 52 15s、wAP ac (RBwAPG-5HacD2HnD)、SXTsq 5 ac

:::warning
`wifi-qcom-ac` 驱动升级主要面向室内设备。尽管它也可以安装在我们的室外型号（LDF 5 ac、LHG XL 5 ac、LHG XL 52 ac、NetMetal ac²、mANTBox 52 15s、SXTsq 5 ac）上，但 `wifi-qcom-ac` 并非为室外使用而定制。这主要是因为该驱动不支持 **distance** 设置，而超过 2 km 的链路需要此设置。因此，我们建议在所有室外板卡上使用 `wireless` 驱动。
:::

要按设备类型和 CAPsMAN 场景选择软件包，请参阅[无线概览](../index.md)中的决策表。
