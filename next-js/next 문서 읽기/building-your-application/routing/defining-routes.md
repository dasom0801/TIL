# 경로 정의

https://nextjs.org/docs/app/building-your-application/routing/defining-routes

## 경로 만들기

- Next.js는 폴더로 경로를 정의하는 파일 시스템에 기반한 라우터를 사용한다.
- 각각의 폴더는 URL 세그먼트에 매핑되는 경로 세그먼트를 나타낸다.
- 중첩 경로를 만들기 위해서 각 폴더 안에 폴더를 중첩한다.
- `page.js` 파일은 경로 세그먼트가 공개적으로 접속 가능하게 만들어준다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/895079b4-2856-49eb-945c-ec2f99bc3b31/98b65cbb-8592-4a01-96d2-4a9bf309c82e/Untitled.png)

- 예제에서 `/dashboard/analytics` 경로는 `page.js` 파일이 없기 때문에 URL 주소에 접속할 수 없다.
  - 이 폴더에는 컴포넌트나, 스타일시트, 이미지 등의 파일을 보관할 수 있다.

## UI 만들기

- 특별한 파일 규칙을 사용하여 경로 세그먼트에 대한 UI를 만든다
- page: 특정한 경로에 대한 UI를 보여주기 위해 사용
- layout: 여러 경로에서 공유되는 UI를 표시
