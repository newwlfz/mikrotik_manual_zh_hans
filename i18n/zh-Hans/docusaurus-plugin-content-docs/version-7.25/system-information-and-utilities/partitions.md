---
sidebar_key: "system-information-and-utilities/partitions"
sidebar_position: 11
title: "分区"
sidebar_label: "分区"
description: "RouterOS 允许在兼容设备上重新分区 NAND 闪存，以支持多个操作系统安装并具备自动回退功能，从而确保升级期间的系统可靠性。该功能最多支持 8 个分区，要求最低存储容量，并包含用于管理活动分区、克隆配置和恢复备份的命令。"
tags:
  - 'partitions'
  - 'storage'
source: https://manual.mikrotik.com/docs/7.25/system-information-and-utilities/partitions
captured_at: '2026-11-04T11:22:10+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

分区功能在 ARM、ARM64、MIPS、TILE 和 PowerPC 且使用 NAND 闪存的 RouterBOARD 设备上受支持。

RouterOS 允许对 NAND 闪存重新分区，从而支持：

- 每个分区上独立的 RouterOS 安装。
- 能够指定主分区和回退分区。

如果某个分区启动失败（由于升级失败、配置问题或软件错误），下一个分区将自动启动，提供回退。此功能充当交互式备份，使你能够保留已验证且可正常工作的安装，并仅在辅助分区上执行升级。

确认新配置稳定后，你可以使用 "Save Config To" 功能将其复制到其他分区。

:::warning
NAND 重新分区需要最新的引导程序版本
:::

#### 要求和限制 {#requirements-and-limits}

- 从 RouterOS 7.20beta2 开始，重新分区的最小存储大小为 128 MiB。
- 重新分区期间 RouterOS 分区最小大小：60 MiB。
- 允许的最大分区数为 8。

对于本应隐藏 Partitions 菜单但之前已重新分区的设备：

- 可以将设备重新分区为单个分区。

- 重启后 Partitions 菜单将隐藏。

#### 示例 {#example}

对于 NAND 为 128 MiB、之前具有 4\*32 MiB 分区且 RouterOS 可容纳在 32 MiB 内的设备，从 RouterOS 7.20beta2 开始，升级后的行为如下：

- 它将继续使用全部 4 个分区，并具备完整分区选项，与重新分区前一样。
- 如果进行重新分区，唯一可用的选项将是 1\*128 MiB 或 2\*64 MiB 分区，并且完整分区功能仍将可用。

```ros
[admin@MikroTik] > /partitions/print
Flags: A - ACTIVE; R - RUNNING
Columns: NAME, FALLBACK-TO, VERSION, SIZE
# NAME FALL VERSION SIZE 
0 AR part0  next         RouterOS v7.18.2 2025-03-11 11:59:04  128MiB
```

:::warning
从 RouterOS 7.17 版本开始，你需要更新 [device-mode](./device-mode.md) 才能使用分区。
:::

## 在 WinBox 中检查分区 {#inspect-partitions-in-winbox}

在左侧菜单中打开 **Partition**：

1. 在列表中检查分区名称、**Fallback To** 和已安装的 RouterOS 版本。`A` 标志标识活动启动分区，`R` 标识正在运行的分区。截图显示了一个分区 `part0`，它同时具有这两个标志。
2. 右侧面板包含 **Repartition**、**Copy To**、**Save Config To** 和 **Restore Config From**。这些操作会更改存储或配置；请使用命令描述来选择你打算执行的操作。

![WinBox Partition overview with partition details and available actions](/img/1ae61fb9deda8d20.webp)

查看列表不会对路由器重新分区。**Repartition** 会重新格式化存储并重启设备，而 **Copy To** 会替换其目标分区的内容。在计划更改分区之前，请检查硬件支持和设备模式。

## 命令 {#commands}

| 属性 | 描述 |
| :-- | :-- |
| **activate** (*partition*) | 将另一个分区指定为 Active。如果在设备模式中启用了 "partitions" 设置（自 RouterOS 7.17 起），则此选项可用。 |
| **repartition** (*integer*) | 将重启路由器并重新格式化 NAND，只保留活动分区。 |
| **copy-to** (*partition*) | 将带有配置的 **running** OS 克隆到指定分区。该分区上先前存储的数据将被擦除。 |
| **save-config-to** (*partition*) | 将 **running-config** 克隆到指定分区。其他所有内容保持不变。 |
| **restore-config-from** (*partition*) | 将配置从指定分区复制到 **running** 分区 |

## 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **name** (*string*; 默认值： ) | 分区名称 |
| **fallback-to** (*etherboot \| next \| partition-name*; 默认值： **next**) | 当活动分区启动失败时的操作：etherboot - 切换到 etherboot；next - 尝试下一个分区；回退到指定分区 |

### 只读 {#read-only}

| 属性 | 描述 |
| :-- | :-- |
| **active** (*yes \| no*) | 分区处于活动状态 |
| **running** (*yes \| no*) | 当前正在运行的分区 |
| **size** (*integer[MiB]*) | 分区大小 |
| **version** (*string*) | 分区上安装的当前 RouterOS 版本 |
