---
sidebar_key: "firewall-and-quality-of-service/firewall/mangle"
sidebar_position: 5
title: "Mangle"
sidebar_label: "Mangle"
description: "RouterOS 中的 Mangle 使用特殊标记来标记数据包，以便进行高级处理，从而支持 queue trees 和 NAT 等功能。它会修改 IP 报头字段，并通过五个预定义链（PREROUTING、INPUT、OUTPUT、FORWARD、POSTROUTING）运行，以根据数据包标记或连接状态应用规则。"
tags:
  - 'firewall-mangle'
  - 'ip-header-modification'
  - 'packet-marking'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/firewall/mangle
captured_at: '2026-11-04T11:28:13+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Mangle 是一种“标记器”，用于为数据包打上标记，以便后续使用特殊标记进行处理。RouterOS 中的许多其他功能都会使用这些标记，例如队列树、NAT、路由。它们根据数据包上的标记来识别数据包，并据此进行处理。mangle 标记仅存在于路由器内部，不会通过网络传输。

此外，mangle 功能还用于修改 IP 头中的某些字段，例如 TOS（DSCP）和 TTL 字段。

防火墙 mangle 规则由五个预定义链组成，这些链无法删除：

![](/img/741de7e87a2a3707.webp)

- **PREROUTING** 链：此链中的规则应用于数据包刚到达网络接口时。
- **INPUT** 链：此链中的规则应用于数据包即将交给本地进程之前。
- **OUTPUT** 链：此处的规则应用于数据包刚由进程生成之后。
- **FORWARD** 链：此处的规则应用于任何通过当前主机路由的数据包。
- **POSTROUTING** 链：此链中的规则应用于数据包刚离开网络接口时。

## 配置示例 {#configuration-example}

### 更改 MSS {#change-mss}

众所周知，由于封装开销，VPN 链路的数据包大小较小。如果大型数据包的 MSS 超过 VPN 链路的 MSS，则应在通过此类连接发送之前进行分片。但是，如果数据包设置了 *Don't Fragment* 标志，则无法对其进行分片，应将其丢弃。在路径 MTU 发现（PMTUD）损坏的链路上，这可能会导致许多问题，包括 FTP 和 HTTP 数据传输以及电子邮件服务的问题。

对于 PMTUD 损坏的链路，减小通过 VPN 链路的数据包的 MSS 可以解决该问题。以下示例演示如何通过 mangle 减小 MSS 值：

```ros
/ip/firewall/mangle/add out-interface=pppoe-out protocol=tcp tcp-flags=syn action=change-mss new-mss=1300 chain=forward tcp-mss=1301-65535
```

### 标记连接 {#marking-connections}

有时需要对属于特定连接的数据包执行某些操作（例如，为队列标记来自/发往特定主机的数据包），但检查每个数据包的 IP 头是一项相当昂贵的任务。我们可以使用连接标记来稍微优化设置。

```ros
/ip/firewall/mangle
add chain=forward in-interface=local src-address=192.168.88.123 connection-state=new action=mark-connection new-connection-mark=client_conn
add chain=forward connection-mark=client_conn action=mark-packet new-packet-mark=client_p
```

:::danger
警告：数据包标记最多限制为 4096 个唯一条目。超过此限制将导致错误 "bad new packet mark"。
:::
