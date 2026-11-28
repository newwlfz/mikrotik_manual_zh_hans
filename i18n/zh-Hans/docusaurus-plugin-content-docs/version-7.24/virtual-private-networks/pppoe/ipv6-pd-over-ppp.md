---
title: "通过 PPP 的 IPv6 PD"
description: "本页演示如何在 RouterOS 中通过 PPPoE 配置 IPv6 Prefix Delegation，介绍如何在服务器和客户端上设置 DHCPv6-PD 池，包括接口配置和动态前缀委派的验证。"
tags:
  - 'ipv6'
  - 'dhcpv6'
  - 'ppp'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/pppoe/ipv6-pd-over-ppp
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "virtual-private-networks/pppoe"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

本示例演示如何设置 PPPoE server 和 client 以使用 IPv6 Prefix Delegation。

IPv6 Prefixes 可以通过 PPP 接口委派。当 client 连接时，PPP 将自动添加动态 [DHCPv6-PD server](/docs/network-management/dhcp#dhcpv6-server)。这样可以在 PPP 接口上运行 DHCPv6 client。

### 配置 {#configuration}

### Server

PPP Profiles 下的 dhcpv6-pd-pool 参数用于启用 PPP-PD。PPP 将使用指定的 [IPv6 pool](/docs/cli-reference/ipv6/pool) 创建动态 DHCP 服务器。

因此，第一步是添加 IPv6 pool：

```ros
/ipv6/pool
add name=myPool prefix=2001:db8:7501:ff00::/60 prefix-length=62
```

现在可以配置 PPP profile 并添加 PPPoE 服务器。

```ros
/ppp/profile/set default dhcpv6-pd-pool=myPool

/interface/pppoe-server/server 
add service-name=test interface=ether1
```

### 客户端 {#client}

在客户端，需要设置 PPPoE 客户端接口并在其上运行 DHCP 客户端。

```ros
/interface/pppoe-client
add name=client-test interface=ether1 user=a1 service-name=test

/ipv6/dhcp-client 
add interface=client-test pool-name=ppp-test pool-prefix-length=64
```

### 测试状态 {#testing-status}

在服务器端，检查是否添加了动态 DHCP 服务器，以及前缀是否绑定到特定客户端：

```ros
[admin@RB1100] /ipv6/dhcp-server> print 
Flags: D - dynamic, X - disabled, I - invalid 
 #    NAME              INTERFACE            ADDRESS-POOL            LEASE-TIME
 0 D  <pppoe-a1>        <pppoe-a1>           myPool                  3d        

[admin@RB1100] /ipv6/dhcp-server/binding> print 
Flags: X - disabled, D - dynamic 
 #   ADDRESS                                        DU       IAID SER.. STATUS 
 1 D 2001:db8:7501:ff04::/62                                  247 <pp.. bound  
 
```

在客户端，检查 DHCP 客户端是否已绑定，以及是否添加了 pool：

```ros
[admin@x86-test] /ipv6/dhcp-client> print 
Flags: D - dynamic, X - disabled, I - invalid 
 #    INTERFACE           STATUS        PREFIX                            EXPIRES-AFTER  
0    client-test          bound         2001:db8:7501:ff04::/62           2d23h18m17s  

[admin@x86-test] /ipv6/pool> print 
Flags: D - dynamic 
 #   NAME                        PREFIX                                   PREFIX-LENGTH
 0 D ppp-test                    2001:db8:7501:ff04::/62                             64
```
