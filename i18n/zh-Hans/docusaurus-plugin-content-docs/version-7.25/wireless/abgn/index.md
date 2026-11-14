---
sidebar_key: "wireless/abgn/index"
sidebar_position: 4
title: "802.11 a/b/g/n"
sidebar_label: "802.11 a/b/g/n"
description: "MikroTik 802.11 a/b/g/n 设备使用由 wireless package 提供的传统 `/interface/wireless` 菜单。本节涵盖无线接口、MikroTik 专有协议（Nstreme、Nv2）、HWMP+ mesh、interworking profiles、spectral scan、`/caps-man` CAPsMAN 控制器以及相关案例研究。"
tags:
  - 'wireless'
  - '802-11abgn'
  - 'nstreme'
source: https://manual.mikrotik.com/docs/7.25/wireless/abgn
captured_at: '2026-11-04T11:23:36+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本节涵盖 MikroTik **802.11 a/b/g/n** 设备（以及任何运行 `wireless` 软件包的 802.11ac 设备），通过 **`/interface/wireless`** 菜单（即 **`wireless`** 驱动程序包）进行配置——这是基于 MIPS 的设备上唯一可用的选项。

该菜单也是 MikroTik 专有的、面向吞吐量的功能所在之处——**Nstreme** 和 **Nv2**（TDMA）、**WDS** 以及 **HWMP+ mesh**——此外还有原有的 **[CAPsMAN](./capsman/ap-controller-capsman.md)**（`/caps-man`）控制器。

:::info
部分 802.11ac 设备可以通过 `wifi-qcom-ac` 软件包改用新的 `/interface/wifi` 菜单——请参阅 [Wi-Fi 5 (802.11ac)](../wifi-ac/index.md) 进行选择。WPA3 和快速漫游只能通过新菜单使用。
:::

<DocCardList />
