---
title: "电子邮件"
description: "RouterOS 中的 E-mail 工具支持通过 SMTP 使用明文身份验证或 TLS 加密直接从设备发送电子邮件，可用于定时备份和自定义邮件内容。可在 `/tool/e-mail` 子菜单中配置 SMTP 服务器、身份验证信息、加密设置和附件处理方式。"
tags:
  - 'email'
  - 'smtp'
  - 'tls'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/e-mail
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

E-mail 工具是 RouterOS 内置工具，可让路由器直接从设备发送电子邮件。它可用于按计划自动向网络管理员发送配置备份和导出文件。

E-mail 工具支持明文身份验证和 TLS 加密。不支持其他身份验证或加密方法。

## 属性 {#properties}

**子菜单：** `/tool/e-mail`

该子菜单用于设置将要使用的 SMTP 服务器。

| 属性 | 说明 |
| :-- | :-- |
| **address** (*IP/IPv6 address*；默认值：**0.0.0.0**) | SMTP 服务器的 IP 地址。 |
| **certificate-verification**(*yes* \| *yes-without-crl* \| *no*；默认值：**no**) | 启用来自本地证书存储的信任链验证。*yes-without-crl* 验证证书，但不执行 CRL 检查（证书吊销列表）。 |
| **from** (*string*；默认值：**\<>**) | 显示为发件人的名称或电子邮件地址。 |
| **password** (*string*；默认值：**""**) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 用于向 SMTP 服务器进行身份验证的密码。 |
| **port** (*integer[0..65535]*；默认值：**25**) | SMTP 服务器的端口。 |
| **tls** (*no\|yes\|starttls*；默认值：**no**) | 是否使用 TLS 加密：<ul><li>yes - 发送 STARTTLS，如果服务器上没有可用的 TLS，则断开会话</li><li>no - 不发送 STARTTLS</li><li>starttls - 发送 STARTTLS，如果服务器响应 TLS 不可用，则继续不使用 TLS</li></ul> |
| **user** (*string*；默认值：**""**) | 用于向 SMTP 服务器进行身份验证的用户名。 |
| **vrf** (*VRF name*；默认值：**main**) | 设置服务创建出站连接所使用的 VRF。 |

:::warning
**注意：** 所有服务器配置（如果已指定）均可由 send 命令覆盖。
:::

---

## 发送电子邮件 {#sending-email}

**子菜单：** `/tool/e-mail`

Send 命令使用以下参数：

| 属性 | 说明 |
| :-- | :-- |
| **body** (*string*；默认值：) | 电子邮件的正文内容。 |
| **cc** (*string*；默认值：) | 向列出的收件人发送副本。允许使用多个地址，使用“,”分隔条目。 |
| **certificate-verification**(*yes* \| *yes-without-crl* \| *no*；默认值：**no**) | 启用来自本地证书存储的信任链验证。*yes-without-crl,* 验证证书，但不执行 CRL 检查（证书吊销列表）。 |
| **file** (*File[,File]*；默认值：) | 将以逗号分隔、附加到邮件中的文件名列表。 |
| **from** (*string*；默认值：) | 显示为发件人的名称或电子邮件地址。如果未指定，则使用服务器配置中的值。 |
| **password** (*string*；默认值：) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 用于向 SMTP 服务器进行身份验证的密码。如果未指定，则使用服务器配置中的值。 |
| **port** (*integer[0..65535]*；默认值：) | SMTP 服务器的端口。如果未指定，则使用服务器配置中的值。 |
| **server** (*IP/IPv6 address*；默认值：) | SMTP 服务器的 IP 或 IPv6 地址。如果未指定，则使用服务器配置中的值。 |
| **tls** (*yes\|no\|starttls*；默认值：**no**) | 是否使用 TLS 加密：<ul><li>yes - 发送 STARTTLS，如果服务器上没有可用的 TLS，则断开会话</li><li>no - 不发送 STARTTLS</li><li>starttls - 发送 STARTTLS，如果服务器响应 TLS 不可用，则继续不使用 TLS</li></ul> |
| **subject** (*string*；默认值：) | 邮件主题。 |
| **to** (*string*；默认值：) | 目标电子邮件地址。仅允许一个地址。 |
| **user** (*string*；默认值：) | 用于向 SMTP 服务器进行身份验证的用户名。如果未指定，则使用服务器配置中的值。 |

---

## 基本示例 {#basic-examples}

**本示例将展示如何每 24 小时发送一封包含配置导出的电子邮件。**

1. 配置 SMTP 服务器。

```ros
[admin@MikroTik] /tool/e-mail> set server=10.1.1.1 port=25 from="router@mydomain.com"
```

1. 添加名为“export-send”的新脚本：

```ros
/export file=export 
/tool/e-mail/send to="config@mydomain.com" subject="$[/system/identity/get name] export" \ 
body="$[/system/clock/get date] configuration file" file=export.rsc
```

1. 添加计划任务以运行脚本。

```ros
/system/scheduler/add on-event="export-send" start-time=00:00:00 interval=24h
```

**使用 TLS/SSL 加密向服务器发送电子邮件。**

:::info
Google Mail 不允许第三方设备使用标准 Gmail 密码进行身份验证。必须生成并使用 App password。

要生成 App password，请导航到 **Security > How you sign in to Google**，启用 2-Step Verification，然后生成 App password。在下面所示的 `set password=mypassword` 设置中使用生成的值。
:::

1. 配置客户端以连接到正确的服务器。

```ros
/tool/e-mail 
set address=smtp.gmail.com
set port=587
set tls=yes 
set from=myuser@gmail.com 
set user=myuser 
set password=mypassword
```

1. 使用 `send` 命令发送电子邮件。

```ros
/tool/e-mail/send to=myuser@anotherdomain.com subject="email test" body="email test" 
```
