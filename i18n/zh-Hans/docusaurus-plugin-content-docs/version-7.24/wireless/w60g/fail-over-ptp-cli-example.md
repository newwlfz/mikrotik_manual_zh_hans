---
title: "PtP 故障转移 CLI 示例"
description: "本页提供分步 CLI 示例，介绍如何使用 bonding 配置 60Ghz 和 5Ghz 无线链路之间的自动故障切换，包括网桥设置以及 bridge 和 station 模式下的 W60G 接口配置。"
tags:
  - 'bonding'
  - 'bridging'
  - 'wireless'
source: https://manual.mikrotik.com/docs/7.24/wireless/w60g/fail-over-ptp-cli-example
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 概述 {#summary}

此示例说明如何在 CLI 中配置自动故障转移（bonding）5Ghz 链路，并与 60Ghz 设备结合使用。  
当 60Ghz 无线连接丢失时，将自动使用 bonded 接口。  
本示例从空配置状态开始，使用 [[WinBox](https://mikrotik.com/download)] 工具完成。

### 逐步连接设备 {#connect-to-the-device-step-by-step}

- 配置重置后，只能使用 mac-telnet。
   通过设备的 MAC 地址连接到设备，或使用 WinBox New terminal，通过执行以下命令查找 W60G 设备的 MAC 地址：

```ros
/ip/neighbor/print
```

- 要连接到 W60G 设备，请执行以下命令。

```ros
/tool/mac-telnet <MAC-ADDRESS>
```

- 输入用户名和密码。默认情况下，用户名为 **admin**，密码为空或印在设备标签上：

```ros
[admin@KD_GW] > /tool/mac-telnet C4:AD:34:84:EE:5D
Login: admin
Password:
Trying C4:AD:34:84:EE:5D...
Connected to C4:AD:34:84:EE:5D
```

### 配置网桥 {#configure-bridge}

- 执行以下命令，添加新网桥并为其分配网桥成员：

```ros
/interface/bridge/add name=bridge
```

要检查网桥是否已创建，请执行以下命令：

```ros
[admin@MikroTik] > /interface/bridge/print
Flags: X - disabled, R - running
 0 R name="bridge" mtu=auto actual-mtu=1500 l2mtu=65535 arp=enabled arp-timeout=auto mac-address=1A:7F:BB:41:B0:94 protocol-mode=rstp  fast-forward=yes igmp-snooping=no auto-mac=yes ageing-time=5m priority=0x8000 max-message-age=20s forward-delay=15s transmit-hold-count=6  vlan-filtering=no dhcp-snooping=no
```

### 设置 60Ghz 无线连接 {#set-up-60ghz-wireless-connection}

前面介绍的所有步骤与 Bridge 和 Station 设备相同。配置无线接口时，需要使用不同的模式。  

#### 对于 bridge 设备 {#for-bridge-device}

- 选择 SSID、密码和频率，并选择将作为该设置中 **bridge** 的 bridge 模式选项。请参阅示例。
- 设置所需参数后，启用 W60G 接口。

```ros
[admin@MikroTik] > /interface/w60g/set wlan60-1 mode=bridge frequency=auto ssid=MySSID password=choosepassword isolate-stations=yes
[admin@MikroTik] > /interface/w60g/print
Flags: X - disabled, R - running
0 X name="wlan60-1" mtu=1500 l2mtu=1600 mac-address=C4:AD:34:84:EE:5E arp=enabled arp-timeout=auto region=no-region-set mode=bridge ssid="MySSID"  frequency=auto default-scan-list=58320,60480,62640,64800 password="choosepassword" tx-sector=auto put-stations-in-bridge=bridge isolate-stations=yes
[admin@MikroTik] > /interface/w60g/enable wlan60-1
```

#### 对于 station 设备 {#for-station-device}

- 选择与 bridge 设备相同的 SSID、密码和频率，并选择将作为该设置中 **station** 的 station-bridge 模式选项，请参阅示例。
- 设置所需参数后，启用 W60G 接口。

```ros
[admin@MikroTik] > /interface/w60g/set wlan60-1 mode=station-bridge frequency=auto ssid=MySSID password=choosepassword
[admin@MikroTik] > /interface/w60g/print
Flags: X - disabled, R - running
0 X name="wlan60-1" mtu=1500 l2mtu=1600 mac-address=C4:AD:34:84:EE:5E arp=enabled arp-timeout=auto region=no-region-set mode=station-bridge ssid="MySSID" frequency=auto default-scan-list=58320,60480,62640,64800password="choosepassword" tx-sector=auto put-stations-in-bridge=bridge isolate-stations=yes
[admin@MikroTik] > /interface/w60g/enable wlan60-1 
```

### 设置 5Ghz 无线连接 {#set-up-5ghz-wireless-connection}

#### 对于 bridge 设备 {#for-bridge-device-1}

- 选择 SSID、Password、frequency，并选择将作为 **bridge** 的 bridge mode 选项，请参见示例。
- 设置所需参数后，启用 5GHz 接口。

```ros
[admin@MikroTik] > /interface/wireless/security-profiles/set [ find default=yes ] supplicant-identity=MikroTik authentication-types=wpa2-psk mode=dynamic-keys wpa2-pre-shared-key=choosepassword
[admin@MikroTik] > /interface/wireless/set wlan1 frequency=auto scan-list=default installation=outdoor mode=bridge ssid=MikroTik1 channel-width=20/40/80mhz-Ceee wireless-protocol=any security-profile=default band=5ghz-a/n/ac
[admin@MikroTik] > /interface/wireless/enable wlan1 
```

#### 对于 station 设备 {#for-station-device-1}

- 选择与 bridge 设备相同的 SSID、Password 和 frequency，并选择将作为 **station** 的 station-bridge mode 选项。请参见示例。
- 设置所需参数后，启用 W60G 接口。

```ros
[admin@MikroTik] > /interface/wireless/security-profiles/set [ find default=yes ] supplicant-identity=MikroTik authentication-types=wpa2-psk mode=dynamic-keys wpa2-pre-shared-key=choosepassword
[admin@MikroTik] > /interface/wireless/set wlan1 frequency=auto scan-list=default installation=outdoor mode=station-bridge ssid=MikroTik1 channel-width=20/40/80mhz-Ceee wireless-protocol=any security-profile=default band=5ghz-a/n/ac
[admin@MikroTik] > /interface/wireless/enable wlan1 
```

### 配置网桥和 bonding {#configure-bridge-and-bonding}

- 配置 bonding 并指定 slave 接口。在本设置中，选择的是内置 wlan1 接口，但在其他类型的设置中也可以是 ether 接口。

   对于 *bridge* 设备，请将 **bonding** 设置为：

```ros
[admin@MikroTik] > /interface/bonding/add comment=bondingbackup mode=active-backup name=bond1 primary=wlan60-station-1 slaves=wlan60-station-1,wlan1
```

&emsp;&emsp; 对于 *station-bridge* 设备，请将 **bonding** 设置为：

```ros
[admin@MikroTik] > /interface/bonding/add comment=defconf mode=active-backup name=bond1 primary=wlan60-1 slaves=wlan60-1,wlan1
```

- 将接口成员（ether1 和 bond1）添加到新建的网桥。

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

完成上述所有步骤后，应建立链路。建议在两台设备上设置管理员密码。

### 故障排除 {#troubleshooting}

通过执行命令检查设备设置（如序列号和型号名称），确保连接到正确的设备：

```ros
[admin@MikroTik] > /system/routerboard/print
```

如果网桥设置中的 `bridge wlan60-1` 接口处于非活动状态，且配置正确，要在设备上启用该接口，请执行命令：

```ros
[admin@MikroTik] > /interface/w60g/enable wlan60-1 
```
