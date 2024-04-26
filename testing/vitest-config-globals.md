# vitest 글로벌 설정하기

글로벌 설정을 하지 않는 경우 테스트를 작성할 때마다 vitest에서 import하는 코드를 추가해야한다.

- vitest.config.ts 파일에 globals: true를 추가한다

```tsx
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		setupFiles: './src/setupTests.ts',
		environment: 'jsdom',
	},
});
```

- tsconfig.json 파일에 types를 추가한다

```json
"compilerOptions": {
//..
	"types": ["vitest/globals"],
```
