---
sidebar_key: "hardware/usb-features"
sidebar_position: 13
title: "USB 功能"
sidebar_label: "USB 功能"
description: "本页面介绍 MikroTik RouterOS 中的 USB 功能，包括可配置持续时间和总线选择的 USB 电源重置功能、USB 端口类型路由选项（auto/USB-type-A/mini-PCIe），以及特定型号对 micro USB 主机模式的支持，并附有关于设备兼容性的警告。"
tags:
  - 'usb'
  - 'power-management'
source: https://manual.mikrotik.com/docs/7.25/hardware/usb-features
captured_at: '2026-11-04T11:17:35+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#summary}

**子菜单：** `/system/routerboard/usb`  
**软件包：** `system (v6, v7)`

本文介绍 RouterBoard 设备支持的 USB 功能。

## USB 电源重置 {#usb-power-reset}

USB 电源重置会关闭 USB 端口电源一段指定的时间。当 3G/LTE 调制解调器需要重启，但无法对其进行物理接触时，这一功能非常有用。

## 可用属性 {#available-properties}

- duration (*time*；默认值："3s") - 关闭电源的时间间隔。

例如，关闭 USB 端口电源 10 秒：

```ros
/system/routerboard/usb/power-reset duration=10s 
```

具有多条 USB 总线的 RouterBoard 还需要指定总线，才能执行 USB 电源重置。  

## 可用属性 {#available-properties-1}

- duration (*time*；默认值："3s") - 关闭电源持续的时间间隔。
- bus (*integer*；默认值：1) - 应用电源重置的 USB 总线。

:::warning
**RB953GS**：在 RB953GS 板上，靠近以太网端口的 miniPCIe 插槽是与 USB 端口共享的那个插槽，并且具有可配置的 [USB 端口类型](#usb-port-type)，其 USB 总线编号为 1。根据 [USB 端口类型](#usb-port-type) 的不同，电源重置在 USB 端口或 miniPCIe 插槽上执行。另一个靠近 SFP 插槽的 miniPCIe 插槽具有独立的总线 - 2。

:::

:::warning
**RB922UAG**：USB 端口具有独立的总线 - 1。miniPCIe 插槽具有独立的总线 - 2。

:::

:::warning
**CCR1072-1G-8S+**：micro USB 端口具有独立的总线 - 0。USB Type-A 端口具有独立的总线 - 1。

:::

## USB 端口类型 {#usb-port-type}

具有可切换 USB 端口路由的板卡具有共享的 USB 线路，这些线路可路由到外部 USB-Type 端口或 mini-PCIe 插槽。更多参考请参见板卡规格页面文档部分中的板卡框图。

```ros
[admin@MikroTik] > /system/routerboard/usb/set type=
USB-type-A     auto     mini-PCIe 
```

|  |  |
| :-- | :-- |
| **auto**（默认） | 在 RouterOS 启动期间检查 mini-PCIe 插槽中是否存在 USB 设备：如果存在 - 使用 mini-PCIe 插槽中的设备如果不存在 - 默认为外部 USB Type A 端口 |
| **USB-type-A** | 使用连接到 USB Type A 连接器的 USB 设备 |
| **mini-PCIe** | 将 USB 线路路由到相应的 mini-PCIe 插槽 |

:::warning
**RB953GS：** 在 RB953GS 板上，靠近以太网端口的 miniPCIe 插槽是与 USB 端口共享的那个插槽，并且具有可配置的 [USB 端口类型](#usb-port-type)，其 USB 总线编号为 1。根据 [USB 端口类型](#usb-port-type) 的不同，电源重置在 USB 端口或 miniPCIe 插槽上执行。另一个靠近 SFP 插槽的 miniPCIe 插槽具有独立的总线 - 2。

:::

## USB 端口模式 {#usb-port-mode}

RB2011 系列、CRS1xx 系列和 mAP 具有一个 micro USB 端口，当通过 USB OTG 线缆连接 USB 设备时，该端口以主机模式运行。某些厂商的线缆需要强制主机模式才能识别所连接的设备。

## 可用属性 {#available-properties-2}

- usb-mode (*automatic | force-host*；默认值："automatic") - 定义 USB 端口模式。

:::warning
警告

在 RB2011 和 CRS1xx 系列板卡上，USB 设备首次插入时可能无法工作。在这种情况下，需要断电重启（不是软重启）。

:::

## RouterBoard USB 端口限制 {#routerboard-usb-port-limitations}

某些 RouterBoard 设备存在值得注意的 USB 端口限制。

\* RB mAP 2n - 不支持 USB 电源重置  
\* RB750UP - 不支持 USB 电源重置  
\* RB751U-2HnD - 不支持 USB 电源重置  
\* RB751G-2HnD - 不支持 USB 电源重置  
\* RB411U - 不支持 USB 电源重置  
\* RB411UAHR - 不支持 USB 电源重置和 USB 供电（需要 [USB 电源注入器](https://mikrotik.com/product/5VUSB)）  
\* RB433UAH - 不支持 USB 电源重置  
\* RB435G - 不支持 USB 电源重置  
\* RB493G - 不支持 USB 电源重置和 USB 供电（需要 [USB 电源注入器](https://mikrotik.com/product/5VUSB)）

:::warning
RouterOS 不支持 USB 调制解调器上的存储插槽。

:::
