---
title: "应用"
description: "“Apps”菜单提供可通过容器部署的预配置应用程序目录，支持自动 RouterOS 配置和多个容器注册表。它需要安装 Container 软件包，初始设置需要物理访问，并包含证书验证和硬件设备管理等安全注意事项。"
tags:
  - 'container'
  - 'apps'
  - 'security'
source: https://manual.mikrotik.com/docs/7.25/containers/apps
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
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
| **check-certificate** | *yes* &#124; *no* | *yes* | 在拉取容器镜像之前，根据路由器的 [certificate store](/docs/authentication-authorization-accounting/certificates) 验证 registry 证书。 |
| **container-command-lines** | *string* | *(empty)* | 指定启动容器时传递给应用程序的命令行参数。 |
| **devices** | *string* | *(empty)* | 指定传递给容器应用程序的额外硬件设备。 |
| **environment** | *string* | *(empty)* | 定义运行中的应用程序可用的环境变量。以键值对列表形式指定。 |
| **extra-mounts** | *string* | *(empty)* | 指定要附加到容器的额外挂载点。 |
| **firewall-redirects** | *string* | *(empty)* | 配置从主机设备到容器的端口重定向。 |
| **network** | *default* &#124; *lan* &#124; *internal* | *default* | 指定容器使用的网络：**internal**（位于 NAT 之后）、**lan**（位于 LAN 网络中）或 **default**（因应用程序而异；可以是 internal 或 lan）。 |
| **network-outgoing-access** | *yes* &#124; *no* | *yes* | 允许特定容器应用的网络出站访问；设置为 `no` 时，将创建一条 mangle drop 规则。 |
| **pvid** | *integer* | *1* | 为网桥中容器的虚拟以太网接口设置 Port VLAN ID（PVID）。 |
| **required-hw-devices** | *string* | *(empty)* | 容器启动主机上必须存在的硬件设备。该属性仅在添加 YAML 配置后可配置。 <br/><br/><strong>Compose 格式：</strong><code>[host-hw-device]:[device-in-app]</code> |
| **required-mounts** | *string* | *(empty)* | 容器启动所需的挂载目录。该属性仅在添加 YAML 配置后可配置。 <br/><br/><strong>Compose 格式：</strong><code>[dir-on-host]:[dir-in-app]</code> |
| **use-https** | *yes* &#124; *no* | *yes* | 对应用程序 URL 使用 HTTPS。不支持云服务的设备上此选项不起作用。 |
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

## 自定义应用 {#custom-apps}

从 RouterOS v7.22 开始，你可以使用 `compose` YAML 文件创建自己的自定义应用。这使有经验的用户能够构建符合其特定网络需求的解决方案。

工作原理：

- 你以 YAML 格式定义应用内部结构和有限的 RouterOS 配置
- RouterOS 拉取指定的镜像并创建你的应用
- 该应用在 RouterOS 硬件上运行，并免费提供新功能
- 可选地，让它与我们的 API 交互

使用原因：

- 构建网络所需的确切功能
- 无需等待官方应用发布
- 适用于自动化、自定义路由或专用服务
- 声明式配置使管理更简单

### 如何添加应用 {#how-to-add-apps}

有三种方式，但它们都依赖 YAML。

#### 方法 1：创建空白应用并编辑 YAML {#method-1-create-a-blank-app-and-edit-yaml}

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

#### 方法 2：从文件导入 {#method-2-import-from-a-file}

或者，将 compose 文本保存到文件并上传到设备。然后，使用以下命令将该文件设置为应用的 YAML：

```routeros
/app/add yaml=[/file/get alpine-iperf.yml contents]
```

此方法适用于已准备好要导入的 YAML 文件的情况。

#### 方法 3：添加自定义应用商店 URL {#method-3-add-custom-app-store-url}

如果你或你认识的人在 Web 服务器上托管了自己的应用或应用列表，可以直接在 APP 设置中添加 URL。这样即可拥有动态更新的自定义应用目录。

```routeros
/app/settings set app-store-urls="<custom_url>"
```

要使此功能正常工作，URL 应直接返回 YAML 文件的文本内容，其中多个应用按照标准 YAML 语法列在一个简单列表中。

### 为自定义应用编写 YAML {#writing-yaml-for-a-custom-app}

此示例使用现有的 openEuler 基础镜像创建一个 iperf3 应用。

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
- 基础镜像已安装 iperf
- 必要的端口已转发或映射到路由器 IP
- “command”在容器启动时执行并运行 iperf3

或者，你可以使用 Alpine Linux 这类纯基础镜像，并通过“command”安装 iperf3。

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
- 每次启动时安装并运行 iperf3
- 应用的网络设置为你的 LAN（作为转发端口的替代方案）

可选地，如果要确保“command”只执行一次，可以使用如下条件式单行命令：

```yaml
command: /bin/sh -c "if ! command -v iperf3 >/dev/null 2>&1; then apk add --no-cache iperf3; fi; exec iperf3 -s"
```

### 端口映射 {#port-mapping}

映射端口时，使用 X:Y 或 X:Y:Z 语法，其中 X 是路由器上的端口，Y 是容器中的端口，Z 为端口指定名称。不过，某些名称具有特殊功能，例如，“web”会使 RouterOS 设置反向代理，并生成自动生成的 URL。
以下是一些有效示例：

```yaml
2211:21
888:80:web
9000:9000:api
9001:9001:api-secure

```

所有端口默认设置为 TCP，除非将其定义为 UDP，例如：

```yaml
6000:6000/udp:udp
8000:8000/udp:custom_name

```

:::warning
默认情况下，端口 `80` 被视为 Web 端口，除非明确将其设置为其他类型。健康检查会探测该端口——如果没有任何服务监听，应用会显示为卡在 `starting` 状态。当未映射端口 `80` 时，将改用第一个定义的端口。为避免歧义，请显式命名所使用的端口。
:::

## YAML 字段参考 {#yaml-field-reference}

YAML 文档定义一个 App：一个包含 App 元数据的应用级部分，以及一个包含一个或多个容器定义的 `services` 部分。

### 应用级字段 {#app-level-fields}

| 字段 | 类型 | 描述 |
|---|---|---|
| `name` | *string* | App 的唯一名称。 |
| `descr` | *string* | App 的描述。 |
| `page` | *string* | 项目页面的 URL，显示为 App 的 `project-page` 属性。 |
| `category` | *string* | App 列表中显示的分类组（例如 network、system、utilities）。 |
| `default-credentials` | *string* | `username:password` 格式的登录凭据。仅用于说明；可以留空。|
| `icon` | *string* | WebFig 首页中显示的图标图片的 URL。 |
| `url-path` | *string* | 附加到 App URL 的路径，例如 `/login` 或 `/web`。 |
| `auto-update` | *boolean* | 当 `true` 时，有新的容器镜像可用时会自动更新 App。 |
| `supported-archs` | *list of strings* | App 支持的 CPU 架构：`arm`、`arm64`、`arm_v5` 和 `x86`。与指定架构不匹配的设备不会显示该 App。 |
| `compatible-boards` | *list of strings* | App 支持的板卡名称，例如 `RDS2216`。接受 `*` 通配符。与指定板卡名称不匹配的设备不会显示该 App。 |
| `services` | *map* | 容器服务定义。至少需要一个服务。 |
| `volumes` | *map* | 服务使用的命名卷声明。 |
| `secrets` | *map* | App 的密钥名称，在 `environment` 中通过 `[secret:name]` 引用。 |
| `configs` | *map* | 挂载到服务中的配置文件声明。 |
| `networks` | *map* | 服务使用的网络声明。 |

### Service 字段 {#service-fields}

| 字段 | 类型 | 描述 |
|---|---|---|
| `image` | *string* | 容器使用的 App 镜像。必填。 |
| `container_name` | *string* | 与特定镜像一起使用的名称，如 `/container` 菜单中所示。 |
| `command` | *string* | 容器内执行的启动命令。 |
| `entrypoint` | *string* | 用作容器入口点的可执行文件。 |
| `environment` | *list or map* | 传递给容器的环境变量。|
| `volumes` | *list* | 附加到容器的挂载点。 |
| `ports` | *list* | 从路由器到容器的端口映射。 |
| `expose` | *list* | 向其他容器公开但不发布到路由器的端口。 |
| `restart` | *string* | 容器的重启策略。`unless-stopped`、`always` 和 `on-failure`。 |
| `depends_on` | *list* | 必须在该服务之前启动的服务名称。 |
| `healthcheck` | *map* | 容器启动时运行健康检查。请参阅下方示例。 |
| `shm_size` | *string* | 共享内存大小，例如 `512mb` 或 `1gb`。 |
| `stop_grace_period` | *string* 或 *int* | 正常关闭的超时时间，例如 `30s` 或 `0`。默认为 30 秒。 |
| `devices` | *list* | 直通到容器的硬件设备，例如 `- /dev/ttyACM0:/dev/ttyACM0`。 |
| `user` | *string* | 容器运行时使用的 Linux 用户或 UID。 |
| `hostname` | *string* | 容器中设置的主机名。 |
| `security_opt` | *list* | 容器安全选项。 |
| `build` | *map* | 本地构建镜像的构建配置。 |
| `secrets` | *list* | 该服务可用的密钥名称，作为文件挂载到 `/run/secrets/<name>`。 |
| `configs` | *list* | 挂载到该服务中的配置文件。 |

### Healthcheck

健康检查会探测服务，以验证应用是否正常运行。`test` 参数在容器内运行，当命令返回退出代码 0 时，该服务被视为健康：

```yaml
healthcheck:
  test: ["CMD", "curl -f http://localhost:8080/ || exit 1"]
  interval: 30s
  retries: 3
  start_period: 30s
  timeout: 10s
```

### 运行时占位符 {#runtime-placeholders}

环境变量值和 `default-credentials` 字段可以包含 RouterOS 在 App 运行时替换的占位符。

| 占位符 | 描述 |
|---|---|
| `[accessIP]` | 从外部访问 App 时使用的 IP 地址或主机名。 |
| `[accessPort]` | 映射到 App Web 界面的路由器端口。 |
| `[accessProto]` | 用于访问 App 的协议，`http` 或 `https`。 |
| `[containerIP]` | 分配给容器的 IP 地址。 |
| `[containerInterface]` | 为 App 创建的 VETH 接口名称。 |
| `[routerIP]` | 路由器在 App 网络中的 IP 地址。 |
| `[env:variable]` | App 的环境变量值。 |
| `[env:service:variable]` | 指定服务的环境变量值。 |
| `[secret:name]` | App 级 `secrets` 部分中声明的密钥值。 |

在环境值中使用占位符，可自动配置服务：

```yaml
environment:
  - NEXTCLOUD_TRUSTED_DOMAINS=[accessIP]
  - APP_URL=[accessProto]://[accessIP]:[accessPort]
```

### Volumes

向服务添加持久数据：

```yaml
services:
  app:
    image: docker.io/example/app:latest
    volumes:
      - data:/data              # persistent directory in the App storage
      - appdata/conf:/etc/app   # sub-directory, mounted at /etc/app
      - ./custom:/custom        # relative to the storage path
```

### Secrets

Secrets 将密码和密钥与环境分开存储。在应用级 `secrets` 部分声明 secret，并在环境变量值和默认凭据中使用 `[secret:name]` 引用它们。RouterOS 会在 App 运行时生成 secret 值：

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

或者，在服务下列出 secret，将其作为文件挂载到 `/run/secrets/<name>`：

```yaml
services:
  server:
    image: docker.io/example/server:latest
    environment:
      DB_PASSWORD_FILE: /run/secrets/db_password
    secrets:
      - db_password
```

### Configs

Configs 以文本形式向容器提供配置文件。在应用级 `configs` 部分声明内容，并使用 `source`、`target` 和可选的 `mode` 将其挂载到服务中。

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

`source` 是应用级 config 声明的名称，`target` 是容器内的路径，`mode` 是文件权限。

### Networks

默认情况下，App 运行在 NAT 后的内部网络中，服务通过映射端口访问。要将 App 直接置于某个网络中，请在应用级 `networks` 部分将默认网络定义为外部网络。

```yaml
networks:
  default:
    name: lan
    external: true
```

## 自定义应用商店 {#custom-app-store}

App 系统支持以 YAML 数组形式提供的自定义应用商店，其中数组的每个元素都是一个应用定义。该文件必须托管在设备可通过网络访问的服务器上。

由两个 app 组成的 YAML 数组示例：

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

- **存储：** 为获得最佳性能和更大容量，请考虑使用外部存储设备，例如 USB drive、SATA drive 或 NVMe SSD。

- **内存：** 在终端中运行 `/app/print` 命令，跟踪应用的内存消耗。

- **更新：** 仅在需要且认为必要时更新系统。虽然自动更新可以提供安全补丁和新功能，但在启用或应用更新之前，请务必评估特定使用场景是否需要该更新。

- **网络：** 应用会自动管理端口转发，并生成外部访问所需的 URL。

- **数据持久性：** 应用数据存储在指定的存储路径中，即使应用重启或系统重启后也会保持不变。
