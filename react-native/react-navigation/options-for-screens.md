# Options for screens

- 화면에 옵션을 지정하여 내비게이터에 표시되는 방식을 구성 가능
- 내비게이터마다 다른 옵션을 지원함

## 화면 옵션 지정 방식

### `Screen`의 `options` props

- 객체/함수를 props로 전달 가능
- 함수는 navigation과 route를 props로 받는다.

```jsx
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: 'Awesome app' }}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={({ navigation }) => ({
        title: 'Profile',
        headerLeft: () => (
          <DrawerButton onPress{() => navigation.toggleDrawer()} />
        )
      })}
     />
  </Stack.Navigator>
```

### `Group`의 `screenOptions`

- 그룹 내의 모든 화면에 지정하는 옵션
- `options`와 마찬가지로 객체/함수를 props로 받음

```jsx
<Stack.Navigator>
	<Stack.Group
		screenOptions={{ headerStyle: { backgroundColor: 'papayawhip' } }}
	>
		<Stack.Screen name='Home' component={HomeScreen} />
		<Stack.Screen name='Profile' component={ProfileScreen} />
	</Stack.Group>
</Stack.Navigator>
```

### `navigator`의 `screenOptions`

- 네비게이터의 모든 화면에 적용

```jsx
<Tab.Navigator
	screenOptions={({ route }) => ({
		tabBarIcon: ({ color, size }) => {
			const icons = {
				Home: 'home',
				Profile: 'account',
			};

			return (
				<MaterialCommunityIcons
					name={icons[route.name]}
					color={color}
					size={size}
				/>
			);
		},
	})}
>
	<Tab.Screen name='Home' component={HomeScreen} />
	<Tab.Screen name='Profile' component={ProfileScreen} />
</Tab.Navigator>
```

### `navigation.setOptions` method

- 컴포넌트내에서 화면의 옵션을 업데이트 가능

```jsx
<Button
	title='Update options'
	onPress={() => navigation.setOptions({ title: 'Updated!' })}
/>
```

## 참고

https://reactnavigation.org/docs/screen-options
