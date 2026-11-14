---
sidebar_key: "virtual-private-networks/ipsec/index"
sidebar_position: 3
title: "IPsec"
sidebar_label: "IPsec"
description: "本节涵盖 IPsec 示例与集成。可用它配置 IKEv2、pre-shared-key 和 post-quantum 密钥工作流，以及第三方 VPN 连接。"
tags:
  - 'ipsec'
  - 'ike'
  - 'diffie-hellman'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/ipsec
captured_at: '2026-11-04T11:35:59+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本节涵盖 IPsec 示例和集成。可使用它配置 IKEv2、pre-shared-key 和后量子密钥工作流，以及第三方 VPN 连接。

<DocCardList />

**Internet Protocol Security (IPsec)** 是由 Internet Engineering Task Force (IETF) 定义的一组协议，用于在 Internet 等未受保护的 IP/IPv6 网络上保护数据包交换。

IPsec 协议套件可分为以下几组：

- **Internet Key Exchange (IKE)** 协议，用于为 AH 和 ESP 动态生成和分发加密密钥。
- **Authentication Header (AH)** RFC 4302。
- **Encapsulating Security Payload (ESP)** RFC 4303。

## Internet Key Exchange 协议 (IKE) {#internet-key-exchange-protocol-ike}

Internet Key Exchange (IKE) 是一种协议，为 Internet Security Association and Key Management Protocol (ISAKMP) 框架提供经过认证的密钥材料。还有其他密钥交换方案可与 ISAKMP 配合使用，但 IKE 是使用最广泛的一种。二者共同提供了主机认证和安全关联 (SA) 自动管理的手段。

大多数时间里，IKE 守护进程处于空闲状态。它被激活时可能有两种情况：

存在被策略规则匹配且需要加密或认证的流量，但该策略没有任何 SA。策略会通知 IKE 守护进程，随后 IKE 守护进程向远程主机发起连接。IKE 守护进程也可以响应远程连接。两种情况下，对等体都会建立连接并执行 2 个阶段：

- **Phase 1** - 对等体就后续 IKE 消息中使用的算法达成一致，并相互认证。还会生成用于派生所有 SA 的密钥以及保护主机间后续 ISAKMP 交换的密钥材料。此阶段应匹配以下设置：
  - 认证方法
  - DH 组
  - 加密算法
  - 交换模式
  - 哈希算法
  - NAT-T
  - DPD 和生命周期（可选）

- **Phase 2** - 对等体建立一个或多个 SA，供 IPsec 用于加密数据。由 IKE 守护进程建立的所有 SA 都具有生命周期值（可以是限制 SA 失效前的时间、此 SA 可加密的数据量，或二者兼有）。此阶段应匹配以下设置：
  - IPsec 协议
  - 模式（隧道或传输）
  - 认证方法
  - PFS (DH) 组
  - 生命周期

:::warning
有两种生命周期值 - 软生命周期和硬生命周期。当 SA 达到软生命周期阈值时，IKE 守护进程会收到通知，并启动另一次 Phase 2 交换，用新的 SA 替换此 SA。如果 SA 达到硬生命周期，则会被丢弃。

**注意：** 如果生命周期到期时禁用 DPD，则 Phase 1 不会重新生成密钥；只有 Phase 2 会重新生成密钥。要强制 Phase 1 重新生成密钥，请启用 DPD。

**注意：** 已知 PSK 认证在 "aggressive" 模式下容易受到离线攻击，但最近的发现表明，在 "main" 和 "ike2" 交换模式下也可能进行离线攻击。一般建议避免使用 PSK 认证方法。
:::

IKE 可以选择提供完美前向保密 (PFS)，这是密钥交换的一种属性；对 IKE 而言，这意味着即使长期 Phase 1 密钥被泄露，也无法轻易访问通过此 Phase 1 建立的 SA 所保护的所有 IPsec 数据。这意味着会为每个 Phase 2 生成额外的密钥材料。

密钥材料的生成在计算上非常昂贵。例如，即使在非常快的计算机上，使用 modp8192 组也可能需要数秒。这通常每次 Phase 1 交换发生一次，而 Phase 1 交换在任意主机对之间只发生一次，然后会保持很长时间。PFS 还会将此昂贵操作添加到每次 Phase 2 交换中。

### Diffie-Hellman 组 {#diffie-hellman-groups}

Diffie-Hellman (DH) 密钥交换协议允许最初没有共享密钥的双方安全地建立一个共享密钥。支持以下模指数 (MODP) 和 ECP Diffie-Hellman（也称为 "Oakley"）组：

| Diffie-Hellman 组 | 名称 | 参考 |
| :-- | :-- | :-- |
| Group 1 | 768 位 MODP 组 | RFC 2409 |
| Group 2 | 1024 位 MODP 组 | RFC 2409 |
| Group 5 | 1536 位 MODP 组 | RFC 3526 |
| Group 14 | 2048 位 MODP 组 | RFC 3526 |
| Group 15 | 3072 位 MODP 组 | RFC 3526 |
| Group 16 | 4096 位 MODP 组 | RFC 3526 |
| Group 17 | 6144 位 MODP 组 | RFC 3526 |
| Group 18 | 8192 位 MODP 组 | RFC 3526 |
| Group 19 | 256 位随机 ECP 组 | RFC 5903 |
| Group 20 | 384 位随机 ECP 组 | RFC 5903 |
| Group 21 | 521 位随机 ECP 组 | RFC 5903 |

有关标准的更多信息可在[此处](https://www.iana.org/assignments/ipsec-registry/ipsec-registry.xhtml)找到。

较大的 DH 组提供更强的安全性，但需要更多 CPU 资源。以下是几种常用的 DH 组，具有不同级别的安全性和 CPU 影响：

DH Group 14（2048 位） - 在安全性和 CPU 使用率之间提供实际平衡。它提供 2048 位密钥交换，被认为对大多数现代应用是安全的，并得到广泛支持。

DH Group 5（1536 位） - 提供比 DH Group 14 略低的安全性，但由于密钥较小，CPU 开销更低。对于许多场景仍被认为可接受。

DH Group 2（1024 位） - 应谨慎使用，因为它在常用组中提供的安全性最低。尽管 CPU 要求较低，但随着计算能力提高，它更容易受到攻击。通常不建议用于新部署。

为获得最佳安全性，建议使用 **DH Group 19**。它通常被认为既快速又安全。除非需要与旧设备兼容，否则通常应避免使用 DH Group 2。

:::info
为网络基础设施计算适当安全级别的推荐方法是：首先确定所需的安全位数，并估计解密受保护数据应花费多长时间。根据这些要求，然后可以选择适当的算法。参考请见 [https://www.keylength.com/en/4/](https://www.keylength.com/en/4/)。
:::

### IKE 流量 {#ike-traffic}

为避免 IKE 数据包命中某些 SPD 规则并需要使用尚未建立的 SA（此数据包可能正试图建立该 SA）进行加密而引发问题，源端口为 UDP 500 的本地发起数据包不经过 SPD 处理。同样，要交付给本地的目的端口为 UDP 500 的数据包不会在入站策略检查中处理。

### 设置流程 {#setup-procedure}

要让 IPsec 通过 IKE-ISAKMP 自动密钥交换工作，必须配置 policy、peer 和 proposal（可选）条目。

:::danger
IPsec 对时间变化非常敏感。如果 IPsec 隧道两端的时间同步不一致（例如，不同的 NTP 服务器没有使用相同时间戳更新时间），隧道会中断，并且必须重新建立。
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

在 Windows 上，**EAP-TLS** 称为“智能卡或其他证书”。

:::info
尚不支持 IKEv2 认证的 AES-GCM 加密。

**重要：** 如果使用带 X.509 证书的 IPsec，证书必须包含 "SubjectKeyIdentifier" 扩展，该扩展仅在版本 3 中受支持。

**重要：** 尚不支持使用 ed25519 认证。
:::

## 认证头 (AH) {#authentication-header-ah}

AH 是一种协议，它通过添加一个根据数据报中的值计算出的报头，对数据报的全部或部分内容提供认证。数据报的哪些部分用于计算以及报头的放置位置取决于使用的是隧道模式还是传输模式。

AH 报头的存在允许验证消息的完整性，但不会加密消息。因此，AH 提供认证但不提供隐私。另一种协议 (ESP) 被认为更优越；它提供数据隐私，并且也有自己的认证方法。

RouterOS 支持以下 AH 认证算法：

- SHA2（256、512）
- SHA1
- MD5

### 传输模式 {#transport-mode}

在传输模式下，AH 报头插入到 IP 报头之后。使用 IP 数据和报头计算认证值。传输过程中可能变化的 IP 字段（如 TTL 和跳数）在认证前会被设置为零值。

### 隧道模式 {#tunnel-mode}

在隧道模式下，原始 IP 数据包被封装在一个新的 IP 数据包中。所有原始 IP 数据包都会被认证。

## 封装安全载荷 (ESP) {#encapsulating-security-payload-esp}

Encapsulating Security Payload (ESP) 使用共享密钥加密来提供数据隐私。ESP 还支持自己的认证方案，类似 AH 中使用的方案。

ESP 打包其字段的方式与 AH 非常不同。它不只有一个报头，而是将字段分为三个组成部分：

- **ESP Header** - 位于加密数据之前，其放置位置取决于 ESP 是用于传输模式还是隧道模式。
- **ESP Trailer** - 此部分位于加密数据之后。它包含用于对齐加密数据的填充。
- **ESP Authentication Data** - 此字段包含完整性校验值 (ICV)，其计算方式类似于 AH 协议的工作方式，用于 ESP 的可选认证功能启用时。

### 传输模式 {#transport-mode-1}

在传输模式下，ESP 报头插入到原始 IP 报头之后。ESP 尾部和认证值添加到数据包末尾。在此模式下，仅对 IP 载荷进行加密和认证；IP 报头不受保护。

![](/img/e820cafb5508d83a.webp)

### 隧道模式 {#tunnel-mode-1}

在隧道模式下，原始 IP 数据包被封装在一个新的 IP 数据包中，从而保护 IP 载荷和 IP 报头。

![](/img/53ccf4c24f574ee8.webp)

### 加密算法 {#encryption-algorithms}

RouterOS ESP 支持多种加密和认证算法。

#### 认证 {#authentication}

- **MD5**
- **SHA1**
- **SHA2（256 位、512 位）**

#### 加密 {#encryption}

- **AES** - 128 位、192 位和 256 位密钥的 AES-CBC、AES-CTR 和 AES-GCM 算法。
- **Blowfish** - 自 v4.5 起添加。
- **Twofish** - 自 v4.5 起添加。
- **Camellia** - 自 v4.5 起添加的 128 位、192 位和 256 位密钥 Camellia 加密算法。
- **DES** - 56 位 DES-CBC 加密算法。
- **3DES** - 168 位（3 x 56 位）DES 加密算法。

### 硬件加速 {#hardware-acceleration}

硬件加速通过使用 CPU 内置的加密引擎来执行更快的加密过程。

具有硬件加速的设备列表可在[此处](https://mikrotik.com/products?filter&s=c&f=%5B%22ipsec%22%5D)获取。

<WideTable>

| CPU | DES 和 3DES |  |  |  | AES-CBC |  |  |  | AES-CTR |  |  |  | AES-GCM |  |  |  |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
|  | MD5 | SHA1 | SHA256 | SHA512 | MD5 | SHA1 | SHA256 | SHA512 | MD5 | SHA1 | SHA256 | SHA512 | MD5 | SHA1 | SHA256 | SHA512 |
| 88F7040 | no | yes | yes | yes | no | yes | yes | yes | no | yes | yes | yes | no | yes | yes | yes |
| AL21400 | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes |
| AL32400 | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes |
| AL52400 | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes |
| AL73400 | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes |
| IPQ-4018 / IPQ-4019 | no | yes | yes | no | no | yes\* | yes\* | no | no | yes\* | yes\* | no | no | no | no | no |
| IPQ-5018 | yes | yes | yes | no | yes | yes | yes | no | yes | yes | yes | no | no | no | no | no |
| IPQ-6010 | no | no | no | no | no | yes | yes | yes | no | yes | yes | yes | no | yes | yes | yes |
| IPQ-8064 | no | yes | yes | no | no | yes\* | yes\* | no | no | yes\* | yes\* | no | no | no | no | no |
| IPQ-8072 | no | no | no | no | no | yes | yes | yes | no | yes | yes | yes | no | yes | yes | yes |
| MT7621A | yes\*\*\*\* | yes\*\*\*\* | yes\*\*\*\* | no | yes | yes | yes | no | no | no | no | no | no | no | no | no |
| EN7562CT | yes\*\*\*\* | yes\*\*\*\* | yes\*\*\*\* | no | yes | yes | yes | no | yes | yes | yes | no | no | no | no | no |
| P1023NSN5CFB | no | no | no | no | yes\*\* | yes\*\* | yes\*\* | yes\*\* | no | no | no | no | no | no | no | no |
| P202ASSE2KFB | yes | yes | yes | no | yes | yes | yes | yes | no | no | no | no | no | no | no | no |
| PPC460GT | no | no | no | no | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | no | no | no | no |
| TLR4 (TILE) | yes | yes | yes | no | yes | yes | yes | no | yes | yes | yes | no | no | no | no | no |
| x86 (AES-NI) | no | no | no | no | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* | 是\*\*\* |

</WideTable>

\* 仅支持 128 位和 256 位密钥长度

\*\* 仅 2016 年以后制造，序列号以数字 5 和 7 开头

\*\*\* 仅 AES-CBC 和 AES-CTR 加密被加速，哈希在软件中完成

\*\*\*\* 不支持 DES，仅支持 3DES 和/或 AES-CBC

各种加密和哈希算法组合的 IPsec 吞吐量结果发布在 [MikroTik 产品页面](https://mikrotik.com/products) 上。

## 策略 {#policies}

策略表用于确定是否应对数据包应用安全设置。

## 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **action** (*discard \| encrypt \| none*; 默认：**encrypt**) | 指定对策略匹配的数据包执行什么操作。none - 原样传递数据包。discard - 丢弃数据包。encrypt - 应用此策略及其 SA 中指定的转换。 |
| **comment** (*string*; 默认：) | 策略的简短描述。 |
| **disabled** (*yes \| no*; 默认：**no**) | 策略是否用于匹配数据包。 |
| **dst-address** (*IP/IPv6 prefix*; 默认：**0.0.0.0/32**) | 数据包中要匹配的目标地址。适用于使用隧道模式（tunnel=yes）或模板（template=yes）时。 |
| **dst-port** (*integer:0..65535 \| any*; 默认：**any**) | 数据包中要匹配的目标端口。如果设置为 any，则匹配所有端口。 |
| **group** (*string*; 默认：**default**) | 此模板分配到的策略组名称。 |
| **ipsec-protocols** (*ah \| esp*; 默认：**esp**) | 指定要应用于匹配流量的 Authentication Header 和 Encapsulating Security Payload 协议组合。 |
| **level** (*require \| unique \| use*; 默认：**require**) | 指定当找不到此策略的某些 SA 时要执行的操作：use - 跳过此转换，不丢弃数据包，也不从 IKE 守护进程获取 SA；require - 丢弃数据包并获取 SA；unique - 丢弃数据包并获取仅用于此特定策略的唯一 SA。它用于多个客户端可位于一个公共 IP 地址之后（NAT 后的客户端）的设置中。 |
| **peer** (*string*; 默认：) | 此策略应用到的 peer 名称。 |
| **proposal** (*string*; 默认：**default**) | 由 IKE 守护进程发送以为此策略建立 SA 的 proposal 模板名称。 |
| **protocol** (*all \| egp \| ggp\| icmp \| igmp \| ...*; 默认：**all**) | 要匹配的 IP 数据包协议。 |
| **src-address** (*ip/ipv6 prefix*; 默认：**0.0.0.0/32**) | 数据包中要匹配的源地址。适用于使用隧道模式（tunnel=yes）或模板（template=yes）时。 |
| **src-port** (*any \| integer:0..65535*; 默认：**any**) | 数据包中要匹配的源端口。如果设置为 any，则匹配所有端口。 |
| **template** (*yes \| no*; 默认：**no**) | 创建一个模板并将其分配给指定的策略组。模板使用以下参数：group - 此模板分配到的策略组名称；src-address、dst-address - 请求的子网必须在两个方向上匹配（例如，0.0.0.0/0 表示允许所有）；protocol - 要匹配的协议，如果设置为 all，则接受任何协议；proposal - 此模板使用的 SA 参数；level - 当 NAT 后有多个客户端的设置中需要 unique 时有用。 |
| **tunnel** (*yes \| no*; 默认：**no**) | 指定是否使用隧道模式。 |

## 只读属性 {#read-only-properties}

| 属性 | 描述 |
| :-- | :-- |
| **active** (*yes \| no*) | 此策略当前是否正在使用。 |
| **default** (*yes \| no*) | 此条目是否为默认系统条目。 |
| **dynamic** (*yes \| no*) | 此条目是否为动态添加或生成的条目。 |
| **invalid** (*yes \| no*) | 此策略是否无效 - 可能原因是存在具有相同 src-address 和 dst-address 的重复策略。 |
| **ph2-count** (*integer*) | 与此策略关联的活动 Phase 2 会话数。 |
| **ph2-state** (*expired \| no-phase2 \| established*) | 密钥建立进度的指示。 |
| **sa-dst-address** (*ip/ipv6 address*; 默认：**::**) | SA 目标 IP/IPv6 地址（远程对等体）。 |
| **sa-src-address** (*ip/ipv6 address*; 默认：**::**) | SA 源 IP/IPv6 地址（本地对等体）。 |

:::info
策略顺序很重要。它的工作方式类似于防火墙过滤器，策略从上到下执行（priority 参数已移除）。

在隧道模式下，所有数据包都会被 IPIP 封装，并且其新 IP 报头的 src-address 和 dst-address 会设置为此策略的 sa-src-address 和 sa-dst-address 值。如果不使用隧道模式（即使用传输模式），则只有源地址和目标地址与 sa-src-address 和 sa-dst-address 相同的数据包才能由此策略处理。传输模式只能处理源自主机且目的地为 IPsec 对等体（已建立安全关联的主机）的数据包。要加密网络之间（或网络与主机之间）的流量，必须使用隧道模式。
:::

### 统计信息 {#statistics}

此菜单显示各种 IPsec 统计信息和错误。

#### 只读属性 {#read-only-properties-1}

| 属性 | 描述 |
| :-- | :-- |
| **in-errors** (*integer*) | 所有未由其他计数器匹配的入站错误。 |
| **in-buffer-errors** (*integer*) | 无空闲缓冲区。 |
| **in-header-errors** (*integer*) | 报头错误。 |
| **in-no-states** (*integer*) | 未找到状态，即入站 SPI、地址或 SA 上的 IPsec 协议有误。 |
| **in-state-protocol-errors** (*integer*) | 转换协议特定错误，例如 SA 密钥错误或硬件加速器无法处理数据包数量。 |
| **in-state-mode-errors** (*integer*) | 转换模式特定错误。 |
| **in-state-sequence-errors** (*integer*) | 序列号超出窗口。 |
| **in-state-expired** (*integer*) | 状态已过期。 |
| **in-state-mismatches** (*integer*) | 状态具有不匹配的选项，例如 UDP 封装类型不匹配。 |
| **in-state-invalid** (*integer*) | 状态无效。 |
| **in-template-mismatches** (*integer*) | 没有与状态匹配的模板，例如入站 SA 正确但 SP 规则错误。可能原因是 sa-source 或 sa-destination 地址不匹配。 |
| **in-no-policies** (*integer*) | 未找到与状态对应的策略，例如入站 SA 正确但未找到 SP。 |
| **in-policy-blocked** (*integer*) | 策略丢弃。 |
| **in-policy-errors** (*integer*) | 策略错误。 |
| **out-errors** (*integer*) | 所有未由其他计数器匹配的出站错误。 |
| **out-bundle-errors** (*integer*) | 捆绑生成错误。 |
| **out-bundle-check-errors** (*integer*) | 捆绑检查错误。 |
| **out-no-states** (*integer*) | 未找到状态。 |
| **out-state-protocol-errors** (*integer*) | 转换协议特定错误。 |
| **out-state-mode-errors** (*integer*) | 转换模式特定错误。 |
| **out-state-sequence-errors** (*integer*) | 序列错误，例如序列号溢出。 |
| **out-state-expired** (*integer*) | 状态已过期。 |
| **out-policy-blocked** (*integer*) | 策略丢弃。 |
| **out-policy-dead** (*integer*) | 策略已失效。 |
| **out-policy-errors** (*integer*) | 策略错误。 |

## 提议 {#proposals}

IKE 守护进程为某些策略建立 SA 而发送的提议信息。

### 属性 {#properties-1}

| 属性 | 描述 |
| :-- | :-- |
| **auth-algorithms** (*md5\|null\|sha1\|sha256\|sha512*; 默认：**sha1**) | 允许用于授权的算法。SHA（Secure Hash Algorithm）更强但更慢。MD5 使用 128 位密钥，SHA1 使用 160 位密钥。 |
| **comment** (*string*; 默认：) |  |
| **disabled** (*yes \| no*; 默认：**no**) | 项目是否已禁用。 |
| **enc-algorithms** (*null\|des\|3des\|aes-128-cbc\|aes-128-ctr\|aes-128-gcm\|aes-192-cbc\|aes-192-ctr\|aes-192-gcm\|aes-256-cbc\|aes-256-ctr\|aes-256-gcm\|blowfish\|camellia-128\|camellia-192\|camellia-256\|twofish*; 默认：**aes-256-cbc,aes-192-cbc,aes-128-cbc**) | 用于 SA 的允许算法和密钥长度。 |
| **lifetime** (*time*; 默认：**30m**) | SA 在被丢弃之前使用多长时间。 |
| **name** (*string*; 默认：) |  |
| **pfs-group** (*ecp256 \| ecp384 \| ecp521 \| modp768 \| modp1024 \| modp1536 \| modp2048 \| modp3072 \| modp4096 \| modp6144 \| modp8192 \| none*; 默认：**modp1024**) | 用于完美前向保密的 Diffie-Hellman 组。 |

### 只读属性 {#read-only-properties-2}

| 属性 | 描述 |
| :-- | :-- |
| **default** (*yes \| no*) | 此条目是否为默认系统条目。 |

## 组 {#groups}

在此菜单中，可以创建供策略模板使用的其他策略组。

### 属性 {#properties-2}

| 属性 | 描述 |
| :-- | :-- |
| **name** (*string*; 默认：) |  |
| **comment** (*string*; 默认：) |  |

## 对等体 {#peers}

对等体配置设置用于在 IKE 守护进程之间建立连接。然后此连接将用于协商 SA 的密钥和算法。交换模式是对等体之间唯一的唯一标识符，这意味着只要使用不同的 exchange-mode，就可以有多个具有相同 remote-address 的对等体配置。

## 属性 {#properties-3}

| 属性 | 描述 |
| :-- | :-- |
| **address** (*IP/IPv6 Prefix*; 默认：**0.0.0.0/0**) | 如果远程对等体的地址与此前缀匹配，则在对等体认证和 **Phase 1** 建立中使用此对等体配置。如果多个对等体地址匹配多个配置条目，则将使用最具体的一个（即具有最大网络掩码的条目）。 |
| **comment** (*string*; 默认：) | 对等体的简短描述。 |
| **disabled** (*yes \| no*; 默认：**no**) | 对等体是否用于匹配远程对等体的前缀。 |
| **exchange-mode** (*aggressive \| base \| main \| ike2*; 默认：**main**) | 根据 RFC [2408](https://datatracker.ietf.org/doc/html/rfc2408#section-4.1) 的不同 ISAKMP Phase 1 交换模式。**main** 模式放宽了 rfc2409 第 5.4 节，以允许在主模式中进行 pre-shared-key 认证。ike2 模式启用 IKEv2 RFC 7296。IKEv2 会忽略的参数：proposal-check、compatibility-options、lifebytes、dpd-maximum-failures、nat-traversal。 |
| **local-address** (*IP/IPv6 Address*; 默认：) | Phase 1 应绑定到的路由器本地地址。 |
| **name** (*string*; 默认：) |  |
| **passive** (*yes \| no*; 默认：**no**) | 启用被动模式时，将等待远程对等体发起 IKE 连接。启用被动模式还表示该对等体是 xauth 响应方，禁用被动模式则表示 xauth 发起方。当被动模式被禁用时，如果已配置策略或在 Phase 1 期间创建了策略，对等体将自动尝试建立 Phase 1 以及 Phase 2。 |
| **port** (*integer:0..65535*; 默认：**500**) | 当路由器作为发起方且远程对等体使用非默认端口时，用于连接远程对等体的通信端口。 |
| **profile** (*string*; 默认：**default**) | IKE 协商期间将使用的 profile 模板名称。 |
| **send-initial-contact** (*yes \| no*; 默认：**yes**) | 指定是发送 "initial contact" IKE 数据包还是等待远程侧；此数据包应触发移除当前源地址的旧对等体 SA。通常，在 road warrior 设置中，客户端是发起方，此参数应设置为 no。如果为 ikev1 启用了 modecfg 或 xauth，则不会发送 initial contact。 |

## 只读属性 {#read-only-properties-3}

| 属性 | 描述 |
| :-- | :-- |
| **dynamic** (*yes \| no*) | 此条目是否由其他服务（例如 L2TP）动态添加。 |
| **responder** (*yes \| no*) | 此对等体是否仅充当响应方（侦听传入请求）而不发起连接。 |

### 配置文件 {#profiles}

配置文件定义了一组将在 Phase 1 期间用于 IKE 协商的参数。这些参数可能与其他对等体配置共用。

## 属性 {#properties-4}

| 属性 | 描述 |
| :-- | :-- |
| **dh-group** (*modp768 \| modp1024  \| modp1536 \| modp2048 \| modp3072 \| modp4096 \| modp6144 \| modp8192 \| ecp256 \| ecp384 \| ecp521*; 默认：**modp1024,modp2048**) | Diffie-Hellman 组（加密强度） |
| **dpd-interval** (*time \| disable-dpd*; 默认：**2m**) | 死对等体检测间隔。如果设置为 disable-dpd，则不会使用死对等体检测。 |
| **dpd-maximum-failures** (*integer: 1..100*; 默认：**5**) | 在对等体被视为死亡之前的最大失败次数。如果启用 DPD，则适用。 |
| **enc-algorithm** (*3des \| aes-128 \| aes-192 \| aes-256 \| blowfish \| camellia-128 \| camellia-192 \| camellia-256 \| des*; 默认：**aes-128**) | 对等体将使用的加密算法列表。 |
| **hash-algorithm** (*md5 \| sha1 \| sha256 \| sha512*; 默认：**sha1**) | 哈希算法。SHA（Secure Hash Algorithm）更强，但更慢。MD5 使用 128 位密钥，sha1 使用 160 位密钥。 |
| **lifebytes** (*Integer: 0..4294967295*; 默认：**0**) | Phase 1 lifebytes 仅作为管理值添加到提议中。用于远程对等体要求特定 lifebytes 值才能建立 Phase 1 的情况。 |
| **lifetime** (*time*; 默认：**1d**) | Phase 1 生命周期：指定 SA 的有效时长。 |
| **name** (*string*; 默认值： ) |  |
| **nat-traversal** (*yes \| no*; 默认：**yes**) | 使用 Linux NAT-T 机制解决 IPsec 对等体之间 NAT 路由器导致的 IPsec 不兼容问题。此方法只能与 ESP 协议一起使用（AH 在设计上不受支持，因为它会对完整数据包（包括 IP 报头）签名，而 NAT 会更改 IP 报头，使 AH 签名无效）。此方法将 IPsec ESP 流量封装到 UDP 流中，以克服导致 ESP 与 NAT 不兼容的一些小问题。 |
| **proposal-check** (*claim \| exact \| obey \| strict*; 默认：**obey**) | Phase 2 生命周期检查逻辑：claim - 取提议的生命周期和配置的生命周期中最短的一个，并通知发起方；exact - 要求生命周期相同；obey - 接受发起方发送的任何值；strict - 如果提议的生命周期长于默认值，则拒绝该提议，否则接受提议的生命周期。 |

## 身份 {#identities}

身份是特定于远程对等体的配置参数。身份的主要目的是处理认证并验证对等体的完整性。

### 属性 {#properties-5}

| 属性 | 描述 |
| :-- | :-- |
| **auth-method** (*digital-signature \| eap \| eap-radius \| pre-shared-key \| pre-shared-key-xauth \| rsa-key \| rsa-signature-hybrid*; 默认：**pre-shared-key**) | 认证方法：digital-signature - 使用一对 RSA 证书进行认证；eap - 发起方（网络掩码为 /32 的对等体）的 IKEv2 EAP 认证。必须与 eap-methods 一起使用；eap-radius - 响应方的 IKEv2 EAP RADIUS 直通认证（RFC 3579）。在这种情况下需要服务器证书。如果未指定服务器证书，则只有支持 EAP-only (RFC 5998) 的客户端才能连接。请注意，EAP 方法应与 EAP-only 兼容；pre-shared-key - 使用对等体之间共享的密码（预共享密钥）字符串进行认证（不建议使用，因为可能对预共享密钥进行离线攻击）；rsa-key - 使用在 keys 菜单中导入的 RSA 密钥进行认证。仅支持 IKEv1；pre-shared-key-xauth - 使用对等体之间共享的密码（预共享密钥）字符串 + XAuth 用户名和密码进行认证。仅支持 IKEv1；rsa-signature-hybrid - 使用发起方 XAuth 进行响应方证书认证。仅支持 IKEv1。 |
| **certificate** (*string*; 默认：) | 在 System/Certificates 中列出的证书名称（用于对数据包签名；证书必须具有私钥）。如果使用数字签名认证方法（auth-method=digital-signature）或 EAP（auth-method=eap），则适用。 |
| **comment** (*string*; 默认：) | 身份的简短描述。 |
| **disabled** (*yes \| no*; 默认：**no**) | 身份是否用于匹配远程对等体。 |
| **eap-methods** (*eap-mschapv2 \| eap-peap \| eap-tls \| eap-ttls*; 默认：**eap-tls**) | 所有 EAP 方法都要求在 System/Certificates 菜单中存在完整证书链，包括中间 CA 证书和根 CA 证书。此外，必须指定用户名和密码（如果认证服务器要求）。可以指定多个 EAP 方法，并将按指定顺序使用。当前支持的 EAP 方法：eap-mschapv2；eap-peap - 也称为 PEAPv0/EAP-MSCHAPv2；eap-tls - 要求在 certificate 参数下指定额外的客户端证书；eap-ttls。 |
| **generate-policy** (*no \| port-override \| port-strict*; 默认：**no**) | 允许此对等体为不存在的策略建立 SA。此类策略会在 SA 生命周期内动态创建。自动策略例如允许创建受 IPsec 保护的 L2TP 隧道，或任何在配置时不知道远程对等体 IP 地址的其他设置。no - 不生成策略；port-override - 生成策略并强制策略使用任意端口（旧行为）；port-strict - 使用对等体提议中的端口，该端口应与对等体策略匹配。 |
| **key** (*string*; 默认：) | keys 菜单中的私钥名称。如果使用 RSA 密钥认证方法（auth-method=rsa-key），则适用。 |
| **match-by** (*remote-id \| certificate*; 默认：**remote-id**) | 定义用于对等体身份验证的逻辑。remote-id - 将根据 remote-id 设置验证对等体 ID。certificate 将使用 remote-certificate 设置中指定的内容验证对等体证书。 |
| **mode-config** (*none \| \*request-only \| string*; 默认：**none**) | mode-config 菜单中的配置参数名称。设置此参数后，将启用 mode-config。 |
| **my-id** (*auto \| address \| fqdn \| user-fqdn \| key-id*; 默认：**auto**) | 在发起方上，这控制发送给响应方的 ID\_i。在响应方上，这控制发送给发起方的 ID\_r。在 IKEv2 中，响应方还期望从发起方收到的 ID\_r 中包含此 ID。auto - 尝试自动使用正确的 ID：预共享密钥使用 IP，基于证书的连接使用 SAN（如果不存在则使用 DN）；address - 使用 IP 地址作为 ID；dn - ASN.1 X.500 Distinguished Name 的二进制 Distinguished Encoding Rules (DER) 编码；fqdn - 完全限定域名；key-id - 为身份使用指定的密钥 ID；user fqdn - 指定完全限定的用户名字符串，例如 "user@domain.com"。 |
| **notrack-chain** (*string*; 默认：) | 将与 IPsec 策略匹配的 IP/Firewall/Raw 规则添加到指定链。与 generate-policy 一起使用。 |
| **password** (*string*; 默认：) *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | XAuth 或 EAP 密码。如果使用带 XAuth 的预共享密钥认证方法（auth-method=pre-shared-key-xauth）或 EAP（auth-method=eap），则适用。 |
| **peer** (*string*; 默认：) | 此身份应用到的 peer 名称。 |
| **policy-template-group** (*none \| string*; 默认：**default**) | 如果启用 generate-policy，则流量选择器会与同一组中的模板进行检查。如果没有任何模板匹配，则不会建立 Phase 2 SA。 |
| **remote-certificate** (*string*; 默认：) | 用于认证远程侧的证书名称（列在 System/Certificates 中）（用于验证数据包；不需要私钥）。如果未指定 remote-certificate，则使用从远程对等体收到的证书，并与证书菜单中的 CA 进行检查。必须在证书存储中导入正确的 CA。如果指定了 remote-certificate 和 match-by=certificate，则仅匹配特定的客户端证书。如果使用数字签名认证方法（auth-method=digital-signature），则适用。 |
| **remote-id** (*auto \| fqdn \| user-fqdn \| key-id \| ignore*; 默认：**auto**) | 此参数控制期望从远程对等体收到的 ID 值。请注意，除 ignore 之外的所有类型都会使用收到的证书验证远程对等体 ID。如果对等体将其证书名称作为 ID 发送，则会针对证书检查；否则 ID 会针对 Subject Alt. Name 检查。auto - 接受所有 ID；address - 使用 IP 地址作为 ID；dn - ASN.1 X.500 Distinguished Name 的二进制 Distinguished Encoding Rules (DER) 编码；fqdn - 完全限定域名。仅在 IKEv2 中支持；user fqdn - 完全限定的用户名字符串，例如 "user@domain.com"。仅在 IKEv2 中支持；key-id - 身份的特定密钥 ID。仅在 IKEv2 中支持；ignore - 不验证收到的 ID 与证书（危险）。\* 通配符密钥 ID 匹配**不支持**，例如 remote-id="key-id:CN=\*.domain.com" |
| **remote-key** (*string*; 默认：) | keys 菜单中的公钥名称。如果使用 RSA 密钥认证方法（auth-method=rsa-key），则适用。 |
| **secret** (*string*; 默认：) *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 密钥字符串。如果以 '0x' 开头，则会解析为十六进制值。如果使用预共享密钥认证方法（auth-method=pre-shared-key 或 auth-method=pre-shared-key-xauth），则适用。 |
| **username** (*string*; 默认：) | XAuth 或 EAP 用户名。如果使用带 XAuth 的预共享密钥认证方法（auth-method=pre-shared-key-xauth）或 EAP（auth-method=eap），则适用。 |

### 只读属性 {#read-only-properties-4}

| 属性 | 描述 |
| :-- | :-- |
| **dynamic** (*yes \| no*) | 此条目是否由其他服务（例如 L2TP）动态添加。 |

## 活动对等体 {#active-peers}

此菜单提供有关当前已建立 Phase 1 连接的远程对等体的各种统计信息。

### 只读属性 {#read-only-properties-5}

| 属性 | 描述 |
| :-- | :-- |
| **dynamic-address** (*ip/ipv6 address*) | 由 mode config 动态分配的 IP 地址 |
| **last-seen** (*time*) | 自收到此对等体最后一条消息以来的时长。 |
| **local-address** (*ip/ipv6 address*) | 此对等体使用的路由器本地地址。 |
| **natt-peer** (*yes \| no*) | 此对等体是否使用 NAT-T。 |
| **ph2-total** (*integer*) | 活动 IPsec 安全关联的总数。 |
| **remote-address** (*ip/ipv6 address*) | 远程对等体的 IP/IPv6 地址。 |
| **responder** (*yes \| no*) | 连接是否由远程对等体发起。 |
| **rx-bytes** (*integer*) | 从此对等体接收的总字节数。 |
| **rx-packets** (*integer*) | 从此对等体接收的总数据包数。 |
| **side** (*initiator \| responder*) | 显示哪一侧发起了 Phase 1 协商。 |
| **state** (*string*) | 与对等体的 Phase 1 协商状态。例如，当 Phase 1 和 Phase 2 协商完成时，将显示 "established" 状态。 |
| **tx-bytes** (*integer*) | 传输到此对等体的总字节数。 |
| **tx-packets** (*integer*) | 传输到此对等体的总数据包数。 |
| **uptime** (*time*) | 对等体处于已建立状态的时长。 |

### 命令 {#commands}

| 属性 | 描述 |
| :-- | :-- |
| **kill-connections** () | 手动断开所有远程对等体。 |

## 模式配置 {#mode-configs}

此菜单配置 ISAKMP 和 IKEv2 配置属性。

### 属性 {#properties-6}

| 属性 | 描述 |
| :-- | :-- |
| **address** (*none \| string*; 默认：) | 为发起方指定单个 IP 地址，而不是指定整个地址池。 |
| **address-pool** (*none \| string*; 默认：) | 如果启用 mode-config，响应方将尝试从中分配地址的地址池名称。 |
| **address-prefix-length** (*integer [1..32]*; 默认：) | 从池中分配的地址的前缀长度（网络掩码）。 |
| **comment** (*string*; 默认：) |  |
| **name** (*string*; 默认：) |  |
| **responder** (*yes \| no*; 默认：**no**) | 指定此配置将作为发起方（客户端）还是响应方（服务器）工作。发起方将从响应方请求 mode-config 参数。 |
| **split-dns** (*list of DNS names*; 默认：) | 将使用 system-dns=yes 或 static-dns= 设置解析的 DNS 名称列表。 |
| **split-include** (*list of IP prefix*; 默认：) | 将以 CIDR 格式通过隧道传输的子网列表。子网将使用 CISCO UNITY 扩展发送给对等体。远程对等体将创建特定的动态策略。 |
| **src-address-list** (*address list*; 默认：) | 指定地址列表将生成动态源 NAT 规则。此参数仅在 responder=no 时可用。带 NAT 的 roadWarrior 客户端 |
| **static-dns** (*list of IP*; 默认：) | 要发送给客户端的手动指定的 DNS 服务器 IP 地址。 |
| **system-dns** (*yes \| no*; 默认：) | 启用此选项后，DNS 地址将从 `/ip/dns` 获取。 |

### 只读属性 {#read-only-properties-6}

| 属性 | 描述 |
| :-- | :-- |
| **default** (*yes \| no*) | 此条目是否为默认系统条目。 |

:::warning
并非所有 IKE 实现都支持 split-include 选项提供的多个拆分网络。

**警告：** 如果 RouterOS 客户端是发起方，它将始终发送 CISCO UNITY 扩展，而 RouterOS 仅支持此扩展中的 split-include。

Cisco Unity Split DNS（属性类型 28675）和 RFC8598（属性类型 25）这两个属性都受支持，ROS 会对这些属性作出响应，但仅作为响应方。

**警告：** 不能同时使用 system-dns 和 static-dns；ROS 只能使用一个 DNS。
:::

## 已安装的 SA {#installed-sas}

此菜单提供有关已安装安全关联的信息，包括密钥。

### 只读属性 {#read-only-properties-7}

| 属性 | 描述 |
| :-- | :-- |
| **AH** (*yes \| no*) | 此 SA 是否使用 AH 协议。 |
| **ESP** (*yes \| no*) | 此 SA 是否使用 ESP 协议。 |
| **add-lifetime** (*time/time*) | 以 soft/hard 格式表示的 SA 添加生命周期：soft - 在此时间段后 IKE 将尝试建立新 SA；hard - 在此时间段后 SA 将被删除。 |
| **addtime** (*time*) | 添加此 SA 的日期和时间。 |
| **auth-algorithm** (*md5 \| null \| sha1 \| ...*) | 当前使用的认证算法。 |
| **auth-key** (*string*) *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 使用的认证密钥。 |
| **current-bytes** (*64-bit integer*) | 此 SA 已处理的字节数。 |
| **dst-address** (*IP*) | 此 SA 的目标地址。 |
| **enc-algorithm** (*des \| 3des \| aes-cbc \| ...*) | 当前使用的加密算法。 |
| **enc-key** (*string*) *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 使用的加密密钥。 |
| **enc-key-size** (*number*) | 使用的加密密钥长度。 |
| **expires-in** (*time*) | 距离重新生成密钥剩余的时间。 |
| **hw-aead** (*yes \| no*) | 此 SA 是否由硬件加速。 |
| **replay** (*integer*) | 重放窗口大小（以数据包计）。 |
| **spi** (*string*) | 安全参数索引标识标签。 |
| **src-address** (*IP*) | 此 SA 的源地址。 |
| **state** (*string*) | 显示 SA 的当前状态（"mature"、"dying" 等）。 |

### 命令 {#commands-1}

| 属性 | 描述 |
| :-- | :-- |
| **flush** () | 手动移除所有已安装的安全关联。 |

## 密钥 {#keys}

此菜单列出可用于对等体认证的所有已导入公钥和私钥。此菜单有几个用于处理密钥的命令。

### 属性 {#properties-7}

| 属性 | 描述 |
| :-- | :-- |
| **name** (*string*; 默认：) |  |

### 只读属性 {#read-only-properties-8}

| 属性 | 描述 |
| :-- | :-- |
| **key-size** (*1024 \| 2048 \| 4096*) | 此密钥的大小。 |
| **private-key** (*yes \| no*) | 这是否为私钥。 |
| **rsa** (*yes \| no*) | 这是否为 RSA 密钥。 |

### 命令 {#commands-2}

| 属性 | 描述 |
| :-- | :-- |
| **export-pub-key** (*file-name; key*) | 从现有私钥之一导出公钥到文件。 |
| **generate-key** (*key-size; name*) | 生成私钥。接受两个参数：新生成密钥的名称和密钥大小 1024、2048 和 4096。 |
| **import** (*file-name; name*) | 从文件导入密钥。 |

## 设置 {#settings}

| 属性 | 描述 |
| :-- | :-- |
| **accounting** (*yes \| no*; 默认：) | 是否向 RADIUS 服务器发送 RADIUS 计费请求。如果使用 EAP Radius（auth-method=eap-radius）或带 XAuth 的预共享密钥认证方法（auth-method=pre-shared-key-xauth），则适用。 |
| **interim-update** (*time*; 默认：) | 每次连续 RADIUS 计费 Interim 更新之间的间隔。必须启用计费。 |
| **xauth-use-radius** (*yes \| no*; 默认：) | 是否为 XAuth 用户使用 Radius 客户端。此属性仅适用于使用 **IKEv1** 交换模式的对等体。 |

### 带 NAT 的 RoadWarrior 客户端 {#roadwarrior-client-with-nat}

考虑如下所示的设置。RouterOS 充当连接到办公室的 RoadWarrior 客户端，允许访问其内部资源。

![](/img/dc6b627dbef3d1f7.webp)

隧道已建立，收到本地 mode-config IP 地址，并生成一组动态策略。

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

目前，只有源地址为 192.168.77.254/32 的数据包才会匹配 IPsec 策略。为了让本地网络能够访问远程子网，必须将本地主机的源地址更改为动态分配的 mode config IP 地址。可以动态生成源 NAT 规则。这可以通过创建一个新的地址列表来完成，该列表包含应应用 NAT 规则的所有本地网络。在我们的例子中，是 192.168.88.0/24。

```ros
/ip/firewall/address-list/add address=192.168.88.0/24 list=local-RW
```

通过在 mode-config 发起方配置下指定地址列表，将动态生成一组源 NAT 规则。

```ros
/ip/ipsec/mode-config/set [ find name="request-only" ] src-address-list=local-RW
```

当 IPsec 隧道建立后，我们可以看到为每个网络动态创建的源 NAT 规则。现在 192.168.88.0/24 中的每台主机都能访问办公室的内部资源。

```ros
[admin@mikrotik] > ip firewall nat print 
Flags: X - disabled, I - invalid, D - dynamic 
0 D ;;; ipsec mode-config
chain=srcnat action=src-nat to-addresses=192.168.77.254 dst-address=192.168.55.0/24 src-address-list=local-RW

1 D ;;; ipsec mode-config
chain=srcnat action=src-nat to-addresses=192.168.77.254 dst-address=10.5.8.0/24 src-address-list=local-RW
```

### 仅允许 IPsec 封装流量 {#allow-only-ipsec-encapsulated-traffic}

在某些场景中，出于安全原因，如果传入/传出数据包未加密，你可能希望丢弃对特定网络的访问。例如，如果我们有 L2TP/IPsec 设置，我们会希望丢弃未加密的 L2TP 连接尝试。

有几种方法可以实现这一点：

- 在防火墙中使用 IPsec 策略匹配器。
- 使用通用 IPsec 策略，将 action 设置为 **drop** 并降低优先级（可用于生成动态策略的 Road Warrior 设置）。
- 在 mangle 中设置 DSCP 或优先级，并在解封装后在防火墙中匹配相同的值。

#### IPsec 策略匹配器 {#ipsec-policy-matcher}

让我们设置一个 IPsec 策略匹配器，以接受与任何 IPsec 策略匹配的所有数据包，并丢弃其余数据包：

```ros
add chain=input comment="ipsec policy matcher" in-interface=WAN ipsec-policy=in,ipsec
add action=drop chain=input comment="drop all" in-interface=WAN log=yes
```

IPsec 策略匹配器接受两个参数 **direction、policy**。我们使用了入站方向和 IPsec 策略。IPsec policy 选项允许我们在解封装后检查数据包，因此例如，如果我们只想允许来自特定源地址的 GRE 封装数据包并丢弃其余数据包，可以设置以下规则：

```ros
add chain=input comment="ipsec policy matcher" in-interface=WAN ipsec-policy=in,ipsec protocol=gre src-address=192.168.33.1
add action=drop chain=input comment="drop all" in-interface=WAN log=yes
```

对于 L2TP，规则集将是：

```ros
add chain=input comment="ipsec policy matcher" in-interface=WAN ipsec-policy=in,ipsec protocol=udp dst-port=1701
add action=drop chain=input protocol=udp dst-port=1701 comment="drop l2tp" in-interface=WAN log=yes
```

#### 使用通用 IPsec 策略 {#using-generic-ipsec-policy}

此方法的技巧是添加一个 action 为 drop 的默认策略。假设我们在公共地址 1.1.1.1 上运行 L2TP/IPsec 服务器，并且希望丢弃所有未加密的 L2TP：

```ros
/ip/ipsec/policy
add src-address=1.1.1.1 dst-address=0.0.0.0/0 sa-src-address=1.1.1.1 protocol=udp src-port=1701 tunnel=yes action=discard
```

现在路由器将丢弃任何未加密的 L2TP 入站流量，但在 L2TP/IPsec 连接成功后，会创建一个优先级高于默认静态规则的动态策略，并且匹配该动态规则的数据包可以被转发。

:::warning
策略顺序很重要！为使此方法生效，请确保静态 drop 策略位于动态策略下方。如有必要，将其移到策略模板下方。
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

### 在对等体配置下手动指定 local-address 参数 {#manually-specifying-local-address-parameter-under-peer-configuration}

#### 使用不同的路由表 {#using-different-routing-table}

与 RouterOS 中的任何其他服务一样，IPsec 使用主路由表，无论 Peer 配置中使用什么 local-address 参数。必须对 IKE 和 IPsec 流量都应用路由标记。

考虑以下示例。有两条默认路由 - 一条在主路由表中，另一条在路由表 "backup" 中。IPsec 站点到站点隧道需要使用备份链路。

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

IPsec 对等体和策略配置，以及 IPsec 隧道流量的 NAT 绕过规则，都使用备份链路的源地址创建。

```ros
/ip/ipsec/peer
add address=10.155.130.136/32 local-address=10.155.107.8 secret=test
/ip/ipsec/policy
add sa-src-address=10.155.107.8 src-address=192.168.1.0/24 dst-address=172.16.0.0/24 sa-dst-address=10.155.130.136 tunnel=yes
/ip/firewall/nat
add action=accept chain=srcnat src-address=192.168.1.0/24 dst-address=172.16.0.0/24 place-before=0
```

目前，我们在日志中看到 "phase1 negotiation failed due to time up" 错误。这是因为 IPsec 尝试使用主路由表和错误的源地址到达远程对等体。需要使用 Mangle 标记 UDP/500、UDP/4500 和 ipsec-esp 数据包：

```ros
/ip/firewall/mangle
add action=mark-connection chain=output connection-mark=no-mark dst-address=10.155.130.136 dst-port=500,4500 new-connection-mark=ipsec passthrough=yes protocol=udp
add action=mark-connection chain=output connection-mark=no-mark dst-address=10.155.130.136 new-connection-mark=ipsec passthrough=yes protocol=ipsec-esp
add action=mark-routing chain=output connection-mark=ipsec new-routing-mark=backup passthrough=no
```

#### 使用同一路由表和多个 IP 地址 {#using-the-same-routing-table-with-multiple-ip-addresses}

考虑以下示例。公共接口上有来自同一子网的多个 IP 地址。在 out-interface 上配置了 masquerade 规则。必须显式使用其中一个 IP 地址。

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

IPsec 对等体和策略配置使用其中一个公共 IP 地址创建。

```ros
/ip/ipsec/peer
add address=10.155.130.136/32 local-address=172.22.2.3 secret=test
/ip/ipsec/policy
add sa-src-address=172.22.2.3 src-address=192.168.1.0/24 dst-address=172.16.0.0/24 sa-dst-address=10.155.130.136 tunnel=yes
/ip/firewall/nat
add action=accept chain=srcnat src-address=192.168.1.0/24 dst-address=172.16.0.0/24 place-before=0
```

目前，Phase 1 连接使用的源地址与我们指定的不同，并且日志中显示 "phase1 negotiation failed due to time up" 错误。这是因为 masquerade 正在更改连接的源地址，以匹配已连接路由的 pref-src 地址。解决方案是排除来自公共 IP 地址的连接，使其不被 masquerade。

```ros
/ip/firewall/nat
add action=accept chain=srcnat protocol=udp src-port=500,4500 place-before=0
```

## 应用示例 {#application-examples}

### 站点到站点 IPsec (IKEv1) 隧道 {#site-to-site-ipsec-ikev1-tunnel}

考虑如下所示的设置。两个远程办公室路由器连接到 Internet，办公室工作站位于 NAT 之后。每个办公室都有自己的本地子网，Office1 为 10.1.202.0/24，Office2 为 10.1.101.0/24。两个远程办公室都需要通向路由器后方本地网络的安全隧道。

![](/img/e82d4ebd9d1188e7.webp)

#### **站点 1 配置** {#site-1-configuration}

首先使用适合你需求的更强或更弱加密参数创建新的 Phase 1 配置文件和 Phase 2 提议条目。建议为每个菜单创建单独的条目，以便它们对每个对等体都是唯一的，以防将来需要调整任何设置。这些参数必须在站点之间匹配，否则连接将无法建立。

```ros
/ip/ipsec/profile
add dh-group=modp2048 enc-algorithm=aes-128 name=ike1-site2
/ip/ipsec/proposal
add enc-algorithms=aes-128-cbc name=ike1-site2 pfs-group=modp2048
```

继续配置对等体。指定远程路由器的地址。应能通过 UDP/500 和 UDP/4500 端口访问此地址，因此请确保针对路由器防火墙采取适当的操作。指定此对等体的名称以及新建的配置文件。

```ros
/ip/ipsec/peer
add address=192.168.80.1/32 name=ike1-site2 profile=ike1-site2
```

下一步是创建身份。对于基本的预共享密钥保护隧道，除了 **强** 密钥以及此身份应用到的对等体之外，没有太多需要设置的。

```ros
/ip/ipsec/identity
add peer=ike1-site2 secret=thisisnotasecurepsk
```

:::danger
如果安全性很重要，请考虑使用 IKEv2 和其他 auth-method。
:::

最后，创建一个策略来控制应在哪些网络/主机之间加密流量。

```ros
/ip/ipsec/policy
add src-address=10.1.202.0/24 src-port=any dst-address=10.1.101.0/24 dst-port=any tunnel=yes action=encrypt proposal=ike1-site2 peer=ike1-site2
```

#### **站点 2 配置** {#site-2-configuration}

Office 2 的配置与 Office 1 几乎相同，只需使用正确的 IP 地址配置。首先创建新的 Phase 1 配置文件和 Phase 2 提议条目：

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

此时，隧道应已建立，并且两个路由器上都应创建两个 IPsec 安全关联：

```ros
/ip/ipsec
active-peers print
installed-sa print
```

#### **NAT 和 Fasttrack 绕过** {#nat-and-fasttrack-bypass}

此时，如果你尝试通过 IPsec 隧道发送流量，将无法工作；数据包会丢失。这是因为两个路由器都有 NAT 规则（masquerade），会在数据包加密之前更改源地址。路由器无法加密数据包，因为源地址与策略配置中指定的地址不匹配。更多信息请参见 IPsec 数据包流示例。

要解决此问题，我们需要设置 IP/Firewall/NAT 绕过规则。

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
如果你在添加 NAT 绕过规则之前尝试建立 IP 连接，则必须从连接表中清除现有连接，或重启两个路由器。
:::

绕过规则放在所有其他 NAT 规则的最顶部非常重要。

另一个问题是，如果启用了 IP/Fasttrack，数据包会绕过 IPsec 策略。因此我们需要在 FastTrack 之前添加接受规则。

```ros
/ip/firewall/filter
add chain=forward action=accept place-before=1
src-address=10.1.101.0/24 dst-address=10.1.202.0/24 connection-state=established,related
add chain=forward action=accept place-before=1
src-address=10.1.202.0/24 dst-address=10.1.101.0/24 connection-state=established,related
```

但是，如果有相当数量的隧道并且每个隧道上都有大量流量，这可能会给路由器 CPU 增加显著负载。

解决方案是使用 IP/Firewall/Raw 绕过连接跟踪，从而无需上述过滤规则，并将 CPU 负载降低约 30%。

```ros
/ip/firewall/raw
add action=notrack chain=prerouting src-address=10.1.101.0/24 dst-address=10.1.202.0/24
add action=notrack chain=prerouting src-address=10.1.202.0/24 dst-address=10.1.101.0/24
```

### 使用 DNS 的站点到站点 GRE over IPsec (IKEv2) 隧道 {#site-to-site-gre-tunnel-over-ipsec-ikev2-using-dns}

此示例说明当一个或两个站点没有静态 IP 地址时，如何在两个 RouterOS 设备之间建立安全且加密的 GRE 隧道。要使此配置可行，必须为将充当响应方（服务器）的设备之一分配 DNS 名称。为简单起见，我们将使用 RouterOS 内置的 DDNS 服务 IP/Cloud。

![](/img/a4224852afe39ede.webp)

#### 站点 1（服务器）配置 {#site-1-server-configuration}

这是将侦听传入连接并充当响应方的一侧。我们将使用 mode config 为第二个站点提供 IP 地址，但首先创建一个环回（空白）桥，并为其分配一个稍后用于建立 GRE 隧道的 IP 地址。

```ros
/interface/bridge 
add name=loopback
/ip/address
add address=192.168.99.1 interface=loopback
```

继续 IPsec 配置，首先使用适合你需求的更强或更弱加密参数创建新的 Phase 1 配置文件和 Phase 2 提议条目。请注意，此配置示例将侦听所有传入的 IKEv2 请求，这意味着该配置文件配置将与其他所有配置（例如 RoadWarrior）共享。

```ros
/ip/ipsec/profile
add dh-group=ecp256,modp2048,modp1024 enc-algorithm=aes-256,aes-192,aes-128 name=ike2
/ip/ipsec/proposal
add auth-algorithms=null enc-algorithms=aes-128-gcm name=ike2-gre pfs-group=none
```

接下来，创建 responder=yes 的新 mode config 条目。这将为另一站点提供 IP 配置，以及用于策略生成的主机（环回地址）。

```ros
/ip/ipsec/mode-config
add address=192.168.99.2 address-prefix-length=32 name=ike2-gre split-include=192.168.99.1/32 system-dns=no
```

建议创建一个新的策略组，将此配置与任何现有或未来的 IPsec 配置分开。

```ros
/ip/ipsec/policy/group
add name=ike2-gre
```

现在是时候设置一个新的策略模板，以匹配远程对等体的新动态地址和环回地址。

```ros
/ip/ipsec/policy
add dst-address=192.168.99.2/32 group=ike2-gre proposal=ike2-gre src-address=192.168.99.1/32 template=yes
```

下一步是创建将侦听所有 IKEv2 请求的对等体配置。如果你已经有这样的条目，可以跳过此步骤。

```ros
/ip/ipsec/peer
add exchange-mode=ike2 name=ike2 passive=yes profile=ike2
```

最后，设置一个身份，通过使用特定密钥的 pre-shared-key 认证来匹配我们的远程对等体。

```ros
/ip/ipsec/identity
add generate-policy=port-strict mode-config=ike2-gre peer=ike2 policy-template-group=ike2-gre secret=test
```

服务器端现在已配置完成并侦听所有 IKEv2 请求。请确保防火墙未阻止 UDP/4500 端口。

最后一步是创建 GRE 接口本身。也可以在以后从客户端建立 IPsec 连接时执行此操作。

```ros
/interface/gre
add local-address=192.168.99.1 name=gre-tunnel1 remote-address=192.168.99.2
```

配置 IP 地址以及通过 GRE 接口到远程网络的路由。

```ros
/ip/address
add address=172.16.1.1/30 interface=gre-tunnel1
/ip/route
add dst-address=10.1.202.0/24 gateway=172.16.1.2
```

#### 站点 2（客户端）配置 {#site-2-client-configuration}

与服务器配置类似，首先创建新的 Phase 1 配置文件和 Phase 2 提议配置。由于此站点将是发起方，我们可以使用更具体的配置文件配置来控制使用哪些确切的加密参数，只需确保它们与服务器端配置的内容重叠。

```ros
/ip/ipsec/profile
add dh-group=ecp256 enc-algorithm=aes-256 name=ike2-gre
/ip/ipsec/proposal
add auth-algorithms=null enc-algorithms=aes-128-gcm name=ike2-gre pfs-group=none
```

接下来，创建 responder=no 的新 mode config 条目。这将确保对等体从服务器请求 IP 和拆分网络配置。

```ros
/ip/ipsec/mode-config
add name=ike2-gre responder=no
```

还建议创建一个新的策略组，将此配置与任何现有或未来的 IPsec 配置分开。

```ros
/ip/ipsec/policy/group
add name=ike2-gre
```

同时在客户端侧创建新的策略模板。

```ros
/ip/ipsec/policy
add dst-address=192.168.99.1/32 group=ike2-gre proposal=ike2-gre src-address=192.168.99.2/32 template=yes
```

继续进行对等体配置。现在我们可以在 address 参数下指定服务器的 DNS 名称。显然，你也可以使用 IP 地址。

```ros
/ip/ipsec/peer
add address=n.mynetname.net exchange-mode=ike2 name=p1.ez profile=ike2-gre
```

最后，为我们新建的对等体创建身份。

```ros
/ip/ipsec/identity
add generate-policy=port-strict mode-config=ike2-gre peer=p1.ez policy-template-group=ike2-gre secret=test
```

如果一切操作正确，应该会存在一个新的动态策略。

```ros
/ip/ipsec/policy/print 
Flags: T - template, X - disabled, D - dynamic, I - invalid, A - active, * - default 
0 T * group=default src-address=::/0 dst-address=::/0 protocol=all proposal=default template=yes

1 T group=ike2-gre src-address=192.168.99.2/32 dst-address=192.168.99.1/32 protocol=all proposal=ike2-gre template=yes

2 DA src-address=192.168.99.2/32 src-port=any dst-address=192.168.99.1/32 dst-port=any protocol=all action=encrypt level=unique ipsec-protocols=esp 
tunnel=yes sa-src-address=192.168.90.1 sa-dst-address=(current IP of n.mynetname.net) proposal=ike2-gre ph2-count=1 
```

现在两个站点之间已建立安全隧道，将加密 192.168.99.2 \<=> 192.168.99.1 地址之间的所有流量。我们可以使用这些地址创建 GRE 隧道。

```ros
/interface/gre
add local-address=192.168.99.2 name=gre-tunnel1 remote-address=192.168.99.1
```

配置 IP 地址以及通过 GRE 接口到远程网络的路由。

```ros
/ip/address
add address=172.16.1.2/30 interface=gre-tunnel1
/ip/route
add dst-address=10.1.101.0/24 gateway=172.16.1.1
```

### 使用 IKEv2 和 RSA 认证的 Road Warrior 设置 {#road-warrior-setup-using-ikev2-with-rsa-authentication}

此示例说明如何在连接到 Internet 的设备（road warrior 客户端）与运行 RouterOS 并充当服务器的设备之间建立安全的 IPsec 连接。

![](/img/15261a1aca9285d4.webp)

#### RouterOS 服务器配置 {#routeros-server-configuration}

在配置 IPsec 之前，需要设置证书。可以使用单独的 Certificate Authority 进行证书管理；但是，在此示例中，自签名证书在 RouterOS System/Certificates 菜单中生成。要将各种设备连接到服务器，应满足一些证书要求：

- Common name 应包含服务器的 IP 或 DNS 名称。
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

既然路由器上已创建有效证书，添加 pfs-group=none 的新 Phase 1 配置文件和 Phase 2 提议条目：

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

由于必须调整策略模板以仅允许特定网络策略，建议创建单独的策略组和模板。

```ros
/ip/ipsec/policy/group
add name=ike2-policies
/ip/ipsec/policy
add dst-address=192.168.77.0/24 group=ike2-policies proposal=ike2 src-address=0.0.0.0/0 template=yes
```

创建一个新的 IPsec 对等体条目，以侦听所有传入的 IKEv2 请求。

```ros
/ip/ipsec/peer
add exchange-mode=ike2 name=ike2 passive=yes profile=ike2
```

##### 身份配置 {#identity-configuration}

身份菜单允许匹配特定远程对等体，并为每个对等体分配不同的配置。首先，创建一个默认身份，该身份将接受所有对等体，但会使用其对等体的证书验证对等体身份。

```ros
/ip/ipsec/identity
add auth-method=digital-signature certificate=server1 generate-policy=port-strict mode-config=ike2-conf peer=ike2 policy-template-group=ike2-policies
```

:::warning
如果对等体的 ID (ID\_i) 与其发送的证书不匹配，身份查找将失败。请参见 identities 部分中的 remote-id。
:::

例如，我们想为用户 "A" 分配不同的 mode config，该用户使用证书 "rw-client1" 向服务器认证自身。首先，确保已创建新的 mode config 并准备好应用于该特定用户。

```ros
/ip/ipsec/mode-config
add address=192.168.66.2 address-prefix-length=32 name=usr_A split-include=192.168.55.0/24 system-dns=no
```

可以通过使用 match-by=certificate 参数并使用 remote-certificate 指定其证书，将此配置应用于用户 "A"。

```ros
/ip/ipsec/identity
add auth-method=digital-signature certificate=server1 generate-policy=port-strict match-by=certificate mode-config=usr_A peer=ike2 policy-template-group=ike2-policies remote-certificate=rw-client1
```

##### （可选）拆分隧道配置 {#optional-split-tunnel-configuration}

拆分隧道是一种方法，允许 road warrior 客户端仅访问特定的受保护网络，同时根据其内部路由表发送其余流量（而不是通过隧道发送所有流量）。要配置拆分隧道，需要更改 mode config 参数。

例如，我们将允许 road warrior 客户端仅访问 10.5.8.0/24 网络。

```ros
/ip/ipsec/mode-conf
set [find name="rw-conf"] split-include=10.5.8.0/24
```

还可以发送特定的 DNS 服务器供客户端使用。默认情况下，使用 system-dns=yes，这会发送在路由器自身的 IP/DNS 中配置的 DNS 服务器。我们可以使用 static-dns 参数强制客户端使用不同的 DNS 服务器。

```ros
/ip/ipsec/mode-conf
set [find name="rw-conf"] system-dns=no static-dns=10.5.8.1
```

虽然可以调整 IPsec 策略模板，以仅允许 road warrior 客户端为 split-include 参数配置的网络生成策略，但这可能会导致与不同厂商实现的兼容性问题（请参见已知限制）。与其调整策略模板，不如在 IP/Firewall/Filter 中允许访问受保护网络，并丢弃其他所有内容。

```ros
/ip/firewall/filter
add action=drop chain=forward src-address=192.168.77.0/24 dst-address=!10.5.8.0/24
```

:::warning
拆分网络不是安全措施。客户端（发起方）仍然可以请求不同的 Phase 2 流量选择器。
:::

##### 生成客户端证书 {#generating-client-certificates}

要为客户端生成新证书并使用之前创建的 CA 对其进行签名。

```ros
/certificate
add common-name=rw-client1 name=rw-client1 key-usage=tls-client
sign rw-client1 ca=ca
```

大多数客户端实现接受 **PKCS12 格式**，因此导出证书时，请确保指定 PKCS12。

```ros
/certificate
export-certificate rw-client1 export-passphrase=1234567890 type=pkcs12
```

现在，路由器 System/File 部分中有一个名为 *cert\_export\_rw-client1.p12* 的文件。此文件应安全地传输到客户端设备。

通常 PKCS12 捆绑包还包含 CA 证书，但某些厂商可能不会安装此 CA，因此必须使用 PEM 格式单独导出自签名 CA 证书。

```ros
/certificate
export-certificate ca type=pem
```

现在，路由器 System/File 部分中有一个名为 *cert\_export\_ca.crt* 的文件。此文件也应安全地传输到客户端设备。

**PEM** 是另一种证书格式，用于不支持 PKCS12 的客户端软件。原理基本相同。

```ros
/certificate
export-certificate ca
export-certificate rw-client1 export-passphrase=1234567890
```

现在，路由器的 Files 部分中有三个文件：*cert\_export\_ca.crt*、*cert\_export\_rw-client1.crt* 和 *cert\_export\_rw-client1.key*，它们应安全地传输到客户端设备。

##### 已知限制 {#known-limitations}

以下是流行客户端软件 IKEv2 实现的已知限制列表。

- Windows 将始终忽略通过 split-include 收到的网络，并请求目标为 0.0.0.0/0 (TSr) 的策略。生成 IPsec-SA 后，Windows 会请求 DHCP 选项 249，RouterOS 将自动使用配置的 split-include 网络响应。

- Apple macOS 和 iOS 都只接受第一个 split-include 网络。

- Apple macOS 和 iOS 仅在使用了 0.0.0.0/0 split-include 时，才会使用 system-dns 和 static-dns 参数中的 DNS 服务器。

- 虽然某些实现可以在 Phase 2 使用不同的 PFS 组，但建议在 proposals 下使用 pfs-group=none，以避免任何兼容性问题。

#### RouterOS 客户端配置 {#routeros-client-configuration}

在 RouterOS 中导入 PKCS12 格式证书。

```ros
/certificate/import file-name=cert_export_RouterOS_client.p12 passphrase=1234567890
```

现在 Certificate 菜单中应有自签名 CA 证书和客户端证书。找出客户端证书的名称。

```ros
/certificate/print
```

**cert\_export\_RouterOS\_client.p12\_0** 是客户端证书。

建议创建单独的 Phase 1 配置文件和 Phase 2 提议配置，以免干扰任何现有 IPsec 配置。

```ros
/ip/ipsec/profile
add name=ike2-rw
/ip/ipsec/proposal
add name=ike2-rw pfs-group=none
```

虽然可以使用默认策略模板生成策略，但最好创建新的策略组和模板，将此配置与任何其他 IPsec 配置分开。

```ros
/ip/ipsec/policy/group
add name=ike2-rw
/ip/ipsec/policy
add group=ike2-rw proposal=ike2-rw template=yes
```

创建一个 responder=no 的新 mode config 条目，该条目将从服务器请求配置参数。

```ros
/ip/ipsec/mode-config
add name=ike2-rw responder=no
```

最后，创建对等体和身份配置。

```ros
/ip/ipsec/peer
add address=2.2.2.2/32 exchange-mode=ike2 name=ike2-rw-client
/ip/ipsec/identity
add auth-method=digital-signature certificate=cert_export_RouterOS_client.p12_0 generate-policy=port-strict mode-config=ike2-rw peer=ike2-rw-client policy-template-group=ike2-rw
```

验证连接已成功建立。

```ros
/ip/ipsec
active-peers print
installed-sa print
```

##### 启用动态源 NAT 规则生成 {#enabling-dynamic-source-nat-rule-generation}

如果我们查看生成的动态策略，会看到只有具有特定源地址（由 mode config 接收）的流量才会通过隧道发送。但路由器在大多数情况下需要将特定设备或网络路由到隧道中。在这种情况下，我们可以使用源 NAT 更改数据包的源地址，以匹配 mode config 地址。由于 mode config 地址是动态的，因此无法创建静态源 NAT 规则。在 RouterOS 中，可以为 mode config 客户端生成动态源 NAT 规则。

![](/img/f2c4abd8b00ecd03.webp)

例如，我们有一个位于路由器后方的本地网络 192.168.88.0/24，并且我们希望来自此网络的所有流量都通过隧道发送。首先，我们必须创建一个新的 IP/Firewall/Address 列表，其中包含我们的本地网络。

```ros
/ip/firewall/address-list
add address=192.168.88.0/24 list=local
```

完成后，我们可以将新建的 IP/Firewall/Address 列表分配给 mode config 配置。

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
确保动态 mode config 地址不是本地网络的一部分。
:::

#### Windows 客户端配置 {#windows-client-configuration}

在 Windows 计算机上打开 PKCS12 格式证书文件。按照说明安装证书。确保选择“本地计算机”存储位置。![](/img/7f0720a59f02c365.webp) 现在可以转到“网络和 Internet 设置”-> VPN 并添加新配置。填写连接名称、服务器名称或地址参数。在 VPN 类型下选择 IKEv2。完成后，必须选择“使用计算机证书”。可以在“网络和共享中心”中单击 VPN 连接的“属性”菜单来完成此操作。该设置位于“安全”选项卡下。

![](/img/d60e9d2292526217.webp)

目前，Windows 10 与以下 Phase 1（profiles）和 Phase 2（proposals）提议集兼容：

| 阶段 1 |  |  |
| :-- | :-- | :-- |
| 哈希算法 | 加密算法 | DH 组 |
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

| 阶段 2 |  |  |
| :-- | :-- | :-- |
| 哈希算法 | 加密算法 | PFS 组 |
| SHA1 | AES-256-CBC | none |
| SHA1 | AES-128-CBC | none |
| SHA1 | 3DES | none |
| SHA1 | DES | none |
| SHA1 | none | none |

#### macOS 客户端配置 {#macos-client-configuration}

在 macOS 计算机上打开 PKCS12 格式证书文件，并将证书安装到 "System" 钥匙串中。由于 CA 证书是自签名的，因此必须手动将其标记为受信任。在 macOS Keychain Access 应用的 System 选项卡下找到该证书，并将其标记为 Always Trust。

![](/img/ae8f9610163925e0.webp)

现在可以转到 System Preferences -> Network，并单击 + 按钮添加新配置。选择 Interface: VPN、VPN Type: IKEv2，并为连接命名。Remote ID 必须设置为等于服务器证书的 common-name 或 subjAltName。Local ID 可以留空。在 Authentication Settings 下选择 None，并选择客户端证书。现在可以测试连接。

![](/img/98ab138f5ea6d75a.webp)

目前，macOS 与以下 Phase 1（profiles）和 Phase 2（proposals）提议集兼容：

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

#### iOS 客户端配置 {#ios-client-configuration}

通常，PKCS12 捆绑包还包含 CA 证书，但 iOS 不会安装此 CA，因此必须使用 PEM 格式单独安装自签名 CA 证书。在 iOS 设备上打开这些文件，并按照说明安装两个证书。必须在 iOS 设备上将自签名 CA 证书标记为受信任。可以在 Settings -> General -> About -> Certificate Trust Settings 菜单中完成此操作。完成后，在 Settings -> General -> Profiles 菜单下检查两个证书是否都标记为 "verified"。

![](/img/b5ea33be6cc87db1.webp)

现在可以转到 Settings -> General -> VPN 菜单并添加新配置。Remote ID 必须设置为等于服务器证书的 common-name 或 subjAltName。Local ID 可以留空。

![](/img/a0ba071bd82f918b.webp)

目前，iOS 与以下 Phase 1（profiles）和 Phase 2（proposals）提议集兼容：

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
如果你通过 WiFi 连接到 VPN，iOS 设备可能会进入睡眠模式并与网络断开连接。
:::

#### Android (strongSwan) 客户端配置 {#android-strongswan-client-configuration}

目前，Android 没有原生 IKEv2 支持，但是可以使用 Google Play 商店中的 strongSwan，它为 Android 带来 IKEv2。StrongSwan 接受 PKCS12 格式证书，因此在 strongSwan 中设置 VPN 连接之前，请确保将 PKCS12 捆绑包下载到 Android 设备。完成后，在 strongSwan 中创建新的 VPN 配置文件，输入服务器 IP，并选择 "IKEv2 Certificate" 作为 VPN 类型。选择用户证书时，按 Install 并按照证书提取过程指定 PKCS12 捆绑包。保存配置文件，并通过按 VPN 配置文件测试连接。

![](/img/f1154362a91b750c.webp)

可以通过勾选 "Show advanced settings" 复选框在 strongSwan 中指定自定义加密设置。目前，strongSwan 默认与以下 Phase 1（profiles）和 Phase 2（proposals）提议集兼容：

| 阶段 1 |  |  |
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

#### Linux (strongSwan) 客户端配置 {#linux-strongswan-client-configuration}

下载 PKCS12 证书捆绑包，并将其移动到 `/etc/ipsec`.d/private 目录。

将导出的私钥密码短语添加到 `/etc/ipsec`.secrets 文件，其中 "strongSwan\_client.p12" 是文件名，"1234567890" 是密码短语。

```bash
: P12 strongSwan_client.p12 "1234567890"
```

将新连接添加到 `/etc/ipsec`.conf 文件

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

现在可以重新启动（或启动）ipsec 守护进程并初始化连接。

```bash
ipsec restart
ipsec up ikev2
```

### 使用 IKEv2 和由 User Manager 处理的 EAP-MSCHAPv2 认证的 Road Warrior 设置（RouterOS v7） {#road-warrior-setup-using-ikev2-with-eap-mschapv2-authentication-handled-by-user-manager-routeros-v7}

此示例说明如何在连接到 Internet 的设备（road warrior 客户端）与运行 RouterOS 并充当 IKEv2 服务器和 User Manager 的设备之间建立安全的 IPsec 连接。可以在网络中的单独设备上运行 User Manager，但在本示例中，User Manager 和 IKEv2 服务器都将配置在同一设备（Office）上。

![](/img/15261a1aca9285d4.webp)

#### RouterOS 服务器配置 {#routeros-server-configuration-1}

##### 要求 {#requirements}

要使此设置生效，路由器需要满足几个先决条件：

1. 路由器的 IP 地址应具有有效的公共 DNS 记录 - 可以使用 IP Cloud 实现。
2. 应能通过 Internet 上的 TCP/80 端口访问路由器 - 如果服务器位于 NAT 之后，则应配置端口转发。
3. 路由器上应安装 User Manager 软件包。

##### 生成 Let's Encrypt 证书 {#generating-lets-encrypt-certificate}

在 EAP-MSCHAPv2 认证期间，必须进行 TLS 握手，这意味着服务器必须具有可由客户端验证的证书。为简化此步骤，我们将使用 Let's Encrypt 证书，大多数操作系统无需用户干预即可验证该证书。要生成证书，只需在 Certificates 菜单下启用 SSL 证书。默认情况下，该命令使用 IP Cloud 提供的动态 DNS 记录，但也可以指定自定义 DNS 名称。请注意，DNS 记录应指向路由器。

```ros
/certificate/enable-ssl-certificate
```

如果证书生成成功，你应该会在 Certificates 菜单下看到已安装的 Let's Encrypt 证书。

```ros
/certificate/print detail where name~"letsencrypt"
```

##### 配置 User Manager {#configuring-user-manager}

首先，允许从 localhost（路由器本身）接收 RADIUS 请求：

```ros
/user-manager/router
add address=127.0.0.1 comment=localhost name=local shared-secret=test
```

启用 User Manager 并指定将用于认证用户的 Let's Encrypt 证书（将证书名称替换为你设备上安装的证书名称）。

```ros
/user-manager
set certificate="letsencrypt_2021-04-09T07:10:55Z" enabled=yes
```

最后添加用户及其凭据，客户端将使用这些凭据向服务器认证。

```ros
/user-manager/user
add name=user1 password=password
```

##### 配置 RADIUS 客户端 {#configuring-radius-client}

要让路由器使用 RADIUS 服务器进行用户认证，需要添加一个新的 RADIUS 客户端，其共享密钥与我们已在 User Manager 上配置的相同。

```ros
/radius
add address=127.0.0.1 secret=test service=ipsec
```

##### IPsec (IKEv2) 服务器配置 {#ipsec-ikev2-server-configuration}

添加 pfs-group=none 的新 Phase 1 配置文件和 Phase 2 提议条目：

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

由于必须调整策略模板以仅允许特定网络策略，建议创建单独的策略组和模板。

```ros
/ip/ipsec/policy/group
add name=ike2-policies
/ip/ipsec/policy
add dst-address=192.168.77.0/24 group=ike2-policies proposal=ike2 src-address=0.0.0.0/0 template=yes
```

创建一个新的 IPsec 对等体条目，以侦听所有传入的 IKEv2 请求。

```ros
/ip/ipsec/peer
add exchange-mode=ike2 name=ike2 passive=yes profile=ike2
```

最后，创建一个新的 IPsec 身份条目，以匹配所有尝试使用 EAP 认证的客户端。请注意，必须指定生成的 Let's Encrypt 证书。

```ros
/ip/ipsec/identity
add auth-method=eap-radius certificate="letsencrypt_2021-04-09T07:10:55Z" generate-policy=port-strict mode-config=ike2-conf peer=ike2 \
policy-template-group=ike2-policies
```

##### （可选）拆分隧道配置 {#optional-split-tunnel-configuration-1}

拆分隧道是一种方法，允许 road warrior 客户端仅访问特定的受保护网络，同时根据其内部路由表发送其余流量（而不是通过隧道发送所有流量）。要配置拆分隧道，需要更改 mode config 参数。

例如，我们将允许 road warrior 客户端仅访问 10.5.8.0/24 网络。

```ros
/ip/ipsec/mode-conf
set [find name="rw-conf"] split-include=10.5.8.0/24
```

还可以发送特定的 DNS 服务器供客户端使用。默认情况下，使用 system-dns=yes，这会发送在路由器自身的 IP/DNS 中配置的 DNS 服务器。我们可以使用 static-dns 参数强制客户端使用不同的 DNS 服务器。

```ros
/ip/ipsec/mode-conf
set [find name="rw-conf"] system-dns=no static-dns=10.5.8.1
```

:::warning
拆分网络不是安全措施。客户端（发起方）仍然可以请求不同的 Phase 2 流量选择器。
:::

##### （可选）为用户分配静态 IP 地址 {#optional-assigning-static-ip-address-to-user}

可以通过使用 RADIUS Framed-IP-Address 属性为任何用户分配静态 IP 地址。

```ros
/user-manager/user
set [find name="user1"] attributes=Framed-IP-Address:192.168.77.100 shared-users=1
```

:::danger
为避免任何冲突，应从其他用户的 IP 池中排除该静态 IP 地址，并且应为该特定用户将 shared-users 设置为 1。
:::

##### （可选）计费配置 {#optional-accounting-configuration}

要跟踪每个用户的正常运行时间、下载和上传统计信息，可以使用 RADIUS 计费。默认情况下，IPsec 的 RADIUS 计费已启用，但建议配置 Interim Update 计时器，以定期将统计信息发送到 RADIUS 服务器。如果路由器将处理大量并发会话，建议增加更新计时器以避免 CPU 使用率增加。

```ros
/ip/ipsec/settings
set interim-update=1m
```

### 基本 L2TP/IPsec 设置 {#basic-l2tpipsec-setup}

此示例演示如何在 RouterOS 上轻松设置用于 road warrior 连接的 L2TP/IPsec 服务器（适用于 Windows、Android、iOS、macOS 和其他厂商的 L2TP/IPsec 实现）。

#### RouterOS 服务器配置 {#routeros-server-configuration-2}

第一步是启用 L2TP 服务器：

```ros
/interface/l2tp-server/server
set enabled=yes use-ipsec=required ipsec-secret=mySecret default-profile=default
```

use-ipsec 设置为 **required**，以确保仅接受 IPsec 封装的 L2TP 连接。

现在，它会启用 L2TP 服务器并使用指定的密钥创建动态 IPsec 对等体。

```ros
[admin@MikroTik] /ip/ipsec/peer> print 
0 D address=0.0.0.0/0 local-address=0.0.0.0 passive=yes port=500 
auth-method=pre-shared-key secret="123" generate-policy=port-strict 
exchange-mode=main-l2tp send-initial-contact=yes nat-traversal=yes 
hash-algorithm=sha1 enc-algorithm=3des,aes-128,aes-192,aes-256 
dh-group=modp1024 lifetime=1d dpd-interval=2m dpd-maximum-failures=5 
```

:::warning
如果存在静态 IPsec 对等体配置，必须小心。
:::

下一步是创建 VPN 池并添加一些用户。

```ros
/ip/pool/add name=vpn-pool range=192.168.99.2-192.168.99.100

/ppp/profile
set default local-address=192.168.99.1 remote-address=vpn-pool

/ppp/secret
add name=user1 password=123
add name=user2 password=234
```

现在路由器已准备好接受 L2TP/IPsec 客户端连接。

#### RouterOS 客户端配置 {#routeros-client-configuration-1}

要让 RouterOS 作为 L2TP/IPsec 客户端工作，只需添加新的 L2TP 客户端即可。

```ros
/interface/l2tp-client
add connect-to=1.1.1.1 disabled=no ipsec-secret=mySecret name=l2tp-out1 \
password=123 use-ipsec=yes user=user1
```

它将自动创建动态 IPsec 对等体和策略配置。

### 故障排除/FAQ {#troubleshootingfaq}

#### Phase 1 无法获取有效提议 {#phase-1-failed-to-get-a-valid-proposal}

```ros
[admin@MikroTik] /log> print
(..)
17:12:32 ipsec,error no suitable proposal found. 
17:12:32 ipsec,error 10.5.107.112 failed to get valid proposal. 
17:12:32 ipsec,error 10.5.107.112 failed to pre-process ph1 packet (side: 1, status 1). 
17:12:32 ipsec,error 10.5.107.112 phase1 negotiation failed. 
(..)
```

对等体无法协商加密参数，导致连接断开。要解决此问题，请启用 IPSec 调试日志，找出远程对等体提议的参数，并相应地调整配置。

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

在此示例中，远程端要求使用 SHA1 作为哈希算法，但本地路由器上配置的是 MD5。冒号符号 (:) 之前的设置配置在本地侧，冒号符号 (:) 之后的参数配置在远程侧。

#### "phase1 negotiation failed due to time up" 是什么意思？ {#phase1-negotiation-failed-due-to-time-up-what-does-it-mean}

对等体之间存在通信问题。可能原因包括 - Phase 1 IP 地址配置错误；防火墙阻止 UDP 端口 500 和 4500；对等体之间的 NAT 未正确转换 IPsec 协商数据包。当 local-address 参数使用不当时，也可能出现此错误消息。更多信息可在此处获取。

#### 随机丢包或隧道连接非常慢，启用数据包嗅探器/torch 后问题解决？ {#random-packet-drops-or-connections-over-the-tunnel-are-very-slow-enabling-packet-sniffertorch-fixes-the-problem}

问题在于，数据包在封装之前被发送到 Fasttrack/FastPath，从而绕过 IPsec 策略检查。解决方案是将需要封装/解封装的流量从 Fasttrack 中排除。

#### 如何启用 ike2？ {#how-to-enable-ike2}

对于基本配置，启用 ike2 非常简单。只需将 peer 设置中的 exchange-mode 更改为 ike2。

#### 致命的 NO-PROPOSAL-CHOSEN 通知消息？ {#fatal-no-proposal-chosen-notify-message}

远程对等体发送了一个通知，表示它无法接受提议的算法。要查找问题的确切原因，请查看远程对等体的调试日志或配置，并验证客户端和服务器是否具有相同的算法集。

#### 我只能在一个方向 ping 通？ {#i-can-ping-only-in-one-direction}

此类情况下的典型问题是严格的防火墙：防火墙规则仅允许在一个方向上创建新连接。解决方案是重新检查防火墙规则，或显式接受所有应封装/解封装流量。

#### 我可以仅允许加密流量吗？ {#can-i-allow-only-encrypted-traffic}

可以，请参见“仅允许 IPsec 封装流量”示例。

#### 我在 StrongSwan 上启用 IKEv2 REAUTH 并收到错误 'initiator did not reauthenticate as requested' {#i-enable-ikev2-reauth-on-strongswan-and-got-the-error-initiator-did-not-reauthenticate-as-requested}

RouterOS 不支持 rfc4478，必须在 StrongSwan 上禁用 reauth。
