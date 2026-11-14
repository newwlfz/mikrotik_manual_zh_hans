---
sidebar_key: "getting-started/supout-rif"
sidebar_position: 10
title: "Supout.rif"
sidebar_label: "Supout.rif"
description: "supout.rif 文件是用于 MikroTik 支持的路由器诊断快照。可通过 CLI、WinBox 或 WebFig 创建它，将其下载并用 Supout.rif viewer 打开。"
tags:
  - 'supout-rif'
  - 'debugging'
source: https://manual.mikrotik.com/docs/getting-started/supout-rif
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

支持输出文件（`supout.rif`）是供 MikroTik 支持使用的路由器诊断快照。它包含路由器的配置、日志、进程状态、监控命令（例如接口状态）的输出，以及 RouterOS 崩溃时的崩溃数据。请在问题出现时创建该文件，以便它反映路由器当时的状态，并通过 [MikroTik 支持](https://mikrotik.com/support) 页面随请求一并发送。

在意外重启或崩溃后，请立即创建该文件，然后再升级或再次重启路由器。如果文件列表中有 `autosupout.rif` 和 `autosupout.old.rif`，也请一并发送。

该文件经过编码。要查看其内容，请登录您的 MikroTik 账户，并使用左侧导航栏中的“Supout.rif viewer”工具上传并分析该文件。

## 创建文件 {#create-the-file}

在 CLI 中，运行 [`/system/sup-output`](../cli-reference/system/sup-output.md)：

```ros
/system/sup-output
```

该命令会写入 `supout.rif`，并显示进度，从 `created: 42%` 一直到 `created: 100%`。在配置较大的路由器上，耗时从几秒到更长时间不等。文件大小取决于路由器；在家庭路由器上，该文件通常约为 1 MB。

要使用其他名称，请设置 `name`。当名称没有扩展名时，RouterOS 会添加 `.rif` 扩展名，因此 `name=supout.rif` 也会写入 `supout.rif`。同名文件会被替换。路径会把文件写入文件夹，例如写入 USB 磁盘：

```ros
/system/sup-output name=usb1/supout
```

如果路由器的文件列表中有 `flash` 文件夹，则重启时该文件夹之外的文件会丢失。如果路由器可能在您下载文件之前重启，请将文件写入 `flash`（`name=flash/supout`）。请参阅 [文件](../system-information-and-utilities/files.md)。

### 在设定时间创建文件 {#create-the-file-at-a-set-time}

对于在已知时间发生的问题，例如每天晚上发生的问题，可以让调度器创建该文件：

```ros
/system/scheduler/add name=evening-supout start-time=20:00:00 \
    interval=1d on-event="/system/sup-output name=evening-supout"
```

每次运行都会替换前一天的文件。在获得所需的那次运行后，请下载 `evening-supout.rif` 并删除该条目：

```ros
/system/scheduler/remove evening-supout
```

### WinBox {#winbox}

截图中显示的是 WinBox 3。在主菜单中选择 **Make Supout.rif**，然后在打开的窗口中选择 **Start**。该窗口会显示文件名，并在 **Created** 中显示进度。

![WinBox main menu with Make Supout.rif highlighted and the Make it! window with the file name supout.rif, the progress 42% and the Start button](/img/cd25509ae01612e9.webp)

文件准备好后，会列在 **Files** 中。右键单击该文件并选择 **Download**，或者将文件拖到桌面。在 WinBox 4 中，请从 **Files** 下载（请参阅 [在 WinBox 中管理文件](../system-information-and-utilities/files.md#manage-files-in-winbox)）。

![WinBox File List with supout.rif selected and Download highlighted in the right-click menu](/img/32c76482e5bb24ff.webp)

### WebFig {#webfig}

截图中显示的是较旧版本的 WebFig。在菜单中选择 **Make Supout.rif**。然后打开 **Files**，并在 `supout.rif` 旁选择 **Download**。

![WebFig Files page with Make Supout.rif highlighted in the menu and the Download button next to supout.rif](/img/24e5e1b472982cb2.webp)

## 下载文件 {#download-the-file}

使用 WinBox 或 WebFig 中的 **Files** 下载该文件（请参阅 [在 WinBox 中管理文件](../system-information-and-utilities/files.md#manage-files-in-winbox)），或者从您的计算机使用 `scp` 或 SFTP 下载。这些方式需要启用路由器的 SSH 服务，并允许从您的计算机访问（请参阅 [服务](../system-information-and-utilities/services.md)）：

```bash
scp admin@192.168.88.1:supout.rif .
```

对于文件夹中的文件，请给出其路径：

```bash
scp admin@192.168.88.1:usb1/supout.rif .
```

当路由器的 FTP 服务已启用时，也可以使用 FTP。

## 崩溃后自动生成 supout {#automatic-supout-after-a-crash}

当 RouterOS 软件发生故障时，路由器会自行写入 `autosupout.rif`，并将先前的文件重命名为 `autosupout.old.rif`。watchdog 设置 `automatic-supout` 控制此行为，且默认开启。使用 `auto-send-supout` 时，路由器还会通过电子邮件发送该文件；这需要 watchdog 的电子邮件设置。watchdog 重启不是软件故障，不会写入该文件。请参阅 [看门狗](../diagnostics-monitoring-and-troubleshooting/watchdog.md)。

## 技术细节 {#technical-details}

### 输出宽度 {#output-width}

如果查看器显示的文件中的命令输出过窄，请使用更大的 `output-width` 重新创建文件：

```ros
/system/sup-output name=supout output-width=300
```

### 文件格式 {#file-format}

该文件为文本：由一系列经过编码的段组成，每个段位于一行 `--BEGIN ROUTEROS SUPOUT SECTION` 和一行 `--END ROUTEROS SUPOUT SECTION` 之间。没有查看器就无法读取这些段。

有关参数，请参阅 [`/system/sup-output`](../cli-reference/system/sup-output.md) CLI 参考。
