# 화살표 함수

+ 화살표 함수는 function 키워드 대신 화살표(=>)를 사용하여 함수 선언 가능

+ 화살표 함수는 익명 함수로만 사용할 수 있다. 화살표 함수를 호출하기 위해서는 함수 표현식을 사용한다. 

  ```javascript
  const pow = x => x * x;
  ```

+ this

  + 일반 함수의 this

    + 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다.
    + 함수가 생성자인 경우는 this는 새로운 객체, 엄격 모드에서는 undefined, 함수가 객체 메서드로 호출된 경우 문맥 객체, 콜백 함수 내부의 this는 전역객체 window 

    ```javascript
    function Person() {
        // Person() 생성자는 'this'를 자신의 인스턴스로 정의
        this.age = 0;
        // 비엄격 모드에서, growUp() 함수는 'this'를 전역객체로 정의하고, 
        // 이는 Person() 생성자에 정의된 'this'와 다름.
        setInterval(function growUp() {
            this.age++;
        }, 1000);
    }
    
    var p = new Person();
    ```

    + this를 비전역 변수에 할당하여 해결하는 방법

    ```javascript
    function Person() {
      var that = this;
      that.age = 0;
      setInterval(function growUp() {
        that.age++;
      }, 1000);
    }
    ```

    + 화살표 함수는 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정된다. 화살표 함수의 this는 언제나 상위 스코프의 this를 카리킨다. 이를 Lexical this라고 한다.

    ```javascript
    function Person() {
        this.age = 0;
        
        setInterval(() => {
            this.age++ // this는 person 객체를 참조한다
        }, 1000);
    }
    var p = new Person();
    ```

+ 화살표 함수를 사용해서는 안되는 경우

  + 메소드 

    ```javascript
    const person = {
        name: 'Lee',
        sayHi: () => console.log(`Hi ${this.name}`) // 여기서 this는 상위 컨텍스트인 전역 객체 window를 가리킨다.
    }
    
    person.sayHi(); // Hi undefined 
    ```

  + prototype

    화살표 함수로 객체의 메소드를 정으하였을 떄와 같은 문제가 발생한다. 

  + 생성자 함수

    생성자 함수는 prototype 프로퍼티를 가지며 prototype 프로퍼티가 가리키는 프로토타입 객체의 constructor를 사용한다. 하지만 화살표 함수는 prototype 프로퍼티를 가지고있지 않다.

  + addEventListener 함수의 콜백 함수

    화살표 함수를 사용하면 this가 상위 컨텍스트인 window를 가리킨다. 일반 함수를 사용해야지만 addEventListener 함수의 콜백 함수 내부의 this가 이벤트 리스너에 바인딩된 요소를 가리킨다. 

+ 참고

  https://poiemaweb.com/es6-arrow-function

  https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/%EC%95%A0%EB%A1%9C%EC%9A%B0_%ED%8E%91%EC%85%98