---
title: "升级"
description: "本页介绍 MikroTik 设备的 RouterOS 升级流程，涵盖通过发布链（Long term、Stable、Testing、Development）进行自动更新、通过 WinBox/WebFig/FTP 手动升级，以及 bootloader 升级建议。其中说明版本编号约定、更新工作流，以及关键安全步骤的故障排查警告。"
tags:
  - 'upgrade'
  - 'release-chains'
source: https://manual.mikrotik.com/docs/7.24/getting-started/installation-and-upgrade/upgrade
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

MikroTik 设备预装 RouterOS，因此通常无需安装，除非要通过 CHR 镜像在裸机 x86 PC 或虚拟机上安装 RouterOS。在已安装设备上的升级过程很简单。

## 版本号 {#version-numbering}

RouterOS 版本按序列编号，句点用于分隔序列；它*不*表示小数点，这些序列也*不*具有位值意义。例如，标识符 2.5 并不是“二又二分之一”或“通往版本三的一半”；它表示第二个一级修订中的第五个二级修订。因此 v5.2 早于 v5.18，后者更新。

RouterOS 版本通过多个“发布链”发布：Long term、Stable、Testing 和 Development。升级 RouterOS 时，可以选择要从中安装新软件包的发布链：

- **Long term**：发布频率很低，仅包含最关键的修复。同一数字分支内的升级不包含新功能。当某个 **Stable** 版本发布一段时间并被认为足够稳定后，它会被提升到长期分支，替换较旧的版本，而旧版本会被移入归档。这会持续增加新功能。
- **Stable**：每隔几个月发布一次，包含所有经过测试的新功能和修复。
- **Testing**：每隔几周发布一次，仅经过基本内部测试，不应在生产环境中使用。
- **Development**：在必要时发布。包含原始变更，供软件爱好者测试新功能。

<center>![](/img/f71534dc9d81988a.webp)</center>

## 标准升级 {#standard-upgrade}

软件包升级功能会通过 HTTPS（自 v7.23 起）从路由器连接到 MikroTik 下载服务器，并检查所选发布通道中是否有更新的 RouterOS 版本。此菜单也可用于降级，只需将通道更改为提供较旧但更稳定版本的通道。请注意，该功能是从路由器发起连接，而不是从你的计算机发起，因此路由器本身需要能够访问 MikroTik 服务器的 HTTPS。确保路由器前方的任何防火墙都允许 TCP 端口 443。

在 QuickSet 或 System → Packages 菜单中点击 *Check for Updates* 按钮后，将打开 *Check for Updates* 窗口，其中显示当前变更日志或最新变更日志（如果存在更新版本）。如果有更新版本，将显示 *Download* 和 *Download&Install* 按钮。点击 *Download* 会下载最新版本（需要手动重启设备），而点击 *Download&Install* 会开始下载，并在下载成功后自动重启设备。

提供的版本取决于所选的发布通道。并非所有版本都可用。使用 check-for-updates 方式时，无法一步从旧版本升级到最新版本。例如，如果运行 RouterOS v6.x，即使选择名为“Upgrade”的主版本升级通道，也只会看到 v7.12.1 作为可用版本。必须先升级到该中间版本，之后升级通道中才会显示更新版本。该中间步骤也可以通过 check for updates 完成；只需在首次更新到中间版本后再次执行 check for updates。

如果安装了自定义软件包，下载器会将其考虑在内并下载所有必要的软件包。

:::warning
强烈建议在 RouterOS 更新后升级 bootloader。要升级 bootloader，请在 CLI 中执行 [`/system/routerboard/upgrade`](/docs/cli-reference/system/routerboard/upgrade) 命令，然后重启。或者，进入 GUI 的 System → RouterBOARD 菜单，点击“Upgrade”按钮，然后重启设备。
:::

可以通过在系统调度程序中运行脚本来**自动化**升级过程。该脚本会向 MikroTik 升级服务器查询新版本。如果收到的响应为“New version is available”，脚本会发出下面的升级命令。重要说明：如果是在旧版本上首次运行，这将不起作用。如果运行 v6.x，脚本可能看不到最新版本为可用版本；必须先手动选择“Upgrade”通道，进行主版本升级到 v7.12.1 中间版本，之后更新的 v7 版本才会在升级通道中可见。

```ros
/system/package/update/check-for-updates
:delay 3s;
:if ( [/system/package/update get status] = "New version is available") do={ /system/package/update/install }
```

## 手动升级 {#manual-upgrade}

可以通过以下方式升级 RouterOS：

- WinBox – 将文件拖放到 Files 菜单。
- WebFig - 从 Files 菜单上传文件。
- FTP - 将文件上传到根目录。

:::warning
强烈建议在升级 RouterOS 后升级 bootloader。要升级 bootloader，请在 CLI 中执行 [`/system/routerboard/upgrade`](/docs/cli-reference/system/routerboard/upgrade) 命令，然后重启。或者，进入 GUI 的 System → RouterBOARD 菜单，点击“Upgrade”按钮，然后重启设备。

**警告：** 无法通过串行线缆升级 RouterOS。此方法只能升级 [RouterBOOT](/docs/getting-started/installation-and-upgrade/routerboot#simple-upgrade)。
:::

### 手动升级过程 {#manual-upgrade-process}

- 访问 [www.mikrotik.com](http://www.mikrotik.com) 并进入 Software 页面，然后选择已安装 RouterOS 的系统架构（系统架构可在 System → Resource 部分中查看）。
- 下载 **routeros *(main)*** 以及设备上已安装的额外软件包。
- 使用前面提到的方法之一将软件包上传到设备。

如果需要跳过某个特定软件包的升级，或者某个软件包文件已不可用，请使用 [`/system/package/update/install ignore-missing`](/docs/cli-reference/system/package/update/install) 跳过缺失的软件包。

#### 使用 WinBox {#using-winbox}

选择系统类型，并下载升级包。使用 WinBox 连接到路由器。用鼠标选择下载的文件，并将其拖到 Files 菜单。如果其中已有一些文件，请确保将软件包放在根菜单中，而不是 hotspot 文件夹中！上传将开始。

<center>![](/img/0dc7b4abcd83694c.webp)</center>

上传完成后，重启设备。新版本号将显示在 Winbox Title 和 Packages 菜单中

#### 使用 S/FTP {#using-sftp}

- 打开常用的 S/FTP 程序，选择软件包，并将其上传到路由器。
- 如有需要，可以检查文件是否已成功传输到路由器（可选）。

```ros
[admin@MikroTik] >/file/print
Columns: NAME, TYPE, SIZE, CREATION-TIME
#  NAME                  TYPE       SIZE     CREATION-TIME       
0  routeros-7.9-arm.npk  package    13.0MiB  2023-05-18 16:16:18
1  pub                   directory           2022-11-04 11:22:19
2  ramdisk               directory           1970-01-01 03:00:24
```

- 重启路由器以开始升级过程。

```ros
[admin@MikroTik] >/system/reboot
Reboot, yes? [y/N]: y

```

- 重启后，路由器将更新到最新版本，可以在此菜单中检查：

```ros
/system/package/print

```

- 如果路由器未正确升级，请务必检查 **日志**

```ros
/log/print without-paging

```

## RouterOS 本地升级 {#routeros-local-upgrade}

可以通过一台包含所有所需软件包的设备上的 [`/system/package/local-update`](/docs/cli-reference/system/package) 工具，升级本地网络中的一台或多台 MikroTik 路由器。以下是一个包含 3 台路由器的简单示例（同一方法适用于包含任意数量路由器的网络）：

- 在主路由器的 Files 菜单下放置所需的软件包：

<center>![](/img/33416bc0f10bc51a.webp)</center>

**可选**，可以在主设备之间设置一台镜像设备；如果不需要，请跳过此步骤：

- 选择 Local Package Sources 并启用 Mirror device。将 Primary Server 设置为软件包所在的位置 10.155.136.50。Check Interval **minimum** 可设置为 00:07:12，设备将使用 Winbox 连接到主设备并检查软件包。  
  如果有新软件包可用，设备将开始下载。请注意，下载过程较慢，使用大量文件时可能需要一些时间。如果发生某些故障，下载将在下次 Check 时继续。

<center>![](/img/19a7104b3178b5ef.webp)</center>

- 创建新的 `packs` 文件夹，镜像设备将在其中存储软件包：

<center>![](/img/f4440913970c962d.webp)</center>

- 在要更新的设备上添加新的软件包源，本示例使用镜像设备 10.155.136.71：

<center>![](/img/5f508bcb1902b63e.webp)</center>

- 在 Local Update packages 选项卡中点击 **Refresh** 后，使用 Winbox 的设备将尝试连接到源并检查是否有新软件包。

<center>![](/img/b1034914a72f4b14.webp)</center>

- 选择软件包并点击 **Download**，下载完成后，设备需要重启以完成更新。

<center>![](/img/0f893624b863b331.webp)</center>

- 在脚本中使用 `/system/package/local-update/refresh` 自动执行此操作。可以使用 Fetch 工具从我们的网页下载软件包，例如：

```ros
/tool/fetch url=https://download.mikrotik.com/routeros/7.16.1/routeros-7.16.1-arm.npk
```
