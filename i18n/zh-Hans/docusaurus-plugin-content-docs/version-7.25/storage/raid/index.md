---
sidebar_key: "storage/raid/index"
sidebar_position: 3
title: "RAID"
sidebar_label: "RAID"
description: "RouterOS 中的 RAID 技术可跨多个驱动器实现数据存储，提升性能与保护，支持 RAID 级别 0、1、4、5、6、linear 以及嵌套配置。包含 RAID6 和嵌套 RAID10 的配置示例，以及一个 health-check 脚本。"
tags:
  - 'raid'
  - 'storage'
  - 'configuration'
source: https://manual.mikrotik.com/docs/7.25/storage/raid
captured_at: '2026-11-04T11:22:21+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info
此功能需要 [存储](../index.md) 软件包。
:::

RAID（独立磁盘冗余阵列）技术允许将数据存储在多个磁盘上——通过将它们组合成逻辑单元，从而提高数据传输性能、数据保护能力，或两者兼而有之。

在 RAID 磁盘发生故障的情况下，更换故障磁盘后会自动开始重建。

RouterOS 支持软件 RAID 级别 0、1、4、5、6、linear 以及嵌套 RAID。

<DocCardList />

## 配置示例（RAID6） {#configuration-example-raid6}

这是一个如何配置 RAID 的示例。大多数 RAID 类型的操作步骤相同

创建 RAID 块设备（在本示例中为 RAID 6）

```ros
add raid-device-count=20 raid-type=6 slot=raid1 type=raid
```

将磁盘添加到此 RAID

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

结果应类似于以下内容

```ros
21 BM        type=raid slot="raid1" slot-default="" parent=none uuid="f457bc79-7408-489b-8850-85923e900452" fs=ext4 model="RAID6 2-parity-disks" 
             size=17 283 541 893 120 free=17 283 538 190 336 raid-type=6 raid-device-count=20 raid-max-component-size=none raid-chunk-size=1M raid-master=none 
             raid-state="clean" nvme-tcp-export=no iscsi-export=no nfs-sharing=no smb-sharing=no media-sharing=no media-interface=none 

```

:::warning
避免在多个 RAID 阵列中使用单个物理磁盘上的多个分区。在多个 RAID 阵列中使用同一物理磁盘可能会导致性能低下。
:::

## 示例：RAID 检查 {#example-raid-check}

监控 RAID 阵列是否发生故障极为重要。有多种方法可以做到这一点，但最简单的方法是创建一个脚本，在 RAID 成员发生故障时发送电子邮件。您可以将以下脚本作为可用的示例：

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

您还需要配置 RouterOS 设备的电子邮件服务器设置：

```routeros
/tool/e-mail
set from=<raidcheck@domain.tld> port=587 server=smtp.domain.com tls=starttls
```

:::warning

请确保在 `/tool/e-mail` 下配置您的电子邮件服务器设置，并将上述脚本中的电子邮件地址更改为与您的电子邮件服务器设置相匹配的值。

:::

## RAID 类型 {#raid-types}

### RAID 0 {#raid-0}

在此 RAID 中，所有数据均匀写入所有磁盘，此配置不提供任何容错能力，但可提供最佳性能。

![RAID 0 diagram: data striped across disks](/img/648d1b1a7e9ac005.webp)

### RAID 1 {#raid-1}

相同的数据写入所有磁盘（数据被镜像），此配置提供最佳容错能力，但在性能方面，写入速度将等于阵列中使用的最慢磁盘的速度。

![RAID 1 diagram: data mirrored between disks](/img/749039f2245fe4a2.webp)

### RAID 4 {#raid-4}

块级数据条带化分布在数据磁盘上，奇偶校验位存储在专用磁盘上。性能将受限于奇偶校验写入速度。

![RAID 4 diagram: block-level striping with dedicated parity disk](/img/710561e575e1fdcb.webp)

### RAID 5 {#raid-5}

块级数据均匀条带化分布在可用磁盘上。它可以从 1 块磁盘故障中恢复。

![RAID 5 diagram: block-level striping with distributed parity](/img/46c04c532fbe4a91.webp)

### RAID 6 {#raid-6}

块级数据均匀条带化分布在可用磁盘上。它可以从 2 块磁盘故障中恢复。

![RAID 6 diagram: block-level striping with double distributed parity](/img/f2a0c2f8196c22bb.webp)

### RAID 线性 {#raid-linear}

数据追加到多个磁盘上，将它们组合成一个单一的大磁盘。不提供冗余，并且受限于单个磁盘的读/写速度。

![RAID linear diagram: data appended across disks](/img/41c81336094120e1.webp)

### 嵌套 RAID {#nested-raid}

将多种 RAID 配置组合成另一种 RAID。例如 RAID 10（RAID 1+0）结合了磁盘镜像（RAID 1）和磁盘条带化（RAID 0）

![Nested RAID diagram: RAID 1+0 combining mirroring and striping](/img/62c05c74537f6e74.webp)

### 配置示例 {#configuration-example}

在本示例中，我使用 10 块 SSD 磁盘并配置为 RAID（RAID 1+0）

创建 RAID 0 块

```ros
add raid-device-count=5 raid-type=0 slot=raid10 type=raid
```

创建五个 RAID 1 块，每个包含 2 个设备，并将它们添加到之前创建的 RAID 0 块（name=raid10）中，将其设置为 master-raid

```ros
add raid-device-count=2 raid-master=raid10 raid-role=0 raid-type=1 slot=raid0 type=raid
add raid-device-count=2 raid-master=raid10 raid-role=1 raid-type=1 slot=raid1 type=raid
add raid-device-count=2 raid-master=raid10 raid-role=2 raid-type=1 slot=raid2 type=raid
add raid-device-count=2 raid-master=raid10 raid-role=3 raid-type=1 slot=raid3 type=raid
add raid-device-count=2 raid-master=raid10 raid-role=4 raid-type=1 slot=raid4 type=raid
```

将磁盘添加到每个 RAID 块

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

之后格式化 raid10 块

```ros
format raid10 file-system=ext4 
```

格式化后，您应该能看到可用空间并使用该块

```ros
23 BM        type=raid slot="raid10" slot-default="" parent=none uuid="ec3344f4-1662-49ab-b899-db1aaa217b0f" fs=ext4 model="RAID0 striped" size=9 601 967 652 864 
             free=9 597 901 369 344 raid-type=0 raid-device-count=5 raid-max-component-size=none raid-master=none raid-state="clean" nvme-tcp-export=no 
             iscsi-export=no nfs-sharing=no smb-sharing=no media-sharing=no media-interface=none 
```

基于此配置，您可以修改 RAID 10 配置以适应您所需的存储设备数量。

同样，也可以创建其他嵌套 RAID 配置，遵循示例中展示的相同原则。
