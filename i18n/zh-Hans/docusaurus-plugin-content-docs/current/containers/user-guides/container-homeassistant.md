---
sidebar_key: "containers/user-guides/container-homeassistant"
sidebar_position: 4
title: "容器 - HomeAssistant"
sidebar_label: "容器 - HomeAssistant"
description: "本页介绍 MikroTik RouterOS 中的容器功能，使用户能够直接在路由器上运行 HomeAssistant 等服务器。它提供了分步说明，涵盖启用容器模式、配置网络、设置挂载和环境变量，以及获取 HomeAssistant Docker 镜像。"
tags:
  - 'container'
  - 'homeassistant'
source: https://manual.mikrotik.com/docs/containers/user-guides/container-homeassistant
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RouterOS 中引入 **container** 功能后，就可以直接在路由器上运行各种服务器。对于希望尽量减少网络中设备数量的用户来说，这一点尤其有价值。现在无需在单独的机器上部署服务器，你可以将其托管在路由器内部。

在本指南中，我们将演示如何在 RouterOS 上安装并运行 **Home‑Assistant** 服务器。

Home‑Assistant 是一个流行的平台，用于从大量传感器收集数据，并对广泛的 **集成** 提供全面支持。

## 概述 {#summary}

在继续配置之前，请确保已学习我们的 [container](../index.md) 指南。此外，请查看 [免责声明](../index.md#disclaimer) 和 [要求](../index.md#requirements) 部分，以了解所有相关风险以及你可能需要采取的必要步骤。

你可以在[链接](https://hub.docker.com/r/homeassistant/home-assistant/tags)中找到支持的架构。

本指南发布时，**home-assistant** 镜像适用于 ARM64 和 AMD64（CHR 和 x86）设备。

根据 [Home Assistant 网站](https://www.home-assistant.io/installation/linux/) 的信息，推荐要求如下：

- 2 GB RAM
- 32 GB 存储

但我们将尝试在配置更低的设备上运行它。

## 容器配置 {#container-configuration}

**子菜单：** `/container`

***注意**:* 需要 **container** 软件包。

### 容器模式 {#container-mode}

启用容器模式：

```ros
/system/device-mode/update container=yes
```

如果要在 X86 上使用 container，你需要通过按下复位按钮或冷重启来确认 device-mode。

### 网络 {#networking}

添加 veth 接口：

```ros
/interface/veth/add name=veth2 address=172.19.0.2/24 gateway=172.19.0.1
```

为 container 创建网桥，并将 veth 接口添加到其中：

```ros
/interface/bridge/add name=ha
/ip/address/add address=172.19.0.1/24 interface=ha
/interface/bridge/port/add bridge=ha interface=veth2
```

如果需要 NAT（可选），转发 TCP 8123 以进行 home-assistant 管理（其中 192.168.88.1 是设备的 LAN IP 地址）：

```ros
/ip/firewall/nat/add action=dst-nat chain=dstnat dst-address=192.168.88.1 dst-port=8123 protocol=tcp to-addresses=172.19.0.2 to-ports=8123
```

### 环境变量和挂载 {#environment-variables-and-mounts}

根据 home-assistant 文档，为配置文件定义挂载（其中 `/usb1` 是我们的外部 USB 存储文件夹）：

```ros
/container/mounts/add dst=/config list=ha_config src=/usb1/ha_config
```

为 home-assistant 创建环境变量：

```ros
/container/envs/add key=TZ list=ha_env value=America/Los_Angeles
```

### 获取镜像 {#getting-image}

为简化配置，我们将从外部库获取镜像。

确保已相应设置 "Registry URL"，限制 RAM 使用量（如有必要），并为镜像设置目录：

```ros
/container/config/set registry-url=https://registry-1.docker.io tmpdir=/usb1/pull
```

拉取 home-assistant 镜像并等待其解压完成：

```ros
/container/add remote-image=homeassistant/home-assistant:latest interface=veth2 root-dir=/usb1/ha mountlists=ha_config envlists=ha_env logging=yes
```

运行该命令后，RouterOS 应开始“解压”软件包。检查“File System”中新建的文件夹，并使用命令 `/container/print` 监控容器状态。

### 启动容器 {#starting-the-container}

在使用 `/container/print` 确认 container 已添加且状态变为 `status=stopped` 后 → 即可启动它：

```ros
/container/start 0
```

### Home-Assistant 设置 {#home-assistant-setup}

打开你首选的 Web 浏览器，并通过指定管理端口 ":8123" 访问 Home-Assistant 管理门户：

![](/img/c36eaec2e33c6a0b.webp)

继续完成设置。更多信息在 [Home-Assistant 入门指南](https://www.home-assistant.io/getting-started/onboarding/) 中有说明。

## 资源 {#resources}

仅运行 **Home Assistant**（没有任何负载/流量）就会占用约 300-400 MB 的 RAM：

```ros
/system/resource/print
                   uptime: 4m27s
                  version: 7.13.3 (stable)
               build-time: 2024-01-24 13:16:46
         factory-software: 7.10
              free-memory: 143.0MiB
             total-memory: 448.0MiB
```
