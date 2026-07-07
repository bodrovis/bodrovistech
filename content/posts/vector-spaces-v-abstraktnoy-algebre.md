---
title: "Vector Spaces over Fields: базовый язык для extension fields"
draft: false
meta_desc: "Понятное введение в vector spaces over fields: vectors, scalars, subspaces, linear combinations, span, linear independence, basis и dimension."
date: 2026-07-07T12:00:00
tags:
- абстрактная алгебра
- cs
---

Мы уже прошли две большие части abstract algebra: groups и rings. Теперь переходим к fields. Но чтобы нормально говорить про fields глубже, особенно про:

```text
extension fields
finite fields
F_(p^n)
```

нужен язык vector spaces.

На первый взгляд vector spaces — это тема из linear algebra. Но здесь они нужны не ради геометрии со стрелочками, а как инструмент для понимания fields.

Главная идея будет такая:

> большое field можно рассматривать как vector space над меньшим field.

Например, complex numbers:

```text
C
```

можно рассматривать как vector space over:

```text
R
```

потому что каждый complex number имеет вид:

```text
a + bi
```

где:

```text
a, b ∈ R
```

То есть `C` устроено как “двумерное пространство” над `R`.

Позже такая же идея появится для finite fields:

```text
F_(p^n)
```

как vector space dimension `n` over:

```text
F_p
```

## Vector space

Пусть `F` — field.

A **vector space over `F`** — это set `V`, где есть две операции:

```text
vector addition
```

и:

```text
scalar multiplication
```

Elements of `V` называются:

```text
vectors
```

Elements of field `F` называются:

```text
scalars
```

То есть vectors живут в `V`, а scalars живут в `F`.

### Что должно выполняться

`V` должно быть Abelian group under addition.

То есть vectors можно складывать:

```text
u + v
```

и при этом работают обычные свойства:

```text
u + v = v + u
```

```text
(u + v) + w = u + (v + w)
```

есть zero vector:

```text
0
```

и у каждого vector есть additive inverse:

```text
-v
```

Но кроме addition есть ещё scalar multiplication.

Если:

```text
a ∈ F
```

и:

```text
v ∈ V
```

то можно умножить scalar на vector:

```text
av ∈ V
```

## Axioms of scalar multiplication

Для всех scalars:

```text
a, b ∈ F
```

и всех vectors:

```text
u, v ∈ V
```

должны выполняться свойства:

```text
a(v + u) = av + au
```

Scalar multiplication distributes over vector addition.

То есть scalar можно “разнести” по сумме vectors.

---

```text
(a + b)v = av + bv
```

Addition scalars тоже distributes over vector.

То есть если scalar сам является суммой, его можно разнести.

---

```text
a(bv) = (ab)v
```

Если сначала умножить vector на `b`, а потом на `a`, это то же самое, что умножить vector на product scalars `ab`.

---

```text
1v = v
```

Unity field действует на vector как identity.

### Простая интуиция

Vector space — это место, где можно:

1. складывать vectors;
2. умножать vectors на scalars;
3. делать это совместимо с arithmetic field `F`.

То есть vector space — это не обязательно “стрелочки на плоскости”.

Vector может быть:

```text
tuple
matrix
polynomial
complex number
field element
```

Главное, чтобы addition и scalar multiplication работали правильно.

### Example: `R^n` over `R`

Классический пример:

```text
R^n = {(a1, a2, ..., an) | ai ∈ R}
```

Это vector space over:

```text
R
```

Elements выглядят как tuples:

```text
(a1, a2, ..., an)
```

Addition делается coordinatewise:

```text
(a1, a2, ..., an) + (b1, b2, ..., bn)
=
(a1 + b1, a2 + b2, ..., an + bn)
```

Scalar multiplication тоже coordinatewise:

```text
c(a1, a2, ..., an)
=
(ca1, ca2, ..., can)
```

Например, в `R^3`:

```text
(1, 2, 3) + (4, 5, 6) = (5, 7, 9)
```

и:

```text
2(1, 2, 3) = (2, 4, 6)
```

### Example: matrices as vector space

Рассмотрим:

```text
M_2(Q)
```

Это set всех `2 × 2` matrices with entries from `Q`.

Элемент выглядит так:

```text
[a1  a2]
[a3  a4]
```

где:

```text
a1, a2, a3, a4 ∈ Q
```

Это vector space over:

```text
Q
```

Addition делается entrywise:

```text
[a1  a2] + [b1  b2] = [a1 + b1   a2 + b2]
[a3  a4]   [b3  b4]   [a3 + b3   a4 + b4]
```

Scalar multiplication тоже entrywise:

```text
c [a1  a2] = [ca1  ca2]
  [a3  a4]   [ca3  ca4]
```

Здесь matrices — это vectors, а rational numbers — scalars.

Важно: matrix multiplication здесь не нужна для vector space structure. Нам достаточно matrix addition и scalar multiplication.

### Example: `Z_p[x]` over `Z_p`

Пусть `p` — prime.

Тогда:

```text
Z_p
```

is a field.

Polynomial ring:

```text
Z_p[x]
```

можно рассматривать как vector space over:

```text
Z_p
```

Vectors здесь — polynomials:

```text
a_nx^n + ... + a_1x + a_0
```

Scalars — elements of:

```text
Z_p
```

То есть:

```text
0, 1, ..., p - 1
```

Addition polynomials — обычное polynomial addition modulo `p`.

Scalar multiplication — умножение всех coefficients на scalar modulo `p`.

Например, в `Z_3[x]`:

```text
2(x^2 + 2x + 1)
=
2x^2 + 4x + 2
=
2x^2 + x + 2
```

because:

```text
4 ≡ 1 (mod 3)
```

### Example: `C` as vector space over `R`

Complex numbers:

```text
C = {a + bi | a, b ∈ R}
```

form a vector space over:

```text
R
```

Vectors здесь — complex numbers. Scalars — real numbers.

Addition обычное:

```text
(a + bi) + (c + di)
=
(a + c) + (b + d)i
```

Scalar multiplication тоже обычное:

```text
r(a + bi)
=
ra + rbi
```

где:

```text
r ∈ R
```

Например:

```text
2(3 + 5i) = 6 + 10i
```

Главная идея:

> over `R`, every complex number is a linear combination of `1` and `i`.

То есть:

```text
a + bi = a · 1 + b · i
```

Это потом станет моделью для extension fields.

## Field as vector space over subfield

Самый важный пример для нас:

Пусть `E` — field, а `F` — subfield of `E`. Тогда `E` можно рассматривать как vector space over `F`. Почему?

Elements of `E` будут vectors. Elements of `F` будут scalars. Addition берётся из field `E`. Scalar multiplication тоже берётся из multiplication in `E`.

То есть если:

```text
a ∈ F
```

и:

```text
v ∈ E
```

то произведение:

```text
av
```

already defined in `E`.

### Почему это важно

Это главный мост к extension fields.

Если:

```text
F ⊆ E
```

то можно спрашивать:

> какая dimension у `E` как vector space over `F`?

Например:

```text
C
```

is vector space over:

```text
R
```

with basis:

```text
1, i
```

и dimension:

```text
2
```

Позже мы будем писать это так:

```text
[C : R] = 2
```

Для finite fields будет аналогично:

```text
[F_(p^n) : F_p] = n
```

То есть field with `p^n` elements is `n`-dimensional vector space over `F_p`.

## Subspace

Теперь аналог subgroup и subring.

Пусть `V` — vector space over field `F`.

Subset:

```text
U ⊆ V
```

называется **subspace / подпространством**, если `U` itself is a vector space over `F` under the same operations.

То есть `U` должно быть stable under:

```text
addition
scalar multiplication
```

Если взять two vectors from `U`, их сумма должна остаться in `U`. Если взять vector from `U` и scalar from `F`, результат тоже должен остаться in `U`.

### Example: polynomials of degree at most `2`

Рассмотрим vector space всех real polynomials:

```text
R[x]
```

over:

```text
R
```

Теперь возьмём subset polynomials degree at most `2`:

```text
U = {a2x^2 + a1x + a0 | a0, a1, a2 ∈ R}
```

Это subspace.

Почему?

Если сложить два polynomials degree at most `2`, результат всё ещё имеет degree at most `2`.

Например:

```text
(2x^2 + x + 1) + (5x^2 - 3)
=
7x^2 + x - 2
```

Всё ещё degree at most `2`.

Если умножить такой polynomial на scalar:

```text
3(2x^2 + x + 1)
=
6x^2 + 3x + 3
```

результат тоже degree at most `2`. Значит subset closed under addition and scalar multiplication. Поэтому это subspace.

## Linear combination

Пусть:

```text
v1, v2, ..., vn ∈ V
```

A **linear combination / линейная комбинация** этих vectors — это expression вида:

```text
a1v1 + a2v2 + ... + anvn
```

где coefficients:

```text
a1, a2, ..., an ∈ F
```

То есть мы берём vectors, умножаем их на scalars, а потом складываем.

### Простой пример в `R^2`

Возьмём vectors:

```text
v1 = (1, 0)
```

и:

```text
v2 = (0, 1)
```

Тогда:

```text
3v1 + 5v2
```

равно:

```text
3(1, 0) + 5(0, 1)
=
(3, 0) + (0, 5)
=
(3, 5)
```

То есть vector:

```text
(3, 5)
```

is a linear combination of `v1` and `v2`.

## Span

Пусть:

```text
v1, v2, ..., vn ∈ V
```

Set всех linear combinations:

```text
a1v1 + a2v2 + ... + anvn
```

называется **span** этих vectors.

Обозначение:

```text
<v1, v2, ..., vn>
```

или иногда:

```text
span(v1, v2, ..., vn)
```

То есть:

```text
<v1, v2, ..., vn>
=
{a1v1 + a2v2 + ... + anvn | a1, a2, ..., an ∈ F}
```

Это subspace of `V`.

### Что значит “vectors span `V`”

Если:

```text
<v1, v2, ..., vn> = V
```

то говорят, что vectors:

```text
v1, v2, ..., vn
```

**span `V`**.

То есть каждый vector in `V` можно собрать as linear combination of these vectors.

Например, в `R^2` vectors:

```text
(1, 0)
```

и:

```text
(0, 1)
```

span all of `R^2`, потому что любой vector:

```text
(a, b)
```

можно записать как:

```text
a(1, 0) + b(0, 1)
```

### Почему span важен для fields

Когда мы рассматриваем extension field `E` over subfield `F`, мы часто хотим понять:

> можно ли выразить every element of `E` через несколько special elements?

Например, в `C` over `R`:

```text
C = <1, i>
```

because every complex number:

```text
a + bi
```

can be written as:

```text
a · 1 + b · i
```

Позже для quotient fields вида:

```text
F[x] / <p(x)>
```

где `deg p = n`, elements будут выражаться через:

```text
1, α, α^2, ..., α^(n-1)
```

То есть:

```text
F(α) = <1, α, α^2, ..., α^(n-1)>
```

as vector space over `F`.

Вот зачем нам vector spaces.

## Linear independence

Теперь вводим одну из главных идей vector spaces:

```text
linear independence
```

или:

```text
linear dependence
```

Интуитивно:

> vectors linearly independent, если ни один из них не является лишним.

То есть нельзя собрать один vector из остальных через linear combination.

### Linearly dependent vectors

Пусть:

```text
v1, v2, ..., vn
```

are vectors in vector space `V` over field `F`.

Они называются **linearly dependent / линейно зависимыми**, если существуют scalars:

```text
a1, a2, ..., an ∈ F
```

not all zero, такие что:

```text
a1v1 + a2v2 + ... + anvn = 0
```

Ключевая часть:

```text
not all zero
```

Потому что trivial combination всегда даёт zero:

```text
0v1 + 0v2 + ... + 0vn = 0
```

Это ничего не доказывает.

Linearly dependent means: есть **nontrivial linear combination**, которая даёт zero vector.

### Linearly independent vectors

Vectors называются **linearly independent / линейно независимыми**, если такой nontrivial combination нет.

То есть equality:

```text
a1v1 + a2v2 + ... + anvn = 0
```

возможна только в trivial case:

```text
a1 = a2 = ... = an = 0
```

Главная мысль:

> linearly independent vectors не содержат лишнего vector, который можно выразить через остальные.

### Пример в `R^3`

Рассмотрим vectors:

```text
v1 = (1, 0, 0)
```

```text
v2 = (1, 0, 1)
```

```text
v3 = (1, 1, 1)
```

Проверим, являются ли они linearly independent over `R`.

Допустим:

```text
a(1, 0, 0) + b(1, 0, 1) + c(1, 1, 1) = (0, 0, 0)
```

Складываем coordinatewise:

```text
(a + b + c, c, b + c) = (0, 0, 0)
```

Значит:

```text
a + b + c = 0
```

```text
c = 0
```

```text
b + c = 0
```

Из второго equation:

```text
c = 0
```

Тогда из третьего:

```text
b + 0 = 0
```

то есть:

```text
b = 0
```

Тогда из первого:

```text
a + 0 + 0 = 0
```

то есть:

```text
a = 0
```

Получили only trivial solution:

```text
a = b = c = 0
```

Значит vectors linearly independent.

## Basis

Теперь самое важное practical понятие.

**Basis / базис** vector space `V` over field `F` — это subset `B`, который выполняет два условия:

1. `B` linearly independent;
2. every element of `V` is a linear combination of elements of `B`.

То есть basis одновременно:

```text
spans V
```

и:

```text
has no redundant vectors
```

### Почему basis важен

Basis даёт coordinate system для vector space.

Если `B` — basis, то every vector in `V` can be written as linear combination of basis vectors.

Причём representation unique.

То есть если:

```text
B = {v1, v2, ..., vn}
```

то каждый vector `v ∈ V` можно записать как:

```text
v = a1v1 + a2v2 + ... + anvn
```

и coefficients:

```text
a1, a2, ..., an
```

определены uniquely.

### Example: standard basis in `R^2`

В `R^2` standard basis:

```text
e1 = (1, 0)
```

```text
e2 = (0, 1)
```

Любой vector:

```text
(a, b)
```

можно записать как:

```text
(a, b) = a(1, 0) + b(0, 1)
```

То есть:

```text
{(1, 0), (0, 1)}
```

spans `R^2`.

И эти vectors linearly independent, потому что:

```text
a(1, 0) + b(0, 1) = (0, 0)
```

means:

```text
(a, b) = (0, 0)
```

so:

```text
a = 0
b = 0
```

Значит это basis.

## Example: matrix vector space

Рассмотрим vector space:

```text
V = { [a     a + b]
      [a + b   b] | a, b ∈ R }
```

Это set matrices специального вида.

Claim: следующий set является basis for `V` over `R`:

```text
B =
{
  [1  1]
  [1  0],

  [0  1]
  [1  1]
}
```

Обозначим:

```text
M1 = [1  1]
     [1  0]
```

и:

```text
M2 = [0  1]
     [1  1]
```

### Проверяем linear independence

Допустим:

```text
aM1 + bM2 = 0
```

То есть:

```text
a [1  1] + b [0  1] = [0  0]
  [1  0]     [1  1]   [0  0]
```

Получаем:

```text
[a      a + b] = [0  0]
[a + b  b    ]   [0  0]
```

Значит:

```text
a = 0
```

и:

```text
b = 0
```

So only trivial linear combination gives zero.

Therefore:

```text
M1, M2
```

are linearly independent.

### Проверяем span

Every element of `V` имеет вид:

```text
[a      a + b]
[a + b  b    ]
```

Но его можно записать так:

```text
[a      a + b] = a [1  1] + b [0  1]
[a + b  b    ]     [1  0]     [1  1]
```

То есть every matrix in `V` is a linear combination of `M1` and `M2`.

Значит:

```text
B = {M1, M2}
```

spans `V`.

И так как `B` одновременно spans `V` и linearly independent, это basis.

## Invariance of basis size

Теперь main theorem этой части:

> если vector space имеет two finite bases, then these bases have same number of elements.

То есть если:

```text
{u1, u2, ..., um}
```

и:

```text
{w1, w2, ..., wn}
```

оба являются bases of `V` over `F`, то:

```text
m = n
```

Это называется:

```text
invariance of basis size
```

### Почему это важно

Без этой theorem слово “dimension” не имело бы смысла.

Мы хотим сказать:

```text
R^2 has dimension 2
```

потому что у него basis из двух elements.

Но если бы у одного и того же vector space мог быть basis из двух vectors и другой basis из пяти vectors, dimension была бы ambiguous.

Theorem говорит: такого не бывает.

All bases of a finite-dimensional vector space have the same size.

## Dimension

**Dimension / размерность** vector space — это number of elements in a basis.

Если vector space has basis with `n` elements, then:

```text
dim V = n
```

или, если нужно указать field:

```text
dim_F V = n
```

### Examples

Для:

```text
R^2
```

standard basis:

```text
(1, 0), (0, 1)
```

has `2` elements.

Значит:

```text
dim_R R^2 = 2
```

---

Для:

```text
R^3
```

standard basis:

```text
(1, 0, 0), (0, 1, 0), (0, 0, 1)
```

has `3` elements.

Значит:

```text
dim_R R^3 = 3
```

---

Для complex numbers over real numbers:

```text
C
```

basis over `R`:

```text
{1, i}
```

because every complex number has form:

```text
a + bi = a · 1 + b · i
```

Значит:

```text
dim_R C = 2
```

## Dimension of the zero vector space

Trivial vector space:

```text
{0}
```

has dimension:

```text
0
```

Почему?

В нём нет nonzero directions.

Его basis считается empty set:

```text
∅
```

Это может выглядеть странно, но логика такая:

- empty set linearly independent;
- span of empty set gives only zero vector.

Therefore:

```text
dim {0} = 0
```

## Finite-dimensional and infinite-dimensional

Vector space называется **finite-dimensional / конечномерным**, если у него есть finite basis.

Например:

```text
R^2
R^3
C over R
M_2(Q) over Q
```

are finite-dimensional.

Vector space называется **infinite-dimensional / бесконечномерным**, если finite basis does not exist.

Например:

```text
R[x]
```

over `R` is infinite-dimensional.

Почему?

Basis можно взять:

```text
1, x, x^2, x^3, ...
```

Чтобы получить all polynomials, нужны powers of `x` arbitrarily high degree.

No finite list of polynomials can span all of `R[x]`.

### Почему dimension важна для fields

Для нас самая важная notation будет:

```text
[E : F]
```

Это degree of field extension.

Но по смыслу:

```text
[E : F] = dim_F E
```

То есть это dimension of `E` as vector space over `F`.

Например:

```text
[C : R] = 2
```

because:

```text
C = <1, i>
```

over `R`.

Позже для finite fields:

```text
[F_(p^n) : F_p] = n
```

То есть finite field with `p^n` elements is `n`-dimensional vector space over its prime field `F_p`.