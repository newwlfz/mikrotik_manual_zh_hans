---
sidebar_key: "management-tools/serial-console"
sidebar_position: 6
title: "串行控制台"
sidebar_label: "串行控制台"
description: "Serial Console 和 Terminal 工具可通过串口实现设备直接通信，用于初始配置或恢复配置，最多支持 132 台设备。本页说明用于硬件流控的 null-modem 电缆配置，包括无握手以及具有部分或完全握手能力的选项。"
tags:
  - 'serial-console'
  - 'null-modem-cables'
  - 'rs232'
source: https://manual.mikrotik.com/docs/management-tools/serial-console
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

串行控制台和串行终端是用于与通过串行端口互连的设备和其他系统进行通信的工具。串行终端用于监控和配置许多设备——包括调制解调器、网络设备（包括 MikroTik 路由器），以及任何可连接到串行（异步）端口的设备。

串行控制台功能用于配置直接访问配置设施（显示器/键盘和串行端口），这些设施主要用于初始配置或恢复配置。连接两台主机（例如两台 PC 或两台路由器；不是调制解调器）需要一根特殊的零调制解调器电缆。从另一台计算机访问串行控制台需要终端仿真程序（例如 Windows 上的 HyperTerminal 或 Linux 上的 minicom）。路由器串行端口的默认设置为 115200 bits/s（x86 的默认值为 9600 bits/s）、8 个数据位、1 个停止位、无奇偶校验、硬件（RTS/CTS）流控。

串行终端（管理端）功能在以下情况下很有用：

- 在山顶上，MikroTik 无线安装旁边有无法带内管理（通过 IP 网络使用 telnet）的设备（包括交换机和 Cisco 路由器）。
- 通过串行端口监控气象报告设备。
- 连接到需要通过串行连接进行监控和管理的高速微波调制解调器。

借助 MikroTik 的串行终端功能，最多可以监控和控制 132 台（甚至更多）设备。

## 串行控制台连接 {#serial-console-connections}

设备之间的串行通信通过 RS232 完成。它是计算机领域中最古老、最广泛使用的通信方法之一。它曾用于与调制解调器或其他外围设备 DTE/DCE 进行通信。在现代，串行通信的主要用途是 DTE/DTE 通信（数据终端设备），例如使用零调制解调器电缆。零调制解调器电缆有多种类型，其中一些可能根本无法与 RouterBoards 配合使用。

### 无握手的零调制解调器 {#null-modem-without-handshake}

此电缆完全不使用握手引脚：

| 侧1 (DB9f) | 侧2 (DB9f) | 功能 |
| --: | --: | :-- |
| 2 | 3 | Rx ← Tx |
| 3 | 2 | Tx → Rx |
| 5 | 5 | GND |

它允许在交叉连接的 Rx/Tx 线路上仅传输数据。此类电缆无法进行硬件流控。执行流控的唯一方式是使用 XOFF 和 XON 字符进行软件流控。

### 带回环握手的零调制解调器 {#null-modem-with-loopback-handshake}

无握手电缆的问题在于，当连接到启用了硬件流控的设备时，软件在检查调制解调器信号线时可能会挂起。

带回环握手的零调制解调器电缆解决了这个问题；其主要目的是欺骗设计良好的软件，使其认为有可用的握手：

| 侧1 (DB9f) | 侧2 (DB9f) | 功能 |
| :-- | :-- | :-- |
| 2 | 3 | Rx ← Tx |
| 3 | 2 | Tx → Rx |
| 5 | 5 | GND |
| 1+4+6 | - | DTR → CD + DSR |
| - | 1+4+6 | DTR → CD + DSR |
| 7+8 | - | RTS → CTS |
| - | 7+8 | RTS → CTS |

此电缆无法进行硬件流控。此外，如果远程软件不向 DTR 输出发送其自身的就绪信号，通信就会挂起。

### 带部分握手的零调制解调器 {#null-modem-with-partial-handshake}

这种电缆可在启用流控制时使用，同时不会与 DTE/DCE 通信中使用流控制的原有方式不兼容。

不建议将这种类型的电缆与 RouterOS 一起使用。

| 侧1 (DB9f) | 侧2 (DB9f) | 功能 |
| :-- | :-- | :-- |
| 1 | 7+8 | RTS2 → CTS2 + CD1 |
| 2 | 3 | Rx ← Tx |
| 3 | 2 | Tx → Rx |
| 4 | 6 | DTR → DSR |
| 5 | 5 | GND |
| 6 | 4 | DSR ← DTR |
| 7+8 | 1 | RTS1 → CTS1 + CD2 |

### 带完全握手的零调制解调器 {#null-modem-with-full-handshake}

用于特殊软件，不应与 RouterOS 一起使用。

| 侧1 (DB9f) | 侧2 (DB9f) | 功能 |
| --: | --: | :-- |
| 2 | 3 | Rx ← Tx |
| 3 | 2 | Tx → Rx |
| 4 | 6 | DTR → DSR |
| 5 | 5 | GND |
| 6 | 4 | DSR ← DTR |
| 7 | 8 | RTS → CTS |
| 8 | 7 | CTS ← RTS |

### 零调制解调器兼容性 {#null-modem-compatibility}

以下汇总表可帮助您为应用选择合适的电缆。

|  | 无握手 | 回环握手 | 部分握手 | 完全握手 |
| :-- | :-- | :-- | :-- | :-- |
| 端口功能受限的 RouterBoard | Y | Y | N\* | N |
| 具备完整功能的 RouterBoard | Y | Y | Y | N |

\* - 仅在硬件流控制禁用时可能有效

|  | 无握手 | 环回握手 | 部分握手 | 完全握手 |
| :-- | :-- | :-- | :-- | :-- |
| 仅软件流控 | Y | Y\* | Y\*\* | Y\*\* |
| 低速 DTE/DCE 兼容硬件流控 | N | Y | Y\* | N |
| 高速 DTE/DCE 兼容硬件流控 | N | Y | Y\*\* | N |
| 使用特殊软件进行高速通信 | N | N | Y\* | Y |

\* - 可作为替代方案

\*\* - 可用但不推荐

### RJ45 类型串行端口 {#rj45-type-serial-port}

这种端口用于 RouterBOARD 2011、3011、4011、CCR1072、CCR1036 r2、CCR2xxx 和 CRS 系列设备，有时称为“Cisco 风格”串行端口。

#### RJ45 到 DB9 电缆引脚定义 {#rj45-to-db9-cable-pinout}

![](/img/3f6e76a55153f3e0.webp)

| 信号 | 控制台端口 (DTE) RJ-45 | RJ-45 反转电缆 RJ-45 引脚 | 适配器 DB-9 引脚 | 适配器 DB-25 引脚 | 信号 |
| :-- | --: | --: | --: | --: | :-- |
| RTS | 1 | 8 | 8 | 5 | CTS |
| DTR | 2 | 7 | 6 | 6 | DSR |
| TxD | 3 | 6 | 2 | 3 | RxD |
| 接地 | 4 | 5 | 5 | 7 | 接地 |
| Ground | 5 | 4 | 5 | 7 | Ground |
| RxD | 6 | 3 | 3 | 2 | TxD |
| DSR | 7 | 2 | 4 | 20 | DTR |
| CTS | 8 | 1 | 7 | 4 | RTS |

### RB M33G 附加串行排针 {#rb-m33g-additional-serial-header}

对于 RBM33G，可以将附加串行排针连接到 GPIO 引脚 U3\_RXD、GND、U3\_TXD 和 3V3

### CCR 串行排针 {#ccr-serial-header}

Cloud Core Router 系列设备在 PCB 板上有一个串行排针，称为 J402 或 100

该连接器的引脚排列如下：

![](/img/ca319263debe6708.webp)

## 串行终端用法 {#serial-terminal-usage}

RouterOS 允许使用 [`/system/serial-terminal`](../cli-reference/system/serial-terminal.md) 命令，与通过串行端口连接到路由器的设备和其他系统进行通信。所有键盘输入都会转发到串行端口，端口中的所有数据都会输出到连接的设备。

首先，必须有一个空闲的串行端口。如果设备只有一个串行端口（例如所有 RouterBoards、WRAP/ALIX 板等），则必须禁用此串行端口上的系统控制台，才能将其用作 **串行终端** 来连接其他设备（例如交换机、调制解调器）：

```ros
/system/console/disable 0
```

请确保只是禁用控制台，而不是删除它，因为如果实际删除它，RouterOS 会在下次重启后重新创建控制台。

:::danger
将设备连接到 RouterBoard 上的串口时需要注意以下事项：

- 如前所述，在 RouterBoard 上重新配置端口 Serial0 后，您将失去对 RouterOS 的串口控制台访问权限。这意味着，如果您无法通过网络访问 RouterBoard，您可能必须重置整个配置才能重新获得访问权限。
- 重新启动 RouterBoard 时，引导加载程序（RouterBOOT）始终使用串口控制台（RouterBoard 上的 Serial0）发送一些启动消息，并提供对 RouterBOOT 菜单的访问。

  从串口输出到所连接设备的文本可能会使您连接的设备混淆。此外，在标准配置中，您可以通过按 **ANY** 键进入 RouterBOOT 菜单。因此，如果您的串口设备在启动期间向 RouterBoard 的串口发送任何字符，RouterBoard 将进入 RouterBOOT 菜单，并且除非您手动干预，否则**不会**启动 RouterOS！

  您可以重新配置 RouterBOOT，使其仅在收到 <kbd>Delete</kbd> 字符时才进入 RouterBOOT 菜单——使用此设置可降低在重新启动时路由器卡住的概率！

  或者，对于较新版本，可以使用 ["Silent boot"](../getting-started/installation-and-upgrade/routerboot.md) 功能来抑制串口接口上的任何输出，包括移除启动声音。
:::

接下来，必须根据所连接设备的串行端口设置来配置您的串行端口。通过以下命令，可将串行端口设置为 19200 Baud 8N1。需要使用哪些设置取决于您连接的设备：

```ros
/port/set serial0 baud-rate=19200 data-bits=8 parity=none stop-bits=1
```

您也可以让 RouterOS 通过设置以下内容来猜测所需的波特率

```ros
/port/set serial0 baud-rate=auto
```

如果尚未连接设备，现在就可以连接了。通常，您需要一根[零调制解调器电缆](#serial-console-connections)（与以太网交叉电缆相同）。现在可以开始了：

```ros
/system/serial-terminal serial0
```

这样您就可以访问连接到 Serial0 端口的设备。<kbd>Control</kbd>+<kbd>A</kbd> 是前缀键，这意味着您会进入一个小型“菜单”。如果需要将 <kbd>Control</kbd>+<kbd>A</kbd> 字符发送到远程设备，请按两次 <kbd>Control</kbd>+<kbd>A</kbd>。

如果要退出与串行设备的连接，请按 <kbd>Control</kbd>+<kbd>A</kbd>，然后按 <kbd>Q</kbd>。这将返回到 RouterOS 控制台。

:::danger
不要以错误的速度连接设备，并避免转储二进制数据。
:::

## 特殊登录 {#special-login}

特殊登录可用于访问通过串行电缆连接的另一台设备（例如交换机），方法是打开一个 telnet/ssh 会话，让您直接进入该设备（无需先登录 RouterOS）。

本演示使用两台 RouterBoards 和一台 PC。

![](/img/060c953cc7f1d5cd.webp)

路由器 R1 和 R2 通过串行电缆连接，PC 通过以太网连接到 R1。要从 PC 通过串行电缆访问路由器 R2，必须在 R1 上设置串行接口代理。这通过使用名为 **special-login** 的功能来完成。

:::info
默认情况下，控制台绑定到串行端口。
:::

首先，通过禁用 [`/system/console`](../cli-reference/system/console/index.md) 菜单中的条目来解除控制台与串行端口的绑定：

```ros
[admin@MikroTik] /system/console> print
Flags: X - disabled, U - used, F - free
 #   PORT                                                                    TERM
 0 X serial0                                                                 vt102
```

接下来，添加一个新用户，在此示例中为 *serial*，并将其绑定到串行端口：

```ros
[admin@MikroTik] > /user/add name=serial group=full
[admin@MikroTik] > /special-login/add user=serial port=serial0 disabled=no
[admin@MikroTik] > /special-login/print
Flags: X - disabled
 #   USER                                                                    PORT
 0   serial                                                                  serial0
```

现在可以从 PC 访问 R2。

```ros
maris@bumba:/$ ssh serial@10.1.101.146

[Ctrl-A is the prefix key]
R2 4.0beta4
R2 Login:

[admin@R2] >
```

要退出特殊登录模式，请按 <kbd>Control</kbd>+<kbd>A</kbd> 和 <kbd>Q</kbd>：

```ros
[admin@MikroTik] >
[Q - quit connection]      [B - send break]
[A - send Ctrl-A prefix]   [R - autoconfigure rate]

Connection to 10.1.101.146 closed.
```

:::danger
路由器重启后，如果连接了串行电缆，路由器可能会卡在 Bootloader 主菜单。
:::

要解决此问题，需要将进入 bootloader 主菜单的方式从按 **任意** 键改为按 <kbd>Delete</kbd>：

- 进入 bootloader 菜单。
- 选择 `k` 进入启动键选项。
- 选择 `2` 将按键改为 <kbd>Delete</kbd>。

```
What do you want to configure?
d - boot delay
k - boot key
s - serial console
n - silent boot
o - boot device
u - cpu mode
f - cpu frequency
r - reset booter configuration
e - format nand
g - upgrade firmware
i - board info
p - boot protocol
b - booter options
t - call debug code
l - erase license
x - exit setup
your choice: k - boot key

Select key which will enter setup on boot:
 * 1 - any key
   2 - <Delete> key only

your choice: 2

```
