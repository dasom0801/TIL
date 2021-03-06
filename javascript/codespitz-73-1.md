### PROGRAM & TIMING

프로그램? : 실행될 수 있는 형태로 메모리에 적재된 것. CPU가 실행하려고 하는 것.

컴파일 언어의 흐름

- Language Code ((Lint time)): 컴파일 전이지만, Language Code가 잘못되었다는 것을 알려준다.
- Machine Language  ((compile)): 실제 CPU가 소화할 수 있는 명령 체계로 코드로 짜기 어렵기 때문에 사람에게 친절한 언어로 짜고 그걸 가지고 기계가 이해할 수 있는 언어로 바꿔주는 과정이 필요하다.
- File: 아직 프로그램이 아님. 프로그램이 될 수 있는 파일일 뿐
- Load: 메모리에 적재됨
- Run
- Terminate: 메모리에서 내려가고 프로그램 종료

가능하면 앞 시점에 에러를 잡고 더 좋은 코드를 짜는 것이 일반적으로 컴파일 언어 프로그래밍할 때의 전략 



인터프리터 언어의 흐름

+ Language Code
+ File
+ Load: 브라우저에서 로드, 브라우저가 메모리에 적재한다
+ Machine Language: 오토 컴파일
+ Run
+ Terminate



컴파일 언어는 랭귀지 코드를 빠짐없이 해석해서 컴파일한다. 전체 결과를 하나의 파일로 만들려고 하기 때문. 랭귀지 코드 파일은 여러개일 수 있지만, 컴파일하고 나면 하나가 된다. 파일을 하나로 만들기 위해 컴파일 타임에 내가 짰던 모든 코드를 검토한다.

인터프리터 언어는 내가 지금 바라보고 있는 파일만 컴파일한다. 하나의 파일 내에서도 부분적으로만 머신 코드로 바꾸고 나머지는 해석하지 않는다. 잘못된 함수가 있더라도 그 함수를 호출하기 전까지는 문제없이 돌아간다. 부분벅인 컴파일 전략. 전체를 검사하지 않기 때문에 코드에 대해서 더 무거운 책임을 져야한다. 



특정 상황에서만 에러가 발생하기 때문에 실행시점의 에러를 잡기가 어렵다 > 보완할 수단이 필요하다.

- 런타임의 기저가 되는 함수나 클래스를 정의
- Base Functin, class를 이용하는 응용 class, 응용 function을 만들게 된다
- 응용 function, class를 사용한다
- 각각을 추상레이어로 봤을 때 ( 정의시점 | 사용시점) 으로 볼 수 있다.
- 레이어를 세세하게 나누는 전략을 이용하면 발생하는 곳을 분리할 수 있다 => 에러가 발생한 곳만 고치면 된다.
- <u>**복잡성을 관리하는 기본적인 전략은 격리**</u>
  - 어떠한 에러가 발생했을 떄 그 에러가 누구의 소속이고 자기만의 책임이라고 확정 지을 수 있는 격리 구간을 만들어야 한다.

--------

### 자바스크립트의 구성요소

**Lexical Grammar**

+ control character 제어 문자
+ white space 공백문자
+ line terminators 개행문자
+ comments 
+ keyword 예약어 : 이 단어를 만나면 특정한 기능을 수행하도록 미리 약속해둠
+ literals 리터럴: 언어에서 정의한 더이상 쪼갤 수 없는 값. 값을 나타내는 최소한의 표현

**Language element** 자바스크립트를 구성하는 기본 요소

- statements 문
  - 공문, 식문, 제어문, 선언문 / 단문, 중문
- expression 식
  - 값식, 연산식, 호출식
- indentifier 식별자
  - 기본형, 참조형 / 변수, 상수

**Expression 식** 

- 최종적으로 하나의 값에 수용되는 것. 식은 값의 확장된 표현. 1 + 5는 덧셈 연산식인데 6으로 수용된다.
- 값은 저장하지 않으면 메모리에서 사라져서 휘발된다. 값이 없어지면 재활용 X, 이용 X => 무의미한 값의 표현이 된다. 순수한 값을 나타내는 식은 이용하기가 어렵다. 이 값을 저장하는 것이 변수

**Identifier 식별자**

+ 변수의 속성

  + 메모리 주소의 별명: 값은 컴퓨터 메모리의 어딘가에 들어있다. 복잡한 메모리 주소에 별명을 붙여준 것이 변수. 변수 a를 호출하면 해당 메모리 번지수에 찾아가서 거기에 있는 값을 꺼내온다.
  + 변수는 메모리의 주소일 뿐만 아니라 해당값에 대한 타입정보도 담고 있다. > data type
  + 이 두가지 의미를 담는 특정한 이름을 지정하는 것이 식별자

+ 기본형

  + 모든 값은 복사된다

    ```javascript
    let a = 3;
    let b = a; // b는 3
    ```

    a에 있던 값 3을 b가 참조하는 것이 아니라 복사한 것. a의 값을 바꾸더라도 b가 달라지지는 않는다.

+ 참조형

  + 다른 메모리의 주소를 갖고있는 것

  + a라는 변수에 값을 넣는게 아니라 b라는 변수의 메모리 주소를 넣을 수 있다. 조회하면 주소를 따라가서 값을 추적한다. 

    ```javascript
    let a = [1, 2, 3];
    let b = a; //b는 [1, 2, 3]
    a[0] = 7 // a는 [7, 2, 3] b도 [7, 2, 3]
    ```

    b는 a의 주소를 가리키고 있다. a를 바꾸면 b도 달라진다.

+ 인공어는 사람이 설계했기 때문에 설계자의 의도와 규칙을 반영할 수 있다. 설계자는 언어 스팩에서 무엇을 기본형으로 볼 것인지를 정한다. 기본형이 아니면 참조형임

+ JS에서는 숫자, 문자, boolean, null, undefined를 기본형으로 몬다. 

+ 상수는 한 번 대입하면 값을 바꿀 수 없다. 변수는 여러번 값을 대입할 수 있다**. 프로그래밍을 할 때 변화 가능성을 배제하는 것으로 복잡성을 줄일 수 있다.** 기본적으로 상수로 정의하고 변해야할 이유가 있을 때만 변수를 사용한다.  

**Statements 문**

+ 값으로 환원되지 않는 자바스크립트 엔진한테 던져주는 실행 방법이나 명령
+ 엔진의 실행에 관여할 수 있을 뿐이지 값이 될 수는 없다. 변수에 할당될 수 없고, 실행된 다음에는 메모리에서 없어진다. 
+ 문의 분류
  + 공문: 아무것도 없는 문, 비어있는 문 ex) ; ; ; ;
  + 식문: 하나의 식은 하나의 문이 된다. ex) 3 + 5; 3;
  + 제어문
  + 선언문: 식별자를 선언한다. 
  + 단문
  + 중문: { } 안의 문장을 묶어서 하나의 문으로 본다. 단문이 오는 자리에는 중문이 올 수 있다. 

-----------

### SYNC FLOW

프로그램을 실행할 때 메모리에 있는 명령과 값을 꺼내서 CPU에 옮긴 뒤에 연산을 하고 다시 메모리에 넣는 걸 끊임없이 반복한다. 

프로그램을 시작하면 메모리에 적재되어 있는 프로그램을 다 실행할 때까지 쉬지 않는다. 이 과정을 FLOW라고 부른다.

Flow는 메모리에 적재되어 있는 순서대로 쭉 진행이 되고 끝나버린다. 이 사사이에 관여할 수 가 없다. > 동기

동기를 어길 수 있는 다양한 기법을 비동기라고 한다. 

동기성 명령: 적재되어 있는 프로그램이 한 번에 소비된다. 그 사이에 우리가 CPU를 중단 시킬 수 없고 프로그램을 멈출 수도 없다. 아무것도 못 한다. 프로그램이 CPU에게 끊임없이 소비 당하고 있는 상태이다.

프로그램은 외부의 입력을 받지 않으면 변화가 없기때문에 효용성이 굉장히 낮아진다. 외부에서 입력 받는 걸로 프로그램이 반응하게 만드는 것이 기본적인 프로그램들의 전략. 프로그램은 고정되어 있지만, 입력값들은 매 실행때마다 다르게 들어올 수 있는 여지를 만들어준다. 입력에 따라서 다른 플로우를 타게 하여 플로우를 제어한다. 그렇지 않으면 값에 따라 매번 프로그램을 만들어야 한다. 

ES6의 제너레이터는 Flow를 중간에 중단시킬 수 있다. 다른 Flow를 진행하다가 중단된 곳에서 다시 시작할 수도 있다. Flow가 한세트 진행되는 것을 루틴이라고 부른다. 전체 Flow에 대한 루틴은 한 번만 돌지만 Sub Flow는 여러번 돌 수 있다. 이건 서브 루틴. 일반적으로 루틴이 진입하면 끝까지 실행되고 빠져나가 버린다. 코루틴은 여러번 들어갔다가 여러번 빠져나올 수 있다. 복잡한 flow 제어가 가능하다. 

--------------

Artificial language(인공어)는 코드로 사람의 복잡한 의도와 생각을 표현하고 싶기 때문에 표현할 수 있는 다양한 수단을 제공한다. 굴러만 가는 코드에는 의도가 표현되어씨지 않다. 의도와 생각을 표현하면 다음에 코드를 짤 때 이걸 왜 이렇게 짰는지 이해할 수 있다. 변수 이름에 의도가 존재하는 게 아니라 제어문을 어떻게 쓰고 어떤 문을 이요해서 알고리즘을 표현하는가에 존재한다.

