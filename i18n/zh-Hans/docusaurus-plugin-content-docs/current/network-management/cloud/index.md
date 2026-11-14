---
sidebar_key: "network-management/cloud"
title: "云"
sidebar_label: "云"
description: "RouterOS 中的 MikroTik 云服务：为路由器提供 DDNS 名称、启动时的时钟和时区、云备份、Back To Home（远程回家） VPN 和文件共享。哪些服务默认开启，以及路由器如何连接到 MikroTik 云服务器。"
tags:
  - 'cloud'
  - 'ddns'
  - 'ntp'
source: https://manual.mikrotik.com/docs/network-management/cloud
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

MikroTik 为 RouterOS 设备提供免费的云服务。这些服务为路由器提供 DNS 名称、设置其时钟和时区、存储备份，并让你能够访问家庭网络或共享路由器上的文件，即使路由器没有公网 IP 地址。路由器始终主动向 MikroTik 服务器发起连接，因此这些服务都不需要在其他设备上做端口转发。

## 服务 {#services}

| 服务 | 菜单 | 默认开启 | 用途 |
| :-- | :-- | :-- | :-- |
| DDNS | `/ip/cloud` | no | 获取一个跟随路由器公网 IP 地址的 DNS 名称。 |
| 时间更新 | `/ip/cloud`、`/system/clock` | yes | 在路由器启动时设置时钟和时区。 |
| [云备份](./cloud-backup.md) | `/system/backup/cloud` | no | 将加密备份存储到 MikroTik 服务器上。 |
| [Back To Home](./back-to-home.md) | `/ip/cloud` | no | 通过 WireGuard VPN 从手机或计算机访问你的家庭网络。 |
| [文件共享](./file-share.md) | `/ip/cloud/back-to-home-file` | no | 通过 HTTPS 链接共享路由器存储中的文件。 |

[与 MikroTik 云服务的通信](./communication-mikrotik-cloud-servers.md)列出了 RouterOS 与 MikroTik 服务器建立的所有连接，以及如何关闭每一个连接。

:::info
云服务可在 MikroTik 设备以及拥有付费永久许可证的 Cloud Hosted Router（CHR）上使用。x86 版本的 RouterOS 不提供这些服务。
:::

## DDNS {#ddns}

动态 DNS（DDNS）为路由器提供一个位于 `sn.mynetname.net` 下的 DNS 名称，该名称会跟随路由器的公网 IP 地址。当你的 ISP 更改地址时，可以用它通过名称访问路由器。

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

该名称对设备保持不变，路由器会自动保持其更新。要立即发送更新，例如在更改互联网连接之后：

```ros
/ip/cloud/force-update
```

该名称只是让路由器更容易被找到。它不会开放任何访问权限：默认防火墙会丢弃来自互联网的、发往路由器的连接。要远程访问路由器，请使用 [Back To Home](./back-to-home.md)，或[在防火墙中放行这些服务](../../getting-started/securing-your-router.md#opening-management-access-from-wan-advanced)。你还可以为该名称获取 [Let's Encrypt 证书](../../authentication-authorization-accounting/certificates.md#lets-encrypt-certificate)。

要让该名称解析为路由器自身的地址而不是公网地址，例如在内部网络中通过名称访问路由器：

```ros
/ip/cloud/advanced/set use-local-address=yes
```

要关闭 DDNS：

```ros
/ip/cloud/set ddns-enabled=auto
```

随后路由器会请求云服务器删除该名称。使用 `auto` 时，只要 Back To Home 处于启用状态，DDNS 就会保持开启，因此如果你使用了 Back To Home，请先将其关闭。

## 时间更新 {#time-update}

路由器启动时会从云服务器设置其时钟和时区，除非已启用 [NTP 客户端](../../system-information-and-utilities/ntp.md)。此功能不需要 DDNS。云端时间是近似值：要获得准确的时钟，请使用 NTP 客户端。

要阻止路由器向云端请求时间和时区：

```ros
/ip/cloud/set update-time=no
/system/clock/set time-zone-autodetect=no
```

## 技术细节 {#technical-details}

### 路由器如何连接到云端 {#how-the-router-reaches-the-cloud}

路由器向 `cloud2.mikrotik.com` 的 UDP 端口 15252 发送加密请求。云服务器会用它收到请求的地址进行回复，路由器将其显示在 `public-address` 中；当路由器还通过 IPv6 连接到该服务器时，也会显示在 `public-address-ipv6` 中。在 NAT 之后，这是 NAT 设备的公网地址，而不是路由器上的地址。在具有多条互联网连接的路由器上，它是通往 `cloud2.mikrotik.com` 的路由所使用的那条连接的地址。

当无法从互联网直接访问路由器时，Back To Home 和 File Share 会通过 MikroTik 中继服务器进行连接。路由器会与最近的中继保持一条打开的连接，客户端通过该连接访问路由器。流量始终保持端到端加密：密钥只存在于路由器和客户端上，因此中继无法读取数据。

### DDNS 更新 {#ddns-updates}

- 该名称由设备序列号的小写形式加上 `.sn.mynetname.net` 构成。它解析为 `public-address`，生存时间（TTL）为 60 秒；当路由器还有 `public-address-ipv6` 时，也会解析为该地址。
- 在 NAT 之后，路由器无法在自己的接口上看到其公网地址，此时路由器每分钟发送一次更新。
- 在 DDNS 关闭时（没有 Back To Home 的 `ddns-enabled=auto`），`force-update` 不会执行任何操作。
- 当 DDNS 关闭时，路由器会向云服务器发送删除请求，该名称会在几分钟内停止解析。
- 使用 `use-local-address=yes` 时，该名称解析为路由器发送请求时所使用的地址，而 `public-address` 仍显示公网地址。
- 当云服务器没有响应时，`status` 显示 `updating...`，路由器会以逐渐增大的间隔重试。`failed to connect` 表示某个请求没有得到回复。

### 启动时的时间更新 {#time-update-at-startup}

- 路由器在启动后会向云服务器请求一次时间，即使使用 `ddns-enabled=auto` 也是如此。DDNS 更新和 `force-update` 不会再次设置时钟。
- 当 NTP 客户端启用时，路由器不使用云端时间，即使 NTP 客户端无法连接到任何服务器。
- 路由器会记录每次时钟变更，例如：

  ```text
  system,critical,info cloud change time Sep/24/2026 03:01:57 => Sep/24/2026 06:25:50
  ```

- 对于 `time-zone-autodetect`，云服务器会查询路由器公网 IP 地址所在的位置，路由器会应用该时区，包括夏令时。

有关所有属性，请参阅 CLI 参考中的 [`/ip/cloud`](../../cli-reference/ip/cloud/index.md) 和 [`/ip/cloud/advanced`](../../cli-reference/ip/cloud/advanced.md)。
