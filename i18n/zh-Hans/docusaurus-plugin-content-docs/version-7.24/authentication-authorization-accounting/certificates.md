---
title: "证书"
description: "本页介绍 MikroTik RouterOS 中的 Certificate management 菜单，涵盖证书模板创建、密钥大小和使用方式等配置属性，以及包括 ACME 客户端集成在内的证书管理。"
tags:
  - 'certificate'
  - 'crl'
  - 'trust-store'
  - 'letsencrypt'
source: https://manual.mikrotik.com/docs/7.24/authentication-authorization-accounting/certificates
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "authentication-authorization-accounting"
translated_at: "2026-11-28T11:05:14.673Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 概览 {#overview}

**子菜单：** `/certificate`

该通用菜单用于管理证书、添加模板、签发证书，以及管理 CRL 和 SCEP Clients。

### 证书模板 {#certificate-template}

Certificate templates 用于准备要签名的目标证书。

证书签名后或执行 certificate request 命令后，Certificate template 会立即被删除。

```ros
/certificate
add name=CA-Template common-name=CAtemp key-usage=key-cert-sign,crl-sign
add name=Server common-name=server
add name=Client common-name=client
```

要打印证书：

```ros
[admin@4k11] /certificate> print detail 
Flags: K - private-key; L - crl; C - smart-card-key; A - authority; I - issued, R - revoked; E - expired; T - trusted 
 0         name="CA-Template" key-type=rsa common-name="CAtemp" key-size=2048 subject-alt-name="" days-valid=365 key-usage=key-cert-sign,crl-sign 

 1         name="Server" key-type=rsa common-name="server" key-size=2048 subject-alt-name="" days-valid=365 
           key-usage=digital-signature,key-encipherment,data-encipherment,key-cert-sign,crl-sign,tls-server,tls-client 

 2         name="Client" key-type=rsa common-name="client" key-size=2048 subject-alt-name="" days-valid=365 
           key-usage=digital-signature,key-encipherment,data-encipherment,key-cert-sign,crl-sign,tls-server,tls-client 
```

#### Certificate template 属性 {#certificate-template-properties}

在证书模板创建过程中，可以定义并配置多个参数，以满足特定要求。

| 属性 | 说明 |
| :-- | :-- |
| **common-name** (*string*) | 证书通用名称 |
| **copy-from**(*name*) | 要复制常规设置的证书名称 |
| **country** (*string*) | 证书颁发者所在国家 |
| **days-valid** (*days* Default: **365**) | 证书签名后的有效天数 |
| **digest-algorithm** (*md5 \| sha1 \| sha256 \| sha384 \| sha512* Default: **sha256**) | 用于签名证书的哈希算法。 |
| **key-size** (*1024* \| *1536* \| *2048* \| *4096* \| *8192* \| *prime256v1* \| *secp384r1* \| *secp521r1* Default: **2048**) | 证书公钥大小 |
| **key-usage** (*code-sign* \| *crl-sign* \| *decipher-only* \| *dvcs* \| *encipher-only* \| *key-cert-sign* \| *ocsp-sign* \| *tls-client* \| *content-commitment* \| *data-encipherment* \| *digital-signature* \| *email-protect* \| *key-agreement* \| *key-encipherment* \| *timestamp* \| *tls-server* Default: **digital-signature,key-encipherment,data-encipherment,key-cert-sign,crl-sign,tls-server,tls-client)** | 证书用途 |
| **locality** (*string*) | 证书颁发者所在地区 |
| **name** (*string*) | 证书名称 |
| **organization** (*string*) | 证书颁发者组织 |
| **state** (*string*) | 证书颁发者所在州 |
| **subject-alt-name** (*DNS: \| IP: \| email:*) | 证书使用者替代名称 |
| **trusted** (*no \| yes*) | 是否信任证书。如果为 *yes*，证书将用于主机证书验证。 |
| **trust-store**(*all* \| *capsman* \| *dns* \| *email* \| *ipsec* \| *mqtt* \| *openflow* \| *radius* \| *sstp* \| *userman* \| *www* \| *api* \| *container* \| *dot1x* \| *fetch* \| *lora* \| *netwatch* \| *ovpn* \| *tr069* \| *wpa-eap* \| *wiliot* \| *logging* Default: **all**) | 指定可使用特定证书进行证书验证或信任链创建的服务（www、sstp）。 |
| **unit** (*string*) | 证书颁发者组织单位 |

### 证书属性 {#certificate-properties}

对于已签名的证书，除 *name、trusted* 和 *trust-store* 外，大多数属性为只读。

| 属性 | 说明 |
| :-- | :-- |
| **acme-status** *(string)* | ACME 客户端状态 |
| **common-name** (*string*) | 证书通用名称 |
| **copy-from**(*name*) | 要复制常规设置的证书名称 |
| **country** (*string*) | 证书颁发者所在国家 |
| **days-valid** (*days*) | 证书签名后的有效天数 |
| **digest-algorithm** (*md5 \| sha1 \| sha256 \| sha384 \| sha512*) | 用于签名证书的哈希算法 |
| **directory-url** *(string)* | ACME 客户端目录 URL |
| **domain-names** *(string)* | ACME 客户端使用的域名 |
| **key-size** (*1024* \| *1536* \| *2048* \| *4096* \| *8192* \| *prime256v1* \| *secp384r1* \| *secp521r1*) | 证书公钥大小 |
| **key-usage** (*code-sign* \| *crl-sign* \| *decipher-only* \| *dvcs* \| *encipher-only* \| *key-cert-sign* \| *ocsp-sign* \| *tls-client* \| *content-commitment* \| *data-encipherment* \| *digital-signature* \| *email-protect* \| *key-agreement* \| *key-encipherment* \| *timestamp* \| *tls-server*) | 证书用途 |
| **locality** (*string*) | 证书颁发者所在地区 |
| **organization** (*string*) | 证书颁发者组织 |
| **revoked** *(date)* | 证书吊销时间（仅适用于在特定设备中签名并吊销的证书） |
| **state** (*string*) | 证书颁发者所在州 |
| **subject-alt-name** (*DNS \| IP \| email*) | 证书使用者替代名称 |
| **trusted** (*no \| yes*) | 是否信任证书。如果为 *yes*，证书将用于主机证书验证。 |
| **trust-store**(*all* \| *capsman* \| *dns* \| *email* \| *ipsec* \| *mqtt* \| *openflow* \| *radius* \| *sstp* \| *userman* \| *www* \| *api* \| *container* \| *dot1x* \| *fetch* \| *lora* \| *netwatch* \| *ovpn* \| *tr069* \| *wpa-eap* \| *wiliot* \| *logging*) | 指定可使用特定证书进行证书验证或信任链创建的服务（www、sstp）。 |
| **unit** (*string*) | 证书颁发者组织单位 |
| **serial-number** (*string*) | 证书序列号 |
| **fingerprint** (*string*) | 证书指纹 |
| **akid** (*string*) | 证书颁发机构 ID |
| **skid** (*string*) | 证书使用者 ID |
| **issuer** (*string*) | 证书颁发机构 |
| **invalid-before** *(date)* | 证书尚未生效的日期和时间（生效开始日期）。 |
| **invalid-after** *(date)* | 证书不再有效的日期和时间（到期日期）。 |
| **expires-after** *(time)* | 到期前剩余时间 |
| **key-type** (*string*) | 私钥类型 |
| **ca** *(string)* | CA 证书名称（仅显示在特定设备中签名的证书） |

:::warning
如果移除 CA 证书，链中所有已签发的证书也会被移除。
:::

### 签名证书 {#sign-certificate}

证书应进行签名。在以下示例中，将对证书进行签名，并为服务器证书添加 CRL URL：

```ros
/certificate 
sign CA-Template 
sign Client      
sign Server ca-crl-host=192.168.88.1 name=ServerCA

```

检查证书是否已签名：

```ros
[admin@MikroTik] /certificate> print
Flags: K - private-key; L - crl; A - authority; T - trusted
Columns: NAME, COMMON-name, FINGERPRINT
#        NAME         COMMON  FINGERPRINT                                                     
0  K AT  CA-Template  CAtemp  0c7aaa7607a4dde1bbf33deaae6be7bac9fe4064ba47d64e8a73dcefad6cfc38
1  K AT  Client       client  b3ff25ecb166ea41e15733a7493003f3ea66310c10390c33e98fe32364c3659f
2  KLAT  ServerCA     server  152b88c9d81f4b765a59e2302e01efd1fbf11ceeed6e59f4974e87787a5bb980

```

如需视频示例，请点击[此处。](http://youtube.com/watch?v=i2A3YIQKfwY)

:::warning
密钥签名过程的时间取决于特定证书的密钥大小。对于 4k 及更高的值，在基于 CPU 的低性能设备上签名该证书可能需要较长时间。
:::

### 导出证书 {#export-certificate}

可以将客户端证书连同密钥以及 CA 证书导出为两种格式：PEM 或 PKCS12。

| 属性 | 说明 |
| :-- | :-- |
| **export-passphrase** (*string* 默认：**none**) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 用于导出证书私钥加密的口令。 |
| **file-name** (*string* 默认：**cert\_export\_[certificate name].crt/key/pkcs12**) | 导出的证书文件名。 |
| **type** (*pem \| pkcs12* 默认：**pem**) | 导出的证书类型。 <br/> 对于 PEM，证书将以 CRT 扩展名导出；如果指定了 export-passphrase，还会导出加密的私钥 KEY 文件。 <br/> 对于 PKCS12，证书将以 P12 扩展名导出；如果指定了 export-passphrase，导出的证书将包含加密的私钥。PKCS12 文件使用 AES 加密。 |

```ros
/certificate 
export-certificate CA-Template 
export-certificate ServerCA export-passphrase=yourpassphrase
export-certificate Client export-passphrase=yourpassphrase
```

导出的证书可在 */file* 部分中查看：

```ros
[admin@MikroTik] > file print
Columns: NAME, TYPE, SIZE, CREATION-TIME
#  NAME                         TYPE        SIZE  CREATION-TIME       
0  skins                        directory         2019-01-19 00:00:04
1  flash                        directory         2019-01-19 01:00:00
2  pub                          directory         2019-01-19 02:42:16
3  cert_export_CA-Template.crt  .crt file   1119  2019-01-19 04:15:21
4  cert_export_ServerCA.crt     .crt file   1229  2019-01-19 04:15:42
5  cert_export_ServerCA.key     .key file   1858  2019-01-19 04:15:42
6  cert_export_Client.crt       .crt file   1164  2019-01-19 04:15:55
7  cert_export_Client.key       .key file   1858  2019-01-19 04:15:55
```

:::warning
导出证书需要“sensitive”用户策略。
:::

### 导入证书 {#import-certificate}

要导入证书，必须先使用某种文件上传方法将证书上传到设备。

证书必须作为文件导入。

支持 PEM、DER、CRT、PKCS12 格式。PKCS12 导入支持 AES 和 3DES 解密。

| 属性 | 说明 |
| :-- | :-- |
| **name** (*string* 默认值：**file-name\_number**) | 将在证书管理器中显示的证书名称 |
| **file-name** (*string*) | 要导入的文件名 |
| **passphrase** (*string* 默认值：**none**) *[敏感](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 文件的密码短语（如果有） |
| **trusted** (*yes \| no* 默认值：yes) | 为导入的证书添加 *trusted* 标志 |
| **trust-store**(*all* \| *capsman* \| *dns* \| *email* \| *ipsec* \| *mqtt* \| *openflow* \| *radius* \| *sstp* \| *userman* \| *www* \| *api* \| *container* \| *dot1x* \| *fetch* \| *lora* \| *netwatch* \| *ovpn* \| *tr069* \| *wpa-eap* \| *wiliot* \| *logging*  默认值：**all**) | 指定可使用特定证书进行证书验证或信任链创建的服务（www、sstp）。 |

```ros
[admin@MikroTik] > /certificate/import file-name=certificate_file_name name=name_example passphrase=file_passphrase
     certificates-imported: 2
     private-keys-imported: 1
            files-imported: 1
       decryption-failures: 0
  keys-with-no-certificate: 0

[admin@MikroTik] > /certificate/print 
Flags: K - PRIVATE-KEY; T - TRUSTED
Columns: NAME, COMMON-NAME
#    NAME            COMMON-NAME                                                  
0 KT name_example    cert    
1  T name_example_1  ca   
```

### CRL

RouterOS 支持证书吊销列表（CRL）检查。

默认情况下，不使用 CRL，也不会验证证书的吊销状态。

在 [证书设置](#settings) 中启用 `crl-use=yes`，使系统根据 CRL 验证链中的每个证书，并设置 `crl-download=yes`，让 RouterOS 自动下载和更新 CRL。

可以通过提供 CRL URL 手动添加 CRL，也可以在导入包含 CRL Distribution Point 的证书时动态添加。

| 属性 | 说明 |
| :-- | :-- |
| **akid** (*string*) | CRL 颁发机构 ID |
| **cert**(*string*) | 添加 CRL Distribution Point 所用的证书（来自证书存储） |
| **dynamic** (*flag*) | CRL 是否为动态添加 |
| **expired** (*flag*) | CRL 是否已过期 |
| **fingerprint** (*string*) | CRL 指纹 |
| **Invalid** (*flag*) | CRL 是否无效（未更新） |
| **last-update** (*date*) | 上次 CRL 更新的日期和时间 |
| **next-update** (*date*) | 下次 CRL 更新的日期和时间 |
| **num** (*integer*) | CRL 编号 |
| **removed** (*integer*) | 已吊销证书的数量 |
| **signature** (*string*) | CRL 签名 |
| **url** (*string*) | CRL URL |
| **num** (*integer*) | CRL 编号 |

### 设置 {#settings}

`/certificate/settings` 用于配置[证书吊销列表](#crl)和[内置信任存储](#built-in-trust-store-authorities)设置。

| 属性 | 说明 |
| :-- | :-- |
| **builtin-trust-store** (*all* \| *default* \| *capsman* \| *dns* \| *email* \| *ipsec* \| *mqtt* \| *openflow* \| *radius* \| *sstp* \| *userman* \| *www* \| *api* \| *container* \| *dot1x* \| *fetch* \| *lora* \| *netwatch* \| *ovpn* \| *tr069* \| *wpa-eap* \| *wiliot* \| *logging* \| *untrusted* 默认：**default**) | 可以使用<a href="#built-in-trust-store-authorities">内置信任存储颁发机构</a>进行证书验证的服务。<br/> 当前默认项：<ul><li>fetch</li><li>mqtt</li><li>email</li><li>netwatch</li><li>container</li><li>lora</li><li>dns</li><li>www</li><li>reverse-proxy</li></ul> |
| **crl-download** (*yes \| no* 默认：**no**) | 是否自动下载或更新 CRL |
| **crl-store** (*ram \| system* 默认：**ram**) | 下载的 CRL 信息的存储位置 <br/> 对于使用 http 协议且“trusted=yes”的证书，CRL 将每小时自动更新一次（目前不支持 ldap 和 ftp） |
| **crl-use** (*yes \| no* 默认：**no**) | 是否使用 CRL |

:::warning
如果 *`/certificate/settings/set crl-use`* 设置为 *`yes`*，RouterOS 将检查证书链中的每个证书的 CRL，因此，应在设备中安装完整的证书链：从 Root CA、中间 CA（如果有）到用于特定服务的证书。
:::

导入根证书的[示例](http://youtube.com/watch?v=q9oMO3_jvBU)。

## ACME 客户端 {#acme-client}

ACME 客户端可通过 ACME 自动获取和续期多个 TLS 证书。

要通过 CLI 添加新的 ACME 客户端，请使用命令 `/certificate/add-acme`。

现有 ACME 客户端会显示在 Certificates 视图中，并标记为 `a`（acme-manage）标志。

域名必须解析到路由器，并且 TCP 端口 80 必须可从 WAN 访问（使用 HTTP-01 质询）。对于 IP Cloud `<id>.sn.mynetname.net` 域名，则改用 DNS-01 质询。

当证书有效期的 80% 已过去时，证书会自动续期。

如果在初始设置期间未获取到证书，则必须添加新的 ACME 客户端。

### 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **directory-url** (*string*) | ACME 目录 URL |
| **domain-names** (*string*) | 以逗号分隔的域名列表 |
| **eab-hmac-key** (*string*) | 用于 ACME External Account Binding 的 HMAC 密钥 |
| **eab-kid** (*string*) | 密钥标识符 |
| **name** (*string*) | ACME 客户端名称 |

### 手动续订 ACME {#manual-acme-renewal}

要手动触发 ACME 证书续订：

```ros
/certificate/acme-renew [name]
```

例如：

```ros
/certificate/acme-renew numbers=0
```

### Let's Encrypt 证书 {#lets-encrypt-certificate}

要使用自动证书续订获取 Let's Encrypt 证书，必须通过 `domain-names` 参数手动提供域名：

```ros
/certificate/add-acme domain-names=router.example.com
```

要为 [IP Cloud](/docs/network-management/cloud#ddns) 名称生成 Let's Encrypt 证书（例如 `example.sn.mynetname.net`），请将 `/ip/cloud` 菜单中的 `dns-name` 作为域名提供，或使用 `[/ip/cloud/get dns-name]` 内联读取：

```ros
/certificate/add-acme domain-names=[/ip/cloud/get dns-name]
```

:::info
如果未提供 `directory-url`，则使用 Let's Encrypt 目录。
:::

:::note
证书更新进行中时无法删除该证书。如果 ACME 证书续订失败并保持在错误状态，`remove` 命令将失败，并显示 `cannot remove certificate while acme update is in progress`。重启路由器，然后删除该证书。
:::

## SCEP

SCEP 使用 HTTP 协议和 base64 编码的 GET 请求。大多数请求不带认证和加密，但重要请求可以在必要时受到保护（使用收到的公钥加密或签名）。

RouterOS 中的 SCEP 客户端将：

- 从 CA 服务器或 RA（如果使用）获取 CA 证书。
- 用户应比较 CA 证书的指纹，或确认其来自正确的服务器。
- 使用临时密钥生成自签名证书。
- 向服务器发送证书请求。
- 如果服务器以状态 x 响应，则客户端会持续请求，直到服务器发送错误或批准。

SCEP 服务器仅支持颁发一个证书。RouterOS 还支持 renew 和 next-ca 选项：

- renew - 使用同一 CA 自动续订旧证书的可能性。
- next-ca - 将当前 CA 证书更改为新证书的可能性。

客户端会轮询服务器以检测任何变化，如果服务器通告 next-ca 可用，则客户端可以请求下一个 CA，或等待 CA 即将过期后再请求 next-ca。

如果服务器通告支持这些功能，RouterOS 客户端默认会尝试使用 POST、AES 和 SHA256。如果不支持上述算法，则客户端会尝试使用 3DES、DES 以及 SHA1、MD5。

SCEP 证书在其有效时间的 3/4 已过时续订。

## 内置信任存储证书颁发机构 {#built-in-trust-store-authorities}

RouterOS 包含一组内置根证书颁发机构，特定服务可使用这些证书颁发机构验证主机证书。

SMIPS 设备具有[精简的内置 CA 信任存储](#smips-built-in-cas)。

可使用内置根证书颁发机构的服务列表位于[设置](#settings)部分。

可以将 [DoH](/docs/network-management/dns) 与证书验证配合使用，无需手动导入相关根证书。

可在 System → Certificates → Built In CA 或 `/certificate/builtin/` 中访问内置根证书颁发机构列表。

### 内置 CA 列表 {#list-of-built-in-cas}

以下内置 CA 列表适用于除 SMIPS 之外的所有架构。

| 组织 | 通用名称 | Subject ID |
| :-- | :-- | :-- |
| Amazon | Amazon Root CA 1 | `8418CC8534ECBC0C94942E08599CC7B2104E0A08` |
| DigiCert Inc | DigiCert Assured ID Root CA | `45EBA2AFF492CB82312D518BA7A7219DF36DC80F` |
| DigiCert Inc | DigiCert Assured ID Root G2 | `CEC34AB99955F2B8DB60BFA97EBD56B59736A7D6` |
| DigiCert Inc | DigiCert Assured ID Root G3 | `CBD0BDA9E1980551A14D37A28379CE8D1D2AE484` |
| DigiCert Inc | DigiCert Global Root CA | `03DE503556D14CBB66F0A3E21B1BC397B23DD155` |
| DigiCert Inc | DigiCert Global Root G2 | `4E2254201895E6E36EE60FFAFAB912ED06178F39` |
| DigiCert Inc | DigiCert Global Root G3 | `B3DB48A4F9A1C5D8AE3641CC1163696229BC4BC6` |
| DigiCert Inc | DigiCert High Assurance EV Root CA | `B13EC36903F8BF4701D498261A0802EF63642BC3` |
| DigiCert, Inc. | DigiCert TLS ECC P384 Root G5 | `C151455059AB3EE72C5AFA2022120780887C116A` |
| DigiCert, Inc. | DigiCert TLS RSA4096 Root G5 | `51331CED3640AF17D325CD6968F2AF4E233EB341` |
| DigiCert Inc | DigiCert Trusted Root G4 | `ECD7E382D2715D644CDF2E673FE7BA98AE1C0F4F` |
| GlobalSign | GlobalSign | `3DE629489BEA07CA21444A26DE6EDED283D09F59` |
| GlobalSign nv-sa | GlobalSign Root CA | `607B661A450D97CA89502F7D04CD34A8FFFCFD4B` |
| GlobalSign | GlobalSign | `8FF04B7FA82E4524AE4D50FA639A8BDEE2DD1BBC` |
| GlobalSign | GlobalSign | `AE6C05A39313E2A2E7E2D71CD6C7F07FC86753A0` |
| GlobalSign nv-sa | GlobalSign Root E46 | `310A908FB6C69DD2444B80B5A2E61FB1124F1B95` |
| GlobalSign nv-sa | GlobalSign Root R46 | `035CAB738187A8CCB0A6D594E2369649FF05992C` |
| The Go Daddy Group, Inc. | | `D2C4B0D291D44C1171B361CB3DA1FEDDA86AD4E3` |
| GoDaddy.com, Inc. | Go Daddy Root Certificate Authority - G2 | `3A9A8507106728B6EFF6BD05416E20C194DA0FDE` |
| Sectigo Limited | Sectigo Public Server Authentication Root E46 | `D122DA4C59F14B5F2638AA9DD6EEEB0DC3FBA961` |
| Sectigo Limited | Sectigo Public Server Authentication Root R46 | `5673586495F9921AB0122A046279A14015882149` |
| The USERTRUST Network | USERTrust ECC Certification Authority | `3AE10986D4CF19C29676744976DCE035C663639A` |
| The USERTRUST Network | USERTrust RSA Certification Authority | `5379BF5AAA2B4ACF5480E1D89BC09DF2B20366CB` |
| Internet Security Research Group | ISRG Root X1 | `79B459E67BB6E5E40173800888C81A58F6E99B6E` |
| Internet Security Research Group | ISRG Root X2 | `7C4296AEDE4B483BFA92F89E8CCF6D8BA9723795` |
| ISRG | Root YE | `A3C8265A8EA14CD03563FC9B23C83AAE56F34F56` |
| ISRG | Root YR | `DEE75B60D0226D40287D3F0D01FEA4B552B45194` |

### SMIPS 内置 CA {#smips-built-in-cas}

SMIPS 设备的内置 CA 信任库经过精简：

| 组织 | 通用名称 | Subject ID |
| :-- | :-- | :-- |
| DigiCert Inc | DigiCert Global Root G2 | `4E2254201895E6E36EE60FFAFAB912ED06178F39` |
| Internet Security Research Group | ISRG Root X1 | `79B459E67BB6E5E40173800888C81A58F6E99B6E` |
| Internet Security Research Group | ISRG Root X2 | `7C4296AEDE4B483BFA92F89E8CCF6D8BA9723795` |
| ISRG | Root YE | `A3C8265A8EA14CD03563FC9B23C83AAE56F34F56` |
| ISRG | Root YR | `DEE75B60D0226D40287D3F0D01FEA4B552B45194` |
