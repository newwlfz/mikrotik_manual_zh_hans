---
sidebar_key: "wireless/w60g/fail-over-ptp-cli-example"
sidebar_position: 3
title: "故障转移 PtP CLI 示例"
sidebar_label: "故障转移 PtP CLI 示例"
description: "本页提供了一个分步 CLI 示例，用于通过 bonding 在 60Ghz 和 5Ghz 无线链路之间配置自动故障转移，包括为桥接模式和站模式配置网桥以及 W60G 接口。"
tags:
  - 'bonding'
  - 'bridging'
  - 'wireless'
source: https://manual.mikrotik.com/docs/7.24/wireless/w60g/fail-over-ptp-cli-example
captured_at: '2026-11-04T11:35:41+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### 概述 {#summary}

本示例展示如何在 CLI 中配置一条自动故障转移（bonding）的 5Ghz 链路，并与 60Ghz 设备配合使用。  
当 60Ghz 无线之间的连接丢失时，它将自动使用 bonding 接口。  
本示例在空配置状态下使用 [[WinBox](https://mikrotik.com/download)] 实用程序完成。

### 逐步连接到设备 {#connect-to-the-device-step-by-step}

- 配置重置后，只能使用 mac-telnet。
   通过连接到设备的 MAC 地址来连接设备，或使用 WinBox New terminal 执行以下命令来查找 W60G 设备的 MAC 地址：

```ros
/ip/neighbor/print
```

- 要连接到 W60G 设备，请执行以下命令。

```ros
/tool/mac-telnet <MAC-ADDRESS>
```

- 输入用户名和密码。默认情况下，用户名是 **admin**，密码为空或印在设备标签上：

```ros
[admin@KD_GW] > /tool/mac-telnet C4:AD:34:84:EE:5D
Login: admin
Password:
Trying C4:AD:34:84:EE:5D...
Connected to C4:AD:34:84:EE:5D
```

### 配置 bridge {#configure-bridge}

- 执行以下命令添加新的 bridge 并为其分配 bridge 成员：

```ros
/interface/bridge/add name=bridge
```

要检查 bridge 是否已创建，请执行命令：

```ros
[admin@MikroTik] > /interface/bridge/print
Flags: X - disabled, R - running
 0 R name="bridge" mtu=auto actual-mtu=1500 l2mtu=65535 arp=enabled arp-timeout=auto mac-address=1A:7F:BB:41:B0:94 protocol-mode=rstp  fast-forward=yes igmp-snooping=no auto-mac=yes ageing-time=5m priority=0x8000 max-message-age=20s forward-delay=15s transmit-hold-count=6  vlan-filtering=no dhcp-snooping=no
```

### 设置 60GHz 无线连接 {#set-up-60ghz-wireless-connection}

前面说明的所有步骤与 Bridge 和 Station 设备相同。配置无线接口时需要使用不同的模式。  

#### 对于网桥设备 {#for-bridge-device}

- 选择 SSID、密码、频率，并选择 bridge 模式选项，使其在设置中充当 **网桥**。请参见示例。
- 设置所需参数后，启用 W60G 接口。

```ros
[admin@MikroTik] > /interface/w60g/set wlan60-1 mode=bridge frequency=auto ssid=MySSID password=choosepassword isolate-stations=yes
[admin@MikroTik] > /interface/w60g/print
Flags: X - disabled, R - running
0 X name="wlan60-1" mtu=1500 l2mtu=1600 mac-address=C4:AD:34:84:EE:5E arp=enabled arp-timeout=auto region=no-region-set mode=bridge ssid="MySSID"  frequency=auto default-scan-list=58320,60480,62640,64800 password="choosepassword" tx-sector=auto put-stations-in-bridge=bridge isolate-stations=yes
[admin@MikroTik] > /interface/w60g/enable wlan60-1
```

#### 对于站点设备 {#for-station-device}

- 选择与网桥设备相同的 SSID、密码和频率，并选择 station-bridge 模式选项，使其在设置中充当 **站点**，请参见示例。
- 设置所需参数后，启用 W60G 接口。

```ros
[admin@MikroTik] > /interface/w60g/set wlan60-1 mode=station-bridge frequency=auto ssid=MySSID password=choosepassword
[admin@MikroTik] > /interface/w60g/print
Flags: X - disabled, R - running
0 X name="wlan60-1" mtu=1500 l2mtu=1600 mac-address=C4:AD:34:84:EE:5E arp=enabled arp-timeout=auto region=no-region-set mode=station-bridge ssid="MySSID" frequency=auto default-scan-list=58320,60480,62640,64800password="choosepassword" tx-sector=auto put-stations-in-bridge=bridge isolate-stations=yes
[admin@MikroTik] > /interface/w60g/enable wlan60-1 
```

### 设置 5GHz 无线连接 {#set-up-5ghz-wireless-connection}

#### 对于网桥设备 {#for-bridge-device-1}

- 选择 SSID、密码、频率，并选择 bridge 模式选项，使其在设置中充当 **网桥**，请参见示例。
- 设置所需参数后，启用 5GHz 接口。

```ros
[admin@MikroTik] > /interface/wireless/security-profiles/set [ find default=yes ] supplicant-identity=MikroTik authentication-types=wpa2-psk mode=dynamic-keys wpa2-pre-shared-key=choosepassword
[admin@MikroTik] > /interface/wireless/set wlan1 frequency=auto scan-list=default installation=outdoor mode=bridge ssid=MikroTik1 channel-width=20/40/80mhz-Ceee wireless-protocol=any security-profile=default band=5ghz-a/n/ac
[admin@MikroTik] > /interface/wireless/enable wlan1 
```

#### 对于站点设备 {#for-station-device-1}

- 选择与网桥设备相同的 SSID、密码和频率，并选择 station-bridge 模式选项，使其在设置中充当 **站点**。请参见示例。
- 设置所需参数后，启用 W60G 接口。

```ros
[admin@MikroTik] > /interface/wireless/security-profiles/set [ find default=yes ] supplicant-identity=MikroTik authentication-types=wpa2-psk mode=dynamic-keys wpa2-pre-shared-key=choosepassword
[admin@MikroTik] > /interface/wireless/set wlan1 frequency=auto scan-list=default installation=outdoor mode=station-bridge ssid=MikroTik1 channel-width=20/40/80mhz-Ceee wireless-protocol=any security-profile=default band=5ghz-a/n/ac
[admin@MikroTik] > /interface/wireless/enable wlan1 
```

### 配置网桥和 bonding {#configure-bridge-and-bonding}

- 配置 bonding 并分配从接口。在此设置中，它被选为内置的 wlan1 接口，但在其他类型的设置中也可以是 ether 接口。

   对于 *网桥* 设备，请将 **bonding** 设置为：

```ros
[admin@MikroTik] > /interface/bonding/add comment=bondingbackup mode=active-backup name=bond1 primary=wlan60-station-1 slaves=wlan60-station-1,wlan1
```

&emsp;&emsp; 对于 *station-bridge* 设备，请将 **bonding** 设置为：

```ros
[admin@MikroTik] > /interface/bonding/add comment=defconf mode=active-backup name=bond1 primary=wlan60-1 slaves=wlan60-1,wlan1
```

- 将接口成员（ether1 和 bond1）添加到新建的 bridge。

```ros
[admin@MikroTik] > /interface/bridge/port/add interface=ether1 bridge=bridge
[admin@MikroTik] > /interface/bridge/port/add interface=bond1  bridge=bridge
[admin@MikroTik] > /interface/bridge/port/print
Flags: X - disabled, I - inactive, D - dynamic, H - hw-offload
#     INTERFACE                              BRIDGE                              HW   PVID PRIORITY  PATH-COST INTERNAL-PATH-COST    HORIZON
0     ether1                                 bridge                             yes     1     0x80         10                 10       none
1     bond1                                  bridge                             yes     1     0x80         10                 10       none |
```

### 其他配置 {#additional-configuration}

完成前面说明的所有步骤后，链路应已建立。建议在两台设备上设置管理员密码。

### 故障排除 {#troubleshooting}

通过执行以下命令检查序列号和型号名称等设备设置，确保连接到了正确的设备：

```ros
[admin@MikroTik] > /system/routerboard/print
```

如果网桥设置中的 wlan60-1 接口处于非活动状态，并且已正确完成配置以在设备上启用该接口，请执行以下命令：

```ros
[admin@MikroTik] > /interface/w60g/enable wlan60-1 
```
