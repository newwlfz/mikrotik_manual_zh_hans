---
title: "资源"
description: "RouterOS 中的 Resource 菜单提供系统统计信息概览，包括运行时间、内存、磁盘使用情况，以及 CPU 型号和频率等硬件详情。它还提供子菜单，用于查看每个 CPU 的详细使用情况、IRQ 和磁盘统计信息。"
tags:
  - 'system-resource'
  - 'cpu'
  - 'hardware'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/resource
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 常规 {#general}

**子菜单：** `/system/resource`

常规资源菜单显示整体资源使用情况和路由器统计信息，例如运行时间、内存使用情况、磁盘使用情况、版本等。

它还包括多个子菜单，用于查看更详细的硬件统计信息，例如 CPU、IRQ 和 Hardware。

```ros
[admin@MikroTik] > /system/resource/print 
                   uptime: 29s
                  version: 7.24rc2
               build-time: 2023-08-31 13:55:47
          minimum-version: 7.6
              free-memory: 94.2MiB
             total-memory: 224.0MiB
                      cpu: ARM
                cpu-count: 2
            cpu-frequency: 800MHz
                 cpu-load: 2%
           free-hdd-space: 93.5MiB
          total-hdd-space: 128.5MiB
  write-sect-since-reboot: 85
         write-sect-total: 222100
               bad-blocks: 0%
        architecture-name: arm
               board-name: hAP ax lite LTE6
                 platform: MikroTik

```

所有属性均为只读

| 属性 | 说明 |
| :-- | :-- |
| **architecture-name** (*string*) | CPU 架构 |
| **bad-blocks** (*percent*) | 显示 NAND 上坏块的百分比。 |
| **board-name** (*string*) | RouterBOARD 型号名称 |
| **build-time**(*string*) | 已安装 RouterOS 版本的构建时间 |
| **cpu** (*string*) | 板载 CPU 型号 |
| **cpu-count** (*integer*) | 系统中存在的 CPU 数量。每个核心都是独立的 CPU，Intel HT 也被视为独立的 CPU。 |
| **cpu-frequency** (*string*) | 当前 CPU 频率 |
| **cpu-load** (*percent*) | 已使用 CPU 资源的百分比。包含所有 CPU。每核心 CPU 使用率可在 [CPU 子菜单](#cpu) 中查看 |
| **minimum-version**(*string*) | 最低 RouterOS 版本（原为“factory-software”） |
| **free-hdd-space** (*string*) | 硬盘或 NAND 上的可用空间 |
| **free-memory** (*string*) | 未使用的 RAM 容量 |
| **platform** (*string*) | 平台名称 |
| **total-hdd-space** (*string*) | 硬盘或 NAND 的大小 |
| **total-memory** (*string*) | 已安装的 RAM 容量 |
| **uptime** (*time*) | 自启动以来经过的时间间隔 |
| **version** (*string*) | 已安装的 RouterOS 版本号 |
| **write-sect-since-reboot** (*integer*) | 自路由器上次重启以来 HDD 或 NAND 的扇区写入次数 |
| **write-sect-total** (*integer*) | 扇区写入总次数 |

### CPU

**子菜单：** `/system/resource/cpu`

该子菜单显示每个 CPU 的使用情况，以及 IRQ 和 Disk 使用情况。

```ros
[admin@RB1100test] /system/resource/cpu> print 
CPU LOAD IRQ DISK 
0 5% 0% 0% 
[admin@RB1100test] /system/resource/cpu> 

```

## 属性 {#properties}

### 只读属性 {#read-only-properties}

| 属性 | 说明 |
| :-- | :-- |
| **cpu** (*integer*) | 显示其使用率的 CPU 的标识号。 |
| **load** (*percent*) | CPU 使用率，以百分比表示 |
| **irq** (*percent*) | IRQ 使用率，以百分比表示 |
| **disk** (*percent*) | 磁盘使用率，以百分比表示 |

### IRQ

**子菜单：** `/system/resource/irq`

该菜单显示路由器上所有已使用的 IRQ。在多核系统上，可以通过将 IRQ 分配给特定核心来设置 [IRQ 负载均衡](#irq)。IRQ 分配由硬件完成，无法在 RouterOS 中更改。例如，如果所有以太网接口都分配到同一个 IRQ，则必须处理硬件问题：升级主板 BIOS，在 BIOS 中手动重新分配 IRQ，如果以上方法均无效，则更换硬件。

#### 属性 {#properties-1}

| 属性 | 说明 |
| :-- | :-- |
| **cpu** (*auto \| integer*；默认值： ) | 指定将哪个 CPU 分配给该 IRQ。<ul><li><strong>auto</strong> - 根据中断数量选择 CPU。使用 <a href="https://docs.kernel.org/networking/napi.html" rel="nofollow">NAPI</a> 优化中断。</li></ul> |

**只读属性**

| 属性 | 说明 |
| :-- | :-- |
| **active-cpu** (*integer*) | 显示多核系统中的活动 CPU。 |
| **count** (*integer*) | 中断数量。在以太网接口上，interrupt=packet。 |
| **irq** (*integer*) | IRQ 标识号 |
| **users** (*string*) | 分配给 IRQ 的进程 |

### RPS

**子菜单：** `/system/resource/irq/rps`

Receive Packet Steering（RPS）类似于 Receive Side Scaling（RSS），用于将数据包定向到特定 CPU 进行处理。不过，RPS 在软件层面实现，有助于防止单个网卡的硬件队列成为网络流量瓶颈。  
  
当数据包需要额外处理且占用较多 CPU 时间时，RPS 很有用，例如 PPP 隧道终止、VPLS 或防火墙处理。RPS 用于对数据包进行分类并将其转发到另一个 CPU 所消耗的 CPU 资源，会被所需的额外处理开销所抵消。遗憾的是，RPS 并不总能替代以太网驱动中的多行处理，因为将数据包转发到另一个 CPU 本身开销较大。
  
对于具有多个队列的网络设备，通常没有必要同时配置 RPS 和 RSS，因为 RSS 默认会将 CPU 映射到每个接收队列。不过，如果硬件队列少于 CPU 数量，RPS 仍可能有益，具体取决于设备处理的流量。

#### 属性 {#properties-2}

| 属性 | 说明 |
| :-- | :-- |
| **disable***(number)* | 禁用所选条目的 RPS |
| **edit** *(number)* | 编辑现有条目的属性 |
| **enable** *(number)* | 启用所选条目的 RPS |
| **reset***(number)* | 将属性重置为默认值 |

### **硬件** {#hardware}

显示通过 PCI、USB 或 SCSI 总线连接的已检测硬件设备。

Flags:

```ros
I - inactive   Device is present but not active
```

**子菜单：** `/system/resource/hardware`

#### 属性 {#properties-3}

| 属性 | 说明 |
| :-- | :-- |
| **location** (*string*) | 设备在系统拓扑中的位置 |
| **parent** (*enum*) | 父总线或控制器 |
| **type** (usb\|pci\|scsi\|serial) | 设备的总线类型 |
| **vendor** (*string*) | 设备厂商名称 |
| **name** (*string*) | 设备名称或型号 |
| **serial-number** (*string*) | 设备序列号 |
| **vendor-id**(string) | 厂商标识符（VID） |
| **device-id** (string) | 设备标识符（PID / Device ID） |
| **speed** (*string*) | 协商后的设备速度 |
| **ports***(number)* | 设备提供的端口数量 |
| **usb-version** (*string*) | 支持的 USB 版本 |
| **owner** (*string*) | 拥有该设备的子系统或驱动 |
| **device-path** (*string*) | 从根总线到端点的设备路径 |

**只读属性**

| 属性 | 说明 |
| :-- | :-- |
| **category** (*string*) | 设备类别 |
| **irq** (*number*) | 分配的中断号 |

### 设备授权 {#device-authorization}

控制硬件设备的授权状态。

**子菜单：** `/system/resource/hardware/authorize`

#### 属性 {#properties-4}

| 属性 | 说明 |
| :-- | :-- |
| **allow** (*yes\|no*) | 启用或禁用 USB 设备授权 |

### 全局 USB 子系统设置 {#global-usb-subsystem-settings}

**子菜单：** `/system/resource/hardware/usb-settings`

#### 属性 {#properties-5}

| 属性 | 说明 |
| :-- | :-- |
| **authorization** (*yes\|no*) | 启用或禁用 USB 设备授权 |
| **numbers** (*number*) |  |

**子菜单：** `/system/resource/hardware/usb-power-reset`

#### 属性 {#properties-6}

| 属性 | 说明 |
| :-- | :-- |
| **duration** (time) | 重新启用 USB 前的断电时长 |
| **bus**(number) | USB 总线编号 |
| **slot**(number) | 总线上的 USB 端口/插槽编号 |
