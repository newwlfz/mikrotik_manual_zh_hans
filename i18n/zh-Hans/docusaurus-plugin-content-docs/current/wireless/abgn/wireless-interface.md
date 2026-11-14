---
sidebar_key: "wireless/abgn/wireless-interface"
sidebar_position: 7
title: "无线接口"
sidebar_label: "无线接口"
description: "RouterOS 无线接口支持 IEEE 802.11 标准，具备全面的功能，包括多种模式（client、AP、bridge）、加密协议、信道宽度调整以及高级传输设置，以实现最佳无线网络性能。"
tags:
  - 'wireless'
  - 'arp'
  - 'channel-width'
source: https://manual.mikrotik.com/docs/wireless/abgn/wireless-interface
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

---

## 概述 {#overview}

**包：** wireless

RouterOS 无线遵循 IEEE 802.11 标准。它提供对 802.11a、802.11b、802.11g、802.11n 和 802.11ac 的完整支持，以及 WPA、WEP、AES 加密、无线分布系统（WDS）、动态频率选择（DFS）、虚拟接入点、Nstreme 和 Nv2 专有协议等附加功能，以及更多功能。

无线可以工作在多种模式下：客户端（站）、接入点、无线网桥等。客户端/站也可以工作在不同的模式下。支持的完整模式列表见 [无线站模式](../user-guides/wireless-station-modes.md)。

## 常规接口属性 {#general-interface-properties}

**子菜单：** `/interface/wireless`

| 属性 | 描述 |
| :-- | :-- |
| **adaptive-noise-immunity** (*ap-and-client-mode \| client-mode \| none*; 默认值：**none**) | 此属性仅对基于 Atheros 芯片组的卡有效。 |
| **allow-sharedkey** (*yes \| no*; 默认值：**no**) | 允许 WEP 共享密钥客户端连接。注意，这些客户端不会进行身份验证（WEP 共享密钥不会与任何内容进行比较）——它们会被立即接受（如果访问列表允许）。 |
| **ampdu-priorities** (*list of integer [0..7]*; 默认值：**0**) | 应协商并使用 AMPDU 发送（聚合帧并使用块确认发送）的帧优先级。使用 AMPDU 将提高吞吐量，但可能增加延迟，因此可能不适合实时流量（语音、视频）。因此，默认情况下 AMPDU 仅对尽力而为流量启用。 |
| **amsdu-limit** (*integer [0..8192]*; 默认值：**8192**) | 协商时允许设备准备的最大 AMSDU。AMSDU 聚合可显著提高吞吐量，尤其是对小帧，但在因重传聚合帧而丢包时可能增加延迟。发送和接收 AMSDU 也会增加 CPU 使用率。 |
| **amsdu-threshold** (*integer [0..8192]*; 默认值：**8192**) | 允许包含在 AMSDU 中的最大帧大小。 |
| **antenna-gain** (*integer [0..4294967295]*; 默认值：**0**) | 天线增益，单位为 dBi，用于根据 **country** 法规计算最大发射功率。 |
| **antenna-mode** (*ant-a \| ant-b \| rxa-txb \| txa-rxb*; 默认值： ) | 选择用于发送和接收的天线*ant-a* - 仅使用 'a' 天线*ant-b* - 仅使用 'b' 天线*txa-rxb* - 使用天线 'a' 发送，天线 'b' 接收*rxa-txb* - 使用天线 'b' 发送，天线 'a' 接收 |
| **area** (*string*; 默认值： ) | 标识无线网络组。此值由 AP 通告，并可在  [connect-list](./wireless-interface.md#connect-list)  中通过 **area-prefix** 匹配。这是一个专有扩展。 |
| **arp** (*disabled \| enabled \| proxy-arp \| reply-only*; 默认值：**enabled**) | [ARP](../../getting-started/networking-fundamentals/index.md#arp-and-tying-it-all-together) |
| **arp-timeout** (*auto \| integer*; 默认值：**auto**) | ARP 超时是指在一段时间内未从 IP 收到数据包后，ARP 记录在 ARP 表中保留的时长。值 **auto** 等于 **/ip/settings** 中 **arp-timeout** 的值，默认为 30s |
| **band** (*2ghz-b \| 2ghz-b/g \| 2ghz-b/g/n \| 2ghz-onlyg \| 2ghz-onlyn \| 5ghz-a \| 5ghz-a/n \| 5ghz-onlyn \| 5ghz-a/n/ac \| 5ghz-onlyac \| 5ghz-n/ac*; 默认值： ) | 定义使用的数据速率、信道频率和宽度集合。 |
| **basic-rates-a/g** (*12Mbps \| 18Mbps \| 24Mbps \| 36Mbps \| 48Mbps \| 54Mbps \| 6Mbps \| 9Mbps*; 默认值：**6Mbps**) | 与 **basic-rates-b** 属性类似，但用于 5ghz、5ghz-10mhz、5ghz-5mhz、5ghz-turbo、2.4ghz-b/g、2.4ghz-onlyg、2ghz-10mhz、2ghz-5mhz 和 2.4ghz-g-turbo 频段。 |
| **basic-rates-b** (*11Mbps \| 1Mbps \| 2Mbps \| 5.5Mbps*; 默认值：**1Mbps**) | 基础速率列表，用于 2.4ghz-b、2.4ghz-b/g 和 2.4ghz-onlyg 频段。客户端仅在支持 AP 通告的所有基础速率时才会连接到 AP。AP 仅当支持另一 AP 的所有基础速率时才会建立 WDS 链路。此属性仅在 AP 模式下以及配置 **rate-set** 的值时生效。 |
| **bridge-mode** (*disabled \| enabled*; 默认值：**enabled**) | 允许使用 station-bridge 模式。 [无线站模式](../user-guides/wireless-station-modes.md) |
| **burst-time** (*integer \| disabled*; 默认值：**disabled**) | 用于不停顿发送数据的时间，单位为微秒。注意，在该 burst-time 微秒期间，该网络中的其他无线卡将无法发送数据。此设置仅适用于基于 AR5000、AR5001X 和 AR5001X+ 芯片组的卡。 |
| **channel-width** (*20/40/80/160mhz-Ceeeeeee \| 20/40/80/160mhz-XXXXXXXX \| 20/40/80/160mhz-eCeeeeee \| 20/40/80/160mhz-eeCeeeee \| 20/40/80/160mhz-eeeCeeee \| 20/40/80/160mhz-eeeeCeee \| 20/40/80/160mhz-eeeeeCee \| 20/40/80/160mhz-eeeeeeCe \| 20/40/80/160mhz-eeeeeeeC \| 20/40/80mhz-Ceee \| 20/40/80mhz-eCee \| 20/40/80mhz-eeCe \| 20/40/80mhz-eeeC \| 20/40/80mhz-XXXX \| 20/40mhz-Ce \| 20/40mhz-eC \| 20/40mhz-XX \| 40mhz-turbo \| 20mhz \| 10mhz \| 5mhz*; 默认值：**20mhz**) | 使用扩展信道（例如 Ce、eC 等）允许额外的 20MHz 扩展信道，并指定其应位于控制（主）信道的下方还是上方。扩展信道使 802.11n 设备总共可使用高达 40MHz（802.11ac 高达 160MHz）的频谱，从而提高最大吞吐量。带有 XX 和 XXXX 扩展的信道宽度会根据每个频率上运行的并发设备数量自动扫描较不拥挤的控制信道频率，并自动选择“C”——控制信道频率。 |
| **comment** (*string*; Default: ) | 接口的简短描述 |
| **compression** (*yes \| no*; 默认值：**no**) | 将此属性设置为 *yes* 将允许使用硬件压缩。无线接口必须支持硬件压缩。与不使用压缩的设备之间的连接仍可正常工作。 |
| **country** (*name of the country \| no\_country\_set*; 默认值：**etsi**) | 限制可用频段、频率以及每个频率的最大发射功率。还指定 **scan-list** 的默认值。值 *no\_country\_set* 是符合 FCC 的信道集合。 |
| **default-ap-tx-limit** (*integer [0..4294967295]*; 默认值：**0**) | 对于不匹配  [access-list](./wireless-interface.md#access-list) 中任何条目的客户端，这是 **ap-tx-limit** 的值。0 表示无限制。 |
| **default-authentication** (*yes \| no*; 默认值：**yes**) | 对于 AP 模式，这是不匹配  [access-list](./wireless-interface.md#access-list) 中任何条目的客户端的 **authentication** 值。对于站模式，这是不匹配  [connect-list](./wireless-interface.md#connect-list) 中任何条目的 AP 的 **connect** 值 |
| **default-client-tx-limit** (*integer [0..4294967295]*; 默认值：**0**) | 对于不匹配  [access-list](./wireless-interface.md#access-list) 中任何条目的客户端，这是 **client-tx-limit** 的值。0 表示无限制 |
| **default-forwarding** (*yes \| no*; 默认值：**yes**) | 对于不匹配  [access-list](./wireless-interface.md#access-list) 中任何条目的客户端，这是 **forwarding** 的值 |
| **disable-running-check** (*yes \| no*; 默认值：**no**) | 当设置为 **yes** 时，接口将始终具有 running 标志。如果值设置为 **no**，路由器将确定卡是否已启动并运行——对于 AP，必须有一个或多个客户端注册到它；对于站，它应连接到 AP。 |
| **disabled** (*yes \| no*; 默认值：**yes**) | 接口是否已禁用 |
| **disconnect-timeout** (*time [0s..15s]*; 默认值：**3s**) | 此间隔从最低数据速率下第三次发送失败开始计算。此时，在最低数据速率下已有 3 \* (**hw-retries** + 1) 个帧发送失败。在 **disconnect-timeout** 期间，将按 **on-fail-retry-time** 间隔重试数据包传输。如果在 **disconnect-timeout** 期间无法成功传输任何帧，则连接关闭，并将此事件记录为 "extensive data loss"。成功传输帧会重置此计时器。 |
| **distance** (*integer \| dynamic \| indoors*; 默认值：**dynamic**) | 等待单播帧确认（**ACKs**）多久后才认为传输不成功，或简称 **ACK-Timeout**。Distance 值具有以下行为：*Dynamic* - 使 AP 检测并使用对所有已连接客户端都有效的最小超时。*Indoor* - 使用硬件芯片制造商设置的默认 ACK 超时值。*Number* - 使用公式中的输入值：ACK-timeout = ((**distance** * 1000) + 299) / 300 us；Nstreme/Nv2 协议中不使用确认。 |
| **frame-lifetime** (*integer [0..4294967295]*; 默认值：**0**) | 丢弃排队等待发送时间超过 **frame-lifetime** 的帧。默认情况下，当此属性的值为 *0* 时，帧仅在连接关闭后才会被丢弃。 |
| **frequency** (*integer [0..4294967295]*; 默认值： ) | AP 将运行的信道频率值，单位为 MHz。允许值取决于所选频段，并受 **country** 设置和无线卡能力限制。如果接口处于任何 **station** 模式、*wds-slave* 模式，或 DFS 处于活动状态，则此设置**无效**。*注意*：如果使用 "superchannel" 模式，卡支持的任何频率都将被接受，但在 RouterOS 客户端上，任何非标准频率都必须在  [scan-list](http://en.wikipedia.org/wiki/IEEE_802.11n-2009#Data_rates) 中配置，否则它不会扫描非标准范围。在 WinBox 中，scanlist 频率以*粗体*显示，任何其他频率意味着客户端需要配置 scan-list。 |
| **frequency-mode** (*manual-txpower \| regulatory-domain \| superchannel*; 默认值：**regulatory\_domain**) | 有三种频率模式可用：*regulatory-domain* - 根据 **country** 的值限制可用信道和每个信道的最大发射功率*manual-txpower* - 同上，但不限制最大发射功率。*superchannel* - 一致性测试模式。允许卡支持的所有信道。每个频段的可用信道列表可在 **/interface/wireless/info/allowed-channels** 中查看。此模式允许您测试默认 scan-list 和/或法规域之外的无线信道。此模式仅应在受控环境中使用，或您拥有在所在地区使用它的特殊许可。 |
| **frequency-offset** (*integer [-2147483648..2147483647]*; 默认值：**0**) | 如果使用的无线卡工作频率与 RouterOS 中显示的不同（例如卡中使用了频率转换器），则允许指定偏移。因此，如果您的卡工作在 4000MHz 但 RouterOS 显示 5000MHz，将偏移设置为 1000MHz，它就会正确显示。该值以 MHz 为单位，可以为正或负。 |
| **guard-interval** (*any \| long*; 默认值：**any**) | 是否允许使用短保护间隔（请参阅 802.11n MCS 规范以了解这如何影响吞吐量）。"any" 将根据数据速率使用短或长，"long" 将使用长。 |
| **hide-ssid** (*yes \| no*; 默认值：**no**) | *yes* - AP 不在 beacon 帧中包含 SSID，并且不回复具有广播 SSID 的探测请求。*no* - AP 在 beacon 帧中包含 SSID，并回复具有广播 SSID 的探测请求。此属性仅在 AP 模式下生效。将其设置为 *yes* 可以将此网络从某些客户端软件显示的无线网络列表中移除。更改此设置不会提高无线网络的安全性，因为 SSID 包含在 AP 发送的其他帧中。 |
| **ht-basic-mcs** (*list of (mcs-0 \| mcs-1 \| mcs-2 \| mcs-3 \| mcs-4 \| mcs-5 \| mcs-6 \| mcs-7 \| mcs-8 \| mcs-9 \| mcs-10 \| mcs-11 \| mcs-12 \| mcs-13 \| mcs-14 \| mcs-15 \| mcs-16 \| mcs-17 \| mcs-18 \| mcs-19 \| mcs-20 \| mcs-21 \| mcs-22 \| mcs-23)*; 默认值：**mcs-0; mcs-1; mcs-2; mcs-3; mcs-4; mcs-5; mcs-6; mcs-7**) | 每个连接客户端都必须支持的 [调制和编码方案](http://en.wikipedia.org/wiki/IEEE_802.11n-2009#Data_rates)。有关 MCS 规范，请参阅 802.11n。 |
| **ht-supported-mcs** (*list of (mcs-0 \| mcs-1 \| mcs-2 \| mcs-3 \| mcs-4 \| mcs-5 \| mcs-6 \| mcs-7 \| mcs-8 \| mcs-9 \| mcs-10 \| mcs-11 \| mcs-12 \| mcs-13 \| mcs-14 \| mcs-15 \| mcs-16 \| mcs-17 \| mcs-18 \| mcs-19 \| mcs-20 \| mcs-21 \| mcs-22 \| mcs-23)*; 默认值：**mcs-0; mcs-1; mcs-2; mcs-3; mcs-4; mcs-5; mcs-6; mcs-7; mcs-8; mcs-9; mcs-10; mcs-11; mcs-12; mcs-13; mcs-14; mcs-15; mcs-16; mcs-17; mcs-18; mcs-19; mcs-20; mcs-21; mcs-22; mcs-23**) | 此设备通告为支持的 [调制和编码方案](./wireless-interface.md#frame-protection-support-rtscts)。有关 MCS 规范，请参阅 802.11n。 |
| **hw-fragmentation-threshold** (*integer[256..3000] \| disabled*; 默认值：**disabled**) | 指定在无线介质上传输时的最大分片大小（字节）。802.11 标准数据包（802.11 术语中的 MSDU）分片允许数据包在通过无线介质传输之前进行分片，以提高成功传输的概率（仅重传未正确传输的分片）。注意，由于协议开销以及发送方和接收方资源使用增加，传输分片数据包比传输未分片数据包效率更低。 |
| **hw-protection-mode** (*cts-to-self \| none \| rts-cts*; 默认值：**none**) | 帧保护支持属性  [帧保护支持](./wireless-interface.md#frame-protection-support-rtscts) |
| **hw-protection-threshold** (*integer [0..65535]*; 默认值：**0**) | 帧保护支持属性 [帧保护支持](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md) |
| **hw-retries** (*integer [0..15]*; 默认值：**7**) | 发送帧重试次数，超过后视为传输失败。失败时数据速率会降低，并再次发送该帧。在最低支持速率上连续三次失败后，将暂停向该目标传输 **on-fail-retry-time** 指定的时长。之后再次发送该帧。帧会一直重传，直到传输成功，或在 **disconnect-timeout** 后客户端断开连接。如果超过 **frame-lifetime**，帧可能在此期间被丢弃。 |
| **installation** (*any \| indoor \| outdoor*; 默认值：**any**) | 调整 scan-list，以使用所设置国家/地区的室内、室外或所有频率。 |
| **interworking-profile** (*enabled \| disabled*; 默认值：**disabled**) |  |
| **keepalive-frames** (*enabled \| disabled*; 默认值：**enabled**) | 仅当无线接口处于 mode=**ap-bridge** 时适用。如果客户端约 20 秒未通信，AP 会发送 "keepalive-frame"。**注意：** 禁用此功能可能导致注册表中出现“幽灵”客户端。 |
| **l2mtu** (*integer [0..65536]*; 默认值：**1600**) |  |
| **mac-address** (*MAC*; 默认值： ) |  |
| **master-interface** (*string*; 默认值： ) | 具有 *virtual-ap* 能力的无线接口名称。仅当主接口处于 *ap-bridge*、*bridge*、*station* 或 *wds-slave* 模式时，虚拟 AP 接口才会工作。此属性仅适用于虚拟 AP 接口。 |
| **max-station-count** (*integer [1..2007]*; 默认值：**2007**) | 关联客户端的最大数量。WDS 链路也计入此限制。 |
| **mode** (*station \| station-wds \| ap-bridge \| bridge \| alignment-only \| nstreme-dual-slave \| wds-slave \| station-pseudobridge \| station-pseudobridge-clone \| station-bridge*; 默认值：**station**) | 在不同站和接入点（AP）模式之间选择。[站模式](./wireless-interface.md#info)：*station* - 基本站模式。查找并连接到可接受的 AP。*station-wds* - 与 *station* 相同，但使用专有扩展与 AP 创建 WDS 链路。AP 配置必须允许与此设备建立 WDS 链路。注意，此模式不使用 wds 中的条目。*station-pseudobridge* - 与 *station* 相同，但额外对所有流量执行 MAC 地址转换。允许接口被桥接。*station-pseudobridge-clone* - 与 *station-pseudobridge* 相同，但使用 **station-bridge-clone-mac** 地址连接到 AP。station-bridge - 在站设备上提供对透明、协议无关的 L2 桥接的支持。RouterOS AP 在通过 bridge-mode 参数启用时接受处于 station-bridge 模式的客户端。在此模式下，AP 维护一个转发表，其中包含哪些 MAC 地址可通过哪个站设备到达的信息。仅适用于 RouterOS AP。使用 station-bridge 模式时，无法连接到由 CAPsMAN 控制的 CAP。🛈 **重要：** `wireless` station-bridge 模式与运行较新 `wifi` 包的 AP 不兼容，反之亦然。   AP 模式：*ap-bridge* - 基本接入点模式。*bridge* - 与 *ap-bridge* 相同，但限制为一个关联客户端。*wds-slave* - 与 *ap-bridge* 相同，但扫描具有相同 **ssid** 的 AP 并建立 WDS 链路。如果此链路丢失或无法建立，则继续扫描。如果 **dfs-mode** 为 *radar-detect*，则扫描期间将找不到启用了 **hide-ssid** 的 AP。特殊模式：*alignment-only* - 将接口置于连续发送模式，用于对准远程天线。*nstreme-dual-slave* - 允许此接口用于 nstreme-dual 设置。伪桥模式中的 MAC 地址转换通过检查数据包并构建相应 IP 和 MAC 地址表来工作。所有数据包都以伪桥使用的 MAC 地址发送到 AP，接收到的数据包的 MAC 地址则从地址转换表中恢复。地址转换表中对所有非 IP 数据包只有一个条目，因此桥接网络中多于一个主机无法可靠地使用非 IP 协议。**注意：** IPv6 无法通过 pseudobridge 工作  |
| **mtu** (*integer [0..65536]*; 默认值：**1500**) |  |
| **multicast-buffering** (*disabled \| enabled*; 默认值：**enabled**) | 对于具有省电功能的客户端，缓冲组播数据包直到下一个 beacon 时间。客户端应唤醒以接收 beacon，通过接收 beacon 它看到有组播数据包待发送，并应等待组播数据包被发送。 |
| **multicast-helper** (*default \| disabled \| full*; 默认值：**default**) | 当设置为 **full** 时，组播数据包将使用单播目标 MAC 地址发送，从而解决无线链路上的组播问题。此选项应仅在接入点上启用，客户端应配置为 **station-bridge** 模式。disabled - 禁用 helper 并使用组播目标 MAC 地址发送组播数据包dhcp - 在发送出去之前，DHCP 数据包 MAC 地址会改为单播 MAC 地址full - 在发送出去之前，所有组播数据包 MAC 地址都会改为单播 MAC 地址default - 默认选择，当前设置为 *dhcp*。该值可能在将来版本中更改。 |
| **name** (*string*; 默认值： ) | 接口名称 |
| **noise-floor-threshold** (*default \| integer [-128..127]*; 默认值：**default**) | 仅供高级使用，因为它可能严重影响接口性能。可以手动设置噪声底阈值。默认情况下，它是动态计算的。此属性还会影响接收信号强度。此属性仅对非 AC 芯片有效。 |
| **nv2-cell-radius** (*integer [10..200]*; 默认值：**30**) | 该设置影响 AP 为客户端发起连接分配的竞争时隙大小，以及用于估计到客户端距离的时隙大小。当设置太小时，较远的客户端可能难以连接和/或断开连接并出现 "ranging timeout" 错误。尽管在正常操作期间此设置的影响应可忽略不计，但为了保持最大性能，建议非必要不要增加此设置，这样 AP 不会保留实际从未使用的时间，而是将其分配给实际数据传输。在 AP 上：到最远客户端的距离，单位为 km；在站上：无影响 |
| **nv2-noise-floor-offset** (*default \| integer [0..20]*; 默认值：**default**) |  |
| **nv2-preshared-key** (*string*; 默认值： ) *[敏感](./wireless-interface.md#security-profiles)* |  |
| **nv2-qos** (*default \| frame-priority*; 默认值：**default**) | 设置数据包优先级机制，首先发送高优先级队列的数据，然后发送较低队列优先级的数据，直到达到 0 队列优先级。当链路充满高优先级队列数据时，低优先级数据不会发送。请非常谨慎使用，该设置作用于 AP**frame-priority** - 可通过 Mangle 规则调整的手动设置。**default** - 默认设置，其中小数据包获得优先级以获得最佳延迟 |
| **nv2-queue-count** (*integer [2..8]*; 默认值：**2**) |  |
| **nv2-security** (*disabled \| enabled*; 默认值：**disabled**) |  |
| **on-fail-retry-time** (*time [100ms..1s]*; 默认值：**100ms**) | 在最低数据速率上第三次发送失败后，等待指定时间间隔后再重试。 |
| **periodic-calibration** (*default \| disabled \| enabled*; 默认值：**default**) | 设置 *default* 会在  [info](../../system-information-and-utilities/identity.md)  的 **default-periodic-calibration** 属性为 *enabled* 时启用周期性校准。该属性的值取决于无线卡的类型。此属性仅对基于 Atheros 芯片组的卡有效。 |
| **periodic-calibration-interval** (*integer [1..10000]*; 默认值：**60**) | 此属性仅对基于 Atheros 芯片组的卡有效。 |
| **preamble-mode** (*both \| long \| short*; 默认值：**both**) | 短前导码模式是 802.11b 标准的一个选项，可减少每帧开销。在 AP 上：*long* - 不使用短前导码。*short* - 通告短前导码能力。不接受不具备此能力的客户端连接。*both* - 通告短前导码能力。在站上：*long* - 不使用短前导码。*short* - 如果 AP 不支持短前导码，则不连接到该 AP。*both* - 如果 AP 支持，则使用短前导码。 |
| **prism-cardtype** (*100mW \| 200mW \| 30mW*; 默认值： ) | 指定已安装 Prism 无线卡的类型。 |
| **proprietary-extensions** (*post-2.9.25 \| pre-2.9.25*; 默认值：**post-2.9.25**) | RouterOS 在管理帧的信息元素中包含专有信息。此参数控制如何包含此信息。*pre-2.9.25* - 这是较旧的方法。它可以与较新版本的 RouterOS 互操作。此方法与某些客户端不兼容，例如基于 Centrino 的客户端。*post-2.9.25* - 这使用标准化方式包含厂商特定信息，与较新的无线客户端兼容。 |
| **radio-name** (*string*; 默认值：**MAC address of an interface**) | 设备的描述性名称，显示在远程设备的注册表条目中。这是一个专有扩展。 |
| **rate-selection** (*advanced \| legacy*; 默认值：**advanced**) | 默认值为 **advanced**；**legacy** 模式效率低下，仅保留用于向后兼容。 |
| **rate-set** (*configured \| default*; 默认值：**default**) | 有两个选项可用：*default* - 使用默认的基础和支持速率集。**basic-rates** 和 **supported-rates** 参数中的值无效。*configured* - 使用 **basic-rates**、**supported-rates**、**basic-mcs**、**mcs** 中的值。[基础速率和 MCS 速率表](./wireless-interface.md#station-roaming)。 |
| **rx-chains** (*list of integer [0..3]*; 默认值：**0**) | 用于接收的天线。在当前 MikroTik 路由器中，RX 和 TX 链都必须启用，该链才会启用。 |
| scan-list (*Comma separated list of frequencies and frequency ranges \| default. The type also supports the range:step option*; 默认值：**default**) | *default* 值是从所选频段中由卡支持并受 **country** 和 **frequency-mode** 设置允许的所有信道（此列表可在  [info](../../bridging-and-switching/user-guides/wmm-and-vlan-priority.md) 中查看）。对于 *5ghz* 频段的默认 scan list，信道以 20MHz 步进选取；在 *5ghz-turbo* 频段中，以 40MHz 步进；对于所有其他频段，以 5MHz 步进。如果手动指定 **scan-list**，则采用所有匹配的信道。（示例：**scan-list**=*default,5200-5245,2412-2427* - 这将使用当前频段的 scan list 默认值，并向其中添加来自 5200-5245 或 2412-2427 范围的受支持频率。）   在 WinBox 或 Webfig 中，将每个频率或频率范围作为单独的 scan-list 条目输入；那里不支持逗号分隔列表。scan-list 还支持步进，您可以手动指定扫描步进。示例：**scan-list**=*5500-5600:20* 将生成如下 scan-list 值 *5500,5520,5540,5560,5580,5600* |
| **security-profile** (*string*; 默认值：**default**) | 来自  [安全配置文件](./wireless-interface.md#wps-server)  的配置文件名称 |
| **secondary-channel** (*integer*; 默认值：**""**) | 指定辅助信道，启用 80+80MHz 传输所需。要禁用 80+80MHz 功能，请将 secondary-channel 设置为 "" 或通过 CLI/GUI 取消该值。 |
| **ssid** (*string (0..32 chars)*; 默认值：**[/system/identity](../../system-information-and-utilities/identity.md) 的值**) | SSID（服务集标识符）是标识无线网络的名称。 |
| **skip-dfs-channels** (*string \| 10min-cac \| all \| disabled*; 默认值：**disabled**) | 这些值用于跳过所有 DFS 信道，或专门跳过 5600-5650MHz 范围内的 DFS CAC 信道，其检测可能长达 10min。 |
| **station-bridge-clone-mac** (*MAC*; 默认值： ) | 此属性仅在 *station-pseudobridge-clone* 模式下生效。连接到 AP 时使用此 MAC 地址。如果此值为 *00:00:00:00:00:00*，站最初将使用无线接口的 MAC 地址。一旦需要发送具有另一设备 MAC 地址的数据包，站将使用该地址重新连接到 AP。 |
| **station-roaming** (*disabled \| enabled*; 默认值：**disabled**) | 站漫游功能仅适用于 802.11 无线协议，且仅适用于站模式。  [站漫游](./wireless-interface.md#station-roaming) |
| **supported-rates-a/g** (*list of rates [12Mbps \| 18Mbps \| 24Mbps \| 36Mbps \| 48Mbps \| 54Mbps \| 6Mbps \| 9Mbps]*; 默认值：**6Mbps; 9Mbps; 12Mbps; 18Mbps; 24Mbps; 36Mbps; 48Mbps; 54Mbps**) | 支持的速率列表，用于除 *2ghz-b* 之外的所有频段。 |
| **supported-rates-b** (*list of rates [11Mbps \| 1Mbps \| 2Mbps \| 5.5Mbps]*; 默认值：**1Mbps; 2Mbps; 5.5Mbps; 11Mbps**) | 支持的速率列表，用于 *2ghz-b*、*2ghz-b/g* 和 *2ghz-b/g/n* 频段。两台设备将仅使用双方都支持的速率进行通信。此属性仅在 **rate-set** 的值为 *configured* 时生效。 |
| **tdma-period-size** (*integer [1..10]*; 默认值：**2**) | 指定 TDMA 周期，单位为毫秒。它可能有助于较长距离的链路，可能略微增加带宽，但延迟也会增加。 |
| **tx-chains** (*list of integer [0..3]*; 默认值：**0**) | 用于发送的天线。在当前 MikroTik 路由器中，RX 和 TX 链都必须启用，该链才会启用。 |
| **tx-power** (*integer [-30..40]*; 默认值： ) | 对于 802.11ac 无线接口，这是总功率；但对于 802.11a/b/g/n，这是每链功率。 |
| **tx-power-mode** (*default, card-rates, all-rates-fixed, manual-table*; 默认值：**default**) | 设置无线卡的 tx-power 模式default - 使用卡中存储的值all-rates-fixed - 对所有数据速率使用相同的发射功率。如果发射功率设置高于所用速率的卡的额定值，可能会损坏卡。manual-table - 为每个速率单独定义发射功率。如果发射功率设置高于所用速率的卡的额定值，可能会损坏卡。card-rates - 根据 **tx-power** 参数的值计算每个速率的发射功率。旧模式仅与当前已停产的产品兼容。 |
| **update-stats-interval** (; 默认值： ) | 向客户端请求更新信号强度和 ccq 值的频率。访问  [注册表](./wireless-interface.md#registration-table)  也会触发这些值的更新。这是一个专有扩展。 |
| **vht-basic-mcs** (*none \| MCS 0-7 \| MCS 0-8 \| MCS 0-9*; 默认值：**MCS 0-7**) | 每个连接客户端都必须支持的 [调制和编码方案](http://en.wikipedia.org/wiki/IEEE_802.11ac#Data_rates_and_speed)。有关 MCS 规范，请参阅 802.11ac。您可以为每个空间流设置 MCS 区间 *none* - 不使用所选空间流*MCS 0-7* - 客户端必须支持 MCS-0 至 MCS-7*MCS 0-8* - 客户端必须支持 MCS-0 至 MCS-8*MCS 0-9* - 客户端必须支持 MCS-0 至 MCS-9 |
| **vht-supported-mcs** (*none \| MCS 0-7 \| MCS 0-8 \| MCS 0-9*; 默认值：**MCS 0-9**) | 此设备通告为支持的 [调制和编码方案](http://en.wikipedia.org/wiki/IEEE_802.11ac#Data_rates_and_speed)。有关 MCS 规范，请参阅 802.11ac。您可以为每个空间流设置 MCS 区间 *none* - 不使用所选空间流*MCS 0-7* - 设备将通告支持 MCS-0 至 MCS-7*MCS 0-8* - 设备将通告支持 MCS-0 至 MCS-8*MCS 0-9* - 设备将通告支持 MCS-0 至 MCS-9 |
| **wds-cost-range** (*start [-end] integer[1..200000000]*; 默认值：**50-150**) | WDS 链路的桥端口开销会根据测得的链路吞吐量自动调整。端口开销每 5 秒重新计算和调整一次，前提是变化超过 10%，或距上次调整已超过 20 秒。将此属性设置为 *0* 可禁用自动开销调整。自动调整不适用于手动配置为桥端口的 WDS 链路。 |
| **wds-default-bridge** (*string \| none*; 默认值：**none**) | 当 WDS 链路建立且 wds 接口状态变为 *running* 时，它将作为桥端口添加到此属性指定的桥接口。当 WDS 链路丢失时，wds 接口会从桥中移除。如果 WDS 链路激活时 wds 接口已包含在桥接设置中，则不会将其添加到由  指定的桥中，并且将（需要编辑） |
| **wds-default-cost** (*integer [1..200000000]*; 默认值：**100**) | WDS 链路的初始桥端口开销。 |
| **wds-ignore-ssid** (*yes \| no*; 默认值：**no**) | 默认情况下，两个 AP 之间的 WDS 链路只能在工作频率相同且 SSID 值相同时创建。如果此属性设置为 *yes*，则不会检查远程 AP 的 SSID。此属性对来自处于 *station-wds* 模式的客户端连接没有影响。如果 **wds-mode** 为 *static-mesh* 或 *dynamic-mesh*，它也不起作用。 |
| **wds-mode** (*disabled \| dynamic \| dynamic-mesh \| static \| static-mesh*; 默认值：**disabled**) | 控制如何与其他设备（AP 和处于 *station-wds* 模式的客户端）建立 WDS 链路。*disabled* 不允许 WDS 链路。*static* 仅允许在 WDS 中手动配置的 WDS 链路*dynamic* 还允许与未在 WDS 中配置的设备建立 WDS 链路，通过动态创建所需条目。此类动态 WDS 条目会在与另一 AP 的连接丢失后自动移除。-mesh 模式使用不同（更好）的方法在 AP 之间建立链路，该方法与非 mesh 模式下的 AP 不兼容。此方法可避免仅由两个 AP 之一创建的单边 WDS 链路。此类链路无法传递任何数据。当 AP 或站与另一 AP 建立 WDS 连接时，它使用 connect-list 检查是否允许此连接。如果处于 station-wds 模式的站与 AP 建立连接，AP 使用 access-list 检查是否允许此连接。如果模式为 station-wds，则此属性无效。 |
| **wireless-protocol** (*802.11 \| any \| nstreme \| nv2 \| nv2-nstreme \| nv2-nstreme-802.11 \| unspecified*; 默认值：**any**) | 指定无线接口上使用的协议；*unspecified* - 在以前 RouterOS 版本（v3.x、v4.x）中使用的协议模式。Nstreme 由旧的 enable-nstreme 设置启用，无法配置 Nv2。*any*：在 AP 上 - 常规 802.11 接入点或 Nstreme 接入点；在站上 - 选择接入点时不使用特定顺序，可由 connect-list 规则更改。*nstreme* - 启用 Nstreme 协议（与旧的 enable-nstreme 设置相同）。*nv2* - 启用 Nv2 协议。*nv2 nstreme*：在 AP 上 - 使用第一个 wireless-protocol 设置，始终为 Nv2；在站上 - 先搜索 Nv2 接入点，然后搜索 Nstreme 接入点。*nv2 nstreme 802.11* - 在 AP 上 - 使用第一个 wireless-protocol 设置，始终为 Nv2；在站上 - 先搜索 Nv2 接入点，然后搜索 Nstreme 接入点，然后搜索常规 802.11 接入点。⚠️ **警告：** Nv2 不支持虚拟 AP |
| **wmm-support** (*disabled \| enabled \| required*; 默认值：**disabled**) | 指定是否启用  [WMM](../../bridging-and-switching/user-guides/wmm-and-vlan-priority.md)。  仅适用于 B 和 G 频段。其他频段将无论此设置如何都会启用 |
| **wps-mode** (*disabled \| push-button \| push-button-virtual-only*; 默认值：**取决于设备型号**) | [WPS 服务器](./wireless-interface.md#wps-server) |

### 重置物理接口 MAC 地址 {#reset-physical-interface-mac-address}

物理接口 MAC 地址可通过命令 `reset-mac-address` 重置为默认值。

```ros
/interface/wireless/reset-mac-address wlan1
```

### 发射功率表示方式 {#transmit-power-representation}

802.11n 无线芯片组表示每链功率。802.11ac 无线芯片组表示总功率。

| 无线芯片组 | 启用的链数 | 每链功率 | 总功率 |
| :-- | --: | :-- | :-- |
| 802.11n | 1 | 等于所选 Tx Power | 等于所选 Tx Power |
| 802.11n | 2 | 等于所选 Tx Power | +3dBm |
| 802.11n | 3 | 等于所选 Tx Power | +5dBm |
| 802.11ac | 1 | 等于所选 Tx Power | 等于所选 Tx Power |
| 802.11ac | 2 | -3dBm | 等于所选 Tx Power |
| 802.11ac | 3 | -5dBm | 等于所选 Tx Power |
| 802.11ac | 4 | -6dBm | 等于所选 Tx Power |

### 基础速率和 MCS 速率表 {#basic-and-mcs-rate-table}

默认基础速率和支持速率，取决于所选频段

| 频段 | 基础速率 | basic-HT-mcs | basic-VHT-mcs | VHT-mcs | HT-mcs | 支持的速率 |
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

当 **rate-set=configured** 时使用的设置

| 频段 | 使用的设置 |
| :-- | :-- |
| 2.4ghz-b | basic-b, supported-b |
| 2.4ghz-b/g, 2.4ghz-onlyg | basic-b, supported-b, basic-a/g, supported-a/g |
| 2.4ghz-onlyn, 2.4ghz-b/g/n | basic-b, supported-b, basic-a/g, supported-a/g, ht-basic-mcs, ht-supported-mcs |
| 2.4ghz-g/n | basic-a/g,supported-a/g,ht-basic-mcs,ht-supported-mcs |
| 5ghz-a | basic-a/g,supported-a/g |
| 5ghz-a/n, 5ghz-onlyn | basic-a/g,supported-a/g,ht-basic-mcs,ht-supported-mcs |
| 5ghz-a/n/ac, 5ghz-onlyac | basic-a/g,supported-a/g,ht-basic-mcs,ht-supported-mcs,vht-basic-mcs,vht-supported-mcs |

独立于 **rate-set** 的设置：

1. 根据链数允许的 MCS：
   - 1 链：0-7
   - 2 链：0-15
   - 3 链：0-23
2. 如果未使用标准信道宽度（20MHz），则 2GHz 模式（2.4GHz-b 除外）不使用 b 速率（1-11）

### 帧保护支持（RTS/CTS） {#frame-protection-support-rtscts}

802.11 标准通过使用 RTS/CTS 协议提供保护传输免受其他设备传输影响的方法。帧保护有助于应对“隐藏节点”问题。有几种保护类型：

- 基于 RTS/CTS 的保护 - 愿意发送帧的设备首先发送 RequestToSend 帧，并等待来自预期目标的 ClearToSend 帧。通过“看到”RTS 或 CTS 帧，符合 802.11 的设备知道有人即将发送，因此自身不发起传输。
- 基于 "CTS to self" 的保护 - 愿意发送帧的设备发送一个“发给自身”的 CTS 帧。与 RTS/CTS 协议一样，每个接收到此帧的符合 802.11 的设备都知道不要发送。基于 "CTS to self" 的保护开销较小，但必须考虑到这仅能防止接收到 CTS 帧的设备发送（例如，如果有 2 个“隐藏”站，使用 "CTS to self" 保护对它们没有用处，因为它们将无法接收另一站发送的 CTS——在这种情况下，站必须使用 RTS/CTS，以便另一站通过看到 AP 发送的 CTS 知道不要发送）。

保护模式由无线接口的 **hw-protection-mode** 设置控制。可能的值：**none** - 无保护（默认），**rts-cts** 用于基于 RTS/CTS 的保护，或 **cts-to-self** 用于基于 "CTS to self" 的保护。

应使用保护时的帧大小阈值由无线接口的 **hw-protection-threshold** 设置控制。

例如，要在 AP 上对所有帧启用基于 "CTS-to-self" 的帧保护（不取决于大小），请使用命令：

```
[admin@MikroTik] /interface/wireless> set 0 hw-protection-mode=cts-to-self hw-protection-threshold=0
```

要在客户端上启用基于 RTS/CTS 的保护，请使用命令：

```
[admin@MikroTik] /interface/wireless> set 0 hw-protection-mode=rts-cts hw-protection-threshold=0
```

### Nv2 {#nv2}

MikroTik 开发了一种基于 TDMA 技术（时分多址）的新无线协议 -（Nstreme 版本 2）。请参阅 Nv2 文档：[Nv2](./nv2.md)

TDMA 是一种用于共享介质网络的信道接入方法。它允许多个用户通过将信号划分为不同的时隙来共享同一频率信道。用户一个接一个地快速连续发送，每个用户使用自己的时隙。这允许多个站共享同一传输介质（例如无线电频率信道），同时仅使用其信道容量的一部分。

Nv2 最重要的优势是：

- 提高速度。
- PTM 环境中更多的客户端连接。
- 更低延迟。
- 无距离限制。
- 长距离无惩罚。

Nv2 协议限制为 511 个客户端。

:::warning
 Nv2 不支持虚拟 AP
:::

#### Nv2 故障排查 {#nv2-troubleshooting}

通过 **tdma-period-size** 提高长距离链路的吞吐量。在每个“周期”中，接入点留出一部分时间不用于数据传输（等于*往返时间*——即帧可以从客户端发送和接收的时间），用于确保客户端在向接入点发送自己的数据包之前能够接收到来自接入点的最后一个帧。距离越长，未使用的时间段越长。

例如，接入点与客户端之间的距离为 30km。帧在一个方向上发送耗时 100us；因此往返时间约为 200us。**tdma-period-size** 默认值为 2ms，这意味着 10% 的时间未使用。当 tdma-period-size 增加到 4ms 时，只有 5% 的时间未使用。对于 60km 的无线链路，往返时间为 400us，默认 tdma-period-size 2ms 时未使用时间为 20%，4ms 时为 10%。更大的 tdma-period-size 值会增加链路延迟。

## 访问列表 {#access-list}

**子菜单：** `/interface/wireless/access-list`

接入点使用访问列表来限制来自其他设备的允许连接，并控制连接参数。

访问列表规则会逐条处理，直到找到匹配规则。然后执行匹配规则中的操作。如果操作指定应接受客户端，则接受该客户端，并可能用访问列表规则中指定的参数覆盖其默认连接参数。

访问列表规则有以下参数：

- 客户端匹配参数：
  - address - 客户端的 MAC 地址。
  - interface - 可选接口，用于与客户端实际连接的接口进行比较。
  - time - 规则匹配的当天时间和星期几。
  - signal-range - 客户端信号必须处于该范围内，规则才会匹配。
  - allow-signal-out-of-range - 允许客户端信号始终或在一定时间间隔内超出范围的选项。
- 连接参数：
  - ap-tx-limit - 到客户端方向的 TX 速率限制。
  - client-tx-limit - 到 AP 方向的 TX 速率限制（仅适用于 RouterOS 客户端）。
  - private-passphrase - 如果使用某种 PSK 认证算法，则用于此客户端的 PSK 密码短语。
  - vlan-mode - VLAN 标记模式，指定来自客户端的流量是否应被标记（并在发往客户端时取消标记）。
  - vlan-id - 执行 VLAN 标记时使用的 VLAN ID。

操作：

- 访问列表规则按顺序检查。
- 禁用的规则始终被忽略。
- 仅应用第一个匹配的规则。
- 如果远程连接没有匹配规则，则使用无线接口配置中的默认值。
- 如果远程设备匹配的规则具有 **authentication**=*no* 值，则来自该远程设备的连接被拒绝。

:::warning
如果 ACL 中没有关于连接到 AP 的客户端的条目（wireless,debug wlan2: A0:0B:BA:D7:4D:B2 not in local ACL, by default accept），则该客户端的 ACL 在整个连接期间将被忽略。
:::

例如，如果客户端在连接期间的信号为 -41，并且我们有 ACL 规则

```
/interface/wireless/access-list
add authentication=yes forwarding=yes interface=wlan2 signal-range=-55..0
```

那么该连接会匹配到 ACL 规则，但如果信号降到 -55 以下，客户端不会断开。

如果在无线接口上设置了 `default-authentication=yes`，即使没有匹配的访问列表条目，客户端也可以加入。  
为了正确运行，客户端必须匹配其中一个 ACL 规则。

如果我们把上一个示例中的 ACL 规则修改为：

```
/interface/wireless/access-list
add interface=wlan2 signal-range=-55..0
add authentication=no forwarding=no interface=wlan2 signal-range=-120..-56
```

那么如果信号降到 -56，客户端将被断开。

### 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **ap-tx-limit** (*integer [0..4294967295]*; 默认值：**0**) | 限制向此客户端传输数据的速率。值 *0* 表示无限制。值单位为比特每秒。 |
| **authentication** (*yes \| no*; 默认值：**yes**) | *no* - 客户端关联将始终失败。*yes* - 使用接口的 [**security-profile**](../../cli-reference/interface/list/index.md) 中指定的认证过程。 |
| **client-tx-limit** (*integer [0..4294967295]*; 默认值：**0**) | 请求客户端限制数据传输速率。值 *0* 表示无限制。这是一个专有扩展，受 RouterOS 客户端支持。值单位为比特每秒。 |
| **comment** (*string*; 默认值： ) | 条目的简短描述 |
| **disabled** (*yes \| no*; 默认值：**no**) |  |
| **forwarding** (*yes \| no*; 默认值：**yes**) | *no* - 客户端无法向连接到同一接入点的其他站发送帧。*yes* - 客户端可以向同一接入点上的其他站发送帧。 |
| **interface** (*string \| any \| all*; 默认值：**any**) | **interface**=*any* 的规则用于任何无线接口，而 **interface**=*all* 定义 [接口列表](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md) 的“all”名称。要使规则仅适用于一个无线接口，请将该接口指定为此属性的值。 |
| **mac-address** (*MAC*; 默认值：**00:00:00:00:00:00**) | 规则匹配具有指定 MAC 地址的客户端。值 *00:00:00:00:00:00* 始终匹配。 |
| **management-protection-key** (*string*; 默认值：**""**) *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* |  |
| **private-algo** (*104bit-wep \| 40bit-wep \| aes-ccm \| none \| tkip*; 默认值：**none**) | 仅用于 WEP 模式。 |
| **private-key** (*string*; 默认值：**""**) *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 仅用于 WEP 模式。 |
| **private-pre-shared-key** (*string*; 默认值：**""**) *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用于 WPA PSK 模式。 |
| **signal-range** (*NUM..NUM - both NUM are numbers in the range -120..120*; 默认值：**-120..120**) | 如果站的信号强度在范围内，则规则匹配。如果站的信号强度超出规则中指定的范围，接入点将断开该站。 |
| **time** (*TIME-TIME,sun,mon,tue,wed,thu,fri,sat - TIME is time interval 0..86400 seconds; all day names are optional; value can be unset*; 默认值： ) | 规则仅在指定时间内匹配。站将在指定时间结束后断开。开始时间和结束时间均表示为自午夜 00:00 起的时间。规则仅在指定的星期几匹配。 |

## 对齐 {#align}

**子菜单：** `/interface/wireless/align`

Align 工具用于帮助对准运行此工具的设备。

| 属性 | 说明 |
| :-- | :-- |
| **active-mode** (*yes \| no*; 默认值：**yes**) | 如果处于活动模式，将发送用于对准的帧。 |
| **audio-max** (*integer [-2147483648..2147483647]*; 默认值：**-20**) | 蜂鸣器的最大信号强度 |
| **audio-min** (*integer [-2147483648..2147483647]*; 默认值：**-100**) | 蜂鸣器的最小信号强度 |
| **audio-monitor** (*MAC*; 默认值：**00:00:00:00:00:00**) | 用于音频监控的 MAC 地址 |
| **filter-mac** (*MAC*; 默认值：**00:00:00:00:00:00**) | 将在监控屏幕中显示的过滤掉的 MAC 地址。 |
| **frame-size** (*integer [200..1500]*; 默认值：**300**) | 监控器使用的帧大小。 |
| **frames-per-second** (*integer [1..100]*; 默认值：**25**) | 帧发送间隔 |
| **receive-all** (*yes \| no*; 默认值：**no**) | 如果设置为 "yes"，监控器将找到所有可用设备。 |
| **ssid-all** (*yes \| no*; 默认值：**no**) | 是否在监控器中显示所有 SSID，还是仅显示无线设置中配置的一个。 |

### 菜单专用命令 {#menu-specific-commands}

| 属性 | 说明 |
| :-- | :-- |
| **monitor** (*interface name*) | 启动对准监控 |
| **test-audio** (*integer [-2147483648..2147483647]*) | 测试蜂鸣器 |

## 连接列表 {#connect-list}

**子菜单：** `/interface/wireless/connect-list`

connect-list 用于为与远程接入点的连接分配优先级和安全设置，并限制允许的连接。connect-list 是有序规则列表。connect-list 中的每条规则都附加到特定无线接口，由该规则的 `interface` 属性指定（这与 [access-list](./wireless-interface.md#access-list) 不同，后者的规则可适用于所有接口）。规则可以匹配远程接入点的 MAC 地址、其信号强度以及许多其他参数。

操作：

- connect-list 规则始终从第一条开始按顺序检查。
- 禁用的规则始终被忽略。
- 仅应用第一个匹配的规则。
- 如果在无线接口配置中提供了 SSID 或确切的无线协议，则连接列表中未包含在无线接口配置中的 SSID 或无线协议将被忽略。
- 如果 connect-list 没有匹配远程接入点的规则，则使用无线接口配置中的默认值。
- 如果接入点匹配的规则具有 **connect**=*no* 值，则不会尝试与该接入点连接。
- 如果接入点匹配的规则具有 **connect**=*yes* 值，则将尝试与该接入点连接。
  - 在站模式下，如果有多个远程接入点匹配具有 **connect**=*yes* 值的连接列表规则，则将尝试与 connect-list 中位置更高的规则所匹配的接入点连接。
  - 如果没有远程接入点匹配具有 **connect**=*yes* 值的 connect-list 规则，则 **default-authentication** 接口属性的值决定站是否会尝试连接任何接入点。如果 **default-authentication**=*yes*，站将选择信号最佳且安全兼容的接入点。
- 在接入点模式下，connect-list 在建立与远程设备的 WDS 链路之前检查。如果接入点不匹配连接列表中的任何规则，则 **default-authentication** 的值决定是否建立 WDS 链路。

### 属性 {#properties-1}

| 属性 | 描述 |
| :-- | :-- |
| **3gpp** (*string*; 默认值： ) |  |
| **area-prefix** (*string*; 默认值： ) | 如果 AP 的 area 值（专有扩展）以指定值开头，则规则匹配。**area** 值是专有扩展。 |
| **comment** (*string*; 默认值： ) | 条目的简短描述 |
| **connect** (*yes \| no*; 默认值：**yes**) | 可用选项：*yes* - 连接到匹配此规则的接入点。*no* - 不连接到任何匹配此规则的接入点。 |
| **disabled** (*yes \| no*; 默认值：**no**) |  |
| **mac-address** (*MAC*; 默认值：**00:00:00:00:00:00**) | 规则仅匹配具有指定 MAC 地址的 AP。值 *00:00:00:00:00:00* 始终匹配。 |
| **security-profile** (*string \| none*; 默认值：**none**) | 连接到匹配接入点时使用的 [安全配置文件](./wireless-interface.md#security-profiles) 名称。如果此属性的值为 *none*，则使用接口配置中指定的安全配置文件。在站模式下，规则仅匹配支持指定安全配置文件的接入点。值 *none* 将匹配支持接口配置中指定安全配置文件的接入点。在接入点模式下，此属性的值不会用于匹配远程设备。 |
| **signal-range** (*NUM..NUM - both NUM are numbers in the range -120..120*; 默认值：**-120..120**) | 如果接入点的信号强度在范围内，则规则匹配。如果站与匹配此规则的接入点建立连接，当信号强度超出指定范围时，它将从该接入点断开。 |
| **ssid** (*string*; 默认值：**""**) | 规则匹配具有此 SSID 的接入点。空值匹配任何 SSID。此属性仅在站模式接口的 **ssid** 为空，或接入点模式接口的 **wds-ignore-ssid**=*yes* 时生效 |
| **wireless-protocol** (*802.11 \| any \| nstreme \| tdma*; 默认值：**any**) |  |
| **interface** (*string*; 默认值： ) | connect list 中的每条规则仅适用于此设置指定的一个无线接口。 |

### 用法 {#usage}

#### 仅允许站连接到特定接入点 {#restrict-station-connections-only-to-specific-access-points}

- 将 **default-authentication** 接口属性的值设置为 *no*。

```ros
/interface/wireless/set station-wlan default-authentication=no
```

- 创建匹配允许的接入点的规则。这些规则必须具有 **connect**=*yes*，并且 **interface** 等于站无线接口的名称。

```ros
/interface/wireless/connect-list/add interface=station-wlan connect=yes mac-address=00:11:22:33:00:01
/interface/wireless/connect-list/add interface=station-wlan connect=yes mac-address=00:11:22:33:00:02
```

#### 禁止连接到特定接入点 {#disallow-connections-to-specific-access-points}

- 将 **default-authentication** 接口属性的值设置为 *yes*。

```ros
/interface/wireless/set station-wlan default-authentication=yes
```

- 创建 **connect**=*no* 规则，匹配站不应连接的那些接入点。这些规则必须具有 **connect**=*no*，并且 **interface** 等于站无线接口的名称。

```ros
/interface/wireless/connect-list/add interface=station-wlan connect=no mac-address=00:11:22:33:44:55
```

#### 选择首选接入点 {#select-preferred-access-points}

- 创建匹配首选接入点的规则。这些规则必须具有 **connect**=*yes*，并且 **interface** 等于站无线接口的名称。
- 将匹配首选接入点的规则按优先级顺序放在 connect-list 中更高的位置。

#### 限制 WDS 链路建立 {#restrict-wds-link-establishment}

- 将匹配允许的接入点的规则放在顶部。
- 在连接列表末尾添加 deny-all 规则。

## 信息 {#info}

**子菜单：** `/interface/wireless/info`

| 属性 | 说明 |
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
| **country-info**() | 以国家/地区名称作为参数，显示可用频段、频率以及每个频率的最大发射功率。 |
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

| 属性 | 描述 |
| :-- | :-- |
| **comment** (*string*; 默认值： ) | 条目的简短描述 |
| **manual-tx-powers** (*list of [Rate:TxPower];* Rate ::= 11Mbps \| 12Mbps \| 18Mbps \| 1Mbps \| 24Mbps \| ... *TxPower ::= integer [-30..30]*; 默认值： ) |  |
| **name** (*string*) | 将应用 TX 功率的无线接口名称。 |

## 无线硬件表 {#wireless-hardware-table}

:::danger
您必须遵守所在国家/地区的法规域要求。如果允许您使用其他频率，请注意天线增益和发射功率可能因板和频率而异。设备仅针对法规频率进行校准。使用非标准频率风险自负。该列表仅指定无线芯片接受的频率，这些频率可能由于产品内置天线、设备设计、滤波器和其他因素而并不总是有效。严格风险自负
:::
可以从产品页面推断支持的信道宽度。为此，您需要检查以下参数：**链数**和**最大数据速率**。了解这些参数后，您需要检查调制和编码方案（MCS）表，例如这里：https://mcsindex.com/。

以 hAP ac 为例，我们可以看到链数为 3，MCS 表中的最大数据速率为 1300。在 MCS 表中，我们需要找到 3 个空间流——链——的条目以及相应的数据速率，这在此例中表明 80MHz 是支持的最大信道宽度。

**集成无线接口频率表：**

| 板名称 | 无线接口 | 频率范围 [MHz] | 支持的信道宽度 [MHz] |
| :-- | --: | :-- | :-- |
| 2011UAS-2HnD | 1 | 2312-2732 | 20,40 |
| 751G-2HnD | 1 | 2200-2700 | 20,40 及高级信道支持 |
| 751U-2HnD | 1 | 2200-2700 | 20,40 及高级信道支持 |
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
| 22UGS-5HPacD2HnD | 2 | 4920-5925,2412-2482 | 20,40,80 及 20,40 |
| 921UAGS-5SHPacD-NM | 1 | 4920-6100 | 20,40,80 |
| 921UAGS-5SHPacT-NM | 1 | 4920-6100 | 20,40,80 |
| 922UAGS-5HPacD /-NM | 1 | 4920-6100 | 20,40,80 |
| 922UAGS-5HPacT /-NM | 1 | 4920-6100 | 20,40,80 |
| 941-2nD /-TC | 1 | 2312-2732 | 20,40 |
| 951G-2HnD | 1 | 2312-2732 | 20,40 |
| 951Ui-2HnD | 1 | 2312-2732 | 20,40 |
| 951Ui-2nD | 1 | 2312-2732 | 20,40 |
| 952Ui-5ac2nD /-TC | 2 | 2312-2732,4920-6100 | 20,40 及 20,40,80 |
| 953GS-5HnT /-RP | 1 | 4920-6100 | 5,10,20,40 |
| 962UiGS-5HacT2HnT | 2 | 2312-2732,4920-6100 | 20,40 及 20,40,80 |
| cAP2n | 1 | 2312-2732 | 20,40 |
| cAP2nD | 1 | 2312-2732 | 20,40 |
| cAPL-2nD | 1 | 2312-2732 | 20,40 |
| CRS109-8G-1S-2HnD-IN | 1 | 2312-2732 | 20,40 |
| CRS125-24G-1S-2HnD-IN | 1 | 2312-2732 | 20,40 |
| Disc-5nD | 1 | 4920-6100 | 20,40 |
| DynaDishG-5HacD | 1 | 4920-6100 | 5<sup>1</sup>,10<sup>1</sup>,20,40,80 |
| DynaDishG-6HnD | 1 | 5500-6500 | 20,40 |
| Groove52HPn | 1 | 4920-6100,2312-2732 | 5,10,20,40 及 5,10,20,40 |
| GrooveA-52HPn | 1 | 4920-6100,2312-2732 | 5,10,20,40 及 5,10,20,40 |
| GrooveG-52HPacn | 1 | 4920-6100,2312-2732 | 20,40,80 及 20,40 |
| GrooveGA-52HPacn | 1 | 4920-6100,2312-2732 | 20,40,80 及 20,40 |
| LDF-5nD | 1 | 4920-6100 | 20,40 |
| LHG-5nD | 1 | 4920-6100 | 20,40 |
| mAP2n | 1 | 2312-2732 | 20,40 |
| mAP2nD | 1 | 2312-2732 | 20,40 |
| mAPL-2nD | 1 | 2312-2732 | 20,40 |
| Metal2SHPn | 1 | 2200-2700 | 20,40 及高级信道支持 |
| Metal5SHPn | 1 | 4800-6100 | 5,10,20,40 及高级信道支持 |
| Metal9HPn | 1 | 902-928 | 5,10,20 |
| MetalG-52SHPacn | 1 | 4920-6100,2312-2732 | 20,40,80 及 20,40 |
| OmniTikG-5HacD | 1 | 4920-6100 | 20,40,80 |
| OmniTikPG-5HacD | 1 | 4920-6100 | 20,40,80 |
| OmniTIKU-5HnD | 1 | 4800-6100 | 5,10,20,40 |
| OmniTIKUPA-5HnD | 1 | 4800-6100 | 5,10,20,40 |
| QRTG-2SHPnD | 1 | 2312-2732 | 20,40 |
| SEXTANTG-5HPnD | 1 | 4920-6100 | 20,40 |
| SXT2nDr2 | 1 | 2312-2732 | 20,40 |
| SXT5HacD2n | 2 | 2312-2732,4920-6100 | 5<sup>1</sup>,10<sup>1</sup>,20,40 及 5<sup>1</sup>,10<sup>1</sup>,20,40,80 |
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
| wAPG-5HacT2HnD /-BE | 2 | 2312-2732,4920-6100 | 20,40 及 20,40,80 |
| R11e-2HnD | 1 | 2312-2732 | 20,40 |
| R11e-2HPnD | 1 | 2312-2732 | 20,40 |
| R11e-5HacD | 1 | 4920-6100 | 20,40,80 |
| R11e-5HacT | 1 | 4920-6100 | 20,40,80 |
| R11e-5HnD | 1 | 4920-6100 | 20,40 |
| R2SHPn | 1 | 2200-2700 | 20,40 及高级信道支持 |
| R52H | 1 | 4920-6100,2192-2507 | 20 及 20 |
| R52HnD | 1 | 4800-6100,2200-2700 | 20,40 及 20,40 |
| R52nM | 1 | 4800-6100,2200-2700 | 20,40 及 20,40 及高级信道支持 |
| R5SHPn | 1 | 4800-6100 | 20,40 及高级信道支持 |

**注意：**

1. 仅适用于 802.11a/n 标准。

## 高级信道 {#advanced-channels}

高级信道功能为无线接口配置提供了更多可能性：

- 覆盖多个频段和信道宽度的 scan-list。
- 对于允许的硬件，支持非标准信道中心频率（以 kHz 为粒度指定）。
- 对于允许的硬件，支持非标准信道宽度（以 kHz 为粒度指定）。

### 硬件支持 {#hardware-support}

非标准中心频率和宽度信道只能与支持它们的接口一起使用。

只有基于 **Atheros AR92xx** 的芯片支持非标准中心频率和宽度，范围如下：

- 中心频率范围：2200 MHz-2500 MHz，步进 0.5 MHz（500 kHz），宽度范围：2.5 MHz-30 MHz，步进 0.5 MHz（500 kHz）。
- 中心频率范围：4800 MHz-6100 MHz，步进 0.5 MHz（500 kHz），宽度范围：2.5 MHz-30 MHz，步进 0.5 MHz（500 kHz）。

AR93xx 不支持此功能。

## 配置高级信道 {#configuring-advanced-channels}

高级信道在 **interface wireless channels** 菜单中配置。此菜单包含用户定义信道的有序列表，可通过 **list** 属性进行分组。信道具有以下属性：

- **name** - 可用于引用此信道的名称。如果在添加信道时未指定 **name**，则会根据信道频率和宽度自动生成。
- **list** - 此信道所属列表的名称。列表可用于对信道进行分组。
- **frequency** - 信道中心频率，单位为 MHz，允许指定小数 MHz 部分，例如 **5181.5**。
- **width** - 信道宽度，单位为 MHz，允许指定小数 MHz 部分，例如 **14.5**。
- **band** - 定义使用此信道时的默认数据速率集合。
- **extension-channel** - 指定 11n 扩展信道的位置。

## 使用高级信道 {#using-advanced-channels}

要在无线接口配置中使用高级信道，有几个接口设置接受信道名称或列表名称作为参数。可以为接口配置其不支持的频道。在这种情况下，接口将无法运行。管理员完全负责以正确方式配置信道。

### frequency {#frequency}

要为无线接口使用特定的高级信道（适用于使用接口 **frequency** 设置的模式），请在接口 **frequency** 设置中指定信道名称。例如，要将接口配置为以 5500MHz 中心频率和 14MHz 信道宽度运行，请使用以下命令：

```
[admin@MikroTik] /interface/wireless> channels add name=MYCHAN frequency=5500 width=14 band=5ghz-onlyn
 list=MYLIST
[admin@MikroTik] /interface/wireless> set wlan1 frequency=MYCHAN 
```

### scan-list {#scan-list}

接口 **scan-list** 用于多种模式，这些模式要么收集信道列表信息（例如交互式 **scan** 命令），要么选择要工作的信道（例如任何 **station** 模式或执行 DFS 的 AP 模式）。接口 **scan-list** 可以配置为以下各项的逗号分隔列表：

- **default** - 给定国家/地区、接口频段和信道宽度的默认 .11 信道列表。
- 以 MHz 为单位的数字频率范围。
- 按名称引用的高级信道。
- 按列表名称引用的高级信道列表。

例如，要将接口配置为首先使用 20MHz 信道宽度扫描 5180MHz、5200MHz 和 5220MHz，然后使用 10MHz 信道宽度，可以发出以下命令：

```
[admin@MikroTik] /interface/wireless> channels add frequency=5180 width=20 band=5ghz-a list=20MHz-list
[admin@MikroTik] /interface/wireless> channels add frequency=5200 width=20 band=5ghz-a list=20MHz-list
[admin@MikroTik] /interface/wireless> channels add frequency=5220 width=20 band=5ghz-a list=20MHz-list
[admin@MikroTik] /interface/wireless> channels add frequency=5180 width=10 band=5ghz-a list=10MHz-list
[admin@MikroTik] /interface/wireless> channels add frequency=5200 width=10 band=5ghz-a list=10MHz-list
[admin@MikroTik] /interface/wireless> channels add frequency=5220 width=10 band=5ghz-a list=10MHz-list
[admin@MikroTik] /interface/wireless> set wlan1 scan-list=20MHz-list,10MHz-list
```

## Nstreme {#nstreme}

**子菜单：** `/interface/wireless/nstreme`

此菜单允许将无线卡切换到 nstreme 模式。在这种情况下，该卡将仅与 nstreme 客户端配合工作。

| 属性 | 描述 |
| :-- | :-- |
| **comment** (*string*; 默认值： ) | 条目的简短描述 |
| **disable-csma** (*yes \| no*; 默认值：**no**) | 使用轮询时禁用 CSMA/CA（性能更好） |
| **enable-nstreme** (*yes \| no*; 默认值：**no**) | 是否将卡切换到 nstreme 模式 |
| **enable-polling** (*yes \| no*; 默认值：**yes**) | 是否对客户端使用轮询 |
| **framer-limit** (*integer [100..4000]*; 默认值：**3200**) | 最大帧大小 |
| **framer-policy** (*best-fit \| dynamic-size \| exact-size \| none*; 默认值：**none**) | 合并帧的方法。可以将多个帧合并为更大的帧，以减少协议开销（从而提高速度）。卡不会等待帧，但如果有多 个数据包排队等待发送，它们可以被合并。有几种组帧方法：**none** - 不做特殊处理，不合并数据包（禁用组帧）**best-fit** - 在达到 framer-limit 限制之前，尽可能多地将数据包放入一个帧中，但不分片数据包**exact-size** - 在达到 framer-limit 限制之前，尽可能多地将数据包放入一个帧中，即使需要分片（最佳性能）**dynamic-size** - 动态选择最佳帧大小 |
| **name** (*string*) | 将应用设置的接口名称。只读。 |

:::note
这里的设置（启用 Nstreme 除外）仅与接入点相关，对客户端设备将被忽略。客户端会自动适配 AP 设置。  
Nstreme 协议的 WDS 需要在其中一个对端使用 station-wds 模式。AP 模式（bridge 和 ap-bridge）之间的 WDS 配置将无法工作。
:::

## Nstreme Dual {#nstreme-dual}

**子菜单：** `/interface/wireless/nstreme-dual`

两个处于 nstreme-dual-slave 模式的无线电可以组合在一起，形成 nstreme2 点对点连接。要将无线接口放入 nstreme2 组，应将其模式设置为 nstreme-dual-slave。使用 nstreme2 时，/interface/wireless 菜单中的许多参数会被忽略，但以下参数除外：

- frequency-mode
- country
- antenna-gain
- tx-power
- tx-power-mode
- antenna-mode

| 属性 | 描述 |
| :-- | :-- |
| **arp** (*disabled \| enabled \| proxy-arp \| reply-only*; 默认值：**enabled**) | [ARP](../../getting-started/networking-fundamentals/index.md#arp-and-tying-it-all-together) |
| **comment** (*string*; 默认值： ) | 条目的简短描述 |
| **disable-csma** (*yes \| no*; 默认值：**no**) | 禁用 CSMA/CA（性能更好） |
| **disable-running-check** (*yes \| no*; 默认值：**no**) | 即使没有连接到远程对端，是否也应始终将接口视为正在运行 |
| **disabled** (*yes \| no*; 默认值：**yes**) |  |
| **framer-limit** (*integer [64..4000]*; 默认值：**2560**) | 最大帧大小 |
| **framer-policy** (*best-fit \| exact-size \| none*; 默认值：**none**) | 合并帧的方法。可以将多个帧合并为一个更大的帧，以减少协议开销（从而提高速度）。卡不会等待帧，但如果有多 个数据包排队等待发送，它们可以被合并。有几种组帧方法：**none** - 不做特殊处理，不合并数据包**best-fit** - 在达到 framer-limit 限制之前，尽可能多地将数据包放入一个帧中，但不分片数据包**exact-size** - 在达到 framer-limit 限制之前，尽可能多地将数据包放入一个帧中，即使需要分片（最佳性能） |
| **ht-channel-width** (*2040mhz \| 20mhz \| 40mhz*; 默认值：**20mhz**) |  |
| **ht-guard-interval** (*both \| long \| short*; 默认值：**long**) |  |
| **ht-rates** (*list of rates [1,2,3,4,5,6,7,8]*; 默认值：**1,2,3,4,5,6,7,8**) |  |
| **ht-streams** (*both \| double \| single*; 默认值：**single**) |  |
| **l2mtu** (*integer [0..65536]*; 默认值： ) |  |
| **mtu** (*integer [0..65536]*; 默认值：**1500**) |  |
| **name** (*string*; 默认值： ) | 条目名称 |
| **rates-a/g** (*list of rates [6Mbps,9Mbps, 12Mbps, 18Mbps, 24Mbps, 36Mbps, 48Mbps, 54Mbps]*; 默认值：**6Mbps,9Mbps,12Mbps, 18Mbps, 24Mbps, 36Mbps, 48Mbps, 54Mbps**) | 802.11a 或 802.11g 标准中要支持的速率 |
| **rates-b** (*list of rates [1Mbps, 2Mbps, 5.5Mbps, 11Mbps]*; 默认值：**1Mbps, 2Mbps, 5.5Mbps, 11Mbps**) | 802.11b 标准中要支持的速率 |
| **remote-mac** (*MAC*; 默认值：**00:00:00:00:00:00**) | 要连接到的 MAC 地址（这将是远程接收卡的 MAC 地址） |
| **rx-band** (*2ghz-b \| 2ghz-g \| 2ghz-n \| 5ghz-a \| 5ghz-n*; 默认值： ) | 接收无线电的工作频段 |
| **rx-channel-width** (*20mhz \| 40mhz \| 10mhz \| 5mhz*; 默认值：**20mhz**) |  |
| **rx-frequency** (*integer [0..4294967295]*; 默认值： ) | RX 卡工作频率，单位为 Mhz。 |
| **rx-radio** (*string*; 默认值： ) | 用于接收的接口名称。 |
| **tx-band** (*2ghz-b \| 2ghz-g \| 2ghz-n \| 5ghz-a \| 5ghz-n*; 默认值： ) | 发射无线电的工作频段 |
| **tx-channel-width** (*20mhz \| 40mhz \| 10mhz \| 5mhz*; 默认值：**20mhz**) |  |
| **tx-frequency** (*integer [0..4294967295]*; 默认值： ) | TX 卡工作频率，单位为 Mhz。 |
| **tx-radio** (*string*; 默认值： ) | 用于发送的接口名称。 |

:::warning
WDS 不能用于 Nstreme-dual 链路。
:::

:::note
**tx-freq** 与 **rx-freq** 之间的差值应为约 200 MHz 或更大，因为可能存在干扰。
:::

:::note
您可以为 RX 和 TX 链路使用不同频段。例如，在 2ghz-g 中发送，并使用 2ghz-b 频段接收数据。
:::

## 注册表 {#registration-table}

**子菜单：** `/interface/wireless/registration-table`

在注册表中，您可以查看当前已连接客户端的各种信息。它仅用于接入点。

所有属性均为只读。

| 属性 | 说明 |
| :-- | :-- |
| **802.1x-port-enabled** (*yes \| no*) | 是否允许与该对端进行数据交换（即，如果需要，802.1x 认证是否已完成） |
| **ack-timeout** (*integer*) | ack-timeout 的当前值 |
| **ap** (*yes \| no*) | 显示已注册设备是否配置为接入点。 |
| **ap-tx-limit** (*integer*) | AP 上的传输速率限制，单位为比特每秒 |
| **authentication-type** () | 用于该对端的认证方法 |
| **bridge** (*yes \| no*) |  |
| **bytes** (*integer , integer*) | 已发送和已接收的数据包字节数 |
| **client-tx-limit** (*integer*) | 客户端上的传输速率限制，单位为比特每秒 |
| **comment** (*string*) | 条目的描述。如果指定，注释取自相应的 [访问列表](./wireless-interface.md#access-list) 条目。 |
| **compression** (*yes \| no*) | 此对端是否使用数据压缩 |
| **distance** (*integer*) |  |
| **eap-identity**(*string*) | 客户端向 RADIUS 服务器认证时使用的 EAP 身份。 |
| **encryption** (*aes-ccm \| tkip*) | 使用的单播加密算法 |
| **evm-ch0** () |  |
| **evm-ch1** () |  |
| **evm-ch2** () |  |
| **frame-bytes** (*integer,integer*) | 已发送和已接收的数据字节数，不包括头部信息 |
| **frames** (*integer,integer*) | 需要通过无线链路发送的帧数。此值可与 **hw-frames** 比较，以检查无线重传。  |
| **framing-current-size** (*integer*) | 当前合并帧的大小 |
| **framing-limit** (*integer*) | 合并帧的最大大小 |
| **framing-mode** () | 合并帧的方法 |
| **group-encryption** () | 使用的组加密算法 |
| **hw-frame-bytes** (*integer,integer*) | 已发送和已接收的数据字节数，包括头部信息 |
| **hw-frames** (*integer,integer*) | 驱动程序通过无线链路发送的帧数。此值可与 **frames** 比较，以检查无线重传。  |
| **interface** (*string*) | 无线客户端关联到的无线接口名称 |
| **last-activity** (*time*) | 接口最后一次数据 tx/rx 活动 |
| **last-ip** (*IP Address*) | 从已注册客户端收到的最后一个 IP 数据包中找到的 IP 地址 |
| **mac-address** (*MAC*) | 已注册客户端的 MAC 地址 |
| **management-protection** (*yes \| no*) |  |
| **nstreme** (*yes \| no*) | 显示是否启用了 [Nstreme](./wireless-interface.md#nstreme) |
| **p-throughput** (*integer*) | 考虑到有效传输速率和硬件重试，预期到给定对端的估计近似吞吐量。每 5 秒计算一次 |
| **packed-bytes** (*integer, integer*) | 为发送/接收（组帧）打包到较大帧中的字节数 |
| **packed-frames** (*integer, integer*) | 为发送/接收（组帧）打包到较大帧中的帧数 |
| **packets** (*integer,integer*) | 已发送和已接收的网络层数据包数 |
| **radio-name** (*string*) | 对端的 radio name |
| **routeros-version** (*string*) | 已注册客户端的 RouterOS 版本 |
| **rx-ccq** () | 接收方向的客户端连接质量（CCQ）。  |
| **rx-rate** (*integer*) | 接收数据速率 |
| **signal-strength** (*integer*) | AP 接收到的客户端信号平均强度 |
| **signal-strength-ch0** () |  |
| **signal-strength-ch1** () |  |
| **signal-strength-ch2** () |  |
| **signal-to-noise** () |  |
| **strength-at-rates** () | 不同速率下的信号强度水平，以及使用这些速率的时间 |
| **tdma-retx** () |  |
| **tdma-rx-size** () |  |
| **tdma-timing-offset** () | tdma-timing-offset 与 **distance** 成正比，约为传播延迟的两倍。AP 测量此值，以便告诉客户端其传输应使用的偏移量——然后客户端从目标传输时间中减去此偏移量，从而考虑传播延迟，使传输在预期时间到达 AP。对于近距离客户端，您可能偶尔会看到小的负值（例如几 usec），这是由于发送器或接收器硬件中可能产生的额外未计入延迟，不同芯片组有所不同。 |
| **tdma-tx-size** (*integer*) | 以字节为单位的值，指定设备发送的可检测丢失的数据单元大小（计算 CRC 的数据单元）。一般来说——越大越好，因为开销更少。另一方面，此设置中的小值不能总被视为连接质量差的信号——如果设备没有足够多待处理数据以使用更大的数据单元（例如，如果您只是通过链路 ping），此值不会上升。 |
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
| **wds** (*yes \| no*) | 已连接客户端是否使用 WDS |
| **wmm-enabled** (*yes \| no*) | 显示是否启用了 [WMM](../../bridging-and-switching/user-guides/wmm-and-vlan-priority.md)。 |

## 安全配置文件 {#security-profiles}

**子菜单：** `/interface/wireless/security-profiles`

安全配置文件在控制台的 **/interface/wireless/security-profiles** 路径下配置，或在 WinBox 的“Wireless”窗口的“Security Profiles”选项卡中配置。安全配置文件由无线接口的 [security-profile](./wireless-interface.md#general-interface-properties) 属性和连接列表的 [security-profile](./wireless-interface.md#general-interface-properties) 属性引用。

### 基本属性 {#basic-properties}

| 属性 | 描述 |
| :-- | :-- |
| **mode** (*none \| static-keys-optional \| static-keys-required \| dynamic-keys*; 默认值：**none**) | 安全配置文件的加密模式。none - 不使用加密。不接受加密帧。static-keys-required - WEP 模式。不接受也不发送未加密帧。处于 *static-keys-required* 模式的站不会连接到处于 *static-keys-optional* 模式的接入点。static-keys-optional - WEP 模式。支持加密和解密，但也允许接收和发送未加密帧。如果加密算法指定为 *none*，设备将发送未加密帧。处于 *static-keys-optional* 模式的站不会连接到处于 *static-keys-required* 模式的接入点。另请参阅：[static-sta-private-algo](./wireless-interface.md#properties-1)、[static-transmit-key](./wireless-interface.md#properties-1)。dynamic-keys - WPA 模式。 |
| **name** (*text*; 默认值： ) | 安全配置文件的名称 |

### WPA 属性 {#wpa-properties}

这些属性仅在 **mode** 设置为 *dynamic-keys* 时生效。

| 属性 | 描述 |
| :-- | :-- |
| **authentication-types** (*wpa-psk \| wpa2-psk \| wpa-eap \| wpa2-eap*; 默认值： ) | 支持的认证类型集合，可选择多个值。接入点将通告支持的认证类型，客户端仅在支持任何通告的认证类型时才会连接到接入点。 |
| **disable-pmkid** (*no \| yes*; 默认值：**no**) | 是否将 PMKID 包含在接入点发送的 EAPOL 帧中。禁用 PMKID 可能导致与使用 PMKID 连接到接入点的设备出现兼容性问题。yes - 从 EAPOL 帧中移除 PMKID（提高安全性，降低兼容性）。no - 将 PMKID 包含在 EAPOL 帧中（降低安全性，提高兼容性）。此属性仅对接入点有效。 |
| **unicast-ciphers** (*tkip \| aes-ccm*; 默认值：**aes-ccm**) | 接入点通告其支持指定加密套件，可选择多个值。客户端仅尝试连接到至少支持指定加密套件之一的接入点。其中一个加密套件将用于加密接入点和站之间发送的单播帧。 |
| **group-ciphers** (*tkip \| aes-ccm*; 默认值：**aes-ccm**) | 接入点通告这些加密套件之一，可选择多个值。接入点使用它来加密所有广播和组播帧。客户端仅尝试连接到使用指定组加密套件之一的接入点。tkip - 临时密钥完整性协议 - 一种加密协议，与旧版 WEP 设备兼容，但经过增强以纠正一些 WEP 缺陷。aes-ccm - 更安全的 WPA 加密协议，基于可靠的 AES（高级加密标准）。没有 WEP 遗留问题的网络应仅使用此加密套件。 |
| **group-key-update** (*time: 30s..1d*; 默认值：**5m**) | 控制接入点更新组密钥的频率。此密钥用于加密所有广播和组播帧。此属性仅对 Access Points 有效。 |
| **wpa-pre-shared-key** (*text*; 默认值： ) *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | WPA 预共享密钥模式要求 BSS 中的所有设备具有公共秘密密钥。此密钥的值可以是任意文本。通常称为 WPA 模式的网络密码。此属性仅在 *wpa-psk* 添加到 **authentication-types** 时生效。 |
| **wpa2-pre-shared-key** (*text*; 默认值： ) *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | WPA2 预共享密钥模式要求 BSS 中的所有设备具有公共秘密密钥。此密钥的值可以是任意文本。通常称为 WPA2 模式的网络密码。此属性仅在 *wpa2-psk* 添加到 **authentication-types** 时生效。 |

:::note
 RouterOS 还允许使用 [private-pre-shared-key](./wireless-interface.md#access-list) 属性或 RADIUS MAC 认证响应中的 [Mikrotik-Wireless-Psk](./wireless-interface.md#radius-mac-authentication) 属性覆盖特定客户端的预共享密钥值。这是一个扩展。
:::

#### WPA EAP 属性 {#wpa-eap-properties}

这些属性仅在 **authentication-types** 包含 *wpa-eap* 或 *wpa2-eap*，且 **mode** 设置为 *dynamic-keys* 时生效。

| 属性 | 描述 |
| :-- | :-- |
| **eap-methods** (*eap-tls \| eap-ttls-mschapv2 \| passthrough \| peap*; 默认值：**passthrough**) | 允许的认证方法类型，可选择多个值。此属性仅对 Access Points 有效。eap-tls - 使用内置 EAP TLS 认证。支持客户端和服务器证书。请参阅 **tls-mode** 和 **tls-certificate** 属性的描述。eap-ttls-mschapv2 - 使用带 MS-CHAPv2 认证的 EAP-TTLS。passthrough - 接入点将把认证过程转发到 RADIUS 服务器。peap - 使用受保护的 EAP 认证。 |
| **supplicant-identity** (*text*; 默认值：**[身份](../../system-information-and-utilities/identity.md)**) | 客户端在 EAP 认证开始时发送的 EAP 身份。此值用作 RADIUS EAP 计费和 RADIUS EAP 直通认证发送的 RADIUS 消息中 User-Name 属性的值。 |
| **mschapv2-username** (*text*; 默认值： ) | 使用 *eap-ttls-mschapv2* 或 *peap* 认证方法时用于认证的用户名。此属性仅对 Stations 有效。 |
| **mschapv2-password** (*text*; 默认值： ) *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 使用 *eap-ttls-mschapv2* 或 *peap* 认证方法时用于认证的密码。此属性仅对 Stations 有效。 |
| **tls-mode** (*verify-certificate \| dont-verify-certificate \| no-certificates \| verify-certificate-with-crl*; 默认值：**no-certificates**) | 此属性仅在 **eap-methods** 包含 *eap-tls* 时生效。verify-certificate - 要求远程设备具有有效证书。检查它是否由已知证书颁发机构签名。不进行额外的身份验证。证书可能包含有关其有效期的信息。如果路由器的时间和日期不正确，它可能拒绝有效证书，因为路由器的时钟不在该期间内。另请参阅 [证书](../../authentication-authorization-accounting/certificates.md) 配置。dont-verify-certificate - 不检查远程设备的证书。接入点不会要求客户端提供证书。no-certificates - 不使用证书。TLS 会话使用 2048 位匿名 Diffie-Hellman 密钥交换建立。verify-certificate-with-crl - 与 *verify-certificate* 相同，但还会通过检查证书吊销列表来检查证书是否有效。 |
| **tls-certificate** (*none \| name*; 默认值：**none**) | 当配置了接入点且 **tls-mode** 设置为 *verify-certificate* 或设置为 *dont-verify-certificate* 时，接入点始终需要证书。客户端仅在接入点配置为 **tls-mode** 设置为 *verify-certificate* 时才需要证书。在这种情况下，客户端需要由接入点已知的 CA 签名的有效证书。此属性仅在 **tls-mode** 未设置为 *no-certificates* 且 **eap-methods** 包含 *eap-tls* 时生效。 |

:::note
`eap-methods` 中允许的认证方法顺序很重要，发送给 Station 的认证方法提议将使用相同顺序。示例：接入点使用安全配置文件，其中 **eap-methods** 设置为 *eap-tls*、*passthrough*；1) 接入点向客户端提供 EAP-TLS 方法；2) 客户端拒绝；3) 接入点开始将 EAP 通信转发到 RADIUS 服务器。
:::
:::note
 当 AP 用于直通时，AP 本身不需要证书，AP 设备作为透明网桥工作，并将 EAP-TLS 关联数据从 RADIUS 服务器转发到终端客户端。
:::
:::note
 当 `tls-mode` 使用 `verify-certificate` 或 `dont-verify-certificate` 时，远程设备必须支持 *RC4-MD5*、*RC4-SHA* 或 *DES-CBC3-SHA* TLS 加密套件之一。使用 `no-certificates` 模式时，远程设备必须支持 "ADH-DES-CBC3-SHA" 加密套件。
:::

#### RADIUS 属性 {#radius-properties}

| 属性 | 描述 |
| :-- | :-- |
| **radius-mac-authentication** (*yes \| no*; 默认值：**no**) | 此属性影响接入点处理未在 [访问列表](./wireless-interface.md#radius-mac-authentication) 中找到的客户端的方式。no - 根据无线接口的 [default-authentication](./wireless-interface.md#general-interface-properties) 属性的值允许或拒绝客户端认证。yes - 使用客户端的 MAC 地址作为用户名查询 RADIUS 服务器。使用此设置时，[default-authentication](./wireless-interface.md#general-interface-properties) 的值无效。 |
| **radius-mac-accounting** (*yes \| no*; 默认值：**no**) |  |
| **radius-eap-accounting** (*yes \| no*; 默认值：**no**) |  |
| **radius-called-format** (*mac \| mac:ssid \| ssid*; 默认值：**mac:ssid**) |  |
| **interim-update** (*time*; 默认值：**0**) | 使用 RADIUS 计费时，接入点会定期向 RADIUS 服务器发送计费信息更新。此属性指定默认更新间隔，可由 RADIUS 服务器使用 [Acct-Interim-Interval](./wireless-interface.md#radius-mac-authentication) 属性覆盖。 |
| **radius-mac-format** (*XX:XX:XX:XX:XX:XX \| XXXX:XXXX:XXXX \| XXXXXX:XXXXXX \| XX-XX-XX-XX-XX-XX \| XXXXXX-XXXXXX \| XXXXXXXXXXXX \| XX XX XX XX XX XX \| lower case;* 默认值：**XX:XX:XX:XX:XX:XX**) | 控制接入点在 MAC 认证和 MAC 计费 RADIUS 请求的 User-Name 属性中如何编码客户端的 MAC 地址。 |
| **radius-mac-mode** (*as-username \| as-username-and-password*; 默认值：**as-username**) | 默认情况下，接入点在 MAC 认证期间发送 Access-Request 时使用空密码。当此属性设置为 *as-username-and-password* 时，接入点将把与 User-Name 属性相同的值用于 User-Password 属性。 |
| **radius-mac-caching** (*disabled \| time*; 默认值：**disabled**) | 如果此值设置为时间间隔，接入点将缓存 RADIUS MAC 认证响应指定时间，并且如果已存在匹配的缓存条目，则不会联系 RADIUS 服务器。值 *disabled* 将禁用缓存，接入点将始终联系 RADIUS 服务器。 |

#### WEP 属性 {#wep-properties}

这些属性仅在 **mode** 设置为 *static-keys-required* 或 *static-keys-optional* 时生效。

| 属性 | 说明 |
| :-- | :-- |
| **static-key-0 \| static-key-1 \| static-key-2 \| static-key-3** (*hex*; 默认值： ) *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 密钥的十六进制表示。密钥长度必须适合所选算法。请参阅 [静态配置的 WEP 密钥](./wireless-interface.md#statically-configured-wep-keys) 部分。 |
| **static-algo-0 \| static-algo-1 \| static-algo-2 \| static-algo-3** (*none \| 40bit-wep \| 104bit-wep \| tkip \| aes-ccm*; 默认值：**none**) | 与相应密钥一起使用的加密算法。 |
| **static-transmit-key** (*key-0 \| key-1 \| key-2 \| key-3*; 默认值：**key-0**) | 接入点将使用指定密钥为不使用私有密钥的客户端加密帧。接入点还将使用此密钥加密广播和组播帧。如果 **static-sta-private-algo** 设置为 *none*，客户端将使用指定密钥加密帧。如果相应的 **static-algo-N** 属性的值设置为 *none*，则帧将以未加密方式发送（当 **mode** 设置为 *static-keys-optional* 时），或者根本不会发送（当 **mode** 设置为 *static-keys-required* 时）。 |
| **static-sta-private-key** (*hex*; 默认值： ) *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 密钥长度必须适合所选算法，请参阅 [静态配置的 WEP 密钥](./wireless-interface.md#statically-configured-wep-keys) 部分。此属性仅在 Stations 上使用。接入点使用来自 [private-key](./wireless-interface.md#access-list) 属性或 [Mikrotik-Wireless-Enc-Key](./wireless-interface.md#radius-mac-authentication) 属性的相应密钥。 |
| **static-sta-private-algo** (*none \| 40bit-wep \| 104bit-wep \| tkip \| aes-ccm*; 默认值：**none**) | 与站私有密钥一起使用的加密算法。值 *none* 禁用私有密钥的使用。此属性仅在 Stations 上使用。接入点必须从 [private-algo](./wireless-interface.md#access-list) 属性或 [Mikrotik-Wireless-Enc-Algo](./wireless-interface.md#radius-mac-authentication) 属性获取相应值。站私有密钥会替换单播帧的密钥 0。站不会使用私有密钥解密广播帧。 |

### 管理帧保护 {#management-frame-protection}

***用于**：防止去认证攻击、MAC 地址克隆问题。*

RouterOS 实现了一种基于共享秘密的专有管理帧保护算法。管理帧保护意味着 RouterOS 无线设备能够验证管理帧的来源，并确认特定帧不是恶意的。此功能允许抵御针对基于 RouterOS 的无线设备的去认证和解除关联攻击。

管理保护模式在安全配置文件中通过 **management-protection** 设置配置。可能的值为：**disabled** - 管理保护已禁用（默认），**allowed** - 如果远程方支持，则使用管理保护（对于 AP - 允许非管理保护和管理保护客户端，对于客户端 - 连接到支持和不支持管理保护的 AP），**required** - 仅与支持管理保护的远程设备建立关联（对于 AP - 仅接受支持管理保护的客户端，对于客户端 - 仅连接到支持管理保护的 AP）。

管理保护共享秘密通过安全配置文件 **management-protection-key** 设置配置。

当接口处于 AP 模式时，默认管理保护密钥（在安全配置文件中配置）可由访问列表或 RADIUS 属性中指定的密钥覆盖。

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
RADIUS MAC 认证由接入点用于未在 [access-list](./wireless-interface.md#access-list) 中找到的客户端，类似于无线接口的 **default-authentication** 属性。它控制是否允许客户端继续认证，还是立即拒绝。
:::
当 **radius-mac-authentication**=*yes* 时，接入点通过发送具有以下属性的 Access-Request 来查询 RADIUS 服务器：

- User-Name - 客户端 MAC 地址。按照 **radius-mac-format** 设置指定的方式进行编码。默认编码为 "XX:XX:XX:XX:XX:XX"。
- Nas-Port-Id - 无线接口的 **name**。
- User-Password - 当 **radius-mac-mode**=*as-username-and-password* 时，设置为与 User-Name 相同的值。否则此属性为空。
- Calling-Station-Id - 客户端 MAC 地址，编码为 "XX-XX-XX-XX-XX-XX"。
- Called-Station-Id - 接入点的 MAC 地址和 SSID，编码为 "XX-XX-XX-XX-XX-XX:SSID"（由减号分隔的 MAC 地址数字对，后跟冒号，再后跟 SSID 值）。
- Acct-Session-Id - 当 **radius-mac-accounting**=*yes* 时添加。

当接入点收到来自 RADIUS 服务器的 Access-Accept 或 Access-Reject 响应时，它会存储响应并允许或拒绝客户端。接入点使用 Access-Accept 响应中的以下 RADIUS 属性：

- Ascend-Data-Rate。
- Ascend-Xmit-Rate。
- Mikrotik-Wireless-Forward - 与 [access-list](./wireless-interface.md#access-list) 的 **forwarding** 相同。
- Mikrotik-Wireless-Enc-Algo - 与 [access-list](./wireless-interface.md#access-list) 的 **private-algo** 相同。
- Mikrotik-Wireless-Enc-Key - 与 [access-list](./wireless-interface.md#access-list) 的 **private-key** 相同。
- Mikrotik-Wireless-Psk - 与 [access-list](./wireless-interface.md#access-list) 的 **private-pre-shared-key** 相同。
- Mikrotik-Wireless-Mpkey - 与访问列表中的 Management-protection-key 相同。
- Session-Timeout - 在此时间后客户端将断开连接。
- Acct-Interim-Interval - 覆盖 **interim-update** 的值。
- Class - 如果存在，此属性的值将被保存并包含在 Accounting-Request 消息中。

**缓存**：

添加 RADIUS MAC 认证缓存是为了支持那些需要接入点非常快速响应关联请求的客户端的 RADIUS 认证。此类客户端在收到 RADIUS 服务器响应之前就会超时。接入点会缓存认证响应一段时间，并可以立即回复来自同一客户端的重复关联请求。

#### RADIUS EAP 直通认证 {#radius-eap-pass-through-authentication}

使用 WPA EAP 认证类型时，已通过 MAC 认证的客户端需要执行 EAP 认证，然后才被授权在无线网络上传递数据。使用直通 EAP 方法时，接入点将把认证转发到 RADIUS 服务器，并在 Access-Request RADIUS 消息中使用以下属性：

- User-Name - EAP 请求者身份。此值在客户端安全配置文件的 **supplicant-identity** 属性中配置。
- Nas-Port-Id - 无线接口的 **name**。
- Calling-Station-Id - 客户端 MAC 地址，编码为 "XX-XX-XX-XX-XX-XX"。
- Called-Station-Id - 接入点的 MAC 地址和 SSID，编码为 "XX-XX-XX-XX-XX-XX:SSID"（由减号分隔的 MAC 地址数字对，后跟冒号，再后跟 SSID 值）。
- Acct-Session-Id - 当 **radius-eap-accounting**=*yes* 时添加。
- Acct-Multi-Session-Id - 接入点和客户端的 MAC 地址，以及一个唯一的 8 字节值，该值在所有共享单个 EAP 认证的计费会话之间共享。编码为 *AA-AA-AA-AA-AA-AA-CC-CC-CC-CC-CC-CC-XX-XX-XX-XX-XX-XX-XX-XX。* 当 radius-eap-accounting=yes 时添加。

接入点使用 Access-Accept 服务器响应中的以下 RADIUS 属性：

- Class - 如果存在，此属性的值将被保存并包含在 Accounting-Request 消息中。
- Session-Timeout - 在此时间后客户端将断开连接。此外，接入点将记住认证结果，如果在此期间客户端重新连接，它将立即被授权，而无需重复 EAP 认证。
- Acct-Interim-Interval - 覆盖 **interim-update** 的值。

#### 静态配置的 WEP 密钥 {#statically-configured-wep-keys}

不同算法需要不同长度的密钥：

- *40bit-wep* - 10 个十六进制数字（40 位）。如果密钥更长，则仅使用前 40 位。
- *104bit-wep* - 26 个十六进制数字（104 位）。如果密钥更长，则仅使用前 104 位。
- *tkip* - 至少 64 个十六进制数字（256 位）。
- *aes-ccm* - 至少 32 个十六进制数字（128 位）。

密钥必须包含偶数个十六进制数字。

#### WDS 安全配置 {#wds-security-configuration}

WDS 链路可以使用所有可用的安全功能。但是，它们需要仔细配置安全参数。

可以为所有客户端使用一个安全配置文件，并为 WDS 链路使用不同的安全配置文件。WDS 链路的安全配置文件在 [connect-list](./wireless-interface.md#connect-list) 中指定。接入点在与另一接入点建立 WDS 链路之前始终检查连接列表，并使用匹配的连接列表条目中的安全设置。当每个接入点都有匹配另一设备的连接列表条目、具有 **connect**=*yes* 并指定兼容的 **security-profile** 时，WDS 链路将工作。

**WDS 和 WPA/WPA2：**

如果接入点使用 **mode**=*dynamic-keys* 的安全配置文件，则所有 WDS 链路都将使用加密。由于 WPA 认证和密钥交换不是对称的，其中一个接入点将充当客户端以建立安全连接。这类似于 *static-mesh* 和 *dynamic-mesh* WDS 模式的工作方式。如果启用 WPA 加密，则不会出现某些问题，例如两个配置不当且使用非 *mesh* 模式的接入点之间出现单边 WDS 链路。但是，使用 WPA 的非 *mesh* 模式仍有其他问题（例如配置不匹配时不断尝试重新连接），这些问题可通过使用 *-mesh* WDS 模式解决。

一般来说，建立受 WPA 保护的 WDS 链路的两个接入点上的 WPA 属性必须匹配。这些属性是 **authentication-types**、**unicast-ciphers**、**group-ciphers**。对于非 *mesh* WDS 模式，这些属性需要在两个设备上具有相同的值。在 *mesh* WDS 模式下，每个接入点必须支持另一个接入点作为客户端。

理论上可以为 WDS 链路使用 RADIUS MAC 认证和其他 RADIUS 服务。但是，只有一个接入点会与 RADIUS 服务器交互，另一个接入点将表现为客户端。

RouterOS 中 *eap-tls* EAP 方法的实现特别适合 WDS 链路加密。**tls-mode**=*no-certificates* 不需要额外配置，并提供非常强的加密。

**WDS 和 WEP：**

分配给 WDS 链路的安全配置文件中的 **mode**、**static-sta-private-key** 和 **static-sta-private-algo** 参数需要在建立 WEP 加密 WDS 链路的两个接入点上具有相同的值。

#### 连接列表中的安全配置文件与接入点匹配 {#security-profile-and-access-point-matching-in-the-connect-list}

客户端使用 [connect-list](./wireless-interface.md#connect-list) 的 **security-profile** 属性值来仅匹配支持必要安全的接入点。

- **mode**=*static-keys-required* 和 **mode**=*static-keys-optional* 仅匹配接口 **security-profile** 中具有相同 **mode** 的接入点。
- 如果 **mode**=*dynamic-keys*，则如果 **authentication-types**、**unicast-ciphers** 和 **group-ciphers** 都至少包含一个接入点通告的值，则连接列表条目匹配。

## 虚拟接口 {#virtual-interfaces}

### 虚拟 AP {#virtual-ap}

可以使用无线菜单中的 *add* 命令创建虚拟接入点。您必须指定虚拟接口所属的 *master-interface*。如果 "master-interface" 模式为 "station"，则虚拟 AP 仅在 "master-interface" 活动时工作。虚拟 AP 可以有自己的 SSID 和安全配置文件。

虚拟 AP 接口仅在主接口处于 *ap-bridge*、*bridge*、*station* 或 wds-slave 模式时工作。它仅与 802.11 协议工作，但不支持 Nv2。

此功能可用于为不同类型的用户分离访问。您可以为用户分配不同的带宽级别和密码，并指示用户连接到特定的虚拟网络。对无线客户端而言，它会显示为不同的 SSID 或不同的设备。例如，使用 QuickSet 配置访客网络时，后台会使用 VirtualAP 功能。

**要创建新的 virtual-ap：** `/interface> wireless add mode=ap-bridge master-interface=wlan1 ssid=guests security-profile=guests`（*此类安全配置文件需要先创建*）

:::note
每个物理接口最多可创建 127 个虚拟接口。不建议创建超过 30 个，因为性能将开始下降。
:::

### 虚拟客户端 {#virtual-clients}

也可以创建虚拟客户端，并在同一物理接口上同时拥有 AP 和客户端。这允许您仅使用一张硬件卡进行中继设置。配置过程与上述完全相同，但使用 **station** 模式：

**要创建新的 virtual-client：** `/interface> wireless add mode=station master-interface=wlan1 ssid=where-to-connect security-profile=your-profile`（*此类安全配置文件需要先创建*）

:::note
 虚拟接口将始终使用 Master 接口的无线频率。如果 Master 接口启用了 `auto` 频率，它们将使用 Master 接口所选的无线频率。
:::

## 嗅探器 {#sniffer}

**子菜单：** `/interface/wireless/sniffer`

无线嗅探器允许捕获包括 Radio 头、802.11 头和其他无线相关信息的帧。

| 属性 | 说明 |
| :-- | :-- |
| **channel-time** (; 默认值：**200ms**) | 每个信道的嗅探时长。仅在 **multiple-channels=yes** 时使用 |
| **file-limit** (*integer [10..4294967295]*; 默认值：**10**) | 用于存储捕获数据的分配文件大小（字节）。适用于指定了 **file-name** 的情况。 |
| **file-name** (*string*; 默认值： ) | 存储捕获数据的文件名。 |
| **memory-limit** (*integer [10..4294967295]*; 默认值：**10**) | 用于存储捕获数据的分配内存缓冲区，单位为千字节。 |
| **multiple-channels** (*yes \| no*; 默认值：**no**) | 是嗅探多个信道还是单个信道。**No** 表示所有信道设置将从 **/interface/wireless** 获取。**Yes** 表示所有信道设置将从 **/interface/wireless** 下的 **scan-list** 获取。 |
| **only-headers** (*yes \| no*; 默认值：**no**) | 如果设置为 yes，则嗅探器将仅捕获存储在帧头中的信息。 |
| **receive-errors** (*yes \| no*; 默认值：**no**) | 是否处理根据 FCS 判断为接收时带错误的的数据包。 |
| **streaming-enabled** (*yes \| no*; 默认值：**no**) | 是否将捕获数据流式传输到指定的流服务器 |
| **streaming-max-rate** (*integer [0..4294967295]*; 默认值：**0**) | 允许的每秒最大数据包数。**0** 等于无限制 |
| **streaming-server** (*IPv4*; 默认值：**0.0.0.0**) | 流服务器的 IP 地址。 |

:::note
当 `multiple-channels=yes` 时，使用 `/interface/wireless/info/scan-list` 命令来验证在 `/interface/wireless/channels` 下定义的 `scan-list`。
:::

### 数据包 {#packets}

**子菜单：** `/interface/wireless/sniffer/packet`

子菜单显示捕获的数据包。

## 扫描 {#scan}

Scan 命令允许您查看 scan-list 中定义的频率范围内的可用 AP。使用 scan 命令时，接口操作会被禁用（扫描操作期间无线链路会断开）。还支持后台扫描，可在无线接口操作期间使用而不会断开无线链路。后台扫描仅在使用 802.11 无线协议时受支持。

scan 工具将继续扫描 AP，直到用户停止扫描过程。可以使用 scan 工具的 `rounds` 设置来对 scan-list 条目进行特定次数的扫描。这在通过脚本运行 scan 工具时很有用。单轮 scan 命令示例：

```
/interface/wireless/scan wlan1 rounds=1
```

`save-file` 选项允许执行脚本化/计划扫描，并将结果保存到文件中以供将来分析。此外，此功能与 rounds 设置一起允许从远程无线客户端获取扫描结果——执行该命令将启动 scan 工具，断开无线链路，扫描 scan-list 中的频率，将结果保存到文件，退出扫描并重新连接无线链路。示例：

```
/interface/wireless/scan wlan1 rounds=1 save-file=scan1
```

要使用后台无线扫描，应提供 `background=yes` 设置。示例：

```
/interface/wireless/scan wlan1 background=yes
```

后台扫描功能在以下条件下工作：

- 无线接口应已启用。
- 对于处于 AP 模式的无线接口——当它工作于 802.11 协议模式并且处于固定信道时（即信道选择和初始雷达检查已完成）。
- 对于处于 Station 模式的无线接口——当它连接到 802.11 协议 AP 时。

Scan 命令在虚拟无线接口上也受支持，但有以下限制：

- 当虚拟接口及其 master 固定在一个信道上时可行（master AP 正在运行，或 master station 已连接到 AP）。
- 扫描仅在 master 接口所在的信道上进行。
- `background=yes|no` 无关紧要——在虚拟接口上扫描不会断开客户端/AP，因此它始终是“后台”扫描。

## Snooper {#snooper}

此工具监控周围频率使用情况，并显示哪些设备占用每个频率。它在控制台和 WinBox 中均可用。Snooper 将使用 scan-list 中的频率。

**子菜单：** `/interface/wireless/snooper`

![](/img/4f1988b92537fbed.webp)

![](/img/fd8ec072bb88c200.webp)

### 设置 {#settings}

![](/img/e9bdf175bc8c36cd.webp)

## 频谱扫描 {#spectral-scan}

- 请参阅单独的文档 [频谱扫描](./spectral-scan.md)。

## WDS {#wds}

**子菜单：** `/interface/wireless/wds`

**属性：**

| 属性 | 说明 |
| :-- | :-- |
| **arp** (*disabled \| enabled \| proxy-arp \| reply-only*; 默认值：**enabled**) |  |
| **comment** (*string*; 默认值： ) |  |
| **disable-running-check** (*yes \| no*; 默认值：**no**) |  |
| **disabled** (*yes \| no*; 默认值：**yes**) |  |
| **l2mtu** (*integer [0..65536]*; 默认值： ) |  |
| **master-interface** (*string*; 默认值： ) |  |
| **mtu** (*integer [0..65536]*; 默认值：**1500**) |  |
| **name** (*string*; 默认值： ) |  |
| **wds-address** (*MAC*; 默认值：**00:00:00:00:00:00**) |  |

**只读属性：**

| 属性 | 说明 |
| :-- | :-- |
| **dynamic** (*yes \| no*) |  |
| **mac-address** (*MAC*) |  |
| **running** (*yes \| no*) |  |

## WPS {#wps}

无线接口同时支持 WPS 服务器和 WPS 客户端。

### WPS 服务器 {#wps-server}

WPS 服务器允许支持 WPS 的无线客户端连接到受预共享密钥保护的 AP，而无需在客户端配置中指定该密钥。

可以通过更改无线接口的 WPS Mode 设置来启用 WPS 服务器。示例：

```
 /interface/wireless/set wlan1 wps-mode=push-button
```

Wps-mode 有 3 个选项

- disabled
- push-button - WPS 通过按下板上的物理按钮激活（少数板卡在机壳/标签上标有此类按钮）
- push-button-virtual-only - WPS 通过从 RouterOS 无线接口菜单按下 "WPS Accept" 按钮激活

通过按下 WPS 物理/虚拟按钮，AP 启用 WPS 功能。如果 2 分钟内未启动 WPS 过程，WPS Accept 功能将停止。

在少数标有物理 WPS 按钮的板卡上，WPS 服务器默认启用。例如 hap lite、hap、hap ac lite、hap ac、map lite。

WPS 服务器仅在无线 AP 接口启用了预共享密钥认证（PSK）时活动。也可以为虚拟 AP 接口配置此模式。

### WPS 客户端 {#wps-client}

WPS 客户端功能允许无线客户端获取已启用 WPS 服务器的 AP 的预共享密钥配置。WPS 客户端可通过以下命令启用：

```
 /interface/wireless/wps-client/wlan1
```

WPS 客户端命令会在屏幕上输出有关已启用 WPS 的 AP 的所有信息。示例：

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

- create-profile - 创建具有指定名称的无线安全配置文件，使用从 WPS AP 接收的安全详细信息进行配置，并指定无线接口使用新创建的安全配置文件。
- ssid - 仅从具有指定 SSID 的 AP 获取 WPS 信息。
- mac-address - 仅从具有指定 mac-address 的 AP 获取 WPS 信息。

## 中继器 {#repeater}

无线中继器允许从 AP 接收信号，并使用同一物理接口在本地重复信号，以连接其他客户端。这将允许为无线客户端扩展无线服务。无线中继器功能将配置无线接口以使用 station-bridge 或 station-pseudobridge 选项连接到 AP，创建虚拟 AP 接口，创建桥接接口，并将两个接口（主接口和虚拟接口）都添加到桥端口。

如果您的 AP **支持按键启用的 WPS** 模式，可以使用自动设置命令：

```
/interface/wireless/setup-repeater wlan1
```

setup-repeater 执行以下步骤：

- 搜索已按下按钮的 WPS AP。
- 从 AP 获取 SSID、密钥、信道。
- 重置主 master 接口配置（与 reset-configuration 相同）。
- 移除此 master 上添加的虚拟接口所添加的所有桥端口（以便之后没有悬空无效的桥端口）。
- 移除此 master 上添加的所有虚拟接口。
- 创建名为 "`<interfacename>-<ssid>-repeater`" 的安全配置文件，如果此类安全配置文件已存在，则不创建新的，只更新设置。
- 配置 master 接口，接口模式选择如下：如果 AP 支持桥接模式，使用 station-bridge；否则如果 AP 支持 WDS，使用 station-wds；否则使用 station-pseudobridge。
- 创建具有与 master 相同 SSID 和安全配置文件的虚拟 AP 接口。
- 如果 master 接口不在某个桥中，则创建新的桥接口并将 master 接口添加到其中。
- 将虚拟 AP 接口添加到 master 接口所在的同一桥中。

如果您的 AP **不支持 WPS**，可以使用以下参数手动指定设置：

- **address** - 要为其设置中继器的 AP 的 MAC 地址（可选）
- **ssid** - 要为其设置中继器的 AP 的 SSID（可选）
- **passphrase** - 要用于 AP 的密钥——如果指定了此项，命令将仅扫描 AP，并根据 beacon 中的信息和此密码短语创建安全配置文件。如果未指定此项，命令将执行 WPS 以找出密码短语。

## 漫游 {#roaming}

### 站漫游 {#station-roaming}

站漫游功能仅适用于 802.11 无线协议，且仅适用于站模式。当 RouterOS 无线客户端使用 802.11 无线协议连接到 AP 时，它将按特定时间间隔定期执行后台扫描。当后台扫描找到信号更好的 AP 时，它将尝试漫游到该 AP。当无线信号变差时，后台扫描之间的时间间隔将变短；当无线客户端信号变好时，后台扫描间隔将变长。

## VLAN 标记 {#vlan-tagging}

**子菜单：** `/interface/wireless`

使用 VLAN 标记，可以在“本地转发”AP（无线接口与以太网桥接的 AP）的以太网侧分离虚拟 AP 流量。这对于在 AP 的以太网侧分离例如“管理”和“访客”网络流量是必要的。

VLAN 分配给无线接口，因此来自无线的所有数据都会使用此标记进行标记，并且只有带有此标记的数据才会通过无线发送出去。这适用于所有无线协议，但在 Nv2 上不支持虚拟 AP。

您可以配置 RADIUS 认证服务器，以便在用户或用户组向网络认证时为其分配特定 VLAN。要使用此选项，您需要使用 [RADIUS 属性](../../authentication-authorization-accounting/radius.md)。

| 属性 | 描述 |
| :-- | :-- |
| **vlan-mode** (*no-tag \| use-service-tag \| use-tag*; 默认值：**no-tag**) | 有三种 VLAN 模式可用：*no-tag* - AP 不使用 VLAN 标记*use-service-tag* - VLAN ID 使用 802.1ad 标记类型*use-tag* - VLAN ID 使用 802.1q 标记类型 |
| **vlan-id** (*integer [1..4095]*; 默认值：**1**) | VLAN 标识号 |

### VLAN 标记覆盖 {#vlan-tag-override}

可以通过访问列表和 RADIUS 属性（对于常规无线和无线控制器均适用）基于每个客户端覆盖每接口 VLAN 标记。

这样，即使在同一个接口上，也可以分离无线客户端之间的流量，但必须谨慎使用——只会发送“接口 VLAN”广播/组播流量。如果其他（被覆盖的）VLAN 也需要正常工作的广播/组播，目前可以使用 multicast-helper（这会将每个组播数据包改为单播，然后仅发送给具有匹配 VLAN ID 的客户端）。

## WinBox {#winbox}

[WinBox](../../management-tools/winbox.md) 是一个小型实用程序，允许使用快速简单的 GUI 管理 MikroTik RouterOS。

:::note
 Current Tx Power 显示特定数据速率下使用的发射功率。Atheros 802.11ac 芯片（例如 QCA98xx）不支持此功能。
:::

## Interworking Realms 设置 {#interworking-realms-setting}

有关 interworking 配置文件的更多信息，请参阅 [互通配置文件](./interworking-profiles.md)。

**realms-raw** - 一个包含十六进制值的字符串列表。每个字符串指定 "NAI Realm Tuple" 的内容，不包括 "NAI Realm Data Field Length" 字段。

每个十六进制编码字符串必须由以下字段组成：

```
- NAI Realm Encoding (1 byte)
- NAI Realm Length (1 byte)
- NAI Realm (variable)
- EAP Method Count (1 byte)
- EAP Method Tuples (variable)
```

例如，值 "00045465737401020d00" 解码为：

```
- NAI Realm Encoding: 0 (rfc4282)
- NAI Realm Length: 4
- NAI Realm: Test
- EAP Method Count: 1
- EAP Method Length: 2
- EAP Method Tuple: TLS, no EAP method parameters
```

设置 "realms-raw=00045465737401020d00" 产生的通告内容与设置 "realms=Test:eap-tls" 相同。

有关完整的 NAI Realm 编码，请参阅 802.11-2016 第 9.4.5.10 节。

## 迁移说明 {#migration-notes}

以下术语和打包在较旧的 RouterOS 版本中发生了变化。此处仅作为参考，供迁移非常旧配置的人员使用——在当前 RouterOS 上，这些都不需要任何操作。

- **Superchannel / `frequency-mode`。** `superchannel` 频率模式以前称为 *Custom Frequency Upgrade*，需要特殊许可证密钥。自 RouterOS v4.3 起，它已在所有安装中无需密钥即可使用。
- **无线驱动程序包。** RouterOS v6 将无线功能拆分到单独的 `wireless-rep`、`wireless-cm2` 和 `wireless-fp` 包中。RouterOS v7 将这些合并到单个 `wireless` 包中，因此曾经需要这些包之一的功能——虚拟客户端、后台扫描、WPS 客户端、RADIUS VLAN 分配以及 `scan-list` step 选项——现在都是标准 `wireless` 包的一部分。
