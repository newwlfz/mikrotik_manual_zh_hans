---
title: "基于 TCP 的 NVMe"
description: "NVMe over TCP 支持启动器和目标端访问网络连接的 NVMe 存储，并可配置 IP 地址、端口、密码和基于主机的访问控制。示例演示如何将 RouterOS 客户端中的磁盘挂载到服务器，包括 Linux 客户端设置步骤。"
tags:
  - 'nvme'
  - 'storage'
  - 'tcp'
source: https://manual.mikrotik.com/docs/7.24/storage/nvme-over-tcp
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "storage/raid"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

:::info
此功能需要 [Storage](/docs/storage) 软件包。
:::

nvme-tcp 允许通过网络访问存储，并在 initiator 端将其作为 NVMe 块设备使用。在 target 端，该设备可以是 hdd、ssd、nvme，甚至可以是 raid 阵列。

## 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **nvme-tcp-address** | NVMe over TCP 目标的 IP 地址。（主机设备 IP） |
| **nvme-tcp-export** | 在主机设备上禁用或启用 NVMe over TCP |
| **nvme-tcp-host-name** | 该属性指定 NVMe over TCP 发起端的主机名。可用于标识和身份验证 |
| **nvme-tcp-name** | 该属性指定 NVMe over TCP 目标的名称，或用于引用的连接名称（需要与主机插槽名称相同） |
| **nvme-tcp-password** *[s](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)**[ensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 该属性用于指定 NVMe over TCP 连接的身份验证密码，以确保安全访问。 |
| **nvme-tcp-port** | 该属性指定 NVMe over TCP 目标用于侦听发起端传入连接的网络端口。NVMe over TCP 流量的默认端口为 4420。 |
| **nvme-tcp-server-allow-host-name** | 该属性指定 NVMe over TCP 服务器是否允许来自特定主机名的连接，从而提供基于主机的访问控制机制。 |
| **nvme-tcp-server-password** *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 该属性指定 NVMe over TCP 服务器的密码，用于验证连接到目标的发起端。 |
| **nvme-tcp-server-port** | 该属性指定 NVMe over TCP 服务器用于接受发起端连接的网络端口。 |

## 示例 {#examples}

### 挂载磁盘 {#mount-a-disk}

在本示例中，一台 RouterOS 设备用作存储服务器（ **Host** ），另一台 RouterOS 设备需要通过网络挂载存储设备（ **Client** ）。

1. 在 **Host** 上使用以下命令：  

   ```ros
   /disk/set disk1 nvme-tcp-export=yes nvme-tcp-port=4420
   ```

2. 在 **Client** 上使用以下命令：  

   ```ros
   /disk/add type=nvme-tcp nvme-tcp-address=192.168.1.1 nvme-tcp-name=disk1
   ```

3. 现在， **Client** 将看到一个实际上通过 NVMe over TCP 在网络上挂载的磁盘。

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

4. 块设备现在应可用。  

   ```bash
   ls /dev/nvme*

   ```

    ```bash
    #OUTPUT:
    /dev/nvme0  /dev/nvme0n1  /dev/nvme-fabrics
    ```

5. 现在可以像使用 Linux **Client** 上的任何其他块设备一样使用已挂载的块设备。

如果要断开已挂载的块设备：

```bash
nvme disconnect -d /dev/nvme0
```

### 将文件挂载为块设备 {#mount-a-file-as-a-block-device}

在本示例中，一台 RouterOS 设备用作存储服务器（ **Host** ），另一台 RouterOS 设备需要通过网络挂载存储设备（ **Client** ）。

:::warning

当不想将整块磁盘委派给 **Client** ，而只想将磁盘容量的一部分分配给 **Client** 时，这种配置很有用。与使用 NVMe over TCP 挂载磁盘（或分区）相比，挂载文件的性能较低。
:::

1. 在 **Host** 上使用以下命令创建一个将用作块设备的文件：  

   ```routeros
   /disk/add type=file file-path=disk1/BIGFILE.img file-size=10G slot=blockdevice1
   /disk/set blockdevice1 nvme-tcp-export=yes 
   ```

2. 在 **Client** 上使用以下命令将该文件挂载为块设备：  

   ```routeros
   /disk/nvme-discover 192.168.1.1
   /disk/add nvme-tcp-address=192.168.1.1 nvme-tcp-name=blockdevice1 type=nvme-tcp
   /disk/format blockdevice1 file-system=ext4
   ```

3. 现在，**Client** 将看到一个名为 `blockdevice1` 的新磁盘，即使在 **Server** 上该存储设备实际上是一个文件。

:::tip

如果要在 Linux **Client** 上挂载该块设备，请查看 [Linux Client](#linux-client) 部分。
:::

### 挂载 RAID 阵列 {#mount-a-raid-array}

在本示例中，一台 RouterOS 设备用作存储服务器（**Host**），另一台 RouterOS 设备需要通过网络挂载存储设备（**Client**），同时还需要提供数据冗余。

1. 在 **Host** 上设置 [RAID](/docs/storage/raid)，例如：  

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

3. 现在，您的 **Client** 将看到一个磁盘，但它实际上是一个高度冗余的 RAID 阵列。

:::tip

如果要在 Linux **Client** 上挂载块设备，请查看 [Linux Client](#linux-client) 部分。
:::

:::danger

不要在 Linux Client 上挂载来自不同 RouterOS 设备的多个磁盘，并将其组成软件 RAID 配置（例如 mdadm）。虽然此类配置确实提供一定冗余，但可能出现异常延迟问题甚至超时。建议在 RouterOS 上创建 RAID 阵列，并将该 RAID 阵列作为块设备导出到 Linux Client。
:::
