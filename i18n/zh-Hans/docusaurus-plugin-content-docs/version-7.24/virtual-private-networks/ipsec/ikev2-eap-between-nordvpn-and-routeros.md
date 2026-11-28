---
title: "NordVPN 和 RouterOS 之间的 IKEv2 EAP"
description: "本页指导用户在 RouterOS v6.45+ 中使用 EAP 身份验证配置到 NordVPN 服务器的 IKEv2 安全隧道，涵盖根 CA 安装、服务器主机名查询、使用 Phase 1/2 配置文件和策略配置 IPsec 隧道、用于 EAP 身份验证的模式配置，以及对等体/身份凭据设置。"
tags:
  - 'ikev2'
  - 'ipsec'
  - 'vpn'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/ipsec/ikev2-eap-between-nordvpn-and-routeros
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "virtual-private-networks/ipsec"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

从 RouterOS v6.45 开始，可以使用 EAP 认证建立到 NordVPN 服务器的 IKEv2 安全隧道。本手册页介绍如何进行配置。

![](/img/fd0c91032452ce11.webp)

### 安装根 CA {#installing-the-root-ca}

首先下载并导入 NordVPN 根 CA 证书。

```
/tool/fetch url="https://downloads.nordvpn.com/certificates/root.der"
/certificate/import file-name=root.der

```

现在，“System/Certificates”菜单中应存在受信任的 NordVPN Root CA 证书。

```
[admin@MikroTik] > /certificate/print where name~"root.der"
Flags: K - private-key, L - crl, C - smart-card-key, A - authority, I - issued, R - revoked, E - expired, T - trusted 
 #         NAME            COMMON-NAME            SUBJECT-ALT-NAME                                         FINGERPRINT           
 0       T root.der_0      NordVPN Root CA                                                                 8b5a495db498a6c2c8c...

```

### 查找服务器主机名 {#finding-out-the-servers-hostname}

访问 [https://nordvpn.com/servers/tools/](https://nordvpn.com/servers/tools/) 并查找推荐服务器的主机名。在本例中，该主机名为 lv20.nordvpn.com。

![](/img/691115748c0365fa.webp)

### 设置 IPsec 隧道 {#setting-up-the-ipsec-tunnel}

建议创建单独的 Phase 1 profile 和 Phase 2 proposal 配置，以免影响任何现有或将来的 IPsec 配置。

```
/ip/ipsec/profile
add name=NordVPN
/ip/ipsec/proposal
add name=NordVPN pfs-group=none

```

虽然可以使用默认策略模板生成策略，但建议创建新的策略组和模板，以将此配置与其他 IPsec 配置分开。

```
/ip/ipsec/policy/group
add name=NordVPN
/ip/ipsec/policy
add dst-address=0.0.0.0/0 group=NordVPN proposal=NordVPN src-address=0.0.0.0/0 template=yes

```

创建一条 `responder=no` 的新 mode config 条目，用于向服务器请求配置参数。

```
/ip/ipsec/mode-config
add name=NordVPN responder=no

```

最后，创建 peer 和 identity 配置。在 `username` 和 `password` 参数中指定 NordVPN 凭据。

```
/ip/ipsec/peer
add address=lv20.nordvpn.com exchange-mode=ike2 name=NordVPN profile=NordVPN
/ip/ipsec/identity
add auth-method=eap certificate="" eap-methods=eap-mschapv2 generate-policy=port-strict mode-config=NordVPN peer=NordVPN policy-template-group=NordVPN username=support@mikrotik.com password=secret

```

验证连接是否成功建立。

```
/ip/ipsec
active-peers print
installed-sa print

```

### 选择通过隧道发送的内容 {#choosing-what-to-send-over-the-tunnel}

查看生成的动态策略时，可以看到只有具有特定源地址（由 mode config 接收）的数据包才会通过隧道发送。但在大多数情况下，路由器需要通过隧道路由特定设备或网络。此时，可以使用源 NAT 将数据包的源地址更改为与 mode config 地址匹配。由于 mode config 地址是动态的，因此无法创建静态源 NAT 规则。在 RouterOS 中，可以为 mode config 客户端生成动态源 NAT 规则。

#### 选项 1：通过隧道发送所有流量 {#option-1-sending-all-traffic-over-the-tunnel}

在本例中，路由器后面有一个本地网络 `10.5.8.0/24`，我们希望将该网络的所有流量通过隧道发送。首先，需要创建一个新的 IP/Firewall/Address list，其中包含本地网络。

```
/ip/firewall/address-list
add address=10.5.8.0/24 list=local
```

也可以仅指定单个主机，来自这些主机的所有流量都将通过隧道发送。示例：

```
/ip/firewall/address-list
add address=10.5.8.120 list=local
add address=10.5.8.23 list=local

```

完成后，可以将新建的 IP/Firewall/Address list 分配给 mode config 配置。

```
/ip/ipsec/mode-config
set [ find name=NordVPN ] src-address-list=local
```

验证隧道建立时是否正确动态生成了源 NAT 规则。

```
[admin@MikroTik] > /ip/firewall/nat/print 
Flags: X - disabled, I - invalid, D - dynamic 
 0  D ;;; ipsec mode-config
      chain=srcnat action=src-nat to-addresses=192.168.77.254 src-address-list=local dst-address-list=!local

```

:::info
Warning

确保动态 mode config 地址不属于本地网络。

**重要：** 也可以组合使用两个选项（1 和 2），以仅允许特定本地地址或网络访问特定地址。
:::

#### 选项 2：通过隧道访问特定地址 {#option-2-accessing-certain-addresses-over-the-tunnel}

也可以通过使用 Mangle 防火墙中的 connection-mark 参数，仅将特定流量通过隧道发送。其工作方式与选项 1 类似：根据 mode config 下配置的 connection-mark 参数生成动态 NAT 规则。

首先，在 mode config 配置下设置 connection-mark。

```
/ip/ipsec/mode-config
set [ find name=NordVPN ] connection-mark=NordVPN

```

完成后，将使用服务器提供的动态地址生成 NAT 规则：

```
[admin@MikroTik] > /ip/firewall/nat/print 
Flags: X - disabled, I - invalid, D - dynamic 
 0  D ;;; ipsec mode-config
      chain=srcnat action=src-nat to-addresses=192.168.77.254 connection-mark=NordVPN 

```

之后，可以使用 Mangle 防火墙将此 connection-mark 应用于任意流量。本示例中，访问 [mikrotik.com](http://mikrotik.com) 和 8.8.8.8 的流量被允许通过隧道。

创建新的地址列表：

```
/ip/firewall/address-list
add address=mikrotik.com list=VPN
add address=8.8.8.8 list=VPN

```

将 connection-mark 应用于匹配所创建地址列表的流量：

```
/ip/firewall/mangle
add action=mark-connection chain=prerouting dst-address-list=VPN new-connection-mark=NordVPN passthrough=yes

```

:::info
也可以组合使用两种选项（1 和 2），仅允许特定本地地址/网络访问特定地址
:::
