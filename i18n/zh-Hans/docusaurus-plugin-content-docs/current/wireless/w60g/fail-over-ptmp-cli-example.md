---
sidebar_key: "wireless/w60g/fail-over-ptmp-cli-example"
sidebar_position: 2
title: "故障切换 PtMP CLI 示例"
sidebar_label: "故障切换 PtMP CLI 示例"
description: "本页面提供了一份分步 CLI 指南，用于使用 MikroTik RouterOS 配置 60Ghz 与 5Ghz 无线链路之间的自动故障切换，包括网桥设置、接口绑定以及 W60G 设备连接说明。"
tags:
  - 'bridging'
  - 'bonding'
source: https://manual.mikrotik.com/docs/wireless/w60g/fail-over-ptmp-cli-example
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### 概述 {#summary}

本示例展示如何在 CLI 中配置自动故障转移（bonding）5GHz 链路，并与 60GHz 设备配合使用。  
当 60GHz 无线连接中断时，它会自动使用 bonding 接口。  
本示例在空配置状态下使用 [[WinBox](https://mikrotik.com/download)] 工具完成

### 逐步连接到设备 {#connect-to-the-device-step-by-step}

- 配置重置后，只能使用 mac-telnet。
   通过连接到设备的 MAC 地址来连接设备，或使用 WinBox New terminal 执行以下命令来查找 W60G 设备的 MAC 地址：

```ros
/ip/neighbor/print
```

- 要连接到 W60G 设备，请执行命令：

```ros
/tool/mac-telnet/mac-address
```

- 输入用户名和密码。默认用户名为 **admin**，密码为空或印在设备标签上。

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
admin@MikroTik] > /interface/bridge/print
Flags: X - disabled, R - running
 0 R name="bridge" mtu=auto actual-mtu=1500 l2mtu=65535 arp=enabled arp-timeout=auto mac-address=1A:7F:BB:41:B0:94 protocol-mode=rstp  fast-forward=yes igmp-snooping=no auto-mac=yes ageing-time=5m priority=0x8000 max-message-age=20s forward-delay=15s transmit-hold-count=6  vlan-filtering=no dhcp-snooping=no
```

### 设置 60GHz 无线连接 {#set-up-60ghz-wireless-connection}

前面说明的所有步骤与 Bridge 和 Station 设备相同。配置无线接口时需要使用不同的模式。  
  
#### 对于 ap-bridge 设备 {#for-ap-bridge-device}

- 选择 SSID、Password、frequency，并选择将在此设置中充当 **ap-bridge** 的 bridge 模式选项，请参见示例。
- 设置所需参数后启用 W60G 接口。

```ros
[admin@MikroTik] > /interface/w60g/set wlan60-1 mode=ap-bridge frequency=auto ssid=MySSID password=choosepassword isolate-stations=no
[admin@MikroTik] > /interface/w60g/print
Flags: X - disabled, R - running
0 X name="wlan60-1" mtu=1500 l2mtu=1600 mac-address=C4:AD:34:84:EE:5E arp=enabled arp-timeout=auto region=no-region-set mode=ap-bridge ssid="MySSID"  frequency=auto default-scan-list=58320,60480,62640,64800 password="choosepassword" tx-sector=auto put-stations-in-bridge=none isolate-stations=no
[admin@MikroTik] > /interface/w60g/enable wlan60-1 
```

#### 对于 station 设备 {#for-station-devices}

- 选择与 bridge 设备相同的 SSID、Password 和 frequency，并选择将在此设置中充当 **station** 的 station-bridge 模式选项，请参见示例。
- 最多可将 8 台 station 设备连接到单个 AP 以充当故障转移。
- 设置所需参数后启用 W60G 接口。

```ros
[admin@MikroTik] > /interface/w60g/set wlan60-1 mode=station-bridge frequency=auto ssid=MySSID password=choosepassword isolate-stations=no
[admin@MikroTik] > /interface/w60g/print
Flags: X - disabled, R - running
0 X name="wlan60-1" mtu=1500 l2mtu=1600 mac-address=C4:AD:34:84:EE:5E arp=enabled arp-timeout=auto region=no-region-set mode=station-bridge ssid="MySSID" frequency=auto default-scan-list=58320,60480,62640,64800password="choosepassword" tx-sector=auto put-stations-in-bridge=bridge isolate-stations=no
[admin@MikroTik] > /interface/w60g/enable wlan60-1
```

### 设置 5GHz 无线连接 {#set-up-5ghz-wireless-connection}

#### 对于 ap-bridge 设备 {#for-ap-bridge-device-1}

- 选择 SSID、Password、frequency，并选择将在此设置中充当 **bridge** 的 bridge 模式选项，请参见示例。
- 设置所需参数后启用 5GHz 接口。

```ros
[admin@MikroTik] > /interface/wireless/security-profiles/set [ find default=yes ] supplicant-identity=MikroTik authentication-types=wpa2-psk mode=dynamic-keys wpa2-pre-shared-key=choosepassword
[admin@MikroTik] > /interface/wireless/set wlan1 frequency=auto scan-list=default installation=outdoor mode=ap-bridge ssid=MikroTik1 channel-width=20/40/80mhz-Ceee wireless-protocol=any security-profile=default band=5ghz-a/n/ac
[admin@MikroTik] > /interface/wireless/enable wlan1 
```

#### 对于 station 设备 {#for-station-devices-1}

- 选择与 bridge 设备相同的 SSID、Password、frequency，并选择将在此设置中充当 **station** 的 station-bridge 模式选项。请参见示例。
- 最多可将 8 台 station 设备连接到单个 AP 以充当故障转移。
- 设置所需参数后启用 W60G 接口。

```ros
[admin@MikroTik] > /interface/wireless/security-profiles/set [ find default=yes ] supplicant-identity=MikroTik authentication-types=wpa2-psk mode=dynamic-keys wpa2-pre-shared-key=choosepassword
[admin@MikroTik] > /interface/wireless/set wlan1 frequency=auto scan-list=default installation=outdoor mode=station-bridge ssid=MikroTik1 channel-width=20/40/80mhz-Ceee wireless-protocol=any security-profile=default band=5ghz-a/n/ac
[admin@MikroTik] > /interface/wireless/enable wlan1
```

### 为 Access Point 配置 bridge {#configure-bridge-for-access-point}

- 为 AP 配置 bridge，以确保 5GHz 作为故障转移工作。需要将 **wlan1**、**ether1** 以及所有 60GHz **station 接口** 加入 bridge。
   *示例中仅显示 2 台 station 设备，但最多可添加 8 台设备。*  

   对于 ap-bridge 设备，请按如下方式设置 **configuration**：

```ros
[admin@MikroTik] > /interface/bridge/port/
add bridge=bridge hw=no interface=ether1
add bridge=bridge interface=wlan1
add bridge=bridge interface=wlan60-station-1
add bridge=bridge interface=wlan60-station-2
[admin@MikroTik] > interface/bridge/port/pr
# INTERFACE         BRIDGE  HW  PVID  PRIORITY  PATH-COST  INTERNAL-PATH-COST  HORIZON
0 ether1            bridge      no     1  0x80             10                  10  none
1 wlan1             bridge             1  0x80             10                  10  none
2 wlan60-station-1  bridge             1  0x80             10                  10  none
3 wlan60-station-2  bridge             1  0x80             10                  10  none 
```

### 为 station 设备配置 bridge 和 bonding {#configure-bridge-and-bonding-for-station-devices}

- 配置 bonding 并分配从接口。在此设置中，选择内置 wlan1 接口作为从接口，但在其他类型的设置中也可以使用 ether 接口。

   对于 station-bridge 设备，请按如下方式设置 **bonding**：

```ros
[admin@MikroTik] > /interface/bonding/add mode=active-backup name=bond1 primary=wlan60-1 slaves=wlan60-1,wlan1
```

- 将接口成员（ether1 和 bond1）添加到新建的 bridge。

```ros
[admin@MikroTik] > /interface/bridge/port/add interface=ether1 bridge=bridge
[admin@MikroTik] > /interface/bridge/port/add interface=bond1  bridge=bridge
[admin@MikroTik] > /interface/bridge/port/print
Flags: X - disabled, I - inactive, D - dynamic, H - hw-offload
#     INTERFACE                              BRIDGE                              HW   PVID PRIORITY  PATH-COST INTERNAL-PATH-COST    HORIZON
0     ether1                                 bridge                             yes     1     0x80         10                 10       none
1     bond1                                  bridge                             yes     1     0x80         10                 10       none
```

### 其他配置 {#additional-configuration}

完成前面说明的所有步骤后，链路应已建立。建议在两台设备上设置管理员密码。

### 故障排除 {#troubleshooting}

通过执行以下命令检查序列号和型号名称等设备设置，确保连接到了正确的设备：

```ros
[admin@MikroTik] > /system/routerboard/print
```

如果 bridge 设置中的 wlan60-1 接口处于 inactive 状态，并且已正确完成在设备上启用该接口的配置，请执行命令：

```ros
[admin@MikroTik] > /interface/w60g/enable wlan60-1
```
