---
sidebar_key: "getting-started/routeros-licensing/mikrotik-hardware"
sidebar_position: 2
title: "MikroTik 硬件许可"
sidebar_label: "MikroTik 硬件许可"
description: "运行 RouterOS 的 MikroTik 硬件路由器附带预安装许可证，这些许可证决定隧道限制和用户会话等功能。许可证级别从试用模式到无限制功能不等，价格因级别而异。用户可通过 CLI 或管理工具查看许可证，并通过预付费密钥或与设备 ID 绑定的直接购买进行升级。"
tags:
  - 'licensing'
source: https://manual.mikrotik.com/docs/getting-started/routeros-licensing/mikrotik-hardware
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 许可证基础 {#licensing-basics}

运行 RouterOS 的 MikroTik 硬件路由器随附预装许可证。如果您已购买基于 RouterOS 的设备，则无需额外步骤。

## RouterOS 许可证密钥级别 {#routeros-license-key-levels}

可以从 CLI 系统控制台获取许可证信息：

```text
[admin@MikroTik] > /system/license/print
    software-id: "ABCD-1234"
         nlevel: 6
       features:
[admin@MikroTik] >
```

相同信息也可在 [WinBox](../../../management-tools/winbox.md) 或 [WebFig](../../../management-tools/webfig.md) 中查看。

```text
[admin@MikroTik] /system/license/print 
  software-id: TRPC-YYR2
   expires-in: 23h48m24s
```

许可证级别之间的差异如下表所示：

:::info
级别 2 是旧版（2.8 之前）许可证格式的过渡许可证。这些许可证已不再提供。现有的级别 2 许可证将继续正常工作，但升级需要购买新许可证。级别 3 许可证仅用于无线站点（客户端/CPE）用途。
:::

<WideTable>

| **级别编号** | **0（试用模式）** | **1（免费演示）** | **3（WISP CPE）** | **4（WISP）** | **5（WISP）** | **6（控制器）** |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| **价格** | [无密钥](https://www.mikrotik.com/download.html) | [免费（需要注册）](https://mikrotik.com/client/) | 不出售 | $45 | $95 | $250 |
| **Wireless4 AP 模式（PtMP）** | 24 小时试用 | - | no | yes | yes | yes |
| **Wireless6 AP 模式** | - | - | yes | yes | yes | yes |
| **PPPoE 隧道** | 24 小时试用 | 1 | 200 | 200 | 500 | 无限制 |
| **PPTP 隧道** | 24 小时试用 | 1 | 200 | 200 | 500 | 无限制 |
| **L2TP 隧道** | 24 小时试用 | 1 | 200 | 200 | 500 | 无限制 |
| **OVPN 隧道** | 24 小时试用 | 1 | 200 | 200 | 无限制 | 无限制 |
| **HotSpot 活跃用户** | 24 小时试用 | 1 | 1 | 200 | 500 | 无限制 |
| **User Manager 活跃会话** | 24 小时试用 | 1 | 10 | 20 | 50 | 无限制 |

</WideTable>

:::info
如果某项功能未列出，则不受许可证限制。
:::

:::info
**RouterBOARD Software ID** 绑定到设备存储。
:::

### 所有许可证 {#all-licenses}

- 永不过期 — 已获得许可且正在运行的路由器可无限期使用。
- 支持无限数量的接口。
- 每个许可证仅对单次安装有效。
- 包含无限制的软件升级。

:::warning
**wifi-qcom** 驱动支持 PTMP 操作，不受许可证级别限制。**Mode: AP** 在所有 **wifi-qcom** 设备上普遍可用，可让多个客户端站点连接。
:::

## 升级设备许可证级别 {#upgrading-the-device-license-level}

如果您需要升级设备许可证级别，必须购买更高级别的许可证，可以作为[预付密钥](#prepaid-key)购买，也可以直接购买与设备 **Software ID** 绑定的 [RouterOS 许可证](#how-to-purchase-a-routeros-license-key)。

许可证密钥以字符块形式提供。可以从您的 MikroTik 账户或购买后收到的电子邮件中复制，然后粘贴到路由器中。您可以将密钥直接粘贴到终端，或使用 WinBox 许可证菜单中的 **粘贴密钥** 选项。许可证生效需要重启。

### 预付费密钥 {#prepaid-key}

预付密钥是一种可提前为 MikroTik 产品购买的许可证。它允许您获取许可证而无需立即将其分配给特定设备。获取后，预付密钥可用于升级 CHR 实例，或使用目标 Software ID 转换为 x86 系统或 RouterBOARD 设备的许可证密钥。

## 如何购买 RouterOS 许可证密钥 {#how-to-purchase-a-routeros-license-key}

1. 前往 [mikrotik.com](https://mikrotik.com) 并登录您的账户。
2. 导航到 **“购买 RouterOS 许可证密钥”** 部分。
3. 选择所需的许可证密钥级别。
4. 将密钥类型设置为 **“License key”**。
5. 在许可证密钥信息字段中，粘贴您设备的 Software ID。
6. 选择部署所需的任何可选密钥功能。
7. 点击 **“将密钥加入购物车”** 按钮。
8. 点击 **“继续结账”** 完成购买。

![Purchase a RouterOS License Key](/img/8bbe36f9bc0a6d5f.png)

## 检查并完成购买 {#review-and-complete-your-purchase}

请仔细检查订单详情，然后使用 **信用卡**（CC）或 **PayPal** 付款。

![Purchase a RouterOS License Key](/img/bcf666707f80bd5b.png)

恭喜！您已成功购买 RouterOS 许可证密钥。

## 自定义无线信道（仅适用于 Atheros 92xx 设备） {#custom-wireless-channels-only-for-atheros-92xx-devices}

高级信道功能为无线接口配置提供了更多可能性：

- **扩展扫描列表：** 同时覆盖多个频段和信道宽度，以实现全面的无线接口配置。
- **精确频率自定义：** 在兼容硬件上支持非标准信道中心频率（以 kHz 为粒度指定）。
- **灵活信道宽度：** 在硬件支持的情况下，允许配置非标准信道宽度（以 kHz 为粒度指定）。

## 如何将预付密钥转换为 RouterOS 许可证密钥 {#how-to-convert-a-prepaid-key-to-a-routeros-license-key}

1. **购买 RouterOS [预付密钥](#prepaid-key)。**

   - 登录您的 [mikrotik.com](https://mikrotik.com) 账户。
   - 如果尚未购买，请购买 RouterOS 预付密钥。

2. **进入“从预付密钥生成密钥”部分。**

   - 在您的账户中导航到“从预付密钥生成密钥”部分。

3. **选择并转换预付密钥。**

   - 从列表中选择所需的预付密钥。
   - 输入要升级许可证级别的路由器的 **Software ID**。

![](/img/e711992d34ff1204.png)

1. **生成许可证密钥。**

   - 按“Generate”。
   - 将显示确认消息：“已成功将预付密钥转换为新许可证！”。

![](/img/b2441fab5c176c43.png)

1. **应用许可证密钥。**

   - 复制生成的许可证密钥。
   - 将其粘贴到设备中以应用许可证。

您已成功将预付密钥转换为路由器的许可证密钥。

## 获取和管理许可证 {#obtaining-and-managing-licenses}

### 在哪里可以购买 RouterOS 许可证密钥？ {#where-can-i-buy-a-routeros-license-key}

所有 MikroTik 硬件设备都包含预装的 RouterOS 许可证。

### 如果设备上的许可证丢失 {#if-you-have-lost-a-license-on-your-device}

如果您的路由器因任何原因丢失了许可证，请将路由器升级到最新的可用 RouterOS 版本，并使用您的 [mikrotik.com](https://mikrotik.com) 账户中的 **“请求许可证密钥”** 选项。提交请求时，请使用 RouterOS 中 `/system/license` 菜单下的 Software ID 和序列号。收到后，将许可证密钥应用到您的设备。如果请求功能无法使用，请联系 [support@mikrotik.com](mailto:support@mikrotik.com) 寻求帮助。

### 我的路由器丢失了许可证，可以申请替换密钥吗？ {#my-router-has-lost-the-license-can-i-request-a-replacement-key}

不可以，替换密钥仅适用于 x86。

:::warning
*如果许可证丢失是由于非经销商在保修范围内进行的维修所致，您将需要以全价购买新的 RouterOS 许可证。*
:::

## 使用许可证 {#using-the-license}

### 我可以转让 MikroTik 硬件许可证吗？ {#can-i-transfer-a-mikrotik-hardware-license}

MikroTik 硬件包含永久绑定到设备的嵌入式许可证。此许可证在任何情况下都不能转移到另一系统。此限制也适用于路由器运行期间所应用的所有许可证升级。

### 是否可以将路由器许可证升级或转移到 x86 系统或 CHR 许可证？ {#is-it-possible-to-upgrade-or-transfer-the-router-license-to-an-x86-system-or-a-chr-license}

无法转移设备许可证。

## 相关指南 {#related-guides}

### x86 安装 {#x86-installation}

介绍 RouterOS x86 系统要求和安装方法，包括 USB 和 Netinstall 部署。

[x86 安装指南](../../installation-and-upgrade/install/x86-installation.md)
