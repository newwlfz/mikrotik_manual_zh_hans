---
title: "CAPsMAN"
description: "本页介绍 RouterOS 中的 CAPsMAN（Centralized Access Point Management），涵盖无线控制器设置的配置，包括 AAA 认证、RADIUS 服务器集成、用于客户端管理的访问列表以及安全配置文件。本页提供 MAC 地址格式、缓存间隔和 RADIUS 计费更新等详细参数，并给出跨多个 SSID 进行 radius 认证的示例配置。"
tags:
  - 'caps-man'
  - 'radius'
  - 'access-list'
source: https://manual.mikrotik.com/docs/7.24/wireless/abgn/capsman
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

:::info
这是旧版 CAPsMAN（`/caps-man`），供运行 `wireless` 软件包（`/interface/wireless`）的设备使用。对于运行 `wifi-qcom` 或 `wifi-qcom-ac` 软件包（`/interface/wifi` 菜单）的设备，请参阅 [WiFi CAPsMAN](/docs/wireless/abgn/capsman)。两者相互独立：WiFi CAP 只能加入 WiFi CAPsMAN，旧版 CAP 只能加入旧版 CAPsMAN。
:::

本节介绍 CAPsMAN 无线控制器文档。使用它可为受支持的 RouterOS 无线设备配置集中式接入点管理。

<DocCardList />

## CAPsMAN AAA

配置 CAPsMAN AAA 功能的设置位于 `/caps-man/aaa` 菜单中：

| 属性 | 说明 |
| :-- | :-- |
| **mac-format** (*string*；默认值：**XX:XX:XX:XX:XX:XX**) | 控制接入点如何在 MAC 身份验证和 MAC 计费 RADIUS 请求的 User-Name 属性中编码客户端的 MAC 地址。 |
| **mac-mode** (*as-username \| as-username-and-password*；默认值：**as-username**) | 默认情况下，接入点在 MAC 身份验证期间发送 Access-Request 时使用空密码。当该属性设置为 as-username-and-password 时，接入点将对 User-Password 属性使用与 User-Name 属性相同的值。 |
| **mac-caching** (*disabled \| time-interval*；默认值：**disabled**) | 如果该值设置为时间间隔，接入点将在指定时间内缓存 RADIUS MAC 身份验证响应，并且当存在匹配的缓存条目时不会联系 RADIUS 服务器。值 disabled 将禁用缓存。接入点将始终联系 RADIUS 服务器。 |
| **interim-update** (*disabled \| time-interval*；默认值：**disabled**) | 使用 RADIUS 计费时，接入点会定期向 RADIUS 服务器发送计费信息更新。该属性指定默认更新间隔，RADIUS 服务器可使用 [Acct-Interim-Interval](#capsman-aaa) 属性覆盖该值。 |
| **called-format** (*mac \| mac:ssid \| ssid*；默认值：**mac:ssid**) | “called-id”标识符传递给 RADIUS 的格式。配置 radius 服务器客户端时，可以指定“called-id”以区分多个条目。 |

### 示例 {#example}

假设其余设置已完成，仅剩“Security”部分未配置。

#### 使用单台服务器的 Radius 认证 {#radius-authentication-with-one-server}

1. 创建 CAPsMAN 安全配置。

2. 配置 Radius 服务器客户端。

3. 将配置分配到主配置文件（或直接分配到 CAP 本身）。

```ros
/caps-man/security/add authentication-types=wpa2-eap eap-methods=passthrough encryption=aes-ccm group-encryption=aes-ccm name=radius
/radius/add address=x.x.x.x secret=SecretUserPass service=wireless
/caps-man/configuration/set security=radius
```

#### 为每个 SSID 使用不同 Radius 服务器的 Radius 认证 {#radius-authentication-with-different-radius-servers-for-each-ssid}

1. 创建 CAPsMAN 安全配置。

2. 配置 AAA 设置。

3. 配置 Radius 服务器客户端。

4. 将配置分配给主配置文件（或直接分配给 CAP 本身）。

```ros
/caps-man/security/add authentication-types=wpa2-eap eap-methods=passthrough encryption=aes-ccm group-encryption=aes-ccm name=radius 
/caps-man/aaa/set called-format=ssid 
/radius/add address=x.x.x.x secret=SecretUserPass service=wireless called-id=SSID1 
/radius/add address=y.y.y.y secret=SecretUserPass service=wireless called-id=SSID2 
/caps-man/configuration/set security=radius
```

现在，所有连接到 ssid=**SSID1** 的 CAP 客户端都会将其 radius 认证请求发送到 **x.x.x.x**，所有连接到 ssid=**SSID2** 的 CAP 客户端都会将其 radius 认证请求发送到 **y.y.y.y**

## CAPsMAN 访问控制列表 {#capsman-access-list}

CAPsMAN 上的访问列表是有序的规则列表，用于允许/拒绝客户端连接到 CAPsMAN 控制下的任意 CAP。当客户端尝试连接到受 CAPsMAN 控制的 CAP 时，CAP 会将该请求转发给 CAPsMAN。作为注册过程的一部分，CAPsMAN 会查询访问列表，以确定是否允许客户端连接。访问列表的默认行为是允许连接。

访问列表规则会逐条处理，直到找到匹配规则。随后执行匹配规则中的动作。如果动作指定应接受该客户端，则接受该客户端，并可能使用访问列表规则中指定的参数覆盖其默认连接参数。

访问列表在 `/caps-man/access-list` 菜单中配置。访问列表规则有以下参数：

- 客户端匹配参数：
  - address - 客户端的 MAC 地址。
  - mask - 比较客户端地址时应用的 MAC 地址掩码。
  - interface - 可选接口，用于与客户端实际连接的接口进行比较。
  - time - 规则匹配的时间和星期。
  - signal-range - 规则匹配时客户端信号必须处于的范围。
  - allow-signal-out-of-range - 允许客户端信号始终或在一定时间间隔内超出范围的选项。
- 动作参数 - 指定客户端匹配时采取的动作：
  - accept - 接受该客户端。
  - reject - 拒绝该客户端。
  - query-radius - 查询 RADIUS 服务器，确认是否允许特定客户端连接。
- 连接参数：
  - ap-tx-limit - 向客户端方向的 tx 速度限制。
  - client-tx-limit - 向 AP 方向的 tx 速度限制（仅适用于 RouterOS 客户端）。
  - client-to-client-forwarding - 指定是否允许将来自该客户端的数据转发到连接到同一接口的其他客户端。
  - private-passphrase - *[敏感参数](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* 使用某种 PSK 认证算法时，该客户端使用的 PSK 口令。
  - radius-accounting - 指定当该客户端完成 RADIUS 认证时，是否使用 RADIUS 流量计费。
  - vlan-mode - VLAN 标记模式，指定来自客户端的流量是否应被打上标记（发往客户端时是否应移除标记）。
  - vlan-id - 执行 VLAN 标记时使用的 VLAN ID。

## CAPsMAN 信道 {#capsman-channel}

信道组设置用于配置与无线电信道相关的设置列表，例如无线频段、频率、Tx Power、扩展信道和带宽。

信道组设置在 Channels profile 菜单 `/caps-man/channels` 中配置。

| Property | Description |
| :-- | :-- |
| **band** (*2ghz-b \| 2ghz-b/g \| 2ghz-b/g/n \| 2ghz-onlyg \| 2ghz-onlyn \| 5ghz-a \| 5ghz-a/n \| 5ghz-onlyn*; Default: ) | 根据无线网卡的硬件能力定义工作的无线电频段和模式 |
| **comment** (*string*; Default: ) | Channel Group profile 的简短描述 |
| **extension-channel** (*Ce \| Ceee \| eC \| eCee \| eeCe \| eeeC \| disabled*; Default: ) | 扩展信道配置。（例如，Ce = 扩展信道位于 Control channel 之上，eC = 扩展信道位于 Control channel 之下） |
| **frequency** (*integer [0..4294967295]*; Default: ) | AP 工作的信道频率值，单位为 MHz。 |
| **name** (*string*; Default: ) | Channel Group Profile 的描述性名称 |
| **tx-power** (*integer [-30..40]*; Default: ) | CAP 接口的 TX Power（针对整个接口，而非单个链），单位为 dBm。不能设置为高于国家法规或接口允许的值。默认使用国家或接口允许的最大值。 |
| **width** (; Default: ) | 设置 Channel Width，单位为 MHz。（例如 20、40） |
| **save-selected** (; Default: **yes**) | 为 CAP Radio 保存所选信道——CAP 重新连接到 CAPsMAN 后将选择该信道，并在该 CAP 完成信道 Re-optimize 之前一直使用它。 |

## CAPsMAN 配置 {#capsman-configuration}

配置 profile 允许将预定义的“顶层”主设置应用到正在配置的 CAP radio。

Configuration Profiles 在 `/caps-man/configuration` 菜单中配置：

| Property | Description |
| :-- | :-- |
| **channel** (*list*; Default: ) | 从 Channel 名称中获取的用户定义列表（`/caps-man/channels`） |
| **channel.band** (*2ghz-b \| 2ghz-b/g \| 2ghz-b/g/n \| 2ghz-onlyg \| 2ghz-onlyn \| 5ghz-a \| 5ghz-a/n \| 5ghz-onlyn \| 5ghz-a/n/ac \| 5ghz-only-ac*; Default: ) | 定义一组使用的信道。 |
| **channel.control-channel-width** (*40mhz-turbo \| 20mhz \| 10mhz \| 5mhz*; Default: ) | 定义一组使用的信道带宽。 |
| **channel.extension-channel** (*Ce \| Ceee \| eC \| eCee \| eeCe \| eeeC \| xx \| xxxx \| disabled*; Default: ) | 扩展信道配置。（例如，Ce = 扩展信道位于 Control channel 之上，eC = 扩展信道位于 Control channel 之下） |
| **channel.frequency** (*integer [0..4294967295]*; Default: ) | AP 工作的信道频率值，单位为 MHz。如果留空，CAPsMAN 将自动确定占用最少的最佳频率。 |
| **channel.reselect-interval** (*time [00:00:00]; [00:00:00..00:00:00]*; Default: ) | 选择占用最少频率的间隔，可定义为随机间隔，例如“30m..60m”。仅在 **channel.frequency** 留空时生效。 |
| **channel.save-selected** (*yes \| no*; Default: **no**) | 如果自动选择信道频率并使用 **channel.reselect-interval**，则保存最后选择的频率。 |
| **channel.secondary-frequency** (*integer [0..4294967295]*; Default: **auto**) | 指定用于 80+80MHz 配置的第二个频率。将其设置为 **Disabled** 可禁用 80+80MHz 能力。 |
| **channel.skip-dfs-channels** (*yes \| no*; Default: **no**) | 如果 **channel.frequency** 留空，选择时将跳过 DFS 信道 |
| **channel.tx-power** (*integer [-30..40]*; Default: ) | CAP 接口的 TX Power（针对整个接口，而非单个链），单位为 dBm。不能设置为高于国家法规或接口允许的值。默认使用国家或接口允许的最大值。 |
| **channel.width** (; Default: ) | 设置 Channel Width，单位为 MHz。 |
| **comment** (*string*; Default: ) | Configuration profile 的简短描述 |
| **country** (*name of the country \| no\_country\_set*; Default: **no\_country\_set**) | 限制可用频段、频率以及每个频率的最大发射功率。还指定 **scan-list** 的默认值。值 *no\_country\_set* 是一组符合 FCC 要求的信道。 |
| **datapath** (*list*; Default: ) | 从 Datapath 名称中获取的用户定义列表（`/caps-man/datapath`） |
| **datapath.bridge** (*list*; Default: ) | 特定接口应作为端口自动添加到的网桥。仅当未使用 local-forwarding 时需要。 |
| **datapath.bridge-cost** (*integer [1..*200000000*]*; Default: ) | 添加为网桥端口时使用的网桥端口 cost |
| **datapath.bridge-horizon** (*integer [0..4294967295]*; Default: ) | 添加为网桥端口时使用的网桥 horizon |
| **datapath.client-to-client-forwarding** (*yes \| no*; Default: **no**) | 控制是否允许连接到接口的无线客户端之间进行 client-to-client 转发。在 local forwarding 模式下，该功能由 CAP 执行，否则由 CAPsMAN 执行 |
| **datapath.interface-list** (; Default: ) |  |
| **datapath.l2mtu** (; Default: ) | 设置 Layer2 MTU 大小 |
| **datapath.local-forwarding** (*yes \| no*; Default: **no**) | 控制转发模式。如果禁用，所有 L2 和 L3 数据都将转发到 CAPsMAN，并且仅在此时作出进一步转发决策。**注意**，如果禁用，请确保参与同一广播域的每个 CAP 接口 MAC Address 都是唯一的（包括本地 MAC，例如 Bridge-MAC）。 |
| **datapath.mtu** (; Default: ) | 设置 MTU 大小 |
| **datapath.openflow-switch** (; Default: ) | 启用时要将接口添加到的 OpenFlow 交换机端口 |
| **datapath.vlan-id** (*integer [1..4095]*; Default: ) | 当 vlan-mode 启用 VLAN 标记使用时，分配给接口的 VLAN ID |
| **datapath.vlan-mode** (*use-service-tag \| use-tag*; Default: ) | 启用并指定要分配给接口的 VLAN tag 类型（使所有接收到的数据都带上 VLAN tag，并允许接口仅发送带有指定 tag 的数据） |
| **disconnect-timeout** (; Default: ) |  |
| **distance** (; Default: ) |  |
| **frame-lifetime** (; Default: ) |  |
| **guard-interval** (*any \| long*; Default: **any**) | 是否允许使用短 guard interval（请参阅 802.11n MCS 规范，了解这可能如何影响吞吐量）。“any”将根据数据速率使用短或长 guard interval，“long”将仅使用长 guard interval。 |
| **hide-ssid** (*yes \| no*; Default: ) | <ul><li><em>yes</em> - AP 不在 beacon 帧中包含 SSID，并且不回复具有广播 SSID 的 probe 请求。</li><li><em>no</em> - AP 在 beacon 帧中包含 SSID，并回复具有广播 SSID 的 probe 请求。</li></ul>该属性仅在 AP 模式下生效。将其设置为 <em>yes</em> 可以将该网络从某些客户端软件显示的无线网络列表中移除。更改此设置不会提高无线网络的安全性，因为 SSID 包含在 AP 发送的其他帧中。 |
| **hw-protection-mode** (; Default: ) |  |
| **hw-retries** (; Default: ) |  |
| **installation** (*any \| indoor \| outdoor*; Default: **any**) |  |
| **keepalive-frames** (*enabled \| disabled*; Default: **enabled**) |  |
| **load-balancing-group** (*string*; Default: ) | 将接口标记到负载均衡组。要使客户端连接到该组中的接口，该接口已连接的客户端数量应与该组中所有其他接口相同或更少。适用于 CAP 覆盖范围大多重叠的环境。 |
| **max-sta-count** (*integer [1..2007]*; Default: ) | 最大关联客户端数量。 |
| **mode** (; Default: **ap**) | 设置工作模式。当前仅支持 ap。 |
| **multicast-helper** (*default \| disabled \| full*; Default: **default**) | 设置为 full 时，组播数据包将以单播目标 MAC 地址发送，从而解决无线链路上的组播问题。此选项应仅在接入点上启用，客户端应配置为 <strong>station-bridge</strong> 模式。<ul><li>disabled - 禁用 helper，并以组播目标 MAC 地址发送组播数据包</li><li>full - 在发送前将所有组播数据包 MAC 地址更改为单播 MAC 地址</li><li>default - 当前设置为 <em>disabled</em> 的默认选择。该值可能在未来版本中更改。</li></ul> |
| **name** (*string*; Default: ) | Configuration Profile 的描述性名称 |
| **rates** (; Default: ) | 从 Rates 名称中获取的用户定义列表（`/caps-man/rates`） |
| **rates.basic** (*1Mbps \| 2Mbps \| 5.5Mbps \| 6Mbps \| 9Mbps \| 11Mbps \| 12Mbps \| 18Mbps \| 24Mbps \| 36Mbps \| 48Mbps \| 54Mbps*; Default: ) |  |
| **rates.supported** (*1Mbps \| 2Mbps \| 5.5Mbps \| 6Mbps \| 9Mbps \| 11Mbps \| 12Mbps \| 18Mbps \| 24Mbps \| 36Mbps \| 48Mbps \| 54Mbps*; Default: ) |  |
| **rates.ht-basic-mcs** (*list of (mcs-0 \| mcs-1 \| mcs-2 \| mcs-3 \| mcs-4 \| mcs-5 \| mcs-6 \| mcs-7 \| mcs-8 \| mcs-9 \| mcs-10 \| mcs-11 \| mcs-12 \| mcs-13 \| mcs-14 \| mcs-15 \| mcs-16 \| mcs-17 \| mcs-18 \| mcs-19 \| mcs-20 \| mcs-21 \| mcs-22 \| mcs-23)*; Default: **mcs-0; mcs-1; mcs-2; mcs-3; mcs-4; mcs-5; mcs-6; mcs-7**) | 每个连接的客户端都必须支持的[调制与编码方案](http://en.wikipedia.org/wiki/IEEE_802.11n-2009#Data_rates)。有关 MCS 规范，请参阅 802.11n。 |
| **rates.ht-supported-mcs** (*list of (mcs-0 \| mcs-1 \| mcs-2 \| mcs-3 \| mcs-4 \| mcs-5 \| mcs-6 \| mcs-7 \| mcs-8 \| mcs-9 \| mcs-10 \| mcs-11 \| mcs-12 \| mcs-13 \| mcs-14 \| mcs-15 \| mcs-16 \| mcs-17 \| mcs-18 \| mcs-19 \| mcs-20 \| mcs-21 \| mcs-22 \| mcs-23)*; Default: **mcs-0; mcs-1; mcs-2; mcs-3; mcs-4; mcs-5; mcs-6; mcs-7; mcs-8; mcs-9; mcs-10; mcs-11; mcs-12; mcs-13; mcs-14; mcs-15; mcs-16; mcs-17; mcs-18; mcs-19; mcs-20; mcs-21; mcs-22; mcs-23**) | 该设备通告为支持的[调制与编码方案](http://en.wikipedia.org/wiki/IEEE_802.11n-2009#Data_rates)。有关 MCS 规范，请参阅 802.11n。 |
| **rates.vht-basic-mcs** (*none \| MCS 0-7 \| MCS 0-8 \| MCS 0-9*; Default: **none**) | 每个连接的客户端都必须支持的<a href="https://en.wikipedia.org/wiki/IEEE_802.11ac#Data_rates_and_speed" target="_blank" rel="noopener noreferrer">调制与编码方案</a>。有关 MCS 规范，请参阅 802.11ac。可以为每个 Spatial Stream 设置 MCS 间隔 <br/><ul><li><em>none</em> - 不使用所选 Spatial Stream</li><li><em>MCS 0-7</em> - 客户端必须支持 MCS-0 至 MCS-7</li><li><em>MCS 0-8</em> - 客户端必须支持 MCS-0 至 MCS-8</li><li><em>MCS 0-9</em> - 客户端必须支持 MCS-0 至 MCS-9</li></ul> |
| **rates.vht-supported-mcs** (*none \| MCS 0-7 \| MCS 0-8 \| MCS 0-9*; Default: **none**) | 该设备通告为支持的<a href="https://en.wikipedia.org/wiki/IEEE_802.11ac#Data_rates_and_speed" target="_blank" rel="noopener noreferrer">调制与编码方案</a>。有关 MCS 规范，请参阅 802.11ac。可以为每个 Spatial Stream 设置 MCS 间隔 <br/><ul><li><em>none</em> - 不使用所选 Spatial Stream</li><li><em>MCS 0-7</em> - 设备将通告支持 MCS-0 至 MCS-7</li><li><em>MCS 0-8</em> - 设备将通告支持 MCS-0 至 MCS-8</li><li><em>MCS 0-9</em> - 设备将通告支持 MCS-0 至 MCS-9</li></ul> |
| **rx-chains** (*list of integer [0..3]*; Default: **0**) | 使用哪些天线进行接收。 |
| **security** (*string*; Default: **none**) | 来自 `/caps-man/security` 的安全配置名称 |
| **security.authentication-types** (*list of string*; Default: **none**) | 指定 Authentication 类型，可选 **wpa-psk**、**wpa2-psk**、**wpa-eap** 或 **wpa2-eap** |
| **security.disable-pmkid** (; Default: ) |  |
| **security.eap-methods** (*eap-tls \| passthrough*; Default: **none**) | <ul><li>eap-tls - 使用内置 EAP TLS 认证。</li><li>passthrough - 接入点将认证过程转发到 RADIUS 服务器。</li></ul> |
| **security.eap-radius-accounting** (; Default: ) | 指定当该客户端完成 RADIUS 认证时是否使用 RADIUS 流量计费 |
| **security.encryption** (*aes-ccm \| tkip*; Default: ) | 设置使用的单播加密算法类型 |
| **security.group-encryption** (*aes-ccm \| tkip*; Default: **aes-ccm**) | 接入点通告其中一种 cipher，可以选择多个值。接入点使用它加密所有广播和组播帧。客户端仅尝试连接到使用指定 group cipher 之一的接入点。<ul><li>tkip - Temporal Key Integrity Protocol，一种加密协议，与旧版 WEP 设备兼容，但经过增强以修正 WEP 的部分缺陷。</li><li>aes-ccm - 更安全的 WPA 加密协议，基于可靠的 AES（Advanced Encryption Standard）。不含旧版 WEP 的网络应仅使用此 cipher。</li></ul> |
| **security.group-key-update** (*time: 30s..1h*; Default: **5m**) | 控制接入点更新 group key 的频率。该密钥用于加密所有广播和组播帧。该属性仅对接入点生效。 |
| **security.passphrase** (*string*; Default: ) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | WPA 或 WPA2 预共享密钥 |
| **security.tls-certificate** (*none \| name*; Default: ) | 当 **security.tls-mode** 设置为 **no-certificates** 以外的值时，接入点始终需要证书。 |
| **security.tls-mode** (*verify-certificate \| dont-verify-certificate \| no-certificates \| verify-certificate-with-crl*; Default: ) | 该属性仅在 <strong>security.eap-methods</strong> 包含 <em>eap-tls</em> 时生效。<ul><li>verify-certificate - 要求远程设备具有有效证书。检查其是否由已知证书颁发机构签名。不执行额外的身份验证。证书可以包含有关其有效时间段的信息。如果路由器时间和日期不正确，可能会因为路由器时钟不在该时间段内而拒绝有效证书。另请参阅 <a href="/docs/authentication-authorization-accounting/certificates">Certificates</a> 配置。</li><li>dont-verify-certificate - 不检查远程设备的证书。接入点不会要求客户端提供证书。</li><li>no-certificates - 不使用证书。TLS 会话使用 2048 位匿名 Diffie-Hellman 密钥交换建立。</li><li>verify-certificate-with-crl - 与 verify-certificate 相同，但还会通过检查 Certificate Revocation List 来检查证书是否有效。</li></ul> |
| **ssid** (*string (0..32 chars)*; Default: ) | SSID（service set identifier）是在 beacon 中广播、用于标识无线网络的名称。 |
| **tx-chains** (*list of integer [0..3]*; Default: **0**) | 使用哪些天线进行发送。 |

## CAPsMAN 数据路径 {#capsman-datapath}

datapath 设置控制与数据转发相关的方面。在 CAPsMAN 中，datapath 设置可在 datapath 配置菜单 `/caps-man/datapath` 中配置，也可直接在配置配置文件或接口菜单中作为带 **datapath.** 前缀的设置项配置。

主要有 2 种转发模式：

- 本地转发模式，CAP 在本地将数据转发至无线接口以及从无线接口转发出去。
- 管理器转发模式，CAP 将通过无线接收的所有数据发送给 CAPsMAN，并且只发送从 CAPsMAN 接收到的无线数据。在该模式下，即使是客户端到客户端的转发也由 CAPsMAN 控制并执行。

转发模式按接口配置。也就是说，如果一个 CAP 提供 2 个无线接口，则一个接口可以配置为本地转发模式，另一个接口可以配置为管理器转发模式。Virtual-AP 接口也是如此，每个接口都可以具有与主接口或其他 Virtual-AP 接口不同的转发模式。

大多数 datapath 设置仅在管理器转发模式下使用，因为在本地转发模式下，CAPsMAN 无法控制数据转发。

有以下 datapath 设置：

- bridge -- 启用时，要将接口添加为网桥端口的网桥接口。
- bridge-cost -- 添加为网桥端口时使用的网桥端口开销。
- bridge-horizon -- 添加为网桥端口时使用的网桥 horizon。
- client-to-client-forwarding -- 控制是否允许连接到该接口的无线客户端之间进行客户端到客户端转发。在本地转发模式下，该功能由 CAP 执行，否则由 CAPsMAN 执行。
- local-forwarding -- 控制转发模式。
- openflow-switch -- 启用时，要将接口添加为端口的 OpenFlow 交换机。
- vlan-id -- 当 vlan-mode 启用 VLAN 标记时，分配给接口的 VLAN ID。
- vlan-mode -- VLAN 标记模式指定是否应为接口分配 VLAN 标记（使所有接收到的数据都加上 VLAN 标记，并允许接口仅发送带有指定标记的数据）。

## CAPsMAN 接口 {#capsman-interface}

CAPsMAN 接口在 `/caps-man/interface` 菜单中管理：

```ros
[admin@CM] > /caps-man/interface/print 
Flags: M - master, D - dynamic, B - bound, X - disabled, I - inactive, R - running 
# NAME RADIO-MAC MASTER-INTERFACE 
0 M BR cap2 00:0C:42:1B:4E:F5 none 
1 B cap3 00:00:00:00:00:00 cap2
```

## CAPsMAN 管理器 {#capsman-manager}

| 属性 | 说明 |
| :-- | :-- |
| **enabled** (*yes \| no*；默认值：**no**) | 禁用或启用 CAPsMAN 功能 |
| **certificate** (*auto \| certificate name \| none*；默认值：**none**) | 设备证书 |
| **ca-certificate** (*auto \| certificate name \| none*；默认值：**none**) | 设备 CA 证书 |
| **require-peer-certificate** (*yes \| no*；默认值：**no**) | 要求所有连接的 CAP 都具有有效证书 |
| **package-path** (*string \|*；默认值：) | RouterOS 软件包所在文件夹。例如，使用 "/upgrade" 指定 files 中的升级文件夹。如果设置为空字符串，CAPsMAN 可以使用内置 RouterOS 软件包，请注意，在这种情况下，只有与 CAPsMAN 架构相同的 CAP 会被升级。 |
| **upgrade-policy** (*none \| require-same-version \| suggest-same-version*；默认值：**none**) | CAPsMAN 可以向 CAP 设备发送 NPK 软件包以升级它们。这会绕过 CAP 设备可能具有的任何升级通道偏好，并通过简单的数字比较来工作。如果 CAPsMAN 上安装了更新版本，它将发送软件包并升级设备，而不考虑通道。 <br/><ul><li>none - 不执行升级</li><li>require-same-version - CAPsMAN 建议升级 CAP RouterOS 版本，如果失败，将不会配置该 CAP。（仍可手动配置）</li><li>suggest-same-version - CAPsMAN 建议升级 CAP RouterOS 版本，如果失败，仍会配置该 CAP</li></ul> |

## CAPsMAN 配置 {#capsman-provisioning}

CAPsMAN 根据通用名称标识符区分 CAP。该标识符根据以下规则生成：

- 如果 CAP 提供证书，则标识符设置为证书中的 Common Name 字段。
- 否则，标识符基于 CAP 提供的 Base-MAC，格式为“[XX:XX:XX:XX:XX:XX]”。

当与 CAP 的 DTLS 连接成功建立时（这意味着 CAP 标识符已知且有效），CAPsMAN 会确保不存在使用相同标识符的 CAP 陈旧连接。当前连接的 CAP 列在 `/caps-man/remote-cap` 菜单中：

```ros
[admin@CM] /caps-man> remote-cap print 
# ADDRESS IDENT STATE RADIOS
0 00:0C:42:00:C0:32/27044 MT-000C4200C032 Run 1
```

CAPsMAN 根据内置 MAC 地址（radio-mac）区分实际无线接口（radio）。这意味着在一个 CAPsMAN 上无法管理两个具有相同 MAC 地址的 radio。当前由 CAPsMAN 管理的 radio（由已连接的 CAP 提供）列在 `/caps-man/radio` 菜单中：

```ros
[admin@CM] /caps-man> radio print 
Flags: L - local, P - provisioned 
# RADIO-MAC INTERFACE REMOTE-AP-IDENT 
0 P 00:03:7F:48:CC:07 cap1 MT-000C4200C032
```

当 CAP 连接时，CAPsMAN 首先尝试根据 radio-mac 将每个 CAP radio 绑定到某个 CAPsMAN 主接口。如果找到合适的接口，则使用该主接口的配置以及引用该特定主接口的从接口配置来设置 radio。此时，接口（包括主接口和从接口）被视为绑定到该 radio，该 radio 被视为已预配置。

如果未找到与 radio 匹配的主接口，CAPsMAN 会执行“预配置规则”。预配置规则是一个有序规则列表，其中包含用于指定要匹配哪个 radio 的设置，以及用于指定 radio 匹配时要执行什么操作的设置。

用于匹配 radio 的预配置规则在 `/caps-man/provisioning` 菜单中配置：

| Property | Description |
| :-- | :-- |
| **action** (*create-disabled \| create-enabled \| create-dynamic-enabled \| none*; Default: **none**) | 规则匹配时要执行的操作，由以下设置指定：<ul><li><strong>create-disabled</strong> - 为 radio 创建已禁用的静态接口。即接口将绑定到 radio，但在手动启用接口之前，radio 不会运行；</li><li><strong>create-enabled</strong> - 创建已启用的静态接口。即接口将绑定到 radio，并且 radio 将运行；</li><li><strong>create-dynamic-enabled</strong> - 创建已启用的动态接口。即接口将绑定到 radio，并且 radio 将运行；</li><li><strong>none</strong> - 不执行任何操作，使 radio 保持未预配置状态；</li></ul> |
| **comment** (*string*; Default: ) | 预配置规则的简短描述 |
| **common-name-regexp** (*string*; Default: ) | 用于按通用名称匹配 radio 的正则表达式。每个 CAP 的通用名称标识符可在 `/caps-man/radio` 下作为值 "REMOTE-CAP-NAME" 找到 |
| **hw-supported-modes** (*a\|a-turbo\|ac\|an\|b\|g\|g-turbo\|gn*; Default: ) | 按支持的无线模式匹配 radio |
| **identity-regexp** (*string*; Default: ) | 用于按路由器标识匹配 radio 的正则表达式 |
| **ip-address-ranges** (*IpAddressRange[,IpAddressRanges] max 100x*; Default: **""**) | 匹配 IP 位于所配置地址范围内的 CAP。 |
| **master-configuration** (*string*; Default: ) | 如果 **action** 设置为创建接口，则会创建一个新主接口，并将其配置设置为此配置配置文件 |
| **name-format** (*cap \| identity \| prefix \| prefix-identity*; Default: **cap**) | 指定 CAP 接口名称创建的语法<ul><li>cap - 默认名称</li><li>identity - CAP 板的系统标识名称</li><li>prefix - 来自 name-prefix 值的名称</li><li>prefix-identity - 来自 name-prefix 值和 CAP 板的系统标识名称的名称</li></ul> |
| **name-prefix** (*string*; Default: ) | 可在 name-format 中用于创建 CAP 接口名称的名称前缀 |
| **radio-mac** (*MAC address*; Default: **00:00:00:00:00:00**) | 要匹配的 radio 的 MAC 地址，空 MAC（00:00:00:00:00:00）表示匹配所有 MAC 地址 |
| **slave-configurations** (*string*; Default: ) | 如果 **action** 设置为创建接口，则会为此列表中的每个配置配置文件创建一个新从接口。 |

:::warning
如果没有规则匹配该 radio，则会执行隐式默认规则，其操作为 **create-enabled**，且未设置任何配置。
:::

要获取活动的预配置匹配器：

```ros
[admin@CM] /caps-man/provisioning> print 
Flags: X - disabled 
0 radio-mac=00:00:00:00:00:00 action=create-enabled master-configuration=main-cfg 
slave-configurations=virtual-ap-cfg name-prefix=""
```

为方便用户，提供了一些命令，可针对某个 radio 或某个 AP 提供的所有 radio 重新执行预配置过程：

```ros
[admin@CM] > /caps-man/radio/provision 0
```

and

```ros
[admin@CM] > /caps-man/remote-cap/provision 0
```

### CAPsMAN 无线电 {#capsman-radio}

[See `/caps-man/provisioning`](#capsman-provisioning)

### CAPsMAN 速率 {#capsman-rates}

[See `/caps-man/configuration`](#capsman-configuration)

### CAPsMAN registration-table

注册表中包含连接到由 CAPsMAN 控制的无线电的客户端列表，可在 `/caps-man/registration-table` 菜单中查看：

```ros
[admin@CM] /caps-man> registration-table print
# INTERFACE MAC-ADDRESS UPTIME RX-SIGNAL
0 cap1 00:03:7F:48:CC:0B 1h38m9s210ms -36
```

### CAPsMAN 远程 CAP {#capsman-remote-cap}

[See `/caps-man/provisioning`](#capsman-provisioning)

### CAPsMAN 安全 {#capsman-security}

假设其余设置已配置完成，仅剩“Security”部分尚未配置。

**使用一台服务器进行 Radius 身份验证**

1. 创建 CAPsMAN 安全配置。

2. 配置 Radius 服务器客户端。

3. 将配置分配到主配置文件（或直接分配到 CAP 本身）。

```ros
/caps-man/security/add authentication-types=wpa2-eap eap-methods=passthrough encryption=aes-ccm group-encryption=aes-ccm name=radius 
/radius/add address=x.x.x.x secret=SecretUserPass service=wireless 
/caps-man/configuration/set security=radius
```

**每个 SSID 使用不同 Radius 服务器的 Radius 认证**

1. 创建 CAPsMAN 安全配置。

2. 配置 AAA 设置。

3. 配置 Radius 服务器客户端。

4. 将配置分配到主配置文件（或直接分配到 CAP 本身）。

```ros
/caps-man/security/add authentication-types=wpa2-eap eap-methods=passthrough encryption=aes-ccm group-encryption=aes-ccm name=radius 
/caps-man/aaa/set called-format=ssid 
/radius/add address=x.x.x.x secret=SecretUserPass service=wireless called-id=SSID1 
/radius/add address=y.y.y.y secret=SecretUserPass service=wireless called-id=SSID2 
/caps-man/configuration/set security=radius
```

现在，所有连接到 ssid=**SSID1** 的 CAP 的用户都会将其 RADIUS 身份验证请求发送到 **x.x.x.x**，所有连接到 ssid=**SSID2** 的 CAP 的用户都会将其 RADIUS 身份验证请求发送到 **y.y.y.y**。
