# Updating Arrays in State

https://react.dev/learn/updating-arrays-in-state

## Updating arrays without mutation

- 자바스크립트에서 배열은 객체의 한 종류이다. 리액트 상태에서 객체 처럼 읽기 전용으로 취급해야한다.
- `arr[0] = 'bird'` 처럼 배열 안의 아이템을 재선언 하면 안 되고 `push()` , `pop()` 처럼 배열을 바꾸는 메서드를 사용해서는 안 된다.
- 배열을 갱신하고 싶으면 `filter()` 나 `map()` 처럼 새로운 배열을 만드는 메서드를 사용해야한다.

|      | 사용 X             | 사용 O               |
| ---- | ------------------ | -------------------- |
| 추가 | push, unshift      | concat, […arr]       |
| 제거 | pop, shift, splice | filter, slice        |
| 대체 | splice, arr[i] = … | map                  |
| 정렬 | reverse, sort      | 우선 배열을 복사한다 |

### Adding to an array

```tsx
setArtists([
	// 새로운 배열에
	...artists, // 이전 아이템들을 모두 포함하고
	{ id: nextId++, name }, // 마지막에 새로운 아이템을 추가
]);
```

### Removing from an array

```tsx
setArtists(artists.filter((a) => a.id !== artist.id));
```

### Transforming an array

```tsx
function handleClick() {
	const nextShapes = shapes.map((shape) => {
		if (shape.type === 'square') {
			return shape; // 변경 없음
		} else {
			return {
				...shape,
				y: shape.y + 50,
			}; // 50px 아래로 이동하도록 변경
		}
	});
	// 새로운 배열로 리랜더링
	setShapes(nextShapes);
}
```

### Replacing items in an array

```tsx
function handleIncrementClick(index) {
	const nextCounters = counters.map((c, i) => {
		if (i === index) {
			return c + 1; // 클릭한 카운터 증가
		} else {
			return c; // 다른 건 변경하지 않음
		}
	});
	setCounters(nextCounters);
}
```

### Inserting into an array

- 요소를 중간에 삽입하고 싶은 경우에는 slice를 사용

```tsx
function handleClick() {
	const insertAt = 1;
	const nextArtists = [
		...artists.slice(0, insertAt),
		{ id: nextId++, name: name },
		...artists.slice(insertAt),
	];
	setArtists(nextArtists);
	setName('');
}
```

### Making other changes to an array

- reverse() 나 sort()를 사용하려면 일단 배열을 복사한 뒤에 배열을 변경해야한다.

```tsx
function handleClick() {
	const nextList = [...list];
	nextList.reverse();
	setList(nextList);
}
```

- 스프레드 구문을 사용하면 원본 배열을 복사할 수 있다. 하지만 얕은 복사이기 때문에 배열 내부의 객체를 직접 수정하면 안 된다. 배열 내부의 객체를 수정하면 기존 상태를 변경하는 것과 같다.

```tsx
const nextList = [...list];
nextList[0].seen = true; // list[0]을 수정하는 것과 같음
setList(nextList);
```

## Updating objects inside arrays

- 코드에서는 배열 내부에 객체가 있는 것처럼 보이지만 객체는 실제로 배열 내부에 존재하지 않는다. 각 객체는 배열이 가리키는 별도의 값이다.

```tsx
setMyList(
	myList.map((artwork) => {
		if (artwork.id === artworkId) {
			// 새로운 객체로 변경한다.
			return { ...artwork, seen: nextSeen };
		} else {
			// No changes
			return artwork;
		}
	})
);
```
