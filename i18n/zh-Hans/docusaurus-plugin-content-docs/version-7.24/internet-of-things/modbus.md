---
sidebar_key: "internet-of-things/modbus"
sidebar_position: 4
title: "Modbus"
sidebar_label: "Modbus"
source: https://manual.mikrotik.com/docs/7.24/internet-of-things/modbus
captured_at: '2026-11-04T11:31:44+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### 简介 {#introduction}

:::warning
目前，只有 [KNOT](https://mikrotik.com/product/knot)、[KNOT LR8G kit](https://mikrotik.com/product/knot_lr8g_kit) 和 [KNOT LR9G kit](https://mikrotik.com/product/knot_lr9g_kit) 支持 Modbus 协议（具有 RS-485 端口）。
:::
IoT 架构中广泛使用的一种协议称为 Modbus。

![](/img/09d4aa2b0f52e81e.webp)

你可以通过此链接查找有关该协议的更多信息。

支持 Modbus 的设备应连接到 RS485 端口。该设备支持两线连接（A+/B-）（2 引脚端子块）。

![](/img/de1335a743cac8c4.webp)

必须注意不要混淆两个引脚。将 "A" 和 "B" 连接反接（极性错误）会导致通信失败。

另一点需要记住的是 Modbus 线缆距离。如果线缆长度小于 50 meters - 应该没有问题。如果使用 50+ meters 线缆，则应在电缆末端安装 120 Ohm 终端电阻。

KNOT 支持：

- **Modbus TCP 服务器场景**，它允许你使用第三方 Modbus 客户端，通过 Modbus TCP/IP 连接（TCP 端口 502）向 KNOT 的 IP 地址发送功能码命令。你可以使用任何 Modbus 客户端软件（互联网上有很多），也可以用 Python 轻松编写/配置。在这种情况下，KNOT 会将 Modbus TCP/IP 请求“转换/桥接”为 Modbus RTU。
- **Modbus RTU 控制器场景 **(仅从 v**7.10** 开始提供)，它允许你通过 Modbus/RTU 直接从 RouterOS 命令行发送功能码命令。

#### Modbus TCP 数据包结构 {#modbus-tcp-packet-structure}

你可以使用此[链接](https://en.wikipedia.org/wiki/Modbus)查找有关 Modbus 数据包结构的更多信息。

查询数据包由事务 ID、协议、长度、单元 ID、功能码和功能参数字段组成，最大大小为 260 bytes。

- 事务 ID - 从 0 到 65535 的整数，用于标识对特定查询的应答；
- 协议 - 0x0000 表示 Modbus；
- 长度 - 显示长度字段之后将跟随多少 bytes；
- 单元 ID - 通常称为“设备地址”，0x00-0xff。特定系统中的每个终端设备都应具有唯一 ID；
- 功能码 - 描述将调用哪个功能。每个设备都有多个寄存器，这些功能用于与寄存器交互。代码由标准定义，但制造商也可以使用特定代码实现自己的功能；
- 功能参数/数据 - 通常指定寄存器地址、数据长度，以及在使用 "write" 功能时要写入的数据。
默认单元 ID、功能码和参数可在特定产品的数据表中找到。应答消息的结构类似，也应在产品数据表中进行描述。

### 配置 {#configuration}

**子菜单：** `/iot modbus`

将板卡连接到 Modbus 设备后，检查 "modbus" 端口配置（如果所连接的 Modbus 设备期望其他值，可以更改 baud-rate）：

```ros
[admin@MikroTik] > /port print
Columns: DEVICE, NAME, CHANNELS, USED-BY, BAUD-RATE
# DEVICE  NAME    CHANNELS  USED-BY  BAUD-RATE
0         modbus         1  modbus        9600
1 1-1     modem          4                9600
```

默认情况下，名称为 "*modbus"* 的端口会分配给 Modbus 服务，但该服务本身处于禁用状态。要激活 "Modbus" 服务，你需要执行如下所示的命令：

```ros
[admin@MikroTik] > /iot modbus print       
                disabled: yes
           hardware-port: modbus
                tcp-port: 502
                 timeout: 1000ms
  disable-security-rules: yes
[admin@MikroTik] > /iot modbus set disabled=no
```

此外，当你希望允许 Modbus 客户端使用 TCP(502)/IP 协议与 Modbus 服务器通信时，需要确保设备的 IP+502 TCP 端口可访问。从 LAN 访问时，默认应被允许，因为没有任何防火墙规则限制此类访问。从外部访问时（如果 "slave" 设备从 WAN 侧连接）- 默认不允许。你可以使用手册查找有关如何配置防火墙的信息。不建议让所有人都能通过 public/WAN 访问；如果需要此类访问，你应指定允许的公共“客户端”的源 IP 地址（借助防火墙规则内的 **src-address** 参数）。否则，你就是在让所有人都能探测 Modbus 端口。

| 属性 | 描述 |
| --- | --- |
| **disabled**（yes \| no；默认值：yes） | 启用或禁用 Modbus 功能。 |
| **hardware-port**（*list of string*；默认值：modbus） | 为服务分配端口。使用默认 "modbus" 端口。 |
| **tcp-port**（*integer:0..4294967295*；默认值：502） | 指定设备将用于 Modbus TCP 通信的 TCP 端口。 |
| **timeout**（*integer:0..1000*；默认值：1000） | 指定超时值，单位为 milliseconds。允许发送 Modbus 请求并接收应答的最长时间。如果请求与应答之间的时间超过配置值，则返回 "failure"。 |
| **disable-security-rules**（yes \| no；默认值：yes） | 启用或禁用安全规则功能。 |
| **interframe-gap**（*integer;* 默认值：0） | Modbus 是“半双工” → 同一时间要么打开 Tx 窗口，要么打开 Rx 窗口。按照标准，在 Tx 之后，必须跟随一个 3.5-character（不同 baud rates 下会有所不同）的静默间隔。但是，并非所有 Modbus Slave 设备都遵循该规则，它们可能会更早或更晚开始 Tx。这可能导致信息位丢失和通信失败。此参数可用于 "slave" 设备不遵循标准规则的情况。`interframe-gap=0` 表示 `~4 ms` 的 3.5-character 间隔。 |
| **rx-switch-offset**（integer；） | 定义 Modbus 窗口从 Tx 切换到 Rx（引脚方向）的速度。 |

### 通过 Modbus RTU 发送功能码命令 {#sending-function-code-commands-via-modbus-rtu}

仅从 v**7.10.** 开始提供。这适用于 "**Modbus RTU**" 场景。此功能允许直接从 RouterOS 发送功能码命令（支持所有功能码）。对于 "Modbus TCP" 场景，你必须使用第三方软件来发送功能码命令。

**子菜单：** `/iot modbus transceive`

| 属性 | 描述 |
| --- | --- |
| **address**（*integer:0..255*；默认值：） | 指定设备地址或单元 ID。 |
| **function**（*integer:0..255*；默认值：） | 指定功能码。例如：function=3 → Read Holding Register 功能码；function=6 → Write Single Holding Register 功能码。 |
| **data**（*string, max length 504*；默认值：） | 输入数据字符串，通常指定寄存器地址和要发送的数据。例如：data=20000001 数据字符串长度为 4 bytes。"0x2000" 是发往寄存器的命令（长度为 2 bytes），而 "0x0001"（长度为 2 bytes）是设备地址。有关需要发送的确切数据字符串，请参阅 Modbus 设备的规格。 |
| **values**（*integer:0..4294967295*；默认值：） | 发送数据的另一种方式（参见上方的 **data** 参数）。在这种情况下，指定的每个值代表数据载荷/字符串的 1 byte。例如：values=32,0,0,1 等同于 data=20000001 的输出。32(dec)=0x20(hex)、0(dec)=0x00(hex)、0(dec)=0x00(hex)、1(dec)=0x01(hex) → 0x20000001。 |

使用 "transceive" 功能发送功能码 3 命令的示例：

```ros
/iot modbus transceive address=1 function=3 data=20000001 
   address: 1
  function: 3
      data: 01030164
    values: 100
      time: apr/27/2023 14:05:15
    status: ok
```

从上面的输出可以看出，连接 Modbus 的设备回复了值 "100" 或数据 "01030164"（01→ 地址；03→ 功能码；01→ bytes 数量；64（hex 转 dec=100）→ 应答）。

### 通过 Modbus TCP 发送功能码 "3" 命令 {#sending-function-code-3-command-via-modbus-tcp}

专门针对功能码 3（这不适用于任何其他功能码），你可以使用如下所示的附加选项：

```ros
[admin@device] > {:local output [/iot modbus read-holding-registers slave-id=0x03 num-regs=0x1 reg-addr=0x0 as-value once];:put [($output->"values")]}
2349
[admin@device] > {:local output [/iot modbus read-holding-registers slave-id=0x03 num-regs=0x5 reg-addr=0x0 as-value once];:put [($output->"values")]}
2353;3;500;75;38
```

可以变化的参数是 "reg-addr"（数据字符串中的地址）、"num-regs"（发往寄存器的数据字符串命令/寄存器数量）和 "slave-id"（设备地址或单元 ID）。它们都取决于所连接的 MODBUS 设备支持哪些值。

### Modbus 安全 {#modbus-security}

从 v**7.12** 开始提供。

**子菜单：** `/iot modbus security-rules`

Modbus 安全功能允许你设置特定规则，这些规则可以限制或允许对连接 Modbus 的设备的访问。**这仅适用于 Modbus TCP 通信**（这些规则不会用于 Modbus RTU 通信）。它可以允许特定 IP 范围/网络访问特定功能码命令。

要启用该功能，请输入命令：

```ros
/iot modbus set disable-security-rules=no
```

启用该功能后，添加规则本身。例如：

```ros
/iot modbus security-rules add ip-range=0.0.0.0/0 allowed-function-codes=3,6
```

上述规则将允许任何可能的 IP 地址向连接 Modbus 的设备发送功能码 3 和 6 命令。其他所有内容都会受到限制。

| 属性 | 描述 |
| --- | --- |
| **ip-range**（*Address/Netmask*；默认值：） | 指定允许发送功能码命令的 IP 地址范围（或网络）。 |
| **allowed-function-codes**（*integer:0..4294967295*；默认值：） | 指定只能从配置的 ip-range 访问的功能码。 |
