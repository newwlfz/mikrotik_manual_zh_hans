---
title: "Container"
description: "本页介绍 MikroTik RouterOS 的容器支持，涵盖配置、虚拟接口、存储和安全注意事项。文中详细说明用于运行容器化服务的重启间隔、DNS 设置、CPU 分配和内存限制等属性，并提示相关安全风险。"
tags:
  - 'container'
  - 'security'
source: https://manual.mikrotik.com/docs/7.25/containers
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

本节介绍 RouterOS 容器支持，包括容器配置、虚拟以太网接口、存储和应用示例。使用它可以在 RouterOS 设备上运行受支持的容器化服务。

<DocCardList />

**所需软件包：** `container`

容器是 MikroTik 对 Linux 容器的实现，允许用户在 RouterOS 中运行容器化环境。容器功能适用于最新版 MikroTik RouterOS v7.x。容器兼容来自 Docker Hub、GCR、Quay 或其他提供商的镜像，也兼容在其他设备上构建的镜像，并使用这些提供商支持的相同格式。虽然 RouterOS 使用的语法与 Docker 不同，但仍能实现类似功能。

## Disclaimer

:::danger
启用容器功能支持需要对 RouterOS 设备进行物理访问；该功能默认禁用；

- 启用容器功能后，可以远程添加、配置、启动、停止和删除容器！
- 如果 RouterOS 设备遭到入侵，攻击者可以利用容器轻松在 RouterOS 设备和网络中安装恶意软件；
- RouterOS 设备的安全性取决于你在容器中运行的任何内容；
- 如果运行容器，则不存在任何形式的安全保证；
- 在 RouterOS 设备上运行第三方容器镜像可能引入安全漏洞、攻击向量或攻击面；
- 具备漏洞利用构建知识的专家能够越狱或提升为 root；
:::

### 安全风险 {#security-risks}

- 当安全专家发布其漏洞利用研究时，任何人都可以使用该漏洞利用。
- 有人可以构建一个容器镜像，利用该漏洞并提供 Linux root shell。
- 通过 root shell，即使在容器镜像被删除且容器功能被禁用后，也可能在你的 RouterOS 系统中留下永久后门或漏洞。
- 如果漏洞被注入主 RouterBOOT 或备用 RouterBOOT（或厂商预加载器），则即使 Netinstall 也可能无法修复它。

## 要求 {#requirements}

容器软件包兼容 **arm、arm64** 和 **x86** 架构。使用 remote-image（类似 docker pull）功能需要主内存中有大量可用空间，16MB SPI flash 板卡可以使用 USB 或其他磁盘介质上的预构建镜像。

:::danger

- 建议使用顺序读写速度至少为 100MB/s、随机 IOPS 至少为 10K 的外置磁盘。使用较慢的磁盘时，容器解压时间可能会变长。
- 需要安装 Container 软件包
- 对于采用 EN7562CT CPU 的设备（如 hEX Refresh），仅支持 [arm32v5](https://hub.docker.com/u/arm32v5) 容器镜像，这意味着可运行的容器数量有限。
:::

**子菜单：** `/container`

## 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **restart-interval** (*string*; Default: ) | 指定 Container 发生故障时重启的间隔。示例：10s |
| **cmd** (*string*; Default: ) | CMD 的主要用途是为正在执行的容器提供默认值。这些默认值可以包含可执行文件，也可以省略可执行文件，在这种情况下，你还必须指定 ENTRYPOINT 指令。 |
| **comment** (*string*; Default: ) | 简短说明 |
| **dns** (*string*; Default: ) | 如果容器需要不同的 DNS，可在此处配置 |
| **domain-name** (*string*; Default: ) | 设置容器的域名 |
| **entrypoint** (*string*; Default: ) | ENTRYPOINT 允许你指定启动容器时要运行的可执行文件。示例：`/bin/sh` |
| **envlist** (*string*; Default: ) | 要与容器一起使用的环境变量列表（在 *`/container/envs`* 下配置） |
| **file** (*string*; Default: ) | 如果从文件导入容器，则为容器 \*tar.gz tarball |
| **hostname** (*string*; Default: ) | 为容器分配主机名有助于更轻松地识别和管理容器 |
| **interface** (*string*; Default: ) | 要与容器一起使用的 veth 接口 |
| **logging** (*string*; Default: ) | 如果设置为 yes，所有容器生成的输出都将显示在 RouterOS 日志中 |
| **start-on-boot** (*string*; Default: ) | 如果设置为 yes，容器将在设备启动时自动启动。 |
| **mountlists** (*string*; Default: ) | 要与此容器一起使用的 /container/mounts/ 子菜单中的挂载 |
| **mount** (*string*; Default: ) | 指定要用作挂载的目录 |
| **remote-image** (*string*; Default: ) | 使用外部 registry 时要安装的容器镜像名称（在 `/container/config/set` registry-url=... 下配置） |
| **root-dir** (*string*; Default: ) | 用于将容器存储保存在主内存之外 |
| **stop-signal** (*string*; Default: 15) | 定义容器在 10 秒后仍在运行时，为终止容器而发送的 Linux 信号。不同信号可能允许正常关闭、立即终止或触发特定于应用程序的动作 |
| **workdir** (*string*; Default: ) | cmd entrypoint 的工作目录 |
| **devices** (*string*; Default: ) | 将物理设备传递给容器 |
| **cpu-list** (*string*; Default: ) | 指定允许容器运行的 CPU 核心 |
| **user** (*string*; Default: ) | 设置容器进程在执行前运行所用的用户和组。 |
| **memory-high** (*int*; Default: ) | 特定容器的“软” RAM 使用限制，单位为字节。<br/> 如果使用量超过上限边界，进程将受到限制并处于回收压力下。 |
| **memory-max** (*int*; Default: ) | 每个容器的最大 RAM 使用限制，单位为字节（如果 memory-max 值小于容器 memory-current，容器进程将被终止）<br/> 从 7.23 开始，此参数不能设置为低于 1MB，以避免容器在启动过程中过早终止 |
| **swap-max** (*int*; Default: ) | 容器可以使用的最大 swap 空间量（以字节为单位）。需要设备上启用 swap（请参阅 [Swap space](/docs/hardware/disks)）。 |
| **stop-time** (*string*; Default: ) | 在发送 stop-signal 之前，容器正常停止的时间限制。 |
| **tmpfs** (*string*; Default: ) | 容器的临时文件系统挂载点。格式：`size@dir`，例如 `64M@/tmp`。 |
| **layer-dir** (*string*; Default: ) | 用于存储容器镜像层的目录，用于容器之间的共享层存储。 |
| **shm-size** (*int*; Default: ) | 容器的 `/dev/shm` 共享内存文件系统大小，单位为字节。 |
| **default-dns** (*string*; Default: ) | 从系统 `/ip/dns` 配置继承的默认 DNS 服务器。 |
| **hosts** (*string*; Default: ) | 容器的自定义主机名到 IP 地址映射。格式：`host=ip`。 |
| **restart-policy** (*string*; Default: ) | 定义容器的重启策略：`no`（从不重启）、`on-failure`（仅在退出码非零时重启）或 `always`（始终重启）。 |
| **restart-max-count** (*int*; Default: ) | restart-interval 时间范围内允许的最大重启尝试次数。 |
| **stop-on-unhealthy** (*string*; Default: ) | 如果设置为 `yes`，当健康检查状态变为 unhealthy 时，容器将自动停止。 |

:::warning
默认情况下，容器使用与 `/ip/dns` 子菜单中配置的相同 DNS。如果此处未配置 DNS，且未指定容器的 `dns` 参数，容器将无法启动！
:::

### 菜单专用命令 {#menu-specific-commands}

| 属性 | 说明 |
| :-- | :-- |
| **update** | 更新容器镜像。自动从容器仓库拉取并解压镜像，替换原镜像。 |
| **kill** | 终止指定的运行中容器。 |
| **restart** | 重启指定的运行中容器。 |
| **repull** | 重新拉取并解压容器镜像。 |
| **shell** | 进入运行中容器的 shell。 |
| **run** | 启动容器并进入其 shell。适用于容器运行后立即关闭的情况。 |
| **save** | 将容器镜像保存为 tar 归档文件，包含 root-dir 内容和 ROS 特定参数。请参阅 [Saving a container](#saving-a-container)。 |

## Container 配置 {#container-configuration}

**子菜单：** `/container/config`

| 属性 | 说明 |
| :-- | :-- |
| **registry-url** | 下载 container 的外部 registry url（默认：`https://lscr.io/`） |
| **tmpdir** | container 解压目录 |
| **layer-dir** | 用于存储 container 镜像层的目录，用于 container 之间的共享层存储 |
| **memory-high** | 特定 container 的全局“软” RAM 使用限制，单位为字节。<br/> 如果使用量超过上限边界，进程将被限流并进入回收压力状态。 |
| **memory-max** | 每个 container 的全局最大 RAM 使用限制，单位为字节（如果 memory-max 值小于 container 的 memory-current，container 进程将被终止）<br/> 从 7.23 开始，该参数不能设置为低于 1MB，以避免 container 在启动过程中过早终止 |
| **swap-max** (*int*；默认：) | 每个 container 最大交换空间（单位为字节）的全局默认值。单个 container 可通过其自身的 `swap-max` 设置覆盖该值。需要设备上已启用 swap（请参阅 [Swap space](/docs/hardware/disks)）。 |
| **username** | 指定用于身份验证的用户名（从 ROS 7.8 开始） |
| **password** *[敏感参数](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 指定用于身份验证的密码（从 ROS 7.8 开始） |

### 只读属性 {#read-only-properties}

| 属性 | 描述 |
| :-- | :-- |
| **assumed-registry-url** | 自动检测到的 registry URL。 |
| **memory-current** | 所有容器当前的总内存使用量，单位为字节。 |

## 保存容器 {#saving-a-container}

`/container` 菜单下的 **save** 命令会将容器镜像写入有效的 OCI 归档，可导入 podman、docker 环境或 RouterOS。

默认情况下，save 会写入所有文件系统层，包括 root-dir，但 keeps 不会将其包含在 OCI 格式中。它会在 tarball 中写入一个特殊的 ros-container.json，其中包含 RouterOS 中指定的附加信息，包括 root-dir 层信息、envlists 等。导入 ROS 容器时将使用 ros-container.json，在 docker 或 podman 中会忽略该文件。

使用 **commit** 参数保存会将 root-dir 层添加到 OCI 归档格式，或更改原始镜像配置。在 podman 或 docker 中导入未使用 **commit** 保存的镜像时，不会显示 ROS 容器条目中所做的更改，例如指定的环境值、entrypoints、root-dir 中的文件以及任何其他更改。

可以使用 **commit** 参数将 root 目录层以及 ROS 容器条目中指定的附加参数保存（提交）为 OCI 镜像，以便导入 podman 或 docker。

### 命令语法 {#command-syntax}

```routeros
/container/save <container> file=<archive> [name=<name>] [commit]
```

### Parameters

| 参数 | 说明 |
| :-- | :-- |
| **file** | 保存归档的路径 |
| **name** | 设置要保存的镜像名称 |
| **commit** | 将更改提交到 OCI 归档 |

### 保存并重新导入 {#save-and-re-import}

此示例说明如何保存包含 root-dir 内容的容器，将其删除，然后从保存的文件重新添加。

对于此示例，添加一个简单容器：

```routeros
/container/add name=alpine remote-image=alpine interface=veth1 check-certificate=no
```

修改容器：

```routeros
/container/run alpine
/ # apk add python3
...
/ # cat <<EOF > main.py
> import os
> import sys
> ...
> EOF
/ # exit
```

设置容器 entrypoint、cmd 等：

```routeros
/container/set alpine entrypoint="python main.py" cmd="foo bar" env=FOO=1,BAR=2 envlists=foo,bar
```

运行修改后的容器并验证 env 变量：

```routeros
/container/run 0
>>> os.environ
environ({'BAR': '2', 'BAR2': 'this is bar 2', 'EGGS': 'e33s', 'FOO': '1', 'HOME': '/root', 'HOSTNAME': 'CHR', 'PATH': '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin', 'SPAM': 'spam12', 'TERM': 'xterm', 'TZ': 'manual'})
>>> exit()
```

保存包含根目录内容的容器（保持 OCI 镜像不变）：

```routeros
/container/save 0 file=out.tar
```

此保存操作会将 root-dir 内容与一些 ROS 容器参数（如 env、envlists 等）一起添加到归档中。此操作不会更改原始镜像配置参数。

删除容器并从保存的文件重新添加：

```routeros
/container/remove 0
/container/add file=out.tar interface=veth1
```

运行重新导入的容器并再次验证环境变量：

```routeros
/container/run 0
>>> os.environ
environ({'BAR': '2', 'BAR2': 'this is bar 2', 'EGGS': 'e33s', 'FOO': '1', 'HOME': '/root', 'HOSTNAME': 'CHR', 'PATH': '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin', 'SPAM': 'spam12', 'TERM': 'xterm', 'TZ': 'manual'})
>>> exit()
```

### 将更改提交到 OCI {#commit-changes-to-oci}

保存容器镜像并将更改*提交*到 OCI 镜像：

```routeros
/container/save 0 file=out.tar commit
```

已提交的镜像会将 root-dir 内容添加为另一层，并将 entrypoint、cmd 等值设置为标准容器镜像参数。此更改后的镜像可在 podman 或 docker 系统中加载。

在 podman 中加载已保存的容器：

```shell
$ podman image load < out.tar
Getting image source signatures
Copying blob 2db82ee6251c done
Copying blob b1928d1de551 done
Copying config 3dc8d32889 done
Writing manifest to image destination
Loaded image: localhost/alpine:latest
```

运行已加载的镜像：

```shell
$ podman run -it --rm localhost/alpine:latest
>>> os.environ
environ({'BAR': '2', 'BAR2': 'this is bar 2', 'EGGS': 'e33s', 'FOO': '1', 'HOME': '/root', 'HOSTNAME': 'CHR', 'PATH': '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin', 'SPAM': 'spam12', 'TERM': 'xterm', 'TZ': 'manual'})
>>> exit()
```

## 示例 {#examples}

### 运行 Pi-hole {#running-pi-hole}

#### 前提条件 {#prerequisites}

   1. RouterOS 设备，RouterOS v7.4beta 或更高版本，并且**已安装 Container 软件包 -** [如何安装软件包](/docs/getting-started/installation-and-upgrade/packages)
   2. 需要物理访问设备以启用 container 模式 - 下文将进行说明
   3. 连接用于存储的 HDD、SSD 或 USB 驱动器 - 使用 RouterOS 支持的文件系统格式化 - [如何格式化/管理磁盘](/docs/hardware/disks)

#### 运行 Pi-hole 的步骤 {#steps-to-run-pi-hole}

1. 启用 Container 模式，并按照命令给出的说明操作（详细了解 [Device-mode](/docs/system-information-and-utilities/device-mode)）。你需要按下 [reset button](/docs/getting-started/configuration-management/routeros-configuration-reset) 或执行冷重启（如果在 x86 上使用 Containers）来确认 device-mode：  

   ```routeros
   /system/device-mode/update container=yes 
   ```

   :::danger
   [Device-mode](/docs/system-information-and-utilities/device-mode) 默认限制 container 使用，在授予 container 模式访问权限之前 - 请确保设备已完全加固。
   :::
2. 创建新的 veth 接口，并分配一个在你的网络中唯一的 IP 地址范围：  

   ```routeros
   /interface/veth/add name=veth1 address=172.17.0.2/24 gateway=172.17.0.1
   ```

   :::info
   以下配置等同于其他 Container 引擎（例如 Docker）中的“bridge”网络模式。也可以创建等同于“host”的配置。

   **重要：** 一个 veth 接口可供多个 Containers 使用。你可以创建多个 veth 接口，为不同 Containers 创建[隔离](/docs/7.24/containers#isolated-containers)网络。
   :::
3. 新建一个将用于 Containers 的 [bridge](/docs/bridging-and-switching)，并分配与 veth 接口网关相同的 IP 地址：  

   ```routeros
   /interface/bridge/add name=containers
   /ip/address/add address=172.17.0.1/24 interface=containers
   ```

4. 将 veth 接口添加到新建的 bridge：  

   ```routeros
   /interface/bridge/port/add bridge=containers interface=veth1
   ```

5. 为出站流量创建 NAT：  

   ```routeros
   /ip/firewall/nat/add chain=srcnat action=masquerade src-address=172.17.0.0/24
   ```

6. 为 Container 创建环境变量：  

   ```routeros
   /container/envs/add list=ENV_PIHOLE key=TZ value="Europe/Riga"
   /container/envs/add list=ENV_PIHOLE key=FTLCONF_webserver_api_password value="mysecurepassword"
   /container/envs/add list=ENV_PIHOLE key=DNSMASQ_USER value="root"
   ```

7. 为 Container 创建挂载卷：  

   ```routeros
   /container/mounts/add list=MOUNT_PIHOLE_PIHOLE src=disk1/volumes/pihole/pihole dst=/etc/pihole
   /container/mounts/add list=MOUNT_PIHOLE_DNSMASQD src=disk1/volumes/pihole/dnsmasq.d dst=/etc/dnsmasq.d
   ```

   :::warning
   `src=` 指向 RouterOS 中的位置（也可以是 `src=disk1/etc_pihole`，例如，如果你决定将配置文件放在外部 USB 介质上），`dst=` 指向已定义的位置（有关应指向何处的信息，请参阅 containers 手册、wiki 或 github）。如果首次使用时 `src` 目录不存在，则会使用容器中 `dst` 位置的内容填充该目录。
   :::

   :::warning
   强烈建议将任何 Container 卷放在连接到 RouterOS 设备的磁盘上。避免将 Container 卷放在内置存储上。
   :::
8. 配置为使用特定的 Container 仓库，例如使用 Docker.io：  

   ```routeros
   /container/config/set registry-url=https://registry-1.docker.io tmpdir=disk1/tmp
   ```

9. 添加 Container：  

   ```routeros
   /container/add remote-image=pihole/pihole interface=veth1 root-dir=disk1/images/pihole mountlists=MOUNT_PIHOLE_PIHOLE,MOUNT_PIHOLE_DNSMASQD envlist=ENV_PIHOLE name=pihole
   ```

   :::tip
   如果希望在 `/log/print` 中查看容器输出，请在创建 Container 时添加 `logging=yes`，root-dir 应指向外部驱动器。不建议将内部存储用于 Container。

   **重要：** 获取 Container 镜像有多种方式，如果需要其他添加 Container 镜像的方法，请查看[添加 Container 镜像](/docs/7.24/containers#adding-a-container-image)部分。

   **重要：** 添加 Container 后将开始下载或解压该镜像，添加完成后 Container 本身不会启动，首次下载或解压完成后需要手动启动它。
   :::
10. 检查 Container 的状态，等待下载或解压完成，直到显示 `status=stopped`：  

    ```routeros
    /container/print
    ```

11. 启动 Container：  

    ```routeros
    /container/start pihole
    ```

12. 为 Container 创建端口转发：  

    ```ros
    /ip/firewall/nat
    add action=dst-nat chain=dstnat dst-address=192.168.88.1 dst-port=80 protocol=tcp to-addresses=172.17.0.2 to-ports=80
    ```

13. 在 Web 浏览器中访问 `http://192.168.88.1/admin/`，应能打开 Pi-hole Web 面板。
14. 要开始在设备上使用 Pi-hole，请将其 DNS 配置更改为使用 `192.168.88.1` 作为 DNS 服务器。

### 添加 Container 镜像 {#adding-a-container-image}

有多种方式可以让 Container 镜像在 RouterOS 设备上运行。请查看以下示例。

#### 选项 A：从外部仓库获取镜像 {#option-a-get-an-image-from-an-external-library}

设置 registry-url（用于从 Docker registry 下载容器），并将 extract directory（tmpdir）设置为已连接的 USB 介质：

```ros
/container/config/set registry-url=https://registry-1.docker.io tmpdir=disk1/tmp
```

拉取镜像：

```ros
/container/add remote-image=pihole/pihole interface=veth1 root-dir=disk1/images/pihole mountlists=MOUNT_PIHOLE_PIHOLE,MOUNT_PIHOLE_DNSMASQD envlist=ENV_PIHOLE name=pihole
```

镜像将自动拉取并解压到 root-dir。可使用以下命令检查状态：

```ros
/container/print
```

#### 选项 B：从 PC 导入镜像 {#option-b-import-image-from-pc}

可以使用运行 Docker 或 Podman 的 PC 下载所需容器镜像，并将其保存为归档文件。建议使用 [Podman](https://podman.io/docs/installation)，因为使用 Podman 可以更轻松地针对特定架构构建和下载容器。

1. 根据 RouterOS 设备的架构下载所需镜像。  

   ```routeros
   #For ARM64
   podman pull --arch=arm64 docker.io/pihole/pihole

   #For ARM
   podman pull --arch=arm docker.io/pihole/pihole

   #For AMD64
   podman pull --arch=amd64 docker.io/pihole/pihole
   ```

2. 将容器镜像保存为归档文件。  

   ```routeros
   podman save pihole > pihole.tar
   ```

3. 将归档文件上传到 RouterOS 设备，例如：  

   ```routeros
   rsync -av pihole.tar admin@192.168.88.1:/data/disk1/
   ```

   :::tip
   也可以使用 Winbox 上传文件！
   :::
4. 使用上传的容器镜像归档文件，在 RouterOS 设备上创建 Container。  

   ```routeros
   /container/add file=disk1/pihole.tar interface=veth1 root-dir=disk1/pihole mountlists=MOUNT_PIHOLE_PIHOLE,MOUNT_PIHOLE_DNSMASQD envlist=ENV_PIHOLE name=pihole
   ```

#### 选项 C：在 PC 上构建镜像 {#option-c-build-an-image-on-pc}

你可以构建自己的 Container，并在 RouterOS 设备上使用。虽然可以使用 Docker 构建 Container，但我们建议使用 [Podman](https://podman.io/docs/installation)，因为使用 Podman 更容易针对特定架构构建 Container。

1. 获取所需 Container 镜像的源文件，例如使用 git。  

   ```routeros
   git clone https://github.com/pi-hole/docker-pi-hole.git
   cd docker-pi-hole
   ```

2. 通过指定 Dockerfile 或 Containerfile 以及目标架构来构建 Container 镜像。  

   ```routeros
   #For ARM64
   podman build --platform linux/arm64 --tag pihole -f ./src/Dockerfile

   #For ARM
   podman build --platform linux/arm --tag pihole -f ./src/Dockerfile

   #For AMD64
   podman build --platform linux/amd64 --tag pihole -f ./src/Dockerfile
   ```

3. 将容器镜像保存为归档文件。  

   ```routeros
   podman save pihole > pihole.tar
   ```

4. 将归档文件上传到 RouterOS 设备，例如。  

   ```routeros
   rsync -av pihole.tar admin@192.168.88.1:/data/disk1/
   ```

   :::tip
   也可以使用 Winbox 上传文件！
   :::
5. 使用上传的容器镜像归档文件，在 RouterOS 设备上创建 Container。  

   ```routeros
   /container/add file=disk1/pihole.tar interface=veth1 root-dir=disk1/pihole mountlists=MOUNT_PIHOLE_PIHOLE,MOUNT_PIHOLE_DNSMASQD envlist=ENV_PIHOLE name=pihole
   ```

##### 替代方法：使用 Docker 构建 Container 镜像 {#alternative-using-docker-to-build-container-images}

要使用 Dockerfile 并制作自己的 docker 包，还需要安装 docker 以及 buildx 或其他构建工具包。

安装完成后，检查是否有额外架构可用：

```bash
docker buildx ls
```

应返回：

```bash
NAME/NODE DRIVER/ENDPOINT STATUS  PLATFORMS
default * docker
  default default         running linux/amd64, linux/arm64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/arm/v7, linux/arm/v6
```

如果没有，请安装额外架构：

```bash
docker run --privileged --rm tonistiigi/binfmt --install all
```

拉取或创建包含 Dockerfile 的项目并构建，提取镜像（根据需要调整 `--platform`）：

```bash
git clone https://github.com/pi-hole/docker-pi-hole.git
cd docker-pi-hole
docker buildx build  --no-cache --platform arm64 --output=type=docker -t pihole .
docker save pihole > pihole.tar
```

将 *pihole.tar* 上传到 RouterOS 设备。

Linux 系统上的镜像和对象可以 `pruned`

从 tar 镜像创建容器

```ros
/container/add file=pihole.tar interface=veth1 mountlists=MOUNT_PIHOLE_PIHOLE,MOUNT_PIHOLE_DNSMASQD envlist=ENV_PIHOLE name=pihole
```

### 网络示例 {#networking-examples}

#### 使用 NAT 的网桥 {#bridge-with-nat}

在此网络配置中，所有 Container 使用同一个 veth 接口，并且彼此通信不受任何防火墙限制，但需要转发端口，以允许访问 Container 的端口。

例如，数据库 Container 需要与 Web 应用 Container 通信；Web 应用需要将端口 `80` 暴露给外部，而数据库 Container 不需要向外部暴露任何端口。

- 网络配置：  

  ```routeros
  /interface/veth/add name=veth1 address=172.17.0.2/24 gateway=172.17.0.1
  /interface/bridge/add name=containers
  /ip/address/add address=172.17.0.1/24 interface=containers
  /interface/bridge/port/add bridge=containers interface=veth1
  /ip/firewall/nat
  add chain=srcnat action=masquerade src-address=172.17.0.0/24
  add action=dst-nat chain=dstnat dst-address=192.168.88.1 dst-port=80 protocol=tcp to-addresses=172.17.0.2 to-ports=80
  ```

- database Container 配置：  

  ```routeros
  /container/envs/add list=ENV_POSTGRES key=POSTGRES_DB value="webapp"
  /container/envs/add list=ENV_POSTGRES key=POSTGRES_PASSWORD value="<changeme>"
  /container/envs/add list=ENV_POSTGRES key=POSTGRES_USER value="webapp"
  /container/envs/add list=ENV_POSTGRES key=PGDATA value="/var/lib/postgresql/data/pgdata"
  /container/envs/add list=ENV_POSTGRES key=POSTGRES_INITDB_ARGS value="--encoding='UTF8' --lc-collate='C' --lc-ctype='C'"
  /container/mounts/add list=MOUNT_POSTGRES src=disk1/volumes/postgres/data dst=/var/lib/postgresql/data
  /container/add remote-image=postgres:15 interface=veth1 root-dir=disk1/images/postgres mountlists=MOUNT_POSTGRES envlist=ENV_POSTGRES name=postgres start-on-boot=yes logging=yes
  ```

- webapp Container 配置：  

  ```routeros
  /container/add remote-image=dpage/pgadmin4 interface=veth1 root-dir=disk1/images/pgadmin name=pgadmin start-on-boot=yes logging=yes
  ```

在本示例中，`pgadmin` 的端口 80 可供所有人访问，但 `postgres` 的端口 5432 不可供所有人访问；只能通过 `pgadmin` 以 `127.0.0.1` 访问，或通过运行该 Container 的 RouterOS 设备以 `172.17.0.2` 访问。

#### 隔离的 Container {#isolated-containers}

在这种网络设置中，你有多个 Container，并且希望确保其中一些 Container 可以在没有 Firewall 限制的情况下通信，而另一些则需要与其他 Container 隔离。例如，你可能希望创建两个 database Container 并将它们隔离。

- 网络配置。  

  ```routeros
  /interface/veth/add name=veth1 address=172.17.0.2/24 gateway=172.17.0.1
  /interface/veth/add name=veth2 address=172.18.0.2/24 gateway=172.18.0.1
  /interface/bridge/add name=containers1
  /interface/bridge/add name=containers2
  /ip/address/add address=172.17.0.1/24 interface=containers1
  /ip/address/add address=172.18.0.1/24 interface=containers2
  /interface/bridge/port/add bridge=containers1 interface=veth1
  /interface/bridge/port/add bridge=containers2 interface=veth2
  /ip/firewall/nat
  add chain=srcnat action=masquerade src-address=172.17.0.0/24
  add chain=srcnat action=masquerade src-address=172.18.0.0/24
  add action=dst-nat chain=dstnat dst-address=192.168.88.1 dst-port=81 protocol=tcp to-addresses=172.17.0.2 to-ports=80
  add action=dst-nat chain=dstnat dst-address=192.168.88.1 dst-port=82 protocol=tcp to-addresses=172.18.0.2 to-ports=80
  ```

- 第一个和第二个 database container 配置。  

  ```routeros
  /container/envs/add list=ENV_POSTGRES1 key=POSTGRES_DB value="webapp1"
  /container/envs/add list=ENV_POSTGRES1 key=POSTGRES_PASSWORD value="<changeme>"
  /container/envs/add list=ENV_POSTGRES1 key=POSTGRES_USER value="webapp1"
  /container/envs/add list=ENV_POSTGRES1 key=PGDATA value="/var/lib/postgresql/data/pgdata"
  /container/envs/add list=ENV_POSTGRES1 key=POSTGRES_INITDB_ARGS value="--encoding='UTF8' --lc-collate='C' --lc-ctype='C'"
  /container/mounts/add list=MOUNT_POSTGRES1 src=disk1/volumes/postgres1/data dst=/var/lib/postgresql/data
  /container/add remote-image=postgres:15 interface=veth1 root-dir=disk1/images/postgres1 mountlists=MOUNT_POSTGRES1 envlist=ENV_POSTGRES1 name=postgres1 start-on-boot=yes logging=yes
  ```

  ```routeros
  /container/envs/add list=ENV_POSTGRES2 key=POSTGRES_DB value="webapp2"
  /container/envs/add list=ENV_POSTGRES2 key=POSTGRES_PASSWORD value="<changeme>"
  /container/envs/add list=ENV_POSTGRES2 key=POSTGRES_USER value="webapp2"
  /container/envs/add list=ENV_POSTGRES2 key=PGDATA value="/var/lib/postgresql/data/pgdata"
  /container/envs/add list=ENV_POSTGRES2 key=POSTGRES_INITDB_ARGS value="--encoding='UTF8' --lc-collate='C' --lc-ctype='C'"
  /container/mounts/add list=MOUNT_POSTGRES2 src=disk1/volumes/postgres2/data dst=/var/lib/postgresql/data
  /container/add remote-image=postgres:15 interface=veth2 root-dir=disk1/images/postgres2 mountlists=MOUNT_POSTGRES2 envlist=ENV_POSTGRES2 name=postgres2 start-on-boot=yes logging=yes
  ```

- 第一个和第二个 webapp 容器配置。  

  ```routeros
  /container/add remote-image=dpage/pgadmin4 interface=veth1 root-dir=disk1/images/pgadmin1 name=pgadmin1 start-on-boot=yes logging=yes
  ```

  ```routeros
  /container/add remote-image=dpage/pgadmin4 interface=veth2 root-dir=disk1/images/pgadmin2 name=pgadmin2 start-on-boot=yes logging=yes
  ```

在本示例中，`pgadmin1` 可以访问 `postgres1`，但无法访问 `postgres2`。同样，`pgadmin2` 可以访问 `postgres2`，但无法访问 `postgres1`。

#### Layer2 网络中的容器 {#container-in-layer2-network}

在此网络设置中，Container 直接连接到包含其他物理网络设备的 Layer2 网络。此网络设置等同于 Docker 等其他 Container 引擎中的“host”网络模式。

:::danger
在此网络设置中，Container 上的所有端口都会暴露。这被认为是不安全的，但会略微提升 Container 的网络性能。
:::

- 网络配置。  

  ```routeros
  /interface/veth/add name=veth1 address=192.168.88.2/24 gateway=192.168.88.1
  /interface/bridge/port/add bridge=bridge interface=veth1
  ```

- 如果 RouterOS 设备上的服务使用相同端口，则需要禁用这些服务。  

  ```routeros
  /ip/service/disable [find where name=www]
  ```

- webapp 配置。  

  ```routeros
  /container/add remote-image=dpage/pgadmin4 interface=veth1 root-dir=disk1/images/pgadmin name=pgadmin start-on-boot=yes logging=yes
  ```

在此示例中，`pgadmin` Container 不需要端口转发，但 Container 使用的所有其他端口现在都可供同一 Layer2 网络上的其他设备访问。此类设置仅应在应用要求 Container 具有同一 Layer2 网络中的 IP 地址时使用，例如使用广播流量进行服务发现的应用（大多数情况下，此类要求仍可通过使用 NAT 来规避）。

### Container 的 IPv4 和 IPv6 {#ipv4-and-ipv6-for-container}

在此网络设置中，Container 将能够通过 IPv4 和 IPv6 进行通信。该方案基于 [Bridge with NAT](/docs/7.24/containers#bridge-with-nat) 网络设置。

- 网络配置。  

  ```routeros
  /ip/address
  add address=172.17.0.1/24 interface=containers
  /ip/firewall/nat
  add action=masquerade chain=srcnat src-address=172.17.0.0/24
  add action=dst-nat chain=dstnat dst-address=192.168.88.1 dst-port=80 protocol=tcp to-addresses=172.17.0.2 to-ports=80
  /ipv6/address
  add address=fd8d:5ad2:24:2::1 interface=containers
  /ipv6/firewall/nat
  add action=masquerade chain=srcnat src-address=fd8d:5ad2:24:2::/64
  add action=dst-nat chain=dstnat dst-address=fd8d:5ad2:24:2::1 dst-port=80 protocol=tcp to-addresses=fd8d:5ad2:24:2::2 to-ports=80
  /interface/veth
  add address=172.17.0.2/24,fd8d:5ad2:24:2::2/64 gateway=172.17.0.1 gateway6=fd8d:5ad2:24:2::1 name=veth1
  /interface/bridge/port/add bridge=containers interface=veth1
  ```

- webapp container 配置。

  ```routeros
  /container/add remote-image=nginx interface=veth1 root-dir=disk1/images/nginx name=nginx start-on-boot=yes logging=yes
  ```

## Healthcheck

从 RouterOS 7.23 开始，RouterOS 已实现 healthcheck 支持。
Healthcheck 是一种机制，可帮助验证 container 中的应用是否正常运行。

Healthcheck 依赖标准退出码。用于 healthcheck 的命令应在应用健康时返回 0，在应用不健康时返回非零退出码。

大多数情况下，对于运行 Web 接口的 container，向 localhost 发送简单的 HTTP GET 请求即可验证应用是否正常响应。

| 属性 | 描述 |
| :-- | :-- |
| **healthcheck-cmd** (*string*; *Default*:)| 用于健康检查的命令 |
| **healthcheck-interval** (*time*; *Default*: 00:00:30)| HH:MM:SS 格式的时间间隔 |
| **healthcheck-retries** (*int*; *Default*: 3)| 检查失败时，在容器应用被判定为不健康之前的重试次数 |
| **healthcheck-start-interval** (*time*; *Default*: 00:00:05)| 启动期间健康检查之间的时间间隔 |
| **healthcheck-start-period** (*time*; *Default*: 00:00:00) | 为容器启动提供的时间。启动期间的任何失败都不会计入重试计数器 |
| **healthcheck-status** (*string*)| 容器的当前健康状态。显示容器内应用的当前状态以及探测输出 |
| **healthcheck-timeout** (*time*; *Default*: 00:00:30)| 如果健康检查探测耗时超过指定时间段，则该检查计为失败 |

### Healthcheck 示例 {#healthcheck-example}

本示例将设置一个 HomeAssistant 容器，并为其配置一个简单的健康检查。

有关设置 HomeAssistant 容器的指南，请参阅 [HomeAssistant setup guide](/docs/7.24/containers/user-guides/container-homeassistant)。

要设置 E-mail 工具，请参阅 [E-mail documentation page](/docs/system-information-and-utilities/e-mail)。

1. 检查容器名称

    ```ros
    [admin@ROSE] > container print 
    Flags: S - STOPPED, R - RUNNING
    Columns: NAME, ROOT-DIR, INTERFACE, MEMORY-CURRENT, CPU-USAGE, CONTAINER-SIZE, DATA-SIZE, TAG
    #   NAME                ROOT-DIR                                        INTERFACE                MEMORY-CURRENT  CPU-USAGE  CONTAINER-SIZE  DATA-SIZE  TAG                                                                   
    1 S home-assistant  /nvme1/apps/home-assistant/home-assistant_root  veth-home-assistant                          0  2201.9MiB       471.9KiB   docker.io/homeassistant/home-assistant:latest
    ```

2. 创建容器后，可以通过设置健康检查命令在其上启用健康检查。对于该特定容器，可以增加 healthcheck-interval 并指定 start-period，因为 HomeAssistant 是资源占用较大的容器，在某些设备上可能启动较慢。

    ```ros
    /container/set home-assistant healthcheck-cmd="curl -f http://localhost:8123" healthcheck-interval="00:01:00" healthcheck-start-period="00:02:00"
    ```

    如果成功且容器启动，应会看到容器以“Healthy”状态运行。
    此外，healthcheck-status 字段会填充容器当前状态以及 curl 命令的输出。

    ```ros
    [admin@ROSE] > container print proplist=name,healthcheck-status
    Flags: S - STOPPED, R - RUNNING, H - HEALTHY
    Columns: NAME, HEALTHCHECK-STATUS
    #   NAME                HEALTHCHECK-STATUS                                                                           
    
     H home-assistant  good, output:   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                                              Dload  Upload   Total   Spent    Left  Speed     
    ```

作为额外步骤，可以创建一个脚本轮询容器状态，并在 healthcheck 失败时向你的电子邮箱发送通知，然后添加 scheduler 定期运行该脚本。

1. 创建脚本：

    ```ros
    /system script
    add name=unhealthy-container-alert source="
    :global lastState\
        \n:local currentState \"\"\
        \n:local msg \"\"\
        \n:foreach i in=[/container find where unhealthy] do={\
        \n:local name [/container get \$i name]\
        \n:set currentState (\$currentState . \$name . \";\")\
        \n}\
        \n:if ([:len \$currentState] = 0) do={\
        \n:set lastState \"\"\
        \n} else={\
        \n:if (\$currentState != \$lastState) do={\
        \n:set lastState \$currentState\
        \n:foreach i in=[/container find where unhealthy] do={\
        \n:local name [/container get \$i name]\
        \n:set msg (\$msg . \$name . \" is UNHEALTHY\\n\")\
        \n}\
        \n/tool e-mail send to=\"admin@example.com\" subject=\"Unhealthy container(s)\" body=\$msg\
        \n}\
        \n}"
    ```

    :::warning
    请务必将 admin@example.com 替换为你的电子邮箱。
    :::

2. 创建 scheduler：

    ```ros
    /system scheduler
    add interval=2m name=container-healthcheck-alert on-event="/system/script/run unhealthy-container-alert"
    ```

## Memory

有三个参数控制容器内存行为：`memory-max`、`memory-high` 和 `swap-max`。每个参数都可以按容器配置，也可以在 `/container/config` 中全局配置。全局值作为默认值 — 如果同时设置了按容器限制和全局限制，则应用**较低**的值（此规则双向适用）。

### memory-max

设置容器 RAM 使用量的硬上限（以字节为单位）。如果容器超过此限制，将被终止。当两个级别都设置时，例如按容器限制为 500MB，全局限制为 300MB，则 300MB 限制生效。如果启用了 swap，容器可能会尝试将超出的内存换出，而不是被终止。

### memory-high

设置容器 RAM 使用量的软上限（以字节为单位）。达到该限制时，容器进程会被限流，并承受较大的内存回收压力 — 系统将尝试释放内存（包括交换）。与 `memory-max` 不同，容器**不会**因超过此限制而被终止。

### swap-max

定义容器可使用的 swap 空间最大量（以字节为单位）。与 `memory-max` 配合使用 — 当容器达到其 `memory-max` 限制后，超出的内存将被换出，直到达到 `swap-max` 限制。例如，如果容器的 `memory-max` 为 600MB，而某个进程尝试使用 800MB，则剩余的 200MB 将被推入 swap。必须在设备上启用 swap（请参阅 [Swap space](/docs/hardware/disks)）。

## 提示与技巧 {#tips-and-tricks}

- 容器会占用大量磁盘空间。强烈建议使用 USB/SATA、NVMe 外接介质。对于带 USB 端口的设备，可使用 USB 转 SATA 适配器连接 2.5" 驱动器，以获得额外存储和更快的文件操作速度。
- 要在路由器重启后启动容器，请使用 start-on-boot 选项（从 7.6beta6 开始）：

  ```ros
  /container/print
    0 name="2e679415-2edd-4300-8fab-a779ec267058" tag="test_arm64:latest" os="linux" arch="arm" interface=veth2 
      root-dir=disk1/alpine mountlists="" dns="" logging=yes start-on-boot=yes status=running 

  /container/set 0 start-on-boot=yes
  ```

- 可以进入正在**运行**的容器 shell：

  ```ros
  /container/shell 0
  ```

- 可以设置以秒为单位的容器超时时间，否则容器将无限期保持打开：

  ```ros
  /container/shell 0 timeout=120
  ```

- 启用日志以获取容器的输出：

  ```ros
  /container/set 0 logging=yes
  ```

- 某些容器需要额外权限才能正常运行：  

  ```routeros
  /container/set 0 user=0:0
  ```

- 可以在 Container 中以指定用户执行命令，而无需调用 `/bin/sh`：  

  ```routeros
  /container/shell nextcloud user=www-data cmd="php /var/www/html/cron.php" no-sh
  ```

- 从 7.11beta5 版本开始，可以添加多个地址和 ipv6 地址：

  ```ros
  /interface/veth/add address=172.17.0.3/16,fd8d:5ad2:24:2::2/64 gateway=172.17.0.1 gateway6=fd8d:5ad2:24:2::1
  ```

- 向容器添加活跃的 /dev/ 节点：

  ```shell
  /dev/full	/dev/null	/dev/random		/dev/tty	/dev/urandom	/dev/zero	/dev/console	/dev/net/tun	/dev/kvm	/dev/fuse
  ```

- 使用 `Devices` 参数，可以允许将串行终端暴露给容器。

```ros
/container/set your-container devices=serial0:""
```

:::info
要允许容器使用串行控制台端口，必须先在 `/system/console` 下释放 RouterOS 使用的串行控制台
:::
