---
title: "无法升级 SwOS"
source: https://manual.mikrotik.com/docs/7.25/bridging-and-switching/swos/troubleshooting
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "bridging-and-switching/user-guides"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

---

## 概述 {#overview}

支持 SwOS 的 MikroTik 交换机在闪存中存储两个独立的固件镜像：**主用**（活动）镜像和**备用**镜像。正常情况下，设备从主用镜像启动。启动固件升级时——无论是通过 Web 界面自动升级，还是通过文件上传手动升级——设备都会将新镜像写入主用槽位并从中重启。

升级失败通常由以下原因之一导致：

- 选择了错误的固件文件（型号或固件分支不正确）
- 写入操作中断，导致主用镜像损坏
- 网络连接问题，导致自动下载无法访问 MikroTik 服务器
- 在双启动设备上：device-mode 策略限制操作系统切换（RouterOS 7.17+）

仅支持 SwOS 的设备和双启动设备需要采用不同的恢复流程，下文分别说明。

---

## 开始之前 {#before-you-begin}

> **警告：** 本文所述的重置按钮操作会清除当前配置并加载出厂默认设置。继续操作前，请从 **System** 选项卡导出配置备份。

在尝试手动升级前，请确认所需的固件文件。每个交换机系列都使用专用的固件二进制文件——跨系列的固件文件不可互换，会被拒绝或导致启动失败。可在以下位置找到适用于设备的正确文件：

[mikrotik.com Software download centre](https://mikrotik.com/download)

---

## Resolution

### 仅支持 SwOS 的设备（CSS 系列） {#swos-only-devices-css-series}

这些设备不运行 RouterOS，也没有串行控制台启动菜单。恢复依赖于存储在受保护闪存分区中的硬件备份固件。

**步骤 1 — 尝试手动上传固件**

在 SwOS Web 界面中导航到 **Upgrade** 选项卡，为设备型号选择正确的 `.swos` 固件文件，然后点击 **Upgrade**。写入过程中请勿断电。上传完成后，设备将自动重启。重新加载 Web 界面，并在 **System** 选项卡中确认显示的固件版本。

**步骤 2 — 通过硬件复位启动备份固件**

如果手动上传失败，或设备在升级尝试后无法访问，可以使用复位按钮强制加载备份（主）固件：

1. 断开设备电源。
2. 按住 **Reset** 按钮并重新接通电源。
3. 继续按住按钮约 5 秒，直到设备完成启动过程。
4. 松开按钮。

设备将加载备份固件并应用出厂默认配置。可通过 **192.168.88.1** 或 DHCP 分配的地址访问设备。

**步骤 3 — 重试手动上传固件**

设备可通过备用固件访问后，重复步骤 1 中的手动升级过程。备用固件环境提供干净状态，升级更有可能成功。

---

### 双启动设备（CRS 系列） {#dual-boot-devices-crs-series}

双启动设备同时存储 SwOS 和 RouterOS，并可引导进入任一操作系统。这提供了额外的恢复路径，包括通过 RouterOS CLI 升级。

**步骤 1 — 尝试手动上传固件**

与仅运行 SwOS 的设备一样，首先通过 SwOS Web 界面中的 **Upgrade** 选项卡，使用适用于设备的正确固件文件尝试手动升级。

**步骤 2 — 通过串行控制台引导进入备用 SwOS**

如果手动上传失败，请使用具有以下参数的串行控制台线缆连接到设备：

| 参数 | 值 |
| --- | --- |
| 波特率 | 115200 |
| 数据位 | 8 |
| 停止位 | 1 |
| 校验位 | None |
| 流控 | None |

在启动菜单提示符处，选择：

```
p - boot primary SwOS
```

这将加载出厂备份的 SwOS 镜像。设备可访问后，按步骤 1 所述重新尝试手动上传固件。

**步骤 3 — 通过 Reset 按钮启动进入 RouterOS（无控制台访问）**

如果没有串行控制台端口或手边没有线缆，可以使用 Reset 按钮强制设备进入 RouterOS：

1. 设备通电时，按住 **Reset** 按钮。
2. 持续按住，直到用户 LED 开始闪烁（约 5 秒）。
3. 松开按钮。

设备会将 RouterOS 配置重置为出厂默认值，并启动进入 RouterOS。

> **警告：** 此过程会重置 RouterOS 配置。如果设备此前运行 RouterOS，请确保在继续操作前已存在 RouterOS 配置备份。

**步骤 4 — 从 RouterOS CLI 升级 SwOS**

启动进入 RouterOS 后，无需使用 Web 界面即可直接升级 SwOS。以下命令会获取并安装适用于该设备的最新 SwOS 固件：

```
/system swos upgrade
```

执行该命令需要 Internet 访问，以便从 MikroTik 的更新服务器解析并下载正确的固件包。执行前请验证连通性。

**步骤 5 — device-mode 限制（RouterOS 7.17 及更高版本）**

从 RouterOS **v7.17** 开始，`device-mode` 策略会限制双启动硬件上 SwOS 和 RouterOS 之间的系统切换。如果升级命令失败或系统切换被阻止，请显式允许该切换：

```
/system/device-mode/update routerboard=yes
```

该命令必须在 RouterOS 中执行，然后重新尝试升级 SwOS 或切换回 SwOS。

**步骤 6 — 返回 SwOS**

从 RouterOS 成功更新 SwOS 固件后，将默认启动目标设置回 SwOS 并重启设备：

```
/system routerboard settings set boot-os=swos
/system reboot
```

设备将重启并加载新安装的 SwOS 固件。
