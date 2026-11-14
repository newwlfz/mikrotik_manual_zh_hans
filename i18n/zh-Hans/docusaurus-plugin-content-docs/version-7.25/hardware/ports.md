---
sidebar_key: "hardware/ports"
sidebar_position: 8
title: "端口"
sidebar_label: "端口"
description: "本页介绍 MikroTik RouterOS 端口配置选项，涵盖用于初始设置的串行端口和 USB 端口、3G 调制解调器连接、通过 RFC 2217 进行远程访问，以及波特率、流控和停止位等详细的端口属性。"
tags:
  - 'serial-port'
  - 'baud-rate'
  - 'remote-access'
source: https://manual.mikrotik.com/docs/7.25/hardware/ports
captured_at: '2026-11-04T11:17:27+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#summary}

路由器为其端口提供了多种使用选项。最常见的用途是串口，安装后用于初始 RouterOS 配置。默认情况下，serial0 由串行终端使用。

串口和 USB 端口还可用于：

- 连接 3G 调制解调器。
- 通过串口线连接到另一台设备。
- 远程访问通过串口线连接的设备。

## 常规 {#general}

**子菜单：** `/port`

此菜单显示路由器上所有可用的串口和 USB 端口，并允许配置端口参数，例如 baud-rate、flow-control 及其他设置。

以下示例显示 LtAP 设备上的默认端口配置：

```ros
[admin@LtAP] > /port/print                 
Columns: DEVICE, NAME, CHANNELS, USED-BY, BAUD-RATE
# DEVICE  NAME     CHANNELS  USED-BY                                     BAUD-RATE
0         serial0         1  Serial Console(#0)                          auto     
1         gps             1  GPS(#0)                                     115200   
```

:::warning
端口列表由 RouterOS 自动维护。

:::

## 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **baud-rate** (*integer \| auto*; 默认值：**auto**) | 端口使用的波特率（速度）。如果设置为 **auto**，RouterOS 会尝试自动检测波特率。 |
| **data-bits** (*7 \| 8*; 默认值：) | 每个字符中的数据位数。7 - 真 ASCII；8 - 任意数据（与一个字节的大小相匹配） |
| **dtr** (*on \| off*; 默认值：) | 是否启用流控使用的 RS-232 DTR 信号电路。 |
| **flow-control** (*hardware \| none \| xon-xoff*; 默认值：) | 用于暂停和恢复数据传输的流控方法。 |
| **name** (*string*; 默认值：) | 端口名称。 |
| **parity** (*even \| none \| odd*; 默认值：) | 错误检测方法。如果启用，会发送一个额外位来检测通信错误。大多数情况下，parity 设置为 **none**，错误由通信协议处理。 |
| **rts** (*on \| off*; 默认值：) | 是否启用流控使用的 RS-232 RTS 信号电路。 |
| **stop-bits** (*1 \| 2*; 默认值：) | 每个字符后发送的停止位。电子设备通常使用 1 个停止位。 |

### 只读属性 {#read-only-properties}

| 属性 | 描述 |
| :-- | :-- |
| **channels** (*integer*) | 端口支持的通道数。 |
| **inactive** (*yes \| no*) | 显示当前端口状态，**inactive=yes** - 端口之前连接到的设备，但当前不存在 |
| **line-state** () |  |
| **used-by** (*string*) | 显示当前谁在使用端口和通道（#）。例如，默认情况下 **Serial0** 由 serial-console 使用。 |

## 远程访问 {#remote-access}

**子菜单：** `/port/remote-access`

远程访问功能允许您连接到通过 COM 端口通信且位于路由器后方的串行设备。使用 RFC 2217，RouterOS 可以通过 TCP 连接与串行设备之间传输数据。

在 RouterOS 上启用远程访问很简单：

```ros
/port/remote-access/add port=serial0 protocol=rfc2217 tcp-port=9999
```

:::warning
默认情况下，serial0 由串行终端使用。必须先释放该端口，才能将其用于 remote-access 或其他服务。

:::

## 属性 {#properties-1}

| 属性 | 描述 |
| :-- | :-- |
| **allowed-addresses** (*IP address range*; 默认值：**0.0.0.0/0**) | 允许远程访问端口的 IP 地址范围。 |
| **channel** (*integer [0..4294967295]*; 默认值：**0**) | 将使用的端口通道。如果端口只有一个通道，则通道号应始终为 **0**。 |
| **disabled** (*yes \| no*; 默认值：**no**) |  |
| **local-address** (*IP address*; 默认值：) | 用作源地址的 IP 地址。 |
| **log-file** (*string*; 默认值：**""**) | 用于记录通信日志的文件名。默认情况下禁用日志记录。 |
| **port** (*string*; 默认值：) | 端口列表中的端口名称。 |
| **protocol** (*raw \| rfc2217*; 默认值：**rfc2217**) | RFC 2217 定义了通过 TCP 与串行设备之间传输数据的协议。如果设置为 **raw**，则数据按原样发送到串行端口。 |
| **tcp-port** (*integer [0..65535]*; 默认值：**0**) | 用于监听传入连接的 TCP 端口。 |

## 只读属性 {#read-only-properties-1}

| 属性 | 描述 |
| :-- | :-- |
| **active** (*yes \| no*) | 远程访问是否处于活动状态并准备好接受连接。 |
| **busy** (*yes \| no*) | 端口当前是否忙碌。 |
| **inactive** (*yes \| no*) |  |
| **logging-active** (*yes \| no*) | 当前是否正在记录到文件 |
| **remote-address** (*IP address*) | 当前连接的远程位置的 IP 地址。 |
