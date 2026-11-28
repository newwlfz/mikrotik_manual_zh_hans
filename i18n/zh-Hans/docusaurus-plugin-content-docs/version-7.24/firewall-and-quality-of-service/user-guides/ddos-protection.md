---
title: "DDoS 防护"
description: "本页介绍 MikroTik RouterOS DDoS 防护配置，涵盖用于检测和阻断 HTTP flood、SYN flood、DNS amplification 等多种攻击类型的防火墙规则。其中包括地址列表、防火墙链以及特定 TCP SYN cookie 设置的详细配置示例，用于缓解 DoS/DDoS 攻击。"
tags:
  - 'firewall'
  - 'ddos'
  - 'syn-flood'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/user-guides/ddos-protection
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

拒绝服务（DoS）或分布式拒绝服务（DDoS）攻击是一种恶意行为，通过大量 Internet 流量淹没目标或其周边基础设施，破坏目标服务器、服务或网络的正常流量。DDoS 攻击有多种类型，例如 HTTP flood、SYN flood、DNS amplification 等。

![](/img/d7c46fdda6459931.jpg)

## 防范 DDoS {#protection-against-ddos}

### 配置行 {#configuration-lines}

:::warning
这些规则仅用于增强防火墙，不要忘记正确保护设备安全。
:::

```ros
/ip/firewall/address-list
add list=ddos-attackers
add list=ddos-targets
/ip/firewall/filter
add chain=forward connection-state=new action=jump jump-target=detect-ddos
add action=return chain=detect-ddos dst-limit=32,32,src-and-dst-addresses/10s
add action=add-dst-to-address-list address-list=ddos-targets address-list-timeout=10m chain=detect-ddos
add action=add-src-to-address-list address-list=ddos-attackers address-list-timeout=10m chain=detect-ddos
/ip/firewall/raw
add action=drop chain=prerouting dst-address-list=ddos-targets src-address-list=ddos-attackers
```

### 配置说明 {#configuration-explained}

首先，将每个新连接发送到特定的防火墙链，在该链中检测 DDoS：

```ros
/ip/firewall/filter/add chain=forward connection-state=new action=jump jump-target=detect-ddos
```

在新创建的链中，添加以下带有 "dst-limit" 参数的规则。该参数采用以下格式：**dst-limit=****count[/time],burst,mode[/expire]**。基于目的地址和源地址流匹配 32 个数据包，突发值为 32 个数据包，每 10 秒更新一次。该规则将在超过指定速率前生效。

```ros
/ip/firewall/filter/add chain=detect-ddos dst-limit=32,32,src-and-dst-addresses/10s action=return
```

到目前为止，所有合法流量都应通过 "action=return"，但在 DoS/DDoS 情况下，"dst-limit" 缓冲区将被填满，规则将无法“捕获”任何新流量。接下来用于处理攻击的规则登场。首先创建一个用于攻击者和受害者的列表，我们将丢弃其中的流量：

```ros
/ip/firewall/address-list/add list=ddos-attackers
/ip/firewall/address-list/add list=ddos-targets
/ip/firewall/raw/add chain=prerouting action=drop src-address-list=ddos-attackers dst-address-list=ddos-targets
```

在 firewall filter 部分，将攻击者添加到“DDoS-attackers”列表，将受害者添加到“ddos-targets”列表：

```ros
/ip/firewall/filter
add action=add-dst-to-address-list address-list=ddos-targets address-list-timeout=10m chain=detect-ddos
add action=add-src-to-address-list address-list=ddos-attackers address-list-timeout=10m chain=detect-ddos
```

## SYN 攻击 {#syn-attack}

### SYN Flood

SYN flood 是一种 DoS 攻击，攻击者向目标系统发送大量连续的 SYN 请求，试图消耗足够的服务器资源，使系统无法响应合法流量。幸运的是，在 RouterOS 中，针对此类攻击有一项专门功能：

```ros
/ip/settings/set tcp-syncookies=yes
```

该功能通过发回包含少量加密哈希的 SYN-ACK 数据包来工作，响应的客户端会在其 ACK 数据包中将其作为一部分回显。如果内核在回复数据包中看不到此“cookie”，则会认为该连接是伪造的并丢弃它。

### SYN-ACK Flood

SYN-ACK flood 是一种攻击方法，涉及以高速率向目标服务器发送伪造的 SYN-ACK 数据包。服务器需要大量资源来处理此类乱序数据包（不符合正常的 SYN、SYN-ACK、ACK TCP 三次握手机制）。服务器可能因处理攻击流量而过于繁忙，无法处理合法流量，攻击者从而实现 DoS/DDoS 状态。在 RouterOS 中，可以基于前面提到的示例配置类似规则，但更专门针对 SYN-ACK flood：

```ros
/ip/firewall/filter/add action=return chain=detect-ddos dst-limit=32,32,src-and-dst-addresses/10s protocol=tcp tcp-flags=syn,ack
```
