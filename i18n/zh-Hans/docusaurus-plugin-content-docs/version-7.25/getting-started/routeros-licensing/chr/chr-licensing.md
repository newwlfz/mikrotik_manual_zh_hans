---
sidebar_key: "getting-started/routeros-licensing/chr/chr-licensing"
sidebar_position: 1
title: "CHR：许可"
sidebar_label: "CHR：许可"
description: "CHR 提供四个许可证级别——Free、P1（Perpetual-1）、P10（Perpetual-10）和 P-Unlimited——付费选项可提供试用期。许可证为永久性质，与 CHR 系统 ID 绑定，并需要通过 MikroTik 账户服务器定期续期。试用许可证可在到期前升级，而过期的实例"
tags:
  - 'licensing'
  - 'chr'
source: https://manual.mikrotik.com/docs/7.25/getting-started/routeros-licensing/chr/chr-licensing
captured_at: '2026-11-04T11:17:30+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#overview}

Cloud Hosted Router (CHR) 提供四个许可证级别。许可证是永久性的，意味着只需购买一次即可无限期使用。如有需要，永久许可证也可以转移到另一个 CHR 实例。
CHR 默认包含完整的 RouterOS 功能集。不过，与其他 RouterOS 版本相比，它采用不同的许可模式。

### CHR 许可证级别 {#chr-license-levels}

CHR 是 RouterOS 的一个版本，设计用于以虚拟机方式运行。它有四个许可证级别，以及一个 Trial 选项，可让你免费测试任意付费许可级别 60 天。

所有付费许可级别均提供 60 天免费试用。要获取 Trial 许可证，你必须在 [MikroTik.com](https://mikrotik.com/) 上拥有已注册的账户，因为所有 CHR 许可证管理都通过 MikroTik 账户系统处理。

永久许可证是终身许可证——购买一次即可无限期使用。如有需要，这些许可证也可以转移到另一个 CHR 实例。

许可证直接绑定到 CHR 系统 ID。

运行中的 CHR 实例会定期连接 MikroTik 账户服务器以续订其许可证状态。系统会显示必须完成续订的截止时间。如果 CHR 实例无法在截止时间之前续订许可证，它的行为将与试用期已过期相同，并且不再允许将 RouterOS 升级到更新版本。

要在运行 Free 许可证级别的 CHR 实例上激活试用许可证，您**必须**手动运行 [`/system/license/renew`](../../../cli-reference/system/license/renew.md) 命令，并将该 CHR 实例注册到您的 MikroTik.com 账户。

| 许可证 | 速度限制 | 价格 | 描述 |
| :-- | :-- | :-- | :-- |
| Free | 1Mbit | 免费 | Free 许可证级别允许 CHR 无限期运行，每个接口的上传限制为 1 Mbps。所有其他 RouterOS 功能均可无限制使用。要开始使用，请下载磁盘映像并将其部署为虚拟机或云实例。|
| P1 (Perpetual-1) | 1Gbit | $45 | P1 (Perpetual-1) 允许 CHR 无限期运行。每个接口的上传限制为 1 Gbps。所有其他 RouterOS 功能均可无限制使用。你可以从 P1 升级到 P10 或 P-Unlimited。以全价购买升级后，先前的许可证将再次在你的 MikroTik 账户中可用。|
| P10 (Perpetual-10) | 10Gbit | $95 | P10 (Perpetual-10) 允许 CHR 无限期运行。每个接口的上传限制为 10 Gbps。所有其他 RouterOS 功能均可无限制使用。你可以将 P10 升级到 P-Unlimited。以全价购买升级后，先前的许可证将再次在你的 MikroTik 账户中可用。|
| P-Unlimited | 无限制 | $250 | P-Unlimited (Perpetual-Unlimited) 允许 CHR 无限期运行。它是最高级别的许可证，没有强制限制。|
| 60 天试用 |  | 免费 | 你可以通过 60 天试用来评估更高性能级别（P1、P10 或 P-Unlimited）。 <br/>需要已注册的 <a href="https://mikrotik.com" target="_blank" rel="noopener noreferrer">MikroTik.com</a> 账户。在 CHR 实例上，你可以申请试用许可证。这会将实例 System ID 与你的 MikroTik 账户关联，并启用许可证管理和购买。<br/>所有付费许可证级别均可试用。试用期自激活之日起 60 天内有效。<br/>到期后，许可证状态会变为 <strong>"Limited upgrades"</strong>，这意味着 RouterOS 无法升级。<br/>如果你打算购买许可证，请在试用到期前完成购买。如果在到期后 2 个月内未进行购买，CHR 实例将从你的 MikroTik 账户中移除。在这种情况下，需要重新安装 CHR。<br/>要申请试用许可证，请在 CHR 实例上运行以下命令： <a href="/zh-Hans/docs/7.25/cli-reference/system/license/renew"><code>/system/license/renew</code></a>。系统会提示你输入 MikroTik.com 账户用户名和密码。（<em>[敏感](../../configuration-management/list-of-menus-with-sensitive-parameters.md)</em>）。 |

:::warning
如果你想把永久许可证升级到更高级别，请先将现有许可证转移到另一个 CHR 实例。这样可以避免许可证在升级过程中丢失。
:::

### 许可说明 {#licensing-notes}

你可以克隆或复制正在运行的 CHR 系统，但克隆出的实例会保留原有的试用状态。这意味着无法通过创建副本延长试用期。不过，每个系统仍然可以独立获得许可。

要开始新的试用期，请执行全新的 CHR 安装并重新配置 RouterOS。

## 系统 ID 与克隆注意事项 {#system-id-and-cloning-considerations}

当从同一磁盘映像部署多个 CHR 实例时，某些云提供商（例如 Linode）可能会为多台机器分配相同的系统 ID。
为防止这种情况，请在首次启动后、请求试用许可证之前运行以下命令：[`/system/license/generate-new-id`](../../../cli-reference/system/license/generate-new-id.md)

:::warning
此命令只能用于运行 Free 许可级别的 CHR。在应用 Trial 或付费许可证之后请勿使用，因为它可能会阻止后续的许可证更新。
:::

## 部署多个实例 {#deploying-multiple-instances}

要运行多个 CHR 实例：

1. 从 MikroTik 网站下载 CHR 磁盘镜像。
2. 为每台虚拟机创建镜像的独立副本。
3. 在虚拟机管理程序或云平台中将每个副本部署为独立的 VM。

请确保在启动或注册镜像**之前**创建副本。

## 永久许可证要求 {#perpetual-license-requirements}

运行中的 CHR 实例必须定期连接 MikroTik 账户服务器以续订其许可证状态。系统会指示必须完成此操作的截止时间。

> **重要：** 如果 CHR 实例无法在截止时间前访问账户服务器，它的行为就如同试用期已过期。在此状态下，您无法将 RouterOS 升级到更新版本或修改软件包（例如，启用或禁用它们）。

## IP/Cloud 要求 {#ipcloud-requirement}

IP/Cloud 功能需要**付费的永久 CHR 许可证**。

## 许可证过期 {#expired-license}

当 CHR 实例在 "deadline-at" 时间之前未能联系 MikroTik 服务器完成许可证续订，或者 60 天试用期结束时，就会出现 CHR 许可证过期。

许可证过期后，路由器会继续以相同级别运行，但软件更新和软件包更改将被禁用。

**要为过期的 CHR 实例授权：**必须使用 Prepaid key。

如果过期的实例在一定时间内未连接到许可证服务器，它们会自动从您的 MikroTik 账户中移除。

## 为 CHR 许可购买 Prepaid key {#purchasing-a-prepaid-key-for-chr-licensing}

### 什么是 Prepaid key？ {#what-is-a-prepaid-key}

Prepaid key 是你为 MikroTik 产品（包括 Cloud Hosted Router (CHR)）预先购买的许可证密钥。该密钥允许你在不立即将其分配给特定设备的情况下购买许可证。

当您拥有预付费密钥时，您可以使用它升级现有的 CHR 系统 ID，或通过提供设备的软件 ID 将其转换为完整许可证密钥。

### 购买 Prepaid key {#purchasing-a-prepaid-key}

按以下步骤购买 Prepaid key：

1. 访问 [mikrotik.com](https://mikrotik.com/) 并登录您的账户。
2. 导航到 **购买 RouterOS 许可证密钥** 部分。
3. 选择所需的许可证级别。
4. 选择 **预付费密钥** 作为密钥类型。
5. 输入您要购买的预付费密钥数量。
6. （可选）选择密钥所需的任何附加功能。
7. 选择 **将密钥放入购物车**。
8. 选择 **继续结账** 以完成购买。

![Prepaid Key Purchase](/img/f4486a42a4b502b8.png)

### 完成购买 {#completing-your-purchase}

1. 检查你的订单详情。
2. 使用**信用卡**（CC）或 **PayPal** 完成支付。

![Prepaid Key Purchase Complete](/img/bcf666707f80bd5b.png)

您已购买预付费密钥。

![Prepaid Key](/img/90b7ec9f73f89c97.png)

## 注册 CHR 实例 {#registering-a-chr-instance}

首次设置 Cloud Hosted Router (CHR) 实例时，它会自动获得 Free 许可证。要获取更高级别的许可证，你必须将该 CHR 实例注册到你的 MikroTik 账户。

该注册会把 CHR 系统 ID 与你的 MikroTik.com 账户关联，并为所选许可证级别激活 60 天的试用期。

### 开始 Trial 许可证 {#starting-a-trial-license}

#### 使用 WinBox {#using-winbox}

1. 打开 WinBox 并连接到您的 CHR 实例。
2. 导航到 `System->License` 并按下 **Renew License**。

![Free to Trial upgrade](/img/1ece3433b0f958d3.png)
![Free to Trial upgrade](/img/1406e98c414a2426.png)

1. 输入你的 MikroTik.com 账户凭据并选择所需的许可证级别。

![Free to Trial upgrade](/img/49c64ffd70ac6937.png)

1. 确认升级。

![Free to Trial upgrade](/img/17c5392525189eba.png)

#### 使用命令行界面（CLI） {#using-the-command-line-interface-cli}

1. 检查你当前的许可证状态：

```
[admin@MikroTik] > /system/license/print
  system-id: HDlXorQ3f7L
      level: free
```

1. 使用您的账户凭据和所需级别运行 [`renew`](../../../cli-reference/system/license/renew.md) 命令：

```
[admin@MikroTik] > /system/license/renew
account: mymikrotikcomaccount
password: *********************
level: p1
  status: done
```

1. 验证升级是否成功：

```
[admin@MikroTik] > /system/license/print
         system-id: HDlXorQ3f7L        
             level: p1                 
  limited-upgrades: no                 
   next-renewal-at: 2026-06-11 10:55:29
       deadline-at: 2026-07-11 10:55:29
```

输出确认您的许可证已升级到 P1，并显示下次续订日期和试用截止日期。

#### 验证 CHR 注册 {#verify-chr-registration}

1. 访问 [mikrotik.com/client](https://mikrotik.com/client/) 并使用您的 mikrotik.com 凭据登录。
2. 在 **CHR 许可证** 部分中，选择 **所有 CHR 密钥**。
3. 将显示您的 CHR 实例及其对应许可证级别的列表。

注册后，CHR 系统 ID 会出现在你 MikroTik.com 账户的 **All CHR keys** 部分中。

### 获取更高级别的 Trial {#acquiring-a-higher-level-trial}

:::warning
您无法在同一实例上升级试用许可证级别。
:::

要试用更高级别的许可证，请部署一个新的 CHR 实例，并在注册时选择所需的 Trial 许可级别。

## 将 Trial 许可证升级为付费许可证 {#upgrading-a-trial-license-to-a-paid-license}

### 支付与许可证升级 {#payment-and-license-upgrade}

要将 Trial 许可证升级为付费许可证：

1. 访问 [MikroTik 账户服务器](https://www.mikrotik.com/client)。
2. 在 **CHR LICENCES** 部分中，选择 **All CHR keys**。

![All CHR Keys](/img/0796c8d96fffb212.png)

1. 将显示您的 CHR 实例及其对应许可证级别的列表。

![Trial to Paid upgrade](/img/1f7ff45a8b581dc5.png)

1. 在要升级的实例旁边选择 **升级**。

2. 选择所需的许可证级别（它可以与你当前的 Trial 许可级别不同）。

![Trial to Paid upgrade](/img/4d67533fee64632e.png)

1. 选择 **升级** 以确认。

### 使用 Prepaid key {#using-prepaid-keys}

如果你有可用的 **Prepaid keys**，可以使用它们支付 CHR 许可证费用：

1. 选择 **使用预付费密钥支付**。

![Trial to Paid upgrade](/img/632dab99c602c771.png)

1. 如果您没有预付费密钥或不想使用它们，请选择 **继续结账**。

### 支付方式 {#payment-methods}

你可以使用以下任一方式支付：

- 信用卡（CC）。
- PayPal。

![Trial to Paid upgrade](/img/96c08bb88da550cb.png)

## 升级永久许可证级别 {#upgrading-a-perpetual-license-level}

### 前提条件 {#prerequisites}

开始升级之前，请确保你已具备：

- 有效的 MikroTik.com 账户（用户名和密码）。
- 已购买你想要的许可证级别对应的 Prepaid key。

:::warning
如果你想把永久许可证升级到更高级别，请先将现有许可证转移到另一个 CHR 实例。这样可以避免许可证在升级过程中丢失。
:::

你可以将 Cloud Hosted Router (CHR) 的**永久**许可证升级到更高级别。支持以下升级：

- **P1 → P10** 或 **P1 → P-Unlimited**。
- **P10 → P-Unlimited**。

当你以全价购买升级时，你之前的许可证仍可在你的账户中使用。

:::info
P-Unlimited (perpetual-unlimited) 许可证是最高级别的可用许可证。它允许 CHR 无限期运行，没有任何强制限制。
:::

:::info
不能组合多个预付费密钥来升级到更高级别的许可证。必须使用所需许可证级别的预付费密钥按全价购买更高级别的许可证。例如，两个 P1 预付费密钥不能与额外付款组合以获得一个 P10 许可证。
:::

### 升级已付费的永久 CHR 许可证级别 {#upgrading-the-paid-perpetual-chr-license-level}

1. 登录您的 MikroTik 账户并导航到 **所有 CHR 密钥**。
2. 选择要升级的 CHR 实例。
3. 选择 **升级**。

    ![License Upgrade Level](/img/21542650d93ae02a.png)

4. 选择所需的许可证级别（P10 或 P-Unlimited），然后选择 **升级**。

    ![License Upgrade Level Select target](/img/b39f329808146f9b.png)

5. 选择支付选项：

- **Pay using Prepaid key** — 如果你有可用的预付密钥

    ![License Upgrade Level](/img/f36142266c66ad06.png)

- **Proceed to checkout** — 如果你希望使用其他方式支付

    ![License Upgrade Level](/img/c7085a9318d31441.png)

1. 选择你的支付方式：

- 信用卡（CC）。
- PayPal。
    ![许可证升级级别](/img/552157a8db4dc24d.png)

1. 完成支付流程。

您的 CHR 许可证将升级到所选级别，并且您之前的许可证仍保留在您的账户中供将来使用。

:::warning
你可以升级到除 *p-unlimited* 之外的任何许可证级别。该级别代表可用的最高级别，无法再进一步升级。
:::

## 许可证转移 {#license-transfer}

每个 Cloud Hosted Router (CHR) 安装都直接绑定到你的 MikroTik 账户。你可以将永久许可证转移到另一个 CHR 实例，前提是两个实例都注册在**同一**账户下。

### 转移限制 {#transfer-restrictions}

| 许可证类型 | 可转移？ | 备注 |
|---|---|---|
| 永久许可证 | yes | 仅可转移到**同一**账户下的另一个 CHR 实例 |
| 预付费密钥（已购买） | yes | 可以通过 "Transfer prepaid keys" 转移到其他账户 |
| 预付费密钥（来自培训） | no | 这些密钥不可转移 |

:::warning
您不能将永久许可证转移到已过期的实例。要为过期的 CHR 实例获得许可，您必须使用预付费密钥。
:::

:::info
许可证被转出的实例会保留相同的许可证级别，但状态为 **Limited upgrades**（已过期）。它将继续在该许可证级别下运行，但是不再提供 RouterOS 升级。
:::

### 前提条件：所需的 CHR 实例 {#prerequisites-required-chr-instances}

转移永久许可证之前，你必须具备：

- 带有要转出许可证的原始 CHR 实例。
- 注册在**同一** MikroTik 账户下的目标 CHR 实例。

如果你没有第二个 CHR 实例，请先创建一个，然后将其添加到你的账户。

### 转移许可证 {#transferring-a-license}

按以下步骤转移你的许可证：

1. **注册新实例**

  在您的旧 CHR 所注册的同一 MikroTik 账户下注册新的 CHR 实例。使用 [`renew`](../../../cli-reference/system/license/renew.md) CLI 命令：

   ```
   /system/license/renew
   ```

1. **确认两个实例都出现在你的账户中**

   确认旧的和新的 CHR 机器都显示在你 MikroTik 账户的 **All CHR keys** 部分中。

2. **发起转移**

- 转到你账户的 **All CHR keys** 部分。

    ![Transfer button location](/img/058eb33e404b299c.png)

  - 为要转移的系统 ID 选择 **Transfer** 按钮。

1. **选择目标实例**

   从列表中选择你要将许可证转移到其中的系统 ID。

   ![Select target instance](/img/65c83e778685e8ae.png)

2. **确认转移**

   选择 **Transfer subscription** 以完成该过程。

   ![Confirm transfer](/img/d24a244f88c412dd.png)

### 排查转移错误 {#troubleshooting-transfer-errors}

如果你收到以下错误：
:::danger
*"此密钥不符合转移条件，因为没有其他有效的 CHR 密钥可以升级到此密钥的许可级别。"*
:::
这意味着你没有处于 Trial 模式的 CHR 实例来接收该许可证。

:::tip
**解决方案：** 创建一个新的 CHR 实例并将其添加到您的账户。添加后，您可以将现有许可证转移到新实例。
:::

## 许可证续订 {#license-renewal}

CHR 许可证需要与 MikroTik 许可证服务器定期通信以保持许可证有效。

在 [`/system/license`](../../../cli-reference/system/license/index.md) 菜单中，路由器会显示两个时间戳：

- **next-renewal-at** — 路由器下一次尝试联系 MikroTik 许可证服务器的时间。
- **deadline-at** — 必须成功与许可证服务器通信的最晚时间。

CHR 实例通过以下地址与许可证服务器通信：

`licence.mikrotik.com`

### 续订过程 {#renewal-process}

- 在 **next-renewal-at** 时间过后，路由器每小时尝试续订许可证一次。
- 续订尝试会一直持续，直到服务器成功响应。

### 许可证过期 {#license-expiration}

如果路由器无法在 **deadline-at** 时间之前联系到许可证服务器：

- 许可证进入过期状态。
- 不再允许 RouterOS 升级。
- 不再允许更改软件包（启用/禁用/安装/移除）。
- 路由器继续以当前许可证级别运行。

### 续订成功 {#successful-renewal}

与许可证服务器成功通信后：

- **next-renewal-at** 时间戳会被更新。
- **deadline-at** 时间戳会被更新。
