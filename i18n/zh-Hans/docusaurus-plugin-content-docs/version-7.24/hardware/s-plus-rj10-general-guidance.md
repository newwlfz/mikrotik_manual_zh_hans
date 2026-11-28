---
title: "S+RJ10 通用指南"
description: "S+RJ10 是 MikroTik 的 6 速 RJ45 SFP+ 模块，可通过铜缆提供 10 Gbps 速率，本文说明其在 MikroTik 设备中的使用，包括与光模块一起使用或在密集 SFP+ 笼中使用时的建议安装位置，以防止过热。"
tags:
  - 's-rj10'
  - 'transceiver-cooling'
source: https://manual.mikrotik.com/docs/7.24/hardware/s-plus-rj10-general-guidance
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 摘要 {#summary}

[MikroTik S+RJ10](https://mikrotik.com/product/s_rj10) 是一款独特的 6 速 RJ-45 SFP+ 模块，基于 Marvell 88X3310P 收发器。它使用双绞线铜缆可提供最高 10 Gbps 的速率。当前所有带 SFP+ 插槽的 MikroTik 设备均支持 S+RJ10 模块。本文作为在 MikroTik 设备中使用 S+RJ10 的指南，涵盖被动散热和主动散热场景。

### 通用指南 {#general-guidance}

#### 产品规格 {#product-specification}

该收发器的平均功耗为 2.7 W（10GBASE-T，30 m 链路），与最大功耗为 0.8W 的 [S+85DLC03D](https://mikrotik.com/product/Splus85DLC03D) 光模块相比相对较高。工作温度为 0 至 +70 C，但收发器本身可升温至 90 C。

#### 设备中的 S+RJ10 位置 {#srj10-positioning-in-devices}

由于工作温度较高，建议在使用 S+RJ10 收发器时，在它们之间放置光收发器或未使用的 SFP+ 接口。请查看收发器支持距离的[对比表](/docs/wired-connections/mikrotik-wired-interface-compatibility#srj10)。

如上所述，S+RJ10 比普通收发器发热更多，并排放置可能导致过热，尤其是在具有 4 个线性 SFP 插槽的设备中。建议每隔一个接口放置一个 S+RJ10，并在它们之间保留光收发器或空端口。

![](/img/c4b6662ea4dfd009.webp)

即使使用带有独立 SFP+ 笼的设备，例如 CRS309-1G-8S+，也不建议将 S+RJ10 收发器并排部署。每隔一个接口使用 S+RJ10，以避免收发器过热，过热可能导致不可预测的行为。

![](/img/2d992e1b7e676ab7.webp)Recommended S+RJ10 placement![](/img/a6b05df0baa08711.webp)It is not recommended to place transceivers side by side

带有 4 或 8 个成组 SFP+ 笼的设备也不例外。建议每个 4xSFP+ 笼组使用一个 S+RJ10 收发器，并避免并排放置。插入 S+RJ10 收发器后，至少保留一行垂直位置为空（不插入 S+RJ10）。

![](/img/ed806fb16ee9ffe7.webp)Recommended S+RJ10 placement![](/img/2bbeed8af60d549a.webp)We do not recommend placing transceivers side by side

### 并排使用 S+RJ10 或配合被动散热设备 {#using-the-srj10-side-by-side-or-with-passive-cooling-devices}

在某些情况下，可能无法采用推荐的收发器布局。如果两个或更多 S+RJ10 收发器并排插入，或者模块用于被动散热设备，网络管理员必须确保额外散热。应增加设备周围的气流，或降低整体环境温度，使收发器温度保持在推荐范围内。
