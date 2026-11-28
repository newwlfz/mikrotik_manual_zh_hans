---
title: "DHCP 服务器"
description: "RouterOS DHCP 服务器从 IP 池向客户端分配 IPv4 地址和网络设置，并支持静态租约、网络、DHCP 选项和选项集、选项匹配器、RADIUS、速率限制以及非法 DHCP 服务器告警。"
tags:
  - 'dhcp'
source: https://manual.mikrotik.com/docs/7.25/network-management/dhcp/server
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**子菜单：** `/ip/dhcp-server`

DHCP 服务器为路由器所服务网络中的客户端分配 IPv4 地址和网络设置。它从 IP 地址池中租用地址，并发送匹配 DHCP 网络的设置：网关、DNS 服务器、域名、NTP 和 WINS 服务器以及其他选项。它还可以分发绑定到特定客户端的静态租约，并从 RADIUS 服务器获取租约。有关 DHCP 交换、租约和续租的工作方式，请参阅 [DHCP 概念](/docs/network-management/dhcp)。

DHCP 服务器需要：

- 服务器接口上的 IP 地址。没有 IP 地址时，服务器会显示为无效。
- 包含要分发地址的 IP 地址池（`/ip/pool`）。不要在地址池中包含路由器自身的地址。
- DHCP 网络（`/ip/dhcp-server/network`），其中包含发送给该子网客户端的设置。
- DHCP 服务器本身（`/ip/dhcp-server`），用于将接口与地址池绑定。

`setup` 命令可一步创建地址池、网络和服务器。以下配置示例展示了两种方式。

每个接口可以有一个面向直连客户端的 DHCP 服务器。对于通过 DHCP 中继传入的请求，同一接口上可以有多个服务器，每个中继地址对应一个服务器（请参阅 `relay` 属性）。

:::warning
DHCP 服务器需要真实接口来接收原始以太网数据包。当它运行在网桥上时，该网桥至少需要有一个端口接收这些数据包；服务器在空网桥上无法正常工作。
:::

## 配置示例 {#configuration-examples}

### 设置 {#setup}

`setup` 命令可一步创建 IP 池、网络和 DHCP 服务器。它会依次询问每个值，并根据接口地址建议取值。

首先，为接口添加 IP 地址：

```ros
/ip/address/add address=192.168.88.1/24 interface=ether3
```

然后运行 `setup`，确认或修改每个建议值：

```ros
[admin@MikroTik] > /ip/dhcp-server/setup
Select interface to run DHCP server on
dhcp server interface: ether3
Select network for DHCP addresses
dhcp address space: 192.168.88.0/24
Select gateway for given network
gateway for dhcp network: 192.168.88.1
Select pool of ip addresses given out by DHCP server
addresses to give out: 192.168.88.2-192.168.88.254
Select whether the DHCP server sends DNS servers to clients
send dns: yes
Select DNS servers (leave empty to use servers from DNS settings)
dns servers: 192.168.88.1
Select lease time
lease time: 1800s
```

DHCP 服务器现已在 ether3 上激活。

### 手动配置 {#manual-configuration}

要手动配置相同的 DHCP 服务器，请自行创建每个部分：

1. 在服务器运行的接口上添加路由器 IP 地址。在本示例中，路由器也是网络的网关：

   ```ros
   /ip/address/add address=192.168.88.1/24 interface=bridge1
   ```

2. 创建用于分配的 IP 地址池。不要在地址池中包含路由器自身的地址：

   ```ros
   /ip/pool/add name=dhcp_pool0 ranges=192.168.88.2-192.168.88.254
   ```

3. 添加 network 条目，并配置发送给客户端的设置，例如网关和 DNS 服务器：

   ```ros
   /ip/dhcp-server/network/add address=192.168.88.0/24 dns-server=192.168.88.1 gateway=192.168.88.1
   ```

4. 在接口上添加 DHCP 服务器，并指定地址池：

   ```ros
   /ip/dhcp-server/add address-pool=dhcp_pool0 interface=bridge1 name=dhcp1
   ```

## 属性 {#properties}

DHCP 服务器的所有属性均在 [`/ip/dhcp-server`](/docs/cli-reference/ip/dhcp-server) CLI 参考中说明。以下行为需要进一步解释。

### 未知地址的请求 {#requests-for-unknown-addresses}

从其他网络移动过来的客户端，或服务器已不再具有其租约的客户端，可能请求服务器无法提供的地址。使用 `authoritative=yes`（默认）时，服务器会以 DHCPNAK 响应此类请求，使客户端立即重新开始，而不是等待请求超时。使用 `authoritative=no` 时，服务器会忽略广播的此类请求，例如来自重新绑定客户端的请求，并将其留给其他服务器处理。单播续租请求始终会得到响应：以 DHCPNAK 响应，或在请求的地址在地址池中空闲时提供新租约。

要让其他服务器先响应，例如以该路由器作为备用服务器的主服务器，请设置 `delay-threshold`。此时服务器会忽略请求，直到客户端尝试达到设置的时间，客户端会在其请求的 `secs` 字段中报告该时间。

### DHCP 中继后的客户端 {#clients-behind-a-dhcp-relay}

只有当服务器的 `relay` 属性已设置时，服务器才会响应中继请求：设置为中继地址，即中继的 `local-address`，或设置为 `255.255.255.255` 以匹配任意中继。这样，多个服务器可以在同一接口上运行，每个中继对应一个服务器。完整示例请参阅 [DHCP Relay](/docs/network-management/dhcp/relay)。

### 客户端的 DNS 条目 {#dns-entries-for-clients}

使用 `add-dns-entries=yes` 时，服务器会为每个已绑定租约添加一条动态 DNS 条目（类型 A），以便通过路由器的 DNS 解析器按名称访问客户端。名称是客户端发送的主机名，后跟 `add-dns-entries-suffix`（默认为 `lan`），例如 `laptop.lan`，条目的 TTL 为租约时间。当网络没有 `domain` 时，服务器还会将后缀作为域名发送给客户端。

## Network

**子菜单：** `/ip/dhcp-server/network`

network entry 保存发送给地址属于该网络的客户端的设置：网关、DNS 和 NTP 服务器、域名、选项以及网络启动设置。当未设置 `dns-server` 或 `ntp-server` 时，服务器会发送路由器自身使用的 DNS 或 NTP 服务器；设置 `dns-none` 或 `ntp-none` 可不发送任何服务器。所有属性均在 [`/ip/dhcp-server/network`](/docs/cli-reference/ip/dhcp-server/network) CLI 参考中说明。

## Leases

**子菜单：** `/ip/dhcp-server/lease`

lease 菜单显示服务器已分配的地址租约（动态条目），以及你为客户端添加的动态租约，用于分配固定地址、指定地址池中的地址或客户端自身的设置。所有租约属性、状态值和命令均在 [`/ip/dhcp-server/lease`](/docs/cli-reference/ip/dhcp-server/lease) CLI 参考中说明。

当客户端请求地址时，服务器会选择一个地址：

- 具有静态租约的客户端会获得其租约中的地址。静态地址不会进行冲突检查。
- 其他客户端会从地址池中获取空闲地址。启用 `conflict-detection`（默认启用）后，服务器会先通过 ARP 请求和 ICMP echo 请求检查该地址，这会使 offer 延迟约半秒。如果另一台主机应答，该地址会保留为状态为 `conflict` 的租约，保留时间为租约时间，并为客户端提供另一个空闲地址。

随后服务器会提供该地址，并在客户端请求时绑定租约。当客户端释放地址或租约到期时，动态租约会被移除，地址返回地址池；静态租约会保留，并在客户端返回时再次使用。

### 租约存储 {#lease-storage}

服务器会定期将租约保存到磁盘，默认每 5 分钟保存一次，以减少对闪存的写入。该间隔和 RADIUS 计费设置在 `/ip/dhcp-server/config` 中配置，请参阅 [`/ip/dhcp-server/config`](/docs/cli-reference/ip/dhcp-server/config) CLI 参考。

### 速率限制 {#rate-limiting}

你可以通过租约的 `rate-limit` 属性限制客户端带宽。服务器随后会为该租约地址添加一条动态 simple queue。

:::warning
队列不适用于 FastTracked 流量。请确保防火墙不会对要限制的流量执行 FastTrack。
:::

只有静态租约可以设置速率限制，因此先将租约设为静态：

```ros
[admin@MikroTik] > /ip/dhcp-server/lease/print 
Flags: X - disabled, R - radius, D - dynamic, B - blocked 
 #   ADDRESS               MAC-ADDRESS       HOST-NAME               SERVER               RATE-LIMIT               STATUS 
 0 D 192.168.88.254        6C:3B:6B:7C:41:3E MikroTik                DHCPv4_Server                                 bound 

[admin@MikroTik] > /ip/dhcp-server/lease/make-static 0

[admin@MikroTik] > /ip/dhcp-server/lease/print 
Flags: X - disabled, R - radius, D - dynamic, B - blocked 
 #   ADDRESS               MAC-ADDRESS       HOST-NAME               SERVER               RATE-LIMIT               STATUS 
 0   192.168.88.254        6C:3B:6B:7C:41:3E MikroTik                DHCPv4_Server                                 bound
```

然后设置速率限制。服务器会为该租约创建一个动态 simple queue：

```ros
[admin@MikroTik] > /ip/dhcp-server/lease/set 0 rate-limit=10M/10M

[admin@MikroTik] > /queue/simple/print 
Flags: X - disabled, I - invalid, D - dynamic 
 0  D name="dhcp-ds<MikroTik/6C:3B:6B:7C:41:3E>" target=192.168.88.254/32 parent=none packet-marks="" priority=8/8 queue=default-small/default-small limit-at=10M/10M max-limit=10M/10M burst-limit=0/0 burst-threshold=0/0 burst-time=0s/0s 
      bucket-size=0.1/0.1
```

:::note
`allow-dual-stack-queue` 默认启用，因此同一客户端的 DHCP 租约和 DHCPv6 绑定共用一个动态 simple queue。未启用时，服务器会为 IPv4 和 IPv6 分别创建队列。
:::

共享队列同时包含 IPv4 和 IPv6 地址：

```ros
[admin@MikroTik] > /queue/simple/print 
Flags: X - disabled, I - invalid, D - dynamic 
 0  D name="dhcp-ds<MikroTik/6C:3B:6B:7C:41:3E>" target=192.168.88.254/32,fdb4:4de7:a3f8:418c::/66 parent=none packet-marks="" priority=8/8 queue=default-small/default-small limit-at=10M/10M max-limit=10M/10M burst-limit=0/0 burst-threshold=0/0 
      burst-time=0s/0s bucket-size=0.1/0.1 
```

## RADIUS 支持 {#radius-support}

DHCP 服务器也可以从 RADIUS 服务器获取租约（`use-radius=yes`）。它发送并接受以下 RADIUS 属性。

### Access-Request

- NAS-Identifier - 路由器标识。
- NAS-IP-Address - 路由器自身的 IP 地址。
- NAS-Port - 配置 DHCP 服务端的接口 ID。该值与 IF-MIB::ifIndex 相同。
- NAS-Port-Id - 配置 DHCP 服务端的接口名称。
- NAS-Port-Type - Ethernet。
- Calling-Station-Id - 客户端标识符（active-client-id）。
- Framed-IP-Address - 客户端的 IP 地址（active-address）。
- Called-Station-Id - DHCP 服务端的名称。
- User-Name - 客户端的 MAC 地址（active-mac-address）。
- Password - “ ”。

### Access-Accept

- Framed-IP-Address - 将分配给客户端的 IP 地址。
- Framed-Pool - 用于向客户端分配 IP 地址的 IP 池。
- Rate-Limit - DHCP 客户端的数据速率限制。格式为：`rx-rate[/tx-rate] [rx-burst-rate[/tx-burst-rate] [rx-burst-threshold[/tx-burst-threshold] [rx-burst-time[/tx-burst-time][priority] [rx-rate-min[/tx-rate-min]]]]`。所有速率都应为数字，可带可选的 'k'（1,000s）或 'M'（1,000,000s）。如果未指定 tx-rate，则 rx-rate 也用作 tx-rate。tx-burst-rate、tx-burst-threshold 和 tx-burst-time 也是如此。如果未指定 rx-burst-threshold 和 tx-burst-threshold（但指定了 burst-rate），则 rx-rate 和 tx-rate 用作突发阈值。如果未指定 rx-burst-time 和 tx-burst-time，则默认使用 1s。Priority 取值为 1..8，其中 1 表示最高优先级，8 表示最低优先级。如果未指定 rx-rate-min 和 tx-rate-min，则使用 rx-rate 和 tx-rate 值。rx-rate-min 和 tx-rate-min 值不能超过 rx-rate 和 tx-rate 值。
- Ascend-Data-Rate - TX/RX 数据速率限制。如果提供多个属性，第一个限制 tx 数据速率，第二个限制 RX 数据速率。如果与 Ascend-Xmit-Rate 一起使用，则指定 RX 速率。0 表示无限制。
- Ascend-Xmit-Rate - tx 数据速率限制。它可用于仅指定 TX 限制，而不发送两个连续的 Ascend-Data-Rate 属性（在这种情况下，Ascend-Data-Rate 将指定接收速率）。0 表示无限制。
- Session-Timeout - 最大租约时间（lease-time）。

### 每个租约的速率限制 {#rate-limit-per-lease}

RADIUS 服务器可以使用 Mikrotik-Rate-Limit 属性为每个租约分配速率限制。首先，设置 DHCP 服务器使用 RADIUS：

```ros
/radius
add address=10.0.0.1 secret=VERYsecret123 service=dhcp
/ip/dhcp-server
set dhcp1 use-radius=yes
```

然后配置 RADIUS 服务器发送 Mikrotik-Rate-Limit 属性。对于使用 MySQL 的 FreeRADIUS，为客户端的 MAC 地址向 `radcheck` 和 `radreply` 表添加条目，例如：

```sql
INSERT INTO `radcheck` (`username`, `attribute`, `op`, `value`) VALUES
('00:0C:42:00:D4:64', 'Auth-Type', ':=', 'Accept');

INSERT INTO `radreply` (`username`, `attribute`, `op`, `value`) VALUES
('00:0C:42:00:D4:64', 'Framed-IP-Address', '=', '192.168.88.254'),
('00:0C:42:00:D4:64', 'Mikrotik-Rate-Limit', '=', '10M');
```

## Alerts

DHCP alert 可在接口上发现非法 DHCP 服务器。它监视接口上的 DHCP 回复，并检查每个回复是否来自有效的 DHCP 服务器。来自未知服务器的回复会记录到日志中，alert 还可以运行脚本：

```ros
[admin@MikroTik] > /log/print where topics~"dhcp"
 00:34:23 dhcp,critical,error dhcp alert on Public: discovered unknown dhcp server, mac 00:02:29:60:36:E7, ip 10.5.8.236
```

由于 DHCP 回复可以是单播，alert 可能看不到其他服务器发送给客户端的 offer。因此，alert 也充当 DHCP 客户端：它大约每分钟发送一次自己的 DHCPDISCOVER。

:::warning
不要在作为同一接口上 DHCP 客户端的路由器上使用 DHCP alert：alert 发送的 DHCPDISCOVER 消息可能会干扰 DHCP 客户端。请在 DHCP 服务器上或具有静态 IP 地址的路由器上使用 alert。
:::

**子菜单：** `/ip/dhcp-server/alert`

新警报创建后默认禁用；添加后请启用它们。所有警报属性均见 [`/ip/dhcp-server/alert`](/docs/cli-reference/ip/dhcp-server/alert) CLI 参考。

## DHCP 选项 {#dhcp-options}

**子菜单：** `/ip/dhcp-server/option`

你可以定义 DHCP 服务器要发送的其他选项。当同一选项在多个层级设置时，优先采用最先出现的层级：

1. RADIUS。
2. Lease。
3. Server。
4. Network。

只有当客户端在其参数请求列表（option 55）中请求某选项时，服务器才会发送该选项。即使客户端未请求也要发送选项，请在该选项上设置 `force`，例如在以下示例中的 `auto-proxy-config` 选项上设置：

```ros
/ip/dhcp-server/option/set [find name=auto-proxy-config] force=yes
```

所有选项属性，包括选项值的编写方式以及它们可以包含的变量，均在 [`/ip/dhcp-server/option`](/docs/cli-reference/ip/dhcp-server/option) CLI 参考中说明。

### DHCP 选项集 {#dhcp-option-sets}

**子菜单：** `/ip/dhcp-server/option/sets`

该菜单允许将多个 option 组合为 option set，之后可用于覆盖 DHCP 服务器默认的 option set。

### 示例 {#example}

**无类别路由**

无类别静态路由选项（option 121，RFC 3442）向客户端发送路由。本示例发送一条到 160.0.0.0/24 的路由和一条默认路由，二者均通过 10.1.101.1。该值包括：

- `18` - 前缀长度 24。
- `A00000` - 目标地址的有效八位组，160.0.0。
- `0A016501` - 网关，10.1.101.1。
- `00` - 前缀长度 0，即默认路由。
- `0A016501` - 默认路由的网关，10.1.101.1。

接收 option 121 的客户端会忽略路由器选项（option 3），因此此处也包含默认路由。

```ros
/ip/dhcp-server/option
add code=121 name=classless value=0x18A000000A016501000A016501
/ip/dhcp-server/network
set 0 dhcp-option=classless
```

客户端上的结果：

```ros
[admin@MikroTik] > /ip/route/print
Flags: D - DYNAMIC; A - ACTIVE; c - CONNECT, d - DHCP
Columns: DST-ADDRESS, GATEWAY, DISTANCE
    DST-ADDRESS   GATEWAY     DISTANCE
DAd 0.0.0.0/0     10.1.101.1         1
DAd 160.0.0.0/24  10.1.101.1         1
```

使用 `$(NETWORK_GATEWAY)` 变量时，网关取自网络设置，而不是写入该值：

```ros
/ip/dhcp-server/option
add name=classless code=121 value="0x18A00000\$(NETWORK_GATEWAY)0x00\$(NETWORK_GATEWAY)"
```

**自动代理配置**

```ros
/ip/dhcp-server/option 
  add code=252 name=auto-proxy-config value="'https://autoconfig.something.lv/wpad.dat'"
```

## 选项匹配器 {#option-matcher}

选项匹配器通过 DHCP 客户端请求中的任意 DHCP 选项识别客户端，并从指定 IP 地址池为其分配地址。它可以精确比较选项值（`exact`），也可以在选项值中查找包含的内容（`substring`）。当选项包含的内容多于要匹配的部分时，请使用 substring 匹配，例如供应商类别标识符中还包含设备型号或 MAC 地址。

:::note
当两个 substring 匹配器匹配同一选项时，例如一个匹配“ABC”，另一个匹配“ABCDE”，而选项值为“ABCDEF”，则随机应用其中一个匹配器。
:::

:::note
具有静态租约的客户端会保留其静态地址，即使匹配器匹配到该客户端也是如此。
:::

所有匹配器属性均在 [`/ip/dhcp-server/matcher`](/docs/cli-reference/ip/dhcp-server/matcher) CLI 参考中说明。

### 选项匹配器示例 {#option-matcher-examples}

按 *exact* Vendor class identifier（DHCP option 60）匹配 *dhcp1* 服务器的客户端，并从 *pool1* 分配地址：

```ros
/ip/dhcp-server/matcher
add address-pool=pool1 code=60 matching-type=exact name=test1 server=dhcp1 value=android-dhcp-11
```

在所有 DHCP 服务器上按配置为十六进制值的 *exact* Client Id（DHCP option 61）匹配客户端，并从 *pool2* 分配地址：

```ros
/ip/dhcp-server/matcher
add address-pool=pool2 code=61 matching-type=exact name=test2 server=all value=0x016c3b6bed8364
```

按 Hostname（DHCP option 12）*部分*匹配 *dhcp2* 服务器客户端，并从 *pool3* 分配地址：

```ros
/ip/dhcp-server/matcher
add address-pool=pool3 code=12 matching-type=substring name=test3 server=dhcp2 value=MikroTik
```
