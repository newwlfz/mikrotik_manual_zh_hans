---
sidebar_key: "high-availability-solutions/user-guides/vrrp-configuration-examples"
sidebar_position: 2
title: "VRRP 配置示例"
sidebar_label: "VRRP 配置示例"
description: "本页提供 MikroTik RouterOS 的基本 VRRP 配置示例，演示如何在两台路由器之间设置主备冗余，并在故障切换期间共享 IP 地址和更新 ARP 表。"
tags:
  - 'vrrp'
source: https://manual.mikrotik.com/docs/high-availability-solutions/user-guides/vrrp-configuration-examples
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 基本设置 {#basic-setup}

这是基本的 VRRP 配置示例。

:::info
注意

建议所有使用同一 VRID 实现 VRRP 的设备都使用相同版本的 RouterOS。

:::

![](/img/0340e63898c1565e.webp)

根据此配置，只要 Master R1 正常工作，所有发往外部网络的流量都会被定向到 R1。但一旦 R1 发生故障，R2 就会接替成为 Master，并开始处理转发到与 IP(R1) 关联的接口的数据包。在此设置中，路由器 "R2" 在 Backup 期间完全空闲。

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

首先，检查两台路由器的 VRRP 接口标志是否正确。在路由器 R1 上，应如下所示。

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

可以看到，两台路由器上的 VRRP 接口 MAC 地址相同。现在要检查 VRRP 是否正常工作，请尝试从客户端 ping 虚拟地址，并检查 ARP 表项：

```ros
[admin@client] > /ping 192.168.1.1
192.168.1.1 64 byte ping: ttl=64 time=10 ms
192.168.1.1 64 byte ping: ttl=64 time=8 ms
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 8/9.0/10 ms
```

现在拔掉路由器 R1 上的 ether1 网线。R2 将成为 VRRP Master，客户端上的 ARP 表不会改变，但流量将开始通过 R2 路由器转发。

:::info
如果 VRRP 与反向路径过滤（Reverse Path Filtering）一起使用，建议将 `rp-filter` 设置为 `loose`，否则 VRRP 接口可能无法访问。

:::

## 负载分担 {#load-sharing}

在基本配置示例中，R2 在 Backup 状态期间完全空闲。这种行为可能被视为浪费宝贵的资源。在这种情况下，可以将 R2 路由器设置为某些客户端的网关。
这种配置的明显优势是建立负载分担方案。但这样做时，R2 路由器不受当前 VRRP 设置的保护。  
要使此设置生效，我们需要两个虚拟路由器。

![](/img/de347a67c254c189.webp)

V1 虚拟路由器的配置将与基本示例中的配置相同——R1 是 Master，R2 是 Backup 路由器。在 V2 中，Master 是 R2，Backup 是 R1。  
通过这种配置，我们在 R1 和 R2 之间建立负载分担；此外，我们让两台路由器互为备份，从而创建保护设置。

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

## 无抢占的 VRRP {#vrrp-without-preemption}

每当具有更高优先级的路由器变为可用时，它就会成为 Master 路由器。有时这并不是期望的行为，可以通过在 VRRP 配置中设置 `preemption-mode=no` 来关闭。

### 配置 {#configuration-2}

我们将使用与基本示例相同的设置。唯一区别是，在配置过程中设置 preemption-mode=no。通过修改现有配置即可轻松完成：

```ros
/interface/vrrp/set [find] preemption-mode=no
```

### 测试 {#testing-1}

尝试关闭 R1 路由器，R2 将成为 Master 路由器，因为它在可用路由器中具有最高优先级。

现在启动 R1 路由器，你将看到即使 R1 具有更高优先级，R2 路由器仍继续作为 Master。
