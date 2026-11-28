---
title: "PCQ 示例"
description: "Per Connection Queue（PCQ）是 RouterOS 中用于在用户之间均衡带宽的队列方法，示例展示如何使用 Queue Tree 和 Simple Queues 设置下载/上传限制。"
tags:
  - 'pcq'
  - 'queue-tree'
  - 'simple-queues'
source: https://manual.mikrotik.com/docs/7.25/firewall-and-quality-of-service/queues/pcq-example
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Per Connection Queue（PCQ）是一种队列规则，可用于以较少的管理开销动态均衡或整形多个用户的流量。PCQ 场景可分为三大类：为多个用户提供相等带宽、在用户之间按指定带宽均衡分配，以及在用户之间按未知带宽均衡分配。

## 为多个用户提供相等带宽 {#equal-bandwidth-for-a-number-of-users}

可通过 Queue Tree 和 Simple Queues 使用 PCQ 类型，为多个用户均衡带宽[并设置最大限制]。我们将设置 64kbps 下载和 32kbps 上传限制。

![](/img/13361e704ba849c3.webp)

### 步骤 1：在 Queue Types 中添加 PCQ {#step-1-add-pcq-in-queue-types}

添加两个新条目：一个用于下载，一个用于上传。`dst-address` 是用户下载流量的分类器，`src-address` 是上传流量的分类器：

```ros
/queue/type/add name="PCQ_download" kind=pcq pcq-rate=64000 pcq-classifier=dst-address
/queue/type/add name="PCQ_upload" kind=pcq pcq-rate=32000 pcq-classifier=src-address
 
```

### 步骤 2：部署 PCQ {#step-2-deploy-the-pcq}

#### Queue Tree 选项 {#queue-tree-option}

使用 packet-marks upload/download 标记所有数据包：（假设 ether1-WAN 是连接 Internet 的公共接口，ether2-LAN 是客户端连接的本地接口）：

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

也可以使用一条命令完成：

```ros
/queue/simple/add target=192.168.0.0/24 queue=PCQ_upload/PCQ_download
```
