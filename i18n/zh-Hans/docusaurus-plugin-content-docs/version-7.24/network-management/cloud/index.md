---
sidebar_key: "network-management/cloud/index"
sidebar_position: 5
title: "云"
sidebar_label: "云"
description: "MikroTik Cloud 部分提供 Back To Home（远程回家）、DDNS、文件共享及其他云辅助服务的配置，并附有关于启用/禁用 DDNS、触发更新以及管理用于远程访问的 IP 地址的详细说明。"
tags:
  - 'ddns'
  - 'ntp'
  - 'backup'
source: https://manual.mikrotik.com/docs/7.24/network-management/cloud
captured_at: '2026-11-04T11:32:31+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本节介绍 MikroTik 云功能。使用这些功能可以配置 Back To Home、云通信、文件共享以及其他云辅助服务。

<DocCardList />

MikroTik 为连接到互联网的 RouterBOARD 设备提供多项服务。这些服务旨在减少配置、设置、控制、维护或监控设备时的不便。下方列出了 IP/Cloud 可提供的更详细可用服务列表。

## 服务 {#services}

:::danger
请注意，如果路由器有多个公网 IP 地址和/或多个互联网网关，用于与 MikroTik 云服务器通信的确切 IP 可能不符合预期！

**警告：** IP/Cloud 需要为 Cloud Hosted Router (CHR) 购买付费永久许可证。

**警告：** x86 系统不支持云服务。
:::

### DDNS {#ddns}

DDNS 或动态 DNS 是一项定期更新 A 记录的 IPv4 地址和 AAAA 记录的 IPv6 地址的服务。当你的 ISP 提供了会定期变化的动态 IP 地址，但你始终需要一个可用于远程连接设备的地址时，这样的服务非常有用。下面你可以找到与 IP/Cloud 的 DDNS 服务相关的操作详情：

- 检查传出 IP 地址变化：每 60 秒一次。
- 等待 MikroTik 云服务器的响应：15 秒。
- DDNS 记录 TTL：60 秒。
- 使用 UDP 端口 15252 向 **cloud2.mikrotik.com** 发送加密数据包。

从 RouterOS v6.43 开始，如果你的设备能够使用 IPv6 访问 **cloud2.mikrotik.com**，则会为你的公网 IPv6 地址创建 DNS **AAAA** 记录。如果你的设备只能使用 IPv4 访问 cloud2.mikrotik.com，则只会为你的公网 IPv4 地址创建 DNS **A** 记录。对于低于 6.44 的旧版 RouterOS，使用 cloud.mikrotik.com。

要启用 DDNS 服务：

```ros
[admin@MikroTik] /ip/cloud/set ddns-enabled=yes
[admin@MikroTik] /ip/cloud/print
         ddns-enabled: yes
 ddns-update-interval: none
          update-time: yes
       public-address: 159.148.147.196
  public-address-ipv6: 2a02:610:7501:1000::2
             dns-name: 529c0491d41c.sn.mynetname.net
               status: updated
```

:::warning
启用该服务后，DNS 名称将永久存储在 MikroTik 云服务器上，并且该 DNS 名称将解析为你的 RouterOS 实例最后发送给 MikroTik 云服务器的 IP。
:::

要禁用 DDNS 服务：

```ros
/ip/cloud/set ddns-enabled=auto
```

:::warning
在 7.17 之前，ddns-enabled 的默认值为 "no"。在包括 7.17 及更高版本中，如果要禁用 DDNS，请确保先禁用 [Back To Home](./back-to-home.md) 功能（如果已启用），然后设置 "ddns-enabled=auto"

**警告：** 一旦禁用该服务，你的设备就会向 MikroTik 云服务器发送命令以删除已存储的 DNS 名称。
:::

要手动触发 DNS 更新：

```ros
[admin@MikroTik] > /ip/cloud/force-update
```

:::warning
要实际使用云服务器提供的 DNS 名称连接到设备，用户必须配置路由器防火墙，允许从 WAN 端口进行此类访问。（默认 MikroTik 配置不允许从 WAN 端口访问 WebFig、WinBox 等服务）。
:::

### 更新时间 {#update-time}

设备上的正确时间很重要，时间不正确会导致系统日志出现问题、破坏到设备的 HTTPS 连接、破坏隧道连接以及其他问题。要更新系统时钟，你可以使用 [NTP](../../system-information-and-utilities/ntp.md) 或 [SNTP](../../system-information-and-utilities/ntp.md)，但这需要你为 NTP 服务器指定 IP 地址。在大多数情况下，仅仅为了在设备上设置正确时间，并不需要 NTP/SNTP；为简单起见，你可以使用 IP Cloud 的更新时间服务。下面你可以找到与 IP/Cloud 的更新时间服务相关的操作详情：

- 近似时间（精度为几秒，取决于 UDP 数据包延迟）。
- 在重启后以及每次 DDNS 更新期间更新时间（当路由器的 WAN IP 地址发生变化或使用 force-update 命令后）。
- 使用 UDP/15252 端口向 **cloud2.mikrotik.com** 发送加密数据包。
- 根据路由器的公网 IP 地址和我们的商业数据库检测时区。

要启用时间更新服务：

```ros
[admin@MikroTik] > /ip/cloud/set update-time=yes 
```

要启用自动时区检测：

```ros
[admin@MikroTik] > /system/clock/set time-zone-autodetect=yes 
```

:::warning
如果 `/ip/cloud/update-time` 设置为 `auto`，则设备时钟将使用 MikroTik 云服务器时间进行更新（如果没有启用 [NTP](../../system-information-and-utilities/ntp.md) 或 [SNTP](../../system-information-and-utilities/ntp.md) 客户端）。
:::

### 备份 {#backup}

可以将设备的 [备份](../../getting-started/configuration-management/backup.md) 存储在 MikroTik 云服务器上。备份服务允许你上传加密的备份文件、下载该文件，并在设备能够访问 MikroTik 云服务器时将该备份文件应用到设备。下面你可以找到与 IP/Cloud 的备份服务相关的操作详情：

- 每台设备 1 个免费备份槽位。
- 允许的备份大小：15MB。
- 使用 UDP/15252 和 TCP/15252 端口向 **cloud2.mikrotik.com** 发送加密数据包。

要创建新备份并将其上传到 MikroTik 云服务器：

```ros
[admin@MikroTik] > /system/backup/cloud/upload-file action=create-and-upload password=test123!!!
[admin@MikroTik] > /system/backup/cloud/print 
 0 name="cloud-20180921-162649" size=13.2KiB ros-version="6.44beta9" date=2018-09-21 16:26:49 status="ok" secret-download-key="AbCdEfGhIjKlM1234567890" 
```

:::warning
`create-and-upload` 动作命令将创建新的系统备份文件，使用提供的密码通过 AES 加密该备份文件并上传。对于 `upload` 动作命令，password 属性不起作用，因为 `upload` 动作命令仅上传已创建的系统备份文件。
:::

要下载已上传的备份文件并将其保存到设备内存：

```ros
[admin@MikroTik] > /system/backup/cloud/download-file action=download number=0
### OR
[admin@MikroTik] > /system/backup/cloud/download-file action=download secret-download-key=AbCdEfGhIjKlM1234567890
```

:::warning
**警告：** secret-download-key 是一个唯一标识符，可用于将你的加密备份下载到其他设备。由于你可以使用 secret-download-key 从任何位置和任何设备下载加密备份，因此应尽量对此标识符保密。下载的备份仍使用 AES 加密；但仍请确保使用强密码！
:::

要删除已上传的备份：

```ros
/system/backup/cloud/remove-file number=0
```

要使用新的备份文件替换现有文件，请使用以下命令：

```ros
/system/backup/cloud/upload-file action=create-and-upload replace=_your_previously_created_backup_file_ password=test123!!!
```

要上传现有的备份文件（之前创建的）：

```ros
[admin@MikroTik] > /system/backup/save encryption=aes-sha256 name=old_backup password=test123!!!
[admin@MikroTik] > /system/backup/cloud/upload-file action=upload src-file=old_backup.backup
[admin@MikroTik] > /system/backup/cloud/print 
 0 name="cloud-20180921-164044" size=13.2KiB ros-version="6.44beta9" date=2018-09-21 16:40:44 status="ok" secret-download-key="AbCdEfGhIjKlM1234567890"
```

:::warning
确保备份使用 AES 加密，否则 IP/Cloud 将拒绝备份上传。由于每台设备只有 1 个免费备份槽位，你需要先删除现有备份再上传新备份。
:::

### Back To Home {#back-to-home}

有关 Back to Home (BTH) 服务的更多信息，请参阅单独的[文档页面](./back-to-home.md)。

### 文件共享 {#file-share}

有关 File Share 服务的更多信息，请参阅单独的[文档页面](./file-share.md)。

### 中继服务 {#relay-service}

Back to Home 和 File Share 都部分依赖 MikroTik 云中继服务。通过中继服务的所有传输都是端到端加密的，中继纯粹是为了便于连接，并且设计为永远不需要解密用户数据或元数据。有关每个服务如何使用中继的详细信息，请参阅各自的手册。

## 属性 {#properties}

**子菜单：** `/ip/cloud`

| 属性 | 描述 |
| :-- | :-- |
| **ddns-enabled** (*yes \| auto*；默认值：**auto**) | 如果设置为 `yes`，设备将向 MikroTik 云服务器发送加密消息。服务器随后会解密该消息并验证发送方是否为真实的 MikroTik 设备。如果一切正常，MikroTik 云服务器将为该设备创建 DDNS 记录并向设备发送响应。路由器上的 IP/Cloud 服务每分钟都会检查 WAN IP 地址是否与发送给 MikroTik 云服务器的地址匹配，并在 IP 地址发生变化时向云服务器发送加密更新。如果设置为 auto，则仅当启用 [Back To Home](../../system-information-and-utilities/ntp.md) 时才会启用 ddns。**重要：** 在 7.17 版本之前，默认值为 "no"。     |
| **ddns-update-interval** (*time，最小 60 秒*；默认值：**none**) | 如果设置，DDNS 将按设定的间隔尝试连接 IP Cloud 服务器。如果设置为 **none**，它将继续在内部检查 IP 地址更新，并根据需要连接 IP Cloud 服务器。如果所使用的 IP 地址不在路由器本身上，因而无法作为路由器内部值进行检查，则该选项很有用。 |
| **update-time** (*yes \| no*；默认值：**yes**) | 如果设置为 `yes`，则路由器时钟将被设置为云服务器提供的时间，**前提是**未启用 [NTP](../../system-information-and-utilities/ntp.md) 或 [SNTP](../../system-information-and-utilities/ntp.md) 客户端。如果设置为 `no`，则 IP/Cloud 服务将永远不会更新设备时钟。如果 update-time 设置为 `yes`，即使 ddns-enabled 设置为 auto，时钟也会更新。 |
| **public-address** (*只读：address*) | 显示已发送到云服务器的设备 IPv4 地址。仅在至少一个 IP Cloud 请求成功完成后，此字段才可见。 |
| **public-address-ipv6** (*只读：address*) | 显示已发送到云服务器的设备 IPv6 地址。仅在至少一个 IP Cloud 请求成功完成后，此字段才可见。 |
| **warning** (*只读：string*) | 如果设备发送的 IP 地址与 MikroTik 云服务器所见的 UDP 数据包头中的 IP 地址不同，则显示警告消息。通常，当设备位于 NAT 后面时会发生这种情况。示例："DDNS 服务器收到来自 IP `123.123.123.123` 的请求，但你的本地 IP 是 `192.168.88.23`；DDNS 服务可能无法正常工作" |
| **dns-name** (*只读：name*) | 显示分配给设备的 DNS 名称。该名称由 12 个字符的序列号后接 *.sn.mynetname.net* 组成。仅在至少一个 ddns-request 成功完成后，此字段才可见。 |
| **status** (*只读：string*) | 包含描述当前 dns-service 状态的文本字符串。这些消息本身已说明含义：updating...updatedError: no Internet connectionError: request timed outError: REJECTED. Contact MikroTik supportError: internal error - should not happen. One possible cause is if the router runs out of memory |

### 高级 {#advanced}

**子菜单：** `/ip/cloud/advanced`

| 属性 | 描述 |
| :-- | :-- |
| **use-local-address** (*yes \| no*；默认值：**no**) | 默认情况下，DNS 名称将分配给检测到的公网地址（来自 UDP 数据包头）。如果你希望发送你的“本地”或“内部” IP 地址，请将其设置为 `yes`。 |

### 云备份 {#cloud-backup}

**子菜单：** `/system/backup/cloud`

下面你可以找到与特定命令相关的命令和属性；其他属性不会有任何效果：

- download-file

| 属性 | 描述 |
| :-- | :-- |
| **action** (*download*) | 从 MikroTik 云服务器下载已上传的备份文件。 |
| **number** (*integer*) | 指定 MikroTik 云服务器上的备份槽位。免费备份槽位始终位于 `0th` 槽位。 |
| **secret-download-key** (*string*) | 可用于下载已上传备份文件的唯一标识符。下载已上传的备份文件时，你不必使用上传该备份的同一设备。在新设备上部署备份时很有用。 |

- remove-file

| 属性 | 描述 |
| :-- | :-- |
| **number** (*integer*) | 删除指定备份槽位中的备份文件。免费备份槽位始终位于 `0th` 槽位。 |

- upload-file

| 属性 | 描述 |
| :-- | :-- |
| **action** (*create-and-upload*) | 将备份文件上传到 MikroTik 云服务器。<code>create-and-upload</code> - 使用指定密码创建新的备份文件并上传<code>upload</code> - 上传已创建的系统备份文件。 |
| **name** (*string*) | 指定将在已上传备份列表中显示的备份名称。这**不是**源备份的名称，此名称仅用于可视化展示。 |
| **src-file** (*file*) | 要上传的备份文件名，该备份文件是使用 `/system/backup` 创建的。此属性仅在 action 设置为 `upload` 时生效。 |
| **password** (*string*) | 使用指定密码创建、加密并上传备份文件。此属性仅在 action 设置为 `create-and-upload` 时生效。 |
