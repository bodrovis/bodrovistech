---
title: Как в компьютере представлены целые числа?
draft: false
meta_desc: В этой статье мы узнаем, как именно в компьютере (CPU) представлены целые числа со знаком и без знака (int и uint).
date: 2024-03-09T00:00:00
lang: ru-RU
tags:
- cs
- cpu
---

**Как целые числа представлены в современных компьютерах?** Это немаловажный вопрос, ответ на который состоит из нескольких частей. Дело в том, что у нас есть обычные **неотрицательные целые числа (uint)**, которые представляют собой последовательность от 0 и далее до бесконечности, и просто **целые числа (int)**, которые могут быть и отрицательными, и положительными. Есть ещё числа дробные, но про них речь пойдёт [в следующей статье]({{< ref "/kak-v-computere-predstavleny-drobnyye-chisla" >}}).

Это запись по следам видеоурока, который можно найти на YouTube:

{{< video Pe3GCa3WKBU >}}

*Эта запись также доступна [в канале Telegram "DEV: Рубиновые тона"](https://t.me/dev_in_ruby_colors/966), а обсудить же эту тему можно [в нашем чате Telegram](https://t.me/+MxYT6-01eeA1NTYy).*

## Целые неотрицательные числа

Проще всего, конечно, рассмотреть `uint`, то есть с целыми неотрицательными числами. В первую очередь, всегда следует помнить, что процессор умеет работать только с нулями и единицами, никакие другие системы счисления он не "знает". Тогда выходит, что привычные нам десятичные числа в компьютере могут быть закодированы в виде вектора, состоящего из набора нулей и единиц, к примеру, `100101011`. В общем случае этот вектор выглядит так:

```plain
[ x(w - 1), x(w - 2), ... x(0) ]
```

Здесь `w` &mdash; это длина вектора. Естественно, чем больше длина, тем больше чисел мы можем с его помощью закодировать. 

В данном векторе наиболее значимый бит `x(w-1)` находится слева, а наименее значимый `x(0)` &mdash; справа. Если бит имеет значение 1, то он "привносит" в закодированное значение величину `2 ** i`, где `i` &mdash; порядковый номер этого бита. Собственно говоря, именно на этом факте строится процесс перевода из двоичного вида в десятичный.

### Пример кодировки uint

Чтобы было проще, возьмём `w = 4` и двоичное число `1010`. Наиболее значимый бит имеет порядковый номер 3 (считаем с нуля), также у нас установлен в значение 1 бит с порядковым номером 1. Следовательно мы можем возвести двойки в соответствующие степени (1 и 3) и сложить получившиеся значения:

```plain
2 ** 3 + 2 ** 1 = 10
```

Это можно легко проверить, например, в Rust:

```rust
let number: u8 = 10;

println!("{number:b}");
```

Таким образом, числу `10` в десятичной системе счисления соответствует вектор `1010`, но верно и обратное. Больше того, это соответствие "один ко одному", иными словами вектор `1010` никакое другое десятичное число не представляет. Такая штука называется **биекция**.

### Максимальное число uint

При `w = 4` минимальное число, которое мы можем закодировать &mdash; это, ясное дело, `0 0 0 0`, то есть просто `0`. Максимальное же &mdash; `1 1 1 1`, то есть `15` в десятичной.

Аналогично, для `w = 8` максимальное число &mdash; это `255`.

В общем, здесь всё просто и довольно очевидно: чем больше бит у нас есть, тем более длинные числа мы можем представлять Интереснее становится, когда мы переходим к целым числам, имеющим знак.

## Целые числа со знаком

Итак, теперь мы поговорим про целые числа `int`, которые могут быть как положительными, так и отрицательными. Отрицательное число &mdash; это такое, у которого, по большому счёту, есть знак "минус". Где и как нам этот знак хранить? Раньше в некоторых уроках мы несколько обходили этот момент, говоря, что отдельный бит резервируется под хранение знака. Это некое упрощение.

На самом деле, вариантов представления чисел со знаком есть некоторое количество (в том числе, и случай, когда наиболее значимый бит просто говорит "есть минус или нет минуса"). Но, пожалуй, самый распространённый принцип &mdash; это так называемый **two's complement**.

### Two's complement

Суть данного метода довольно проста. Как и с `uint`, у нас опять есть вектор указанной длины из нулей и единиц, предположим, `1 0 1 1`.

Все биты, за исключением наиболее значимого, интерпретируются как и раньше, то есть "привносят" в значение `2 ** i`. Для последовательности выше мы получим:

```text
2 ** 1 + 2 ** 0 = 2 + 1 = 3
```

Наиболее значимый бит (запишем его как `X`) имеет специальное назначение, и он фигурирует в выражении:

```text
-X * (2 ** (w - 1))
```

В нашем случае выходит:

```text
-1 * (2 ** 3) = -8
```

Полученное значение затем просто суммируется с тем, что мы получили после обработки всех битов, кроме наиболее значимого:

```text
-8 + 3 = - 5
```

Следовательно, вектор `1011` в двоичной системе счисления равняется `-5` в десятичной.

Если же самый наиболее бит `X = 0`, то формула выше обращается в ноль, и наше число будет неотрицательным. К примеру, `0 1 0 1 = 2 ** 2 + 2 ** 0 = 5`.

### Минимальное и максимальное число int

Можно сказать, что при использовании подхода two's complement наиболее значимый бит `X` "тянет" наше число в сторону отрицательных значений, а другие биты "тянут" его обратно на положительную сторону. Следовательно, наименьшее значение получится, когда `X` тянет нас в отрицательную сторону, но все остальные биты отсутствуют:

```text
1 0 0 0 = -(2 ** 3) = -8
```

То есть при `w = 4` наименьшее значение равняется `-8`.

Максимальное значение получается, когда "знаковый" бит равен нулю, зато все остальные, которые тянут нас в положительную сторону, имеют значение `1`:

```text
0 1 1 1 = 2 ** 2 + 2 ** 1 + 2 ** 0 = 4 + 2 + 1 = 7
```

Аналогично, при `w = 8` диапазон будет от -128 до 127. К примеру этот код вернёт `10000000`:

```rust
let number: i8 = -128;
println!("{number:b}");
```

## Как отличать uint от int?

А теперь важный момент: мы понимаем, что **наш вектор из битов можно рассматривать по-разному**. Если мы считаем, что наиболее значимый бит используется для хранения информации о знаке, то, к примеру, последовательность `10110100` кодирует число `-76`. Но если мы считаем, что речь идёт о неотрицательных числах, то это `180`!

Иными словами, нам нужно объяснить компьютеру, с чем мы имеем дело и как хотим интерпретировать этот вектор. Именно поэтому во многих языках при объявляении переменной мы должны написать `uint` или `int` (ну, или нечто аналогичное). И именно поэтому нам нужно быть очень аккуратными, если мы конвертируем числа со знаком в числа без знака:

```rust
let number: i8 = -6;

println!("{number:b}");

let number2: u8 = number as u8;

println!("{number2}");
println!("{number2:b}");
```

Результат выполнения данного кода:

```text
11111010
250
11111010
```

То есть изначальная последовательность битов остаётся прежней, но **интерпретация другая**! Это происходит не только в Rust, но и в других языках, к примеру, в C.

Кстати, в `u8` ситуация может быть не сильно лучше:

```rust
let number: u8 = 255;

let number2: i8 = number as i8;

println!("{number2}");
```

На экран будет выведено `-1`.

Из всего этого следует важный вывод: конвертировать числа таким образом стоит с большой осторожностью, потому что это может привести к неожиданным проблемам и серьёзным багам. Инструмент Clippy в Rust даже выдаст предупреждение на моменте `number as i8`.

Если вам нужно просто "отбросить" знак, то следует использовать функцию "модуль" `.abs()`.