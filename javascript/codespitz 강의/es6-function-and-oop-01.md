# ES6+ 함수와 OOP 1회차

> 코드스피츠 3rd-3 ES6+ 함수와 OOP 1회차<https://www.youtube.com/watch?v=YsMhHGG-9Ow&list=PLBNdLLaRx_rKOFzA3txlG5rf9ZaVUuvmv>

### SUB ROUTINE FLOW

+ FLOW: 메모리에 적제되어있는 명령이 순차적으로 실행되는 과정. 이 과정은 아무도 개입할 수 없고 적재된 명령은 한번에 쭉 실행된다. 동기화 명령(SYNC)들이 FLOW를 이루게 된다. 

+ ROUTINE: 메모리에 적재했던 명령어 세트. 명령어 세트를 한번만 실행하면 루틴이라 부르지 않는다. 여러번 실행할 수 있는 것을 루틴이라 부름.

+ MAIN ROUTINE: 서브 루틴에 상대되는 관점. 절대적이지는 않다. 어떤 녀석이 어떤 관점에서 보면 서브루틴인데 다른 관점에서는 메인 루틴이기도 하다. 

+ 상대적 관점: 어떤 것이 플랫폼이고 어떤 것이 애플리케이션인가 판단하는 것은 상대적인 관점에서 달라진다. JAVA를 구동하는 JVM이있고 WINDOWS가 있을 때, WINDOWS라는 OS입장에서 JVM은 애플리케이션. JAVA클래스 파일 입장에서 JVM은 OS가 된다. WINDOWS 입장에서 크롬은 하나의 애플리케이션, JAVASCRIPT 입장에서 크롬은 OS같은 하나의 플랫폼으로 보인다. 

+ 메인 루틴 입장에서 다른 루틴으로 점프해서 실행하면 걔가 서브루틴으로 보이는 것이고 서브 루틴입장에서 자기를 불렀던 쪽이 메인 루틴으로 보이는 것 뿐. 이것도 상대적인 개념

+ 함수를 호출한 순간 완전히 다른 플로우로 흘러가 버린다. 서브루틴은 플로우의 흐름이 자기를 호추했던 메인 플로우로 돌아간다. 메인 루틴에서 서브루틴으로 보낼때는 서브루틴은 결과나 실행이 완료되었을 때 메인루틴의 어디로 복귀할 지를 기억하는 포인트가 있다.

  ```javascript
  const routineA = b => {
      const result = b * 2;
      console.log(result);
      return result;
  };
  const routineB = d => {
      const result = d * 3;
      console.log(result);
      return d;
  };
  // 메인 루틴
  const b = 10, d = 30;
  const a = routineA(b); // routineA로 갔다가 여기로 돌아옴
  console.log(a);
  const c = routineB(d); // routineB로 갔다가 여기로 돌아옴
  console.log(b);
  ```

+ 루틴이 개입하면 프로그램의 흐름을 위에서 아래로 읽을 수가 없다.
+ 플로우를 컨트롤 할 때의 관점에서는 함수를 Function이라 부르지 않고 루틴이라 부름. Function은 수학적으로 x를 넘기면 y를 반환한다는 관점에서 이야기할 때 사용.
+ ES6에서 Function 키워드는 쓰지 않음. Arrow Function을 쓰거나 메소드는 class 구문을 쓰거나. 

### COMMUNICATE WITH ROUTINE

+ 플로우의 흐름만 바뀌는 게 아니라 값을 주고 받는 메커니즘이 제공된다. 인자와 리턴으로 서로 값을 주고 받는다. 
+ 자바스크립트는 리턴이 없는 루틴이 없다. 리턴을 사용하지 않으면 자동으로 return undefined가 붙는다. 값이 있는 undefined.
  + JS의 undefined는 1. 진짜로 값이 없는 undefined ex) new Array(10) length만 10이고 진짜로 아무것도 없는 undefined. 2. 값을 갖는 undefined. A = undefined. A는 존재하고 그 값이 undefined인 것.

```javascript
A = ROUTINEA(B) + ROUTINE(C) + ROUTINE(D)
```

+ 첫번쨰 값을 기억하고 있는 상태에서 두번째 루틴을 갔다와야 더하기를 성립시킬 수 있다. 연산은 메모리를 만들어내고 연산이 해소될때까지 메모리가 해제되지 않는다. 연산자를 제거하는 게 꼬리물기 최적화의 핵심

+ 코루틴에서는 yeild로 메인 플로우에게 값을 주기도하고 next의 인자라는 방식으로 코루틴에게 값을 주기도 함. 

+ 서브루틴 in 서브루틴

  |    MAIN FLOW    | ROUTINE A  | ROUTINE B |
  | :-------------: | :--------: | :-------: |
  | A = ROUTINEA(B) | ARGUMENTS  | ARGUMENTS |
  |                 | ROUTINEB() |  RETURN   |
  |                 |   RETURN   |           |

  + 루틴A와 루틴B는 동등한 서브루틴이 아니다. 루틴B가 보기에는 루틴 A가 메인 플로우.
  + 루틴A가 루틴B를 호출할 때 Keep이라는 일이 일어난다. 루틴A에서 인자를 처리하고 변수를 처리하는 등 여러가지 처리를 기억하는 행동이 일어난다. 
  + 루틴은 별도 메모리를 가져야한다. 서브루틴에서 다른 서브루틴을 호출한 순간 현재 메모리를 스냅샷으로 기억해 둔다. keep이 중요. 리턴을 두개 반복하면 하나는 keep해둬야 두번째 루틴으로 갈 수 있다.

  ```javascript
  const routineA = avg => routineB(avg * 2);
  const routineB = avg => avg * 3;
  const b  = 10;
  const a  = routineA(b);
  ```

  + 루틴B가 리턴하기까지 루틴 A는 메모리를 킵하고 있다가 루틴B의 결과가 반환되어야 자신의 값을 반환할 수 있게 된다. 
  + 루틴이 계속 서브루틴을 부른다면? 마지막에 도달할 때까지 메모리 블록을 다 만들어야하고 메모리를 다 기억(keep)해야한다. => call stack
  + 루틴안에 루틴이 얼마나 중첩되어 있는지에 따라서 콜스텍이 계속 쌓인다. 너무 많이 쌓이면 죽어버림 > 스택 오버 플로우
  + 하나씩 마지막에 쌓인게 해제되기때문에 스택 메모리

  ```javascript
  const r1 = a => r2(a*2);
  const r2 = a => r3(a*3);
  const r3 = a => r4(a*4);
  const r4 = a => r5(a*5);
  const r5 = a => r6(a*6);
  const r6 = a => a * 5;
  const b = 10;
  const a = r1(b);
  ```

### VALUE vs REPERENCE

+ 값은 메모리상에서 전달 될 때마다 복사되는 형태, 참조는 메모리상에서 공유된 객체를 가리키는 포인터만 전달되는 형식
+ 메인 플로우와 서브루틴 간에 인자와 리턴을 이용한 통신에서 넘겨주는 것이 참조냐 값이냐에 따라서 굉장히 다른 양상을 만들어낸다.

#### 값을 주고 받는 경우

```javascript
const routine = a => a*2;
const flow1 =_=> {
    const b = 10, d = 20;
    const a = routine(b);
    const c = routine(c);
    return a+c;
}
const flow2 =_=>{
    const b = 30, d = 40;
    const a = routine(b);
    const c = routine(c);
    return a;
}
flow1();
flow2();
```

+ 값을 주고 값을 받으면 서브루틴으로 보내는 B값은 복사되어 넘어간다. 루틴안에서 인자를 아무리 변경해도 복사본이 넘어간 것이기때문에 메인 플로우에는 아무런 영향이 없다. 리턴을 값으로 하면 그것도 복사본. 서로 복사한 값을 주고받기때문에 둘 사이에 의존성이 굉장히 낮아진다. 원래값을 건드리지 않음.
+ 복사본만 주고 받기때문에 하나의 루틴이 여러 FLOW를 상대해도 서로 관여하지 않는다. 사이드 이팩트가 일어나지 않는다. > STATE SAFE
+ 가장 안정적이기때문에 함수를 만들 때 값을 주고받는 함수를 제일 먼저 고려한다. 

#### 레퍼런스 객체를 주는 경우

```javascript
const routine = ref => ['a','b'].reduce((p, c) => {
    delete p[c];
    return p;
}, ref);
const ref = {a:3, b:4, c:5, d:6};
const a = routine(ref);
ref === a //true
```

+ 인자를 보낼때는 a,b,c,d,값이 있었지만, routine에 들어와서 a,b가 사라짐. 이 함수를 호출한 시점과 객체의 상태에 따라서 효과가 다 다르다. 레퍼런스를 루틴안에서 change하면 위험함. 레퍼런스가 넘어가는 건 어쩔 수없기 때문에 Readonly로 사용할 것

```javascript
// 레퍼런스를 읽기전용으로 사용한 경우
const routine =({a, b, ...rest}) => rest; 
const ref = {a:3, b:4, c:5, d:6};
const a = routine(ref);
ref !== a // true
```

+ 객체 rest: 정해져있는 key를 해체하고 남은 애들을 묶어서 객체로 만드는 기능. a,b는 key를 빼고 rest를 만듬. a, b를 뺀 객체가 만들어짐. 객체를 읽기전용으로 사용하고 새로운 객체를 반들어서 반환함. 반환값이 ref와 같지 않음. 원래 값인 ref에는 a, b가 들어가 있다. 
+ 루틴에 인자를 넘길 때 되도록이면 레퍼런스를 넘기지 말고 불가피하다면 레퍼런스로 넘어온 인자를 리드온리로 사용하라. > 함수의 사이드 이펙트를 줄일 수 있다. 

#### 객체를 리턴할 때

```javascript
// 복사가 아닌 참조를 리턴하면 ref에 변화가 발생한다. 
const routine1 = ref => {
    const local = ref;
    local.e = 7;
    return local;
}
const ref = {a:3, b:4, c:5, d:6};
const a = routine1(ref);
ref === a // true

// 새로운 객체를 만들어서 새로운 객체를 반환한다.
const routine2 = ref => ({...ref, e:7}); 
const ref = {a:3, b:4, c:5, d:6};
const a = routine2(ref);
ref !== a // true
```

### STRUCTURED DESIGN

+ 응집도: 어떤 함수 내부의 코드 혹은 함수의 묶음이 높은 응집도를 갖는다는 것은 어떤 일을 처리할 때 여기 저기에 있는 걸 가져오지 않고 그 함수를 가져오면 일을 처리할 수 있다는 개념. 배열을 가져오면 PUSH,POP,SHIFT 메소드들을 이용하여 배열의 조작을 한꺼번에 할 수 있음. 
+ 결합도: 결합도라는 건 이 함수를 쓰려면 앞에 다른 함수가 준비되어있어야 한다는 것
+ 좋은 프로그램, 좋은 함수, 좋은 서브루틴이란 높은 응집도와 낮은 결합도를 갖는 것. 

### COUPLING(결합도)

#### CONTENT COUPLING (강결합)

```javascript
const A = class {
    constructor(V) {
        this.v = v;
    }
};
const B = class {
    constructor(a) {
        this.v = a.v;
    }
}
const b = new B(new A(3));
```

A클래스 속성 v가 변경되면 즉시 B클래스가 망가진다. (v가 아니라 data나 value로 바꾼다던지...) 

#### COMMON COUPLING(강결합)

COMMON은 전역 객체, 공유 객체

```javascript
const common = class {
    constuctor(v) {
        this.v = v;
    }
}
const A = class {
    constructor(c) {
        this.v = c.v;
    }
};
const B = class {
    constructor(c) {
        this.v = c.v;
    }
};
const a = new A(new Common(3));
const b = new B(new Common(5));
```

common을 잘 관리하는 것으로 class의 여파를 계산할 수 있긴 하지만, common 클래스 변경시 A,B 클래스가 망가진다.

#### EXTERNAL COUPLING

나쁘지만 회피할 방법이 없는 경우가 대부분 > 필수 불가결

```javascript
const A = class {
    constructor(member) {this.v = member.name;} // name이 없을 때 throw를 던져서 죽이는 게 좋은 방법.
};
const B = class {
    constructor(member) { this.v = member.age;}
}
fetch('/member').then(res => res.json).then(member => {
    const a = new A(menber);
    const b = new B(member);
});
```

회피할 방법이 없기 때문에 정복해야함 > API문서로 관리하고 값이 없으면 throw하도록 하여 되도록이면 빨리 error를 발생시켜야한다(뒤로 가서 에러가 발생하면 찾기 어려움)

classA와 calssB는 member JSON스펙에 의존하고있따. member JSON스팩이 name을 userName으로 바꾼다면 깨지는 것. 하지만, 서버로 부터 JSON을 안 받을 수 없기때문에 회피할 방법은 없다. 

#### CONTROL COUPLING

현대의 디자인 패턴을 포함한 여러 객체 설계를 통해서 회피할 수 있음. 코드를 고쳐야하는 결합

```javascript
const A = class {
    process(flag, v) {
        switch(flag) {
                case1: return this.run1(v);
                case2: return this.run2(v);
                case3: return this.run3(v);
        }
    }
};
const B = class{
    constructor(a) {
        this.a = a;
    }
    noop() {this.a.process(1);}
    echo(data) {
        this.a.process(2, data);
    }
};
const b = new B(new A());
b.noop();
b.echo("test");
```

이 결합은 루틴에게 직접적인 대상 객체를 주지 않고 대상 객체의 힌트를 주는 경우에 발생함. A클래스 내부의 변화는 B클래스이 오작동을 유발한다. 팩토리 패턴에서 자주 발생하는 문제

#### STAMP COUPLING (강결합 OR 유사 약결합)
```JAVASCRIPT 
const A = class {
    add(data) {
        data.count++;
    }
}
const B = class {
    constructor(counter) {
        this.counter = counter;
        this.data = {a: 1, count: 0};
    }
    const() { this.counter.add(this.data)}
}
const b = new B(new A());
b.count();
b.count();
```

+ A와 B는 ref로 통신을 한다. ref에 의한 모든 문제가 발생할 수 있다. 

+ A입장에서는 data가 아닌 count가 필요하기 떄문에 this.data대신에 this.data.count를 보내야한다. 좁은 범위를 줘야 하는데 그것보다 넓은 범위를 준 문제. 만약이 count를 cnt로 바꾼다면 깨져버린다. 

+ 되도록이면 필요한 값만을 전달한다. 넓은 범위의 값을 전달하면 의존성이 생겨서 코드수정을 할 수 없어진다. 
+ 데이터를 전달할 때 데이터의 역할을 넘는 값을 전달하면 장기적이든 단기적이든 stamp 의존성이 생겨서 수정할 수 없게 된다. 

#### DATA COUPLING (약결합)

```javascript
const A = class {
    add(count) {
        return count + 1;
    }
}

const B = class {
    constructor(counter) {
        this.counter = counter;
        this.data = {a: 1, count: 0};
    }
    count() {
    this.data.count = this.counter.add(this.data.count);
	}
};
const b = new B(new A());
b.count();
b.count();

```

+ 루틴과 대화할 때 레퍼런스가 아니라 값으로 대화하는 것 만으로도 커플링을 줄이는 효과가 있다. 

### COHESION(응집성)

#### COINCIDENTAL

우연히 모여있는 것, 응집성이 가장 안 좋음

```javascript
const Util = class {
    static inConnect(){}
    static log(){}
    static isLogin();
};
```

+ 아무런 관계가 없다. 해당 클래스를 만든 사람이 아니면 이 함수가 여기에 있는 걸 모르기 떄문에 똑같은 함수가 또 생기게 된다. 

#### LOGICAL

```javascript
const Math = class {
    static sin(v) {}
    static cos(v) {}
    static random() {}
    static sqrt(v){}
}
```

+ 사람이 인지할 수 있는 논리적 집합. 언제나 일부만 사용됨
+ 교육수준이나 상식수준이 비슷한 사람만 인식할 수 있다. 

#### TEMPORAL 

```javascript
const App = class {
    init() {
        this.db.inint();
        this.net.init();
        this.asset.init();
        this.ui.start();
    }
};
```

+ 시간의 순서에 따름
+ 로직상에는 순서가 얼마든지 바뀔 수 있어서 위험함을 많이 내포하고 있다. 

#### PROCEDUARL

```javascript
const Account = class {
    login() {
        p = this.ptoken();
        s = this.stoken();
        if(!s) this.new Login();
        else this.auth(s);
    }
};
```

+ 절차적 순서에 따름. 이렇게 실행하겠다는 계획을 세우는 것

#### COMMUNICATIONAL

```javascript
const Array = class {
    push(v){}
    pop() {}
    shift() {}
    unshift(v) {}
} // 배열과 관련된 메소드들의 집합
```

+ 하나의 대상에 대해서 상호보완적으로 그 주제를 처리한다. 
+ 역할내에서 기능들을 응집시킬 수 있다. 역할을 인식할 수 있다.  (역할 = 권한 + 책임)
+ 하나의 객체가 하나의 역할만 수행하는 것을 권장함 > 단일 책임 원칙

#### SEQUENTIAL

```javascript
const Account = class {
    ptoken() {
        return this.pk(this.pk=Io.cookie.get("ptoken"));
    }
    stoken() {
        if(this.sk) return this.sk;
        if(this.pk) {
            const sk = Net.getSessionFromPtoken(this.pk);
            sk.then(v => this.sk);
        }
    }
    auth() {
        if(this.isLogin) return;
        Net.auth(this.sk).then(v => this.isLogin)
    }
};
```

+  앞에 실행된 결과가 뒤에 실행되는 결과와 밀접하게 관계되어 최종 결과에 도달한다. 
+ ex) 체이닝 되는 함수 메소드

#### FUNCTIONAL

+ 역할 모델에 충실하게 단일한 기능이 의존성 없이 생성된 경우



높은 응집성, 낮은 커플링을 갖는 것이 중요한데 이 개념은 서로 모순된다. 높은 응집성을 갖으면 일반적으로 높은 커플링을 갖는다. 양쪽을 함께 달성할 수는 없다. 두개의 밸런스를 맞추고 조율해야함.