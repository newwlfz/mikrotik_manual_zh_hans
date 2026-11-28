---
title: "使用 Elasticsearch 的 Syslog"
description: "本指南说明如何使用 Elasticsearch、Kibana 和 Fleet Server 配置 MikroTik RouterOS 设备的 Syslog 数据收集和分析。内容涵盖前提条件、Elastic 和 RouterOS 组件的设置步骤，包括 agent policy 创建和 Custom UDP logs 集成配置。"
tags:
  - 'syslog'
  - 'elasticsearch'
  - 'kibana'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/log/syslog-with-elasticsearch
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "diagnostics-monitoring-and-troubleshooting/traffic-flow"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 简介 {#introduction}

Elasticsearch 是一种流行的 NoSQL 数据库，可用于存储各种数据，包括 Syslog 数据。结合 Kibana，你可以创建一个强大的工具，用于分析 RouterOS 设备中的 Syslog 数据。本指南依赖 Elasticsearch 集成，要使其正常工作，你需要有一个可用的 Elasticsearch 环境。本指南不介绍 Elasticsearch 和 Kibana 的安装说明，但会介绍设置 Syslog 数据收集和分析的相关步骤。

Elasticsearch 可以有许多可能的配置，但为了便于说明，本指南将使用以下原则：

- RouterOS 设备（10.0.0.1）将 Syslog 数据发送到运行 [Custom UDP logs](https://www.elastic.co/docs/current/integrations/udp) 的服务器（10.0.0.2）。
- 运行 Custom UDP logs 集成的服务器（10.0.0.2）接收 Syslog 数据，处理数据并将其发送到 [Fleet Server](https://www.elastic.co/guide/en/fleet/current/fleet-server.html)（10.0.0.3）。
- Fleet Server（10.0.0.3）将数据存储在 [Elasticsearch](https://www.elastic.co/elasticsearch)（10.0.0.4）中。
- [Kibana](https://www.elastic.co/kibana)（10.0.0.5）从 Elasticsearch（10.0.0.4）检索数据，对其进行分析，并允许你搜索数据。

:::info
本指南在分析 Syslog 数据时不会使用 [Logstash](https://www.elastic.co/logstash)；它已由 Fleet Server 取代。
:::

:::info
可以将 Elasticsearch、Kibana、Fleet Server 和 Custom UDP logs 集成安装在同一台设备上。
:::

## 前提条件 {#prerequisites}

- [Set up Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup.html).  
  :::info
  Elasticsearch 受多种平台广泛支持。建议设置由多个 Elasticsearch 节点组成的集群。
  :::
- [Set up Kibana](https://www.elastic.co/guide/en/kibana/current/setup.html).  
  :::info
  Kibana 可以安装在与 Elasticsearch 相同的设备上，也可以出于性能原因安装在单独的设备上。虽然可以在不使用 Kibana 的情况下分析 Syslog 数据，但这需要编写自己的 API 请求，而 Kibana 易于使用且具有广泛的功能。
  :::
- [Setup Fleet Server](https://www.elastic.co/guide/en/fleet/current/add-fleet-server-on-prem.html).  
  :::info
  Fleet Server 可以安装在与 Elasticsearch 和/或 Kibana 相同的设备上。建议将 Fleet Server 安装在其他设备上。有关硬件和拓扑要求的建议，请参阅 Elasticsearch 手册。
  :::

## 设置 {#setup}

设置说明分为两部分：Elastic（有关 Elasticsearch、Kibana 和 Fleet Server 的配置）和 RouterOS（与 RouterOS 设备相关的配置）。

### Elastic

:::warning
某些步骤可能会随时间变化。请参阅 Elastic 手册以获取最新步骤。
:::

1. [登录 Kibana](https://www.elastic.co/guide/en/kibana/current/access.html)。
2. 打开主菜单下的 [Fleet](https://www.elastic.co/guide/en/kibana/current/fleet.html) 部分。
3. 打开“[Agent policies](https://www.elastic.co/guide/en/fleet/current/agent-policy.html)”部分。
4. 按下“Create agent policy”按钮以[创建新的 Agent Policy](https://www.elastic.co/guide/en/fleet/current/agent-policy.html#create-a-policy)。
5. 为策略指定名称，例如“Syslog policy”，根据需要调整高级设置，然后创建策略。也可以使用以下 API 请求：  

   ```text
   POST kbn:/api/fleet/agent_policies
   {
     "name": "Syslog policy",
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

6. 点击新创建策略的名称以打开该策略。
7. 按下“[Add integration](https://www.elastic.co/guide/en/fleet/current/agent-policy.html#add-integration)”。
8. 搜索“[Custom UDP logs](https://www.elastic.co/docs/current/integrations/udp)”并按下“Add Custom UDP logs”。
9. 调整配置，并确保：  
   - 将“Listen Address”设置为将运行 Custom UDP logs 集成的服务器 IP 地址，在本示例中该地址应为“10.0.0.2”。  
   - 将“Listen Port”设置为“5514”。  
   - 将“Dataset name”设置为“routeros”。  
   - 将“Ingest Pipeline”设置为“logs-routeros@custom”。  
   - 将“Syslog Parsing”设置为“Yes”。
10. 保存集成。
11. 按下“[Add Elastic Agent to your host](https://www.elastic.co/guide/en/fleet/current/elastic-agent-installation.html)”按钮。
12. 按照说明将 Elastic Agent 添加到主机。  
    :::info
    Elastic 官方手册建议将 Elastic Agent 安装为 Fleet-managed。建议遵循该建议，因为采用 Fleet-managed 时管理代理更加容易。
    :::
13. 在主菜单中进入“Stack Management”，然后打开“[Ingest Pipelines](https://www.elastic.co/guide/en/elasticsearch/reference/current/ingest.html)”。
14. 依次点击“[Create pipeline](https://www.elastic.co/guide/en/fleet/current/data-streams-pipeline-tutorial.html#data-streams-pipeline-one)”和“New pipeline”，创建新的 Ingest Pipeline。
15. 将“Name”设置为“logs-routeros@custom”。
16. 点击“Import processors”，粘贴以下处理器：  

    ```json
    {
    	"processors": [
    		{
    			"grok": {
    			"field": "message",
    			"patterns": [
    				"^first L2TP UDP packet received from %{IP:source.ip}$",
    				"^login failure for user %{USERNAME:user.name} from %{IP:source.ip} via %{DATA:service.name}$",
    				"^%{USERNAME:user.name} logged in, %{IP:client.ip} from %{IP:source.ip}$",
    				"^dhcp alert on %{DATA}: discovered unknown dhcp server, mac %{MAC:source.mac}, ip %{IP:source.ip}$",
    				"in:%{DATA} out:%{DATA}, ?(connection-state:%{DATA},|)?(src-mac %{MAC:source.mac},|) proto %{DATA:network.transport} \\(%{DATA}\\), %{IP:source.ip}:?(%{INT:source.port}|)->%{IP:destination.ip}:?(%{INT:destination.port}|), len %{INT:network.bytes}$",
    				"in:%{DATA} out:%{DATA}, ?(connection-state:%{DATA},|)?(src-mac %{MAC:source.mac},|) proto %{DATA:network.transport}, %{IP:source.ip}:?(%{INT:source.port}|)->%{IP:destination.ip}:?(%{INT:destination.port}|), len %{INT:network.bytes}$",
    				"^%{DATA:network.name} (deassigned|assigned) %{IP:client.ip} for %{MAC:client.mac} %{DATA}$",
    				"^%{DATA:user.name} logged out, %{INT:event.duration} %{INT} %{INT} %{INT} %{INT} from %{IP:client.ip}$",
    				"^user %{DATA:user.name} logged out from %{IP:source.ip} via %{DATA:service.name}$",
    				"^user %{DATA:user.name} logged in from %{IP:source.ip} via %{DATA:service.name}$",
    				"^%{DATA:network.name} client %{MAC:client.mac} declines IP address %{IP:client.ip}$",
    				"^%{DATA:network.name} link up \\(speed %{DATA}\\)$",
    				"^%{DATA:network.name} link down$",
    				"^user %{DATA:user.name} authentication failed$",
    				"^%{DATA:network.name} fcs error on link$",
    				"^phase1 negotiation failed due to time up %{IP:source.ip}\\[%{INT:source.port}\\]<=>%{IP:destination.ip}\\[%{INT:destination.port}\\] %{DATA}:%{DATA}$",
    				"^%{DATA:network.name} (learning|forwarding)$",
    				"^user %{DATA:user.name} is already active$",
    				"^%{GREEDYDATA}$"
    			]
    			}
    		},
    		{
    			"lowercase": {
    			"field": "network.transport",
    			"ignore_missing": true
    			}
    		},
    		{
    			"append": {
    			"ignore_failure": true,
    			"field": "event.category",
    			"description": "Enrich logon events",
    			"allow_duplicates": false,
    			"value": [
    				"authentication"
    			],
    			"if": "ctx.message =~ /(login failure for user|logged in from|logged in,)/"
    			}
    		},
    		{
    			"append": {
    			"ignore_failure": true,
    			"field": "event.outcome",
    			"description": "Enrich successful login events",
    			"allow_duplicates": false,
    			"value": [
    				"success"
    			],
    			"if": "ctx.message =~ /(logged in from|logged in,)/"
    			}
    		},
    		{
    			"append": {
    			"ignore_failure": true,
    			"field": "event.outcome",
    			"description": "Enrich failed login events",
    			"allow_duplicates": false,
    			"value": [
    				"failure"
    			],
    			"if": "ctx.message =~ /(login failure for user)/"
    			}
    		},
    		{
    			"append": {
    			"ignore_failure": true,
    			"field": "event.category",
    			"description": "Enrich network events",
    			"allow_duplicates": false,
    			"value": [
    				"network"
    			],
    			"if": "ctx.message =~ /( fcs error on link| link down| link up)/"
    			}
    		},
    		{
    			"append": {
    			"ignore_failure": true,
    			"field": "event.outcome",
    			"description": "Enrich network failures",
    			"allow_duplicates": false,
    			"value": [
    				"failure"
    			],
    			"if": "ctx.message =~ /( fcs error on link)/"
    			}
    		},
    		{
    			"append": {
    			"ignore_failure": true,
    			"field": "event.category",
    			"allow_duplicates": false,
    			"value": [
    				"session"
    			],
    			"if": "ctx.message =~ /(logged out)/"
    			}
    		},
    		{
    			"append": {
    			"ignore_failure": true,
    			"field": "event.category",
    			"allow_duplicates": false,
    			"value": [
    				"threat"
    			],
    			"if": "ctx.message =~ /(from address that has not seen before)/"
    			}
    		},
    		{
    			"append": {
    			"ignore_failure": true,
    			"field": "service.name",
    			"value": [
    				"l2tp"
    			],
    			"if": "ctx.message =~ /(^L2TP\\/IPsec VPN)/"
    			}
    		},
    		{
    			"geoip": {
    			"ignore_failure": true,
    			"ignore_missing": true,
    			"field": "source.ip",
    			"target_field": "source.geo"
    			}
    		},
    		{
    			"geoip": {
    			"ignore_failure": true,
    			"ignore_missing": true,
    			"field": "destination.ip",
    			"target_field": "destination.geo"
    			}
    		},
    		{
    			"geoip": {
    			"ignore_failure": true,
    			"ignore_missing": true,
    			"field": "client.ip",
    			"target_field": "client.geo"
    			}
    		}
    	]
    }
    ```

17. 按“Save pipeline”。
18. 在主菜单中进入“Stack Management”，然后选择“Index Management”，再选择“Component templates”。
19. 按“Create component template”创建新模板。
20. 将“Name”设置为“logs-routeros@custom”。
21. 在“Index settings”部分下，粘贴以下内容：  

    ```json
    {
      "index": {
        "lifecycle": {
          "name": "logs"
        },
        "default_pipeline": "logs-routeros@custom"
      }
    }
    ```

    :::info
    将 ILM 策略更改为所需的策略名称。“logs”策略是默认策略，可能正用于其他日志。
    :::
22. 在“Mappings”部分，按“Load JSON”并粘贴以下内容：  

    ```json
    {
      "dynamic_templates": [],
      "properties": {
        "service": {
          "type": "object",
          "properties": {
            "name": {
              "type": "keyword"
            }
          }
        },
        "destination": {
          "type": "object",
          "properties": {
            "port": {
              "type": "long"
            },
            "ip": {
              "type": "ip"
            }
          }
        },
        "host": {
          "type": "object",
          "properties": {
            "ip": {
              "type": "ip"
            }
          }
        },
        "client": {
          "type": "object",
          "properties": {
            "ip": {
              "type": "ip"
            },
            "mac": {
              "type": "keyword"
            }
          }
        },
        "source": {
          "type": "object",
          "properties": {
            "geo": {
              "type": "object",
              "properties": {
                "continent_name": {
                  "ignore_above": 1024,
                  "type": "keyword"
                },
                "region_iso_code": {
                  "ignore_above": 1024,
                  "type": "keyword"
                },
                "city_name": {
                  "ignore_above": 1024,
                  "type": "keyword"
                },
                "country_iso_code": {
                  "ignore_above": 1024,
                  "type": "keyword"
                },
                "country_name": {
                  "ignore_above": 1024,
                  "type": "keyword"
                },
                "location": {
                  "type": "geo_point"
                },
                "region_name": {
                  "ignore_above": 1024,
                  "type": "keyword"
                }
              }
            },
            "as": {
              "type": "object",
              "properties": {
                "number": {
                  "type": "long"
                },
                "organization": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "ignore_above": 1024,
                      "type": "keyword",
                      "fields": {
                        "text": {
                          "type": "match_only_text"
                        }
                      }
                    }
                  }
                }
              }
            },
            "address": {
              "ignore_above": 1024,
              "type": "keyword"
            },
            "port": {
              "type": "long"
            },
            "domain": {
              "ignore_above": 1024,
              "type": "keyword"
            },
            "ip": {
              "type": "ip"
            },
            "mac": {
              "type": "keyword"
            }
          }
        },
        "event": {
          "type": "object",
          "properties": {
            "duration": {
              "type": "long"
            },
            "category": {
              "type": "keyword"
            },
            "outcome": {
              "type": "keyword"
            }
          }
        },
        "message": {
          "type": "match_only_text"
        },
        "user": {
          "type": "object",
          "properties": {
            "name": {
              "type": "keyword"
            }
          }
        },
        "network": {
          "type": "object",
          "properties": {
            "bytes": {
              "type": "long"
            },
            "name": {
              "type": "keyword"
            },
            "transport": {
              "type": "keyword"
            }
          }
        },
        "tags": {
          "ignore_above": 1024,
          "type": "keyword"
        }
      }
    }
    ```

23. 按“Next”，然后按“Save component template”。  
    :::warning
    如果存在同名组件模板，请改为编辑现有模板。
    :::
24. 在主菜单中进入“Stack Management”，然后选择“Index Management”，再选择“Index templates”。
25. 点击“Create template”创建新模板。
26. 将“Name”设置为“logs-routeros”。
27. 将“Index patterns”设置为“logs-routeros-\*”。
28. 在“Component templates”部分，将以下模板添加到新的 Index template：  

    ```text
    logs@settings
    logs-routeros@custom
    ecs@mappings
    ```

29. 单击“Next”，然后单击“Save template”。
30. 确保已在主机以及从 RouterOS 设备（10.0.0.1）到该主机的路径上的其他位置开放 5514/UDP 端口。
31. 您的 Elastic Agent 现在已准备好接收 Syslog 数据！

### RouterOS

1. 在 RouterOS 设备（10.0.0.1）上配置 [remote logging action](/docs/diagnostics-monitoring-and-troubleshooting/log#send-the-log-to-a-syslog-server)：

   ```ros
   /system/logging/action
   set [find where name="remote"] remote-log-format=syslog \
       remote=10.0.0.2 remote-port=5514 syslog-facility=syslog
   ```

2. 为希望从 RouterOS 设备（10.0.0.1）接收的每个 [topics](/docs/diagnostics-monitoring-and-troubleshooting/log#topics) 添加一条规则，例如：

   ```ros
   /system/logging
   add action=remote topics=info
   add action=remote topics=error
   add action=remote topics=critical
   add action=remote topics=warning
   add action=remote topics=bridge,stp
   ```

3. 现在应开始看到 Syslog 数据被摄取。
4. 继续阅读本指南，开始使用 Kibana。

## 使用 Kibana {#using-kibana}

Kibana 允许搜索已摄取的 Syslog 数据。要查看已摄取的日志，请执行以下操作：

1. [登录 Kibana](https://www.elastic.co/guide/en/kibana/current/access.html)。
2. 从主菜单打开“Discover”。
3. [添加过滤器](https://www.elastic.co/guide/en/kibana/current/discover-get-started.html#explore-fields-in-your-data)，并使用以下参数：  

   ```text
   Select a field: data_stream.dataset
   Select operator: IS
   Select a value: routeros
   ```

4. 为简化操作，建议在 Discover 菜单中[搜索字段](https://www.elastic.co/guide/en/kibana/current/discover-get-started.html#explore-fields-in-your-data)，搜索“message”，然后将该字段添加到视图中。
5. 还建议搜索“log.syslog.hostname”字段，并将其添加到视图中。
6. 建议[保存搜索](https://www.elastic.co/guide/en/kibana/current/save-open-search.html#_save_a_search)，以便日后更轻松地访问。
7. 完成。

:::tip
搜索日志很有用，但更可能需要一种方式，为特定活动创建[告警](https://www.elastic.co/guide/en/kibana/current/alerting-getting-started.html)，并创建[连接器](https://www.elastic.co/guide/en/kibana/current/action-types.html)，将告警发送到电子邮件、webhook、聊天和其他选项。考虑启用 [Spike in failed logon events](https://www.elastic.co/guide/en/security/current/spike-in-failed-logon-events.html) 规则，以便在登录失败尝试过多时发出告警。还可以创建[阈值规则](https://www.elastic.co/guide/en/observability/current/metrics-threshold-alert.html)，并设置为在固定数量的登录失败后发出告警。
:::
