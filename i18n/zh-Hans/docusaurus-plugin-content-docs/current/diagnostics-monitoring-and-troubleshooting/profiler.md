---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/profiler"
sidebar_position: 15
title: "分析器"
sidebar_label: "分析器"
description: "Profiler 工具显示每个 RouterOS 进程分类器的 CPU 使用情况，可按总和或按核心显示，用于识别哪个进程消耗 CPU 资源。"
tags:
  - 'cpu-usage'
  - 'profiler'
source: https://manual.mikrotik.com/docs/diagnostics-monitoring-and-troubleshooting/profiler
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Profiler 工具显示 RouterOS 中运行的每个进程的 CPU 使用率。它有助于识别哪个进程占用了大部分 CPU 资源。请参阅[关于此功能的视频](https://youtu.be/BkRaW14p8_s)。

```ros
[admin@MikroTik] > /tool/profile
```

进程按类型（分类器）分组，例如 `wireless`、`bridging` 或 `console`，并且每个分类器的 CPU 使用率单独显示。只显示有正在运行进程的分类器，因此行取决于设备和所使用的功能。

在多核系统上，`cpu` 参数选择视图：`cpu=total`（默认）汇总所有核心的使用率，`cpu=all` 分别显示每个核心，并带有每核心的 `cpuN` 汇总行，而 `cpu=<number>` 仅显示该核心。下面的示例演示了这两种视图。
如果没有 `duration`，分析会持续刷新，直到你停止它；`freeze-frame-interval`（以秒为单位）设置多久打印一个新帧，并且每个帧显示自上一帧以来测得的用量。使用 `duration` 时，工具会在给定的秒数后停止。在采样数据到达之前，最初的一两帧只显示 `total` 行。

如需不带进程拆分的简单每核心负载摘要（例如用于脚本），请使用 [`/system/resource/cpu/print`](../cli-reference/system/resource/cpu.md)。

## 查找繁忙进程 {#find-a-busy-process}

失控脚本会使一个核心保持繁忙。在汇总视图（`cpu=total`）中，4 核路由器中一个核心 100% 的使用率会显示为 25%：

```ros
[admin@MikroTik] > /tool/profile cpu=total freeze-frame-interval=1 duration=5
Columns: NAME, USAGE
NAME            USAGE
interface-mgmt  0%   
bridging        0%   
console         25.1%
resource-mgmt   0%   
ssh             0%   
total           25.1%
```

`console` 占用 CPU 表明脚本或 console 会话活动（此处为脚本循环）。每核心视图会在 `cpuN` 行中显示确切的核心及其总计：

```ros
[admin@MikroTik] > /tool/profile cpu=all freeze-frame-interval=1 duration=3
Columns: NAME, CPU, USAGE
NAME         CPU  USAGE
console        0  95.5%
cpu0              95.5%
console        1  0.5% 
wireless       1  0.5% 
kernel         1  0.5% 
cpu1              1.5% 
console        2  4%   
certificate    2  0.5% 
cpu2              4.5% 
console        3  0.5% 
cpu3              0.5% 
```

## 分类器 {#classifiers}

RouterOS 进程按类型分类，并且每种类型的 CPU 使用率会单独显示，以便于调试。除了下面的功能分类器之外，还可能出现 `kernel`、`ipc`、`interface-mgmt` 和 `resource-mgmt` 等系统行；任何没有分类器的内容都归入 `unclassified` 下：

| 属性 | 描述 |
| :-- | :-- |
| backup | 备份服务 |
| bfd | BFD 服务 |
| bgp | BGP 服务 |
| bridging | 桥接服务 |
| btest | 带宽测试。 |
| certificate | 证书服务 |
| console | 控制台 |
| container | 容器综合使用情况 |
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
| graphing | 图形绘制工具 |
| gre | GRE |
| health | 系统监控、系统健康状况 |
| hotspot | Hotspot 服务 |
| idle | 空闲 CPU 资源 |
| igmp-proxy | IGMP Proxy 服务 |
| internet-detect | Detect Internet 工具 |
| ip-pool | IP Pool 服务 |
| ipsec | IPsec 服务：xfrm - 一组统计信息，显示由转换代码丢弃的数据包数量及原因。drivers/crypto - 提供对硬件加密加速器访问的驱动程序。ipsec - 与 Internet Key Exchange (IKE) 协议、Authentication Header (AH)、Encapsulating Security Payload (ESP) 相关的进程。 |
| kvm | KVM 虚拟机功能 |
| l7-matcher | L7 匹配器 |
| lcd | LCD 接口系统 |
| ldp | 标签分发协议（LDP） |
| logging | 日志系统 |
| management | 不同的子系统：调度器、网络、文件管理等。 |
| mpls | MPLS 相关功能 |
| neighbor-discovery | 邻居发现服务 |
| networking | 网络中所包含的一组通用服务 |
| ntp | NTP 服务 |
| ospf | OSPF 服务 |
| ovpn | OVPN 服务 |
| pim | 协议无关组播 |
| profiling | Profiler 服务 |
| queue-mgmt | 队列：Simple queues、Queue tree、Queue types |
| queuing | 中间队列 |
| radius | RADIUS 服务 |
| radvd | IPv6 Router Advertisement 守护进程 (radvd) 服务 |
| remote-access | 无需登录 RouterOS 即可直接访问设备 |
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
| web-proxy | 网页代理 |
| winbox | Winbox |
| wireguard | Wireguard |
| wireless | 使用无线系统的一组通用服务 |
| www | Webfig HTTP 服务 |
| zerotier | ZeroTier |

有关所有参数，请参见 [`/tool/profile`](../cli-reference/tool/profile.md) CLI 参考。
