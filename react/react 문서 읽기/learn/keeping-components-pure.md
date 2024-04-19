# Keeping Components Pure

## Purity: Components as formulas

- 모든 함수는 순수 함수로 작성되어야 한다.
- 리액트 컴포넌트는 같은 인풋에 대해서 항상 같은 JSX를 반환해야한다.

## Side Effects: (un)intended consequences

- React의 렌더링 프로세스는 항상 순수해야 하고 JSX만 반환해야 한다.

```tsx
let guest = 0;

function Cup() {
	// ❌: 기존 변수 변경.
	guest = guest + 1;
	return <h2>Tea cup for guest #{guest}</h2>
}

export default function TeaSet() {
	return (
		<Cup />
		<Cup />
		<Cup />
	)
}
```

- 컴포넌트의 외부에 선언된 변수를 읽고 쓰기 때문에 렌더링된 시점에 따라 다른 JSX를 생성하게 된다 ⇒ 예측할 수 없는 상황을 만든다.

```tsx
// props를 사용하는 것으로 해결
function Cup({ guest }) {
	return <h2>Tea cup for guest #{guest}</h2>
}

export default function TeaSet() {
	return (
		<Cup guest={1} />
		<Cup guest={2} />
		<Cup guest={3} />
	)
}
```

- 일반적으로 컴포넌트가 특정 순서로 렌더링되기를 기대해서는 안 된다.

### Detecting impure calculations with StrictMode

- React에서 렌더링하는 동안 읽을 수 있는 세가지 입력 props, state, context는 항상 읽기 전용으로 취급해야 한다.
- 사용자 입력에 대한 응답으로 무언가를 변경하려면 변수 대신 state를 설정해야한다.
- 컴포넌트가 렌더링되는 동안에 기존 변수나 객체를 변경해서는 안 된다.
- React는 개발 중에 각 컴포넌트의 함수를 두 번 호출하는 ‘Strict mode’를 제공한다. 엄격 모드는 컴포넌트 함수를 두 번 호출함으로써 규칙을 위반하는 컴포넌트를 찾는다.

## Local mutation: Your component’s little secret

- 컴포넌트 렌더링 중에, 컴포넌트 내부에서 변수를 변경하는 것은 문제가 되지 않는다.

```tsx
function Cup({ guest }) {
	return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
	let cups = [];
	for (let i = 1; i <= 12; i++) {
		cups.push(<Cup key={i} guest={i} />);
	}

	return cups;
}
```

## Where you *can* cause side effects

- 화면 업데이트, 애니메이션 시작, 데이터 변견 등을 사이드 이펙트이라고 부른다. 렌더링하는 동안이 아니라 ‘부수적으로’ 일어나는 일이다.
- 리액트에서 사이드 이펙트는 보통 이벤트 핸들러 안에 속한다. 이밴트 핸들러는 컴포넌트 내부에 정의되어 있지만 렌더링 중에는 실행되지 않기 때문에 순수할 필요가 없다.

### Why does React care about purity?

- 컴포넌트는 서버와 같은 다른 환경에서 실행될 수 있다. 동일한 입력에 대해 동일한 결과를 반환하기 때문에 하나의 컴포넌트가 여러 사용자 요청을 처리할 수 있다.
- 입력이 변경되지 않은 컴포넌트의 렌더링을 건너뛰면 성능을 향상시킬 수 있다. 순수 함수는 항상 동일한 결과를 반환하므로 캐싱해도 안전하다.
- 깊은 컴포넌트 트리 렌더링 도중에 일부 데이터가 변경되는 경우, 리액트는 렌더링에 시간을 낭비하지 않고 다시 시작할 수 있다.
