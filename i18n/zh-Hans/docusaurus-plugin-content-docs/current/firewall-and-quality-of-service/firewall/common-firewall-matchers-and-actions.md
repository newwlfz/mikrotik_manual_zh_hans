---
sidebar_key: "firewall-and-quality-of-service/firewall/common-firewall-matchers-and-actions"
sidebar_position: 2
title: "常用防火墙匹配器和动作"
sidebar_label: "常用防火墙匹配器和动作"
description: "本页介绍 MikroTik RouterOS 防火墙统计信息与命令，详细说明如何查看 IPv4/IPv6 规则的匹配统计、重置计数器，并列出防火墙过滤中常用的匹配项，如 MAC 地址、接口、IP 范围和端口。"
tags:
  - 'firewall'
  - 'ipv6'
source: https://manual.mikrotik.com/docs/firewall-and-quality-of-service/firewall/common-firewall-matchers-and-actions
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 统计 {#stats}

要按防火墙规则查看匹配统计信息，请运行 `/ip/firewall/filter/print stats` 命令；对于 IPv6 防火墙，请运行 `/ipv6/firewall/filter/print stats`。

| 属性 | 描述 |
| :-- | :-- |
| **bytes** (*integer*) | 该规则匹配的 bytes 总量 |
| **packets** (*integer*) | 该规则匹配的 packets 总量 |

```text
[admin@MikroTik] > ip firewall filter print stats
Flags: X - disabled, I - invalid, D - dynamic
 #    CHAIN                                                                                                                 ACTION                            BYTES         PACKETS
 0  D ;;; special dummy rule to show fasttrack counters
      forward                                                                                                               passthrough              50 507 925 242      50 048 246
 1    ;;; defconf: drop invalid
      forward                                                                                                               drop                            432 270           9 719
 2    ;;; defconf: drop invalid
      input                                                                                                                 drop                            125 943           2 434
 3    input                                                                                                                 accept                   20 090 211 549      20 009 864
 4    ;;; defconf: accept ICMP
      input                                                                                                                 accept                          634 926           7 648
 5    ;;; defconf: drop all not coming from LAN
      input                                                                                                                 drop                          4 288 079          83 428
  6    ;;; defconf: accept in ipsec policy
       forward                                                                                                               accept                                0               0
  7    ;;; defconf: accept out ipsec policy
       forward                                                                                                               accept                                0               0
  8    ;;; defconf: fasttrack
       forward                                                                                                               fasttrack-connection     28 505 528 775      31 504 682
  9    ;;; defconf: accept established,related, untracked
       forward                                                                                                               accept                   28 505 528 775      31 504 682
 10    ;;; defconf: drop all from WAN not DSTNATed
      forward                                                                                                               drop                                  0               0
```

统计参数可通过以下命令重置：

| 命令 | 描述 |
| :-- | :-- |
| **reset-counters** (*id*) | 重置特定防火墙规则或规则列表的统计计数器。 |
| **reset-counters-all** | 重置表中所有防火墙规则的统计计数器。 |

## 其他有用命令 {#other-useful-commands}

默认情况下，print 等同于 `print static`，并且仅显示静态规则。

要同时打印动态规则，请使用 `print all`。

或者仅打印动态规则，请使用 `print dynamic`。

## 匹配器 {#matchers}

匹配器按特定顺序执行。

### 对于 IPv4 {#for-ipv4}

- 源 MAC 地址
- 入/出接口
- 入/出接口列表
- IP 范围
- 地址类型
- 地址列表
- TTL
- DSCP
- 长度
- TLS
- IPv4 选项
- 目的端口
- 源端口
- 任意端口
- TCP 选项
- TCP MSS
- ICMP 代码
- 入站优先级
- 优先级
- 数据包标记
- Realm（路由表）
- Hotspot
- 连接标记
- 连接状态
- 连接 NAT 状态
- 连接字节数
- 连接限制
- 连接速率
- Ipsec 策略
- Helper
- 字符串（内容）
- PSD
- Layer7
- 随机
- Nth
- PCC
- 限制
- 目的限制
- 日志

### 对于 IPv6 {#for-ipv6}

- 地址类型
- 地址列表
- 源 MAC 地址
- 入/出接口
- 入/出接口列表
- 跳数限制
- DSCP
- 长度
- TLS
- IPv6 报头
- 目的端口
- 源端口
- 任意端口
- TCP 选项
- TCP MSS
- ICMPv6 代码
- 入站优先级
- 优先级
- 数据包标记
- 连接标记
- 连接状态
- 连接 NAT 状态
- 连接字节数
- 连接限制
- 连接速率
- Ipsec 策略
- Helper
- 匹配字符串（内容）
- 随机
- Nth
- PCC
- 限制
- 目的限制
- 日志
