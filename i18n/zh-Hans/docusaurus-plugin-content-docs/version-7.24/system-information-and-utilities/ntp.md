---
sidebar_key: "system-information-and-utilities/ntp"
sidebar_position: 11
title: "NTP"
sidebar_label: "NTP"
description: "RouterOS 的 NTP 文档涵盖客户端和服务器配置，包括启用的模式、支持 IPv4/IPv6 的服务器列表、VRF 设置、认证密钥，以及频率漂移和同步 stratum 等状态监控。它还警告不要使用本地时钟进行精确计时，并列出了 NTP 日志消息。"
tags:
  - 'ntp'
  - 'time-synchronization'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/ntp
captured_at: '2026-11-04T11:33:38+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RouterOS 主包包含 Network Time Protocol (NTP) 客户端和服务器功能，其基于 RFC5905。

### NTP 客户端属性 {#ntp-client-properties}

客户端配置位于 `/system/ntp/client`

| 属性 | 描述 |
| :-- | :-- |
| **enabled** (*yes、no，默认：no*) | 启用 NTP 客户端进行时间同步 |
| **mode** (*broadcast, manycast, multicast, unicast*) | NTP 客户端将运行的模式 |
| **NTP 服务器** | NTP 服务器列表。可以添加静态条目。接受以下格式：  - FQDN（如果地址已解析，"Resolved Address" 将出现在 "Servers" 窗口的相应列中）或可以使用 IP 地址。如果 DHCP-Client 属性 **use-peer-ntp=yes** - 由 [DHCP](../network-management/dhcp.md) 通告的动态条目  - *ipv4*  - *ipv4*`@`*vrf*  - *ipv6*  - *ipv6*`@`*vrf*  - *ipv6-linklocal*`%`*interface* |
| **vrf** (*默认：main*) | 虚拟路由转发 |
| **服务器** (*按钮/区域*) | 动态和静态添加的 NTP 服务器的详细表格（Address、Resolved address、Min Poll、Max Poll、iBurst、Auth. Key）  使用其 FQDN 设置 NTP 服务器。每次发送 NTP 请求时都会解析域名。路由器必须配置 *`/ip/dns`*。 |
| **对等体** | 当前参数值  `[admin@ntp-example_v7] > /system/ntp/monitor-peers``type="ucast-client" address=x.x.x.x refid="y.y.y.y" stratum=3 hpoll=10 ppoll=10 root-delay=28.869 ms root-disp=50.994 ms``offset=-0.973 ms delay=0.522 ms disp=15.032 ms jitter=0.521 ms``-- [Q quit  D dump  C-z pause]` |
| **密钥** | NTP 对称密钥，用于 NTP 客户端与服务器之间的身份验证。密钥标识符 (Key ID) - 一个整数，用于标识生成消息认证码所使用的加密密钥。  |

#### 状态 {#status}

- **synchronized, stopped, waiting, using-local-clock** - NTP 客户端的当前状态。
- **频率漂移** - 单位时间内的分数频率漂移。
- **synced-server** - NTP 服务器的 IP 地址。
- **synced-stratum** - 每台服务器的精度由一个称为 stratum 的数字定义，最顶层（主服务器）赋值为 1，层次结构中每向下一级（辅助服务器）赋值为比前一级大 1。
- **system-offset** - 这是一个有符号定点数，表示 NTP 服务器时钟相对于本地时钟的偏移量，单位为秒。

### NTP 客户端服务器属性 {#ntp-client-servers-properties}

客户端配置位于 `/system/ntp/client/servers`

| 属性 | 描述 |
| :-- | :-- |
| **enabled** (*yes \| no；默认：yes*) | 启用 NTP 客户端服务器。 |
| **comment** (*string；* 默认： ) | 条目的描述性名称。 |
| **address** (IPv4 地址 [IPv4]*，IPv6 地址 [IPv6]，* 域名；默认： ) | NTP 服务器的 IP 地址或域名。 |
| **resolved-address** (IPv4 地址 [IPv4]*，IPv6 地址 [IPv6]；默认：* ) | 域名解析后获得的 NTP 服务器实际 IP 地址。 |
| **min-poll** (*integer：* 3..17；默认：6) | 确定 NTP 查询之间的最短间隔（以秒为单位的 2 的幂）。更多详细信息可在 [RFC5905](https://www.rfc-editor.org/rfc/rfc5905.html) 中找到。 |
| **max-poll** (*integer*：3..17；默认：10) | 确定 NTP 查询之间的最长间隔（以秒为单位的 2 的幂）。更多详细信息可在 [RFC5905](https://www.rfc-editor.org/rfc/rfc5905.html) 中找到。 |
| **iburst**(*yes \| no；默认：yes*) | 确定初始突发是禁用还是启用。IBurst 告知 NTP 客户端仅在启动时发送快速数据包突发。更多详细信息可在 [RFC5905](https://www.rfc-editor.org/rfc/rfc5905.html) 中找到。 |
| **auth-key** (默认值：*none*) | NTP 对称密钥，用于 NTP 客户端与服务器之间的身份验证。密钥标识符 (Key ID) - 一个整数，用于标识生成消息认证码所使用的加密密钥。 |

### NTP 服务器设置 {#ntp-server-settings}

服务器配置位于 `/system/ntp/server`

| 属性 | 描述 |
| :-- | :-- |
| **enabled** (*yes* 或 *no*；默认值：*no*) | 启用 NTP 服务器 |
| **broadcast** (*yes* 或 *no*；默认值：*no*) | 启用某个 NTP 服务器模式；要使此模式生效，必须设置 broadcast-addresses 字段 |
| **multicast** (*yes* 或 *no*；默认值：*no*) | 启用某个 NTP 服务器模式 |
| **manycast** (*yes* 或 *no*；默认值：*no*) | 启用某个 NTP 服务器模式 |
| **broadcast-addresses** (*IP 地址*；默认值： ) | 设置用于 NTP 服务器广播模式的广播地址 |
| **vrf** (*默认：main*) | 虚拟路由转发 |
| **use-local-clock** (*yes* 或 *no*；默认值：*no*) | 如果其他时间源不可用，服务器将提供其本地系统时间作为有效时间。 |
| **local-clock-stratum** | 如果 **use-local-clock=yes**，则手动设置 stratum |
| **auth-key** (默认值：*none*) | NTP 对称密钥，用于 NTP 客户端与服务器之间的身份验证。密钥标识符 (Key ID) - 一个整数，用于标识生成消息认证码所使用的加密密钥。 |

:::danger
如果使用 use-local-clock，请注意，路由器的内部 CPU 时钟并非用于精确计时操作的可靠时间源，因为其频率可能会因电源管理、热条件和硬件差异而变化，甚至相同型号之间也会不同。这种变化是预期内的，不会影响路由器的正常性能。为了准确计时，建议使用基于网络的时间同步，例如 NTP (Network Time Protocol)。
:::

### 日志消息 {#log-messages}

SNTP 客户端可以生成以下日志消息。有关如何设置日志记录以及如何检查日志，请参阅文章 “[log](../diagnostics-monitoring-and-troubleshooting/log/index.md)”。

- **ntp**、**debug** 按 *OFFS* 逐步调整。
- **ntp**、**debug** 按 *OFFS* 立即调整。
- **ntp**、**debug** 发送下一条消息前等待 *N* 秒。
- **ntp**、**debug** 重新启动前等待 *N* 秒。
- **ntp**、**debug**、**packet** 数据包接收出错，正在重新启动。
- **ntp**、**debug**、**packet** 收到 *PKT*。
- **ntp**、**debug**、**packet** 忽略收到的 *PKT*。
- **ntp**、**debug**、**packet** 发送到 *IP* 时出错，正在重新启动。
- **ntp**、**debug**、**packet** 正在向 *IP* 发送 *PKT*。

#### 日志消息字段说明 {#explanation-of-log-message-fields}

- *OFFS* - 两个 NTP 时间戳值之间的差值，以十六进制表示。
- *PKT* - NTP 数据包的转储。如果数据包短于最小 48 字节，则将其转储为十六进制字符串。否则，数据包将转储为字段名和值列表，每行日志一个。字段名遵循 RFC4330。
- *IP* - 远程 IP 地址。

**注意**：上述日志规则仅适用于内置 SNTP 客户端；独立的 NTP 包没有任何日志功能。
