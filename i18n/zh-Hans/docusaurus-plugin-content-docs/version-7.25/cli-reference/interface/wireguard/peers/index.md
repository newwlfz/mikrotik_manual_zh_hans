---
sidebar_key: "cli-reference/interface/wireguard/peers/index"
sidebar_position: 1
title: "peers"
sidebar_label: 'peers'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/wireguard/peers
captured_at: '2026-11-01T21:23:20+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/wireguard/peers {#interfacewireguardpeers}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">项目是否被禁用。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">该对端是否为动态创建。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">该对端所属的 WireGuard 接口的名称。</ArgTableRow>
<ArgTableRow arg="name" typ="string">为对端添加名称，用作 WireGuard 日志中的引用。自 RouterOS 7.15 版本起可用。</ArgTableRow>
<ArgTableRow arg="public-key" typ="string">从私钥计算得出的 base64 公钥。对端使用公钥相互认证。</ArgTableRow>
<ArgTableRow arg="private-key" typ="alt { private-key: num
, private-key: string
 }">base64 私钥。`auto` 会自动生成密钥，`none` 会禁用它。</ArgTableRow>
<ArgTableRow arg="endpoint-address" typ="address (flags=46D)">WireGuard 用于在两个对端之间建立安全连接的 IP 地址或主机名。</ArgTableRow>
<ArgTableRow arg="endpoint-port" typ="num">WireGuard 对端用于监听传入流量的 UDP 端口。</ArgTableRow>
<ArgTableRow arg="allowed-address" typ="multi { allowed-address: address (flags=46/)
 }" mandatory="1">带有 CIDR 掩码的 IP（v4 或 v6）地址列表，允许来自这些地址的传入流量发往该对端，并且该对端的传出流量会发往这些地址。Allowed-address 范围不能在同一接口上重叠。</ArgTableRow>
<ArgTableRow arg="preshared-key" typ="alt { preshared-key: num
, preshared-key: string
 }">base64 预共享密钥。增加一层对称密钥加密，以提供抗后量子能力。`auto` 会自动生成密钥。</ArgTableRow>
<ArgTableRow arg="persistent-keepalive" typ="time">以秒为单位的间隔，表示向对端发送经过身份验证的空数据包的频率，以保持有状态防火墙或 NAT 映射有效。值为 0 会禁用 keepalive。</ArgTableRow>
<ArgTableRow arg="client-address" typ="multi { client-address: address (flags=46/)
 }">当客户端通过二维码导入时，会在该设备上设置此 WireGuard 接口的地址。</ArgTableRow>
<ArgTableRow arg="client-dns" typ="multi { client-dns: address (flags=46D)
 }">生成的客户端配置中包含的 DNS 服务器。这不会更改此路由器上的 DNS 配置。</ArgTableRow>
<ArgTableRow arg="client-endpoint" typ="address (flags=46D)">生成的客户端配置中作为 endpoint 包含的 IP 地址或主机名。WireGuard 接口的监听端口会附加到其后。</ArgTableRow>
<ArgTableRow arg="client-keepalive" typ="time">与 persistent-keepalive 相同，但从对端一侧使用。</ArgTableRow>
<ArgTableRow arg="client-listen-port" typ="num">WireGuard 隧道用于监听来自对端的传入流量并从中发出传出数据包的本地端口。</ArgTableRow>
<ArgTableRow arg="client-allowed-address" typ="multi { client-allowed-address: address (flags=46/)
 }">为客户端配置的允许 IP。自 RouterOS 7.21 版本起可用。</ArgTableRow>
<ArgTableRow arg="client-mtu" typ="num">导入配置时在客户端上设置的 MTU 值。</ArgTableRow>
<ArgTableRow arg="responder" typ="bool">指定该对端是连接发起方还是仅作为响应方。在充当客户端设备服务器的 WireGuard 设备上使用。否则，路由器会反复尝试连接到 endpoint-address 或 current-endpoint-address。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="current-endpoint-address" typ="address (flags=46)">来自该对端的、经过正确身份验证的数据包的最新源 IP 地址。</ArgTableRow>
<ArgTableRow arg="current-endpoint-port" typ="num">来自该对端的、经过正确身份验证的数据包的最新源 IP 端口。</ArgTableRow>
<ArgTableRow arg="rx" typ="num">从该对端接收的总字节数。</ArgTableRow>
<ArgTableRow arg="tx" typ="num">传输到该对端的总字节数。</ArgTableRow>
<ArgTableRow arg="last-handshake" typ="time">自上次成功握手后经过的时间（秒）。</ArgTableRow>
</ArgTable>
