# Class

+ **Class 선언**

  ```javascript
  class Polygon {
      constrctor(height, width) {
          this.height = height;
          this.width = width;
      }
  }
  ```

+ **인스턴스의 생성**

  + 클래스의 인스턴스를 생성하려면 new 연산자와 함께 constructor를 호출한다.
  + 표현식이 아닌 선언식으로 정의한 클래스 이름은 constructor와 동일하다
  + new 연산자를 사용하지 않고 constructor를 호출하면 타입 에러가 발생한다.

  ```javascript
  class Foo {}
  
  const foo = new Foo();
  ```

+ Hoisting

  함수 선언은 호이스팅이 일어나지만, 클래스 선언은 그렇지 않다. 클래스를 사용하기 위해서는 클래스를 먼저 선언 해야 하며, 그렇지 않으면 ReferenceError가 발생

  ```javascript
  var p = new Polygon(); // RefereneceError
  class Polygon {}
  ```

+ **Constructor(생성자)**

  + 인스턴스를 생성하고 클래스 프로퍼티를 초기화하기 위한 특수한 메소드이다. constructor라는 이름을 가진 메소드는 클래스 안에 한 개만 존재할 수 있다. 한 개를 초과하면 SyntaxError 발생

  ```javascript
  class Rectangle {
      constructor(height, width) {
          this.height = height;
          this.width = width;
      }
      get area() {
          return this.calcArea();
      }
      calcArea() {
          return this.height * this.width;
      }
  }
  
  const square = new Rectangle(10, 10);
  ```

+ **클래스 프로퍼티**

  + 클래스 바디에는 메소드만 선언할 수 있다. 클래스 바디에 프로퍼티(인스턴스 필드, 멤버 변수)를 선언하면 문법 에러가 발생한다. 클래스 프로퍼티의 선언과 초기화는 반드시 constructor 내부에서 실시한다.

  ```javascript
  class Foo {
      name = ''; //SyntaxError
  	constructor() {}
  }
  ```

  

+ **클래스 상속**

  + 새롭게 정의할 클래스가 기존에 있는 클래스와 매우 유사하다면, 상속을 통해 그대로 사용하되 다른 점만 구현
  + **extends를 통한 클래스 상속**
    + extends 키워드는 부모 클래스(base class)를 상속받는 자식 클래스(sub class)를 정의할 때 사용
  + **super를 통한 상위 클래스 호출**
    + super 키워드는 부모 클래스를 참조(Reference)할 때 또는 부모 클래스의 constructor를 호출할 때 사용한다.
    + 자식 클래스의 constructor에서 super()를 호출하지 않으면 this에 대한 참조에러가 발생한다

  ```javascript
  class Car {
      constructor({name}) {
          this.name = name;
      }
      drive() {
          return 'mycar' + this.name;
      }
  }
  
  class Newcar extends Car {
      constructor(options){
          super(options);
          this.color = options.color;
      }
      honk(){
          return 'pupu';
      }
  }
  
  const car = new Car({name: 'Subaru 360'});
  console.log(car.name);
  console.log(car.drive());
  const newcar = new Newcar({color: 'red', name: 'Subaru 360'});
  console.log(newcar.name);
  console.log(newcar.color);
  console.log(newcar.honk());
  ```

+ **참고**
  + https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes
  + https://poiemaweb.com/es6-class