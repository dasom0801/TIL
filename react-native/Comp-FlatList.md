# FlatList

## Props

- [VirtualizedList Props](https://reactnative.dev/docs/virtualizedlist#props) 상속

**`renderItem`**

- required
- type: 함수
- return: JSX.Element
- props:
  - item(object): data 배열의 요소. 렌더링 대상인 항목
  - index(number): data 배열에서 해당 item의 위치(순서)
  - separators(object)
    - 리스트 항목 사이에 구분선 설정

**`data`**

- required
- type: ArrayLike
- 렌더링 대상인 아이템들

**`ItemSeparatorComponent`**

- 상단, 하단을 제외한 아이템들 사이에 렌더링되는 컴포넌트
- type: React component(`SomeComponent`), React element(`<SomeComponent />`), function
- props
  - `highlighted`
    - `renderItem`의 `separators.highlight`/`unhighlight`에 의해 갱신됨
    - `separators.updateProps`로 커스텀 가능
  - `leadingItem`

**`ListEmptyComponent`**

- 리스트가 비었을 때 렌더링되는 컴포넌트
- type: React component(`SomeComponent`), React element(`<SomeComponent />`)

**`ListFooterComponent`**

- 모든 아이템의 하단에 렌더링되는 컴포넌트
- type: React component(`SomeComponent`), React element(`<SomeComponent />`)
- ListFooterComponentStyle로 스타일 지정 가능

**`ListHeaderComponent`**

- 모든 아이템의 상단에 렌더링되는 컴포넌트
- type: React component(`SomeComponent`), React element(`<SomeComponent />`)
- ListHeaderComponentStyle로 스타일 지정 가능

**`columnWrapperStyle`**

- 여러 열을 표시할 때 각 행을 감싸는 스타일을 지정

  ```jsx
  <FlatList
  	data={data}
  	renderItem={renderItem}
  	numColumns={2}
  	columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }}
  />
  ```

**`extraData`**

- 리스트가 `data`가 아닌 다른 외부 데이터에 의해 리렌더링 되어야 할 경우 extraData에 전달
- FlatList는 성능 최적화를 위해 기본적으로 data props이 바뀌지 않으면 리스트를 리렌더링 하지 않음
- renderItem, Header, Footer 같은 함수가 data외부의 다른 데이터에 의존한다면 extraData에 해당 데이터를 전달해야 리렌더링됨
- extraData는 불변성을 유지할 것 (값 변경x, 값 할당 o)

**`getItemLayout`**

- 아이템의 사이즈를 미리 알고 있는 경우 동적 콘텐트에 대한 크기 게산을 생략하는 것을 통해 성능 최적화 가능
- return
  - length: item의 크기
  - offset
    - item이 리스트에서 배치될 위치
    - 이전 항목들의 길이를 모두 더한 값
    - 항목 사이에 separator가 있다면 계산에 포함 필요
  - index: 해당 항목의 인덱스

```javascript
<FlatList
	data={data}
	renderItem={renderItem}
	getItemLayout={(data, index) => ({
		length: ITEM_HEIGHT,
		offset: (ITEM_HEIGHT + SEPARATOR_HEIGHT) * index,
		index,
	})}
/>
```

**`horizontal`**

- true면 아이템을 가로로 렌더링
- type: boolean

**`initialNumToRender`**

- 초기에 렌더링할 아이템 수
- type: number (default: 10)
  **`initialScrollIndex`**
- 첫번째 항목부터 상단에서 시작하는 대신 initialScrollIndex에서 시작
  **`inverted`**
- 스크롤 방향 반전
  **`keyExtractor`**
- 아이템의 고유한 키를 추출하는 데 사용
- 캐싱과 항목 재정렬을 추적하기 위한 리액트 키로 사용
  **`numColumns`**
- 여러 열은 `horizontal={false}`일 때만 사용 가능
- flewWrap layout처럼 지그재그로 표시됨
  **`onRefresh`**
- Pull to Refresh 기능을 위해 표준 RefreshControl이 추가됨
  **`onViewableItemsChanged`**
- viewabilityConfig에 정의된 대로 행의 표시 여부가 변경될 때 호출
  **`progressViewOffset`**
- 로딩 인디케이터를 올바르게 표시하기 위해 오프셋이 필요한 경우 설정
  **`refreshing`**
- Pull to Refresh로 새 데이터를 기다리는 중일 때 true로 설정
- true일 때 FlatList는 로딩 상태를 표시함
  **`removeClippedSubviews`**
- 큰 목록의 스크롤 성능 향상
- 상황에 따라 버그(컨텐츠 누락)이 있을 수 있다.
  **`viewabilityConfig`**
- viewAreaCoveragePercentThreshold, itemVisiblePercentThreshold 둘 중 하나는 필수
- props
  - minimumViewTime(number)
  - viewAreaCoveragePercentThreshold(number)
  - itemVisiblePercentThreshold(number)
  - waitForInteraction(boolean)
    **`viewabilityConfigCallbackPairs`**
- type: ViewabilityConfig/onViewableItemsChanged 쌍의 목록

## Methods

**`flashScrollIndicators()`**

- 스크롤 인디게이터를 일시적으로 표시
  **`getNativeScrollRef()`**
- 기본 스크롤 컴포넌트에 대한 참조
  **`getScrollResponder()`**
- 스크롤 리스폰더에 접근할 수 있는 핸들 반환
- 스크롤을 직접 관리하거나 특정 동작을 구현하는 데 사용
  **`getScrollableNode()`**
- 스크롤 가능한 노드에 접근할 수 있도록 핸들을 제공
- 스크롤 관련 네이티브 동작 제어
  **`scrollToEnd()`**
- 콘텐츠의 끝으로 스크롤
- getItemLayout 없이는 불안정할 수 있다.
  **`scrollToIndex()`**
- 지정된 인덱스로 스크롤
  **`scrollToItem()`**
- 데이터를 선형적으로 스캔해야 한다 => scrollToIndex 사용 권장
  **`scrollToOffset()`**
- 특정 픽셀 오프셋 위치로 스크롤

## 참고

https://reactnative.dev/docs/flatlist
