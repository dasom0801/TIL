# 이미지 지연 로딩

```tsx
<img src='/img/image.png' alt='Sample image' loading='lazy' />
```

- 초기에 페이지를 로드할 때 즉시 이미지가 로드되지 않도록 한다.
- 이미지가 필요할 때까지 이미지 로딩을 지연시켜서 성능을 최적화 한다.
- `loading="lazy"` 를 추가하면 브라우저가 리소스 할당 및 로딩 우선 순위를 최적화할 수 있다.
- 이미지 지연 로딩중에 요소 이동 방지하기
  - 이미지가 나중에 로딩되면 브라우저는 이미지의 크기와 스타일에 맞게 위치를 업데이트하게 된다.
  - 리플로우를 방지하려면 이미지에 width, height 를 명시적으로 지정한다.
- `loading="eager"` 는 기본 값. 이미지 요소가 처리되는 즉시 이미지를 로드하도록 한다.

참고:

https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/loading
