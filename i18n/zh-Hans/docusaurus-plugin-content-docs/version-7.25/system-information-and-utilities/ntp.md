---
sidebar_key: "system-information-and-utilities/ntp"
sidebar_position: 10
title: "NTP"
sidebar_label: "NTP"
description: "RouterOS 在主软件包中包含 NTP 客户端和服务器：可将路由器时钟与 NTP 服务器同步、向其他设备提供时间、使用对称密钥认证，并监控同步状态。"
tags:
  - 'ntp'
  - 'time-synchronization'
source: https://manual.mikrotik.com/docs/7.25/system-information-and-utilities/ntp
captured_at: '2026-11-04T11:22:11+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RouterOS 在主软件包中包含网络时间协议（NTP，[RFC 5905](https://www.rfc-editor.org/rfc/rfc5905.html)）客户端和服务器。客户端会将路由器时钟与 NTP 服务器同步，服务器则会将路由器时间分发给网络中的其他设备。两者默认均处于禁用状态。NTP 交换的是协调世界时 (UTC)；显示时间所用的时区和夏令时规则在 [`/system/clock`](./clock.md) 中配置。

## 同步路由器时钟 {#synchronize-the-routers-clock}

启用客户端，并设置一个或多个服务器：

```ros
[admin@MikroTik] > /system/ntp/client/set enabled=yes servers=192.168.88.1
[admin@MikroTik] > /system/ntp/client/print
         enabled: yes
            mode: unicast
         servers: 192.168.88.1
             vrf: main
      freq-drift: 0 PPM
          status: synchronized
   synced-server: 192.168.88.1
   synced-stratum: 3
   system-offset: 13.937 ms
```

要在 WinBox 中配置客户端，请打开 **System > NTP Client**：

1. 选择 **Enabled**，对于直接查询的服务器，将 **Mode** 保留为 `unicast`。
2. 在 **NTP Servers** 中输入服务器地址，例如，如果该设备提供 NTP，则填写 `192.168.88.1`。使用 **+** 控件添加更多服务器，然后选择 **Apply**。
3. 检查 **Status**。当其显示 `synchronized` 时，**Synced Server**、**Synced Stratum** 和 **System Offset** 会显示所选源及其计时信息。选择 **OK** 关闭对话框。

![WinBox NTP Client dialog synchronized to 192.168.88.1](/img/d415d6c80c25c29b.webp)

`status` 字段显示客户端状态：客户端禁用时为 `stopped`，没有可用服务器时为 `waiting`，时钟跟随 `synced-server` 时为 `synchronized`。有多个服务器时，客户端会轮询所有服务器并选择最佳的一个。

服务器可以是 IPv4 或 IPv6 地址，也可以是域名（通过 [`/ip/dns`](../network-management/dns.md) 解析；结果显示为 `resolved-address`）。服务器在 [`/system/ntp/client/servers`](../cli-reference/system/ntp/client/servers.md) 列表中管理。当 DHCP 客户端设置了 `use-peer-ntp=yes`（默认值）时，通过 DHCP 收到的服务器会作为动态条目出现在列表中，这些条目无法编辑：

```ros
[admin@MikroTik] > /system/ntp/client/servers/print
Flags: D - DYNAMIC
0   address=192.168.88.1 min-poll=6 max-poll=10 iburst=yes auth-key=none

1 D address=217.198.224.12 min-poll=6 max-poll=10 iburst=yes auth-key=none

2 D address=195.244.128.12 min-poll=6 max-poll=10 iburst=yes auth-key=none
```

客户端以介于 `min-poll` 和 `max-poll` 之间的间隔查询服务器，该间隔以秒为单位，取 2 的幂（默认在 64 秒到 1024 秒之间）。服务器刚添加后，客户端会立即以每秒一次的频率快速发送一组查询（iburst），以便快速获得初始估计。

客户端默认以 unicast 模式工作，直接查询每个服务器。`broadcast`、`multicast` 和 `manycast` 模式则从在本地网络上通告时间的服务器获取时间。在 manycast 模式下，客户端会通过组播查询自行发现服务器。

## 向其他设备提供时间 {#serve-time-to-other-devices}

启用服务器，以应答来自网络的时间查询：

```ros
[admin@MikroTik] > /system/ntp/server/set enabled=yes
```

在 WinBox 中，打开 **System > NTP Server**：

1. 选择 **Enabled** 并选择 **OK**，以允许客户端查询路由器时间。请单独配置 NTP 客户端，以便路由器拥有已同步的时间源。
2. 在启用回退到路由器未同步时钟之前，请检查 **Use Local Clock** 和 **Local Clock Stratum**。当你需要外部时间源时，请保持 **Use Local Clock** 未选中。

![WinBox NTP Server dialog with local clock fallback settings](/img/fa68dfc1500bb0b8.webp)

随后，服务器会分发路由器自身的已同步时间。使用 `broadcast=yes` 时，时间还会发送到 `broadcast-addresses` 中的地址；`multicast=yes` 会通过组播分发时间；`manycast=yes` 会参与 manycast 发现。

:::warning
使用 `use-local-clock=yes` 时，如果没有可用的 NTP 源，路由器的未同步时钟会被用作时间参考（使用 `local-clock-stratum`，默认为 5）。在没有外部同步的情况下，路由器时钟会发生漂移，因为其频率会随电源管理、温度和硬件差异而变化，因此不要为精确计时提供本地时钟。应优先使用网络时间源。
:::

当本地时钟是唯一参考时，处于此状态的客户端会显示 `status: using-local-clock` 和 `synced-server: 127.127.1.0`。

## 对客户端和服务器进行身份验证 {#authenticate-clients-and-servers}

在 [`/system/ntp/key`](../cli-reference/system/ntp/key.md) 中配置的对称密钥用于对时间交换进行身份验证。创建密钥，并通过 `auth-key` 在客户端的服务器条目上选择它：

```ros
[admin@MikroTik] > /system/ntp/key/add key-id=10 key-val=mysecret
[admin@MikroTik] > /system/ntp/client/servers/set 0 auth-key=10
```

密钥值是敏感信息：`print` 和 `export` 永远不会显示它。未通过身份验证的回复会被拒绝，日志会显示 `peer rejected auth (crypto NAK)`，客户端会保持 `waiting` 状态。

## 监控同步 {#monitor-synchronization}

`/system/ntp/monitor-peers` 显示客户端对其时间源的视图，并持续刷新：

```ros
[admin@MikroTik] > /system/ntp/monitor-peers
 type="ucast-client" address=192.168.88.1 refid="195.244.128.12" stratum=3
 hpoll=6 ppoll=6 root-delay=15.96 ms root-disp=65.368 ms offset=13.937 ms
 delay=0.566 ms disp=0.123 ms jitter=0.02 ms
```

`refid` 是对等体自身同步到的源。`stratum` 为 16 表示该对等体未同步。

路由器时钟的估计频率校正值在客户端设置中显示为 `freq-drift`；可使用 [`/system/ntp/client/reset-freq-drift`](../cli-reference/system/ntp/client/reset-freq-drift.md) 重置它。

## 技术细节 {#technical-details}

### NTP 日志记录 {#ntp-logging}

为 `ntp` 主题添加日志记录规则，以查看客户端的决策和数据包交换：

```ros
[admin@MikroTik] > /system/logging/add topics=ntp
```

启动和同步期间的典型消息：

```text
ntp,debug tx dst:192.168.88.1
ntp,debug rx src:192.168.88.1 dst:192.168.88.24
ntp,debug Message offset:0.027406 delay:0.000597 disp:0.000002
ntp,debug Resolved address: time.cloudflare.com -> 162.159.200.1
ntp,debug Checking peer (195.244.128.12). Peer is: NOT FIT, because p->leap == NOSYNC
ntp,debug No survivors for clock sync
ntp,debug System peer changed to: 195.244.128.12
ntp,debug peer rejected auth (crypto NAK)
```

一个 `NOT FIT, because p->leap == NOSYNC` 的对等体正在应答，但其自身未同步。`rootDist` 拒绝表示源距离根时钟太远。

### 客户端和服务器作用域 {#client-and-server-scopes}

客户端和服务器独立配置；启用其中一个并不要求启用另一个。两者都有 `vrf` 设置（默认为 `main`），用于限定 NTP 流量使用哪个路由表。

有关所有属性，请参阅 CLI 参考中的 [`/system/ntp/client`](../cli-reference/system/ntp/client/index.md)、[`/system/ntp/client/servers`](../cli-reference/system/ntp/client/servers.md)、[`/system/ntp/server`](../cli-reference/system/ntp/server.md)、[`/system/ntp/key`](../cli-reference/system/ntp/key.md) 和 [`/system/ntp/monitor-peers`](../cli-reference/system/ntp/monitor-peers.md)。
