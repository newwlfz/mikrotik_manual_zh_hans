---
sidebar_key: "containers/apps"
title: "应用"
sidebar_label: "应用"
description: "使用 RouterOS Apps 菜单安装、管理和创建容器应用，包括设置向导和自定义 compose YAML 文件。"
tags:
  - 'container'
  - 'apps'
  - 'security'
source: https://manual.mikrotik.com/docs/containers/apps
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Apps 菜单提供了可在 RouterOS 上运行的应用程序目录。一个应用可以包含一个或多个容器，RouterOS 会自动创建所需的容器配置、VETH 接口、网桥端口、防火墙规则和反向代理条目。该目录由 MikroTik 维护，镜像来源包括 Docker Hub、GCR、Quay 及其他镜像仓库。你可以在启用应用之前编辑其配置，并随时查看其 YAML。

[可用 Apps 列表](./available-apps.md)展示了该目录。目录应用和自定义应用使用相同的 YAML 格式。

## 先决条件 {#prerequisites}

- 安装 `container` 软件包。
- 使用 arm64、arm32 或 x86 设备。搭载 EN7562CT CPU 的设备（如 hEX Refresh）只能运行 arm32v5 镜像，因此只有 `supported-archs` 中列出 `arm_v5` 的应用才可用。
- 使用 `/system/device-mode/update container=yes` 启用容器模式。这需要物理接触并按下复位按钮确认，或在 x86 上执行冷重启。请参阅[设备模式](../../system-information-and-utilities/device-mode.md)。
- 将存储磁盘格式化为 ext4、btrfs 或 xfs，并将其挂载到 `/disk`。建议使用外部存储。配备 16 MB SPI 闪存的设备需要外部存储来存放容器镜像。
- 为容器提供足够的 RAM。应用的当前内存使用量显示在 `/app/print detail` 的 `memory-current` 中。
- 在 `/app/settings` 中或通过[设置向导](#setup-wizard)配置应用磁盘、路由器 IP 地址和 LAN 网桥。
- 对于 HTTPS 应用 URL，路由器需要来自云服务的有效应用证书。

:::warning
运行第三方容器镜像会使设备面临与这些镜像本身相同的安全风险。被攻陷的路由器也可能利用容器安装恶意软件。在启用容器模式之前，请先阅读[容器](../index.md)。
:::

## 设置向导 {#setup-wizard}

在终端中运行 `/app/setup`，或在 WebFig 中选择 Setup。该向导会将各项值写入 `/app/settings`，之后你可以随时更改。

### 选择应用磁盘 {#select-the-app-disk}

该向导会列出已格式化并挂载的磁盘。在运行向导之前，请先在 `/disk` 中将磁盘格式化为 ext4、btrfs 或 xfs。

请使用顺序读写速度至少为 100 MB/s、随机 IOPS 至少为 10,000 的磁盘。使用 `/disk/test` 验证磁盘。

向导将媒体路径设置为 `<disk>/media`，将下载路径设置为 `<disk>/media/downloads`。应用镜像和数据存储在 `<disk>/apps` 下。

### 选择 LAN 网桥 {#select-the-lan-bridge}

选择代表你的 LAN 的网桥。具有 `network=lan` 的应用会将其 VETH 接口连接到此网桥。某些应用使用 LAN 进行自动发现。

### 设置路由器 IP {#set-the-router-ip}

选择客户端访问路由器时使用的 IP 地址。应用会在生成的 URL 和端口转发规则中使用此地址，因此请在启用应用之前设置它。在未设置该地址的情况下启用的应用会保持为 `status=waiting for router ip to be configured`。

### 查看设置 {#review-the-settings}

向导会将所选值存储在 `/app/settings` 中。使用以下方式检查它们：

```routeros
/app/settings/print
```

## 安装并运行应用 {#install-and-run-an-app}

目录应用已存在但已禁用。在 WebFig 或终端中启用应用：

```routeros
/app/print
/app/enable <app>
```

首次启用会拉取并解压镜像，创建网络并启动容器。使用以下命令检查进度：

```routeros
/app/print detail where name="<app>"
```

应用启动期间，`status` 会显示 `downloading/extracting` 或 `starting`。应用运行时，`status` 为空，标志 `R` 出现，并且 `ui-url` 包含访问 URL。

使用 `use-https=yes` 时，RouterOS 会创建反向代理规则，并使用来自 `/app/settings` 的应用证书。URL 使用云主机名。使用 `use-https=no` 时，URL 为 `http://<router-ip>:<port>`。带有名为 `web` 的端口的应用会获得一个 UI URL。有关反向代理的详细信息，请参阅[容器应用](../../network-management/proxy/reverse-proxy.md#container-apps)。

## 管理应用 {#manage-apps}

### 标志和状态 {#flags-and-status}

| 标志 | 含义 |
| :-- | :-- |
| `X` | 应用已禁用。 |
| `R` | 应用正在运行。 |
| `c` | 该应用是自定义应用。 |
| `s` | 该应用来自自定义应用商店。 |

`app print` 可以根据终端宽度显示不同的列。使用 `print detail` 或 `proplist` 读取特定字段。

应用运行时，`status` 为空。在启动期间或发生故障后，它可能会显示诸如 `waiting for router ip to be configured`、`downloading/extracting` 或 `starting` 之类的值。

### 更新、重启和停止应用 {#update-restart-and-stop-apps}

```routeros
/app/update <app>
/app/restart <app>
/app/disable <app>
/app/enable <app>
```

`/app/update` 会再次拉取应用镜像，解压它们，并重启应用。`/app/restart` 会停止并启动容器，但不会拉取镜像。

在应用上设置 `auto-update=yes`，可在设备重启后应用启动时检查新镜像。`/app/settings` 中的全局 `auto-update` 设置为已安装应用提供默认值。当镜像未发生变化时，RouterOS 会跳过导入并启动现有镜像。

### 移除应用 {#remove-apps}

`/app/cleanup` 会停止应用并移除其容器、数据和网络配置。应用条目会保留，但处于禁用状态。此操作无法撤销：

```text
/app/cleanup <app>
App data will be lost, continue? [y/N]:
```

使用 `/app/remove` 删除应用条目本身。请先运行 cleanup 以移除应用数据。

:::warning
清理会永久删除应用数据、配置和状态。在继续之前，请备份您需要的任何数据。
:::

### 网络设置 {#network-settings}

- `network` 选择应用网络。`internal` 将应用置于 NAT 之后，`lan` 将 VETH 接口连接到 LAN 网桥，`default` 使用应用的默认网络。
- `network-pvid` 设置应用网桥端口的 PVID。默认值为 `1`。
- `network-outgoing-access=no` 使用 mangle drop 规则阻止来自应用的出站连接。请记住，这可能会干扰您现有的防火墙。
- `use-https` 控制应用使用 HTTPS 反向代理和云 URL，还是使用普通 HTTP 并将端口转发到路由器 IP。

## 自定义应用 {#custom-apps}

当目录中不包含你需要的服务，或者你需要不同的容器配置时，创建自定义应用。自定义应用使用与目录应用相同的 compose YAML 格式，并标记为标志 `c`。你也可以在自定义应用商店中发布自定义应用。

### 创建空白应用 {#create-a-blank-app}

创建应用并将其分配到 LAN 网络：

```routeros
/app/add network=lan
```

该应用会以禁用状态创建，名称为 `app`，且没有服务容器。在终端中添加 YAML 配置：

```routeros
/app/edit app yaml
```

粘贴 YAML，按 <kbd>Control</kbd>+<kbd>O</kbd> 保存，然后启用该应用。

### 导入 YAML 文件 {#import-a-yaml-file}

保存 compose 文件，将其上传到设备，并将其内容用作应用 YAML：

```routeros
/app/add yaml=[/file/get <filename> contents]
```

应用创建时处于禁用状态。检查导入的配置后再启用它。

### 添加自定义应用商店 {#add-a-custom-app-store}

在 `/app/settings` 中设置一个或多个应用商店 URL：

```routeros
/app/settings/set app-store-urls="<url>"
```

每个 URL 必须返回一个 YAML 数组，其中每个元素都是一个应用定义。从自定义商店加载的应用会带有标志 `s` 显示。

### 为自定义应用编写 YAML {#write-yaml-for-a-custom-app}

此示例从已包含 iperf3 的 openEuler 镜像创建一个 iperf3 服务器：

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

该镜像已包含 `iperf3`，端口会转发到路由器 IP，并且 `command` 会在容器启动时启动服务器。

要在容器启动时安装 iperf3，请使用普通基础镜像：

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

此示例安装 iperf3，并在每次容器启动时启动它。容器需要访问互联网才能下载该软件包。`networks` 部分会将应用直接置于 LAN 上，而不是转发端口。

若要仅在软件包缺失时才安装它，请使用条件命令：

```yaml
command: /bin/sh -c "if ! command -v iperf3 >/dev/null 2>&1; then apk add --no-cache iperf3; fi; exec iperf3 -s"
```

### 映射端口 {#map-ports}

使用 `<router-port>:<container-port>` 或 `<router-port>:<container-port>:<name>`：

```yaml
ports:
  - 8080:80:web
  - 9000:9000:api
  - 6000:6000/udp:dns
```

除非添加 `/udp`，否则端口为 TCP。如果没有名为 `web` 的端口，则第一个 TCP 端口会成为 Web 端口。名为 `web` 的端口会获得反向代理条目和 UI URL。如果 `web` 端口在容器内部没有监听器，应用会保持在 `starting` 状态，因此请显式命名端口。

### 设置 URL 路径 {#set-a-url-path}

使用 `url-path` 在生成的应用 URL 后追加路径：

```yaml
url-path: /admin
```

此时 UI URL 以 `/admin` 结尾。

## YAML 参考 {#yaml-reference}

一个 YAML 文档定义一个应用。应用级部分包含元数据，而 `services` 部分包含一个或多个容器定义。

### 应用级字段 {#app-level-fields}

| 字段 | 类型 | 描述 |
| :-- | :-- | :-- |
| `name` | *字符串* | 应用的唯一名称。 |
| `descr` | *字符串* | 应用的描述。 |
| `page` | *字符串* | 项目页面的 URL，显示为 `project-page` 属性。 |
| `category` | *字符串* | 在应用列表中显示的分类组。 |
| `default-credentials` | *字符串* | 采用 `username:password` 格式的登录凭据。仅供参考。 |
| `icon` | *字符串* | 在 WebFig 中显示的图标 URL。 |
| `url-path` | *字符串* | 追加到应用 URL 的路径，例如 `/login` 或 `/web`。 |
| `auto-update` | *布尔值* | 有新镜像可用时更新应用。 |
| `supported-archs` | *字符串列表* | 支持的架构：`arm`、`arm64`、`arm_v5` 和 `x86`。目录使用此列表为设备选择应用。 |
| `compatible-boards` | *字符串列表* | 支持的板卡名称，例如 `RDS2216`。接受 `*` 通配符。目录使用此列表为设备选择应用。 |
| `services` | *映射* | 容器服务定义。至少需要一个服务。 |
| `volumes` | *映射* | 服务使用的命名卷声明。 |
| `secrets` | *映射* | 在 `environment` 中通过 `[secret:name]` 引用的密钥名称。 |
| `configs` | *映射* | 挂载到服务中的配置文件声明。 |
| `networks` | *映射* | 服务使用的网络声明。 |

即使自定义应用的 `supported-archs` 值与该设备不匹配，它们仍会保持可见。

### 服务字段 {#service-fields}

| 字段 | 类型 | 描述 |
| :-- | :-- | :-- |
| `image` | *字符串* | 用于容器的应用镜像。必需。 |
| `container_name` | *字符串* | 在 `/container` 中使用的容器名称。 |
| `command` | *字符串* | 在容器内执行的启动命令。 |
| `entrypoint` | *字符串* | 用作容器入口点的可执行文件。 |
| `environment` | *列表或映射* | 传递给容器的环境变量。 |
| `volumes` | *列表* | 附加到容器的挂载点。 |
| `ports` | *列表* | 从路由器到容器的端口映射。 |
| `expose` | *列表* | 向其他容器公开但不在路由器上发布的端口。 |
| `restart` | *字符串* | 重启策略：`unless-stopped`、`always` 或 `on-failure`。 |
| `depends_on` | *列表* | 必须在此服务之前启动的服务名称。 |
| `healthcheck` | *映射* | 检查服务是否正在运行的探测。 |
| `shm_size` | *字符串* | 共享内存大小，例如 `512mb` 或 `1gb`。 |
| `stop_grace_period` | *字符串* 或 *整数* | 优雅关闭的超时时间，例如 `30s` 或 `0`。 |
| `devices` | *列表* | 透传到容器的硬件设备。 |
| `user` | *字符串* | 容器运行所使用的 Linux 用户或 UID。 |
| `hostname` | *字符串* | 在容器中设置的主机名。 |
| `security_opt` | *列表* | 容器安全选项。 |
| `build` | *映射* | 本地构建镜像的构建配置。 |
| `secrets` | *列表* | 此服务可在 `/run/secrets/<name>` 以文件形式使用的密钥名称。 |
| `configs` | *列表* | 挂载到此服务的配置文件。 |

### 健康检查 {#healthcheck}

健康检查会探测该服务，并在命令以代码 0 退出时将其视为健康。对于可执行文件，请使用带有独立参数的 `CMD`：

```yaml
healthcheck:
  test: ["CMD", "wget", "-qO-", "http://localhost/"]
  interval: 30s
  retries: 3
  start_period: 30s
  timeout: 10s
```

当命令包含诸如 `||` 或管道之类的 shell 语法时，请使用 `CMD-SHELL`：

```yaml
healthcheck:
  test: ["CMD-SHELL", "wget -qO- http://localhost/ || exit 1"]
  interval: 30s
  retries: 3
  start_period: 30s
  timeout: 10s
```

使用 `CMD` 时，每个列表元素都会成为一个参数。放在单个 `CMD` 参数中的 shell 表达式会作为文本传递并失败。

### 运行时占位符 {#runtime-placeholders}

环境值和 `default-credentials` 可以包含 RouterOS 在应用运行时替换的占位符。

| 占位符 | 描述 |
| :-- | :-- |
| `[accessIP]` | 用于从外部访问应用的 IP 地址或主机名。 |
| `[accessPort]` | 映射到应用 Web 界面的路由器端口。 |
| `[accessProto]` | 用于访问应用的协议：`http` 或 `https`。 |
| `[containerIP]` | 分配给容器的 IP 地址。 |
| `[containerInterface]` | 容器内 VETH 接口的名称。名称限制为 15 个字符。 |
| `[routerIP]` | 来自 `/app/settings router-ip` 的路由器 IP 地址。 |
| `[networkRouterIP]` | 应用网络上的路由器 IP 地址。 |
| `[env:variable]` | 应用的环境变量值。 |
| `[env:service:variable]` | 指定服务的环境变量值。 |
| `[secret:name]` | 在应用级 `secrets` 部分声明的机密值。 |

示例环境值：

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
      - data:/data
      - appdata/conf:/etc/app
```

`data` 是应用存储中的命名卷。诸如 `appdata/conf` 的路径是应用存储的子目录，并挂载到 `/etc/app`。

### 密钥 {#secrets}

在应用级 `secrets` 部分声明密钥，并使用 `[secret:name]` 引用它们。RouterOS 在应用运行时生成该值：

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

要将密钥作为文件挂载，请在服务下列出它。该文件可在 `/run/secrets/<name>` 处使用：

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

Configs 以文本形式向容器提供配置文件。在应用级 `configs` 部分声明内容，并使用 `source`、`target` 和可选的 `mode` 将其挂载到服务中：

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

### 网络 {#networks}

默认情况下，应用在 NAT 后的内部网络上运行，服务通过映射端口访问。要将应用直接放到某个网络上，请使用外部网络定义默认网络：

```yaml
networks:
  default:
    name: lan
    external: true
```

然后，应用会将其 VETH 接口连接到 `/app/settings` 中的 LAN 网桥。

### 自定义应用商店 {#custom-app-store}

自定义应用商店是一个 YAML 数组，其中每个元素都是一个应用定义。该文件必须可由路由器访问：

```yaml
- name: code-server
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

添加更多列表项以发布更多应用。

## 应用属性 {#app-properties}

应用菜单具有以下属性。`/app/add` 创建的新应用处于禁用状态。

| 属性 | 类型 | 默认值 | 描述 |
| :-- | :-- | :-- | :-- |
| **auto-update** | *yes* &#124; *no* | *no* | 在重启后 app 启动时检查新镜像。 |
| **check-certificate** | *yes* &#124; *no* | *yes* | 根据路由器证书存储验证注册表证书。 |
| **container-command-lines** | *string* | *(empty)* | 从 YAML 生成的容器命令。 |
| **devices** | *string* | *(empty)* | 传递给容器的额外硬件设备。 |
| **disabled** | *yes* &#124; *no* | *yes* | app 是否被禁用。新 app 创建时处于禁用状态。 |
| **environment** | *string* | *(empty)* | `service:key=value` 形式的环境变量。 |
| **extra-mounts** | *string* | *(empty)* | 附加到容器的额外挂载点。 |
| **firewall-redirects** | *string* | *(empty)* | `router-port:container-port:protocol:name` 形式的端口重定向。 |
| **network** | *default* &#124; *lan* &#124; *internal* | *default* | app 使用的网络。`default` 使用 app 的默认网络。 |
| **network-outgoing-access** | *yes* &#124; *no* | *yes* | 允许来自 app 的出站连接。设置为 `no` 时，RouterOS 会添加一条 mangle drop 规则。 |
| **network-pvid** | *integer* | *1* | app 桥接端口的 PVID。 |
| **required-hw-devices** | *string* | *(empty)* | app 启动时必须存在的硬件设备。 |
| **required-mounts** | *string* | *(empty)* | app 所需的挂载目录。 |
| **use-https** | *yes* &#124; *no* | *yes* | 为 app URL 使用 HTTPS 和反向代理。 |
| **yaml** | *string* | *(empty)* | 定义 app 的 Compose YAML。 |

只读值：

| 属性 | 描述 |
| :-- | :-- |
| **app-size** | app 镜像的大小，单位为 MiB。 |
| **app-store-url** | app 来源的自定义 app 商店的 URL。 |
| **data-size** | app 数据的大小。 |
| **default-credentials** | 来自 YAML 的默认登录凭据。 |
| **default-network** | 来自 YAML 的默认网络。 |
| **description** | 来自 YAML 的 app 描述。 |
| **interface** | app 使用的 VETH 接口。 |
| **ip-address** | 分配给 VETH 接口的 IP 地址。 |
| **memory-current** | app 当前的内存使用量。 |
| **name** | app 名称。 |
| **project-page** | 来自 YAML 的项目页面 URL。 |
| **status** | 当前启动或错误状态。app 运行期间为空。 |
| **ui-url** | 为 app Web 界面生成的 URL。 |
| **variables-to-use-in-environment** | 占位符及其当前值。 |

`/app/settings` 参数在 CLI 参考中有说明。

## 技术细节 {#technical-details}

启用的应用会创建以下对象：

- 名为 `veth-app-<app>` 的 VETH 接口。
- 内部网桥或 LAN 网桥上的一个网桥端口。
- 对于内部网络，还包括 `internal` 网桥、`172.18.0.1/24` 地址以及一条源 NAT 伪装规则。
- 每个映射端口对应一条目标 NAT 规则。
- 当 `use-https=yes` 时，为 `web` 端口添加一条反向代理规则。
- 每个服务对应一个容器，命名为 `app-<app>-<service>`。

所选磁盘上的存储路径：

- `<disk>/apps/layers` 存放共享镜像层。
- `<disk>/apps/<app>/<service>_root` 存放容器根目录。
- `<disk>/apps/<app>/<volume>` 存放命名卷。
- `<disk>/apps/<app>/secret-<name>` 存放密钥文件。
- `<disk>/apps/<app>/config-<name>` 存放配置文件。

在启用应用之前先设置 `router-ip`，这样其生成的 URL 和环境变量值就会使用最终地址。

## 相关主题 {#related-topics}

- [容器](../index.md)，用于手动配置容器。
- [VETH](../veth.md)，用于虚拟以太网接口。
- [反向代理](../../network-management/proxy/reverse-proxy.md#container-apps)，用于 HTTPS 应用 URL。
- [证书](../../authentication-authorization-accounting/certificates.md)，用于证书管理。
- [可用应用列表](./available-apps.md)。
