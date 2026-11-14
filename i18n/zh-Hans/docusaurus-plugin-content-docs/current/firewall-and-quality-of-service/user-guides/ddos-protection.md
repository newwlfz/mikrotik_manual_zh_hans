---
sidebar_key: "firewall-and-quality-of-service/user-guides/ddos-protection"
sidebar_position: 4
title: "DDoS 防护"
sidebar_label: "DDoS 防护"
description: "使用 RouterOS 防火墙规则限制拒绝服务攻击：使用 dst-limit 按源和目标统计新连接，将超过速率限制的配对放入地址列表，并在 raw 表中丢弃它们。涵盖检测的工作原理、其限制、保护路由器本身、使用 TCP SYN cookies 应对 SYN 洪泛，以及为什么 SYN-ACK 洪泛会作为无效流量被丢弃。"
tags:
  - 'firewall'
  - 'ddos'
  - 'syn-flood'
source: https://manual.mikrotik.com/docs/firewall-and-quality-of-service/user-guides/ddos-protection
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

拒绝服务（DoS）或分布式拒绝服务（DDoS）攻击是一种恶意行为，它通过向目标或其周边基础设施倾泻海量的互联网流量，试图扰乱目标服务器、服务或网络的正常流量。DDoS 攻击有多种类型，例如 HTTP 洪水、SYN 洪水和 DNS 放大。

![Diagram of a DDoS attack: an attacker controls a botnet of several computers, and all of them send traffic through the gateway to one victim server](/img/d7c46fdda6459931.jpg)

本页的防火墙规则会统计每个源地址与目标地址之间的新建连接。当某一对地址建立连接的速度超过配置的速率时，两个地址都会被加入地址列表，raw 表中的一条规则会在连接跟踪之前丢弃它们之间的流量，从而使洪水攻击给路由器带来的开销尽可能小。

路由器上的任何规则都无法抵御占满互联网链路本身的攻击：流量到达时已经消耗了带宽。此类攻击必须由你的 ISP 在上游进行过滤。

这些规则是对已正确配置的防火墙的补充，而不是替代它。基础内容请参见[保护你的路由器](../../getting-started/securing-your-router.md)。

## 检测并丢弃连接洪水 {#detect-and-drop-connection-floods}

```ros
/ip/firewall/filter
add chain=forward action=jump jump-target=detect-ddos \
    connection-state=new
add chain=detect-ddos action=return \
    dst-limit=32,32,src-and-dst-addresses/10s
add chain=detect-ddos action=add-dst-to-address-list \
    address-list=ddos-targets address-list-timeout=10m
add chain=detect-ddos action=add-src-to-address-list \
    address-list=ddos-attackers address-list-timeout=10m
/ip/firewall/raw
add chain=prerouting action=drop \
    src-address-list=ddos-attackers dst-address-list=ddos-targets
```

地址列表不必事先存在：当规则添加第一条条目时，RouterOS 会创建 `ddos-attackers` 和 `ddos-targets`。

在采用默认配置的路由器上，你可以把这条 jump 规则追加到 forward 链的末尾。已建立的连接会在链中更早的位置被接受，因此只有新建连接会到达这里：来自 LAN 的连接，以及来自互联网、被目的 NAT 规则转发到路由器后方主机的连接。

对于此类端口转发的服务，raw 规则不会匹配。raw 表在目的 NAT 之前处理数据包，因此它看到的目标是路由器的公网地址，而 `ddos-targets` 中保存的是路由器后方主机的地址。要同时丢弃这些洪水，请添加一条 filter 规则，在 NAT 之后、默认 fasttrack 规则之前丢弃已列入列表的地址对：

```ros
/ip/firewall/filter/add chain=forward action=drop \
    src-address-list=ddos-attackers dst-address-list=ddos-targets \
    comment="drop DDoS pairs after destination NAT" \
    place-before=[find comment="defconf: fasttrack"]
```

### 检测的工作原理 {#how-the-detection-works}

1. 第一条规则把经过路由器的每个新建连接送入 `detect-ddos` 链。
2. 只要该地址对保持在 `dst-limit=32,32,src-and-dst-addresses/10s` 的限制之内，`return` 规则就会把连接送回 forward 链。格式为 `rate[/time],burst,mode[/expire]`：
   - `32` - 速率：每秒 32 个新建连接（时间间隔默认为一秒）。
   - `32` - 突发量：一个地址对可以无需等待地建立 32 个连接；额度按速率恢复，最多恢复到突发量。
   - `src-and-dst-addresses` - 每个源地址与目标地址对单独计数。
   - `10s` - 某个地址对若 10 秒内没有发送任何数据，就会被遗忘。
3. 当某个地址对超出限制时，`return` 规则不再匹配。接下来的两条规则会把目标地址加入 `ddos-targets`，把源地址加入 `ddos-attackers`，有效期均为 10 分钟。
4. raw 规则会丢弃从任何已列入列表的攻击者发往任何已列入列表的目标的所有流量，直到条目过期。对于端口转发的目标，则由上一节的 filter 规则来丢弃。

使用这些规则时，某个源地址以最快速度向某个目标地址发起新建连接，会有略多于 32 个连接通过：突发量加上突发期间速率所允许的连接数。下一个连接会把两个地址都加入列表，此后 raw 规则就会丢弃它们之间的所有流量。

### 检测的局限 {#limits-of-the-detection}

- 速率是按每个源地址与目标地址对计数的。如果来自多个源地址的攻击各自保持在每秒 32 个新建连接以下，就不会被检测到。
- 一个繁忙的合法客户端，例如代理服务器或某个办公室的 NAT 网关，向同一台服务器可能超过每秒 32 个新建连接。请提高速率，或者在 jump 规则之前接受来自此类地址的连接。
- 这些规则只监视转发的流量（`chain=forward`）。若要同时监视发往路由器自身的连接，请把同样的 jump 规则添加到 input 链：

  ```ros
  /ip/firewall/filter/add chain=input action=jump \
      jump-target=detect-ddos connection-state=new
  ```

### 检查与解除封锁 {#check-and-unblock}

列出检测到的地址对以及每个条目剩余的时间，并查看 raw 规则（以及对于端口转发服务而言的 filter 规则）丢弃了多少数据包：

```ros
/ip/firewall/address-list/print where list~"^ddos-"
/ip/firewall/raw/print stats
/ip/firewall/filter/print stats where comment~"DDoS pairs"
```

要释放某个被误列入列表的地址，请从两个列表中删除它的条目：

```ros
/ip/firewall/address-list/remove \
    [find list~"^ddos-" address=198.51.100.7]
```

## 防御 SYN 洪水 {#protect-against-syn-floods}

SYN 洪水是一种 DoS 攻击形式，攻击者向目标系统连续发送大量 SYN 请求，试图消耗足够的服务器资源，使系统无法响应合法流量。对于路由器自身的 TCP 服务，请开启 TCP SYN cookies（默认值为 `no`）：

```ros
/ip/settings/set tcp-syncookies=yes
```

此后，当某个套接字的 SYN 积压队列溢出时，RouterOS 会发送 SYN cookie。SYN cookie 是一个包含小型加密哈希的 SYN-ACK 数据包，响应的客户端会在其 ACK 数据包中回显该哈希。如果路由器在回复数据包中看不到这个 cookie，就会把该连接视为伪造并丢弃。SYN cookies 会阻止使用 TCP 扩展，这可能使某些服务降级，例如 SMTP 中继。

## SYN-ACK 洪水 {#syn-ack-floods}

SYN-ACK 洪水是一种攻击方法，它向目标服务器高速发送伪造的 SYN-ACK 数据包。服务器需要大量资源来乱序处理这些数据包（在通常的 SYN、SYN-ACK、ACK TCP 三次握手之外）。它可能忙于处理攻击流量，以致无法处理合法流量，攻击者由此达成 DoS/DDoS 状态。

不属于任何已跟踪连接的 SYN-ACK 具有 `connection-state=invalid`，在 `loose-tcp-tracking=yes`（默认值）时也是如此。此类数据包永远不会到达 `detect-ddos` 链，因为该链只能看到新建连接。默认配置会在 input 和 forward 链中丢弃无效数据包；请保留这些规则以阻止 SYN-ACK 洪水。

## 相关主题 {#related-topics}

- [SSH 暴力破解防护](./bruteforce-prevention.md)以相同的方式使用地址列表，保护路由器自身的 SSH 服务免遭密码猜测。
- [端口敲门](./port-knocking.md)让管理端口保持关闭，直到客户端发送正确的连接尝试序列。
- [连接跟踪](../connection-tracking.md)解释了这些规则所匹配的连接状态。

关于所有规则属性，请参见 CLI 参考中的 [`/ip/firewall/filter`](../../cli-reference/ip/firewall/filter/index.md)、[`/ip/firewall/raw`](../../cli-reference/ip/firewall/raw/index.md) 和 [`/ip/settings`](../../cli-reference/ip/settings.md)。
