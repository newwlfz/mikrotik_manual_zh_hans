---
title: "Cloud"
description: "RouterOS 中的 MikroTik 云服务：路由器的 DDNS 名称、启动时的时钟和时区、云备份、Back To Home（远程回家） VPN 和 File Share。哪些服务默认启用，以及路由器如何访问 MikroTik 云服务器。"
tags:
  - 'cloud'
  - 'ddns'
  - 'ntp'
source: https://manual.mikrotik.com/docs/7.25/network-management/cloud
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

MikroTik 为 RouterOS 设备提供免费的云服务。这些服务为路由器分配 DNS 名称、设置时钟和时区、存储备份，并允许你访问家庭网络或从路由器共享文件，即使路由器没有公网 IP 地址也是如此。路由器始终主动连接到 MikroTik 服务器，因此所有服务都不需要在其他设备上进行端口转发。

## Services

| 服务 | 菜单 | 默认启用 | 用途 |
| :-- | :-- | :-- | :-- |
| DDNS | `/ip/cloud` | 否 | 获取跟随路由器公网 IP 地址的 DNS 名称。 |
| 时间更新 | `/ip/cloud`、`/system/clock` | 是 | 在路由器启动时设置时钟和时区。 |
| [云备份](/docs/network-management/cloud/cloud-backup) | `/system/backup/cloud` | 否 | 将加密备份存储在 MikroTik 服务器上。 |
| [Back To Home](/docs/network-management/cloud/back-to-home) | `/ip/cloud` | 否 | 通过 WireGuard VPN 从手机或计算机访问家庭网络。 |
| [文件共享](/docs/network-management/cloud/file-share) | `/ip/cloud/back-to-home-file` | 否 | 通过 HTTPS 链接共享路由器存储中的文件。 |

[与 MikroTik Cloud Services 的通信](/docs/network-management/cloud/communication-mikrotik-cloud-servers)列出了 RouterOS 与 MikroTik 服务器建立的所有连接，以及如何分别关闭这些连接。

:::info
云服务适用于 MikroTik 设备，以及具有付费永久许可证的 Cloud Hosted Router（CHR）。RouterOS for x86 不提供这些服务。
:::

## DDNS

动态 DNS（DDNS）为路由器提供 `sn.mynetname.net` 下的 DNS 名称，该名称会跟随其公网 IP 地址。当 ISP 更改地址时，可使用该名称访问路由器。

要启用 DDNS 并查看名称：

```ros
[admin@MikroTik] > /ip/cloud/set ddns-enabled=yes
[admin@MikroTik] > /ip/cloud/print
          ddns-enabled: yes
  ddns-update-interval: none
           update-time: yes
        public-address: 203.0.113.10
              dns-name: hf1234abcd5.sn.mynetname.net
                status: updated
      back-to-home-vpn: revoked-and-disabled
```

该名称对设备保持不变，路由器会自动更新。要立即发送更新，例如在更改互联网连接后：

```ros
/ip/cloud/force-update
```

该名称仅使路由器更容易被找到，不会开放任何访问权限：默认防火墙会丢弃来自互联网到路由器的连接。要远程访问路由器，请使用 [Back To Home](/docs/network-management/cloud/back-to-home)，或[在防火墙中允许相关服务](/docs/getting-started/securing-your-router#opening-management-access-from-wan-advanced)。你还可以为该名称获取 [Let's Encrypt 证书](/docs/authentication-authorization-accounting/certificates#lets-encrypt-certificate)。

要使名称解析到路由器自身地址而不是公网地址，例如在网络内通过名称访问路由器：

```ros
/ip/cloud/advanced/set use-local-address=yes
```

要关闭 DDNS：

```ros
/ip/cloud/set ddns-enabled=auto
```

路由器随后会请求云服务器删除该名称。使用 `auto` 时，只要 Back To Home 启用，DDNS 就会保持开启，因此如果使用 Back To Home，请先将其关闭。

## 时间更新 {#time-update}

路由器启动时会从云服务器设置时钟和时区，除非启用了 [NTP client](/docs/system-information-and-utilities/ntp)。此操作不依赖 DDNS。云端时间仅为近似值：如需准确时钟，请使用 NTP client。

要阻止路由器向云端请求时间和时区：

```ros
/ip/cloud/set update-time=no
/system/clock/set time-zone-autodetect=no
```

## 技术细节 {#technical-details}

### 路由器如何访问云端 {#how-the-router-reaches-the-cloud}

路由器通过 UDP 端口 15252 向 `cloud2.mikrotik.com` 发送加密请求。云端服务器会回复其收到请求的地址，路由器将其显示在 `public-address` 中；当路由器也通过 IPv6 访问服务器时，会显示在 `public-address-ipv6` 中。在 NAT 后，该地址是 NAT 设备的公网地址，而不是路由器上的地址。在具有多个互联网连接的路由器上，该地址是到 `cloud2.mikrotik.com` 的路由所使用的连接地址。

当无法从互联网直接访问路由器时，Back To Home 和 File Share 会通过 MikroTik 中继服务器建立连接。路由器保持与最近中继的连接，客户端通过该中继访问路由器。流量保持端到端加密：密钥仅保存在路由器和客户端上，因此中继无法读取数据。

### DDNS 更新 {#ddns-updates}

- 名称是设备序列号的小写形式，后跟 `.sn.mynetname.net`。它解析到 `public-address`，生存时间（TTL）为 60 秒；当路由器还具有 `public-address-ipv6` 时，也会解析到该地址。
- 在 NAT 后，路由器无法在自己的接口上看到其公网地址，此时路由器每分钟发送一次更新。
- 当 DDNS 关闭时（`ddns-enabled=auto` 且未启用 Back To Home），`force-update` 不起作用。
- 当 DDNS 关闭时，路由器会向云端服务器发送删除请求，名称会在几分钟内停止解析。
- 使用 `use-local-address=yes` 时，名称解析到路由器发送请求所使用的地址，`public-address` 仍显示公网地址。
- 当云端服务器未响应时，`status` 显示 `updating...`，路由器会以逐渐增加的间隔重试。`failed to connect` 表示请求未收到回复。

### 启动时更新时间 {#time-update-at-startup}

- 路由器启动后会向云端服务器请求一次时间，即使使用 `ddns-enabled=auto` 也是如此。DDNS 更新和 `force-update` 不会再次设置时钟。
- 当 NTP 客户端启用时，路由器不使用云端时间，即使 NTP 客户端无法访问任何服务器也是如此。
- 路由器会记录每次时钟更改，例如：

  ```text
  system,critical,info cloud change time Sep/24/2026 03:01:57 => Sep/24/2026 06:25:50
  ```

- 对于 `time-zone-autodetect`，云端服务器会查询路由器公网 IP 地址所在的位置，路由器会应用该时区，包括夏令时。

所有属性，请参阅 CLI 参考中的 [`/ip/cloud`](/docs/cli-reference/ip/cloud) 和 [`/ip/cloud/advanced`](/docs/cli-reference/ip/cloud/advanced)。
