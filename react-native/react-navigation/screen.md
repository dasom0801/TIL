# Screen

- 내비게이터 내에서 화면에 대한 구성 담당
- `createXNavigator`의 반환값
  - Navigator
  - Screen
- Navigator를 만든 뒤 `Navigator`의 자식 요소로 `Screen`을 사용

```jsx
<Stack.Navigator>
	<Stack.Screen name='Home' component={HomeScreen} />
	<Stack.Screen name='Profile' component={ProfileScreen} />
</Stack.Navigator>
```

- Screen의 필수 값
  - `name`, `component`

## Props

### `name`

- 화면의 이름

```jsx
<Stack.Screen name='Profile' component={ProfileScreen} />
```

- 화면으로 이동할 때 사용

```javascript
navigation.navigate('Profile');
```

- 권장 사항: 공백, 특수 문자를 사용하지 않고 단순하게 유지

### `options`

- 내비게이터에 화면이 표시되는 방식을 구성하는 옵션
- 객체 | 객체를 반환하는 함수
- 함수의 props: `route`, `navigation`

```jsx
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{
    title: 'Awesome app',
  }}
/>
<Stack.Screen
  name="Profile"
  component={ProfileScreen}
  options={({ route, navigation }) => ({
    title: route.params.userId,
  })}
/>
```

### `initialParams`

- 화면이 `initialRouteName`으로 사용되는 경우 `initialParams`의 매개변수가 포함된다

```jsx
<Stack.Screen
	name='Details'
	component={DetailsScreen}
	initialParams={{ itemId: 42 }}
/>
```

### `getId`

- 콜백을 호출 -> 화면에 사용할 고유 ID를 반환
- route params가 포함된 객체를 받는다.

```jsx
<Stack.Screen
	name='Profile'
	component={ProfileScreen}
	getId={({ params }) => params.userId}
/>
```

**같은 화면으로 이동할 때의 동작**

- 현재 화면과 같은 이름으로 이동하면 새 화면을 추가하지 않고 현재 화면을 새 매개변수를 통해 업데이트한다.

```javascript
// 'Home'화면에서 이동
navigation.navigate('Profile', { userId: 1 });
// Stack: `Home` -> `Profile` + userId: 1

// Profile 화면으로 다시 이동
navigation.navigate('Profile', { userId: 2 });

// Stack: `Home` -> `Profile` + userId: 2
```

**getId를 사용할 때의 동작**

- getId가 undefined 이외의 값을 반환하면 이름 + 반환된 ID로 식별
- 같은 화면으로 이동할 때, getId 콜백에서 다른 ID를 반환하면 스택에 새로운 화면이 추가된다.

```javascript
// getId에서 다른 ID를 반환하는 경우

// 'Home'화면에서 이동
navigation.navigate('Profile', { userId: 1 });
// Stack: `Home` -> `Profile` + userId: 1

// Profile 화면으로 다시 이동
navigation.navigate('Profile', { userId: 2 });

// Stack: `Home` -> `Profile` + userId: 1 -> `Profile` + userId: 2
```

### `component`

- 화면에 렌더링할 컴포넌트

### `getComponent`

- 화면에 렌더링할 컴포넌트를 반환하는 콜백
- 특정 모듈이 필요할 때 평가되도록 함
- 초기 부하를 개선하기 위해 램 번들을 사용할 때 유용

```jsx
<Stack.Screen
 name="Profile"
 getComponent={() => require('./ProfileScreen').default}
>
```

### `children`

- 화면에서 사용할 React Element를 반환하는 렌더링 콜백
- 추가 프로퍼티를 전달할 때 컴포넌트 프로퍼티 대신 사용 가능
  - 데이터를 전달할 때 React Context를 사용하는 것이 좋다.

```jsx
<Stack.Screen name='Profile'>
	{(props) => <ProfileScreen {...props} />}
</Stack.Screen>
```

- React Navigation은 기본적으로 컴포넌트 최적화를 통해 불필요한 렌더링을 방지함. 렌더 콜백을 사용하면 최적화가 제거됨.
- 성능 문제를 피하기 위해서는 `React.memo` | `React.PureComponent` 를 사용할 것

### `navigationKey`

- 키가 변경되면 이 이름을 가진 기존 화면이 제거되거나 재설정됨
- 조건이 변경될 때 제거하거나 재설정하려는 화면이 있을 때 유용

```jsx
<Stack.Screen
	navigationKey={isSignedIn ? 'user' : 'guest'}
	name='Profile'
	component={ProfileScreen}
/>
```

### `listeners`

- 이벤트 리스너 구독 가능

## 참고

https://reactnavigation.org/docs/screen
