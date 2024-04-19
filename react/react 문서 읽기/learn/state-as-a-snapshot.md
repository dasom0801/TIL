# State as a Snapshot

https://react.dev/learn/state-as-a-snapshot

- 상태는 스냅샷처럼 동작한다. 상태 변수를 설정해도 이미 가지고 있는 상태 변수는 바뀌지 않는다. 대신 다시 렌더링된다.

## 상태 설정은 렌더링을 트리거한다.

- 이벤트에 반응하도록 하기 위해서는 상태를 업데이트 해야만 한다.
- 상태를 업데이트하면 리액트는 UI를 다시 그린다.

## 렌더링 할 때 스냅샷을 생성한다.

- 렌더링은 리액트가 컴포넌트를 호출하는 것을 의미한다.
- 함수(컴포넌트가) 리턴하는 JSX는 시간 속 UI의 스냅샷과 같다. Props, 이벤트 핸들러, 로컬 변수는 렌더링 당시의 상태를 사용하여 계산된다.
- UI 스냅샷은 인터렉티브하다. 리액트는 스냅샷에 맞게 화면을 업데이트하고 이벤트 핸들러를 연결한다.
- 리액트가 컴포넌트를 리렌더링할 때
  - 리액트는 함수를 다시 호출한다
  - 함수는 새로운 JSX 스냅샷을 리턴한다.
  - 리액트는 함수가 리턴한 스냅샷과 일치하도록 화면으로 업데이트한다.
- 상태를 설정하면 다음 렌더링에 변경된다.

  ```tsx
  import { useState } from 'react';

  export default function Counter() {
  	const [number, setNumber] = useState(0);

  	return (
  		<>
  			<h1>{number}</h1>
  			<button
  				onClick={() => {
  					setNumber(number + 1);
  					setNumber(number + 1);
  					setNumber(number + 1);
  				}}
  			>
  				+3
  			</button>
  		</>
  	);
  }
  ```

  - 버튼을 클릭했을 때 리액트의 동작
    1. setNumber(number + 1): number는 0 이다. 그렇기 때문에 setNumber(0 + 1)이다.
       - 리액트는 다음 렌더링에서 number를 1로 바꿀 준비를 한다.
    2. setNumber(number + 1): number는 0 이다. 그렇기 때문에 setNumber(0 + 1)이다.
       - 리액트는 다음 렌더링에서 number를 1로 바꿀 준비를 한다.
    3. setNumber(number + 1): number는 0 이다. 그렇기 때문에 setNumber(0 + 1)이다.
       - 리액트는 다음 렌더링에서 number를 1로 바꿀 준비를 한다.

- setNumber를 세 번 호출하더라도 이번 렌더링의 이벤트 헨들러 number는 항상 0이다. 그래서 state에 1만 세번 넣게 된다. 리렌더링한 다음 number는 3이 아니라 1이다.

## 시간에 따른 상태

```tsx
// alert은 0을 표시한다.
import { useState } from 'react';

export default function Counter() {
	const [number, setNumber] = useState(0);

	return (
		<>
			<h1>{number}</h1>
			<button
				onClick={() => {
					setNumber(number + 5);
					alert(number);
				}}
			></button>
		</>
	);
}
```

```tsx
// 타이머를 설정해도 alert은 0을 표시한다.
// alert에 전달했을 때의 snapshot을 표시한다.

setNumber(number + 5);
setTimeout(() => {
	alert(number);
}, 3000);
```

- alert이 실행할 때에는 React에 저장된 상태는 달라졌지만, 사용자와 상호작용한 시점의 스냅샷을 사용하도록 되어있다.
- 상태 변수는 이벤트 핸들러의 코드가 비동기식이라고 하더라도 렌더링 내에서 절대 변하지 않는다. React가 컴포넌트를 호출하여 UI의 스냅샷을 찍을 때 고정된다.
