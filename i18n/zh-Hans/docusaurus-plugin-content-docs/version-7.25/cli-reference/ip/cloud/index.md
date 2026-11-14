---
sidebar_key: "cli-reference/ip/cloud/index"
sidebar_position: 5
title: "cloud"
sidebar_label: 'cloud'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/cloud
captured_at: '2026-11-01T21:23:47+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/cloud {#ipcloud}
**类型：** 设置目录

MikroTik 云服务的设置：DDNS 名称、启动时的时间更新以及 Back To Home（远程回家）。路由器通过 UDP 端口 15252 向 `cloud2.mikrotik.com` 发送请求。有关概述和示例，请参见 [云](../../../network-management/cloud/index.md) 和 [Back To Home](../../../network-management/cloud/back-to-home.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="ddns-enabled" typ="enum (auto | yes)">
路由器是否在云服务器上注册 DNS 名称（`dns-name`），并使其始终指向路由器的公网地址。
- `auto`（默认）- 仅在启用 Back To Home（`back-to-home-vpn=enabled`）时 DDNS 才开启。当 DDNS 关闭时，路由器请求云服务器删除该名称，该名称会在几分钟内停止解析。
- `yes` - DDNS 始终开启。在 NAT 之后，路由器每分钟发送一次更新。
</ArgTableRow>
<ArgTableRow arg="ddns-update-interval" typ="alt { ddns-update-interval: enum (none) { none:0 }
, ddns-update-interval: time [1m .. ]
 }">路由器向云服务器发送 DDNS 更新的间隔，此外还有路由器自行决定发送的更新。使用 `none` 时，路由器只发送自己的更新；在 NAT 之后，即每分钟一次。最小值：1 分钟。默认值：none。</ArgTableRow>
<ArgTableRow arg="update-time" typ="bool">路由器启动时是否从云服务器设置其时钟。仅在 NTP 客户端（`/system/ntp/client`）被禁用时才会这样做，在 `ddns-enabled=auto` 时也是如此，并会记录 `cloud change time <old> => <new>`。DDNS 更新和 `force-update` 不会设置时钟。时区由 `/system/clock` 中的 `time-zone-autodetect` 单独设置。默认值：yes.</ArgTableRow>
<ArgTableRow arg="back-to-home-vpn" typ="enum (revoked-and-disabled | enabled)" syscap="cloud-vpn">
是否运行 Back To Home。
- `revoked-and-disabled`（默认）- Back To Home 已关闭。设置此项会删除 `back-to-home-vpn` 接口及其对等体、地址和动态防火墙规则，以及 [`back-to-home-user`](./back-to-home-user/index.md) 中的所有用户，并请求云服务器删除 `vpn-dns-name`。再次启用 Back To Home 会创建新的密钥和新端口，因此每个客户端都需要新的配置。
- `enabled` - 创建 WireGuard 接口 `back-to-home-vpn`，地址为 192.168.216.1/24 和 fc00:0:0:216::1/64，添加动态防火墙和 NAT 规则，注册 `vpn-dns-name`，并在无法直接访问路由器时连接到中继。使用 `ddns-enabled=auto` 时，DDNS 也会开启。
</ArgTableRow>
<ArgTableRow arg="vpn-prefer-relay-code" typ="string" syscap="cloud-vpn">要使用的中继区域代码，来自 `vpn-relay-regions`，例如 `EUR1`。当它为空时，路由器使用往返时间最低的中继（`vpn-relay-rtts`）。默认值：空。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="public-address" typ="ipAddr">云服务器所看到的路由器公网 IPv4 地址，即路由器请求的源地址。在 NAT 之后，这是 NAT 设备的地址。在云服务器首次回复后显示，即使只进行时间更新时也会显示。</ArgTableRow>
<ArgTableRow arg="public-address-ipv6" typ="ip6Addr">云服务器所看到的路由器公网 IPv6 地址。当路由器通过 IPv6 访问云服务器时显示。</ArgTableRow>
<ArgTableRow arg="dns-name" typ="string">路由器的 DNS 名称：其序列号的小写形式后接 `.sn.mynetname.net`。在名称注册后显示。它解析为 `public-address`，或在 [`advanced`](./advanced.md) 中设置 `use-local-address=yes` 时解析为路由器的本地地址，TTL 为 60 秒。</ArgTableRow>
<ArgTableRow arg="status" typ="string">
对云服务器最后一次请求的状态，例如：
- `updating...` - 路由器已发送请求并正在等待回复。若无回复，它会以逐渐增大的间隔持续重试。
- `updated` - 云服务器已确认最后一次请求。
- `failed to connect` - 云服务器没有应答。
</ArgTableRow>
<ArgTableRow arg="vpn-dns-name" typ="string" syscap="cloud-vpn">Back To Home 端点的 DNS 名称：序列号的小写形式后接 `.vpn.mynetname.net`。它解析为路由器的公网地址，或在无法直接访问路由器时解析为路由器所使用的中继。客户端配置将其用作端点。</ArgTableRow>
<ArgTableRow arg="vpn-port" typ="num" syscap="cloud-vpn">`back-to-home-vpn` WireGuard 接口的 UDP 端口。由路由器在启用 Back To Home 时选取。</ArgTableRow>
<ArgTableRow arg="vpn-status" typ="string" syscap="cloud-vpn">Back To Home 的状态，例如 `running`。</ArgTableRow>
<ArgTableRow arg="vpn-relay-rtts" typ="multi { code: string
 }" syscap="cloud-vpn">通过 IPv4 和 IPv6 到每个中继区域的往返时间，例如 `EUR1(ip4: 0.976ms, ip6: timeout)`。</ArgTableRow>
<ArgTableRow arg="vpn-relay-ipv4-status" typ="string" syscap="cloud-vpn">客户端通过 IPv4 访问路由器的方式：当客户端能连接到路由器的公网地址时为 `reachable directly (region: EUR1 ip: <relay address> rtt: 0.761ms)`，当客户端通过中继连接时为 `reachable via relay (region: EUR1 ...)`。</ArgTableRow>
<ArgTableRow arg="vpn-relay-ipv6-status" typ="string" syscap="cloud-vpn">客户端通过 IPv6 访问路由器的方式，格式与 `vpn-relay-ipv4-status` 相同，例如路由器没有 IPv6 互联网访问时的 `connecting (...)`。</ArgTableRow>
<ArgTableRow arg="vpn-relay-regions" typ="multi { code: string
 }" syscap="cloud-vpn">路由器可以使用的中继区域，例如 `EUR1` 和 `USA1`。在 `vpn-prefer-relay-code` 中使用此列表中的代码。</ArgTableRow>
<ArgTableRow arg="vpn-relay-addresses" typ="multi { address: ipAddr
 }" syscap="cloud-vpn">中继服务器的 IPv4 地址，每个区域一个。</ArgTableRow>
<ArgTableRow arg="vpn-relay-addresses-ipv6" typ="multi { address: ip6Addr
 }" syscap="cloud-vpn">中继服务器的 IPv6 地址，每个区域一个。</ArgTableRow>
<ArgTableRow arg="vpn-private-key" typ="string" syscap="cloud-vpn">`back-to-home-vpn` WireGuard 接口的私钥。</ArgTableRow>
<ArgTableRow arg="vpn-public-key" typ="string" syscap="cloud-vpn">`back-to-home-vpn` WireGuard 接口的公钥。客户端配置将其用作路由器对等体的密钥。</ArgTableRow>
<ArgTableRow arg="vpn-peer-private-key" typ="string" syscap="cloud-vpn">`vpn-wireguard-client-config` 中内置客户端配置的私钥。</ArgTableRow>
<ArgTableRow arg="vpn-peer-public-key" typ="string" syscap="cloud-vpn">内置客户端配置的公钥。路由器在 `back-to-home-vpn` 上有一个使用此密钥的动态对等体。</ArgTableRow>
<ArgTableRow arg="vpn-interface" typ="iface_enum" syscap="cloud-vpn">Back To Home 的 WireGuard 接口，即 `back-to-home-vpn`。</ArgTableRow>
<ArgTableRow arg="vpn-wireguard-client-config" typ="string" syscap="cloud-vpn">内置客户端的 WireGuard 配置，包含地址 192.168.216.2 和 fc00:0:0:216::2 以及路由器使用的 DNS 服务器。在一台设备上的 WireGuard 应用中导入它。若要更多设备，请在 [`back-to-home-user`](./back-to-home-user/index.md) 中添加用户。</ArgTableRow>
<ArgTableRow arg="vpn-wireguard-client-config-qrcode" typ="pic" syscap="cloud-vpn">以二维码形式表示的 `vpn-wireguard-client-config`，用于手机上的 WireGuard 应用。</ArgTableRow>
<ArgTableRow arg="warning" typ="string">关于路由器设置的警告，例如 `Router is behind a NAT. Remote connection might not work.` 仅在存在警告时显示。</ArgTableRow>
</ArgTable>
