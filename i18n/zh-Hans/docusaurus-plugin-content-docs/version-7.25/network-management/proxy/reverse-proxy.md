---
title: "反向代理"
description: "RouterOS 反向代理接受 HTTPS 连接，根据 TLS 服务器名称选择规则，并将请求作为 HTTP 转发到路由器后面的服务器或容器应用。"
tags:
  - 'reverse-proxy'
  - 'certificates'
source: https://manual.mikrotik.com/docs/7.25/network-management/proxy/reverse-proxy
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "network-management/socks"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**子菜单：** `/ip/reverse-proxy`

反向代理使路由器后面的 Web 服务器可以通过主机名经 HTTPS 访问，而无需为每台服务器配置目标 NAT 规则。路由器在端口 443 上接受 HTTPS 连接，并根据客户端请求的主机名选择规则。它使用该规则的证书终止 TLS，并将请求作为 HTTP 转发到该规则的服务器。多台服务器可以共用一个公网地址和端口，每台服务器使用各自的主机名和证书。

RouterOS 还会自动为容器应用添加规则。

所有规则属性均在 [`/ip/reverse-proxy`](/docs/cli-reference/ip/reverse-proxy) CLI 参考中说明。

:::info
SMIPS 设备（hAP lite、hAP lite TC 和 hAP mini）不支持反向代理。
:::

## 配置示例 {#configuration-example}

此示例使 `192.168.88.10` 端口 8080 上的 Web 服务器可通过 `https://nas.example.com` 访问。

Prerequisites:

- DNS 名称 `nas.example.com` 解析到路由器的公网地址。
- 你拥有 `nas.example.com` 的证书和私钥，例如来自公共证书颁发机构的证书和私钥，文件为 `nas.crt` 和 `nas.key`。
- Web 服务器在端口 8080 上接受明文 HTTP。

将两个文件上传到路由器，并导入为名为 `nas` 的证书：

```ros
/certificate/import file-name=nas.crt name=nas passphrase=""
/certificate/import file-name=nas.key passphrase=""
```

添加规则：

```ros
/ip/reverse-proxy/add sni=nas.example.com ip-address=192.168.88.10 port=8080 certificate=nas
```

默认防火墙配置会丢弃并非来自 LAN 的到路由器的连接。在默认丢弃规则之前，在 input 链中接受 HTTPS：

```ros
/ip/firewall/filter/add chain=input protocol=tcp dst-port=443 in-interface-list=WAN action=accept comment="reverse proxy" place-before=[find comment="defconf: drop all not coming from LAN"]
```

有关 input 规则的更多信息，请参阅 [Filter](/docs/firewall-and-quality-of-service/firewall/filter)。

## 规则选择 {#rule-selection}

路由器会将客户端在 TLS 握手中发送的服务器名称（Server Name Indication，SNI）与每个已启用规则的 `sni` 进行比较。名称必须完全匹配：诸如 `*.example.com` 之类的通配符不会匹配任何内容。当没有规则匹配时，路由器会关闭连接。

## 证书 {#certificates}

路由器向客户端提供匹配规则的证书。当规则设置了 `certificate=none` 时，路由器改为提供 [`/ip/service`](/docs/system-information-and-utilities/services) 中 `reverse-proxy` 服务的证书。当一个证书（例如通配符证书）覆盖多个规则的主机名时，请设置服务证书。当规则和服务均未设置证书时，TLS 握手失败。

## 对服务器的请求 {#requests-to-the-server}

路由器使用自身地址连接服务器，并将每个请求作为 HTTP/1.1 转发。即使服务器端口为 443，路由器也使用明文 HTTP，因此服务器必须在该端口接受 HTTP。

路由器保留请求的 `Host` 标头，并添加用于向服务器说明原始客户端的标头：

- `X-Forwarded-For` 和 `X-Real-Ip` - 客户端地址。
- `X-Forwarded-Proto` - `https`。
- `X-Forwarded-Host` - 客户端请求的主机名。
- `Forwarded` - 路由器地址、客户端地址、协议和主机名，采用 RFC 7239 格式。

## 服务端口 {#service-port}

反向代理监听 [`/ip/service`](/docs/system-information-and-utilities/services) 中 `reverse-proxy` 服务的端口，默认为 443。仅当至少存在一条启用的规则时，该端口才会打开。

:::warning
HTTPS Web 服务 `www-ssl` 默认也使用端口 443。当两个服务在同一端口上启用时，先启动的服务会占用该端口，另一个服务会显示 `cannot bind to port 443: Address in use`。重启后，`www-ssl` 会占用该端口，因此即使反向代理在重启前正常工作，也会停止工作。

保持 `www-ssl` 禁用（默认设置），或将其移至其他端口：

```ros
/ip/service/set www-ssl port=8443
```
:::

## Container 应用 {#container-apps}

启用了 `use-https=yes`（默认设置）并带有 Web 接口的 [Container 应用](/docs/containers/apps) 会获得一条动态反向代理规则，显示为 `D` 标志。该规则的 `sni` 是应用 URL 的主机名（`ui-url`），规则会转发到应用的 Web 端口。该规则使用 `/app/settings` 中设置的证书。

## 故障排除 {#troubleshooting}

反向代理会将消息写入日志，主题为 `rproxy`：

```ros
/log/print where topics~"rproxy"
```

- `no matching rule for <name>, client: <address>:<port>` - 客户端请求的主机名与任何已启用规则的 `sni` 都不匹配。
- `certificate missing for rule <sni>` - 规则本身和 `reverse-proxy` 服务均未配置证书。

当反向代理完全不接受连接时，请检查是否至少启用了一条规则。然后在 `/ip/service/print` 中检查 `reverse-proxy` 服务是否存在 `cannot bind to port` 注释，这表示另一项服务（通常为 `www-ssl`）正在使用相同端口。
