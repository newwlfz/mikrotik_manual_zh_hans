---
title: "back-to-home-user"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/cloud/back-to-home-user
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/cloud/back-to-home-user 
**Syscap：** cloud-vpn
**Type：** Directory

Back To Home（远程回家） 用户。每个用户都是 `back-to-home-vpn` 接口的 WireGuard 客户端，拥有自己的密钥和地址，路由器会为其添加动态 peer。Back To Home app 会为它建立的每条隧道创建一个用户：`name` 是手机型号标识符，例如 `iPhone18,1`，注释是 app 中显示的隧道名称。多个用户可以使用相同的名称。[`show-client-config`](/docs/cli-reference/ip/cloud/back-to-home-user/show-client-config) 可打印用户的客户端配置。只有在 Back To Home 运行时（`vpn-status: running`）才能添加用户；否则，`add` 会失败并返回 `back-to-home vpn not enabled`。撤销 Back To Home（[`/ip/cloud`](/docs/cli-reference/ip) 中的 `back-to-home-vpn=revoked-and-disabled`）会删除所有用户。有关概述，请参阅 [Back To Home](/docs/network-management/cloud/back-to-home)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">The user is disabled.</ArgTableRow>
<ArgTableRow arg="A" typ="active">The user is active.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Name of the user. Names do not have to be unique; the Back To Home app uses the phone's model identifier. The client configuration carries the user's comment, or the name when there is no comment, in the `# Name` comment line, which the Back To Home app uses as the tunnel name.</ArgTableRow>
<ArgTableRow arg="expires" typ="alt { expires: enum (never) { never:0xFFFFFFFF }
, interval: time
, date-time: date
 }">When the user stops working: `never` (default), a date and time such as `"2026-10-01 00:00:00"`, or a time interval such as `1d`. The router converts an interval to a date. The value cannot be changed after the user is created: `set` accepts it but keeps the old date. To change it, create the user again.</ArgTableRow>
<ArgTableRow arg="client-dns" typ="address (flags=46/)">DNS server written into the user's client configuration (`DNS =`). Without it, the configuration has no DNS line and the client keeps its own DNS servers.</ArgTableRow>
<ArgTableRow arg="client-allowed-address" typ="multi { client-allowed-address: address (flags=46/)
 }">Addresses the client sends through the tunnel, written into the client configuration as `AllowedIPs` of the router's peer, for example `192.168.88.0/24` for access to the local network only. Default: empty (`0.0.0.0/0, ::/0`, all traffic).</ArgTableRow>
<ArgTableRow arg="allow-lan" typ="bool">Whether the user can reach the local network. With `no`, the router puts the user's address in the dynamic address list `back-to-home-lan-restricted-peers`, and a dynamic forward rule drops its traffic to the `LAN` interface list, so the user can only use the internet through the router. Default: no.</ArgTableRow>
<ArgTableRow arg="private-key" typ="string">Private key of the user's client configuration. The router generates it when it is not set.</ArgTableRow>
<ArgTableRow arg="public-key" typ="string">Public key of the user. The router derives it from the generated key when it is not set.</ArgTableRow>
<ArgTableRow arg="file-access" typ="enum (disabled | read-only | full)">
Access of the user to files in `file-access-path` through the File Share service. Adding a user with file access makes the router request the File Share certificate.
- `disabled` (default) - No file access.
- `read-only` - Read files.
- `full` - Read and change files.
</ArgTableRow>
<ArgTableRow arg="file-access-path" typ="string">Directory the user can access with `file-access`, as `/file/print` shows it. Required when `file-access` is not `disabled`; otherwise, adding the user fails with `invalid files path`.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="client-address" typ="multi { address: address (flags=46/)
 }">IPv4 and IPv6 addresses of the user in the tunnel, the next free addresses from 192.168.216.0/24 and fc00:0:0:216::/64. The router assigns them; they cannot be set.</ArgTableRow>
<ArgTableRow arg="file-access-token" typ="string">Token the router generates for the user's file access. The client configuration includes it in a `# FilesToken` line when `file-access` is not `disabled`.</ArgTableRow>
</ArgTable>
