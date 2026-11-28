---
title: "IPsec"
description: "本节介绍 IPsec 示例和集成。可使用它配置 IKEv2、预共享密钥和后量子密钥工作流，以及第三方 VPN 连接。"
tags:
  - 'ipsec'
  - 'ike'
  - 'diffie-hellman'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/ipsec
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

本节介绍 IPsec 示例和集成。可使用它配置 IKEv2、pre-shared-key 和 post-quantum key 工作流，以及第三方 VPN 连接。

<DocCardList />

**Internet Protocol Security（IPsec）** 是由 Internet Engineering Task Force（IETF）定义的一组协议，用于保护通过 Internet 等未受保护的 IP/IPv6 网络进行的数据包交换。

IPsec 协议套件可分为以下几组：

- **Internet Key Exchange（IKE）** 协议，用于为 AH 和 ESP 动态生成和分发加密密钥。
- **Authentication Header（AH）** RFC 4302。
- **Encapsulating Security Payload（ESP）** RFC 4303。

## Internet Key Exchange Protocol（IKE） {#internet-key-exchange-protocol-ike}

Internet Key Exchange（IKE）是一种协议，为 Internet Security Association and Key Management Protocol（ISAKMP）框架提供经过认证的密钥材料。还有其他密钥交换方案可与 ISAKMP 配合使用，但 IKE 是使用最广泛的一种。二者共同提供主机认证和安全关联（SA）自动管理的方法。

大多数情况下，IKE 守护进程保持空闲。有两种情况会激活它：

存在由策略规则匹配且需要加密或认证的数据流，但该策略没有任何 SA。策略会通知 IKE 守护进程，IKE 守护进程随后发起与远程主机的连接。IKE 守护进程也可以响应远程连接。在这两种情况下，对等体会建立连接并执行 2 个阶段：

- **Phase 1** - 对等体会协商后续 IKE 消息中使用的算法，并相互进行身份验证。还会生成密钥材料，用于派生所有 SA 的密钥，并保护主机之间后续的 ISAKMP 交换。该阶段应匹配以下设置：
  - Authentication method
  - DH group
  - Encryption algorithm
  - Exchange mode
  - Hash algorithm
  - NAT-T
  - DPD 和 lifetime（可选）

- **Phase 2** - 对等体建立一个或多个 SA，IPsec 将使用这些 SA 加密数据。IKE 守护进程建立的所有 SA 都具有 lifetime 值（限制 SA 失效前的时间、该 SA 可加密的数据量，或同时限制两者）。该阶段应匹配以下设置：
  - IPsec protocol
  - Mode（tunnel 或 transport）
  - Authentication method
  - PFS（DH）group
  - lifetime

:::warning
lifetime 有两种值：soft 和 hard。当 SA 达到 soft lifetime 阈值时，会通知 IKE 守护进程，并启动另一次 Phase 2 交换，以新的 SA 替换该 SA。如果 SA 达到 hard lifetime，则会将其丢弃。

**注意：** 当 lifetime 到期且 DPD 被禁用时，Phase 1 不会重新生成密钥；只会重新生成 Phase 2 的密钥。要强制 Phase 1 重新生成密钥，请启用 DPD。

**注意：** 已知 PSK authentication 在“aggressive”模式下容易受到离线攻击，但近期发现表明，在“main”和“ike2”交换模式下也可能发生离线攻击。一般建议避免使用 PSK authentication 方法。
:::

IKE 可以选择提供 Perfect Forward Secrecy（PFS），这是密钥交换的一种属性；对 IKE 而言，这意味着即使长期 Phase 1 密钥被泄露，也不会让攻击者轻易访问由该 Phase 1 建立的 SA 所保护的所有 IPsec 数据。这意味着会为每个 Phase 2 生成额外的密钥材料。

生成密钥材料的计算开销非常大。例如，使用 modp8192 group 即使在非常快的计算机上也可能需要数秒。该操作通常每次 Phase 1 交换只发生一次，而任意主机对之间只会进行一次该交换，随后会长期保留。PFS 会将这一高开销操作也添加到每次 Phase 2 交换中。

### Diffie-Hellman 组 {#diffie-hellman-groups}

Diffie-Hellman（DH）密钥交换协议允许两个最初没有任何共享密钥的参与方安全地建立一个共享密钥。支持以下 Modular Exponential（MODP）和 ECP Diffie-Hellman（也称为“Oakley”）group：

| Diffie-Hellman 组 | 名称 | 参考 |
| :-- | :-- | :-- |
| Group 1 | 768-bit MODP group | RFC 2409 |
| Group 2 | 1024-bit MODP group | RFC 2409 |
| Group 5 | 1536-bit MODP group | RFC 3526 |
| Group 14 | 2048-bit MODP group | RFC 3526 |
| Group 15 | 3072-bit MODP group | RFC 3526 |
| Group 16 | 4096-bit MODP group | RFC 3526 |
| Group 17 | 6144-bit MODP group | RFC 3526 |
| Group 18 | 8192-bit MODP group | RFC 3526 |
| Group 19 | 256-bit random ECP group | RFC 5903 |
| Group 20 | 384-bit random ECP group | RFC 5903 |
| Group 21 | 521-bit random ECP group | RFC 5903 |

有关标准的更多信息，请参阅[此处](https://www.iana.org/assignments/ipsec-registry/ipsec-registry.xhtml)。

较大的 DH 组提供更高的安全性，但需要更多 CPU 资源。以下是几种常用的 DH 组，具有不同的安全级别和 CPU 影响：

DH Group 14（2048-bit）- 在安全性和 CPU 使用率之间提供实际平衡。它提供 2048-bit 密钥交换，被认为对大多数现代应用是安全的，并且得到广泛支持。

DH Group 5（1536-bit）- 提供的安全级别略低于 DH Group 14，但由于密钥大小较小，CPU 开销也较低。对于许多场景，它仍被认为可以接受。

DH Group 2（1024-bit）- 应谨慎使用，因为它在常用组中提供的安全性最低。尽管它对 CPU 的要求较低，但随着计算能力的提升，它更容易受到攻击。通常不建议用于新部署。

为获得最佳安全性，建议使用 **DH Group 19**。它通常被认为既快速又安全。除非为了兼容旧设备，否则通常应避免使用 DH Group 2。

:::info
计算网络基础设施所需安全级别的推荐方法是，先确定所需的安全位数，并估算解密受保护数据所需的时间。然后，可根据这些要求选择合适的算法。作为参考，请参阅 [https://www.keylength.com/en/4/](https://www.keylength.com/en/4/)。
:::

### IKE 流量 {#ike-traffic}

为避免 IKE 数据包命中某些 SPD 规则并要求使用尚未建立的 SA 进行加密（该数据包可能正试图建立此 SA），本地发起的 UDP 源端口为 500 的数据包不经过 SPD 处理。同样，要交付到本地的 UDP 目的端口为 500 的数据包不经过入站策略检查。

### 设置过程 {#setup-procedure}

要使 IPsec 与使用 IKE-ISAKMP 的自动密钥协商一起工作，必须配置 policy、peer 和 proposal（可选）条目。

:::danger
IPsec 对时间变化非常敏感。如果 IPsec 隧道两端的时间同步不一致（例如，不同 NTP 服务器更新时间的时间戳不同），隧道将中断，并且必须重新建立。
:::

### EAP 认证方法 {#eap-authentication-methods}

| 外部认证 | 内部认证 |
| :-- | :-- |
| EAP-GTC |  |
| EAP-MD5 |  |
| EAP-MSCHAPv2 |  |
| EAP-PEAPv0 | EAP-MSCHAPv2 EAP-GPSK EAP-GTC EAP-MD5 EAP-TLS |
| EAP-SIM |  |
| EAP-TLS |  |
| EAP-TTLS | PAP  CHAP  MS-CHAP  MS-CHAPv2  EAP-MSCHAPv2 EAP-GTC EAP-MD5 EAP-TLS |

Windows 中的 **EAP-TLS** 称为“Smart Card or other certificates”。

:::info
尚不支持对 IKEv2 认证使用 AES-GCM 加密。

**重要：** 如果将 IPsec 与 X.509 证书一起使用，证书必须包含“SubjectKeyIdentifier”扩展，该扩展仅受版本 3 支持。

**重要：** 尚不支持使用 ed25519 认证。
:::

## Authentication Header（AH） {#authentication-header-ah}

AH 是一种协议，通过添加基于数据报中的值计算出的头部，为数据报的全部或部分内容提供认证。用于计算的数据报部分以及头部的位置取决于使用隧道模式还是传输模式。

AH 头部的存在允许验证消息的完整性，但不会对其进行加密。因此，AH 提供认证，但不提供隐私。另一种协议（ESP）被认为更优；它提供数据隐私，并且还提供自己的认证方法。

RouterOS 支持以下用于 AH 的认证算法：

- SHA2（256、512）
- SHA1
- MD5

### 传输模式 {#transport-mode}

在传输模式下，AH 头部插入在 IP 头部之后。IP 数据和头部用于计算认证值。在传输过程中可能变化的 IP 字段（如 TTL 和跳数）在认证前会被设置为零值。

### 隧道模式 {#tunnel-mode}

在隧道模式下，原始 IP 数据包被封装在新的 IP 数据包中。所有原始 IP 数据包都经过认证。

## 封装安全载荷（ESP） {#encapsulating-security-payload-esp}

Encapsulating Security Payload（ESP）使用共享密钥加密来提供数据隐私。ESP 还支持自己的认证方案，类似于 AH 使用的方案。

ESP 对其字段的封装方式与 AH 完全不同。它不只是包含一个报头，而是将字段分为三个部分：

- **ESP Header** - 位于加密数据之前，其位置取决于 ESP 使用传输模式还是隧道模式。
- **ESP Trailer** - 该部分位于加密数据之后。它包含用于对齐加密数据的填充内容。
- **ESP Authentication Data** - 当使用 ESP 的可选认证功能时，该字段包含 Integrity Check Value（ICV），其计算方式类似于 AH 协议的工作方式。

### 传输模式 {#transport-mode-1}

在传输模式下，ESP Header 插入在原始 IP 报头之后。ESP Trailer 和认证值添加到数据包末尾。在该模式下，仅 IP 载荷经过加密和认证；IP 报头不受保护。

![](/img/e820cafb5508d83a.webp)

### 隧道模式 {#tunnel-mode-1}

在隧道模式下，原始 IP 数据包被封装在新的 IP 数据包中，从而保护 IP 载荷和 IP 报头。

![](/img/53ccf4c24f574ee8.webp)

### 加密算法 {#encryption-algorithms}

RouterOS ESP 支持各种加密和认证算法。

#### Authentication

- **MD5**
- **SHA1**
- **SHA2（256-bit、512-bit）**

#### Encryption

- **AES** - 128-bit、192-bit 和 256-bit 密钥的 AES-CBC、AES-CTR 和 AES-GCM 算法。
- **Blowfish** - 自 v4.5 起添加。
- **Twofish** - 自 v4.5 起添加。
- **Camellia** - 自 v4.5 起添加的 128-bit、192-bit 和 256-bit 密钥 Camellia 加密算法。
- **DES** - 56-bit DES-CBC 加密算法。
- **3DES** - 168-bit（3 x 56-bit）DES 加密算法。

### 硬件加速 {#hardware-acceleration}

硬件加速允许使用 CPU 内置的加密引擎执行更快的加密过程。

支持硬件加速的设备列表请见[此处](https://mikrotik.com/products?filter&s=c&f=%5B%22ipsec%22%5D)

<WideTable>

| CPU | DES 和 3DES |  |  |  | AES-CBC |  |  |  | AES-CTR |  |  |  | AES-GCM |  |  |  |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
|  | MD5 | SHA1 | SHA256 | SHA512 | MD5 | SHA1 | SHA256 | SHA512 | MD5 | SHA1 | SHA256 | SHA512 | MD5 | SHA1 | SHA256 | SHA512 |
| 88F7040 | 否 | 是 | 是 | 是 | 否 | 是 | 是 | 是 | 否 | 是 | 是 | 是 | 否 | 是 | 是 | 是 |
| AL21400 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 |
| AL32400 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 |
| AL52400 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 |
| AL73400 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 | 是 |
| IPQ-4018 / IPQ-4019 | 否 | 是 | 是 | 否 | 否 | 是\* | 是\* | 否 | 否 | 是\* | 是\* | 否 | 否 | 否 | 否 | 否 |
| IPQ-5018 | 是 | 是 | 是 | 否 | 是 | 是 | 是 | 否 | 是 | 是 | 是 | 否 | 否 | 否 | 否 | 否 |
| IPQ-6010 | 否 | 否 | 否 | 否 | 否 | 是 | 是 | 是 | 否 | 是 | 是 | 是 | 否 | 是 | 是 | 是 |
| IPQ-8064 | 否 | 是 | 是 | 否 | 否 | 是\* | 是\* | 否 | 否 | 是\* | 是\* | 否 | 否 | 否 | 否 | 否 |
| IPQ-8072 | 否 | 否 | 否 | 否 | 否 | 是 | 是 | 是 | 否 | 是 | 是 | 是 | 否 | 是 | 是 | 是 |
| MT7621A | 是\*\*\*\* | 是\*\*\*\* | 是\*\*\*\* | 否 | 是 | 是 | 是 | 否 | 否 | 否 | 否 | 否 | 否 | 否 | 否 | 否 |
| EN7562CT | 是\*\*\*\* | 是\*\*\*\* | 是\*\*\*\* | 否 | 是 | 是 | 是 | 否 | 是 | 是 | 是 | 否 | 否 | 否 | 否 | 否 |
| P1023NSN5CFB | 否 | 否 | 否 | 否 | 是\*\* | 是\*\* | 是\*\* | 是\*\* | 否 | 否 | 否 | 否 | 否 | 否 | 否 | 否 |
| P202ASSE2KFB | 是 | 是 | 是 | 否 | 是 | 是 | 是 | 是 | 否 | 否 | 否 | 否 | 否 | 否 | 否 | 否 |
| PPC460GT | 否 | 否 | 否 | 否 | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 否 | 否 | 否 | 否 |
| TLR4 (TILE) | 是 | 是 | 是 | 否 | 是 | 是 | 是 | 否 | 是 | 是 | 是 | 否 | 否 | 否 | 否 | 否 |
| x86 (AES-NI) | 否 | 否 | 否 | 否 | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* |

</WideTable>

\* 仅支持 128 位和 256 位密钥长度

\*\* 仅 2016 年之后生产，序列号以数字 5 和 7 开头

\*\*\* 仅加速 AES-CBC 和 AES-CTR 加密，哈希由软件完成

\*\*\*\* 不支持 DES，仅支持 3DES 和/或 AES-CBC

各种加密和哈希算法组合的 IPsec 吞吐量结果已发布在 [MikroTik 产品页面](https://mikrotik.com/products)上。

## Policies

策略表用于确定是否应对数据包应用安全设置。

## 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **action** (*discard \| encrypt \| none*；默认：**encrypt**) | 指定如何处理与该策略匹配的数据包。<ul><li>none - 不改动数据包，直接通过。</li><li>discard - 丢弃数据包。</li><li>encrypt - 应用该策略及其 SA 中指定的转换。</li></ul> |
| **comment** (*string*；默认：) | 策略的简短描述。 |
| **disabled** (*yes \| no*；默认：**no**) | 策略是否用于匹配数据包。 |
| **dst-address** (*IP/IPv6 prefix*；默认：**0.0.0.0/32**) | 数据包中要匹配的目标地址。适用于使用隧道模式（tunnel=yes）或模板（template=yes）时。 |
| **dst-port** (*integer:0..65535 \| any*；默认：**any**) | 数据包中要匹配的目标端口。设置为 any 时，将匹配所有端口。 |
| **group** (*string*；默认：**default**) | 该模板所属策略组的名称。 |
| **ipsec-protocols** (*ah \| esp*；默认：**esp**) | 指定要对匹配流量应用的 Authentication Header 和 Encapsulating Security Payload 协议组合。 |
| **level** (*require \| unique \| use*；默认：**require**) | 指定当找不到该策略的部分 SA 时如何处理：<ul><li>use - 跳过该转换，不丢弃数据包，也不向 IKE 守护进程请求 SA；</li><li>require - 丢弃数据包并请求 SA；</li><li>unique - 丢弃数据包并请求仅用于该特定策略的唯一 SA。它用于多个客户端位于同一公网 IP 地址之后的场景（NAT 后的客户端）。</li></ul> |
| **peer** (*string*；默认：) | 策略所适用的 peer 名称。 |
| **proposal** (*string*；默认：**default**) | IKE 守护进程将发送的 proposal 模板名称，用于为该策略建立 SA。 |
| **protocol** (*all \| egp \| ggp\| icmp \| igmp \| ...*；默认：**all**) | 要匹配的 IP 数据包协议。 |
| **src-address** (*ip/ipv6 prefix*；默认：**0.0.0.0/32**) | 数据包中要匹配的源地址。适用于使用隧道模式（tunnel=yes）或模板（template=yes）时。 |
| **src-port** (*any \| integer:0..65535*；默认：**any**) | 数据包中要匹配的源端口。设置为 any 时，将匹配所有端口。 |
| **template** (*yes \| no*；默认：**no**) | 创建模板并将其分配给指定的策略组。模板使用以下参数：<br/><ul><li>group - 该模板所属策略组的名称；</li><li>src-address、dst-address - 请求的子网必须在两个方向上匹配（例如 0.0.0.0/0 表示允许全部）；</li><li>protocol - 要匹配的协议，设置为 all 时接受任何协议；</li><li>proposal - 该模板使用的 SA 参数；</li><li>level - 在多个客户端位于 NAT 之后的场景中需要 unique 时很有用。</li></ul> |
| **tunnel** (*yes \| no*；默认：**no**) | 指定是否使用隧道模式。 |

## 只读属性 {#read-only-properties}

| 属性 | 说明 |
| :-- | :-- |
| **active** (*yes \| no*) | 该策略当前是否正在使用。 |
| **default** (*yes \| no*) | 该条目是否为系统默认条目。 |
| **dynamic** (*yes \| no*) | 该条目是否为动态添加或生成的条目。 |
| **invalid** (*yes \| no*) | 该策略是否无效，可能原因是存在具有相同 src-address 和 dst-address 的重复策略。 |
| **ph2-count** (*integer*) | 与该策略关联的活动 phase 2 会话数量。 |
| **ph2-state** (*expired \| no-phase2 \| established*) | 密钥建立进度指示。 |
| **sa-dst-address** (*ip/ipv6 address*；Default: **::**) | SA 目标 IP/IPv6 地址（远端对等体）。 |
| **sa-src-address** (*ip/ipv6 address*；Default: **::**) | SA 源 IP/IPv6 地址（本地对等体）。 |

:::info
策略顺序很重要。其工作方式类似于防火墙过滤器，策略从上到下执行（priority 参数已移除）。

在 tunnel 模式下，所有数据包都会被 IPIP 封装，其新 IP 头的 src-address 和 dst-address 会设置为该策略的 sa-src-address 和 sa-dst-address 值。如果不使用 tunnel 模式（即使用 transport 模式），则只有源地址和目的地址与 sa-src-address 和 sa-dst-address 相同的数据包才能由该策略处理。transport 模式只能处理源自 IPsec 对等体且发往 IPsec 对等体（建立安全关联的主机）的数据包。要加密网络之间（或网络与主机之间）的流量，必须使用 tunnel 模式。
:::

### 统计信息 {#statistics}

此菜单显示各种 IPsec 统计信息和错误。

#### 只读属性 {#read-only-properties-1}

| 属性 | 说明 |
| :-- | :-- |
| **in-errors** (*integer*) | 未被其他计数器匹配的所有入站错误。 |
| **in-buffer-errors** (*integer*) | 没有空闲缓冲区。 |
| **in-header-errors** (*integer*) | 报头错误。 |
| **in-no-states** (*integer*) | 未找到状态，即入站 SPI、地址或 SA 处的 IPsec 协议错误。 |
| **in-state-protocol-errors** (*integer*) | 特定转换协议错误，例如 SA 密钥错误，或硬件加速器无法处理数据包数量。 |
| **in-state-mode-errors** (*integer*) | 特定转换模式错误。 |
| **in-state-sequence-errors** (*integer*) | 序列号超出窗口范围。 |
| **in-state-expired** (*integer*) | 状态已过期。 |
| **in-state-mismatches** (*integer*) | 状态包含不匹配的选项，例如 UDP 封装类型不匹配。 |
| **in-state-invalid** (*integer*) | 状态无效。 |
| **in-template-mismatches** (*integer*) | 没有与状态匹配的模板，例如入站 SA 正确，但 SP 规则错误。可能原因是 sa-source 或 sa-destination 地址不匹配。 |
| **in-no-policies** (*integer*) | 未找到状态对应的策略，例如入站 SA 正确，但未找到 SP。 |
| **in-policy-blocked** (*integer*) | 策略丢弃。 |
| **in-policy-errors** (*integer*) | 策略错误。 |
| **out-errors** (*integer*) | 未被其他计数器匹配的所有出站错误。 |
| **out-bundle-errors** (*integer*) | 束生成错误。 |
| **out-bundle-check-errors** (*integer*) | 束检查错误。 |
| **out-no-states** (*integer*) | 未找到状态。 |
| **out-state-protocol-errors** (*integer*) | 特定转换协议错误。 |
| **out-state-mode-errors** (*integer*) | 特定转换模式错误。 |
| **out-state-sequence-errors** (*integer*) | 序列错误，例如序列号溢出。 |
| **out-state-expired** (*integer*) | 状态已过期。 |
| **out-policy-blocked** (*integer*) | 策略丢弃。 |
| **out-policy-dead** (*integer*) | 策略已失效。 |
| **out-policy-errors** (*integer*) | 策略错误。 |

## Proposals

IKE 守护进程发送的、用于为特定策略建立 SA 的提案信息。

### 属性 {#properties-1}

| 属性 | 说明 |
| :-- | :-- |
| **auth-algorithms** (*md5\|null\|sha1\|sha256\|sha512*；默认：**sha1**) | 允许用于授权的算法。SHA（Secure Hash Algorithm）更安全，但速度较慢。MD5 使用 128 位密钥，SHA1 使用 160 位密钥。 |
| **comment** (*string*；默认：) |  |
| **disabled** (*yes \| no*；默认：**no**) | 项目是否禁用。 |
| **enc-algorithms** (*null\|des\|3des\|aes-128-cbc\|aes-128-ctr\|aes-128-gcm\|aes-192-cbc\|aes-192-ctr\|aes-192-gcm\|aes-256-cbc\|aes-256-ctr\|aes-256-gcm\|blowfish\|camellia-128\|camellia-192\|camellia-256\|twofish*；默认：**aes-256-cbc,aes-192-cbc,aes-128-cbc**) | 允许用于 SA 的算法和密钥长度。 |
| **lifetime** (*time*；默认：**30m**) | 丢弃 SA 前使用它的时长。 |
| **name** (*string*；默认：) |  |
| **pfs-group** (*ecp256 \| ecp384 \| ecp521 \| modp768 \| modp1024 \| modp1536 \| modp2048 \| modp3072 \| modp4096 \| modp6144 \| modp8192 \| none*；默认：**modp1024**) | 用于完美前向保密的 Diffie-Hellman 组。 |

### 只读属性 {#read-only-properties-2}

| 属性 | 说明 |
| :-- | :-- |
| **default**（*yes \| no*） | 该条目是否为系统默认条目。 |

## Groups

在此菜单中，可以创建供策略模板使用的其他策略组。

### 属性 {#properties-2}

| 属性 | 说明 |
| :-- | :-- |
| **name** (*string*；默认：) |  |
| **comment** (*string*；默认：) |  |

## Peers

Peer 配置设置用于在 IKE 守护进程之间建立连接。该连接随后将用于协商 SA 的密钥和算法。Exchange mode 是 Peer 之间唯一的标识符，这意味着只要使用不同的 exchange-mode，就可以存在多个具有相同 remote-address 的 Peer 配置。

## 属性 {#properties-3}

| 属性 | 说明 |
| :-- | :-- |
| **address** (*IP/IPv6 Prefix*；默认：**0.0.0.0/0**) | 如果远端对等体的地址匹配该前缀，则在 **Phase 1** 的认证和建立过程中使用该对等体配置。如果多个对等体地址匹配多个配置条目，则使用最具体的一个（即网络掩码最大的一个）。 |
| **comment** (*string*；默认：) | 对等体的简短描述。 |
| **disabled** (*yes \| no*；默认：**no**) | 是否使用该对等体匹配远端对等体的前缀。 |
| **exchange-mode** (*aggressive \| base \| main \| ike2*；默认：**main**) | 根据 RFC [2408](https://datatracker.ietf.org/doc/html/rfc2408#section-4.1) 定义的不同 ISAKMP phase 1 交换模式。**main** 模式放宽 rfc2409 第 5.4 节，以允许在 main 模式下使用 pre-shared-key 认证。ike2 模式启用 Ikev2 RFC 7296。IKEv2 会忽略以下参数：proposal-check、compatibility-options、lifebytes、dpd-maximum-failures、nat-traversal。 |
| **local-address** (*IP/IPv6 Address*；默认：) | 路由器上应绑定 Phase 1 的本地地址。 |
| **name** (*string*；默认：) |  |
| **passive** (*yes \| no*；默认：**no**) | 启用被动模式时，将等待远端对等体发起 IKE 连接。启用被动模式还表示该对等体是 xauth responder，禁用被动模式则表示 xauth initiator。当被动模式禁用时，如果已配置或在 phase1 期间创建了策略，对等体将尝试自动建立 phase1 和 phase2。 |
| **port** (*integer:0..65535*；默认：**500**) | 当远端对等体使用非默认端口时，路由器作为发起方连接到远端对等体所使用的通信端口。 |
| **profile** (*string*；默认：**default**) | IKE 协商期间使用的 profile 模板名称。 |
| **send-initial-contact** (*yes \| no*；默认：**yes**) | 指定是发送“initial contact”IKE 数据包，还是等待远端侧；该数据包应触发删除当前源地址的旧对等体 SA。通常，在 road warrior 场景中客户端是发起方，该参数应设置为 no。如果 ikev1 启用了 modecfg 或 xauth，则不会发送 initial contact。 |

## 只读属性 {#read-only-properties-3}

| 属性 | 说明 |
| :-- | :-- |
| **dynamic** (*yes \| no*) | 该条目是否由其他服务（例如 L2TP）动态添加。 |
| **responder** (*yes \| no*) | 该对等体是否仅作为响应方（侦听传入请求）而不发起连接。 |

### Profiles

Profiles 定义一组参数，这些参数将用于 Phase 1 期间的 IKE 协商。这些参数可能与其他对等体配置通用。

## 属性 {#properties-4}

| 属性 | 说明 |
| :-- | :-- |
| **dh-group** (*modp768 \| modp1024  \| modp1536 \| modp2048 \| modp3072 \| modp4096 \| modp6144 \| modp8192 \| ecp256 \| ecp384 \| ecp521*；默认值：**modp1024,modp2048**） | Diffie-Hellman 组（加密强度） |
| **dpd-interval** (*time \| disable-dpd*；默认值：**2m**） | 死亡对等体检测间隔。如果设置为 disable-dpd，则不使用死亡对等体检测。 |
| **dpd-maximum-failures** (*integer: 1..100*；默认值：**5**） | 在将对等体视为死亡之前允许的最大失败次数。仅在启用 DPD 时适用。 |
| **enc-algorithm** (*3des \| aes-128 \| aes-192 \| aes-256 \| blowfish \| camellia-128 \| camellia-192 \| camellia-256 \| des*；默认值：**aes-128**） | 对等体将使用的加密算法列表。 |
| **hash-algorithm** (*md5 \| sha1 \| sha256 \| sha512*；默认值：**sha1**） | 哈希算法。SHA（Secure Hash Algorithm）更强，但速度较慢。MD5 使用 128 位密钥，sha1 使用 160 位密钥。 |
| **lifebytes** (*Integer: 0..4294967295*；默认值：**0**） | Phase 1 lifebytes 仅用作添加到 proposal 中的管理值。用于远程对等体要求特定 lifebytes 值才能建立 phase 1 的情况。 |
| **lifetime** (*time*；默认值：**1d**） | Phase 1 lifetime：指定 SA 的有效时长。 |
| **name** (*string*；默认值：） |  |
| **nat-traversal** (*yes \| no*；默认值：**yes**） | 使用 Linux NAT-T 机制解决 IPsec 与 IPsec 对等体之间 NAT 路由器的不兼容问题。该机制只能与 ESP 协议一起使用（按设计不支持 AH，因为 AH 会对包括 IP 头在内的完整数据包进行签名，而 IP 头会被 NAT 修改，导致 AH 签名无效）。该方法将 IPsec ESP 流量封装到 UDP 流中，以克服导致 ESP 与 NAT 不兼容的一些小问题。 |
| **proposal-check** (*claim \| exact \| obey \| strict*；默认值：**obey**） | Phase 2 lifetime 检查逻辑：<ul><li>claim - 采用提议和配置中最短的 lifetime，并将该值通知发起方</li><li>exact - 要求 lifetime 相同</li><li>obey - 接受发起方发送的任何值</li><li>strict - 如果提议的 lifetime 长于默认值，则拒绝该 proposal，否则接受提议的 lifetime</li></ul> |

## Identities

身份是特定于远程对等体的配置参数。身份的主要用途是处理身份验证并验证对等体的完整性。

### 属性 {#properties-5}

| 属性 | 说明 |
| :-- | :-- |
| **auth-method** (*digital-signature \| eap \| eap-radius \| pre-shared-key \| pre-shared-key-xauth \| rsa-key \| rsa-signature-hybrid*；默认：**pre-shared-key**) | 身份验证方法：<ul><li>digital-signature - 使用一对 RSA 证书进行身份验证；</li><li>eap - 发起方（网络掩码为 /32 的对等体）的 IKEv2 EAP 身份验证。必须与 eap-methods 一起使用；</li><li>eap-radius - 响应方的 IKEv2 EAP RADIUS 透传身份验证（RFC 3579）。此情况下需要服务器证书。如果未指定服务器证书，则只有支持 EAP-only（RFC 5998）的客户端才能连接。请注意，EAP 方法应与 EAP-only 兼容；</li><li>pre-shared-key - 使用对等体之间共享的密码（预共享密钥）字符串进行身份验证（不推荐，因为可能对预共享密钥发起离线攻击）；</li><li>rsa-key - 使用在 keys 菜单中导入的 RSA 密钥进行身份验证。仅支持 IKEv1；</li><li>pre-shared-key-xauth - 使用对等体之间共享的密码（预共享密钥）字符串以及 XAuth 用户名和密码进行身份验证。仅支持 IKEv1；</li><li>rsa-signature-hybrid - 响应方证书身份验证与发起方 XAuth。仅支持 IKEv1。</li></ul> |
| **certificate** (*string*；默认：) | System/Certificates 中列出的证书名称（用于对数据包签名；该证书必须具有私钥）。适用于使用数字签名身份验证方法（auth-method=digital-signature）或 EAP（auth-method=eap）的情况。 |
| **comment** (*string*；默认：) | identity 的简短说明。 |
| **disabled** (*yes \| no*；默认：**no**) | 该 identity 是否用于匹配远程对等体。 |
| **eap-methods** (*eap-mschapv2 \| eap-peap \| eap-tls \| eap-ttls*；默认：**eap-tls**) | 所有 EAP 方法都要求 System/Certificates 菜单中存在完整的证书链，包括中间证书和根 CA 证书。此外，必须指定用户名和密码（如果身份验证服务器要求）。可以指定多个 EAP 方法，并将按指定顺序使用。当前支持的 EAP 方法：<ul><li>eap-mschapv2；</li><li>eap-peap - 也称为 PEAPv0/EAP-MSCHAPv2；</li><li>eap-tls - 需要通过 certificate 参数指定额外的客户端证书；</li><li>eap-ttls。</li></ul> |
| **generate-policy** (*no \| port-override \| port-strict*；默认：**no**) | 允许该对等体为不存在的策略建立 SA。此类策略会在 SA 的生命周期内动态创建。例如，自动策略可用于创建受 IPsec 保护的 L2TP 隧道，或用于配置时不知道远程对等体 IP 地址的任何其他场景。<ul><li>no - 不生成策略；</li><li>port-override - 生成策略并强制策略使用<strong>任意</strong>端口（旧行为）；</li><li>port-strict - 使用对等体提议中的端口，其应与对等体策略匹配。</li></ul> |
| **key** (*string*；默认：) | keys 菜单中的私钥名称。适用于使用 RSA 密钥身份验证方法（auth-method=rsa-key）的情况。 |
| **match-by** (*remote-id \| certificate*；默认：**remote-id**) | 定义用于对对等体身份进行验证的逻辑。<ul><li>remote-id - 根据 remote-id 设置验证对等体的 ID。</li><li>certificate 将根据 remote-certificate 设置中指定的内容验证对等体的证书。</li></ul> |
| **mode-config** (*none \| \*request-only \| string*；默认：**none**) | mode-config 菜单中的配置参数名称。设置该参数后，将启用 mode-config。 |
| **my-id** (*auto \| address \| fqdn \| user-fqdn \| key-id*；默认：**auto**) | 在发起方，该参数控制向响应方发送什么 ID_i。在响应方，该参数控制向发起方发送什么 ID_r。在 IKEv2 中，响应方还期望从发起方收到的 ID_r 中使用该 ID。<ul><li>auto - 尝试自动使用正确的 ID：预共享密钥使用 IP，基于证书的连接使用 SAN（如果不存在则使用 DN）；</li><li>address - 使用 IP 地址作为 ID；</li><li>dn - ASN.1 X.500 Distinguished Name 的二进制 Distinguished Encoding Rules（DER）编码；</li><li>fqdn - 完全限定域名；</li><li>key-id - 使用指定的密钥 ID 作为身份；</li><li>user fqdn - 指定完全限定的用户名字符串，例如“<a href="mailto:user@domain.com" target="_blank" rel="noopener noreferrer">user@domain.com</a>”。</li></ul> |
| **notrack-chain** (*string*；默认：) | 将匹配 IPsec 策略的 IP/Firewall/Raw 规则添加到指定链。与 generate-policy 一起使用。 |
| **password** (*string*；默认：) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | XAuth 或 EAP 密码。适用于使用带 XAuth 的预共享密钥身份验证方法（auth-method=pre-shared-key-xauth）或 EAP（auth-method=eap）的情况。 |
| **peer** (*string*；默认：) | 应用该 identity 的对等体名称。 |
| **policy-template-group** (*none \| string*；默认：**default**) | 如果启用 generate-policy，则会根据同一组中的模板检查流量选择器。如果没有任何模板匹配，则不会建立 Phase 2 SA。 |
| **remote-certificate** (*string*；默认：) | 用于对远端进行身份验证的证书名称（列于 System/Certificates 中；用于验证数据包；不需要私钥）。如果未指定 remote-certificate，则使用从远程对等体收到的证书，并根据 certificate 菜单中的 CA 进行检查。必须在证书存储中导入适当的 CA。如果指定了 remote-certificate 和 match-by=certificate，则仅匹配特定客户端证书。适用于使用数字签名身份验证方法（auth-method=digital-signature）的情况。 |
| **remote-id** (*auto \| fqdn \| user-fqdn \| key-id \| ignore*；默认：**auto**) | 该参数控制期望从远程对等体收到什么 ID 值。请注意，除 ignore 之外的所有类型都会使用收到的证书验证远程对等体的 ID。如果对等体将证书名称作为其 ID 发送，则会根据证书进行检查；否则，会根据 Subject Alt. Name 检查 ID。<ul><li>auto - 接受所有 ID；</li><li>address - 使用 IP 地址作为 ID；</li><li>dn - ASN.1 X.500 Distinguished Name 的二进制 Distinguished Encoding Rules（DER）编码；</li><li>fqdn - 完全限定域名。仅支持 IKEv2；</li><li>user fqdn - 完全限定的用户名字符串，例如“<a href="mailto:user@domain.com" target="_blank" rel="noopener noreferrer">user@domain.com</a>”。仅支持 IKEv2；</li><li>key-id - 用于身份的特定密钥 ID。仅支持 IKEv2；</li><li>ignore - 不使用证书验证收到的 ID（危险）。</li></ul> * <strong>不支持</strong>通配符密钥 ID 匹配，例如 remote-id="key-id:CN=*.domain.com" |
| **remote-key** (*string*；默认：) | keys 菜单中的公钥名称。适用于使用 RSA 密钥身份验证方法（auth-method=rsa-key）的情况。 |
| **secret** (*string*；默认：) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 密钥字符串。如果以 '0x' 开头，则按十六进制值解析。适用于使用预共享密钥身份验证方法（auth-method=pre-shared-key 或 auth-method=pre-shared-key-xauth）的情况。 |
| **username** (*string*；默认：) | XAuth 或 EAP 用户名。适用于使用带 XAuth 的预共享密钥身份验证方法（auth-method=pre-shared-key-xauth）或 EAP（auth-method=eap）的情况。 |

### 只读属性 {#read-only-properties-4}

| 属性 | 说明 |
| :-- | :-- |
| **dynamic** (*yes \| no*) | 该条目是否由其他服务（例如 L2TP）动态添加。 |

## 活动对等体 {#active-peers}

该菜单提供有关当前已建立 phase 1 连接的远程对等体的各种统计信息。

### 只读属性 {#read-only-properties-5}

| 属性 | 说明 |
| :-- | :-- |
| **dynamic-address** (*ip/ipv6 address*) | 由 mode config 动态分配的 IP 地址 |
| **last-seen** (*time*) | 自该对等体收到上一条消息以来的时长。 |
| **local-address** (*ip/ipv6 address*) | 该对等体使用的路由器本地地址。 |
| **natt-peer** (*yes \| no*) | 该对等体是否使用 NAT-T。 |
| **ph2-total** (*integer*) | 活动 IPsec 安全关联的总数。 |
| **remote-address** (*ip/ipv6 address*) | 远端对等体的 ip/ipv6 地址。 |
| **responder** (*yes \| no*) | 连接是否由远端对等体发起。 |
| **rx-bytes** (*integer*) | 从该对等体收到的字节总数。 |
| **rx-packets** (*integer*) | 从该对等体收到的数据包总数。 |
| **side** (*initiator \| responder*) | 显示哪一方发起了 Phase1 协商。 |
| **state** (*string*) | 与该对等体进行 phase 1 协商的状态。例如，当 phase1 和 phase 2 协商完成时，将显示状态“established”。 |
| **tx-bytes** (*integer*) | 发送到该对等体的字节总数。 |
| **tx-packets** (*integer*) | 发送到该对等体的数据包总数。 |
| **uptime** (*time*) | 对等体处于 established 状态的时长。 |

### 命令 {#commands}

| 属性 | 说明 |
| :-- | :-- |
| **kill-connections** () | 手动断开所有远程对等体的连接。 |

## 模式配置 {#mode-configs}

ISAKMP 和 IKEv2 配置属性在此菜单中配置。

### 属性 {#properties-6}

| 属性 | 说明 |
| :-- | :-- |
| **address** (*none \| string*; Default: ) | 为发起方指定单个 IP 地址，而不是指定整个地址池。 |
| **address-pool** (*none \| string*; Default: ) | 启用 mode-config 时，响应方尝试从中分配地址的地址池名称。 |
| **address-prefix-length** (*integer [1..32]*; Default: ) | 从地址池分配地址的前缀长度（netmask）。 |
| **comment** (*string*; Default: ) |  |
| **name** (*string*; Default: ) |  |
| **responder** (*yes \| no*; Default: **no**) | 指定该配置作为发起方（客户端）还是响应方（服务器）工作。发起方将向响应方请求 mode-config 参数。 |
| **split-dns** (*list of DNS names*; Default: ) | 将使用 system-dns=yes 或 static-dns= 设置解析的 DNS 名称列表。 |
| **split-include** (*list of IP prefix*; Default: ) | 以 CIDR 格式列出的子网列表，这些子网将通过隧道传输。子网将通过 CISCO UNITY 扩展发送给对端。远程对端将创建特定的动态策略。 |
| **src-address-list** (*address list*; Default: ) | 指定地址列表将生成动态源 NAT 规则。该参数仅在 responder=no 时可用。使用 NAT 的 roadWarrior 客户端 |
| **static-dns** (*list of IP*; Default: ) | 手动指定要发送给客户端的 DNS 服务器 IP 地址。 |
| **system-dns** (*yes \| no*; Default: ) | 启用该选项时，DNS 地址将从 `/ip/dns` 获取。 |

### 只读属性 {#read-only-properties-6}

| 属性 | 说明 |
| :-- | :-- |
| **default** (*yes \| no*) | 该条目是否为系统默认条目。 |

:::warning
并非所有 IKE 实现都支持由 split-include 选项提供的多个拆分网络。

**警告：** 如果 RouterOS 客户端是发起方，它将始终发送 CISCO UNITY 扩展，而 RouterOS 仅支持该扩展中的 split-include。

Cisco Unity Split DNS（属性类型 28675）和 RFC8598（属性类型 25）两个属性均受支持，ROS 将响应这些属性，但仅作为响应方。

**警告：** 无法同时使用 system-dns 和 static-dns；ROS 只能使用一个 DNS。
:::

## 已安装的 SA {#installed-sas}

此菜单提供有关已安装安全关联的信息，包括密钥。

### 只读属性 {#read-only-properties-7}

| 属性 | 说明 |
| :-- | :-- |
| **AH** (*yes \| no*) | 此 SA 是否使用 AH 协议。 |
| **ESP** (*yes \| no*) | 此 SA 是否使用 ESP 协议。 |
| **add-lifetime** (*time/time*) | SA 的附加生存时间，格式为 soft/hard：<ul><li>soft —— IKE 尝试建立新 SA 前经过的时间段；</li><li>hard —— 删除 SA 前经过的时间段。</li></ul> |
| **addtime** (*time*) | 添加此 SA 的日期和时间。 |
| **auth-algorithm** (*md5 \| null \| sha1 \| ...*) | 当前使用的认证算法。 |
| **auth-key** (*string*) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 使用的认证密钥。 |
| **current-bytes** (*64-bit integer*) | 此 SA 已处理的字节数。 |
| **dst-address** (*IP*) | 此 SA 的目的地址。 |
| **enc-algorithm** (*des \| 3des \| aes-cbc \| ...*) | 当前使用的加密算法。 |
| **enc-key** (*string*) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 使用的加密密钥。 |
| **enc-key-size** (*number*) | 使用的加密密钥长度。 |
| **expires-in** (*time*) | 距离重新密钥剩余的时间。 |
| **hw-aead** (*yes \| no*) | 此 SA 是否由硬件加速。 |
| **replay** (*integer*) | 以数据包为单位的重放窗口大小。 |
| **spi** (*string*) | Security Parameter Index 标识标签。 |
| **src-address** (*IP*) | 此 SA 的源地址。 |
| **state** (*string*) | 显示 SA 的当前状态（“mature”、“dying”等）。 |

### 命令 {#commands-1}

| 属性 | 说明 |
| :-- | :-- |
| **flush** () | 手动删除所有已安装的安全关联。 |

## Keys

此菜单列出所有可用于对等体身份验证的已导入公钥和私钥。该菜单包含多个用于处理密钥的命令。

### 属性 {#properties-7}

| 属性 | 说明 |
| :-- | :-- |
| **name** (*string*；默认：) |  |

### 只读属性 {#read-only-properties-8}

| 属性 | 说明 |
| :-- | :-- |
| **key-size** (*1024 \| 2048 \| 4096*) | 该密钥的大小。 |
| **private-key** (*yes \| no*) | 该密钥是否为私钥。 |
| **rsa** (*yes \| no*) | 该密钥是否为 RSA 密钥。 |

### 命令 {#commands-2}

| 属性 | 说明 |
| :-- | :-- |
| **export-pub-key** (*file-name; key*) | 从现有私钥之一导出公钥到文件。 |
| **generate-key** (*key-size; name*) | 生成私钥。接受两个参数：新生成密钥的名称和密钥大小 1024、2048 和 4096。 |
| **import** (*file-name; name*) | 从文件导入密钥。 |

## 设置 {#settings}

| 属性 | 说明 |
| :-- | :-- |
| **accounting** (*yes \| no*；默认值：) | 是否向 RADIUS 服务器发送 RADIUS 计费请求。适用于使用 EAP Radius（auth-method=eap-radius）或使用 XAuth 认证方式的预共享密钥（auth-method=pre-shared-key-xauth）的情况。 |
| **interim-update** (*time*；默认值：) | 相邻两次 RADIUS 计费 Interim 更新之间的间隔。必须启用计费。 |
| **xauth-use-radius** (*yes \| no*；默认值：) | 是否为 XAuth 用户使用 Radius 客户端。该属性仅适用于使用 **IKEv1** 交换模式的对等体。 |

### 使用 NAT 的 RoadWarrior 客户端 {#roadwarrior-client-with-nat}

请参考下图所示的配置。RouterOS 作为 RoadWarrior 客户端连接到 Office，允许访问其内部资源。

![](/img/dc6b627dbef3d1f7.webp)

隧道已建立，接收到本地 mode-config IP 地址，并生成一组动态策略。

```ros
[admin@mikrotik] > ip ipsec policy print 
Flags: T - template, X - disabled, D - dynamic, I - invalid, A - active, * - default 
0 T * group=default src-address=::/0 dst-address=::/0 protocol=all proposal=default template=yes 

1 DA src-address=192.168.77.254/32 src-port=any dst-address=10.5.8.0/24 dst-port=any protocol=all 
action=encrypt level=unique ipsec-protocols=esp tunnel=yes sa-src-address=10.155.107.8 
sa-dst-address=10.155.107.9 proposal=default ph2-count=1 

2 DA src-address=192.168.77.254/32 src-port=any dst-address=192.168.55.0/24 dst-port=any protocol=all 
action=encrypt level=unique ipsec-protocols=esp tunnel=yes sa-src-address=10.155.107.8 
sa-dst-address=10.155.107.9 proposal=default ph2-count=1 
```

当前，只有源地址为 192.168.77.254/32 的数据包会匹配 IPsec 策略。要使本地网络能够访问远程子网，必须将本地主机的源地址更改为动态分配的 mode config IP 地址。可以动态生成源 NAT 规则。为此，请创建一个新的地址列表，其中包含 NAT 规则应应用到的所有本地网络。在本例中，该网络为 192.168.88.0/24。

```ros
/ip/firewall/address-list/add address=192.168.88.0/24 list=local-RW
```

通过在 mode-config initiator 配置下指定地址列表，将动态生成一组源 NAT 规则。

```ros
/ip/ipsec/mode-config/set [ find name="request-only" ] src-address-list=local-RW
```

建立 IPsec 隧道后，可以看到为每个网络动态创建的源 NAT 规则。现在，192.168.88.0/24 中的每台主机都能够访问 Office 的内部资源。

```ros
[admin@mikrotik] > ip firewall nat print 
Flags: X - disabled, I - invalid, D - dynamic 
0 D ;;; ipsec mode-config
chain=srcnat action=src-nat to-addresses=192.168.77.254 dst-address=192.168.55.0/24 src-address-list=local-RW

1 D ;;; ipsec mode-config
chain=srcnat action=src-nat to-addresses=192.168.77.254 dst-address=10.5.8.0/24 src-address-list=local-RW
```

### 仅允许 IPsec 封装的流量 {#allow-only-ipsec-encapsulated-traffic}

出于安全原因，在某些情况下，如果传入或传出数据包未加密，则需要丢弃来自或发往特定网络的访问。例如，在 L2TP/IPsec 环境中，可能希望丢弃未加密的 L2TP 连接尝试。

有多种方法可以实现这一点：

- 在防火墙中使用 IPsec policy matcher。
- 使用 action 设置为 **drop** 且优先级较低的通用 IPsec policy（可用于生成动态 policy 的 Road Warrior 环境）。
- 在 mangle 中设置 DSCP 或 priority，并在解封装后于防火墙中匹配相同的值。

#### IPsec 策略匹配器 {#ipsec-policy-matcher}

下面设置一个 IPsec policy matcher，以接受匹配任意 IPsec policy 的所有数据包，并丢弃其余数据包：

```ros
add chain=input comment="ipsec policy matcher" in-interface=WAN ipsec-policy=in,ipsec
add action=drop chain=input comment="drop all" in-interface=WAN log=yes
```

IPsec policy matcher 接受两个参数 **direction、policy**。此处使用了 incoming direction 和 IPsec policy。IPsec policy 选项允许检查解封装后的数据包，因此，例如，如果只允许来自特定源地址的 GRE 封装数据包并丢弃其余数据包，可以设置以下规则：

```ros
add chain=input comment="ipsec policy matcher" in-interface=WAN ipsec-policy=in,ipsec protocol=gre src-address=192.168.33.1
add action=drop chain=input comment="drop all" in-interface=WAN log=yes
```

对于 L2TP，规则集如下：

```ros
add chain=input comment="ipsec policy matcher" in-interface=WAN ipsec-policy=in,ipsec protocol=udp dst-port=1701
add action=drop chain=input protocol=udp dst-port=1701 comment="drop l2tp" in-interface=WAN log=yes
```

#### 使用通用 IPsec policy {#using-generic-ipsec-policy}

此方法的技巧是添加一条 action 为 drop 的默认策略。假设我们在公网地址 1.1.1.1 上运行 L2TP/IPsec 服务器，并且希望丢弃所有未加密的 L2TP：

```ros
/ip/ipsec/policy
add src-address=1.1.1.1 dst-address=0.0.0.0/0 sa-src-address=1.1.1.1 protocol=udp src-port=1701 tunnel=yes action=discard
```

现在，路由器将丢弃所有未加密的 L2TP 入站流量，但在 L2TP/IPsec 连接成功后，会创建一条优先级高于默认静态规则的动态策略，匹配该动态规则的数据包可以被转发。

:::warning
策略顺序很重要！要使此方法生效，请确保静态 drop 策略位于动态策略下方。如有必要，将其移动到策略模板下方。
:::

```ros
[admin@rack2_10g1] /ip/ipsec/policy> print
Flags: T - template, X - disabled, D - dynamic, I - inactive, * - default
0 T * group=default src-address=::/0 dst-address=::/0 protocol=all
proposal=default template=yes

1 D src-address=1.1.1.1/32 src-port=1701 dst-address=10.5.130.71/32
dst-port=any protocol=udp action=encrypt level=require
ipsec-protocols=esp tunnel=no sa-src-address=1.1.1.1
sa-dst-address=10.5.130.71

2 src-address=1.1.1.1/32 src-port=1701 dst-address=0.0.0.0/0
dst-port=any protocol=udp action=discard level=unique
ipsec-protocols=esp tunnel=yes sa-src-address=1.1.1.1
sa-dst-address=0.0.0.0 proposal=default manual-sa=none
```

### 在 Peer 配置中手动指定 local-address 参数 {#manually-specifying-local-address-parameter-under-peer-configuration}

#### 使用不同的路由表 {#using-different-routing-table}

IPsec 与 RouterOS 中的其他服务一样，无论 Peer 配置使用哪个 local-address 参数，都会使用 main 路由表。必须为 IKE 和 IPSec 流量都应用路由标记。

请看以下示例。存在两条默认路由：一条位于 main 路由表中，另一条位于名为“backup”的路由表中。IPsec site-to-site 隧道需要使用 backup 链路。

```ros
[admin@pair_r1] > /ip/route/print detail 
Flags: X - disabled, A - active, D - dynamic, C - connect, S - static, r - rip, b - bgp, o - ospf, m - mme, B - blackhole, U - unreachable, P - prohibit 
0 A S dst-address=0.0.0.0/0 gateway=10.155.107.1 gateway-status=10.155.107.1 reachable via ether1 distance=1 scope=30 target-scope=10 routing-mark=backup 

1 A S dst-address=0.0.0.0/0 gateway=172.22.2.115 gateway-status=172.22.2.115 reachable via ether2 distance=1 scope=30 target-scope=10 

2 ADC dst-address=10.155.107.0/25 pref-src=10.155.107.8 gateway=ether1 gateway-status=ether1 reachable distance=0 scope=10 

3 ADC dst-address=172.22.2.0/24 pref-src=172.22.2.114 gateway=ether2 gateway-status=ether2 reachable distance=0 scope=10 

4 ADC dst-address=192.168.1.0/24 pref-src=192.168.1.1 gateway=bridge-local gateway-status=ether2 reachable distance=0 scope=10 

[admin@pair_r1] > /ip/firewall/nat/print 
Flags: X - disabled, I - invalid, D - dynamic 
0 chain=srcnat action=masquerade out-interface=ether1 log=no log-prefix="" 

1 chain=srcnat action=masquerade out-interface=ether2 log=no log-prefix="" 
```

IPsec peer 和 policy 配置，以及用于 IPsec 隧道流量的 NAT bypass 规则，均使用 backup 链路的源地址创建。

```ros
/ip/ipsec/peer
add address=10.155.130.136/32 local-address=10.155.107.8 secret=test
/ip/ipsec/policy
add sa-src-address=10.155.107.8 src-address=192.168.1.0/24 dst-address=172.16.0.0/24 sa-dst-address=10.155.130.136 tunnel=yes
/ip/firewall/nat
add action=accept chain=srcnat src-address=192.168.1.0/24 dst-address=172.16.0.0/24 place-before=0
```

当前，日志中出现“phase1 negotiation failed due to time up”错误。原因是 IPsec 尝试使用主路由表和错误的源地址访问远端对等体。需要使用 Mangle 标记 UDP/500、UDP/4500 和 ipsec-esp 数据包：

```ros
/ip/firewall/mangle
add action=mark-connection chain=output connection-mark=no-mark dst-address=10.155.130.136 dst-port=500,4500 new-connection-mark=ipsec passthrough=yes protocol=udp
add action=mark-connection chain=output connection-mark=no-mark dst-address=10.155.130.136 new-connection-mark=ipsec passthrough=yes protocol=ipsec-esp
add action=mark-routing chain=output connection-mark=ipsec new-routing-mark=backup passthrough=no
```

#### 同一路由表使用多个 IP 地址 {#using-the-same-routing-table-with-multiple-ip-addresses}

请参考以下示例。公网接口上有同一子网的多个 IP 地址。out-interface 上配置了 Masquerade 规则。需要显式使用其中一个 IP 地址。

```ros
[admin@pair_r1] > /ip/address/print 
Flags: X - disabled, I - invalid, D - dynamic 
# ADDRESS NETWORK INTERFACE
0 192.168.1.1/24 192.168.1.0 bridge-local
1 172.22.2.1/24 172.22.2.0 ether1
2 172.22.2.2/24 172.22.2.0 ether1
3 172.22.2.3/24 172.22.2.0 ether1

[admin@pair_r1] > /ip/route/print 
Flags: X - disabled, A - active, D - dynamic, C - connect, S - static, r - rip, b - bgp, o - ospf, m - mme, B - blackhole, U - unreachable, P - prohibit 
# DST-ADDRESS PREF-SRC GATEWAY DISTANCE
1 A S 0.0.0.0/0 172.22.2.115 1
3 ADC 172.22.2.0/24 172.22.2.1 ether1 0
4 ADC 192.168.1.0/24 192.168.1.1 bridge-local 0

[admin@pair_r1] /ip/firewall/nat> print 
Flags: X - disabled, I - invalid, D - dynamic 
0 chain=srcnat action=masquerade out-interface=ether1 log=no log-prefix="" 
```

IPsec peer 和 policy 配置使用其中一个公网 IP 地址创建。

```ros
/ip/ipsec/peer
add address=10.155.130.136/32 local-address=172.22.2.3 secret=test
/ip/ipsec/policy
add sa-src-address=172.22.2.3 src-address=192.168.1.0/24 dst-address=172.16.0.0/24 sa-dst-address=10.155.130.136 tunnel=yes
/ip/firewall/nat
add action=accept chain=srcnat src-address=192.168.1.0/24 dst-address=172.16.0.0/24 place-before=0
```

当前，phase 1 连接使用的源地址与指定的地址不同，日志中显示“phase1 negotiation failed due to time up”错误。这是因为 masquerade 会将连接的源地址更改为所连接路由的 pref-src 地址。解决方案是排除来自该公网 IP 地址的连接，使其不被 masquerade。

```ros
/ip/firewall/nat
add action=accept chain=srcnat protocol=udp src-port=500,4500 place-before=0
```

## 应用示例 {#application-examples}

### Site to Site IPsec（IKEv1）隧道 {#site-to-site-ipsec-ikev1-tunnel}

请参考如下图所示的设置。两台远程办公室路由器连接到互联网，办公室工作站位于 NAT 之后。每个办公室都有自己的本地子网，Office1 为 10.1.202.0/24，Office2 为 10.1.101.0/24。两个远程办公室都需要到路由器后方本地网络的安全隧道。

![](/img/e82d4ebd9d1188e7.webp)

#### **Site 1 配置** {#site-1-configuration}

首先创建新的 Phase 1 profile 和 Phase 2 proposal 条目，使用适合需求的较强或较弱加密参数。建议为每个菜单创建单独的条目，以便每个 peer 都有独立配置，便于日后调整任何设置。这些参数必须在两个站点之间匹配，否则连接无法建立。

```ros
/ip/ipsec/profile
add dh-group=modp2048 enc-algorithm=aes-128 name=ike1-site2
/ip/ipsec/proposal
add enc-algorithms=aes-128-cbc name=ike1-site2 pfs-group=modp2048
```

继续配置 peer。指定远端路由器的地址。该地址应可通过 UDP/500 和 UDP/4500 端口访问，因此请确保对路由器防火墙采取相应操作。同时指定该 peer 的名称以及新创建的 profile。

```ros
/ip/ipsec/peer
add address=192.168.80.1/32 name=ike1-site2 profile=ike1-site2
```

下一步创建 identity。对于使用预共享密钥保护的基本隧道，除了设置一个**强**密钥以及该 identity 适用的 peer 之外，几乎无需其他设置。

```ros
/ip/ipsec/identity
add peer=ike1-site2 secret=thisisnotasecurepsk
```

:::danger
如果重视安全性，请考虑使用 IKEv2 和其他 auth-method。
:::

最后，创建 policy，用于控制需要对哪些网络/主机之间的流量进行加密。

```ros
/ip/ipsec/policy
add src-address=10.1.202.0/24 src-port=any dst-address=10.1.101.0/24 dst-port=any tunnel=yes action=encrypt proposal=ike1-site2 peer=ike1-site2
```

#### **Site 2 配置** {#site-2-configuration}

Office 2 的配置与 Office 1 几乎相同，只需配置正确的 IP 地址。首先创建新的 Phase 1 profile 和 Phase 2 proposal 条目：

```ros
/ip/ipsec/profile
add dh-group=modp2048 enc-algorithm=aes-128 name=ike1-site1
/ip/ipsec/proposal
add enc-algorithms=aes-128-cbc name=ike1-site1 pfs-group=modp2048
```

接下来是对等体和身份：

```ros
/ip/ipsec/peer
add address=192.168.90.1/32 name=ike1-site1 profile=ike1-site1
/ip/ipsec/identity
add peer=ike1-site1 secret=thisisnotasecurepsk
```

完成后，创建策略：

```ros
/ip/ipsec/policy
add src-address=10.1.101.0/24 src-port=any dst-address=10.1.202.0/24 dst-port=any tunnel=yes action=encrypt proposal=ike1-site1 peer=ike1-site1
```

此时，隧道应已建立，并且两台路由器上均应创建两个 IPsec Security Associations：

```ros
/ip/ipsec
active-peers print
installed-sa print
```

#### **NAT 和 Fasttrack 绕过** {#nat-and-fasttrack-bypass}

此时，如果尝试通过 IPsec 隧道发送流量，将无法成功；数据包会丢失。这是因为两台路由器都有 NAT 规则（masquerade），会在数据包加密前更改源地址。由于源地址与策略配置中指定的地址不匹配，路由器无法加密该数据包。详情请参阅 IPsec 数据包流示例。

要解决此问题，需要设置 IP/Firewall/NAT 绕过规则。

Office 1 路由器：

```ros
/ip/firewall/nat
add chain=srcnat action=accept place-before=0 src-address=10.1.202.0/24 dst-address=10.1.101.0/24
```

Office 2 路由器：

```ros
/ip/firewall/nat
add chain=srcnat action=accept place-before=0 src-address=10.1.101.0/24 dst-address=10.1.202.0/24
```

:::warning
如果在添加 NAT 旁通规则之前已尝试建立 IP 连接，则必须从连接表中清除现有连接，或重启两台路由器。
:::

将旁通规则放在所有其他 NAT 规则之上非常重要。

另一个问题是，如果启用了 IP/Fasttrack，数据包会绕过 IPsec 策略。因此，需要在 FastTrack 之前添加一条 accept 规则。

```ros
/ip/firewall/filter
add chain=forward action=accept place-before=1
src-address=10.1.101.0/24 dst-address=10.1.202.0/24 connection-state=established,related
add chain=forward action=accept place-before=1
src-address=10.1.202.0/24 dst-address=10.1.101.0/24 connection-state=established,related
```

但是，如果存在大量隧道且每条隧道都有较大流量，这可能会给路由器 CPU 带来显著负载。

解决方案是使用 IP/Firewall/Raw 旁通连接跟踪，从而无需上面列出的 filter 规则，并将 CPU 负载降低约 30%。

```ros
/ip/firewall/raw
add action=notrack chain=prerouting src-address=10.1.101.0/24 dst-address=10.1.202.0/24
add action=notrack chain=prerouting src-address=10.1.202.0/24 dst-address=10.1.101.0/24
```

### 使用 DNS 建立基于 IPsec（IKEv2）的站点到站点 GRE 隧道 {#site-to-site-gre-tunnel-over-ipsec-ikev2-using-dns}

本示例说明当一个站点或两个站点没有静态 IP 地址时，如何在两台 RouterOS 设备之间建立安全且加密的 GRE 隧道。在进行此配置之前，必须为其中一台将充当响应方（服务器）的设备分配 DNS 名称。为简化起见，我们将使用 RouterOS 内置的 DDNS 服务 IP/Cloud。

![](/img/a4224852afe39ede.webp)

#### 站点 1（服务器）配置 {#site-1-server-configuration}

该端将监听传入连接并充当响应方。我们将使用 mode config 为第二个站点提供 IP 地址，但首先创建一个 loopback（blank）网桥，并为其分配一个稍后用于建立 GRE 隧道的 IP 地址。

```ros
/interface/bridge 
add name=loopback
/ip/address
add address=192.168.99.1 interface=loopback
```

继续配置 IPsec，首先创建一个新的 Phase 1 profile 和 Phase 2 proposal 条目，使用符合需求的更强或更弱加密参数。请注意，此配置示例将监听所有传入的 IKEv2 请求，这意味着 profile 配置将在所有其他配置之间共享（例如 RoadWarrior）。

```ros
/ip/ipsec/profile
add dh-group=ecp256,modp2048,modp1024 enc-algorithm=aes-256,aes-192,aes-128 name=ike2
/ip/ipsec/proposal
add auth-algorithms=null enc-algorithms=aes-128-gcm name=ike2-gre pfs-group=none
```

接下来，创建一个 responder=yes 的新 mode config 条目。它将为另一个站点提供 IP 配置，并为策略生成提供主机（loopback 地址）。

```ros
/ip/ipsec/mode-config
add address=192.168.99.2 address-prefix-length=32 name=ike2-gre split-include=192.168.99.1/32 system-dns=no
```

建议创建一个新的 policy group，以将此配置与任何现有或未来的 IPsec 配置分开。

```ros
/ip/ipsec/policy/group
add name=ike2-gre
```

现在需要设置一个新的 policy template，使其匹配远端对等体的新动态地址和 loopback 地址。

```ros
/ip/ipsec/policy
add dst-address=192.168.99.2/32 group=ike2-gre proposal=ike2-gre src-address=192.168.99.1/32 template=yes
```

下一步是创建一个 peer 配置，用于监听所有 IKEv2 请求。如果已有此类条目，可以跳过此步骤。

```ros
/ip/ipsec/peer
add exchange-mode=ike2 name=ike2 passive=yes profile=ike2
```

最后，设置一个 identity，通过带有特定 secret 的 pre-shared-key 认证来匹配远端 peer。

```ros
/ip/ipsec/identity
add generate-policy=port-strict mode-config=ike2-gre peer=ike2 policy-template-group=ike2-gre secret=test
```

服务器端现已配置完成，并正在监听所有 IKEv2 请求。请确保防火墙未阻止 UDP/4500 端口。

最后一步是创建 GRE 接口本身。这也可以在客户端建立 IPsec 连接后完成。

```ros
/interface/gre
add local-address=192.168.99.1 name=gre-tunnel1 remote-address=192.168.99.2
```

通过 GRE 接口配置 IP 地址和到远程网络的路由。

```ros
/ip/address
add address=172.16.1.1/30 interface=gre-tunnel1
/ip/route
add dst-address=10.1.202.0/24 gateway=172.16.1.2
```

#### Site 2（客户端）配置 {#site-2-client-configuration}

与服务器配置类似，首先创建新的 Phase 1 profile 和 Phase 2 proposal 配置。由于该站点将作为发起方，可以使用更具体的 profile 配置来控制使用的加密参数，只需确保这些参数与服务器端配置的参数重叠即可。

```ros
/ip/ipsec/profile
add dh-group=ecp256 enc-algorithm=aes-256 name=ike2-gre
/ip/ipsec/proposal
add auth-algorithms=null enc-algorithms=aes-128-gcm name=ike2-gre pfs-group=none
```

接下来，创建新的 mode config 条目，并设置 responder=no。这将确保对端向服务器请求 IP 和 split-network 配置。

```ros
/ip/ipsec/mode-config
add name=ike2-gre responder=no
```

还建议创建新的 policy group，以将该配置与现有或未来的 IPsec 配置分开。

```ros
/ip/ipsec/policy/group
add name=ike2-gre
```

同样，在客户端创建新的 policy template。

```ros
/ip/ipsec/policy
add dst-address=192.168.99.1/32 group=ike2-gre proposal=ike2-gre src-address=192.168.99.2/32 template=yes
```

继续进行 peer 配置。现在可以在 address 参数下指定服务器的 DNS 名称。显然，也可以使用 IP 地址。

```ros
/ip/ipsec/peer
add address=n.mynetname.net exchange-mode=ike2 name=p1.ez profile=ike2-gre
```

最后，为新创建的对等体创建身份。

```ros
/ip/ipsec/identity
add generate-policy=port-strict mode-config=ike2-gre peer=p1.ez policy-template-group=ike2-gre secret=test
```

如果所有操作均正确完成，应出现一条新的动态策略。

```ros
/ip/ipsec/policy/print 
Flags: T - template, X - disabled, D - dynamic, I - invalid, A - active, * - default 
0 T * group=default src-address=::/0 dst-address=::/0 protocol=all proposal=default template=yes

1 T group=ike2-gre src-address=192.168.99.2/32 dst-address=192.168.99.1/32 protocol=all proposal=ike2-gre template=yes

2 DA src-address=192.168.99.2/32 src-port=any dst-address=192.168.99.1/32 dst-port=any protocol=all action=encrypt level=unique ipsec-protocols=esp 
tunnel=yes sa-src-address=192.168.90.1 sa-dst-address=(current IP of n.mynetname.net) proposal=ike2-gre ph2-count=1 
```

现在，两个站点之间已建立安全隧道，将加密 192.168.99.2 \<=> 192.168.99.1 地址之间的所有流量。可使用这些地址创建 GRE 隧道。

```ros
/interface/gre
add local-address=192.168.99.2 name=gre-tunnel1 remote-address=192.168.99.1
```

配置 IP 地址，并通过 GRE 接口配置到远程网络的路由。

```ros
/ip/address
add address=172.16.1.2/30 interface=gre-tunnel1
/ip/route
add dst-address=10.1.101.0/24 gateway=172.16.1.1
```

### 使用 IKEv2 和 RSA 认证的 Road Warrior 设置 {#road-warrior-setup-using-ikev2-with-rsa-authentication}

本示例说明如何在连接到 Internet 的设备（Road Warrior 客户端）与作为服务器运行的 RouterOS 设备之间建立安全的 IPsec 连接。

![](/img/15261a1aca9285d4.webp)

#### RouterOS 服务器配置 {#routeros-server-configuration}

在配置 IPsec 之前，需要设置证书。可以使用单独的 Certificate Authority 进行证书管理；不过，本示例在 RouterOS 的 System/Certificates 菜单中生成自签名证书。要将各种设备连接到服务器，应满足一些证书要求：

- 通用名称应包含服务器的 IP 或 DNS 名称。
- SAN（subject alternative name）应包含服务器的 IP 或 DNS 名称。
- 需要 EKU（extended key usage）tls-server 和 tls-client。

考虑上述所有要求，生成 CA 和服务器证书：

```ros
/certificate
add common-name=ca name=ca
sign ca ca-crl-host=2.2.2.2
add common-name=2.2.2.2 subject-alt-name=IP:2.2.2.2 key-usage=tls-server name=server1
sign server1 ca=ca
```

现在已在路由器上创建有效证书，添加新的 Phase 1 profile 和 Phase 2 proposal 条目，并设置 pfs-group=none：

```ros
/ip/ipsec/profile
add name=ike2
/ip/ipsec/proposal
add name=ike2 pfs-group=none
```

Mode config 用于从 IP/Pools 分配地址：

```ros
/ip/pool
add name=ike2-pool ranges=192.168.77.2-192.168.77.254
/ip/ipsec/mode-config
add address-pool=ike2-pool address-prefix-length=32 name=ike2-conf
```

由于必须调整 policy template 以仅允许特定网络策略，建议创建单独的 policy group 和 template。

```ros
/ip/ipsec/policy/group
add name=ike2-policies
/ip/ipsec/policy
add dst-address=192.168.77.0/24 group=ike2-policies proposal=ike2 src-address=0.0.0.0/0 template=yes
```

创建新的 IPsec peer 条目，监听所有传入的 IKEv2 请求。

```ros
/ip/ipsec/peer
add exchange-mode=ike2 name=ike2 passive=yes profile=ike2
```

##### 身份配置 {#identity-configuration}

identity 菜单允许匹配特定远端 peer，并为每个 peer 分配不同配置。首先，创建一个默认 identity，接受所有 peer，但使用其证书验证 peer 的身份。

```ros
/ip/ipsec/identity
add auth-method=digital-signature certificate=server1 generate-policy=port-strict mode-config=ike2-conf peer=ike2 policy-template-group=ike2-policies
```

:::warning
如果对端的 ID（ID\_i）与其发送的证书不匹配，身份查找将失败。请参阅 identities 部分的 remote-id。
:::

例如，要为用户“A”分配不同的 mode config，该用户使用证书“rw-client1”向服务器进行身份验证。首先，确保已创建新的 mode config，并可用于应用到指定用户。

```ros
/ip/ipsec/mode-config
add address=192.168.66.2 address-prefix-length=32 name=usr_A split-include=192.168.55.0/24 system-dns=no
```

可以通过 match-by=certificate 参数并使用 remote-certificate 指定其证书，将此配置应用于用户“A”。

```ros
/ip/ipsec/identity
add auth-method=digital-signature certificate=server1 generate-policy=port-strict match-by=certificate mode-config=usr_A peer=ike2 policy-template-group=ike2-policies remote-certificate=rw-client1
```

##### （可选）Split tunnel 配置 {#optional-split-tunnel-configuration}

Split tunneling 是一种方法，允许 road warrior 客户端仅访问特定的安全网络，同时根据客户端内部路由表发送其余流量（而不是通过隧道发送所有流量）。要配置 split tunneling，需要修改 mode config 参数。

例如，允许 road warrior 客户端仅访问 10.5.8.0/24 网络。

```ros
/ip/ipsec/mode-conf
set [find name="rw-conf"] split-include=10.5.8.0/24
```

还可以向客户端发送要使用的特定 DNS 服务器。默认使用 system-dns=yes，它会发送在 IP/DNS 中路由器上配置的 DNS 服务器。可以通过 static-dns 参数强制客户端使用其他 DNS 服务器。

```ros
/ip/ipsec/mode-conf
set [find name="rw-conf"] system-dns=no static-dns=10.5.8.1
```

虽然可以调整 IPsec policy template，仅允许 road warrior 客户端生成到 split-include 参数所配置网络的策略，但这可能导致与不同厂商实现的兼容性问题（请参阅已知限制）。不要调整 policy template，而是在 IP/Firewall/Filter 中允许访问安全网络，并丢弃其他所有流量。

```ros
/ip/firewall/filter
add action=drop chain=forward src-address=192.168.77.0/24 dst-address=!10.5.8.0/24
```

:::warning
分离网络不是一种安全措施。客户端（发起方）仍可请求不同的 Phase 2 流量选择器。
:::

##### 生成客户端证书 {#generating-client-certificates}

要为客户端生成新证书，并使用先前创建的 CA 对其进行签名。

```ros
/certificate
add common-name=rw-client1 name=rw-client1 key-usage=tls-client
sign rw-client1 ca=ca
```

大多数客户端实现都接受 **PKCS12 格式**，因此导出证书时，请确保指定 PKCS12。

```ros
/certificate
export-certificate rw-client1 export-passphrase=1234567890 type=pkcs12
```

现在，路由器 System/File 中有一个名为 *cert\_export\_rw-client1.p12* 的文件。该文件应安全地传输到客户端设备。

通常，PKCS12 包也包含 CA 证书，但某些厂商可能不会安装该 CA，因此必须使用 PEM 格式单独导出自签名 CA 证书。

```ros
/certificate
export-certificate ca type=pem
```

现在，路由器 System/File 中有一个名为 *cert\_export\_ca.crt* 的文件。该文件也应安全地传输到客户端设备。

**PEM** 是另一种证书格式，用于不支持 PKCS12 的客户端软件。原理基本相同。

```ros
/certificate
export-certificate ca
export-certificate rw-client1 export-passphrase=1234567890
```

三个文件现在位于路由器的 Files 部分：*cert\_export\_ca.crt*、*cert\_export\_rw-client1.crt* 和 *cert\_export\_rw-client1.key*，应安全传输到客户端设备。

##### 已知限制 {#known-limitations}

以下是常见客户端软件 IKEv2 实现的已知限制列表。

- Windows 将始终忽略通过 split-include 接收的网络，并请求目标为 0.0.0.0/0 的策略（TSr）。生成 IPsec-SA 时，Windows 会请求 DHCP option 249，RouterOS 将自动使用已配置的 split-include 网络进行响应。

- Apple macOS 和 iOS 都只接受第一个 split-include 网络。

- 只有在使用 0.0.0.0/0 split-include 时，Apple macOS 和 iOS 才会使用 system-dns 和 static-dns 参数中的 DNS 服务器。

- 虽然某些实现可以为 phase 2 使用不同的 PFS group，但建议在 proposals 下使用 pfs-group=none，以避免任何兼容性问题。

#### RouterOS 客户端配置 {#routeros-client-configuration}

在 RouterOS 中导入 PKCS12 格式的证书。

```ros
/certificate/import file-name=cert_export_RouterOS_client.p12 passphrase=1234567890
```

现在，“Certificate”菜单中应包含自签名 CA 证书和客户端证书。查找客户端证书的名称。

```ros
/certificate/print
```

**cert\_export\_RouterOS\_client.p12\_0** 是客户端证书。

建议创建单独的 Phase 1 profile 和 Phase 2 proposal 配置，以免影响任何现有 IPsec 配置。

```ros
/ip/ipsec/profile
add name=ike2-rw
/ip/ipsec/proposal
add name=ike2-rw pfs-group=none
```

虽然可以使用默认 policy template 生成 policy，但最好创建新的 policy group 和 template，以将此配置与其他 IPsec 配置分离。

```ros
/ip/ipsec/policy/group
add name=ike2-rw
/ip/ipsec/policy
add group=ike2-rw proposal=ike2-rw template=yes
```

创建新的 mode config 条目，并设置 responder=no，以向服务器请求配置参数。

```ros
/ip/ipsec/mode-config
add name=ike2-rw responder=no
```

最后，创建 peer 和 identity 配置。

```ros
/ip/ipsec/peer
add address=2.2.2.2/32 exchange-mode=ike2 name=ike2-rw-client
/ip/ipsec/identity
add auth-method=digital-signature certificate=cert_export_RouterOS_client.p12_0 generate-policy=port-strict mode-config=ike2-rw peer=ike2-rw-client policy-template-group=ike2-rw
```

验证连接是否成功建立。

```ros
/ip/ipsec
active-peers print
installed-sa print
```

##### 启用动态源 NAT 规则生成 {#enabling-dynamic-source-nat-rule-generation}

如果查看生成的动态策略，可以看到只有具有特定源地址（由 mode config 接收）的数据包才会通过隧道发送。但在大多数情况下，路由器需要将特定设备或网络路由到隧道中。此时，可以使用源 NAT 将数据包的源地址更改为与 mode config 地址匹配。由于 mode config 地址是动态的，无法创建静态源 NAT 规则。在 RouterOS 中，可以为 mode config 客户端生成动态源 NAT 规则。

![](/img/f2c4abd8b00ecd03.webp)

例如，路由器后面有一个本地网络 192.168.88.0/24，并且希望将该网络的所有流量通过隧道发送。首先，必须创建一个新的 IP/Firewall/Address list，其中包含本地网络。

```ros
/ip/firewall/address-list
add address=192.168.88.0/24 list=local
```

完成后，可以将新创建的 IP/Firewall/Address list 分配给 mode config 配置。

```ros
/ip/ipsec/mode-config
set [ find name=ike2-rw ] src-address-list=local
```

验证隧道建立时是否正确动态生成了源 NAT 规则。

```ros
[admin@MikroTik] > /ip/firewall/nat/print 
Flags: X - disabled, I - invalid, D - dynamic 
0 D ;;; ipsec mode-config
chain=srcnat action=src-nat to-addresses=192.168.77.254 src-address-list=local dst-address-list=!local
```

:::danger
确保动态 mode config 地址不属于本地网络。
:::

#### Windows 客户端配置 {#windows-client-configuration}

在 Windows 计算机上打开 PKCS12 格式的证书文件。按照说明安装证书。确保选择 Local Machine 存储位置。![](/img/7f0720a59f02c365.webp) 现在可以进入 Network and Internet settings -> VPN 并添加新配置。填写 Connection name、Server name 或 address 参数。在 VPN type 下选择 IKEv2。完成后，需要选择“Use machine certificates”。可以在 Network and Sharing Center 中点击 VPN 连接的 Properties 菜单完成此操作。该设置位于 Security 选项卡下。

![](/img/d60e9d2292526217.webp)

目前，Windows 10 兼容以下 Phase 1（profiles）和 Phase 2（proposals）提议集：

| Phase 1 |  |  |
| :-- | :-- | :-- |
| 哈希算法 | 加密算法 | DH Group |
| SHA1 | 3DES | modp1024 |
| SHA256 | 3DES | modp1024 |
| SHA1 | AES-128-CBC | modp1024 |
| SHA256 | AES-128-CBC | modp1024 |
| SHA1 | AES-192-CBC | modp1024 |
| SHA256 | AES-192-CBC | modp1024 |
| SHA1 | AES-256-CBC | modp1024 |
| SHA256 | AES-256-CBC | modp1024 |
| SHA1 | AES-128-GCM | modp1024 |
| SHA256 | AES-128-GCM | modp1024 |
| SHA1 | AES-256-GCM | modp1024 |
| SHA256 | AES-256-GCM | modp1024 |

| Phase 2 |  |  |
| :-- | :-- | :-- |
| 哈希算法 | 加密算法 | PFS Group |
| SHA1 | AES-256-CBC | none |
| SHA1 | AES-128-CBC | none |
| SHA1 | 3DES | none |
| SHA1 | DES | none |
| SHA1 | none | none |

#### macOS 客户端配置 {#macos-client-configuration}

在 macOS 计算机上打开 PKCS12 格式的证书文件，并将证书安装到“System”钥匙串中。由于该证书是自签名证书，必须手动将 CA 证书标记为受信任。在 macOS 的“钥匙串访问”应用中找到 System 标签下的证书，并将其标记为“始终信任”。

![](/img/ae8f9610163925e0.webp)

现在可以进入 System Preferences -> Network，点击 + 按钮添加新配置。选择 Interface: VPN，VPN Type: IKEv2，并为连接命名。Remote ID 必须设置为服务器证书的 common-name 或 subjAltName。Local ID 可以留空。在 Authentication Settings 下选择 None，并选择客户端证书。现在可以测试连通性。

![](/img/98ab138f5ea6d75a.webp)

目前，macOS 兼容以下 Phase 1（profiles）和 Phase 2（proposals）提议集：

| Phase 1 |  |  |
| :-- | :-- | :-- |
| 哈希算法 | 加密算法 | DH Group |
| SHA256 | AES-256-CBC | modp2048 |
| SHA256 | AES-256-CBC | ecp256 |
| SHA256 | AES-256-CBC | modp1536 |
| SHA1 | AES-128-CBC | modp1024 |
| SHA1 | 3DES | modp1024 |

| 阶段 2 |  |  |
| :-- | :-- | :-- |
| 哈希算法 | 加密算法 | PFS 组 |
| SHA256 | AES-256-CBC | none |
| SHA1 | AES-128-CBC | none |
| SHA1 | 3DES | none |

#### iOS 客户端配置 {#ios-client-configuration}

通常，PKCS12 包也包含 CA 证书，但 iOS 不会安装该 CA，因此必须使用 PEM 格式单独安装自签名 CA 证书。在 iOS 设备上打开这些文件，并按照说明安装两个证书。必须在 iOS 设备上将自签名 CA 证书标记为受信任。可在 Settings -> General -> About -> Certificate Trust Settings 菜单中完成此操作。完成后，在 Settings -> General -> Profiles 菜单下检查两个证书是否均标记为“verified”。

![](/img/b5ea33be6cc87db1.webp)

现在可以进入 Settings -> General -> VPN 菜单并添加新配置。Remote ID 必须设置为服务器证书的 common-name 或 subjAltName。Local ID 可以留空。

![](/img/a0ba071bd82f918b.webp)

目前，iOS 兼容以下 Phase 1（profiles）和 Phase 2（proposals）提议集：

| 阶段 1 |  |  |
| :-- | :-- | :-- |
| 哈希算法 | 加密算法 | DH 组 |
| SHA256 | AES-256-CBC | modp2048 |
| SHA256 | AES-256-CBC | ecp256 |
| SHA256 | AES-256-CBC | modp1536 |
| SHA1 | AES-128-CBC | modp1024 |
| SHA1 | 3DES | modp1024 |

| 阶段 2 |  |  |
| :-- | :-- | :-- |
| 哈希算法 | 加密算法 | PFS 组 |
| SHA256 | AES-256-CBC | none |
| SHA1 | AES-128-CBC | none |
| SHA1 | 3DES | none |

:::warning
如果通过 WiFi 连接到 VPN，iOS 设备可能会进入睡眠模式并断开网络连接。
:::

#### Android（strongSwan）客户端配置 {#android-strongswan-client-configuration}

目前，Android 不原生支持 IKEv2，但可以使用 Google Play Store 中的 strongSwan，为 Android 提供 IKEv2 支持。strongSwan 接受 PKCS12 格式的证书，因此在 strongSwan 中设置 VPN 连接之前，请确保已将 PKCS12 捆绑包下载到 Android 设备。完成后，在 strongSwan 中创建新的 VPN 配置文件，输入服务器 IP，并选择“IKEv2 Certificate”作为 VPN Type。选择 User certificate 时，按 Install，并通过指定 PKCS12 捆绑包按照证书提取流程操作。保存配置文件，并通过点击 VPN 配置文件测试连接。

![](/img/f1154362a91b750c.webp)

可以通过勾选“Show advanced settings”复选框在 strongSwan 中指定自定义加密设置。目前，strongSwan 默认兼容以下 Phase 1（profiles）和 Phase 2（proposals）提议集：

| Phase 1 |  |  |
| :-- | :-- | :-- |
| 哈希算法 | 加密算法 | DH 组 |
| SHA\* | AES-\*-CBC | modp2048 |
| SHA\* | AES-\*-CBC | ecp256 |
| SHA\* | AES-\*-CBC | ecp384 |
| SHA\* | AES-\*-CBC | ecp521 |
| SHA\* | AES-\*-CBC | modp3072 |
| SHA\* | AES-\*-CBC | modp4096 |
| SHA\* | AES-\*-CBC | modp6144 |
| SHA\* | AES-\*-CBC | modp8192 |
| SHA\* | AES-\*-GCM | modp2048 |
| SHA\* | AES-\*-GCM | ecp256 |
| SHA\* | AES-\*-GCM | ecp384 |
| SHA\* | AES-\*-GCM | ecp521 |
| SHA\* | AES-\*-GCM | modp3072 |
| SHA\* | AES-\*-GCM | modp4096 |
| SHA\* | AES-\*-GCM | modp6144 |
| SHA\* | AES-\*-GCM | modp8192 |

| 阶段 2 |  |  |
| :-- | :-- | :-- |
| 哈希算法 | 加密算法 | PFS 组 |
| none | AES-256-GCM | none |
| none | AES-128-GCM | none |
| SHA256 | AES-256-CBC | none |
| SHA512 | AES-256-CBC | none |
| SHA1 | AES-256-CBC | none |
| SHA256 | AES-192-CBC | none |
| SHA512 | AES-192-CBC | none |
| SHA1 | AES-192-CBC | none |
| SHA256 | AES-128-CBC | none |
| SHA512 | AES-128-CBC | none |
| SHA1 | AES-128-CBC | none |

#### Linux（strongSwan）客户端配置 {#linux-strongswan-client-configuration}

下载 PKCS12 证书捆绑包，并将其移动到 `/etc/ipsec`.d/private 目录。

将导出的私钥口令添加到 `/etc/ipsec`.secrets 文件中，其中“strongSwan\_client.p12”是文件名，“1234567890”是口令。

```bash
: P12 strongSwan_client.p12 "1234567890"
```

将新连接添加到 `/etc/ipsec`.conf 文件中

```bash
conn "ikev2"
keyexchange=ikev2
ike=aes128-sha1-modp2048
esp=aes128-sha1
leftsourceip=%modeconfig
leftcert=strongSwan_client.p12
leftfirewall=yes
right=2.2.2.2
rightid="CN=2.2.2.2"
rightsubnet=0.0.0.0/0
auto=add
```

现在可以重启（或启动）ipsec 守护进程并初始化连接。

```bash
ipsec restart
ipsec up ikev2
```

### 使用 User Manager 处理 EAP-MSCHAPv2 认证的 IKEv2 Road Warrior 设置（RouterOS v7） {#road-warrior-setup-using-ikev2-with-eap-mschapv2-authentication-handled-by-user-manager-routeros-v7}

本示例说明如何在连接到 Internet 的设备（road warrior 客户端）与运行 RouterOS 并充当 IKEv2 服务器和 User Manager 的设备之间建立安全的 IPsec 连接。User Manager 可以在网络中的单独设备上运行，但在本示例中，User Manager 和 IKEv2 服务器都将配置在同一台设备（Office）上。

![](/img/15261a1aca9285d4.webp)

#### RouterOS 服务器配置 {#routeros-server-configuration-1}

##### 要求 {#requirements}

要使此配置正常工作，路由器需要满足以下先决条件：

1. 路由器的 IP 地址应具有有效的公网 DNS 记录，可使用 IP Cloud 实现。
2. 路由器应可通过 Internet 上的 TCP/80 端口访问，如果服务器位于 NAT 之后，应配置端口转发。
3. 路由器上应安装 User Manager 软件包。

##### 生成 Let's Encrypt 证书 {#generating-lets-encrypt-certificate}

在 EAP-MSCHAPv2 身份验证期间，必须进行 TLS 握手，这意味着服务器必须拥有可由客户端验证的证书。为简化此步骤，我们将使用 Let's Encrypt 证书，大多数操作系统无需用户干预即可验证该证书。要生成证书，只需在 Certificates 菜单下启用 SSL 证书。默认情况下，该命令使用 IP Cloud 提供的动态 DNS 记录，但也可以指定自定义 DNS 名称。请注意，DNS 记录应指向路由器。

```ros
/certificate/enable-ssl-certificate
```

如果证书生成成功，应在 Certificates 菜单下看到已安装的 Let's Encrypt 证书。

```ros
/certificate/print detail where name~"letsencrypt"
```

##### 配置 User Manager {#configuring-user-manager}

首先，允许接收来自 localhost（路由器自身）的 RADIUS 请求：

```ros
/user-manager/router
add address=127.0.0.1 comment=localhost name=local shared-secret=test
```

启用 User Manager，并指定将用于验证用户的 Let's Encrypt 证书（将证书名称替换为设备上已安装的证书名称）。

```ros
/user-manager
set certificate="letsencrypt_2021-04-09T07:10:55Z" enabled=yes
```

最后添加用户及其凭据，客户端将使用这些凭据向服务器进行身份验证。

```ros
/user-manager/user
add name=user1 password=password
```

##### 配置 RADIUS 客户端 {#configuring-radius-client}

要使路由器使用 RADIUS 服务器进行用户身份验证，需要添加一个新的 RADIUS 客户端，其 shared secret 必须与已在 User Manager 中配置的相同。

```ros
/radius
add address=127.0.0.1 secret=test service=ipsec
```

##### IPsec（IKEv2）服务器配置 {#ipsec-ikev2-server-configuration}

添加新的 Phase 1 profile 和 Phase 2 proposal 条目，并设置 pfs-group=none：

```ros
/ip/ipsec/profile
add name=ike2
/ip/ipsec/proposal
add name=ike2 pfs-group=none
```

Mode config 用于从 IP/Pools 分配地址。

```ros
/ip/pool
add name=ike2-pool ranges=192.168.77.2-192.168.77.254
/ip/ipsec/mode-config
add address-pool=ike2-pool address-prefix-length=32 name=ike2-conf
```

由于必须调整 policy template 以仅允许特定网络策略，建议创建单独的 policy group 和 template。

```ros
/ip/ipsec/policy/group
add name=ike2-policies
/ip/ipsec/policy
add dst-address=192.168.77.0/24 group=ike2-policies proposal=ike2 src-address=0.0.0.0/0 template=yes
```

创建新的 IPsec peer 条目，它将监听所有传入的 IKEv2 请求。

```ros
/ip/ipsec/peer
add exchange-mode=ike2 name=ike2 passive=yes profile=ike2
```

最后，创建一条新的 IPsec identity 条目，以匹配所有尝试使用 EAP 进行身份验证的客户端。请注意，必须指定生成的 Let's Encrypt 证书。

```ros
/ip/ipsec/identity
add auth-method=eap-radius certificate="letsencrypt_2021-04-09T07:10:55Z" generate-policy=port-strict mode-config=ike2-conf peer=ike2 \
policy-template-group=ike2-policies
```

##### （可选）Split tunnel 配置 {#optional-split-tunnel-configuration-1}

Split tunneling 是一种方法，允许 road warrior 客户端仅访问特定的安全网络，同时根据客户端内部路由表发送其余流量（而不是通过隧道发送所有流量）。要配置 split tunneling，需要修改 mode config 参数。

例如，我们将允许 road warrior 客户端仅访问 10.5.8.0/24 网络。

```ros
/ip/ipsec/mode-conf
set [find name="rw-conf"] split-include=10.5.8.0/24
```

也可以向客户端发送要使用的特定 DNS 服务器。默认使用 system-dns=yes，它会发送在 IP/DNS 中路由器上配置的 DNS 服务器。可以通过 static-dns 参数强制客户端使用其他 DNS 服务器。

```ros
/ip/ipsec/mode-conf
set [find name="rw-conf"] system-dns=no static-dns=10.5.8.1
```

:::warning
Split networking 不是一种安全措施。客户端（发起方）仍可以请求不同的 Phase 2 traffic selector。
:::

##### （可选）为用户分配静态 IP 地址 {#optional-assigning-static-ip-address-to-user}

可以通过 RADIUS Framed-IP-Address 属性为任何用户分配静态 IP 地址。

```ros
/user-manager/user
set [find name="user1"] attributes=Framed-IP-Address:192.168.77.100 shared-users=1
```

:::danger
为避免任何冲突，应从其他用户的 IP 池中排除该静态 IP 地址，并为该特定用户将 shared-users 设置为 1。
:::

##### （可选）计费配置 {#optional-accounting-configuration}

要记录每个用户的在线时长、下载和上传统计信息，可以使用 RADIUS 计费。默认情况下，IPsec 的 RADIUS 计费已启用，但建议配置 Interim Update 计时器，以定期向 RADIUS 服务器发送统计信息。如果路由器将处理大量并发会话，建议增大更新计时器，以避免 CPU 使用率升高。

```ros
/ip/ipsec/settings
set interim-update=1m
```

### 基本 L2TP/IPsec 设置 {#basic-l2tpipsec-setup}

本示例演示如何在 RouterOS 上轻松设置 L2TP/IPsec 服务器，用于 road warrior 连接（适用于 Windows、Android、iOS、macOS 和其他厂商的 L2TP/IPsec 实现）。

#### RouterOS 服务器配置 {#routeros-server-configuration-2}

第一步是启用 L2TP 服务器：

```ros
/interface/l2tp-server/server
set enabled=yes use-ipsec=required ipsec-secret=mySecret default-profile=default
```

use-ipsec 设置为 **required**，以确保仅接受 IPsec 封装的 L2TP 连接。

其作用是启用 L2TP 服务器，并使用指定的 secret 创建动态 IPsec peer。

```ros
[admin@MikroTik] /ip/ipsec/peer> print 
0 D address=0.0.0.0/0 local-address=0.0.0.0 passive=yes port=500 
auth-method=pre-shared-key secret="123" generate-policy=port-strict 
exchange-mode=main-l2tp send-initial-contact=yes nat-traversal=yes 
hash-algorithm=sha1 enc-algorithm=3des,aes-128,aes-192,aes-256 
dh-group=modp1024 lifetime=1d dpd-interval=2m dpd-maximum-failures=5 
```

:::warning
如果存在静态 IPsec peer 配置，请务必小心。
:::

下一步是创建 VPN 地址池并添加一些用户。

```ros
/ip/pool/add name=vpn-pool range=192.168.99.2-192.168.99.100

/ppp/profile
set default local-address=192.168.99.1 remote-address=vpn-pool

/ppp/secret
add name=user1 password=123
add name=user2 password=234
```

现在，路由器已准备好接受 L2TP/IPsec 客户端连接。

#### RouterOS 客户端配置 {#routeros-client-configuration-1}

要使 RouterOS 作为 L2TP/IPsec 客户端工作，只需添加新的 L2TP 客户端即可。

```ros
/interface/l2tp-client
add connect-to=1.1.1.1 disabled=no ipsec-secret=mySecret name=l2tp-out1 \
password=123 use-ipsec=yes user=user1
```

它将自动创建动态 IPsec peer 和 policy 配置。

### Troubleshooting/FAQ

#### 阶段 1 Failed to get a valid proposal {#phase-1-failed-to-get-a-valid-proposal}

```ros
[admin@MikroTik] /log> print
(..)
17:12:32 ipsec,error no suitable proposal found. 
17:12:32 ipsec,error 10.5.107.112 failed to get valid proposal. 
17:12:32 ipsec,error 10.5.107.112 failed to pre-process ph1 packet (side: 1, status 1). 
17:12:32 ipsec,error 10.5.107.112 phase1 negotiation failed. 
(..)
```

对等体无法协商加密参数，导致连接断开。要解决此问题，请启用 IPSec 调试日志，查看远端对等体提议的参数，并相应调整配置。

```ros
[admin@MikroTik] /system/logging> add topics=ipsec,!debug
```

```ros
[admin@MikroTik] /log> print
(..)
17:21:08 ipsec rejected hashtype: DB(prop#1:trns#1):Peer(prop#1:trns#1) = MD5:SHA 
17:21:08 ipsec rejected enctype: DB(prop#1:trns#2):Peer(prop#1:trns#1) = 3DES-CBC:AES-CBC 
17:21:08 ipsec rejected hashtype: DB(prop#1:trns#2):Peer(prop#1:trns#1) = MD5:SHA 
17:21:08 ipsec rejected enctype: DB(prop#1:trns#1):Peer(prop#1:trns#2) = AES-CBC:3DES-CBC 
17:21:08 ipsec rejected hashtype: DB(prop#1:trns#1):Peer(prop#1:trns#2) = MD5:SHA 
17:21:08 ipsec rejected hashtype: DB(prop#1:trns#2):Peer(prop#1:trns#2) = MD5:SHA 
17:21:08 ipsec,error no suitable proposal found. 
17:21:08 ipsec,error 10.5.107.112 failed to get valid proposal. 
17:21:08 ipsec,error 10.5.107.112 failed to pre-process ph1 packet (side: 1, status 1). 
17:21:08 ipsec,error 10.5.107.112 phase1 negotiation failed. 
(..)
```

在本示例中，远端要求使用 SHA1 作为哈希算法，但本地路由器配置的是 MD5。冒号（:）前的设置配置在本地端，冒号（:）后的参数配置在远端。

#### “phase1 negotiation failed due to time up” 是什么意思？ {#phase1-negotiation-failed-due-to-time-up-what-does-it-mean}

对等体之间存在通信问题。可能的原因包括：Phase 1 IP 地址配置错误；防火墙阻止 UDP 端口 500 和 4500；对等体之间的 NAT 未正确转换 IPsec 协商数据包。如果 local-address 参数使用不当，也可能出现此错误消息。详情请参阅此处。

#### 随机丢包，或通过隧道的连接非常慢，启用 packet sniffer/torch 后问题消失？ {#random-packet-drops-or-connections-over-the-tunnel-are-very-slow-enabling-packet-sniffertorch-fixes-the-problem}

问题在于，封装前数据包被发送到 Fasttrack/FastPath，从而绕过 IPsec 策略检查。解决方案是从 Fasttrack 中排除需要封装/解封装的流量。

#### 如何启用 ike2？ {#how-to-enable-ike2}

对于基本配置，启用 ike2 非常简单。只需在 peer 设置中将 exchange-mode 更改为 ike2。

#### fatal NO-PROPOSAL-CHOSEN 通知消息？ {#fatal-no-proposal-chosen-notify-message}

远端对等体发送了一条通知，表示无法接受所提议的算法。要查明问题的确切原因，请查看远端对等体的调试日志或配置，并确认客户端和服务器使用相同的算法集。

#### 只能单向 ping 通？ {#i-can-ping-only-in-one-direction}

此类情况的典型问题是防火墙过于严格：防火墙规则仅允许在一个方向上创建新连接。解决方法是重新检查防火墙规则，或明确接受所有应被封装/解封装的流量。

#### 是否可以只允许加密流量？ {#can-i-allow-only-encrypted-traffic}

可以，请参阅“Allow only IPsec encapsulated traffic”示例。

#### 我在 StrongSwan 上启用 IKEv2 REAUTH 后出现错误“initiator did not reauthenticate as requested” {#i-enable-ikev2-reauth-on-strongswan-and-got-the-error-initiator-did-not-reauthenticate-as-requested}

RouterOS 不支持 rfc4478，必须在 StrongSwan 上禁用 reauth。
