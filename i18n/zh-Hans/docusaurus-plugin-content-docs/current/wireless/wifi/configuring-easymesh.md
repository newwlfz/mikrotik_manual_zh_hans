---
sidebar_key: "wireless/wifi/configuring-easymesh"
sidebar_position: 2
title: "配置 EasyMesh"
sidebar_label: "配置 EasyMesh"
description: "在 RouterOS 中配置 Wi-Fi EasyMesh 网络：设置控制器和代理，创建前传和回传配置，通过 WPS 添加代理，并监控 mesh。"
tags:
  - 'wifi'
  - 'easymesh'
  - 'mesh'
  - 'controller'
  - 'agent'
source: https://manual.mikrotik.com/docs/wireless/wifi/configuring-easymesh
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**Package:** `wifi-qcom`, `wifi-qcom-ac`

:::warning

- EasyMesh 可在 CLI 中使用（尚不支持 GUI）。
- 目前，它仅在 `wifi-qcom` 和 `wifi-qcom-ac` 上工作。
- 通过 Wi-Fi 接入代理节点时，请使用 `wpa2-psk` 或 `wpa2-psk,wpa3-psk` 配置前传。WPS 入网使用前传配置，而代理节点的回传凭据通过回传链路传递。WPS 不支持仅 WPA3（SAE）。
- 尚未实现 DPP（Wi-Fi Easy Connect）入网。要接入代理节点，请使用 WPS 按钮或通过以太网连接代理节点。
:::

EasyMesh 是 Wi-Fi Alliance 的一项标准，用于将来自不同供应商的 Wi-Fi AP 和无线扩展器作为同一个协调网络进行管理。控制器将 fronthaul（客户端 SSID）和 backhaul（agent SSID）设置分发给受管 AP（agent），这些 AP 通过二层将其 fronthaul 接口桥接到无线或以太网 backhaul 接口，在转发客户端流量时保留客户端 MAC 地址。最终结果是在单个控制器下形成一个二层网络。有关所有设置，请参阅 [EasyMesh CLI 参考](../../cli-reference/interface/wifi/easymesh.md)。

[CAPsMAN](./capsman.md) 为 MikroTik 设备提供类似的集中管理，但它主要面向通过以太网连接到网络的接入点。它不提供标准化的无线 backhaul 和 WPS 引导。EasyMesh 认证允许控制器管理来自不同供应商的认证 agent。互操作性仍取决于设备，因此请在部署前测试控制器与 agent 的组合。

## 拓扑 {#topology}

一个 EasyMesh 网络有一个控制器和一个或多个 agent。控制器和 agent 必须位于同一个二层网络中。Agent 通过有线以太网连接或无线 backhaul 链路连接到控制器。Backhaul（有线和无线）承载 EasyMesh 管理流量以及每个 agent 的客户端流量。

设备承担三种 EasyMesh 角色之一：

- `controller` - 管理 EasyMesh 网络。它提供 fronthaul 和 backhaul 配置并协调各个 agent。在仅承担控制器职责的设备上使用它。
- `agent` - 加入 EasyMesh 网络并从控制器接收其配置。它广播已配置的 fronthaul 网络，并通过无线 backhaul 链路或有线以太网连接连接到控制器。在额外的接入点上使用它。
- `controller-and-agent` - 在同一台设备上同时承担两种角色。单台 Wi-Fi 设备既可以管理 EasyMesh 网络，也可以作为 agent 为客户端提供服务。在带 Wi-Fi 射频的主路由器或接入点上使用它。

只有控制器管理网络。Agent 接收并应用配置（它不管理其他 agent，但可以通过 backhaul 中继控制器流量）。

在大多数设置中，主路由器使用 `controller-and-agent`，而附加接入点使用 `agent`。

这些设备上的射频可以承担以下角色：

- Fronthaul AP - 广播客户端网络。客户端设备连接到这些 BSS。
- Backhaul AP - 广播回传网络。Agent 使用它连接到控制器。客户端设备不使用此网络。
- Backhaul station - 将 agent 连接到控制器的 backhaul AP。它仅用于无线回传。

同一射频可同时提供 fronthaul 和 backhaul BSS。Fronthaul 接口专用于客户端，并桥接到 backhaul。

控制器和 agent 使用 IEEE 1905.1 标准（EtherType `0x893A`）交换 EasyMesh 控制消息。它通过 Layer 2 回传承载 Wi-Fi Alliance Multi-AP Control Message Data Units (CMDUs) 和 TLV。WPS 入网使用 802.11/EAP-WSC。

## 控制器配置 {#controller-configuration}

### 设置射频管理器 {#set-the-radio-manager}

在 EasyMesh 应控制的每个射频上设置 EasyMesh 管理器：

```ros
/interface/wifi
set [find default-name=wifi1] configuration.manager=easymesh
set [find default-name=wifi2] configuration.manager=easymesh
```

调整接口名称以匹配你的设备。

### 创建 Wi-Fi 配置 {#create-the-wi-fi-configurations}

为客户端创建前传配置，并为无线代理创建回传配置：

```ros
/interface/wifi/configuration
add name=em_fh ssid=em_fh security.authentication-types=wpa2-psk security.passphrase=fronthaul-password
add name=em_bh ssid=em_bh security.authentication-types=wpa2-psk security.passphrase=backhaul-password
```

- `em_fh` 是客户端网络，由代理为客户端设备广播。
- `em_bh` 是回传网络，由代理广播，供其他代理连接。请使用与客户端网络不同的 SSID 和密码。

### 启用控制器 {#enable-the-controller}

```ros
/interface/wifi/easymesh
set enabled=yes role=controller-and-agent bridge=bridge bhaul-configuration=em_bh fhaul-configurations=em_fh dpp-onboarding=no
```

- `role=controller-and-agent` 使设备管理网络并提供 Wi-Fi。如果设备仅管理网络，请使用 `role=controller`。
- `bridge=bridge` 是连接控制器与代理的网桥。请使用现有的 LAN 网桥。
- `bhaul-configuration=em_bh` 选择回传配置。
- `fhaul-configurations=em_fh` 选择客户端网络。添加更多配置名称可广播更多网络。

回传 SSID 和安全设置来自 `em_bh` 配置。无线代理在加入过程中接收这些凭据。

## 代理配置 {#agent-configuration}

### 准备接入点 {#prepare-the-access-point}

将代理配置为桥接接入点。在每个射频上设置 EasyMesh 管理器：

```ros
/interface/wifi
set [find default-name=wifi1] configuration.manager=easymesh
set [find default-name=wifi2] configuration.manager=easymesh
```

按[配置独立接入点](./configuring-standalone-access-point.md)所述配置网桥和管理 IP 地址。网桥必须包含用于有线回程的以太网端口。

### 启用代理 {#enable-the-agent}

```ros
/interface/wifi/easymesh
set enabled=yes role=agent bridge=bridge dpp-onboarding=no
```

EasyMesh 会将其 Wi-Fi 接口添加到 `bridge` 设置中指定的网桥。不要在代理上设置 `bhaul-configuration` 或 `fhaul-configurations`。控制器会在入网过程中提供它们。

## 入网引导 {#onboarding}

### 有线回程 {#wired-backhaul}

将代理的以太网端口连接到控制器的 LAN。不需要 WPS。当代理位于同一二层网络时，控制器会发现它并自动应用配置。

### 无线回程 {#wireless-backhaul}

当代理没有到控制器的以太网连接时，会使用无线回传。控制器通过其 `bhaul-configuration` 提供回传网络。回传 AP 会广播该网络，代理的回传工作站使用在入网期间收到的凭据连接到它。

使用 WPS 按钮让代理入网：

```ros
/interface/wifi/easymesh/wps-push-button
```

先在控制器上运行该命令，然后在代理上运行。代理会连接到控制器的回传网络，并接收回传和前传配置。

入网后，`agent-state` 将变为 `wifi-backhaul-connected`：

```ros
[admin@hAP] > /interface/wifi/easymesh/print
                     enabled: yes
                        role: agent
                      bridge: bridge
                  bhaul-ssid: em_bh
            bhaul-passphrase: backhaul-password
  bhaul-authentication-types: wpa2-psk
            bhaul-encryption: ccmp
                              gcmp
              dpp-onboarding: no
                 agent-state: wifi-backhaul-connected
```

:::tip
在入网过程中，使 Agent 靠近 Controller。在回传链路建立后，将其移至最终位置。
:::

## 验证设置 {#verify-the-setup}

运行以下命令以查看 EasyMesh 状态：

```ros
/interface/wifi/easymesh/print
/interface/wifi/easymesh/topology/print
/interface/wifi/easymesh/bss/print
/interface/wifi/easymesh/sta/print
```

- `print` 显示全局 EasyMesh 设置、代理状态，以及包含控制器、代理、射频和 BSSes 的拓扑树。
- `topology/print` 按已连接代理的 AL MAC 地址列出它们。
- `bss/print` 列出所有 BSSes 及其前传/回传角色、信道、利用率和客户端数量。
- `sta/print` 列出已连接的客户端和回传工作站。

:::info
AL MAC 是 IEEE 1905.1 抽象层 MAC 地址。EasyMesh 将其用作控制消息和拓扑中的设备标识，独立于承载流量的接口。
:::

`print` 输出显示全局设置、代理状态和拓扑树：

```ros
[admin@cAP] > /interface/wifi/easymesh/print
               enabled: yes
                  role: controller-and-agent
                bridge: bridge
   bhaul-configuration: em_bh
  fhaul-configurations: em_fh
        dpp-onboarding: no
           agent-state: wired-backhaul-connected
               network: CONTROLLER: AL-MAC: 48:XX:XX:XX:XX:74
                            ETHERNET: mac: 48:XX:XX:XX:XX:74
                                AGENT: AL-MAC: D0:XX:XX:XX:XX:D3 via mac: D0:XX:XX:XX:XX:D3
                                    ETHERNET: mac: D0:XX:XX:XX:XX:D3
                                    ETHERNET: mac: D0:XX:XX:XX:XX:D4
                                    ETHERNET: mac: D0:XX:XX:XX:XX:D5
                                    ETHERNET: mac: D0:XX:XX:XX:XX:D6
                                    ETHERNET: mac: D0:XX:XX:XX:XX:D7
                                    RADIO: mac: D0:XX:XX:XX:XX:D9
                                        bVAP[0]: bssid: D0:XX:XX:XX:XX:D9, ssid: em_bh, bw: 160 MHz, ccfi1: 50
                                        fVAP[1]: bssid: D2:XX:XX:XX:XX:DA, ssid: em_fh, bw: 160 MHz, ccfi1: 50
                                    RADIO: mac: D0:XX:XX:XX:XX:D8
                                        bVAP[0]: bssid: D2:XX:XX:XX:XX:D8, ssid: em_bh, bw: 40 MHz, ccfi1: 11
                                        fVAP[1]: bssid: D2:XX:XX:XX:XX:D9, ssid: em_fh, bw: 40 MHz, ccfi1: 11
                            ETHERNET: mac: 48:XX:XX:XX:XX:75
                            RADIO: mac: 48:XX:XX:XX:XX:77
                                bVAP[0]: bssid: 48:XX:XX:XX:XX:77, ssid: em_bh, bw: 40 MHz, ccfi1: 5
                                fVAP[1]: bssid: 4A:XX:XX:XX:XX:77, ssid: em_fh, bw: 40 MHz, ccfi1: 5
                            RADIO: mac: 48:XX:XX:XX:XX:76
                                bVAP[0]: bssid: 48:XX:XX:XX:XX:76, ssid: em_bh, bw: 80 MHz, ccfi1: 58
                                fVAP[1]: bssid: 4A:XX:XX:XX:XX:76, ssid: em_fh, bw: 80 MHz, ccfi1: 58
```

拓扑表列出已连接的代理：

```ros
[admin@cAP] > /interface/wifi/easymesh/topology/print
Columns: ALMAC
#  ALMAC
0  D0:XX:XX:XX:XX:D3
```

BSS 表列出控制器和代理上的前传和回传 BSS：

```ros
[admin@cAP] > /interface/wifi/easymesh/bss/print
Flags: A - ACTIVE
Columns: ALMAC, RADIO-MAC, BSSID, SSID, FRONTHAUL, BACKHAUL, UTILIZATION, BRANCH-UTILIZATION, STA-COUNT, OPCLASS, PRIMARY-CHAN, IEEE-CHAN
#   ALMAC              RADIO-MAC          BSSID              SSID   FRONTHAUL  BACKHAUL  UTI  BRA  S  OPCLASS  PRI  IEEE-CHAN
0 A 48:XX:XX:XX:XX:74  48:XX:XX:XX:XX:76  48:XX:XX:XX:XX:76  em_bh  no         yes       0%   0%   0  128      136  138
1 A 48:XX:XX:XX:XX:74  48:XX:XX:XX:XX:77  48:XX:XX:XX:XX:77  em_bh  no         yes       33%  33%  1  84       5    5
2 A 48:XX:XX:XX:XX:74  48:XX:XX:XX:XX:76  4A:XX:XX:XX:XX:76  em_fh  yes        no        0%   0%   1  128      136  138
3 A 48:XX:XX:XX:XX:74  48:XX:XX:XX:XX:77  4A:XX:XX:XX:XX:77  em_fh  yes        no        33%  33%  0  84       5    5
4 A D0:XX:XX:XX:XX:D3  D0:XX:XX:XX:XX:D9  D0:XX:XX:XX:XX:D9  em_bh  no         yes       0%   33%  0  129      64   50
5 A D0:XX:XX:XX:XX:D3  D0:XX:XX:XX:XX:D8  D2:XX:XX:XX:XX:D8  em_bh  no         yes       0%   33%  0  84       5    5
6 A D0:XX:XX:XX:XX:D3  D0:XX:XX:XX:XX:D8  D2:XX:XX:XX:XX:D9  em_fh  yes        no        0%   33%  0  84       5    5
7 A D0:XX:XX:XX:XX:D3  D0:XX:XX:XX:XX:D9  D2:XX:XX:XX:XX:DA  em_fh  yes        no        0%   33%  0  129      64   50
```

STA 表列出已连接客户端和回传站点：

```ros
[admin@cAP] > /interface/wifi/easymesh/sta/print
Columns: BSSID, SSID, ALMAC, MAC-ADDRESS, UPTIME, LAST-ACTIVITY, SIGNAL, BACKHAUL
#  BSSID              SSID   ALMAC              MAC-ADDRESS        UPTIME  LAST-ACTIVITY  SIGNAL  BACKHAUL
0  4A:XX:XX:XX:XX:76  em_fh  48:XX:XX:XX:XX:74  3C:XX:XX:XX:XX:AD  6s      1s510ms        -32     no
1  48:XX:XX:XX:XX:77  em_bh  48:XX:XX:XX:XX:74  D0:XX:XX:XX:XX:D8  16s     1s820ms        -22     yes
```

## 故障排除 {#troubleshooting}

- 如果代理未出现在 `topology` 中，请检查两台设备是否位于同一二层网络、代理的网桥是否包含正确的端口，以及是否已设置 `enabled=yes`、`role=agent` 和 `configuration.manager=easymesh`。
- 如果无线回传未能建立，请在两台设备上再次运行 WPS 按钮命令。从控制器开始。
- 如果客户端看不到网络，请检查控制器是否具有正确的 `fhaul-configurations` 值，以及代理是否已完成入网。
- 一个射频只能使用一个管理器。不要在同一接口上同时使用 EasyMesh 和 CAPsMAN。

## 说明 {#notes}

:::note

- 每个 EasyMesh 网络使用一个控制器。
- 所有控制器和代理节点必须位于同一二层网络中。
- 跨厂商互操作性需要经过认证的 EasyMesh 设备。部署前请测试特定的控制器和代理节点组合。
:::
