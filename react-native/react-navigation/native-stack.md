# Native Stack

## 설명

- 화면 전환 시, 새로운 화면이 스택에 쌓이도록 하는 내비게이터
- native APIs 사용
  - iOS: `UINavigationController`
  - Android: `Fragment`
- 특징
  - 네이티브 앱과 동일한 동작, 성능을 제공
  - 커스텀 제약
    - `@react-navigation/stack`
      - 자바스크립트 기반
      - 보다 다양한 커스텀 가능

## 설치

```
npm install @react-navigation/native-stack
```

**의존성 설치**

- `@react-navigation/native`
- `react-native-screens`
- `react-native-safe-area-context`

(참고: https://reactnavigation.org/docs/getting-started/)

## API 정의

### 예제

```javascript
import { createNativeStackNavigator } from '@react-navigation/native-stack`;

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato'}
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Awesome app'
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'My profile'
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
```

### `Stack.Navigator` 컴포넌트 Props

- `id`
  - 내비게이터의 고윳값
  - 자식 내비게이터에서 참조할 때 사용 (`navigation.getParent`)
- `initialRouteName`
  - 내비게이터 첫 로드 시에 보여줄 라우트 이름
  - 생략하면 스크린 중 첫 번째 라우트
- `screenOptions`
  - 내비게이터의 스크린에 사용할 기본 옵션

### Options

- [옵션](./options-for-screens.md)으로 내비게이터에서 화면 구성
- 헤더 타이틀, 헤더 스타일, 헤더 좌우 버튼 구성, 애니메이션 등 설정 가능
- 문서 참고: https://reactnavigation.org/docs/native-stack-navigator/#options

### Events

- 내비게이터가 특정 작업에 대한 이벤트를 발생시키고, 해당 이벤트에 리스너를 등록해서 작업을 수행할 수 있다.
- `transitionStart`
  - 현재 화면에 대한 전환 애니메이션이 시작할 때 발생
- `transitionEnd`
  - 현재 화면에 대한 전환 애니메이션이 종료할 때 발생

**예**

```javascript
React.useEffect(() => {
	const unsubscribe = navigation.addListener('transitionStart', (e) => {
		// Do something
	});
	return unsubscribe;
}, [navigation]);
```

### Helpers

- `replace`
  - 현재 화면을 스택의 새로운 화면으로 바꾼다.
  - `name` - string - 스택에 푸시할 경로의 이름
  - `params` - object - 라우트로 전달할 매개변수
  ```javascript
  navigation.replace('Profile', { owner: 'Michaś' });
  ```
- `push`
  - 새 화면을 스택의 맨 위에 추가하고 해당 화면으로 이동
  - arguments: `name` `params`
  ```javascript
  navigation.push('Profile', { owner: 'Michaś' });
  ```
- `pop`

  - 현재 화면을 스택에서 pop하고 이전 화면으로 돌아감
  - arguments: `count`(optional) - 몇 개 화면을 되돌릴지 지정

  ```javascript
  navigation.pop();
  ```

- `popToTop`
  - 첫 번째 화면을 제외한 스택의 모든 화면을 pop하고 해당화면으로 이동
  ```javascript
  navigation.popToTop();
  ```

## 참고

https://reactnavigation.org/docs/native-stack-navigator
