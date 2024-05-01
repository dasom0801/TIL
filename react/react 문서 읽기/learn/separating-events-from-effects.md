# Separating Events from Effects

https://react.dev/learn/separating-events-from-effects

- 이벤트 핸들러는 동일한 인터랙션을 다시 수행할 때만 다시 실행된다
- 이펙트는 props나 state 같은 값이 마지막 렌더링 때와 다른 경우 다시 동기화된다.

## 이벤트 핸들러와 이펙트 중에서 선택

- Chat room component 요구 사항
  - 컴포넌트는 선택한 채팅방에 자동으로 연결되어야 한다.
  - ‘Send’ 버튼을 클릭하면 채팅에 메시지를 보내야 한다.
    ⇒ 이벤트 핸들러와 이펙트 중 어떤 걸 사용해야 할지 고민된다면 코드가 실행되어야 하는 이유를 생각해보자

### 특정 상호작용에 대한 응답으로 실행되는 이벤트 핸들러

- 사용자 입장에서는 ‘Send’ 버튼을 클릭했을 때 메시지가 전송되어야 한다. ⇒ 이벤트 핸들러 사용
- 이벤트 핸들러를 사용하면 특정 상호작용을 처리할 수 있다.
- 사용자가 버튼을 누를 때만 sendMessage(message)가 실행되도록 할 수 있다.

```tsx
function ChatRoom({ roomId }) {
	const [message, setMessage] = useState('');
	// ...
	function handleSendClick() {
		sendMessage(message);
	}
	// ...
	return (
		<>
			<input value={message} onChange={(e) => setMessage(e.target.value)} />
			<button onClick={handleClick}>Send</button>
		</>
	);
}
```

### 동기화가 필요할 때마다 이펙트 실행

- 채팅방에 연결한 상태를 유지하는 것은 특정한 상호작용 때문이 아니다.
- 사용자가 아무런 상호작용을 수행하지 않았더라도 연결해야 한다.

```tsx
function ChatRoom({ roomId }) {
	useEffect(() => {
		const connection = createConnetion(serverUrl, roomId);
		connection.connect();
		return () => {
			connection.disconnect();
		};
	}, [roomId]);
}
```

## 반응형 값과 반응형 로직

- 이벤트 핸들러는 버튼을 클릭하는 등 ‘수동’으로 트리거된다.
- 이펙트는 동기화 상태를 유지하는 데 필요한 만큼 ‘자동’으로 자주 실행되고 다시 실행된다.
- 이벤트 핸들러 내부의 로직은 반응형이 아니다
  - 사용자가 동일한 상호작용을 다시 수행하지 않는 한 다시 실행되지 않는다.
  - 이벤트 핸들러는 반응형 값의 변경에 반응하지 않고 값을 읽을 수 있다.
- 이펙트 내부의 로직은 반응형이다
  - 이펙트가 반응형 값을 읽는 경우 의존성으로 지정해야 한다.
  - 리렌더링으로 인해 값이 변경되면 리액트가 새 값으로 이펙트의 로직을 다시 실행한다.

### 이벤트 핸들러 내부의 로직은 반응형이 아니다

- 사용자가 메시지를 작성한다고 해서 메시지를 보내겠다는 의미는 아니다. ⇒ 메시지를 전송하는 로직은 반응형이면 안 된다.
- 반응형 값이 변경되었다는 이유만으로 다시 실행되어서는 안 되기 때문에 이벤트 핸들러에 속해야한다.

```tsx
function handleSendClick() {
	sendMessage(message);
}
```

### 이펙트 내부의 로직은 반응형이다

```tsx
const connection = createConnection(serverUrl, roomId);
connection.connect();
```

- 사용자 입장에서 보면 roomId가 변경되었다는 것은 다른 룸에 연결하고 싶다는 의미 ⇒ room에 연결하기 위한 로직은 반응형이어야 함
- 반응형 값을 따라가며 반응형 값이 다르면 실행되어야 하기 때문에 이펙트에 속해야한다.

## 이펙트에서 반응형이 아닌 로직 추출하기

```tsx
// 연결되었을 때 theme에 따른 notifiaction을 보여주는 예제
function ChatRoom({ roomId, theme }) {
	useEffect(() => {
		const connection = createConnection(serverUrl, roomId);
		connection.on('connected', () => {
			showNotification('Connected', theme);
		});
		connection.connect();
		return () => {
			connection.disconnect();
		};
	}, [roomId, theme]); // 이펙트에서 참조하는 모든 반응형 값은 의존성에 추가해야한다.
// ...
```

⇒ theme를 바꿀 때마다 다시 연결되는 것은 의도한 동작이 아니다.

### 이펙트 이벤트 선언하기

- `useEffectEvent` 라는 hook을 사용하여 로직을 이펙트에서 추출한다.

```tsx
import { useEffect, useEffectEvent } from 'react';

function ChatRoom({roomId, theme }) {
	const onConnected = useEffectEvent(() => {
		showNotifiaction('Connected', theme);
	});
// ...
```

- `onConnected` 를 이펙트 이벤트라고 부른다.
- 이펙트 로직의 일부지만 이벤트 핸들러와 비슷하게 동작한다.
- 내부 로직은 반응형이 아니며 항상 props와 state의 최신값을 확인한다.

```tsx
// 이펙트 내부에서 onConnected를 호출 할 수 있다.
useEffect(() => {
	const connection = createConnection(serverUrl, roomId);
	connection.on('connected', () => {
		onConnected();
	});
	connection.connect();
	return () => connection.disconnect();
}, [roomId]); // onConnected는 의존성에 포함하지 않는다.
```

- onConnected는 반응형 이벤트가 아니기 때문에 의존성에서 생략해야 한다.
- 이펙트 이벤트와 이벤트 핸들러의 가장 큰 차이점은 이벤트 핸들러는 사용자 상호작용에 대한 응답으로 실행되고, 이펙트 이벤트는 이펙트에서 트리거한다는 점이다.

### 이펙트 이벤트로 최신 props와 state 읽기

```tsx
// 서로 다른 URL에 대해 별도의 방문을 기록하려고 할 때
function Page({ url }) {
	useEffect(() => {
		logVisit(url); // logVisit 호출은 url에 대해 반응형이어야 한다.
	}, [url]); // 의존성에 url이 추가되어야 한다.
}
```

```tsx
// 페이지 방문과 함께 장바구니에 있는 품목 수를 포함시키고 싶은 경우
function Page({ url }) {
	const { items } = useContext(ShoppingCartContext);
	const numberOfItems = items.length;

	useEffect(() => {
		logVisit(url, numberOfItems);
	}, [url]); // logVisit 호출이 numberOfItems에 의해 반응하는 걸 원하지 않음
}
```

```tsx
function Page({ url }) {
	const { items } = useContext(ShoppingCartContext);
	const numberOfItems = items.length;

	const onVisit = useEffectEvent((visitedUrl) => {
		logVisit(visitedUrl, numberOfItems);
	});

	useEffect(() => {
		onVisit(url);
	}, [url]);
	// ...
}
```

- `onVisit` 안의 코드는 반응형이 아니기 때문에 변경 시에 다른 코드가 다시 실행될 걱정 없이 numberOfItems를 사용할 수 있다.
- 이펙트 자체는 반응형으로 유지된다. 이펙트는 다른 url로 렌더링할 때마다 다시 실행된다.
- 결과적으로 url이 변경될 때마다 logVisit를 호출하고 항상 최신 numberOfItems를 읽는다. 하지만 numberOfItems가 자체적으로 변경되는 경우에는 코드가 다시 실행되지 않는다.
- useEffectEvent에서 url을 직접 사용해도 문제는 없지만 명시적으로 url를 넘기는 것이 좋다.

### 이펙트 이벤트의 제한 사항

- 이펙트 이벤트는 이펙트 내부에서만 호출할 수 있다.
- 다른 컴포넌트나 훅에 전달해서는 안 된다.
