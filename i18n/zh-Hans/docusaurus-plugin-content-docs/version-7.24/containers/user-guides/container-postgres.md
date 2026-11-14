---
sidebar_key: "containers/user-guides/container-postgres"
sidebar_position: 6
title: "容器 - Postgres"
sidebar_label: "容器 - Postgres"
description: "本指南提供在 MikroTik RouterOS 上设置 PostgreSQL 和 pgAdmin 容器的分步说明，包括创建挂载点、配置环境变量以及启动具有持久存储的容器。"
tags:
  - 'postgresql'
  - 'docker'
  - 'container'
source: https://manual.mikrotik.com/docs/7.24/containers/user-guides/container-postgres
captured_at: '2026-11-04T11:27:43+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

PostgreSQL 是一个强大且广泛使用的 SQL 数据库引擎，是众多应用（从小型 Web 项目到企业级系统）的骨干。本指南将引导你完成在 RouterOS 上启动并运行 PostgreSQL 所需的基本步骤。此外，本指南还将提供设置 pgAdmin 所需的说明——pgAdmin 是一个功能丰富的基于 Web 的界面，可让你轻松管理 PostgreSQL 数据库。

## 配置 {#configuration}

本节提供在 MikroTik RouterOS 设备上设置 PostgreSQL 容器的分步说明。PostgreSQL 是一个强大的开源关系型数据库系统，支持 SQL 标准，并提供事务、子查询和用户定义类型等高级功能。继续操作之前，请确保你已按照 [容器网络](../index.md#networking-examples) 文档创建了容器网络。

### 步骤 1：为 PostgreSQL 容器创建挂载点 {#step-1-create-mount-point-for-postgresql-container}

在创建容器之前，你需要创建一个持久化存储位置，PostgreSQL 将在其中存储其数据库文件。这可确保即使容器被重新创建或移除，你的数据仍会保留，从而保护你宝贵的数据库信息。

```routeros
/container/mounts/add list=MOUNT_POSTGRES src=disk1/volumes/postgres/data dst=/var/lib/postgresql/data
```

此挂载点会将你的本地数据目录映射到容器的 `/var/lib/postgresql/data` 路径，PostgreSQL 将在该路径中存储所有数据库文件、事务日志和系统目录。

### 步骤 2：为 PostgreSQL 容器配置环境变量 {#step-2-configure-environment-variables-for-postgresql-container}

环境变量提供 PostgreSQL 在启动时所需的配置参数。这些变量定义初始数据库名称、用户凭据和数据目录位置。

```routeros
/container/envs/add list=ENV_POSTGRES key=POSTGRES_DB value="myapp"
/container/envs/add list=ENV_POSTGRES key=POSTGRES_PASSWORD value="<changeme>"
/container/envs/add list=ENV_POSTGRES key=POSTGRES_USER value="myapp"
/container/envs/add list=ENV_POSTGRES key=PGDATA value="/var/lib/postgresql/data/pgdata"
/container/envs/add list=ENV_POSTGRES key=POSTGRES_INITDB_ARGS value="--encoding='UTF8' --lc-collate='C' --lc-ctype='C'"
```

`POSTGRES_DB` 变量指定 PostgreSQL 首次启动时将创建的初始数据库名称。`POSTGRES_USER` 和 `POSTGRES_PASSWORD` 变量定义你将用于连接和管理数据库的超级用户账户凭据。`PGDATA` 变量指示 PostgreSQL 在容器内存储其数据文件的位置。`POSTGRES_INITDB_ARGS` 变量提供额外的初始化参数，将数据库编码设置为 UTF8，并将区域设置设置为 C，以获得一致的行为。

### 步骤 3：创建 PostgreSQL 容器 {#step-3-create-the-postgresql-container}

现在你可以创建并配置 PostgreSQL 容器实例了。此命令从远程注册表拉取官方 PostgreSQL Docker 镜像，并使用前面步骤中建立的环境变量和挂载点对其进行配置。

```routeros
/container/add remote-image=postgres:15 interface=veth1 root-dir=disk1/images/postgres mountlists=MOUNT_POSTGRES envlists=ENV_POSTGRES name=postgres start-on-boot=yes logging=yes
```

:::warning

你可以通过将 `postgres:15` 值更改为任何其他可用的 PostgreSQL 版本标签，来指定不同的 PostgreSQL 版本。

:::

### 步骤 4：启动 PostgreSQL 容器 {#step-4-start-the-postgresql-container}

所有配置完成后，你现在可以启动 PostgreSQL 容器了。启动容器将启动 PostgreSQL 数据库服务器，它将准备好接受来自你的应用程序的连接。

```routeros
/container/start [find where name=postgres]
```

启动后，PostgreSQL 将根据你配置的环境变量自动创建初始数据库和用户。如果你已如此配置，容器将在系统启动时自动启动。

## 高级：PostgreSQL 与 pgAdmin {#advanced-postgresql-with-pgadmin}

本指南演示如何将 pgAdmin（用于 PostgreSQL 数据库的流行的基于 Web 的管理工具）作为容器配置并部署到你的 MikroTik RouterOS 设备上。pgAdmin 提供直观的图形界面来管理你的 PostgreSQL 数据库服务器，使你能够通过 Web 浏览器创建数据库、执行查询、管理用户并执行各种管理任务。

### 步骤 1：为 pgAdmin 容器创建挂载点目录 {#step-1-create-mount-points-directories-for-pgadmin-container}

在创建容器之前，你需要创建持久化存储位置，pgAdmin 将在其中存储其配置文件、会话数据和服务器连接设置。这可确保即使容器重启或更新，你的设置和连接仍保持完好。

```routeros
/container/mounts/add list=MOUNT_PGADMIN_CONFIG src=disk1/volumes/pgadmin/config dst=/config
/container/mounts/add list=MOUNT_PGADMIN_DATA src=disk1/volumes/pgadmin/data dst=/var/lib/pgadmin
```

第一个挂载点会将你的本地配置目录映射到容器的 `/config` 路径，pgAdmin 将在其中存储服务器定义和用户偏好设置。第二个挂载点会将你的本地数据目录映射到容器的 `/var/lib/pgadmin` 路径，该路径用于存放会话信息、日志和运行时数据。

### 步骤 2：为 pgAdmin 容器配置环境变量 {#step-2-configure-environment-variables-for-pgadmin-container}

环境变量提供 pgAdmin 在启动时所需的配置参数。这些变量定义应用程序行为、默认凭据和网络设置。

```routeros
/container/envs/add list=ENV_PGADMIN key=PGADMIN_LISTEN_PORT value=80
/container/envs/add list=ENV_PGADMIN key=PGADMIN_DEFAULT_EMAIL value="sysadmin@domain.com"
/container/envs/add list=ENV_PGADMIN key=PGADMIN_DEFAULT_PASSWORD value="<changeme>"
/container/envs/add list=ENV_PGADMIN key=PGADMIN_SERVER_JSON_FILE value="/config/servers.json"
/container/envs/add list=ENV_PGADMIN key=PGADMIN_PREFERENCES_JSON_FILE value="/config/preferences.json"
/container/envs/add list=ENV_PGADMIN key=PGPASS_FILE value="/config/pgpass"
/container/envs/add list=ENV_PGADMIN key=PGADMIN_DISABLE_POSTFIX value="True"
```

`PGADMIN_LISTEN_PORT` 变量指定 pgAdmin 将监听哪个端口以接受传入的 Web 连接——默认使用端口 80 进行标准 HTTP 访问。`PGADMIN_DEFAULT_EMAIL` 和 `PGADMIN_DEFAULT_PASSWORD` 变量定义你首次登录 pgAdmin Web 界面时将使用的初始管理员凭据。其余变量指定容器内的文件路径，pgAdmin 将在这些路径中存储和检索服务器连接配置、用户偏好设置和密码文件数据。

### 步骤 3：创建 pgAdmin 容器 {#step-3-create-the-pgadmin-container}

现在你可以创建并配置 pgAdmin 容器实例了。此命令从远程注册表拉取官方 dpage/pgadmin4 Docker 镜像，并使用前面步骤中建立的环境变量和挂载点对其进行配置。

```routeros
/container/add remote-image=dpage/pgadmin4 envlists=ENV_PGADMIN mountlists=MOUNT_PGADMIN_CONFIG,MOUNT_PGADMIN_DATA interface=veth1 logging=yes name=pgadmin root-dir=disk1/images/pgadmin start-on-boot=yes user=0:0
```

此命令指定来自 Docker Hub 的官方 pgAdmin4 Docker 镜像，应用你先前定义的环境变量列表和挂载点列表，将容器分配到 `veth1` 虚拟以太网接口，启用日志记录以便故障排查，将容器命名为 "pgadmin" 以便识别，将容器镜像文件存储在指定的磁盘位置，配置容器在路由器每次启动时自动启动，并以 root 用户权限运行容器。

### 步骤 4：禁用 Webfig 服务 {#step-4-disable-the-webfig-service}

由于 pgAdmin 作为基于 Web 的应用程序运行，并且默认监听 HTTP 端口 80，因此它会与 RouterOS 内置的 WebFig Web 界面冲突，后者也使用端口 80。为避免此端口冲突并确保 pgAdmin 正常运行，你必须禁用 WebFig 服务。

```routeros
/ip/service
set www disabled=yes
```

:::tip

如果你希望保持 WebFig 可访问，还有一种替代方法：只需修改 `PGADMIN_LISTEN_PORT` 环境变量，使用不同的端口号——例如 8080 或 8888——而不是默认端口 80。这样两个服务就可以同时运行而不会冲突。

:::

### 步骤 5：启动 pgAdmin 容器 {#step-5-start-the-pgadmin-container}

所有配置完成后，你现在可以启动 pgAdmin 容器了。启动容器将启动 pgAdmin Web 应用程序，它将可通过你的 Web 浏览器访问。

```routeros
/container/start [find where name=pgadmin]
```

启动后，你可以通过在 Web 浏览器中导航到路由器的 IP 地址来访问 pgAdmin Web 界面。使用你在步骤 2 中配置的电子邮件地址和密码进行身份验证，并开始管理你的 PostgreSQL 数据库服务器。
