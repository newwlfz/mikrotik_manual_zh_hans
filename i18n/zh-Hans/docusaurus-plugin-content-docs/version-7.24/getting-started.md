---
title: "入门指南"
description: "“入门指南”提供 RouterOS 初始设置的基本说明，包括连接方法、管理界面访问和基本安全任务，以使 MikroTik 路由器投入运行。"
tags:
  - 'first-time-configuration'
source: https://manual.mikrotik.com/docs/7.24/getting-started
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

入门介绍涵盖 RouterOS 初始设置、配置管理、安装、授权、升级、备份以及首次安全任务。使用本节可使路由器投入运行并维护基础系统。

## 快速入门：连接到路由器 {#quickstart-connect-to-your-router}

如果刚拆封 MikroTik 设备并希望访问其管理界面：

1. 用网线将计算机连接到路由器上除 `ether1` 以外的任意端口。
2. 接通电源。等待约一分钟，让设备完成启动。
3. 使用以下任一方式访问管理界面：
   - 浏览器访问 **`http://192.168.88.1`**（WebFig）
   - **[WinBox](https://mikrotik.com/download)** — 适用于 Windows、macOS 和 Linux 的桌面 GUI
   - **MikroTik mobile app**（iOS / Android）
4. 使用用户 **`admin`** 登录，密码为**路由器贴纸**上印制的设备专用密码（包装盒上也有）。

已进入管理界面。准备实际配置互联网接入、Wi-Fi、防火墙规则等内容时，请遵循完整的 [First Time Configuration](/docs/getting-started/first-time-configuration) 指南。

<DocCardList />
