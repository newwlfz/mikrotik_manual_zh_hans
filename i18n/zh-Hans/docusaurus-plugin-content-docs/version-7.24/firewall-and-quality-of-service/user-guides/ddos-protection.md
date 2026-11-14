---
sidebar_key: "firewall-and-quality-of-service/user-guides/ddos-protection"
sidebar_position: 4
title: "DDoS 防护"
sidebar_label: "DDoS 防护"
description: "本页介绍 MikroTik RouterOS 的 DDoS 防护配置，涵盖用于检测和阻止 HTTP floods、SYN floods 和 DNS amplification 等各类攻击的防火墙规则。内容包括 address lists、firewall chains 以及特定 TCP SYN cookie 设置的详细配置示例，以缓解 DoS/DDoS 攻击。"
tags:
  - 'firewall'
  - 'ddos'
  - 'syn-flood'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/user-guides/ddos-protection
captured_at: '2026-11-04T11:28:28+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

拒绝服务（DoS）或分布式拒绝服务（DDoS）攻击是一种恶意尝试，通过用大量互联网流量淹没目标或其周边基础设施，来干扰目标服务器、服务或网络的正常流量。DDoS 攻击有多种类型，例如 HTTP 泛洪、SYN 泛洪、DNS 放大等。

![](/img/d7c46fdda6459931.jpg)

## DDoS 防护 {#protection-against-ddos}

### 配置命令 {#configuration-lines}

:::warning
这些规则只是对防火墙的改进，请不要忘记正确保护你的设备。
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

首先，我们会把每个新连接发送到特定的防火墙链中，并在那里检测 DDoS：

```ros
/ip/firewall/filter/add chain=forward connection-state=new action=jump jump-target=detect-ddos
```

在新建的链中，我们会添加以下带有 "dst-limit" 参数的规则。该参数的格式如下：**dst-limit=****count[/time],burst,mode[/expire]**。我们会根据目标地址和源地址流，匹配 32 个数据包，突发为 32 个数据包，每 10 秒更新一次。该规则会一直生效，直到超过给定速率。

```ros
/ip/firewall/filter/add chain=detect-ddos dst-limit=32,32,src-and-dst-addresses/10s action=return
```

到目前为止，所有合法流量都应通过 "action=return"，但在 DoS/DDoS 的情况下，"dst-limit" 缓冲区会被填满，规则将不再“捕获”任何新流量。接下来是处理攻击的后续规则。我们先为要丢弃的攻击者和受害者创建列表：

```ros
/ip/firewall/address-list/add list=ddos-attackers
/ip/firewall/address-list/add list=ddos-targets
/ip/firewall/raw/add chain=prerouting action=drop src-address-list=ddos-attackers dst-address-list=ddos-targets
```

通过防火墙过滤规则部分，我们会把攻击者添加到 "DDoS-attackers"，把受害者添加到 "ddos-targets" 列表：

```ros
/ip/firewall/filter
add action=add-dst-to-address-list address-list=ddos-targets address-list-timeout=10m chain=detect-ddos
add action=add-src-to-address-list address-list=ddos-attackers address-list-timeout=10m chain=detect-ddos
```

## SYN 攻击 {#syn-attack}

### SYN 泛洪 {#syn-flood}

SYN 泛洪是一种 DoS 攻击形式，攻击者向目标系统发送一连串 SYN 请求，试图消耗足够的服务器资源，使系统无法响应合法流量。幸运的是，RouterOS 针对此类攻击提供了特定功能：

```ros
/ip/settings/set tcp-syncookies=yes
```

该功能的工作方式是发回包含少量加密哈希的 SYN-ACK 数据包，响应客户端会在其 ACK 数据包中回显该哈希。如果内核在回复数据包中看不到这个“cookie”，就会认为连接是伪造的并将其丢弃。

### SYN-ACK 泛洪 {#syn-ack-flood}

SYN-ACK 泛洪是一种攻击方法，它以高速率向目标服务器发送伪造的 SYN-ACK 数据包。服务器需要大量资源来乱序处理此类数据包（不符合正常的 SYN、SYN-ACK、ACK TCP 三次握手机制）。服务器可能忙于处理攻击流量，以至于无法处理合法流量，因此攻击者便实现了 DoS/DDoS 状态。在 RouterOS 中，我们可以配置前面示例中的类似规则，但更针对 SYN-ACK 泛洪：

```ros
/ip/firewall/filter/add action=return chain=detect-ddos dst-limit=32,32,src-and-dst-addresses/10s protocol=tcp tcp-flags=syn,ack
```
