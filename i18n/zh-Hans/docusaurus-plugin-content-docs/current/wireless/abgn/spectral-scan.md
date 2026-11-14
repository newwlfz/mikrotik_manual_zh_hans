---
sidebar_key: "wireless/abgn/spectral-scan"
sidebar_position: 5
title: "频谱扫描"
sidebar_label: "频谱扫描"
description: "MikroTik RouterOS 中的 Spectral Scan 功能可以持续监控并可视化无线频谱活动，其中包括利用 10MHz 增量的频谱快照对 2.4GHz 和 5GHz 频段进行干扰检测，同时提供控制台命令用于详细分析，并可与 The Dude 网络监控工具集成。"
tags:
  - 'spectral-scan'
  - 'wireless'
  - 'monitoring'
source: https://manual.mikrotik.com/docs/wireless/abgn/spectral-scan
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

频谱扫描可以扫描无线网卡支持的所有频率，并直接在控制台中绘制它们。确切的频率范围取决于网卡。r52n 上允许的范围：[4790; 6085]、[2182; 2549]。

无线网卡可以为任何 20mhz 宽的信道生成 4us 长的频谱快照。这被视为一个频谱样本。

为了提高数据质量，频谱以 10mhz 的频率增量进行扫描，这意味着在每个特定频率上样本覆盖范围翻倍（考虑到 20mhz 宽的样本）。

:::warning
目前，Atheros 802.11ac 芯片（例如 QCA98xx、IPQ-4018）不支持。请参阅 [https://mikrotik.com/products](https://mikrotik.com/products) 以确定您设备上的无线芯片。
:::

## 控制台 {#console}

### 频谱历史 {#spectral-history}

![](/img/690b5cf44100ee79.webp)

```ros
/interface/wireless/spectral-history <wireless interface name> 
```

绘制频谱图。图例和频率标尺每 24 行打印一次。标尺中的数字对应其最左侧字符位置的值。落在不同范围内的功率值会以具有相同前景色和背景色的不同颜色字符打印，因此可以复制并粘贴此命令的终端输出。

- *value* -- 选择在输出中绘制的值。'interference' 比较特殊，它显示检测到的干扰源（受 'classify-samples' 参数影响）而不是功率读数，并且不能设为可听。
- *interval* -- 打印频谱图行的时间间隔。
- *duration* -- 在指定时间后终止命令。默认是无限期。
- *buckets* -- 在频谱图的每一行中显示多少个值。此值受终端列数限制。如果使用 'audible'，减小此值会很有用。
- *average-samples* -- 在每个频率上采集的 4us 频谱快照数量，并据此计算平均能量和最大能量。（默认 10）。
- *classify-samples* -- 在每个频率上采集并由干扰分类算法处理的频谱快照数量。通常，样本越多，发现某些类型干扰的机会就越大（默认 50）。
- *range* --
  - 2.4ghz - 扫描整个 2.4ghz 频段；
  - 5ghz - 扫描整个 5ghz 频段；
  - current-channel - 仅扫描当前信道（20 或 40 MHz 宽）；
  - range - 扫描特定范围。

- *audible=yes* -- 在打印每一行时播放该行。行与行之间有短暂的静音。每一行从左到右播放，较高的频率对应频谱图中较高的值。

### 频谱扫描 {#spectral-scan}

![](/img/9b8c8528563f6d4e.webp)

```ros
 /interface/wireless/spectral-scan <wireless interface name> 
```

持续监控频谱数据。此命令使用与 'spectral-history' 相同的数据源，因此共享许多参数。

每一行显示一个频谱图桶 -- 频率、平均功率的数值，以及字符图形条。条形用 ':' 字符显示平均功率值，用 '.' 字符显示平均峰值保持。最大值显示为单独浮动的 ':' 字符。

- *show-interference* -- 添加一列，显示检测到的干扰源；

可能分类的干扰类型：

- Bluetooth-headset
- Bluetooth-stereo
- cordless-phone
- microwave-oven
- CWA
- video-bridge
- wifi

## The Dude {#the-dude}

The Dude 是 MikroTik 提供的一款免费网络监控和管理程序。您可以[在此处下载](http://www.mikrotik.com/thedude.php)。

The Dude 内置了从任何配备受支持无线网卡的 RouterOS 设备运行图形化频谱扫描的功能。只需在 Dude 地图中选择此设备，右键单击并选择 Tools -> Spectral Scan。

![](/img/dba8dc30746d8cee.webp)

这将打开频谱扫描 GUI，其中包含各种选项和不同的视图模式：

![](/img/1f9413c23ef2332d.webp)
