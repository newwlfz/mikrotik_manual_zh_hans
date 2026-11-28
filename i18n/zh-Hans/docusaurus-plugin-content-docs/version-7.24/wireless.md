---
title: "无线"
description: "本节介绍 MikroTik RouterOS 无线配置，涵盖不同 CPU 类型和频段（2.4GHz、5GHz、60GHz）的软件包选择、家庭接入点和工业链路的使用场景，以及客户端数量和覆盖范围优化等注意事项。"
tags:
  - 'wireless'
source: https://manual.mikrotik.com/docs/7.24/wireless
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

本节将介绍 802.11 无线协议的配置和最佳使用示例。

路由器的无线功能可以显著提升家庭或办公室网络的可用性，也可为工业建筑提供解决方案。对于没有经验的用户来说，选择合适的设备进行部署可能比较困难。本指南旨在解释不同参数，并提供思考思路，帮助你在众多 MikroTik 路由器中不迷失方向。

### 哪个章节适用于我的设备？ {#which-section-is-for-my-device}

MikroTik 无线设备分为多个产品系列，每个系列通过特定的 RouterOS 菜单进行配置。请在下方找到你的设备所属系列，然后跳转到对应章节：

| 产品系列 | RouterOS 菜单 | 驱动包 |
| :-- | :-- | :-- |
| [Wi-Fi 6 / 7 (802.11 ax/be)](/docs/wifi) | `/interface/wifi` | `wifi-qcom`, `wifi-qcom-be`, `wifi-mediatek` |
| [Wi-Fi 5 (802.11ac)](/docs/wireless/wifi-ac) | `/interface/wifi` *或* `/interface/wireless` | `wifi-qcom-ac` *或* `wireless` |
| [802.11 a/b/g/n](/docs/wireless/abgn) | `/interface/wireless` | `wireless` |
| [60 GHz (W60G)](/docs/w60g) | `/interface/w60g` *或* `/interface/wifi` | `wireless` |

802.11ac 设备是唯一可以选择菜单的设备，[Wi-Fi 5 (802.11ac)](/docs/wireless/wifi-ac) 章节介绍了如何选择。下面的软件包表更详细地说明了该选择。

:::tip[不确定你的设备属于哪个系列？]
无线标准通常编码在型号名称中。例如，**wAP ax** 和 **hAP ax³** 是 802.11ax（Wi-Fi 6），**hAP be lite** 是 802.11be（Wi-Fi 7），**hAP ac²** 和 **wAP ac** 是 802.11ac（Wi-Fi 5），而 Cube **60Pro** 是 60 GHz（W60G）设备。
:::

### RouterOS 软件包类型 {#routeros-package-type}

部分 MikroTik 设备可以根据所需功能和设备类型，在两种 Wireless NPK 软件包（即无线驱动程序）之间进行选择。更多详情请参阅相应文档章节。CAPsMAN 功能包含在 routeros bundle 软件包中，与 CPU 架构无关，也独立于无线驱动程序，即你可以在任何型号上运行 CAPsMAN。

简而言之：

- CAPsMAN 可以在任何 MikroTik 设备上运行。在大多数情况下，你可以同时运行新旧 CAPsMAN（在 AX 路由器上同时运行时，无法使用内置网卡）。
- MIPS 类型设备无法选择驱动程序，仅支持 legacy 驱动程序。
- ARM CPU 802.11AC 无线设备可以选择无线驱动程序：wireless.npk 或 wifi-qcom-ac.npk。

下表可帮助你在这种情况下进行选择：

#### 旧款 802.11ac ARM CPU 设备\* {#old-80211ac-arm-cpu-devices}

| **功能** | **所需软件包** | **说明** |
| :-- | :-- | :-- |
| 新驱动程序（WPA3、Fast Roaming） | routeros + wifi-qcom-ac |  |
| legacy 驱动程序（Nstreme、Nv2） | routeros + wireless |  |
|  |  |  |
| 新 Capsman 和自有实际接口 | routeros + wifi-qcom-ac | *内置网卡可与新驱动程序配合使用* |
| 仅新 Capsman 控制器 | routeros | *完全不使用内置网卡* |
| 旧 Capsman | routeros + wireless | *实际上 old = dual。内置网卡将与 legacy 驱动程序配合使用* |
| 同时运行两个 Capsmans | routeros + wireless | *内置网卡只能与 legacy 驱动程序配合使用* |

***\* wifi-qcom-ac**：Audience、Audience LTE kit、Chateau（D53 的所有变体）、hAP ac<sup>2</sup>、hAP ac<sup>3</sup>、cAP ac、cAP XL ac、LDF 5 ac、LHG XL 5 ac、LHG XL 52 ac、NetMetal ac<sup>2</sup>、mANTBox 52 15s、wAP ac（RBwAPG-5HacD2HnD）、SXTsq 5 ac*

#### 新款 802.11ax 设备 {#new-80211ax-devices}

| **功能** | **所需软件包** | **说明** |
| :-- | :-- | :-- |
| 新驱动（WPA3、Fast Roaming） | routeros + wifi-qcom |  |
| 旧驱动（Nstreme、Nv2） | - | *不可实现* |
|  |  |  |
| 新 Capsman 和自有真实接口 | routeros + wifi-qcom | *内置网卡使用新驱动* |
| 仅作为控制器的新 Capsman | routeros | *完全不使用内置网卡* |
| 旧 Capsman | routeros + wireless | *实际上，旧 = 双模。会失去内置网卡* |
| 同时运行两个 capsmans | routeros + wireless | *会失去内置网卡* |

### Frequencies

MikroTik 提供的路由器接口覆盖 3 个频段：2.4GHz、5GHz 和 60GHz。每个频段都有自身的优势和应用场景。

#### 2.4GHz

如今，由于过度使用，该频段被视为旧频段，但它仍是受支持最广泛的频段。如果你有手机、笔记本电脑或其他无线客户端设备，它很可能支持该频段。即使是 IoT 设备，通常也支持 2.4GHz 频段。由于频率较低，2.4GHz 频段能更好地克服障碍物，因此其覆盖范围比 5GHz 设备更大，但吞吐量（互联网速度）通常也更低。此外，它容易受到其他 2.4GHz 无线设备的干扰（噪声），因为几乎每个家庭接入点都支持 2.4GHz 频段，并且它穿墙和远距离传输表现良好，同时可选频率更少（3 个非重叠信道）。如果你有许多近邻（公寓、共享办公楼），2.4GHz 频段可能会饱和，性能也会降低。该频段也可用于工业链路。

#### 5GHz

通常，新手机和笔记本电脑也支持 5GHz 频段。如果你的客户端设备和路由器支持 802.11ac（有时简称为“ac”），其速度将高于 2.4GHz 频段。5GHz 频段有更多可选频率，但覆盖范围通常低于 2.4GHz 频段。如果你有新客户端设备，ac 路由器将提升网络性能。由于频率范围较大，5GHz 频段也常用于工业链路。

#### 60GHz

目前，支持 60GHz 频段的客户端设备（手机、笔记本电脑）非常少。不过，它为工业链路提供了前沿解决方案。例如，如果你有 2 个点需要在最远 1500 米的距离内连接，你将获得 1 Gbps 双工链路。例如，MikroTik 的一款产品名为 *Wireless Wire*，因为它提供与 1Gbps 有线连接相同的速度，但建立链路需要无遮挡的视距。

---

### 使用场景 {#use-case}

MikroTik 设备上的 RouterOS 软件提供广泛且一致的配置能力。RouterOS 软件允许你以多种方式使用 MikroTik 设备，例如，如有需要，可轻松将“家庭接入点”设备重新配置为客户端或组成点对点链路。“家庭 AP”只是默认配置，但你可以将其更改为你希望的任何配置。尽管如此，最好仍按硬件的预期用途使用硬件。

#### 用于手机和笔记本电脑的家庭 AP {#home-ap-for-phones-and-laptops}

在确定最适合你的配置的方案之前，应先回答以下问题：要连接多少客户端、需要覆盖多大范围、希望达到什么速率。

#### 客户端数量 {#client-count}

连接的客户端越多，延迟越高，吞吐量越低。建议每个接口连接 20-50 个客户端，以达到最佳性能；具体取决于环境条件，客户端数量最多可增加到 100 个，并且仍能稳定运行。如果客户端需要高吞吐量，或者数据流量对时间敏感，建议减少每个接入点的客户端数量。通常，选择更简单的接入点并进行更密集的部署会更有利。

#### Range

无线连接的覆盖范围取决于许多条件，包括天线增益、路由器和客户端设备的发射功率、其他设备的干扰、障碍物（墙壁、金属物体）以及路由器摆放位置。需要注意的一个重要因素是，所有相关设备都会影响可达到的距离，因此无论你的 AP 有多强、多灵敏，小型手机都会受到自身发射功率和灵敏度的限制。如果客户端设备是手机，单个设备无法覆盖大面积区域。通常只能达到几百米，要覆盖更大区域需要更多 AP 设备。

- **天线增益**以 dBi 为单位，决定波束的窄程度。0 dBi（实际上不可能）的辐射方向图呈球形，1.5 dBi - 5 dBi 几乎向所有方向均匀辐射，但会有一些凹陷和信号更强的侧面。> 9 dBi 具有明显的定向辐射方向图。如果位置摆放正确，天线增益更高的天线可以在所需方向上覆盖更远。
- **发射功率**以 dBm 或 mW 为单位，决定从无线接口发出的信号强度。移动设备通常发射功率较低，以节省电池电量。例如，即使手机报告的接收信号强度正常，路由器从手机接收到的信号也可能很弱。

- 来自其他设备的**干扰**会提高噪声底限，使路由器更难从噪声中区分信号，因此信号必须更强，客户端必须更靠近接入点。同一频率上的接入点占用相同的空口时间，会降低吞吐量并增加延迟。

- 某些**物体**会降低（衰减）信号强度，而另一些物体会反射信号。在建筑物中，通常需要注意墙壁及其厚度、地板、天花板和金属物体。玻璃和木材也会衰减信号。

- 接入点的**摆放位置**也会影响覆盖范围。接入点不应被金属物体或表面遮挡，以便信号有空间扩散。

#### Speed

如果速度很重要，应选择支持 802.11 ac 的 5GHz 无线路由器。

### 连接其他无线天线（CPE 到 AP） {#for-other-wireless-antennas-to-connect-cpe-to-ap}

通常需要连接两个或更多点位，例如连接园区内的建筑物、将客户端家庭接入网络，或建立长距离链路。MikroTik 在这些场景下也提供解决方案。进行选择时，必须知道距离、需要连接两个点（point to point - PtP）还是多个点（point to multipoint - PtMP），以及所需的速度。

#### Distance

由于这些场景涉及定向天线和较长距离，必须记住，对准和视距至关重要。对于最长 1500 米的小距离，建议使用 60 GHz 设备，它们将提供稳定性和很高的速度。此外，在小距离场景中，天线增益较小的 2.4 GHz 或 5 GHz 设备也能满足需求，尽管速度不如 60 GHz 设备。对于更长的链路，应考虑天线增益和发射功率。更高的信号强度可实现更高的数据速率，这意味着更高的吞吐量。谨慎选择频率，以避开其他无线链路的干扰。请记住，在城市中，即使屋顶上方也经常受到邻近 2.4 GHz 和 5 GHz 链路的干扰。

#### PtP 或 PtMP {#ptp-or-ptmp}

PtP 和 PtMP 链路在某些方面有所不同。对于 PtMP，很可能需要波束更宽的天线，也称为扇区天线。此类天线覆盖角度更广，但增益较低，因此距离更短。此外，在 PtMP 中，接入点必须至少具有 4 级 RouterOS 软件许可证。连接到接入点的客户端或设备，以及 PtP 链路中的设备，可以使用 3 级许可证和更窄的波束宽度。

#### Speed

对于短距离链路中的更高速度，必须选择 60 GHz 设备；对于更长距离，选择 5GHz ac 设备。

---

#### Note

要控制大型接入点网络，可以使用 CAPsMAN —— 一个从一个位置配置大量接入点的控制器。使用与设备菜单匹配的控制器：对于 `/interface/wifi` 设备（`wifi-qcom` / `wifi-qcom-ac`），使用 [WiFi CAPsMAN](/docs/wifi/capsman)；对于旧版 `/interface/wireless` 设备，使用 [CAPsMAN](/docs/wireless/abgn/capsman)。要控制数百个接入点，建议使用 CCR 系列设备。要控制数千个接入点，可以尝试使用 CHR 或 x86 机器。
