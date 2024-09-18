# ActivityIndicator

## 설명

- 로딩 스피너를 보여주는 컴포넌트

## 예제

```
  // ...

  const App = () => (
    <View>
      <ActivityIndicator />
      <ActivityIndicator size="large" />
      <ActivityIndicator size="small" color="#0000ff"/>
      <ActivityIndicator size="large" color="#00ff00"/>
    </View>
  );
```

## Props

**`animating`**

- boolean
- 인디케이터 표시 여부

**`color`**

- 스피너 색 설정
- default
  - Android: 시스템 강조 기본 색상
  - iOS: #999999

**`hideWhenStopped`**

- 애니메이션이 적용되지 않을 때 인디케이터를 숨길지 여부

**`size`**

- 인디케이터 사이즈
- `small`, `large`
- Android: `number`
- default: `small`

## 참고

https://reactnative.dev/docs/activityindicator
