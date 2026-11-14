---
sidebar_key: "system-information-and-utilities/tftp"
sidebar_position: 16
title: "TFTP"
sidebar_label: "TFTP"
description: "TFTP 页面介绍 MikroTik RouterOS 对简单文件传输协议（Trivial File Transfer Protocol）的实现，详细说明 TFTP 服务器访问规则的配置选项，包括 IP 地址范围、文件名处理、块大小限制以及对客户端请求的正则表达式支持。"
tags:
  - 'tftp'
  - 'ip-addresses'
  - 'settings'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/tftp
captured_at: '2026-11-04T11:33:40+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

简单文件传输协议（Trivial File Transfer Protocol），或简称 TFTP，是一种用于传输文件的非常简单的协议。每个非终结数据包都会被单独确认。

**子菜单：** `/ip/tftp`

此菜单包含所有 TFTP 访问规则。如果此菜单中没有规则，则 RouterOS 启动时不会启动 TFTP 服务器。与创建规则时可设置的内容相比，此菜单仅多显示 1 个属性。

## 参数 {#parameters}

| 属性 | 描述 |
| :-- | :-- |
| **ip-addresses** *(必填)* | 作为客户端接受的 IP 地址范围。如果为空，将使用 *0.0.0.0/0* |
| **allow-rollover** *(默认值：No)* | 如果设置为 *yes*，则当达到最大值时，TFTP 服务器将允许序列号回绕。这用于支持通过 TFTP 服务器进行大型下载。 |
| **req-filename** | 请求的文件名，作为 *正则表达式 (regex)*。如果字段留空，则默认为 *.\** |
| **real-filename** | 如果 **req-filename** 和 **real-filename** 的值已设置且有效，则请求的文件名将被替换为匹配的文件。此字段必须设置。如果在 *req-filename* 中指定了多个 *regex*，则可以使用此字段设置应匹配哪些正则表达式，以便验证此规则。使用多个 *regex* 时，*real-filename* 的格式为 **filename\0\5\6** |
| **allow** (*默认值：yes*) | 如果上述字段已设置，则允许连接。如果为 *no*，连接将被中断 |
| **read-only** (*默认值：no*) | 设置文件是否可写入；如果设置为 "yes"，写入尝试将失败并报错 |
| **hits** *(read-only)* | 此访问规则条目已被使用多少次（read-only） |

### 设置 {#settings}

**子菜单：** `/ip/tftp/settings`

此菜单包含所有 TFTP 设置。

| 属性 | 描述 |
| :-- | :-- |
| **max-block-size** (*默认值：4096*) | 可接受的最大块大小值。在传输协商阶段，RouterOS 设备不会协商比此值更大的值。 |

## 正则表达式 {#regexp}

Req-filename 字段允许使用正则表达式，此字段中允许的正则表达式如下：

### 括号 () - 标记子节 {#brackets----marking-subsection}

```
    example 1 a(sd|fg) will match asd or afg

```

### 星号 "\*" - 匹配前面的符号零次或多次 {#asterisk----match-zero-or-more-times-preceding-symbol}

```
    example 1 a* will match any length name consisting purely of symbols a or no symbols at all
    example 2 .* will match any length name, also, empty field
    example 3 as*df will match adf, asdf, assdf, asssdf etc.

```

### 加号 "+" 将匹配前面的符号一次或多次 {#plus--will-match-one-or-more-times-the-preceding-symbol}

```
    example: as+df will match asdf, assdf etc.

```

### 点号 "." - 匹配任意符号 {#dot----matches-any-symbol}

```
    example as.f will match asdf, asbf ashf etc.

```

### 方括号 [] - 在列出的字符之间任选一个 {#square-brackets----variation-between}

```
    example as[df] will match asd and asf

```

### 问号 "?" 将匹配一个或零个符号 {#question-mark--will-match-one-or-no-symbols}

```
    example asd?f will match asdf and asf

```

### 脱字符 "^" - 用在行首表示该行以某内容开头 {#caret----used-at-the-beginning-of-the-line-means-that-the-line-starts-with}

### 美元符号 "$" - 表示在行尾 {#dollar----means-at-the-end-of-the-line}

## 示例 {#examples}

如果请求某个文件，则从名为 sata1 的存储返回该文件：

```ros
/ip/tftp/add req-filename=file.txt real-filename=/sata1/file.txt allow=yes read-only=yes
```

如果我们想无论用户请求什么都返回同一个特定 *文件*：

```ros
/ip/tftp/add req-filename=.* real-filename=/sata1/file.txt allow=yes read-only=yes
```

 如果用户请求 *aaa.bin* 或 *bbb.bin*，则向他们提供 *ccc.bin*：

```ros
/ip/tftp/add req-filename="(aaa.bin)|(bbb.bin)" real-filename="/sata1/ccc.bin\\0" allow=yes read-only=yes
```

:::tip

RouterOS 收到 TFTP 请求，但客户端却发生传输超时？

某些嵌入式客户端会请求较大的块大小，却不能正确处理分片数据包。对于这些客户端，建议将 RouterOS 侧的 "max-block-size" 或客户端侧的 "blksize" 设置为网络中最小 MTU 的值减去 32 字节（IP 为 20 字节，UDP 为 8 字节，TFTP 为 4 字节）；如果网络中使用了 IP 选项，则还应减去更多。

:::
