# ES6+ 기초편 5회차

> 코드스피츠77 - ES6+ 기초편 5회차 <https://www.youtube.com/watch?v=BJtPmXiFnS4&list=PLBNdLLaRx_rIF3jAbhliedtfixePs5g2q&index=6>

### BLOCK

+ FLOW를 막고있는 것. 명령이 흘러야하는데 어떤곳의 명령이 흐르지 못하게 막고있는 것. CPU와 메모리가 다음 명령을 실행할 수 없기때문에 정지 상태처럼 보이게 되고 블록킹이 풀릴때까지 아무것도 못 하게 됨. 블록킹이 발생하면 컴퓨터가 죽은 것처럼 보이기 때문에 사용자 입장에서는 불편하다. 
+ 기본적으로 폰 노이만 머신은 메모리에 있는 명령을 꺼내서 CPU에서 연산한 다음 메모리에 넣는 한 싸이클만 봐도 이 사이에 관여할 수 없다. 프로그램이 도는 동안 건드릴 수 없음. 아무리 프로그램을 가볍게 짜도 기본적
+ BLOCK과 NOBLOCK의 차이는? 시간. 너무 오래 걸리면 BLOCK, 짧으면 NONBLOCK

### FLOW IS BLOCKING

+ 프로그램이 실행되면 도중에 멈춰지지 않고 끝까지 실행됨. 내가 메모리에 적재한 명령이 전부 소화될때까지 그 CPU는 아무도 못 쓰기때문에 CPU가 블로킹되는 것
+ 플랫폼의 안정성을 위해 블록되는 시간이 길면 강제 종료시킴. 실제적으로 OS나 브라우저는 시작과 종료되는 시간을 감시하고 있다가 시간이 지나면 명령을 해지하고 메모리에서 내려버림

#### BLOKING FUNCTION

+ 점유하는 시간만큼 블록을 일으키는 함수 



```javascript
const f = v => {
    let i = 0;
    while(i++ < v);
    return i;
}
f(10);
f(1000000000000);
```

+ 블록킹 함수를 짰냐 안 짰냐 여부는 인자를 보내서 블록킹이 심해지냐 아니냐에 달려있음. 인자에 따라서 블록킹의 범위가 넓어지거나 좁아지는 함수를 블록킹 함수라 부른다. 
+ 블록킹 함수를 짠 다음 애플리케이션을 구축하면 그 애필르케이션의 상황에 따라서 굉장히 긴 블록킹을 할 가능성을 갖게된다. > 블록킹 함수 관리가 중요하다.
+ 밑에 깔린 유틸리티 함수 몇몇개가 블록킹인 것만으로 시스템 전체가 블록킹에 빠질 수 있다. 블록킹 함수가 되지 않게 처음부터 유의하면서 짜야한다. 블록킹 함수를 피한다. 
+ 배열 순회, 정렬, DOM 순회, 이미지프로세싱 > 각각 크기에 따라서 달라짐
+ 만약, 이미지를 그레이스케일하는 함수가 있다치면 큰 크기의 이미지를 처리할 때 블록킹이 된다. 큰 이미지를 처리하려면 100 * 100만 처리하는 그레이스케일을 만든 뒤 setInterval로 반복하고 나중에 조합해야한다. 

### BLOCKING EVASION(블록킹 피하기)

+ 블록킹은 독점적인 CPU 점유로 인해 모든 동작이 정지된다. 타임 아웃 체크에 의해 프로그램이 강제 중단된다. 
+ 블록킹의 조합을 예측할 수 없다(블록킹 함수가 얼마나 많은 블록킹을 일으키는지 예상할 수 없다.)

```javascript
const f = v => other(some(v), v * 2);
f(10);
```

+ 구성요쇼 중 하나라도 블록킹 함수라면 이 애플리케이션 전체가 오염될 가능성이 있다. 
+ 어떤 상황에서 블록킹이 발생할지 모르고 디버깅도 못하고 원인도 모르기 때문에 잡기가 힘들다. 

#### 자바스크립트 스레드

+ 자바스크립트가 싱글스레드가 아니라 자바스크립트에서 UI와 관련된 처리를 하고 자바스크립트라는 스트립트 처리하는 부분이 싱글 스레드로 되어있다. 현대의 거의 모든 OS는 UI를 건드리거나 메인 스크립트를 작동하는 것을 싱글 스레드로 제약 걸고있다. 우리가 감시하는 건 MAIN UI THREAD. 얘가 작동을 할 때 얼마나 많이 블록킹하는 지를 보고있다. 
+ HTML5 등장 이후에는 브라우저 내장 스레드 말고도 직접 백그라운드 스레드를 띄울 수 있는 웹 워커라는 기능이있다. 웹 워커를 이요하면 자바스크립트에서도 별도의 스데르드를 띄울 수 있다. 

### JAVASCRIPT MAIN UI THREAD

+ 무한 루프를 돌고있고 스레드가 바라보고있는 배열(명령큐)이 있는데 자바스크립트 명령을 이 배열 어딘가에 저장하고 저장할때 언제 실행하라는 타임스탬프가 붙는다. 0프레임에서 시작, 1프레임에서 시작, 5프레임에서 시작 같이. 메인 스레드는 계속 자기내의 시간 틱을 돌리면서 거기에 해당하는 스크립트가 있으면 로딩해서 실행해주는 것. 다수의 명령을 시간축에다가 배열해두면 트리거가 걸린 순간 발동하게 된다. 다른 스레드는 명령큐에 명령의 결과를 담아두기만 하고 Main 스레드 혼자 돌면서 명령들을 실행하는 것. DOM UI 처리기, 이벤트 처리기는 다 별도 스레드인데 클릭한 순간 다음 프레임에 적재를 하고 루프를 돌면서 끄집어내서 실행한다. 시간 제한은 메인 스레드가 하나의 명령을 꺼내서 실행하는 시간이 5초 이내여야 한다. 
+ 자바스크립트에서 기본적으로 블록킹을 피하는 방식은 타임 슬라이스를 나누어서 다른 프레임에 나눠주는 것. 이번 프레임에서 5초만 넘어가지 않으면 된다. 

#### TIME SLICING MANUAL

```javascript
const looper = (n, f, slice = 3) => { // n이 아니라 slice에서 끝나도록 제약 추가
    let limit = 0, i = 0;
    const runner = _ => {
        while(i<n) {
            if(limit++ < slice) f(i++);
            else{
                limit = 0; // limit는 다시 0부터 slice
                requestAnimationFrame(runner); // 미래의 나에게 떠넘기기
                break;
            }
        } // 내가 수행해야 할 일은 n개지만, slice만큼만 반복하다가 다음 프레임으로 넘겨버린다. 
    }
    requestAnimationFrame(runner);
}
```

+ 만약 f함수가 블록킹함수라면 전체적으로 블록킹함수에서 벗어나지 못 한것. f함수가 블록킹함수가 아니라면 slice를 넉넉하게 잡고, 아니라면 slice를 타이트하게 잡는다.

#### TIME SLICING AUTO 

```javascript
const looper = (n, f, ms = 5000, i = 0) => {
    let old = performance.now(), curr;
    const runner = curr => {
        while(i<n) {
            if(curr - old < ms) f(i++);
            else {
                old = performance.now();
                requestAnimationFrame(runner);
                break;
            }
        }
    };
    requestAnimationFrame(runner);
};
```

### SYNC, ASYNC

+ SYNC: 서브루틴이 즉시 값을 반환한다. 함수가 값을 리턴하면 싱크.
+ ASYNC: 서브루틴이 콜백을 통해 값을 반환함. 함수를 호출했는데 값을 반환하지 않음. 인자로 받은 콜백함수한테 값을 주는 것. ASYNC를 성립하는 유일한 방법은 인자로 함수를 넘겼냐 안 넘겼냐. > 콜백함수를 넘겼냐여부. 콜백함수를 보내면 무조건 ASYNC

#### SYNC 함수

```javascript
const double = v => v*2;
console.log(double(2)); 
```

#### ASYNC 함수

```javascript
const double = (v, f) => f(v*2);
double(2, console.log);
```

#### SYNC BLOCK 함수

normalAPI, legacyAPI

```javascript
const sum = n => {
    let sum = 0;
    for(let i = 1; i <= n; i++) sum += i;
    return sum;
};
sum(100);
```

#### SYNC NONBLOCK 

oldAPI, IOCP, img.complete...

```javascript
const sum = n => {
    const result = {isComplete: false};
    requestAnimationFrame(_ => {
        let sum = 0;
        for(let i=1; i <=n; i++) sum+=i;
        result.isComplete = true;
        result.value = sum;
    }); // 다음 프레임에 작업을 넘겼음
    return result; // 즉시 값을 반환
} // 옛날 방식으 API들은 SYNC이자 NONBLOCK인게 많음
const result = sum(100);  // 즉시 값을 반환하기때문에 처음에 받는 값은 {isComplete:false}
const id = setInterval(() => { // 원하는 값을 받을때까지 비동기로 조사를 해야한다.
    if(result.isComplete) { 
        clearInterval(id);
        console.log(result.value);
    }
}, 10);
```

#### ASYNC BLOCK

TRAP, 이렇게 짜면 안됨! 주의!

```javascript
const sum = (n, f) => {
    let sum = 0;
    for (let i = 1; i <= n; i++) sum += i; // block이 발생
    return f(sum); // 이건 ASYNC의 조건 : callback으로 값 반환 
};
sum(10, console.log);
console.log(123);
```

#### ASYNC NONBLOCK

modern API

```javascript
const sum = (n, f) => {
    requestAnimationFrame(_=>{
       let sum = 0;
       for(let i = 1; i <= n; i++) sum += i;
       f(sum);
    }); // 다음 프레임으로 미룸... 다음 프레임에서 block걸림...
}
//이 예제는 similar async block async지만 어느 순간에 죽는다. 
```

평소에 SYNC BLOCK으로 짜고있지만, 되도록이면 ASYNC NONBLOCK을 지향하는 코드로 바꿔줘야하고 ASYNC NONBLOCK을 쓰면 필연적으로 코드가 널뛴다. 어떤 것이 먼저 실행되었는지 모름. 점프하는 느낌을 배제하려고 promise 같은 걸 사용함. modernAPI는 ASYNC NONBLOCK에서 promise로 한단계 넘어간다.