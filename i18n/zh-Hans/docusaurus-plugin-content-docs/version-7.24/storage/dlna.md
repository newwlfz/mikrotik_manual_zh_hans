---
title: "DLNA 媒体服务器"
description: "本页介绍 MikroTik RouterOS 中的 DLNA 媒体服务器功能，说明它如何使网络中的设备使用 UPnP 协议共享数字媒体。文中详细说明服务器设置，例如允许的主机、IP 限制和友好名称，并提供配置多个具有访问限制实例的示例。"
tags:
  - 'dlna'
  - 'media-server'
  - 'upnp'
source: https://manual.mikrotik.com/docs/7.24/storage/dlna
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

DLNA（Digital Living Network Alliance）是一组网络协议，可让设备共享视频、照片和音乐等数字媒体。DLNA 基于 UPnP（Universal Plug and Play）架构构建，该架构提供设备发现和控制能力。

UPnP 允许设备在网络上相互发现并交换控制消息。它使用 SSDP（Simple Service Discovery Protocol）进行发现，使用 SOAP（Simple Object Access Protocol）传输控制消息，并使用 XML 描述设备和服务。这使电视、计算机和移动设备等能够无缝连接并共享媒体内容。

在 RouterOS 中，可以启用媒体服务器，与电视等家庭设备或计算机上的 VLC 等播放器应用共享电影或音乐。

:::danger
SMIPS 设备不支持媒体共享（DLNA）。
:::

## 服务器设置 {#server-settings}

| 属性 | 说明 |
| :-- | :-- |
| **allowed-hostname** | 限制对特定主机名的访问。 |
| **allowed-ip** | 限制对指定 IP 地址的访问 |
| **friendly-name** | 网络上显示的 DLNA 服务器名称。 |
| **interface** | 指定 DLNA 服务器使用的网络接口 |
| **path** | 存储并提供媒体内容的文件路径。 |
| **disabled** | 指定条目是否禁用 |

### 创建 DLNA 服务器 {#creating-a-dlna-server}

要在 MikroTik 路由器上启用 DLNA 媒体流，请使用 `/ip media add` 命令。该命令用于配置媒体服务器，使网络上兼容 DLNA 的设备能够发现并访问存储在已连接 USB 存储上的媒体文件。将 `Mikrotik` 替换为媒体服务器的描述性名称，将 `bridge1` 替换为要用于媒体发现的网桥接口，将 `usb1` 替换为媒体文件所在的 USB 存储路径。

```ros
/ip/media/add friendly-name=Mikrotik interface=bridge1 path=usb1
```

### 创建具有访问限制的多个 DLNA 服务器实例 {#creating-multiple-dlna-server-instances-with-access-limitations}

本示例演示如何配置具有特定访问限制的独立 DLNA 服务器实例。使用场景：限制儿童电视只能访问存储在“usb1/kids”文件夹中的适合儿童观看的媒体。

```ros
/ip/media/add friendly-name=adults interface=bridge1 path=usb1/adults allowed-hostname=ADULTS_TV
/ip/media/add friendly-name=kids interface=bridge1 path=usb1/kids allowed-hostname=KIDS_TV
```
