---
sidebar_key: "wireless/wifi/interworking-for-wifi6"
sidebar_position: 5
title: "WiFi6 互通"
sidebar_label: "WiFi6 互通"
description: "本页面介绍 MikroTik RouterOS 针对 WiFi6 的互通（Interworking）功能，该功能可借助 IEEE 802.11u/Hotspot 2.0 标准实现安全的网络发现和接入点选择。文中说明了配置方法、interworking 配置文件设置，以及用于增强客户端设备与接入点通信的 ANQP 元素。"
tags:
  - 'wifi'
  - 'interworking'
  - 'hotspot-20'
source: https://manual.mikrotik.com/docs/7.24/wireless/wifi/interworking-for-wifi6
captured_at: '2026-11-04T11:35:59+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 互通 {#interworking}

互通是指两个或多个事物协同工作。为了获得更好的无线网络体验，接入点与无线客户端设备之间必须交换网络相关信息。基础无线信标和探测请求中可包含的信息有限。因此，制定了 IEEE 802.11u™-2011（与外部网络互通）标准，规定设备之间应如何交换信息。通过互通服务可以增强网络发现和接入点选择过程。无线客户端设备可以依据更多条件来选择要关联的网络。

## Hotspot 2.0 {#hotspot-20}

Hotspot 2.0 是由 Wi-Fi Alliance 开发并拥有的规范。它旨在让连接 Wi-Fi 网络时获得更接近蜂窝网络的体验。为了提高无线网络安全性，Hotspot 2.0 接入点使用强制 WPA2 认证。Hotspot 2.0 依赖互通，并加入了一些自身的属性和流程。

互通配置文件按照 IEEE 802.11u 和 Hotspot 2.0 Release 1 规范实现。

:::info
本手册页介绍 **wifi-qcom** 软件包设备的配置。
:::

## 配置属性 {#configuration-properties}

:::info
您可以通过两种方式配置 **Interworking**。

您可以在 "`WiFi>Interworking"` 选项卡中将其配置为“配置文件”，然后在 `WiFi>WiFi` 选项卡中将其应用到接口：选择 wifi 接口，然后在 “Interworking” 选项卡的 “Interworking” 字段中选择该配置文件。

或者，您也可以不使用“配置文件”，直接在接口设置中配置：在 `WiFi>WiFi` 选项卡中选择 wifi 接口，然后进入 “Interworking” 选项卡。
:::

**子菜单：** `/interface/wifi/interworking`

### 信标和探测响应中的信息元素 {#information-elements-in-beacon-and-probe-response}

可以使用 Interworking 元素向信标和探测响应数据包中添加一些信息。可以配置 Interworking 元素的以下参数：

| 属性 | 描述 |
| :-- | :-- |
| **esr** (*yes \| no*; 默认值：**no**) | 紧急服务可达 (ESR)。设置为 `yes` 以表示可通过该接入点访问紧急服务。 |
| **hessid** (*MAC 地址*; 默认值： ) | 同质扩展服务集标识符 (HESSID)。提供对相同外部网络访问的设备属于同一个同质扩展服务集。该服务集可通过在此集合中所有接入点上相同的 HESSID 来标识。HESSID 的 6 字节值表示为 MAC 地址。它应全局唯一，因此建议使用该服务集中某个接入点的 MAC 地址之一。 |
| **internet** (*yes \| no*; 默认值：**yes**) | 通过此连接是否可访问互联网。此信息包含在 Interworking 元素中。 |
| **network-type** (*emergency-only \| personal-device \| private \| private-with-guest \| public-chargeable \| public-free \| test \| wildcard*; 默认值：**wildcard**) | 网络访问类型信息。<code>emergency-only</code> - 专用于且仅限访问紧急服务的网络；<code>personal-device</code> - 个人设备网络。此类网络的一个示例是连接到打印机的相机，从而构成用于打印照片的网络；<code>private</code> - 面向拥有用户账户的用户的网络。通常用于企业中的员工，而不是访客；<code>private-with-guest</code> - 与 private 相同，但提供访客账户；<code>public-chargeable</code> - 可供任何愿意付费的人使用的网络。例如，Hotspot 2.0 服务订阅或酒店客房内互联网访问；<code>public-free</code> - 任何人都可以免费使用的网络。例如，城市中的市政网络或机场 Hotspot；<code>test</code> - 用于测试和实验用途的网络。不用于生产环境；<code>wildcard</code> - 用于无线客户端。发送网络类型值为 wildcard 的探测请求会使所有 Interworking 接入点响应，而不管其实际的 network-type 设置如何。客户端发送一个 network-type 设置为其感兴趣的值的探测请求帧。它将仅从具有相同值的接入点接收回复（wildcard 情况除外）。 |
| **uesa** (*yes \| no*; 默认值：**no**) | 未认证紧急服务可访问 (UESA)。<code>no</code> - 表示无法通过此接入点访问未认证紧急服务；<code>yes</code> - 表示可通过此接入点访问更高层的未认证紧急服务。 |
| **venue** (*venue*; 默认值：**unspecified**) | 指定接入点所在的场所。从可用值中选择。一些示例：`venue=business-bank``venue=mercantile-shopping-mall``venue=educational-university-or-college`|

### ANQP 元素 {#anqp-elements}

接入网络查询协议（ANQP）。并非所有必要信息都包含在探测响应和信标帧中。为了让客户端设备在选择要关联的接入点之前获取更多信息，会使用 ANQP。接入点可以在多个 ANQP 元素中存储信息。客户端设备将使用 ANQP 仅查询其感兴趣的信息。这可减少关联前所需的时间。

| 属性 | 描述 |
| :-- | :-- |
| **3gpp-raw** (*十六进制八位字节字符串*; 默认值： ) | 蜂窝网络通告信息 - 国家和网络代码。这有助于 Hotspot 2.0 客户端选择用于访问 3GPP 网络的接入点。有关此字段的格式，请参见 3GPP TS 24.302（附录 H）。如果被查询，此值会在 ANQP 响应中发送。 |
| **3gpp-info**(*number/number*; 默认值： ) | 蜂窝网络通告信息 - 国家和网络代码。这有助于 Hotspot 2.0 客户端选择用于访问 3GPP 网络的接入点。写作 "mcc/mnc"。可以通过逗号分隔来定义多个 mcc/mnc 对。 |
| **authentication-types** (*dns-redirection:`url` \| https-redirection:`url` \| online-enrollment:`url` \| terms-and-conditions:`url`*; 默认值： ) | 此属性仅在 asra 设置为 `yes` 时有效。`url` 的值是可选的，如果选择了 `dns-redirection` 或 `online-enrollment`，则不需要该值。要将 `url` 的值设置为空字符串，请使用双引号。例如：`authentication-types=online-enrollment:""` |
| **connection-capabilities** (*number:number:closed\|open\|unknown*; 默认值： ) | 此选项允许提供有关允许的 IP 协议和端口的信息。此信息可以在 ANQP 响应中提供。第一个数字表示 IP 协议号，第二个数字表示端口号。<code>closed</code> - 如果协议和端口组合不允许，则设置；<code>open</code> - 如果协议和端口组合允许，则设置；<code>unknown</code> - 如果协议和端口组合为开放或关闭，则设置。示例：`connection-capabilities=6:80:open,17:5060:closed` 在接入点上设置这样的值会告知正在连接该接入点的无线客户端：允许 HTTP（6 - TCP，80 - HTTP），不允许 VoIP（17 - UDP；5060 - VoIP）。此属性不会限制或允许使用这些协议和端口，它只向正在连接接入点的站设备提供信息。 |
| **domain-names** (*字符串列表*; 默认值： ) | 零个或多个完全限定域名 (FQDN)，用于指示运营该 Hotspot 的实体。正在连接接入点的站可以请求此 ANQP 属性，并检查其拥有凭据的任何域名是否存在后缀匹配。 |
| **ipv4-availability** (*double-nated \| not-available \| port-restricted \| port-restricted-double-nated \| port-restricted-single-nated \| public \| single-nated \| unknown*; 默认值：**not-available**) | 有关可用 IPv4 地址和访问方式的信息。<code>not-available</code> - 地址类型不可用；<code>public</code> - 公共 IPv4 地址可用；<code>port-restricted</code> - 端口受限 IPv4 地址可用；<code>single-nated</code> - 单个 NAT 的私有 IPv4 地址可用；<code>double-nated</code> - 双重 NAT 的私有 IPv4 地址可用；<code>port-restricted-single-nated</code> - 端口受限 IPv4 地址和单个 NAT 的 IPv4 地址可用；<code>port-restricted-double-nated</code> - 端口受限 IPv4 地址和双重 NAT 的 IPv4 地址可用；<code>unknown</code> - 地址类型的可用性未知。 |
| **ipv6-availability** (*available \| not-available \| unknown*; 默认值：**not-available**) | 有关可用 IPv6 地址和访问方式的信息。<code>not-available</code> - 地址类型不可用；<code>available</code> - 地址类型可用；<code>unknown</code> - 地址类型的可用性未知。 |
| **realms** (*string:eap-sim\|eap-aka\|eap-tls\|not-specified*; 默认值： ) | 有关支持的 realms 及相应 EAP 方法的信息。`realms=example.com:eap-tls,foo.ba:not-specified` |
| **realms-raw** (*十六进制八位字节字符串*; 默认值： ) | 手动设置 NAI Realm ANQP 元素。 |
| **roaming-ois** (*十六进制八位字节字符串*; 默认值： ) | 组织标识符 (OI) 通常是 24 位唯一标识符，例如组织唯一标识符 (OUI) 或公司标识符 (CID)。在某些情况下，OI 会更长，例如 OUI-36。订阅服务提供商 (SSP) 可以通过其 OI 指定。roaming-ois 属性可以包含零个或多个 SSP OI，这些 OI 的网络可通过此 AP 访问。多个 OI 值可以指定为逗号分隔的十六进制字符串。例如：`roaming-ois=f4f5e8f5f4,baa2D00100,baa2d00000` |
| **venue-names** (*string:lang*; 默认值： ) | 场所名称可用于提供有关场所的附加信息。它可以帮助客户端选择合适的接入点。Venue-names 参数由零个或多个包含场所名称和语言代码的对组成：`venue-names=CoffeeShop:eng,TiendaDeCafe:es`Language Code 字段值是从 ISO-639 中选择的两字符或三字符语言代码。 |

#### Realms 原始值 {#realms-raw}

**realms-raw** - 包含十六进制值的字符串列表。每个字符串指定 "NAI Realm Tuple" 的内容，不包括 "NAI Realm Data Field Length" 字段。

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

Hotspot 2.0 规范引入了一些额外的 ANQP 元素。这些元素使用 ANQP 供应商特定元素 ID。以下是可用于更改这些元素的属性。

| 属性 | 描述 |
| :-- | :-- |
| **hotspot20** (*yes \| no*; 默认值：**yes**) | 指示接入点的 Hotspot 2.0 能力。 |
| **hotspot20-dgaf** (*yes \| no*; 默认值：**yes**) | 下游组寻址转发 (DGAF)。设置 DGAF 位值，以指示发往客户端的组播和广播帧是禁用还是启用。<code>yes</code> - 发往客户端的组播和广播帧已启用；<code>no</code> - 发往客户端的组播和广播帧已禁用。要禁用组播和广播帧，请设置 `multicast-helper=full`。 |
| **operational-classes** (*数字列表*; 默认值： ) | 有关同一 ESS 其他可用频段的信息。 |
| **operator-names** (*string:lang*; 默认值： ) | 设置运营商名称。必须为每个运营商名称条目指定语言。Operator-names 参数由零个或多个包含运营商名称和语言代码的二元组组成：`operator-names=BestOperator:eng,MejorOperador:es`Language Code 字段值是从 ISO-639 中选择的两字符或三字符语言代码。 |
| **wan-at-capacity** (*yes \| no*; 默认值：**no**) | 接入点或网络是否已达到最大容量。如果设置为 `yes`，则不允许其他移动设备关联到 AP。 |
| **wan-downlink** (*number*; 默认值：**0**) | WAN 连接的下行速度，以 kbps 为单位设置。如果下行速度未知，请设置为 0。 |
| **wan-downlink-load** (*number*; 默认值：**0**) | 在 `wan-measurement-duration` 期间测量的 WAN 连接下行负载。值为 0 到 255。<code>0</code> - 未知；<code>255</code> - 100%。 |
| **wan-measurement-duration** (*number*; 默认值：**0**) | 测量 wan-downlink-load 和 `wan-uplink-load` 的持续时间。值为 0 到 65535 的数字，表示十分之一秒。<code>0</code> - 未测量；<code>10</code> - 1 秒；<code>65535</code> - 1 小时 49 分钟或更长时间。 |
| **wan-status** (*down \| reserved \| test \| up*; 默认值：**reserved**) | 有关接入点 WAN 连接状态的信息。值 `reserved` 未使用。 |
| **wan-symmetric** (*yes \| no*; 默认值：**no**) | WAN 链路是否对称（上传和下载速度相同）。 |
| **wan-uplink** (*number*; 默认值：**0**) | WAN 连接的上行速度，以 kbps 为单位设置。如果上行速度未知，请设置为 0。 |
| **wan-uplink-load** (*number*; 默认值：**0**) | 在 wan-measurement-duration 期间测量的 WAN 连接上行负载。值为 0 到 255。<code>0</code> - 未知；<code>255</code> - 100%。 |

### 其他属性 {#other-properties}

| 属性 | 描述 |
| :-- | :-- |
| **comment** (*string*；默认值：) | 配置文件的简短描述 |
| **name** (*string*；默认值：) | 互通配置文件的名称。 |

## 使用原生 RadSec 和 Orion Wifi 的配置指南 {#configuration-guide-using-native-radsec-and-orion-wifi}

本指南介绍如何设置 MikroTik 设备，以便将其与 RadSec 代理和 Orion Wifi 配合使用；不过主要配置步骤保持不变，也可用于不同的提供商。

在无线 LAN 控制器与 Orion Wifi 之间建立安全的 RADIUS 连接非常重要。  
Orion Wifi 使用 RADIUS over TLS（RadSec）来确保 AAA 流量的端到端加密。

### 导入 RadSec 证书 {#import-radsec-certificates}

在此步骤中，我们将导入您应从 Orion 下载的 RadSec 证书（在 Orion 门户的 “Manage” 选项卡中，依次进入 “RadSec Certificates” > “Download Orion Certificates” > “Generate Client Certificate Bundle”）。

1) 将证书拖放到 WinBox 中，或者改用 FTP/SFTP 将它们上传到路由器。

确保文件系统中有全部 3 个证书文件（使用 `/file/print` 命令）：

```ros
[admin@MikroTik] > /file/print
Columns: NAME, TYPE, SIZE, LAST-MODIFIED
# NAME                      TYPE       SIZE      LAST-MODIFIED      
0 bw.radsec.cacert.pem      .pem file  716       2025-08-19 15:01:56
1 key.pem                   .pem file  227       2025-08-19 15:01:54
2 cert.pem                  .pem file  895       2025-08-19 15:01:54
```

1) 逐个导入证书文件。

从 RadSec CA 证书开始：

```ros
/certificate/import file-name=bw.radsec.cacert.pem passphrase=""
```

 然后，导入客户端证书（AP 将用于 RadSec 连接）：

```ros
/certificate/import file-name=cert.pem passphrase=""
```

最后，导入客户端证书的密钥：

```ros
/certificate/import file-name=key.pem passphrase=""
```

证书导入后，应如下所示（CA RadSec 证书应受信任，而客户端/AP 证书应带有 “Trusted” 和 “Private-Key” 标记）：

```ros
[admin@MikroTik] > /certificate/print
Flags: K - PRIVATE-KEY; T - TRUSTED
Columns: NAME, COMMON-NAME, SUBJECT-ALT-NAME, SKID
#    NAME                    COMMON-NAME                                      SUBJECT-ALT-NAME                                     SKID                                    
0  T bw.radsec.cacert.pem_0  Buttonwood Radsec CA                                                                                  XXYYXXYYXXYYXXYYXXYYXXYYXXYYXXYYXXYYXXY
1 KT cert.pem_0              xxxxx.yyyyyyyyyyyyyyyyyyy.orion.area120.com  DNS:xxxxx.yyyyyyyyyyyyyyyyyyy.orion.area120.com                                          
```

### 配置 Radius 客户端 {#configure-radius-client}

配置 RadSec 客户端：

```ros
/radius
add address=216.239.32.91 certificate=cert.pem_0 protocol=radsec radsec-timeout=1s500ms service=wireless
```

### 设置 WiFi 接口 {#setup-wifi-interfaces}

1) 创建将执行 802.1x 认证的无线安全配置文件：

```ros
/interface/wifi/security
add authentication-types=wpa2-eap disabled=no eap-accounting=yes management-protection=allowed name=orion_password_profile wps=disable
```

1) 配置 Interworking 配置文件（Hotspot 2.0）：

```ros
/interface/wifi/interworking
add disabled=no domain-names=orion.area120.com hotspot20=yes hotspot20-dgaf=yes internet=yes ipv4-availability=public ipv6-availability=not-available name=interworking network-type=public-chargeable operator-names=Orion:eng \
    realms=orion.area120.com:eap-tls roaming-ois=f4f5e8f5f4,baa2D00100,baa2d00000 venue=business-unspecified venue-names=Orion:eng wan-downlink=50 wan-status=up wan-uplink=50
```

:::warning
请特别注意 “wan-downlink” 和 “wan-uplink”，在此场景中 “50” 的值用作占位符，请务必根据您的设置调整这些值，一些客户端设备会用它来评估是否应加入网络。根据适用情况设置 “venue” – 场所类型、”venue-names” 和其他属性。“domain-names” 应为 Hotspot 2.0 运营商的域名。
:::

1) 配置 SSID，并将安全配置文件和 Interworking 配置文件应用到接口：

```ros
/interface/wifi
set [ find default-name=wifi1 ] configuration.country=Latvia .mode=ap .ssid=Orion disabled=no interworking=interworking security=orion_password_profile
```

确保配置了正确的国家/地区配置文件。在此示例中，我们使用 “wifi1”，但同一命令也适用于其他接口。

:::info
Orion 用于区分网络的 NAS-id 等于系统身份。要调整 nas-id，可以执行 "/system/identity/set name=exampleName"。
:::

## 故障排除 {#troubleshooting}

要检查 RADIUS 消息的状态，可以使用 radius 菜单。  
![](/img/69cd6d8993c7246c.webp)  
或者，也可以通过命令行运行 "/radius/monitor X"，其中 X 是数字 ID；您可以使用 `/radius/print` 查看这些 ID。  
有关更多信息，可以在 "/system/logging/add topics=radius,debug,packet" 下配置额外日志记录。您可以在 ["/log"](../../diagnostics-monitoring-and-troubleshooting/log/index.md) 下查看结果。

要查看活动无线连接，请检查 WiFi 注册表（*`/interface/wifi/registration-table/print`*）。
