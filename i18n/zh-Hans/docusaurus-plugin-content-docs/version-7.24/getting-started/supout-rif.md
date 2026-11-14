---
sidebar_key: "getting-started/supout-rif"
sidebar_position: 10
title: "Supout.rif"
sidebar_label: "Supout.rif"
description: "`supout.rif` 文件是一种 MikroTik 二进制诊断工具，包含路由器配置、日志以及可帮助支持团队高效解决问题的详细信息。它可以通过 WinBox、WebFig 或控制台生成，并可使用 Supout.rif 查看器在不包含敏感数据的情况下查看。"
tags:
  - 'supout-rif'
  - 'debugging'
source: https://manual.mikrotik.com/docs/7.24/getting-started/supout-rif
captured_at: '2026-11-04T11:29:20+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 什么是 supout.rif 文件？ {#what-is-a-supoutrif-file}

supout.rif 文件是用于调试 RouterOS 并加快问题解决的 MikroTik 支持输出文件。此二进制文件包含路由器的完整配置、日志以及其他详细信息，可帮助 MikroTik 支持团队更高效地诊断和解决问题。

该文件存储在路由器上，可通过 FTP 或 WinBox 下载。在具有 FLASH 类型内存或外部存储的设备上，你可以通过指定完整路径（例如 name=flash/supout.rif）在 /flash 文件夹中生成该文件。

要查看文件内容，请登录你的 MikroTik 账户，并使用左侧导航栏中的“Supout.rif viewer”工具上传并分析该文件。

**注意：** supout.rif 文件不包含路由器密码等敏感信息。

## 创建支持输出文件 {#creating-a-support-output-file}

### WinBox {#winbox}

要在 Winbox 中生成此文件，请点击“Make Supout.rif”。

要将文件保存到计算机，请右键点击该文件并选择“Download”以获取支持输出文件，或直接将文件拖到桌面。

### ![](/img/32c76482e5bb24ff.webp)WebFig {#webfig}

要在 Webfig 中生成此文件，请点击“Make Supout.rif”，然后点击“Download”将其下载到计算机。

![](/img/cd25509ae01612e9.webp)

![](/img/24e5e1b472982cb2.webp)

### 控制台 {#console}

要生成此文件，请在命令行中输入：

```ros
/system/sup-output name=supout.rif
```

如果你在 supout viewer 中打开该文件，而输出内容太窄，那么你可以重新生成 supout 文件，并使用 output-width 选项手动指定输出宽度：

```ros
/system/sup-output name=supout.rif output-width=300
```
