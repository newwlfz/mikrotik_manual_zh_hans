---
title: "Dot1X"
description: "本页介绍 MikroTik RouterOS 的 Dot1X 实现，涵盖使用 TLS、TTLS 和 PEAP 等 EAP 方法进行 IEEE 802.1X 基于端口的网络访问控制的客户端和服务器配置。"
tags:
  - 'dot1x'
  - 'radius'
  - 'authentication'
source: https://manual.mikrotik.com/docs/7.25/authentication-authorization-accounting/dot1x
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "authentication-authorization-accounting/hotspot-captive-portal"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "memory"
---

Dot1X 是 RouterOS 中 IEEE 802.1X 标准的实现。主要目的是使用 EAP over LAN（也称为 EAPOL）提供基于端口的网络访问控制。802.1X 由 supplicant（客户端）、authenticator（服务器）和 authentication server（RADIUS 服务器）组成。RouterOS 支持 authenticator 和 supplicant 两端，安装 [User Manager](/docs/7.24/authentication-authorization-accounting/user-manager) 软件包后也支持 authentication server。supplicant 支持的 EAP 方法包括 EAP-TLS、EAP-TTLS、EAP-MSCHAPv2 和 PEAPv0/EAP-MSCHAPv2。

:::warning
该功能在 SMIPS 设备（hAP lite、hAP lite TC 和 hAP mini）上不受支持。
:::

## 客户端 {#client}

Supplicant 配置设置。

**子菜单：** `/interface/dot1x/client`

| 属性 | 说明 |
| :-- | :-- |
| **anon-identity** (*string*; Default: ) | 外层 EAP 身份验证使用的身份。仅用于 `eap-ttls` 和 `eap-peap` 方法。如果未设置，外层 EAP 身份验证将使用 `identity` 参数中的值。 |
| **client-certificate** (*string*; Default: ) | [System/Certificates](/docs/7.24/authentication-authorization-accounting/certificates) 中列出的证书名称。使用 `eap-tls` 方法时必需。 |
| **comment** (*string*; Default: ) | 条目的简短说明。 |
| **disabled** (*yes \| no*; Default: **no**) | 客户端是否启用。 |
| **eap-methods** (*eap-tls \| eap-ttls \| eap-peap \| eap-mschapv2*; Default: ) | 用于身份验证的 EAP 方法有序列表。 |
| **identity** (*string*; Default: ) | 用于 EAP 身份验证的 supplicant 身份。 |
| **interface** (*string*; Default: ) | 客户端运行所在接口的名称。 |
| **password** (*string*; Default: ) *[sensitive](/docs/7.24/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | supplicant 的明文密码。 |

### 只读属性 {#read-only-properties}

| 属性 | 说明 |
| :-- | :-- |
| **status** (*authenticated \| authenticating \| disabled*) | 可能的状态：<ul><li>authenticated - 客户端已成功通过身份验证。</li><li>authenticating - 已连接到服务器，身份验证过程正在进行中。</li><li>disabled - 客户端已禁用。</li><li>error - 发生了内部错误。</li><li>interface is down - 父接口未运行。</li><li>rejected - 服务器拒绝了身份验证。</li></ul> |

## Server

---

RouterOS dot1x 服务器充当认证器。启用 dot1x 服务器的接口将阻止除 EAPOL 数据包之外的所有流量，EAPOL 数据包用于认证。客户端认证成功后，接口将接受端口上收到的所有流量。如果接口连接到包含多个主机的共享介质，则至少有一个客户端认证成功时，将接受来自所有主机的流量。不过，可以[配置动态交换规则](/docs/7.24/authentication-authorization-accounting/dot1x#dynamic-switch-rule-configuration)，仅接受已认证用户的源 MAC 地址，并丢弃所有其他源 MAC 地址。如果认证失败，可以使用专用端口 VLAN ID 接受流量。

:::warning
在网桥端口上创建 dot1x 服务器时，网桥应运行 (R/M)STP，否则来自客户端的 EAP 数据包将无法被正确接受。网桥接口默认使用 `protocol-mode=rstp` 创建。如果网桥端口不应发送任何 BPDU，或应忽略收到的任何 BPDU，请在网桥端口上使用 `edge=yes` 配置。
:::

**子菜单：** `/interface/dot1x/server`

| 属性 | 说明 |
| :-- | :-- |
| **accounting** (*yes \| no*；默认：**yes**) | 是否向认证服务器发送 RADIUS 计费请求。 |
| **auth-timeout** (*time*；默认：**1m**) | EAP 认证可用的总时间。 |
| **auth-types** (*dot1x \| mac-auth*；默认：**dot1x**) | 服务器接口上使用的认证类型。同时选择两个选项时，服务器将优先使用 `dot1x` 认证类型，只有在 3 个 `retrans-timeout` 周期后，认证类型才会回退到 `mac-auth`。要使 `mac-auth` 认证类型生效，服务器接口应至少收到一帧包含客户端设备源 MAC 地址的帧。 |
| **comment** (*string*；默认：) | 条目的简短描述。 |
| **disabled** (*yes \| no*；默认：**no**) | 服务器配置是否启用。 |
| **guest-vlan-id** (*integer: 1..4094*；默认：**!guest-vlan-id**) | 当终端设备不支持 `dot1x` 认证且未配置 `mac-auth` 回退时分配的 VLAN。该设置将在 3 个 `retrans-timeout` 周期后生效。创建启用 dot1x 的客户端并成功重新认证后，端口将从 guest VLAN 中移除。该设置自 RouterOS 7.2 版本起可用，并且仅在网桥启用 `vlan-filtering` 时生效。默认情况下，guest VLAN 处于禁用状态。 |
| **interface** (*string*；默认：) | 服务器运行所在的接口或接口列表的名称。 |
| **interim-update** (*time*；默认：**0s**) | 计划的 RADIUS Interim-Update 消息之间的间隔。 |
| **mac-auth-mode** (*mac-as-username \| mac-as-username-and-password*；默认：**mac-as-username**) | 使用 MAC 认证时，允许控制 User-Name 和 User-Password RADIUS 属性。 |
| **radius-mac-format** (*XX-XX-XX-XX-XX-XX \| XX:XX:XX:XX:XX:XX \| XXXXXXXXXXXX \| xx-xx-xx-xx-xx-xx \| xx:xx:xx:xx:xx:xx \| xxxxxxxxxxxx*；默认：**XX:XX:XX:XX:XX:XX**) | 使用 MAC 认证时，控制客户端 MAC 地址在 User-Name 和 User-Password 属性中的编码方式。 |
| **reauth-period**(*time*；默认：**!reauth-period**) | 启用服务器端口重新认证。与 `dot1x` 认证类型一起启用时，服务器将通过向客户端发送 EAP-Request Identity 来尝试重新认证客户端。与 `mac-auth` 认证类型一起启用时，服务器将使用最近看到的 MAC 地址尝试通过 RADIUS 服务器重新认证客户端。该设置自 RouterOS 7.2 版本起可用。默认情况下，重新认证处于禁用状态。 |
| **reject-vlan-id** (*integer: 1..4094*；默认：**!reject-vlan-id**) | 当认证失败且 RADIUS 服务器返回 Access-Reject 消息时分配的 VLAN。如果 RADIUS 服务器完全无响应，该属性不会生效，客户端认证将直接超时，服务将不可用。该属性仅在网桥启用 `vlan-filtering` 时生效。默认情况下，reject VLAN 处于禁用状态。 |
| **retrans-timeout** (*time*；默认：**30s**) | 未收到 supplicant 响应时，消息重传之间的时间间隔。 |
| **server-fail-vlan-id** (*integer: 1..4094*；默认：**!server-fail-vlan-id**) | 当 RADIUS 服务器无响应且请求超时已过期时分配的 VLAN。该设置自 RouterOS 7.2 版本起可用，并且仅在网桥启用 `vlan-filtering` 时生效。默认情况下，server-fail VLAN 处于禁用状态。 |

当前已认证的客户端列在 active 菜单中（只读属性）。

**子菜单：** `/interface/dot1x/server/active`

| 属性 | 说明 |
| :-- | :-- |
| **auth-info** (*string*) | 认证信息：<br/><ul><li>dot1x</li><li>dot1x (guest vlan)</li><li>dot1x (reject vlan)</li><li>dot1x (server fail vlan)</li><li>mac-auth</li><li>mac-auth (reject vlan)</li><li>mac-auth (server fail vlan)</li></ul> |
| **client-mac** (*mac-address*) | supplicant 的 MAC 地址。 |
| **interface** (*string*) | 接口名称。 |
| **session-id** (*string*) | 唯一的会话标识符。 |
| **username** (*string*) | supplicant 的身份。 |
| **vlan-id** (*string*) | 分配给接口的未标记 VLAN ID。必须在网桥上启用 VLAN ID 过滤。 |

所有活动 dot1x 服务器接口的状态列在 state 菜单中（只读属性）。

**子菜单：** `/interface/dot1x/server/state`

| 属性 | 说明 |
| :-- | :-- |
| **interface** (*string*) | 接口名称。 |
| **status** (*string*) | 可能的接口状态：<ul><li>authorized - 已授予接口访问权限；</li><li>iface-down - 接口未运行；</li><li>rejected-holding - RADIUS 服务器拒绝了访问；</li><li>un-authorized - 未授予接口访问权限。</li></ul> |

## 示例 {#examples}

下面描述 dot1x 服务器和客户端最常见的配置示例。

### RouterOS Authenticator 配置 {#routeros-authenticator-configuration}

![](/img/dab2179e067f1308.webp)

首先添加新的 RADIUS 客户端。认证服务器（RADIUS）不一定与 authenticator 位于同一 LAN，但必须可从 authenticator 访问，因此需要考虑所有防火墙限制。

```ros
/radius 
add address=10.1.2.3 secret=radiussecret service=dot1x
```

:::warning
如果 RADIUS 通信通过公共网络进行，建议使用 RadSec 进行 RADIUS 通信。详情请参阅：[RADIUS](/docs/7.24/authentication-authorization-accounting/radius)
:::

添加新的 dot1x 服务器实例。

```ros
/interface/dot1x/server
add interface=ether2 interim-update=30s comment=accounted
add interface=ether12 accounting=no comment=notaccounted
```

#### 基于端口的 VLAN ID 分配 {#port-based-vlan-id-assignment}

可以使用网桥 VLAN 过滤将已认证接口分配到特定 VLAN ID。可通过 RADIUS Tunnel-Type、Tunnel-Medium-Type 和 Tunnel-Private-Group-ID 属性实现。请注意，只有具备硬件卸载 VLAN 过滤功能的设备才能在交换芯片上执行此操作。

首先，确保接口已添加到启用 VLAN 过滤的网桥中。

```ros
/interface/bridge
add name=bridge1 vlan-filtering=yes
/interface/bridge/port
add bridge=bridge1 interface=ether1
add bridge=bridge1 interface=ether2
add bridge=bridge1 interface=ether12
```

必须添加静态 VLAN 配置，才能通过 ether1 接口发送带标签的 VLAN 流量。

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=ether1 vlan-ids=2
add bridge=bridge1 tagged=ether1 vlan-ids=12
```

启用 RADIUS 调试日志后，可以查看包含所有属性的完整 RADIUS 消息数据包。在以下示例中，Tunnel 属性从 RADIUS 服务器的 Access-Accept 消息中接收：

```text
09:51:45 radius,debug,packet received Access-Accept with id 64 from 10.1.2.3:1812
09:51:45 radius,debug,packet     Tunnel-Type = 13 
09:51:45 radius,debug,packet     Tunnel-Medium-Type = 6 
09:51:45 radius,debug,packet     Tunnel-Private-Group-ID = "12" 
(..)
09:51:45 radius,debug,packet     User-Name = "dot1x-user" 
```

VLAN ID 现在会显示在活动会话列表中，未带标签的端口会添加到之前创建的静态 VLAN 配置中。

```ros
/interface/dot1x/server/active/print 
  0 interface=ether12 username="dot1x-user" client-mac=00:0C:42:EB:71:F6 session-id="86b00006" vlan-id=12
```

```ros
/interface/bridge/vlan/print detail 
Flags: X - disabled, D - dynamic 
 0 D bridge=bridge1 vlan-ids=1 tagged="" untagged="" current-tagged="" current-untagged=bridge1,ether3 

 1   bridge=bridge1 vlan-ids=2 tagged=ether1 untagged="" current-tagged=ether1 current-untagged=ether2 

 2   bridge=bridge1 vlan-ids=12 tagged=ether1 untagged="" current-tagged=ether1 current-untagged=ether12 
```

#### 动态交换规则配置 {#dynamic-switch-rule-configuration}

在某些网络配置中，需要针对特定 supplicant 添加额外的访问规则，以限制或允许特定网络服务。可使用 Mikrotik-Switching-Filter 属性实现，详情请参阅 [RADIUS vendor dictionary](/docs/7.24/authentication-authorization-accounting/radius)。当客户端被认证服务器成功认证后，服务器可以返回 Mikrotik-Switching-Filter 属性。认证器会根据接收到的信息，在客户端所在的交换端口上创建动态访问规则。只要客户端会话处于活动状态且接口正在运行，这些规则就会保持生效。正确实施交换规则存在特定顺序和限制：

- 支持 `mac-protocol`、`src-mac-address`（仅自 RouterOS 7.2 版本起可用）、`src-address`（IPv4/mask，仅自 RouterOS 7.2 版本起可用）、`dst-address`（IPv4/mask）、`protocol`（IPv4）、`src-port`（L4，仅自 RouterOS 7.2 版本起可用）、`dst-port`（L4）条件参数。
- `mac-protocol` 和 `protocol` 参数可使用十六进制或十进制表示（例如 `protocol 17` 或 `protocol 0x11`）。
- `src-port` 和 `dst-port` 支持单个值或范围值（例如 `src-port 10` 或 `src-port 10-20`）。
- `src-mac-address` 支持 "xx:xx:xx:xx:xx:xx" 或 "xxxxxxxxxxxx" 格式，并且可以使用 "none" 关键字设置不带任何源 MAC 地址的交换机规则（例如 `src-mac-address none`）。
- 对于每条规则，`src-mac-address`（如果尚未通过属性设置）、`switch` 和 `ports` 条件参数会自动设置
- 每条规则应以 action 属性结尾，支持的值为 **drop** 或 **allow**。如果未设置 action 属性，则使用默认 **allow** 值。
- 单个 supplicant 支持多条规则，并且必须用逗号“,”分隔。

以下是 Mikrotik-Switching-Filter 属性及其创建的动态交换机规则的一些示例：

```ros
# Drop ARP frames (EtherType: 0x0806 or 2054)
Mikrotik-Switching-Filter = "mac-protocol 2054 action drop"

/interface/ethernet/switch/rule/print
Flags: X - disabled, I - invalid, D - dynamic 
 0  D ;;; dot1x dynamic
      switch=switch1 ports=ether1 src-mac-address=CC:2D:E0:11:22:33/FF:FF:FF:FF:FF:FF mac-protocol=arp copy-to-cpu=no redirect-to-cpu=no mirror=no new-dst-ports=""

# Allow UDP (IP protocol: 0x11 or 17) destination port 100 and drop all other packets
Mikrotik-Switching-Filter = "protocol 17 dst-port 100 action allow, action drop"

/interface/ethernet/switch/rule/print
Flags: X - disabled, I - invalid, D - dynamic 
 0  D ;;; dot1x dynamic
      switch=switch1 ports=ether1 src-mac-address=CC:2D:E0:11:22:33/FF:FF:FF:FF:FF:FF protocol=udp dst-port=100 copy-to-cpu=no redirect-to-cpu=no mirror=no 

 1  D ;;; dot1x dynamic
      switch=switch1 ports=ether1 src-mac-address=CC:2D:E0:11:22:33/FF:FF:FF:FF:FF:FF copy-to-cpu=no redirect-to-cpu=no mirror=no new-dst-ports=""

# Allow only authenticated source MAC address, drop all other packets
Mikrotik-Switching-Filter = "action allow, src-mac-address none action drop"

/interface/ethernet/switch/rule/print 
Flags: X - disabled, I - invalid; D - dynamic 
 0  D ;;; dot1x dynamic
      switch=switch1 ports=ether1 src-mac-address=CC:2D:E0:01:6D:EB/FF:FF:FF:FF:FF:FF copy-to-cpu=no redirect-to-cpu=no mirror=no 

 1  D ;;; dot1x dynamic
      switch=switch1 ports=ether1 copy-to-cpu=no redirect-to-cpu=no mirror=no new-dst-ports="" 
```

在我们的示例中，ether2 上的 Supplicant2 仅允许访问 192.168.50.0/24 网络，且 UDP 目标端口为 50；所有其他流量都应丢弃。首先，确保硬件卸载在网桥端口上正常工作，否则交换机规则可能无法正常工作。

```ros
/interface/bridge/port/print
Flags: X - disabled, I - inactive, D - dynamic, H - hw-offload 
 #     INTERFACE                   BRIDGE                   HW  PVID PRIORITY  PATH-COST INTERNAL-PATH-COST    HORIZON
 0   H ether1                      bridge1                  yes    1     0x80         10                 10       none
 1   H ether2                      bridge1                  yes    1     0x80         10                 10       none
 2   H ether12                     bridge1                  yes    1     0x80         10                 10       none
```

启用 RADIUS 调试日志后，可以查看包含所有属性的完整 RADIUS 消息数据包。在我们的示例中，Mikrotik-Switching-Filter 属性是在 Radius 服务器发送的 Access-Accept 消息中接收的：

```text
02:35:38 radius,debug,packet received Access-Accept with id 121 from 10.1.2.3:1812 
(..)
02:35:38 radius,debug,packet     MT-Switching-Filter = "mac-protocol 2048 dst-address 192.168.50.0/24 dst-port 50 protocol 17 action allow,action drop"
```

动态交换机规则现在显示在 switch 菜单下：

```ros
/interface/ethernet/switch/rule/print 
Flags: X - disabled, I - invalid; D - dynamic 
 0  D ;;; dot1x dynamic
      switch=switch1 ports=ether2 src-mac-address=CC:2D:E0:11:22:33/FF:FF:FF:FF:FF:FF mac-protocol=ip dst-address=192.168.50.0/24 protocol=udp dst-port=50 copy-to-cpu=no redirect-to-cpu=no mirror=no 

 1  D ;;; dot1x dynamic
      switch=switch1 ports=ether2 src-mac-address=CC:2D:E0:11:22:33/FF:FF:FF:FF:FF:FF copy-to-cpu=no redirect-to-cpu=no mirror=no new-dst-ports="" 
```

:::warning
动态交换机规则仅适用于支持交换机规则的 RouterBoard，即配备 Marvell Prestera 交换机的 MikroTik 设备，以及配备 QCA8337、Atheros8327 和 Atheros8316 交换芯片的设备。CRS1xx/2xx 系列交换机不支持此功能。请考虑每台设备的最大规则数量，请参阅[配备 Marvell Prestera 交换机的 MikroTik 设备](/docs/7.24/bridging-and-switching/marvell-prestera-switch-chip-features#models)和[基本交换芯片表](/docs/7.24/bridging-and-switching/switch-chip-features)
:::

### RouterOS Supplicant 配置 {#routeros-supplicant-configuration}

`eap-tls, eap-ttls` 和 `eap-peap` 身份验证方法需要 CA 证书。此外，`eap-tls` 方法还需要客户端证书。对于此示例，我们已经导入了一个 P12 证书包，其中包含自签名客户端证书和 CA 证书。有关如何在 RouterOS 中导入证书的更多信息，请访问 [System/Certificates](/docs/7.24/authentication-authorization-accounting/certificates)。

```ros
/certificate/print 
Flags: K - private-key, L - crl, C - smart-card-key, A - authority, I - issued, R - revoked, E - expired, T - trusted 
 #         NAME                                            COMMON-NAME                                         SUBJECT-ALT-NAME                             FINGERPRINT                                        
 0 K  A  T dot1x-client                                    ez_dot1x-client                                     IP:10.1.2.34
 1  L A  T dot1x CA                                        ca            
```

只需添加一个新的 dot1x 客户端实例，该实例将发起认证过程。

```ros
/interface/dot1x/client
add anon-identity=anonymous client-certificate=dot1x-client eap-methods=eap-tls identity=dot1x-user interface=ether1 password=dot1xtest
```

如果认证成功，接口状态应为 authenticated。

```ros
/interface/dot1x/client/print 
Flags: I - inactive, X - disabled 
  0   interface=ether1 eap-methods=eap-tls identity="dot1x-user" password="dot1xtest" anon-identity="anonymous" client-certificate=dot1x-client status="authenticated"
```
