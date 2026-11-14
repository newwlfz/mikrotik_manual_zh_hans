---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/profiler"
sidebar_position: 15
title: "分析器"
sidebar_label: "分析器"
description: "RouterOS 中的 Profiler 工具会显示每个进程的 CPU 使用情况，有助于识别占用资源较高的进程。它支持按核心监控，并按进程类型对 CPU 使用情况进行分类，以便高效调试。"
tags:
  - 'cpu-usage'
  - 'profiler'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/profiler
captured_at: '2026-11-04T11:15:24+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

The profiler 工具会显示 RouterOS 中每个正在运行的进程的 CPU 使用率。它有助于识别哪个进程占用了大部分 CPU 资源。  
观看我们[关于此功能的视频](https://youtu.be/BkRaW14p8_s)。

```ros
[admin@MikroTik] > /tool/profile
```

在多核系统上，该工具允许指定每个核心的 CPU 使用率。

"CPU" 参数允许指定一个整数，该整数表示某个核心，或两个预定义值 **all** 和 **total** 之一：

- total - 此值用于显示所有核心使用率的总和。
- all - 此值用于分别显示每个可用核心的 CPU 使用率。

在以下示例中，我们将查看这两个预定义值：

```ros
[admin@MikroTik] > /tool/profile cpu=all 
NAME             CPU        USAGE       
ethernet         1          0%          
kvm              0          0%          
kvm              1          4.5%        
management       0          0%          
management       1          0.5%        
idle             0          100%        
idle             1          93%         
profiling        0          0%          
profiling        1          2%    

[admin@MikroTik] > /tool/profile cpu=total 
NAME             CPU        USAGE       
ethernet         all        0%          
console          all        0%          
kvm              all        2.7%        
management       all        0%          
idle             all        97.2%       
profiling        all        0%          
bridging         all        0%  
```

## 分类器 {#classifiers}

RouterOS 进程按类型分类，并且为便于调试，每种类型的 CPU 使用率会单独显示。

| 属性 | 描述 |
| :-- | :-- |
| backup | 备份服务 |
| bfd | BFD 服务 |
| bgp | BGP 服务 |
| bridging | 桥接服务 |
| btest | 带宽测试。 |
| certificate | 证书服务 |
| console | 控制台 |
| container | 容器合计使用率 |
| dhcp | DHCP-Server 和 DHCP-Client 服务 |
| disk | 存储相关服务 |
| dns | DNS 相关服务 |
| dude | The Dude 软件包服务 |
| e-mail | 电子邮件工具 |
| encrypting | 加密进程 |
| eoip | EoIP |
| ethernet | 以太网相关属性，例如链路速度、自动协商、双工模式、监控收发器诊断信息等。 |
| fetcher | Fetch 工具 |
| fileman | 文件管理器 |
| firewall | 防火墙相关进程 |
| firewall-mgmt | 防火墙管理：过滤、NAT、Mangle |
| flash | 存储相关服务 |
| ftp | FTP 服务 |
| gps | GPS 服务 |
| graphing | Graphing 工具 |
| gre | GRE |
| health | 系统监控、系统健康 |
| hotspot | Hotspot 服务 |
| idle | 空闲 CPU 资源 |
| igmp-proxy | IGMP Proxy 服务 |
| internet-detect | Detect Internet 工具 |
| ip-pool | IP Pool 服务 |
| ipsec | IPsec 服务：xfrm - 一组统计信息，显示被转换代码丢弃的数据包数量及原因。drivers/crypto - 提供对硬件加密加速器访问的驱动程序。ipsec - 与 Internet Key Exchange (IKE) 协议、Authentication Header (AH)、Encapsulating Security Payload (ESP) 相关的进程。 |
| kvm | KVM 虚拟机功能 |
| l7-matcher | L7 匹配器 |
| lcd | LCD 接口系统 |
| ldp | 标签分发协议（LDP） |
| logging | 日志系统 |
| management | 不同子系统：调度器、网络、文件管理等。 |
| mpls | MPLS 相关功能 |
| neighbour-discovery | 邻居发现服务 |
| networking | 网络功能中包含的一组通用服务 |
| ntp | NTP 服务 |
| ospf | OSPF 服务 |
| ovpn | OVPN 服务 |
| pim | 协议无关组播 |
| profiling | Profiler 服务 |
| queue-mgmt | 队列：简单队列、队列树、队列类型 |
| queuing | 中间队列 |
| radius | RADIUS 服务 |
| radv | IPv6 radv 守护进程日志消息服务 |
| remote-access | 无需登录 RouterOS 直接访问设备 |
| rip | 路由信息协议 |
| routing | 路由相关服务 |
| serial | 串行控制台和终端工具 |
| sniffing | 数据包 Sniffer 工具 |
| snmp | SNMP |
| socks | 套接字安全 |
| spi | 存储相关服务 |
| ssh | SSH 服务器 |
| ssl | SSL |
| supout.rif | supout.rif 文件生成 |
| telnet | Telnet 服务 |
| tftp | TFTP 服务 |
| traffic-accounting | Traffic-Flow 日志系统 |
| traffic-flow | Traffic-Flow 系统 |
| unclassified | 未由此分类器定义的进程或服务 |
| upnp | UPnP 协议 |
| usb | USB 功能 |
| user-manager | User Manager 服务 |
| vrrp | VRRP |
| web-proxy | Web 代理 |
| winbox | Winbox |
| wireguard | Wireguard |
| wireless | 使用无线系统的一组通用服务 |
| www | Webfig HTTP 服务 |
| zerotier | ZeroTier |
