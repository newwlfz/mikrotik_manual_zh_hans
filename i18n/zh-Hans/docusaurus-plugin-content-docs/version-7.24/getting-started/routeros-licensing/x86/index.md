---
sidebar_key: "getting-started/routeros-licensing/x86/index"
sidebar_position: 3
title: "x86 许可"
sidebar_label: "x86 许可"
description: "本页介绍 MikroTik RouterOS 的 x86 系统授权，涵盖许可证密钥获取、Software ID 要求、系统先决条件，以及许可证级别详情，包括 trial、free demo、WISP 和 controller 许可证的功能与定价。"
tags:
  - 'licensing'
  - 'software-id'
source: https://manual.mikrotik.com/docs/7.24/getting-started/routeros-licensing/x86
captured_at: '2026-11-04T11:29:18+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 许可证基础 {#licensing-basics}

对于 x86 系统（基于 PC 的安装），必须获取许可证密钥。每个系统都有一个唯一标识符，称为 **Software ID**，用于许可目的。

许可证密钥以字符块形式提供。可以从您的 MikroTik 账户或购买后收到的电子邮件中复制，然后粘贴到路由器中。您可以将密钥直接粘贴到终端，或使用 WinBox 许可证菜单中的 **粘贴密钥** 选项。许可证生效需要重启。

:::info
**x86 Software ID** 绑定到存储设备（例如 NAND、SSD、HDD、NVMe）的 MBR。
:::

购买许可证前，请确认重启后 Software ID 保持不变。

:::danger
如果底层存储或配置不稳定，Software ID 可能会发生变化。例如，在以下情况下可能发生：

- 使用有缺陷或即将故障的存储设备（SSD、HDD、NVMe 等）。
- RAID 配置设置不正确或无法持久保留。
- 两次启动之间使用了不同的存储控制器或适配器。

:::

### 系统要求 {#system-requirements}

- **软件包版本：** RouterOS v6.34 或更高版本。
- **主机 CPU：** x86-64 架构（64 位）。
- **RAM：** 512 MB 或更多。
- **磁盘：** 128 MB 或更多。
- **RouterOS v6：** 支持的最大硬盘大小为 16 GB。
- **RouterOS v7：** 最大 RAM 和磁盘空间受 Linux 内核 5.6.3 限制，并取决于具体硬件。

所需的最小 RAM 取决于接口数量和 CPU 数量。使用以下公式计算近似值：

- **RouterOS v6：** `RAM = 128 + [ 8 × (CPU_COUNT) × (INTERFACE_COUNT - 1) ]`
- **RouterOS v7：** `RAM = 512 + [ 8 × (CPU_COUNT) × (INTERFACE_COUNT - 1) ]`

## RouterOS 许可证密钥级别 {#routeros-license-key-levels}

可以从 CLI 系统控制台获取许可证信息：

```text
[admin@MikroTik] > /system/license/print
    software-id: "ABCD-1234"
         nlevel: 6
       features:
[admin@MikroTik] >
```

也可以从等效的 [WinBox](../../../management-tools/winbox.md) 或 [WebFig](../../../management-tools/webfig.md) 菜单中查看。

安装 x86 系统后，RouterOS 以 **Trial mode** 运行，无任何限制。你有 24 小时注册 **Level 1 (Free Demo)** 许可证，或购买 Level 4、5 或 6 许可证并应用有效密钥。

```text
[admin@MikroTik] /system/license/print 
  software-id: TRPC-YYR2
   expires-in: 23h48m24s
```

许可证级别之间的差异如下表所示：

<WideTable>

| **级别编号** | **0（试用模式）** | **1（Free Demo）** | **4（WISP）** | **5（WISP）** | **6（Controller）** |
| :-- | :-- | :-- | :-- | :-- |  :-- |
| **价格** | [无密钥](https://www.mikrotik.com/download.html) | [免费（需要注册）](https://mikrotik.com/client/) | $45 | $95 | $250 |
| **Wireless4 AP 模式（PtMP）** | 24 小时试用 | - | yes | yes | yes |
| **Wireless6 AP 模式** | - | - | yes | yes | yes |
| **PPPoE 隧道** | 24 小时试用 | 1 | 200 | 500 | 无限制 |
| **PPTP 隧道** | 24 小时试用 | 1 | 200 | 500 | 无限制 |
| **L2TP 隧道** | 24 小时试用 | 1 | 200 | 500 | 无限制 |
| **OVPN 隧道** | 24 小时试用 | 1 | 200 | 无限制 | 无限制 |
| **HotSpot 活跃用户** | 24 小时试用 | 1 | 200 | 500 | 无限制 |
| **User Manager 活跃会话** | 24 小时试用 | 1 | 20 | 50 | 无限制 |

</WideTable>

:::info
如果某项功能未列出，则不受许可证限制。
:::

:::note
Level 2 是旧版（2.8 之前）许可证格式的过渡许可证。这些许可证已不再提供。现有 Level 2 许可证将继续工作，但升级需要购买新许可证。Level 3 许可证仅用于无线站点（客户端/CPE）。*对于 x86 PC，Level 3 不可单独购买。*
:::

### 所有许可证 {#all-licenses}

- 永不过期 — 已获得许可并运行中的路由器可以无限期使用。
- 支持无限数量的接口。
- 每个许可证仅对单次安装有效。
- 包含无限次软件升级（例外：从版本 7.8 开始，演示许可证不允许升级 RouterOS 版本）。

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

![](/img/8bbe36f9bc0a6d5f.png)

## 检查并完成购买 {#review-and-complete-your-purchase}

请仔细检查订单详情，然后使用 **信用卡**（CC）或 **PayPal** 付款。

![](/img/bcf666707f80bd5b.png)

恭喜！您已成功购买 RouterOS 许可证密钥。

## 如何将 Prepaid Key 转换为 x86 的许可证密钥 {#how-to-convert-a-prepaid-key-to-a-license-key-for-x86}

1. **购买 RouterOS [预付密钥](./index.md#prepaid-key)。**

   - 登录您的 [mikrotik.com](https://mikrotik.com) 账户。
   - 如果尚未购买，请购买 RouterOS 预付密钥。

2. **进入“从预付密钥生成密钥”部分。**

   - 在您的账户中导航到“从预付密钥生成密钥”部分。

3. **选择并转换预付密钥。**

   - 从列表中选择所需的 Prepaid Key。
   - 输入要获得许可的 x86 设备的 **Software ID**，或要升级许可证级别的路由器的 **Software ID**。

![](/img/e711992d34ff1204.png)

1. **生成许可证密钥。**

   - 按“Generate”。
   - 将显示确认消息：“已成功将预付密钥转换为新许可证！”。

![](/img/b2441fab5c176c43.png)

1. **应用许可证密钥。**

   - 复制生成的许可证密钥。
   - 将其粘贴到 x86 设备以应用许可证。

你已成功将 Prepaid Key 转换为 x86 设备的许可证密钥。

## 替换密钥 {#replacement-key}

Replacement Key 是 MikroTik 支持团队在 x86 存储设备故障，或运行 RouterOS 的 x86 实例丢失许可证时发放的特殊许可证密钥。其费用为 $10，且每个原始密钥只能发放一次。

在发放 Replacement Key 之前，MikroTik 支持可能要求提供原始驱动器已故障的证明。在某些情况下，这包括将故障驱动器物理寄送给 MikroTik。

## Replacement Key 申请 {#replacement-key-request}

1. **登录并提交申请**
   - 登录你在 [mikrotik.com](https://mikrotik.com) 上的账户。
   - 使用“[Support Contact Form](https://help.mikrotik.com/servicedesk/servicedesk/)”提交申请，或直接发送电子邮件至 [support@mikrotik.com](mailto:support@mikrotik.com)。
   - 在申请中包含以下信息：
     - **明确说明为什么需要 Replacement Key。**
     - **旧 Software ID 及其注册时使用的账户。**

2. **等待确认并应用密钥**
   - 一旦 MikroTik 支持团队确认 Replacement Key 已添加到你的账户，请登录并导航到 **"Make a key from replacement key"** 部分。
   - 继续激活。

![](/img/d9913b7629d99ed3.png)

1. **选择许可证级别**
   - 选择你希望应用 Replacement Key 的许可证级别。

2. **输入新的 Software ID**
   - 输入目标设备的 **新 Software ID**。

3. **完成购买**
   - 单击 **"Add license replacement to cart"** 前往结账并完成付款。

![](/img/1e388024f0024c24.png)

1. **获取密钥**
   - 包含新许可证密钥的确认电子邮件将发送到你账户注册的电子邮件地址。
   - 新生成的密钥也可以在 **"Search and view all keys"** 部分的 **"Purchased YYYY"** 文件夹下找到，其中 **"YYYY"** 表示当前年份。

:::warning
*每个原始密钥只能发放一个 Replacement Key。同一密钥无法使用 Replacement Key 流程两次。如果需要第二次更换，必须为 RouterOS 设备购买新密钥。*
:::

## 获取和管理许可证 {#obtaining-and-managing-licenses}

### 在哪里可以购买 RouterOS 许可证密钥？ {#where-can-i-buy-a-routeros-license-key}

要为 **x86 PC 安装**购买许可证，你需要注册一个[网站账户](https://www.mikrotik.com/client)，并使用账户门户中提供的[购买 RouterOS 许可证密钥](#how-to-purchase-a-routeros-license-key)选项。

### 可以升级 x86 许可证级别吗？ {#can-i-upgrade-the-x86-license-level}

要升级 x86 许可证级别，你必须以全价购买所需的许可证密钥。

### 如果你在其他地方购买了密钥 {#if-you-purchased-your-key-elsewhere}

如果你的许可证是通过第三方供应商购买的，请直接联系该供应商寻求支持，因为他们负责为其销售的许可证提供帮助。

### 如果我有许可证并想将其转移到另一个账户 {#if-i-have-a-license-and-want-to-move-it-to-another-account}

x86 许可证密钥一经应用，就会绑定到你的 MikroTik 账户，无法转移到另一个账户。唯一可以在账户之间转移的许可证类型是未使用的 Prepaid Key。从 Training 收到的礼品 Prepaid Key 不可转移。要转移已购买的 Prepaid Key，请在你的 MikroTik 账户中导航到 **ROUTEROS KEYS** 部分下的 **Transfer prepaid keys**。

### 如果设备上的许可证丢失 {#if-you-have-lost-a-license-on-your-device}

如果您的路由器因任何原因丢失了许可证，请将路由器升级到最新的可用 RouterOS 版本，并使用您的 [mikrotik.com](https://mikrotik.com) 账户中的 **“请求许可证密钥”** 选项。提交请求时，请使用 RouterOS 中 `/system/license` 菜单下的 Software ID 和序列号。收到后，将许可证密钥应用到您的设备。如果请求功能无法使用，请联系 [support@mikrotik.com](mailto:support@mikrotik.com) 寻求帮助。

:::warning
*如果许可证丢失是由于非经销商在保修范围内进行的维修所致，您将需要以全价购买新的 RouterOS 许可证。*
:::

## 使用许可证 {#using-the-license}

### 我可以格式化或重新刷写驱动器吗？ {#can-i-format-or-re-flash-the-drive}

使用非 MikroTik 工具（例如 `dd` 或 `fdisk`）格式化或重新镜像存储设备会破坏你的许可证。

在尝试之前请格外小心，并联系 MikroTik 支持。此类操作不推荐，Replacement Key 请求可能会被拒绝。

要安全地重新安装 RouterOS，请使用官方 MikroTik 工具（例如 **Netinstall**），或通过创建可启动安装介质（例如 USB 闪存盘）从磁盘镜像进行安装。

### 我可以在多少台计算机上使用该许可证？ {#how-many-computers-can-i-use-the-license-on}

RouterOS 许可证只能用于单个设备/系统。

在 x86 系统上，许可证绑定到 **Software ID**，而 Software ID 绑定到存储设备（MBR）。这允许你将同一存储设备移到另一台计算机而不丢失许可证。但是，许可证不能转移到不同的存储设备。

格式化或覆盖存储设备将永久擦除许可证，需要获取新许可证。

:::danger
**重要：** 移动或修改存储设备时，请谨慎执行所有操作。使用不同的存储控制器或适配器，或修改 BIOS/UEFI 设置等更改，可能会改变 Software ID 并导致许可证丢失。
:::

最佳实践是在任何硬件更改前后生成并保存 `supout.rif` 文件。如果 Software ID 发生变化，可以将这些文件提供给 MikroTik 支持进行审核。

如果 Software ID 已更改，你可以申请 Replacement Key。

### 我可以临时将存储设备用于 RouterOS 以外的其他用途吗？ {#can-i-temporarily-use-the-storage-device-for-something-else-other-than-routeros}

如上所述，不可以。

### 我可以将许可证移到另一个存储设备（例如 SSD、HDD、NVMe）吗？ {#can-i-move-the-license-to-another-storage-device-eg-ssd-hdd-nvme}

如果你当前的存储设备损坏或无法使用，可以通过申请 Replacement Key 将许可证转移到新设备。

Replacement Key 的费用为 $10。

### 我必须将整个密钥输入路由器吗？ {#must-i-type-the-whole-key-into-the-router}

不需要，只需复制密钥并将其粘贴到 **System** → **License** → **Paste Key**，然后确认重启。

![](/img/152e9782386d7b57.png)

或者，将密钥直接粘贴到 CLI 中，然后按 **Y** 重启。

### 我可以先在驱动器上安装其他操作系统，然后再重新安装 RouterOS 吗？ {#can-i-install-another-os-on-my-drive-and-then-reinstall-routeros-later}

不可以。如果你使用格式化、分区实用程序或任何其他修改 MBR 的工具，你将丢失许可证，并需要获取新许可证。此过程不是免费的（请参阅上文的 [Replacement Key](#replacement-key)）。

### 我的 RouterBOARD 丢失了 - 我可以将许可证转移到另一个系统吗？ {#i-lost-my-routerboard---can-i-transfer-the-license-to-another-system}

MikroTik 硬件包含永久绑定到设备的嵌入式许可证。此许可证在任何情况下都不能转移到另一系统。此限制也适用于路由器运行期间所应用的所有许可证升级。

### 从经销商处购买的许可证 {#licenses-purchased-from-resellers}

你从其他供应商和经销商处购买的密钥不在你的账户中。你的 [mikrotik.com](https://mikrotik.com) 账户仅包含直接从 MikroTik 购买的许可证。

### 我没有使用该软件，你们可以终止我的许可证吗？ {#i-am-not-using-the-software-can-you-terminate-my-license}

许可证是独立的密钥，MikroTik 无法远程控制你的设备。因此，无法验证许可证是否正在被积极使用。出于这个原因，MikroTik 无法终止任何已发放的许可证。

### 是否可以将 x86 许可证升级或转移到 CHR 许可证？ {#is-it-possible-to-upgrade-or-transfer-an-x86-license-to-a-chr-license}

将 x86 或 RouterBOARD 许可证升级或转移到 CHR 许可证，或反之，是不可能的。必须为 CHR 购买单独的许可证。

### 如果我在购买密钥时输入了错误的 Software ID 怎么办？ {#what-if-i-entered-the-wrong-software-id-when-purchasing-a-key}

如果许可证密钥是使用错误的 Software ID 生成的（例如，输入 `1` 而不是 `I` 这样的拼写错误），可以在不联系支持的情况下更正密钥上的 Software ID。此功能允许修正 Software ID 中最多 1-2 个字符：

1. 登录你的 [mikrotik.com](https://mikrotik.com) 账户。
2. 导航到 **"Search and view all keys"**。
3. 打开购买年份文件夹 — **"Purchased YYYY"**，其中 **"YYYY"** 表示当前年份。
4. 选择相关密钥并单击 **"Edit"**。
5. 单击 **"Fix Software ID"**。
6. 更正 Software ID 字段中的字符并保存。

## x86 安装 {#x86-installation}

介绍 RouterOS x86 系统要求和安装方法，包括 USB 和 Netinstall 部署。

[x86 安装指南](../../installation-and-upgrade/install/x86-installation.md)
