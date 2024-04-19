# ES6+ 기초편 3회차

> 코드스피츠77 - ES6+ 기초편 3회차<https://www.youtube.com/watch?v=xTaCosid1-k&list=PLBNdLLaRx_rIF3jAbhliedtfixePs5g2q&index=4>

### INTERFACE IN JS

1. 인터페이스란 사양에 맞는 값과 연결된 속성의 셋트
2. 어떤 Object라도 인터페이스의 정의를 충족시킬 수 있다. 
3. 하나의 Object가 여러개의 인터페이스를 충족시킬 수 있다. 

#### INTERFACE TEST

1. test라는 키를 갖고있고

2. 값으로 문자열 인자를 1개 받아 boolean 결과를 반환하는 함수가 온다.

   ```javascript
   {
       test(str) {
           return true; 
       }
   } // TEST 인터페이스를 준수함
   ```

+ JS내부에서는 이미 여러가지 인터페이스를 정의하고 있다.
+ JS의 인터페이스: 어떤 키에 뭐가 들어가 있는데 그게 뭐다를 정의하는 것.

### ITERATOR INTERFACE

1. next라는 키를 갖고
2. 값으로 인자를 받지않고 IteratorResultObject를 반환하는 함수가 있다. 
3. IteratorResultObject는 value와 done이라는 키를 갖고있다.
4. 이중 done은 계속 반복할 수 있을지 었을지에 따라 boolean값을 반환한다.

=> 이 조건을 만족하면 ITERATOR 객체

```javascript
// Iterator interface 조건을 만족하는 간단한 예 
{
  next() {
      return { value: 1, done: false};
  }
}
```

```javascript
// 배열의 숫자를 하나씩 출력하는 예
{
    data: [1,2,3,4],
    next() {
        return {
            done: this.data.length === 0,
            value: this.data.pop()
        }
    }
}
```

### ITERABLE INTERFACE

1. Symbol.iterator라는 키를 갖고(Symbol은 ES6에 추가된 원시타입. 객체가 아니라 값으로 인식됨. )

2. 값으로 인자를 받지 않고 Iterator Object를 반환하는 함수가 온다.

   ```javascript
   {
       [Symbol.iterator]() {
           return {
               next() {
                   return {
                       value: 1,
                       done: false
                   };
               } // iterator interface를 준수하는 객체(iterator 객체)를 반환하고 있음.
           }
       }
   }
   ```

+ 여러번 루프를 돌 때 루프를 위한 변수와 원본 data를 구분해서 iterator를 잘 구축하라고 terable이 개입하는 것. iterable이 iterator를 요청하는 행위에서 iterator 객체를 새로만들거나 어떤 data를 리셋할 기회를 준다. 그래야 루프를 여러번 돌려도 객체가 깨지지 않음

### LOOP TO ITERATOR

+ 문은 실행하면 사라지기 때문에 다시 반복할 수 없다. 문을 다시 쓰든지 함수를 만들어서 호출하든지 해야함. 

+ 여러번 재현하거나 중간에 멈추거나 루프라는 행위 자체를 객체화하고 싶기때문에 루프를 식으로 바꾸고 싶음. 

+ 현대 언어의 기본적인 패러다임은 문을 제거하고 식으로 바꿔버리는 것. 문을 함수에 담아두면 기본적인 플로우를 타지않고 내가 원하는 타이밍에 마음대로 실행할 수 있다. 

+ 이터레이터 패턴: for와 while문을 식이나 값으로 바꾸고 싶다 > 반복 전용에 해당되는 객체로 바꿔준다.
```javascript 
let arr = [1,2, 3, 4];
while (arr.length > 0) { // 계속 반복할지 판단
    console.log(arr.pop()); // 반복시마다 처리
}
```

+ 이터레이터 객체와 next()의 객체가 반복 자체를 하진 않지만, 외부에서 얘를 이용해서 반복하려고하면 이 안에 반복할지말지 내용도 있고 반복했을 때 어떤일을 해야하는지 내용도 들어있다. 

+ self description 내 자신이 루프를 얼만큼 돌려야 할지를 알고있다. 

+ while문은 실행하고 끝나지만, 이터레이터는 self description을 통해서 반복하기 때문에 몇번이나 반복할 수 있다. 

+ 반복 자체는 하지않지만, 외부에서 반복을 하려고할때 <u>반복에 필요한 조건과 실행을 미리 준비해둔 객체</u>를 갖고있는 것이 이터레이터 객체.

+ 반복행위(직접 루프를 도는 것) 와 반복을 위한 준비(반복여부 판단, 반복시 처리)를 분리했다. 

+ 이터레이터 객체를 사용하는 이유: 똑같은 루프를 만들어내는 것은 쉽지 않기 때문에 두번째에 똑같은 것을 성공할 가능성이 낮다. 이터레이터는 한번만 이터레이터 객체를 잘짜면 몇번을 반복해도 언제나 똑같이 안정적이다. 

### ES6+ Loop

```javascript
// 사용자 반복처리기. 직접 이터레이터 반복 처리기 구현
const loop = (iter, f) => {
    // 이터러블인지 검증, 이터러블이라면 이터레이터를 얻는다.
    if (typeof iter[Symbol.iterator] === 'function') {
        iter = iter[Symbol.iterator]();
    } else return;
    // 이터레이터 객체가 아니라면 건너뜀, 이터레이터 객체라면 next 호출가능
    if (ypeof iter.next != 'function') return;
    do {
        const v = iter.next();
        if(v.code) return; //종료처리
        f(v.value); //현재값을 전달함
    } while(true); // while은 반복한다는 행위말고는 아무것도 하지않는다.
}

const iter = {
    arr: [1, 2, 3, 4],
    [Sympol.iterator] () {return this};
    next() {
        return {
            done: this.arr.length === 0,
            value: this.arr.pop()
        };
    }
}; // 이터러블 객체

loop(iter, console.log); 
```

### 언어의 지원

+ 언어가 iterator interface에 대해서 처리해주는 내장 기능이 있다 iterator에 대한 스팩만 충족하면 언어가 제공하는 문법적인 요소를 사용할 수 있다. 

  #### Array destructuring(배열 해체)

  ```javascript
  const [a, ...b] = iter; // iter을 가상의 배열로 보고 첫번째 리턴이 a, 나머지가 b가 된다.
  console.log(a, b); // 4, [3,2,1]
  ```

  #### Spred

  ```javascript
  const a = [...iter];
  console.log(a); // [4,3,2,1]
  ```

  #### Rest Parameter(나머지 인자)

  ```javascript
  const test(...arg) => console.log(arg);
  test(...iter); // [4, 3, 2, 1]
  ```

  #### for of

  반복에만 집중해주는 for, done은 알아서 처리해주고 value만 추출해준다.

  ```javascript
  for(const v of iter) {
      console.log(v);
  } 
  // 4
  // 3
  // 2
  // 1
  ```

### PRACTICE

+ 제곱근을 요소로 갖는 가상 컬렉션

  ```javascript
  const N2 = class {
      constructor(max) {
          this.max = max;  
      }//무한루프가 걸리면 곤란하기 때문에 max 조건을 걸어라. 이터레이터 객체는 스스로 안전 장치를 가지고 있어야 한다.
      [Symbol.iterator]() {
          let cursor = 0, max = this.max;
          return {
              done: false,
              next() {
                  if(cursor > max) {
                      this.done = true; //무한루프에 빠지지 않기위한 안전장치
                  } else {
                      this.value = cursor * cursor;
                      cursor++;
                  }
              	return this;
              }; // 이 객체는 iterlator 객체임과 동시에 IteratorResultObject이기도 함. next()가 있으니까 iterator를 만족. done과 value를 가지고있으니까 IteratorResultObject.
          };
      }
  }
  ```

  함수는 함수가 만들어질때 함수 밖에 있는 변수들을 캡쳐해서 마치 지역변수 처럼 쓸수있는 권한이 있다. 이처럼 내 지역의 변수도 아니고, 내 인자도 아닌데 참고 할 수 있는 것이 **자유변수** 

  next() 함수는 자유변수(cursor, max)를 사용할 수 있다. 자유변수가 잡혀서 사용되는 공간이 클로저. 지역변수를 캡쳐했기때문에 Symbol.iterator를 호출할 때마다 제각각 다른 변수가 만들어질텐고 그때마다 태어난 함수도 제각각 다른 지역변수를 자유변수로 캡쳐해두고있을 것이다. 

### ITERATOR GENERATOR

이터레이터 구현을 돕는다

```javascript
const generator = function*(max) {
    let cursor = 0;
    while (cursor < max) {
        yield cursor * cursor;
        cursor++;
    }
};
```

제너레이터 함수를 호출할 때마다 이터레이터가 만들어진다. 제너레이터가 만드는 이터레이터는 동시에 이터러블이기도 하다. 제너레이터 안이 아니면 yield를 사용할 수 없다. yield가 호출될 때 next가 반환되는 것과 똑같은 효과를 낼 수 있다.

  

