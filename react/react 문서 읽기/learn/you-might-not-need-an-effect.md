# You Might Not Need an Effect

https://react.dev/learn/you-might-not-need-an-effect

- 이펙트를 사용하면 React에서 외부로 나가서 컴포넌트를 React가 아닌 위젯 네트워크 또는 브라우저 DOM과 같은 외부 시스템과 동기화할 수 있다.
- 외부 시스템이 관여하지 않는 경우 (예: 일부 프로퍼티나 상태가 변경될 때 컴포넌트의 상태를 업데이트하려는 경우)에는 이펙트가 필요하지 않다.
- 불필요한 이펙트를 제거하면 코드를 더 쉽게 따라갈 수 있고 실행 속도가 빨라지며 오류 발행 가능성이 줄어든다.

## 불필요한 이펙트 제거

- 이펙트가 불필요한 대표적인 케이스
  - 렌더링을 위한 데이터 변환
    - 이펙트에서 상태를 업데이트하는 경우 렌더링 프로세스가 다시 실행된다.
    - 상태를 업데이트 ⇒ React는 먼저 컴포넌트 함수를 호출하여 화면에 표시될 내용을 계산함 ⇒ DOM에 커밋하여 화면을 업데이트 ⇒ 이펙트 실행 ⇒ 상태 업데이트 ⇒ 전체 프로세스 다시 실행
    - 불필요한 렌더 패스를 피하려면 컴포넌트의 최상위에서 모든 데이터를 변환한다.
    - props나 state가 변경될 때마다 해당 코드가 자동으로 다시 실행된다.
  - 사용자 이벤트를 핸들링
- 이펙트가 필요한 경우
  - 외부 시스템과 동기화하는 경우
  - 데이터 fetch

### Props나 State로 State 업데이트하기

```tsx
// firstName과 lastName으로 fullName을 업데이트하기 - useEffect를 사용하는 예제
function Form() {
	const [firstName, setFirstName] = useState('Taylor');
	const [lastName, setLastName] = useState('Swift');

	// 불필요한 상태와 이펙트
	const [fullName, setFullName] = useState('');
	useEffect(() => {
		setFullName(firstName + ' ' + lastName);
	}, [firstName, lastname]);
}
```

⇒ fullName의 기존 값으로 전체 렌더 패스를 수행한 다음 업데이트된 값으로 다시 렌더링하기 때문에 비효율적이다.

```tsx
// firstName과 lastName으로 fullName을 업데이트하기 - 렌더링중에 계산하는 예제
function Form() {
	const [firstName, setFirstName] = useState('Taylor');
	const [lastName, setLastName] = useState('Swift');
	// 렌더링할 때 계산한다
	const fullName = firstName + ' ' + lastName;
	// ...
}
```

- 기존의 props나 state로 계산할 수 있으면 state로 만들지 않고 렌더링 중에 계산한다.
  - 코드가 더 빠르다 ⇒ 계단식 업데이트를 피할 수 있기 때문에
  - 더 간단하다 ⇒ 일부 코드를 제거하기 때문에
  - 오류가 덜 발생한다 ⇒ 서로 다른 state가 동기화되지 않아 발생하는 버그를 피할 수 있다

### 비용이 많이 드는 계산 캐싱

```tsx
// filter와 todos로 visibleTodos를 계산하는 컴포넌트 - useEffect를 사용하는 예제
function TodoList({ todos, filter }) {
	const [newTodo, setNewTodo] = useState('');

	// 불필요한 상태와 이펙트
	const [visibleTodos, setVisibleTodos] = setState([]);
	useEffect(() => {
		setVisibleTodos(getFilteredTodos(todos, filter));
	}, [todos, filter]);
}
```

```tsx
// filter와 todos로 visibleTodos를 계산하는 컴포넌트 - 불필요한 state와 useEffect를 제거
function TodoList({ todos, filter }) {
	const [newTodo, setNewTodo] = useState('');

	// getFilteredTodos가 느리지 않으면 괜찮음
	const visibleTodos = getFilteredTodos(todos, filter);
}
```

- `getFilteredTodos` 함수가 느리거나 todos가 많은 경우 `newTodo` 처럼 관련없는 값이 바뀌었을 때 다시 계산하지 않도록 한다.

```tsx
import { useMemo, useState } from 'react';

function TodoList({ todos, filter }) {
	const [newTodo, setNewTodo] = useState('');

	const visibleTodos = useMemo(() => {
		// todos나 filter가 바뀌지 않으면 실행되지 않는다.
		return getFilteredTodos(todos, filter);
	}, [todos, filter]);
}
```

- React는 초기 렌더링 중에 getFilteredTodos()의 반환값을 기억한다.
- 다음 렌더링 중에 todos와 filter 값이 다른지 확인한다.
  - 값이 같으면 마지막으로 저장한 결과를 반환한다.
  - 값이 다르면 내부 함수를 호출하고 그 결과를 저장한다.

### 비용이 많이 드는 계산을 구분하는 방법

- 일반적으로 수천 개의 객체를 만들거나 순환하는 게 아니라면 비용이 많이 들지 않는다.
- 콘솔에 로그를 추가하여 코드에 소요된 시간을 측정할 수 있다. 일정 값을 넘는 경우 memo로 감싸는 게 좋다.

```tsx
console.time('filter array');
const visibleTodos = getFilteredTodos(todos, filter);
console.timeEnd('filter array');

console.time('filter array');
const visibleTodos = useMemo(() => {
	return getFilteredTodos(todos, filter);
}, [todos, filter]);
console.timeEnd('filter array');
```

- useMemo는 첫번째 렌더를 더 바쁠게 만들지 않는다. 불필요한 업데이트를 생략하는 데 도움을 준다.

### Props가 변경되면 모든 상태 초기화

```tsx
// userId가 변경될 때마다 comment를 초기화 하는 컴포넌트
export default function ProfilePage({ userId }) {
	const [comment, setComment] = useState('');

	// props가 바뀔 때마다 이펙트에서 상태를 초기화
	useEffect(() => {
		setComment('');
	}, [userId]);
}
```

- 렌더링을 한 번 한 뒤 comment가 초기화되면 다시 렌더링하기 때문에 비효율적이다.

```tsx
// 컴포넌트를 분리하고 key를 전달하는 것으로 상태를 초기화 할 수 있다.
export default function ProfilePage({ userId }) {
	return <Profile userId={userId} key={userId} />;
}

function Profile({ userId }) {
	// key가 바뀌면 자동으로 모든 상태가 초기화된다.
	const [comment, setComment] = useState('');
	// ...
}
```

- 일반적으로 React는 동일한 컴포넌트가 같은 위치에 렌더링될 때 상태를 유지한다.
- React는 key가 다른 컴포넌트들을 상태를 공유해서는 안 되는 컴포넌트로 취급한다.
- 키가 변경될 때마다 DOM을 다시 생성하고 컴포넌트와 모든 자식들의 상태를 재설정한다.

### Props가 변경될 때 일부 상태 수정

```tsx
// 선택된 값을 유지하다가 items가 달라지면 reset하는 컴포넌트 - useEffect 사용하는 예제
function List({ items }) {
	const [isReverse, setIsReverse] = useState(false);
	const [selection, setSelection] = useState(null);

	// props 변화에 따라 state 리셋
	useEffect(() => {
		setSelection(null);
	}, [items]);

	// ...
}
```

```tsx
// 선택된 값을 유지하다가 items가 달라지면 reset하는 컴포넌트 - useEffect를 제거한 예제
function List({ items }) {
	const [isReverse, setIsReverse] = useState(false);
	const [selection, setSelection] = useState(null);

	// 렌더링 중에 state를 수정한다.
	const [prevItems, setPrevItems] = useState(items);
	if (items !== prevItems) {
		setPrevItems(items);
		setSelection(null);
	}

	// ...
}
```

- 렌더링 도중에 상태가 바뀌면 React는 return 하자마자 다시 렌더링한다 ⇒ 바뀌기 전 상태 값으로 자식들을 렌더링하거나 DOM을 업데이트하는 단계를 생략할 수 있다.
- 이펙트를 사용하는 것보다 효율적인 패턴이지만 대부분의 컴포넌트에서는 필요하지 않다.

```tsx
// 상태를 없애고 렌더링할 때 계산하도록 함
function List({ items }) {
	const [isReverse, setIsReverse] = useState(false);
	const [selectedId, setSelectedId] = useState(null);
	const selection = items.find((item) => item.id === selected) ?? null;
}
```

### 이벤트 핸들러와 로직 공유

```tsx
// 사용자가 제품을 장바구니에 넣을 때마다 알림을 표시하는 예제
function ProductPage({ product, addToCart }) {
	// 특정 이벤트에 관한 로직이 이펙트에 포함
	useEffect(() => {
		// 버그: 카트에 제품을 한 번 추가하고 페이지를 새로 고치면 알림이 다시 표시된다.
		if (product.isInCart) {
			showNotification(`Added ${product.name} to the shopping cart!`);
		}
	}, [product]);

	function handleByClick() {
		addToCart(product);
	}

	function handleCheckoutClick() {
		addToCart(product);
		navigateTo('/checkout');
	}
}
```

- 이펙트가 불필요 하며 버그를 일으킬 가능성이 높다.

```tsx
// 사용자가 제품을 장바구니에 넣을 때마다 알림을 표시하는 예제 - 이펙트를 제거하고 이벤트 핸들러에서 호출하도록 함

function ProductPage({ product, addToCart }) {
	function buyProduct() {
		addToCart(product);
		showNotification(`Added ${product.name} to the shopping cart!`);
	}

	function handleByClick() {
		buyProduct();
	}

	function handleCheckoutClick() {
		buyProduct();
		navigateTo('/checkout');
	}
}
```

### POST 요청 보내기

```tsx
function Form() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	// 컴포넌트가 표시되면 실행되어야 하는 로직
	useEffect(() => {
		post('/analytics/event', { eventName: 'visit_form' });
	}, []);

	// 특정 이벤트에 관한 로직이 이펙트에 포함됨
	const [jsonToSubmit, setJsonToSubmit] = useState(null);
	useEffect(() => {
		if (jsonToSubmit !== null) {
			post('/api/register', jsonToSubmit);
		}
	}, [jsonToSubmit]);

	function handleSubmit(e) {
		e.preventDefault();
		setJsonToSubmit({ firstName, lastName });
	}
	// ...
}
```

```tsx
function Form() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	// 컴포넌트가 표시되면 실행되어야 하는 로직
	useEffect(() => {
		post('/analytics/event', { eventName: 'visit_form' });
	}, []);

	// 특정 이벤트에 관한 요청은 이벤트 핸들러로 이동함
	function handleSubmit(e) {
		e.preventDefault();
		post('/api/register', { firstName, lastName });
	}
	// ...
}
```

- 어떤 로직을 이벤트 핸들러에 넣을지 이펙트에 넣을지 선택할 때, 사용자 관점에서 어떤 종류의 로직인지를 생각한다.
- 특정 상호작용으로 인해 발생하는 로직은 이벤트 핸들러에 사용자가 화면에서 컴포넌트를 볼 때 실행되는 로직은 이펙트에 넣는다.

### 연쇄 계산

```tsx
function Game() {
	const [card, setCard] = useState(null);
	const [goldCardCount, setGoldCardCount] = useState(0);
	const [round, setRound] = useState(1);
	const [isGameOver, setIsGameOver] = useState(false);

	// 상태를 변경하여 서로를 트리거하는 이펙트 체인
	useEffect(() => {
		if (card !== null && card.gold) {
			setGoldCardcount((c) => c + 1);
		}
	}, [card]);

	useEffect(() => {
		if (goldCardCount > 3) {
			setRound((r) => r + 1);
			setGoldCardCount(0);
		}
	}, [goldCardCount]);

	useEffect(() => {
		if (round > 5) {
			setIsGameOVer(true);
		}
	}, [round]);

	useEffect(() => {
		alert('Good game!');
	}, [isGameOver]);

	function handlePlaceCard(nextCard) {
		if (isGameOver) {
			throw Error('Game already ended');
		} else {
			setCard(nextCard);
		}
	}
}
```

- 컴포넌트와 자식 컴포넌트는 체인에서 각 `set` 호출 사이에 다시 렌더링해야 한다. 불필요한 재렌더링이 계속 발생한다.
- 가능하면 렌더링 중에 값을 계산하거나 이벤트 핸들러에서 상태를 변경하는 것이 좋다.

```tsx
function Game() {
	const [card, setCard] = useState(null);
	const [goldCardCount, setGoldCardCount] = useState(0);
	const [round, setRound] = useState(1);

	// 렌더링 중에 계산한다
	const isGameOver = round > 5;

	function handlePlaceCard(nextCard) {
		if (isGameOver) {
			throw Error('Game already ended');
		}

		// 모든 상태를 이벤트 핸들러에서 계산한다.
		setCard(nextCard);
		if (nextCard.gold) {
			if (goldCardCount <= 3) {
				setGoldCardCount(goldCardCount + 1);
			} else {
				setGoldCardCount(0);
				setRound(round + 1);
				if (round === 5) {
					alert('Good game!');
				}
			}
		}
	}
}
```

- 드롭다운 옵션이 이전 드롭다운의 선택된 값에 따라 달라지는 여러 개의 드롭다운이 있는 경우 네트워크 동기화가 필요하므로 이펙트 체인이 적절하다

### 애플리케이션 초기화

- 앱이 로드될 때 한 번만 실행하는 로직

```tsx
function App() {
	useEffect(() => {
		loadDataFromLocalStorage();
		checkAuthToken();
	}, []);
}
```

- 컴포넌트 마운트당 한 번이 아니라 앱 로드때 마다 한 번 실행되어야 하는 경우 최상위 변수를 추가하여 이미 실행되었는지 여부를 추적한다.

```tsx
let didInit = false;

function App() {
	useEffect(() => {
		if (!didInit) {
			didInit = true;
			// 앱이 로드될 때 한 번만 실행된다.
			loadDataFromLocalStorage();
			checkAuthToken();
		}
	}, []);
}
```

- 모듈 초기화나 앱이 렌더링 되기 전에 실행할 수도 있다.

```tsx
if (typeof window !== 'undefined') {
	loadDataFromLocalStorage();
	checkAuthToken();
}

function App() {}
```

- 컴포넌트를 임포트할 때 최상위 레벨의 코드는 렌더링되지 않더라도 한 번 실행된다.
- 앱 전체 초기화 로직은 App.js와 같은 루트 컴포넌트 모듈이나 애플리케이션 진입점에서 하라.

### 부모에게 상태가 바뀐 것을 알림

```tsx
// Toggle 내부 상태가 변경될 때마다 부모 컴포넌트에게 알림
// Toggle이 상태를 업데이트하면 React가 화면을 업데이트한다.
// ⇒ Effect 실행
// ⇒ 부모 컴포넌트에서 onChange 함수 호출
// ⇒ 부모 컴포넌트 state 업데이트
// ⇒ 렌더 패스 다시 시작
function Toggle({ onChange}) {
	const [isOn, setIsOn] = useState(false);

	useEffect(() => {
		onChange(isOn);
	}, [isOn, onChange])

	function hanldeClick() {
		setIsOn(!isOn)
	}

	function handleDragEnd(e) {
		if (isCloserToRightEdge(e) {
			setIsOn(true);
		} else {
			setIsOn(false);
		}
	}
}
```

```tsx
function Toggle({onChange}) {
	const [isOn, setIsOn] = useState(false);

	function updateToggle(nextIsOn) {
		// 이벤트가 발생한 동안 모든 업데이트를 수행한다.
		setIsOn(nextIsOn);
		onChange(nextIsOn);
	}

	function handleClick() {
		updateToggle(!isOn);
	}

	function handleDragEnd(e) {
		if (isCloserToRightEdge(e) {
			updateToggle(true);
		} else {
			updateToggle(false);
		}
	}
}
```

⇒ Toggle 컴포넌트와 부모 컴포넌트 모두 이벤트가 진행되는 동안 상태를 업데이트 한다. 컴포넌트의 업데이트를 일괄 처리하기 때문에 렌더링 패스는 한 번만 발생한다.

```tsx
// 상태를 위로 올려서 부모 컴포넌트가 Toggle 컴포넌트를 완전히 제어한다.
function Toggle({ isOn, onChange}) {
	function handleClick() {
		onChange(!isOn);
	}

	function handleDragEnd(e) {
		if (isCloserToRightEdge(e) {
			updateToggle(true);
		} else {
			updateToggle(false);
		}
	}
	// ..
}
```

- 두 개의 서로 다른 상태 변수를 동기화하려고 할 때는 상태를 위로 올려보자

### 부모로 데이터 전달

```tsx
// 자식 컴포넌트가 data를 fetch하고 Parent 컴포넌트로 전달함
function Parent() {
	const [data, setData] = useState(null);
	return <Child onFetched={setData} />;
}

function Child({ onFetched }) {
	const data = useSomeAPI();

	useEffect(() => {
		if (data) {
			onFetched(data);
		}
	}, [onFetched, data]);

	// ...
}
```

- 리액트에서 데이터는 부모 컴포넌트에서 자식 컴포넌트로 흐른다.
- 하위 컴포넌트가 부모 상태를 업데이트하면 데이터 흐름을 추적하기 어려워진다.
- 자식과 부모 모두 동일한 데이터가 필요하므로 부모 컴포넌트가 해당 데이터를 가져와서 자신에게 대신 전달하도록 한다.

```tsx
function Parent() {
	const data = useSomeAPI();

	return <Child data={data} />;
}

function Child({ data }) {
	// ..
}
```

### 외부 스토어 구독

```tsx
function useOnlineStatus() {
	const [isOnline, setIsOnline] = useState(true);
	useEffect(() => {
		function updateState() {
			setIsOnline(navigator.online);
		}

		usedateState();

		window.addEventListener('online', updateState);
		window.addEventListener('offline', updateState);
		return () => {
			window.removeEventListener('online', updateState);
			window.removeEventListener('offline', updateState);
		};
	}, []);

	return isOnline;
}

function ChatIndicator() {
	const isOnline = useOnlineStats();
}
```

- 외부 저장소를 구독하기 위한 hook은 useSyncExternalStore

```tsx
function subscribe(callback) {
	window.addEventListener('online', callback);
	window.addEventListener('offline', callback);
	return () => {
		window.removeEventListener('online', callback);
		window.removeEventListener('offline', callback);
	};
}

function useOnlineStatus() {
	// react 자체 hook으로 외부 스토어를 구독한다
	return useSyncExternalStore(
		subscribe, // 동일한 함수를 전달하는 한 다시 구독하지 않는다
		() => navigator.online, // 클라이언트에서 값을 가져오는 방법
		() => true // 서버에서 값을 가져오는 방법
	);
}

function ChatIndicator() {
	const isOnline = useOnlineStatus();
	// ...
}
```

- 변경 가능한 데이터를 Effect에서 state에 수동으로 동기화하는 것보다 오류가 덜 발생한다.
- 개별 컴포넌트에서 코드를 반복할 필요 없도록 커스텀 Hook을 작성한다.

### Fetching data

```tsx
function SearchResults({ query }) {
	const [results, setResults] = useState([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		// cleanup 없이 fetching 하지 말 것
		fetchResults(query, page).then((json) => {
			setResults(json);
		});
	}, [query, page]); // query가 빠르게 변할 때 응답이 어떤 순서로 도착할지 보장할 수 없다.

	// 이벤트 핸들러의 주된 목적이 데이터 가져오기가 아니기 때문에 핸들러로 fetch를 이동할 필요는 없다
	function handleNextPageClick() {
		setPage(page + 1);
	}
}
```

```tsx
// cleanup function을 추가하여 이전 응답을 무시해야한다.
function SearchResults({ query }) {
	const [results, setResults] = useState([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		let ignore = false;
		fetchResults(query, page).then((json) => {
			if (!ignore) {
				setResults(json);
			}
		});

		return () => {
			ignore = true;
		};
	}, [query, page]);

	function handleNextPageClick() {
		setPage(page + 1);
	}
}
```

```tsx
// fetching logic을 custom hook으로 만들어서 사용
function SearchResults({ query }) {
	const [page, setPage] = useState(1);
	const params = new URLSearchParams({ query, page });
	const results = useData(`/ap/search?${params}`);

	function handleNextPageClick() {
		setPage(page + 1);
	}
	// ...
}

function useData(url) {
	const [data, setData] = useState(null);
	useEffect(() => {
		let ignore = false;
		fetch(url)
			.then((res) => res.json())
			.then((json) => {
				if (!ignore) {
					setData(json);
				}
			});
		return () => {
			ignore = true;
		};
	}, [url]);
	return data;
}
```

- 컴포넌트에 useEffect 호출이 적을수록 애플리케이션을 유지 관리하기가 더 쉬워진다.
