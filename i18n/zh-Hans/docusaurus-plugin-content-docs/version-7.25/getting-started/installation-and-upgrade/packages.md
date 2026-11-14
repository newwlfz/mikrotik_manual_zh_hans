---
sidebar_key: "getting-started/installation-and-upgrade/packages"
sidebar_position: 4
title: "软件包"
sidebar_label: "软件包"
description: "RouterOS 将功能组织为以 .npk 为扩展名的软件包，其中包括核心的 routeros 套件以及 Containers 或 The Dude 等可选附加包。无线设备需要根据硬件安装特定的软件包，安装方式包括手动下载和直接从路由器更新。"
tags:
  - 'packages'
  - 'system-packages'
source: https://manual.mikrotik.com/docs/7.25/getting-started/installation-and-upgrade/packages
captured_at: '2026-11-04T11:20:52+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#summary}

RouterOS 的功能以软件包的形式组织，软件包是扩展名为 `.npk` 的文件。大多数功能捆绑在 ***routeros*** 软件包中，而某些功能则以单独的软件包提供。安装额外的 `.npk` 软件包可启用特定功能，例如 Containers 或 The Dude。软件包文件仅由 MikroTik 提供，第三方无法创建。你可以从我们的下载页面下载额外软件包，或直接从路由器中添加它们。

## 最低要求 {#minimum-requirements}

RouterOS 在最低限度下只需系统软件包即可运行，但对于大多数设备而言，安装 "routeros" 捆绑包后才能获得标准运行和功能。

对于无线设备，根据你所使用的硬件，有多个无线软件包可用：

- 从 RouterOS 7.13 开始，简单家用路由器的基本运行需要 ***routeros***（系统）软件包以及以下无线软件包之一：
  1. 802.11ax WiFi AP 需要无线驱动，由 ***wifi-qcom*** 软件包提供（对于 7.13 之前的 RouterOS 版本，它被称为 *wifiwave2* 软件包）。
  2. 上一代 WiFi AP 需要 ***wireless*** 软件包。

有关使用哪个无线软件包的更多信息，请参见[无线手册](../../wireless/index.md)。

其他软件包是可选的，家用路由器并不需要。只有在确定其用途时才安装它们。

## 安装软件包 {#installing-packages}

### 手动下载 {#manual-download}

要手动下载并安装额外软件包，请从 [MikroTik 下载](https://mikrotik.com/download) 页面下载所需的软件包，并根据在 System/Resources 菜单中找到的设备架构选择 RouterOS 部分。解压压缩包，并使用任意便捷方法将所需软件包上传到路由器，然后重启路由器。

### 直接从路由器下载 {#download-directly-from-the-router}

你可以使用 *System Packages* 部分直接从路由器下载并安装额外软件包。

1. 执行 ***Check For Updates*** 命令后，可用的软件包将列在 *Packages* 列表中，但它们会显示为已禁用。可用软件包列表来自 MikroTik 下载服务器。这些软件包可用，但尚未位于你的路由器上（由标志 X（Disabled）和 A（Available）指示）。
2. 要下载额外软件包，首先选择该软件包并选择 ***Enable***。
3. 要让路由器下载该软件包，请选择 ***Apply Changes***，设备将要求重启。

| 软件包列表 | 使用 "Check for updates" 加载列表后 | 启用软件包 | 选择 "Apply Changes" |
| :--- | :--- | :--- | :--- |
| [![](/img/56103c4552609cc3.png)](/img/56103c4552609cc3.png) | [![](/img/3b65fadd6caf7a14.png)](/img/3b65fadd6caf7a14.png) | [![](/img/b3db506cdc92e62e.png)](/img/b3db506cdc92e62e.png) | [![](/img/99456de9dc22c996.png)](/img/99456de9dc22c996.png) |

### 验证安装 {#verification-of-install}

为确保软件包安装成功，请在设备重启后检查 "Log" 部分。如果软件包安装成功，你会看到一条相关消息。如果存在冲突或某项要求未满足，将会进行说明，以便你可以采取进一步措施加以纠正。

![](/img/bad3f8fc7b0b7e41.webp)日志条目中的成功信息![](/img/233ed154de2c0342.webp)日志条目中的失败信息

### 系统软件包 {#system-packages}

| **软件包** | 描述 |
| :--- | :--- |
| **routeros-arm** (*arm*) | 用于 arm 设备的系统软件包。 |
| **routeros-arm64** (*arm64*) | 用于 arm64 设备的系统软件包。 |
| **routeros-mipsbe** (*mipsbe*) | 用于 mipsbe 设备的系统软件包。 |
| **routeros-mmips** (*mmips*) | 用于 mmips 设备的系统软件包。 |
| **routeros-smips** (*smips*) | 用于 smips 设备的系统软件包。 |
| **routeros-tile** (*tile*) | 用于 tile 设备的系统软件包。 |
| **routeros-ppc** (*ppc*) | 用于 ppc 设备的系统软件包。 |
| **routeros** (*x86, CHR*) | 用于 x86 安装和 CHR 环境的系统软件包。 |

### 额外软件包 {#extra-packages}

| 软件包（支持的架构） | 描述 |
| :--- | :--- |
| **calea** (*arm, arm64, mipsbe, mmips, tile, ppc, x86, CHR*) | 由于美国“通信协助执法法案”而用于特定用途的数据收集工具。 |
| **container** (*arm, arm64, x86, CHR*) | Linux 容器的 [容器](../../containers/index.md) 实现，允许用户在 RouterOS 中运行容器化环境。 |
| **dude** (*arm, arm64, mmips, tile, x86, CHR*) | 用于监控网络环境的 [Dude](../../management-tools/dude.md) 工具。 |
| **extra-nic** (*arm64*) | ARM64 CPU 架构网络接口卡（NIC）支持，建议用于非 MikroTik 板卡上的 UEFI 安装。 |
| **gps** (*arm, arm64, mipsbe, mmips, tile, ppc, x86, CHR*) | [全球定位系统](../../mobile-networking/gps/index.md)设备支持。 |
| **iot** (*arm, arm64, mipsbe, mmips, tile, ppc, x86, CHR*) | 启用： <br/><ul><li>[MQTT](../../internet-of-things/lora/general-properties.md)</li><li>[LoRa](../../storage/index.md)（适用于配备 LR8/9/2 miniPCIe 卡的设备）</li><li>[蓝牙](../../management-tools/tr-069.md)（适用于配备 Bluetooth 芯片的设备）</li><li>[GPIO](../../system-information-and-utilities/ups.md)（适用于配备 GPIO 引脚的设备）</li><li><a href="https://help.mikrotik.com/docs/pages/viewpage.action?pageId=61046813" rel="nofollow">Modbus</a>（适用于配备 RS485 端口的设备）</li></ul> |
| **iot-bt-extra** (*arm, arm64*) | 适用于 ARM 和 ARM64 设备的软件包，可启用 USB Bluetooth 适配器（必须支持 LE 4.0+）。 <br/> *<strong>注意：</strong>并非所有适配器都经过测试。我们无法事先保证特定适配器可以工作。 |
| **lora** (*arm, arm64, mipsbe, mmips, tile, ppc, x86, CHR*) | 用于支持 [LoRa](../../authentication-authorization-accounting/user-manager.md) 的占位软件包。LoRa 软件包不再是必需的，仅出于兼容性原因保留。LoRa 功能已移至 iot 软件包。 |
| **lte** (*mipsbe*) | 仅 SXT LTE（RBSXTLTE3-7）所需的软件包，其中包含内置 LTE 接口的驱动程序。 |
| **rose-storage** (*arm, arm64, tile, x86, CHR*) | RouterOS 中额外的[企业数据中心功能](../../wireless/wifi/index.md#wifi-capsman)，支持磁盘监控、改进的格式化、RAIDs、rsync、iSCSI、NVMe over TCP、NFS 和改进的 SMB。 |
| **switch-marvell** (*arm64*) | CRS8xx 系列交换机所需的驱动程序软件包。 |
| **tr069-client** (*arm, arm64, mipsbe, mmips, smips, tile, ppc, x86, CHR*) | [TR069 客户端](../../wireless/wifi/index.md)软件包。 |
| **ups** (*arm, arm64, mipsbe, mmips, tile, ppc, x86, CHR*) | [APC UPS 管理](../../virtual-private-networks/zerotier.md)接口。 |
| **user-manager** (*arm, arm64, mipsbe, mmips, tile, ppc, x86, CHR*) | [用户管理器](../../authentication-authorization-accounting/user-manager.md) 服务器，用于控制 Hotspot 和其他服务用户。 |
| **wifi-mediatek** (*arm*) | 受支持的 MediaTek 无线硬件所需的 MediaTek WiFi 驱动程序。 |
| **wifi-qcom** (*arm, arm64*) | 802.11ax 接口所需的驱动程序软件包。于 7.13 中引入。[WiFi CAPsMAN](../../wireless/wifi/index.md#wifi-capsman) 支持随系统软件包提供。 |
| **wifi-qcom-ac** (*arm*) | 适用于兼容 802.11ac 接口的可选 [WiFi](../../wireless/wifi/index.md) 驱动程序软件包。于 7.13 中引入。 |
| **wifi-qcom-be** (*arm64*) | WiFi-7 802.11be 硬件所需的驱动程序软件包。 |
| **wireless** (*arm, arm64, mipsbe, mmips, tile, ppc, x86, CHR*) | 用于管理 WiFi（最高 802.11ac）和 60GHz 无线接口的实用程序和驱动程序。此软件包在 7.12 及之前的版本中捆绑在 RouterOS 内。从 7.13 开始，它是一个单独的软件包。 <br/> <strong>wireless</strong> 软件包与 <strong>wifi-qcom</strong> 和 <strong>wifi-qcom-ac</strong> 软件包冲突——它们不能同时处于活动状态。 |
| **zerotier** (*arm, arm64*) | 启用 [ZeroTier](../../virtual-private-networks/zerotier.md) 功能。 |

## 自动安装 {#auto-install}

你还可以在使用 FTP 或 SFTP 将软件包上传到路由器后自动安装它们。软件包文件的扩展名必须命名为 `*.auto.npk`。文件上传后，路由器将自动重启以安装该软件包。这对于脚本编写和自动化非常有用。

文件名中的 `.auto.npk` 扩展名是软件包自动安装的必需条件。

## 使用软件包 {#working-with-packages}

___

### 列出软件包 {#list-packages}

*zerotier* 软件包已禁用，但已安装；*iot* 软件包在服务器上可用，但尚未下载到路由器并启用；*dude* 软件包已安排卸载。

```ros
/system/package/print 
Flags: X - DISABLED; A - AVAILABLE
Columns: NAME, VERSION, SCHEDULED, BUILD-TIME, SIZE
#    NAME            VERSION     SCHEDULED                      BUILD-TIME           SIZE  
0    wireless        7.24beta1                                  2026-05-26 10:47:52  1388.1KiB
1 X  container       7.24beta1                                  2026-05-26 10:47:52  1156.1KiB
2    routeros        7.24beta1                                  2026-05-26 10:47:52  11.0MiB  
3    zerotier        7.24beta1                                  2026-05-26 10:47:52  372.1KiB 
4 XA calea                                                                           20.1KiB  
5 XA gps                                                                             24.1KiB  
6 XA iot                                                                             788.1KiB 
7 XA openflow                                                                        76.1KiB  
8 XA tr069-client                                                                    120.1KiB 
9 XA ups                                                                             44.1KiB  
```

### 安装软件包 {#install-package}

```ros
/system/package/enable gps,zerotier,container
/system/package/apply-changes
Apply scheduled changes and reboot device? [y/N]: 

```

### 卸载软件包 {#uninstall-package}

```ros
/system/package/uninstall gps,container;
/system/package/apply-changes
Apply scheduled changes and reboot device? [y/N]: 
```

### 禁用软件包 {#disable-package}

```ros
/system/package/disable container; 
/system/package/apply-changes
Apply scheduled changes and reboot device? [y/N]:
```

### 取消卸载或禁用操作 {#cancel-the-uninstall-or-disable-action}

```ros
/system/package/unschedule container;
```

### 降级 {#downgrade}

```ros
/system/package/downgrade; /system/reboot;
Router will be rebooted. Continue? [y/N]: 
```
