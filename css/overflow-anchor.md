# overflow-anchor

### 스크롤 앵커링이란?

- 사용자가 이미 문서의 새로운 부분으로 스크롤한 후에 콘텐츠가 로드되는 경우 발생하는 콘텐츠 점프 문제를 해결하기 위한 브라우저 기능

### 스크롤 앵커링의 작동 방법

- 스크롤 앵커링은 뷰포트 외부의 변경 사항을 보정하기 위해 스크롤 위치를 조정한다.
- 사용자가 문서에서 보고 있는 지점은 뷰포트에 그대로 유지되므로 실제로 문서에서 얼마나 이동했는지에 따라 스크롤 위치가 변경될 수 있다.

### 스크롤 앵커링을 켜는 방법

- 브라우저에서 기본적으로 활성화되어 있다.
- 콘텐츠 이동은 좋지 않은 경험이기 때문에 대부분의 경우 고정 스크롤을 사용하는 것이 좋다.

### 디버깅 하는 방법

- 스크롤 앵커링이 활성화된 상태에서 페이지가 제대로 작동하지 않는다면 일부 스크롤 이벤트 리스너가 앵커 노드 이동을 보정하기 위한 추가 스크롤을 제대로 처리하지 못하기 때문일 수 있다.
- 스크롤 앵커링을 비활성화하면서 문제가 해결되었는지 확인할 수 있다.
- Firefox에서는 `about:config` 에서 `layout.css.scroll-anchoring.enabled` 를 `false` 하여 비활성화 하고, `layout.css.scroll-anchoring.highlight` 로 어떤 노드를 앵커로 사용하고 있는지 확인할 수 있다.

### 비활성화 하는 방법

- overflow-anchor를 사용하여 스크롤 앵커링을 비활성화할 수 있다.
- auto: 초기값, 스크롤 위치를 조정할 때 요소는 잠재적인 앵커가된다. 스크롤 앵커링 동작이 발생하며 콘텐츠 점프가 줄어든다.
- none: 해당 요소가 잠재적 앵커로 선택되지 않는다.
- 스크롤 앵커를 선택 해제하면 하위 요소에서 다시 선택 해제할 수 없다.
- 전체 문서에 대해 선택 해제하면 문서 내 다른 곳에서 `overflow-anchor: auto` 을 설정하여 하위 섹션에 대해 다시 켜도록 설정할 수 없다.

### 참고

https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-anchor
https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-anchor/Guide_to_scroll_anchoring