---
title: FAQ по курсу Solidity
draft: false
meta_desc: Ответы на часто задаваемые вопросы по курсу Solidity на YouTube.
date: 2023-06-12T00:00:00
lang: ru-RU
tags:
- Solidity
- Ethereum
- FAQ
---

<p>Это ответы на часто задаваемые вопросы по бесплатному курсу Solidity, который <a href="https://www.youtube.com/watch?v=8A8-7Ks26yY&list=PLWlFXymvoaJ_0ok740kLXTn5qn-i1UnYr" target="_blank">вы можете найти на YouTube</a>.</p>

<p>Если же всё-таки вы хотите ещё больше (если точнее, на порядок больше) материала, то можете <a href="https://www.guidedao.xyz/" target="_blank">присмотреться к буткемпам GuideDAO</a>, в создании которых я принимал и принимаю самое активное участие. По промо-коду <code>KRUK</code> вы даже можете получить неплохую скидку, а <a href="https://www.youtube.com/live/EkqlnS6JtWc" target="_blank">вот это видео</a> представляет собой онлайн день открытых дверей, где мы рассказываем о платформе очень подробно. Однако и в бесплатных уроках действительно очень много полезного. Удачного изучения!</p>

<p>Если вам нужна дополнительная помощь или есть мысли, что ещё можно добавить в этот документ, пишите <a href="https://t.me/joinchat/MxYT6-01eeA1NTYy" target="_blank">в наш чат Telegram</a>.</p>

<p>Должен заметить, что все эти уроки создаются на чистом энтузиазме, поэтому ваше пожертвование, даже небольшое, лишним не будет точно. Вы можете оформить <a href="https://www.youtube.com/channel/UCN2waErKU52T_41pGgUimXw/join">спонсорство на YouTube</a>, а также использовать <a href="https://boosty.to/bodrovis">Boosty</a> или <a href="https://www.patreon.com/bodrovis">Patreon</a>. Криптовалюту тоже можно отправить, мой адрес <i class="inline_code">0x719C2d2bcC155c85190f20E1Cc3710F90FAFDa16</i> (mainnet, binance smart chain, arbitrum one, zk era mainnet, matic mainnet).</p>

## Я не знаю, какую опцию выбирать при создании проекта Hardhat

<p><strong>TLDR; смотрите обновлённую версию пятого урока <a href="https://youtu.be/GD6fz56-cEQ">вот тут</a>, там всё объясняется.</strong> Но всё-таки если вы смотрите старую (изначальную) версию пятого урока, то читайте дальше.</p>

<p>В пятом уроке упоминается, что при создании Hardhat нужно выбрать опцию <strong>Create a basic sample project</strong>. Проблема в том, что теперь такой опции нет — вместо неё вам нужно будет выбрать <strong>Create a JavaScript project</strong>, суть та же самая. Если же вы знаете TypeScript, то сразу выбирайте <strong>Create a TypeScript project</strong>.</p>

## Я пытаюсь создать проект Hardhat, но он вообще не предлагает выбрать тип нового проекта

<p>Если после запуска команды <i class="inline_code">npx hardhat</i> вы видите не выбор типа проекта (<strong>Create a JavaScript project</strong> или <strong>Create a TypeScript project</strong>), а какую-то справочную информацию по Hardhat, это почти наверняка означает, что ваш проект уже создан. Иными словами, вы запускаете команду из директории, где конфиг Hardhat уже лежит.</p>

<p>Что нужно сделать? Самое простое — создать новую пустую директорию в каком-нибудь другом месте и там запустить все команды заново. Можно также посмотреть <a href="https://hardhat.org/hardhat-runner/docs/guides/project-setup#setting-up-a-project">официальное руководство</a>. Во всяком случае, нужно проверить, что в директории, где вы только планируете создать проект, или в родительских директориях уже нет файла типа <i class="inline_code">hardhat.config.js</i>. Он должен появиться после создания проекта, но никак не до этого.</p>

## После установки Hardhat мне предлагается установить буквально пару зависимостей

<p>В старых видео может быть показано, что необходимо установить много всего, это правда. К счастью, теперь у нас есть решение toolbox, которое содержит в себе всё необходимое. Достаточно установить только его. Фактически, ваш файл <i class="inline_code">package.json</i> может содержать только две библиотеки:</p>

{{< highlight json >}}
{
  "name": "hardhat-project",
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox": "^5.0.0",
    "hardhat": "^2.20.0",
  }
}
{{< / highlight >}}

<p>Только не забудьте добавить toolbox в ваш файл hardhat.config.</p>

## В Remix я не знаю, какую среду и версию языка выбирать!

На момент весны 2024 года я рекомендую выбирать `Remix VM (Cancun)` и версию языка не ниже 0.8.25.

## Я пишу тесты, но получаю ошибку, что метода deployed() нет!

<p>Если при написании скрипта для деплоя вы видите ошибку вроде "no matching function (argument="key", value="deployed" ...)", то используйте код:</p>

{{< highlight js >}}
const Factory = await ethers.getContractFactory("Demo");
const demo = await Factory.deploy();
// вот тут используем новый метод вместо deployed():
await demo.waitForDeployment();
{{< / highlight >}}

<p>Вместо "Demo" подставьте имя вашего контракта. Дело в том, что в toolbox версии 3 метод <i class="inline_code">deployed()</i> переименовали в <i class="inline_code">waitForDeployment()</i>.</p>

## Я пишу тесты, но получаю ошибку, что свойства address нет!

<p>Да, такое может быть. Если вы получаете ошибку вида "Property 'address' does not exist" (или что-то подобное, где явно упомянут address и строка, где это свойство использовано), когда пытаетесь вытащить адрес контракта в тестах или скриптах, то нужно использовать один из двух вариантов:</p>

{{< highlight js >}}
contractObj.target;
// ИЛИ
await contractObj.getAddress();
{{< / highlight >}}

<p>Оба способа вернут адрес контракта. Такая ошибка появится, если вы перешли на hardhat-toolbox версии 3.</p>

## Получаю ошибку, что метода getAddress нет!

<p>Если вы получаете ошибку, что метода <i class="inline_code">getAddress</i> не существует, попробуйте использовать новую форму записи <i class="inline_code">ethers.getAddress()</i>.</p>

## В тестах Hardhat пытаюсь использовать import, но он ругается

<p>Если в ваших файлах автотестов используется <i class="inline_code">import</i>, но Hardhat ругается на то, что такую инструкцию использовать нельзя (ошибка вида "Cannot use import statement outside a module") или упоминает что-то про расширения <i class="inline_code">.js</i>, <i class="inline_code">.cjs</i> или про ES (ESM), то, вероятнее всего, вы изначально создали проект с типом JavaScript (а не TypeScript). К сожалению, в мире JS много неприятных чудес, и мы не можем просто использовать файлы <i class="inline_code">.ts</i> в проекте, который изначально заточен под JS (потому что обычный JS ничего про TS не знает). Соответственно, с инструкциями <i class="inline_code">import</i> там тоже могут быть сложности.</p>

<p>Варианта два: сделать новый проект Hardhat и выбрать тип TypeScript, либо использовать инструкцию <i class="inline_code">require</i> вместо <i class="inline_code">import</i> для подключения файлов. <a href="https://www.freecodecamp.org/news/how-to-use-the-javascript-require-function/">Примеры require есть тут</a>. Можно, конечно, портировать существующий проект JS на TS, но тогда нужно гуглить порядок действий.</p>

## VS Code всё равно ругается и подчёркивает некоторые методы

<p>Если вы всё проверили, никаких ошибок быть не должно, а VS Code ругается на якобы несуществующие методы, то самое простое решение — это перезапустить его. Если не помогает, то можно перекомпилировать все контракты заново <i class="inline_code">npx hardhat clean && npx hardhat compile</i>, после чего  опять перезапустить редактор.</p>

## Какие плагины/темы VS Code поставить?

<p>Обязательно нужен плагин для Solidity — остальное более-менее необязательно. Известных плагинов два и оба называются просто Solidity: один от некоего Хуана Бланко, другой от Nomic Foundation (это ребята, которые делали Hardhat). На самом деле, оба работают нормально, но лично я использую <a href="https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity&ssr=false#overview">тот, что от Nomic</a> (это не реклама, плагин совершенно бесплатный), так как он имеет поддержку Hardhat. Кроме того, некоторые студенты сообщали, что плагин от синьора Бланко почему-то помечает корректные импорты как некорректные. Впрочем, вы можете попробовать оба и сравнить. Главное помнить, что эти плагины несовместимы и включать их вместе не нужно.</p>

<p>Что касается темы, используйте любую, ведь это ваше рабочее пространство! Но, так как это часто спрашивают, скажу, что у меня установлена тема An Old Hope Classic. Да-да, из той самой далёкой-далёкой галактики...</p>

## Я хочу импортировать тип SignerWithAddress, но получаю ошибку

<p>В новых версиях этот тип переехал и теперь импортируется так:</p>

{{< highlight ts >}}
import type { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
{{< / highlight >}}

## Я получаю ошибку, что utils для ethers не найдено

<p>Модуль <i class="inline_code">utils</i> был убран. Скорее всего, вам достаточно изменить свой код, убрав его. То есть:</p>

{{< highlight js >}}
// БЫЛО
ethers.utils.formatUnits()

// СТАЛО

ethers.formatUnits()
{{< / highlight >}}

<p>В большинстве случаев этого будет достаточно. Подробнее написано в <a href="https://docs.ethers.org/v6/migrating/">руководстве по переходу на Ethers 6</a>.</p>

## Я получаю ошибку, что функции arrayify нет!

Она переименована. Теперь делаем следующим образом:

```ts
// БЫЛО
array = ethers.utils.arrayify(value)

// СТАЛО
array = ethers.getBytes(value)
```

## Не понимаю, как работать с большими числами

<p>Если вы работаете с большими числами, перейти на toolbox v3 точно стоит. Большое число от обычного там отличается лишь суффиком n, например <i class="inline_code">9n</i>. Опять же, смотри <a href="https://docs.ethers.org/v6/migrating/#migrate-bigint">гайд по переходу на ethers 6</a>, а также <a href="https://youtu.be/bzzf0ANyq70">вот это видео</a>, где рассказано обо всех новых фичах.</p>

## Кажется, у меня какая-то не такая сеть Hardhat (не тот chainid)

<p>Если у вас упорно вылезает сеть 31337, а вам нужна 1337, то в конфигурацию Hardhat добавляем:</p>

{{< highlight js >}}
{
  // тут всякие другие настройки ...
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
}
{{< / highlight >}}

## Мне непонятны все эти криптографические штуки, что делать?

<p>Такая проблема может быть, ничего страшного. Я пытаюсь её решить, развивая <a href="https://www.youtube.com/watch?v=IglTG5MGgvg&list=PLWlFXymvoaJ_tN72NpOn7QH27LS6rVIV4">отдельный плейлист Crypto bits</a>, можно глянуть его.</p>