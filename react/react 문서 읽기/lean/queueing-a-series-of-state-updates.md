# Queueing a Series of State Updates

https://react.dev/learn/queueing-a-series-of-state-updates

## React 일괄 상태 업데이트

- React는 상태 업데이트를 처리하기 전에 이벤트 핸들러의 모든 코드가 실행될 때까지 기다린다. 완료될 때까지 UI가 업데이트되지 않는다.
- 리렌더링을 여러번 트리거하지 않고도 여러 컴포넌트에서 여러 상태 변수를 업데이트 할 수 있다.
- React 앱을 훨씬 빠르게 실행할 수 있게 해주고, 일부 변수만 업데이트된 혼란스러운 렌더링을 처리하지 않아도 된다.
- 클릭과 같은 의도적인 이벤트에 대해 일괄 처리하지 않고 개별적으로 처리한다.

## 다음 렌더링 전에 동일한 state를 여러번 업데이트하기

- 큐에 있는 이전 상태를 기반으로 계산하여 다음 상태를 반환하는 함수를 전달하는 것으로 가능하다
- 단순히 값을 바꾸는 게 아니라 React에게 상태 값으로 무언가를 하라고 지시한다

```tsx
setNumber((n) => n + 1);
```

1. 리액트는 이벤트 핸들러의 다른 모든 코드가 실행된 후에 이 함수를 처리하도록 대기열에 넣는다.
2. 다음 렌더링 중에 useState를 호출하면 대기열에 있는 함수를 실행하며 최종 업데이트된 상태를 제공한다.

## state를 바꾼 다음에 update를 하면 어떻게 될까?

```tsx
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
}}>
```

1. setNumber(number + 5) : number가 0이면 setNumber(0 + 5)이다. 리액트 ‘5로 값을 바꾼다’는 동작을 대기열에 추가한다
2. setNumber(n => n + 1): n ⇒ n + 1은 업데이트 함수이다. 리액트는 함수를 대기열에 추가한다.
3. 다음 렌더링에서 대기열이 순서대로 실행되어 결과는 6이 된다.

## state를 update를 한 뒤에 바꾸면 어떻게 될까?

```tsx
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
  setNumber(42);
}}>
```

1. setNumber(number + 5) : number가 0이면 setNumber(0 + 5)이다. 리액트 ‘5로 값을 바꾼다’라는 동작을 대기열에 추가한다
2. setNumber(n => n + 1): n ⇒ n + 1은 업데이트 함수이다. 리액트는 함수를 대기열에 추가한다.
3. setNumber(42): ‘42로 값을 바꾼다’라는 동작이 대기열에 추가된다.
4. 대기열을 순서대로 실행하면 결과는 42가 된다.

- updater function은 대기열에 추가된다.
- updater function이 아닌 값은 대기열에 추가되면 이전에 대기열에 있던 값이 무시된다.

## 네이밍 규칙

- 변수의 첫번째 글자로 지정하는 게 일반적이다.

```tsx
setEnabled((e) => !e);
setLastName((ln) => ln.reverse());
setFriendCount((fc) => fc * 2);
```

- 더 상세한 코드를 원하면 변수 이름을 그대로 사용하거나 접두사(prev)를 붙일 수 있다.

```tsx
setEnabled((enabled) => !enabled);
setEnabled((prevEnabled) => !prevEnabled);
```
