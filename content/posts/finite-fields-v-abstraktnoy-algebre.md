---
title: "Finite Fields"
draft: false
meta_desc: "Разбираем finite fields: classification of GF(pⁿ), additive and multiplicative structure, GF(16), generators, conversion tables and subfields."
date: 2026-07-07T16:00:00
tags:
- абстрактная алгебра
- cs
---

Теперь переходим к одной из самых важных тем для algebra, coding theory и cryptography: **finite fields (конечные поля)**. Finite field — это field with finitely many elements.

Мы уже видели examples:

```text
Z_p
```

where `p` is prime.

Например:

```text
Z_2
Z_3
Z_5
```

are finite fields.

Но finite fields не ограничиваются только prime order. Есть fields with:

```text
4 elements
8 elements
9 elements
16 elements
25 elements
```

и так далее.

Главный вопрос:

> какие размеры вообще могут быть у finite fields?

Ответ жёсткий: только prime powers.

## Classification of finite fields

Главная theorem говорит:

> For each prime `p` and each positive integer `n`, there exists, up to isomorphism, a unique finite field of order `p^n`.

То есть finite field может иметь order:

```text
p^n
```

where:

```text
p is prime
n >= 1
```

Например, possible orders:

```text
2, 3, 4, 5, 7, 8, 9, 11, 13, 16, 17, 25, 27, ...
```

А impossible orders:

```text
6, 10, 12, 14, 15, 18, 20, ...
```

потому что они не являются powers of one prime.

Например:

```text
6 = 2 · 3
```

not a prime power. So there is no field with exactly `6` elements.

## Обозначение: `GF(p^n)`

Finite field / конечное поле порядка:

```text
p^n
```

обычно обозначают так:

```text
GF(p^n)
```

или так:

```text
F_(p^n)
```

Здесь `GF` означает:

```text
Galois field
```

То есть:

```text
GF(p^n)
```

— это конечное поле с `p^n` элементами.

Например:

```text
GF(2) = Z_2
```

```text
GF(3) = Z_3
```

А:

```text
GF(4)
```

— это unique field / единственное поле, up to isomorphism, с `4` элементами.

И:

```text
GF(16)
```

— unique field с `16` элементами.

Важно:

```text
GF(p)
```

это просто:

```text
Z_p
```

Но если:

```text
n > 1
```

то:

```text
GF(p^n)
```

это уже не то же самое, что:

```text
Z_(p^n)
```

Например:

```text
GF(4)
```

— это field.

А:

```text
Z_4
```

не является field, потому что в `Z_4` есть zero divisor:

```text
2 · 2 = 4 ≡ 0 (mod 4)
```

То есть `2` не равно `0`, но при умножении само на себя даёт `0`.

Значит в `Z_4` нельзя делить на все nonzero elements, и поэтому `Z_4` не field.

## Structure of finite fields

Пусть:

```text
GF(p^n)
```

— finite field с:

```text
p^n
```

элементами.

У него есть две важные group structures:

1. additive group / группа по сложению;
2. multiplicative group of nonzero elements / группа ненулевых элементов по умножению.

### Additive structure

Как group under addition:

```text
GF(p^n) ≅ Z_p ⊕ Z_p ⊕ ... ⊕ Z_p
```

где справа `n` factors.

То есть по сложению finite field `GF(p^n)` устроен как `n`-dimensional vector space over:

```text
Z_p
```

Иными словами, если смотреть на `GF(p^n)` as a vector space over:

```text
GF(p) = Z_p
```

то его dimension равна:

```text
n
```

В notation of field extensions это записывают так:

```text
[GF(p^n) : GF(p)] = n
```

Например:

```text
GF(16) = GF(2^4)
```

имеет dimension `4` over:

```text
GF(2)
```

То есть как additive group:

```text
GF(16) ≅ Z_2 ⊕ Z_2 ⊕ Z_2 ⊕ Z_2
```

### Multiplicative structure

Теперь уберём `0`.

Ненулевые элементы finite field:

```text
GF(p^n)^*
```

form a group under multiplication.

Сколько там elements?

Во всём field:

```text
p^n
```

элементов.

Один из них — `0`.

Значит ненулевых элементов:

```text
p^n - 1
```

Theorem says that this multiplicative group is cyclic:

```text
GF(p^n)^* ≅ Z_(p^n - 1)
```

То есть существует element:

```text
α ∈ GF(p^n)
```

такой, что каждый nonzero element поля можно записать как power of `α`:

```text
1, α, α^2, ..., α^(p^n - 2)
```

и:

```text
α^(p^n - 1) = 1
```

Такой element называется:

```text
generator
```

или:

```text
primitive element
```

of the multiplicative group.

Например, если field имеет `16` elements, то его nonzero multiplicative group имеет:

```text
16 - 1 = 15
```

elements.

Значит:

```text
GF(16)^* ≅ Z_15
```

и какой-то element `α` порождает все ненулевые элементы:

```text
GF(16)^* = {1, α, α^2, ..., α^14}
```

with:

```text
α^15 = 1
```

### Пример: `GF(16)`

Построим поле:

```text
GF(16)
```

Так как:

```text
16 = 2^4
```

нам нужно field / поле с `2^4` элементами.

Один способ его построить:

```text
GF(16) ≅ Z_2[x] / <x^4 + x + 1>
```

Здесь:

```text
x^4 + x + 1
```

является irreducible polynomial / неприводимым многочленом над:

```text
Z_2
```

Поэтому quotient / факторкольцо по этому polynomial является field.

#### Элементы `GF(16)`

Polynomial:

```text
x^4 + x + 1
```

имеет degree / степень `4`.

Поэтому каждый element of quotient ring:

```text
Z_2[x] / <x^4 + x + 1>
```

можно единственным образом представить polynomial степени меньше `4`.

То есть elements of `GF(16)` можно записывать так:

```text
ax^3 + bx^2 + cx + d
```

где:

```text
a, b, c, d ∈ Z_2
```

А в `Z_2` есть только два элемента:

```text
0
```

и:

```text
1
```

Значит у каждого из четырёх coefficients есть `2` варианта.

Итого elements:

```text
2^4 = 16
```

Например:

```text
0
1
x
x + 1
x^2
x^2 + x
x^3 + x + 1
```

и так далее.

#### Сложение в `GF(16)`

Сложение здесь простое.

Мы складываем polynomials coefficientwise / по коэффициентам modulo `2`.

Например:

```text
(x^3 + x^2 + x + 1) + (x^3 + x)
```

Соберём одинаковые terms:

```text
= x^3 + x^3 + x^2 + x + x + 1
```

В `Z_2`:

```text
1 + 1 = 0
```

Поэтому:

```text
x^3 + x^3 = 0
```

и:

```text
x + x = 0
```

Остаётся:

```text
(x^3 + x^2 + x + 1) + (x^3 + x)
=
x^2 + 1
```

То есть сложение в таком виде — это просто XOR coefficients.

#### Умножение в `GF(16)`

Умножение чуть интереснее.

Сначала мы умножаем polynomials обычным образом, а потом reduce / приводим результат modulo:

```text
x^4 + x + 1
```

В quotient field мы считаем, что:

```text
x^4 + x + 1 = 0
```

Отсюда:

```text
x^4 = -x - 1
```

Но characteristic / характеристика поля равна `2`, поэтому:

```text
-1 = 1
```

и:

```text
-x = x
```

Значит:

```text
x^4 = x + 1
```

Эта relation / связь позволяет reduce all higher powers of `x`.

Например:

```text
x^5 = x · x^4 = x(x + 1) = x^2 + x
```

и:

```text
x^6 = x · x^5 = x(x^2 + x) = x^3 + x^2
```

#### Пример умножения

Посчитаем:

```text
(x^3 + x^2 + x + 1)(x^3 + x)
```

Сначала умножаем как обычные polynomials:

```text
(x^3 + x^2 + x + 1)(x^3 + x)
=
x^6 + x^5 + x^2 + x
```

Теперь reduce higher powers:

```text
x^6 = x^3 + x^2
```

и:

```text
x^5 = x^2 + x
```

Подставляем:

```text
x^6 + x^5 + x^2 + x
=
(x^3 + x^2) + (x^2 + x) + x^2 + x
```

Теперь собираем terms modulo `2`.

Так как одинаковые terms попарно cancel / уничтожаются:

```text
x + x = 0
```

и две пары `x^2` тоже сокращаются modulo `2`, остаётся:

```text
= x^3 + x^2
```

Значит:

```text
(x^3 + x^2 + x + 1)(x^3 + x)
=
x^3 + x^2
```

in `GF(16)` / в поле `GF(16)`.

## Два способа записывать ненулевые элементы

У elements of `GF(16)` есть два удобных вида записи:

1. additive form / аддитивная форма;
2. multiplicative form / мультипликативная форма.

Обе формы описывают одни и те же элементы, но удобны для разных операций.

### Additive form / аддитивная форма

Каждый element of `GF(16)` можно записать как polynomial степени меньше `4`:

```text
ax^3 + bx^2 + cx + d
```

где:

```text
a, b, c, d ∈ Z_2
```

То есть каждый coefficient равен либо `0`, либо `1`.

Эта форма удобна для сложения.

Например:

```text
(x^2 + x + 1) + (x^3 + x + 1)
```

Собираем одинаковые terms:

```text
= x^3 + x^2 + x + x + 1 + 1
```

В `Z_2`:

```text
1 + 1 = 0
```

поэтому одинаковые terms cancel / сокращаются:

```text
x + x = 0
```

и:

```text
1 + 1 = 0
```

Остаётся:

```text
x^3 + x^2
```

Значит:

```text
(x^2 + x + 1) + (x^3 + x + 1) = x^3 + x^2
```

### Multiplicative form / мультипликативная форма

Ненулевые elements of `GF(16)` form a cyclic group / образуют циклическую группу по умножению.

Так как в `GF(16)` всего `16` elements, ненулевых elements:

```text
16 - 1 = 15
```

Значит multiplicative group имеет order:

```text
15
```

В нашем примере element:

```text
x
```

является generator / порождающим элементом этой multiplicative group.

Поэтому каждый nonzero element можно записать как power of `x`:

```text
x^k
```

где:

```text
0 <= k <= 14
```

и:

```text
x^15 = 1
```

Эта форма удобна для умножения.

Например:

```text
x^10 · x^7 = x^17
```

Но так как:

```text
x^15 = 1
```

мы reduce exponent modulo `15`:

```text
x^17 = x^15 · x^2 = 1 · x^2 = x^2
```

Значит:

```text
x^10 · x^7 = x^2
```

### В чём trade-off / обмен удобствами

Additive form:

```text
ax^3 + bx^2 + cx + d
```

делает сложение простым, но умножение менее удобным.

Multiplicative form:

```text
x^k
```

делает умножение простым, но сложение менее удобным.

Например, multiplication:

```text
x^10 · x^7
```

считается сразу:

```text
x^10 · x^7 = x^17 = x^2
```

А вот addition:

```text
x^10 + x^7
```

так сразу не посчитаешь.

Сначала надо перевести оба powers в additive polynomial form.

### Conversion table для `GF(16)`

Мы используем relation:

```text
x^4 = x + 1
```

Она позволяет переводить powers of `x` в polynomial form:

```text
x^0  = 1
x^1  = x
x^2  = x^2
x^3  = x^3
x^4  = x + 1
x^5  = x^2 + x
x^6  = x^3 + x^2
x^7  = x^3 + x + 1
x^8  = x^2 + 1
x^9  = x^3 + x
x^10 = x^2 + x + 1
x^11 = x^3 + x^2 + x
x^12 = x^3 + x^2 + x + 1
x^13 = x^3 + x^2 + 1
x^14 = x^3 + 1
x^15 = 1
```

Теперь можно считать сложение вроде:

```text
x^10 + x^7
```

Сначала переводим в additive form:

```text
x^10 = x^2 + x + 1
```

и:

```text
x^7 = x^3 + x + 1
```

Теперь складываем:

```text
x^10 + x^7
=
(x^2 + x + 1) + (x^3 + x + 1)
```

Одинаковые terms cancel modulo `2`:

```text
x + x = 0
```

и:

```text
1 + 1 = 0
```

Остаётся:

```text
x^3 + x^2
```

А по table:

```text
x^3 + x^2 = x^6
```

Значит:

```text
x^10 + x^7 = x^6
```

### Ещё один пример умножения через powers

Посчитаем:

```text
(x^3 + x^2 + 1)(x^3 + x^2 + x + 1)
```

По conversion table:

```text
x^3 + x^2 + 1 = x^13
```

и:

```text
x^3 + x^2 + x + 1 = x^12
```

Значит:

```text
(x^3 + x^2 + 1)(x^3 + x^2 + x + 1)
=
x^13 · x^12
```

Складываем exponents:

```text
= x^25
```

Так как:

```text
x^15 = 1
```

reduce exponent modulo `15`:

```text
x^25 = x^15 · x^10 = x^10
```

Теперь снова смотрим в table:

```text
x^10 = x^2 + x + 1
```

Итого:

```text
(x^3 + x^2 + 1)(x^3 + x^2 + x + 1)
=
x^2 + x + 1
```

## Предупреждение: `x` не всегда является generator

В примере:

```text
GF(16) ≅ Z_2[x] / <x^4 + x + 1>
```

элемент:

```text
x
```

оказался generator / порождающим элементом multiplicative group / мультипликативной группы:

```text
GF(16)^*
```

Но так бывает не всегда.

Когда мы строим finite field / конечное поле в виде:

```text
Z_p[x] / <f(x)>
```

класс элемента `x` автоматически становится root / корнем polynomial `f(x)` в этом quotient field / факторполе.

То есть если:

```text
α = x + <f(x)>
```

то:

```text
f(α) = 0
```

Но быть root / корнем irreducible polynomial / неприводимого многочлена и быть generator / порождающим элементом всей multiplicative group — это разные вещи.

Элемент:

```text
x + <f(x)>
```

может порождать все nonzero elements / ненулевые элементы поля, а может и не порождать.

Само поле от этого не становится неправильным. Просто выбранная запись может быть более или менее удобной для вычислений.

## Пример: factorization polynomial over `GF(8)`

Рассмотрим polynomial:

```text
f(x) = x^3 + x^2 + 1
```

над полем:

```text
Z_2
```

Этот polynomial является irreducible / неприводимым над `Z_2`.

Построим field:

```text
F = Z_2[x] / <x^3 + x^2 + 1>
```

Так как polynomial имеет degree / степень `3`, поле `F` имеет:

```text
2^3 = 8
```

элементов.

Значит:

```text
F ≅ GF(8)
```

Обозначим:

```text
α = x + <x^3 + x^2 + 1>
```

Тогда `α` является root / корнем polynomial `f(x)` в поле `F`.

То есть:

```text
α^3 + α^2 + 1 = 0
```

Так как мы работаем в characteristic / характеристике `2`, сложение и вычитание совпадают. Поэтому из равенства выше получаем:

```text
α^3 = α^2 + 1
```

### Элементы `GF(8)`

Ненулевые elements of `F` образуют multiplicative group / мультипликативную группу:

```text
F*
```

Её order / порядок равен:

```text
|F*| = 7
```

Так как `7` — prime number / простое число, каждый non-identity nonzero element / ненулевой элемент, отличный от `1`, имеет order `7`.

В частности, `α` не равен ни `0`, ни `1`, поэтому:

```text
|α| = 7
```

Значит все elements of `F` можно записать так:

```text
F = {0, 1, α, α^2, α^3, α^4, α^5, α^6}
```

Теперь перепишем powers of `α` в additive polynomial form / аддитивной многочленной форме.

Используем relation:

```text
α^3 = α^2 + 1
```

Получаем:

```text
α^4 = α · α^3 = α(α^2 + 1) = α^3 + α = (α^2 + 1) + α = α^2 + α + 1
```

Дальше:

```text
α^5 = α · α^4 = α(α^2 + α + 1) = α^3 + α^2 + α
```

Подставляем:

```text
α^3 = α^2 + 1
```

и получаем:

```text
α^5 = (α^2 + 1) + α^2 + α = α + 1
```

Дальше:

```text
α^6 = α · α^5 = α(α + 1) = α^2 + α
```

И наконец:

```text
α^7 = α · α^6 = α(α^2 + α) = α^3 + α^2 = (α^2 + 1) + α^2 = 1
```

Итого conversion table / таблица перевода:

```text
α^0 = 1
α^1 = α
α^2 = α^2
α^3 = α^2 + 1
α^4 = α^2 + α + 1
α^5 = α + 1
α^6 = α^2 + α
α^7 = 1
```

### Находим roots of `f(x)` в `GF(8)`

Мы уже знаем, что:

```text
α
```

является root / корнем, потому что мы специально построили field так, чтобы:

```text
α^3 + α^2 + 1 = 0
```

Теперь проверим другие elements.

Попробуем:

```text
α^2
```

Считаем:

```text
f(α^2) = (α^2)^3 + (α^2)^2 + 1
```

То есть:

```text
f(α^2) = α^6 + α^4 + 1
```

По таблице:

```text
α^6 = α^2 + α
```

и:

```text
α^4 = α^2 + α + 1
```

Значит:

```text
f(α^2)
=
(α^2 + α) + (α^2 + α + 1) + 1
=
0
```

Следовательно:

```text
α^2
```

тоже является root / корнем.

---

Теперь попробуем:

```text
α^3
```

Считаем:

```text
f(α^3) = (α^3)^3 + (α^3)^2 + 1
```

То есть:

```text
f(α^3) = α^9 + α^6 + 1
```

Так как:

```text
α^7 = 1
```

то:

```text
α^9 = α^2
```

Следовательно:

```text
f(α^3)
=
α^2 + (α^2 + α) + 1
=
α + 1
```

Это не `0`.

Значит:

```text
α^3
```

не является root / корнем.

---

Теперь попробуем:

```text
α^4
```

Считаем:

```text
f(α^4) = (α^4)^3 + (α^4)^2 + 1
```

То есть:

```text
f(α^4) = α^12 + α^8 + 1
```

Reduce powers / понижаем степени с помощью:

```text
α^7 = 1
```

Тогда:

```text
α^12 = α^5
```

и:

```text
α^8 = α
```

Значит:

```text
f(α^4)
=
α^5 + α + 1
```

По таблице:

```text
α^5 = α + 1
```

поэтому:

```text
f(α^4)
=
(α + 1) + α + 1
=
0
```

Значит:

```text
α^4
```

тоже является root / корнем.

### Factorization over `GF(8)`

Мы нашли три roots / корня:

```text
α
α^2
α^4
```

Polynomial:

```text
f(x) = x^3 + x^2 + 1
```

имеет degree `3`, поэтому больше трёх roots у него быть не может.

Значит это все roots.

Следовательно, над `GF(8)`:

```text
x^3 + x^2 + 1
=
(x - α)(x - α^2)(x - α^4)
```

Но в characteristic `2`:

```text
-α = α
```

поэтому можно записать так:

```text
x^3 + x^2 + 1
=
(x + α)(x + α^2)(x + α^4)
```

Именно это означает, что `GF(8)` является splitting field / полем разложения для этого polynomial над `Z_2`.

### Почему roots — это `α`, `α^2` и `α^4`

Этот pattern / узор не случаен.

Над finite fields есть важный map / отображение:

```text
z -> z^p
```

Он называется Frobenius map / отображение Фробениуса.

В нашем случае:

```text
p = 2
```

Поэтому roots часто появляются цепочками:

```text
α, α^2, α^4, α^8, ...
```

В нашем примере:

```text
α^8 = α
```

потому что:

```text
α^7 = 1
```

То есть получается cycle / цикл:

```text
α -> α^2 -> α^4 -> α
```

Поэтому три roots irreducible cubic polynomial / неприводимого кубического многочлена здесь именно такие:

```text
α
α^2
α^4
```

## Важный вычислительный момент

Разные irreducible polynomials / неприводимые многочлены одной и той же degree над `Z_p` дают isomorphic fields / изоморфные поля.

Например, любой irreducible polynomial degree `4` над:

```text
Z_2
```

можно использовать, чтобы построить field с:

```text
2^4 = 16
```

элементами.

Все такие поля будут isomorphic to:

```text
GF(16)
```

Но для вычислений они могут быть разными по удобству.

Один polynomial может давать простую reduction rule / правило редукции. Другой — менее удобную.

Например, в:

```text
Z_2[x] / <x^4 + x + 1>
```

мы получили удобную relation:

```text
x^4 = x + 1
```

Это делает reductions / приведение степеней довольно manageable / удобным.

Но другой irreducible polynomial degree `4` может дать другое правило. И класс элемента `x` может уже не быть generator / порождающим элементом nonzero multiplicative group.

Главная мысль:

> same finite field up to isomorphism / одно и то же конечное поле с точностью до изоморфизма — не значит equally convenient representation / одинаково удобная запись для вычислений.

## Subfields of a finite field / подполя конечного поля

Теперь разберём subfields / подполя finite fields / конечных полей.

Theorem about finite fields / теорема о конечных полях говорит:

```text
GF(p^n)
```

существует и единственно up to isomorphism / с точностью до изоморфизма для каждого prime power / простого степенного числа:

```text
p^n
```

Теперь вопрос:

> какие fields / поля могут сидеть внутри `GF(p^n)` как subfields / подполя?

Ответ очень жёсткий.

### Subfields of `GF(p^n)`

Для каждого divisor / делителя `m` числа `n` поле:

```text
GF(p^n)
```

имеет unique subfield / единственное подполе порядка:

```text
p^m
```

И других subfields у него нет.

То есть:

```text
GF(p^m) ⊆ GF(p^n)
```

тогда и только тогда, когда:

```text
m | n
```

где:

```text
m | n
```

означает:

```text
m divides n
```

то есть `m` делит `n`.

### Почему именно divisors of `n`

Поле:

```text
GF(p^n)
```

можно рассматривать как vector space / векторное пространство над:

```text
GF(p)
```

Его dimension / размерность равна:

```text
n
```

Если внутри него есть subfield:

```text
GF(p^m)
```

то `GF(p^n)` можно рассматривать как vector space над:

```text
GF(p^m)
```

Dimensions / размерности должны перемножаться:

```text
[GF(p^n) : GF(p)] =
[GF(p^n) : GF(p^m)] · [GF(p^m) : GF(p)]
```

То есть:

```text
n = [GF(p^n) : GF(p^m)] · m
```

Значит `m` обязан делить `n`.

И наоборот: если `m` делит `n`, то такое unique subfield / единственное подполе действительно существует.

### Пример: подполя `GF(16)`

Так как:

```text
16 = 2^4
```

мы рассматриваем поле:

```text
GF(2^4)
```

Здесь:

```text
n = 4
```

Делители числа `4`:

```text
1, 2, 4
```

Значит у `GF(16)` есть ровно три подполя:

```text
GF(2)
GF(4)
GF(16)
```

Самое маленькое:

```text
GF(2) = {0, 1}
```

Самое большое — всё поле:

```text
GF(16)
```

А нетривиальное промежуточное подполе:

```text
GF(4)
```

#### Как найти `GF(4)` внутри `GF(16)`

В нашей записи:

```text
GF(16) ≅ Z_2[x] / <x^4 + x + 1>
```

мы получили:

```text
GF(16)^* = <x>
```

и:

```text
|GF(16)^*| = 15
```

То есть ненулевые элементы `GF(16)` образуют cyclic group порядка `15`.

Подполе порядка `4` имеет `3` ненулевых элемента. Значит эти ненулевые элементы должны образовывать subgroup порядка `3` внутри:

```text
GF(16)^*
```

Так как `x` имеет order `15`, subgroup порядка `3` порождается элементом:

```text
x^5
```

потому что:

```text
|x^5| = 3
```

Значит подполе порядка `4` выглядит так:

```text
{0, 1, x^5, x^10}
```

Теперь используем conversion table для `GF(16)`:

```text
x^5 = x^2 + x
```

и:

```text
x^10 = x^2 + x + 1
```

Получаем:

```text
GF(4) = {0, 1, x^2 + x, x^2 + x + 1}
```

внутри `GF(16)`.

### Пример: подполя `GF(3^6)`

Теперь рассмотрим:

```text
GF(3^6)
```

Так как:

```text
3^6 = 729
```

это поле с `729` элементами.

Здесь:

```text
n = 6
```

Делители числа `6`:

```text
1, 2, 3, 6
```

Значит подполя такие:

```text
GF(3)
GF(3^2) = GF(9)
GF(3^3) = GF(27)
GF(3^6) = GF(729)
```

Других подполей нет.

Например, внутри `GF(3^6)` нет подполя:

```text
GF(3^4)
```

потому что:

```text
4 ∤ 6
```

### Как описать эти подполя через generator

Пусть:

```text
α
```

— generator мультипликативной группы:

```text
GF(729)^*
```

Тогда:

```text
|GF(729)^*| = 729 - 1 = 728
```

У каждого подполя `GF(3^m)` ненулевые элементы образуют multiplicative group порядка:

```text
3^m - 1
```

Поэтому:

```text
GF(3)   = {0} ∪ <α^364>
GF(9)   = {0} ∪ <α^91>
GF(27)  = {0} ∪ <α^28>
GF(729) = {0} ∪ <α>
```

Откуда берутся эти exponents?

Если `α` порождает всю группу порядка:

```text
3^6 - 1
```

то элемент:

```text
α^((3^6 - 1)/(3^m - 1))
```

порождает subgroup порядка:

```text
3^m - 1
```

Например, для `GF(9)`:

```text
3^2 - 1 = 8
```

и:

```text
728 / 8 = 91
```

поэтому:

```text
GF(9)^* = <α^91>
```

А само подполе получается добавлением нуля:

```text
GF(9) = {0} ∪ <α^91>
```

### Решётка подполей `GF(2^24)`

Эта theorem также полностью описывает lattice / решётку подполей.

Для:

```text
GF(2^24)
```

смотрим на делители числа:

```text
24
```

Это:

```text
1, 2, 3, 4, 6, 8, 12, 24
```

Значит подполя такие:

```text
GF(2)
GF(2^2)
GF(2^3)
GF(2^4)
GF(2^6)
GF(2^8)
GF(2^12)
GF(2^24)
```

Вложение подполей тоже определяется делимостью:

```text
GF(2^a) ⊆ GF(2^b)
```

тогда и только тогда, когда:

```text
a | b
```

Например:

```text
GF(2^2) ⊆ GF(2^4) ⊆ GF(2^8) ⊆ GF(2^24)
```

потому что:

```text
2 | 4 | 8 | 24
```

Также:

```text
GF(2^3) ⊆ GF(2^6) ⊆ GF(2^12) ⊆ GF(2^24)
```

потому что:

```text
3 | 6 | 12 | 24
```

И ещё:

```text
GF(2^4) ⊆ GF(2^12)
```

потому что:

```text
4 | 12
```

Но:

```text
GF(2^8) not⊆ GF(2^12)
```

потому что:

```text
8 ∤ 12
```

и:

```text
12 ∤ 8
```

Значит ни одно из этих двух подполей не содержит другое.

### Аналогия с cyclic groups

Эта theorem очень похожа на theorem о subgroups конечной cyclic group.

Cyclic group порядка `n` имеет ровно один subgroup порядка `m` для каждого divisor `m` числа `n`.

Похожим образом:

```text
GF(p^n)
```

имеет ровно одно подполе порядка:

```text
p^m
```

для каждого divisor:

```text
m | n
```

То есть structure of subfields у finite fields очень жёсткая.

Случайных подполей там нет.

Есть только те, которые forced by divisors of `n`.