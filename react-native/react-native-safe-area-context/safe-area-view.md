# SafeAreaView

- 디바이스 상하단에 여백을 확보하여 안전한 영역에서 콘텐츠를 렌더링하는 목적으로 사용
- 둥근 모서리, 카메라 노치등 디바이스의 물리적인 특징도 반영
- React Native의 SafeAreaView는 iOS만 지원함

## Props

- `View`의 props를 상속받음
- **`edges`**

  - optional
  - 어느 방향으로 안전 영역을 적용할지 지정하는 옵션
  - Array: top, right, bottom, left (기본값: all)
    ```jsx
    // 상단에 안전 영역을 적용하지 않는 경우
    <SafeAreaView edges={['right', 'button', 'left']} />
    ```
  - Object: { top?: EdgeMode, right?: EdgeMode, bottom?: EdgeMode, left?: EdgeMode }
    - EdgeMode
      - 기본값: 'additive'
      - off: 안전 영역을 적용하지 않음
      - additive: 안전 영역을 패딩이나 마진과 더해 계산
      - maximum: 패딩이나 마진 중 더 큰 값을 선택해 적용
    ```jsx
    // 하단에 최소 24px의 여백을 주되, 기기의 안전 영역이 24px보다 크면 그 값을 사용한다.
    <SafeAreaView style={{ paddingBottom: 24 }} edges={{ bottom: 'maximum' }} />
    ```

- **`mode`**
  - optional
  - padding | margin (기본값: padding)
  ```jsx
  <SafeAreaView mode='margin' />
  ```

## 참고

https://www.npmjs.com/package/react-native-safe-area-context
https://reactnative.dev/docs/safeareaview
