---
title: "频谱扫描"
description: "MikroTik RouterOS 中的 Spectral Scan 功能支持持续监控和可视化无线频谱活动，包括使用 10MHz 增量的频谱快照检测 2.4GHz 和 5GHz 频段中的干扰，同时提供用于详细分析的控制台命令，并支持与 The Dude 网络监控工具集成。"
tags:
  - 'spectral-scan'
  - 'wireless'
  - 'monitoring'
source: https://manual.mikrotik.com/docs/7.24/wireless/abgn/spectral-scan
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

频谱扫描可以扫描无线网卡支持的所有频率，并直接在控制台中绘制。具体频率跨度取决于网卡。r52n 上允许的范围为：[4790; 6085]、[2182; 2549]。

无线网卡可以针对任意 20mhz 宽信道生成 4us 长的频谱快照。这被视为单个频谱样本。

为提高数据质量，频谱以 10mhz 频率增量进行扫描，这意味着在每个特定频率上的样本覆盖率翻倍（考虑 20mhz 宽的样本）。

:::warning
目前，Atheros 802.11ac 芯片不支持该功能（例如 QCA98xx、IPQ-4018）。请参阅 [https://mikrotik.com/products](https://mikrotik.com/products) 以确定设备上的无线芯片。
:::

## Console

### 频谱历史 {#spectral-history}

![](/img/690b5cf44100ee79.webp)

```ros
/interface/wireless/spectral-history <wireless interface name> 
```

绘制频谱图。每 24 行打印一次图例和频率标尺。标尺中的数字对应其最左侧字符位置的值。落在不同范围内的功率值会以具有相同前景色和背景色的不同颜色字符打印，因此可以复制并粘贴此命令的终端输出。

- *value* -- 选择要在输出中绘制的值。'interference' 较为特殊，它显示检测到的干扰源（受 'classify-samples' 参数影响），而不是功率读数，并且无法转换为声音。
- *interval* -- 打印频谱图行的间隔。
- *duration* -- 在指定时间后终止命令。默认无限期。
- *buckets* -- 频谱图每行显示多少个值。该值受终端列数限制。如果使用 'audible'，减小该值很有用。
- *average-samples* -- 在每个频率上获取的 4us 频谱快照数量，并计算这些快照的平均能量和最大能量。（默认 10）。
- *classify-samples* -- 在每个频率上获取并由干扰分类算法处理的频谱快照数量。通常，样本越多，发现特定类型干扰的机会越大（默认 50）。
- *range* --
  - 2.4ghz - 扫描整个 2.4ghz 频段；
  - 5ghz - 扫描整个 5ghz 频段；
  - current-channel - 仅扫描当前信道（20 或 40 MHz 宽）；
  - range - 扫描特定范围。

- *audible=yes* -- 在每行打印时播放该行。行与行之间有短暂静音。每行从左到右播放，较高频率对应频谱图中较高的值。

### 频谱扫描 {#spectral-scan}

![](/img/9b8c8528563f6d4e.webp)

```ros
 /interface/wireless/spectral-scan <wireless interface name> 
```

持续监控频谱数据。该命令使用与“spectral-history”相同的数据源，因此共享许多参数。

每行显示一个频谱图桶——频率、平均功率的数值以及字符图形条。图形条使用“:”字符显示平均功率值，使用“.”字符显示平均峰值保持。最大值显示为单个浮动的“:”字符。

- *show-interference* -- 添加一列，显示检测到的干扰源；

可能分类的干扰类型：

- Bluetooth-headset
- Bluetooth-stereo
- cordless-phone
- microwave-oven
- CWA
- video-bridge
- wifi

## The Dude

The Dude 是 MikroTik 提供的免费网络监控和管理程序。您[可以在此处下载](http://www.mikrotik.com/thedude.php)。

The Dude 内置功能，可从任何配备受支持无线网卡的 RouterOS 设备运行图形化 Spectral Scan。只需在 The Dude 地图中选择该设备，右键单击并选择 Tools -> Spectral Scan。

![](/img/dba8dc30746d8cee.webp)

这将打开 Spectral Scan GUI，其中包含多个选项和不同的视图模式：

![](/img/1f9413c23ef2332d.webp)
