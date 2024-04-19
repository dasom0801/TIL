# encodeURIComponent()

## 구문

```tsx
encodeURIComponent(str);
```

## 매개 변수

str: URI 구성요소

## 반환 값

주어진 문자열을 URI 구성요소로서 인코딩한 새로운 문자열

## 설명

- `encodeURIComponent()` 는 다음 문자를 제외한 문자를 이스케이프한다.

```tsx
A-Z a-z 0-9 - _ . ! ~ * ' ( )
```

- `encodeURIComponent()` 와 `encodeURI()` 의 차이

```tsx
var set1 = ';,/?:@&=+$'; // 예약 문자
var set2 = "-_.!~*'()"; // 이스케이프 되지 않는 문자
var set3 = '#'; // Number Sign
var set4 = 'ABC abc 123'; // 영어와 공백

console.log(encodeURI(set1)); // ;,/?:@&=+$
console.log(encodeURI(set2)); // -_.!~*'()
console.log(encodeURI(set3)); // #
console.log(encodeURI(set4)); // ABC%20abc%20123 (공백 => %20)

console.log(encodeURIComponent(set1)); // %3B%2C%2F%3F%3A%40%26%3D%2B%24
console.log(encodeURIComponent(set2)); // -_.!~*'()
console.log(encodeURIComponent(set3)); // %23
console.log(encodeURIComponent(set4)); // ABC%20abc%20123 (공백 => %20)
```

- `encodeURIComponent()` 서버에 요청할 양식 필드를 인코딩한다.
  - 입력 중 의도치 않게 생성될 수 있는 HTML 특수 개체 등의 문자 처리를 할 수 있다.
  - 예) “Jack&Jill” 를 인코딩하지 않으면 서버가 앰퍼샌드를 새로운 필드의 시작으로 인식해서 데이터의 무결성을 해칠 수 있다.
