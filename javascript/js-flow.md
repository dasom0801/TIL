# Javascript 핵심 개념 알아보기 - JS Flow

[Javascript 핵심 개념 알아보기 - JS Flow (인프런)](https://www.inflearn.com/course/핵심개념-javascript-flow#)

1. [Data types](#1-data-types)
2. [Function](#2-function)
3. [this](#3-this)
4. [Closure](#4-Closure)
5. [prototype](#5-prototype)
6. [Class](#6-Class)

### 1. Data types

- primitive type

  - number, string, boolean, null, undefined, symbol

  - 값이 그대로 할당된다.

  - 변수를 선언하면 컴퓨터는 메모리 안에 데이터가 담길 공간을 확보한다. 그 다음 확보한 공간의 주소를 변수명과 매칭시킨다. 변수에 값을 할당하는 명령을 만나면, 변수를 찾아서 변수와 매칭되어있는 주소를 읽고 그 주소로 가서 값을 넣는다.

    선언: 공간을 확보하고 변수명에 주소를 매칭한다.

    할당: 해당 주소의 공간에 데이터를 저장한다.

- reference type

  - Object (Array, Fuction, RegExp)

  - 값이 저장된 주소값이 할당된다.

  - 선언 과정은 기본형과 동일하다. 객체 자체를 위한 공간의 확보와 각 값을 넣기 위한 공간, 프로퍼티 값의 주소를 매칭시키기 위한 공간이 필요하다. 하기 객체 obj는 값들의 주소를 매칭시킨 공간 `{a: 주소1, b: 주소2}` 이 필요하고 각 주소에 값을 넣는다. `{주소1: 1}`, `{주소2: 'b'}`

    ```javascript
    var obj = {
        a = 1,
        b = 'b'
    };
    ```

  - 객체에 객체를 할당한 경우(예: `var obj2 = obj`) obj2를 위한 공간을 확보하고 주소를 변수와 매칭시킨 다음 obj가 가리키고 있는 데이터의 주소를 obj2에 할당한다.

    <u>객체는 어딘가 따로 저장되어 있고, 그 객체가 복사되어 있는 주소만 복사해 온 것이다.</u>

    프로퍼티의 값을 변경할 때 `obj2.a = 10` 주소를 찾아가서 값을 변경하기 때문에 `obj.a`도 10이 된다.

    obj2는 새로운 객체를 만들어낸 것이 아니라 원래 obj가 가리키고 있던 객체를 함께 바라보는 것이다. obj와 obj2는 같은 객체를 참조하고 있다.

  - 참조안에 참조가 있는 경우 기본형 데이터가 나올 때까지 공간을 확보하고 주소를 매칭하는 것을 반복한다.

    ```javascript
    var obj3 = {
    	a: [4, 5, 6],
    };
    ```

    obj3을 위한 공간 확보 => 주소 매칭 => 프로퍼티 a를 위한 공간 확보 => 주소 매칭 => 배열을 위한 공간 확보 => 4, 5, 6 값이 있는 주소 연결.

    프로퍼티 a의 값을 기본형 데이터로 변경하면( `obj3.a = 'new'` ) 4,5,6 값이 있던 자리는 링크가 사라지게 된다. <u>이 주소를 참고하고 있는 곳이 어디에도 없다. 가비지 콜렉터(메모리 청소기)의 청소 대상이 되어 사라지게 된다.</u>

### 2. Function

#### 2-1. Hoisting

JS엔진은 코드를 실행하기 전 단계로 코드 전반에 걸쳐서 선언된 내용들이 있는지를 쭉 훑어보고 발견하는 족족 끌어올린다. <u>함수 선언문은 통째로 끌어올리고 함수 표현식은 선언만 끌어올린다.</u> 할당은 끌어올리지 않는다. 선언되기 전에 실행하려고 하면 함수 선언문은 실행되지만, 함수 표현식은 undefined가 되어 에러가 발생한다.

```javascript
console.log(a());
function a() {
	console.log('a');
}
console.log(b()); // undeinfed, b is not a function
var b = function b() {
	console.log('b');
};
```

#### 2-2. 함수 선언문 vs 함수 표현식

- 함수 선언문(Function declaration)

  ```javascript
  function a() {
  	return 'a';
  }
  ```

- 기명 함수 표현식(Named function expression)

  ```javascript
  var b = function bb() {
  	return 'b';
  };
  ```

- (익명) 함수 표현식(Annonymous function expression)

  ```javascript
  var c = function () {
  	return 'c';
  };
  ```

  최신 브라우저들은 함수명이 비어있을 경우에 자동으로 변수명을 name property에 할당한다

함수 선언문과 함수 표현식의 차이는 할당에 있다. 할당을 하지 않으면 함수 전체가 호이스팅의 대상이고 할당을 하면 변수만 호이스팅의 대상이된다.

동일한 이름의 함수 선언문이 있을 경우 모든 함수 선언문이 호이스팅 된 다음 덮어쓰기되어 마지막 함수만 살아남기 때문에 의도한 것과는 다르게 동작할 수 있다. 함수 표현식을 쓰는 것을 권장.

#### 2-3. Function scope, execution context

- 스코프
  - 변수의 유효 범위
  - 함수가 정의될 때 결정된다.
- 실행 컨텍스트
  - 실행되는 코드 덩어리(추상적 개념)
  - 함수가 실행될 때 생성된다.
  - 호이스팅된 이후의 함수 본문 내용과 this가 무엇인지에 대한 정보가 담긴다. 사용자가 함수를 호출했을 때에 내부적으로 해당 함수를 실행하기 위해서 필요한 것들을 모아둔다.

```javascript
var a = 1;

function outer() {
	console.log(a); // 1

	function inner() {
		console.log(a); // undefined; 아래에 선언한 a가 호이스팅 되기 때문에
		var a = 3;
	}

	inner();
	console.log(a); //3
}
outer();
console.log(a); //3
```

#### 2-4. Method

함수와 메소드의 차이점은 this 바인딩 여부

```javascript
var obj = {
    a: 1,
    b: function bb() {
        console.log(this);
    }
    c: function cc() {
        console.log(this.a);
    }
};
obj.b();
obj.c();

```

#### 2-5. Callback function

무언가가 이 함수를 실행서 돌려준다. 콜백은 제어권을 누군가에게 맏긴다. 콜백 함수를 어떻게 처리할지는 제어권을 넘겨받은 대상에게 달려있다.

```javascript
setInterval(function () {
	console.log('1초마다 실행');
}, 1000);
```

```javascript
arr.forEach(
	function (v, i) {
		entries.push([i, v, this[i]]);
	},
	[10, 20, 30, 40, 50]
);
```

콜백 함수의 파라미터의 순서는 제어권을 넘겨받은 대상의 규칙을 반드시 따라야한다. 그렇지 않는 경우 원하지 않는 엉뚱한 결과를 얻게된다.

```javascript
function cbFunc(x) {
	console.log(this, x); //this는 HTML Element, x는 mouse event.
}

document.getElementById('a').addEventListener('click', cbFunc);
```

addEventListener의 규칙에 callback 함수의 첫번째 인자는 event 객체, callback 함수 내부에서 this는 Event Target으로 하도록 정해져있다.

**콜백함수의 특징**

- 다른 함수(A)의 매개변수로 콜백함수(B)를 전달하면, A가 B의 제어권을 갖게된다.
- 특별한 요청(bind)이 없는 한 A에 미리 정해진 방식에 따라 B를 호출한다.
- 미리 정해진 방식이란 this에 무엇을 바인딩할지, 매개 변수에는 어떤 값들을 지정할지, 어떤 타이밍에 콜백을 호출할지등.
- 메소드를 콜백 함수로 전달하는 경우 this가 달라짐에 따라 여러가지 문제가 발생할 수도 있다.

### 3. this

- 전역공간

  - this는 전역객체(브라우저: window, node.js: global)

- 함수 내부

  - this는 기본적으로 전역 객체

- 메소드

  - this는 메소드를 호출한 주체

  - 메소드에 내부 함수가 있을 때

    ```javascript
    var a = 10;
    var obj = {
        a: 20;
        b: function() {
            console.log(this.a) // 20
            funciton c() {
                console.log(this.a) // 10
            }
            c()
        }
    }
    obj.b();
    ```

    b는 메소드이기 때문에 this는 obj이고, c는 function이기 때문에 this는 전역 객체이다.

    ```javascript
    var a = 10;
    var obj = {
        a: 20;
        b: function() {
            var self = this;
            console.log(this.a) // 20
            funciton c() {
                console.log(self.a) // 20
            }
            c()
        }
    }
    obj.b();
    ```

- callback

  - this는 기본적으로 함수내부와 동일

  - callback의 제어권을 넘겨받은 함수나 메소드가 this를 다른 것으로 명시하면 다른 결과가 나온다.

  - callback의 제어권을 넘겨 받은 함수나 메소드가 this를 어떻게 할지 정해놓더라도 this binding을 하면 그 규칙을 무시할 수 있다.

    ```javascript
    var callback = function () {
    	console.log(this);
    };

    var obj = {
    	a: 1,
    	b: function (cb) {
    		cb.call(this); // obj
    	},
    };
    obj.b(callback);
    ```

- call, apply, bind

  ```javascript
  function a(x, y, z) {
  	console.log(this, x, y, z);
  }

  var b = {
  	c: 'eee',
  };
  a.call(b, 1, 2, 3);
  a.apply(b, [1, 2, 3]);
  var c = a.bind(b);
  c(1, 2, 3);
  var d = a.bind(b, 1, 2);
  d(3);
  ```

  함수를 실행할 때 그 안에서 this를 첫번쨰 인자로 인식하게 한다고 개발자가 직접 명시한다. call과 apply는 즉시 호출하는 명령. bind는 새로운 함수를 생성할 뿐 호출하지는 않는다.

- 생성자 함수

  - this는 인스턴스

### 4. Closure

#### 4-1. 클로저의 정의

- 함수와 그 함수가 선언될 당시의 환경 정보의 조합
- 클로저는 scope(변수의 유효범위)와 밀접한 연관이 있다. 클로저는 유효범위로 인한 현상/상태가 된다. => 함수 내부에서 생성한 데이터와 그 유효범위로 인해 발생하는 특수한 현상/상태
- 스코프에서 외부에 정보를 제공할 수 있는 유일한 수단은 해당 정보를 return하는 것. 함수를 return하더라도 최소 선언시에 생성된 스코프와 환경정보는 변하지 않는다. <u>최초 선언시의 정보를 유지한다.</u>
- 이점
  - 접근 권한 제어
  - 지역 변수 보호
  - 데이터 보존 및 활용

```javascript
function a() {
	var x = 1; // a의 외부에서는 접근할 수 없지만, b의 내부에서 접근 가능하다.
	return function b() {
		console.log(x);
	};
}

var c = a(); //
console.log(c()); // 반환된 함수를 통해서 a의 외부에서 내부의 값을 출력할 수 있다. 값을 임의로 바꿀 수는 없다. 바꾸기 위해서는 권한이 필요하다.
```

```javascript
funcation a() {
    var _x = 1;
    reutrn {
        get x() { return _x; },
        set x(v) { return _x = v; }
    }
}

var c = a();
c.x = 10; // 외부에서도 a 내주에 있는 x라는 프로퍼티를 변경할 수 있다.
```

내부에서 반환을 통해 권한을 주면 외부에서는 부여받은 권한을 통해 내부와 소통할 수 있게된다. \_x라는 변수명은 외부에 노출되지 않는다. getter와 setter를 어떻게 설정하느냐에 따라서 \_x에 영향을 줄 수도, 안 줄 수도 있다.

무엇을 보여줄지, 요구를 들어줄지 여부, 요구에 어떤 방식으로 반응할지를 a 함수가 결정한다. 스코프는 정의될 때 결정된다. 그렇기 때문에 정의되었을 때의 정보를 그대로 유지할 수 있다.

```javascript
function setCounter() {
	var count = 0;
	return function () {
		return ++count;
	};
}

var count = setCounter();
count();
// 이미 생명주기가 끝난 외부함수의 변수를 참조할 수 있다.
```

#### 4-2. 지역변수 만들기

1. 외부로부터 접근을 제한한다.

2. 전역 스코프의 변수를 최소화하는데 도움이 된다.

**클로저를 활용해서 private 멤버와 public 멤버를 구분하는 방법**

1. 함수에서 지역변수 및 내부함수 등을 생성한다.

2. 외부에 노출시키고자 하는 멤버들로 구성된 객체를 return한다.

   => return한 객체에 포함되지 않는 멤버들은 전부 private

   => return한 객체에 포홤된 멤버들은 public

```javascript
var createCar = function (f, p) {
	var fuel = f;
	var power = p;
	var total = 0;
	return {
		run: function (km) {
			var wasteFuel = km / power;
			if (fuel < wasteFuel) {
				console.log('이동 불가');
				return;
			}
			fuel -= wasteFuel;
			total += km;
		},
	};
};

var car = createCar(10, 2);
```

### 5. prototype

#### 5-1. prototype, constructor, **proto**

생성자 함수가 있을 때, new 연산자를 써서 인스턴스를 만들면 생성자 함수의` prototype`이라는 프로퍼티가 인스턴스의 `__proto__`라는 프로퍼티에 전달된다. 생성자 함수의 `prototype`과 인스턴스의 `__proto__`프로퍼티는 같은 객체를 참조한다. `__proto__` 프로퍼티를 생략하고 `prototype`이 인스턴스에 연결된 것처럼 쓸 수 있다.

예) 배열 [1, 2, 3]

- `__proto__`는 js가 생성한 프로퍼티, `__proto__`에는 `concat()`, `filter()`, `forEach()`등 Array의 prototype에 있던 프로퍼티들이 있다.
- `__proto__`의 constructor는 Array()
- `[1,2,3].constructor`는 Array()이고 `[1,2,3].__proto__.constructor`도 Array()이다.

#### 5-2. 메소드 상송 및 동작원리

```javascript
function Person(n, 3) {
    this.name = n;
    this.age = a;
}

Person.prototype.setOlder = function() {
    this.age += 1;
}
Person.prototype.getAge = function() {
    return this.age;
}
var aa = new Person('aa', 30);
aa.__proto__.setOlder();
aa.__proto__.getAge(); // NaN 이때 this는 aa가 아니라 aa.__proto__이기때문
//__proto__는 생략 가능하니까
aa.setOlder();
aa.getAge() // 31
```

#### 5-3. prototype chaning

Array.prototype의 프로타입에는 배열 메소드가 모두 담겨져있다. Array의 prototype은 객체. 프로토타입이 객체라는 것은 Object 생성자를 통해서 생성된 것이라는 의미 Object.prototype을 상속 받는다. 배열은 Obejct.prototype에 있는 메소드를 사용할 수 있다.

Object.prototype에는 JS 전체의 공통된 메소드들, `hasOwnProperty()`, `toString()`, `valueOf()`, `isPrototypeOf()`이 있다. 모든 데이터 타입들이 프로토타입 체이닝을 통해서 접근 가능.

Object.prototype에 메소드들을 정의하면 모든 데이터 타입들이 상송받기 때문에 객체 타입만이 사용할 메소드들은 Object 생성자에 직접 정의되어 있다. `Object.porytype.~`이 아닌 `Object.~`가 많은 이유.

### 6. Class

#### 6-1. 클래스

- 인스턴스: 공통의 속성을 지닌 구체적인 대상
- 클래스: 인스턴스들의 공통 속성을 모은 추상적인 개념
- 상위의 클래스를 먼저 정의해야 하위 클래스와 인스턴스를 정의할 수 있다. 상위 클래스의 속성을 지니면서 더 구체적은 속성을 가지는 하위 클래스를 정의한다.
  | 음식 | 과일 |
  | ----------- | ----------- |
  | 상위 클래스 | 하위 클래스 |
  | super class | sub class |
- 예) Array 생성자 함수
  - prototype이 아닌 Array 생성자에 직접 할당된 프로퍼티를 static methods, static properties라고 한다. Array 생성자 함수를 new 없이 호출할 때만 의미있다.
    `isArray()`, `of()`, `arguments` 등
  - prototype 내부에 정의된 메소드는 인스턴스에서 다이렉트로 접근가능하다. 생성자 함수 내부에 있는 프로퍼티는 다이렉트로 접근할 수 없다.

#### 6-2. 클래스 상속

- Person이라는 클래스를 employee 클래스가 상속 받으려면? `Employee.prototype = new Person()` 은 기존에 있던 employee.prototype 객체를 완전히 새로운 객체로 대체해버린다. 원래 가지고 있던 기능을 다시 부여해야 한다. `Employee.prototype.constructor = Employee` => 서로 다른 두 클래스가 super, sub 클래스 관계를 갖게 된다.

```javascript
function Person(name, age) {
	this.name = name || '이름 없음';
	this.age = age || '나이 모름';
}
Person.prototype.getName = function () {
	return this.name;
};
Person.prototype.getAge = function () {
	return this.age;
};
function Employee(name, age, position) {
	this.name = name || '이름 없음';
	this.age = age || '나이 모름';
	this.position = position || '직책 모름';
}
Employee.prototype = new Person();
Employee.prototype.constructor = Employee;
Employee.prototype.getPosition = function () {
	return this.position;
};
var dasom = new Employee('dasom', 32);
```

- age나 name이 class의 prototype에 담겨있는 것은 좋지않다. 실수로 인스턴스의 name 프로퍼티를 지우고 getName을 호출하면 undefined가 호출되어야 할 상황이지만, prototype chaining을 통해서 prototype의 name이 반환된다. prptotype에 프로퍼티가 아닌 메소드만 존재하도록 한다.
  ```javascript
  function Bridge() {}
  Bridge.prototype = Person.prototype;
  Employee.prototype = new Bridge();
  Employee.prototype.constructor = Employee;
  Employee.prototype.getPosition = function () {
  	return this.position;
  };
  ```
- 함수화 시키기
  ```javascript
  var ExtedClass = (function() {
    function Bridge() {
      return function(Parent, Child) {
        Bridge.prototype = Parent.prototype;
        Child.prototype = new Bridge();
        Child.prootype.constuctor = Child;
      }
    }
  })();
  extends Class(Person, Employee);
  ```
- ES6 Class
  ```javascript
  class Person {
  	constructor(name, age) {
  		this.name = name || '이름 없음';
  		this.age = age || '나이 모름';
  	}
  	getName() {
  		return this.name;
  	}
  	getAge() {
  		return this.age;
  	}
  }
  class Employee extends Person {
  	constructor(name, age, position) {
  		super(name, age);
  		this.position = position || '직책 모름';
  	}
  	getPosition() {
  		return this.position;
  	}
  }
  ```
