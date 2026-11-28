---
title: "PPP AAA"
description: "MikroTik RouterOS PPP AAA 功能提供身份验证、授权和计费，并支持本地和 RADIUS。PPP 配置文件定义用户访问记录的默认设置，包括网桥配置、速率限制，以及加密和压缩等安全选项。"
tags:
  - 'ppp'
  - 'aaa'
  - 'radius'
source: https://manual.mikrotik.com/docs/7.25/authentication-authorization-accounting/ppp-aaa
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "memory"
---

## 摘要 {#summary}

**子菜单：** `/ppp`

MikroTik RouterOS 提供可扩展的认证、授权和计费（AAA）功能。

本地认证使用 User Database 和 Profile Database 执行。指定用户的实际配置由 User Database 中的相应用户记录、Profile Database 中的关联项，以及 Profile Database 中针对用户所认证服务设置为默认的项组合而成。Profile Database 中的默认配置文件设置优先级最低，而 User Database 中的用户访问记录设置优先级最高，唯一例外是特定 IP 地址在 local-address 和 remote-address 设置中优先于 IP 地址池，详见后文。

对 RADIUS 认证的支持使 ISP 或网络管理员能够通过一台服务器管理整个大型网络中的 PPP 用户访问和计费。MikroTik RouterOS 具有 [RADIUS 客户端](/docs/7.24/authentication-authorization-accounting/radius)，可对 PPP、[PPPoE](/docs/7.24/virtual-private-networks/pppoe)、[PPTP](/docs/7.24/virtual-private-networks/pptp)、[L2TP](/docs/7.24/virtual-private-networks/l2tp)、[OpenVPN](/docs/7.24/virtual-private-networks/openvpn) 和 ISDN 连接进行认证。从 RADIUS 服务器收到的属性会覆盖默认配置文件中设置的属性，但如果未收到某些参数，则使用相应默认配置文件中的参数。

## 用户配置文件 {#user-profiles}

**子菜单：** `/ppp/profile`

PPP 配置文件用于为存储在 `/ppp/secret` 子菜单下的用户访问记录定义默认值。`/ppp/secret` User Database 中的设置会覆盖相应的 `/ppp/profile` 设置，但当指定为 local-address 或 remote-address 参数时，单个 IP 地址始终优先于 IP 地址池。

### 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **address-list** (*string*; Default: ) | [地址列表](/docs/7.24/firewall-and-quality-of-service/firewall/address-lists) 名称，ppp 在服务器上分配的地址或在客户端收到的地址将添加到该列表中。 |
| **remote-ipv6-prefix-reuse** (*no \| yes*; Default: **no**) | 如果指定了 "remote-ipv6-prefix-pool" 且其中仅包含一个 "/64" 前缀，则该前缀只能用于单个 PPP 客户端的 RADVD 配置。当该选项设置为 "yes" 时，同一前缀可在所有使用此 PPP profile 的客户端之间复用。 |
| **bridge** (*string*; Default: ) | [网桥](/docs/7.24/bridging-and-switching) 接口的名称，ppp 接口将作为从属端口添加到该网桥。要使此功能生效，隧道两端（服务器和客户端）都必须位于网桥中，详情请参阅网桥手册。 |
| **bridge-horizon** (*integer 0..429496729*; Default: ) | 动态创建的网桥端口使用的 split-horizon 值。可用于防止网桥环路并隔离流量。为一组端口设置相同值，可防止它们向具有相同 horizon 值的端口发送数据。 |
| **bridge-learning** (*default \| no \| yes*; Default: **default**) | 更改动态创建的网桥端口上的 MAC 学习行为：<ul><li>yes - 启用 MAC 学习</li><li>no - 禁用 MAC 学习</li><li>default - 从接口默认 profile 派生该值；如果这是接口默认 profile，则与 yes 相同</li></ul> |
| **bridge-path-cost** (*integer 1..200000000*; Default: ) | 动态创建的网桥端口使用的路径开销，STP/RSTP 使用它确定最佳路径，MSTR 使用它确定区域之间的最佳路径。当网桥 protocol-mode 设置为 none 时，该属性无效。 |
| **bridge-port-priority** (*integer 0..240*; Default: ) | 动态创建的网桥端口使用的优先级，STP/RSTP 使用它确定根端口，MSTP 使用它确定区域之间的根端口。当网桥 protocol-mode 设置为 none 时，该属性无效。 |
| **bridge-port-vid** (*integer 1..4094*; Default: **1**) | 用于为动态创建的接口分配 PVID 参数。仅当网桥 vlan-filtering 设置为 yes 时，该属性才生效。 |
| **bridge-port-trusted**(*no \| yes*;Default: **no**) | 用于将动态创建的接口设置为 DHCP trusted。 |
| **change-tcp-mss** (*yes \| no \| default*; Default: **no**) | 修改连接 MSS 设置（仅适用于 IPv4）：<ul><li>yes - 调整连接 MSS 值</li><li>no - 不调整连接 MSS 值</li><li>default - 从接口默认 profile 派生该值；如果这是接口默认 profile，则与 no 相同</li></ul> |
| **comment** (*string*; Default: ) | profile 注释 |
| **dhcpv6-lease-time** (*string*; Default: ) | 从 7.20ab202 起可设置租约时间，默认时间为 1d。 |
| **dhcpv6-pd-pool** (*string*; Default: ) | 客户端连接时，动态创建的 [DHCPv6 服务器](/docs/7.24/network-management/dhcp#dhcpv6-server) 将使用的 [IPv6 地址池](/docs/7.24/cli-reference/ipv6/pool) 名称。[`了解更多 >>`](/docs/7.24/virtual-private-networks/pppoe/ipv6-pd-over-ppp) |
| **dhcpv6-use-radius** (*no \| yes*; Default: **no**) | 为动态生成的 DHCPv6 PD 服务器指定 "use-radius" 选项的值。 |
| **dns-server** (*IP*; Default: ) | 提供给 PPP 客户端的 DNS 服务器 IP 地址 |
| **idle-timeout** (*time*; Default: ) | 指定无活动时链路终止前等待的时间。默认未设置超时时间 |
| **incoming-filter** (*string*; Default: ) | 入站数据包的防火墙链名称。指定链将获得来自客户端的每个数据包的控制权。要使此功能生效，必须手动添加 ppp 链，并向其他相关链添加 action=jump jump-target=ppp 规则。详情请参阅“示例”部分。 |
| **insert-queue-before** (*bottom \| first \| queue name* ; Default: ) | 将新队列插入为最后一个、第一个，或插入到指定队列之前 |
| **interface-list** (*interface list name*; Default: ) | 指定 profile 接口将添加到的接口列表 |
| **local-address** (*IP address \| pool*; Default: ) | 隧道地址，或从中为本地 ppp 接口分配地址的 [地址池](/docs/7.24/cli-reference/ip/pool) 名称 |
| **name** (*string*; Default: ) | PPP profile 名称 |
| **on-up** (*script*; Default: ) | 在用户登录事件时执行脚本。事件脚本可访问以下变量：<ul><li>user</li><li>local-address</li><li>remote-address</li><li>caller-id</li><li>called-id</li><li>interface</li></ul> <em>interface</em> 变量将返回接口 id 值，而不是接口名称。 |
| **on-down** (*script*; Default: ) | 在用户注销时执行脚本。详情请参阅 ***on-up*** |
| **only-one** (*yes \| no \| default*; Default: **default**) | 定义是否允许用户同时拥有多个 ppp 会话<ul><li>yes - 不允许用户同时拥有多个 ppp 会话</li><li>no - 允许用户同时拥有多个 ppp 会话</li><li>default - 从接口默认 profile 派生该值；如果这是接口默认 profile，则与 no 相同</li></ul> |
| **outgoing-filter** (*string*; Default: ) | 出站数据包的防火墙链名称。指定链将获得发往客户端的每个数据包的控制权。要使此功能生效，必须手动添加 PPP 链，并向其他相关链添加 action=jump jump-target=ppp 规则。详情请参阅“示例”部分。 |
| **parent-queue** (*none* \| *queue name*; Default: ) | 指定父队列 |
| **queue-type** (*default \| ethernet-default \| wireless-default \| synchronous-default \|* *hotspot-default \| pcq-upload-default \| pcq-download-default \| only-hardware-queue \| multi-queue-ethernet-default \| default-small \| custom queue type name* ; Default: ) | 指定队列类型。从 7.19 起，可以分别为客户端的“上传”和“下载”指定 rx/tx 队列类型。使用 / 配置单独的队列类型，第一个是 rx 队列类型，第二个是 tx 队列类型。 |
| **rate-limit** (*string*; Default: ) | 速率限制格式为 **rx-rate[/tx-rate] [rx-burst-rate[/tx-burst-rate] [rx-burst-threshold[/tx-burst-threshold] [rx-burst-time[/tx-burst-time] [priority] [rx-rate-min[/tx-rate-min]]]]**，从路由器角度描述（因此 "rx" 是客户端上传，"tx" 是客户端下载）。除非后跟可选的 'k' 后缀（千比特每秒）或 'M' 后缀（兆比特每秒），否则所有速率均以比特每秒为单位。如果未指定 tx-rate，则 rx-rate 也用作 tx-rate。tx-burst-rate、tx-burst-threshold 和 tx-burst-time 也是如此。如果未指定 rx-burst-threshold 和 tx-burst-threshold（但指定了 burst-rate），则 rx-rate 和 tx-rate 用作突发阈值。如果未指定 rx-burst-time 和 tx-burst-time，则默认使用 1s。Priority 取值为 1..8，其中 1 表示最高优先级，8 表示最低优先级。如果未指定 rx-rate-min 和 tx-rate-min，则使用 rx-rate 和 tx-rate 值。rx-rate-min 和 tx-rate-min 值不能超过 rx-rate 和 tx-rate 值。 |
| **remote-address** (*IP*; Default: ) | 隧道地址，或从中为远端 ppp 接口分配地址的 [地址池](/docs/7.24/cli-reference/ip/pool) 名称。 |
| **remote-ipv6-prefix-pool** (*string \| none*; Default: **none**) | 从 IPv6 地址池向客户端分配前缀，并安装相应的 IPv6 路由。 |
| **session-timeout** (*time*; Default: ) | 连接可保持的最长时间。默认不设置时间限制。 |
| **use-compression** (*yes \| no \| default*; Default: **default**) | 指定是否使用数据压缩。<ul><li>yes - 启用数据压缩</li><li>no - 禁用数据压缩</li><li>default - 从接口默认 profile 派生该值；如果这是接口默认 profile，则与 no 相同</li></ul>此设置不影响 OVPN 隧道。 |
| **use-encryption** (*yes \| no \| default \| require*; Default: **default**) | 指定是否使用数据加密。<ul><li>yes - 启用数据加密</li><li>no - 禁用数据加密</li><li>default - 从接口默认 profile 派生该值；如果这是接口默认 profile，则与 no 相同</li><li>require - 明确要求加密</li></ul>此设置不适用于 OVPN 和 SSTP 隧道。 |
| **use-ipv6** (*yes \| no \| default \| require*; Default: **default**) | 指定是否允许 IPv6。默认情况下，如果安装了 IPv6 软件包，则启用。<ul><li>yes - 启用 IPv6 支持</li><li>no - 禁用 IPv6 支持</li><li>default - 从接口默认 profile 派生该值；如果这是接口默认 profile，则与 no 相同</li><li>require - 明确要求 IPv6 支持</li></ul> |
| **use-mpls** (*yes \| no \| default \| require*; Default: **default**) | 指定是否允许在 PPP 上使用 MPLS。<ul><li>yes - 启用 MPLS 支持</li><li>no - 禁用 MPLS 支持</li><li>default - 从接口默认 profile 派生该值；如果这是接口默认 profile，则与 no 相同</li><li>require - 明确要求 MPLS 支持</li></ul> |
| **use-upnp** (*yes \| no \| default*; Default: **default**) | 指定是否允许 UPnP：<ul><li>yes - 启用 UPnP。</li><li>no - 禁用 UPnP。</li><li>default - 从接口默认 profile 派生该值；如果这是接口默认 profile，则与 no 相同。</li></ul> |
| **wins-server** (*IP address*; Default: ) | 提供给 Windows 客户端的 WINS 服务器 IP 地址 |

### 说明 {#notes}

两个默认 profile 无法删除：

```ros
[admin@rb13] /ppp/profile> print
Flags: * - default
 0 * name="default" use-compression=no use-encryption=no only-one=no
     change-tcp-mss=yes
 1 * name="default-encryption" use-compression=default use-encryption=yes
     only-one=default change-tcp-mss=default
[admin@rb13] /ppp/profile>
```

*incoming-filter* 和 *outgoing-filter* 参数会向 *ppp* 链添加动态 jump 规则，其中 jump-target 参数将等于 profile 中的 *incoming-filter* 或 *outgoing-filter* 参数。因此，在更改这些参数之前，应手动添加 *ppp* 链。

如果使用 RADIUS 身份验证，则会忽略 only-one 参数。

PPP 隧道使用 LCP 协议协商 MTU，该过程在连接建立时立即发生。不支持 Framed MTU 属性，因为它仅在通过 Radius 完成身份验证后发送。

## 用户数据库 {#user-database}

**子菜单：** `/ppp/secret`

PPP 用户数据库存储 PPP 用户访问记录，并为每个用户分配 PPP 用户配置文件。

## 属性 {#properties-1}

| 属性 | 描述 |
| :-- | :-- |
| **caller-id** (*string*；默认值： ) | 对于 [PPTP](/docs/7.24/virtual-private-networks/pptp) 和 [L2TP](/docs/7.24/virtual-private-networks/l2tp)，这是客户端必须从其连接的 IP 地址。对于 [PPPoE](/docs/7.24/virtual-private-networks/pppoe)，这是客户端必须从其连接的 MAC 地址（以大写字母书写）。对于 ISDN，这是客户端可以拨入的呼叫方号码（运营商可能提供，也可能不提供）。 |
| **comment** (*string*；默认值： ) | 用户的简短描述。 |
| **disabled** (*yes \| no*；默认值：**no**) | 是否使用该 secret。 |
| **limit-bytes-in** (*integer*；默认值：**0**) | 客户端在一个会话中可上传的最大字节数。 |
| **limit-bytes-out** (*integer*；默认值：**0**) | 客户端在一个会话中可下载的最大字节数。 |
| **local-address** (*IP address*；默认值： ) | 将在 ppp 接口本地设置的 IP 地址。 |
| **name** (*string*；默认值： ) | 用于认证的名称。 |
| **password** (*string*；默认值： ) *[敏感信息](/docs/7.24/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 用于认证的密码。 |
| **profile** (*string*；默认值：**default**) | 使用哪个[用户配置文件](#user-profiles)。 |
| **remote-address** (*IP*；默认值： ) | 将分配给远端 ppp 接口的 IP 地址。 |
| **remote-ipv6-prefix** (*IPv6 prefix*；默认值： ) | 分配给 ppp 客户端的 IPv6 前缀。该前缀会添加到 [ND prefix list](/docs/7.24/system-information-and-utilities/neighbor-discovery)，从而在 ppp 接口上启用[无状态](/docs/7.24/getting-started/networking-fundamentals/ipv6-neighbor-discovery#stateless-address-autoconfiguration)地址自动配置。 |
| **routes** (*string*；默认值： ) | 客户端连接后出现在服务器上的路由。路由格式为：dst-address gateway metric（例如 10.1.0.0/ 24 10.0.0.1 1）。不接受其他语法，因为可能无法正确表示。可以指定多条路由，并用逗号分隔。对于 [OpenVPN](/docs/7.24/virtual-private-networks/openvpn)，该参数将被忽略。 |
| **service** (*any \| async \| isdn \| l2tp \| pppoe \| pptp \| ovpn \| sstp*；默认值：**any**) | 指定特定用户可以使用的服务。 |

## 活动用户 {#active-users}

**子菜单：** `/ppp/active`

该子菜单用于监控活动（已连接）用户。

`/ppp/active/print` 命令将显示当前所有已连接用户。

`/ppp/active/print stats` 命令将显示接收/发送的字节数和数据包数

## 属性 {#properties-2}

| 属性 | 说明 |
| :-- | :-- |
| **address** (*IP 地址*) | 客户端从服务器获取的 IP 地址 |
| **bytes** (*整数*) | 通过该连接传输的字节数。第一个数字表示从路由器角度看的发送流量，第二个数字表示接收流量。 |
| **caller-id** (*字符串*) | 对于 [PPTP](/docs/7.24/virtual-private-networks/pptp) 和 [L2TP](/docs/7.24/virtual-private-networks/l2tp)，这是客户端连接的源 IP 地址。对于 [PPPoE](/docs/7.24/virtual-private-networks/pppoe)，这是客户端连接的 MAC 地址。 |
| **encoding** (*字符串*) | 显示此连接中使用的加密和编码方式（非对称时用“/”分隔） |
| **limit-bytes-in** (*整数*) | 允许用户发送到路由器的最大字节数。 |
| **limit-bytes-out** (*整数*) | 允许用户发送到客户端的最大字节数。 |
| **name** (*字符串*) | 在认证阶段提供的用户名 |
| **packets** (*整数/整数*) | 通过该连接传输的数据包数。第一个数字表示从路由器角度看的发送流量，第二个数字表示接收流量 |
| **service** (*async \| isdn \| l2tp \| pppoe \| pptp \| ovpn \| sstp*) | 用户使用的服务类型。 |
| **session-id** (*字符串*) | 显示唯一的客户端标识符。 |
| **uptime** (*时间*) | 用户的在线时长 |

## 远程 AAA {#remote-aaa}

**子菜单：** `/ppp/aaa`

此子菜单中的设置用于配置 RADIUS 计费和认证。请注意，只有在本地用户数据库中找不到所需用户名时，才会查询 RADIUS 用户数据库。

## 属性 {#properties-3}

| 属性 | 说明 |
| :-- | :-- |
| **accounting** (*yes \| no*；默认：**yes**) | 启用 RADIUS 计费 |
| **interim-update** (*时间*；默认：**0s**) | Interim-Update 时间间隔 |
| **use-radius** (*yes \| no*；默认：**no**) | 通过 RADIUS 启用用户认证。如果在本地 secret 数据库中找不到条目，则客户端将通过 RADIUS 进行认证。 |
| **enable-ipv6-accounting** (*yes \| no*；默认：**no**) | 启用 IPv6 单独计费。默认情况下，PPP 服务在向 RADIUS 服务器报告网络使用统计信息时，会将 Layer2、IPv4 和 IPv6 数据一起统计。如果需要区分 IPv4 和 IPv6 流量，可以启用此选项。其工作前提是必须通过 PPP 服务向客户端分配前缀，并且必须提供 rate-limit。动态创建的队列统计信息将用作 IPv6 数据的计数器，随后会作为单独的 IPv6 统计属性包含在计费数据包中。对于由动态创建的 DHCPv6 服务器通过所提供的前缀池或 PPP/Profile 配置分配的前缀，此功能不起作用。此时前缀分配由 DHCP 服务处理，而不是 PPP，因此计费无法由 PPP 服务管理。 |

## 示例 {#examples}

#### 添加新配置文件 {#add-new-profile}

添加配置文件 ex，为路由器自身分配 10.0.0.1 地址，并将 ex 地址池中的地址分配给客户端，同时通过 mypppclients 链过滤来自客户端的流量：

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

添加用户“ex”，密码为“lkjrht”，配置文件为“ex”，且仅可用于 PPTP 服务，请输入以下命令：

```ros
[admin@rb13] /ppp/secret> add name=ex password=lkjrht service=pptp profile=ex
[admin@rb13] /ppp/secret> print
Flags: X - disabled
 #   NAME                SERVICE CALLER-ID         PASSWORD          PROFILE            REMOTE-ADDRESS
 0   ex                  pptp                      lkjrht            ex                 0.0.0.0
[admin@rb13] /ppp/secret>
```
