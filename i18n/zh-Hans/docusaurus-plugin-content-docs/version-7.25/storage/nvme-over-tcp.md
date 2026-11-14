---
sidebar_key: "storage/nvme-over-tcp"
sidebar_position: 6
title: "NVMe over TCP"
sidebar_label: "NVMe over TCP"
description: "NVMe over TCP 支持发起端和目标端访问网络附加的 NVMe 存储，并可配置 IP 地址、端口和基于主机的访问控制。示例展示了如何从 RouterOS 客户端向服务器挂载磁盘，包括 Linux 客户端设置步骤。"
tags:
  - 'nvme'
  - 'storage'
  - 'tcp'
source: https://manual.mikrotik.com/docs/7.25/storage/nvme-over-tcp
captured_at: '2026-11-04T11:21:35+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info
此功能需要 [存储](./index.md) 软件包。
:::

NVMe over TCP 允许在发起端（客户端）侧通过网络将存储作为 NVMe 块设备访问。在目标端（主机）侧，该设备可以是 HDD/SSD/NVMe 驱动器，甚至是 RAID 阵列。

NVMe over TCP 服务器默认监听 TCP 端口 4420。

## 示例 {#examples}

### 挂载磁盘 {#mount-a-disk}

在此示例中，一台 RouterOS 设备用作存储服务器（ **Host** ），另一台 RouterOS 设备需要通过网络挂载存储设备（ **Client** ）。

1. 在 **Host** 上使用以下命令：  

   ```ros
   /disk/set disk1 nvme-tcp-export=yes nvme-tcp-port=4420
   ```

2. 在 **Client** 上使用以下命令：  

   ```ros
   /disk/add type=nvme-tcp nvme-tcp-address=192.168.1.1 nvme-tcp-name=disk1
   ```

3. 您的 **Client** 现在将看到一个实际上是通过 NVMe over TCP 在网络挂载的磁盘。

#### Linux 客户端 {#linux-client}

使用以下命令在 Linux **Client** 上设置 NVMe over TCP。

1. 加载内核模块。  

    ```bash
    modprobe nvme_tcp
    ```

2. 发现现有的 NVMe over TCP 挂载。  

   ```bash
   nvme discover -t tcp -a 192.168.1.1 -s 4420
   ```

   ```routeros
   #OUTPUT:
   Discovery Log Number of Records 1, Generation counter 2
   =====Discovery Log Entry 0======
   trtype:  tcp
   adrfam:  ipv4
   subtype: nvme subsystem
   treq:    not specified, sq flow control disable supported
   portid:  4420
   trsvcid: 4420
   subnqn:  disk1
   traddr:  10.155.166.7
   sectype: none
   ```

3. 连接到 NVMe over TCP 挂载。  

   ```bash
   nvme connect -t tcp -a 192.168.1.1 -s 4420 -n disk1
   ```

4. 块设备现在应该可用了。  

   ```bash
   ls /dev/nvme*
   ```

    ```bash
    #OUTPUT:
    /dev/nvme0  /dev/nvme0n1  /dev/nvme-fabrics
    ```

5. 现在您可以像使用 Linux **Client** 上的任何其他块设备一样使用已挂载的块设备。

如果您想断开已挂载的块设备：

```bash
nvme disconnect -d /dev/nvme0
```

### 将文件挂载为块设备 {#mount-a-file-as-a-block-device}

在此示例中，一台 RouterOS 设备用作存储服务器（ **Host** ），另一台 RouterOS 设备需要通过网络挂载存储设备（ **Client** ）。

:::warning

当您不想将整个磁盘分配给 **Client**，而是只想将磁盘大小的一部分分配给 **Client** 时，这种设置很有用。挂载文件而非磁盘的性能将低于使用 NVMe over TCP 挂载磁盘（或分区）的性能。

:::

1. 在 **Host** 上使用以下命令创建一个将用作块设备的文件：  

   ```routeros
   /disk/add type=file file-path=disk1/BIGFILE.img file-size=10G slot=blockdevice1
   /disk/set blockdevice1 nvme-tcp-export=yes 
   ```

2. 在 **Client** 上使用以下命令将文件挂载为块设备：  

   ```routeros
   /disk/nvme-discover 192.168.1.1
   /disk/add nvme-tcp-address=192.168.1.1 nvme-tcp-name=blockdevice1 type=nvme-tcp
   /disk/format blockdevice1 file-system=ext4
   ```

3. 您的 **Client** 现在将看到一个名为 `blockdevice1` 的新磁盘，尽管在 **Server** 上该存储设备实际上是一个文件。

:::tip

如果您想在 Linux **Client** 上挂载块设备，请参阅 [Linux 客户端](#linux-client) 部分。

:::

### 挂载 RAID 阵列 {#mount-a-raid-array}

在此示例中，一台 RouterOS 设备用作存储服务器（ **Host** ），另一台 RouterOS 设备需要通过网络挂载存储设备（ **Client** ），同时还提供数据冗余。

1. 在 **Host** 上设置 [RAID](./raid/index.md)，例如：  

   ```routeros
   /disk/add raid-device-count=8 raid-type=6 slot=RAID6_array type=raid
   /disk/set disk1 raid-master=RAID6_array raid-role=0
   /disk/set disk2 raid-master=RAID6_array raid-role=1
   /disk/set disk3 raid-master=RAID6_array raid-role=2 
   /disk/set disk4 raid-master=RAID6_array raid-role=3
   /disk/set disk5 raid-master=RAID6_array raid-role=4
   /disk/set disk6 raid-master=RAID6_array raid-role=5
   /disk/set disk7 raid-master=RAID6_array raid-role=6 
   /disk/set disk8 raid-master=RAID6_array raid-role=7
   /disk/set RAID6_array nvme-tcp-export=yes
   ```

2. 在 **Client** 上使用以下命令：

    ```ros
    /disk/add type=nvme-tcp nvme-tcp-address=192.168.1.1 nvme-tcp-name=RAID6_array
    ```

3. 您的 **Client** 现在将看到一个磁盘，但它实际上是一个高度冗余的 RAID 阵列。

:::tip

如果您想在 Linux **Client** 上挂载块设备，请参阅 [Linux 客户端](#linux-client) 部分。

:::

:::danger

不要将来自不同 RouterOS 设备的多个磁盘挂载到 Linux 客户端上并将它们组成软件 RAID 配置（例如 mdadm）。虽然这种配置确实提供了一定的冗余，但您可能会遇到异常的延迟问题甚至超时。建议在 RouterOS 上创建 RAID 阵列，并将该 RAID 阵列作为块设备导出到您的 Linux 客户端。

:::
