---
title: "RouterOS 配置重置"
description: "本页提供重置 MikroTik RouterOS 配置的完整说明，涵盖物理按钮方法以及 GUI/CLI 命令。其中详细介绍了每种重置操作的 LED 指示灯状态、备份加载器流程、旧型号上的跳线孔用法，以及用于无线网络访问的 WPS 功能。"
tags:
  - 'reset-configuration'
  - 'led'
source: https://manual.mikrotik.com/docs/7.24/getting-started/configuration-management/routeros-configuration-reset
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "getting-started/routeros-licensing"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 如何重置配置 {#how-to-reset-configuration}

要将 RouterOS 恢复为出厂默认设置（包括清除当前密码），请执行以下步骤：

1. 断开设备电源。
2. 按住 reset 按钮。

![Reset button](/img/5ead5bc05d6b5895.png)

1. 按住按钮的同时，重新接通设备电源。
2. 观察 LED。其中一个 LED（通常为 USR/User LED）将开始闪烁。
3. 当 LED 开始闪烁时，松开 reset 按钮。

设备将使用默认配置重新启动。

## 从 RouterOS 重置 {#reset-from-routeros}

如果仍可访问设备，可以直接从 RouterOS 恢复默认配置：

- 在终端中运行以下命令：**`/system/reset-configuration`**

- 或在 **[WinBox](/docs/management-tools/winbox)** 或 **[WebFig](/docs/management-tools/webfig)** 中导航到 **System → Reset Configuration**。

## 使用 Reset 按钮 {#using-the-reset-button}

MikroTik 设备配有 Reset 按钮，可根据启动时按住的时长执行多种功能。

:::tip
观看官方 MikroTips 系列视频：[reset sequence](https://youtu.be/6Unz92rABs8)。
:::

### 加载备份 RouterBOOT Loader {#load-the-backup-routerboot-loader}

在通电前按住 Reset 按钮，约 3 秒后松开。这将加载备份 RouterBOOT loader。

如果设备因 RouterBOOT 升级失败而无法启动，该方法很有用。使用备份 loader 启动后，可以在 RouterBOARD 设置中强制使用备份 loader，也可以从 `.fwf` 文件重新安装 RouterBOOT。

### 重置 RouterOS 配置 {#reset-the-routeros-configuration}

按住 reset 按钮，直到 LED 开始闪烁，然后松开。设备会将 RouterOS 配置重置为出厂默认值。

### 启用 CAPs 模式 {#enable-caps-mode}

LED 开始闪烁后，继续按住按钮约 **5 additional seconds**。LED 常亮时，松开按钮以启用 **[CAPs mode](/docs/wireless/abgn/capsman)**。

**CAPs mode** 也可以通过命令行启用：`/system/reset-configuration caps-mode=yes`

### 启动 Netinstall 模式 {#start-netinstall-mode}

给设备上电时按住 reset 按钮。继续按住按钮，直到 LED 序列完成（通常为闪烁 → 常亮 → 熄灭），然后松开。

设备将进入 Netinstall 模式，并开始在网络中搜索 Netinstall 服务器。

:::tip
观看官方 MikroTips 系列：[Netinstall](https://youtu.be/gzlLbIf3Dbk)。
:::

有关 Netinstall 的详细说明，请参阅 **[Netinstall 文档](/docs/getting-started/installation-and-upgrade/netinstall)**。

## 复位跳线方法 {#reset-jumper-method}

较旧的 RouterBOARD 型号也配有复位跳线孔。部分设备可能需要打开外壳。RB750/RB951/RB751 的跳线孔位于外壳的一个橡胶脚垫下方。

用金属螺丝刀短接 reset jumper，并启动设备，直到配置被清除：  

![](/img/61678bee6d9ce0df.jpg) ![](/img/1427924e57ac32a1.jpg)

### 旧型号的跳线重置 {#jumper-reset-for-older-models}

下图显示了较旧 RouterBOARD（如 RB133C）上 Reset Jumper 的位置：

![](/img/7710f08056600f89.jpg)

:::danger
配置重置后，请务必移除跳线，否则每次重启时都会重置！
:::

### WPS

部分设备带有 WPS 按钮，或带有 WPS 功能的 reset 按钮，可用于简化无线客户端连接，无需手动输入密码。部分型号还支持设备之间的 WPS 同步。
有关 WPS 和 reset 按钮功能的型号特定信息，请参阅设备的 [User Manual](/hardware/)。
