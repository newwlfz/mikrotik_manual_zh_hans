---
title: "Modbus"
source: https://manual.mikrotik.com/docs/7.25/internet-of-things/modbus
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "internet-of-things/mqtt"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

### 简介 {#introduction}

:::warning
目前，仅 [KNOT](https://mikrotik.com/product/knot)、[KNOT LR8G kit](https://mikrotik.com/product/knot_lr8g_kit) 和 [KNOT LR9G kit](https://mikrotik.com/product/knot_lr9g_kit) 支持 Modbus 协议（具有 RS-485 端口）。
:::
Modbus 是 IoT 架构中广泛使用的协议之一。

![](/img/09d4aa2b0f52e81e.webp)

可通过以下链接获取有关该协议的更多信息。

支持 Modbus 的设备应连接到 RS485 端口。该设备支持两线连接（A+/B-），使用 2 针接线端子。

![](/img/de1335a743cac8c4.webp)

请注意，两个引脚不得接反。颠倒“A”和“B”连接（极性错误）会导致通信失败。

另需注意 Modbus 线缆距离。如果线缆长度小于 50 米，通常不会出现问题。如果使用 50 米以上的线缆，应在线缆末端安装 120 Ohm 终端电阻。

KNOT 支持：

- **Modbus TCP server 场景**，允许使用第三方 Modbus 客户端通过 Modbus TCP/IP 连接（TCP 端口 502）向 KNOT 的 IP 地址发送功能码命令。可以使用任意 Modbus 客户端软件（互联网上有很多），也可以使用 Python 轻松编写或配置。在这种情况下，KNOT 会将 Modbus TCP/IP 请求“转换/桥接”为 Modbus RTU。
- **Modbus RTU controller 场景**（仅从 v**7.10** 开始可用），允许通过 Modbus/RTU 从 RouterOS 命令行直接发送功能码命令。

#### Modbus TCP 数据包结构 {#modbus-tcp-packet-structure}

可以通过此 [link](https://en.wikipedia.org/wiki/Modbus) 查找有关 Modbus 数据包结构的更多信息。

查询数据包由 Transaction ID、Protocol、Length、Unit ID、Function Code 和 Function Parameters 字段组成，最大大小为 260 字节。

- Transaction ID - 0 到 65535 的整数，用于标识特定查询的应答；
- Protocol - 0x0000 表示 Modbus；
- Length - 表示 Length 字段之后将跟随多少字节；
- Unit ID - 通常称为“Device address”，范围为 0x00-0xff。特定系统中的每个终端设备都应具有唯一 ID；
- Function Code - 描述将调用哪个功能。每个设备都有多个寄存器，这些功能用于与寄存器交互。代码由标准定义，但制造商也可以实现具有特定代码的自定义功能；
- Function Parameters/data - 通常指定寄存器地址、数据长度以及使用“write”功能时要写入的数据。
默认 Unit ID、Function Code 和 Parameter 可在具体产品的数据手册中找到。应答消息的结构类似，也应在产品数据手册中描述。

### 配置 {#configuration}

**子菜单：** `/iot modbus`

板卡连接到 Modbus 设备后，检查“modbus”端口配置（如果连接的 Modbus 设备需要其他值，可以更改 baud-rate）：

```ros
[admin@MikroTik] > /port print
Columns: DEVICE, NAME, CHANNELS, USED-BY, BAUD-RATE
# DEVICE  NAME    CHANNELS  USED-BY  BAUD-RATE
0         modbus         1  modbus        9600
1 1-1     modem          4                9600
```

默认情况下，名为“*modbus*”的端口会分配给 Modbus 服务，但服务本身处于禁用状态。要启用“Modbus”服务，请执行如下命令：

```ros
[admin@MikroTik] > /iot modbus print       
                disabled: yes
           hardware-port: modbus
                tcp-port: 502
                 timeout: 1000ms
  disable-security-rules: yes
[admin@MikroTik] > /iot modbus set disabled=no
```

此外，如果希望允许 Modbus 客户端通过 TCP(502)/IP 协议与 Modbus 服务器通信，需要确保设备的 IP+502 TCP 端口可访问。从 LAN 访问时默认应允许，因为没有防火墙规则限制此类访问。从外部访问时（如果“slave”设备从 WAN 侧连接），默认不允许。有关如何配置防火墙的信息，请参阅手册。不建议向所有人开放公网/WAN 访问；如果需要此类访问，应通过防火墙规则中的 **src-address** 参数指定允许的公网“客户端”的 source-ip 地址。否则，将向所有人开放 Modbus 端口以进行探测。

| 属性 | 说明 |
| --- | --- |
| **disabled** (yes \| no; Default: yes) | 启用或禁用 Modbus 功能。 |
| **hardware-port** (*list of string*; Default: modbus) | 为服务分配端口。使用默认的“modbus”端口。 |
| **tcp-port** (*integer:0..4294967295*; Default: 502)  | 指定设备用于 Modbus TCP 通信的 TCP 端口。 |
| **timeout**(*integer:0..1000*; Default: 1000) | 指定超时值，单位为毫秒。允许发送 Modbus 请求并接收回复的最长时间。如果请求与回复之间的时间超过配置值，则返回“failure”。 |
| **disable-security-rules** (yes \| no; Default: yes) | 启用或禁用安全规则功能。 |
| **interframe-gap** (*integer;* Default: 0) | Modbus 为“半双工”→ 同一时间只打开 Tx 或 Rx 窗口。根据标准，发送后必须跟随 3.5 个字符的静默间隔（不同 baud rate 下该值不同）。但并非所有 Modbus Slave 设备都遵循该规则，它们可能过早或过晚开始回发。这可能导致信息位丢失和通信失败。当“slave”设备不遵循标准规则时，可使用该参数。`interframe-gap=0` 表示 `~4 ms` 的 3.5 字符间隔。 |
| **rx-switch-offset** (integer;) | 定义 Modbus 窗口（引脚方向）从 Tx 切换到 Rx 的速度。 |

### 通过 Modbus RTU 发送功能码命令 {#sending-function-code-commands-via-modbus-rtu}

仅从 v**7.10.** 开始可用。该功能适用于“**Modbus RTU**”场景。此功能允许直接从 RouterOS 发送功能码命令（支持所有功能码）。对于“Modbus TCP”场景，必须使用第三方软件发送功能码命令。

**子菜单：** `/iot modbus transceive`

| 属性 | 说明 |
| --- | --- |
| **address** (*integer:0..255*；默认值：) | 指定设备地址或单元 ID。 |
| **function** (*integer:0..255*；默认值：) | 指定功能码。例如：<ul><li> function=3 → Read Holding Register 功能码；</li><li> function=6 → Write Single Holding Register 功能码。 </li></ul> |
| **data** (*string, max length 504*；默认值：) | 输入数据字符串，通常指定要发送的寄存器地址和数据。例如： <br/><ul><li> data=20000001 数据字符串长度为 4 字节。"0x2000" 是发送给寄存器的命令（长度为 2 字节），"0x0001"（长度为 2 字节）是设备地址。有关需要发送的确切数据字符串，请参阅 Modbus 设备规范。 </li></ul> |
| **values** (*integer:0..4294967295*；默认值：) | 发送数据的另一种方式（请参阅上方的 <strong>data</strong> 参数）。在这种情况下，指定的每个值表示数据载荷/字符串中的 1 字节。例如： <ul><li> values=32,0,0,1 </li></ul> 等同于 data=20000001 的输出。 <br/>32(dec)=0x20(hex)，0(dec)=0x00(hex)，0(dec)=0x00(hex)，1(dec)=0x01(hex) → 0x20000001。 |

以下示例展示如何使用 "transceive" 功能发送功能码 3 命令：

```ros
/iot modbus transceive address=1 function=3 data=20000001 
   address: 1
  function: 3
      data: 01030164
    values: 100
      time: apr/27/2023 14:05:15
    status: ok
```

从上述输出可以判断，Modbus 连接的设备返回了值 "100" 或数据 "01030164"（01→ 地址；03→ 功能码；01→ 字节数；64（十六进制转十进制=100）→ 返回值）。

### 通过 Modbus TCP 发送功能码 "3" 命令 {#sending-function-code-3-command-via-modbus-tcp}

仅针对功能码 3（此方式不适用于其他功能码），可以使用额外选项，如下所示：

```ros
[admin@device] > {:local output [/iot modbus read-holding-registers slave-id=0x03 num-regs=0x1 reg-addr=0x0 as-value once];:put [($output->"values")]}
2349
[admin@device] > {:local output [/iot modbus read-holding-registers slave-id=0x03 num-regs=0x5 reg-addr=0x0 as-value once];:put [($output->"values")]}
2353;3;500;75;38
```

可变化的参数包括 "reg-addr"（数据字符串中的地址）、"num-regs"（发送给寄存器的数据字符串命令/寄存器数量）和 "slave-id"（设备地址或单元 ID）。所有这些参数均取决于 Modbus 连接的设备支持哪些值。

### Modbus 安全性 {#modbus-security}

从 v**7.12** 开始可用。

**子菜单：** `/iot modbus security-rules`

Modbus 安全功能允许设置特定规则，以限制或允许访问连接到 Modbus 的设备。**该功能仅适用于 Modbus TCP 通信**（这些规则不适用于 Modbus RTU 通信）。它可以允许特定 IP 范围/网络访问特定功能码命令。

要启用该功能，请输入以下命令：

```ros
/iot modbus set disable-security-rules=no
```

启用该功能后，添加规则本身。例如：

```ros
/iot modbus security-rules add ip-range=0.0.0.0/0 allowed-function-codes=3,6
```

上述规则将允许任何可能的 IP 地址向连接到 Modbus 的设备发送功能码 3 和 6 命令。其他所有内容均受限制。

| 属性 | 描述 |
| --- | --- |
| **ip-range**（*Address/Netmask*；默认：） | 指定允许发送功能码命令的 IP 地址范围（或网络）。 |
| **allowed-function-codes**（*integer:0..4294967295*；默认：） | 指定仅可从配置的 ip-range 访问的功能码。 |
