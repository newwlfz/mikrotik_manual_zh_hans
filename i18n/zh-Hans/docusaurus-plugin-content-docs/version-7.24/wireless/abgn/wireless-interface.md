---
title: "无线接口"
description: "RouterOS 无线接口支持 IEEE 802.11 标准，并提供多种模式（客户端、AP、网桥）、加密协议、信道宽度调整和高级传输设置等功能，以获得最佳无线网络性能。"
tags:
  - 'wireless'
  - 'arp'
  - 'channel-width'
source: https://manual.mikrotik.com/docs/7.24/wireless/abgn/wireless-interface
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

---

## 概述 {#overview}

**包：** wireless

RouterOS 无线功能符合 IEEE 802.11 标准。它完整支持 802.11a、802.11b、802.11g、802.11n 和 802.11ac，并提供 WPA、WEP、AES 加密、Wireless Distribution System（WDS）、Dynamic Frequency Selection（DFS）、Virtual Access Point、Nstreme 和 Nv2 专有协议等附加功能。

无线功能可工作在多种模式下：客户端（station）、接入点、无线网桥等。客户端 / station 也可工作在不同模式下。受支持模式的完整列表请参阅 [Wireless Station Modes](/docs/wireless/user-guides/wireless-station-modes)。

## 常规接口属性 {#general-interface-properties}

**子菜单：** `/interface/wireless`

| 属性 | 说明 |
| :-- | :-- |
| **adaptive-noise-immunity** (*ap-and-client-mode \| client-mode \| none*；默认值：**none**) | 该属性仅对基于 Atheros 芯片组的网卡有效。 |
| **allow-sharedkey** (*yes \| no*；默认值：**no**) | 允许 WEP Shared Key 客户端连接。请注意，这些客户端不会进行任何认证（WEP Shared Key 不会与任何内容进行比较）——只要访问列表允许，就会立即被接受。 |
| **ampdu-priorities** (*list of integer [0..7]*；默认值：**0**) | 指定协商并使用 AMPDU 发送（聚合帧并使用块确认发送）的帧优先级。使用 AMPDU 将提高吞吐量，但可能增加延迟，因此可能不适合实时流量（语音、视频）。因此，默认情况下 AMPDU 仅对 best-effort 流量启用。 |
| **amsdu-limit** (*integer [0..8192]*；默认值：**8192**) | 协商时允许设备准备的最大 AMSDU。AMSDU 聚合可显著提高吞吐量，尤其是小帧场景，但由于聚合帧重传，在丢包时可能增加延迟。发送和接收 AMSDU 也会增加 CPU 使用率。 |
| **amsdu-threshold** (*integer [0..8192]*；默认值：**8192**) | 允许包含在 AMSDU 中的最大帧大小。 |
| **antenna-gain** (*integer [0..4294967295]*；默认值：**0**) | 天线增益，单位为 dBi，用于根据 **country** 法规计算最大发射功率。 |
| **antenna-mode** (*ant-a \| ant-b \| rxa-txb \| txa-rxb*；默认值：) | 选择用于发送和接收的天线<ul><li><em>ant-a</em> - 仅使用“a”天线</li><li><em>ant-b</em> - 仅使用“b”天线</li><li><em>txa-rxb</em> - 使用天线“a”发送，使用天线“b”接收</li><li><em>rxa-txb</em> - 使用天线“b”发送，使用天线“a”接收</li></ul> |
| **area** (*string*；默认值：) | 标识无线网络组。该值由 AP 通告，并可在 [connect-list](/docs/wireless/abgn/wireless-interface#connect-list) 中通过 **area-prefix** 匹配。这是专有扩展。 |
| **arp** (*disabled \| enabled \| proxy-arp \| reply-only*；默认值：**enabled**) | [ARP](/docs/network-management/arp) |
| **arp-timeout** (*auto \| integer*；默认值：**auto**) | ARP 超时是从 IP 收到最后一个数据包后，ARP 记录在 ARP 表中保留的时间。值 **auto** 等于 **/ip/settings** 中的 **arp-timeout** 值，默认值为 30s。 |
| **band** (*2ghz-b \| 2ghz-b/g \| 2ghz-b/g/n \| 2ghz-onlyg \| 2ghz-onlyn \| 5ghz-a \| 5ghz-a/n \| 5ghz-onlyn \| 5ghz-a/n/ac \| 5ghz-onlyac \| 5ghz-n/ac*；默认值：) | 定义使用的数据速率、信道频率和带宽集合。 |
| **basic-rates-a/g** (*12Mbps \| 18Mbps \| 24Mbps \| 36Mbps \| 48Mbps \| 54Mbps \| 6Mbps \| 9Mbps*；默认值：**6Mbps**) | 与 **basic-rates-b** 属性类似，但用于 5ghz、5ghz-10mhz、5ghz-5mhz、5ghz-turbo、2.4ghz-b/g、2.4ghz-onlyg、2ghz-10mhz、2ghz-5mhz 和 2.4ghz-g-turbo 频段。 |
| **basic-rates-b** (*11Mbps \| 1Mbps \| 2Mbps \| 5.5Mbps*；默认值：**1Mbps**) | 基本速率列表，用于 2.4ghz-b、2.4ghz-b/g 和 2.4ghz-onlyg 频段。客户端仅在支持 AP 通告的所有基本速率时才会连接到 AP。AP 仅在支持另一 AP 的所有基本速率时才会建立 WDS 链路。<br/>该属性仅在 AP 模式下且配置了 <strong>rate-set</strong> 值时生效。 |
| **bridge-mode** (*disabled \| enabled*；默认值：**enabled**) | 允许使用 station-bridge 模式。[Wireless Station Modes](/docs/wireless/user-guides/wireless-station-modes) |
| **burst-time** (*integer \| disabled*；默认值：**disabled**) | 用于连续发送数据而不中断的时间，单位为微秒。请注意，在 burst-time 微秒期间，该网络中的其他无线网卡将无法发送数据。该设置仅适用于基于 AR5000、AR5001X 和 AR5001X+ 芯片组的网卡。 |
| **channel-width** (*20/40/80/160mhz-Ceeeeeee \| 20/40/80/160mhz-XXXXXXXX \| 20/40/80/160mhz-eCeeeeee \| 20/40/80/160mhz-eeCeeeee \| 20/40/80/160mhz-eeeCeeee \| 20/40/80/160mhz-eeeeCeee \| 20/40/80/160mhz-eeeeeCee \| 20/40/80/160mhz-eeeeeeCe \| 20/40/80/160mhz-eeeeeeeC \| 20/40/80mhz-Ceee \| 20/40/80mhz-eCee \| 20/40/80mhz-eeCe \| 20/40/80mhz-eeeC \| 20/40/80mhz-XXXX \| 20/40mhz-Ce \| 20/40mhz-eC \| 20/40mhz-XX \| 40mhz-turbo \| 20mhz \| 10mhz \| 5mhz*；默认值：**20mhz**) | 使用扩展信道（例如 Ce、eC 等）可增加额外的 20MHz 扩展信道，并指定其位于控制（主）信道之下或之上。扩展信道使 802.11n 设备总共可使用最多 40MHz（802.11ac 最多 160MHz）频谱，从而提高最大吞吐量。带有 XX 和 XXXX 扩展的信道宽度会根据每个频率上并发运行设备的数量自动扫描较不拥挤的控制信道频率，并自动选择“C”——控制信道频率。 |
| **comment** (*string*；默认值：) | 接口的简短描述。 |
| **compression** (*yes \| no*；默认值：**no**) | 将该属性设置为 *yes* 将允许使用硬件压缩。无线接口必须支持硬件压缩。与使用压缩的设备建立的连接仍可正常工作。 |
| **country** (*name of the country \| no\_country\_set*；默认值：**etsi**) | 限制可用频段、频率以及每个频率的最大发射功率。还指定 **scan-list** 的默认值。值 *no\_country\_set* 是符合 FCC 的信道集合。 |
| **default-ap-tx-limit** (*integer [0..4294967295]*；默认值：**0**) | 对于不匹配 [access-list](/docs/wireless/abgn/wireless-interface#access-list) 中任何条目的客户端，该值为 **ap-tx-limit**。0 表示无限制。 |
| **default-authentication** (*yes \| no*；默认值：**yes**) | 对于 AP 模式，对于不匹配 [access-list](/docs/wireless/abgn/wireless-interface#access-list) 中任何条目的客户端，该值为 **authentication**。对于 station 模式，对于不匹配 [connect-list](/docs/wireless/abgn/wireless-interface#connect-list) 中任何条目的 AP，该值为 **connect**。 |
| **default-client-tx-limit** (*integer [0..4294967295]*；默认值：**0**) | 对于不匹配 [access-list](/docs/wireless/abgn/wireless-interface#access-list) 中任何条目的客户端，该值为 **client-tx-limit**。0 表示无限制。 |
| **default-forwarding** (*yes \| no*；默认值：**yes**) | 对于不匹配 [access-list](/docs/wireless/abgn/wireless-interface#access-list) 中任何条目的客户端，该值为 **forwarding**。 |
| **disable-running-check** (*yes \| no*；默认值：**no**) | 设置为 **yes** 时，接口将始终具有 running 标志。如果设置为 **no**，路由器会判断网卡是否已启动并运行：对于 AP，必须有一个或多个客户端注册到该 AP；对于 station，应已连接到某个 AP。 |
| **disabled** (*yes \| no*；默认值：**yes**) | 接口是否禁用。 |
| **disconnect-timeout** (*time [0s..15s]*；默认值：**3s**) | 该间隔从最低数据速率下第三次发送失败开始计时。此时，在最低数据速率下已有 3 \* (**hw-retries** + 1) 次帧发送失败。在 **disconnect-timeout** 期间，将按 **on-fail-retry-time** 间隔重试数据包传输。如果在 **disconnect-timeout** 期间没有帧成功发送，则连接关闭，并记录为“extensive data loss”事件。成功发送帧会重置该计时器。 |
| **distance** (*integer \| dynamic \| indoors*；默认值：**dynamic**) | 在判定发送失败之前等待单播帧确认（<strong>ACK</strong>）的时间，简称 <strong>ACK-Timeout</strong>。Distance 值具有以下行为：<ul><li><em>Dynamic</em> - 使 AP 检测并使用适用于所有已连接客户端的最小超时。</li><li><em>Indoor</em> - 使用硬件芯片制造商设置的默认 ACK 超时值。</li><li><em>Number</em> - 在公式中使用输入值：ACK-timeout = ((<strong>distance</strong> \* 1000) + 299) / 300 us；</li></ul>Nstreme/Nv2 协议不使用确认。 |
| **frame-lifetime** (*integer [0..4294967295]*；默认值：**0**) | 丢弃排队等待发送时间超过 **frame-lifetime** 的帧。默认情况下，当该属性值为 *0* 时，仅在连接关闭后丢弃帧。 |
| **frequency** (*integer [0..4294967295]*；默认值：) | AP 工作的信道频率值，单位为 MHz。允许值取决于所选频段，并受 <strong>country</strong> 设置和无线网卡能力限制。如果接口处于任何 <strong>station</strong> 模式、<em>wds-slave</em> 模式，或 DFS 处于活动状态，则该设置<strong>无效</strong>。<br/><em>注意</em>：如果使用“superchannel”模式，网卡支持的任意频率都会被接受，但在 RouterOS 客户端上，任何非标准频率都必须在 <a href="/docs/wireless/abgn/wireless-interface#scan-list">scan-list</a> 中配置，否则不会扫描非标准范围。在 WinBox 中，scanlist 频率为 <em>粗体</em>，其他频率表示客户端需要配置 scan-list。 |
| **frequency-mode** (*manual-txpower \| regulatory-domain \| superchannel*；默认值：**regulatory\_domain**) | 可用的频率模式有三种：<ul><li><em>regulatory-domain</em> - 根据 <strong>country</strong> 的值限制可用信道和每个信道的最大发射功率。</li><li><em>manual-txpower</em> - 与上述相同，但不限制最大发射功率。</li><li><em>superchannel</em> - 一致性测试模式。允许使用网卡支持的所有信道。</li></ul>每个频段的可用信道列表可在 <strong>/interface/wireless/info/allowed-channels</strong> 中查看。该模式允许测试默认 scan-list 和/或监管域之外的无线信道。该模式仅应在受控环境中使用，或在所在区域拥有特殊许可时使用。 |
| **frequency-offset** (*integer [-2147483648..2147483647]*；默认值：**0**) | 当使用的无线网卡工作频率与 RouterOS 显示的频率不同时，可指定偏移量，例如网卡中使用了频率转换器。因此，如果网卡工作在 4000MHz，但 RouterOS 显示 5000MHz，请将偏移量设置为 1000MHz，即可正确显示。该值以 MHz 为单位，可为正数或负数。 |
| **guard-interval** (*any \| long*；默认值：**any**) | 是否允许使用短保护间隔（请参阅 802.11n MCS 规范，了解其如何影响吞吐量）。“any”将根据数据速率使用短保护间隔或长保护间隔，“long”将使用长保护间隔。 |
| **hide-ssid** (*yes \| no*；默认值：**no**) | <ul><li><em>yes</em> - AP 不在信标帧中包含 SSID，并且不回复具有广播 SSID 的探测请求。</li><li><em>no</em> - AP 在信标帧中包含 SSID，并回复具有广播 SSID 的探测请求。</li></ul>该属性仅在 AP 模式下生效。将其设置为 <em>yes</em> 可使该网络从某些客户端软件显示的无线网络列表中消失。更改该设置不会提高无线网络的安全性，因为 SSID 包含在 AP 发送的其他帧中。 |
| **ht-basic-mcs** (*list of (mcs-0 \| mcs-1 \| mcs-2 \| mcs-3 \| mcs-4 \| mcs-5 \| mcs-6 \| mcs-7 \| mcs-8 \| mcs-9 \| mcs-10 \| mcs-11 \| mcs-12 \| mcs-13 \| mcs-14 \| mcs-15 \| mcs-16 \| mcs-17 \| mcs-18 \| mcs-19 \| mcs-20 \| mcs-21 \| mcs-22 \| mcs-23)*；默认值：**mcs-0; mcs-1; mcs-2; mcs-3; mcs-4; mcs-5; mcs-6; mcs-7**) | 每个连接的客户端都必须支持的[调制与编码方案](http://en.wikipedia.org/wiki/IEEE_802.11n-2009#Data_rates)。有关 MCS 规范，请参阅 802.11n。 |
| **ht-supported-mcs** (*list of (mcs-0 \| mcs-1 \| mcs-2 \| mcs-3 \| mcs-4 \| mcs-5 \| mcs-6 \| mcs-7 \| mcs-8 \| mcs-9 \| mcs-10 \| mcs-11 \| mcs-12 \| mcs-13 \| mcs-14 \| mcs-15 \| mcs-16 \| mcs-17 \| mcs-18 \| mcs-19 \| mcs-20 \| mcs-21 \| mcs-22 \| mcs-23)*；默认值：**mcs-0; mcs-1; mcs-2; mcs-3; mcs-4; mcs-5; mcs-6; mcs-7; mcs-8; mcs-9; mcs-10; mcs-11; mcs-12; mcs-13; mcs-14; mcs-15; mcs-16; mcs-17; mcs-18; mcs-19; mcs-20; mcs-21; mcs-22; mcs-23**) | 该设备通告为支持的[调制与编码方案](http://en.wikipedia.org/wiki/IEEE_802.11n-2009#Data_rates)。有关 MCS 规范，请参阅 802.11n。 |
| **hw-fragmentation-threshold** (*integer[256..3000] \| disabled*；默认值：**disabled**) | 指定通过无线介质传输时的最大分片大小，单位为字节。802.11 标准数据包（802.11 术语中为 MSDU）分片允许在通过无线介质发送前对数据包进行分片，以提高成功传输的概率（仅重传未正确传输的分片）。请注意，由于协议开销以及发送和接收双方资源使用增加，传输分片数据包的效率低于传输未分片数据包。 |
| **hw-protection-mode** (*cts-to-self \| none \| rts-cts*；默认值：**none**) | 帧保护支持属性 [Frame protection support](/docs/wireless/abgn/wireless-interface#frame-protection-support-rtscts) |
| **hw-protection-threshold** (*integer [0..65535]*；默认值：**0**) | 帧保护支持属性 [Frame protection support](/docs/wireless/abgn/wireless-interface#frame-protection-support-rtscts) |
| **hw-retries** (*integer [0..15]*；默认值：**7**) | 在判定发送失败之前重试发送帧的次数。失败后会降低数据速率并再次发送帧。在最低支持速率上连续三次失败后，将在 **on-fail-retry-time** 期间暂停向该目标发送。之后再次发送帧。帧会持续重传，直到发送成功，或直到客户端在 **disconnect-timeout** 后断开连接。在此期间，如果超过 **frame-lifetime**，帧可能会被丢弃。 |
| **installation** (*any \| indoor \| outdoor*；默认值：**any**) | 调整 scan-list，使其针对设置的国家使用室内、室外或所有频率。 |
| **interworking-profile** (*enabled \| disabled*；默认值：**disabled**) |  |
| **keepalive-frames** (*enabled \| disabled*；默认值：**enabled**) | 仅当无线接口处于 mode=**ap-bridge** 时适用。如果客户端约 20 秒未通信，AP 会发送“keepalive-frame”。**注意：**禁用该功能可能导致 registration-table 中出现“ghost”客户端。 |
| **l2mtu** (*integer [0..65536]*；默认值：**1600**) |  |
| **mac-address** (*MAC*；默认值：) |  |
| **master-interface** (*string*；默认值：) | 具有 *virtual-ap* 能力的无线接口名称。Virtual AP 接口仅在主接口处于 *ap-bridge*、*bridge*、*station* 或 *wds-slave* 模式时工作。该属性仅用于 virtual AP 接口。 |
| **max-station-count** (*integer [1..2007]*；默认值：**2007**) | 关联客户端的最大数量。WDS 链路也计入该限制。 |
| **mode** (*station \| station-wds \| ap-bridge \| bridge \| alignment-only \| nstreme-dual-slave \| wds-slave \| station-pseudobridge \| station-pseudobridge-clone \| station-bridge*；默认值：**station**) | 在不同的 station 和接入点（AP）模式之间进行选择。<a href="/docs/wireless/user-guides/wireless-station-modes">Station modes</a>：<br/><ul><li><em>station</em> - 基本 station 模式。查找并连接到可接受的 AP。</li><li><em>station-wds</em> - 与 <em>station</em> 相同，但使用专有扩展与 AP 建立 WDS 链路。AP 配置必须允许与该设备建立 WDS 链路。请注意，该模式不使用 wds 中的条目。</li><li><em>station-pseudobridge</em> - 与 <em>station</em> 相同，但还会对所有流量执行 MAC 地址转换。允许将接口加入网桥。</li><li><em>station-pseudobridge-clone</em> - 与 <em>station-pseudobridge</em> 相同，但使用 <strong>station-bridge-clone-mac</strong> 地址连接到 AP。</li><li>station-bridge - 在 station 设备上提供对透明、协议无关的 L2 桥接支持。当通过 bridge-mode 参数启用时，RouterOS AP 接受处于 station-bridge 模式的客户端。在该模式下，AP 维护一个转发表，记录哪些 MAC 地址可通过哪个 station 设备到达。仅适用于 RouterOS AP。使用 station-bridge 模式时，无法连接到 CAPsMAN 控制的 CAP。</li></ul><br/>🛈 <strong>重要：</strong><code>wireless</code> station-bridge 模式与运行较新 <code>wifi</code> 软件包的 AP 不兼容，反之亦然。<br/><br/>AP 模式：<br/><ul><li><em>ap-bridge</em> - 基本接入点模式。</li><li><em>bridge</em> - 与 <em>ap-bridge</em> 相同，但仅限一个关联客户端。</li><li><em>wds-slave</em> - 与 <em>ap-bridge</em> 相同，但会扫描具有相同 <strong>ssid</strong> 的 AP 并建立 WDS 链路。如果该链路丢失或无法建立，则继续扫描。如果 <strong>dfs-mode</strong> 为 <em>radar-detect</em>，则扫描期间不会找到启用了 <strong>hide-ssid</strong> 的 AP。</li></ul>特殊模式：<br/><ul><li><em>alignment-only</em> - 使接口进入连续发送模式，用于对准远端天线。</li><li><em>nstreme-dual-slave</em> - 允许该接口用于 nstreme-dual 配置。</li></ul>pseudobridge 模式下的 MAC 地址转换通过检查数据包并构建对应 IP 和 MAC 地址表来工作。所有数据包都使用 pseudobridge 的 MAC 地址发送到 AP，接收到的数据包的 MAC 地址会从地址转换表中恢复。对于所有非 IP 数据包，地址转换表中只有一个条目，因此桥接网络中的多个主机无法可靠使用非 IP 协议。<strong>注意：</strong>IPv6 无法通过 pseudobridge 工作。<br/> |
| **mtu** (*integer [0..65536]*；默认值：**1500**) |  |
| **multicast-buffering** (*disabled \| enabled*；默认值：**enabled**) | 对于启用了省电功能的客户端，将组播数据包缓冲到下一个信标时间。客户端应唤醒以接收信标，通过接收信标可看到有待发送的组播数据包，然后等待组播数据包发送。 |
| **multicast-helper** (*default \| disabled \| full*；默认值：**default**) | 设置为 <strong>full</strong> 时，组播数据包将以单播目标 MAC 地址发送，从而解决无线链路上的组播问题。该选项应仅在接入点上启用，客户端应配置为 <strong>station-bridge</strong> 模式。<ul><li>disabled - 禁用 helper，并以组播目标 MAC 地址发送组播数据包</li><li>dhcp - 在发送前将 dhcp 数据包的 MAC 地址更改为单播 MAC 地址</li><li>full - 在发送前将所有组播数据包的 MAC 地址更改为单播 MAC 地址</li><li>default - 当前设置为 <em>dhcp</em> 的默认选项。该值可能在未来版本中更改。</li></ul> |
| **name** (*string*；默认值：) | 接口名称。 |
| **noise-floor-threshold** (*default \| integer [-128..127]*；默认值：**default**) | 仅用于高级用途，因为它可能严重影响接口性能。可以手动设置噪声底阈值。默认情况下，该值会动态计算。该属性还会影响接收信号强度。该属性仅对非 AC 芯片有效。 |
| **nv2-cell-radius** (*integer [10..200]*；默认值：**30**) | 该设置影响 AP 为客户端发起连接分配的竞争时隙大小，以及用于估算到客户端距离的时间片大小。当设置过小时，较远的客户端可能无法连接，和/或因“ranging timeout”错误而断开。虽然在正常运行期间该设置的影响应可忽略，但为保持最大性能，建议不要在必要时增大该设置，以免 AP 预留实际从未使用的时间，而应将其分配给实际数据传输。<ul><li>在 AP 上：到最远客户端的距离，单位为 km</li><li>在 station 上：无影响</li></ul> |
| **nv2-noise-floor-offset** (*default \| integer [0..20]*；默认值：**default**) |  |
| **nv2-preshared-key** (*string*；默认值：) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* |  |
| **nv2-qos** (*default \| frame-priority*；默认值：**default**) | 设置数据包优先级机制，首先发送高优先级队列中的数据，然后发送较低队列优先级的数据，直到达到 0 队列优先级。当链路被高优先级队列数据占满时，不会发送较低优先级数据。请谨慎使用，该设置作用于 AP。<ul><li><strong>frame-priority</strong> - 可通过 Mangle 规则调整的手动设置。</li><li><strong>default</strong> - 默认设置，小数据包获得优先级以获得最佳延迟</li></ul> |
| **nv2-queue-count** (*integer [2..8]*；默认值：**2**) |  |
| **nv2-security** (*disabled \| enabled*；默认值：**disabled**) |  |
| **on-fail-retry-time** (*time [100ms..1s]*；默认值：**100ms**) | 在最低数据速率下第三次发送失败后，等待指定的时间间隔再重试。 |
| **periodic-calibration** (*default \| disabled \| enabled*；默认值：**default**) | 设置 *default* 时，如果 [info](/docs/wireless/abgn/wireless-interface#info) 的 **default-periodic-calibration** 属性为 *enabled*，则启用周期性校准。该属性的值取决于无线网卡类型。该属性仅对基于 Atheros 芯片组的网卡有效。 |
| **periodic-calibration-interval** (*integer [1..10000]*；默认值：**60**) | 该属性仅对基于 Atheros 芯片组的网卡有效。 |
| **preamble-mode** (*both \| long \| short*；默认值：**both**) | 短前导码模式是 802.11b 标准的一项选项，可减少每帧开销。<ul><li>在 AP 上：<ul><li><em>long</em> - 不使用短前导码。</li><li><em>short</em> - 通告短前导码能力。不接受不具备该能力的客户端连接。</li><li><em>both</em> - 通告短前导码能力。</li></ul></li><li>在 station 上：<ul><li><em>long</em> - 不使用短前导码。</li><li><em>short</em> - 如果 AP 不支持短前导码，则不连接。</li><li><em>both</em> - 如果 AP 支持短前导码，则使用短前导码。</li></ul></li></ul> |
| **prism-cardtype** (*100mW \| 200mW \| 30mW*；默认值：) | 指定已安装 Prism 无线网卡的类型。 |
| **proprietary-extensions** (*post-2.9.25 \| pre-2.9.25*；默认值：**post-2.9.25**) | RouterOS 会在管理帧的信息元素中包含专有信息。该参数控制如何包含这些信息。<ul><li><em>pre-2.9.25</em> - 这是较旧的方法。它可以与较新版本的 RouterOS 互操作。该方法与某些客户端不兼容，例如基于 Centrino 的客户端。</li><li><em>post-2.9.25</em> - 使用标准化方式包含厂商特定信息，兼容较新的无线客户端。</li></ul> |
| **radio-name** (*string*；默认值：**MAC address of an interface**) | 设备的描述性名称，显示在远端设备的 registration table 条目中。这是专有扩展。 |
| **rate-selection** (*advanced \| legacy*；默认值：**advanced**) | 默认值为 **advanced**；**legacy** 模式效率较低，仅为向后兼容而保留。 |
| **rate-set** (*configured \| default*；默认值：**default**) | 有两个选项：<ul><li><em>default</em> - 使用默认的基本速率和支持速率集合。<strong>basic-rates</strong> 和 <strong>supported-rates</strong> 参数的值无效。</li><li><em>configured</em> - 使用 <strong>basic-rates</strong>、<strong>supported-rates</strong>、<strong>basic-mcs</strong>、<strong>mcs</strong> 中的值。<a href="/docs/wireless/abgn/wireless-interface#basic-and-mcs-rate-table">Basic and MCS rate table</a>。</li></ul> |
| **rx-chains** (*list of integer [0..3]*；默认值：**0**) | 用于接收的天线。在当前 MikroTik 路由器中，要启用某条链路，必须同时启用 RX 和 TX 链路。 |
| scan-list <br/>(<em>Comma separated list of frequencies and frequency ranges &#124; default. The type also supports the range:step option</em>；默认值：<strong>default</strong>) | <em>default</em> 值是所选频段中网卡支持且 <strong>country</strong> 和 <strong>frequency-mode</strong> 设置允许的所有信道（此列表可在 <a href="/docs/wireless/abgn/wireless-interface#info">info</a> 中查看）。对于默认扫描列表，<em>5ghz</em> 频段中的信道以 20MHz 步长获取，<em>5ghz-turbo</em> 频段以 40MHz 步长获取，所有其他频段以 5MHz 步长获取。如果手动指定 <strong>scan-list</strong>，则获取所有匹配的信道。（示例：<strong>scan-list</strong>=<em>default,5200-5245,2412-2427</em> - 这将使用当前频段 scan list 的默认值，并添加 5200-5245 或 2412-2427 范围内受支持的频率。）在 WinBox 或 Webfig 中，将每个频率或频率范围作为单独的 scan-list 条目输入；那里不支持逗号分隔列表。<br/>scan-list 还支持步长，可手动指定扫描步长。示例：<strong>scan-list</strong>=<em>5500-5600:20</em> 将生成如下 scan-list 值 <em>5500,5520,5540,5560,5580,5600</em> |
| **security-profile** (*string*；默认值：**default**) | 来自 [security profiles](/docs/wireless/abgn/wireless-interface#security-profiles) 的配置文件名称。 |
| **secondary-channel** (*integer*；默认值：**""**) | 指定辅助信道，启用 80+80MHz 传输时需要该信道。要禁用 80+80MHz 功能，请将 secondary-channel 设置为 "" 或通过 CLI/GUI 取消该值。 |
| **ssid** (*string (0..32 chars)*；默认值：**value of [/system/identity](/docs/system-information-and-utilities/identity)**) | SSID（service set identifier）是标识无线网络的名称。 |
| **skip-dfs-channels** (*string \| 10min-cac \| all \| disabled*；默认值：**disabled**) | 这些值用于跳过所有 DFS 信道，或专门跳过 5600-5650MHz 范围内的 DFS CAC 信道，该范围内的检测可能长达 10 分钟。 |
| **station-bridge-clone-mac** (*MAC*；默认值：) | 该属性仅在 <em>station-pseudobridge-clone</em> 模式下生效。连接到 AP 时使用此 MAC 地址。如果该值为 <em>00:00:00:00:00:00</em>，station 最初将使用无线接口的 MAC 地址。<br/>一旦需要发送具有另一设备 MAC 地址的数据包，station 将使用该地址重新连接到 AP。 |
| **station-roaming** (*disabled \| enabled*；默认值：**disabled**) | Station Roaming 功能仅适用于 802.11 无线协议，并且仅适用于 station 模式。[Station Roaming](/docs/wireless/abgn/wireless-interface#station-roaming) |
| **supported-rates-a/g** (*list of rates [12Mbps \| 18Mbps \| 24Mbps \| 36Mbps \| 48Mbps \| 54Mbps \| 6Mbps \| 9Mbps]*；默认值：**6Mbps; 9Mbps; 12Mbps; 18Mbps; 24Mbps; 36Mbps; 48Mbps; 54Mbps**) | 支持速率列表，用于除 *2ghz-b* 之外的所有频段。 |
| **supported-rates-b** (*list of rates [11Mbps \| 1Mbps \| 2Mbps \| 5.5Mbps]*；默认值：**1Mbps; 2Mbps; 5.5Mbps; 11Mbps**) | 支持速率列表，用于 *2ghz-b*、*2ghz-b/g* 和 *2ghz-b/g/n* 频段。两台设备仅使用双方都支持的速率通信。该属性仅在 **rate-set** 的值为 *configured* 时生效。 |
| **tdma-period-size** (*integer [1..10]*；默认值：**2**) | 指定 TDMA 周期，单位为毫秒。这有助于较长距离的链路，可略微提高带宽，但也会增加延迟。 |
| **tx-chains** (*list of integer [0..3]*；默认值：**0**) | 用于发送的天线。在当前 MikroTik 路由器中，要启用某条链路，必须同时启用 RX 和 TX 链路。 |
| **tx-power** (*integer [-30..40]*；默认值：) | 对于 802.11ac 无线接口，这是总功率；对于 802.11a/b/g/n，这是每条链路的功率。 |
| **tx-power-mode** (*default, card-rates, all-rates-fixed, manual-table*；默认值：**default**) | 设置无线网卡的 tx-power 模式<ul><li>default - 使用网卡中存储的值</li><li>all-rates-fixed - 对所有数据速率使用相同的发射功率。如果发射功率设置为高于网卡在该速率下的额定值，可能会损坏网卡。</li><li>manual-table - 分别定义每个速率的发射功率。如果发射功率设置为高于网卡在该速率下的额定值，可能会损坏网卡。</li><li>card-rates - 根据 <strong>tx-power</strong> 参数的值为每个速率计算发射功率。该旧模式仅兼容目前已停产的产品。</li></ul> |
| **update-stats-interval** (；默认值：) | 向客户端请求更新信号强度和 ccq 值的频率。访问 <a href="/docs/wireless/abgn/wireless-interface#registration-table">registration-table</a> 也会触发这些值的更新。<br/>这是专有扩展。 |
| **vht-basic-mcs** (*none \| MCS 0-7 \| MCS 0-8 \| MCS 0-9*；默认值：**MCS 0-7**) | 每个连接的客户端都必须支持的[调制与编码方案](https://en.wikipedia.org/wiki/IEEE_802.11ac#Data_rates_and_speed)。有关 MCS 规范，请参阅 802.11ac。可以为每个 Spatial Stream 设置 MCS 间隔。<br/><ul><li><em>none</em> - 不使用所选 Spatial Stream</li><li><em>MCS 0-7</em> - 客户端必须支持 MCS-0 至 MCS-7</li><li><em>MCS 0-8</em> - 客户端必须支持 MCS-0 至 MCS-8</li><li><em>MCS 0-9</em> - 客户端必须支持 MCS-0 至 MCS-9</li></ul> |
| **vht-supported-mcs** (*none \| MCS 0-7 \| MCS 0-8 \| MCS 0-9*；默认值：**MCS 0-9**) | 该设备通告为支持的[调制与编码方案](https://en.wikipedia.org/wiki/IEEE_802.11ac#Data_rates_and_speed)。有关 MCS 规范，请参阅 802.11ac。可以为每个 Spatial Stream 设置 MCS 间隔。<br/><ul><li><em>none</em> - 不使用所选 Spatial Stream</li><li><em>MCS 0-7</em> - 设备将通告支持 MCS-0 至 MCS-7</li><li><em>MCS 0-8</em> - 设备将通告支持 MCS-0 至 MCS-8</li><li><em>MCS 0-9</em> - 设备将通告支持 MCS-0 至 MCS-9</li></ul> |
| **wds-cost-range** (*start [-end] integer[1..200000000]*；默认值：**50-150**) | WDS 链路的网桥端口成本会根据测得的链路吞吐量自动调整。如果端口成本变化超过 10%，或距上次调整已超过 20 秒，则每 5 秒重新计算并调整一次。将该属性设置为 <em>0</em> 会禁用自动成本调整。<br/>自动调整不适用于手动配置为网桥端口的 WDS 链路。 |
| **wds-default-bridge** (*string \| none*；默认值：**none**) | 当 WDS 链路建立且 wds 接口状态变为 *running* 时，会将其作为网桥端口添加到该属性指定的 bridge 接口。当 WDS 链路丢失时，wds 接口会从网桥中移除。如果 WDS 链路变为活动状态时 wds 接口已包含在网桥配置中，则不会将其添加到由 指定的网桥，并且将（需要编辑） |
| **wds-default-cost** (*integer [1..200000000]*；默认值：**100**) | WDS 链路的初始网桥端口成本。 |
| **wds-ignore-ssid** (*yes \| no*；默认值：**no**) | 默认情况下，两个 AP 之间的 WDS 链路只有在工作于相同频率且具有相同 SSID 值时才能创建。如果该属性设置为 *yes*，则不会检查远端 AP 的 SSID。该属性对来自 *station-wds* 模式客户端的连接无效。如果 **wds-mode** 为 *static-mesh* 或 *dynamic-mesh*，该属性也不起作用。 |
| **wds-mode** (*disabled \| dynamic \| dynamic-mesh \| static \| static-mesh*；默认值：**disabled**) | 控制与其他设备（AP 和处于 <em>station-wds</em> 模式的客户端）建立 WDS 链路的方式。<ul><li><em>disabled</em> 不允许 WDS 链路。</li><li><em>static</em> 仅允许在 WDS 中手动配置的 WDS 链路。</li><li><em>dynamic</em> 还允许与未在 WDS 中配置的设备建立 WDS 链路，方法是动态创建所需条目。此类动态 WDS 条目会在与另一 AP 的连接丢失后自动删除。</li></ul>-mesh 模式使用不同的（更好的）方法在 AP 之间建立链路，该方法与非 mesh 模式下的 AP 不兼容。该方法可避免仅由两个 AP 之一创建的单向 WDS 链路。此类链路无法传输任何数据。当 AP 或 station 正在与另一 AP 建立 WDS 连接时，它使用 connect-list 检查是否允许该连接。如果处于 station-wds 模式的 station 正在与 AP 建立连接，AP 使用 access-list 检查是否允许该连接。如果模式为 station-wds，则该属性无效。 |
| **wireless-protocol** (*802.11 \| any \| nstreme \| nv2 \| nv2-nstreme \| nv2-nstreme-802.11 \| unspecified*；默认值：**any**) | 指定无线接口使用的协议；<ul><li><em>unspecified</em> - 早期 RouterOS 版本（v3.x、v4.x）中使用的协议模式。Nstreme 由旧的 enable-nstreme 设置启用，无法进行 Nv2 配置。</li><li><em>any</em>：在 AP 上 - 普通 802.11 Access Point 或 Nstreme Access Point；在 station 上 - 选择没有特定序列的 Access Point，可通过 connect-list 规则更改。</li><li><em>nstreme</em> - 启用 Nstreme 协议（与旧的 enable-nstreme 设置相同）。</li><li><em>nv2</em> - 启用 Nv2 协议。</li><li><em>nv2 nstreme</em>：在 AP 上 - 使用第一个 wireless-protocol 设置，始终为 Nv2；在 station 上 - 先搜索 Nv2 Access Point，再搜索 Nstreme Access Point。</li><li><em>nv2 nstreme 802.11</em> - 在 AP 上 - 使用第一个 wireless-protocol 设置，始终为 Nv2；在 station 上 - 先搜索 Nv2 Access Point，再搜索 Nstreme Access Point，然后搜索普通 802.11 Access Point。</li></ul>⚠️ <strong>警告：</strong>Nv2 不支持 Virtual AP |
| **wmm-support** (*disabled \| enabled \| required*；默认值：**disabled**) | 指定是否启用 [WMM](/docs/bridging-and-switching/user-guides/wmm-and-vlan-priority)。仅适用于 B 和 G 频段。其他频段无论该设置如何都会启用 WMM。 |
| **wps-mode** (*disabled \| push-button \| push-button-virtual-only*；默认值：**depending on the device model**) | [WPS Server](/docs/wireless/abgn/wireless-interface#wps-server) |

### 重置物理接口 MAC 地址 {#reset-physical-interface-mac-address}

可以使用命令 `reset-mac-address` 将物理接口 MAC 地址重置为默认值。

```ros
/interface/wireless/reset-mac-address wlan1
```

### 发射功率表示 {#transmit-power-representation}

802.11n 无线芯片组按每条链路表示功率。802.11ac 无线芯片组表示总功率。

| 无线芯片组 | 启用的链路 | 每条链路功率 | 总功率 |
| :-- | --: | :-- | :-- |
| 802.11n | 1 | 等于所选 Tx Power | 等于所选 Tx Power |
| 802.11n | 2 | 等于所选 Tx Power | +3dBm |
| 802.11n | 3 | 等于所选 Tx Power | +5dBm |
| 802.11ac | 1 | 等于所选 Tx Power | 等于所选 Tx Power |
| 802.11ac | 2 | -3dBm | 等于所选 Tx Power |
| 802.11ac | 3 | -5dBm | 等于所选 Tx Power |
| 802.11ac | 4 | -6dBm | 等于所选 Tx Power |

### 基本速率和 MCS 速率表 {#basic-and-mcs-rate-table}

根据所选频段列出的默认基本速率和支持速率

| band | basic rates | basic-HT-mcs | basic-VHT-mcs | VHT-mcs | HT-mcs | supported rates |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| 2.4ghz-b | 1 | - | - | - | - | 1-11 |
| 2.4ghz-onlyg | 6 | - | - | - | - | 1-11,6-54 |
| 2.4ghz-onlyn | 6 | 0-7 | - | - | 0-23 | 1-11,6-54 |
| 2.4ghz-b/g | 1-11 | - | - | - | - | 1-11,6-54 |
| 2.4ghz-b/g/n | 1-11 | none | - | - | 0-23 | 1-11,6-54 |
| 2.4ghz-g/n | 6 | none | - | - | 0-23 | 6-54 |
| 2.4ghz-g-turbo | 6 | - | - | - | - | 6-54 |
| 5ghz-a | 6 | - | - | - | - | 6-54 |
| 5ghz-a/n | 6 | none | - | - | 0-23 | 6-54 |
| 5ghz-onlyn | 6 | 0-7 | - | - | 0-23 | 6-54 |
| 5ghz-a/n/ac | 6 | none | none | 0-9 | 0-23 | 6-54 |
| 5ghz-onlyac | 6 | none | 0-7 | 0-9 | 0-23 | 6-54 |

**rate-set=configured** 时使用的设置

| band | 使用的设置 |
| :-- | :-- |
| 2.4ghz-b | basic-b, supported-b |
| 2.4ghz-b/g, 2.4ghz-onlyg | basic-b, supported-b, basic-a/g, supported-a/g |
| 2.4ghz-onlyn, 2.4ghz-b/g/n | basic-b, supported-b, basic-a/g, supported-a/g, ht-basic-mcs, ht-supported-mcs |
| 2.4ghz-g/n | basic-a/g,supported-a/g,ht-basic-mcs,ht-supported-mcs |
| 5ghz-a | basic-a/g,supported-a/g |
| 5ghz-a/n, 5ghz-onlyn | basic-a/g,supported-a/g,ht-basic-mcs,ht-supported-mcs |
| 5ghz-a/n/ac, 5ghz-onlyac | basic-a/g,supported-a/g,ht-basic-mcs,ht-supported-mcs,vht-basic-mcs,vht-supported-mcs |

与 **rate-set** 无关的设置：

1. 允许的 MCS 取决于链数：
   - 1 条链：0-7
   - 2 条链：0-15
   - 3 条链：0-23
2. 如果未使用标准信道宽度（20MHz），则 2GHz 模式（2.4GHz-b 除外）不使用 b 速率（1-11）

### 帧保护支持（RTS/CTS） {#frame-protection-support-rtscts}

802.11 标准提供了通过使用 RTS/CTS 协议保护传输免受其他设备传输干扰的方法。帧保护有助于解决“隐藏节点”问题。保护类型包括以下几种：

- 基于 RTS/CTS 的保护 - 要发送帧的设备首先发送 RequestToSend 帧，并等待目标设备返回 ClearToSend 帧。通过“看到”RTS 或 CTS 帧，符合 802.11 标准的设备知道有其他设备即将发送，因此不会自行发起传输。
- 基于“CTS to self”的保护 - 要发送帧的设备向“自身”发送 CTS 帧。与 RTS/CTS 协议一样，每个接收到该帧的符合 802.11 标准的设备都知道不应发送。基于“CTS to self”的保护开销较小，但必须注意，它只能保护接收到 CTS 帧的设备（例如，如果有 2 个“隐藏”站点，则它们使用“CTS to self”保护没有意义，因为它们无法接收到另一个站点发送的 CTS - 在这种情况下，站点必须使用 RTS/CTS，以便另一个站点通过看到 AP 发送的 CTS 而知道不应发送）。

保护模式由无线接口的 **hw-protection-mode** 设置控制。可能的值：**none** 表示不启用保护（默认），**rts-cts** 表示基于 RTS/CTS 的保护，**cts-to-self** 表示基于“CTS to self”的保护。

应使用保护的帧大小阈值由无线接口的 **hw-protection-threshold** 设置控制。

例如，要在 AP 上为所有帧启用基于“CTS-to-self”的帧保护，且不依赖帧大小，请使用以下命令：

```
[admin@MikroTik] /interface/wireless> set 0 hw-protection-mode=cts-to-self hw-protection-threshold=0
```

要在客户端上启用基于 RTS/CTS 的保护，请使用以下命令：

```
[admin@MikroTik] /interface/wireless> set 0 hw-protection-mode=rts-cts hw-protection-threshold=0
```

### Nv2

MikroTik 开发了一种基于 TDMA 技术（Time Division Multiple Access）的新型无线协议 - （Nstreme version 2）。请参阅 Nv2 文档：[Nv2](/docs/wireless/abgn/nv2)

TDMA 是共享介质网络中的一种信道访问方法。它通过将信号划分为不同的时隙，使多个用户共享同一频率信道。用户快速连续地依次发送，每个用户使用自己的时隙。这使多个站点能够共享同一传输介质（例如，射频信道），同时仅使用该信道容量的一部分。

Nv2 最重要的优势是：

- 速度提升。
- 在 PTM 环境中支持更多客户端连接。
- 延迟更低。
- 无距离限制。
- 长距离无性能损失。

Nv2 协议限制为 511 个客户端。

:::warning
 Nv2 不支持 Virtual AP
:::

#### Nv2 故障排除 {#nv2-troubleshooting}

使用 **tdma-period-size** 提高长距离链路的吞吐量。在每个“周期”中，Access Point 会留出一部分时间不用于数据传输（该时间等于 *round trip time*，即帧发送到客户端并从客户端返回所需的时间），以确保客户端在向 Access Point 发送自身数据包之前，能够收到来自 Access Point 的最后一帧。距离越长，未使用的时间越长。

例如，Access Point 与客户端之间的距离为 30km。帧单向发送需要 100us，因此往返时间约为 200us。**tdma-period-size** 默认值为 2ms，这意味着 10% 的时间未被使用。当 tdma-period-size 增加到 4ms 时，只有 5% 的时间未被使用。对于 60km 的无线链路，往返时间为 400us，默认 tdma-period-size 为 2ms 时未使用时间为 20%，为 4ms 时为 10%。较大的 tdma-period-size 值会增加链路延迟。

## 访问列表 {#access-list}

**子菜单：** `/interface/wireless/access-list`

接入点使用访问控制列表限制来自其他设备的允许连接，并控制连接参数。

访问控制列表规则会逐条处理，直到找到匹配规则。随后执行匹配规则中的动作。如果动作指定应接受客户端，则接受该客户端，并可能使用访问控制列表规则中指定的参数覆盖其默认连接参数。

访问控制列表规则具有以下参数：

- 客户端匹配参数：
  - address - 客户端的 MAC 地址。
  - interface - 可选接口，用于与客户端实际连接的接口进行比较。
  - time - 规则匹配的时间和日期。
  - signal-range - 规则匹配时客户端信号必须处于的范围。
  - allow-signal-out-of-range - 允许客户端信号始终或在一定时间间隔内超出范围的选项。
- 连接参数：
  - ap-tx-limit - 向客户端方向的 TX 速度限制。
  - client-tx-limit - 向 AP 方向的 TX 速度限制（仅适用于 RouterOS 客户端）。
  - private-passphrase - 使用某种 PSK 身份验证算法时，为该客户端使用的 PSK 口令。
  - vlan-mode - VLAN 标记模式，指定来自客户端的流量是否应添加标记（发往客户端时是否移除标记）。
  - vlan-id - 执行 VLAN 标记时使用的 VLAN ID。

Operation:

- 访问控制列表规则按顺序检查。
- 禁用的规则始终被忽略。
- 仅应用第一条匹配规则。
- 如果远程连接没有匹配规则，则使用无线接口配置中的默认值。
- 如果远程设备匹配到 **authentication**=*no* 值的规则，则拒绝来自该远程设备的连接。

:::warning
如果 ACL 中没有关于连接到 AP 的客户端的条目（wireless,debug wlan2: A0:0B:BA:D7:4D:B2 not in local ACL, by default accept），则在整个连接期间都会忽略该客户端的 ACL。
:::

例如，如果客户端连接时的信号为 -41，并且我们有一条 ACL 规则

```
/interface/wireless/access-list
add authentication=yes forwarding=yes interface=wlan2 signal-range=-55..0
```

然后将连接匹配到 ACL 规则，但如果信号降至 -55 以下，客户端不会被断开。

如果在无线接口上设置了 `default-authentication=yes`，即使没有匹配的 access-list 条目，客户端也可以加入。  
要正确运行，客户端必须匹配其中一条 ACL 规则。

如果我们将上一示例中的 ACL 规则修改为：

```
/interface/wireless/access-list
add interface=wlan2 signal-range=-55..0
add authentication=no forwarding=no interface=wlan2 signal-range=-120..-56
```

那么当信号降至 -56 时，客户端将被断开。

### 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **ap-tx-limit** (*integer [0..4294967295]*；默认值：**0**) | 限制向该客户端传输数据的速率。值 *0* 表示不限制。单位为比特每秒。 |
| **authentication** (*yes \| no*；默认值：**yes**) | <ul><li><em>no</em> - 客户端关联将始终失败。</li><li><em>yes</em> - 使用接口的 <a href="/docs/wireless/abgn/wireless-interface#security-profiles"><strong>security-profile</strong></a> 中指定的认证过程。</li></ul> |
| **client-tx-limit** (*integer [0..4294967295]*；默认值：**0**) | 要求客户端限制数据传输速率。值 <em>0</em> 表示不限制。这是 RouterOS 客户端支持的专有扩展。<br/>单位为比特每秒。 |
| **comment** (*string*；默认值：) | 条目的简短说明 |
| **disabled** (*yes \| no*；默认值：**no**) |  |
| **forwarding** (*yes \| no*；默认值：**yes**) | <ul><li><em>no</em> - 客户端无法向连接到同一接入点的其他站点发送帧。</li><li><em>yes</em> - 客户端可以向同一接入点上的其他站点发送帧。</li></ul> |
| **interface** (*string \| any \| all*；默认值：**any**) | **interface**=*any* 的规则用于任意无线接口，**interface**=*all* 定义 [接口列表](/docs/system-information-and-utilities/interface-lists) 中的“all”名称。要创建仅应用于一个无线接口的规则，请将该接口指定为此属性的值。 |
| **mac-address** (*MAC*；默认值：**00:00:00:00:00:00**) | 规则匹配具有指定 MAC 地址的客户端。值 *00:00:00:00:00:00* 始终匹配。 |
| **management-protection-key** (*string*；默认值：**""**) *[敏感参数](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* |  |
| **private-algo** (*104bit-wep \| 40bit-wep \| aes-ccm \| none \| tkip*；默认值：**none**) | 仅用于 WEP 模式。 |
| **private-key** (*string*；默认值：**""**) *[敏感参数](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 仅用于 WEP 模式。 |
| **private-pre-shared-key** (*string*；默认值：**""**) *[敏感参数](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 用于 WPA PSK 模式。 |
| **signal-range** (*NUM..NUM - both NUM are numbers in the range -120..120*；默认值：**-120..120**) | 如果站点的信号强度在指定范围内，则规则匹配。如果站点信号强度超出规则指定的范围，接入点将断开该站点。 |
| **time** (*TIME-TIME,sun,mon,tue,wed,thu,fri,sat - TIME is time interval 0..86400 seconds; all day names are optional; value can be unset*；默认值：) | 规则仅在指定时间内匹配。指定时间结束后，站点将被断开。开始时间和结束时间均表示为自午夜 00:00 起经过的时间。<br/>规则仅在指定的星期几内匹配。 |

## Align

**子菜单：** `/interface/wireless/align`

Align 工具用于帮助对齐运行该工具的设备。

| 属性 | 说明 |
| :-- | :-- |
| **active-mode** (*yes \| no*；默认值：**yes**) | 如果处于活动模式，将发送用于对齐的帧。 |
| **audio-max** (*integer [-2147483648..2147483647]*；默认值：**-20**) | 蜂鸣器的最大信号强度 |
| **audio-min** (*integer [-2147483648..2147483647]*；默认值：**-100**) | 蜂鸣器的最小信号强度 |
| **audio-monitor** (*MAC*；默认值：**00:00:00:00:00:00**) | 用于音频监控的 MAC 地址 |
| **filter-mac** (*MAC*；默认值：**00:00:00:00:00:00**) | 将在监控屏幕中显示的被过滤 MAC 地址。 |
| **frame-size** (*integer [200..1500]*；默认值：**300**) | 监控使用的帧大小。 |
| **frames-per-second** (*integer [1..100]*；默认值：**25**) | 帧发送间隔 |
| **receive-all** (*yes \| no*；默认值：**no**) | 如果设置为“yes”，监控将发现所有可用设备。 |
| **ssid-all** (*yes \| no*；默认值：**no**) | 是在监控中显示所有 SSID，还是仅显示无线设置中配置的一个 SSID。 |

### 菜单专用命令 {#menu-specific-commands}

| 属性 | 说明 |
| :-- | :-- |
| **monitor** (*interface name*) | 开始对齐监控 |
| **test-audio** (*integer [-2147483648..2147483647]*) | 测试蜂鸣器 |

## 连接列表 {#connect-list}

**子菜单：** `/interface/wireless/connect-list`

connect-list 用于为与远程接入点的连接分配优先级和安全设置，并限制允许的连接。connect-list 是有序规则列表。connect-list 中的每条规则都附加到特定无线接口，由该规则的 `interface` 属性指定（这不同于 [access-list](/docs/wireless/abgn/wireless-interface#access-list)，其中规则可应用于所有接口）。规则可以匹配远程接入点的 MAC 地址、信号强度和许多其他参数。

Operation:

- connect-list 规则始终按顺序检查，从第一条开始。
- 禁用的规则始终被忽略。
- 仅应用第一条匹配规则。
- 如果无线接口配置中提供了 SSID 或确切的无线协议，则忽略无线接口配置未涵盖的 Connect List SSID 或无线协议。
- 如果 connect-list 没有任何规则匹配远程接入点，则使用无线接口配置中的默认值。
- 如果接入点匹配到 **connect**=*no* 值的规则，则不会尝试与该接入点建立连接。
- 如果接入点匹配到 **connect**=*yes* 值的规则，则会尝试与该接入点建立连接。
  - 在 station 模式下，如果多个远程接入点匹配到 **connect**=*yes* 值的 connect list 规则，则会尝试连接由 connect-list 中更靠前规则匹配的接入点。
  - 如果没有远程接入点匹配到 **connect**=*yes* 值的 connect-list 规则，则 **default-authentication** 接口属性决定 station 是否尝试连接任意接入点。如果 **default-authentication**=*yes*，station 将选择信号最佳且安全设置兼容的接入点。
- 在接入点模式下，建立与远程设备的 WDS 链路之前会检查 connect-list。如果接入点未匹配 connect list 中的任何规则，则 **default-authentication** 的值决定是否建立 WDS 链路。

### 属性 {#properties-1}

| 属性 | 说明 |
| :-- | :-- |
| **3gpp** (*string*；默认值：) |  |
| **area-prefix** (*string*；默认值：) | 如果 AP 的 area 值（专有扩展）以指定值开头，则规则匹配。**area** 值是专有扩展。 |
| **comment** (*string*；默认值：) | 条目的简短描述 |
| **connect** (*yes \| no*；默认值：**yes**) | 可用选项：<ul><li><em>yes</em> - 连接到与该规则匹配的接入点。</li><li><em>no</em> - 不连接到任何与该规则匹配的接入点。</li></ul> |
| **disabled** (*yes \| no*；默认值：**no**) |  |
| **mac-address** (*MAC*；默认值：**00:00:00:00:00:00**) | 规则仅匹配具有指定 MAC 地址的 AP。值 *00:00:00:00:00:00* 始终匹配。 |
| **security-profile** (*string \| none*；默认值：**none**) | 连接到匹配的接入点时使用的[安全配置文件](/docs/wireless/abgn/wireless-interface#security-profiles)名称。如果该属性的值为 *none*，则将使用接口配置中指定的安全配置文件。在 station 模式下，规则仅匹配支持指定安全配置文件的接入点。值 *none* 将匹配支持接口配置中指定安全配置文件的接入点。在接入点模式下，该属性的值不会用于匹配远端设备。 |
| **signal-range** (*NUM..NUM - both NUM are numbers in the range -120..120*；默认值：**-120..120**) | 如果接入点的信号强度在指定范围内，则规则匹配。如果 station 与该规则匹配的接入点建立连接，当信号强度超出指定范围时，它将从该接入点断开。 |
| **ssid** (*string*；默认值：**""**) | 规则匹配具有该 SSID 的接入点。空值匹配任意 SSID。仅当 station 模式接口的 **ssid** 为空，或接入点模式接口具有 **wds-ignore-ssid**=*yes* 时，该属性才生效。 |
| **wireless-protocol** (*802.11 \| any \| nstreme \| tdma*；默认值：**any**) |  |
| **interface** (*string*；默认值：) | connect 列表中的每条规则仅适用于由该设置指定的一个无线接口。 |

### 用法 {#usage}

#### 仅限制 station 连接到特定接入点 {#restrict-station-connections-only-to-specific-access-points}

- 将 **default-authentication** 接口属性的值设置为 *no*。

```ros
/interface/wireless/set station-wlan default-authentication=no
```

- 创建匹配允许接入点的规则。这些规则必须具有 **connect**=*yes*，并且 **interface** 等于 station 无线接口的名称。

```ros
/interface/wireless/connect-list/add interface=station-wlan connect=yes mac-address=00:11:22:33:00:01
/interface/wireless/connect-list/add interface=station-wlan connect=yes mac-address=00:11:22:33:00:02
```

#### 禁止连接到特定接入点 {#disallow-connections-to-specific-access-points}

- 将 **default-authentication** 接口属性的值设置为 *yes*。

```ros
/interface/wireless/set station-wlan default-authentication=yes
```

- 创建匹配 station 不应连接的接入点的 **connect**=*no* 规则。这些规则必须具有 **connect**=*no*，并且 **interface** 等于 station 无线接口的名称。

```ros
/interface/wireless/connect-list/add interface=station-wlan connect=no mac-address=00:11:22:33:44:55
```

#### 选择首选接入点 {#select-preferred-access-points}

- 创建匹配首选接入点的规则。这些规则必须设置 **connect**=*yes*，并且 **interface** 等于 station 无线接口的名称。
- 将匹配首选接入点的规则按优先级顺序放在 connect-list 中较高的位置。

#### 限制 WDS 链路建立 {#restrict-wds-link-establishment}

- 将匹配允许接入点的规则放在顶部。
- 在 connect list 末尾添加 deny-all 规则。

## Info

**子菜单：** `/interface/wireless/info`

| Property | Description |
| :-- | :-- |
| **2ghz-10mhz-power-channels** () |  |
| **2ghz-11n-channels** () |  |
| **2ghz-5mhz-power-channels** () |  |
| **2ghz-b-channels** () |  |
| **2ghz-g-channels** () |  |
| **2ghz-g-turbo-channels** () |  |
| **5ghz-10mhz-power-channels** () |  |
| **5ghz-11n-channels** () |  |
| **5ghz-5mhz-power-channels** () |  |
| **5ghz-channels** () |  |
| **5ghz-turbo-channels** () |  |
| **allowed-channels** | 每个频段的可用信道列表 |
| **capabilities** () |  |
| **country-info**() | 接受国家名称作为参数，显示可用频段、频率以及每个频率的最大发射功率。 |
| **chip-info** () |  |
| **default-periodic-calibration** () |  |
| **firmware** () |  |
| **ht-chains** () |  |
| **interface-type** () |  |
| **name** () |  |
| **pci-info** () |  |
| **supported-bands** () |  |

## 手动 TX 功率表 {#manual-tx-power-table}

**子菜单：** `/interface/wireless/manual-tx-power-table`

| 属性 | 说明 |
| :-- | :-- |
| **comment** (*string*; Default: ) | 条目的简短说明 |
| <strong>manual-tx-powers</strong> (<em>list of [Rate:TxPower];</em> Rate ::= 11Mbps &#124; 12Mbps &#124; 18Mbps &#124; 1Mbps &#124; 24Mbps &#124; ... <br/><em>TxPower ::= integer [-30..30]</em>; Default: ) |  |
| **name** (*string*) | 将应用发射功率的无线接口名称。 |

## 无线硬件表 {#wireless-hardware-table}

:::danger
必须遵守所在国家的法规域要求。如果允许使用其他频率，请注意 Antenna Gain 和 Transmit Power 可能因板和频率而降低。设备仅针对法规频率进行校准。使用非标准频率的风险由你自行承担。该列表仅指定无线芯片接受的频率，由于产品内置天线、设备设计、滤波器和其他因素，这些频率可能并不总是可用。使用时风险完全自负
:::
可以从产品页推断支持的信道带宽。为此，需要检查以下参数：**number of chains** 和 **max data rate**。了解这些参数后，需要查看调制和编码方案（MCS）表，例如：https://mcsindex.com/。

以 hAP ac 为例，可以看到 number of chains 为 3，MCS 表中的 max data rate 为 1300。在 MCS 表中需要找到 3 个空间流（chains）对应的条目以及相应的数据速率，本例表明最大支持的信道带宽为 80MHz。

**集成无线接口频率表：**

| 板卡名称 | 无线接口 | 频率范围 [MHz] | 支持的信道带宽 [MHz] |
| :-- | --: | :-- | :-- |
| 2011UAS-2HnD | 1 | 2312-2732 | 20,40 |
| 751G-2HnD | 1 | 2200-2700 | 20,40 和高级信道支持 |
| 751U-2HnD | 1 | 2200-2700 | 20,40 和高级信道支持 |
| 911-2Hn | 1 | 2312-2732 | 20,40 |
| 911-5HacD | 1 | 4920-6100 | 20,40,80 |
| 911-5Hn | 1 | 4920-6100 | 5,10,20,40 |
| 911-5HnD | 1 | 4920-6100 | 20,40 |
| 911G-2HPnD | 1 | 2312-2732 | 20,40 |
| 911G-5HPacDr2 /-NB /-QRT | 1 | 4920-6100 | 5,10,20,40,80 |
| 911G-5HPnD /-QRT | 1 | 4920-6100 | 5,10,20,40 |
| 912UAG-2HPnD /-OUT | 1 | 2312-2732 | 20,40 |
| 912UAG-5HPnD /-OUT | 1 | 4920-6100 | 5,10,20,40 |
| 912UAG-6HPnD /-OUT | 1 | 5500-6500 | 20,40 |
| 921GS-5HPacD-15S /-19S | 1 | 4920-6100 | 5<sup>1</sup>,10<sup>1</sup>,20,40,80 |
| 22UGS-5HPacD2HnD | 2 | 4920-5925,2412-2482 | 20,40,80 和 20,40 |
| 921UAGS-5SHPacD-NM | 1 | 4920-6100 | 20,40,80 |
| 921UAGS-5SHPacT-NM | 1 | 4920-6100 | 20,40,80 |
| 922UAGS-5HPacD /-NM | 1 | 4920-6100 | 20,40,80 |
| 922UAGS-5HPacT /-NM | 1 | 4920-6100 | 20,40,80 |
| 941-2nD /-TC | 1 | 2312-2732 | 20,40 |
| 951G-2HnD | 1 | 2312-2732 | 20,40 |
| 951Ui-2HnD | 1 | 2312-2732 | 20,40 |
| 951Ui-2nD | 1 | 2312-2732 | 20,40 |
| 952Ui-5ac2nD /-TC | 2 | 2312-2732,4920-6100 | 20,40 和 20,40,80 |
| 953GS-5HnT /-RP | 1 | 4920-6100 | 5,10,20,40 |
| 962UiGS-5HacT2HnT | 2 | 2312-2732,4920-6100 | 20,40 和 20,40,80 |
| cAP2n | 1 | 2312-2732 | 20,40 |
| cAP2nD | 1 | 2312-2732 | 20,40 |
| cAPL-2nD | 1 | 2312-2732 | 20,40 |
| CRS109-8G-1S-2HnD-IN | 1 | 2312-2732 | 20,40 |
| CRS125-24G-1S-2HnD-IN | 1 | 2312-2732 | 20,40 |
| Disc-5nD | 1 | 4920-6100 | 20,40 |
| DynaDishG-5HacD | 1 | 4920-6100 | 5<sup>1</sup>,10<sup>1</sup>,20,40,80 |
| DynaDishG-6HnD | 1 | 5500-6500 | 20,40 |
| Groove52HPn | 1 | 4920-6100,2312-2732 | 5,10,20,40 和 5,10,20,40 |
| GrooveA-52HPn | 1 | 4920-6100,2312-2732 | 5,10,20,40 和 5,10,20,40 |
| GrooveG-52HPacn | 1 | 4920-6100,2312-2732 | 20,40,80 和 20,40 |
| GrooveGA-52HPacn | 1 | 4920-6100,2312-2732 | 20,40,80 和 20,40 |
| LDF-5nD | 1 | 4920-6100 | 20,40 |
| LHG-5nD | 1 | 4920-6100 | 20,40 |
| mAP2n | 1 | 2312-2732 | 20,40 |
| mAP2nD | 1 | 2312-2732 | 20,40 |
| mAPL-2nD | 1 | 2312-2732 | 20,40 |
| Metal2SHPn | 1 | 2200-2700 | 20,40 和高级信道支持 |
| Metal5SHPn | 1 | 4800-6100 | 5,10,20,40 和高级信道支持 |
| Metal9HPn | 1 | 902-928 | 5,10,20 |
| MetalG-52SHPacn | 1 | 4920-6100,2312-2732 | 20,40,80 和 20,40 |
| OmniTikG-5HacD | 1 | 4920-6100 | 20,40,80 |
| OmniTikPG-5HacD | 1 | 4920-6100 | 20,40,80 |
| OmniTIKU-5HnD | 1 | 4800-6100 | 5,10,20,40 |
| OmniTIKUPA-5HnD | 1 | 4800-6100 | 5,10,20,40 |
| QRTG-2SHPnD | 1 | 2312-2732 | 20,40 |
| SEXTANTG-5HPnD | 1 | 4920-6100 | 20,40 |
| SXT2nDr2 | 1 | 2312-2732 | 20,40 |
| SXT5HacD2n | 2 | 2312-2732,4920-6100 | 5<sup>1</sup>,10<sup>1</sup>,20,40 和 5<sup>1</sup>,10<sup>1</sup>,20,40,80 |
| SXT5HPnDr2 | 1 | 4920-6100 | 20,40 |
| SXT5nDr2 | 1 | 4920-6100 | 20,40 |
| SXTG-2HnD | 1 | 2200-2700 | 20,40 |
| SXTG-2HnDr2 | 1 | 2300-2700 | 20,40 |
| SXTG-5HPacD | 1 | 4920-6100 | 5<sup>1</sup>,10<sup>1</sup>,20,40,80 |
| SXTG-5HPacD-HG /-SA | 1 | 4920-6100 | 5<sup>1</sup>,10<sup>1</sup>,20,40,80 |
| SXTG-5HPnD-HGr2 /-SAr2 | 1 | 4920-6100 | 20,40 |
| SXTG-6HPnD | 1 | 5500-6500 | 20,40 |
| SXTsq2nD | 1 | 2312-2484 | 20,40 |
| wAP2nD /-BE | 1 | 2312-2732 | 20,40 |
| wAPG-5HacT2HnD /-BE | 2 | 2312-2732,4920-6100 | 20,40 和 20,40,80 |
| R11e-2HnD | 1 | 2312-2732 | 20,40 |
| R11e-2HPnD | 1 | 2312-2732 | 20,40 |
| R11e-5HacD | 1 | 4920-6100 | 20,40,80 |
| R11e-5HacT | 1 | 4920-6100 | 20,40,80 |
| R11e-5HnD | 1 | 4920-6100 | 20,40 |
| R2SHPn | 1 | 2200-2700 | 20,40 和高级信道支持 |
| R52H | 1 | 4920-6100,2192-2507 | 20 和 20 |
| R52HnD | 1 | 4800-6100,2200-2700 | 20,40 和 20,40 |
| R52nM | 1 | 4800-6100,2200-2700 | 20,40 和 20,40 和高级信道支持 |
| R5SHPn | 1 | 4800-6100 | 20,40 和高级信道支持 |

**Notes:**

1. 仅适用于 802.11a/n 标准。

## 高级信道 {#advanced-channels}

Advanced Channels 功能为无线接口配置提供了更多扩展能力：

- 覆盖多个频段和信道宽度的 scan-list。
- 非标准信道中心频率（以 kHz 为粒度指定），适用于支持该功能的硬件。
- 非标准信道宽度（以 kHz 为粒度指定），适用于支持该功能的硬件。

### 硬件支持 {#hardware-support}

非标准中心频率和非标准宽度信道只能用于支持这些功能的接口。

只有基于 **Atheros AR92xx** 的芯片支持以下范围内的非标准中心频率和非标准宽度：

- 中心频率范围：2200 MHz-2500 MHz，步长 0.5 MHz（500 kHz）；宽度范围：2.5 MHz-30 MHz，步长 0.5 MHz（500 kHz）。
- 中心频率范围：4800 MHz-6100 MHz，步长 0.5 MHz（500 kHz）；宽度范围：2.5 MHz-30 MHz，步长 0.5 MHz（500 kHz）。

AR93xx 不支持此功能。

## 配置高级信道 {#configuring-advanced-channels}

高级信道在 **interface wireless channels** 菜单中配置。该菜单包含用户定义信道的有序列表，可通过 **list** 属性进行分组。信道具有以下属性：

- **name** - 引用该信道时使用的名称。添加信道时如果未指定 **name**，将根据信道频率和带宽自动生成。
- **list** - 该信道所属列表的名称。列表可用于对信道进行分组。
- **frequency** - 信道中心频率，单位为 MHz，可指定小数部分，例如 **5181.5**。
- **width** - 信道带宽，单位为 MHz，可指定小数部分，例如 **14.5**。
- **band** - 定义使用该信道时的默认数据速率集合。
- **extension-channel** - 指定 11n 扩展信道的位置。

## 使用高级信道 {#using-advanced-channels}

要在无线接口配置中使用高级信道，多个接口设置接受信道名称或列表名称作为参数。可以将接口配置为使用接口不支持的信道。在这种情况下，接口将无法运行。以正确方式配置信道完全由管理员负责。

### frequency

要为无线接口使用特定高级信道（适用于使用接口 **frequency** 设置的模式），请在接口 **frequency** 设置中指定信道名称。例如，要将接口配置为使用中心频率 5500MHz 和信道带宽 14MHz 运行，请使用以下命令：

```
[admin@MikroTik] /interface/wireless> channels add name=MYCHAN frequency=5500 width=14 band=5ghz-onlyn
 list=MYLIST
[admin@MikroTik] /interface/wireless> set wlan1 frequency=MYCHAN 
```

### scan-list

接口 **scan-list** 用于多种模式，这些模式要么收集信道列表的信息（如交互式 **scan** 命令），要么选择要工作的信道（如任何 **station** 模式或执行 DFS 的 AP 模式）。接口 **scan-list** 可使用以下项目的逗号分隔列表进行配置：

- **default** - 针对指定国家、接口频段和信道带宽的默认 .11 信道列表。
- 以 MHz 为单位的数字频率范围。
- 按名称引用的高级信道。
- 按列表名称引用的高级信道列表。

例如，要将接口配置为先使用 20MHz 信道宽度扫描 5180MHz、5200MHz 和 5220MHz，再使用 10MHz 信道宽度扫描，可以执行以下命令：

```
[admin@MikroTik] /interface/wireless> channels add frequency=5180 width=20 band=5ghz-a list=20MHz-list
[admin@MikroTik] /interface/wireless> channels add frequency=5200 width=20 band=5ghz-a list=20MHz-list
[admin@MikroTik] /interface/wireless> channels add frequency=5220 width=20 band=5ghz-a list=20MHz-list
[admin@MikroTik] /interface/wireless> channels add frequency=5180 width=10 band=5ghz-a list=10MHz-list
[admin@MikroTik] /interface/wireless> channels add frequency=5200 width=10 band=5ghz-a list=10MHz-list
[admin@MikroTik] /interface/wireless> channels add frequency=5220 width=10 band=5ghz-a list=10MHz-list
[admin@MikroTik] /interface/wireless> set wlan1 scan-list=20MHz-list,10MHz-list
```

## Nstreme

**子菜单：** `/interface/wireless/nstreme`

该菜单用于将无线网卡切换到 nstreme 模式。在这种情况下，网卡将仅与 nstreme 客户端协同工作。

| 属性 | 说明 |
| :-- | :-- |
| **comment** (*string*; Default: ) | 条目的简短描述 |
| **disable-csma** (*yes \| no*; Default: **no**) | 使用轮询时禁用 CSMA/CA（性能更好） |
| **enable-nstreme** (*yes \| no*; Default: **no**) | 是否将网卡切换到 nstreme 模式 |
| **enable-polling** (*yes \| no*; Default: **yes**) | 是否为客户端使用轮询 |
| **framer-limit** (*integer [100..4000]*; Default: **3200**) | 最大帧大小 |
| **framer-policy** (*best-fit \| dynamic-size \| exact-size \| none*; Default: **none**) | 组合帧的方法。可以将多个帧组合成一个更大的帧，以减少协议开销（从而提高速度）。网卡不会等待帧，但如果多个数据包排队等待发送，则可以将它们组合。有以下几种组帧方法：<ul><li><strong>none</strong> - 不执行特殊操作，不组合数据包（禁用组帧）</li><li><strong>best-fit</strong> - 在一个帧中放入尽可能多的数据包，直到达到 framer-limit 限制，但不分片数据包</li><li><strong>exact-size</strong> - 在一个帧中放入尽可能多的数据包，直到达到 framer-limit 限制，即使需要分片（性能最佳）</li><li><strong>dynamic-size</strong> - 动态选择最佳帧大小</li></ul> |
| **name** (*string*) | 应用设置的接口名称。只读。 |

:::note
此处设置除启用 Nstreme 外，仅与接入点相关，客户端设备会忽略这些设置。客户端会自动适配 AP 设置。  
Nstreme 协议的 WDS 要求其中一端使用 station-wds 模式。AP 模式之间（bridge 和 ap-bridge）的 WDS 配置将无法工作。
:::

## Nstreme Dual

**子菜单：** `/interface/wireless/nstreme-dual`

可以将两个处于 nstreme-dual-slave 模式的无线电组合在一起，以建立 nstreme2 点对点连接。要将无线接口加入 nstreme2 组，应将其模式设置为 nstreme-dual-slave。使用 nstreme2 时，/interface/wireless 菜单中的许多参数会被忽略，以下参数除外：

- frequency-mode
- country
- antenna-gain
- tx-power
- tx-power-mode
- antenna-mode

| 属性 | 说明 |
| :-- | :-- |
| **arp** (*disabled \| enabled \| proxy-arp \| reply-only*；默认：**enabled**) | [ARP](/docs/network-management/arp) |
| **comment** (*string*；默认：) | 条目的简短说明 |
| **disable-csma** (*yes \| no*；默认：**no**) | 禁用 CSMA/CA（性能更好） |
| **disable-running-check** (*yes \| no*；默认：**no**) | 即使没有连接到远端对端，是否也始终将该接口视为正在运行 |
| **disabled** (*yes \| no*；默认：**yes**) |  |
| **framer-limit** (*integer [64..4000]*；默认：**2560**) | 最大帧大小 |
| **framer-policy** (*best-fit \| exact-size \| none*；默认：**none**) | 组合帧的方法。可以将多个帧组合成一个更大的帧，以减少协议开销（从而提高速度）。网卡不会等待帧，但如果多个数据包排队等待发送，则可以将它们组合。有以下几种组帧方法：<ul><li><strong>none</strong> - 不执行特殊操作，不组合数据包</li><li><strong>best-fit</strong> - 在一个帧中放入尽可能多的数据包，直到达到 framer-limit 限制，但不分片数据包</li><li><strong>exact-size</strong> - 在一个帧中放入尽可能多的数据包，直到达到 framer-limit 限制，即使需要分片（性能最佳）</li></ul> |
| **ht-channel-width** (*2040mhz \| 20mhz \| 40mhz*；默认：**20mhz**) |  |
| **ht-guard-interval** (*both \| long \| short*；默认：**long**) |  |
| **ht-rates** (*list of rates [1,2,3,4,5,6,7,8]*；默认：**1,2,3,4,5,6,7,8**) |  |
| **ht-streams** (*both \| double \| single*；默认：**single**) |  |
| **l2mtu** (*integer [0..65536]*；默认：) |  |
| **mtu** (*integer [0..65536]*；默认：**1500**) |  |
| **name** (*string*；默认：) | 条目名称 |
| **rates-a/g** (*list of rates [6Mbps,9Mbps, 12Mbps, 18Mbps, 24Mbps, 36Mbps, 48Mbps, 54Mbps]*；默认：**6Mbps,9Mbps,12Mbps, 18Mbps, 24Mbps, 36Mbps, 48Mbps, 54Mbps**) | 802.11a 或 802.11g 标准支持的速率 |
| **rates-b** (*list of rates [1Mbps, 2Mbps, 5.5Mbps, 11Mbps]*；默认：**1Mbps, 2Mbps, 5.5Mbps, 11Mbps**) | 802.11b 标准支持的速率 |
| **remote-mac** (*MAC*；默认：**00:00:00:00:00:00**) | 要连接的 MAC 地址（即远端接收网卡的 MAC 地址） |
| **rx-band** (*2ghz-b \| 2ghz-g \| 2ghz-n \| 5ghz-a \| 5ghz-n*；默认：) | 接收无线电的工作频段 |
| **rx-channel-width** (*20mhz \| 40mhz \| 10mhz \| 5mhz*；默认：**20mhz**) |  |
| **rx-frequency** (*integer [0..4294967295]*；默认：) | RX 网卡的工作频率，单位为 Mhz。 |
| **rx-radio** (*string*；默认：) | 用于接收的接口名称。 |
| **tx-band** (*2ghz-b \| 2ghz-g \| 2ghz-n \| 5ghz-a \| 5ghz-n*；默认：) | 发送无线电的工作频段 |
| **tx-channel-width** (*20mhz \| 40mhz \| 10mhz \| 5mhz*；默认：**20mhz**) |  |
| **tx-frequency** (*integer [0..4294967295]*；默认：) | TX 网卡的工作频率，单位为 Mhz。 |
| **tx-radio** (*string*；默认：) | 用于发送的接口名称。 |

:::warning
Nstreme-dual 链路不能使用 WDS。
:::

:::note
由于可能存在干扰，**tx-freq** 和 **rx-freq** 之间的差值应约为 200 MHz 或更大。
:::

:::note
RX 和 TX 链路可以使用不同频段。例如，使用 2ghz-g 发送数据，并使用 2ghz-b 频段接收数据。
:::

## 注册表 {#registration-table}

**子菜单：** `/interface/wireless/registration-table`

在注册表中，可以查看当前已连接客户端的各种信息。它仅用于接入点。

所有属性均为只读。

| 属性 | 说明 |
| :-- | :-- |
| **802.1x-port-enabled** (*yes \| no*) | 是否允许与对端交换数据（即，如果需要，是否已完成 802.1x 身份验证） |
| **ack-timeout** (*integer*) | ack-timeout 的当前值 |
| **ap** (*yes \| no*) | 显示已注册设备是否配置为接入点。 |
| **ap-tx-limit** (*integer*) | AP 上的发送速率限制，单位为比特每秒 |
| **authentication-type** () | 用于对端进行身份验证的方法 |
| **bridge** (*yes \| no*) |  |
| **bytes** (*integer , integer*) | 发送和接收的数据包字节数 |
| **client-tx-limit** (*integer*) | 客户端上的发送速率限制，单位为比特每秒 |
| **comment** (*string*) | 条目的说明。如果指定了相应的 [Access List](/docs/wireless/abgn/wireless-interface#access-list) 条目，则注释取自该条目。 |
| **compression** (*yes \| no*) | 是否对此对端使用数据压缩 |
| **distance** (*integer*) |  |
| **eap-identity**(*string*) | 客户端向 RADIUS 服务器进行身份验证时使用的 EAP 身份。 |
| **encryption** (*aes-ccm \| tkip*) | 使用的单播加密算法 |
| **evm-ch0** () |  |
| **evm-ch1** () |  |
| **evm-ch2** () |  |
| **frame-bytes** (*integer,integer*) | 发送和接收的数据字节数，不包括头部信息 |
| **frames** (*integer,integer*) | 需要通过无线链路发送的帧数。可将该值与 **hw-frames** 进行比较，以检查无线重传。  |
| **framing-current-size** (*integer*) | 组合帧的当前大小 |
| **framing-limit** (*integer*) | 组合帧的最大大小 |
| **framing-mode** () | 组合帧的方法 |
| **group-encryption** () | 使用的组播加密算法 |
| **hw-frame-bytes** (*integer,integer*) | 发送和接收的数据字节数，包括头部信息 |
| **hw-frames** (*integer,integer*) | 驱动通过无线链路发送的帧数。可将该值与 **frames** 进行比较，以检查无线重传。  |
| **interface** (*string*) | 无线客户端所关联的无线接口名称 |
| **last-activity** (*time*) | 接口最后一次数据发送或接收活动 |
| **last-ip** (*IP Address*) | 从已注册客户端收到的最后一个 IP 数据包中发现的 IP 地址 |
| **mac-address** (*MAC*) | 已注册客户端的 MAC 地址 |
| **management-protection** (*yes \| no*) |  |
| **nstreme** (*yes \| no*) | 显示 [Nstreme](/docs/wireless/abgn/wireless-interface#nstreme) 是否已启用 |
| **p-throughput** (*integer*) | 考虑有效发送速率和硬件重试后，预计该对端可达到的近似吞吐量。每 5 秒计算一次 |
| **packed-bytes** (*integer, integer*) | 为发送或接收而打包到较大帧中的字节数（framing） |
| **packed-frames** (*integer, integer*) | 为发送或接收而打包到较大帧中的帧数（framing） |
| **packets** (*integer,integer*) | 发送和接收的网络层数据包数量 |
| **radio-name** (*string*) | 对端的 radio 名称 |
| **routeros-version** (*string*) | 已注册客户端的 RouterOS 版本 |
| **rx-ccq** () | 接收方向的客户端连接质量（CCQ）。  |
| **rx-rate** (*integer*) | 接收数据速率 |
| **signal-strength** (*integer*) | AP 接收到的客户端信号平均强度 |
| **signal-strength-ch0** () |  |
| **signal-strength-ch1** () |  |
| **signal-strength-ch2** () |  |
| **signal-to-noise** () |  |
| **strength-at-rates** () | 不同速率下的信号强度级别，以及这些速率的使用时间 |
| **tdma-retx** () |  |
| **tdma-rx-size** () |  |
| **tdma-timing-offset** () | tdma-timing-offset 与 **distance** 成正比，约为传播延迟的两倍。AP 会测量该值，以便告知客户端发送时应使用的偏移；客户端随后从目标发送时间中减去该偏移，从而计入传播延迟，并使发送在预期时间到达 AP。对于近距离客户端，有时可能会看到较小的负值（例如几微秒），这是因为发送端或接收端硬件中可能存在未计入的额外延迟，且该延迟因芯片组而异。 |
| **tdma-tx-size** (*integer*) | 以字节为单位的数值，指定设备发送的可检测丢失的数据单元大小（计算 CRC 的数据单元）。通常，值越大越好，因为开销更小。另一方面，该设置值较小并不总能说明连接质量较差——如果设备没有足够的待发送数据来使用更大的数据单元（例如，你只是通过链路执行 ping 操作），该值就不会升高。 |
| **tdma-windfull** () |  |
| **tx-ccq** () | 发送方向的客户端连接质量（CCQ）。  |
| **tx-evm-ch0** () |  |
| **tx-evm-ch1** () |  |
| **tx-evm-ch2** () |  |
| **tx-frames-timed-out** () |  |
| **tx-rate** () |  |
| **tx-signal-strength** () |  |
| **tx-signal-strength-ch0** () |  |
| **tx-signal-strength-ch1** () |  |
| **tx-signal-strength-ch2** () |  |
| **uptime** (*time*) | 客户端与接入点关联的时间 |
| **wds** (*yes \| no*) | 连接的客户端是否使用 wds |
| **wmm-enabled** (*yes \| no*) | 显示 [WMM](/docs/bridging-and-switching/user-guides/wmm-and-vlan-priority) 是否已启用。 |

## 安全配置文件 {#security-profiles}

**子菜单：** `/interface/wireless/security-profiles`

安全配置文件在控制台的 **/interface/wireless/security-profiles** 路径下配置，或在 WinBox 中“Wireless”窗口的“Security Profiles”选项卡中配置。安全配置文件由 Wireless 接口的 [security-profile](/docs/wireless/abgn/wireless-interface#general-interface-properties) 属性和 Connect Lists 的 [security-profile](/docs/wireless/abgn/wireless-interface#general-interface-properties) 属性引用。

### 基本属性 {#basic-properties}

| 属性 | 说明 |
| :-- | :-- |
| **mode** (*none \| static-keys-optional \| static-keys-required \| dynamic-keys*；默认值：**none**) | 安全配置文件的加密模式。<ul><li>none - 不使用加密。不接受加密帧。</li><li>static-keys-required - WEP 模式。不接受也不发送未加密帧。处于 <em>static-keys-required</em> 模式的站点不会连接到处于 <em>static-keys-optional</em> 模式的接入点。</li><li>static-keys-optional - WEP 模式。支持加密和解密，但也允许接收和发送未加密帧。如果加密算法指定为 <em>none</em>，设备将发送未加密帧。处于 <em>static-keys-optional</em> 模式的站点不会连接到处于 <em>static-keys-required</em> 模式的接入点。另请参阅：<a href="/docs/wireless/abgn/wireless-interface#properties">static-sta-private-algo</a>、<a href="/docs/wireless/abgn/wireless-interface#properties">static-transmit-key</a>。</li><li>dynamic-keys - WPA 模式。</li></ul> |
| **name** (*text*；默认值：) | 安全配置文件的名称 |

### WPA 属性 {#wpa-properties}

这些属性仅在 **mode** 设置为 *dynamic-keys* 时生效。

| 属性 | 说明 |
| :-- | :-- |
| **authentication-types** (*wpa-psk \| wpa2-psk \| wpa-eap \| wpa2-eap*；默认值：) | 支持的认证类型集合，可以选择多个值。Access Point 将通告支持的认证类型，客户端只有在支持任一通告的认证类型时才会连接到 Access Point。 |
| **disable-pmkid** (*no \| yes*；默认值：**no**) | 是否将 PMKID 包含到 Access Point 发出的 EAPOL 帧中。禁用 PMKID 可能导致使用 PMKID 连接 Access Point 的设备出现兼容性问题。<ul><li>yes - 从 EAPOL 帧中移除 PMKID（提高安全性，降低兼容性）。</li><li>no - 将 PMKID 包含到 EAPOL 帧中（降低安全性，提高兼容性）。</li></ul>该属性仅对 Access Point 生效。 |
| **unicast-ciphers** (*tkip \| aes-ccm*；默认值：**aes-ccm**) | Access Point 通告其支持指定的加密套件，可以选择多个值。客户端仅尝试连接到支持至少一个指定加密套件的 Access Point。其中一个加密套件将用于加密 Access Point 和 Station 之间发送的单播帧。 |
| **group-ciphers** (*tkip \| aes-ccm*；默认值：**aes-ccm**) | Access Point 通告其中一个加密套件，可以选择多个值。Access Point 使用它加密所有广播和多播帧。客户端仅尝试连接到使用指定组加密套件之一的 Access Point。<ul><li>tkip - Temporal Key Integrity Protocol，一种加密协议，兼容传统 WEP 设备，但经过增强以修正 WEP 的部分缺陷。</li><li>aes-ccm - 更安全的 WPA 加密协议，基于可靠的 AES（Advanced Encryption Standard）。不含 WEP 传统设备的网络应仅使用该加密套件。</li></ul> |
| **group-key-update** (*time: 30s..1d*；默认值：**5m**) | 控制 Access Point 更新组密钥的频率。该密钥用于加密所有广播和多播帧。该属性仅对 Access Point 生效。 |
| **wpa-pre-shared-key** (*text*；默认值：) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | WPA 预共享密钥模式要求 BSS 中的所有设备具有相同的密钥。该密钥的值可以是任意文本。通常称为 WPA 模式的网络密码。该属性仅在 *wpa-psk* 添加到 **authentication-types** 时生效。 |
| **wpa2-pre-shared-key** (*text*；默认值：) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | WPA2 预共享密钥模式要求 BSS 中的所有设备具有相同的密钥。该密钥的值可以是任意文本。通常称为 WPA2 模式的网络密码。该属性仅在 *wpa2-psk* 添加到 **authentication-types** 时生效。 |

:::note
 RouterOS 还允许使用 [private-pre-shared-key](/docs/wireless/abgn/wireless-interface#access-list) 属性，或 RADIUS MAC 认证响应中的 [Mikrotik-Wireless-Psk](/docs/wireless/abgn/wireless-interface#radius-mac-authentication) 属性，为特定客户端覆盖预共享密钥值。这是一项扩展功能。
:::

#### WPA EAP 属性 {#wpa-eap-properties}

这些属性仅在 **authentication-types** 包含 *wpa-eap* 或 *wpa2-eap*，且 **mode** 设置为 *dynamic-keys* 时生效。

| 属性 | 说明 |
| :-- | :-- |
| **eap-methods** (*eap-tls \| eap-ttls-mschapv2 \| passthrough \| peap*；默认值：**passthrough**) | 允许的认证方法类型，可以选择多个值。该属性仅对 Access Point 生效。<ul><li>eap-tls - 使用内置 EAP TLS 认证。支持客户端和服务器证书。请参阅 <strong>tls-mode</strong> 和 <strong>tls-certificate</strong> 属性的说明。</li><li>eap-ttls-mschapv2 - 使用带 MS-CHAPv2 认证的 EAP-TTLS。</li><li>passthrough - Access Point 将认证过程转发到 RADIUS 服务器。</li><li>peap - 使用 Protected EAP 认证。</li></ul> |
| **supplicant-identity** (*text*；默认值：**[Identity](/docs/system-information-and-utilities/identity)**) | 客户端在 EAP 认证开始时发送的 EAP 身份。该值用作 RADIUS EAP 计费和 RADIUS EAP 透传认证发送的 RADIUS 消息中 User-Name 属性的值。 |
| **mschapv2-username** (*text*；默认值：) | 使用 *eap-ttls-mschapv2* 或 *peap* 认证方法时用于认证的用户名。该属性仅对 Station 生效。 |
| **mschapv2-password** (*text*；默认值：) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 使用 *eap-ttls-mschapv2* 或 *peap* 认证方法时用于认证的密码。该属性仅对 Station 生效。 |
| **tls-mode** (*verify-certificate \| dont-verify-certificate \| no-certificates \| verify-certificate-with-crl*；默认值：**no-certificates**) | 该属性仅在 <strong>eap-methods</strong> 包含 <em>eap-tls</em> 时生效。<ul><li>verify-certificate - 要求远端设备具有有效证书。检查该证书是否由已知证书颁发机构签名。不执行额外的身份验证。证书可能包含有关其有效期的信息。如果路由器时间和日期不正确，可能因路由器时钟不在该时间段内而拒绝有效证书。另请参阅 <a href="/docs/authentication-authorization-accounting/certificates">Certificates</a> 配置。</li><li>dont-verify-certificate - 不检查远端设备的证书。Access Point 不要求客户端提供证书。</li><li>no-certificates - 不使用证书。TLS 会话通过 2048 位匿名 Diffie-Hellman 密钥交换建立。</li><li>verify-certificate-with-crl - 与 <em>verify-certificate</em> 相同，但还会通过检查 Certificate Revocation List 来验证证书是否有效。</li></ul> |
| **tls-certificate** (*none \| name*；默认值：**none**) | 当设备配置为 Access Point 且 **tls-mode** 设置为 *verify-certificate* 或 *dont-verify-certificate* 时，Access Point 始终需要证书。仅当 Access Point 配置为 **tls-mode** 设置为 *verify-certificate* 时，客户端才需要证书。在这种情况下，客户端需要由 Access Point 已知 CA 签名的有效证书。该属性仅在 **tls-mode** 未设置为 *no-certificates* 且 **eap-methods** 包含 *eap-tls* 时生效。 |

:::note
`eap-methods` 中允许的认证方法顺序很重要，发送认证方法提议给 Station 时将使用相同顺序。示例：Access Point 使用安全配置文件，其中 **eap-methods** 设置为 *eap-tls*、*passthrough*；1）Access Point 向客户端提供 EAP-TLS 方法；2）客户端拒绝；3）Access Point 开始将 EAP 通信转发到 RADIUS 服务器。
:::
:::note
 当 AP 用于 passthrough 时，AP 本身不需要证书，AP 设备作为透明网桥工作，并将来自 RADIUS 服务器的 EAP-TLS 关联数据转发到终端客户端。
:::
:::note
 当 `tls-mode` 使用 `verify-certificate` 或 `dont-verify-certificate` 时，远端设备必须支持 *RC4-MD5*、*RC4-SHA* 或 *DES-CBC3-SHA* TLS 加密套件之一。使用 `no-certificates` 模式时，远端设备必须支持“ADH-DES-CBC3-SHA”加密套件。
:::

#### RADIUS 属性 {#radius-properties}

| 属性 | 说明 |
| :-- | :-- |
| **radius-mac-authentication** (*yes \| no*；默认值：**no**) | 该属性影响 Access Point 处理未在 <a href="/docs/wireless/abgn/wireless-interface#access-list">Access List</a> 中发现的客户端的方式。<ul><li>no - 根据 Wireless 接口的 <a href="/docs/wireless/abgn/wireless-interface#general-interface-properties">default-authentication</a> 属性值允许或拒绝客户端认证。</li><li>yes - 使用客户端的 MAC 地址作为用户名查询 RADIUS 服务器。使用此设置时，<a href="/docs/wireless/abgn/wireless-interface#general-interface-properties">default-authentication</a> 的值不起作用。</li></ul> |
| **radius-mac-accounting** (*yes \| no*；默认值：**no**) |  |
| **radius-eap-accounting** (*yes \| no*；默认值：**no**) |  |
| **radius-called-format** (*mac \| mac:ssid \| ssid*；默认值：**mac:ssid**) |  |
| **interim-update** (*time*；默认值：**0**) | 使用 RADIUS 计费时，Access Point 会定期向 RADIUS 服务器发送计费信息更新。该属性指定默认更新间隔，RADIUS 服务器可以使用 [Acct-Interim-Interval](/docs/wireless/abgn/wireless-interface#radius-mac-authentication) 属性覆盖该值。 |
| **radius-mac-format** (*XX:XX:XX:XX:XX:XX \| XXXX:XXXX:XXXX \| XXXXXX:XXXXXX \| XX-XX-XX-XX-XX-XX \| XXXXXX-XXXXXX \| XXXXXXXXXXXX \| XX XX XX XX XX XX \| lower case;* 默认值：**XX:XX:XX:XX:XX:XX**) | 控制 Access Point 在 MAC 认证和 MAC 计费 RADIUS 请求的 User-Name 属性中编码客户端 MAC 地址的方式。 |
| **radius-mac-mode** (*as-username \| as-username-and-password*；默认值：**as-username**) | 默认情况下，Access Point 在 MAC 认证期间发送 Access-Request 时使用空密码。当该属性设置为 *as-username-and-password* 时，Access Point 将对 User-Password 属性使用与 User-Name 属性相同的值。 |
| **radius-mac-caching** (*disabled \| time*；默认值：**disabled**) | 如果将该值设置为时间间隔，Access Point 将在指定时间内缓存 RADIUS MAC 认证响应，并且当存在匹配的缓存条目时不会联系 RADIUS 服务器。值 *disabled* 将禁用缓存，Access Point 将始终联系 RADIUS 服务器。 |

#### WEP 属性 {#wep-properties}

这些属性仅在 **mode** 设置为 *static-keys-required* 或 *static-keys-optional* 时生效。

| 属性 | 说明 |
| :-- | :-- |
| **static-key-0 \| static-key-1 \| static-key-2 \| static-key-3** (*hex*；默认值：) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 密钥的十六进制表示。密钥长度必须与所选算法相匹配。请参阅 [Statically configured WEP keys](/docs/wireless/abgn/wireless-interface#statically-configured-wep-keys) 部分。 |
| **static-algo-0 \| static-algo-1 \| static-algo-2 \| static-algo-3** (*none \| 40bit-wep \| 104bit-wep \| tkip \| aes-ccm*；默认值：**none**) | 与相应密钥一起使用的加密算法。 |
| **static-transmit-key** (*key-0 \| key-1 \| key-2 \| key-3*；默认值：**key-0**) | Access Point 将使用指定密钥为不使用私有密钥的客户端加密帧。Access Point 还将使用该密钥加密广播和多播帧。如果 **static-sta-private-algo** 设置为 *none*，客户端将使用指定密钥加密帧。如果相应的 **static-algo-N** 属性值为 *none*，则帧将以未加密方式发送（当 **mode** 设置为 *static-keys-optional* 时），或完全不发送（当 **mode** 设置为 *static-keys-required* 时）。 |
| **static-sta-private-key** (*hex*；默认值：) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 密钥长度必须与所选算法相匹配，请参阅 [Statically configured WEP keys](/docs/wireless/abgn/wireless-interface#statically-configured-wep-keys) 部分。该属性仅在 Station 上使用。Access Point 使用来自 [private-key](/docs/wireless/abgn/wireless-interface#access-list) 属性或 [Mikrotik-Wireless-Enc-Key](/docs/wireless/abgn/wireless-interface#radius-mac-authentication) 属性的相应密钥。 |
| **static-sta-private-algo** (*none \| 40bit-wep \| 104bit-wep \| tkip \| aes-ccm*；默认值：**none**) | 与 Station 私有密钥一起使用的加密算法。值 *none* 禁用私有密钥的使用。该属性仅在 Station 上使用。Access Point 必须从 [private-algo](/docs/wireless/abgn/wireless-interface#access-list) 属性或 [Mikrotik-Wireless-Enc-Algo](/docs/wireless/abgn/wireless-interface#radius-mac-authentication) 属性获取相应值。Station 私有密钥会替换单播帧的密钥 0。Station 不会使用私有密钥解密广播帧。 |

### 管理帧保护 {#management-frame-protection}

***用于**：防止去认证攻击，解决 MAC 地址克隆问题。*

RouterOS 实现了一种基于共享密钥的专有管理帧保护算法。管理帧保护是指 RouterOS 无线设备能够验证管理帧的来源，并确认特定帧不是恶意的。该功能使基于 RouterOS 的无线设备能够抵御去认证和解除关联攻击。

管理保护模式在 security-profile 中通过 **management-protection** 设置配置。可能的值如下：**disabled** - 禁用管理保护（默认），**allowed** - 如果对端支持，则使用管理保护（对于 AP - 同时允许非管理保护和管理保护客户端，对于客户端 - 可连接启用和未启用管理保护的 AP），**required** - 仅与支持管理保护的远端设备建立关联（对于 AP - 仅接受支持管理保护的客户端，对于客户端 - 仅连接支持管理保护的 AP）。

管理保护共享密钥通过 security-profile 的 **management-protection-key** 设置配置。

当接口处于 AP 模式时，security-profile 中配置的默认管理保护密钥可由 access-list 或 RADIUS 属性中指定的密钥覆盖。

```
[admin@mikrotik] /interface/wireless/security-profiles> print 
 0 name="default" mode=none authentication-types="" unicast-ciphers="" 
  group-ciphers="" wpa-pre-shared-key="" wpa2-pre-shared-key="" 
  supplicant-identity="n-str-p46" eap-methods=passthrough 
  tls-mode=no-certificates tls-certificate=none static-algo-0=none 
  static-key-0="" static-algo-1=none static-key-1="" static-algo-2=none 
  static-key-2="" static-algo-3=none static-key-3="" 
  static-transmit-key=key-0 static-sta-private-algo=none 
  static-sta-private-key="" radius-mac-authentication=no 
  radius-mac-accounting=no radius-eap-accounting=no interim-update=0s 
  radius-mac-format=XX:XX:XX:XX:XX:XX radius-mac-mode=as-username 
  radius-mac-caching=disabled group-key-update=5m 
  management-protection=disabled management-protection-key=""  
```

```
[admin@mikrotik] /interface/wireless/security-profiles> set default management-protection=    
                                                        allowed  disabled  required  
```

![](/img/b5298b7432544ff5.webp)

### 操作详情 {#operation-details}

#### RADIUS MAC 认证 {#radius-mac-authentication}

:::note
接入点会对未在 [access-list](/docs/wireless/abgn/wireless-interface#access-list) 中找到的客户端使用 RADIUS MAC 认证，类似于无线接口的 **default-authentication** 属性。它控制客户端是否允许继续认证，或立即被拒绝。
:::
当 **radius-mac-authentication**=*yes* 时，接入点通过发送包含以下属性的 Access-Request 查询 RADIUS 服务器：

- User-Name - 客户端 MAC 地址。其编码由 **radius-mac-format** 设置指定。默认编码为“XX:XX:XX:XX:XX:XX”。
- Nas-Port-Id - 无线接口的 **name**。
- User-Password - 当 **radius-mac-mode**=*as-username-and-password* 时，该属性设置为与 User-Name 相同的值。否则该属性为空。
- Calling-Station-Id - 客户端 MAC 地址，编码为“XX-XX-XX-XX-XX-XX”。
- Called-Station-Id - 接入点的 MAC 地址和 SSID，编码为“XX-XX-XX-XX-XX-XX:SSID”（MAC 地址数字以连字符分隔成对排列，后跟冒号，再跟 SSID 值）。
- Acct-Session-Id - 当 **radius-mac-accounting**=*yes* 时添加。

当接入点收到来自 RADIUS 服务器的 Access-Accept 或 Access-Reject 响应时，会存储该响应，并允许或拒绝客户端。接入点使用 Access-Accept 响应中的以下 RADIUS 属性：

- Ascend-Data-Rate。
- Ascend-Xmit-Rate。
- Mikrotik-Wireless-Forward - 与 [access-list](/docs/wireless/abgn/wireless-interface#access-list) **forwarding** 相同。
- Mikrotik-Wireless-Enc-Algo - 与 [access-list](/docs/wireless/abgn/wireless-interface#access-list) **private-algo** 相同。
- Mikrotik-Wireless-Enc-Key - 与 [access-list](/docs/wireless/abgn/wireless-interface#access-list) **private-key** 相同。
- Mikrotik-Wireless-Psk - 与 [access-list](/docs/wireless/abgn/wireless-interface#access-list) **private-pre-shared-key** 相同。
- Mikrotik-Wireless-Mpkey - 与 Access list 中的 Management-protection-key 相同。
- Session-Timeout - 客户端断开连接前的时间。
- Acct-Interim-Interval - 覆盖 **interim-update** 的值。
- Class - 如果存在，则保存该属性的值，并将其包含在 Accounting-Request 消息中。

**Caching**:

添加 RADIUS MAC 身份验证缓存是为了支持需要接入点对关联请求作出非常快速响应的客户端的 RADIUS 身份验证。此类客户端会在收到 RADIUS 服务器响应之前超时。接入点会在一段时间内缓存身份验证响应，并可立即回复同一客户端重复的关联请求。

#### RADIUS EAP 透传认证 {#radius-eap-pass-through-authentication}

使用 WPA EAP 身份验证类型时，已通过 MAC 身份验证的客户端需要先执行 EAP 身份验证，才会被授权在无线网络上传输数据。使用 pass-through EAP 方法时，接入点会将身份验证转发给 RADIUS 服务器，并在 Access-Request RADIUS 消息中使用以下属性：

- User-Name - EAP supplicant 身份。该值在客户端安全配置的 **supplicant-identity** 属性中配置。
- Nas-Port-Id - 无线接口的 **name**。
- Calling-Station-Id - 客户端 MAC 地址，编码为“XX-XX-XX-XX-XX-XX”。
- Called-Station-Id - 接入点的 MAC 地址和 SSID，编码为“XX-XX-XX-XX-XX-XX:SSID”（MAC 地址每两位为一组，以减号分隔，后跟冒号，再跟 SSID 值）。
- Acct-Session-Id - 当 **radius-eap-accounting**=*yes* 时添加。
- Acct-Multi-Session-Id - 接入点和客户端的 MAC 地址，以及一个唯一的 8 字节值，该值由共享同一次 EAP 身份验证的所有计费会话共享。编码为 *AA-AA-AA-AA-AA-AA-CC-CC-CC-CC-CC-CC-XX-XX-XX-XX-XX-XX-XX-XX.* 当 radius-eap-accounting=yes 时添加。

接入点使用服务器 Access-Accept 响应中的以下 RADIUS 属性：

- Class - 如果存在，则保存该属性的值，并将其包含在 Accounting-Request 消息中。
- Session-Timeout - 客户端断开连接前的时间。此外，接入点会记住身份验证结果；如果客户端在此期间重新连接，将立即获得授权，无需重复 EAP 身份验证。
- Acct-Interim-Interval - 覆盖 **interim-update** 的值。

#### 静态配置的 WEP 密钥 {#statically-configured-wep-keys}

不同算法要求不同长度的密钥：

- *40bit-wep* - 10 个十六进制数字（40 位）。如果密钥更长，则仅使用前 40 位。
- *104bit-wep* - 26 个十六进制数字（104 位）。如果密钥更长，则仅使用前 104 位。
- *tkip* - 至少 64 个十六进制数字（256 位）。
- *aes-ccm* - 至少 32 个十六进制数字（128 位）。

密钥必须包含偶数个十六进制数字。

#### WDS 安全配置 {#wds-security-configuration}

WDS 链路可以使用所有可用的安全功能。但是，它们需要仔细配置安全参数。

可以对所有客户端使用一个安全配置文件，并为 WDS 链路使用不同的安全配置文件。WDS 链路的安全配置文件在 [connect-list](/docs/wireless/abgn/wireless-interface#connect-list) 中指定。接入点在与另一接入点建立 WDS 链路之前，始终会检查 connect list，并使用匹配的 connect list 条目中的安全设置。当每个接入点都有一个与对端设备匹配的 connect list 条目、设置了 **connect**=*yes* 并指定了兼容的 **security-profile** 时，WDS 链路将正常工作。

**WDS 和 WPA/WPA2：**

如果接入点使用 **mode**=*dynamic-keys* 的安全配置文件，则所有 WDS 链路都将使用加密。由于 WPA 身份验证和密钥交换不是对称的，其中一个接入点将作为客户端建立安全连接。这类似于 *static-mesh* 和 *dynamic-mesh* WDS 模式的工作方式。如果启用 WPA 加密，某些问题（例如两个配置错误且使用非 *mesh* 模式的接入点之间出现单向 WDS 链路）就不会发生。不过，使用 WPA 的非 *mesh* 模式仍存在其他问题（例如配置不匹配时持续尝试重新连接），可通过使用 *-mesh* WDS 模式解决。

通常，建立 WPA 保护 WDS 链路的两个接入点上的 WPA 属性必须匹配。这些属性为 **authentication-types**、**unicast-ciphers**、**group-ciphers**。对于非 *mesh* WDS 模式，这些属性在两个设备上必须具有相同值。在 *mesh* WDS 模式下，每个接入点都必须将另一个接入点作为客户端支持。

理论上，可以将 RADIUS MAC 身份验证和其他 RADIUS 服务用于 WDS 链路。不过，只有一个接入点会与 RADIUS 服务器交互，另一个接入点将作为客户端运行。

RouterOS 中 *eap-tls* EAP 方法的实现特别适合 WDS 链路加密。**tls-mode**=*no-certificates* 不需要额外配置，并提供非常强的加密。

**WDS 和 WEP：**

分配给 WDS 链路的安全配置文件中的 **mode**、**static-sta-private-key** 和 **static-sta-private-algo** 参数，在建立 WEP 加密 WDS 链路的两个接入点上必须具有相同值。

#### 安全配置文件与 connect list 中的接入点匹配 {#security-profile-and-access-point-matching-in-the-connect-list}

客户端使用 [connect-list](/docs/wireless/abgn/wireless-interface#connect-list) 的 **security-profile** 属性值，仅匹配那些支持所需安全机制的接入点。

- **mode**=*static-keys-required* 和 **mode**=*static-keys-optional* 仅匹配接口 **security-profile** 中具有相同 **mode** 的接入点。
- 如果 **mode**=*dynamic-keys*，则当 **authentication-types**、**unicast-ciphers** 和 **group-ciphers** 均至少包含接入点通告的一个值时，连接列表条目匹配。

## 虚拟接口 {#virtual-interfaces}

### 虚拟 AP {#virtual-ap}

可以使用 wireless 菜单中的 *add* 命令创建虚拟接入点。必须指定虚拟接口所属的 *master-interface*。如果“master-interface”模式为“station”，则虚拟 AP 仅在“master-interface”处于活动状态时工作。虚拟 AP 可以有自己的 SSID 和 Security Profile。

仅当主接口处于 *ap-bridge*、*bridge*、*station* 或 wds-slave 模式时，虚拟 AP 接口才会工作。它仅适用于 802.11 协议，不支持 Nv2。

此功能可用于分离不同类型用户的访问。可以分配不同的带宽级别和密码，并指示用户连接到特定虚拟网络。对无线客户端而言，它表现为不同的 SSID 或不同的设备。例如，使用 QuickSet 配置访客网络时，后台会使用 VirtualAP 功能。

**要创建新的 virtual-ap：** `/interface> wireless add mode=ap-bridge master-interface=wlan1 ssid=guests security-profile=guests` （*需要先创建这样的安全配置文件*）

:::note
每个物理接口最多可创建 127 个虚拟接口。不建议创建超过 30 个，因为性能会开始下降。
:::

### 虚拟客户端 {#virtual-clients}

也可以创建虚拟客户端，并在同一物理接口上同时作为 AP 和 Client 运行。这样只需使用一块硬件网卡即可搭建中继。配置过程与上文完全相同，但需使用 **station** 模式：

**创建新的虚拟客户端：** `/interface> wireless add mode=station master-interface=wlan1 ssid=where-to-connect security-profile=your-profile` （*首先需要创建相应的安全配置文件*）

:::note
 虚拟接口将始终使用 Master 接口的无线频率。如果 Master 接口启用了 `auto` 频率，则虚拟接口将使用 Master 接口选择的无线频率。
:::

## Sniffer

**子菜单：** `/interface/wireless/sniffer`

无线嗅探器可捕获帧，包括 Radio 头、802.11 头和其他无线相关信息。

| 属性 | 说明 |
| :-- | :-- |
| **channel-time** （; 默认： **200ms**） | 每个信道的嗅探时长。仅在 **multiple-channels=yes** 时使用。 |
| **file-limit** （*整数 [10..4294967295]*；默认： **10**） | 用于存储捕获数据的已分配文件大小，单位为字节。指定 **file-name** 时适用。 |
| **file-name** （*字符串*；默认： ） | 用于存储捕获数据的文件名称。 |
| **memory-limit** （*整数 [10..4294967295]*；默认： **10**） | 用于存储捕获数据的已分配内存缓冲区，单位为千字节。 |
| **multiple-channels** （*yes \| no*；默认： **no**） | 是否嗅探多个信道或单个信道。**No** 表示所有信道设置均取自 **/interface/wireless**。**Yes** 表示所有信道设置均取自 **/interface/wireless** 下的 **scan-list**。 |
| **only-headers** （*yes \| no*；默认： **no**） | 设置为 yes 时，嗅探器仅捕获帧头中存储的信息。 |
| **receive-errors** （*yes \| no*；默认： **no**） | 是否处理根据 FCS 判断为接收时出错的数据包。 |
| **streaming-enabled** （*yes \| no*；默认： **no**） | 是否将捕获的数据流式传输到指定的流服务器。 |
| **streaming-max-rate** （*整数 [0..4294967295]*；默认： **0**） | 允许的最大每秒数据包数。**0** 表示无限制。 |
| **streaming-server** （*IPv4*；默认： **0.0.0.0**） | 流服务器的 IP 地址。 |

:::note
当 `multiple-channels=yes` 时，使用 `/interface/wireless/info/scan-list` 命令验证 `/interface/wireless/channels` 下定义的 `scan-list`。
:::

### Packets

**子菜单：** `/interface/wireless/sniffer/packet`

子菜单显示捕获的数据包。

## Scan

`scan` 命令可查看 `scan-list` 定义的频率范围内可用的 AP。使用 `scan` 命令时，接口操作会被禁用（扫描期间无线链路会断开）。也支持后台扫描，可在无线接口运行期间使用，不会断开无线链路。后台扫描仅支持使用 802.11 无线协议。

扫描工具会持续扫描 AP，直到用户停止扫描过程。可以使用扫描工具的 `rounds` 设置，按指定次数扫描 `scan-list` 条目。这在通过脚本运行扫描工具时很有用。以下是一次扫描的 `scan` 命令示例：

```
/interface/wireless/scan wlan1 rounds=1
```

`save-file` 选项允许执行脚本化或定时扫描，并将结果保存到文件中，以便后续分析。此外，该功能与 `rounds` 设置结合使用，可从远程无线客户端获取扫描结果——执行该命令将启动扫描工具，断开无线链路，扫描 `scan-list` 中的频率，并将结果保存到文件，然后退出扫描并重新连接无线链路。示例：

```
/interface/wireless/scan wlan1 rounds=1 save-file=scan1
```

要使用后台无线扫描，应提供 `background=yes` 设置。示例：

```
/interface/wireless/scan wlan1 background=yes
```

后台扫描功能在以下条件下工作：

- 无线接口应已启用。
- 对于 AP 模式下的无线接口——当其在 802.11 协议模式下运行且处于固定信道时（即信道选择和初始雷达检测已完成）。
- 对于 Station 模式下的无线接口——当其已连接到使用 802.11 协议的 AP 时。

虚拟无线接口也支持 Scan 命令，但存在以下限制：

- 当虚拟接口及其主接口固定在某个信道上时可以进行扫描（主 AP 正在运行，或主 station 已连接到 AP）。
- 扫描仅在主接口所在的信道上执行。
- background=yes|no 无关紧要 - 在虚拟接口上，scan 不会断开客户端/AP，因此始终是“background”。

## Snooper

此工具监控周围频率使用情况，并显示哪些设备占用每个频率。它可在控制台和 WinBox 中使用。Snooper 将使用 scan-list 中的频率。

**子菜单：** `/interface/wireless/snooper`

![](/img/4f1988b92537fbed.webp)

![](/img/fd8ec072bb88c200.webp)

### 设置 {#settings}

![](/img/e9bdf175bc8c36cd.webp)

## 频谱扫描 {#spectral-scan}

- 请参阅单独文档 [Spectral scan](/docs/wireless/abgn/spectral-scan)。

## WDS

**子菜单：** `/interface/wireless/wds`

**Properties:**

| 属性 | 说明 |
| :-- | :-- |
| **arp** (*disabled \| enabled \| proxy-arp \| reply-only*；默认：**enabled**) |  |
| **comment** (*string*；默认：) |  |
| **disable-running-check** (*yes \| no*；默认：**no**) |  |
| **disabled** (*yes \| no*；默认：**yes**) |  |
| **l2mtu** (*integer [0..65536]*；默认：) |  |
| **master-interface** (*string*；默认：) |  |
| **mtu** (*integer [0..65536]*；默认：**1500**) |  |
| **name** (*string*；默认：) |  |
| **wds-address** (*MAC*；默认：**00:00:00:00:00:00**) |  |

**只读属性：**

| 属性 | 说明 |
| :-- | :-- |
| **dynamic** (*yes \| no*) |  |
| **mac-address** (*MAC*) |  |
| **running** (*yes \| no*) |  |

## WPS

Wireless 接口同时支持 WPS Server 和 WPS Client。

### WPS Server

WPS Server 允许支持 WPS 的无线客户端连接到受 Pre-Shared Key 保护的 AP，而无需在客户端配置中指定该密钥。

可以通过更改 Wireless 接口的 WPS Mode 设置启用 WPS Server。示例：

```
 /interface/wireless/set wlan1 wps-mode=push-button
```

Wps-mode 有 3 个选项

- disabled
- push-button - 通过按下板卡上的物理按钮激活 WPS（少数板卡在外壳或标签上标有此类按钮）
- push-button-virtual-only - 通过按下 RouterOS Wireless 接口菜单中的“WPS Accept”按钮激活 WPS

按下 WPS 物理或虚拟按钮后，AP 会启用 WPS 功能。如果 2 分钟内未启动 WPS 过程，WPS Accept Function 将停止。

WPS Server 默认在少数带有物理 WPS 按钮标记的板卡上启用。例如，hap lite、hap、hap ac lite、hap ac、map lite。

WPS Server 仅在无线 AP 接口启用 Pre-Shared Key Authentication（PSK）时处于活动状态。也可以为 Virtual AP 接口配置该模式。

### WPS 客户端 {#wps-client}

WPS Client 功能允许无线客户端从启用了 WPS Server 的 AP 获取 Pre-Shared Key 配置。可以通过以下命令启用 WPS Client：

```
 /interface/wireless/wps-client/wlan1
```

WPS Client 命令会在屏幕上输出有关已启用 WPS 的 AP 的所有信息。示例：

```
[admin@MikroTik] /interface/wireless> wps-client wlan1
          status: disconnected, success
            ssid: MikroTik
     mac-address: E4:8D:8C:D6:E0:AC
      passphrase: presharedkey
  authentication: wpa2-psk
      encryption: aes-ccm
```

可以为 WPS-Client 命令指定其他设置：

- create-profile - 创建具有指定名称的无线安全配置文件，使用从 WPS AP 接收到的安全详细信息对其进行配置，并指定无线接口使用新创建的安全配置文件。
- ssid - 仅从具有指定 SSID 的 AP 获取 WPS 信息。
- mac-address - 仅从具有指定 mac-address 的 AP 获取 WPS 信息。

## Repeater

无线中继器允许接收来自 AP 的信号，并使用同一物理接口在本地转发信号，以连接其他客户端。这将为无线客户端扩展无线服务。无线中继器功能会将无线接口配置为使用 station-bridge 或 station-pseudobridge 选项连接到 AP，创建虚拟 AP 接口，创建网桥接口，并将主接口和虚拟接口都添加到网桥端口。

如果你的 AP **支持按钮启用 WPS** 模式，可以使用自动设置命令：

```
/interface/wireless/setup-repeater wlan1
```

setup-repeater 会执行以下步骤：

- 搜索按下按钮的 WPS AP。
- 从 AP 获取 SSID、密钥和信道。
- 重置主 master 接口配置（与 reset-configuration 相同）。
- 删除为添加到该 master 的虚拟接口添加的所有网桥端口（以免之后留下无效的无用网桥端口）。
- 删除添加到该 master 的所有虚拟接口。
- 创建名称为“`<interfacename>-<ssid>-repeater`”的安全配置文件，如果此类安全配置文件已存在，则不会创建新配置文件，只会更新设置。
- 配置 master 接口，接口模式选择规则如下：如果 AP 支持网桥模式，则使用 station-bridge；否则，如果 AP 支持 WDS，则使用 station-wds；否则使用 station-pseudobridge。
- 创建与主接口具有相同 SSID 和安全配置文件的虚拟 AP 接口。
- 如果 master 接口不在任何网桥中，则创建新的网桥接口并将 master 接口添加到其中。
- 将虚拟 AP 接口添加到 master 接口所在的同一网桥。

如果你的 AP **不支持 WPS**，可以使用以下参数手动指定设置：

- **address** - 要为其设置中继器的 AP 的 MAC 地址（可选）
- **ssid** - 要为其设置中继器的 AP 的 SSID（可选）
- **passphrase** - 用于 AP 的密钥 - 如果指定了此参数，命令将仅扫描 AP，并根据信标中的信息和此 passphrase 创建安全配置文件。如果未指定此参数，命令将通过 WPS 获取 passphrase。

## Roaming

### Station 漫游 {#station-roaming}

Station Roaming 功能仅适用于 802.11 无线协议，并且仅适用于 station 模式。当 RouterOS 无线客户端使用 802.11 无线协议连接到 AP 时，它会按特定时间间隔定期执行后台扫描。当后台扫描发现信号更好的 AP 时，它会尝试漫游到该 AP。当无线信号变差时，后台扫描之间的时间间隔会缩短；当无线客户端信号变好时，后台扫描间隔会变长。

## VLAN 标记 {#vlan-tagging}

**子菜单：** `/interface/wireless`

通过 VLAN 标记，可以在“本地转发”AP（无线接口与以太网桥接的 AP）的以太网侧分离 Virtual AP 流量。这用于在 AP 的以太网侧分离例如“管理”和“访客”网络流量。

VLAN 分配给无线接口后，所有来自无线侧的数据都会打上该标记，并且只有带该标记的数据才会通过无线发送。该方式适用于所有无线协议，但 Nv2 不支持 Virtual AP。

可以配置 RADIUS 认证服务器，在用户或用户组认证到网络时将其分配到指定 VLAN。要使用此选项，需要使用 [RADIUS 属性](/docs/authentication-authorization-accounting/radius)。

| 属性 | 说明 |
| :-- | :-- |
| **vlan-mode** (*no-tag \| use-service-tag \| use-tag*；默认：**no-tag**) | 提供三种 VLAN 模式：<ul><li><em>no-tag</em> - AP 不使用 VLAN 标记</li><li><em>use-service-tag</em> - VLAN ID 使用 802.1ad 标记类型</li><li><em>use-tag</em> - VLAN ID 使用 802.1q 标记类型</li></ul> |
| **vlan-id** (*integer [1..4095]*；默认：**1**) | VLAN 标识号 |

### VLAN 标记覆盖 {#vlan-tag-override}

可以通过 access-list 和 RADIUS 属性按客户端覆盖每个接口的 VLAN 标记（适用于普通无线和无线控制器）。

这样即使在同一接口上，也可以在无线客户端之间分离流量，但必须谨慎使用：仅发送“接口 VLAN”的广播/组播流量。如果其他（被覆盖的）VLAN 也需要正常的广播/组播，目前可以使用 multicast-helper（它会将每个组播数据包转换为单播，然后仅发送给具有匹配 VLAN ID 的客户端）。

## WinBox

[WinBox](/docs/management-tools/winbox) 是一个小型工具，可通过快速且简单的 GUI 管理 MikroTik RouterOS。

:::note
 Current Tx Power 显示特定数据速率下使用的发射功率。Atheros 802.11ac 芯片（例如 QCA98xx）不支持该功能。
:::

## Interworking Realms 设置 {#interworking-realms-setting}

有关 interworking profiles 的更多信息，请参阅 [Interworking Profiles](/docs/wireless/abgn/interworking-profiles)。

**realms-raw** - 包含十六进制值的字符串列表。每个字符串指定“NAI Realm Tuple”的内容，不包括“NAI Realm Data Field Length”字段。

每个十六进制编码字符串必须包含以下字段：

```
- NAI Realm Encoding (1 byte)
- NAI Realm Length (1 byte)
- NAI Realm (variable)
- EAP Method Count (1 byte)
- EAP Method Tuples (variable)
```

例如，值“00045465737401020d00”解码为：

```
- NAI Realm Encoding: 0 (rfc4282)
- NAI Realm Length: 4
- NAI Realm: Test
- EAP Method Count: 1
- EAP Method Length: 2
- EAP Method Tuple: TLS, no EAP method parameters
```

设置“realms-raw=00045465737401020d00”会产生与设置“realms=Test:eap-tls”相同的通告内容。

有关完整的 NAI Realm 编码，请参阅 802.11-2016 第 9.4.5.10 节。

## 迁移说明 {#migration-notes}

以下术语和软件包在较旧的 RouterOS 版本中发生了变化。此处仅作为迁移非常旧的配置时的参考，在当前 RouterOS 上无需执行任何操作。

- **Superchannel / `frequency-mode`。** `superchannel` 频率模式以前称为 *Custom Frequency Upgrade*，并且需要特殊许可证密钥。自 RouterOS v4.3 起，所有安装均无需密钥即可使用该模式。
- **Wireless driver packages。** RouterOS v6 将无线功能拆分到单独的 `wireless-rep`、`wireless-cm2` 和 `wireless-fp` 软件包中。RouterOS v7 将这些功能合并到一个 `wireless` 软件包中，因此曾经需要这些软件包之一的功能——虚拟客户端、后台扫描、WPS 客户端、RADIUS VLAN 分配和 `scan-list` 步进选项——均属于标准 `wireless` 软件包。
