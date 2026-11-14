---
sidebar_key: "firewall-and-quality-of-service/queues/pcq-example"
sidebar_position: 2
title: "PCQ 示例"
sidebar_label: "PCQ 示例"
description: "Per Connection Queue (PCQ) 是 RouterOS 的一种队列方法，用于在用户之间均衡带宽，并提供了使用 Queue Tree 和 Simple Queues 设置下载/上传限制的示例。"
tags:
  - 'pcq'
  - 'queue-tree'
  - 'simple-queues'
source: https://manual.mikrotik.com/docs/firewall-and-quality-of-service/queues/pcq-example
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

每连接队列（PCQ）只需一个队列，就能为网络上的每台设备提供各自的速度限制，而不是为每台设备各用一个队列。PCQ 使用其分类器将流量划分为子流，例如为每个目标地址划分一个子流，并将每个子流限制为 `pcq-rate`。

## 限制 LAN 上的每台设备 {#limit-every-device-on-a-lan}

此示例将 LAN 192.168.88.0/24 上的每台设备限制为 10 Mbit/s 下载和 5 Mbit/s 上传。

### 步骤 1：在 Queue Types 中添加 PCQ {#step-1-add-pcq-in-queue-types}

为下载和上传各添加一个队列类型。`pcq-classifier=dst-address` 为下载流量中的每台设备提供各自的子流，`src-address` 则为上传流量提供各自的子流。`pcq-rate` 是每个子流（也就是每台设备）的限制，单位为比特每秒；`k` 和 `M` 后缀可用：

```ros
/queue/type/add name="PCQ_download" kind=pcq pcq-rate=10M pcq-classifier=dst-address
/queue/type/add name="PCQ_upload" kind=pcq pcq-rate=5M pcq-classifier=src-address
```

`pcq-limit` 不是速度：它是每个子流的队列大小，单位为 KiB（默认 `50KiB`）。

### 步骤 2：部署 PCQ {#step-2-deploy-the-pcq}

#### Simple Queues 选项 {#simple-queues-option}

为整个 LAN 使用一个简单队列即可应用这两种类型。`queue` 先采用上传类型，再采用下载类型：

```ros
/queue/simple/add target=192.168.88.0/24 queue=PCQ_upload/PCQ_download
```

`/queue/simple/print stats` 会在 `pcq-queues` 中显示该队列有多少个子流（此处为设备）。

#### Queue Tree 选项 {#queue-tree-option}

使用 packet-marks upload/download 标记所有数据包（在此示例中，ether1-WAN 是连接到互联网的公共接口，ether2-LAN 是客户端所连接的本地接口）：

```ros
/ip/firewall/mangle/add chain=prerouting action=mark-packet \
   in-interface=ether2-LAN new-packet-mark=client_upload
/ip/firewall/mangle/add chain=prerouting action=mark-packet \
   in-interface=ether1-WAN new-packet-mark=client_download
```

然后，添加两个队列，一个用于下载，一个用于上传：

```ros
/queue/tree/add parent=global queue=PCQ_download packet-mark=client_download
/queue/tree/add parent=global queue=PCQ_upload packet-mark=client_upload
```

:::warning
队列不适用于 FastTracked 流量，并且默认配置会对已建立的连接进行 FastTrack。请确保防火墙不会对您想要限制的流量进行 FastTrack，例如在 `/ip/firewall/filter` 中禁用 FastTrack 规则。
:::
