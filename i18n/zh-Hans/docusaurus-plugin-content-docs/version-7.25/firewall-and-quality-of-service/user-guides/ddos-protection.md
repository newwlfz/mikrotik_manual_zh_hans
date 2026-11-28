---
title: "DDoS 防护"
description: "使用 RouterOS 防火墙规则限制拒绝服务攻击：通过 dst-limit 统计每个源和目的地的新连接，将超过速率的配对加入地址列表，并在 raw 表中丢弃它们。介绍检测机制、其限制、保护路由器本身、使用 TCP SYN cookies 防御 SYN 泛洪，以及为何 SYN-ACK 泛洪会因无效而被丢弃。"
tags:
  - 'firewall'
  - 'ddos'
  - 'syn-flood'
source: https://manual.mikrotik.com/docs/7.25/firewall-and-quality-of-service/user-guides/ddos-protection
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

拒绝服务（DoS）或分布式拒绝服务（DDoS）攻击是一种恶意行为，通过大量互联网流量淹没目标或其周边基础设施，破坏目标服务器、服务或网络的正常流量。DDoS 攻击有多种类型，例如 HTTP flood、SYN flood 和 DNS amplification。

![Diagram of a DDoS attack: an attacker controls a botnet of several computers, and all of them send traffic through the gateway to one victim server](/img/d7c46fdda6459931.jpg)

本页中的防火墙规则会统计每个源地址与目标地址之间的新连接。当一对地址建立连接的速度超过配置的速率时，两个地址都会被加入地址列表，并且 raw 表中的规则会在连接跟踪之前丢弃它们之间的流量，从而使 flood 对路由器的消耗尽可能小。

对于占满互联网连接本身的攻击，路由器上的任何规则都无法提供帮助：流量到达时已经占用了带宽。此类攻击必须由 ISP 在上游进行过滤。

这些规则是对正确配置的防火墙的补充，不能替代防火墙。基础知识请参阅 [Securing your router](/docs/getting-started/securing-your-router)。

## 检测并丢弃连接 flood {#detect-and-drop-connection-floods}

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

地址列表无需预先存在：当规则添加第一个条目时，RouterOS 会创建 `ddos-attackers` 和 `ddos-targets`。

在采用默认配置的路由器上，可以将跳转规则追加到 forward 链末尾。已建立的连接会在链中较早位置被接受，因此只有新连接会到达该规则：来自 LAN 的连接，以及来自互联网且由 destination NAT 规则转发到路由器后方主机的连接。

对于此类端口转发服务，raw 规则不会匹配。raw 表在 destination NAT 之前处理数据包，因此它看到的目标是路由器的公网地址，而 `ddos-targets` 保存的是路由器后方主机的地址。要同时丢弃这些 flood，请添加一条 filter 规则，在 NAT 之后、默认 fasttrack 规则之前丢弃列表中的地址对：

```ros
/ip/firewall/filter/add chain=forward action=drop \
    src-address-list=ddos-attackers dst-address-list=ddos-targets \
    comment="drop DDoS pairs after destination NAT" \
    place-before=[find comment="defconf: fasttrack"]
```

### 检测工作原理 {#how-the-detection-works}

1. 第一条规则将经过路由器的每个新连接发送到 `detect-ddos` 链。
2. 只要地址对保持在 `dst-limit=32,32,src-and-dst-addresses/10s` 的限制内，`return` 规则就会将连接返回到 forward 链。格式为 `rate[/time],burst,mode[/expire]`：
   - `32` - 速率：每秒 32 个新连接（时间间隔默认为 1 秒）。
   - `32` - 突发：一个地址对无需等待即可建立 32 个连接；配额按速率补充，最多补充到突发值。
   - `src-and-dst-addresses` - 每个源地址和目的地址对分别计数。
   - `10s` - 某个地址对 10 秒内未发送任何内容时，将被遗忘。
3. 当某个地址对超过限制时，`return` 规则不再匹配。接下来的两条规则会将目的地址加入 `ddos-targets`，将源地址加入 `ddos-attackers`，两者均保留 10 分钟。
4. raw 规则会丢弃任何列出的攻击者发往任何列出的目标的所有流量，直到条目过期。对于端口转发的目标，则由上一节的 filter 规则丢弃流量。

使用这些规则时，一个源地址以尽可能快的速度向一个目的地址建立新连接，会通过略多于 32 个连接：突发值加上突发期间速率允许的连接数。下一个连接会将两个地址加入列表，此后 raw 规则会丢弃它们之间的所有流量。

### 检测的局限性 {#limits-of-the-detection}

- 速率按源地址和目的地址对计数。来自许多源地址、且每个源地址都低于每秒 32 个新连接的攻击不会被检测到。
- 繁忙的合法客户端，例如代理或办公室的 NAT 网关，向一台服务器建立连接时可能超过每秒 32 个新连接。请提高速率，或在跳转规则之前接受来自此类地址的连接。
- 这些规则仅监控转发的流量（`chain=forward`）。如需同时监控发往路由器本身的连接，请向 input 链添加相同的跳转规则：

  ```ros
  /ip/firewall/filter/add chain=input action=jump \
      jump-target=detect-ddos connection-state=new
  ```

### 检查和解除封锁 {#check-and-unblock}

列出检测到的地址对以及每个条目的剩余时间，并查看 raw 规则（对于端口转发服务，还包括 filter 规则）丢弃了多少数据包：

```ros
/ip/firewall/address-list/print where list~"^ddos-"
/ip/firewall/raw/print stats
/ip/firewall/filter/print stats where comment~"DDoS pairs"
```

要释放被错误加入列表的地址，请从两个列表中删除其条目：

```ros
/ip/firewall/address-list/remove \
    [find list~"^ddos-" address=198.51.100.7]
```

## 防范 SYN 洪水攻击 {#protect-against-syn-floods}

SYN 洪水攻击是一种 DoS 攻击，攻击者向目标系统连续发送 SYN 请求，试图消耗足够的服务器资源，使系统无法响应合法流量。对于路由器自身的 TCP 服务，请启用 TCP SYN cookies（默认值为 `no`）：

```ros
/ip/settings/set tcp-syncookies=yes
```

随后，当某个 socket 的 SYN backlog 队列溢出时，RouterOS 会发送 SYN cookies。SYN cookie 是包含小型加密哈希的 SYN-ACK 数据包，响应的客户端会在其 ACK 数据包中回传该哈希。如果路由器在回复数据包中未看到此 cookie，则会将该连接视为伪造连接并丢弃。SYN cookies 会阻止使用 TCP 扩展，这可能降低某些服务的性能，例如 SMTP 中继。

## SYN-ACK 洪水攻击 {#syn-ack-floods}

SYN-ACK 洪水攻击是一种攻击方法，涉及以高速率向目标服务器发送伪造的 SYN-ACK 数据包。服务器需要大量资源来处理这些乱序数据包（超出通常的 SYN、SYN-ACK、ACK TCP 三次握手范围）。服务器可能因处理攻击流量而变得非常繁忙，无法处理合法流量，攻击者从而实现 DoS/DDoS 状态。

不属于任何已跟踪连接的 SYN-ACK 具有 `connection-state=invalid`，即使使用默认值 `loose-tcp-tracking=yes` 也是如此。此类数据包永远不会到达 `detect-ddos` 链，该链只处理新连接。默认配置会在 input 和 forward 链中丢弃无效数据包；请保留这些规则以阻止 SYN-ACK 洪水攻击。

## 相关主题 {#related-topics}

- [SSH 暴力破解防护](/docs/firewall-and-quality-of-service/user-guides/bruteforce-prevention)以相同方式使用地址列表，保护路由器自身的 SSH 服务免受密码猜测攻击。
- [端口敲门](/docs/firewall-and-quality-of-service/user-guides/port-knocking)使管理端口保持关闭，直到客户端发送正确的连接尝试序列。
- [连接跟踪](/docs/firewall-and-quality-of-service/connection-tracking)说明规则匹配的连接状态。

有关所有规则属性，请参阅 CLI 参考中的 [`/ip/firewall/filter`](/docs/cli-reference/ip/firewall/filter)、[`/ip/firewall/raw`](/docs/cli-reference/ip/firewall/raw) 和 [`/ip/settings`](/docs/cli-reference/ip/settings)。
