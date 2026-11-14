---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/downgrading-routeros"
sidebar_position: 20
title: "降级 RouterOS"
sidebar_label: "降级 RouterOS"
description: "了解如何将 RouterOS 降级到以前的版本，包括降级前检查、架构验证和分步说明。"
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/downgrading-routeros
captured_at: '2026-11-04T11:15:13+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

你可以降级 RouterOS，**但只能降级到出厂安装版本**，可通过以下命令检查：

```ros
/system/resource/print

          uptime: 1w1d11h11m1s
         version: 7.23.1 (stable)
      build-time: Jan/01/2026 11:11:11
factory-software: 7.20.8
```

:::warning
factory-software 版本是硬件引导程序支持的绝对最旧版本。尝试安装比此更旧的版本可能导致严重的系统不稳定或使设备变砖。
:::

## 降级前检查清单 {#pre-downgrade-checklist}

- **备份所有内容。** 主版本之间配置语法会发生变化。直接降级可能会损坏设置。继续操作前，请务必生成[二进制备份（`.backup`）](../getting-started/configuration-management/backup.md)和[导出文件（`.rsc`）](../getting-started/configuration-management/index.md#configuration-export)。
- **安全性和稳定性。** 请记住，回退到旧版本会使你的路由器暴露于较旧的软件缺陷和已修复的安全漏洞。

## 分步降级流程 {#step-by-step-downgrade-procedure}

1. **验证架构。** 通过 `/system/resource/print` 检查设备的架构类型（查找 `architecture` 字段，例如 `arm64`、`mipsbe`、`mmips`）。
2. **下载软件包。** 从 [MikroTik 下载页面](https://mikrotik.com/download)下载与该确切架构以及你的目标旧版本对应的 "Extra packages" 或主捆绑包 zip。
3. **上传文件。** 通过 WinBox、WebFig 或 FTP 客户端连接到路由器，打开 Files 菜单，并上传所有必需的 `.npk` 文件。
4. **执行降级。** 在终端中运行降级命令序列：

   ```ros
   /system/package/downgrade
   ```

5. **重启。** 出现提示时确认该操作。执行 `/system/reboot` 重启路由器——它将解包旧版本，并在降级完成后重新上线。

重启后，通过运行 `/system/resource/print` 并确认 `version` 字段反映预期的降级目标版本，来验证新版本。
