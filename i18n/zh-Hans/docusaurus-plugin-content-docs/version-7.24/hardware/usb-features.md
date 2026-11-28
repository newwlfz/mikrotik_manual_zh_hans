---
title: "USB 功能"
description: "本页介绍 MikroTik RouterOS 中的 USB 功能，包括可配置持续时间和总线选择的 USB 电源复位功能、USB 端口类型路由选项（auto/USB-type-A/mini-PCIe），以及特定型号的 micro USB 主机模式支持，并包含设备兼容性方面的警告。"
tags:
  - 'usb'
  - 'power-management'
source: https://manual.mikrotik.com/docs/7.24/hardware/usb-features
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "wired-connections"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 摘要 {#summary}

**子菜单：** `/system/routerboard/usb`  
**软件包：** `system (v6, v7)`

本文介绍 RouterBoard 设备支持的 USB 功能。

## USB 电源重置 {#usb-power-reset}

USB 电源重置会在指定时间内关闭 USB 端口电源。当 3G/LTE 调制解调器需要重启但无法物理接触时，该功能很有用。

## 可用属性 {#available-properties}

- duration（*time*；默认："3s"）- 电源关闭的时间间隔。

例如，关闭 USB 端口电源 10 秒：

```ros
/system/routerboard/usb/power-reset duration=10s 
```

具有多个 USB 总线的 RouterBoard 还需要指定总线，才能执行 USB 电源重置。  

## 可用属性 {#available-properties-1}

- duration（*time*；默认："3s"）- 电源关闭的持续时间。
- bus（*integer*；默认：1）- 应用电源复位的 USB 总线。

:::warning
**RB953GS**：RB953GS 板上更靠近以太网端口的 miniPCIe 插槽与 USB 端口共享，并具有可配置的 [USB 端口类型](#usb-port-type)，其 USB 总线编号为 1。根据 [USB 端口类型](#usb-port-type)，电源复位会在 USB 端口或 miniPCIe 插槽上执行。另一个更靠近 SFP 插槽的 miniPCIe 插槽使用独立总线 - 2。
:::

:::warning
**RB922UAG**：USB 端口使用独立总线 - 1。miniPCIe 插槽使用独立总线 - 2。
:::

:::warning
**CCR1072-1G-8S+**：micro USB 端口使用独立总线 - 0。USB Type-A 端口使用独立总线 - 1。
:::

## USB 端口类型 {#usb-port-type}

具有可切换 USB 端口路由的板卡共享 USB 线路，这些线路可路由至外部 USB-Type 端口或 mini-PCIe 插槽。更多参考信息，请参阅板卡规格页面上文档部分中的板卡框图。

```ros
[admin@MikroTik] > /system/routerboard/usb/set type=
USB-type-A     auto     mini-PCIe 
```

|  |  |
| :-- | :-- |
| **auto**（默认） | 在 RouterOS 启动期间检查 mini-PCIe 插槽中是否存在 USB 设备：<br/><ul><li>如果存在 - 使用 mini-PCIe 插槽中的设备</li><li>如果不存在 - 默认使用外部 USB Type A 端口</li></ul> |
| **USB-type-A** | 使用连接到 USB Type A 连接器的 USB 设备 |
| **mini-PCIe** | 将 USB 线路路由至相应的 mini-PCIe 插槽 |

:::warning
**RB953GS：** RB953GS 板上更靠近以太网端口的 miniPCIe 插槽与 USB 端口共享，并具有可配置的 [USB 端口类型](#usb-port-type)，其 USB 总线编号为 1。根据 [USB 端口类型](#usb-port-type)，断电复位会在 USB 端口或 miniPCIe 插槽上执行。另一个更靠近 SFP 插槽的 miniPCIe 插槽使用独立总线 - 2。
:::

## USB 端口模式 {#usb-port-mode}

RB2011 系列、CRS1xx 系列和 mAP 具有一个 micro USB 端口，当通过 USB OTG 线缆连接 USB 设备时，该端口以主机模式运行。某些厂商的线缆需要强制主机模式才能识别连接的设备。

## 可用属性 {#available-properties-2}

- usb-mode（*automatic | force-host*；默认："automatic"）- 定义 USB 端口模式。

:::warning
Warning

在 RB2011 和 CRS1xx 系列板上，USB 设备首次插入时可能无法工作。在这种情况下，需要断电重启（而非 reboot）。
:::

## RouterBoard USB 端口限制 {#routerboard-usb-port-limitations}

某些 RouterBoard 设备存在明显的 USB 端口限制。

\* RB mAP 2n - 不支持 USB Power Reset  
\* RB750UP - 不支持 USB Power Reset  
\* RB751U-2HnD - 不支持 USB Power Reset  
\* RB751G-2HnD - 不支持 USB Power Reset  
\* RB411U - 不支持 USB Power Reset  
\* RB411UAHR - 不支持 USB Power Reset 和 USB Powering（需要 [USB power injector](https://mikrotik.com/product/5VUSB)）  
\* RB433UAH - 不支持 USB Power Reset  
\* RB435G - 不支持 USB Power Reset  
\* RB493G - 不支持 USB Power Reset 和 USB Powering（需要 [USB power injector](https://mikrotik.com/product/5VUSB)）

:::warning
RouterOS 不支持来自 USB 调制解调器的内存插槽。
:::
