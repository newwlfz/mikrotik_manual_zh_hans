---
title: "TFTP"
description: "TFTP 页面介绍 MikroTik RouterOS 对简单文件传输协议的实现，详细说明 TFTP 服务器访问规则的配置选项，包括 IP 地址范围、文件名处理、块大小限制，以及用于客户端请求的正则表达式支持。"
tags:
  - 'tftp'
  - 'ip-addresses'
  - 'settings'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/tftp
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Trivial File Transfer Protocol 或简称 TFTP 是一种用于传输文件的非常简单协议。每个非终止数据包都会单独确认。

**子菜单：** `/ip/tftp`

该菜单包含所有 TFTP 访问规则。如果该菜单中没有规则，RouterOS 启动时不会启动 TFTP 服务器。与创建规则时可设置的内容相比，该菜单仅显示 1 个额外属性。

## Parameters

| 属性 | 说明 |
| :-- | :-- |
| **ip-addresses** *(必填)* | 接受作为客户端的 IP 地址范围。如果为空，将使用 *0.0.0.0/0* |
| **allow-rollover** *(默认：否)* | 如果设置为 *yes*，当达到最大值时，TFTP 服务器将允许序列号回绕。这用于通过 TFTP 服务器启用大文件下载。 |
| **req-filename** | 请求的文件名，使用 *正则表达式（regex）* 表示。如果该字段留空，则默认为 *.\** |
| **real-filename** | 如果设置了有效的 **req-filename** 和 **real-filename** 值，请求的文件名将替换为匹配的文件。必须设置该字段。如果在 *req-filename* 中指定了多个 *regex*，可通过该字段设置哪些表达式应匹配，从而验证该规则。使用多个 *regex* 时，*real-filename* 格式为 **filename\0\5\6** |
| **allow** *(默认：yes)* | 当上述字段已设置时，允许连接。如果为 *no*，连接将被中断 |
| **read-only** *(默认：no)* | 设置文件是否可写入，如果设置为“yes”，写入尝试将失败并返回错误 |
| **hits** *(只读)* | 该访问规则条目被使用的次数（只读） |

### 设置 {#settings}

**子菜单：** `/ip/tftp/settings`

此菜单包含所有 TFTP 设置。

| 属性 | 说明 |
| :-- | :-- |
| **max-block-size** (*default:4096*) | 可接受的最大块大小值。在传输协商阶段，RouterOS 设备不会协商大于此值的值。 |

## Regexp

Req-filename 字段允许使用正则表达式，该字段中允许的正则表达式如下：

### 括号 () - 标记子表达式 {#brackets----marking-subsection}

```
    example 1 a(sd|fg) will match asd or afg

```

### 星号“\*” - 匹配前面的符号零次或多次 {#asterisk----match-zero-or-more-times-preceding-symbol}

```
    example 1 a* will match any length name consisting purely of symbols a or no symbols at all
    example 2 .* will match any length name, also, empty field
    example 3 as*df will match adf, asdf, assdf, asssdf etc.

```

### 加号“+” - 匹配前面的符号一次或多次 {#plus--will-match-one-or-more-times-the-preceding-symbol}

```
    example: as+df will match asdf, assdf etc.

```

### 点号“.” - 匹配任意符号 {#dot----matches-any-symbol}

```
    example as.f will match asdf, asbf ashf etc.

```

### 方括号 [] - 两者之间的变化 {#square-brackets----variation-between}

```
    example as[df] will match asd and asf

```

### 问号“?”将匹配一个或不匹配任何符号 {#question-mark--will-match-one-or-no-symbols}

```
    example asd?f will match asdf and asf

```

### 插入符“^” - 用于行首表示行以指定内容开始 {#caret----used-at-the-beginning-of-the-line-means-that-the-line-starts-with}

### 美元符号“$” - 表示行尾 {#dollar----means-at-the-end-of-the-line}

## 示例 {#examples}

如果请求某个文件，则从名为 sata1 的存储返回该文件：

```ros
/ip/tftp/add req-filename=file.txt real-filename=/sata1/file.txt allow=yes read-only=yes
```

如果要无论用户请求什么，都发送指定的 *file*：

```ros
/ip/tftp/add req-filename=.* real-filename=/sata1/file.txt allow=yes read-only=yes
```

 如果用户请求 *aaa.bin* 或 *bbb.bin*，则向他们发送 *ccc.bin*：

```ros
/ip/tftp/add req-filename="(aaa.bin)|(bbb.bin)" real-filename="/sata1/ccc.bin\\0" allow=yes read-only=yes
```

:::tip

RouterOS 收到 TFTP 请求，但客户端传输超时？

某些嵌入式客户端请求较大的块大小，但无法正确处理分片数据包。对于这些客户端，建议将 RouterOS 侧的“max-block-size”或客户端侧的“blksize”设置为网络中最小 MTU 减去 32 字节的值（IP 为 20 字节，UDP 为 8 字节，TFTP 为 4 字节）；如果网络中使用 IP 选项，则应设置得更大。
:::
