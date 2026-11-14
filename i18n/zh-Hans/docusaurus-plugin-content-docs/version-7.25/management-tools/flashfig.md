---
sidebar_key: "management-tools/flashfig"
sidebar_position: 9
title: "FlashFig"
sidebar_label: "FlashFig"
description: "FlashFig 是一款 Windows 实用程序，用于通过在数秒内经由二层网络传输 RouterOS 设置，快速、大批量地配置 MikroTik RouterBOARD。它支持 flash-boot 模式以进行自动化配置，并提供了在旧型号上启用该模式以及使用脚本的详细说明。"
tags:
  - 'flashfig'
source: https://manual.mikrotik.com/docs/7.25/management-tools/flashfig
captured_at: '2026-11-04T11:19:41+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### 描述 {#description}

FlashFig 是一款基于 Windows 的实用工具，专为大批量配置 MikroTik RouterBOARD 而设计。它面向 MikroTik 分销商、互联网服务提供商以及其他需要快速向多台设备部署 RouterOS 配置的组织。

当 RouterBOARD 进入 flash‑boot 模式，并在承载 FlashFig 的二层广播域内上电时，应用程序会在大约三秒内将目标 RouterOS 配置文件传输到设备。因此，通过将每台 RouterBOARD 连接到同一个二层网络，并为启用了 FlashFig 的设备供电，就可以同时批量配置多台路由器。

FlashFig 实用工具可从 MikroTik [下载](https://mikrotik.com/download)页面下载。

FlashFig mode is enabled by default on all RouterBOARD units manufactured since March 2010. For older models, FlashFig can be activated by setting the [`boot-device`](/docs/7.25/cli-reference/system/routerboard/settings#boot-device) to `flash‑boot` or `flash‑boot‑once‑then‑nand` in RouterBOARD settings:
```ros
/system/routerboard/settings/set boot-device=flash-boot-once-then-nand
# or
/system/routerboard/settings/set boot-device=flash-boot
```

:::info
每次从软件发起系统重置后，或使用复位按钮重置路由器时，都会进入 flash boot 模式。  
如果在给路由器上电前按住复位按钮，则会使用备用 booter。
:::

在一台全新的 RouterBOARD 上，只有在首次成功用户登录或 FlashFig 尝试成功后，后续启动时才会禁用 FlashFig 模式，以避免之后发生不必要的重新配置。要在同一台路由器上再次使用 FlashFig，需要在 RouterBOARD 设置中启用 **flash-boot**（在成功更改配置后，或任何用户登录到板卡后，此设置会恢复为 NAND）。

如果之后使用 RouterOS *reset-configuration* 命令（或使用 Reset 按钮重置配置），则会加载 FlashFig 配置。要永久覆盖，请使用 Netinstall 流程并勾选 *Apply default configuration*，或在基于 Linux 的命令行中使用 *-r* 标志。

从 RouterOS/FlashFig 7.22 开始，您可以使用 Mode 脚本配置 **device‑mode** 和 **protected‑routerboot** 以及其他设置。Mode 脚本会在任何自定义或默认配置脚本之前执行。完成后，该脚本会自动从设备中移除。如果脚本修改了 device-mode，则设备会在执行后立即重启。

你可以在 MikroTik YouTube 频道观看 FlashFig [视频教程](https://www.youtube.com/watch?v=gticPeOdN54)。

### FlashFig 示例 {#flashfig-example}

以下是一个分步示例，说明如何使用 FlashFig 流程将选定的 MikroTik RouterOS 配置应用到“出厂全新”的 RouterBOARD。

#### 要求 {#requirements}

Windows 计算机必须配备以下端口并包含以下文件：

- 一个可用的以太网端口。
- 有效的 *Config* 和/或 *Mode* 脚本文件，其中包含类似于 [导出/导入文件](../getting-started/configuration-management/index.md#configuration-export-and-import) 的 MikroTik RouterOS 配置。除了有效的 MikroTik RouterOS CLI 命令外，还可以使用只读变量 *$defconfPassword* 和 *$defconfWifiPassword* 重新应用出厂密码；
- 始终使用 [下载](https://mikrotik.com/download) 页面提供的最新 FlashFig 程序。
- RouterBOARD 必须处于 flash-boot 模式。如果这是首次启动，则无需执行任何操作。

:::info
请注意文本编辑器对 CR/LF 字符的处理方式，并在通过 FlashFig 应用之前，先在相同版本的 RouterOS 上正常应用该配置进行测试，确保配置没有错误，因为运行时错误不可见！
:::

#### 预配置 {#pre-configuration}

##### Windows 计算机 {#windows-computer}

- 运行 FlashFig。
- 准备 *Config* 和/或 *Mode* 脚本 **.rsc** 文件。*Config* 和/或 *Mode* 脚本文件是[常规/导入文件](../getting-started/configuration-management/index.md#configuration-export-and-import)，它接受有效的 MikroTik RouterOS CLI 命令。你可以使用任何文本编辑器程序（Notepad、Notepad++、Text Editor、TextEdit、Microsoft Word、OpenOffice Writer）创建 .rsc 文件。

![](/img/9ac639cc13e6d13c.png)

- 分配 **Boot Client Address**，该地址应处于*与计算机以太网接口上配置的子网相同的子网*内。

![](/img/459f357dafb12f62.png)

- **Browse** 选择 *Config* 和/或 *Mode* 脚本 **.rsc** 文件

![](/img/5b58ab491c2a5392.png)

- 高亮 *Config* 脚本文件并点击 **Select Config**，高亮 *Mode* 脚本文件并点击 **Select Mode**。

![](/img/3f5383fa37a24c0f.png)

- 激活 FlashFig 服务器。现在即可进行 FlashFig。当任何 RouterBOARD 上电且 boot-device 配置为 **flash-boot** 或 **flash-boot-once-then-nand** 时，它都会在网络中被 FlashFig 刷写。

![](/img/1a7ee92b57c059e9.png)

##### RouterBOARD {#routerboard}

- 每台 RouterBOARD 出厂时默认启用 FlashFig 模式，这意味着 RouterBOARD 上**无需配置**。

- 如果您的路由器未启用 FlashFig，请使用 WinBox/Console 访问 RouterBOARD，并将 boot-device 更改为 *flash-boot* 或 *flash-boot-once-then-nand*：

```ros
/system/routerboard/settings/set boot-device=flash-boot
```

或者使用更可取的单次启动 flash-boot 选项：

```ros
/system/routerboard/settings/set boot-device=flash-boot-once-then-nand
```

你的路由器现在已准备好进行 FlashFig。

##### 连接 {#connect}

将 RouterBOARD 的 ***Boot*** 端口与 FlashFig 计算机连接到同一局域网。

##### 运行 FlashFig {#run-flashfig}

- 为 RouterBOARD 接通电源。
- 在 FlashFig 程序中检查状态。

![](/img/2d128f6e3034cca9.png)

消息日志显示 "Flashfigged"，并且 RouterBOARD 会反复发出字符 "/" 的摩尔斯电码声音（"\_..\_." 并闪烁 LED）——现在可以安全地拔掉电源 / 关闭路由器：

- FlashFig **配置**已应用到 RouterBOARD，它已**准备好**使用此新配置投入生产。

### 故障排除 {#troubleshoot}

#### FlashFig 找不到路由器 {#flashfig-can-not-find-a-router}

如果 PC 和路由器之间还有另一台设备（路由器/交换机），请确保对于该设备：

- DHCP 服务器已禁用。
- 如果使用的端口位于网桥中，请将网桥 *protocol-mode* 设置为 *none*。
- 已禁用所用端口的 HW-offload。

#### FlashFig 找到路由器，但未完成刷写（没有 TFTP 请求） {#flashfig-finds-a-router-flashing-is-not-done-no-tftp-request}

确保运行 FlashFig 的计算机只有一个活动的网络接口。

#### FlashFig 已完成，但配置未应用 {#flashfig-is-done-but-a-configuration-is-not-applied}

如果所有步骤都成功，但 .rsc 文件中的 RouterOS 配置未应用，请向 \*.rsc 配置文件添加[启动延迟](../getting-started/configuration-management/index.md#startup-delay)。原因可能是配置脚本在所有接口启动之前就被执行。

#### Flash 空间不足，已忽略 {#not-enough-flash-space-ignoring}

FlashFig 配置的最大文件大小最多为 4000 字节，否则程序会返回如前所述错误。
