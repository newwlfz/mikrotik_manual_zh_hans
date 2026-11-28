---
title: "DHCPv6 服务器"
description: "RouterOS DHCPv6 服务器可委派 IPv6 前缀（DHCPv6-PD），并向客户端分配 IPv6 地址，支持静态绑定、RADIUS 和按绑定限速。"
tags:
  - 'dhcpv6'
  - 'ipv6'
source: https://manual.mikrotik.com/docs/7.25/network-management/dhcp/dhcpv6-server
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**子菜单：** `/ipv6/dhcp-server`

**标准：** RFC 8415

DHCPv6 服务器委派 IPv6 前缀（DHCPv6-PD），并向客户端分配 IPv6 地址。它通常由向下游路由器分发前缀的路由器使用，例如 ISP 的用户路由器。服务器从 `prefix-pool` 设置的 IPv6 地址池中获取前缀，从 `address-pool` 设置的 IPv6 地址池中获取地址，该地址池的前缀长度必须为 128。绑定也可以是静态的，或由 RADIUS 服务器分配。

每个绑定通过客户端的 DUID 和 IAID 标识。当客户端绑定到某个前缀时，服务器会通过该客户端添加一条指向该前缀的动态路由（`route-distance`），使发往已委派前缀的流量能够到达客户端路由器。

大多数主机只有在网络中的路由器通告设置了 managed 标志时，才会通过 DHCPv6 请求地址，如下面的地址委派示例所示。RouterOS 的 DHCPv6 服务器和客户端使用相同的 DUID。有关 DHCPv6 的工作原理，请参阅 [DHCP 概念](/docs/network-management/dhcp)。

## 配置示例 {#configuration-example}

### 启用 IPv6 前缀委派 {#enabling-ipv6-prefix-delegation}

要启用 IPv6 前缀委派，请先创建 IPv6 池：

```ros
/ipv6/pool/add name=myPool prefix=2001:db8:7501::/60 prefix-length=62
```

使用 `prefix-length=62` 时，客户端会从 /60 池中获得 /62 前缀。

然后添加使用该池的 DHCPv6 服务器：

```ros
/ipv6/dhcp-server/add name=myServer prefix-pool=myPool interface=local
```

要测试服务器，可以使用 RouterOS DHCPv6 客户端（请参阅 [DHCPv6 Client](/docs/network-management/dhcp/dhcpv6-client)），或者如本例所示，在 Linux 主机上使用 wide-dhcpv6 客户端：

1. 安装 wide-dhcpv6-client。
2. 配置 `/etc/wide-dhcpv6/dhcp6c.conf`，请求 eth2 上的前缀并从中为 eth3 编号：

   ```text
   interface eth2{
   send ia-pd 0;
   };

   id-assoc pd {
   prefix-interface eth3{
   sla-id 1;
   sla-len 2;
   };
   };
   ```

3. 运行客户端：

   ```bash
   sudo dhcp6c -d -D -f eth2
   ```

4. 检查 eth3 是否从委派前缀获得了地址：

   ```text
   mrz@bumba:/media/aaa$ ip -6 addr
   ...
   2: eth3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qlen 1000
       inet6 2001:db8:7501:1:200:ff:fe00:0/64 scope global
          valid_lft forever preferred_lft forever
       inet6 fe80::224:1dff:fe17:81f7/64 scope link
          valid_lft forever preferred_lft forever
   ```

服务器显示该绑定。要让此客户端每次都获得相同前缀，请将该绑定设为静态：

```ros
[admin@MikroTik] > /ipv6/dhcp-server/binding/print
Flags: D - DYNAMIC
Columns: ADDRESS, DUID, SERVER, STATUS
#   ADDRESS             DUID                    SERVER    STATUS
0 D 2001:db8:7501::/62  0x0003000100241d1781f7  myServer  bound
[admin@MikroTik] > /ipv6/dhcp-server/binding/make-static 0
```

服务器还会添加一条通过客户端链路本地地址指向委派前缀的路由：

```ros
[admin@MikroTik] > /ipv6/route/print where dst-address=2001:db8:7501::/62
Flags: D - DYNAMIC; A - ACTIVE; d - DHCP
Columns: DST-ADDRESS, GATEWAY, ROUTING-TABLE, DISTANCE
    DST-ADDRESS         GATEWAY                          ROUTING-TABLE  DISTANCE
DAd 2001:db8:7501::/62  fe80::224:1dff:fe17:81f7%local   main                  1
```

### 启用 IPv6 地址委派 {#enabling-ipv6-address-delegation}

地址服务器的配置方式与前缀服务器类似，但它使用 `address-pool` 而不是 `prefix-pool`，并且其地址池必须分配 /128 前缀。仅提供静态绑定的服务器不需要地址池。

```ros
[admin@MikroTik] > /ipv6/pool/print detail 
Flags: D - dynamic 
 0   name="myAddressPool" prefix=2001:db8:7501::/120 prefix-length=128 
[admin@MikroTik] > /ipv6/dhcp-server/print detail                                 
Flags: D - dynamic; X - disabled, I - invalid 
 0    name="myDHCP" interface=ether2 prefix-pool=static-only 
      address-pool=myAddressPool lease-time=3d rapid-commit=yes use-radius=no 
      preference=255 dhcp-option="" route-distance=1 use-reconfigure=no 
      address-lists="" duid="0x00030001b813f4840556" 
```

这对于 RouterOS DHCPv6 客户端等 DHCPv6 客户端已经足够：

```ros
[admin@MikroTik] > /ipv6/dhcp-client/print detail 
Flags: D - dynamic; X - disabled, I - invalid 
 0    interface=ether2 status=bound duid="0x00030001b123f48407f0" 
      dhcp-server-v6=fe80::ba69:f4af:fe14:558 request=address 
      add-default-route=no use-peer-dns=yes allow-reconfigure=no 
      dhcp-options="" pool-name="" pool-prefix-length=64 prefix-hint=::/0 
      prefix-address-lists="" dhcp-options="" 
      address=2001:db8:7501::, 2d23h59m51s
```

计算机等主机不会自行查找 DHCPv6 服务器：其网络中的路由器通告会告知它们是否使用 DHCPv6。要让主机通过 DHCPv6 请求地址，请在接口的路由器通告中设置托管地址配置标志（`managed-address-configuration`）。这不需要通告用于 SLAAC 的前缀：

```ros
[admin@MikroTik] > /ipv6/nd/print detail 
Flags: X - disabled, I - invalid; * - default 
 0    interface=ether2 ra-interval=3m20s-10m ra-delay=3s mtu=unspecified 
      reachable-time=unspecified retransmit-interval=unspecified 
      ra-lifetime=30m ra-preference=medium hop-limit=unspecified 
      advertise-mac-address=yes advertise-dns=yes 
      managed-address-configuration=yes other-configuration=no
[admin@MikroTik] > /ipv6/nd/prefix/print detail 
Flags: X - disabled, I - invalid; D - dynamic 
 0    prefix=::/64 6to4-interface=none interface=ether2 on-link=yes 
      autonomous=yes valid-lifetime=4w2d preferred-lifetime=1w 
```

连接到 ether2 的计算机随后会收到设置了托管标志的路由器通告，大多数主机据此启动 DHCPv6 客户端并请求地址。

完整的服务器配置（带注释）：

```ros
# Address pool for the bridge network; the prefix length must be 128
/ipv6/pool
add name=myLocalLan prefix=2001:db8::/100 prefix-length=128
# DHCPv6 server that gives out addresses from the pool
/ipv6/dhcp-server
add address-pool=myLocalLan interface=bridge name=myLocalServer
# Set the managed flag (M) in router advertisements, so hosts on the bridge use DHCPv6
/ipv6/nd
add interface=bridge managed-address-configuration=yes
# Enable router advertisements on the bridge; no prefix is needed, only the managed flag
/ipv6/nd/prefix
add interface=bridge
```

:::warning
客户端在此配置下的行为可能不同。例如，macOS 在启动时会获取地址，但如果未通告前缀，休眠后可能不会续租，因为 macOS 在没有 SLAAC 地址时不会使用其 DHCPv6 客户端。其他客户端可能需要在通告的前缀上设置 `autonomous=no`，才会使用 DHCPv6。请根据网络中的客户端调整配置。
:::

## 属性 {#properties}

DHCPv6 服务器的所有属性均在 [`/ipv6/dhcp-server`](/docs/cli-reference/ipv6/dhcp-server) CLI 参考中说明。以下行为需要进一步解释。

### 服务器发起的续租 {#server-initiated-renewal}

使用 `use-reconfigure=yes` 时，接受 Reconfigure 消息的客户端（例如设置了 `allow-reconfigure=yes` 的 RouterOS DHCPv6 客户端）会获得一个 reconfigure key。当服务器的 `address-pool`、`lease-time` 或 `dhcp-option` 发生变化，或者客户端绑定的设置发生变化时，服务器会主动向其发送 Reconfigure 消息，使客户端立即续租并应用更改。绑定的 `send-reconfigure` 命令可手动发送一次该消息。

### 客户端的 DNS 条目 {#dns-entries-for-clients}

使用 `add-dns-entries=yes` 时，服务器会为每个地址绑定添加一条动态 DNS 条目（类型 AAAA）。名称为客户端发送的 FQDN，后接 `add-dns-entries-suffix`（默认为 `lan`），条目的 TTL 为租约时间。前缀绑定不会获得 DNS 条目。

## Bindings

**子菜单：** `/ipv6/dhcp-server/binding`

动态绑定与客户端的 DUID 绑定，因此 DUID 发生变化的客户端会获得与之前不同的前缀。静态绑定通过 DUID 和 IAID 标识客户端，并为其分配固定的前缀或地址。所有绑定属性、状态值和命令均在 [`/ipv6/dhcp-server/binding`](/docs/cli-reference/ipv6/dhcp-server/binding) CLI 参考中说明。

例如，动态分配的 /62 前缀

```ros
[admin@RB493G] /ipv6/dhcp-server/binding> print detail
Flags: X - disabled, D - dynamic
 0 D address=2001:db8:7501:ff00::/62 duid="1605fcb400241d1781f7" iaid=0
     server=local-dhcp life-time=3d status=bound expires-after=2d23h40m10s
     last-seen=19m50s

 1 D address=2001:db8:7501:ff04::/62 duid="0019d1393535" iaid=2
     server=local-dhcp life-time=3d status=bound expires-after=2d23h43m47s
     last-seen=16m13s
```

### 速率限制 {#rate-limiting}

可以通过客户端绑定的 `rate-limit` 属性限制其带宽。随后，服务器会为该绑定的前缀或地址添加一条动态 simple queue。

:::warning
队列不适用于 FastTracked 流量。请确保防火墙不会对要限制的流量执行 FastTrack。
:::

首先，将绑定设置为静态：

```ros
[admin@MikroTik] > /ipv6/dhcp-server/binding/print
Flags: X - disabled, D - dynamic
 #   ADDRESS                   DUID            SERVER         STATUS
 0 D fdb4:4de7:a3f8:418c::/66  0x6c3b6b7c413e  DHCPv6_Server  bound

[admin@MikroTik] > /ipv6/dhcp-server/binding/make-static 0

[admin@MikroTik] > /ipv6/dhcp-server/binding/print
Flags: X - disabled, D - dynamic
 #   ADDRESS                   DUID            SERVER         STATUS
 0   fdb4:4de7:a3f8:418c::/66  0x6c3b6b7c413e  DHCPv6_Server  bound
```

然后设置速率限制。服务器会为该绑定创建一条动态 simple queue：

```ros
[admin@MikroTik] > /ipv6/dhcp-server/binding/set 0 rate-limit=10M/10M
[admin@MikroTik] > /queue/simple/print
Flags: X - disabled, I - invalid, D - dynamic
 0  D name="dhcp<6c3b6b7c413e fdb4:4de7:a3f8:418c::/66>" target=fdb4:4de7:a3f8:418c::/66 parent=none packet-marks="" priority=8/8
      queue=default-small/default-small limit-at=10M/10M max-limit=10M/10M burst-limit=0/0 burst-threshold=0/0 burst-time=0s/0s
      bucket-size=0.1/0.1
```

:::note
`allow-dual-stack-queue` 默认启用，因此同一客户端的 DHCPv6 绑定和 DHCP 租约共享一条动态 simple queue。未启用时，服务器会为 IPv6 和 IPv4 分别创建队列。
:::

共享队列同时包含 IPv4 和 IPv6 地址：

```ros
[admin@MikroTik] > /queue/simple/print
Flags: X - disabled, I - invalid, D - dynamic
 0  D name="dhcp-ds<6C:3B:6B:7C:41:3E>" target=192.168.1.200/32,fdb4:4de7:a3f8:418c::/66 parent=none packet-marks="" priority=8/8
      queue=default-small/default-small limit-at=10M/10M max-limit=10M/10M burst-limit=0/0 burst-threshold=0/0 burst-time=0s/0s
      bucket-size=0.1/0.1
```

## RADIUS 支持 {#radius-support}

RADIUS 服务器可以使用 Mikrotik-Rate-Limit 属性为每个 DHCPv6 绑定分配速率限制。首先，设置 DHCPv6 服务器使用 RADIUS：

```ros
/radius 
add address=10.0.0.1 secret=VERYsecret123 service=dhcp 
/ipv6/dhcp-server 
set dhcp1 use-radius=yes
```

然后配置 RADIUS 服务器发送 Mikrotik-Rate-Limit 属性。对于使用 MySQL 的 FreeRADIUS，为客户端向 `radcheck` 和 `radreply` 表添加条目，例如：

```sql
INSERT INTO `radcheck` (`username`, `attribute`, `op`, `value`) VALUES
('000c4200d464', 'Auth-Type', ':=', 'Accept');

INSERT INTO `radreply` (`username`, `attribute`, `op`, `value`) VALUES
('000c4200d464', 'Delegated-IPv6-Prefix', '=', 'fdb4:4de7:a3f8:418c::/66'),
('000c4200d464', 'Mikrotik-Rate-Limit', '=', '10M');
```

:::note
仅当服务器将 DHCP 租约和 DHCPv6 绑定识别为同一客户端时，才会创建共享队列：通过租约的 MAC 地址，或在 DHCP 客户端发送基于 DUID 的客户端标识符（RFC 4361）时通过其 DUID，以及通过绑定的 DUID。DHCPv6 客户端按设备生成其 DUID，不一定从其运行所在接口的 MAC 地址生成，因此服务器可能会创建独立的队列。
:::
