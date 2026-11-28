---
title: "云"
description: "MikroTik Cloud 部分提供 Back To Home（远程回家）、DDNS、文件共享和其他云辅助服务的配置，并包含启用/禁用 DDNS、触发更新以及管理用于远程访问的 IP 地址的详细说明。"
tags:
  - 'ddns'
  - 'ntp'
  - 'backup'
source: https://manual.mikrotik.com/docs/7.24/network-management/cloud
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

本节介绍 MikroTik Cloud 功能。可使用该功能配置 Back To Home、Cloud 通信、文件共享和其他云辅助服务。

<DocCardList />

MikroTik 为连接到 Internet 的 RouterBOARD 设备提供多项服务。这些服务用于减少配置、设置、控制、维护或监控设备时的不便。IP/Cloud 可提供的可用服务详情如下。

## Services

:::danger
请注意，如果路由器有多个公网 IP 地址和/或多个 Internet 网关，则用于与 MikroTik Cloud 服务器通信的确切 IP 可能与预期不同！

**Warning:** IP/Cloud 需要 Cloud Hosted Router（CHR）的付费永久许可证。

**Warning:** x86 系统不支持 Cloud 服务。
:::

### DDNS

DDNS 或 Dynamic DNS 是一项服务，用于定期更新 A 记录的 IPv4 地址和 AAAA 记录的 IPv6 地址。当 ISP 提供会定期变化的动态 IP 地址，但始终需要一个可用于远程连接设备的地址时，该服务非常有用。以下为与 IP/Cloud 的 DDNS 服务相关的运行细节：

- 检查传出 IP 地址变化：每 60 秒一次。
- 等待 MikroTik Cloud 服务器响应：15 秒。
- DDNS 记录 TTL：60 秒。
- 使用 UDP 端口 15252 向 **cloud2.mikrotik.com** 发送加密数据包。

自 RouterOS v6.43 起，如果设备能够通过 IPv6 访问 **cloud2.mikrotik.com**，则会为公网 IPv6 地址创建 DNS **AAAA** 记录。如果设备只能通过 IPv4 访问 cloud2.mikrotik.com，则只会为公网 IPv4 地址创建 DNS **A** 记录。6.44 之前的旧 RouterOS 版本使用 cloud.mikrotik.com

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
启用该服务后，DNS 名称将永久存储在 MikroTik Cloud 服务器上，并且该 DNS 名称将解析为 RouterOS 实例发送到 MikroTik Cloud 服务器的最后一个 IP。
:::

要禁用 DDNS 服务：

```ros
/ip/cloud/set ddns-enabled=auto
```

:::warning
在 7.17 之前，ddns-enabled 的默认值为“no”。在 7.17 及更高版本中，如果要禁用 DDNS，请先禁用 [Back To Home](/docs/network-management/cloud/back-to-home) 功能（如果已启用），然后设置“ddns-enabled=auto”。

**警告：** 禁用该服务后，设备会立即向 MikroTik 的 Cloud 服务器发送命令，以移除已存储的 DNS 名称。
:::

要手动触发 DNS 更新：

```ros
[admin@MikroTik] > /ip/cloud/force-update
```

:::warning
要使用云服务器提供的 DNS 名称实际连接到设备，用户必须配置路由器防火墙，以允许来自 WAN 端口的此类访问。（默认 MikroTik 配置不允许从 WAN 端口访问 WebFig、WinBox 等服务）。
:::

### 更新时间 {#update-time}

设备上的正确时间很重要，时间错误会导致系统日志问题、中断与设备的 HTTPS 连接、中断隧道连接以及其他问题。要更新系统时钟，可以使用 [NTP](/docs/system-information-and-utilities/ntp) 或 [SNTP](/docs/system-information-and-utilities/ntp)，但这需要指定 NTP Server 的 IP 地址。在大多数情况下，仅需在设备上设置正确时间时不需要 NTP/SNTP。为简化操作，可以使用 IP Cloud 的更新时间服务。以下是与 IP/Cloud 更新时间服务相关的操作详情：

- 近似时间（精度为数秒，取决于 UDP 数据包延迟）。
- 在重启后以及每次 DDNS 更新时更新时间（当路由器的 WAN IP 地址发生变化或使用 force-update 命令后）。
- 使用 UDP/15252 端口向 **cloud2.mikrotik.com** 发送加密数据包。
- 根据路由器的公网 IP 地址和我们的商业数据库检测时区。

要启用时间更新服务：

```ros
[admin@MikroTik] > /ip/cloud/set update-time=yes 
```

要启用自动检测时区：

```ros
[admin@MikroTik] > /system/clock/set time-zone-autodetect=yes 
```

:::warning
如果 `/ip/cloud/update-time` 设置为 `auto`，则设备时钟将使用 MikroTik 的 Cloud 服务器时间进行更新（如果未启用 [NTP](/docs/system-information-and-utilities/ntp) 或 [SNTP](/docs/system-information-and-utilities/ntp) 客户端）。
:::

### 备份 {#backup}

可以将设备的[备份](/docs/getting-started/configuration-management/backup)存储在 MikroTik 的 Cloud 服务器上。备份服务允许你上传加密的备份文件、下载该文件，并在设备能够访问 MikroTik 的 Cloud 服务器时将该备份文件应用到设备。以下是与 IP/Cloud 备份服务相关的操作详情：

- 每台设备有 1 个免费备份槽位。
- 允许的备份大小：15MB。
- 使用 UDP/15252 和 TCP/15252 端口向 **cloud2.mikrotik.com** 发送加密数据包。

要创建新备份并将其上传到 MikroTik 的 Cloud 服务器：

```ros
[admin@MikroTik] > /system/backup/cloud/upload-file action=create-and-upload password=test123!!!
[admin@MikroTik] > /system/backup/cloud/print 
 0 name="cloud-20180921-162649" size=13.2KiB ros-version="6.44beta9" date=2018-09-21 16:26:49 status="ok" secret-download-key="AbCdEfGhIjKlM1234567890" 
```

:::warning
`create-and-upload` action 命令将创建新的系统备份文件，使用提供的密码通过 AES 加密备份文件并上传。对于 `upload` action 命令，password 属性不起作用，因为 `upload` action 命令仅上传已创建的系统备份文件。
:::

要下载已上传的备份文件并将其保存到设备内存中：

```ros
[admin@MikroTik] > /system/backup/cloud/download-file action=download number=0
### OR
[admin@MikroTik] > /system/backup/cloud/download-file action=download secret-download-key=AbCdEfGhIjKlM1234567890
```

:::warning
**警告：** secret-download-key 是唯一标识符，可用于将加密备份下载到其他设备。由于可以使用 secret-download-key 从任意位置和任意设备下载加密备份，因此应将该标识符保密。下载的备份仍使用 AES 加密；不过，请确保使用强密码！
:::

要删除已上传的备份：

```ros
/system/backup/cloud/remove-file number=0
```

要用新的备份文件替换现有文件，请使用以下命令：

```ros
/system/backup/cloud/upload-file action=create-and-upload replace=_your_previously_created_backup_file_ password=test123!!!
```

要上传现有备份文件（此前创建的）：

```ros
[admin@MikroTik] > /system/backup/save encryption=aes-sha256 name=old_backup password=test123!!!
[admin@MikroTik] > /system/backup/cloud/upload-file action=upload src-file=old_backup.backup
[admin@MikroTik] > /system/backup/cloud/print 
 0 name="cloud-20180921-164044" size=13.2KiB ros-version="6.44beta9" date=2018-09-21 16:40:44 status="ok" secret-download-key="AbCdEfGhIjKlM1234567890"
```

:::warning
请确保备份使用 AES 加密，否则 IP/Cloud 将拒绝上传备份。由于每台设备只有 1 个免费备份槽位，上传新备份前需要删除现有备份。
:::

### Back To Home

有关 Back To Home（BTH）服务的更多信息，请参阅单独的[文档页面](/docs/network-management/cloud/back-to-home)。

### 文件共享 {#file-share}

有关 File Share 服务的更多信息，请参阅单独的[文档页面](/docs/network-management/cloud/file-share)。

### Relay 服务 {#relay-service}

Back To Home 和 File Share 都部分依赖 MikroTik cloud relay 服务。通过该 relay 服务进行的所有传输均为端到端加密，relay 仅用于协助建立连接，设计上无需解密用户数据或元数据。有关每项服务如何使用 relay 的详情，请参阅相应手册。

## 属性 {#properties}

**子菜单：** `/ip/cloud`

| 属性 | 说明 |
| :-- | :-- |
| **ddns-enabled** (*yes \| auto*；默认值：**auto**) | 如果设置为 <code>yes</code>，设备将向 MikroTik 的 Cloud 服务器发送加密消息。服务器随后解密该消息，并验证发送方是否为真实的 MikroTik 设备。如果一切正常，MikroTik 的 Cloud 服务器将为该设备创建 DDNS 记录，并向设备发送响应。路由器上的 IP/Cloud 服务每分钟检查 WAN IP 地址是否与发送到 MikroTik Cloud 服务器的地址一致；如果 IP 地址发生变化，则向 Cloud 服务器发送加密更新。<br/> 如果设置为 auto，则仅在启用 <a href="/docs/network-management/cloud/back-to-home">Back To Home</a> 时启用 ddns。<br/><br/><strong>重要：</strong>在 7.17 之前的版本中，默认值为“no”。<br/><br/> |
| **ddns-update-interval** (*time，最小 60 秒*；默认值：**none**) | 如果设置该值，DDNS 将按设定间隔尝试连接 IP Cloud 服务器。如果设置为 **none**，它将继续在内部检查 IP 地址更新，并根据需要连接 IP Cloud 服务器。当使用的 IP 地址不在路由器本身上，因而无法作为路由器内部值进行检查时，该设置很有用。 |
| **update-time** (*yes \| no*；默认值：**yes**) | 如果设置为 `yes`，并且没有启用 [NTP](/docs/system-information-and-utilities/ntp) 或 [SNTP](/docs/system-information-and-utilities/ntp) 客户端，则路由器时钟将设置为 Cloud 服务器提供的时间。如果设置为 `no`，则 IP/Cloud 服务永远不会更新设备时钟。如果 update-time 设置为 `yes`，即使 ddns-enabled 设置为 auto，也会更新时钟。 |
| **public-address** (*只读：address*) | 显示发送到 Cloud 服务器的设备 IPv4 地址。只有在至少成功完成一次 IP Cloud 请求后，该字段才可见。 |
| **public-address-ipv6** (*只读：address*) | 显示发送到 Cloud 服务器的设备 IPv6 地址。只有在至少成功完成一次 IP Cloud 请求后，该字段才可见。 |
| **warning** (*只读：string*) | 如果设备发送的 IP 地址与 MikroTik Cloud 服务器在 UDP 数据包头中可见的 IP 地址不同，则显示警告消息。这通常发生在设备位于 NAT 之后时。示例：“DDNS server received a request from IP `123.123.123.123` but your local IP was `192.168.88.23`; DDNS service might not work” |
| **dns-name** (*只读：name*) | 显示分配给设备的 DNS 名称。该名称由 12 个字符的序列号和附加的 *.sn.mynetname.net* 组成。只有在至少成功完成一次 ddns-request 后，该字段才可见。 |
| **status** (*只读：string*) | 包含描述当前 dns-service 状态的文本字符串。这些消息含义明确：<ul><li><strong>updating...</strong></li><li><strong>updated</strong></li><li><strong>Error: no Internet connection</strong></li><li><strong>Error: request timed out</strong></li><li><strong>Error: REJECTED. Contact MikroTik support</strong></li><li><strong>Error: internal error</strong> - 不应发生。一个可能的原因是路由器内存不足</li></ul> |

### Advanced

**子菜单：** `/ip/cloud/advanced`

| 属性 | 说明 |
| :-- | :-- |
| **use-local-address** (*yes \| no*；默认值：**no**) | 默认情况下，DNS 名称将分配给检测到的公共地址（来自 UDP 数据包头）。如果希望发送“本地”或“内部”IP 地址，请将此项设置为 `yes`。 |

### 云端备份 {#cloud-backup}

**子菜单：** `/system/backup/cloud`

下面列出了与特定命令相关的命令和属性，其他属性不会生效：

- 下载文件

| 属性 | 说明 |
| :-- | :-- |
| **action** (*download*) | 从 MikroTik 的 Cloud 服务器下载已上传的备份文件。 |
| **number** (*integer*) | 指定 MikroTik 的 Cloud 服务器上的备份槽位。空闲备份槽位始终位于 `0th` 槽位。 |
| **secret-download-key** (*string*) | 可用于下载已上传备份文件的唯一标识符。下载已上传的备份文件时，不必使用上传备份的同一台设备。适用于在新设备上部署备份。 |

- 删除文件

| 属性 | 说明 |
| :-- | :-- |
| **number** (*integer*) | 删除指定备份槽位中的备份文件。空闲备份槽位始终位于 `0th` 槽位。 |

- 上传文件

| 属性 | 说明 |
| :-- | :-- |
| **action** (*create-and-upload*) | 将备份文件上传到 MikroTik 的 Cloud 服务器。<ul><li><code>create-and-upload</code> - 使用指定密码创建新的备份文件并上传</li><li><code>upload</code> - 上传已创建的系统备份文件。</li></ul> |
| **name** (*string*) | 指定备份名称，该名称将显示在已上传备份列表中。这不是源备份的名称，该名称仅用于可视化展示。 |
| **src-file** (*file*) | 要上传的备份文件名，该文件使用 `/system/backup` 创建。仅当 action 设置为 `upload` 时，该属性才生效。 |
| **password** (*string*) | 使用指定密码创建、加密并上传备份文件。仅当 action 设置为 `create-and-upload` 时，该属性才生效。 |
