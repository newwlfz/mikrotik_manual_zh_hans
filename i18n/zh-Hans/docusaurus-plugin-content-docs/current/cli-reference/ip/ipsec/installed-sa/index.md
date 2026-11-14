---
sidebar_key: "cli-reference/ip/ipsec/installed-sa"
title: "installed-sa"
sidebar_label: 'installed-sa'
source: https://manual.mikrotik.com/docs/cli-reference/ip/ipsec/installed-sa
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ipsec/installed-sa {#ipipsecinstalled-sa}
**类型：** 目录

此菜单提供有关已安装安全关联的信息，包括密钥。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="S" typ="seen-traffic">SA 是否已有流量通过。</ArgTableRow>
<ArgTableRow arg="H" typ="hw-aead">是否使用硬件 AEAD 加速。</ArgTableRow>
<ArgTableRow arg="A" typ="AH">SA 是否使用 AH 协议。</ArgTableRow>
<ArgTableRow arg="E" typ="ESP">SA 是否使用 ESP 协议。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="spi" typ="num">安全参数索引值。</ArgTableRow>
<ArgTableRow arg="state" typ="enum (larval | mature | dying | dead) { larval:0, mature:1, dying:2, dead:3 }">当前 SA 状态。</ArgTableRow>
<ArgTableRow arg="auth-algorithm" typ="enum (none | md5 | sha1 | sha256 | sha512) { none:0, md5:2, sha1:3, sha256:5, sha512:7 }">认证算法。</ArgTableRow>
<ArgTableRow arg="enc-algorithm" typ="enum (none | des | 3des | null | aes-cbc | aes-ctr | aes-gcm | blowfish | twofish | camellia | chacha20poly1305) { none:0, des:2, 3des:3, null:11, aes-cbc:12, aes-ctr:13, aes-gcm:20, blowfish:7, twofish:253, camellia:22, chacha20poly1305:254 }">加密算法。</ArgTableRow>
<ArgTableRow arg="enc-key-size" typ="num">加密密钥长度（以位为单位）。</ArgTableRow>
<ArgTableRow arg="auth-key" typ="string">认证密钥值。</ArgTableRow>
<ArgTableRow arg="enc-key" typ="string">加密密钥值。</ArgTableRow>
<ArgTableRow arg="addtime" typ="date">SA 的添加时间。</ArgTableRow>
<ArgTableRow arg="expires-in" typ="time">SA 到期剩余时间。</ArgTableRow>
<ArgTableRow arg="add-lifetime" typ="composite { soft: time
, hard: time
 }">
SA 的添加生存时间，格式为 soft/hard：
- soft - 在此时间段之后，IKE 将尝试建立新的 SA；
- hard - 在此时间段之后，该 SA 将被删除。
</ArgTableRow>
<ArgTableRow arg="current-bytes" typ="num">SA 已处理的字节数。</ArgTableRow>
<ArgTableRow arg="current-packets" typ="num">SA 已处理的数据包数。</ArgTableRow>
<ArgTableRow arg="invalid-packets" typ="num">无效数据包数。</ArgTableRow>
<ArgTableRow arg="replay" typ="num">重放窗口大小。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="src-address" typ="super { src-address: alt { ipv6: ip6Addr
, ip: ipAddr
 }
, [port] :num
 }">源地址和端口。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="super { dst-address: alt { ipv6: ip6Addr
, ip: ipAddr
 }
, [port] :num
 }">目标地址和端口。</ArgTableRow>
</ArgTable>
