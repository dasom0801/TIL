# ES6+ 기초편 4회차

> 코드스피츠77 - ES6+ 기초편 4회차<<https://www.youtube.com/watch?v=82UuFxh7wKc&list=PLBNdLLaRx_rIF3jAbhliedtfixePs5g2q&index=5>>

+ 지연실행: 함수의 특권. 제어문을 즉시 시행하지 않게 하려면 함수에 담아두어야 한다. 그러면 함수가 호출될때까지 지연됨. 기본적으로 지연실행은 함수 호출 지연실행이다. 하지만, 제너레이터를 사용하면 다 실행되지 않고 yield로 빠져나올 수 있기때문에 지연시킬 수 있다. 

### ABSTRACT LOOP 루프의 추상화

+ 이터레이터 객체를 사용하면 루프에 대한 상태값들을 객체가 갖고있기때문에 언제라도 똑같은 루프를 재현할 수 있게되고 LOOP문의 역할이 크게 줄어든다. 

+ 단순한 배열의 루프인 경우 간단히 이터레이션을 작성할 수 있다. 

  ```javascript
  {
      [Symbol.iterator]() { return this;}
      data: [1, 2, 3, 4],
      next() {
        return {
        	done: this.data.length === 0,
          value: this.data.shift()
        } 
      }
  }
  ```

  #### 복잡한 다층형 그래프 이터레이션

  ```javascript
  {
      [Symbol.interator]() {return this;},
      data: [{a: [1, 2, 3, 4], b: '-'}, [5,6,7], 8, 9],
      next() {
        let v;
        while (v = this.data.shift()) { // 값이 있으면 값을 shift한다, 없으면 null이 나온다
          switch(true) {
              case Array.isArray(v): //배열인지 확인
                this.data.unshift(...v);
                break;
              case v && typeof v === 'object': //객체인지 확인
                for(var k in v) this.data.unshift(v[k]);
                break;
              default: 
                return {value: v, done: false}
          }
        }
        return {done: true};
      }
  }
  ```

  요소가 컨테이너형이라면 컨테이너가 아니게 될 떄까지 해체해서 붙여준다. 

  #### ES6로 코드 줄이기

  ```javascript
  {
      [Symbol.iterator]() {return this;},
      data: [{a: [1, 2, 3, 4], b: '-'}, [5,6,7], 8, 9],
      next() {
        let v;
        while (v=this.data.shift()) {
        	if(!(v instanceof Object) && !v) return {value: v}//기본값 처리, done은 리턴하지 않기때문에 undefined
          if(!Array.isArray(v)) v = Object.values(v); // Object에서 value만 모아서 배열로 바꿔준다.
          this.data.unshift(...v);
        }
        return {done: true};
      }
  }
  ```

  문제점: 한번 실행하고나면 data가 빈배열이 되어버린다. 한번만 loop를 돌 수 있다 > class로 만들어서 매번 루프를 돌때마다 인스턴스를 돌 수 있는 형태로 만드는 것이 좋다.

  #### Class 만들기

  ```javascript
  const Compx = class {
      constructor(data) { this.data = data;}
      [Symbol.iterator](){
          // 항상 data의 사본을 복사하기 때문에 몇번이라도 이터레이터를 호출해도 원본 데이터의 손상이 없다. 
        const data = JSON.parse(JSON.stringify(this.data));
        return {
            next(){
                let v;
                // data가 배열이여야지만 시작하기때문에 data를 []로 감싸서 배열로 만들어주는것이 좋다.
                while (v =  data.shift()) {
                    if(!(v instanceof Object)) return {value:v};
                    if(!Array.isArray(v)) v = Object.values(v);
                    data.unshift(...v);
                }
             return {done: true};
            }      
        };
      }
  };
  
  const a = new compx([{a: [1,2,3,4]}, b:'-', [5,6,7], 8,9]);
  console.log([...a]);
  console.log([...a]);
  ```

  JS의 class는 변수에 할당되는 하나의 값이다. 선언문을 사용하면 이 class가 언제 만들어졌는지를 모호하게 만드는 관점이 있다. 변수에 할당해서 class를 만들게 되면 정확하게 어떤 시점에 내가 클래스를 만들었는지 알수있게된다.

  #### 제너레이터 적용

  ```javascript
  const Compx = class {
      constructor(data) {this.data = data;}
      *gene() {
          const data = JSON.parse(JSON.stringify(this.data));
          let v;
          while(v = data.shift()) {
              if(!(v instanceof Object)) yield v;
              else {
                  if(!Array.isArray(v)) v = Object.values(v);
                  data.unshift(...v);
              }
          }
      }
  };
  const a = new Compx([{a: [1,2,3,4], b: '-'}, [5,6,7], 8, 9]);
  console.log([...a.gene()]);
  console.log([...a.gene()]);
  ```

  제너레이터를 호출해서 이터레이터를 만들면 쓸데없는 구조물들이 사라지기때문에 코드가 간결해진다. 

  if와 else는 명확하게 구분해주는 것이 좋다. 가독성과 유지보수성이 좋아진다. 위 코드에서는 if가 Object가 아니라면이라고 되어있으니까 else는 오브젝트겠지라고 일을 수 있다 > 주석이 필요없어진다. 코드는 읽고 해석할 수 있지만, 주석은 오해를 만들 수 있다. 주석이 없이 해석가능한 잘 짜인 코드를 작성하는 것이 중요하다

  #### 팩토리 + 컴포지트

  목적이 있는 루프를 만든 다음에 목적을 살짝 바꾸면 루프를 다시 짜야한다. 제어문은 사용하고나면 사라지기때문에 재활용할 수 없으므로 중복 정의 할 수 밖에 없다. 

  제어문을 직접 사용하지 않고 구조객체를 이용해서 루프 실행기를 별도 구현하는 방법이있다. 

  루프를 실행하는 객체 시리즈를 만들어 놓고 여기에 값을 넣거나 이 값을 이용하는 것을 따로 분리해주는 작업.

  프로그램에서 IF문을 제거할 수 있는 방법은 딱 하나뿐 > IF로 제어하는 경우의 수 만큼의 값을 미리 만들어 놓고 밖에서 그 값을 선택해서 들어온다. 선택기는 팩토리 메소드로 보내버리고 각각의 선택기에 해당하는 객체를 컴포지트 패턴을 이용해서 다 분리시켜버린다. 

  ```javascript
  const Operator = class {
      static factory(v) {
          if(v instanceof Object) {
              if(!Array.isArray(v)) v = Object.values(v);
              return new ArrayOp(v.map(v => Operator.factory(v)));
          } else return new PrimeOp(v);
      }
      constructor(v) {this.v = v;}
      operation(f) {throw 'override';}
  }; // Obejct의 처리는 기본적인 Operator가 함
  const PrimeOp = class extens Operator {
      constructor(v) {super(v);}
      operation(f) {f(this.v);} //원시값은 확정이기때문에 바로 f에게 v값을 준다.
  } // 기본값 처리
  const ArrayOp = class extends Operator {
      constructor(v) {super(v);}
      operation(f) {for(const v of this.v)} v.operation(f); }
  } // Array처리
  Operator.factory([1,2,3,{a: 4, b:5}, 6, 7]).operation(console.log)
  ```

  아까 if에 등작했던 것들이 이번에는 class로 등장함 if의 종류를 늘리지 않고 객체를 늘리는 방식으로 해결할 수 있다. 

  **문자열 처리기를 추가한다면?**

  ```javascript
  if(1) {
  const Operator = class {
      static factory(v) {
          if(v instanceof Object) {
              if(!Array.isArray(v)) v = Object.values(v);
              return new ArrayOp(v.map(v => Operator.factory(v)));
          } else return typeof v ==='string'? new StringOp(v) : new PrimeOp(v); //분기추가
      } 
      constructor(v) {this.v = v;}
      operation(f) {throw 'override';}
  }; // Obejct의 처리는 기본적인 Operator가 함
  const StringOp = class extends Operator {
      constructor(v) {super(v);}
      operation(f) {for (const a of this.v) f(a)}
  }// 문자열 처리기
  const PrimeOp = class extends Operator {
      constructor(v) {super(v);}
      operation(f) {f(this.v);} //원시값은 확정이기때문에 바로 f에게 v값을 준다.
  } // 기본값 처리
  
  const ArrayOp = class extends Operator {
      constructor(v) {super(v);}
      operation(f) {for(const v of this.v) v.operation(f); }
  } // Array처리
  Operator.factory([1,2,3,{a: 'abc', b:5}, 6, 7]).operation(console.log)
  }
  ```

  나중에 유연하게 조건을 추가하기 위해서 경우의 수만큼 다 값으로 빼준다. 밖에 선택기가 따로 있고, 처리기는 각각 무엇을 처리할까에 대해서 관심을 갖게된다.

  operation을 통해서 loop를 돌림. 원래 제공되는 for of 같은 걸 쓰고싶다면 operation에 해당되는 것을 gernerator에게로 미루면 된다. 

  #### 팩토리 + 컴포지트 + ES6 lterable

  ```javascript
  const Operator = class {
      static factory(v) {
          if(v instanceof Object) {
              if(!Array.isArray(v)) v = Object.values(v);
              return new ArrayOp(v.map(v => Operator.factory(v)))
          } else return new PrimeOp(v);
      }
      constuctor(v) {this.v = v;}
      *gene() { throw 'override';}
  };
  
  const PrimeOp = class extends Operator {
      constructor(v) {super(v);}
      *gene() {yield this.v;}
  };
  
  const ArrayOp = class extends Operator {
      constructor(v) { super(v);}
      *gene() { for(const v of this.v) yield * v.gene();}
  };
  
  for(const v of Operator.factory([1,2,3,{a: 4, b: 5}, 6, 7]).gene()) console.log(v);
  ```

### LAZY EXCUTION

```javascript
const odd = fucntion*(data) {
    for(const v of data) {
        console.log("odd", odd.cnt++);
        if(v % 2) yield v;
    }
};
odd.cnt = 0;
for(const v of odd([1,2,3,4])) console.log(v);

const take = function*(data, n) {
    for(const v of data) {
        console.log("take", take.cnt++);
        if(n--) yield v; else break;
    }
};
take.cnt = 0;
for(const v of take([1,2,3,4])) console.log(v);
```

+ odd와 take를 결합하여 홀수인데 두개만 찾으려면?

  상태를 이용하면 홀수를 찾아서 배열을 만들고 거기서 두개 고르기. 배열 전체를 다 돈다음 추가로 두번 돌아야하기 때문에 배열 원소가 6개였으면 여덟번을 돌아야한다. 

  효율적으로 값을 찾으려면 홀수를 두번만에 찾고 take가 가져간 다음에 세번 내번째 돌아서 take가 또 가져가는 것. > 가다가 멈출수있다. 코루틴

  앞의 조건을 다성할떄가지 가다가 멈춘다. 언제? yield에서. yield를 받아서 내걸 전진시키고 그 다음에 yield를 요청해서 다시 yield에서 멈추고, 그 다음에 내걸 처리하고 빠져나오고

  ```javascript
  for (const v of take(odd[1,2,3,4]), 2) console.log(v);
  ```

  여기서 take는 배열이 아니라 generator의 결과물인 이터레이터를 받아들인 것. odd를 다 돌고 take2 를 한 것이 아니라 효율적으로 돌고 있음. 상태를 사용하는 경우 홀수를 찾는 배열이 200개라면 200개의 배열을 다 돌아서 홀수배열을 만든 다음에 2개를 찾았을 것임

#### YIELD*

```javascript
const Stream = class{
    static get(v) {return new Stream(v);}
    constructor(v) { 
    	this.v = v;
    	this.filters = [];
    }
    add(gene, ...arg) {
        this.filters.push(v => gene(v, ...arg));
        return this;
    }
    *gene() {
        let v= this.v;
        for(const f of this.filters) v = f(v);
        yield * v;
    }
};

const odd = function*(data) {
    for(const v of data) if(v%2) yield v;
}

const take = function*(data, n) {
    for(const v of data) if(n--) yield v; else break;
};
for(const v of Stream.get([1,2,3,4]).add(odd).add(take, 2).gene()) console.log(v);
```

복잡한 루프를 추상화시켜서 중복을 제거하고 추상 루프를 만들 수 있다. 지연 실행 특성을 이용해서 로스도 없이 정확하게 필요한 반복 횟수만 갖는 복잡한 루프를 추상화에 성공. 문에서 벗어남.