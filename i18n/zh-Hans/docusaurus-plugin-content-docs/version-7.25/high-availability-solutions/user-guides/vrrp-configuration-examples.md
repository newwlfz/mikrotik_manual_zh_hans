---
title: "VRRP 配置示例"
description: "本页提供 MikroTik RouterOS 的基本 VRRP 配置示例，演示如何在两台路由器之间设置主备冗余，并在故障切换时实现 IP 地址共享和 ARP 表更新。"
tags:
  - 'vrrp'
source: https://manual.mikrotik.com/docs/7.25/high-availability-solutions/user-guides/vrrp-configuration-examples
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 基本设置 {#basic-setup}

这是基本的 VRRP 配置示例。

:::info
Note

建议对使用相同 VRID 实现 VRRP 的所有设备使用相同版本的 RouterOS。
:::

![](/img/0340e63898c1565e.webp)

根据此配置，只要主设备 R1 正常运行，所有发往外部网络的流量都会被定向到 R1。但当 R1 故障时，R2 将接管主设备角色，并开始处理转发到与 IP(R1) 关联的接口的数据包。在此设置中，路由器“R2”在 Backup 期间完全空闲。

## 配置 {#configuration}

### R1 配置 {#r1-configuration}

```ros
/ip/address/add address=192.168.1.10/24 interface=ether1
/interface/vrrp/add interface=ether1 vrid=49 priority=254
/ip/address/add address=192.168.1.1/32 interface=vrrp1
```

### R2 配置 {#r2-configuration}

```ros
/ip/address/add address=192.168.1.20/24 interface=ether1
/interface/vrrp/add interface=ether1 vrid=49
/ip/address/add address=192.168.1.1/32 interface=vrrp1
```

### 测试 {#testing}

首先，检查两台路由器在 VRRP 接口上是否具有正确的标志。在路由器 R1 上应如下所示。

```ros
/interface/vrrp/print detail
 0   RM name="vrrp1" mtu=1500 mac-address=00:00:5E:00:01:31 arp=enabled interface=ether1 vrid=49 
        priority=254 interval=1 preemption-mode=yes authentication=none password="" on-backup="" 
        on-master="" version=3 v3-protocol=ipv4
```

在路由器 R2 上：

```ros
/interface/vrrp/print detail
 0    B name="vrrp1" mtu=1500 mac-address=00:00:5E:00:01:31 arp=enabled interface=ether1 vrid=49 
        priority=100 interval=1 preemption-mode=yes authentication=none password=""
         on-backup="" on-master="" version=3 v3-protocol=ipv4
```

如你所见，两台路由器上的 VRRP 接口 MAC 地址相同。现在要检查 VRRP 是否正常工作，请从客户端 ping 虚拟地址并检查 ARP 条目：

```ros
[admin@client] > /ping 192.168.1.1
192.168.1.1 64 byte ping: ttl=64 time=10 ms
192.168.1.1 64 byte ping: ttl=64 time=8 ms
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 8/9.0/10 ms
```

现在拔掉路由器 R1 上的 ether1 线缆。R2 将成为 VRRP master，客户端上的 ARP 表不会变化，但流量将开始经由 R2 路由器转发。

:::info
如果 VRRP 与 Reverse Path Filtering 一起使用，建议将 `rp-filter` 设置为 `loose`，否则 VRRP 接口可能无法访问。
:::

## 负载均衡 {#load-sharing}

在基本配置示例中，R2 在 Backup 状态期间完全空闲。这种行为可能被视为浪费宝贵资源。在这种情况下，可以将 R2 路由器设置为某些客户端的网关。
这种配置的明显优势是建立负载分担方案。但这样做时，R2 路由器不受当前 VRRP 设置的保护。
要使此设置生效，需要两个虚拟路由器。

![](/img/de347a67c254c189.webp)

V1 虚拟路由器的配置与基本示例中的配置相同：R1 为 Master，R2 为 Backup 路由器。在 V2 中，Master 为 R2，Backup 为 R1。  
通过此配置，可以在 R1 和 R2 之间建立负载分担；此外，通过让两台路由器互为备份，创建保护机制。

## 配置 {#configuration-1}

### R1 配置 {#r1-configuration-1}

```ros
/ip/address/add address=192.168.1.1/24 interface=ether1
/interface/vrrp/add interface=ether1 vrid=49 priority=254
/interface/vrrp/add interface=ether1 vrid=77 
/ip/address/add address=192.168.1.253/32 interface=vrrp1
/ip/address/add address=192.168.1.254/32 interface=vrrp2
```

### R2 配置 {#r2-configuration-1}

```ros
/ip/address/add address=192.168.1.2/24 interface=ether1
/interface/vrrp/add interface=ether1 vrid=49
/interface/vrrp/add interface=ether1 vrid=77 priority=254
/ip/address/add address=192.168.1.253/32 interface=vrrp1
/ip/address/add address=192.168.1.254/32 interface=vrrp2
```

## 不启用抢占的 VRRP {#vrrp-without-preemption}

当优先级较高的路由器变为可用时，它会成为 Master 路由器。有时这不是期望的行为，可以通过在 VRRP 配置中设置 `preemption-mode=no` 来关闭该行为。

### 配置 {#configuration-2}

我们将使用与基本示例相同的设置。唯一区别是在配置期间设置 preemption-mode=no。可以通过修改现有配置轻松完成：

```ros
/interface/vrrp/set [find] preemption-mode=no
```

### 测试 {#testing-1}

尝试关闭 R1 路由器，R2 将成为 Master 路由器，因为它在可用路由器中具有最高优先级。

现在打开 R1 路由器，你将看到 R2 路由器仍然是 Master，即使 R1 具有更高优先级。
