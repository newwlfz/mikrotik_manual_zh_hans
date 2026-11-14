---
sidebar_key: "mobile-networking/sms"
sidebar_position: 4
title: "短信"
sidebar_label: "短信"
description: "本页介绍 MikroTik RouterOS 中的 SMS 功能，可通过 AT 命令实现 GSM 调制解调器通信，以发送和接收 SMS 消息。内容涵盖发送方式、port、电话号码、消息编码等参数，以及用于与网络运营商交互的 USSD 消息支持。"
tags:
  - 'sms'
  - 'at-commands'
  - 'modem'
source: https://manual.mikrotik.com/docs/mobile-networking/sms
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#summary}

可以将 GSM 调制解调器连接到 RouterOS 设备，并使用它收发短信。RouterOS 会将此类调制解调器列为串口，并出现在 `/port/print` 列表中。GSM 标准定义了用于发送短信的 AT 命令，以及在这些命令中消息应如何编码。`'/tool/sms/send'` 使用标准 GSM AT 命令发送短信。

## 发送 {#sending}

**子菜单：** `/tool/sms/send`

### **示例** {#example}

为 ppp 接口发送命令：

```ros
/tool/sms/send usb3 "20000000" \ message="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#\$%^&*(){}[]\"'~"
```

对于 LTE 接口，请在 port 字段中使用 LTE 接口名称：

```ros
/tool/sms/send lte1 "20000000" \ message="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#\$%^&*(){}[]\"'~"
```

| 参数 | 说明 |
| :-- | :-- |
| **port** (*string*) | GSM 调制解调器所连接的 `/port` 中的端口名称。 |
| **phone-number** (*string*) | 接收方电话号码。允许的字符为 "0123456789\*#abc"。如果第一个字符为 "+"，则电话号码类型设置为 *international*，否则设置为 *unknown*。 |
| **channel** (*integer*) | 用于发送的调制解调器通道。 |
| **message** (*string*) | 消息内容。使用 GSM 7 编码（当前不支持 UCS2），因此消息长度限制为 160 个字符。字符 `^{}\\[]~` 是扩展的 GSM 7 位字符，每个占用两个字符位置，因此出现这些字符时有效上限会低于 160。 |
| **smsc** (*string*) |  |
| **type** (*string*) | 如果设置为 *class-0*，则发送 class 0 短信。该消息会立即显示，且不会存储在手机中。 |
| **sms-storage** (*string*) | 选择保存接收短信的存储位置（modem/sim） |
| **status-report-request** (*yes \| no*；默认：yes) | 设置为 "no" 则不请求确认消息，该确认消息用于指示短信是否已成功发送给接收方。 |

## USSD 消息 {#ussd-messages}

USSD（Unstructured Supplementary Service Data，非结构化补充业务数据）消息可用于与移动网络运营商通信，以获取附加信息、开通附加服务或为预付费卡充值。可以通过 AT 命令处理 USSD 消息（不同调制解调器的命令可能不同，某些调制解调器甚至可能屏蔽这些命令）。

**要使用此功能，必须激活 3G 或 GSM 网络模式**，因为仅在 LTE 模式下不支持该功能（**R11e-LTE** 调制解调器会自动切换到 3G 模式以发送 USSD 消息）。

PDU（Protocol Data Unit，协议数据单元）消息及其解密后的版本会打印在 LTE 调试日志中。

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

从 **\*245#** 获取账户状态

```ros
/interface/lte/at-chat lte1 input="AT+CUSD=1,\"*245#\",15"
output: OK
/log/print
11:51:20 lte,async lte1: sent AT+CUSD=1,"*245#",15 
11:51:20 lte,async lte1: rcvd OK 
11:51:23 lte,async,event +CUSD: 0,"EBB79B1E0685E9ECF4BADE9E03", 0 
11:51:23 gsm,info USSD: konta atlikums
```

## 接收 {#receiving}

RouterOS 也支持接收短信，可以执行脚本，甚至可以回复发送方。

在路由器能够接收短信之前，需要在 `/tool/sms` 菜单中进行相关配置。可配置以下参数：

| 参数 | 说明 |
| :-- | :-- |
| **allowed-number** (*string*；默认："") | 允许执行命令的发送方号码，必须指定国家代码，例如 +371XXXXXXX |
| **channel** (*integer*；默认：**0**) | 用于接收的调制解调器通道。 |
| **keep-max-sms** (*integer*；默认：**0**) | 将保存的最大消息数量。如果设置的值超过 SIM 卡支持的数量，则不会接收到新消息。从 RouterOS v6.44.6 起，该参数已被 `auto-erase` 参数取代 |
| **auto-erase** (*yes \| no*；默认：**no**) | SIM 存储大小会被自动读取。当 `auto-erase=no` 时，如果存储已满，则不会接收新短信。设置 `auto-erase=yes` 可自动删除最旧的已接收短信，为新短信腾出空间。从 v6.44.6 起可用 |
| **port** (*string*；默认：(**unknown**)) | 调制解调器端口（调制解调器只能被一个进程使用 "/port> print"） |
| **receive-enabled** (*yes \| no*；默认：**no**) | 必须开启才能接收消息 |
| **secret** (*string*；默认："") *[sensitive](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 密钥密码，必填 |
| **polling**(*yes \| no*；默认：**no**) | 每 10 秒检查调制解调器是否有新短信，而不是仅在收到来自调制解调器的命令后才更新收件箱。从 v7.16 起可用 |
| **sim-pin**(string；默认：) *[sensitive](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | SIM 卡的 PIN 码。 |

### 能够查看已接收消息的基本示例配置 {#basic-example-configuration-to-be-able-to-view-received-messages}

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

如果已启用接收功能，你将在此子菜单中看到收到的消息：

只读属性：

| 属性 | 说明 |
| :-- | :-- |
| **phone** (*string*) | 发送方的电话号码。 |
| **message** (*string*) | 消息正文 |
| **timestamp** (*time*) | 消息接收时间。该时间是运营商发送的时间，而非路由器的本地时间。 |
| **type** (*string*) | 消息类型 |

### **语法** {#syntax}

```ros
 :cmd SECRET script NAME [[ VAR[=VAL] ] ... ]
```

- **SECRET** - 密码
- **NAME** - 在 `/system/script` 中可用的脚本名称
- **VAR** - 将传递给脚本的变量（可以以 VAR 或 VAR=value 形式传递），以空格分隔。

其他注意事项：

- \*如有必要，可以将参数放入引号中 "VAR"="VAL"。
- \*不支持对值进行转义（VAR="\""）。
- \*不支持合并短信，每条短信都会被单独处理。
- \* 不支持 16 位 Unicode 消息。
- \* 短信使用标准 GSM7 字符集解码，因此你不能使用其他编码发送，否则会被错误解码。

### **示例** {#examples}

#### 错误 {#wrong}

```ros
:cmd script mans_skripts
:cmd slepens script mans skripts
:cmd slepens script mans_skripts var=
:cmd slepens script mans_skripts var= a
:cmd slepens script mans_skripts var=a a
```

#### 正确 {#right}

```ros
:cmd slepens script mans_skripts
:cmd slepens script "mans skripts"
:cmd slepens script mans_skripts var
:cmd slepens script mans_skripts var=a
:cmd slepens script mans_skripts var="a a" 
```

## 调试 {#debugging}

`/tool/sms/send` 命令会记录写入和读取的数据。记录使用的标签为 *gsm,debug,write* 和 *gsm,debug,read*。更多信息请参见 `/system/logging`。

## 实现细节 {#implementation-details}

使用 *AT+CMGS* 和 *AT+CMGF* 命令。在执行命令期间会占用该端口，其他 RouterOS 组件无法同时使用该端口。消息发送过程可能耗时较长。在初始 AT 命令交换阶段，超时时间为两秒；之后超时时间为一分钟。
