---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/log/syslog-with-elasticsearch"
sidebar_position: 2
title: "使用 Elasticsearch 的 Syslog"
sidebar_label: "使用 Elasticsearch 的 Syslog"
description: "本指南介绍如何使用 Elasticsearch、Kibana 和 Fleet Server 配合 MikroTik RouterOS 设备来配置 Syslog 数据收集与分析。内容涵盖前提条件、Elastic 与 RouterOS 两个组件的设置步骤，包括创建 agent policy 以及配置 Custom UDP logs 集成。"
tags:
  - 'syslog'
  - 'elasticsearch'
  - 'kibana'
source: https://manual.mikrotik.com/docs/diagnostics-monitoring-and-troubleshooting/log/syslog-with-elasticsearch
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 简介 {#introduction}

Elasticsearch 是一种流行的 NoSQL 数据库，可用于存储各种数据，包括 Syslog 数据。配合 Kibana，你可以创建一个强大的工具来分析来自 RouterOS 设备的 Syslog 数据。本指南将依赖 Elasticsearch 集成，要使其正常工作，你需要有一个可用的 Elasticsearch 环境。本指南不会涵盖 Elasticsearch 和 Kibana 的安装说明，但会涵盖设置 Syslog 数据收集与分析的相关步骤。

使用 Elasticsearch 可以进行多种配置，但本指南将采用以下原则：

- 一台 RouterOS (10.0.0.1) 设备将 Syslog 数据发送到运行 [Custom UDP logs](https://www.elastic.co/docs/current/integrations/udp) 的服务器 (10.0.0.2)。
- 运行 Custom UDP logs 集成的服务器 (10.0.0.2) 接收 Syslog 数据，处理数据并将其发送到 [Fleet Server](https://www.elastic.co/guide/en/fleet/current/fleet-server.html) (10.0.0.3)。
- Fleet Server (10.0.0.3) 将数据存储在 [Elasticsearch](https://www.elastic.co/elasticsearch) (10.0.0.4) 中。
- [Kibana](https://www.elastic.co/kibana) (10.0.0.5) 从 Elasticsearch (10.0.0.4) 检索数据，进行分析，并允许你搜索这些数据。

:::info
本指南不会使用 [Logstash](https://www.elastic.co/logstash) 作为分析 Syslog 数据的一部分；它已被 Fleet Server 取代。

:::

:::info
可以将 Elasticsearch、Kibana、Fleet Server 和 Custom UDP logs 集成安装在同一台设备上。

:::

## 先决条件 {#prerequisites}

- [设置 Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup.html)。  
  :::info
  Elasticsearch 在许多平台上得到广泛支持。建议设置一个 Elasticsearch 节点集群。
  :::
- [设置 Kibana](https://www.elastic.co/guide/en/kibana/current/setup.html)。  
  :::info
  Kibana 可以安装在与 Elasticsearch 相同的设备上，但出于性能原因，也可以安装在单独的设备上。虽然不使用 Kibana 也可以分析 Syslog 数据，但这需要编写你自己的 API 请求；不过 Kibana 非常易于使用，并且具有广泛的功能。
  :::
- [Set up Fleet Server](https://www.elastic.co/guide/en/fleet/current/add-fleet-server-on-prem.html).  
  :::info
  可以在安装 Elasticsearch 和/或 Kibana 的同一台设备上设置 Fleet Server。建议将 Fleet Server 安装在其他设备上。有关硬件和拓扑要求的建议，请参阅 Elasticsearch 手册。
  :::

## 设置 {#set-up}

设置说明分为两部分：Elastic（有关 Elasticsearch、Kibana 和 Fleet Server 的配置）和 RouterOS（与您的 RouterOS 设备相关的配置）。

### Elastic {#elastic}

:::warning
某些步骤可能会随时间而变化。请参阅 Elastic 的手册以获取最新步骤。

:::

1. [登录到你的 Kibana](https://www.elastic.co/guide/en/kibana/current/access.html)。
2. 在主菜单下打开 [Fleet](https://www.elastic.co/guide/en/kibana/current/fleet.html) 部分。
3. 打开“[Agent policies](https://www.elastic.co/guide/en/fleet/current/agent-policy.html)”部分。
4. 按下“创建 Agent 策略”按钮以[创建新的 Agent 策略](https://www.elastic.co/guide/en/fleet/current/agent-policy.html#create-a-policy)。
5. 为该策略命名，例如“Syslog policy”，根据需要调整高级设置，然后创建策略。或者你可以使用下面的 API 请求：  

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

6. 单击其名称，打开你新建的策略。
7. 按下“[添加集成](https://www.elastic.co/guide/en/fleet/current/agent-policy.html#add-integration)”。
8. 搜索“[Custom UDP logs](https://www.elastic.co/docs/current/integrations/udp)”并按下“添加 Custom UDP logs”。
9. 调整配置，并确保：  
   - 将“Listen Address”设置为将要运行 Custom UDP logs 集成的服务器的 IP 地址，在本示例中该地址应为“10.0.0.2”。  
   - 将“Listen Port”设置为“5514”。  
   - 将“Dataset name”设置为“routeros”。  
   - 将“Ingest Pipeline”设置为“logs-routeros@custom”。  
   - 将“Syslog Parsing”设置为“Yes”。
10. 保存该集成。
11. 按下“[将 Elastic Agent 添加到你的主机](https://www.elastic.co/guide/en/fleet/current/elastic-agent-installation.html)”按钮。
12. 按照说明将 Elastic Agent 添加到你的主机。  
    :::info
    Elastic 官方手册建议将 Elastic Agent 安装为 Fleet 管理。建议遵循该建议，因为当代理由 Fleet 管理时，管理代理会更容易。
    :::
13. 转到主菜单上的“堆栈管理”，然后打开“[摄取管道](https://www.elastic.co/guide/en/elasticsearch/reference/current/ingest.html)”。
14. 通过按下“[创建管道](https://www.elastic.co/guide/en/fleet/current/data-streams-pipeline-tutorial.html#data-streams-pipeline-one)”，然后选择“新建管道”来创建新的 Ingest Pipeline。
15. 将“Name”设置为“logs-routeros@custom”。
16. 按下“导入处理器”并粘贴以下处理器：  

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

17. 按下“保存管道”。
18. 转到主菜单上的“堆栈管理”，然后选择“索引管理”，再选择“组件模板”。
19. 通过按下“创建组件模板”来创建新模板。
20. 将“Name”设置为“logs-routeros@custom”。
21. 在“索引设置”部分下，粘贴以下内容：  

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
    将 ILM 策略更改为你所需的策略名称。“logs”策略是默认策略，可能正用于其他日志。
    :::
22. 在“映射”部分下，按下“加载 JSON”并粘贴以下内容：  

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

23. 按下“下一步”，然后按下“保存组件模板”。  
    :::warning
    如果已存在具有该名称的组件模板，请改为编辑现有模板。
    :::
24. 转到主菜单上的“堆栈管理”，然后选择“索引管理”，再选择“索引模板”。
25. 通过按下“创建模板”来创建新模板。
26. 将“Name”设置为“logs-routeros”。
27. 将“Index patterns”设置为“logs-routeros-\*”。
28. 在“组件模板”部分下，将以下模板添加到新的 Index template：  

    ```text
    logs@settings
    logs-routeros@custom
    ecs@mappings
    ```

29. 按下“下一步”，然后按下“保存模板”。
30. 确保你已在主机上以及从 RouterOS 设备 (10.0.0.1) 路径中的其他位置打开 5514/UDP 端口。
31. 你的 Elastic Agent 现在已准备好接收 Syslog 数据！

### RouterOS {#routeros}

1. 在您的 RouterOS 设备 (10.0.0.1) 上配置[远程日志记录动作](./index.md#send-the-log-to-a-syslog-server)：

   ```ros
   /system/logging/action
   set [find where name="remote"] remote-log-format=syslog \
       remote=10.0.0.2 remote-port=5514 syslog-facility=syslog
   ```

2. 为你希望从 RouterOS 设备（10.0.0.1）接收的每个[主题](./index.md#topics)添加一条规则，例如：

   ```ros
   /system/logging
   add action=remote topics=info
   add action=remote topics=error
   add action=remote topics=critical
   add action=remote topics=warning
   add action=remote topics=bridge,stp
   ```

3. 你现在应该开始看到 Syslog 数据被摄取。
4. 继续阅读本指南以开始使用 Kibana。

## 使用 Kibana {#using-kibana}

Kibana 允许你搜索已摄取的 Syslog 数据。要查看已摄取的日志，请执行以下操作：

1. [登录到您的 Kibana](https://www.elastic.co/guide/en/kibana/current/access.html)。
2. 从主菜单打开“Discover”。
3. [添加筛选器](https://www.elastic.co/guide/en/kibana/current/discover-get-started.html#explore-fields-in-your-data)，并使用以下参数：  

   ```text
   Select a field: data_stream.dataset
   Select operator: IS
   Select a value: routeros
   ```

4. 为简单起见，我们建议在 Discover 菜单中[搜索字段](https://www.elastic.co/guide/en/kibana/current/discover-get-started.html#explore-fields-in-your-data)，搜索 "message"，然后将其添加到视图中。
5. 我们还建议搜索 "log.syslog.hostname" 字段，并将其也添加到视图中。
6. 考虑[保存搜索](https://www.elastic.co/guide/en/kibana/current/save-open-search.html#_save_a_search)以便以后更轻松地访问。
7. 完成。

:::tip
虽然搜索日志可能很有用，但你更可能是在寻找一种方式，为某些活动创建[告警](https://www.elastic.co/guide/en/kibana/current/alerting-getting-started.html)，并创建[连接器](https://www.elastic.co/guide/en/kibana/current/action-types.html)以将告警发送到电子邮件、webhook、聊天和其他选项。考虑启用[登录失败事件激增](https://www.elastic.co/guide/en/security/current/spike-in-failed-logon-events.html)规则，以便在登录失败尝试过多时发出告警。你还可以创建[阈值规则](https://www.elastic.co/guide/en/observability/current/metrics-threshold-alert.html)，并将其设置为在固定数量的登录失败后发出告警。

:::
