---
title: "NTP"
description: "RouterOS 的 NTP 文档介绍客户端和服务器配置，包括启用的模式、支持 IPv4/IPv6 的服务器列表、VRF 设置、认证密钥，以及频率漂移和同步层级等状态监控。文档还提醒不要使用本地时钟进行高精度授时，并列出 NTP 日志消息。"
tags:
  - 'ntp'
  - 'time-synchronization'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/ntp
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

RouterOS 主软件包包含基于 RFC5905 的网络时间协议（NTP）客户端和服务器功能。

### NTP 客户端属性 {#ntp-client-properties}

客户端配置位于 `/system/ntp/client`

| 属性 | 说明 |
| :-- | :-- |
| **enabled** (*yes, no default: no*) | 启用 NTP 客户端以进行时间同步 |
| **mode** (*broadcast, manycast, multicast, unicast*) | NTP 客户端运行的模式 |
| **NTP servers** | NTP 服务器列表。可以添加静态条目。<br/>接受以下格式：<br/>- 可以使用 FQDN（如果地址已解析，“Resolved Address”将显示在“Servers”窗口的相应列中）或 IP 地址。如果 DHCP-Client 属性 <strong>use-peer-ntp=yes</strong> - 由 <a href="/docs/network-management/dhcp">DHCP</a> 通告的动态条目<br/>- <em>ipv4</em><br/>- <em>ipv4</em><code>@</code><em>vrf</em><br/>- <em>ipv6</em><br/>- <em>ipv6</em><code>@</code><em>vrf</em><br/>- <em>ipv6-linklocal</em><code>%</code><em>interface</em> |
| **vrf** (*default: main*) | 虚拟路由和转发 |
| **Servers** (*Button/Section*) | 动态和静态添加的 NTP 服务器的详细表格（Address、Resolved address、Min Poll、Max Poll、iBurst、Auth. Key）<br/>使用 FQDN 设置 NTP 服务器。每次发送 NTP 请求时都会解析域名。路由器必须配置 <em><code>/ip/dns</code></em>。 |
| **Peers** | 当前参数值<br/><code>[admin@ntp-example_v7] &gt; /system/ntp/monitor-peers</code><br/><code>type="ucast-client" address=x.x.x.x refid="y.y.y.y" stratum=3 hpoll=10 ppoll=10 root-delay=28.869 ms root-disp=50.994 ms</code><br/><code>offset=-0.973 ms delay=0.522 ms disp=15.032 ms jitter=0.521 ms</code><br/><code>-- [Q quit D dump C-z pause]</code> |
| **Keys** | NTP 对称密钥，用于 NTP 客户端和服务器之间的身份验证。密钥标识符（Key ID）——用于标识生成消息认证码所用加密密钥的整数。<br/> |

#### 状态 {#status}

- **synchronized, stopped, waiting, using-local-clock** - NTP 客户端的当前状态。
- **Frequency drift** - 每单位时间的分数频率漂移。
- **synced-server** - NTP 服务器的 IP 地址。
- **synced-stratum** - 每台服务器的精度由称为 stratum 的数字定义，最高层级（主服务器）分配为 1，层次结构中向下的每一级（辅助服务器）比前一级大 1。
- **system-offset** - 一个有符号定点数，表示 NTP 服务器时钟相对于本地时钟的偏移量，单位为秒。

### NTP 客户端服务器属性 {#ntp-client-servers-properties}

客户端配置位于 `/system/ntp/client/servers`

| 属性 | 说明 |
| :-- | :-- |
| **enabled** (*yes \| no; Default: yes*) | 启用 NTP 客户端服务器。 |
| **comment** (*string;* Default: ) | 项目的描述性名称。 |
| **address** (IPv4 address [IPv4]*, IPv6 address [IPv6],* Domain name; Default: ) | NTP 服务器的 IP 地址或域名。 |
| **resolved-address** (IPv4 address [IPv4]*, IPv6 address [IPv6]; Default:* ) | 域名解析后获得的 NTP 服务器实际 IP 地址。 |
| **min-poll** (*integer:* 3..17; Default: 6) | 确定 NTP 查询之间的最短间隔（2 的幂，单位为秒）。详情请参阅 [RFC5905](https://www.rfc-editor.org/rfc/rfc5905.html)。 |
| **max-poll** (*integer*: 3..17; Default: 10) | 确定 NTP 查询之间的最长间隔（2 的幂，单位为秒）。详情请参阅 [RFC5905](https://www.rfc-editor.org/rfc/rfc5905.html)。 |
| **iburst**(*yes \| no; Default: yes*) | 确定是否禁用或启用初始突发。IBurst 指示 NTP 客户端仅在启动时发送快速突发数据包。详情请参阅 [RFC5905](https://www.rfc-editor.org/rfc/rfc5905.html)。 |
| **auth-key** (default value: *none*) | 用于 NTP 客户端和服务器之间认证的 NTP 对称密钥。Key Identifier（Key ID）是用于标识生成消息认证码所用加密密钥的整数。 |

### NTP Server 设置 {#ntp-server-settings}

服务器配置位于 `/system/ntp/server`

| 属性 | 说明 |
| :-- | :-- |
| **enabled** (*yes* 或 *no*；default value: *no*) | 启用 NTP 服务器 |
| **broadcast** (*yes* 或 *no*；default value: *no*) | 启用某种 NTP 服务器模式，要使该模式工作，必须设置 broadcast-addresses 字段 |
| **multicast** (*yes* 或 *no*；default value: *no*) | 启用某种 NTP 服务器模式 |
| **manycast** (*yes* 或 *no*；default value: *no*) | 启用某种 NTP 服务器模式 |
| **broadcast-addresses** (*IP address*；default value: ) | 设置用于 NTP 服务器广播模式的广播地址 |
| **vrf** (*default: main*) | Virtual Routing and Forwarding |
| **use-local-clock** (*yes* 或 *no*；default value: *no*) | 当其他时间源不可用时，服务器会将其本地系统时间作为有效时间提供。 |
| **local-clock-stratum** | 当 **use-local-clock=yes** 时手动设置 stratum |
| **auth-key** (default value: *none*) | 用于 NTP 客户端和服务器之间认证的 NTP 对称密钥。Key Identifier（Key ID）是用于标识生成消息认证码所用加密密钥的整数。 |

:::danger
如果使用 use-local-clock，请注意，路由器内部 CPU 时钟不是精确计时操作的可靠时间源，因为其频率可能因电源管理、热条件和硬件差异而变化，即使型号相同也是如此。这种变化是正常现象，不会影响路由器的正常运行。为获得准确的时间同步，建议使用基于网络的时间同步，例如 NTP（Network Time Protocol）。
:::

### 日志消息 {#log-messages}

SNTP 客户端可产生以下日志消息。有关如何设置日志以及如何查看日志，请参阅文章“[log](/docs/diagnostics-monitoring-and-troubleshooting/log)”。

- **ntp**，**debug** 按 *OFFS* 逐步调整。
- **ntp**，**debug** 按 *OFFS* 立即调整。
- **ntp**，**debug** 发送下一条消息前等待 *N* 秒。
- **ntp**，**debug** 重启前等待 *N* 秒。
- **ntp**，**debug**，**packet** 收到的数据包出错，正在重启。
- **ntp**，**debug**，**packet** 已收到 *PKT*。
- **ntp**，**debug**，**packet** 忽略已收到的 *PKT*。
- **ntp**，**debug**，**packet** 发送到 *IP* 时出错，正在重启。
- **ntp**，**debug**，**packet** 正在发送到 *IP* *PKT*。

#### 日志消息字段说明 {#explanation-of-log-message-fields}

- *OFFS* - 两个 NTP 时间戳值之间的差值，以十六进制表示。
- *PKT* - NTP 数据包的转储。如果数据包短于最小 48 字节，则以十六进制字符串形式转储。否则，数据包会以字段名和值的列表形式转储，每个日志行一项。字段名称遵循 RFC4330。
- *IP* - 远程 IP 地址。

**NOTE**：上述日志规则仅适用于内置 SNTP 客户端；单独的 NTP 软件包没有任何日志功能。
