# ES6+ 기초편 2회차

>코드스피츠77 - ES6+ 기초편 2회차 1/2 <https://www.youtube.com/watch?v=FP9LBhPD4eo&list=PLBNdLLaRx_rIF3jAbhliedtfixePs5g2q&index=2>
>
>코드스피츠73 - ES6+ 2회차 2/2 <https://www.youtube.com/watch?v=U6dmAT8KImY&feature=youtu.be>

---------------------------

## FLOW CONTROL STATEMENT

+ 제어문: flow를 제어한다.
+ flow: 명령이 차근차근 실행되는 과정
+ flow control: 메모리에 프로그램이 실행되면 건드릴 수 없는데 여기에 관여하겠다는 것

### RECORD/COMPLETION RECORD

+ 자바스크립트는 문과 식을 다르게 해석한다. 식은 하나의 값으로 해석된다. 문은 실행 단위로 해석된다.
+ 레코드: JS엔진은 우리가 문을 작성하면 그 개수만큼을 자신이 처리해야할 과제로 알고있다. 이때 이 과제가 레코드이다. 하나하나 레코드가 생기면 이 레코드들이 플로우를 따라 움직이게 된다. 
+ conpletion record: 일반적으로 레코드는 순서대로 쭉 흘러가는데 flow를 제어하면 레코드를 선택하거나 레코드를 순환시키는 권한을 가지게된다.  flow control이 가능한 문을 레코드로 바꿀때눈 conpletion record가 된다. 
+ conpletion record는 무슨 레코드를 선택할지 flow에 관여할 수 있다. 
+ 문은 컴파일러에게 주는 힌트일 뿐. if나 for문을 쓰면 값으로 바뀌지 않고 completion record가 어떻게 작동할지 js에게 알려주는 힌트가 된다. js는 힌트를 받아서 내부적으로 flow흐름도를 만드는 copletion rcord를 생성한다.

### DIRECT FLOW CONTROL

+ ABC언어의 특징: FLOW CONTROL을 하기 위한 별도의 문법을 제공하고있다. if, switch, for, while > 이걸 지원하면 ABC언어의 후손

  #### LABEL

+ ABC 언어의 후손에게 남아있는 유일한 직접 FLOW CONTROL 명령

+ LABEL의 이름규칙은 $를 포함할 수 없다는 것만 빼면 JS변수 이름 규칙과 동일하다(첫글자 알파벳, _  그 이후에는 알파벳, 숫자, _가 올 수 있다.)

+ LABEL외에 실제로 존재하는 문이없으면 에러가 발생한다. LABEL은 내부적으로 문으로 보지 않는다. 어떤 위치에 꼬리표를 달아주는 역할일뿐 LABEL 자체가 하나의 레코드가 되지는 않는다. 

+ 레이블의 스코프? 블록만으로는 레이블의 스코프를 막아 줄 수 없다. 대신에 레이블 스코프를 만들 수 있다. 레이블 뒤에 중괄호를 추가하면 된다. 

  ```javascript
  abc: {
      console.log('start');
      if(true) { break abc;} // break에 abc를 붙이지 않으면 에러 발생
      console.log('end');
  }
  // break abc를 만나 abc의 끝으로 가기때문에 start만 출력한다.
  ```

+ LABEL이 스코프를 생성하면 LABEL 스코프내에서는 LABEL을 빠져나올 수 있는 권리가 주어진다. 이게 가장 원초적인 FLOW CONTROL이다. 

+ 레이블에 특별한 선언이 없는 이상 다음 레이블까지가 하나의 RANGE

+ 레이블 다음에 ITERATION(for, while)이나 SWITCH가 오면 이게 레이블 RANGE 범위를 다시 한정짓는다. (for문을 쓰기 직전에 label을 쓰면 이 레이블의 범위는 그 for문까지)

+ 레이블 스코프를 만들면 {} 가 레이블의 범위이다.

+ for문에서 break를 사용할 때 break 다음에 label을 붙이지 않아도 에러가 발생하지 않는 이유는 js엔진이 break뒤에 암죽적으로 label을 삽입하고 for문 앞에도 자동으로 삽입하기 때문

+ 자동으로 사입된 LABEL을 **AUTO LABEL**이라고 하고, AUTO LABEL이 만들어낸 이름을 undfined named label이라고 한다. 

+ 한줄 주석을 달 경우 코드의 길이에 따라서 읽기가 불편하기 때문에 앞주석을 달기위해 label을 사용하기도한다. 

  ```javascript
  a: console.log('aaaaaa') // 코드의 길이가다르면
  b: console.log('bbbbbbbbbbbbbbbbbb') // 한줄 주석은 읽기가 불편하니까
  c: console.log('ccccccccccccccccccccccccccccccc') // label을 달아서 주석대신에
  ```

+ Javascript의 점프 구문은 전부 다 점프가 시작하는 문장 블록의 가장 처음으로 가지만, label을 호출하면 그 문장의 가장 마지막으로 간다. 어디론가 점프시켰는데 그 블록의 마지막으로 보내는 유일한 예외가 label이다. 

### SWITCH

+ SPECAIL LABEL BLOCK: switch의 중괄호는 언어 파서가 해석하기 위한 토큰으로서의 중괄호다. switch문의 뒤에오는 중괄호는 중문이 아니라 문법적인 요소. 무조건 써야함. switch 뒤의 중괄호는 special label이 가능한 공간으로 만들어준다.  > switch문은 특별한 레이블 공간을 선언해주기 위한 문법이다. 
+ `case 식 :`,  `default :` 는 special label. case의 식을 동적으로 해석하는 특별한 레이블이다.  

+ 레이블을 사용하기 때문에 FALL THROUGH가 발생하는 것은 너무나 당연한 것이고 break를 걸면 undfined name lable로 빠져나오는 것이다. (switch문 앞에 auto label이 만들어지기 때문에)

+ special label block에서는 case label과 default만 쓸 수 있다. 

+ switch구문이 runtime에 실행된다는 건 한줄씩 순차적으로 실행된다는 것. 그렇기 때문에 함수를 호출하거나 증감처럼 상태를 바꾸는 것이 들어가면 주의가 필요하다. 

  ```javascript
  // 상태를 바꾸는 switch문
  let c = 2;
  switch(true) {
      case c++ > 5: console.log(c); break;
      case c++ > 5: console.log(c); break;
      case c++ > 5: console.log(c); break;
      case c++ > 5: console.log(c); break;
      case c++ > 5: console.log(c); break;
      case c++ > 5: console.log(c); break;
  }
  ```

+ 병행 조건에는 예외가 생길 가능성이 반드시 존재하기 때문에 switch문에는 defualt를 생략하지 않는다.

### loop

#### for

+ for문의 기본 형태 `for(ex1; ex2; ex3) { // do someting}`

+ ex1에 var a = 3; 같은 게 오는데 얘는 식이 아님. 증거? var k = var a= 3;  성립 안 함!  이것은 선언문이다. >>> ex1에는 선언문, 공문, 식이 올 수 있다.

+ for문은 ex2가 truthy인 동안 실행된다. for문에서 ex2 자리가 공문인 경우 truthy로 평가되어 무한루프가 발생한다. 

  falsy: '', false, 0, undfined, null, NaN 

  truthy: falsy가 아닌 나머지

+ ex3은 중괄호 마지막에 실행된다. ex3은 식문이다.

#### while

+ while(truthy) 인동안 무한루프

+ 무한루프에 빠지지 않게하기 위해서 일반적으로 런타임 평가 항목을 넣고 평가할 변수의 상태를 계속 바꿔줌으로서 탈출하게 한다.

  ```javascript
  let a = -1;
  while(a > 2) {
      a++ // a의 상태가 변함으로서 빠져나갈 수 있다. 
  }
  ```

+ 조건식의 상태가 body에 나오는지 여부를 보면 무한루프에 빠지는지 빠르게 알 수 있다.  조건식이 body에 나오지 않으면 나오게 만든다.

  ```javascript
  // 루프에서 빠져나오는지 알 수 없다. 내가 예상하지 못 했을 떄 버그에 빠진다. 
  while(act.method().c) {
      other.action(); 
  }
  ```

  개선

  ```javascript
  // 테스트 로직을 짜기 편하고, 안전장치를 걸어서 무한루프에 빠지지 않게 하기도 쉽다. 
  let a = act.method().c;
  while(a) {
      let r = other.action();
      a = act.method().c;
      if(r==='abc') a = false; 
  }
  ```

  