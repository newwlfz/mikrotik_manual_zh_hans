---
sidebar_key: "system-information-and-utilities/note"
sidebar_position: 9
title: "备注"
sidebar_label: "备注"
description: "系统注释是 RouterOS 在登录时向管理员显示的文本：路由器的用途、联系方式或警告。可在 CLI、WinBox 中或通过 sys-note.txt 文件设置，并在 Telnet 登录提示符之前显示。"
tags:
  - 'system-note'
  - 'cli'
source: https://manual.mikrotik.com/docs/7.25/system-information-and-utilities/note
captured_at: '2026-11-04T11:22:04+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

系统备注是 RouterOS 向每位登录的管理员显示的文本：在命令行中紧跟在登录横幅之后显示，在 WinBox 中则于登录后在一个窗口中显示。可用它说明路由器用途、联系人，或说明哪些操作不能做，例如在维护窗口期间。该备注默认为空。

## 设置备注 {#set-a-note}

使用 `note` 设置文本。在双引号字符串中，`\n` 表示换行：

```ros
/system/note/set \
    note="Office gateway. IT: +371 0000000\nNo reboots 08:00-18:00"
```

在下一次交互式登录时（例如通过 SSH 或 MAC Telnet），备注会显示在登录横幅之后：

```text
  MikroTik RouterOS 7.25beta5 (c) 1999-2026       https://www.mikrotik.com/

Press F1 for help

Office gateway. IT: +371 0000000
No reboots 08:00-18:00
```

通过 SSH 运行且没有交互式会话的命令（例如 `ssh admin@router '/system/resource/print'`）不会显示备注。对于较长的文本，`/system/note/edit note` 会在内置编辑器中打开备注。若要不删除备注但停止显示它，请设置 `show-at-login=no`。

## 在 WinBox 中配置备注 {#configure-the-note-in-winbox}

打开 **System > Note**：

1. 使用 **Show At Login** 和 **Show At CLI Login** 选择备注何时显示。**Show At Login** 会在登录后显示它；**Show At CLI Login** 还会在 Telnet 登录提示符之前显示它。
2. 在 **Note** 中输入消息，然后选择 **OK**。例如，记录路由器的用途和维护联系人。文本区域支持多行。

![WinBox System Note dialog with login display options and the Note text area](/img/a61e903df56a5414.webp)

## 在登录前显示备注 {#show-the-note-before-login}

当 `show-at-cli-login=yes` 时，路由器还会在 Telnet 登录提示符之前打印备注，下面是从另一台路由器使用 `/system/telnet 192.168.88.1` 看到的效果：

```text
Connecting to 192.168.88.1
Connected to 192.168.88.1
Office gateway. IT: +371 0000000
No reboots 08:00-18:00
Login:
```

此功能独立于 `show-at-login`。任何连接到 Telnet 端口的人无需登录就能看到此文本，因此不要把仅供管理员查看的信息放在备注中。Telnet 默认启用；请参阅 [服务](./services.md)。SSH 不会在登录前显示备注，而 MAC Telnet 会在连接前要求输入用户名和密码，因此它只在登录后显示备注。

## 从文件设置备注 {#set-the-note-from-a-file}

路由器文件存储根目录中名为 `sys-note.txt` 的纯文本文件会在下次启动时替换备注，随后路由器会删除该文件。要通过这种方式在新路由器上设置备注，请上传该文件（例如通过 SFTP 或 FTP），然后重启路由器。

有关参数，请参阅 [`/system/note` CLI 参考](../cli-reference/system/note.md)。
