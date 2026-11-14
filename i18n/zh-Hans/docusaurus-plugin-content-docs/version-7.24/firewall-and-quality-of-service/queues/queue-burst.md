---
sidebar_key: "firewall-and-quality-of-service/queues/queue-burst"
sidebar_position: 3
title: "队列突发"
sidebar_label: "队列突发"
description: "队列 Burst 功能允许在平均流量保持在阈值以下时临时突发超过配置限制的带宽，使用 burst-limit 和 burst-time 参数来控制突发的持续时间和大小。"
tags:
  - 'queue-burst'
  - 'qos'
  - 'traffic-management'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/queues/queue-burst
captured_at: '2026-11-04T11:28:22+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 简介 {#introduction}

Burst 是一项功能，即使所需速率在有限时间内大于 **MIR**（**max-limit**），也允许满足队列对额外带宽的需求。

只有当队列在最近 **burst-time** 秒内的 **average-rate** 小于 **burst-threshold** 时，才会发生 Burst。如果队列在最近 **burst-time** 秒内的 **average-rate** 大于或等于 **burst-threshold**，Burst 将停止。

Burst 机制很简单——如果允许 Burst，则 **max-limit** 值会被替换为 **burst-limit** 值。当不允许 Burst 时，**max-limit** 值保持不变。

1. **burst-limit** (NUMBER) : 允许 Burst 时可达到的最大上传/下载数据速率。
2. **burst-time** (TIME) : 用于计算平均数据速率的时间段，以秒为单位。（这不是实际 Burst 的时间）。
3. **burst-threshold** (NUMBER) : 这是 Burst 开启/关闭开关的值。
4. **average-rate** (read-only) : 在 **burst-time** 的每 1/16 部分，路由器会计算每个类别在最近 **burst-time** 秒内的平均数据速率。
5. **actual-rate** (read-only) : 队列的实际流量传输速率。

## 示例 {#example}

值：**limit-at=1M** , **max-limit=2M** , **burst-threshold=1500k** , **burst-limit=4M**

客户端将尝试下载两个 4MB（32Mb）的数据块，第一次下载将从第 0 秒开始，第二次下载将从第 17 秒开始。最后一分钟没有使用流量。

#### Burst-time=16s {#burst-time16s}

![](/img/c1e23afd6d46874f.webp)![](/img/50d5e4c4dedde6cc.webp)

正如我们所看到的，客户端一请求带宽，就能获得 6 秒的 4Mbps Burst。这是给定值下可能的最长 Burst *（longest-burst-time = burst-threshold \* burst-time / burst-limit）*。一旦 Burst 用完，剩余数据将以 2Mbps 下载。这样，一个数据块在 10 秒内下载完成——如果没有 Burst，则需要 16 秒。在下一次下载开始之前，Burst 有 7 秒时间重新充电。

请注意，下载开始时仍不允许 Burst，它只会在之后——下载过程中——生效。因此，通过这个示例，我们证明 Burst 可能发生在下载过程中。这次 Burst 持续约 4 秒，第二个数据块比没有 Burst 时快 4 秒下载完成。

平均速率每 1/16 个 burst-time 计算一次，因此在这种情况下为 1 秒。

| 时间 | average-rate | burst | actual-rate |
| --: | :-- | :-- | :-- |
| 0 | (0+0+0+0+0+0+0+0+0+0+0+0+0+0+0+0)/16=0Kbps | average-rate < burst-threshold → 允许 Burst | 4Mbps |
| 1 | (0+0+0+0+0+0+0+0+0+0+0+0+0+0+0+4)/16=250Kbps | average-rate < burst-threshold → 允许 Burst | 4Mbps |
| 2 | (0+0+0+0+0+0+0+0+0+0+0+0+0+0+4+4)/16=500Kbps | average-rate < burst-threshold → 允许 Burst | 4Mbps |
| 3 | (0+0+0+0+0+0+0+0+0+0+0+0+0+4+4+4)/16=750Kbps | average-rate < burst-threshold → 允许 Burst | 4Mbps |
| 4 | (0+0+0+0+0+0+0+0+0+0+0+0+4+4+4+4)/16=1000Kbps | average-rate < burst-threshold → 允许 Burst | 4Mbps |
| 5 | (0+0+0+0+0+0+0+0+0+0+0+4+4+4+4+4)/16=1250Kbps | average-rate < burst-threshold → 允许 Burst | 4Mbps |
| 6 | (0+0+0+0+0+0+0+0+0+0+4+4+4+4+4+4)/16=1500Kbps | average-rate = burst-threshold → **不**允许 Burst | **2Mbps** |
| 7 | (0+0+0+0+0+0+0+0+0+4+4+4+4+4+4+2)/16=1625Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps |
| 8 | (0+0+0+0+0+0+0+0+4+4+4+4+4+4+2+2)/16=1750Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps |
| 9 | (0+0+0+0+0+0+0+4+4+4+4+4+4+2+2+2)/16=1875Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps |
| 10 | (0+0+0+0+0+0+4+4+4+4+4+4+2+2+2+2)/16=2Mbps | average-rate > burst-threshold → 不允许 Burst | **0Mbps** |
| 11 | (0+0+0+0+0+4+4+4+4+4+4+2+2+2+2+0)/16=2Mbps | average-rate > burst-threshold → 不允许 Burst | 0Mbps |
| 12 | (0+0+0+0+4+4+4+4+4+4+2+2+2+2+0+0)/16=2Mbps | average-rate > burst-threshold → 不允许 Burst | 0Mbps |
| 13 | (0+0+0+4+4+4+4+4+4+2+2+2+2+0+0+0)/16=2Mbps | average-rate > burst-threshold → 不允许 Burst | 0Mbps |
| 14 | (0+0+4+4+4+4+4+4+2+2+2+2+0+0+0+0)/16=2Mbps | average-rate > burst-threshold → 不允许 Burst | 0Mbps |
| 15 | (0+4+4+4+4+4+4+2+2+2+2+0+0+0+0+0)/16=2Mbps | average-rate > burst-threshold → 不允许 Burst | 0Mbps |
| 16 | (4+4+4+4+4+4+2+2+2+2+0+0+0+0+0+0)/16=2Mbps | average-rate > burst-threshold → 不允许 Burst | 0Mbps |
| 17 | (4+4+4+4+4+2+2+2+2+0+0+0+0+0+0+0)/16=1750Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps |
| 18 | (4+4+4+4+2+2+2+2+0+0+0+0+0+0+0+2)/16=1500Kbps | average-rate = burst-threshold → 不允许 Burst | 2Mbps |
| 19 | (4+4+4+2+2+2+2+0+0+0+0+0+0+0+2+2)/16=1375Kbps | average-rate < burst-threshold → Burst **确实**允许 | 4Mbps |
| 20 | (4+4+2+2+2+2+0+0+0+0+0+0+0+2+2+4)/16=1375Kbps | average-rate < burst-threshold → 允许 Burst | 4Mbps |
| 21 | (4+2+2+2+2+0+0+0+0+0+0+0+2+2+4+4)/16=1375Kbps | average-rate < burst-threshold → 允许 Burst | 4Mbps |
| 22 | (2+2+2+2+0+0+0+0+0+0+0+2+2+4+4+4)/16=1375Kbps | average-rate < burst-threshold → 允许 Burst | 4Mbps |
| 23 | (2+2+2+0+0+0+0+0+0+0+2+2+4+4+4+4)/16=1500Kbps | average-rate = burst-threshold → **不**允许 Burst | 2Mbps |
| 24 | (2+2+0+0+0+0+0+0+0+2+2+4+4+4+4+2)/16=1500Kbps | average-rate = burst-threshold → 不允许 Burst | 2Mbps |
| 25 | (2+0+0+0+0+0+0+0+2+2+4+4+4+4+2+2)/16=1500Kbps | average-rate = burst-threshold → 不允许 Burst | 2Mbps |
| 26 | (0+0+0+0+0+0+0+2+2+4+4+4+4+2+2+2)/16=1500Kbps | average-rate = burst-threshold → 不允许 Burst | 2Mbps |
| 27 | (0+0+0+0+0+0+2+2+4+4+4+4+2+2+2+2)/16=1625Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps |
| 28 | (0+0+0+0+0+2+2+4+4+4+4+2+2+2+2+2)/16=1750Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps |
| 29 | (0+0+0+0+2+2+4+4+4+4+2+2+2+2+2+2)/16=1875Kbps | average-rate > burst-threshold → 不允许 Burst | 0Mbps |
| 30 | (0+0+0+2+2+4+4+4+4+2+2+2+2+2+2+0)/16=1875Kbps | average-rate > burst-threshold → 不允许 Burst | 0Mbps |
| 31 | (0+0+2+2+4+4+4+4+2+2+2+2+2+2+0+0)/16=1875Kbps | average-rate > burst-threshold → 不允许 Burst | 0Mbps |

#### Burst-time=8s {#burst-time8s}

![](/img/1e52f9a67429a1ac.webp)![](/img/6c7a9a312cdcf56d.webp)

如果我们将 burst-time 减小到 8 秒，就能看到在这种情况下，Burst 只发生在下载开始时。平均速率每 1/16 个 burst-time 计算一次，因此在这种情况下每 0.5 秒计算一次。

| 时间 | average-rate | burst | actual-rate |
| --: | :-- | :-- | :-- |
| 0 | (0+0+0+0+0+0+0+0+0+0+0+0+0+0+0+0)/8=0Kbps | average-rate < burst-threshold → 允许 Burst | 4Mbps（每 0.5 秒 2Mb） |
| 0.5 | (0+0+0+0+0+0+0+0+0+0+0+0+0+0+0+2)/8=250Kbps | average-rate < burst-threshold → 允许 Burst | 4Mbps（每 0.5 秒 2Mb） |
| 1 | (0+0+0+0+0+0+0+0+0+0+0+0+0+0+2+2)/8=500Kbps | average-rate < burst-threshold → 允许 Burst | 4Mbps（每 0.5 秒 2Mb） |
| 1.5 | (0+0+0+0+0+0+0+0+0+0+0+0+0+2+2+2)/8=750Kbps | average-rate < burst-threshold → 允许 Burst | 4Mbps（每 0.5 秒 2Mb） |
| 2 | (0+0+0+0+0+0+0+0+0+0+0+0+2+2+2+2)/8=1000Kbps | average-rate < burst-threshold → 允许 Burst | 4Mbps（每 0.5 秒 2Mb） |
| 2.5 | (0+0+0+0+0+0+0+0+0+0+0+2+2+2+2+2)/8=1250Kbps | average-rate < burst-threshold → 允许 Burst | 4Mbps（每 0.5 秒 2Mb） |
| 3 | (0+0+0+0+0+0+0+0+0+0+2+2+2+2+2+2)/8=1500Kbps | average-rate = burst-threshold → **不**允许 Burst | **2Mbps**（每 0.5 秒 1Mb） |
| 3.5 | (0+0+0+0+0+0+0+0+0+2+2+2+2+2+2+1)/8=1625Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 4 | (0+0+0+0+0+0+0+0+2+2+2+2+2+2+1+1)/8=1750Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 4.5 | (0+0+0+0+0+0+0+2+2+2+2+2+2+1+1+1)/8=1875Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 5 | (0+0+0+0+0+0+2+2+2+2+2+2+1+1+1+1)/8=2000Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 5.5 | (0+0+0+0+0+2+2+2+2+2+2+1+1+1+1+1)/8=2125Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 6 | (0+0+0+0+2+2+2+2+2+2+1+1+1+1+1+1)/8=2250Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 6.5 | (0+0+0+2+2+2+2+2+2+1+1+1+1+1+1+1)/8=2375Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 7 | (0+0+2+2+2+2+2+2+1+1+1+1+1+1+1+1)/8=2500Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 7.5 | (0+2+2+2+2+2+2+1+1+1+1+1+1+1+1+1)/8=2625Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 8 | (2+2+2+2+2+2+1+1+1+1+1+1+1+1+1+1)/8=2750Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 8.5 | (2+2+2+2+2+1+1+1+1+1+1+1+1+1+1+1)/8=2625Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 9 | (2+2+2+2+1+1+1+1+1+1+1+1+1+1+1+1)/8=2500Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 9.5 | (2+2+2+1+1+1+1+1+1+1+1+1+1+1+1+1)/8=2375Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 10 | (2+2+1+1+1+1+1+1+1+1+1+1+1+1+1+1)/8=2250Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 10.5 | (2+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1)/8=2125Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 11 | (1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1)/8=2000Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 11.5 | (1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1)/8=2000Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 12 | (1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1)/8=2000Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 12.5 | (1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1)/8=2000Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 13 | (1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1)/8=2000Kbps | average-rate > burst-threshold → 不允许 Burst | **0Mbps**（每 0.5 秒 0Mb） |
| 13.5 | (1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+0)/8=1875Kbps | average-rate > burst-threshold → 不允许 Burst | 0Mbps（每 0.5 秒 0Mb） |
| 14 | (1+1+1+1+1+1+1+1+1+1+1+1+1+1+0+0)/8=1750Kbps | average-rate > burst-threshold → 不允许 Burst | 0Mbps（每 0.5 秒 0Mb） |
| 14.5 | (1+1+1+1+1+1+1+1+1+1+1+1+1+0+0+0)/8=1625Kbps | average-rate > burst-threshold → 不允许 Burst | 0Mbps（每 0.5 秒 0Mb） |
| 15 | (1+1+1+1+1+1+1+1+1+1+1+1+0+0+0+0)/8=1500Kbps | average-rate > burst-threshold → 不允许 Burst | 0Mbps（每 0.5 秒 0Mb） |
| 15.5 | (1+1+1+1+1+1+1+1+1+1+1+0+0+0+0+0)/8=1375Kbps | average-rate < burst-threshold → Burst **确实**允许 | 0Mbps（每 0.5 秒 0Mb） |
| 16 | (1+1+1+1+1+1+1+1+1+1+0+0+0+0+0+0)/8=1250Kbps | average-rate < burst-threshold → 允许 Burst | 0Mbps（每 0.5 秒 0Mb） |
| 16.5 | (1+1+1+1+1+1+1+1+1+0+0+0+0+0+0+0)/8=1125Kbps | average-rate < burst-threshold → 允许 Burst | 0Mbps（每 0.5 秒 0Mb） |
| 17 | (1+1+1+1+1+1+1+1+0+0+0+0+0+0+0+0)/8=1000Kbps | average-rate < burst-threshold → 允许 Burst | **2Mbps**（每 0.5 秒 1Mb） |
| 17.5 | (1+1+1+1+1+1+1+0+0+0+0+0+0+0+0+1)/8=1000Kbps | average-rate < burst-threshold → 允许 Burst | **4Mbps**（每 0.5 秒 2Mb） |
| 18 | (1+1+1+1+1+1+0+0+0+0+0+0+0+0+1+2)/8=1125Kbps | average-rate < burst-threshold → 允许 Burst | 4Mbps（每 0.5 秒 2Mb） |
| 18.5 | (1+1+1+1+1+0+0+0+0+0+0+0+0+1+2+2)/8=1250Kbps | average-rate < burst-threshold → 允许 Burst | 4Mbps（每 0.5 秒 2Mb） |
| 19 | (1+1+1+1+0+0+0+0+0+0+0+0+1+2+2+2)/8=1375Kbps | average-rate < burst-threshold → 允许 Burst | 4Mbps（每 0.5 秒 2Mb） |
| 19.5 | (1+1+1+0+0+0+0+0+0+0+0+1+2+2+2+2)/8=1500Kbps | average-rate = burst-threshold → **不**允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 20 | (1+1+0+0+0+0+0+0+0+0+1+2+2+2+2+1)/8=1500Kbps | average-rate = burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 20.5 | (1+0+0+0+0+0+0+0+0+1+2+2+2+2+1+1)/8=1500Kbps | average-rate = burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 21 | (0+0+0+0+0+0+0+0+1+2+2+2+2+1+1+1)/8=1500Kbps | average-rate = burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 21.5 | (0+0+0+0+0+0+0+1+2+2+2+2+1+1+1+1)/8=1625Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 22 | (0+0+0+0+0+0+1+2+2+2+2+1+1+1+1+1)/8=1750Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 22.5 | (0+0+0+0+0+1+2+2+2+2+1+1+1+1+1+1)/8=1875Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 23 | (0+0+0+0+1+2+2+2+2+1+1+1+1+1+1+1)/8=2000Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 23.5 | (0+0+0+1+2+2+2+2+1+1+1+1+1+1+1+1)/8=2125Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 24 | (0+0+1+2+2+2+2+1+1+1+1+1+1+1+1+1)/8=2250Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 24.5 | (0+1+2+2+2+2+1+1+1+1+1+1+1+1+1+1)/8=2375Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 25 | (1+2+2+2+2+1+1+1+1+1+1+1+1+1+1+1)/8=2500Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 25.5 | (2+2+2+2+1+1+1+1+1+1+1+1+1+1+1+1)/8=2500Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 26 | (2+2+2+1+1+1+1+1+1+1+1+1+1+1+1+1)/8=2375Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 26.5 | (2+2+1+1+1+1+1+1+1+1+1+1+1+1+1+1)/8=2250Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 27 | (2+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1)/8=2125Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 27.5 | (1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1)/8=2000Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 28 | (1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1)/8=2000Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 28.5 | (1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1)/8=2000Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 29 | (1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1)/8=2000Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 29.5 | (1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1)/8=2000Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 30 | (1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1)/8=2000Kbps | average-rate > burst-threshold → 不允许 Burst | 2Mbps（每 0.5 秒 1Mb） |
| 30.5 | (1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1)/8=2000Kbps | average-rate > burst-threshold → 不允许 Burst | **0Mbps**（每 0.5 秒 0Mb） |
| 31 | (1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+0)/8=1875Kbps | average-rate > burst-threshold → 不允许 Burst | 0Mbps（每 0.5 秒 0Mb） |
