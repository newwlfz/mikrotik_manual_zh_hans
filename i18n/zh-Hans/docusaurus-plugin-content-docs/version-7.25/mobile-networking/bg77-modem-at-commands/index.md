---
sidebar_key: "mobile-networking/bg77-modem-at-commands/index"
sidebar_position: 2
title: "BG77 调制解调器 AT 命令"
sidebar_label: "BG77 调制解调器 AT 命令"
source: https://manual.mikrotik.com/docs/7.25/mobile-networking/bg77-modem-at-commands
captured_at: '2026-11-04T11:19:57+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

#

# 概述 {#overview}

本简短指南将帮助您了解如何排查 CAT-M/NB-IoT 连接的问题/故障。使用调制解调器的 “AT” 命令可以获取大量有关连接的信息。按定义，“AT” 表示“attention”（注意）。每个命令字符串都以 “AT” 为前缀，并且在 “AT” 之后可以拼接多个独立命令。

请查看下面的示例，以更好地了解如何发起这些命令以及可以使用它们获取哪些信息。

:::info
 移动网络由 ISP 管理。如果连接出现任何问题，我们建议先联系 ISP，并首先确认他们支持/允许该连接或该设置。如果您决定（在未咨询 ISP 的情况下）使用 AT 命令更改配置，则需自行承担风险。
:::

## 发起 AT 命令 {#initiating-at-commands}

### 选项 A {#option-a}

要发送命令，您必须使用 CLI。

打开终端并输入以下内容：

```ros
[admin@MikroTik] > system serial-terminal port=modem channel=2
```

请注意所使用的端口和通道。选择 PPP-OUT 接口所使用的端口和通道。在我们的示例中，端口为 “modem”，数据通道为 “2”。

命令发起后，应显示以下输出，此时您可以输入 AT 命令：

```ros
[admin@MikroTik] > system serial-terminal port=modem channel=2

[Ctrl-A is the prefix key]

at+cpin?
+CPIN: READY

OK 
```

在上面的示例中，使用了 AT 命令 “at+cpin?”，并收到应答 “+CPIN: READY”。

### 选项 B {#option-b}

发送 AT 命令的第二种方式是通过 ppp-client 接口：

```ros
[admin@MikroTik] > interface ppp-client at-chat input="AT+CPIN\?"
number: 0
  output: +CPIN: READY
```

您可以获得与 **选项 A** 相同的结果。

## AT 命令 {#at-commands}

### at {#at}

简单的 ***at*** 命令用于检查模块（设备）与应用程序之间的通信。

```ros
[Ctrl-A is the prefix key]

at

OK 
```

当返回 “OK” 时，表示模块已成功响应。

### at+cpin? {#atcpin}

此命令用于检查 SIM 卡的状态。

```ros
[Ctrl-A is the prefix key]

at+cpin?
+CPIN: READY

OK 
```

状态 “+CPIN: READY” 表示 SIM 卡已正确安装。

如果使用了 SIM PIN，您应收到应答 “+CPIN: SIM PIN” → 在这种情况下，您可以通过命令 ***at+cpin="xxxx"*** 解锁，其中 ***xxxx*** 是 PIN 码。

如果收到响应 “+CME ERROR: SIM not inserted” → 请再次确认 SIM 卡已正确安装到 SIM 卡槽中。

### at+cfun? {#atcfun}

“CFUN” 命令用于检查功能模式。此命令可能会有不同的响应。

```ros
[Ctrl-A is the prefix key]   

at+cfun?
+CFUN: 1

OK
```

当状态为 “+CFUN: 1” 时，表示设备已设置为完全功能模式。建议使用此模式。

在众多其他响应中，例如，您可能会收到 “+CFUN: 4”，这表示设备已设置为飞行模式，其中 Tx、Rx、LTE 和 GNSS 服务均被禁用。

您可以使用命令 ***at+cfun=1*** 手动将模式设置为完全功能。

### at+cops? {#atcops}

**at+cops?** 命令用于检查当前网络连接。

```ros
[Ctrl-A is the prefix key]      

at+cops?
+cops: 0,0,"LMT",8

OK
```

以以上示例为参考，我们可以看到收到了响应 “0,0,"LMT",8”。

响应中的第一个值决定使用的是“自动”还是“手动”模式。当 ISP 连接设置为“自动”时，该值将显示为 “0”。当 ISP 连接设置为“手动”时，该值将显示为 “1”。

响应中的第二个值表示 ISP 名称格式。如果为 “0”，表示 ISP 名称采用“长格式字母数字”。如果为 “1”，表示 ISP 名称采用“短格式字母数字”。

响应的第三部分是 ISP 名称本身。

响应的第四部分表示所使用的技术。“8” 代表 eMTC (CAT-M)，“9” 代表 NB-IoT。

### at+cops=? {#atcops-1}

**at+cops=?** 用于获取所有可用 ISP 的列表。此命令可能需要一些时间（最多约 1 分钟）才能显示结果。

```ros
[Ctrl-A is the prefix key]      

at+cops=?
+cops: (1,"LMT","LMT","24701",9),(2,"LMT","LMT","24701",8),,(0,1,2,3,4),(0,1,2)

OK
```

您可以通过命令 ***at+cops=mode,format,"provider"*** 手动设置希望连接的 ISP，其中 ***mode*** 是所使用的模式（0→ 自动网络选择；1→ 手动网络选择），**format** 是 ISP 名称格式（0→ 长字母数字格式；1→ 短字母数字格式；2→ 数字格式），而 “***provider***” 是 ISP 名称（采用所选格式）。例如，要从列表中选择网络，请使用命令 ***at+cops=1,1,"LMT"***。

要自动选择 ISP，请使用命令 ***at+cops=0***。

### at+creg? {#atcreg}

***at+creg?*** 命令用于检查网络注册状态。

```ros
[Ctrl-A is the prefix key]              

at+creg?
+CREG: 0,1

OK
```

第一个值显示网络注册非请求结果码是启用还是禁用（0→ 禁用，1→ 启用；2→ 启用 + 位置信息）。第二个值显示电路模式注册状态（0→ 未注册/设备未搜索要注册的运营商；1→ 已注册/归属网络；2→ 未注册，但正在尝试搜索要注册的运营商；3→ 注册被拒绝；4→ 未知；5→ 已注册并漫游）。

如果返回的值超过 2 个，表示网络注册和位置信息非请求结果码已启用。第二个值将以十六进制格式显示两字节的位置区码，第三个值将以十六进制格式显示四字节的 GERANE/E-UTRAN 小区 ID，最后一个值将显示服务小区的接入技术（“8” 表示 CAT-M，“9” 表示 NB-IoT）。

### at+csq {#atcsq}

***at+csq*** 命令返回接收信号强度指示（RSSI）和信道误码率（BER）值。只有在网络注册完成后，此命令才会返回正确的值。

```ros
[Ctrl-A is the prefix key]           

at+csq
+csq: 25,99

OK
```

第一个值是 RSSI (dBm)：

| 值 | RSSI |
| --- | --- |
| 0 | -113 dBm 或更低 |
| 1 | -111 dBm |
| 2-30 | -109 至 -53 dBm |
| 31 | -51 dBm 或更高 |
| 99 | 未知/无法检测（未找到网络） |

第二个值是 BER (%)：

| 值 | BER |
| --- | --- |
| 0 | &lt; 0,2 % |
| 1 | 0,2 % &lt; 0,4 % |
| 2 | 0,4 % &lt; 0,8 % |
| 3 | 0,8 % &lt; 1,6 % |
| 4 | 1,6 % &lt; 3,2 % |
| 5 | 3,2 % &lt; 6,4 % |
| 6 | 6,4 % &lt; 12,8 % |
| 7 | 12,8 % &lt; |
| 99 | 未知/无法检测 |

根据示例/输出 “***+csq: 25,99***”，结果对应 RSSI~63 dBm，BER 参数无法检测。

### at+qnwinfo {#atqnwinfo}

此命令返回有关接入技术、ISP 和所选频段的信息。只有在网络注册完成后，此命令才会返回正确的信息。

```ros
[Ctrl-A is the prefix key]              

at+qnwinfo
+QNWINFO: "eMTC","24701","LTE BAND 20",6300

OK
```

根据上面的示例，可以看到当前模块使用 “eMTC” (CAT-M)，ISP 为 “24701”（数字格式，代表 “LMT”），LTE Band 20，信道 ID 为 “6300”。

### at+qcsq {#atqcsq}

**at+qcsq** 命令返回有关当前 ISP 连接信号强度以及所用技术的信息。

```ros
[Ctrl-A is the prefix key]                 

at+qcsq
+QCSQ: "eMTC",-62,-87,111,-12

OK
```

返回的第一个参数是 “eMTC”，表示模块所使用的技术（CAT-M）。如果无法确定网络（不确定）→ 将返回 “NOSERVICE”。

其余参数显示连接的信号强度。

当技术被识别为 “NBIoT” 或 “eMTC” (CAT-M) 时：

- 第一个数值显示接收信号强度（LTE RSSI）；
- 第二个值显示参考信号接收功率（LTE RSRP）；
- 第三个值显示信号与干扰加噪声比（LTE SINR）→ 该值以 SINR 的对数值显示，并且该值为 1/5 dB（结果可能在 0-250 范围内，对应 -20 dB 至 +30 dB 范围）；
- 第四个值显示参考信号接收质量（LTE RSRQ）。
根据上面的示例，RSSI=-62 dBm，RSRP=-87 dBm，SINR=111(111/5-20)~2 dB，RSRQ=-12 dB。

### at+qcfg="iotopmode"? {#atqcfgiotopmode}

此命令用于检查连接 ISP 时使用哪种技术。调制解调器可以仅在 CAT-M 模式下工作、仅在 NB-IoT 模式下工作，或同时支持两者。

```ros
[Ctrl-A is the prefix key]   

at+qcfg="iotopmode"?
+QCFG: "iotopmode",2

OK
```

您可以使用命令 ***at+qcfg="iotopmode"****,****mode***,***effect*** 将 SIM 卡锁定为仅在特定模式下工作，其中 ***mode*** 是模式（0→ 仅 CAT-M；1→ 仅 NB-IoT；2→ 两者），而 ***effect*** 是何时生效（0→ 重启后生效；1→ 立即生效）。

为加快网络搜索，建议执行命令 ***at+cfun=0***（关闭射频），然后使用上述命令。之后，执行 ***at+cfun=1,1***（重新开启射频并重置模块以使其生效）。

### at+qcfg="band"? {#atqcfgband}

此命令用于检查当前接受哪些频段/频率。

```ros
[Ctrl-A is the prefix key]   

at+qcfg="band"?
+QCFG: "band",0x0,0x100002000000000f0e189f,0x10004200000000090e189f

OK
```

“qcfg” 响应中的第一个值显示一个十六进制值，用于指定 **GSM 频段**。此值与 Quectel BG77 模块无关。可以忽略此值。

第二个十六进制值指定 **CAT-M 频段**（即 0x100002000000000f0e189f）。如果设置为 0，表示不更改频段。例如，如果为 0x15，则表示 → 0x01(LTE Band 1)+0x04(LTE Band 3)+0x10(LTE Band 5)。

| 值 | 频段 |
| --- | --- |
| 0 | 不变 |
| 0x1 | LTE 频段 1 |
| 0x2 | LTE 频段 2 |
| 0x4 | LTE 频段 3 |
| 0x8 | LTE 频段 4 |
| 0x10 | LTE 频段 5 |
| 0x80 | LTE 频段 8 |
| 0x800 | LTE 频段 12 |
| 0x1000 | LTE 频段 13 |
| 0x20000 | LTE 频段 18 |
| 0x40000 | LTE 频段 19 |
| 0x80000 | LTE 频段 20 |
| 0x1000000 | LTE 频段 25 |
| 0x2000000 | LTE 频段 26 |
| 0x4000000 | LTE 频段 27 |
| 0x8000000 | LTE 频段 28 |
| 0x20000000000000000 | LTE 频段 66 |
| 0x1000000000000000000000 | LTE 频段 85 |
| 0x100002000000000F0E189F | 上述所有受支持的频段 |

最后一个十六进制值指定 **NB-IoT 频段**（即 0x10004200000000090e189f）。如果设置为 0，表示不更改频段。例如，如果为 0x15，则表示 → 0x01(LTE Band 1)+0x04(LTE Band 3)+0x10(LTE Band 5)。

| 值 | 频段 |
| --- | --- |
| 0 | 不变 |
| 0x1 | LTE 频段 1 |
| 0x2 | LTE 频段 2 |
| 0x4 | LTE 频段 3 |
| 0x8 | LTE 频段 4 |
| 0x10 | LTE 频段 5 |
| 0x80 | LTE 频段 8 |
| 0x800 | LTE 频段 12 |
| 0x1000 | LTE 频段 13 |
| 0x20000 | LTE 频段 18 |
| 0x40000 | LTE 频段 19 |
| 0x80000 | LTE 频段 20 |
| 0x1000000 | LTE 频段 25 |
| 0x8000000 | LTE 频段 28 |
| 0x20000000000000000 | LTE 频段 66 |
| 0x400000000000000000 | LTE 频段 71 |
| 0x1000000000000000000000 | LTE 频段 85 |
| 0x10004200000000090E189F | 上述所有受支持的频段 |

您可以使用命令 ***at+qcfg="band",GSM_band,CAT_M_band,NB_IoT_band,effect*** 更改频段，其中 ***GSM_band*** 是 GSM 频段（可保留为 0x0），***CAT_M_band*** 是 CAT-M 频段，***NB_IoT_band*** 是 NB-IoT 频段，而 ***effect*** 表示是立即生效（1）还是在模块重启后生效（0）。

要将模块设置为支持所有频段，请使用以下命令：

```ros
[Ctrl-A is the prefix key]     

at+qcfg="band",0x0,0x100002000000000f0e189f,0x10004200000000090e189f,1

OK
```

为加快网络搜索，建议执行命令 ***at+cfun=0***（关闭射频），然后使用上述命令。之后，执行 ***at+cfun=1,1***（重新开启射频并重置模块以使其生效）。

### at+qgpscfg="priority",(0-1) {#atqgpscfgpriority0-1}

需要了解的是，通过 CAT-M/NB-IoT 进行的数据传输与 GNSS 无法同时工作（BG77 模块中的 WWAN 和 GNSS 接收链路共享某些硬件模块，这意味着该模块不支持 WWAN 和 GNSS 的并发操作。）。这就是引入 ***at+qgpscfg="priority",(0-1)*** 命令的原因。

可以使用以下命令更改优先级：

```ros
[Ctrl-A is the prefix key]    

at+qgpscfg="priority",0

OK

at+qgpscfg="priority",1

OK
```

***at+qgpscfg="priority",0*** 命令将 **GNSS 优先级设为最高**。

***at+qgpscfg="priority",1*** 命令将 **LTE (WWAN) 优先级设为最高**。

当设备处于 **LTE (WWAN) 优先级模式** 时，只有在 RRC 释放（Radio Resource Control 协议有许多功能，但主要负责连接建立及其释放功能）且 LTE (WWAN) 进入空闲休眠模式时，GNSS 定位请求才能成功完成。只有在 eDRX 受支持且未被 ISP 阻止的条件下，LTE (WWAN) 和 GNSS 才能在 **LTE (WWAN) 优先级模式** 下共存。如果网络连接建立（RRC 处于连接状态）且数据开始流向服务器 → GNSS 将被推迟，直到数据传输结束并且 RCC 释放。如果 eDRX 受支持且模块进入此模式（数据传输结束）→ 将发送 GNSS 坐标。一旦数据再次开始流向服务器，GNSS 将被推迟，直到设备再次进入 eDRX 模式。

当设备处于 **GNSS 优先级模式** 时，GNSS 定位请求在所有 WWAN 状态下都能成功。如果设备处于 RCC 连接状态 → 它将释放 RCC 连接并启动 GNSS 会话。之后，如果有 WWAN 数据要发送 → 将再次发起 RCC 连接。
