# aria-hidden

- 스크린 리더 같은 보조 기술에서 요소와 그 콘텐츠의 표시 여부를 나타내는 데 사용하는 HTML 속성
- `aria-hidden="true"` 를 사용하면 접근성 트리에서 해당 요소와 해당 요소의 모든 하위 요소가 제거된다.
- 숨기면 보조 기술 사용자의 사용성을 개선할 수 있는 내용:
  - 아이콘이나 이미지와 같은 순전히 장식정인 콘텐츠
  - 반복되는 텍스트와 같은 중복된 콘텐츠
  - 메뉴와 같이 화면 밖으로 나가거나 축소된 콘텐츠
- 보조 기술에서는 콘텐츠를 숨기지만 시각적으로는 아무것도 숨기지 않는다. 자식에게 속성이 상속되기 때문에 포커스 사용 가능한 요소의 부모 또는 조상 요소에 추가해서는 안 된다.
- aria-hidden을 사용할 때 주의점: 보조 기술에서 시각적으로 렌더링되는 콘텐츠를 숨길 때 모든 장애를 고려해야 한다. 보조 기술을 사용하는 모든 사용자가 시각 장애가 있는 것은 아니다. 표시되는 콘텐츠가 접근성 API의 텍스트 콘텐츠와 일치하지 않으면 부정적인 사용 경험을 줄 수 있다.
- 다음과 같은 경우 요소가 이미 접근성 트리에서 제거되었기 때문에 속성을 추가할 필요가 없다. 시각적으로 사라진 요소는 화면과 보조 기술 모두에서 콘텐츠가 숨겨진다.
  - HTML hidden 속성이 존재하는 요소
  - 요소 또는 상위 요소가 display: none으로 숨겨짐
  - 요소 또는 상위 요소가 visibility: hidden

참고
https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden