---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/traffic-flow/netflow-analysis-with-elasticsearch"
sidebar_position: 1
title: "使用 Elasticsearch 进行 NetFlow 分析"
sidebar_label: "使用 Elasticsearch 进行 NetFlow 分析"
description: "本指南介绍如何在 MikroTik RouterOS 上使用 Elasticsearch 设置 NetFlow 分析，包括配置从 RouterOS 设备到 Elasticsearch 服务器的数据采集，以及集成 Kibana 和部署 Fleet Server，从而实现高效的 NetFlow 数据处理与可视化。"
tags:
  - 'elasticsearch'
  - 'netflow'
  - 'kibana'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/traffic-flow/netflow-analysis-with-elasticsearch
captured_at: '2026-11-04T11:15:37+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Elasticsearch 是一个流行的 NoSQL 数据库，可用于存储各种数据，包括 NetFlow 日志。结合 Kibana，你可以创建一个强大的工具来分析 RouterOS 设备的 NetFlow 数据。本指南将依赖 Elasticsearch 集成，要使其正常工作，你需要有一个可正常运行的 Elasticsearch 环境。本指南不会涵盖 Elasticsearch 和 Kibana 的设置说明，但会涵盖设置 NetFlow 日志收集与分析的相关步骤。

使用 Elasticsearch 可以进行多种配置，但本指南将采用以下原则：

- RouterOS（10.0.0.1）设备将 NetFlow 数据发送到运行 [NetFlow 集成](https://www.elastic.co/docs/current/integrations/netflow) 的服务器（10.0.0.2）。
- 运行 NetFlow 集成的服务器（10.0.0.2）接收 NetFlow 数据，处理数据并将其发送到 [Fleet Server](https://www.elastic.co/guide/en/fleet/current/fleet-server.html)（10.0.0.3）。
- Fleet Server（10.0.0.3）将数据存储在 [Elasticsearch](https://www.elastic.co/elasticsearch)（10.0.0.4）中。
- [Kibana](https://www.elastic.co/kibana)（10.0.0.5）从 Elasticsearch（10.0.0.4）检索数据，对其进行分析，并允许你搜索数据。

![](/img/d8cffdddf4e03b62.webp)

:::info
本指南不会将 [Logstash](https://www.elastic.co/logstash) 用作分析 NetFlow 数据的一部分；它已被 Fleet Server 取代。

**重要：** 可以将 Elasticsearch、Kibana、Fleet Server 和 NetFlow Records 集成安装在同一设备上。
:::

## 先决条件 {#prerequisites}

- [设置 Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup.html)  
  :::info
  Elasticsearch 在许多平台上受到广泛支持。建议设置一个 Elasticsearch 节点集群。
  :::
- [设置 Kibana](https://www.elastic.co/guide/en/kibana/current/setup.html)  
  :::info
  Kibana 可以安装在你安装 Elasticsearch 的同一设备上，但出于性能原因，也可以安装在单独的设备上。虽然不借助 Kibana 也可以分析 NetFlow 数据，但这需要编写你自己的 API 请求。Kibana 非常易于使用，并且功能广泛。
  :::
- [设置 Fleet Server](https://www.elastic.co/guide/en/fleet/current/add-fleet-server-on-prem.html)  
  :::info
  可以在安装了 Elasticsearch 和/或 Kibana 的同一设备上设置 Fleet Server。建议将 Fleet Server 安装在其他设备上。有关硬件和拓扑要求的建议，请参阅 Elasticsearch 手册。
  :::

## 设置 {#setup}

设置说明分为两部分：Elastic（有关 Elasticsearch、Kibana 和 Fleet Server 的配置）和 RouterOS（与您的 RouterOS 设备相关的配置）。

### Elastic {#elastic}

:::warning
某些步骤可能会随时间而变化，请参阅 Elastic 的手册以获取最新步骤。
:::

1. [登录你的 Kibana](https://www.elastic.co/guide/en/kibana/current/access.html)
2. 在主菜单下打开 [Fleet](https://www.elastic.co/guide/en/kibana/current/fleet.html) 部分
3. 打开“[代理策略](https://www.elastic.co/guide/en/fleet/current/agent-policy.html)”部分
4. 按下“创建代理策略”按钮以[创建新的代理策略](https://www.elastic.co/guide/en/fleet/current/agent-policy.html#create-a-policy)
5. 为策略命名，例如“NetFlow 策略”，根据需要调整高级设置，然后创建策略
6. 单击其名称以打开你新建的策略
7. 按下“[添加集成](https://www.elastic.co/guide/en/fleet/current/agent-policy.html#add-integration)”
8. 搜索“[NetFlow Records](https://www.elastic.co/docs/current/integrations/netflow)”并按下“添加 NetFlow Records”
9. 调整配置，确保：  
   - 将“UDP host to listen on”设置为将运行 NetFlow Records 集成的服务器的 IP 地址；在此示例中，该地址应为“10.0.0.2”
10. 保存集成
11. 按下“[将 Elastic Agent 添加到你的主机](https://www.elastic.co/guide/en/fleet/current/elastic-agent-installation.html)”按钮
12. 按照说明将 Elastic Agent 添加到你的主机  
    :::info
  Elastic 官方手册建议将 Elastic Agent 安装为 Fleet 管理。建议遵循该建议，因为当代理由 Fleet 管理时，管理代理会更容易。
  :::
13. 确保你已在主机上以及从 RouterOS 设备（10.0.0.1）到该主机的路径上的其他位置打开 NetFlow 端口。默认目标端口是 2055/UDP。
14. 你的 Elastic Agent 现在已准备好接收 NetFlow 数据！

### RouterOS {#routeros}

1. （可选）创建一个[接口列表](../../cli-reference/interface/list/index.md)（例如“NetFlow\_interfaces”），并添加需要进行 NetFlow 数据分析的接口。  

   ```routeros
   /interface/list
   add name=NetFlow_interfaces
   /interface/list/member
   add interface=VLAN3000 list=NetFlow_interfaces
   ```

2. 配置 [流量监控](./index.md) 以将 NetFlow 数据发送到你的 Elastic Agent（10.0.0.2）。  

   ```routeros
   /ip/traffic-flow
   set enabled=yes interfaces=NetFlow_interfaces
   /ip/traffic-flow/target
   add dst-address=10.0.0.2
   ```

3. 你现在应该开始看到 NetFlow 数据被接收！
4. 继续阅读本指南以开始使用 Kibana。

## 使用 Kibana {#using-kibana}

:::warning
某些步骤可能会随时间而变化，请参阅 Elastic 的手册以获取最新步骤。
:::

NetFlow Records 集成提供了一些可用于分析 NetFlow 数据的有用资产。在继续之前，请确保先[安装这些资产](https://www.elastic.co/guide/en/fleet/7.17/install-uninstall-integration-assets.html)。以下部分将介绍一些查看 NetFlow 数据的基本方法。

1. [登录你的 Kibana](https://www.elastic.co/guide/en/kibana/current/access.html)
2. 在主菜单中打开“[仪表板](https://www.elastic.co/kibana/kibana-dashboard)”菜单
3. 搜索仪表板并找到“NetFlow”

你现在应该会看到多个 NetFlow 仪表板。例如，尝试打开“[Logs Netflow] Overview”。如果你的 NetFlow 数据已正确接收，那么你现在应该会看到汇总流量的图表。

另一个有用的仪表板是“[Logs Netflow] Flow records”，它会显示精确的 NetFlow 记录。一个非常有用的功能是过滤选项（顶部的 + 按钮），它允许你向 NetFlow 数据添加过滤器；例如，你可以过滤记录以仅显示单个 IP 地址：

![](/img/8bf2a1b59bba05eb.webp)

还有其他选项，例如搜索特定时间范围。你应该进一步阅读有关 [Discover](https://www.elastic.co/guide/en/kibana/current/discover-get-started.html#find-the-data-you-want-to-use) 的内容，以更好地了解这些可能性。

为便于快速参考，以下是你最有可能用于搜索 NetFlow 数据的字段：

- source.ip
- source.port
- destination.ip
- destination.port
- network.transport

如果你想检查单条记录，建议使用 [Discover](https://www.elastic.co/guide/en/kibana/current/discover-get-started.html#find-the-data-you-want-to-use) 视图。NetFlow 数据可通过“data\_stream.dataset: netflow.log”找到。

## 日志保留 {#log-retention}

根据你当地的法律，你可能需要将 NetFlow 数据存储指定的一段时间。请注意，繁忙的网络可能会生成大量 NetFlow 数据，甚至每天数 TB。你很可能需要调整[生命周期策略](https://www.elastic.co/guide/en/elasticsearch/reference/current/set-up-lifecycle-policy.html)。默认情况下，NetFlow 数据应归入“logs”策略。如果你有多个 Elasticsearch 节点，你可以利用“[阶段](https://www.elastic.co/guide/en/elasticsearch/reference/current/ilm-index-lifecycle.html)”，它允许你将数据存储在不同类型的存储介质上；但如果你只有一个 Elasticsearch 节点，你的选择就有限，你很可能会想要[删除](https://www.elastic.co/guide/en/elasticsearch/reference/current/ilm-delete.html)旧数据。例如，如果你想在 6 个月后删除数据，那么你可以简单地更改 ILM 策略以在 6 个月后删除数据，或使用以下 API 请求：

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
如果你更改“logs”策略，这将应用于你的所有日志，而不仅仅是 NetFlow 数据。如果你需要为其他日志设置不同的保留期，那么最好创建一个新的 ILM 策略，并指定 NetFlow 集成使用新创建的 ILM 策略。
:::

### 使用不同的 ILM 策略 {#use-a-different-ilm-policy}

如果你希望 NetFlow 数据具有不同的保留期，那么你需要执行以下步骤：

1. 创建一个新的 ILM 策略，为其指定新名称并设置删除阶段所需的期限，或使用以下 API 请求：  

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

2. 转到 Kibana，打开“堆栈管理”，然后转到“索引管理”，再转到“组件模板”。
3. 搜索“logs-netflow.log@custom”，打开并编辑它。
4. 转到“索引设置”部分。
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

6. 按下“下一步”，然后按下“保存组件模板”。
