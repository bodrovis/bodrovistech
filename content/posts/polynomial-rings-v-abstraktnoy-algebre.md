---

title: "Polynomial Rings: кольца многочленов"
draft: false
date: 2026-07-03T16:00:00
meta_desc: "Понятное введение в polynomial rings: что такое R[x], formal variable, degree, division algorithm, roots, factor theorem, PID и почему R[x]/<x² + 1> даёт complex numbers."
tags:
- абстрактная алгебра
- cs
- zero knowledge
---

**Polynomials / многочлены** вам знакомы ещё со школы (наверное). Например:

```text
3x^2 - 5x + 7
```

или:

```text
x^4 + 2x - 1
```

Обычно мы видим polynomials с integer, rational, real или complex coefficients:

```text
Z[x]
Q[x]
R[x]
C[x]
```

Но теперь мы можем обобщить эту идею. Если `R` — commutative ring, то можно рассматривать polynomials, у которых coefficients берутся из `R`. Так появляется **polynomial ring**:

```text
R[x]
```

## Что означает `R[x]`

Пусть `R` — commutative ring. Тогда:

```text
R[x]
```

означает ring of polynomials over `R`.

Его элементы имеют вид:

```text
anx^n + a(n-1)x^(n-1) + ... + a1x + a0
```

где каждый coefficient лежит в `R`:

```text
ai ∈ R
```

а `n` — nonnegative integer:

```text
n = 0, 1, 2, ...
```

Например, если:

```text
R = Z
```

то:

```text
Z[x]
```

состоит из polynomials with integer coefficients:

```text
3x^2 - 5x + 7
x^4 + 2
-8x
4
```

Если:

```text
R = Z3
```

то:

```text
Z3[x]
```

состоит из polynomials, coefficients которых считаются modulo `3`.

Например:

```text
2x^3 + x + 1
```

лежит в `Z3[x]`.

### Что такое coefficient

В polynomial:

```text
3x^2 - 5x + 7
```

числа:

```text
3
-5
7
```

являются coefficients / коэффициентами. Coefficient показывает, сколько копий соответствующей power of `x` стоит в polynomial.

В записи:

```text
anx^n + a(n-1)x^(n-1) + ... + a1x + a0
```

coefficient при `x^n` — это:

```text
an
```

coefficient при `x` — это:

```text
a1
```

а constant term / свободный член — это:

```text
a0
```

## Polynomial как formal object

Важный момент: в abstract algebra polynomial — это не обязательно function. В записи:

```text
3x^2 - 5x + 7
```

символ `x` можно воспринимать как **formal variable / формальную переменную**. То есть `x` здесь не обязан прямо сейчас быть конкретным числом или элементом ring `R`. Он работает как placeholder / метка, которая отделяет coefficients друг от друга.

Например, polynomial:

```text
a2x^2 + a1x + a0
```

можно понимать как удобную запись sequence coefficients:

```text
(a0, a1, a2)
```

То есть вместо бесконечной sequence:

```text
a0, a1, a2, 0, 0, 0, ...
```

мы пишем привычно:

```text
a2x^2 + a1x + a0
```

Это удобнее читать и умножать.

### Polynomial и polynomial function — не одно и то же

В обычной школьной алгебре polynomial часто сразу воспринимается как function:

```text
f(x) = x^2 + 1
```

и мы можем подставлять значения:

```text
f(2) = 5
```

Но в ring theory важно различать:

```text
polynomial
```

и:

```text
polynomial function
```

- Polynomial — это formal expression.
- Polynomial function — это функция, которую он задаёт после подстановки значений.

Иногда разные polynomials могут задавать одну и ту же function.

### Пример в `Z3[x]`

Рассмотрим два polynomials:

```text
f(x) = x
```

и:

```text
g(x) = x^3
```

Как polynomials в `Z3[x]`, они разные:

```text
x != x^3
```

У них разные powers of `x`. Но как functions from `Z3` to `Z3`, они дают одинаковые значения.

В `Z3` есть только три элемента:

```text
0, 1, 2
```

Проверим:

```text
0^3 = 0

1^3 = 1

2^3 = 8 ≡ 2 (mod 3)
```

То есть для каждого `a ∈ Z3`:

```text
a^3 = a
```

Поэтому functions совпадают:

```text
f(a) = g(a)
```

для всех `a ∈ Z3`.

Но polynomials всё равно разные:

```text
x != x^3
```

в `Z3[x]`.

Главная мысль:

> polynomial equality сравнивает coefficients при одинаковых powers of `x`, а не только значения функции на элементах ring.

## Когда два polynomials равны

Два polynomials равны, если у них совпадают coefficients при всех powers of `x`. Например:

```text
2x^2 + x + 1
```

и:

```text
2x^2 + x + 1
```

равны.

А `x` и `x^3` не равны как polynomials, потому что coefficient при `x` и coefficient при `x^3` различаются. Если один polynomial короче другого, мы можем мысленно добавить missing terms with coefficient `0`.

Например:

```text
x + 1
```

можно записать как:

```text
0x^3 + 0x^2 + x + 1
```

Тогда сравнение coefficients становится прямым.

## В `Z_n[x]` уменьшаются coefficients, а не powers

Ещё одна частая ловушка.

В ring:

```text
Z_n[x]
```

coefficients считаются modulo `n`. Но exponents / степени `x` не уменьшаются modulo `n`.

Например, в:

```text
Z3[x]
```

имеем:

```text
5x = 2x
```

потому что coefficient:

```text
5 ≡ 2 (mod 3)
```

Но:

```text
x^5 != x^2
```

as polynomials. Мы не уменьшаем exponent `5` modulo `3`. То есть modulo применяется к coefficients:

```text
5x -> 2x
```

но не к powers:

```text
x^5 not -> x^2
```

## Addition в `R[x]`

Polynomials складываются по одинаковым powers of `x`.

Пусть:

```text
f(x) = 2x^3 + x^2 + 2x + 2
```

и:

```text
g(x) = 2x^2 + 2x + 1
```

Рассмотрим их как elements of:

```text
Z3[x]
```

То есть coefficients считаются modulo `3`.

Складываем:

```text
f(x) + g(x)
=
(2x^3 + x^2 + 2x + 2) + (2x^2 + 2x + 1)
```

Собираем одинаковые powers:

```text
= 2x^3 + (1 + 2)x^2 + (2 + 2)x + (2 + 1)
```

Теперь считаем coefficients modulo `3`:

```text
1 + 2 = 3 ≡ 0

2 + 2 = 4 ≡ 1

2 + 1 = 3 ≡ 0
```

Получаем:

```text
f(x) + g(x)
=
2x^3 + 0x^2 + x + 0
```

То есть:

```text
f(x) + g(x) = 2x^3 + x
```

## Multiplication в `R[x]`

Multiplication polynomials работает через distributive law. То есть каждый term первого polynomial умножается на каждый term второго.

Например:

```text
(x + 1)(x + 2)
```

Раскрываем:

```text
x · x + x · 2 + 1 · x + 1 · 2
```

Получаем:

```text
x^2 + 2x + x + 2
```

Собираем terms:

```text
x^2 + 3x + 2
```

Если мы работаем в `Z3[x]`, то:

```text
3x = 0x
```

поэтому:

```text
(x + 1)(x + 2) = x^2 + 2
```

в `Z3[x]`.

## Большой пример multiplication в `Z3[x]`

Пусть:

```text
f(x) = 2x^3 + x^2 + 2x + 2
```

и:

```text
g(x) = 2x^2 + 2x + 1
```

в `Z3[x]`.

Умножаем:

```text
f(x)g(x)
=
(2x^3 + x^2 + 2x + 2)(2x^2 + 2x + 1)
```

Раскрываем по частям. Сначала `2x^3`:

```text
2x^3 · 2x^2 = 4x^5 ≡ x^5

2x^3 · 2x = 4x^4 ≡ x^4

2x^3 · 1 = 2x^3
```

Теперь `x^2`:

```text
x^2 · 2x^2 = 2x^4

x^2 · 2x = 2x^3

x^2 · 1 = x^2
```

Теперь `2x`:

```text
2x · 2x^2 = 4x^3 ≡ x^3

2x · 2x = 4x^2 ≡ x^2

2x · 1 = 2x
```

Теперь `2`:

```text
2 · 2x^2 = 4x^2 ≡ x^2

2 · 2x = 4x ≡ x

2 · 1 = 2
```

Собираем всё:

```text
x^5 + x^4 + 2x^3
+ 2x^4 + 2x^3 + x^2
+ x^3 + x^2 + 2x
+ x^2 + x + 2
```

Теперь группируем одинаковые powers:

```text
x^5 + (1 + 2)x^4 + (2 + 2 + 1)x^3 + (1 + 1 + 1)x^2 + (2 + 1)x + 2
```

Считаем coefficients modulo `3`:

```text
1 + 2 = 3 ≡ 0

2 + 2 + 1 = 5 ≡ 2

1 + 1 + 1 = 3 ≡ 0

2 + 1 = 3 ≡ 0
```

Получаем:

```text
f(x)g(x) = x^5 + 2x^3 + 2
```

## Почему `R[x]` является ring

Мы определили на `R[x]` две operations:

```text
polynomial addition
polynomial multiplication
```

Эти operations работают так, чтобы `R[x]` снова был ring.

- Если `R` — commutative ring, то `R[x]` тоже commutative ring.
- Если `R` имеет unity `1`, то `R[x]` тоже имеет unity.

Unity в `R[x]` — это constant polynomial `1`. Потому что:

```text
1 · f(x) = f(x)
```

для любого polynomial `f(x)`.

## Degree

Теперь введём terminology.

Пусть:

```text
f(x) = anx^n + a(n-1)x^(n-1) + ... + a1x + a0
```

и:

```text
an != 0
```

Тогда говорят, что polynomial `f(x)` имеет **degree / степень** `n`. Обозначение:

```text
deg f(x) = n
```

Например:

```text
f(x) = 5x^7 + 3x^2 - 1
```

имеет degree `7`.

Polynomial:

```text
g(x) = 4x^3 + x + 9
```

имеет degree `3`.

Constant nonzero polynomial:

```text
h(x) = 5
```

имеет degree `0`.

Zero polynomial:

```text
0
```

обычно не имеет degree.

## Leading coefficient

Если:

```text
f(x) = anx^n + a(n-1)x^(n-1) + ... + a1x + a0
```

и:

```text
an != 0
```

то coefficient:

```text
an
```

называется **leading coefficient / старшим коэффициентом**. Например, у polynomial:

```text
7x^4 - 2x + 9
```

degree равна `4` а leading coefficient равен `7`.

## Monic polynomial

Polynomial называется **monic / приведённым**, если его leading coefficient равен multiplicative identity ring `R`. То есть если leading coefficient равен `1`.

Например, в `Z[x]` polynomial:

```text
x^3 - 5x + 2
```

monic, потому что leading coefficient равен `1`.

А polynomial:

```text
3x^3 - 5x + 2
```

не monic, потому что leading coefficient равен `3`.

## Constant polynomial

Polynomial вида:

```text
f(x) = a0
```

называется **constant polynomial / константным многочленом**.

Например:

```text
5

-2

0
```

являются constant polynomials.

Если `a0 != 0`, то degree constant polynomial равна:

```text
0
```

Zero polynomial обычно рассматривают отдельно.

## Когда `D[x]` тоже integral domain

Если `D` — integral domain, то polynomial ring:

```text
D[x]
```

тоже является integral domain. То есть если в `D` нет zero divisors, то и в `D[x]` zero divisors не появятся.

### Почему это правда

Пусть:

```text
f(x), g(x) ∈ D[x]
```

и оба polynomials ненулевые. Допустим:

```text
deg f = m
```

и:

```text
deg g = n
```

Тогда leading terms имеют вид:

```text
am x^m
```

и:

```text
bn x^n
```

где:

```text
am != 0
bn != 0
```

При multiplication самый старший term произведения будет:

```text
am bn x^(m+n)
```

Так как `D` — integral domain, в нём нет zero divisors. Поэтому из:

```text
am != 0
```

и:

```text
bn != 0
```

следует:

```text
am bn != 0
```

Значит произведение:

```text
f(x)g(x)
```

не может быть zero polynomial. То есть два ненулевых polynomials не могут перемножиться в `0`.

Следовательно:

```text
D[x]
```

тоже integral domain.

## Division algorithm for polynomials

Для integers у нас есть division algorithm.

Если:

```text
a, b ∈ Z
```

и:

```text
b != 0
```

то можно записать:

```text
a = bq + r
```

где `q` — quotient / частное, а `r` — remainder / остаток.

Для polynomials есть похожая идея. Но важно: хорошо работает она над field.

### Division algorithm в `F[x]`

Пусть `F` — field, и пусть:

```text
f(x), g(x) ∈ F[x]
```

причём:

```text
g(x) != 0
```

Тогда существуют unique polynomials:

```text
q(x), r(x) ∈ F[x]
```

такие, что:

```text
f(x) = g(x)q(x) + r(x)
```

и при этом:

```text
r(x) = 0
```

или:

```text
deg r < deg g
```

То есть любой polynomial `f(x)` можно разделить на ненулевой polynomial `g(x)` с остатком.

### Почему нужно field

При polynomial division часто нужно делить на leading coefficient divisor polynomial. Например, если leading term divisor равен:

```text
2x^2
```

а leading term dividend равен:

```text
3x^4
```

то нужно поделить coefficient `3` на coefficient `2`. Это возможно, если `2` имеет inverse. В field каждый nonzero element имеет inverse, поэтому division algorithm работает нормально.

Например, в:

```text
Q[x]
R[x]
C[x]
Z_p[x]
```

division algorithm работает.

А в:

```text
Z[x]
```

нужно быть осторожнее, потому что не каждый integer coefficient обратим. Например, `2` не имеет inverse внутри `Z`.

### Пример division в `Z5[x]`

Рассмотрим polynomials в:

```text
Z5[x]
```

Пусть:

```text
f(x) = 3x^4 + x^3 + 2x^2 + 1
```

и:

```text
g(x) = x^2 + 4x + 2
```

Мы хотим найти quotient и remainder:

```text
f(x) = g(x)q(x) + r(x)
```

где:

```text
deg r < deg g
```

Так как:

```text
deg g = 2
```

остаток должен иметь degree меньше `2`, то есть быть linear polynomial или constant:

```text
r(x) = ax + b
```

После polynomial long division над `Z5` получаем:

```text
q(x) = 3x^2 + 4x
```

и:

```text
r(x) = 2x + 1
```

То есть:

```text
3x^4 + x^3 + 2x^2 + 1
=
(x^2 + 4x + 2)(3x^2 + 4x) + 2x + 1
```

Важно: все coefficients считаются modulo `5`.

Например:

```text
6 ≡ 1 (mod 5)

-1 ≡ 4 (mod 5)

10 ≡ 0 (mod 5)
```

Поэтому polynomial division выглядит как обычное деление polynomials, но все coefficient operations делаются в `Z5`.

## Divisibility polynomials

Пусть `D` — integral domain, и пусть:

```text
f(x), g(x) ∈ D[x]
```

Говорят, что `g(x)` divides `f(x)`, если существует polynomial:

```text
h(x) ∈ D[x]
```

такой, что:

```text
f(x) = g(x)h(x)
```

Обозначение:

```text
g(x) | f(x)
```

В этом случае `g(x)` называют:

```text
factor of f(x)
```

То есть factor polynomial — это polynomial, который делит другой polynomial без остатка.

### Пример

В `Z[x]`:

```text
x - 1
```

divides:

```text
x^2 - 1
```

потому что:

```text
x^2 - 1 = (x - 1)(x + 1)
```

Значит:

```text
x - 1 | x^2 - 1
```

и:

```text
x + 1 | x^2 - 1
```

## Zeros / roots polynomial

Элемент `a` называется **zero / root** polynomial `f(x)`, если:

```text
f(a) = 0
```

То есть мы подставляем `a` вместо `x`, и результат равен zero element ring.

Например, для:

```text
f(x) = x^2 - 4x + 3
```

имеем:

```text
f(1) = 1 - 4 + 3 = 0
```

и:

```text
f(3) = 9 - 12 + 3 = 0
```

Значит `1` и `3` являются roots polynomial `f(x)`.

## Multiplicity root

Пусть `F` — field, `a ∈ F`, и:

```text
f(x) ∈ F[x]
```

Говорят, что `a` — zero of multiplicity `k`, если:

```text
(x - a)^k
```

divides `f(x)`, но:

```text
(x - a)^(k+1)
```

уже не divides `f(x)`.

То есть multiplicity показывает, сколько раз factor:

```text
x - a
```

сидит внутри polynomial.

### Пример

Рассмотрим:

```text
f(x) = (x - 2)^3(x + 1)
```

Тогда `2` — root of multiplicity `3`, потому что factor:

```text
x - 2
```

встречается три раза.

А `-1` — root of multiplicity `1`, потому что factor:

```text
x + 1
```

встречается один раз.

## Remainder theorem

Пусть `F` — field, `a ∈ F`, и:

```text
f(x) ∈ F[x]
```

Если разделить `f(x)` на:

```text
x - a
```

то remainder будет равен:

```text
f(a)
```

То есть:

```text
f(x) = (x - a)q(x) + f(a)
```

Это называется Remainder Theorem.

## Почему remainder именно `f(a)`

По division algorithm:

```text
f(x) = (x - a)q(x) + r(x)
```

Так как divisor:

```text
x - a
```

имеет degree `1`, remainder должен иметь degree меньше `1`. Значит remainder — это constant:

```text
r
```

Теперь подставим:

```text
x = a
```

Получаем:

```text
f(a) = (a - a)q(a) + r
```

Но:

```text
a - a = 0
```

поэтому:

```text
f(a) = r
```

Значит remainder равен:

```text
f(a)
```

## Factor theorem

Пусть `F` — field, `a ∈ F`, и:

```text
f(x) ∈ F[x]
```

Тогда `a` является zero polynomial `f(x)` тогда и только тогда, когда:

```text
x - a
```

is a factor of `f(x)`.

То есть:

```text
f(a) = 0
```

if and only if:

```text
x - a | f(x)
```

### Почему это следует из remainder theorem

По remainder theorem, при делении `f(x)` на:

```text
x - a
```

remainder равен:

```text
f(a)
```

Если:

```text
f(a) = 0
```

то remainder равен `0`. Значит деление прошло без остатка, и:

```text
x - a
```

divides `f(x)`. Обратно, если:

```text
x - a | f(x)
```

то remainder равен `0`, а значит:

```text
f(a) = 0
```

### Пример factor theorem

Рассмотрим:

```text
f(x) = x^2 - 4x + 3
```

Проверим:

```text
f(1) = 1 - 4 + 3 = 0
```

Значит по factor theorem:

```text
x - 1
```

is a factor of `f(x)`.

Действительно:

```text
x^2 - 4x + 3 = (x - 1)(x - 3)
```

Также:

```text
f(3) = 9 - 12 + 3 = 0
```

поэтому:

```text
x - 3
```

тоже factor.

## Polynomials over a field have at most `n` roots

Ещё одно важное следствие factor theorem:

> polynomial degree `n` over a field has at most `n` roots, counting multiplicity.

То есть если:

```text
deg f(x) = n
```

то у `f(x)` не может быть больше `n` roots в field `F`.

Например, polynomial degree `2` не может иметь `5` разных roots over a field.

### Почему это верно

Если `a` — root polynomial `f(x)`, то по factor theorem:

```text
x - a
```

is a factor of `f(x)`.

То есть:

```text
f(x) = (x - a)q(x)
```

Каждый root даёт хотя бы один linear factor. Если roots несколько, polynomial должен содержать несколько such factors:

```text
(x - a1)(x - a2)...(x - ak)
```

Но degree произведения этих factors равна `k`. Поэтому если polynomial имеет degree `n`, в него нельзя вместить больше чем `n` linear factors. Значит roots может быть не больше `n`.

### Почему важно “over a field”

Это утверждение работает over fields. В rings with zero divisors всё может ломаться. Например, over `Z12` polynomial:

```text
x^2 - 4x + 3
```

degree `2`, но solutions могут быть:

```text
1, 3, 7, 9
```

То есть roots больше, чем degree. Причина та же: в `Z12` есть zero divisors, поэтому привычная логика factor theorem и counting roots работает хуже.

### Example: complex zeros of `x^n - 1`

Рассмотрим polynomial:

```text
x^n - 1
```

over complex numbers. Мы хотим найти все complex roots:

```text
x^n - 1 = 0
```

То есть:

```text
x^n = 1
```

Такие числа называются:

```text
nth roots of unity
```

Одно из них очевидно:

```text
1
```

потому что:

```text
1^n = 1
```

Но over complex numbers есть ещё roots.

#### Primitive nth root of unity

Определим:

```text
ω = cos(360° / n) + i sin(360° / n)
```

Это complex number на unit circle.

По De Moivre’s theorem:

```text
ω^n = 1
```

Кроме того, powers:

```text
1, ω, ω^2, ..., ω^(n-1)
```

дают `n` разных roots polynomial:

```text
x^n - 1
```

Так как degree polynomial равна `n`, других roots быть не может. Поэтому все complex roots of:

```text
x^n - 1
```

это:

```text
1, ω, ω^2, ..., ω^(n-1)
```

Элемент `ω` называется:

```text
primitive nth root of unity
```

## Principal Ideal Domain

Теперь вернёмся к ideals. **Principal ideal / главный идеал** — это ideal, generated by one element:

```text
<a> = {ra | r ∈ R}
```

То есть ideal состоит из всех multiples одного элемента `a`.

Например, в `Z`:

```text
<6> = 6Z
```

### Definition: PID

**Principal Ideal Domain / PID** — это integral domain, в котором every ideal is principal.

То есть `R` является PID, если:

1. `R` — integral domain;
2. каждый ideal `I` имеет вид:

```text
I = <a>
```

для некоторого:

```text
a ∈ R
```

Иными словами:

> в PID любой ideal можно породить одним элементом.

### Example: `Z` is a PID

Integers:

```text
Z
```

являются PID. Почему? Все ideals в `Z` имеют вид:

```text
nZ
```

А:

```text
nZ = <n>
```

То есть каждый ideal generated by one integer. Например:

```text
12Z = <12>
```

Поэтому:

```text
Z is a PID
```

## `F[x]` is a PID

Теперь важный theorem:

> если `F` — field, то `F[x]` является PID.

То есть в polynomial ring over a field every ideal is generated by one polynomial.

```text
F[x] is a PID
```

### Почему это правда

Пусть `I` — nonzero ideal в:

```text
F[x]
```

Выберем в `I` nonzero polynomial минимальной degree:

```text
g(x)
```

Мы хотим показать:

```text
I = <g(x)>
```

То есть каждый polynomial из `I` должен быть multiple of `g(x)`.

Возьмём любой:

```text
f(x) ∈ I
```

Так как `F` — field, в `F[x]` работает division algorithm.

Значит можно разделить `f(x)` на `g(x)`:

```text
f(x) = g(x)q(x) + r(x)
```

где:

```text
r(x) = 0
```

или:

```text
deg r < deg g
```

Теперь:

```text
r(x) = f(x) - g(x)q(x)
```

Так как `f(x) ∈ I`, `g(x) ∈ I`, and `I` is an ideal, получаем:

```text
r(x) ∈ I
```

Но `g(x)` был выбран как nonzero polynomial минимальной degree в `I`. Поэтому в `I` не может быть nonzero polynomial меньшей degree.

Значит:

```text
r(x) = 0
```

Следовательно:

```text
f(x) = g(x)q(x)
```

То есть:

```text
f(x) ∈ <g(x)>
```

А значит:

```text
I = <g(x)>
```

Поэтому:

```text
F[x] is a PID
```

## Criterion for `I = <g(x)>`

Пусть:

```text
F
```

— field, `I` — nonzero ideal in:

```text
F[x]
```

и:

```text
g(x) ∈ I
```

Тогда:

```text
I = <g(x)>
```

if and only if `g(x)` is a nonzero polynomial of minimum degree in `I`. То есть generator ideal можно найти так:

> взять ненулевой polynomial минимальной degree внутри ideal.

Это работает именно because `F[x]` is a PID.

## Application: `R[x] / <x^2 + 1>` and complex numbers

Теперь можно аккуратно объяснить старый пример:

```text
R[x] / <x^2 + 1>
```

Этот quotient ring isomorphic to complex numbers:

```text
R[x] / <x^2 + 1> ≅ C
```

Идея простая. В quotient ring мы считаем:

```text
x^2 + 1 = 0
```

то есть:

```text
x^2 = -1
```

А в complex numbers есть элемент:

```text
i
```

для которого:

```text
i^2 = -1
```

Значит `x` в quotient ring ведёт себя как `i`.

### Homomorphism `R[x] -> C`

Определим evaluation map:

```text
φ : R[x] -> C
```

по правилу:

```text
φ(f(x)) = f(i)
```

То есть мы берём real polynomial и подставляем:

```text
x = i
```

Например:

```text
φ(x^2 + 1) = i^2 + 1 = -1 + 1 = 0
```

Значит:

```text
x^2 + 1 ∈ Ker φ
```

### Kernel

Kernel consists of all real polynomials that become `0` after substituting `i`. То есть:

```text
Ker φ = {f(x) ∈ R[x] | f(i) = 0}
```

Polynomial:

```text
x^2 + 1
```

лежит в kernel. Более того:

```text
Ker φ = <x^2 + 1>
```

Интуитивно: over `R`, polynomial `x^2 + 1` is exactly the minimal polynomial relation that forces `x` to behave like `i`.

### Image

Image of `φ` is all of `C`. Почему? Любое complex number имеет вид:

```text
a + bi
```

где:

```text
a, b ∈ R
```

Но это значение polynomial:

```text
a + bx
```

при:

```text
x = i
```

Действительно:

```text
φ(a + bx) = a + bi
```

Значит:

```text
φ(R[x]) = C
```

### Apply First Isomorphism Theorem

По First Isomorphism Theorem for rings:

```text
R[x] / Ker φ ≅ φ(R[x])
```

Подставляем:

```text
Ker φ = <x^2 + 1>
```

и:

```text
φ(R[x]) = C
```

Получаем:

```text
R[x] / <x^2 + 1> ≅ C
```

## Почему это важно

Это один из главных паттернов всей темы:

```text
field/polynomial ring
↓
quotient by ideal
↓
new ring or field with desired relation
```

В данном случае мы стартовали с real polynomials:

```text
R[x]
```

и добавили relation:

```text
x^2 = -1
```

В результате получили complex numbers. Позже похожая идея будет использоваться для finite fields:

```text
F_p[x] / <irreducible polynomial>
```

Так строятся fields with:

```text
p^n
```

elements.