# Lifecycle of Reactive Effects

https://react.dev/learn/lifecycle-of-reactive-effects

- 이펙트는 컴포넌트와 다른 생명 주기를 갖는다.
- 컴포넌트는 마운트, 업데이트, 언마운트할 수 있다.
- 이펙트는 동기화를 시작하고 나중에 동기화를 중지하는 두 가지 작업만 할 수 있다.
  ⇒ 이펙트가 의존하는 값에 따라서 이 주기가 여러번 발생할 수 있다.

## Effect의 생명주기

- 리액트 컴포넌트는 동일한 생명 주기를 거친다.
  - 컴포넌트 마운트: 화면에 추가 되었을 때
  - 컴포넌트 업데이트: 상호작용에 대한 응답으로 새로운 프로퍼티나 상태를 받을 때
  - 컴포넌트 언마운트: 화면에서 제거되었을 때
- 이펙트의 생명주기는 컴포넌트와 독립적이다.

```tsx
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
	useEffect(() => {
		// 동기화를 시작하는 방법이 명시되어 있다.
		const connection = createConnection(serverUrl, roomId);
		connection.connect();
		return () => {
			// 동기화를 멈추는 방법이 명시되어 있다.
			connection.disconnect();
		};
	}, [roomId]);
	//...
}
```

- cleanup 함수를 반환하지 않는 경우 리액트는 빈 cleanup함수를 반환한 것처럼 동작한다.

### 동기화가 두 번 이상 수행되어야 할 수도 있는 이유

- 사용자가 드롭다운에서 roomId를 선택 ⇒ roomId: general

```tsx
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId /* 'general '*/ }) {
	//...
	return <h1>Welcome to the {roomId} room!</h1>;
}
```

- UI가 그려진 다음 Effect는 동기화를 시작하고 ‘general’ room에 연결한다.

```tsx
function ChatRoom({ roomId /* 'general '*/ }) {
	useEffect(() => {
		// 'general' room으로 연결
		const connection = createConnection(serverUrl, roomId);
		connection.connect();
		return () => {
			// 'general' room과 연결 해제
			connection.disconnect();
		};
	}, [roomId]);
	//...
}
```

- 사용자가 드롭다운에서 roomId를 선택 ⇒ roomId: travel

```tsx
function ChatRoom({ roomId /* "travel" */ }) {
	// ...
	return <h1>Welcome to the {roomId} room!</h1>;
}
```

리액트가 수행해야하는 작업

- 이전 roomId와 동기화 중지
- 새로운 roomId로 동기화 시작

### 리액트가 이펙트를 재동기화 하는 방법

- 다른 room에 연결하려면 리액트가 애펙트를 다시 동기화해야한다.
- 동기화를 중지하기 위해서 이전 roomId(‘general’)에 연결한 후 이펙트가 반환한 클린업 함수를 호출한다
- 그 다음 리액트는 렌더링 중에 제공한 이펙트를 실행한다. 새로운 roomId(’travel’)로 동기화 시작
- 컴포넌트가 다른 roomId로 다시 렌더링할 때마다 이펙트가 다시 동기화된다.
- 사용자가 다른 화면으로 이동하면 ChatRoom 언마운트 ⇒ 리액트가 마지막으로 이펙트의 동기화를 중지하고 채팅방의 연결을 끊는다.

### 이펙트 관점에서 생각하기

- 컴포넌트 관점에서 보면 이펙트를 ‘렌더링 후’ 또는 ‘마운트 해제 전’과 같은 특정 시점에 실행되는 ‘콜백’ 또는 ‘수명 주기 이벤트’로 생각하기 쉬움
- 컴포넌트 관점에서 생각하는 대신 하나의 시작/중지 사이클에 집중하자. 컴포넌트의 마운트, 업데이트, 언마운트 여부는 중요하지 않다. 동기화를 시작하는 방법과 동기화를 중지하는 방법을 설명할 수 있으면 된다.

### 이펙트가 재동기화할 수 있는지 확인하는 방법

- 리액트는 개발 단계에서 강제로 즉시 동기화를 수행하여 이펙트가 다시 동기화할 수 있는지 확인한다.
- 리액트는 개발 중에 이펙트를 한 번 더 시작하고 중지하여 클린업을 잘 구현했는지 확인한다.

### 리액트가 이펙트를 다시 동기화해야 한다는 것을 인식하는 방법

- 컴포넌트가 다시 렌더링될 때마다 React는 사용자가 전달한 의존성 배열을 살펴본다.
- 배열의 값 중 하나라도 이전 렌더링 중에 전달한 값과 다르면 리액트는 이펙트를 다시 동기화한다.

### 각 이펙트는 별도의 동기화 프로세스를 나타낸다.

- 관련 없는 로직을 이펙트에 추가하지 말 것

```tsx
// 사용자가 room에 방분할 때마다 분석 이벤트를 전송하고 싶은 경우
function ChatRoom({ roomId }) {
	useEffect(() => {
		// 이미 roomId에 의존하는 Effect가 있으므로 분석을 추가
		logVisit(roomId);

		const connection = createConnection(serverUrl, roomId);
		connection.connect();
		return () => {
			// 'general' room과 연결 해제
			connection.disconnect();
		};
	}, [roomId]);
}
```

이펙트에 다른 의존성이 추가된다면 의도하지 않은 logVisit 호출이 발생함 ⇒ 이펙트를 분리해야한다.

```tsx
function ChatRoom({ roomId }) {
	useEffect(() => {
		logVisit(roomId);
	}, [roomId]);

	useEffect(() => {
		const connection = createConnection(serverUrl, roomId);
		connection.connect();
		return () => {
			// 'general' room과 연결 해제
			connection.disconnect();
		};
	}, [roomId]);
}
```

- 한 이펙트를 삭제해도 다른 이펙트의 로직이 깨지지 않는다 ⇒ 서로 다른 것을 동기화하므로 분리하는 것이 합리적이다.
- 하나의 일관된 로직을 별도의 이펙트를 분리하면 코드가 ‘깔끔해’보일 수 있지만 유지 관리가 더 어려워진다.

### 이펙트는 반응형 값에 반응한다.

```tsx
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
	useEffect(() => {
		const connection = createConnection(serverUrl, roomId);
		connection.connect();
		return () => {
			connection.disconnect();
		};
	}, [roomId]);
	// ...
}
```

- 이펙트에서 두 개의 변수 (serverUrl 과 roomId)를 읽지만 의존성으로 roomId만 지정한 이유는 serverUrl은 리렌더링될 동안 절대 바뀌지 않기 때문에
- 의존성은 시간이 지남에 따라 변경될 때만 무언가를 수행한다
- serverurl이 상태 변수라면 반응형 변수가 될 것이고, 반은형 값은 의존성에 포함되어야 한다.

### 컴포넌트 본문에 선언된 모든 변수는 반응형이다.

- props나 state가 변경되면 컴포넌트가 다시 렌더링되고 그로부터 계산된 값도 변경된다.
- 이펙트에서 사용하는 컴포넌트 본문의 모든 변수는 이펙트 의존성 목록에 있어야 한다.

```tsx
function ChatRoom({ roomId, selectedServerUrl }) {
	// roomId는 반응형
	const settings = useContext(SettingContenxt); // settings는 반응형
	const serverUrl = selectedServerUrl ?? settings.defaultServerUrl; // serverUrl은 반응형
	useEffect(() => {
		const connection = createConnection(serverUrl, roomId); // 이펙트에서 roomId 과 serverUrl를 읽고 있음
		connection.connect();
		return () => {
			connection.disconnect();
		};
	}, [roomId, serverUrl]); // 둘 중 하나가 변하면 다시 동기화해야한다.
}
```

### 전역 또는 변경 가능한 값이 의존성에 추가될 수 있을까?

- `location.pathname` 과 같은 변경 가능한 값은 의존성이 될 수 없다.
  - React 렌더링 데이터 흐름 외부에서 언제든지 변경할 수 있음
  - 변경해도 컴포넌트가 다시 렌더링되지 않음
  - 렌더링 도중 (의존성을 계산할 때) 변경 가능한 데이터를 다시 읽는 것은 렌더링의 순수성을 깨뜨리기 때문에 React의 규칙을 위반한다.
  - useSyncExternalStore를 사용하여 외부의 변경 가능한 값을 읽고 구독해야한다.
- `ref.current` 와 같이 변경 가능한 값이나 이 값에서 읽은 것도 의존성이 될 수 없다.
  - userRef가 반환하는 ref 객체 자체는 의존성이 될 수 있지만 current 프로퍼티는 의도적으로 변경할 수 있다.
  - 변경해도 렌더링을 트리거하지 않으면 반응형 값이 아니다. 값 변경시 이펙트를 다시 실행할지 알지 못한다.

### 리액트는 모든 반응형 값을 의존성으로 지정했는지 확인한다.

- 린터가 React용으로 구성된 경우, 이펙트의 코드에서 사용되는 모든 반응형 값이 의존성으로 선언되었는지 확인한다.

### 다시 동기화하고 싶지 않은 경우 어떻게 해야 할까?

- 의존성에 값을 추가하는 것으로 린터 에러를 고칠 수 있다.
- 의존성에 값을 추가하지 않고, 해당 값이 반응형 값이 아니기 때문에 재렌더링의 결과로 변경되지 않는 것을 린터에 증명할 수도 있다.

```tsx
// 렌더링에 의존하지 않고 항상 같은 값을 갖는다면 컴포넌트 외부로 옮길 수 있다.
const serverUrl = 'https://localhost:1234';
const roomId = 'general';

function ChatRoom() {
	useEffect(() => {
		const connection = createConnection(serverUrl, roomId);
		connection.connect();
		return () => {
			connection.disconnect();
		};
	}, []);
}
```

- 혹은 이펙트 안으로 이동할 수 있다.

```tsx
function ChatRoom() {
	useEffect(() => {
		const serverUrl = 'https://localhost:1234';
		const roomId = 'general';
		const connection = createConnection(serverUrl, roomId);
		connection.connect();
		return () => {
			connection.disconnect();
		};
	}, []);
	// ...
}
```

- 이펙트는 반응형 코드블록이다. 내부에서 읽은 값이 변경되면 다시 동기화된다.
- 상호작용당 한 번만 실행되는 이벤트 핸들러와 달리 이펙트는 동기화가 필요할 때마다 실행된다.
- 의존성은 선택할 수 없다. 의존성에는 이펙트에서 읽은 모든 반응형 값이 포함되어야 한다.
- 무한루프가 발생하거나 이펙트가 너무 자주 다시 동기화할 때 시도해 볼 수 있는 방법
  - 이펙트가 독립적인 동기화 프로세스를 나타내는지 확인하자.
    - 이펙트가 아무것도 동기화하지 않는다면 불필요한 것일 수 있다.
    - 여러 개의 독립적인 것을 동기화하는 경우는 이를 분할하자.
  - 반응하지 않고 이펙트를 재동기화하지 않으면서 props나 state의 최신 값을 읽고 싶은 경우
    - 이펙트를 반응하는 부분 (이펙트에 유지)과 반응하지 않는 부분(Effect Event로 추출)으로 분리할 수 있다.
  - 객체와 함수를 종속성으로 사용하지 말 것.
    - 렌더링 중에 오브젝트와 함수를 만든 다음 이펙트에서 읽으면 렌더링할 때마다 오브젝트와 함수가 달라진다. ⇒ 매번 Effect가 다시 동기화된다.
