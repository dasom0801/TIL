# Project Structure

https://nextjs.org/docs/getting-started/project-structure

## Top-level folders

최상위 폴더는 애플리케이션의 코드와 정적 에셋을 정리하는데 사용된다.

- `app` : App Router
- `pages` : Pages Router
- `public` : 제공되어야 하는 정적 에셋
- `src` : 선택적인 애플리케이션 소스 폴더

---

## Top-level files

최상위 파일들은 애플리케이션 구성, 종속성 관리, 미들웨어 실행, 모니터링 도구 통합, 환경 변수 정의에 사용된다.

- `next.config.js` : Next.js 구성을 위한 파일
- `package.json` : 프로젝트 종속성과 스크립트
- `instrumentation.ts` : OpenTelemetry 와 Instrumentation 파일
- `middleware.ts` : Next.js 요청 미들웨어
- `.env` : 환경 변수
- `.env.local` : 로컬 환경 변수
- `.env.production` : 프로덕션 환경 변수
- `.env.development` : 개발 환경 변수
- `.eslintrc.json` : ESLint 구성 파일
- `next-env.d.ts` : Next.js용 타입스크립트 선언 파일
- `tsconfig.json` : TypeScript 구성 파일
- `jsconfig.json` : JavaScript 구성 파일

## app Routing Conventions

App router의 경로를 정의하고 메타데이터를 처리하기 위한 파일 규칙

### Routing Files

- layout: 레이아웃
- page: 페이지
- loading: 로딩 UI
- not-found: Not found UI
- error: 에러 UI
- global-error: 글로벌 에러 UI
- route: API endpoint
- template: 리렌더된 레이아웃
- default: Parallel route의 폴백 페이지

### Nested Routes

- folder: 라우트 세그먼트
- folder/folder: 중첩된 라우트 세그먼트

### Dynamic Routes

- [folder]: 동적 라우트 세그먼트
- […folder]: Catch-all route segment
- \[[…folder]]: Optional catch-all route segment

### Route Groups and Private Folders

- (folder): 라우팅에 영향을 주지 않는 라우트 그룹
- \_folder: 폴더와 하위 세그먼트가 라우팅에서 제외됨

### Parallel and Intercepted Routes

- @folder: Named slot
- (.)folder: Intercept same level
- (..)folder: Intercept one level above
- (..)(..)folder: Intercept two levels above
- (…)folder: intercept from root

### Metadata File Conventions

**App Icons**

- favicon
- icon: 앱 아이콘 파일
- icon (js, ts, tsx): 생성된 앱 아이콘
- apple-icon: 애플 앱 아이콘 파일
- apple-icon (js, ts, tsx): 생성된 애플 앱 아이콘

**Open Graph and Twitter Images**

- opengraph-image: Open Graph 이미지 파일
- opengraph-image(js, ts, tsx): 생성된 Open Graph 이미지
- twitter-image: 트위터 이미지 파일
- twitter-image (js, ts, tsx): 생성된 twitter 이미지

**SEO**

- sitemap(xml): 사이트맵 파일
- sitemap(js, ts): 생성된 사이트맵
- robots(txt): Robots 파일
- robots(js, ts): 생성된 Robots 파일

### pages Routing Conventions

Pages router의 경로를 정의하기 위한 파일 규칙

**Special Files**

- \_app: 커스텀 앱
- \_document: 커스텀 Document
- \_error: 커스텀 Error 페이지
- 404: 404 Error Page
- 500: 500 Error Page

**Routes**

Folder

- index: Home 페이지
- folder/index: 중첩 페이지

File

- index: Home 페이지
- file: 중첩 페이지

**Dynamic Routes**

folder

- [folder]/index: 동적 라우트 세그먼트
- […folder]/index: Catch-all route segment
- \[[…folder]]/index: Optional catch-all route segment

file

- [file]: 동적 라우트 세그먼트
- […file]: Catch-all route segment
- \[[…file]]: Optional catch-all route segment
