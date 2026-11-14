---
sidebar_key: "wireless/abgn/interworking-profiles"
sidebar_position: 3
title: "互通配置文件"
sidebar_label: "互通配置文件"
description: "本页介绍用于无线网络的 MikroTik RouterOS 互通配置文件，使设备能够通过 IEEE 802.11u 和 Hotspot 2.0 标准交换信息。文中详细说明了网络类型、ANQP 元素和场所信息等配置属性，以增强客户端设备的选择与安全性。"
tags:
  - 'interworking'
  - 'hotspot-20'
  - 'anqp'
source: https://manual.mikrotik.com/docs/7.25/wireless/abgn/interworking-profiles
captured_at: '2026-11-04T11:24:06+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 互通 {#interworking}

互通是指两个或多个事物协同工作。为了获得更好的无线网络体验，接入点与无线客户端设备之间必须交换网络信息。基本无线信标和探测请求中可包含的信息有限。因此，制定了 IEEE 802.11u™-2011（与外部网络互通）标准，该标准规定了设备之间应如何交换信息。通过网络互通服务，可以增强网络发现和接入点选择过程。无线客户端设备可以有更多标准来选择要关联的网络。

## Hotspot 2.0 {#hotspot-20}

Hotspot 2.0 是由 Wi-Fi Alliance 制定并拥有的规范。它旨在让连接 Wi-Fi 网络时获得更接近蜂窝网络的体验。为了提高无线网络安全性，Hotspot 2.0 接入点使用强制 WPA2 认证。Hotspot 2.0 依赖互通，并增加了自身的一些属性和流程。

互通配置文件按照 IEEE 802.11u 和 Hotspot 2.0 Release 1 规范实现。

:::info
本手册页面介绍旧版 `wireless` 软件包（`/interface/wireless`）的互通配置。对于 `wifi` 软件包（`/interface/wifi`），请参阅 [WiFi6 的互通](../wifi/interworking-for-wifi6.md)。
:::

## 配置属性 {#configuration-properties}

**子菜单：** `/interface/wireless/interworking-profiles`

### 信标和探测响应中的信息元素 {#information-elements-in-beacon-and-probe-response}

可以通过 Interworking 元素向信标和探测响应数据包添加一些信息。Interworking 元素的以下参数可以配置：

| 属性 | 描述 |
| :-- | :-- |
| **asra** (*yes \| no*；默认值：**no**) | 访问所需的额外步骤。如果用户需要采取额外步骤才能访问互联网（例如围墙花园），则设置为 `yes`。 |
| **esr** (*yes \| no*; 默认值：**no**) | 紧急服务可达 (ESR)。设置为 `yes` 以表示可通过该接入点访问紧急服务。 |
| **hessid** (*MAC 地址*；默认值：) | 同构扩展服务集标识符（HESSID）。提供对同一外部网络访问的设备处于同一个同构扩展服务集中。该服务集可通过 HESSID 标识，此服务集中所有接入点上的 HESSID 相同。HESSID 的 6 字节值表示为 MAC 地址。它应全局唯一，因此建议使用该服务集中某个接入点的 MAC 地址。 |
| **internet** (*yes \| no*; 默认值：**yes**) | 通过此连接是否可访问互联网。此信息包含在 Interworking 元素中。 |
| **network-type** (*emergency-only \| personal-device \| private \| private-with-guest \| public-chargeable \| public-free \| test \| wildcard*；默认值：**wildcard**) | 关于网络接入类型的信息。<code>emergency-only</code> - 专用于且仅限于访问紧急服务的网络；<code>personal-device</code> - 个人设备网络。此类网络的一个示例是连接到打印机的相机，从而形成用于打印照片的网络；<code>private</code> - 供拥有用户账户的用户使用的网络。通常用于企业中的员工，而不是访客；<code>private-with-guest</code> - 与 private 相同，但提供访客账户；<code>public-chargeable</code> - 任何人付费即可使用的网络。例如，Hotspot 2.0 服务订阅或酒店客房内互联网接入；<code>public-free</code> - 任何人无需付费即可使用的网络。例如，城市中的市政网络或机场 Hotspot；<code>test</code> - 用于测试和实验用途的网络。不用于生产环境；<code>wildcard</code> - 用于无线客户端。发送将网络类型值设为 wildcard 的探测请求会使所有互通接入点响应，而不管其实际 network-type 设置如何。客户端发送 network-type 设置为其感兴趣值的探测请求帧。它将仅收到具有相同值的接入点的回复（wildcard 的情况除外）。 |
| **uesa** (*yes \| no*; 默认值：**no**) | 未认证紧急服务可访问 (UESA)。<code>no</code> - 表示无法通过此接入点访问未认证紧急服务；<code>yes</code> - 表示可通过此接入点访问更高层的未认证紧急服务。 |
| **venue** (*venue*；默认值：**unspecified**) | 指定接入点所在的场所。从可用值中选择。一些示例：`venue=business-bank``venue=mercantile-shopping-mall``venue=educational-university-or-college` |

### ANQP 元素 {#anqp-elements}

接入网络查询协议（ANQP）。并非所有必要信息都包含在探测响应和信标帧中。为了让客户端设备在选择要关联的接入点之前获取更多信息，会使用 ANQP。接入点可以在多个 ANQP 元素中存储信息。客户端设备将使用 ANQP 仅查询其感兴趣的信息。这可减少关联前所需的时间。

| 属性 | 描述 |
| :-- | :-- |
| **3gpp-raw** (*octet string in hex*；默认值：) | 蜂窝网络通告信息 - 国家和网络代码。这有助于 Hotspot 2.0 客户端选择接入点以访问 3GPP 网络。有关此字段的格式，请参阅 3GPP TS 24.302（附录 H）。如果被查询，此值会在 ANQP 响应中发送。 |
| **3gpp-info**(*number/number*；默认值：) | 蜂窝网络通告信息 - 国家和网络代码。这有助于 Hotspot 2.0 客户端选择接入点以访问 3GPP 网络。写作 "mcc/mnc"。用法与 "3gpp-raw" 相同，但不使用十六进制。可以通过逗号分隔来定义多个 mcc/mnc 对。 |
| **authentication-types** (*dns-redirection:`url` \| https-redirection:`url` \| online-enrollment:`url` \| terms-and-conditions:`url`*；默认值：) | 此属性仅在 asra 设置为 `yes` 时有效。`url` 的值是可选的；如果选择了 `dns-redirection` 或 `online-enrollment`，则不需要该值。要将 `url` 的值设置为空字符串，请使用双引号。例如：`authentication-types=online-enrollment:""` |
| **connection-capabilities** (*number:number:closed\|open\|unknown*；默认值：) | 此选项允许提供有关允许的 IP 协议和端口的信息。此信息可在 ANQP 响应中提供。第一个数字表示 IP 协议号，第二个数字表示端口号。<code>closed</code> - 如果协议和端口组合不被允许，则设置；<code>open</code> - 如果协议和端口组合被允许，则设置；<code>unknown</code> - 如果协议和端口组合为开放或关闭，则设置。示例：`connection-capabilities=6:80:open,17:5060:closed` 在接入点上设置此类值会告知正在连接到该接入点的无线客户端：允许 HTTP（6 - TCP，80 - HTTP），不允许 VoIP（17 - UDP；5060 - VoIP）。此属性不会限制或允许这些协议和端口的使用，它仅向正在连接到接入点的站设备提供信息。 |
| **domain-names** (*字符串列表*; 默认值： ) | 零个或多个完全限定域名 (FQDN)，用于指示运营该 Hotspot 的实体。正在连接接入点的站可以请求此 ANQP 属性，并检查其拥有凭据的任何域名是否存在后缀匹配。 |
| **ipv4-availability** (*double-nated \| not-available \| port-restricted \| port-restricted-double-nated \| port-restricted-single-nated \| public \| single-nated \| unknown*；默认值：**not-available**) | 关于可用的 IPv4 地址和访问方式的信息。<code>not-available</code> - 地址类型不可用；<code>public</code> - 可用的公共 IPv4 地址；<code>port-restricted</code> - 可用的端口受限 IPv4 地址；<code>single-nated</code> - 可用的单 NAT 私有 IPv4 地址；<code>double-nated</code> - 可用的双 NAT 私有 IPv4 地址；<code>port-restricted-single-nated</code> - 可用的端口受限 IPv4 地址和单 NAT IPv4 地址；<code>port-restricted-double-nated</code> - 可用的端口受限 IPv4 地址和双 NAT IPv4 地址；<code>unknown</code> - 地址类型的可用性未知。 |
| **ipv6-availability** (*available \| not-available \| unknown*；默认值：**not-available**) | 关于可用的 IPv6 地址和访问方式的信息。<code>not-available</code> - 地址类型不可用；<code>available</code> - 地址类型可用；<code>unknown</code> - 地址类型的可用性未知。 |
| **realms** (*string:eap-sim\|eap-aka\|eap-tls\|not-specified*；默认值：) | 关于支持的 realm 及相应 EAP 方法的信息。`realms=example.com:eap-tls,foo.ba:not-specified` |
| **realms-raw** (*十六进制八位字节字符串*; 默认值： ) | 手动设置 NAI Realm ANQP 元素。 |
| **roaming-ois** (*octet string in hex*；默认值：) | 组织标识符（OI）通常是 24 位唯一标识符，例如组织唯一标识符（OUI）或公司标识符（CID）。在某些情况下，OI 会更长，例如 OUI-36。订阅服务提供商（SSP）可通过其 OI 指定。roaming-ois 属性可以包含零个或多个 SSP 的 OI，这些 SSP 的网络可通过此 AP 访问。OI 的长度应指定在 OI 本身之前。例如，要设置 E4-8D-8C 和 6C-3B-6B：`roaming-ois=03E48D8C036C3B6B` |
| **venue-names** (*string:lang*；默认值：) | 场所名称可用于提供有关场所的附加信息。它可以帮助客户端选择合适的接入点。Venue-names 参数由零个或多个二元组组成，这些二元组包含场所名称和语言代码：`venue-names=CoffeeShop:eng,TiendaDeCafe:es` 语言代码字段值是从 ISO-639 中选择的两字符或三字符语言代码。 |

#### Realms 原始值 {#realms-raw}

**realms-raw** - 一个包含十六进制值的字符串列表。每个字符串指定 "NAI Realm Tuple" 的内容，不包括 "NAI Realm Data Field Length" 字段。

每个十六进制编码字符串必须由以下字段组成：

```
- NAI Realm Encoding (1 byte)
- NAI Realm Length (1 byte)
- NAI Realm (variable)
- EAP Method Count (1 byte)
- EAP Method Tuples (variable)
```

例如，值 "00045465737401020d00" 解码为：

```
- NAI Realm Encoding: 0 (rfc4282)
- NAI Realm Length: 4
- NAI Realm: Test
- EAP Method Count: 1
- EAP Method Length: 2
- EAP Method Tuple: TLS, no EAP method parameters
```

请注意，设置 "realms-raw=00045465737401020d00" 会产生与设置 "realms=Test:eap-tls" 相同的通告内容。

有关完整的 NAI Realm 编码，请参阅 802.11-2016 第 9.4.5.10 节。

### Hotspot 2.0 ANQP 元素 {#hotspot-20-anqp-elements}

Hotspot 2.0 规范引入了一些额外的 ANQP 元素。这些元素使用 ANQP 厂商特定元素 ID。以下是可用于更改这些元素的属性。

| 属性 | 描述 |
| :-- | :-- |
| **hotspot20** (*yes \| no*; 默认值：**yes**) | 指示接入点的 Hotspot 2.0 能力。 |
| **hotspot20-dgaf** (*yes \| no*; 默认值：**yes**) | 下游组寻址转发 (DGAF)。设置 DGAF 位值，以指示发往客户端的组播和广播帧是禁用还是启用。<code>yes</code> - 发往客户端的组播和广播帧已启用；<code>no</code> - 发往客户端的组播和广播帧已禁用。要禁用组播和广播帧，请设置 `multicast-helper=full`。 |
| **operational-classes** (*数字列表*; 默认值： ) | 有关同一 ESS 其他可用频段的信息。 |
| **operator-names** (*string:lang*；默认值：) | 设置运营商名称。必须为每个运营商名称条目指定语言。Operator-names 参数由零个或多个二元组组成，这些二元组包含运营商名称和语言代码：`operator-names=BestOperator:eng,MejorOperador:es` 语言代码字段值是从 ISO-639 中选择的两字符或三字符语言代码。 |
| **wan-at-capacity** (*yes \| no*; 默认值：**no**) | 接入点或网络是否已达到最大容量。如果设置为 `yes`，则不允许其他移动设备关联到 AP。 |
| **wan-downlink** (*number*; 默认值：**0**) | WAN 连接的下行速度，以 kbps 为单位设置。如果下行速度未知，请设置为 0。 |
| **wan-downlink-load** (*number*; 默认值：**0**) | 在 `wan-measurement-duration` 期间测量的 WAN 连接下行负载。值为 0 到 255。<code>0</code> - 未知；<code>255</code> - 100%。 |
| **wan-measurement-duration** (*number*; 默认值：**0**) | 测量 wan-downlink-load 和 `wan-uplink-load` 的持续时间。值为 0 到 65535 的数字，表示十分之一秒。<code>0</code> - 未测量；<code>10</code> - 1 秒；<code>65535</code> - 1 小时 49 分钟或更长时间。 |
| **wan-status** (*down \| reserved \| test \| up*；默认值：**reserved**) | 关于接入点 WAN 连接状态的信息。值 `reserved` 表示不通告状态。 |
| **wan-symmetric** (*yes \| no*; 默认值：**no**) | WAN 链路是否对称（上传和下载速度相同）。 |
| **wan-uplink** (*number*；默认值：**0**) | WAN 连接的上行速度，单位为 kbps。如果上行速度未知，请设置为 0。 |
| **wan-uplink-load** (*number*; 默认值：**0**) | 在 wan-measurement-duration 期间测量的 WAN 连接上行负载。值为 0 到 255。<code>0</code> - 未知；<code>255</code> - 100%。 |

### 其他属性 {#other-properties}

| 属性 | 描述 |
| :-- | :-- |
| **comment** (*string*；默认值：) | 配置文件的简短描述 |
| **name** (*string*；默认值：) | 互通配置文件的名称。 |

## 使用原生 RadSec 和 Orion Wifi 的配置指南 {#configuration-guide-using-native-radsec-and-orion-wifi}

本指南介绍如何设置 MikroTik 设备，以便将其与 RadSec 代理和 Orion Wifi 配合使用；主要配置步骤保持不变，也适用于不同的提供商：
请确保使用最新的长期支持版或稳定版 RouterOS 发行版。

在无线 LAN 控制器与 Orion Wifi 之间建立安全的 RADIUS 连接非常重要。  
Orion Wifi 使用 RADIUS over TLS（RadSec）来确保 AAA 流量的端到端加密。

1) 导入您从 Orion 下载的 RadSec 证书：

在 WinBox 中拖放证书，然后使用其导入功能；该功能位于 WinBox 的 `/system/certificates` 下。等效的命令行如下：

```
/certificate/import file-name=bw.radsec.cacert.pem passphrase=""
/certificate/import file-name=cert.pem passphrase=""
/certificate/import file-name=key.pem passphrase=""
```

![](/img/ec7b39addec96eaa.webp)

![](/img/e93c0b62bdad9bb8.webp)

![](/img/2b9f3644dbfb3754.webp)

证书导入后，应如下所示：

![](/img/008d1c527283a5f9.webp)

1) 配置 Radius 客户端：

![](/img/c4e4a528043cd9a8.webp)

等效命令行如下：

```
/radius/add address=216.239.32.91 certificate=cert.pem_0 protocol=radsec service=wireless timeout=1s500ms
```

1) 创建执行 802.1x 认证的无线安全配置文件：

![](/img/6a844b5ed2cbd001.webp)

![](/img/d13a1203c4fd8709.webp)

![](/img/ba985a4fbb9fdfd3.webp)

等效命令行如下：

```
/interface/wireless/security-profiles/add authentication-types=wpa2-eap management-protection=allowed mode=dynamic-keys name=dot1x_profile supplicant-identity="" radius-eap-accounting=yes eap-methods=passthrough
```

1) 下一步是配置无线接口并分配已创建的安全配置文件。按“高级模式”以查看所有选项：

![](/img/6b80df698a47676c.webp)

等效命令行如下：

```
/interface/wireless/set [ find default-name=wlan1 ] mode=ap-bridge security-profile=dot1x_profile wps-mode=disabled
```

请确保已配置正确的国家/地区配置文件。在本例中，我们使用“wlan1”，但同一命令也适用于其他接口，或可写为 `/interface/wireless/set wlan1`。

1) 配置互通设置（hotspot 2.0）：

![](/img/d8b8c002900a5610.webp)

![](/img/a43e7faa87cacd15.webp)

![](/img/42cd3e6d600d6811.webp)

等效命令行如下：

```
/interface/wireless/interworking-profile/add domain-names=orion.area120.com ipv4-availability=public name=Orion_MikroTik network-type=public-chargeable operator-names=Orion:eng realms=orion.area120.com:eap-tls roaming-ois=f4f5e8f5f4,baa2D00100,baa2d00000 venue=business-unspecified venue-names=Orion:eng wan-downlink=50 wan-uplink=50 wan-status=up
```

:::warning
请特别注意 "wan-downlink" 和 "wan-uplink"；在此场景中，"50" 仅用作占位值，请务必根据您的设置调整这些值。某些客户端设备会用它来判断是否应加入网络。请根据实际情况设置 “venue”（场所类型）、“venue-names” 和其他属性。“domain-names” 应为 hotspot 2.0 运营商的域名。
:::

1) 将互通配置文件分配给接口：

![](/img/9fd765802020f3be.webp)

等效命令行如下：

```
/interface/wireless/set wlan1 interworking-profile=Orion_MikroTik
```

如果看不到 interworking-profile 字段，请按“高级模式”。

注意：Orion 用于区分网络的 NAS-id 等于系统标识；要调整 nas-id，可以执行 `/system/identity/set name=exampleName`。

## 使用 RadSec 代理和 Orion Wifi 的配置指南 {#configuration-guide-using-radsec-proxy-and-orion-wifi}

本指南介绍如何设置 MikroTik 设备，以便将其与 RadSec 代理和 Orion Wifi 配合使用；主要配置步骤保持不变，也适用于不同的提供商：
本指南假设您已使用 Orion Wifi 凭据配置了 radsecproxy。请确保使用最新的长期支持版或稳定版 RouterOS 发行版。  
  
在无线 LAN 控制器与 Orion Wifi 之间建立安全的 RADIUS 连接非常重要。  
Orion Wifi 使用 RADIUS over TLS（RadSec）来确保 AAA 流量的端到端加密。本指南适用于 RouterOS 接入点在流量通过互联网发送之前，将 AAA 流量重定向到 RadSec 代理（radsecproxy）的场景。

1) 配置指向 radsecproxy 的 Radius 客户端：

![](/img/3db4b81f657ab534.webp)

等效命令行如下：

```
/radius/add address=192.168.88.233 secret=yourSecret service=wireless timeout=1s500ms
```

该 secret 应与 radsecproxy 上配置的 secret 匹配。在本例中，“192.168.88.233” 是运行该代理的虚拟机。

1) 创建将执行 802.1x 认证的无线安全配置文件：

![](/img/6a844b5ed2cbd001.webp)

![](/img/d13a1203c4fd8709.webp)

![](/img/ba985a4fbb9fdfd3.webp)

等效命令行如下：

```
/interface/wireless/security-profiles/add authentication-types=wpa2-eap management-protection=allowed mode=dynamic-keys name=dot1x_profile supplicant-identity="" radius-eap-accounting=yes eap-methods=passthrough
```

1) 下一步是配置无线接口并分配已创建的安全配置文件。按“高级模式”以查看所有选项：

![](/img/6b80df698a47676c.webp)

等效命令行如下：

```
/interface/wireless/set [ find default-name=wlan1 ] mode=ap-bridge security-profile=dot1x_profile wps-mode=disabled
```

请确保已配置正确的国家/地区配置文件。在本例中，我们使用“wlan1”，但同一命令也适用于其他接口，或可写为 `/interface/wireless/set wlan1`。

1) 配置互通设置（hotspot 2.0）：

![](/img/d8b8c002900a5610.webp)

![](/img/9bc913aff00b5c99.png)

![](/img/42cd3e6d600d6811.webp)

等效命令行如下：

```
/interface/wireless/interworking-profile/add domain-names=orion.area120.com ipv4-availability=public name=Orion_MikroTik network-type=public-chargeable operator-names=Orion:eng realms=orion.area120.com:eap-tls roaming-ois=f4f5e8f5f4,baa2D00100,baa2d00000 venue=business-unspecified venue-names=Orion:eng wan-downlink=50 wan-uplink=50 wan-status=up
```

:::warning
请务必为 "wan-downlink" 和 "wan-uplink" 指定某个值；在此场景中，"50" 仅用作占位值，某些客户端设备会用它来判断是否应加入网络。请根据实际情况设置 “venue”（场所类型）、“venue-names” 和其他属性。“domain-names” 应为 hotspot 2.0 运营商的域名。
:::

1) 将互通配置文件分配给接口：

![](/img/9fd765802020f3be.webp)

此步骤也可以通过以下命令完成：

```
/interface/wireless/set wlan1 interworking-profile=Orion_MikroTik
```

如果 radsecproxy 正常工作，则安装了相应 Hotspot 配置文件的客户端应能够连接。

注意：Orion 用于区分网络的 NAS-id 等于系统标识。要调整 nas-id，可以执行 `/system/identity/set name=exampleName`。

## 故障排除 {#troubleshooting}

要检查 RADIUS 消息的状态，可以使用 radius 菜单。  
![](/img/69cd6d8993c7246c.webp)  
或者，通过命令行运行 `/radius/monitor X`，其中 X 是数字 ID。可以使用 `/radius/print` 查看这些 ID。  
有关更多信息，可以在 `/system/logging/add topics=radius,debug,packet` 下配置额外日志。可以在 [`/log`](../../diagnostics-monitoring-and-troubleshooting/log/index.md) 下查看结果。

要查看活动无线连接，请检查无线注册表 `/interface/wireless/registration-table/print`：

![](/img/ac8d84eba6b9b178.webp)
