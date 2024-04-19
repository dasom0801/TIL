# useState

https://react.dev/reference/react/useState

컴포넌트에 상태 변수를 추가할 수 있도록 해주는 리액트 훅

```tsx
const [state, setState] = useState(initialState);
```

# Reference

## useState(initialState)

- 컴포넌트 최상위 레벨에서 useState를 호출하여 상태 변수를 선언한다.
- 구조 분해 할당으로 `[something, setSomething]` 처럼 변수 이름을 지정하는 것이 관례

```tsx
import { useState } from 'react';

function MyComponent() {
	const [age, setAge] = useState(28);
	const [name, setName] = useState('Taylor');
	const [todos, setTodos] = useState(() => createTodos());
	// ..
}
```

### Parameters

- `InitialState`
  - 초기에 설정하고 싶은 값. 어떤 값이든 설정할 수 있다.
  - 함수인 경우 초기 렌더링 이후로는 무시된다. 컴포넌트를 초기화할 때 호출하고 그 반환 값을 초기 상태로 저장한다.
  - InitialState에 넘긴 함수는 initializer function 으로 취급된다
    - 순수 함수여야 한다.
    - 인수를 받아서는 안 된다
    - 어떤 타입의 값이라도 반환해야 한다.

### Returns

- useState는 두 개의 값을 배열로 반환한다.
  1. 현재 상태. 첫번째 렌더링에서는 initialState로 넘긴 값이다.
  2. set 함수. 상태를 다른 값으로 갱신하고 리렌더링을 발생시킨다.

### 주의 사항

- useState는 Hook이기 때문에 컴포넌트나 커스텀의 최상위 레벨에서 호출 할 수 있다. 반복문이나 조건문에서는 사용 불가. 필요하다면 새로운 컴포넌트를 만들고 그곳으로 state를 이동해야 한다.
- 엄격 모드에서는 실수로 인한 불순물을 찾기 위해 initializer function를 두 번 호출한다. 개발 모드에서만 그렇게 행동하고 프로덕션에 영향을 주지 않는다. initializer function 이 순수함수라면 (순수 함수여야 함) 동작에 영향을 주지 않는다. 호출한 결과중 하나는 무시된다.

## `set` 함수

- useState가 반환한 `set` 함수로 상태를 바꾸고 리렌더링을 발생킬 수 있다.
- 다음 상태값을 직접 넘기거나, 이전 값을 통해서 계산하는 함수를 넘길 수 있다.

```tsx
const [name, setName] = useState('Edward');

function handleClick() {
  setName('Taylor');
  setAge(a => a + 1);
	//..
```

### Pramters

- `nextState` 상태로 만들고 싶은 값. 어떤 타입이든 값이 될 수 있다.
- nextState 에 넘긴 함수는 updater function 으로 취급된다.
  - 순수 함수여야 한다.
  - pending state만을 인수로 받는다.
  - 다음 상태를 리턴해야한다.
- React 는 updater function 을 대기열에 넣고 리렌더링을 한다. 리렌더링 중에 리액트는 대기열에 있는 모든 업데이트를 가지고 이전 상태로 다음 상태를 계산한다.

### Returns

- set 함수는 리턴 값이 없다

### 주의 사항

- set 함수는 다음 렌더링을 위한 상태만 업데이트 한다. set 함수를 호출한 다음 state 를 읽으면 호출 전 화면에 있던 이전 값을 가져오게된다.
- 새로운 값과 현재 값을 Object.is 로 비교했을 때 달리지 않았으면 자식을 다시 렌더링하지 않는다.
- 리액트는 모든 이벤트 핸들러가 실행되고 set 함수를 호출한 다음에 화면을 업데이트 한다. 하나의 이벤트에서 여러번 리렌더링되는 것을 막을 수 있다.
- DOM에 엑세스하기 위해서 화면을 더 빨리 업데이트 해야하는 경우 flushSync를 사용할 수 있다.
- 렌더링 중에 set 함수를 호출하는 것은 현재 렌더링 중인 컴포넌트 내에서만 허용된다. 리액트는 즉시 새로운 상태로 리렌더링한다. 이전 렌더링 정보를 저장하는 데 사용할 수 있다.
- 엄격 모드에서는 실수로 인한 불순물을 찾기 위해 updator function를 두 번 호출한다. 개발 모드에서만 그렇게 행동하고 프로덕션에 영향을 주지 않는다. updater function 이 순수함수라면 (순수 함수여야 함) 동작에 영향을 주지 않는다. 호출한 결과중 하나는 무시된다.

# Usage

### 컴포넌트에 상태 추가하기

```tsx
import { useState } from 'react';

function MyComponent() {
	const [ age, setAge ] = useState(42);
	const [ name, setName ] = useState('Taylor');
// ..
```

- useState는 두 개의 값을 배열로 반환한다.
  1. 현재 상태. initial state로 제공된 값을 초기에 설정한다.
  2. set 함수. 상호 작용에 따라 상태를 다른 값으로 변경할 수 있게 한다.
- React는 다음 상태를 저장하고 새로운 값으로 다시 렌더링한 후 UI를 업데이트한다.

```tsx
// 상태가 변경되지 않음 => 다음 렌더링에서 반영된다.
function handleClick() {
	setName('Robin');
	console.log(name); // Taylor
}
```

### 이전 상태 값으로 상태 업데이트하기

```tsx
function handleClick() {
	setAge(age + 1); // setAge(42 + 1)
	setAge(age + 1); // setAge(42 + 1)
	setAge(age + 1); // setAge(42 + 1)
}
```

- set 함수를 호출하는 것은 이미 실행중인 코드의 state variable을 바꾸지 않기 때문에 이벤트 핸들러에서 set 함수를 세 번 호출한다고 해서 값이 세 번 바뀌지 않는다.

```tsx
function handleClick() {
	setAge((a) => a + 1); // setAge(42 => 43)
	setAge((a) => a + 1); // setAge(43 => 44)
	setAge((a) => a + 1); // setAge(44 => 45)
}
```

- updater 함수는 pending state로부터 next state를 계산한다.
- 리액트는 updater 함수를 큐에 넣고, 다음 렌더에서 순서대로 호출한다. 대기열에 다른 업데이트가 없으면 마지막에 반환한 next state를 current state로 저장한다.
  1. a => a + 1 는 42를 pending state로 받고 next state로 43을 반환한다.
  2. a => a + 1 는 43을 pending state로 받고 next state로 44를 반환한다.
  3. a => a + 1 는 44를 pending state로 받고 next state로 45를 반환한다.
- pending state의 이름은 state 변수의 첫번째 글자로 하는 것이 관례이다. age 는 a로. 하지만 preAge처럼 더 명확한 변수명을 사용할 수도 있다.
- 개발 과정에서 updater function이 순수한지 확인하기 위해 두 번 호출될 수 있다.

### Updater를 항상 사용해야 할까?

- 클릭과 같은 의도적인 사용자 행동이 있으면 다음 클릭 전에 상태 변수가 업데이트 된다. 이벤트 핸들러가 실행될 때 오래된 상태 변수를 볼 위험은 없다.
- 동일한 이벤트 내에서 여러 번 업데이트를 수행하는 경우 updater를 사용하는 것이 좋을 수 있다.
- 상태 변수 자체에 액세스하기 힘든 상황에서도 updater를 사용하는 것이 유용하다.
- 일관성을 선호한다면 이전 상태를 가지고 계산하는 경우 항상 업데이터를 작성하는 것이 합리적이다.
- 다른 상태 변수의 이전 상태을 가지고 계산하는 경우 하나의 객체로 결합하고 reducer를 사용할 수 있다.

### 객체와 배열 상태 업데이트하기

- React에서 state는 읽기 전용이기 때문에 기존 객체를 변경하지 말고 대체해야 한다.

```tsx
// 이건 하지 말고
form.firstName = 'Taylor';

// 이렇게 해라
setForm({
	...form,
	firstName: 'Taylor',
});
```

### 초기 상태 다시 만들지 않기

- 리액트는 초기 상태를 한 번 저장한 뒤 다음 렌더링부터는 무시한다.
- 상태를 만드는 함수가 모든 렌더링에 호출하지 않도록 하려면 useState에 initializer function을 전달한다.
- initializer function에 함수 호출 결과가 아닌 함수 자체를 전달한다.

```tsx
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  // ...
```

### key로 상태 초기화

- 컴포넌트에 다른 키를 전달하여 컴포넌트의 상태를 재설정할 수 있다.
- 키가 변경되면 React는 컴포넌트(및 그 모든 자식)를 처음부터 다시 생성하기 때문에 상태가 초기화된다.

### 이전 렌더링으로부터 정보 저장

- 만약에 필요한 값이 props나 다른 상태에서 계산할 수 있는 경우 중복되는 상태를 제거할 것. 자주 계산되는 것이 걱정된다면 useMemo를 사용
- 컴포넌트 트리 전체의 state를 초기화 하고 싶은 경우 컴포넌트에 다른 key를 넘기면 된다.
- 가능하다면 이벤트 핸들러에서 관련된 상태를 모두 업데이트 하라.
- 이전 값으로 부터 상태를 계산하고 싶은 경우
  - 레더링 중에 set 함수를 호출하는 경우 prevCount !== count 같은 조건 안에 있어야 한다.
  - 조건 안에는 setPrevCount(count) 같은 호출이 있어야 한다.
  ```tsx
  export default function CountLabel({ count }) {
  	const [prevCount, setPrevCount] = useState(count);
  	const [trend, setTrend] = useState(null);

  	if (prevCount !== count) {
  		setPrevCount(count);
  		setTrend(count > prevCount ? 'increasing' : 'decreasing');
  	}

  	return (
  		<>
  			<h1>{count}</h1>
  			{trend && <p>The count is {trend}</p>}
  		</>
  	);
  }
  ```
  - 일반적으로 피하는 것이 가장 좋지만, 이펙트에서 상태를 업데이트하는 것보다 낫다.
  - 렌더링 도중 set 함수를 호출하면 React는 컴포넌트가 반환문으로 종료된 직후, 그리고 자식들을 렌더링하기 전에 해당 컴포넌트를 다시 렌더링한다.

## Troubleshooting

### 상태를 업데이트 했지만, 이전 상태가 로깅됨

- 왜냐하면 상태는 스냅샷처럼 동작하기 때문에
- 상태를 업데이트하면 새 상태 값으로 리렌더링을 요청하지만, 이미 실행 중인 이벤트 핸들러의 변수에는 영향을 미치지 않는다.

```tsx
function handleClick() {
	console.log(count); // 0;
	setCount(count + 1); // 1로 리렌더링 요청
	console.log(count); // 0
	setTimeout(() => {
		console.log(count); // 0!
	}, 5000);
}
```

### 상태를 업데이트 했지만, 화면이 바뀌지 않음

- [Object.is](http://Object.is) 로 비교해서 다음 상태와 이전 상태가 같으면 React는 업데이트를 하지 않는다.

```tsx
obj.x = 10; // 함수의 값을 수정해서는 안 된다.
setObj(obj); // 아무것도 달라지지 않는다.
```

- 객체와 배열은 직접 수정하는 게 아니라 교체 해야한다.

```tsx
setObj({
	...obj,
	x: 10,
});
```

### “Too many re-renders” 에러

- `Too many re-renders. React limits the number of renders to prevent an infinite loop.`
- 렌더링 중에 무조건 state를 설정하기 때문에 컴포넌트가 렌더링, state 설정 (렌더링을 발생시킴), 렌더링, state 설정… 루프에 진입한다.
- 이벤트 핸들러를 지정하는 과정에서 실수로 발생하는 경우가 많다.

```tsx
// 렌더링 중에 호출
return <button onClick={handleClick()}>Click me</button>;

// 이벤트 핸들러에 전달한다.
return <button onClick={handleClick}>Click me</button>;

// 이벤트 핸들러에 인라인 함수로 전달한다.
return <button onClick={(e) => handleClick(e)}>Click me</button>;
```

### Initializer나 updater 함수가 두번 실행됨

- StrictMode에서 리액트는 함수를 두 번 호출한다.

```tsx
function TodoList() {
	// 컴포넌트 함수는 모든 렌더링 마다 두번씩 실행된다.
	const [todos, setTodos] = useState(() => {
		// initializer function은 초기화에서 두 번 실행된다.
		return createTodos();
	});

	function handleClick() {
		setTodos((prevTodos) => {
			// updater function은 모든 클릭마다 두 번 실행된다.
		});
	}
}
```

- 개발 모드에서만 이렇게 동작하고 컴포넌트를 순수하게 유지하는 데 도움을 준다.
- 호출 중 하나의 결과를 사용하고 다른 호출의 결과는 무시한다.
- 함수가 순수하다면 로직에 영향을 미치지 않지만, 그렇지 않은 경우 알아차릴 수 있다.

```tsx
setTodos((prevTodos) => {
	// 잘못된 변경
	prevTodos.push(createTodo());
});
```

- updater function이 두 번 호출되기 때문에 todo가 두번 추가된 걸 볼 수 있고 실수를 발견할 수 있다.

### 상태를 함수로 설정하려고 하는데 대신 함수가 호출됨

```tsx
// initializer function 과 updater function을 잘못 전달한 경우
const [fn, setFn] = useState(someFunction);

function handleClik() {
	setFn(someOtherFunction);
}

// initializer function 과 updater function를 올바르게 전달한 경우
const [fn, setFn] = useState(() => someFunction);

function handleClik() {
	setFn(() => someOtherFunction);
}
```
