---
title: "使用 Elasticsearch 进行 NetFlow 分析"
description: "本指南介绍如何通过配置从 RouterOS 设备向 Elasticsearch 服务器收集数据，在 MikroTik RouterOS 上设置基于 Elasticsearch 的 NetFlow 分析，包括 Kibana 集成和 Fleet Server 部署，以实现高效的 NetFlow 数据处理和可视化。"
tags:
  - 'elasticsearch'
  - 'netflow'
  - 'kibana'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/traffic-flow/netflow-analysis-with-elasticsearch
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "diagnostics-monitoring-and-troubleshooting/traffic-flow"
pagination_next: "hardware"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Elasticsearch 是一种流行的 NoSQL 数据库，可用于存储各种数据，包括 NetFlow 日志。结合 Kibana，你可以创建一个强大的工具，用于分析 RouterOS 设备中的 NetFlow 数据。本指南依赖 Elasticsearch 集成，要使其正常工作，你需要有一个可用的 Elasticsearch 环境。本指南不介绍 Elasticsearch 和 Kibana 的安装说明，但会介绍设置 NetFlow 日志收集和分析的相关步骤。

Elasticsearch 可以有许多可能的配置，但为了便于说明，本指南将使用以下原则：

- RouterOS 设备（10.0.0.1）将 NetFlow 数据发送到运行 [NetFlow integration](https://www.elastic.co/docs/current/integrations/netflow) 的服务器（10.0.0.2）。
- 运行 NetFlow integration 的服务器（10.0.0.2）接收 NetFlow 数据，处理数据并将其发送到 [Fleet Server](https://www.elastic.co/guide/en/fleet/current/fleet-server.html)（10.0.0.3）。
- Fleet Server（10.0.0.3）将数据存储到 [Elasticsearch](https://www.elastic.co/elasticsearch)（10.0.0.4）中。
- [Kibana](https://www.elastic.co/kibana)（10.0.0.5）从 Elasticsearch（10.0.0.4）检索数据，对其进行分析，并允许你搜索数据。

![](/img/d8cffdddf4e03b62.webp)

:::info
本指南在分析 NetFlow 数据时不会使用 [Logstash](https://www.elastic.co/logstash)；它已由 Fleet Server 取代。

**重要：** 可以将 Elasticsearch、Kibana、Fleet Server 和 NetFlow Records integration 安装在同一台设备上。
:::

## 前提条件 {#prerequisites}

- [Setup Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup.html)  
  :::info
  Elasticsearch 受到许多平台的广泛支持。建议设置由多个 Elasticsearch 节点组成的集群。
  :::
- [Setup kibana](https://www.elastic.co/guide/en/kibana/current/setup.html)  
  :::info
  Kibana 可以安装在安装 Elasticsearch 的同一台设备上，也可以出于性能原因安装在单独的设备上。虽然可以在没有 Kibana 的情况下分析 NetFlow 数据，但这需要编写自己的 API 请求。Kibana 非常易于使用，并且具有广泛的功能。
  :::
- [Setup Fleet Server](https://www.elastic.co/guide/en/fleet/current/add-fleet-server-on-prem.html)  
  :::info
  可以将 Fleet Server 设置在安装 Elasticsearch 和/或 Kibana 的同一台设备上。建议将 Fleet Server 安装在另一台设备上。有关硬件和拓扑要求的建议，请参阅 Elasticsearch 手册。
  :::

## 设置 {#setup}

设置说明分为两部分：Elastic（有关 Elasticsearch、Kibana 和 Fleet Server 的配置）和 RouterOS（与 RouterOS 设备相关的配置）。

### Elastic

:::warning
某些步骤可能会随时间变化，请参阅 Elastic 手册以获取最新步骤。
:::

1. [登录 Kibana](https://www.elastic.co/guide/en/kibana/current/access.html)
2. 打开主菜单下的 [Fleet](https://www.elastic.co/guide/en/kibana/current/fleet.html) 部分
3. 打开“[Agent policies](https://www.elastic.co/guide/en/fleet/current/agent-policy.html)”部分
4. 按“Create agent policy”按钮以[创建新的 Agent Policy](https://www.elastic.co/guide/en/fleet/current/agent-policy.html#create-a-policy)
5. 为策略指定名称，例如“NetFlow policy”，根据需要调整高级设置，然后创建策略
6. 点击名称打开新创建的策略
7. 按“[Add integration](https://www.elastic.co/guide/en/fleet/current/agent-policy.html#add-integration)”
8. 搜索“[NetFlow Records](https://www.elastic.co/docs/current/integrations/netflow)”并按“Add NetFlow Records”
9. 调整配置，确保：  
   - 将“UDP host to listen on”设置为将运行 NetFlow Records 集成的服务器 IP 地址，本示例中该地址应为“10.0.0.2”
10. 保存集成
11. 按“[Add Elastic Agent to your host](https://www.elastic.co/guide/en/fleet/current/elastic-agent-installation.html)”按钮
12. 按照说明将 Elastic Agent 添加到主机  
    :::info
    Elastic 官方手册建议将 Elastic Agent 安装为 Fleet-managed。建议遵循该建议，因为采用 Fleet-managed 时管理代理更容易。
    :::
13. 确保已在主机以及从 RouterOS 设备（10.0.0.1）到该主机的路径中的其他位置打开 NetFlow 端口。默认目标端口为 2055/UDP。
14. Elastic Agent 现已准备好接收 NetFlow 数据！

### RouterOS

1. （可选）创建 [Interface list](/docs/system-information-and-utilities/interface-lists)（例如“NetFlow\_interfaces”），并添加需要进行 NetFlow 数据分析的接口。  

   ```routeros
   /interface/list
   add name=NetFlow_interfaces
   /interface/list/member
   add interface=VLAN3000 list=NetFlow_interfaces
   ```

2. 配置 [Traffic-flow](/docs/diagnostics-monitoring-and-troubleshooting/traffic-flow/netflow-analysis-with-elasticsearch)，以将 NetFlow 数据发送到 Elastic Agent（10.0.0.2）。  

   ```routeros
   /ip/traffic-flow
   set enabled=yes interfaces=NetFlow_interfaces
   /ip/traffic-flow/target
   add dst-address=10.0.0.2
   ```

3. 现在应开始看到 NetFlow 数据被接收！
4. 继续阅读指南，开始使用 Kibana。

## 使用 Kibana {#using-kibana}

:::warning
某些步骤可能会随时间变化，请参阅 Elastic 手册以获取最新步骤。
:::

NetFlow Records 集成提供了一些可用于分析 NetFlow 数据的实用资产。在继续之前，请确保先[安装资产](https://www.elastic.co/guide/en/fleet/7.17/install-uninstall-integration-assets.html)。以下部分将介绍查看 NetFlow 数据的一些基本方法。

1. [登录 Kibana](https://www.elastic.co/guide/en/kibana/current/access.html)
2. 在主菜单中打开“[Dashboards](https://www.elastic.co/kibana/kibana-dashboard)”菜单
3. 搜索 Dashboards 并找到“NetFlow”

现在应能看到多个 NetFlow Dashboard。例如，尝试打开“[Logs Netflow] Overview”。如果 NetFlow 数据已正确导入，则应看到汇总流量的图表。

另一个有用的 Dashboard 是“[Logs Netflow] Flow records”，它显示精确的 NetFlow 记录。一个非常有用的功能是过滤选项（顶部的 + 按钮），它允许你向 NetFlow 数据添加过滤器。例如，你可以过滤记录以仅显示单个 IP 地址：

![](/img/8bf2a1b59bba05eb.webp)

还有其他选项，例如搜索特定时间范围。应详细阅读 [Discover](https://www.elastic.co/guide/en/kibana/current/discover-get-started.html#find-the-data-you-want-to-use)，以更好地了解可用功能。

为便于快速查阅，以下是搜索 NetFlow 数据时最可能使用的字段：

- source.ip
- source.port
- destination.ip
- destination.port
- network.transport

如果要检查单条记录，建议使用 [Discover](https://www.elastic.co/guide/en/kibana/current/discover-get-started.html#find-the-data-you-want-to-use) 视图。NetFlow 数据可在“data\_stream.dataset: netflow.log”下找到。

## 日志保留 {#log-retention}

根据当地法律，您可能需要将 NetFlow 数据保存指定的一段时间。请注意，繁忙的网络可能会生成大量 NetFlow 数据，甚至每天达到数 TB。您很可能需要调整 [Lifecycle Policy](https://www.elastic.co/guide/en/elasticsearch/reference/current/set-up-lifecycle-policy.html)。默认情况下，NetFlow 数据应归入“logs”策略。如果您有多个 Elasticsearch 节点，可以使用“[phases](https://www.elastic.co/guide/en/elasticsearch/reference/current/ilm-index-lifecycle.html)”，将数据存储在不同类型的存储介质上；但如果只有一个 Elasticsearch 节点，可选方案有限，您很可能需要 [delete](https://www.elastic.co/guide/en/elasticsearch/reference/current/ilm-delete.html) 旧数据。例如，如果要在 6 个月后删除数据，只需将 ILM 策略更改为在 6 个月后删除数据，或使用以下 API 请求：

```json
PUT _ilm/policy/logs
{
  "policy": {
    "phases": {
      "hot": {
        "min_age": "0ms",
        "actions": {
          "rollover": {
            "max_age": "30d",
            "max_primary_shard_size": "50gb"
          },
          "set_priority": {
            "priority": 101
          }
        }
      },
      "delete": {
        "min_age": "180d",
        "actions": {
          "delete": {
            "delete_searchable_snapshot": true
          }
        }
      }
    }
  }
}
```

:::danger
如果更改“logs”策略，该更改将应用于所有日志，而不仅是 NetFlow 数据。如果其他日志需要不同的保留期限，最好创建新的 ILM 策略，并指定 NetFlow integration 使用新建的 ILM 策略。
:::

### 使用其他 ILM 策略 {#use-a-different-ilm-policy}

如果希望 NetFlow 数据采用不同的保留期限，请执行以下步骤：

1. 创建新的 ILM policy，为其指定新名称，并为 delete 阶段设置所需周期，或使用以下 API 请求：  

   ```json
   PUT _ilm/policy/netflow-logs
   {
     "policy": {
       "phases": {
         "hot": {
           "min_age": "0ms",
           "actions": {
             "rollover": {
               "max_age": "30d",
               "max_primary_shard_size": "50gb"
             },
             "set_priority": {
               "priority": 101
             }
           }
         },
         "delete": {
           "min_age": "1000d",
           "actions": {
             "delete": {
               "delete_searchable_snapshot": true
             }
           }
         }
       }
     }
   }
   ```

2. 打开 Kibana，进入“Stack Management”，然后进入“Index Management”，再进入“Component Templates”。
3. 搜索“logs-netflow.log@custom”，打开并编辑它。
4. 进入“Index settings”部分。
5. 粘贴以下内容：  

   ```json
   {
     "index": {
       "lifecycle": {
         "name": "netflow-logs"
       }
     }
   }
   ```

6. 按“Next”，然后按“Save component template”。
