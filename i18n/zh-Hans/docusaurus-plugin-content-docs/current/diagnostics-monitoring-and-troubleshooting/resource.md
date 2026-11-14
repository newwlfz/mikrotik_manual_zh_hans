---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/resource"
sidebar_position: 14
title: "资源"
sidebar_label: "资源"
description: "/system/resource 菜单显示路由器的标识和资源使用情况：uptime、RouterOS 版本、内存、disk/NAND、CPU 型号和负载；子菜单可按核心 (cpu) 细分负载、按中断 (irq) 细分负载、在核心之间引导数据包处理 (irq/rps)、列出 PCI/USB/SCSI 硬件 (hardware)，并允许进行 USB 电源控制。"
tags:
  - 'system-resource'
  - 'cpu'
  - 'hardware'
source: https://manual.mikrotik.com/docs/diagnostics-monitoring-and-troubleshooting/resource
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

[`/system/resource`](../cli-reference/system/resource/index.md) 菜单显示路由器的整体资源使用情况和标识：uptime、version、memory、disk、CPU 型号、架构以及 NAND 的坏块百分比。所有值均为只读。

```ros
[admin@MikroTik] > /system/resource/print
                   uptime: 2h31m3s
                  version: 7.26beta1
               build-time: 2026-10-01 13:29:47
          minimum-version: 7.0.9
              free-memory: 678.7MiB
             total-memory: 1024.0MiB
                      cpu: ARM64
                cpu-count: 4
            cpu-frequency: 864MHz
                 cpu-load: 0%
           free-hdd-space: 91.9MiB
          total-hdd-space: 128.0MiB
  write-sect-since-reboot: 437
         write-sect-total: 263060
               bad-blocks: 0%
        architecture-name: arm64
               board-name: hAP ax^2
                 platform: MikroTik
```

属性（uptime、version、build-time、memory、hdd space、write-sector 和 bad-block 计数器、board 和 platform 名称）在 [`/system/resource`](../cli-reference/system/resource/index.md) CLI 参考页面中描述。

## 实时查看使用情况 {#watch-usage-live}

`/system/resource/monitor` 会输出一个实时更新的视图，显示每个核心的 CPU 使用率和空闲内存（该表格会持续刷新；用 `duration` 限制其时长）：

```ros
[admin@MikroTik] > /system/resource/monitor duration=2
           cpu-used: 0%
  cpu-used-per-core: 1%
                     0%
                     0%
                     0%
        free-memory: 694948KiB
```

`free-memory` 在这里以 KiB 为单位（694948 KiB ≈ 678.7 MiB，如 `print` 所示）。

## 查看每核心明细 {#read-per-core-breakdown}

`/system/resource/cpu` 显示每个核心的使用率，分为用户负载（`load`）、中断处理（`irq`）和磁盘 I/O（`disk`）：

```ros
[admin@MikroTik] > /system/resource/cpu/print
Columns: CPU, LOAD, IRQ, DISK
#  CPU   LOAD  IRQ  DISK
0  cpu0  0%    0%   0%
1  cpu1  0%    0%   0%
2  cpu2  1%    0%   0%
3  cpu3  0%    0%   0%
```

## 中断（IRQ） {#interrupts-irq}

[`/system/resource/irq`](../cli-reference/system/resource/irq/index.md) 菜单显示路由器上使用的所有 IRQ，包括 IRQ 分配到的 CPU，以及每个设备的中断计数器行：

```ros
[admin@MikroTik] > /system/resource/irq/print where count>0
Flags: o - READ-ONLY
Columns: IRQ, USERS, CPU, ACTIVE-CPU, COUNT
 #   IRQ  USERS                                CPU   ACTIVE-CPU   COUNT
 0     6  bam_dma                              auto           0      68
 1     8  78b5000.spi                          auto           2     157
 2     9  glink-native                         auto           3     116
```

使用 `cpu=auto` 的 IRQ 分配由中断路由（使用 [NAPI](https://docs.kernel.org/networking/napi.html) 中断合并）完成。`o` 标志标记硬件固定的 IRQ，其 CPU 分配无法更改。

要将 IRQ 固定到特定核心：

```ros
/system/resource/irq/set [find irq=6] cpu=2
```

### 接收数据包转向 {#receive-packet-steering}

[`/system/resource/irq/rps`](../cli-reference/system/resource/irq/rps.md) 是接收数据包转向（RPS），类似于接收端缩放（RSS），但以软件方式实现：它将接口的数据包处理工作引导到选定的 CPU。当数据包需要额外处理且占用相对大量 CPU 时间时（例如 PPP 隧道终结、VPLS 或防火墙处理），RPS 很有用：RPS 转向的开销会被将繁重工作分散到各核心所带来的收益所抵消。

RPS 并不总是划算。如果网络设备有多个硬件队列，其接收端缩放（RSS）已经将队列映射到 CPU，那么 RPS 转向的开销大于收益。当硬件队列数少于 CPU 数，或 RSS 未覆盖该路径（例如从隧道接口解封装后的数据包）时，配置 RPS。

## 硬件映射 {#hardware-map}

`/system/resource/hardware` 列出通过 PCI、USB 和 SCSI 总线连接的设备，包括其总线位置、供应商/设备标识符、固件报告的名称、驱动所有者、协商速度、USB 版本等。没有支持枚举的总线的板卡（例如 hAP ax²）会输出空列表。

### USB 设备授权 {#usb-device-authorization}

当全局开启 USB 设备授权（在 [`/system/resource/hardware/usb-settings`](../cli-reference/system/resource/hardware/usb-settings.md) 中设置 `authorization=yes`）时，新接入的 USB 设备会保持禁用状态，直到管理员在 [`/system/resource/hardware/authorize`](../cli-reference/system/resource/hardware/authorize.md) 中允许它们。

### 重置 USB 设备 {#reset-usb-devices}

要在不重启路由器的情况下重置工作异常的 USB 调制解调器或驱动器，请使用 [`/system/resource/hardware/usb-power-reset`](../cli-reference/system/resource/hardware/usb-power-reset.md) 对其 USB 端口进行断电重启（`bus` 和 `slot` 来自设备的 `/system/resource/hardware` 行）：

```ros
/system/resource/hardware/usb-power-reset bus=1 slot=2 duration=5s
```

## 技术细节 {#technical-details}

- `cpu-load` 汇总 CPU 所有核心的使用率；使用 `/system/resource/cpu` 或 `monitor` 查看各核心的明细。
- `write-sect-since-reboot`/`write-sect-total` 和 `bad-blocks` 有助于发现 NAND 设备上的闪存磨损（结合 [健康](./health.md) 读数和 `.65` 风格的早期警告）。

有关所有参数及其默认值，请参阅 [`/system/resource`](../cli-reference/system/resource/index.md)、[`cpu`](../cli-reference/system/resource/cpu.md)、[`irq`](../cli-reference/system/resource/irq/index.md)、[`irq/rps`](../cli-reference/system/resource/irq/rps.md)、[`hardware`](../cli-reference/system/resource/hardware/index.md)、[`usb-settings`](../cli-reference/system/resource/hardware/usb-settings.md)、[`authorize`](../cli-reference/system/resource/hardware/authorize.md) 和 [`usb-power-reset`](../cli-reference/system/resource/hardware/usb-power-reset.md) CLI 参考页面。
