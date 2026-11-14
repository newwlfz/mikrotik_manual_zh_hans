---
sidebar_key: "virtual-private-networks/ipsec"
title: "IPsec"
sidebar_label: "IPsec"
description: "本节涵盖 IPsec 示例与集成。可用它配置 IKEv2、pre-shared-key 和 post-quantum 密钥工作流，以及第三方 VPN 连接。"
tags:
  - 'ipsec'
  - 'ike'
  - 'diffie-hellman'
source: https://manual.mikrotik.com/docs/virtual-private-networks/ipsec
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本节涵盖 IPsec 示例和集成。可使用它配置 IKEv2、pre-shared-key 和后量子密钥工作流，以及第三方 VPN 连接。

**Internet Protocol Security (IPsec)** 是由 Internet Engineering Task Force (IETF) 定义的一组协议，用于在 Internet 等未受保护的 IP/IPv6 网络上保护数据包交换。

IPsec 协议套件可分为以下几组：

- **Internet Key Exchange (IKE)** 协议，用于为 AH 和 ESP 动态生成和分发加密密钥。
- **Authentication Header (AH)** RFC 4302。
- **Encapsulating Security Payload (ESP)** RFC 4303。

## Internet Key Exchange 协议 (IKE) {#internet-key-exchange-protocol-ike}

Internet Key Exchange（IKE）是一种协议，为 Internet Security Association and Key Management Protocol（ISAKMP）框架提供经过认证的密钥材料。其他密钥交换方案也可与 ISAKMP 配合使用，但 IKE 是使用最广泛的一种。二者共同提供了主机认证和安全关联（SA）自动管理的手段。

IKE daemon 在大多数情况下保持空闲。它会在两种情况下被激活：

由策略规则匹配的流量需要加密或认证，但该策略没有任何 SA。策略会将此情况通知 IKE daemon，随后 IKE daemon 会向远程主机发起连接。IKE daemon 也可以响应远程连接。在两种情况下，对等方都会建立连接并执行 2 个阶段：

- **阶段 1**——对等方就后续 IKE 消息中使用的算法达成一致，并相互认证。用于为所有 SA 派生密钥以及保护主机之间后续 ISAKMP 交换的密钥材料也会生成。此阶段应匹配以下设置：
  - 认证方法
  - DH 组
  - 加密算法
  - 交换模式
  - 哈希算法
  - NAT-T
  - DPD 和 lifetime（可选）

- **阶段 2**——对等方建立一个或多个供 IPsec 用于加密数据的 SA。IKE daemon 建立的所有 SA 都有 lifetime 值（限制 SA 失效之前的时间、此 SA 可加密的数据量，或两者兼有）。此阶段应匹配以下设置：
  - IPsec 协议
  - 模式（隧道或传输）
  - 认证方法
  - PFS（DH）组
  - lifetime

:::warning
存在两个生命周期值——软生命周期和硬生命周期。当 SA 达到其软生命周期阈值时，IKE 守护进程会收到通知，并启动另一次 phase 2 交换，以用新的 SA 替换此 SA。如果 SA 达到硬生命周期，则会被丢弃。

**注意：** 如果在生命周期到期时 DPD 被禁用，Phase 1 不会重新生成密钥；只有 Phase 2 会重新生成密钥。要强制 Phase 1 重新生成密钥，请启用 DPD。

**注意：** PSK 认证曾已知在 "aggressive" 模式下容易受到离线攻击，但最近的发现表明，在 "main" 和 "ike2" 交换模式下也可能进行离线攻击。你应避免使用 PSK 认证方法。
:::

IKE 可选地提供完美前向保密（PFS），这是密钥交换的一种属性；对 IKE 而言，这意味着即使长期阶段 1 密钥被泄露，也无法轻易访问通过此阶段 1 建立的 SA 所保护的所有 IPsec 数据。这意味着会为每个阶段 2 生成额外的密钥材料。

密钥材料的生成在计算上非常昂贵。例如，modp8192 组交换即使在非常快的计算机上也可能需要数秒。它通常每个阶段 1 交换执行一次，而阶段 1 交换在任意一对主机之间只发生一次，然后会长期保留。PFS 也会将此昂贵操作添加到每次阶段 2 交换中。

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

更大的 DH 组提供更强的安全性，但需要更多 CPU 资源。以下是几个具有不同安全级别和 CPU 影响的常见 DH 组：

DH Group 14（2048 位） - 在安全性和 CPU 使用率之间提供实际平衡。它提供 2048 位密钥交换，被认为对大多数现代应用是安全的，并得到广泛支持。

DH Group 5（1536 位） - 提供比 DH Group 14 略低的安全性，但由于密钥较小，CPU 开销更低。对于许多场景仍被认为可接受。

DH 组 2（1024 位）——应谨慎使用，因为它在常用组中提供的安全性最低。尽管 CPU 需求较低，但随着计算能力提升，它更容易受到攻击。不要将其用于新部署。

为获得最佳安全性，应使用 **DH 组 19**。它通常被认为既快速又安全。通常应避免使用 DH 组 2，除非需要与旧设备兼容。

:::info
要计算适合你的网络基础设施的安全级别，首先确定所需的安全位数，并估算解密受保护数据应需要多长时间。根据这些要求，选择合适的算法。参考资料见 [https://www.keylength.com/en/4/](https://www.keylength.com/en/4/)。
:::

### IKE 流量 {#ike-traffic}

为避免 IKE 数据包命中某些 SPD 规则并需要用尚未建立的 SA 进行加密（该数据包可能正试图建立此 SA）而引发问题，本地发起的、UDP 源端口为 500 的数据包不会经过 SPD 处理。同样，要交付给本地的、UDP 目的端口为 500 的数据包也不会在入站策略检查中处理。

### 设置流程 {#setup-procedure}

要让 IPsec 使用 IKE-ISAKMP 自动生成密钥并正常工作，必须配置 policy、peer 和 proposal（可选）条目。

:::danger
IPsec 对时间变化非常敏感。如果 IPsec 隧道两端的时间同步不一致（例如，不同的 NTP 服务器未使用相同时间戳更新时间），隧道会中断，并且必须重新建立。
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
不支持 IKEv2 认证的 AES-GCM 加密。

**重要：** 如果将 IPsec 与证书 X.509 一起使用，证书必须包含 "SubjectKeyIdentifier" 扩展，该扩展仅在版本 3 中受支持。

**重要：** 不支持使用 ed25519 认证。
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

硬件加速通过 CPU 内置的加密引擎实现更快的加密。

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

只有源地址为 192.168.77.254/32 的数据包才匹配 IPsec 策略。要让本地网络访问远程子网，必须将本地主机的源地址改为动态分配的 mode config IP 地址。源 NAT 规则可以动态生成。创建一个新的地址列表，其中包含应应用 NAT 规则的所有本地网络。在本例中为 192.168.88.0/24。

```ros
/ip/firewall/address-list/add address=192.168.88.0/24 list=local-RW
```

在 mode-config 发起方配置下指定地址列表，会动态生成源 NAT 规则。

```ros
/ip/ipsec/mode-config/set [ find name="request-only" ] src-address-list=local-RW
```

当 IPsec 隧道建立后，会为每个网络显示动态创建的源 NAT 规则。现在 192.168.88.0/24 中的每台主机都可以访问 Office 的内部资源。

```ros
[admin@mikrotik] > ip firewall nat print 
Flags: X - disabled, I - invalid, D - dynamic 
0 D ;;; ipsec mode-config
chain=srcnat action=src-nat to-addresses=192.168.77.254 dst-address=192.168.55.0/24 src-address-list=local-RW

1 D ;;; ipsec mode-config
chain=srcnat action=src-nat to-addresses=192.168.77.254 dst-address=10.5.8.0/24 src-address-list=local-RW
```

### 仅允许 IPsec 封装流量 {#allow-only-ipsec-encapsulated-traffic}

在某些场景中，出于安全原因，如果传入/传出数据包未加密，你可能希望阻止对特定网络的访问。例如，如果你有 L2TP/IPsec 设置，可能希望丢弃未加密的 L2TP 连接尝试。

可以通过以下几种方式实现：

- 在防火墙中使用 IPsec 策略匹配器。
- 使用 action 设置为 **drop** 且优先级较低的通用 IPsec 策略（可用于会生成动态策略的 Road Warrior 设置）。
- 在 mangle 中设置 DSCP 或优先级，并在解封装后在防火墙中匹配相同的值。

#### IPsec 策略匹配器 {#ipsec-policy-matcher}

让我们设置一个 IPsec 策略匹配器，以接受与任何 IPsec 策略匹配的所有数据包，并丢弃其余数据包：

```ros
add chain=input comment="ipsec policy matcher" in-interface=WAN ipsec-policy=in,ipsec
add action=drop chain=input comment="drop all" in-interface=WAN log=yes
```

IPsec 策略匹配器接受两个参数 **direction、policy**。此示例使用入站方向和 IPsec 策略。IPsec 策略选项允许你在解封装后检查数据包，例如，仅允许来自特定源地址的 GRE 封装数据包并丢弃其余数据包：

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

此方法通过添加一个 action 为 drop 的默认策略来工作。此示例假设在公网地址 1.1.1.1 上有一个 L2TP/IPsec 服务器，并丢弃所有未加密的 L2TP：

```ros
/ip/ipsec/policy
add src-address=1.1.1.1 dst-address=0.0.0.0/0 sa-src-address=1.1.1.1 protocol=udp src-port=1701 tunnel=yes action=discard
```

路由器会丢弃任何未加密的 L2TP 入站流量，但在 L2TP/IPsec 连接成功后，会创建一个优先级高于默认静态规则的动态策略，匹配该动态规则的数据包可以被转发。

:::warning
策略顺序很重要！为此，请确保静态 drop 策略位于动态策略之下。如有必要，将其移到策略模板下方。
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

IPsec 与 RouterOS 中的任何其他服务一样，无论 Peer 配置使用什么 local-address 参数，都会使用主路由表。必须对 IKE 和 IPSec 流量都应用路由标记。

考虑以下示例。存在两条默认路由——一条在主路由表中，另一条在“backup”路由表中。必须为 IPsec 站点到站点隧道使用 backup 链路。

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

日志显示“phase1 negotiation failed due to time up”错误。这是因为 IPsec 尝试使用主路由表和错误的源地址到达远程对等方。必须使用 Mangle 标记 UDP/500、UDP/4500 和 ipsec-esp 数据包：

```ros
/ip/firewall/mangle
add action=mark-connection chain=output connection-mark=no-mark dst-address=10.155.130.136 dst-port=500,4500 new-connection-mark=ipsec passthrough=yes protocol=udp
add action=mark-connection chain=output connection-mark=no-mark dst-address=10.155.130.136 new-connection-mark=ipsec passthrough=yes protocol=ipsec-esp
add action=mark-routing chain=output connection-mark=ipsec new-routing-mark=backup passthrough=no
```

#### 使用同一路由表和多个 IP 地址 {#using-the-same-routing-table-with-multiple-ip-addresses}

考虑以下示例。公共接口上存在同一子网的多个 IP 地址。out-interface 上配置了伪装规则。必须显式使用其中一个 IP 地址。

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

阶段 1 连接使用的源地址与指定地址不同，日志中会显示“phase1 negotiation failed due to time up”错误。这是因为伪装正在更改连接的源地址，以匹配已连接路由的 pref-src 地址。请排除来自该公网 IP 地址的连接，使其不被伪装。

```ros
/ip/firewall/nat
add action=accept chain=srcnat protocol=udp src-port=500,4500 place-before=0
```

## 应用示例 {#application-examples}

### 站点到站点 IPsec (IKEv1) 隧道 {#site-to-site-ipsec-ikev1-tunnel}

考虑如下所示的设置。两个远程办公室路由器连接到 Internet，办公室工作站位于 NAT 之后。每个办公室都有自己的本地子网，Office1 为 10.1.202.0/24，Office2 为 10.1.101.0/24。两个远程办公室都需要通向路由器后方本地网络的安全隧道。

![](/img/e82d4ebd9d1188e7.webp)

#### **站点 1 配置** {#site-1-configuration}

首先创建新的阶段 1 profile 和阶段 2 proposal 条目，使用适合你需求的更强或更弱加密参数。应为每个菜单创建单独的条目，以便在以后需要调整任何设置时，每个 peer 都有唯一的条目。这些参数必须在各站点之间匹配，否则连接无法建立。

```ros
/ip/ipsec/profile
add dh-group=modp2048 enc-algorithm=aes-128 name=ike1-site2
/ip/ipsec/proposal
add enc-algorithms=aes-128-cbc name=ike1-site2 pfs-group=modp2048
```

继续配置 peer。指定远程路由器的地址。此地址应可通过 UDP/500 和 UDP/4500 端口访问，因此请确保针对路由器防火墙采取适当措施。还要指定此 peer 的名称以及新创建的 profile。

```ros
/ip/ipsec/peer
add address=192.168.80.1/32 name=ike1-site2 profile=ike1-site2
```

下一步是创建 identity。对于基本的使用预共享密钥保护的隧道，只需设置一个 **强** secret 以及此 identity 所适用的 peer。

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

此时如果尝试通过 IPsec 隧道发送流量，则无法工作；数据包会丢失。这是因为两台路由器都有 NAT 规则（伪装），会在数据包加密之前更改源地址。路由器无法加密该数据包，因为源地址与 policy 配置中指定的地址不匹配。更多信息请参阅 IPsec 数据包流示例。

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
如果你在添加 NAT 绕过规则之前尝试建立 IP 连接，则必须从连接表中清除现有连接，或重启两个路由器。
:::

确保绕过规则位于所有其他 NAT 规则之前。

另一个问题是，如果启用了 IP/Fasttrack，数据包会绕过 IPsec 策略。因此需要在 FastTrack 之前添加 accept 规则。

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

此示例说明当其中一个或两个站点没有静态 IP 地址时，如何在两台 RouterOS 设备之间建立安全且加密的 GRE 隧道。在此之前，必须为其中一台充当响应方（服务器）的设备分配 DNS 名称。为简单起见，此示例使用 RouterOS 内置的 DDNS 服务 IP/Cloud。

![](/img/a4224852afe39ede.webp)

#### 站点 1（服务器）配置 {#site-1-server-configuration}

此侧监听传入连接并充当响应方。使用 mode config 为第二个站点提供 IP 地址。首先，创建一个 loopback（空白）网桥，并为其分配一个稍后用于建立 GRE 隧道的 IP 地址。

```ros
/interface/bridge 
add name=loopback
/ip/address
add address=192.168.99.1 interface=loopback
```

继续配置 IPsec，首先创建新的阶段 1 profile 和阶段 2 proposal 条目，使用适合你需求的更强或更弱加密参数。此配置示例监听所有传入的 IKEv2 请求，这意味着该 profile 配置会在所有其他配置（例如 RoadWarrior）之间共享。

```ros
/ip/ipsec/profile
add dh-group=ecp256,modp2048,modp1024 enc-algorithm=aes-256,aes-192,aes-128 name=ike2
/ip/ipsec/proposal
add auth-algorithms=null enc-algorithms=aes-128-gcm name=ike2-gre pfs-group=none
```

接下来，创建一个 responder=yes 的新 mode config 条目。这会为另一站点提供 IP 配置，并为 policy 生成提供主机（loopback 地址）。

```ros
/ip/ipsec/mode-config
add address=192.168.99.2 address-prefix-length=32 name=ike2-gre split-include=192.168.99.1/32 system-dns=no
```

应创建一个新的策略组，将此配置与任何现有或未来的 IPsec 配置分开。

```ros
/ip/ipsec/policy/group
add name=ike2-gre
```

现在设置一个新的策略模板，匹配远程 peer 的新动态地址和 loopback 地址。

```ros
/ip/ipsec/policy
add dst-address=192.168.99.2/32 group=ike2-gre proposal=ike2-gre src-address=192.168.99.1/32 template=yes
```

下一步是创建监听所有 IKEv2 请求的 peer 配置。如果已有此类条目，可以跳过此步骤。

```ros
/ip/ipsec/peer
add exchange-mode=ike2 name=ike2 passive=yes profile=ike2
```

最后，设置一个 identity，通过使用特定 secret 的预共享密钥认证来匹配远程 peer。

```ros
/ip/ipsec/identity
add generate-policy=port-strict mode-config=ike2-gre peer=ike2 policy-template-group=ike2-gre secret=test
```

服务器端现在已配置完成，并监听所有 IKEv2 请求。确保防火墙没有阻止 UDP/4500 端口。

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

与服务器配置类似，首先创建新的阶段 1 profile 和阶段 2 proposal 配置。由于此站点是发起方，你可以使用更具体的 profile 配置来控制使用哪些确切的加密参数，只需确保它们与服务器端配置有重叠。

```ros
/ip/ipsec/profile
add dh-group=ecp256 enc-algorithm=aes-256 name=ike2-gre
/ip/ipsec/proposal
add auth-algorithms=null enc-algorithms=aes-128-gcm name=ike2-gre pfs-group=none
```

接下来，创建一个 responder=no 的新 mode config 条目。这会确保 peer 从服务器请求 IP 和拆分网络配置。

```ros
/ip/ipsec/mode-config
add name=ike2-gre responder=no
```

还应创建一个新的策略组，将此配置与任何现有或未来的 IPsec 配置分开。

```ros
/ip/ipsec/policy/group
add name=ike2-gre
```

同时在客户端侧创建新的策略模板。

```ros
/ip/ipsec/policy
add dst-address=192.168.99.1/32 group=ike2-gre proposal=ike2-gre src-address=192.168.99.2/32 template=yes
```

继续配置 peer。在 address 参数下指定服务器的 DNS 名称。也可以使用 IP 地址。

```ros
/ip/ipsec/peer
add address=n.mynetname.net exchange-mode=ike2 name=p1.ez profile=ike2-gre
```

最后，为新创建的 peer 创建 identity。

```ros
/ip/ipsec/identity
add generate-policy=port-strict mode-config=ike2-gre peer=p1.ez policy-template-group=ike2-gre secret=test
```

如果一切配置正确，会出现新的动态策略。

```ros
/ip/ipsec/policy/print 
Flags: T - template, X - disabled, D - dynamic, I - invalid, A - active, * - default 
0 T * group=default src-address=::/0 dst-address=::/0 protocol=all proposal=default template=yes

1 T group=ike2-gre src-address=192.168.99.2/32 dst-address=192.168.99.1/32 protocol=all proposal=ike2-gre template=yes

2 DA src-address=192.168.99.2/32 src-port=any dst-address=192.168.99.1/32 dst-port=any protocol=all action=encrypt level=unique ipsec-protocols=esp 
tunnel=yes sa-src-address=192.168.90.1 sa-dst-address=(current IP of n.mynetname.net) proposal=ike2-gre ph2-count=1 
```

现在两个站点之间已建立安全隧道，它会加密 192.168.99.2 \<=> 192.168.99.1 地址之间的所有流量。使用这些地址创建 GRE 隧道。

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

在配置 IPsec 之前，必须设置证书。你可以使用单独的 Certificate Authority 进行证书管理；但在本例中，自签名证书会在 RouterOS 的 System/Certificates 菜单中生成。要将各种设备连接到服务器，必须满足一些证书要求：

- common name 必须包含服务器的 IP 或 DNS 名称。
- SAN（subject alternative name）必须包含服务器的 IP 或 DNS 名称。
- 需要 EKU（extended key usage）tls-server 和 tls-client。

考虑到上述要求，生成 CA 和服务器证书：

```ros
/certificate
add common-name=ca name=ca
sign ca ca-crl-host=2.2.2.2
add common-name=2.2.2.2 subject-alt-name=IP:2.2.2.2 key-usage=tls-server name=server1
sign server1 ca=ca
```

在路由器上创建有效证书后，添加新的阶段 1 profile 和阶段 2 proposal 条目，并设置 pfs-group=none：

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

由于必须调整策略模板以仅允许特定网络策略，应创建一个单独的 policy group 和模板。

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

identity 菜单允许匹配特定远程 peer，并为每个 peer 分配不同配置。首先，创建一个默认 identity，接受所有 peer，但使用 peer 的证书验证其身份。

```ros
/ip/ipsec/identity
add auth-method=digital-signature certificate=server1 generate-policy=port-strict mode-config=ike2-conf peer=ike2 policy-template-group=ike2-policies
```

:::warning
如果 peer 的 ID（ID\_i）与其发送的证书不匹配，identity 查找会失败。请参阅 identities 部分中的 remote-id。
:::

例如，要为使用证书“rw-client1”向服务器认证的用户“A”分配不同的 mode config，首先确保已创建好供该特定用户使用的新 mode config。

```ros
/ip/ipsec/mode-config
add address=192.168.66.2 address-prefix-length=32 name=usr_A split-include=192.168.55.0/24 system-dns=no
```

使用 match-by=certificate 为用户“A”应用此配置，并通过 remote-certificate 指定证书。

```ros
/ip/ipsec/identity
add auth-method=digital-signature certificate=server1 generate-policy=port-strict match-by=certificate mode-config=usr_A peer=ike2 policy-template-group=ike2-policies remote-certificate=rw-client1
```

##### （可选）拆分隧道配置 {#optional-split-tunnel-configuration}

拆分隧道是一种方法，允许 road warrior 客户端仅访问特定的受保护网络，同时根据其内部路由表发送其余流量（而不是通过隧道发送所有流量）。要配置拆分隧道，请更改 mode config 参数。

例如，允许 road warrior 客户端仅访问 10.5.8.0/24 网络。

```ros
/ip/ipsec/mode-conf
set [find name="rw-conf"] split-include=10.5.8.0/24
```

还可以发送特定的 DNS 服务器供客户端使用。默认使用 system-dns=yes，这会发送路由器自身在 IP/DNS 中配置的 DNS 服务器。使用 static-dns 参数强制客户端使用不同的 DNS 服务器。

```ros
/ip/ipsec/mode-conf
set [find name="rw-conf"] system-dns=no static-dns=10.5.8.1
```

虽然可以调整 IPsec 策略模板，仅允许 road warrior 客户端为 split-include 参数配置的网络生成策略，但这会导致与不同厂商实现的兼容性问题（参见已知限制）。与其调整策略模板，不如在 IP/Firewall/Filter 中允许访问受保护网络，并丢弃其他所有流量。

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

PKCS12 包还包含 CA 证书，但某些厂商不会安装此 CA，因此必须单独以 PEM 格式导出自签名 CA 证书。

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

- Windows 总是忽略通过 split-include 收到的网络，并请求目的地址为 0.0.0.0/0（TSr）的策略。生成 IPsec-SA 后，Windows 会请求 DHCP option 249，RouterOS 会自动用配置的 split-include 网络进行响应。

- Apple macOS 和 iOS 都只接受第一个 split-include 网络。

- Apple macOS 和 iOS 仅在使用了 0.0.0.0/0 split-include 时，才使用 system-dns 和 static-dns 参数中的 DNS 服务器。

- 虽然某些实现可以在阶段 2 使用不同的 PFS 组，但请使用 proposal 下的 pfs-group=none 以避免任何兼容性问题。

#### RouterOS 客户端配置 {#routeros-client-configuration}

在 RouterOS 中导入 PKCS12 格式证书。

```ros
/certificate/import file-name=cert_export_RouterOS_client.p12 passphrase=1234567890
```

自签名 CA 证书和客户端证书现在会出现在 Certificate 菜单中。找到客户端证书的名称。

```ros
/certificate/print
```

**cert\_export\_RouterOS\_client.p12\_0** 是客户端证书。

应创建单独的阶段 1 profile 和阶段 2 proposal 配置，以免干扰任何现有 IPsec 配置。

```ros
/ip/ipsec/profile
add name=ike2-rw
/ip/ipsec/proposal
add name=ike2-rw pfs-group=none
```

虽然可以使用默认策略模板进行策略生成，但应创建新的策略组和模板，将此配置与任何其他 IPsec 配置分开。

```ros
/ip/ipsec/policy/group
add name=ike2-rw
/ip/ipsec/policy
add group=ike2-rw proposal=ike2-rw template=yes
```

创建一个 responder=no 的新 mode config 条目，从服务器请求配置参数。

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

生成的动态策略表明，只有具有特定（由 mode config 接收）源地址的流量才会通过隧道发送。在大多数情况下，路由器需要将特定设备或网络路由到隧道中。在这种情况下，使用源 NAT 将数据包的源地址改为与 mode config 地址匹配。由于 mode config 地址是动态的，无法创建静态源 NAT 规则。在 RouterOS 中，可以为 mode config 客户端生成动态源 NAT 规则。

![](/img/f2c4abd8b00ecd03.webp)

例如，本地网络 192.168.88.0/24 位于路由器之后，来自该网络的所有流量都应通过隧道发送。首先，创建一个包含该本地网络的新 IP/Firewall/Address list。

```ros
/ip/firewall/address-list
add address=192.168.88.0/24 list=local
```

完成后，将新创建的 IP/Firewall/Address list 分配给 mode config 配置。

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

在 Windows 计算机上打开 PKCS12 格式证书文件。按照说明安装证书。选择“本地计算机”存储位置。![](/img/7f0720a59f02c365.webp) 现在可以继续进入网络和 Internet 设置 -> VPN，并添加新配置。填写连接名称、服务器名称或地址参数。在 VPN 类型下选择 IKEv2。完成后，选择“使用计算机证书”。这可以在网络和共享中心中通过单击该 VPN 连接的“属性”菜单完成。该设置位于“安全”选项卡下。

![](/img/d60e9d2292526217.webp)

Windows 10 与以下阶段 1（profiles）和阶段 2（proposals）proposal 集兼容：

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

在 macOS 计算机上打开 PKCS12 格式证书文件，并将证书安装到“系统”钥匙串。由于 CA 证书是自签名的，请手动将其标记为受信任。在 macOS 钥匙串访问 App 的“系统”标签页中找到该证书，并将其标记为“始终信任”。

![](/img/ae8f9610163925e0.webp)

现在可以转到 System Preferences -> Network，并单击 + 按钮添加新配置。选择 Interface: VPN、VPN Type: IKEv2，并为连接命名。Remote ID 必须设置为等于服务器证书的 common-name 或 subjAltName。Local ID 可以留空。在 Authentication Settings 下选择 None，并选择客户端证书。现在可以测试连接。

![](/img/98ab138f5ea6d75a.webp)

macOS 与以下阶段 1（profiles）和阶段 2（proposals）proposal 集兼容：

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

通常，PKCS12 包还包含 CA 证书，但 iOS 不会安装此 CA，因此必须单独以 PEM 格式安装自签名 CA 证书。在 iOS 设备上打开这些文件，并按照说明安装两个证书。在 iOS 设备上将自签名 CA 证书标记为受信任。这可以在“设置”->“通用”->“关于本机”->“证书信任设置”菜单中完成。完成后，在“设置”->“通用”->“描述文件”菜单下检查两个证书是否都标记为“已验证”。

![](/img/b5ea33be6cc87db1.webp)

现在可以转到 Settings -> General -> VPN 菜单并添加新配置。Remote ID 必须设置为等于服务器证书的 common-name 或 subjAltName。Local ID 可以留空。

![](/img/a0ba071bd82f918b.webp)

iOS 与以下阶段 1（profiles）和阶段 2（proposals）proposal 集兼容：

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

Android 没有原生 IKEv2 支持，但可以使用 Google Play 商店中的 strongSwan，它为 Android 带来 IKEv2。strongSwan 接受 PKCS12 格式证书，因此在 strongSwan 中设置 VPN 连接之前，请将 PKCS12 包下载到 Android 设备。完成后，在 strongSwan 中创建新的 VPN 配置文件，输入服务器 IP，并选择“IKEv2 Certificate”作为 VPN 类型。选择用户证书时，按“安装”，并按照证书提取过程指定 PKCS12 包。保存配置文件，并通过按 VPN 配置文件测试连接。

![](/img/f1154362a91b750c.webp)

可以通过勾选“显示高级设置”复选框，在 strongSwan 中指定自定义加密设置。strongSwan 默认与以下阶段 1（profiles）和阶段 2（proposals）proposal 集兼容：

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

此示例说明如何在连接到互联网的设备（road warrior 客户端）与运行 RouterOS 并充当 IKEv2 服务器和 User Manager 的设备之间建立安全的 IPsec 连接。可以在网络中的单独设备上运行 User Manager，但在本例中，User Manager 和 IKEv2 服务器都配置在同一设备（Office）上。

![](/img/15261a1aca9285d4.webp)

#### RouterOS 服务器配置 {#routeros-server-configuration-1}

##### 要求 {#requirements}

要使此设置正常工作，必须满足以下前提条件：

1. 路由器的 IP 地址必须有有效的公网 DNS 记录——IP Cloud 可以提供该记录。
2. 路由器必须可通过互联网上的 TCP/80 端口访问——如果服务器位于 NAT 之后，请配置端口转发。
3. 路由器上必须安装 User Manager 包。

##### 生成 Let's Encrypt 证书 {#generating-lets-encrypt-certificate}

EAP-MSCHAPv2 认证需要 TLS 握手，因此服务器必须具有客户端可以验证的证书。为简化此步骤，请使用大多数操作系统无需用户干预即可验证的 Let's Encrypt 证书。要生成证书，请在 Certificates 菜单下启用 SSL 证书。默认情况下，该命令使用 IP Cloud 提供的动态 DNS 记录，但也可以指定自定义 DNS 名称。DNS 记录应指向该路由器。

```ros
/certificate/enable-ssl-certificate
```

如果证书生成成功，Let's Encrypt 证书会显示已安装在 Certificates 菜单下。

```ros
/certificate/print detail where name~"letsencrypt"
```

##### 配置 User Manager {#configuring-user-manager}

首先，允许来自 localhost（路由器本身）的 RADIUS 请求：

```ros
/user-manager/router
add address=127.0.0.1 comment=localhost name=local shared-secret=test
```

启用 User Manager，并指定用于认证用户的 Let's Encrypt 证书（将证书名称替换为你设备上安装的证书名称）。

```ros
/user-manager
set certificate="letsencrypt_2021-04-09T07:10:55Z" enabled=yes
```

最后，添加用户及其凭据，供客户端向服务器认证时使用。

```ros
/user-manager/user
add name=user1 password=password
```

##### 配置 RADIUS 客户端 {#configuring-radius-client}

要让路由器使用 RADIUS 服务器进行用户认证，必须添加新的 RADIUS 客户端，其共享密钥与 User Manager 上已配置的相同。

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

由于必须调整策略模板以仅允许特定网络策略，应创建一个单独的 policy group 和模板。

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

最后，创建新的 IPsec identity 条目，匹配所有尝试使用 EAP 认证的客户端。必须指定生成的 Let's Encrypt 证书。

```ros
/ip/ipsec/identity
add auth-method=eap-radius certificate="letsencrypt_2021-04-09T07:10:55Z" generate-policy=port-strict mode-config=ike2-conf peer=ike2 \
policy-template-group=ike2-policies
```

##### （可选）拆分隧道配置 {#optional-split-tunnel-configuration-1}

拆分隧道是一种方法，允许 road warrior 客户端仅访问特定的受保护网络，同时根据其内部路由表发送其余流量（而不是通过隧道发送所有流量）。要配置拆分隧道，请更改 mode config 参数。

例如，允许 road warrior 客户端仅访问 10.5.8.0/24 网络。

```ros
/ip/ipsec/mode-conf
set [find name="rw-conf"] split-include=10.5.8.0/24
```

还可以发送特定的 DNS 服务器供客户端使用。默认使用 system-dns=yes，这会发送路由器自身在 IP/DNS 中配置的 DNS 服务器。使用 static-dns 参数强制客户端使用不同的 DNS 服务器。

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

要跟踪每个用户的运行时间、下载和上传统计信息，可以使用 RADIUS accounting。默认情况下，IPsec 的 RADIUS accounting 已启用，但应配置 Interim Update 计时器，以定期向 RADIUS 服务器发送统计信息。如果路由器处理许多并发会话，请增加更新计时器以避免 CPU 使用率过高。

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

这会启用 L2TP 服务器，并使用指定的 secret 创建动态 IPsec peer。

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

这会自动创建动态 IPsec peer 和 policy 配置。

### 使用 XFRM 接口的基于路由的 IPsec {#route-based-ipsec-with-xfrm-interfaces}

基于策略的 IPsec 通过策略中的源地址和目的地址选择流量。XFRM 接口增加了基于路由的模式：IPsec 策略组绑定到虚拟接口，流量被路由到该接口，而不是仅由策略选择器匹配。这样可以运行基于隧道的动态路由协议，并使用路由表决定哪些流量进入隧道。

XFRM 接口是其组内策略的隧道端点；使用 [`/interface/xfrm`](../../cli-reference/interface/xfrm.md) 进行配置。它的行为类似于常规接口：具有 IP 地址、最大传输单元和运行状态。当使用该接口的 IPsec SA 建立后，会显示 running 标志。

考虑两台路由器通过 IPsec 隧道连接的设置。R1 使用 underlay 地址 203.0.113.1、LAN 192.168.51.0/28 和 XFRM 地址 192.168.50.1/24。R2 使用 underlay 地址 203.0.113.2、LAN 192.168.52.0/28 和 XFRM 地址 192.168.50.2/24。R1 发起连接，R2 是响应方。请将地址和预共享密钥替换为你自己的值。

#### 使用场景 {#use-cases}

- 基于 IPsec 的动态路由：分支机构有多个 LAN，并会随着时间增加新子网。使用基于策略的 IPsec 时，每对本地和远程子网都需要自己的策略。使用 XFRM 接口时，分支机构通过隧道运行 OSPF，并通过 `xfrm1` 路由总部网络；无需添加 IPsec 策略即可通告和访问新子网。
- 多 WAN 和策略路由：由于隧道是一条路由，可以使用路由标记或 VRF 将选定流量引导到 `xfrm1`，并且隧道可以在 WAN 链路之间故障转移，而无需更改 IPsec 策略。

#### R1 配置 {#r1-configuration}

首先创建本地网桥、XFRM 接口及其 IP 地址：

```ros
/interface/bridge
add name=lan
/interface/xfrm
add name=xfrm1
/ip/address
add address=192.168.51.1/28 interface=lan
add address=192.168.50.1/24 interface=xfrm1
```

创建阶段 1 profile 和阶段 2 proposal 条目。这些参数必须在两台路由器上匹配：

```ros
/ip/ipsec/profile
add name=xfrm-example hash-algorithm=sha256 enc-algorithm=aes-256 dh-group=modp2048
/ip/ipsec/proposal
add name=xfrm-example auth-algorithms=sha256 enc-algorithms=aes-256-cbc pfs-group=none
```

创建一个专用策略组，并将其绑定到 XFRM 接口。专用组可将这些策略与路由器上的其他 IPsec 策略分开：

```ros
/ip/ipsec/policy/group
add name=xfrm1-group interface=xfrm1
```

配置 peer 和 identity。identity 必须使用与其 `policy-template-group` 相同的策略组：

```ros
/ip/ipsec/peer
add name=xfrm-example address=203.0.113.2/32 local-address=203.0.113.1 exchange-mode=ike2 profile=xfrm-example
/ip/ipsec/identity
add peer=xfrm-example auth-method=pre-shared-key secret=example-secret generate-policy=port-strict policy-template-group=xfrm1-group
```

添加用于 LAN 到 LAN 流量的策略，并通过该接口路由远程 LAN：

```ros
/ip/ipsec/policy
add peer=xfrm-example group=xfrm1-group tunnel=yes src-address=192.168.51.0/28 dst-address=192.168.52.0/28 protocol=all action=encrypt level=require proposal=xfrm-example
/ip/route
add dst-address=192.168.52.0/28 gateway=xfrm1
```

#### R2 配置 {#r2-configuration}

R2 上的配置与 R1 对应。创建网桥、XFRM 接口及其 IP 地址：

```ros
/interface/bridge
add name=lan
/interface/xfrm
add name=xfrm1
/ip/address
add address=192.168.52.1/28 interface=lan
add address=192.168.50.2/24 interface=xfrm1
```

创建相同的 profile 和 proposal：

```ros
/ip/ipsec/profile
add name=xfrm-example hash-algorithm=sha256 enc-algorithm=aes-256 dh-group=modp2048
/ip/ipsec/proposal
add name=xfrm-example auth-algorithms=sha256 enc-algorithms=aes-256-cbc pfs-group=none
```

创建策略组、peer 和 identity：

```ros
/ip/ipsec/policy/group
add name=xfrm1-group interface=xfrm1
/ip/ipsec/peer
add name=xfrm-example address=203.0.113.1/32 local-address=203.0.113.2 exchange-mode=ike2 passive=yes profile=xfrm-example
/ip/ipsec/identity
add peer=xfrm-example auth-method=pre-shared-key secret=example-secret generate-policy=port-strict policy-template-group=xfrm1-group
```

添加策略和路由：

```ros
/ip/ipsec/policy
add peer=xfrm-example group=xfrm1-group tunnel=yes src-address=192.168.52.0/28 dst-address=192.168.51.0/28 protocol=all action=encrypt level=require proposal=xfrm-example
/ip/route
add dst-address=192.168.51.0/28 gateway=xfrm1
```

#### 验证 {#verification}

检查 XFRM 接口是否正在运行：

```ros
/interface/xfrm/print
```

`R` 标志会在 IPsec SA 建立后出现。在此之前，分配给该接口的 IP 地址会显示为无效。

检查策略和活动 peer：

```ros
/ip/ipsec/policy/print detail
/ip/ipsec/active-peers/print detail
```

活动策略会显示 `active-interface=xfrm1` 和 `ph2-state=established`。通过 ping 远程 LAN 测试隧道：

```ros
/ping 192.168.52.1 src-address=192.168.51.1
```

#### MTU {#mtu}

`mtu` 属性设置 XFRM 接口的第 3 层 MTU。默认值为 `1400` 字节，这为 ESP 开销留出了空间。只读的 `actual-mtu` 属性报告正在使用的值。对 `mtu` 的更改会立即生效。使用 `/interface print detail` 验证有效值；如果 `actual-mtu` 与配置值不匹配，请再次设置 `mtu`。

#### 基于 XFRM 的 OSPF {#ospf-over-xfrm}

OSPF 可以通过 XFRM 接口运行。IPsec 策略必须匹配 OSPF 流量，包括组播 hello，因此在 XFRM 组中将 LAN 到 LAN 策略替换为 catch-all 策略。两台路由器还必须使用相同的有效 MTU；MTU 不匹配会使 OSPF 邻居保持在 `ExStart`。

在 R1 上，替换策略并添加 OSPF 配置：

```ros
/ip/ipsec/policy
remove [find peer=xfrm-example]
add peer=xfrm-example group=xfrm1-group tunnel=yes src-address=0.0.0.0/0 dst-address=0.0.0.0/0 protocol=all action=encrypt level=require proposal=xfrm-example

/routing/ospf/instance
add name=xfrm-ospf version=2 router-id=192.168.50.1
/routing/ospf/area
add name=backbone instance=xfrm-ospf area-id=0.0.0.0
/routing/ospf/interface-template
add interfaces=xfrm1 area=backbone type=ptp
add networks=192.168.51.0/28 area=backbone
```

在 R2 上，使用 R2 的 router ID 和 LAN 网络进行相同配置：

```ros
/ip/ipsec/policy
remove [find peer=xfrm-example]
add peer=xfrm-example group=xfrm1-group tunnel=yes src-address=0.0.0.0/0 dst-address=0.0.0.0/0 protocol=all action=encrypt level=require proposal=xfrm-example

/routing/ospf/instance
add name=xfrm-ospf version=2 router-id=192.168.50.2
/routing/ospf/area
add name=backbone instance=xfrm-ospf area-id=0.0.0.0
/routing/ospf/interface-template
add interfaces=xfrm1 area=backbone type=ptp
add networks=192.168.52.0/28 area=backbone
```

检查邻居状态：

```ros
/routing/ospf/neighbor/print
```

:::warning
XFRM 接口必须正在运行，流量才能通过它。如果 SA 建立后接口仍未启动，请重新创建接口或重启路由器。
:::

:::info
一个策略组只能绑定到一个 XFRM 接口。当你使用专用组时，将该身份的 `policy-template-group` 设置为该组，以便为该组中的策略创建 Phase 2 SA。

示例使用预共享密钥。在生产环境中使用证书认证。
:::

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

对等方之间存在通信问题。可能原因包括——阶段 1 IP 地址配置错误；防火墙阻止 UDP 端口 500 和 4500；对等方之间的 NAT 未正确转换 IPsec 协商数据包。当 local-address 参数使用不当时，也可能出现此错误消息。

#### 随机丢包或隧道连接非常慢，启用数据包嗅探器/torch 后问题解决？ {#random-packet-drops-or-connections-over-the-tunnel-are-very-slow-enabling-packet-sniffertorch-fixes-the-problem}

问题在于，数据包在封装之前被发送到 Fasttrack/FastPath，从而绕过 IPsec 策略检查。解决方案是将需要封装/解封装的流量从 Fasttrack 中排除。

#### 如何启用 ike2？ {#how-to-enable-ike2}

要为基本配置启用 ike2，请将 peer 设置中的 exchange-mode 更改为 ike2。

#### 致命的 NO-PROPOSAL-CHOSEN 通知消息？ {#fatal-no-proposal-chosen-notify-message}

远程对等体发送了一个通知，表示它无法接受提议的算法。要查找问题的确切原因，请查看远程对等体的调试日志或配置，并验证客户端和服务器是否具有相同的算法集。

#### 我只能在一个方向 ping 通？ {#i-can-ping-only-in-one-direction}

此类情况下的典型问题是严格的防火墙：防火墙规则仅允许在一个方向上创建新连接。解决方案是重新检查防火墙规则，或显式接受所有应封装/解封装流量。

#### 我可以仅允许加密流量吗？ {#can-i-allow-only-encrypted-traffic}

可以，请参见“仅允许 IPsec 封装流量”示例。

#### 我在 StrongSwan 上启用 IKEv2 REAUTH 并收到错误 'initiator did not reauthenticate as requested' {#i-enable-ikev2-reauth-on-strongswan-and-got-the-error-initiator-did-not-reauthenticate-as-requested}

RouterOS 不支持 rfc4478，必须在 StrongSwan 上禁用 reauth。

#### XFRM 接口无法启动 {#xfrm-interface-does-not-come-up}

`R` 标志仅在使用该接口的 IPsec SA 建立后出现。如果 SA 已建立但接口仍处于 down 状态，请重新创建接口或重启路由器。在接口运行之前，接口上的 IP 地址会显示为无效。

#### XFRM 策略一直处于 no-phase2 {#xfrm-policy-stays-in-no-phase2}

检查策略组是否绑定到 XFRM 接口，identity 是否使用与其 `policy-template-group` 相同的组，以及流量是否通过 XFRM 接口路由。如果使用默认策略组，请检查该组中没有其他策略覆盖此流量。

#### 基于 XFRM 的 OSPF 一直处于 ExStart {#ospf-over-xfrm-stays-in-exstart}

两侧的 XFRM 接口必须使用相同的有效 MTU。在两台路由器上使用 `/interface print detail` 检查 `actual-mtu`，如果值不同，请再次设置 `mtu`。MTU 不匹配会阻止 OSPF 数据库描述交换完成。
