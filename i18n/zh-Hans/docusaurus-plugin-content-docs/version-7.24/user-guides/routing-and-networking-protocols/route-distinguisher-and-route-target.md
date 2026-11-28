---
title: "Route Distinguisher 和 Route Target"
description: "Route Distinguisher（RD）为客户地址添加唯一前缀，以区分 VRF；Route Targets 控制实例之间的 BGP 路由信息交换。"
tags:
  - 'bgp'
  - 'routing'
  - 'vrf'
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/route-distinguisher-and-route-target
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## Route Distinguisher

Route Distinguisher 是添加到客户目的地址的唯一前缀，用于区分原本可能相同的通告。例如，重叠的 VRF 子网可以通过唯一的 Route Distinguisher 进行区分。

RD 是一个 64 位整数，分为三个部分：

- Type（始终为 2 字节）。
- Administrator 子字段。
- Value 或 service-provider 子字段。

当前定义了三种格式类型。

| **2 字节**   | 2 字节     | 4 字节      |          |
|:--|:--|:--|:--|
| **Type 0**    | ASN        | 4 字节 value |          |
| **Type 1**    | 4 字节 IP  | 2 字节 value |          |
| **Type 2**    | 4 字节 ASN | 2 字节 value |          |

## 路由目标 {#route-targets}

Route Target 是一种 BGP 扩展团体属性，用于控制路由实例之间路由信息的导入和导出。
