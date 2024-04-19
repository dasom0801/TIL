# Introduction

https://nextjs.org/docs

## What is Next.js?

- Next.js는 full-stack 웹 애플리케이션을 만들기 위한 React framework이다.
- Next.js는 번들링, 컴파일 등과 같이 React에 필요한 툴링을 추상화하고 자동으로 구성하기 때문에 설정에 들이는 시간을 줄이고 개발에 집중하게 해준다.

## Main Features

**Routing**

- 파일 시스템 기반 라우터
- 레이아웃, 중첩 라우팅, 로딩 상태, 오류 처리 등을 지원

**Rendering**

- 클라이언트와 서버 컴포넌트를 사용하여 클라이언트 사이드 렌더링과 서버 사이드 렌더링
- 서버의 정적 렌더링과 동적 렌더링을 최적화
- Edge와 Node.js 런타임에서의 스트리밍

**Data Fetching**

- 서버 컴포넌트에서 async/await 를 통해 데이터 fetching을 간소화
- 리퀘스트 메모이제이션, 데이터 캐싱, realidation을 위한 확장된 fetch API

**Styling**

- CSS Modules, Tailwind Css, CSS-in-JS 등 스타일링 방식 지원

**Optimizations**

- Core Web Vitals와 사용자 경험을 향상시키기 위 하 Iage, Font, Script의 최적화

**Typescript**

- Typescript를 위한 지원 개선

## App Router vs Pages Router

- **App Router**는 서버 컴포넌트와 스트리밍 같은 React의 최신 기술을 사용할 수 있는 최신 라우터
- **Pages Router**는 서버 렌터링된 React 애플리케이션을 빌드할 수 있게 해주는 오리지널 Next.js 라우터.
