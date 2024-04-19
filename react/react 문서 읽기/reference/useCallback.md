# useCallback

https://react.dev/reference/react/useCallback

`useCallback` 은 리렌더 사이에 함수 정의를 캐시할 수 있는 React Hook이다.

```tsx
const cachedFn = useCallback(fn, dependencies);
```

## Reference

`useCallback(fn, dependencies)`

useCallback을 컴포넌트의 최상위 레벨에서 호출하여 리렌더 사이에 함수 정의를 캐시한다.

```tsx
import { useCallback } from 'react';

export default function ProductPage({ productId, referrer, theme }) {
	const handleSubmit = useCallback(
		(orderDetails) => {
			post('/product/' + productId + '/buy', {
				referrer,
				orderDetails,
			});
		},
		[productId, referrer]
	);
}
```

### 파라미터

`fn`

- 캐싱하고 싶은 함수, 어떠한 값이든 인수로 받을 수 있고 반환할 수 있다.
- 초기 렌더링 중에 React가 함수를 반환한다.
- 다음 렌더링에서 이전 렌더링의 dependencies와 비교하여 변경되지 않은 경우 동일한 함수를 다시 제공한다.
- 만약 dependencies가 변경되었다면 이번 렌더링에 전달한 함수를 제공하고 나중에 재사용 할 수 있도록 저장한다.
- 리액트는 함수를 호출하지 않는다. 함수를 반환하여 사용자가 함수를 언제 호출할지 결정할 수 있도록 한다.

`dependencies`

- fn 코드 내부에서 참조된 모든 반응형 값(reactive values)의 목록
- 반응형 값에는 props, state, 그리고 컴포넌트 본문에 직접 선언된모든 변수와 함수가 포함된다
- linter가 React용으로 구성된 경우 모든 반응형 값이 올바르게 dependency에 포함되었는지 확인한다.
- 의존성 목록에는 일정한 수의 항목이 있어야 하며 [dep1, dep2, dep3]과 같이 인라인으로 작성해야 한다.
- React는 [Object.is](https://www.notion.so/Object-is-ac73ce4aac5849afb12b6142641e4f36?pvs=21) 비교 알고리즘을 사용하여 각 종속성을 이전 값과 비교한다.

### 반환

- 초기 렌더에서 useCallback은 파라미터로 넘긴 함수를 반환한다
- 종속성이 변경되지 않은 경우 마지막 렌더링에서 이미 저장된 함수를 반환한다. 그렇지 않으면 이번 렌더링에서 전달한 함수를 반환한다.

### 주의 사항

- useCallback은 컴포넌트의 최상위 레벨이나 자체 훅에서만 호출 할 수 있다. 루프나 조건문 내부에서 호출할 수 없다.
- 특별한 이유가 없는 이상 캐시된 함수를 버리지 않는다.
  - 개발에서는 컴포넌트 파일을 수정한 경우 캐시를 버린다.
  - 개발과 프로덕션에서 컴포넌트가 초기 마운트 중 일시 중단되면 캐시를 버린다
- 성능 최적화를 위해서는 useCallback이 적절할 수 있지만, 그렇지 않으면 상태 변수나 ref가 더 적절할 수 있다.

---

## 사용법

### 컴포넌트 리렌더링 건너뛰기

- 렌더링 퍼포먼스를 최적화할 때 자식 컴포넌트로 넘겨주는 함수를 캐시해야 할 때가 있다.
- 컴포넌트를 리렌더링하는 사이에 함수를 캐시하려면 해당 함수를 useCallback으로 함싼다.

```tsx
import { useCallback } from 'react';

function ProductPage({ productId, referrer, theme }) {
	const handleSubmit = useCallback(
		(orderDetails) => {
			post('/product/' + productid + '/buy/', {
				referrer,
				orderDetails,
			});
		},
		[productId, referrer]
	);

	// ...
	return (
		<div className={theme}>
			<ShippingForm onSubmit={handleSubmit} />
		</div>
	);
}
```

- useCallback에 넘겨주는 파라미터
  1. 리렌더링 사이에 캐시하기를 원하는 함수 정의
  2. 의존성 목록, 함수안에서 사용되는 컴포넌트의 모든 값
- 초기 렌더에서 반환된 함수는 파라미터로 전달한 함수이다
- useCallback은 의존성이 변경될 때까지 함수를 캐시한다.
- 기본적으로 컴포넌트가 다시 렌더링되면 모든 자식들도 재귀적으로 다시 렌더링된다.
  - 예제에서 ProductPage가 다른 테마로 다시 렌더링될 때 ShippingForm 컴포넌트도 다시 렌더링된다.
  - 다시 렌더링할 때 계산을 많이 하지 않으면 괜찮지만, 만약 속도가 느리다면 컴포넌트를 메모로 감싸서 컴포넌트가 지난 렌더링과 동일한 경우 다시 렌더링하지 않을 수 있다.
  ```tsx
  import { memo } from 'react';

  const ShippingForm = memo(function ShppingForm({ onSubmit }) {
  	// ...
  });
  ```
  - memo로 감싸면 컴포넌트는 마지막 렌더링에서 props가 바뀌지 않았을 때 리렌더링을 건너뛴다. 함수 캐싱이 중요한 이유!
  - useCallback을 사용하지 않은 경우
    - 자바스크립트에서 function() {} 이나 () ⇒ {} 는 항상 다른 함수를 만든다.
    - 렌더링될 때마다 handleSubmit은 다른 함수가 된다.
    - 자식요소의 props는 항상 바뀐다. memo로 감싸더라도 매번 다시 렌더링된다.
  - useCallback을 사용하면
    - 의존성이 바뀌지 않는 동안 리액트가 함수를 캐시한다
    - 자식 컴포넌트는 동일한 props를 받기 때문에 다시 렌더링되지 않는다.
- **useCallback과 useMemo의 관계**
  - useCallback과 useMemo모두 자식 컴포넌트를 최적화 할 때 유용하다.
  - 전달할 내용을 메모(캐시)할 수 있도록 해준다.
  ```tsx
  import { useMemo, useCallback } from 'react';

  function ProductPage({ productId, referrer }) {
  	const product = useData('/product/' + productId);

  	// 함수를 호출하고 그 결과를 캐시한다.
  	const requirements = useMemo(() => {
  		return computeRequirements(product);
  	}, [product]);

  	// 함수 자체를 캐시한다.
  	const handleSubmit = useCallback(
  		(orderDetails) => {
  			post('/product/' + productid + '/buy/', {
  				referrer,
  				orderDetails,
  			});
  		},
  		[productId, referrer]
  	);

  	return (
  		<div className={theme}>
  			<ShippingForm requirements={requirements} onSubmit={handleSubmit} />
  		</div>
  	);
  }
  ```
  - useMemo
    - 호출한 함수의 결과를 캐시한다
    - 예제에서는 product가 바뀌지 않는 이상 변경되지 않는 computeRequirements(product)의 결과를 캐시한다
    - 자식 요소를 불필요하게 다시 렌더링하지 않고 requirements 객체를 전달할 수 있다
    - 필요한 경우 렌더링 중에 함수를 호출하여 결과를 계산한다.
  - useCallback
    - 함수 자체를 캐시한다.
    - useMemo와 다르게 파라미터의 함수를 호출하지 않는다.
- **useCallback을 추가 해야하는 곳**
  - useCallback으로 함수를 캐싱하는 것이 유용한 경우
    - memo로 감싼 컴포넌트에 props로 전달하는 경우에 값이 바뀌지 않았을 때 다시 렌더링하지 않고 싶으면
    - 함수가 다른 Hook의 의존성으로 사용되는 경우
  - useCallback이 함수의 생성을 막는 것이 아니라, 항상 함수를 생성하지만 이를 무시하고 변경 사항이 없는 경우 캐시된 함수를 반환하는 것.
  - memoizaton할 필요가 없게 하는 원칙들
    - 컴포넌트가 JSX를 children으로 받는 경우. wrapper 컴포넌트가 자신의 state를 업데이트 했을 때 React는 children을 다시 렌더링하지 않는다.
    - 로컬 상태를 사용하고 필요 이상으로 상태를 끌어올리지 않는다.
    - 렌더링 로직을 순수하게 만든다.
    - 상태를 업데이트하는 불필요한 Effect를 피한다. Effect에서 발생하는 업데이트 연쇄가 컴포넌트를 반복해서 렌더링하게 만들고 이로 인해 대부분의 성능 문제가 생긴다.
    - Effect에서 불필요한 의존성을 제거한다. memoization 대신 객체나 함수를 effect 내부나 컴포넌트 외부로 이동하는 것이 더 간단할 수도 있다.
  - 어떠한 상호작용이 특히 느리게 느껴지면 React 개발자 도구 프로파일러로 확인하고 필요한 경우에 memoization을 추가한다

### memoized callback에서 상태 업데이트하기

- 이전 상태를 기반으로 상태를 업데이트해야 할 수도 있다.

```tsx
function TodoList() {
	const [todos, setTodos] = useState([]);

	const handleAddTodo = useCallback(
		(text) => {
			const newTodo = { id: next++, text };
			setTodos([...todos, newTodos]);
		},
		[todos]
	);
}
```

- state를 읽어야 하는 이유가 오직 업데이트 때문이라면 의존성을 제거하고 updater 함수를 사용할 수 있다.

```tsx
function TodoList() {
	const [todos, setTodos] = useState([]);

	const handleAddTodo = useCallback((text) => {
		const newTodo = { id: next++, text };
		setTodos((todos) => [...todos, newTodo]);
	}, []);
}
```

### 이펙트가 너무 자주 실행되는 것을 방지하기

- Effect의 안에서 함수를 호출할 경우가 있을 수 있다.

```tsx
function ChatRoom({ roomId }) {
	const [message, setMessage] = useState('');

	function createOptions() {
		return {
			serverUrl: 'https://localhost:1234',
			roomId,
		};
	}

	useEffect(() => {
		const options = createOptions();
		const connection = createConnection();
		connection.connect();
		return () => connection.disconnect();
	}, [createOptions]); // 의존성이 렌더링마다 바뀐다.
}
```

- 모든 반응형 값은 Effect에 종속성으로 선언해야 하는데 createOptions를 종속성으로 선언하면 계속 호출하게 된다.
- Effect 안에서 호출한 함수를 useCallback으로 감싸서 문제를 해결할 수 있다.

```tsx
function ChatRoom({ roomId }) {
	const [message, setMessage] = useState('');

	const createOptions = useCallback(() => {
		return {
			serverUrl: 'https://localhost:1234',
			roomId,
		};
	}, [roomId]); // roomId가 바뀌었을 때만 변경된다.

	useEffect(() => {
		const options = createOptions();
		const connection = createConnection();
		connection.connect();
		return () => connection.disconnect();
	}, [createOptions]); // createOptions가 바뀌었을 때만 바뀐다.
}
```

- 종속성을 없애고 함수를 Effect 안으로 이동하는 것이 더 좋다.

```tsx
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    function createOptions() { // useCallback이나 함수 의존성이 필요없다.
      return {
        serverUrl: 'https://localhost:1234',
        roomId: roomId
      };
    }

    const options = createOptions();
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
  // ...
```

### Custom Hook 최적화

- Custom Hook에서 반환하는 함수는 useCallback으로 감싼다.
- Hook을 사용하는 쪽에서 필요할 때 최적화 할 수 있도록 한다.

```tsx
function useRouter() {
	const { dispatch } = useContext(RouterStateContext);

	const navigate = useCallback(
		(url) => {
			dispatch({ type: 'navigate', url });
		},
		[dispatch]
	);

	const goBack = useCallback(() => {
		dispatch({ type: 'back' });
	}, [dispatch]);

	return {
		navigate,
		goBack,
	};
}
```

---

## **Troubleshooting**

### 컴포넌트가 렌더링될 때마다 useCallback이 다른 함수를 리턴함

- 의존성 배열을 확인하라. 의존성 배열이 없으면 useCallback은 매번 새로운 함수를 반환한다.
- 만약 의존성 배열을 추가하는 것으로 해결되지 않는다면, 의존성중 하나 이상이 이전 렌더링과 다를 수 있다. 의존성을 콘솔에 수동으로 로깅하여 문제를 디버깅할 수 있다.

```tsx
const handleSubmit = useCallback(() => {
	//..
}, [productId, referrer]);

console.log([productId, referrer]);
```

- 다시 렌더링될 때 콘솔에 찍힌 값을 변수로 저장한다(’Store as a global variable’). 브라우저 콘솔에서 의존성 배열이 같은지 확인 할 수 있다.

```tsx
Object.is([temp1[0], temp2[0]) // 의존성 배열의 첫번째 요소가 다시 렌더링 되었을 때 유지 되었는지 확인
```

- 메모를 방해하는 의존성을 찾으면 제거하거나 의존성을 잘 메모할 방법을 찾는다.

### useCallback을 각 리스트 아이템 루프에서 호출하고 싶지만 안 됨

```tsx
function ReportList({items}) {
	return (
		<article>
			{items.map(item => {
				// useCallback을 이런 식으로 루프에서 호출할 수 없다
				const handleClick = useCallback(() => {
					sendReport(item)
				}, [item]);

				// Chart는 memo로 감싸진 컴포넌트,
				// ReportList가 렌더링될 때마다 Chart 컴포넌트가 렌더링되는 것을 막기 위해 useCallback으로 감싼 함수를 넘기고 싶음
				return <figure key={item.id}>
					<Chart onClick={handleClick} />
				</figure>
			})
		</article>
	)
}
```

각각의 아이템을 위한 component를 분리하고 useCallback을 안에 넣는다.

```tsx
function ReportList({items}) {
	return (
		<article>
			{items.map(item => {
				<Report key={item.id} item={item} />
			})
		</article>
	)
}

function Report({ item }) {
// useCallback을 컴포넌트 최상위 레벨에서 호출한다
	const handleClick = useCallback(() => {
		sendReport(item)
	}, [item]);
	return <figure>
		<Chart onClick={handleClick} />
	</figure>
}
```

useCallback을 제거하고 Report 자체를 memo로 감쌀 수도 있다. props가 변경되지 않으면 Report는 다시 렌더링되지 않기 때문에, Chart도 마찬가지로 다시 렌더링되지 않는다.

```tsx
function ReportList({items}) {
	return (
		<article>
			{items.map(item => {
				<Report key={item.id} item={item} />
			})
		</article>
	)
}

const Report({ item }) = memo(function Report({item}) {
// useCallback을 컴포넌트 최상위 레벨에서 호출한다
	const handleClick = () => {
		sendReport(item);
	}

	return <figure>
		<Chart onClick={handleClick} />
	</figure>
});
```
