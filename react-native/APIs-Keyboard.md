# Keyboard

## 설명

- 키보드 이벤트를 수신하고 반응할 수 있다.

## Methods

**`addListener()`**
키보드 알림 이벤트에 함수를 연결

```
  static addListener: (
    eventName: KeyboardEventName,
    callback: KeyboardEventListener,
  ) => EmitterSubscription;
```

- eventName
  - `keyboardWillShow`
  - `keyboardDidShow`
  - `keyboardWillHide`
  - `keyboardDidHide`
  - `keyboardWillChangeFrame`
  - `keyboardDidChangeFrame`
- callback
  - 이벤트가 발생하면 호출될 함수

**`dismiss()`**

- 활성화된 키보드를 헤제
- 포커스 제거

**`scheduleLayoutAnimation()`**

- 키보드 움직임에 따라 텍스트 입력의 위치 변경 크기를 동기화하는 데 유용하다.

**`isVisible()`**

- 키보드가 표시되었는지 여부

**`metrics()`**

- 키보드가 화면에 표시되고 있는 경우 소프트 키보드의 metrics를 반환
- KeyboardMetics: 소프트 키보드의 크기나 위치에 관한 정보

## 참고

https://reactnative.dev/docs/keyboard
