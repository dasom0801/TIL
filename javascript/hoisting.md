# 호이스팅

코드를 실행하기 전에 함수, 변수, 클래스, 임포트의 선언문을 해당 범위의 맨 위로 끌어올리는 것처럼 보이는 현상. 끌어올려진 변수는 undefined를 반환한다.

### var

var를 사용하여 선언된 변수는 오류 없이 변수가 선언되기 전에 참조 할 수 있다.

```tsx
hoistedVariable; // undefined
var hoistedVariable;

x; // undefined
var x = 3;

// 변수 선언만 호이스팅되기 때문에 var , let , const 로 선언되지 않은 변수는 호이스팅되지 않는다.
y; // Uncaught ReferenceError: unhoistedVariable is not defined
y = true;
```

### let, const

`let` 과 `const` 는 변수를 블록의 상단으로 끌어올리지만 초기화 하지는 않는다. 변수가 선언되기 전에 참조 하면 ReferenceError가 발생

변수는 블록시작부터 선언이 처리될 때까지 ‘temporal dead zone’에 위치한다.

```tsx
console.log(x); // ReferenceError
let x = 3;
```

### function

함수 호이스팅은 함수 선언문에만 적용된다. 함수 표현식은 에러가 발생한다.

```tsx
// 모든 함수 선언이 스코프의 최상단으로 끌어올려지기 때문에 에러 없이 실행된다.
console.log(square(5)); // 25

function square(n) {
	return n * n;
}

console.log(sqaure); // ReferenceError: Cannot access 'square' before initialization

const square = function (n) {
	return n * n;
};
```

### class

class는 호이스팅되지 않는다. 선언되기 전에는 클래스를 사용할 수 없다.

```tsx
new MyClass(); // ReferenceError: Cannot access 'MyClass' before initialization

class MyClass {}
```

### import

호이스팅 되더라도 종속성을 쉽게 확인하기 최상단에서 import 하는 것이 좋다.

```tsx
// Canvas를 import하기 전에 사용해도 에러는 발생하지 않는다.
const myCanvas = new Canvas('myCanvas', document.body, 480, 320);
myCanvas.create();
import { Canvas } from './modules/canvas.js';
myCanvas.createReportList();
```

### 일시적 사각지대 (Temporal dead zone; TDZ)

- let, const, class로 선언된 변수는 스코프의 맨 위에서 변수의 초기화 완료 시점까지 일시적 사각지대에 들어간다고 표현한다.
- TDZ 내부에서는 변수가 값으로 초기화 되지 않으며, 변수에 액세스하려고 시도하면 참조 오류가 발생한다.
- 변수가 선언된 위치에 도달할 때 값으로 초기화된다. 변수에 초기값이 지정되지 않은 경우에는 undefined로 초기화된다.

```tsx
{
	// 스코프의 최상단에서 TDZ 시작
	console.log(bar); // "undefined"
	console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
	var bar = 1;
	let foo = 2; // foo의 TDZ 종료
}
```

- 일시적이라고 표현하는 이유는 코드가 작성된 순서가 아니라 실행 순서에 따라 달라지기 때문

```tsx
// letVar 선언 코드가 letVar를 사용하는 func 함수보다 아래에 위치하지만, 함수의 호출 시점이 TDZ 밖이기 때문에 정상 동작한다
{
	// 스코프의 최상단에서 TDZ 시작
	const func = () => console.log(letVar); // OK

	// TDZ 안에서 letVar에 접근하면 ReferenceError

	let letVar = 3; // letVar의 TDZ 종료
	func(); // TDZ 밖에서 호출함
}
```

- TDZ에 있는 변수에 typeof를 사용해도 ReferenceError

```tsx
typeof i; // ReferenceError: Cannot access 'i' before initialization
let i = 10;

// 아직 선언되지 않은 변수와 undefined 값을 갖는 변수에 typeof를 사용하는 것과는 다름
console.log(typeof undeclaredVariable); // "undefined"
```

출처:

https://web.dev/learn/javascript/data-types/variable#hoisting

https://developer.mozilla.org/ko/docs/Glossary/Hoisting

https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Grammar_and_types

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_hoisting
