---
sidebar_key: "network-management/proxy/reverse-proxy"
sidebar_position: 2
title: "反向代理"
sidebar_label: "反向代理"
description: "RouterOS 反向代理接受 HTTPS 连接，根据 TLS 服务器名称选择规则，并将请求以 HTTP 转发到路由器后方的服务器或容器应用。"
tags:
  - 'reverse-proxy'
  - 'certificates'
source: https://manual.mikrotik.com/docs/network-management/proxy/reverse-proxy
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**子菜单：** `/ip/reverse-proxy`

反向代理使路由器后面的 Web 服务器可以通过主机名经 HTTPS 访问，而无需为每台服务器配置目标 NAT 规则。路由器在端口 443 上接受 HTTPS 连接，并根据客户端请求的主机名选择规则。它使用该规则的证书终止 TLS，并将请求作为 HTTP 转发到该规则的服务器。多台服务器可以共享同一个公网地址和端口，每台服务器都有自己的主机名和证书。

RouterOS 还会自动为容器应用添加规则。

所有规则属性都在 [`/ip/reverse-proxy`](../../cli-reference/ip/reverse-proxy.md) CLI 参考中说明。

:::info
反向代理不支持 SMIPS 设备（hAP lite、hAP lite TC 和 hAP mini）。
:::

## 配置示例 {#configuration-example}

此示例使位于 `192.168.88.10`、端口 8080 的 Web 服务器可通过 `https://nas.example.com` 访问。

前置条件：

- DNS 名称 `nas.example.com` 解析到路由器的公网地址。
- 你拥有 `nas.example.com` 的证书和私钥，例如来自公共证书颁发机构，分别位于文件 `nas.crt` 和 `nas.key` 中。
- Web 服务器在端口 8080 上接受明文 HTTP。

将这两个文件上传到路由器，并将它们导入为名为 `nas` 的证书：

```ros
/certificate/import file-name=nas.crt name=nas passphrase=""
/certificate/import file-name=nas.key passphrase=""
```

添加规则：

```ros
/ip/reverse-proxy/add sni=nas.example.com ip-address=192.168.88.10 port=8080 certificate=nas
```

默认防火墙配置会丢弃不是来自 LAN 的、发往路由器的连接。在 input 链中、默认丢弃规则之前接受 HTTPS：

```ros
/ip/firewall/filter/add chain=input protocol=tcp dst-port=443 in-interface-list=WAN action=accept comment="reverse proxy" place-before=[find comment="defconf: drop all not coming from LAN"]
```

有关输入规则的更多信息，请参阅 [过滤器](../../firewall-and-quality-of-service/firewall/filter.md)。

## 规则选择 {#rule-selection}

路由器会将客户端在 TLS 握手中发送的服务器名称（Server Name Indication，SNI）与每个已启用规则的 `sni` 进行比较。名称必须完全匹配：诸如 `*.example.com` 的通配符不会匹配任何内容。当没有规则匹配时，路由器会关闭连接。

## 证书 {#certificates}

路由器会向客户端出示匹配规则的证书。当规则具有 `certificate=none` 时，路由器改为出示 [`/ip/service`](../../system-information-and-utilities/services.md) 中 `reverse-proxy` 服务的证书。当一个证书（例如通配符证书）涵盖多个规则的主机名时，请设置服务证书。当规则和服务都没有证书时，TLS 握手会失败。

## 发往服务器的请求 {#requests-to-the-server}

路由器从其自身地址连接到服务器，并将每个请求作为 HTTP/1.1 转发。即使服务器端口为 443，它也使用明文 HTTP，因此服务器必须在该端口上接受 HTTP。

路由器保留请求的 `Host` 头，并添加用于告知服务器原始客户端信息的头：

- `X-Forwarded-For` 和 `X-Real-Ip` - 客户端的地址。
- `X-Forwarded-Proto` - `https`。
- `X-Forwarded-Host` - 客户端请求的主机名。
- `Forwarded` - 路由器地址、客户端地址、协议和主机名，采用 RFC 7239 的格式。

## 服务端口 {#service-port}

反向代理监听 [`/ip/service`](../../system-information-and-utilities/services.md) 中 `reverse-proxy` 服务的端口，默认为 443。仅当至少存在一个已启用规则时，该端口才会开放。

:::warning
HTTPS Web 服务 `www-ssl` 默认也使用 443 端口。当两个服务在同一端口上启用时，先启动的那个会获得该端口，另一个则会显示 `cannot bind to port 443: Address in use`。重启之后，`www-ssl` 会获得该端口，因此即使反向代理在重启前能正常工作，重启后也会停止工作。

保持 `www-ssl` 处于禁用状态（这是默认设置），或将其移到其他端口：

```ros
/ip/service/set www-ssl port=8443
```
:::

## 容器应用 {#container-apps}

具有 `use-https=yes`（默认值）和 Web 界面的[容器应用](../../containers/apps/index.md)会获得一条动态反向代理规则，并通过 `D` 标志显示。该规则的 `sni` 是应用 URL（`ui-url`）的主机名，规则会转发到应用的 Web 端口。该规则使用 `/app/settings` 中设置的证书。

## 故障排除 {#troubleshooting}

反向代理会使用 `rproxy` 主题将其消息写入日志：

```ros
/log/print where topics~"rproxy"
```

- `no matching rule for <name>, client: <address>:<port>` - 客户端请求的主机名没有任何已启用规则将其作为 `sni`。
- `certificate missing for rule <sni>` - 规则和 `reverse-proxy` 服务都没有证书。

当反向代理完全不接受连接时，请检查是否至少启用了一条规则。然后检查 `/ip/service/print` 中 `reverse-proxy` 服务是否有 `cannot bind to port` 注释，这意味着另一个服务（通常是 `www-ssl`）使用了相同端口。
