---
sidebar_key: "system-information-and-utilities/e-mail"
sidebar_position: 3
title: "电子邮件"
sidebar_label: "电子邮件"
description: "从 RouterOS 通过 SMTP 服务器发送邮件：TLS 模式与端口、证书验证、Gmail 应用专用密码、附件、定时导出配置，以及各条错误信息的含义。"
tags:
  - 'email'
  - 'smtp'
  - 'tls'
source: https://manual.mikrotik.com/docs/system-information-and-utilities/e-mail
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

路由器通过 SMTP 服务器发送邮件：可以是你的邮件服务商的服务器，也可以是你自己的邮件服务器。脚本和 [scheduler](./scheduler.md) 用它发送告警、备份和配置导出，[watchdog](../diagnostics-monitoring-and-troubleshooting/watchdog.md) 用它发送支持输出文件。

路由器使用 AUTH PLAIN 登录服务器。加密方面，它从连接一开始就使用 TLS（`tls=yes`），或者用 STARTTLS 升级明文连接（`tls=starttls`）。不使用 TLS 时，用户名和密码会以未加密的方式穿越网络，因此对于任何不在你自己网络中的服务器，都应使用 TLS。

## 配置 SMTP 服务器 {#configure-the-smtp-server}

服务器设置位于 [`/tool/e-mail`](../cli-reference/tool/e-mail/index.md)。选择与服务器端口相匹配的 `tls`：

| 端口 | `tls` | 用途 |
| :-- | :-- | :-- |
| 587 | `starttls` | 使用 STARTTLS 的邮件提交，大多数邮件服务商都提供。 |
| 465 | `yes` | 隐式 TLS：连接从开始就加密。 |
| 25 | `no` | 明文 SMTP，仅用于你自己网络中接受明文的中继。 |

两者不能混用：在端口 587 上使用 `tls=yes` 会以 `TLS handshake failed` 失败，在端口 465 上使用 `tls=starttls` 会以 `timeout occured` 失败。

例如，要通过 Gmail 使用 STARTTLS 并验证证书发送邮件：

```ros
/tool/e-mail/set server=smtp.gmail.com port=587 tls=starttls \
    certificate-verification=yes from=you@gmail.com \
    user=you@gmail.com password="xxxx xxxx xxxx xxxx"
```

:::info
Gmail 不接受来自路由器等设备的 Google 账号密码。为你的 Google 账号开启两步验证，创建一个应用专用密码（在你的 Google 账号中依次进入 **Security**、**App passwords**），并使用生成的 16 位密码作为 `password`。
:::

`certificate-verification` 默认为 `no`：路由器会加密连接，但不检查服务器证书。将其设为 `yes` 以根据路由器的信任库检查证书。内置信任库默认覆盖电子邮件，因此 Gmail 等公共提供商的证书无需额外设置即可验证通过。当证书与服务器名称不匹配时，发送会以 `TLS handshake failed (ssl: name verification failed for: ...)` 失败。

在 WinBox 中，打开 **Tools > Email** 配置 SMTP 连接：

1. 将 **Server**、**Port** 和 **TLS** 设置为你的邮件服务商提供的值。截图显示的是未配置的值，并非可用邮件服务器的设置。
2. 在 **From** 中输入发件人地址。如果服务器要求身份验证，使用 **+** 控件设置 **User** 和 **Password**。
3. 检查 TLS 连接的 **Certificate Verification**，然后选择 **OK** 保存配置。有关验证选项和证书要求的服务器设置，请参阅 CLI 参考。

![WinBox Email Settings dialog for the SMTP connection](/img/f031512534090b28.webp)

## 发送消息 {#send-a-message}

使用 [`/tool/e-mail/send`](../cli-reference/tool/e-mail/send.md) 发送消息：

```ros
/tool/e-mail/send to=admin@example.com subject="Router alert" \
    body="The backup link is down."
```

该命令使用 `/tool/e-mail` 的设置。传递给该命令的任何设置，例如 `server`、`port`、`tls` 或 `from`，只对本条消息覆盖相应设置。

- 在 `to` 和 `cc` 中用逗号分隔多个收件人。路由器会向他们所有人发送一条消息。
- `body` 中的 `\n` 表示换行。
- `file` 会附加路由器文件列表中的文件，多个文件用逗号分隔。不存在的文件会在消息发送前被拒绝，并提示 `input does not match any value of file`。
- 始终设置 `from`。不设置时，路由器会以空发件人（`<>`）发送消息，许多服务器会拒绝这种消息。

`/tool/e-mail/print` 在 `last-status` 中显示最后一条消息的结果：`succeeded` 或 `failed`。

要在 WinBox 中发送消息，打开 **Tools > Email** 并在右侧面板中选择 **Send Email**：

1. 设置 **To** 和 **Subject**。使用 **Cc** 添加其他收件人，需要时使用 **From** 覆盖已配置的发件人。
2. 在 **Body** 中输入消息。使用 **Files** 旁的 **+** 控件附加路由器上已存储的文件。

![WinBox Send Email dialog with recipient, subject, body, and attachments](/img/ea09716bb4b6bb51.webp)

检查 SMTP 设置和收件人，然后选择 **Send Email** 发送消息。**Cancel** 会关闭对话框而不发送。如果投递失败，请在 Email Settings 中检查 **Last Status**。

## 每天通过邮件发送配置导出 {#email-the-configuration-export-every-day}

每天晚上将路由器的配置导出发送给管理员。

1. 配置 SMTP 服务器，例如你网络中的一个中继：

   ```ros
   /tool/e-mail/set server=192.0.2.25 port=25 from=router@example.com
   ```

2. 添加一个名为 `export-email` 的 [script](../developer-guides/scripting/index.md)，用于写入导出文件并发送它：

   ```ros
   /export file=export
   /tool/e-mail/send to=config@example.com file=export.rsc \
       subject="$[/system/identity/get name] export" \
       body="$[/system/clock/get date] configuration file"
   ```

3. 添加一个 [scheduler](./scheduler.md) 条目，每 24 小时运行该脚本：

   ```ros
   /system/scheduler/add name=export-email on-event=export-email \
       start-time=00:00:00 interval=24h
   ```

导出默认会隐藏密码和其他敏感值，参见 [配置导出](../getting-started/configuration-management/index.md#configuration-export)。

## 故障排除 {#troubleshoot}

当消息无法发送时，命令会以 `failure:` 消息停止，并且 `last-status` 为 `failed`：

| 消息 | 含义 |
| :-- | :-- |
| `TLS handshake failed (timeout)` | 对 STARTTLS 端口（如 587）使用 `tls=yes`。请改用 `tls=starttls`。 |
| `TLS not supported by server` | 使用了 `tls=starttls`，但服务器不提供 STARTTLS。路由器不会回退到未加密的连接。 |
| `timeout occured` | 服务器无应答，例如对隐式 TLS 端口（如 465）使用 `tls=no` 或 `tls=starttls`。 |
| `invalid FROM address` | 服务器拒绝了发件人。对于未使用 TLS 的连接，Gmail 也会这样应答，因此除了 `from` 之外还要检查 `tls`。 |
| `AUTH failed` | `user` 或 `password` 错误。Gmail 需要应用专用密码。 |
| `recipient address required` | 缺少 `to`。 |
| `TLS handshake failed (ssl: name verification failed for: ...)` | 在 `certificate-verification=yes` 时，服务器证书与服务器名称不匹配。 |

当 `server` 是名称时，`/tool/e-mail/print` 中的 `last-address` 显示路由器连接到的地址。

## 技术细节 {#technical-details}

### SMTP 会话 {#smtp-session}

路由器用方括号中的自身地址向服务器致意（例如 `EHLO [192.0.2.1]`），并使用 AUTH PLAIN 登录。每条消息都有一个按路由器时区生成的 `Date` 头，以及一个以路由器标识结尾的 `Message-ID`。

### 文本与附件 {#text-and-attachments}

不带附件的消息没有 MIME 头：路由器按原样发送主题和正文，不声明字符集。带附件时，消息为 `multipart/mixed`，文本部分声明为 US-ASCII，每个文件以 `application/octet-stream` 连同其文件名附加。两种情况下 Gmail 都能正确显示 UTF-8 文本。对于必须在所有邮件客户端中正确显示的告警，请使用纯 ASCII 文本。

### VRF {#vrf}

`/tool/e-mail` 中的 `vrf` 选择路由器打开到服务器的连接所使用的 VRF。

有关所有参数，请参阅 [`/tool/e-mail`](../cli-reference/tool/e-mail/index.md) 和 [`/tool/e-mail/send`](../cli-reference/tool/e-mail/send.md) 的 CLI 参考。
