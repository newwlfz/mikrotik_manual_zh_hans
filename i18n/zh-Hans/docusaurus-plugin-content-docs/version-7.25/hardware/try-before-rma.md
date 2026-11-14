---
sidebar_key: "hardware/try-before-rma"
sidebar_position: 12
title: "RMA 前试用"
sidebar_label: "RMA 前试用"
description: "一份面向 MikroTik 硬件的 RMA 前诊断检查清单。在提交保修申请之前，先排除常见的电源、启动、连接和 LTE 问题。"
tags:
  - 'hardware'
  - 'troubleshooting'
  - 'rma'
source: https://manual.mikrotik.com/docs/7.25/hardware/try-before-rma
captured_at: '2026-11-04T11:17:32+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

在提交设备进行保修维修（RMA）之前，请先完成以下检查。许多看似硬件问题的故障实际上是由电源、线缆、软件版本或配置引起的 —— 无需寄回设备即可解决。

## 电源与启动 {#power-and-boot}

| 现象 | 可尝试的操作 |
| :-- | :-- |
| 设备无法开机 | 换用其他兼容的电源和/或 PoE 注入器。 |
| 设备无法启动 | 加载备份 RouterBOOT：按住 **Reset** 按钮，给设备上电，并继续按住 **Reset** 2–3 秒。如果设备能够启动，请使用 `/system/routerboard/upgrade` 升级 bootloader。如果仍然失败，请使用 [网络安装](../getting-started/installation-and-upgrade/netinstall/index.md) 重新安装。 |
| 设备在负载下重启 | 尝试更换电源。将 RouterOS 升级到最新的 Stable 版本。使用 `/system/reset-configuration` 重置配置。 |
| 设备在无负载时重启 | 将 RouterOS 升级到最新的 Stable 版本。使用 `/system/reset-configuration` 重置配置。 |

## 以太网与 SFP {#ethernet-and-sfp}

| 现象 | 可尝试的操作 |
| :-- | :-- |
| 无法连接到设备 | 尝试其他端口 —— 你可能正在使用默认配置中的 WAN 端口。确认网线和端口没有物理损坏。 |
| 无法进行 [网络安装](../getting-started/installation-and-upgrade/netinstall/index.md) | 确保使用直连以太网、处于同一子网，并已禁用防火墙。尝试在 PC 与设备之间接入一台交换机。详情请参阅 [Netinstall 指南](../getting-started/installation-and-upgrade/netinstall/netinstall-windows.md)。 |
| 以太网端口无法建立链路 | 尝试更换网线。如果使用 PoE-in 供电，请尝试更换 PoE 注入器。 |
| SFP / SFP+ / QSFP 端口无法建立链路或吞吐量低 | 确保链路两端兼容。使用正确的光纤类型（单模或多模）。确认所用 SFP 模块受支持。 |

## LTE {#lte}

| 现象 | 可尝试的操作 |
| :-- | :-- |
| 无法识别 SIM 卡 | 尝试更换 SIM 卡。检查卡片方向，并确保其已完全插入或卡入插槽。 |
| LTE 无法连接 | 确认 APN 正确。查阅服务提供商的文档以获取所需的 APN 值。 |
| LTE 已连接但无数据传输 | 确认 APN 正确。确保路由和防火墙规则允许流量通过。 |
| 缺少 LTE 接口 | 确认设备为 LTE Kit 型号，且调制解调器已实际安装。 |
| 无法识别 LTE 调制解调器 | 安装最新的 RouterOS Stable 版本。 |

## 其他 {#other}

| 现象 | 可尝试的操作 |
| :-- | :-- |
| LED 不亮 | 安装最新的 RouterOS Stable 版本并应用默认配置。 |
| 外壳弯曲或损坏 | 检查包装是否有损坏。运输损坏应向承运公司报备。 |

:::info
如果上述步骤均未能解决问题，请联系 [MikroTik 支持](https://mikrotik.com/support)，并提供问题描述和[支持输出文件（`supout.rif`）](../getting-started/supout-rif.md)。
:::
