---
sidebar_key: "bridging-and-switching/swos/crs3"
sidebar_position: 1
title: "CRS3xx 和 CSS3xx 系列手册"
sidebar_label: "CRS3xx 和 CSS3xx 系列手册"
source: https://manual.mikrotik.com/docs/7.24/bridging-and-switching/swos/crs3
captured_at: '2026-11-04T11:27:59+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#summary}

SwOS 是专为管理 MikroTik 交换机产品而设计的操作系统。它提供基本的管理型交换机功能，以及端口到端口转发、广播风暴控制、通过 ACL 规则进行 MAC/IP/端口过滤、VLAN 配置、流量镜像和带宽限制等高级功能。

SwOS 仅通过 IPv4 上的 Web 浏览器（HTTP）进行管理。不支持控制台访问、SSH、API 或其他管理接口。

---

## 连接到交换机 {#connecting-to-the-switch}

打开 Web 浏览器并输入默认管理 IP 地址。

![Swos login css326](/img/6264ffe6828480e0.webp)

* **默认 IP 地址**：`192.168.88.1`
* **默认用户名**：`admin`
* **默认密码**：*（空）*

---

## 系统选项卡 {#system-tab}

系统选项卡管理常规配置参数、设备发现选项和管理安全。

![Swos system css326](/img/704f07a7a77e557f.webp)

### 系统管理设置 {#system-management-settings}

| 属性 | 描述 |
| :--- | :--- |
| **地址获取** | 定义通过静态设置、带回退的 DHCP 或仅 DHCP 进行 IP 分配。 |
| **静态 IP 地址** | 指定用于管理访问的静态 IPv4 地址。 |
| **标识** | 设置交换机标识的可自定义名称。 |
| **允许来源** | 将管理 Web 访问限制为指定的 IP 范围或子网。 |
| **允许来源端口** | 将 Web 访问限制到指定的物理交换机接口。 |
| **允许来源 VLAN** | 将访问限制到特定的传入 VLAN ID 配置文件。 |

![SwOS Management](/img/ca29c618018d3a59.webp)

### DHCP 与 PPPoE 监听 {#dhcp--pppoe-snooping}

SwOS 具有内置安全机制，可在指定的不受信任接口上阻止未经授权或恶意的 DHCP 服务器以及 PPPoE 发现序列。

![CSS326 DHCP Snooping](/img/0f3d52a9da17fa79.webp)

### 配置安全与维护 {#configuration-security-and-maintenance}

下半部分处理备份和管理密码。

![Swos system3 css326](/img/3ba4a76afdcc03bc.webp)

* **更改密码**：更新设备访问密钥。
* **备份配置**：将当前设置保存到本地文件。
* **恢复配置**：上传并应用现有配置状态。

---

## 链路选项卡 {#link-tab}

链路选项卡配置物理链路参数，并监控每个接口的活动连接属性。

![Swos link css326](/img/8dec2ad5f0c9b5e2.webp)

* **链路配置文件**：管理接口状态，切换速度/双工自动协商，并控制流控暂停帧。

---

## PoE 选项卡 {#poe-tab}

*（适用于支持以太网供电分配功能的设备）*

![SwOS PoE](/img/ca06196fd522c5cd.webp)

* 支持配置供电设置（`auto`、`on`、`off`），并在功率受限事件期间建立端口优先级。

---

## SFP 选项卡 {#sfp-tab}

为已连接的 SFP/SFP+ 光收发器提供可视化诊断。

![Swos sfp1 css326](/img/d2e58a862ecccc20.webp)

* 监控工作温度、激光器供电电压、TX/RX 功率电平和硬件序列号字符串等内部诊断信息。

---

## 转发与端口隔离 {#forwarding-and-port-isolation}

管理整个交换架构中的第 2 层数据包转发表。

![Swos forw css326](/img/cfc3bfc9dda03800.webp)
![Swos ivl system](/img/b0001fc2ceb3b1a6.webp)

### 端口隔离与隔离组 {#port-isolation-and-isolated-groups}

端口隔离在内部拆分广播域，在不增加子网层级的情况下控制客户端通信。

![SwOS Isolated Groups](/img/284614f24611b0f4.webp)
![SwO isolation example3](/img/de28135343d9795b.webp)

---

## LAG（链路聚合） {#lag-link-aggregation}

使用动态 LACP 链路或静态阵列将物理接口捆绑为单个高吞吐量通道。

![Swos lag css326](/img/42eb242aaffa0ae3.webp)

---

## RSTP（快速生成树协议） {#rstp-rapid-spanning-tree-protocol}

提供环路避免架构和结构冗余参数。

![Swos rstp css326](/img/6e7df850ef26634b.webp)

* 支持使用经典短路径或现代长路径评估结构来配置自定义桥路径开销。

---

## VLAN 与 VLANs 矩阵配置 {#vlan--vlans-matrix-configuration}

VLAN 路由规则将入口数据包分类行为与出口格式表分离。

### VLAN 选项卡（入口控制） {#vlan-tab-ingress-control}

处理传入流量流的端口行为。

![Swos vlan css326](/img/871181dce551f5b8.webp)

* **VLAN 模式**：配置 `disabled`、`optional`、`enabled` 和 `strict` 模式下的入口约束。

![Swos strict vlans](/img/d34e6c2d13d78d19.webp)

* **默认 VLAN ID**：设置分配给传入未标记流量的端口 VLAN ID（PVID）。

![Default vlan id](/img/1d9f62b52b3efa1f.webp)

### VLANs 选项卡（出口映射） {#vlans-tab-egress-mapping}

定义目标 trunk 端口上的广播成员关系和处理方式。

![Swos vlans css326](/img/9d38b9ee9d82a8c1.webp)
![Swos vlans menu](/img/e5c63db80488b834.webp)

#### 传统模式模板 {#traditional-mode-templates}

* **接入接口**：将标准未标记端点与特定目标 VLAN 标记配对。

  ![Access ports](/img/dcbdce357964f958.webp)

* **Trunk 和 Hybrid 选项**：在主要核心上行链路上，将多个带标签流量与可选的未标记本征路由路径混合。

  ![Hybrid ports](/img/90b987271e134d95.webp)
  ![Swos hybrid](/img/2fb81eda61c231cd.webp)
  ![Swos hybrid vlan](/img/330b019789c2b24b.webp)

---

## 私有 VLAN {#private-vlans}

在共享基础设施空间中强制执行安全的端口通信结构配置文件。

![SwOS Private VLAN](/img/606fbb63c2620b62.webp)

---

## 主机选项卡 {#hosts-tab}

显示通过传入源地址发现的活跃硬件转发表（FDB）动态条目。

![Swos shost css326](/img/24da5f09ba887bf8.webp)

---

## IGMP 监听 {#igmp-snooping}

过滤组播分发，跟踪活跃组订阅以阻止组播泛洪。

![IGMP snooping](/img/a5464dca06492640.webp)
![CSSxx IGMP](/img/8404b127eb3f6c84.webp)
![IGMP vlantab](/img/2c8b3d4fcf937b4d.webp)

---

## SNMP 选项卡 {#snmp-tab}

支持通过标准 SNMP 结构进行监控。

![Swos snmp2 1](/img/f3b87569bbcad587.webp)

---

## ACL 选项卡（访问控制列表） {#acl-tab-access-control-lists}

执行硬件卸载的过滤规则，匹配第 2/3/4 层帧头中的模式以丢弃或重定向数据包。

![CRS326 ACL table](/img/7e4fb4e7daa01ec1.webp)

---

## 诊断：统计、错误和直方图 {#diagnostics-stats-errors-and-histograms}

跟踪接口计数器、丢弃帧、错误模式以及详细的结构化链路历史诊断信息。

![Swos stat1 css326](/img/bc002e2ae29c54ca.webp)
![Swos stat2 css326](/img/a1256a0deac7e870.webp)
![Swos stat3 css326](/img/4dc5d6afd153aab3.webp)

---

## 健康选项卡 {#health-tab}

监控硬件运行环境，跟踪系统核心温度和工作输入电压。

![SwOS CRS328 health](/img/c32f28c61507fb8f.webp)

---

## 双启动操作 {#dual-boot-operation}

许多 CRS 硬件设备支持双启动设计，允许在运行 RouterOS 或 SwOS 之间切换。

![Router board settings](/img/206e2364a9ea20ec.webp)
![Router board settings webfig](/img/e5f83f41c903b22e.webp)
![Dual boot option](/img/59c51ae05cc7ea21.webp)

使用 RouterOS CLI 接口将操作系统切换为 SwOS 时，使用以下系统命令结构：

```bash
/system routerboard settings set boot-os=swos
```

## 重置与重新安装 {#reset-and-reinstall}

可以使用系统菜单中的 "Reset Configuration" 按钮重置 SwOS 配置。如果 SwOS Web 管理不可用，仍可使用其他选项重置配置。

CSS326-24G-2S+ 和 CSS318-16G-2S+IN 设备具有内置备份 SwOS 固件，可在标准固件损坏或升级失败时加载：

* 在 CSS326-24G-2S+ 和 CSS318-16G-2S+IN 启动时按住 Reset 按钮几秒钟，会重置配置并加载备份固件。
* 加载备份固件后，可以使用 Web 浏览器连接到 192.168.88.1（或 DHCP 服务器租用的地址）并安装新的 SwOS 固件。

双启动设备可以使用重置按钮启动 RouterOS。按住重置按钮为设备通电，并等待用户 LED 开始闪烁（约 5 秒）。这会重置 RouterOS 配置，设备现在将启动进入 RouterOS。设备可通过 RouterOS 访问后，即可升级和重置 SwOS 配置。请参阅文章 - 使用 RouterOS 配置 SwOS。

带有串行控制台的 CRS3xx 设备具有其他选项。

要在 RouterOS 和 SwOS 之间切换，请按照以下步骤操作：

1. 使用串行控制台连接到设备
2. 进入 RouterBOOT 设置
3. 选择 "j - boot os"
4. 选择 RouterOS 或 SwOS

可以在标准固件损坏或升级失败时加载 SwOS 备份固件：

1. 使用串行控制台连接到设备
2. 启动 SwOS
3. 选择 "p - boot primary SwOS"
4. 加载备份固件后，可以使用 Web 浏览器连接到 192.168.88.1（或 DHCP 服务器租用的地址）并安装新的 SwOS 固件。

要重置 SwOS 配置：

1. 使用串行控制台连接到设备
2. 启动 SwOS
3. 选择 "r - reset configuration"

![Swos reset](/img/88b172351cb761c2.webp)
