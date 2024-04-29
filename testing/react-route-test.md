# React 주소 이동 테스트

### 1. `useNavigate`를 사용한 경우

스파이 함수가 원하는 값으로 호출 되었는지를 확인하는 테스트 방법

```jsx
const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
	const original = await vi.importActual('react-router-dom');
	return {
		...original,
		useNavigate: () => navigateFn,
	};
});

it('버튼을 클릭하면 "/home 경로로 navigate 함수가 호출된다."', async () => {
	// ... 중략
	await user.click(Button);
	expect(navigateFn).toHaveBeenNthCalledWith(1, '/home');
});
```

### 2. `<Link />` 를 사용한 경우

테스트 환경에서 가상의 라우트를 선언하고 해당 라우트의 텍스트가 화면에 표시되는지 확인하는 방법

```jsx
import { render } from '@testing-library/react';
it('링크를 누르면 /list 경로로 이동한다.', async () => {
	// 테스트하려는 컴포넌트와 이동하려는 컴포넌트를 Router와 함께 그려준다.
	// 주소가 이동한 것을 테스트 하는 게 목적이기 때문에 반드시 이동 경로의 컴포넌트를 그려줄 필요는 없다.

	render(
		<MemoryRouter initialEntries="['/']">
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/list' element={<h1>List page</h1>} />
			</Routes>
		</MemoryRouter>
	);

	const Link = await screen.findByRole('link', { name: '링크' });
	await user.click(Link);

	// 링크를 클릭해서 주소가 변경되었으면 /list 경로의 내용이 화면에 그려져야한다.
	const Title = screen.getByRole('heading', {
		name: 'List Page',
	});
	expect(Title).toBeInTheDocument();
});
```
