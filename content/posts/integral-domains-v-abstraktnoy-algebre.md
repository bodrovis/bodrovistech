---
title: "Integral Domains: кольца без делителей нуля"
draft: false
date: 2026-06-29
meta_desc: "Понятное введение в integral domains, zero divisors, fields и characteristic ring: почему Z_p является field, чем опасны zero divisors и как они ломают polynomial equations."
tags:
- абстрактная алгебра
- cs
- zero knowledge
---

В прошлой части мы увидели, что **ring / кольцо** — это структура с двумя операциями:

```text
addition
multiplication
```

По addition ring всегда является Abelian group. Но по multiplication всё, как говорится, "хужее":

- не каждый элемент имеет inverse;
- cancellation может не работать;
- два ненулевых элемента могут дать `0`.

Вот последняя штука особенно важна. В обычных integers такого не бывает:

```text
ab = 0
```

значит:

```text
a = 0
```

или:

```text
b = 0
```

Но в некоторых rings это ломается.

Например, в `Z6`:

```text
2 · 3 = 6 ≡ 0 (mod 6)
```

При этом:

```text
2 != 0
3 != 0
```

То есть два ненулевых элемента перемножились и дали `0`. Именно отсюда начинается тема **zero divisors / делителей нуля** и **integral domains / областей целостности**.

## Zero divisors

Пусть `R` — commutative ring. Ненулевой элемент:

```text
a ∈ R
```

называется **zero divisor / делителем нуля**, если существует другой ненулевой элемент:

```text
b ∈ R
```

такой, что:

```text
ab = 0
```

Важно: оба элемента должны быть *ненулевыми*. То есть zero divisor — это не просто элемент, который даёт `0` при умножении на `0`. Это было бы слишком скучно:

```text
a · 0 = 0
```

для любого `a`.

Zero divisor — это элемент, который может дать `0` при умножении на другой ненулевой элемент.

### Пример в `Z6`

В ring:

```text
Z6 = {0, 1, 2, 3, 4, 5}
```

операция multiplication выполняется modulo `6`.

Имеем:

```text
2 · 3 = 6 ≡ 0 (mod 6)
```

При этом:

```text
2 != 0
3 != 0
```

Значит `2` — zero divisor. И `3` тоже zero divisor.

Ещё пример:

```text
3 · 4 = 12 ≡ 0 (mod 6)
```

Значит `4` тоже zero divisor.

## Integral domain

**Integral domain / область целостности** — это commutative ring with unity, в котором *нет* zero divisors.

То есть ring `R` является integral domain, если выполняется:

Multiplication commutative:

```text
ab = ba
```

Есть unity:

```text
1
```

Нет zero divisors.

Последнее условие можно записать так:

```text
ab = 0
```

только если:

```text
a = 0
```

или:

```text
b = 0
```

### Главная идея

Integral domain — это ring, где multiplication ведёт себя ближе к привычным integers. В нём нельзя получить `0`, перемножив два ненулевых элемента.

```text
nonzero · nonzero != 0
```

Именно поэтому слово `domain` тут можно воспринимать как “нормальная область для арифметики без внезапной грязи”.

### Пример: `Z` является integral domain

Ring integers:

```text
Z
```

является integral domain.

Почему? Во-первых, `Z` — commutative ring with unity:

```text
1
```

Во-вторых, в integers нет zero divisors.

Если:

```text
ab = 0
```

то обязательно:

```text
a = 0
```

или:

```text
b = 0
```

Например, невозможно найти два ненулевых integers, произведение которых равно `0`.

Поэтому:

```text
Z is an integral domain
```

### Пример: `Z_p` при prime `p`

Если `p` — prime, то:

```text
Z_p
```

является integral domain.

Например:

```text
Z5 = {0, 1, 2, 3, 4}
```

Проверим ненулевые элементы:

```text
1, 2, 3, 4
```

Никакое произведение двух ненулевых элементов не даст `0 mod 5`.

Например:

```text
2 · 3 = 6 ≡ 1 (mod 5)

2 · 4 = 8 ≡ 3 (mod 5)

3 · 4 = 12 ≡ 2 (mod 5)
```

Нуля не появляется.

Причина в том, что `5` prime.

Если:

```text
ab ≡ 0 (mod 5)
```

это значит:

```text
5 divides ab
```

А так как `5` prime, то:

```text
5 divides a
```

или:

```text
5 divides b
```

То есть в `Z5` один из элементов уже был `0`.

Поэтому `Z5` не имеет zero divisors.

## Почему `Z_n` ломается, если `n` не prime

Если `n` composite, то:

```text
n = ab
```

где:

```text
1 < a < n
```

и:

```text
1 < b < n
```

Тогда в `Z_n`:

```text
a · b = n ≡ 0 (mod n)
```

Но сами `a` и `b` не равны `0` в `Z_n`.

Значит появляются zero divisors.

### Пример: `Z6`

```text
6 = 2 · 3
```

Поэтому в `Z6`:

```text
2 · 3 ≡ 0 (mod 6)
```

При этом:

```text
2 != 0
3 != 0
```

Значит:

```text
Z6 is not an integral domain
```

### Пример: `Z10`

```text
10 = 2 · 5
```

Поэтому в `Z10`:

```text
2 · 5 ≡ 0 (mod 10)
```

Но:

```text
2 != 0
5 != 0
```

Значит:

```text
Z10 is not an integral domain
```

### Главное правило для `Z_n`

```text
Z_n is an integral domain iff n is prime
```

То есть:

```text
Z2, Z3, Z5, Z7, Z11
```

являются integral domains.

А:

```text
Z4, Z6, Z8, Z9, Z10, Z12
```

не являются integral domains.

## Почему integral domains возвращают cancellation

В обычной арифметике мы часто сокращаем одинаковый множитель:

```text
ab = ac
```

если:

```text
a != 0
```

то:

```text
b = c
```

Но в произвольном ring так делать нельзя.

Например, в `Z6`:

```text
2 · 1 = 2
```

и:

```text
2 · 4 = 8 ≡ 2 (mod 6)
```

Значит:

```text
2 · 1 = 2 · 4
```

но:

```text
1 != 4
```

Мы не можем сократить `2`.

Почему? Потому что `2` — zero divisor в `Z6`.

## Cancellation theorem

В integral domain cancellation работает. Пусть `R` — integral domain.

Если:

```text
a != 0
```

и:

```text
ab = ac
```

то:

```text
b = c
```

### Почему это верно

Начинаем с:

```text
ab = ac
```

Переносим всё в одну сторону:

```text
ab - ac = 0
```

Выносим `a`:

```text
a(b - c) = 0
```

Теперь используем главное свойство integral domain: произведение равно `0` только если один из множителей равен `0`.

У нас:

```text
a != 0
```

Значит второй множитель обязан быть `0`:

```text
b - c = 0
```

Следовательно:

```text
b = c
```

## Зачем это вообще нужно

Integral domain — это попытка сохранить в ring важную часть поведения integers. В произвольном ring может быть странно:

```text
nonzero · nonzero = 0
```

и из-за этого ломается cancellation. В integral domain такого нет. Поэтому там снова можно рассуждать привычнее:

```text
a != 0
ab = ac
=> b = c
```

## Fields

### Введение

Теперь усилим условие ещё сильнее. Integral domain запрещает zero divisors, но всё ещё *не требует*, чтобы каждый nonzero element имел multiplicative inverse.

Например:

```text
Z
```

является integral domain.

Но `Z` не является field, потому что элемент:

```text
2
```

не имеет inverse внутри `Z`.

Чтобы `2` был обратимым, нужен был бы элемент:

```text
1/2
```

но:

```text
1/2 not in Z
```

Значит integral domain всё ещё не даёт полноценного деления.

А вот **field / поле** — даёт.

### Определение поля

**Field / поле** — это commutative ring with unity, в котором каждый nonzero element является unit. То есть field — это ring, где можно выполнять:

```text
addition
subtraction
multiplication
division by nonzero elements
```

Деление на `0`, конечно, всё равно запрещено.

Формально `F` является field, если:

1. `F` — commutative ring with unity;
2. для каждого `a ∈ F`, если `a != 0`, существует `a^-1 ∈ F`;
3. выполняется:

```text
aa^-1 = a^-1a = 1
```

### Примеры fields

Привычные examples:

```text
Q
```

rational numbers;

```text
R
```

real numbers;

```text
C
```

complex numbers.

В каждом из них любой nonzero element имеет multiplicative inverse.

Например, в `Q`:

```text
2^-1 = 1/2
```

и:

```text
(3/5)^-1 = 5/3
```

В `R`:

```text
π^-1 = 1/π
```

В `C`:

```text
(1 + i)^-1 = (1 - i)/2
```

### Почему `Z` не field

`Z` — хороший ring и даже integral domain, но не field. Причина простая:

```text
2 ∈ Z
```

но:

```text
2^-1 = 1/2
```

а:

```text
1/2 not in Z
```

Значит не каждый nonzero integer является unit.

Поэтому:

```text
Z is not a field
```

### Every field is an integral domain

Каждое field автоматически является integral domain.

Почему?

Пусть `F` — field, и пусть:

```text
ab = 0
```

Предположим, что:

```text
a != 0
```

Так как `F` — field, у `a` есть inverse:

```text
a^-1
```

Умножим обе стороны равенства:

```text
ab = 0
```

на `a^-1` слева:

```text
a^-1(ab) = a^-1 · 0
```

Левая часть:

```text
a^-1(ab) = (a^-1a)b = 1b = b
```

Правая часть:

```text
a^-1 · 0 = 0
```

Получаем:

```text
b = 0
```

Значит если:

```text
ab = 0
```

то либо:

```text
a = 0
```

либо:

```text
b = 0
```

То есть zero divisors нет.

Следовательно:

```text
field => integral domain
```

### Но не каждый integral domain является field

Обратное неверно.

```text
Z
```

является integral domain, но не является field.

В `Z` нет zero divisors, но не каждый nonzero element обратим.

Например:

```text
2 · b = 1
```

не имеет решения в integers.

Значит:

```text
integral domain does not imply field
```

Общая картина такая:

```text
field
=> integral domain
=> commutative ring with unity
=> ring
```

### Finite integral domains are fields

Есть важный special case:

> every finite integral domain is a field.

То есть если integral domain имеет конечное количество элементов, то каждый nonzero element автоматически имеет inverse.

#### Почему это работает

Пусть `D` — finite integral domain.

Возьмём ненулевой элемент:

```text
a ∈ D
```

Нужно показать, что у `a` есть inverse.

Рассмотрим multiplication by `a`:

```text
x -> ax
```

для всех `x ∈ D`.

То есть мы берём все элементы `D` и умножаем их на `a`.

Если:

```text
ax = ay
```

то по cancellation в integral domain:

```text
x = y
```

Значит mapping:

```text
x -> ax
```

является one-to-one. Но `D` finite. Для finite set любой one-to-one map из множества в себя автоматически является onto.

Значит среди значений:

```text
ax
```

обязательно встретится:

```text
1
```

То есть существует `x ∈ D`, такой что:

```text
ax = 1
```

А это и означает:

```text
x = a^-1
```

Следовательно, каждый nonzero element имеет inverse.

Значит:

```text
D is a field
```

#### Почему `Z_p` является field

Мы уже знаем:

```text
Z_p
```

является integral domain, если `p` prime. Но `Z_p` finite. Значит по теореме:

```text
finite integral domain => field
```

получаем:

```text
Z_p is a field
```

для любого prime `p`.

Например:

```text
Z5 = {0, 1, 2, 3, 4}
```

является field.

Проверим inverses:

```text
1^-1 = 1
```

```text
2 · 3 = 6 ≡ 1 (mod 5)
```

значит:

```text
2^-1 = 3
```

Также:

```text
3^-1 = 2
```

и:

```text
4 · 4 = 16 ≡ 1 (mod 5)
```

значит:

```text
4^-1 = 4
```

Каждый nonzero element имеет inverse.

#### Почему `Z_6` не field

В `Z6`:

```text
Z6 = {0, 1, 2, 3, 4, 5}
```

элемент `2` не имеет inverse.

Проверим:

```text
2 · 0 = 0
2 · 1 = 2
2 · 2 = 4
2 · 3 = 0
2 · 4 = 2
2 · 5 = 4
```

Мы ни разу не получили:

```text
1
```

Значит `2` не является unit.

Поэтому:

```text
Z6 is not a field
```

И это связано с тем, что `6` не prime. В `Z6` есть zero divisors:

```text
2 · 3 = 0
```

А field не может иметь zero divisors.

## Пример поля с девятью элементами `Z3[i]`

Иногда fields выглядят не просто как:

```text
Z_p
```

Можно построить field с `9` элементами:

```text
Z3[i] = {a + bi | a, b ∈ Z3}
```

где:

```text
i^2 = -1
```

Но в `Z3`:

```text
-1 ≡ 2 (mod 3)
```

поэтому можно также думать:

```text
i^2 = 2
```

Элементы этого field:

```text
0
1
2
i
1 + i
2 + i
2i
1 + 2i
2 + 2i
```

Всего их:

```text
3 · 3 = 9
```

потому что для coefficient при `1` есть `3` варианта:

```text
0, 1, 2
```

и для coefficient при `i` тоже есть `3` варианта:

```text
0, 1, 2
```

### Как выполнять операции в `Z3[i]`

Складываем coefficients modulo `3`.

Например:

```text
(1 + 2i) + (2 + i)
=
3 + 3i
≡ 0
```

потому что:

```text
3 ≡ 0 (mod 3)
```

Умножение выполняется как обычно, но с двумя правилами:

```text
coefficients reduced modulo 3
```

и:

```text
i^2 = -1 = 2
```

Например:

```text
(1 + i)(1 - i)
=
1 - i^2
```

Так как:

```text
i^2 = -1
```

получаем:

```text
1 - (-1) = 2
```

То есть:

```text
(1 + i)(1 - i) = 2
```

В `Z3` элемент `2` обратим, потому что:

```text
2 · 2 = 4 ≡ 1 (mod 3)
```

### Почему `Z3[i]` является field

Возьмём ненулевой элемент:

```text
a + bi
```

где `a, b ∈ Z3`.

Как и в complex numbers, можно умножить на conjugate:

```text
a - bi
```

Получаем:

```text
(a + bi)(a - bi)
=
a^2 + b^2
```

потому что:

```text
i^2 = -1
```

Теперь в `Z3` squares выглядят так:

```text
0^2 = 0
1^2 = 1
2^2 = 4 ≡ 1
```

То есть square любого ненулевого элемента равен `1`.

Если `a + bi` не равен `0`, то хотя бы один из `a`, `b` ненулевой.

Тогда:

```text
a^2 + b^2
```

не равно `0` в `Z3`.

Возможные варианты:

```text
1 + 0 = 1
```

```text
0 + 1 = 1
```

```text
1 + 1 = 2
```

И `1`, и `2` обратимы в `Z3`.

Значит каждый ненулевой элемент `a + bi` имеет inverse.

Следовательно:

```text
Z3[i] is a field
```

Это пример finite field with nine elements.

## Characteristic of a ring

Теперь введём ещё одно важное понятие:

```text
characteristic / характеристика
```

Оно отвечает на вопрос:

> сколько раз нужно сложить любой элемент ring с самим собой, чтобы получить `0`?

Запись

```text
nx
```

в additive notation означает:

```text
x + x + ... + x
```

где `x` повторяется `n` раз.

Это не exponent и не multiplication в смысле `x^n`.

Например:

```text
3x = x + x + x
```

### Определение

**Characteristic of a ring** `R` — это наименьшее positive integer `n`, такое что:

```text
nx = 0
```

для всех:

```text
x ∈ R
```

Если такого positive integer не существует, говорят, что ring имеет characteristic `0`.

Обозначение:

```text
char R
```

### Пример: characteristic of `Z`

В `Z` нет такого positive integer `n`, что:

```text
nx = 0
```

для всех integers `x`.

Достаточно взять:

```text
x = 1
```

Тогда:

```text
n · 1 = n
```

А positive integer `n` не равен `0`.

Поэтому:

```text
char Z = 0
```

### Пример: characteristic of `Z_n`

В `Z_n`:

```text
n · x = 0
```

для любого `x`.

Например, в `Z5`:

```text
5x = 0
```

для всех `x ∈ Z5`.

Проверим:

```text
5 · 1 = 5 ≡ 0 (mod 5)
```

```text
5 · 2 = 10 ≡ 0 (mod 5)
```

```text
5 · 3 = 15 ≡ 0 (mod 5)
```

```text
5 · 4 = 20 ≡ 0 (mod 5)
```

Поэтому:

```text
char Z5 = 5
```

В общем виде:

```text
char Z_n = n
```

### Infinite ring может иметь nonzero characteristic

Не надо думать, что characteristic зависит только от количества элементов. Ring может быть infinite, но иметь nonzero characteristic.

Например:

```text
Z2[x]
```

— ring всех polynomials с coefficients в `Z2`.

Элементов там бесконечно много:

```text
0
1
x
x + 1
x^2
x^2 + 1
x^5 + x + 1
...
```

Но coefficients считаются modulo `2`.

Поэтому для любого polynomial `f(x)`:

```text
f(x) + f(x) = 0
```

Например:

```text
(x^2 + x + 1) + (x^2 + x + 1)
=
2x^2 + 2x + 2
=
0
```

потому что в `Z2`:

```text
2 ≡ 0
```

Значит:

```text
char Z2[x] = 2
```

Хотя сам ring infinite.

### Characteristic в ring with unity

Если ring `R` имеет unity `1`, characteristic можно найти проще. Достаточно смотреть на additive order элемента:

```text
1
```

Если:

```text
1 + 1 + ... + 1
```

никогда не даёт `0`, то:

```text
char R = 0
```

Если же минимальное positive `n`, для которого:

```text
n · 1 = 0
```

равно `n`, то:

```text
char R = n
```

То есть:

```text
char R = additive order of 1
```

#### Почему достаточно проверять `1`

Если:

```text
n · 1 = 0
```

то для любого `x ∈ R`:

```text
n · x
=
(1 + 1 + ... + 1)x
```

где `1` повторяется `n` раз.

По distributivity:

```text
(1 + 1 + ... + 1)x
=
x + x + ... + x
```

То есть:

```text
n · x = 0x = 0
```

Значит если `n · 1 = 0`, то `n · x = 0` для всех `x`.

А если `n · x = 0` для всех `x`, то в частности это верно для:

```text
x = 1
```

Поэтому в ring with unity достаточно смотреть на `1`.

## Characteristic of an integral domain

У integral domain characteristic может быть только:

```text
0
```

или:

```text
prime number
```

То есть:

```text
char D = 0
```

или:

```text
char D = p
```

где `p` prime.

### Почему characteristic не может быть composite

Пусть `D` — integral domain, и допустим:

```text
char D = n
```

где `n` composite.

Тогда:

```text
n = ab
```

где:

```text
1 < a < n
```

и:

```text
1 < b < n
```

Так как `char D = n`, то:

```text
n · 1 = 0
```

Но:

```text
n · 1 = (ab) · 1
```

Это можно записать как product:

```text
(a · 1)(b · 1) = 0
```

При этом:

```text
a · 1 != 0
```

и:

```text
b · 1 != 0
```

потому что `a` и `b` меньше минимального positive числа `n`, которое зануляет `1`. Получается произведение двух ненулевых элементов равно `0`. Это zero divisors. Но в integral domain zero divisors быть не может: противоречие. Значит characteristic integral domain не может быть composite.

Поэтому:

```text
char D is 0 or prime
```

## Почему zero divisors ломают привычное решение уравнений

Zero divisors — это не просто странность из определения. Они напрямую влияют на то, как мы решаем polynomial equations.

В школе мы часто используем такой приём:

```text
uv = 0
```

значит:

```text
u = 0
```

или:

```text
v = 0
```

Например, рассмотрим equation:

```text
x^2 - 4x + 3 = 0
```

Слева стоит polynomial:

```text
x^2 - 4x + 3
```

Его можно разложить на множители / factorize, то есть переписать как произведение более простых expressions:

```text
x^2 - 4x + 3 = (x - 3)(x - 1)
```

Это тот же самый polynomial, просто в другой форме. Если раскрыть скобки:

```text
(x - 3)(x - 1)
=
x^2 - x - 3x + 3
=
x^2 - 4x + 3
```

Значит исходное equation можно переписать так:

```text
(x - 3)(x - 1) = 0
```

И обычно мы сразу делаем вывод:

```text
x - 3 = 0
```

или:

```text
x - 1 = 0
```

Поэтому:

```text
x = 3
```

или:

```text
x = 1
```

Но здесь спрятано важное предположение. Мы используем свойство:

```text
uv = 0 => u = 0 or v = 0
```

А это свойство верно в integral domains, потому что там нет zero divisors.

### Пример over `Z12`

В `Z12`:

```text
x^2 - 4x + 3 = (x - 3)(x - 1)
```

но `Z12` не integral domain. Там есть zero divisors:

```text
2 · 6 = 0

3 · 4 = 0

4 · 6 = 0

6 · 8 = 0
```

по modulo `12`.

Поэтому из:

```text
(x - 3)(x - 1) = 0
```

не следует, что обязательно:

```text
x - 3 = 0
```

или:

```text
x - 1 = 0
```

Может быть так, что оба factors nonzero, но их product равен `0`.

#### Проверим решения в `Z12`

Решаем:

```text
x^2 - 4x + 3 = 0
```

over:

```text
Z12
```

В `Z12` нужно проверять residues:

```text
0, 1, 2, ..., 11
```

Посмотрим на четыре решения.

##### `x = 1`

```text
1^2 - 4 · 1 + 3
=
1 - 4 + 3
=
0
```

Значит:

```text
x = 1
```

solution.

##### `x = 3`

```text
3^2 - 4 · 3 + 3
=
9 - 12 + 3
=
0
```

Значит:

```text
x = 3
```

solution.

##### `x = 7`

```text
7^2 - 4 · 7 + 3
=
49 - 28 + 3
=
24
```

А:

```text
24 ≡ 0 (mod 12)
```

Значит:

```text
x = 7
```

тоже solution.

##### `x = 9`

```text
9^2 - 4 · 9 + 3
=
81 - 36 + 3
=
48
```

А:

```text
48 ≡ 0 (mod 12)
```

Значит:

```text
x = 9
```

тоже solution.

Итого в `Z12`:

```text
x = 1, 3, 7, 9
```

являются solutions.

#### Почему появились лишние решения

Возьмём:

```text
x = 7
```

Тогда:

```text
(x - 3)(x - 1)
=
(7 - 3)(7 - 1)
=
4 · 6
=
24
≡ 0 (mod 12)
```

Но:

```text
4 != 0 in Z12
```

и:

```text
6 != 0 in Z12
```

То есть factors не равны `0`, но их product равен `0`.

Это возможно именно из-за zero divisors.

## Что важно для crypto

В крипте часто работают не просто modulo `n`, а modulo prime:

```text
mod p
```

Потому что:

```text
Z_p
```

является field.

А значит:

* нет zero divisors;
* каждый nonzero element имеет inverse;
* можно делить на nonzero elements;
* polynomial equations ведут себя намного предсказуемее;
* можно строить finite fields.

Например, elliptic curves обычно задаются over finite fields:

```text
F_p
```

или:

```text
F_(2^m)
```

Там field structure критически важна.

Если взять случайное composite modulo, арифметика может внезапно сломаться из-за zero divisors.