---
title: "Divisibility in Integral Domains: primes, irreducibles и associates"
draft: false
date: 2026-07-03T18:00:00
meta_desc: "Понятное введение в divisibility in integral domains: associates, irreducible и prime elements, UFD, PID, Euclidean domains и почему ED => PID => UFD."
tags:
- абстрактная алгебра
- cs
- zero knowledge
---

В прошлых главах мы уже говорили про factorization:

```text
Z[x]
```

и про polynomials over fields:

```text
F[x]
```

Там были familiar идеи:

```text
factor
irreducible polynomial
prime-like behavior
unique factorization
```

Теперь мы идём на уровень абстрактнее.

Вместо integers или polynomial rings будем говорить про arbitrary integral domain:

```text
D
```

То есть про commutative ring with unity and no zero divisors.

Главный вопрос:

> как в таком domain работают делимость, простые элементы и неприводимые элементы?

## Associates

Начнём с понятия **associates / ассоциированные элементы**.

Пусть `D` — integral domain.

Elements:

```text
a, b ∈ D
```

называются associates, если они отличаются умножением на unit.

То есть:

```text
a = ub
```

где:

```text
u
```

is a unit of `D`.

### Пример в `Z`

В integers units только:

```text
1
-1
```

Поэтому integers `a` и `b` являются associates, если:

```text
a = b
```

или:

```text
a = -b
```

Например:

```text
5
```

и:

```text
-5
```

are associates.

А:

```text
5
```

и:

```text
10
```

не associates.

### Пример в `Z[x]`

В polynomial ring:

```text
Z[x]
```

units тоже только:

```text
1
-1
```

Поэтому polynomials:

```text
x + 1
```

и:

```text
-(x + 1) = -x - 1
```

are associates.

Они считаются одинаковыми factor up to multiplication by a unit.

## Irreducible element

Пусть `D` — integral domain.

Nonzero element:

```text
a ∈ D
```

называется **irreducible / неприводимым**, если:

1. `a` не является unit;
2. если:

```text
a = bc
```

то один из множителей обязан быть unit.

То есть irreducible element нельзя разложить на product двух nonunit elements.

### Интуиция

Irreducible element — это элемент, который можно factor only trivially.

Например, в `Z` число:

```text
7
```

irreducible, потому что если:

```text
7 = ab
```

то один из множителей должен быть:

```text
1
```

или:

```text
-1
```

А число:

```text
6
```

не irreducible, потому что:

```text
6 = 2 · 3
```

и neither `2` nor `3` is a unit.

## Prime element

Теперь другое понятие.

Nonzero element:

```text
a ∈ D
```

называется **prime / простым элементом**, если:

1. `a` не является unit;
2. если `a` divides product:

```text
a | bc
```

то:

```text
a | b
```

или:

```text
a | c
```

То есть prime element контролирует divisibility of products.

### Интуиция

Prime element говорит:

> если я делю произведение, то я обязан делить хотя бы один из множителей.

Например, в integers:

```text
5 | ab
```

implies:

```text
5 | a
```

or:

```text
5 | b
```

Это familiar property prime numbers.

### Irreducible vs prime

В integers эти понятия совпадают.

То есть в `Z`:

```text
irreducible = prime
```

Но в arbitrary integral domain это не всегда так.

Разница такая:

```text
irreducible
```

говорит про невозможность разложить сам элемент:

```text
a = bc
```

а:

```text
prime
```

говорит про поведение элемента внутри products:

```text
a | bc => a | b or a | c
```

Prime condition сильнее.

В любом integral domain:

```text
prime => irreducible
```

Но обратное не всегда верно.

## Norms in `Z[√d]`

Чтобы увидеть разницу между irreducible and prime, удобно рассмотреть rings вида:

```text
Z[√d] = {a + b√d | a, b ∈ Z}
```

Здесь `d` — integer, обычно not equal to `1` и square-free.

Элементы выглядят так:

```text
a + b√d
```

Например, в:

```text
Z[√-3]
```

элементы имеют вид:

```text
a + b√-3
```

где:

```text
a, b ∈ Z
```

Для таких rings часто используют **norm / норму**:

```text
N(a + b√d) = |a^2 - db^2|
```

Norm полезна потому, что она переводит элементы ring в nonnegative integers.

У неё есть важные свойства:

```text
N(x) = 0 iff x = 0
```

```text
N(xy) = N(x)N(y)
```

```text
x is a unit iff N(x) = 1
```

и если:

```text
N(x)
```

is prime integer, то `x` irreducible.

### Пример: irreducible, но не prime в `Z[√-3]`

Рассмотрим ring:

```text
Z[√-3]
```

Здесь norm выглядит так:

```text
N(a + b√-3) = a^2 + 3b^2
```

Рассмотрим element:

```text
1 + √-3
```

Его norm:

```text
N(1 + √-3) = 1^2 + 3 · 1^2 = 4
```

Покажем, что этот element irreducible, но not prime.

### Почему `1 + √-3` irreducible

Допустим, он раскладывается:

```text
1 + √-3 = xy
```

где neither `x` nor `y` is a unit.

Тогда по multiplicativity of norm:

```text
N(1 + √-3) = N(x)N(y)
```

То есть:

```text
4 = N(x)N(y)
```

Так как `x` и `y` не units, их norms не равны `1`.

Значит единственный возможный вариант:

```text
N(x) = 2
```

и:

```text
N(y) = 2
```

Но equation:

```text
a^2 + 3b^2 = 2
```

не имеет integer solutions.

Проверим:

- если `b = 0`, то нужно `a^2 = 2`, impossible in integers;
- если `b != 0`, то `3b^2 >= 3`, уже больше `2`.

Значит element norm `2` в этом ring не существует.

Поэтому nontrivial factorization невозможна.

Следовательно:

```text
1 + √-3
```

is irreducible.

### Почему `1 + √-3` не prime

Теперь посмотрим на product:

```text
(1 + √-3)(1 - √-3)
```

Раскрываем:

```text
(1 + √-3)(1 - √-3)
=
1 - (√-3)^2
```

Так как:

```text
(√-3)^2 = -3
```

получаем:

```text
1 - (-3) = 4
```

То есть:

```text
(1 + √-3)(1 - √-3) = 4 = 2 · 2
```

Значит:

```text
1 + √-3
```

divides:

```text
2 · 2
```

Но он не divides `2`.

Чтобы это проверить, предположим:

```text
2 = (1 + √-3)(a + b√-3)
```

Раскрываем:

```text
(1 + √-3)(a + b√-3)
=
(a - 3b) + (a + b)√-3
```

Чтобы это было равно `2`, нужно:

```text
a - 3b = 2
```

и:

```text
a + b = 0
```

Из второго:

```text
a = -b
```

Подставляем в первое:

```text
-b - 3b = 2
```

то есть:

```text
-4b = 2
```

Отсюда:

```text
b = -1/2
```

not integer.

Значит integer solutions нет, и:

```text
1 + √-3
```

не divides `2`.

Получилось:

```text
(1 + √-3) | 2 · 2
```

но:

```text
(1 + √-3) ∤ 2
```

Следовательно:

```text
1 + √-3
```

is not prime.

Главная мысль:

> в arbitrary integral domain element может быть irreducible, но not prime.

## Пример: `7` irreducible in `Z[√5]`

Теперь рассмотрим ring:

```text
Z[√5]
```

Здесь norm:

```text
N(a + b√5) = |a^2 - 5b^2|
```

Покажем, что element:

```text
7
```

is irreducible in `Z[√5]`.

### Проверка через norm

Допустим:

```text
7 = xy
```

где neither `x` nor `y` is a unit.

Тогда:

```text
N(7) = N(x)N(y)
```

Но:

```text
N(7) = |7^2 - 5 · 0^2| = 49
```

Так как `x` and `y` не units, их norms не равны `1`.

Значит возможный nontrivial case:

```text
N(x) = 7
```

и:

```text
N(y) = 7
```

То есть нужно, чтобы существовали integers `a, b` such that:

```text
|a^2 - 5b^2| = 7
```

Иначе говоря:

```text
a^2 - 5b^2 = 7
```

или:

```text
a^2 - 5b^2 = -7
```

Modulo `5` это даёт:

```text
a^2 ≡ 7 (mod 5)
```

или:

```text
a^2 ≡ -7 (mod 5)
```

То есть:

```text
a^2 ≡ 2 (mod 5)
```

или:

```text
a^2 ≡ 3 (mod 5)
```

Но squares modulo `5` могут быть только:

```text
0, 1, 4
```

Значит impossible.

Следовательно, element norm `7` в `Z[√5]` не существует.

Поэтому nontrivial factorization:

```text
7 = xy
```

невозможна.

Значит:

```text
7
```

is irreducible in `Z[√5]`.

Важно: здесь `N(7) = 49`, не prime. То есть converse свойства “prime norm implies irreducible” не работает.

Element может быть irreducible even if its norm is not prime.

## Prime implies irreducible

Теперь общее утверждение:

> In an integral domain, every prime element is irreducible.

То есть:

```text
prime => irreducible
```

в любом integral domain.

### Почему это правда

Пусть `p` — prime element in integral domain `D`. Нужно показать, что `p` irreducible.

Допустим:

```text
p = bc
```

Так как:

```text
p | bc
```

и `p` prime, получаем:

```text
p | b
```

или:

```text
p | c
```

Предположим:

```text
p | b
```

Тогда:

```text
b = pd
```

для некоторого `d ∈ D`.

Подставляем в factorization:

```text
p = bc = (pd)c = p(dc)
```

Так как `D` — integral domain и `p != 0`, можно cancel `p`:

```text
1 = dc
```

Значит:

```text
c
```

is a unit.

То есть в любом factorization:

```text
p = bc
```

один из factors является unit.

Следовательно:

```text
p
```

is irreducible.

## В PID irreducible equals prime

В arbitrary integral domain работает только:

```text
prime => irreducible
```

Но обратное может ломаться.

Однако в principal ideal domain / PID всё хорошо:

> In a PID, an element is irreducible if and only if it is prime.

То есть в PID:

```text
irreducible = prime
```

### Почему PID помогает

Напомним:

**PID / principal ideal domain** — это integral domain, в котором every ideal is principal:

```text
I = <a>
```

В PID ideals устроены достаточно хорошо, чтобы irreducible elements автоматически имели prime behavior.

Именно поэтому в familiar domains вроде:

```text
Z
```

или:

```text
F[x]
```

irreducible elements behave like primes.

## Example: `Z[x]` is not a PID

Мы знаем, что:

```text
Z
```

is a PID.

Но:

```text
Z[x]
```

не является PID.

Рассмотрим ideal:

```text
I = <2, x>
```

в:

```text
Z[x]
```

Это ideal generated by `2` and `x`.

То есть:

```text
I = {2f(x) + xg(x) | f(x), g(x) ∈ Z[x]}
```

Интуитивно это set polynomials with even constant term.

Например:

```text
x + 2
```

лежит в `I`.

И:

```text
3x^2 + 5x + 4
```

тоже лежит в `I`.

Но:

```text
1
```

не лежит в `I`, потому что constant term `1` is odd.

### Почему `I` не principal

Предположим, что:

```text
I = <h(x)>
```

для некоторого:

```text
h(x) ∈ Z[x]
```

Так как:

```text
2 ∈ I
```

получаем, что `h(x)` divides `2`.

Значит `h(x)` должен быть constant polynomial:

```text
±1
```

или:

```text
±2
```

Если:

```text
h(x) = ±1
```

то:

```text
<h(x)> = Z[x]
```

Но это невозможно, потому что:

```text
1 ∉ I
```

Значит остаётся:

```text
h(x) = ±2
```

Но тогда every element of `<h(x)>` должен быть divisible by `2`.

А:

```text
x ∈ I
```

но:

```text
x
```

не divisible by `2` in `Z[x]`.

То есть не существует polynomial `g(x) ∈ Z[x]`, such that:

```text
x = 2g(x)
```

Противоречие.

Следовательно:

```text
<2, x>
```

not principal.

Значит:

```text
Z[x]
```

is not a PID.

### Почему это важно

Мы уже знаем:

```text
Z[x]
```

has unique factorization.

Но при этом:

```text
Z[x]
```

not PID.

Это показывает, что PID — strong condition.

Позже появится более широкая class:

```text
UFD / unique factorization domain
```

В UFD unique factorization есть, но не обязательно every ideal is principal.

Именно поэтому:

```text
Z[x]
```

может иметь unique factorization, но не быть PID.

## Unique Factorization Domains

Теперь у нас есть нужные термины, чтобы formalize идею unique factorization.

Мы уже знаем familiar examples:

```text
Z
```

имеет unique factorization into prime numbers.

Также ранее мы видели, что:

```text
Z[x]
```

имеет unique factorization into irreducible polynomials.

Но возникает естественный вопрос:

> все ли integral domains имеют unique factorization?

Ответ: нет.

Поэтому вводится отдельный класс integral domains:

```text
UFD / unique factorization domain
```

### Определение

**Unique Factorization Domain / UFD** — это integral domain `D`, в котором выполняются два условия.

Первое:

> every nonzero nonunit element can be written as a product of irreducibles.

То есть если:

```text
a ∈ D
```

и `a` не равен `0` и не является unit, то:

```text
a = p1p2...pn
```

где каждый `pi` irreducible.

Второе:

> this factorization is unique up to associates and order.

То есть если есть два factorization:

```text
a = p1p2...pn
```

и:

```text
a = q1q2...qm
```

где все `pi` и `qj` irreducible, то:

```text
n = m
```

и после перестановки factors каждый `pi` является associate соответствующего `qi`.

### Что значит “unique up to associates and order”

Фраза:

```text
unique up to associates and order
```

означает, что мы не считаем существенными две вещи:

1. порядок factors;
2. multiplication by units.

Например, в `Z`:

```text
60 = 2 · 2 · 3 · 5
```

Можно написать:

```text
60 = 5 · 3 · 2 · 2
```

Это то же самое factorization, просто factors переставлены.

Можно ещё написать:

```text
60 = (-2) · 2 · 3 · (-5)
```

Это тоже essentially the same factorization, потому что `2` и `-2` are associates, а `5` и `-5` тоже associates.

В `Z` units:

```text
1
-1
```

поэтому signs можно перекидывать между factors.

### Пример: `Z` is a UFD

Integers:

```text
Z
```

являются UFD.

Это ровно Fundamental Theorem of Arithmetic:

> every integer greater than `1` can be uniquely factored into primes.

Например:

```text
84 = 2 · 2 · 3 · 7
```

Другого genuinely different prime factorization у `84` нет.

Можно поменять порядок, можно добавить signs, но primes останутся теми же.

### Пример: `Z[x]` is a UFD

Мы также уже видели, что:

```text
Z[x]
```

является UFD.

То есть every nonzero nonunit polynomial with integer coefficients can be factored into irreducible polynomials uniquely up to order and multiplication by `±1`.

Например:

```text
6x^2 - 6
```

можно разложить так:

```text
6x^2 - 6 = 2 · 3 · (x - 1)(x + 1)
```

Factors можно переставлять:

```text
3 · (x + 1) · 2 · (x - 1)
```

или менять signs:

```text
(-2) · 3 · (1 - x)(x + 1)
```

Но это не new factorization. Это тот же набор irreducible factors up to associates.

### Ascending Chain Condition для PID

Перед важной theorem появляется техническая lemma.

Она говорит:

> in a PID, any strictly increasing chain of ideals must be finite.

То есть в principal ideal domain нельзя иметь бесконечную цепочку:

```text
I1 ⊂ I2 ⊂ I3 ⊂ ...
```

где каждое следующее ideal строго больше предыдущего.

Такая property называется:

```text
ascending chain condition
```

или коротко:

```text
ACC
```

### Интуиция

В PID every ideal имеет вид:

```text
<a>
```

То есть every ideal generated by one element.

Strictly increasing chain ideals:

```text
<a1> ⊂ <a2> ⊂ <a3> ⊂ ...
```

соответствует тому, что generators становятся “всё менее делимыми”.

В integers это похоже на цепочку:

```text
12Z ⊂ 6Z ⊂ 3Z ⊂ Z
```

Она может расти, но не бесконечно.

Нельзя бесконечно строго укрупнять principal ideals внутри PID.

Эта condition нужна, чтобы гарантировать: процесс factorization рано или поздно остановится.

## PID implies UFD

Главная theorem:

> every principal ideal domain is a unique factorization domain.

То есть:

```text
PID => UFD
```

Это очень важная связь.

PID — это сильное условие про ideals:

```text
every ideal is principal
```

UFD — это условие про factorization:

```text
every element factors uniquely into irreducibles
```

Theorem говорит, что хорошее поведение ideals заставляет factorization тоже вести себя хорошо.

### Почему это логично

Чтобы domain был UFD, нужны две вещи.

Первая:

```text
existence of factorization
```

То есть every nonzero nonunit element должен eventually разложиться на irreducibles.

В PID это обеспечивается ascending chain condition: нельзя бесконечно продолжать раскладывать element на всё более мелкие nonunit factors.

Вторая:

```text
uniqueness of factorization
```

Она следует из того, что в PID:

```text
irreducible = prime
```

А prime elements хорошо контролируют divisibility:

```text
p | ab => p | a or p | b
```

Именно это позволяет доказывать uniqueness так же, как в integers.

## Corollary: `F[x]` is a UFD

Мы уже знаем:

> если `F` — field, то `F[x]` is a PID.

А теперь знаем:

```text
PID => UFD
```

Следовательно:

```text
F[x] is a UFD
```

То есть polynomial ring over a field имеет unique factorization.

Например:

```text
Q[x]
R[x]
C[x]
Z_p[x]
```

are UFDs.

Это объясняет, почему factorization polynomials over fields работает настолько хорошо.

### Ещё раз схема

Для field `F`:

```text
F is a field
```

значит:

```text
F[x] is a PID
```

а значит:

```text
F[x] is a UFD
```

То есть:

```text
field
=> polynomial ring has division algorithm
=> F[x] is PID
=> F[x] is UFD
```

## Application: Eisenstein's criterion через UFD

Eisenstein's criterion можно доказывать elegant way через UFD.

Напомним criterion.

Пусть:

```text
f(x) = a_nx^n + a_(n-1)x^(n-1) + ... + a_0 ∈ Z[x]
```

И пусть существует prime `p`, такой что:

```text
p ∤ a_n
```

но:

```text
p | a_(n-1), ..., p | a_1, p | a_0
```

и при этом:

```text
p^2 ∤ a_0
```

Тогда:

```text
f(x)
```

irreducible over `Q`.

### Идея доказательства

Допустим наоборот, что:

```text
f(x)
```

reducible over `Q`.

Тогда по связи reducibility over `Q` and `Z` можно записать:

```text
f(x) = g(x)h(x)
```

где:

```text
g(x), h(x) ∈ Z[x]
```

и оба имеют positive degree.

Теперь reduce everything modulo `p`.

Так как все coefficients `f(x)`, кроме leading coefficient, делятся на `p`, в `Z_p[x]` polynomial превращается в:

```text
a_nx^n
```

То есть:

```text
f_bar(x) = a_nx^n
```

А это равно:

```text
g_bar(x)h_bar(x)
```

в `Z_p[x]`.

Так как `Z_p[x]` is a UFD, из factorization of `a_nx^n` следует, что both `g_bar(x)` and `h_bar(x)` должны делиться на `x`.

Значит:

```text
g_bar(0) = 0
```

и:

```text
h_bar(0) = 0
```

То есть constant terms `g(0)` и `h(0)` оба делятся на `p`.

Но тогда их product:

```text
g(0)h(0)
```

делится на:

```text
p^2
```

А constant term of `f(x)` равен:

```text
a_0 = g(0)h(0)
```

Получаем:

```text
p^2 | a_0
```

Но это contradicts Eisenstein condition:

```text
p^2 ∤ a_0
```

Значит исходное предположение о reducibility было false.

Поэтому:

```text
f(x)
```

irreducible over `Q`.

## Euclidean Domains

Теперь ещё один important class integral domains:

```text
Euclidean domain / ED
```

Это domains, где есть analogue of division algorithm.

### Определение

Integral domain `D` называется **Euclidean domain / евклидовым доменом**, если существует function:

```text
d
```

from nonzero elements of `D` to nonnegative integers:

```text
d : D \ {0} -> Z_nonnegative
```

такая что:

1. для любых nonzero `a, b ∈ D`:

```text
d(a) <= d(ab)
```

2. для любых `a, b ∈ D`, где `b != 0`, существуют `q, r ∈ D`, такие что:

```text
a = bq + r
```

и:

```text
r = 0
```

или:

```text
d(r) < d(b)
```

Функция `d` называется:

```text
measure
```

Она измеряет “размер” элемента, чтобы division algorithm мог уменьшать remainder.

### Example: `Z` is Euclidean domain

Integers:

```text
Z
```

are Euclidean domain with measure:

```text
d(a) = |a|
```

Division algorithm здесь знакомый:

если:

```text
a, b ∈ Z
```

и:

```text
b != 0
```

то существуют integers:

```text
q, r ∈ Z
```

такие что:

```text
a = bq + r
```

и:

```text
0 <= r < |b|
```

Именно это обычное division with remainder.

### Example: `F[x]` is Euclidean domain

Если `F` — field, то:

```text
F[x]
```

is Euclidean domain.

Measure:

```text
d(f(x)) = deg f(x)
```

Polynomial division algorithm говорит:

если:

```text
f(x), g(x) ∈ F[x]
```

и:

```text
g(x) != 0
```

то существуют:

```text
q(x), r(x) ∈ F[x]
```

такие что:

```text
f(x) = g(x)q(x) + r(x)
```

и:

```text
r(x) = 0
```

или:

```text
deg r < deg g
```

То есть degree играет роль absolute value.

### Analogy between `Z` and `F[x]`

Между integers and polynomials over a field есть сильная parallel.

Для `Z`:

```text
measure = absolute value
```

Для `F[x]`:

```text
measure = degree
```

В обоих случаях есть division algorithm.

В обоих случаях domain is Euclidean.

Значит оба являются PID.

Значит оба являются UFD.

Схема:

```text
Euclidean domain
=> PID
=> UFD
```

Поэтому:

```text
Z
```

and:

```text
F[x]
```

имеют very similar divisibility theory.

### Gaussian integers `Z[i]`

Ещё один важный example Euclidean domain:

```text
Z[i] = {a + bi | a, b ∈ Z}
```

Это ring Gaussian integers.

Для него measure:

```text
d(a + bi) = a^2 + b^2
```

Это norm squared complex number.

Например:

```text
d(3 + 2i) = 3^2 + 2^2 = 13
```

И оказывается:

```text
Z[i]
```

is Euclidean domain.

### Почему это не совсем очевидно

Для `Z` division algorithm опирается на rounding real numbers.

Для `Z[i]` нужно делить complex numbers and round both coordinates.

Идея такая.

Если:

```text
x, y ∈ Z[i]
```

и:

```text
y != 0
```

то в field of quotients можно посмотреть на:

```text
xy^-1
```

Это complex number:

```text
s + ti
```

где:

```text
s, t ∈ Q
```

Теперь выбираем integers `m, n`, nearest to `s` and `t`.

То есть:

```text
|s - m| <= 1/2
```

и:

```text
|t - n| <= 1/2
```

Then take:

```text
q = m + ni
```

as quotient.

Remainder:

```text
r = x - qy
```

оказывается smaller than `y` by norm:

```text
d(r) < d(y)
```

Поэтому division algorithm works in `Z[i]`.

### Почему Gaussian integers важны

`Z[i]` shows, что Euclidean domains are not only:

```text
Z
```

and:

```text
F[x]
```

There are richer rings where division with remainder still works.

А раз:

```text
Z[i]
```

is Euclidean domain, то:

```text
Z[i] is PID
```

и:

```text
Z[i] is UFD
```

То есть Gaussian integers тоже имеют unique factorization.

## ED implies PID

Теперь добавим ещё одну важную стрелку:

```text
Euclidean domain => PID
```

То есть:

> every Euclidean domain is a principal ideal domain.

Напомним, Euclidean domain — это integral domain, где есть division algorithm с некоторой measure function:

```text
d
```

Например:

- в `Z` measure — это absolute value;
- в `F[x]` measure — это degree;
- в `Z[i]` measure — это norm `a^2 + b^2`.

### Почему ED implies PID

Пусть `D` — Euclidean domain.

Нужно показать, что every ideal в `D` является principal.

Возьмём nonzero ideal:

```text
I
```

Внутри `I` выберем nonzero element с минимальной measure:

```text
a ∈ I
```

То есть среди всех ненулевых элементов `I` элемент `a` имеет smallest possible value:

```text
d(a)
```

Теперь возьмём любой element:

```text
b ∈ I
```

Так как `D` — Euclidean domain, можно divide `b` by `a`:

```text
b = aq + r
```

где:

```text
r = 0
```

или:

```text
d(r) < d(a)
```

Но:

```text
r = b - aq
```

А `b ∈ I`, `a ∈ I`, and `I` is an ideal, значит:

```text
aq ∈ I
```

и поэтому:

```text
r = b - aq ∈ I
```

Если бы `r != 0`, то мы получили бы nonzero element `r ∈ I` with:

```text
d(r) < d(a)
```

Но `a` был выбран с минимальной measure. Contradiction.

Значит:

```text
r = 0
```

и поэтому:

```text
b = aq
```

То есть любой element `b ∈ I` является multiple of `a`.

Следовательно:

```text
I = <a>
```

Значит every ideal principal, и:

```text
D is a PID
```

### Ещё раз

Мы уже знаем:

```text
PID => UFD
```

Теперь знаем:

```text
ED => PID
```

Поэтому сразу получаем:

```text
ED => PID => UFD
```

То есть every Euclidean domain is automatically a unique factorization domain.

## Но обратные стрелки не работают

Важно не перепутать.

Верно:

```text
ED => PID => UFD
```

Но generally false:

```text
UFD => PID
```

и generally false:

```text
PID => ED
```

То есть hierarchy такая:

```text
Euclidean domain
```

самое сильное условие из этих трёх.

Потом:

```text
PID
```

Потом:

```text
UFD
```

Самая короткая схема:

```text
ED => PID => UFD
```

но не наоборот.

### Пример: `Z[x]` is UFD but not PID

Мы уже видели важный example:

```text
Z[x]
```

является UFD.

Но:

```text
Z[x]
```

не является PID.

Причина: ideal

```text
<2, x>
```

не generated by one element.

Значит `Z[x]` показывает, что:

```text
UFD does not imply PID
```

То есть unique factorization может быть, даже если не every ideal principal.

## If `D` is UFD, then `D[x]` is UFD

Теперь ещё одна важная theorem:

> if `D` is a UFD, then `D[x]` is also a UFD.

То есть unique factorization survives when we pass to polynomial ring.

Например:

```text
Z
```

is a UFD.

Therefore:

```text
Z[x]
```

is a UFD.

А так как `Z[x]` is a UFD, можно снова применить theorem:

```text
Z[x][y]
```

is a UFD.

Это essentially the same as:

```text
Z[x, y]
```

То есть polynomial rings in several variables over a UFD are also UFDs.

### Почему это важно

Эта theorem говорит, что polynomial rings behave well under factorization.

Если base domain already has unique factorization, then adding a formal variable `x` does not destroy it.

Это очень полезно, потому что многие algebraic objects строятся как polynomial rings:

```text
D[x]
D[x, y]
F[x]
F[x_1, ..., x_n]
```

И theorem позволяет переносить unique factorization дальше.

### Integral domain that is not a UFD

Но not every integral domain is UFD.

Классический example:

```text
Z[√-5]
```

То есть:

```text
Z[√-5] = {a + b√-5 | a, b ∈ Z}
```

Это integral domain, но not a unique factorization domain.

#### Norm in `Z[√-5]`

В этом ring удобно использовать norm:

```text
N(a + b√-5) = a^2 + 5b^2
```

Она multiplicative:

```text
N(xy) = N(x)N(y)
```

Units здесь только:

```text
1
-1
```

потому что unit должен иметь norm `1`, а equation:

```text
a^2 + 5b^2 = 1
```

даёт только:

```text
a = ±1
b = 0
```

### Two different factorizations of `46`

В `Z[√-5]` рассмотрим element:

```text
46
```

У него есть два factorization:

```text
46 = 2 · 23
```

и:

```text
46 = (1 + 3√-5)(1 - 3√-5)
```

Проверим второе:

```text
(1 + 3√-5)(1 - 3√-5)
=
1 - (3√-5)^2
```

Так как:

```text
(3√-5)^2 = 9 · (-5) = -45
```

получаем:

```text
1 - (-45) = 46
```

То есть действительно:

```text
46 = (1 + 3√-5)(1 - 3√-5)
```

### Почему это проблема для UFD

Если все четыре factors:

```text
2
23
1 + 3√-5
1 - 3√-5
```

irreducible, и эти factorizations не отличаются просто order/sign, то unique factorization fails.

А units only:

```text
±1
```

Значит associates отличаются только sign.

Очевидно:

```text
2
```

не associate с:

```text
1 + 3√-5
```

и:

```text
23
```

тоже не associate с:

```text
1 - 3√-5
```

Это genuinely different factorizations.

### Почему factors irreducible

Используем norm.

#### Factor `2`

```text
N(2) = 4
```

Если бы:

```text
2 = xy
```

nontrivially, то:

```text
4 = N(x)N(y)
```

Так как `x` и `y` not units, их norms не равны `1`.

Значит нужно было бы:

```text
N(x) = N(y) = 2
```

Но equation:

```text
a^2 + 5b^2 = 2
```

has no integer solutions.

Если `b = 0`, то `a^2 = 2`, impossible.

Если `b != 0`, то `5b^2 >= 5`, already too large.

Значит `2` irreducible.
#### Factor `23`

```text
N(23) = 23^2 = 529
```

Если бы у `23` было nontrivial factorization, то один из множителей должен был бы иметь norm:

```text
23
```

То есть должны были бы существовать integers `a, b`, такие что:

```text
a^2 + 5b^2 = 23
```

Проверим possible values of `b`:

- если `b = 0`, то `a^2 = 23`, impossible;
- если `b = ±1`, то `a^2 + 5 = 23`, значит `a^2 = 18`, impossible;
- если `b = ±2`, то `a^2 + 20 = 23`, значит `a^2 = 3`, impossible;
- если `|b| >= 3`, то `5b^2 >= 45`, уже слишком много.

Решений нет.

Значит `23` irreducible.

#### Factors `1 ± 3√-5`

```text
N(1 + 3√-5) = 1^2 + 5 · 3^2 = 46
```

и аналогично:

```text
N(1 - 3√-5) = 46
```

Если бы один из этих elements имел nontrivial factorization, то norms его множителей должны были бы перемножаться в:

```text
46 = 2 · 23
```

Значит нам понадобился бы element with norm `2` или element with norm `23`.

Но выше мы уже проверили, что в:

```text
Z[√-5]
```

нет elements with norm `2` и нет elements with norm `23`.

Следовательно:

```text
1 + 3√-5
```

и:

```text
1 - 3√-5
```

являются irreducible.

#### Conclusion: `Z[√-5]` is not a UFD

У нас есть два разных factorization into irreducibles:

```text
46 = 2 · 23
```

и:

```text
46 = (1 + 3√-5)(1 - 3√-5)
```

Эти factorizations не совпадают с точностью до порядка factors и associates.

В этом ring units только:

```text
±1
```

поэтому associates могут отличаться только знаком. Но `2`, `23`, `1 + 3√-5` и `1 - 3√-5` не превращаются друг в друга простым умножением на `±1`.

Значит unique factorization fails.

Следовательно:

```text
Z[√-5]
```

является integral domain, но не является UFD.

## Final hierarchy

Теперь можно запомнить общую картину:

```text
Euclidean domain => PID => UFD => integral domain
```

Но reverse implications generally fail.

Examples:

```text
Z
```

is ED, hence PID, hence UFD.

```text
F[x]
```

is ED, hence PID, hence UFD.

```text
Z[x]
```

is UFD, but not PID.

```text
Z[√-5]
```

is integral domain, but not UFD.