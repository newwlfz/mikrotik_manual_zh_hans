---
sidebar_key: "bridging-and-switching/swos"
title: "SwOS"
sidebar_label: "SwOS"
description: "SwOS 是专为管理 MikroTik 交换硬件而构建的轻量级操作系统。它可在所有标准以太网帧上提供最大线速二层转发能力，无缝处理 IPv4、IPv6 和非 IP 流量。"
source: https://manual.mikrotik.com/docs/bridging-and-switching/swos
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

# SwOS 简介 {#introduction-to-swos}

SwOS 是一款专为管理 MikroTik 交换硬件而构建的轻量级操作系统。它在所有标准以太网帧上提供最大线速的二层转发能力，并无缝处理 IPv4、IPv6 和非 IP 流量。

### 核心与高级功能 {#core--advanced-features}

除了标准的受管交换机功能之外，SwOS 还提供了一套强大的网络功能：

* **VLAN 管理：** 完整支持复杂 VLAN 设置的配置，包括接入端口和干道端口。
* **流量控制：** 高级广播风暴控制、带宽限制以及端口到端口转发设置。
* **监控与镜像：** 入站/出站流量镜像，以及实时端口级统计信息。
* **安全与过滤：** 细粒度的访问控制列表（ACL）引擎，能够依据 MAC、IP 和端口级规则匹配流量。
* **硬件卸载：** 在支持的设备型号上，由硬件直接驱动的特定 MAC 和 IP 报头字段操作。

:::note 管理限制
SwOS 仅能通过基于 IPv4 的标准 Web 浏览器（HTTP）进行配置。它不支持通过串行控制台/SSH 的命令行界面（CLI）访问、API 访问、WinBox 或其他替代管理协议。
:::

<DocCardList />
