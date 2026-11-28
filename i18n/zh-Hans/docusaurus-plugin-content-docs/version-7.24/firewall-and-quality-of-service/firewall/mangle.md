---
title: "Mangle"
description: "RouterOS 中的 Mangle 使用特殊标记标记数据包以进行高级处理，从而支持队列树和 NAT 等功能。它会修改 IP 标头字段，并通过五个预定义链（PREROUTING、INPUT、OUTPUT、FORWARD、POSTROUTING）根据数据包标记或连接状态应用规则。"
tags:
  - 'firewall-mangle'
  - 'ip-header-modification'
  - 'packet-marking'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/firewall/mangle
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Mangle 是一种“标记”机制，用于为数据包添加特殊标记，以便后续处理。RouterOS 中的许多其他功能都会使用这些标记，例如队列树、NAT、路由。它们根据数据包的标记识别数据包，并进行相应处理。Mangle 标记仅存在于路由器内部，不会通过网络传输。

此外，mangle 功能还用于修改 IP 头中的某些字段，例如 TOS（DSCP）和 TTL 字段。

防火墙 mangle 规则由五个无法删除的预定义链组成：

![](/img/741de7e87a2a3707.webp)

- **PREROUTING** 链：该链中的规则适用于刚到达网络接口的数据包。
- **INPUT** 链：该链中的规则适用于即将交给本地进程的数据包。
- **OUTPUT** 链：该链中的规则适用于刚由进程生成的数据包。
- **FORWARD** 链：该链中的规则适用于经由当前主机路由的任何数据包。
- **POSTROUTING** 链：该链中的规则适用于刚离开网络接口的数据包。

## 配置示例 {#configuration-example}

### 更改 MSS {#change-mss}

众所周知，由于封装开销，VPN 链路的数据包大小较小。MSS 超过 VPN 链路 MSS 的大数据包，在通过此类连接发送前应进行分片。但是，如果数据包设置了 *Don't Fragment* 标志，则无法分片，应将其丢弃。在路径 MTU 发现（PMTUD）异常的链路上，这可能导致多种问题，包括 FTP 和 HTTP 数据传输以及电子邮件服务问题。

对于 PMTUD 异常的链路，降低通过 VPN 链路的数据包的 MSS 可以解决该问题。以下示例演示如何通过 mangle 降低 MSS 值：

```ros
/ip/firewall/mangle/add out-interface=pppoe-out protocol=tcp tcp-flags=syn action=change-mss new-mss=1300 chain=forward tcp-mss=1301-65535
```

### 标记连接 {#marking-connections}

有时需要对属于特定连接的数据包执行某些操作（例如，为队列标记来自或发往特定主机的数据包），但检查每个数据包的 IP 头部是一项开销较大的任务。可以使用连接标记对配置进行一定程度的优化。

```ros
/ip/firewall/mangle
add chain=forward in-interface=local src-address=192.168.88.123 connection-state=new action=mark-connection new-connection-mark=client_conn
add chain=forward connection-mark=client_conn action=mark-packet new-packet-mark=client_p
```

:::danger
警告：数据包标记最多支持 4096 个唯一条目。超过此限制将导致错误“bad new packet mark”。
:::
