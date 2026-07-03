---

title: "Factorization of Polynomials: reducible, irreducible и тесты разложения"
draft: false
date: 2026-07-03T17:00:00
meta_desc: "Понятное введение в factorization of polynomials: reducible и irreducible polynomials, mod p test, Eisenstein criterion, quotient fields, finite fields и unique factorization в Z[x]."
tags:
- абстрактная алгебра
- cs
- zero knowledge
---

В прошлой части мы говорили про polynomial rings:

```text
R[x]
```

То есть про polynomials with coefficients in a ring `R`.

Теперь вопрос другой:

> можно ли polynomial разложить на более простые множители?

Например:

```text
x^2 - 1
```

можно записать как:

```text
(x - 1)(x + 1)
```

А вот polynomial:

```text
x^2 + 1
```

over real numbers так разложить уже нельзя.

Но over complex numbers можно:

```text
x^2 + 1 = (x - i)(x + i)
```

То есть reducibility polynomial зависит не только от самого polynomial, но и от того, **над каким ring или field мы работаем**.

## Reducible и irreducible polynomials

Пусть `D` — integral domain.

Polynomial:

```text
f(x) ∈ D[x]
```

называется **irreducible over `D` / неприводимым над `D`**, если:

1. `f(x)` не является zero polynomial;
2. `f(x)` не является unit in `D[x]`;
3. если:

```text
f(x) = g(x)h(x)
```

где:

```text
g(x), h(x) ∈ D[x]
```

то один из множителей обязан быть unit. То есть polynomial нельзя разложить на произведение двух “настоящих” nonunit factors.

### Reducible polynomial

Polynomial называется **reducible over `D` / приводимым над `D`**, если он:

1. nonzero;
2. nonunit;
3. не является irreducible.

Проще:

> reducible polynomial можно разложить на произведение двух nonunit polynomials.

То есть:

```text
f(x) = g(x)h(x)
```

где ни `g(x)`, ни `h(x)` не являются units.

### Если coefficients берутся из field

Если `D` на самом деле field `F`, определение становится проще.

Polynomial:

```text
f(x) ∈ F[x]
```

nonconstant polynomial называется irreducible over `F`, если его нельзя представить как product двух polynomials меньшей degree.

То есть нельзя записать:

```text
f(x) = g(x)h(x)
```

где:

```text
deg g < deg f
```

и:

```text
deg h < deg f
```

Почему тут проще? Потому что в `F[x]` units — это все nonzero constant polynomials. Например, в `Q[x]` число:

```text
2
```

является unit, потому что:

```text
2 · 1/2 = 1
```

А в `Z[x]` число `2` не является unit, потому что:

```text
1/2 not in Z[x]
```

Из-за этого один и тот же polynomial может быть irreducible над одним ring и reducible над другим.

### Важно: irreducible depends on the base ring

Фраза:

```text
f(x) is irreducible
```

сама по себе неполная.

Нужно уточнять:

```text
irreducible over Q

irreducible over R

irreducible over C

irreducible over Z_3
```

Один и тот же polynomial может вести себя по-разному.

### Пример: `2x^2 + 4` over `Q` и over `Z`

Рассмотрим:

```text
f(x) = 2x^2 + 4
```

В `Z[x]` его можно записать так:

```text
2x^2 + 4 = 2(x^2 + 2)
```

Здесь:

```text
2
```

не является unit in `Z[x]`.

И:

```text
x^2 + 2
```

тоже не является unit.

Значит:

```text
2x^2 + 4
```

reducible over `Z`.

### Почему over `Q` иначе

В `Q[x]` тот же factorization:

```text
2x^2 + 4 = 2(x^2 + 2)
```

не делает polynomial reducible, потому что:

```text
2
```

является unit in `Q[x]`.

У него есть inverse:

```text
1/2
```

Поэтому multiplication by `2` не считается настоящим разложением на nonunit factors. А polynomial:

```text
x^2 + 2
```

не имеет rational roots и не раскладывается на два linear factors over `Q`.

Поэтому:

```text
2x^2 + 4
```

irreducible over `Q`, но reducible over `Z`.

### Пример: `2x^2 + 4` over `R` и over `C`

Рассмотрим снова:

```text
2x^2 + 4
```

Over `R` число `2` является unit, так что это essentially то же самое, что:

```text
x^2 + 2
```

Но:

```text
x^2 + 2 = 0
```

не имеет real roots. Значит polynomial irreducible over `R`. А over `C` roots существуют:

```text
x^2 + 2 = 0
```

значит:

```text
x^2 = -2
```

и:

```text
x = i√2
```

или:

```text
x = -i√2
```

Поэтому over `C`:

```text
2x^2 + 4 = 2(x - i√2)(x + i√2)
```

Значит polynomial reducible over `C`.

### Пример: `x^2 - 2`

Polynomial:

```text
x^2 - 2
```

irreducible over `Q`. Почему? Если quadratic polynomial reducible over a field, он должен иметь root in that field.

Но roots:

```text
x = √2
```

и:

```text
x = -√2
```

не являются rational numbers. Поэтому:

```text
x^2 - 2
```

irreducible over `Q`. Но over `R` он reducible:

```text
x^2 - 2 = (x - √2)(x + √2)
```

### Пример: `x^2 + 1` over `Z_3` и `Z_5`

Рассмотрим:

```text
x^2 + 1
```

over:

```text
Z_3
```

Проверим possible roots:

```text
0, 1, 2
```

Подставляем:

```text
0^2 + 1 = 1
```

```text
1^2 + 1 = 2
```

```text
2^2 + 1 = 4 + 1 = 5 ≡ 2 (mod 3)
```

Нуля нет. Так как degree равна `2`, отсутствие roots означает irreducible over `Z_3`. Теперь over:

```text
Z_5
```

Проверим:

```text
2^2 + 1 = 4 + 1 = 5 ≡ 0 (mod 5)
```

и:

```text
3^2 + 1 = 9 + 1 = 10 ≡ 0 (mod 5)
```

Значит roots есть `2` и `3`. Поэтому:

```text
x^2 + 1
```

reducible over `Z_5`.

Indeed:

```text
x^2 + 1 = (x - 2)(x - 3)
```

in `Z_5[x]`.

Так как:

```text
-2 ≡ 3 (mod 5)
```

и:

```text
-3 ≡ 2 (mod 5)
```

можно также написать:

```text
x^2 + 1 = (x + 3)(x + 2)
```

## Reducibility test for degrees 2 and 3

Есть полезный тест.

Пусть `F` — field, и:

```text
f(x) ∈ F[x]
```

Если:

```text
deg f = 2
```

или:

```text
deg f = 3
```

то:

```text
f(x) reducible over F
```

тогда и только тогда, когда `f(x)` имеет root in `F`.

### Почему это работает

Если polynomial degree `2` reducible, то он раскладывается на product polynomials меньшей degree. Единственный вариант:

```text
degree 1 · degree 1
```

То есть появляется linear factor:

```text
x - a
```

А значит `a` — root. Для degree `3` варианты такие:

```text
degree 1 · degree 2
```

То есть если cubic polynomial reducible, у него обязательно есть linear factor.

А linear factor:

```text
x - a
```

эквивалентен root:

```text
f(a) = 0
```

по factor theorem.

### Почему это не работает так же для degree 4

Для degree `4` reducible polynomial может раскладываться как:

```text
degree 2 · degree 2
```

и не иметь linear factors.

Например over `Q`:

```text
(x^2 + 1)(x^2 + 2)
```

reducible, но rational roots не имеет.

Поэтому тест “нет roots значит irreducible” безопасен только для degrees `2` и `3`.

## Content of a polynomial

Теперь перейдём к polynomials in:

```text
Z[x]
```

Для nonzero polynomial with integer coefficients:

```text
f(x) = anx^n + a(n-1)x^(n-1) + ... + a1x + a0
```

**content / содержание** polynomial — это greatest common divisor coefficients:

```text
gcd(an, a(n-1), ..., a1, a0)
```

Обычно берут positive gcd.

### Примеры content

Для polynomial:

```text
6x^2 + 10x + 14
```

content равен:

```text
gcd(6, 10, 14) = 2
```

Для:

```text
3x^3 - 9x + 12
```

content равен:

```text
gcd(3, -9, 12) = 3
```

Для:

```text
2x^2 + 5x + 7
```

content равен:

```text
gcd(2, 5, 7) = 1
```

### Primitive polynomial

Polynomial in `Z[x]` называется **primitive polynomial / примитивным многочленом**, если его content равен `1`. То есть coefficients не имеют общего divisor больше `1`.

Например:

```text
2x^2 + 5x + 7
```

primitive, потому что:

```text
gcd(2, 5, 7) = 1
```

А polynomial:

```text
6x^2 + 10x + 14
```

не primitive, потому что all coefficients divisible by `2`.

### Зачем нужен content

Любой nonzero polynomial in `Z[x]` можно представить как:

```text
content · primitive polynomial
```

Например:

```text
6x^2 + 10x + 14
=
2(3x^2 + 5x + 7)
```

Здесь:

```text
2
```

— content, а:

```text
3x^2 + 5x + 7
```

primitive polynomial.

Так мы отделяем “числовой общий множитель” от настоящей polynomial structure.

## Gauss's Lemma

**Gauss's Lemma** говорит:

> product of two primitive polynomials is primitive.

То есть если:

```text
f(x)
```

и:

```text
g(x)
```

primitive in `Z[x]`, то:

```text
f(x)g(x)
```

тоже primitive.

### Интуиция

Если у двух polynomials нет общего divisor во всех coefficients, то после multiplication внезапно не появится prime number, который делит все coefficients результата.

Например, если ни один polynomial не имеет all coefficients even, то их product тоже не станет polynomial, у которого all coefficients even.

Это не совсем очевидно, но именно это утверждает Gauss's Lemma.

## Reducibility over `Q` and over `Z`

Следствие Gauss's Lemma:

> если polynomial from `Z[x]` reducible over `Q`, то он reducible over `Z`.

То есть если integer polynomial можно разложить с rational coefficients, то его можно разложить и с integer coefficients.

Формально:

```text
f(x) ∈ Z[x]
```

если `f(x)` reducible over `Q`, then `f(x)` reducible over `Z`.

### Почему это важно

На практике это значит:

> чтобы проверить reducibility integer polynomial over `Q`, часто можно искать factorization уже в `Z[x]`.

Rational coefficients можно “очистить от знаменателей” и получить integer factorization.

## Пример: rational factorization превращается в integer factorization

Рассмотрим:

```text
f(x) = 6x^2 + x - 2
```

Over `Q` можно записать:

```text
6x^2 + x - 2 = (3x - 3/2)(2x + 4/3)
```

Тут coefficients rational.

Но theorem говорит, что если factorization over `Q` существует, то есть factorization over `Z`.

Indeed:

```text
6x^2 + x - 2 = (2x - 1)(3x + 2)
```

Проверим:

```text
(2x - 1)(3x + 2)
=
6x^2 + 4x - 3x - 2
=
6x^2 + x - 2
```

Так мы получили integer factorization.

## Mod `p` irreducibility test

Теперь перейдём к более удобным tests for irreducibility. Идея такая: иногда polynomial с integer coefficients сложно проверять напрямую over `Q`. Но можно reduce coefficients modulo prime `p` и получить polynomial over finite field:

```text
Z_p[x]
```

Там часто проще проверять roots и factors, потому что элементов мало.

### Reduction modulo `p`

Пусть:

```text
f(x) ∈ Z[x]
```

Например:

```text
f(x) = 21x^3 - 3x^2 + 2x + 9
```

Если мы reduce coefficients modulo `2`, то получаем polynomial over:

```text
Z_2[x]
```

Считаем coefficients:

```text
21 ≡ 1 (mod 2)
-3 ≡ 1 (mod 2)
2 ≡ 0 (mod 2)
9 ≡ 1 (mod 2)
```

Значит reduced polynomial:

```text
f_bar(x) = x^3 + x^2 + 1
```

Эту новую версию обычно обозначают:

```text
f_bar(x)
```

Она живёт уже не в `Z[x]`, а в:

```text
Z_p[x]
```

### Mod `p` irreducibility test

Пусть `p` — prime, и:

```text
f(x) ∈ Z[x]
```

Пусть:

```text
f_bar(x)
```

— polynomial in `Z_p[x]`, полученный reduction coefficients modulo `p`.

Если:

```text
f_bar(x)
```

irreducible over `Z_p`, и при reduction не упала degree:

```text
deg f_bar(x) = deg f(x)
```

то:

```text
f(x)
```

irreducible over `Q`.

### Почему это полезно

Вместо того чтобы factor polynomial over rational numbers, можно попробовать несколько small primes:

```text
2, 3, 5, 7, ...
```

Если хотя бы для одного prime `p` reduced polynomial оказался irreducible over `Z_p`, и degree не упала, то original polynomial irreducible over `Q`.

### Пример: cubic polynomial

Рассмотрим:

```text
f(x) = 21x^3 - 3x^2 + 2x + 9
```

Reduce modulo `2`:

```text
21 ≡ 1
-3 ≡ 1
2 ≡ 0
9 ≡ 1
```

Получаем:

```text
f_bar(x) = x^3 + x^2 + 1
```

Теперь проверим roots in `Z_2`.

В `Z_2` всего два элемента:

```text
0, 1
```

Подставляем:

```text
f_bar(0) = 1
```

и:

```text
f_bar(1) = 1 + 1 + 1 = 3 ≡ 1 (mod 2)
```

Roots нет.

Так как polynomial degree `3`, по reducibility test for degrees `2` and `3` отсутствие roots означает irreducible.

Значит:

```text
f_bar(x)
```

irreducible over `Z_2`.

Degree не упала:

```text
deg f_bar = 3 = deg f
```

Следовательно:

```text
21x^3 - 3x^2 + 2x + 9
```

irreducible over `Q`.

### Почему важно условие про degree

Возьмём тот же polynomial:

```text
f(x) = 21x^3 - 3x^2 + 2x + 9
```

но теперь reduce modulo `3`.

Coefficients:

```text
21 ≡ 0 (mod 3)
-3 ≡ 0 (mod 3)
2 ≡ 2 (mod 3)
9 ≡ 0 (mod 3)
```

Получаем:

```text
f_bar(x) = 2x
```

Этот polynomial irreducible over `Z_3`, потому что он degree `1`.

Но degree упала:

```text
deg f = 3
deg f_bar = 1
```

Поэтому theorem применить нельзя. Такой reduction потерял старшие terms polynomial, и он уже не отражает исходную структуру достаточно хорошо.

## Осторожно: converse не работает

Mod `p` test работает только в одну сторону:

```text
f_bar irreducible over Z_p
=> f irreducible over Q
```

Но обратное неверно.

Если для какого-то prime `p` reduced polynomial оказался reducible, это не значит, что original polynomial reducible over `Q`.

Может просто не повезло с этим `p`.

### Пример, где один prime не помогает

Рассмотрим:

```text
f(x) = 21x^3 - 3x^2 + 2x + 8
```

Modulo `2`:

```text
21 ≡ 1
-3 ≡ 1
2 ≡ 0
8 ≡ 0
```

Получаем:

```text
f_bar(x) = x^3 + x^2
```

А это reducible:

```text
x^3 + x^2 = x^2(x + 1)
```

Но это ещё не доказывает, что `f(x)` reducible over `Q`.

Попробуем modulo `5`.

Coefficients:

```text
21 ≡ 1
-3 ≡ 2
2 ≡ 2
8 ≡ 3
```

Получаем:

```text
f_bar(x) = x^3 + 2x^2 + 2x + 3
```

Проверяем roots in `Z_5`:

```text
f_bar(0) = 3

f_bar(1) = 1 + 2 + 2 + 3 = 8 ≡ 3

f_bar(2) = 8 + 8 + 4 + 3 = 23 ≡ 3

f_bar(3) = 27 + 18 + 6 + 3 = 54 ≡ 4

f_bar(4) = 64 + 32 + 8 + 3 = 107 ≡ 2
```

Roots нет. Так как degree `3`, это означает irreducible over `Z_5`. Degree не упала, значит original polynomial:

```text
21x^3 - 3x^2 + 2x + 8
```

irreducible over `Q`.

Главная мысль:

> один prime может не сработать, но другой prime может сработать.

## Polynomials with rational coefficients

Mod `p` test можно использовать и для polynomials with rational coefficients. Но сначала нужно убрать denominators.

Например:

```text
f(x) = (3/7)x^4 - (2/7)x^2 + (9/35)x + 3/5
```

Умножим на общий denominator:

```text
35
```

Получаем:

```text
h(x) = 35f(x) = 15x^4 - 10x^2 + 9x + 21
```

Over `Q` multiplication by nonzero rational number не влияет на irreducibility, потому что nonzero rational constants являются units in `Q[x]`.

То есть:

```text
f(x) irreducible over Q
```

iff:

```text
h(x) irreducible over Q
```

Теперь можно проверять `h(x)` modulo primes.

Modulo `2`:

```text
15 ≡ 1
-10 ≡ 0
9 ≡ 1
21 ≡ 1
```

Получаем:

```text
h_bar(x) = x^4 + x + 1
```

У него нет roots in `Z_2`:

```text
h_bar(0) = 1
```

```text
h_bar(1) = 1 + 1 + 1 = 1
```

Для degree `4` этого ещё недостаточно: polynomial мог бы раскладываться как product двух quadratics. Но проверка quadratic factors показывает, что таких factors тоже нет.

Значит:

```text
x^4 + x + 1
```

irreducible over `Z_2`.

Следовательно:

```text
h(x)
```

irreducible over `Q`, а значит и исходный:

```text
f(x)
```

тоже irreducible over `Q`.

## Eisenstein's criterion

Есть ещё один очень мощный irreducibility test.

Пусть:

```text
f(x) = a_nx^n + a_(n-1)x^(n-1) + ... + a_1x + a_0
```

is in:

```text
Z[x]
```

Если существует prime `p`, такой что:

1. `p` не делит leading coefficient:

```text
p ∤ a_n
```

2. `p` делит все остальные coefficients:

```text
p | a_(n-1), ..., p | a_1, p | a_0
```

3. `p^2` не делит constant term:

```text
p^2 ∤ a_0
```

то:

```text
f(x)
```

irreducible over `Q`.

Это называется:

```text
Eisenstein's criterion
```

### Как читать условия Eisenstein

Polynomial должен выглядеть так:

```text
leading coefficient не делится на p
```

но все остальные coefficients делятся на `p`. При этом constant term делится на `p`, но не делится на `p^2`. То есть `p` входит в constant term ровно “не слишком сильно”.

### Пример Eisenstein

Рассмотрим:

```text
f(x) = 3x^5 + 15x^4 - 20x^3 + 10x + 20
```

Попробуем:

```text
p = 5
```

Leading coefficient:

```text
3
```

не делится на `5`:

```text
5 ∤ 3
```

Все остальные coefficients делятся на `5`:

```text
5 | 15
5 | -20
5 | 0
5 | 10
5 | 20
```

Constant term:

```text
20
```

не делится на:

```text
25
```

То есть:

```text
25 ∤ 20
```

Все условия Eisenstein выполнены.

Следовательно:

```text
3x^5 + 15x^4 - 20x^3 + 10x + 20
```

irreducible over `Q`.

## Cyclotomic polynomial for prime `p`

Для prime `p` polynomial:

```text
Φ_p(x) = (x^p - 1) / (x - 1)
```

равен:

```text
Φ_p(x) = x^(p-1) + x^(p-2) + ... + x + 1
```

Он называется:

```text
pth cyclotomic polynomial
```

И theorem говорит:

```text
Φ_p(x) is irreducible over Q
```

### Почему здесь появляется Eisenstein

Напрямую Eisenstein к:

```text
x^(p-1) + x^(p-2) + ... + x + 1
```

не применяется, потому что все coefficients равны `1`. Но можно сделать substitution:

```text
x -> x + 1
```

и рассмотреть:

```text
Φ_p(x + 1)
```

Такая замена не меняет reducibility over `Q`, потому что её можно обратить заменой:

```text
x -> x - 1
```

После substitution получается polynomial, к которому применяется Eisenstein with prime `p`. Отсюда следует, что:

```text
Φ_p(x)
```

irreducible over `Q`.

## Почему irreducible polynomials важны

Irreducible polynomials — это polynomial analogue of prime numbers. В integers prime number нельзя разложить на nontrivial factors. В polynomial rings irreducible polynomial нельзя разложить на product polynomials lower degree. Но ещё важнее связь с quotient rings.

Если `F` — field, то:

```text
F[x] / <f(x)>
```

является field тогда и только тогда, когда:

```text
f(x)
```

irreducible over `F`. Именно поэтому irreducible polynomials так важны для construction finite fields.

Например, fields вида:

```text
F_(p^n)
```

строятся через quotients:

```text
F_p[x] / <irreducible polynomial of degree n>
```

## Irreducible polynomials and quotient fields

Главная причина, почему irreducible polynomials так важны, — это связь с quotient rings.

Пусть `F` — field, и пусть:

```text
p(x) ∈ F[x]
```

Тогда ideal:

```text
<p(x)>
```

является maximal ideal in `F[x]` тогда и только тогда, когда:

```text
p(x)
```

irreducible over `F`. А мы уже знаем:

```text
R / A is a field iff A is maximal
```

Поэтому получаем важнейшее следствие:

```text
F[x] / <p(x)> is a field iff p(x) is irreducible over F
```

То есть irreducible polynomial позволяет построить new field как quotient polynomial ring.

### Почему это логично

Если `p(x)` reducible, то его можно разложить:

```text
p(x) = a(x)b(x)
```

где neither `a(x)` nor `b(x)` is a unit.

Тогда в quotient:

```text
F[x] / <p(x)>
```

имеем:

```text
p(x) = 0
```

то есть:

```text
a(x)b(x) = 0
```

Но сами `a(x)` и `b(x)` не обязаны быть zero в quotient. Значит появляются zero divisors. А field не может иметь zero divisors. Поэтому reducible polynomial не даёт field.

### Если polynomial irreducible

Если `p(x)` irreducible over `F`, то ideal:

```text
<p(x)>
```

maximal. А значит quotient:

```text
F[x] / <p(x)>
```

is a field.

Интуитивно:

> quotient by irreducible polynomial добавляет relation `p(x) = 0`, но не создаёт zero divisors.

Именно поэтому irreducible polynomials играют роль prime numbers.

В integers:

```text
Z / pZ
```

is a field, если `p` prime.

В polynomial rings:

```text
F[x] / <p(x)>
```

is a field, если `p(x)` irreducible.

## Polynomial analogue of Euclid's lemma

Для prime numbers есть Euclid's lemma:

```text
p | ab => p | a or p | b
```

Для irreducible polynomials over a field есть аналог. Пусть `F` — field, и пусть:

```text
p(x), a(x), b(x) ∈ F[x]
```

Если `p(x)` irreducible over `F` и:

```text
p(x) | a(x)b(x)
```

то:

```text
p(x) | a(x)
```

или:

```text
p(x) | b(x)
```

То есть irreducible polynomial over a field behaves like a prime.

### Почему это важно

Это делает `F[x]` очень похожим на integers. В `Z` prime numbers контролируют divisibility. В `F[x]` irreducible polynomials контролируют polynomial divisibility. Поэтому можно думать так:

```text
prime number in Z
```

соответствует:

```text
irreducible polynomial in F[x]
```

## Constructing a field with eight elements

Теперь построим field with `8` elements.

Возьмём:

```text
F = Z_2
```

и polynomial:

```text
p(x) = x^3 + x + 1
```

в:

```text
Z_2[x]
```

Чтобы quotient:

```text
Z_2[x] / <x^3 + x + 1>
```

был field, нужно проверить, что `p(x)` irreducible over `Z_2`. Так как degree равна `3`, достаточно проверить roots in `Z_2`. В `Z_2` всего два элемента:

```text
0, 1
```

Проверяем:

```text
p(0) = 0^3 + 0 + 1 = 1
```

и:

```text
p(1) = 1^3 + 1 + 1 = 3 ≡ 1 (mod 2)
```

Roots нет. Значит:

```text
x^3 + x + 1
```

irreducible over `Z_2`.

Следовательно:

```text
Z_2[x] / <x^3 + x + 1>
```

is a field.

### Почему в этом field восемь элементов

В quotient:

```text
Z_2[x] / <x^3 + x + 1>
```

каждый element можно представить remainder degree меньше `3`. То есть каждый element имеет вид:

```text
ax^2 + bx + c
```

где:

```text
a, b, c ∈ Z_2
```

Для каждого coefficient есть два варианта:

```text
0 or 1
```

Поэтому всего элементов:

```text
2 · 2 · 2 = 8
```

То есть quotient field has `8` elements.

Список elements:

```text
0
1
x
x + 1
x^2
x^2 + 1
x^2 + x
x^2 + x + 1
```

### Как считать в этом field

В quotient:

```text
Z_2[x] / <x^3 + x + 1>
```

мы считаем:

```text
x^3 + x + 1 = 0
```

Значит:

```text
x^3 = -x - 1
```

Но в `Z_2`:

```text
-1 = 1
```

и:

```text
-x = x
```

поэтому:

```text
x^3 = x + 1
```

Это главное reduction rule. Если при multiplication появляется `x^3` или higher power, мы заменяем:

```text
x^3
```

на:

```text
x + 1
```

#### Пример addition

Возьмём:

```text
x^2 + x + 1
```

и:

```text
x^2 + 1
```

Складываем:

```text
(x^2 + x + 1) + (x^2 + 1)
=
2x^2 + x + 2
```

В `Z_2`:

```text
2 = 0
```

поэтому:

```text
2x^2 + x + 2 = x
```

Значит:

```text
(x^2 + x + 1) + (x^2 + 1) = x
```

#### Пример multiplication

Умножим:

```text
(x^2 + x + 1)(x^2 + 1)
```

Раскрываем:

```text
x^4 + x^3 + x + 1
```

Теперь используем relation:

```text
x^3 + x + 1 = 0
```

Значит часть:

```text
x^3 + x + 1
```

исчезает в quotient. Остаётся:

```text
x^4
```

Теперь из:

```text
x^3 = x + 1
```

умножаем обе стороны на `x`:

```text
x^4 = x^2 + x
```

Следовательно:

```text
(x^2 + x + 1)(x^2 + 1) = x^2 + x
```

в этом field.

## Another example: field with nine elements

Рассмотрим:

```text
Z_3[x] / <x^2 + 1>
```

Сначала проверим, что:

```text
x^2 + 1
```

irreducible over `Z_3`.

В `Z_3` элементы:

```text
0, 1, 2
```

Проверяем roots:

```text
0^2 + 1 = 1
```

```text
1^2 + 1 = 2
```

```text
2^2 + 1 = 4 + 1 = 5 ≡ 2 (mod 3)
```

Нуля нет. Так как degree равна `2`, отсутствие roots означает irreducible. Значит:

```text
Z_3[x] / <x^2 + 1>
```

is a field.

### Почему в нём девять элементов

Каждый element quotient можно представить remainder degree меньше `2`:

```text
ax + b
```

где:

```text
a, b ∈ Z_3
```

Для `a` есть `3` варианта, для `b` тоже `3`.

Всего:

```text
3 · 3 = 9
```

elements.

### Relation with `Z_3[i]`

В quotient:

```text
Z_3[x] / <x^2 + 1>
```

мы считаем:

```text
x^2 + 1 = 0
```

то есть:

```text
x^2 = -1
```

А в `Z_3`:

```text
-1 ≡ 2
```

поэтому:

```text
x^2 = 2
```

Это похоже на construction:

```text
Z_3[i] = {a + bi | a, b ∈ Z_3}
```

где:

```text
i^2 = -1
```

То есть `x` в quotient играет роль `i`.

Поэтому:

```text
Z_3[x] / <x^2 + 1>
```

is essentially the same field as:

```text
Z_3[i]
```

## General pattern: finite fields from irreducible polynomials

Если `p` — prime, то:

```text
Z_p
```

is a field.

Если взять irreducible polynomial:

```text
f(x) ∈ Z_p[x]
```

degree `n`, то quotient:

```text
Z_p[x] / <f(x)>
```

is a field.

Каждый element quotient можно представить polynomial degree меньше `n`:

```text
a_(n-1)x^(n-1) + ... + a_1x + a_0
```

где каждый coefficient лежит в:

```text
Z_p
```

Для каждого coefficient есть `p` choices. Всего coefficients:

```text
n
```

поэтому всего elements:

```text
p^n
```

Так строятся finite fields with:

```text
p^n
```

elements.

### Почему это важно для crypto

В crypto часто работают with finite fields.

Prime fields:

```text
F_p
```

можно понимать как:

```text
Z_p
```

Но есть ещё extension fields:

```text
F_(p^n)
```

Их можно строить как:

```text
F_p[x] / <irreducible polynomial of degree n>
```

То есть irreducible polynomial задаёт relation, по которой мы сокращаем powers of `x`.

Например:

```text
x^3 + x + 1 = 0
```

даёт field with `8 = 2^3` elements over `Z_2`.

Это уже не просто abstract algebra ради abstract algebra.

Это основа того, как строятся finite fields, которые дальше встречаются в coding theory, cryptography, elliptic curves и ZK systems.

## Unique factorization in `Z[x]`

В конце главы появляется ещё одна важная мысль:

```text
Z[x]
```

имеет unique factorization property. То есть polynomials with integer coefficients можно раскладывать на irreducible factors essentially uniquely. Это похоже на integers.

В `Z` любое nonzero nonunit число можно разложить на primes:

```text
60 = 2 · 2 · 3 · 5
```

И это разложение unique up to order and signs.

В `Z[x]` происходит похожая история, только factors могут быть двух типов:

1. irreducible constant polynomials;
2. irreducible polynomials positive degree.

### Units в `Z[x]`

В `Z[x]` units — это только:

```text
1
```

и:

```text
-1
```

Почему?

Чтобы polynomial был unit, у него должен быть multiplicative inverse inside `Z[x]`. Но если polynomial имеет positive degree, то при умножении degree обычно растёт, а не исчезает. А среди integer constants обратимы только:

```text
1
-1
```

потому что:

```text
1 · 1 = 1
```

и:

```text
(-1)(-1) = 1
```

А, например:

```text
2
```

не unit in `Z[x]`, потому что:

```text
1/2 not in Z[x]
```

### Irreducible constants в `Z[x]`

Constant polynomial:

```text
p
```

irreducible in `Z[x]`, если `p` — prime number.

Например:

```text
2
3
5
-2
-3
-5
```

are irreducible constant polynomials.

А:

```text
6
```

не irreducible, потому что:

```text
6 = 2 · 3
```

и neither `2` nor `3` is unit in `Z[x]`.

## Unique factorization in `Z[x]`

Theorem говорит:

> every polynomial in `Z[x]` that is neither zero nor unit can be written as a product of irreducible polynomials, and this factorization is unique up to order and multiplication by `±1`.

То есть если polynomial можно разложить двумя способами:

```text
f(x) = p1(x)p2(x)...pm(x)
```

и:

```text
f(x) = q1(x)q2(x)...qn(x)
```

где все factors irreducible, то на самом деле:

```text
m = n
```

и после перестановки factors каждый `pi(x)` совпадает с соответствующим `qi(x)` up to sign:

```text
pi(x) = ±qi(x)
```

### Простой пример

Возьмём:

```text
f(x) = 6x^2 - 6
```

Можно разложить:

```text
6x^2 - 6 = 6(x^2 - 1)
```

Дальше:

```text
6 = 2 · 3
```

и:

```text
x^2 - 1 = (x - 1)(x + 1)
```

Получаем:

```text
6x^2 - 6 = 2 · 3 · (x - 1)(x + 1)
```

Это factorization into irreducibles in `Z[x]`.

Можно переставить factors:

```text
3 · (x + 1) · 2 · (x - 1)
```

или вынести signs:

```text
(-2) · 3 · (1 - x)(x + 1)
```

Но по сути это то же самое разложение.

Unique factorization разрешает такие изменения:

```text
order of factors
```

и:

```text
multiplication by units ±1
```

Но новых fundamentally different irreducible factors не появится.

### Почему это важно

Unique factorization позволяет работать с polynomials почти как с integers. В integers primes являются “атомами” multiplication. В `Z[x]` irreducible polynomials играют похожую роль. Это важно для:

```text
divisibility
factorization
irreducibility tests
quotient rings
finite fields
```

Если polynomial factorization не была бы unique, то многие рассуждения о divisibility ломались бы.

## Weird dice: application of unique factorization

Есть красивое применение unique factorization к задаче про dice. Обычный кубик имеет faces:

```text
1, 2, 3, 4, 5, 6
```

Если бросить два обычных кубика, суммы имеют распределение:

```text
2: 1 way
3: 2 ways
4: 3 ways
5: 4 ways
6: 5 ways
7: 6 ways
8: 5 ways
9: 4 ways
10: 3 ways
11: 2 ways
12: 1 way
```

Например, sum `6` можно получить пятью способами:

```text
1 + 5
2 + 4
3 + 3
4 + 2
5 + 1
```

### Encoding dice as polynomials

Обычный кубик можно encoded as polynomial:

```text
D(x) = x + x^2 + x^3 + x^4 + x^5 + x^6
```

Почему так? Каждая face label становится exponent.

Face `1` даёт:

```text
x
```

Face `2` даёт:

```text
x^2
```

и так далее.

Если бросаем два кубика, нужно перемножить их polynomials:

```text
D(x)D(x)
```

Тогда coefficient при:

```text
x^k
```

показывает, сколькими способами можно получить sum `k`.

Например, term:

```text
x^6
```

может появиться как:

```text
x · x^5
x^2 · x^4
x^3 · x^3
x^4 · x^2
x^5 · x
```

То есть ровно `5` ways.

### Sicherman dice

Оказывается, есть необычная пара dice, которая даёт те же probabilities sums, что и обычные dice. Одна die имеет labels:

```text
1, 2, 2, 3, 3, 4
```

Другая:

```text
1, 3, 4, 5, 6, 8
```

Эти dice называются:

```text
Sicherman dice
```

Если бросать их вместе, distribution sums будет таким же, как у двух обычных dice.

### Polynomial version of the problem

Для обычной пары dice:

```text
D(x)^2
=
(x + x^2 + x^3 + x^4 + x^5 + x^6)^2
```

Для weird dice с labels:

```text
a1, a2, a3, a4, a5, a6
```

и:

```text
b1, b2, b3, b4, b5, b6
```

получаем polynomials:

```text
A(x) = x^a1 + x^a2 + x^a3 + x^a4 + x^a5 + x^a6
```

и:

```text
B(x) = x^b1 + x^b2 + x^b3 + x^b4 + x^b5 + x^b6
```

Чтобы weird dice давали те же probabilities, нужно:

```text
A(x)B(x) = D(x)^2
```

То есть задача про dice превращается в задачу про factorization polynomials.

### Factorization обычного dice polynomial

Сначала factor обычного dice polynomial:

```text
D(x) = x + x^2 + x^3 + x^4 + x^5 + x^6
```

Выносим `x`:

```text
D(x) = x(1 + x + x^2 + x^3 + x^4 + x^5)
```

А дальше:

```text
1 + x + x^2 + x^3 + x^4 + x^5
=
(x + 1)(x^2 + x + 1)(x^2 - x + 1)
```

Поэтому:

```text
D(x) = x(x + 1)(x^2 + x + 1)(x^2 - x + 1)
```

Значит:

```text
D(x)^2
=
x^2(x + 1)^2(x^2 + x + 1)^2(x^2 - x + 1)^2
```

Теперь unique factorization says:

> any factorization of `D(x)^2` must use exactly these irreducible factors, just distributed between `A(x)` and `B(x)`.

### Как из этого появляются Sicherman dice

Каждый weird die polynomial должен быть product of some of these factors.

С учётом условий dice:

- у каждого кубика должно быть 6 faces;
- labels positive;
- minimum sum должен быть `2`;
- coefficients должны быть nonnegative integers;
- сумма coefficients polynomial должна быть `6`.

В итоге possible dice polynomials сводятся к трём вариантам для одной die:

```text
x + x^2 + x^3 + x^4 + x^5 + x^6
```

обычная die:

```text
1, 2, 3, 4, 5, 6
```

или:

```text
x + 2x^2 + 2x^3 + x^4
```

Sicherman die:

```text
1, 2, 2, 3, 3, 4
```

или:

```text
x + x^3 + x^4 + x^5 + x^6 + x^8
```

другая Sicherman die:

```text
1, 3, 4, 5, 6, 8
```

Поэтому, кроме обычной пары dice, есть ровно одна nonstandard pair с тем же distribution:

```text
1, 2, 2, 3, 3, 4
```

и:

```text
1, 3, 4, 5, 6, 8
```

# ##Почему это вообще работает

Polynomial multiplication counts sums. Unique factorization restricts possible ways to split the ordinary dice polynomial product into two dice polynomials.

То есть algebra говорит:

> если две dice имеют тот же sum distribution, их polynomials должны multiply to the same product.

А unique factorization говорит:

> у этого product есть только ограниченное число ways to split irreducible factors.

Так мы получаем Sicherman dice and prove that no other positive integer-labeled dice pair works.