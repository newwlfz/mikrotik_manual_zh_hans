---
sidebar_key: "hardware/s-plus-rj10-general-guidance"
sidebar_position: 11
title: "S+RJ10 通用指南"
sidebar_label: "S+RJ10 通用指南"
description: "S+RJ10 是一款 MikroTik 6 速 RJ45 SFP+ 模块，可通过铜缆提供 10 Gbps 速率，并附有关于其在 MikroTik 设备中使用方式的指导，包括在与光模块同时使用或在高密度 SFP+ 插槽中使用时防止过热的推荐安装位置。"
tags:
  - 's-rj10'
  - 'transceiver-cooling'
source: https://manual.mikrotik.com/docs/7.24/hardware/s-plus-rj10-general-guidance
captured_at: '2026-11-04T11:31:59+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### 概述 {#summary}

[MikroTik S+RJ10](https://mikrotik.com/product/s_rj10) 是一款独特的 6 速 RJ-45 SFP+ 模块，基于 Marvell 88X3310P 收发器。它使用双绞铜缆可提供高达 10 Gbps 的速度。当前所有带有 SFP+ 插槽的 MikroTik 设备均支持 S+RJ10 模块。本文为在具有被动散热和主动散热的 MikroTik 设备中使用 S+RJ10 提供指导。

### 通用指导 {#general-guidance}

#### 产品规格 {#product-specification}

该收发器的平均功耗为 2.7 W（10GBASE-T，30 m 链路），与最大功耗为 0.8W 的 [S+85DLC03D](https://mikrotik.com/product/Splus85DLC03D) 光模块相比相对较高。工作温度为 0 至 +70 C，但收发器本身可能升温至 90 C。

#### S+RJ10 在设备中的位置 {#srj10-positioning-in-devices}

由于工作温度较高，建议在使用 S+RJ10 收发器时，在它们之间放置一个光收发器或未使用的 SFP+ 接口。请查看收发器可支持距离的[比较表](../wired-connections/mikrotik-wired-interface-compatibility.md#srj10)。

如前所述，S+RJ10 比普通收发器发热更严重，将它们并排放置可能导致过热，尤其是在具有 4 个线性 SFP 插槽的设备中。建议每隔一个接口放置一个 S+RJ10，并在它们之间保留一个光收发器或空端口。

![](/img/c4b6662ea4dfd009.webp)

即使使用带有独立 SFP+ 插槽的设备（例如 CRS309-1G-8S+），仍然不建议将 S+RJ10 收发器并排放置。每隔一个接口使用 S+RJ10，以避免收发器过热，过热可能导致不可预测的行为。

![](/img/2d992e1b7e676ab7.webp)推荐的 S+RJ10 放置方式![](/img/a6b05df0baa08711.webp)不建议将收发器并排放置

带有 4 个或 8 个一组 SFP+ 插槽的设备也不例外。建议每个 4xSFP+ 插槽组使用一个 S+RJ10 收发器，并避免将它们并排放置。插入 S+RJ10 收发器后，至少保留一个垂直行空置（不含 S+RJ10）。

![](/img/ed806fb16ee9ffe7.webp)推荐的 S+RJ10 放置方式![](/img/2bbeed8af60d549a.webp)不建议将收发器并排放置

### 并排使用 S+RJ10 或搭配被动散热设备使用 {#using-the-srj10-side-by-side-or-with-passive-cooling-devices}

在某些情况下，可能无法采用推荐的收发器布局。在两个或更多 S+RJ10 收发器彼此相邻插入，或在被动散热设备中使用这些模块的情况下，网络管理员必须确保提供额外散热。应增加设备周围的气流，或降低整体环境温度，以使收发器温度保持在推荐范围内。
