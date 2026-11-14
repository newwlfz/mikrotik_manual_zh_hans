---
sidebar_key: "containers/user-guides/container-matrix-synapse"
sidebar_position: 5
title: "容器 - Matrix (Synapse)"
sidebar_label: "容器 - Matrix"
description: "本页面介绍如何在 MikroTik RouterOS 上将 Synapse Matrix 服务器配置为容器，涵盖容器网络配置和 PostgreSQL 环境设置等先决条件，以便在多个平台之间实现安全的联邦通信。"
tags:
  - 'container'
  - 'synapse'
  - 'matrix'
source: https://manual.mikrotik.com/docs/7.25/containers/user-guides/container-matrix-synapse
captured_at: '2026-11-04T11:14:58+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Matrix 是一种去中心化的通信协议。每个 Matrix 服务器独立运行，维护自己的用户集合，并定义自己的规则和策略。

### 托管自己的 Matrix 服务器 {#hosting-your-own-matrix-server}

你可以使用容器直接在 RouterOS 设备上托管自己的 Matrix 服务器。这让你能够完全控制自己的通信基础设施。

### 联邦 {#federation}

Matrix 服务器可以通过联邦连接，创建统一的通信网络。这使不同 Matrix 服务器上的用户能够安全地相互通信，而无需中央权威机构。

### 桥接到其他平台 {#bridging-to-other-platforms}

Matrix 支持通过桥接中继来自其他聊天平台的消息，包括：

- WhatsApp
- Discord
- Signal
- Telegram
- 以及许多其他平台

通过使用 Matrix 桥接，你可以将多个平台的通信整合到一个应用程序中，例如 [Element](https://element.io/)。这让你能够通过一个统一的界面与不同平台的用户通信。

# 在 RouterOS 上设置 Synapse Matrix 服务器 {#setting-up-a-synapse-matrix-server-on-routeros}

本指南说明如何使用容器在你的 MikroTik RouterOS 设备上设置 Synapse，它是可用的几种 Matrix 服务器之一。

:::info

继续操作之前，请确保你已经创建了容器网络。有关说明，请参阅[容器网络文档](../index.md#networking-examples)。

:::

---

## 先决条件 {#prerequisites}

- 一台支持容器的 RouterOS 设备
- 已配置现有容器网络
- 有足够的存储空间用于数据库和 Synapse 数据

---

## 步骤 1：创建 PostgreSQL 容器环境变量 {#step-1-create-postgresql-container-environment-variables}

为 PostgreSQL 容器配置环境变量列表：

```routeros
/container/envs/add list=postgres_synapse_envs key=POSTGRES_DB value="synapse"
/container/envs/add list=postgres_synapse_envs key=POSTGRES_PASSWORD value="<POSTGRES_PASSWORD_HERE>"
/container/envs/add list=postgres_synapse_envs key=POSTGRES_USER value="synapse_user"
/container/envs/add list=postgres_synapse_envs key=PGDATA value="/var/lib/postgresql/data/pgdata"
/container/envs/add list=postgres_synapse_envs key=POSTGRES_INITDB_ARGS value="--encoding='UTF8' --lc-collate='C' --lc-ctype='C'"
/container/envs/add list=postgres_synapse_envs key=PGPORT value=5433
```

:::note

将 `<POSTGRES_PASSWORD_HERE>` 替换为你所需的 PostgreSQL 密码。

:::

---

## 步骤 2：创建 PostgreSQL 容器挂载 {#step-2-create-postgresql-container-mount}

创建挂载点，以便在 RouterOS 设备上持久保存 PostgreSQL 数据：

```routeros
/container/mounts/add list=synapse_postgres_data src=disk1/synapse-postgres-data dst=/var/lib/postgresql/data
```

---

## 步骤 3：创建 PostgreSQL 容器 {#step-3-create-the-postgresql-container}

使用前面步骤中的配置启动 PostgreSQL 容器：

```routeros
/container/add remote-image=postgres:17.2-alpine interface=veth1 root-dir=disk1/postgres-17.2-synapse mountlists=synapse_postgres_data envlists=postgres_synapse_envs name=postgresql_synapse
```

---

## 步骤 4：创建 Synapse 容器环境变量 {#step-4-create-synapse-container-environment-variables}

为 Synapse 容器配置环境变量：

```routeros
/container/envs/add list=synapse_envs key=SYNAPSE_CONFIG_DIR value="/data"
/container/envs/add list=synapse_envs key=SYNAPSE_CONFIG_PATH value="/data/homeserver.yaml"
/container/envs/add list=synapse_envs key=SYNAPSE_SERVER_NAME value="test.mt.lv"
/container/envs/add list=synapse_envs key=SYNAPSE_REPORT_STATS value="yes"
```

:::note

将 `test.mt.lv` 替换为你实际的服务器域名。

:::

---

## 步骤 5：创建 Synapse 容器挂载 {#step-5-create-synapse-container-mount}

创建挂载点，以便在 RouterOS 设备上持久保存 Synapse 数据：

```routeros
/container/mounts/add list=synapse_data src=disk1/synapse-data dst=/data
```

---

## 步骤 6：生成初始 Synapse 配置 {#step-6-generate-initial-synapse-configuration}

创建并运行 Synapse 容器，以生成所需的配置文件。该容器使用 `generate` 命令运行，以创建初始配置：

```routeros
/container/add remote-image=matrixdotorg/synapse:latest interface=veth1 cmd="generate" root-dir=disk1/synapse mountlists=synapse_data envlists=synapse_envs name=synapse
```

---

## 步骤 7：初始化配置文件 {#step-7-initialize-configuration-files}

启动然后停止 Synapse 容器，使其能够生成必要的配置文件：

```routeros
/container/start [find where name=synapse]
/container/stop [find where name=synapse]
```

---

## 步骤 8：移除 generate 命令 {#step-8-remove-the-generate-command}

清除 Synapse 容器中的命令参数，使其以正常模式运行：

```routeros
/container/set [find where name=synapse] cmd=""
```

---

## 步骤 9：配置数据库连接 {#step-9-configure-database-connection}

使用 SFTP 客户端（例如 Windows 上的 WinSCP）连接到你的 RouterOS 设备，并编辑 `disk1/synapse-data/homeserver.yaml` 中生成的配置文件。使用以下设置更新数据库部分：

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

将 `<POSTGRES_PASSWORD_HERE>` 替换为你在步骤 1 中设置的密码。

:::

---

## 步骤 10：启动 PostgreSQL 容器 {#step-10-start-the-postgresql-container}

启动 PostgreSQL 容器以准备数据库：

```routeros
/container/start [find where name=postgresql_synapse]
```

---

## 步骤 11：启动 Synapse 容器 {#step-11-start-the-synapse-container}

启动 Synapse 容器以运行你的 Matrix 服务器：

```routeros
/container/start [find where name=synapse]
```

---

## 步骤 12：注册 Matrix 用户 {#step-12-register-a-matrix-user}

进入 Synapse 容器的 shell 并注册新用户：

```routeros
/container/shell [find where name=synapse]
```

进入容器后，运行：

```
register_new_matrix_user -c /data/homeserver.yaml
```

按照提示创建你的管理员用户账户。

---

## 步骤 13：访问你的 Matrix 服务器 {#step-13-access-your-matrix-server}

你的 Synapse Matrix 服务器现在正在运行。使用你的 RouterOS 设备的 IP 地址或域名访问它。

---

:::warning

请始终查阅官方 Synapse 文档，以获取最新的配置选项和最佳实践，因为配置流程可能会随着新版本而变化。

:::

### Discord 桥接 {#discord-bridge}

:::tip

下面的示例用于配置 Discord 桥接，但其他类型[桥接](https://matrix.org/ecosystem/bridges/)的流程非常相似。请查看你所需[桥接](https://matrix.org/ecosystem/bridges/)的官方文档以获取更多信息。

:::

1. 创建 PostgreSQL Discord 桥接容器环境变量：  

   ```routeros
   /container/envs/add list=postgres_discord_envs key=POSTGRES_DB value="synapse-discord"
   /container/envs/add list=postgres_discord_envs key=POSTGRES_PASSWORD value="<POSTGRE_BRIDGE_PASSWORD_HERE>"
   /container/envs/add list=postgres_discord_envs key=POSTGRES_USER value="synapse_discord"
   /container/envs/add list=postgres_discord_envs key=PGDATA value="/var/lib/postgresql/data/pgdata"
   /container/envs/add list=postgres_discord_envs key=POSTGRES_INITDB_ARGS value="--encoding='UTF8' --lc-collate='C' --lc-ctype='C'"
    /container/envs/add list=postgres_discord_envs key=PGPORT value=5434
   ```

2. 创建 PostgreSQL Discord 桥接容器挂载：  

   ```routeros
   /container/mounts/add list=discord_postgres_data src=disk1/discord-postgres-data dst=/var/lib/postgresql/data
   ```

3. 为 Discord 桥接创建 PostgreSQL 容器：  

   ```routeros
   /container/add remote-image=postgres:17.2-alpine interface=veth1 root-dir=disk1/postgres-17.2-discord mountlists=discord_postgres_data envlists=postgres_discord_envs name=postgresql_discord
   ```

4. 按照 [容器 - HAProxy](./container-haproxy.md) 容器指南操作，并为端口 `8080` 设置反向代理
5. 创建 Discord 桥接容器挂载点：  

   ```routeros
   /container/mounts/add list=synapse_discord_data src=disk1/synapse-discord-data dst=/data
   ```

6. 创建 Discord 桥接容器：  

   ```routeros
   /container/add remote-image=litetex/mau.mautrix.discord:latest interface=veth1 root-dir=disk1/synapse-discord mountlists=synapse_discord_data name=synapse_discord
   ```

7. 启动并停止 Discord 桥接容器以生成文件：  

   ```routeros
   /container/start [find where name=synapse_discord]
   /container/stop [find where name=synapse_discord]
   ```

8. 使用 SFTP 客户端（例如使用 Microsoft Windows 时的 WinSCP）连接到你的 RouterOS 设备，并调整文件 `disk1/synapse-discord/config.yaml`：  

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

9. 再次启动并停止 Discord 桥接容器：  

   ```routeros
   /container/start [find where name=synapse_discord]
   /container/stop [find where name=synapse_discord]
   ```

10. 下载文件 `disk1/synapse-discord/registration.yaml`，并将其作为文件 `disk1/synapse-data/mautrix-discord-registration.yaml` 上传
11. 使用 SFTP 客户端（例如使用 Microsoft Windows 时的 WinSCP）连接到你的 RouterOS 设备，并将以下行添加到 `disk1/synapse-data/homeserver.yaml`：  

     ```yaml
     ...
     app_service_config_files:
     - /data/mautrix-discord-registration.yaml
     ```

12. 启动 Synapse 和 Discord 桥接容器：  

     ```routeros
    /container/start [find where name=postgresql_discord]
    /container/start [find where name=synapse_discord]
    /container/start [find where name=postgresql_synapse]
    /container/start [find where name=synapse]
    ```

13. 你的 Matrix 服务器现在应该有一个名为 "Discord bridge bot" 的新用户。请按照官方文档创建桥接房间。
