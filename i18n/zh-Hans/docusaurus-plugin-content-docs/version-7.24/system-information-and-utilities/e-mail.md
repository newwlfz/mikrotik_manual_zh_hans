---
sidebar_key: "system-information-and-utilities/e-mail"
sidebar_position: 3
title: "电子邮件"
sidebar_label: "电子邮件"
description: "RouterOS 中的电子邮件工具支持使用带明文认证或 TLS 加密的 SMTP 直接从设备发送电子邮件，支持计划备份和可自定义的电子邮件内容。它允许通过 `/tool/e-mail` 子菜单配置 SMTP 服务器、认证详细信息、加密设置和附件处理。"
tags:
  - 'email'
  - 'smtp'
  - 'tls'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/e-mail
captured_at: '2026-11-04T11:33:26+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

E-mail 工具是一个内置的 RouterOS 实用工具，使路由器能够直接从设备发送电子邮件。它可用于按计划自动将配置备份和导出文件发送给网络管理员。

E-mail 工具支持明文认证和 TLS 加密。不支持其他身份验证或加密方法。

## 属性 {#properties}

**子菜单：** `/tool/e-mail`

此子菜单允许设置将要使用的 SMTP 服务器。

| 属性 | 描述 |
| :-- | :-- |
| **address** (*IP/IPv6 address*; 默认：**0.0.0.0**) | SMTP 服务器的 IP 地址。 |
| **certificate-verification**(*yes* \| *yes-without-crl* \| *no*; 默认：**no**) | 启用从本地证书存储进行的信任链验证。*yes-without-crl* 会验证证书，但不执行 CRL 检查（证书吊销列表）。 |
| **from** (*string*; 默认：**\<>**) | 将显示为发件人的名称或电子邮件地址。 |
| **password** (*string*; 默认：**""**) *[敏感](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用于向 SMTP 服务器进行身份验证的密码。 |
| **port** (*integer[0..65535]*; 默认：**25**) | SMTP 服务器的端口。 |
| **tls** (*no\|yes\|starttls*; 默认：**no**) | 是否使用 TLS 加密：yes - 发送 STARTTLS，如果服务器上无法使用 TLS 则断开会话；no - 不发送 STARTTLS；starttls - 发送 STARTTLS，如果服务器响应 TLS 不可用，则继续不使用 TLS |
| **user** (*string*; 默认：**""**) | 用于向 SMTP 服务器进行身份验证的用户名。 |
| **vrf** (*VRF name*; 默认值：**main**) | 设置服务创建传出连接时使用的 VRF。 |

:::warning
**注意：** 所有服务器配置（如果已指定）都可以被 send 命令覆盖。
:::

---

## 发送电子邮件 {#sending-email}

**子菜单：** `/tool/e-mail`

Send 命令接受以下参数：

| 属性 | 描述 |
| :-- | :-- |
| **body** (*string*; 默认： ) | 电子邮件消息的实际正文 |
| **cc** (*string*; 默认： ) | 向列出的收件人发送副本。允许使用多个地址，使用 "," 分隔条目 |
| **certificate-verification**(*yes* \| *yes-without-crl* \| *no*; 默认：**no**) | 启用从本地证书存储进行的信任链验证。*yes-without-crl,* 会验证证书，但不执行 CRL 检查（证书吊销列表）。 |
| **file** (*File[,File]*; 默认： ) | 将以逗号分隔的、要附加到邮件中的文件名列表。 |
| **from** (*string*; 默认： ) | 将显示为发件人的名称或电子邮件地址。如果未指定，则使用服务器配置中的值。 |
| **password** (*string*; 默认： ) *[敏感](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用于向 SMTP 服务器进行身份验证的密码。如果未指定，则使用服务器配置中的值。 |
| **port** (*integer[0..65535]*; 默认： ) | SMTP 服务器的端口。如果未指定，则使用服务器配置中的值。 |
| **server** (*IP/IPv6 address*; 默认： ) | SMTP 服务器的 IP 或 IPv6 地址。如果未指定，则使用服务器配置中的值。 |
| **tls** (*yes\|no\|starttls*; 默认：**no**) | 是否使用 TLS 加密：yes - 发送 STARTTLS，如果服务器上无法使用 TLS 则断开会话；no - 不发送 STARTTLS；starttls - 发送 STARTTLS，如果服务器响应 TLS 不可用，则继续不使用 TLS |
| **subject** (*string*; 默认： ) | 消息的主题。 |
| **to** (*string*; 默认： ) | 目标电子邮件地址。仅允许单个地址。 |
| **user** (*string*; 默认： ) | 用于向 SMTP 服务器进行身份验证的用户名。如果未指定，则使用服务器配置中的值。 |

---

## 基本示例 {#basic-examples}

**本示例将展示如何每 24 小时发送一封带有配置导出的电子邮件。**

1. 配置 SMTP 服务器。

```ros
[admin@MikroTik] /tool/e-mail> set server=10.1.1.1 port=25 from="router@mydomain.com"
```

1. 添加一个名为 "export-send" 的新脚本：

```ros
/export file=export 
/tool/e-mail/send to="config@mydomain.com" subject="$[/system/identity/get name] export" \ 
body="$[/system/clock/get date] configuration file" file=export.rsc
```

1. 添加调度器以运行我们的脚本。

```ros
/system/scheduler/add on-event="export-send" start-time=00:00:00 interval=24h
```

**使用 TLS/SSL 加密向服务器发送电子邮件。**

:::info
Google Mail 不允许第三方设备使用标准 Gmail 密码进行身份验证。必须改为生成并使用 App 密码。

要生成 App 密码，请导航到 **Security > How you sign in to Google**，启用 2-Step Verification，然后生成 App 密码。在下面所示的 `set password=mypassword` 设置中使用生成的值。
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

1. 使用 send 命令发送电子邮件。

```ros
/tool/e-mail/send to=myuser@anotherdomain.com subject="email test" body="email test" 
```
