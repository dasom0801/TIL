# Updating Objects in State

https://react.dev/learn/updating-objects-in-state

- state에 있는 객체를 직접적으로 변경해서는 안 된다.
- 객체를 갱신할 때는 새로운 객체를 만들거나 이미 존재하는 객체를 복사해야한다. 그리고 새로운 객체를 상태에 저장해야한다.

## What’s a mutation?

- `immutable(불변)` 은 변경할 수 없음 또는 읽기 전용을 의미한다. 값을 바꾸는 것으로 리렌더링을 트리거할 수 있다.

```tsx
const [x, setX] = useState(0);
setX(5);
```

- x의 상태는 0에서 5로 변경되지만 숫자 0자체는 변경되지 않는다. 자바스크립트에서 숫자, 문자열, 부울 같은 값은 변경할 수 없다.

```tsx
const [position, setPosition] = useState({ x: 0, y: 0 });
position.x = 5;
```

- 기술적으로 객체 자체의 값을 바꿀 수 있다. 이를 muation이라고 한다.
- 리액트 상태의 객체가 mutation이라고 해도 immutable 처럼 취급해야 한다. 항상 객체를 대체 해야한다.

## Treat state as read-only

- 상태에 넣은 모든 Javascript 객체를 읽기 전용으로 취급해야 한다.
- set 함수를 사용하지 않으면 리액트는 객체가 변경되었다는 사실을 알지 못하기 때문에 아무런 반응을 하지 않는다.

```tsx
onPointerMove={e => {
	setPosition({
		x: e.clientX,
		y: e.clientY
	});
}}
```

- set 함수를 사용하면 리액트는
  - 상태 값이 새로운 객체로 변경된 것을 알게 된다.
  - 컴포넌넌트를 새로 렌더링하게 된다.

## Copying objects with the spread syntax

- 이미 존재하는 값을 가지고 부분적으로 새로운 값을 만들고 싶을 때 spread syntax를 사용할 수 있다.

```tsx
setPerson({
	...person, // 이전 값을 복사
	firstName: e.target.value, // 새로운 값으로 덮어쓰기
});
```

- spread syntax는 얕은 복사를 한다. 중첩된 프로퍼티를 업데이트하려면 두 번 이상 사용해야 한다.

## Updating a nested object

```tsx
const [person, setPerson] = useState({
	name: 'Niki de Saint Phalle',
	artwork: {
		title: 'Blue Nana',
		city: 'Hamburg',
		image: 'https://i.imgur.com/Sd1AgUOm.jpg',
	},
});

// person.artwork.city를 업데이트하는 방법1
const nextArtwork = { ...person.artwork, citi: 'New Delhi' };
const nextPerson = { ...person, artwork: nextArtwork };
setPerson(nextPerson);

// person.artwork.city를 업데이트하는 방법2
setPerson({
	...person, // 다른 필드를 복사
	artwork: {
		// artwork를 대체
		...person.artwork, // 이전 값 사용
		city: 'New Delhi', // 새로운 값 적용
	},
});
```

## Write concise update logic with Immer

1.  `npm install use-immer`
2.  `import { useState } from 'react'` 를  `import { useImmer } from 'use-immer'` 로 대체한다.

```tsx
const [person, updatePerson] = useImmer({
	name: 'Niki de Saint Phalle',
	artwork: {
		title: 'Blue Nana',
		city: 'Hamburg',
		image: 'https://i.imgur.com/Sd1AgUOm.jpg',
	},
});

function handleNameChange(e) {
	updatePerson((draft) => {
		draft.name = e.target.value;
	});
}
```

### 값을 변경하는 것을 리액트에서 권장하지 않는 이유

- 디버깅
  - 값을 변경(mutate)하지 않고 console.log를 사용하면 과거 로그가 최근 상태 변경으로 인해 방해받지 않는다.
  - 렌더링 간에 상태가 어떻게 변경되었는지 명확하게 확인할 수 있다.
- 최적화
  - 일반적인 React의 최적화 전략은 이전 props나 state가 다음 값과 동일하면 작업을 건너뛴다.
  - mutate하지 않으면 값이 바뀌었는지를 빠르게 확인할 수 있다.
  - prevObj === obj 라면, 내부에 변경이 없다는 것을 확신할 수 있다.
- 새로운 기능
  - 개발중인 React의 새로운 기능은 state가 스냅샷처럼 취급되는 것에 의존한다.
  - state를 mutate 하는 경우 새로운 기능을 사용하지 못 할 수 있다.
- 요구 사항 변경
  - 실행 취소, 다시 실행, 변경 내역 표시, 이전 값으로 form 을 초기화 등의 기능은 mutate되지 않은 상태에서 더 쉽게 수행할 수 있다.
  - 과거의 상태 복사본을 메모리에 보관하고 필요할 때 재사용할 수 있다
- 간단한 구현
  - React는 mutation에 의존하지 않기 때문에 객체에 특별한 작업을 할 필요가 없다.
