---
sidebar_key: "management-tools/webfig"
sidebar_position: 1
title: "WebFig"
sidebar_label: "WebFig"
description: "WebFig 是一种基于 Web 的 RouterOS 实用工具，无需额外软件即可进行监控、配置和故障排除。它支持带证书管理的 HTTPS，包括通配符证书，并通过 SSL/TLS 为路由器配置提供安全访问。"
tags:
  - 'webfig'
  - 'https'
  - 'terminal'
source: https://manual.mikrotik.com/docs/management-tools/webfig
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 简介 {#introduction}

WebFig 是一个基于 Web 的 RouterOS 管理工具，可用于配置、监控和排查路由器故障。它作为 WinBox 的替代方案，提供相似的布局，并且几乎可以访问所有 RouterOS 功能。

作为一个平台无关的工具，WebFig 可用于从任何带 Web 浏览器的设备管理路由器，无需安装平台专用软件。

WebFig 支持三项主要功能：

- 配置 - 查看和修改当前路由器配置。
- 监控 - 监控路由器状态、路由信息、接口统计信息、日志及其他运行数据。
- 故障排查 - 访问并使用内置的 RouterOS 诊断工具，如 Ping、Traceroute、Packet Sniffer、Traffic Generator 等。

## 连接到路由器 {#connecting-to-a-router}

如 [首次配置](../getting-started/first-time-configuration.md) 部分所述，默认情况下可使用用户名 **admin** 以及无密码或设备标签上提供的默认密码（取决于型号）访问设备。打开 Web 浏览器，在地址栏中输入设备 IP 地址；默认地址为 `192.168.88.1`。确保管理设备配置了同一子网中的 IP 地址（例如 `192.168.88.2`），否则三层连通性将无法正常工作。

![](/img/0f36f8d8724f2e8b.png)

## 启用 HTTPS {#enable-https}

WebFig 通常仅从本地网络使用：默认情况下，防火墙会阻止 WAN 端口上的路由器 Web 服务，你通过路由器的 LAN 地址（例如 `192.168.88.1`）访问路由器。启用 HTTPS 会加密此管理流量，从而避免凭据和配置以明文形式在 LAN 中传输。

使用哪种证书取决于你访问路由器的方式：

- **通过其 LAN IP 地址或内部主机名（常见情况）** — 使用在路由器上生成的自签名证书。公共证书颁发机构无法为 `192.168.88.1` 等私有地址签发证书，因此这是默认做法。
- **通过真实的公共域名** — 你可以使用 Let's Encrypt 签发的公开受信任证书，从而避免浏览器警告，而无需分发 CA。仅当你实际使用该域名打开 WebFig 时这才有帮助，因此它主要适用于通过公共名称而非 LAN IP 管理的路由器（将在下一节中介绍）。

### 使用自签名证书 {#use-a-self-signed-certificate}

自签名证书会立即加密连接。浏览器在首次使用时不会信任它，但你可以通过导出路由器的根 CA，并将其导入用于管理该路由器的计算机的受信任存储中，来消除警告。

:::tip
WebFig 支持通配符证书。你可以通过在 common-name 属性中指定通配符来生成一个，例如 `common-name=*.mikrotik.com`。
:::

要生成你自己的证书并启用 HTTPS 访问，必须配置以下内容：

#### 在路由器上创建你自己的根 CA 并为其签名 {#create-your-own-root-ca-on-the-router-and-sign-it}

```ros
[admin@MikroTik] > certificate add name=local-cert common-name=local-cert key-usage=key-cert-sign,crl-sign 
[admin@MikroTik] > /certificate/sign local-cert 
  progress: done
```

:::warning
如果你已有证书颁发机构，或正在使用外部服务签发证书，请在外部创建并签署证书，然后再将其导入路由器。导入证书时，请确保将其标记为受信任。
:::

#### 为 WebFig 创建证书（终端实体证书） {#create-a-certificate-for-webfig-end-entity-certificate}

```ros
[admin@MikroTik] > certificate add name=WebFig common-name=192.168.88.1
[admin@MikroTik] > certificate sign WebFig 
  progress: done
```

证书列表示例：

```ros
[admin@MikroTik] > /certificate/print
Flags: K - private-key; A - authority; T - trusted
Columns:NAME        COMMON-NAME     FINGERPRINT                                                     
0  KAT  local-cert  local-cert      9b6363d033c4b2e6893c340675cfb8d1e330977526dba347a440fabffd983c5d
1  KAT  WebFig      192.168.88.1    9f84ac2979bea65dccd02652056e5559bcdf866f8da5f924139d99453402bd02
```

#### 启用 HTTPS 服务并分配证书 {#enable-the-https-service-and-assign-the-certificate}

```ros
[admin@MikroTik] > /ip/service/set www-ssl certificate=WebFig disabled=no
```

现在你可以通过 **`https://192.168.88.1`** 访问 WebFig。

:::warning
大多数 Web 浏览器默认不信任自签名证书，因此首次连接时你需要接受警告或手动信任该证书。或者，导出根 CA 证书并将其导入操作系统或浏览器的信任存储。浏览器维护自己的信任存储，这可能与操作系统的信任存储不同——在操作系统级别信任该证书可能不会影响浏览器。
:::

### 使用公共受信任证书（Let's Encrypt） {#use-a-publicly-trusted-certificate-lets-encrypt}

如果你通过真实的公共域名而非 LAN IP 访问路由器，你可以使用来自 [Let's Encrypt](https://letsencrypt.org/) 的浏览器受信任证书，并跳过分发根 CA。RouterOS 为此包含内置的 [ACME 客户端](../authentication-authorization-accounting/certificates.md#acme-client)。

在选择此选项之前，请注意它与仅 LAN 环境如何相互影响：

- 公共 CA 不会为私有 IP 地址签发证书，因此当你通过 `https://192.168.88.1` 打开 WebFig 时，这 **不会** 消除警告。
- 证书仅对其域名有效，因此你必须通过该名称浏览 WebFig。要使该名称在 LAN 内解析到路由器，通常需要一条指向 LAN 地址的本地（分离解析）DNS 记录。
- DNS-01 挑战——用于 [云](../network-management/cloud/index.md#ddns) `<id>.sn.mynetname.net` 名称——不需要入站 WAN 端口，因此即使防火墙阻止来自 WAN 的 WebFig 访问，它仍然可以工作。

为路由器的 IP Cloud DDNS 名称请求证书：

```ros
/ip/cloud/set ddns-enabled=yes
/certificate/add-acme domain-names=[/ip/cloud/get dns-name]
```

或为你的自有域名请求证书：

```ros
/certificate/add-acme domain-names=router.example.com
```

签发的证书以该域名命名，并在 `/certificate/print` 中带有 `a`（acme-manage）标志显示。将其分配给 `www-ssl` 服务，然后通过该域名打开 WebFig：

```ros
/ip/service/set www-ssl certificate=router.example.com disabled=no
```

有效期过去 80% 后，证书会自动续期。

## 终端 {#terminal}

WebFig 中的 **终端**（命令行界面，CLI）位于右上角。它提供与 WinBox 界面中的 New Terminal 相同的功能。

![WebFig Terminal](/img/98cf6c711e22f464.png)

## 皮肤 {#skins}

WebFig **Design Skin** 是一个用于自定义界面外观以提升易用性的工具。它不是安全功能。具有足够权限的用户仍可通过其他方式访问所有可用的配置选项，包括直接 CLI 访问。

### 设计皮肤 {#designing-skins}

如果用户具有足够权限（用户组启用了 `policy` 和 `sensitive` 策略），则 **Design Skin** 按钮可用。启用此选项会打开界面自定义工具。

要限制对 **Design Skin** 菜单的访问，请在用户组配置中禁用 `policy` 和 `sensitive` 权限。

**可用操作：**

![](/img/0a00e206cc7f6a8f.png)

- **隐藏菜单** - 隐藏一个菜单及其所有子菜单。
- **隐藏子菜单** - 隐藏特定子菜单。
- **隐藏选项卡** - 隐藏多选项卡视图中的各个选项卡。
- **重命名菜单和项目** - 更改菜单标签，例如用于本地化或提高清晰度。
- **向项目添加注释** - 在详细视图中添加注释。
- **将项目设为只读** - 为防止误操作，阻止编辑所选字段。
- **隐藏标志** - 在列表视图和详细视图中隐藏标志。

![](/img/c8c244ccc36e3ad3.png)

- **添加字段限制** - 限制详细视图中允许的值：
  - **数值区间 (..)** - 定义允许的范围，例如为 **MTU** 等数值字段定义 `1..10`。
  - **字段前缀限制** - 限制基于文本的字段允许的前缀。末尾的 `$` 会强制精确前缀匹配。例如，`station$` 仅允许值为 **station**。

  ![](/img/a1d18d4f6156955e.png)

- **添加选项卡** - 在字段前插入带标签的分节符。
- **添加分隔符** - 在字段前插入水平分隔符。

:::note
数值区间不能超出 RouterOS 为给定字段定义的限制。
:::

:::note
集合字段表示可选选项的集合（复选框集合），例如用户组策略或 RADIUS 服务设置。
:::

:::note
应用于组合框字段的限制也会限制可用的下拉选项。
:::

### 皮肤设计示例 {#skin-design-example}

要将用户限制为特定服务，请向 RADIUS Service 字段添加限制。

![](/img/b8b4b60798134f4d.webp)

生成的配置仅允许 **Limit** 字段中指定的服务。

![](/img/c39baa1a2067052d.webp)

![](/img/0ff4ec2dab43d50b.webp)

### 自定义皮肤 {#customizing-skins}

可在此处获取一个可用于皮肤 `*.json` 文件的 **Status page** 结构示例：[status_main_example.json](pathname:///assets/297795616_status_main_example.json)

状态内容遵循以下结构：
`{"Status": {"Status": {}}}`

状态记录按顺序显示，例如：

```json
"7": {
  "alias": (path to the record),
  "note": (optional; free form text that appears under the record),
  "name": (optional; alternative name for the record),
  "tab": (optional; name of the tab that this and following records belong to),
  "separator": 1 (optional; should a separating line be placed before this record)
},
```

**路径（别名）结构**

别名路径（例如：**`"IP:Firewall:Filter Rules:*17:Statistics:Packet Rate Graph"`** 以及对应的 URL：`"router_IP/WebFig/#IP:Firewall.Filter_Rules.17"`）由以冒号分隔的组件组成：

- **组**（如果有）→ `IP:`
- **服务或名称** → `Firewall:`
- **容器或标签页名称** → `Filter Rules:`
- **星号 (\*) 和对象 ID** → 取自打开项的 URL（例如 `17`）
- **标签页名称**（如果适用）→ `Statistics`
- **字段名称** → `Packet Rate Graph`

![](/img/b164bc74026476ff.png)

### 使用皮肤 {#using-skins}

要应用皮肤，请将其分配给用户组。分配后，该组中的所有用户在登录 WebFig 或 WinBox 时都会自动使用所选皮肤。

```ros
/user/group/set your_group_name skin=your_skin
```

要在另一台路由器上使用皮肤，请将皮肤文件复制到目标设备上的 skins 目录中。复制后，将该皮肤分配给该路由器上的用户组以启用它。
