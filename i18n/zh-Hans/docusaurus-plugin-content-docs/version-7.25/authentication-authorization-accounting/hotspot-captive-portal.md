---
title: "HotSpot - 强制门户"
description: "MikroTik HotSpot Gateway 可通过 DHCP 地址池、多种身份验证方法和 walled-garden 访问等功能，为公共网络启用客户端身份验证。它需要 IPv4，并且存在特定路由限制，文档中提供了配置示例以供设置。"
tags:
  - 'hotspot'
  - 'firewall'
  - 'dhcp'
source: https://manual.mikrotik.com/docs/7.25/authentication-authorization-accounting/hotspot-captive-portal
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

MikroTik HotSpot Gateway 在客户端访问公共网络之前对其进行认证。

:::warning
HotSpot（captive portal）使用 web-proxy，目前只能使用默认路由表，因此 PCC（per connection-classifier）不是有效方法，因为该方法使用多个路由表。
:::

:::warning
HotSpot 功能可能被 device-mode 阻止。在配置 HotSpot 之前，请确认其已在 `/system/device-mode` 中启用（[更多信息](/docs/system-information-and-utilities/device-mode)。
:::

### HotSpot 属性 {#hotspot-properties}

| 属性 | 说明 |
| :--- | :--- |
| **name** | HotSpot 服务器实例的描述性名称。 |
| **interface** | HotSpot 服务监听客户端请求的特定本地接口（物理或虚拟）。 |
| **address-pool** | HotSpot 客户端通过 DHCP 获取 IP 地址的 IP 地址池。 |
| **profile** | 对 HotSpot Server Profile 的引用，其中包含登录方法和 HTML 目录等通用设置。 |
| **idle-timeout** | 未检测到流量时，客户端在指定不活动时长后自动退出登录。 |
| **keepalive-timeout** | 用于检查客户端是否仍可访问的时间间隔；如果客户端未响应，则终止会话。 |
| **login-timeout** | 显示登录页面后，客户端完成认证过程所允许的最长时间。 |
| **addresses-per-mac** | 限制与单个 MAC 地址关联的 IP 地址数量。 |
| **proxy-status** | 指示 HotSpot 系统使用的内部 web-proxy 的当前运行状态。 |

### HotSpot Gateway 功能 {#hotspot-gateway-features}

- 使用路由器上的本地客户端数据库或远程 RADIUS 服务器对客户端进行多种认证。
- 在路由器上的本地数据库或远程 RADIUS 服务器中进行用户计费。
- walled-garden 系统，无需授权即可访问部分网页。
- 可修改登录页面，在其中放置公司信息。
- 自动且透明地将客户端的任何 IP 地址转换为有效地址。
- HotSpot 可以通知 DHCP 客户端其位于 captive portal 之后（RFC7710）。

HotSpot 只有在使用 IPv4 时才能可靠工作。HotSpot 依赖 Firewall NAT 规则，而目前不支持 IPv6。

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

| 参数 | 说明 |
| :-- | :-- |
| **hotspot interface**（*string*；默认：**allow**） | 运行 HotSpot 的接口名称。若要在网桥接口上运行 HotSpot，请确保公共接口未包含在网桥端口中。 |
| **local address of network**（*IP*；默认：**10.5.50.1/24**） | HotSpot 网关地址 |
| **masquerade network**（*yes \| no*；默认：**yes**） | 是否对 HotSpot 网络执行 masquerade。当为 **yes** 时，会向 *`/ip/firewall/nat`* 添加一条 *action=masquerade* 规则 |
| **address pool of network**（*string*；默认：**yes**） | HotSpot 网络的地址池，用于将用户 IP 地址更改为有效地址。适用于为不愿更改网络设置的移动客户端提供网络访问。 |
| **select certificate**（*none \| import-other-certificate*；默认：） | 当需要 HTTPS 授权方式时，选择 SSL 证书。 |
| **ip address of smtp server**（*IP*；默认：**0.0.0.0**） | SMTP 服务器的 IP 地址，HotSpot 网络的 SMTP 请求（TCP 端口 25）将重定向到该地址 |
| **dns servers**（*IP*；默认：**0.0.0.0**） | 供 HotSpot 客户端使用的 DNS 服务器地址，配置取自 HotSpot 网关的 *`/ip/dns`* 菜单 |
| **dns name**（*string*；默认：**""**） | HotSpot 服务器的域名，需要使用完全限定域名，例如 [www.example.com](http://www.example.com) |
| **name of local hotspot user**（*string*；默认：**"admin"**） | 自动创建的 HotSpot 用户的用户名，添加到 *`/ip/hotspot/user`* |
| **password for the user**（*string*；默认：） | 自动创建的 HotSpot 用户的密码 |

## HotSpot

**子菜单：** `/ip/hotspot`

该菜单用于管理路由器的 HotSpot 服务器。可以在 Ethernet、无线、VLAN 和网桥接口上运行 HotSpot。每个接口只允许运行一个 HotSpot 服务器。在网桥接口上配置 HotSpot 时，应将 HotSpot 接口设置为该网桥接口，而不是网桥端口，并且不要将公共接口添加到网桥端口。可以在 *`/ip/hotspot`* 菜单中手动添加 HotSpot 服务器，但建议运行 *`/ip/hotspot/setup`*，它会添加所有必要设置。

| 参数 | 说明 |
| :-- | :-- |
| **name**（text） | HotSpot 服务器的名称或标识符 |
| **address-pool**（name/none；默认：*none*） | 用于将任意 HotSpot 客户端 IP 地址更改为有效地址的地址空间。适用于为不愿更改网络设置的移动客户端提供公共网络访问 |
| **idle-timeout**（time/none；默认：*5m*） | 未授权客户端的无活动时间。当该客户端没有流量时（即客户端计算机应已关闭），达到超时后，用户将从 HotSpot 主机列表中移除，其使用的地址将变为可用 |
| **keepalive-timeout**（time/none；默认：*none*） | 主机保持不可达状态多长时间后从 HotSpot 中移除的值 |
| **login-timeout**（time/none；默认：*none*） | 主机未在系统中完成授权后，主机条目从主机表中删除的时间段。该循环会重复，直到主机登录系统。当主机因在主机表中未授权停留过长时间而无法登录时，请启用该选项。 |
| **interface**（接口名称） | 运行 HotSpot 的接口 |
| **addresses-per-mac**（integer**/**unlimited；默认：2） | 当一个 MAC 地址连接多个 HotSpot 客户端时，允许与该 MAC 地址绑定的 IP 地址数量 |
| **profile**（name；默认：***default*）** | HotSpot 服务器的默认 HotSpot profile，位于 *`/ip/hotspot/profile`* |

## Read-only

| 参数 | 说明 |
| :-- | :-- |
| keepalive-timeout（只读；time） | 应用于用户的 keepalive-timeout 精确值。该值表示主机保持不可达状态多长时间后从 HotSpot 中移除 |

## HotSpot 配置文件 {#hotspot-profile}

此子菜单包含 HotSpot 服务器配置文件列表。同一网关机器上可以存在多个不同的 HotSpot 系统，定义为 Server Profiles。一个或多个接口可以归入同一个服务器配置文件。特定接口上的服务器设置项很少，大部分配置都在服务器配置文件中完成。例如，可以为每个服务器配置文件设置完全不同的 servlet 页面，并定义不同的 RADIUS 服务器用于认证。

| 属性 | 说明 |
| :-- | :-- |
| **dns-name** (*string*; Default: **""**) | HotSpot 服务器的 DNS 名称。该 DNS 名称用作 HotSpot 服务器名称（即，它显示为登录页面的位置）。此名称将自动作为静态 DNS 条目添加到 DNS 缓存中。 |
| **hotspot-address** (*IP*; Default: **0.0.0.0**) | HotSpot 服务的 IP 地址。 |
| **html-directory** (*string*; Default: **hotspot**) | 存储 HotSpot HTML 页面的目录名称（默认目录为 *hotspot*）。可以指定包含修改后 HTML 页面的其他目录。要更改 HotSpot 登录页面，请从路由器获取 HotSpot 文件，修改后再上传回相同位置。必须在 html-directory 字段中输入完整路径，包括 "/flash/(hotspot\_dir)" |
| **html-directory-override** (*string*; Default: **none**) | HotSpot HTML 文件的备用路径。仅当自定义 HotSpot HTML 文件存储在外部存储上时使用。 |
| **http-cookie-lifetime** (*time*; Default: **3d**) | HTTP cookie 有效期，该选项与 *cookie* HotSpot 登录方法相关 |
| **http-proxy** (*IP:Port*; Default: **0.0.0.0:0**) | HotSpot 服务代理服务器的地址和端口，使用默认值时，所有请求均由本地 `/ip/proxy` 解析 |
| **https-redirect** (*yes \| no*; Default: **yes**) | 当用户访问 https:// url 时，是否将未认证用户重定向到 HotSpot 登录页面。由于证书域名不匹配，这通常会导致错误，因此可以将此参数设置为“no”，所有 https 请求都将被直接拒绝，用户必须访问 http 页面。 |
| **login-by** (*cookie\|http-chap\|http-pap\|https\|mac\|trial\|mac-cookie*; Default: **http-chap, cookie**) | 使用的 HotSpot 认证方法<ul><li><strong>mac-cookie</strong> - 启用通过 mac cookie 方法登录</li><li><strong>cookie</strong> - 只能与其他 HTTP 认证方法一起使用。当用户首次在 HotSpot 中认证时会生成 HTTP cookie。在 <em>cookie-lifetime</em> 有效期间，不会要求用户输入登录名/密码，而是自动认证</li><li><strong>http-chap</strong> - 用户在 HotSpot 中认证需要登录名/密码。使用带 MD5 哈希算法的 CHAP 质询-响应方法保护密码。</li><li><strong>http-pap</strong> - 用户在 HotSpot 中认证需要登录名/密码。用户名和密码以明文形式通过网络发送。</li><li><strong>https</strong> - 用户在 HotSpot 中认证需要登录名/密码。客户端和服务器之间的登录名/密码交换通过 SSL 隧道加密。 </li><li><strong>mac</strong> - 客户端无需填写登录表单即可认证。客户端 MAC 地址会添加到 <code>/ip/hotspot/user</code> 数据库中，客户端连接到 HotSpot 后立即完成认证</li><li><strong>trial</strong> - 允许客户端在指定时间内无需 HotSpot 登录即可使用互联网</li></ul> |
| **mac-auth-password** (*string*; Default: ) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 与 MAC 认证一起使用，该字段用于指定通过 MAC 地址认证的用户的密码。当特定 RADIUS 服务器拒绝空密码客户端的认证时，需要此选项 |
| **name** (*string*; Default: ) | 配置文件的描述性名称 |
| **nas-port-type** (*string*; Default: **wireless-802.11**) | 发送到 RADIUS 服务器的 NAS-Port-Type 值，NAS-Port-Type 值在 RADIUS RFC 2865 中描述。此可选值属性指示 HotSpot 服务器物理端口的类型。 |
| **radius-accounting** (*yes \| no*; Default: **yes**) | 使用 yes 时，为每个用户向 RADIUS 服务器发送计费信息 |
| **radius-default-domain** (*string*; Default: ) | 用于 RADIUS 请求的默认域。允许每个 *`/ip/hotspot/profile`* 使用单独的 RADIUS 服务器。如果使用该选项，应在 /radius domain 值下指定相同的域名。 |
| **radius-interim-update** (*time \| received*; Default: **received**) | 发送计费更新的频率。设置为 *received* 时，使用 RADIUS 服务器的 interim-time。**0s** 与 *received* 相同。 |
| **radius-location-name** (*string*; Default: ) | 要发送到 RADIUS 服务器的 RADIUS-Location-Id。用于在与 RADIUS 服务器通信期间标识 HotSpot 服务器的位置。该值为可选项，并与 RADIUS 服务器一起使用。 |
| **radius-mac-format** (*"XX XX XX XX XX XX"\|XX:XX:XX:XX:XX:XX\|XXXXXX-XXXXXX\|XXXXXXXXXXXX\|XX-XX-XX-XX-XX-XX\|XXXX:XXXX:XXXX\|XXXXXX:XXXXXX*; Default: **XX:XX:XX:XX:XX:XX**) | 用于设置 AAA 会话期间发送到 RADIUS 服务器的用户 mac 地址格式。 |
| **rate-limit** (*string*; Default: **""**) | 速率限制格式为 **rx-rate[/tx-rate] [rx-burst-rate[/tx-burst-rate] [rx-burst-threshold[/tx-burst-threshold] [rx-burst-time[/tx-burst-time]]]] [priority] [rx-rate-min[/tx-rate-min]]**，从路由器的角度来看（因此“rx”是客户端上传，“tx”是客户端下载）。所有速率都应为数字，并可带可选的 'k'（1,000s）或 'M'（1,000,000s）。如果未指定 tx-rate，则 rx-rate 也用作 tx-rate。tx-burst-rate、tx-burst-threshold 和 tx-burst-time 也是如此。如果未指定 rx-burst-threshold 和 tx-burst-threshold（但指定了 burst-rate），则使用 rx-rate 和 tx-rate 作为突发阈值。如果未指定 rx-burst-time 和 tx-burst-time，则默认使用 1s。rx-rate-min 和 tx-rate min 是 limit-at 属性的值 |
| **smtp-server** (*IP*; Default: **0.0.0.0**) | 用于重定向 HotSpot 用户 SMTP 请求的 SMTP 服务器地址。 |
| **split-user-domain** (*yes \| no*; Default: **no**) | 当 RADIUS 服务器以“user@domain”或“domain\user”格式提供用户名时，将用户名与域名拆分 |
| **ssl-certificate** (*string \| none*; Default: **none**) | 路由器上仅用于 HTTPS 认证的 SSL 证书名称。 |
| **trial-uptime** (*time/time*; Default: **30m/1d**) | 仅与 *trial* 认证方法一起使用。第一个时间值指定由 MAC 地址标识的试用用户无需 HotSpot 认证即可访问公共网络的时间。第二个时间值指定用户再次获准使用试用之前必须经过的时间。 |
| **trial-user-profile** (*string*; Default: **default**) | 为试用用户指定 **HotSpot 用户配置文件**。 |
| **use-radius** (*yes \| no*; Default: **no**) | 使用 RADIUS 认证 HotSpot 用户。 |

## HotSpot 用户配置文件 {#hotspot-user-profiles}

**子菜单：** `/ip/hotspot/user/profile`

用户配置文件菜单用于通用 HotSpot 客户端设置。配置文件类似于具有相同设置集、rate-limit、过滤链名称等的用户组。

| 属性 | 说明 |
| :-- | :-- |
| **add-mac-cookie** (*yes\|no*；默认：**yes**) | 允许用户添加 mac cookie。 |
| **address-list** (*string*；默认：) | 用户的 IP 地址将被添加到的地址列表名称。用于按用户组标记流量，以便配置队列树。 |
| **address-pool** (*string \|none*；默认：**none**) | 用户获取 IP 的 IP 地址池名称。当用户在计算机上配置了不正确的网络设置时，HotSpot 服务器会进行转换，并从地址池中分配正确的 IP 地址，而不是错误的地址 |
| **advertise** (*yes \| no*；默认：**no**) | 启用强制广告弹窗。经过特定时间间隔后，会向 HotSpot 用户显示特定网页。广告页面可能会被浏览器弹窗拦截程序阻止。 |
| **advertise-interval** (*time[,time[,..]]*；默认：**30m,10m**) | 广告弹窗之间的时间间隔集合。列表完成后，所有后续广告均使用最后一个值，10 分钟 |
| **advertise-timeout** (*time \| immediately \| never*；默认：**1m**) | 在阻止 HotSpot 客户端访问网络之前，广告显示的时长。广告未显示时，不允许连接 Internet。 |
| **advertise-url** (*string[,string[,..]]*；默认：) | 用于广告弹窗显示的 URL 列表。使用最后一个 URL 后，列表会从头开始。 |
| **idle-timeout** (*time \| none*；默认：**none**) | 已授权 HotSpot 客户端的最长不活动时间。当没有来自该客户端并经过路由器的数据包时，计时器开始计数，例如计算机已关闭。达到超时后，用户将被注销，从主机列表中移除，并释放该用户使用的地址。 |
| **incoming-filter** (*string*；默认：) | 应用于此配置文件用户传入数据包的防火墙链名称。需要从内置链（input、forward、output）到 chain=hotspot 的跳转规则 |
| **incoming-packet-mark** (*string*；默认：) | 对此配置文件中每个用户的传入数据包设置的 packet mark |
| **keepalive-timeout** (*time \| none*；默认：) | 已授权 HotSpot 客户端的 Keepalive 超时。用于检测客户端计算机是否存活且可访问。达到超时值后，用户将被注销 |
| **mac-cookie-timeout** (*time*；默认：**3d**) | 从上次登录或注销开始计算 mac-cookie 超时。 |
| **name** (*string*；默认：) | 配置文件的描述性名称 |
| **on-login** (*string*；默认：**""**) | 用户从特定配置文件登录 HotSpot 时执行的脚本名称。可以从内部 <strong>user</strong> 和 <strong>interface</strong> 变量获取用户名。例如，<em>:log info "User $user logged in!"</em>。如果 HotSpot 设置在网桥接口上，则 <strong>interface</strong> 变量会将网桥显示为实际接口，除非在网桥设置中设置了 <strong>use-ip-firewall</strong>。可用变量列表：<br/><ul><li>$user</li><li>$username（$user 的替代变量名）</li><li>$address</li><li>$"mac-address"</li><li>$interface</li></ul> |
| **on-logout** (*string*；默认：**""**) | 用户从 HotSpot 注销时执行的脚本名称。可以从内部 <strong>user</strong> 和 <strong>interface</strong> 变量获取用户名。例如，<em>:log info "User $user logged in!"</em> 。如果 HotSpot 设置在网桥接口上，则 <strong>interface</strong> 变量会将网桥显示为实际接口，除非在网桥设置中设置了 <strong>use-ip-firewall</strong>。可用变量列表：<br/><ul><li>$user</li><li>$username（$user 的替代变量名）</li><li>$address</li><li>$"mac-address"</li><li>$interface</li><li>$cause</li></ul> 从 v6.34rc11 开始，提供一些额外变量：<br/><ul><li>$uptime-secs - 最终会话时长，单位为秒</li><li>$bytes-in - 上传的字节数</li><li>$bytes-out - 下载的字节数</li><li>$bytes-total - 上传字节数 + 下载字节数</li><li>$packets-in - 上传的数据包数</li><li>$packets-out - 下载的数据包数</li><li>$packets-total - 上传数据包数 + 下载数据包数</li></ul> |
| **open-status-page** (*always \| http-login*；默认：**always**) | 为使用 mac 登录方式认证的用户显示状态页面的选项。例如，在状态页面上显示广告（alogin.html）<ul><li><strong>http-login</strong> - 仅为 HTTP 登录打开状态页面（包括 cookie 和 HTTPS）</li><li><strong>always</strong> - mac 登录时也打开 HTTP 状态页面</li></ul> |
| **outgoing-filter** (*string*；默认：) | 应用于此配置文件用户传出数据包的防火墙链名称。需要从内置链（input、forward、output）到 chain=hotspot 的跳转规则 |
| **outgoing-packet-mark** (*string*；默认：) | 对此配置文件中每个用户的传出数据包设置的 packet mark |
| **rate-limit** (*string*；默认：**""**) | 用户登录 HotSpot 后，会为该用户创建一个简单的动态队列。速率限制按以下形式配置：**[rx-rate[/tx-rate] [rx-burst-rate[/tx-burst-rate] [rx-burst-threshold[/tx-burst-threshold] [rx-burst-time[/tx-burst-time] [priority] [rx-rate-min[/tx-rate-min]]]]**。例如，要为客户端设置 1M 下载、512k 上传，使用 rate-limit=512k/1M |
| **session-timeout** (*time*；默认：**0s**) | 客户端允许的会话时长。超过此时间后，用户将被无条件注销 |
| **shared-users** (*integer*；默认：**1**) | 使用相同 HotSpot 用户名同时登录的允许用户数 |
| **status-autorefresh** (*time \| none*；默认：**none**) | HotSpot 状态页面自动刷新间隔 |
| **transparent-proxy** (*yes \|*；默认：**yes**) | 为此配置文件的已授权用户使用透明 HTTP 代理 |

## HotSpot 用户 {#hotspot-users}

这是实际添加客户端用户/密码信息的菜单。HotSpot 用户的其他配置选项也在此处配置。

| Property | Description |
| :-- | :-- |
| **address** (*IP*; Default: **0.0.0.0**) | IP 地址。指定后，客户端将从 HotSpot 一对一 NAT 转换中获取该地址。该地址不会将 HotSpot 登录限制为仅来自此地址 |
| **comment** (*string*; Default: ) | HotSpot 用户的描述信息。脚本可使用该信息更改特定客户端的参数 |
| **email** (*string*; Default: ) | HotSpot 客户端的电子邮件，作为 HotSpot 用户的信息值 |
| **limit-bytes-in** (*integer*; Default: **0**) | 可从用户接收的最大字节数。达到限制后，用户将与 HotSpot 断开连接。 |
| **limit-bytes-out** (*integer*; Default: **0**) | 可向用户发送的最大字节数。达到限制后，用户将与 HotSpot 断开连接。 |
| **limit-bytes-total** (*integer*; Default: **0**) | （limit-bytes-in+limit-bytes-out）。达到限制后，用户将与 HotSpot 断开连接。 |
| **limit-uptime** (*time*; Default: **0**) | HotSpot 客户端的在线时长限制。达到在线时长后，用户将立即与 HotSpot 断开连接。 |
| **mac-address** (*MAC*; Default: **00:00:00:00:00:00**) | 仅允许客户端从指定的 MAC 地址登录。如果值为 *00:00:00:00:00:00*，则允许任意 MAC 地址。 |
| **name** (*string*; Default: ) | HotSpot 登录页面的用户名。使用 MAC 地址认证时，该名称配置为客户端的 MAC 地址 |
| **password** (*string*; Default: ) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 用户密码 |
| **profile** (*string*; Default: **default**) | 在 *`/ip/hotspot/user/profile`* 中配置的用户配置文件 |
| **routes** (*string*; Default: ) | 客户端连接时添加到 HotSpot 网关的路由。路由格式为 **dst-address gateway metric**（例如，*192.168.1.0/24 192.168.0.1 1*） |
| **server** (*string \| all*; Default: **all**) | 允许用户登录的 HotSpot 服务器名称 |
| **otp-secret** (*string*; Default: ) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 用于 HotSpot 用户授权的一次性密码令牌。它可用作 HotSpot 用户身份验证的单独“密码”。 |

## 只读属性 {#read-only-properties}

| Property | Description |
| :-- | :-- |
| **bytes-in** (*integer*) | 从客户端接收的数据字节总数。 |
| **bytes-out** (*integer*) | 发送到客户端的数据字节总数。 |
| **packets-in** (*integer*) | 从客户端接收的数据包总数。 |
| **packets-out** (*integer*) | 发送到客户端的数据包总数。 |
| **uptime** (*time*) | 自客户端通过认证以来的当前会话持续时间。 |

## HotSpot 活动连接 {#hotspot-active}

**子菜单：** `/ip/hotspot/active`

HotSpot active 菜单显示所有已在 HotSpot 中通过认证的客户端，该菜单仅用于查看信息（只读）。此处无法更改任何内容，但可以使用 remove 命令注销用户。

| Parameters | Description |
| :-- | :-- |
| **server** (read-only; name) | 客户端登录的 HotSpot 服务器名称 |
| **user** (read-only; name) | HotSpot 用户的名称 |
| **domain** (read-only; text) | 用户的域（如果与用户名分开），该参数仅用于 RADIUS 认证 |
| **address** (read-only; IP address) | HotSpot 用户的 IP 地址 |
| **mac-address** (read-only; MAC-address) | HotSpot 用户的 MAC 地址 |
| **login-by** (read-only; multiple-choice: cookie **/** http-chap **/** http-pap **/** https **/** mac **/** mac-cookie **/** trial) | HotSpot 客户端使用的认证方法 |
| **uptime** (read-only; time) | 用户的当前会话时间，显示用户已登录多长时间 |
| **idle-time** (read-only; time) | 用户处于空闲状态的时间 |
| **session-time-left** (read-only; time) | 应用于用户的 session-time 精确值。该值显示用户允许在线多长时间，达到 **uptime** 后将自动注销 |
| **idle-timeout** (read-only; time) | 用户 idle-timeout 的精确值 |
| **keepalive-timeout** (read-only; time) | 应用于用户的 keepalive-timeout 精确值。该值显示主机可以保持不可达多长时间后从 HotSpot 中移除 |
| **limit-bytes-in** (read-only; integer) | 显示从客户端接收的字节数，当为 HotSpot 用户配置了相应参数时，该选项处于活动状态 |
| **limit-bytes-out** (read-only; integer) | 显示发送到客户端的字节数，当为 HotSpot 用户配置了相应参数时，该选项处于活动状态 |
| **limit-bytes-total** (read-only; integer) | 显示与客户端之间发送/接收的总字节数，当为 HotSpot 用户配置了相应参数时，该选项处于活动状态 |

## HotSpot 主机 {#hotspot-host}

**子菜单：** `/ip/hotspot/host`

主机表列出连接到 HotSpot 服务器的所有计算机。主机表仅用于提供信息，无法更改其中的任何值：

| 参数 | 说明 |
| :-- | :-- |
| **mac-address**（只读；MAC 地址） | HotSpot 用户的 MAC 地址 |
| **address**（只读；IP 地址） | HotSpot 客户端的原始 IP 地址 |
| **to-address**（只读；IP 地址） | HotSpot 分配的新客户端地址，可能与原始 **address** 相同 |
| **server**（只读；名称） | 客户端连接到的 HotSpot 服务器名称 |
| **bridge-port**（只读；名称） | 客户端连接到的 *`/interface/bridge/port`*，如果未在网桥上配置 HotSpot，则该值未知 |
| **uptime**（只读；时间） | 显示用户在线时长（连接到 HotSpot 的时长） |
| **idle-time**（只读；时间） | 用户空闲的时长 |
| **idle-timeout**（只读；时间） | 客户端的 idle-timeout 值（未授权客户端） |
| **keepalive-timeout**（只读；时间） | 未授权客户端的 keepalive-timeout 值 |
| **bytes-in**（只读；整数） | 从未授权客户端接收的字节数 |
| **packet-in**（只读；整数） | 从未授权客户端接收的数据包数 |
| **bytes-out**（只读；整数） | 发送到未授权客户端的字节数 |
| **packet-out**（只读；整数） | 发送到未授权客户端的数据包数 |

## HotSpot 围墙花园 {#hotspot-walled-garden}

Walled garden 是一种系统，允许未经授权使用某些资源，但访问其他资源时需要授权。例如，它可用于提供对 HotSpot 服务提供商的一般信息或计费选项的访问。

该菜单仅管理 HTTP 和 HTTPs 协议的 Walled Garden。其他协议也可以包含在 Walled Garden 中，但需在其他位置配置（在 `/ip/hotspot/walled-garden/ip` 中）。

| 属性 | 说明 |
| :-- | :-- |
| **action**（*allow \| deny*；默认：**allow**） | 数据包匹配规则时执行的操作<ul><li><strong>allow</strong> - 允许未经授权访问网页</li><li><strong>deny</strong> - 访问网页需要授权</li></ul> |
| **server**（*string*；默认：） | 应用规则的 HotSpot 服务器名称。 |
| **src-address**（*IP*；默认：） | 用户的源地址，通常为 HotSpot 客户端的 IP 地址 |
| **method**（*string*；默认：） | 请求的 HTTP 方法 |
| **dst-host**（*string*；默认：） | 目标 Web 服务器的域名 |
| **dst-port**（*integer*；默认：） | 客户端发送请求的 TCP 端口号 |
| **path**（*string*；默认：） | 请求的路径。路径位于 '''http://dst\_host' 之后 |

# 只读属性 {#read-only-properties-1}

| 属性 | 说明 |
| :-- | :-- |
| **dst-address** (*IP*) |  |
| **hits** (*integer*) |  |

通配符属性（dst-host 和 path）匹配完整字符串（即，如果设置为“example”，则不会匹配“[example.com](http://example.com)”）。可用的通配符为 '\*'（匹配任意数量的任意字符）和 '?'（匹配任意一个字符）。此处也接受正则表达式，但如果某个属性应作为正则表达式处理，则应以冒号（':'）开头。为表示给定模式之前不允许出现任何符号，我们在模式开头使用 ^ 符号。为指定给定模式之后不允许出现任何符号，我们在模式末尾使用 $ 符号。

### 示例 {#example-1}

仅允许 walled garden 中的绕过访问到“[www.example.com/test](http://www.example.com/test)”，但不允许访问“[www.example.com/test/test.php](http://www.example.com/test/test.php)”：

```
/ip/hotspot/walled-garden
add dst-host=:^www.example.com path=":/test\$"
```

## HotSpot walled-garden ip

用于绕过其他协议以及不同 src/dst 地址（或 address-lists）的 HotSpot 认证。用于不同服务（Winbox、SSH、Telnet、SIP 等）。

| 属性 | 说明 |
| :-- | :-- |
| **action** (*accept \|drop\|reject*；默认：**allow**) | 数据包匹配规则时执行的操作<ul><li><strong>allow</strong> - 允许未经授权访问已打开的服务</li><li><strong>drop</strong> - 访问该服务需要授权</li><li><strong>reject</strong> - 访问该服务需要授权，访问服务时将生成 ICMP reject 消息 host-unreachable</li></ul> |
| **server** (*string*；默认：) | 应用规则的 HotSpot 服务器名称。 |
| **src-address** (*IP*；默认：) | 用户的源地址，通常为 HotSpot 客户端的 IP 地址 |
| **dst-address** (*IP*；默认：) | 目标 IP 地址，即 WEB-server 的 IP 地址。如果已指定 **dst-host**，则忽略该参数。 |
| **src-address-list** (*string*；默认：) | 源地址列表名称 |
| **dst-address-list** (*string*；默认：) | 目标地址列表。如果已指定 **dst-host**，则忽略该参数。 |
| **dst-host** (*string*；默认：) | 目标 web-server 的域名。指定该参数时，会向 Walled Garden 添加动态条目 |
| **dst-port** (*integer*；默认：) | 客户端发送请求的 TCP 端口号 |
| **protocol** (*integer \| string*；默认：) | IP 协议 |

## IP 绑定 {#ip-binding}

**子菜单：** `/ip/hotspot/ip-binding`

IP-Binding HotSpot 菜单用于设置静态一对一 NAT 转换，允许特定 HotSpot 客户端无需任何认证即可绕过，也允许阻止特定主机和子网访问 HotSpot 网络。

| 属性 | 说明 |
| :-- | :-- |
| **address** (*IP Range*；默认：**""**) | 客户端的原始 IP 地址 |
| **mac-address** (*MAC*；默认：**""**) | 客户端的 MAC 地址 |
| **server** (*string \| all*；默认：**"all"**) | HotSpot 服务器名称。<ul><li><strong>all</strong> - 应用于所有 HotSpot 服务器</li></ul> |
| **to-address** (*IP*；默认：**""**) | 客户端的新 IP 地址，转换在路由器上执行（客户端不知道任何有关转换的信息） |
| **type** (*blocked \| bypassed \| regular*；默认：**""**) | IP-binding 操作的类型<ul><li><strong>regular</strong> - 根据规则执行一对一 NAT，将 <strong>address</strong> 转换为 <strong>to-address</strong></li><li><strong>bypassed</strong> - 执行转换，但排除客户端登录 HotSpot</li><li><strong>blocked</strong> - 不执行转换，并丢弃来自主机的数据包</li></ul> |

## Cookie {#cookies}

该菜单包含通过 cookie 方式授权的 HotSpot 客户端的所有 cookie。所有条目均为只读。

**子菜单：** `/ip/hotspot/cookie`

| 属性 | 描述 |
| :-- | :-- |
| **domain** (*string*) | 域名（如果从用户名中分离） |
| **expires-in** (*time*) | cookie 的有效时长 |
| **mac-address** (*MAC*) | 客户端的 MAC 地址 |
| **user** (*string*) | HotSpot 用户名 |

## MAC Cookie

MAC cookie 是一项 HotSpot 功能，用于提升智能手机、笔记本电脑和其他移动设备的可访问性。

启用 MAC cookie 功能时（在用户配置文件中设置 **login-by**=mac-cookie、**add-mac-cookie**=yes），将执行以下操作：

- **首次成功登录**。如果只有一个主机使用该 MAC 地址，Mac cookie 会记录该 MAC 地址对应的用户名和密码。Cookie 超时时间设置为等于 mac-cookie-timeout 的值。
- **出现新主机**。HotSpot 检查该 MAC 地址是否存在 mac cookie 记录，并使用记录的用户名和密码登录该主机。如果有多个主机使用相同的 MAC 地址，则不会登录该用户，并且会删除该地址的 MAC cookie 记录。

当**用户退出登录**时，在以下情况下会移除 mac cookie：

- user-request - 用户点击了注销按钮。
- admin-reset - 与 radius 服务器断开连接，或者用户从 HotSpot active 菜单中被移除。
- nas-request - 已达到流量限制。
- session-timeout。

要调试 mac-cookies 问题，需要启用 HotSpot 调试日志，并查看某个主机的 mac-cookie 登录失败的原因。

### 服务器移除 mac cookie 的原因 {#reasons-when-mac-cookie-is-removed-by-server}

- `/ip/hotspot/cookie/remove [number]`。
- Radius 服务器发送 Disconnect-Request。
- 最终用户已通过 HotSpot 状态页自行注销。
- 最终用户已达到数据上限（“traffic limit reached”）。
- Session-Timeout。
- 如果 mac-cookie 登录失败。
- 如果服务器检测到 host 表中存在多个具有相同 mac-address 的条目。

### HotSpot API JSON 的属性（RFC 7710） {#properties-of-the-hotspot-api-json-rfc-7710}

基于文档中提供的 `api.json` 模板，以下是用于向客户端设备传达 captive portal 状态的每个属性说明：

- **captive**：一个布尔值（`true` 或 `false`），用于告知客户端设备当前是否受到 captive portal 限制。如果用户已完成认证，则返回 `false`。
- **user-portal-url**：用户可访问登录页面或管理当前会话的具体 URL。在 MikroTik RouterOS 中，该值由 `$(link-login-only)` 变量动态填充。
- **seconds-remaining**：（可选）一个整数，表示当前会话到期前剩余的秒数。仅当配置了会话超时时才会包含该属性。
- **bytes-remaining**：（可选）一个整数，表示用户可用的剩余数据配额，单位为字节。仅当对 HotSpot 用户应用了数据限制时才会包含该属性。
- **can-extend-session**：一个布尔值，指示用户是否能够延长当前会话，或通过门户购买或申请更多时间或数据。

## 在 HotSpot 服务器上使用 mangle 实现负载均衡 {#load-balancing-with-mangle-on-hotspot-server}

在多上行链路 HotSpot 场景中（例如，[PCC](/docs/high-availability-solutions/load-balancing/per-connection-classifier)），默认路由通常可能无法按预期工作，因为路由器会优先处理 mangle 规则，而不是本地目标检查。

要解决此问题，请确保发往 HotSpot 服务器的流量在评估 **mangle** 链之前通过 **local** 表路由。可通过以下方式实现：

1. 调整 "`/routing/settings`" ([Routing table lookup](/docs/user-guides/routing-and-networking-protocols/routing-decision#routing-table-lookup)。
2. 或者，添加特定的 "`/routing/rule`" 条目，强制 HotSpot 服务器的流量优先使用 local 表（包括用于检测 HotSpot 服务器的 HTTP 80 流量）。
