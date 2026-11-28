---
title: "分区"
description: "RouterOS 允许在兼容设备上重新分区 NAND flash，以支持多个 OS 安装和自动回退，从而确保升级期间的系统可靠性。该功能最多支持 8 个分区，要求最低存储容量，并提供用于管理活动分区、克隆配置和恢复备份的命令。"
tags:
  - 'partitions'
  - 'storage'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/partitions
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

分区功能受支持于使用 NAND flash 的 ARM、ARM64、MIPS、TILE 和 PowerPC RouterBOARD 设备。

RouterOS 允许重新分区 NAND flash，从而实现：

- 在每个分区上分别安装 RouterOS。
- 指定主分区和回退分区。

如果一个分区无法启动（由于升级失败、配置问题或软件错误），下一个分区将自动启动，从而提供回退能力。该功能相当于交互式备份，使你可以保留一个已验证且可正常工作的安装，并仅在辅助分区上执行升级。

确认新配置稳定后，可以使用“Save Config To”功能将其复制到其他分区。

:::warning
重新分区 NAND 需要最新版 bootloader
:::

#### 要求和限制 {#requirements-and-limits}

- 从 RouterOS 7.20beta2 开始，重新分区所需的最小存储空间为 128 MiB。
- 重新分区期间的最小 RouterOS 分区大小：60 MiB。
- 允许的最大分区数为 8。

对于应隐藏 Partitions 菜单但此前已重新分区的设备：

- 可以重新分区为单个分区。

- 重启后，Partitions 菜单将被隐藏。

#### 示例 {#example}

对于具有 128 MiB NAND 且此前采用 4\*32 MiB 分区的设备，RouterOS 可容纳在 32 MiB 内，从 RouterOS 7.20beta2 开始，升级后的行为如下：

- 它将继续使用全部 4 个分区和完整的分区选项，与重新分区前相同。
- 如果进行重新分区，唯一可用的选项将是 1\*128 MiB 或 2\*64 MiB 分区，并且完整分区功能仍将可用。

```ros
[admin@MikroTik] > /partitions/print
Flags: A - ACTIVE; R - RUNNING
Columns: NAME, FALLBACK-TO, VERSION, SIZE
# NAME FALL VERSION SIZE 
0 AR part0  next         RouterOS v7.18.2 2025-03-11 11:59:04  128MiB
```

:::warning
从 RouterOS 7.17 版本开始，需要更新 [device-mode](/docs/system-information-and-utilities/device-mode) 才能使用分区。
:::

## 命令 {#commands}

| 属性 | 说明 |
| :-- | :-- |
| **activate** (*partition*) | 将另一个分区指定为 Active。仅当设备模式中启用了“partitions”设置时，此选项才可用（自 RouterOS 7.17 起）。 |
| **repartition** (*integer*) | 重启路由器并重新格式化 NAND，仅保留活动分区。 |
| **copy-to** (*partition*) | 将带有配置的 **running** 操作系统克隆到指定分区。该分区上先前存储的数据将被擦除。 |
| **save-config-to** (*partition*) | 将 **running-config** 克隆到指定分区。其他内容保持不变。 |
| **restore-config-from** (*partition*) | 将配置从指定分区复制到 **running** 分区 |

## 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **name** (*string*；默认：) | 分区名称 |
| **fallback-to** (*etherboot \| next \| partition-name*；默认：**next**) | 活动分区启动失败时执行的操作：<ul><li><strong>etherboot</strong> - 切换到 etherboot</li><li><strong>next</strong> - 尝试下一个分区</li><li>回退到指定分区</li></ul> |

### Read-only

| 属性 | 说明 |
| :-- | :-- |
| **active** (*yes \| no*) | 分区处于活动状态 |
| **running** (*yes \| no*) | 当前正在运行的分区 |
| **size** (*integer[MiB]*) | 分区大小 |
| **version** (*string*) | 分区上当前安装的 RouterOS 版本 |
