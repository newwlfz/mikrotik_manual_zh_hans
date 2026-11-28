---
title: "media"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/media
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/media 
**条件：** !smips
**类型：** 目录

DLNA 媒体服务器。每个条目通过一个接口与播放器共享磁盘文件夹中的媒体文件：它在该接口上通过 SSDP 宣告自身，并通过 TCP 端口 2828 上的 HTTP 提供文件。标记为 `D` 的条目由磁盘媒体共享创建（`/disk` 中的 `media-sharing`，`/disk/settings` 中的 `auto-media-sharing`）。请参阅 [DLNA Media Server](/docs/storage/dlna)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">Disabled: the server does not run.</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">Dynamic: created by disk media sharing for a disk or tmpfs folder (`media-sharing` in `/disk`, or `auto-media-sharing` in `/disk/settings`), named after the identity and the disk slot. A dynamic entry cannot be edited or removed (`failure: can't edit dynamic object`); turn off the disk's `media-sharing` instead.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="path" typ="file">Folder on a disk whose media files the server shares, for example `usb1/media`, or the root folder of a disk (`usb1`). Without `path`, the server shares the whole file list of the router. Its subfolders show as folders. Video, music and picture files with a lower-case extension are listed; other files, and files with upper-case extensions such as `.MP4`, are not. When the folder does not exist, `status` shows `Error, can't find directory`.</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">Interface the server runs on. The server announces itself and serves requests only on this interface. The listeners accept connections on every interface, but a request for this server that arrives on another interface gets an HTTP 404 error; the firewall keeps the WAN out.</ArgTableRow>
<ArgTableRow arg="friendly-name" typ="string">Name players show for the server. Default: MikroTik Home Media Server.</ArgTableRow>
<ArgTableRow arg="allowed-ip" typ="ipAddr">The only IP address the server serves. Other devices get no content. One address only; a subnet is refused. `0.0.0.0` allows every device on the interface. Cannot be set together with `allowed-hostname`. Default: 0.0.0.0.</ArgTableRow>
<ArgTableRow arg="allowed-hostname" typ="string">Only the IP address of this host name, as known to the DHCP server of this router (the `host-name` of the lease), is allowed to access content. The match is exact and case-sensitive. Empty allows every device. Cannot be set together with `allowed-ip` (`failure: can't set both allowed IP and allowed hostname`).</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="status" typ="string">
- `Running` - The server runs and serves files.
- `Error, can't find directory` - The folder in `path` does not exist.
</ArgTableRow>
</ArgTable>
