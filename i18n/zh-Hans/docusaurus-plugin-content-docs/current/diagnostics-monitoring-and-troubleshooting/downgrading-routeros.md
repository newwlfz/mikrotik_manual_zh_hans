---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/downgrading-routeros"
sidebar_position: 20
title: "降级 RouterOS"
sidebar_label: "降级 RouterOS"
description: "了解如何将 RouterOS 降级到以前的版本，包括降级前检查、架构验证和分步说明。"
source: https://manual.mikrotik.com/docs/diagnostics-monitoring-and-troubleshooting/downgrading-routeros
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RouterOS **只能降级到硬件支持的最低版本**。使用以下命令检查：

```ros
/system/resource/print
                   uptime: 2m18s
                  version: 7.26beta1
               build-time: 2026-10-01 13:29:47
          minimum-version: 7.0.9
              free-memory: 681.8MiB
             total-memory: 1024.0MiB
                      cpu: ARM64
                cpu-count: 4
            cpu-frequency: 864MHz
                 cpu-load: 3%
           free-hdd-space: 91.8MiB
          total-hdd-space: 128.0MiB
  write-sect-since-reboot: 64
         write-sect-total: 266154
               bad-blocks: 0%
        architecture-name: arm64
               board-name: hAP ax^2
                 platform: MikroTik
```

`minimum-version` 字段是硬件引导程序支持的最旧 RouterOS 版本。确切值取决于设备。在较早的 RouterOS 版本中，同一值显示为 `factory-software`——如果你的版本仍会输出该字段，请将其视为完全相同。

:::warning
尝试安装低于 `minimum-version` 的版本可能导致严重的系统不稳定，甚至使设备变砖。
:::

## 开始之前 {#before-you-start}

- **备份所有内容。** 配置语法在主版本之间会发生变化。直接降级可能会损坏设置。继续操作前，请生成[二进制备份 (`.backup`)](../getting-started/configuration-management/backup.md)和[导出文件 (`.rsc`)](../getting-started/configuration-management/index.md#configuration-export)。
- **安全与稳定性。** 请记住，回退到旧版本会使你的路由器暴露于较旧的软件缺陷和已修补的安全漏洞。

## 降级步骤 {#downgrade-procedure}

1. **验证架构。** 检查 `/system/resource/print` 的 `architecture-name` 字段（例如 `arm64`、`arm`、`mipsbe`、`mmips`、`x86`）。
2. **下载软件包。** 从 [MikroTik 下载页面](https://mikrotik.com/download) 下载适用于该架构和目标旧版本的 **主捆绑包**——它包含 `routeros-<version>-<architecture>.npk` 系统软件包。检查 `/system/package/print` 以了解路由器上安装的其他软件包，并从 "Extra packages" 捆绑包中下载同一目标版本的每个软件包。在带 WiFi 的设备上，这包括无线驱动包（`wifi-qcom`、`wifi-qcom-ac` 或 `wireless`，具体取决于设备）；其他常见的额外软件包有 container、calea 和 cmr。
3. **上传文件。** 通过 WinBox、WebFig 或 FTP 客户端连接到路由器，打开 Files 菜单，并上传 `.npk` 文件：主 `routeros` 软件包以及第 2 步中的每个额外软件包。
4. **运行降级。** 执行命令并确认提示：

   ```ros
   /system/package/downgrade
   ```

   路由器会提示重启。在重启期间，它会检查上传的软件包，并将 RouterOS 降级到这些软件包所包含的版本。
5. **等待重启。** 路由器会重新启动，解包旧版本，并在降级完成后重新上线。

重启后，使用 `/system/resource/print` 验证新版本，并确认 `version` 字段显示预期的降级目标。
