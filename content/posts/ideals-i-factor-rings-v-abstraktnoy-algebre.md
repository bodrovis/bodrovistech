---
title: "Ideals and Factor Rings: зачем rings нужны идеалы"
draft: false
date: 2026-06-30
meta_desc: "Понятное введение в ideals and factor rings: что такое идеалы, quotient rings, principal ideals, prime и maximal ideals и как они связаны с integral domains и fields."
tags:
- абстрактная алгебра
- cs
- zero knowledge
---

В group theory у нас уже была важная конструкция:

```text
normal subgroup
```

Normal subgroups нужны не просто как “особые subgroups”. Они позволяют строить:

```text
factor groups / quotient groups
```

То есть мы можем взять группу `G`, normal subgroup `N`, склеить элементы по cosets и получить новую группу:

```text
G / N
```

В ring theory происходит похожая история.

Subrings похожи на subgroups, но для построения quotient structures их недостаточно. Нужна более сильная структура:

```text
ideal / идеал
```

Главная идея:

> ideal — это subring, который не просто живёт внутри ring, но ещё и “поглощает” умножение на элементы всего ring.

---

# Почему subring недостаточно

Subring — это subset ring, который сам является ring с теми же operations.

То есть если:

```text
A ⊆ R
```

и `A` closed under subtraction и multiplication, то `A` является subring.

Но для quotient ring этого мало.

Когда мы строим factor group, cosets должны нормально вести себя относительно операции.

Для rings у нас две операции:

```text
addition
multiplication
```

По addition всё работает похоже на factor groups, потому что:

```text
(R, +)
```

является Abelian group.

Но multiplication cosets может сломаться, если subset не имеет дополнительного свойства.

Именно это дополнительное свойство и называется:

```text
ideal
```

---

# Ideal

Пусть `R` — ring, а:

```text
A ⊆ R
```

Тогда `A` называется **ideal / идеалом** ring `R`, если:

1. `A` является subring of `R`;
2. умножение любого элемента из `A` на любой элемент из `R` снова остаётся внутри `A`.

То есть для любых:

```text
a ∈ A
```

и:

```text
r ∈ R
```

должно выполняться:

```text
ra ∈ A
```

и:

```text
ar ∈ A
```

Если ring commutative, то условия `ra ∈ A` и `ar ∈ A` совпадают, потому что:

```text
ra = ar
```

Но в noncommutative rings нужно проверять обе стороны.

---

# Идеал как “поглощающий” subring

Самый полезный способ думать про ideal:

> ideal — это subring, который поглощает multiplication by elements of the whole ring.

То есть если элемент уже попал в ideal, то умножение на что угодно из большого ring не выбрасывает его наружу.

Например, если:

```text
a ∈ A
```

и:

```text
r ∈ R
```

то:

```text
ra
```

и:

```text
ar
```

обязаны остаться внутри `A`.

Поэтому говорят, что ideal absorbs elements from `R`.

---

# Ideal test

Как и с subrings, не хочется каждый раз проверять все axioms.

Есть удобный **ideal test**.

Непустое subset:

```text
A ⊆ R
```

является ideal of `R`, если:

1. для любых `a, b ∈ A`:

```text
a - b ∈ A
```

2. для любого `a ∈ A` и любого `r ∈ R`:

```text
ra ∈ A
```

и:

```text
ar ∈ A
```

Первое условие говорит, что `A` ведёт себя нормально по addition.

Второе условие говорит, что `A` поглощает multiplication by elements of `R`.

---

# Почему первое условие такое же, как в subring test

Условие:

```text
a - b ∈ A
```

означает, что `A` closed under subtraction.

Из этого автоматически следуют важные вещи.

Если взять:

```text
a = b
```

то:

```text
a - a = 0 ∈ A
```

Значит в `A` есть additive identity.

Теперь, поскольку:

```text
0 ∈ A
```

для любого `a ∈ A` получаем:

```text
0 - a = -a ∈ A
```

Значит в `A` есть additive inverses.

А addition можно получить так:

```text
a + b = a - (-b)
```

Поэтому `A` closed under addition.

То есть первое условие делает `A` additive subgroup of `(R, +)`.

---

# Почему нужно второе условие

Если `A` просто subring, то мы знаем только:

```text
a, b ∈ A => ab ∈ A
```

Но ideal требует больше.

Он требует:

```text
a ∈ A
r ∈ R
=> ar ∈ A and ra ∈ A
```

То есть второй множитель может быть не из `A`, а из всего большого ring `R`.

Это и есть ключевое отличие ideal от subring.

---

# Trivial ideals

У любого ring `R` есть два очевидных ideals.

Первый:

```text
{0}
```

Проверим:

```text
0 - 0 = 0
```

и для любого `r ∈ R`:

```text
r · 0 = 0
```

```text
0 · r = 0
```

Значит:

```text
{0}
```

является ideal of `R`.

Его называют:

```text
trivial ideal
```

Второй очевидный ideal — сам ring:

```text
R
```

Потому что если мы умножаем элементы `R` на элементы `R`, мы всё равно остаёмся в `R`.

---

# Proper ideal

Ideal `A` называется **proper ideal / собственным идеалом**, если он не равен всему ring:

```text
A != R
```

То есть:

```text
A
```

является proper subset of `R`.

Например:

```text
{0}
```

является proper ideal, если ring `R` не состоит только из одного элемента.

---

# Пример: `nZ` является ideal of `Z`

Для любого positive integer `n` рассмотрим:

```text
nZ = {..., -3n, -2n, -n, 0, n, 2n, 3n, ...}
```

Это множество всех integers, делящихся на `n`.

Например:

```text
3Z = {..., -9, -6, -3, 0, 3, 6, 9, ...}
```

Мы уже знаем, что `nZ` является subring of `Z`.

Теперь проверим, что это ideal.

Пусть:

```text
a ∈ nZ
```

Тогда:

```text
a = nk
```

для некоторого integer `k`.

Теперь возьмём любой integer:

```text
r ∈ Z
```

Тогда:

```text
ra = r(nk) = n(rk)
```

А это снова multiple of `n`.

Значит:

```text
ra ∈ nZ
```

Так как `Z` commutative, то:

```text
ar ∈ nZ
```

тоже.

Следовательно:

```text
nZ
```

является ideal of `Z`.

---

# Почему это важнее, чем просто subring

Например:

```text
2Z
```

— это не просто subring of `Z`.

Это ideal, потому что если взять even number и умножить его на любой integer, результат снова будет even.

```text
even · integer = even
```

То есть `2Z` поглощает умножение на элементы всего `Z`.

---

# Principal ideal

Пусть `R` — commutative ring with unity, и пусть:

```text
a ∈ R
```

Тогда множество всех multiples элемента `a`:

```text
<a> = {ra | r ∈ R}
```

называется **principal ideal / главным идеалом**, generated by `a`.

То есть:

```text
<a>
```

состоит из всего, что можно получить, умножая `a` на элементы ring.

---

## Пример в `Z`

В `Z`:

```text
<3>
```

означает:

```text
{3r | r ∈ Z}
```

То есть:

```text
<3> = {..., -9, -6, -3, 0, 3, 6, 9, ...}
```

А это ровно:

```text
3Z
```

Значит:

```text
<3> = 3Z
```

Вообще в integers:

```text
<n> = nZ
```

---

# Осторожно с notation `<a>`

Запись:

```text
<a>
```

мы уже видели в group theory.

Там она означала cyclic subgroup generated by `a`.

Теперь в ring theory та же запись может означать principal ideal generated by `a`.

Контекст важен.

Если мы говорим о groups:

```text
<a>
```

обычно значит все powers или multiples элемента `a` в группе.

Если мы говорим о ideals в commutative ring:

```text
<a>
```

обычно значит:

```text
{ra | r ∈ R}
```

то есть все ring-multiples of `a`.

---

# Ideal generated by several elements

Можно generated ideal не одним элементом, а несколькими.

Пусть:

```text
a1, a2, ..., an ∈ R
```

Тогда:

```text
<a1, a2, ..., an>
```

означает множество всех combinations:

```text
r1a1 + r2a2 + ... + rnan
```

где:

```text
r1, r2, ..., rn ∈ R
```

То есть:

```text
<a1, a2, ..., an>
=
{r1a1 + r2a2 + ... + rnan | ri ∈ R}
```

Это ideal generated by elements:

```text
a1, a2, ..., an
```

---

## Пример: `<x, 2>` в `Z[x]`

В polynomial ring:

```text
Z[x]
```

ideal:

```text
<x, 2>
```

состоит из всех polynomials вида:

```text
f(x)x + g(x)2
```

где:

```text
f(x), g(x) ∈ Z[x]
```

То есть:

```text
<x, 2> = {f(x)x + 2g(x) | f(x), g(x) ∈ Z[x]}
```

Что это означает проще?

Term:

```text
f(x)x
```

даёт polynomial with zero constant term, потому что всё умножено на `x`.

Term:

```text
2g(x)
```

даёт polynomial, у которого все coefficients even, в частности constant term even.

В сумме получается polynomial with even constant term.

Поэтому ideal:

```text
<x, 2>
```

можно понимать как set polynomials in `Z[x]` with even constant term.

Например:

```text
3x^2 + 5x + 4
```

лежит в `<x, 2>`, потому что constant term `4` even.

А:

```text
3x^2 + 5x + 7
```

не лежит в `<x, 2>`, потому что constant term `7` odd.

---

# Пример: polynomials with zero constant term

Рассмотрим ring:

```text
R[x]
```

polynomials with real coefficients.

Пусть `A` — subset всех polynomials with constant term `0`.

Например:

```text
3x^2 + 5x
```

лежит в `A`.

А:

```text
3x^2 + 5x + 7
```

не лежит в `A`, потому что constant term равен `7`.

Все polynomials with zero constant term можно записать как multiples of `x`:

```text
A = <x>
```

Почему?

Если polynomial имеет zero constant term, он выглядит так:

```text
a1x + a2x^2 + ... + anx^n
```

Из каждого term можно вынести `x`:

```text
x(a1 + a2x + ... + anx^(n-1))
```

Значит он является multiple of `x`.

Поэтому:

```text
A = <x>
```

и это ideal of `R[x]`.

---

# Subring не обязан быть ideal

Каждый ideal является subring.

Но не каждый subring является ideal.

Нужно помнить разницу:

```text
subring: closed under multiplication внутри себя
ideal: absorbs multiplication by all elements of R
```

То есть для subring достаточно:

```text
a, b ∈ A => ab ∈ A
```

А для ideal нужно:

```text
a ∈ A, r ∈ R => ar ∈ A and ra ∈ A
```

---

## Пример: differentiable functions

Пусть `R` — ring всех real-valued functions:

```text
f : R -> R
```

с pointwise addition и multiplication.

Пусть `S` — subset всех differentiable functions.

`S` является subring.

Почему?

Сумма differentiable functions снова differentiable.

Произведение differentiable functions тоже differentiable.

Значит `S` closed under нужными operations.

Но `S` не является ideal of `R`.

Почему?

Чтобы быть ideal, `S` должно поглощать multiplication by any function from `R`.

То есть если:

```text
s ∈ S
```

и:

```text
r ∈ R
```

то произведение:

```text
rs
```

должно снова быть differentiable.

Но это не всегда так.

Можно взять differentiable function:

```text
s(x) = 1
```

и arbitrary real-valued function `r`, которая не differentiable.

Тогда:

```text
r(x)s(x) = r(x)
```

А `r` может быть не differentiable.

Значит:

```text
rs not in S
```

Следовательно, `S` is not an ideal of `R`.

---

# Почему ideals нужны дальше

Ideals нужны для построения:

```text
factor rings / quotient rings
```

Это ring-версия factor groups.

Грубо говоря, если `A` — ideal of `R`, то мы можем построить new ring:

```text
R / A
```

Его elements будут cosets:

```text
r + A
```

Addition задаётся так:

```text
(s + A) + (t + A) = (s + t) + A
```

Multiplication задаётся так:

```text
(s + A)(t + A) = st + A
```

И вот именно ideal property гарантирует, что multiplication cosets определена корректно.

Если `A` был бы просто subring, multiplication cosets могла бы зависеть от выбора representatives.

---

# Короткая выжимка

Ideal — это subring `A` of ring `R`, который поглощает multiplication by elements of `R`.

То есть для любых:

```text
a ∈ A
```

и:

```text
r ∈ R
```

должно быть:

```text
ra ∈ A
```

и:

```text
ar ∈ A
```

---

## Ideal test

Непустое subset `A ⊆ R` является ideal, если:

```text
a - b ∈ A
```

для любых `a, b ∈ A`, и:

```text
ra, ar ∈ A
```

для любых `a ∈ A`, `r ∈ R`.

---

## Examples

```text
{0}
```

и:

```text
R
```

являются ideals любого ring `R`.

Для любого positive integer `n`:

```text
nZ
```

является ideal of `Z`.

В commutative ring with unity:

```text
<a> = {ra | r ∈ R}
```

является principal ideal generated by `a`.

---

## Главная мысль

> Ideals — это именно те subrings, по которым можно корректно строить factor rings.

# Factor rings

Теперь понятно, зачем нужны ideals.

Если `A` — ideal of `R`, то можно построить новое ring:

```text
R / A
```

Оно называется:

```text
factor ring / quotient ring
```

Его элементы — это cosets вида:

```text
r + A
```

где:

```text
r ∈ R
```

То есть мы берём элемент `r` и добавляем к нему все элементы ideal `A`:

```text
r + A = {r + a | a ∈ A}
```

Это похоже на factor groups:

```text
G / N
```

Только теперь мы хотим, чтобы cosets образовывали не просто group по addition, а целое ring с addition и multiplication.

---

# Операции в factor ring

Пусть:

```text
s + A
```

и:

```text
t + A
```

— два элемента factor ring `R / A`.

Addition задаётся так:

```text
(s + A) + (t + A) = (s + t) + A
```

Multiplication задаётся так:

```text
(s + A)(t + A) = st + A
```

То есть мы складываем или умножаем representatives `s` и `t`, а потом берём coset результата.

---

# Почему нужен именно ideal

Для addition всё относительно спокойно, потому что:

```text
(R, +)
```

является Abelian group.

Но multiplication cosets может быть корректно определена только если `A` — ideal.

Идея такая:

> если мы заменим representative `s` на другой элемент того же coset, результат multiplication не должен измениться.

Именно absorption property ideal гарантирует, что лишние terms попадут обратно в `A` и не изменят coset.

Поэтому:

```text
R / A
```

является ring тогда и только тогда, когда `A` — ideal of `R`.

---

# Пример: `Z / 4Z`

Рассмотрим ring:

```text
Z
```

и ideal:

```text
4Z = {..., -8, -4, 0, 4, 8, ...}
```

Factor ring:

```text
Z / 4Z
```

состоит из cosets:

```text
0 + 4Z
1 + 4Z
2 + 4Z
3 + 4Z
```

Других distinct cosets нет, потому что любой integer имеет один из четырёх remainders modulo `4`.

Например:

```text
5 + 4Z = 1 + 4Z
```

потому что:

```text
5 - 1 = 4 ∈ 4Z
```

То есть `5` и `1` лежат в одном coset.

---

## Addition в `Z / 4Z`

Возьмём:

```text
2 + 4Z
```

и:

```text
3 + 4Z
```

Тогда:

```text
(2 + 4Z) + (3 + 4Z)
=
5 + 4Z
```

Но:

```text
5 + 4Z = 1 + 4Z
```

поэтому:

```text
(2 + 4Z) + (3 + 4Z)
=
1 + 4Z
```

Это обычная addition modulo `4`.

---

## Multiplication в `Z / 4Z`

Теперь multiplication:

```text
(2 + 4Z)(3 + 4Z)
=
6 + 4Z
```

Но:

```text
6 + 4Z = 2 + 4Z
```

поэтому:

```text
(2 + 4Z)(3 + 4Z)
=
2 + 4Z
```

Это обычная multiplication modulo `4`.

Получается:

```text
Z / 4Z ≅ Z_4
```

---

# Пример: `2Z / 6Z`

Теперь возьмём ring:

```text
2Z = {..., -4, -2, 0, 2, 4, 6, ...}
```

и ideal:

```text
6Z = {..., -12, -6, 0, 6, 12, ...}
```

Здесь:

```text
6Z ⊆ 2Z
```

Factor ring:

```text
2Z / 6Z
```

имеет cosets:

```text
0 + 6Z
2 + 6Z
4 + 6Z
```

Операции здесь essentially modulo `6`, но только на even residues.

Например:

```text
(4 + 6Z) + (4 + 6Z)
=
8 + 6Z
=
2 + 6Z
```

потому что:

```text
8 - 2 = 6 ∈ 6Z
```

Multiplication:

```text
(4 + 6Z)(4 + 6Z)
=
16 + 6Z
=
4 + 6Z
```

потому что:

```text
16 - 4 = 12 ∈ 6Z
```

---

# Factor ring как “арифметика с правилом равенства”

Factor ring можно понимать так:

> элементы, которые отличаются на элемент ideal, считаются equivalent.

В `Z / 4Z` это означает:

```text
a и b считаются одинаковыми, если a - b ∈ 4Z
```

То есть если:

```text
a - b
```

делится на `4`.

А это ровно congruence modulo `4`:

```text
a ≡ b (mod 4)
```

Поэтому `Z / 4Z` ведёт себя как `Z_4`.

---

# Example: `R[x] / <x^2 + 1>`

Рассмотрим polynomial ring:

```text
R[x]
```

и ideal:

```text
<x^2 + 1>
```

Это principal ideal generated by polynomial:

```text
x^2 + 1
```

То есть:

```text
<x^2 + 1> = {f(x)(x^2 + 1) | f(x) ∈ R[x]}
```

В quotient ring:

```text
R[x] / <x^2 + 1>
```

мы считаем polynomial:

```text
x^2 + 1
```

равным `0`.

То есть:

```text
x^2 + 1 = 0
```

А значит:

```text
x^2 = -1
```

Это очень похоже на complex numbers, где:

```text
i^2 = -1
```

---

## Почему остаются только expressions вида `ax + b`

Любой polynomial `g(x)` можно разделить на:

```text
x^2 + 1
```

с remainder degree меньше `2`.

То есть:

```text
g(x) = q(x)(x^2 + 1) + r(x)
```

где remainder имеет вид:

```text
r(x) = ax + b
```

В quotient ring term:

```text
q(x)(x^2 + 1)
```

попадает в ideal:

```text
<x^2 + 1>
```

и поэтому считается равным `0`.

Значит каждый coset можно представить как:

```text
ax + b + <x^2 + 1>
```

Иными словами, в quotient ring достаточно работать с expressions вида:

```text
ax + b
```

---

## Multiplication в `R[x] / <x^2 + 1>`

Возьмём два elements:

```text
x + 3 + <x^2 + 1>
```

и:

```text
2x + 5 + <x^2 + 1>
```

Умножаем representatives:

```text
(x + 3)(2x + 5)
=
2x^2 + 11x + 15
```

Но в quotient ring:

```text
x^2 = -1
```

поэтому:

```text
2x^2 + 11x + 15
=
2(-1) + 11x + 15
=
11x + 13
```

Значит:

```text
(x + 3 + <x^2 + 1>)(2x + 5 + <x^2 + 1>)
=
11x + 13 + <x^2 + 1>
```

Этот quotient ring algebraically behaves like complex numbers.

Интуитивно:

```text
x
```

играет роль:

```text
i
```

потому что:

```text
x^2 = -1
```

---

# Prime ideals

Теперь перейдём к special ideals.

Пусть `R` — commutative ring.

Proper ideal:

```text
A
```

называется **prime ideal / простым идеалом**, если из условия:

```text
ab ∈ A
```

следует:

```text
a ∈ A
```

или:

```text
b ∈ A
```

То есть prime ideal ведёт себя похоже на prime number.

---

## Почему это похоже на prime number

В integers prime number `p` имеет свойство:

```text
p divides ab
```

значит:

```text
p divides a
```

или:

```text
p divides b
```

Например:

```text
5 divides ab
```

тогда `5` должен делить хотя бы один из множителей.

Для ideal `A` условие:

```text
ab ∈ A
```

можно воспринимать как ring-version фразы:

```text
A divides product ab
```

И prime ideal говорит:

> если product попал в ideal, то хотя бы один factor уже был в ideal.

---

# Пример: `nZ` в `Z`

В `Z` ideal:

```text
nZ
```

является prime ideal тогда и только тогда, когда `n` prime.

Например:

```text
5Z
```

prime ideal.

Если:

```text
ab ∈ 5Z
```

это значит:

```text
5 divides ab
```

А так как `5` prime:

```text
5 divides a
```

или:

```text
5 divides b
```

То есть:

```text
a ∈ 5Z
```

или:

```text
b ∈ 5Z
```

Значит:

```text
5Z
```

prime ideal.

А вот:

```text
6Z
```

не prime ideal.

Потому что:

```text
2 · 3 = 6 ∈ 6Z
```

но:

```text
2 ∉ 6Z
```

и:

```text
3 ∉ 6Z
```

---

# Maximal ideals

Proper ideal:

```text
A
```

называется **maximal ideal / максимальным идеалом**, если между `A` и всем ring `R` нет других ideals.

То есть если:

```text
A ⊆ B ⊆ R
```

и `B` — ideal, то возможно только два варианта:

```text
B = A
```

или:

```text
B = R
```

Нельзя найти ideal, который строго больше `A`, но всё ещё строго меньше `R`.

---

## Интуиция

Maximal ideal — это ideal, который уже нельзя увеличить, не получив весь ring.

То есть он “максимальный среди proper ideals”.

Важно:

```text
maximal
```

не значит “самый большой по размеру вообще”.

Это значит:

> нет intermediate ideal между ним и `R`.

---

# Пример в `Z`

В `Z` maximal ideals имеют вид:

```text
pZ
```

где `p` — prime.

Например:

```text
5Z
```

maximal ideal of `Z`.

Почему?

Ideals in `Z` имеют вид:

```text
nZ
```

Если ideal содержит `5Z`, то он соответствует divisor structure.

Между:

```text
5Z
```

и:

```text
Z
```

нет другого ideal.

А вот:

```text
6Z
```

не maximal, потому что:

```text
6Z ⊂ 2Z ⊂ Z
```

и:

```text
6Z ⊂ 3Z ⊂ Z
```

То есть `6Z` можно увеличить, не доходя сразу до всего `Z`.

---

# Prime vs maximal

Есть два важных theorem.

Пусть `R` — commutative ring with unity, а `A` — ideal of `R`.

Тогда:

```text
R / A is an integral domain iff A is prime
```

И:

```text
R / A is a field iff A is maximal
```

То есть свойства ideal можно понимать через quotient ring.

---

## Почему prime ideal связан с integral domain

В quotient ring:

```text
R / A
```

zero element — это coset:

```text
A
```

Если product двух cosets равен zero coset:

```text
(a + A)(b + A) = A
```

то:

```text
ab + A = A
```

Это означает:

```text
ab ∈ A
```

Если `A` prime, то отсюда следует:

```text
a ∈ A
```

или:

```text
b ∈ A
```

А значит:

```text
a + A = A
```

или:

```text
b + A = A
```

То есть один из factors уже был zero element quotient ring.

Значит в `R / A` нет zero divisors.

Поэтому:

```text
R / A
```

is integral domain.

---

## Почему maximal ideal связан с field

Theorem говорит:

```text
R / A is a field iff A is maximal
```

Интуитивно:

* если `A` maximal, quotient ring `R / A` уже нельзя further collapse через intermediate ideals;
* это заставляет каждый nonzero coset иметь inverse;
* значит quotient становится field.

Практически это очень важный способ строить fields.

Например:

```text
Z / pZ
```

is field exactly when:

```text
pZ
```

is maximal.

А `pZ` maximal exactly when `p` prime.

Поэтому:

```text
Z / pZ ≅ Z_p
```

is field for prime `p`.

---

# Maximal implies prime

В commutative ring with unity:

```text
maximal ideal => prime ideal
```

Почему?

Если `A` maximal, то:

```text
R / A
```

is field.

Every field is integral domain.

Значит:

```text
R / A
```

is integral domain.

А это означает, что:

```text
A
```

is prime.

Схема такая:

```text
A maximal
=> R / A field
=> R / A integral domain
=> A prime
```

---

# Prime does not always imply maximal

Обратное неверно.

Prime ideal не обязан быть maximal.

Example:

```text
<x> ⊆ Z[x]
```

Это ideal всех polynomials with zero constant term.

Он prime, но не maximal.

---

## Почему `<x>` prime в `Z[x]`

Polynomial лежит в:

```text
<x>
```

тогда и только тогда, когда его constant term равен `0`.

То есть:

```text
f(x) ∈ <x>
```

если:

```text
f(0) = 0
```

Пусть:

```text
g(x)h(x) ∈ <x>
```

Тогда:

```text
(g h)(0) = 0
```

Но:

```text
(g h)(0) = g(0)h(0)
```

А `g(0)` и `h(0)` — integers.

В `Z` нет zero divisors, поэтому:

```text
g(0) = 0
```

или:

```text
h(0) = 0
```

Значит:

```text
g(x) ∈ <x>
```

или:

```text
h(x) ∈ <x>
```

Поэтому:

```text
<x>
```

is prime ideal.

---

## Почему `<x>` не maximal в `Z[x]`

Чтобы ideal был maximal, между ним и всем ring не должно быть intermediate ideals.

Но есть strict chain:

```text
<x> ⊂ <x, 2> ⊂ Z[x]
```

Ideal:

```text
<x, 2>
```

состоит из polynomials with even constant term.

Он строго больше `<x>`, потому что содержит, например:

```text
2
```

А `2` не лежит в `<x>`, потому что constant term `2` не равен `0`.

Но `<x, 2>` всё ещё не весь `Z[x]`, потому что polynomial:

```text
1
```

не лежит в `<x, 2>`.

Значит между `<x>` и `Z[x]` есть intermediate ideal.

Поэтому:

```text
<x>
```

not maximal.