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
source: https://manual.mikrotik.com/docs/7.25/firewall-and-quality-of-service/queues/pcq-example
captured_at: '2026-11-04T11:15:51+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

PCQ（Per Connection Queue，每连接队列）是一种排队规则，可以在少量管理开销下为多个用户动态均衡或整形流量。PCQ 场景可以分为三大类：为若干用户提供相同带宽、在用户之间平均分配特定带宽，以及在用户之间平均分配未知带宽。

## 为若干用户提供相同带宽 {#equal-bandwidth-for-a-number-of-users}

可以通过 Queue Tree 和 Simple Queues 使用 PCQ 类型，为若干用户均衡带宽[并设置最大限制]。我们将设置 64kbps 下载和 32kbps 上传限制。

![](/img/13361e704ba849c3.webp)

### 步骤 1：在 Queue Types 中添加 PCQ {#step-1-add-pcq-in-queue-types}

添加两个新条目——一个用于下载，一个用于上传。`dst-address` 是用户下载流量的分类器，`src-address` 用于上传流量：

```ros
/queue/type/add name="PCQ_download" kind=pcq pcq-rate=64000 pcq-classifier=dst-address
/queue/type/add name="PCQ_upload" kind=pcq pcq-rate=32000 pcq-classifier=src-address
 
```

### 步骤 2：部署 PCQ {#step-2-deploy-the-pcq}

#### Queue Tree 选项 {#queue-tree-option}

使用 packet-marks 标记所有数据包的上传/下载：（假设 ether1-WAN 是连接 Internet 的公共接口，ether2-LAN 是客户端连接的本地接口）：

```ros
/ip/firewall/mangle/add chain=prerouting action=mark-packet \
   in-interface=ether2-LAN new-packet-mark=client_upload
/ip/firewall/mangle/add chain=prerouting action=mark-packet \
   in-interface=ether1-WAN new-packet-mark=client_download
```

然后，需要两条队列规则，一条用于下载，一条用于上传：

```ros
/queue/tree/add parent=global queue=PCQ_download packet-mark=client_download
/queue/tree/add parent=global queue=PCQ_upload packet-mark=client_upload
```

#### Simple Queues 选项 {#simple-queues-option}

或者，你也可以用一条命令完成：

```ros
/queue/simple/add target=192.168.0.0/24 queue=PCQ_upload/PCQ_download
```
