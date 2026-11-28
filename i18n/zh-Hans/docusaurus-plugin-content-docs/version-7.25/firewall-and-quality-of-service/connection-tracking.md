---
title: "连接跟踪"
description: "MikroTik RouterOS 中的连接跟踪通过监控逻辑网络连接实现有状态防火墙功能，支持 NAT 和多种防火墙特性。它将数据包分配到 new、established、related、invalid 或 untracked 等状态，并通过 FastTrack 优化 TCP/UDP 数据包转发。"
tags:
  - 'connection-tracking'
  - 'firewall'
  - 'fasttrack'
source: https://manual.mikrotik.com/docs/7.25/firewall-and-quality-of-service/connection-tracking
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "firewall-and-quality-of-service/queues"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

连接跟踪允许内核跟踪所有逻辑网络连接或会话，并因此关联可能组成该连接的所有数据包。

NAT 依赖这些信息，以相同方式转换所有相关数据包。

由于连接跟踪，即使使用 UDP 等无状态协议，也可以使用有状态防火墙功能。

### 受连接跟踪影响的防火墙功能 {#firewall-features-affected-by-connection-tracking}

- NAT
- 防火墙：
  - connection-bytes
  - connection-mark
  - connection-type
  - connection-state
  - connection-limit
  - connection-rate
  - layer7-protocol
  - new-connection-mark
  - tarpit

可在 `/ip/firewall/connection` 中查看 IPv4 的已跟踪连接列表，在 `/ipv6/firewall/connection` 中查看 IPv6 的已跟踪连接列表。

```text
      [admin@3C22-atombumba] /ip/firewall/connection> print
      Flags: S - seen-reply, A - assured
      #    PR.. SRC-ADDRESS           DST-ADDRESS           TCP-STATE   TIMEOUT
      0    udp  10.5.8.176:5678       255.255.255.255:5678              0s
      1    udp  10.5.101.3:646        224.0.0.2:646                     5s
      2    ospf 10.5.101.161          224.0.0.5                         9m58s
      3    udp  10.5.8.140:5678       255.255.255.255:5678              8s
      4 SA tcp  10.5.101.147:48984    10.5.101.1:8291       established 4m59s

```

```text
      [admin@3C22-atombumba] /ipv6/firewall/connection> print
      Flags: S - seen reply, A - assured
      #    PRO.. SRC-ADDRESS                 DST-ADDRESS                 TCP-STATE
      0    udp   fe80::d6ca:6dff:fe77:3698   ff02::1
      1    udp   fe80::d6ca:6dff:fe98:7c28   ff02::1
      2    ospf  fe80::d6ca:6dff:fe73:9822   ff02::5

```

## 连接状态 {#connection-states}

根据连接表条目，到达的数据包可被分配以下连接状态之一：**new、invalid、established、related** 或 **untracked**。

数据包被视为 **new** 有两种不同情况。第一种是无状态连接（如 UDP），此时连接表中没有连接条目。另一种是有状态协议（TCP），此时启动新连接的新数据包始终是带有 *SYN* 标志的 TCP 数据包。

如果数据包不是 new，它可能属于 ***established*** 或 ***related*** 连接，也可能不属于任何连接，从而被视为 ***invalid***。正如多数人已经猜到的，具有 ***established*** 状态的数据包属于连接跟踪表中的现有连接。***related*** 状态与之非常相似，区别在于数据包属于与某个现有连接相关的连接，例如 ICMP 错误数据包或 FTP 数据连接数据包。

连接状态 **untracked** 是一种特殊情况，即使用 **RAW** 防火墙规则将连接排除在连接跟踪之外。该规则会使所有转发流量绕过连接跟踪，从而提高设备的数据包处理速度。

任何其他数据包都被视为 ***invalid***，在大多数情况下应丢弃。

基于这些信息，可以设置一组基础过滤规则，通过接受 *established/related* 数据包、丢弃 *invalid* 数据包，并仅对 *new* 数据包执行更详细的过滤，来加快数据包过滤速度并降低 CPU 负载。

```ros
/ip/firewall/filter
add chain=input connection-state=invalid action=drop comment="Drop Invalid connections"
add chain=input connection-state=established,related,untracked action=accept comment="Allow Established/Related/Untracked connections"
```

:::danger
此类规则集不得应用于存在非对称路由的路由器，因为非对称路由的数据包可能被视为 invalid 并被丢弃。
:::

## FastTrack

IPv4 FastTrack 是一种特殊处理程序，可绕过 Linux 设施，从而加快数据包转发。该处理程序用于通过 `fasttrack-connection` 操作标记的 **TCP** 和 **UDP** 连接。IPv4 FastTrack 处理程序支持 NAT（SNAT、DNAT 或两者）。

请注意，并非连接中的所有数据包都能被 FastTrack，因此即使连接已标记为 FastTrack，也可能看到部分数据包经过慢速路径。这就是 **fasttrack-connection** 后面通常会跟随一条相同的 `action=accept` 规则的原因。

经过 FastTrack 的数据包会绕过：

- 防火墙。
- 连接跟踪。
- 简单队列。
- 使用 *parent=global* 的队列树。
- IP 计费。
- IPSec。
- Hotspot universal client。
- VRF 分配。

管理员需要确保 FastTrack 不会干扰其他配置。

### 要求 {#requirements}

满足以下条件时，IPv4 FastTrack 处于活动状态：

- 未配置 mesh、metarouter 接口。
- Sniffer、torch 或 traffic generator 未运行。
- *`/tool/mac-scan`* 未在使用中。
- *`/tool/ip-scan`* 未在使用中。
- FastPath 和 Route cache 在 *IP/Settings* 下已启用。

### 示例 {#example}

例如，对于采用出厂默认配置的 SOHO 路由器，可以将这条规则放在 Firewall Filter 顶部，对所有 LAN 流量启用 FastTrack。还需要相同的配置 accept 规则：

```ros
/ip/firewall/filter/add chain=forward action=fasttrack-connection connection-state=established,related
/ip/firewall/filter/add chain=forward action=accept connection-state=established,related
```

:::tip

- 连接会保持 FastTrack 状态，直到连接关闭、超时或路由器重启。
- 只有在删除或禁用 FastTrack 防火墙规则并重启路由器后，Dummy 规则才会消失。
- 当设备上同时启用 FastPath 和 FastTrack 时，同一时间只能有一个处于活动状态。

**警告：** 队列（父级为接口的 Queue Tree 除外）、防火墙过滤规则和 mangle 规则不会应用于 FastTrack 流量。
:::

## 连接跟踪设置 {#connection-tracking-settings}

连接跟踪设置通过 `/ip/firewall/connection/tracking` 菜单管理。

#### 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| <strong>enabled</strong> (<em>yes &#124; no &#124; auto</em>；默认：<strong>auto</strong>) | 允许禁用或启用连接跟踪。禁用连接跟踪后，上面列出的防火墙功能将停止工作。如果设置为“auto”，则在至少添加一条防火墙规则之前，连接跟踪处于禁用状态。 |
| <strong>liberal-tcp-tracking</strong> (<em>yes &#124; no;</em> 默认：<strong>no</strong>) | 通过切换内核参数 <code>nf_conntrack_tcp_be_liberal</code> 启用或禁用宽松 TCP 连接跟踪。设置为 <strong>yes</strong> 时，系统仅将窗口外的 RST 段标记为 INVALID。<br/><br/><strong>注意：</strong> 启用此设置可能允许原本会被防火墙 <code>connection-state</code> 匹配器视为 <code>invalid</code> 的畸形数据包通过。这会增加遭受某些规避技术的风险。仅在故障排除或处理已知问题时启用此属性。<br/> |
| <strong>loose-tcp-tracking</strong> (*yes | no*；默认：<strong>yes</strong>) |  |
| <strong>tcp-syn-sent-timeout</strong> (<em>time</em>；默认：<strong>5s</strong>) | TCP SYN 超时时间。 |
| <strong>tcp-syn-received-timeout</strong> (<em>time</em>；默认：<strong>5s</strong>) | TCP SYN 超时时间。 |
| <strong>tcp-established-timeout</strong> (<em>time</em>；默认：<strong>1d</strong>) | 已建立 TCP 连接超时前经过的时间。 |
| <strong>tcp-fin-wait-timeout</strong> (<em>time</em>；默认：<strong>10s</strong>) |  |
| <strong>tcp-close-wait-timeout</strong> (<em>time</em>；默认：<strong>10s</strong>) |  |
| <strong>tcp-last-ack-timeout</strong> (<em>time</em>；默认：<strong>10s</strong>) |  |
| <strong>tcp-time-wait-timeout</strong> (<em>time</em>；默认：<strong>10s</strong>) |  |
| <strong>tcp-close-timeout</strong> (<em>time</em>；默认：<strong>10s</strong>) |  |
| <strong>udp-timeout</strong> (<em>time</em>；默认：<strong>30s</strong>) | 指定仅在一个方向上出现过数据包的 UDP 连接的超时时间。 |
| <strong>udp-stream-timeout</strong> (<em>time</em>；默认：<strong>3m</strong>) | 指定在两个方向上都出现过数据包的 UDP 连接的超时时间。 |
| <strong>icmp-timeout</strong> (<em>time</em>；默认：<strong>10s</strong>) | ICMP 连接超时时间。 |
| <strong>generic-timeout</strong> (<em>time</em>；默认：<strong>10m</strong>) | 所有其他连接条目的超时时间。 |
| tcp-max-retrans-timeout |  |
| tcp-unacked-timeout |  |

**只读属性**

| 属性 | 说明 |
| :-- | :-- |
| **max-entries** (*integer*) | 连接跟踪表可容纳的最大条目数。该值取决于已安装的 RAM 容量。<br/> 请注意，系统启动时不会创建最大尺寸的连接跟踪表；如有需要且系统仍有空闲 RAM，该表可能会增大，但大小不会超过 1048576 |
| **total-entries** (*integer*) | 连接表当前保存的连接数 |
| active-ipv4  | |
| active-ipv6  | |
| total-ip4-entries  | |
| total-ip6-entries  | |

## 连接列表 {#connection-list}

可在 `/ip/firewall/connection` 中查看 IPv4 的已跟踪连接列表，在 `/ipv6/firewall/connection` 中查看 IPv6 的已跟踪连接列表。

### 属性 {#properties-1}

连接列表中的所有属性均为只读

| 属性 | 说明 |
| :-- | :-- |
| **assured** (*yes \| no*) | 表示该连接已确认，并且当达到可跟踪连接数的最大可能值时不会被清除。 |
| **confirmed** (*yes \| no*) | 连接已确认，并且数据包已从设备发出 |
| **connection-mark** (*string*) | 由 mangle 规则设置的连接标记。 |
| **connection-type** (*pptp \| ftp*) | 连接类型，如果连接跟踪无法确定预定义的连接类型，则该属性为空。 |
| **dst-address** (*ip*) | 目标地址。 |
| **dst-port**(*integer*) | 目标端口。 |
| **dstnat** (*yes \| no*) | 连接已经过 DST-NAT（例如，端口转发）。 |
| **dying** (*yes \| no*) | 连接因连接超时而即将结束。 |
| **expected** (*yes \| no*) | 连接使用连接辅助器（预定义服务规则）建立。 |
| **fasttrack** (*yes \| no*) | 连接是否已被 FastTracked。 |
| **gre-key** (*integer*) | GRE Key 字段的内容。 |
| **gre-protocol** (*string*) | 封装载荷的协议。 |
| **gre-version** (*string*) | 连接中使用的 GRE 协议版本。 |
| **hw-offload**(*yes \| no*) | 硬件卸载的连接。 |
| **icmp-code** (*string*) | ICMP Code 字段 |
| **icmp-id** (*integer*) | 包含 ICMP ID |
| **icmp-type** (*integer*) | ICMP Type 编号 |
| **orig-bytes** (*integer*) | 使用该特定连接从源地址发出的字节数。 |
| **orig-fasttrack-bytes** (*integer*) | 使用该特定连接从源地址发出的 FastTracked 字节数。 |
| **orig-fasttrack-packets** (*integer*) | 使用该特定连接从源地址发出的 FastTracked 数据包数。 |
| **orig-packets** (*integer*) | 使用该特定连接从源地址发出的数据包数。 |
| **orig-rate** (*integer*) | 使用该特定连接从源地址发出数据包的数据速率。 |
| **protocol** (*string*) | IP 协议类型 |
| **repl-bytes** (*integer*) | 使用该特定连接从目标地址接收的字节数。 |
| **repl-fasttrack-bytes** (*integer*) | 使用该特定连接从目标地址接收的 FastTracked 字节数。 |
| **repl-fasttrack-packets** (*integer*) | 使用该特定连接从目标地址接收的 FastTracked 数据包数。 |
| **repl-packets** (*integer*) | 使用该特定连接从目标地址接收的数据包数。 |
| **repl-rate** (*string*) | 使用该特定连接从目标地址接收数据包的数据速率。 |
| **reply-dst-address** (*ip*) | 返回数据包预期的目标地址。 |
| **reply-dst-port**(*integer*) | 返回数据包预期的目标端口。 |
| **reply-src-address** (*ip*) | 返回数据包预期的源地址。 |
| ****reply-src-port**** (*integer*) | 返回数据包预期的源端口。 |
| **seen-reply** (*yes \| no*) | 目标地址已回复源地址。 |
| **src-address** (*ip*) | 源地址。 |
| **src-port**(*integer*) | 源端口。 |
| **srcnat** (*yes \| no*) | 连接正在经过 SRC-NAT，包括通过 NAT 伪装的数据包。 |
| **tcp-state** (*string*) | TCP 连接的当前状态：<ul><li>"established"</li><li>"time-wait"</li><li>"close"</li><li>"syn-sent"</li><li>"syn-recv"</li><li>"fin-wait"</li><li>"close-wait"</li><li>"last-ack"</li><li>"listen"</li></ul> |
| **timeout** (*time*) | 连接从连接列表中移除前经过的时间。 |
| **uses-helper**(*yes \| no*) | "IP/Firewall/Service Port" 辅助器已应用于该特定连接。 |
