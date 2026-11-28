---
title: "WiFi6 互通"
description: "本页介绍 MikroTik RouterOS 的 WiFi6 Interworking，通过 IEEE 802.11u/Hotspot 2.0 标准实现安全的网络发现和接入点选择。文中说明配置方法、interworking profile 设置以及 ANQP 元素，用于增强客户端设备与接入点之间的通信。"
tags:
  - 'wifi'
  - 'interworking'
  - 'hotspot-20'
source: https://manual.mikrotik.com/docs/7.24/wireless/wifi/interworking-for-wifi6
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "wireless/wifi-ac"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## Interworking

互操作是指两个或更多对象协同工作。为获得更好的无线网络体验，必须在接入点和无线客户端设备之间交换网络信息。基本无线信标和探测请求中可包含的信息有限。因此，IEEE 802.11u™-2011（Interworking with External Networks）标准应运而生，该标准规定了设备之间应如何交换信息。网络发现和接入点选择过程可以通过互操作服务增强。无线客户端设备可以依据更多条件选择要关联的网络。

## Hotspot 2.0

Hotspot 2.0 是由 Wi-Fi Alliance 开发并拥有的规范。其设计目的是在连接 Wi-Fi 网络时提供更类似蜂窝网络的体验。为提高无线网络安全，Hotspot 2.0 接入点使用强制 WPA2 认证。Hotspot 2.0 依赖 Interworking，并增加了一些自身属性和流程。

互操作配置根据 IEEE 802.11u 和 Hotspot 2.0 Release 1 规范实现。

:::info
本手册页介绍 **wifi-qcom** 软件包设备的配置。
:::

## 配置属性 {#configuration-properties}

:::info
配置 **Interworking** 有两种方式。

可以将其配置为“`WiFi>Interworking`”选项卡中的“profile”，并应用到 `WiFi>WiFi` 选项卡中的接口：选择 wifi 接口，然后在“Interworking”选项卡的“Interworking”字段中选择该 profile。

也可以直接在接口设置中配置，不使用“profile”：在 `WiFi>WiFi` 选项卡中选择 wifi 接口，然后进入“Interworking”选项卡。
:::

**子菜单：** `/interface/wifi/interworking`

### beacon 和 probe response 中的信息元素 {#information-elements-in-beacon-and-probe-response}

可以通过 Interworking 元素向 beacon 和 probe response 数据包添加一些信息。可以配置 Interworking 元素的以下参数：

| 属性 | 说明 |
| :-- | :-- |
| **esr** (*yes \| no*；默认值：**no**) | Emergency services reachable（ESR）。设置为 `yes` 表示可通过该接入点访问紧急服务。 |
| **hessid** (*MAC address*；默认值：) | Homogenous extended service set identifier（HESSID）。提供对相同外部网络访问的设备属于同一个 homogenous extended service set。该服务集可通过 HESSID 标识，同一服务集中所有接入点上的 HESSID 相同。HESSID 的 6 字节值以 MAC 地址表示。它应全局唯一，因此建议使用服务集中某个接入点的 MAC 地址。 |
| **internet** (*yes \| no*；默认值：**yes**) | 是否可通过该连接访问互联网。该信息包含在 Interworking 元素中。 |
| **network-type** (*emergency-only \| personal-device \| private \| private-with-guest \| public-chargeable \| public-free \| test \| wildcard*；默认值：**wildcard**) | 有关网络访问类型的信息。<ul><li><code>emergency-only</code> - 专用于且仅限于访问紧急服务的网络；</li><li><code>personal-device</code> - 个人设备网络。此类网络的一个示例是连接到打印机的摄像头，从而形成用于打印图片的网络；</li><li><code>private</code> - 面向具有用户账户的用户的网络。通常用于企业中的员工，而非访客；</li><li><code>private-with-guest</code> - 与 private 相同，但提供访客账户；</li><li><code>public-chargeable</code> - 任何愿意付费的人都可以使用的网络。例如，Hotspot 2.0 服务订阅或酒店内的互联网接入；</li><li><code>public-free</code> - 任何人都可免费使用的网络。例如，城市市政网络或机场 Hotspot；</li><li><code>test</code> - 用于测试和实验用途的网络。不用于生产环境；</li><li><code>wildcard</code> - 用于 Wireless 客户端。发送 network type 值为 wildcard 的 probe request 将使所有 Interworking Access Points 响应，无论其实际 network-type 设置如何。</li></ul>客户端发送 probe request 帧时，会将 network-type 设置为其关注的值。它只会收到具有相同值的接入点的回复（wildcard 情况除外）。 |
| **uesa** (*yes \| no*；默认值：**no**) | Unauthenticated emergency service accessible（UESA）。<ul><li><code>no</code> - 表示无法通过该 Access Point 访问未经身份验证的紧急服务；</li><li><code>yes</code> - 表示可通过该 Access Point 访问更高层的未经身份验证的紧急服务。</li></ul> |
| **venue** (*venue*；默认值：**unspecified**) | 指定 Access Point 所在的场所。从可用值中选择。部分示例：<br/><code>venue=business-bank</code><br/><code>venue=mercantile-shopping-mall</code><br/><code>venue=educational-university-or-college</code><br/><br/> |

### ANQP 元素 {#anqp-elements}

Access network query protocol（ANQP）。probe response 和 beacon 帧中并不包含所有必要信息。为使客户端设备在选择要关联的接入点之前获取更多信息，可使用 ANQP。Access Point 可以在多个 ANQP 元素中存储信息。客户端设备将使用 ANQP 仅查询其关注的信息。这会缩短关联前所需的时间。

| 属性 | 说明 |
| :-- | :-- |
| **3gpp-raw** (*octet string in hex*；默认值：) | 蜂窝网络通告信息——国家代码和网络代码。这有助于 Hotspot 2.0 客户端选择用于访问 3GPP 网络的 Access Point。有关该字段的格式，请参阅 3GPP TS 24.302。（Annex H）。如果收到查询，该值会在 ANQP response 中发送。 |
| **3gpp-info**(*number/number*；默认值：) | 蜂窝网络通告信息——国家代码和网络代码。这有助于 Hotspot 2.0 客户端选择用于访问 3GPP 网络的 Access Point。写作“mcc/mnc”。可以定义多个 mcc/mnc 对，并用英文逗号分隔。 |
| **authentication-types** (*dns-redirection:`url` \| https-redirection:`url` \| online-enrollment:`url` \| terms-and-conditions:`url`*；默认值：) | 该属性仅在 asra 设置为 <code>yes</code> 时生效。<code>url</code> 的值是可选的，选择 <code>dns-redirection</code> 或 <code>online-enrollment</code> 时不需要。要将 <code>url</code> 的值设置为空字符串，请使用双引号。例如：<br/><code>authentication-types=online-enrollment:""</code><br/> |
| **connection-capabilities** (*number:number:closed\|open\|unknown*；默认值：) | 该选项允许提供有关允许的 IP 协议和端口的信息。该信息可在 ANQP response 中提供。第一个数字表示 IP 协议号，第二个数字表示端口号。<ul><li><code>closed</code> - 当协议和端口组合不被允许时设置；</li><li><code>open</code> - 当协议和端口组合被允许时设置；</li><li><code>unknown</code> - 当协议和端口组合可能为开放或关闭时设置。</li></ul>示例：<br/><code>connection-capabilities=6:80:open,17:5060:closed</code><br/><br/>在 Access Point 上设置这样的值，会告知正在连接 Access Point 的 Wireless 客户端：HTTP（6 - TCP，80 - HTTP）被允许，VoIP（17 - UDP；5060 - VoIP）不被允许。<br/>该属性不会限制或允许这些协议和端口的使用，它仅向正在连接 Access Point 的 station 设备提供信息。 |
| **domain-names** (*list of strings*；默认值：) | 零个或多个完全限定域名（FQDN），用于指示运营 Hotspot 的实体。正在连接 Access Point 的 station 可以请求该 ANQP 属性，并检查其具有凭据的任何域名是否存在后缀匹配。 |
| **ipv4-availability** (*double-nated \| not-available \| port-restricted \| port-restricted-double-nated \| port-restricted-single-nated \| public \| single-nated \| unknown*；默认值：**not-available**) | 有关可用 IPv4 地址和访问的信息。<ul><li><code>not-available</code> - 地址类型不可用；</li><li><code>public</code> - 公共 IPv4 地址可用；</li><li><code>port-restricted</code> - 端口受限的 IPv4 地址可用；</li><li><code>single-nated</code> - 单次 NAT 的私有 IPv4 地址可用；</li><li><code>double-nated</code> - 双重 NAT 的私有 IPv4 地址可用；</li><li><code>port-restricted-single-nated</code> - 端口受限的 IPv4 地址和单次 NAT 的 IPv4 地址可用；</li><li><code>port-restricted-double-nated</code> - 端口受限的 IPv4 地址和双重 NAT 的 IPv4 地址可用；</li><li><code>unknown</code> - 地址类型的可用性未知。</li></ul> |
| **ipv6-availability** (*available \| not-available \| unknown*；默认值：**not-available**) | 有关可用 IPv6 地址和访问的信息。<ul><li><code>not-available</code> - 地址类型不可用；</li><li><code>available</code> - 地址类型可用；</li><li><code>unknown</code> - 地址类型的可用性未知。</li></ul> |
| **realms** (*string:eap-sim\|eap-aka\|eap-tls\|not-specified*；默认值：) | 有关支持的 realm 和相应 EAP 方法的信息。<br/><code>realms=example.com:eap-tls,foo.ba:not-specified</code><br/> |
| **realms-raw** (*octet string in hex*；默认值：) | 手动设置 NAI Realm ANQP 元素。 |
| **roaming-ois** (*octet string in hex*；默认值：) | Organization identifier（OI）通常是 24 位唯一标识符，例如 organizationally unique identifier（OUI）或 company identifier（CID）。在某些情况下，OI 更长，例如 OUI-36。subscription service provider（SSP）可通过其 OI 指定。roaming-ois 属性可以包含零个或多个 SSP OI，其网络可通过该 AP 访问。多个 OI 值可以指定为以英文逗号分隔的十六进制字符串。例如：<br/><code>roaming-ois=f4f5e8f5f4,baa2D00100,baa2d00000</code><br/> |
| **venue-names** (*string:lang*；默认值：) | Venue name 可用于提供有关场所的附加信息。它可以帮助客户端选择合适的 Access Point。Venue-names 参数由零个或多个包含 Venue Name 和 Language Code 的对组成：<br/><code>venue-names=CoffeeShop:eng,TiendaDeCafe:es</code><br/><br/>Language Code 字段值是从 ISO-639 中选择的两字符或三字符语言代码。 |

#### Realms 原始数据 {#realms-raw}

**realms-raw** - 包含十六进制值的字符串列表。每个字符串指定“NAI Realm Tuple”的内容，不包括“NAI Realm Data Field Length”字段。

每个 hex 编码字符串必须由以下字段组成：

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

| 属性 | 说明 |
| :-- | :-- |
| **hotspot20** (*yes \| no*；默认值：**yes**) | 指示 Access Point 的 Hotspot 2.0 能力。 |
| **hotspot20-dgaf** (*yes \| no*；默认值：**yes**) | 下游组寻址转发（Downstream Group-Addressed Forwarding，DGAF）。设置 DGAF 位的值，以指示发往客户端的组播和广播帧是禁用还是启用。<ul><li><code>yes</code> - 发往客户端的组播和广播帧已启用；</li><li><code>no</code> - 发往客户端的组播和广播帧已禁用。</li></ul>要禁用组播和广播帧，请设置 <code>multicast-helper=full</code>。 |
| **operational-classes** (*数字列表*；默认值：) | 关于同一 ESS 的其他可用频段的信息。 |
| **operator-names** (*string:lang*；默认值：) | 设置运营商名称。必须为每个运营商名称条目指定语言。operator-names 参数由零个或多个二元组组成，每个二元组包含 Operator Name 和 Language Code：<br/><code>operator-names=BestOperator:eng,MejorOperador:es</code><br/><br/>Language Code 字段值是从 ISO-639 中选择的两个或三个字符的语言代码。 |
| **wan-at-capacity** (*yes \| no*；默认值：**no**) | Access Point 或网络是否达到最大容量。如果设置为 `yes`，则不允许其他移动设备关联到 AP。 |
| **wan-downlink** (*number*；默认值：**0**) | WAN 连接的下行速度，单位为 kbps。如果下行速度未知，请设置为 0。 |
| **wan-downlink-load** (*number*；默认值：**0**) | 在 <code>wan-measurement-duration</code> 期间测得的 WAN 连接下行负载。取值范围为 0 到 255。<ul><li><code>0</code> - 未知；</li><li><code>255</code> - 100%。</li></ul> |
| **wan-measurement-duration** (*number*；默认值：**0**) | 测量 wan-downlink-load 和 <code>wan-uplink-load</code> 的持续时间。该值为 0 到 65535 的数字，表示十分之一秒。<ul><li><code>0</code> - 不测量；</li><li><code>10</code> - 1 秒；</li><li><code>65535</code> - 1 小时 49 分钟或更长。</li></ul> |
| **wan-status** (*down \| reserved \| test \| up*；默认值：**reserved**) | 关于 Access Point 的 WAN 连接状态的信息。值 `reserved` 不使用。 |
| **wan-symmetric** (*yes \| no*；默认值：**no**) | WAN 链路是否对称（上传和下载速度相同）。 |
| **wan-uplink** (*number*；默认值：**0**) | WAN 连接的上行速度，单位为 kbps。如果上行速度未知，请设置为 0。 |
| **wan-uplink-load** (*number*；默认值：**0**) | 在 wan-measurement-duration 期间测得的 WAN 连接上行负载。取值范围为 0 到 255。<ul><li><code>0</code> - 未知；</li><li><code>255</code> - 100%。</li></ul> |

### 其他属性 {#other-properties}

| 属性 | 说明 |
| :-- | :-- |
| **comment** (*string*; Default: ) | 配置的简短说明 |
| **name** (*string*; Default: ) | Interworking 配置的名称。 |

## 使用原生 RadSec 和 Orion Wifi 的配置指南 {#configuration-guide-using-native-radsec-and-orion-wifi}

本指南介绍如何设置 MikroTik 设备，以便将其与 RadSec 代理和 Orion Wifi 一起使用，不过主要配置步骤保持不变，也适用于其他提供商。

在无线 LAN 控制器和 Orion Wifi 之间建立安全的 RADIUS 连接非常重要。  
Orion Wifi 使用 RADIUS over TLS（RadSec）来确保 AAA 流量的端到端加密。

### 导入 RadSec 证书 {#import-radsec-certificates}

在此步骤中，将导入应从 Orion 下载的 RadSec 证书（从 Orion 门户的“Manage”选项卡中，在“RadSec Certificates” > “Download Orion Certificates” > “Generate Client Certificate Bundle”下）。

1) 将证书拖放到 WinBox 中，或使用 FTP/SFTP 将其上传到路由器。

确保文件系统中包含全部 3 个证书文件（使用 `/file/print` 命令）：

```ros
[admin@MikroTik] > /file/print
Columns: NAME, TYPE, SIZE, LAST-MODIFIED
# NAME                      TYPE       SIZE      LAST-MODIFIED      
0 bw.radsec.cacert.pem      .pem file  716       2025-08-19 15:01:56
1 key.pem                   .pem file  227       2025-08-19 15:01:54
2 cert.pem                  .pem file  895       2025-08-19 15:01:54
```

1) 逐个导入证书文件。

首先导入 RadSec CA 证书：

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

证书导入后，应如下所示（CA RadSec 证书应为受信任状态，而客户端/AP 证书应标记为“Trusted”和“Private-Key”）：

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

1) 创建执行 802.1x 认证的无线安全配置：

```ros
/interface/wifi/security
add authentication-types=wpa2-eap disabled=no eap-accounting=yes management-protection=allowed name=orion_password_profile wps=disable
```

1) 配置 interworking 配置（hotspot 2.0）：

```ros
/interface/wifi/interworking
add disabled=no domain-names=orion.area120.com hotspot20=yes hotspot20-dgaf=yes internet=yes ipv4-availability=public ipv6-availability=not-available name=interworking network-type=public-chargeable operator-names=Orion:eng \
    realms=orion.area120.com:eap-tls roaming-ois=f4f5e8f5f4,baa2D00100,baa2d00000 venue=business-unspecified venue-names=Orion:eng wan-downlink=50 wan-status=up wan-uplink=50
```

:::warning
特别注意“wan-downlink”和“wan-uplink”，在此场景中，值“50”用作占位符，请根据你的设置调整这些值，某些客户端设备会使用它们来评估是否加入网络。按需设置“venue”（场所类型）、“venue-names”和其他属性。“domain-names”应为 hotspot 2.0 Operator 的域名。
:::

1) 配置 SSID，并将安全和 interworking 配置应用到接口：

```ros
/interface/wifi
set [ find default-name=wifi1 ] configuration.country=Latvia .mode=ap .ssid=Orion disabled=no interworking=interworking security=orion_password_profile
```

确保配置了正确的国家配置。本示例使用“wifi1”，但相同命令也适用于其他接口。

:::info
Orion 用于区分网络的 NAS-id 等于系统标识。要调整 nas-id，可执行“/system/identity/set name=exampleName”。
:::

## 故障排除 {#troubleshooting}

要检查 RADIUS 消息的状态，可以使用 radius 菜单。  
![](/img/69cd6d8993c7246c.webp)  
也可以通过命令行运行 `/radius/monitor X`，其中 X 是数字 ID，可以使用 `/radius/print` 查看 ID。  
有关更多信息，可以在 `/system/logging/add topics=radius,debug,packet` 下配置额外的日志记录。可以在 [“/log”](/docs/diagnostics-monitoring-and-troubleshooting/log) 下查看结果。

要查看活动的无线连接，请检查 WiFi 注册表（*`/interface/wifi/registration-table/print`*）。
