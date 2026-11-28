---
title: "SMS"
description: "本页介绍 MikroTik RouterOS 中的 SMS 功能，该功能支持通过 AT 命令与 GSM 调制解调器通信，以发送和接收 SMS 消息。内容涵盖发送方法、port、phone number、message encoding 等参数，以及用于与网络运营商交互的 USSD 消息支持。"
tags:
  - 'sms'
  - 'at-commands'
  - 'modem'
source: https://manual.mikrotik.com/docs/7.25/mobile-networking/sms
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "memory"
---

## 摘要 {#summary}

可以将 GSM 调制解调器连接到 RouterOS 设备，并使用它发送和接收 SMS 消息。RouterOS 将此类调制解调器列为串口，并显示在 `/port/print` 列表中。GSM 标准定义了用于发送 SMS 消息的 AT 命令，并定义了这些命令中消息的编码方式。`'/tool/sms/send'` 使用标准 GSM AT 命令发送 SMS。

## Sending

**子菜单：** `/tool/sms/send`

### **示例** {#example}

向 ppp 接口发送命令：

```ros
/tool/sms/send usb3 "20000000" \ message="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#\$%^&*(){}[]\"'~"
```

对于 LTE 接口，请在 port 字段中使用 LTE 接口名称：

```ros
/tool/sms/send lte1 "20000000" \ message="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#\$%^&*(){}[]\"'~"
```

| Parameter | Description |
| :-- | :-- |
| **port** (*string*) | `/port` 中连接 GSM 调制解调器的端口名称。 |
| **phone-number** (*string*) | 接收方电话号码。允许的字符为“0123456789\*#abc”。如果第一个字符是“+”，则电话号码类型设置为 *international*，否则设置为 *unknown*。 |
| **channel** (*integer*) | 用于发送的调制解调器通道。 |
| **message** (*string*) | 消息内容。消息使用 GSM 7 编码（当前不支持 UCS2），因此消息长度限制为 160 个字符。字符 `^{}\\[]~` 是扩展 GSM 7-bit 字符，每个字符占用两个字符位，存在时会低于 160 字符的有效限制。 |
| **smsc** (*string*) |  |
| **type** (*string*) | 如果设置为 *class-0*，则发送 class 0 SMS 消息。该消息会立即显示，不会存储在手机中。 |
| **sms-storage** (*string*) | 选择保存已接收 SMS 的存储位置（modem/sim） |
| **status-report-request** (*yes \| no*；Default: yes) | 设置为“no”时，不请求用于指示文本消息是否成功发送给接收方的确认消息。 |

## USSD 消息 {#ussd-messages}

USSD（Unstructured Supplementary Service Data）消息可用于与移动网络运营商通信，以接收附加信息、启用附加服务或为预付费卡充值。USSD 消息可以通过 AT 命令处理（命令可能不同，甚至在某些调制解调器上可能被阻止）。

必须启用 **3G 或 GSM 网络模式** 才能使用该功能，因为仅 LTE 模式下不支持该功能（**R11e-LTE** 调制解调器会自动切换到 3G 模式以发送 USSD 消息）。

PDU（Protocol Data Unit）消息及其解密版本会输出到 LTE 调试日志中。

### **示例** {#example-1}

检查 LTE 调试日志是否已启用：

```ros
/system/logging/print
Flags: X - disabled, I - invalid, * - default 
# TOPICS ACTION PREFIX 
0 * info memory 
1 * error memory 
2 * warning memory 
3 * critical echo 
```

如果没有日志条目，请运行以下命令添加：

```ros
/system/logging/add topics=lte,!raw

/system/logging/print
Flags: X - disabled, I - invalid, * - default 
# TOPICS ACTION PREFIX 
0 * info memory 
1 * error memory 
2 * warning memory 
3 * critical echo 
4 lte,!raw memory 
```

接收来自 **\*245#** 的账户状态

```ros
/interface/lte/at-chat lte1 input="AT+CUSD=1,\"*245#\",15"
output: OK
/log/print
11:51:20 lte,async lte1: sent AT+CUSD=1,"*245#",15 
11:51:20 lte,async lte1: rcvd OK 
11:51:23 lte,async,event +CUSD: 0,"EBB79B1E0685E9ECF4BADE9E03", 0 
11:51:23 gsm,info USSD: konta atlikums
```

## Receiving

RouterOS 还支持接收 SMS 消息、执行脚本，甚至可以回复发送方。

在路由器接收 SMS 之前，需要在 `/tool/sms` 菜单中进行相关配置。以下参数可配置：

| 参数 | 说明 |
| :-- | :-- |
| **allowed-number** (*string*; Default: "") | 允许执行命令的发送方号码，必须指定国家代码，例如 +371XXXXXXX |
| **channel** (*integer*; Default: **0**) | 用于接收的调制解调器通道。 |
| **keep-max-sms** (*integer*; Default: **0**) | 将保存的消息最大数量。如果设置的值大于 SIM 支持的数量，将无法接收新消息。从 RouterOS v6.44.6 起由 `auto-erase` 参数替代 |
| **auto-erase** (*yes \| no*; Default: **no**) | 自动读取 SIM 存储容量。当 `auto-erase=no` 时，如果存储已满，将无法接收新 SMS。设置 `auto-erase=yes` 可自动删除最早接收的 SMS，为新消息释放空间。从 v6.44.6 起可用 |
| **port** (*string*; Default: (**unknown**)) | 调制解调器端口（调制解调器一次只能由一个进程使用“/port> print”） |
| **receive-enabled** (*yes \| no*; Default: **no**) | 必须启用才能接收消息 |
| **secret** (*string*; Default: "") *[sensitive](/docs/7.24/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 密码，必填 |
| **polling**(*yes \| no*; Default: **no**) | 每 10 秒检查调制解调器是否有新 SMS，而不是仅在收到调制解调器命令后更新收件箱。从 v7.16 起可用 |
| **sim-pin**(string; Default:) *[sensitive](/docs/7.24/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | SIM 卡的 PIN 码。 |

### 查看已接收消息的基本示例配置 {#basic-example-configuration-to-be-able-to-view-received-messages}

```ros
/tool/sms/set receive-enabled=yes port=lte1

/tool/sms/print 
           status: running
  receive-enabled: yes
             port: lte1
          channel: 0
           secret: 
   allowed-number: 
       auto-erase: no
          sim-pin: 
        last-ussd: 
```

### **收件箱** {#inbox}

**子菜单：** `/tool/sms/inbox`

如果已启用读取器，将在此子菜单中看到传入消息：

只读属性：

| 属性 | 说明 |
| :-- | :-- |
| **phone** (*string*) | 发送方电话号码。 |
| **message** (*string*) | 消息正文 |
| **timestamp** (*time*) | 接收消息的时间。该时间是运营商发送的时间，不是路由器的本地时间。 |
| **type** (*string*) | 消息类型 |

### **语法** {#syntax}

```ros
 :cmd SECRET script NAME [[ VAR[=VAL] ] ... ]
```

- **SECRET** - 密码
- **NAME** - `/system/script` 中可用脚本的名称
- **VAR** - 将传递给脚本的变量（可作为 VAR 或 VAR=value 传递），以空格分隔。

其他注意事项：

- \*如有必要，参数可以放在引号中："VAR"="VAL"。
- \*不支持对值进行转义（VAR="\""）。
- \*不支持合并 SMS，每条 SMS 都将单独处理。
- \*不支持 16Bit unicode 消息。
- \* SMS 使用标准 GSM7 字母表解码，因此无法使用其他编码发送，否则将被错误解码。

### **示例** {#examples}

#### Wrong

```ros
:cmd script mans_skripts
:cmd slepens script mans skripts
:cmd slepens script mans_skripts var=
:cmd slepens script mans_skripts var= a
:cmd slepens script mans_skripts var=a a
```

#### Right

```ros
:cmd slepens script mans_skripts
:cmd slepens script "mans skripts"
:cmd slepens script mans_skripts var
:cmd slepens script mans_skripts var=a
:cmd slepens script mans_skripts var="a a" 
```

## Debugging

`/tool/sms/send` 命令会记录写入和读取的数据。日志使用标签 *gsm,debug,write* 和 *gsm,debug,read*。详情请参阅 `/system/logging`。

## 实现细节 {#implementation-details}

使用 *AT+CMGS* 和 *AT+CMGF* 命令。端口在命令执行期间被占用，不能被其他 RouterOS 组件并发使用。消息发送过程可能需要较长时间。该过程会在一分钟后超时，在初始 AT 命令交换期间会在两秒后超时。
