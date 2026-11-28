---
title: "无线故障排除"
description: "本页介绍如何通过启用和分析客户端连接、断开连接以及 MIC 失败或雷达检测等安全事件的详细调试日志，排查 MikroTik RouterOS 中的无线连接问题。"
tags:
  - 'wireless'
  - 'debug-logs'
  - 'station-mode'
source: https://manual.mikrotik.com/docs/7.24/wireless/abgn/wireless-troubleshooting
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "wireless/w60g"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 无线调试日志 {#wireless-debug-logs}

使用日志调试无线问题。

默认情况下，RouterOS 无线日志会将客户端连接和断开显示为简单条目：

```ros
22:32:18 wireless,info 00:80:48:41:AF:2A@wlan1: connected
```

对于普通用户而言，知道 MAC 地址为“00:80:48:41:AF:2A”的无线客户端已连接到无线接口“wlan1”已经足够。但实际上，可用的日志条目比标准日志中显示的更多。它们称为“调试”日志，可提供更详细的信息。在以下调试日志示例中，你将看到同一客户端连接到 AP 的过程比典型日志更详细：

```ros
22:33:20 wireless,debug wlan1: 00:80:48:41:AF:2A attempts to connect
22:33:20 wireless,debug wlan1: 00:80:48:41:AF:2A not in local ACL, by default accept
22:33:20 wireless,info 00:80:48:41:AF:2A@wlan1: connected
```

调试日志会提供客户端无线连接和断开过程中每个步骤的更具体信息。第一行显示无线客户端尝试连接到 AP。第二行显示 AP 检查该客户端是否允许连接到 AP，并显示结果动作。只有第三行才显示客户端已连接。这只是调试日志消息的一个示例。所有调试条目的说明如下。

要启用无线调试日志，请执行以下命令：

```ros
[admin@MikroTik] > /system/logging                                            
[admin@MikroTik] /system/logging> add topics=wireless,debug action=memory
```

这将帮助你更轻松地理解和解决无线问题，并减少与支持团队的交互。

### 站点模式 {#station-mode}

```ros
<MAC>@<DEV>: lost connection, <REASON>
```

Station 因 \<REASON\> 失去与 AP 的连接。

```ros
<MAC>@<DEV>: failed to connect, <REASON>
```

Station 尝试连接到 AP，但因 \<REASON\> 失败。

```ros
<MAC>@<DEV>: established connection on <FREQ>, SSID <SSID>
```

Station 尝试连接到频率为 \<FREQ\>、SSID 为 \<SSID\> 的 AP，并成功建立连接。

```ros
<MAC>@<DEV>: MIC failure!!!
```

TKIP 消息完整性检查失败，可能有人试图入侵网络或对网络发起 DOS 攻击。如果在 60 秒内遇到超过 1 次 MIC 失败，将进入“TKIP countermeasures”状态。

```ros
<MAC>@<DEV>: enter TKIP countermeasures
```

已进入 TKIP countermeasures 状态，这意味着 Station 将与 AP 断开连接，并保持静默 60 秒。

### AP 模式 {#ap-mode}

```ros
<DEV>: radar detected on <FREQ>
```

在频率 \<FREQ\> 上检测到雷达，AP 将寻找其他信道。

```ros
<DEV>: data from unknown device <MAC>, sent deauth [(XXX events suppressed, YYY deauths suppressed)]
```

收到来自未知设备（即未注册到该 AP）的数据帧，其 MAC 地址为 \<MAC\>，AP 已向其发送解除认证帧（依据 802.11）。XXX 是未记录到日志的事件数，以避免日志过大（前 5 条记录之后，日志限制为每 5 秒 1 条）。YYY 是本应发送但未发送的解除认证帧数量，以避免因发送过多解除认证帧而浪费资源（每秒仅允许发送 10 个解除认证帧）。

出现此类消息的可能原因是，之前已连接到 AP 的 Station 仍向 AP 发送数据，而它尚不知道自己已从 AP 注册表中被移除。deauthentication 消息会告知 Station 其连接已断开。

```ros
<DEV>: denying assoc to <MAC>, failed to setup compression
```

无法在 AP 上初始化压缩，最可能的原因是尝试连接并使用压缩的客户端过多。

```ros
<DEV>: <MAC> is new WDS master
```

WDS slave 已与 WDS master 建立连接，这意味着 WDS slave 开始接受客户端并充当 AP。

```ros
<DEV>: <MAC> was WDS master
```

该消息在与 \<MAC\> 的连接丢失后出现，这意味着 WDS slave 将断开所有客户端，并开始扫描以查找新的 WDS master。

```ros
<MAC>@<DEV>: connected [, is AP][, wants WDS]
```

地址为 \<MAC\> 的 Station 已连接。如果出现“is AP”，表示远端设备是 AP；如果出现“wants WDS”，表示远端设备希望建立 WDS 链路。

```ros
<MAC>@<DEV>: disconnected, <REASON>
```

与地址为 \<MAC\> 的 Station 的连接因 \<REASON\> 而终止。

```ros
<DEV>: TKIP countermeasures over, resuming
```

TKIP countermeasures（60s silence period）已结束，AP 恢复充当 AP。

```ros
<DEV>: starting TKIP countermeasures
```

进入 TKIP countermeasures 状态（60s silence period），所有客户端都将断开。

### \<REASON\>

**“joining failed”** - 仅可能发生在 station 模式的 Prism 卡上，由于某种原因未能连接到 AP。

**“join timeout”** - 发生在 Station 上，未能与 AP 同步（接收第一个 beacon 帧）。最可能的原因是信号弱、远端关闭、强干扰，或其他导致通信无法进行的 RF 相关问题。

**“no beacons”** - 未从 WDS 链路的远端接收到 beacon。最可能的原因是信号弱、远端关闭、强干扰，或其他导致通信无法进行的 RF 相关问题。

**“extensive data loss”** - 本地接口在最低速率下多次发送失败后，仍无法向远端发送数据，因此决定断开与远端设备的连接。可能原因包括信号过弱、远端设备关闭、强干扰，或其他导致通信无法进行的 RF 相关问题。

**“decided to deauth, \<802.11 reason\>”** - 本地接口决定使用 802.11 reason \<802.11 reason\> 对远端设备进行去认证。

**“inactivity”** - 远端设备长时间处于非活动状态。

**“device disabled”** - 本地接口被禁用。

**“got deauth，\<802.11 reason\>”** - 从远端设备收到解除认证帧，802.11 原因码在 \<802.11 reason\> 中报告。

**“got disassoc，\<802.11 reason\>”** - 从远端设备收到解除关联帧，802.11 原因码在 \<802.11 reason\> 中报告。

**“auth frame from AP”** - 来自已知为 AP 的远端设备的认证帧，很可能是远端设备的模式从 AP 更改为 Station。

**“bad ssid”** - WDS 链路的 ssid 错误。

**“beacon from non AP”** - 从已知为非 AP 节点的远端设备收到信标帧，很可能是远端设备的模式从 Station 更改为 AP。

**“no WDS support”** - 未报告 WDS 支持。

**“failed to confirm SSID”** - 无法确认 WDS 链路另一端的 SSID。

**“hardware failure”** - 某些硬件故障或意外行为。不太可能看到。

**“lost connection”** - 仅可能发生在处于 station 模式的 Prism 网卡上，由于某种原因与 AP 的连接丢失。

**“auth failed \<802.11 status\>”** - 发生在 Station 上，AP 拒绝认证，\<802.11 status\> 中报告 802.11 状态码。

**“assoc failed \<802.11 status\>”** - 发生在 Station 上，AP 拒绝关联，\<802.11 status\> 中报告 802.11 状态码。

**“auth timeout”** - 发生在 Station 上，Station 未收到认证帧的响应，可能是链路质量差，或者 AP 由于某种原因忽略该 Station。

**“assoc timeout”** - 发生在 Station 上，Station 未收到关联帧的响应，可能是链路质量差，或者 AP 由于某种原因忽略该 Station。

**“reassociating”** - 发生在 AP 上，系统认为连接已丢失，因为被视为已关联的 Station 再次尝试关联。必须删除所有与连接相关的信息，因为在关联过程中会协商连接参数（因此会“disconnected”）。Station 重新关联的原因必须在 Station 上查找（最可能的原因是 Station 由于某种原因在未通知 AP 的情况下断开了连接，例如数据丢失、配置更改）。

**“compression setup failure”** - 无法建立连接，因为没有足够资源执行压缩（已有过多希望使用压缩的 Station 连接）。

**“control frame timeout”** - AP 无法向客户端发送（类似于 802.11 协议中看到的错误消息 - 大量数据丢失）。

### \<802.11 reason\> 和 \<802.11 status\> {#-and-}

这些是编码到 802.11 管理消息中的数字原因/状态代码。日志消息包含数字代码和来自 802.11 标准组中相应标准的文本描述。尽管这些描述旨在尽可能具有说明性，但必须考虑到，管理帧中出现的实际原因/状态代码完全取决于设备或软件制造商：一个设备可能发送包含适用于触发该帧的情形的原因/状态代码的 802.11 管理帧，另一个设备则可能发送带有“unspecified”原因/状态代码的帧。因此，原因/状态代码只应视为参考信息。

随着 802.11 标准的发展，RouterOS 可能缺少某些设备使用的原因/状态代码的文本描述。在这种情况下，应使用数值在 802.11 标准中查找含义。

要正确解释原因/状态代码，需要充分理解 802.11 标准组。大多数文本描述都不言自明。以下是对一些最常见原因/状态代码的说明：

- **class 2 frame received (6)** - 设备在完成 802.11 身份验证过程之前收到“class 2”帧（关联/重新关联管理帧）；

- **class 3 frame received (7)** - 设备在完成关联过程之前收到“class 3”帧（数据帧）。

## 无线常见问题 {#wireless-faq}

### 设置 {#settings}

**为什么 Apple Mac 设备无法连接到 MikroTik 802.11n AP？**

此问题仅出现在使用 Broadcom 无线芯片组的 Mac 设备上。要使此类无线设备连接到 MikroTik 802.11n AP，请确保不要使用“short”preamble-mode。使用“long”或“both”preamble-mode，Mac 无线设备将能够连接。

**更改某些无线设置后，无线链路工作不稳定。**

有时，在更改某些无线设置以调整链路时，可能会调整到链路无法再建立或工作不稳定的状态，并且你不记得最初使用了哪些设置。在这种情况下，可以在 wireless 菜单中使用 *reset-configuration* 命令，它将重置指定无线接口的所有无线设置，你可以从头开始配置该接口。请注意，执行此命令也会禁用该接口，因此如果你正通过要重置配置的无线链路远程配置路由器，请谨慎执行此命令。

**什么是无线重传，在哪里查看？**

当接口发送帧但未收到确认（ACK）时，会发生无线重传，导致接口再次尝试发送该帧，直到收到确认或达到数据包允许的最大重传次数。无线重传会增加无线链路的延迟并降低吞吐量。可以通过从注册表中指定条目的 **hw-frames** 参数值中减去 **frames** 参数值，来确定发生的重传次数。存在一定数量的重传是正常的，但如果 **hw-frames** 的值多次超过 **frames** 的值，则说明无线链路存在问题，需要进行故障排除。

**在 Nstreme 链路上是否也可以比较 frames 和 hw-frames？**

**frames** 仅统计包含实际数据的帧。对于 Nstreme，如果没有其他数据要发送，则单个帧中可能只传输 ACK。这些 ACK 帧不会计入 **frames**，但会出现在 **hw-frames** 中。如果双向流量均以最大速度传输（例如不会只有 ACK 帧），则无法像普通无线链路那样比较 **frames** 和 **hw-frames**。

**可以使用哪些 TX-power 值？**

tx-power 默认设置是网卡可以使用的最大 tx-power，取自网卡的 eeprom。如果要使用更大的 tx-power 值，可以进行设置，但**风险自负**，因为这最终可能会损坏网卡！通常，应仅使用该参数降低 tx-power。

一般而言，tx-power 控制属性应保持默认设置。更改默认设置在某些情况下可能对某些网卡有帮助，但未经测试时，最常见的结果是覆盖范围和数据吞吐量下降。可能出现的问题包括：

- 功率放大器芯片和网卡过热，导致效率降低和更多数据错误；
- 放大器过载会导致更多数据错误；
- 网卡功耗过高可能使网卡所在板的 3.3V 电源过载，导致电压下降和重启，或使板卡温度过高。

**哪种 TX-power-mode 最好？**

*TX-power-mode* 指定无线网卡应使用哪些 tx-power 值。默认情况下，该设置设为 *default*。

- **default** 表示网卡将使用网卡 eeprom 中的 tx-power 值，并忽略用户在 *tx-power* 字段中指定的设置。
- **card-rates** 表示对于不同数据速率，tx-power 根据网卡 eeprom 中的发射功率算法计算，并将用户指定的 *tx-power* 值作为参数。
- **all-rates-fixed** 表示网卡将对所有数据速率使用用户在 *tx-power* 字段中指定的一个 tx-power 值。

请注意，不建议使用“all-rates-fixed”模式，因为无线网卡在较高数据速率下的 tx-power 较低，而对较高数据速率也强制使用固定 tx-power 值，可能会导致与上一个有关 tx-power 设置问题相同的问题。对于 MikroTik Radio 设备，功率不会高于 EEPROM 中写入的功率。大多数情况下，如果要更改 tx-power 设置，建议使用 *tx-power-mode=card-rates*，并且建议降低而不是提高 tx-power。对于 AR9300 及更新的 Atheros 无线芯片组，“tx-power-mode=all-rates-fixed”是唯一选项，因为“card-rates”选项在这些芯片组上不起作用。

**什么是 CCQ，其值如何确定？**

Client Connection Quality（CCQ）是一个百分比值，用于显示相对于理论最大可用带宽，带宽的使用效率。CCQ 是 Tmin/Treal 值的加权平均值，该值针对每个已发送帧计算。其中，Tmin 是以最高速率且无重传时发送该帧所需的时间，Treal 是实际发送该帧所用的时间（考虑发送该帧所需的重传次数和发送速率）。

**什么是 hw-retries 设置？**

在不将帧视为发送失败之前，重发帧的次数。失败后会降低数据速率并再次发送帧。在最低支持速率上连续失败三次后，会在 *on-fail-retry-time* 期间暂停向该目标发送。之后，再次发送该帧。帧会持续重传，直到发送成功，或客户端在 *disconnect-timeout* 后断开连接。在此期间，如果超过 *frame-lifetime*，该帧可能会被丢弃。对于 Nstreme，不使用“on-fail-retry-time”、“disconnect-timeout”和“frame-lifetime”设置。因此，在最低支持速率上连续失败三次后，无线链路会断开，并显示“extensive data loss”消息。

**什么是 disconnect-timeout 设置？**

该时间间隔从最低数据速率上的第三次发送失败开始计时。此时，在最低数据速率上已有 3 \* (*hw-retries* + 1) 次帧发送失败。在 *disconnect-timeout* 期间，将按 *on-fail-retry-time* 间隔重试数据包发送。如果在 *disconnect-timeout* 期间没有任何帧成功发送，则连接关闭，并记录为“extensive data loss”事件。成功发送帧会重置该计时器。

**什么是 adaptive-noise-immunity 设置？**

Adaptive Noise Immunity（ANI）会动态调整各种接收器参数，以尽量减少干扰和噪声对信号质量的影响。该设置已添加到适用于 Atheros AR5212 及更新芯片组网卡的无线驱动中。

**使用 access-list 或 connect-list 时，无线设备如何测量信号强度？**

报告的信号电平是指数加权移动平均值，平滑系数为 50%。

**RouterOS 无线支持哪些纠错方法？**

nstreme 协议支持 ARQ 方法。常规 802.11 标准不包含 ARQ —— 损坏帧的重传基于确认协议。RouterOS 支持前向纠错编码（卷积编码），编码率为：1/2、2/3 或 3/4。

**配置 RouterOS 设备以使用 160MHz。**

如果 RouterOS 设备支持 4x4 传输，除设置 160MHz 信道宽度外，还应在无线接口上设置“rate-set=default”，以便所有流均可用。

如果客户端不支持 Extended NSS，且只能执行 2x2 传输，请设置“vht-supported-mcs=mcs0-9,mcs0-9,none”。

### Setups

**放大器能否提高链路速度？**

这取决于信号质量和噪声。请记住，较低的输出功率设置和良好的天线通常可以获得更好的链路。放大器会增加噪声，只会导致链路出现问题。

放大器会同时增强发送 **和** 接收信号。因此，在“安静”区域，如果你独自使用或只有很少的“噪声”或“竞争”，可能会获得非常好的效果。另一方面，在无线活动频繁的拥挤区域，你也会增强从其他竞争者或噪声源接收到的信号，这可能显著降低链路的整体质量。另外，还要考虑 EIRP，以确认链路是否仍在法定限制内。

你也可以在“11b only”无线电上获得更好的信号，因为它们会将大部分 802.11g 视为“噪声”，从而更好地过滤可用信号。

**如何通过 hw-retries 微调无线链路？**

你应了解，对于 802.11 设备，设备可用于调整自身行为的信息（或来自环境的“反馈”）非常有限：

- 信号强度，可用于在已知接收机灵敏度的情况下确定最佳发送速率。但考虑到不同接收机的灵敏度会变化（例如随时间变化）、路径条件并不对称（设备只能测量其接收到的信号强度）等因素，这仍然不可靠。
- 通过是否接收到已发送帧的确认。

考虑到使用信号强度并不可靠，802.11 设备实际上只剩下一种“反馈”可用于调整运行方式，即传输成功或失败。当传输失败时（未及时收到 ACK），发送方无法判断失败原因，是因为噪声、多径、直接干扰（以及干扰的是实际数据帧还是 ACK 本身），帧只是没有成功送达，通常“原因”并不重要。重要的是数据包错误率。

因此，RouterOS 实现了一种算法，仅使用这一有限信息，在任何环境中尽可能高效地使用介质，并允许用户控制算法的工作方式以及描述该算法。这里只有少量使用指南，而不是一组适用于特定场景的值。

通常，*hw-retries* 越大，设备获得的关于介质在特定速率下传送帧能力的“反馈”越好（例如，以 54mbps 发送帧失败 16 次，比失败 2 次能说明更多信息），设备也就能更好地确定最佳发送速率，但代价是可能在网络中引入延迟——因为在所有失败的重试期间，该信道中的其他设备无法发送。因此，对于 ptp 骨干链路，可以建议使用**更大的** *hw-retries*——因为已知这类链路必须始终在线。对于 ptmp 链路，可以建议使用**更小的** *hw-retries*，使速率选择以部分准确性为代价更快适应；这类链路连接/断开是正常现象，保持较低延迟很重要（在大多数情况下，低于 2 并不合理）。

*on-fail-retry-time* 和 *disconnect-timeout* 控制设备将远端“已连接”状态维持到何种程度。较大的 *disconnect-timeout* 会使设备即使看到在最低可能传输速率下存在大量丢包，也不会将另一端“断开”。这同样最适用于已知“必须”建立的“弱”链路（例如骨干链路）。在 ptmp 网络中，较大的 *disconnect-timeout* 也会在网络中增加延迟，例如 AP 会持续尝试向某个刚被禁用的客户端发送数据，并在整个 *disconnect-timeout* 期间持续尝试。

*frame-lifetime* 用于调整 AP 在认为某个帧不值得继续传送之前，尝试发送该帧的时间（例如，如果以最低可能速率发送帧失败，则会启用 *on-fail-retry-time* 计时器。如果在此期间 *frame-lifetime* 到期，则该帧会被丢弃，下一次发送尝试将针对下一帧。禁用 *frame-lifetime* 意味着无线将确保“所有”数据帧按序传送，无论耗时多久，“或者”如果全部失败则断开连接）。这可以针对不同流量类型进行优化，例如，对于实时流量——如果无线网络的主要用途是 voip，则限制 *frame-lifetime* 可能是合理的，因为 voip 对少量丢包的容忍度高于对高延迟的容忍度。

**是否可以只使用一个无线接口来使用无线中继器？**

这种配置可以通过在运行于 ap-bridge 模式的无线接口上使用 WDS 来实现。在较新的 RouterOS 版本中，可以配置 wireless repeater 模式。

**Nv2 无线链路频繁断开。**

当 Nv2 无线链路出现断开，并且日志区域中大多数消息为“control frame timeout”时，如果链路信号较强，可以尝试降低无线网卡的发射输出功率。建议使用 tx-power-mode=card-rates 来降低无线网卡的 tx-power。如果问题仍然存在，请尝试使用可能存在较少干扰的其他无线频率。如果这也没有帮助，请联系 [support@mikrotik.com](mailto:support@mikrotik.com)，并提供在这些断开之后从受影响的 AP 和 Station 生成的支持输出文件。
