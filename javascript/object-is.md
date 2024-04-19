# Object.is

두 값이 같은 값인지 결정하는 메서드

**같은 값의 조건**

- 둘 다 undefined
- 둘 다 null
- 둘 다 true, 둘 다 false
- 둘 다 같은 순서로 같은 문자에 같은 길이인 문자열
- 둘 다 같은 객체 (두 값 모두 메모리에서 같은 객체를 참조하는 것을 의미)
- 둘 다 숫자이며
  - 둘 다 +0
  - 둘 다 -0
  - 둘 다 NaN
  - 둘 다 0이나 NaN이 아니고, 같은 값을 지님

`**==` 연산자와 같지 않음\*\*

- `==` 연산자는 양 쪽이 같은 형이 아니라면 강제(coercion)를 적용하지만 Object.is는 강제하지 않는다.

`**===` 연산자와 같지 않음\*\*

- 부호 있는 0과 NaN 값들의 처리에 차이가 있다.
- `===` (과 `==`) 연산자는 숫자 -0과 +0 같게 처리하고, NaN는 서로 같지 않게 처리한다.

```tsx
console.log(Object.is('1', 1)); // false
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(-0, 0)); // false
console.log(Object.is(obj, {})); // false

Object.is(null, null); // true
Object.is(undefined, undefined); // true
Object.is([], []); // false

const foo = { a: 1 };
const bar = { a: 1 };
const sameFoo = foo;
Object.is(foo, foo); // true
Object.is(foo, bar); // false
Object.is(foo, sameFoo); // true
```

출처:

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/is
