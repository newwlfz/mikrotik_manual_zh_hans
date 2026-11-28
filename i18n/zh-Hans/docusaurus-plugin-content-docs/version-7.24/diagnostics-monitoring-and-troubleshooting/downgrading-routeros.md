---
title: "降级 RouterOS"
description: "了解如何将 RouterOS 降级到先前版本，包括降级前检查、架构验证和分步操作说明。"
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/downgrading-routeros
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "diagnostics-monitoring-and-troubleshooting/log"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

可以降级 RouterOS，**但只能降级到出厂预装版本**，可通过以下命令查看：

```ros
/system/resource/print

          uptime: 1w1d11h11m1s
         version: 7.23.1 (stable)
      build-time: Jan/01/2026 11:11:11
factory-software: 7.20.8
```

:::warning
出厂软件版本是硬件 bootloader 支持的最早版本。尝试安装更早的版本可能导致系统严重不稳定或使设备变砖。
:::

## 降级前检查清单 {#pre-downgrade-checklist}

- **备份所有内容。** 主版本之间的配置语法会发生变化。直接降级可能损坏设置。在继续操作前，始终生成 [二进制备份（`.backup`）](/docs/getting-started/configuration-management/backup) 和 [导出文件（`.rsc`）](/docs/getting-started/configuration-management#configuration-export)。
- **安全与稳定性。** 请记住，回退到旧版本会使路由器暴露于旧软件错误和已修复的安全漏洞。

## 分步降级流程 {#step-by-step-downgrade-procedure}

1. **确认架构。** 通过 `/system/resource/print` 检查设备的架构类型（查看 `architecture` 字段，例如 `arm64`、`mipsbe`、`mmips`）。
2. **下载软件包。** 从 [MikroTik 下载页面](https://mikrotik.com/download) 下载与该架构和目标旧版本对应的“Extra packages”或主 bundle zip。
3. **上传文件。** 通过 WinBox、WebFig 或 FTP 客户端连接到路由器，打开 Files 菜单，并上传所有必需的 `.npk` 文件。
4. **执行降级。** 在终端运行降级序列：

   ```ros
   /system/package/downgrade
   ```

5. **重启。** 出现提示时确认操作。执行 `/system/reboot` 重启路由器——它将解压旧版本，并在降级完成后重新上线。

重启后，运行 `/system/resource/print` 并确认 `version` 字段显示预期的降级目标版本，以验证新版本。
