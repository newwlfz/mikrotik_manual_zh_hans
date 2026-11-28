---
title: "首次配置"
description: "本页提供首次配置 MikroTik RouterOS 的分步指南，涵盖前置条件、连接设置以及 DHCP、NAT 和防火墙等关键概念。本页同时介绍 WinBox 图形界面和 CLI 方法，适用于新用户和高级用户。"
tags:
  - 'dhcp'
  - 'firewall'
source: https://manual.mikrotik.com/docs/7.25/getting-started/first-time-configuration
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "getting-started"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 开始之前 {#before-you-begin}

### 前提条件 {#prerequisites}

开始配置前，请确保具备以下条件：

- 一台 MikroTik 路由器
- 一台带以太网端口的计算机（推荐）。如果路由器提供无线接入点，也支持通过 WiFi 配置
- 一根以太网线缆
- 来自 ISP 的有效互联网连接
- 30–60 分钟不被打断的时间

### 关键概念 {#key-concepts}

- **默认配置：** 出厂预装的设置，可能需要根据网络需求进行调整
- **网桥：** 将多个物理端口合并为单个网段的虚拟接口
- **DHCP：** 自动为网络中的设备分配 IP 地址的协议
- **NAT：** 网络地址转换，允许多个设备共享一个公网 IP 地址
- **防火墙：** 用于安全目的控制和过滤网络流量的一组规则

### 选择配置方法 {#choose-your-configuration-method}

本指南介绍如何使用以下任一方式配置 RouterOS：

- 使用 [WinBox](/docs/7.24/management-tools/winbox) 或 [WebFig](/docs/7.24/management-tools/webfig) 的图形界面
- 命令行界面（CLI）

如何选择：

- **新用户：** 建议按照 WinBox 说明操作
- **高级用户：** 可以使用代码块中显示的 CLI 命令

:::tip
完成每个主要配置部分后，建议创建设置备份。

**CLI 方法：**

```
/export file=backup-step3
```

**WinBox 方法：**

1. 打开 **Files** 菜单
2. 点击 **Backup**
3. 输入描述性名称（例如：`after-internet-setup`）

如果出现问题，可以在 **Files** 菜单中选择备份，然后点击 **Restore** 恢复配置。
:::

## 访问路由器 {#accessing-the-router}

大多数 MikroTik 路由器出厂时带有默认配置，可立即访问。但是，部分专业设备（例如 CCR 系列）可能仅带有最小配置或没有默认配置。在这种情况下，请先手动设置网络 — 请参阅 [Manual Network Setup](/docs/7.24/getting-started/manual-network-setup)。

### 步骤 1：物理连接 {#step-1-physical-connection}

1. 将以太网电缆从计算机连接到路由器的任意以太网端口，**ether1 除外**。
2. 将 ISP 电缆连接到 **ether1**（通常用作 WAN 接口）。
3. 打开路由器电源，等待约一分钟，使其完全启动。

```
Internet ─── [ISP] ─── [ether1] MikroTik Router [ether2-ether5] ─── [Switch / Devices]

                                                 │

                                          [WiFi Clients]
```

### 步骤 2：下载 WinBox {#step-2-download-winbox}

如果尚未安装 WinBox：

根据操作系统**[下载 WinBox](https://mt.lv/winbox)**：

可用软件包：

- **Windows：** ZIP 压缩包（包含 `WinBox.exe`）
- **Linux：** ZIP 压缩包（包含二进制可执行文件）
- **macOS：** DMG 安装包

1. 解压或打开下载的安装包。
2. 启动 WinBox：
   - Windows：运行 `WinBox.exe`
   - Linux：将二进制文件设置为可执行并运行
   - macOS：打开 `.dmg` 并启动 WinBox

无需安装。详情请参阅 [WinBox 手册](/docs/7.24/management-tools/winbox)。

### 第 3 步：使用邻居发现查找路由器 {#step-3-find-your-router-using-neighbor-discovery}

1. 打开 WinBox。
2. 在 **Select from** 下拉列表中选择 **Neighbors**。
3. 路由器应显示在 **Neighbors** 列表中。
4. 双击路由器条目进行连接：
   - 如果 IP 地址不可达或显示为 `0.0.0.0`，优先使用 **MAC address**。
5. 出现提示时，输入登录凭据：
   - **Username：** `admin`
   - **Password：** 留空，或使用设备标签上印制的密码（如适用）

### 第 4 步：保护路由器 {#step-4-protecting-the-router}

路由器可访问后，请保护其免受未经授权的访问和基本攻击。请先完成以下操作：

1. **设置管理员密码。** 空密码允许不受限制地访问路由器。
2. **验证防火墙已启用。** 大多数 MikroTik 设备出厂时带有默认防火墙配置，可阻止最常见的外部攻击。请勿禁用现有规则；仅在需要时添加新规则。
3. **禁用来自互联网的直接管理访问。** 对于没有默认防火墙的设备，这一点尤其重要。如果需要远程访问，请使用 **WireGuard** 或 **IPsec** 等安全方式，而不是直接暴露管理端口。

### 用户密码管理 {#user-password-management}

使用强密码保护 MikroTik 路由器至关重要。请使用符合以下条件的密码：

- 至少 12 个字符
- 包含大写字母、小写字母、数字和符号
- 避免使用字典单词或简单模式

使用 CLI 设置 admin 密码：

```ros
/user set 0 password="Your_Super_Strong_Password_123!@#$%^&*"
```

也可以交互式更改：

```ros
[admin@MikroTik] > /password 
old-password: ********
new-password: ****************************
confirm-new-password: ****************************
```

:::danger
请记住密码。如果密码丢失，则无法恢复。需要重置路由器或重新安装 RouterOS。
:::

也可以在 `/user` 菜单中管理用户：

```ros
/user/add name=myname password=mypassword group=full
/user/remove admin
```

:::tip
最佳实践是创建一个使用强密码的新管理员用户，验证其可用后，再禁用或删除默认的 **admin** 账户。
:::

## 了解默认配置 {#understanding-default-configuration}

首次连接到 MikroTik 路由器时，可能会看到有关[默认配置](/docs/7.24/getting-started/configuration-management/default-configurations)的提示。需要了解以下内容：

- **对于初学者：** 建议保留默认配置，因为它提供基本安全性和必要功能。
- **默认设置包括：** 基本防火墙、DHCP 服务器和默认无线安全设置（如适用）。
- **可以安全地自定义配置**，同时保留默认结构作为基础。

![Default configuration prompt](/img/37a911aa919894e3.png)

:::danger
删除默认配置会移除所有内置安全规则和服务。仅建议计划手动配置路由器的高级用户执行此操作。
:::

如果设备**没有默认配置**，或者已将其重置为干净状态，则必须手动设置网桥、LAN IP 地址和 DHCP 服务器——继续操作前请参阅 **[手动网络设置](/docs/7.24/getting-started/manual-network-setup)**。

## 配置互联网连接（WAN） {#configuring-the-internet-connection-wan}

要使路由器能够访问互联网，需要了解 ISP 使用的连接类型。请咨询 ISP，或使用以下说明：

- **DHCP / Dynamic IP** — 大多数电缆调制解调器和部分光纤连接。插入后即可自动获得互联网连接。
- **Static IP** — 企业连接或部分住宅光纤。ISP 提供了特定 IP 地址、网关和 DNS 服务器。
- **PPPoE** — DSL 连接或部分光纤提供商。ISP 提供了用于连接的用户名和密码。

:::tip
**不确定？** 从 DHCP 开始——它适用于约 80% 的家庭连接。
:::

### DHCP / 动态 IP（最常见） {#dhcp--dynamic-ip-most-common}

这是家庭用户最简单且最常见的设置。在公网接口上配置 DHCP 客户端，以自动从 ISP 获取 IP 地址、DNS 服务器、NTP 服务器和默认路由。

```ros
/ip/dhcp-client/add disabled=no interface=ether1
```

添加客户端后，验证分配的地址，并确认状态显示为“bound”：

```ros
[admin@MikroTik] > ip dhcp-client print
Columns: INTERFACE, USE-PEER-DNS, ADD-DEFAULT-ROUTE, STATUS, ADDRESS
# INTERFACE  USE-PEER-DNS  ADD-DEFAULT-ROUTE  STATUS  ADDRESS        
0 ether1     yes           yes                bound   1.2.3.100/24
```

### 静态 IP {#static-ip}

如果 ISP 提供了永不变化的特定网络设置，请使用此方式。ISP 提供三个参数：

- IP 地址：**`1.2.3.100/24`**
- 网关：**`1.2.3.1`**
- DNS 服务器：**`8.8.8.8`**

将 IP 地址添加到 WAN 接口，使用该网关创建默认路由，并设置 DNS 服务器：

```ros
/ip/address/add address=1.2.3.100/24 interface=ether1
/ip/route/add gateway=1.2.3.1
/ip/dns/set servers=8.8.8.8
```

### PPPoE

如果 ISP 提供了登录凭据，请使用此方式（DSL 提供商常见）。PPPoE 提供动态 IP 地址，并可自动配置 DNS 服务器和默认路由。

<Tabs>
<TabItem value="cli" label="CLI" default>

```ros
/interface/pppoe-client
add disabled=no interface=ether1 user=me password=123 \
  add-default-route=yes use-peer-dns=yes
```

</TabItem>
<TabItem value="winbox" label="WinBox / WebFig">

1. 打开 **PPP** 窗口，并切换到 **Interface** 选项卡。
2. 点击 <kbd>**New**</kbd> 或 <kbd>**+**</kbd> 按钮以添加新接口。
3. 从下拉列表中选择 **PPPoE Client**。
4. 输入连接名称，并选择 **ether1** 作为接口。

   ![](/img/edf9954b4e4acb7b.png)
5. Go to the **Dial Out** tab and enter your username and password provided by your ISP.
6. Configure any additional parameters as required by your ISP.
7. Click <kbd>**OK**</kbd> to save the settings.

   ![](/img/b58b7f7c04d8c45d.png)

</TabItem>
</Tabs>

:::warning
配置完成后，WAN 接口将变为 **pppoe-out1**，而不是 **ether1**。后续所有与 WAN 相关的配置均使用该接口。
:::

## 验证互联网连接 {#verify-internet-connectivity}

配置 WAN 连接后，确认路由器本身可以访问互联网。先通过 ping 一个已知的公共 IP 地址来测试 IP 连通性 —— Google 公共 DNS 服务器 `8.8.8.8`：

```ros
[admin@MikroTik] > /ping 8.8.8.8
  SEQ HOST                                     SIZE TTL TIME       STATUS             
    0 8.8.8.8                                    56  55 14ms399us 
    1 8.8.8.8                                    56  55 18ms534us 
    2 8.8.8.8                                    56  55 14ms384us 
```

然后通过 ping 域名来验证 DNS 解析是否正常：

```ros
[admin@MikroTik] > /ping google.com
  SEQ HOST                                     SIZE TTL TIME       STATUS             
    0 142.250.74.14                              56  55 14ms475us 
    1 142.250.74.14                              56  55 14ms308us 
    2 142.250.74.14                              56  55 14ms238us
```

如果 IP ping 成功但域名 ping 失败，则连接正常，但 DNS 配置不正确。如果两者都成功，则路由器自身的互联网连接完全正常。如果任一失败，请参阅 [Troubleshooting](#troubleshooting) 部分。

路由器后面的本地设备仍需有效的 NAT 规则才能访问互联网 —— 请参阅下一节。

## NAT 配置 {#nat-configuration}

:::note
如果保留了**默认配置**，WAN 接口上已配置源 NAT（masquerade）规则，因此本地设备已可以访问 Internet —— 可以跳过本节。以下步骤仅适用于路由器**没有默认配置**或正在构建自定义配置的情况。
:::

要使本地设备访问 Internet，路由器必须将其传出数据包的私有源地址转换为自身的公网 IP 地址。私有地址无法在 Internet 上路由，因此如果没有此转换，远程主机无法回复本地设备。可通过 WAN 接口上的源 NAT（masquerade）规则实现：

```ros
/ip/firewall/nat
add chain=srcnat out-interface=ether1 action=masquerade
```

:::danger
如果公网接口是 PPPoE、LTE 或任何其他类型，应将“out-interface”设置为该接口。
:::

也可以使用接口列表实现更灵活的配置。

首先，创建名为 WAN 的接口列表，并将所有外部接口添加到该列表中：

```ros
/interface list add name=WAN
/interface list member add list=WAN interface=ether1
```

然后在 NAT 规则中使用该接口列表：

```ros
/ip/firewall/nat
add chain=srcnat out-interface-list=WAN ipsec-policy=out,none action=masquerade
```

此配置的另一个好处是，默认情况下 Internet 无法直接访问路由器后的客户端，有助于保护它们免受未经请求的入站流量影响。

### 端口转发 {#port-forwarding}

某些客户端设备可能需要从互联网直接访问特定端口。例如，IP 地址为 192.168.88.254 的客户端设备必须能够通过远程桌面协议（RDP）访问。

快速搜索后，你可以发现 RDP 运行在 TCP 端口 3389 上。现在可以添加一条目标 NAT 规则，将 RDP 流量重定向到客户端 PC。

```ros
/ip/firewall/nat/add chain=dstnat action=dst-nat protocol=tcp dst-port=3389 to-addresses=192.168.88.254 to-ports=3389
```

:::tip
如果已设置严格的防火墙规则，则必须在防火墙 filter 的 forward 链中允许 RDP 协议。
:::

## 设置 Wireless / WiFi {#setting-up-wireless--wifi}

无线配置方式取决于你的 RouterOS 代际和驱动：

- **Modern WiFi**（`/interface wifi`）— 采用新 WiFi 协议栈的 RouterOS v7 设备。
- **Legacy Wireless**（`/interface wireless`）— RouterOS v6 和较旧的 v7 软件包。

本指南介绍基本的安全接入点配置（SSID + WPA2/WPA3 密码）。有关高级主题 — Wi-Fi 6/7、MLD / 多链路、多个射频、CAPsMAN、中继器以及按设备系列提供的指导 — 请参阅 [Wireless](/docs/7.24/wireless) 章节。

:::note
以下示例假设：country = `Latvia`，SSID = `MikroTik-12345`，在支持时启用 WPA2/WPA3，禁用 WPS。
:::

<Tabs>
<TabItem value="wifi" label="Modern WiFi (/interface wifi)" default>

创建安全配置文件：

```ros
/interface wifi security
add name=myProfile authentication-types=wpa2-psk,wpa3-psk \
  passphrase="YOUR_STRONG_PASSWORD"
```

配置射频：

```ros
/interface wifi
set [ find default-name=wifi1 ] configuration.country=Latvia \
  .mode=ap .ssid="MikroTik-12345" .hide-ssid=no \
  channel.width=20mhz disabled=no \
  security=myProfile security.wps=disable

set [ find default-name=wifi2 ] configuration.country=Latvia \
  .mode=ap .ssid="MikroTik-12345" .hide-ssid=no \
  channel.width=20mhz disabled=no \
  security=myProfile security.wps=disable
```

![](/img/1cb7c0cf6e4760c3.png)

</TabItem>
<TabItem value="legacy" label="Legacy Wireless (/interface wireless)">

创建安全配置文件：

```ros
/interface/wireless/security-profiles
add name="myProfile" authentication-types=wpa2-psk mode=dynamic-keys \
wpa2-pre-shared-key="YOUR_STRONG_PASSWORD"
```

配置射频：

```ros
/interface wireless
set [ find default-name=wlan1 ] band=2ghz-b/g/n channel-width=20/40mhz-Ce distance=indoors \
  mode=ap-bridge ssid=MikroTik-12345 wireless-protocol=802.11 \
  security-profile=myProfile frequency-mode=regulatory-domain \
  country=latvia antenna-gain=3

set [ find default-name=wlan2 ] band=5ghz-a/n/ac channel-width=20/40mhz-Ce distance=indoors \
  mode=ap-bridge ssid=MikroTik-12345 wireless-protocol=802.11 \
  security-profile=myProfile frequency-mode=regulatory-domain \
  country=latvia antenna-gain=3
```

<video controls width="600">
  <source src="/videos/wireless-setup_video.mp4" type="video/mp4" />
</video>

</TabItem>
</Tabs>

### 将无线接口添加到网桥 {#add-the-wireless-interface-to-the-bridge}

每个应提供 LAN 访问的无线接口都必须添加到网桥。否则，即使 WiFi 连接成功，无线客户端也无法获取 DHCP 地址、访问 LAN 设备或访问互联网。

:::note
如果保留了**默认配置**，无线接口通常已在网桥中，因此可以跳过此步骤。该步骤主要适用于手动配置，其中网桥创建为 `bridge1`。
:::

```ros
/interface bridge port
add interface=wifi1 bridge=bridge1
add interface=wifi2 bridge=bridge1
```

对于传统无线，请改用 `wlanN` 接口名称（例如 `wlan1`、`wlan2`）。

## 配置完成 {#configuration-complete}

此时，路由器应：

- 为本地设备提供互联网访问
- 使用 DHCP 自动分配 IP 地址
- 保护设备免受来自互联网的未经请求访问
- 提供无线连接（如适用）

现在可以继续学习更高级的主题，例如 VPN、VLAN、路由、监控和网络管理。

## 下一步：保护路由器安全 {#next-secure-your-router}

路由器现已上线。在投入生产之前，请加强其安全性以防止未经授权的访问：设置强密码和唯一用户名，保留默认防火墙规则，限制管理服务，并禁用任何不使用的功能。

有关完整的加固检查清单，请参阅 **[保护路由器安全](/docs/7.24/getting-started/securing-your-router)**，其中包括公共接口的防火墙规则、MAC 访问和邻居发现限制、服务端口加固以及 SSH 强加密。

## 故障排除 {#troubleshooting}

RouterOS 内置多种故障排除工具，例如 ping、traceroute、torch、数据包嗅探器、带宽测试等。

本文已使用 ping 工具[验证互联网连接](#verify-internet-connectivity)。

### ping 失败时的故障排除 {#troubleshoot-if-ping-fails}

`ping` 工具的问题在于，它只提示目标**不可达**，但不提供更详细的信息。下面检查一些基本错误。

无法从连接到 MikroTik 设备的计算机访问 [www.google.com](https://www.google.com)：

![](/img/b7cb6bca84393134.jpg)

:::tip
如果不确定如何配置网关设备，请联系 MikroTik 官方[顾问](https://mikrotik.com/consultants)获取配置支持。
:::
