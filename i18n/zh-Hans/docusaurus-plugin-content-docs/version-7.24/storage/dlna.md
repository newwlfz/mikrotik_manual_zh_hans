---
sidebar_key: "storage/dlna"
sidebar_position: 2
title: "DLNA 媒体服务器"
sidebar_label: "DLNA 媒体服务器"
description: "该页面介绍 MikroTik RouterOS 中的 DLNA 媒体服务器功能，说明其如何使联网设备能够使用 UPnP 协议共享数字媒体。页面详细介绍了允许的主机、IP 限制和友好名称等服务器设置，并提供了配置多个实例及访问限制的示例。"
tags:
  - 'dlna'
  - 'media-server'
  - 'upnp'
source: https://manual.mikrotik.com/docs/7.24/storage/dlna
captured_at: '2026-11-04T11:33:00+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

DLNA（Digital Living Network Alliance，数字生活网络联盟）是一组网络协议，使设备能够共享视频、照片和音乐等数字媒体。DLNA 构建在 UPnP（Universal Plug and Play，通用即插即用）架构之上，该架构提供设备发现和控制能力。

UPnP 允许设备在网络中发现彼此并交换控制消息。它使用 SSDP（Simple Service Discovery Protocol，简单服务发现协议）进行发现，使用 SOAP（Simple Object Access Protocol，简单对象访问协议）传输控制消息，并使用 XML 描述设备和服务。这使电视、计算机和移动设备等设备能够无缝连接并共享媒体内容。

在 RouterOS 中，你可以启用媒体服务器，与电视等家庭设备或计算机上的 VLC 等播放器应用共享电影或音乐。

:::danger
SMIPS 设备不支持媒体共享（DLNA）。
:::

## 服务器设置 {#server-settings}

| 属性 | 描述 |
| :-- | :-- |
| **allowed-hostname** | 用于限制对特定主机名的访问。 |
| **allowed-ip** | 用于限制对指定 IP 地址的访问 |
| **friendly-name** | 将在网络上为 DLNA 服务器显示的名称。 |
| **interface** | 指定 DLNA 服务器将使用的网络接口 |
| **path** | 存储媒体内容并从中提供服务的文件路径。 |
| **disabled** | 指定条目是否被禁用 |

### 创建 DLNA 服务器 {#creating-a-dlna-server}

要在 MikroTik 路由器上启用 DLNA 媒体流，请使用 `/ip media add` 命令。该命令配置一个媒体服务器，使网络中的 DLNA 兼容设备能够发现并访问存储在已连接 USB 存储上的媒体文件。将 `Mikrotik` 替换为你的媒体服务器的描述性名称，将 `bridge1` 替换为你希望用于媒体发现的桥接接口，将 `usb1` 替换为媒体文件所在的 USB 存储路径。

```ros
/ip/media/add friendly-name=Mikrotik interface=bridge1 path=usb1
```

### 创建带访问限制的多个 DLNA 服务器实例 {#creating-multiple-dlna-server-instances-with-access-limitations}

此示例演示如何配置具有特定访问限制的独立 DLNA 服务器实例。使用场景：限制儿童电视只能访问存储在 "usb1/kids" 文件夹中的儿童友好媒体。

```ros
/ip/media/add friendly-name=adults interface=bridge1 path=usb1/adults allowed-hostname=ADULTS_TV
/ip/media/add friendly-name=kids interface=bridge1 path=usb1/kids allowed-hostname=KIDS_TV
```
