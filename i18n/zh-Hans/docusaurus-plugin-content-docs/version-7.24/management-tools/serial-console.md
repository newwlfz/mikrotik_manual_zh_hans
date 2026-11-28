---
title: "串行控制台"
description: "Serial Console 和 Terminal 工具支持通过串口与设备直接通信，用于初始配置或恢复配置，最多支持 132 台设备。本页介绍用于硬件流控的 null-modem 线缆配置，包括无握手以及支持部分或完整握手的选项。"
tags:
  - 'serial-console'
  - 'null-modem-cables'
  - 'rs232'
source: https://manual.mikrotik.com/docs/7.24/management-tools/serial-console
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Serial Console 和 Serial Terminal 是用于与通过串口互连的设备和其他系统通信的工具。Serial Terminal 可用于监控和配置多种设备，包括调制解调器、网络设备（包括 MikroTik 路由器），以及任何可连接到串行（异步）端口的设备。

Serial Console 功能用于配置直接访问配置设施（monitor/keyboard 和串口），这些设施主要用于初始配置或恢复配置。连接两台主机（例如两台 PC 或两台路由器；不包括调制解调器）需要一根特殊的 null-modem 电缆。请注意，从另一台计算机访问 Serial Console 需要终端仿真程序（例如 Windows 上的 HyperTerminal 或 Linux 上的 minicom）。路由器串口的默认设置为 115200 bits/s（对于 x86，默认值为 9600 bits/s）、8 个数据位、1 个停止位、无校验、硬件（RTS/CTS）流控。

多位客户描述了 Serial Terminal（管理端）功能有用的场景：

- 在山顶上，MikroTik 无线安装设备旁边有无法通过带内方式（通过 IP 网络使用 telnet）管理的设备（包括交换机和 Cisco 路由器）。
- 通过串口监控气象报告设备。
- 连接到需要通过串行连接进行监控和管理的高速微波调制解调器。

借助 MikroTik 的 serial-terminal 功能，最多可监控和控制 132 台（甚至可能更多）设备。

## 串行控制台连接 {#serial-console-connections}

设备之间的串行通信通过 RS232 完成。它是计算机领域中最古老、应用最广泛的通信方法之一。它曾用于与调制解调器或其他外围设备 DTE/DCE 通信。在现代环境中，串行通信的主要用途是 DTE/DTE 通信（Data Terminal Equipment），例如使用 null-modem 电缆。null modem 电缆有多种类型，其中一些可能完全无法与 RouterBoards 配合使用。

### 无握手信号的 Null Modem {#null-modem-without-handshake}

该线缆完全不使用握手引脚：

| Side1（DB9f） | Side2（DB9f） | 功能 |
| --: | --: | :-- |
| 2 | 3 | Rx ← Tx |
| 3 | 2 | Tx → Rx |
| 5 | 5 | GND |

它允许数据仅在交叉连接的 Rx/Tx 线路上传输。使用此类线缆无法实现硬件流控。唯一可执行流控的方式是使用 XOFF 和 XON 字符的软件流控。

### 带环回握空的 Null Modem {#null-modem-with-loopback-handshake}

第一种线缆的问题在于，当连接到启用硬件流控的设备时，软件在检查调制解调器信号线时可能会挂起。

带环回握手的 Null modem 线缆可解决该问题；其主要目的是欺骗定义良好的软件，使其认为存在可用的握手：

| Side1（DB9f） | Side2（DB9f） | 功能 |
| :-- | :-- | :-- |
| 2 | 3 | Rx ← Tx |
| 3 | 2 | Tx → Rx |
| 5 | 5 | GND |
| 1+4+6 | - | DTR → CD + DSR |
| - | 1+4+6 | DTR → CD + DSR |
| 7+8 | - | RTS → CTS |
| - | 7+8 | RTS → CTS |

使用该线缆无法实现硬件流控。此外，如果远端软件未向 DTR 输出发送自身的就绪信号，通信将挂起。

### 采用部分握手的 Null Modem {#null-modem-with-partial-handshake}

当启用流控，同时又不希望与 DTE/DCE 通信中原有的流控使用方式不兼容时，可以使用该线缆。

不建议将此类线缆与 RouterOS 配合使用。

| Side1 (DB9f) | Side2 (DB9f) | 功能 |
| :-- | :-- | :-- |
| 1 | 7+8 | RTS2 → CTS2 + CD1 |
| 2 | 3 | Rx ← Tx |
| 3 | 2 | Tx → Rx |
| 4 | 6 | DTR → DSR |
| 5 | 5 | GND |
| 6 | 4 | DSR ← DTR |
| 7+8 | 1 | RTS1 → CTS1 + CD2 |

### 采用完整握手的 Null Modem {#null-modem-with-full-handshake}

用于特殊软件，不应与 RouterOS 配合使用。

| Side1 (DB9f) | Side2 (DB9f) | 功能 |
| --: | --: | :-- |
| 2 | 3 | Rx ← Tx |
| 3 | 2 | Tx → Rx |
| 4 | 6 | DTR → DSR |
| 5 | 5 | GND |
| 6 | 4 | DSR ← DTR |
| 7 | 8 | RTS → CTS |
| 8 | 7 | CTS ← RTS |

### Null Modem 兼容性 {#null-modem-compatibility}

以下汇总表可帮助你根据应用场景选择合适的线缆。

|  | 无握手 | 环回握手 | 部分握手 | 完整握手 |
| :-- | :-- | :-- | :-- | :-- |
| 端口功能受限的 RouterBoards | Y | Y | N\* | N |
| 功能完整的 RouterBoards | Y | Y | Y | N |

\* - 仅在禁用硬件流控时可能工作

|  | 无握手 | 环回握手 | 部分握手 | 完整握手 |
| :-- | :-- | :-- | :-- | :-- |
| 仅软件流控 | Y | Y\* | Y\*\* | Y\*\* |
| 低速 DTE/DCE 兼容硬件流控 | N | Y | Y\* | N |
| 高速 DTE/DCE 兼容硬件流控 | N | Y | Y\*\* | N |
| 使用特殊软件的高速通信 | N | N | Y\* | Y |

\* - 可作为替代方案工作

\*\* - 可以工作，但不推荐

### RJ45 类型串行端口 {#rj45-type-serial-port}

此类端口用于 RouterBOARD 2011、3011、4011、CCR1072、CCR1036 r2、CCR2xxx 和 CRS 系列设备，有时称为“Cisco style”串口。

#### RJ45 转 DB9 线缆引脚定义 {#rj45-to-db9-cable-pinout}

![](/img/3f6e76a55153f3e0.webp)

| 信号 | Console 端口（DTE）RJ-45 | RJ-45 翻转线缆 RJ-45 引脚 | 适配器 DB-9 引脚 | 适配器 DB-25 引脚 | 信号 |
| :-- | --: | --: | --: | --: | :-- |
| RTS | 1 | 8 | 8 | 5 | CTS |
| DTR | 2 | 7 | 6 | 6 | DSR |
| TxD | 3 | 6 | 2 | 3 | RxD |
| Ground | 4 | 5 | 5 | 7 | Ground |
| Ground | 5 | 4 | 5 | 7 | Ground |
| RxD | 6 | 3 | 3 | 2 | TxD |
| DSR | 7 | 2 | 4 | 20 | DTR |
| CTS | 8 | 1 | 7 | 4 | RTS |

### RB M33G 附加串口排针 {#rb-m33g-additional-serial-header}

对于 RBM33G，可以将附加串口排针连接到 GPIO 引脚 U3\_RXD、GND、U3\_TXD 和 3V3。

### CCR 串口排针 {#ccr-serial-header}

Cloud Core Router 系列设备的 PCB 板上有一个串口排针，称为 J402 或 100。

以下是该连接器的引脚定义：

![](/img/ca319263debe6708.webp)

## 串口终端使用 {#serial-terminal-usage}

RouterOS 允许使用 `/system/serial-terminal` 命令与通过串口连接到路由器的设备和其他系统进行通信。所有键盘输入都会转发到串口，来自该端口的所有数据都会输出到连接的设备。

首先，必须有一个空闲串口。如果设备只有一个串口（例如所有 RouterBoard、WRAP/ALIX 板等），则必须禁用该串口上的系统控制台，才能将其用作连接其他设备（交换机、调制解调器等）的 **Serial Terminal**：

```ros
/system/console/disable 0
```

请务必仅禁用控制台，而不要删除它，因为如果实际删除了控制台，RouterOS 会在下次重启后重新创建它。

:::danger
**请注意，有一些需要注意的事项！请花时间理解这些限制，以避免在将设备连接到 RouterBoard 的串口时发生异常：**

- 按上述方式将 RouterBoard 上的 Serial0 端口重新配置后，将失去通过串口访问 RouterOS 控制台的能力。这意味着，如果无法再通过网络访问 RouterBoard，甚至可能需要重置其整个配置才能重新获得访问权限。
- 重启 RouterBoard 时，引导加载程序（RouterBOOT）始终会使用串口控制台（RouterBoard 上的 Serial0）发送一些启动消息，并提供对 RouterBOOT 菜单的访问。

  串口向连接的设备输出文本可能会使所连接的设备产生混淆。此外，在标准配置中，按 **ANY** 键即可进入 RouterBOOT 菜单。因此，如果串行设备在启动期间向 RouterBoard 的串口发送任意字符，RouterBoard 将进入 RouterBOOT 菜单，并且 **不会** 启动 RouterOS，除非你手动干预！

  你可以重新配置 RouterBOOT，使其仅在收到 <kbd>Delete</kbd> 字符时进入 RouterBOOT 菜单——使用此设置可降低路由器在重启时卡住的概率！

  或者，如果使用较新版本，可以使用 [“Silent boot”](/docs/getting-started/installation-and-upgrade/routerboot) 功能抑制串口接口上的任何输出，包括取消启动提示音。
:::

接下来，必须根据所连接设备的串口设置配置串口。使用以下命令可将串口设置为 19200 Baud 8N1。需要使用哪些设置取决于所连接的设备：

```ros
/port/set serial0 baud-rate=19200 data-bits=8 parity=none stop-bits=1
```

也可以尝试让 RouterOS 通过以下设置猜测所需的波特率：

```ros
/port/set serial0 baud-rate=auto
```

现在可以连接设备了（如果尚未连接）。通常，需要使用 [null modem cable](#serial-console-connections)（等同于以太网交叉线）。现在可以开始了：

```ros
/system/serial-terminal serial0
```

这将使你能够访问连接到 Serial0 端口的设备。*<kbd>Control</kbd>+<kbd>A</kbd>* 是前缀键，这意味着你将进入一个小型“菜单”。如果需要向远程设备发送 *<kbd>Control</kbd>+<kbd>A</kbd>* 字符，请按两次 *<kbd>Control</kbd>+<kbd>A</kbd>*。

如果要退出与串行设备的连接，请按 *<kbd>Control</kbd>+<kbd>A</kbd>*，然后按 ***Q***。这将返回 RouterOS 控制台。

:::danger
不要以错误的速度连接设备，并避免转储二进制数据。
:::

## 特殊登录 {#special-login}

特殊登录可用于访问通过串行线缆连接的另一台设备（例如交换机），方法是打开 telnet/ssh 会话，直接进入该设备（无需先登录 RouterOS）。

在本演示中，我们将使用两台 RouterBOARD 和一台 PC。

![](/img/060c953cc7f1d5cd.webp)

路由器 R1 和 R2 通过串行线缆连接，PC 通过以太网连接到 R1。假设我们要从 PC 通过串行线缆访问路由器 R2。为此，必须在 R1 上设置串行接口代理。这可以通过名为 **special-login** 的功能实现。

:::info
默认情况下，控制台绑定到串行端口。
:::

第一项任务是通过在 `/system/console` 菜单中禁用相应条目，将控制台与串行端口解绑：

```ros
[admin@MikroTik] /system/console> print
Flags: X - disabled, U - used, F - free
 #   PORT                                                                    TERM
 0 X serial0                                                                 vt102
```

下一步是添加新用户，本例中为 *serial*，并将其绑定到串口

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

要退出特殊登录模式，请按 <kbd>Ctrl</kbd>+<kbd>A</kbd> 和 Q

```ros
[admin@MikroTik] >
[Q - quit connection]      [B - send break]
[A - send Ctrl-A prefix]   [R - autoconfigure rate]

Connection to 10.1.101.146 closed.
```

:::danger
路由器重启并连接串口线后，路由器可能会停在 Bootloader 主菜单
:::

要解决此问题，需要允许通过 `<any>` 键访问 Bootloader 主菜单，改为使用 `<delete>`：

- 进入 bootloader 菜单。
- 按“k”进入启动键选项。
- 按“2”将按键更改为 `<delete>`。

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
