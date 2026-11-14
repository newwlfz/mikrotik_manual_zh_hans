---
sidebar_key: "getting-started/index"
sidebar_position: 12
title: "入门"
sidebar_label: "入门"
description: "入门指南\"提供了 RouterOS 初始设置的基本说明，包括连接方法、管理界面访问以及将 MikroTik 路由器投入服务所需的基本安全任务。"
tags:
  - 'first-time-configuration'
source: https://manual.mikrotik.com/docs/7.24/getting-started
captured_at: '2026-11-04T11:28:24+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

入门部分涵盖 RouterOS 的初始设置、配置管理、安装、授权、升级、备份以及首次安全设置任务。使用本节可将路由器投入运行并维护基础系统。

## 快速入门：连接到路由器 {#quickstart-connect-to-your-router}

如果你刚刚拆开 MikroTik 设备的包装，并希望访问其管理界面：

1. 将一根以太网线从你的计算机连接到路由器上 **除** `ether1` 之外的任意端口。
2. 接通电源。等待大约一分钟，让设备完成启动。
3. 使用以下任意方式访问管理界面：
   - 使用浏览器访问 **`http://192.168.88.1`**（WebFig）
   - **[WinBox](https://mikrotik.com/download)**——适用于 Windows、macOS 和 Linux 的桌面 GUI
   - **MikroTik 移动应用**（iOS / Android）
4. 使用设备专用密码，以用户 **`admin`** 登录；该密码印在**路由器上的贴纸**上（也印在其包装盒上）。

你已经进入。当准备实际配置互联网访问、Wi-Fi、防火墙规则等时，请遵循完整的[首次配置](./first-time-configuration.md)指南。

<DocCardList />
