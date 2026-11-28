---
title: "WiFi CAPsMAN"
description: "适用于 wifi-qcom / wifi-qcom-ac 软件包的 WiFi CAPsMAN（Controlled Access Point system Manager）可集中管理多个 WiFi 接入点。涵盖 CAP 发现、radio 配置、datapath/forwarding 模式、VLAN 和 OWE 示例，以及 CAPsMAN/CAP/provisioning 属性参考。"
tags:
  - 'wifi'
  - 'caps-man'
  - 'capsman'
source: https://manual.mikrotik.com/docs/7.24/wireless/wifi/capsman
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "wireless/wifi"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

:::info
本节介绍 wifi-qcom 和 wifi-qcom-ac 软件包中 CAPsMAN 功能的运行方式。对于使用旧版“wireless”软件包的设备，请参阅[此处对应的手册](/docs/wireless/abgn/capsman)。本文及下文提到“WiFi”时，均指新的 WiFi 菜单，而不是该技术本身。
:::

Controlled Access Point system Manager（CAPsMAN）允许通过集中配置接口将无线设置应用到多台 MikroTik WiFi AP 设备，即实现无线网络管理的集中化。使用 CAPsMAN 时，网络由多个提供无线连接的“Controlled Access Points”（CAP）和一个管理 AP 配置的“system Manager”（CAPsMAN）组成，CAPsMAN 还负责客户端认证。

Requirements:

- 任何支持 WiFi 软件包的 RouterOS 设备都可以作为受控无线接入点（CAP），前提是该设备至少具有 Level 4 RouterOS 许可证。
- WiFi CAPsMAN 服务器可以安装在任何支持 WiFi 软件包的 RouterOS 设备上，即使该设备本身没有无线接口。
- CAPsMAN 支持无限数量的 CAP（接入点）。

:::info
WiFi CAPsMAN 只能控制 WiFi 接口，WiFi CAP 只能加入 WiFi CAPsMAN。同样，普通 CAPsMAN 仅支持非 WiFi CAP。

CAP 不会向 CAPsMAN 发送流量使用信息。
:::

### CAP 发现 CAPsMAN {#capsman-discovery-by-cap}

CAP 通过以下方式发现 CAPsMAN 地址或主机名：

- Layer 2 发现。
- DHCP option 138（CAPsMAN 地址）。
- DHCP option 15（自定义域名）：`resolves _capsman._tcp.<domain>.`
- 默认 MikroTik“lan”域：`resolves _capsman._tcp.lan.`

### 无线配置下发 {#radio-provisioning}

创建配置模板后，可以选择哪些设备应使用各模板进行配置。当然，在简单场景中，只需一条配置规则即可；如果希望向 2.4GHz 接口发送一种配置，并向 5GHz 接口发送另一种配置，可以创建两条配置规则，并使用 `supported-bands` 参数定义将哪个模板发送到哪里。

CAPsMAN 根据内置 MAC 地址（radio-mac）区分实际无线接口（radio）。这意味着在一个 CAPsMAN 上无法管理两个具有相同 MAC 地址的 radio。当前由 CAPsMAN 管理的 radio（由已连接的 CAP 提供）列在 `/interface/wifi/radio` 菜单中。如果 CAPsMAN 自身存在内置 wifi 接口，该列表也会包含这些接口：

```ros
[admin@c52i] > /interface/wifi/radio/print 
Flags: L - LOCAL
Columns: CAP, RADIO-MAC, INTERFACE
#   CAP                  RADIO-MAC          INTERFACE 
0 L                      18:FD:74:AF:F4:28  wifi1     
1 L                      18:FD:74:AF:F4:29  wifi2     
2   hapAX3@192.168.88.30  48:A9:8A:0B:F7:4B  cap1
```

当 CAP 连接时，CAPsMAN 首先尝试根据 radio-mac 将每个 CAP radio 绑定到 CAPsMAN 主接口。如果找到合适的接口，将使用主接口配置以及引用该特定主接口的从接口配置来设置 radio。此时，接口（包括主接口和从接口）被视为绑定到 radio，radio 被视为已完成配置。只有当 `/interface/wifi` 下已经存在匹配的静态条目时才会发生这种情况，通常该条目此前已手动创建，或通过包含 action "create-enabled" 或 "create-disabled" 的配置规则创建。

如果未找到与 radio 匹配的主接口，CAPsMAN 会执行“配置规则”，这些规则定义在 `/interface/wifi/provisioning/` 下。配置规则是一个有序规则列表，其中包含用于指定匹配哪个 radio 的设置，以及确定 radio 匹配后采取何种操作的设置。

当 CAP 加入 CAPsMAN，且 `/interface/wifi` 下不存在与其匹配的接口时，将自动检查配置规则；找到匹配项后，CAP 的无线接口将出现在 `/interface/wifi` 下。这样的接口称为“已配置”。在此上下文中，已配置表示 radio 存在对应的 wifi 接口，并且已为其分配配置配置文件。

还有一个手动配置接口的选项，它将使 CAPsMAN 开始针对特定接口评估配置规则，并在匹配时创建新接口。如果 `/interface/wifi/` 下已存在该 radio 的条目，该条目将被删除并重新创建。手动配置会重新创建接口，通常不需要这样做，因为配置规则会自动评估；如果更改与配置规则关联的配置配置文件，更改将应用于使用该配置的所有 wifi 接口。如果手动配置接口，接口 ID 或名称可能会更改，导致对其他对象的引用失效，例如网桥端口。

可以在 `/interface/wifi/capsman/remote-cap/provision` 下执行手动配置，以配置与特定 CAP 关联的所有 radio；也可以在 `/interface/wifi/radio/provision` 下执行，以配置特定 radio。

CAPsMAN 无法使用 `configuration.manager=capsman` 管理自身的 wifi 接口。只需在本地接口上手动设置相同的配置配置文件即可，结果与这些接口作为 CAP 时相同。尽管如此，也可以通过 `/interface/wifi/radio` 菜单配置本地接口。需要注意的是，要在配置后重新获得对本地接口的控制，需要禁用匹配的配置规则并再次按下“provision”，这会将本地接口恢复为未配置状态。

:::info
配置下发只需在初始阶段完成；如果存在已启用的匹配配置规则，CAP 加入时会自动完成配置下发。  
如果调整与已下发接口关联的任何配置 profile，所有更改将在应用 profile 更改后立即“推送”，无需重新创建已存在的接口。  
配置下发本身并不用于发送配置，而是用于创建新接口。多数情况下，已有 CAP 接口运行时，无需手动执行配置下发。
:::

### CAPsMAN 数据路径 {#capsman-datapath}

Datapath 设置控制与数据转发相关的方面。在 CAPsMAN 上，datapath 设置可在 datapath profile 菜单 **/interface/wifi/datapath/** 中配置，也可直接在配置 profile 或接口菜单中作为带 **datapath.** 前缀的设置项配置。

主要有 2 种转发/流量处理模式：

- 本地转发模式（`traffic-processing=on-cap`），CAP 在本地将数据转发至无线接口以及从无线接口转发数据；
- CAPsMAN 转发模式（`traffic-processing=on-capsman`），CAP 将通过无线接收的所有数据发送给 CAPsMAN，并且只发送从 CAPsMAN 接收到的无线数据。

:::info
CAPsMAN 转发仅从 **7.21beta2** 版本开始支持。**旧版本仅支持 CAP 转发。**

**wifi-qcom-ac** 设备不支持 CAPsMAN 转发（wifi-qcom-ac 驱动仅**支持本地转发**）。
:::

### CAPsMAN - CAP 简单配置示例 {#capsman---cap-simple-configuration-example}

WiFi 中的 CAPsMAN 使用与普通 WiFi 接口相同的菜单，这意味着向 CAP 传递配置时，必须使用与普通 WiFi 接口相同的配置、安全配置、信道配置等。

:::info
可以在 `/interface/wifi/configuration` 下直接配置子配置菜单，也可以在主配置 profile 中引用此前创建的 profile
:::

#### CAPsMAN

```ros
#create a security profile
/interface/wifi/security
add authentication-types=wpa3-psk name=sec1 passphrase=HaveAg00dDay

#create configuration profiles to use for provisioning
/interface/wifi/configuration
add country=Latvia name=5ghz security=sec1 ssid=CAPsMAN_5
add name=2ghz security=sec1 ssid=CAPsMAN2
add country=Latvia name=5ghz_v security=sec1 ssid=CAPsMAN5_v

#configure provisioning rules, configure band matching as needed
/interface/wifi/provisioning
add action=create-dynamic-enabled master-configuration=5ghz slave-configurations=5ghz_v supported-bands=\
    5ghz-n
add action=create-dynamic-enabled master-configuration=2ghz supported-bands=2ghz-n

#enable CAPsMAN service
/interface/wifi/capsman
set ca-certificate=auto enabled=yes
```

#### CAP

```ros
#enable CAP service, in this case CAPsMAN is on the same LAN, but you can also specify "caps-man-addresses=x.x.x.x" here
/interface/wifi/cap/set enabled=yes

#set configuration.manager= on the WiFi interface that should act as CAP
/interface/wifi/set wifi1,wifi2 configuration.manager=capsman-or-local
```

:::warning
如果 CAP 是 hAP ax<sup>2</sup> 或 hAP ax<sup>3</sup>，强烈建议在 CAP 上的网桥配置中启用 RSTP。

configuration.manager 只应在 CAP 设备本身设置，不要将其传递给 CAP 或用于配置的 configuration profile。
:::

:::info
应充当 CAP 的接口需要在 `/interface/wifi/set wifi1 configuration.manager=` 下进行额外配置
:::

### CAPsMAN - CAP VLAN 配置示例 {#capsman---cap-vlan-configuration-example}

在本示例中，将为主 SSID 分配 VLAN10，并为访客网络添加 VLAN20，CAPsMAN 的 ether5 连接到 CAP。

:::info
使用 "wifi-qcom" 软件包的 CAP 可以通过 CAPsMAN 的 Datapath 获取 "vlan-id"，使用 "wifi-qcom-ac" 软件包的 CAP 需要使用本示例末尾提供的配置。
:::

#### CAPsMAN

```ros
/interface/bridge
add name=br vlan-filtering=yes
/interface/vlan
add interface=br name=MAIN vlan-id=10
add interface=br name=GUEST vlan-id=20
/interface/wifi/datapath
add bridge=br name=MAIN vlan-id=10
add bridge=br name=GUEST vlan-id=20
/interface/wifi/security
add authentication-types=wpa2-psk,wpa3-psk ft=yes ft-over-ds=yes name=Security_MAIN passphrase=HaveAg00dDay
add authentication-types=wpa2-psk,wpa3-psk ft=yes ft-over-ds=yes name=Security_GUEST passphrase=HaveAg00dDay
/interface/wifi/configuration
add datapath=MAIN name=MAIN security=Security_MAIN ssid=MAIN_Network
add datapath=GUEST name=GUEST security=Security_GUEST ssid=GUEST_Network
/ip/pool
add name=dhcp_pool0 ranges=192.168.1.2-192.168.1.254
add name=dhcp_pool1 ranges=192.168.10.2-192.168.10.254
add name=dhcp_pool2 ranges=192.168.20.2-192.168.20.254
/ip/dhcp-server
add address-pool=dhcp_pool0 disabled=yes interface=br name=dhcp1
add address-pool=dhcp_pool1 interface=MAIN name=dhcp2
add address-pool=dhcp_pool2 interface=GUEST name=dhcp3
/interface/bridge/port
add bridge=br interface=ether5 
add bridge=br interface=ether4 
add bridge=br interface=ether3 
add bridge=br interface=ether2 
/interface/bridge/vlan
add bridge=br tagged=br,ether5,ether4,ether3,ether2 vlan-ids=20
add bridge=br tagged=br,ether5,ether4,ether3,ether2 vlan-ids=10
/interface/wifi/capsman
set enabled=yes interfaces=br
/interface/wifi/provisioning
add action=create-dynamic-enabled master-configuration=MAIN slave-configurations=GUEST supported-bands=5ghz-ax
add action=create-dynamic-enabled master-configuration=MAIN slave-configurations=GUEST supported-bands=2ghz-ax
/ip/address
add address=192.168.1.1/24 interface=br network=192.168.1.0
add address=192.168.10.1/24 interface=MAIN network=192.168.10.0
add address=192.168.20.1/24 interface=GUEST network=192.168.20.0
/ip/dhcp-server/network
add address=192.168.1.0/24 gateway=192.168.1.1
add address=192.168.10.0/24 gateway=192.168.10.1
add address=192.168.20.0/24 gateway=192.168.20.1
/system/identity
set name=cAP_Controller
```

#### 使用 "wifi-qcom" 软件包的 CAP {#cap-using-wifi-qcom-package}

```ros
/interface/bridge
add name=bridgeLocal
/interface/wifi/datapath
add bridge=bridgeLocal comment=defconf disabled=no name=capdp
/interface/wifi
set [ find default-name=wifi1 ] configuration.manager=capsman datapath=capdp disabled=no
set [ find default-name=wifi2 ] configuration.manager=capsman datapath=capdp disabled=no
/interface/bridge/port
add bridge=bridgeLocal comment=defconf interface=ether1
add bridge=bridgeLocal comment=defconf interface=ether2
add bridge=bridgeLocal comment=defconf interface=ether3
add bridge=bridgeLocal comment=defconf interface=ether4
add bridge=bridgeLocal comment=defconf interface=ether5
/interface/wifi/cap
set discovery-interfaces=bridgeLocal enabled=yes slaves-datapath=capdp
/ip/dhcp-client
add interface=bridgeLocal disabled=no
```

#### 使用 "wifi-qcom-ac" 软件包的 CAP {#cap-using-wifi-qcom-ac-package}

```ros
/interface/bridge
add name=bridgeLocal vlan-filtering=yes
/interface/wifi
set [ find default-name=wifi1 ] configuration.manager=capsman disabled=no
set [ find default-name=wifi2 ] configuration.manager=capsman disabled=no
/interface/bridge/port
add bridge=bridgeLocal comment=defconf interface=ether1
add bridge=bridgeLocal comment=defconf interface=ether2
add bridge=bridgeLocal comment=defconf interface=ether3
add bridge=bridgeLocal comment=defconf interface=ether4
add bridge=bridgeLocal comment=defconf interface=ether5
add bridge=bridgeLocal interface=wifi1 pvid=10
add bridge=bridgeLocal interface=wifi21 pvid=20
add bridge=bridgeLocal interface=wifi2 pvid=10
add bridge=bridgeLocal interface=wifi22 pvid=20
/interface/bridge/vlan
add bridge=bridgeLocal tagged=ether1 untagged=wifi1,wifi2 vlan-ids=10
add bridge=bridgeLocal tagged=ether1 untagged=wifi21,wifi22 vlan-ids=20
/interface/wifi/cap
set discovery-interfaces=bridgeLocal enabled=yes slaves-static=yes
```

:::info
检查动态创建的接口，并为相应的接口分配 PVID。请勿使用 `/interface/bridge/port/add bridge=bridgeLocal interface=all`，否则将无法为 wifi 接口应用 PVID。
:::

此外，必须将以下配置添加到 **CAPsMAN 配置**中：

```ros
/interface/wifi/datapath
add bridge=br name=DP_AC
/interface/wifi/configuration
add datapath=DP_AC name=MAIN_AC security=Security_MAIN ssid=MAIN_Network
add datapath=DP_AC name=GUEST_AC security=Security_GUEST ssid=GUEST_Network
/interface/wifi/provisioning
add action=create-dynamic-enabled master-configuration=MAIN_AC slave-configurations=GUEST_AC supported-bands=5ghz-ac
add action=create-dynamic-enabled master-configuration=MAIN_AC slave-configurations=GUEST_AC supported-bands=2ghz-n
```

:::info
将示例开头的 datapaths “MAIN/GUEST” 传递给 “wifi-qcom-ac” CAP 属于错误配置，请确保对此类设备使用未指定 “vlan-id” 的 datapath。

使用 wifi-qcom-ac 驱动时，无需在 CAPSMAN 上设置 datapath。该示例仅用于说明必须省略 “vlan-id”。
:::

### CAPsMAN - OWE 配置示例 {#capsman---owe-configuration-example}

#### CAPsMAN

```ros
/interface/wifi/configuration
add country=Latvia disabled=no hide-ssid=yes name=OWE security.authentication-types=owe .owe-transition-interface=auto ssid=MikroTik_OWE
add country=Latvia disabled=no name=open security.owe-transition-interface=auto ssid=Mikrotik_open

/interface/wifi/provisioning
add action=create-dynamic-enabled disabled=no master-configuration=open slave-configurations=OWE

/interface/wifi/capsman
set ca-certificate=auto enabled=yes
```

#### CAP

```ros
/interface/wifi/cap/set enabled=yes
/interface/wifi/set wifi1,wifi2 configuration.manager=capsman-or-local
```

## 属性参考 {#property-reference}

### CAPsMAN 全局配置 {#capsman-global-configuration}

菜单：`/interface/wifi/capsman`

| 属性 | 说明 |
| :-- | :-- |
| **ca-certificate** (*auto \| certificate name*) | 设备 CA 证书，CAPsMAN 服务器需要证书，CAP 上的证书为可选。 |
| **certificate** (*auto \| certificate name \| none*；默认值：**none**) | 设备证书 |
| **enabled** *(no* \| *yes*) | 禁用或启用 CAPsMAN 功能 |
| **package-path** (*string*) | RouterOS 软件包的文件夹位置。例如，使用 "/upgrade" 指定 files 中的升级文件夹。如果设置为空字符串，CAPsMAN 可以使用内置 RouterOS 软件包。请注意，在这种情况下，只有与 CAPsMAN 架构相同的 CAP 会被升级。 |
| **require-peer-certificate** (*yes \| no; Default: **no**)* | 要求所有连接的 CAP 都具有有效证书 |
| **upgrade-policy** *(none \| require-same-version \| suggest-same-upgrade; Default: **none**)* | 升级策略选项 <br/><ul><li>none - 不执行升级</li><li>require-same-version - CAPsMAN 建议升级 CAP RouterOS 版本，如果失败，将不会配置该 CAP。（仍可手动配置）</li><li>suggest-same-version - CAPsMAN 建议升级 CAP RouterOS 版本，即使失败，仍会配置该 CAP</li></ul> |
| **interfaces** *(all \| interface name \| none; Default: **all**)* | CAPsMAN 监听二层 CAP 连接的接口 |

### CAPsMAN 配置 {#capsman-provisioning}

用于匹配无线电台的配置规则在 `/interface/wifi/provisioning/` 菜单中配置：

| 属性 | 说明 |
| :-- | :-- |
| **action** (*create-disabled \| create-enabled \| create-dynamic-enabled \| none; Default: **none**)* | 规则匹配时采取的操作，由以下设置指定：<ul><li><strong>create-disabled</strong> - 为 radio 创建禁用的静态接口。即接口将绑定到 radio，但在手动启用接口之前，radio 不会运行；</li><li><strong>create-enabled</strong> - 创建启用的静态接口。即接口将绑定到 radio，radio 将运行；</li><li><strong>create-dynamic-enabled</strong> - 创建启用的动态接口。即接口将绑定到 radio，radio 将运行；</li><li><strong>none</strong> - 不执行任何操作，使 radio 保持未配置状态；</li></ul> enabled 和 dynamic-enabled 的基本区别在于，动态接口无法手动编辑以覆盖设置，也无法在防火墙或其他菜单中引用，因为它们会被重新创建。在这两种情况下，任何 <code>/interface/wifi/configuration</code> 更改都会自动推送到 CAP。 |
| **comment** (*string*) | 配置规则的简短说明 |
| **common-name-regexp** (*string*) | 用于按通用名称匹配 radio 的正则表达式。每个 CAP 的通用名称标识符可在 `/interface/wifi/radio` 下找到，值为 "REMOTE-CAP-NAME" |
| **supported-bands** (*2ghz-ax \| 2ghz-be \| 2ghz-g \| 2ghz-n \| 5ghz-a \| 5ghz-ac \| 5ghz-ax \| 5ghz-be \| 5ghz-n \| 60ghz-ad \| 6ghz-ax \| 6ghz-be*) | 按支持的无线模式匹配 radio。该参数接受一个或多个频段，以逗号分隔列表形式提供（例如，*supported-bands=5ghz-ac,5ghz-ax*）。指定多个频段时，设备必须支持所有列出的频段，匹配才会成功并应用定义的配置。 |
| **supported-hw-caps** (*beacon-protection \| channel-switch \| hw-protection-mode \| mlo \| qos-qualifier \| sniffer \| spectral*) | 根据 `/interface/wifi/radio` 下 *hw-caps* 字段报告的支持功能匹配 radio。接受一个或多个以逗号分隔的值。radio 必须支持所有列出的功能，才会匹配该配置规则。 |
| **identity-regexp** (*string*) | 用于按路由器标识匹配 radio 的正则表达式 |
| **address-ranges** (*IpAddressRange[,IpAddressRanges] max 100x*;) | 匹配 IP 位于所配置地址范围内的 CAP。仅对使用 IP 而非 MAC 地址加入 CAPsMAN 的 CAP 有效。 |
| **master-configuration** (*string*) | 如果 **action** 指定创建接口，则会创建一个新的主接口，并将其配置设置为该配置配置文件 |
| **multi-link-mode** (*all \| auto \| disabled \| master; Default: **disabled**)* | 控制配置过程中的 MLO（Multi-Link Operation）行为。<ul><li><strong>all</strong> 或 <strong>auto</strong> - CAPsMAN 将自动把已配置的 WiFi 接口分配为 MLD 接口的关联链路。如果不存在匹配的 MLD 接口，将使用相应配置创建一个。这适用于主接口和从接口；</li><li><strong>disabled</strong> - 配置过程中不创建或分配 MLD 接口；</li><li><strong>master</strong> - 行为与 <strong>all</strong> 或 <strong>auto</strong> 相同，但仅将主接口添加为关联的 MLD 链路；</li></ul> |
| **name-format** (*string*) | 构造已配置接口名称时使用的基础字符串。每个新接口都将通过基础字符串末尾追加数字来创建。仅当字符串不唯一时才会追加数字。 <br/> 如果字符串中包含字符序列 <strong>%I</strong>，系统将用 cAP 的系统标识替换它；<strong>%C</strong> 将替换为 cAP 的 TLS 证书通用名称；<strong>%R</strong> 或小写形式的 <strong>%r</strong> 将替换为 CAP 的 radio MAC <br/> 默认值："cap-wifi" |
| **slave-name-format** (*string*) | 构造虚拟接口名称时使用的基础字符串。每个新接口都将通过基础字符串末尾追加数字来创建。仅当字符串不唯一时才会追加数字。 <br/> 如果字符串中包含字符序列 <strong>%v</strong>，将替换为 "virtual"；字符序列 <strong>%m</strong> 将替换为主接口名称；如果字符串中包含字符序列 <strong>%I</strong>，系统将用 cAP 的系统标识替换它；<strong>%C</strong> 将替换为 cAP 的 TLS 证书通用名称；<strong>%R</strong> 或小写形式的 <strong>%r</strong> 将替换为 CAP 的 radio MAC <br/> 默认值："<em>master-interface-name</em>-virtual" |
| **radio-mac** (*MAC address*) | 要匹配的 radio 的 MAC 地址。无默认值。 |
| **slave-configurations** (*string*) | 如果 **action** 指定创建接口，则会为此列表中的每个配置配置文件创建一个新的从接口。 |
| **disabled** (*yes* *\| no*) | 指定配置规则是否禁用。 |

### CAP 配置 {#cap-configuration}

菜单：`/interface/wifi/cap`

| 属性 | 说明 |
| :-- | :-- |
| **caps-man-addresses** *(IP 地址或主机名列表；Default:*  \_capsman.\_tcp.lan) | CAP 在发现过程中尝试联系的 Manager IP 地址或主机名列表，以逗号分隔 |
| **caps-man-names** () | CAP 将连接的 CAPs Manager 名称的有序列表，为空时 CAP 不检查 Manager 名称 |
| **discovery-interfaces** (*接口列表*) | CAP 应尝试发现 Manager 所使用的接口列表 |
| **lock-to-caps-man** (*yes \| no; Default: **no***) | 设置 CAP 是否锁定到其连接的第一个 CAPsMAN。 |
| **slaves-static** (*yes \| no; Default: **no***) | 创建静态虚拟接口，并允许为这些接口分配 IP 配置。从 CAPsMAN 应用配置时，使用 MAC 地址记住每个静态接口。 |
| **mld-static** (*yes \| no; Default: **no***) | 设置为 yes 时，由 CAPsMAN 在 cAP 上创建的 MLD 接口为静态接口；否则为动态接口。静态接口具有持久的内部 ID，可手动操作、添加到网桥、在防火墙规则中引用等。动态接口在重启后不会保留。应为其分配适当的 datapath profile。 |
| **caps-man-certificate-common-names** () | CAP 将连接的 Manager 证书 CommonName 列表，为空时 CAP 不检查 Manager 证书 CommonName |
| **certificate** () | 用于认证的证书 |
| **enabled** (*yes \| no; Default: **no***) | 禁用或启用 CAP 功能 |
| **current-caps-man-address** () | 显示当前使用的 CAPsMAN 地址 |
| **current-caps-man-identity** () | 显示当前使用的 CAPsMAN identity |
| **slaves-datapath** *(datapath profile)* | 应用于 slave 接口的 datapath profile。主要用于指定 CAP 上 slave 接口自动添加到的网桥。使用本地转发（*traffic-processing=on-cap*）时必须配置，因为在该模式下所有路由和转发决策均由 CAP 自身完成——CAPsMAN 不会将这些接口包含在其自身网桥中，因此必须在此处或在 CAP 上手动设置 datapath。 |
| **mld-datapath** *(datapath profile)* | 应用于由 CAPsMAN 创建的 MLD 接口的 datapath profile。确定流量如何在 MLD 接口上转发，包括将其添加到哪个网桥，以及转发是在 CAP 上本地处理还是由 CAPsMAN 集中处理。仅在使用 MLD 时生效。 |

### 远程 CAP {#remote-cap}

运行 `/interface/wifi/capsman/remote-cap/print detail` 命令可查看远程 CAP 的相关信息。

| 属性 | 说明 |
| :-- | :-- |
| **address**(*IP 地址/MAC 地址%接口*) | CAP 的 IP 地址，或用于连接 CAPsMAN 的 MAC 地址 |
| **identity** (*整数列表*) | CAP 配置的系统 identity |
| **board-name** (*字符串*) | 描述型号名称 |
| **serial** (*字符串*) | CAP 的序列号 |
| **version** (*字符串*) | CAP 的 RouterOS 版本 |
| **base-mac** (*MAC 地址*) | CAP 提供的 Base-MAC，格式为：'[XX:XX:XX:XX:XX:XX]' |
| **common-name** (*字符串*) | CAP 的通用名称 |
| **connected-time** (*时间*) | 自 CAP 连接到 CAPsMAN 以来经过的时间间隔 |
| **uptime** (*时间*) | 自启动以来经过的时间间隔 |
