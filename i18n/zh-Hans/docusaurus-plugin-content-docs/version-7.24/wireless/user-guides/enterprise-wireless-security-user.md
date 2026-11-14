---
sidebar_key: "wireless/user-guides/enterprise-wireless-security-user"
sidebar_position: 1
title: "企业级无线安全与 User Manager v5"
sidebar_label: "企业级无线安全与 User Manager v5"
description: "本指南介绍如何将 MikroTik RouterOS User Manager v5 配置为企业无线网络的认证服务器，内容涵盖安装、为 PEAP 和 EAP-TLS 等安全 EAP 方法生成 TLS 证书，以及使用基于证书的认证来设置接入点。"
tags:
  - 'user-authentication'
  - 'tls-certificates'
  - 'eap'
source: https://manual.mikrotik.com/docs/7.24/wireless/user-guides/enterprise-wireless-security-user
captured_at: '2026-11-04T11:35:42+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

User Manager 版本 5（适用于 RouterOS v7）支持通过可扩展认证协议（EAP）进行用户认证。

本指南将说明将 User Manager v5 配置为 MikroTik 无线接入点的认证服务器所需的步骤，并向用户提供 PEAP 和 EAP-TLS 认证方法。

本指南假设有一台运行 User Manager 的独立设备，网络地址为 10.0.0.10，以及 2 个接入点——一个地址为 10.0.0.11，另一个为 10.0.0.12。

## 安装 User Manager {#installing-user-manager}

User Manager v5 可在 [RouterOS v7 最新版本](https://mikrotik.com/download)的 'Extra packages' 归档中找到。

下载适用于相应 CPU 架构的归档，将其解压，把 User Manager 软件包上传到路由器并重启路由器。

## 生成 TLS 证书 {#generating-tls-certificates}

使用安全 EAP 方法时，客户端设备（请求方）会在向认证服务器发送自身凭据之前验证认证服务器的身份。  
为此，认证服务器需要一张 TLS 证书。

该证书应：

1. 有效，并由客户端设备信任的证书颁发机构签名。
2. 在 Common Name (CN) 和 Subject Alt Name 字段中包含完全限定域名。
3. 具有 Extended Key Usage 属性，表明其获准用于认证 TLS 服务器。
4. 有效期不超过 825 天。

EAP-TLS 方法要求客户端设备拥有 TLS 证书（而不是密码）。

要被视为对 User Manager 有效，客户端证书必须：

1. 有效，并由运行 User Manager 的设备信任的机构签名
2. 在 Subject Alt Name (SAN) 字段中包含用户名。为向后兼容，也可以将其添加到 CN 字段。更多信息请参见：[https://datatracker.ietf.org/doc/html/rfc5216#section-5.2](https://datatracker.ietf.org/doc/html/rfc5216#section-5.2)

最后，WPA3 企业规范包含一种额外安全模式，可提供 192 位加密安全性。

此模式要求使用 EAP-TLS，并且证书必须：

1. 使用 P-384 椭圆曲线密钥或长度至少为 3072 位的 RSA 密钥。
2. 使用 SHA384 作为摘要（哈希）算法。

为简洁起见（并展示 RouterOS 的更多功能），本指南将演示如何在运行 User Manager 的设备上生成所有证书，但在大型企业环境中，认证服务器和客户端设备会各自在本地生成私钥和证书签名请求，然后将 CSR 上传到证书颁发机构进行签名。

**在运行 User Manager 的设备上执行的命令：**

```ros
# 生成证书颁发机构
/certificate
add name=radius-ca common-name="RADIUS CA" key-size=secp384r1 digest-algorithm=sha384 days-valid=1825 key-usage=key-cert-sign,crl-sign
sign radius-ca ca-crl-host=radius.mikrotik.test
# 为 User Manager 生成服务器证书
add name=userman-cert common-name=radius.mikrotik.test subject-alt-name=DNS:radius.mikrotik.test key-size=secp384r1 digest-algorithm=sha384 days-valid=800 key-usage=tls-server
sign userman-cert ca=radius-ca
# 生成客户端证书
add name=maija-client-cert common-name=maija@mikrotik.test subject-alt-name=email:maija@mikrotik.test key-usage=tls-client days-valid=800 key-size=secp384r1 digest-algorithm=sha384
sign maija-client-cert ca=radius-ca
# 导出 CA 的公钥以及生成的客户端私钥和证书，以便分发到客户端设备
export-certificate radius-ca file-name=radius-ca
# 导出时需要口令才能包含私钥
export-certificate maija-client-cert type=pkcs12 export-passphrase="true zebra capacitor ziptie"
```

## 配置 User Manager {#configuring-user-manager}

**在运行 User Manager 的设备上执行的命令：**

```ros
# 启用 User Manager 并指定要使用的证书
/user-manager
set enabled=yes certificate=userman-cert
# 启用 CRL 检查，以避免接受已吊销的用户证书
/certificate/settings
set crl-download=yes crl-use=yes
# 添加接入点
/user-manager/router
add name=ap1 address=10.0.0.11 shared-secret="Use a secure password generator for this"
add name=ap2 address=10.0.0.12 shared-secret="Use a secure password generator for this too"
# 限制允许的认证方式
/user-manager/user/group
set [find where name=default] outer-auths=eap-tls,eap-peap
add name=certificate-authenticated outer-auths=eap-tls
# 添加用户
/user-manager/user
add name=maija@mikrotik.test group=certificate-authenticated
add name=paija@mikrotik.test group=default password="right mule accumulator nail"
```

:::info
使用 CAPsMAN 控制器配置 AP 时，可以使用下面所示的完全相同配置来预配 CAP。只需为 CAP 预配 SSID + wpa2-eap/wpa3-eap 认证类型。  
使用 CAPsMAN 时，CAPsMAN 应为 `/radius` 客户端（而不是 AP，如下面的独立设置示例所示）。
:::

## 配置接入点 {#configuring-access-points}

### 运行常规 wireless 软件包的 AP {#ap-running-regular-wireless-package}

**在 ap1 上执行的命令：**

```ros
# 配置 radius 客户端
/radius
add address=10.0.0.10 secret="Use a secure password generator for this" service=wireless timeout=1s
/radius/incoming
set accept=yes
# 添加安全配置文件并将其应用到无线接口
/interface/wireless/security-profile
add name=radius mode=dynamic-keys authentication-types=wpa2-eap
/interface/wireless
set [find] security-profile=radius
```

### 运行 wifi-qcom 软件包的 AP {#ap-running-wifi-qcom-package}

**在 ap2 上执行的命令：**

```ros
# 配置 radius 客户端
/radius
add address=10.0.0.10 secret="Use a secure password generator for this too" service=wireless timeout=1s
/radius/incoming
set accept=yes
# 配置启用的认证类型。也可以通过安全配置文件完成，但请注意，如果指定了接口属性，接口属性会覆盖配置文件属性
/interface/wifi/set [find] security.authentication-types=wpa2-eap,wpa3-eap
```

wifi-qcom AP 也可以配置为使用额外安全的 wpa3-eap-192 模式，但请注意，这要求所有客户端设备支持 GCMP-256 加密算法并采用 EAP-TLS 认证。

## 客户端设备配置说明 {#notes-on-client-device-configuration}

### Windows {#windows}

在 Windows 中手动安装 CA 时，请确保将其显式放入 'Trusted Root Certification Authorities' 证书存储中。它不会自动放入该存储。

### Android {#android}

连接到使用 EAP 认证的网络时，Android 设备会要求用户指定一个 'domain'。这指的是 RADIUS 服务器 TLS 证书中包含的主机名的预期域（在我们的示例中为 'mikrotik.test'）。

默认情况下，Android 设备使用其内置根 CA 列表来验证 RADIUS 服务器的证书。使用你自己的 CA 时，需要在相应的下拉菜单中选择它。

### iOS {#ios}

Apple iOS 似乎实际上并不信任手动导入的 CA 来认证 RADIUS 服务器。除非使用 Apple 专有的 'Configurator' 工具或经批准的第三方 MDM 工具导入 CA，否则服务器证书会被标记为 'Not Trusted'。
