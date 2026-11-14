---
sidebar_key: "bridging-and-switching/swos/troubleshooting"
sidebar_position: 5
title: "无法升级 SwOS"
sidebar_label: "无法升级 SwOS"
source: https://manual.mikrotik.com/docs/7.24/bridging-and-switching/swos/troubleshooting
captured_at: '2026-11-04T11:27:12+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

---

## 概述 {#overview}

支持 SwOS 的 MikroTik 交换机会在闪存中存储两个独立的固件镜像：**主**（活动）镜像和**备份**镜像。正常运行时，设备从主镜像启动。当启动固件升级时——无论是通过 Web 界面自动进行，还是通过文件上传手动进行——设备都会将新镜像写入主镜像槽位并重启进入该镜像。

升级失败通常由以下原因之一导致：

- 选择了错误的固件文件（型号或固件分支不对）
- 写入操作被中断，导致主镜像损坏
- 网络连接问题导致自动下载无法到达 MikroTik 服务器
- 在双启动设备上：device-mode 策略限制了操作系统切换（RouterOS 7.17+）

仅支持 SwOS 的设备和双启动设备需要不同的恢复步骤，下文分别说明。

---

## 开始之前 {#before-you-begin}

> **警告：** 本文所述的复位按钮操作会清除活动配置并加载出厂默认设置。在继续操作之前，请从 **System** 选项卡导出配置备份。

在尝试手动升级之前，请确认你需要哪个固件文件。每个交换机系列都使用专用的固件二进制文件——跨系列的固件文件不可互换，会被拒绝或导致启动失败。你设备的正确文件可在以下位置找到：

[mikrotik.com 软件下载中心](https://mikrotik.com/download)

---

## 解决方法 {#resolution}

### 仅支持 SwOS 的设备（CSS 系列） {#swos-only-devices-css-series}

这些设备不运行 RouterOS，也没有串口控制台启动菜单。恢复依赖于存储在受保护闪存分区中的硬件备份固件。

**第 1 步 — 尝试手动上传固件**

在 SwOS Web 界面中进入 **Upgrade** 选项卡，选择适用于你设备型号的正确 `.swos` 固件文件，然后单击 **Upgrade**。写入过程中请勿中断供电。上传完成后，设备将自动重启。重新加载 Web 界面，并确认 **System** 选项卡中显示的固件版本。

**第 2 步 — 通过硬件复位启动到备份固件**

如果手动上传失败，或升级尝试后设备无法访问，可使用复位按钮强制加载备份（主）固件：

1. 断开设备电源。
2. 按住 **Reset** 按钮并重新接通电源。
3. 继续按住按钮约 5 秒，直到设备完成启动过程。
4. 松开按钮。

设备将加载备份固件并应用出厂默认配置。可通过 **192.168.88.1** 或 DHCP 分配的地址访问它。

**第 3 步 — 重新尝试手动上传固件**

设备在备份固件上可访问后，重复第 1 步中的手动升级过程。备份固件环境提供了一个干净的状态，在此基础上升级更有可能成功。

---

### 双启动设备（CRS 系列） {#dual-boot-devices-crs-series}

双启动设备同时存储 SwOS 和 RouterOS，并可启动进入任一操作系统。这提供了额外的恢复途径，包括通过 RouterOS CLI 进行升级。

**第 1 步 — 尝试手动上传固件**

与仅支持 SwOS 的设备一样，首先通过 SwOS Web 界面中的 **Upgrade** 选项卡，使用适用于你设备的正确固件文件尝试手动升级。

**第 2 步 — 通过串口控制台启动到备份 SwOS**

如果手动上传失败，请使用串口控制台线缆按以下参数连接到设备：

| 参数 | 值 |
| --- | --- |
| 波特率 | 115200 |
| 数据位 | 8 |
| 停止位 | 1 |
| 奇偶校验 | 无 |
| 流控制 | 无 |

在启动菜单提示符下，选择：

```
p - boot primary SwOS
```

这会加载出厂备份 SwOS 镜像。设备可访问后，按第 1 步所述重新尝试手动上传固件。

**第 3 步 — 通过复位按钮启动到 RouterOS（无控制台访问）**

如果没有可用的串口控制台端口，或手边没有线缆，可使用复位按钮强制设备进入 RouterOS：

1. 在设备通电状态下，按住 **Reset** 按钮。
2. 按住直到用户 LED 开始闪烁（约 5 秒）。
3. 松开按钮。

设备会将 RouterOS 配置重置为出厂默认设置并启动进入 RouterOS。

> **警告：** 此操作会重置 RouterOS 配置。如果设备之前运行的是 RouterOS，请确保在继续操作之前已存在 RouterOS 配置备份。

**第 4 步 — 从 RouterOS CLI 升级 SwOS**

启动进入 RouterOS 后，无需使用 Web 界面即可直接升级 SwOS。以下命令会获取并安装适用于该设备的最新可用 SwOS 固件：

```
/system swos upgrade
```

该命令需要互联网访问才能从 MikroTik 的更新服务器解析并下载正确的固件包。执行前请验证连接性。

**第 5 步 — device-mode 限制（RouterOS 7.17 及更高版本）

从 RouterOS **v7.17** 开始，`device-mode` 策略会限制双启动硬件上 SwOS 与 RouterOS 之间的操作系统切换。如果升级命令失败或操作系统切换被阻止，请使用以下命令显式允许切换：

```
/system/device-mode/update routerboard=yes
```

必须在 RouterOS 中执行该命令，然后才能重新尝试 SwOS 升级或切换回 SwOS。

**第 6 步 — 返回 SwOS**

在从 RouterOS 成功更新 SwOS 固件后，将默认启动目标设回 SwOS 并重启设备：

```
/system routerboard settings set boot-os=swos
/system reboot
```

设备将重新启动并加载新安装的 SwOS 固件。
