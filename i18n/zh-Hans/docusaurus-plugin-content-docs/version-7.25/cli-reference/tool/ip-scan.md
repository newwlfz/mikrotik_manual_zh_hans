---
title: "ip-scan"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/ip-scan
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/ip-scan 
**条件：** !smips
**类型：** Command

发现网络中的主机，仅支持 IPv4。使用 `address-range` 时，路由器会探测该范围内的每个地址，并列出响应的主机；仅使用 `interface` 时，路由器不会进行探测，而是列出它在该接口流量中看到的地址。扫描会持续运行，直到你停止它或达到 `duration`。示例请参阅 [IP Scan](/docs/diagnostics-monitoring-and-troubleshooting/ip-scan)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="D" typ="dhcp">dhcp</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="interface" typ="iface_enum">Interface to listen on. Without `address-range`, the router sends no probes to the hosts and lists the addresses it sees in the traffic on this interface, including addresses from other subnets.</ArgTableRow>
<ArgTableRow arg="address-range" typ="ipRange">Addresses to scan: a prefix such as `192.168.88.0/24`, a range such as `192.168.88.1-192.168.88.254`, or a single address. On a directly connected subnet, the router finds hosts with ARP requests; on other networks, with ICMP echo requests. When `interface` is also given, the router scans the range.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="address" typ="ipAddr">Address of the host. The router's own address in the range is listed too.</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">MAC address of the host, from its ARP reply. Only for hosts on a directly connected subnet.</ArgTableRow>
<ArgTableRow arg="time" typ="num">Response time to an ICMP echo request. Empty when the host does not answer ping.</ArgTableRow>
<ArgTableRow arg="dns" typ="string">Name from a reverse DNS lookup of the address through the router's DNS resolver.</ArgTableRow>
<ArgTableRow arg="snmp" typ="string">System name (`sysName`) of the host, when it answers an SNMPv1 request with the community `public`.</ArgTableRow>
<ArgTableRow arg="netbios" typ="string">NetBIOS name of the host, when it answers a NetBIOS name query on UDP port 137.</ArgTableRow>
</ArgTable>
