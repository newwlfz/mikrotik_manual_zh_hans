---
title: "Profiler"
description: "RouterOS 中的 Profiler 工具显示每个进程的 CPU 使用率，帮助识别占用资源较多的进程。它支持按核心监控，并按进程类型分类 CPU 使用率，以便高效调试。"
tags:
  - 'cpu-usage'
  - 'profiler'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/profiler
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

profiler 工具显示 RouterOS 中运行的每个进程的 CPU 使用率。它有助于识别哪个进程占用了最多 CPU 资源。  
观看我们的[关于此功能的视频](https://youtu.be/BkRaW14p8_s)。

```ros
[admin@MikroTik] > /tool/profile
```

在多核系统上，该工具允许指定每个核心的 CPU 使用率。

“CPU”参数允许指定一个整数，该整数表示一个核心，或两个预定义值 **all** 和 **total：** 之一：

- total - 该值用于显示所有核心使用率的总和。
- all - 该值用于分别显示每个可用核心的 CPU 使用率。

在以下示例中，我们将查看两个预定义值：

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

## Classifiers

RouterOS 进程按类型分类，为便于调试，每种类型的 CPU 使用率分别显示。

| 属性 | 描述 |
| :-- | :-- |
| backup | 备份服务 |
| bfd | BFD 服务 |
| bgp | BGP 服务 |
| bridging | 网桥服务 |
| btest | 带宽测试。 |
| certificate | 证书服务 |
| console | 控制台 |
| container | 容器综合使用率 |
| dhcp | DHCP-Server 和 DHCP-Client 服务 |
| disk | 存储相关服务 |
| dns | DNS 相关服务 |
| dude | The Dude 软件包服务 |
| e-mail | e-mail 工具 |
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
| graphing | 绘图工具 |
| gre | GRE |
| health | 系统监控、系统健康 |
| hotspot | Hotspot 服务 |
| idle | 空闲 CPU 资源 |
| igmp-proxy | IGMP Proxy 服务 |
| internet-detect | Detect Internet 工具 |
| ip-pool | IP Pool 服务 |
| ipsec | IPsec 服务： xfrm - 一组统计信息，显示被转换代码丢弃的数据包数量及原因。  drivers/crypto - 提供访问硬件加密加速器权限的驱动程序。 ipsec - 与 Internet Key Exchange（IKE）协议、Authentication Header（AH）、Encapsulating Security Payload（ESP）相关的进程。 |
| kvm | KVM 虚拟机功能 |
| l7-matcher | L7 匹配器 |
| lcd | LCD 接口系统 |
| ldp | Label Distribution Protocol（LDP） |
| logging | 日志系统 |
| management | 不同子系统：调度器、网络、文件管理等。 |
| mpls | MPLS 相关功能 |
| neighbour-discovery | 邻居发现服务 |
| networking | 网络中包含的通用服务集 |
| ntp | NTP 服务 |
| ospf | OSPF 服务 |
| ovpn | OVPN 服务 |
| pim | Protocol Independent Multicast |
| profiling | profiler 服务 |
| queue-mgmt | 队列：Simple queues、Queue tree、Queue types |
| queuing | 中间队列 |
| radius | RADIUS 服务 |
| radv | IPv6 radv daemon 日志消息服务 |
| remote-access | 无需登录 RouterOS 即可直接访问设备 |
| rip | Routing Information Protocol |
| routing | 路由相关服务 |
| serial | 串行控制台和终端工具 |
| sniffing | 数据包 Sniffer 工具 |
| snmp | SNMP |
| socks | Socket Secure |
| spi | 存储相关服务 |
| ssh | SSH 服务器 |
| ssl | SSL |
| supout.rif | supout.rif 文件生成 |
| telnet | Telnet 服务 |
| tftp | TFTP 服务 |
| traffic-accounting | Traffic-Flow 日志系统 |
| traffic-flow | Traffic-Flow 系统 |
| unclassified | 未由该分类器定义的进程或服务 |
| upnp | UPnP 协议 |
| usb | USB 功能 |
| user-manager | User Manager 服务 |
| vrrp | VRRP |
| web-proxy | Web Proxy |
| winbox | Winbox |
| wireguard | Wireguard |
| wireless | 使用 Wireless 系统的通用服务集 |
| www | Webfig HTTP 服务 |
| zerotier | ZeroTier |
