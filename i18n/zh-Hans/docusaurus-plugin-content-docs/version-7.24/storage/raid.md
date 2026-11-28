---
title: "RAID"
description: "RouterOS 中的 RAID 技术可将数据存储分布在多个驱动器上，并提供更高的性能和保护，支持 RAID 级别 0、1、4、5、6、linear 和嵌套配置。本页详细介绍了 RAID 类型、块大小、设备数量等属性，以及配置 RAID6 的示例。"
tags:
  - 'raid'
  - 'storage'
  - 'configuration'
source: https://manual.mikrotik.com/docs/7.24/storage/raid
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

:::info
此功能需要 [Storage](/docs/storage) 软件包。
:::

RAID（Redundant Array of Independent Disks）技术通过将数据存储在多个磁盘上，并将它们组合为逻辑单元，以提高数据传输性能、数据保护能力，或同时实现两者。

发生 RAID 磁盘故障时，更换故障磁盘后会自动开始重建。

RouterOS 支持软件 RAID 级别 0、1、4、5、6、linear 和嵌套 RAID。

<DocCardList />

## 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **raid-type** | 使用的 RAID 类型（级别 0、1、4、5、6、linear 和嵌套 RAID）。 |
| **raid-chunk-size** | RAID 阵列中使用的块或条带大小。 |
| **raid-device-count** | RAID 阵列中包含的设备（磁盘）数量。 |
| **raid-master** | 创建的 RAID 主块设备，磁盘会添加到该设备中。 |
| **raid-max-component-size** | RAID 阵列中单个组件或磁盘的最大大小。 |
| **raid-member-failed** | 将 RAID 阵列中的驱动器设置为故障状态。用于需要更换未故障驱动器时。 |
| **raid-role** | 定义 RAID 阵列中每个设备的角色。 |
| **raid-scrub** | 验证并修复 RAID 阵列中的数据完整性。 |

### 配置示例（RAID6） {#configuration-example-raid6}

以下示例说明如何配置 RAID。大多数 RAID 类型的配置过程相同。

创建 RAID 块设备（本示例中为 RAID 6）

```ros
add raid-device-count=20 raid-type=6 slot=raid1 type=raid
```

向该 RAID 添加驱动器

```ros
set nvme1 raid-master=raid1 raid-role=0
set nvme2 raid-master=raid1 raid-role=1
set nvme3 raid-master=raid1 raid-role=2
set nvme4 raid-master=raid1 raid-role=3
set nvme5 raid-master=raid1 raid-role=4
set nvme6 raid-master=raid1 raid-role=5
set nvme7 raid-master=raid1 raid-role=6
set nvme8 raid-master=raid1 raid-role=7
set nvme9 raid-master=raid1 raid-role=8
set nvme10 raid-master=raid1 raid-role=9
set nvme11 raid-master=raid1 raid-role=10
set nvme12 raid-master=raid1 raid-role=11
set nvme13 raid-master=raid1 raid-role=12
set nvme14 raid-master=raid1 raid-role=13
set nvme15 raid-master=raid1 raid-role=14
set nvme16 raid-master=raid1 raid-role=15
set nvme17 raid-master=raid1 raid-role=16
set nvme18 raid-master=raid1 raid-role=17
set nvme19 raid-master=raid1 raid-role=18
set nvme20 raid-master=raid1 raid-role=19

```

格式化 RAID 块设备

```ros
/disk> format raid1 file-system=ext4 
```

结果应类似如下

```ros
21 BM        type=raid slot="raid1" slot-default="" parent=none uuid="f457bc79-7408-489b-8850-85923e900452" fs=ext4 model="RAID6 2-parity-disks" 
             size=17 283 541 893 120 free=17 283 538 190 336 raid-type=6 raid-device-count=20 raid-max-component-size=none raid-chunk-size=1M raid-master=none 
             raid-state="clean" nvme-tcp-export=no iscsi-export=no nfs-sharing=no smb-sharing=no media-sharing=no media-interface=none 

```

:::warning
避免在多个 RAID 阵列中使用同一物理磁盘上的多个分区。在多个 RAID 阵列中使用同一物理磁盘可能导致性能低下。
:::

### 示例：RAID 检查 {#example-raid-check}

监控 RAID 阵列是否出现故障非常重要。有多种方法可以实现这一点，但最简单的方法是创建一个脚本，在 RAID 成员发生故障时发送电子邮件。可以使用以下脚本作为工作示例：

```routeros
/system/scheduler
add interval=30s name=MRaidHealthCheckCall on-event=MraidHealthCheck policy=ftp,read,write,policy,test,sniff start-time=startup
/system/script
add dont-require-permissions=no name=MraidHealthCheck owner=admin policy=ftp,read,write,policy,test,sniff source=":global CheckRAID;\
    \n:local sysadmin; \
    \n\
    \n:set  \$sysadmin \"<servername@domain.tld>\";\
    \n\
    \n:local temp [/disk/print count-only where raid-member-failed];\
    \n:if ( \$temp > 0 ) do={\
    \n   :if ( \$CheckRAID < 1 ) do={\
    \n      /log/info message=\"ERROR: RAID has failed!\";\
    \n      /tool/e-mail/send to= \$sysadmin subject=([/system/identity/get name].\" RAID failed\") body=(\"Go check it! Value: \".\$temp);\
    \n      :set \$CheckRAID 7;\
    \n      :delay 5s;\
    \n    }\
    \n   }       \
    \n   :if ( \$CheckRAID > 0 ) do={\
    \n      :set \$CheckRAID ( \$CheckRAID -1 );\
    \n   }\
    \n"
```

还需要配置 RouterOS 设备的电子邮件服务器设置：

```routeros
/tool/e-mail
set from=<raidcheck@domain.tld> port=587 server=smtp.domain.com tls=starttls
```

:::warning

请确保在 `/tool/e-mail` 下配置电子邮件服务器设置，并将上述脚本中的电子邮件地址更改为与电子邮件服务器设置匹配的值。
:::

## RAID 类型 {#raid-types}

### RAID 0

在此 RAID 中，所有数据均匀写入所有磁盘。该配置不提供任何容错能力，但提供最佳性能。

![](/img/648d1b1a7e9ac005.webp)

### RAID 1

相同数据会写入所有磁盘（数据镜像），该配置提供最佳容错能力，但就性能而言，写入速度将等于阵列中使用的最慢磁盘的速度。

![](/img/749039f2245fe4a2.webp)

### RAID 4

块级数据条带化分布在数据磁盘上，奇偶校验位存储在专用磁盘上。性能将受限于奇偶校验写入速度。

![](/img/710561e575e1fdcb.webp)

### RAID 5

块级数据均匀条带化分布在可用磁盘上。可从 1 块磁盘故障中恢复。

![](/img/46c04c532fbe4a91.webp)

### RAID 6

块级数据均匀条带化分布在可用磁盘上。可从 2 块磁盘故障中恢复。

![](/img/f2a0c2f8196c22bb.webp)

### RAID 线性模式 {#raid-linear}

数据会追加写入多个磁盘，并将它们组合成一个大磁盘。该方式不提供冗余，并且受单个磁盘读写速度限制。

![](/img/41c81336094120e1.webp)

### 嵌套 RAID {#nested-raid}

将多种 RAID 配置组合成另一种 RAID。例如，RAID 10（RAID 1+0）结合了磁盘镜像（RAID 1）和磁盘条带化（RAID 0）

![](/img/62c05c74537f6e74.webp)

#### 配置示例 {#configuration-example}

在本示例中，使用 10 块 SSD 驱动器并配置为 RAID（RAID 1+0）。

创建 RAID 0 块。

```ros
add raid-device-count=5 raid-type=0 slot=raid10 type=raid
```

创建五个 RAID 1 块，每个块包含 2 个设备，并将它们添加到之前创建的 RAID 0 块以设置 master-raid（name=raid10）。

```ros
add raid-device-count=2 raid-master=raid10 raid-role=0 raid-type=1 slot=raid0 type=raid
add raid-device-count=2 raid-master=raid10 raid-role=1 raid-type=1 slot=raid1 type=raid
add raid-device-count=2 raid-master=raid10 raid-role=2 raid-type=1 slot=raid2 type=raid
add raid-device-count=2 raid-master=raid10 raid-role=3 raid-type=1 slot=raid3 type=raid
add raid-device-count=2 raid-master=raid10 raid-role=4 raid-type=1 slot=raid4 type=raid
```

向每个 RAID 块添加驱动器。

```ros
set nvme1 raid-master=raid0 raid-role=0
set nvme3 raid-master=raid1 raid-role=0
set nvme5 raid-master=raid2 raid-role=0
set nvme7 raid-master=raid3 raid-role=0
set nvme9 raid-master=raid4 raid-role=0

set nvme2 raid-master=raid0 raid-role=1
set nvme4 raid-master=raid1 raid-role=1
set nvme6 raid-master=raid2 raid-role=1
set nvme8 raid-master=raid3 raid-role=1
set nvme10 raid-master=raid4 raid-role=1

```

完成此操作后，格式化 raid10 块。

```ros
format raid10 file-system=ext4 
```

格式化后，应看到可用空间并使用该块。

```ros
23 BM        type=raid slot="raid10" slot-default="" parent=none uuid="ec3344f4-1662-49ab-b899-db1aaa217b0f" fs=ext4 model="RAID0 striped" size=9 601 967 652 864 
             free=9 597 901 369 344 raid-type=0 raid-device-count=5 raid-max-component-size=none raid-master=none raid-state="clean" nvme-tcp-export=no 
             iscsi-export=no nfs-sharing=no smb-sharing=no media-sharing=no media-interface=none 
```

基于此配置，可以修改 RAID 10 配置，以适应所需数量的存储设备。

同样，可以按照本示例展示的相同原则创建其他嵌套 RAID 配置。
