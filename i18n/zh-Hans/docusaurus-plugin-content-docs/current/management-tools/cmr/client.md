---
sidebar_key: "management-tools/cmr/client"
sidebar_position: 1
title: "CMR-客户端"
sidebar_label: "CMR-客户端"
description: "CMR 客户端是设备侧组件，它连接到 CMR 服务器并由其集中管理。"
tags:
  - 'cmr'
  - 'management'
source: https://manual.mikrotik.com/docs/management-tools/cmr/client
captured_at: '2026-11-09T11:35:47.715Z'
pagination_prev: "management-tools/cmr"
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

CMR 客户端是一台连接到 CMR 服务器并由其集中管理的 RouterOS 设备。CMR 客户端功能包含在 RouterOS 主软件包中。

:::warning
在采用 **smips** 和 **powerpc** 架构的设备上不支持 CMR-client。
:::

[`CMR-Client CLI Reference`](../../cli-reference/cmr/client.md) 提供了 `/cmr/client` 菜单中每个参数和命令的详细说明。

## 启用 CMR 客户端 {#enable-the-cmr-client}

客户端必须能够通过 TCP 端口 `54321` 访问 CMR 服务器。请在服务器的防火墙中以及客户端与服务器之间的任何防火墙中允许连接到此端口。

启用客户端并指定它应连接的 CMR 服务器：

```ros
[admin@MikroTik] > /cmr/client set enabled=yes controller-addresses=192.168.88.1 pairing-requirement=password
```

`controller-addresses` 不是必需的，但当你希望客户端连接到特定的 CMR 服务器，或者客户端无法通过邻居发现或 DNS 自动发现服务器时，建议设置它（CMR 指南的 [工作原理](../cmr.md#how-it-works) 部分对两者都有说明）。

客户端联系服务器并报告其配对状态。当前状态及其连接的服务器显示在只读参数 `status`、`controller-address` 和 `controller-identity` 中：

```ros
[admin@MikroTik] > /cmr/client print
  enabled: yes
  pairing-requirement: password
  controller-addresses: 192.168.88.1
  status: paired,connected
  controller-identity: CMR-1
  controller-address: 192.168.88.1
```

客户端使用 `cmr` 主题记录其 `status` 的每次变化，例如 `client status changed: paired,connected 192.168.88.1`，后跟服务器地址。当与服务器的连接断开时，例如服务器上的 CMR 重启期间，客户端会使用其现有配对重新连接。

## 将客户端与服务器配对 {#pair-the-client-to-the-server}

配对会将客户端与 CMR 服务器关联起来。无论客户端配置的 `pairing-requirement` 是什么，在本地运行 `pair` 命令始终会从客户端侧批准配对：

```ros
[admin@MikroTik] > /cmr/client/pair username=admin password=secret
Columns: ADDRESS, STATUS
ADDRESS         STATUS
192.168.88.1    paired
```

客户端与位于 `controller-addresses` 的服务器配对。仅当服务器配置为 `pairing-requirement=password` 时，才需要用户名和密码来满足服务器的要求。它们是服务器上 RouterOS 用户的凭据；CMR 没有单独的配对密码。通过提供这些凭据，客户端可远程满足服务器的要求。

客户端在 `/cmr/client` 菜单中也有自己的 `pairing-requirement`，它定义了在客户端接受配对之前服务器必须执行的操作。与 CMR 服务器一样，客户端支持 `none`、`password` 和 `confirm`，默认值为 `password`。使用 `confirm` 时，只有在客户端上运行 `/cmr/client/pair` 后配对才会完成。[配对](../cmr.md#pairing) 部分说明了两个设备上的要求如何组合。

## 断开客户端连接 {#disconnect-the-client}

要忘记配对并断开客户端与服务器的连接：

```ros
[admin@MikroTik] > /cmr/client/forget
```

禁用客户端（`/cmr/client set enabled=no`）会移除 CMR 在设备上预配的配置。再次启用它会使用现有配对重新连接客户端。

## 故障排除 {#troubleshooting}

`/cmr/client print` 中的 `status` 和 `pairing-status` 值显示连接或配对停止的位置。`pairing-status` 列出服务器地址、服务器的配对状态（`cmr:`）以及客户端自身的配对状态（`device:`）。

- `status: searching` - 客户端尚未找到 CMR 服务器。请将 `controller-addresses` 设置为该服务器的 IP 地址，或检查客户端能否通过 TCP 端口 `54321` 访问该服务器，以及防火墙是否允许该连接。
- `status: waiting-for-pairing,connected` 且 `pairing-status: 192.168.88.1: cmr:waiting confirmation, device:ok` - 客户端已接受配对并处于已连接状态，服务器正在等待本地批准，因为其 `pairing-requirement` 为 `confirm`。在服务器上，该设备会列在 `/cmr/device` 中，并带有 **P**（pending，待处理）标志。请在服务器上为该设备运行 [`/cmr/device/pair`](../../cli-reference/cmr/device/pair.md)。
- `status: paired,disconnected`，且该设备未列在服务器上 - 客户端仍保留着与一个已无法访问的服务器（例如先前的某个 CMR 服务器）的配对。作为变通方法，请忘记该配对并重新启用客户端，使其与 `controller-addresses` 中的服务器进行配对：

  ```ros
  [admin@MikroTik] > /cmr/client/forget
  [admin@MikroTik] > /cmr/client set enabled=yes controller-addresses=192.168.88.1
  ```

在 CMR 服务器本身上，`/cmr/client print` 会显示注释 "settings ignored because used by local controller"。该服务器通过其本地控制器管理自身，因此服务器上的 `/cmr/client` 设置不会生效。
