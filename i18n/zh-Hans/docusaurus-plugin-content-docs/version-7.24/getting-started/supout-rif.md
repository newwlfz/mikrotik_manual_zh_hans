---
title: "Supout.rif"
description: "supout.rif 文件是 MikroTik 的二进制诊断工具，包含路由器配置、日志和详细信息，可帮助支持团队高效解决问题。它可以通过 WinBox、Webfig 或控制台生成，并可使用 Supout.rif viewer 查看，且不包含敏感数据。"
tags:
  - 'supout-rif'
  - 'debugging'
source: https://manual.mikrotik.com/docs/7.24/getting-started/supout-rif
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "management-tools"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 什么是 supout.rif 文件？ {#what-is-a-supoutrif-file}

supout.rif 文件是 MikroTik 支持输出文件，用于调试 RouterOS 并加快问题解决速度。该二进制文件包含路由器的完整配置、日志和其他详细信息，可帮助 MikroTik Support 更高效地诊断和解决问题。

该文件存储在路由器上，可通过 FTP 或 WinBox 下载。在具有 FLASH 类型存储器或外部存储的设备上，可以通过指定完整路径在 /flash 文件夹中生成该文件（例如，name=flash/supout.rif）。

要查看文件内容，请登录 MikroTik 账户，并使用左侧导航栏中的“Supout.rif viewer”工具上传并分析该文件。

**注意：** supout.rif 文件不包含路由器密码等敏感信息。

## 创建支持输出文件 {#creating-a-support-output-file}

### Winbox

要在 Winbox 中生成该文件，请点击“Make Supout.rif”。

要将文件保存到计算机，请右键点击该文件并选择“Download”以获取支持输出文件，或直接将文件拖到桌面。

### ![](/img/32c76482e5bb24ff.webp)WebFig

要在 WebFig 中生成该文件，请点击“Make Supout.rif”，然后点击“Download”将其下载到计算机。

![](/img/cd25509ae01612e9.webp)

![](/img/24e5e1b472982cb2.webp)

### Console

要生成该文件，请在命令行中输入：

```ros
/system/sup-output name=supout.rif
```

如果在 supout viewer 中打开该文件时输出过窄，则可以重新生成 supout 文件，并使用 output-width 选项手动指定输出宽度：

```ros
/system/sup-output name=supout.rif output-width=300
```
