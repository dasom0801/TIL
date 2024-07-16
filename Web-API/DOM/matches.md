# Element: matches() method

- matches() 메서드는 지정된 CSS selector에 의해 Element가 선택되는지 여부를 테스트한다.

```javascript
matches(selectors);
```

## 파라미터

- `selector`: Element를 테스트하기 위한 유효한 CSS selector를 포함하는 문자열

## 반환값

- Element가 selector와 일치하면 `true` 아니면 `false`

## 예외

- 파라미터의 `selector`가 CSS selector로 파싱되지 않는 경우 throw된다.
