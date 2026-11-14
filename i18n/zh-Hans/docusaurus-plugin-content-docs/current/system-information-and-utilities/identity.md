---
sidebar_key: "system-information-and-utilities/identity"
sidebar_position: 6
title: "身份"
sidebar_label: "身份"
description: "`system identity`（系统标识）是路由器的名称，它显示在 CLI 提示符中、邻居发现中，并作为 SNMP 系统名称和 DHCP 客户端主机名使用。可在 CLI 中、WinBox 中或通过 SNMP 进行设置。"
tags:
  - 'system-identity'
  - 'snmp'
  - 'configuration'
source: https://manual.mikrotik.com/docs/system-information-and-utilities/identity
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

系统身份是路由器的名称。默认值为 `MikroTik`。请为每台路由器指定各自的名称，以便区分它们。该身份会出现在多个位置，包括：

- 在命令行提示符中，例如 `[admin@Riga-Office-GW] >`，以及 WinBox 连接的标题中。
- 在[邻居发现](./neighbor-discovery.md)中：相邻设备会以路由器的身份列出它，并在下一次通告时更新，默认每 30 秒更新一次。
- 作为 SNMP 系统名称（`sysName`）。
- 作为 [DHCP 客户端](../network-management/dhcp/client.md)默认发送给 DHCP 服务器的主机名。
- 作为旧版 `wireless` 软件包（[legacy wireless](../wireless/abgn/wireless-interface.md)）接口的默认 SSID。
- 在脚本中，作为 `[/system/identity/get name]`。

身份名称最长可达 64 个字符。更长的名称会被拒绝，并提示 `could not change identity: too long`。允许使用空格和其他字符，但需要加引号，例如 `name="Riga Office GW"`；由于 DHCP 主机名和 DNS 名称不允许空格，由字母、数字和连字符组成的名称可在所有场景中正常工作。

## 设置身份 {#set-the-identity}

当您管理多台路由器时，一个能说明路由器位置和用途的名称会很有帮助，例如 `Riga-Office-GW`：

```ros
/system/identity/set name=Riga-Office-GW
/system/identity/print
```

```text
  name: Riga-Office-GW
```

提示符会显示新名称：

```text
[admin@Riga-Office-GW] >
```

## 在 WinBox 中设置身份 {#set-the-identity-in-winbox}

在 WinBox 中，打开 **System > Identity**，在 **Identity** 字段中输入路由器名称（标注 1），然后选择 **OK**。请使用有助于将这台路由器与其他设备区分开的名称，例如 `Home-Router`。该名称也会显示在 WinBox 的连接标题中。

![WinBox Identity dialog with a callout around the Identity field](/img/973c005b796413a2.webp)

## 通过 SNMP 设置身份 {#set-the-identity-over-snmp}

管理系统可以通过对 `sysName.0`（`1.3.6.1.2.1.1.5.0`）发起 SNMP set 请求来设置身份。这需要一个具有写访问权限的 [SNMP](../diagnostics-monitoring-and-troubleshooting/snmp.md) community；默认 community `public` 只能读取，并会以 `readOnly` 拒绝 SNMPv1 set 请求。具有写访问权限的 community 还可以更改其他设置并重启路由器，因此请给它起一个难以猜测的名称，因为该名称会充当密码，并将其限制为管理系统的地址：

```ros
/snmp/community/add name=netadmin-7Qx2 addresses=192.168.88.10/32 \
    write-access=yes
/snmp/set enabled=yes
```

在管理系统中，例如在 Linux 或 macOS 上使用 `snmpset`：

```bash
snmpset -v 1 -c netadmin-7Qx2 192.168.88.1 1.3.6.1.2.1.1.5.0 s Branch-GW
```

```text
SNMPv2-MIB::sysName.0 = STRING: Branch-GW
```

SNMPv1 和 SNMPv2c 以明文发送 community 名称。只允许来自可信地址的写访问，或使用带身份验证和加密的 SNMPv3。除非您也限制其地址，否则 `public` community 仍可从任意地址读取。

有关该参数，请参阅 [`/system/identity` CLI 参考](../cli-reference/system/identity.md)。
