---
title: "Container - HAProxy"
description: "本页介绍如何在 MikroTik RouterOS 中将 HAProxy 配置为 Container，并提供使用 Certbot 设置支持 HTTPS 的反向代理和负载均衡的分步说明。"
tags:
  - 'haproxy'
  - 'container'
  - 'https'
source: https://manual.mikrotik.com/docs/7.25/containers/user-guides/container-haproxy
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "memory"
---

HAProxy 是作为 Container 运行的高性能反向代理和负载均衡器。

为获得最佳安全性，强烈建议使用 HAProxy 这类反向 HTTP/HTTPS 代理作为外部用户和内部服务之间的中介，而不是将 Container 直接暴露到网络中。

## 配置 {#configuration}

要在 RouterOS 设备上设置 HAProxy Container，请按以下步骤操作。

:::info

继续操作前，请确保已创建 [Container network](/docs/7.24/containers#networking-examples)。
:::

1. 创建 HAProxy Container 挂载点。  

   ```routeros
   /container/mounts/add list=haproxy_etc src=disk1/haproxy-etc dst=/usr/local/etc/haproxy
   ```

2. 创建 HAProxy Container。  

   ```routeros
   /container/add remote-image=haproxy:latest interface=veth1 root-dir=disk1/haproxy mountlists=haproxy_etc user=0:0 name=haproxy
   ```

3. 使用 SFTP 客户端（例如，在 Microsoft Windows 上使用 WinSCP）连接到 RouterOS 设备，并创建新文件 `disk1/haproxy-etc/haproxy.cfg` ，可以使用以下配置作为示例。  

```cfg
defaults
  mode http
  timeout client 10s
  timeout connect 10s
  timeout server 10s
  timeout http-request 10s

frontend http_synapse
  bind *:80
  use_backend synapse

backend synapse
  server server1 172.17.0.2:8008 maxconn 32
```

1. 启动 HAProxy Container。  

   ```routeros
   /container/start [find where name=haproxy]
   ```

## 高级：使用 Certbot 的 HAProxy {#advanced-haproxy-with-certbot}

本示例说明如何配置 HAProxy 以提供 HTTPS 流量，并使用 Certbot 和 RFC2136 自动续订证书。

1. 创建 HAProxy 容器：  

   ```routeros
   /container/mounts/add list=MOUNT_HAPROXY src=disk1/volumes/haproxy/config dst=/usr/local/etc/haproxy
   /container/add remote-image=haproxy:latest interface=veth1 root-dir=disk1/images/haproxy mountlists=MOUNT_HAPROXY name=haproxy start-on-boot=yes user=0:0 logging=yes
   ```

2. 在 PC 上创建名为 `haproxy.cfg` 的新文件，并将其上传到 `disk1/volumes/haproxy/config/`，根据需要调整配置：  

```cfg
global
  log stdout format raw local0 info
  stats socket :9999 level admin expose-fd listeners
  ssl-default-bind-ciphers EECDH+AESGCM:EDH+AESGCM
  ssl-default-server-ciphers EECDH+AESGCM:EDH+AESGCM
  ssl-default-bind-options ssl-min-ver TLSv1.2
  ssl-default-server-options ssl-min-ver TLSv1.2
  tune.ssl.default-dh-param 2048
  tune.bufsize 43768
  tune.ssl.cachesize 1000000
  nbthread 8

defaults
  log global
  timeout client 10s
  timeout connect 10s
  timeout server 10s
  timeout http-request 10s

frontend frontend_webapp
  mode http
  option httplog
  option http-server-close
  option forwardfor except 127.0.0.0/8
  stick-table type ipv6 size 100k expire 30s store http_req_rate(10s)
  http-request track-sc0 src
  http-request deny deny_status 429 if { sc_http_req_rate(0) gt 10000 }
  bind *:80
  bind *:443 ssl crt /usr/local/etc/haproxy/certs/
  http-request redirect scheme https unless { ssl_fc }
  http-request set-header X-Forwarded-Host %[req.hdr(host)]
  http-request set-header X-Forwarded-For %[src]
  use_backend backend_webapp

backend backend_webapp
  mode http
  balance roundrobin
  option http-server-close
  option forwardfor
  server server1 172.17.0.2:8080

```

1. 创建 Certbot 容器：  

   ```routeros
   /container/mounts/add list=MOUNT_CERTBOT_CONFIG src=disk1/volumes/certbot/config dst=/etc/letsencrypt
   /container/mounts/add list=MOUNT_CERTBOT_DATA src=disk1/volumes/certbot/data dst=/var/lib/letsencrypt
   /container/mounts/add list=MOUNT_CERTBOT_LOG src=disk1/volumes/certbot/log dst=/var/log/letsencrypt
   /container/mounts/add list=MOUNT_CERTBOT_HAPROXY src=disk1/volumes/haproxy/config dst=/etc/haproxy
   /container/add remote-image=certbot/dns-rfc2136 cmd="certonly -n --agree-tos --dns-rfc2136 --dns-rfc2136-credentials /etc/letsencrypt/rfc2136.ini -m admin@<FQDN> --deploy-hook 'cat /etc/letsencrypt/li\
       ve/<FQDN>/fullchain.pem /etc/letsencrypt/live/<FQDN>/privkey.pem | tee /etc/haproxy/certs/<FQDN>.pem > /dev/null; echo -e \"set ssl cert /usr/local/e\
       tc/haproxy/certs/<FQDN>.pem <<\
       \n\$(cat /etc/haproxy/certs/<FQDN>.pem)\
       \n\" | nc 127.0.0.1:9999; echo \"commit ssl cert /usr/local/etc/haproxy/certs/<FQDN>.pem\" | nc 127.0.0.1:9999' -d <FQDN> --cert-name <FQDN>" \
       interface=veth1 logging=yes mountlists=MOUNT_CERTBOT_CONFIG,MOUNT_CERTBOT_DATA,MOUNT_CERTBOT_LOG,MOUNT_CERTBOT_HAPROXY name=certbot root-dir=\
       disk1/images/certbot start-on-boot=yes workdir=/opt/certbot

   ```

:::warning

确保将上例中的所有 `<FQDN>` 占位符替换为你的完全限定域名！
:::

1. 等待容器镜像下载完成，并启动 Certbot 容器：  

   ```routeros
   /container/start [find where name=certbot]
   ```

2. 检查日志，确认已成功获取新证书：  

   ```routeros
   /log/print follow
   ```

3. 启动 HAProxy 容器：  

   ```routeros
   /container/start [find where name=haproxy]
   ```

4. 设置计划任务，例如每天 06:30 检查是否有新证书：  

   ```routeros
   /system/scheduler
   add interval=1d name=SCHEDULE_RenewCertbot on-event=SCRIPT_RenewCertbot policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon start-date=\
       2025-03-10 start-time=06:30:00
   /system/script
   add dont-require-permissions=no name=SCRIPT_RenewCertbot owner=admin policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source=\
       "/container/start [find where name=\"certbot\"]"
   ```

5. Done

证书将自动续期并替换 HAProxy 中的旧证书，无需重启 Container。
