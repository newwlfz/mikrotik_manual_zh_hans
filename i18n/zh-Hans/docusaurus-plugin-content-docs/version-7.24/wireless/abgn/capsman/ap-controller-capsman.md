---
title: "AP 控制器（CAPsMAN）"
description: "CAPsMAN（Controlled Access Point System Manager）通过允许 RouterOS 服务器配置多个接入点来集中管理无线网络，并处理客户端身份验证和数据转发。它支持无限数量的 CAP，但受特定硬件限制约束，使用 DTLS 保护管理连接，并提供集中式或本地数据转发选项。"
tags:
  - 'capsman'
  - 'wireless-management'
  - 'dtls'
source: https://manual.mikrotik.com/docs/7.24/wireless/abgn/capsman/ap-controller-capsman
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "wireless/abgn/capsman"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

:::info
本页介绍适用于运行 `wireless` 软件包（`/interface/wireless`）设备的旧版 CAPsMAN（`/caps-man`）。如果设备使用 `/interface/wifi` 菜单（`wifi-qcom` / `wifi-qcom-ac` 软件包），请参阅 [WiFi CAPsMAN](/docs/wireless/wifi/capsman)。
:::

---

CAPsMAN 允许通过集中配置接口将无线设置应用到多台 MikroTik AP 设备。

更具体地说，Controlled Access Point system Manager（CAPsMAN）可以集中管理无线网络，并在必要时集中处理数据。使用 CAPsMAN 功能时，网络由多个提供无线连接的“Controlled Access Point”（CAP）以及一个管理 AP 配置的“system Manager”（CAPsMAN）组成。它还负责客户端认证，并可选择性地负责数据转发。

当 CAP 由 CAPsMAN 控制时，它只需要允许其与 CAPsMAN 建立连接所需的最少配置。传统上由 AP 执行的功能（如访问控制、客户端认证）现在由 CAPsMAN 执行。CAP 设备现在只需提供无线链路层加密/解密。

根据配置，数据要么转发到 CAPsMAN 进行集中处理（*默认*），要么在 CAP 本地转发（本地转发模式）。

## 要求 {#requirements}

- 任何 RouterOS 设备都可以作为受控无线接入点（CAP），前提是该设备至少具有 Level 4 RouterOS 许可证。
- CAPsMAN server 可以安装在任何 RouterOS 设备上，即使该设备本身没有无线接口。
- CAPsMAN 支持无限数量的 CAP（接入点）。
- 每个 CAP 最多支持 32 个 Radio。
- 每个主 Radio 接口最多支持 32 个虚拟接口。
- 无法使用 Nv2 和 NStreme 专有协议。

---

## CAPsMAN 系统的简单设置 {#simple-setup-of-a-capsman-system}

![](/img/24386f7736bf211a.webp)

在深入介绍 CAPsMAN 工作原理的细节之前，先快速说明如何设置最基本的系统：一台 MikroTik 路由器管理两台 MikroTik AP 设备。CAPsMAN 的优势在于无需配置 CAP 设备；所有设置都在 CAPsMAN server 中完成。

CAPsMAN 设置包括定义配置模板，随后将这些模板下发到受控 AP 设备（CAP）。假设主路由器已连接到互联网并且工作正常，可以按以下步骤操作。

在将作为 CAPsMAN server 的中心设备上，创建一个新的“Configuration”模板，仅包含基本设置（网络名称、国家、本地 LAN 网桥接口、无线密码）：

![](/img/7c8e743432e137ce.webp)Add a new configuration profile:
![](/img/93fa941161ea2b1a.webp)
![](/img/78b31855d8f3b0d5.webp)

然后创建一条新的“Provisioning”规则，将创建的配置模板分配给 CAP 设备：

![](/img/b976b0971eb21c10.webp)

在 CAPsMAN 上只需启用它：

![](/img/69dbb61f857cb034.webp)

大多数 MikroTik AP 设备开箱即支持 CAP 模式，只需确保它们与 CAPsMAN 位于同一网络，然后在按住 reset 按钮的同时启动设备。

例如，在 CAP 设备断电时，将其连接到 CAPsMAN 设备的一个 LAN 端口，然后按住重置按钮，并给 CAP 设备上电。持续按住按钮，直到 User LED 常亮，然后松开以启用 CAP 模式。设备现在将查找 CAPsMAN 服务器（按住按钮的总时间约为 10 秒）。

设备现在将显示在 CAPsMAN 的“Remote CAP”菜单中，并将根据配置设置使用配置模板进行“provisioned”。有关如何手动调整所有设置的更多详情，请继续阅读本文档。

### CAP 到 CAPsMAN 的连接 {#cap-to-capsman-connection}

要使 CAPsMAN 系统正常运行并提供无线连接，CAP 必须与 CAPsMAN 建立管理连接。管理连接可以使用 MAC 或 IP 层协议建立，并使用“DTLS”进行保护。

CAP 也可以将客户端数据连接传递给 Manager，但数据连接不受保护。如果认为有必要，则需要使用其他数据安全手段，例如 IPSec 或加密隧道。

CAP 到 CAPsMAN 的连接可以使用 2 种传输协议建立（通过 Layer 2 和 Layer 3）。

- MAC 层连接功能：
  - CAP 上无需 IP 配置。
  - CAP 和 CAPsMAN 必须位于同一 Layer 2 网段，可以是物理网段，也可以是虚拟网段（通过 L2 隧道）。
- IP 层（UDP）连接功能：
  - 必要时可以穿越 NAT。
  - CAP 必须能够使用 IP 协议访问 CAPsMAN。
  - 如果 CAP 与 CAPsMAN 不在同一 L2 网段，则必须为 CAP 配置 CAPsMAN IP 地址，因为基于 IP 组播的发现无法跨 Layer 3 工作。

为了与 CAPsMAN 建立连接，CAP 会执行发现过程。在发现期间，CAP 尝试联系 CAPsMAN，并构建可用的 CAPsMAN 列表。CAP 使用以下方式尝试联系可用的 CAPsMAN：

- 已配置的 Manager IP 地址列表。
- 从 DHCP 服务器获取的 CAPsMAN IP 地址列表。
- 在配置的接口上同时使用 IP 层和 MAC 层协议进行广播。

当可用 CAPsMAN 列表构建完成后，CAP 会根据以下规则选择 CAPsMAN：

- 如果 **caps-man-names** 参数指定了允许的 Manager 名称（CAPsMAN 的 `/system/identity`），CAP 会优先选择列表中靠前的 CAPsMAN；如果列表为空，它将连接到任意可用的 Manager。
- 具有 MAC 层连接条件的合适 Manager 优先于具有 IP 连接条件的 Manager。

选择 Manager 后，CAP 会尝试建立 DTLS 连接。可能的认证模式如下：

- CAP 和 CAPsMAN 上都没有证书——不进行认证。
- 仅 Manager 配置了证书——CAP 会检查 CAPsMAN 证书，但如果没有相应的受信任 CA 证书，也不会失败；CAPsMAN 必须配置 **require-peer-certificate=no**，才能与没有证书的 CAP 建立连接。
- CAP 和 CAPsMAN 都配置了证书——双向认证。

DTLS 连接建立后，CAP 可以选择检查 CAPsMAN 提供的证书中的 CommonName 字段。**caps-man-certificate-common-names** 参数包含允许的 CommonName 值列表。如果该列表不为空，则必须为 CAPsMAN 配置证书。如果该列表为空，CAP 不会检查 CommonName 字段。

如果 CAPsMAN 或 CAP 与网络断开连接，CAP 和 CAPsMAN 之间的连接中断将在大约 10-20 秒内被检测到。

#### CAP 自动锁定到 CAPsMAN {#cap-auto-locking-to-capsman}

CAP 可配置为自动锁定到特定 CAPsMAN 服务器。锁定通过记录 CAP 所锁定到的 CAPsMAN 的证书 CommonName，并在后续所有连接中检查该 CommonName 来实现。由于此功能基于证书 CommonName 实现，因此必须使用证书，锁定才能生效。

通过以下命令启用锁定：

```
[admin@CAP] > /interface/wireless/cap/set lock-to-caps-man=yes
```

一旦 CAP 连接到合适的 CAPsMAN 并锁定到该服务器，将显示如下：

```
[admin@wtp] > /interface/wireless/cap/print
...
        locked-caps-man-common-name: CAPsMAN-000C424C30F3
```

从现在起，CAP 只会连接到具有该 CommonName 的 CAPsMAN，直到通过设置 **lock-to-caps-man=no** 清除锁定要求。如果需要强制 CAP 锁定到另一个 CAPsMAN，请使用此方法：先设置 **lock-to-caps-man=no**，再设置 **lock-to-caps-man=yes**。

请注意，可以通过设置 **caps-man-certificate-common-names** 将 CAP 手动“锁定”到 CAPsMAN。

#### 自动证书 {#auto-certificates}

为简化需要证书时的 CAPsMAN 和 CAP 配置（例如用于自动锁定功能），可将 CAPsMAN 配置为自动生成所需证书，并将 CAP 配置为向 CAPsMAN 请求证书。

**自动证书不提供完整的公钥基础设施**，仅用于简单部署。如果需要更复杂的 PKI，例如支持正确的证书有效期、多级 CA 证书、证书续订，则必须使用其他方式，例如手动分发证书或 SCEP。

CAPsMAN 具有以下证书设置：

- **certificate** - 这是 CAPsMAN 证书，该证书必须有可用的私钥。如果设置为 **none**，CAPsMAN 将以无证书模式运行，所有需要证书的功能都将无法工作。如果设置为 **auto**，CAPsMAN 将尝试使用 CA 证书为自己签发证书（请参阅 **ca-certificate** 说明）。请注意，自动签发证书的 CommonName 将为 `CAPsMAN-<mac address>`，有效期与 CA 证书相同。
- **ca-certificate** - 这是 CAPsMAN 在必要时为自己签发证书（请参阅 **certificate** 说明）以及签署来自 CAP 的证书请求时使用的 CA 证书。如果设置为 **none**，CAPsMAN 将无法为自己签发证书，也无法签署来自 CAP 的证书请求。如果设置为 **auto**，CAPsMAN 将生成一个自签名 CA 证书作为 CA 证书。该证书的 CommonName 将采用 `CAPsMAN-CA-<mac address>` 形式，有效期为 1970-01-01 至 2038-01-18。

当 CAPsMAN 自动生成证书时，将显示如下：

```
[admin@CM] /caps-man/manager> pr
                   enabled: yes
               certificate: auto
            ca-certificate: auto
  require-peer-certificate: no
     generated-certificate: CAPsMAN-000C424C30F3
  generated-ca-certificate: CAPsMAN-CA-000C424C30F3
```

以及证书：

```
[admin@CM] /certificate> print detail
Flags: K - private-key, D - dsa, L - crl, C - smart-card-key, 
A - authority, I - issued, R - revoked, E - expired, T - trusted 
 0 K   A T name="CAPsMAN-CA-000C424C30F3" common-name="CAPsMAN-CA-000C424C30F3" key-size=2048 
           days-valid=24854 trusted=yes 
           key-usage=digital-signature,key-encipherment,data-encipherment,key-cert-sign,crl-sign 
           serial-number="1" fingerprint="69d77bbb45c50afd2d6c1785c2a3d72596b8a5f6" 
           invalid-before=1970-01-01 00:00:01 invalid-after=2038-01-18 03:14:07 

 1 K   I   name="CAPsMAN-000C424C30F3" common-name="CAPsMAN-000C424C30F3" key-size=2048 
           days-valid=24854 trusted=no key-usage=digital-signature,key-encipherment 
           ca=CAPsMAN-CA-000C424C30F3 serial-number="1" 
           fingerprint="e853ddb9d41fc139083a176ab164331bc24bc5ed" 
           invalid-before=1970-01-01 00:00:01 invalid-after=2038-01-18 03:14:07 
```

可以将 CAP 配置为向 CAPsMAN 请求证书。要使此功能正常工作，必须为 CAP 配置 **certificate=request** 设置，并且 CAPsMAN 必须有可用的 CA 证书（在 **ca-certificate** 设置中指定或自动生成）。

CAP 将首先生成一个私钥和一个 CommonName 采用 `CAP-<mac address>` 形式的证书请求。当 CAP 与 CAPsMAN 建立连接时，CAP 将请求 CAPsMAN 签署其证书请求。如果成功，CAPsMAN 将向 CAP 发送 CA 证书和新签发的证书。CAP 会将这些证书导入其证书存储：

```
[admin@CAP] > /interface/wireless/cap/print
...
              requested-certificate: cert_2
        locked-caps-man-common-name: CAPsMAN-000C424C30F3
[admin@CAP] > /certificate/print detail 
Flags: K - private-key, D - dsa, L - crl, C - smart-card-key, 
A - authority, I - issued, R - revoked, E - expired, T - trusted 
 0       T name="cert_1" issuer=CN=CAPsMAN-CA-000C424C30F3 common-name="CAPsMAN-CA-000C424C30F3" 
            key-size=2048 days-valid=24837 trusted=yes 
            key-usage=digital-signature,key-encipherment,data-encipherment,key-cert-sign,crl-sign 
            serial-number="1" fingerprint="69d77bbb45c50afd2d6c1785c2a3d72596b8a5f6" 
            invalid-before=1970-01-01 00:00:01 invalid-after=2038-01-18 03:14:07 

 1 K     T name="cert_2" issuer=CN=CAPsMAN-CA-000C424C30F3 common-name="CAP-000C4200C032" 
            key-size=2048 days-valid=24837 trusted=yes 
            key-usage=digital-signature,key-encipherment serial-number="2" 
            fingerprint="2c85bf2fbc9fc0832e47cd2773a6f4b6af35ef65" 
            invalid-before=1970-01-01 00:00:01 invalid-after=2038-01-18 03:14:07 
```

在后续连接到 CAPsMAN 时，CAP 将使用生成的证书。

---

## CAP 配置 {#cap-configuration}

当 AP 配置为由 CAPsMAN 控制时，AP 上受管无线接口的配置将被忽略 *（例外：antenna-gain、antenna-mode）*。AP 会改为接受来自 CAPsMAN 的受管接口配置。

:::warning
由 CAPsMAN 管理且流量被转发到 CAPsMAN 的 CAP 无线接口（即不处于 *local forwarding* 模式）显示为 *disabled*，并带有注释 **Managed by CAPsMAN**。处于 *local forwarding* 模式的接口（流量由 CAP 本地管理，仅管理由 CAPsMAN 完成）不会显示为 disabled，但会显示注释 **Managed by CAPsMAN**
:::

AP 的 CAP 行为在 `/interface/wireless/cap` 菜单中配置。在此可以：

- 禁用或启用设备上的 CAP 功能。
- 设置由 Manager 控制的无线接口列表。
- 设置 CAP 尝试发现 Manager 所使用的接口列表。
- 设置 CAP 在发现过程中尝试联系的 Manager IP 地址列表。
- 设置 CAP 尝试连接的 Manager 名称列表。
- 设置 CAP 要连接的 Manager 证书 CommonNames 列表。
- 设置使用 local forwarding 模式时接口应加入的网桥。

CAP 上每个受 CAPsMAN 控制的无线接口都会在 CAPsMAN 上显示为一个虚拟接口。这可通过路由、网桥、防火墙等常规 RouterOS 功能，为数据转发控制提供最大灵活性。

## CAPsMAN 配置概念 {#capsman-configuration-concepts}

许多无线接口设置可以分组为命名组（“profiles”），以简化配置复用。例如，可在“configuration profile”中配置通用设置，然后让多个接口引用该 profile。同时，任何 profile 设置都可以直接在接口配置中覆盖，以提供最大灵活性。

当前有以下设置组：

- channel - 与信道相关的设置，例如频率和带宽。
- datapath - 与数据转发相关的设置，例如特定接口应自动添加为端口的网桥。
- security - 与安全相关的设置，例如允许的认证类型或口令。
- configuration - 主要无线设置组，包含 SSID 等设置，并且还会将其他设置组绑定在一起，也就是说，configuration profile 可以引用 channel、security 等命名设置组。此外，任何设置都可以直接在 configuration profile 中覆盖。

接口设置会将所有设置组绑定在一起，但任何设置也可以直接在接口设置中覆盖。

通过设置组，配置以接口（配置的实际使用者）为根组织成层次结构。要确定某项设置的有效值，会按该结构进行查询，其中较高层级的设置值会覆盖较低层级的值。

例如，当需要查找某个接口要使用的 WPA2 口令时，会查询以下位置，第一个配置了 WPA2 口令的位置将指定有效口令。“->”表示引用设置 profile（如果已配置）：

- 接口 passphrase
- interface->security passphrase
- interface->configuration passphrase
- interface->configuration->security passphrase

CAPsMAN 上有两种接口类型：“master”和“slave”。master 接口保存实际无线接口（radio）的配置，而 slave 接口链接到 master 接口，用于保存 Virtual-AP 的配置（支持多个 SSID）。有些设置仅对 master 接口有意义，即主要是与硬件设置相关的设置，例如 radio channel 设置。请注意，要使 radio 接受客户端，其 master 接口需要启用。只有当 slave 接口启用且 master 接口启用时，slave 接口才会运行。

CAPsMAN 上的接口可以是静态的，也可以是动态的。静态接口存储在 RouterOS 配置中，并在重启后保留。动态接口仅在特定 CAP 连接到 CAPsMAN 时存在。

### CAPsMAN 全局配置 {#capsman-global-configuration}

启用 CAPsMAN 功能的设置位于 `/caps-man/manager` 菜单中：

| 属性 | 说明 |
| :-- | :-- |
| **enabled** (*yes \| no*；默认值：**no**) | 禁用或启用 CAPsMAN 功能 |
| **certificate** (*auto \| certificate name \| none*；默认值：**none**) | 设备证书 |
| **ca-certificate** (*auto \| certificate name \| none*；默认值：**none**) | 设备 CA 证书 |
| **require-peer-certificate** (*yes \| no*；默认值：**no**) | 要求所有连接的 CAP 都具有有效证书 |
| **package-path** (*string \|*；默认值：) | RouterOS 软件包所在的文件夹位置。例如，使用 "/upgrade" 指定 files 部分中的升级文件夹。如果设置为空字符串，CAPsMAN 可以使用内置 RouterOS 软件包，请注意，在这种情况下，只有与 CAPsMAN 架构相同的 CAP 才会被升级。 |
| **upgrade-policy** (*none \| require-same-version \| suggest-same-version*；默认值：**none**) | 升级策略选项<ul><li>none - 不执行升级</li><li>require-same-version - CAPsMAN 建议升级 CAP RouterOS 版本，如果升级失败，则不会配置该 CAP。（仍可手动配置）</li><li>suggest-same-version - CAPsMAN 建议升级 CAP RouterOS 版本，即使升级失败，仍会配置该 CAP</li></ul> |

### 无线配置下发 {#radio-provisioning}

CAPsMAN 根据标识符区分 CAP。标识符根据以下规则生成：

- 如果 CAP 提供了证书，则标识符设置为证书中的 Common Name 字段。
- 否则，标识符基于 CAP 提供的 Base-MAC，格式为：'[XX:XX:XX:XX:XX:XX]'。

当与 CAP 的 DTLS 连接成功建立后（这意味着 CAP 标识符已知且有效），CAPsMAN 会确保不存在使用相同标识符的 CAP 陈旧连接。当前已连接的 CAP 列在 `/caps-man/remote-cap` 菜单中：

```
[admin@CM] /caps-man> remote-cap print
 # ADDRESS                                    IDENT           STATE               RADIOS
 0 00:0C:42:00:C0:32/27044                    MT-000C4200C032 Run                      1
```

CAPsMAN 根据无线接口（radio）的内置 MAC 地址（radio-mac）区分实际无线接口。这意味着在一个 CAPsMAN 上无法管理具有相同 MAC 地址的两个 radio。当前由 CAPsMAN 管理的 radio（由已连接的 CAP 提供）列在 `/caps-man/radio` 菜单中：

```
[admin@CM] /caps-man> radio print
Flags: L - local, P - provisioned 
 #    RADIO-MAC         INTERFACE                               REMOTE-AP-IDENT
 0  P 00:03:7F:48:CC:07 cap1                                    MT-000C4200C032
```

当 CAP 连接时，CAPsMAN 首先尝试根据 radio-mac 将每个 CAP radio 绑定到 CAPsMAN 主接口。如果找到合适的接口，则使用该主接口的配置以及引用该特定主接口的从接口配置来设置 radio。此时，主接口和从接口都被视为已绑定到该 radio，该 radio 被视为已配置。

如果未找到与 radio 匹配的 master 接口，CAPsMAN 将执行“provisioning rules”。Provisioning rules 是有序的规则列表，其中包含用于指定要匹配哪个 radio 的设置，以及用于指定 radio 匹配后要执行什么操作的设置。

用于匹配 radio 的 Provisioning rules 在 `/caps-man/provisioning` 菜单中配置：

| Property | Description |
| :-- | :-- |
| **action** (*create-disabled \| create-enabled \| create-dynamic-enabled \| none*; Default: **none**) | 当规则匹配由以下设置指定时要执行的操作：<ul><li><strong>create-disabled</strong> - 为该 radio 创建已禁用的静态接口。即，接口将绑定到该 radio，但在手动启用接口之前，该 radio 将无法运行；</li><li><strong>create-enabled</strong> - 创建已启用的静态接口。即，接口将绑定到该 radio，并且该 radio 将可运行；</li><li><strong>create-dynamic-enabled</strong> - 创建已启用的动态接口。即，接口将绑定到该 radio，并且该 radio 将可运行；</li><li><strong>none</strong> - 不执行任何操作，使 radio 保持未配置状态；</li></ul> |
| **comment** (*string*; Default: ) | Provisioning 规则的简短描述 |
| **common-name-regexp** (*string*; Default: ) | 用于按通用名称匹配 radio 的正则表达式 |
| **hw-supported-modes** (*a\|a-turbo\|ac\|an\|b\|g\|g-turbo\|gn*; Default: ) | 按支持的无线模式匹配 radio |
| **identity-regexp** (*string*; Default: ) | 用于按路由器标识匹配 radio 的正则表达式 |
| **ip-address-ranges** (*IpAddressRange[,IpAddressRanges] max 100x*; Default: **""**) | 匹配 IP 位于所配置地址范围内的 CAP。 |
| **master-configuration** (*string*; Default: ) | 如果 **action** 指定创建接口，则将创建一个新的 master 接口，并将其配置设置为此配置配置文件 |
| **name-format** (*cap \| identity \| prefix \| prefix-identity*; Default: **cap**) | 指定 CAP 接口名称创建的语法<ul><li>cap - 默认名称</li><li>identity - CAP 板的 <code>/system/identity</code> 名称</li><li>prefix - 来自 name-prefix 值的名称</li><li>prefix-identity - 来自 name-prefix 值和 CAP 板的 <code>/system/identity</code> 名称的名称</li></ul> |
| **name-prefix** (*string*; Default: ) | 可在 name-format 中用于创建 CAP 接口名称的名称前缀 |
| **radio-mac** (*MAC address*; Default: **00:00:00:00:00:00**) | 要匹配的 radio 的 MAC 地址，空 MAC（00:00:00:00:00:00）表示匹配所有 MAC 地址 |
| **slave-configurations** (*string*; Default: ) | 如果 **action** 指定创建接口，则为此列表中的每个配置配置文件创建一个新的 slave 接口。 |

:::warning
如果没有规则匹配该 radio，则会执行一条隐式默认规则，其操作为 **create-enabled**，且未设置任何配置。
:::

要获取活动的 provisioning 匹配器：

```
[admin@CM] /caps-man/provisioning> print
Flags: X - disabled 
 0   radio-mac=00:00:00:00:00:00 action=create-enabled master-configuration=main-cfg 
     slave-configurations=virtual-ap-cfg name-prefix=""
```

为方便用户，提供了一些命令，可针对某个 radio 或某个 AP 提供的所有 radio 重新执行 provisioning 过程：

```
[admin@CM] > /caps-man/radio/provision 0
```

and:

```
[admin@CM] > /caps-man/remote-cap/provision 0
```

### 接口配置 {#interface-configuration}

CAPsMAN 接口在 `/caps-man/interface` 菜单中管理：

```
[admin@CM] > /caps-man/interface/print          
Flags: M - master, D - dynamic, B - bound, X - disabled, I - inactive, R - running 
 #      NAME                                 RADIO-MAC         MASTER-INTERFACE                               
 0 M BR cap2                                 00:0C:42:1B:4E:F5 none                                           
 1   B  cap3                                 00:00:00:00:00:00 cap2                   

```

### 主配置配置文件 {#master-configuration-profiles}

配置配置文件允许将预定义的“顶层”主设置应用到正在配置的 CAP 无线电。

配置配置文件在 `/caps-man/configuration` 菜单中配置：

| 属性 | 说明 |
| :-- | :-- |
| **channel** (*list*; Default: ) | 从 Channel 名称中获取的用户定义列表（`/caps-man/channels`） |
| **channel.band** (*2ghz-b \| 2ghz-b/g \| 2ghz-b/g/n \| 2ghz-onlyg \| 2ghz-onlyn \| 5ghz-a \| 5ghz-a/n \| 5ghz-onlyn \| 5ghz-a/n/ac \| 5ghz-only-ac*; Default: ) | 定义一组使用的频段。 |
| **channel.control-channel-width** (*40mhz-turbo \| 20mhz \| 10mhz \| 5mhz*; Default: ) | 定义一组使用的信道宽度。 |
| **channel.extension-channel** (*Ce \| Ceee \| eC \| eCee \| eeCe \| eeeC \| xx \| xxxx \| disabled*; Default: ) | 扩展信道配置。（例如，Ce = 扩展信道位于 Control channel 之上，eC = 扩展信道位于 Control channel 之下） |
| **channel.frequency** (*integer [0..4294967295]*; Default: ) | AP 工作的信道频率值，单位为 MHz。如果留空，CAPsMAN 将自动确定占用最少的最佳频率。 |
| **channel.reselect-interval** (*time [00:00:00]*; *[00:00:00..00:00:00];* Default: ) | 选择占用最少频率的间隔，可定义为随机间隔，例如“30m..60m”。仅在 **channel.frequency** 留空时生效。 |
| **channel.save-selected** (*yes \| no*; Default: **no**) | 如果自动选择信道频率并使用了 **channel.reselect-interval**，则保存最后选择的频率。 |
| **channel.secondary-frequency** (*integer [0..4294967295]*; Default: **auto**) | 指定用于 80+80MHz 配置的第二个频率。将其设置为 **Disabled** 可禁用 80+80MHz 能力。 |
| **channel.skip-dfs-channels** (*yes \| no*; Default: **no**) | 如果 **channel.frequency** 留空，选择时将跳过 DFS 信道 |
| **channel.tx-power** (*integer [-30..40]*; Default: ) | CAP 接口的 TX Power（针对整个接口，而非单个链），单位为 dBm。不能设置为高于国家法规或接口允许的值。默认使用国家或接口允许的最大值。 |
| **channel.width** (; Default: ) | 设置信道宽度，单位为 MHz。 |
| **comment** (*string*; Default: ) | Configuration profile 的简短说明 |
| **country** (*name of the country \| no\_country\_set*; Default: **no\_country\_set**) | 限制可用频段、频率以及每个频率的最大发射功率。还指定 **scan-list** 的默认值。值 *no\_country\_set* 是一组符合 FCC 的信道。 |
| **datapath** (*list*; Default: ) | 从 Datapath 名称中获取的用户定义列表（`/caps-man/datapath`） |
| **datapath.bridge** (*list*; Default: ) | 特定接口应作为端口自动添加到的网桥 |
| **datapath.bridge-cost** (*integer [1..*200000000*]*; Default: ) | 添加为网桥端口时使用的网桥端口开销 |
| **datapath.bridge-horizon** (*integer [0..4294967295]*; Default: ) | 添加为网桥端口时使用的网桥 horizon |
| **datapath.client-to-client-forwarding** (*yes \| no*; Default: **no**) | 控制是否允许连接到接口的无线客户端之间进行 client-to-client 转发。在 local forwarding 模式下，该功能由 CAP 执行；否则，由 CAPsMAN 执行 |
| **datapath.interface-list** (; Default: ) |  |
| **datapath.l2mtu** (; Default: ) | 设置 Layer2 MTU 大小 |
| **datapath.local-forwarding** (*yes \| no*; Default: **no**) | 控制转发模式 |
| **datapath.mtu** (; Default: ) | 设置 MTU 大小 |
| **datapath.openflow-switch** (; Default: ) | 启用时用于添加接口的 OpenFlow 交换机端口 |
| **datapath.vlan-id** (*integer [1..4095]*; Default: ) | 当 vlan-mode 启用 VLAN 标记使用时，分配给接口的 VLAN ID |
| **datapath.vlan-mode** (*use-service-tag \| use-tag*; Default: ) | 启用并指定分配给接口的 VLAN 标记类型（使所有接收到的数据都加上 VLAN 标记，并允许接口仅发送带有指定标记的数据） |
| **disconnect-timeout** (; Default: ) |  |
| **distance** (; Default: ) |  |
| **frame-lifetime** (; Default: ) |  |
| **guard-interval** (*any \| long*; Default: **any**) | 是否允许使用短保护间隔（请参阅 802.11n MCS 规范，了解其如何影响吞吐量）。“any”将根据数据速率使用短保护间隔或长保护间隔，“long”将仅使用长保护间隔。 |
| **hide-ssid** (*yes \| no*; Default: ) | <ul><li><em>yes</em> - AP 不在 beacon 帧中包含 SSID，并且不回复具有广播 SSID 的 probe 请求。</li><li><em>no</em> - AP 在 beacon 帧中包含 SSID，并回复具有广播 SSID 的 probe 请求。</li></ul>该属性仅在 AP 模式下生效。将其设置为 <em>yes</em> 可以将该网络从某些客户端软件显示的无线网络列表中移除。更改此设置不会提高无线网络的安全性，因为 AP 发送的其他帧中包含 SSID。 |
| **hw-protection-mode** (; Default: ) |  |
| **hw-retries** (; Default: ) |  |
| **installation** (*any \| indoor \| outdoor*; Default: **any**) |  |
| **keepalive-frames** (*enabled \| disabled*; Default: **enabled**) |  |
| **load-balancing-group** (*string*; Default: ) | 将接口标记到负载均衡组。要使客户端连接到该组中的接口，该接口已连接的客户端数量应与该组中所有其他接口相同或更少。适用于 CAP 覆盖范围大多重叠的部署环境。 |
| **max-sta-count** (*integer [1..2007]*; Default: ) | 最大关联客户端数量。 |
| **mode** (; Default: **ap**) | 设置工作模式。当前仅支持 ap。 |
| **multicast-helper** (*default \| disabled \| full*; Default: **default**) | 设置为 full 时，组播数据包将以单播目标 MAC 地址发送，从而解决无线链路上的组播问题。此选项应仅在接入点上启用；客户端应配置为 <strong>station-bridge</strong> 模式。<ul><li>disabled - 禁用 helper，并以组播目标 MAC 地址发送组播数据包</li><li>full - 在发送前将所有组播数据包的 MAC 地址更改为单播 MAC 地址</li><li>default - 当前设置为 <em>disabled</em> 的默认选择。该值可能在未来版本中更改。</li></ul> |
| **name** (*string*; Default: ) | Configuration Profile 的描述性名称 |
| **rates** (; Default: ) | 从 Rates 名称中获取的用户定义列表（`/caps-man/rates`） |
| **rates.basic** (*1Mbps \| 2Mbps \| 5.5Mbps \| 6Mbps \| 9Mbps \| 11Mbps \| 12Mbps \| 18Mbps \| 24Mbps \| 36Mbps \| 48Mbps \| 54Mbps*; Default: ) |  |
| **rates.supported** (*1Mbps \| 2Mbps \| 5.5Mbps \| 6Mbps \| 9Mbps \| 11Mbps \| 12Mbps \| 18Mbps \| 24Mbps \| 36Mbps \| 48Mbps \| 54Mbps*; Default: ) |  |
| **rates.ht-basic-mcs** (*list of (mcs-0 \| mcs-1 \| mcs-2 \| mcs-3 \| mcs-4 \| mcs-5 \| mcs-6 \| mcs-7 \| mcs-8 \| mcs-9 \| mcs-10 \| mcs-11 \| mcs-12 \| mcs-13 \| mcs-14 \| mcs-15 \| mcs-16 \| mcs-17 \| mcs-18 \| mcs-19 \| mcs-20 \| mcs-21 \| mcs-22 \| mcs-23)*; Default: **mcs-0; mcs-1; mcs-2; mcs-3; mcs-4; mcs-5; mcs-6; mcs-7**) | 每个连接的客户端都必须支持的[调制与编码方案](https://en.wikipedia.org/wiki/IEEE_802.11n-2009#Data_rates)。有关 MCS 规范，请参阅 802.11n。 |
| **rates.ht-supported-mcs** (*list of (mcs-0 \| mcs-1 \| mcs-2 \| mcs-3 \| mcs-4 \| mcs-5 \| mcs-6 \| mcs-7 \| mcs-8 \| mcs-9 \| mcs-10 \| mcs-11 \| mcs-12 \| mcs-13 \| mcs-14 \| mcs-15 \| mcs-16 \| mcs-17 \| mcs-18 \| mcs-19 \| mcs-20 \| mcs-21 \| mcs-22 \| mcs-23)*; Default: **mcs-0; mcs-1; mcs-2; mcs-3; mcs-4; mcs-5; mcs-6; mcs-7; mcs-8; mcs-9; mcs-10; mcs-11; mcs-12; mcs-13; mcs-14; mcs-15; mcs-16; mcs-17; mcs-18; mcs-19; mcs-20; mcs-21; mcs-22; mcs-23**) | 此设备通告为支持的[调制与编码方案](https://en.wikipedia.org/wiki/IEEE_802.11n-2009#Data_rates)。有关 MCS 规范，请参阅 802.11n。 |
| **rates.vht-basic-mcs** (*none \| MCS 0-7 \| MCS 0-8 \| MCS 0-9*; Default: **none**) | 每个连接的客户端都必须支持的<a href="https://en.wikipedia.org/wiki/IEEE_802.11ac#Data_rates_and_speed" target="_blank" rel="noopener noreferrer">调制与编码方案</a>。有关 MCS 规范，请参阅 802.11ac。可以为每个 Spatial Stream 设置 MCS 间隔 <br/><ul><li><em>none</em> - 不使用所选 Spatial Stream</li><li><em>MCS 0-7</em> - 客户端必须支持 MCS-0 至 MCS-7</li><li><em>MCS 0-8</em> - 客户端必须支持 MCS-0 至 MCS-8</li><li><em>MCS 0-9</em> - 客户端必须支持 MCS-0 至 MCS-9</li></ul> |
| **rates.vht-supported-mcs** (*none \| MCS 0-7 \| MCS 0-8 \| MCS 0-9*; Default: **none**) | 此设备通告为支持的<a href="https://en.wikipedia.org/wiki/IEEE_802.11ac#Data_rates_and_speed" target="_blank" rel="noopener noreferrer">调制与编码方案</a>。有关 MCS 规范，请参阅 802.11ac。可以为每个 Spatial Stream 设置 MCS 间隔 <br/><ul><li><em>none</em> - 不使用所选 Spatial Stream</li><li><em>MCS 0-7</em> - 设备将通告支持 MCS-0 至 MCS-7</li><li><em>MCS 0-8</em> - 设备将通告支持 MCS-0 至 MCS-8</li><li><em>MCS 0-9</em> - 设备将通告支持 MCS-0 至 MCS-9</li></ul> |
| **rx-chains** (*list of integer [0..3]*; Default: **0**) | 用于接收的天线。 |
| **security** (*string*; Default: **none**) | 来自 `/caps-man/security` 的安全配置名称 |
| **security.authentication-types** (*list of string*; Default: **none**) | 指定认证类型：**wpa-psk**、**wpa2-psk**、**wpa-eap** 或 **wpa2-eap** |
| **security.disable-pmkid** (; Default: ) |  |
| **security.eap-methods** (*eap-tls \| passthrough*; Default: **none**) | <ul><li>eap-tls - 使用内置 EAP TLS 认证。</li><li>passthrough - 接入点将认证过程转发到 RADIUS 服务器。</li></ul> |
| **security.eap-radius-accounting** (; Default: ) |  |
| **security.encryption** (*aes-ccm \| tkip*; Default: ) | 设置使用的单播加密算法类型 |
| **security.group-encryption** (*aes-ccm \| tkip*; Default: **aes-ccm**) | 接入点通告其中一种密码套件，可以选择多个值。接入点使用它加密所有广播和组播帧。客户端仅尝试连接到使用指定组密码套件之一的接入点。<ul><li>tkip - Temporal Key Integrity Protocol，一种加密协议，兼容旧版 WEP 设备，但经过增强以修正 WEP 的部分缺陷。</li><li>aes-ccm - 更安全的 WPA 加密协议，基于可靠的 AES（Advanced Encryption Standard）。不含 WEP 遗留设备的网络应仅使用此密码套件。</li></ul> |
| **security.group-key-update** (*time: 30s..1h*; Default: **5m**) | 控制接入点更新组密钥的频率。该密钥用于加密所有广播和组播帧。该属性仅对接入点生效。 |
| **security.passphrase** (*string*; Default: ) | WPA 或 WPA2 预共享密钥 |
| **security.tls-certificate** (*none \| name*; Default: ) | 当 `security.tls-mode` 设置为 `no-certificates` 以外的值时，接入点始终需要证书。 |
| **security.tls-mode** (*verify-certificate \| dont-verify-certificate \| no-certificates \| verify-certificate-with-crl*; Default: ) | 该属性仅在 <strong>security.eap-methods</strong> 包含 <em>eap-tls</em> 时生效。<ul><li>verify-certificate - 要求远端设备具有有效证书。检查其是否由已知证书颁发机构签名。不执行额外的身份验证。证书可能包含其有效期信息。如果路由器时间和日期不正确，可能会因为路由器时钟不在该时间段内而拒绝有效证书。另请参阅 <a href="/docs/authentication-authorization-accounting/certificates"> Certificates</a> 配置。</li><li>dont-verify-certificate - 不检查远端设备的证书。接入点不会要求客户端提供证书。</li><li>no-certificates - 不使用证书。TLS 会话通过 2048 位匿名 Diffie-Hellman 密钥交换建立。</li><li>verify-certificate-with-crl - 与 verify-certificate 相同，但还会通过检查 Certificate Revocation List 来检查证书是否有效。</li></ul> |
| **ssid** (*string (0..32 chars)*; Default: ) | SSID（service set identifier）是在 beacon 中广播、用于标识无线网络的名称。 |
| **tx-chains** (*list of integer [0..3]*; Default: **0**) | 用于发送的天线。 |

### 信道组 {#channel-groups}

信道组设置允许配置与无线电信道相关的设置列表，例如无线电频段、频率、Tx Power、扩展信道和宽度。

信道组设置在 Channels 配置文件菜单 `/caps-man/channels` 中配置

| 属性 | 说明 |
| :-- | :-- |
| **band** (*2ghz-b \| 2ghz-b/g \| 2ghz-b/g/n \| 2ghz-onlyg \| 2ghz-onlyn \| 5ghz-a \| 5ghz-a/n \| 5ghz-onlyn*; Default: ) | 根据无线网卡硬件能力定义工作射频频段和模式 |
| **comment** (*string*; Default: ) | Channel Group profile 的简短说明 |
| **extension-channel** (*Ce \| Ceee \| eC \| eCee \| eeCe \| eeeC \| disabled*; Default: ) | 扩展信道配置。（例如，Ce = 扩展信道位于 Control channel 之上，eC = 扩展信道位于 Control channel 之下） |
| **frequency** (*integer [0..4294967295]*; Default: ) | AP 工作的信道频率值，单位为 MHz。 |
| **name** (*string*; Default: ) | Channel Group Profile 的描述性名称 |
| **tx-power** (*integer [-30..40]*; Default: ) | CAP 接口的 TX Power（针对整个接口，而非单个链），单位为 dBm。不能设置为高于国家法规或接口允许的值。默认使用国家或接口允许的最大值。 |
| **width** (; Default: ) | 设置信道宽度，单位为 MHz。（例如 20、40） |
| **save-selected** (; Default: **yes**) | 为 CAP Radio 保存所选信道——CAP 重新连接到 CAPsMAN 后将选择该信道，并在该 CAP 完成信道 Re-optimize 之前一直使用它。 |

### Datapath 配置 {#datapath-configuration}

Datapath 设置控制与数据转发相关的方面。在 CAPsMAN 中，datapath 设置在 datapath profile 菜单 `/caps-man/datapath` 中配置，也可以直接在 configuration profile 或 interface 菜单中作为带有 **datapath.** 前缀的设置进行配置。

有两种主要的转发模式：

- Local forwarding 模式，CAP 在本地向无线接口转发数据以及从无线接口转发数据。
- Manager forwarding 模式，CAP 将通过无线接收的所有数据发送到 CAPsMAN，并且只发送从 CAPsMAN 接收到的无线数据。在该模式下，即使是客户端到客户端的转发也由 CAPsMAN 控制并执行。

转发模式按接口配置：如果一个 CAP 提供 2 个 radio 接口，则一个接口可以配置为以 local forwarding 模式运行，另一个接口配置为以 manager forwarding 模式运行。Virtual-AP 接口也是如此：每个接口都可以使用与主接口或其他 Virtual-AP 接口不同的转发模式。

大多数 datapath 设置仅在 manager forwarding 模式下使用，因为在 local forwarding 模式下，CAPsMAN 无法控制数据转发。

有以下 datapath 设置：

- bridge -- 启用时，要将接口添加为网桥端口的 bridge 接口。
- bridge-cost -- 添加为网桥端口时要使用的网桥端口 cost。
- bridge-horizon -- 添加为网桥端口时要使用的 bridge horizon。
- client-to-client-forwarding -- 控制是否允许连接到该接口的无线客户端之间进行客户端到客户端转发；在 local forwarding 模式下，该功能由 CAP 执行，否则由 CAPsMAN 执行。
- local-forwarding -- 控制转发模式。
- openflow-switch -- 启用时，要将接口添加为端口的 OpenFlow 交换机。
- vlan-id -- 如果 vlan-mode 启用 VLAN 标记，则要分配给接口的 VLAN ID。
- vlan-mode -- VLAN 标记模式指定是否应为接口分配 VLAN 标记（使所有接收到的数据都带上 VLAN 标记，并允许接口仅发送带有指定标记的数据）。

### 本地转发模式 {#local-forwarding-mode}

在此模式下，CAP 上的无线接口表现为普通接口，并参与正常的数据转发。无线接口将接受或传递数据到 CAP 上的网络协议栈。CAPsMAN 不参与数据转发，也不会处理任何数据帧。它只控制接口配置和客户端关联过程。

CAP 上的无线接口会将其配置更改为“enabled”，其状态和部分相关参数（例如 mac-address、arp、mtu）将反映 CAPsMAN 上接口的状态和参数。请注意，无线相关配置**不会**反映 CAPsMAN 应用的实际接口配置：

```
[admin@CAP] /interface/wireless> pr
Flags: X - disabled, R - running 
 0  R ;;; managed by CAPsMAN
      ;;; channel: 5180/20-Ceee/ac, SSID: master, local forwarding
      name="wlan2" mtu=1500 mac-address=00:03:7F:48:CC:07 arp=enabled 
      interface-type=Atheros AR9888 mode=ap-bridge ssid="merlin" 
      frequency=5240 band=5ghz-a/n channel-width=20/40mhz-eC scan-list=default
      ...
```

本地转发模式下的 Virtual-AP 接口将显示为已启用的动态 Virtual-AP 接口：

```
[admin@CAP] /interface> pr
Flags: D - dynamic, X - disabled, R - running, S - slave 
 #     NAME                                TYPE         MTU L2MTU  MAX-L2MTU
 ...
 2  RS ;;; managed by CAPsMAN
       ;;; channel: 5180/20-Ceee/ac, SSID: master, local forwarding
       wlan2                               wlan        1500  1600
 3 DRS ;;; managed by CAPsMAN
       ;;; SSID: slave, local forwarding
       wlan6                               wlan        1500  1600
 ...
[admin@CAP] /interface> wireless pr   
Flags: X - disabled, R - running 
 ...
 2  R ;;; managed by CAPsMAN
      ;;; SSID: slave, local forwarding
      name="wlan6" mtu=1500 mac-address=00:00:00:00:00:00 arp=enabled 
      interface-type=virtual-AP master-interface=wlan2 
```

Virtual-AP 接口以动态方式添加，这在一定程度上限制了 CAP 上用于数据转发的静态配置可能性，例如为 Virtual-AP 接口分配地址。这不适用于主无线接口。

要解决此问题，可以在 CAP 上使用 static-virtual 设置，该设置将创建 Static Virtual Interfaces 而不是 Dynamic，并允许为这些接口分配 IP 配置。从 CAPsMAN 应用配置时，MAC 地址用于记住每个 static-interface。如果两个或更多静态接口具有相同的 MAC 地址，配置可能会以随机顺序应用。

为便于数据转发配置，可以将 CAP 配置为使用网桥，当 CAPsMAN 启用接口时，接口会自动作为端口添加到该网桥。这可以在 `/interface/wireless/cap` 菜单中完成。

### 管理器转发模式 {#manager-forwarding-mode}

在此模式下，CAP 将通过无线接收的所有数据发送到 CAPsMAN，并且只通过无线发送从 CAPsMAN 接收到的数据。CAPsMAN 完全控制数据转发，包括客户端到客户端的转发。CAP 上的无线接口被禁用，不参与网络：

```
 ...
 1 X  ;;; managed by CAPsMAN
      ;;; channel: 5180/20-Ceee/ac, SSID: master, manager forwarding
      name="wlan2" mtu=1500 mac-address=00:03:7F:48:CC:07 arp=enabled 
      interface-type=Atheros AR9888 mode=ap-bridge ssid="merlin" 
 ...
```

Virtual-AP 接口也会创建为“disabled”，并且不参与 CAP 上的数据转发。

### 访问列表 {#access-list}

CAPsMAN 上的访问列表是一个有序规则列表，用于允许或拒绝客户端连接到 CAPsMAN 控制下的任何 CAP。当客户端尝试连接到由 CAPsMAN 控制的 CAP 时，CAP 会将该请求转发给 CAPsMAN。作为注册过程的一部分，CAPsMAN 会查询访问列表，以确定是否允许该客户端连接。访问列表的默认行为是允许连接。

访问列表规则会逐条处理，直到找到匹配规则。然后执行匹配规则中的动作。如果动作指定应接受该客户端，则会接受该客户端，并可能用访问列表规则中指定的参数覆盖其默认连接参数。

访问列表在 `/caps-man/access-list` 菜单中配置。访问列表规则有以下参数：

- 客户端匹配参数：
  - address - 客户端的 MAC 地址（如果指定了 mask，则仅按 mask 检查相应部分，因此要匹配 "D8:1C:79:6E:1E:FE" 中的厂商 D8，只需输入一个虚假条目，例如 "D8:00:00:00:00:00"，然后按下一行所述使用 mask）。
  - mask - 比较客户端地址时应用的 MAC 地址掩码。例如，使用 FF:00:00:00:00:00 仅匹配指定 MAC 地址的第一个八位组。在上述示例中，无论输入的 MAC 是什么，都只匹配第一个八位组。类似地，输入 00:00:00:00:00:FF 将只匹配假设 MAC "D8:1C:79:6E:1E:FE" 的最后一个八位组（FE）。因此，在 mac 行中，如果使用这样的 mask，只需输入 00:00:00:00:00:FE。
  - interface - 可选接口，用于与客户端实际连接的接口进行比较。
  - time - 规则匹配的时间和星期。
  - signal-range - 规则匹配时客户端信号必须处于的范围。
- 动作参数 - 指定客户端匹配时要执行的动作：
  - accept - 接受客户端。
  - reject - 拒绝客户端。
  - query-radius - 查询 RADIUS 服务器，确认是否允许特定客户端连接。
- 连接参数：
  - ap-tx-limit - 向客户端方向的 tx 速度限制。
  - client-tx-limit - 向 AP 方向的 tx 速度限制（仅适用于 RouterOS 客户端）。
  - client-to-client-forwarding - 指定是否允许将从此客户端接收到的数据转发到连接到同一接口的其他客户端。
  - private-passphrase - 使用某种 PSK 身份验证算法时，此客户端使用的 PSK 口令。
  - radius-accounting - 指定如果为此客户端完成 RADIUS 身份验证，是否应使用 RADIUS 流量计费。
  - vlan-mode - VLAN 标记模式，指定来自客户端的流量是否应被标记（发往客户端时是否应取消标记）。
  - vlan-id - 执行 VLAN 标记时使用的 VLAN ID。

### 注册表 {#registration-table}

Registration table 包含连接到由 CAPsMAN 控制的 radio 的客户端列表，可在 `/caps-man/registration-table` 菜单中查看：

```
[admin@CM] /caps-man> registration-table print
 # INTERFACE                   MAC-ADDRESS       UPTIME                RX-SIGNAL
 0 cap1                        00:03:7F:48:CC:0B 1h38m9s210ms                -36
```

## 示例 {#examples}

### 使用主接口和从接口的基本配置 {#basic-configuration-with-master-and-slave-interface}

创建 WPA2 PSK 的安全配置文件，不指定口令：

```
[admin@CM] /caps-man/security>add name="wpa2psk" authentication-types=wpa2-psk encryption=aes-ccm
```

创建供主接口使用的配置配置文件：

- 在配置中指定 WPA2 口令。
- 在配置中指定信道设置。

```
[admin@CM] /caps-man/configuration> add name=master-cfg ssid=master security=wpa2psk
security.passphrase=12345678 channel.frequency=5180 channel.width=20 channel.band=5ghz-a
```

创建供虚拟 AP 接口使用的配置配置文件：

- 在配置中指定不同的 WPA2 口令。

```
[admin@CM] /caps-man/configuration> add name=slave-cfg ssid=slave security=wpa2psk
security.passphrase=87654321
```

创建匹配任意无线电并使用 master-cfg 和 slave-cfg 创建动态接口的供应规则：

```
[admin@CM] /caps-man/provisioning> add action=create-dynamic-enabled master-configuration=master-cfg
slave-configurations=slave-cfg
```

现在，当 AP 连接并完成供应后，将创建 2 个动态接口（一个主接口和一个从接口）：

```
[admin@CM] /caps-man/interface> print detail 
Flags: M - master, D - dynamic, B - bound, X - disabled, I - inactive, R - running 
 0 MDB  name="cap1" mtu=1500 l2mtu=2300 radio-mac=00:0C:42:1B:4E:F5 master-interface=none 
        configuration=master-cfg 

 1  DB  name="cap2" mtu=1500 l2mtu=2300 radio-mac=00:00:00:00:00:00 master-interface=cap1 
        configuration=slave-cfg 
```

考虑某个 AP 不支持所配置的频率连接且无法正常运行的情况：

```
[admin@CM] /caps-man/interface> pr
Flags: M - master, D - dynamic, B - bound, X - disabled, I - inactive, R - running 
 #      NAME                                 RADIO-MAC         MASTER-INTERFACE                               
 0 MDB  ;;; unsupported band or channel
        cap3                                 00:0C:42:1B:4E:FF none    
 ...
```

我们可以在接口设置中覆盖该特定 radio 的信道设置，而不影响 master-cfg 配置文件：

```
[admin@CM] /caps-man/interface> set cap3 channel.frequency=2142 channel.band=2ghz-b/g
```

允许特定 MAC 地址范围匹配 Access-list，例如匹配所有 Apple 设备：

```
[admin@CM] /caps-man/access-list> add mac-address=18:34:51:00:00:00 mac-address-mask=FF:FF:FF:00:00:00 action=accept
```

配置 DHCP Server Option 138，以在 CAP 板上设置 CAPsMAN 地址

```
[admin@CM] /ip/dhcp-server/network/set <network-id> caps-manager=<capsman-server-ip>
```

DHCP 客户端将在 `/ip/dhcp-client/print detail` 中看到该 CAPsMAN IP。

### 使用证书配置 {#configuration-with-certificates}

你可能希望在 CAPsMAN 中配置证书，以使用 *Require Peer Certificate* 和 *Lock To Caps Man* 等选项。这些选项可提高安全性，并在某些情况下提高 CAPsMAN 网络的稳定性。没有特定证书时，CAP 不会连接到 CAPsMAN，反之亦然。

#### 快速简便配置 {#fast-and-easy-configuration}

这是在 CAPsMAN 环境中使用证书的基本配置。本示例假定你已在 CAPsMAN 和 CAP 上完成基本配置。最好在规模不持续增长的 CAPsMAN 网络中使用此配置。详情请参阅 [CAP to CAPsMAN Connection](#cap-to-capsman-connection)。

**CAPsMAN 设备：**

在 CAPsMAN Manager 菜单中将 *Certificate* 和 *CA Certificate* 设置为 *auto*：

```
/caps-man/manager
set ca-certificate=auto certificate=auto
```

Print 输出：

```
[admin@CAPsMAN] /caps-man/manager/print 
                   enabled: yes
               certificate: auto
            ca-certificate: auto
              package-path: 
            upgrade-policy: none
  require-peer-certificate: no
     generated-certificate: CAPsMAN-D4CA6D987C26
  generated-ca-certificate: CAPsMAN-CA-D4CA6D987C26
```

CAPsMAN 设备将先生成 *CA-Certificate*，然后生成依赖于 *CA-Certificate* 的 *Certificate*。

**CAP 设备：**

在 CAP 配置中设置为 *request* 证书：

```
/interface/wireless/cap
set certificate=request
```

CAP 将连接到 CAPsMAN 并请求证书。CAP 将从 CAPsMAN 接收 *CA-Certificate*，并创建另一个证书供 CAP 使用。

**结果中**

在 CAP 设备的 CAP 菜单中，设置 *Requested Certificate*：

```
[admin@CAP] /interface/wireless/cap/print
                            enabled: yes
                         interfaces: wlan1
                        certificate: request
                   lock-to-caps-man: no
               discovery-interfaces: ether1
                 caps-man-addresses: 
                     caps-man-names: 
  caps-man-certificate-common-names: 
                             bridge: none
                     static-virtual: no
         -->  requested-certificate: CAP-D4CA6D7F45BA  <--
```

此外，将获得两个证书，并可在 *Certificate* 菜单中查看：

```
[admin@CAP] > /certificate/print 
Flags: K - private-key, D - dsa, L - crl, C - smart-card-key, A - authority, I - issued, R - revoked, E - expired, T - trusted 
 #          NAME              COMMON-NAME              SUBJECT-ALT-NAME                                           FINGERPRINT             
 0     A  T _0                CAPsMAN-CA-D4CA6D987C26                                                             383e63d7b...
 1 K        CAP-D4CA6D7F45BA  CAP-D4CA6D7F45BA                                                                    d495d1a94...
```

在 CAPsMAN 设备的 Certificate 菜单中，将创建三个证书：CAPsMAN 和 CAPsMAN-CA 证书，以及颁发给 CAP 的证书：

```
[admin@CAPsMAN] > /certificate/print 
Flags: K - private-key, D - dsa, L - crl, C - smart-card-key, A - authority, I - issued, R - revoked, E - expired, T - trusted 
 #          NAME                     COMMON-NAME              SUBJECT-ALT-NAME                                    FINGERPRINT         
 0 K   A  T CAPsMAN-CA-D4CA6D987C26  CAPsMAN-CA-D4CA6D987C26                                                      383e63d7b...
 1 K    I   CAPsMAN-D4CA6D987C26     CAPsMAN-D4CA6D987C26                                                         02b0f7ff4...
 2      I   issued_1                 CAP-D4CA6D7F45BA                                                             d495d1a94...
```

**Additionally**

如果只允许具有有效证书的 CAP 连接到此 CAPsMAN，可以在 CAPsMAN 设备上将 *Require Peer Certificate* 设置为 *yes*：

```
/caps-man/manager
set require-peer-certificate=yes
```

但是，当要向 CAPsMAN 网络添加新的 CAP 设备时，必须先将此选项设置为 *no*，并在 CAP 获得证书后再设置回 *yes*。每次更改此选项时，CAPsMAN 都会断开所有动态接口，CAP 将尝试重新连接。

如果要将 CAP 锁定到特定 CAPsMAN，并确保其不会连接到其他 CAPsMAN，应将 *Lock To CAPsMAN* 选项设置为 *yes*。此外，可以通过在 CAP 设备上设置 *CAPsMAN Certificate Common Names* 来指定要锁定的 CAPsMAN：

```
/interface/wireless/cap
set lock-to-caps-man=yes
set caps-man-certificate-common-names=CAPsMAN-D4CA6D987C26
```

#### 手动证书和通过 SCEP 颁发 {#manual-certificates-and-issuing-with-scep}

在此示例中，你可以为 CAPsMAN 创建自己的证书，并控制向 CAP 颁发证书。此配置适用于大型且不断增长的 CAPsMAN 网络。根据你的情况和需求，此示例中的许多段落可以采用不同的实现方式。此时，了解 [Certificates](/docs/authentication-authorization-accounting/certificates) 及其 [application](/docs/authentication-authorization-accounting/certificates#sign-certificate) 可能会有所帮助。

**CAPsMAN 设备：**

在 *Certificate* 菜单中，为 CA 证书和 CAPsMAN 服务器证书添加证书模板：

```
/certificate
add name=CA-temp common-name=CA
add name=CAPsMAN-temp common-name=CAPsMAN
```

现在 *Sign* 证书模板。首先 *Sign* CA 证书，并使用 CAPsMAN 设备 IP 作为 *CA CRL Host*：

```
/certificate
sign CA-temp ca-crl-host=10.5.138.157 name=CA
sign CAPsMAN-temp ca=CA name=CAPsMAN
```

或者，可以通过 CAPsMAN Manager 菜单中的 *Certificate* 和 *CA-Certificate* 选项的 auto 设置完成前面两个步骤，请参阅 [Fast and easy configuration](#fast-and-easy-configuration)。

*Export* CA 证书。你必须在 CAP 设备上 *Import* 该证书。可以使用 *Download -> Drag&Drop* 将其传输到 CAP 设备；在此示例中，稍后将在 CAP 设备上使用 *fetch* 命令。建议使用较长的 passphrase：如果落入他人之手，较长的 passphrase 需要更长时间才能被破解：

```
/certificate
export-certificate CA export-passphrase=thelongerthebetterpassphrase
```

创建一个 *SCEP server*，用于向 CAP 设备颁发和授予证书：

```
/certificate/scep-server
add ca-cert=CA path=/scep/CAPsMAN
```

在 CAPsMAN Manager 菜单中设置证书，并将 *Require Peer Certificate* 设置为 yes：

```
/caps-man/manager
set ca-certificate=CA certificate=CAPsMAN
set require-peer-certificate=yes
```

此时，只有具有有效证书的 CAP 才能连接。

**CAP 设备**

将 CA 证书的导出文件从 CAPsMAN 设备下载到 CAP 设备。本例使用 *fetch*；不过，还有其他多种方式：

```
/tool/fetch address=10.5.138.157 src-path=cert_export_CA.crt user=admin password="123" mode=ftp
```

在 *Certificate* 菜单中从 CAPsMAN 设备导入 CA 证书：

```
/certificate> import file-name=cert_export_CA.crt passphrase=thelongerthebetterpassphrase
```

为 CAP 添加证书模板：

```
/certificate
add name=CAP1 common-name=CAP1
```

请求 CAPsMAN 设备使用 SCEP 为该证书授予密钥：

```
/certificate
add-scep template=CAP1 scep-url="https://10.5.138.157/scep/CAPsMAN"
```

你必须返回 CAPsMAN 设备，为该证书授予密钥。

在 CAP 菜单中设置刚创建的证书：

```
/interface/wireless/cap
set certificate=CAP1
```

**CAPsMAN 设备：**

返回 CAPsMAN 设备，在 *Certificate Request* 菜单中为 CAP 证书授予密钥：

```
/certificate/scep-server/requests
grant numbers=0
```

**结果中**

现在 CAP 应能连接到 CAPsMAN。在 *CAPsMAN interfaces* 中查看其是否已连接。在 CAPsMAN 设备的 *Certificate* 菜单中可以看到三个证书：CA、CAPsMAN，以及颁发给 CAP 的证书：

```
[admin@CAPsMAN] /certificate/print 
Flags: K - private-key, D - dsa, L - crl, C - smart-card-key, A - authority, I - issued, R - revoked, 
E - expired, T - trusted 
 #          NAME        COMMON-NAME      SUBJECT-ALT-NAME                                   FINGERPRINT     
 0 K L A  T CA          CA                                                                  752775b457a37...
 1 K   A    CAPsMAN     CAPsMAN                                                             12911ba445b3b...
 2      I   issued_1    CAP1                                                                5b9a52b6ce3fb...
```

在 CAP 设备的 *Certificate* 菜单中可以看到两个已获取的证书：

```
[admin@CAP1] /interface/wireless> /certificate/print 
Flags: K - private-key, D - dsa, L - crl, C - smart-card-key, A - authority, I - issued, R - revoked, 
E - expired, T - trusted 
 #          NAME        COMMON-NAME      SUBJECT-ALT-NAME                                   FINGERPRINT     
 0   L A  T cert_exp... CA                                                                  752775b457a37...
 1 K      T CAP1        CAP1                                                                5b9a52b6ce3fb...
```
