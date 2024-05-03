# Removing Effect Dependencies

https://react.dev/learn/removing-effect-dependencies

- 이펙트를 작성할 때, 린터는 이펙트의 의존성 목록에 이펙트가 읽는 모든 반응형 값(state나 props등)을 포함했는지 확인한다.
- 불필요한 의존성으로 인해 이펙트가 너무 자주 실행되거나 무한 루프가 발생할 수 있다.

## 의존성은 코드와 일치해야 한다.

- 이펙트를 작성할 때는 먼저 이펙트로 수행할 작업을 시작하고 중지하는 방법을 지정한다.
- 만약에 이펙트의 의존성을 비워둔다면 린터는 올바른 의존성을 제안한다.
- 이펙트는 반응형 값에 반응한다.
  - 반응형 값을 이펙트 내부에서 읽는다면 린터는 사용자가 의존성에 추가했는지 확인한다.
  - 의존성에 추가된 값이 달라지면 리액트는 이펙트를 다시 동기화한다.

### 의존성을 제거하기 위해서 의존성이 아닌 것을 증명하기

- 이펙트의 의존성을 선택할 수 없다. 이펙트의 코드에서 사용하는 모든 반응형 값은 의존성 목록에 선언해야 한다. 의존성 목록은 코드에 의해 결정된다.
- 반응형 값에는 props와 컴포넌트 내부에서 직접 선언된 모든 변수 및 함수가 포함된다.
- 의존성을 제거하려면 해당 의존성이 의존성이 될 필요가 없음을 린터에게 증명해야 한다.

```tsx
// 컴포넌트 밖으로 이동한 값은 반응형이 아니고 다시 렌더링될 때마다 바뀌지 않는다.
// => 의존성이 추가할 필요가 없다.
const serverUrl = 'https://localhost:1234';
const roomId = 'music'; // 더이상 반응형 값이 아니다

function ChatRoom() {
	useEffect(() => {
		const connection = createConnection(serverUrl, roomId);
		connection.connect();
		return () => connection.disconnect();
	}, []); // 의존성을 추가할 필요가 없다.
}
```

- 빈 의존성 목록을 갖는 이펙트는 반응형 값에 의존하지 않기 때문에 컴포넌트의 프로퍼티나 상태가 변경될 때 다시 실행할 필요가 없다.

### 의존성을 바꾸기 위해서 코드 바꾸기

- 의존성을 바꾸기 위한 흐름
  1. 이펙트의 코드나 반응형 값의 선언 방식을 변경한다.
  2. 린터를 따라 변경한 코드와 일치하도록 의존성을 조정한다.
  3. 의존성 목록이 마음에 들지 않으면 첫 번째 단계로 돌아가서 코드를 수정한다.
- 의존성 목록은 이펙트 코드에서 사용하는 모든 반응형 값의 목록이기 때문에 의존성을 변경하려면 코드를 먼저 수정해야한다.
- 의존성 제거를 목표로 한다면 그 목표에 맞는 코드를 찾아야 한다.
- 의존성이 코드와 일치하지 않으면 버그가 발생할 위험이 매우 높다. 린터를 억제하면 이펙트가 의존하는 값에 대해 리액트에 거짓말을 하게 된다.

## 불필요한 의존성 제거

### 이 코드가 이벤트 핸들러로 이동해야 할까?

- 가장 먼저 고려해야 할 것은 이 코드가 이펙트가 되어야 하는지 여부

```tsx
function Form() {
	const [submitted, setSubmitted] = useState(false);
	const theme = useContext(ThemeContext);

	useEffect(() => {
		if (submitted) {
			// 이벤트와 관련된 로직을 이펙트 내부에 넣는 것은 피한다
			post('/api/register');
			showNotification('Successfully registered', theme);
		}
	}, [submitted, theme]);

	function handleSubmit() {
		setSubmitted(true);
	}
}
```

⇒ 버그가 발생하는 코드. submit을 먼저 한 다음에 테마를 변경하면 이펙트가 다시 실행되어 notification이 다시 표시된다.

- 특정 상호작용에 대한 응답으로 일부 코드를 실행하려면 해당 로직을 이벤트 핸들러에 직접 넣어야 한다.

```tsx
function Form() {
	const theme = useContext(ThemeContext);

	function handleSubmit() {
		// 이벤트와 연관된 로직은 이벤트 핸들러에서 호출하자
		post('/api/register');
		showNotification('Successfully registered', theme);
	}

	// ...
}
```

⇒ 코드가 이벤트 핸들러에 있으므로 반응형 코드가 아니기 때문에 사용자가 submit을 할 때만 실행된다.

### 이펙트가 여러 가지 관련 없는 일을 하고 있는가?

```tsx
function ShppingForm({ country }) {
	const [cities, setCities] = useState(null);
	const [city, setCity] = useState(null);
	const [areas, setAreas] = useState(null);

	// 서로 관련 없는 두 가지를 동기화 하는 것이 문제!
	useEffect(() => {
		let ignore = false;
		// country값이 바뀔 때마다 데이터를 가져오기 때문에 이벤트 핸들러에서 실행하지 않는다.
		fetch(`/api/cities?country=${country}`)
			.then((response) => response.json())
			.then((json) => {
				if (!ignore) {
					setCities(json);
				}
			});
		// 하나의 효과가 두 개의 독립적인 프로세스를 동기화하는 것은 피해야한다!
		if (city) {
			fetch(`/api/areas?city=${city}`)
				.then((response) => response.json())
				.then((json) => {
					if (!ignore) {
						setAreas(json);
					}
				});
		}
		return () => {
			ignore = true;
		};
	}, [country, city]);
}
```

⇒ 사용자가 다른 도시를 선택하면 이펙트가 다시 실행되어 불필요하게 도시 목록을 불러오게 된다.

```tsx
// 로직을 두 개의 효과로 나누고, 각 효과는 동기화해야 하는 prop에 반응한다.
function ShppingForm({ country }) {
	const [cities, setCities] = useState(null);
	const [city, setCity] = useState(null);
	const [areas, setAreas] = useState(null);

	// 서로 관련 없는 두 가지를 동기화 하는 것이 문제!
	useEffect(() => {
		let ignore = false;
		// country값이 바뀔 때마다 데이터를 가져오기 때문에 이벤트 핸들러에서 실행하지 않는다.
		fetch(`/api/cities?country=${country}`)
			.then((response) => response.json())
			.then((json) => {
				if (!ignore) {
					setCities(json);
				}
			});
		return () => {
			ignore = true;
		};
	}, [country]);

	useEffect(() => {
		if (city) {
			let ignore = false;
			fetch(`/api/areas?city=${city}`)
				.then((response) => response.json())
				.then((json) => {
					if (!ignore) {
						setAreas(json);
					}
				});
		}
		return () => {
			ignore = true;
		};
	}, [city]);
}
```

⇒ 목적에 따라 이펙트를 분리했고 의도치 않게 서로를 트리거하지 않는다.

- 각 효과는 독립적인 동기화 프로세스를 나타내야 한다.
- 서로 다른 것을 동기화하면 분할하는 것이 좋다.
- 반복되는 로직이 있다면 커스텀 훅으로 추출하여 코드를 개선할 수 있다.

### 다음 상태를 계산하기 위해서 어떠한 상태를 읽고 있는가?

```tsx
function ChatRoom({ roomId }) {
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		const connection = createConnection();
		connection.connect();
		connection.on('message', (receivedMessage) => {
			setMessages([...messages, receivedMessage]);
		});

		return () => connection.disconnect();
	}, [roomId, messages]);
	// ...
}
```

⇒ 메시지를 수신할 때마다 setMessages에 새로운 메시지 배열을 넘겨주기 때문에 컴포넌트가 다시 렌더링된다. 그리고 이펙트가 messages에 의존하기 때문에 이펙트도 다시 동기화되고, 새 메시지가 올 때마다 채팅이 다시 연결된다.

```tsx
// 이펙트 안에서 messages를 읽지 말고 updater function을 사용한다.
function ChatRoom({ roomId }) {
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		const connection = createConnection();
		connection.connect();
		connection.on('message', (receivedMessage) => {
			setMessages((msgs) => [...msgs, receivedMessage]);
		});

		return () => connection.disconnect();
	}, [roomId]);
	// ...
}
```

- 리액트는 업데이터 함수를 대기열에 넣고 다음 렌더링 중에 msgs 인수를 제공한다. Effect 자체가 메시지에 의존할 필요가 없다.

### 값의 변경에 반응하지 않고 값을 읽고 싶다면?

```tsx
// 사용자가 새 메시지를 받았을 때 isMuted가 참이 아닌 경우 소리를 재생하는 것을 의도함
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages(msgs => [...msgs, receivedMessage]);
      if (!isMuted) {
        playSound();
      }
    });
    return () => connection.disconnect();
  }, [roomId, isMuted]);
  // ...
```

⇒ isMuted 값이 변경될 때마다 이펙트가 다시 동기화되고 채팅에 다시 연결된다.

```tsx
// 이펙트에서 반응해서는 안 되는 로직을 추출한다. => 이펙트가 isMuted에 반응하지 않도록 함
import { useState, useEffect, useEffectEvent } from 'react';

function ChatRoom({ roomId }) {
	const [messages, setMessages] = useState([]);
	const [isMuted, setIsMuted] = useState(false);

	const onMessage = useEffectEvent((receivedMessage) => {
		setMessages((msgs) => [...msgs, receivedMessage]);
		if (!isMuted) {
			playSound();
		}
	});

	useEffect(() => {
		const connection = createConnection();
		connection.connect();
		connection.on('message', (receivedMessage) => {
			onMessage(receviedMessage);
		});
	}, [roomId]);
}
```

- 이펙트 이벤트를 사용하면 이펙트를 반응형 부분과 비반응형 부분으로 나눌 수 있다.

```tsx
function ChatRoom({ roomId, onReceiveMessage }) {
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		const connection = createConnection();
		connection.connect();
		connection.on('message', (receivedMessage) => {
			onReceiveMessage(receivedMessage);
		});
		return () => connection.disconnect();
	}, [roomId, onReceiveMessage]);
}
```

⇒ onReceiveMessage가 의존성에 있기 때문에 부모가 다시 렌더링될 때마다 이펙트가 다시 동기화된다.

```tsx

function ChatRoom({ roomId, onReceiveMessage }) {
  const [messages, setMessages] = useState([]);

  const onMessage = useEffectEvent(receivedMessage => {
    onReceiveMessage(receivedMessage); // 호출을 이펙트 이벤트로 감싼다.
  });

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      onMessage(receivedMessage);
    });
    return () => connection.disconnect();
  }, [roomId]);
  // ...

```

- 이펙트 이벤트는 반응형 이벤트가 아니기 때문에 의존성으로 지정할 필요가 없다.

**반응형과 비반응형을 코드에서 분리하기**

```tsx
function Chat({ roomId, notificationCount }) {
	// roomId가 변경될 때마다 방문을 기록할 때 notificationCount에 의해 반응하지 않도록 한다.
	const onVisit = useEffectEvent((visitedRoomId) => {
		logVisit(visitedRoomId, notificationCount);
	});

	useEffect(() => {
		onVisit(roomId);
	}, [roomId]);
	// ...
}
```

### 일부 반응 값이 의도치 않게 변경되는가?

```tsx
function ChatRoom({ roomId }) {
  // ...
  const options = {
    serverUrl: serverUrl,
    roomId: roomId
  };

 useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]); // 컴포넌트 내부에 선언된 객체는 반응형 값이기 때문에 의존성에 추가한다.
```

⇒ 메시지를 업데이트할 때마다 컴포넌트가 다시 렌더링되고, 컴포넌트 내부의 코드가 처음부터 다시 실행되기 때문에 option객체가 새로 생성된다. 리액트는 객체가 달라졌다고 인식하고 채팅이 다시 연결된다.

- 객체와 함수 의존성은 이펙트가 필요 이상으로 자주 다시 동기화하도록 할 수 있다.

**객체와 함수를 컴포넌트 밖으로 이동하기**

```tsx

const options = {
  serverUrl: 'https://localhost:1234',
  roomId: 'music'
};

function ChatRoom() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, []);
  // ...
```

- 객체가 prop이나 state에 의존하지 않는 경우 컴포넌트 외부로 이동할 수 있다.

```tsx
function createOptions() {
  return {
    serverUrl: 'https://localhost:1234',
    roomId: 'music'
  };
}

function ChatRoom() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, []);
  // ...
```

- createOptions는 컴포넌트 외부에 선언되기 때문에 반응형이 아니기 때문에 의존성에 추가할 필요가 없다.

**객체와 함수를 이펙트 내부로 이동하기**

```tsx
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
  // ...
```

- 객체가 반응형 값에 의존하는 경우, 컴포넌트 외부로 이동할 수 없다. 대신 이펙트 코드 내부로 이동할 수 있다.

**객체를 prop으로 받는 경우**

```tsx
function ChatRoom({ options }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]);
  // ...
```

⇒ 부모 컴포넌트가 다시 렌더링할 때마다 이펙트가 다시 연결된다.

```tsx
function ChatRoom({ options }) {
  const [message, setMessage] = useState('');

  const { roomId, serverUrl } = options;
  useEffect(() => {
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
  // ...
```

⇒ 이펙트가 실제로 어떤 정보에 의존하는지 명확하게 알 수 있고, options.roomId 또는 options.serverUrl이 실제로 다른 경우에만 채팅이 다시 연결된다.

**함수에서 값을 계산하는 경우**

```tsx
// 부모 컴포넌트에서 함수를 전달
<ChatRoom
	roomId={roomId}
	getOptions={() => {
		return {
			serverUrl: serverUrl,
			roomId: roomId,
		};
	}}
/>
```

다시 렌더링될 때 채팅이 연결되는 것을 막고 의존성을 만들지 않으려면 이펙트 외부에서 함수를 호출한다.

```tsx
function ChatRoom({ getOptions }) {
  const [message, setMessage] = useState('');

  const { roomId, serverUrl } = getOptions();
  useEffect(() => {
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
  //
```

- 순수 함수는 렌더링 중에 호출해도 안전하기 때문이 이 방법은 순수 함수에서만 작동한다.
