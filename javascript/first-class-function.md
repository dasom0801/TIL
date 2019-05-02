# First class function

+ 1급 시민(first class citizen)

  + 변수에 담을 수 있다. 

    ```javascript
    // 익명함수를 변수에 할당
    const foo = function() {
       console.log("foobar");
    }
    // 변수를 사용하여 호출
    foo();
    ```

  + 인자로 전달할 수 있다.

    ```javascript
    function sayHello() {
       return "Hello, ";
    }
    function greeting(helloMessage, name) {
      console.log(helloMessage() + name);
    }
    // `sayHello`를 `greeting` 함수에 인자로 전달
    // 다른 함수에 인자로 전달된 함수를 콜백 함수 라고 함. sayHello 는 콜백 함수.
    greeting(sayHello, "JavaScript!");
    ```

  + 반환값으로 전달할 수 있다.

    ```javascript
    function sayHello() {
       return function() {
          console.log("Hello!");
       }
    }
    ```

    함수를 반환하는 함수를 **Higher-Order Function**이라고 부른다.

+ 1급 객체(first class object)

  + 특정 언어에서 객체를 1급 시민으로써 취급

+ 1급 함수(first class function)

  + 함수를 1급 시민으로 취급
  + 1급 시민의 조건에 추가되는 조건
    + 런타임에 생성이 가능하다
    + 익명으로 생성이 가능하다