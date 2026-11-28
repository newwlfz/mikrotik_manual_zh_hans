---
title: "802.11 a/b/g/n"
description: "MikroTik 802.11 a/b/g/n 设备使用由 wireless 软件包提供的 /interface/wireless 菜单。本节介绍无线接口、MikroTik 专有协议（Nstreme、Nv2）、HWMP+ mesh、互操作配置文件、频谱扫描、/caps-man CAPsMAN 控制器以及相关案例研究。"
tags:
  - 'wireless'
  - '802-11abgn'
  - 'nstreme'
source: https://manual.mikrotik.com/docs/7.24/wireless/abgn
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

本节介绍通过 **`/interface/wireless`** 菜单（**`wireless`** 驱动软件包）配置的 MikroTik **802.11 a/b/g/n** 设备（以及运行 `wireless` 软件包的任何 802.11ac 设备）——这是基于 MIPS 的设备上唯一的选择。

此菜单还包含 MikroTik 特有的、面向吞吐量的功能——**Nstreme** 和 **Nv2**（TDMA）、**WDS** 以及 **HWMP+ mesh**——以及原有的 **[CAPsMAN](/docs/wireless/abgn/capsman/ap-controller-capsman)**（`/caps-man`）控制器。

:::info
部分 802.11ac 设备可以改为通过 `wifi-qcom-ac` 软件包运行新的 `/interface/wifi` 菜单——请参阅 [Wi-Fi 5 (802.11ac)](/docs/wireless/wifi-ac) 进行选择。WPA3 和快速漫游仅可通过新菜单使用。
:::

<DocCardList />
