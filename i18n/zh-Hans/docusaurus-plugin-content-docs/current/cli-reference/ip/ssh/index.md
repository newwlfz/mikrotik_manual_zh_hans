---
sidebar_key: "cli-reference/ip/ssh"
title: "ssh"
sidebar_label: 'ssh'
source: https://manual.mikrotik.com/docs/cli-reference/ip/ssh
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ssh {#ipssh}
**类型：** 设置目录

SSH 服务器设置（ciphers、转发、身份验证），以及路由器作为 SSH 客户端连接时用于验证远程服务器的设置。完整指南请参阅 [SSH](../../../management-tools/ssh.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="ciphers" typ="multi { array-id, cipher: enum (aes-gcm | aes-ctr | aes-cbc | 3des-cbc | null | auto)
 }">允许的加密算法列表。</ArgTableRow>
<ArgTableRow arg="forwarding-enabled" typ="enum (no | local | remote | both)">控制允许哪种 SSH 转发方式：`no` - 禁用 SSH 转发，`local` - 允许 SSH 客户端从服务器（路由器）发起连接，这也会控制动态转发，`remote` - 允许 SSH 客户端在服务器（路由器）上监听并转发传入连接，`both` - 同时允许本地和远程转发方式。</ArgTableRow>
<ArgTableRow arg="password-authentication" typ="enum (yes | no | yes-if-no-key)">当为用户配置了公钥授权时，是否允许密码登录。</ArgTableRow>
<ArgTableRow arg="publickey-authentication-options" typ="enum (none | touch-required | verify-required)">公钥身份验证选项。`touch-required` 选项会使采用 FIDO 身份验证器算法的公钥身份验证始终要求签名证明物理在场的用户已明确确认身份验证（通常通过触摸身份验证器）。`verify-required` 选项要求 FIDO 密钥签名证明用户已通过验证，例如通过使用 PIN。</ArgTableRow>
<ArgTableRow arg="strong-crypto" typ="bool">使用更强的加密、HMAC 算法，使用更大的 DH 素数并禁止较弱的：使用 256 和 192 bit 加密而不是 128 bits，禁用 null 加密，使用 sha256 进行哈希而不是 sha1，禁用 md5，使用 2048bit 素数进行 Diffie-Hellman 交换而不是 1024bit。</ArgTableRow>
<ArgTableRow arg="known-hosts-validation" typ="bool">根据存储在 [`known-hosts`](./known-hosts.md) 中的密钥，每当路由器作为 SSH 客户端连接时（fetch SFTP、[`/system/ssh`](../../system/ssh.md)、[`/system/ssh-exec`](../../system/ssh-exec.md)）验证服务器的主机密钥。在启用验证且没有存储匹配密钥的情况下，交互式客户端会显示服务器的指纹并询问 `do you want to trust this host key?`，而非交互式命令会失败并显示 `host key not trusted`。在新安装中，验证处于启用状态；升级后的路由器会保留之前的值。默认值：yes.</ArgTableRow>
<ArgTableRow arg="known-hosts-trusted-subnets" typ="object { subnets: ip6Prefix
 }">对于地址属于这些子网的服务器，即使启用了 `known-hosts-validation`，也跳过主机密钥验证。所列子网之外的主机仍会进行验证。</ArgTableRow>
<ArgTableRow arg="host-key-size" typ="enum (1024 | 1536 | 2048 | 4096 | 8192) { 1024:1024, 1536:1536, 2048:2048, 4096:4096, 8192:8192 }">重新生成主机密钥时的 RSA 密钥大小。</ArgTableRow>
<ArgTableRow arg="host-key-type" typ="enum (rsa | ed25519) { rsa:0, ed25519:3 }">主机密钥类型。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="host-key-fingerprint" typ="string">当前主机密钥的指纹。可用于验证你连接的是正确的路由器。</ArgTableRow>
</ArgTable>
