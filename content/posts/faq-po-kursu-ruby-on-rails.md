---
title: FAQ по курсу Ruby on Rails
draft: false
meta_desc: Ответы на часто задаваемые вопросы по курсу Ruby on Rails на YouTube.
date: 2023-05-08T00:00:00
tags:
- Rails
- FAQ
---

<p>Этот материал содержит в себе ответы на часто задаваемые вопросы по бесплатному курсу Ruby on Rails, который <a href="https://www.youtube.com/watch?v=6_ek4hokiak&list=PLWlFXymvoaJ_IY53-NQKwLCkR-KkZ_44-" target="_blank">вы можете найти на YouTube</a>.</p>

<p>Если вам нужна дополнительная помощь или есть мысли, что ещё можно добавить в этот документ, пишите <a href="https://t.me/joinchat/MxYT6-01eeA1NTYy" target="_blank">в наш чат Telegram</a>.</p>

<p>Должен заметить, что все эти уроки создаются на чистом энтузиазме, поэтому ваше пожертвование, даже небольшое, лишним не будет точно. Вы можете оформить <a href="https://www.youtube.com/channel/UCN2waErKU52T_41pGgUimXw/join">спонсорство на YouTube</a>, а также использовать <a href="https://boosty.to/bodrovis">Boosty</a> или <a href="https://www.patreon.com/bodrovis">Patreon</a>. Криптовалюту тоже можно отправить, мой адрес <i class="inline_code">0x719C2d2bcC155c85190f20E1Cc3710F90FAFDa16</i> (mainnet, binance smart chain, arbitrum one, zk era mainnet, matic mainnet).</p>

## Я просто хочу начать изучать Rails!

<p>Отлично! В этом случае добро пожаловать <a href="https://www.youtube.com/watch?v=tqSkBmODHBk" target="_blank">в первый урок по Rails 7</a>. Если кратко, вам потребуется установить интерпретатор языка Ruby, Node.js, Yarn, настроить sqlite3 и создать проект, как описано в уроке. Это несложно, но <strong>обязательно прочитайте раздел ниже</strong>.</p>

<h3>Важные замечания о первом уроке, КОТОРЫЕ НУЖНО ПРОЧИТАТЬ!</h3>

<p>Во-первых, убедитесь, что вы смотрите именно первый урок по Rails 7, то есть <a href="https://www.youtube.com/watch?v=tqSkBmODHBk" target="_blank">вот этот</a>. На канале есть более старое видео о Rails 6, но оно уже устарело.</p>

<p>В первом уроке всё ещё используется Webpacker, но сейчас это решение я лично использовать бы не стал, так как оно считается устаревшим. Поэтому команда для создания приложения трансформируется в такую: <i class="inline_code">rails new AskIt -T -j esbuild --css bootstrap --skip-hotwire</i>.</p>

<p>Перед установкой убедитесь, что директория AskIt уже не была создана и что в текущей папке или в родительских папках нет файлов типа <i class="inline_code">package.json</i> или директории <i class="inline_code">.yarn</i>.</p>

<p>Если при установке вылетает ошибка "Error: Can't find stylesheet to import.", это не беда. Открывайте ваш только что созданный проект Rails, удаляйте из корня файл <i class="inline_code">.pnp.cjs</i>, а вместо него создайте файл <i class="inline_code">.yarnrc.yml</i>. В него добавляем вот такой контент:</p>

{{< highlight plaintext >}}
nodeLinker: node-modules
{{< / highlight >}}

<p>Потом просто запустите команду <i class="inline_code">yarn install</i>. Вообще, всё это объясняется в первом видео и дальше можно следовать инструкциям, которые там представлены.</p>

<p>В видео предлагается добавить <i class="inline_code">@rails/ujs</i> версии 6, но сейчас уже есть версия новее, так что ваша строчка в <i class="inline_code">package.json</i> будет такой (впрочем, в этом же видео объясняется, как сделать апдейт всех библиотек):</p>

{{< highlight plaintext >}}
"@rails/ujs": "^7.0.4-3"
{{< / highlight >}}

<p>Другой важный момент, если вы работаете на Windows. В какой-то момент, следуя инструкциям в видео, вы открываете файл <i class="inline_code">Procfile.dev</i> и его редактируете. Так вот, если там есть что-то вроде <i class="inline_code">unset PORT</i>, это надо убрать. Ваш <i class="inline_code">Procfile.dev</i> на Windows должен выглядеть вот так:</p>

{{< highlight plaintext >}}
web: ruby bin/rails server -p 3000
js: yarn build --watch
css: yarn build:css --watch
{{< / highlight >}}

## А что насчёт Rails 6?

<p>Да ничего, просто все переходят на Rails 7. Впрочем, большинство уроков актуальны для обеих версий.</p>

## Я не знаю языка Ruby, что делать?

<p>Материалов по Ruby предостаточно, а для начала работы с Rails достаточно знать самые основы. <a href="https://www.youtube.com/watch?v=lhRAK_bwaeo&list=PLWlFXymvoaJ-td0fgYNj3fCnCVDTDClRg">Вот здесь</a> я записал плейлист по Ruby для "самых маленьких", хотя это подача в экспериментальном виде с шутками-прибаутками, так что, возможно, кому-то не зайдёт.</p>

<p>Ну, а если вы хотите освоить Ruby на уровне профессионала, то <a href="https://www.youtube.com/watch?v=M3cReWNRANU&list=PLWlFXymvoaJ8g_g_24QWmWu3lnmieYT_q">плейлист "секреты классов Ruby"</a> (хотя, честно говоря, там не только о классах) точно для вас. Там никаких шуток, всё серьёзно.</p>

## Но я хочу ещё и Hotwire!

<p>Никаких проблем. Если вы уже знаете основы Rails, то <a href="https://www.youtube.com/watch?v=VuR0jASu-Wc&list=PLWlFXymvoaJ-uWJFOmWLJDbsZ8WYs6C_e" target="_blank">плейлист по Hotwire здесь</a>. Если вы только начали знакомство с Rails, лучше пока двигаться постепенно. Ну, а в "главном" плейлисте по Rails <a href="https://www.youtube.com/watch?v=d503KrQ7Vys" target="_blank">вот этот урок</a> расскажет, как перейти на Turbo (это и есть часть Hotwire). Следующие же уроки расскажут, как с этой технологией работать. Если вам не терпится, вы можете сразу посмотреть урок #23-34-25, а потом уже проходить плейлист по порядку, но учтите, что поначалу может быть сложно.</p>

## В третьем уроке я не могу удалить запись при нажатии по ссылке!

<p>Если при нажатии по ссылке "удалить" у вас ничего не удаляется, а в консоли вылезает ошибка в духе "маршрут не найден", это значит, что вы всё-таки решили двигаться впереди паровоза и перешли на Turbo, но не ознакомились с его особенностями в уроках, перечисленных выше. Но и это не беда - вам достаточно немного изменить ссылки для удаления. Они должны выглядеть так:</p>

{{< highlight plaintext >}}
<%= link_to 'Destroy', YOUR_ROUTE_HERE, data: { turbo_confirm: "Are you sure?", turbo_method: :delete } %>
{{< / highlight >}}

<p>Обратите внимание на префикс <i class="inline_code">turbo_</i>. Вообще, если вы уже каким-то образом оказались на Turbo и у вас возникают проблемы такого характера, имеет смысл глянуть хотя бы <a href="https://www.youtube.com/watch?v=d503KrQ7Vys" target="_blank">урок 23</a>, а, может быть, и два следующих, чтобы уже понимать основы этого решения.</p>

## Я исправил ссылку, но запись всё равно не удаляется!

<p>Обычно такое происходит, если неправильно подключены скрипты или в них содержится какая-то ошибка, потому что само удаление выполняется с помощью JS (он правильно изменяет запрос, превращая его в DELETE). К сожалению, я не могу сказать наверняка, какова причина ошибки конкретно в вашем случае, но вот несколько советов.</p>

<p>Во-первых, проверьте, что вы правильно запускаете приложение (это вообще самая распространённая проблема). В первую очередь, установите библиотеку Foreman (<i class="inline_code">gem install foreman</i>). Далее, на системах nix можно использовать команду <i class="inline_code">bin\dev</i>. На Windows в корне проекта Rails можно создать файл <i class="inline_code">start.cmd</i> с вот таким содержимым:

{{< highlight plaintext >}}
foreman start -f Procfile.dev
{{< / highlight >}}

<p>Затем запускаем простой командой <i class="inline_code">start.cmd</i> из терминала.</p>

<p>Удостоверьтесь, что ваш <i class="inline_code">Procfile.dev</i> на Windows имеет содержимое вроде:</p>

{{< highlight plaintext >}}
web: ruby bin/rails server -p 3000
js: yarn build --watch
css: yarn build:css --watch
{{< / highlight >}}

<p>Ну, если вы решили перейти на importmap, то там ситуация будет несколько иная, но этот случай рассматривать не будем (он и в уроках почти не упоминается).</p>

<p>Во-вторых, проверьте, что ваши команды для билда CSS и JS проходят успешно. Для этого удалите содержимое <i class="inline_code">app/assets/builds</i> и вручную в терминале запустите команды билда (например, <i class="inline_code">yarn build && yarn build:css</i>). Если в папке с билдами появляются новые файлы, то всё хорошо.</p>

<p>В третьих, проверьте, что в консоли браузера во время работы с приложением нет ошибок. Если есть, то нужно разбираться, откуда они взялись.</p>

<p>Если ничего не помогает, попробуйте пересоздать приложение: <i class="inline_code">rails new AskIt -T -j esbuild --css bootstrap</i>. Добавьте ключ <i class="inline_code">--skip-hotwire</i> если пока не хотите использовать Turbo и прочие прибамбасы Hotwire (они в большинстве уроков не сильно нужны, это дополнительный функционал, и про него есть <a href="https://www.youtube.com/watch?v=VuR0jASu-Wc&list=PLWlFXymvoaJ-uWJFOmWLJDbsZ8WYs6C_e" target="_blank">отдельный плейлист</a>).</p>

## В четвёртом уроке у меня, кажется, что-то не то со стилями

<p>Проверьте, что ваш файл <i class="inline_code">application.bootstrap.scss</i> выглядит так:</p>

{{< highlight sass >}}
@import 'bootstrap/scss/bootstrap';
@import 'bootstrap-icons/font/bootstrap-icons';
{{< / highlight >}}

<p>В уроке предлагается сделать отдельно файл с Bootstrap, а отдельно <i class="inline_code">application.scss</i>, но в простом случае делать этого не надо. Если вы всё-таки решите переименовать файл SCSS, то <strong>обязательно</strong> откройте <i class="inline_code">package.json</i> и найдите там вот этот кусок кода:</p>

{{< highlight plaintext >}}
"build:css": "sass ./app/assets/stylesheets/application.bootstrap.scss
{{< / highlight >}}

<p>Укажите вместо <i class="inline_code">application.bootstrap.scss</i> новое имя файла, иначе ваши стили просто не будут компилироваться.</p>