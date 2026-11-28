---
title: "wol"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/wol
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/tr069-client"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## tool/wol 
**类型：** Command

完整文档请参阅 [Wake on LAN](/docs/7.24/system-information-and-utilities/wake-on-lan)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="interface" typ="iface_enum">Interface to send the magic packet out of, for example the LAN bridge. With an interface, the router sends an Ethernet frame (EtherType `0x0842`) to the broadcast MAC address on it. Without an interface, it sends a UDP packet to `255.255.255.255` port 9 through the default route, which on most routers is the internet connection.</ArgTableRow>
<ArgTableRow arg="mac" typ="macAddr">MAC address of the computer to wake. The magic packet holds it 16 times.</ArgTableRow>
</ArgTable>
