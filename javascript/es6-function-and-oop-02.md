# ES6+ 함수와 OOP 2회차

> 코드스피츠 3rd-3 ES6+ 함수와 OOP 2회차<<https://www.youtube.com/watch?v=h80tLv0fn88&list=PLBNdLLaRx_rKOFzA3txlG5rf9ZaVUuvmv&index=2>>

### SPRED REF

+ 참조를 계속 유통시키면 상호 참조 관계라는 것으로 금방 오염이 번진다. 
+ 루틴과 서브루틴은 리턴과 인자를 통해서 대화를 하는데 참조값을 넘기는 경우에 내부에서 새로운 값을 만들어서 리턴하거나 복사본을 사용해야한다. 로컬 변수에 인자로 넘길때도 참조값을 사용하면 위험하다. 따라서 여파를 없애기 위해서는 처음부터 새로 만들고 시작해야 한다. 
+ 내가 만든 함수는 나만 사용하는 게 아니다. 남들이 어떻게 사용할지는 알 수 없다. 방어적인 방법은 일단 복사본을 만드는 습관을 들이는 것이다.

### SUB ROUTINE CHAIN

+ MAIN ROUTINE > R1 > R2 > R3 > R4 > R5 > R6
+ R6에서 리턴하기 직전까지 앞에서 호출한 애들을 다 콜스택에 저장하고 있다. 리턴이 시작되면 하나씩 콜스택을 까서 마지막 결과 값이 리턴된다. 각각의 서브루틴은 호출될 때마다 인자와 지역변수를 만들어 낼 것이다. 이 인자와 지역변수가 있는 상태에서 다른 서브루틴을 호출한 것. KEEP의 정확한 대상은 인자와 변수이다. 이것을 기억하는 메모리가 필요한 것이다. 함수는 호출되는 순간 그 함수 하나 분량의 미니 메모리를 갖게 되고 그 메모리 안에 인자와 지역변수가 들어있다. > 실행 컨텍스트

### TAIL RECURSION

+ 메모리를 전부 해제할 수 있도록 함수를 짜면 A가 다른 함수를 호출하면서 리턴 포인트로 자기 자신의 리턴 포인트를 건네주는 것. 
+ 함수를 호출하는 방식을 바꿔주면 호출하는 엔진이 굉장히 효율적으로 메모리를 쌓아두지 않고 함수를 허치하고 메모리를 해제하고 처리하고 해제하고를 반복한다.  > 마치 제어문의 루프처럼 움직인다. 
+ 제어문의 스택 클리어 : 제어문은 for문을 돌때마다 for문 안에 메모리를 유지하지 않는다. for문 안에 있는 내용을 처리하고 그 다음 for로 돌아갈때는 다 해제하고 인덱스 변수만 남는다.  제어문에서는 반드시 while, for 같은 문장을 써야지만 루프에 대한 스텍을 클리어 시킬 수 있다. 제어문의 루프문들을 다 스택클리어라는 기능을 갖고있다. 
+ 꼬리물기 최적화를 지원하는 언어에서는 for문이나 while문의 도움을 받지 않고도 고성능의 loop를 만들어 낼 수 있다. 

```javascript
const sum = v => v + (v > 1 ? sum(v-1) : 0);
sum(3)
// +를 해야하기 때문에 메모리를 해제할 수 없다. 모든 연산자는 꼬리물기 최적화를 방해한다. 모든 연산자는 스택메모리를 유발한다. 
```

+ 더하기를 제거하고 리턴과 함수콜만 남아야지만 진정한 꼬리물기 최적화를 하는 것. 
+ 연산을 인지로 옮긴다. 내 메모리를 해제하고 다음 함수 메모리의 인자 메모리를 사용한다. 

```javascript
const sum = (v, prev = 0) => {
    pref += v;
    return (v > 1? sum(v-1, prev) : prev);
    // 언어스팩에는 스택을 잡지 않는 연산자가 정해져있다. JS는 삼항식, &&, ||는 스택메모리를 일으키지 않는다. 꼬리 물기 최적화의 대상
};
sum(3);
```

+ 제귀성 함수를 짜면 꼬리물기 최적화가 일어나게끔 짜는게 함수를 짜는 기본적인 바른 방향 
+ 어떤 함수를 꼬리물기 최적화 할 수 있다면 그 함수를 뭔가 심각한 고민없이 기계적으로 루프로 바꿀 수 있다. 

```javascript
const sum = (v) => {
    let prev = 0;
    while(v > 1) {
        prev += v;
        v--;
    }
    return prev;
}
```

### CLOSURE

+ 클로저는 런타임 중에 루틴을 만들 수 있는 언어에서만 생겨난다. 
+ 일반적으로 루틴이 사용할 수 있는 메모리는 자기 지역 변수 외에는 전역 메모리라는 것을 사용할 수 있다. 이걸 C에서는 STATIC MEMORY라고 부름 > 함수를 문으로 만드는 언어의 특징  
+ 런타임에 루틴을 만들 수 있는 언어들은 루틴이 처음부터 정적인 문으로 존재하지 않는다. 루틴이 실행되는 환경을 생각해보면 전역내에서 메인이 흐르고 있는데 실행 중간에 어느 순간 태어난다. 처음부터 루틴이 존재하는 게 아니라 작성한 코드를 따라서 실행되다가 어느순간 태어나는 것. 루틴은 자기 지역 변수와 글로벌 외에도 자기가 태어났을 때 자기가 갇혀있던 박스를 바라볼 여지가 생긴것.
+ 런타임에 루틴을 만들 수 있는 언어들은 루틴을 만들면 그 루틴 정보 안에 자기가 어느 환경에서 만들어졌는지도 같이 기억한다. JS에서는 이것을 SCOPE라고 부른다. 
+ 루틴이 알고있는 건 코드가 아니라 어떤 플로우에서 만들어졌는지이다. 플로우상에 있는 변수들도 알 수 있다. 동적으로 루틴을 만들 수 있는 언어에서는 인식할 수 있는 변수가 늘어난다. 지역변수, 인자, 전역 변수 외에도 내가 태어나는 순간 플로우에 있는 변수도 알 수 있다. 루틴 안에 등장하지 않는 변수면서 루틴이 인식할 수 있는 변수를 자유변수라고 부른다. 
+ 원래라면 플로우의 흐름에 따라서 플로우가 끝나는 순간 지역변수는 해제 되어야하는데, 루틴이 자유변수를 사용해버리면 해제를 시킬 수 없다. 루틴이 자유변수를 가두는 역할을한다. 자유변수가 갇히는 공간을 클로저라고 한다. 
+ 언어에 따라서 루틴이 자유변수를 못보게 한다. 그럼 클로저는 만들어지지 않는다. 

### NASTED CLOSURE

+ 클로저는 루틴만이 만들어 내는 건 아님. ES6에서는 블록 SCOPE가 생김. 블록으로 감싸면 또다른 클로저가 생긴다. 

```javascript
window.a = 3;
if(a===3) {
    const b = 5;
    const f1 = v => {
        const c = 7;
        if(a+b > c) {
            return p => v + p + a + b + c;
        } else {
            return p => v + p + a + b;
        }
    };
} 
```

+ 현재의 JS는 체인을 통해 중첩된 클로저 영역을 마구마구 만들 수 있다. 중괄호만 반복해도 클로저가 만들어진다. 

### SHADOWING

```javascript
const a = 3;
if ( a===3) {
    const a = 5;
    const f1 = v => {
        const a = 7;
        console.log(a) //7 자유변수를 참조할 수 있지만, 참조했을 때 이름이 같으면 가장 가까이의 클로저를 참조하기 때문
    }
}
```

+ 층층이 중첩되어 있는 클로저가 있는데 각각의 클로저 상태에서 똑같은 이름의 변수를 소유하고 있을 때 일어난다. Shadowing을 지원하는 언어는 일반벅으로 이름이 겹치면 현재 내가 코드를 실행할 때 가장 가까이에 있는 클로저의 이름을 시도한다. 
+ Shadowing이 발생하면 그 위로는 안 보임. 
+ 네임스페이스를 정의할 때 사용. 이 이름이 내부에서 사용할 때 다른 의미로 사용되어야 하면 보호하기 위해서 Shadowing이 일어나는 이름을 사용해야한다. 
+ 클로저는 자유변수를 다 사용할 수 있따 > 안에 있는 클로저에서 자유변수를 다 오염 시킬 가능성이 있다. 안에 있는 루틴이 밖의 자유변수를 못 건드리게 하고 싶으면 Shadowing을 통해서 접근 못하게한다. 

### CO ROUTINE

+ 제어문은 명령어고 명령어는 메모리에 적재되어 차근차근 실행된다. 지금까지의 발상은 한번 적재되어서 명령어가 메크로처럼 돌아가는 순간에 우리는 이것을 멈출 수 없다고 생각함. 근데 어느 순간 명령어를 직접 실행하지 않고 명령어 하나하나를 객체나 함수에 담았다가 내가 실행하고 싶을 때 실행하면 안 될까 하는 생각에 도달함. 원래 루틴은 인자를 호출하는 행위, 리턴하는 행위가 한번만 일어나는데 코루틴은 여러번 왔다갔다 할 수 있다. 
+ es6에서는 코루틴을 지원하기 위해서 모든 뭄을 레코드라는 객체로 감싸서 메모리에 저장한다. JS는 루틴의 구현을 제너레이터를 통해서 하고있다. 코루틴은 RETURN 대신에 YIELD라는 키워드를 사용한다. RETURN은 루틴을 종료시키지만, YIELD는 중간에 잠깐 보내고 유지하고 싶은 것. YIELD에서 일시정지. 플로우가 진행되다가 코루틴에 의해서 멈춰있는 것을 서스펜션이라 부른다. 
+ 여러 루틴에서 공유해야할 상태가 많아지면 값을 받아서 다음번 루틴에게 넘겨주는 것이 쉽지 않다. 근데 코루틴을 이용하면 같은 메모리내에서 지역변수가 상태를 유지하면 된다. 서스펜션이 걸렸을 뿐 메모리가 해제된 것은 아니기 때문. 지역변수로 상태가 공유되기 때문에 코드가 이해하기 쉬워진다. 
+ 코루틴에 LOOP가 있는 경우 : LOOP 안에 YIELD가 있으면 루프가 진행되지 않고 YIELD에서 계속 멈추게 된다. LOOP를 원하는 만큼만 전진시키고 멈추게할 수 있다. 

```javascript
const generator = function*(a) {
    a++;
    yield a;
    a++;
    yield a;
    a++;
    yield a;
}
const corutine = generator(3);
let result = 0;
result += corutine.next().value; // yield로 출력한 값
console.log(result) // 4;
result += corutine.next().value; 
console.log(result) // 9;
result += corutine.next().value; 
console.log(result) // 15;
```

