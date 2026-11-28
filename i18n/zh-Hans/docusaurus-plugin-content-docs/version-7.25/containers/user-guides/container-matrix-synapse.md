---
title: "Container - Matrix (Synapse)"
description: "本页介绍如何在 MikroTik RouterOS 上将 Synapse Matrix 服务器部署为容器，涵盖容器网络配置和 PostgreSQL 环境设置等前置条件，以实现跨平台的安全联邦通信。"
tags:
  - 'container'
  - 'synapse'
  - 'matrix'
source: https://manual.mikrotik.com/docs/7.25/containers/user-guides/container-matrix-synapse
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "memory"
---

Matrix 是一种去中心化通信协议。每个 Matrix 服务器独立运行，维护自己的用户集合，并定义自己的规则和政策。

### 托管自己的 Matrix 服务器 {#hosting-your-own-matrix-server}

可以使用 Containers 直接在 RouterOS 设备上托管自己的 Matrix 服务器。这样能够完全控制通信基础设施。

### Federation

Matrix 服务器可以通过联邦连接，创建统一的通信网络。这使不同 Matrix 服务器上的用户能够安全地相互通信，而无需中央管理机构。

### 桥接到其他平台 {#bridging-to-other-platforms}

Matrix 支持桥接，以中继来自其他聊天平台的消息，包括：

- WhatsApp
- Discord
- Signal
- Telegram
- 以及许多其他平台

通过使用 Matrix 桥接，可以将多个平台的通信整合到单个应用程序中，例如 [Element](https://element.io/)。这样可以通过一个统一接口与不同平台上的用户通信。

# 在 RouterOS 上设置 Synapse Matrix 服务器 {#setting-up-a-synapse-matrix-server-on-routeros}

本指南介绍如何使用容器在 MikroTik RouterOS 设备上设置 Synapse，它是多种可用 Matrix 服务器之一。

:::info

在继续之前，请确保已创建 Container 网络。有关说明，请参阅 [Container network documentation](/docs/7.24/containers#networking-examples)。
:::

---

## 前提条件 {#prerequisites}

- 支持容器的 RouterOS 设备
- 已配置的现有容器网络
- 足够的数据库和 Synapse 数据存储空间

---

## 步骤 1：创建 PostgreSQL 容器环境变量 {#step-1-create-postgresql-container-environment-variables}

配置 PostgreSQL 容器的环境变量列表：

```routeros
/container/envs/add list=postgres_synapse_envs key=POSTGRES_DB value="synapse"
/container/envs/add list=postgres_synapse_envs key=POSTGRES_PASSWORD value="<POSTGRES_PASSWORD_HERE>"
/container/envs/add list=postgres_synapse_envs key=POSTGRES_USER value="synapse_user"
/container/envs/add list=postgres_synapse_envs key=PGDATA value="/var/lib/postgresql/data/pgdata"
/container/envs/add list=postgres_synapse_envs key=POSTGRES_INITDB_ARGS value="--encoding='UTF8' --lc-collate='C' --lc-ctype='C'"
/container/envs/add list=postgres_synapse_envs key=PGPORT value=5433
```

:::note

将 `<POSTGRES_PASSWORD_HERE>` 替换为所需的 PostgreSQL 密码。
:::

---

## 第 2 步：创建 PostgreSQL 容器挂载点 {#step-2-create-postgresql-container-mount}

创建一个挂载点，以在 RouterOS 设备上持久化 PostgreSQL 数据：

```routeros
/container/mounts/add list=synapse_postgres_data src=disk1/synapse-postgres-data dst=/var/lib/postgresql/data
```

---

## 第 3 步：创建 PostgreSQL 容器 {#step-3-create-the-postgresql-container}

使用前面步骤中的配置启动 PostgreSQL 容器：

```routeros
/container/add remote-image=postgres:17.2-alpine interface=veth1 root-dir=disk1/postgres-17.2-synapse mountlists=synapse_postgres_data envlists=postgres_synapse_envs name=postgresql_synapse
```

---

## 第 4 步：创建 Synapse 容器环境变量 {#step-4-create-synapse-container-environment-variables}

配置 Synapse 容器的环境变量：

```routeros
/container/envs/add list=synapse_envs key=SYNAPSE_CONFIG_DIR value="/data"
/container/envs/add list=synapse_envs key=SYNAPSE_CONFIG_PATH value="/data/homeserver.yaml"
/container/envs/add list=synapse_envs key=SYNAPSE_SERVER_NAME value="test.mt.lv"
/container/envs/add list=synapse_envs key=SYNAPSE_REPORT_STATS value="yes"
```

:::note

将 `test.mt.lv` 替换为实际的服务器域名。
:::

---

## 第 5 步：创建 Synapse 容器挂载点 {#step-5-create-synapse-container-mount}

在 RouterOS 设备上创建挂载点，以持久化 Synapse 数据：

```routeros
/container/mounts/add list=synapse_data src=disk1/synapse-data dst=/data
```

---

## Step 6: 生成初始 Synapse 配置 {#step-6-generate-initial-synapse-configuration}

创建并运行 Synapse 容器，以生成所需的配置文件。该容器使用 `generate` 命令运行，以创建初始配置：

```routeros
/container/add remote-image=matrixdotorg/synapse:latest interface=veth1 cmd="generate" root-dir=disk1/synapse mountlists=synapse_data envlists=synapse_envs name=synapse
```

---

## Step 7: 初始化配置文件 {#step-7-initialize-configuration-files}

启动然后停止 Synapse 容器，使其生成必要的配置文件：

```routeros
/container/start [find where name=synapse]
/container/stop [find where name=synapse]
```

---

## Step 8: 移除 Generate 命令 {#step-8-remove-the-generate-command}

清除 Synapse 容器中的 command 参数，使其以正常模式运行：

```routeros
/container/set [find where name=synapse] cmd=""
```

---

## Step 9: 配置数据库连接 {#step-9-configure-database-connection}

使用 SFTP 客户端（例如 Windows 上的 WinSCP）连接到 RouterOS 设备，并编辑生成的配置文件 `disk1/synapse-data/homeserver.yaml`。使用以下设置更新 database 部分：

```yaml
database:
  name: psycopg2
  args:
    user: synapse_user
    password: <POSTGRES_PASSWORD_HERE>
    dbname: synapse
    host: 172.17.0.2
    port: 5433
    cp_min: 5
    cp_max: 10
    keepalives_idle: 10  # optional
    keepalives_interval: 10  # optional
    keepalives_count: 3     # optional
```

:::info

将 `<POSTGRES_PASSWORD_HERE>` 替换为你在第 1 步中设置的密码。
:::

---

## 第 10 步：启动 PostgreSQL 容器 {#step-10-start-the-postgresql-container}

启动 PostgreSQL 容器以准备数据库：

```routeros
/container/start [find where name=postgresql_synapse]
```

---

## 第 11 步：启动 Synapse 容器 {#step-11-start-the-synapse-container}

启动 Synapse 容器以运行 Matrix 服务器：

```routeros
/container/start [find where name=synapse]
```

---

## 第 12 步：注册 Matrix 用户 {#step-12-register-a-matrix-user}

进入 Synapse 容器的 shell 并注册新用户：

```routeros
/container/shell [find where name=synapse]
```

进入容器后，运行：

```
register_new_matrix_user -c /data/homeserver.yaml
```

按照提示创建管理员用户账户。

---

## 第 13 步：访问 Matrix 服务器 {#step-13-access-your-matrix-server}

Synapse Matrix 服务器现已运行。使用 RouterOS 设备的 IP 地址或域名访问它。

---

:::warning

请始终查阅官方 Synapse 文档，了解最新配置选项和最佳实践，因为配置流程可能会随新版本而变化。
:::

### Discord 桥接 {#discord-bridge}

:::tip

以下示例用于配置 Discord 桥接，但其他类型[桥接](https://matrix.org/ecosystem/bridges/)的配置流程非常相似。请查阅所需[桥接](https://matrix.org/ecosystem/bridges/)的官方文档以获取更多信息。
:::

1. 创建 PostgreSQL Discord bridge Container 环境变量：  

   ```routeros
   /container/envs/add list=postgres_discord_envs key=POSTGRES_DB value="synapse-discord"
   /container/envs/add list=postgres_discord_envs key=POSTGRES_PASSWORD value="<POSTGRE_BRIDGE_PASSWORD_HERE>"
   /container/envs/add list=postgres_discord_envs key=POSTGRES_USER value="synapse_discord"
   /container/envs/add list=postgres_discord_envs key=PGDATA value="/var/lib/postgresql/data/pgdata"
   /container/envs/add list=postgres_discord_envs key=POSTGRES_INITDB_ARGS value="--encoding='UTF8' --lc-collate='C' --lc-ctype='C'"
    /container/envs/add list=postgres_discord_envs key=PGPORT value=5434
   ```

2. 创建 PostgreSQL Discord bridge Container 挂载：  

   ```routeros
   /container/mounts/add list=discord_postgres_data src=disk1/discord-postgres-data dst=/var/lib/postgresql/data
   ```

3. 为 Discord bridge 创建 PostgreSQL Container：  

   ```routeros
   /container/add remote-image=postgres:17.2-alpine interface=veth1 root-dir=disk1/postgres-17.2-discord mountlists=discord_postgres_data envlists=postgres_discord_envs name=postgresql_discord
   ```

4. 按照 [HAProxy](/docs/7.24/containers/user-guides/container-haproxy) Container 指南操作，并为端口 `8080` 设置反向代理
5. 创建 Discord bridge Container 挂载点：  

   ```routeros
   /container/mounts/add list=synapse_discord_data src=disk1/synapse-discord-data dst=/data
   ```

6. 创建 Discord Bridge Container：  

   ```routeros
   /container/add remote-image=litetex/mau.mautrix.discord:latest interface=veth1 root-dir=disk1/synapse-discord mountlists=synapse_discord_data name=synapse_discord
   ```

7. 启动和停止 Discord bridge Container 以生成文件：  

   ```routeros
   /container/start [find where name=synapse_discord]
   /container/stop [find where name=synapse_discord]
   ```

8. 使用 SFTP 客户端连接到 RouterOS 设备（例如，使用 Microsoft Windows 时使用 WinSCP），并调整文件 `disk1/synapse-discord/config.yaml`：  

   ```yaml
    homeserver
        address: http://172.17.0.2:8008
        domain: test.mt.lv
       software: standard
       async_media: true
       
   appservice
       address: leave default
       hostname: leave default
       port: leave default
       database:
           type: postgres
           uri: postgres://synapse_discord:<POSTGRE_DISCORD_PASSWORD_HERE>@172.17.0.2:5434/synapse-discord?sslmode=disable
   bridge:
       encryption:
           allow: true
       permissions:
           "*": relay
           "@your_admin_user1:test.mt.lv": admin
           "@your_admin_user2:test.mt.lv": admin
   ```

9. 再次启动和停止 Discord bridge Container：  

   ```routeros
   /container/start [find where name=synapse_discord]
   /container/stop [find where name=synapse_discord]
   ```

10. 下载文件 `disk1/synapse-discord/registration.yaml`，并将其上传为文件 `disk1/synapse-data/mautrix-discord-registration.yaml`
11. 使用 SFTP 客户端连接到 RouterOS 设备（例如，使用 Microsoft Windows 时使用 WinSCP），并将以下行添加到 `disk1/synapse-data/homeserver.yaml`：  

     ```yaml
     ...
     app_service_config_files:
     - /data/mautrix-discord-registration.yaml
     ```

12. 启动 Synapse 和 Discord bridge 容器：  

     ```routeros
    /container/start [find where name=postgresql_discord]
    /container/start [find where name=synapse_discord]
    /container/start [find where name=postgresql_synapse]
    /container/start [find where name=synapse]
    ```

13. Matrix 服务器现在应有一个名为“Discord bridge bot”的新用户。按照官方文档创建桥接房间。
