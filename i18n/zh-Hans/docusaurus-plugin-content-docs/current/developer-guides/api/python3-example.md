---
sidebar_key: "developer-guides/api/python3-example"
sidebar_position: 1
title: "Python3 示例"
sidebar_label: "Python3 示例"
description: "本页提供了一个 Python3 示例客户端，用于通过 RouterOS 的 API 与其交互，演示 sentence 交换、明文和旧版挑战-响应登录，以及通过 API 和 API-SSL 服务进行套接字通信。"
tags:
  - 'api'
  - 'management'
source: https://manual.mikrotik.com/docs/developer-guides/api/python3-example
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

一个简单的 Python3 API 客户端。

- 用法：`api.py <ip-address> <username> <password> <secure(True|False)>`，
  例如：`api.py 10.0.0.1 admin Badpassword123 False`（空密码也可以）
- 启动脚本后，逐行输入 API 语句中的单词，每行一个单词；每输入一个单词后按 Enter
- 空行会终止该语句并将其发送到路由器——在最后一个单词后按 **两次** Enter
- 在空行上按 `Ctrl-D` 退出
- 在输出中，`<<<` 标记客户端发送的单词，`>>>` 标记从路由器接收的单词

客户端首先尝试 plain-text 登录方法。如果路由器用质询（`=ret=`）来应答登录，客户端则改为完成旧版 challenge-response 交换。secure 选项连接到 API-SSL 服务（端口 8729）；路由器必须为 api-ssl 服务配置证书，并且客户端必须信任该证书（请参阅 [API 参考](./index.md)）。

对于旧版交换，空密码和质询 `93b438ec9b80057c06dd9fe67d56aa9a` 的响应是 `00e134102a9d330dd7b1849fedfea3cb57`——这对你自己的实现来说是一个有用的测试向量。

示例输出：

```bash
$ ./api.py 10.0.0.1 admin '' False
<<< /login
<<< =name=admin
<<< =password=
<<<
>>> !done
>>>
/system/identity/print

<<< /system/identity/print
<<<
>>> !re
>>> =name=MyRouter
>>>
>>> !done
>>>
```

```py
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

class ApiRos:
    """Client for the RouterOS binary API protocol."""

    def __init__(self, sk):
        self.sk = sk

    def login(self, username, pwd):
        # Plain-text login method first.
        for repl, attrs in self.talk(
            ["/login", "=name=" + username, "=password=" + pwd]
        ):
            if repl == "!trap":
                return False
            if "=ret" in attrs:
                # The router asked for the legacy challenge-response method.
                return self._login_legacy(username, pwd, attrs["=ret"])
        return True

    def _login_legacy(self, username, pwd, challenge):
        # The response is the MD5 digest of 0x00, the password and the
        # received challenge, prefixed with "00".
        chal = binascii.unhexlify(challenge)
        md = hashlib.md5()
        md.update(b"\x00")
        md.update(pwd.encode("utf-8"))
        md.update(chal)
        response = "00" + binascii.hexlify(md.digest()).decode("ascii")
        for repl, _attrs in self.talk(
            ["/login", "=name=" + username, "=response=" + response]
        ):
            if repl == "!trap":
                return False
        return True

    def talk(self, words):
        if self.write_sentence(words) == 0:
            return
        replies = []
        while True:
            i = self.read_sentence()
            if len(i) == 0:
                continue
            reply = i[0]
            attrs = {}
            for w in i[1:]:
                j = w.find("=", 1)
                if j == -1:
                    attrs[w] = ""
                else:
                    attrs[w[:j]] = w[j + 1:]
            replies.append((reply, attrs))
            if reply == "!done":
                return replies

    def write_sentence(self, words):
        count = 0
        for w in words:
            self.write_word(w)
            count += 1
        self.write_word("")
        return count

    def read_sentence(self):
        words = []
        while True:
            w = self.read_word()
            if w == "":
                return words
            words.append(w)

    def write_word(self, w):
        print("<<< " + w, flush=True)
        data = w.encode("utf-8")
        self.write_len(len(data))
        self.write_bytes(data)

    def read_word(self):
        w = self.read_bytes(self.read_len()).decode("utf-8", "replace")
        print(">>> " + w, flush=True)
        return w

    def write_len(self, l):
        if l < 0x80:
            self.write_bytes(bytes([l]))
        elif l < 0x4000:
            l |= 0x8000
            self.write_bytes(l.to_bytes(2, "big"))
        elif l < 0x200000:
            l |= 0xC00000
            self.write_bytes(l.to_bytes(3, "big"))
        elif l < 0x10000000:
            l |= 0xE0000000
            self.write_bytes(l.to_bytes(4, "big"))
        else:
            self.write_bytes(bytes([0xF0]) + l.to_bytes(4, "big"))

    def read_len(self):
        c = self.read_bytes(1)[0]
        if (c & 0x80) == 0x00:
            return c
        if (c & 0xC0) == 0x80:
            return ((c & ~0xC0) << 8) + self.read_bytes(1)[0]
        if (c & 0xE0) == 0xC0:
            b = self.read_bytes(2)
            return ((c & ~0xE0) << 16) + (b[0] << 8) + b[1]
        if (c & 0xF0) == 0xE0:
            b = self.read_bytes(3)
            return ((c & ~0xF0) << 24) + (b[0] << 16) + (b[1] << 8) + b[2]
        if (c & 0xF8) == 0xF0:
            return int.from_bytes(self.read_bytes(4), "big")
        # Any other first byte is a reserved control byte; the stream cannot
        # be decoded further.
        raise RuntimeError("received reserved control byte 0x%02x" % c)

    def write_bytes(self, b):
        n = 0
        while n < len(b):
            r = self.sk.send(b[n:])
            if r == 0:
                raise RuntimeError("connection closed by remote end")
            n += r

    def read_bytes(self, length):
        data = b""
        while len(data) < length:
            s = self.sk.recv(length - len(data))
            if s == b"":
                raise RuntimeError("connection closed by remote end")
            data += s
        return data

def open_socket(dst, port, secure=False):
    res = socket.getaddrinfo(dst, port, socket.AF_UNSPEC, socket.SOCK_STREAM)
    af, socktype, proto, _canonname, sockaddr = res[0]
    skt = socket.socket(af, socktype, proto)
    if secure:
        # The router's api-ssl service needs a certificate, and the client
        # must trust it. The name used here must match the certificate; to
        # connect by IP address, the certificate needs a matching IP address
        # entry.
        context = ssl.create_default_context()
        s = context.wrap_socket(skt, server_hostname=dst)
    else:
        s = skt
    s.connect(sockaddr)
    return s

def main():
    dst = sys.argv[1]
    user = "admin"
    passw = ""
    secure = False

    if len(sys.argv) > 2:
        user = sys.argv[2]
    if len(sys.argv) > 3:
        passw = sys.argv[3]
    if len(sys.argv) > 4:
        secure = sys.argv[4].lower() == "true"

    port = 8729 if secure else 8728
    s = open_socket(dst, port, secure)
    apiros = ApiRos(s)

    if not apiros.login(user, passw):
        print("login failed")
        s.close()
        return

    inputsentence = []
    while True:
        r = select.select([s, sys.stdin], [], [], None)
        if s in r[0]:
            apiros.read_sentence()
        if sys.stdin in r[0]:
            line = sys.stdin.readline()
            # Ctrl-D (EOF) on an empty line quits the client.
            if line == "":
                if inputsentence:
                    apiros.write_sentence(inputsentence)
                break
            line = line.rstrip("\r\n")
            if line == "":
                apiros.write_sentence(inputsentence)
                inputsentence = []
            else:
                inputsentence.append(line)

    # Best effort: read out replies that are still pending before closing the
    # connection (a listen command may still have updates in flight).
    s.settimeout(0.5)
    try:
        while True:
            apiros.read_sentence()
    except socket.timeout:
        pass
    s.close()

if __name__ == "__main__":
    main()
```

## 从脚本中使用客户端 {#use-the-client-from-a-script}

上面的示例是交互式的。要将其用于脚本，请直接使用客户端类：

```python

from api import ApiRos, open_socket  # the client above, saved as api.py

s = open_socket("10.0.0.1", 8728)
api = ApiRos(s)
if not api.login("admin", "S3cret"):
    sys.exit("login failed")
for repl, attrs in api.talk(["/system/resource/print", "=.proplist=uptime,cpu-load"]):
    if repl == "!re":
        print(attrs)
s.close()
```

`talk()` 返回一个由 `(reply, attributes)` 对组成的列表，直到并包括 `!done` 回复。返回数据的命令（例如 `print` 和 `getall`）会为每个项目产生一个 `!re` 对；无数据的命令只产生 `!done` 对；没有匹配项的 `print` 会产生一个 `!empty` 对。
