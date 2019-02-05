# 리듀서와 순수 함수

+ 리덕스의 리듀서는 **순수 함수**여야 한다.

+ 순수 함수란?

  + 사이드 이펙트가 없다 (API를 호출하거나 지역객체, 지역변수가 아닌 것을 수정하면 안된다. 외부 상태에 영향을 주어서는 안 된다)
  + 동일한 인자에 대해 동일한 값을 반환한다. 
  + 평가 시점이 중요하지 않다. 

+ 순수 함수의 예

  ```javascript
  function add(num1,num2) {
      return num1 + num2;
  }
  ```

  언제 어디서 실행해도 add(10,5)는 항상 15를 리턴하고 외부 상태를 변경하지 않기 때문에 순수 함수이다. 

+ 순수 함수가 아닌 예1

  ```javascript
  let num3 = 10;
  function add(num1, num2) {
      return num1 + num2 + num3;
  }
  add(10,5);
  num3 = 20;
  add(10,5);
  ```

  num3이라는 외부 변수 값이 달라지면 add(10,5)의 결과가 달라지기 때문에 순수 함수가 아니다.

+ 순수 함수가 아닌 예2

  ```javascript
  let num3 = 10;
  function add(num1, num2) {
      num3 = num2;
      return num1 + num2;
  }
  ```

  add 함수의 결과는 항상 일정하지만, num3의 값을 변경하면서 외부 상태에 영향을 주기 때문에 순수 함수가 아니다. 

+ 순수 함수가 아닌 예3 

  ```javascript
  function time() {
      return new Date().toLocaleTimeString();
  }
  ```

  time 함수는 실행할 때마다 현재의 시간이라는 다른 값을 반환하기 때문에 순수 함수가 아니다. Math.random()를 호출하는 경우도 매번 다른 값을 반환하기 떄문에 순수 함수가 아니다. 

+ 순수 함수로 객체를 변경하는 예 

  ```javascript
  let obj1 = {val: 10};
  function add(obj, num) {
      return {val: obj.val + num} 
  }
  console.log(obj1.val); // 10
  let obj2 = add(obj1, 5);
  console.log(obj1.val) // 10
  console.log(obj2.val) // 15
  ```

  객체의 값을 변경할 경우에는 직접 변경하는 것이 아니라 참조하도록 한다. 

+ 리덕스에서 상태를 변화시킬 때도 이미 존재하는 상태 객체를 수정하는 것이 아니라 새로운 객체를 만든다.

+ 리액트 리덕스에서 `connect`는 얕은 참조 검사를 사용하기 때문에 직접 객체를 변화시킨 것은 감지하지 못하며, 다시 렌더링되지 않는다. 