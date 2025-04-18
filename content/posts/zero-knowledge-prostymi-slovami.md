---
title: "Zero knowledge: как это работает? Простое объяснение"
draft: false
meta_desc: В чём смысл zero knowledge и как это работает? Мы рассмотрим эту концепцию на двух простых примерах.
date: 2024-08-18T00:00:00
tags:
- Криптография
---

Мы уже говорили о ZK и rollups в одном из уроков по Solidity, который можно посмотреть вот тут:

{{< video n-AoDMc5rc8 >}}

Но как вообще объяснить идею ZK для тех, кто только входит в эту область? Есть два хороших примера, которые мы сегодня рассмотрим. Но в первую очередь важно понять основную суть ZK. Мы (prover) доказываем некому проверяющему наблюдателю (verifier), что обладаем некой секретной информацией, но при этом данную информацию не разглашаем. Больше того, само доказательство нельзя передать третьим лицам. Казалось бы, разве это возможно?

*Эта запись также доступна [в канале Telegram "DEV: Рубиновые тона"](https://t.me/dev_in_ruby_colors/1112), а обсудить же эту тему можно [в нашем чате Telegram](https://t.me/+MxYT6-01eeA1NTYy).*

## Пещера Али Бабы

Первый пример связан с так называемой **пещерой Али Бабы** (только самого героя там нет &mdash; видимо, ушёл по делам). Эта пещера круговая, в неё есть всего один незапертый вход, однако в диаметрально противоположной точке пещеры (то есть с другой стороны, которую от входа невозможно увидеть) находится волшебная дверь, перегораживающая путь. [Вот тут можно посмотреть простую схему](https://upload.wikimedia.org/wikipedia/commons/d/dd/Zkip_alibaba1.png).

Очевидно, что если пещера круговая, то войдя в неё можно пойти либо по часовой стрелке (путь А), либо против часовой (путь Б). Однако если вы не знаете <del>стоп-слова</del> секретного слова, которое открывает волшебную дверь, то вы не сможете совершить полный круг. То есть пойдя по пути А вы не сможете в итоге выйти со стороны пути Б и наоборот. Теперь вопрос: как Элис может доказать Бобу, что она знает секретное слово для открытия двери, при этом не разглашая само слово?

Можно сделать следующее. Боб остаётся недалеко от входа в пещеру, но отворачивается и действий Элис пока не видит. Элис же заходит в пещеру и произвольно выбирает либо путь А, либо путь Б. Когда она доходит до волшебной двери, Боб идёт к выходу и останавливается. Он не знает, как пошла Элис и не видит с какой стороны от двери она стоит. Далее он просто даёт команду либо "выходи со стороны А", либо "выходи со стороны Б".

Ясное дело, что если Элис зашла со стороны А и её просят оттуда же выйти, то открывать ей дверь не нужно вовсе: она просто вернётся обратно той же дорогой. Но вот чтобы выйти со стороны Б, ей по-любому придётся открыть дверь. Ну, а если она не знает секретного слова, то эксперимент окажется провален. Если же мы проделаем этот эксперимент раз 30, и если Элис слова не знает, то вероятность провала будет чрезвычайно большой (увеличивается с каждым новым повторением), ведь она каждый раз идёт по случайному пути, а Боб каждый раз называет случайный выход. Если же после 20-30 раза провала не последовало, то почти наверняка слово Элис известно, хотя она всё так же его не раскрыла.

### Почему бы наблюдающему просто не подойти ко входу?

Может возникнуть довольно логичный вопрос: а зачем вообще Боб сначала отворачивается от входа, не зная, куда зашла Элис, а потом даёт ей команду? Он же может просто пойти с ней ко входу, запомнить, куда она зашла, а потом удостовериться, что она вышла из другого входа. Это ведь тоже докажет, что она знает секретное слово! В общем, это так и есть, но с оговоркой.

Суть zero knowledge в том, что проверяющий как раз имеет "нулевое знание", он убеждается в факте путём ряда вероятностных проверок, а не просто фиксируя некий факт. Кроме того, если представить, что Боб взял с собой портативную камеру, то он может зафиксировать весь процесс и обнародовать доказательства. Иными словами, Элис больше не контролирует, у кого это доказательство имеется. В ZK же суть ещё и в том, что доказательство является убедительным для проверяющего, которому оно адресовано. При этом распространить его на третьих лиц проверяющий не может.

Иными словами, Боб видит лишь финал эксперимента. Даже если он запишет его на камеру, то у третьей стороны может возникнуть резонный вопрос: а вдруг эти двое в сговоре? Боб и Элис просто отрепетировали команды, которые будут даваться, вот и всё. Поэтому ценности у такой записи всё равно не будет.

## Цветные шарики

Рассмотрим и другой пример, на этот раз с двумя шариками: красным и синим. Предположим, что Боб не умеет различать красный и синий цвета, а Элис умеет. Таким образом, для Боба эти шарики кажутся абсолютно одинаковыми, а для Элис - нет. Она хочет доказать Бобу, что умеет различать цвета и что эти два шарика разные, но при этом не сообщая, какой из них синий, а какой - красный.

Чтобы это проверить, Боб берёт в каждую руку по шарику и прячет их за спиной. Он имеет право поменять шарики местами (то есть переложить из левой руки в правую и наоборот), но Элис стоит прямо перед Бобом и этих манипуляций не видит. Затем Боб показывает шарик в правой руке, а Элис подмечает про себя его цвет. Боб снова прячет шарик за спину, после чего может вновь поменять их местами по желанию, либо не менять вовсе. Он вновь показывает шарик в правой руке и спрашивает Элис: "Я показываю тот же шарик или другой?". Боб не знает цвета шарика, но он ведь знает, менял ли он их за спиной. Следовательно, он понимает тот же это шарик или нет.

Элис же не сможет с уверенностью сказать тот же ли это шарик или другой, если не умеет различать цвета или если оба шарика серые. В этом случае она будет вынуждена отвечать наобум. Как только она ошибётся, эксперимент будет провален. Таким образом, если мы проведём этот эксперимент 20-30 раз, и Боб будет каждый раз показывать случайный шарик, то давая случайные ответы Элис почти наверняка ошибётся. Если же все 30 раз ей удалось правильно идентифицировать шарик (тот же или другой), то она наверняка может отличить один от другого, но опять же она не сообщает, где какой.