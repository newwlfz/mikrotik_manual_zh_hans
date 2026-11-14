---
sidebar_key: "system-information-and-utilities/tftp"
sidebar_position: 15
title: "TFTP"
sidebar_label: "TFTP"
description: "RouterOS TFTP 服务器：向设备提供启动文件、固件和配置文件，接受上传，将请求的文件名与访问规则和正则表达式进行匹配，并排查块大小、大文件和错误问题。"
tags:
  - 'tftp'
  - 'ip-addresses'
  - 'settings'
source: https://manual.mikrotik.com/docs/system-information-and-utilities/tftp
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RouterOS 内置 TFTP 服务器。简单文件传输协议（TFTP）是一种基于 UDP 的简单文件传输协议，无需认证，网络设备在启动时就会使用它：IP 电话和接入点通过它获取配置或固件，网络启动的计算机用它加载引导程序，交换机则用它上传配置备份。该服务器从路由器存储中提供文件，并在规则允许时接受上传。

只要 `/ip/tftp` 中至少有一条已启用的访问规则，服务器就会运行。每个请求都会按顺序与规则逐一比对：第一条同时匹配客户端地址和所请求文件名的规则做出决定，而没有规则匹配的请求会被拒绝。要从其他 TFTP 服务器下载文件，请使用 `mode=tftp` 的 [`/tool/fetch`](./fetch.md)。

设备通常通过 DHCP 获知 TFTP 服务器和文件名。在 RouterOS DHCP 服务器上，请在 [`/ip/dhcp-server/network`](../cli-reference/ip/dhcp-server/network.md) 中设置 `next-server`（TFTP 服务器地址）和 `boot-file-name`；期望 DHCP 选项 66 或 150 的设备会从 [DHCP 选项](../network-management/dhcp/server.md)中获得它们。

:::warning
TFTP 没有密码：规则 `ip-addresses` 中的每个客户端都能读取该规则 `req-filename` 所匹配的每一个名称，并且在 `read-only=no` 时还能写入这些名称。请把 `ip-addresses` 限制为真正需要该规则的设备，并让 `req-filename` 只匹配你要提供的名称：在提供某个文件夹或所请求名称的规则中，诸如 `.*` 这样的模式或为空的 `req-filename` 也会匹配那些指向所服务文件夹之外的名称。本页示例使用 `[^/.][^/]*`，即不含斜杠且不以点开头的名称。
:::

## 为设备提供文件 {#serve-files-to-devices}

创建一个文件夹（此处为 `tftp`），把文件复制进去（参见 [文件](./files.md)），然后把它提供给局域网。作为 `real-filename` 的文件夹会被放在所请求名称之前，因此请求 `phone.cfg` 会返回 `tftp/phone.cfg`；该模式接受带可选前导斜杠的名称（某些客户端会这样发送），且不接受子文件夹：

```ros
/file/add name=tftp type=directory
/ip/tftp/add ip-addresses=192.168.88.0/24 \
    req-filename="/\?[^/.][^/]*" real-filename=tftp
```

要在 WinBox 中配置规则，请打开 **IP > TFTP** 并选择 **New**：

1. 使用 **IP Addresses** 旁的 **+** 控件输入允许的客户端地址或子网，例如示例中的 `192.168.88.0/24`。
2. 将 **Req. Filename** 设为请求名称模式，将 **Real Filename** 设为路由器上的文件或文件夹。对于文件夹示例，请将 **Real Filename** 设为 `tftp`，并使用命令中的模式。
3. 保持 **Allow** 和 **Read Only** 处于选中状态，以便只提供文件而不接受上传。在单击 **OK**（即创建启用状态的规则）之前，请检查地址限制和模式。

![WinBox new TFTP rule with address, filename, and access settings](/img/d950bb0f6f1145a0.webp)

截图显示的是空白的新建规则对话框。请在保存前填写限制条件；不受限制的规则可能会暴露路由器文件。使用 **Files** 上传你打算提供的文件。

若要让每个客户端无论请求什么名称都得到同一个文件，请设置 `req-filename=".*"`，并把 `real-filename` 设为某个文件。仅对只获取单个文件的客户端使用此方式；如果引导程序在获取第一个文件后还要获取更多文件，它只会再次得到同一个文件：

```ros
/ip/tftp/add ip-addresses=192.168.88.0/24 req-filename=".*" \
    real-filename=tftp/boot.img
```

用一个文件响应两个名称：

```ros
/ip/tftp/add ip-addresses=192.168.88.0/24 \
    req-filename="(aaa|bbb)\\.bin" real-filename=tftp/ccc.bin
```

其他磁盘上的文件通过其路径来提供，例如 `real-filename=usb1/tftp/boot.img`。

## 接受上传 {#accept-uploads}

规则默认是只读的：上传会收到 `illegal operation` 错误。要让交换机把配置备份上传到 `backups` 文件夹，需要允许写入，并为以相同名称重复出现的备份允许覆盖。交换机会上传到 `backups/<name>`，何时上传由它们自身的设置决定：

```ros
/file/add name=backups type=directory
/ip/tftp/add ip-addresses=192.168.88.2-192.168.88.9 \
    req-filename="backups/[^/.][^/]*" read-only=no allow-overwrite=yes
```

- 如果没有 `allow-overwrite=yes`，向已存在名称的上传会以 `file exists` 失败。
- 同一条规则也会让其客户端下载已上传的文件，而这些文件通常包含密码，因此请把 `ip-addresses` 限制为这些交换机。
- 请把上传规则放在任何同样匹配 `backups/` 名称的只读规则之前，例如 `req-filename` 为空或为 `.*` 的规则；否则只读规则会先做出响应。
- 上传会占用路由器的存储空间；请不时删除旧的备份。

## 拒绝部分请求 {#refuse-some-requests}

`allow=no` 的规则会拒绝它匹配的请求。请把它放在本会允许这些请求的规则之前，因为第一条匹配的规则做出决定。`req-filename` 匹配客户端请求的名称，而不是路由器上的路径。例如，要拒绝某个更宽泛规则会提供的文件夹中的某一个文件：

```ros
/ip/tftp/add ip-addresses=192.168.88.0/24 \
    req-filename="/\?secret\\.cfg" allow=no \
    place-before=[find real-filename=tftp]
```

把任何客户端都不应读取的文件放在所服务文件夹之外。

## 检查与故障排除 {#check-and-troubleshoot}

只要存在至少一条规则，服务器就会监听 UDP 端口 69，`hits` 统计每条规则应答的请求数：

```ros
/ip/service/print where name=tftpd
/ip/tftp/print
```

路由器会在 `tftp` 主题中记录被拒绝和失败的传输，例如 `ERROR code:0 string:permission denied!`。要查看每个请求及其客户端、文件名和结果，以及超时的传输，请同时记录 `tftp,debug` 主题：

```ros
/system/logging/add topics=tftp,debug
/log/print where topics~"tftp"
```

调试信息会显示诸如 `requested (binary) file: phone.cfg access: allowed` 和 `connection timeout` 之类的内容。

客户端会收到相同的 TFTP 错误：

| 错误 | 原因 |
| :-- | :-- |
| `permission denied!`（代码 0） | 没有规则匹配客户端地址和文件名，或者第一条匹配的规则设置了 `allow=no`。 |
| `file not found`（代码 1） | 有规则匹配，但它指向的文件不存在。请检查 `real-filename` 以及该文件的路径。 |
| `illegal operation`（代码 4） | 向只读规则上传，或在没有 `allow-rollover=yes` 的情况下传输超过 65535 个数据块。 |
| `file exists`（代码 6） | 在没有 `allow-overwrite=yes` 的情况下向已存在的文件上传。 |
| 无应答 | 路由器没有已启用的 TFTP 规则，或者防火墙丢弃了 UDP 端口 69：默认防火墙只接受来自 `LAN` 接口列表中接口的请求。 |

:::tip
如果路由器收到了请求，但客户端在传输过程中超时，请检查块大小：某些嵌入式客户端会请求较大的块大小，随后却无法处理分片数据包。请把客户端的块大小设为路径上最小的 MTU 减去 32 字节（20 字节为 IP 头，8 字节为 UDP，4 字节为 TFTP），如果网络使用 IP 选项则还要更小：对于 1500 字节的 MTU 即 1468 字节。在路由器上，把 `max-block-size` 设为其提供的下一个更低值，例如 `/ip/tftp/settings/set max-block-size=1454`，或 `512`，后者同样适用于 IPv6 和隧道。较小的块大小会降低一次传输所能承载的最大文件；参见[大文件](#large-files)。
:::

## 规则如何匹配 {#how-rules-match}

- `ip-addresses` 列出客户端：IPv4 地址、范围（`192.168.88.2-192.168.88.9`）或前缀，或 IPv6 前缀。为空表示任意客户端。
- `req-filename` 是以正则表达式表示的所请求文件名，区分大小写。为空则匹配任意名称。
- `real-filename` 决定提供什么内容。为空时提供所请求的名称本身，设为文件时提供该文件，设为文件夹时则放在所请求名称之前。该值按原样使用：不支持通过 `\1` 之类的引用来引用 `req-filename` 的各个部分。

`req-filename` 必须匹配整个所请求名称：`phone\.cfg` 只匹配 `phone.cfg`，而 `.*\.cfg` 匹配所有以 `.cfg` 结尾的名称。RouterOS 会在整个值前后添加锚点，因此请把备选项放在一个分组中：`(aaa|bbb)\.bin` 匹配 `aaa.bin` 和 `bbb.bin`，但 `(aaa.bin)|(bbb.bin)` 会匹配所有以 `aaa.bin` 开头或以 `bbb.bin` 结尾的名称。以 `^` 开头的值会按原样使用，因此 `^boot` 匹配所有以 `boot` 开头的名称，除非你在末尾加上 `$`。

正则表达式元素：

| 元素 | 含义 | 示例 |
| :-- | :-- | :-- |
| `.` | 任意一个字符 | `boo.` 匹配 `boot` 和 `boox` |
| `*` | 前一元素出现零次或多次 | `.*\.bin` 匹配所有 `.bin` 名称 |
| `+` | 前一元素出现一次或多次 | `bo+t` 匹配 `bot` 和 `boot` |
| `?` | 前一元素出现一次或不出现 | `x?boot` 匹配 `boot` 和 `xboot` |
| `[ ]` | 所列字符中的任意一个 | `boo[tx]` 匹配 `boot` 和 `boox` |
| `( \| )` | 分组与备选项 | `(aaa\|bbb)\.bin` 匹配 `aaa.bin` 和 `bbb.bin` |
| `\` | 将下一个字符按字面处理 | `\.` 匹配一个点 |
| `^`、`$` | 名称的开头和结尾 | `^boot` 匹配以 `boot` 开头的名称 |

在终端中，双引号内的值要用两个反斜杠表示一个（`"(aaa|bbb)\\.bin"`），用 `\$` 表示美元符号，用 `\?` 表示问号，因为控制台自身会处理 `\`、`$` 和 `?`（`?` 显示帮助）。

## 技术细节 {#technical-details}

### 传输 {#transfers}

- 默认情况下，客户端和服务器一次交换一个数据块，每个数据块在下一次发送之前都会被确认。
- 客户端可以请求更大的块大小（`blksize`）；路由器最多同意 `/ip/tftp/settings` 中 `max-block-size` 所允许的值：`512`、`1454`、`4096`（默认）或 `8192`。路由器也会应答传输大小选项（`tsize`）。它不协商窗口大小（`windowsize`）。
- 在规则上设置 `reading-window-size=pipelining` 时，路由器会在等待确认前先发送下载的多个数据块，从而加快下载速度。默认值为 `none`。
- 服务器在 `/ip/tftp/settings` 中由 `vrf` 设置的 VRF 中监听（默认为 `main`）。

### 大文件 {#large-files}

TFTP 用 16 位对传输的数据块编号，因此一次传输在 65535 个数据块处结束：512 字节块时约为 32 MiB，1454 字节块时约为 90 MiB，4096 字节块时约为 256 MiB。设置 `allow-rollover=yes` 后，路由器会在第 65535 个数据块之后从第 0 个数据块继续，从而完成更大的文件；客户端必须支持这种回绕。若不启用，传输会在达到上限时以 `illegal operation` 失败。要在文件夹规则上允许该行为：

```ros
/ip/tftp/set [find real-filename=tftp] allow-rollover=yes
```

有关所有属性，请参阅 CLI 参考中的 [`/ip/tftp`](../cli-reference/ip/tftp/index.md) 和 [`/ip/tftp/settings`](../cli-reference/ip/tftp/settings.md)。
