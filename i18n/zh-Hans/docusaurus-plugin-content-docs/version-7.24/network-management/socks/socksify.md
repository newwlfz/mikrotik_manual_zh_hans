---
title: "Socksify"
description: "Socksify 支持将特定流量路由到 SOCKS 代理服务器，使不具备原生代理支持的应用程序也可以使用代理。它支持多个服务，并可通过防火墙过滤器进行配置，以实现精确的流量管理，包括使用 TOR 的示例。"
tags:
  - 'socksify'
  - 'firewall'
  - 'nat'
source: https://manual.mikrotik.com/docs/7.24/network-management/socks/socksify
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "network-management/socks"
pagination_next: "user-guides/routing-and-networking-protocols"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

[*Socksify CLI Reference*](/docs/cli-reference/ip/socksify)

Socksify 是一项服务，可让路由器将特定流量通过 SOCKS 代理服务器发送，即使应用本身不原生支持代理连接也是如此。  
它会拦截网络调用，并将其重定向到已配置的 SOCKS 代理。

Socksify 服务与 [NAT](/docs/firewall-and-quality-of-service/firewall/nat) action=`socksify` 配合使用。可以使用所有可用的防火墙过滤器，精确选择仅将特定应用或来源的流量通过 SOCKS 代理重定向。

可以同时配置多个 Socksify 服务，从而连接到多个 SOCKS 服务器，以更好地管理流量。

### 属性说明 {#property-description}

**子菜单：** `/ip/socksify`

| 属性 | 说明 |
| :-- | :-- |
| **disabled** (*yes* \| *no*；默认值：yes) | Socksify 记录是否处于活动状态。 |
| **socks5-password** (*string*；默认值： ) | 访问 SOCKS5 代理服务器的密码。 |
| **socks5-user**(*string*；默认值： ) | 访问 SOCKS5 代理服务器的用户名。 |
| **connection-timeout** (*integer:* 0..3000；默认值：60) | 在连接建立期间等待 SOCKS 代理或目标响应的秒数，超过该时间将中止并报错。将该值设置为 0 会禁用连接超时。 |
| **name**(*string*；默认值： ) | Socksify 服务的名称。 |
| **socks5-port**(*integer*: 1..65535；默认值：1080) | SOCKS5 代理服务器的监听端口。 |
| **socks5-server**(*IPv4;* 默认值：0.0.0.0 ) | SOCKS5 代理服务器的 IP 地址。（仅支持 IPv4 地址） |
| **port** (*integer*: 1..65535；默认值：952) | Socksify 服务使用的 TCP 端口。 |

## 配置示例 {#configuration-examples}

### 与 TOR SOCKS5 代理服务器配合使用 {#use-in-combination-with-tor-socks5-proxy-server}

Socksify 可与 TOR 配合使用，为未集成 SOCKS 支持的应用程序提供更好的隐私和匿名性。  
以下配置可让你通过 TOR SOCKS5 代理服务器转发 HTTP/s 流量。  
首先需要配置 socksify 服务。

```ros
/ip/socksify 
add connection-timeout=10 disabled=no name=TOR_socksify socks5-port=9050 socks5-server=<TOR_SOCKS_proxy_IP>
```

之后需要配置防火墙，以确保正确的流量被 socksify 处理，并允许 socks 流量通过。

```ros
/ip/firewall/filter
add action=accept chain=input dst-port=952 protocol=tcp src-address=<SOCKS_client_IP> 
/ip/firewall/nat
add action=socksify chain=dstnat dst-port=80,443 protocol=tcp socksify-service=TOR_socksify src-address=<SOCKS_client_IP> 
```

### TOR 容器和安全 DNS 教程 {#tor-container-and-secure-dns-tutorial}

由于 RouterOS 支持运行容器，你也可以在容器中设置 Tor 代理。此外，如果你要使用 Tor 浏览网页，应考虑保护 DNS 请求。

有关详细的分步说明，请观看视频[此处](https://www.youtube.com/watch?v=ECRjxpb5IgE&lc=Ugy6V6EEAwyu2UC8ZJB4AaABAg)。
