---
title: "Container - Postgres"
description: "本指南提供在 MikroTik RouterOS 上设置 PostgreSQL 和 pgAdmin 容器的分步说明，包括创建挂载点、配置环境变量，以及使用持久存储启动容器。"
tags:
  - 'postgresql'
  - 'docker'
  - 'container'
source: https://manual.mikrotik.com/docs/7.25/containers/user-guides/container-postgres
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "memory"
---

PostgreSQL 是一个功能强大、广泛使用的 SQL 数据库引擎，是众多应用程序的基础，涵盖从小型 Web 项目到企业级系统。本指南将介绍在 RouterOS 上启动并运行 PostgreSQL 所需的必要步骤。此外，本指南还将提供设置 pgAdmin 所需的说明。pgAdmin 是一个功能丰富的 Web 界面，可用于轻松管理 PostgreSQL 数据库。

## 配置 {#configuration}

本节提供在 MikroTik RouterOS 设备上设置 PostgreSQL 容器的分步说明。PostgreSQL 是一个功能强大的开源关系型数据库系统，支持 SQL 标准，并提供事务、子查询和用户定义类型等高级功能。开始之前，请确保已按 [Container network](/docs/7.24/containers#networking-examples) 文档中的说明创建容器网络。

### 步骤 1：为 PostgreSQL 容器创建挂载点 {#step-1-create-mount-point-for-postgresql-container}

创建容器之前，需要创建一个持久存储位置，供 PostgreSQL 存储其数据库文件。这可确保在容器重新创建或删除后数据仍然保留，从而保护重要的数据库信息。

```routeros
/container/mounts/add list=MOUNT_POSTGRES src=disk1/volumes/postgres/data dst=/var/lib/postgresql/data
```

该挂载点将本地数据目录映射到容器中的 `/var/lib/postgresql/data` 路径，PostgreSQL 将在此存储所有数据库文件、事务日志和系统目录。

### 步骤 2：为 PostgreSQL 容器配置环境变量 {#step-2-configure-environment-variables-for-postgresql-container}

环境变量提供 PostgreSQL 启动时所需的配置参数。这些变量定义初始数据库名称、用户凭据和数据目录位置。

```routeros
/container/envs/add list=ENV_POSTGRES key=POSTGRES_DB value="myapp"
/container/envs/add list=ENV_POSTGRES key=POSTGRES_PASSWORD value="<changeme>"
/container/envs/add list=ENV_POSTGRES key=POSTGRES_USER value="myapp"
/container/envs/add list=ENV_POSTGRES key=PGDATA value="/var/lib/postgresql/data/pgdata"
/container/envs/add list=ENV_POSTGRES key=POSTGRES_INITDB_ARGS value="--encoding='UTF8' --lc-collate='C' --lc-ctype='C'"
```

`POSTGRES_DB` 变量指定 PostgreSQL 首次启动时创建的初始数据库名称。`POSTGRES_USER` 和 `POSTGRES_PASSWORD` 变量定义用于连接和管理数据库的超级用户账户凭据。`PGDATA` 变量指示容器中 PostgreSQL 存储其数据文件的位置。`POSTGRES_INITDB_ARGS` 变量提供额外的初始化参数，将数据库编码设置为 UTF8，并将区域设置设置为 C，以获得一致的行为。

### 步骤 3：创建 PostgreSQL 容器 {#step-3-create-the-postgresql-container}

现在可以创建并配置 PostgreSQL 容器实例。此命令会从远程注册表拉取官方 PostgreSQL Docker 镜像，并使用前面步骤中确定的环境变量和挂载点对其进行配置。

```routeros
/container/add remote-image=postgres:15 interface=veth1 root-dir=disk1/images/postgres mountlists=MOUNT_POSTGRES envlists=ENV_POSTGRES name=postgres start-on-boot=yes logging=yes
```

:::warning

可以通过将 `postgres:15` 值更改为任何其他可用的 PostgreSQL 版本标签，指定不同的 PostgreSQL 版本。
:::

### 步骤 4：启动 PostgreSQL 容器 {#step-4-start-the-postgresql-container}

所有配置完成后，即可启动 PostgreSQL 容器。启动容器将运行 PostgreSQL 数据库服务器，随后该服务器将准备好接受来自应用的连接。

```routeros
/container/start [find where name=postgres]
```

启动后，PostgreSQL 会根据你配置的环境变量自动创建初始数据库和用户。如果已配置开机自启，容器将在系统启动时自动启动。

## 高级：使用 pgAdmin 的 PostgreSQL {#advanced-postgresql-with-pgadmin}

本指南演示如何在 MikroTik RouterOS 设备上将 pgAdmin 配置并部署为容器。pgAdmin 是流行的 PostgreSQL 数据库 Web 管理工具，提供直观的图形界面，用于管理 PostgreSQL 数据库服务器，使你能够通过 Web 浏览器创建数据库、执行查询、管理用户以及执行各种管理任务。

### 步骤 1：为 pgAdmin 容器创建挂载点目录 {#step-1-create-mount-points-directories-for-pgadmin-container}

在创建容器之前，需要创建持久化存储位置，pgAdmin 将在其中存储配置文件、会话数据和服务器连接设置。这可确保设置和连接在容器重启或更新后保持不变。

```routeros
/container/mounts/add list=MOUNT_PGADMIN_CONFIG src=disk1/volumes/pgadmin/config dst=/config
/container/mounts/add list=MOUNT_PGADMIN_DATA src=disk1/volumes/pgadmin/data dst=/var/lib/pgadmin
```

第一个挂载点将本地配置目录映射到容器中的 `/config` 路径，pgAdmin 将在其中存储服务器定义和用户首选项。第二个挂载点将本地数据目录映射到容器中的 `/var/lib/pgadmin` 路径，该路径用于存放会话信息、日志和运行时数据。

### 第 2 步：为 pgAdmin 容器配置环境变量 {#step-2-configure-environment-variables-for-pgadmin-container}

环境变量提供 pgAdmin 启动时所需的配置参数。这些变量定义应用程序行为、默认凭据和网络设置。

```routeros
/container/envs/add list=ENV_PGADMIN key=PGADMIN_LISTEN_PORT value=80
/container/envs/add list=ENV_PGADMIN key=PGADMIN_DEFAULT_EMAIL value="sysadmin@domain.com"
/container/envs/add list=ENV_PGADMIN key=PGADMIN_DEFAULT_PASSWORD value="<changeme>"
/container/envs/add list=ENV_PGADMIN key=PGADMIN_SERVER_JSON_FILE value="/config/servers.json"
/container/envs/add list=ENV_PGADMIN key=PGADMIN_PREFERENCES_JSON_FILE value="/config/preferences.json"
/container/envs/add list=ENV_PGADMIN key=PGPASS_FILE value="/config/pgpass"
/container/envs/add list=ENV_PGADMIN key=PGADMIN_DISABLE_POSTFIX value="True"
```

`PGADMIN_LISTEN_PORT` 变量指定 pgAdmin 监听传入 Web 连接的端口——默认使用端口 80 进行标准 HTTP 访问。`PGADMIN_DEFAULT_EMAIL` 和 `PGADMIN_DEFAULT_PASSWORD` 变量定义初始管理员凭据，首次登录 pgAdmin Web 界面时将使用这些凭据。其余变量指定容器内的文件路径，pgAdmin 将在这些路径中存储和读取服务器连接配置、用户首选项和密码文件数据。

### 第 3 步：创建 pgAdmin 容器 {#step-3-create-the-pgadmin-container}

现在可以创建并配置 pgAdmin 容器实例。此命令从远程注册表拉取官方 dpage/pgadmin4 Docker 镜像，并使用前面步骤中定义的环境变量和挂载点对其进行配置。

```routeros
/container/add remote-image=dpage/pgadmin4 envlists=ENV_PGADMIN mountlists=MOUNT_PGADMIN_CONFIG,MOUNT_PGADMIN_DATA interface=veth1 logging=yes name=pgadmin root-dir=disk1/images/pgadmin start-on-boot=yes user=0:0
```

此命令指定来自 Docker Hub 的官方 pgAdmin4 Docker 镜像，应用先前定义的环境变量列表和挂载点列表，将容器分配到 `veth1` 虚拟以太网接口，启用日志以进行故障排查，将容器命名为“pgadmin”以便于识别，将容器镜像文件存储在指定磁盘位置，配置容器在路由器启动时自动启动，并以 root 用户权限运行容器。

### 第 4 步：禁用 WebFig 服务 {#step-4-disable-the-webfig-service}

由于 pgAdmin 作为基于 Web 的应用程序运行，并且默认监听 HTTP 端口 80，因此会与同样使用端口 80 的 RouterOS 内置 WebFig Web 界面发生冲突。为避免此端口冲突并确保 pgAdmin 正常运行，必须禁用 WebFig 服务。

```routeros
/ip/service
set www disabled=yes
```

:::tip

如果希望保持 WebFig 可访问，可以采用另一种方法：只需将 `PGADMIN_LISTEN_PORT` 环境变量修改为其他端口号，例如 8080 或 8888，而不是默认的端口 80。这样两个服务即可同时运行而不会发生冲突。
:::

### 第 5 步：启动 pgAdmin 容器 {#step-5-start-the-pgadmin-container}

完成所有配置后，即可启动 pgAdmin 容器。启动容器将运行 pgAdmin Web 应用程序，并可通过 Web 浏览器访问。

```routeros
/container/start [find where name=pgadmin]
```

启动后，在 Web 浏览器中访问路由器的 IP 地址，即可打开 pgAdmin Web 界面。使用在第 2 步中配置的电子邮件地址和密码进行身份验证，然后开始管理 PostgreSQL 数据库服务器。
