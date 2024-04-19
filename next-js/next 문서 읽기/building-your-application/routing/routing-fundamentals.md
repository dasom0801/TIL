# 라우팅 기초

https://nextjs.org/docs/app/building-your-application/routing

## 용어

- Tree: 계층을 시각화하기 위한 규칙, 부모와 자식 컴포넌트, 폴더 구조등
- Subtree: Tree의 일부분
- Root: tree나 subtree의 첫번째 노드
- Leaf: 하위 트리에 자식이 없는 노드
- URL Segment로: 슬래시로 구분되는 URL 경로의 일부
- URL Path: 도메인 뒤에 오는 URL의 한 부분 (Segment로 이루어짐)

## 앱 라우터

- React 서버 컴포넌트에 기반
- 공유 레이아웃, 중첩 라우팅, 로딩 상태, 에러 처리 등을 지원함
- 앱 라우터는 app 이라는 디렉토리에서 작동함
- 기본적으로 app 디렉토리에 있는 컴포넌트는 React Server Component지만 클라이언트 컴포넌트도 사용할 수 있다.

## 폴더와 파일 규칙

- 폴더
  - 라우트를 정의하는데 사용됨
  - 라우트는 중첩된 폴더의 단일 경로이다.
  - root folder부터 page.js파일이 포함된 leaf folder까지 파일 구조 시스템 계층을 따른다.
- 파일
  - 라우트 세그먼트에 표시되는 UI를 만드는 데 사용된다.

## 라우트 세그먼트

- 각 폴더는 라우트 세그먼트를 나타낸다
- 각 라우트 세그먼트는 URL 경로의 해당 세그먼트에 매핑된다.

## 중첩 라우트

- 중첩 라우트를 만들려면 폴더 내부에 중첩 폴더를 만들면 된다.

## 파일 컨벤션

- layout: 세그먼트와 자식에게 공유되는 UI
- page: 라우트의 고유한 UI, 공개적으로 접근 가능한 라우트를 만든다.
- loading: 세그먼트와 자식을 위한 로딩 UI
- not-found: 세그먼트와 자식을 위한 Not found UI
- error: 세그먼트와 자식을 위한 에러 UI
- global-error: 글로벌 에러 UI
- route: 서버 사이드 API endpoint
- template: 리렌더링되는 특수 레이아웃 UI
- default: Parallel Routes를 위한 폴백 UI

## 컴포넌트 계층

- 특수 파일로 정의된 컴포넌트는 특정 계층 구조로 렌더링된다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/895079b4-2856-49eb-945c-ec2f99bc3b31/7fa97499-61b5-4eb5-b8b1-440c0c5a0f2d/Untitled.png)

- 중첩 라우트에서 세그먼트의 컴포넌트는 부모 세그먼트의 컴포넌트 안에 중첩된다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/895079b4-2856-49eb-945c-ec2f99bc3b31/50077005-24a3-4817-b45b-db174f3d843a/Untitled.png)

## Colocation

- 특수 파일 외에도 app 폴더에 컴포넌트, 스타일, 테스트등 자체 파일을 배치할 수 있다.
- 폴더로 경로를 지정하지만, page.js나 route.js가 있는 폴더만 주소로 지정된다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/895079b4-2856-49eb-945c-ec2f99bc3b31/fe41f4b9-c30a-4a82-b043-c9d3c9888252/Untitled.png)

## 고급 라우팅 패턴

- Parallel Routes
  - 독립적으로 탐색할 수 있는 두 개 이상의 페이지를 동시에 보여줄 수 있다
  - 자체 하위 탐색이 있는 분할 화면에서 사용할 수 있다 (e.g. 대시보드)
- Intercepting Routes
  - 라우트를 가로채서 다른 경로에서 보여줄 수 있다
  - 현재 페이지의 컨텍스트를 유지할 때 사용할 수 있다
