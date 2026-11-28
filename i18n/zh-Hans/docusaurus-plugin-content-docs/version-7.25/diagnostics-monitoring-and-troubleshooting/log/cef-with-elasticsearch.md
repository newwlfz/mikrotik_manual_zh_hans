---
title: "使用 Elasticsearch 的 CEF"
description: "本指南说明如何使用 Elasticsearch、Kibana 和 Fleet Server 为 MikroTik RouterOS 设备配置 CEF 日志收集和分析。内容涵盖前提条件、Elastic 和 RouterOS 组件的设置步骤，包括 agent policy 创建和 CEF 集成配置。"
tags:
  - 'elasticsearch'
  - 'cef-logging'
  - 'kibana'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/log/cef-with-elasticsearch
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "diagnostics-monitoring-and-troubleshooting/log"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 简介 {#introduction}

Elasticsearch 是一种流行的 NoSQL 数据库，可用于存储多种类型的数据，包括 CEF 日志。结合 Kibana，你可以创建一个强大的工具，用于分析 RouterOS 设备中的 CEF 日志。本指南依赖 Elasticsearch 集成，要使其正常工作，你需要具备可用的 Elasticsearch 环境。本指南不介绍 Elasticsearch 和 Kibana 的安装说明，但会介绍设置 CEF 日志收集和分析的相关步骤。

Elasticsearch 可以有许多可能的配置，但为了便于说明，本指南将使用以下原则：

- RouterOS 设备（10.0.0.1）将 CEF 日志发送到运行 [CEF integration](https://www.elastic.co/docs/reference/integrations/cef) 的服务器（10.0.0.2）。
- 运行 CEF integration 的服务器（10.0.0.2）接收 CEF 日志，处理数据并将其发送到 [Fleet Server](https://www.elastic.co/guide/en/fleet/current/fleet-server.html)（10.0.0.3）。
- Fleet Server（10.0.0.3）将数据存储在 [Elasticsearch](https://www.elastic.co/elasticsearch)（10.0.0.4）中。
- [Kibana](https://www.elastic.co/kibana)（10.0.0.5）从 Elasticsearch（10.0.0.4）检索数据，对其进行分析，并允许你搜索数据。

:::info
本指南不会使用 [Logstash](https://www.elastic.co/logstash) 作为分析 CEF 日志的一部分；它已由 Fleet Server 取代。
:::

:::info
可以将 Elasticsearch、Kibana、Fleet Server 和 CEF 日志集成安装在同一台设备上。
:::

## 前提条件 {#prerequisites}

- [Setup Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup.html).  
  :::info
  Elasticsearch 受多种平台广泛支持。建议设置由多个 Elasticsearch 节点组成的集群。
  :::
- [Setup Kibana](https://www.elastic.co/guide/en/kibana/current/setup.html).  
  :::info
  Kibana 可以安装在与 Elasticsearch 相同的设备上，也可以出于性能原因安装在单独的设备上。虽然可以在没有 Kibana 的情况下分析 CEF 日志，但这需要编写自己的 API 请求。Kibana 易于使用，并提供广泛的功能。
  :::
- [Setup Fleet Server](https://www.elastic.co/guide/en/fleet/current/add-fleet-server-on-prem.html).  
  :::info
  Fleet Server 可以安装在与 Elasticsearch 和/或 Kibana 相同的设备上。建议将 Fleet Server 安装在其他设备上。有关硬件和拓扑要求的建议，请参阅 Elasticsearch 手册。
  :::

## 设置 {#setup}

设置说明分为两部分：Elastic（有关 Elasticsearch、Kibana 和 Fleet Server 的配置）和 RouterOS（与 RouterOS 设备相关的配置）。

### Elastic

:::warning
某些步骤可能会随时间变化，请参阅 Elastic 手册以获取最新步骤。
:::

- [登录 Kibana](https://www.elastic.co/guide/en/kibana/current/access.html)。
- 打开主菜单下的 [Fleet](https://www.elastic.co/guide/en/kibana/current/fleet.html) 部分。
- 打开“[Agent policies](https://www.elastic.co/guide/en/fleet/current/agent-policy.html)”部分。
- 按下“Create agent policy”按钮以[创建新的 Agent Policy](https://www.elastic.co/guide/en/fleet/current/agent-policy.html#create-a-policy)。
- 为策略指定名称，例如“CEF policy”，根据需要调整高级设置，并创建策略。也可以使用以下 API 请求：  

  ```text
  POST kbn:/api/fleet/agent_policies
  {
    "name": "CEF policy",
    "description": "",
    "namespace": "default",
    "monitoring_enabled": [
      "logs",
      "metrics"
    ],
    "inactivity_timeout": 1209600,
    "is_protected": false
  }
  ```

- 点击新创建策略的名称以打开该策略。
- 按下“[Add integration](https://www.elastic.co/guide/en/fleet/current/agent-policy.html#add-integration)”按钮。
- 搜索“[Common Event Format (CEF)](https://www.elastic.co/docs/reference/integrations/cef)”并按下“Add Common Event Format (CEF)”。
- 调整配置，确保：  
  - 在“Collect CEF application logs (input: udp)”部分，将“Syslog Host”设置为“0.0.0.0”。  
  - 在“Collect CEF application logs (input: tcp)”部分，将“Syslog Host”设置为“0.0.0.0”。
- 保存集成。
- 按下“[Add Elastic Agent to your host](https://www.elastic.co/guide/en/fleet/current/elastic-agent-installation.html)”按钮。
- 按照说明将 Elastic Agent 添加到主机。  
  :::info
    Elastic 官方手册建议将 Elastic Agent 安装为 Fleet-managed。建议遵循该建议，因为采用 Fleet-managed 时管理代理更容易。
    :::
- 在主菜单中进入“Stack Management”，然后打开“[Ingest Pipelines](https://www.elastic.co/guide/en/elasticsearch/reference/current/ingest.html)”。
- 点击“[Create pipeline](https://www.elastic.co/guide/en/fleet/current/data-streams-pipeline-tutorial.html#data-streams-pipeline-one)”，然后点击“New pipeline”，创建新的 Ingest Pipeline。
- 将“Name”设置为“logs-cef.log@custom”。
- 点击“Import processors”，粘贴以下处理器：  

  ```json
  {
  	"processors": [
  		{
  			"set": {
  			"ignore_empty_value": true,
  			"field": "host.name",
  			"copy_from": "cef.extensions.deviceHostName"
  			}
  		},
  		{
  			"set": {
  			"ignore_empty_value": true,
  			"field": "host.ip",
  			"copy_from": "cef.extensions.deviceAddress"
  			}
  		}
  	]
  }
  ```

  :::info
  “logs-cef.log@custom”管道不是必需的，但当你还使用 Elasticsearch 存储其他类型的日志时，它可以让日志搜索更方便。
  :::
- 点击“Save pipeline”。
- 确保已在主机以及从 RouterOS 设备（10.0.0.1）到该主机的路径上的其他位置开放 9003/UDP 端口。
- 你的 Elastic Agent 现在已准备好接收 CEF 日志。

### RouterOS

1. 在 RouterOS 设备（10.0.0.1）上配置一个 [remote logging action](/docs/diagnostics-monitoring-and-troubleshooting/log#send-the-log-to-a-syslog-server)：

   ```ros
   /system/logging/action
   add cef-event-delimiter="\n" name=syslog remote=10.0.0.2 \
       remote-log-format=cef remote-port=9003 \
       syslog-time-format=iso8601 target=remote
   ```

2. 为希望从 RouterOS 设备（10.0.0.1）接收的每个 [topics](/docs/diagnostics-monitoring-and-troubleshooting/log#topics) 添加一条规则，例如：

   ```ros
   /system/logging
   add action=syslog topics=info
   add action=syslog topics=error
   add action=syslog topics=critical
   add action=syslog topics=warning
   add action=syslog topics=bridge,stp
   ```

3. 现在应开始看到 CEF 日志被摄取。
4. 继续阅读指南，开始使用 Kibana。

### 使用 Kibana {#using-kibana}

Kibana 允许你搜索已摄取的 CEF 日志。要查看已摄取的日志，请执行以下操作：

1. [登录 Kibana](https://www.elastic.co/guide/en/kibana/current/access.html)。
2. 从主菜单打开“Discover”。
3. [添加过滤器](https://www.elastic.co/guide/en/kibana/current/discover-get-started.html#explore-fields-in-your-data)，并使用以下参数：  

   ```text
   Select a field: data_stream.dataset
   Select operator: IS
   Select a value: cef.log
   ```

4. 为简化操作，建议在 Discover 菜单中[搜索字段](https://www.elastic.co/guide/en/kibana/current/discover-get-started.html#explore-fields-in-your-data)，搜索“message”，然后将该字段添加到视图中。
5. 还建议搜索“host.name”字段，并将其添加到视图中。
6. 可考虑[保存搜索](https://www.elastic.co/guide/en/kibana/current/save-open-search.html#_save_a_search)，以便日后快速访问。
7. 完成！
