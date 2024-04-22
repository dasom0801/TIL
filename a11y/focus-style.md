# Focus Style

- 능력이나 환경에 관계없이 모든 사람에게 적합한 경험을 선제적으로 제공해야 한다.
- focus indicator는 페이지에서 현재 초점이 맞춰진 요소를 식별하게 해준다. 마우스를 사용할 수 없는 사용자에게 마우스 포인터의 대용품 역할을 한다.
- 각 전환은 다른 상태와 비교할 때 고유해야 하며, 사용자가 변경이 발생했음을 이해할 수 있도록 해야한다.
- 색맹, 저시력자도 수용할 수 있도록 이러한 상태 변화가 색상에만 의존하지 않도록 해야한다.

`:focus`

- 마우스, 키보드 등 입력 장치나 포커스하는 데 사용된 방법에 관계 없이 요소에 focus할 때마다 적용된다.
- tabindex가 있는 요소는 focus 가능하다.

```css
div[tabindex='0']:focus {
	outline: 4px dashed orange;
}
```

- focus 스타일에 outline만 쓸 수 있는 것은 아니다. 모든 범위의 CSS 속성을 허용한다.
- focus를 적용하는 것은 브라우저와 OS에 따라 다르게 동작할 수 있다.
  - macOS - 크롬은 버튼을 클릭했을 때 포커스 스타일이 표시된다.
  - macOS - Safari는 버튼을 클릭했을 때 포커스 스타일 표시되지 않는다.

`:focus-within`

- 자식 중 하나가 포커스를 받으면 부모 요소에 스타일링을 적용할 수 있다.
- 포커스 이벤트는 스타일링 지침을 적용하는 CSS 규칙을 만날때까지 버블링된다.
- 일반적으로 입력 요소 중 하나가 포커스 받은 경우 전체 양식에 스타일을 적용할 때 사용한다.

`:focus-visible`

- 마우스 커서나 손가락 탭 이외의 입력을 통해 포커스 스타일링이 확성화되면 표시하는 방법

### Focus indicator를 표시해야 할 때는 언제?

‘모바일 디바이스를 사용하는 동안 컨트롤을 클릭하면 키보드가 표시 되기를 기대할 수 있을까?’ 라는 질문에 대한 답이

- ‘그렇다’이면 입력 장치에 상관 없이 항상 포커스를 표시해야한다. 예) input
- ‘아니다’이면 선택적으로 포커스를 표시할 수 있다. 예) button
  - 마우스나 터치스크린으로 클릭하면 작업이 완료되므로 포커스 표시가 필요하지 않을 수 있다.
    - 하지만 마우스 사용자에게도 포커스 스타일이 필요할 수 있다는 점을 고려해야 한다.
    - 포커스 스타일은 명확하게 상호 작용을 표시하기 때문에 시력이 안 좋은 사람, 인지 문제가 있는 사람, 기술적으로 능숙하지 않은 사람에게 도움을 준다.
  - 키보드로 탐색하는 경우 엔터 또는 스페이스 키를 사용하여 컨트롤을 클릭할지 여부를 결정할 수 있도록 포커스를 표시하는 것이 유용하다.

참고:
https://web.dev/articles/style-focus
https://css-tricks.com/focusing-on-focus-styles/