# Choosing the State Structure

https://react.dev/learn/choosing-the-state-structure

## 상태 구조화 원칙

1. 연관 상태 그룹화

   항상 두 개 이상의 상태 변수를 동시에 업데이트하는 경우 단일 상태 변수로 병합하는 것을 고려하기

2. 상태 모순 피하기

   여러 상태가 서로 모순되거나 일치하지 않는 방식으로 상태를 구성하면 실수의 여지가 생긴다

3. 불필요한 상태 피하기

   렌더링 중에 컴포넌트의 props나 기존 상태 변수에서 일부 정보를 계산할 수 있는 경우 해당 정보는 상태에 넣지 않는다.

4. 중복 상태 피하기

   동일한 데이터가 여러 상태 변수 간에 또는 중첩된 객체 내에 중복되면 동기화 상태를 유지하기 어렵다. 가능한 중복을 줄이라

5. 깊게 중첩된 상태 피하기

   계층 구조가 깊은 상태는 업데이트하기 좋지 않다. 가능하면 상태를 평면적인 방식으로 구조화하는 것이 좋다.

## 연관 상태 그룹화

- 항상 함께 변경되는 상태 변수가 있는 경우 하나의 상태 변수로 통합하는 것이 좋다.
- 항상 동기화 상태를 유지할 수 있다.
- 얼마나 많은 상태가 필요할지 모를 때 유용하다 (예: 사용자 정의 필드 추가할 수 있는 form이 있는 경우)

```tsx
const [x, setX] = useState(0);
const [y, setY] = useState(0);

// x와 y가 함께 변경되어야 한다면 하나로 통합해서 관리한다
const [position, setPosition] = useState({ x: 0, y: 0 });
```

## 상태 모순 피하기

- 동시에 참이 될 수 없는 상태인 경우 하나의 상태 변수로 관리하여 유효한 값을 선택하도록 만든다.

```tsx
// 둘 중 하나를 호출 하는 것을 잊어버리면 모순된 상황에 빠질 수 있다.
const [isSending, setIsSending] = useState(false);
const [isSent, setIsSent] = useState(false);

// 하나의 state를 사용하여 status를 관리한다.
const [status, setStatus] = useState('typing');
```

## 불필요한 상태 피하기

- 렌더링 중에 컴포넌트의 props나 기존 state의 일부 정보로 계산할 수 있는 경우 컴포넌트의 해당 정보를 상태로 넣지 않는다.

```tsx
// fullName은 firstName과 lastName으로 계산할 수 있다.
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
// const [fullName, setFullName] = useState('');
// 상태 변수가 아니라 렌더링 중에 계산된다.
const fullName = firstName + ' ' + lastName;
```

### **Don’t mirror props in state**

```tsx
function Message({ messageColor }) {
  const [color, setColor] = useState(messageColor);
```

- 상태는 오직 첫번째 렌더링에서만 초기화되기 때문에 부모에서 messageColor가 업데이트 되더라도 color는 업데이트 되지 않는다.

```tsx
// 더 짧은 코드를 원한다면 새로운 변수를 선언해서 사용할 것
function Message({ messageColor }) {
	const color = messageColor;
```

- 특정 props의 업데이트를 무시하고 싶은 경우에 props를 state에 담아서 사용할 수 있다. initial이나 default를 변수에 추가해서 새로운 값이 무시되는 것을 명확히 한다.

```tsx
function Message({ initialColor }) {
	const [ color, setColor ] = useState(initialColor);
```

## 중복 상태 피하기

- 아래 코드는 setItems를 할 때 setSelectedItem을 하지 않으면 동기화가 되지 않는 문제가 있다.

```tsx
const initialItems = [
	{ title: 'pretzels', id: 0 },
	{ title: 'crispy seaweed', id: 1 },
	{ title: 'granola bar', id: 2 },
];

// ..
const [items, setItems] = useState(initialItems);
const [selectedItem, setSelectedItem] = useState(
	items[0] // item 객체를 중복해서 가지고 있다.
);
```

- 중복을 제거하고 id라는 필수 값만 관리한다.

```tsx
const [items, setItems] = useState(initialItems);
const [selectedId, setSelectedId] = useState(0);

// 리렌더링될 때 계산된다
const selectedItem = items.find((item) => item.id === selectedId);
```

## 깊게 중첩된 상태 피하기

- 상태를 업데이트하려면 객체 복사본을 만들어야 한다. 깊게 중첩된 경우 코드가 장황해질 수 있다.
- 상태를 ‘flat’하게 만들면 상태를 더 쉽게 업데이트할 수 있고 중첩된 객체의 다른 부분에 중복이 생기지 않도록 하는 데 도움이 된다.
- 중첩된 상태의 일부를 하위 컴포넌트로 이동하여 중첩을 줄일 수도 있다
