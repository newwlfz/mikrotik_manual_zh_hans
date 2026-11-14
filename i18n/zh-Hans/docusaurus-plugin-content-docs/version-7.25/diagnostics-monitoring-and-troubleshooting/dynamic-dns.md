---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/dynamic-dns"
sidebar_position: 18
title: "DNS 更新"
sidebar_label: "DNS 更新"
description: "DNS 更新工具会向某个区域的权威 DNS 服务器发送一条 RFC 2136 动态更新，该更新使用 TSIG hmac-md5 密钥进行签名，用于将某个名称指向一个 IPv4 地址。"
tags:
  - 'dns-updates'
  - 'dynamic-ip'
  - 'hmac-md5'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/dynamic-dns
captured_at: '2026-11-04T11:15:18+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

`/tool/dns-update` 命令会向某个区域的权威 DNS 服务器发送一条动态更新（RFC 2136），并把该区域中的某个名称指向一个 IPv4 地址。该更新使用 TSIG 密钥（RFC 8945）签名，因此服务器可以验证该更新来自你，就像安全动态更新（RFC 3007）那样。请把它用于你自己运行的区域，例如 BIND 服务器上的区域。

在以下两种常见情况下，你并不需要此命令：

- 如果某个名称需要跟随路由器自身的公网地址，而又不想运行 DNS 服务器，请使用 [云](../network-management/cloud/index.md#ddns) 的 DDNS 服务。
- 通过 HTTP 接收更新的动态 DNS 服务（例如 DynDNS）则应使用 [获取](../system-information-and-utilities/fetch.md) 来更新。

## 先决条件 {#prerequisites}

- 一台对该区域具有权威性、并通过 TCP 端口 53 接受动态更新的 DNS 服务器。
- 服务器接受用于更新该区域的 TSIG 密钥，算法为 hmac-md5。RouterOS 仅使用 hmac-md5 签名；该命令没有算法设置。
- 密钥的名称及其 base64 编码的密钥值，与服务器上的配置一致。例如在 BIND 上，使用 `tsig-keygen -a hmac-md5 dns-update-key` 创建密钥，因为 BIND 默认使用另一种算法创建密钥；并只允许该密钥更新它所需的名称（`update-policy`）。
- 路由器时钟与服务器时钟的偏差小于 5 分钟。签名允许 300 秒的偏差，因此请保持时钟与 [NTP](../system-information-and-utilities/ntp.md) 同步。
- 服务器侧的防火墙允许来自路由器的 TCP 端口 53。

## 让名称指向某个地址 {#point-a-name-at-an-address}

在 DNS 服务器 192.0.2.53 上，使用密钥 `dns-update-key` 把 `office.example.com` 指向 198.51.100.20。请把 `key` 的值替换为你密钥的 base64 密钥值，并保留引号，因为 base64 值可能以 `=` 结尾：

```ros
/tool/dns-update dns-server=192.0.2.53 zone=example.com \
    name=office address=198.51.100.20 ttl=300 \
    key-name=dns-update-key key="c2VjcmV0LWtleS1mb3ItZXhhbXBsZQ=="
```

`ttl=300` 会在其他 DNS 服务器的缓存中保留该记录 5 分钟，因此它们能很快获知地址变更。不指定 `ttl` 时，记录的有效期为一天。

当服务器接受更新时，该命令不输出任何内容。当服务器不接受时，命令会以 `failure:` 消息停止；“故障排查”一节列出了每条消息的含义。

各参数的工作方式：

- `name` 相对于 `zone`：`name=office` 配合 `zone=example.com` 会更新 `office.example.com`。若写完整名称则会被重复拼接：`name=office.example.com` 会更新 `office.example.com.example.com`。带结尾点的名称会被拒绝，并返回 `failure: bad name`。
- 该更新会先删除该名称的所有 A 记录，然后添加新记录，因此它是替换地址，而不是再添加一个地址。
- `ttl` 以秒为单位设置记录的生存时间。不指定 `ttl` 时，记录获得 86400 秒（一天），对于会变化的地址来说这太长了。
- `address` 只接受一个 IPv4 地址。提供两个地址会失败并返回 `failure: only one address allowed`，IPv6 地址会被拒绝。该命令只更新 A 记录。

## 保持名称最新 {#keep-the-name-current}

该命令每次运行只发送一条更新。要让名称始终指向会变化的地址，可在地址变化时从脚本中运行它，例如在 WAN 接口上 [DHCP 客户端](../network-management/dhcp/client.md) 的租约脚本中运行，或通过 [scheduler](../system-information-and-utilities/scheduler.md) 条目定期运行。脚本读取当前地址，去掉前缀长度（参见 [去除网络掩码](../developer-guides/scripting/scripting-examples.md#strip-netmask)），然后把地址传给 `/tool/dns-update`。

编写此类脚本时需要注意的事项：

- 每次更新都会改动服务器上的区域。请把地址与该名称当前的地址（`:resolve`）进行比较，只在二者不同时才发送更新。
- 启动时，请等待 [NTP](../system-information-and-utilities/ntp.md) 同步时钟，以便服务器接受该签名。
- 在 NAT 或运营商级 NAT 之后，WAN 接口上的地址并非公网地址。路由器的公网地址位于 [云](../network-management/cloud/index.md) 的 `public-address` 中。
- 密钥是命令的一部分，因此任何能读取该脚本的用户都能读取密钥。

## 故障排除 {#troubleshoot}

| 消息 | 含义 |
| :-- | :-- |
| `failure: update send failed` | 路由器无法与服务器的端口 53 建立 TCP 连接：服务器已停机、未监听 TCP，或防火墙将其阻断。 |
| `failure: reply not signed` | 服务器拒绝了签名，例如密钥名称或密钥有误。 |
| `failure: refused` | 服务器拒绝该更新，例如该密钥没有更新此区域的权限，或该更新在发送时未附带密钥。 |
| `failure: name not within zone` | 该名称不在该区域内。请检查 `zone` 和 `name`。 |
| `failure: bad name` | `name` 无效，例如因为它以点结尾。 |

## 技术细节 {#technical-details}

### 协议 {#protocol}

该更新发往 `dns-server` 的 TCP 端口 53。消息是针对该区域的 DNS UPDATE（区域段为 `example.com. IN SOA`）。其更新段会删除该名称的 A 记录（`office.example.com. ANY A`），并添加新记录（`office.example.com. 86400 IN A 198.51.100.20`）。

### 签名 {#signature}

同时指定 `key-name` 和 `key` 时，消息会携带一条 TSIG 记录，算法为 `hmac-md5.sig-alg.reg.int`，并将 fudge 设为 300 秒，即允许的时钟偏差。`key` 是该密钥的 base64 密钥值。不指定 `key-name` 和 `key` 时，更新将以未签名方式发送，大多数服务器会拒绝。

有关所有参数，请参阅 [`/tool/dns-update`](../cli-reference/tool/dns-update.md) CLI 参考。
