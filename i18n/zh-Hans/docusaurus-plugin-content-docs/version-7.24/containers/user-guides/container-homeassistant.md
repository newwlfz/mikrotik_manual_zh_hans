---
title: "Container - HomeAssistant"
description: "本页介绍 MikroTik RouterOS 中的 container 功能，使用户能够直接在路由器上运行 HomeAssistant 等服务器。本页提供分步说明，涵盖启用 container 模式、配置网络、设置挂载和环境变量，以及获取 HomeAssistant Docker 镜像。"
tags:
  - 'container'
  - 'homeassistant'
source: https://manual.mikrotik.com/docs/7.24/containers/user-guides/container-homeassistant
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

RouterOS 中引入的 **container** 功能使各种服务器能够直接运行在路由器上。对于希望减少网络中设备数量的用户来说，这一点尤其有价值。现在，无需在单独机器上部署服务器，可以将其托管在路由器本身中。

本指南将演示如何在 RouterOS 上安装并运行 **Home‑Assistant** 服务器。

Home‑Assistant 是一个广受欢迎的平台，用于从大量传感器收集数据，并为各种 **integrations** 提供广泛支持。

## 摘要 {#summary}

在开始配置之前，请确保已阅读 [container](/docs/containers) 指南。此外，请查看 [disclaimer](/docs/containers#disclaimer) 和 [requirements](/docs/containers#requirements) 部分，以了解所有相关风险以及可能需要执行的必要步骤。

支持的架构可在 [link](https://hub.docker.com/r/homeassistant/home-assistant/tags) 中找到。

本指南发布时，**home-assistant** 镜像支持 ARM64 和 AMD64（CHR 和 x86）设备。

根据 [Home Assistant website](https://www.home-assistant.io/installation/linux/) 的信息，推荐要求如下：

- 2 GB RAM
- 32 GB 存储

但我们将尝试在配置较低的设备上运行它。

## 容器配置 {#container-configuration}

**子菜单：** `/container`

***note**:* 需要 **container** 软件包。

### Container 模式 {#container-mode}

启用 container 模式：

```ros
/system/device-mode/update container=yes
```

如果在 X86 上使用 container，需要通过按下 reset 按钮或冷重启确认 device-mode。

### 网络 {#networking}

添加 veth 接口：

```ros
/interface/veth/add name=veth2 address=172.19.0.2/24 gateway=172.19.0.1
```

为 container 创建网桥，并将 veth 接口添加到该网桥：

```ros
/interface/bridge/add name=ha
/ip/address/add address=172.19.0.1/24 interface=ha
/interface/bridge/port/add bridge=ha interface=veth2
```

如果需要 NAT，转发 TCP 8123 用于 home-assistant 管理（其中 192.168.88.1 是设备的 LAN IP 地址）（可选）：

```ros
/ip/firewall/nat/add action=dst-nat chain=dstnat dst-address=192.168.88.1 dst-port=8123 protocol=tcp to-addresses=172.19.0.2 to-ports=8123
```

### 环境变量和挂载 {#environment-variables-and-mounts}

根据 home-assistant 文档，为配置文件定义挂载（其中 `/usb1` 是外部 USB 存储文件夹）：

```ros
/container/mounts/add dst=/config list=ha_config src=/usb1/ha_config
```

为 home-assistant 创建环境变量：

```ros
/container/envs/add key=TZ list=ha_env value=America/Los_Angeles
```

### 获取镜像 {#getting-image}

为简化配置，将从外部库获取镜像。

确保已相应设置“Registry URL”，限制 RAM 使用量（如有必要），并为镜像设置目录：

```ros
/container/config/set registry-url=https://registry-1.docker.io tmpdir=/usb1/pull
```

拉取 home-assistant 镜像并等待其解压完成：

```ros
/container/add remote-image=homeassistant/home-assistant:latest interface=veth2 root-dir=/usb1/ha mountlists=ha_config envlists=ha_env logging=yes
```

运行命令后，RouterOS 应开始“extracting”软件包。检查“File System”中是否创建了新文件夹，并使用命令 `/container/print` 监控容器状态。

### 启动容器 {#starting-the-container}

确认容器已添加，并且在使用 `/container/print` 后状态已变为 `status=stopped`，即可启动它：

```ros
/container/start 0
```

### Home-Assistant 设置 {#home-assistant-setup}

打开首选的 Web 浏览器，通过指定管理端口“:8123”访问 Home-Assistant 管理门户：

![](/img/c36eaec2e33c6a0b.webp)

继续完成设置。详情请参阅 [Home-Assistant onboarding guide](https://www.home-assistant.io/getting-started/onboarding/)。

## 资源 {#resources}

仅运行 **Home Assistant**（没有任何负载/流量）就会占用约 300-400 MB 内存：

```ros
/system/resource/print
                   uptime: 4m27s
                  version: 7.13.3 (stable)
               build-time: 2024-01-24 13:16:46
         factory-software: 7.10
              free-memory: 143.0MiB
             total-memory: 448.0MiB
```
