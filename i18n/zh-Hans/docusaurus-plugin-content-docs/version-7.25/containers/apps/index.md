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
source: https://manual.mikrotik.com/docs/7.25/containers/apps
captured_at: '2026-11-04T11:14:51+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
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
| **check-certificate** | *yes* &#124; *no* | *yes* | 在拉取容器镜像之前，对照路由器的[证书存储](../../authentication-authorization-accounting/certificates.md)验证仓库证书。 |
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

## 自定义 App {#custom-apps}

从 RouterOS v7.22 开始，你可以使用 'compose' YAML 文件创建自己的自定义 App。这使有经验的用户能够构建适合其特定网络需求的解决方案。

工作原理：

- 你以 YAML 格式定义 App 内部结构和有限的 RouterOS 配置
- RouterOS 拉取指定的镜像并创建你的 App
- 该 App 在 RouterOS 硬件上运行，并免费提供新功能
- 可选地，让它与我们的 API 交互

为什么使用它：

- 精确构建你的网络所需的内容
- 无需等待官方应用发布
- 非常适合自动化、自定义路由或专用服务
- 声明式设置使管理更容易

### 如何添加 App {#how-to-add-apps}

有三种方式，但它们都依赖 YAML。

#### 方法 1：创建空白 App 并编辑 YAML {#method-1-create-a-blank-app-and-edit-yaml}

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

#### 方法 2：从文件导入 {#method-2-import-from-a-file}

或者，将 compose 文本保存到文件并上传到设备。然后，使用以下命令将该文件设置为应用的 YAML：

```routeros
/app/add yaml=[/file/get alpine-iperf.yml contents]
```

当你已有准备好导入的预配置 YAML 文件时，此方法很有用。

#### 方法 3：添加自定义应用商店 URL {#method-3-add-custom-app-store-url}

如果你或你认识的人已在 Web 服务器上托管了自己的 App 或 App 列表，你只需在 App 设置中添加该 URL。这样就能拥有一个可动态更新的自定义 App 目录。

```routeros
/app/settings set app-store-urls="<custom_url>"
```

为使此功能正常工作，该 URL 应直接返回 YAML 文件的文本内容，其中多个 App 按照标准 YAML 语法列在一个简单列表中。

### 为自定义 App 编写 YAML {#writing-yaml-for-a-custom-app}

此示例使用现有的 openEuler 基础镜像创建一个 iperf3 App。

```yaml
name: openeuler-iperf
descr: openEuler container running iperf3 server
page: https://iperf.fr/
category: networking
default-credentials: none
services:
  iperf:
    image: docker.io/openeuler/iperf:latest
    ports:
      - 5201:5201:tcp
      - 5201:5201/udp:udp
    command: /bin/sh -c "iperf3 -s"

```

关键区别：
- 基础镜像已经安装了 iperf
- 必要端口已转发/映射到路由器 IP
- “command” 在容器启动时执行并运行 iperf3

或者，你可以使用像 Alpine Linux 这样的普通基础镜像，并使用 'command' 安装 iperf3。

```yaml
name: alpine-iperf
descr: Alpine Linux container running iperf3 server
page: https://iperf.fr/
category: networking
default-credentials: none
services:
  iperf:
    image: docker.io/alpine:latest
    command: /bin/sh -c "apk add --no-cache iperf3 && iperf3 -s"
networks:
  default:
    name: lan
    external: true

```

关键区别：
- 干净的基础镜像
- 每次启动时都会安装并运行 iperf3
- App 的网络设置为你的 LAN（作为端口转发的替代方案）

可选地，如果你希望确保 'command' 只执行某操作一次，可以考虑使用如下条件单行命令：

```yaml
command: /bin/sh -c "if ! command -v iperf3 >/dev/null 2>&1; then apk add --no-cache iperf3; fi; exec iperf3 -s"
```

### 端口映射 {#port-mapping}

映射端口时，使用 X:Y 或 X:Y:Z 语法，其中 X 是路由器上的端口，Y 是容器上的端口，Z 为端口指定名称；不过，某些名称可能具有特殊功能，例如 'web' 会使 RouterOS 设置带有自动生成 URL 的反向代理。
一些有效示例：

```yaml
2211:21
888:80:web
9000:9000:api
9001:9001:api-secure

```

默认情况下，所有端口都设置为 TCP，除非你像下面这样将它们定义为 UDP：

```yaml
6000:6000/udp:udp
8000:8000/udp:custom_name

```

:::warning
默认情况下，端口 `80` 会被视为 Web 端口，除非你明确将其设置为其他类型。有一个健康检查会探测此端口——如果没有进程在监听，App 将看起来卡在 `starting` 状态。当端口 `80` 未映射时，将改用第一个定义的端口。为避免歧义，请明确命名你使用的端口。
:::

## YAML 字段参考 {#yaml-field-reference}

一个 YAML 文档定义一个 App：一个包含 App 元数据的 App 级部分，以及一个包含一个或多个容器定义的 `services` 部分。

### App 级字段 {#app-level-fields}

| 字段 | 类型 | 说明 |
|---|---|---|
| `name` | *string* | App 的唯一名称。 |
| `descr` | *string* | App 的说明。 |
| `page` | *string* | 项目页面的 URL，显示为 App 的 `project-page` 属性。 |
| `category` | *string* | App 列表中显示的分类组（例如 network、system、utilities）。 |
| `default-credentials` | *string* | `username:password` 格式的登录凭据。仅供参考；可以留空。|
| `icon` | *string* | WebFig 登录页面上显示的图标图像 URL。 |
| `url-path` | *string* | 追加到 App URL 的路径，例如 `/login` 或 `/web`。 |
| `auto-update` | *boolean* | 当为 `true` 时，在有新的容器镜像可用时自动更新 App。 |
| `supported-archs` | *list of strings* | App 支持的 CPU 架构：`arm`、`arm64`、`arm_v5` 和 `x86`。不匹配指定架构的设备将不会显示该 App。 |
| `compatible-boards` | *list of strings* | App 支持的板卡名称，例如 `RDS2216`。接受 `*` 通配符。不匹配指定板卡名称的设备将不会显示该 App。 |
| `services` | *map* | 容器服务定义。至少需要一个服务。 |
| `volumes` | *map* | 服务使用的命名卷声明。 |
| `secrets` | *map* | App 的密钥名称，在 `environment` 中通过 `[secret:name]` 引用。 |
| `configs` | *map* | 挂载到服务中的配置文件声明。 |
| `networks` | *map* | 服务使用的网络声明。 |

### 服务字段 {#service-fields}

| 字段 | 类型 | 说明 |
|---|---|---|
| `image` | *string* | 用于容器的 App 镜像。必填。 |
| `container_name` | *string* | 与特定镜像一起使用的名称，如 `/container` 菜单中所示。 |
| `command` | *string* | 在容器内执行的启动命令。 |
| `entrypoint` | *string* | 用作容器入口点的可执行文件。 |
| `environment` | *list or map* | 传递给容器的环境变量。|
| `volumes` | *list* | 挂载到容器的挂载点。 |
| `ports` | *list* | 从路由器到容器的端口映射。 |
| `expose` | *list* | 向其他容器公开但不在路由器上发布的端口。 |
| `restart` | *string* | 容器的重启策略。`unless-stopped`、`always` 和 `on-failure`。 |
| `depends_on` | *list* | 必须在此服务之前启动的服务名称。 |
| `healthcheck` | *map* | 容器启动时运行健康检查。请参见下面的示例。 |
| `shm_size` | *string* | 共享内存大小，例如 `512mb` 或 `1gb`。 |
| `stop_grace_period` | *string* or *int* | 优雅关闭的超时时间，例如 `30s` 或 `0`。默认 30 秒。 |
| `devices` | *list* | 透传到容器的硬件设备，例如 `- /dev/ttyACM0:/dev/ttyACM0`。 |
| `user` | *string* | 容器运行所使用的 Linux 用户或 UID。 |
| `hostname` | *string* | 在容器中设置的主机名。 |
| `security_opt` | *list* | 容器安全选项。 |
| `build` | *map* | 用于本地构建镜像的构建配置。 |
| `secrets` | *list* | 此服务可用的密钥名称，以文件形式挂载到 `/run/secrets/<name>`。 |
| `configs` | *list* | 挂载到此服务中的配置文件。 |

### 健康检查 {#healthcheck}

健康检查会探测服务，以验证应用是否正常运行。“test” 参数在容器内运行，当命令返回退出代码 0 时，服务被视为健康：

```yaml
healthcheck:
  test: ["CMD", "curl -f http://localhost:8080/ || exit 1"]
  interval: 30s
  retries: 3
  start_period: 30s
  timeout: 10s
```

### 运行时占位符 {#runtime-placeholders}

环境变量值和 default-credentials 字段可以包含占位符，RouterOS 会在 App 运行时替换这些占位符。

| 占位符 | 说明 |
|---|---|
| `[accessIP]` | 用于从外部访问 App 的 IP 地址或主机名。 |
| `[accessPort]` | 映射到 App Web 界面的路由器端口。 |
| `[accessProto]` | 用于访问 App 的协议，`http` 或 `https`。 |
| `[containerIP]` | 分配给容器的 IP 地址。 |
| `[containerInterface]` | 为 App 创建的 VETH 接口名称。 |
| `[routerIP]` | 路由器在 App 网络上的 IP 地址。 |
| `[env:variable]` | App 的环境变量值。 |
| `[env:service:variable]` | 特定服务的环境变量值。 |
| `[secret:name]` | 在 App 级 `secrets` 部分声明的密钥值。 |

在环境变量值中使用占位符可自动配置服务：

```yaml
environment:
  - NEXTCLOUD_TRUSTED_DOMAINS=[accessIP]
  - APP_URL=[accessProto]://[accessIP]:[accessPort]
```

### 卷 {#volumes}

向服务添加持久化数据：

```yaml
services:
  app:
    image: docker.io/example/app:latest
    volumes:
      - data:/data              # persistent directory in the App storage
      - appdata/conf:/etc/app   # sub-directory, mounted at /etc/app
      - ./custom:/custom        # relative to the storage path
```

### 密钥 {#secrets}

密钥存储会将密码和密钥与环境变量分开存储。在 App 级 `secrets` 部分声明密钥，并在环境变量值和 default-credentials 中通过 `[secret:name]` 引用它们。RouterOS 会在 App 运行时生成密钥值：

```yaml
secrets:
  db_password:
  admin_password:
services:
  db:
    image: docker.io/postgres:17
    environment:
      POSTGRES_PASSWORD: "[secret:db_password]"
  server:
    image: docker.io/example/server:latest
    environment:
      ADMIN_PASSWORD: "[secret:admin_password]"
```

或者，在服务下列出一个密钥，以便将其作为文件挂载到 `/run/secrets/<name>`：

```yaml
services:
  server:
    image: docker.io/example/server:latest
    environment:
      DB_PASSWORD_FILE: /run/secrets/db_password
    secrets:
      - db_password
```

### 配置 {#configs}

配置项以文本形式向容器提供配置文件。在 App 级 `configs` 部分声明内容，并使用 `source`、`target` 和可选的 `mode` 将其挂载到服务中。

```yaml
configs:
  mosquitto_conf:
    content: |
      listener 1883
      allow_anonymous true
services:
  mosquitto:
    image: docker.io/eclipse-mosquitto:latest
    configs:
      - source: mosquitto_conf
        target: /mosquitto/config/mosquitto.conf
        mode: 0644
```

`source` 是 App 级配置声明的名称，`target` 是容器内的路径，`mode` 是文件权限。

### 网络 {#networks}

默认情况下，App 在 NAT 之后的内部网络上运行，并通过映射端口访问服务。要将 App 直接放在某个网络上，请在 App 级 `networks` 部分使用外部网络定义默认网络。

```yaml
networks:
  default:
    name: lan
    external: true
```

## 自定义应用商店 {#custom-app-store}

App 系统支持以 YAML 数组形式提供的自定义应用商店，其中数组的每个元素都是一个 App 定义。该文件必须托管在设备可通过网络访问的服务器上。

由两个 App 组成的 YAML 数组示例：

```yaml
- name: code-server-xxx
  descr: Code-server is VS Code running on a remote server, accessible through the browser.
  page: https://coder.com
  category: development
  icon: https://raw.githubusercontent.com/linuxserver/docker-templates/master/linuxserver.io/img/code-server-logo.png
  default-credentials: <no_username>:password
  services:
    code-server:
      image: lscr.io/linuxserver/code-server:latest
      container_name: code-server
      user: "0:0"
      environment:
        PUID: 0
        PGID: 0
        PASSWORD: password
        PWA_APPNAME: code-server
      volumes:
        - config:/config
        - media:/data/media
      ports:
        - 8443:8443:web
- name: code-server-yyy
  descr: Code-server is VS Code running on a remote server, accessible through the browser.
  page: https://coder.com
  category: development
  icon: https://raw.githubusercontent.com/linuxserver/docker-templates/master/linuxserver.io/img/code-server-logo.png
  default-credentials: <no_username>:password
  services:
    code-server:
      image: lscr.io/linuxserver/code-server:latest
      container_name: code-server
      user: "0:0"
      environment:
        PUID: 0
        PGID: 0
        PASSWORD: password
        PWA_APPNAME: code-server
      volumes:
        - config:/config
        - media:/data/media
      ports:
        - 8443:8443:web
```

## 提示和最佳实践 {#tips-and-best-practices}

- **存储：** 为获得最佳性能和更大容量，请考虑使用外部存储设备，例如 USB 驱动器、SATA 驱动器或 NVMe SSD。

- **内存：** 在终端中运行 `/app/print` 命令来跟踪应用的内存消耗。

- **更新：** 仅在需要且认为必要时更新系统。虽然自动更新可以提供安全补丁和新功能，但在启用或应用更新之前，评估你的特定用例是否需要更新很重要。

- **网络：** 应用会自动管理端口转发，并生成用于外部访问的必要 URL。

- **数据持久性：** 你的应用数据存储在指定存储路径中，即使应用重启或系统重启后也会保持不变。
