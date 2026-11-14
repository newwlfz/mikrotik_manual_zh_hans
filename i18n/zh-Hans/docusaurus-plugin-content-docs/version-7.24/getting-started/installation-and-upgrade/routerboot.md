---
sidebar_key: "getting-started/installation-and-upgrade/routerboot"
sidebar_position: 6
title: "RouterBOOT"
sidebar_label: "RouterBOOT"
description: "RouterBOOT 负责管理 MikroTik 硬件上的 RouterOS 启动，具有主加载器和备用加载器，并提供 force-backup-booter 选项。复位按钮具有多种功能，包括重置配置、激活 CAPs 模式以及搜索 Netinstall 服务器。对于具有特定设置的 RouterBOARD 设备，可使用串口控制台访问。"
tags:
  - 'routerboot'
  - 'configuration-management'
  - 'firmware-upgrade'
source: https://manual.mikrotik.com/docs/7.24/getting-started/installation-and-upgrade/routerboot
captured_at: '2026-11-04T11:28:49+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RouterBOOT 负责在 MikroTik 硬件设备（例如接入点、路由器及其他型号）中启动 RouterOS。由于 MikroTik 在此处及其他地方已经推出了许多新的硬件系列，因此当使用 RouterBOARD 这一术语时，它同样适用于所有其他运行 RouterOS 的硬件系列。

### 主加载器和备份加载器 {#main-and-backup-loaders}

默认情况下，使用主（常规）加载器，但 RouterBOARD 设备还有一个辅助（备份）引导加载器，可在主加载器无法工作时使用。可以通过 RouterOS 中的配置设置来调用备份加载器：

```ros
/system/routerboard/settings/set force-backup-booter=yes
```

也可以在按住 RESET 按钮的同时开启设备来使用备份引导器。只能升级主 RouterBOOT，因此如果失败，可以使用备份引导器启动设备并降级主加载器。有关升级说明，请遵循 [RouterBOARD#UpgradingRouterBOOT](../../hardware/routerboard.md) 中的单独说明。

### RouterBOARD 复位按钮 {#routerboard-reset-button}

RouterBOOT 复位按钮有三个功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，然后松开按钮以重置 RouterOS 配置（总计 5 秒）。
- 再按住 5 秒，直到 LED 变为常亮，然后松开以开启 CAPs 模式（总计 10 秒）。
- 或者再按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器。

:::warning
如果在接通电源之前按住按钮，除上述所有操作外，还将使用备份 RouterBOOT。要在不加载备份加载器的情况下执行上述操作，请在给设备接通电源后立即按下按钮。
:::

[重置密码](https://help.mikrotik.com/docs/spaces/RKB/pages/328274/Reset+the+password)

[https://www.youtube.com/watch?v=6Unz92rABs8](https://www.youtube.com/watch?v=6Unz92rABs8)

### 用于 **Wireless Wire** 套件的配置重置 {#configuration-reset-for-wireless-wire-kits}

reset 按钮的功能与其他设备相同，详细说明见 [/docs/Getting%20Started/routeros-configuration-reset](../configuration-management/routeros-configuration-reset.md)

启动时按住按钮 5 秒（USR LED 灯开始闪烁）——重置为受密码保护的状态。

启动时按住按钮 10 秒（USR LED 闪烁后变为常亮）——完全移除配置。

### 配置 {#configuration}

对于带有串行控制台连接器的 RouterBOARD 设备，可以访问 RouterBOOT 加载器配置菜单。所需线缆在 [串行控制台](../../management-tools/serial-console.md) 手册中有说明。RouterBOARD 串行端口配置为 **115200bit/s**、**8 个数据位**、**1 个停止位**和**无校验**。我们建议禁用硬件流控制。

此示例展示了 RouterBOOT 7.4beta4 中可用的菜单：

```ros
RouterBOOT booter 7.4beta4

CRS328-24P-4S+

built by build at 2022-06-15 11:34:09 from revision 73B4521C

CPU frequency: 800 MHz
  Memory size: 512 MiB
 Storage size:  16 MiB

Press Ctrl+E to enter etherboot mode
Press any key within 2 seconds to enter setup

RouterBOOT-7.4beta4
What do you want to configure?
   d - boot delay
   k - boot key
   s - serial console
   n - silent boot
   o - boot device
   z - extra kernel parameters
   r - reset booter configuration
   e - format storage
   w - repartition nand
   g - upgrade firmware
   i - board info
   p - boot protocol
   b - booter options
   j - boot os
   t - hardware tests
   l - erase license
   x - exit setup
your choice: 
```

这些选项的含义不言自明。

| 字母 | 描述 | 说明 |
| :-- | :-- | :-- |
| d | 启动延迟 | 延迟启动 RouterOS，以便接口初始化 |
| k | 启动按键 | 用于打开配置菜单的按钮 |
| s | 串行控制台 | 设置串行端口的波特率 |
| n | 静默启动 | 抑制串行端口上的所有输出，以防某些设备连接到该端口（例如 GPS 设备或温度监控器） |
| o | 启动设备 | 允许启用 Netinstall 启动 |
| z | 额外内核参数 |  |
| r | 重置引导器配置 | 重置此菜单中的设置。**警告，没有确认！** |
| e | 格式化存储 | 销毁 NAND 上的所有数据，包括 RouterOS 配置和许可证 |
| w | 重新分区 NAND | 有关更多信息，请参阅 [分区](../../system-information-and-utilities/partitions.md) 文档 |
| y | 活动分区 | 选择要尝试从中加载 RouterOS 的活动分区 |
| g | 升级固件 | 允许通过网络或 XModem 协议升级 RouterBOOT 版本 |
| i | 板卡信息 |  |
| p | 启动协议 |  |
| b | 引导器选项 | 选择默认使用的引导加载器 |
| t | 执行内存测试 |  |
| j | 启动操作系统 |  |
| l | 擦除许可证 |  |
| x | 退出设置 |  |

按下相应的键盘字母将显示进一步选项的列表；如下所示：

```
# d - boot delay:

Select boot delay:
   1 - 1s
 * 2 - 2s
   3 - 3s
   4 - 4s
   5 - 5s
   6 - 6s
   7 - 7s
   8 - 8s
   9 - 9s

# k - boot key:

Select key which will enter setup on boot:
 * 1 - any key
   2 - <Delete> key only

# s - serial console:

Select baud rate for serial console:
 * 1 - 115200
   2 - 57600
   3 - 38400
   4 - 19200
   5 - 9600
   6 - 4800
   7 - 2400
   8 - 1200
   9 - off

# n - silent boot:

Silent boot:
   0 - off
 * 1 - on

# o - boot device:

Select boot device:
   e - boot over Ethernet
 * n - boot from NAND, if fail then Ethernet
   1 - boot Ethernet once, then NAND
   o - boot from NAND only
   b - boot chosen device
   f - boot Flash Configure Mode
   3 - boot Flash Configure Mode once, then NAND

# f - cpu frequency:

Select CPU frequency:
   a -  200MHz
   b -  400MHz
   c -  600MHz
   d -  800MHz
   e - 1000MHz
 * f - 1200MHz

# r - reset booter configuration:

# e - format nand:

Do you really want to format your storage device?
that would result in losing all your data
type "yes" to confirm: 

# w - repartition nand:

Select partition count:
   1 - partition
 * 2 - partitions
   3 - partitions
   4 - partitions

# y - active partition:

Select active partition:
 * 0 - partition
   1 - partition

# g - upgrade firmware:

Upgrade firmware options:
   e - upgrade firmware over ethernet
   s - upgrade firmware over serial port

# i - board info:

Board Info:

        Board type: CCR1009-8G-1S-1S+
     Serial number: 48FF01DDE6FD
  Firmware version: 3.19
     CPU frequency: 1200 MHz
       Memory size: 2048 MiB
         NAND size: 128 MiB
        Build time: 2014-09-23 15:02:34
  eth1 MAC address: 00:0C:42:00:BE:4A
  eth2 MAC address: 00:0C:42:00:BE:4B
  eth3 MAC address: 00:0C:42:00:BE:4C
  eth4 MAC address: 00:0C:42:00:BE:4D
  eth5 MAC address: 00:0C:42:00:BE:4E
  eth6 MAC address: 00:0C:42:00:BE:4F
  eth7 MAC address: 00:0C:42:00:BE:50
  eth8 MAC address: 00:0C:42:00:BE:51
  eth9 MAC address: 00:0C:42:00:BE:52
 eth10 MAC address: 00:0C:42:00:BE:53

# p - boot protocol:

Choose which boot protocol to use:
 * 1 - bootp protocol
   2 - dhcp protocol

# b - booter options:

Select which booter you want to load:
 * 1 - load regular booter
   2 - force backup-booter loading

#t - do memory testing:

launches built in memory test!

# x - exit setup:

Exit bios configuration menu and continues with system startup.

```

### 简单升级 {#simple-upgrade}

可以通过以下方式从 RouterOS 升级 RouterBOOT：

- 运行命令 *`/system/routerboard/upgrade`*。
- 重启路由器以应用升级（*`/system/reboot`*）。

```ros
[admin@admin] > /system/routerboard/upgrade 
Do you really want to upgrade firmware? [y/n] 

```

:::warning
每个 ROS 版本都包含新的 RouterBoot 版本。执行 ROS 升级后，我们始终建议也升级 RouterBoot。
:::

### 检查 RouterBOOT 版本 {#checking-routerboot-version}

此命令显示设备的当前 RouterBOOT 版本，以及 *routeros-x.yy.npk* 包中包含的可用升级，或者如果你上传了与设备型号对应的 *\*.FWF* 文件：

```ros
[admin@admin] >  /system/routerboard/print 
                ;;; Firmware upgraded successfully, please reboot for changes 
                    to take effect!
       routerboard: yes
        board-name: hAP ac
             model: RouterBOARD 962UiGS-5HacT2HnT
     serial-number: 6737057562DD
     firmware-type: qca9550L
  factory-firmware: 3.29
  current-firmware: 6.49.5
  upgrade-firmware: 7.4beta5 

```

在这种情况下，你会发现当前 RouterOS 版本中已经包含**更新版本**的引导加载器固件，并且它已更新并需要重启。

:::warning
也可以通过上传旧版本的 \*.FWF 文件进行降级，在联系 MikroTik 支持进行故障排除时可能需要这样做。
:::
