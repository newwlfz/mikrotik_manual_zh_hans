---
title: "FlashFig"
description: "FlashFig 是一款 Windows 工具，用于通过 Layer-2 网络在数秒内传输 RouterOS 设置，从而快速、批量配置 MikroTik RouterBOARD。它支持 flash-boot 模式以实现自动化配置，并提供关于在旧型号上启用该模式和使用脚本的详细说明。"
tags:
  - 'flashfig'
source: https://manual.mikrotik.com/docs/7.25/management-tools/flashfig
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 描述 {#description}

FlashFig 是一款基于 Windows 的工具，用于对 MikroTik RouterBOARD 进行大批量配置。它适用于 MikroTik 经销商、Internet Service Providers 以及其他需要快速向多台设备部署 RouterOS 配置的组织。

当 RouterBOARD 处于 flash‑boot 模式，并在承载 FlashFig 的 Layer‑2 广播域内上电时，应用程序会在约三秒内将目标 RouterOS 配置文件传输到设备。因此，可以将每台 RouterBOARD 连接到同一 Layer‑2 网络，并为启用 FlashFig 的设备供电，从而并发配置一批路由器。

FlashFig 工具可从 MikroTik [Downloads](https://mikrotik.com/download) 页面下载。

自 2010 年 3 月起生产的所有 RouterBOARD 设备默认启用 FlashFig 模式。对于较旧型号，可在 RouterBOARD 设置中将 [`boot-device`](/docs/cli-reference/system/routerboard/settings#boot-device) 设置为 `flash‑boot` 或 `flash‑boot‑once‑then‑nand` 来激活 FlashFig：
```ros
/system/routerboard/settings/set boot-device=flash-boot-once-then-nand
# or
/system/routerboard/settings/set boot-device=flash-boot
```

:::info
每次通过软件发起系统重置，或使用重置按钮重置路由器时，都会启动 flash boot 模式。  
如果在给路由器上电前按住重置按钮，则会使用备用 booter。
:::

全新 RouterBOARD 上的 FlashFig 模式仅在首次成功用户登录或首次成功尝试 FlashFig 后，才会在后续启动时禁用，以避免之后发生意外重新配置。若要在同一台路由器上再次使用 FlashFig，需要在 RouterBOARD 设置中启用 **flash-boot**（成功完成配置更改后，或任何用户登录设备后，该设置会恢复为 NAND）。

如果之后使用 RouterOS *reset-configuration* 命令（或使用 Reset 按钮重置配置），将加载 FlashFig 配置。若要永久覆盖该配置，请使用 Netinstall 流程并勾选 *Apply default configuration*，或在基于 Linux 的命令行中使用 *-r* 参数。

从 RouterOS/FlashFig 7.22 开始，可以使用 Mode 脚本配置 **device‑mode**、**protected‑routerboot** 和其他设置。Mode 脚本会在任何自定义或默认配置脚本之前执行。完成后，该脚本会自动从设备中移除。如果脚本修改了 device-mode，设备会在执行后立即重启。

你可以在 MikroTik YouTube 频道查看 FlashFig [视频教程](https://www.youtube.com/watch?v=gticPeOdN54)。

### FlashFig 示例 {#flashfig-example}

以下为分步示例，说明如何使用 FlashFig 流程将选定的 MikroTik RouterOS 配置应用到“出厂全新”的 RouterBOARD。

#### 要求 {#requirements}

Windows 计算机必须具备以下端口并包含以下文件：

- 可用的 Ethernet 端口。
- 有效的 *Config* 和/或 *Mode* 脚本文件，包含类似 [export/import file](/docs/getting-started/configuration-management#configuration-export-and-import) 的 MikroTik RouterOS 配置。除有效的 MikroTik RouterOS CLI 命令外，还可以使用只读变量 *$defconfPassword* 和 *$defconfWifiPassword* 重新应用出厂密码；
- 始终使用 [downloads](https://mikrotik.com/download) 页面提供的最新 FlashFig 程序。
- RouterBOARD 必须处于 flash-boot 模式。如果是首次启动，则无需执行任何操作。

:::info
注意文本编辑器对 CR/LF 字符的处理，并在使用 FlashFig 应用配置前，先在相同版本的 RouterOS 上正常应用配置以测试其没有错误，因为运行时错误不可见！
:::

#### Pre-Configuration

##### Windows 计算机 {#windows-computer}

- 运行 FlashFig。
- 准备 *Config* 和/或 *Mode* 脚本 **.rsc** 文件。*Config* 和/或 *Mode* 脚本文件是[常规/导入文件](/docs/7.24/getting-started/configuration-management#configuration-export-and-import)，它接受有效的 MikroTik RouterOS CLI 命令。可以使用任意文本编辑器程序（Notepad、Notepad++、Text Editor、TextEdit、Microsoft Word、OpenOffice Writer）创建 .rsc 文件。

![](/img/9ac639cc13e6d13c.png)

- 指定 **Boot Client Address**，该地址应位于*与计算机以太网接口上配置的网段相同的网段*内。

![](/img/459f357dafb12f62.png)

- **浏览**以选择 *Config* 和/或 *Mode* 脚本 **.rsc** 文件

![](/img/5b58ab491c2a5392.png)

- 选中 *Config* 脚本文件并点击 **Select Config**，选中 *Mode* 脚本文件并点击 **Select Mode**。

![](/img/3f5383fa37a24c0f.png)

- 激活 FlashFig 服务器。现在它已准备好进行 FlashFig。网络中任何 RouterBOARD 在开机时如果 boot-device 配置为 **flash-boot** 或 **flash-boot-once-then-nand**，都会通过 FlashFig 完成配置。

![](/img/1a7ee92b57c059e9.png)

##### RouterBOARD

- FlashFig 模式在每台 RouterBOARD 出厂时默认启用，这意味着 RouterBOARD 上**无需配置**。

- 如果路由器上未启用 FlashFig，请使用 WinBox/Console 访问 RouterBOARD，并将 boot-device 更改为 *flash-boot* 或 *flash-boot-once-then-nand*：

```ros
/system/routerboard/settings/set boot-device=flash-boot
```

或者对单次启动使用更合适的选项 flash-boot：

```ros
/system/routerboard/settings/set boot-device=flash-boot-once-then-nand
```

您的路由器现在已准备好使用 FlashFig。

##### 连接 {#connect}

将 RouterBOARD 的 ***Boot*** 端口和 FlashFig 计算机连接到同一局域网。

##### 运行 FlashFig {#run-flashfig}

- 为 RouterBOARD 接通电源。
- 检查 FlashFig 程序中的状态。

![](/img/2d128f6e3034cca9.png)

Messages 日志显示“Flashfigged”，并且 RouterBOARD 反复发出字符“/”的摩尔斯电码声音（“\_..\_.”并闪烁 LED）——此时可以安全地拔下电源或关闭路由器：

- FlashFig **配置**已应用到 RouterBOARD，并且已**准备好**使用此新配置投入生产。

### 故障排除 {#troubleshoot}

#### FlashFig 找不到路由器 {#flashfig-can-not-find-a-router}

如果 PC 和路由器之间有其他设备（路由器/交换机），请确保该设备满足以下条件：

- DHCP server 已禁用。
- 如果使用的端口位于网桥中，请将网桥的 *protocol-mode* 设置为 *none*。
- 已禁用所用端口的 HW-offload。

#### FlashFig 找到路由器，但未完成刷写（无 TFTP 请求） {#flashfig-finds-a-router-flashing-is-not-done-no-tftp-request}

请确保运行 FlashFig 的计算机只有一个网络接口处于活动状态。

#### FlashFig 已完成，但配置未应用 {#flashfig-is-done-but-a-configuration-is-not-applied}

如果所有过程均成功，但 .rsc 文件中的 RouterOS 配置未应用，请向 \*.rsc 配置文件添加 [启动延迟](/docs/7.24/getting-started/configuration-management#startup-delay)。原因可能是配置脚本在所有接口启动之前执行。

#### FlashFig 空间不足，已忽略 {#not-enough-flash-space-ignoring}

FlashFig 配置的最大文件大小为 4000 字节，否则程序将返回前述错误。
