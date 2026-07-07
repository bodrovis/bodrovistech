---
title: "Extension Fields: как добавить корень polynomial к field"
draft: false
meta_desc: "Разбираем extension fields и splitting fields: uniqueness, formal derivative, multiple zeros, perfect fields и поведение irreducible polynomials над finite fields."
date: 2026-07-07T13:00:00
tags:
- абстрактная алгебра
- cs
---

Мы уже несколько раз встречали fields, построенные через quotient rings:

```text
Z_3[x] / <x^2 + 1>
```

и:

```text
R[x] / <x^2 + 1>
```

Первое даёт field with `9` elements.

Второе is isomorphic to complex numbers:

```text
C
```

Теперь мы начинаем разбирать это системно.

Главная идея главы:

> если polynomial не имеет root в исходном field, можно построить larger field, где root уже появится.

Например, polynomial:

```text
x^2 + 1
```

не имеет root в:

```text
R
```

Но если добавить элемент `i`, для которого:

```text
i^2 + 1 = 0
```

мы получаем complex numbers:

```text
C = R(i)
```

То есть `C` — это extension field of `R`.

## Extension field

Пусть:

```text
F
```

и:

```text
E
```

are fields.

Field `E` называется **extension field / полем расширения** field `F`, если:

```text
F ⊆ E
```

и operations в `F` совпадают с operations, inherited from `E`.

То есть `F` sits inside `E` как subfield.

Примеры:

```text
R ⊆ C
```

поэтому `C` is an extension field of `R`.

Также:

```text
Q ⊆ R ⊆ C
```

поэтому `R` and `C` are extension fields of `Q`.

## Зачем нужны extension fields

Главная мотивация — roots of polynomials.

Polynomial:

```text
x^2 + 1
```

не имеет root in `R`.

Но он имеет root in `C`:

```text
i
```

because:

```text
i^2 + 1 = 0
```

То есть мы расширили field `R` до field `C`, чтобы polynomial получил zero.

В abstract algebra хочется делать это не только для `R` and `C`, а для любого field и любого nonconstant polynomial.

## Fundamental Theorem of Field Theory

Пусть `F` — field, и пусть:

```text
f(x) ∈ F[x]
```

is a nonconstant polynomial.

Then there exists an extension field `E` of `F` in which `f(x)` has a zero.

То есть можно построить larger field:

```text
F ⊆ E
```

и найти element:

```text
α ∈ E
```

такой что:

```text
f(α) = 0
```

Это theorem часто называют:

```text
Kronecker's theorem
```

### Как это работает

Идея уже знакомая:

1. Берём irreducible factor `p(x)` polynomial `f(x)`.
2. Строим quotient field:

```text
F[x] / <p(x)>
```

3. В этом quotient field element:

```text
α = x + <p(x)>
```

behaves like a root of `p(x)`.

Почему?

Потому что в quotient:

```text
p(x) = 0
```

То есть:

```text
p(α) = 0
```

А если `p(x)` divides `f(x)`, то:

```text
f(α) = 0
```

тоже.

### Example: adding a root of `x^2 + 1` over `Q`

Рассмотрим:

```text
f(x) = x^2 + 1 ∈ Q[x]
```

Over `Q` этот polynomial не имеет root.

Но мы можем построить field:

```text
E = Q[x] / <x^2 + 1>
```

В этом field элементами являются cosets:

```text
g(x) + <x^2 + 1>
```

Но every element можно привести к виду:

```text
a + bx + <x^2 + 1>
```

где:

```text
a, b ∈ Q
```

Потому что при division by `x^2 + 1` remainder has degree less than `2`.

#### Новый элемент `α`

Обозначим:

```text
α = x + <x^2 + 1>
```

Тогда в quotient field:

```text
α^2 + 1 = 0
```

Проверим:

```text
α^2 + 1
=
(x + <x^2 + 1>)^2 + 1
```

```text
=
x^2 + 1 + <x^2 + 1>
```

Но:

```text
x^2 + 1 ∈ <x^2 + 1>
```

поэтому:

```text
x^2 + 1 + <x^2 + 1> = 0 + <x^2 + 1>
```

Значит:

```text
α^2 + 1 = 0
```

То есть `α` is a zero of:

```text
x^2 + 1
```

inside the extension field `E`.

### Почему это похоже на complex numbers

В complex numbers есть element:

```text
i
```

такой что:

```text
i^2 + 1 = 0
```

В quotient field:

```text
Q[x] / <x^2 + 1>
```

есть element:

```text
α = x + <x^2 + 1>
```

такой что:

```text
α^2 + 1 = 0
```

То есть `α` behaves like `i`.

Но важный момент:

> мы построили field with a root of `x^2 + 1`, используя только rational numbers.

Нам не нужно заранее знать complex numbers.

Мы сами создали field, где нужный root существует.

### Example over `Z_3`

Рассмотрим polynomial:

```text
f(x) = x^5 + 2x^2 + 2x + 2 ∈ Z_3[x]
```

Over `Z_3` он раскладывается так:

```text
f(x) = (x^2 + 1)(x^3 + 2x + 2)
```

Оба factors irreducible over `Z_3`.

Чтобы построить extension field, где `f(x)` has a zero, можно взять quotient по любому irreducible factor.

#### First option

Берём:

```text
E = Z_3[x] / <x^2 + 1>
```

Так как:

```text
x^2 + 1
```

irreducible over `Z_3`, quotient is a field.

В этом field element:

```text
α = x + <x^2 + 1>
```

satisfies:

```text
α^2 + 1 = 0
```

А так как `x^2 + 1` divides `f(x)`, получаем:

```text
f(α) = 0
```

То есть `α` is a root of `f(x)` in `E`.

Поскольку `x^2 + 1` has degree `2`, every element of `E` has form:

```text
a + bα
```

where:

```text
a, b ∈ Z_3
```

Всего вариантов:

```text
3^2 = 9
```

Значит `E` is a field with `9` elements.

#### Second option

Можно взять другой irreducible factor:

```text
E = Z_3[x] / <x^3 + 2x + 2>
```

Тогда новый element:

```text
β = x + <x^3 + 2x + 2>
```

satisfies:

```text
β^3 + 2β + 2 = 0
```

И так как:

```text
x^3 + 2x + 2
```

divides `f(x)`, получаем:

```text
f(β) = 0
```

Здесь degree factor равна `3`, поэтому every element has form:

```text
a + bβ + cβ^2
```

where:

```text
a, b, c ∈ Z_3
```

Всего elements:

```text
3^3 = 27
```

So this gives a field with `27` elements.
### Почему integral domain достаточно

Theorem выше сформулирована для fields, но похожая идея работает и для integral domains.

Если coefficients polynomial лежат в integral domain `D`, то `D` можно вложить в его field of quotients.

Например:

```text
Z
```

лежит внутри:

```text
Q
```

Значит polynomial над `D` можно рассматривать уже над field, а там построить нужное extension field.

Поэтому любой nonconstant polynomial с coefficients in integral domain имеет root в каком-то field, содержащем этот domain.

---

### Почему это не работает для произвольных rings

Для arbitrary commutative rings всё может сломаться.

Пример:

```text
f(x) = 2x + 1 ∈ Z_4[x]
```

Claim: у этого polynomial нет root ни в каком ring, содержащем `Z_4` как subring.

Почему?

Допустим, есть ring, содержащий `Z_4`, и в нём есть element:

```text
β
```

такой что:

```text
2β + 1 = 0
```

Умножим обе стороны на `2`:

```text
2(2β + 1) = 2 · 0
```

Получаем:

```text
4β + 2 = 0
```

Но в любом ring, содержащем `Z_4`, выполняется:

```text
4 = 0
```

поэтому:

```text
4β = 0
```

и остаётся:

```text
2 = 0
```

Но в `Z_4`:

```text
2 != 0
```

Получили contradiction.

Значит такого root быть не может.

Главная проблема в том, что `Z_4` не integral domain. В нём есть zero divisors, поэтому логика с embedding into a field здесь уже не работает.

## Splitting fields

До сих пор мы строили extension field, где polynomial получает хотя бы один root.

Но часто хочется большего:

> найти field, где polynomial полностью раскладывается into linear factors.

То есть не просто один root, а все roots.

Так появляется понятие:

```text
splitting field
```

### Example: `x^2 + 1` over `Q`

Вернёмся к:

```text
Q[x] / <x^2 + 1>
```

Обозначим:

```text
α = x + <x^2 + 1>
```

Тогда:

```text
α^2 + 1 = 0
```

то есть:

```text
α^2 = -1
```

Значит `α` ведёт себя как square root of `-1`.

У polynomial:

```text
x^2 + 1
```

в этом extension field есть два roots:

```text
α
```

и:

```text
-α
```

Поэтому:

```text
x^2 + 1 = (x - α)(x + α)
```

Проверим:

```text
(x - α)(x + α) = x^2 - α^2
```

Но:

```text
α^2 = -1
```

значит:

```text
x^2 - α^2 = x^2 - (-1) = x^2 + 1
```

То есть в field:

```text
Q[x] / <x^2 + 1>
```

polynomial:

```text
x^2 + 1
```

полностью раскладывается into linear factors.

### What does “splits” mean?

Пусть:

```text
f(x) ∈ F[x]
```

и `E` — extension field of `F`.

Говорят, что `f(x)` **splits in `E`**, если в `E[x]` polynomial можно записать как product linear factors:

```text
f(x) = a(x - a1)(x - a2)...(x - an)
```

где:

```text
a ∈ F
```

и:

```text
a1, a2, ..., an ∈ E
```

То есть все roots polynomial лежат в `E`.

### Определение

Field `E` называется **splitting field / полем разложения** polynomial `f(x)` over `F`, если выполняются две вещи:

1. `f(x)` splits in `E`;
2. `E` — smallest field over `F`, в котором это происходит.

Если roots polynomial:

```text
a1, a2, ..., an
```

то splitting field записывают как:

```text
E = F(a1, a2, ..., an)
```

Это означает:

> smallest subfield, containing `F` and all roots `a1, a2, ..., an`.

То есть мы добавляем к `F` ровно те elements, которые нужны, чтобы polynomial полностью разложился.

### Что значит `F(a1, a2, ..., an)`

Запись:

```text
F(a1, a2, ..., an)
```

означает smallest field, containing:

```text
F
```

and:

```text
a1, a2, ..., an
```

Например:

```text
Q(i)
```

это smallest field, containing `Q` and `i`.

Его elements имеют вид:

```text
a + bi
```

где:

```text
a, b ∈ Q
```

То есть:

```text
Q(i) = {a + bi | a, b ∈ Q}
```

А:

```text
Q(√2)
```

это smallest field, containing `Q` and `√2`:

```text
Q(√2) = {a + b√2 | a, b ∈ Q}
```

### Splitting field depends on the base field

Важно: splitting field depends not only on polynomial, but also on base field.

Нельзя просто сказать:

```text
E is the splitting field of f(x)
```

Нужно сказать:

```text
E is the splitting field of f(x) over F
```

Потому что один и тот же polynomial может требовать different extension fields over different base fields.

### Пример: `x^2 + 1`

Рассмотрим:

```text
f(x) = x^2 + 1
```

Над полем:

```text
Q
```

полем разложения будет:

```text
Q(i)
```

потому что корни:

```text
i
```

и:

```text
-i
```

не лежат в `Q`, но лежат в `Q(i)`.

Над полем:

```text
R
```

полем разложения будет:

```text
C
```

потому что `i` и `-i` лежат в `C`.

А над полем:

```text
C
```

полем разложения будет просто:

```text
C
```

потому что polynomial уже раскладывается там на linear factors:

```text
x^2 + 1 = (x - i)(x + i)
```

### Пример: `x^2 - 2`

Polynomial:

```text
x^2 - 2
```

имеет корни:

```text
√2
```

и:

```text
-√2
```

Над полем:

```text
Q
```

полем разложения будет:

```text
Q(√2)
```

потому что `√2` не является rational number.

А над полем:

```text
R
```

этот polynomial уже раскладывается:

```text
x^2 - 2 = (x - √2)(x + √2)
```

поэтому поле разложения над `R` — это просто:

```text
R
```

Вот почему base field важен: один и тот же polynomial может требовать расширения над `Q`, но уже полностью раскладываться над `R` или `C`.

## Скобки и квадратные скобки: `Q(√2)` и `Z[√2]`

Здесь появляется важная деталь notation.

Мы уже писали:

```text
Z[√2] = {a + b√2 | a, b ∈ Z}
```

Это ring.

А вот:

```text
Q(√2) = {a + b√2 | a, b ∈ Q}
```

это уже field.

Разница не только в скобках, но и в коэффициентах.

В:

```text
Z[√2]
```

коэффициенты целые.

В:

```text
Q(√2)
```

коэффициенты рациональные.

Например:

```text
1 / √2 = √2 / 2
```

лежит в `Q(√2)`, потому что:

```text
√2 / 2 = 0 + (1/2)√2
```

А вот в `Z[√2]` этот элемент не лежит, потому что coefficient `1/2` не является целым числом.

Поэтому parentheses обычно указывают на field, полученное добавлением элемента:

```text
Q(√2)
```

А brackets часто указывают на ring, полученное добавлением элемента:

```text
Z[√2]
```

## Существование splitting fields

Раньше у нас была fundamental theorem:

> каждый nonconstant polynomial имеет root в каком-то extension field.

Теперь усилим эту идею:

> каждый nonconstant polynomial над field имеет splitting field.

То есть для любого:

```text
f(x) ∈ F[x]
```

существует extension field:

```text
E
```

такой что `f(x)` полностью раскладывается в `E` на linear factors.

### Почему это работает

Идея простая.

Если `f(x)` ещё не раскладывается над `F`, берём его irreducible factor и строим extension field, где у этого factor появляется root.

После этого у polynomial появляется хотя бы один linear factor.

Потом повторяем процесс.

Каждый раз degree оставшейся части уменьшается.

В итоге все factors становятся linear.

А smallest field, содержащее все roots, и называется splitting field.

### Пример: splitting field of `x^4 - x^2 - 2` над `Q`

Рассмотрим:

```text
f(x) = x^4 - x^2 - 2
```

Над `Q` этот polynomial раскладывается так:

```text
x^4 - x^2 - 2 = (x^2 - 2)(x^2 + 1)
```

У polynomial:

```text
x^2 - 2
```

корни:

```text
±√2
```

У polynomial:

```text
x^2 + 1
```

корни:

```text
±i
```

Значит все roots исходного polynomial:

```text
√2, -√2, i, -i
```

Чтобы polynomial полностью разложился, field должно содержать и:

```text
√2
```

и:

```text
i
```

Поэтому splitting field над `Q`:

```text
Q(√2, i)
```

### Как выглядят элементы `Q(√2, i)`

Можно думать так.

Сначала мы добавляем `√2`:

```text
Q(√2) = {a + b√2 | a, b ∈ Q}
```

Потом добавляем `i`:

```text
Q(√2)(i)
```

Элементы теперь имеют вид:

```text
α + βi
```

где:

```text
α, β ∈ Q(√2)
```

Но каждый из этих коэффициентов сам имеет вид:

```text
α = a + b√2
```

и:

```text
β = c + d√2
```

Поэтому общий элемент можно записать так:

```text
α + βi = (a + b√2) + (c + d√2)i
```

Значит:

```text
Q(√2, i)
=
{(a + b√2) + (c + d√2)i | a, b, c, d ∈ Q}
```

Это smallest field над `Q`, содержащее все четыре roots:

```text
±√2, ±i
```

### Пример над `Z_3`: splitting field of `x^2 + x + 2`

Теперь рассмотрим:

```text
f(x) = x^2 + x + 2
```

над:

```text
Z_3
```

Проверим roots в `Z_3`.

Для `0`:

```text
f(0) = 2
```

Для `1`:

```text
f(1) = 1 + 1 + 2 = 4 ≡ 1
```

Для `2`:

```text
f(2) = 4 + 2 + 2 = 8 ≡ 2
```

Ни разу не получилось `0`.

Так как degree равна `2`, отсутствие roots означает, что:

```text
x^2 + x + 2
```

irreducible over `Z_3`.

Строим extension field:

```text
E = Z_3[x] / <x^2 + x + 2>
```

Обозначим:

```text
β = x + <x^2 + x + 2>
```

Тогда в поле `E` выполняется:

```text
β^2 + β + 2 = 0
```

Отсюда:

```text
β^2 = -β - 2
```

В `Z_3`:

```text
-1 = 2
```

и:

```text
-2 = 1
```

поэтому:

```text
β^2 = 2β + 1
```

### Элементы этого поля

Так как defining polynomial имеет степень `2`, каждый элемент поля можно записать в виде:

```text
a + bβ
```

где:

```text
a, b ∈ Z_3
```

Значит всего элементов:

```text
3^2 = 9
```

Вот они:

```text
0
1
2
β
2β
β + 1
2β + 1
β + 2
2β + 2
```

### Раскладываем `x^2 + x + 2` в `E`

Теперь `β` — один из корней.

Так как polynomial имеет степень `2`, второй корень тоже должен лежать в этом же поле.

Факторизацию можно найти напрямую:

```text
x^2 + x + 2 = (x - β)(x + β + 1)
```

Проверим:

```text
(x - β)(x + β + 1)
=
x^2 + x - β(β + 1)
```

Теперь:

```text
β(β + 1) = β^2 + β
```

А так как:

```text
β^2 + β + 2 = 0
```

то:

```text
β^2 + β = -2
```

В `Z_3` это то же самое, что:

```text
-2 = 1
```

Значит:

```text
β(β + 1) = 1
```

и поэтому:

```text
-β(β + 1) = -1 = 2
```

Получаем:

```text
(x - β)(x + β + 1)
=
x^2 + x + 2
```

То есть `f(x)` действительно полностью раскладывается в `E`.

А поскольку `E` было получено добавлением одного корня `β`, оно и является splitting field:

```text
E = Z_3(β)
```

Или, в другой записи:

```text
E = Z_3[x] / <x^2 + x + 2>
```

### Почему символ `x` начинает путать

В quotient construction:

```text
Z_3[x] / <x^2 + x + 2>
```

символ `x` появляется сразу в двух ролях.

Сначала `x` — это formal variable в polynomial:

```text
f(x) = x^2 + x + 2
```

Но потом coset:

```text
x + <x^2 + x + 2>
```

становится уже настоящим элементом нового поля.

Чтобы не путаться, этот field element переименовывают:

```text
β = x + <x^2 + x + 2>
```

Тогда можно писать polynomial variable как `x`, а элемент extension field — как `β`.

Поэтому factorization записывается так:

```text
x^2 + x + 2 = (x - β)(x + β + 1)
```

Здесь `x` — всё ещё переменная polynomial, а `β` — элемент расширенного поля.

### То же splitting field в другой записи: `Z_3(i)`

То же самое поле можно описать иначе.

Пусть:

```text
Z_3(i) = {a + bi | a, b ∈ Z_3}
```

где:

```text
i^2 = -1
```

В `Z_3`:

```text
-1 = 2
```

поэтому:

```text
i^2 = 2
```

Тогда элементы:

```text
1 + i
```

и:

```text
1 - i
```

являются корнями polynomial:

```text
x^2 + x + 2
```

Действительно:

```text
x^2 + x + 2 = [x - (1 + i)][x - (1 - i)]
```

Значит `Z_3(i)` тоже является splitting field для `x^2 + x + 2` над `Z_3`.

Противоречия здесь нет.

Один и тот же splitting field может иметь разные presentations:

```text
Z_3[x] / <x^2 + x + 2>
```

и:

```text
Z_3(i)
```

Это изоморфные поля с `9` элементами.

## Simple extensions and quotient fields

Теперь важная связь между двумя способами строить extension fields.

Мы уже видели construction:

```text
F[x] / <p(x)>
```

где `p(x)` irreducible over `F`.

С другой стороны, если в каком-то extension field есть element `a`, который является root of `p(x)`, то можно рассмотреть field:

```text
F(a)
```

То есть smallest field containing `F` and `a`.

Theorem говорит, что эти две конструкции essentially the same.

## Theorem: `F(a) ≅ F[x] / <p(x)>`

Пусть:

```text
F
```

is a field, and:

```text
p(x) ∈ F[x]
```

is irreducible over `F`.

Пусть `a` — root of `p(x)` in some extension field `E` of `F`.

То есть:

```text
p(a) = 0
```

Тогда:

```text
F(a) ≅ F[x] / <p(x)>
```

И если:

```text
deg p(x) = n
```

то every element of `F(a)` can be uniquely written as:

```text
c_(n-1)a^(n-1) + c_(n-2)a^(n-2) + ... + c_1a + c_0
```

where:

```text
c_0, c_1, ..., c_(n-1) ∈ F
```

### Что это значит по-человечески

Если `a` satisfies irreducible polynomial degree `n`, то нам не нужны powers выше:

```text
a^(n-1)
```

Почему?

Потому что equation:

```text
p(a) = 0
```

позволяет выражать higher powers of `a` через lower powers.

Например, если:

```text
p(x) = x^2 + 1
```

и:

```text
p(a) = 0
```

то:

```text
a^2 + 1 = 0
```

значит:

```text
a^2 = -1
```

Поэтому any expression involving `a^2`, `a^3`, `a^4`, etc. can be reduced to form:

```text
c_1a + c_0
```

Именно поэтому в:

```text
Q(i)
```

каждый element имеет вид:

```text
a + bi
```

а не бесконечную мешанину powers of `i`.

### Почему quotient construction даёт то же самое

В поле:

```text
F[x] / <p(x)>
```

элемент:

```text
x + <p(x)>
```

играет роль корня.

Обозначим его:

```text
α = x + <p(x)>
```

Тогда:

```text
p(α) = 0
```

потому что сам polynomial `p(x)` становится нулём по модулю ideal:

```text
<p(x)>
```

То есть в quotient мы специально создаём новую среду, где у `p(x)` появляется корень.

Если где-то в другом extension field уже есть корень `a` того же irreducible polynomial, то поле:

```text
F(a)
```

устроено так же, как:

```text
F[x] / <p(x)>
```

Иными словами:

```text
F(a)
```

и:

```text
F[x] / <p(x)>
```

— это две разные записи одного и того же типа расширения.

В первом случае мы говорим: «возьмём поле `F` и добавим к нему корень `a`».

Во втором случае мы говорим: «возьмём polynomial ring `F[x]` и принудительно сделаем `p(x)` равным нулю».

Результат с точки зрения algebraic structure получается один и тот же.

## Corollary: roots of the same irreducible polynomial generate isomorphic fields

Пусть:

```text
p(x) ∈ F[x]
```

— irreducible polynomial над `F`.

Если `a` — корень `p(x)` в одном extension field, а `b` — корень `p(x)` в другом extension field, то:

```text
F(a) ≅ F(b)
```

Почему?

Потому что оба поля изоморфны одному и тому же quotient:

```text
F[x] / <p(x)>
```

То есть:

```text
F(a) ≅ F[x] / <p(x)> ≅ F(b)
```

Иначе говоря: если два элемента являются корнями одного и того же irreducible polynomial над `F`, то поля, которые они порождают над `F`, имеют одинаковую алгебраическую структуру.

### Пример: `Q(2^(1/6))`

Рассмотрим polynomial:

```text
f(x) = x^6 - 2
```

над:

```text
Q
```

Этот polynomial irreducible над `Q`.

Например, это следует из Eisenstein's criterion при:

```text
p = 2
```

Пусть:

```text
a = 2^(1/6)
```

Тогда:

```text
a^6 = 2
```

значит:

```text
a^6 - 2 = 0
```

То есть `a` — корень:

```text
x^6 - 2
```

По theorem:

```text
Q(2^(1/6)) ≅ Q[x] / <x^6 - 2>
```

А каждый element поля:

```text
Q(2^(1/6))
```

единственным образом записывается так:

```text
a_0 + a_1 2^(1/6) + a_2 2^(2/6) + a_3 2^(3/6) + a_4 2^(4/6) + a_5 2^(5/6)
```

где:

```text
a_0, a_1, a_2, a_3, a_4, a_5 ∈ Q
```

То же самое можно записать как set:

```text
Q(2^(1/6))
=
{a_0 + a_1 2^(1/6) + a_2 2^(2/6) + a_3 2^(3/6) + a_4 2^(4/6) + a_5 2^(5/6) | a_i ∈ Q}
```

Если смотреть на это поле как на vector space над `Q`, то его basis:

```text
1, 2^(1/6), 2^(2/6), 2^(3/6), 2^(4/6), 2^(5/6)
```

А dimension равна:

```text
[Q(2^(1/6)) : Q] = 6
```

### Почему theorem не работает для `Q(π)`

Не каждый element extension field является корнем polynomial над base field.

Например:

```text
π
```

не является корнем никакого ненулевого polynomial из:

```text
Q[x]
```

Такие elements называются transcendental.

Поэтому для:

```text
Q(π)
```

theorem:

```text
F(a) ≅ F[x] / <p(x)>
```

не применяется.

Причина простая: нет irreducible polynomial:

```text
p(x) ∈ Q[x]
```

такого что:

```text
p(π) = 0
```

Это различие станет важным дальше, когда мы будем отделять algebraic extensions от transcendental extensions.

## Разные на вид splitting fields могут быть изоморфны

Раньше мы видели, что:

```text
Q[x] / <x^2 + 1>
```

и:

```text
Q(i)
```

оба подходят как splitting field для:

```text
x^2 + 1
```

над:

```text
Q
```

Выглядят они по-разному.

Первое поле построено через cosets of polynomials:

```text
Q[x] / <x^2 + 1>
```

А второе записывается как числа вида:

```text
a + bi
```

Но algebraically это одно и то же.

Эти поля изоморфны.

Идея isomorphism такая:

```text
x + <x^2 + 1>  ↦  i
```

То есть coset of `x` переходит в корень `i`.

## Extending isomorphisms to polynomial rings

Пусть есть field isomorphism:

```text
φ : F -> F'
```

Тогда его можно естественно продолжить до polynomial rings:

```text
φ : F[x] -> F'[x]
```

Для этого надо просто применить `φ` к coefficients.

Polynomial:

```text
c_nx^n + c_(n-1)x^(n-1) + ... + c_1x + c_0
```

переходит в:

```text
φ(c_n)x^n + φ(c_(n-1))x^(n-1) + ... + φ(c_1)x + φ(c_0)
```

Переменная `x` остаётся formal variable.

Меняются только coefficients.

Это важно, когда мы сравниваем splitting fields над изоморфными base fields: вместе с самим field isomorphism надо переносить и polynomials.

## Лемма: продолжение изоморфизмов после добавления корней

Пусть:

```text
F
```

— поле,

```text
p(x) ∈ F[x]
```

— неприводимый polynomial над `F`, а `a` — корень `p(x)` в некотором расширении поля `F`.

Пусть также есть field isomorphism:

```text
φ : F -> F'
```

Применим `φ` к коэффициентам `p(x)`. Получим polynomial:

```text
φ(p(x)) ∈ F'[x]
```

Теперь пусть `b` — корень:

```text
φ(p(x))
```

в некотором расширении поля `F'`.

Тогда существует isomorphism:

```text
F(a) -> F'(b)
```

который:

1. совпадает с `φ` на элементах `F`;
2. отправляет:

```text
a -> b
```

### Что означает эта лемма

Смысл такой.

Если два base fields уже изоморфны, и мы добавляем к ним соответствующие корни соответствующих неприводимых polynomials, то получившиеся simple extensions тоже будут изоморфны.

То есть поля:

```text
F(a)
```

и:

```text
F'(b)
```

имеют одинаковую algebraic structure, если:

- `F` и `F'` уже совпадают с точностью до изоморфизма;
- `a` и `b` удовлетворяют соответствующим неприводимым уравнениям.

Грубо говоря, если мы начинаем с «одинаковых» полей и добавляем «одинаковые по смыслу» корни, то результат тоже будет «одинаковым» с точностью до isomorphism.

### Зачем это нужно для splitting fields

Splitting field может быть записано по-разному.

Например:

```text
Z_3[x] / <x^2 + x + 2>
```

и:

```text
Z_3(i)
```

могут описывать одно и то же поле с `9` элементами.

Лемма говорит, что это не случайность.

Когда две конструкции добавляют корни одного и того же irreducible polynomial, получившиеся поля изоморфны.

Позже эта идея расширяется уже не на один корень, а на все корни polynomial.

И получается важный результат:

> splitting fields одного и того же polynomial над одним и тем же base field unique up to isomorphism.

То есть даже если два поля разложения выглядят по-разному, algebraically это одно и то же поле.

## Isomorphism of splitting fields

Теперь мы можем сформулировать важный результат:

> splitting fields могут выглядеть по-разному, но algebraically они одинаковы up to isomorphism.

Пусть есть field isomorphism:

```text
φ : F -> F'
```

и polynomial:

```text
f(x) ∈ F[x]
```

Если:

```text
E
```

is a splitting field for `f(x)` over `F`, а:

```text
E'
```

is a splitting field for `φ(f(x))` over `F'`, то существует isomorphism:

```text
E -> E'
```

который agrees with `φ` on `F`.

То есть если base fields already correspond to each other, then their splitting fields also correspond.

### Что значит `φ(f(x))`

Если:

```text
f(x) = c_nx^n + c_(n-1)x^(n-1) + ... + c_1x + c_0
```

и:

```text
φ : F -> F'
```

то:

```text
φ(f(x))
```

означает polynomial, полученный применением `φ` к coefficients:

```text
φ(f(x)) =
φ(c_n)x^n + φ(c_(n-1))x^(n-1) + ... + φ(c_1)x + φ(c_0)
```

Variable `x` не меняется.

Меняются только coefficients.

## Splitting fields are unique

Главное следствие:

> any two splitting fields of the same polynomial over the same field are isomorphic.

То есть если:

```text
E
```

и:

```text
E'
```

оба являются splitting fields of `f(x)` over `F`, то:

```text
E ≅ E'
```

Поэтому можно говорить:

```text
the splitting field of f(x) over F
```

без двусмысленности.

Технически fields могут быть построены по-разному, но с точки зрения algebraic structure они одинаковы.

### Пример: `Q[x] / <x^2 + 1>` и `Q(i)`

Мы уже видели два способа получить splitting field for:

```text
x^2 + 1
```

over:

```text
Q
```

Первый способ:

```text
Q[x] / <x^2 + 1>
```

Второй способ:

```text
Q(i)
```

Они выглядят по-разному.

В первом случае elements are cosets of polynomials.

Во втором случае elements look like:

```text
a + bi
```

where:

```text
a, b ∈ Q
```

Но оба fields являются splitting fields of:

```text
x^2 + 1
```

over `Q`.

Значит:

```text
Q[x] / <x^2 + 1> ≅ Q(i)
```

### Example: splitting field of `x^n - a` over `Q`

Рассмотрим polynomial:

```text
x^n - a
```

where:

```text
a ∈ Q
```

and `a` is positive.

Один root очевиден:

```text
a^(1/n)
```

Но generally этого root недостаточно, чтобы polynomial split completely.

Нужны ещё roots of unity.

Пусть:

```text
ω
```

is a primitive `n`th root of unity.

Это means:

```text
ω^n = 1
```

и powers:

```text
1, ω, ω^2, ..., ω^(n-1)
```

дают все `n` different `n`th roots of unity.

Тогда roots of:

```text
x^n - a
```

are:

```text
a^(1/n)
```

```text
ωa^(1/n)
```

```text
ω^2a^(1/n)
```

...

```text
ω^(n-1)a^(1/n)
```

Потому что:

```text
(ω^k a^(1/n))^n
=
ω^(kn) · a
=
1 · a
=
a
```

Значит:

```text
ω^k a^(1/n)
```

is a root of:

```text
x^n - a
```

for each:

```text
k = 0, 1, ..., n - 1
```

So the splitting field over `Q` is:

```text
Q(a^(1/n), ω)
```

То есть мы должны добавить:

1. один `n`th root of `a`;
2. primitive `n`th root of unity.

### Почему одного `a^(1/n)` часто недостаточно

Например:

```text
x^6 - 2
```

has root:

```text
2^(1/6)
```

inside:

```text
Q(2^(1/6))
```

Но polynomial не splits there completely.

Все roots имеют вид:

```text
2^(1/6), ω2^(1/6), ω^2 2^(1/6), ..., ω^5 2^(1/6)
```

где `ω` — primitive 6th root of unity.

Если field содержит только real root:

```text
2^(1/6)
```

но не содержит нужные complex roots of unity, то остальных roots там нет.

Поэтому splitting field is:

```text
Q(2^(1/6), ω)
```

а не просто:

```text
Q(2^(1/6))
```

## Zeros of an irreducible polynomial

Теперь вопрос:

> если polynomial irreducible over `F`, как он splits in extension field?

Мы знаем, что любой nonconstant polynomial eventually splits in some extension field.

Но irreducible polynomials have special behavior.

Чтобы это понять, вводят formal derivative.

### Formal derivative

Пусть:

```text
f(x) = a_nx^n + a_(n-1)x^(n-1) + ... + a_1x + a_0 ∈ F[x]
```

Тогда **formal derivative / формальная производная** polynomial `f(x)` is:

```text
f'(x) =
n a_n x^(n-1)
+
(n - 1)a_(n-1)x^(n-2)
+
...
+
a_1
```

Это выглядит как обычная derivative из calculus, но здесь нет limits.

Мы просто формально применяем правило:

```text
(x^n)' = nx^(n-1)
```

к polynomial.

### Почему derivative работает над любым field

В calculus derivative связана с limits.

Но в abstract algebra нам не нужны limits.

Polynomial derivative — это чисто алгебраическая операция над coefficients.

Например, над `Q`:

```text
f(x) = 3x^4 + 2x^2 - 7x + 5
```

получаем:

```text
f'(x) = 12x^3 + 4x - 7
```

То же самое можно делать и над finite fields.

Например, над `Z_5`:

```text
f(x) = 3x^4 + 2x^2 - 7x + 5
```

Сначала можно привести coefficients modulo `5`:

```text
f(x) = 3x^4 + 2x^2 + 3x
```

потому что:

```text
-7 ≡ 3 (mod 5)
```

и:

```text
5 ≡ 0 (mod 5)
```

Теперь берём derivative:

```text
f'(x) = 12x^3 + 4x + 3
```

После этого снова приводим coefficients modulo `5`:

```text
12 ≡ 2 (mod 5)
```

Значит:

```text
f'(x) = 2x^3 + 4x + 3
```

Главная мысль: мы не считаем никакие limits. Мы просто применяем формальное правило:

```text
(x^n)' = nx^(n-1)
```

и потом работаем с coefficients внутри нашего field.

### Важный момент в характеристике `p`

В полях характеристики `p` некоторые производные могут неожиданно превращаться в ноль.

Например, в `Z_3[x]`:

```text
f(x) = x^3
```

Формальная производная:

```text
f'(x) = 3x^2
```

Но в `Z_3`:

```text
3 = 0
```

поэтому:

```text
f'(x) = 0
```

Это одна из причин, почему derivative важна для finite fields: она помогает отслеживать repeated roots, но работает там чуть иначе, чем над `R` или `Q`.

## Свойства производной

Formal derivative подчиняется привычным правилам.

Для:

```text
f(x), g(x) ∈ F[x]
```

и:

```text
a ∈ F
```

имеем:

```text
(f(x) + g(x))' = f'(x) + g'(x)
```

То есть производная суммы равна сумме производных.

---

```text
(af(x))' = af'(x)
```

Скаляр можно вынести.

---

```text
(f(x)g(x))' = f(x)g'(x) + g(x)f'(x)
```

Правило произведения тоже работает.

Важно: это algebraic identities в polynomial rings. Никаких limits здесь нет.

### Зачем здесь нужна производная

Производная помогает понять, есть ли у polynomial повторяющиеся корни.

В обычной ситуации, если у polynomial есть repeated root, то сам polynomial и его derivative имеют общий factor.

Например:

```text
f(x) = (x - a)^2(x - b)
```

Тогда factor:

```text
x - a
```

делит и:

```text
f(x)
```

и:

```text
f'(x)
```

Поэтому derivative помогает ответить на вопрос:

> irreducible polynomial раскладывается на разные roots или какой-то root повторяется несколько раз?

Это станет важным дальше, когда мы будем говорить про roots of irreducible polynomials и finite fields.

## Multiple zeros

Теперь разберём, зачем нам понадобилась formal derivative.

Она помогает понять, есть ли у polynomial repeated roots.

Root называется **multiple zero / кратный корень**, если он появляется больше одного раза.

Например, polynomial:

```text
(x - a)^2(x - b)
```

имеет root:

```text
a
```

с multiplicity `2`.

А root:

```text
b
```

имеет multiplicity `1`.

То есть `a` — multiple zero, а `b` — обычный simple zero.

### Criterion for multiple zeros

Пусть:

```text
f(x) ∈ F[x]
```

Тогда `f(x)` имеет multiple zero в некотором extension field тогда и только тогда, когда:

```text
f(x)
```

и его derivative:

```text
f'(x)
```

имеют common factor positive degree in `F[x]`.

То есть у них должен быть общий nonconstant factor.

### Почему это логично

Если:

```text
f(x) = (x - a)^2g(x)
```

то при differentiating factor `(x - a)` останется и в derivative.

Не обязательно в той же степени, но хотя бы один copy остаётся.

Поэтому:

```text
x - a
```

делит и:

```text
f(x)
```

и:

```text
f'(x)
```

Значит у них есть common factor.

В обратную сторону идея такая же: если `f(x)` и `f'(x)` имеют общий nonconstant factor, значит какой-то root повторяется.

### Example

Рассмотрим:

```text
f(x) = (x - 2)^2(x + 1)
```

Тут root:

```text
2
```

имеет multiplicity `2`.

Раскроем:

```text
f(x) = (x^2 - 4x + 4)(x + 1)
```

```text
f(x) = x^3 - 3x^2 + 4
```

Derivative:

```text
f'(x) = 3x^2 - 6x
```

Видно, что `x - 2` делит both `f(x)` and `f'(x)`:

```text
f(2) = 0
```

и:

```text
f'(2) = 12 - 12 = 0
```

Это и есть сигнал repeated root.

## Zeros of irreducible polynomials

Теперь важный результат про irreducible polynomials.

Пусть:

```text
f(x)
```

is irreducible over field `F`.

Если field `F` has characteristic `0`, then `f(x)` has no multiple zeros.

То есть в characteristic `0` irreducible polynomial always splits into distinct roots in its splitting field.

Например, over:

```text
Q
R
C
```

irreducible polynomial не может иметь repeated roots.

### Что происходит в characteristic `p`

Если field `F` has characteristic:

```text
p > 0
```

то возможна особая ситуация.

Irreducible polynomial может иметь multiple zeros only if it has form:

```text
f(x) = g(x^p)
```

for some polynomial:

```text
g(x) ∈ F[x]
```

То есть в polynomial встречаются only powers:

```text
x^p, x^(2p), x^(3p), ...
```

Из-за этого derivative может стать zero.

Например, in characteristic `p`:

```text
(x^p)' = px^(p-1) = 0
```

because:

```text
p = 0
```

inside the field.

## Perfect fields

Чтобы убрать такие pathological cases, вводят понятие perfect field.

Field `F` называется **perfect / совершенным**, если выполняется одно из двух:

1. `F` has characteristic `0`;
2. `F` has characteristic `p > 0`, and every element of `F` is a `p`th power.

Второе условие записывают так:

```text
F^p = {a^p | a ∈ F} = F
```

То есть для любого element:

```text
b ∈ F
```

найдётся element:

```text
a ∈ F
```

такой что:

```text
a^p = b
```

### Почему это важно

Over perfect fields irreducible polynomials behave nicely.

Если:

```text
f(x)
```

is irreducible over a perfect field `F`, then `f(x)` has no multiple zeros.

То есть over perfect field irreducible polynomial splits into distinct roots in its splitting field.

## Finite fields are perfect

Самый важный для нас class perfect fields:

```text
finite fields
```

Every finite field is perfect.

Это особенно важно для finite field theory and crypto.

Если мы работаем over finite field:

```text
F_p
```

или:

```text
F_(p^n)
```

то irreducible polynomials over this field do not have repeated roots.

То есть в finite fields irreducible polynomial behaves “normally”: в splitting field он раскладывается на distinct linear factors.

### Критерий отсутствия кратных корней

Если:

```text
f(x)
```

неприводим над perfect field `F`, то у него нет кратных корней.

То есть в splitting field:

```text
E
```

разложение имеет вид:

```text
f(x) = a(x - a1)(x - a2)...(x - an)
```

где корни:

```text
a1, a2, ..., an
```

попарно различны.

Повторяющихся factors здесь нет.

### Корни неприводимого polynomial в splitting field

Есть ещё один полезный факт.

Пусть:

```text
f(x)
```

неприводим над `F`, а `E` — splitting field для `f(x)` над `F`.

Тогда все корни `f(x)` в `E` имеют одинаковую multiplicity.

То есть неприводимый polynomial не может разложиться вот так:

```text
(x - a)^2(x - b)(x - c)^5
```

с разными multiplicities у разных корней.

Если корни повторяются, то они повторяются одинаковое число раз.

### Общий вид factorization

Поэтому если:

```text
f(x)
```

неприводим над `F`, а `E` — его splitting field, то:

```text
f(x) = a(x - a1)^n(x - a2)^n ... (x - at)^n
```

где:

```text
a1, a2, ..., at
```

— разные элементы `E`, а:

```text
a ∈ F
```

То есть каждый корень имеет одну и ту же multiplicity `n`.

Если `F` — perfect field, то:

```text
n = 1
```

и repeated roots вообще не возникают.

### Пример repeated root над не-perfect field

Теперь посмотрим, зачем вообще нужно условие perfect field.

Возьмём:

```text
F = Z_2(t)
```

Это поле rational functions от `t` с coefficients in `Z_2`.

Элементы `F` выглядят так:

```text
h(t) / k(t)
```

где:

```text
h(t), k(t) ∈ Z_2[t]
```

и:

```text
k(t) != 0
```

Теперь рассмотрим:

```text
f(x) = x^2 - t ∈ F[x]
```

Так как characteristic равна `2`, вычитание совпадает со сложением:

```text
x^2 - t = x^2 + t
```

### Почему `f(x)` неприводим над `F`

Если бы `f(x)` был reducible над `F`, то, поскольку degree равна `2`, у него был бы корень в `F`.

Это означало бы, что существует:

```text
h(t) / k(t) ∈ Z_2(t)
```

такой что:

```text
(h(t) / k(t))^2 = t
```

Тогда:

```text
h(t)^2 = t k(t)^2
```

Но в `Z_2[t]` при возведении polynomial в квадрат все exponents удваиваются:

```text
(a0 + a1t + a2t^2 + ...)^2
=
a0^2 + a1^2t^2 + a2^2t^4 + ...
```

Смешанные слагаемые исчезают, потому что characteristic равна `2`.

Значит `h(t)^2` содержит только чётные powers of `t`.

Точно так же `k(t)^2` содержит только чётные powers, а:

```text
t k(t)^2
```

содержит только нечётные powers.

Polynomial только с чётными powers не может быть равен polynomial только с нечётными powers.

Значит такого корня в `F` нет.

Следовательно:

```text
x^2 - t
```

неприводим над:

```text
Z_2(t)
```

### Но derivative равна нулю

Теперь посчитаем derivative:

```text
f(x) = x^2 - t
```

Здесь `t` — coefficient, а не переменная. Поэтому:

```text
f'(x) = 2x
```

Но в characteristic `2`:

```text
2 = 0
```

значит:

```text
f'(x) = 0
```

Получается, что `f(x)` и `f'(x)` имеют общий factor. Более того, сам `f(x)` делит их оба.

По критерию кратных корней это означает, что у `f(x)` есть repeated root в некотором extension field.

## Что происходит в quotient field

Возьмём:

```text
K = F[x] / <x^2 - t>
```

Обозначим:

```text
α = x + <x^2 - t>
```

Тогда:

```text
α^2 = t
```

Значит в `K`:

```text
x^2 - t = x^2 - α^2
```

Но в characteristic `2`:

```text
x^2 - α^2 = (x - α)^2
```

потому что:

```text
(x - α)^2 = x^2 - 2αx + α^2
```

а:

```text
2αx = 0
```

Кроме того, в characteristic `2` знак не играет роли:

```text
-α = α
```

Поэтому:

```text
x^2 - t = (x - α)^2
```

в extension field.

То есть polynomial имеет один корень:

```text
α
```

но с multiplicity:

```text
2
```

Именно такого поведения perfect fields позволяют избежать.