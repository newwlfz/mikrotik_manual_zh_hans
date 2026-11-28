---
title: "应用"
description: "“Apps”菜单提供可通过容器部署的预配置应用程序目录，支持自动 RouterOS 配置和多个容器注册表。它需要安装 Container 软件包，初始设置需要物理访问，并包含证书验证和硬件设备管理等安全注意事项。"
tags:
  - 'container'
  - 'apps'
  - 'security'
source: https://manual.mikrotik.com/docs/7.24/containers/apps
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

#### 摘要 {#summary}

**子菜单：** `/app`  
**所需软件包：** `container`

App 菜单提供应用程序目录，可通过几次点击完成部署。每个应用可由一个或多个预配置容器组成，必要的 RouterOS 配置（例如防火墙规则和地址转换）将自动应用。该目录由 MikroTik 准备和维护，但容器镜像来自多个注册表，例如 Docker Hub、GCR 和 Quay。

配置参数可以在启用应用之前编辑，并且始终可以查看已应用的 yaml 文件。

#### 要求 {#requirements}

App 系统继承与 Container 软件包相同的要求：

- **架构支持：** arm64 和 x86 架构。
- **Container 软件包：** 必须安装。
- **设备模式：** 必须启用 Container 模式（需要物理访问并重置设备）。
- **外部存储：** 强烈建议使用，以获得最佳性能。
- **内存要求：** 运行容器需要足够的 RAM（16MB SPI flash 设备可能需要外部存储来保存镜像）。
- **架构限制：** 不支持使用 EN7562CT CPU 的设备（例如 hEX Refresh）。

#### 安全注意事项 {#security-considerations}

与底层 Container 系统一样，App 菜单继承相同的安全影响：

- 首次启用容器支持需要物理访问。
- 启用后，可以远程管理容器。
- 受入侵的设备可能使用容器安装恶意软件。
- 设备安全性等同于所运行容器的安全性。
- 第三方容器镜像可能引入安全漏洞。

## 属性 {#properties}

| 属性 | 类型 | 默认 | 说明 |
| :-- | :-- | :-- | :-- |
| **auto-update** | *yes* &#124; *no* | *no* | 当新的容器镜像版本可用时，启用或禁用自动更新。 |
| **check-certificate** | *yes* &#124; *no* | *yes* | 在拉取容器镜像前验证 registry 证书。 |
| **container-command-lines** | *string* | *(empty)* | 指定启动容器时传递给应用程序的命令行参数。 |
| **devices** | *string* | *(empty)* | 指定传递给容器应用程序的额外硬件设备。 |
| **environment** | *string* | *(empty)* | 定义运行中的应用程序可用的环境变量。以键值对列表形式指定。 |
| **extra-mounts** | *string* | *(empty)* | 指定要附加到容器的额外挂载点。 |
| **firewall-redirects** | *string* | *(empty)* | 配置从主机设备到容器的端口重定向。 |
| **network** | *default* &#124; *lan* &#124; *internal* | *default* | 指定容器使用的网络：**internal**（位于 NAT 之后）、**lan**（位于 LAN 网络中）或 **default**（因应用程序而异；可以是 internal 或 lan）。 |
| **network-outgoing-access** | *yes* &#124; *no* | *yes* | 允许特定容器应用访问外部网络；设置为 `no` 时，将创建一条 mangle drop 规则。 |
| **pvid** | *integer* | *1* | 为网桥中容器的虚拟以太网接口设置 Port VLAN ID（PVID）。 |
| **required-hw-devices** | *string* | *(empty)* | 容器启动前主机上必须存在的硬件设备。该属性仅在添加 YAML 配置后可配置。 <br/><br/><strong>Compose 格式：</strong><code>[host-hw-device]:[device-in-app]</code> |
| **required-mounts** | *string* | *(empty)* | 容器启动所需的挂载目录。该属性仅在添加 YAML 配置后可配置。 <br/><br/><strong>Compose 格式：</strong><code>[dir-on-host]:[dir-in-app]</code> |
| **use-https** | *yes* &#124; *no* | *yes* | 应用程序 URL 使用 HTTPS。不支持云服务的设备上该选项不起作用。 |
| **yaml** | *string* | *(empty)* | 提供应用程序的 YAML 组合配置。配置示例请参阅文档。 |

## 只读属性 {#read-only-properties}

| 属性 | 类型 | 默认 | 说明 |
| :-- | :-- | :-- | :-- |
| **app-size** | | | 应用程序的总大小。 |
| **app-store-url** | *string* | | 安装应用程序的 app store 的 URL。 |
| **cpu-usage** | | | 应用程序当前的 CPU 使用率百分比。 |
| **custom** | *yes* &#124; *no* | | 指示应用程序是否为用户创建的自定义应用程序。 |
| **data-size** | | | 应用程序存储的数据大小。 |
| **default-credential** | *string* | | 应用程序所需的默认凭据。 |
| **default-network** | *lan* &#124; *internal* | | 应用程序使用的默认网络。有效值为 `lan` 或 `internal`。 |
| **description** | *string* | | YAML 配置的 `descr` 参数中定义的应用程序描述。 |
| **from-app-store** | *yes* &#124; *no* | | 指示应用程序是否从自定义 app store 安装。 |
| **interface** | *string* | | 应用程序使用的 VETH 接口。 |
| **ip-address** | *IP* | | 分配给 VETH 接口的 IP 地址。 |
| **memory-current** | | | 应用程序当前使用的内存量。 |
| **name** | *string* | | YAML 配置的 `name` 参数中定义的应用程序名称。 |
| **project-page** | *string* | | YAML 配置的 `page` 参数中定义的应用程序项目页面 URL。 |
| **running** | | | 指示应用程序当前是否正在运行。 |
| **status** | *acquire veth* &#124; *configuring container(s)* &#124; *downloading/extracting* &#124; *starting* | | 应用程序的当前状态。可能的值表示应用程序正在获取 VETH 接口、配置容器、下载/解压或启动。 |
| **ui-url** | *string* | | 应用程序 Web 界面的生成 URL（如果可用）。 |
| **variables-to-be-used-in-environment** | | | 应用程序环境中存在的所有变量列表。 |

#### 设置向导 {#setup-wizard}

App 菜单包含设置向导（GUI 中的“Setup”按钮，或命令 `/app/setup`）。该向导会自动完成所有网络、存储和 registry 设置，否则这些设置需要多个手动步骤。

##### 第 1 步：存储选择 {#step-1-storage-selection}

选择用于安装应用程序的存储磁盘。系统会自动检测可用的已格式化磁盘驱动器（例如 nvme1、usb1、disk1 及类似设备）。如果列表中没有合适的磁盘，必须先使用 ext4 或 btrfs 文件系统格式化该磁盘，然后通过 `/disk` 菜单挂载它。

**Requirements:**

- 建议最低顺序读/写速度为 100 MB/s。
- 建议最低随机 IOPS（Input/Output Operations Per Second）为 10,000。
- 继续操作前，使用 `/disk/test` 命令验证存储性能。
- 为获得最佳性能，强烈建议使用外部存储设备。

##### 第 2 步：网桥配置 {#step-2-bridge-configuration}

选择用于容器网络的 LAN 网桥接口。此配置可在本地网络上启用自动端口转发和应用自动发现。设置向导会自动配置以下内容：

- 创建虚拟以太网（veth）接口
- 将 veth 接口添加到已配置的网桥
- 用于出站连接的 NAT 规则

##### 第 3 步：IP 配置 {#step-3-ip-configuration}

定义路由器的 IP 地址，以启用应用访问。系统会自动检测主 IP 地址；不过，对于复杂网络设置，也支持手动配置。指定的 IP 地址用于以下用途：

- 生成应用 UI URL。
- 创建自动端口转发规则。
- 提供 WebFig 集成链接。

##### Completion

完成设置向导后，App 系统即可立即使用。你可以通过接口直接启用应用。系统会自动处理所有底层容器配置。

#### 配置 {#configuration}

可通过 `/app/settings` 访问 App 配置，与手动配置 Container 相比，该配置提供了更简化的设置方式。

## 属性 {#properties-1}

| 属性 | 类型 | 默认值 | 说明 |
| :-- | :-- | :-- | :-- |
| **app-store-urls** | *string* | *(empty)* | 自定义应用商店的 URL。该 URL 必须指向一个 YAML 数组，其中每个应用都是数组中的一个元素。 |
| **auto-update** | *yes* &#124; *no* | *no* | 全局设置，为所有已安装的应用包启用自动更新。 |
| **disk** | *string* | *(empty)* | 全局设置，指定用于存储操作的磁盘。 |
| **download-path** | *string* | *(empty)* | 手动指定用于存储所有下载内容的目录路径。 |
| **lan-bridge** | *string* | *(empty)* | 手动指定表示局域网的网桥接口。 |
| **media-path** | *string* | *(empty)* | 手动指定用于存储所有媒体文件的目录路径。 |
| **registry-mirrors** | *string* | *(empty)* | 指定一个或多个用于获取容器镜像的 registry 镜像 URL 地址。 |
| **router-ip** | *IP* | *(empty)* | 手动指定可访问当前 RouterOS 设备的 IP 地址。 |
| **show-in-webfig** | *yes* &#124; *no* | *yes* | 控制是否在 WebFig 登录页显示已启用应用的链接。 |

### 自动配置设置 {#auto-configured-settings}

某些参数会根据网络检测自动进行初始配置。如有需要，始终可以手动覆盖这些值。

| 属性 | 类型 | 默认值 | 说明 |
| :-- | :-- | :-- | :-- |
| **assumed-router-ip** | *IP* | *(detected)* | 自动检测到的 RouterOS 设备网络 IP 地址。 |
| **assumed-lan-bridge** | *string* | *(detected)* | 自动检测到的用于 LAN 连接的网桥接口。 |
| **assumed-media-path** | *string* | *disk/media* | 默认媒体存储路径，通常位于系统磁盘上。 |
| **assumed-download-path** | *string* | *disk/media/downloads* | 默认下载目录路径，通常位于媒体存储区域内。 |

#### 应用管理 {#application-management}

应用通过 `/app` 接口管理，提供状态监控和生命周期控制，类似于底层 `/container` 系统：

```
/app> print 
Flags: X - DISABLED, R - RUNNING
Columns: NAME, UI-URL, MEMORY-CURRENT, APP-SIZE, DATA-SIZE, CATEGORY, DESCRIPTION
```

##### 状态标志和元数据 {#status-indicators-and-metadata}

- **标志：**
  - X（DISABLED） - 可表示两种状态：未下载/未安装（APP-SIZE 和 DATA-SIZE 将为空），或已下载但已禁用（APP-SIZE 和 DATA-SIZE 显示存储使用情况）。
  - R（RUNNING） - 应用正在运行且可访问。
- **UI-URL：** 应用运行时可直接访问 Web 接口的 URL。
- **MEMORY-CURRENT：** 实时内存占用，单位为 MiB（仅在运行时显示）。
- **APP-SIZE：** 容器镜像存储占用，单位为 MiB（下载后显示已用空间）。
- **DATA-SIZE：** 应用持久数据大小，单位为 KiB/MiB（显示配置和用户数据）。
- **CATEGORY：** 应用功能分类。
- **DESCRIPTION：** 应用功能说明。

##### 应用生命周期管理 {#application-lifecycle-management}

### 部署流程 {#deployment-process}

与需要多个配置步骤（veth 接口、网桥设置、环境变量、挂载和防火墙规则）的手动 Container 部署不同，App 部署会自动完成整个流程：

1. **选择：** 通过 CLI 或 WebFig 从目录中选择应用。
2. **下载：** 自动下载并解压容器镜像。
3. **网络设置：** 自动配置 veth 接口和网桥。
4. **端口转发：** 自动创建用于 Web 访问的防火墙规则。
5. **启动：** 使用预配置设置初始化 Container。
6. **访问：** UI-URL 变为可用，可立即访问 Web 界面。

#### 清理命令 {#cleanup-command}

清理命令可完整移除应用，包括所有关联数据。该操作具有破坏性且不可逆：

```
/app> cleanup pihole 
App data will be lost, continue? [y/N]:
```

**清理流程：**

1. 停止正在运行的 Container。
2. 删除所有应用数据和配置文件。
3. 从存储中删除容器镜像。
4. 将应用重置为未安装状态（APP-SIZE 和 DATA-SIZE 为空）。
5. 删除该应用专用的网络配置。

:::warning

所有用户数据、配置设置和应用状态都将永久丢失。清理后，应用将返回其原始目录状态，并需要重新完整配置。
:::

#### 可添加的用户应用 {#user-addable-apps}

从 RouterOS v7.22 开始，你可以使用 compose YAML 文件创建自己的自定义应用。这使有经验的用户能够构建符合其特定网络需求的解决方案。

工作原理：

- 编写 compose YAML 文件，定义应用的结构和行为
- RouterOS 处理该文件以构建可运行的应用包
- 自定义应用可以与 RouterOS 功能和 API 配合使用

使用原因：

- 构建网络所需的确切功能
- 无需等待官方应用发布
- 适用于自动化、自定义路由或专用服务
- 声明式配置使管理更简单

## 使用 YAML 创建自定义应用 {#creating-a-custom-app-with-yaml}

可以使用 YAML 配置文件创建自定义容器应用。本示例演示如何设置运行 iperf3 服务器的 Alpine Linux 容器，用于网络性能测试。

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

| 字段 | 说明 |
|---|---|
| `name` | 自定义应用的唯一标识符 |
| `descr` | 应用功能的可读描述 |
| `page` | 项目官方文档或网站的 URL |
| `category` | 分类组（例如 network、system、utilities） |
| `default-credential` | 身份验证要求（none，或指定 username/password） |
| `services` | 容器服务定义 |
| `image` | 容器使用的 Docker 镜像 |
| `ports` | 采用 `host:container:protocol` 格式的端口映射 |
| `command` | 容器内执行的启动命令 |

### 本示例的工作方式 {#how-this-example-works}

1. **基础镜像**：使用 Docker Hub 中的官方 Alpine Linux 镜像
2. **软件包安装**：安装 iperf3 网络性能测试工具
3. **服务器模式**：以服务器模式运行 iperf3（`-s` 标志），以接受客户端连接
4. **端口暴露**：将 TCP 和 UDP 端口 5201（iperf3 的默认端口）映射到主机

此配置创建一个充当网络吞吐量测试服务器的容器，使你可以测量客户端与此容器之间的带宽。

## 添加自定义应用 {#adding-a-custom-app}

创建自定义 app 有两种方式：导入 .yml 文件，或创建空白 app 并直接编辑其 YAML。

在本示例中，我们将添加使用 compose 文件创建的 alpine-iperf app。为便于使用，我们会将其放入 LAN 网桥，使网络中的设备无需 NAT 即可轻松访问它。

### 方法 1：创建空白 app 并编辑 YAML {#method-1-create-a-blank-app-and-edit-yaml}

首先，创建 app 并将其分配到 LAN 网络：

```routeros
/app/add network=lan
```

默认情况下，app 将命名为“app”。

接下来，添加 YAML 配置。在 Terminal 中运行：

```routeros
/app/edit app yaml
```

这会打开一个文本编辑器，可在其中粘贴 YAML。粘贴后，按 <kbd>Control</kbd>+<kbd>O</kbd> 保存更改。最后，启用 app 以启动它。

### 方法 2：从文件导入 {#method-2-import-from-a-file}

或者，将 compose 文本保存到文件并上传到设备。然后，使用以下命令将该文件设置为应用的 YAML：

```routeros
/app/add yaml=[/file/get alpine-iperf.yml contents]
```

此方法适用于已准备好要导入的 YAML 文件的情况。

#### 提示和最佳实践 {#tips-and-best-practices}

- **存储：** 为获得最佳性能和更大容量，请考虑使用外部存储设备，例如 USB drive、SATA drive 或 NVMe SSD。

- **内存：** 在终端中运行 `/app/print` 命令，跟踪应用的内存消耗。

- **更新：** 仅在需要且认为必要时更新系统。虽然自动更新可以提供安全补丁和新功能，但在启用或应用更新之前，请务必评估特定使用场景是否需要该更新。

- **网络：** 应用会自动管理端口转发，并生成外部访问所需的 URL。

- **数据持久性：** 应用数据存储在指定的存储路径中，即使应用重启或系统重启后也会保持不变。
