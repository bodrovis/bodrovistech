---

title: "Ring Homomorphisms: функции, сохраняющие сложение и умножение"
draft: false
date: 2026-07-03T12:00:00
meta_desc: "Понятное введение в ring homomorphisms и ring isomorphisms: как функции сохраняют сложение и умножение, чем homomorphism отличается от isomorphism, и примеры с Z_n, polynomials и characteristic 2."
tags:
- абстрактная алгебра
- cs
- zero knowledge
---

В group theory мы уже видели **homomorphisms / гомоморфизмы**. Group homomorphism — это mapping между groups, который сохраняет group operation.

Если groups записаны multiplicatively, условие выглядит так:

```text
φ(ab) = φ(a)φ(b)
```

Если groups записаны additively:

```text
φ(a + b) = φ(a) + φ(b)
```

В ring theory идея похожая, но теперь у нас не одна operation, а две:

```text
addition
multiplication
```

Поэтому ring homomorphism должен сохранять обе.

## Ring homomorphism

Пусть `R` и `S` — rings.

Mapping:

```text
φ : R -> S
```

называется **ring homomorphism / гомоморфизмом колец**, если для любых:

```text
a, b ∈ R
```

выполняются два условия:

```text
φ(a + b) = φ(a) + φ(b)
```

и:

```text
φ(ab) = φ(a)φ(b)
```

Первое условие говорит:

> сложить в `R`, а потом применить `φ` — то же самое, что сначала применить `φ`, а потом сложить в `S`.

Второе условие говорит:

> умножить в `R`, а потом применить `φ` — то же самое, что сначала применить `φ`, а потом умножить в `S`.

## Важно: операции слева и справа могут быть разными

В записи:

```text
φ(a + b) = φ(a) + φ(b)
```

символ `+` слева — это addition в ring `R`.

А символ `+` справа — это addition в ring `S`.

То же самое с multiplication:

```text
φ(ab) = φ(a)φ(b)
```

Слева multiplication выполняется в `R`, справа — в `S`. Это особенно важно, когда rings разные.

Например:

```text
φ : Z4 -> Z10
```

Тогда в `Z4` operations выполняются modulo `4`, а в `Z10` — modulo `10`.

## Ring isomorphism

**Ring isomorphism / изоморфизм колец** — это ring homomorphism, который одновременно:

```text
one-to-one
```

и:

```text
onto
```

То есть ring isomorphism — это structure-preserving bijection.

Если существует ring isomorphism:

```text
R -> S
```

то rings `R` и `S` algebraically identical. Они могут выглядеть по-разному, но с точки зрения ring structure это одна и та же algebraic object.

Обозначение:

```text
R ≅ S
```

## Homomorphism vs isomorphism

Разница такая же, как в group theory.

- **Isomorphism** показывает, что две structures по сути одинаковы.
- **Homomorphism** может терять информацию, склеивать элементы, отправлять большой ring в меньший, но при этом сохранять важные algebraic operations.

Коротко:

- isomorphism = сохраняет всю структуру без потерь
- homomorphism = сохраняет операции, но может терять информацию

## Нужно ли сохранять unity

Важный нюанс. В нашем учебнике ring homomorphism обязан сохранять:

```text
addition
multiplication
```

Но он не обязан автоматически сохранять multiplicative identity `1`. То есть не всегда требуется:

```text
φ(1_R) = 1_S
```

Некоторые книги включают это условие в definition of ring homomorphism, особенно когда работают только с rings with unity. Но здесь мы используем convention из Gallian:

> ring homomorphism preserves addition and multiplication; preserving unity is not required unless stated separately.

Это важно для некоторых examples ниже.

## Пример: natural homomorphism `Z -> Z_n`

Для любого positive integer `n` есть mapping:

```text
φ : Z -> Z_n
```

заданный правилом:

```text
φ(k) = k mod n
```

То есть integer отправляется в свой residue modulo `n`.

Например, при `n = 5`:

```text
φ(0) = 0
φ(1) = 1
φ(2) = 2
φ(3) = 3
φ(4) = 4
φ(5) = 0
φ(6) = 1
```

и так далее.

### Почему это ring homomorphism

Нужно проверить две операции.

#### Addition

```text
φ(a + b) = (a + b) mod n
```

А это то же самое, что:

```text
(a mod n) + (b mod n)
```

в `Z_n`.

То есть:

```text
φ(a + b) = φ(a) + φ(b)
```

#### Multiplication

Аналогично:

```text
φ(ab) = ab mod n
```

И это то же самое, что:

```text
(a mod n)(b mod n)
```

в `Z_n`.

Значит:

```text
φ(ab) = φ(a)φ(b)
```

Therefore:

```text
k -> k mod n
```

is a ring homomorphism. Его называют:

```text
natural homomorphism from Z to Z_n
```

## Пример: evaluation map `R[x] -> R`

Рассмотрим polynomial ring:

```text
R[x]
```

то есть polynomials with real coefficients.

Определим mapping:

```text
φ : R[x] -> R
```

по правилу:

```text
φ(f(x)) = f(1)
```

То есть мы берём polynomial и подставляем:

```text
x = 1
```

Например:

```text
f(x) = 3x^2 - 5x + 7
```

Тогда:

```text
φ(f(x)) = f(1) = 3 - 5 + 7 = 5
```

### Почему это ring homomorphism

Evaluation сохраняет addition:

```text
φ(f(x) + g(x))
=
(f + g)(1)
=
f(1) + g(1)
=
φ(f(x)) + φ(g(x))
```

И multiplication:

```text
φ(f(x)g(x))
=
(fg)(1)
=
f(1)g(1)
=
φ(f(x))φ(g(x))
```

Therefore:

```text
f(x) -> f(1)
```

is a ring homomorphism from `R[x]` onto `R`.

### Почему onto

Любое real number `c ∈ R` можно получить как значение constant polynomial:

```text
f(x) = c
```

Тогда:

```text
φ(f(x)) = f(1) = c
```

Значит mapping onto.

## Пример: `φ : Z4 -> Z10`, `φ(x) = 5x`

Теперь пример, где важно помнить, что operations происходят в разных rings.

Определим:

```text
φ : Z4 -> Z10
```

по правилу:

```text
φ(x) = 5x
```

То есть:

```text
0 -> 0
1 -> 5
2 -> 10 ≡ 0
3 -> 15 ≡ 5
```

в `Z10`.

So image is:

```text
{0, 5}
```

### Почему это не очевидно

Может показаться, что addition сохраняется просто потому, что:

```text
5(x + y) = 5x + 5y
```

Но нужно помнить:

* `x + y` слева считается in `Z4`;
* `5x + 5y` справа считается in `Z10`.

То есть мы не можем совсем тупо использовать обычную integer arithmetic и забыть про "модульность".

### Проверяем addition

Пусть:

```text
x + y = 4q + r
```

где:

```text
0 <= r < 4
```

Тогда в `Z4`:

```text
x + y = r
```

Поэтому:

```text
φ(x + y) = φ(r) = 5r
```

Но:

```text
r = x + y - 4q
```

Значит:

```text
5r = 5(x + y - 4q)
```

```text
5r = 5x + 5y - 20q
```

А в `Z10`:

```text
20q ≡ 0
```

потому что `20q` делится на `10`. Следовательно:

```text
φ(x + y) = 5x + 5y = φ(x) + φ(y)
```

в `Z10`.

### Проверяем multiplication

Пусть:

```text
xy = 4q + r
```

где:

```text
0 <= r < 4
```

Тогда в `Z4`:

```text
xy = r
```

Поэтому:

```text
φ(xy) = φ(r) = 5r
```

А так как:

```text
r = xy - 4q
```

получаем:

```text
5r = 5xy - 20q
```

В `Z10` term `20q` исчезает:

```text
20q ≡ 0
```

Значит:

```text
φ(xy) = 5xy
```

С другой стороны:

```text
φ(x)φ(y) = (5x)(5y) = 25xy
```

Но в `Z10`:

```text
25 ≡ 5
```

поэтому:

```text
25xy ≡ 5xy
```

Значит:

```text
φ(xy) = φ(x)φ(y)
```

Таким образом:

```text
φ(x) = 5x
```

is a ring homomorphism from `Z4` to `Z10`.

### Но это не isomorphism

Mapping не one-to-one:

```text
φ(0) = 0
φ(2) = 0
```

и не onto:

```text
image = {0, 5}
```

а:

```text
Z10 = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
```

Поэтому это homomorphism, но не isomorphism.

## Ring homomorphisms `Z12 -> Z30`

Теперь посмотрим на более systematic example. Group homomorphisms:

```text
Z12 -> Z30
```

under addition имеют вид:

```text
x -> ax
```

для некоторых values `a`. Но не каждый additive group homomorphism является ring homomorphism. Чтобы mapping был ring homomorphism, он должен additionally preserve multiplication.

Если:

```text
φ(x) = ax
```

то:

```text
φ(1) = a
```

Так как в `Z12`:

```text
1 · 1 = 1
```

мы должны иметь:

```text
φ(1 · 1) = φ(1)φ(1)
```

То есть:

```text
φ(1) = φ(1)^2
```

А значит:

```text
a = a^2
```

in `Z30`.

Такое условие отсекает часть additive homomorphisms.

## Главная идея

Ring homomorphism stricter than group homomorphism. Он должен сохранить не только addition:

```text
φ(x + y) = φ(x) + φ(y)
```

но и multiplication:

```text
φ(xy) = φ(x)φ(y)
```

Поэтому у ring homomorphisms меньше свободы.

## Characteristic 2 и map `a -> a^2`

Пусть `R` — commutative ring of characteristic `2`.

Это значит:

```text
2x = 0
```

для всех:

```text
x ∈ R
```

То есть:

```text
x + x = 0
```

for every `x`.

Определим mapping:

```text
φ : R -> R
```

по правилу:

```text
φ(a) = a^2
```

Оказывается, это ring homomorphism.

### Проверяем multiplication

```text
φ(ab) = (ab)^2
```

Так как ring commutative:

```text
(ab)^2 = a^2b^2
```

А значит:

```text
φ(ab) = φ(a)φ(b)
```

### Проверяем addition

```text
φ(a + b) = (a + b)^2
```

Раскрываем:

```text
(a + b)^2 = a^2 + 2ab + b^2
```

Но characteristic `2` означает:

```text
2ab = 0
```

Поэтому:

```text
(a + b)^2 = a^2 + b^2
```

Значит:

```text
φ(a + b) = φ(a) + φ(b)
```

Therefore:

```text
a -> a^2
```

is a ring homomorphism in characteristic `2`.

Этот mapping часто называют:

```text
Frobenius map
```

## Почему `2Z` и `Z` не ring-isomorphic

Как additive groups `2Z` и `Z` isomorphic. Например:

```text
φ : Z -> 2Z
```

```text
φ(n) = 2n
```

is a group isomorphism under addition.

Но as rings они не изоморфны. Почему?

`Z` has unity:

```text
1
```

А `2Z` не имеет multiplicative identity.

Если бы у `2Z` была unity `u`, то для любого even integer, например `2`, должно было бы выполняться:

```text
u · 2 = 2
```

В integers это даёт:

```text
u = 1
```

Но:

```text
1 ∉ 2Z
```

Значит unity внутри `2Z` нет. Ring isomorphism preserves ring structure, включая existence of unity as a structural property.

Поэтому:

```text
Z not ≅ 2Z
```

as rings, хотя они isomorphic as additive groups.

## Application: divisibility by 9

Natural homomorphism:

```text
α : Z -> Z9
```

где:

```text
α(n) = n mod 9
```

помогает объяснить школьный признак divisibility by `9`. Пусть integer `n` имеет decimal representation:

```text
n = ak 10^k + a(k-1)10^(k-1) + ... + a1 10 + a0
```

Здесь:

```text
a0, a1, ..., ak
```

— digits числа.

Например:

```text
583 = 5 · 10^2 + 8 · 10 + 3
```

### Почему сумма цифр работает

В `Z9`:

```text
10 ≡ 1 (mod 9)
```

Поэтому:

```text
10^2 ≡ 1
```

```text
10^3 ≡ 1
```

и вообще:

```text
10^m ≡ 1
```

modulo `9`.

Тогда:

```text
n = ak 10^k + ... + a1 10 + a0
```

modulo `9` становится:

```text
n ≡ ak + ... + a1 + a0 (mod 9)
```

То есть number имеет тот же residue modulo `9`, что и сумма его digits.

Поэтому:

```text
n divisible by 9
```

iff:

```text
sum of digits divisible by 9
```

### Пример

Возьмём:

```text
5832
```

Сумма digits:

```text
5 + 8 + 3 + 2 = 18
```

А:

```text
18
```

divisible by `9`.

Значит:

```text
5832
```

divisible by `9`.

И правда:

```text
5832 / 9 = 648
```

## Применение: степени modulo небольших чисел

Natural homomorphisms помогают в number theory proofs, потому что позволяют заменить сложное равенство в integers на более простую проверку modulo какого-то числа.

Например, вместо того чтобы сразу разбирать большое уравнение в `Z`, можно отправить обе стороны в:

```text
Z8
```

или:

```text
Z16
```

и посмотреть, какие residues вообще возможны.

Идея такая:

> если равенство верно в integers, то оно должно остаться верным после reduction modulo `n`.

Поэтому если после перехода modulo `n` получается невозможная ситуация, значит исходное integer equation тоже не имело решения.

Например, если какая-то сторона уравнения всегда даёт residues:

```text
0, 2, 4
```

modulo `8`, а другая сторона всегда даёт:

```text
1, 3, 5
```

то равенство невозможно уже modulo `8`. А значит оно невозможно и в integers.

## Главное предупреждение

Ring homomorphism должен сохранять обе операции:

```text
addition
multiplication
```

То есть должны выполняться оба условия:

```text
φ(a + b) = φ(a) + φ(b)
```

и:

```text
φ(ab) = φ(a)φ(b)
```

Поэтому каждый ring homomorphism автоматически является additive group homomorphism. Но не каждый additive group homomorphism является ring homomorphism.

Причина простая: additive group homomorphism обязан сохранять только addition. А ring homomorphism должен дополнительно сохранять multiplication. Именно multiplication добавляет extra constraints.

## Properties of ring homomorphisms

Пусть:

```text
φ : R -> S
```

— ring homomorphism.

Это значит, что `φ` сохраняет обе операции:

```text
φ(a + b) = φ(a) + φ(b)
```

и:

```text
φ(ab) = φ(a)φ(b)
```

Из этих двух условий следует несколько важных свойств.

### Powers и repeated addition

Если:

```text
r ∈ R
```

и `n` — positive integer, то:

```text
φ(nr) = nφ(r)
```

Здесь:

```text
nr
```

означает repeated addition:

```text
r + r + ... + r
```

`n` раз.

То есть homomorphism сохраняет не только одно сложение, но и любое repeated addition.

Например:

```text
φ(3r)
=
φ(r + r + r)
=
φ(r) + φ(r) + φ(r)
=
3φ(r)
```

Также:

```text
φ(r^n) = φ(r)^n
```

потому что `r^n` означает repeated multiplication:

```text
r · r · ... · r
```

`n` раз.

### Images of subrings

Если `A` — subring of `R`, то image:

```text
φ(A) = {φ(a) | a ∈ A}
```

является subring of `S`. Интуитивно это значит:

> homomorphism переводит меньшие ring-structures в меньшие ring-structures.

Если внутри `R` есть subring, то после применения `φ` его image всё ещё closed under addition, subtraction и multiplication.

### Images of ideals

С ideals чуть осторожнее. Если `A` — ideal of `R`, то image:

```text
φ(A)
```

не всегда автоматически является ideal of `S`.

Но если `φ` is onto, тогда:

```text
φ(A)
```

is an ideal of `S`. Почему нужна onto? Потому что ideal в `S` должен поглощать multiplication by **any element of `S`**.

Если `φ` onto, то каждый элемент `s ∈ S` имеет вид:

```text
s = φ(r)
```

для некоторого `r ∈ R`. Тогда для элемента:

```text
φ(a) ∈ φ(A)
```

получаем:

```text
sφ(a) = φ(r)φ(a) = φ(ra)
```

А так как `A` ideal, то:

```text
ra ∈ A
```

значит:

```text
φ(ra) ∈ φ(A)
```

То есть image действительно поглощает multiplication in `S`.

### Preimages of ideals

Если `B` — ideal of `S`, то preimage:

```text
φ^-1(B) = {r ∈ R | φ(r) ∈ B}
```

является ideal of `R`. Это работает без условия onto. Интуитивно:

> если `B` — ideal в target ring, то все элементы `R`, которые попадают в `B`, образуют ideal в source ring.

Это особенно важно для kernels.

## Kernel of a ring homomorphism

**Kernel / ядро** ring homomorphism — это множество элементов `R`, которые переходят в zero element of `S`.

То есть:

```text
Ker φ = {r ∈ R | φ(r) = 0}
```

Это тот же смысл, что и в group theory:

> kernel показывает, какая часть source ring “схлопывается в ноль”.

### Kernels are ideals

Для любого ring homomorphism:

```text
φ : R -> S
```

kernel:

```text
Ker φ
```

является ideal of `R`. Проверим идею. Если:

```text
a, b ∈ Ker φ
```

то:

```text
φ(a) = 0
```

и:

```text
φ(b) = 0
```

Тогда:

```text
φ(a - b)
=
φ(a) - φ(b)
=
0 - 0
=
0
```

Значит:

```text
a - b ∈ Ker φ
```

Теперь возьмём любой:

```text
r ∈ R
```

и:

```text
a ∈ Ker φ
```

Тогда:

```text
φ(ra)
=
φ(r)φ(a)
=
φ(r) · 0
=
0
```

Значит:

```text
ra ∈ Ker φ
```

Аналогично:

```text
ar ∈ Ker φ
```

Поэтому:

```text
Ker φ
```

is an ideal of `R`.

## First Isomorphism Theorem for rings

Теперь появляется ring-version уже знакомой идеи из group theory.

Пусть:

```text
φ : R -> S
```

— ring homomorphism.

Тогда:

```text
R / Ker φ ≅ φ(R)
```

То есть quotient ring by kernel is isomorphic to the image. Более явно mapping задаётся так:

```text
r + Ker φ -> φ(r)
```

### Что это означает

Homomorphism может склеивать разные элементы `R`. Какие именно элементы он склеивает? Те, которые отличаются на элемент kernel.

Если:

```text
φ(a) = φ(b)
```

то:

```text
φ(a - b) = 0
```

значит:

```text
a - b ∈ Ker φ
```

То есть `a` и `b` лежат в одном coset modulo kernel. Поэтому quotient:

```text
R / Ker φ
```

ровно убирает ту информацию, которую homomorphism потерял. После этого остаётся structure, которая isomorphic to image:

```text
φ(R)
```

### Example: evaluation map `Z[x] -> Z`

Рассмотрим mapping:

```text
φ : Z[x] -> Z
```

заданный правилом:

```text
φ(f(x)) = f(0)
```

То есть мы берём polynomial и подставляем:

```text
x = 0
```

Например:

```text
f(x) = 3x^2 + 5x + 7
```

Тогда:

```text
φ(f(x)) = f(0) = 7
```

### Kernel

Kernel состоит из всех polynomials, которые при `x = 0` дают `0`.

То есть:

```text
Ker φ = {f(x) ∈ Z[x] | f(0) = 0}
```

Это ровно polynomials with zero constant term.

А такие polynomials являются multiples of `x`.

Например:

```text
3x^2 + 5x = x(3x + 5)
```

Поэтому:

```text
Ker φ = <x>
```

### Image

Image равен всему `Z`. Почему? Любой integer `c` можно получить как value constant polynomial:

```text
f(x) = c
```

Тогда:

```text
φ(f(x)) = c
```

Значит:

```text
φ(Z[x]) = Z
```

### Applying First Isomorphism Theorem

По First Isomorphism Theorem:

```text
Z[x] / Ker φ ≅ φ(Z[x])
```

Подставляем:

```text
Ker φ = <x>
```

и:

```text
φ(Z[x]) = Z
```

Получаем:

```text
Z[x] / <x> ≅ Z
```

Это означает:

> если в polynomial ring `Z[x]` мы считаем `x` равным `0`, то от polynomial остаётся только constant term.

## Ideals are kernels

Мы уже знаем:

```text
kernel of ring homomorphism => ideal
```

Но верно и обратное:

> every ideal is the kernel of some ring homomorphism.

Пусть `A` — ideal of ring `R`. Тогда можно построить natural homomorphism:

```text
π : R -> R / A
```

по правилу:

```text
π(r) = r + A
```

То есть каждый элемент ring отправляется в свой coset modulo `A`. Kernel этого mapping:

```text
Ker π
```

состоит из всех `r ∈ R`, для которых:

```text
r + A = A
```

А это значит:

```text
r ∈ A
```

Следовательно:

```text
Ker π = A
```

То есть every ideal действительно является kernel.

## Homomorphism from `Z` to a ring with unity

Пусть `R` — ring with unity `1`. Тогда существует natural ring homomorphism:

```text
φ : Z -> R
```

заданный правилом:

```text
φ(n) = n · 1
```

Здесь:

```text
n · 1
```

означает repeated addition элемента `1`.

Например:

```text
φ(3) = 1 + 1 + 1
```

и:

```text
φ(-2) = -(1 + 1)
```

### Почему это homomorphism

Addition сохраняется:

```text
φ(m + n)
=
(m + n) · 1
=
m · 1 + n · 1
=
φ(m) + φ(n)
```

Multiplication тоже сохраняется:

```text
φ(mn)
=
(mn) · 1
```

А:

```text
(m · 1)(n · 1) = (mn) · 1
```

поэтому:

```text
φ(mn) = φ(m)φ(n)
```

### A ring with unity contains `Z` or `Z_n`

Это даёт важное следствие. Если `R` — ring with unity, то внутри него всегда есть subring, порождённый элементом `1`. Это множество:

```text
S = {k · 1 | k ∈ Z}
```

То есть мы просто складываем `1` с самим собой разное количество раз.

### Если characteristic равна `0`

Если `1` имеет infinite additive order, то все элементы:

```text
0 · 1, 1 · 1, 2 · 1, 3 · 1, ...
```

ведут себя как integers.

Тогда `R` содержит subring isomorphic to:

```text
Z
```

### Если characteristic равна `n`

Если:

```text
n · 1 = 0
```

и `n` — минимальное такое positive число, то `R` содержит subring isomorphic to:

```text
Z_n
```

Например, в ring characteristic `5`:

```text
5 · 1 = 0
```

поэтому repeated addition of `1` даёт copy of `Z5`.

## Fields contain `Z_p` or `Q`

Для fields есть ещё более сильное утверждение. Если `F` — field of characteristic `p`, где `p` prime, то `F` содержит subfield isomorphic to:

```text
Z_p
```

Если `F` — field of characteristic `0`, то `F` содержит subfield isomorphic to:

```text
Q
```

Этот smallest subfield называется:

```text
prime subfield
```

То есть prime subfield field `F` — это минимальное поле, которое уже обязательно сидит внутри `F`.

## Examples

Field:

```text
R
```

имеет characteristic `0`, поэтому содержит copy of:

```text
Q
```

Field:

```text
C
```

тоже имеет characteristic `0`, поэтому тоже содержит copy of:

```text
Q
```

Finite field:

```text
Z_p
```

имеет characteristic `p`, и его prime subfield is itself:

```text
Z_p
```

## Field of quotients

Теперь важная construction. Integers:

```text
Z
```

не являются field, потому что, например:

```text
1/2 not in Z
```

Но `Z` сидит внутри field:

```text
Q
```

Rational numbers можно понимать как fractions:

```text
a / b
```

где:

```text
a, b ∈ Z
```

и:

```text
b != 0
```

То есть мы расширяем `Z`, добавляя formal quotients. Оказывается, то же самое можно сделать для любого integral domain.

### Field of quotients of an integral domain

Пусть `D` — integral domain. Тогда существует field `F`, которое содержит copy of `D`. Это field называется:

```text
field of quotients of D
```

или:

```text
field of fractions of D
```

Идея:

> из элементов `D` строим fractions `a / b`, где `b != 0`.

### Почему нужен integral domain

Чтобы fractions нормально умножались, нужно, чтобы product ненулевых denominators не становился `0`.

Если:

```text
b != 0
```

и:

```text
d != 0
```

то при multiplication fractions denominator будет:

```text
bd
```

В integral domain нет zero divisors, поэтому:

```text
bd != 0
```

Значит denominator остаётся valid. Если бы zero divisors были, multiplication fractions могла бы сломаться.

### Как складываются и умножаются fractions

Elements field of quotients имеют вид:

```text
a / b
```

где:

```text
a, b ∈ D
```

и:

```text
b != 0
```

Addition задаётся привычно:

```text
a/b + c/d = (ad + bc)/(bd)
```

Multiplication:

```text
(a/b)(c/d) = (ac)/(bd)
```

Это ровно те же formulas, что для rational numbers.

### Почему fractions имеют много representations

Один и тот же элемент может быть записан по-разному. В rational numbers:

```text
1/2 = 2/4 = 3/6
```

Поэтому в general field of quotients мы считаем:

```text
a/b = c/d
```

если:

```text
ad = bc
```

Это обычное cross-multiplication.

Например, в `Z`:

```text
1/2 = 3/6
```

потому что:

```text
1 · 6 = 2 · 3
```

### Embedding `D` into its field of quotients

Каждый элемент `x ∈ D` можно вложить в field of quotients как:

```text
x / 1
```

То есть mapping:

```text
D -> F
```

задаётся так:

```text
x -> x / 1
```

Это ring homomorphism and actually embeds `D` into `F`. Поэтому мы можем думать, что `D` сидит внутри своего field of quotients.

Например:

```text
Z
```

сидит внутри:

```text
Q
```

через:

```text
n -> n / 1
```

### Example: field of quotients of `Z[x]`

Рассмотрим:

```text
D = Z[x]
```

Это integral domain. Его field of quotients состоит из fractions:

```text
f(x) / g(x)
```

где:

```text
f(x), g(x) ∈ Z[x]
```

и:

```text
g(x) != 0
```

Например:

```text
(x^2 + 1) / (3x - 5)
```

или:

```text
(2x + 7) / (x^3 + 4)
```

Это rational functions with integer polynomial numerator and denominator.

### Пример: `Z_p(x)`

Если `p` — prime, то:

```text
Z_p[x]
```

является integral domain.

Его field of quotients обозначают так:

```text
Z_p(x)
```

Элементы этого field выглядят как fractions из polynomials:

```text
f(x) / g(x)
```

где:

```text
f(x), g(x) ∈ Z_p[x]
```

и:

```text
g(x) != 0
```

То есть numerator и denominator — polynomials с coefficients modulo `p`.

Это infinite field of characteristic `p`.

Хотя сам field:

```text
Z_p
```

конечный, field:

```text
Z_p(x)
```

бесконечный, потому что polynomials in `x` бесконечно много.