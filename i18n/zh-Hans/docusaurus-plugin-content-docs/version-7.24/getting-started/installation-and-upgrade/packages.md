---
title: "软件包"
description: "RouterOS 将功能组织为扩展名为 .npk 的软件包，包括核心 routeros 软件包以及 Containers 或 The Dude 等可选附加组件。无线设备需要根据硬件安装特定软件包，安装方式包括手动下载和直接更新路由器。"
tags:
  - 'packages'
  - 'system-packages'
source: https://manual.mikrotik.com/docs/7.24/getting-started/installation-and-upgrade/packages
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 摘要 {#summary}

RouterOS 功能按软件包组织，软件包是扩展名为 `.npk` 的文件。大多数功能包含在 ***routeros*** 软件包中，部分功能由独立软件包提供。安装额外的 `.npk` 软件包可启用特定功能，例如 Containers 或 The Dude。软件包文件仅由 MikroTik 提供，第三方无法创建。你可以从我们的下载页面下载额外软件包，也可以直接从路由器添加它们。

## 最低要求 {#minimum-requirements}

RouterOS 最低只需系统软件包即可运行，但对于大多数设备，安装“routeros”捆绑软件包后即可获得标准运行和功能。

对于无线设备，根据所用硬件，可使用多个无线软件包：

- 从 RouterOS 7.13 开始，简单家用路由器的基本运行需要 ***routeros***（系统）软件包以及以下无线软件包之一：
  1. 802.11ax WiFi AP 需要无线驱动，由 ***wifi-qcom*** 软件包提供（对于早于 7.13 的 RouterOS 版本，该软件包称为 *wifiwave2* 软件包）。
  2. 上一代 WiFi AP 需要 ***wireless*** 软件包。

有关应使用哪个无线软件包的更多信息，请参阅 [Wireless manual](/docs/wireless)。

其他软件包为可选组件，家用路由器不需要。仅在确定其用途时安装它们。

## 安装软件包 {#installing-packages}

### 手动下载 {#manual-download}

要手动下载并安装额外软件包，请从 [MikroTik download](https://mikrotik.com/download) 页面下载所需的软件包，并根据 System/Resources 菜单中显示的设备架构选择 RouterOS 部分。解压压缩包，并使用任意便捷方法将所需软件包上传到路由器，然后重启路由器。

### 从路由器直接下载 {#download-directly-from-the-router}

可以使用 *System Packages* 部分从路由器直接下载并安装额外软件包。

1. 执行 ***Check For Updates*** 命令后，可用软件包将列在 *Packages* 列表中，但会显示为禁用状态。可用软件包列表来自 MikroTik 下载服务器。这些软件包可用，但尚未在路由器上（由标志 X (Disabled) 和 A (Available) 表示）。
2. 要下载额外软件包，请先选择该软件包，然后选择 ***Enable***。
3. 要让路由器下载该软件包，请选择 ***Apply Changes***，设备将请求重启。

| 软件包列表 | 使用“Check for updates”加载列表后 | 启用软件包 | 选择“Apply Changes” |
| :--- | :--- | :--- | :--- |
| [![](/img/56103c4552609cc3.png)](img/packages1.png) | [![](/img/3b65fadd6caf7a14.png)](img/packages2.png) | [![](/img/b3db506cdc92e62e.png)](img/packages3.png) | [![](/img/99456de9dc22c996.png)](img/packages4.png) |

### 安装验证 {#verification-of-install}

要确认软件包已成功安装，请在设备重启后检查“Log”部分。如果软件包安装成功，将看到相关消息。如果存在冲突或某些要求未满足，系统会说明原因，以便你采取进一步措施进行修复。

![](/img/bad3f8fc7b0b7e41.webp)Success in the log entries![](/img/233ed154de2c0342.webp)Failure in the log entries

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
| **calea** (*arm, arm64, mipsbe, mmips, tile, ppc, x86, CHR*) | 根据美国“Communications Assistance for Law Enforcement Act”用于特定用途的数据收集工具。 |
| **container** (*arm, arm64, x86, CHR*) | Linux 容器的 [Container](/docs/containers) 实现，允许用户在 RouterOS 中运行容器化环境。 |
| **dude** (*arm, arm64, mmips, tile, x86, CHR*) | 用于监控网络环境的 [Dude](/docs/management-tools/dude) 工具。 |
| **extra-nic** (*arm64*) | ARM64 CPU 架构网卡（NIC）支持，建议用于非 MikroTik 板卡上的 UEFI 安装。 |
| **gps** (*arm, arm64, mipsbe, mmips, tile, ppc, x86, CHR*) | [Global Positioning System](/docs/mobile-networking/gps) 设备支持。 |
| **iot** (*arm, arm64, mipsbe, mmips, tile, ppc, x86, CHR*) | 启用：<br/><ul><li><a href="/docs/internet-of-things/mqtt" rel="nofollow">MQTT</a></li><li><a href="/docs/internet-of-things/lora/general-properties" rel="nofollow">LoRa</a>（用于配备 LR8/9/2 miniPCIe 卡的设备）</li><li><a href="/docs/internet-of-things/bluetooth" rel="nofollow">Bluetooth</a>（用于配备 Bluetooth 芯片的设备）</li><li><a href="/docs/internet-of-things/gpio" rel="nofollow">GPIO</a>（用于配备 GPIO 引脚的设备）</li><li><a href="https://help.mikrotik.com/docs/pages/viewpage.action?pageId=61046813" rel="nofollow">Modbus</a>（用于配备 RS485 端口的设备）</li></ul> |
| **iot-bt-extra** (*arm, arm64*) | 用于 ARM 和 ARM64 设备的软件包，可启用 USB Bluetooth 适配器（必须支持 LE 4.0+）。<br/> *<strong>注意：</strong>并非所有适配器都经过测试。我们无法事先保证特定适配器可以正常工作。 |
| **lora** (*arm, arm64, mipsbe, mmips, tile, ppc, x86, CHR*) | 用于 [LoRa](/docs/internet-of-things/lora/general-properties) 支持的占位软件包。LoRa 软件包现在不再是必需的，仅为兼容性而保留。LoRa 功能已移至 iot 软件包。 |
| **lte** (*mipsbe*) | 仅 SXT LTE（RBSXTLTE3-7）需要该软件包，其中包含内置 LTE 接口的驱动程序。 |
| **rose-storage** (*arm, arm64, tile, x86, CHR*) | RouterOS 中的附加[企业数据中心功能](/docs/storage)，支持磁盘监控、改进的格式化和 RAID、rsync、iSCSI、NVMe over TCP、NFS 以及改进的 SMB。 |
| **switch-marvell** (*arm64*) | CRS8xx 系列交换机所需的驱动程序软件包。 |
| **tr069-client** (*arm, arm64, mipsbe, mmips, smips, tile, ppc, x86, CHR*) | [TR069 Client](/docs/management-tools/tr-069) 软件包。 |
| **ups** (*arm, arm64, mipsbe, mmips, tile, ppc, x86, CHR*) | [APC UPS 管理](/docs/system-information-and-utilities/ups)接口。 |
| **user-manager** (*arm, arm64, mipsbe, mmips, tile, ppc, x86, CHR*) | 用于控制 Hotspot 和其他服务用户的 [MikroTik User Manager](/docs/authentication-authorization-accounting/user-manager) 服务器。 |
| **wifi-mediatek** (*arm*) | 受支持的 MediaTek 无线硬件所需的 MediaTek WiFi 驱动程序。 |
| **wifi-qcom** (*arm, arm64*) | 802.11ax 接口所需的驱动程序软件包。在 7.13 中引入。[WiFi CAPsMAN](/docs/wireless/wifi#wifi-capsman) 支持随系统软件包提供。 |
| **wifi-qcom-ac** (*arm*) | 兼容 802.11ac 接口的可选 [WiFi](/docs/wireless/wifi) 驱动程序软件包。在 7.13 中引入。 |
| **wifi-qcom-be** (*arm64*) | WiFi-7 802.11be 硬件所需的驱动程序软件包。 |
| **wireless** (*arm, arm64, mipsbe, mmips, tile, ppc, x86, CHR*) | 用于管理 WiFi（最高 802.11ac）和 60GHz 无线接口的实用工具和驱动程序。该软件包在 7.12 及更早版本中随 RouterOS 一起提供。从 7.13 开始，它是一个独立软件包。<br/> <strong>wireless</strong> 软件包与 <strong>wifi-qcom</strong> 和 <strong>wifi-qcom-ac</strong> 软件包冲突——它们不能同时处于活动状态。 |
| **zerotier** (*arm, arm64*) | 启用 [ZeroTier](/docs/virtual-private-networks/zerotier) 功能。 |

## 自动安装 {#auto-install}

使用 FTP 或 SFTP 将软件包上传到路由器后，也可以自动安装软件包。软件包文件名必须使用扩展名 `*.auto.npk`。文件上传后，路由器将自动重启以安装软件包。这可用于脚本编写和自动化。

文件名中的 `.auto.npk` 扩展名是软件包自动安装的必需条件。

## 使用软件包 {#working-with-packages}

___

### 列出软件包 {#list-packages}

*zerotier* 软件包已禁用但已安装；*iot* 软件包在服务器上可用，但尚未下载到路由器并启用；*dude* 软件包已计划卸载。

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

### Downgrade

```ros
/system/package/downgrade; /system/reboot;
Router will be rebooted. Continue? [y/N]: 
```
