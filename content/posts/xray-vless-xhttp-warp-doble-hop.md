---
title: "Xray VLESS + XHTTP + TLS Relay, WARP: Настройка надёжного проксирования через два сервера"
draft: false
meta_desc: "В этом уроке пошагово настраиваем Xray на двух серверах, Caddy reverse proxy, VLESS + XHTTP + TLS, WARP как выходной канал."
date: 2026-05-06T12:00:00
tags:
- криптография
- проксирование
---

Итак, сегодня мы поговорим о том, <strong>как пошагово настроить проксирование вашего трафика через два сервера</strong>. Мы установим Xray, используем Caddy как reverse proxy, задействуем связку VLESS + XHTTP + TLS, а также используем WARP как выходной канал.

Это может быть полезно, если вы беспокоитесь о приватности и хотите спрятать свой реальный IP. Скажу сразу, что любой человек имеет право на разумный уровень приватности, доступ к независимой информации и на тайну личной переписки без каких-либо объяснений. Впрочем, в рамках данной статьи мы просто решаем сферическую инженерную задачу в вакууме ради спортивного интереса. Учтите, что:

- Эта статья носит исключительно информационный и образовательный характер. Это не юридическая, техническая или иная профессиональная консультация.
- Я не могу гарантировать, что представленные инструкции подходят хоть для чего-нибудь. Вы следуете им на свой страх и риск. Если вы не понимаете, что и зачем вы делаете, возможно, лучше этого не делать вовсе. Я не могу гарантировать, что всё это будет работать в вашей среде.
- Я не агитирую вас к чему бы то ни было &mdash; мы просто обсуждаем современные технологии, ничего больше.
- Никогда не используйте эти технологии в злонамеренных целях: не пытайтесь атаковать чужую инфраструктуру, нарушать правила сервисов и вообще быть плохишом. Это средство для разумного уровня приватности, а не магический плащ-невидимка для крутых хакеров. Как говорил О. Бендер, уголовный кодекс нужно чтить.
- Использование данных технологий может быть ограничено или запрещено в некоторых странах, так что самостоятельно изучите законодательство.

<div class="callout">
  <p><b>Видеоурок по данной теме <a href="https://www.youtube.com/watch?v=YdV-09GmezA">доступен на YouTube</a></b>. Также вас может заинтересовать <a href="https://www.youtube.com/watch?v=5_67h-HjwfA&list=PLWlFXymvoaJ9eyhChuHFyRrw0nLQfrey8">весь плейлист по технологиям проксирования</a>, где рассказывается много чего интересного.</p>

  <p>Также можно <a href="https://t.me/dev_in_ruby_colors">подписаться на мой канал в Telegram</a> или <a href="https://t.me/joinchat/MxYT6-01eeA1NTYy">вступить в наш чат для любителей IT</a>.</p>
</div>

## Что нам потребуется

- Два сервера. Можно купить VPS, предложений на рынке выше крыши. Главное, чтобы был публичный IP и доступ с правами root
- Установленная ОС (Linux). Мы будем использовать Ubuntu (24 или 26), но подойдут и другие дистрибутивы, просто команды могут несколько отличаться. Windows здесь не рассматривается. Учтите также, что я не показываю полный процесс настройки сервера с нуля &mdash; мы будем выполнять лишь минимально необходимые действия. Если вы хотите узнать, как настроить вход на сервер по ключам, сделать свой DNS resolver, врубить BBR и прочее, <a href="https://www.youtube.com/watch?v=5_67h-HjwfA&list=PLWlFXymvoaJ9eyhChuHFyRrw0nLQfrey8">то смотрите отдельное видео</a>, где также описана более простая схема проксирования. Вообще, многое из этого видео я действительно советую сделать.
- Купленное доменное имя, которое указывает на IP одного из двух серверов (запись типа `A` либо `AAAA`). Поддомен тоже подойдёт.
- Установленный терминал.
- Базовое понимание команд Linux или по крайней мере опыт работы в терминале.

## Общая схема настройки

Итак, у нас будет два сервера, которые мы условно назовём <del>буквами "эм" и "жо"</del> "промежуточный" и "внешний":

- **Промежуточный сервер** (сокращённо "сервер А") &mdash; это тот сервер, куда будет подключаться ваш клиент. Он будет проксировать трафик дальше на внешний сервер.
- **Внешний сервер** (сокращённо "сервер Б") будет выпускать трафик непосредственно в интернет через такой сервис, как **WARP**. Ваше купленное доменное имя должно как раз указывать на адрес сервера Б.
  + WARP &mdash; это поделка Cloudflare, которая позволяет бесплатно пропускать через себя трафик. В результате, когда трафик наконец доезжает до нужного сервиса, этот сервис будет видеть не IP вашего выходного сервака, а IP, принадлежащий Cloudflare. Это может быть удобно для скрытия IP или для случаев, когда какой-то ресурс наотрез отказывается вас впустить, так как вы "используете VPN". Впрочем, наличие WARP в этой схеме не является обязательным.

Короче, сервер А принимает трафик клиента, шлёт его на сервер Б, а тот уже выпускает всё это в бескрайние просторы интернета. Не перепутайте, где какая команда запускается!

Кстати, отмечу, что на сервере А при желании можно не устанавливать Xray, а просто сделать его тупым передатчиком с помощью решения socat (спасибо за идею зрителю на YouTube).

## Установка и настройка Xray на сервере А

Итак, на севере диком... Точнее, на сервере промежуточном устанавливаем Xray:

```plain
sudo apt update && sudo apt install -y curl jq openssl

bash <(curl -Ls https://github.com/XTLS/Xray-install/raw/main/install-release.sh)

xray version
```

Если выдалась версия Xray, то всё хорошо.

Теперь немного понастраиваем всё это дело:

```plain
sudo vim /usr/local/etc/xray/config.json
```

Вам потребуется следующая конфигурация:

```json
{
  "log": {
    "access": "/var/log/xray/access.log",
    "error": "/var/log/xray/error.log",
    "loglevel": "warning"
  },
  "dns": {
    "servers": [
      "1.1.1.1",
      "8.8.8.8"
    ],
    "queryStrategy": "UseIPv4"
  },
  "inbounds": [
    {
      "tag": "client-xhttp-reality-in",
      "listen": "0.0.0.0",
      "port": 443,
      "protocol": "vless",
      "settings": {
        "clients": [
          {
            "id": "CLIENT_UUID",
            "email": "main-client",
            "flow": "xtls-rprx-vision"
          }
        ],
        "decryption": "CLIENT_TO_A_DECRYPTION"
      },
      "streamSettings": {
        "network": "xhttp",
        "security": "reality",
        "xhttpSettings": {
          "path": "/assets",
          "mode": "stream-one"
        },
        "realitySettings": {
          "show": false,
          "dest": "www.microsoft.com:443",
          "xver": 0,
          "serverNames": [
            "www.microsoft.com"
          ],
          "privateKey": "A_REALITY_PRIVATE_KEY",
          "shortIds": [
            "A_REALITY_SHORT_ID"
          ]
        }
      },
      "sniffing": {
        "enabled": true,
        "destOverride": [
          "http",
          "tls",
          "quic"
        ]
      }
    },
    {
      "tag": "local-test-socks",
      "listen": "127.0.0.1",
      "port": 10808,
      "protocol": "socks",
      "settings": {
        "udp": true
      }
    }
  ],
  "outbounds": [
    {
      "tag": "relay-b",
      "protocol": "vless",
      "settings": {
        "vnext": [
          {
            "address": "SERVER_B_DOMAIN",
            "port": 443,
            "users": [
              {
                "id": "A_TO_B_UUID",
                "encryption": "A_TO_B_ENCRYPTION",
                "flow": "xtls-rprx-vision",
                "packetEncoding": "xudp"
              }
            ]
          }
        ]
      },
      "streamSettings": {
        "network": "xhttp",
        "security": "tls",
        "tlsSettings": {
          "serverName": "SERVER_B_DOMAIN",
          "alpn": [
            "h2",
            "http/1.1"
          ],
          "fingerprint": "chrome"
        },
        "xhttpSettings": {
          "path": "/assets",
          "mode": "stream-one"
        },
        "sockopt": {
          "domainStrategy": "UseIPv4"
        }
      }
    },
    {
      "tag": "direct",
      "protocol": "freedom",
      "settings": {
        "domainStrategy": "UseIPv4"
      }
    },
    {
      "tag": "block",
      "protocol": "blackhole"
    }
  ],
  "routing": {
    "rules": [
      {
        "type": "field",
        "inboundTag": [
          "client-xhttp-reality-in",
          "local-test-socks"
        ],
        "outboundTag": "relay-b"
      }
    ]
  }
}
```

Вставьте в этот конфиг *свои* значения, в частности:

- `CLIENT_UUID` генерируется через `xray uuid`, потом это надо будет сообщить клиенту
- `CLIENT_TO_A_DECRYPTION` генерируется через `xray vlessenc`, оттуда берётся блок `decryption`. Учтите, что там будет их два варианта, выбирайте один. Только не потеряйте вывод этой команды, нам ещё потребуется парное значение.
- `A_REALITY_PRIVATE_KEY` создаётся через `xray x25519`, откуда берётся private key, опять же не потеряйте вывод команды.
- `A_REALITY_SHORT_ID` создаётся через `openssl rand -hex 8`, это потребуется и для клиента.
- `SERVER_B_DOMAIN` &mdash; доменное имя сервера Б.
- `A_TO_B_UUID` генерируется через `xray uuid`, потом это же значение используем на Б.
- `A_TO_B_ENCRYPTION` генерируется через `xray vlessenc`, отсюда берётся блок `encryption` (потому что `decryption` пойдёт на сервер Б).

Заметьте, что в конфиге также добавлен `"tag": "local-test-socks"`. Это временная штука, которую мы используем для тестирования канала между А и Б. После теста её можно убрать.

<div class="callout">
<p>Трафик между клиентом и сервером можно дополнительно защитить с помощью Finalmask. <a href="https://www.youtube.com/watch?v=P85lXHhoNxI&list=PLWlFXymvoaJ9eyhChuHFyRrw0nLQfrey8&index=7">Про это у меня есть отдельный урок</a>.</p>
</div>

Теперь всё проверяем и запускаем:

```plain
sudo /usr/local/bin/xray run -test -config /usr/local/etc/xray/config.json

sudo systemctl enable --now xray

sudo systemctl restart xray

sudo systemctl status xray
```

Если никаких ошибок нет, двигаемся дальше.

## Установка Xray и Caddy на сервере Б

Теперь переходим на внешний сервер Б и устанавливаем Xray:

```plain
sudo apt update
sudo apt install -y curl jq debian-keyring debian-archive-keyring apt-transport-https ca-certificates gnupg

bash -c "$(curl -L https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ install -u root
```

Теперь ставим там Caddy (если хотите, можно и nginx, только сертификаты правильно выпустите):

```plain
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
  | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg

curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
  | sudo tee /etc/apt/sources.list.d/caddy-stable.list

sudo chmod o+r /usr/share/keyrings/caddy-stable-archive-keyring.gpg
sudo chmod o+r /etc/apt/sources.list.d/caddy-stable.list

sudo apt update
sudo apt install -y caddy
```

## Данные для WARP на сервере Б

Всё на том же сервере Б можно получить данные для коннекта через WARP, если вы хотите его использовать. Это необязательно и добавит дополнительный промежуточный узел, что не лучшим образом может сказаться на скорости.

Запускаем:

```plain
bash -c "$(curl -L warp-reg.vercel.app)"
```

Вам будет выведен объект JSON, оттуда потребуется следующая информация:

```plain
private_key   -> WARP_SECRET_KEY
public_key    -> WARP_PUBLIC_KEY
reserved_dec  -> WARP_RESERVED
endpoint.v4   -> WARP_ENDPOINT
v4            -> WARP_ADDRESS
```

Пока просто сохраните эти данные куда-нибудь.

## Настройка Xray на сервере Б

Открываем конфигурацию Xray на сервере Б:

```plain
sudo vim /usr/local/etc/xray/config.json
```

Редактируем так:

```json
{
  "log": {
    "access": "/var/log/xray/access.log",
    "error": "/var/log/xray/error.log",
    "loglevel": "warning"
  },
  "dns": {
    "servers": [
      "1.1.1.1",
      "8.8.8.8"
    ],
    "queryStrategy": "UseIPv4"
  },
  "inbounds": [
    {
      "tag": "vless-xhttp-from-a",
      "listen": "127.0.0.1",
      "port": 10085,
      "protocol": "vless",
      "settings": {
        "clients": [
          {
            "id": "A_TO_B_UUID",
            "email": "server-a",
            "flow": "xtls-rprx-vision"
          }
        ],
        "decryption": "A_TO_B_DECRYPTION"
      },
      "streamSettings": {
        "network": "xhttp",
        "security": "none",
        "xhttpSettings": {
          "path": "/assets",
          "mode": "stream-one"
        }
      },
      "sniffing": {
        "enabled": true,
        "destOverride": [
          "http",
          "tls",
          "quic"
        ]
      }
    }
  ],
  "outbounds": [
    {
      "tag": "warp",
      "protocol": "wireguard",
      "settings": {
        "secretKey": "WARP_SECRET_KEY",
        "address": [
          "WARP_ADDRESS/32"
        ],
        "peers": [
          {
            "publicKey": "WARP_PUBLIC_KEY",
            "allowedIPs": [
              "0.0.0.0/0"
            ],
            "endpoint": "WARP_ENDPOINT:2408",
            "keepAlive": 25
          }
        ],
        "reserved": [
          0,
          0,
          0
        ],
        "mtu": 1280,
        "domainStrategy": "ForceIPv4",
        "noKernelTun": true
      }
    },
    {
      "tag": "direct",
      "protocol": "freedom",
      "settings": {
        "domainStrategy": "UseIPv4"
      }
    },
    {
      "tag": "block",
      "protocol": "blackhole"
    }
  ],
  "routing": {
    "rules": [
      {
        "type": "field",
        "inboundTag": [
          "vless-xhttp-from-a"
        ],
        "outboundTag": "warp"
      }
    ]
  }
}
```

Тут подставьте свои значения:

- `A_TO_B_UUID` &mdash; это тот идентификатор, который вы генерировали при настройке сервера А. Не перепутайте его с идентификатором, который предназначается для клиента.
- `A_TO_B_DECRYPTION` &mdash; поле `decryption`, которое выдала команда `xray vlessenc` на сервере А. Соответствующее значение `encryption` вы уже добавили на промежуточном сервере.
- `WARP_SECRET_KEY` &mdash; это `private_key` из вывода команды `bash -c "$(curl -L warp-reg.vercel.app)"`.
- `WARP_ADDRESS` &mdash; поле `v4` оттуда же.
- `WARP_PUBLIC_KEY` &mdash; поле `public_key` оттуда же.
- `WARP_ENDPOINT` &mdash; поле `endpoint.v4` оттуда же.
- В массив `"reserved"` вместо трёх нулей подставьте те три числа, которые сообщила команда `bash -c "$(curl -L warp-reg.vercel.app)"` в `reserved_dec`. **Не оставляйте там три нуля**, как в примере.

Затем всё проверяем и запускаем:

```plain
sudo /usr/local/bin/xray run -test -config /usr/local/etc/xray/config.json

sudo systemctl enable --now xray

sudo systemctl restart xray
```

Заметьте, что в данном случае Xray вообще не торчит наружу, потому что трафик в него будет прилетать от Caddy.

## Настраиваем Caddy на сервере Б

Редактируем конфиг Caddy на сервере Б:

```plain
sudo vim /etc/caddy/Caddyfile
```

Он будет примерно таким:

```plain
SERVER_B_DOMAIN {
        encode gzip zstd

        handle /assets* {
                reverse_proxy 127.0.0.1:10085 {
                        flush_interval -1
                        transport http {
                                versions h2c 1.1
                        }
                }
        }

        handle /healthz {
                header Content-Type application/json
                respond `{"status":"ok","service":"api-gateway"}` 200
        }

        handle {
                root * /usr/share/caddy/api
                file_server
        }
}
```

Замените `SERVER_B_DOMAIN` на ваш домен, указывающий на сервер Б.

Затем имеет смысл создать страницу-заглушку:

```plain
sudo mkdir -p /usr/share/caddy/api

sudo vim /usr/share/caddy/api/index.html
```

Внутрь этого файла HTML засуньте любую разметку для страницы-заглушки. Это может быть сайт-визитка, какая-нибудь служебная информация или что-то ещё. При желании можно добавить стили, favicon, robots.txt и прочее.

Всё проверяем и запускаем:

```plain
sudo caddy validate --config /etc/caddy/Caddyfile

sudo systemctl enable --now caddy

sudo systemctl restart caddy
```

## Проверка на сервере Б

Запускаем:

```plain
curl -I https://SERVER_B_DOMAIN

sudo ss -lntup | grep -E ':80|:443|:10085'
```

Замените `SERVER_B_DOMAIN` на ваш реальный домен. Вы должны увидеть страницу-заглушку, а также информацию о занятых портах. Caddy должен занять порты 80 и 443, а Xray &mdash; порт 10085. Если у вас используется фаерволл, порты 80 и 443 надо открыть.

## Проверка на сервере А

Теперь проверим канал между А и Б. На сервере А запустим:

```plain
curl -vk --connect-timeout 8 SERVER_B_DOMAIN

curl -v --max-time 30 -x socks5h://127.0.0.1:10808 https://cloudflare.com/cdn-cgi/trace
```

После первой команды вы должны увидеть страницу-заглушку.

После второй вы увидите довольно громоздкий вывод, где помимо прочего обычно написано `warp=on`. Это означает, что канал работает и WARP действительно используется.

## Формируем клиентскую ссылку

Ссылка для клиента будет выглядеть так:

```plain
vless://CLIENT_UUID@A_IP:443?encryption=CLIENT_TO_A_ENCRYPTION&flow=xtls-rprx-vision&security=reality&sni=www.microsoft.com&fp=chrome&pbk=A_REALITY_PUBLIC_KEY&sid=A_REALITY_SHORT_ID&type=xhttp&path=%2Fassets&mode=stream-one#A-B-WARP
```

Сюда вставьте:

- `CLIENT_UUID` &mdash; это идентификатор, который вы генерировали на сервере А для клиента (не для сервера Б!).
- `A_IP` &mdash; адрес сервера А.
- `CLIENT_TO_A_ENCRYPTION` &mdash; поле `encryption`, полученное после запуска команды `xray vlessenc` на сервере А. Соответствующее значение `decryption` вы уже добавили на А.
- `A_REALITY_PUBLIC_KEY` &mdash; открытый ключ (он же `password`), сгенерированный командой `xray x25519` на сервере А. Соответствующий приватный ключ вы уже задали на сервере А.
- `A_REALITY_SHORT_ID` &mdash; значение, полученное командой `openssl rand -hex 8` на сервере А.

Теперь эту клиентскую ссылку можно засунуть в любой современный клиент, например V2RayN (десктоп), V2RayNG (мобильные ОС), Streisand (яблочники), Onexray (кросс-платформенная штука), Happ proxy utility (кросс-платформенная) и множество других.

## Если что-то пошло не так

Итак, если у вас что-то пошло не по плану (а при первой настройке это весьма вероятно), вот небольшой чеклист в помощь:

- **Проверьте, где выполняется команда.** Часть команд запускается на сервере А, часть &mdash; на сервере Б. Это частая причина путаницы.
- **Проверьте DNS.** Домен `SERVER_B_DOMAIN` должен указывать именно на сервер Б, а не на сервер А.
- **Проверьте открытые порты.** На сервере Б должны быть доступны `80` и `443`, а порт `10085` должен слушать только `127.0.0.1`. На сервере А должен быть доступен порт `443`.
- **Проверьте Caddy.** Команда `sudo systemctl status caddy` не должна показывать ошибок, а `curl -I https://SERVER_B_DOMAIN` должен возвращать ответ от сервера.
- **Проверьте Xray.** Запустите `sudo /usr/local/bin/xray run -test -config /usr/local/etc/xray/config.json` на обоих серверах. Если там какие-то ошибки, их нужно обязательно исправить.
- **Не перепутайте UUID.** `CLIENT_UUID` используется только для клиента, а `A_TO_B_UUID` — только для связи сервера А с сервером Б.
- **Не перепутайте encryption/decryption.** Значение `encryption` ставится на стороне клиента/исходящего подключения, а парное `decryption` — на принимающей стороне.
- **Проверьте REALITY-ключи.** В клиентской ссылке должен быть публичный ключ, а на сервере А — приватный.
- **Проверьте `shortId`.** Значение в клиентской ссылке должно совпадать с `shortIds` на сервере А.
- **Проверьте `path`.** Путь `/assets` должен совпадать в клиентской ссылке и конфиге сервера А, а также в конфиге сервера Б и Caddy.
- **Проверьте WARP.** Если в `https://cloudflare.com/cdn-cgi/trace` нет `warp=on`, проверьте `WARP_SECRET_KEY`, `WARP_PUBLIC_KEY`, `WARP_ADDRESS`, `WARP_ENDPOINT` и `reserved`.
- **Проверьте время на серверах.** Сильное расхождение времени может ломать TLS/REALITY.
- **Проверьте версии Xray.** Для XHTTP, REALITY и VLESS Encryption нужна свежая версия Xray, по крайней мере v26.3.
- **Смотрите логи.** Полезную информацию можно найти в `/var/log/xray/error.log`, `/var/log/xray/access.log`, а также в выводе `journalctl -u xray -e`.