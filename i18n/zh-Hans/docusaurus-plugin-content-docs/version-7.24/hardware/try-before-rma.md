---
title: "RMA 前先行测试"
description: "MikroTik 硬件的 RMA 前诊断检查清单。在提交保修请求前，排除常见的电源、启动、连接和 LTE 问题。"
tags:
  - 'hardware'
  - 'troubleshooting'
  - 'rma'
source: https://manual.mikrotik.com/docs/7.24/hardware/try-before-rma
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

在提交设备进行保修维修（RMA）之前，请完成以下检查。许多看似硬件问题的故障由电源、线缆、软件版本或配置引起，并且无需送回设备即可解决。

## 电源和启动 {#power-and-boot}

| 症状 | 尝试方法 |
| :-- | :-- |
| 设备不加电 | 使用其他兼容电源和/或 PoE 注入器。 |
| 设备不启动 | 加载备份 RouterBOOT：按住 **Reset** 按钮，给设备上电，继续按住 **Reset** 2–3 秒。如果设备启动，请使用 `/system/routerboard/upgrade` 升级引导加载程序。如果仍无法启动，请使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 重新安装。 |
| 设备在高负载下重启 | 尝试其他电源。将 RouterOS 升级到最新 Stable 版本。使用 `/system/reset-configuration` 重置配置。 |
| 设备在无负载时重启 | 将 RouterOS 升级到最新 Stable 版本。使用 `/system/reset-configuration` 重置配置。 |

## 以太网和 SFP {#ethernet-and-sfp}

| 症状 | 尝试方法 |
| :-- | :-- |
| 无法连接到设备 | 尝试其他端口——你可能正在使用默认配置中的 WAN 端口。确认线缆和端口没有物理损坏。 |
| 无法 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) | 确保存在直连以太网连接、位于同一子网，并且已禁用防火墙。尝试在 PC 和设备之间放置一台交换机。详情请参阅 [Netinstall 指南](/docs/getting-started/installation-and-upgrade/netinstall/netinstall-windows)。 |
| 以太网端口未建立链路 | 尝试其他以太网线缆。如果使用 PoE-in，请尝试其他 PoE 注入器。 |
| SFP / SFP+ / QSFP 端口未建立链路或吞吐量低 | 确保链路两端兼容。使用正确的光缆类型（单模或多模）。确认 SFP 模块受支持。 |

## LTE

| 症状 | 尝试方法 |
| :-- | :-- |
| 无法识别 SIM 卡 | 尝试其他 SIM 卡。检查卡的插入方向，并确保其完全插入插槽或卡入到位。 |
| LTE 无法连接 | 确认 APN 正确。请查阅服务提供商文档，了解所需的 APN 值。 |
| LTE 已连接但无数据传输 | 确认 APN 正确。确保路由和防火墙规则允许流量通过。 |
| 缺少 LTE 接口 | 确认设备是 LTE Kit 型号，并且已物理安装调制解调器。 |
| 无法识别 LTE 调制解调器 | 安装最新 RouterOS Stable 版本。 |

## Other

| 症状 | 尝试方法 |
| :-- | :-- |
| LED 不工作 | 安装最新 RouterOS Stable 版本并应用默认配置。 |
| 外壳弯曲或损坏 | 检查包装是否损坏。运输损坏应向承运公司报告。 |

:::info
如果以上步骤均无法解决问题，请联系 [MikroTik 支持](https://mikrotik.com/support)，并提供问题描述和 [支持输出文件（`supout.rif`）](/docs/diagnostics-monitoring-and-troubleshooting/resource)。
:::
