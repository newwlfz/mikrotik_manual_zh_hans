---
title: "端口"
description: "本页介绍 MikroTik RouterOS 端口配置选项，涵盖用于初始设置的串口和 USB 端口、3G 调制解调器连接、通过 RFC 2217 实现的远程访问，以及波特率、流控和停止位等详细端口属性。"
tags:
  - 'serial-port'
  - 'baud-rate'
  - 'remote-access'
source: https://manual.mikrotik.com/docs/7.25/hardware/ports
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 摘要 {#summary}

路由器提供多种使用端口的方式。最常见的用途是串行端口，用于安装后的初始 RouterOS 配置。默认情况下，serial0 由串行终端使用。

串行端口和 USB 端口还可用于：

- 连接 3G 调制解调器。
- 通过串行线缆连接到另一台设备。
- 远程访问通过串行线缆连接的设备。

## 常规 {#general}

**子菜单：** `/port`

此菜单显示路由器上所有可用的串行端口和 USB 端口，并允许你配置端口参数，例如 baud-rate、flow-control 和其他设置。

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
| **baud-rate** (*integer \| auto*；默认：**auto**) | 端口使用的波特率（速度）。如果设置为 **auto**，RouterOS 会尝试自动检测波特率。 |
| **data-bits** (*7 \| 8*；默认：) | 每个字符中的数据位数。<ul><li><strong>7</strong> - 真正的 ASCII</li><li><strong>8</strong> - 任意数据（与一个字节的大小一致）</li></ul> |
| **dtr** (*on \| off*；默认：) | 是否启用用于流控的 RS-232 DTR 信号电路。 |
| **flow-control** (*hardware \| none \| xon-xoff*；默认：) | 用于暂停和恢复数据传输的流控方法。 |
| **name** (*string*；默认：) | 端口名称。 |
| **parity** (*even \| none \| odd*；默认：) | 错误检测方法。启用后，会发送一个额外位以检测通信错误。大多数情况下，parity 设置为 **none**，错误由通信协议处理。 |
| **rts** (*on \| off*；默认：) | 是否启用用于流控的 RS-232 RTS 信号电路。 |
| **stop-bits** (*1 \| 2*；默认：) | 每个字符后发送的停止位。电子设备通常使用 1 个停止位。 |

### 只读属性 {#read-only-properties}

| 属性 | 说明 |
| :-- | :-- |
| **channels** (*integer*) | 端口支持的通道数。 |
| **inactive** (*yes \| no*) | 显示当前端口状态，**inactive=yes** 表示该端口之前连接的设备当前不存在。 |
| **line-state** () |  |
| **used-by** (*string*) | 显示当前谁在使用端口和通道（#）。例如，默认情况下 **Serial0** 由 serial-console 使用。 |

## 远程访问 {#remote-access}

**子菜单：** `/port/remote-access`

远程访问功能允许你连接到位于路由器后方、通过 COM 端口通信的串行设备。使用 RFC 2217，RouterOS 可以通过 TCP 连接向串行设备传输数据以及从串行设备接收数据。

在 RouterOS 上启用远程访问非常简单：

```ros
/port/remote-access/add port=serial0 protocol=rfc2217 tcp-port=9999
```

:::warning
默认情况下，serial0 由串行终端使用。必须先释放该端口，才能由 remote-access 或其他服务使用。
:::

## 属性 {#properties-1}

| 属性 | 说明 |
| :-- | :-- |
| **allowed-addresses** (*IP address range*；默认：**0.0.0.0/0**) | 允许远程访问端口的 IP 地址范围。 |
| **channel** (*integer [0..4294967295]*；默认：**0**) | 将使用的端口通道。如果端口只有一个通道，则通道编号应始终为 **0**。 |
| **disabled** (*yes \| no*；默认：**no**) |  |
| **local-address** (*IP address*；默认：) | 用作源地址的 IP 地址。 |
| **log-file** (*string*；默认：**""**) | 用于记录通信内容的文件名。默认禁用日志记录。 |
| **port** (*string*；默认：) | Port 列表中的端口名称。 |
| **protocol** (*raw \| rfc2217*；默认：**rfc2217**) | RFC 2217 定义了一种通过 TCP 向串行设备传输数据或从串行设备接收数据的协议。如果设置为 **raw**，则数据按原样发送到串行设备。 |
| **tcp-port** (*integer [0..65535]*；默认：**0**) | 用于侦听传入连接的 TCP 端口。 |

## 只读属性 {#read-only-properties-1}

| 属性 | 说明 |
| :-- | :-- |
| **active** (*yes \| no*) | 远程访问是否处于活动状态并准备接受连接。 |
| **busy** (*yes \| no*) | 端口当前是否繁忙。 |
| **inactive** (*yes \| no*) |  |
| **logging-active** (*yes \| no*) | 当前是否正在记录到文件 |
| **remote-address** (*IP address*) | 当前已连接远程位置的 IP 地址。 |
