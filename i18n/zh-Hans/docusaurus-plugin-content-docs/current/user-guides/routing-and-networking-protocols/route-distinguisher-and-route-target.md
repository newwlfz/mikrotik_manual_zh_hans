---
sidebar_key: "user-guides/routing-and-networking-protocols/route-distinguisher-and-route-target"
sidebar_position: 9
title: "路由区分符和路由目标"
sidebar_label: "路由区分符和路由目标"
description: "路由区分符（RD）为客户地址添加唯一前缀，以便区分不同的 VRF，而路由目标则控制各实例之间 BGP 路由信息的交换。"
tags:
  - 'bgp'
  - 'routing'
  - 'vrf'
source: https://manual.mikrotik.com/docs/user-guides/routing-and-networking-protocols/route-distinguisher-and-route-target
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 路由区分符 {#route-distinguisher}

路由区分符是一个唯一前缀，添加到客户的目标地址，以区分否则可能看起来相同的通告。例如，重叠的 VRF 子网可以通过唯一的路由区分符来区分。

RD 是一个 64-bit（8-byte）整数，分为三部分：

- Type（始终为 2 bytes）。
- 管理员子字段。
- 值或 service-provider 子字段。

目前定义了三种格式类型。

| **2 字节**   |            |              |
|:--|:--|:--|
| **Type 0**    | 2 字节 ASN | 4 字节值 |
| **Type 1**    | 4 字节 IP  | 2 字节值 |
| **Type 2**    | 4 字节 ASN | 2 字节值 |

## 路由目标 {#route-targets}

路由目标是一种 BGP 扩展社区，用于控制路由实例之间路由信息的导入和导出。
