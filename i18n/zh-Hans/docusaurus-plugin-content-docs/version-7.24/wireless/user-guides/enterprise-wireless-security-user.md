---
title: "使用 User Manager v5 的企业无线安全"
description: "本指南介绍如何将 MikroTik RouterOS User Manager v5 配置为企业无线网络的认证服务器，涵盖安装、为 PEAP 和 EAP-TLS 等安全 EAP 方法生成 TLS 证书，以及配置使用基于证书认证的接入点。"
tags:
  - 'user-authentication'
  - 'tls-certificates'
  - 'eap'
source: https://manual.mikrotik.com/docs/7.24/wireless/user-guides/enterprise-wireless-security-user
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "wireless/user-guides"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

User Manager version 5（适用于 RouterOS v7）支持通过 Extensible Authentication Protocol（EAP）进行用户认证。

本指南将说明将 User Manager v5 配置为 MikroTik 无线接入点的认证服务器所需的步骤，并为用户提供 PEAP 和 EAP-TLS 认证方法。

本指南假设有一台独立设备运行 User Manager，网络地址为 10.0.0.10，并有 2 个接入点：一个地址为 10.0.0.11，另一个地址为 10.0.0.12。

## 安装 User Manager {#installing-user-manager}

User Manager v5 可在 [最新版 RouterOS v7](https://mikrotik.com/download) 的“Extra packages”归档中找到。

下载适用于相应 CPU 架构的归档，解压，将 User Manager 软件包上传到路由器并重启。

## 生成 TLS 证书 {#generating-tls-certificates}

使用安全的 EAP 方法时，客户端设备（supplicant）在向认证服务器发送自身凭据之前，会先验证认证服务器的身份。  
为此，认证服务器需要 TLS 证书。

该证书应：

1. 有效，并由客户端设备信任的证书颁发机构签名。
2. 在 Common Name（CN）和 Subject Alt Name 字段中包含完全限定域名。
3. 具有 Extended Key Usage 属性，指示其已授权用于 TLS 服务器身份验证。
4. 有效期不超过 825 天。

EAP-TLS 方法要求客户端设备具有 TLS 证书（而不是密码）。

要被 User Manager 视为有效，客户端证书必须：

1. 有效，并由运行 User Manager 的设备信任的机构签名
2. 在 Subject Alt Name（SAN）字段中包含用户名。为向后兼容，也可以将其添加到 CN 字段中。详情请参阅：[https://datatracker.ietf.org/doc/html/rfc5216#section-5.2](https://datatracker.ietf.org/doc/html/rfc5216#section-5.2)

最后，WPA3 enterprise 规范包含一种额外的安全模式，可提供 192 位加密安全性。

该模式要求使用 EAP-TLS，并使用满足以下条件的证书：

1. 使用 P-384 椭圆曲线密钥，或长度至少为 3072 位的 RSA 密钥。
2. 使用 SHA384 作为摘要（哈希）算法。

为简洁起见（并展示 RouterOS 的更多功能），本指南将介绍如何在运行 User Manager 的设备上生成所有证书，但在大型企业环境中，认证服务器和客户端设备应分别在本地生成私钥和证书签名请求，然后将 CSR 上传到证书颁发机构进行签名。

**在运行 User Manager 的设备上执行的命令：**

```ros
# Generating a Certificate Authority
/certificate
add name=radius-ca common-name="RADIUS CA" key-size=secp384r1 digest-algorithm=sha384 days-valid=1825 key-usage=key-cert-sign,crl-sign
sign radius-ca ca-crl-host=radius.mikrotik.test
# Generating a server certificate for User Manager
add name=userman-cert common-name=radius.mikrotik.test subject-alt-name=DNS:radius.mikrotik.test key-size=secp384r1 digest-algorithm=sha384 days-valid=800 key-usage=tls-server
sign userman-cert ca=radius-ca
# Generating a client certificate
add name=maija-client-cert common-name=maija@mikrotik.test subject-alt-name=email:maija@mikrotik.test key-usage=tls-client days-valid=800 key-size=secp384r1 digest-algorithm=sha384
sign maija-client-cert ca=radius-ca
# Exporting the public key of the CA as well as the generated client private key and certificate for distribution to client devices
export-certificate radius-ca file-name=radius-ca
# A passphrase is needed for the export to include the private key
export-certificate maija-client-cert type=pkcs12 export-passphrase="true zebra capacitor ziptie"
```

## 配置 User Manager {#configuring-user-manager}

**在运行 User Manager 的设备上执行的命令：**

```ros
# Enabling User Manager and specifying, which certificate to use
/user-manager
set enabled=yes certificate=userman-cert
# Enabling CRL checking to avoid accepting revoked user certificates
/certificate/settings
set crl-download=yes crl-use=yes
# Adding access points
/user-manager/router
add name=ap1 address=10.0.0.11 shared-secret="Use a secure password generator for this"
add name=ap2 address=10.0.0.12 shared-secret="Use a secure password generator for this too"
# Limiting allowed authentication methods
/user-manager/user/group
set [find where name=default] outer-auths=eap-tls,eap-peap
add name=certificate-authenticated outer-auths=eap-tls
# Adding users
/user-manager/user
add name=maija@mikrotik.test group=certificate-authenticated
add name=paija@mikrotik.test group=default password="right mule accumulator nail"
```

:::info
使用 CAPsMAN 控制器配置 AP 时，可以使用下面所示的完全相同配置来配置 CAP。只需为 CAP 配置 SSID 和 wpa2-eap/wpa3-eap 认证类型即可。  
使用 CAPsMAN 时，CAPsMAN 应作为 `/radius` 客户端（而不是下面独立设置示例中所示的 AP）。
:::

## 配置接入点 {#configuring-access-points}

### 运行常规无线软件包的 AP {#ap-running-regular-wireless-package}

**在 ap1 上执行的命令：**

```ros
# Configuring radius client
/radius
add address=10.0.0.10 secret="Use a secure password generator for this" service=wireless timeout=1s
/radius/incoming
set accept=yes
# Adding a security profile and applying it to wireless interfaces
/interface/wireless/security-profile
add name=radius mode=dynamic-keys authentication-types=wpa2-eap
/interface/wireless
set [find] security-profile=radius
```

### 运行 wifi-qcom 软件包的 AP {#ap-running-wifi-qcom-package}

**在 ap2 上执行的命令：**

```ros
# Configuring radius client
/radius
add address=10.0.0.10 secret="Use a secure password generator for this too" service=wireless timeout=1s
/radius/incoming
set accept=yes
# Configuring enabled authentication types. Can also be done via a security profile, but note that interface properties, if specified, override profile properties
/interface/wifi/set [find] security.authentication-types=wpa2-eap,wpa3-eap
```

wifi-qcom AP 也可以配置为使用更安全的 wpa3-eap-192 模式，但请注意，它要求所有客户端设备都支持 GCMP-256 加密套件并使用 EAP-TLS 身份验证。

## 客户端设备配置说明 {#notes-on-client-device-configuration}

### Windows

在 Windows 中手动安装 CA 时，请确保将其明确放入“Trusted Root Certification Authorities”证书存储区。它不会自动放置在那里。

### Android

连接到使用 EAP 身份验证的网络时，Android 设备会要求用户指定“domain”。这是指 RADIUS 服务器 TLS 证书中包含的主机名的预期域（在我们的示例中为“mikrotik.test”）。

默认情况下，Android 设备使用其内置的根 CA 列表来验证 RADIUS 服务器的证书。使用自己的 CA 时，需要在相应的下拉菜单中选择它。

### iOS

Apple iOS 似乎不会实际信任手动导入的 CA 来验证 RADIUS 服务器。除非使用 Apple 专有的“Configurator”工具或经批准的第三方 MDM 工具导入 CA，否则服务器证书会标记为“Not Trusted”。
