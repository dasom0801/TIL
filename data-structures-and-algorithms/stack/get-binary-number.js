const { Stack2 } = require('./stack');

// 2진수 만들기
// 몫이 0이 될 때까지 2로 나눈다.
// 나머지는 스택에 추가한다.
// 순서대로 스택에서 꺼내서 2진수를 만든다.
const getBinaryNumber = (decNumber) => {
	const stack = new Stack2();
	let result = '';

	while (decNumber > 0) {
		stack.push(Math.floor(decNumber % 2));
		decNumber = Math.floor(decNumber / 2);
	}

	while (!stack.isEmpty()) {
		result += stack.pop();
	}
	return result;
};

console.log(getBinaryNumber(1));
console.log(getBinaryNumber(2));
console.log(getBinaryNumber(8));
console.log(getBinaryNumber(10));
console.log((10).toString(2)); // toString으로 2진수를 구할 수 있다.
