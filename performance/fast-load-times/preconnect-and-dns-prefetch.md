# preconnect와 dns-prefetch

https://web.dev/articles/preconnect-and-dns-prefetch?hl=ko

브라우저가 서버에 리소스를 요청하기 위한 연결 설정 프로세스

- 도메인 이름을 조회하여 IP 주소 확인
- 서버에 대한 연결성 설정
- 보안을 위해 연결을 암호화

연결 설정 각 단계에서 브라우저는 서버로 데이터를 보내고 서버는 응답을 반환한다. (Round Trip)

⇒ 이 과정을 미리 처리하면 애플리케이션이 훨씬 빠르게 느껴진다.

## rel=preconnect와 초기 연결 설정

```html
<link rel="preconnect" href="https://example.com" />
```

- `<link>` 에 `rel=preconnect` 를 추가
- 페이지에서 다른 도메인과의 연결을 설정하려고 하며 프로세스를 최대한 빨리 시작하고 싶다고 브라우저에 알림
- 브라우저가 리소스를 요청할 때 설정 프로세스가 이미 완료된 상태이기 때문에 리소스를 빨리 로드할 수 있다
- 연결을 설정하고 열어두는 것은 많은 작업이 필요하기 때문에 브라우저는 상황에 따라서 리소스 힌트를 무시하거나 부분적으로 실행할 수 있다.

## rel=preconnect의 사용 사례

### 어디서 가져오는지는 알지만 무엇을 가져오는지는 모르는 경우

특정 CDN에서 리소스를 요청하지만 정확한 경로를 알지 못하는 상황

- 예: https://cdn.example.com/script.**db265f32**.chunk.js

이미지 CDN에서 이미지를 로드하는 경우

- 예: https://cdn.example.com/**snoopy.jpg?size=300x400**

⇒ 페이지에서 파일을 요청할 때까지 파일을 다운로드하지는 않지만 적어도 연결은 미리 처리할 수 있다.

### 스트리밍 미디어

- 페이지에서 스트리밍 콘텐츠를 처리하는 방식에 따라 스크립트가 로드되고 스트리밍을 처리할 준비가 될 때까지 기다릴 수 있음
- 사전에 연결해두면 시작할 준비가 되었을 때 대기 시간을 왕복 한 번으로 줄일 수 있다.

## rel=preconnect를 구현하는 방법

- `<head>` 에 `<link>` 태그를 추가
  ```html
  <head>
  	<link rel="preconnect" href="https://example.com" />
  </head>
  ```
- preconnect는 origin domain이 아닌 다른 도메인에만 유효하다.
- 브라우저는 10초 이내에 사용되지 않는 연결은 닫히므로 곧 사용할 중요한 도메인에만 미리 연결할 것
- 불필요한 사전 연결은 다른 리소스를 지연시킬 수 있다. 사전 연결되는 도메인 수를 제한하자
- 일부 유형의 리소스는 익명 모드로 로드된다. ⇒ preconnect와 함께 crossorigin 설정을 해야한다.

```html
<link rel="preconnect" href="https://example.com/ComicSans" crossorigin />
```

- crossorigin 속성을 생략하면 브라우저는 DNS 조회만 수행한다.

## rel=dns-prefetch를 사용하여 도메인 이름 조기 확인

- 브라우저는 DNS를 사용하여 사이트 이름을 IP 주소로 변환한다. (연결 설정 프로세스의 첫 번째 단계)
- 페이지가 여러 타사 도메인에 연결해야 하는 경우 모든 도메인을 미리 연결하는 것은 비생산적
  ⇒ 가장 중요한 연결에만 `preconnect`를 사용하는 것이 좋다!
- 나머지는 `<link rel=dns-prefetch>` 를 사용하여 첫 번째 단계인 DNS 조회 단계를 절약하자
  ⇒ 약 20-120ms 정도 시간 절약

```html
<link rel="dns-prefetch" href="http://example.com" />
```

## LCP에 미치는 영향

- dns-prefetch와 preconnect 를 사용하면 다른 오리진에 연결하는 데 걸리는 시간을 줄일 수 있다. ⇒ 다른 출처에서 리소스를 로드하는 데 걸리는 시간을 최대한 줄이는 것이 목표
- fetchpriority 를 high로 설정하고 브라우저에 이 에셋의 중요성을 알려서 해당 에셋을 조기에 가져올 수 있도록 하여 더욱 개선할 수 있다.
- LCP 에셋을 즉시 검색할 수 없는 경우, fetchpriority 를 high로 설정한 preload 링크를 사용하면 브라우저에서 리소스를 최대한 빨리 로드할 수 있다.

## 결론

- dns-prefetch와 preconnet는 무언가를 다운로드할 예정이지만 리소스의 정확한 URL을 모르는 경우 페이지 속도를 개선하는 데 유용하다.
- 제약 조건을 염두에 두고 가장 중요한 리소스에만 preconnect를 사용하고, 나머지는 dns-prefetch를 사용한 다음 실제 환경에서 영향을 측정하라
