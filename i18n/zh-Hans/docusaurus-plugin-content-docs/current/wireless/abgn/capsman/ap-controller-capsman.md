---
sidebar_key: "wireless/abgn/capsman/ap-controller-capsman"
sidebar_position: 1
title: "AP 控制器（CAPsMAN）"
sidebar_label: "AP 控制器"
description: "CAPsMAN（受控接入点系统管理器）通过允许 RouterOS 服务器配置多个接入点、处理客户端身份验证和数据转发，实现无线网络的集中管理。它支持无限数量的 CAP（受特定硬件限制），使用 DTLS 进行安全的管理连接，并提供集中式或本地数据转发的选项。"
tags:
  - 'capsman'
  - 'wireless-management'
  - 'dtls'
source: https://manual.mikrotik.com/docs/wireless/abgn/capsman/ap-controller-capsman
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info
本页介绍用于运行 `wireless` 软件包（`/interface/wireless`）的设备的旧版 CAPsMAN（`/caps-man`）。如果您的设备使用 `/interface/wifi` 菜单（`wifi-qcom` / `wifi-qcom-ac` 软件包），请改为参阅 [WiFi CAPsMAN](../../wifi/capsman.md)。
:::

---

CAPsMAN 允许从中央配置界面向多台 MikroTik AP 设备应用无线设置。

更具体地说，Controlled Access Point system Manager（CAPsMAN）允许集中管理无线网络，并在必要时集中处理数据。使用 CAPsMAN 功能时，网络将由若干提供无线连接的“受控接入点”（CAP）以及一个管理 AP 配置的“系统管理器”（CAPsMAN）组成。它还负责客户端认证，并可选择负责数据转发。

当 CAP 由 CAPsMAN 控制时，它只需要最低限度的配置即可与 CAPsMAN 建立连接。传统上由 AP 执行的功能（如访问控制、客户端认证）现在由 CAPsMAN 执行。CAP 设备现在只需提供无线链路层加密/解密。

根据配置，数据要么转发到 CAPsMAN 进行集中处理（*默认*），要么在 CAP 本地转发（本地转发模式）。

## 要求 {#requirements}

- 任何 RouterOS 设备只要至少具有 Level 4 RouterOS 许可证，都可以作为受控无线接入点（CAP）。
- CAPsMAN 服务器可以安装在任何 RouterOS 设备上，即使该设备本身没有无线接口。
- CAPsMAN 支持无限数量的 CAP（接入点）。
- 每个 CAP 最多 32 个射频。
- 每个主射频接口最多 32 个虚拟接口。
- 不能使用 Nv2 和 NStreme 专有协议。

---

## CAPsMAN 系统的简单设置 {#simple-setup-of-a-capsman-system}

![](/img/24386f7736bf211a.webp)

在深入探讨 CAPsMAN 操作细节之前，让我们快速说明如何设置最基本的系统：由一台 MikroTik 路由器管理两台 MikroTik AP 设备。CAPsMAN 的好处是 CAP 单元无需配置；所有设置都在 CAPsMAN 服务器上完成。

CAPsMAN 设置包括定义配置模板，然后将这些模板推送到可控制的 AP 设备（CAP）。假设您的主路由器已连接到互联网且工作正常，可以按如下步骤操作。

在将作为 CAPsMAN 服务器的中央设备上，创建一个仅包含基本设置的新“Configuration”模板（网络名称、国家/地区、本地 LAN 网桥接口、无线密码）：

![](/img/7c8e743432e137ce.webp)添加新的配置模板：
![](/img/93fa941161ea2b1a.webp)
![](/img/78b31855d8f3b0d5.webp)

然后创建新的“Provisioning”规则，将已创建的配置模板分配给 CAP 设备：

![](/img/b976b0971eb21c10.webp)

在 CAPsMAN 上剩下要做的就是启用它：

![](/img/69dbb61f857cb034.webp)

大多数 MikroTik AP 设备开箱即支持 CAP 模式，您只需确保它们与 CAPsMAN 位于同一网络，然后在按住复位按钮的同时启动它们。

例如，在 CAP 设备关闭时将其连接到 CAPsMAN 设备的某个 LAN 端口，然后按住复位按钮，并给 CAP 设备上电。继续按住按钮，直到 User LED 常亮，然后松开以开启 CAP 模式。设备现在将查找 CAPsMAN 服务器（按住按钮的总时间约为 10 秒）。

设备现在将显示在 CAPsMAN 的“Remote CAP”菜单中，并会根据预配设置使用配置模板进行“预配”。有关如何手动调整所有设置的更多详细信息，请继续阅读本文档。

### CAP 到 CAPsMAN 的连接 {#cap-to-capsman-connection}

为使 CAPsMAN 系统正常运行并提供无线连接，CAP 必须与 CAPsMAN 建立管理连接。管理连接可以使用 MAC 或 IP 层协议建立，并使用“DTLS”进行保护。

CAP 也可以将客户端数据连接传递给 Manager，但数据连接不受保护。如果认为有必要，则需要使用其他数据安全手段，例如 IPSec 或加密隧道。

CAP 到 CAPsMAN 的连接可以使用 2 种传输协议建立（通过 Layer 2 和 Layer 3）。

- MAC 层连接特性：
  - CAP 上无需 IP 配置。
  - CAP 和 CAPsMAN 必须位于同一 Layer 2 网段——物理或虚拟（通过 L2 隧道）。
- IP 层（UDP）连接特性：
  - 如有必要可以穿越 NAT。
  - CAP 必须能够使用 IP 协议访问 CAPsMAN。
  - 如果 CAP 与 CAPsMAN 不在同一 L2 网段，则必须为 CAP 预配 CAPsMAN IP 地址，因为基于 IP 组播的发现无法跨 Layer 3 工作。

为了与 CAPsMAN 建立连接，CAP 会执行发现过程。在发现期间，CAP 尝试联系 CAPsMAN 并构建可用 CAPsMAN 列表。CAP 尝试通过以下方式联系可用的 CAPsMAN：

- 已配置的 Manager IP 地址列表。
- 从 DHCP 服务器获取的 CAPsMAN IP 地址列表。
- 在已配置接口上使用 IP 和 MAC 层协议进行广播。

构建可用 CAPsMAN 列表后，CAP 根据以下规则选择 CAPsMAN：

- 如果 **caps-man-names** 参数指定了允许的 Manager 名称（CAPsMAN 的 `/system/identity`），CAP 将优先选择列表中靠前的 CAPsMAN；如果列表为空，它将连接到任何可用的 Manager。
- 具有 MAC 层连接的合适 Manager 优先于具有 IP 连接的 Manager。

选择 Manager 后，CAP 尝试建立 DTLS 连接。可能使用以下认证模式：

- CAP 和 CAPsMAN 上没有证书——不进行认证。
- 仅 Manager 配置了证书——CAP 会检查 CAPsMAN 证书，但如果没有合适的受信任 CA 证书也不会失败；为了与没有证书的 CAP 建立连接，CAPsMAN 必须配置 **require-peer-certificate=no**。
- CAP 和 CAPsMAN 都配置了证书——双向认证。

建立 DTLS 连接后，CAP 可以选择检查 CAPsMAN 提供的证书的 CommonName 字段。**caps-man-certificate-common-names** 参数包含允许的 CommonName 值列表。如果此列表不为空，CAPsMAN 必须配置证书。如果此列表为空，CAP 不检查 CommonName 字段。

如果 CAPsMAN 或 CAP 与网络断开连接，CAP 与 CAPsMAN 之间的连接丢失将在大约 10-20 秒内被检测到。

#### CAP 自动锁定到 CAPsMAN {#cap-auto-locking-to-capsman}

CAP 可以配置为自动锁定到特定的 CAPsMAN 服务器。锁定通过记录 CAP 所锁定到的 CAPsMAN 证书 CommonName，并在所有后续连接中检查此 CommonName 来实现。由于此功能使用证书 CommonName 实现，因此必须使用证书才能让锁定生效。

通过以下命令启用锁定：

```
[admin@CAP] > /interface/wireless/cap/set lock-to-caps-man=yes
```

一旦 CAP 连接到合适的 CAPsMAN 并锁定到它，将如下所示：

```
[admin@wtp] > /interface/wireless/cap/print
...
        locked-caps-man-common-name: CAPsMAN-000C424C30F3
```

从现在起，CAP 将只连接到具有此 CommonName 的 CAPsMAN，直到通过设置 **lock-to-caps-man=no** 清除锁定要求。如果需要强制 CAP 锁定到另一个 CAPsMAN，则需要使用此方法——首先设置 **lock-to-caps-man=no**，然后设置 **lock-to-caps-man=yes**。

请注意，可以通过设置 **caps-man-certificate-common-names** 手动将 CAP“锁定”到 CAPsMAN。

#### 自动证书 {#auto-certificates}

为在需要证书时（例如自动锁定功能）简化 CAPsMAN 和 CAP 配置，可以将 CAPsMAN 配置为自动生成必要的证书，并将 CAP 配置为向 CAPsMAN 请求证书。

**自动证书不提供完整的公钥基础设施**，仅适用于简单设置。如果需要更复杂的 PKI——支持适当的证书有效期、多级 CA 证书、证书续期——则必须使用其他方式，例如手动分发证书或 SCEP。

CAPsMAN 具有以下证书设置：

- **certificate** - 这是 CAPsMAN 证书，此证书必须具有可用的私钥。如果设置为 **none**，CAPsMAN 将以无证书模式运行，任何需要证书的功能都不会工作。如果设置为 **auto**，CAPsMAN 将尝试使用 CA 证书（请参阅 **ca-certificate** 描述）向自己颁发证书。请注意，自动颁发证书的 CommonName 将为 `CAPsMAN-<mac address>`，有效期将与 CA 证书相同。
- **ca-certificate** - 这是 CA 证书，CAPsMAN 在必要时（请参阅 **certificate** 描述）为自己颁发证书以及签署来自 CAP 的证书请求时将使用它。如果设置为 **none**，CAPsMAN 将无法为自己颁发证书或签署来自 CAP 的证书请求。如果设置为 **auto**，CAPsMAN 将生成自签名 CA 证书作为 CA 证书使用。此证书的 CommonName 格式为 `CAPsMAN-CA-<mac address>`，有效期将从 1970-01-01 到 2038-01-18。

当 CAPsMAN 自动生成证书时，将如下所示：

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

CAP 可以配置为向 CAPsMAN 请求证书。为此，CAP 必须配置 **certificate=request** 设置，并且 CAPsMAN 必须具有可用的 CA 证书（在 **ca-certificate** 设置中指定或自动生成）。

CAP 最初将生成私钥和 CommonName 格式为 `CAP-<mac address>` 的证书请求。当 CAP 与 CAPsMAN 建立连接时，CAP 将请求 CAPsMAN 签署其证书请求。如果成功，CAPsMAN 将向 CAP 发送 CA 证书和新颁发的证书。CAP 将这些证书导入其证书存储：

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

当 AP 配置为由 CAPsMAN 控制时，AP 上受管无线接口的配置将被忽略*（例外：antenna-gain、antenna-mode）*。相反，AP 从 CAPsMAN 接受受管接口的配置。

:::warning
由 CAPsMAN 管理且其流量被转发到 CAPsMAN 的 CAP 无线接口（即它们不处于*本地转发*模式）显示为*禁用*，并带有注释 **Managed by CAPsMAN**。那些处于*本地转发*模式的接口（流量由 CAP 本地管理，仅管理由 CAPsMAN 完成）不会显示为禁用，但会显示注释 **Managed by CAPsMAN**
:::

AP 的 CAP 行为在 `/interface/wireless/cap` 菜单中配置。在那里您可以：

- 在设备上禁用或启用 CAP 功能。
- 设置要由 Manager 控制的无线接口列表。
- 设置 CAP 应尝试通过其发现 Manager 的接口列表。
- 设置 CAP 在发现期间将尝试联系的 Manager IP 地址列表。
- 设置 CAP 将尝试连接的 Manager 名称列表。
- 设置 CAP 将连接的 Manager 证书 CommonName 列表。
- 设置使用本地转发模式时应将接口添加到的网桥。

CAP 上由 CAPsMAN 控制的每个无线接口都会在 CAPsMAN 上显示为虚拟接口。这在使用常规 RouterOS 功能（如路由、桥接、防火墙等）控制数据转发时提供了最大的灵活性。

## CAPsMAN 配置概念 {#capsman-configuration-concepts}

许多无线接口设置可以分组到命名组（“模板”）中，以简化配置复用——例如，可以在“配置模板”中配置通用设置，然后多个接口可以引用该模板。同时，为了获得最大灵活性，任何模板设置都可以直接在接口配置中覆盖。

目前有以下设置组：

- channel - 信道相关设置，例如频率和宽度。
- datapath - 数据转发相关设置，例如应将特定接口自动添加为端口的网桥。
- security - 安全相关设置，例如允许的认证类型或口令。
- configuration - 主无线设置组，包括 SSID 等设置，并另外将其他设置组绑定在一起——也就是说，配置模板可以引用 channel、security 等命名设置组。此外，任何设置都可以直接在配置模板中覆盖。

接口设置将所有设置组绑定在一起，但此外任何设置都可以直接在接口设置中覆盖。

通过设置组，配置以接口（配置的实际使用者）为根组织成层次结构。为了确定某个设置的有效值，会按照较高层级的设置值覆盖较低层级值的方式查询此结构。

例如，当需要查找某个接口要使用的 WPA2 口令时，会按以下位置依次查询，第一个配置了 WPA2 口令的位置决定有效口令。“->”表示引用设置模板（如果已配置）：

- 接口口令
- interface->security 口令
- interface->configuration 口令
- interface->configuration->security 口令

CAPsMAN 上有 2 种接口——“主”接口和“从”接口。主接口保存实际无线接口（射频）的配置，而从接口链接到主接口，旨在保存 Virtual-AP（多 SSID 支持）的配置。有些设置仅对主接口有意义，即主要是与硬件设置相关的设置，例如射频信道设置。请注意，为了让射频接受客户端，其主接口需要启用。从接口只有在启用且主接口已启用时才会进入工作状态。

CAPsMAN 上的接口可以是静态或动态的。静态接口存储在 RouterOS 配置中，并会在重启后保留。动态接口仅在特定 CAP 连接到 CAPsMAN 时存在。

### CAPsMAN 全局配置 {#capsman-global-configuration}

用于启用 CAPsMAN 功能的设置位于 `/caps-man/manager` 菜单中：

| 属性 | 描述 |
| :-- | :-- |
| **enabled** (*yes \| no*；默认值：**no**) | 禁用或启用 CAPsMAN 功能 |
| **certificate** (*auto \| certificate name \| none*; Default: **none**) | 设备证书 |
| **ca-certificate** (*auto \| certificate name \| none*；默认值：**none**) | 设备 CA 证书 |
| **require-peer-certificate** (*yes \| no*；默认值：**no**) | 要求所有连接的 CAP 都具有有效证书 |
| **package-path** (*string \|*；默认值： ) | RouterOS 软件包的文件夹位置。例如，使用 "/upgrade" 指定文件部分中的 upgrade 文件夹。如果设置为空字符串，CAPsMAN 可以使用内置 RouterOS 软件包；请注意，在这种情况下，只有与 CAPsMAN 架构相同的 CAP 才会被升级。 |
| **upgrade-policy** (*none \| require-same-version \| suggest-same-version*; 默认：**none**) | 升级策略选项none - 不执行升级require-same-version - CAPsMAN 建议升级 CAP 的 RouterOS 版本，如果失败，则不会预配该 CAP。（仍可手动预配）suggest-same-version - CAPsMAN 建议升级 CAP 的 RouterOS 版本，如果失败，仍会进行预配 |

### 射频预配 {#radio-provisioning}

CAPsMAN 根据标识符区分 CAP。该标识符根据以下规则生成：

- 如果 CAP 提供了证书，则标识符设置为证书中的 Common Name 字段。
- 否则，标识符基于 CAP 提供的 Base-MAC，格式为：‘[XX:XX:XX:XX:XX:XX]’。

当与 CAP 的 DTLS 连接成功建立时（这意味着 CAP 标识符已知且有效），CAPsMAN 会确保没有使用相同标识符的陈旧 CAP 连接。当前连接的 CAP 列在 `/caps-man/remote-cap` 菜单中：

```
[admin@CM] /caps-man> remote-cap print
 # ADDRESS                                    IDENT           STATE               RADIOS
 0 00:0C:42:00:C0:32/27044                    MT-000C4200C032 Run                      1
```

CAPsMAN 根据实际无线接口（射频）的内置 MAC 地址（radio-mac）区分它们。这意味着无法在一个 CAPsMAN 上管理两个具有相同 MAC 地址的射频。当前由 CAPsMAN 管理的射频（由已连接的 CAP 提供）列在 `/caps-man/radio` 菜单中：

```
[admin@CM] /caps-man> radio print
Flags: L - local, P - provisioned 
 #    RADIO-MAC         INTERFACE                               REMOTE-AP-IDENT
 0  P 00:03:7F:48:CC:07 cap1                                    MT-000C4200C032
```

当 CAP 连接时，CAPsMAN 首先尝试根据 radio-mac 将每个 CAP 射频绑定到 CAPsMAN 主接口。如果找到合适的接口，则使用主接口配置以及引用该特定主接口的从接口配置来设置射频。此时，接口（主接口和从接口）被视为已绑定到射频，并且射频被视为已预配。

如果未找到与该射频匹配的主接口，CAPsMAN 将执行“预配规则”。预配规则是一个有序规则列表，其中包含指定要匹配哪些射频的设置，以及指定射频匹配后采取何种操作的设置。

用于匹配射频的预配规则在 `/caps-man/provisioning` 菜单中配置：

| 属性 | 描述 |
| :-- | :-- |
| **action** (*create-disabled \| create-enabled \| create-dynamic-enabled \| none*; 默认：**none**) | 规则匹配时采取的操作，由以下设置指定：create-disabled - 为射频创建禁用的静态接口。也就是说，接口将绑定到射频，但在手动启用接口之前射频不会工作；create-enabled - 创建启用的静态接口。也就是说，接口将绑定到射频，并且射频将工作；create-dynamic-enabled - 创建启用的动态接口。也就是说，接口将绑定到射频，并且射频将工作；none - 不执行任何操作，使射频保持未预配状态； |
| **comment** (*string*；默认值： ) | 预配规则的简短描述 |
| **common-name-regexp** (*string*; 默认：) | 用于按 CommonName 匹配射频的正则表达式 |
| **hw-supported-modes** (*a\|a-turbo\|ac\|an\|b\|g\|g-turbo\|gn*；默认值： ) | 按支持的无线模式匹配无线电 |
| **identity-regexp** (*string*；默认值： ) | 用于按路由器身份匹配无线电的正则表达式 |
| **ip-address-ranges** (*IpAddressRange[,IpAddressRanges] max 100x*；默认值：**""**) | 匹配 IP 位于所配置地址范围内的 CAP。 |
| **master-configuration** (*string*; 默认：) | 如果 **action** 指定创建接口，则将创建一个新的主接口，其配置设置为此配置模板 |
| **name-format** (*cap \| identity \| prefix \| prefix-identity*; 默认：**cap**) | 指定 CAP 接口名称创建的语法cap - 默认名称；identity - CAP 板的 `/system/identity` 名称；prefix - 来自 name-prefix 值的名称；prefix-identity - 来自 name-prefix 值和 CAP 板的 `/system/identity` 名称的名称 |
| **name-prefix** (*string*；默认值： ) | 可在 name-format 中用于创建 CAP 接口名称的名称前缀 |
| **radio-mac** (*MAC address*; 默认：**00:00:00:00:00:00**) | 要匹配的射频 MAC 地址，空 MAC（00:00:00:00:00:00）表示匹配所有 MAC 地址 |
| **slave-configurations** (*string*; 默认：) | 如果 **action** 指定创建接口，则为该列表中的每个配置模板创建一个新的从接口。 |

:::warning
如果没有规则匹配该射频，则会执行一条隐式默认规则，其 action 为 **create-enabled**，且未设置任何配置。
:::

获取活动的预配匹配器：

```
[admin@CM] /caps-man/provisioning> print
Flags: X - disabled 
 0   radio-mac=00:00:00:00:00:00 action=create-enabled master-configuration=main-cfg 
     slave-configurations=virtual-ap-cfg name-prefix=""
```

为方便用户，有些命令可以重新执行某个射频或某个 AP 提供的所有射频的预配过程：

```
[admin@CM] > /caps-man/radio/provision 0
```

以及：

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

### 主配置模板 {#master-configuration-profiles}

配置模板允许将预定义的“顶层”主设置应用到正在预配的 CAP 射频。

配置模板在 `/caps-man/configuration` 菜单中配置：

| 属性 | 描述 |
| :-- | :-- |
| **channel** (*list*；默认值： ) | 从 Channel 名称（`/caps-man/channels`）中获取的用户定义列表 |
| **channel.band** (*2ghz-b \| 2ghz-b/g \| 2ghz-b/g/n \| 2ghz-onlyg \| 2ghz-onlyn \| 5ghz-a \| 5ghz-a/n \| 5ghz-onlyn \| 5ghz-a/n/ac \| 5ghz-only-ac*；默认值： ) | 定义所用信道集合。 |
| **channel.control-channel-width** (*40mhz-turbo \| 20mhz \| 10mhz \| 5mhz*；默认值： ) | 定义所用信道宽度集合。 |
| **channel.extension-channel** (*Ce \| Ceee \| eC \| eCee \| eeCe \| eeeC \| xx \| xxxx \| disabled*；默认值： ) | 扩展信道配置。（例如 Ce = 扩展信道位于控制信道之上，eC = 扩展信道位于控制信道之下） |
| **channel.frequency** (*integer [0..4294967295]*; 默认：) | AP 工作时的信道频率值，单位为 MHz。如果留空，CAPsMAN 将自动确定占用最少的最佳频率。 |
| **channel.reselect-interval** (*time [00:00:00]*; *[00:00:00..00:00:00];* 默认：) | 选择占用最少频率的间隔，可以定义为随机间隔，例如 "30m..60m"。仅在 **channel.frequency** 留空时有效。 |
| **channel.save-selected** (*yes \| no*; 默认：**no**) | 如果自动选择信道频率且使用了 **channel.reselect-interval**，则保存最后选取的频率。 |
| **channel.secondary-frequency** (*integer [0..4294967295]*；默认值：**auto**) | 指定用于 80+80MHz 配置的第二个频率。将其设置为 **Disabled** 可禁用 80+80MHz 能力。 |
| **channel.skip-dfs-channels** (*yes \| no*；默认值：**no**) | 如果 **channel.frequency** 留空，选择时将跳过 DFS 信道 |
| **channel.tx-power** (*integer [-30..40]*；默认值： ) | CAP 接口的 TX Power（针对整个接口，而不是单个链），单位为 dBm。不能设置得高于国家法规或接口允许的值。默认情况下，使用国家或接口允许的最大值。 |
| **channel.width** (；默认值： ) | 设置信道宽度，单位为 MHz。 |
| **comment** (*string*；默认值： ) | 配置配置文件的简短描述 |
| **country** (*name of the country \| no\_country\_set*; 默认：**no\_country\_set**) | 限制可用频段、频率以及每个频率的最大发射功率。还指定 **scan-list** 的默认值。值 *no\_country\_set* 是符合 FCC 的信道集合。 |
| **datapath** (*list*；默认值： ) | 从 Datapath 名称（`/caps-man/datapath`）中获取的用户定义列表 |
| **datapath.bridge** (*list*; 默认：) | 应将特定接口自动添加为端口的网桥 |
| **datapath.bridge-cost** (*integer [1..*200000000*]*; 默认：) | 作为网桥端口添加时使用的网桥端口开销 |
| **datapath.bridge-horizon** (*integer [0..4294967295]*；默认值： ) | 作为网桥端口添加时要使用的网桥 horizon |
| **datapath.client-to-client-forwarding** (*yes \| no*; 默认：**no**) | 控制是否允许连接到该接口的无线客户端之间进行客户端到客户端转发；在本地转发模式下，此功能由 CAP 执行，否则由 CAPsMAN 执行 |
| **datapath.interface-list** (；默认值： ) |  |
| **datapath.l2mtu** (；默认值： ) | 设置二层 MTU 大小 |
| **datapath.local-forwarding** (*yes \| no*; 默认：**no**) | 控制转发模式 |
| **datapath.mtu** (；默认值： ) | 设置 MTU 大小 |
| **datapath.openflow-switch** (；默认值： ) | 要将接口添加到的 OpenFlow 交换机端口（启用时） |
| **datapath.vlan-id** (*integer [1..4095]*；默认值： ) | 如果 vlan-mode 启用 VLAN 标记，则分配给接口的 VLAN ID |
| **datapath.vlan-mode** (*use-service-tag \| use-tag*；默认值： ) | 启用并指定要分配给接口的 VLAN 标记类型（使所有接收到的数据都打上 VLAN 标记，并允许接口只发送带有指定标记的数据） |
| **disconnect-timeout** (；默认值： ) |  |
| **distance** (；默认值： ) |  |
| **frame-lifetime** (；默认值： ) |  |
| **guard-interval** (*any \| long*；默认值：**any**) | 是否允许使用短保护间隔（请参阅 802.11n MCS 规范，了解这可能如何影响吞吐量）。"any" 将根据数据速率使用短或长保护间隔，"long" 将仅使用长保护间隔。 |
| **hide-ssid** (*yes \| no*; 默认：) | yes - AP 不在 Beacon 帧中包含 SSID，也不回复具有广播 SSID 的探测请求。no - AP 在 Beacon 帧中包含 SSID，并回复具有广播 SSID 的探测请求。此属性仅在 AP 模式下生效。将其设置为 *yes* 可能会从某些客户端软件显示的无线网络列表中移除此网络。更改此设置不会提高无线网络的安全性，因为 SSID 包含在 AP 发送的其他帧中。 |
| **hw-protection-mode** (；默认值： ) |  |
| **hw-retries** (；默认值： ) |  |
| **installation** (*any \| indoor \| outdoor*；默认值：**any**) |  |
| **keepalive-frames** (*enabled \| disabled*；默认值：**enabled**) |  |
| **load-balancing-group** (*string*；默认值： ) | 将接口标记到负载均衡组。要使客户端连接到该组中的接口，该接口已连接的客户端数量应与组中所有其他接口相同或更少。在多个 CAP 的覆盖范围大多重叠的部署中很有用。 |
| **max-sta-count** (*integer [1..2007]*；默认值： ) | 最大关联客户端数。 |
| **mode** (；默认值：**ap**) | 设置工作模式。目前仅支持 ap。 |
| **multicast-helper** (*default \| disabled \| full*; 默认：**default**) | 设置为 full 时，组播数据包将使用单播目标 MAC 地址发送，从而解决无线链路上的组播问题。此选项只应在接入点上启用；客户端应配置为 **station-bridge** 模式。disabled - 禁用该助手，并使用组播目标 MAC 地址发送组播数据包full - 在发送前将所有组播数据包的 MAC 地址改为单播 MAC 地址default - 当前设置为 disabled 的默认选择。该值可能会在未来的版本中更改。 |
| **name** (*string*；默认值： ) | Configuration Profile 的描述性名称 |
| **rates** (；默认值： ) | 从 Rates 名称（`/caps-man/rates`）中获取的用户定义列表 |
| **rates.basic** (*1Mbps \| 2Mbps \| 5.5Mbps \| 6Mbps \| 9Mbps \| 11Mbps \| 12Mbps \| 18Mbps \| 24Mbps \| 36Mbps \| 48Mbps \| 54Mbps*；默认值： ) |  |
| **rates.supported** (*1Mbps \| 2Mbps \| 5.5Mbps \| 6Mbps \| 9Mbps \| 11Mbps \| 12Mbps \| 18Mbps \| 24Mbps \| 36Mbps \| 48Mbps \| 54Mbps*；默认值： ) |  |
| **rates.ht-basic-mcs** (*list of (mcs-0 \| mcs-1 \| mcs-2 \| mcs-3 \| mcs-4 \| mcs-5 \| mcs-6 \| mcs-7 \| mcs-8 \| mcs-9 \| mcs-10 \| mcs-11 \| mcs-12 \| mcs-13 \| mcs-14 \| mcs-15 \| mcs-16 \| mcs-17 \| mcs-18 \| mcs-19 \| mcs-20 \| mcs-21 \| mcs-22 \| mcs-23)*；默认值：**mcs-0; mcs-1; mcs-2; mcs-3; mcs-4; mcs-5; mcs-6; mcs-7**) | 每个连接的客户端都必须支持的 [调制与编码方案](https://en.wikipedia.org/wiki/IEEE_802.11n-2009#Data_rates)。有关 MCS 规范，请参阅 802.11n。 |
| **rates.ht-supported-mcs** (*list of (mcs-0 \| mcs-1 \| mcs-2 \| mcs-3 \| mcs-4 \| mcs-5 \| mcs-6 \| mcs-7 \| mcs-8 \| mcs-9 \| mcs-10 \| mcs-11 \| mcs-12 \| mcs-13 \| mcs-14 \| mcs-15 \| mcs-16 \| mcs-17 \| mcs-18 \| mcs-19 \| mcs-20 \| mcs-21 \| mcs-22 \| mcs-23)*；默认值：**mcs-0; mcs-1; mcs-2; mcs-3; mcs-4; mcs-5; mcs-6; mcs-7; mcs-8; mcs-9; mcs-10; mcs-11; mcs-12; mcs-13; mcs-14; mcs-15; mcs-16; mcs-17; mcs-18; mcs-19; mcs-20; mcs-21; mcs-22; mcs-23**) | 此设备声明支持的 [调制与编码方案](https://en.wikipedia.org/wiki/IEEE_802.11n-2009#Data_rates)。有关 MCS 规范，请参阅 802.11n。 |
| **rates.vht-basic-mcs** (*none \| MCS 0-7 \| MCS 0-8 \| MCS 0-9*；默认值：**none**) | 每个连接的客户端都必须支持的 [调制与编码方案](../../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)。有关 MCS 规范，请参阅 802.11ac。可以为每个空间流设置 MCS 区间：none - 将不使用所选空间流；MCS 0-7 - 客户端必须支持 MCS-0 到 MCS-7；MCS 0-8 - 客户端必须支持 MCS-0 到 MCS-8；MCS 0-9 - 客户端必须支持 MCS-0 到 MCS-9 |
| **rates.vht-supported-mcs** (*none \| MCS 0-7 \| MCS 0-8 \| MCS 0-9*；默认值：**none**) | 此设备声明支持的 [调制与编码方案](http://en.wikipedia.org/wiki/IEEE_802.11ac#Data_rates_and_speed)。有关 MCS 规范，请参阅 802.11ac。可以为每个空间流设置 MCS 区间：none - 将不使用所选空间流；MCS 0-7 - 设备将声明支持 MCS-0 到 MCS-7；MCS 0-8 - 设备将声明支持 MCS-0 到 MCS-8；MCS 0-9 - 设备将声明支持 MCS-0 到 MCS-9 |
| **rx-chains** (*list of integer [0..3]*；默认值：**0**) | 用于接收的天线。 |
| **security** (*string*；默认值：**none**) | 来自 `/caps-man/security` 的安全配置名称 |
| **security.authentication-types** (*list of string*；默认值：**none**) | 指定认证类型，可选值为 **wpa-psk**、**wpa2-psk**、**wpa-eap** 或 **wpa2-eap** |
| **security.disable-pmkid** (；默认值： ) |  |
| **security.eap-methods** (*eap-tls \| passthrough*；默认值：**none**) | eap-tls - 使用内置 EAP TLS 认证。passthrough - 接入点会将认证过程中继到 RADIUS 服务器。 |
| **security.eap-radius-accounting** (; 默认：) |  |
| **security.encryption** (*aes-ccm \| tkip*；默认值： ) | 设置所使用的单播加密算法类型 |
| **security.group-encryption** (*aes-ccm \| tkip*；默认值：**aes-ccm**) | 接入点会通告这些密码之一，可以选择多个值。接入点使用它来加密所有广播和组播帧。客户端只会尝试连接到使用指定组密码之一的接入点。tkip - Temporal Key Integrity Protocol - 加密协议，与旧版 WEP 设备兼容，但经过增强以修正一些 WEP 缺陷。aes-ccm - 更安全的 WPA 加密协议，基于可靠的 AES（Advanced Encryption Standard）。没有 WEP 遗留问题的网络应只使用此密码。 |
| **security.group-key-update** (*time: 30s..1h*；默认值：**5m**) | 控制接入点更新组密钥的频率。此密钥用于加密所有广播和组播帧。该属性仅对 Access Point 生效。 |
| **security.passphrase** (*string*; 默认：) | WPA 或 WPA2 预共享密钥 |
| **security.tls-certificate** (*none \| name*; 默认：) | 当 `security.tls-mode` 设置为 `no-certificates` 以外的值时，接入点始终需要证书。 |
| **security.tls-mode** (*verify-certificate \| dont-verify-certificate \| no-certificates \| verify-certificate-with-crl*; 默认：) | 此属性仅在 **security.eap-methods** 包含 *eap-tls* 时生效。verify-certificate - 要求远程设备具有有效证书。检查该证书是否由已知证书颁发机构签名。不会进行额外的身份验证。证书可能包含其有效时间段的信息。如果路由器的时间与日期不正确，可能会因为路由器时钟不在该时间段内而拒绝有效证书。另请参阅 Certificates 配置。dont-verify-certificate - 不检查远程设备的证书。接入点不会要求客户端提供证书。no-certificates - 不使用证书。TLS 会话使用 2048 位匿名 Diffie-Hellman 密钥交换建立。verify-certificate-with-crl - 与 verify-certificate 相同，但还会通过检查证书吊销列表来检查证书是否有效。 |
| **ssid** (*string (0..32 chars)*；默认值： ) | SSID（服务集标识符）是在信标中广播的名称，用于标识无线网络。 |
| **tx-chains** (*list of integer [0..3]*; 默认：**0**) | 传输时使用哪些天线。 |

### 信道组 {#channel-groups}

信道组设置允许配置与射频信道相关的设置列表，例如射频频段、频率、发送功率、扩展信道和宽度。

信道组设置在 Channels 模板菜单 `/caps-man/channels` 中配置

| 属性 | 描述 |
| :-- | :-- |
| **band** (*2ghz-b \| 2ghz-b/g \| 2ghz-b/g/n \| 2ghz-onlyg \| 2ghz-onlyn \| 5ghz-a \| 5ghz-a/n \| 5ghz-onlyn*; 默认：) | 定义工作射频频段和模式，取自无线网卡的硬件能力 |
| **comment** (*string*; 默认：) | 信道组模板的简短描述 |
| **extension-channel** (*Ce \| Ceee \| eC \| eCee \| eeCe \| eeeC \| disabled*; 默认：) | 扩展信道配置。（例如 Ce = 扩展信道位于控制信道之上，eC = 扩展信道位于控制信道之下） |
| **frequency** (*integer [0..4294967295]*; 默认：) | AP 工作时的信道频率值，单位为 MHz。 |
| **name** (*string*; 默认：) | 信道组模板的描述性名称 |
| **tx-power** (*integer [-30..40]*; 默认：) | CAP 接口的发送功率（针对整个接口而非单个链）单位为 dBm。不能设置为高于国家法规或接口允许的值。默认使用国家或接口允许的最大值。 |
| **width** (; 默认：) | 设置信道宽度，单位为 MHz。（例如 20、40） |
| **save-selected** (; 默认：**yes**) | 为 CAP 射频保存所选信道 - 在 CAP 重新连接到 CAPsMAN 后将选择此信道并使用它，直到为此 CAP 完成信道重新优化。 |

### Datapath 配置 {#datapath-configuration}

Datapath 设置控制与数据转发相关的方面。在 CAPsMAN 上，datapath 设置可在 datapath 模板菜单 `/caps-man/datapath` 中配置，也可直接在使用 **datapath.** 前缀设置的配置模板或接口菜单中配置。

有 2 种主要转发模式：

- 本地转发模式，其中 CAP 在本地向无线接口转发数据以及从无线接口转发数据。
- Manager 转发模式，其中 CAP 将通过无线接收的所有数据发送到 CAPsMAN，并且仅通过无线发送从 CAPsMAN 接收的数据。在此模式下，甚至客户端到客户端转发也由 CAPsMAN 控制和执行。

转发模式按接口配置——因此，如果一个 CAP 提供 2 个射频接口，一个可以配置为在本地转发模式下运行，另一个可以配置为在 Manager 转发模式下运行。这同样适用于 Virtual-AP 接口——每个接口可以具有与主接口或其他 Virtual-AP 接口不同的转发模式。

大多数 datapath 设置仅在 Manager 转发模式下使用，因为在本地转发模式下，CAPsMAN 无法控制数据转发。

有以下 datapath 设置：

- bridge -- 启用时要将接口作为网桥端口添加到的网桥接口。
- bridge-cost -- 作为网桥端口添加时使用的网桥端口开销。
- bridge-horizon -- 作为网桥端口添加时使用的网桥 horizon。
- client-to-client-forwarding -- 控制是否允许连接到该接口的无线客户端之间进行客户端到客户端转发；在本地转发模式下，此功能由 CAP 执行，否则由 CAPsMAN 执行。
- local-forwarding -- 控制转发模式。
- openflow-switch -- 启用时要将接口作为端口添加到的 OpenFlow 交换机。
- vlan-id -- 如果 vlan-mode 启用 VLAN 标记，则分配给接口的 VLAN ID。
- vlan-mode -- VLAN 标记模式指定是否应为接口分配 VLAN 标记（使所有接收的数据都打上 VLAN 标记，并允许接口仅发送带有指定标记的数据）。

### 本地转发模式 {#local-forwarding-mode}

在此模式下，CAP 上的无线接口像普通接口一样工作，并参与正常的数据转发。无线接口将接受数据/将数据传递到 CAP 上的网络栈。CAPsMAN 不参与数据转发，也不处理任何数据帧。它只控制接口配置和客户端关联过程。

CAP 上的无线接口会将其配置改为“启用”，其状态和一些相关参数（例如 mac-address、arp、mtu）将反映 CAPsMAN 上的接口。请注意，无线相关配置**不会**反映 CAPsMAN 实际应用的接口配置：

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

Virtual-AP 接口以动态方式添加这一事实在一定程度上限制了 CAP 上用于数据转发的静态配置可能性，例如为 Virtual-AP 接口分配地址。这不适用于主无线接口。

为克服此问题，可以在 CAP 上使用 static-virtual 设置，这将创建静态虚拟接口而不是动态接口，并允许为这些接口分配 IP 配置。在应用来自 CAPsMAN 的配置时，使用 MAC 地址来记住每个静态接口。如果两个或更多静态接口具有相同的 MAC 地址，则配置可能会以随机顺序应用。

为便于数据转发配置，可以将 CAP 配置一个网桥，当接口由 CAPsMAN 启用时，接口会自动作为端口添加到该网桥。这可以在 `/interface/wireless/cap` 菜单中完成。

### Manager 转发模式 {#manager-forwarding-mode}

在此模式下，CAP 将通过无线接收的所有数据发送到 CAPsMAN，并且仅通过无线发送从 CAPsMAN 接收的数据。CAPsMAN 完全控制数据转发，包括客户端到客户端转发。CAP 上的无线接口被禁用，不参与网络：

```
 ...
 1 X  ;;; managed by CAPsMAN
      ;;; channel: 5180/20-Ceee/ac, SSID: master, manager forwarding
      name="wlan2" mtu=1500 mac-address=00:03:7F:48:CC:07 arp=enabled 
      interface-type=Atheros AR9888 mode=ap-bridge ssid="merlin" 
 ...
```

Virtual-AP 接口也会创建为“禁用”，并且不参与 CAP 上的数据转发。

### 访问列表 {#access-list}

CAPsMAN 上的访问列表是一个有序规则列表，用于允许/拒绝客户端连接到 CAPsMAN 控制下的任何 CAP。当客户端尝试连接到由 CAPsMAN 控制的 CAP 时，CAP 会将该请求转发给 CAPsMAN。作为注册过程的一部分，CAPsMAN 会查询访问列表，以确定是否应允许该客户端连接。访问列表的默认行为是允许连接。

访问列表规则会逐条处理，直到找到匹配规则。然后执行匹配规则中的操作。如果操作指定应接受客户端，则接受该客户端，并可能用访问列表规则中指定的参数覆盖其默认连接参数。

访问列表在 `/caps-man/access-list` 菜单中配置。访问列表规则有以下参数：

- 客户端匹配参数：
  - address - 客户端 MAC 地址（或者，如果指定了 mask，则仅按掩码检查那些部分，因此要匹配 "D8:1C:79:6E:1E:FE" 中的厂商 D8，只需输入一个虚假条目，例如 "D8:00:00:00:00:00"，然后按下一行使用掩码）。
  - mask - 比较客户端地址时应用的 MAC 地址掩码。例如，使用 FF:00:00:00:00:00 仅匹配指定 MAC 地址的第一个八位组。在上面的示例中，无论输入的 MAC 是什么，它都只匹配第一个八位组。同样，输入 00:00:00:00:00:FF 将仅匹配假设 MAC "D8:1C:79:6E:1E:FE" 的最后一个八位组（FE）。因此，在 mac 行中，如果您要使用这样的掩码，只需输入 00:00:00:00:00:FE。
  - interface - 可选接口，用于与客户端实际连接的接口进行比较。
  - time - 规则匹配的每日时间和星期。
  - signal-range - 客户端信号必须落入的范围，规则才会匹配。
- 操作参数 - 指定客户端匹配时采取的操作：
  - accept - 接受客户端。
  - reject - 拒绝客户端。
  - query-radius - 查询 RADIUS 服务器，确定是否允许特定客户端连接。
- 连接参数：
  - ap-tx-limit - 朝向客户端方向的发送速率限制。
  - client-tx-limit - 朝向 AP 方向的发送速率限制（仅适用于 RouterOS 客户端）。
  - client-to-client-forwarding - 指定是否允许将此客户端收到的数据转发到连接到同一接口的其他客户端。
  - private-passphrase - 如果使用某种 PSK 认证算法，则为此客户端使用的 PSK 口令。
  - radius-accounting - 指定如果为此客户端进行 RADIUS 认证，是否应使用 RADIUS 流量计费。
  - vlan-mode - VLAN 标记模式指定来自客户端的流量是否应打上标记（并在发往客户端时取消标记）。
  - vlan-id - 进行 VLAN 标记时使用的 VLAN ID。

### 注册表 {#registration-table}

注册表包含连接到由 CAPsMAN 控制的射频的客户端列表，可在 `/caps-man/registration-table` 菜单中查看：

```
[admin@CM] /caps-man> registration-table print
 # INTERFACE                   MAC-ADDRESS       UPTIME                RX-SIGNAL
 0 cap1                        00:03:7F:48:CC:0B 1h38m9s210ms                -36
```

## 示例 {#examples}

### 使用主接口和从接口的基本配置 {#basic-configuration-with-master-and-slave-interface}

创建用于 WPA2 PSK 的安全模板，不指定口令：

```
[admin@CM] /caps-man/security>add name="wpa2psk" authentication-types=wpa2-psk encryption=aes-ccm
```

创建供主接口使用的配置模板：

- 在配置中指定 WPA2 口令。
- 在配置中指定信道设置。

```
[admin@CM] /caps-man/configuration> add name=master-cfg ssid=master security=wpa2psk
security.passphrase=12345678 channel.frequency=5180 channel.width=20 channel.band=5ghz-a
```

创建供虚拟 AP 接口使用的配置模板：

- 在配置中指定不同的 WPA2 口令。

```
[admin@CM] /caps-man/configuration> add name=slave-cfg ssid=slave security=wpa2psk
security.passphrase=87654321
```

创建一条预配规则，匹配任何射频，并使用 master-cfg 和 slave-cfg 创建动态接口：

```
[admin@CM] /caps-man/provisioning> add action=create-dynamic-enabled master-configuration=master-cfg
slave-configurations=slave-cfg
```

现在，当某个 AP 连接并被预配时，将创建 2 个动态接口（一个主接口和一个从接口）：

```
[admin@CM] /caps-man/interface> print detail 
Flags: M - master, D - dynamic, B - bound, X - disabled, I - inactive, R - running 
 0 MDB  name="cap1" mtu=1500 l2mtu=2300 radio-mac=00:0C:42:1B:4E:F5 master-interface=none 
        configuration=master-cfg 

 1  DB  name="cap2" mtu=1500 l2mtu=2300 radio-mac=00:00:00:00:00:00 master-interface=cap1 
        configuration=slave-cfg 
```

假设有一个不支持所配置频率的 AP 连接进来，并且无法进入工作状态：

```
[admin@CM] /caps-man/interface> pr
Flags: M - master, D - dynamic, B - bound, X - disabled, I - inactive, R - running 
 #      NAME                                 RADIO-MAC         MASTER-INTERFACE                               
 0 MDB  ;;; unsupported band or channel
        cap3                                 00:0C:42:1B:4E:FF none    
 ...
```

我们可以在接口设置中覆盖此特定射频的信道设置，而不影响 master-cfg 模板：

```
[admin@CM] /caps-man/interface> set cap3 channel.frequency=2142 channel.band=2ghz-b/g
```

允许特定 MAC 地址范围匹配访问列表，例如匹配所有 Apple 设备：

```
[admin@CM] /caps-man/access-list> add mac-address=18:34:51:00:00:00 mac-address-mask=FF:FF:FF:00:00:00 action=accept
```

配置 DHCP Server Option 138，以在 CAP 板上设置 CAPsMAN 地址

```
[admin@CM] /ip/dhcp-server/network/set <network-id> caps-manager=<capsman-server-ip>
```

DHCP 客户端将在 `/ip/dhcp-client/print detail` 中看到此 CAPsMAN IP。

### 使用证书的配置 {#configuration-with-certificates}

您可能希望在 CAPsMAN 中配置证书，以使用 *Require Peer Certificate* 和 *Lock To Caps Man* 等选项。这些选项可提高 CAPsMAN 网络的安全性，并在某些情况下提高稳定性。没有特定证书时，CAP 无法连接到 CAPsMAN，反之亦然。

#### 快速简便配置 {#fast-and-easy-configuration}

这是在 CAPsMAN 设置中使用证书的基本配置。此示例假设您的 CAPsMAN 和 CAP 上已有基本配置。最好在不会持续增长的 CAPsMAN 网络中使用此配置。有关更多详细信息，请阅读 [CAP 到 CAPsMAN 的连接](#cap-to-capsman-connection)。

**CAPsMAN 设备：**

在 CAPsMAN Manager 菜单中，将 *Certificate* 和 *CA Certificate* 设置为 *auto*：

```
/caps-man/manager
set ca-certificate=auto certificate=auto
```

打印输出：

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

CAPsMAN 设备将首先生成 *CA-Certificate*，然后生成依赖于 *CA-Certificate* 的 *Certificate*。

**CAP 设备：**

在 CAP 配置中设置为 *request* 证书：

```
/interface/wireless/cap
set certificate=request
```

CAP 将连接到 CAPsMAN 并请求证书。CAP 将从 CAPsMAN 接收 *CA-Certificate*，并创建另一个证书供 CAP 使用。

**结果**

在 CAP 设备的 CAP 菜单中，*Requested Certificate* 已设置：

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

此外，还获得两个证书，可在 *Certificate* 菜单中看到：

```
[admin@CAP] > /certificate/print 
Flags: K - private-key, D - dsa, L - crl, C - smart-card-key, A - authority, I - issued, R - revoked, E - expired, T - trusted 
 #          NAME              COMMON-NAME              SUBJECT-ALT-NAME                                           FINGERPRINT             
 0     A  T _0                CAPsMAN-CA-D4CA6D987C26                                                             383e63d7b...
 1 K        CAP-D4CA6D7F45BA  CAP-D4CA6D7F45BA                                                                    d495d1a94...
```

在 CAPsMAN 设备的 Certificate 菜单中会创建三个证书：CAPsMAN 和 CAPsMAN-CA 证书，以及颁发给 CAP 的证书：

```
[admin@CAPsMAN] > /certificate/print 
Flags: K - private-key, D - dsa, L - crl, C - smart-card-key, A - authority, I - issued, R - revoked, E - expired, T - trusted 
 #          NAME                     COMMON-NAME              SUBJECT-ALT-NAME                                    FINGERPRINT         
 0 K   A  T CAPsMAN-CA-D4CA6D987C26  CAPsMAN-CA-D4CA6D987C26                                                      383e63d7b...
 1 K    I   CAPsMAN-D4CA6D987C26     CAPsMAN-D4CA6D987C26                                                         02b0f7ff4...
 2      I   issued_1                 CAP-D4CA6D7F45BA                                                             d495d1a94...
```

**另外**

如果您希望仅允许具有有效证书的 CAP 连接到此 CAPsMAN，可以在 CAPsMAN 设备上将 *Require Peer Certificate* 设置为 *yes*：

```
/caps-man/manager
set require-peer-certificate=yes
```

但是，当您想向 CAPsMAN 网络添加新的 CAP 设备时，必须先将此选项设置为 *no*，然后在 CAP 获得证书后再设回 *yes*。每次更改此选项时，CAPsMAN 都会丢弃所有动态接口，CAP 将再次尝试连接。

如果您想将 CAP 锁定到特定 CAPsMAN，并确保它不会连接到其他 CAPsMAN，应将 *Lock To CAPsMAN* 选项设置为 *yes*。此外，您可以通过在 CAP 设备上设置 *CAPsMAN Certificate Common Names* 来指定要锁定到的 CAPsMAN：

```
/interface/wireless/cap
set lock-to-caps-man=yes
set caps-man-certificate-common-names=CAPsMAN-D4CA6D987C26
```

#### 手动证书并使用 SCEP 签发 {#manual-certificates-and-issuing-with-scep}

通过此示例，您可以为 CAPsMAN 创建自己的证书，并控制向 CAP 颁发证书的过程。此配置在大型且不断增长的 CAPsMAN 网络中很有用。根据您的环境和需求，此示例的许多部分可以采用不同方式完成。此时，了解一些关于[证书](../../../authentication-authorization-accounting/certificates.md)及其[应用](../../../authentication-authorization-accounting/certificates.md#sign-certificate)的知识可能会有帮助。

**CAPsMAN 设备：**

在 *Certificate* 菜单中为 CA 证书和 CAPsMAN 服务器证书添加证书模板：

```
/certificate
add name=CA-temp common-name=CA
add name=CAPsMAN-temp common-name=CAPsMAN
```

现在*签署*证书模板。首先*签署* CA 证书，并使用 CAPsMAN 设备 IP 作为 *CA CRL Host*：

```
/certificate
sign CA-temp ca-crl-host=10.5.138.157 name=CA
sign CAPsMAN-temp ca=CA name=CAPsMAN
```

或者，前两个步骤可以通过 CAPsMAN Manager 菜单中 *Certificate* 和 *CA-Certificate* 选项的 auto 设置完成，请参阅[快速简便配置](#fast-and-easy-configuration)。

*导出* CA 证书。您将需要在 CAP 设备上*导入*它。您可以使用 *Download -> Drag&Drop* 到 CAP 设备；在此示例中，稍后从 CAP 设备使用 *fetch* 命令。建议使用较长的口令——如果口令落入错误的人手中，较长的口令需要更长时间才能破解：

```
/certificate
export-certificate CA export-passphrase=thelongerthebetterpassphrase
```

创建一个 *SCEP 服务器*，用于向 CAP 设备颁发和授予证书：

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

将 CAPsMAN 设备上导出的 CA 证书下载到 CAP 设备。此示例中使用 *fetch*；不过还有许多其他方式：

```
/tool/fetch address=10.5.138.157 src-path=cert_export_CA.crt user=admin password="123" mode=ftp
```

在 *Certificate* 菜单中导入来自 CAPsMAN 设备的 CA 证书：

```
/certificate> import file-name=cert_export_CA.crt passphrase=thelongerthebetterpassphrase
```

为 CAP 添加证书模板：

```
/certificate
add name=CAP1 common-name=CAP1
```

请求 CAPsMAN 设备使用 SCEP 为此证书授予密钥：

```
/certificate
add-scep template=CAP1 scep-url="https://10.5.138.157/scep/CAPsMAN"
```

您将需要返回 CAPsMAN 设备为此证书授予密钥。

在 CAP 菜单中设置刚刚创建的证书：

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

**结果**

现在 CAP 应该能够连接到 CAPsMAN。可在 *CAPsMAN interfaces* 中查看它是否连接。在 CAPsMAN 设备的 *Certificate* 菜单中可以看到三个证书：CA、CAPsMAN，以及颁发给 CAP 的证书：

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
