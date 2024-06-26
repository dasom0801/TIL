# Understanding Your UI as a Tree

https://react.dev/learn/understanding-your-ui-as-a-tree

- 리액트와 다른 많은 UI 라이브러리는 UI를 트리로 모델링한다.
- 앱을 트리로 생가하면 컴포넌트 간의 관계를 이해하는 데 유용하다.

## 트리로서의 UI

- 트리는 항목 간의 관계 모델이며 UI는 트리 구조를 사용하여 표현되는 경우가 많다.
- 브라우저는 트리 구조를 사용하여 HTML(DOM)과 CSS를 모델링한다.
- 모바일 플랫폼에서도 트리를 사용하여 뷰 계층 구조를 표현한다.
- 리액트도 트리 구조를 사용하여 리액트 앱의 컴포넌트 간의 관게를 관리하고 모델링한다.
- 트리는 리액트 앱에서 데이터가 흐르는 방식과 렌더링 및 앱 크기를 최적화하는 방법을 이해하는 데 유용한 도구이다.

## 렌더 트리

- 컴포넌트의 주요 특징은 다른 컴포넌트의 컴포넌트를 구성할 수 있다는 것
- 컴포넌트를 중첩할 때 부모와 자식 컴포넌트라는 개념이 있다.
- 각 부모 컴포넌트 자체가 다른 컴포넌트의 자식이 될 수 있다.
- React 앱을 렌더링할 때 렌더 트리라고 하는 트리에서 이 관계를 모델링할 수 있다.
- 렌더 트리는 React 컴포넌트로만 구성된다.
- 조건부 렌더링을 사용하면 부모 컴포넌트는 전달된 데이터에 따라 다른 자식을 렌더링할 수 있다.
- 렌더 트리는 React 앱에서 최상위 컴포넌트와 리프 컴포넌트를 식별하는 데 유용하다.
- 최상위 컴포넌트
  - 루트 컴포넌트에서 가장 가까운 컴포넌트.
  - 그 아래 모든 컴포넌트의 렌더링 성능에 영향을 줌.
  - 가장 복잡한 컴포넌트를 포함하는 경우가 많다
- 리프 컴포넌트
  - 트리의 맨 아래에 있음
  - 하위 컴포넌트가 없고 자주 다시 렌더링되는 경우가 많다.

## 모듈 의존성 트리

- 컴포넌트와 로직을 별도의 파일로 분리할 때 컴포넌트, 함수 또는 상수를 export 할 수 있는 JS 모듈을 만든다.
- 모듈 의존성 트리의 각 노드는 모듈이다. 각 분기는 해당 모듈의 import 문을 나타낸다.
- 모듈 의존성 트리의 루트 노드는 엔트리포인트 파일이라고 하는 루트 모듈이다. 루트 컴포넌트를 포함하는 모듈인 경우가 많다.
- 트리를 구성하는 노드는 컴포넌트가 아닌 모듈을 나타낸다.
- 의존성 트리는 React 앱을 실행하는 데 필요한 모듈을 결정하는 데 유용하다. 번들러는 의존성 트리를 사용하여 어떤 모듈을 번들에 포함해야 하는지 결정한다.
- 앱이 성장하면 번들 크기가 커지는 경우가 많다. 번들 크기가 크면 클라이언트가 다운로드하고 실행하는 데 비용이 많이든다. 번들 크기가 크면 UI가 그려지는 시간이 지연될 수 있다. ⇒ 의존성 트리는 번들 코드를 최적화하기 위한 디버깅에 유용하다.
