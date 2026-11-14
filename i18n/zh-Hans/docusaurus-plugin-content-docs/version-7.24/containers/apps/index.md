---
sidebar_key: "containers/apps/index"
sidebar_position: 2
title: "应用"
sidebar_label: "应用"
description: "Apps 菜单提供一个预配置应用程序目录，这些应用程序可通过容器部署，具备自动的 RouterOS 配置，并支持多个容器注册表。它需要安装 Container 软件包，初始设置时需要物理访问权限，并且包含安全方面的考量，例如证书验证和硬件设备管理。"
tags:
  - 'container'
  - 'apps'
  - 'security'
source: https://manual.mikrotik.com/docs/7.24/containers/apps
captured_at: '2026-11-04T11:27:37+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

#### 概述 {#summary}

**子菜单：** `/app`  
**所需软件包：** `container`

App 菜单提供了一个应用目录，只需点击几下即可部署其中的应用。每个应用可以包含一个或多个预配置容器，并且会自动应用必要的 RouterOS 配置，例如防火墙规则和地址转换。此目录由 MikroTik 准备和维护，但容器镜像来自多个注册表，例如 Docker Hub、GCR 和 Quay。

不过，可以在启用应用之前编辑配置参数，并且始终可以查看所应用的 yaml 文件。

#### 要求 {#requirements}

App 系统继承与 Container 软件包相同的要求：

- **架构支持：** arm64 和 x86 架构。
- **容器软件包：** 必须已安装。
- **设备模式：** 必须启用容器模式（需要物理访问并重置设备）。
- **外部存储：** 强烈建议使用外部存储以获得最佳性能。
- **内存要求：** 为容器操作提供足够的 RAM（16MB SPI flash 设备可能需要外部存储来存放镜像）。
- **架构限制：** 不支持搭载 EN7562CT CPU 的设备（例如 hEX Refresh）。

#### 安全注意事项 {#security-considerations}

与底层 Container 系统一样，App 菜单也继承其安全影响：

- 初次启用容器支持需要物理访问。
- 启用后，容器可以远程管理。
- 设备被攻陷后，可利用容器安装恶意软件。
- 设备安全性等同于运行容器时的安全性。
- 第三方容器镜像可能引入安全漏洞。

## 属性 {#properties}

| 属性 | 类型 | 默认值 | 描述 |
| :-- | :-- | :-- | :-- |
| **auto-update** | *yes* &#124; *no* | *no* | 启用或禁用在新容器镜像版本可用时自动更新。 |
| **check-certificate** | *yes* &#124; *no* | *yes* | 在拉取容器镜像前验证注册表证书。 |
| **container-command-lines** | *string* | *（空）* | 指定启动容器时传递给应用程序的命令行参数。 |
| **devices** | *string* | *（空）* | 指定要直通给容器应用程序的额外硬件设备。 |
| **environment** | *string* | *（空）* | 定义可供运行中应用程序使用的环境变量。指定为键值对列表。 |
| **extra-mounts** | *string* | *（空）* | 指定要附加到容器的额外挂载点。 |
| **firewall-redirects** | *string* | *（空）* | 配置从主机设备到容器的端口重定向。 |
| **network** | *default* &#124; *lan* &#124; *internal* | *default* | 指定容器将使用的网络：**internal**（位于 NAT 之后）、**lan**（在 LAN 网络上）或 **default**（因应用程序而异；可以是 internal 或 lan）。 |
| **network-outgoing-access** | *yes* &#124; *no* | *yes* | 允许特定容器应用程序进行网络出站访问；设置为 `no` 时，会创建一条 mangle drop 规则。 |
| **pvid** | *integer* | *1* | 设置网桥中容器虚拟以太网接口的端口 VLAN ID（PVID）。 |
| **required-hw-devices** | *string* | *（空）* | 容器启动前必须存在于主机上的硬件设备。仅在添加 YAML 配置后可配置此属性。 <br/><br/><strong>Compose 格式：</strong><code>[host-hw-device]:[device-in-app]</code> |
| **required-mounts** | *string* | *（空）* | 容器启动前必须挂载的目录。仅在添加 YAML 配置后可配置此属性。 <br/><br/><strong>Compose 格式：</strong><code>[dir-on-host]:[dir-in-app]</code> |
| **use-https** | *yes* &#124; *no* | *yes* | 对应用程序 URL 使用 HTTPS。此选项在不支持云服务的设备上不会生效。 |
| **yaml** | *string* | *（空）* | 提供应用程序的 YAML 组合配置。有关配置示例，请参阅文档。 |

## 只读属性 {#read-only-properties}

| 属性 | 类型 | 默认值 | 描述 |
| :-- | :-- | :-- | :-- |
| **app-size** | | | 应用的总大小。 |
| **app-store-url** | *string* | | 安装该应用时所用应用商店的 URL。 |
| **cpu-usage** | | | 应用当前的 CPU 使用率百分比。 |
| **custom** | *yes* &#124; *no* | | 指示该应用是否为用户创建的自定义应用。 |
| **data-size** | | | 应用存储的数据大小。 |
| **default-credential** | *string* | | 应用所需的默认凭据。 |
| **default-network** | *lan* &#124; *internal* | | 应用使用的默认网络。有效值为 `lan` 或 `internal`。 |
| **description** | *string* | | YAML 配置的 `descr` 参数中定义的应用描述。 |
| **from-app-store** | *yes* &#124; *no* | | 指示该应用是否从自定义应用商店安装。 |
| **interface** | *string* | | 应用使用的 VETH 接口。 |
| **ip-address** | *IP* | | 分配给 VETH 接口的 IP 地址。 |
| **memory-current** | | | 应用当前使用的内存量。 |
| **name** | *string* | | YAML 配置的 `name` 参数中定义的应用名称。 |
| **project-page** | *string* | | YAML 配置的 `page` 参数中定义的应用项目页面 URL。 |
| **running** | | | 指示应用当前是否正在运行。 |
| **status** | *acquire veth* &#124; *configuring container(s)* &#124; *downloading/extracting* &#124; *starting* | | 应用的当前状态。可能的值表示应用正在获取 VETH 接口、配置容器、下载/解压或启动。 |
| **ui-url** | *string* | | 为应用 Web 界面生成的 URL（如果可用）。 |
| **variables-to-be-used-in-environment** | | | 应用环境中存在的所有变量的列表。 |

#### 设置向导 {#setup-wizard}

App 菜单包含设置向导（GUI 中的“Setup”按钮，或命令 `/app/setup`）。此向导会自动完成所有网络、存储和注册表设置，否则这些设置需要多个手动步骤。

##### 第 1 步：存储选择 {#step-1-storage-selection}

选择用于安装应用的存储磁盘。系统会自动检测可用的已格式化磁盘驱动器（例如 nvme1、usb1、disk1 及类似设备）。如果列表中没有合适的磁盘，必须先使用 ext4 或 btrfs 文件系统格式化磁盘，然后通过 `/disk` 菜单挂载它。

**要求：**

- 建议顺序读写速度至少为 100 MB/s。
- 建议随机 IOPS（每秒输入/输出操作数）至少为 10,000。
- 在继续之前，使用 `/disk/test` 命令验证存储性能。
- 强烈建议使用外部存储设备以获得最佳性能。

##### 第 2 步：网桥配置 {#step-2-bridge-configuration}

选择用于容器网络的 LAN 网桥接口。此配置会启用自动端口转发和本地网络上的应用自动发现。设置向导会自动配置以下内容：

- 创建虚拟以太网（veth）接口
- 将 veth 接口添加到已配置的网桥
- 用于出站连接的 NAT 规则

##### 第 3 步：IP 配置 {#step-3-ip-configuration}

定义路由器的 IP 地址以允许访问应用。系统会自动检测主 IP 地址；不过，对于复杂网络设置，也支持手动配置。指定的 IP 地址用于以下目的：

- 生成应用 UI URL。
- 创建自动端口转发规则。
- 提供 WebFig 集成链接。

##### 完成 {#completion}

完成设置向导后，App 系统即可立即使用。你可以直接通过界面启用应用。系统会自动处理所有底层容器配置。

#### 配置 {#configuration}

可通过 `/app/settings` 访问 App 配置，与手动容器配置相比，它提供了简化的设置

## 属性 {#properties-1}

| 属性 | 类型 | 默认值 | 描述 |
| :-- | :-- | :-- | :-- |
| **app-store-urls** | *string* | *（空）* | 自定义应用商店的 URL。该 URL 必须指向一个 YAML 数组，其中每个应用都是该数组中的一个元素。 |
| **auto-update** | *yes* &#124; *no* | *no* | 为所有已安装的应用软件包启用自动更新的全局设置。 |
| **disk** | *string* | *（空）* | 指定将用于存储操作的磁盘的全局设置。 |
| **download-path** | *string* | *（空）* | 手动指定所有下载内容将存储的目录路径。 |
| **lan-bridge** | *string* | *（空）* | 手动指定代表局域网（LAN）的网桥接口。 |
| **media-path** | *string* | *（空）* | 手动指定所有媒体文件将存储的目录路径。 |
| **registry-mirrors** | *string* | *（空）* | 指定用于容器镜像获取的一个或多个注册表镜像 URL 地址。 |
| **router-ip** | *IP* | *（空）* | 手动指定可访问当前 RouterOS 设备的 IP 地址。 |
| **show-in-webfig** | *yes* &#124; *no* | *yes* | 控制是否在 WebFig 登录页面上显示指向已启用应用的链接。 |

### 自动配置的设置 {#auto-configured-settings}

某些参数最初会根据网络检测自动配置。如有需要，始终可以手动覆盖这些值。

| 属性 | 类型 | 默认值 | 描述 |
| :-- | :-- | :-- | :-- |
| **assumed-router-ip** | *IP* | *（已检测）* | 自动检测到的 RouterOS 设备的网络 IP 地址。 |
| **assumed-lan-bridge** | *string* | *（已检测）* | 自动检测到的用于 LAN 连接的网桥接口。 |
| **assumed-media-path** | *string* | *disk/media* | 默认媒体存储路径，通常位于系统磁盘上。 |
| **assumed-download-path** | *string* | *disk/media/downloads* | 默认下载目录路径，通常位于媒体存储区域内。 |

#### 应用管理 {#application-management}

应用通过 `/app` 接口进行管理，提供与底层 `/container` 系统类似的状态监控和生命周期控制：

```
/app> print 
Flags: X - DISABLED, R - RUNNING
Columns: NAME, UI-URL, MEMORY-CURRENT, APP-SIZE, DATA-SIZE, CATEGORY, DESCRIPTION
```

##### 状态指示符和元数据 {#status-indicators-and-metadata}

- **标志：**
  - X（DISABLED）- 可以表示两种状态：未下载/未安装（APP-SIZE 和 DATA-SIZE 将为空），或已下载但已禁用（APP-SIZE 和 DATA-SIZE 显示存储占用）。
  - R（RUNNING）- 应用正在运行且可访问。
- **UI-URL：** 应用运行时可直接访问 Web 界面的 URL。
- **MEMORY-CURRENT：** 实时内存消耗，单位为 MiB（仅在运行时）。
- **APP-SIZE：** 容器镜像存储消耗，单位为 MiB（下载后显示已用空间）。
- **DATA-SIZE：** 应用持久数据大小，单位为 KiB/MiB（显示配置和用户数据）。
- **CATEGORY：** 应用功能分类。
- **DESCRIPTION：** 应用功能描述。

##### 应用生命周期管理 {#application-lifecycle-management}

### 部署过程 {#deployment-process}

与需要多个配置步骤（veth 接口、网桥设置、环境变量、挂载和防火墙规则）的手动容器部署不同，App 部署会自动完成整个过程：

1. **选择：** 通过 CLI 或 WebFig 从目录中选择一个应用。
2. **下载：** 自动下载并解压容器镜像。
3. **网络设置：** 自动配置 veth 接口和网桥。
4. **端口转发：** 自动创建用于 Web 访问的防火墙规则。
5. **启动：** 使用预配置设置初始化容器。
6. **访问：** UI-URL 变为可用，可立即访问 Web 界面。

#### 清理命令 {#cleanup-command}

清理命令会完全移除应用，包括所有关联数据。此操作具有破坏性且不可逆：

```
/app> cleanup pihole 
App data will be lost, continue? [y/N]:
```

**清理过程：**

1. 停止正在运行的容器。
2. 移除所有应用数据和配置文件。
3. 从存储中删除容器镜像。
4. 将应用重置为未安装状态（APP-SIZE 和 DATA-SIZE 为空）。
5. 移除该应用特定的网络配置。

:::warning

所有用户数据、配置设置和应用状态都将永久丢失。清理后，应用将返回其原始目录状态，并需要完全重新配置。

:::

#### 用户可添加的应用 {#user-addable-apps}

从 RouterOS v7.22 开始，你可以使用 compose YAML 文件创建自己的自定义应用。这使有经验的用户能够构建适合其特定网络需求的解决方案。

工作原理：

- 你编写一个 compose YAML 文件，用于定义应用的结构和行为
- RouterOS 处理此文件以构建可用的应用软件包
- 你的自定义应用可以使用 RouterOS 功能和 API

为什么使用它：

- 精确构建你的网络所需的内容
- 无需等待官方应用发布
- 非常适合自动化、自定义路由或专用服务
- 声明式设置使管理更容易

## 使用 YAML 创建自定义应用 {#creating-a-custom-app-with-yaml}

你可以使用 YAML 配置文件创建自定义容器应用。此示例演示如何设置一个运行 iperf3 服务器以进行网络性能测试的 Alpine Linux 容器。

### YAML 配置示例 {#yaml-configuration-example}

```routeros
name: alpine-iperf
descr: Alpine Linux container running iperf3 server
page: https://iperf.fr/
category: network
default-credential: none
services:
  iperf:
    image: docker.io/alpine:latest
    ports:
      - 5201:5201:tcp
      - 5201:5201:udp
    command: /bin/sh -c "apk add --no-cache iperf3 && iperf3 -s"
```

### 配置字段参考 {#configuration-field-reference}

| 字段 | 描述 |
|---|---|
| `name` | 自定义应用的唯一标识符 |
| `descr` | 应用功能的可读描述 |
| `page` | 项目官方文档或网站的 URL |
| `category` | 分类分组（例如 network、system、utilities） |
| `default-credential` | 认证要求（none，或指定用户名/密码） |
| `services` | 容器服务定义 |
| `image` | 用于容器的 Docker 镜像 |
| `ports` | 格式为 `host:container:protocol` 的端口映射 |
| `command` | 在容器内执行的启动命令 |

### 此示例如何工作 {#how-this-example-works}

1. **基础镜像：** 使用来自 Docker Hub 的官方 Alpine Linux 镜像
2. **软件包安装：** 安装 iperf3 网络性能测试工具
3. **服务器模式：** 以服务器模式（`-s` 标志）运行 iperf3，以接受客户端连接
4. **端口暴露：** 将 TCP 和 UDP 端口 5201（iperf3 的默认端口）映射到主机

此配置会创建一个充当网络吞吐量测试服务器的容器，让你可以测量客户端与该容器之间的带宽。

## 添加自定义应用 {#adding-a-custom-app}

创建自定义应用有两种方式：导入 .yml 文件，或创建空白应用并直接编辑其 YAML。

在此示例中，我们将添加之前使用 compose 文件创建的 alpine-iperf 应用。为便于使用，我们会将其放入 LAN 网桥，以便网络中的设备无需 NAT 即可轻松访问它。

### 方法 1：创建空白应用并编辑 YAML {#method-1-create-a-blank-app-and-edit-yaml}

首先，创建应用并将其分配到 LAN 网络：

```routeros
/app/add network=lan
```

默认情况下，应用将命名为“app”。

接下来，添加 YAML 配置。在终端中运行：

```routeros
/app/edit app yaml
```

这会打开一个文本编辑器，你可以在其中粘贴 YAML。粘贴后，按 <kbd>Control</kbd>+<kbd>O</kbd> 保存更改。最后，启用应用以使其开始运行。

### 方法 2：从文件导入 {#method-2-import-from-a-file}

或者，将 compose 文本保存到文件并上传到设备。然后，使用以下命令将该文件设置为应用的 YAML：

```routeros
/app/add yaml=[/file/get alpine-iperf.yml contents]
```

当你已有准备好导入的预配置 YAML 文件时，此方法很有用。

#### 提示和最佳实践 {#tips-and-best-practices}

- **存储：** 为获得最佳性能和更大容量，请考虑使用外部存储设备，例如 USB 驱动器、SATA 驱动器或 NVMe SSD。

- **内存：** 在终端中运行 `/app/print` 命令来跟踪应用的内存消耗。

- **更新：** 仅在需要且认为必要时更新系统。虽然自动更新可以提供安全补丁和新功能，但在启用或应用更新之前，评估你的特定用例是否需要更新很重要。

- **网络：** 应用会自动管理端口转发，并生成用于外部访问的必要 URL。

- **数据持久性：** 你的应用数据存储在指定存储路径中，即使应用重启或系统重启后也会保持不变。
