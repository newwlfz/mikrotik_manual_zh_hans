---
sidebar_key: "bridging-and-switching/index"
sidebar_position: 12
title: "桥接与交换"
sidebar_label: "桥接与交换"
tags:
  - 'bridging'
  - 'stp'
  - 'arp'
source: https://manual.mikrotik.com/docs/7.25/bridging-and-switching
captured_at: '2026-11-04T11:15:04+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

---

![Bridge diagram](/img/341670d0f71b9c56.webp)

类似以太网的网络（Ethernet、Ethernet over IP、ap-bridge 或 bridge 模式下的 IEEE 802.11、WDS、VLAN）可以使用 MAC 网桥连接在一起。网桥功能允许将连接到不同 LAN 的主机互连（使用 EoIP 时，只要它们之间存在任意类型的 IP 网络互连，地理上分散的网络也可以被桥接），就像它们连接到同一个 LAN 一样。由于网桥是透明的，它们不会出现在 traceroute 列表中，而且如果这些 LAN 已桥接，任何工具都无法区分在一台 LAN 中工作的主机和在另一台 LAN 中工作的主机。但是，根据 LAN 的互连方式，主机之间的延迟和数据速率可能会有所不同。

在复杂拓扑中可能会出现网络环路（无论是有意还是无意）。如果不进行任何特殊处理，环路将阻止网络正常运行，因为它们会导致雪崩式的数据包倍增。每个网桥都会运行一种算法来计算如何防止环路。(R/M)STP 允许网桥相互通信，因此它们可以协商出一个无环拓扑。所有其他原本会形成环路的替代连接都会处于待命状态，以便在主连接发生故障时，另一条连接可以接替它。该算法会定期交换配置消息（BPDU - Bridge Protocol Data Unit），以便所有网桥都能获得有关网络拓扑变化的最新信息。(R/M)STP 会选择根网桥，它负责网络重新配置，例如阻塞和打开其他网桥上的端口。根网桥是具有最低网桥 ID 的网桥。

## 网桥接口设置 {#bridge-interface-setup}

---

要将多个网络组合到一个网桥中，应创建一个网桥接口。之后，应将所有所需的接口设置为其端口。默认情况下，网桥 MAC 地址将根据网桥端口配置自动选择。为了避免不必要的 MAC 地址变更，建议禁用 `auto-mac` 并使用 `admin-mac` 手动指定 MAC 地址。

**子菜单：** `/interface/bridge`

| 属性 | 描述 |
| :-- | :-- |
| **add-dhcp-option82** (*yes* \| *no*; 默认：**no**) | <strong>重要：</strong> 从 <strong>RouterOS 7.23 版本</strong> 开始，此设置已被移除。现在可以使用预定义变量（例如 BRIDGEMAC、HOSTNAME、INTERFACE、VID）配置自定义 Remote ID 和 Circuit ID 值。有关详细信息，请参阅下面的 <code>dhcp-agent-circuit-id</code> 和 <code>dhcp-agent-remote-id</code> 属性。如果在早期版本（7.22 或更早）中启用了此设置，升级后将自动把配置更新为新格式。 <br/> 是否将 DHCP Option 82 信息（Agent Remote ID 和 Agent Circuit ID）添加到 DHCP 数据包中。可与支持 Option 82 的 DHCP 服务器配合使用，以分配 IP 地址并实施策略。仅当 <code>dhcp-snooping</code> 设置为 <span className="ros-icon-success"><code>yes</code></span> 时，此属性才会生效。 <br/> 在 RouterOS 7.22 或更早版本中，这些值是预定义的且无法修改：<br/><ul><li>对于 Agent Remote ID，RouterOS 使用网桥接口 MAC 地址，格式为 "xx:xx:xx:xx:xx:xx"（小写，冒号分隔）。</li><li>对于 Agent Circuit ID，RouterOS 使用 DHCP 客户端所连接接口的名称和 VLAN ID，以冒号分隔（interface:vlan-id）。仅当网桥上启用了 <span className="ros-background-accent-green-bolder"><code>vlan-filtering</code></span> 时才会包含 VLAN ID。</li></ul> 例如（<code>vlan-filtering=yes</code>）：<br/> Agent Remote ID - cc:2d:e0:01:6a:43 Agent Circuit ID - ether2:10 <br/> |
| **admin-mac** (*MAC 地址*; 默认：**none**) | 网桥的静态 MAC 地址。仅当 `auto-mac` 设置为 `no` 时，此属性才会生效。 |
| **ageing-time** (*时间*; 默认：**00:05:00**) | 主机信息在网桥数据库中保留多长时间。 |
| **arp** (*disabled* \| *enabled* \| *local-proxy-arp \| proxy-arp \| reply-only*; 默认：**enabled**) | 地址解析协议设置<ul><li><span className="ros-icon-success"><code>disabled</code></span> - 接口不使用 ARP</li><li><span className="ros-icon-success"><code>enabled</code></span> - 接口使用 ARP</li><li><span className="ros-icon-success"><code>local-proxy-arp</code></span> - 路由器在接口上执行代理 ARP，并将回复发送到同一接口</li><li><span className="ros-icon-success"><code>proxy-arp</code></span> - 路由器在接口上执行代理 ARP，并将回复发送到其他接口</li><li><span className="ros-icon-success"><code>reply-only</code></span> - 接口仅响应来自与 IP/ARP 表中静态条目匹配的 IP 地址/MAC 地址组合的请求。IP/ARP 表中不会自动存储动态条目。因此，为使通信成功，必须已存在有效的静态条目。</li></ul> |
| **arp-inspection** (*yes \| no*; 默认：**no**) | 启用或禁用 ARP inspection。启用后，到达非信任端口的 ARP 数据包会根据 DHCP snooping 绑定数据库进行验证。发送方 MAC–IP 对与绑定条目不匹配的数据包将被丢弃。在信任端口上，所有 ARP 数据包都会不经验证直接转发。仅当 `dhcp-snooping` 设置为 `yes` 时，此属性才会生效。 |
| **arp-timeout** (*auto \| integer*; 默认：**auto**) | 在未从某个 IP 地址收到数据包后，ARP 记录在 ARP 表中保留多长时间。值 `auto` 等于 `/ip/settings` 中 `arp-timeout` 的值，默认为 30s。 |
| **auto-mac** (*yes \| no*; 默认：**yes**) | 当配置 <code>auto-mac=yes</code> 时，网桥将按照以下优先级顺序自动为网桥接口选择 MAC 地址：<br/><ol><li>从属于该网桥的以太网接口；</li><li>从网桥中的非以太网接口（例如 WiFi 或隧道）；</li><li>如果上述来源都不可用，则使用随机生成的地址。</li></ol> 如果配置发生变化，例如向网桥添加新端口，则仅当出现更高优先级的地址来源时，网桥的 MAC 地址才会更新。例如，如果网桥最初使用随机生成的 MAC，然后添加了以太网接口，则 MAC 将按照可用的最高优先级（在本例中为以太网接口）更新。如果当前 MAC 关联的端口被移动到另一个网桥，网桥也会更新 MAC 地址。 <br/> 当前 MAC 地址及其优先级会被保存，并在重启后复用。 <br/> 当配置 <code>auto-mac=no</code> 时，可以使用 <code>admin-mac</code> 属性手动设置静态 MAC 地址。 |
| **comment** (*string*; 默认值: ) | 接口的简短描述。 |
| **dhcp-agent-circuit-id** (*字符串*; 默认：**!dhcp-agent-circuit-id**) | 指定通过网桥的 DHCP 消息的 Option 82 的 <strong>Circuit ID</strong> 子选项值。字符串长度限制为 255 个字符。 <br/> 此设置取代已弃用的 <code>add-dhcp-option82</code> 属性。如果在早期版本（7.22 或更早）中启用了 <code>add-dhcp-option82</code>，升级后将自动把配置更新为新格式：$(INTERFACE):$(VID)。通过 GUI 配置该设置时也会显示此格式。 <br/> 支持以下变量：<br/><ul><li>$(BRIDGEMAC) - 当前网桥 MAC 地址，格式为 "xx:xx:xx:xx:xx:xx"（小写，冒号分隔）；</li><li>$(HOSTNAME) - 系统标识；</li><li>$(INTERFACE) - DHCP 客户端所连接的接口名称；</li><li>$(VID) - DHCP 客户端使用的 VLAN ID。如果 DHCP 客户端未打标签，则 VID 对应端口的 <span className="ros-background-accent-green-bolder"><code>pvid</code></span>。仅当网桥上启用了 <span className="ros-background-accent-green-bolder"><code>vlan-filtering</code></span> 时适用。</li></ul> 变量语法规则<br/><ul><li>变量必须用括号括起来，并加上美元符号（$）前缀。</li><li>从终端配置时，美元符号必须用反斜杠转义（），否则它会被解释为 RouterOS 脚本变量。</li></ul> 示例：<br/><code>/interface/bridge</code><br/><code>add add-dhcp-option82=yes dhcp-agent-circuit-id="interface: \$(INTERFACE), vlan: \$(VID)" dhcp-snooping=yes name=bridge1 vlan-filtering=yes</code> 仅当 <code>dhcp-snooping</code> 设置为 yes 时，此属性才会生效。 <br/> |
| **dhcpv6-agent-circuit-id** (*字符串*; 默认：**!dhcpv6-agent-circuit-id**) | 指定通过网桥的 DHCPv6 消息的 Option 18 的 <strong>Interface ID</strong> 子选项值。<code>dhcpv6-agent-circuit-id</code> 属性遵循与 <code>dhcp-agent-circuit-id</code> 相同的规则。 <br/> |
| **dhcp-agent-remote-id** (*字符串*; 默认：**!dhcp-agent-remote-id**) | 指定通过网桥的 DHCP 消息的 Option 82 的 <strong>Remote ID</strong> 子选项值。字符串长度限制为 255 个字符。 <br/> 此设置取代已弃用的 <code>add-dhcp-option82</code> 属性。如果在早期版本（7.22 或更早）中启用了 <code>add-dhcp-option82</code>，升级后将自动把配置更新为新格式：$(BRIDGEMAC)。通过 GUI 配置该设置时也会显示此格式。 <br/> 支持以下变量：<br/><ul><li>$(BRIDGEMAC) - 当前网桥 MAC 地址，格式为 "xx:xx:xx:xx:xx:xx"（小写，冒号分隔）；</li><li>$(HOSTNAME) - 系统标识；</li><li>$(INTERFACE) - DHCP 客户端所连接的接口名称；</li><li>$(VID) - DHCP 客户端使用的 VLAN ID。如果 DHCP 客户端未打标签，则 VID 对应端口的 <span className="ros-background-accent-green-bolder"><code>pvid</code></span>。仅当网桥上启用了 <span className="ros-background-accent-green-bolder"><code>vlan-filtering</code></span> 时适用。</li></ul> 变量语法规则<br/><ul><li>变量必须用括号括起来，并加上美元符号（$）前缀。</li><li>从终端配置时，美元符号必须用反斜杠转义（），否则它会被解释为 RouterOS 脚本变量。</li></ul> 示例：<br/><code>/interface/bridge</code><br/><code>add add-dhcp-option82=yes dhcp-agent-remote-id="ip: 192.168.88.1, identity: \$(HOSTNAME), mac: \$(BRIDGEMAC)" dhcp-snooping=yes name=bridge1 vlan-filtering=yes</code> 仅当 <code>dhcp-snooping</code> 设置为 yes 时，此属性才会生效。 <br/> |
| **dhcpv6-agent-remote-id** (*字符串*; 默认：**!dhcpv6-agent-remote-id**) | 指定通过网桥的 DHCPv6 消息的 Option 37 的 <strong>Remote ID</strong> 子选项值。<code>dhcpv6-agent-remote-id</code> 属性遵循与 <code>dhcp-agent-remote-id</code> 相同的规则。 <br/> |
| **dhcp-snooping** (*yes \| no*; 默认：**no**) | 启用或禁用网桥上的 DHCP Snooping。 <br/><br/><strong>注意：</strong> 启用 DHCP snooping 功能会关闭网桥 [fast-path](../firewall-and-quality-of-service/packet-flow-in-routeros.md#fast-path)，进而影响通过该网桥的连接的 [fasttrack](../firewall-and-quality-of-service/packet-flow-in-routeros.md#fasttrack) 能力。 <br/> |
| **dhcpv6-snooping**(*yes \| no*; 默认：**no**) | 启用或禁用网桥上的 DHCPv6 Snooping。 <br/><br/><strong>注意：</strong> 启用 DHCP snooping 功能会关闭网桥 [fast-path](../firewall-and-quality-of-service/packet-flow-in-routeros.md#fast-path)，进而影响通过该网桥的连接的 [fasttrack](../firewall-and-quality-of-service/packet-flow-in-routeros.md#fasttrack) 能力。 <br/> |
| **disabled** (*yes \| no*; 默认：**no**) | 更改网桥是否被禁用。 |
| **ether-type** (*0x9100 \| 0x8100 \| 0x88a8*; 默认：**0x8100**) | 更改 EtherType，用于确定数据包是否带有 VLAN 标签。具有匹配 EtherType 的数据包被视为已打标签的数据包。仅当 `vlan-filtering` 设置为 `yes` 时，此属性才会生效。 |
| **fast-forward** (*yes \| no*; 默认：**yes**) | Fast Path 的一种特殊且更快的场景，仅适用于具有 2 个接口的网桥（默认仅对新网桥启用）。更多详细信息可在 Fast Forward 部分找到。 |
| **forward-delay** (*时间*; 默认：**00:00:15**) | 在网桥接口初始化阶段（即路由器启动或启用接口后），网桥开始正常工作之前在监听/学习状态中花费的时间。 |
| **forward-reserved-addresses** (*yes \| no*: 默认：**no**) | 是否转发 <strong>01:80:C2:00:00:0x</strong> 范围内的 IEEE 保留组播 MAC 地址。符合 R/M/STP 标准的网桥应避免转发这些数据包；仅当 <code>protocol-mode</code> 设置为 <code>none</code> 时才能应用此属性。 <br/> 启用保留 MAC 地址转发可能会影响依赖这些地址的某些协议。建议仅在绝对必要时启用转发，例如在透明桥接设置中（例如延长长链路、将网桥用作介质转换器或进行网络分析）。 <br/> 以下是 RouterOS 使用的一些 notable MAC 地址和协议： <br/><ul><li>01:80:C2:00:00:00 - [生成树协议 (STP)](./index.md)；</li><li>01:80:C2:00:00:01 - [以太网](../wired-connections/ethernet.md)流控；</li><li>01:80:C2:00:00:02 - [链路聚合控制协议 (LACP)](../high-availability-solutions/bonding.md)；</li><li>01:80:C2:00:00:03 - [Dot1x](../authentication-authorization-accounting/dot1x.md) 客户端和服务器；</li><li>01:80:C2:00:00:08 - 生成树协议（用于 802.1ad 网桥，使用 <span className="ros-background-accent-green-bolder"><code>ether-type=0x88a8</code></span>）；</li><li>01:80:C2:00:00:0D - [多 VLAN 注册协议](./index.md)（用于 802.1ad 网桥，使用 <span className="ros-background-accent-green-bolder"><code>ether-type=0x88a8</code></span>）；</li><li>01:80:C2:00:00:0E - [链路层发现协议](../system-information-and-utilities/neighbor-discovery.md)、[多机箱链路聚合组](../high-availability-solutions/multi-chassis-link-aggregation-group.md) 和 [精确时间协议](../system-information-and-utilities/precision-time-protocol.md)；</li></ul><br/><strong>重要：</strong> 流控 MAC 地址 01:80:C2:00:00:01 是一个例外；它不会被网桥转发。 <br/> |
| **frame-types** (*admit-all \| admit-only-untagged-and-priority-tagged \| admit-only-vlan-tagged*; 默认：**admit-all**) | 指定网桥端口上允许的帧类型。仅当 `vlan-filtering` 设置为 `yes` 时，此属性才会生效。 |
| **igmp-snooping** (*yes \| no*; 默认：**no**) | 启用组播组和端口学习，以防止组播流量泛洪到网桥中的所有接口。 |
| **igmp-version**（*2 \| 3*；默认：**2**） | 选择当网桥接口充当 IGMP 查询器时将用于生成 IGMP 成员查询的 IGMP 版本。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，此属性才生效。 |
| **ingress-filtering** (*yes \| no*; 默认：**yes**) | 启用或禁用 VLAN 入口过滤，它会检查入口端口是否为网桥 VLAN 表中接收到的 VLAN ID 的成员。默认情况下，网桥 VLAN 表中不存在的 VLAN 会在发出（egress）之前被丢弃，但此属性允许在接收（ingress）数据包时将其丢弃。应与 `frame-types` 一起使用，以指定入口流量应带标签还是不带标签。仅当 `vlan-filtering` 设置为 `yes` 时，此属性才会生效。自 RouterOS v7 起默认启用该设置。 |
| **ip-source-guard** (*yes \| no*; Default: **no**) | 启用或禁用 IP Source Guard。启用后，网桥会根据 DHCP snooping 绑定数据库验证到达不受信任端口的 IPv4 数据包的源 IP 地址。源 MAC–IP 对与入口端口的绑定条目不匹配的数据包将被丢弃。在受信任端口上，所有数据包都会被转发而不进行验证。仅当 `dhcp-snooping` 设置为 `yes` 时，此属性才生效。 |
| **l2mtu** (*只读*; 默认： ) | L2MTU 表示此接口可发送的、不含 MAC 头的帧的最大大小。L2MTU 值将由网桥自动设置，并使用所有关联网桥端口中最低的 L2MTU 值。此值无法手动更改。 |
| **last-member-interval** (*时间*; 默认：**1s**) | 当网桥端口上的最后一个客户端取消订阅某个组播组，且网桥充当主动查询器时，网桥将发送特定于该组的 IGMP/MLD 查询，以确保没有其他客户端仍在订阅。该设置会更改这些查询的响应时间。如果在特定时间段内（<code>last-member-interval</code> * <code>last-member-query-count</code>）未收到成员报告，则会从组播数据库 (MDB) 中移除该组播组。 <br/> 如果网桥端口配置了 fast-leave，则会立即移除该组播组，而不发送任何查询。 <br/> 仅当 <code>igmp-snooping</code> 和 <code>multicast-querier</code> 设置为 <span className="ros-icon-success"><code>yes</code></span> 时，此属性才会生效。 |
| **last-member-query-count**（*integer: 0..4294967295*；默认：**2**） | `last-member-interval` 应经过多少次后，IGMP/MLD snooping 网桥才停止转发某个组播流。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，此属性才生效。 |
| **max-hops** (*整数：6..40*; 默认：**20**) | 在启用 MSTP 的同一区域网络中，BPDU 在被忽略之前可以经过的网桥数量。仅当 `protocol-mode` 设置为 `mstp` 时，此属性才会生效。 |
| **max-learned-entries** (*整数：0..4294967295 \| auto \| unlimited*; 默认：**auto**) | 设置网桥接口可学习主机的最大数量。默认值为 <span className="ros-icon-success"><code>auto</code></span>，它取决于已安装的 RAM 容量。可以设置高于默认值的值或选择 <code>unlimited</code> 选项，但这会增加内存耗尽的风险。 <br/> 特定 RAM 容量对应的默认值： <br/><ul><li>64 MB 为 8192；</li><li>128 MB 为 16384；</li><li>256 MB 为 32768；</li><li>512 MB 为 65536；</li><li>1024 MB 或更高为 131072。</li></ul> 此限制专门适用于网桥接口，而不是交换机 FDB 表上的硬件限制。即使达到网桥限制，交换机仍可在其硬件限制内继续学习主机并做出正确的转发决策。但是，这些额外的主机不会显示在 <code>/interface/bridge/host</code> 表中，也无法被监控。此外，达到此限制可能会影响 MLAG 主机同步。 <br/> 此设置自 RouterOS 7.16 版本起可用。 |
| **max-message-age** (*时间：6s..40s*; 默认：**00:00:20**) | 更改由根网桥发送的 BPDU 数据包中的 Max Age 值。根网桥发送 BPDU 时会将 Max Age 设置为 `max-message-age` 值，并将 Message Age 设置为 0。每个后续网桥都会在发送其 BPDU 之前递增 Message Age。一旦网桥收到 Message Age 等于或大于 Max Age 的 BPDU，该 BPDU 就会被忽略。仅当 `protocol-mode` 设置为 `stp` 或 `rstp` 时，此属性才会生效。 |
| **membership-interval**（*time*；默认：**4m20s**） | 如果在网桥端口上未收到 IGMP/MLD 成员报告，则从组播数据库（MDB）中移除条目之前的时间量。仅当 `igmp-snooping` 设置为 `yes` 时，此属性才生效。 |
| **mld-version**（*1 \| 2*；默认：**1**） | 选择当网桥接口充当 MLD 查询器时将用于生成 MLD 成员查询的 MLD 版本。仅当网桥具有活动的 IPv6 地址，且 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，此属性才生效。 |
| **mtu** (*整数*; 默认：**auto**) | 最大传输单元。默认情况下，网桥会自动设置 MTU，并使用所有关联网桥端口中最低的 MTU 值。未添加任何网桥端口时，默认网桥 MTU 值为 1500。可以手动设置 MTU 值，但它不能超过网桥 L2MTU 或最低的网桥端口 L2MTU。如果添加的新网桥端口 L2MTU 小于网桥的 <code>actual-mtu</code>（由 <code>mtu</code> 属性设置），则手动设置的值将被忽略，网桥将如同设置了 <code>mtu=auto</code> 一样运行。 <br/> 在网桥上添加 VLAN 接口且 VLAN 使用高于默认 1500 的 MTU 时，建议手动设置网桥的 MTU。 |
| **multicast-querier** (*yes \| no*; 默认：**no**) | 组播查询器会生成周期性 IGMP/MLD 通用成员查询，所有支持 IGMP/MLD 的设备都会对此响应 IGMP/MLD 成员报告。通常，PIM（组播）路由器或 IGMP 代理会生成这些查询。 <br/> 通过使用此属性，可以让启用了 IGMP/MLD snooping 的网桥生成 IGMP/MLD 通用成员查询。只要二层网络中没有活动的查询器（PIM 路由器或 IGMP 代理），就应使用此属性。如果二层网络中没有组播查询器，组播数据库 (MDB) 就不会更新；已学习的条目将超时，IGMP/MLD snooping 将无法正常工作。 <br/> 仅生成未打标签的 IGMP/MLD 通用成员查询。IGMP 查询使用网桥接口自身的 IPv4 地址作为源地址发送（参见 <code>querier-uses-bridge-address</code>），MLD 查询使用网桥接口的 IPv6 链路本地地址发送。如果检测到外部 IGMP/MLD 查询器，网桥将不会发送查询（请参见监控值 <code>igmp-querier</code> 和 <code>mld-querier</code>）。 <br/> 仅当 <code>igmp-snooping</code> 设置为 <span className="ros-icon-success"><code>yes</code></span> 时，此属性才会生效。 |
| **multicast-router** (*disabled \| permanent \| temporary-query*; 默认：**temporary-query**) | 组播路由器端口是连接组播路由器或查询器的端口。未注册的组播流和 IGMP/MLD 成员报告将发送到此端口。此设置会更改网桥接口本身的组播路由器状态。此属性可用于将 IGMP/MLD 成员报告发送到网桥接口，以便进一步进行组播路由或代理。仅当 <code>igmp-snooping</code> 设置为 <span className="ros-icon-success"><code>yes</code></span> 时，此属性才会生效。<ul><li><span className="ros-icon-success"><code>disabled</code></span> - 网桥接口上的组播路由器状态已禁用。无论网桥接口上配置了什么，未注册的组播和 IGMP/MLD 成员报告都不会发送到网桥接口。</li><li><span className="ros-icon-success"><code>permanent</code></span> - 网桥接口上的组播路由器状态已启用。无论网桥接口上配置了什么，未注册的组播和 IGMP/MLD 成员报告都会发送到网桥接口本身。</li><li><span className="ros-icon-success"><code>temporary-query</code></span> - 使用 IGMP/MLD 查询自动检测网桥接口上的组播路由器状态。</li></ul> |
| **name** (*文本*; 默认：**bridgeN**) | 网桥接口的名称。 |
| **port-cost-mode** (*long \| short*; 默认：**long**) | 更改桥接端口的端口路径开销和内部路径开销模式，利用基于接口速度的自动值。此设置不会影响手动配置了 <code>path-cost</code> 或 <code>internal-path-cost</code> 属性的桥接端口。以下是说明与特定数据速率对应的路径开销的示例（中间速率按比例计算）： <br/><details><summary>路径开销表</summary><table><thead><tr><th>数据速率</th><th>Long</th><th>Short</th></tr></thead><tbody><tr><td>10 Mbps</td><td>2,000,000</td><td>100</td></tr><tr><td>100 Mbps</td><td>200,000</td><td>19</td></tr><tr><td>1 Gbps</td><td>20,000</td><td>4</td></tr><tr><td>10 Gbps</td><td>2,000</td><td>2</td></tr><tr><td>25 Gbps</td><td>800</td><td>1</td></tr><tr><td>40 Gbps</td><td>500</td><td>1</td></tr><tr><td>50 Gbps</td><td>400</td><td>1</td></tr><tr><td>100 Gbps</td><td>200</td><td>1</td></tr></tbody></table></details> 对于 HW offloaded bond 接口，将应用所有绑定成员端口中最高的路径开销；此值不受绑定总链路速度影响。 <br/> 对于虚拟接口（例如 VLAN、EoIP、VXLAN 和非 HW offloaded bond），以及 wifi、wireless 和 60GHz 接口，在 long 模式下分配路径开销 20,000，在 short 模式下分配 10。 <br/> 对于动态桥接接口（例如 wifi、wireless、PPP、VPLS），路径开销默认为 long 模式 20,000 和 short 模式 10。但是，这可以由动态向网桥添加接口的服务手动覆盖，例如使用 CAPsMAN <code>datapath.bridge-cost</code> 设置。 <br/> 使用 [port monitor](./index.md#bridge-port-monitoring) 观察应用的路径开销。 <br/> 当 <code>protocol-mode</code> 设置为 <code>stp</code>、<code>rstp</code> 或 <code>mstp</code> 时，此属性生效。 |
| **priority** (*整数：0..65535 十进制格式或 0x0000-0xffff 十六进制格式*; 默认：**32768 / 0x8000**) | 网桥优先级，由 R/STP 用于确定根网桥，由 MSTP 用于确定 CIST 和 IST 区域根网桥。当 <code>protocol-mode</code> 设置为 <code>none</code> 时，此属性无效。 <br/><strong>有效值：</strong> 网桥优先级必须以 4096 (0x1000) 为步长设置。最低的 12 位会被忽略。有效值为：0x0000、0x1000、0x2000、0x3000、0x4000、0x5000、0x6000、0x7000、0x8000、0x9000、0xa000、0xb000、0xc000、0xd000、0xe000、0xf000（或其十进制等价值：0、4096、8192、12288、16384、20480、24576、28672、32768、36864、40960、45056、49152、53248、57344、61440）。 |
| **protocol-mode** (*none \| rstp \| stp \| mstp*; 默认：**rstp**) | 选择生成树协议 (STP) 或快速生成树协议 (RSTP)，以确保任何桥接 LAN 的无环拓扑。RSTP 在拓扑变化后可提供更快的生成树收敛。选择 MSTP 以确保跨多个 VLAN 的无环拓扑。 <br/> 对 <strong>01:80:C2:00:00:0x</strong> 范围内保留 MAC 地址的转发已与 <code>protocol-mode=none</code> 分离，并且自 RouterOS v7.16 起作为可控属性 <code>forward-reserved-addresses</code> 提供。 |
| **pvid** (*整数：1..4094*; 默认：**1**) | 端口 VLAN ID (pvid) 指定未打标签的入口流量被分配到哪个 VLAN。例如，它适用于从网桥 IP 发送并发送到网桥端口的帧。仅当 `vlan-filtering` 设置为 `yes` 时，此属性才会生效。 |
| **querier-interval**（*time*；默认：**4m15s**） | 更改检测到的查询器和组播路由器端口的超时时间。仅当 `igmp-snooping` 设置为 `yes` 时，此属性才生效。 |
| **querier-uses-bridge-address**（*yes \| no*；默认：**yes**） | 启用后，网桥 IGMP 查询器使用网桥接口自身的 IPv4 地址作为 IGMP 查询数据包的源地址，而不是默认的 0.0.0.0。某些组播客户端认为来自 0.0.0.0 的查询无效而不响应，这可能导致 snooping 表条目超时时组播流中断。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 且网桥接口分配了 IPv4 地址时，此属性才生效。此设置仅适用于 IPv4（IGMP）。MLD 查询始终使用网桥接口的 IPv6 链路本地地址。 |
| **query-interval** (*时间*; 默认：**2m5s**) | 更改当网桥接口充当 IGMP/MLD 查询器时发送 IGMP/MLD 通用成员查询的间隔。该间隔从发送最后一个启动查询时开始计算。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，此属性才会生效。 |
| **query-response-interval** (*时间*; 默认：**10s**) | 当网桥作为 IGMP/MLD 查询器处于活动状态时，该设置会更改通用 IGMP/MLD 查询的响应时间。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，此属性才会生效。 |
| **region-name** (*文本*; 默认： ) | MSTP 区域名称。仅当 `protocol-mode` 设置为 `mstp` 时，此属性才会生效。 |
| **region-revision** (*整数：0..65535*; 默认：**0**) | MSTP 配置修订号。仅当 `protocol-mode` 设置为 `mstp` 时，此属性才会生效。 |
| **ra-guard** (*yes \| no*; 默认：**no**) | RA guard - 一种安全功能，会根据授权的信任端口列表验证传入的路由器通告。 |
| **startup-query-count** (*整数：0..4294967295*; 默认：**2**) | 指定当启用网桥接口或活动查询器超时时，必须发送通用 IGMP/MLD 查询的次数。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，此属性才会生效。 |
| **startup-query-interval** (*时间*; 默认：**31s250ms**) | 指定启动通用 IGMP/MLD 查询之间的间隔。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，此属性才会生效。 |
| **transmit-hold-count** (*整数：1..10*; 默认：**6**) | 端口传输状态机用于限制传输速率的 Transmit Hold Count。 |
| **vlan-filtering** (*yes \| no*; 默认：**no**) | 全局启用或禁用网桥的 VLAN 功能。 |

:::danger
更改某些属性可能导致桥接临时禁用所有端口。在生产环境中更改此类属性时必须考虑到这一点，因为它可能导致所有数据包被临时丢弃。此类属性包括 `vlan-filtering`、`protocol-mode`、`igmp-snooping`、`fast-forward` 等。
:::

### 示例 {#example}

以下示例演示如何为简单的 Layer 2 交换创建并验证一个基本网桥接口。此配置创建一个网桥，将多个 Ethernet 端口组合成单个交换网段。

```ros
[admin@MikroTik] > /interface/bridge/add
[admin@MikroTik] > interface bridge print 
Flags: X - disabled, R - running 
0 R name="bridge1" mtu=auto actual-mtu=1500 l2mtu=65535 arp=enabled arp-timeout=auto mac-address=5E:D2:42:95:56:7F protocol-mode=rstp fast-forward=yes 
igmp-snooping=no auto-mac=yes ageing-time=5m priority=0x8000 max-message-age=20s forward-delay=15s transmit-hold-count=6 vlan-filtering=no 
dhcp-snooping=no 
```

### 网桥监控 {#bridge-monitoring}

要监控桥接接口的当前状态，请使用 `monitor` 命令。

**子菜单：** `/interface/bridge/monitor`

| 属性 | 描述 |
| :-- | :-- |
| **bridge-id** (*priority.MAC address*) | 本地桥标识符，格式为 bridge-priority.bridge-MAC-address。 |
| **current-mac-address** (*MAC address*) | 桥的当前 MAC 地址。 |
| **designated-port-count** (*integer*) | 指定桥端口的数量。 |
| **declared-vlan-ids** (*integer 1..4094*) | 通过 [MVRP 协议](./index.md#mvrp) 在桥接接口上声明的 VLAN。 |
| **fast-forward** (*yes \| no*) | 桥快速转发是否处于活动状态。 |
| **igmp-querier** (*none* \| *interface & IPv4 address*) | 显示检测到的 IGMP 查询器所在的桥端口和源 IP 地址。仅显示检测到的外部 IGMP 查询器，本地桥 IGMP 查询器（包括 IGMP proxy 和 PIM）将不会显示。仅当启用 `igmp-snooping` 时才会显示该监控值。 |
| **mld-querier** (*none* \| *interface & IPv6 address*) | 显示检测到的 MLD 查询器所在的桥端口和源 IPv6 地址。仅显示检测到的外部 MLD 查询器，本地桥 MLD 查询器将不会显示。仅当启用 `igmp-snooping` 且桥具有活动的 IPv6 地址时才会显示该监控值。 |
| **mst-config-digest** (*integer*) | 计算得到的 VLAN 到 MST 实例 ID 映射的哈希值。 |
| **multicast-router** (*yes \| no*) | 显示是否在端口上检测到组播路由器。仅当启用 `igmp-snooping` 时才会显示该监控值。 |
| **port-count** (*integer*) | 桥端口的数量。 |
| **regional-root-bridge-id** (*priority.MAC address*) | 区域根桥 ID，格式为 bridge-priority.bridge-MAC-address。仅当启用 MSTP 时适用。 |
| **registered-vlan-ids** (*integer 1..4094*) | 通过 [MVRP 协议](./index.md#mvrp) 在桥接接口上注册的 VLAN。 |
| **root-bridge** (*yes \| no*) | 显示该桥是否为生成树的根桥。 |
| **root-bridge-id** (*priority.MAC address*) | 根桥 ID，格式为 bridge-priority.bridge-MAC-address。 |
| **root-path-cost** (*integer*) | 到根桥路径的总开销。 |
| **root-port** (*name*) | 根桥所连接的端口。 |
| **state** (*enabled \| disabled*) | 桥的状态。 |

```ros
[admin@MikroTik] /interface/bridge/monitor bridge1
                    state: enabled                         
      current-mac-address: 2C:C8:1B:FF:92:F4               
                bridge-id: 0x1000.2C:C8:1B:FF:92:F4        
              root-bridge: yes                             
           root-bridge-id: 0x1000.2C:C8:1B:FF:92:F4        
  regional-root-bridge-id: 0x1000.2C:C8:1B:FF:92:F4        
           root-path-cost: 0                               
                root-port: none                            
               port-count: 2                               
    designated-port-count: 2                               
        mst-config-digest: d2b171a8ad95f593c241fc33d419a88c
             fast-forward: no                              
         multicast-router: no                              
             igmp-querier: none                            
              mld-querier: none                            
        declared-vlan-ids: 1                               
      registered-vlan-ids: 1                               
```

## 生成树协议 {#spanning-tree-protocol}

---

RouterOS 桥接接口能够运行生成树协议，以确保拓扑无环且具备冗余性。对于仅有 2 台桥的小型网络，STP 带来的好处不多，但对于更大的网络，正确配置 STP 至关重要，即使仅有一台桥发生故障，将 STP 相关值保留为默认值也可能导致网络完全不可达。要实现恰当的无环且冗余的拓扑，必须正确设置桥优先级、端口路径开销以及端口优先级。

:::danger
在 RouterOS 中，可以将桥接优先级设置为 0 到 65535 之间的任何值，而 IEEE 802.1W 标准规定桥接优先级必须以 4096 为步长。这可能导致不支持此类值的设备之间出现兼容性问题。为避免兼容性问题，建议仅使用以下优先级：0、4096、8192、12288、16384、20480、24576、28672、32768、36864、40960、45056、49152、53248、57344、61440
:::

STP 有多种变体；目前 RouterOS 支持 STP、RSTP 和 MSTP。可根据需要选用其中任意一种；某些设备能够通过硬件卸载来运行其中部分协议，有关哪些设备支持该功能的详细信息，请参见硬件卸载章节。STP 被认为是过时且缓慢的，在几乎所有网络拓扑中它都已被 RSTP 取代，RSTP 与 STP 向后兼容。对于依赖 VLAN 的网络拓扑，建议使用 MSTP，因为它是 VLAN 感知的协议，并能够按 VLAN 组进行负载均衡。在设计启用 STP 的网络时有许多需要考虑的事项，更详细的案例研究可在 [生成树协议](./user-guides/spanning-tree-protocol.md) 文章中查阅。在 RouterOS 中，`protocol-mode` 属性控制所使用的 STP 变体。

:::info
RouterOS 桥接不支持 PVST 及其变体。PVST BPDU（目标 MAC 为 01:00:0C:CC:CC:CD）会被 RouterOS 桥接视为典型的组播数据包。简单来说，它们会经过 RouterOS 桥接/交换转发逻辑，并可能被标记或取消标记。
:::

:::info
根据 IEEE 802.1ad 标准，符合 IEEE 802.1Q 的桥接发出的 BPDU 与 IEEE 802.1ad 桥接不兼容。这意味着在单个二层域中的所有桥接上应使用相同的桥接 VLAN 协议；否则 (R/M)STP 将无法正常工作。
:::

### 每端口 STP {#per-port-stp}

在某些情况下，你可能希望限制单个或多个端口上的 STP 功能。下面你可以找到针对不同使用场景的示例。

:::danger
更改默认 (R/M)STP 功能时要小心；确保你理解 STP 和 BPDU 的工作原理。配置错误的 (R/M)STP 可能导致意外行为。
:::

#### 创建边缘端口并启用 BPDU Guard {#create-edge-ports-and-enable-bpdu-guard}

边缘端口连接到不参与 STP 的终端设备，例如工作站或路由器。设置 `edge=yes` 允许端口跳过 STP 监听和学习状态，直接进入转发状态。为了保护网络免受连接到边缘端口的未经授权的网桥或交换机影响，还应启用 `bpdu-guard=yes`。

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether1 edge=yes bpdu-guard=yes
add bridge=bridge1 interface=ether2
```

当受保护端口收到 BPDU 时，该网桥端口会变为非活动状态，并添加以下日志条目：

```text
2026-09-21 13:46:30 bridge,stp,warning bpdu-guard disabling ether1 due to received bpdu
```

该端口会保持非活动状态，直到手动重新启用。打印网桥端口表以查看 `I`（非活动）标志和说明性的 BPDU Guard 注释：

```ros
[admin@MikroTik] /interface/bridge/port/print
Flags: I - INACTIVE; H - HW-OFFLOAD
Columns: INTERFACE, BRIDGE, HW, HORIZON, TRUSTED, TRUSTED-RA, TRUSTED-DHCPV6, TRUSTED-ARP, FAST-LEAVE, BPDU-GUARD, EDGE, POINT-TO-POINT, PVID, FRAME-TYPES
#    INTERFACE  BRIDGE   HW   HORIZON  TRUSTED  TRUSTED-RA  TRUSTED-DHCPV6  TRUSTED-ARP  FAST-LEAVE  BPDU-GUARD  EDGE  POINT-TO-POINT  PVID  FRAME-TYPES
;;; BPDU guard changed port role to disabled due to received BPDU frame, manual bridge port re-enable is required
0 IH ether1     bridge1  yes  none     no       no          no              no           no          yes         yes   auto               1  admit-all
1  H ether2     bridge1  yes  none     no       no          no              no           no          no          auto  auto               1  admit-all
```

请先移除未经授权的网桥或纠正 BPDU 源。重新启用端口后，非活动标志和 BPDU Guard 注释会被清除：

```ros
[admin@MikroTik] /interface/bridge/port/disable [find interface=ether1]
[admin@MikroTik] /interface/bridge/port/enable [find interface=ether1]
[admin@MikroTik] /interface/bridge/port/print
Flags: H - HW-OFFLOAD
Columns: INTERFACE, BRIDGE, HW, HORIZON, TRUSTED, TRUSTED-RA, TRUSTED-DHCPV6, TRUSTED-ARP, FAST-LEAVE, BPDU-GUARD, EDGE, POINT-TO-POINT, PVID, FRAME-TYPES
#   INTERFACE  BRIDGE   HW   HORIZON  TRUSTED  TRUSTED-RA  TRUSTED-DHCPV6  TRUSTED-ARP  FAST-LEAVE  BPDU-GUARD  EDGE  POINT-TO-POINT  PVID  FRAME-TYPES
0 H ether1     bridge1  yes  none     no       no          no              no           no          yes         yes   auto               1  admit-all
1 H ether2     bridge1  yes  none     no       no          no              no           no          no          auto  auto               1  admit-all
```

#### 启用 Root Guard {#enable-root-guard}

Root Guard 是一种生成树安全功能，可防止端口成为根端口，从而保护活动生成树拓扑不受外部桥接设备影响。在此示例中，**ether1** 配置了 `restricted-role=yes`。此设置会阻止该端口成为 CIST 或任何 MSTI 的根端口，无论其最佳生成树优先级向量如何。此类端口将被选为 Alternate Port（处于 discarding 状态），并且只要它继续收到更优的 BPDU，就会保持该状态。当它不再检测到更优的根路径时，将自动转换为转发状态。网络管理员可以启用此设置，以防止外部桥接设备影响活动生成树。

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether1 restricted-role=yes
add bridge=bridge1 interface=ether2
[admin@MikroTik] /interface/bridge/port/monitor [find]
                  interface: ether1                   ether2            
                     status: in-bridge                in-bridge          
                    port-id: 0x80.1                   0x80.2            
                       role: alternate-port           designated-port
                  edge-port: no                       yes           
        edge-port-discovery: yes                      yes            
        point-to-point-port: yes                      yes            
               external-fdb: no                       no             
               sending-rstp: yes                      yes            
                   learning: no                       yes            
                 forwarding: no                       yes            
           actual-path-cost: 2000                     2000           
    internal-root-path-cost: 2000                                    
       designated-bridge-id: 0x7000.64:D1:54:C7:3A:6E                
   designated-internal-cost: 0                        0              
         designated-port-id: 0x80.1                   0x80.2         
  designated-remaining-hops: 20                       20             
                 tx-rx-bpdu: 2/363                    4/1049         
        discard-transitions: 0                        0              
        forward-transitions: 0                        0              
                   tx-rx-tc: 0/2                      2/4            
           topology-changes: 0                        1              
       last-topology-change:                          34m53s         
           multicast-router: no                       yes            
           hw-offload-group: switch1                  switch1        
          declared-vlan-ids:                          
        registered-vlan-ids:                          
```

## 桥接设置 {#bridge-settings}

---

在桥接设置菜单下，可以控制所有桥接接口的某些功能，并监控全局桥接计数器。

**子菜单：** `/interface/bridge/settings`

| 属性 | 描述 |
| :-- | :-- |
| **use-ip-firewall** (*yes \| no*; 默认值: **no**) | 将桥接流量直接发往 [IP/IPv6 防火墙](../firewall-and-quality-of-service/firewall/index.md)（IP/IPv6 路由的 prerouting、forward 和 postrouting 部分，更多详细信息请参阅 [RouterOS 中的数据包流程](../firewall-and-quality-of-service/packet-flow-in-routeros.md#flow-of-bridged-packet) 文章）。以下是启用此设置可完成某些任务的一些用例： <br/><ul><li>如果您想为流经桥接端口的流量分配 [队列](../firewall-and-quality-of-service/queues/index.md) 或全局 [Queue Tree](../firewall-and-quality-of-service/queues/index.md)。</li><li>如果您想对原本会绕过 IP/IPv6 防火墙的、流经桥接端口的流量使用 IP/IPv6 防火墙功能。</li></ul><br/><strong>注意：</strong> 启用 <code>use-ip-firewall</code> 功能将关闭桥接 [Fast Path](../firewall-and-quality-of-service/packet-flow-in-routeros.md#fast-path)，这反过来会影响对经过该桥接的连接进行 [fasttrack](../firewall-and-quality-of-service/packet-flow-in-routeros.md#fasttrack) 的能力。而且，由于此设置引入了额外的处理步骤（prerouting、forward 和 postrouting 链），在转发数据包时将进一步增加 CPU 使用率。 <br/><strong>路由流量</strong>（包括来自 VLAN 接口的流量，例如在桥接上创建的 <code>/interface/vlan</code>）<strong>已由 IP 防火墙处理</strong>。在这种情况下，启用此设置没有额外效果。 <br/> |
| **use-ip-firewall-for-pppoe** (*yes \| no*; 默认值: **no**) | 将桥接的未加密 PPPoE 封装流量直接发往 IP/IPv6 防火墙。仅当 `use-ip-firewall` 设置为 `yes` 时，此属性才生效。 |
| **use-ip-firewall-for-vlan** (*yes \| no*; 默认值: **no**) | 将桥接的 VLAN 标记流量直接发往 IP/IPv6 防火墙。仅当 <code>use-ip-firewall</code> 设置为 <span className="ros-icon-success"><code>yes</code></span> 时，此属性才生效。 <br/> 如果您需要使用 IP/IPv6 防火墙，并且桥接 <span className="ros-background-accent-green-bolder"><code>vlan-filtering</code></span> 已启用（这涉及 VLAN 标记处理），那么还应启用 <code>use-ip-firewall-for-vlan=yes</code>。 <br/> 启用此设置后，当数据包在 VLAN 接口之间路由时（例如 <code>/interface/vlan</code>），IP 防火墙 <strong>prerouting</strong> 链中的 <code>in-interface</code> 将匹配桥接接口，而不是单个 VLAN 接口。 |
| **allow-fast-path** (*yes \| no*; 默认值: **yes**) | 是否全局启用桥接 Fast Path。 |
| **bridge-fast-path-active** (*yes \| no*; 默认值: *)* | 显示桥接 Fast Path 是否全局处于活动状态。不显示每个桥接接口的 Fast Path 状态。 |
| **bridge-fast-path-packets** (*integer*; 默认值: *)* | 显示由桥接 Fast Path 转发的数据包计数。 |
| **bridge-fast-path-bytes** (*integer*; 默认值: *)* | 显示由桥接 Fast Path 转发的字节计数。 |
| **bridge-fast-forward-packets** (*integer*; 默认值: *)* | 显示由桥接 Fast Forward 转发的数据包计数。 |
| **bridge-fast-forward-bytes** (*integer*; 默认值: *)* | 显示由桥接 Fast Forward 转发的字节计数。 |

:::warning
如果你希望将简单队列或全局队列树分配给由桥接转发的流量，则需要启用 `use-ip-firewall` 属性。如果不使用此属性，桥接流量将永远不会到达 postrouting 链。简单队列和全局队列树在 postrouting 链中工作。要为桥接中的 VLAN 或 PPPoE 流量分配简单队列或全局队列树，你还应启用相应的属性。
:::

## 端口设置 {#port-settings}

---

The Port 子菜单用于将接口添加到特定网桥中。

**子菜单：** `/interface/bridge/port`

| 属性 | 描述 |
| :-- | :-- |
| **auto-isolate** (*yes \| no*; 默认：**no**) | 启用后，如果未从相邻网桥收到 BPDU，则阻止端口从丢弃状态进入转发状态。仅当收到 BPDU 时，端口才会进入转发状态。仅当 `protocol-mode` 设置为 `rstp` 或 `mstp` 且 `edge` 设置为 `no` 时，此属性才会生效。 |
| **bpdu-guard** (*yes \| no*; 默认：**no**) | 在端口上启用或禁用 BPDU Guard 功能。如果该端口收到 BPDU，此功能会将端口置于禁用角色，并且如果收到 BPDU，则需要手动禁用并启用该端口。它应用于防止网桥受到与 BPDU 相关的攻击。当 `protocol-mode` 设置为 `none` 时，此属性无效。 |
| **bridge** (*名称*; 默认：**none**) | 相应接口所归属的网桥接口。 |
| **broadcast-flood** (*yes \| no*; 默认：**yes**) | 启用后，网桥会将广播流量泛洪到所有网桥出口端口。禁用后，网桥会在出口端口上丢弃广播流量。它可用于过滤出口端口上的所有广播流量。广播流量被视为使用 **FF:FF:FF:FF:FF:FF** 作为目标 MAC 地址的流量。此类流量对许多协议至关重要，例如 DHCP、ARP、NDP、BOOTP (Netinstall) 等。此选项不会限制到 CPU 的流量泛洪。 |
| **edge** (*auto \| no \| no-discover \| yes \| yes-discover*; 默认：**auto**) | 将端口设置为边缘端口或非边缘端口，或启用边缘发现。边缘端口连接到没有连接其他网桥的 LAN。边缘端口在 STP 中会跳过学习状态和监听状态，直接转换到转发状态。这会减少 STP 初始化时间。如果端口配置为发现边缘端口，则一旦网桥检测到发往边缘端口的 BPDU，该端口就会变为非边缘端口。当 <code>protocol-mode</code> 设置为 <code>none</code> 时，此属性无效。<ul><li><span className="ros-icon-success"><code>no</code></span> - 非边缘端口，且禁用发现。它将参与 STP 中的学习和监听状态。在交换 BPDU 并与连接的网桥达成一致之前，它不会转换到转发状态。如果未收到 BPDU，端口可能会无限期保持在非转发状态。</li><li><span className="ros-icon-success"><code>no-discover</code></span> - 非边缘端口，启用发现。它将参与 STP 中的学习和监听状态。如果未收到 BPDU，端口可以成为边缘端口。</li><li><span className="ros-icon-success"><code>yes</code></span> - 边缘端口，不启用发现。它将直接转换到转发状态。</li><li><span className="ros-icon-success"><code>yes-discover</code></span> - 边缘端口，启用发现。它将直接转换到转发状态。</li><li><span className="ros-icon-success"><code>auto</code></span> - 与 <span className="ros-icon-success"><code>no-discover</code></span> 相同，但还会检测网桥端口是否为禁用了 bridge-mode 的 Wireless 接口。此类接口将自动设置为不带发现的边缘端口。</li></ul> |
| **fast-leave** (*yes \| no*; 默认：**no**) | 在网桥端口上启用 IGMP/MLD fast leave 功能。当收到 IGMP/MLD leave 消息时，网桥将停止向该网桥端口转发组播流量。仅当 `igmp-snooping` 设置为 `yes` 时，此属性才会生效。 |
| **frame-types** (*admit-all \| admit-only-untagged-and-priority-tagged \| admit-only-vlan-tagged*; 默认：**admit-all**) | 指定网桥端口上允许的入口帧类型。仅当 `vlan-filtering` 设置为 `yes` 时，此属性才会生效。 |
| **ingress-filtering** (*yes \| no*; 默认：**yes**) | 启用或禁用 VLAN 入口过滤，它会检查入口端口是否为网桥 VLAN 表中接收到的 VLAN ID 的成员。应与 `frame-types` 一起使用，以指定入口流量应带标签还是不带标签。仅当 `vlan-filtering` 设置为 `yes` 时，此属性才会生效。自 RouterOS v7 起默认启用该设置。 |
| **learn** (*auto \| no \| yes*; 默认：**auto**) | 更改网桥端口上的 MAC 学习行为<ul><li><span className="ros-icon-success"><code>yes</code></span> - 启用 MAC 学习</li><li><span className="ros-icon-success"><code>no</code></span> - 禁用 MAC 学习</li><li><span className="ros-icon-success"><code>auto</code></span> - 检测网桥端口是否为 Wireless 接口，并使用 Wireless 注册表代替 MAC 学习；如果 Wireless 接口设置为 <span className="ros-icon-success"><code>ap-bridge</code></span>、<span className="ros-icon-success"><code>bridge</code></span>、<span className="ros-icon-success"><code>wds-slave</code></span> 模式之一，并且该 Wireless 接口的 bridge 模式已禁用，则将使用 Wireless 注册表。</li></ul> |
| **multicast-router** (*disabled \| permanent \| temporary-query*; 默认：**temporary-query**) | 组播路由器端口是连接组播路由器或查询器的端口。未注册的组播流和 IGMP/MLD 成员报告将发送到此端口。此设置会更改网桥端口的组播路由器状态。此属性可用于将 IGMP/MLD 成员报告发送到某些网桥端口，以便进一步进行组播路由或代理。仅当 <code>igmp-snooping</code> 设置为 <span className="ros-icon-success"><code>yes</code></span> 时，此属性才会生效。<ul><li><span className="ros-icon-success"><code>disabled</code></span> - 网桥端口上的组播路由器状态已禁用。无论连接到该端口的是什么，未注册的组播和 IGMP/MLD 成员报告都不会发送到该网桥端口。</li><li><span className="ros-icon-success"><code>permanent</code></span> - 网桥端口上的组播路由器状态已启用。无论连接到该端口的是什么，未注册的组播和 IGMP/MLD 成员报告都会发送到该网桥端口。</li><li><span className="ros-icon-success"><code>temporary-query</code></span> - 使用 IGMP/MLD 查询自动检测网桥端口上的组播路由器状态。</li></ul> |
| **horizon** (*整数 0..429496729*; 默认：**none**) | 使用水平分割桥接以防止桥接环路。为一组端口设置相同的值，以防止它们向具有相同 horizon 值的端口发送数据。水平分割是一项软件功能，会禁用硬件卸载。 |
| **hw** (*yes \| no*; 默认：**yes**) | 允许在支持硬件卸载的接口上启用或禁用[硬件卸载](./index.md#bridge-hardware-offloading)。对于软件接口（如 [EoIP](../virtual-private-networks/eoip.md) 或 [VLAN](./vlan.md)），此设置会被忽略且无效。某些网桥或端口功能会自动禁用硬件卸载，请使用 `print` 命令查看 "H" 标志是否处于活动状态。 |
| **internal-path-cost** (*整数：1..200000000*; 默认： ) | 区域内 MSTI0 的接口路径开销。如果未手动配置，网桥会根据接口速度和 <code>port-cost-mode</code> 设置自动确定 internal-path-cost。要恢复自动确定并删除任何手动应用的值，只需在 <code>internal-path-cost</code> 属性前使用感叹号。仅当 <code>protocol-mode</code> 设置为 <code>mstp</code> 时，此属性才会生效。 <br/><code>/interface/bridge/port/set [find interface=sfp28-1] !internal-path-cost</code> 使用 [port monitor](./index.md#bridge-port-monitoring) 观察应用的 internal-path-cost。 <br/> |
| **interface** (*名称*; 默认：**none**) | 接口或接口列表的名称。 |
| **path-cost** (*整数：1..200000000*; 默认： ) | 接口的路径开销，由 STP 和 RSTP 用于确定最佳路径，由 MSTP 用于确定区域之间的最佳路径。如果未手动配置，网桥会根据接口速度和 <code>port-cost-mode</code> 设置自动确定 path-cost。要恢复自动确定并删除任何手动应用的值，只需在 <code>path-cost</code> 属性前使用感叹号。当 <code>protocol-mode</code> 设置为 <code>none</code> 时，此属性无效。 <br/><code>/interface/bridge/port/set [find interface=sfp28-1] !path-cost</code> 使用 [port monitor](./index.md#bridge-port-monitoring) 观察应用的 path-cost。 <br/> |
| **point-to-point** (*auto \| yes \| no*; 默认：**auto**) | 指定网桥端口是否通过点对点链路连接到网桥，以便在发生故障时更快收敛。将此属性设置为 `yes` 会强制该链路为点对点链路，从而跳过检查机制，该机制会检测并等待此单一链路上来自其他设备的 BPDU。将此属性设置为 `no` 表示预期链路可以接收来自多个设备的 BPDU。将此属性设置为 `yes` 可显著改善 (R/M)STP 收敛时间。通常，只有在可能有另一台设备连接到链路时，才应将此属性设置为 `no`。这主要与无线介质和以太网集线器相关。如果以太网链路为全双工，`auto` 会启用点对点功能。当 `protocol-mode` 设置为 `none` 时，此属性无效。 |
| **priority** (*0x00 \| 0x10 \| 0x20 \| 0x30 \| 0x40 \| 0x50 \| 0x60 \| 0x70 \| 0x80 \| 0x90 \| 0xa0 \| 0xb0 \| 0xc0 \| 0xd0 \| 0xe0 \| 0xf0*; 默认：**0x80**) | 接口的优先级，由 STP 用于确定根端口，由 MSTP 用于确定区域之间的根端口。必须以 16 (0x10) 为步长设置。 |
| **pvid** (*整数 1..4094*; 默认：**1**) | 端口 VLAN ID (pvid) 指定未打标签的入口流量被分配到哪个 VLAN。仅当 `vlan-filtering` 设置为 `yes` 时，此属性才会生效。 |
| **restricted-role** (*yes \| no*; 默认：**no**) | 在端口上启用或禁用 restricted role。启用后，无论其最佳生成树优先级向量如何，它都会阻止该端口成为 CIST 或任何 MSTI 的根端口。此类端口将被选为备用端口（丢弃状态），并且只要它继续收到更优 BPDU，就会保持该状态。当它不再检测到更优根路径时，将自动转换到转发状态。网络管理员可以启用此设置，以防止外部网桥影响活动生成树，此功能也称为 root-guard 或 root-protection。当 `protocol-mode` 设置为 `stp`、`rstp` 或 `mstp` 时，此属性生效（自 RouterOS v7.14 起支持 STP 和 RSTP）。 |
| **restricted-tcn** (*yes \| no*; 默认：**no**) | 在端口上启用或禁用拓扑变化通知 (TCN) 处理。启用后，该端口不会将收到的拓扑变化通知传播到其他端口，并且由该端口自身引起的任何变化也不会向其他端口产生拓扑变化通知。此参数默认禁用。网络管理员可以设置此参数，以防止外部网桥在本地网络中导致 MAC 地址刷新。当 `protocol-mode` 设置为 `stp`、`rstp` 或 `mstp` 时，此属性生效（自 RouterOS v7.14 起支持 STP 和 RSTP）。 |
| **tag-stacking** (*yes \| no*; 默认：**no**) | 强制将所有数据包视为未打标签的数据包。入口端口上的数据包将被打上另一个 VLAN 标签，无论是否已存在 VLAN 标签。数据包将使用与 `pvid` 值匹配的 VLAN ID 打标签，并使用 `ether-type` 中指定的 EtherType。仅当 `vlan-filtering` 设置为 `yes` 时，此属性才会生效。 |
| **trusted** (*yes \| no*; 默认：**no**) | 启用后，允许通过此端口将 DHCP 数据包转发到 DHCP 服务器。主要用于防止未经授权的服务器向用户提供恶意信息。仅当 `dhcp-snooping` 设置为 `yes` 时，此属性才会生效。 |
| **trusted-arp** (*yes \| no*; 默认：**no**) | 启用后，到达此端口的 ARP 数据包将不经 DHCP snooping 绑定数据库验证直接转发。禁用后，到达此端口的 ARP 数据包会根据 DHCP snooping 绑定数据库进行验证，发送方 MAC–IP 对与绑定条目不匹配的数据包将被丢弃。仅当 `arp-inspection` 设置为 `yes` 时，此属性才会生效。 |
| **trusted-dhcpv6** (*yes \| no*; 默认：**no**) | 启用后，允许通过此端口将 DHCPv6 数据包转发到 DHCP 服务器。主要用于防止未经授权的服务器向用户提供恶意信息。仅当 `dhcpv6-snooping` 设置为 `yes` 时，此属性才会生效。 |
| **trusted-ra** (*yes \| no*; 默认：**no**) | 指定是否允许该端口转发 IPv6 路由器通告消息；对于连接到合法路由器的端口设置为 **yes**，对于阻止未经授权来源的端口设置为 **no**。仅当 `ra-guard` 设置为 `yes` 时，此属性才会生效。 |
| **unknown-multicast-flood** (*yes \| no*; 默认：**yes**) | 更改网桥端口上的组播泛洪选项，且仅控制出口流量。启用后，网桥允许将组播数据包泛洪到指定的网桥端口；禁用后，网桥会限制将组播流量泛洪到指定的网桥端口。该设置会影响所有组播流量。这包括非 IP、IPv4、IPv6 以及链路本地组播范围（例如 224.0.0.0/24 和 ff02::1）。 <br/> 请注意，当启用了 <code>igmp-snooping</code> 并检测到 IGMP/MLD 查询器时，网桥会自动限制未知 IP 组播的泛洪，因此对于 IGMP/MLD snooping 设置而言，此设置不是必需的。 <br/> 将此设置与 <code>igmp-snooping</code> 一起使用时，网桥端口上唯一允许的组播流量是来自 MDB 表的已知组播。 |
| **unknown-unicast-flood** (*yes \| no*; 默认：**yes**) | 更改网桥端口上的未知单播泛洪选项，且仅控制出口流量。启用后，网桥允许将未知单播数据包泛洪到指定的网桥端口；禁用后，网桥会限制将未知单播流量泛洪到指定的网桥端口。 <br/> 如果某个 MAC 地址未在主机表中学习到，则该流量被视为未知单播流量，并会泛洪到所有端口。一旦在网桥端口上收到数据包并将源 MAC 地址添加到网桥主机表，就会学习到该 MAC 地址。由于网桥需要在网桥端口上至少接收一个数据包才能学习 MAC 地址，因此建议使用静态网桥主机条目，以避免在 MAC 地址学习完成之前数据包被丢弃。 |

:::info
RouterOS 每个桥接最多可以处理 1024 个桥接接口；此限制是固定的，无法修改。如果你尝试添加更多接口作为桥接端口，可能会导致不可预测的行为。
:::

### 示例 {#example-1}

此示例演示如何将以太网端口添加到现有网桥接口，以创建简单的二层交换配置。通过将 **ether1** 和 **ether2** 添加到 **bridge1**，这些物理端口会成为单个交换网段的一部分，从而使连接到任一端口的设备能够像在同一 LAN 上一样相互通信。

首先，将每个端口添加到网桥接口：

```ros
[admin@MikroTik] /interface/bridge/port/add bridge=bridge1 interface=ether1
[admin@MikroTik] /interface/bridge/port/add bridge=bridge1 interface=ether2
```

通过显示网桥端口表来验证配置：

```ros
[admin@MikroTik] /interface/bridge/port/print
Flags: X - disabled, I - inactive, D - dynamic, H - hw-offload 
 #     INTERFACE       BRIDGE       HW  PVID PRIORITY  PATH-COST INTERNAL-PATH-COST    HORIZON
 0     ether1          bridge1      yes  100     0x80         10                 10       none
 1     ether2          bridge1      yes  200     0x80         10                 10       none
```

输出确认两个端口现已桥接在一起。**H** 标志表示硬件卸载已启用，这意味着交换芯片正在处理数据包转发以获得最佳性能。每个端口分别分配了默认 PVID（端口 VLAN ID）100 和 200，且两者都使用标准 STP 优先级 0x80。

### 接口列表 {#interface-lists}

从 RouterOS v6.41 开始，接口列表可以作为桥接端口添加并进行排序。接口列表通过将多个接口分组在一起，简化了防火墙规则配置。以下示例演示如何将接口列表添加到桥接中：

```ros
/interface/list
add name=LAN1
add name=LAN2
/interface/list/member
add interface=ether1 list=LAN1
add interface=ether2 list=LAN1
add interface=ether3 list=LAN2
add interface=ether4 list=LAN2
/interface/bridge/port
add bridge=bridge1 interface=LAN1
add bridge=bridge1 interface=LAN2
```

当接口列表被添加到桥接中时，这些列表中的各个端口会显示为动态端口条目：

```ros
[admin@MikroTik] /interface/bridge/port> pr
Flags: X - disabled, I - inactive, D - dynamic, H - hw-offload 
 #     INTERFACE       BRIDGE       HW  PVID PRIORITY  PATH-COST INTERNAL-PATH-COST    HORIZON
 0     LAN1            bridge1      yes    1     0x80         10                 10       none
 1  D  ether1          bridge1      yes    1     0x80         10                 10       none
 2  D  ether2          bridge1      yes    1     0x80         10                 10       none
 3     LAN2            bridge1      yes    1     0x80         10                 10       none
 4  D  ether3          bridge1      yes    1     0x80         10                 10       none
 5  D  ether4          bridge1      yes    1     0x80         10                 10       none
```

可以使用 `move` 命令重新排列接口列表出现的顺序。第二个参数指定所选接口列表应放置在其之前的位置。以下示例演示如何对接口列表进行排序：

```ros
[admin@MikroTik] > /interface/bridge/port/move 3 0
[admin@MikroTik] > /interface/bridge/port/print
Flags: X - disabled, I - inactive, D - dynamic, H - hw-offload 
 #     INTERFACE       BRIDGE       HW  PVID PRIORITY  PATH-COST INTERNAL-PATH-COST    HORIZON
 0     LAN2            bridge1      yes    1     0x80         10                 10       none
 1  D  ether3          bridge1      yes    1     0x80         10                 10       none
 2  D  ether4          bridge1      yes    1     0x80         10                 10       none
 3     LAN1            bridge1      yes    1     0x80         10                 10       none
 4  D  ether1          bridge1      yes    1     0x80         10                 10       none
 5  D  ether2          bridge1      yes    1     0x80         10                 10       none
```

:::warning
使用 `move` 命令时，第二个参数表示 "before id" 位置，它确定所选接口列表将被移动到哪里。如果将第一个接口列表移动到第二个接口列表的位置，该命令将无效，因为第一个列表已经位于第二个列表之前。
:::

### VLAN 表中的接口列表 {#interface-lists-in-vlan-table}

从 RouterOS 7.17 版本开始，可以在桥接 VLAN 表中为 `tagged` 和 `untagged` 属性使用接口列表。此增强功能允许通过仅修改接口列表成员，而不是逐个更新每个桥接 VLAN 条目，来更灵活地将 VLAN 分配给端口。

如果为 `tagged` 和 `untagged` 设置指定了不同的接口列表，并且接口成员之间存在重叠，则 `untagged` 列表优先。可以使用 `current-tagged` 和 `current-untagged` 属性以及 `print` 命令检查当前接口配置。

以下示例演示如何将新接口添加到现有接口列表，自动更新桥接端口和 VLAN 表，而无需直接修改这些菜单中的设置：

```ros
/interface/list
add name=vlan10_untagged
add name=vlan20_untagged
add name=vlan_tagged
/interface/list/member
add interface=ether2 list=vlan10_untagged
add interface=ether3 list=vlan10_untagged
add interface=ether4 list=vlan20_untagged
add interface=sfp-sfpplus1 list=vlan_tagged
/interface/bridge
add frame-types=admit-only-vlan-tagged name=bridge1 vlan-filtering=yes
/interface/bridge/port
add bridge=bridge1 frame-types=admit-only-untagged-and-priority-tagged interface=vlan10_untagged pvid=10
add bridge=bridge1 frame-types=admit-only-untagged-and-priority-tagged interface=vlan20_untagged pvid=20
add bridge=bridge1 frame-types=admit-only-vlan-tagged interface=vlan_tagged
/interface/bridge/vlan
add bridge=bridge1 tagged=vlan_tagged vlan-ids=10
add bridge=bridge1 tagged=vlan_tagged vlan-ids=20

[admin@MikroTik] /interface/bridge/port/print 
Flags: D - DYNAMIC; H - HW-OFFLOAD
Columns: INTERFACE, BRIDGE, HW, PVID, PRIORITY, HORIZON
#    INTERFACE        BRIDGE   HW   PVID  PRIORITY  HORIZON
0    vlan10_untagged  bridge1  yes    10  0x80      none   
1 DH ether2           bridge1  yes    10  0x80      none   
2 DH ether3           bridge1  yes    10  0x80      none   
3    vlan20_untagged  bridge1  yes    20  0x80      none   
4 DH ether4           bridge1  yes    20  0x80      none   
5    vlan_tagged      bridge1  yes     1  0x80      none   
6 DH sfp-sfpplus1     bridge1  yes     1  0x80      none   

[admin@MikroTik] /interface/bridge/vlan/print
Flags: D - DYNAMIC
Columns: BRIDGE, VLAN-IDS, CURRENT-TAGGED, CURRENT-UNTAGGED
#   BRIDGE   VLAN-IDS  CURRENT-TAGGED  CURRENT-UNTAGGED
;;; added by pvid
0 D bridge1        10                  ether2          
                                       ether3          
;;; added by pvid
1 D bridge1        20                  ether4          
2   bridge1        10  sfp-sfpplus1                    
3   bridge1        20  sfp-sfpplus1                 

# 对接口列表成员进行必要的更改：
/interface/list/member/add list=vlan20_untagged interface=ether5
/interface/list/member/add list=vlan_tagged interface=sfp-sfpplus2 

# 在 bridge port 和 vlan 菜单中验证更改：
[admin@MikroTik] > /interface/bridge/port/print 
Flags: D - DYNAMIC; H - HW-OFFLOAD
Columns: INTERFACE, BRIDGE, HW, PVID, PRIORITY, HORIZON
#    INTERFACE        BRIDGE   HW   PVID  PRIORITY  HORIZON
0    vlan10_untagged  bridge1  yes    10  0x80      none   
1 DH ether2           bridge1  yes    10  0x80      none   
2 DH ether3           bridge1  yes    10  0x80      none   
3    vlan20_untagged  bridge1  yes    20  0x80      none   
4 DH ether4           bridge1  yes    20  0x80      none   
5 DH ether5           bridge1  yes    20  0x80      none   
6    vlan_tagged      bridge1  yes     1  0x80      none   
7 DH sfp-sfpplus1     bridge1  yes     1  0x80      none   
8 DH sfp-sfpplus2     bridge1  yes     1  0x80      none   

[admin@MikroTik] > /interface/bridge/vlan/print 
Flags: D - DYNAMIC
Columns: BRIDGE, VLAN-IDS, CURRENT-TAGGED, CURRENT-UNTAGGED
#   BRIDGE   VLAN-IDS  CURRENT-TAGGED  CURRENT-UNTAGGED
;;; added by pvid
0 D bridge1        10                  ether2          
                                       ether3          
;;; added by pvid
1 D bridge1        20                  ether4          
                                       ether5          
2   bridge1        10  sfp-sfpplus1                    
                       sfp-sfpplus2                    
3   bridge1        20  sfp-sfpplus1                    
                       sfp-sfpplus2                    
```

### 桥接端口监控 {#bridge-port-monitoring}

要监控桥接端口的当前状态，请使用 `monitor` 命令。

**子菜单：** `/interface/bridge/port/monitor`

| 属性 | 描述 |
| :-- | :-- |
| **actual-path-cost** (*integer: 1..200000000*) | 显示实际端口路径开销。该值可以是手动配置的，也可以是根据接口速率和 `port-cost-mode` 设置自动确定的。 |
| **declared-vlan-ids** (*integer 1..4094*) | 接口通过 [MVRP 协议](./index.md#mvrp) 声明的 VLAN。 |
| **designated-bridge-id** (*priority.MAC address*) | 显示指定网桥标识符，该值根据端口的优先级向量确定。 |
| **designated-cost** (*integer*) | 显示指定根路径开销，该值根据端口的优先级向量确定。 |
| **designated-internal-cost** (*integer*) | 显示指定内部根路径开销，该值根据端口的优先级向量确定。 |
| **designated-message-age**(*time)* | 显示指定消息老化时间，该值根据端口的优先级向量确定。 |
| **designated-max-age** (*time)* | 显示指定最大老化时间，该值根据端口的优先级向量确定。BPDU 数据包可以通过的网桥数量由 `max-message-age` 参数指定。 |
| **designated-port-id** (*priority*.*integer*) | 显示指定端口标识符，该值根据端口的优先级向量确定。 |
| **designated-remaining-hops** (*integer*) | 显示指定剩余跳数，该值根据端口的优先级向量确定。即数据包在到达目的地之前允许经过的跳数。 |
| **discard-transitions** (*integer*) | 计数器，记录端口进入丢弃状态的次数。 |
| **edge-port** (*yes \| no*) | 该端口是否为边缘端口。 |
| **edge-port-discovery** (*yes \| no*) | 该端口是否设置为自动检测边缘端口。 |
| **external-fdb** (*yes \| no*) | 是否使用注册表而非转发数据库。 |
| **forwarding** (*yes \| no*) | 显示该端口是否未被 (R/M)STP 阻塞。 |
| **forward-transitions** (*integer*) | 计数器，记录端口进入转发状态的次数 |
| **hw-offload-group** (*switchX*) | 该端口使用的交换芯片。 |
| **interface** (*name*) | 接口名称。 |
| **last-topology-change** (*time)* | 上次拓扑变化计时器，记录自上次变化以来的时间。 |
| **learning** (*yes \| no*) | 显示该端口是否能够学习 MAC 地址。 |
| **multicast-router** (*yes \| no*) | 显示是否在该端口上检测到组播路由器。仅当启用 `igmp-snooping` 时才会显示该监控值。 |
| **registered-vlan-ids** (*integer 1..4094*) | 接口通过 [MVRP 协议](./index.md#mvrp) 注册的 VLAN。 |
| **port-id** (*priority*.*integer*) | 在生成树协议中，每个端口都有唯一的端口标识符。即优先级[十六进制] + 端口号。 |
| **point-to-point-port** (*yes \| no*) | 该端口是否以全双工（yes）或半双工（no）方式连接到网桥端口。 |
| **role** (*designated \| root-port \| alternate \| backup \| disabled*) | (R/M)STP 算法分配的端口角色：<br/><ul><li><span className="ros-icon-success"><code>disabled-port</code></span> - 已禁用或未激活的端口。</li><li><span className="ros-icon-success"><code>root-port</code></span> - 面向根网桥且具有到根网桥的最佳（最低开销）路径的端口。每个网桥只选举一个根端口（根网桥本身除外）。</li><li><span className="ros-icon-success"><code>alternative-port</code></span> - 面向根网桥但不会转发流量的端口。当当前根端口故障时，该端口提供到根网桥的备份路径。</li><li><span className="ros-icon-success"><code>designated-port</code></span> - 背向根网桥并将流量从根网桥转发到下游设备的端口。</li><li><span className="ros-icon-success"><code>backup-port</code></span> - 背向根网桥且会转发流量的端口。该端口作为同一网段上指定端口的备份。</li></ul> 在 RouterOS 中，<strong>role</strong> 监控属性即使在使用 STP 模式时也会显示 RSTP 角色，例如 <code>alternate-port</code> 和 <code>backup-port</code>。这在技术上并不正确，但不会影响 STP 的运行。这是因为 STP 对所有被阻塞的端口一视同仁，不区分其用途（例如作为潜在的备份路径）。所显示的角色只是 RSTP 功能的反映，在 STP 使用时没有实际影响。更多详细信息请参见 [STP 和 RSTP 页面](./user-guides/spanning-tree-protocol.md#stp-and-rstp)。 |
| **root-path-cost** (*integer*) | 到根网桥的路径总开销。 |
| **sending-rstp** (*yes \| no*) | 该端口使用的是 RSTP 还是 MSTP 类型的 BPDU。当启用了 RSTP/MSTP 的端口收到 STP BPDU 时，该端口会转换为 STP 类型。此设置**并不**表示 BPDU 是否实际被发送。 |
| **status** (*in-bridge \| inactive*) | 端口状态：<ul><li><span className="ros-icon-success"><code>in-bridge</code></span> - 端口已启用</li><li><span className="ros-icon-success"><code>inactive</code></span> - 端口已禁用。</li></ul> |
| **tx-rx-bpdu** (*integer*) | 发送/接收的 bpdu 消息计数器。 |
| **tx-rx-tc** (*integer*) | 发送/接收的拓扑变化消息。 |
| **topology-changes** (*integer*) | 拓扑变化计数器。 |

```ros
[admin@MikroTik] /interface/bridge/port/monitor [find interface=ether1] 
                  interface: ether1                  
                     status: in-bridge               
                    port-id: 0x80.1                  
                       role: root-port               
                  edge-port: no                      
        edge-port-discovery: yes                     
        point-to-point-port: yes                     
               external-fdb: no                      
               sending-rstp: yes                     
                   learning: yes                     
                 forwarding: yes                     
           actual-path-cost: 20000                   
    internal-root-path-cost: 20000                   
       designated-bridge-id: 0x1000.2C:C8:1B:FF:92:F4
   designated-internal-cost: 0                       
         designated-port-id: 0x80.1                  
  designated-remaining-hops: 20                      
                 tx-rx-bpdu: 3/63                    
        discard-transitions: 0                       
        forward-transitions: 1                       
                   tx-rx-tc: 2/0                     
           topology-changes: 1                       
       last-topology-change: 2m5s                    
           multicast-router: no                      
           hw-offload-group: switch1                 
          declared-vlan-ids: 1                       
        registered-vlan-ids: 1                       
```

## 主机表 {#hosts-table}

---

主机表显示已在网桥接口上学习到的 MAC 地址。该表还显示各种标志，提供有关每个主机条目的附加信息。可通过 `/interface/bridge/host` 子菜单访问主机表。

**子菜单：** `/interface/bridge/host`

| 属性 | 描述 |
| :-- | :-- |
| **bridge** (*read-only: name*) | 主机条目所属的网桥 |
| **disabled** (*read-only: flag*) | 表示该静态主机条目是否已禁用 |
| **dynamic** (*read-only: flag*) | 表示该主机是否为动态学习到的 |
| **external** (*read-only: flag*) | 表示该主机是否是从外部表（例如交换芯片或 Wireless 注册表）学习到的。在硬件卸载的网桥端口上添加的静态主机条目不会显示此标志 |
| **invalid** (*read-only: flag*) | 表示该主机条目是否无效。对于配置在被移除的接口上的静态主机，可能会出现此标志 |
| **local** (*read-only: flag*) | 表示该主机条目是否由网桥自身创建，网桥自身会显示所有本地接口 |
| **mac-address** (*read-only: MAC address*) | 主机的 MAC 地址 |
| **on-interface** (*read-only: name*) | 主机所连接的网桥端口 |

### 监控 {#monitoring}

要查看活动主机表，请使用 `print` 命令。该表会显示已在网桥接口上学习到的所有 MAC 地址，以及标志指示和连接详情。

```ros
[admin@MikroTik] /interface/bridge/host/print
Flags: X - disabled, I - invalid, D - dynamic, L - local, E - external 
 #       MAC-ADDRESS        VID ON-INTERFACE            BRIDGE
0   D   B8:69:F4:C9:EE:D7      ether1                  bridge1
1   D   B8:69:F4:C9:EE:D8      ether2                  bridge1
2   DL  CC:2D:E0:E4:B3:38      bridge1                 bridge1
3   DL  CC:2D:E0:E4:B3:39      ether2                  bridge1
```

输出显示：

- **D** 标志：动态学习到的 MAC 地址
- **DL** 标志：本地接口 MAC 地址（网桥自身及其端口接口）
- **VID**：与主机条目关联的 VLAN ID
- **ON-INTERFACE**：学习到该主机的网桥端口
- **BRIDGE**：该主机所属的网桥接口

### 静态条目 {#static-entries}

网桥主机表支持配置静态 MAC 地址条目。静态条目在两种主要场景下很有用：将特定流量引导通过指定端口，以及通过禁用动态 MAC 学习、仅依赖预配置的静态条目来保护设备资源。

下表列出了静态 MAC 地址条目的所有可配置参数：

**子菜单：** `/interface/bridge/host`

| 属性 | 描述 |
| :-- | :-- |
| **bridge** (*name*；默认值：**none**) | 为其分配 MAC 地址的网桥接口。 |
| **disabled** (*yes \| no*；默认值：**no**) | 启用或禁用该静态 MAC 地址条目。 |
| **interface** (*name*；默认值：**none**) | 转发该 MAC 地址流量的接口名称。 |
| **mac-address** (*MAC address*；默认值： ) | 要静态添加到主机表中的 MAC 地址。 |
| **vid** (*integer: 1..4094*；默认值： ) | 与该静态 MAC 地址条目关联的 VLAN ID。 |

**示例：** 要将发往 MAC 地址 **4C:5E:0C:4D:12:43** 的所有流量仅通过 **ether2** 转发，请使用以下命令：

```ros
/interface/bridge/host
add bridge=bridge1 interface=ether2 mac-address=4C:5E:0C:4D:12:43
```

## 组播表 {#multicast-table}

---

组播表显示通过 IGMP/MLD snooping 学习到的组播组成员关系信息。当在桥上启用 IGMP/MLD snooping 时，设备会主动监控 IGMP/MLD 网络通信，以构建活动组播组及其订阅端口成员的组播数据库（MDB）。然后，桥使用此信息将组播流量智能地仅转发到连接了感兴趣的接收者设备的端口，而不是将组播流量泛洪到所有端口。

请注意，发往链路本地组播组 224.0.0.0/24 和 ff02::1 的数据包是此行为的例外——这些地址始终无限制地泛洪到所有端口和 VLAN，因为它们用于网络协议操作。

要查看当前组播数据库条目的表，请在组播数据库子菜单中使用 `print` 命令。

**子菜单：** `/interface/bridge/mdb`

| 属性 | 描述 |
| :-- | :-- |
| <strong>bridge</strong> (<em>read-only: name</em>) | 显示该条目所属的桥接接口。 |
| <strong>group</strong> (*read-only:*ipv4 | ipv6 |
| <strong>on-interface</strong> (<em>read-only: name</em>) | 显示已订阅该组播组的桥接端口。 |
| <strong>vid</strong> (<em>read-only: integer</em>) | 显示该组播组的 VLAN ID，仅在启用 <span className="ros-background-accent-green-bolder"><code>vlan-filtering</code></span> 时适用。 |

```ros
[admin@MikroTik] /interface/bridge/mdb/print 
Flags: D - DYNAMIC
Columns: GROUP, VID, ON-PORTS, BRIDGE
 #   GROUP              VID  ON-PORTS  BRIDGE 
 0 D ff02::2              1  bridge1   bridge1
 1 D ff02::6a             1  bridge1   bridge1
 2 D ff02::1:ff00:0       1  bridge1   bridge1
 3 D ff02::1:ff01:6a43    1  bridge1   bridge1
 4 D 229.1.1.1           10  ether2    bridge1
 5 D 229.2.2.2           10  ether3    bridge1
                             ether2           
 6 D ff02::2             10  ether5    bridge1
                             ether3           
                             ether2           
                             ether4           
```

### 静态条目 {#static-entries-1}

自 RouterOS 7.7 版本起，可以为 IPv4 和 IPv6 组播组创建静态 MDB 条目。

**子菜单：** `/interface/bridge/mdb`

| 属性 | 描述 |
| :-- | :-- |
| **bridge** (*name*; 默认值：) | 将为其分配 MDB 条目的网桥接口。 |
| **disabled** (*yes \| no*; 默认值：**no**) | 禁用或启用静态 MDB 条目。 |
| **group** (*ipv4 \| ipv6 \| MAC address*; 默认值：) | IPv4、IPv6 或 MAC 组播地址。无法为链路本地组播组 224.0.0.0/24 和 ff02::1 创建静态条目，因为这些数据包始终会在所有端口和 VLAN 上泛洪。 |
| **interface** (*name*; 默认值：) | 组播组将被转发到的网桥端口列表。 |
| **vid** (*integer: 1..4094*; 默认值：) | 将在其上创建 MDB 条目的 VLAN ID 仅在启用 `vlan-filtering` 时适用。未指定 VLAN ID 时，条目将工作在 shared-VLAN 模式下，并动态应用于特定端口的全部已定义 VLAN ID。 |

例如，要为 VLAN 10 上端口 ether2 和 ether3 的组播组 229.10.10.10 创建静态 MDB 条目，请使用以下命令：

```ros
/interface/bridge/mdb
add bridge=bridge1 group=229.10.10.10 interface=ether2,ether3 vid=10
```

使用 `print` 命令验证结果：

```ros
[admin@MikroTik] > /interface/bridge/mdb/print where group=229.10.10.10
Columns: GROUP, VID, ON-PORTS, BRIDGE
 # GROUP         VID  ON-PORTS  BRIDGE 
12 229.10.10.10   10  ether2    bridge1
                      ether3   
```

如果某个 IPv6 组播组不需要被侦听，并且希望它在所有端口和 VLAN 上泛洪，则可以在所有 VLAN 和端口（包括网桥接口本身）上创建静态 MDB 条目。使用以下命令为所有 VLAN 和端口上的组播组 ff02::2 创建静态 MDB 条目（请根据你的具体设置修改 `ports` 设置）：

```ros
/interface/bridge/mdb
add bridge=bridge1 group=ff02::2 interface=bridge1,ether2,ether3,ether4,ether5

[admin@MikroTik] > /interface/bridge/mdb/print where group=ff02::2
Flags: D - DYNAMIC
Columns: GROUP, VID, ON-PORTS, BRIDGE
 #   GROUP    VID  ON-PORTS  BRIDGE 
 0   ff02::2                 bridge1
15 D ff02::2    1  bridge1   bridge1
16 D ff02::2   10  bridge1   bridge1
                   ether2           
                   ether3           
                   ether4           
                   ether5           
17 D ff02::2   20  bridge1   bridge1
                   ether2           
                   ether3           
18 D ff02::2   30  bridge1   bridge1
                   ether2           
                   ether3     
```

## 网桥硬件卸载 {#bridge-hardware-offloading}

---

如果设备具有内置交换芯片，就可以将多个端口组合交换。虽然网桥是一种会消耗 CPU 资源的软件功能，但网桥硬件卸载允许你使用内置交换芯片以线速转发数据包。如果配置正确，这可以让你实现更高的吞吐量。

![HWoffloading_diagram](/img/8d426fcfc1794e99.webp)

其中一个端口接收到的数据包总是首先经过交换逻辑。交换逻辑决定数据包应发往哪些端口——通常基于目标 MAC 地址。硬件转发的数据包对 RouterOS 不可见（只有统计信息会显示数据包已经过）。这是因为该数据包已由交换芯片处理，从未到达 CPU。

数据包可以通过交换机 CPU 端口转发到 CPU，用于管理访问、路由、防火墙规则或流量控制。这需要针对您的设备和使用场景进行特定配置。请查看适用于您特定设备的手册页：

- [Marvell Prestera 交换机芯片功能](./marvell-prestera-switch-chip-features.md)
- [CRS1xx/2xx 系列交换机](./user-guides/crs1xx-2xx-series-switches-examples.md)
- [非 CRS 系列交换机](./switch-chip-features.md)

:::danger
某些桥接和以太网端口属性与交换机芯片设置直接相关。更改此类属性可能会触发**交换机芯片重置**，临时禁用所有以太网端口。在生产环境中更改属性时必须考虑到这一点。此类属性包括 DHCP 监听、IGMP 监听、VLAN 过滤、L2MTU、流量控制等。可能触发交换机芯片重置的确切设置取决于设备型号。
:::

:::warning
[CRS1xx/2xx 系列交换机](./user-guides/crs1xx-2xx-series-switches-examples.md#multiple-switch-groups)支持每个交换机芯片多个硬件卸载桥接。所有其他设备仅支持一个。在 `/interface/bridge/port` 下使用 `hw=yes/no` 选择哪个桥接使用硬件卸载。
:::

以下表格列出了每种交换机芯片类型下，哪些网桥功能支持硬件卸载（✓）或会禁用硬件卸载（✗）：

### 搭载 Marvell Prestera 交换机的 MikroTik 设备 {#mikrotik-devices-with-marvell-prestera-switch}

例如：CRS3xx、CRS4xx、CRS5xx、CRS8xx、CCR2116、CCR2216、RDS2216。请参阅 [Marvell Prestera 交换机芯片功能](./marvell-prestera-switch-chip-features.md)。

| 功能 | 硬件卸载 |
| :-- | :--: |
| STP/RSTP | ✓ |
| MSTP | ✓ |
| VLAN 过滤 | ✓ |
| IGMP 侦听 | ✓ |
| DHCP 侦听 | ✓ |
| ARP Inspection | ✓ |
| IP Source Guard | ✓ |
| DHCPv6 侦听 | ✓ |
| RA 防护 | ✓ |
| 绑定¹ | ✓ |
| MLAG | ✓ |
| Horizon | ✗ |

¹ 只有 `mode=802.3ad`（LACP）、`mode=balance-xor`（静态 LAG）和 `mode=active-backup` 绑定接口支持硬件卸载。其他模式不支持硬件卸载。交换机始终使用 Layer2+Layer3+Layer4 作为发送哈希策略，更改发送哈希策略不会产生任何效果。

### 88E6393X, 88E6191X, 88E6190 {#88e6393x-88e6191x-88e6190}

例如：RB5009 系列、L009 系列、CCR2004-16G-2S+。请参阅 [交换机芯片功能](./switch-chip-features.md)。

| 功能 | 硬件卸载 |
| :-- | :--: |
| STP/RSTP | ✓ |
| MSTP | ✓ |
| VLAN 过滤¹ | ✓ |
| IGMP 侦听² | ✓ |
| DHCP 侦听² | ✓ |
| ARP Inspection | ✗ |
| IP Source Guard | ✗ |
| 绑定³ | ✓ |
| DHCPv6 侦听 | ✗ |
| RA 防护 | ✗ |
| MLAG | ✗ |
| Horizon | ✗ |

¹ 不支持 `ether-type=0x88a8` 或 `ether-type=0x9100`（仅支持默认 `ether-type=0x8100`）。不支持 `tag-stacking=yes`。使用这些功能会禁用硬件卸载。  
² 不支持 QinQ，仅解析第一个 VLAN 标签。双重标记的 DHCP 或 IGMP 数据包可能会被错误处理。  
³ 仅 `mode=802.3ad`（LACP）、`mode=balance-xor`（静态 LAG）和 `mode=active-backup` 绑定接口支持硬件卸载。其他模式不支持硬件卸载。仅限于 Layer2 传输哈希，更改传输哈希策略没有任何效果。

### MT7621, MT7531, EN7523, RTL8367 {#mt7621-mt7531-en7523-rtl8367}

例如：hEX S、hAP ax lite、hEX Refresh、RBM33G、RB4011、RB1100AHx4。参见 [交换机芯片功能](./switch-chip-features.md)。

| 功能 | 硬件卸载 |
| :-- | :--: |
| STP/RSTP | ✓ |
| MSTP | ✓ |
| VLAN 过滤¹ | ✓ |
| IGMP 侦听 | ✗ |
| DHCP 侦听 | ✗ |
| ARP Inspection | ✗ |
| IP Source Guard | ✗ |
| DHCPv6 侦听 | ✗ |
| RA 防护 | ✗ |
| 绑定 | ✗ |
| MLAG | ✗ |
| Horizon | ✗ |

¹ 不支持 `ether-type=0x88a8` 或 `ether-type=0x9100`（仅支持默认 `ether-type=0x8100`）。不支持 `tag-stacking=yes`。使用这些功能会禁用硬件卸载。

### CRS1xx/CRS2xx 系列 {#crs1xxcrs2xx-series}

例如：CRS105、CRS106、CRS109、CRS112、CRS125、CRS210、CRS212、CRS226。参见 [CRS1xx/2xx 系列交换机](./user-guides/crs1xx-2xx-series-switches-examples.md)。

| 功能 | 硬件卸载 |
| :-- | :--: |
| STP/RSTP | ✓ |
| IGMP 侦听¹ | ✓ |
| DHCP 侦听¹ | ✓ |
| ARP Inspection | ✗ |
| IP Source Guard | ✗ |
| MSTP | ✗ |
| VLAN 过滤 | ✗ |
| DHCPv6 侦听 | ✗ |
| RA 防护 | ✗ |
| 绑定 | ✗ |
| MLAG | ✗ |
| Horizon | ✗ |

¹ 该功能在 VLAN 交换配置中无法正常工作。

### QCA8337, Atheros8327, Atheros8316 {#qca8337-atheros8327-atheros8316}

例如：RB3011、RB1100AHx2、RB850Gx2、cAP ac、wAP ac、Audience、mANTBox、CCR1009。参见[交换机芯片功能](./switch-chip-features.md)。

| 功能 | 硬件卸载 |
| :-- | :--: |
| STP/RSTP | ✓ |
| DHCP 侦听¹ | ✓ |
| ARP Inspection | ✗ |
| IP Source Guard | ✗ |
| MSTP | ✗ |
| VLAN 过滤 | ✗ |
| IGMP 侦听 | ✗ |
| DHCPv6 侦听 | ✗ |
| RA 防护 | ✗ |
| 绑定 | ✗ |
| MLAG | ✗ |
| Horizon | ✗ |

¹ 该功能在 VLAN 交换配置中无法正常工作。

### Atheros8227, Atheros7240 {#atheros8227-atheros7240}

例如：hAP lite、hEX lite、PowerBox、wsAP ac lite、RBmAP2nD。参见[交换机芯片功能](./switch-chip-features.md)。

| 功能 | 硬件卸载 |
| :-- | :--: |
| STP/RSTP | ✓ |
| MSTP | ✗ |
| VLAN 过滤 | ✗ |
| IGMP 侦听 | ✗ |
| DHCP 侦听 | ✗ |
| ARP Inspection | ✗ |
| IP Source Guard | ✗ |
| DHCPv6 侦听 | ✗ |
| RA 防护 | ✗ |
| 绑定 | ✗ |
| MLAG | ✗ |
| Horizon | ✗ |

### IPQ-PPE, QCA8386, PIPE 98PX1012 {#ipq-ppe-qca8386-pipe-98px1012}

例如：hAP ax 系列、cAP ax、Chateau ax 系列、hAP be³ Media、CCR2004-1G-12S+2XS。参见[交换机芯片功能](./switch-chip-features.md)。

| 功能 | 硬件卸载 |
| :-- | :--: |
| STP/RSTP | ✗ |
| MSTP | ✗ |
| VLAN 过滤 | ✗ |
| IGMP 侦听 | ✗ |
| DHCP 侦听 | ✗ |
| ARP Inspection | ✗ |
| IP Source Guard | ✗ |
| DHCPv6 侦听 | ✗ |
| RA 防护 | ✗ |
| 绑定 | ✗ |
| MLAG | ✗ |
| Horizon | ✗ |

:::danger
在 **IPQ-PPE** 上使用 `protocol-mode=none` 会启用硬件卸载桥接，并可能导致问题。  
建议通过保留默认的 `protocol-mode=rstp` 设置或在 `/interface/bridge/port` 下手动设置 `hw=no` 来使用非硬件卸载的桥接。
:::

### 示例 {#example-2}

以下示例演示如何使用启用了硬件卸载的网桥配置端口交换。此配置会创建一个网桥接口，并将多个以太网接口添加为网桥端口。`hw=yes` 网桥端口设置默认使用。

```ros
/interface bridge
add name=bridge1
/interface bridge port
add bridge=bridge1 interface=ether2
add bridge=bridge1 interface=ether3
add bridge=bridge1 interface=ether4
add bridge=bridge1 interface=ether5
```

通过检查桥接端口表中的 **H** 标志，验证硬件卸载是否已启用：

```ros
[admin@MikroTik] /interface/bridge/port/print 
Flags: H - HW-OFFLOAD
Columns: INTERFACE, BRIDGE, HW, HORIZON, TRUSTED, TRUSTED-RA, TRUSTED-DHCPV6, FAST-LEAVE, BPDU-GUARD, EDGE, POINT-TO-POINT, PVID, FRAME-TYPES
#   INTERFACE  BRIDGE   HW   HORIZON  TRUSTED  TRUSTED-RA  TRUSTED-DHCPV6  FAST-LEAVE  BPDU-GUARD  EDGE  POINT-TO-POINT  PVID  FRAME-TYPES
0 H ether2     bridge1  yes  none     no       no          no              no          no          auto  auto               1  admit-all  
1 H ether3     bridge1  yes  none     no       no          no              no          no          auto  auto               1  admit-all  
2 H ether4     bridge1  yes  none     no       no          no              no          no          auto  auto               1  admit-all  
3 H ether5     bridge1  yes  none     no       no          no              no          no          auto  auto               1  admit-all  
```

## 桥接 VLAN 过滤 {#bridge-vlan-filtering}

---

桥接 VLAN 过滤可启用 VLAN 感知的二层转发，并允许在桥接内修改 VLAN 标签。此功能使桥接更类似于传统以太网交换机，并有助于解决桥接 VLAN 接口时可能出现的生成树兼容性问题。强烈建议配置桥接 VLAN 过滤，以符合 STP（IEEE 802.1D）和 RSTP（IEEE 802.1W）标准；而在 RouterOS 中启用 MSTP（IEEE 802.1s）支持时，则必须进行此配置。

主要 VLAN 设置是 `vlan-filtering`，它全局控制桥接的 VLAN 感知和 VLAN 标签处理。当 `vlan-filtering` 设置为 `no` 时，桥接会忽略 VLAN 标签，以 shared-VLAN-learning (SVL) 模式运行，并且无法修改数据包的 VLAN 标签。启用 `vlan-filtering` 会激活所有与桥接 VLAN 相关的功能，并切换到 independent-VLAN-learning (IVL) 模式。除了将端口加入二层转发之外，桥接本身也作为一个接口运行，因此具有端口 VLAN ID（pvid）。

:::warning
目前，配备 Marvell Prestera 交换机以及 RTL8367、88E6393X、88E6191X、88E6190、MT7621、MT7531 和 EN7523 交换机芯片（自 RouterOS v7 起）的 MikroTik 设备可以同时使用桥接 VLAN 过滤和硬件卸载。在启用桥接 VLAN 过滤时，其他设备无法利用内置交换机芯片的优势。这些设备应按照基本 VLAN 交换指南中描述的方法进行配置。使用不正确的配置方法可能会导致网络中的吞吐量问题。
:::

### 桥接 VLAN 表 {#bridge-vlan-table}

桥接 VLAN 表定义每个 VLAN 的端口成员关系，并指定出站流量的 VLAN 标签操作。配置为 `tagged` 的端口会发送带有其对应 VLAN ID 的帧，而配置为 `untagged` 的端口会在发送帧之前移除 VLAN 标签。`frame-types` 设置为 `admit-all` 或 `admit-only-untagged-and-priority-tagged` 的桥接端口会自动添加为其配置的 PVID 对应的 untagged 端口。

**子菜单：** `/interface/bridge/vlan`

| 属性 | 描述 |
| :-- | :-- |
| <strong>bridge</strong> (<em>name</em>; 默认值：<strong>none</strong>) | 此 VLAN 条目所应用的桥接接口。 |
| <strong>disabled</strong> (<em>yes</em> | <em>no</em>; 默认值：<strong>no</strong>) |
| <strong>tagged</strong> (<em>interface</em>; 默认值：<strong>none</strong>) | 以 VLAN 标签发送帧的接口或 接口列表。此设置接受逗号分隔的值，例如 <code>tagged=ether1,ether2</code>。 |
| <strong>untagged</strong> (<em>interface</em>; 默认值：<strong>none</strong>) | 发送不带 VLAN 标签的帧的接口或 接口列表。此设置接受逗号分隔的值，例如 <code>untagged=ether3,ether4</code>。 |
| <strong>vlan-ids</strong> (<em>integer 1..4094</em>; 默认值：<strong>1</strong>) | 此端口配置的 VLAN ID 或 VLAN ID 列表。此设置接受 VLAN ID 范围以及逗号分隔的值，例如 <code>vlan-ids=100-115,120,122,128-130</code>。 |

:::danger
`vlan-ids` 参数可以指定一组或一系列 VLAN，但仅应用于带标签端口配置。当为接入端口配置指定多个 VLAN 时，无论 PVID 值如何，带标签的数据包都可能通过错误的接入端口作为未标记数据包发送。
:::

:::warning
使用桥接 VLAN 过滤时，确保将所有必需的接口添加到桥接 VLAN 表中。

为了使路由功能在同一设备上通过使用桥接 VLAN 过滤的端口正常工作，必须允许访问桥接接口（当使用硬件卸载的 VLAN 过滤时，这包括 switch-cpu 端口）。可以通过将桥接接口本身作为带标签端口添加到 VLAN 表来手动完成此操作。自 RouterOS v7.16 起，在启用了 VLAN 过滤的桥接上添加 VLAN 接口时，会自动完成此操作（在 `/interface/bridge/vlan` 菜单下会出现一条注释为 "added by vlan on bridge" 的动态条目）。更多示例可以在 VLAN 间路由和管理访问部分找到。

自 RouterOS 7.20 起，当同一 VLAN ID 跨越多个交换机芯片或在硬件端口和软件端口上同时使用时，会添加一条名为 "added by switch-cpu" 的动态带标签条目。
:::

:::danger
允许访问 CPU 时，你允许从特定端口访问路由器/交换机本身。这并不总是可取的。当允许从特定 VLAN ID 和端口访问 CPU 时，确保实施适当的防火墙过滤规则来保护你的设备。使用防火墙过滤规则仅允许访问所需的服务。
:::

:::warning
配置不当的桥接 VLAN 过滤可能导致安全问题。在生产环境中部署设备之前，确保你完全理解 [桥接 VLAN 表](./user-guides/bridge-vlan-table.md) 的工作原理。
:::

### 桥接端口设置 {#bridge-port-settings}

每个桥接端口都有多个与 VLAN 相关的设置，用于控制未标记 VLAN 成员关系、VLAN 标记与取消标记行为，以及基于是否存在 VLAN 标签的数据包过滤。

**子菜单：** `/interface/bridge/port`

| 属性 | 描述 |
| :-- | :-- |
| <strong>frame-types</strong> (<em>admit-all</em> | <em>admit-only-untagged-and-priority-tagged</em> |
| <strong>ingress-filtering</strong> (<em>yes</em> | <em>no</em>; 默认值：<strong>yes</strong>) |
| <strong>pvid</strong> (<em>integer: 1..4094</em>; 默认值：<strong>1</strong>) | 端口 VLAN ID（pvid）指定未标记的入站流量分配到哪个 VLAN。仅当 <span className="ros-background-accent-green-bolder"><code>vlan-filtering</code></span> 设置为 <span className="ros-icon-success"><code>yes</code></span> 时，此属性才生效。 |
| <strong>tag-stacking</strong> (<em>yes</em> | <em>no</em>; 默认值：<strong>no</strong>) |

### 桥接主机表 {#bridge-host-table}

桥接主机表显示已在桥接接口上学习到的 MAC 地址。启用 vlan-filtering 后，该表还会显示与每个学习到的 MAC 地址关联的 VLAN ID，从而启用独立 VLAN 学习（IVL）模式。

```ros
[admin@MikroTik] > /interface/bridge/host/print where !local 
Flags: X - disabled, I - invalid, D - dynamic, L - local, E - external 
 #       MAC-ADDRESS        VID ON-INTERFACE       BRIDGE
0   D   CC:2D:E0:E4:B3:AA  300 ether3             bridge1
1   D   CC:2D:E0:E4:B3:AB  400 ether4             bridge1
```

### VLAN 示例：Trunk 和 Access 端口 {#vlan-example-trunk-and-access-ports}

本节演示如何配置一个基本的 VLAN 设置，其中包含一个 Trunk 端口和多个 Access 端口。Trunk 端口（ether2）在交换机之间或到路由器之间承载带标签的 VLAN 流量，而 Access 端口（ether6、ether7、ether8）连接终端设备并使用不带标签的 VLAN 流量。

![access_ports](/img/dcbdce357964f958.webp)

#### 步骤 1：创建网桥接口 {#step-1-create-the-bridge-interface}

创建一个禁用 `vlan-filtering` 的网桥接口。这一点很重要，因为立即启用 VLAN 过滤会限制流量，可能在配置完成前使你无法访问设备。有关在 VLAN 配置期间管理设备访问的详细信息，请参阅[管理访问配置](#management-access-configuration)部分。

```ros
/interface/bridge
add name=bridge1 vlan-filtering=no
```

#### 步骤 2：添加网桥端口并配置 PVID {#step-2-add-bridge-ports-and-configure-pvid}

将物理接口添加到网桥，并为 Access 端口配置端口 VLAN ID（pvid）。pvid 决定进入网桥时，不带标签的流量被分配到哪个 VLAN。`frame-types` 设置控制每个端口接受哪种类型的流量：仅带标签、仅不带标签或两者都接受。

```ros
/interface/bridge/port
add bridge=bridge1 interface=ether2 frame-types=admit-only-vlan-tagged
add bridge=bridge1 interface=ether6 pvid=200 frame-types=admit-only-untagged-and-priority-tagged
add bridge=bridge1 interface=ether7 pvid=300 frame-types=admit-only-untagged-and-priority-tagged
add bridge=bridge1 interface=ether8 pvid=400 frame-types=admit-only-untagged-and-priority-tagged
```

#### 步骤 3：创建网桥 VLAN 表条目 {#step-3-create-bridge-vlan-table-entries}

创建网桥 VLAN 表条目。Trunk 端口（ether2）必须配置为带标签成员，这意味着它将发送和接收带有 VLAN 标签的帧。Access 端口会根据其 pvid 设置自动添加为不带标签成员，因此你只需在每个 VLAN 条目中指定带标签端口。

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=ether2 vlan-ids=200
add bridge=bridge1 tagged=ether2 vlan-ids=300
add bridge=bridge1 tagged=ether2 vlan-ids=400
```

#### 步骤 4：启用 VLAN 过滤 {#step-4-enable-vlan-filtering}

配置完所有 VLAN 设置后，在网桥上启用 VLAN 过滤以激活 VLAN 功能。

```ros
/interface/bridge/set bridge1 vlan-filtering=yes
```

#### 步骤 5：（可选）拒绝未标记流量 {#step-5-optional-reject-untagged-traffic}

作为可选的安全措施，你可以通过更改 frame-type 来将网桥设置为拒绝未标记流量。这会阻止使用默认 VLAN 1（pvid=1），并确保只接受正确标记的流量。

```ros
/interface/bridge/set bridge1 frame-types=admit-only-vlan-tagged
```

### VLAN 示例 - Trunk 和 Hybrid 端口 {#vlan-example---trunk-and-hybrid-ports}

![hybrid_ports](/img/90b987271e134d95.webp)

创建一个禁用 `vlan-filtering` 的网桥，以避免在 VLAN 完全配置完成之前失去对路由器的访问。如果你需要对网桥进行管理访问，请参阅[管理访问配置](./index.md#management-access-configuration)部分。

```ros
/interface/bridge
add name=bridge1 vlan-filtering=no
```

添加网桥端口，并在 Hybrid VLAN 端口上指定 `pvid`，以将未标记流量分配到预期的 VLAN。使用 `frame-types` 设置仅在 ether2 上接受带标记的数据包。

```ros
/interface/bridge/port
add bridge=bridge1 interface=ether2 frame-types=admit-only-vlan-tagged
add bridge=bridge1 interface=ether6 pvid=200
add bridge=bridge1 interface=ether7 pvid=300
add bridge=bridge1 interface=ether8 pvid=400
```

添加 Bridge VLAN 条目，并在其中指定带标记端口。在此示例中，出方向 VLAN 标记也在 ether6、ether7、ether8 端口上执行，使它们成为 Hybrid 端口。`frame-types` 设置为 `admit-all` 的网桥端口将自动添加为 `pvid` VLAN 的未标记端口。

```ros
/interface/bridge/vlan 
add bridge=bridge1 tagged=ether2,ether7,ether8 vlan-ids=200
add bridge=bridge1 tagged=ether2,ether6,ether8 vlan-ids=300
add bridge=bridge1 tagged=ether2,ether6,ether7 vlan-ids=400
```

最后，当 VLAN 配置完成后，启用 Bridge VLAN Filtering。

```ros
/interface/bridge/set bridge1 vlan-filtering=yes 
```

可选步骤是在网桥接口上设置 `frame-types=admit-only-vlan-tagged`，以禁用默认的未标记 VLAN 1（`pvid=1`）。

```ros
/interface/bridge/set bridge1 frame-types=admit-only-vlan-tagged
```

:::danger
你不必手动将接入端口添加为未标记端口，因为它们将根据 `pvid` 中指定的 VLAN ID 动态添加为未标记端口，你只需将干道端口指定为带标签端口。所有具有相同 `pvid` 设置的端口将作为未标记端口添加到一个条目中。你必须考虑到桥接本身也是一个端口，并且它也有 `pvid` 值，这意味着桥接端口也将为具有相同 `pvid` 的端口添加为未标记端口。你可以通过在所有端口（甚至干道端口和桥接本身）上设置不同的 `pvid`，或使用 `frame-type` 设置为 `accept-only-vlan-tagged` 来规避此行为。
:::

### VLAN 示例 - 通过网桥进行 InterVLAN 路由 {#vlan-example---intervlan-routing-by-bridge}

![vlan_routing](/img/f659d62947a98802.webp)

创建一个禁用 `vlan-filtering` 的网桥，以避免在 VLAN 完全配置完成之前失去对路由器的访问。如果你需要对网桥进行管理访问，请参阅[管理访问配置](./index.md#management-access-configuration)部分。

```ros
/interface/bridge
add name=bridge1 vlan-filtering=no
```

添加网桥端口，并为 VLAN 接入端口指定 `pvid`，将其未标记流量分配到预期 VLAN。使用 `frame-types` 设置仅接受未标记数据包。

```ros
/interface/bridge/port
add bridge=bridge1 interface=ether6 pvid=200 frame-types=admit-only-untagged-and-priority-tagged
add bridge=bridge1 interface=ether7 pvid=300 frame-types=admit-only-untagged-and-priority-tagged
add bridge=bridge1 interface=ether8 pvid=400 frame-types=admit-only-untagged-and-priority-tagged
```

添加 Bridge VLAN 条目，并在其中指定带标签端口。在此示例中，**bridge1** 接口是 VLAN 中继，将进一步转发流量以执行 InterVLAN 路由。`frame-types` 设置为 `admit-only-untagged-and-priority-tagged` 的网桥端口将自动添加为 `pvid` VLAN 的未标记端口。

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=bridge1 vlan-ids=200
add bridge=bridge1 tagged=bridge1 vlan-ids=300
add bridge=bridge1 tagged=bridge1 vlan-ids=400
```

在 **bridge1** 上配置 VLAN 接口，以允许在路由层面处理带标签的 VLAN 流量，并设置 IP 地址以确保按计划在 VLAN 之间进行路由。

```ros
/interface/vlan
add interface=bridge1 name=VLAN200 vlan-id=200
add interface=bridge1 name=VLAN300 vlan-id=300
add interface=bridge1 name=VLAN400 vlan-id=400

/ip/address
add address=20.0.0.1/24 interface=VLAN200
add address=30.0.0.1/24 interface=VLAN300
add address=40.0.0.1/24 interface=VLAN400
```

最后，当 VLAN 配置完成后，启用 Bridge VLAN Filtering：

```ros
/interface/bridge/set bridge1 vlan-filtering=yes 
```

可选步骤是在桥接接口上设置 `frame-types=admit-only-vlan-tagged`，以禁用默认的未标记 VLAN 1（`pvid=1`）。

```ros
/interface/bridge/set bridge1 frame-types=admit-only-vlan-tagged
```

自 RouterOS v7 起，可以在某些设备上使用 L3 硬件卸载来路由流量。更多详情请参阅 [L3 硬件卸载](./l3-hardware-offloading.md)。

### 管理访问配置 {#management-access-configuration}

在启用了桥接 VLAN 过滤的设备上，有多种方式可以设置管理访问。以下是一些最常用的正确启用路由器/交换机访问的方法。首先创建一个未启用 VLAN 过滤的桥接：

```ros
/interface/bridge
add name=bridge1 vlan-filtering=no
```

#### 未启用 VLAN 过滤的未标记访问 {#untagged-access-without-vlan-filtering}

在桥接上未启用 VLAN 过滤，且需要通过未标记流量进行管理访问的情况下，配置很简单。唯一必要的步骤是直接将 IP 地址分配给桥接接口本身。由于桥接在第 2 层运行且不带 VLAN 标记，进入桥接端口的任何未标记流量都将能够与分配给桥接接口的 IP 地址通信，而无需额外配置。

```ros
/ip/address
add address=192.168.99.1/24 interface=bridge1
```

当 VLAN 过滤不属于网络设计的一部分时，此方法提供了访问路由器或交换机以进行管理的最简单方式。

#### 未启用 VLAN 过滤的标记访问 {#tagged-access-without-vlan-filtering}

此方法用于需要通过带标签的 VLAN 流量管理路由器/交换机，但不启用桥接 VLAN 过滤的场景。在这种情况下，会在桥接之上创建一个单独的 VLAN 接口来处理带标签的管理流量。当您需要通过特定 VLAN ID 访问设备，同时保持桥接配置简单直接时，这种方法很有用。

要配置带标签的管理访问，首先在桥接上创建一个具有所需 VLAN ID 的 VLAN 接口，然后为该 VLAN 接口分配 IP 地址。这允许路由器通过带标签的 VLAN 可达，同时让桥接保持默认状态（未启用 VLAN 过滤）。VLAN 接口充当逻辑子接口，并从父桥接接口继承 MAC 地址。

```ros
/interface/vlan
add interface=bridge1 name=MGMT vlan-id=99
/ip/address
add address=192.168.99.1/24 interface=MGMT
```

此配置在桥接上创建一个管理 VLAN（VLAN 99），使设备可通过任何承载 VLAN 99 带标签流量的端口在 IP 地址 192.168.99.1 访问。

#### 带 VLAN 过滤的带标签访问 {#tagged-access-with-vlan-filtering}

在桥接上启用了 VLAN 过滤且需要通过带标签流量进行管理访问的场景中，需要额外的配置步骤。此方法允许您通过指定端口上的带标签流量，使用特定 VLAN ID（本例中为 VLAN 99）访问路由器/交换机管理接口。

首先，在桥接之上创建一个 VLAN 接口并为其分配 IP 地址。此 VLAN 接口将处理带标签的管理流量：

```ros
/interface/vlan
add interface=bridge1 name=MGMT vlan-id=99
/ip/address
add address=192.168.99.1/24 interface=MGMT
```

接下来，必须向桥接 VLAN 表添加相应条目，以允许在将发起管理访问的端口上传输带标签流量。例如，如果您需要通过 VLAN 99 带标签流量从端口 **ether3**、**ether4** 和 **sfp-sfpplus1** 访问设备，请将 **bridge1** 接口本身包含在标记端口列表中（桥接接口必须被标记，以允许 VLAN 接口与交换机 CPU 通信）：

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=bridge1,ether3,ether4,sfp-sfpplus1 vlan-ids=99
```

在 VLAN 表正确配置后，您可以在桥接上启用 VLAN 过滤：

```ros
/interface/bridge/set bridge1 vlan-filtering=yes
```

此配置允许通过带标签的 VLAN 99 流量进行管理访问，同时保留 VLAN 过滤的安全优势。网桥接口本身作为带标签成员包含在内，以确保 VLAN 接口与交换机 CPU 之间为路由和管理目的进行正确通信。

### 使用 VLAN 过滤的未标记访问 {#untagged-access-with-vlan-filtering}

启用网桥 VLAN 过滤后，当您需要使用未标记流量访问设备时，必须确保管理 VLAN 接口使用与未标记端口 VLAN ID 相同的 VLAN ID（通过 `pvid` 参数配置）。这可确保来自接入端口的未标记流量能够与路由器的管理接口正确通信。

首先，在网桥上创建 VLAN 接口并为其分配 IP 地址，就像上一个示例中那样。此 VLAN 接口将处理管理流量：

```ros
/interface/vlan
add interface=bridge1 name=MGMT vlan-id=99
/ip/address
add address=192.168.99.1/24 interface=MGMT
```

例如，如果您希望未标记端口 **ether2** 和 **ether3** 能够与 VLAN 99 管理接口通信，则这些端口必须配置为与管理 VLAN ID 匹配的 `pvid` 值。此外，您需要将网桥接口本身作为带标签端口成员添加到 VLAN 表中，这允许路由器处理带标签的管理流量。如有需要，您还可以为特定网络拓扑添加其他带标签端口（有关带标签端口配置的更多详细信息，请参见前面的示例）：

```ros
/interface/bridge/port
set [find interface=ether2] pvid=99
set [find interface=ether3] pvid=99
/interface/bridge/vlan 
add bridge=bridge1 tagged=bridge1 untagged=ether2,ether3 vlan-ids=99
```

完成 VLAN 表配置后，您可以在网桥上启用 VLAN 过滤。这将激活所有与 VLAN 相关的功能，并开始根据您的 VLAN 设置过滤流量：

```ros
/interface/bridge/set bridge1 vlan-filtering=yes 
```

#### 更改网桥接口的未标记 VLAN {#changing-untagged-vlan-for-the-bridge-interface}

在使用 VLAN 过滤的情况下，可以使用 `pvid` 设置更改网桥接口的未标记 VLAN ID。请注意，创建可路由 VLAN 接口并允许网桥上的带标签流量是更灵活且通常推荐的做法。

首先，在网桥接口上创建一个 IP 地址。

```ros
/ip/address
add address=192.168.99.1/24 interface=bridge1
```

例如，未标记的 **bridge1** 流量应能与 VLAN 99 中未标记的 **ether2** 和 **ether3** 端口以及已标记的 **sfp-sfpplus1** 端口通信。为实现这一点，**bridge1**、**ether2**、**ether3** 应配置相同的 `pvid`，并且应将 sfp-sfpplus1 添加为标记成员。

```ros
/interface/bridge
set [find name=bridge1] pvid=99
/interface/bridge/port
set [find interface=ether2] pvid=99
set [find interface=ether3] pvid=99
/interface/bridge/vlan
add bridge=bridge1 tagged=sfp-sfpplus1 untagged=bridge1,ether2,ether3 vlan-ids=99
```

之后，您可以启用 VLAN 过滤：

```ros
/interface/bridge/set bridge1 vlan-filtering=yes 
```

:::warning
如果不需要通过 IP 地址连接到路由器/交换机，则可以跳过添加 IP 地址的步骤，因为通过二层协议（例如 MAC-telnet）连接到路由器/交换机无论如何都可以工作。
:::

### VLAN 隧道 (QinQ) {#vlan-tunneling-qinq}

从 RouterOS v6.43 起，RouterOS 网桥符合 IEEE 802.1ad，并且可以基于服务 VLAN ID (0x88a8) 而不是客户 VLAN ID (0x8100) 来过滤 VLAN ID。可以应用与 IEEE 802.1Q VLAN 过滤相同的原则（可以使用相同的设置示例）。下面是一个常见 **提供商网桥** 的拓扑：

![Provider_bridge](/img/0285416b3135c6c9.webp)

在此示例中，**R1**、**R2**、**R3,** 和 **R4** 可能通过 802.1Q (CVID) 发送任何 VLAN 标记流量，但 **SW1** 和 **SW2** 需要以某种方式隔离路由器之间的流量，使 **R1** 只能与 **R3** 通信，而 **R2** 只能与 **R4** 通信。为此，您可以用 SVID 标记所有入口流量，并仅在某些端口上允许这些 VLAN。首先在网桥上启用由 `802.1ad` 引入的服务标签 0x88a8。在 **SW1** 和 **SW2** 上使用以下命令：

```ros
/interface/bridge
add name=bridge1 vlan-filtering=no ether-type=0x88a8
```

在此设置中，**ether1** 和 **ether2** 将成为接入端口（未标记），使用 `pvid` 参数为每个端口上的所有入口流量打标签，在 **SW1** 和 **SW2** 上使用以下命令：

```ros
/interface/bridge/port
add interface=ether1 bridge=bridge1 pvid=200
add interface=ether2 bridge=bridge1 pvid=300
add interface=ether3 bridge=bridge1
```

在网桥 VLAN 表中指定标记和未标记端口。在 **SW1** 和 **SW2** 上使用以下命令：

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=ether3 untagged=ether1 vlan-ids=200
add bridge=bridge1 tagged=ether3 untagged=ether2 vlan-ids=300
```

配置好网桥 VLAN 表后，即可启用网桥 VLAN 过滤。请在 **SW1** 和 **SW2** 上使用以下命令：

```ros
/interface/bridge/set bridge1 vlan-filtering=yes 
```

:::danger
通过启用 vlan-filtering，你将过滤掉发往 CPU 的流量。在启用 VLAN 过滤之前，应确保设置了管理端口。

请注意，如果你使用新的 EtherType/TPID 0x88a8（服务标签）并且还需要为服务 VLAN 使用 VLAN 接口，则还必须在 VLAN 接口上应用 `use-service-tag` 参数。
:::

:::danger
当配置 `ether-type=0x8100` 时，桥接检查外部 VLAN 标签以确定它是否使用 EtherType `0x8100`。如果桥接收到外部标签具有不同 EtherType 的数据包，它会将该数据包标记为 `untagged`。由于 RouterOS 仅检查数据包的外部标签，因此在使用 802.1ad 协议时无法过滤 802.1Q 数据包。
:::

:::warning
目前，只有配备 Marvell Prestera 交换机的 MikroTik 设备能够使用服务标签 EtherType/TPID `0x88a8` 进行硬件卸载的 VLAN 过滤。
:::

:::danger
配备 Marvell-98DX3257 交换机芯片的设备（例如 CRS354 系列）不支持在 1Gbps 以太网接口上对其他 VLAN 类型（`0x88a8` 和 `0x9100`）进行 VLAN 过滤。
:::

### 标签堆叠 {#tag-stacking}

自 RouterOS v6.43 起，可以在任何现有 VLAN 标签之上强制添加新的 VLAN 标签。此功能可用于实现 CVID 堆叠方案，即在现有 CVID 标签之前添加一个 CVID（0x8100）标签。此类方案与 Provider bridge 方案非常相似。要实现相同的方案但使用多个 CVID 标签（CVID 堆叠），我们可以使用相同的拓扑：

![Tag_stacking](/img/ed256f307c0776d1.webp)

在此示例中，**R1**、**R2**、**R3** 和 **R4** 可能发送任何 VLAN 标记的流量，可以是 802.1ad、802.1Q 或任何其他类型的流量，但 **SW1** 和 **SW2** 需要以某种方式隔离路由器之间的流量，使 **R1** 只能与 **R3** 通信，而 **R2** 只能与 **R4** 通信。为此，您可以为所有入站流量打上新的 CVID 标签，并仅在特定端口上允许这些 VLAN。首先选择合适的 EtherType，请在 **SW1** 和 **SW2** 上使用以下命令：

```ros
/interface/bridge
add name=bridge1 vlan-filtering=no ether-type=0x8100
```

在此方案中，**ether1** 和 **ether2** 将忽略所有已存在的 VLAN 标签，并添加一个新的 VLAN 标签。使用 `pvid` 参数为每个端口上的所有入站流量打标签，并在这些端口上允许 `tag-stacking`。请在 **SW1** 和 **SW2** 上使用以下命令：

```ros
/interface/bridge/port
add interface=ether1 bridge=bridge1 pvid=200 tag-stacking=yes
add interface=ether2 bridge=bridge1 pvid=300 tag-stacking=yes
add interface=ether3 bridge=bridge1
```

在网桥 VLAN 表中指定带标签和不带标签的端口。您只需指定外层标签的 VLAN ID。请在 **SW1** 和 **SW2** 上使用以下命令：

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=ether3 untagged=ether1 vlan-ids=200
add bridge=bridge1 tagged=ether3 untagged=ether2 vlan-ids=300
```

配置好网桥 VLAN 表后，即可启用网桥 VLAN 过滤，这是使 pvid 参数生效所必需的。请在 **SW1** 和 **SW2** 上使用以下命令：

```ros
/interface/bridge/set bridge1 vlan-filtering=yes
```

:::danger
通过启用 vlan-filtering，你将过滤掉发往 CPU 的流量；在启用 VLAN 过滤之前，应确保设置了管理端口。
:::

### MVRP {#mvrp}

多 VLAN 注册协议（MVRP）是一种基于多注册协议（MRP）的协议，它允许向桥接局域网的其他成员注册属性（在 MVRP 的情况下为 VLAN ID）。

MRP 应用可以做出或撤回属性声明，从而导致这些属性在其他 MRP 参与者处被注册或离开。

其工作原理如下。

MRP 由两部分组成：

- **Applicant** - 负责发送声明（或离开）。其行为可以基于每个端口通过名为 `mvrp-applicant-state` 的设置进行配置，并基于每个 VLAN 通过 `mvrp-forbidden` 设置进行配置。
- **Registrar** - 负责注册传入的声明。其配置可以基于每个端口通过 `mvrp-registrar-state` 设置进行设置，并基于每个 VLAN 通过 `mvrp-forbidden` 设置进行设置。

**注册传播：** 桥接端口上传入的注册会动态地将该特定端口变为带标签的 VLAN 成员。此外，与此注册相关联的属性会作为声明传播到所有活动（转发）桥接端口。

**声明操作：** 在 MVRP 的情况下，已配置的 VLAN 会在每个端口上被声明，但只有当从 LAN 收到声明时，它们才会被配置为这些 VLAN 的成员（Registrar 将注册该 VLAN）。从终端站的角度来看，单个声明将在整个 LAN 中的每个上游端口上被注册。当另一个终端站声明相同的属性时，这两个（或更多）终端站之间将建立一条注册路径，见下图。

MVRP 有助于在整个桥接网络中动态传播 VLAN 信息，并且仅在需要的端口上配置 VLAN。这通过避免不必要的流量泛洪使网络更加高效。

如前所述，MVRP 仅在处于转发状态的端口上活动。对于 MSTP，只有在端口于 VLAN 所映射到的 MSTI 中处于转发状态时，才会进行声明和注册。

点对点端口会加快注册（或离开）过程。对于非以太网接口，手动配置 `point-to-point=yes` 可能是有益的。

![MVRP](/img/33d81c5bbb103a21.webp)

#### 属性参考 {#property-reference}

**子菜单：** `/interface/bridge`

| 属性 | 描述 |
| :-- | :-- |
| **mvrp** (*yes* \| *no*; 默认：**no**) | 为网桥启用 MVRP。它确保 MAC 地址 01:80:C2:00:00:21 被捕获而不被转发。必须启用 `vlan-filtering`。 |

**子菜单：** `/interface/bridge/port`

端口菜单允许按端口控制 applicant 和 registrar 设置。

| 属性 | 描述 |
| :-- | :-- |
| **mvrp-applicant-state** (*non-participant \| normal-participant;* 默认：**normal-participant**) | MVRP applicant 选项： <br/><ul><li><strong>non-participant</strong> - 端口不发送任何 MRP 消息；</li><li><strong>normal-participant </strong>- 端口正常参与 MRP 交换。</li></ul> |
| **mvrp-registrar-state** (*fixed \| normal*; 默认：**normal**) | MVRP registrar 选项： <br/><ul><li><strong>fixed</strong> - 端口忽略所有 MRP 消息，并在所有已配置的 VLAN 中保持 Registered (IN)。</li><li><strong>normal </strong>- 端口接收 MRP 消息，并根据标准处理它们。</li></ul> |

要监控当前已声明和注册的 VLAN ID，请使用 `monitor` 命令。

```ros
[admin@MikroTik] > /interface/bridge/port/monitor [find interface=sfp-sfpplus1]
            interface: sfp-sfpplus1
               status: in-bridge
          port-number: 1
                 role: designated-port
            edge-port: no
  edge-port-discovery: yes
  point-to-point-port: yes
         external-fdb: no
         sending-rstp: yes
             learning: yes
           forwarding: yes
     actual-path-cost: 2000
     hw-offload-group: switch1
    declared-vlan-ids: 1,10,20-21
  registered-vlan-ids: 1,10,20,30-33
```

**子菜单：** `/interface/bridge/vlan`

所有属于静态 VLAN 成员或由端口 `pvid` 设置创建的动态未标记 VLAN 成员的端口都被视为“固定”。这意味着注册器会忽略所有 MRP 消息，并为这些 VLAN 保持已注册（IN）状态。

当某个 VLAN 既未手动配置，也不是由端口 `pvid` 设置创建时，桥接端口上的传入注册可以动态地将该特定端口指定为带标记的 VLAN 成员。`mvrp-forbidden` 功能允许创建一组端口，这些端口被限制注册特定的 VLAN ID。

静态或动态 VLAN 将由申请者声明，除非此功能被端口的 `mvrp-applicant-state` 或 VLAN 的 `mvrp-forbidden` 设置禁用。

| 属性 | 描述 |
| :-- | :-- |
| **mvrp-forbidden** (*interfaces*; 默认: ) | 忽略所有 MRP 消息并保持未注册（MT）状态，同时禁止申请者声明特定 VLAN ID 的端口。 |

**子菜单：** `/interface/bridge/vlan/mvrp`

MVRP 属性菜单可用于查看内部 MVRP 属性状态，如 IEEE 802.1Q-2011 所规定。

| 属性 | 描述 |
| :-- | :-- |
| **applicant-state** | 声明属性的 Applicant 状态机。其状态可以是 VO、VP、VN、AN、AA、QA、LA、AO、QO、AP、QP 或 LO。每个状态由两个字母组成。 <br/> 第一个字母表示状态： <br/><ul><li>V—非常急切；</li><li>A—急切；</li><li>Q—安静；</li><li>L—离开。</li></ul> 第二个字母表示成员状态： <br/><ul><li>A - 活动成员；</li><li>P - 被动成员；</li><li>O - 观察者；</li><li>N - 新。</li></ul> 例如，VP 表示“非常急切，被动成员”。 |
| **registrar-state** | 记录其他参与者所声明属性注册状态的 Registrar 状态机。其状态可以是 IN、LV 或 MT： <br/><ul><li>IN—已注册；</li><li>LV—先前已注册，但当前正在超时；</li><li>MT—未注册。</li></ul> |

```ros
[admin@Mikrotik] /interface/bridge/vlan/mvrp/print where vlan-id=10
Columns: BRIDGE, PORT, VLAN-ID, REGISTRAR-STATE, APPLICANT-STATE, LAST-EVENT
 #  BRIDGE    PORT           VLAN-ID  REGISTRAR-STATE  APPLICANT-STATE  LAST-EVENT
 1  bridge67  sfp-sfpplus1        10  IN               Quiet Active     JoinIn    
 9  bridge67  sfp-sfpplus5        10  MT               Quiet Active     JoinEmpty 
17  bridge67  sfp-sfpplus9        10  MT               Quiet Active     JoinEmpty 
25  bridge67  sfp-sfpplus13       10  IN               Quiet Active     JoinIn 
```

## 快速转发 {#fast-forward}

---

Fast Forward 允许在特殊条件下更快地转发数据包。启用 Fast Forward 后，网桥可以更快地处理数据包，因为它可以跳过多个与网桥相关的检查，包括 MAC 学习。下面列出了为使 Fast Forward 处于活动状态而**必须**满足的条件：

- 网桥的 `fast-forward` 设置为 `yes`。
- 网桥只有 2 个运行中的端口。
- 两个网桥端口都支持 [Fast Path](../firewall-and-quality-of-service/packet-flow-in-routeros.md#fast-path)，Fast Path 在端口上以及网桥上全局处于活动状态。
- 网桥硬件卸载已禁用。
- 网桥 VLAN 过滤已禁用。
- 网桥 DHCP snooping 已禁用。
- `unknown-multicast-flood` 设置为 `yes`。
- `unknown-unicast-flood` 设置为 `yes`。
- `broadcast-flood` 设置为 `yes`。
- 网桥的 MAC 地址与其中一个网桥从端口的 MAC 地址匹配。
- 两个端口的 `horizon` 都设置为 `none`。

:::warning
快速转发会禁用 MAC 学习；这是为了更快地转发数据包而设计的。MAC 学习可防止流量泛洪到多个接口，但当数据包只能通过一个接口发送时，不需要 MAC 学习。
:::

:::danger
启用硬件卸载时，快速转发被禁用。硬件卸载在活动时可以实现全线速性能，因为它将使用内置交换机芯片（如果你的设备存在这样的芯片）。快速转发使用 CPU 转发数据包。比较吞吐量结果时，你会得到这样的结果：硬件卸载 > 快速转发 > Fast Path > 慢速路径。
:::

可以检查 Fast Forward 处理了多少个数据包：

```ros
[admin@MikroTik] /interface/bridge/settings> pr
              use-ip-firewall: no
     use-ip-firewall-for-vlan: no
    use-ip-firewall-for-pppoe: no
              allow-fast-path: yes
      bridge-fast-path-active: yes
     bridge-fast-path-packets: 0
       bridge-fast-path-bytes: 0
  bridge-fast-forward-packets: 16423
    bridge-fast-forward-bytes: 24864422
```

:::warning
如果数据包由 Fast Path 处理，则快速转发未活动。数据包计数可用作快速转发是否活动的指标。
:::

自 RouterOS 6.44 起，可以监控 Fast Forward 状态，例如：

```ros
[admin@MikroTik] /interface/bridge/monitor bridge1 
                  state: enabled
    current-mac-address: B8:69:F4:C9:EE:D7
            root-bridge: yes
         root-bridge-id: 0x8000.B8:69:F4:C9:EE:D7
         root-path-cost: 0
              root-port: none
             port-count: 2
  designated-port-count: 2
           fast-forward: yes
```

:::danger
禁用或启用快速转发将临时禁用所有桥接端口以使设置生效。在生产环境中更改此属性时必须考虑到这一点，因为它可能导致所有数据包被临时丢弃。
:::

## IGMP/MLD 监听 {#igmpmld-snooping}

---

网桥支持 IGMP/MLD snooping。它控制组播流并防止在不需要的端口上进行组播泛洪。其设置位于网桥菜单中，并且在每个网桥接口上独立工作。软件驱动的实现可在所有运行 RouterOS 的设备上工作，但配备 Marvell Prestera 交换芯片以及 88E6393X、88E6191X、88E6190 交换芯片的 MikroTik 设备还支持带硬件卸载的 IGMP/MLD snooping。更多详细信息请参阅 [IGMP/MLD snooping 手册](./user-guides/bridge-igmp-mld-snooping.md)。

## DHCP Snooping 与 DHCP Option 82 {#dhcp-snooping-and-dhcp-option-82}

---

网桥支持 DHCP Snooping 和 DHCP Option 82。DHCP Snooping 是一种二层安全功能，用于阻止未经授权的 DHCP 服务器向用户提供恶意信息。在 RouterOS 中，你可以指定哪些网桥端口是受信任的（已知 DHCP 服务器所在的位置，DHCP 消息应被转发），哪些是不受信任的（通常用于接入端口，收到的 DHCP 服务器消息将被丢弃）。DHCP Option 82 是由启用了 DHCP Snooping 的设备提供的附加信息（Agent Circuit ID 和 Agent Remote ID），用于标识设备本身和 DHCP 客户端。

![Dhcp_snooping](/img/1e3b5abc626baf0c.webp)

在本示例中，SW1 和 SW2 是启用了 DHCP Snooping 和 Option 82 的设备。首先，我们需要创建一个网桥、分配接口并标记受信任的端口。在 **SW1** 上使用以下命令：

```ros
/interface/bridge
add name=bridge
/interface/bridge/port
add bridge=bridge interface=ether1
add bridge=bridge interface=ether2 trusted=yes
```

对于 SW2，配置将类似，但我们还需要将 ether1 标记为受信任，因为该接口将接收已添加 Option 82 的 DHCP 消息。如果所有端口都将接收添加了 Option 82 的 DHCP 消息，则需要将它们全部标记为受信任，否则这些消息将被丢弃。此外，我们将 ether3 添加到同一个网桥，并将该端口保持为不受信任，设想存在一个未经授权的（恶意）DHCP 服务器。在 **SW2** 上使用以下命令：

```ros
/interface/bridge
add name=bridge
/interface/bridge/port
add bridge=bridge interface=ether1 trusted=yes
add bridge=bridge interface=ether2 trusted=yes
add bridge=bridge interface=ether3
```

然后我们需要启用 DHCP Snooping 并配置 Option 82。从 RouterOS 7.23 版本开始，可以使用预定义变量（如 BRIDGEMAC、HOSTNAME、INTERFACE、VID）配置自定义的 Remote ID 和 Circuit ID 值。更多详细信息请参阅 `dhcp-agent-circuit-id`、`dhcp-agent-remote-id` 属性。如果你的 DHCP 服务器不支持 DHCP Option 82，或者你不实施任何与 Option 82 相关的策略，则此步骤不是必需的。在此配置示例中，我们在 **SW1** 和 **SW2** 上使用以下命令：

```ros
/interface/bridge
set [find where name="bridge"] dhcp-snooping=yes dhcp-agent-circuit-id="interface: \$(INTERFACE), vlan: \$(VID)" dhcp-agent-remote-id="ip: 192.168.88.1, identity: \$(HOSTNAME), mac: \$(BRIDGEMAC)"
```

现在两台设备都将分析在网桥端口上收到的 DHCP 消息。**SW1** 负责添加和删除 DHCP Option 82。**SW2** 将限制恶意 DHCP 服务器接收任何发现消息，并丢弃来自 ether3 的恶意 DHCP 服务器消息。

:::warning
目前，配备 Marvell Prestera 交换机以及 88E6393X、88E6191X、88E6190 交换机芯片的 MikroTik 设备完全支持硬件卸载的 DHCP 监听和 Option 82。对于 CRS1xx 和 CRS2xx 系列交换机，可以将 DHCP 监听与 VLAN 交换一起使用，但你需要确保使用出口 ACL 规则以正确的 VLAN 标签发送 DHCP 数据包。其他设备能够使用 DHCP 监听和 Option 82 功能以及硬件卸载，但你必须确保设备上没有应用与 VLAN 相关的配置，否则 DHCP 监听和 Option 82 可能无法正常工作。请参阅桥接硬件卸载部分及支持的功能。
:::

:::info
从 RouterOS v7.17 开始，在 bonding 接口上支持带硬件卸载的 DHCP 监听。
:::

### DHCP Snooping 绑定表 {#dhcp-snooping-binding-table}

DHCP snooping 绑定数据库是由网桥生成的运行时表，用于存储连接到受信任端口的 DHCP 服务器所提供的 DHCP 租约。每个条目记录客户端的 MAC 地址、分配的 IP 地址、租约到期时间、VLAN ID 以及发现客户端所在的物理接口。网桥可以利用该数据库来增强安全性。即，当帧到达不受信任的端口时，交换机会在转发数据包之前验证源 MAC/IP 对是否与存储的绑定匹配，从而阻止来自恶意 DHCP 服务器或伪造主机的流量，防止地址盗用攻击，并启用诸如 IP-Source-Guard、ARP-Inspection 等功能。

当前 DHCPv4 snooping 绑定表的实现建立在现有的 `/interface/bridge/host` 表之上。相关的 DHCP 信息从经过网桥的 DHCP 消息中获取。

:::danger
每当网桥接口配置发生更改（包括启用 `arp-inspection` 或 `ip-source-guard` 功能）时，DHCP snooping 绑定表都会被清除。因此，在客户端获取或续订其 DHCP 租约之前，非信任端口上的 IPv4 和 ARP 流量会中断。要更快地重新填充绑定表，请禁用并重新启用非信任以太网接口，或重启交换机。
:::

DHCP 客户端的当前状态由 `dhcpv4-status` 指示。可能的状态值如下：`searching`、`requesting`、`bound`、`renewing`、`rebinding`、`expired` 和 `relay-agent`。最后一个值仅当从隐藏在中继代理后面的 DHCP 客户端收到 DHCP 请求消息时才会出现。

`dhcpv4-ip` 显示 DHCP 服务器授予的 IP 地址，而 `dhcpv4-server-id` 列指示服务器 ID。`dhcpv4-expires-after` 列显示 DHCP 服务器提供给客户端的当前租约期还剩多少时间。

当在网桥上启用 VLAN 过滤时，每个主机不仅通过其 MAC 地址标识，还通过 MAC - VLAN ID 对标识。

WinBox 中的活动 DHCP 绑定表条目：

![FDB with DHCP binding table in Winbox](/img/a51a51d564206202.png)

控制台中的活动 DHCP 绑定表条目：

![FDB with DHCP binding table in console](/img/509a91e9576f9771.png)

### ARP Inspection 与 IP Source Guard {#arp-inspection-and-ip-source-guard}

ARP Inspection 和 IP Source Guard 是二层安全功能，使用 DHCP snooping 绑定表来防止地址欺骗攻击。ARP Inspection 会根据绑定数据库验证 ARP 数据包，丢弃任何不匹配的数据包。IP Source Guard 会验证 IPv4 数据包的源 IP 地址，丢弃入站端口的绑定条目中不存在的那些数据包。在信任端口上，所有 ARP 数据包和 IP 流量都会在未经验证的情况下转发。

首先，在网桥上启用 DHCP snooping，并将连接到 DHCP 服务器的端口标记为信任：

```ros
/interface/bridge/set [find name="bridge1"] dhcp-snooping=yes
/interface/bridge/port/set [find interface=ether1] trusted=yes
```

启用 ARP inspection 并指定信任 ARP 端口：

```ros
/interface/bridge/set [find name="bridge1"] arp-inspection=yes
/interface/bridge/port/set [find interface=ether1] trusted-arp=yes
```

启用 IP Source Guard：

```ros
/interface/bridge/set [find name="bridge1"] ip-source-guard=yes
```

:::danger
每当网桥接口配置发生更改（包括启用 `arp-inspection` 或 `ip-source-guard` 功能）时，DHCP snooping 绑定表都会被清除。因此，在客户端获取或续订其 DHCP 租约之前，非信任端口上的 IPv4 和 ARP 流量会中断。要更快地重新填充绑定表，请禁用并重新启用非信任以太网接口，或重启交换机。
:::

打印网桥主机表以验证 DHCP 绑定是否正在被学习：

```ros
/interface/bridge/host/print where dhcpv4-status
```

检查 `/interface/ethernet/switch/rule` 以验证交换机 ACL 规则已应用（仅在 Marvell Prestera 交换芯片上支持）：

```ros
[admin@MikroTik] > /interface/ethernet/switch/rule/print 
Flags: D - DYNAMIC
0 D switch=switch1 mac-protocol=ip protocol=udp src-port=67-68 dst-port=67-68 copy-to-cpu=no redirect-to-cpu=yes mirror=no
 
1 D switch=switch1 ports=ether2,ether3,ether4 mac-protocol=arp copy-to-cpu=no redirect-to-cpu=yes mirror=no
 
2 D ;;; IPSG (Pass Untrusted)
    switch=switch1 ports=ether2 src-mac-address=D6:3F:38:20:8D:2B/FF:FF:FF:FF:FF:FF mac-protocol=ip src-address=192.168.88.8/255.255.255.255 copy-to-cpu=no redirect-to-cpu=no mirror=no
 
3 D ;;; IPSG (Pass Untrusted)
    switch=switch1 ports=ether3 src-mac-address=6C:3B:6B:EB:76:AA/FF:FF:FF:FF:FF:FF mac-protocol=ip src-address=192.168.88.9/255.255.255.255 copy-to-cpu=no redirect-to-cpu=no mirror=no
 
4 D ;;; IPSG (Drop Untrusted)
    switch=switch1 ports=ether2,ether3,ether4 mac-protocol=ip copy-to-cpu=no redirect-to-cpu=no mirror=no new-dst-ports=""
```

查找 `bridge,warning` 日志条目以检测被阻止的数据包：

```ros
/log/print where topics~"bridge" and topics~"warning"

2026-07-26 12:08:29 bridge,warning ether2: dropped IP packet on untrusted port - MAC/IP does not match binding table entry (IP=192.168.88.55, MAC=6c:3b:6b:eb:76:aa)

2026-07-26 13:55:02 bridge,warning ether2: dropped ARP packet on untrusted port - unknown MAC/IP combination (src IP=192.168.88.55, MAC=6c:3b:6b:eb:76:aa)
```

## DHCPv6 侦听 / DHCPv6 防护 {#dhcpv6-snooping--dhcpv6-shield}

DHCPv6 Snooping 是一种二层安全功能，可防止未经授权的 DHCPv6 服务器向用户提供恶意信息。在 RouterOS 中，您可以指定哪些网桥端口是受信任的（已知 DHCPv6 服务器所在且应转发 DHCPv6 消息的位置），以及哪些是不受信任的（通常用于接入端口，收到的 DHCPv6 服务器消息将被丢弃，从而有效实现 DHCPv6-Shield）。

DHCPv6 Option 18 (Interface-Id) 和 Option 37 (Remote-Id) 是由启用了 DHCPv6 Snooping 的设备提供的附加信息，可用于识别设备本身和 DHCPv6 客户端。

IPv6 为 DHCPv6 Relay agent 过程提供了更细粒度的方法以及灵活性。在功能上，它们与 IPv4 的 Option 82 用途完全相同：Option 18 充当 Circuit ID（标识客户端连接的特定端口/VLAN），Option 37 充当 Remote ID（标识中继代理或交换机硬件本身）。

- Option 18 - 标识接收客户端消息的特定接口（端口）。它确保服务器确切知道请求来自何处，以便应用正确的策略。
- Option 37 - 标识中继代理（交换机或路由器）本身。它包含唯一的 caller ID（例如 DUID——DHCP 唯一标识符）。它告知服务器网络中的哪个特定设备正在与它通信。

## RA 防护 {#ra-guard}

---

RA guard 功能旨在丢弃到达用户指定为不受信任的桥接端口的、包含路由器通告（RA）消息的 IPv6 数据包，从而防止潜在的恶意 RA 消息攻击或意外的网络配置错误。启用后，可以将每个桥接端口设置为受信任或不受信任（默认情况下，所有桥接端口都设置为 RA 不受信任）。

以下是 IPv6 RA Guard (Router Advertisement Guard) 背后的网络方案和核心原理。

![RAguard](/img/0db2c93dce1fec4d.webp)

|  |
| :-- |
| <br/><code>#Layer 2 Access Switch - enabling RA guard on the main bridge</code><br/><code>/interface/bridge</code><br/><code>add name=bridge</code><br/><code>/interface/bridge</code><br/><code>set [find where name="bridge"] ra-guard=yes</code><br/><code>/interface/bridge/port</code><br/><code>add bridge=bridge interface=etherUplink Trusted RA=yes</code><br/><code>add bridge=bridge interface=etherX</code><br/><code>add bridge=bridge interface=etherY</code><br/><code>add bridge=bridge interface=etherZ</code><br/> |

### 问题：为什么需要这个？ {#the-problem-why-is-this-needed}

在 IPv6 中，设备使用 ICMPv6 进行自动配置。

路由器通告（Type 134）：路由器广播这些消息来告知主机：“我是网关，这是你的网络前缀。”

威胁：如果用户意外将消费级路由器（例如家庭 Wi-Fi 路由器）连接到接入端口，或者恶意行为者在接入端口上启动工具（例如 `Rogue RA`），该设备就会开始广播 RA。

结果：网络中的其他主机会根据该非授权设备自动配置其 IPv6 地址，并将该非授权设备设置为默认网关。这会导致中间人攻击或完全拒绝服务。

以下是网络方案以及 IPv6 RA Guard（Router Advertisement Guard）背后的核心原理。

### 核心原则：“信任与非信任” {#the-core-principle-trust-vs-untrust}

IPv6 RA Guard 的基本原理在逻辑上与 IPv4 中的 DHCP Snooping 完全相同。它通过将交换机端口划分为两种角色，在第 2 层交换机基础设施内创建安全边界：

- 受信任端口：连接到合法、授权 IPv6 路由器的端口。允许这些端口发送 Router Advertisement（RA）数据包。
- 不受信任端口：连接到终端用户主机的端口。禁止这些端口发送 RA 数据包。

### 数据包解析过程 {#packet-parsing-process}

对于未配置为 RA Trusted 的端口，RA Guard 解析器会遍历扩展头链，直到遇到非扩展头。解析过程及后续操作由以下规则控制：

**传输层终止**：如果解析器遇到有效的传输层头——例如 TCP、UDP、ESP、RSVP 或封装的 IPv4/IPv6 头——则解析终止，并且数据包被转发（受标准网桥检查约束）。

- 丢弃条件 - 如果出现以下情况，则丢弃数据包：

1. 未能包含传输层头。
2. 链中的最后一个扩展头在其 "Next Header" 字段中未指定 NO\_NEXT\_HEADER (59)。
3. 如果发现 ICMP 消息类型为 134，则丢弃数据包。

- 分片处理：这些解析规则仅适用于分片 IPv6 数据包的第一个分片。后续分片无论其内容如何都会被转发，因为它们不包含识别 RA 所需的协议头。

## 网桥防火墙 {#bridge-firewall}

---

网桥防火墙实现数据包过滤，从而提供用于管理到网桥、来自网桥以及穿过网桥的数据流的安全功能。

[数据包流程图](../firewall-and-quality-of-service/packet-flow-in-routeros.md)展示了数据包如何经过路由器处理。可以强制网桥流量经过 `/ip/firewall/filter` 规则（请参阅网桥设置）。

有两个网桥防火墙表：

- **filter** - 具有三个预定义链的网桥防火墙：
  - **input** - 过滤数据包，其目的地为网桥（包括将被路由的数据包，因为它们无论如何都发往网桥 MAC 地址）。
  - **output** - 过滤来自网桥的数据包（包括已正常路由的数据包）。
  - **forward** - 过滤将要被桥接的数据包（注意：该链不适用于应通过路由器路由的数据包，只适用于在同一网桥的端口之间穿行的数据包）。
- **nat** - 网桥网络地址转换提供了更改穿过网桥的数据包的源/目标 MAC 地址的方法。有两个内置链：
  - **srcnat** - 用于将主机或网络“隐藏”在不同的 MAC 地址之后。该链应用于通过桥接接口离开路由器的数据包。
  - **dstnat** - 用于将某些数据包重定向到其他目的地。

你可以在网桥防火墙（filter 和 NAT）中放置数据包标记，这些标记与由 `'/ip/firewall/mangle'` 配置的 IP 防火墙中的数据包标记相同。通过这种方式，网桥防火墙设置的数据包标记可以在“IP 防火墙”中使用，反之亦然。

本节介绍网桥防火墙的通用属性。nat 和 filter 规则之间不同的某些参数将在后续章节中介绍。

**子菜单：** `/interface/bridge/filter, /interface/bridge/nat`

| 属性 | 描述 |
| :-- | :-- |
| **802.3-sap** (*integer*; Default: ) | DSAP（Destination Service Access Point）和 SSAP（Source Service Access Point）是 2 个单字节字段，用于标识使用链路层服务的网络协议实体。这两个字节始终相等。此处可指定两个十六进制数字以匹配 SAP 字节。 |
| **802.3-type** (*integer*; Default: ) | Ethernet 协议类型，位于 IEEE 802.2 帧头之后。仅在 802.3-sap 为 0xAA（SNAP - Sub-Network Attachment Point 报头）时有效。例如，AppleTalk 可由 SAP 代码 0xAA 后跟 SNAP 类型代码 0x809B 来表示。 |
| **action** (*accept \| drop \| jump \| log \| mark-packet \| passthrough \| return \| set-priority*; Default: ) | 数据包与规则匹配时要执行的操作：<ul><li>accept - 接受数据包。该数据包不会传递给下一条防火墙规则</li><li>drop - 静默丢弃数据包</li><li>jump - 跳转到由 <span className="ros-icon-success"><code>jump-target</code></span> 参数值指定的用户定义链</li><li>log - 将包含以下数据的消息添加到系统日志：in-interface、out-interface、src-mac、protocol、src-ip:port-&gt;dst-ip:port 以及数据包长度。数据包匹配后，会像 <span className="ros-icon-success"><code>passthrough</code></span> 一样传递给列表中的下一条规则</li><li>mark-packet - 在匹配规则的数据包上放置由 new-packet-mark 参数指定的标记</li><li>passthrough - 如果数据包匹配该规则，则增加计数器并转到下一条规则（用于统计）</li><li>return - 将控制权返回到发生跳转的链</li><li>set-priority - 在为能够传输优先级的链路（VLAN 或启用 WMM 的无线接口）发送的数据包上，设置由 new-priority 参数指定的优先级。[阅读更多](./user-guides/wmm-and-vlan-priority.md)</li></ul> |
| **arp-dst-address** (*IP address*; Default: ) | ARP 目标 IP 地址。 |
| **arp-dst-mac-address** (*MAC address*; Default: ) | ARP 目标 MAC 地址。 |
| **arp-gratuitous** (*yes \| no*; Default: ) | 匹配 ARP 免费数据包。 |
| **arp-hardware-type** (*integer*; Default: **1**) | ARP 硬件类型。通常为 Ethernet（类型 1）。 |
| **arp-opcode** (*arp-nak \| drarp-error \| drarp-reply \| drarp-request \| inarp-reply \| inarp-request \| reply \| reply-reverse \| request \| request-reverse*; Default: ) | ARP 操作码（数据包类型）<ul><li>arp-nak - 否定 ARP 应答（很少使用，主要用于 ATM 网络）</li><li>drarp-error - 动态 RARP 错误代码，表示无法为给定 MAC 地址分配 IP 地址</li><li>drarp-reply - 动态 RARP 应答，为主机分配临时 IP 地址</li><li>drarp-request - 动态 RARP 请求，为给定 MAC 地址分配临时 IP 地址</li><li>inarp-reply - InverseARP 应答</li><li>inarp-request - InverseARP 请求</li><li>reply - 带有 MAC 地址的标准 ARP 应答</li><li>reply-reverse - 带有已分配 IP 地址的反向 ARP（RARP）应答</li><li>request - 向已知 IP 地址发出的标准 ARP 请求，以找出未知 MAC 地址</li><li>request-reverse - 向已知 MAC 地址发出的反向 ARP（RARP）请求，以找出未知 IP 地址（旨在供主机用来发现自己的 IP 地址，类似于 DHCP 服务）</li></ul> |
| **arp-packet-type** (*integer 0..65535 \| hex 0x0000-0xffff*; Default: ) | ARP 数据包类型。 |
| **arp-src-address** (*IP address*; Default: ) | ARP 源 IP 地址。 |
| **arp-src-mac-address** (*MAC addres*; Default: ) | ARP 源 MAC 地址。 |
| **chain** (*text*; Default: ) | 过滤器所生效的网桥防火墙链（内置链或用户定义链）。 |
| **dst-address** (*IP address*; Default: ) | 目标 IP 地址（仅当 MAC 协议设置为 IP 时）。 |
| **dst-address6** (*IPv6 address*; Default: ) | 目标 IPv6 地址（仅当 MAC 协议设置为 IPv6 时）。 |
| **dst-mac-address** (*MAC address*; Default: ) | 目标 MAC 地址。 |
| **dst-port** (*integer 0..65535*; Default: ) | 目标端口号或范围（仅适用于 TCP 或 UDP 协议）。 |
| **in-bridge** (*name*; Default: ) | 数据包进入所经过的网桥接口。 |
| **in-bridge-list** (*name*; Default: ) | 在接口列表中定义的网桥接口集合。工作方式与 `in-bridge` 相同。 |
| **in-interface** (*name*; Default: ) | 数据包进入所经过的物理接口（即网桥端口）。 |
| **in-interface-list** (*name*; Default: ) | 在接口列表中定义的接口集合。工作方式与 `in-interface` 相同。 |
| **ingress-priority** (*integer 0..63*; Default: ) | 匹配入站数据包的优先级。优先级可来自 VLAN、WMM、DSCP 或 MPLS EXP 位。[阅读更多](./user-guides/wmm-and-vlan-priority.md) |
| **ip-protocol** (*dccp \| ddp \| egp \| encap \| etherip \| ggp \| gre \| hmp \| icmp \| icmpv6 \| idpr-cmtp \| igmp \| ipencap \| ipip \| ipsec-ah \| ipsec-esp \| ipv6 \| ipv6-frag \| ipv6-nonxt \| ipv6-opts \| ipv6-route \| iso-tp4 \| l2tp \| ospf \| pim \| pup \| rdp \| rspf \| rsvp \| sctp \| st \| tcp \| udp \| udp-lite \| vmtp \| vrrp \| xns-idp \| xtp*; Default: ) | IP 协议（仅当 MAC 协议设置为 IPv4 时）<ul><li>dccp - Datagram Congestion Control Protocol</li><li>ddp - Datagram Delivery Protocol</li><li>egp - Exterior Gateway Protocol</li><li>encap - Encapsulation Header</li><li>etherip - Ethernet-within-IP Encapsulation</li><li>ggp - Gateway-to-Gateway Protocol</li><li>gre - Generic Routing Encapsulation</li><li>hmp - Host Monitoring Protocol</li><li>icmp - IPv4 Internet Control Message Protocol</li><li>icmpv6 - IPv6 Internet Control Message Protocol</li><li>idpr-cmtp - Inter-Domain Policy Routing Control Message Transport Protocol</li><li>igmp - Internet Group Management Protocol</li><li>ipencap - IP in IP (encapsulation)</li><li>ipip - IP-within-IP Encapsulation Protocol</li><li>ipsec-ah - IPsec Authentication Header</li><li>ipsec-esp - IPsec Encapsulating Security Payload</li><li>ipv6 - Internet Protocol version 6</li><li>ipv6-frag - Fragment Header for IPv6</li><li>ipv6-nonxt - No Next Header for IPv6</li><li>ipv6-opts - Destination Options for IPv6</li><li>ipv6-route - Routing Header for IPv6</li><li>iso-tp4 - ISO Transport Protocol Class 4</li><li>l2tp - Layer Two Tunneling Protocol</li><li>ospf - Open Shortest Path First</li><li>pim - Protocol Independent Multicast</li><li>pup - PARC Universal Packet</li><li>rdp - Reliable Data Protocol</li><li>rspf - Radio Shortest Path First</li><li>rsvp - Reservation Protocol</li><li>sctp - Stream Control Transmission Protocol</li><li>st - Internet Stream Protocol</li><li>tcp - Transmission Control Protocol</li><li>udp - User Datagram Protocol</li><li>udp-lite - Lightweight User Datagram Protocol</li><li>vmtp - Versatile Message Transaction Protocol</li><li>vrrp - Virtual Router Redundancy Protocol</li><li>xns-idp - Xerox Network Systems Internet Datagram Protocol</li><li>xtp - Xpress Transport Protocol</li></ul> |
| **jump-target** (*name*; Default: ) | 如果指定了 `action=jump`，则指定用于处理数据包的用户定义防火墙链。 |
| **limit** (*integer/time,integer*; Default: ) | 匹配数据包直到达到限制速率。使用此匹配器的规则将一直匹配，直到达到该限制。<ul><li>count - 最大平均数据包速率，以每秒数据包数（pps）为单位，除非后面跟有 Time 选项</li><li>time - 指定测量数据包速率的时间间隔</li><li>burst - 突发中要匹配的数据包数量</li></ul> |
| **log**(*yes \| no; Default:***no**) | 将包含以下数据的消息添加到系统日志：in-interface、out-interface、src-mac、dst-mac、eth-protocol、ip-protocol、src-ip:port->dst-ip:port 以及数据包长度。 |
| **log-prefix** (*text*; Default: ) | 定义在日志信息之前打印的前缀。 |
| **mac-protocol** (*802.2 \| arp \| capsman \| dot1x \| homeplug-av \| ip \| ipv6 \| ipx \| lacp \| length \| lldp \| loop-protect \| macsec \| mpls-multicast \| mpls-unicast \| mvrp \| packing-compr \| packing-simple \| pppoe \| pppoe-discovery \| rarp \| romon \| service-vlan \| vlan \| integer 0..65535 \| hex 0x0000-0xffff*; Default: ) | Ethernet 负载类型（MAC 层协议）。要匹配 VLAN 封装帧（0x8100 或 0x88a8）的协议类型，应使用 vlan-encap 属性。<ul><li>802.2 - 802.2 帧（0x0004）</li><li>arp - Address Resolution Protocol（0x0806）</li><li>homeplug-av - HomePlug AV MME（0x88E1）</li><li>ip - Internet Protocol version 4（0x0800）</li><li>ipv6 - Internet Protocol Version 6（0x86DD）</li><li>ipx - Internetwork Packet Exchange（0x8137）</li><li>length - 带有长度字段的数据包（0x0000-0x05DC）</li><li>lldp - Link Layer Discovery Protocol（0x88CC）</li><li>loop-protect - Loop Protect Protocol（0x9003）</li><li>mpls-multicast - MPLS 组播（0x8848）</li><li>mpls-unicast - MPLS 单播（0x8847）</li><li>mvrp - Multiple VLAN Registration protocol（0x88F5）</li><li>packing-compr - 使用压缩 [IP 打包](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md) 封装的报文（0x9001）</li><li>packing-simple - 使用简单 [IP 打包](https://en.wikipedia.org/wiki/Glob_(programming) 封装的报文（0x9000）</li><li>pppoe - PPPoE Session Stage（0x8864）</li><li>pppoe-discovery - PPPoE Discovery Stage（0x8863）</li><li>rarp - Reverse Address Resolution Protocol（0x8035）</li><li>service-vlan - Provider Bridging（IEEE 802.1ad）&amp; Shortest Path Bridging IEEE 802.1aq（0x88A8）</li><li>vlan - 带 VLAN 标签的帧（IEEE 802.1Q）以及具有 NNI 兼容性的 Shortest Path Bridging IEEE 802.1aq（0x8100）</li></ul> |
| **new-packet-mark** (*string*; Default: ) | 设置新的数据包标记值。 |
| **new-priority** (*integer \| from-ingress*; Default: ) | 设置数据包的新优先级。这可以是 VLAN、WMM 或 MPLS EXP 优先级 [阅读更多](./user-guides/wmm-and-vlan-priority.md)。此属性也可用于设置内部优先级 |
| **out-bridge** (*name*; Default: ) | 出站网桥接口。 |
| **out-bridge-list** (*name*; Default: ) | 在接口列表中定义的网桥接口集合。工作方式与 `out-bridge` 相同。 |
| **out-interface** (*name*; Default: ) | 数据包离开网桥时所经过的接口。 |
| **out-interface-list** (*name*; Default: ) | 在[接口列表](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)中定义的接口集合。工作方式与 `out-interface` 相同。 |
| **packet-mark** (*name*; Default: ) | 匹配具有特定数据包标记的数据包。 |
| **packet-type** (*broadcast \| host \| multicast \| other-host*; Default: ) | MAC 帧类型：<ul><li>broadcast - 广播 MAC 数据包</li><li>host - 数据包目的地为网桥本身</li><li>multicast - 组播 MAC 数据包</li><li>other-host - 数据包目的地为其他单播地址，而不是网桥本身</li></ul> |
| **src-address** (*IP address*; Default: ) | 源 IP 地址（仅当 MAC 协议设置为 IPv4 时）。 |
| **src-address6** (*IPv6 address*; Default: ) | 源 IPv6 地址（仅当 MAC 协议设置为 IPv6 时）。 |
| **src-mac-address** (*MAC address*; Default: ) | 源 MAC 地址。 |
| **src-port** (*integer 0..65535*; Default: ) | 源端口号或范围（仅适用于 TCP 或 UDP 协议）。 |
| **stp-flags** (*topology-change \| topology-change-ack*; Default: ) | BPDU（Bridge Protocol Data Unit）标志。网桥定期交换名为 BPDU 的配置消息以防止环路<ul><li>topology-change - 当网桥检测到端口状态变化时设置拓扑变化标志，以强制所有其他网桥丢弃其主机表并重新计算网络拓扑</li><li>topology-change-ack - 在对通知数据包的应答中发送拓扑变化确认标志</li></ul> |
| **stp-forward-delay** (*integer 0..65535*; Default: ) | 转发延迟计时器。 |
| **stp-hello-time** (*integer 0..65535*; Default: ) | STP hello 数据包时间。 |
| **stp-max-age** (*integer 0..65535*; Default: ) | STP 消息最大年龄。 |
| **stp-msg-age** (*integer 0..65535*; Default: ) | STP 消息年龄。 |
| **stp-port** (*integer 0..65535*; Default: ) | STP 端口标识符。 |
| **stp-root-address** (*MAC address*; Default: ) | 根网桥 MAC 地址。 |
| **stp-root-cost** (*integer 0..65535*; Default: ) | 根网桥开销。 |
| **stp-root-priority** (*integer 0..65535*; Default: ) | 根网桥优先级。 |
| **stp-sender-address** (*MAC address*; Default: ) | STP 消息发送方 MAC 地址。 |
| **stp-sender-priority** (*integer 0..65535*; Default: ) | STP 发送方优先级。 |
| **stp-type** (*config \| tcn*; Default: ) | BPDU 类型：<ul><li>config - 配置 BPDU</li><li>tcn - 拓扑变化通知</li></ul> |
| **tls-host** (*string*; Default: ) | 允许基于 TLS SNI 主机名匹配 https 流量。接受 [GLOB 语法](https://en.wikipedia.org/wiki/Glob_(programming)) 进行通配符匹配。请注意，如果 TLS 握手帧被分片为多个 TCP 段（数据包），匹配器将无法匹配该主机名。 |
| **vlan-encap** (*802.2 \| arp \| ip \| ipv6 \| ipx \| length \| mpls-multicast \| mpls-unicast \| pppoe \| pppoe-discovery \| rarp \| vlan \| integer 0..65535 \| hex 0x0000-0xffff*; Default: ) | 匹配封装在 VLAN 帧中的 MAC 协议类型。 |
| **vlan-id** (*integer 0..4095*; Default: ) | 匹配 VLAN 标识符字段。 |
| **vlan-priority** (*integer 0..7*; Default: ) | 匹配 VLAN 优先级（优先级代码点）。 |

脚注：

- STP 匹配器仅在目标 MAC 地址为 `01:80:C2:00:00:00/FF:FF:FF:FF:FF:FF`（Bridge Group 地址）时有效，并且应启用 STP。

- 仅当 mac-protocol 为 `arp` 或 `rarp` 时，ARP 匹配器才有效。

- 仅当以太网协议为 `0x8100` 或 `0x88a8` 时，VLAN 匹配器才有效。

- 仅当 mac-protocol 设置为 `ip` 或 `ipv6` 时，IP 或 IPv6 相关匹配器才有效。

- 仅当实际帧符合 IEEE 802.2 和 IEEE 802.3 标准时，才会检查 802.3 匹配器。对于其他数据包，这些匹配器会被忽略。

### 网桥数据包过滤器 {#bridge-packet-filter}

本节介绍特定的网桥过滤器选项。

**子菜单：** `/interface/bridge/filter`

| 属性 | 描述 |
| :-- | :-- |
| **action** (*accept \| drop \| jump \| log \| mark-packet \| passthrough \| return \| set-priority*；默认值：**accept**) | 如果数据包与规则匹配，则要执行的操作：<ul><li>accept - 接受数据包。不执行任何操作，即数据包会直接通过而不执行任何操作，并且相关列表/链中不会处理更多规则</li><li>drop - 静默丢弃数据包（不发送 ICMP 拒绝消息）</li><li>jump - 跳转到由 jump-target 参数值指定的链</li><li>log - 向系统日志添加一条消息，其中包含以下数据：in-interface、out-interface、src-mac、dst-mac、eth-proto、protocol、src-ip:port-&gt;dst-ip:port 以及数据包长度。数据包匹配后，会被传递给列表中的下一条规则，类似于 passthrough</li><li>mark - 标记数据包，以便稍后使用该标记</li><li>passthrough - 忽略此规则并继续处理下一条规则。其作用与已禁用规则相同，区别在于能够统计数据包</li><li>return - 返回到发生跳转的上一个链</li><li>set-priority - 对通过能够传输优先级的链路（VLAN 或支持 WMM 的无线接口）发出的数据包，设置由 new-priority 参数指定的优先级。[阅读更多](./user-guides/wmm-and-vlan-priority.md)</li></ul> |

### 桥接 NAT {#bridge-nat}

本节介绍特定的桥接 NAT 选项。

**子菜单：** `/interface/bridge/nat`

| 属性 | 描述 |
| :-- | :-- |
| **action** (*accept \| drop \| jump \| mark-packet \| redirect \| set-priority \| arp-reply \| dst-nat \| log \| passthrough \| return \| src-nat*；默认值：**accept**) | 当数据包与该规则匹配时要执行的操作：<ul><li>accept - 接受数据包。不执行任何操作，即数据包被直接放行而不执行任何动作，并且不再处理相关列表/链中的更多规则</li><li>arp-reply - 使用指定的 MAC 地址发送对 ARP 请求的应答（此规则将忽略任何其他数据包）（仅在 dstnat 链中有效）</li><li>drop - 静默丢弃数据包（不发送 ICMP reject 消息）</li><li>dst-nat - 更改数据包的目标 MAC 地址（仅在 dstnat 链中有效）</li><li>jump - 跳转到由 jump-target 参数值指定的链</li><li>log - 记录数据包日志</li><li>mark - 标记数据包，以便稍后使用该标记</li><li>passthrough - 忽略此规则并继续处理下一条规则。其行为与禁用规则相同，区别在于能够统计数据包</li><li>redirect - 将数据包重定向到网桥本身（仅在 dstnat 链中有效）</li><li>return - 返回到执行跳转的上一级链</li><li>set-priority - 对通过支持传输优先级的链路（VLAN 或启用 WMM 的无线接口）发送的数据包，设置由 new-priority 参数指定的优先级。[阅读更多](./user-guides/wmm-and-vlan-priority.md)</li><li>src-nat - 更改数据包的源 MAC 地址（仅在 srcnat 链中有效）</li></ul> |
| **to-arp-reply-mac-address** (*MAC 地址*；默认值：) | 当选择 `action=arp-reply` 时，放入以太网帧和 ARP 负载中的源 MAC 地址 |
| **to-dst-mac-address** (*MAC 地址*；默认值：) | 当选择 `action=dst-nat` 时，放入以太网帧中的目标 MAC 地址 |
| **to-src-mac-address** (*MAC 地址*；默认值：) | 当选择 `action=src-nat` 时，放入以太网帧中的源 MAC 地址 |

## 另请参阅 {#see-also}

---

- [CRS1xx/2xx 系列交换机](./user-guides/crs1xx-2xx-series-switches-examples.md)
- [Marvell Prestera 交换机芯片功能](./marvell-prestera-switch-chip-features.md)
- [交换机芯片功能](./switch-chip-features.md)
- [RouterBOARD 上的 MTU](../hardware/mtu-in-routeros.md)
- [二层错误配置](./user-guides/layer2-misconfiguration.md)
- [桥接 VLAN 表](./user-guides/bridge-vlan-table.md)
