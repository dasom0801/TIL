function Stack1() {
	// 스택의 원소를 담아둔다.
	let items = [];

	// 스택 꼭대기에 새원소를 추가
	this.push = function (element) {
		items.push(element);
	};

	// 스택 꼭대기에 있는 원소를 반환 & 해당 원소 삭제
	this.pop = function () {
		return items.pop();
	};

	// 스택 꼭대기에 있는 원소를 반환 & 원소 삭제 X (스택 참조 용도)
	this.peek = function () {
		return items[items.length - 1];
	};

	// 스택이 비었는지 확인.
	// 원소가 하나도 없으면 true, 스택의 크기가 0보다 크면 false;
	this.isEmpty = function () {
		return items.length === 0;
	};

	// 스택의 원소 개수를 반환
	this.size = function () {
		return items.length;
	};

	// 스택의 모든 원소를 삭제
	this.clear = function () {
		items = [];
	};

	// 스택에 쌓인 내용을 콘솔에서 확인
	this.print = function () {
		console.log(items.toString());
	};
}

class Stack2 {
	constructor() {
		this.items = [];
	}

	// 스택 꼭대기에 새원소를 추가
	push(element) {
		this.items.push(element);
	}

	// 스택 꼭대기에 있는 원소를 반환 & 해당 원소 삭제
	pop() {
		return this.items.pop();
	}

	// 스택 꼭대기에 있는 원소를 반환 & 원소 삭제 X (스택 참조 용도)
	peek() {
		return this.items[this.items.length - 1];
	}

	// 스택이 비었는지 확인.
	// 원소가 하나도 없으면 true, 스택의 크기가 0보다 크면 false;
	isEmpty() {
		return this.items.length === 0;
	}

	// 스택의 원소 개수를 반환
	size() {
		return this.items.length;
	}

	// 스택의 모든 원소를 삭제
	clear() {
		this.items = [];
	}

	// 스택에 쌓인 내용을 콘솔에서 확인
	print() {
		console.log(this.items.toString());
	}
}

function test(stack) {
	stack.push(1);
	stack.push(2);
	stack.push(3);
	stack.print();
	console.log('peek', stack.peek());
	console.log('size', stack.size());
	console.log('pop', stack.pop());
	stack.print();
	stack.clear();
	console.log('size', stack.size());
}

// const stack1 = new Stack1();
// const stack2 = new Stack2();
// test(stack1);
// test(stack2);

module.exports = { Stack2 };
