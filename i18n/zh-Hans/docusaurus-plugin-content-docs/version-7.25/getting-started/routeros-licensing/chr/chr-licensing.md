---
title: "CHR：许可"
description: "CHR 提供四个许可证级别——Free、P1（Perpetual-1）、P10（Perpetual-10）和 P-Unlimited——付费选项可使用试用期。许可证为永久许可证，与 CHR system ID 绑定，并需要使用 MikroTik account server 定期续订。试用许可证可在到期前升级，而已过期的实例"
tags:
  - 'licensing'
  - 'chr'
source: https://manual.mikrotik.com/docs/7.25/getting-started/routeros-licensing/chr/chr-licensing
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "getting-started/routeros-licensing/chr"
pagination_next: "getting-started/routeros-licensing/mikrotik-hardware"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 概述 {#overview}

Cloud Hosted Router（CHR）提供四种许可证级别。许可证为永久许可证，即购买一次即可无限期使用。如需，永久许可证也可以转移到另一个 CHR 实例。
CHR 默认包含完整的 RouterOS 功能集。但是，与其他 RouterOS 版本相比，它使用不同的许可模式。

### CHR 许可证级别 {#chr-license-levels}

CHR 是设计为作为虚拟机运行的 RouterOS 版本。它有四个许可证级别，并提供 Trial 选项，允许你免费测试任意付费许可证级别 60 天。

所有付费许可证级别均可获得 60 天免费试用。要获取 Trial 许可证，必须在 [MikroTik.com](https://mikrotik.com/) 上拥有注册账户，因为所有 CHR 许可证管理均通过 MikroTik 账户系统处理。

Perpetual 许可证为永久许可证——购买一次即可无限期使用。如需，这些许可证也可以转移到另一个 CHR 实例。

许可证直接绑定到 CHR system ID。

运行中的 CHR 实例会定期连接到 MikroTik 账户服务器，以续订其许可证状态。系统会显示必须完成续订的截止时间。如果 CHR 实例无法在该截止时间前续订许可证，其行为将与 Trial 期到期后相同，不再允许将 RouterOS 升级到更新版本。

要在运行 Free 许可证级别的 CHR 实例上激活 Trial 许可证，必须手动运行 [`/system/license/renew`](/docs/cli-reference/system/license/renew) 命令，并将该 CHR 实例注册到你的 MikroTik.com 账户。

| 许可证 | 速度限制 | 价格 | 描述 |
| :-- | :-- | :-- | :-- |
| Free | 1Mbit | FREE | Free 许可证级别允许 CHR 无限期运行，每个接口上传限制为 1 Mbps。所有其他 RouterOS 功能均可无限制使用。要开始使用，请下载磁盘镜像并将其部署为虚拟机或云实例。|
| P1 (Perpetual-1) | 1Gbit | $45 | P1 (Perpetual-1) 允许 CHR 无限期运行。每个接口上传限制为 1 Gbps。所有其他 RouterOS 功能均可无限制使用。你可以从 P1 升级到 P10 或 P-Unlimited。按全价购买升级后，原许可证会重新在你的 MikroTik 账户中可用。|
| P10 (Perpetual-10) | 10Gbit | $95 | P10 (Perpetual-10) 允许 CHR 无限期运行。每个接口上传限制为 10 Gbps。所有其他 RouterOS 功能均可无限制使用。你可以将 P10 升级到 P-Unlimited。按全价购买升级后，原许可证会重新在你的 MikroTik 账户中可用。|
| P-Unlimited | Unlimited | $250 | P-Unlimited (Perpetual-Unlimited) 允许 CHR 无限期运行。它是最高级别的许可证，没有强制限制。|
| 60-day Trial |  | FREE | 你可以使用 60 天试用版评估更高性能级别（P1、P10 或 P-Unlimited）。<br/>需要已注册的 <a href="https://mikrotik.com" target="_blank" rel="noopener noreferrer">MikroTik.com</a> 账户。你可以从 CHR 实例申请试用许可证。这会将该实例的 System ID 与你的 MikroTik 账户关联，并启用许可证管理和购买。<br/>所有付费许可证级别均可试用。试用期自激活之日起 60 天有效。<br/>到期后，许可证状态将变为 <strong>“Limited upgrades”</strong>，表示无法升级 RouterOS。<br/>如果你打算购买许可证，请在试用期到期前完成购买。如果到期后 2 个月内未购买，该 CHR 实例将从你的 MikroTik 账户中移除。在这种情况下，需要重新安装 CHR。<br/>要申请试用许可证，请在 CHR 实例上运行以下命令：<a href="/docs/cli-reference/system/license/renew"><code>/system/license/renew</code></a>。系统会提示你输入 MikroTik.com 账户用户名和密码。（<em><a href="/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters">sensitive</a></em>）。 |

:::warning
如果要将永久许可证升级到更高级别，请先将现有许可证转移到另一个 CHR 实例。这可防止许可证在升级过程中丢失。
:::

### 许可证说明 {#licensing-notes}

你可以克隆或复制正在运行的 CHR 系统，但克隆实例会保留原始试用状态。这意味着无法通过创建副本来延长试用期。不过，每个系统仍可独立获得许可证。

要开始新的试用期，请重新安装 CHR 并重新配置 RouterOS。

## System ID 和克隆注意事项 {#system-id-and-cloning-considerations}

从同一磁盘镜像部署多个 CHR 实例时，某些云提供商（例如 Linode）可能会为多台机器分配相同的 System ID。
为避免此问题，请在首次启动后、申请试用许可证之前运行以下命令：[`/system/license/generate-new-id`](/docs/cli-reference/system/license/generate-new-id)

:::warning
此命令只能用于运行 Free 许可证级别的 CHR。不要在应用试用或付费许可证后使用它，因为它可能会阻止进一步的许可证更新。
:::

## 部署多个实例 {#deploying-multiple-instances}

要运行多个 CHR 实例：

1. 从 MikroTik 网站下载 CHR 磁盘镜像。
2. 为每个虚拟机创建独立的镜像副本。
3. 在虚拟机管理程序或云平台中将每个副本部署为独立的 VM。

确保在创建副本后再启动或注册镜像。

## 永久许可证要求 {#perpetual-license-requirements}

运行中的 CHR 实例必须定期连接到 MikroTik 账户服务器以续订其许可证状态。系统会指示必须完成此操作的截止日期。

> **重要：** 如果 CHR 实例在截止日期前无法访问账户服务器，则其行为与试用期已过期相同。在此状态下，无法将 RouterOS 升级到更新版本，也无法修改软件包（例如启用或禁用软件包）。

## IP/Cloud 要求 {#ipcloud-requirement}

IP/Cloud 功能需要 **付费永久 CHR 许可证**。

## 许可证过期 {#expired-license}

当 CHR 实例未能在“deadline-at”时间之前联系 MikroTik 服务器续订许可证，或者 60 天试用期已结束时，CHR 许可证会过期。

许可证过期后，路由器会继续以相同级别运行，但软件更新和软件包更改将被禁用。

**要为过期的 CHR 实例授权：** 必须使用 Prepaid key。

如果实例在一段时间内未连接到许可证服务器，它们将自动从 MikroTik 账户中移除。

## 购买用于 CHR 授权的 Prepaid Key {#purchasing-a-prepaid-key-for-chr-licensing}

### 什么是 Prepaid Key？ {#what-is-a-prepaid-key}

Prepaid Key 是您为 MikroTik 产品（包括 Cloud Hosted Router（CHR））预先购买的许可证密钥。该密钥可让您购买许可证，而无需立即将其分配给特定设备。

拥有 Prepaid Key 时，可使用它升级现有 CHR System ID，或通过提供设备的 Software ID 将其转换为完整许可证密钥。

### 购买 Prepaid Key {#purchasing-a-prepaid-key}

请按以下步骤购买 Prepaid Key：

1. 前往 [mikrotik.com](https://mikrotik.com/) 并登录你的账户。
2. 导航到 **Purchase a RouterOS License Key** 部分。
3. 选择所需的许可证级别。
4. 选择 **Prepaid key** 作为密钥类型。
5. 输入要购买的预付费密钥数量。
6. （可选）选择密钥所需的其他功能。
7. 选择 **Place key in the cart**。
8. 选择 **Proceed to checkout** 以完成购买。

![Prepaid Key Purchase](/img/f4486a42a4b502b8.png)

### 完成购买 {#completing-your-purchase}

1. 检查订单详情。
2. 使用 **Credit Card**（CC）或 **PayPal** 完成付款。

![Prepaid Key Purchase Complete](/img/bcf666707f80bd5b.png)

您已购买 Prepaid Key。

![Prepaid Key](/img/90b7ec9f73f89c97.png)

## 注册 CHR 实例 {#registering-a-chr-instance}

首次设置 Cloud Hosted Router（CHR）实例时，该实例会自动获得 Free 许可证。要获取更高级别的许可证，必须将 CHR 实例注册到你的 MikroTik 账户。

此注册会将 CHR System ID 与你的 MikroTik.com 账户关联，并为所选许可证级别激活 60 天 Trial 期限。

### 启动试用许可证 {#starting-a-trial-license}

#### 使用 WinBox {#using-winbox}

1. 打开 WinBox 并连接到 CHR 实例。
2. 导航到 `System->License`，然后按 **Renew License**。

![Free to Trial upgrade](/img/1ece3433b0f958d3.png)
![Free to Trial upgrade](/img/1406e98c414a2426.png)

1. 输入你的 MikroTik.com 账户凭据，并选择所需的许可证级别。

![Free to Trial upgrade](/img/49c64ffd70ac6937.png)

1. 确认升级。

![Free to Trial upgrade](/img/17c5392525189eba.png)

#### 使用命令行界面（CLI） {#using-the-command-line-interface-cli}

1. 检查当前许可证状态：

```
[admin@MikroTik] > /system/license/print
  system-id: HDlXorQ3f7L
      level: free
```

1. 使用你的账户凭据和所需级别运行 [`renew`](/docs/cli-reference/system/license/renew) 命令：

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

输出确认许可证已升级到 P1，并显示下次续订日期和 Trial 截止日期。

#### 验证 CHR 注册 {#verify-chr-registration}

1. 前往 [mikrotik.com/client](https://mikrotik.com/client/)，并使用你的 mikrotik.com 凭据登录。
2. 在 **CHR LICENCES** 部分，选择 **All CHR keys**。
3. 将显示你的 CHR 实例列表及其对应的许可证级别。

注册后，CHR System ID 会显示在 MikroTik.com 账户的 **All CHR keys** 部分。

### 获取更高级别的试用许可 {#acquiring-a-higher-level-trial}

:::warning
不能在同一实例上升级 Trial 许可证级别。
:::

要试用更高级别的许可，请部署新的 CHR 实例，并在注册期间选择所需的 Trial 许可级别。

## 将 Trial 许可升级为付费许可 {#upgrading-a-trial-license-to-a-paid-license}

### 付款和许可升级 {#payment-and-license-upgrade}

要将 Trial 许可升级为付费许可：

1. 前往 [MikroTik account server](https://www.mikrotik.com/client)。
2. 在 **CHR LICENCES** 部分，选择 **All CHR keys**。

![All CHR Keys](/img/0796c8d96fffb212.png)

1. 显示 CHR 实例及其对应许可证级别的列表。

![Trial to Paid upgrade](/img/1f7ff45a8b581dc5.png)

1. 选择要升级的实例旁边的 **Upgrade**。

2. 选择所需的许可证级别（该级别可以与当前试用许可证级别不同）。

![Trial to Paid upgrade](/img/4d67533fee64632e.png)

1. 选择 **Upgrade** 进行确认。

### 使用预付密钥 {#using-prepaid-keys}

如果有可用的 **Prepaid keys**，可以使用它们支付 CHR 许可证费用：

1. 选择 **Pay using Prepaid key**。

![Trial to Paid upgrade](/img/632dab99c602c771.png)

1. 如果没有预付密钥，或不想使用预付密钥，请选择 **Proceed to checkout**。

### 支付方式 {#payment-methods}

可以使用以下任一方式付款：

- 信用卡（CC）。
- PayPal。

![Trial to Paid upgrade](/img/96c08bb88da550cb.png)

## 升级永久许可证级别 {#upgrading-a-perpetual-license-level}

### 前提条件 {#prerequisites}

开始升级前，请确保具备：

- 有效的 MikroTik.com 账户（用户名和密码）。
- 已购买要获取的所需许可证级别 Prepaid key。

:::warning
如果要将永久许可证升级到更高级别，请先将现有许可证转移到另一个 CHR 实例。这可防止许可证在升级过程中丢失。
:::

可以将 Cloud Hosted Router（CHR）**永久**许可证升级到更高级别。支持以下升级：

- **P1 → P10** 或 **P1 → P-Unlimited**。
- **P10 → P-Unlimited**。

按全价购买升级时，之前的许可证仍可在你的账户中使用。

:::info
P-Unlimited（perpetual-unlimited）许可证是最高级别。它允许 CHR 无限期运行，且没有强制限制。
:::

:::info
多个 Prepaid key 不能合并升级到更高的许可证级别。必须使用所需许可证级别的 Prepaid key 按全价购买更高级别的许可证。例如，两个 P1 Prepaid key 不能与额外付款合并以获得一个 P10 许可证。
:::

### 升级付费永久 CHR 许可证级别 {#upgrading-the-paid-perpetual-chr-license-level}

1. 登录 MikroTik 账户，进入 **All CHR keys**。
2. 选择要升级的 CHR 实例。
3. 选择 **Upgrade**。

    ![License Upgrade Level](/img/21542650d93ae02a.png)

4. 选择所需的许可证级别（P10 或 P-Unlimited），然后选择 **Upgrade**。

    ![License Upgrade Level Select target](/img/b39f329808146f9b.png)

5. 选择付款方式：

- **Pay using Prepaid key** — 如果你有可用的预付密钥

    ![License Upgrade Level](/img/f36142266c66ad06.png)

- **前往结账** —— 如果你希望使用其他方式付款

    ![License Upgrade Level](/img/c7085a9318d31441.png)

1. 选择付款方式：

- 信用卡（CC）。
- PayPal。
    ![License Upgrade Level](/img/552157a8db4dc24d.png)

1. 完成付款流程。

你的 CHR 许可证已升级到所选级别，之前的许可证仍保留在你的账户中，可供以后使用。

:::warning
你可以升级到除 *p-unlimited* 之外的任何许可证级别。该级别是最高可用级别，无法继续升级。
:::

## 许可证转移 {#license-transfer}

每个 Cloud Hosted Router（CHR）安装都直接绑定到你的 MikroTik 账户。只要两个实例都注册在**同一**账户下，你就可以将永久许可证转移到另一个 CHR 实例。

### 转移限制 {#transfer-restrictions}

| 许可证类型 | 可转移？ | 说明 |
|---|---|---|
| Perpetual license | 是 | 仅可转移至同一账户下的另一个 CHR 实例 |
| Prepaid key（已购买） | 是 | 可通过“Transfer prepaid keys”转移至其他账户 |
| Prepaid key（来自 Training） | 否 | 这些密钥不可转移 |

:::warning
不能将 Perpetual license 转移至已过期的实例。要为已过期的 CHR 实例授权，必须使用 Prepaid key。
:::

:::info
许可证被转出的实例会保留相同的许可证级别，但状态变为 **Limited upgrades**（已过期）。该实例将继续按该许可证级别运行，但不再提供 RouterOS 升级。
:::

### 前提条件：所需的 CHR 实例 {#prerequisites-required-chr-instances}

转移永久许可证之前，必须具备：

- 要从中转移许可证的原始 CHR 实例。
- 在**同一** MikroTik 账户下注册的目标 CHR 实例。

如果没有第二个 CHR 实例，请先创建一个，然后将其添加到你的账户。

### 转移许可证 {#transferring-a-license}

请按以下步骤转移许可证：

1. **注册新实例**

  在同一 MikroTik 账户下注册新的 CHR 实例，该账户需已注册旧 CHR。使用 [`renew`](/docs/cli-reference/system/license/renew) CLI 命令：

   ```
   /system/license/renew
   ```

1. **确认两个实例都显示在账户中**

   确认旧 CHR 和新 CHR 设备都显示在 MikroTik 账户的 **All CHR keys** 部分中。

2. **发起转移**

- 前往账户的 **All CHR keys** 部分。

    ![Transfer button location](/img/058eb33e404b299c.png)

  - 为要转移的 System ID 选择“Transfer”按钮。

1. **选择目标实例**

   从列表中选择要将许可证转移到的 System ID。

   ![Select target instance](/img/65c83e778685e8ae.png)

2. **确认转移**

   选择 **Transfer subscription** 以完成该过程。

   ![Confirm transfer](/img/d24a244f88c412dd.png)

### 转移错误故障排除 {#troubleshooting-transfer-errors}

如果收到以下错误：
:::danger
*“由于没有其他有效的 CHR key 可升级到该 key 的许可证级别，因此该 key 无法转移。”*
:::
这表示你没有处于 Trial 模式的 CHR 实例来接收许可证。

:::tip
**解决方案：** 创建新的 CHR 实例并将其添加到你的账户。添加后，可以将现有许可证转移到新实例。
:::

## 许可证续期 {#license-renewal}

CHR 许可证需要定期与 MikroTik 许可证服务器通信，以保持许可证有效。

在 [`/system/license`](/docs/cli-reference/system/license) 菜单中，路由器显示两个时间戳：

- **next-renewal-at** — 路由器下次尝试联系 MikroTik 许可证服务器的时间。
- **deadline-at** — 必须与许可证服务器成功通信的最晚时间。

CHR 实例通过以下地址与许可证服务器通信：

`licence.mikrotik.com`

### 续期流程 {#renewal-process}

- 在 **next-renewal-at** 时间过后，路由器每小时尝试续订许可证一次。
- 续订尝试会持续进行，直到服务器成功响应。

### 许可证到期 {#license-expiration}

如果路由器在 **deadline-at** 时间之前无法联系许可证服务器：

- 许可证进入过期状态。
- 不再允许 RouterOS 升级。
- 不再允许软件包更改（启用/禁用/安装/移除）。
- 路由器继续使用当前许可证级别运行。

### 续订成功 {#successful-renewal}

与许可证服务器成功通信后：

- **next-renewal-at** 时间戳会更新。
- **deadline-at** 时间戳会更新。
