---
sidebar_key: "high-availability-solutions/user-guides/bonding-examples"
sidebar_position: 1
title: "绑定示例"
sidebar_label: "绑定示例"
description: "本页演示如何使用 MikroTik RouterOS 在两条无线链路上绑定 EoIP 隧道，展示创建绑定接口并验证跨链路流量分布的配置步骤。"
tags:
  - 'bonding'
  - 'eoip'
source: https://manual.mikrotik.com/docs/7.24/high-availability-solutions/user-guides/bonding-examples
captured_at: '2026-11-04T11:29:56+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 在两条无线链路上绑定 EoIP 隧道 {#bonding-eoip-tunnels-over-two-wireless-links}

这是一个将多个网络接口聚合为单个管道的示例。特别展示了如何聚合多个虚拟（EoIP）接口以获得最大吞吐量（MT），并着重考虑可用性。

### 网络拓扑图 {#network-diagram}

两台路由器 R1 和 R2 通过无线链路互连。两侧的无线接口都已分配 IP 地址。

### ![](/img/1bca9f117f589ad6.webp)配置 {#configuration}

绑定只能用于 OSI 第 2 层（以太网级）连接。因此，需要在每条无线链路上创建 EoIP 接口。具体操作如下：

在路由器 R1 上：

```ros
/interface/eoip/add remote-address=10.0.1.1 tunnel-id=1 
/interface/eoip/add remote-address=10.2.2.1 tunnel-id=2
```

在路由器 R2 上：

```ros
/interface/eoip/add remote-address=10.0.1.2 tunnel-id=1 
/interface/eoip/add remote-address=10.2.2.2 tunnel-id=2
```

第二步是添加 bonding 接口，并将 EoIP 接口指定为其从属接口：

R1：

```ros
/interface/bonding/add slaves=eoip-tunnel1,eoip-tunnel2 mode=balance-rr
```

R2：

```ros
/interface/bonding/add slaves=eoip-tunnel1,eoip-tunnel2 mode=balance-rr
```

最后一步是为 bonding 接口添加 IP 地址：

R1：

```ros
/ip/address/add address=192.168.0.1/24 interface=bonding1
```

R2：

```ros
/ip/address/add address=192.168.0.2/24 interface=bonding1
```

### 测试配置 {#test-the-configuration}

现在两台路由器可以使用 192.168.0.0/24 网络中的地址相互访问。要验证 bonding 接口的功能，请执行以下操作：

R1：

```ros
/interface/monitor-traffic eoip-tunnel1,eoip-tunnel2
```

R2：

```ros
/tool/bandwidth-test 192.168.0.1 direction=transmit
```

应当可以看到流量均匀分布到两个 EoIP 接口上：

```ros
/int monitor-traffic eoip-tunnel1,eoip-tunnel2              
    received-packets-per-second: 685      685                                  
       received-bits-per-second: 8.0Mbps  8.0Mbps                              
        sent-packets-per-second: 21       20                                   
           sent-bits-per-second: 11.9kbps 11.0kbps                             
    received-packets-per-second: 898      899                                  
       received-bits-per-second: 10.6Mbps 10.6Mbps                             
        sent-packets-per-second: 20       21                                   
           sent-bits-per-second: 11.0kbps 11.9kbps                             
    received-packets-per-second: 975      975                                  
       received-bits-per-second: 11.5Mbps 11.5Mbps                             
        sent-packets-per-second: 22       22                                   
           sent-bits-per-second: 12.4kbps 12.3kbps                             
    received-packets-per-second: 980      980                                  
       received-bits-per-second: 11.6Mbps 11.6Mbps                             
        sent-packets-per-second: 21       21                                   
           sent-bits-per-second: 11.9kbps 11.8kbps                             
    received-packets-per-second: 977      977                                  
       received-bits-per-second: 11.6Mbps 11.5Mbps                             
        sent-packets-per-second: 21       21                                   
           sent-bits-per-second: 11.9kbps 11.8kbps                             
-- [Q quit|D dump|C-z pause]
```

### 链路监控 {#link-monitoring}

很容易注意到，使用上述配置时，只要任一单条链路发生故障，bonding 接口的吞吐量就会骤降。这是因为没有执行链路监控；因此，bonding 驱动无法感知底层链路的问题。在大多数 bonding 配置中，启用链路监控是必须的。要启用 ARP 链路监控，请执行以下操作：

#### R1 {#r1}

```ros
/interface/bonding/set bonding1 link-monitoring=arp arp-ip-targets=192.168.0.2
```

#### R2 {#r2}

```ros
/interface/bonding/set bonding1 link-monitoring=arp arp-ip-targets=192.168.0.1
```
