---
title: FAQ по курсу Solidity
draft: false
meta_desc: Ответы на часто задаваемые вопросы по курсу Solidity на YouTube.
date: 2023-06-12T00:00:00+00:00
lang: ru-RU
---

<p>Это ответы на часто задаваемые вопросы по бесплатному курсу Solidity, который <a href="https://www.youtube.com/watch?v=8A8-7Ks26yY&list=PLWlFXymvoaJ_0ok740kLXTn5qn-i1UnYr" target="_blank">вы можете найти на YouTube</a>.</p>

<p>Если вам нужна дополнительная помощь или есть мысли, что ещё можно добавить в этот документ, пишите <a href="https://t.me/joinchat/MxYT6-01eeA1NTYy" target="_blank">в наш чат Telegram</a>.</p>

<p>Должен заметить, что все эти уроки создаются на чистом энтузиазме, поэтому ваше пожертвование, даже небольшое, лишним не будет точно. Вы можете оформить <a href="https://www.youtube.com/channel/UCN2waErKU52T_41pGgUimXw/join">спонсорство на YouTube</a>, а также использовать <a href="https://www.donationalerts.com/r/bodrovis">DonationAlerts</a>, <a href="https://boosty.to/bodrovis">Boosty</a> или <a href="https://www.patreon.com/bodrovis">Patreon</a>. Криптовалюту тоже можно отправить, мой адрес <i class="inline_code">0x719C2d2bcC155c85190f20E1Cc3710F90FAFDa16</i> (mainnet, binance smart chain, arbitrum one, zk era mainnet, matic mainnet).</p>

<h2>Я не знаю, какую опцию выбирать при создании проекта Hardhat</h2>

<p><strong>TLDR; смотрите обновлённую версию пятого урока <a href="https://youtu.be/GD6fz56-cEQ">вот тут</a>, там всё объясняется.</strong> Но всё-таки если вы смотрите старую (изначальную) версию пятого урока, то читайте дальше.</p>

<p>В пятом уроке упоминается, что при создании Hardhat нужно выбрать опцию <strong>Create a basic sample project</strong>. Проблема в том, что теперь такой опции нет — вместо неё вам нужно будет выбрать <strong>Create a JavaScript project</strong>, суть та же самая. Если же вы знаете TypeScript, то сразу выбирайте <strong>Create a TypeScript project</strong>.</p>

<h2>Я пытаюсь создать проект Hardhat, но он вообще не предлагает выбрать тип нового проекта</h2>

<p>Если после запуска команды <i class="inline_code">npx hardhat</i> вы видите не выбор типа проекта (<strong>Create a JavaScript project</strong> или <strong>Create a TypeScript project</strong>), а какую-то справочную информацию по Hardhat, это почти наверняка означает, что ваш проект уже создан. Иными словами, вы запускаете команду из директории, где конфиг Hardhat уже лежит.</p>

<p>Что нужно сделать? Самое простое — создать новую пустую директорию в каком-нибудь другом месте и там запустить все команды заново. Можно также посмотреть <a href="https://hardhat.org/hardhat-runner/docs/guides/project-setup#setting-up-a-project">официальное руководство</a>. Во всяком случае, нужно проверить, что в директории, где вы только планируете создать проект, или в родительских директориях уже нет файла типа <i class="inline_code">hardhat.config.js</i>. Он должен появиться после создания проекта, но никак не до этого.</p>

<h2>После установки Hardhat мне предлагается установить буквально пару зависимостей</h2>

<p>В старых видео может быть показано, что необходимо установить много всего, это правда. К счастью, теперь у нас есть решение toolbox, которое содержит в себе всё необходимое. Достаточно установить только его. Фактически, ваш файл <i class="inline_code">package.json</i> может содержать только две библиотеки:</p>

<pre><code>{
  "name": "hardhat-project",
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox": "^3.0.0",
    "hardhat": "^2.13.0",
  }
}
</code></pre>

<p>Только не забудьте добавить toolbox в ваш файл hardhat.config.</p>

<h2>Я пишу тесты, но получаю ошибку, что метода deployed() нет!</h2>

<p>Если при написании скрипта для деплоя вы видите ошибку вроде "no matching function (argument="key", value="deployed" ...)", то используйте код:</p>

<pre><code>const Factory = await ethers.getContractFactory("Demo");
const demo = await Factory.deploy();
await demo.waitForDeployment(); // вот тут используем новый метод вместо deployed()</code></pre>

<p>Вместо "Demo" подставьте имя вашего контракта. Дело в том, что в toolbox версии 3 метод <i class="inline_code">deployed()</i> переименовали в <i class="inline_code">waitForDeployment()</i>.</p>

<h2>Я пишу тесты, но получаю ошибку, что свойства address нет!</h2>

<p>Да, такое может быть. Если вы получаете ошибку вида "Property 'address' does not exist" (или что-то подобное, где явно упомянут address и строка, где это свойство использовано), когда пытаетесь вытащить адрес контракта в тестах или скриптах, то нужно использовать один из двух вариантов:</p>

<pre><code>contractObj.target;
// ИЛИ
await contractObj.getAddress();</code></pre>

<p>Оба способа вернут адрес контракта. Такая ошибка появится, если вы перешли на hardhat-toolbox версии 3.</p>

<h2>Получаю ошибку, что метода getAddress нет!</h2>

<p>Если вы получаете ошибку, что метода <i class="inline_code">getAddress</i> не существует, попробуйте использовать новую форму записи <i class="inline_code">ethers.getAddress()</i>.</p>

<h2>В тестах Hardhat пытаюсь использовать import, но он ругается</h2>

<p>Если в ваших файлах автотестов используется <i class="inline_code">import</i>, но Hardhat ругается на то, что такую инструкцию использовать нельзя (ошибка вида "Cannot use import statement outside a module") или упоминает что-то про расширения <i class="inline_code">.js</i>, <i class="inline_code">.cjs</i> или про ES (ESM), то, вероятнее всего, вы изначально создали проект с типом JavaScript (а не TypeScript). К сожалению, в мире JS много неприятных чудес, и мы не можем просто использовать файлы <i class="inline_code">.ts</i> в проекте, который изначально заточен под JS (потому что обычный JS ничего про TS не знает). Соответственно, с инструкциями <i class="inline_code">import</i> там тоже могут быть сложности.</p>

<p>Варианта два: сделать новый проект Hardhat и выбрать тип TypeScript, либо использовать инструкцию <i class="inline_code">require</i> вместо <i class="inline_code">import</i> для подключения файлов. <a href="https://www.freecodecamp.org/news/how-to-use-the-javascript-require-function/">Примеры require есть тут</a>. Можно, конечно, портировать существующий проект JS на TS, но тогда нужно гуглить порядок действий.</p>

<h2>VS Code всё равно ругается и подчёркивает некоторые методы</h2>

<p>Если вы всё проверили, никаких ошибок быть не должно, а VS Code ругается на якобы несуществующие методы, то самое простое решение — это перезапустить его. Если не помогает, то можно перекомпилировать все контракты заново <i class="inline_code">npx hardhat clean && npx hardhat compile</i>, после чего  опять перезапустить редактор.</p>

<h2>Какие плагины/темы VS Code поставить?</h2>

<p>Обязательно нужен плагин для Solidity — остальное более-менее необязательно. Известных плагинов два и оба называются просто Solidity: один от некоего Хуана Бланко, другой от Nomic Foundation (это ребята, которые делали Hardhat). На самом деле, оба работают нормально, но лично я использую <a href="https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity&ssr=false#overview">тот, что от Nomic</a> (это не реклама, плагин совершенно бесплатный), так как он имеет поддержку Hardhat. Кроме того, некоторые студенты сообщали, что плагин от синьора Бланко почему-то помечает корректные импорты как некорректные. Впрочем, вы можете попробовать оба и сравнить. Главное помнить, что эти плагины несовместимы и включать их вместе не нужно.</p>

<p>Что касается темы, используйте любую, ведь это ваше рабочее пространство! Но, так как это часто спрашивают, скажу, что у меня установлена тема An Old Hope Classic. Да-да, из той самой далёкой-далёкой галактики...</p>

<h2>Я хочу импортировать тип SignerWithAddress, но получаю ошибку</h2>

<p>В новых версиях этот тип переехал и теперь импортируется так:</p>

<pre><code>import type { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";</code></pre>

<h2>Я получаю ошибку, что utils для ethers не найдено</h2>

<p>Модуль <i class="inline_code">utils</i> был убран. Скорее всего, вам достаточно изменить свой код, убрав его. То есть:</p>

<pre><code>// БЫЛО
ethers.utils.formatUnits()

// СТАЛО

ethers.formatUnits()</code></pre>

<p>В большинстве случаев этого будет достаточно. Подробнее написано в <a href="https://docs.ethers.org/v6/migrating/">руководстве по переходу на Ethers 6</a>.</p>

<h2>Не понимаю, как работать с большими числами</h2>

<p>Если вы работаете с большими числами, перейти на toolbox v3 точно стоит. Большое число от обычного там отличается лишь суффиком n, например <i class="inline_code">9n</i>. Опять же, смотри <a href="https://docs.ethers.org/v6/migrating/#migrate-bigint">гайд по переходу на ethers 6</a>, а также <a href="https://youtu.be/bzzf0ANyq70">вот это видео</a>, где рассказано обо всех новых фичах.</p>

<h2>Кажется, у меня какая-то не такая сеть Hardhat (не тот chainid)</h2>

<p>Если у вас упорно вылезает сеть 31337, а вам нужна 1337, то в конфигурацию Hardhat добавляем:</p>

<pre><code>{
  // тут всякие другие настройки ...
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
}</code></pre>

<h2>Мне непонятны все эти криптографические штуки, что делать?</h2>

<p>Такая проблема может быть, ничего страшного. Я пытаюсь её решить, развивая <a href="https://www.youtube.com/watch?v=IglTG5MGgvg&list=PLWlFXymvoaJ_tN72NpOn7QH27LS6rVIV4">отдельный плейлист Crypto bits</a>, можно глянуть его.</p>