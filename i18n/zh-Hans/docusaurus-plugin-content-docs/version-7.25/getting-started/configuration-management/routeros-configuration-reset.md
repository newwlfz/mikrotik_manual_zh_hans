---
sidebar_key: "getting-started/configuration-management/routeros-configuration-reset"
sidebar_position: 5
title: "RouterOS 配置重置"
sidebar_label: "RouterOS 配置重置"
description: "本页提供了重置 MikroTik RouterOS 配置的全面说明，涵盖物理按键方法以及 GUI/CLI 命令。它详细介绍了每种重置操作对应的 LED 指示灯、backup loader 步骤、旧型号上的跳线孔用法，以及用于无线网络接入的 WPS 功能。"
tags:
  - 'reset-configuration'
  - 'led'
source: https://manual.mikrotik.com/docs/7.25/getting-started/configuration-management/routeros-configuration-reset
captured_at: '2026-11-04T11:16:46+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 如何重置配置 {#how-to-reset-configuration}

要将 RouterOS 重置为出厂默认值（包括移除当前密码），请按以下步骤操作：

1. 断开设备电源。
2. 按住复位按钮。

![Reset button](/img/5ead5bc05d6b5895.png)

1. 在按住按钮的同时，重新给设备通电。
2. 观察 LED。其中一个 LED（通常是 USR/User LED）将开始闪烁。
3. 当 LED 开始闪烁时，松开复位按钮。

设备将使用默认配置重新启动。

## 从 RouterOS 重置 {#reset-from-routeros}

如果仍能访问设备，可以直接从 RouterOS 恢复默认配置：

- 在终端中运行以下命令：**`/system/reset-configuration`**

- 或在 **[WinBox](../../management-tools/winbox.md)** 或 **[WebFig](../../management-tools/webfig.md)** 中导航到 **系统 → 重置配置**。

## 使用复位按钮 {#using-the-reset-button}

MikroTik 设备配有复位按钮，根据启动期间按住时间的长短，它可以执行多种功能。

:::tip
观看官方 MikroTips 系列：[复位序列](https://youtu.be/6Unz92rABs8)。
:::

### 加载备份 RouterBOOT Loader {#load-the-backup-routerboot-loader}

在通电前按住复位按钮，约 3 秒后松开。这样会加载备份 RouterBOOT Loader。

如果设备因 RouterBOOT 升级失败而无法启动，这会很有用。使用备份加载器启动后，你可以在 RouterBOARD 设置中强制使用备份加载器，或从 `.fwf` 文件重新安装 RouterBOOT。

### 重置 RouterOS 配置 {#reset-the-routeros-configuration}

按住复位按钮，直到 LED 开始闪烁，然后松开。设备会将其 RouterOS 配置重置为出厂默认值。

### 启用 CAPs 模式 {#enable-caps-mode}

在 LED 开始闪烁后，继续按住按钮约 **5 秒**。当 LED 变为常亮时，松开按钮以启用 **[CAPs 模式](../../wireless/abgn/capsman/index.md)**。

**CAPs 模式**也可以通过命令行启用：`/system/reset-configuration caps-mode=yes`

### 启动 Netinstall 模式 {#start-netinstall-mode}

在给设备通电时按住复位按钮。继续按住按钮，直到 LED 序列完成（通常为闪烁 → 常亮 → 熄灭），然后松开。

设备将进入 Netinstall 模式，并开始在网络上搜索 Netinstall 服务器。

:::tip
观看官方 MikroTips 系列：[Netinstall](https://youtu.be/gzlLbIf3Dbk)。
:::

有关详细的 Netinstall 操作说明，请参阅 **[Netinstall 文档](../installation-and-upgrade/netinstall/index.md)**。

## 复位跳线方法 {#reset-jumper-method}

较旧的 RouterBOARD 型号还配有复位跳线孔。某些设备可能需要打开外壳。RB750/RB951/RB751 的跳线孔位于外壳的一个橡胶脚垫下方。

使用金属螺丝刀短接复位跳线，并启动板卡，直到配置被清除：  

![](/img/61678bee6d9ce0df.jpg) ![](/img/1427924e57ac32a1.jpg)

### 较旧型号的跳线复位 {#jumper-reset-for-older-models}

下图显示了较旧 RouterBOARD（如 RB133C）上复位跳线的位置：

![](/img/7710f08056600f89.jpg)

:::danger
配置重置后，不要忘记移除跳线，否则每次重启时配置都会被重置！
:::

### WPS {#wps}

某些设备配有 WPS 按钮，或具有 WPS 功能的复位按钮，可用于简化无线客户端连接，无需手动输入密码。某些型号还支持设备之间的 WPS 同步。
有关 WPS 和复位按钮功能的型号特定信息，请参阅设备的[用户手册](/hardware/)。
