---
title: "WebFig"
description: "WebFig 是基于 Web 的 RouterOS 工具，可用于监控、配置和故障排除，无需其他软件。它支持带证书管理的 HTTPS，包括通配符证书，并通过 SSL/TLS 提供安全访问，以便配置路由器。"
tags:
  - 'webfig'
  - 'https'
  - 'terminal'
source: https://manual.mikrotik.com/docs/7.25/management-tools/webfig
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "management-tools"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 简介 {#introduction}

WebFig 是基于 Web 的 RouterOS 管理工具，可用于配置、监控和排查路由器故障。它是 WinBox 的替代方案，提供类似的布局，并可访问几乎所有 RouterOS 功能。

作为平台无关的工具，WebFig 可用于从任何带有 Web 浏览器的设备管理路由器，无需安装特定于平台的软件。

WebFig 支持三种主要功能：

- 配置 - 查看和修改当前路由器配置。
- 监控 - 监控路由器状态、路由信息、接口统计、日志和其他运行数据。
- 故障排查 - 访问并使用 RouterOS 内置诊断工具，例如 Ping、Traceroute、Packet Sniffer、Traffic Generator 等。

## 连接到路由器 {#connecting-to-a-router}

如 [First Time Configuration](/docs/getting-started/first-time-configuration) 部分所述，设备默认可使用用户名 **admin** 访问，密码为空或为设备标签上提供的默认密码（取决于型号）。打开 Web 浏览器，在地址栏中输入设备 IP 地址；默认为 `192.168.88.1`。确保管理设备配置了同一子网中的 IP 地址（例如 `192.168.88.2`），否则 Layer 3 连接无法工作。

![](/img/0f36f8d8724f2e8b.png)

## 启用 HTTPS {#enable-https}

WebFig 通常仅从本地网络使用：默认情况下，防火墙会阻止 WAN 端口上的路由器 Web 服务，你通过 LAN 地址访问路由器（例如 `192.168.88.1`）。启用 HTTPS 会加密该管理流量，使凭据和配置不会以明文形式在 LAN 中传输。

使用哪种证书取决于你如何访问路由器：

- **通过其 LAN IP 地址或内部主机名（常见情况）** — 使用路由器上生成的自签名证书。公共证书颁发机构无法为 `192.168.88.1` 等私有地址颁发证书，因此这是默认方法。
- **通过真实的公共域名** — 可以使用来自 Let's Encrypt 的公共受信任证书，并在不分发 CA 的情况下避免浏览器警告。这仅在实际使用该域名打开 WebFig 时有效，因此主要适用于通过公共名称而非 LAN IP 管理的路由器（详见以下部分）。

### 使用自签名证书 {#use-a-self-signed-certificate}

自签名证书会立即加密连接。浏览器在首次使用时不会信任它，但你可以导出路由器的根 CA，并将其导入到用于管理路由器的计算机的受信任存储中，以消除警告。

:::tip
WebFig 支持通配符证书。你可以通过在 common-name 属性中指定通配符来生成证书，例如 `common-name=*.mikrotik.com`。
:::

要生成自己的证书并启用 HTTPS 访问，必须配置以下内容：

#### 在路由器上创建自己的根 CA 并对其进行签名 {#create-your-own-root-ca-on-the-router-and-sign-it}

```ros
[admin@MikroTik] > certificate add name=local-cert common-name=local-cert key-usage=key-cert-sign,crl-sign 
[admin@MikroTik] > /certificate/sign local-cert 
  progress: done
```

:::warning
如果你已有 Certificate Authority，或使用外部服务对证书进行签名，请在外部创建并签名证书，随后将其导入路由器。导入证书时，请确保将其标记为受信任。
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

#### 启用 HTTPS 服务并指定证书 {#enable-the-https-service-and-assign-the-certificate}

```ros
[admin@MikroTik] > /ip/service/set www-ssl certificate=WebFig disabled=no
```

现在可以通过 **`https://192.168.88.1`** 访问 WebFig。

:::warning
大多数 Web 浏览器默认不信任自签名证书，因此首次连接时需要接受警告或手动信任该证书。也可以导出根 CA 证书，并将其导入操作系统或浏览器的信任存储。浏览器维护自己的信任存储，可能与操作系统的信任存储不同——在操作系统级别信任证书可能不会影响浏览器。
:::

### 使用受公众信任的证书（Let's Encrypt） {#use-a-publicly-trusted-certificate-lets-encrypt}

如果你通过真实的公共域名而不是 LAN IP 访问路由器，则可以使用浏览器信任的 [Let's Encrypt](https://letsencrypt.org/) 证书，并跳过分发根 CA。RouterOS 内置了 [ACME 客户端](/docs/7.24/authentication-authorization-accounting/certificates#acme-client) 用于此目的。

在选择此方案之前，请注意它与仅限 LAN 的环境如何相互作用：

- 公共 CA 不会为私有 IP 地址颁发证书，因此在通过 `https://192.168.88.1` 打开 WebFig 时，这**不会**消除警告。
- 证书仅对其域名有效，因此你必须通过该名称浏览 WebFig。要使该名称在 LAN 内解析到路由器，通常需要一条本地（split-horizon）DNS 记录，将其指向 LAN 地址。
- DNS-01 挑战——用于 [IP Cloud](/docs/7.24/network-management/cloud#ddns) `<id>.sn.mynetname.net` 名称——不需要入站 WAN 端口，因此即使防火墙阻止从 WAN 访问 WebFig，它仍然可用。

为路由器的 IP Cloud DDNS 名称申请证书：

```ros
/ip/cloud/set ddns-enabled=yes
/certificate/add-acme domain-names=[/ip/cloud/get dns-name]
```

或者为你自己的域名申请：

```ros
/certificate/add-acme domain-names=router.example.com
```

颁发的证书以域名命名，并在 `/certificate/print` 中显示为带有 `a`（acme-manage）标志。将其分配给 `www-ssl` 服务，然后通过该域名打开 WebFig：

```ros
/ip/service/set www-ssl certificate=router.example.com disabled=no
```

证书会在其有效期过去 80% 后自动续期。

## 终端 {#terminal}

WebFig 右上角的 **Terminal**（命令行界面，CLI）可用。它提供与 WinBox 界面中的 New Terminal 相同的功能。

![WebFig Terminal](/img/98cf6c711e22f464.png)

## Skins

WebFig **Design Skin** 是用于自定义界面外观以提升可用性的工具。它不是安全功能。具有足够权限的用户仍可通过其他方式访问所有可用配置选项，包括直接 CLI 访问。

### 设计皮肤 {#designing-skins}

如果用户具有足够权限（用户组启用了 `policy` 和 `sensitive` 策略），**Design Skin** 按钮将变为可用。启用该选项会打开界面自定义工具。

要限制对 **Design Skin** 菜单的访问，请在用户组配置中禁用 `policy` 和 `sensitive` 权限。

**可用操作：**

![](/img/0a00e206cc7f6a8f.png)

- **Hide menu** - 隐藏菜单及其所有子菜单。
- **Hide submenu** - 隐藏特定子菜单。
- **Hide tabs** - 隐藏多标签视图中的单个标签。
- **Rename menus and items** - 更改菜单标签，例如用于本地化或提高清晰度。
- **Add a note to an item** - 在详细视图中添加注释。
- **Make item read-only** - 为防止误改，禁止编辑选定字段。
- **Hide flags** - 在列表视图和详细视图中隐藏标志。

![](/img/c8c244ccc36e3ad3.png)

- **Add field limits** - 限制详细视图中允许的值：
  - **Numeric intervals (..)** - 定义允许的范围，例如对 **MTU** 等数字字段使用 `1..10`。
  - **Field prefix limits** - 限制文本字段允许的前缀。末尾的 `$` 强制进行精确前缀匹配。例如，`station$` 将值限制为仅 **station**。

  ![](/img/a1d18d4f6156955e.png)

- **Add tab** - 在字段前插入带标签的分节分隔线。
- **Add separator** - 在字段前插入水平分隔线。

:::note
数字区间不能超出 RouterOS 对特定字段定义的限制。
:::

:::note
Set 字段表示可选选项的集合（复选框集），例如用户组策略或 RADIUS 服务设置。
:::

:::note
应用于 combo-box 字段的限制也会限制可用的下拉选项。
:::

### Skin 设计示例 {#skin-design-example}

要将用户限制为特定服务，请在 RADIUS Service 字段中添加限制。

![](/img/b8b4b60798134f4d.webp)

最终配置仅允许 **Limit** 字段中指定的服务。

![](/img/c39baa1a2067052d.webp)

![](/img/0ff4ec2dab43d50b.webp)

### 自定义皮肤 {#customizing-skins}

可在皮肤 `*.json` 文件中使用的 **Status page** 结构示例如下：[status_main_example.json](pathname:///assets/297795616_status_main_example.json)

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

别名路径（例如：**`"IP:Firewall:Filter Rules:*17:Statistics:Packet Rate Graph"`** 和对应的 URL：`"router_IP/WebFig/#IP:Firewall.Filter_Rules.17"`）由以冒号分隔的组成部分构成：

- **Group**（如有）→ `IP:`
- **Service 或 Name** → `Firewall:`
- **Container 或 Tab Name** → `Filter Rules:`
- **星号（\*）和 Object ID** → 取自已打开项目的 URL（例如，`17`）
- **Tab name**（如适用）→ `Statistics`
- **Field name** → `Packet Rate Graph`

![](/img/b164bc74026476ff.png)

### 使用皮肤 {#using-skins}

要应用皮肤，请将其分配给用户组。分配后，该组中的所有用户在登录 WebFig 或 WinBox 时都会自动使用所选皮肤。

```ros
/user/group/set your_group_name skin=your_skin
```

要在另一台路由器上使用皮肤，请将皮肤文件复制到目标设备上的 skins 目录。复制后，将该皮肤分配给该路由器上的用户组以启用它。
