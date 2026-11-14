---
sidebar_key: "authentication-authorization-accounting/hotspot-captive-portal"
title: "HotSpot - 强制门户"
sidebar_label: "HotSpot - 强制门户"
description: "MikroTik HotSpot 网关可为公共网络启用客户端认证，具备 DHCP 地址池、多种认证方式和 walled-garden 访问等功能。它需要 IPv4，并具有特定的路由限制，文档中提供了用于设置的配置示例。"
tags:
  - 'hotspot'
  - 'firewall'
  - 'dhcp'
source: https://manual.mikrotik.com/docs/authentication-authorization-accounting/hotspot-captive-portal
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

MikroTik HotSpot 网关在客户端访问公共网络之前为其提供身份验证。

:::warning
HotSpot（强制门户）使用 web-proxy，目前只能使用默认路由表，这使得 PCC(per connection-classifier) 因使用多个路由表而成为一种无效方法。
:::

:::warning
HotSpot 功能可能会被 device-mode 阻止。在配置 HotSpot 之前，请确保已在 `/system/device-mode` 中启用该功能 ([更多信息](../../system-information-and-utilities/device-mode.md).
:::

### HotSpot 属性 {#hotspot-properties}

| 属性 | 描述 |
| :--- | :--- |
| **name** | HotSpot 服务器实例的描述性名称。 |
| **interface** | HotSpot 服务将监听客户端请求的特定本地接口（物理或虚拟）。 |
| **address-pool** | HotSpot 客户端将通过 DHCP 从中获取 IP 地址的 IP 地址池。 |
| **profile** | 对 HotSpot 服务器配置文件的引用，其中包含登录方法和 HTML 目录等常用设置。 |
| **idle-timeout** | 在未检测到流量时，客户端经过该无活动时段后会自动注销。 |
| **keepalive-timeout** | 用于检查客户端是否仍可访问的时间间隔；如果客户端无响应，则会终止会话。 |
| **login-timeout** | 登录页面显示后，允许客户端完成身份验证过程的最长持续时间。 |
| **addresses-per-mac** | 限制可与单个 MAC 地址关联的 IP 地址数量。 |
| **proxy-status** | 指示 HotSpot 系统所使用的内部 web-proxy 的当前运行状态。 |

### HotSpot 网关功能 {#hotspot-gateway-features}

- 使用路由器上的本地客户端数据库或远程 RADIUS 服务器对客户端进行不同的身份验证方法。
- 在路由器上的本地数据库或远程 RADIUS 服务器中进行用户计费。
- 围墙花园系统，无需授权即可访问某些网页。
- 登录页面修改，可在其中放置公司信息。
- 自动且透明地将客户端的任意 IP 地址更改为有效地址。
- HotSpot 可以通知 DHCP 客户端它们位于强制门户之后（RFC7710）。

HotSpot 仅在 IPv4 下才能可靠工作。HotSpot 依赖防火墙 NAT 规则，而目前 IPv6 不支持这些规则。

## 示例 {#example}

```ros
[admin@MikroTik] /ip/hotspot> setup 
Select interface to run HotSpot on 

hotspot interface: ether3
Set HotSpot address for interface 

local address of network: 10.5.50.1/24
masquerade network: yes
Set pool for HotSpot addresses 

address pool of network: 10.5.50.2-10.5.50.254
Select hotspot SSL certificate 

select certificate: none
Select SMTP server 

ip address of smtp server: 0.0.0.0
Setup DNS configuration 

dns servers: 10.1.101.1
DNS name of local hotspot server 

dns name: myhotspot
Create local hotspot user 

name of local hotspot user: admin
password for the user: 
[admin@MikroTik] /ip/hotspot>
```

## 验证 HotSpot 配置 {#verify-hotspot-configuration}

```ros
[admin@MikroTik] /ip/hotspot> print 
Flags: X - disabled, I - invalid, S - HTTPS 
# NAME INTERFACE ADDRESS-POOL PROFILE IDLE-TIMEOUT
0 hotspot1 ether3 hs-pool-3 hsprof1 5m 
[admin@MikroTik] /ip/hotspot> 
[admin@MikroTik] /ip/pool> print 
# NAME RANGES 
0 hs-pool-3 10.5.50.2-10.5.50.254 
[admin@MikroTik] /ip/pool> /ip/dhcp-server 
[admin@MikroTik] /ip/dhcp-server> print 
Flags: X - disabled, I - invalid 
# NAME INTERFACE RELAY ADDRESS-POOL LEASE-TIME ADD-ARP
0 dhcp1 ether3 hs-pool-3 1h 
[admin@MikroTik] /ip/dhcp-server> /ip/firewall/nat 
[admin@MikroTik] /ip/firewall/nat> print 
Flags: X - disabled, I - invalid, D - dynamic 
0 X ;;; place hotspot rules here
chain=unused-hs-chain action=passthrough 

1 ;;; masquerade hotspot network
chain=srcnat action=masquerade src-address=10.5.50.0/24 
[admin@MikroTik] /ip/firewall/nat> 
```

### **设置过程中询问的参数** {#parameters-asked-during-the-setup-process}

| 参数 | 描述 |
| :-- | :-- |
| **hotspot interface** (*string*；默认值：**allow**) | 运行 HotSpot 的接口名称。要在桥接接口上运行 HotSpot，请确保公共接口未包含在桥接端口中。 |
| **local address of network** (*IP*；默认值：**10.5.50.1/24**) | HotSpot 网关地址 |
| **masquerade network** (*yes \| no*；默认值：**yes**) | 是否对 HotSpot 网络进行伪装；当为 **yes** 时，会向 *`/ip/firewall/nat`* 添加一条带有 *action=masquerade* 的规则 |
| **address pool of network** (*string*；默认值：**yes**) | HotSpot 网络的地址池，用于将用户 IP 地址更改为有效地址。在为不愿更改其网络设置的移动客户端提供网络访问时很有用。 |
| **select certificate** (*none \| import-other-certificate*；默认值： ) | 当需要 HTTPS 授权方法时，选择 SSL 证书。 |
| **ip address of smtp server** (*IP*；默认值：**0.0.0.0**) | SMTP 服务器的 IP 地址，用于重定向 HotSpot 网络的 SMTP 请求（TCP 端口 25） |
| **dns servers** (*IP*；默认值：**0.0.0.0**) | 用于 HotSpot 客户端的 DNS 服务器地址，配置取自 HotSpot 网关的 *`/ip/dns`* 菜单 |
| **dns name** (*string*；默认值：**""**) | HotSpot 服务器的域名，需要完全限定域名，例如 [www.example.com](http://www.example.com) |
| **name of local hotspot user** (*string*；默认值：**"admin"**) | 自动创建的一个 HotSpot 用户的用户名，该用户会被添加到 *`/ip/hotspot/user`* |
| **password for the user** (*string*；默认值： ) | 自动创建的 HotSpot 用户的密码 |

## HotSpot {#hotspot}

**子菜单：** `/ip/hotspot`

该菜单用于管理路由器的 HotSpot 服务器。可以在以太网、无线、VLAN 和桥接接口上运行 HotSpot。每个接口只允许一个 HotSpot 服务器。在桥接接口上配置 HotSpot 时，请将 HotSpot 接口设置为桥接接口，而不是桥接端口；不要将公共接口添加到桥接端口。你可以手动将 HotSpot 服务器添加到 *`/ip/hotspot`* 菜单，但建议运行 *`/ip/hotspot/setup`*，它会添加所有必要设置。

| 参数 | 描述 |
| :-- | :-- |
| **name** (text) | HotSpot 服务器的名称或标识符 |
| **address-pool** (name/none；默认值：*none*) | 用于将任意 HotSpot 客户端 IP 地址更改为有效地址的地址空间。在为不愿更改其网络设置的移动客户端提供公共网络访问时很有用 |
| **idle-timeout** (time/none；默认值：*5m*) | 未授权客户端的无活动时段。当该客户端没有流量时（实际上，客户端计算机应已关机），一旦达到超时时间，用户就会从 HotSpot 主机列表中移除，其使用的地址变为可用 |
| **keepalive-timeout** (time/none；默认值：*none*) | 表示主机在从 HotSpot 中移除之前可以保持不可达多长时间的值 |
| **login-timeout** (time/none；默认值：*none*) | 如果主机在该时间段后仍未通过系统授权，则主机的条目会从主机表中删除。循环会重复，直到主机登录系统。如果存在主机在未授权状态下在主机表中停留太久后无法登录的情况，请启用此选项。 |
| **interface** (接口名称) | 运行 HotSpot 的接口 |
| **addresses-per-mac** (integer**/**unlimited；默认值：2) | 当多个 HotSpot 客户端使用一个 MAC 地址连接时，允许与该 MAC 地址绑定的 IP 地址数量 |
| **profile** (name；默认值：***default*) | HotSpot 服务器的默认 HotSpot 配置文件，位于 *`/ip/hotspot/profile`* |

## 只读 {#read-only}

| 参数 | 描述 |
| :-- | :-- |
| keepalive-timeout (只读；time) | 应用于用户的 keepalive-timeout 的确切值。该值表示主机可以保持不可达多久后从 HotSpot 中移除 |

## HotSpot 配置文件 {#hotspot-profile}

此子菜单包含 HotSpot 服务器配置文件列表。同一台网关机器上可以有各种不同的 HotSpot 系统，定义为服务器配置文件。一个或多个接口可以分组到一个服务器配置文件中。特定接口上的服务器设置很少——大部分配置都在服务器配置文件中设置。例如，可以为每个服务器配置文件制作完全不同的一组 servlet 页面，并定义不同的 RADIUS 服务器用于身份验证。

| 属性 | 描述 |
| :-- | :-- |
| **dns-name** (*string*; 默认值: **""**) | HotSpot 服务器的 DNS 名称。该 DNS 名称用作 HotSpot 服务器的名称（即，它显示为登录页面的位置）。此名称将自动作为静态 DNS 条目添加到 DNS 缓存中。 |
| **hotspot-address** (*IP*; 默认值: **0.0.0.0**) | HotSpot 服务的 IP 地址。 |
| **html-directory** (*string*; 默认值: **hotspot**) | 存储 HotSpot HTML 页面的目录名称（默认为 *hotspot* 目录）。可以指定包含修改后 HTML 页面的其他目录。要更改 HotSpot 登录页面，请从路由器获取 HotSpot 文件，修改后再上传回同一位置。必须在 html-directory 字段中输入完整路径，包括 "/flash/(hotspot\_dir)" |
| **html-directory-override** (*string*; 默认值: **none**) | HotSpot HTML 文件的替代路径。仅当自定义的 HotSpot HTML 文件存储在外部存储设备上时才应使用。 |
| **http-cookie-lifetime** (*time*; 默认值: **3d**) | HTTP cookie 的有效时间，此选项与 *cookie* HotSpot 登录方式相关 |
| **http-proxy** (*IP:Port*; 默认值: **0.0.0.0:0**) | HotSpot 服务的代理服务器地址和端口，当使用默认值时，所有请求都由本地 `/ip/proxy` 解析 |
| **https-redirect** (*yes \| no*; 默认值: **yes**) | 当用户访问 https:// url 时，是否将未认证用户重定向到 HotSpot 登录页面。由于证书域名不匹配，这通常会导致错误，因此可以将此参数设置为 "no"，此时所有 https 请求将被直接拒绝，用户必须访问 http 页面。 |
| **login-by** (*cookie\|http-chap\|http-pap\|https\|mac\|trial\|mac-cookie*; 默认值: **http-chap, cookie**) | 所使用的 HotSpot 认证方法<ul><li><strong>mac-cookie</strong> - 启用 mac cookie 登录方式</li><li><strong>cookie</strong> - 只能与另一种 HTTP 认证方法一起使用。当用户在 HotSpot 中首次认证时会生成 HTTP cookie。在 <em>cookie-lifetime</em> 有效期内，用户不会被要求输入登录名/密码，而是自动完成认证</li><li><strong>http-chap</strong> - 用户在 HotSpot 中认证需要登录名/密码。使用带 MD5 哈希算法的 CHAP 质询-响应方法来保护密码。</li><li><strong>http-pap</strong> - 用户在 HotSpot 中认证需要登录名/密码。用户名和密码以明文形式通过网络发送。</li><li><strong>https</strong> - 用户在 HotSpot 中认证需要登录名/密码。客户端与服务器之间的登录名/密码交换通过 SSL 隧道加密。</li><li><strong>mac</strong> - 客户端无需登录表单即可认证。客户端 MAC 地址被添加到 <code>/ip/hotspot/user</code> 数据库中，客户端一旦连接到 HotSpot 即完成认证</li><li><strong>trial</strong> - 允许客户端在指定时间内无需 HotSpot 登录即可使用互联网</li></ul> |
| **mac-auth-password** (*string*; 默认值: ) *[sensitive](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 与 MAC 认证一起使用，该字段用于指定按 MAC 地址认证的用户所需的密码。当特定 RADIUS 服务器拒绝密码为空的客户端认证时，需要此选项 |
| **name** (*string*; 默认值: ) | 配置文件的描述性名称 |
| **nas-port-type** (*string*; 默认值: **wireless-802.11**) | 发送到 RADIUS 服务器的 NAS-Port-Type 值，NAS-Port-Type 值在 RADIUS RFC 2865 中描述。此可选值属性指示 HotSpot 服务器物理端口的类型。 |
| **radius-accounting** (*yes \| no*; 默认值: **yes**) | 当设置为 yes 时，为每个用户发送 RADIUS 服务器计费信息 |
| **radius-default-domain** (*string*; 默认值: ) | 用于 RADIUS 请求的默认域。允许为每个 *`/ip/hotspot/profile`* 使用单独的 RADIUS 服务器。如果使用，应在 /radius domain 值下指定相同的域名。 |
| **radius-interim-update** (*time \| received*; 默认值: **received**) | 发送计费更新的频率。当设置为 *received* 时，使用 RADIUS 服务器的 interim-time。**0s** 与 *received* 相同。 |
| **radius-location-name** (*string*; 默认值: ) | 要发送到 RADIUS 服务器的 RADIUS-Location-Id。用于在与 RADIUS 服务器通信期间标识 HotSpot 服务器的位置。该值是可选的，并与 RADIUS 服务器一起使用。 |
| **radius-mac-format** (*"XX XX XX XX XX XX"\|XX:XX:XX:XX:XX:XX\|XXXXXX-XXXXXX\|XXXXXXXXXXXX\|XX-XX-XX-XX-XX-XX\|XXXX:XXXX:XXXX\|XXXXXX:XXXXXX*; 默认值: **XX:XX:XX:XX:XX:XX**) | 用于设置用户 mac 地址格式的选项，该地址在 AAA 会话期间发送到 RADIUS 服务器。 |
| **rate-limit** (*string*; 默认值: **""**) | 从路由器角度看的速率限制，形式为 **rx-rate[/tx-rate] [rx-burst-rate[/tx-burst-rate] [rx-burst-threshold[/tx-burst-threshold] [rx-burst-time[/tx-burst-time]]]] [priority] [rx-rate-min[/tx-rate-min]]**（因此 "rx" 是客户端上传，"tx" 是客户端下载）。所有速率应为数字，可带可选的 'k'（1,000 倍）或 'M'（1,000,000 倍）。如果未指定 tx-rate，则 rx-rate 也作为 tx-rate 使用。tx-burst-rate、tx-burst-threshold 和 tx-burst-time 同理。如果 rx-burst-threshold 和 tx-burst-threshold 均未指定（但指定了 burst-rate），则使用 rx-rate 和 tx-rate 作为突发阈值。如果 rx-burst-time 和 tx-burst-time 均未指定，则默认使用 1s。rx-rate-min 和 tx-rate-min 是 limit-at 属性的值 |
| **smtp-server** (*IP*; 默认值: **0.0.0.0**) | 用于重定向 HotSpot 用户 SMTP 请求的 SMTP 服务器地址。 |
| **split-user-domain** (*yes \| no*; 默认值: **no**) | 当 RADIUS 服务器以 "user@domain" 或 "domain\user" 格式提供用户名时，将用户名与域名分离 |
| **ssl-certificate** (*string \| none*; 默认值: **none**) | 路由器上仅用于 HTTPS 认证的 SSL 证书名称。 |
| **trial-uptime** (*time/time*; 默认值: **30m/1d**) | 仅与 *trial* 认证方法一起使用。第一个时间值指定按 MAC 地址识别的试用用户可以在无需 HotSpot 认证的情况下访问公共网络的时长。第二个时间值指定必须经过多长时间后用户才被允许再次使用试用。 |
| **trial-user-profile** (*string*; 默认值: **default**) | 为试用用户指定 **HotSpot 用户配置文件**。 |
| **use-radius** (*yes \| no*; 默认值: **no**) | 使用 RADIUS 认证 HotSpot 用户。 |

## HotSpot 用户配置文件 {#hotspot-user-profiles}

**子菜单：** `/ip/hotspot/user/profile`

用户配置文件菜单用于设置 HotSpot 客户端的通用设置。配置文件类似于具有相同设置、rate-limit、过滤链名称等的用户组。

| 属性 | 描述 |
| :-- | :-- |
| **add-mac-cookie** (*yes\|no*; 默认值: **yes**) | 允许为用户添加 mac cookie。 |
| **address-list** (*string*; 默认值: ) | 将添加用户 IP 地址的地址列表名称。用于按用户组标记流量以进行 queue tree 配置。 |
| **address-pool** (*string \|none*; 默认值: **none**) | 用户从中获取 IP 的 IP 池名称。当用户在计算机上的网络设置配置不正确时，HotSpot 服务器会进行转换，并从池中分配正确的 IP 地址而不是错误的地址 |
| **advertise** (*yes \| no*; 默认值: **no**) | 启用强制广告弹窗。经过一定时间间隔后，会为 HotSpot 用户显示特定网页。广告页面可能会被浏览器弹窗拦截器阻止。 |
| **advertise-interval** (*time[,time[,..]]*; 默认值: **30m,10m**) | 广告弹窗之间的时间间隔集合。列表用完后，所有后续广告都使用最后一个值，即 10 分钟 |
| **advertise-timeout** (*time \| immediately \| never*; 默认值: **1m**) | 在阻止 HotSpot 客户端网络访问之前，广告显示的时长。未显示广告时不允许连接到互联网。 |
| **advertise-url** (*string[,string[,..]]*; 默认值: ) | 广告弹窗显示的 URL 列表。最后一个 URL 使用完后，列表从头开始。 |
| **idle-timeout** (*time \| none*; 默认值: **none**) | 已授权 HotSpot 客户端的最大非活动时长。当没有来自该客户端的流量经过路由器时（例如计算机关闭），计时器开始计数。达到超时时间后，用户被注销、从主机列表中移除，并且用户使用的地址被释放。 |
| **incoming-filter** (*string*; 默认值: ) | 应用于此配置文件用户传入数据包的防火墙链名称。需要从内置链（input、forward、output）跳转到 chain=hotspot 的规则 |
| **incoming-packet-mark** (*string*; 默认值: ) | 为此配置文件每个用户的传入数据包设置的包标记 |
| **keepalive-timeout** (*time \| none*; 默认值: ) | 已授权 HotSpot 客户端的 keepalive 超时。用于检测客户端的计算机是否存活且可达。达到超时值时用户被注销 |
| **mac-cookie-timeout** (*time*; 默认值: **3d**) | 选择自上次登录或注销起的 mac-cookie 超时。 |
| **name** (*string*; 默认值: ) | 配置文件的描述性名称 |
| **on-login** (*string*; 默认值: **""**) | 当用户从特定配置文件登录 HotSpot 时要执行的脚本名称。可以从内部 <strong>user</strong> 和 <strong>interface</strong> 变量获取用户名。例如，<em>:log info "User $user logged in!"</em>。如果 HotSpot 设置在网桥接口上，则除非在网桥设置中设置了 <strong>use-ip-firewall</strong>，否则 <strong>interface</strong> 变量将显示网桥作为实际接口。可用变量列表：<br/><ul><li>$user</li><li>$username（$user 的替代变量名）</li><li>$address</li><li>$"mac-address"</li><li>$interface</li></ul> |
| **on-logout** (*string*; 默认值: **""**) | 当用户从 HotSpot 注销时要执行的脚本名称。可以从内部 <strong>user</strong> 和 <strong>interface</strong> 变量获取用户名。例如，<em>:log info "User $user logged in!"</em>。如果 HotSpot 设置在网桥接口上，则除非在网桥设置中设置了 <strong>use-ip-firewall</strong>，否则 <strong>interface</strong> 变量将显示网桥作为实际接口。可用变量列表：<br/><ul><li>$user</li><li>$username（$user 的替代变量名）</li><li>$address</li><li>$"mac-address"</li><li>$interface</li><li>$cause</li></ul> 从 v6.34rc11 起，还有一些额外变量可用：<br/><ul><li>$uptime-secs - 最终会话时间（秒）</li><li>$bytes-in - 上传字节数</li><li>$bytes-out - 下载字节数</li><li>$bytes-total - 上传字节数 + 下载字节数</li><li>$packets-in - 上传数据包数</li><li>$packets-out - 下载数据包数</li><li>$packets-total - 上传数据包数 + 下载数据包数</li></ul> |
| **open-status-page** (*always \| http-login*; 默认值: **always**) | 用于为通过 mac 登录方式认证的用户显示状态页面的选项。例如，在状态页面（alogin.html）上显示广告<ul><li><strong>http-login</strong> - 仅为 HTTP 登录（包括 cookie 和 HTTPS）打开状态页面</li><li><strong>always</strong> - 在 mac 登录的情况下也打开 HTTP 状态页面</li></ul> |
| **outgoing-filter** (*string*; 默认值: ) | 应用于此配置文件用户传出数据包的防火墙链名称。需要从内置链（input、forward、output）跳转到 chain=hotspot 的规则 |
| **outgoing-packet-mark** (*string*; 默认值: ) | 为此配置文件每个用户的传出数据包设置的包标记 |
| **rate-limit** (*string*; 默认值: **""**) | 用户登录 HotSpot 后，会为该用户创建一个简单的动态队列。速率限制按以下形式配置 **[rx-rate[/tx-rate] [rx-burst-rate[/tx-burst-rate] [rx-burst-threshold[/tx-burst-threshold] [rx-burst-time[/tx-burst-time] [priority] [rx-rate-min[/tx-rate-min]]]]**。例如，要为客户端设置 1M 下载、512k 上传，则 rate-limit=512k/1M |
| **session-timeout** (*time*; 默认值: **0s**) | 客户端允许的会话时间。超过此时间后，用户被无条件注销 |
| **shared-users** (*integer*; 默认值: **1**) | 使用同一 HotSpot 用户名同时登录的允许数量 |
| **status-autorefresh** (*time \| none*; 默认值: **none**) | HotSpot 状态页面自动刷新间隔 |
| **transparent-proxy** (*yes \|*; 默认值: **yes**) | 为此配置文件的已授权用户使用透明 HTTP 代理 |

## HotSpot 用户 {#hotspot-users}

这是实际添加客户端用户名/密码信息的菜单。HotSpot 用户的其他配置选项也在此处配置。

| 属性 | 描述 |
| :-- | :-- |
| **address** (*IP*；默认值：**0.0.0.0**) | IP 地址；指定后，客户端将通过 HotSpot 一对一 NAT 转换获得该地址。该地址不会将 HotSpot 登录限制为仅能从该地址登录 |
| **comment** (*string*；默认值： ) | HotSpot 用户的描述性信息。可用于脚本为特定客户端更改参数 |
| **email** (*string*；默认值： ) | HotSpot 客户端的电子邮件，是 HotSpot 用户的信息性值 |
| **limit-bytes-in** (*integer*；默认值：**0**) | 可从用户接收的最大字节数。达到限制后，用户会从 HotSpot 断开连接。 |
| **limit-bytes-out** (*integer*；默认值：**0**) | 可从用户传输的最大字节数。达到限制后，用户会从 HotSpot 断开连接。 |
| **limit-bytes-total** (*integer*；默认值：**0**) | (limit-bytes-in+limit-bytes-out)。达到限制后，用户会从 HotSpot 断开连接。 |
| **limit-uptime** (*time*；默认值：**0**) | HotSpot 客户端的运行时间限制。一旦达到该运行时间，用户就会从 HotSpot 断开连接。 |
| **mac-address** (*MAC*；默认值：**00:00:00:00:00:00**) | 仅允许客户端从指定的 MAC 地址登录。如果值为 *00:00:00:00:00:00*，则允许任何 mac 地址。 |
| **name** (*string*；默认值： ) | HotSpot 登录页面用户名。使用 MAC 地址身份验证时，名称配置为客户端的 MAC 地址 |
| **password** (*string*；默认值： ) *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用户密码 |
| **profile** (*string*；默认值：**default**) | 在 *`/ip/hotspot/user/profile`* 中配置的用户配置文件 |
| **routes** (*string*；默认值： ) | 客户端连接时添加到 HotSpot 网关的路由。路由格式为 **dst-address gateway metric**（例如，*192.168.1.0/24 192.168.0.1 1*） |
| **server** (*string \| all*；默认值：**all**) | 允许用户登录的 HotSpot 服务器名称 |
| **otp-secret** (*string*；默认值： ) *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用于 HotSpot 用户授权的一次性密码令牌。它可作为 HotSpot 用户身份验证的单独 "密码" 使用。 |

## 只读属性 {#read-only-properties}

| 属性 | 描述 |
| :-- | :-- |
| **bytes-in** (*integer*) | 从客户端接收的数据字节总数。 |
| **bytes-out** (*integer*) | 发送给客户端的数据字节总数。 |
| **packets-in** (*integer*) | 从客户端接收的数据包总数。 |
| **packets-out** (*integer*) | 发送给客户端的数据包总数。 |
| **uptime** (*time*) | 自客户端通过身份验证以来的当前会话持续时间。 |

## HotSpot 活动 {#hotspot-active}

**子菜单：** `/ip/hotspot/active`

HotSpot 活动菜单显示所有在 HotSpot 中通过身份验证的客户端；该菜单仅供参考（只读）。此处无法更改任何内容，但可以使用 remove 命令将用户注销。

| 参数 | 描述 |
| :-- | :-- |
| **server** (只读；name) | 客户端登录的 HotSpot 服务器名称 |
| **user** (只读；name) | HotSpot 用户的名称 |
| **domain** (只读；text) | 用户的域（如果从用户名中分离），该参数仅与 RADIUS 身份验证一起使用 |
| **address** (只读；IP address) | HotSpot 用户的 IP 地址 |
| **mac-address** (只读；MAC-address) | HotSpot 用户的 MAC 地址 |
| **login-by** (只读；多选：cookie **/** http-chap **/** http-pap **/** https **/** mac **/** mac-cookie **/** trial) | HotSpot 客户端使用的身份验证方法 |
| **uptime** (只读；time) | 用户的当前会话时间，显示用户已登录多长时间 |
| **idle-time** (只读；time) | 用户已空闲的时间 |
| **session-time-left** (只读；time) | 应用于用户的 session-time 的确切值。该值显示允许用户在线多长时间，达到 **uptime** 后会自动注销 |
| **idle-timeout** (只读；time) | 用户 idle-timeout 的确切值 |
| **keepalive-timeout** (只读；time) | 应用于用户的 keepalive-timeout 的确切值。该值表示主机可以保持不可达多久后从 HotSpot 中移除 |
| **limit-bytes-in** (只读；integer) | 该值显示从客户端接收了多少字节；当为 HotSpot 用户配置了相应参数时，该选项生效 |
| **limit-bytes-out** (只读；integer) | 该值显示向客户端发送了多少字节；当为 HotSpot 用户配置了相应参数时，该选项生效 |
| **limit-bytes-total** (只读；integer) | 该值显示从客户端发送/接收的总字节数；当为 HotSpot 用户配置了相应参数时，该选项生效 |

## HotSpot 主机 {#hotspot-host}

**子菜单：** `/ip/hotspot/host`

主机表列出所有连接到 HotSpot 服务器的计算机。主机表仅供参考，无法在其中更改任何值：

| 参数 | 描述 |
| :-- | :-- |
| **mac-address** (只读；MAC-address) | HotSpot 用户 MAC 地址 |
| **address** (只读；IP address) | HotSpot 客户端的原始 IP 地址 |
| **to-address** (只读；IP address) | HotSpot 分配的新客户端地址，可能与原始 **address** 相同 |
| **server** (只读；name) | 客户端连接到的 HotSpot 服务器名称 |
| **bridge-port** (只读；name) | 客户端连接到的 *`/interface/bridge/port`*；当 HotSpot 未在桥上配置时，该值未知 |
| **uptime** (只读；time) | 该值显示用户在线（连接到 HotSpot）多长时间 |
| **idle-time** (只读；time) | 用户已空闲的时间 |
| **idle-timeout** (只读；time) | 客户端 idle-timeout 的值（未授权客户端） |
| **keepalive-timeout** (只读；time) | 未授权客户端的 keepalive-timeout 值 |
| **bytes-in** (只读；integer) | 从未授权客户端接收的字节数 |
| **packet-in** (只读；integer) | 从未授权客户端接收的数据包数 |
| **bytes-out** (只读；integer) | 发送给未授权客户端的字节数 |
| **packet-out** (只读；integer) | 发送给未授权客户端的数据包数 |

## HotSpot 围墙花园 {#hotspot-walled-garden}

围墙花园是一种系统，允许未经授权使用某些资源，但访问其他资源需要授权。例如，这对于提供有关 HotSpot 服务提供商或计费选项的一些常规信息很有用。

该菜单仅管理 HTTP 和 HTTPs 协议的围墙花园。其他协议也可以包含在围墙花园中，但这在其他位置配置（在 `/ip/hotspot/walled-garden/ip` 中）。

| 属性 | 描述 |
| :-- | :-- |
| **action** (*allow \| deny*；默认值：**allow**) | 当数据包匹配规则时要执行的动作allow - 无需授权即可访问网页deny - 访问网页需要授权 |
| **server** (*string*；默认值： ) | 应用规则的 HotSpot 服务器名称。 |
| **src-address** (*IP*；默认值： ) | 用户的源地址，通常是 HotSpot 客户端的 IP 地址 |
| **method** (*string*；默认值： ) | 请求的 HTTP 方法 |
| **dst-host** (*string*；默认值： ) | 目标 Web 服务器的域名 |
| **dst-port** (*integer*；默认值： ) | 客户端发送请求到的 TCP 端口号 |
| **path** (*string*；默认值： ) | 请求的路径。路径位于 '''http://dst\_host' 之后 |

# 只读属性 {#read-only-properties-1}

| 属性 | 描述 |
| :-- | :-- |
| **dst-address** (*IP*) |  |
| **hits** (*integer*) |  |

通配符属性（dst-host 和 path）匹配完整字符串（即，如果它们设置为 "example"，则不会匹配 "[example.com](http://example.com)"）。可用通配符为 '\*'（匹配任意数量的任意字符）和 '?'（匹配任意一个字符）。此处也接受正则表达式，但如果应将属性视为正则表达式，则它应以冒号 (':') 开头。为了表示给定模式之前不允许有任何符号，我们在模式开头使用 ^ 符号。为了指定给定模式之后不允许有任何符号，我们在模式末尾使用 $ 符号。

### 示例 {#example-1}

要仅允许在围墙花园中绕过访问 "[www.example.com/test](http://www.example.com/test)"，而不允许访问 "[www.example.com/test/test.php](http://www.example.com/test/test.php)"：

```
/ip/hotspot/walled-garden
add dst-host=:^www.example.com path=":/test\$"
```

## HotSpot 围墙花园 ip {#hotspot-walled-garden-ip}

用于为其他协议和不同的源/目标地址（或地址列表）绕过 HotSpot 身份验证。用于不同的服务（Winbox、SSH、Telnet、SIP 等）。

| 属性 | 描述 |
| :-- | :-- |
| **action** (*accept \|drop\|reject*；默认值：**allow**) | 当数据包匹配规则时要执行的动作allow - 无需授权即可访问开放的服务drop - 访问该服务需要授权reject - 访问该服务需要授权；访问该服务时，将生成 ICMP 拒绝消息 host-unreachable |
| **server** (*string*；默认值： ) | 应用规则的 HotSpot 服务器名称。 |
| **src-address** (*IP*；默认值： ) | 用户的源地址，通常是 HotSpot 客户端的 IP 地址 |
| **dst-address** (*IP*；默认值： ) | 目标 IP 地址，即 WEB 服务器的 IP 地址。如果已指定 **dst-host**，则忽略。 |
| **src-address-list** (*string*；默认值： ) | 源地址列表名称 |
| **dst-address-list** (*string*；默认值： ) | 目标地址列表。如果已指定 **dst-host**，则忽略。 |
| **dst-host** (*string*；默认值： ) | 目标 Web 服务器的域名。指定此参数后，会将动态条目添加到围墙花园 |
| **dst-port** (*integer*；默认值： ) | 客户端发送请求到的 TCP 端口号 |
| **protocol** (*integer \| string*；默认值： ) | IP 协议 |

## IP 绑定 {#ip-binding}

**子菜单：** `/ip/hotspot/ip-binding`

IP 绑定 HotSpot 菜单允许设置静态一对一 NAT 转换，允许特定 HotSpot 客户端无需任何身份验证即可绕过，还允许阻止特定主机和子网访问 HotSpot 网络

| 属性 | 描述 |
| :-- | :-- |
| **address** (*IP Range*; 默认值: **""**) | 客户端的原始 IP 地址 |
| **mac-address** (*MAC*; 默认值: **""**) | 客户端的 MAC 地址 |
| **server** (*string \| all*; 默认值: **"all"**) | HotSpot 服务器名称。<ul><li><strong>all</strong> - 将应用于所有 HotSpot 服务器</li></ul> |
| **to-address** (*IP*; 默认值: **""**) | 客户端的新 IP 地址，转换在路由器上进行（客户端对转换一无所知） |
| **type** (*blocked \| bypassed \| regular*; 默认值: **""**) | IP 绑定操作的类型<ul><li><strong>regular</strong> - 根据规则执行一对一 NAT，将 <strong>address</strong> 转换为 <strong>to-address</strong></li><li><strong>bypassed</strong> - 执行转换，但使客户端免于登录 HotSpot</li><li><strong>blocked</strong> - 不执行转换，并且来自主机的数据包被丢弃</li></ul> |

## Cookies {#cookies}

该菜单包含发送给 HotSpot 客户端的所有 cookie，这些客户端通过 cookie 方法授权。所有条目均为只读。

**子菜单：** `/ip/hotspot/cookie`

| 属性 | 描述 |
| :-- | :-- |
| **domain** (*string*) | 域名（如果从用户名中分离） |
| **expires-in** (*time*) | cookie 的有效期 |
| **mac-address** (*MAC*) | 客户端的 MAC 地址 |
| **user** (*string*) | HotSpot 用户名 |

## MAC Cookie {#mac-cookie}

MAC cookie 是一项 HotSpot 功能，旨在改善智能手机、笔记本电脑和其他移动设备的可访问性。

当启用 MAC cookie 功能时（在用户配置文件中设置 **login-by**=mac-cookie、**add-mac-cookie**=yes），会执行以下操作：

- **首次成功登录**。如果只有一个具有该 MAC 地址的主机，Mac cookie 会记录该 MAC 地址的用户名和密码。Cookie 超时设置为等于 mac-cookie-timeout 的值。
- **出现新主机**。HotSpot 会检查该 MAC 地址是否存在 mac cookie 记录，并使用记录的用户名和密码登录该主机。如果同一 MAC 地址有多个主机，则不会登录该用户，并且该地址的 MAC cookie 记录会被删除。

当**用户注销**时，mac cookie 会在以下情况下被移除：

- user-request - 用户点击了注销按钮。
- admin-reset - 从 radius 服务器断开连接，或从 HotSpot 活动菜单中移除用户。
- nas-request - 达到流量限制。
- session-timeout。

要调试 mac-cookie 相关问题，需要启用 HotSpot 调试日志，并查找某个主机的 mac-cookie 登录失败的原因。

### 服务器移除 mac cookie 的原因 {#reasons-when-mac-cookie-is-removed-by-server}

- `/ip/hotspot/cookie/remove [number]`。
- Radius 服务器发送 Disconnect-Request。
- 最终用户已通过 HotSpot 状态页面自行注销。
- 最终用户已达到其数据上限（"traffic limit reached"）。
- Session-Timeout。
- 如果 mac-cookie 登录失败。
- 如果服务器检测到主机表中有多个具有相同 mac-address 的条目。

### HotSpot API JSON 的属性（RFC 7710） {#properties-of-the-hotspot-api-json-rfc-7710}

基于文档中提供的 `api.json` 模板，以下是用于向客户端设备传达强制门户状态的每个属性的说明：

- **captive**：一个布尔值（`true` 或 `false`），用于告知客户端设备当前是否受强制门户限制。如果用户已通过身份验证，则返回 `false`。
- **user-portal-url**：用户可访问登录页面或管理其当前会话的特定 URL。在 MikroTik RouterOS 中，此值由 `$(link-login-only)` 变量动态填充。
- **seconds-remaining**：（可选）一个整数，表示当前会话到期前剩余的秒数。仅在配置了会话超时时包含此值。
- **bytes-remaining**：（可选）一个整数，表示用户可用的剩余数据配额（以字节为单位）。仅当对 HotSpot 用户应用了数据限制时才包含此值。
- **can-extend-session**：一个布尔值，指示用户是否能够延长其当前会话，或通过门户购买/请求更多时间/数据。

## 在 HotSpot 服务器上使用 mangle 进行负载均衡 {#load-balancing-with-mangle-on-hotspot-server}

在多上行链路 HotSpot 设置中（例如 [PCC](../../high-availability-solutions/load-balancing/per-connection-classifier.md)，默认路由通常可能无法按预期工作，因为路由器会优先处理 mangle 规则，而不是本地目标检查。

要解决此问题，请确保发往 HotSpot 服务器的流量在评估 **mangle** 链之前通过 **local** 表路由。你可以通过以下方式实现：

1. 调整 "`/routing/settings"`（[路由表查找](../../user-guides/routing-and-networking-protocols/routing-decision.md#routing-table-lookup)。
2. 或者，添加特定的 "`/routing/rule"` 条目，以强制 HotSpot 服务器的流量首先使用 **local** 表（包括用于检测 HotSpot 服务器的 HTTP 80 流量）。
