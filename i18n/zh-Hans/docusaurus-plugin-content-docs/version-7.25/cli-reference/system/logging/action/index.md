---
sidebar_key: "cli-reference/system/logging/action/index"
sidebar_position: 2
title: "action"
sidebar_label: 'action'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/logging/action
captured_at: '2026-11-01T21:25:33+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/logging/action {#systemloggingaction}
**类型：** 目录

这些操作会存储或发送由 [`/system/logging`](../index.md) 中的规则选中的消息。默认操作包括 `memory`（`/log` 显示的缓冲区）、`disk`（名为 `log` 的文件）、`echo`（打开的终端会话）和 `remote`（syslog 服务器，未设置地址）。每个 memory 操作都保留自己的缓冲区，[`clear`](./clear.md) 会将其清空。参见 [日志](../../../../diagnostics-monitoring-and-troubleshooting/log/index.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default">默认操作之一：`memory`、`disk`、`echo` 和 `remote`。</ArgTableRow>
<ArgTableRow arg="Y" typ="managed"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">动作的名称，仅限字母和数字。规则通过此名称引用该动作；对于 `target=memory`，它也是 [`/log`](../../../log.md) 的 `buffer` 字段中显示的缓冲区名称。</ArgTableRow>
<ArgTableRow arg="target" typ="enum (memory | disk | echo | remote | email | script) { memory:0, disk:1, echo:2, remote:3, email:4, script:5 }" mandatory="1">
消息的去向：
- `memory` - 将它们保存在以该操作命名的内存缓冲区中，由 `/log/print` 显示。重启后该缓冲区为空。
- `disk` - 将它们写入文本文件（`disk-file-name`）。
- `echo` - 将它们打印到打开的终端会话（`remember`）。
- `remote` - 将它们发送到 syslog 服务器（`remote`）。
- `email` - 将每条消息作为电子邮件发送（`email-to`）。
- `script` - 为每条消息运行脚本（`script`）。
</ArgTableRow>
<ArgTableRow arg="memory-lines" typ="num">缓冲区保留的条目数，`1..65535`。缓冲区满时，每条新条目都会丢弃最旧的条目，除非设置了 `memory-stop-on-full`。默认值：1000。</ArgTableRow>
<ArgTableRow arg="memory-stop-on-full" typ="bool">当为 `yes` 时，缓冲区会保留最初的 `memory-lines` 个条目，并丢弃新条目，直到使用 [`clear`](./clear.md) 将其清空。默认值：no。</ArgTableRow>
<ArgTableRow arg="disk-file-name" typ="string">日志文件的名称，不含扩展名。该操作会写入 `<name>.0.txt`；当该文件满时，它会变为 `<name>.1.txt`，并开始新的 `<name>.0.txt`。要写入其他磁盘或文件夹，请将其名称放在前面，例如 `usb1/log`。文件夹必须存在，否则该操作会被拒绝，并提示 `bad disk file name`。两个 disk 操作不能使用相同的文件名。默认值：log。</ArgTableRow>
<ArgTableRow arg="disk-lines-per-file" typ="num">在操作开始新文件之前，每个文件中的行数，`1..65535`。默认值：1000。</ArgTableRow>
<ArgTableRow arg="disk-file-count" typ="num">该操作保留的文件数，`1..65535`。当开始新文件且达到该数量时，最旧的文件及其条目会被丢弃。默认值：2。</ArgTableRow>
<ArgTableRow arg="disk-stop-on-full" typ="bool">当日志文件满时停止写入此操作，而不是丢弃最旧的条目。默认值：no。</ArgTableRow>
<ArgTableRow arg="remote" typ="alt { ipv6: ip6Addr
, ip: ipAddr
, hostname: string
 }">syslog 服务器的地址：IPv4 或 IPv6 地址，或主机名。默认的 `remote` 操作使用 `0.0.0.0`（未设置服务器）。默认值：0.0.0.0。</ArgTableRow>
<ArgTableRow arg="remote-port" typ="num">syslog 服务器的端口。默认值：514。</ArgTableRow>
<ArgTableRow arg="src-address" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }">发送到 syslog 服务器的数据包的源地址。`0.0.0.0` 表示由路由器选择。默认值：0.0.0.0。</ArgTableRow>
<ArgTableRow arg="remote-log-format" typ="enum (default | syslog | cef)">
发送到 syslog 服务器的消息格式：
- `default`（默认） - 主题和消息，`<topics> <message>`，不含时间或主机名。
- `syslog` - BSD syslog（RFC 3164）：`<PRI>`（设施和严重级别）、时间、路由器标识和消息。`syslog-facility`、`syslog-severity`、`syslog-time-format` 和 `add-topics-string` 适用于它。
- `cef` - Common Event Format：时间和路由器标识，然后是 `CEF:0|MikroTik|<model>|<version>|`，包含主题、严重级别（`Low`、`Medium`、`High`）以及字段 `dvchost`、`dvc` 和 `msg`，后面是消息的额外字段。每条消息以 `cef-event-delimiter` 结尾。
</ArgTableRow>
<ArgTableRow arg="remote-protocol" typ="enum (udp | tcp | tls)">
到 syslog 服务器的传输方式。每种格式都适用于每种传输方式，且发送到相同地址和端口的操作共享一个连接。
- `udp`（默认） - 每条消息一个数据报。服务器不可达时发送的消息会丢失。
- `tcp` - 一个 TCP 连接。服务器不可达时记录的最多 1000 条消息（所有 remote 操作合计）会保存在内存中，并在连接恢复时发送；缓冲区满时，较新的消息会被丢弃。`default` 和 `syslog` 消息在流中没有分隔符；请在 TCP 上使用 `cef`。
- `tls` - 与 `tcp` 相同，但使用 TLS 加密（`check-certificate`）。
</ArgTableRow>
<ArgTableRow arg="check-certificate" typ="bool">对于 `remote-protocol=tls`：是否根据 [`/certificate`](../../../certificate/index.md) 中的受信任证书验证服务器证书。验证失败时，路由器不会发送，记录日志 `ssld,error client session, logging, remote IP: <address>, ssl: no trusted CA certificate found`，并稍后重试。证书中的名称不会与服务器地址进行比较，因此只应信任日志服务器的 CA。默认值：no。</ArgTableRow>
<ArgTableRow arg="cef-event-delimiter" typ="string">添加到每条 `cef` 消息末尾的字符，在 UDP 上也是如此。默认值：`\r\n`。</ArgTableRow>
<ArgTableRow arg="syslog-time-format" typ="enum (bsd-syslog | iso8601)">
`syslog` 消息的时间格式：
- `bsd-syslog`（默认） - `Oct  2 16:51:21`，路由器本地时间，不含年份。
- `iso8601` - `2026-10-02T16:51:21.726+03:00`，包含毫秒和时区偏移。
</ArgTableRow>
<ArgTableRow arg="syslog-facility" typ="enum (kern | user | mail | daemon | auth | syslog | lpr | news | uucp | cron | authpriv | ftp | ntp | local0 | local1 | local2 | local3 | local4 | local5 | local6 | local7) { kern:0, user:1, mail:2, daemon:3, auth:4, syslog:5, lpr:6, news:7, uucp:8, cron:9, authpriv:10, ftp:11, ntp:12, local0:16, local1:17, local2:18, local3:19, local4:20, local5:21, local6:22, local7:23 }">
`syslog` 消息 `<PRI>` 中的 facility 及其代码：
- `kern` (0)
- `user` (1)
- `mail` (2)
- `daemon` (3)（默认）
- `auth` (4)
- `syslog` (5)
- `lpr` (6)
- `news` (7)
- `uucp` (8)
- `cron` (9)
- `authpriv` (10)
- `ftp` (11)
- `ntp` (12)
- 从 `local0` 到 `local7`（16 到 23）
</ArgTableRow>
<ArgTableRow arg="syslog-severity" typ="enum (auto | emergency | alert | critical | error | warning | notice | info | debug) { auto:0xffffffff, emergency:0, alert:1, critical:2, error:3, warning:4, notice:5, info:6, debug:7 }">
`syslog` 消息 `<PRI>` 中的严重级别。除 `auto` 以外的值会以该严重级别发送每条消息。
- `auto`（默认） - 从消息主题获取严重级别：`debug` 7、`info` 6、`warning` 4、`error` 3。同时带有 `error` 和 `critical` 的消息取 3。
- `emergency`（0） - 系统不可用。
- `alert`（1） - 必须立即采取措施。
- `critical`（2） - 严重状况。
- `error`（3） - 错误状况。
- `warning`（4） - 警告状况。
- `notice`（5） - 重要状况。
- `info`（6） - 信息性消息。
- `debug`（7） - 调试消息。
</ArgTableRow>
<ArgTableRow arg="email-to" typ="string">email 操作发送到的地址。每条匹配的消息都会作为单独的电子邮件发送，以 `<topics> <message>` 作为主题和正文，通过 [`/tool/e-mail`](../../../tool/e-mail/index.md) 中设置的 SMTP 服务器、端口、TLS 模式和发件人发送。参见 [电子邮件](../../../../system-information-and-utilities/e-mail.md)。</ArgTableRow>
<ArgTableRow arg="email-cc" typ="multi { array-id, cc: string
 }">email 操作的额外收件人，位于 CC 头中。允许有多个地址。</ArgTableRow>
<ArgTableRow arg="email-start-tls" typ="bool">电子邮件动作不使用此项：STARTTLS 遵循 [`/tool/e-mail`](../../../tool/e-mail/index.md) 中的 `tls` 设置。默认值：no。</ArgTableRow>
<ArgTableRow arg="remember" typ="bool">对于 `target=echo`：保留没有打开终端会话时记录的消息，并在下次登录时打印一次。默认值：yes。</ArgTableRow>
<ArgTableRow arg="add-topics-string" typ="bool">对于 `remote-log-format=syslog`：将主题放在消息前面，`<PRI><time> <identity> <topics> <message>`。`default` 格式始终包含主题。默认值：no。</ArgTableRow>
<ArgTableRow arg="script" typ="enum ()">对于 `target=script`：为每条匹配的消息运行来自 [`/system/script`](../../script/index.md) 的脚本。脚本会获得变量 `$topics`（以文本表示的主题，例如 `system,error,critical`）和 `$message`。脚本仍在运行时匹配到的消息会被跳过，脚本自身记录的消息不会再次运行该脚本。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum ()">remote 操作连接所使用的 VRF。默认值：main。</ArgTableRow>
</ArgTable>
