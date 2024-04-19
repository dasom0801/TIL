# 페이지와 레이아웃

https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts

layout.js, page.js, template.js는 경로를 위한 UI를 만들수 있도록 한다.

## 페이지

- 페이지는 경로의 고유한 UI
- page.js 파일에서 컴포넌트를 export default하는 것으로 페이지를 정의한다
- 인덱스 페이지를 만드려면 app 디렉토리에 page.js 파일을 추가한다

```tsx
// app/page.tsx 는 URL '/' 를 위한 UI
export default function Page() {
	return <h1>Hello, Home Page!</h1>;
}
```

- 추가 페이지를 만들려면 새 폴더를 만들고 그 안에 page.js 파일을 추가한다.

```tsx
// app/dashboard/page.tsx 는 URL '/dashboard'를 위한 UI
export default function Page() {
	return <h1>Hello, Dashboard Page!</h1>;
}
```

- 경로 세그먼트에 공개적으로 접근할 수 있도록 하기 위해 page.js 파일이 필수
- 페이지는 기본적으로 server component이지만 client component로 만들 수 있다
- 페이지는 데이터를 가져올 수 있음

## 레이아웃

- 레이아웃은 여러 경로에서 공유되는 UI
- 탐색에서 레이아웃은 상태를 보존하고 대화형 상태를 유지하며 다시 렌더링하지 않는다
- 레이아웃은 중첩될 수 있다.
- layout.js 파일에서 컴포넌트를 export default하는 것으로 페이지를 정의한다.
- 레이아웃 컴포넌트는 children(자식 레이아웃이나 렌더링 중에 화면에 채워질 페이지)을 prop으로 받아야 한다.
- /dashboard와 /dashboard/settings 페이지와 공유되는 레이아웃 예제

  ```tsx
  // /app/dashboard/layout.js
  export default function DashboardLayout({
  	children, //페이지나 중첩된 레이아웃
  }: children: React.ReactNode) {
  	return (
  		<section>
  			{/* 공유되는 UI를 여기에 포함한다. 예) 헤더, 사이드바 */}
  		</section>
  	)
  }
  ```

### Root Layout (필수)

- root layout은 app 디렉토리 최상위 레벨에 정의되어 모든 경로에 적용된다.
- root layout은 필수이며 서버에서 반환된 초기 HTML을 수정할 수 있도록 HTML 및 본문 태그를 포함해야 한다.

```tsx
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				{/* Layout UI */}
				<main>{children}</main>
			</body>
		</html>
	);
}
```

### 중첩 레이아웃

- 기본적으로 폴더 계층구조에서 레이아웃은 중첩되어 있고, children을 통해서 자식 레이아웃을 감싼다.
- 특정 경로 세그먼트(폴더)에 layout.js 파일을 추가하는 것으로 중첩 레이아웃을 만들 수 있다.
- 중첩 레이아웃
  - root layout(app/layout.js)는 dashboard layout(app/dashboard/layout.js)을 감싼다.

**참고**

- 오직 root layout만 <html>과 <body> 태그를 포함할 수 있다.
- layout.js와 page.js가 같은 폴더에 있으면 레이아웃이 페이지를 감싼다.
- 기본적으로 레이아웃은 server component이지만 client component로 만들 수 있다.
- 레이아웃은 데이터를 가져올 수 있음
- 부모 레이아웃과 자식 레이아웃 사이에 데이터를 주고 받는 건 안된다. 하지만 같은 경로에서 동일한 데이터를 두 번 이상 가져올 수 있어며, 리액트는 성능에 영향을 주지 않고 요청을 자동으로 중복 제거한다.
- 레이아웃은 아래 경로의 세그먼트에 접근할 수 없다. 모든 경로 세그먼트에 접근하려면 client component에useSElectedLayoutSegment나 useSelectedLayoutSegment를 사용할 수 있다.
- Route Group을 사용하여 공유 레이아웃 안팎에서 특정 경로 세그먼트를 선택할 수 있다.
- Route Group을 사용하여 여러개의 root layout을 만들 수 있다.
- pages 디렉토리에서 마이그레이션: \_app.js와 \_document.js 파일을 root layout으로 대체할 수 있다.

## 템플릿

- 템플릿은 자식 레이아웃 또는 페이지를 감싼다는 점에서 레이아웃이랑 유사하다.
- 경로 전체에 걸쳐 상태를 유지하는 레이아웃과 달리 템플릿은 탐색 시 각 하위 항목에 대해 새로운 인스턴스를 생성한다.
- 사용자가 템플릿을 공유하는 경로 사이를 탐색할 때 컴포넌트의 새 인스턴스가 마운트 되고, DOM 요소가 다시 생성되고, state가 보존되지 않으며, effect가 다시 동기화된다.
- 템플릿을 사용하는 경우
  - useEffect(예: 페이지 조회 수 기록) 와 useState(예: 페이지별 피드백 form)에 의존하는 기능
  - 기본 프레임워크 동작을 바꿔야 할 때. 레이아웃 내부의 서스펜스 바운더리는 레이아웃이 처음 로드되었을 때만 보여주고 페이지가 바뀔 때는 보여주지 않는데 템플릿을 사용하면 탐색을 할 때마다 폴백이 표시된다.
- template.js 파일에서 컴포넌트를 export default하는 것으로 페이지를 정의한다.
- 컴포넌트는 children prop을 받아야한다.
  ```tsx
  export default function Template({
  	children,
  }: {
  	children: React.ReactNode;
  }) {
  	return <div>{children}</div>;
  }
  ```
- 중첩 관점에서 template.js는 레이아웃과 그 자식 사이에 렌더된다.
  ```tsx
  <Layout>
    {/* 템플릿에는 고유 키가 부여된다.*/}
  	<Template key={routeParams}>
  		{children}
  	</Temlate>
  </Layout>
  ```

## 메타데이터

- app 디렉토리에서 Metadata API를 사용하여 <title>과 <meta> 같은 <head> HTML 엘리먼트를 수정할 수 있다.
- Metadata는 layout.js나 page.js 파일에서 metadata object나 generateMetadata 함수를 export해서 정의할 수 있다.

  ```tsx
  // app.page.tsx

  import { Metadata } from 'next';

  export const meatadata: Metadata = {
  	title: 'Next.js',
  };

  export default function Page() {
  	return '...';
  }
  ```

**참고**

- root layout에 <title>과 <meta> 같은 <head> 태그를 수동으로 추가해서는 안 된다.
- <head> 요소의 스트리밍 및 중복 제거와 같은 요구 사항을 자동으로 처리하는 Metadata API를 사용해야 한다.
