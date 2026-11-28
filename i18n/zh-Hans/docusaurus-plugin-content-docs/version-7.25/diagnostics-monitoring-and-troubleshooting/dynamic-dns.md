---
title: "DNS 更新"
description: "DNS 更新工具会向某个区域的权威 DNS 服务器发送经 TSIG hmac-md5 密钥签名的 RFC 2136 动态更新，以将名称指向 IPv4 地址。"
tags:
  - 'dns-updates'
  - 'dynamic-ip'
  - 'hmac-md5'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/dynamic-dns
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

`/tool/dns-update` 命令向某个区域的权威 DNS 服务器发送一条动态更新（RFC 2136），并将该区域中的名称指向一个 IPv4 地址。该更新使用 TSIG 密钥（RFC 8945）签名，因此服务器可以检查更新是否来自你，如同安全动态更新（RFC 3007）一样。将其用于你自己运行的区域，例如 BIND 服务器上的区域。

在两种常见情况下不需要此命令：

- 对于跟随路由器自身公网地址的名称，且无需运行 DNS 服务器，请使用 [IP Cloud](/docs/network-management/cloud#ddns) 的 DDNS 服务。
- 通过 HTTP 接收更新的动态 DNS 服务（例如 DynDNS）应改用 [Fetch](/docs/system-information-and-utilities/fetch) 更新。

## 前提条件 {#prerequisites}

- 对该区域具有权威并接受通过 TCP 端口 53 进行动态更新的 DNS 服务器。
- 服务器接受该区域更新使用的 TSIG 密钥，算法为 hmac-md5。RouterOS 仅使用 hmac-md5 签名；该命令没有算法设置。
- 密钥名称及其 base64 格式的 secret，与服务器上的配置一致。例如在 BIND 上，使用 `tsig-keygen -a hmac-md5 dns-update-key` 创建密钥，因为 BIND 默认使用其他算法创建密钥，并仅允许该密钥更新其所需的名称（`update-policy`）。
- 路由器时钟与服务器时钟相差小于 5 分钟。签名允许 300 秒的差异，因此请通过 [NTP](/docs/system-information-and-utilities/ntp) 保持时钟同步。
- 服务器侧的防火墙接受来自路由器的 TCP 端口 53。

## 将名称指向地址 {#point-a-name-at-an-address}

在 DNS 服务器 192.0.2.53 上，使用密钥 `dns-update-key` 将 `office.example.com` 指向 198.51.100.20。请将密钥替换为你的密钥的 base64 secret，并保留引号，因为 base64 值可能以 `=` 结尾：

```ros
/tool/dns-update dns-server=192.0.2.53 zone=example.com \
    name=office address=198.51.100.20 ttl=300 \
    key-name=dns-update-key key="c2VjcmV0LWtleS1mb3ItZXhhbXBsZQ=="
```

`ttl=300` 使记录在其他 DNS 服务器的缓存中保留 5 分钟，以便它们尽快获取更改后的地址。不使用 `ttl` 时，记录的有效期为一天。

当服务器接受更新时，命令不会输出任何内容。否则，命令会停止并显示 `failure:` 消息；Troubleshoot 部分列出了各消息的含义。

参数的工作方式如下：

- `name` 相对于 `zone`：`name=office` 和 `zone=example.com` 会更新 `office.example.com`。完整名称会重复：`name=office.example.com` 会更新 `office.example.com.example.com`。带尾随点的名称会被拒绝，并显示 `failure: bad name`。
- 更新会先删除该名称的所有 A 记录，然后添加新记录，因此会替换地址，而不是添加第二个地址。
- `ttl` 设置记录的生存时间，单位为秒。不使用 `ttl` 时，记录的有效期为 86400 秒（一天），对于会变化的地址来说过长。
- `address` 接受一个 IPv4 地址。两个地址会失败，并显示 `failure: only one address allowed`，IPv6 地址会被拒绝。该命令仅更新 A 记录。

## 保持名称最新 {#keep-the-name-current}

该命令每次运行时发送一次更新。要使名称始终指向会变化的地址，请在地址变化时通过脚本运行该命令，例如从 WAN 接口上的 [DHCP client](/docs/network-management/dhcp/client) 的租约脚本运行，或定期从 [scheduler](/docs/system-information-and-utilities/scheduler) 条目运行。脚本读取当前地址，移除前缀长度（请参阅 [Strip netmask](/docs/developer-guides/scripting/scripting-examples#strip-netmask)），并将地址传递给 `/tool/dns-update`。

此类脚本需要注意以下事项：

- 每次更新都会更改服务器上的区域。请将地址与该名称当前的地址（`:resolve`）进行比较，仅在地址不同时发送更新。
- 启动时，等待 [NTP](/docs/system-information-and-utilities/ntp) 同步时钟，以便服务器接受签名。
- 在 NAT 或运营商级 NAT 之后，WAN 接口上的地址不是公网地址。路由器的公网地址位于 [IP Cloud](/docs/network-management/cloud) 的 `public-address` 中。
- 密钥是命令的一部分，因此每个可以读取脚本的用户都能读取该密钥。

## 故障排除 {#troubleshoot}

| 消息 | 含义 |
| :-- | :-- |
| `failure: update send failed` | 路由器无法与服务器的端口 53 建立 TCP 连接：服务器已关闭、未监听 TCP，或防火墙阻止了该连接。 |
| `failure: reply not signed` | 服务器拒绝了签名，例如密钥名称或密钥错误。 |
| `failure: refused` | 服务器拒绝更新，例如密钥无权更新该区域，或更新是在没有密钥的情况下发送的。 |
| `failure: name not within zone` | 该名称不在区域内。请检查 `zone` 和 `name`。 |
| `failure: bad name` | `name` 无效，例如它以点结尾。 |

## 技术细节 {#technical-details}

### Protocol

更新发送到 `dns-server` 的 TCP 端口 53。该消息是针对区域的 DNS UPDATE（区域部分为 `example.com. IN SOA`）。其更新部分删除该名称的 A 记录（`office.example.com. ANY A`），并添加新记录（`office.example.com. 86400 IN A 198.51.100.20`）。

### Signature

使用 `key-name` 和 `key` 时，消息携带一条 TSIG 记录，算法为 `hmac-md5.sig-alg.reg.int`，fudge 为 300 秒，即允许的时钟差异。`key` 是密钥的 base64 机密。不使用 `key-name` 和 `key` 时，更新以未签名方式发送，大多数服务器会拒绝它。

有关所有参数，请参阅 [`/tool/dns-update`](/docs/cli-reference/tool/dns-update) CLI 参考。
