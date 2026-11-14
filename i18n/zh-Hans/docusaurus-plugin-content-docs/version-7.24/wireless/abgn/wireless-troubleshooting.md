---
sidebar_key: "wireless/abgn/wireless-troubleshooting"
sidebar_position: 8
title: "无线故障排查"
sidebar_label: "无线故障排查"
description: "本页介绍如何通过启用并分析详细的调试日志来排查 MikroTik RouterOS 中的无线连接问题，这些日志涵盖客户端连接、断开连接以及 MIC 故障或雷达检测等安全事件。"
tags:
  - 'wireless'
  - 'debug-logs'
  - 'station-mode'
source: https://manual.mikrotik.com/docs/7.24/wireless/abgn/wireless-troubleshooting
captured_at: '2026-11-04T11:35:36+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 无线调试日志 {#wireless-debug-logs}

使用日志调试无线问题。

默认情况下，RouterOS 无线日志以简单条目显示客户端连接和断开：

```ros
22:32:18 wireless,info 00:80:48:41:AF:2A@wlan1: connected
```

对于普通用户来说，知道 MAC 地址为 "00:80:48:41:AF:2A" 的无线客户端已连接到无线接口 "wlan1" 就足够了。但实际上，可用的日志条目比标准日志记录中显示的更多。它们被称为 'debug' 日志，可提供更详细的信息。在下面的调试日志示例中，你将看到同一个客户端连接到 AP 的详细过程，比典型日志记录中看到的信息更多：

```ros
22:33:20 wireless,debug wlan1: 00:80:48:41:AF:2A attempts to connect
22:33:20 wireless,debug wlan1: 00:80:48:41:AF:2A not in local ACL, by default accept
22:33:20 wireless,info 00:80:48:41:AF:2A@wlan1: connected
```

调试日志会为你提供客户端无线连接和断开过程中每个步骤的更具体信息。第一行显示无线客户端尝试连接到 AP。第二行显示 AP 检查该客户端是否被允许连接到 AP，并显示结果操作。只有第三行你才会看到客户端已连接。这只是调试日志消息的一个示例。所有调试条目的说明写在下面。

要启用无线调试日志，应执行以下命令：

```ros
[admin@MikroTik] > /system/logging                                            
[admin@MikroTik] /system/logging> add topics=wireless,debug action=memory
```

这将帮助你轻松理解和修复无线问题，并减少与支持团队的交互。

### STATION 模式 {#station-mode}

```ros
<MAC>@<DEV>: lost connection, <REASON>
```

station 因 \<REASON\> 失去了与 AP 的连接。

```ros
<MAC>@<DEV>: failed to connect, <REASON>
```

station 尝试连接到 AP，但由于 \<REASON\> 而失败。

```ros
<MAC>@<DEV>: established connection on <FREQ>, SSID <SSID>
```

station 尝试并成功连接到 SSID 为 \<SSID\>、频率为 \<FREQ\> 的 AP。

```ros
<MAC>@<DEV>: MIC failure!!!
```

TKIP 消息完整性检查失败，肯定有人试图入侵或对网络进行 DOS 攻击。如果在 60 秒内遇到超过 1 次 MIC 失败，就会进入 "TKIP countermeasures" 状态。

```ros
<MAC>@<DEV>: enter TKIP countermeasures
```

已进入 TKIP countermeasures 状态，这意味着 station 将与 AP 断开连接并保持静默 60 秒。

### AP 模式 {#ap-mode}

```ros
<DEV>: radar detected on <FREQ>
```

在频率 \<FREQ\> 上检测到雷达，AP 将寻找另一个信道。

```ros
<DEV>: data from unknown device <MAC>, sent deauth [(XXX events suppressed, YYY deauths suppressed)]
```

收到了来自未知设备（即未注册到此 AP）且 MAC 地址为 \<MAC\> 的数据帧，AP 向其发送了取消认证帧（按照 802.11）。XXX 是未记录的事件数量，这样日志不会变得过大（在前 5 条之后，日志限制为每 5 秒 1 条条目），YYY 是本应发送但未发送的取消认证帧数量，这样就不会浪费资源发送过多取消认证帧（每秒只允许 10 个取消认证帧）。

此类消息的可能原因是，之前连接到该 AP 的 station 仍在向 AP 发送数据，而 AP 尚不知道它已从 AP 注册表中被移除。取消认证消息会告诉 station 它不再处于连接状态。

```ros
<DEV>: denying assoc to <MAC>, failed to setup compression
```

在 AP 上初始化压缩失败，最可能是因为尝试连接并使用压缩的客户端太多。

```ros
<DEV>: <MAC> is new WDS master
```

WDS slave 已与 WDS master 建立连接，这意味着 WDS slave 开始接受客户端并充当 AP。

```ros
<DEV>: <MAC> was WDS master
```

此消息在失去与 \<MAC\> 的连接后出现，这意味着 WDS slave 将断开所有客户端，并开始扫描以寻找新的 WDS master。

```ros
<MAC>@<DEV>: connected [, is AP][, wants WDS]
```

地址为 \<MAC\> 的 station 已连接。如果存在 "is AP"，则远程设备是 AP；如果存在 "wants WDS"，则远程设备希望建立 WDS 链路。

```ros
<MAC>@<DEV>: disconnected, <REASON>
```

与地址为 \<MAC\> 的 station 的连接因 \<REASON\> 而终止。

```ros
<DEV>: TKIP countermeasures over, resuming
```

TKIP countermeasures（60 秒静默期）已结束，AP 恢复充当 AP。

```ros
<DEV>: starting TKIP countermeasures
```

进入 TKIP countermeasures 状态（60 秒静默期），所有客户端都将丢失连接。

### \<REASON\> {#}

**"joining failed"** - 只会在 station 模式下的 Prism 卡上发生，因某种原因未能连接到 AP。

**"join timeout"** - 在 station 上发生，未能与 AP 同步（接收第一个 beacon 帧）。最可能是信号弱、远端关闭、强干扰，或其他导致通信无法进行的 RF 相关问题。

**"no beacons"** - 未从 WDS 链路的远端收到 beacon。最可能是信号弱、远端关闭、强干扰，或其他导致通信无法进行的 RF 相关问题。

**"extensive data loss"** - 本地接口决定断开与远程设备的连接，因为在最低可能速率下多次失败后仍无法向远端发送数据。可能原因 - 信号太弱、远程设备关闭、强干扰，或其他导致通信无法进行的 RF 相关问题。

**"decided to deauth, \<802.11 reason\>"** - 本地接口决定使用 802.11 原因 \<802.11 reason\> 对远程设备进行取消认证。

**"inactivity"** - 远程设备长时间处于非活动状态。

**"device disabled"** - 本地接口被禁用。

**"got deauth, \<802.11 reason\>"** - 从远程设备收到取消认证帧，802.11 原因代码在 \<802.11 reason\> 中报告。

**"got disassoc, \<802.11 reason\>"** - 从远程设备收到解除关联帧，802.11 原因代码在 \<802.11 reason\> 中报告。

**"auth frame from AP"** - 来自已知为 AP 的远程设备的认证帧，最可能是远程设备从 AP 模式切换到 station 模式。

**"bad ssid"** - WDS 链路的 ssid 无效。

**"beacon from non AP"** - 从已知为非 AP 节点的远程设备收到 beacon 帧，最可能是远程设备从 station 模式切换到 AP 模式。

**"no WDS support"** - 未报告 WDS 支持。

**"failed to confirm SSID"** - 未能确认 WDS 链路另一端的 SSID。

**"hardware failure"** - 某些硬件故障或意外行为。不太可能出现。

**"lost connection"** - 只会在 station 模式下的 Prism 卡上发生，因某种原因失去了与 AP 的连接。

**"auth failed \<802.11 status\>"** - 在 station 上发生，AP 拒绝认证，802.11 状态代码在 \<802.11 status\> 中报告。

**"assoc failed \<802.11 status\>"** - 在 station 上发生，AP 拒绝关联，802.11 状态代码在 \<802.11 status\> 中报告。

**"auth timeout"** - 在 station 上发生，station 未收到认证帧的响应，要么链路不良，要么 AP 因某种原因忽略此 station。

**"assoc timeout"** - 在 station 上发生，station 未收到关联帧的响应，要么链路不良，要么 AP 因某种原因忽略此 station。

**"reassociating"** - 在 AP 上发生，假定连接已丢失，因为被认为已关联的 station 尝试再次关联。必须删除所有与连接相关的信息，因为在关联过程中会协商连接参数（因此为 "disconnected"）。必须在 station 上查找 station 重新关联的原因（最可能的原因是 station 因某种原因在未告知 AP 的情况下断开了连接 - 例如数据丢失、配置更改）。

**"compression setup failure"** - 无法连接，因为没有足够资源进行压缩（已经有太多希望使用压缩的 station 连接）。

**"control frame timeout"** - AP 无法向客户端传输（类似于你在 802.11 协议中看到的错误消息 - extensive data loss）。

### \<802.11 reason\> 和 \<802.11 status\> {#-and-}

这些是编码到 802.11 管理消息中的数字原因/状态代码。日志消息包含数字代码以及来自 802.11 标准组中相应标准的文本描述。尽管这些描述旨在尽可能具有描述性，但必须考虑到，管理帧中出现的实际原因/状态代码完全取决于设备或软件制造商 - 一个设备发送的 802.11 管理帧可能包含与导致该帧的情况相对应的正确原因/状态代码，而另一个设备可能发送带有 "unspecified" 原因/状态代码的帧。因此，原因/状态代码只应被视为参考信息。

随着 802.11 标准的发展，RouterOS 可能会缺少某些设备使用的 reason/status 代码的文本描述。在这种情况下，应使用数值在 802.11 标准中查找含义。

为了正确解释原因/状态代码，必须很好地理解 802.11 组标准。大多数文本描述本身就能说明问题。以下是一些最常见原因/状态代码的说明：

- **class 2 frame received (6)** - 设备在完成 802.11 认证过程之前收到了 "class 2" 帧（关联/重关联管理帧）；

- **class 3 frame received (7)** - 设备在完成关联过程之前收到了 "class 3" 帧（数据帧）。

## 无线常见问题 {#wireless-faq}

### 设置 {#settings}

**为什么我无法使用 Apple Mac 设备连接到 MikroTik 802.11n AP？**

此问题仅出现在基于 Broadcom 无线芯片组的 Mac 设备上。要使用此类无线设备连接到 MikroTik 802.11n AP，请确保不要使用 'short' preamble-mode。使用 'long' 或 'both' preamble-mode，Mac 无线设备就能连接。

**更改某些无线设置后，无线链路工作不稳定。**

有时，当你更改某些无线设置来调优链路时，会改到链路不再建立或工作不稳定的程度，而且你不记得最初的设置是什么。在这种情况下，你可以使用无线菜单中的 *reset-configuration* 命令 - 它会重置特定无线接口的所有无线设置，你将能够从头开始配置该接口。请注意，执行此命令还会禁用接口，因此如果你正通过想要重置其配置的那条无线链路远程配置路由器，请小心不要执行此命令。

**什么是无线重传，在哪里检查它们？**

当接口发出一个帧但没有收到确认（ACK）时，就会发生无线重传，导致它再次尝试发送该帧，直到收到确认或达到数据包允许的最大重传次数。无线重传会增加无线链路的延迟并降低吞吐量。发生的重传次数可以通过用注册表中给定条目的 **hw-frames** 参数值减去 **frames** 参数值来确定。一定数量的重传是预期之内的，但如果 **hw-frames** 的值多次超过 **frames** 的值，则无线链路存在问题，需要进行故障排除。

**我也可以在 Nstreme 链路上比较 frames 与 hw-frames 吗？**

**frames** 只统计包含实际数据的帧。在 Nstreme 的情况下，如果没有其他数据要发送，单个帧中只能传输 ACK。这些 ACK 帧不会计入 **frames** 计数，但会出现在 **hw-frames** 中。如果两个方向都以最大速度有流量（例如不会出现仅含 ACK 的帧），那么你就不能像普通无线链路那样比较 **frames** 与 **hw-frames**。

**我可以使用哪些 TX-power 值？**

tx-power 默认设置是网卡可以使用的最大 tx-power，取自网卡的 eeprom。如果你想使用更大的 tx-power 值，可以设置它们，但 **请自行承担风险**，因为这最终可能会损坏你的网卡！通常，应仅使用此参数来降低 tx-power。

一般来说，tx-power 控制属性应保留为默认设置。更改默认设置在某些情况下可能对某些网卡有帮助，但如果不进行测试，最常见的结果是范围和吞吐量下降。可能出现的一些问题包括：

- 网卡功耗过高可能会使网卡所在板卡的 3.3V 电源过载，导致电压下降并重启，或使板卡温度过高。

**哪种 TX-power-mode 最好？**

*TX-power-mode* 告诉无线网卡应使用哪些 tx-power 值。默认情况下，此设置设为 *default*。

- **all-rates-fixed** 表示网卡将对所有数据速率使用一个 tx-power 值，该值由用户在 *tx-power* 字段中指定。

请注意，不建议使用 'all-rates-fixed' 模式，因为无线网卡在较高数据速率下的 tx-power 较低，强制较高数据速率也使用固定 tx-power 速率可能会导致与上一个关于 tx-power 设置的问题中相同的问题。对于 MikroTik Radio 设备，功率不会高于写入 EEPROM 的功率。在大多数情况下，如果你想更改 tx-power 设置，建议使用 *tx-power-mode=card-rates*，并且建议降低而不是提高 tx-power。对于 AR9300 及更新的 Atheros 无线芯片组，"tx-power-mode=all-rates-fixed" 是唯一选项，因为 "card-rates" 选项在这些芯片组上不起作用。

**什么是 CCQ，这些值如何确定？**

客户端连接质量（CCQ）是一个百分比值，表示相对于理论最大可用带宽，带宽被有效利用的程度。CCQ 是对每个已发送帧计算出的 Tmin/Treal 值的加权平均值，其中 Tmin 是在无重试的情况下以最高速率发送给定帧所需的时间，Treal 是实际发送该帧所用的时间（考虑发送该帧所需的重试次数和发送速率）。

**hw-retries 设置是什么？**

发送帧重试而不将其视为传输失败的次数。失败时会降低数据速率并再次发送该帧。在最低支持速率上连续三次失败后，会在 *on-fail-retry-time* 期间暂停向该目标传输。之后，会再次发送该帧。该帧会一直重传，直到传输成功，或在 *disconnect-timeout* 之后客户端断开连接。在此期间，如果超过 *frame-lifetime*，该帧可能会被丢弃。在 Nstreme 的情况下，不使用 "on-fail-retry-time"、"disconnect-timeout" 和 "frame-lifetime" 设置。因此，在最低支持速率上连续三次失败后，无线链路会断开并显示 "extensive data loss" 消息。

**disconnect-timeout 设置是什么？**

此间隔从最低数据速率上的第三次发送失败开始计算。此时，最低数据速率上的 3 \* (*hw-retries* + 1) 次帧传输已经失败。在 *disconnect-timeout* 期间，将按 *on-fail-retry-time* 间隔重试数据包传输。如果在 *disconnect-timeout* 期间没有任何帧能够成功传输，则关闭连接，并将此事件记录为 "extensive data loss"。成功传输帧会重置此计时器。

**adaptive-noise-immunity 设置是什么？**

自适应噪声免疫（ANI）会动态调整各种接收器参数，以尽量减少干扰和噪声对信号质量的影响。此设置已添加到 Atheros AR5212 及更新芯片组网卡的无线驱动程序中。

**当使用 access-list 或 connect-list 时，无线设备如何测量信号强度？**

报告的信号电平是平滑因子为 50% 的指数加权移动平均值。

**RouterOS 无线支持哪些纠错方法？**

Nstreme 协议支持 ARQ 方法。常规 802.11 标准不包括 ARQ - 损坏帧的重传基于确认协议。RouterOS 支持编码率为 1/2、2/3 或 3/4 的前向纠错编码（卷积编码）。

**为 160MHz 使用配置 RouterOS 设备。**

如果 RouterOS 设备支持 4x4 传输，除了设置 160MHz 信道宽度外，请确保在无线接口上设置 "rate-set=default"，以便所有流都可用

如果客户端不支持 Extended NSS 且只能执行 2x2 传输，请设置 "vht-supported-mcs=mcs0-9,mcs0-9,none"。

### 配置 {#setups}

**放大器会提高我链路的速率吗？**

这取决于你的信号质量和噪声。请记住，使用低输出功率设置和良好的天线，你很可能获得更好的链路。放大器会增加噪声，只会给链路带来问题。

放大器会同时增强发射 **和** 接收信号。因此，在“安静”区域，也就是你独自使用或“噪声”/“竞争”很少的地方，你可能会获得极好的结果。另一方面，在拥挤区域，无线活动很多，你也会增强从其他每个竞争者或噪声源接收到的信号，这可能会大幅降低链路的整体质量。另外，还要考虑 EIRP，以确认你的链路是否仍在合法限制内。

在 "11b only" 无线设备上，你也可能获得更好的信号，这些设备会将大部分 802.11g 视为 "noise"，从而更好地过滤可用信号。

**如何使用 hw-retries 微调无线链路？**

你应该了解，对于 802.11 设备，可用于调整其行为的信息（或来自环境的“反馈”）非常有限：

- 通过是否收到已发送帧的确认。

考虑到使用信号强度并不可靠，802.11 设备实际上只剩下一个“反馈”来调整其操作 - 传输成功/失败。当传输失败（未及时收到 ACK）时，发送方无法查明失败原因 - 是因为噪声、多径、直接干扰（以及干扰的是实际数据帧还是 ACK 本身）- 帧就是没有成功送达，而且一般来说“为什么”并不重要。重要的是数据包错误率。

因此，RouterOS 实现了一种算法，仅使用这些有限信息，尝试在任何环境中最高效地使用介质，同时让用户能够控制该算法的工作方式，并对该算法进行描述。并且只有少量使用指南，而不是一套在特定情况下应使用的值。

一般来说 - *hw-retries* 越大，设备获得的关于介质以特定速率传送帧的能力的“反馈”就越好（例如，如果以 54mbps 速率发送帧失败 16 次，这比失败 2 次重试告诉你的信息更多），并且它就越能找出最佳传输速率，但代价是可能给网络引入延迟 - 因为在所有这些失败重试期间，此信道中的其他设备无法发送。因此，对于 ptp 骨干链路（已知链路必须始终开启），可以建议使用**更大**的 *hw-retries*。**更小**的 *hw-retries* 会使速率选择适应得更快，但会牺牲一些准确性（在大多数情况下低于 2 不合理），这可以建议用于 ptmp 链路，在这种链路中连接/断开是正常的，并且保持低延迟很重要。

*on-fail-retry-time* 和 *disconnect-timeout* 控制设备在多大程度上尝试将远程方视为“已连接”。较大的 *disconnect-timeout* 会使设备即使在最小可能传输速率下存在大量丢包，也不“断开”另一方。这同样对已知“必须”建立的“弱”链路最有用（例如骨干链路）。在 ptmp 网络中，较大的 *disconnect-timeout* 同样会在例如 AP 尝试向某个刚被禁用的客户端发送数据期间增加网络延迟（AP 会在整个 *disconnect-timeout* 期间尝试这样做）。

*frame-lifetime* 可用于调整 AP 在认为某个帧不值得传送之前尝试使用该帧进行传输的时间（例如，如果在最低可能速率下发送帧失败，则会启用 *on-fail-retry-time* 计时器。如果在此期间 *frame-lifetime* 到期，则该特定帧会被丢弃，下一次传输尝试将使用下一个帧进行。禁用 *frame-lifetime* 意味着无线将确保“所有”数据帧按顺序传送，无论需要多长时间，或者如果一切失败则“断开”连接）。这可以针对不同类型的流量进行优化，例如，对于实时流量 - 如果无线网络的主要用途是 voip，那么限制 *frame-lifetime* 可能是合理的，因为 voip 对少量丢包的容忍度高于高延迟。

**是否可以仅使用一个无线接口来使用无线中继器？**

这种配置可以通过在运行于 ap-bridge 模式的无线接口上使用 WDS 来实现。在较新的 RouterOS 版本中，可以配置无线中继模式。

**Nv2 无线链路经常断开。**

当 Nv2 无线链路出现断开，并且日志部分中的大多数消息都是 'control frame timeout' 时，如果链路信号很强，你可以尝试降低无线网卡的发射输出功率。我们建议使用 tx-power-mode=card-rates 来降低无线网卡的 tx-power。如果问题仍然存在，请尝试使用可能干扰更少的其他无线频率。如果这也没有帮助，请通过 [support@mikrotik.com](mailto:support@mikrotik.com) 联系支持，并提供受影响的 AP 和 station 在那些断开之后生成的支持输出文件。
