# ES6+ 함수와 OOP 3회차

>코드스피츠 3rd-3 ES6+ 함수와 OOP 3회차 <https://www.youtube.com/watch?v=1Z4j3JMTaJE&list=PLBNdLLaRx_rKOFzA3txlG5rf9ZaVUuvmv&index=3>

### HTML PARSER 만들기

#### 1. 데이터 분석

+ 어떤 현상을 보고 이것을 구조적이고 재귀적인 형태로 파악할 수 있느냐, 데이터 구조를 만들어낼 수 있느냐가 핵심. 

+ HTML을 TAG만 가지고 분석하면
  + A = `<TAG>` BODY `</TAG>`
  + B = `<TAG/>`
  + C = TEXT
  + BODY = (A|B|C)N // BODY는 A나 B나 C가 여러번 나오는 것. 

```javascript
const parser = input => {
    input = input.trim();
    const result = {name: 'ROOT', TYPE:'node', children: []} //가상의 el
    const stack = [{tag: result}];
    let curr, i = 0, j = input.length;
    while(curr = stack.pop()) {//스택 구조가 밖에 있고 알고리즘이 안에 있어서 스택구조를 오가면서 처리됨
        while(i<j) { // 받아온 문자열을 첨부터 끝까지 훑는 스캐너, i부터 j까지 돌면서 문자열을 파싱한다.
            
        }
    }
    return result; // 텍스트 덩어리를 구조적으로 객체화 하여 리턴한다.
};
```

+ 함수를 디자인할 때 arguments와 return값을 디자인한다. 이 함수가 무엇을하는지는 이 함수가 어떤 시그니쳐를 갖고 있느냐에 달려있음. 인자를 받아서 뭘 return 하는지를 확실히 해야 함수의 목적을 알 수 있다. 
+ 동적계획 > loop를 돌 수 있는 요인이 loop를 돌다가 변할 수 있는 것. 고급 루프는 런타임에 루프의 수가 변하는 게 일반적. 실제로 얼마나 루프를 돌지는 루프를 돌다가 깨닫는 경우가 많다. 

#### 2. C 인 경우

```javascript
const parser = input => {
    input = input.trim();
    const result = {name: 'ROOT', TYPE:'node', children: []};
    const stack = [{tag: result}];
    let curr, i = 0, j = input.length;
       while(curr = stack.pop()) {
        while(i<j) {        
            const cursor = i; // i를 조회에도 사용하고, 쓰기에도 사용하기때문에 헷갈리니까 cursor에 담아두고 쓴다. 
            if(input[cursor] === '<') {
                // A,B인 경우
            } else {
                // C인 경우(Text)
                // '>'에서 '<' 까지 사이에 있는 걸 text라 볼 수 있다. 
                const idx = input.indexOf('<', cursor);
                curr.tag.children.push({ 
                    type: 'text', text: input.substring(cursor, idx)
                }); //현재 stack이 가리키고 있는 태구의 자식으로 넣어준다. 
                i = idx; // i의 위치가 '<'로 이동한다.
            } // 텍스트 노드를 생성해서 부모에 추가한다는 독립적인 알고리즘 > 독립적인 알고리즘은 함수화 한다. 
        }
    }
    return result; 
};
```

**독립적인 알고리즘 > 함수로 적용**

+ 독립적인 역할을 인식하는 즉시 함수화 한다.

```javascript
const textNode = (input, cursor, curr) => {
    const idx = input.indexOf('<', cursor);
    curr.tag.children.push({ 
      type: 'text', text: input.substring(cursor, idx)
    });
    return idx; //i는 함수 밖에 있기때문에 idx를 return해서 밖에서 갱신한다.
}

const parser = input => {
    input = input.trim();
    const result = {name: 'ROOT', TYPE:'node', children: []};
    const stack = [{tag: result}];
    let curr, i = 0, j = input.length;
    while(curr = stack.pop()) {
    	while(i<j) {        
        	const cursor = i; // i를 조회에도 사용하고, 쓰기에도 사용하기때문에 헷갈리니까 cursor에 담아두고 쓴다. 
            if(input[cursor] === '<') {
                // A,B인 경우
            } else {
          		i = textNode(input, cursor, curr);
        	}
    	}
    }
    return result; 
};
```

+ 코드는 쉬운 것 부터 처리한다. 왜냐하면? 쉬운코드는 1) 의존성이 낮다. 2) 독립된 기능일 가능성이 높다. 쉬운것부터 짜야지 나중에 얘를 의존하는 애를 짜기가 편하다. 복잡한 것부터 짜면 자기것인 줄 알았는데 나중에 공유하는 부분도 크고 남한테 의존할 게 있었는데 자기 혼자 멋대로 처리해서 중복도 생겨나고 그런다. 쉬운것 부터 짜야지 더 견고하고 의존성 낮은 모듈로부터 의존성이 높은 모듈로 짜나갈수있다. 

#### 3. A,B인 경우 - 조건 나누기

+ A,B인 경우는 '<'에서 발동되는데 '<'가 나오는 것은 3가지 종류가 있다. 1) 시작 태그인 경우 2) 닫는 태그인 경우 3) 완료태그를 포함하는 경우 ('>' 로 끝나는 건 다 똑같음.) 각자 다른 상황을 갖지만, 공통점을 찾아서 그걸 먼저 처리해줌 > 코드 중복을 피하기 위해서 

```javascript
const textNode = (input, cursor, curr) => {
    const idx = input.indexOf('<', cursor);
    curr.tag.children.push({ 
      type: 'text', text: input.substring(cursor, idx)
    });
    return idx; 
}

const parser = input => {
    input = input.trim();
    const result = {name: 'ROOT', TYPE:'node', children: []};
    const stack = [{tag: result}];
    let curr, i = 0, j = input.length;
    while(curr = stack.pop()) {
    	while(i<j) {        
        	const cursor = i; 
            if(input[cursor] === '<') {
                // A,B인 경우
                const idx = input.indexOf('>', cursor); // cursor위치가 중요, 처음부터시작하면 앞에 있는 태그가 걸린다..
                i = idx + 1;
                if( input[cursor + 1] === '/') {
                    // 종료태그 </div>
                } else {
                    if(input[idx -1] === '/') { // 완료태그를 포함하는 경우 <img />
                        
                    } else { //시작태그
                        
                    }
                }
            } else {
                // C인 경우 (text)
          		i = textNode(input, cursor, curr);
        	}
    	}
    }
    return result; 
};
```

+ 좋은 코드를 짜는 것은 테스트 주도 개발에 있는게 아니라 데이터를 이해하거나 재귀적인 로직을 찾아내거나 추상화된 공통점을 찾아내거나 역할을 이해하거나 이런데에 있다.
+ 바른 데이터 모델링을 하면 코드와 현상을 바로 매핑할 수 있다. 상황을 정확하게 인식할 수 있으면 코드는 그냥 번역하면 된다. 

#### 4.  A,B인 경우 - 여는 태그

+ 공통점 : '<' 다음에 태그 이름을 만들 수 있다.
+ 다른점: '/'로 닫히는가 아닌가

```javascript
const textNode = (input, cursor, curr) => {
    const idx = input.indexOf('<', cursor);
    curr.tag.children.push({ 
      type: 'text', text: input.substring(cursor, idx)
    });
    return idx; 
}

const parser = input => {
    input = input.trim();
    const result = {name: 'ROOT', TYPE:'node', children: []};
    const stack = [{tag: result}];
    let curr, i = 0, j = input.length;
    while(curr = stack.pop()) {
    	while(i<j) {        
        	const cursor = i; 
            if(input[cursor] === '<') {
                // A,B인 경우
                const idx = input.indexOf('>', cursor); // cursor위치가 중요, 처음부터시작하면 앞에 있는 태그가 걸린다..
                i = idx + 1;
                if( input[cursor + 1] === '/') {
                    // 종료태그 </div>
                } else {
                    let name, isClose;
                    if(input[idx -1] === '/') { // 완료태그를 포함하는 경우 <img />
                        name = input.substring(cursor + 1, idx -1), isClose = true;
                    } else { //시작태그
                        name = input.substring(cursor + 1, idx), isClose = false;
                    } // 경우의 수 case, case는 값으로 바꿀 수 있다.
                    const tag = {name, type = 'node', children = []};
                	curr.tag.children.push(tag);
                	if(!isClose) {
                    	stack.push({tag, back: curr}); // back은 닫히는 코드를 만났을 때 다시 돌아올 태그를 알려준다. 
                        break;
                	}
                }
            } else {
                // C인 경우 (text)
          		i = textNode(input, cursor, curr);
        	}
    	}
    }
    return result; 
};
```

+ case를 인식하지 않고 그 값을 사용하는 일반화된 알고리즘이 나온다. 알고리즘을 분리하지 않고 case의 차이를 값으로 흡수해서 그 값을 소비하는 하나의 알고리즘만 만들어냈다. > 연산은 메모리로 교환가능 > 그 메모리를 가리키는 하나의 연산만 밑에 기술하면 된다.
+ 차이를 일으키는 연산을 메모리에 흡수한 다음에 그 메모리를 이용하는 하나의 로직만 기술한다. 이렇게 하지 않으면 케이스마다 알고리즘이 달라져서 유지보수가 어렵고 이해하기도 어려워진다.

**독립적인 알고리즘 > 함수로 전환**

```javascript
const textNode = (input, cursor, curr) => {
    const idx = input.indexOf('<', cursor);
    curr.tag.children.push({ 
      type: 'text', text: input.substring(cursor, idx)
    });
    return idx; 
}

const elementNode = (input, cursor, idx, curr, stack) => {
    let name, isClose;
    if(input[idx-1] === '/') {
        name = input.substring(cursor+1, idx-1), isClose = true;
    } else {
        name = input.substring(cursor+1, idx), isClose = false;
    }
    const tag = {name, type = 'node', children: []};
	curr.tag.children.push(tag);
	if(!isClose) {
    	stack.push({tag, back: curr});
        return true;
	}
	return false;
};

const parser = input => {
    input = input.trim();
    const result = {name: 'ROOT', TYPE:'node', children: []};
    const stack = [{tag: result}];
    let curr, i = 0, j = input.length;
    while(curr = stack.pop()) {
    	while(i<j) {        
        	const cursor = i; 
            if(input[cursor] === '<') {
                // A,B인 경우
                const idx = input.indexOf('>', cursor); 
                i = idx + 1;
                if( input[cursor + 1] === '/') {
                    // 종료태그 </div>
                } else {
                  if(elementNode(input, cursor, idx, curr, stack)) break;
                    // 새로운 curr을 만들고 break를 걸었기때문에 while(i<j)를 빠져나가고 바깥쪽 while에서 새로운 curr을 얻게 된다. 새로운 curr에서 다시 그 다음 인덱스를 진행하게 된다.
                }
            } else {
                // C인 경우 (text)
          		i = textNode(input, cursor, curr);
        	}
    	}
    }
    return result; 
};
```

+ 코드의 가독성 확보란? 

  쉬운 코드는? 역할에게 위임하는 코드. 역할을 인식해서 역할에 위임하는 코드를 만들어야 코드가 쉬워진다. 그렇지 않으면 변수명을 예쁘게 쓰든 코딩컨벤션을 지키든 무조건 어렵다. 

  코드가 readable하다는 것은 적절한 역할 모델로 위임되어서 걔네들의 통신과 협업만 볼 수 있는 코드이다. 

#### 5. A,B인 경우 - 닫는 태그

```javascript
const textNode = (input, cursor, curr) => {
    const idx = input.indexOf('<', cursor);
    curr.tag.children.push({ 
      type: 'text', text: input.substring(cursor, idx)
    });
    return idx; 
}

const elementNode = (input, cursor, idx, curr, stack) => {
    let name, isClose;
    if(input[idx-1] === '/') {
        name = input.substring(cursor+1, idx-1), isClose = true;
    } else {
        name = input.substring(cursor+1, idx), isClose = false;
    }
    const tag = {name, type = 'node', children: []};
	curr.tag.children.push(tag);
	if(!isClose) {
    	stack.push({tag, back: curr});
        return true;
	}
	return false;
};

const parser = input => {
    input = input.trim();
    const result = {name: 'ROOT', TYPE:'node', children: []};
    const stack = [{tag: result}];
    let curr, i = 0, j = input.length;
    while(curr = stack.pop()) {
    	while(i<j) {        
        	const cursor = i; 
            if(input[cursor] === '<') {
                // A,B인 경우
                const idx = input.indexOf('>', cursor); 
                i = idx + 1;
                if( input[cursor + 1] === '/') {
                  curr = curr.back; // 이전으로 curr을 되돌린다.
                } else {
                  if(elementNode(input, cursor, idx, curr, stack)) break;
                }
            } else {
                // C인 경우 (text)
          		i = textNode(input, cursor, curr);
        	}
    	}
    }
    return result; 
};
```

#### 6. elementNode 함수의 중복제거

```javascript
const textNode = (input, cursor, curr) => {
    const idx = input.indexOf('<', cursor);
    curr.tag.children.push({ 
      type: 'text', text: input.substring(cursor, idx)
    });
    return idx; 
}

const elementNode = (input, cursor, idx, curr, stack) => {
	const isClose = index[idx-1] === '/';
    const tag = {name: input.substring(cursor + 1, idx -(isClose? 1 : 0)), type = 'node', children: []};
	curr.tag.children.push(tag);
	if(!isClose) {
    	stack.push({tag, back: curr});
        return true;
	}
	return false;
};

const parser = input => {
    input = input.trim();
    const result = {name: 'ROOT', TYPE:'node', children: []};
    const stack = [{tag: result}];
    let curr, i = 0, j = input.length;
    while(curr = stack.pop()) {
    	while(i<j) {        
        	const cursor = i; 
            if(input[cursor] === '<') {
                // A,B인 경우
                const idx = input.indexOf('>', cursor); 
                i = idx + 1;
                if( input[cursor + 1] === '/') {
                  curr = curr.back; // 이전으로 curr을 되돌린다.
                } else {
                  if(elementNode(input, cursor, idx, curr, stack)) break;
                }
            } else {
                // C인 경우 (text)
          		i = textNode(input, cursor, curr);
        	}
    	}
    }
    return result; 
};
```

+ 중복된 코드를 줄이는 수준은 코드를 작성하는 사람의 수준에 달려있다. 중복은 제거하는 게 아니라 발견하는 것. 실력에 따라서 코드수준의 중복, 아키텍쳐 수준의 중복, 데이터 수준의 중복을 깨닫게 된다.  실력이 올라가면 더 많은 중복이 보인다. 
+ 코드를 짠 다음에 버리는 게 아니라 계속 볼 수 있으면 계속 본다. 볼 때마다 중복이 보이면 실력이 올라갔다는 걸 인식할 수 있다. 동시에 올라가는 것이 아니라 따로따로 훈련해야 올라간다. 각각을 훈련해야 함. 
+ 언어에 대한 바른 이해와 문법에 대한 해박한 사용방법을 이해할 수록 코드 중복을 줄일 수 있다. 숙련된 사람은 코드를 줄이면서도 의미를 훼손하지 않는다.
+ 아키텍쳐 레벨은 역할 관계를 인식하고 책임이 어디까지 들어가는지 얼마나 확장 가능성이 있는지를 보는 눈에서부터 어디가 중복이고 어디가 레이어를 나눠줘야하는지 눈이 생긴다. 
+ 데이터 중복은 전통적인 RDB의 정규화를 비롯하여 중복을 제거하는 다양하고 안정적인 로직들이 있음

##### 과제

1) 스택 제거

2) JSON parser 

3) 꼬리물기 최적화가 적용된 재귀함수