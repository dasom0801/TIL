# bind

+ **bind()**

  + `bind()` 메소드는 새로운 함수를 생성하고, 그 함수를 호출할 때 제공된 값을 `this` 키워드로 추가하여 호출한다.  

  + 구문

    > function.bind(thisArg[, arg1[, arg2[, ...]])

    + thisArg :  바인드된 함수를 호출할 때, 타겟 함수에 this 인수로 전달된 값. 바인드된 함수가 `new`연산자로 생성된 경우 이 인수는 무시된다. bind에 인수가 제공되지 않은 경우 실행 스코프의 this를 새로운 함수를 위한 thisArg로 취급한다.

+ 바인드된 함수 생성

  ```javascript
  this.x = 9 // 여기서 this는 브라우저의 글로벌인 window 객체
  var module = {
      x: 81,
      getX: function() { return this.x;}
  };
  
  module.getX(); //81
  
  var retrieveX = module.getX;
  retriveX(); // 이 함수는 글로벌 스코프에서 호출되었기 때문에 9를 반환한다
  
  //this를 module에 연결한 새로운 함수를 생성
  var boundGetX = retriveX.bind(module);
  boundGetX(); // 81
  ```

+ 부분적으로 적용된 함수

  인수가 적용된 함수를 생성함. 이러한 인수는 `this`값의 뒤에 온다. (생략가능) 연걸된 함수가 언제 호출되어도 지정된 인수를 선두로하여 연결된 함수의 인수가 타겟 함수로 전달된다.

  ```javascript
  function list() {
      return Array.prototype.slice.call(argument);
  }
  var list1 = list(1,2,3); //[1,2,3]
  
  //인수가 프리셋된 함수를 만든다
  var leadingThirtysevenList = list.bind(null, 37);
  
  var list2 = leadingThirtysevenList(); //[37]
  var list3 = leadingThirtysevenList(1,2,3); // [37, 1, 2, 3]
  ```

+ setTiemout과 함께 사용

  window.setTimeout() 내부의 `this`키워드는 window(혹은 global객체)로 설정된다. 클래스 인스턴스를 참조하는 `this`가 필요한 클래스 메소드를 사용하는 경우, `this`를 콜백 함수로 명확하게 연결하여 인스턴스를 유지할 수 있다. 

  ```javascript
  function LateBloomer() {
      this.petalCount = Math.floor(Math.random() * 12) + 1;
  }
  
  // 1초지연시킨다음 bloom을 선언함
  LateBloomer.prototype.bloom = function() {
      window.setTimeout(this.declare.bind(this), 1000);
  }
  
  LateBloomer.prototype.declare = function() {
      console.log('I am a beautiful flower with' + this.petalCount + 'petals!');
  }
  
  var flower = new LateBloomer();
  flower.bloom();
  ```

+ 참고

  + https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind

  