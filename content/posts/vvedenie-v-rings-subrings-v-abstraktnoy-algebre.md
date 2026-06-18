---
title: "Введение в rings (кольца): группы с двумя операциями"
draft: false
date: 2026-06-11
meta_desc: "Понятное введение в rings: определение кольца, сложение и умножение, unity, units, примеры Z, Z_n, polynomial rings, subrings и основные свойства."
tags:
- абстрактная алгебра
- cs
- zero knowledge
---

До сих пор мы в основном изучали **groups / группы**. У группы есть **одна основная операция**. Например:

```text
(Z, +)
```

— integers под сложением.

Или:

```text
U(n)
```

— обратимые элементы modulo `n` под умножением.

Но у многих привычных множеств естественно существуют сразу две операции:

```text
addition
multiplication
```

Например:

```text
integers
real numbers
integers modulo n
matrices
polynomials
```

Мы можем складывать integers и можем их умножать. То же самое можно делать с matrices и polynomials. Структура, которая учитывает обе операции одновременно, называется: **ring / кольцо**.

Главная идея:

> Group описывает одну операцию. Ring описывает сложение, умножение и то, как они взаимодействуют друг с другом.

## Определение ring

Ring `R` — это множество с двумя binary operations:

```text
a + b
```

и:

```text
ab
```

которые удовлетворяют определённым свойствам.

Для любых:

```text
a, b, c ∈ R
```

должны выполняться следующие условия.

## Свойства сложения

### Сложение коммутативно

```text
a + b = b + a
```

### Сложение ассоциативно

```text
(a + b) + c = a + (b + c)
```

### Существует additive identity

В ring обязательно есть элемент:

```text
0
```

такой, что:

```text
a + 0 = a
```

для любого `a ∈ R`.

### У каждого элемента есть additive inverse

Для каждого `a ∈ R` существует элемент:

```text
-a
```

такой, что:

```text
a + (-a) = 0
```

Эти четыре свойства означают:

```text
(R, +)
```

является **Abelian group**.

> То есть по сложению ring всегда является Abelian group.

## Свойство умножения

### Умножение ассоциативно

```text
a(bc) = (ab)c
```

Но умножение не обязано быть commutative.

То есть в общем случае может быть:

```text
ab != ba
```

## Связь сложения и умножения

### Выполняются distributive laws

Слева:

```text
a(b + c) = ab + ac
```

И справа:

```text
(b + c)a = ba + ca
```

Обе distributive laws нужны, потому что multiplication в ring может быть noncommutative.

Если бы мы заранее знали:

```text
ab = ba
```

то одной distributive law было бы достаточно для получения другой.

## Короткая формулировка

Ring — это множество `R`, для которого:

```text
(R, +)
```

является Abelian group,

multiplication является associative:

```text
a(bc) = (ab)c
```

и multiplication распределяется относительно addition:

```text
a(b + c) = ab + ac
(a + b)c = ac + bc
```

## Важная договорённость о multiplicative identity

В разных книгах определение ring немного отличается. Некоторые авторы требуют, чтобы в каждом ring обязательно существовал multiplicative identity:

```text
1
```

такой, что:

```text
1a = a1 = a
```

Но в нашем учебнике ring **не обязано** иметь multiplicative identity.

Поэтому мы будем различать:

```text
ring
```

и:

```text
ring with unity
```

Ring with unity — это ring, в котором существует multiplicative identity `1`.

## Два разных identity

В ring могут фигурировать два разных identity elements.

### Additive identity

`0` удовлетворяет:

```text
a + 0 = a
```

Он существует в любом ring.

## Multiplicative identity

`1` удовлетворяет:

```text
a · 1 = 1 · a = a
```

Он может не существовать.

Поэтому нельзя путать:

```text
0
```

и:

```text
1
```

Первый связан со сложением, второй — с умножением.

## Commutative ring

Ring называется **commutative ring / коммутативным кольцом**, если multiplication commutative:

```text
ab = ba
```

для любых:

```text
a, b ∈ R
```

Например:

```text
Z
Z_n
R
Z[x]
```

являются commutative rings.

Но rings of matrices обычно noncommutative, потому что для matrices может выполняться:

```text
AB != BA
```

## Unity и unit — не одно и то же

Термины здесь похожи, поэтому легко запутаться.

### Unity

**Unity / multiplicative identity** — это конкретный элемент `1`, для которого:

```text
1a = a1 = a
```

для любого `a`.

Если unity существует, оно единственно.

### Unit

**Unit / обратимый элемент кольца** — это элемент `a`, для которого существует multiplicative inverse:

```text
a^-1
```

такой, что:

```text
aa^-1 = a^-1a = 1
```

То есть:

```text
a is a unit
```

если `a` обратим относительно multiplication.

Не каждый nonzero element ring обязан быть unit. Например, в `Z` элемент `2` не имеет multiplicative inverse внутри `Z`:

```text
1/2 not in Z
```

Поэтому `2` не является unit в `Z`.

## Пример: ring `Z`

Рассмотрим:

```text
Z
```

с обычными addition и multiplication.

По сложению:

```text
(Z, +)
```

является Abelian group.

Умножение associative и commutative:

```text
a(bc) = (ab)c
```

```text
ab = ba
```

Также выполняется distributivity:

```text
a(b + c) = ab + ac
```

В `Z` есть multiplicative identity:

```text
1
```

Следовательно, `Z` — commutative ring with unity.

### Units в `Z`

Ищем integers, имеющие multiplicative inverse также в `Z`.

Для `1`:

```text
1 · 1 = 1
```

Поэтому `1` — unit.

Для `-1`:

```text
(-1)(-1) = 1
```

Поэтому `-1` — unit.

Других units нет.

Например, для `2` потребовался бы элемент:

```text
1/2
```

но:

```text
1/2 not in Z
```

Следовательно:

```text
units of Z = {1, -1}
```

## Пример: ring `Z_n`

Рассмотрим:

```text
Z_n = {0, 1, 2, ..., n - 1}
```

Теперь мы используем на этом множестве сразу две операции:

```text
addition modulo n
```

и:

```text
multiplication modulo n
```

Это commutative ring with unity `1`.

Например:

```text
Z_6 = {0, 1, 2, 3, 4, 5}
```

В нём:

```text
4 + 5 = 9 ≡ 3 (mod 6)
```

и:

```text
4 · 5 = 20 ≡ 2 (mod 6)
```

### Units в `Z_n`

Units ring `Z_n` — это элементы, имеющие multiplicative inverse modulo `n`.

Именно они образуют знакомую нам группу:

```text
U(n)
```

То есть:

```text
units of Z_n = U(n)
```

Например:

```text
U(10) = {1, 3, 7, 9}
```

Проверим элемент `3`:

```text
3 · 7 = 21 ≡ 1 (mod 10)
```

Поэтому:

```text
3^-1 = 7 mod 10
```

Значит `3` является unit в ring `Z_10`.

А элемент `2` не является unit, потому что не существует `x`, для которого:

```text
2x ≡ 1 (mod 10)
```

### Не путать `Z_n` и `U(n)`

```text
Z_n
```

— это ring со всеми residues:

```text
0, 1, ..., n - 1
```

и двумя операциями:

```text
addition modulo n
multiplication modulo n
```

А:

```text
U(n)
```

— это только обратимые элементы `Z_n` под multiplication.

Например:

```text
Z_10 = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
```

но:

```text
U(10) = {1, 3, 7, 9}
```

- `Z_10` — ring.
- `U(10)` — multiplicative group of units этого ring.

## Что такое polynomial

**Polynomial / многочлен** — это выражение вида:

```text
a0 + a1x + a2x^2 + ... + anx^n
```

где:

```text
a0, a1, ..., an
```

— coefficients / коэффициенты, а `x` — formal variable / формальная переменная.

Например:

```text
3x^2 - 5x + 7
```

Здесь `3` — coefficient при `x^2`; `-5` — coefficient при `x`; `7` — constant term / свободный член.

Можно также мысленно записать:

```text
3x^2 - 5x + 7
=
7 + (-5)x + 3x^2
```

### Что значит formal variable

В polynomial expression символ `x` не обязан прямо сейчас означать какое-то конкретное число. Это просто формальный символ, с которым мы работаем по обычным algebraic rules.

Например:

```text
f(x) = 3x^2 - 5x + 7
```

— это сам polynomial.

А уже отдельно можно подставить конкретное значение:

```text
f(2)
=
3 · 2^2 - 5 · 2 + 7
=
12 - 10 + 7
=
9
```

Но polynomial:

```text
3x^2 - 5x + 7
```

и его значение при `x = 2`:

```text
9
```

— не одно и то же.

Первое — algebraic object, второе — результат evaluation / подстановки.

### Какие выражения являются polynomials

Вот polynomials:

```text
3x^2 - 5x + 7
```

```text
x^4 + 2
```

```text
-8x
```

```text
4
```

```text
0
```

Constant number тоже считается polynomial.

Например `4` можно понимать как:

```text
4x^0
```

потому что:

```text
x^0 = 1
```

А expression:

```text
-8x
```

можно записать как:

```text
0 + (-8)x
```

### Какие выражения не являются обычными polynomials

Например:

```text
1 / x
```

не является polynomial, потому что это:

```text
x^-1
```

а в обычном polynomial powers переменной должны быть nonnegative integers:

```text
0, 1, 2, 3, ...
```

Также не являются polynomials:

```text
sqrt(x)
x^(1/2)
2^x
sin(x)
```

Это другие виды functions или algebraic expressions.

### Degree polynomial

**Degree / степень многочлена** — это наибольшая power `x`, перед которой стоит nonzero coefficient.

Например:

```text
f(x) = 3x^4 - 2x + 1
```

имеет degree:

```text
deg f = 4
```

Polynomial:

```text
7x^2 + 100
```

имеет degree:

```text
2
```

Constant nonzero polynomial:

```text
5
```

имеет degree:

```text
0
```

Для zero polynomial:

```text
0
```

degree обычно либо не определяют, либо условно считают равной `-∞`.

Для нашего введения это пока не особо важно.

## Как складывать polynomials

Polynomials складываются по одинаковым powers `x`.

Возьмём:

```text
f(x) = 3x^2 + 2x + 1
```

и:

```text
g(x) = x^2 - 5x + 4
```

Тогда:

```text
f(x) + g(x)
=
(3x^2 + 2x + 1) + (x^2 - 5x + 4)
```

Собираем одинаковые powers:

```text
(3 + 1)x^2 + (2 - 5)x + (1 + 4)
```

Получаем:

```text
f(x) + g(x)
=
4x^2 - 3x + 5
```

То есть coefficients складываются независимо:

```text
x^2 terms
x terms
constant terms
```

### Более короткий пример

```text
(x + 1) + (x^2 - 3)
```

Собираем terms:

```text
x^2 + x + 1 - 3
```

Получаем:

```text
x^2 + x - 2
```

## Как вычитать polynomials

Вычитание работает так же: вычитаем соответствующие coefficients.

Пусть:

```text
f(x) = 3x^2 + 2x + 1
```

```text
g(x) = x^2 - 5x + 4
```

Тогда:

```text
f(x) - g(x)
=
(3x^2 + 2x + 1) - (x^2 - 5x + 4)
```

Раскрываем minus:

```text
3x^2 + 2x + 1 - x^2 + 5x - 4
```

Получаем:

```text
2x^2 + 7x - 3
```

## Как умножать polynomials

При multiplication каждый term первого polynomial умножается на каждый term второго.

Используется distributive law:

```text
a(b + c) = ab + ac
```

Например:

```text
(x + 1)(x - 1)
```

Умножаем каждый term:

```text
x · x + x · (-1) + 1 · x + 1 · (-1)
```

Получаем:

```text
x^2 - x + x - 1
```

Средние terms сокращаются:

```text
-x + x = 0
```

Поэтому:

```text
(x + 1)(x - 1) = x^2 - 1
```

### Ещё один пример multiplication

```text
(2x + 3)(x^2 - x + 4)
```

Сначала умножаем `2x` на каждый term:

```text
2x · x^2 = 2x^3
```

```text
2x · (-x) = -2x^2
```

```text
2x · 4 = 8x
```

Теперь `3` на каждый term:

```text
3 · x^2 = 3x^2
```

```text
3 · (-x) = -3x
```

```text
3 · 4 = 12
```

Собираем всё:

```text
2x^3 - 2x^2 + 8x + 3x^2 - 3x + 12
```

Объединяем одинаковые powers:

```text
2x^3 + x^2 + 5x + 12
```

### Почему powers складываются

При multiplication:

```text
x^m · x^n = x^(m+n)
```

Например:

```text
x^2 · x^3 = x^5
```

Потому что:

```text
x^2 · x^3
=
(x · x)(x · x · x)
=
x · x · x · x · x
=
x^5
```

## Что означает `Z[x]`

Теперь можно ввести notation:

```text
Z[x]
```

Она означает:

> множество всех polynomials in variable `x` с integer coefficients.

Формально:

```text
Z[x]
=
{
a0 + a1x + a2x^2 + ... + anx^n
|
ai ∈ Z
}
```

То есть каждый coefficient обязан быть integer:

```text
..., -2, -1, 0, 1, 2, ...
```

Например, в `Z[x]` лежат:

```text
3x^2 - 5x + 7
x^4 + 2
-8x
4
0
```

### Что не лежит в `Z[x]`

Polynomial:

```text
(1/2)x + 3
```

не принадлежит `Z[x]`, потому что coefficient:

```text
1/2
```

не является integer.

Но он принадлежит:

```text
Q[x]
```

— ring polynomials с rational coefficients.

А polynomial:

```text
sqrt(2)x^2 + π
```

не лежит в `Z[x]` или `Q[x]`, но лежит в:

```text
R[x]
```

потому что его coefficients являются real numbers.

## Почему `Z[x]` является ring

На множестве:

```text
Z[x]
```

заданы две операции:

```text
polynomial addition
```

и:

```text
polynomial multiplication
```

Нужно понять, почему результат снова остаётся в `Z[x]`.

### Closure under addition

Если coefficients двух polynomials являются integers, то после сложения coefficients снова получаются integers.

Например:

```text
(3x^2 - 5x + 7) + (2x^2 + x - 4)
```

даёт:

```text
5x^2 - 4x + 3
```

Все coefficients:

```text
5, -4, 3
```

остаются integers.

### Additive identity

Zero polynomial:

```text
0
```

является additive identity:

```text
f(x) + 0 = f(x)
```

для любого:

```text
f(x) ∈ Z[x]
```

### Additive inverse

Для каждого polynomial:

```text
f(x)
```

существует:

```text
-f(x)
```

Например, для:

```text
f(x) = 3x^2 - 5x + 7
```

additive inverse равен:

```text
-f(x) = -3x^2 + 5x - 7
```

И:

```text
f(x) + (-f(x)) = 0
```

### Closure under multiplication

При multiplication integer coefficients складываются и перемножаются.

А сумма и произведение integers снова являются integers.

Например:

```text
(x + 1)(x - 1) = x^2 - 1
```

Результат снова принадлежит:

```text
Z[x]
```

### Multiplication associative и commutative

Для polynomials:

```text
f(x)(g(x)h(x))
=
(f(x)g(x))h(x)
```

И:

```text
f(x)g(x) = g(x)f(x)
```

Следовательно, multiplication associative и commutative.

### Distributive law

Для любых polynomials:

```text
f(x)(g(x) + h(x))
=
f(x)g(x) + f(x)h(x)
```

Это обычное раскрытие скобок.

### Unity в `Z[x]`

Multiplicative identity — это constant polynomial:

```text
1
```

Почему именно он?

Потому что для любого polynomial:

```text
f(x)
```

выполняется:

```text
1 · f(x) = f(x)
```

и:

```text
f(x) · 1 = f(x)
```

Следовательно:

```text
Z[x]
```

является:

```text
commutative ring with unity
```

### Не путать polynomial и polynomial function

Polynomial:

```text
f(x) = x^2 + 1
```

можно использовать как function:

```text
f : Z -> Z
```

или:

```text
f : R -> R
```

Но сам элемент `Z[x]` — это прежде всего formal expression:

```text
x^2 + 1
```

Например, один и тот же polynomial можно вычислять на разных множествах:

```text
f(2) = 5
```

```text
f(-3) = 10
```

Но от этого сам polynomial не меняется. Это distinction станет особенно важным позже, когда появятся polynomials modulo `n`, quotient rings и finite fields.

## Пример ring без unity

Рассмотрим множество всех continuous functions:

```text
f : R -> R
```

для которых:

```text
f(1) = 0
```

Обозначим это множество через:

```text
S = {f : R -> R | f continuous и f(1) = 0}
```

То есть в `S` лежат continuous real-valued functions, графики которых проходят через точку:

```text
(1, 0)
```

Например, в `S` лежат функции:

```text
f(x) = x - 1
```

и:

```text
g(x) = (x - 1)^2
```

потому что:

```text
f(1) = 1 - 1 = 0
```

и:

```text
g(1) = (1 - 1)^2 = 0
```

---

### Что такое continuous function

Грубо говоря, **continuous function / непрерывная функция** — это функция, график которой не имеет внезапных разрывов, скачков и дыр.

Её можно представить как линию, которую возле каждой точки можно рисовать, не отрывая карандаш от бумаги.

Например:

```text
f(x) = x - 1
```

является continuous function.

Её график — обычная прямая.

Функция:

```text
g(x) = x^2
```

тоже continuous.

А вот функция:

```text
h(x) = 0, если x < 0
h(x) = 1, если x >= 0
```

не continuous в точке `0`, потому что там значение резко прыгает с `0` на `1`.

Для нашего примера важно следующее свойство:

> Сумма и произведение continuous functions снова являются continuous functions.

То есть если `f` и `g` continuous, то функции:

```text
f + g
```

и:

```text
fg
```

тоже continuous.

---

### Что значит pointwise operation

Functions здесь складываются и умножаются **pointwise / поточечно**.

Это означает, что мы берём конкретное значение `x` и выполняем операцию над значениями функций в этой точке.

Addition определяется так:

```text
(f + g)(x) = f(x) + g(x)
```

Например, если:

```text
f(x) = x - 1
```

и:

```text
g(x) = (x - 1)^2
```

то:

```text
(f + g)(x)
=
(x - 1) + (x - 1)^2
```

Multiplication определяется так:

```text
(fg)(x) = f(x)g(x)
```

В нашем примере:

```text
(fg)(x)
=
(x - 1)(x - 1)^2
=
(x - 1)^3
```

---

### Проверяем closure under addition

Пусть:

```text
f ∈ S
```

и:

```text
g ∈ S
```

Это означает:

```text
f(1) = 0
```

и:

```text
g(1) = 0
```

Тогда:

```text
(f + g)(1)
=
f(1) + g(1)
=
0 + 0
=
0
```

Кроме того, сумма continuous functions снова continuous.

Значит:

```text
f + g ∈ S
```

---

### Проверяем additive inverse

Если:

```text
f(1) = 0
```

то для функции:

```text
-f
```

получаем:

```text
(-f)(1)
=
-f(1)
=
-0
=
0
```

Функция `-f` также continuous.

Следовательно:

```text
-f ∈ S
```

Additive identity — это zero function:

```text
0(x) = 0
```

Она continuous и удовлетворяет:

```text
0(1) = 0
```

Поэтому по addition множество `S` образует Abelian group.

---

### Проверяем closure under multiplication

Пусть снова:

```text
f(1) = 0
```

и:

```text
g(1) = 0
```

Тогда:

```text
(fg)(1)
=
f(1)g(1)
=
0 · 0
=
0
```

Произведение continuous functions также continuous.

Значит:

```text
fg ∈ S
```

Multiplication functions commutative, потому что для каждого `x`:

```text
f(x)g(x) = g(x)f(x)
```

Следовательно:

```text
fg = gf
```

Таким образом, `S` является commutative ring.

---

## Почему у этого ring нет unity

В большом ring всех continuous functions multiplicative identity — это constant function:

```text
1(x) = 1
```

потому что для любой функции `f`:

```text
1(x)f(x) = f(x)
```

Но constant function `1` не принадлежит нашему множеству:

```text
1(1) = 1
```

а нам требуется:

```text
f(1) = 0
```

Однако надо проверить, не может ли существовать какая-нибудь другая функция, играющая роль unity только внутри `S`.

Предположим, что такая функция существует:

```text
u ∈ S
```

и для любой:

```text
f ∈ S
```

выполняется:

```text
uf = f
```

Возьмём конкретную функцию:

```text
f(x) = x - 1
```

Она принадлежит `S`, потому что:

```text
f(1) = 0
```

Условие:

```text
uf = f
```

означает:

```text
u(x)(x - 1) = x - 1
```

Для любого:

```text
x != 1
```

можно сократить на `x - 1` и получить:

```text
u(x) = 1
```

Значит возможная unity должна удовлетворять:

```text
u(x) = 1
```

для всех `x != 1`.

Но поскольку:

```text
u ∈ S
```

обязательно:

```text
u(1) = 0
```

Получилась бы функция:

```text
u(x) = 1, если x != 1
u(x) = 0, если x = 1
```

У неё есть резкий провал в точке `1`, поэтому она не continuous.

Следовательно, такой функции `u` в `S` не существует.

Поэтому:

```text
S
```

является commutative ring without unity.

---

### Главная мысль

Функции из `S` обязаны обращаться в `0` при `x = 1`.

Addition и multiplication не нарушают это условие:

```text
0 + 0 = 0
```

```text
0 · 0 = 0
```

Но multiplicative identity должна быть равна `1` почти везде, чтобы не менять другие функции.

Совместить это с условием:

```text
u(1) = 0
```

и при этом сохранить continuity невозможно.

## Direct product rings

Пусть:

```text
R1, R2, ..., Rn
```

— rings.

Можно построить новое ring из tuples:

```text
R1 ⊕ R2 ⊕ ... ⊕ Rn
```

Его элементы имеют вид:

```text
(a1, a2, ..., an)
```

где:

```text
ai ∈ Ri
```

Операции выполняются componentwise.

Addition:

```text
(a1, ..., an) + (b1, ..., bn)
=
(a1 + b1, ..., an + bn)
```

Multiplication:

```text
(a1, ..., an)(b1, ..., bn)
=
(a1b1, ..., anbn)
```

## Конкретный пример

Рассмотрим:

```text
Z2 ⊕ Z3
```

Возьмём элементы:

```text
(1, 2)
```

и:

```text
(1, 1)
```

Сложение:

```text
(1, 2) + (1, 1)
=
(1 + 1 mod 2, 2 + 1 mod 3)
=
(0, 0)
```

Multiplication:

```text
(1, 2)(1, 1)
=
(1 · 1 mod 2, 2 · 1 mod 3)
=
(1, 2)
```

Это ring с componentwise operations.

## Divisibility в ring

Пусть `R` — commutative ring, а:

```text
a, b ∈ R
```

Говорят, что `a` divides `b`, если существует:

```text
c ∈ R
```

такой, что:

```text
b = ac
```

Обозначение:

```text
a | b
```

Если такого `c` нет:

```text
a ∤ b
```

### Пример в `Z`

```text
3 | 12
```

потому что:

```text
12 = 3 · 4
```

Но:

```text
5 ∤ 12
```

потому что не существует integer `c`, для которого:

```text
12 = 5c
```

### Пример в `Z_12`

В ring `Z_12`:

```text
4 | 8
```

потому что:

```text
4 · 2 ≡ 8 (mod 12)
```

Также:

```text
4 | 0
```

потому что:

```text
4 · 0 = 0
```

Вообще любой элемент ring делит `0`.

## Что означает `n · a`

В additive groups notation:

```text
na
```

означает repeated addition:

```text
a + a + ... + a
```

где `a` встречается `n` раз.

В ring это может вызвать путаницу, потому что рядом существует ещё и multiplication внутри ring.

Поэтому иногда пишут:

```text
n · a
```

чтобы подчеркнуть:

> это `n` раз сложить `a` с самим собой`, а не обязательно отдельная ring operation с элементом `n`.

Например:

```text
3 · a = a + a + a
```

## Основные свойства multiplication

Теперь выведем несколько знакомых правил, которые в обычной арифметике кажутся очевидными.

В abstract ring их нужно получить из axioms.

### Умножение на zero

Для любого `a ∈ R`:

```text
a0 = 0
```

и:

```text
0a = 0
```

#### Почему `a0 = 0`

Так как:

```text
0 + 0 = 0
```

получаем:

```text
a0 = a(0 + 0)
```

По distributivity:

```text
a(0 + 0) = a0 + a0
```

Следовательно:

```text
a0 = a0 + a0
```

Добавим additive inverse `-a0` к обеим сторонам:

```text
0 = a0
```

Значит:

```text
a0 = 0
```

Аналогично доказывается:

```text
0a = 0
```

### Умножение на negative element

Для любых `a, b ∈ R`:

```text
a(-b) = -(ab)
```

и:

```text
(-a)b = -(ab)
```

Например:

```text
a(-b) + ab
=
a((-b) + b)
=
a0
=
0
```

Значит `a(-b)` является additive inverse элемента `ab`:

```text
a(-b) = -(ab)
```

### Minus на minus

```text
(-a)(-b) = ab
```

Потому что:

```text
(-a)(-b)
=
-((-a)b)
```

Но:

```text
(-a)b = -(ab)
```

Следовательно:

```text
-(-(ab)) = ab
```

### Distributivity over subtraction

Subtraction определяется как:

```text
b - c = b + (-c)
```

Поэтому:

```text
a(b - c)
=
a(b + (-c))
=
ab + a(-c)
=
ab - ac
```

То есть:

```text
a(b - c) = ab - ac
```

Аналогично:

```text
(b - c)a = ba - ca
```

### Что происходит с `-1`

Следующие свойства имеют смысл только в ring with unity.

Для любого `a`:

```text
(-1)a = -a
```

Потому что:

```text
(-1)a + a
=
(-1)a + 1a
=
((-1) + 1)a
=
0a
=
0
```

Значит `(-1)a` является additive inverse элемента `a`.

Также:

```text
(-1)(-1) = 1
```

Это знакомое правило:

```text
minus times minus equals plus
```

Но теперь оно не предполагается заранее, а выводится из ring axioms.

### Unity и inverses единственны

Если ring имеет multiplicative identity, оно unique.

Допустим, существуют два identity elements:

```text
1
```

и:

```text
1'
```

Тогда:

```text
1 = 1 · 1'
```

потому что `1'` — identity.

Но также:

```text
1 · 1' = 1'
```

потому что `1` — identity.

Следовательно:

```text
1 = 1'
```

### Multiplicative inverse также unique

Пусть `b` и `c` — inverses элемента `a`.

То есть:

```text
ab = ba = 1
```

и:

```text
ac = ca = 1
```

Тогда:

```text
b
=
b1
=
b(ac)
=
(ba)c
=
1c
=
c
```

Следовательно, inverse unique.

Поэтому запись:

```text
a^-1
```

не ambiguous.

## Ring — не группа под умножением

Это одна из самых важных вещей.

Ring обязательно является Abelian group под addition:

```text
(R, +)
```

Но множество всех элементов ring обычно **не является group под multiplication**.

Причин может быть несколько:

* multiplicative identity может отсутствовать;
* многие элементы могут не иметь multiplicative inverses;
* multiplication может быть noncommutative;
* cancellation может не работать.

## Почему нельзя автоматически сокращать

В обычных real numbers из:

```text
ab = ac
```

и:

```text
a != 0
```

можно заключить:

```text
b = c
```

Но в произвольном ring это неверно.

### Конкретный пример в `Z_6`

В `Z_6`:

```text
2 · 1 = 2
```

и:

```text
2 · 4 = 8 ≡ 2 (mod 6)
```

Поэтому:

```text
2 · 1 = 2 · 4
```

Но:

```text
1 != 4
```

Мы не можем сократить множитель `2`. Причина в том, что `2` не является unit в `Z_6`. У него нет multiplicative inverse modulo `6`.

## Из `a² = a` не следует `a = 0` или `a = 1`

В real numbers:

```text
a² = a
```

можно переписать как:

```text
a(a - 1) = 0
```

и получить:

```text
a = 0
```

или:

```text
a = 1
```

Но в произвольном ring это может быть неверно.

### Пример в `Z_6`

Возьмём:

```text
a = 3
```

Тогда:

```text
3² = 9 ≡ 3 (mod 6)
```

Получается:

```text
a² = a
```

но:

```text
a != 0
```

и:

```text
a != 1
```

Элемент, для которого:

```text
a² = a
```

называется **idempotent / идемпотентом**. В general ring могут существовать nontrivial idempotents.

## Что важно запомнить

Ring имеет две operations:

```text
addition
multiplication
```

По addition ring всегда является Abelian group.

Multiplication обязано быть associative и distributive относительно addition.

Но multiplication:

* не обязано быть commutative;
* может не иметь identity;
* может не иметь inverses для большинства элементов;
* может не поддерживать cancellation.

### Главная мысль

> Ring — это Abelian group под сложением, к которой добавили associative multiplication, совместимое со сложением через distributive laws. Но ring обычно не является group под multiplication.

## Subrings

В group theory мы рассматривали subgroups — подмножества группы, которые сами являются группами относительно той же операции. Для rings идея аналогичная.

Пусть `R` — ring, а:

```text
S ⊆ R
```

Тогда `S` называется **subring / подкольцом** ring `R`, если:

1. элементы `S` складываются и умножаются так же, как в `R`;
2. результат этих операций остаётся внутри `S`;
3. само `S` удовлетворяет всем axioms ring.

То есть subring — это не новый ring с придуманными операциями. Мы берём часть уже существующего ring и сохраняем исходные addition и multiplication.

### Определение

Подмножество:

```text
S ⊆ R
```

является subring ring `R`, если `S` само является ring относительно операций, унаследованных от `R`.

Например, если `R = Z`, то внутри него можно рассмотреть:

```text
2Z = {..., -4, -2, 0, 2, 4, ...}
```

Addition и multiplication здесь обычные, такие же, как во всём `Z`.

## Subring test

Проверять с нуля все axioms ring каждый раз было бы муторно. Поэтому используется **subring test**.

Непустое подмножество:

```text
S ⊆ R
```

является subring, если для любых:

```text
a, b ∈ S
```

выполняются два условия:

```text
a - b ∈ S
```

и:

```text
ab ∈ S
```

То есть `S` должно быть closed under:

```text
subtraction
multiplication
```

### Почему проверяется именно subtraction

Чтобы `S` было ring по addition, оно должно быть Abelian group.

Условие:

```text
a - b ∈ S
```

одновременно даёт всё необходимое.

Если взять:

```text
a = b
```

то:

```text
a - a = 0 ∈ S
```

Значит в `S` есть additive identity.

Теперь, раз:

```text
0 ∈ S
```

для любого `a ∈ S` получаем:

```text
0 - a = -a ∈ S
```

Значит вместе с каждым элементом в `S` лежит его additive inverse.

Наконец:

```text
a + b = a - (-b)
```

А поскольку:

```text
-b ∈ S
```

то:

```text
a + b ∈ S
```

Таким образом, closure under subtraction автоматически обеспечивает:

* наличие `0`;
* наличие additive inverses;
* closure under addition.

Associativity и commutativity addition уже наследуются от большого ring `R`.

### Почему отдельно проверяется multiplication

Из closure under subtraction ничего не следует про multiplication.

Поэтому нужно дополнительно проверить:

```text
ab ∈ S
```

для любых:

```text
a, b ∈ S
```

Associativity multiplication и distributive laws отдельно доказывать не нужно: они уже выполняются в `R`, а значит выполняются и для элементов `S`.

## Самые простые subrings

У любого ring `R` есть как минимум два очевидных subrings.

### Нулевой subring

```text
{0}
```

Проверяем:

```text
0 - 0 = 0
```

и:

```text
0 · 0 = 0
```

Поэтому:

```text
{0}
```

является subring любого ring.

Его называют:

```text
trivial subring
```

### Сам ring

Разумеется:

```text
R
```

является subring самого себя.

## Пример: `{0, 2, 4}` внутри `Z6`

Рассмотрим ring:

```text
Z6 = {0, 1, 2, 3, 4, 5}
```

с addition и multiplication modulo `6`.

Возьмём подмножество:

```text
S = {0, 2, 4}
```

Проверим subring test.

### Closure under subtraction

Все возможные результаты modulo `6` снова лежат в `S`.

Например:

```text
2 - 4 = -2 ≡ 4 (mod 6)
```

```text
4 - 2 = 2
```

```text
2 - 2 = 0
```

```text
4 - 4 = 0
```

Результаты всегда принадлежат:

```text
{0, 2, 4}
```

### Closure under multiplication

```text
2 · 2 = 4
```

```text
2 · 4 = 8 ≡ 2 (mod 6)
```

```text
4 · 4 = 16 ≡ 4 (mod 6)
```

При multiplication на `0` результат, конечно, равен `0`.

Значит:

```text
S = {0, 2, 4}
```

является subring ring `Z6`.

## У subring может быть своя unity

В ring `Z6` multiplicative identity — это:

```text
1
```

потому что:

```text
1x = x
```

для любого:

```text
x ∈ Z6
```

Но:

```text
1 ∉ S
```

Тем не менее у subring:

```text
S = {0, 2, 4}
```

есть собственная multiplicative identity:

```text
4
```

Проверим:

```text
4 · 0 = 0
```

```text
4 · 2 = 8 ≡ 2 (mod 6)
```

```text
4 · 4 = 16 ≡ 4 (mod 6)
```

То есть для каждого `x ∈ S`:

```text
4x = x
```

Следовательно, `4` играет роль unity внутри `S`.

Получается:

```text
unity of Z6 = 1
unity of S  = 4
```

Это не противоречие.

Unity определяется относительно конкретного ring и его элементов.

Элемент `4` не является identity для всего `Z6`, например:

```text
4 · 1 = 4 != 1
```

Но для трёх элементов subring `S` он работает как identity.

> В принятом здесь определении subring не обязано содержать ту же unity, что и исходный ring. В других учебниках может использоваться более строгое соглашение: subring ring with unity должен содержать его `1`.

## Пример: `nZ` внутри `Z`

Для любого positive integer `n` рассмотрим:

```text
nZ = {..., -3n, -2n, -n, 0, n, 2n, 3n, ...}
```

Это множество всех integers, делящихся на `n`.

Например:

```text
3Z = {..., -9, -6, -3, 0, 3, 6, 9, ...}
```

Проверим subring test.

Пусть:

```text
a = nk
b = nm
```

где `k, m ∈ Z`.

Тогда:

```text
a - b = nk - nm = n(k - m)
```

Это снова multiple of `n`, поэтому:

```text
a - b ∈ nZ
```

Теперь multiplication:

```text
ab = (nk)(nm) = n(nkm)
```

Это тоже multiple of `n`, поэтому:

```text
ab ∈ nZ
```

Следовательно:

```text
nZ
```

является subring of `Z`.

### Есть ли в `nZ` unity

При:

```text
n > 1
```

элемент `1` не лежит в `nZ`.

И другого multiplicative identity там тоже нет.

Например, unity в `2Z` должна была бы удовлетворять:

```text
u · 2 = 2
```

Отсюда в integers получилось бы:

```text
u = 1
```

но:

```text
1 ∉ 2Z
```

Значит:

```text
2Z
```

— ring without unity.

Вообще при `n > 1`:

```text
nZ
```

не имеет multiplicative identity.

## Пример: Gaussian integers

Рассмотрим множество:

```text
Z[i] = {a + bi | a, b ∈ Z}
```

где:

```text
i^2 = -1
```

Элементы `Z[i]` называются:

```text
Gaussian integers / гауссовыми целыми
```

Например:

```text
3 + 2i
```

```text
-5 + i
```

```text
7
```

```text
-4i
```

Все они лежат в `Z[i]`.

Поскольку Gaussian integers являются complex numbers:

```text
Z[i] ⊆ C
```

Проверим subring test.

Пусть:

```text
x = a + bi
```

и:

```text
y = c + di
```

где:

```text
a, b, c, d ∈ Z
```

### Subtraction

```text
x - y
=
(a + bi) - (c + di)
=
(a - c) + (b - d)i
```

Так как:

```text
a - c ∈ Z
```

и:

```text
b - d ∈ Z
```

полученный элемент снова лежит в:

```text
Z[i]
```

### Multiplication

```text
xy
=
(a + bi)(c + di)
```

Раскрываем скобки:

```text
xy
=
ac + adi + bci + bd i^2
```

Поскольку:

```text
i^2 = -1
```

получаем:

```text
xy
=
(ac - bd) + (ad + bc)i
```

Оба коэффициента являются integers, поэтому:

```text
xy ∈ Z[i]
```

Следовательно:

```text
Z[i]
```

является subring of `C`.

## Пример: функции, проходящие через origin

Пусть `R` — ring всех real-valued functions:

```text
f : R -> R
```

Operations определяются pointwise:

```text
(f + g)(x) = f(x) + g(x)
```

```text
(fg)(x) = f(x)g(x)
```

Теперь рассмотрим subset:

```text
S = {f ∈ R | f(0) = 0}
```

То есть `S` состоит из функций, графики которых проходят через origin:

```text
(0, 0)
```

Проверим subring test.

Пусть:

```text
f, g ∈ S
```

Тогда:

```text
f(0) = 0
g(0) = 0
```

Для subtraction:

```text
(f - g)(0)
=
f(0) - g(0)
=
0 - 0
=
0
```

Значит:

```text
f - g ∈ S
```

Для multiplication:

```text
(fg)(0)
=
f(0)g(0)
=
0 · 0
=
0
```

Значит:

```text
fg ∈ S
```

Следовательно, `S` является subring ring всех real-valued functions.

### Почему у этого subring нет unity

Unity в ring всех functions — это constant function:

```text
1(x) = 1
```

Но:

```text
1(0) = 1
```

поэтому она не проходит через origin и не принадлежит `S`.

Другой функции, способной быть multiplicative identity для всех функций из `S`, тоже нет.

Значит `S` — ring without unity.

## Non-example: positive integers

Рассмотрим:

```text
S = {1, 2, 3, ...}
```

как subset of `Z`.

Под multiplication всё нормально:

```text
ab ∈ S
```

для positive integers `a` и `b`.

Но subtraction ломается:

```text
2 - 5 = -3
```

а:

```text
-3 ∉ S
```

Поэтому positive integers не образуют subring of `Z`.

## Non-example: odd integers

Рассмотрим множество odd integers:

```text
S = {..., -3, -1, 1, 3, 5, ...}
```

Multiplication двух odd numbers снова даёт odd number.

Но subtraction:

```text
3 - 1 = 2
```

а `2` не является odd.

Следовательно, odd integers не образуют subring of `Z`.

## Subring lattice

У одного ring может быть много разных subrings. Их отношения удобно изображать с помощью:

```text
subring lattice / решётки подколец
```

В такой диаграмме ring располагаются уровнями.

Если от `S` вверх идёт путь к `R`, это означает:

```text
S is a subring of R
```

Например:

```text
Z ⊆ Q ⊆ R ⊆ C
```

Все inclusions здесь являются inclusions rings:

```text
Z
```

— subring of `Q`;

```text
Q
```

— subring of `R`;

```text
R
```

— subring of `C`.

## Subrings вида `nZ`

Внутри `Z` существует множество subrings:

```text
2Z
3Z
4Z
5Z
...
```

Причём inclusion здесь работает немного непривычно.

Например:

```text
6Z ⊆ 2Z
```

потому что любое число, делящееся на `6`, делится на `2`.

Также:

```text
6Z ⊆ 3Z
```

Но:

```text
2Z not ⊆ 6Z
```

потому что, например:

```text
2 ∈ 2Z
```

но:

```text
2 ∉ 6Z
```

В общем случае:

```text
mZ ⊆ nZ
```

тогда и только тогда, когда:

```text
n divides m
```

Направление выглядит перевёрнутым:

> чем больше число перед `Z`, тем меньше множество multiples.

Например:

```text
12Z ⊆ 6Z ⊆ 3Z ⊆ Z
```

## Почему subrings важны

Subrings позволяют находить внутри большого ring более простые algebraic structures.

Например:

```text
Z ⊆ Q ⊆ R ⊆ C
```

показывает, как привычные number systems вложены друг в друга.

А:

```text
Z[i] ⊆ C
```

позволяет изучать complex numbers с integer coordinates как отдельное ring.

Позже идеи из group theory получат аналоги для rings:

```text
group homomorphism  -> ring homomorphism
normal subgroup     -> ideal
factor group        -> quotient ring
```

Subrings похожи на subgroups, но для построения quotient rings одних subrings недостаточно. Для этого понадобится более специальная структура:

```text
ideal / идеал
```

## Стандартные примеры

```text
{0} ⊆ R
```

```text
nZ ⊆ Z
```

```text
Z[i] ⊆ C
```

```text
{f : R -> R | f(0) = 0}
```

внутри ring real-valued functions.

## Важный нюанс

В используемом здесь определении subring может:

* не содержать unity исходного ring;
* не иметь unity вообще;
* иметь собственную unity, отличную от unity исходного ring.

Например:

```text
{0, 2, 4} ⊆ Z6
```

имеет unity `4`, хотя unity ring `Z6` равна `1`.

## Главная мысль

> Subring — это subset ring, закрытый относительно subtraction и multiplication и использующий те же операции, что и исходный ring.