# ES6+ 함수와 OOP 4회차

> 코드스피츠 3rd-3 ES6+ 함수와 OOP 4회차<https://www.youtube.com/watch?v=_tmIikzjvOk&list=PLBNdLLaRx_rKOFzA3txlG5rf9ZaVUuvmv&index=4>

#### 이벤트 프로그램(다이얼로그 프로그램) 

+ 웹 프론트는 대부분 <u>대화형</u>으로 되어있다. 대화형이란? 이벤트가 발생하면 그 이벤트에 맞춰서 어떤일을 하는지 기술하면 되는 것. (Click하면 modal 열림, 서버에서 응답이 오면 JSON 파싱 등). 이벤트에 반응하는 프로그래밍 방식. 전체적인 흐름을 제어하는 게 아니라 흐름에 맞춰서 프로그램을 어떻게 할지 정해주면 된다. 
+ 특징: 로직이 단편화되어 있어서 일관성을 유지하는데 여러가지 스킬이 요구된다. (이쪽을 클릭하고 저쪾을 클릭했는데 내부 데이터는 한 곳에 일관성있게 유지해야함). 일관성을 유지하기 위한 다양한 프레임워크가 있다. 예를들어 리덕스. 다이얼로그 프로그램은 익숙하기때문에 데이터 분석을 하려고하지 않고 그냥 하던대로 하게된다. 

#### 추상화

+ 객체지향은 기본적으로 추상화라는 영역에 속해있다. 추상화는 크게 세가지를 이야기한다. 
  1. 카테고라이즈 : 분류를 일정한 기준을 통해서 묶어두는 것(어른과 아이, 초급자와 중급자와 고급자). 카테고리를 나눠서 거기에 모아두면, 하나하나 개체들의 특징들을 추상화해서 카테고리로 묶어버렸기 때문에, 디테일이 숨어버리고 카테고리의 특징만 뽑아내서 이해하게 된다. 분류체계는 분류안에 분류라는 개념을 갖고있어서, 카테고라이즈는 병렬 카테고라이즈와 종속적 카테고라이즈로 나눈다. 추상화중에 가장 많이 쓰이고 가장 이해하기 쉽다. 
  2. 모델링: 현실세계의 실물에서 내가 기억해야 할 것들을 모아둔 것. 복잡한 현실 세계의 실체를 이해하려하지 않고 이중에서 우리가 이해하고 다뤄야만 하는(기억해야만 하는) 것들만 모아둔 것을 모델링이라고 한다. 모델링할 때 가장 중요한 것은 이 도메인에서 우리가 꼭 기억해야만 하는 게 무엇인가를 먼저 정해야한다. 데이터 분석을 통해서 우리가 꼭 기억해내야만 하는 것을 정하는 행위를 모델링이라고 한다. 
  3. 집합: 가장 기초적인 추상화. 카테고라이즈랑 다른 점은 그냥 모아두었다는 점. 집합이라는 무작위적인 그룹핑을 할 수 있다. 
+ 현실세계의 복잡성을 그냥 받아들일 수 없다. 어떤 도메인 측면에서 필요한 필드만 뽑아서 모델링한 뒤 개발하거나, 여러개가 있는 걸 카테고리로 분류해서 카테고리에 처리되는 것들만 개발하거나 해야한다. 
+ 추상화 기법을 적극적으로 활용하는 것이 바로 객체지향 분석. 객체지향 분석에서는 어떠한 사물을 있는 그대로 객체로 받아들이는 것이 아니라 추상화를 이해하고 추상화 기법을 사용해서 이것을 모델링하는 행위를 한다. 
+ 객체 지향 관점에서는 사물을 분석할 때 추상화 기법을 사용한다. 추상화 기법에서 핵심적인 부분은 얘를 카테고리로 인식할 수 있냐, 모델링을 따로 할 수 있느냐. 아니면 그냥 그룹지어 내가 관리할 수 있느냐. 

#### 대체 가능성과 내적 동질성

+ 대체 가능성
  + child는 parent를 대체할 수 있따. child는 parent를 상속받았기 때문에 parent의 모든 속성을 다 갖고있다. 객체지향에서 상속이나 위임 같은 걸 가능하게 하는 원리가 바로 대체 가능성이다. 나를 더 큰 카테고리나 모델링으로 변형해도 내가 그자리에 들어갈 수 있다는 개념. 자식이 부모를 대체할 수 있고 구상 클래스가 인터페이스를 대체할 수 있다. 그리고 구상 클래스가 추상 클래스를 대체할 수 있다.  대체 가능성이 있어야 객체지향을 지원한다고 학술적으로 정의되어있다. 
  + 자바스크립트에서 상속은 프로토타입 체인으로 이루어지고 있는데, 프로토타입 체인을 하면 원래 있는 프로토타입에 체인을 걸어서 그 다음번 프로토타입을 만든다. 이 원리르 통해서 대체 가능성을 구현한다. 나에게 key가 없어도 \__proto\_\_ 에 key가 있다면 그 key를 사용할 수 있따. 체이닝 시스템으로 대체가능성을 구현할 수 있기 때문에 자바스크립트도 객체지향을 지원한다고 말하는 것
+ 내적동질성
  + 부모 class에 A라는 메소드가 있고 이걸 상속받은 자식에게도 A라는 메소드가 있다고 하자. 그러면 자식class는 객체지향 용어로 부모의 A메소드를 오버라이드했다고 한다. 부모에 있는 똑같은 메소드를 자식이 구현해버리면 부모의 메소드를 사용할 수 없고 자식의 메소드를 바라봐야하기 때문에, 부모의 A메소드를 덮어썼다고 오버라이드라고 한다. 
  + child 인스턴스를 만들 때 child형이 아니라 parent형으로 만들었다고 하면, 대체가능성에 의해서 parent자리에 child가 들어올 수 있음. parent형에 child의 인스턴스를 집어 넣을 수 있다. child의 A를 호출하면 child의 A가 호출될 것인가 parent의 A가 호출될 것인가? 내적 동질성에 의해서 처음 만들어졌을 때의 원형이 누구냐에 따라서 오버라이드 된 속성을 반드시 만들어진 구상객체의 것을 사용하도록 되어있다. 
+ 대체 가능성과 내적 동질성을 지원해야지만 객체지향이라고 할 수 있다. 

#### 은닉과 캡슐

+ 객체지향에서 객체를 여러개 만들 때 객체끼리 서로 지켜야할 최소한의 룰이 있다 > 은닉과 캡슐
+ 내부적으로는 복잡한 걸 세세하게 나누더라도, 외부적으로 표현할 때는 언제나 은닉화하고 캡슐화해서 상대방과 대화한다. 
+ 은닉화
  + 숨기는 것, 내가 내 데이터를 남에게 보여주지 않는 것. 어디까지 안 보여주는가? 가장 이상적인 것은 아무것도 보여주지 않는 것이다. 요청하면 주긴준다.
  + 옵셔널하기때문에 이걸 지원하지 않는다고 객체지향언어가 아니라고는 할 수 없다. 지켜주면 좋은 것일 뿐. 
  + es6이전에는 이름에 _를 붙이는 것으로 숨겨둔 것이라 합의를 했었다. 
+ 캡슐화
  + 은닉을 하든 안 하든 캡슐화는 무조건 제공해야한다. 왜? 캡슐화의 목적은 지식이 없게 하는 것, 모르게 하는 것. 자세히 알면 아는게 독이 될 수 있으니까 최대한 모르게 한다. 내걸 안 보여줄 뿐더러 내가 뭘 하는지도 감추고 싶다. 가장 모르는 수준까지 알려준다. 캡슐화는 상대방이 몰라도되는 이상 절대로 알려주지 않고 추상화된 행위만 알려준다. 

#### 역할과 책임

+ 테트리스에서 스테이지를 관리하는 객체는 오로지 스테이지만 증가시키고, 스코어를 관리하는 객체는 오직 스코어만 증가시키면 되지 이 게임에서 다른 이링 뭐가 일어나고 있는지 몰라도 된다. 본인만의 고유한 영역이 있고 본인이 책임져야할 것이 있고 역할이 있다. 
+ 역할을 나눌 때 중요한 것은 권한과 책임을 일치하게 나눌 수 있는 가 하는 관점이다. 

##### 테트리스의 역할 나눔

+ STAGE: 현재 스테이지 정보

+ SCORE: 점수 및 계산법

+ BLOCK: 범용 블록 정의 

  + [BLOCK0, BLOCK1, BLOCK2, BLOCK3, BLOCK4, BLOCK5, BLOCK6]

+ GAME: 게임 본체

  + PANEL: 범용 패널
    + [START: 시작화면, STAGE END: 스테이지 종료, DEAD: 죽음, CLEAR: 클리어, REPORT: 결과화면]

  GAME은 SATGE, SCORE, BLOCK이 필요하지만, 다른 애들은 GAME을 알 필요가 없다. 한쪽 방향으로 의존하지 않으면 객체지향이 무너진다. 양방향 의존성은 좋지 않다. 객체지향에서는 양방향 의존성이 있으면 중간에 브릿지 객체라는 것을 넣어서 단방향 의존성으로 바꿀 수 있다.

+ RENDERER: 범용 렌더링 처리기, 데이터를 받아서 그림을 그린다. 

+ DATA : 게임 <-> 렌더러간 프로토콜

  상호간에 약속한 형태를 중간에 끼워넣으면 둘 사이의 의존성이 줄어들게 된다. 약속이 정해지지 않으면 GAME이 바뀔 때마다 RENDER도 바꿔야함.

  프로토콜 필요 여부: 별화율이 극심한 경우 둘 사이 통신을 위해 프로토콜을 넣어줘야한다. 변화점에 대해 대응해야하기 때문에, 직접 통신을 하면 하나가 바뀔 때 다른 한쪽도 바꿔야한다. 하지만, 중간에 프로토콜이 있으면 변하는 쪽은 프로토콜에 맞추면 되고, 다른 쪽은 프로토콜만 바라보고 있으면 되기때문에 둘 사이에 변화가 없다. 둘 사이에 변화율이 다르다면 프로토콜을 끼워넣고 변화율이 비슷하면 프로토콜이 필요없다.
### TEST만들기

- 게임은 실시간 프로그램. 시간이 흐른데 그 안에서 발생하는 것을 지속적으로 처리해줘야 함. 유저 클릭에 비유하자면 유저가 1초에 여덟번씩 계속 클릭하고 있는 상황 > 이런 경우는 시간이라는 플로우에 맞춰서 작동해야한다. 
- 테트리스는 블록 형태의 베이스가 되는 스테이지에서 블록들이 쌓여가는 형태

#### 1. STAGE

```javascript
const prop = (target, v) => Object.assign(target, v);
const Stage = class {
    constructor(last, min, max, listener) {
        prop(this, {last, min, max, listener});
    } // last: 마지막판이 몇판인지, min, max: 최소속도, 최대속도, listener: 직접 다른 객체와 관계를 맺지 않게하는 역할
    clear() {
        this.curr = 0;
        this.next();
    }
    next() {
        if(this.curr++ < Stage.last) {
            const rate = (this.curr -1) / (this.last - 1);
            this.speed = this.min + (this.max - this.min)*(1 - rate);
            this.listener(); //스테이지가 올라갔음을 알려줌
        }
    }
}
```

현재 Stage의 값은 Stage가 갖고있기 때문에 은닉과 캡슐화 원리에 의해서 본인이 내부에서 스피드를 결정하고 외부에서 이 스피드 값을 가져가야한다. 

Stage의 책임 : Stage가 끝까지 왔는지 여부 체크, 끝이 아니라면 한판 올려주고 거기에 맞게 speed를 바꿔주는 것. clear 시키는 기능

#### 2. SCORE

```javascript
const Score = class {
    constructor (stage, listener) {
        prop(this, {stage, listener});
    }
    clear() {this.curr = this.total = 0;}
    add (line){
        const score = this.stage.score(line);
        this.curr += score;
        this.total += score;
        this.listener();
    }
 }

const Stage = class {
    constructor(last, min, max, listener) {
        prop(this, {last, min, max, listener});
    } // last: 마지막판이 몇판인지, min, max: 최소속도, 최대속도, listener: 직접 다른 객체와 관계를 맺지 않게하는 역할
    clear() {
        this.curr = 0;
        this.next();
    }
    next() {
        if(this.curr++ < Stage.last) {
            const rate = (this.curr -1) / (this.last - 1);
            this.speed = this.min + (this.max - this.min)*(1 - rate);
            this.listener(); //스테이지가 올라갔음을 알려줌
        }
    }
    score(line) {
        return parseInt((this.curr * 5) * (2 ** line));
    }
}
```

현재 score를 계산하기 위해서 curr이라는 STAGE만 알고 있는 내장 값을 이용해야하기 때문에 STAGE한테 위임한다. 점수를 계산하는 것은 STAGE의 책임이라고 결정한 것 > 프로그래밍은 수행해야하는 job이 누구의 역할과 책임으로 넘어가야하는지를 항상 의사 결정하는 행위라고 할 수 있음

#### 3. BLOCK

```javascript
const Block = class {
    constructor (color) {prop(this,{color, roatate: 0});}
    left() {if(--this.rotate < 0) this.rotate = 3;}
    right() { if(++this.rotate > 3) this.rotate = 0;}
    getBlock {throw 'override';} // 자식이 override하기 원한다. 자식이 override하면 내적 동질성에 의해서 부모걸 사용하지 않는다. 
const blocks = [
    clss extends Block { // ㅡ 와 ㅣ 모양 블럭
    	constructor() { super('#f8cbad');}
		getBlock() {
    		return this.rotate % 2 ? 
                [[1], [1], [1], [1]], [[1, 1, 1, 1]];
		}
    },
    class extends Block { // ㅗ, ㅏ , ㅜ , ㅓ 모양 블록
        constructor() { super('#ffe699');}
        getBlock() {
            switch(this.rotate) {
                case 0: return [[0, 1, 0], [1, 1, 1]];
                case 1: return [[1, 0], [1, 1], [1, 0]];
                case 2: return [[1, 1, 1], [0, 1, 0]];
                case 3: return [[0, 1], [1, 1], [0, 1]];
            }
        }
            
    }
]
}
```

충분히 추상화가 된 걸까? > 부모가 rotate를 관리하는데 자식이 그걸 알면 은닉이 아니다. 부모 - 자식 간에도 은닉과 캡슐화는 똑같이 성립한다. roatate는 부모의 속성, 색상도 부모의 속성이다. 또한, 몇개의 배열을 만들어야 하는지 정해져있지 않고 계속 만들어 낸다는 문제도 있다. getBlock을 호출할 때마다 블록을 만들어낸다. 인스턴스한테 물어볼때마다 똑같은 정적데이터가 나오게 하려면 컨텍스트 데이터가 되어야 한다. (더 나아가서는 스태틱 데이터가 되어야함) 메소드의 지역변수 데이터가 되는 건 곤란하다.

##### 개선한 코드

```javascript
const Block = class {
    constructor(color, ...blocks) { // 자식이 몇개 보냈느냐에 따라서 blocks를 받음
      prop(this, {color, ratate: 0, blocks, count: blocks.length - 1}) // 아까전에는 count가 고정값이었지만 지금은 자식의 사정에 따라서 결정된다.
    }
    left() {if(--this.rotate < 0) this.rotate = count;}
    right() {if(++this.rotate > count) this.rotate = 0;}
    getBlock() return this.blocks[this.rotate]; // 자식의 최대수 이상을 넘지 않는다.
};
const blocks = [
    class extends Block {
        constructor() {
            super('#f8cbad', [[1], [1], [1], [1]], [[1, 1, 1, 1]]);
        }
    }
];//컨텍스트에 담기 위해서 내가 원하는 block세트를 super의 인자로 보내고 있다.
```

블록간의 차이는 색과 모양밖에 없다 > 여기까지 추상화되어야지 제대로 카데고라이즈 한 것. 코드가 나온걸 보고 다시 도메인으로 점검한다. 원래 만들고자 했던 목표에 코드를 맞춰야지 코드에 목표를 맞춰서는 안 된다. 

#### 4. RENDERER

```javascript
const Renderer = class {
    constructor(col, row) {
        prop(this, {col, row, blocks:[]});
        while(row--) this.blocks.push([]); //미리 2차원 배열 만들기
    }
    clear() {throw 'override'} // 그림을 뭘로 그렸냐에 따라서 clear하는 방법이 다르기때문에 자식이 오버라이드해야한다.
    render(data) {
        if(!(data instanceof Data)) throw 'invalid data'; // 데이터가 진짜 데이터인지 검증(프로토콜 확인)
        this._render(data); // 밖에서 호출하는 게 아니라 자식을 호출하려고 내부에서 호출하는 서비스
    }
    _render(data) { throw 'override'}
};
```

행위가 구현되는 클래스마다 달라질 때는 내적동질성을 이용해 오버라이드한다. 어떤 렌더러가 오더라도 clear와 render는 할 것이기 때문에 부모층에 구현했지만, 실제로는 부모가 가질게 아니니까 자식에 위임하려고 오버라이드 된걸 예상하는 것.

자식은 render라는 메소드를 오버라이드하지 않음. 이건 부모에게만 있는 메소드. 부모안에서도 this.\_render를 하면 이때 this는 내적 동질성에 의해서 자식을 가리키게된다. this.\_render를 하면 자식이 오버라이드한 \_render가 호출된다. 실제 외부에 공개된 메소드는 부모의 메소드. 실제 부모 render를 실행하지만, 부모 render에서 \_render를 호출하면 자식의 메소드가 호출된다. 

render가 자식게 아닌 이유? 자식이 오버라이드 한 적 없기 떄문에. \_render는 오버라이드했으니까 무조건 자식의 메소드가 나오는 것. 

이러한 내적동질성에 의한 패턴을 템플릿 메소드 패턴이라고 한다. 템플릿 메소드 패턴이 성립하려면 무조건 언어가 내적 동질성을 지원해야주어야 함. 이걸 보장하지 않는 언어에서는 탬플릿 메소드 패턴을 사용할 수 없다. 템플릿 메소드를 사용하는 이유는 부모쪽 메소드가 많은 서비스를 제공하고 실제 할일을 훅킹하고 있는 자식 클래스에 위임하려는 것.

```javascript
const Data = class extends Array {
    constructor(row, col) { prop (this, {row, col});}
};
```

그냥 배열을 쓰는 것 만으로는 우리가 컨테이너라고 약속한 진짜 컨테이너가 맞는지 확인할 수 없으니까 형을 확인하기 위해 Data라는 형을 강제로 만든 것 

es5까지는 prototype으로 어떠한 상속을 통해서 class를 만들었다하더라도 만들어지느 객체는 언제나 Object이다. es6에서 class 사용해서 만들면 부모의 것이 만들어진다. Home Object라고 함. Home Object의 대상은 core객체 (Date, Function, Array 등), es6에서 이경우 진짜 Array가 된다. 

Data는 Array객체를 베이스로 하는 this가 만들어진다. 진짜 배열이면서 Data 클래스인 애를 만든 것

Data라는 형태를 약속(프로토콜)으로 정함 그래서 일부러 Data형인걸 표현하기 위해 class를 만들었다.

부모에서 data의 형을 확인했기 때문에 \_render는 data가 진짜 인지 확인할 필요없다.

#### 5. TABLE RENDERER

```javascript
const el = el => document.createElement(el);
const back = (s,v) => s.backgroundColor = v;

const TableRenderer = class extends Renderer {
    constructor(base, back, col, row) { // base는 table
        super(col, row);
        this.back = back;
        while(row--) {
            const tr = base.appendChild(el('tr')), curr = [];
            this.blocks.push(curr);
            let i = col;
            while(i--) curr.push(tr.appendChild(el('td')).style); //td의 style만 갖고있는 2차원 배열을 갖게된다. 
        }
       this.clear();
    }
    clear() {
        this.blocks.forEach(
        	curr => curr.forEach(s=>back(s, this.back))
        );
    }
    _render(v) {
        this.blocks.forEach((curr, row) => curr.forEach((s, col)=> s, v[row][col]));
    }// 기존 데이터는 상관없이 모델이 뭐가 오냐에 따라서 그림을 다시 그리기 때문에 언제나 모델하고 일치하는 그림을 그릴 수 있다. 
}
```

한번밖에 안 나오는 코드는 굳이 변수로 잡지 않는다. 변수로 잡으면 중간에 그 변수를 잘못 사용해서 값을 변형시킬 위험이 있다. 변수로 잡는 대신 연산으로 끝내버린다.  `tr.appendChild(el('td')).style` > tr에 추가하기 위해, style을 주기위해 td를 따로 변수에 담지 않고 한번에 처리함. 

#### 7. CANVAS RENDERER

```javascript
const CanvasRenderer = class extends Renderer {
    constructor(base, back, col, row) { // base는 canvas el
        super(col, row);
        prop(this, {
            width: base.width = parseInt(base.style.width);
            height: base.height = parseINt(base.style.height);
        	cellSize: [base.width/col, base: height/row], //한칸의 사이즈
            ctx: base.getContext('2d')
        });
    }
    _render(v) {
        const { ctx, cellSize: [w, h]} = this;
        ctx.clearRect(0, 0, this.width, this.height);
        let i = this.row;
        while(i--) {
            let j = this.col;
            while(j--) {
                ctx.fillStyle = v[i][j];
                ctx.fillRect(j*w, i * h, w, h);
            }
        }
    }
}
```

Table Renderer는 DOM과 Table의 사정을 알고있고 style과 background를 사용해서 그리지만, Canvas Renderer는 Canvas의 사정을 알고있고 컨텍스트의 메소드를 이용해서 그림을 그리고 있다. > 게임과 게임이 갖고있는 객체에는 아무런 관심이 없다. 넘어오는 데이터가 2차원 배열이고 그 안에 색상이 들어있다는 것에만 관심이 있을 뿐.

#### 도메인 패턴

+ 네이티브 객체를 컨테이너등의 프로토콜을 이용해서 완전히 나머지 객체들과 분리하는 것이 도메인 패턴

+ 플랫폼, 환경, 네이티브 시스템을 알고있는 것은 Renderer가 랩핑하고 있는 밑에 자식들 뿐. 다른 영역(도메인 객체)은 DOM에 대한 정보가 전혀없다. > 어떤 네이티브 시스템이 오더라도 전체를 다 재활용 할 수 있다.
+ 애플리케이션을 작성할 때 도메인 객체와 네이티브 객체를 나눠서 네이티브 격리라는 정책을 사용한다. 이것이 도메인 패턴의 핵심. 이렇게 하면 어떤 네이티브 객체에도 도메인 객체를 재활용할 수 있다. 재활용하는 분야가 굉장히 넓어진다. 
+ 테트리스에서 PANEL과 RENDERER는 도메인과 네이티브를 분리해주는 역할을 한다. 도메인과 네이티브의 사정(변화율)이 다르기 때문에 프로토콜로 연결한다. 프로토콜은 네이티브와 도메인 객체 사이에 거의 필수적으로 들어간다. 



