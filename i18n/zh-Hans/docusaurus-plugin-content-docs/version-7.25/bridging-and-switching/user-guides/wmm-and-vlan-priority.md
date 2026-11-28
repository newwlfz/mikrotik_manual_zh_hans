---
title: "WMM 和 VLAN 优先级"
description: "本页说明 MikroTik RouterOS 如何实现用于 QoS 的 WMM（Wi-Fi MultiMedia）和 VLAN 优先级，详细介绍如何将流量划分为访问类别（background、best effort、video、voice）、如何处理 VLAN 优先级，以及如何使用 IP 防火墙 mangle 规则或网桥过滤器设置数据包优先级。"
tags:
  - 'wmm'
  - 'vlan-priority'
  - 'qos'
source: https://manual.mikrotik.com/docs/7.25/bridging-and-switching/user-guides/wmm-and-vlan-priority
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "network-management"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## WMM 的工作原理 {#how-wmm-works}

---

WMM 通过将流量划分为 4 个接入类别来工作：background、best effort、video、voice。QoS 策略（对接入类别的不同处理）应用于已发送的数据包，因此发送设备会以不同方式处理不同的数据包，例如 AP 无法控制客户端如何发送数据包，客户端也无法控制 AP 如何发送数据包。

MikroTik AP 和客户端会根据分配给数据包的优先级进行分类，依据下表（按照 WMM 规范）：1,2 - background；0,3 - best effort；4,5 - video；6,7 - voice。

要使用多个 WMM 接入类别，而不只是所有默认优先级为 0 的数据包所在的 best effort，必须为这些数据包设置优先级。默认情况下，路由器内的所有数据包（进入的和本地生成的）优先级均为 0。

数据包的“更好”接入类别并不一定意味着它会先于所有“较差”接入类别的数据包通过无线链路发送。WMM 通过为每个接入类别使用不同设置执行 DCF 介质接入方法（EDCF）来工作，这意味着“更好”的接入类别获得介质接入的概率更高：启用 WMM 的站点可视为 4 个站点，每个接入类别对应一个站点，当所有站点竞争介质时，具有“更好”接入类别的站点使用使其更可能获得发送机会的设置（通过使用更短的退避超时）。详情可参阅 802.11e 和 WMM 规范。

:::info
可使用 `wmm-support` 设置启用 WMM 支持。它仅适用于 B 和 G 频段。其他频段无论此设置如何都会启用 WMM。
:::

## VLAN 优先级的工作原理 {#how-vlan-priority-works}

---

VLAN 优先级是 VLAN 标记头中名为 Priority Code Point（PCP）的 3 位字段，取值范围为 0 到 7。它用于在网桥和交换机上实现 QoS。MikroTik 设备默认发送优先级为 0 的 VLAN 数据包（本地生成的或封装的）。RouterOS 网桥会原样转发带 VLAN 标记的数据包，这意味着收到具有特定 VLAN 优先级的带 VLAN 标记数据包后，会以相同的 VLAN 优先级离开网桥。唯一的例外是网桥移除数据包标记；在这种情况下，由于缺少 VLAN 头，VLAN 优先级不会保留。

详情请参阅 IEEE 802.1p 规范。

## 如何设置优先级 {#how-to-set-priority}

---

可以使用 IP 防火墙 mangle 规则或网桥 filter/nat 规则中的 `action=set-priority` 设置数据包优先级。优先级可以设置为特定值，也可以通过 `from-ingress` 设置从入站优先级获取。入站优先级是在传入数据包中检测到的优先级值（如果可用）。目前，入站优先级有 2 个来源：VLAN 头中的优先级，以及通过无线接口接收的 WMM 数据包中的优先级。对于所有其他数据包，入站优先级为 0。

请注意，入站优先级值不会自动复制到 IP mangle 的 `priority` 值。需要设置正确的规则来执行此操作。

控制优先级有 2 种方式：使用具有特定匹配条件（协议、地址等）的规则分配优先级，或从入站优先级设置优先级。两种方式都需要设置正确的规则。

这实际上意味着，如果无法或不希望通过规则对数据包进行分类，则网络配置必须使路由器能够从传入帧中提取入站优先级。请记住，目前有 2 个来源：数据包中的 VLAN 标签和接收到的 WMM 数据包。

:::info
不要将队列优先级与分配给数据包的优先级混为一谈。队列优先级独立工作，用于指定队列的“重要性”，并且仅在特定队列配置中有意义。可以将数据包优先级理解为由规则附加到数据包上的某种标记。另外，请考虑该标记目前仅在数据包通过启用 WMM 的链路发出时使用，以及在发送带 VLAN 标签的数据包时使用（无论该数据包是在本地打标签还是被网桥转发）。
:::

### 基于特定匹配条件设置 VLAN 或 WMM 优先级 {#set-vlan-or-wmm-priority-based-on-specific-matchers}

可以根据 IP mangle 或网桥 filter/nat 规则中的特定匹配器修改 VLAN 和 WMM 优先级。在本例中，所有发出的 ICMP 数据包都将通过 IP mangle 规则以 VLAN 或 WMM 优先级发送：

```ros
/ip/firewall/mangle
add action=set-priority chain=output new-priority=2 protocol=icmp
```

### 自定义优先级映射 {#custom-priority-mapping}

有时需要将某些 VLAN 或 WMM 优先级修改为其他值，或清除为默认值。可以使用 IP mangle 或网桥 firewall/nat 规则中的 `ingress-priority` 匹配器，仅过滤所需优先级，并使用 `new-priority` 操作设置将其修改为其他值。例如，需要将通过网桥转发的、优先级为 5 的 VLAN 标记数据包修改为 0。

```ros
/interface/bridge/filter
add action=set-priority chain=forward ingress-priority=5 new-priority=0
```

### 在网桥内将 WMM 优先级转换为 VLAN 优先级 {#translating-wmm-priority-to-vlan-priority-inside-a-bridge}

当接收到已设置 WMM 优先级的无线数据包时，RouterOS 网桥不会自动将其转换为 VLAN 报头。这意味着，收到带 WMM 优先级的无线数据包后，如果由网桥添加 VLAN 标记，转发时 VLAN 优先级将为 0。不过，可以使用带有 `from-ingress` 设置的网桥 filter 规则，在 VLAN 数据包中保留该优先级。例如，希望通过 ether2 转发带有 VLAN 10 报头的无线数据包，并保留已设置的 WMM 优先级（由无线客户端设置）。

```ros
/interface/bridge
add name=bridge1 vlan-filtering=yes
/interface/bridge/port
add bridge=bridge1 interface=ether2
add bridge=bridge1 interface=wlan2 pvid=10
/interface/bridge/vlan
add bridge=bridge1 tagged=ether2 vlan-ids=10

# translates WMM priority to VLAN priority 
/interface/bridge/filter
add action=set-priority chain=forward new-priority=from-ingress out-interface=ether2
```

当无线接口使用 `vlan-mode=use-tag` 和 `vlan-id` 设置为无线数据包添加 VLAN 标记时，情况相同。仍需使用相同的网桥 filter 规则，将 WMM 优先级转换为 VLAN 优先级：

```ros
/interface/wireless
set [ find default-name=wlan2 ] vlan-mode=use-tag vlan-id=10

/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether2
add bridge=bridge1 interface=wlan2

 # translates WMM priority to VLAN priority 
/interface/bridge/filter
add action=set-priority chain=forward new-priority=from-ingress out-interface=ether2
```

:::info
相同原则也适用于反向转换。RouterOS 不会自动将 VLAN 优先级转换为 WMM 优先级；可以使用 `new-priority=from-ingress` 规则执行此转换。

RouterOS 网桥会原样转发带 VLAN 标记的数据包，这意味着数据包离开网桥时保留进入网桥时的优先级。唯一的例外是网桥移除数据包 VLAN 标记时，因为移除 VLAN 报头后优先级信息会丢失。
:::

## 来自 DSCP 的优先级 {#priority-from-dscp}

---

设置 VLAN 或 WMM 优先级的另一种方法是使用 IP 报头中的 DSCP 字段。这只能通过 IP 防火墙 mangle 规则中的 `new-priority=``from-dscp` 或 `new-priority=from-dscp-high-3-bits` 设置以及 `set-priority` 操作属性来完成。请注意，IP 报头中的 DSCP 值可以是 0-63，但优先级只有 0-7。使用 `new-priority=``from-dscp` 设置时，优先级将取 DSCP 值的低 3 位；使用 `new-priority=from-dscp-high-3-bits` 时，优先级将取 DSCP 值的高 3 位。

请记住，只能在 IP 数据包上访问 DSCP，并且应在某处设置 IP 报头中的 DSCP 值（由客户端设备或 IP mangle 规则设置）。

最好在某台边界路由器（例如，用于连接 Internet 的主路由器）上根据流量类型设置数据包 IP 报头中的 DSCP 值，例如，将来自 Internet 且属于 SIP 连接的数据包的 DSCP 值设置为 7，其余数据包设置为 0。这样，只需在一个位置标记数据包。然后，网络中的所有 AP 都可以使用一条规则根据 DSCP 值设置数据包优先级。

### 根据 DSCP 设置 VLAN 或 WMM 优先级 {#set-vlan-or-wmm-priority-from-dscp}

在本示例中，当数据包通过无线接口路由时，AP 设备将根据 DSCP 设置 WMM 优先级。

```ros
/ip/firewall/mangle
add action=set-priority chain=forward new-priority=from-dscp out-interface=wlan2
```

:::info
当数据包通过网桥转发时，可以通过在网桥设置中使用 `use-ip-firewall=yes`，使数据包经过 IP mangle 规则。
:::

## 根据优先级设置 DSCP {#dscp-from-priority}

---

类似地，如果收到的数据包包含 VLAN 或 WMM 优先级，也可以设置 DSCP 值。这可以通过 IP mangle 规则中的 `new-dscp=from-priority` 或 `new-dscp=from-priority-to-high-3-bits` 设置以及 `change-dscp` 操作属性来实现。请注意，VLAN 或 WMM 数据包中的优先级值可以是 0-7，但 IP 报头中的 DSCP 是 0-63。使用 `new-dscp=from-priority` 设置时，优先级值将设置 DSCP 的低 3 位；使用 `new-dscp=from-priority-to-high-3-bits` 时，优先级值将设置 DSCP 的高 3 位。

但是，该设置不能直接使用从接收到的 VLAN 或 WMM 数据包中获取的 ingress priority。首先需要使用 IP mangle 或 bridge filter/nat 规则设置优先级（此时可以使用 ingress priority），然后再应用 DSCP 规则。

### 根据 VLAN 或 WMM 优先级设置 DSCP {#set-dscp-from-vlan-or-wmm-priority}

在本示例中，当数据包被路由时，AP 设备需要根据 WMM 优先级设置 DSCP。首先，添加一条用于设置优先级的规则。DSCP 规则需要该规则才能正确更改 DSCP 值。该规则可以从 ingress 获取优先级。然后添加 DSCP 规则以更改其值。

```ros
/ip/firewall/mangle
add action=set-priority chain=prerouting in-interface=wlan2 new-priority=from-ingress
add action=change-dscp chain=prerouting in-interface=wlan2 new-dscp=from-priority
```

:::info
当数据包通过网桥转发时，可以通过在网桥设置中使用 `use-ip-firewall=yes`，使数据包经过 IP mangle 规则。
:::

## 组合优先级设置和处理方案 {#combining-priority-setting-and-handling-solutions}

---

基于上述“构建模块”，可以通过组合不同的优先级信息承载方式来处理复杂网络和不同情况，以确保 QoS 并优化资源使用。以下是一些建议：

- 整个网络中的过滤规则越少越好（速度越快）。尽量仅在必要时对数据包进行分类，并优先在快速路由器上执行该操作，因为很可能需要连接跟踪。
- 使用 DSCP 在网络中转发的 IP 数据包中承载优先级信息。这样可以在需要时使用它。
- 在必要时使用 VLAN，因为它们也可以承载优先级信息。确保路径中的以太网网桥和交换机不会清除 VLAN tag 中的优先级信息。
- 请记住，QoS 不会提高链路吞吐量；它只是对不同数据包进行不同处理，并且无线链路上的 WMM 流量会在空中优先于普通流量。

## 另请参阅 {#see-also}

---

- [Packet Flow in RouterOS](/docs/firewall-and-quality-of-service/packet-flow-in-routeros)
- [IP mangle](/docs/firewall-and-quality-of-service/firewall/mangle)
- [Bridge firewall](/docs/bridging-and-switching#bridge-firewall)
