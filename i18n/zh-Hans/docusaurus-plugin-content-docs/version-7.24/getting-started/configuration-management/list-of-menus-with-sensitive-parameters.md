---
sidebar_key: "getting-started/configuration-management/list-of-menus-with-sensitive-parameters"
sidebar_position: 4
title: "带敏感参数的菜单列表"
sidebar_label: "带敏感参数的菜单列表"
description: "本页列出了配置密码、密钥和机密等敏感参数的 MikroTik RouterOS 菜单，并提供了每个菜单详细文档的链接。"
tags:
  - 'ipsec'
  - 'radius'
source: https://manual.mikrotik.com/docs/7.24/getting-started/configuration-management/list-of-menus-with-sensitive-parameters
captured_at: '2026-11-04T11:28:31+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

下面列出了可以配置敏感参数（仅在使用 [show-sensitive 参数](./index.md#configuration-export) 时显示，或者在 WinBox 设置中启用 "Hide password" 时隐藏）的菜单。有关更详细的信息，请参阅相应的菜单文档页面。

| 菜单 | 参数名称 | 页面链接 |
| :-- | :-- | :-- |
| `/container` | password | [Container#Container 配置](../../containers/index.md) |
| `/ip/hotspot` | mac-auth-password, password, otp-secret | [HotSpot - 强制门户#HotSpot 用户](../../authentication-authorization-accounting/hotspot-captive-portal/index.md) |
| `/iot` | password, key | password - [MQTT#代理](../../internet-of-things/mqtt/index.md)<br/> key - [Lora#服务器](../../internet-of-things/lora/general-properties.md#servers) |
| <code>/interface/gre</code><br/><code>/interface/gre6</code> | ipsec-secret | [GRE#属性](../../virtual-private-networks/gre.md) |
| <code>/interface/ipip</code><br/><code>/interface/ipipv6</code> | ipsec-secret | [IPIP#属性](../../virtual-private-networks/ipip.md) |
| <code>/interface/eoip</code><br/><code>/interface/eoipv6</code> | ipsec-secret | [EoIP#属性描述](../../virtual-private-networks/eoip.md) |
| `/interface/6to4` | ipsec-secret | [6to4#6to4-属性描述](../../virtual-private-networks/6to4.md) |
| `/interface/ppp-client` | password, pin | 进行中 [PPP](../../mobile-networking/ppp.md) |
| `/interface/sstp-client` | password | [SSTP#属性](../../virtual-private-networks/sstp.md) |
| <code>/interface/l2tp-server</code><br/><code>/interface/l2tp-client</code><br/><code>/interface/l2tp-ether</code> | ipsec-secret, password | ipsec-secret, password - [L2TP#L2TPClient](../../virtual-private-networks/l2tp/index.md#l2tp-client)<br/> ipsec-secret - [L2TP#L2TPServer](../../virtual-private-networks/l2tp/index.md#l2tp-server)<br/> ipsec-secret - [L2TP#L2TPEther](../../virtual-private-networks/l2tp/index.md#l2tp-ether) |
| `/interface/ovpn-client` | password | [OpenVPN#OVPNClient](../../virtual-private-networks/openvpn.md) |
| `/interface/pptp-client` | password | [PPTP#PPTPClient](../../virtual-private-networks/pptp.md) |
| `/interface/pppoe-client` | password | [PPPoE#PPPoEClient](../../virtual-private-networks/pppoe/index.md) |
| `/ppp/secret` | password | [PPP AAA#UserDatabase](../../authentication-authorization-accounting/ppp-aaa.md) |
| `/ppp/l2tp-secret` | secret | 进行中 |
| <code>/ip/ssh/export-host-key</code><br/><code>/ip/ssh/import-host-key</code> | passphrase | [SSH#SSHServer](../../management-tools/ssh.md) |
| `/ip/ipsec` | auth-key, enc-key, ppk-secret, secret, password, passphrase, key | auth-key, enc-key - [IPsec#InstalledSAs](../../management-tools/ssh.md)  secret, password - [IPsec#Identities](../../authentication-authorization-accounting/user.md)  ppk-secret - 进行中 [IPsec#Peers](../../high-availability-solutions/vrrp.md)  key, passphrase - 进行中 [IPsec#Keys](../../authentication-authorization-accounting/dot1x.md)|
| `/system/ssh-exec` | password | [SSH#SSHexec](../../management-tools/ssh.md) |
| `/user` | password, passphrase | [用户](../../virtual-private-networks/wireguard.md) |
| `/disk` | nvme-tcp-server-password, nvme-tcp-password, smb-server-password, smb-password, self-encryption-password, encryption-key, sshfs-password | nvme-tcp-server-password, nvme-tcp-password - [NVMe over TCP](../../storage/nvme-over-tcp.md)<br/> sshfs-password - 进行中 <br/> smb-server-password, smb-password - [SMB](../../storage/smb.md)<br/> self-encryption-password, encryption-key - [自加密硬盘（SED）](../../storage/self-encrypting-drives.md) |
| `/interface/vrrp` | password | [VRRP#参数](../../mobile-networking/lte-5g.md#lte-client) |
| `/interface/dot1x` | password | [Dot1X#客户端](../../network-management/socks/index.md) |
| `/interface/macsec` | cak | [MACsec#PropertyReference](../../bridging-and-switching/macsec.md) |
| `/interface/wireguard` | private-key, preshared-key, \**show-client-config* | [WireGuard](../../virtual-private-networks/wireguard.md) |
| `/interface/lte` | pin, password | [LTE/5G#LTEClient](../../mobile-networking/lte-5g.md#lte-client) |
| `/socks/users` | password | [SOCKS](../../network-management/socks/index.md) |
| `/ip/cloud` | vpn-private-key, vpn-peer-private-key, private-key | [Back To Home（远程回家）](../../network-management/cloud/back-to-home.md) |
| `/ip/smb` | password | [SMB#用户设置](../../system-information-and-utilities/ntp.md) |
| `/password` | old-password, new-password, confirm-new-password | 密码更改命令；没有专门的文档页面。 |
| `/radius` | secret | [RADIUS#RADIUSClient](../../authentication-authorization-accounting/radius.md) |
| `/routing` | password, tcp-md5-key, auth-key, key | password,key - [/routing/rip](../../cli-reference/routing/rip/instance.md)<br/> tcp-md5-key - [/routing/bgp/connection](../../cli-reference/routing/bgp/connection.md)<br/> auth-key - [/routing/ospf](../../cli-reference/routing/ospf/interface-template.md) |
| `/snmp/community` | authentication-password, encryption-password | [SNMP#CommunityProperties](../../diagnostics-monitoring-and-troubleshooting/snmp.md) |
| `/system/backup` | password | [备份](../../management-tools/romon.md) |
| `/system/ntp/key` | key-val | 进行中 [NTP](../../mobile-networking/sms.md) |
| `/system/swos/password` | new-password, confirm-new-password | SwOS 密码更改命令；没有专门的文档页面。 |
| `/system/package/local-update` | password | [软件包#LocalUpdate](../../system-information-and-utilities/e-mail.md) |
| `/system/license` | password | [RouterOS 许可证密钥#CHRLicenseLevels](../../management-tools/tr-069.md) |
| `/tool/romon` | secrets | [RoMON#配置](../../wireless/wifi/index.md) |
| `/tool/sms` | sim-pin, secret | [SMS#接收](../../wireless/w60g/index.md) |
| `/tool/email` | password | [电子邮件](../../virtual-private-networks/zerotier.md) |
| `/tr069-client` | connection-request-password, password | [TR-069#ConfigurationSettings](../../management-tools/tr-069.md) |
| `/user-manager` | web-private-password, paypal-password, shared-secret, password, otp-secret | shared-secret - [用户管理器#路由器](../../authentication-authorization-accounting/user-manager.md#routers)<br/> paypal-password, web-private-password - [用户管理器#高级](../../authentication-authorization-accounting/user-manager.md#advanced)<br/> password, otp-secret - [用户管理器#用户](../../authentication-authorization-accounting/user-manager.md#users) |
| `/interface/wifi` | passphrase, eap-password | [WiFi#SecurityProperties](../../wireless/wifi/index.md) |
| `/caps-man` | private-passphrase, passphrase | private-passphrase - [CAPsMAN#CAPsMANAccess-list](../../wireless/abgn/capsman/index.md#capsman-access-list)<br/> passphrase - [CAPsMAN#CAPsMANconfiguration](../../wireless/abgn/capsman/index.md#capsman-configuration) |
| `/interface/wireless` | static-key-0, static-key-1, static-key-2, static-key-3, static-sta-private-key, management-protection-key, nv2-preshared-key, private-key, private-pre-shared-key, wpa-pre-shared-key, wpa2-pre-shared-key, mschapv2-password | static-key-0, static-key-1, static-key-2, static-key-3, static-sta-private-key - [无线接口#WEPproperties](../../wireless/index.md)<br/> management-protection-key, private-key, private-pre-shared-key - [无线接口#Properties](../../wireless/index.md)<br/> wpa-pre-shared-key, wpa2-pre-shared-key - [无线接口#WPAproperties](../../wireless/index.md)<br/> mschapv2-password - [无线接口#WPAEAPproperties](../../wireless/index.md)<br/> nv2-preshared-key - [无线接口#Generalinterfaceproperties](../../wireless/index.md) |
| `/interface/w60g` | password | [W60G#通用接口属性](../../wireless/w60g/index.md) |
| `/zerotier` | identity | [ZeroTier#参数](../../virtual-private-networks/zerotier.md) |
| `/certificate` | export-passphrase, passphrase, challenge-password, pin, key-passphrase, challenge-passphrase | pin - 用于 card-reinstall 和 card-verify 命令，没有专门的文档页面。 <br/> export-passphrase - [Certificates#ExportCertificate](../../authentication-authorization-accounting/certificates.md#export-certificate)<br/> passphrase - [Certificates#ImportCertificate](../../authentication-authorization-accounting/certificates.md#import-certificate)<br/> challenge-password, key-passphrase, challenge-passphrase - 进行中 |
