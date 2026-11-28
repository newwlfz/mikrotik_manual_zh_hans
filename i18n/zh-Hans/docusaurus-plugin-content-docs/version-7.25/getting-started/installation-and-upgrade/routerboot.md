---
title: "RouterBOOT"
description: "RouterBOOT 管理 MikroTik 硬件上的 RouterOS 启动，包含主加载器和备用加载器，并提供 force-backup-booter 选项。reset 按钮具有多种功能，包括配置重置、CAPs 模式激活和 Netinstall 服务器搜索。具有特定设置的 RouterBOARD 设备可使用串行控制台访问。"
tags:
  - 'routerboot'
  - 'configuration-management'
  - 'firmware-upgrade'
source: https://manual.mikrotik.com/docs/7.25/getting-started/installation-and-upgrade/routerboot
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "getting-started/configuration-management"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "memory"
---

RouterBOOT 负责在 MikroTik 硬件设备（例如接入点、路由器和其他型号）中启动 RouterOS。由于 MikroTik 推出了许多新的硬件系列，本文及其他文档中使用 RouterBOARD 一词时，也适用于所有其他运行 RouterOS 的硬件系列。

### 主加载器和备用加载器 {#main-and-backup-loaders}

默认使用主（常规）加载器，但 RouterBOARD 设备还有一个辅助（备用）引导加载器，可在主加载器无法工作时使用。可以通过 RouterOS 中的配置设置调用备用加载器：

```ros
/system/routerboard/settings/set force-backup-booter=yes
```

也可以在打开设备电源时按住 RESET 按钮来使用备用引导加载器。只能升级主 RouterBOOT，因此如果升级失败，可以使用备用引导加载器启动设备并降级主加载器。有关升级说明，请参阅 [RouterBOARD#UpgradingRouterBOOT](/docs/7.24/hardware/routerboard) 中的单独说明。

### RouterBOARD reset 按钮 {#routerboard-reset-button}

RouterBOOT reset 按钮有三个功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，然后松开按钮以重置 RouterOS 配置（总共 5 秒）。
- 继续按住 5 秒，直到 LED 灯常亮，然后松开以启用 CAPs 模式（总共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 灯熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器。

:::warning
如果在加电前按住按钮，除上述所有操作外，还会使用备用 RouterBOOT。要在不加载备用加载器的情况下执行上述操作，请在设备加电后立即按下按钮。
:::

[Reset the password](https://help.mikrotik.com/docs/spaces/RKB/pages/328274/Reset+the+password)

[https://www.youtube.com/watch?v=6Unz92rABs8](https://www.youtube.com/watch?v=6Unz92rABs8)

### **Wireless Wire** 套件配置重置 {#configuration-reset-for-wireless-wire-kits}

重置按钮的功能与其他设备相同，详见 [/docs/Getting%20Started/routeros-configuration-reset](/docs/7.24/getting-started/configuration-management/routeros-configuration-reset)

启动时按住按钮 5 秒（USR LED 开始闪烁）— 重置为受密码保护的状态。

启动时按住按钮 10 秒（USR LED 闪烁后常亮）— 完全删除配置。

### 配置 {#configuration}

对于带有串行控制台接口的 RouterBOARD 设备，可以访问 RouterBOOT 加载器配置菜单。所需线缆请参见 [Serial Console](/docs/7.24/management-tools/serial-console) 手册。RouterBOARD 串行端口配置为 **115200bit/s**、**8 data bits**、**1 stop bit** 和 **no parity**。建议禁用硬件流控。

以下示例显示 RouterBOOT 7.4beta4 中可用的菜单：

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

选项含义一目了然。

| letter | description | explanation |
| :-- | :-- | :-- |
| d | boot delay | 延迟启动 RouterOS，以允许接口初始化 |
| k | boot key | 用于打开配置菜单的按钮 |
| s | serial console | 设置串行端口的波特率 |
| n | silent boot | 抑制串行端口上的所有输出，以防连接了某些设备（例如 GPS 设备或温度监控器） |
| o | boot device | 允许启用 Netinstall 启动 |
| z | extra kernel parameters |  |
| r | reset booter configuration | 重置此菜单中的设置。**警告，不会进行确认！** |
| e | format storage | 销毁 NAND 上的所有数据，包括 RouterOS 配置和许可证 |
| w | repartition nand | 详情请参阅 [Partitions](/docs/7.24/system-information-and-utilities/partitions) 文档 |
| y | active partition | 选择用于尝试加载 RouterOS 的活动分区 |
| g | upgrade firmware | 允许通过网络或 XModem 协议升级 RouterBOOT 版本 |
| i | board info |  |
| p | boot protocol |  |
| b | booter options | 选择默认使用的引导加载程序 |
| t | do memory testing |  |
| j | boot os |  |
| l | erase license |  |
| x | exit setup |  |

按相应的键盘字母将显示更多选项列表；如下所示：

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
每个 ROS 版本都包含新的 RouterBoot 版本。升级 ROS 后，建议同时升级 RouterBoot。
:::

### 检查 RouterBOOT 版本 {#checking-routerboot-version}

该命令显示设备当前的 RouterBOOT 版本，以及 *routeros-x.yy.npk* 软件包中包含的可用升级，或你上传的与设备型号对应的 *\*.FWF* 文件：

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

在这种情况下，你会看到当前 RouterOS 版本中已经有 **更新版本** 的 Bootloader 固件可用，并且该固件已更新，需要重启。

:::warning
也可以通过上传包含旧版本的 \*.FWF 文件进行降级。联系 MikroTik 支持进行故障排查时，可能需要执行此操作。
:::
