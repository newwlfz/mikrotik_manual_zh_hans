---
title: "互通配置文件"
description: "本页介绍用于无线网络的 MikroTik RouterOS 互通配置文件，使设备能够通过 IEEE 802.11u 和 Hotspot 2.0 标准交换信息。文中详细说明网络类型、ANQP 元素和场所信息等配置属性，以改进客户端设备选择和安全。"
tags:
  - 'interworking'
  - 'hotspot-20'
  - 'anqp'
source: https://manual.mikrotik.com/docs/7.24/wireless/abgn/interworking-profiles
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## Interworking

互操作是指两个或更多对象协同工作。为获得更好的无线网络体验，必须在 Access Points 和 Wireless 客户端设备之间交换网络信息。基本 Wireless 信标和探测请求中可包含的信息有限。为此，IEEE 802.11u™-2011（Interworking with External Networks）标准应运而生，该标准规定了设备之间应如何交换信息。网络发现和 Access Point 选择过程可以通过互操作服务增强。Wireless 客户端设备可以依据更多条件选择要关联的网络。

## Hotspot 2.0

Hotspot 2.0 是由 Wi-Fi Alliance 开发并拥有的规范。其设计目的是在连接 Wi-Fi 网络时提供更类似蜂窝网络的体验。为提高无线网络安全，Hotspot 2.0 access points 使用强制 WPA2 认证。Hotspot 2.0 依赖 Interworking，并增加了一些自身属性和流程。

Interworking profiles 根据 IEEE 802.11u 和 Hotspot 2.0 Release 1 规范实现。

:::info
本手册页介绍旧版 `wireless` 软件包（`/interface/wireless`）的互操作配置。对于 `wifi` 软件包（`/interface/wifi`），请参阅 [Interworking for WiFi6](/docs/wireless/wifi/interworking-for-wifi6)。
:::

## 配置属性 {#configuration-properties}

**子菜单：** `/interface/wireless/interworking-profiles`

### 信标和探测响应中的信息元素 {#information-elements-in-beacon-and-probe-response}

可以通过 Interworking element 向 beacon 和 probe response 数据包添加一些信息。可以配置以下 Interworking element 参数：

| Property | Description |
| :-- | :-- |
| **asra** (*yes \| no*；默认：**no**) | Additional Steps Required for Access。如果用户需要执行额外步骤才能访问互联网，例如 walled garden，则设置为 `yes`。 |
| **esr** (*yes \| no*；默认：**no**) | Emergency services reachable（ESR）。设置为 `yes` 以指示可通过该接入点访问紧急服务。 |
| **hessid** (*MAC address*；默认：) | Homogenous extended service set identifier（HESSID）。提供对相同外部网络访问的设备属于同一个 homogenous extended service set。该服务集可通过 HESSID 标识，同一服务集中所有接入点上的 HESSID 相同。HESSID 的 6 字节值以 MAC 地址表示。该值应全局唯一，因此建议使用该服务集中某个接入点的 MAC 地址。 |
| **internet** (*yes \| no*；默认：**yes**) | 指示是否可通过该连接访问互联网。该信息包含在 Interworking element 中。 |
| **network-type** (*emergency-only \| personal-device \| private \| private-with-guest \| public-chargeable \| public-free \| test \| wildcard*；默认：**wildcard**) | 网络访问类型信息。<ul><li><code>emergency-only</code> - 专用于且仅限于访问紧急服务的网络；</li><li><code>personal-device</code> - 个人设备网络。此类网络的一个示例是连接到打印机的摄像头，从而形成用于打印图片的网络；</li><li><code>private</code> - 面向具有用户账户的用户的网络。通常用于企业中的员工，而非访客；</li><li><code>private-with-guest</code> - 与 private 相同，但提供访客账户；</li><li><code>public-chargeable</code> - 任何愿意付费的人都可以使用的网络。例如，Hotspot 2.0 服务订阅或酒店内的互联网接入；</li><li><code>public-free</code> - 任何人都可免费使用的网络。例如，城市市政网络或机场 Hotspot；</li><li><code>test</code> - 用于测试和实验用途的网络。不用于生产环境；</li><li><code>wildcard</code> - 用于 Wireless 客户端。发送 network type 值为 wildcard 的 probe request 时，所有 Interworking Access Point 都会响应，无论其实际 network-type 设置如何。</li></ul>客户端发送 probe request 帧时，会将 network-type 设置为其关注的值。客户端只会收到具有相同值的接入点的回复（wildcard 情况除外）。 |
| **uesa** (*yes \| no*；默认：**no**) | Unauthenticated emergency service accessible（UESA）。<ul><li><code>no</code> - 表示无法通过该 Access Point 访问未经身份验证的紧急服务；</li><li><code>yes</code> - 表示可通过该 Access Point 访问高层未经身份验证的紧急服务。</li></ul> |
| **venue** (*venue*；默认：**unspecified**) | 指定 Access Point 所在场所。从可用值中选择。部分示例：<br/><code>venue=business-bank</code><br/><code>venue=mercantile-shopping-mall</code><br/><code>venue=educational-university-or-college</code> |

### ANQP 元素 {#anqp-elements}

Access network query protocol（ANQP）。probe response 和 beacon 帧中不包含所有必要信息。客户端设备在关联接入点之前获取更多信息时，会使用 ANQP。Access Point 可以在多个 ANQP element 中存储信息。客户端设备将使用 ANQP 仅查询其关注的信息。这可缩短关联前所需的时间。

| Property | Description |
| :-- | :-- |
| **3gpp-raw** (*octet string in hex*；默认：) | 蜂窝网络广告信息——国家和网络代码。这有助于 Hotspot 2.0 客户端选择用于访问 3GPP 网络的 Access Point。有关该字段格式，请参阅 3GPP TS 24.302。（Annex H）。如果收到查询，该值会在 ANQP 响应中发送。 |
| **3gpp-info**(*number/number*；默认：) | 蜂窝网络广告信息——国家和网络代码。这有助于 Hotspot 2.0 客户端选择用于访问 3GPP 网络的 Access Point。格式为“mcc/mnc”。用法与“3gpp-raw”相同，但不使用 hex。可以通过逗号分隔定义多个 mcc/mnc 对。 |
| **authentication-types** (*dns-redirection:`url` \| https-redirection:`url` \| online-enrollment:`url` \| terms-and-conditions:`url`*；默认：) | 该属性仅在 asra 设置为 <code>yes</code> 时生效。<code>url</code> 的值是可选的，选择 <code>dns-redirection</code> 或 <code>online-enrollment</code> 时不需要。要将 <code>url</code> 的值设置为空字符串，请使用双引号。例如：<br/><code>authentication-types=online-enrollment:""</code> |
| **connection-capabilities** (*number:number:closed\|open\|unknown*；默认：) | 该选项用于提供允许的 IP 协议和端口信息。该信息可在 ANQP 响应中提供。第一个数字表示 IP 协议号，第二个数字表示端口号。<ul><li><code>closed</code> - 表示不允许该协议和端口组合；</li><li><code>open</code> - 表示允许该协议和端口组合；</li><li><code>unknown</code> - 表示该协议和端口组合可能允许，也可能不允许。</li></ul>示例：<br/><code>connection-capabilities=6:80:open,17:5060:closed</code><br/><br/>在 Access Point 上设置该值，会通知正在连接 Access Point 的 Wireless 客户端：HTTP（6 - TCP，80 - HTTP）允许，VoIP（17 - UDP；5060 - VoIP）不允许。<br/>该属性不会限制或允许这些协议和端口的使用，只会向正在连接 Access Point 的 station 设备提供信息。 |
| **domain-names** (*list of strings*；默认：) | 零个或多个完全限定域名（FQDN），用于指示运营 Hotspot 的实体。正在连接 Access Point 的 station 可以请求该 ANQP 属性，并检查其具有凭据的任一域名是否存在后缀匹配。 |
| **ipv4-availability** (*double-nated \| not-available \| port-restricted \| port-restricted-double-nated \| port-restricted-single-nated \| public \| single-nated \| unknown*；默认：**not-available**) | 有关可用 IPv4 地址和访问方式的信息。<ul><li><code>not-available</code> - 地址类型不可用；</li><li><code>public</code> - 公共 IPv4 地址可用；</li><li><code>port-restricted</code> - 端口受限的 IPv4 地址可用；</li><li><code>single-nated</code> - 单次 NAT 的私有 IPv4 地址可用；</li><li><code>double-nated</code> - 双重 NAT 的私有 IPv4 地址可用；</li><li><code>port-restricted-single-nated</code> - 端口受限的 IPv4 地址和单次 NAT 的 IPv4 地址可用；</li><li><code>port-restricted-double-nated</code> - 端口受限的 IPv4 地址和双重 NAT 的 IPv4 地址可用；</li><li><code>unknown</code> - 地址类型的可用性未知。</li></ul> |
| **ipv6-availability** (*available \| not-available \| unknown*；默认：**not-available**) | 有关可用 IPv6 地址和访问方式的信息。<ul><li><code>not-available</code> - 地址类型不可用；</li><li><code>available</code> - 地址类型可用；</li><li><code>unknown</code> - 地址类型的可用性未知。</li></ul> |
| **realms** (*string:eap-sim\|eap-aka\|eap-tls\|not-specified*；默认：) | 有关支持的 realm 和对应 EAP 方法的信息。<br/><code>realms=example.com:eap-tls,foo.ba:not-specified</code> |
| **realms-raw** (*octet string in hex*；默认：) | 手动设置 NAI Realm ANQP-element。 |
| **roaming-ois** (*octet string in hex*；默认：) | Organization identifier（OI）通常是 24 位唯一标识符，例如 organizationally unique identifier（OUI）或 company identifier（CID）。在某些情况下，OI 更长，例如 OUI-36。subscription service provider（SSP）可通过其 OI 指定。roaming-ois 属性可以包含零个或多个 SSP 的 OI，其网络可通过该 AP 访问。应在 OI 本身之前指定 OI 长度。例如，要设置 E4-8D-8C 和 6C-3B-6B：<br/><code>roaming-ois=03E48D8C036C3B6B</code> |
| **venue-names** (*string:lang*；默认：) | Venue name 可用于提供有关场所的附加信息。它可以帮助客户端选择合适的 Access Point。Venue-names 参数由零个或多个二元组组成，其中包含 Venue Name 和 Language Code：<br/><code>venue-names=CoffeeShop:eng,TiendaDeCafe:es</code><br/><br/>Language Code 字段值是从 ISO-639 中选择的两字符或三字符语言代码。 |

#### Realms 原始配置 {#realms-raw}

**realms-raw** - 包含 hex 值的字符串列表。每个字符串指定“NAI Realm Tuple”的内容，不包括“NAI Realm Data Field Length”字段。

每个 hex 编码字符串必须包含以下字段：

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

请注意，设置 "realms-raw=00045465737401020d00" 与设置 "realms=Test:eap-tls" 会生成相同的通告内容。

有关完整的 NAI Realm 编码，请参阅 802.11-2016 第 9.4.5.10 节。

### Hotspot 2.0 ANQP 元素 {#hotspot-20-anqp-elements}

Hotspot 2.0 规范引入了一些额外的 ANQP 元素。这些元素使用 ANQP 厂商特定元素 ID。以下是可用于修改这些元素的属性。

| 属性 | 说明 |
| :-- | :-- |
| **hotspot20** (*yes \| no*；默认：**yes**) | 指示 Access Point 的 Hotspot 2.0 能力。 |
| **hotspot20-dgaf** (*yes \| no*；默认：**yes**) | Downstream Group-Addressed Forwarding（DGAF）。设置 DGAF 位的值，以指示发往客户端的组播和广播帧是禁用还是启用。<ul><li><code>yes</code> - 发往客户端的组播和广播帧已启用；</li><li><code>no</code> - 发往客户端的组播和广播帧已禁用。</li></ul>要禁用组播和广播帧，请设置 <code>multicast-helper=full</code>。 |
| **operational-classes** (*list of numbers*；默认：) | 关于同一 ESS 的其他可用频段的信息。 |
| **operator-names** (*string:lang*；默认：) | 设置运营商名称。每个运营商名称条目都必须指定语言。Operator-names 参数由零个或多个二元组组成，每个二元组包含 Operator Name 和 Language Code：<br/><code>operator-names=BestOperator:eng,MejorOperador:es</code><br/><br/>Language Code 字段值是从 ISO-639 中选择的两字符或三字符语言代码。 |
| **wan-at-capacity** (*yes \| no*；默认：**no**) | Access Point 或网络是否已达到最大容量。如果设置为 `yes`，则不允许其他移动设备关联到 AP。 |
| **wan-downlink** (*number*；默认：**0**) | WAN 连接的下行速率，单位为 kbps。如果下行速率未知，请设置为 0。 |
| **wan-downlink-load** (*number*；默认：**0**) | 在 <code>wan-measurement-duration</code> 期间测得的 WAN 连接下行负载。取值范围为 0 到 255。<ul><li><code>0</code> - 未知；</li><li><code>255</code> - 100%。</li></ul> |
| **wan-measurement-duration** (*number*；默认：**0**) | 测量 wan-downlink-load 和 <code>wan-uplink-load</code> 的持续时间。该值为 0 到 65535 的数字，表示十分之一秒。<ul><li><code>0</code> - 不测量；</li><li><code>10</code> - 1 秒；</li><li><code>65535</code> - 1 小时 49 分钟或更长。</li></ul> |
| **wan-status** (*down \| reserved \| test \| up*；默认：**reserved**) | 关于 Access Point 的 WAN 连接状态的信息。值 `reserved` 表示不通告状态。 |
| **wan-symmetric** (*yes \| no*；默认：**no**) | WAN 链路是否对称（上传和下载速率相同）。 |
| **wan-uplink** (*number*；默认：**0**) | WAN 连接的上行速率，单位为 kbps。如果上行速率未知，请设置为 0。 |
| **wan-uplink-load** (*number*；默认：**0**) | 在 wan-measurement-duration 期间测得的 WAN 连接上行负载。取值范围为 0 到 255。<ul><li><code>0</code> - 未知；</li><li><code>255</code> - 100%。</li></ul> |

### 其他属性 {#other-properties}

| 属性 | 说明 |
| :-- | :-- |
| **comment** (*string*；默认：) | profile 的简短说明。 |
| **name** (*string*；默认：) | Interworking profile 的名称。 |

## 使用原生 RadSec 和 Orion Wifi 的配置指南 {#configuration-guide-using-native-radsec-and-orion-wifi}

本指南介绍如何设置 MikroTik 设备，以便与 RadSec 代理和 Orion Wifi 配合使用。主要配置步骤保持不变，也适用于不同提供商：  
请确保使用最新的 long-term 或 stable RouterOS 版本。

在无线 LAN 控制器和 Orion Wifi 之间建立安全 RADIUS 连接非常重要。  
Orion Wifi 使用 RADIUS over TLS（RadSec）确保 AAA 流量的端到端加密。

1) 导入从 Orion 下载的 RadSec 证书：

在 WinBox 中拖放证书，然后使用导入功能。该功能位于 WinBox 的 `/system/certificates` 下。对应的命令行如下：

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

对应的命令行如下：

```
/radius/add address=216.239.32.91 certificate=cert.pem_0 protocol=radsec service=wireless timeout=1s500ms
```

1) 创建执行 802.1x 认证的无线安全配置文件：

![](/img/6a844b5ed2cbd001.webp)

![](/img/d13a1203c4fd8709.webp)

![](/img/ba985a4fbb9fdfd3.webp)

对应的命令行如下：

```
/interface/wireless/security-profiles/add authentication-types=wpa2-eap management-protection=allowed mode=dynamic-keys name=dot1x_profile supplicant-identity="" radius-eap-accounting=yes eap-methods=passthrough
```

1) 下一步是配置无线接口并分配已创建的安全配置文件。按“Advanced mode”可查看所有选项：

![](/img/6b80df698a47676c.webp)

对应的命令行如下：

```
/interface/wireless/set [ find default-name=wlan1 ] mode=ap-bridge security-profile=dot1x_profile wps-mode=disabled
```

确保配置了正确的国家配置文件。本示例使用“wlan1”，但相同命令也适用于其他接口，或用作 `/interface/wireless/set wlan1`。

1) 配置互操作设置（hotspot 2.0）：

![](/img/d8b8c002900a5610.webp)

![](/img/a43e7faa87cacd15.webp)

![](/img/42cd3e6d600d6811.webp)

对应的命令行如下：

```
/interface/wireless/interworking-profile/add domain-names=orion.area120.com ipv4-availability=public name=Orion_MikroTik network-type=public-chargeable operator-names=Orion:eng realms=orion.area120.com:eap-tls roaming-ois=f4f5e8f5f4,baa2D00100,baa2d00000 venue=business-unspecified venue-names=Orion:eng wan-downlink=50 wan-uplink=50 wan-status=up
```

:::warning
请特别注意 "wan-downlink" 和 "wan-uplink"，在本场景中，值“50”仅用作占位符，请确保根据你的配置调整这些值。某些客户端设备会使用它们来评估是否应加入网络。按需设置“venue”（场所类型）、“venue-names”和其他属性。“domain-names”应为 hotspot 2.0 Operator 的域名。
:::

1) 将 interworking profile 分配给接口：

![](/img/9fd765802020f3be.webp)

对应的命令行命令为：

```
/interface/wireless/set wlan1 interworking-profile=Orion_MikroTik
```

如果看不到 interworking-profile 字段，请按“Advanced mode”。

注意：Orion 用于区分网络的 NAS-id 等于系统标识，要调整 nas-id，可以执行 `/system/identity/set name=exampleName`。

## 使用 RadSec 代理和 Orion Wifi 的配置指南 {#configuration-guide-using-radsec-proxy-and-orion-wifi}

本指南介绍如何设置 MikroTik 设备，以便将其与 RadSec 代理和 Orion Wifi 配合使用，不过主要配置步骤保持不变，也适用于其他提供商：
本指南假定你已使用 Orion Wifi 凭据配置了 radsecproxy。请确保使用最新的 long-term 或 stable RouterOS 版本。  
  
在无线 LAN 控制器和 Orion Wifi 之间建立安全的 RADIUS 连接非常重要。  
Orion Wifi 使用 RADIUS over TLS（RadSec）来确保 AAA 流量的端到端加密。本指南适用于 RouterOS 接入点在将流量发送到互联网之前，将 AAA 流量重定向到 RadSec 代理（radsecproxy）的场景。

1) 配置指向 radsecproxy 的 Radius 客户端：

![](/img/3db4b81f657ab534.webp)

对应的命令行命令如下：

```
/radius/add address=192.168.88.233 secret=yourSecret service=wireless timeout=1s500ms
```

密钥应与 radsecproxy 上配置的密钥一致。在本例中，“192.168.88.233”是运行代理的虚拟机。

1) 创建用于执行 802.1x 认证的无线安全配置文件：

![](/img/6a844b5ed2cbd001.webp)

![](/img/d13a1203c4fd8709.webp)

![](/img/ba985a4fbb9fdfd3.webp)

对应的命令行命令如下：

```
/interface/wireless/security-profiles/add authentication-types=wpa2-eap management-protection=allowed mode=dynamic-keys name=dot1x_profile supplicant-identity="" radius-eap-accounting=yes eap-methods=passthrough
```

1) 下一步是配置无线接口并分配已创建的安全配置文件。按“Advanced mode”可查看所有选项：

![](/img/6b80df698a47676c.webp)

对应的命令行命令如下：

```
/interface/wireless/set [ find default-name=wlan1 ] mode=ap-bridge security-profile=dot1x_profile wps-mode=disabled
```

确保配置了正确的国家配置文件。在本例中，使用的是“wlan1”，但同一命令也适用于其他接口，或用作 `/interface/wireless/set wlan1`。

1) 配置 interworking 设置（hotspot 2.0）：

![](/img/d8b8c002900a5610.webp)

![](/img/9bc913aff00b5c99.png)

![](/img/42cd3e6d600d6811.webp)

命令行等效操作：

```
/interface/wireless/interworking-profile/add domain-names=orion.area120.com ipv4-availability=public name=Orion_MikroTik network-type=public-chargeable operator-names=Orion:eng realms=orion.area120.com:eap-tls roaming-ois=f4f5e8f5f4,baa2D00100,baa2d00000 venue=business-unspecified venue-names=Orion:eng wan-downlink=50 wan-uplink=50 wan-status=up
```

:::warning
请务必在 "wan-downlink" 和 "wan-uplink" 中指定某个值，本场景中使用值“50”作为占位符，某些客户端设备会使用它来判断是否应加入网络。请根据实际情况设置 “venue”（场所类型）、”venue-names” 及其他属性。“domain-names” 应为 Hotspot 2.0 Operator 的域名。
:::

1）将 interworking profile 分配给接口：

![](/img/9fd765802020f3be.webp)

此步骤也可以通过以下命令完成：

```
/interface/wireless/set wlan1 interworking-profile=Orion_MikroTik
```

如果 radsecproxy 正常工作，则安装了相应 Hotspot profile 的客户端应能够连接。

注意：Orion 用于区分网络的 NAS-id 等于 system identity。要调整 nas-id，可以使用 `/system/identity/set name=exampleName`。

## 故障排除 {#troubleshooting}

要检查 RADIUS 消息的状态，可以使用 radius 菜单。  
![](/img/69cd6d8993c7246c.webp)  
也可以通过命令行运行 `/radius/monitor X`，其中 X 是数字 ID。可以使用 `/radius/print` 查看 ID。  
要获取更多信息，可以在 `/system/logging/add topics=radius,debug,packet` 下配置额外的日志记录。可以在 [`/log`](/docs/diagnostics-monitoring-and-troubleshooting/log) 下查看结果。

要查看活动的无线连接，请检查无线注册表 `/interface/wireless/registration-table/print`：

![](/img/ac8d84eba6b9b178.webp)
