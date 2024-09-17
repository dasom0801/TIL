# KeyboardAvoidingView

## 설명

- 키보드가 화면을 가리는 문제를 해결할 때 사용
- 키보드가 표시될 때 키보드 높이에 따라 height, position, bottom padding을 자동으로 조정

## Props

**behavior**

- `height`, `position`, `padding`
- 키보드가 표시에 대한 반응 방식 지정
- 플랫폼에 따라서 다르게 반응하기 때문에 각각 behavior를 설정하는 것을 권장함

**contentContainerStyle**

- `behavior`가 `position`일 때의 content container(View)의 스타일

**enabled**

- `boolean`
- KeyboardAvoidingView 의 활성화 여부

**keyboardVerticalOffset**

- `number`
- 사용자 화면 상단과 리엑트 네이티브 뷰 사이의 거리

## 참고

https://reactnative.dev/docs/keyboardavoidingview
