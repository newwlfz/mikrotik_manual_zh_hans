---
title: "Supout.rif"
description: "supout.rif 文件是供 MikroTik 支持使用的路由器诊断快照。可通过 CLI、WinBox 或 WebFig 创建该文件，下载后使用 Supout.rif viewer 打开。"
tags:
  - 'supout-rif'
  - 'debugging'
source: https://manual.mikrotik.com/docs/7.25/getting-started/supout-rif
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "management-tools"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

支持输出文件（`supout.rif`）是供 MikroTik 支持人员使用的路由器诊断快照。它包含路由器配置、日志、进程状态、monitor 命令的输出（例如接口状态），以及 RouterOS 崩溃时的崩溃数据。请在问题仍然存在时创建该文件，使其反映路由器当时的状态，并通过 [MikroTik 支持](https://mikrotik.com/support)页面随请求一起发送。

发生意外重启或崩溃后，请立即创建该文件，在再次升级或重启路由器之前完成。如果文件列表中有 `autosupout.rif` 和 `autosupout.old.rif`，也请一并发送。

该文件经过编码。要查看其内容，请登录 MikroTik 账户，使用左侧导航栏中的“Supout.rif viewer”工具上传并分析文件。

## 创建文件 {#create-the-file}

在 CLI 中运行 [`/system/sup-output`](/docs/cli-reference/system/sup-output)：

```ros
/system/sup-output
```

该命令会写入 `supout.rif`，并以 `created: 42%` 到 `created: 100%` 显示进度。在配置较大的路由器上，该过程可能需要几秒到更长时间。文件大小取决于路由器；在家庭路由器上，该文件通常约为 1 MB。

要使用其他名称，请设置 `name`。如果名称没有扩展名，RouterOS 会添加 `.rif` 扩展名，因此 `name=supout.rif` 也会写入 `supout.rif`。同名文件会被替换。路径会将文件写入某个文件夹，例如写入 USB 磁盘：

```ros
/system/sup-output name=usb1/supout
```

如果路由器的文件列表中有 `flash` 文件夹，则该文件夹之外的文件会在重启后丢失。如果路由器可能在下载文件前重启，请将文件写入 `flash`（`name=flash/supout`）。请参阅 [Files](/docs/system-information-and-utilities/files)。

### 在指定时间创建文件 {#create-the-file-at-a-set-time}

对于在已知时间发生的问题，例如每天晚上，可让调度器创建文件：

```ros
/system/scheduler/add name=evening-supout start-time=20:00:00 \
    interval=1d on-event="/system/sup-output name=evening-supout"
```

每次运行都会替换前一天的文件。运行完成后，下载 `evening-supout.rif` 并删除该条目：

```ros
/system/scheduler/remove evening-supout
```

### WinBox

截图显示的是 WinBox 3。在主菜单中选择 **Make Supout.rif**，然后在打开的窗口中选择 **Start**。该窗口会在 **Created** 中显示文件名和进度。

![WinBox main menu with Make Supout.rif highlighted and the Make it! window with the file name supout.rif, the progress 42% and the Start button](/img/cd25509ae01612e9.webp)

文件准备就绪后，会列在 **Files** 中。右键单击该文件并选择 **Download**，或将文件拖到桌面。在 WinBox 4 中，可从 **Files** 下载（请参阅 [Manage files in WinBox](/docs/system-information-and-utilities/files#manage-files-in-winbox)）。

![WinBox File List with supout.rif selected and Download highlighted in the right-click menu](/img/32c76482e5bb24ff.webp)

### WebFig

截图显示的是旧版 WebFig。在菜单中选择 **Make Supout.rif**。然后打开 **Files**，选择 `supout.rif` 旁边的 **Download**。

![WebFig Files page with Make Supout.rif highlighted in the menu and the Download button next to supout.rif](/img/24e5e1b472982cb2.webp)

## 下载文件 {#download-the-file}

使用 WinBox 或 WebFig 中的 **Files** 下载文件（请参阅 [Manage files in WinBox](/docs/system-information-and-utilities/files#manage-files-in-winbox)），或使用计算机上的 `scp` 或 SFTP 下载。这些方式需要路由器的 SSH 服务已启用，并允许从你的计算机访问（请参阅 [Services](/docs/system-information-and-utilities/services)）：

```bash
scp admin@192.168.88.1:supout.rif .
```

对于文件夹中的文件，给出其路径：

```bash
scp admin@192.168.88.1:usb1/supout.rif .
```

FTP 也可使用，前提是路由器的 FTP 服务已启用。

## 崩溃后自动生成 supout {#automatic-supout-after-a-crash}

当 RouterOS 软件发生故障时，路由器会自行写入 `autosupout.rif`，并将先前的文件重命名为 `autosupout.old.rif`。watchdog 设置 `automatic-supout` 控制此行为，默认启用。通过 `auto-send-supout`，路由器还会通过电子邮件发送该文件；这需要使用 watchdog 的电子邮件设置。watchdog 重启不属于软件故障，不会写入该文件。请参阅 [Watchdog](/docs/diagnostics-monitoring-and-troubleshooting/watchdog)。

## 技术细节 {#technical-details}

### 输出宽度 {#output-width}

如果查看器显示的文件命令输出过窄，请使用更大的 `output-width` 重新创建文件：

```ros
/system/sup-output name=supout output-width=300
```

### 文件格式 {#file-format}

该文件是文本：由一系列编码段组成，每段位于 `--BEGIN ROUTEROS SUPOUT SECTION` 行和 `--END ROUTEROS SUPOUT SECTION` 行之间。没有查看器无法读取这些段。

有关参数，请参阅 [`/system/sup-output`](/docs/cli-reference/system/sup-output) CLI 参考。
