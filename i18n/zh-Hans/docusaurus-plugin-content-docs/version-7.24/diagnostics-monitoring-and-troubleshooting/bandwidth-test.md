---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/bandwidth-test"
sidebar_position: 5
title: "带宽测试"
sidebar_label: "带宽测试"
description: "MikroTik RouterOS 中的带宽测试功能允许使用 TCP 或 UDP 协议测量路由器之间的网络吞吐量，并详细说明其行为和限制。它包括带宽服务器的配置选项，例如端口范围、身份验证和会话限制，还提供了在无需客户端身份验证的情况下启用服务器的示例。"
tags:
  - 'bandwidth'
  - 'tcp'
  - 'udp'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/bandwidth-test
captured_at: '2026-11-04T11:27:51+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**子菜单：** `/tool` **所需软件包：** `system`

带宽测试器可用于测量到另一台 MikroTik 路由器（有线或无线）的吞吐量，从而帮助发现网络“瓶颈”。

TCP 测试使用带确认的标准 TCP 协议，并遵循 TCP 算法根据延迟、丢弃的数据包以及 TCP 算法中的其他特性来决定发送多少数据包。请查阅 TCP 协议，了解其内部速度设置以及如何分析其行为。吞吐量统计使用整个 TCP 数据流的大小计算。由于确认是 TCP 的内部工作机制，其大小和对链路的使用不计入吞吐量统计。因此，在估算吞吐量时，该统计不如 UDP 统计可靠。

UDP 测试器发送的数据包比链路另一端当前报告接收到的数据包多 110% 或更多。要查看链路的最大吞吐量，数据包大小应设置为链路允许的最大 MTU，通常为 1500 字节。UDP 不需要确认；这种实现意味着可以看到最接近的吞吐量近似值。

:::warning
带宽测试会使用所有可用带宽和系统资源，并可能影响网络可用性。如果要测试路由器的真实吞吐量，应通过被测试的路由器运行带宽测试，而不是从该路由器发起或发往该路由器。为此，至少需要 3 台串联的路由器：带宽服务端、被测试的路由器和带宽客户端。
:::

:::note
如果使用 UDP 协议，带宽测试会计入 IP 头+UDP 头+UDP 数据。如果使用 TCP，带宽测试只计入 TCP 数据（不包括 TCP 头和 IP 头）。
:::

## 带宽测试服务端 {#bandwidth-test-server}

|  |  |
| :-- | :-- |
**子菜单：** `/tool/bandwidth-server`

| 属性 | 描述 |
| :-- | :-- |
| **allocate-udp-ports-from** (*integer 1000..64000*；默认：**2000**) | UDP 端口范围的起始值 |
| **authenticate** (*yes \| no*；默认：**yes**) | 仅与已认证的客户端通信 |
| **enabled** (*yes \| no*；默认：**yes**) | 定义带宽服务端是否启用 |
| **max-sessions** (*integer 1..1000*；默认：**100**) | 最大同时测试数量 |

### 示例 {#example}

带宽服务端：

```ros
[admin@MikroTik] /tool/bandwidth-server> print                                  
                  enabled: yes                                                  
             authenticate: yes                                                  
  allocate-udp-ports-from: 2000                                                 
             max-sessions: 100                                                  
[admin@MikroTik] /tool/bandwidth-server>
```

活动会话：

```ros
[admin@MikroTik] /tool/bandwidth-server/session> print
  # CLIENT          PROTOCOL DIRECTION USER
  0 35.35.35.1      udp      send      admin
  1 25.25.25.1      udp      send      admin
  2 36.36.36.1      udp      send      admin
[admin@MikroTik] /tool/bandwidth-server/session>
```

要启用 **bandwidth-test** 服务端而不进行客户端认证：

```ros
[admin@MikroTik] /tool/bandwidth-server> set enabled=yes authenticate=no        
[admin@MikroTik] /tool/bandwidth-server> print                                  
                  enabled: yes                                                  
             authenticate: no                                                   
  allocate-udp-ports-from: 2000                                                 
             max-sessions: 100                                                  
[admin@MikroTik] /tool/bandwidth-server>
```

## 带宽测试客户端 {#bandwidth-test-client}

**子菜单：** `/tool/bandwidth-test`

| 属性 | 描述 |
| :-- | :-- |
| **address** (*IP address \| IPv6 prefix[%interface]*；默认：) | 主机的 IP 地址 |
| **direction** (*both \| receive \| transmit*；默认：**receive**)  | 数据流方向 |
| **duration** (*time*；默认：) | 测试持续时间 |
| **interval** (*time: 20ms..5s*；默认：**1s**) | 报告之间的延迟（秒） |
| **local-tx-speed** (*integer 0..18446744073709551615*；默认： ) | 传输测试最大速度（比特每秒） |
| **local-udp-tx-size** (*integer: 28..64000*) | 本地发送数据包大小（字节） |
| **password** (*string*；默认：**""**) | 远程用户的密码 |
| **protocol** (*udp \| tcp*；默认：**udp**) | 要使用的协议 |
| **random-data** (*yes \| no*；默认：**no**) | 如果 random-data 设置为 yes，带宽测试数据包的负载将包含不可压缩的随机数据流，因此使用数据压缩的链路不会扭曲结果（这会大量消耗 CPU，对于低速 CPU 应将 random-data 设置为 no） |
| **remote-tx-speed** (*integer 0..18446744073709551615*；默认： ) | 接收测试最大速度（比特每秒） |
| **remote-udp-tx-size** (*integer: 28..64000*) | 远程发送数据包大小（字节） |
| **connection-count** (*integer 1..255*；默认：) | 要使用的 TCP 连接数 |
| **user** (*string*；默认：**""**) | 远程用户 |

### 示例 {#example-1}

要对 **10.0.0.32** 主机运行持续 15 秒的带宽测试，发送和接收 **1000** 字节的 UDP 数据包，并使用用户名 **admin** 连接：

```ros
[admin@MikroTik] /tool> bandwidth-test 10.0.0.32 duration=15s \
\... direction=both local-udp-tx-size=1000 protocol=udp \
\... remote-udp-tx-size=1000 user=admin
                status: done testing
              duration: 15s
            tx-current: 272.8Mbps
  tx-10-second-average: 200.3Mbps
      tx-total-average: 139.5Mbps
            rx-current: 169.6Mbps
  rx-10-second-average: 164.8Mbps
      rx-total-average: 117.0Mbps
          lost-packets: 373
           random-data: no
             direction: both
               tx-size: 1000
               rx-size: 1000
[admin@MikroTik] /tool>
```

### 链路本地 IPv6 示例 {#link-local-ipv6-example}

```ros
[admin@MikroTik] > /tool/bandwidth-test fe80::34:23ff:fe6a:570c%local
                status: running
              duration: 5s
            rx-current: 23.9Mbps
  rx-10-second-average: 15.1Mbps
      rx-total-average: 15.1Mbps
          lost-packets: 0
           random-data: no
             direction: receive
               rx-size: 1500
```
