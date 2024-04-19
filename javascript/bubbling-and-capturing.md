# 이벤트 버블링과 캡처링

## 버블링

요소에서 이벤트가 발생 ⇒ 할당된 핸들러 동작 ⇒ 부모 요소의 핸들러가 동작 ⇒ 가장 최상단의 조상 요소를 만날 때까지 반복

```html
<form onclick="alert('form')">
	Form
	<div onclick="alert('div')">
		Div
		<p onclick="alert('p')"></p>
	</div>
</form>
```

p를 클릭하면 p ⇒ div ⇒ for 순으로 alert이 뜬다.

1. p에 할당된 onclick 핸들러 동작
2. div에 할당된 핸들러 동작
3. form에 할당된 핸들러 동작
4. document 객체를 만날 때까지 각 요소의 onclick 핸들러가 동작

### event.target

- target: 이벤트가 발생한 가장 안쪽의 요소, event.target으로 접근 가능
- event.target: 실제 이벤트가 시작한 타깃 요소, 버블링이 진행되어도 변하지 않음
- this: ‘현재’ 요소, 현재 실행 중인 핸들러가 할당된 요소를 참조

<form.onclick 핸들러의 event.target과 this>

- this(event.currentTarget) - form 요소
- event.target - 폼 안쪽에 실제 클릭한 요소 (p를 클릭했다면 p, form을 클릭했다면 form)

### 버블링 중단하기

- event.stopPropagation()을 사용하면 이벤트를 처리하고 난 후 버블링을 중단할 수 있다.

```html
<body onclick="alert(`실행되지 않음`)">
	<button onclick="event.stopPropagation()">클릭</button>
</body>
```

- event.stopPropagation()은 위쪽으로 일어나는 버블링은 막아주지만, 다른 핸들러들이 동작하는 건 못 막는다.
- 버블링을 멈추고, 요소에 할당된 다른 핸들러의 동작도 막으려면 event.stopImmediatePropagation()를 사용한다.
- 버블링을 꼭 멈춰야 하는 상황이 아니라면 막지 말 것.

## 캡처링

**이벤트 흐름 3가지 단계**

1. 캡처링 단계 - 이벤트가 하위 요소로 전파되는 단계
2. 타깃 단계 - 이벤트가 실제 타깃 요소에 전달되는 단계
3. 버블링 단계 - 이벤트가 상위 요소로 전파되는 단계

- 이벤트가 최상위 조상에서 시작해 아래로 전파되고(캡처링 단계), 이벤트 타킷 요소에 도착해 실행된 후(타깃 단계), 다쉬 위로 전파된다(버블링 단계)
- on<event>프로퍼티나 HTML 속성, addEventListener(event, handler) 를 이용해 할당된 핸들러는 캡처링에 대해 전혀 알 수 없다. ⇒ 핸들러가 타깃 단계와 버블링 단계에서만 동작한다.
- 캡처링 단계에서 이벤트를 잡아내려면 addEventListener의 capture 옵션을 true로 설정한다.
  - false (default): 핸들러가 버블링 단계에서 동작
  - true: 핸들러가 캡처링 단계에서 동작

출처: https://ko.javascript.info/bubbling-and-capturing
