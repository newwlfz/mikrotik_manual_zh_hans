---
title: "MikroTik 硬件授权"
description: "运行 RouterOS 的 MikroTik 硬件路由器预装许可证，用于确定隧道数量限制和用户会话等功能。许可证级别从试用模式到无限制功能不等，价格随级别变化。用户可以通过 CLI 或管理工具查看许可证，并通过预付密钥或与设备 ID 绑定的直接购买进行升级。"
tags:
  - 'licensing'
source: https://manual.mikrotik.com/docs/7.25/getting-started/routeros-licensing/mikrotik-hardware
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 许可基础 {#licensing-basics}

运行 RouterOS 的 MikroTik 硬件路由器预装了许可证。如果你购买了基于 RouterOS 的设备，则无需执行其他步骤。

## RouterOS 许可证密钥级别 {#routeros-license-key-levels}

许可信息可以从 CLI 系统控制台获取：

```text
[admin@MikroTik] > /system/license/print
    software-id: "ABCD-1234"
         nlevel: 6
       features:
[admin@MikroTik] >
```

也可以在 [WinBox](/docs/management-tools/winbox) 或 [WebFig](/docs/management-tools/webfig) 中查看相同信息：

```text
[admin@MikroTik] /system/license/print 
  software-id: TRPC-YYR2
   expires-in: 23h48m24s
```

各许可证级别之间的差异如下表所示：

:::info
Level 2 是从旧版（2.8 之前）许可证格式过渡而来的许可证。此类许可证已不再提供。现有 Level 2 许可证将继续有效，但升级需要购买新许可证。Level 3 许可证仅供无线站点（客户端/CPE）使用。
:::

<WideTable>

| **级别编号** | **0（试用模式）** | **1（免费演示）** | **3（WISP CPE）** | **4（WISP）** | **5（WISP）** | **6（控制器）** |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| **价格** | [无密钥](https://www.mikrotik.com/download.html) | [免费（需要注册）](https://mikrotik.com/client/) | 不销售 | $45 | $95 | $250 |
| **Wireless4 AP 模式（PtMP）** | 24h 试用 | - | 否 | 是 | 是 | 是 |
| **Wireless6 AP 模式** | - | - | 是 | 是 | 是 | 是 |
| **PPPoE 隧道** | 24h 试用 | 1 | 200 | 200 | 500 | 无限制 |
| **PPTP 隧道** | 24h 试用 | 1 | 200 | 200 | 500 | 无限制 |
| **L2TP 隧道** | 24h 试用 | 1 | 200 | 200 | 500 | 无限制 |
| **OVPN 隧道** | 24h 试用 | 1 | 200 | 200 | 无限制 | 无限制 |
| **HotSpot 活跃用户** | 24h 试用 | 1 | 1 | 200 | 500 | 无限制 |
| **User Manager 活跃会话** | 24h 试用 | 1 | 10 | 20 | 50 | 无限制 |

</WideTable>

:::info
如果某项功能未列出，则不受许可证限制。
:::

:::info
**RouterBOARD Software ID** 绑定到设备存储。
:::

### 所有许可证 {#all-licenses}

- 永不过期 —— 正在运行且已获得许可的路由器可以无限期使用。
- 支持无限数量的接口。
- 每个许可证仅对单次安装有效。
- 包含无限次软件升级。

:::warning
**wifi-qcom** 驱动支持 PTMP 操作，不受许可证级别限制。**Mode: AP** 在所有 **wifi-qcom** 设备上均可用，允许多个客户端站点连接。
:::

## 升级设备许可证级别 {#upgrading-the-device-license-level}

如果需要升级设备许可证级别，必须购买更高级别的许可证，可以是 [Prepaid key](#prepaid-key)，也可以是直接绑定到设备 **Software ID** 的 [RouterOS license](#how-to-purchase-a-routeros-license-key)。

许可证密钥以字符块形式提供。可以从 MikroTik 账户或购买后收到的电子邮件中复制该密钥，然后粘贴到路由器中。可以将密钥直接粘贴到终端中，也可以使用 WinBox License 菜单中的 **Paste Key** 选项。需要重启才能使许可证生效。

### 预付密钥 {#prepaid-key}

Prepaid Key 是一种可提前为 MikroTik 产品购买的许可证。它使你可以获取许可证，而无需立即将其分配给特定设备。获取后，Prepaid Key 可用于升级 CHR 实例，或使用目标 Software ID 转换为 x86 系统或 RouterBOARD 设备的许可证密钥。

## 如何购买 RouterOS 许可证密钥 {#how-to-purchase-a-routeros-license-key}

1. 前往 [mikrotik.com](https://mikrotik.com) 并登录你的账户。
2. 导航到 **“Purchase a RouterOS License Key”** 部分。
3. 选择所需的许可证 Key Level。
4. 将 Key Type 设置为 **“License key”**。
5. 在 License Key Information 字段中，粘贴设备的 Software ID。
6. 选择部署所需的任意可选 Key Features。
7. 点击 **“Place key in the cart”** 按钮。
8. 点击 **“Proceed to checkout”** 以完成购买。

![Purchase a RouterOS License Key](/img/8bbe36f9bc0a6d5f.png)

## 检查并完成购买 {#review-and-complete-your-purchase}

仔细检查订单详情，然后使用 **Credit Card**（CC）或 **PayPal** 完成付款。

![Purchase a RouterOS License Key](/img/bcf666707f80bd5b.png)

恭喜！你已成功购买 RouterOS 许可证密钥。

## 自定义无线信道（仅适用于 Atheros 92xx 设备） {#custom-wireless-channels-only-for-atheros-92xx-devices}

Advanced Channels 功能为无线接口配置提供了更多扩展能力：

- **扩展的 Scan-Lists：** 同时覆盖多个频段和信道宽度，以实现全面的无线接口配置。
- **精确的频率自定义：** 支持兼容硬件使用非标准信道中心频率（以 kHz 为粒度指定）。
- **灵活的信道宽度：** 在硬件支持的情况下，允许配置非标准信道宽度（以 kHz 为粒度指定）。

## 如何将 Prepaid Key 转换为 RouterOS License Key {#how-to-convert-a-prepaid-key-to-a-routeros-license-key}

1. **购买 RouterOS [Prepaid Key](#prepaid-key)。**

   - 登录你的 [mikrotik.com](https://mikrotik.com) 账户。
   - 如果尚未购买 RouterOS Prepaid Key，请购买一个。

2. **访问“Make a Key from Prepaid Key”部分。**

   - 在你的账户中导航到“Make a key from prepaid key”部分。

3. **选择并转换 Prepaid Key。**

   - 从列表中选择所需的 Prepaid Key。
   - 输入要升级许可证级别的路由器的 **Software ID**。

![](/img/e711992d34ff1204.png)

1. **生成 License Key。**

   - 按“Generate”。
   - 将显示确认消息：“Successfully converted prepaid key to a new licence!”。

![](/img/b2441fab5c176c43.png)

1. **应用 License Key。**

   - 复制生成的 license key。
   - 将其粘贴到设备中应用许可证。

你已成功将 Prepaid Key 转换为路由器的 license key。

## 获取和管理许可证 {#obtaining-and-managing-licenses}

### 在哪里可以购买 RouterOS 许可证密钥？ {#where-can-i-buy-a-routeros-license-key}

所有 MikroTik 硬件设备均包含预装的 RouterOS 许可证。

### 如果设备上的许可证丢失 {#if-you-have-lost-a-license-on-your-device}

如果由于任何原因丢失了路由器上的许可证，请将路由器升级到最新的 RouterOS 版本，并使用 [mikrotik.com](https://mikrotik.com) 账户中的 **“Request license key”** 选项。提交请求时，请使用 RouterOS 中 `/system/license` 菜单下的 Software ID 和序列号。收到后，将许可证密钥应用到你的设备。如果该请求功能无法使用，请联系 [support@mikrotik.com](mailto:support@mikrotik.com) 获取帮助。

### 我的路由器丢失了许可证，可以申请 Replacement Key 吗？ {#my-router-has-lost-the-license-can-i-request-a-replacement-key}

不可以，Replacement keys 仅适用于 x86。

:::warning
*如果许可证因非保修授权经销商执行的维修而丢失，你需要按全价购买新的 RouterOS 许可证。*
:::

## 使用许可证 {#using-the-license}

### 可以转让 MikroTik 硬件许可证吗？ {#can-i-transfer-a-mikrotik-hardware-license}

MikroTik 硬件包含永久绑定到设备的嵌入式许可证。该许可证在任何情况下都不能转移到其他系统。此限制也适用于路由器运行期间应用的任何许可证升级。

### 是否可以将路由器许可证升级或转移到 x86 系统或 CHR 许可证？ {#is-it-possible-to-upgrade-or-transfer-the-router-license-to-an-x86-system-or-a-chr-license}

无法转移设备许可证。

## 相关指南 {#related-guides}

### x86 安装 {#x86-installation}

介绍 RouterOS x86 系统要求和安装方法，包括 USB 和 Netinstall 部署。

[x86 Installation Guide](/docs/getting-started/installation-and-upgrade/install/x86-installation)
