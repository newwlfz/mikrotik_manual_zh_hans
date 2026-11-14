---
sidebar_key: "mobile-networking/ppp"
sidebar_position: 5
title: "PPP"
sidebar_label: "PPP"
description: "RouterOS 中的 PPP 支持点对点协议通信，用于传输多协议数据报，包含 LCP 和 NCP 组件。它支持 PPP 客户端和服务器配置，并提供按需拨号设置以及兼容调制解调器固件升级等示例。"
tags:
  - 'ppp'
source: https://manual.mikrotik.com/docs/7.24/mobile-networking/ppp
captured_at: '2026-11-04T11:32:24+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#overview}

点对点协议（PPP）提供了一种在点对点链路上传输多协议数据报的标准方法。RouterOS 中的 PPP 基于 [RFC 1661 标准。](https://tools.ietf.org/html/rfc1661)

## 简介 {#introduction}

此时 PPP 的基本目的是通过数据链路层点对点链路传输三层数据包。假定两个对等体之间的数据包按顺序交付。

PPP 由三个主要组件组成：

1. 一种封装多协议数据报的方法。
2. 一种链路控制协议（LCP），用于建立、配置和测试数据链路连接。
3. 一组网络控制协议（NCP），用于建立和配置不同的网络层协议。

有关 RouterOS 中详细的 PPP 数据包处理，请参阅[数据包流图](../firewall-and-quality-of-service/packet-flow-in-routeros.md)。

### PPP 客户端 {#ppp-client}

**子菜单：** `/interface/ppp-client`

### PPP 客户端示例 {#ppp-client-example}

以下示例展示如何使用 LTE 调制解调器暴露的串口添加客户端。

```ros
/interface/ppp-client/add apn=yourapn dial-on-demand=no disabled=no port=usb2
```

对于持续连接，应将 dial-on-demand 设置为 'no'。

### PPP 服务端 {#ppp-server}

**子菜单：** `/interface/ppp-server`

## KNOT RB924i-2nD-BT5&BG77 {#knot-rb924i-2nd-bt5bg77}

如果看到消息“*A newer version of modem firmware is available!*”并且想要升级 BG77 调制解调器的固件，请使用以下命令：

```routeros
/interface/ppp-client/firmware-upgrade [find] upgrade=yes
```
