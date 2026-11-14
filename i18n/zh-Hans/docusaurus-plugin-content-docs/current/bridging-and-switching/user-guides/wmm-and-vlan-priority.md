---
sidebar_key: "bridging-and-switching/user-guides/wmm-and-vlan-priority"
sidebar_position: 9
title: "WMM 与 VLAN 优先级"
sidebar_label: "WMM 与 VLAN 优先级"
description: "本页说明 MikroTik RouterOS 如何为 QoS 实现 WMM（Wi-Fi MultiMedia）和 VLAN 优先级，详细介绍了流量如何划分为接入类别（background、best effort、video、voice）、VLAN 优先级的处理方式，以及使用 IP firewall mangle 规则或 bridge filter 设置数据包优先级的方法。"
tags:
  - 'wmm'
  - 'vlan-priority'
  - 'qos'
source: https://manual.mikrotik.com/docs/bridging-and-switching/user-guides/wmm-and-vlan-priority
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## WMM 工作原理 {#how-wmm-works}

---

WMM 通过将流量划分为 4 个接入类别来工作：background、best effort、video、voice。QoS 策略（对不同接入类别的不同处理）应用于发送的数据包，因此发送设备会对不同数据包进行不同处理，例如 AP 无法控制客户端如何发送数据包，客户端也无法控制 AP 如何发送数据包。

Mikrotik AP 和客户端根据分配给数据包的优先级对数据包进行分类，如下表所示（依据 WMM 规范）：1,2 - background；0,3 - best effort；4,5 - video；6,7 - voice。

要能够使用多个 WMM 接入类别，而不仅仅是默认优先级为 0 的所有数据包所在的 best effort，就必须为这些数据包设置优先级。默认情况下，路由器内部的所有数据包（传入的以及本地生成的）优先级均为 0。

数据包的“更好”接入类别并不一定意味着它会在所有其他具有“更差”接入类别的数据包之前通过空口发送。WMM 通过为每个接入类别使用不同设置执行 DCF 介质访问方法（EDCF）来工作，这意味着“更好”的接入类别有更高的概率获得介质访问权——启用 WMM 的站点可以被视为 4 个站点，每个接入类别一个；当所有站点都在竞争介质时，具有“更好”接入类别的站点使用使其更有可能获得传输机会的设置（通过使用更短的退避超时）。详细信息可参阅 802.11e 和 WMM 规范。

:::info
可以使用 `wmm-support` 设置启用 WMM 支持。它仅适用于 B 和 G 频段。其他频段无论此设置如何都会启用该支持。
:::

## VLAN 优先级工作原理 {#how-vlan-priority-works}

---

VLAN 优先级是 VLAN 标记头内称为优先级代码点 (PCP) 的 3 位字段，取值范围为 0 到 7。它用于在网桥和交换机上实现 QoS。MikroTik 设备默认发送优先级为 0 的 VLAN 数据包（本地生成或封装的）。RouterOS 网桥会原样转发 VLAN 标记数据包，这意味着收到的具有特定 VLAN 优先级的 VLAN 标记数据包将以相同的 VLAN 优先级离开网桥。唯一的例外是网桥去除数据包的标记；在这种情况下，由于缺少 VLAN 头，VLAN 优先级不会被保留。

更多详细信息可参阅 IEEE 802.1p 规范。

## 如何设置优先级 {#how-to-set-priority}

---

可以使用 IP 防火墙 mangle 规则或网桥 filter/nat 规则中的 `action=set-priority` 来设置数据包优先级。可以将优先级设置为特定值，或使用 `from-ingress` 设置从入口优先级获取。入口优先级是在传入数据包上检测到的优先级值（如果可用）。目前，入口优先级有 2 个来源：VLAN 头中的优先级，以及通过无线接口接收到的 WMM 数据包中的优先级。对于所有其他数据包，入口优先级为 0。

请注意，入口优先级值不会自动复制到 IP mangle 的 `priority` 值。需要设置正确的规则才能做到这一点。

有 2 种控制优先级的方式：使用带有特定匹配器（协议、地址等）的规则分配优先级，或从入口优先级设置。两种方式都需要设置正确的规则。

这实质上意味着，如果无法或不想通过规则对数据包进行分类，则网络配置必须使路由器能够从传入帧中提取入口优先级。请记住，目前有 2 个来源：数据包中的 VLAN 标记和接收到的 WMM 数据包。

:::info
不要将队列的优先级与分配给数据包的优先级混为一谈。队列的优先级单独工作，指定队列的“重要性”，并且仅在特定队列设置中才有意义。将数据包优先级视为由规则附加到数据包上的某种标记。另请注意，此标记目前仅用于通过启用了 WMM 的链路发出的传出数据包，以及发送 VLAN 标记数据包时（无论该数据包是在本地打上标记还是通过网桥转发）。
:::

### 基于特定匹配器设置 VLAN 或 WMM 优先级 {#set-vlan-or-wmm-priority-based-on-specific-matchers}

可以基于 IP mangle 或网桥 filter/nat 规则中的特定匹配器来更改 VLAN 和 WMM 优先级。在此示例中，所有传出的 ICMP 数据包都将使用 IP mangle 规则以 VLAN 或 WMM 优先级发送：

```ros
/ip/firewall/mangle
add action=set-priority chain=output new-priority=2 protocol=icmp
```

### 自定义优先级映射 {#custom-priority-mapping}

有时需要将某些 VLAN 或 WMM 优先级更改或清除为默认值。我们可以使用 IP mangle 或网桥 firewall/nat 规则中的 `ingress-priority` 匹配器仅筛选所需的优先级，并使用 `new-priority` 动作设置将其更改为其他值。例如，通过网桥转发的优先级为 5 的 VLAN 标记数据包需要更改为 0。

```ros
/interface/bridge/filter
add action=set-priority chain=forward ingress-priority=5 new-priority=0
```

### 在网桥内将 WMM 优先级转换为 VLAN 优先级 {#translating-wmm-priority-to-vlan-priority-inside-a-bridge}

当无线数据包在接收时已设置 WMM 优先级，RouterOS 网桥不会自动将其转换到 VLAN 头。这意味着接收到的具有 WMM 优先级的无线数据包在被网桥打上 VLAN 标记后，将以 VLAN 优先级 0 转发。但是，我们可以使用带有 `from-ingress` 设置的网桥过滤规则来保留 VLAN 数据包中的优先级。例如，我们希望将无线数据包通过 ether2 以 VLAN 10 头转发，并保留已设置的 WMM 优先级（由无线客户端设置）。

```ros
/interface/bridge
add name=bridge1 vlan-filtering=yes
/interface/bridge/port
add bridge=bridge1 interface=ether2
add bridge=bridge1 interface=wlan2 pvid=10
/interface/bridge/vlan
add bridge=bridge1 tagged=ether2 vlan-ids=10

# 将 WMM 优先级转换为 VLAN 优先级
/interface/bridge/filter
add action=set-priority chain=forward new-priority=from-ingress out-interface=ether2
```

当无线数据包由无线接口使用 `vlan-mode=use-tag` 和 `vlan-id` 设置打上 VLAN 标记时，情况相同。你仍然需要使用相同的网桥过滤规则将 WMM 优先级转换为 VLAN 优先级：

```ros
/interface/wireless
set [ find default-name=wlan2 ] vlan-mode=use-tag vlan-id=10

/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether2
add bridge=bridge1 interface=wlan2

 # 将 WMM 优先级转换为 VLAN 优先级
/interface/bridge/filter
add action=set-priority chain=forward new-priority=from-ingress out-interface=ether2
```

:::info
相同的原则也适用于相反方向。RouterOS 不会自动将 VLAN 优先级转换为 WMM 优先级；可以使用 `new-priority=from-ingress` 规则执行此转换。

RouterOS 网桥会原样转发 VLAN 标记数据包，这意味着它们以进入时的相同优先级离开网桥。唯一的例外发生在网桥去除数据包标记时，因为移除 VLAN 头时优先级信息会丢失。
:::

## 从 DSCP 获取优先级 {#priority-from-dscp}

---

设置 VLAN 或 WMM 优先级的另一种方式是使用 IP 头中的 DSCP 字段。这只能通过带有 `new-priority=``from-dscp` 或 `new-priority=from-dscp-high-3-bits` 设置以及 `set-priority` 动作属性的 IP 防火墙 mangle 规则来完成。请注意，IP 头中的 DSCP 可以取值为 0-63，但优先级仅为 0-7。使用 `new-priority=``from-dscp` 设置时，优先级将是 DSCP 值的低 3 位；而使用 `new-priority=from-dscp-high-3-bits` 时，优先级将是 DSCP 值的高 3 位。

请记住，只能访问 IP 数据包上的 DSCP，并且 IP 头中的 DSCP 值应在某处设置（由客户端设备或 IP mangle 规则设置）。

最好在某个边界路由器（例如，用于连接 Internet 的主路由器）上根据流量类型设置数据包 IP 头中的 DSCP 值，例如，将从 Internet 传来的属于 SIP 连接的数据包的 DSCP 值设为 7，其余设为 0。这样，只需在一个地方标记数据包。然后，网络中的所有 AP 都可以仅用一条规则根据 DSCP 值设置数据包优先级。

### 从 DSCP 设置 VLAN 或 WMM 优先级 {#set-vlan-or-wmm-priority-from-dscp}

在此示例中，当数据包通过无线接口路由时，AP 设备将根据 DSCP 设置 WMM 优先级。

```ros
/ip/firewall/mangle
add action=set-priority chain=forward new-priority=from-dscp out-interface=wlan2
```

:::info
当数据包通过网桥转发时，可以通过网桥设置下的 `use-ip-firewall=yes` 让数据包经过 IP mangle 规则。
:::

## 从优先级获取 DSCP {#dscp-from-priority}

---

类似地，如果接收到的数据包包含 VLAN 或 WMM 优先级，则可以设置 DSCP 值。这可以通过带有 `new-dscp=from-priority` 或 `new-dscp=from-priority-to-high-3-bits` 设置以及 `change-dscp` 动作属性的 IP mangle 规则来实现。请注意，VLAN 或 WMM 数据包中的优先级可以取值为 0-7，但 IP 头中的 DSCP 为 0-63。使用 `new-dscp=from-priority` 设置时，优先级值将设置 DSCP 的低 3 位；而使用 `new-dscp=from-priority-to-high-3-bits` 时，优先级值将设置 DSCP 的高 3 位。

但是，此设置不能直接使用从接收到的 VLAN 或 WMM 数据包中获取的入口优先级。你需要先使用 IP mangle 或网桥 filter/nat 规则设置优先级（在这种情况下可以使用入口优先级），然后才能应用 DSCP 规则。

### 从 VLAN 或 WMM 优先级设置 DSCP {#set-dscp-from-vlan-or-wmm-priority}

在此示例中，当数据包被路由时，AP 设备需要根据 WMM 优先级设置 DSCP。首先，添加一条设置优先级的规则。DSCP 规则需要它来正确更改 DSCP 值。此规则可以从入口获取优先级。然后添加 DSCP 规则来更改其值。

```ros
/ip/firewall/mangle
add action=set-priority chain=prerouting in-interface=wlan2 new-priority=from-ingress
add action=change-dscp chain=prerouting in-interface=wlan2 new-dscp=from-priority
```

:::info
当数据包通过网桥转发时，可以通过网桥设置下的 `use-ip-firewall=yes` 让数据包经过 IP mangle 规则。
:::

## 组合优先级设置与处理方案 {#combining-priority-setting-and-handling-solutions}

---

基于上述“构建块”，可以通过组合不同的优先级信息承载方法来处理复杂网络和不同情况，以确保 QoS 并优化资源使用。以下是一些建议：

- 整个网络中的过滤规则越少越好（越快）。尽量仅在必要时对数据包进行分类，最好在快速路由器上执行此操作，因为很可能需要连接跟踪。
- 使用 DSCP 在您网络中转发的 IP 数据包中承载优先级信息。这样，您可以在需要时使用它。
- 在必要时使用 VLAN，因为它们也会承载优先级信息。确保路径上的以太网网桥和交换机不会清除 VLAN 标记中的优先级信息。
- 请记住，QoS 不会提高链路吞吐量；它只是以不同方式处理不同数据包，并且无线链路上的 WMM 流量会在空口上区别对待常规流量。

## 另请参阅 {#see-also}

---

- [RouterOS 中的数据包流](../../firewall-and-quality-of-service/packet-flow-in-routeros.md)
- [IP mangle](../../firewall-and-quality-of-service/firewall/mangle.md)
- [网桥防火墙](../index.md#bridge-firewall)
