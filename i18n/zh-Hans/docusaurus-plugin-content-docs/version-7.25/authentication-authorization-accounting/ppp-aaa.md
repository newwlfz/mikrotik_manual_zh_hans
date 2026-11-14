---
sidebar_key: "authentication-authorization-accounting/ppp-aaa"
sidebar_position: 4
title: "PPP AAA"
sidebar_label: "PPP AAA"
description: "MikroTik RouterOS PPP AAA 功能通过本地和 RADIUS 支持提供认证、授权和计费。PPP 配置文件为用户访问记录定义默认设置，包括网桥配置、速率限制以及加密和压缩等安全选项。"
tags:
  - 'ppp'
  - 'aaa'
  - 'radius'
source: https://manual.mikrotik.com/docs/7.25/authentication-authorization-accounting/ppp-aaa
captured_at: '2026-11-04T11:14:19+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#summary}

**子菜单：** `/ppp`

MikroTik RouterOS 提供可扩展的认证、授权和计费 (AAA) 功能。

本地认证使用用户数据库和配置文件数据库执行。给定用户的实际配置由用户数据库中的相应用户记录、配置文件数据库中的关联项，以及配置文件数据库中为该用户正在认证的给定服务设置为默认的项组合而成。配置文件数据库中的默认配置文件设置优先级最低，而用户数据库中的用户访问记录设置优先级最高，唯一例外是特定 IP 地址在 local-address 和 remote-address 设置中优先于 IP 地址池，这些设置将在后面描述。

对 RADIUS 认证的支持使 ISP 或网络管理员能够通过一台服务器在整个大型网络中管理 PPP 用户访问和计费。MikroTik RouterOS 具有 [RADIUS 客户端](./radius.md)，可为 PPP、[PPPoE](../virtual-private-networks/pppoe/index.md)、[PPTP](../virtual-private-networks/pptp.md)、[L2TP](../virtual-private-networks/l2tp/index.md)、[OpenVPN](../virtual-private-networks/openvpn.md) 和 ISDN 连接进行认证。从 RADIUS 服务器收到的属性会覆盖默认配置文件中设置的属性，但如果未收到某些参数，则从相应的默认配置文件获取。

## 用户配置文件 {#user-profiles}

**子菜单：** `/ppp/profile`

PPP 配置文件用于为存储在 `/ppp/secret` 子菜单下的用户访问记录定义默认值。`/ppp/secret` 用户数据库中的设置会覆盖相应的 `/ppp/profile` 设置，但当指定为 local-address 或 remote-address 参数时，单个 IP 地址始终优先于 IP 地址池。

### 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **address-list** (*string*; 默认：) | [地址列表](../firewall-and-quality-of-service/firewall/address-lists.md) 名称，ppp 分配（在服务器上）或接收（在客户端上）的地址将添加到该列表。 |
| **remote-ipv6-prefix-reuse** (*no \| yes*; 默认：**no**) | 如果指定了 "remote-ipv6-prefix-pool" 并且包含单个 "/64" 前缀，则该前缀只能用于单个 PPP 客户端以进行 RADVD 配置。当此选项设置为值 "yes" 时，同一前缀可在使用此 PPP 配置文件的所有客户端之间重复使用。 |
| **bridge** (*string*; 默认：) | [bridge](../bridging-and-switching/index.md) 接口的名称，ppp 接口将作为从端口添加到该接口。两个隧道端点（服务器和客户端）都必须位于 bridge 中才能使其正常工作，更多详细信息请参见 bridge 手册。 |
| **bridge-horizon** (*integer 0..429496729*; 默认：) | 用于动态创建的 bridge 端口的 split-horizon 值。可用于防止桥接环路和隔离流量。为一组端口设置相同的值，以防止它们向具有相同 horizon 值的端口发送数据。 |
| **bridge-learning** (*default \| no \| yes*; 默认：**default**) | 更改动态创建的 bridge 端口上的 MAC 学习行为：yes - 启用 MAC 学习；no - 禁用 MAC 学习；default - 从接口默认配置文件派生此值；如果这是接口默认配置文件，则与 yes 相同 |
| **bridge-path-cost** (*integer 1..200000000*; 默认：) | 用于动态创建的 bridge 端口的路径开销，由 STP/RSTP 用于确定最佳路径，由 MSTR 用于确定区域之间的最佳路径。当 bridge protocol-mode 设置为 none 时，此属性无效。 |
| **bridge-port-priority** (*integer 0..240*; 默认：) | 用于动态创建的 bridge 端口的优先级，由 STP/RSTP 用于确定根端口，由 MSTP 用于确定区域之间的根端口。当 bridge protocol-mode 设置为 none 时，此属性无效。 |
| **bridge-port-vid** (*integer 1..4094*; 默认：**1**) | 用于为动态创建的接口分配 PVID 参数。仅当 bridge vlan-filtering 设置为 yes 时，此属性才有效。 |
| **bridge-port-trusted**(*no \| yes*;默认：**no**) | 用于将动态创建的接口设置为 DHCP 信任接口。 |
| **change-tcp-mss** (*yes \| no \| default*; 默认：**no**) | 修改连接 MSS 设置（仅适用于 IPv4）：yes - 调整连接 MSS 值；no - 不调整连接 MSS 值；default - 从接口默认配置文件派生此值；如果这是接口默认配置文件，则与 no 相同 |
| **comment** (*string*; 默认：) | 配置文件备注 |
| **dhcpv6-lease-time** (*string*; 默认：) | 租约时间可从 7.20ab202 开始设置，默认时间设置为 1d。 |
| **dhcpv6-pd-pool** (*string*; 默认：) | [IPv6 地址池](../cli-reference/ipv6/pool/index.md) 的名称，当客户端连接时，动态创建的 [DHCPv6 服务器](../network-management/dhcp/dhcpv6-server.md) 将使用该地址池。  [`了解更多 >>`](../virtual-private-networks/pppoe/ipv6-pd-over-ppp.md) |
| **dhcpv6-use-radius** (*no \| yes*; 默认：**no**) | 指定为动态生成的 DHCPv6 PD 服务器选择的 "use-radius" 选项的值。 |
| **dns-server** (*IP*; 默认：) | 提供给 PPP 客户端的 DNS 服务器 IP 地址 |
| **idle-timeout** (*time*; 默认：) | 指定在没有活动的情况下，链路将在多长时间后终止。默认不设置超时 |
| **incoming-filter** (*string*; 默认：) | 传入数据包的防火墙链名称。指定链将控制来自客户端的每个数据包。应手动添加 ppp 链，并且应将 action=jump jump-target=ppp 的规则添加到其他相关链，此功能才能生效。更多信息请参见示例部分。 |
| **insert-queue-before** (*bottom \| first \| queue name* ; 默认：) | 将新队列插入为最后一个、第一个，或插入到指定队列之前 |
| **interface-list** (*interface list name*; 默认：) | 指定将配置文件接口添加到的接口列表 |
| **local-address** (*IP address \| pool*; 默认：) | 隧道地址，或用于为本地 ppp 接口分配地址的 [地址池](../cli-reference/ip/pool/index.md) 名称 |
| **name** (*string*; 默认：) | PPP 配置文件名称 |
| **on-up** (*script*; 默认：) | 在用户登录事件时执行脚本。事件脚本可访问以下变量：userlocal-addressremote-addresscaller-idcalled-idinterface。*interface* 变量将返回接口 id 值，而不是接口名称。 |
| **on-down** (*script*; 默认：) | 在用户注销时执行脚本。更多详细信息请参见 ***on-up*** |
| **only-one** (*yes \| no \| default*; 默认：**default**) | 定义是否允许用户同时拥有多个 ppp 会话：yes - 不允许用户同时拥有多个 ppp 会话；no - 允许用户同时拥有多个 ppp 会话；default - 从接口默认配置文件派生此值；如果这是接口默认配置文件，则与 no 相同 |
| **outgoing-filter** (*string*; 默认：) | 传出数据包的防火墙链名称。指定链将控制发往客户端的每个数据包。应手动添加 PPP 链，并且应将 action=jump jump-target=ppp 的规则添加到其他相关链，此功能才能生效。更多信息请参见示例部分。 |
| **parent-queue** (*none* \| *queue name*; 默认：) | 指定父队列 |
| **queue-type** (*default \| ethernet-default \| wireless-default \| synchronous-default \|* *hotspot-default \| pcq-upload-default \| pcq-download-default \| only-hardware-queue \| multi-queue-ethernet-default \| default-small \| 自定义队列类型名称* ; 默认：) | 指定队列类型。从 7.19 开始，可以为客户端的“上传”和“下载”分别指定 rx/tx 队列类型。使用 / 配置单独的队列类型，第一个是 rx 队列类型，然后是 tx 队列类型。 |
| **rate-limit** (*string*; 默认：) | 从路由器角度来看的速率限制，格式为 **rx-rate[/tx-rate] [rx-burst-rate[/tx-burst-rate] [rx-burst-threshold[/tx-burst-threshold] [rx-burst-time[/tx-burst-time] [priority] [rx-rate-min[/tx-rate-min]]]]**（因此 “rx” 是客户端上传，“tx” 是客户端下载）。所有速率均以比特每秒为单位，除非后面带有可选的 'k' 后缀（千比特每秒）或 'M' 后缀（兆比特每秒）。如果未指定 tx-rate，则 rx-rate 也用作 tx-rate。这同样适用于 tx-burst-rate、tx-burst-threshold 和 tx-burst-time。如果既未指定 rx-burst-threshold 也未指定 tx-burst-threshold（但指定了 burst-rate），则使用 rx-rate 和 tx-rate 作为突发阈值。如果既未指定 rx-burst-time 也未指定 tx-burst-time，则默认使用 1s。priority 取值为 1..8，其中 1 表示最高优先级，而 8 表示最低优先级。如果未指定 rx-rate-min 和 tx-rate-min，则使用 rx-rate 和 tx-rate 值。rx-rate-min 和 tx-rate-min 值不能超过 rx-rate 和 tx-rate 值。 |
| **remote-address** (*IP*; 默认：) | 隧道地址，或用于为远程 ppp 接口分配地址的 [地址池](../cli-reference/ip/pool/index.md) 名称。 |
| **remote-ipv6-prefix-pool** (*string \| none*; 默认：**none**) | 从 IPv6 地址池向客户端分配前缀，并安装相应的 IPv6 路由。 |
| **session-timeout** (*time*; 默认：) | 连接可保持的最长时间。默认情况下不设置时间限制。 |
| **use-compression** (*yes \| no \| default*; 默认：**default**) | 指定是否使用数据压缩。yes - 启用数据压缩；no - 禁用数据压缩；default - 从接口默认配置文件派生此值；如果这是接口默认配置文件，则与 no 相同。此设置不影响 OVPN 隧道。 |
| **use-encryption** (*yes \| no \| default \| require*; 默认：**default**) | 指定是否使用数据加密。yes - 启用数据加密；no - 禁用数据加密；default - 从接口默认配置文件派生此值；如果这是接口默认配置文件，则与 no 相同；require - 明确要求加密。此设置在 OVPN 和 SSTP 隧道上不起作用。 |
| **use-ipv6** (*yes \| no \| default \| require*; 默认：**default**) | 指定是否允许 IPv6。默认情况下，如果安装了 IPv6 软件包，则启用。yes - 启用 IPv6 支持；no - 禁用 IPv6 支持；default - 从接口默认配置文件派生此值；如果这是接口默认配置文件，则与 no 相同；require - 明确要求 IPv6 支持 |
| **use-mpls** (*yes \| no \| default \| require*; 默认：**default**) | 指定是否允许在 PPP 上使用 MPLS。yes - 启用 MPLS 支持；no - 禁用 MPLS 支持；default - 从接口默认配置文件派生此值；如果这是接口默认配置文件，则与 no 相同；require - 明确要求 MPLS 支持 |
| **use-upnp** (*yes \| no \| default*; 默认：**default**) | 指定是否允许 UPnP：yes - 启用 UPnP。no - 禁用 UPnP。default - 从接口默认配置文件派生此值；如果这是接口默认配置文件，则与 no 相同。 |
| **wins-server** (*IP address*; 默认：) | 提供给 Windows 客户端的 WINS 服务器 IP 地址 |

### 备注 {#notes}

两个默认配置文件无法删除：

```ros
[admin@rb13] /ppp/profile> print
Flags: * - default
 0 * name="default" use-compression=no use-encryption=no only-one=no
     change-tcp-mss=yes
 1 * name="default-encryption" use-compression=default use-encryption=yes
     only-one=default change-tcp-mss=default
[admin@rb13] /ppp/profile>
```

*incoming-filter* 和 *outgoing-filter* 参数会向链 *ppp* 添加动态跳转规则，其中 jump-target 参数将等于配置文件中的 *incoming-filter* 或 *outgoing-filter* 参数。因此，在更改这些参数之前，应手动添加链 *ppp*。

如果使用 RADIUS 认证，则忽略 only-one 参数。

PPP 隧道使用 LCP 协议进行 MTU 协商，该协商在连接建立时立即发生。不支持 Framed MTU 属性，因为它仅在通过 RADIUS 认证后才会发送。

## 用户数据库 {#user-database}

**子菜单：** `/ppp/secret`

PPP 用户数据库存储 PPP 用户访问记录，并为每个用户分配 PPP 用户配置文件。

## 属性 {#properties-1}

| 属性 | 说明 |
| :-- | :-- |
| **caller-id** (*string*; 默认：) | 对于 [PPTP](../virtual-private-networks/pptp.md) 和 [L2TP](../virtual-private-networks/l2tp/index.md)，它是客户端必须从其连接的 IP 地址。对于 [PPPoE](../virtual-private-networks/pppoe/index.md)，它是客户端必须从其连接的 MAC 地址（以大写字母书写）。对于 ISDN，它是主叫号码（可能由运营商提供，也可能不提供），客户端可以从该号码拨入 |
| **comment** (*string*; 默认：) | 用户的简短描述。 |
| **disabled** (*yes \| no*; 默认：**no**) | 是否使用该 secret。 |
| **limit-bytes-in** (*integer*; 默认：**0**) | 客户端在一次会话中可上传的最大字节数。 |
| **limit-bytes-out** (*integer*; 默认：**0**) | 客户端在一次会话中可下载的最大字节数。 |
| **local-address** (*IP address*; 默认：) | 将在 ppp 接口本地设置的 IP 地址。 |
| **name** (*string*; 默认：) | 用于认证的名称 |
| **password** (*string*; 默认：) *[敏感](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用于认证的密码 |
| **profile** (*string*; 默认：**default**) | 要使用哪个[用户配置文件](#user-profiles) |
| **remote-address** (*IP*; 默认：) | 将分配给远程 ppp 接口的 IP 地址。 |
| **remote-ipv6-prefix** (*IPv6 prefix*; 默认：) | 分配给 ppp 客户端的 IPv6 前缀。该前缀会添加到 [ND 前缀列表](../system-information-and-utilities/neighbor-discovery.md)，从而在 ppp 接口上启用[无状态](../getting-started/networking-fundamentals/ipv6-neighbor-discovery.md#stateless-address-autoconfiguration)地址自动配置。 |
| **routes** (*string*; 默认：) | 当客户端连接时出现在服务器上的路由。路由格式为：dst-address gateway metric（例如，10.1.0.0/ 24 10.0.0.1 1）。其他语法不可接受，因为它可能被错误表示。可以指定多条路由，并用逗号分隔。对于 [OpenVPN](../virtual-private-networks/openvpn.md)，将忽略此参数。 |
| **service** (*any \| async \| isdn \| l2tp \| pppoe \| pptp \| ovpn \| sstp*; 默认：**any**) | 指定特定用户可以使用的服务。 |

## 活动用户 {#active-users}

**子菜单：** `/ppp/active`

此子菜单允许监控活动（已连接）用户。

`/ppp/active/print` 命令将显示所有当前连接的用户。

`/ppp/active/print stats` 命令将显示接收/发送的字节和数据包

## 属性 {#properties-2}

| 属性 | 说明 |
| :-- | :-- |
| **address** (*IP address*) | 客户端从服务器获取的 IP 地址 |
| **bytes** (*integer*) | 通过此连接传输的字节数。第一个数字表示从路由器角度看已发送的流量，第二个数字表示已接收的流量。 |
| **caller-id** (*string*) | 对于 [PPTP](../virtual-private-networks/pptp.md) 和 [L2TP](../virtual-private-networks/l2tp/index.md)，它是客户端连接时所来自的 IP 地址。对于 [PPPoE](../virtual-private-networks/pppoe/index.md)，它是客户端连接时所来自的 MAC 地址。 |
| **encoding** (*string*) | 显示此连接中使用的加密和编码（如果不对称，则用 '/' 分隔） |
| **limit-bytes-in** (*integer*) | 允许用户发送到路由器的最大字节数。 |
| **limit-bytes-out** (*integer*) | 允许用户发送到客户端的最大字节数。 |
| **name** (*string*) | 认证阶段提供的用户名 |
| **packets** (*integer/integer*) | 通过此连接传输的数据包数。第一个数字表示从路由器角度看已发送的流量，第二个数字表示已接收的流量 |
| **service** (*async \| isdn \| l2tp \| pppoe \| pptp \| ovpn \| sstp*) | 用户正在使用的服务类型。 |
| **session-id** (*string*) | 显示唯一的客户端标识符。 |
| **uptime** (*time*) | 用户在线时间 |

## 远程 AAA {#remote-aaa}

**子菜单：** `/ppp/aaa`

此子菜单中的设置允许设置 RADIUS 计费和认证。请注意，仅当在本地用户数据库中找不到所需用户名时，才会查询 RADIUS 用户数据库。

## 属性 {#properties-3}

| 属性 | 说明 |
| :-- | :-- |
| **accounting** (*yes \| no*; 默认：**yes**) | 启用 RADIUS 计费 |
| **interim-update** (*time*; 默认：**0s**) | Interim-Update 时间间隔 |
| **use-radius** (*yes \| no*; 默认：**no**) | 启用通过 RADIUS 进行用户认证。如果在本地 secret 数据库中找不到条目，则客户端将通过 RADIUS 进行认证。 |
| **enable-ipv6-accounting** (*yes \| no*; 默认：**no**) | 启用 IPv6 单独计费。默认情况下，PPP 服务在向 RADIUS 服务器报告网络使用统计信息时，会将 Layer2、IPv4 和 IPv6 数据一起计入。如果需要区分 IPv4 和 IPv6 流量，则可以启用此选项。其工作前提是必须通过 PPP 服务向客户端分配前缀，并且还必须提供 rate-limit。动态创建的队列统计信息将用作 IPv6 数据的计数器，然后作为单独的 IPv6 统计属性包含在计费数据包中。对于由动态创建的 DHCPv6 服务器根据所提供的前缀池或 PPP/Profile 配置分配的前缀，此功能将不起作用。此时前缀分配由 DHCP 服务处理，而不是 PPP，因此计费无法由 PPP 服务管理。 |

## 示例 {#examples}

#### 添加新配置文件 {#add-new-profile}

要添加配置文件 ex，该配置文件将 10.0.0.1 地址分配给路由器本身，并将 ex 地址池中的地址分配给客户端，同时通过 mypppclients 链过滤来自客户端的流量：

```ros
[admin@rb13] /ppp/profile> add name=ex local-address=10.0.0.1 remote-address=ex incoming-filter=mypppclients
[admin@rb13] /ppp/profile> print
Flags: * - default
 0 * name="default" use-compression=no use-vj-compression=no use-encryption=no only-one=no
     change-tcp-mss=yes
 1   name="ex" local-address=10.0.0.1 remote-address=ex use-compression=default
     use-vj-compression=default use-encryption=default only-one=default change-tcp-mss=default
     incoming-filter=mypppclients
 2 * name="default-encryption" use-compression=default use-vj-compression=default use-encryption=yes
     only-one=default change-tcp-mss=default
[admin@rb13] /ppp/profile>
```

#### 添加新用户 {#add-new-user}

要添加用户 "ex"，密码为 "lkjrht"，配置文件为 "ex"，且仅可用于 PPTP 服务，请输入以下命令：

```ros
[admin@rb13] /ppp/secret> add name=ex password=lkjrht service=pptp profile=ex
[admin@rb13] /ppp/secret> print
Flags: X - disabled
 #   NAME                SERVICE CALLER-ID         PASSWORD          PROFILE            REMOTE-ADDRESS
 0   ex                  pptp                      lkjrht            ex                 0.0.0.0
[admin@rb13] /ppp/secret>
```
