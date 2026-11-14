---
sidebar_key: "wireless/wifi/capsman"
sidebar_position: 1
title: "WiFi CAPsMAN"
sidebar_label: "WiFi CAPsMAN"
description: "适用于 wifi-qcom / wifi-qcom-ac 软件包的 WiFi CAPsMAN（受控接入点系统管理器）可集中管理多个 WiFi 接入点。内容涵盖 CAP 发现、无线射频配置、数据路径/转发模式、VLAN 和 OWE 示例，以及 CAPsMAN/CAP/配置属性参考。"
tags:
  - 'wifi'
  - 'caps-man'
  - 'capsman'
source: https://manual.mikrotik.com/docs/7.25/wireless/wifi/capsman
captured_at: '2026-11-04T11:24:24+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info
本节介绍 wifi-qcom 和 wifi-qcom-ac 软件包中 CAPsMAN 功能的操作。对于使用旧版 "wireless" 软件包的设备，请参见[此处相应手册](../abgn/capsman/index.md)。本文及下文提到 "WiFi" 时，指的是新的 WiFi 菜单，而不是该技术本身。
:::

受控接入点系统管理器 (CAPsMAN) 允许从集中配置界面向多个 MikroTik WiFi AP 设备应用无线设置，即允许集中管理无线网络。使用 CAPsMAN 时，网络将由多个提供无线连接的“受控接入点”(CAP) 和一个管理 AP 配置并负责客户端认证的“系统管理器”(CAPsMAN) 组成。

要求：

- 任何支持 WiFi 软件包的 RouterOS 设备，只要至少具有 Level 4 RouterOS 许可证，就可以作为受控无线接入点 (CAP)。
- WiFi CAPsMAN 服务器可以安装在任何支持 WiFi 软件包的 RouterOS 设备上，即使该设备本身没有无线接口。
- CAPsMAN 支持无限数量的 CAP（接入点）。

:::info
WiFi CAPsMAN 只能控制 WiFi 接口，WiFi CAP 也只能加入 WiFi CAPsMAN。同样，常规 CAPsMAN 仅支持非 WiFi CAP。

CAP 不会向 CAPsMAN 发送流量使用信息。
:::

### CAP 发现 CAPsMAN {#capsman-discovery-by-cap}

CAP 通过以下方式发现 CAPsMAN 地址/主机名：

- 二层发现。
- DHCP 选项 138（CAPsMAN 地址）。
- DHCP 选项 15（自定义域）：`resolves _capsman._tcp.<domain>.`
- 默认 MikroTik 'lan' 域：`resolves _capsman._tcp.lan.`

### 射频预配 {#radio-provisioning}

创建配置模板后，你可以选择哪些设备应使用每个模板进行预配置。当然，在简单设置中，只有一条预配置规则就足够了；但如果你希望向 2.4GHz 接口发送一种配置，向 5GHz 接口发送另一种配置，则可以创建两条预配置规则，并使用 `supported-bands` 参数定义哪个模板发送到哪里。

CAPsMAN 根据内置 MAC 地址 (radio-mac) 区分实际无线接口（射频）。这意味着不可能在同一 CAPsMAN 上管理两个具有相同 MAC 地址的射频。当前由 CAPsMAN 管理的射频（由已连接的 CAP 提供）列在 `/interface/wifi/radio` 菜单中。此列表还会包含 CAPsMAN 自身存在的内置 WiFi 接口（如果有）：

```ros
[admin@c52i] > /interface/wifi/radio/print 
Flags: L - LOCAL
Columns: CAP, RADIO-MAC, INTERFACE
#   CAP                  RADIO-MAC          INTERFACE 
0 L                      18:FD:74:AF:F4:28  wifi1     
1 L                      18:FD:74:AF:F4:29  wifi2     
2   hapAX3@192.168.88.30  48:A9:8A:0B:F7:4B  cap1
```

当 CAP 连接时，CAPsMAN 首先会尝试根据 radio-mac 将每个 CAP 射频绑定到 CAPsMAN 主接口。如果找到合适的接口，则使用主接口配置以及引用该特定主接口的从接口配置来设置该射频。此时，接口（包括主接口和从接口）被视为已绑定到射频，并且该射频被视为已预配置。仅当 `/interface/wifi` 下已存在匹配的静态条目时才会发生这种情况；通常该条目是先前手动创建的，或通过包含 "create-enabled" 或 "create-disabled" 动作的预配置规则创建的。

如果未找到与该射频匹配的主接口，CAPsMAN 会执行在 `/interface/wifi/provisioning/` 下定义的“预配置规则”。预配置规则是一个有序规则列表，其中包含指定要匹配哪个射频的设置，以及确定射频匹配后要执行什么动作的设置。

当 CAP 加入 CAPsMAN，且 `/interface/wifi` 下没有与之匹配的接口时，系统会自动检查预配置规则；一旦找到匹配项，CAP 的无线接口就会出现在 `/interface/wifi` 下。这样的接口就是“已预配置”；在此上下文中，预配置意味着该射频存在一个 WiFi 接口，并且已为其分配配置配置文件。

还可以选择手动预配置接口，这会让 CAPsMAN 开始针对特定接口评估预配置规则，并在匹配时创建新接口。如果 `/interface/wifi/` 下已存在该射频的条目，该条目将被删除并重新创建。手动预配置会重新创建接口，**通常不需要**，因为预配置规则会自动评估；并且如果你更改与预配置规则关联的配置配置文件，这些更改将应用到所有使用该配置的 WiFi 接口。如果手动预配置接口，接口 ID 或名称可能会改变，从而导致对其他对象（例如桥接端口）的引用失效。

可以在 `/interface/wifi/capsman/remote-cap/provision` 下执行手动预配置，以预配置与特定 CAP 关联的所有射频；也可以在 `/interface/wifi/radio/provision` 下预配置特定射频。

CAPsMAN 无法使用 `configuration.manager=capsman` 管理自身的 WiFi 接口；只需像使用预配置规则那样，在本地接口上手动设置相同的配置配置文件即可，最终结果与将它们作为 CAP 时相同。话虽如此，也可以通过 `/interface/wifi/radio` 菜单预配置本地接口；需要注意的是，预配置后若要重新获得对本地接口的控制，你需要禁用匹配的预配置规则并再次按 "provision"，这会使本地接口恢复到未配置状态。

:::info
预配置只需在初始阶段执行；如果存在已启用的匹配预配置规则，则 CAP 加入时会自动执行。  
如果你调整了与已预配置接口关联的任何配置配置文件，只要应用对该配置文件的更改，所有更改都会被“推送”，无需重新创建已存在的接口。  
预配置本身并不是用于发送配置，而本质上是用于创建新接口。在大多数情况下，一旦 CAP 接口已在运行，就没有理由执行手动预配置。
:::

### CAPSMAN 数据路径 {#capsman-datapath}

数据路径设置控制与数据转发相关的方面。在 CAPsMAN 上，数据路径设置可在数据路径配置文件菜单 **/interface/wifi/datapath/** 中配置，也可在配置配置文件或接口菜单中作为带有 **datapath.** 前缀的设置直接配置。

有两种主要的转发/流量处理模式：

- 本地转发模式（`traffic-processing=on-cap`），其中 CAP 在本地向无线接口转发数据以及从无线接口转发数据；
- CAPsMAN 转发模式（`traffic-processing=on-capsman`），其中 CAP 将所有通过无线接收的数据发送给 CAPsMAN，并且只发送从 CAPsMAN 接收的无线数据。

:::info
仅从 **7.21beta2** 版本开始才可能使用 CAPsMAN 转发。**在较旧版本中，仅支持 CAP 转发。**

**wifi-qcom-ac** 设备不支持 CAPsMAN 转发（wifi-qcom-ac 驱动仅**支持** **本地转发**）。
:::

### CAPsMAN - CAP 简单配置示例 {#capsman---cap-simple-configuration-example}

WiFi 中的 CAPsMAN 使用与普通 WiFi 接口相同的菜单，这意味着当你向 CAP 传递配置时，必须使用与普通 WiFi 接口相同的配置、安全、信道配置等。

:::info
你可以直接在 `/interface/wifi/configuration` 下配置子配置菜单，或在主配置文件中引用之前创建的配置文件
:::

#### CAPsMAN {#capsman}

```ros
#创建安全配置文件
/interface/wifi/security
add authentication-types=wpa3-psk name=sec1 passphrase=HaveAg00dDay

#创建用于下发的配置模板
/interface/wifi/configuration
add country=Latvia name=5ghz security=sec1 ssid=CAPsMAN_5
add name=2ghz security=sec1 ssid=CAPsMAN2
add country=Latvia name=5ghz_v security=sec1 ssid=CAPsMAN5_v

#配置下发规则，按需配置频段匹配
/interface/wifi/provisioning
add action=create-dynamic-enabled master-configuration=5ghz slave-configurations=5ghz_v supported-bands=\
    5ghz-n
add action=create-dynamic-enabled master-configuration=2ghz supported-bands=2ghz-n

#启用 CAPsMAN 服务
/interface/wifi/capsman
set ca-certificate=auto enabled=yes
```

#### CAP {#cap}

```ros
#启用 CAP 服务，此处 CAPsMAN 位于同一 LAN，但也可以在此指定 "caps-man-addresses=x.x.x.x"
/interface/wifi/cap/set enabled=yes

#在应作为 CAP 的 WiFi 接口上设置 configuration.manager=
/interface/wifi/set wifi1,wifi2 configuration.manager=capsman-or-local
```

:::warning
如果 CAP 是 hAP ax<sup>2</sup> 或 hAP ax<sup>3</sup>，强烈建议在 CAP 上的桥接配置中启用 RSTP，

configuration.manager 只应在 CAP 设备本身上设置，不要将其传递给 CAP 或你预配置的配置配置文件。
:::

:::info
应作为 CAP 的接口需要在 `/interface/wifi/set wifi1 configuration.manager=` 下进行额外配置
:::

### CAPsMAN - CAP VLAN 配置示例 {#capsman---cap-vlan-configuration-example}

在此示例中，我们将把 VLAN10 分配给主 SSID，并为访客网络添加 VLAN20；CAPsMAN 的 ether5 连接到 CAP。

:::info
使用 "wifi-qcom" 软件包的 CAP 可以通过 CAPsMAN 的 Datapath 获取 "vlan-id"；使用 "wifi-qcom-ac" 软件包的 CAP 则需要使用本示例末尾提供的配置。
:::

#### CAPsMAN {#capsman-1}

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
检查动态创建的接口，并将 PVID 分配给相应的接口。确保不要使用 `/interface/bridge/port/add bridge=bridgeLocal interface=all`，因为这会阻止你向 WiFi 接口应用 PVID。
:::

此外，以下配置必须添加到 **CAPsMAN 配置**中：

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
将示例开头的 datapaths "MAIN/GUEST" 传递给 "wifi-qcom-ac" CAP 会是错误配置；请确保向此类设备使用未指定 "vlan-id" 的 datapath。

对于 wifi-qcom-ac 驱动，不需要在 CAPSMAN 上设置 datapath。该示例只是说明必须省略 "vlan-id"。
:::

### CAPsMAN - OWE 配置示例 {#capsman---owe-configuration-example}

#### CAPsMAN {#capsman-2}

```ros
/interface/wifi/configuration
add country=Latvia disabled=no hide-ssid=yes name=OWE security.authentication-types=owe .owe-transition-interface=auto ssid=MikroTik_OWE
add country=Latvia disabled=no name=open security.owe-transition-interface=auto ssid=Mikrotik_open

/interface/wifi/provisioning
add action=create-dynamic-enabled disabled=no master-configuration=open slave-configurations=OWE

/interface/wifi/capsman
set ca-certificate=auto enabled=yes
```

#### CAP {#cap-1}

```ros
/interface/wifi/cap/set enabled=yes
/interface/wifi/set wifi1,wifi2 configuration.manager=capsman-or-local
```

## 属性参考 {#property-reference}

### CAPsMAN 全局配置 {#capsman-global-configuration}

菜单：`/interface/wifi/capsman`

| 属性 | 描述 |
| :-- | :-- |
| **ca-certificate** (*auto \| certificate name*) | 设备 CA 证书；CAPsMAN 服务器需要证书，CAP 上的证书是可选的。 |
| **certificate** (*auto \| certificate name \| none*; Default: **none**) | 设备证书 |
| **enabled** *(no* \| *yes*) | 禁用或启用 CAPsMAN 功能 |
| **package-path** (*string*) | RouterOS 软件包的文件夹位置。例如，使用 "/upgrade" 指定 files 部分中的升级文件夹。如果设置为空字符串，CAPsMAN 可以使用内置的 RouterOS 软件包。注意，在这种情况下，只有与 CAPsMAN 架构相同的 CAP 会被升级。 |
| **require-peer-certificate** (*yes \| no; Default: **no**)* | 要求所有连接的 CAP 都具有有效证书 |
| **upgrade-policy** *(none \| require-same-version \| suggest-same-upgrade; Default: **none**)* | 升级策略选项：none - 不执行升级；require-same-version - CAPsMAN 建议升级 CAP 的 RouterOS 版本，如果失败，则不会对该 CAP 进行预配置。（仍可手动预配置）；suggest-same-version - CAPsMAN 建议升级 CAP 的 RouterOS 版本，如果失败，仍会进行预配置 |
| **interfaces** *(all \| interface name \| none; Default: **all**)* | CAPsMAN 将在其上监听二层 CAP 连接的接口 |

### CAPsMAN 预配置 {#capsman-provisioning}

用于匹配射频的预配置规则在 `/interface/wifi/provisioning/` 菜单中配置：

| 属性 | 描述 |
| :-- | :-- |
| **action** (*create-disabled \| create-enabled \| create-dynamic-enabled \| none; Default: **none**)* | 规则匹配时执行的动作由以下设置指定：create-disabled - 为射频创建禁用的静态接口。也就是说，接口将绑定到射频，但只有在手动启用接口后射频才可运行；create-enabled - 创建已启用的静态接口。也就是说，接口将绑定到射频，并且射频可运行；create-dynamic-enabled - 创建已启用的动态接口。也就是说，接口将绑定到射频，并且射频可运行；none - 不执行任何操作，使射频保持未预配置状态；enabled 与 dynamic-enabled 的基本区别在于，动态接口无法手动编辑以覆盖设置，也无法在防火墙或其他菜单中被引用，因为它们会被重新创建。在两种情况下，任何 `/interface/wifi/configuration` 更改都会自动推送到 CAP。 |
| **comment** (*string*) | Provisioning 规则的简短描述 |
| **common-name-regexp** (*string*) | 用于按 common name 匹配 radio 的正则表达式。每个 CAP 的 common name 标识符可在 `/interface/wifi/radio` 下作为值 "REMOTE-CAP-NAME" 找到 |
| **supported-bands** (*2ghz-ax \| 2ghz-be \| 2ghz-g \| 2ghz-n \| 5ghz-a \| 5ghz-ac \| 5ghz-ax \| 5ghz-be \| 5ghz-n \| 60ghz-ad \| 6ghz-ax \| 6ghz-be*) | 按支持的无线模式匹配射频。此参数接受一个或多个频段，以逗号分隔列表表示（例如，*supported-bands=5ghz-ac,5ghz-ax*）。指定多个频段时，设备必须支持所有列出的频段，匹配才会成功，定义的配置才会被应用。 |
| **supported-hw-caps** (*beacon-protection \| channel-switch \| hw-protection-mode \| mlo \| qos-qualifier \| sniffer \| spectral*) | 根据 `/interface/wifi/radio` 下 *hw-caps* 字段中报告的受支持附加功能来匹配射频。接受一个或多个逗号分隔的值。射频必须支持所有列出的能力，才能匹配此预配置规则。 |
| **identity-regexp** (*string*) | 用于按路由器 identity 匹配 radio 的正则表达式 |
| **address-ranges** (*IpAddressRange[,IpAddressRanges] max 100x*;) | 匹配 IP 在已配置地址范围内的 CAP。仅适用于通过 IP（而非 MAC 地址）加入 CAPsMAN 的 CAP。 |
| **master-configuration** (*string*) | 如果 **action** 指定创建接口，则将创建一个新的 master 接口，其配置设置为此 configuration profile |
| **multi-link-mode** (*all \| auto \| disabled \| master; Default: **disabled**)* | 控制预配置期间的 MLO（多链路操作）行为。all 或 auto - CAPsMAN 会自动将预配置的 WiFi 接口分配为 MLD 接口的关联链路。如果尚不存在匹配的 MLD 接口，则将使用相应配置创建一个。这适用于主接口和从接口；disabled - 预配置期间不会创建或分配 MLD 接口；master - 行为与 **all** 或 **auto** 相同，但只有主接口会作为关联的 MLD 链路添加； |
| **name-format** (*string*) | 用于构造已配置接口名称的基础字符串。每个新接口将通过取基础字符串并在其末尾追加数字来创建。仅当字符串不唯一时才会追加数字。 <br/> 如果字符串中包含字符序列 <strong>%I</strong>，它将被替换为 cAP 的系统 identity，<strong>%C</strong> 将被替换为 cAP 的 TLS 证书的 Common Name，<strong>%R</strong>，或小写的 <strong>%r</strong>，将被替换为 CAP 的 radio MAC <br/> 默认："cap-wifi" |
| **slave-name-format** (*string*) | 用于构造虚拟接口名称的基础字符串。每个新接口将通过取基础字符串并在其末尾追加数字来创建。仅当字符串不唯一时才会追加数字。 <br/> 如果字符串中包含字符序列 <strong>%v</strong>，它将被替换为 "virtual"；如果包含字符序列 <strong>%m</strong>，它将被替换为 master 接口的名称；如果字符串中包含字符序列 <strong>%I</strong>，它将被替换为 cAP 的系统 identity，<strong>%C</strong> 将被替换为 cAP 的 TLS 证书的 Common Name，<strong>%R</strong>，或小写的 <strong>%r</strong>，将被替换为 CAP 的 radio MAC <br/> 默认："<em>master-interface-name</em>-virtual" |
| **radio-mac** (*MAC 地址*) | 要匹配的 radio 的 MAC 地址。没有默认值。 |
| **slave-configurations** (*string*) | 如果 **action** 指定创建接口，则会为列表中的每个 configuration profile 创建一个新的 slave 接口。 |
| **disabled** (*yes* *\| no*) | 指定预配置规则是否已禁用。 |

### CAP 配置 {#cap-configuration}

菜单：`/interface/wifi/cap`

| 属性 | 说明 |
| :-- | :-- |
| **caps-man-addresses** *(list of IP addresses or host names; Default:*  \_capsman.\_tcp.lan) | CAP 在发现期间将尝试联系的管理器 IP 地址或主机名列表，以逗号分隔 |
| **caps-man-names** () | CAP 将连接到的 CAPs Manager 名称的有序列表；如果为空，则 CAP 不检查管理器名称 |
| **discovery-interfaces** (*list of interfaces*) | CAP 应尝试用于发现管理器的接口列表 |
| **lock-to-caps-man** (*yes \| no; Default: **no***) | 设置 CAP 是否应锁定到它连接的第一个 CAPsMAN。 |
| **slaves-static** (*yes \| no; Default: **no***) | 创建静态虚拟接口，并允许为这些接口分配 IP 配置。应用来自 CAPsMAN 的配置时，使用 MAC 地址来记住每个静态接口。 |
| **mld-static** (*yes \| no; Default: **no***) | 设置为 yes 时，由 CAPsMAN 在 cAP 上创建的 MLD 接口为静态；否则为动态。静态接口具有持久内部 ID，可以手动操作、添加到网桥、在防火墙规则中引用等。动态接口在重启之间不会持久存在。应为它们分配适当的 datapath 配置文件。 |
| **caps-man-certificate-common-names** () | CAP 将连接到的管理器证书 CommonName 列表；如果为空，则 CAP 不检查管理器证书 CommonName |
| **certificate** () | 用于认证的证书 |
| **enabled** (*yes \| no; Default: **no***) | 禁用或启用 CAP 功能 |
| **current-caps-man-address** () | 显示当前使用的 CAPsMAN 地址 |
| **current-caps-man-identity** () | 显示当前使用的 CAPsMAN 身份 |
| **slaves-datapath** *(datapath profile)* | 要应用到从接口的 datapath 配置文件。主要用于指定从接口在 CAP 上自动添加到的网桥。使用本地转发（`traffic-processing=on-cap`）时必需，因为在该模式下所有路由和转发决策均由 CAP 本身做出——CAPsMAN 不会将这些接口包含在其自己的网桥中，因此必须在此处或手动在 CAP 上设置 datapath。 |
| **mld-datapath** *(datapath profile)* | 要应用到由 CAPsMAN 创建的 MLD 接口的 datapath 配置文件。决定 MLD 接口上的流量如何转发，包括将其添加到哪个网桥，以及转发是在 CAP 本地处理还是由 CAPsMAN 集中处理。仅在使用了 MLD 时生效。 |

### 远程 CAP {#remote-cap}

运行 `/interface/wifi/capsman/remote-cap/print detail` 命令可以查看有关远程 CAP 的信息。

| 属性 | 说明 |
| :-- | :-- |
| **address**(*IP address/MAC address%interface*) | CAP 的 IP 地址，或用于连接到 CAPsMAN 的 MAC 地址 |
| **identity** (*list of integers*) | CAP 的已配置系统身份 |
| **board-name** (*string*) | 描述型号名称 |
| **serial** (*string*) | CAP 的序列号 |
| **version** (*string*) | CAP 的 RouterOS 版本 |
| **base-mac** (*MAC address*) | CAP 以 '[XX:XX:XX:XX:XX:XX]' 形式提供的基础 MAC |
| **common-name** (*string*) | CAP 的通用名称 |
| **connected-time** (*time*) | 自 CAP 连接到 CAPsMAN 以来经过的时间间隔 |
| **uptime** (*time*) | 自启动以来经过的时间间隔 |
