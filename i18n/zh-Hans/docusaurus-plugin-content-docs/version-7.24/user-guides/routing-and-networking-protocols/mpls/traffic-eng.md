---
title: "流量工程"
description: "本页介绍 MikroTik RouterOS 流量工程（TE）隧道功能，包括使用 `monitor` 等监控命令跟踪 TE 隧道状态和路径，以及使用 `/interface/traffic-eng/reoptimize` 根据网络变化调整 LSP 的重新优化技术。"
tags:
  - 'traffic-eng'
  - 'reoptimization'
  - 'explicit-route'
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/mpls/traffic-eng
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "user-guides/routing-and-networking-protocols/mpls/vpls"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 监控 {#monitoring}

要验证 TE 隧道的状态，可以使用 **`monitor`** 命令。

```ros
/interface/traffic-eng/monitor 0 
tunnel-id: 12 
primary-path-state: on-hold 
secondary-path-state: established 
secondary-path: static 
active-path: static 
active-lspid: 3 
active-label: 66 
explicit-route: "S:192.168.55.10/32,L:192.168.55.13/32,L:192.168.55.17/32" 
recorded-route: "192.168.55.13[66],192.168.55.17[59],192.168.55.18[3]" 
reserved-bandwidth: 5.0Mbps
```

### Reoptimization

可以通过输入命令 `/interface/traffic-eng/reoptimize [id]` 手动重新优化路径（其中 [id] 是项目编号或接口名称）。它允许网络管理员根据带宽、流量、管理策略或其他因素的变化，重新优化已建立的 LSP。

假设 TE 隧道在最佳路径上的链路故障后选择了另一条路径。如果启用了 `record-route` 参数，可以通过查看 **`explicit-route`** 或 **`recorded-route`** 值来验证优化结果。

```ros
/interface/traffic-eng/monitor 0 
tunnel-id: 12 
primary-path-state: established 
primary-path: dyn 
secondary-path-state: not-necessary 
active-path: dyn
active-lspid: 1
active-label: 67 
explicit-route: "S:192.168.55.10/32,S:192.168.55.13/32,S:192.168.55.14/32, 
S:192.168.55.17/32,S:192.168.55.18/32" 
recorded-route: "192.168.55.13[67],192.168.55.17[60],192.168.55.18[3]" 
reserved-bandwidth: 5.0Mbps
```

每当链路恢复时，TE 隧道都会使用同一路径，即使该路径不是最佳路径（除非配置了 `reoptimize-interval`）。要解决此问题，可以手动重新优化隧道路径。

```ros
/interface/traffic-eng/reoptimize 0
```

```ros
/interface/traffic-eng/monitor 0 
tunnel-id: 12 
primary-path-state: established 
primary-path: dyn 
secondary-path-state: not-necessary 
active-path: dyn
active-lspid: 2
active-label: 81 
explicit-route: "S:192.168.55.5/32,S:192.168.55.2/32,S:192.168.55.1/32" 
recorded-route: "192.168.55.2[81],192.168.55.1[3]" 
reserved-bandwidth: 5.0Mbps
```

注意 explicit-route 和 recorded-route 如何变为更短的路径。
