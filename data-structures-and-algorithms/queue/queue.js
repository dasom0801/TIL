class Queue {
	constructor() {
		this.items = [];
	}

	// 큐의 뒤쪽에 원소를 추가
	enqueue(element) {
		this.items.push(element);
	}

	// 큐의 첫 번째 원소를 반환 & 큐에서 삭제
	dequeue() {
		return this.items.shift();
	}

	// 큐의 첫 번째 원소를 반환 (참조 용도)
	front() {
		return this.items[0];
	}

	// 큐가 비어있는지 여부
	isEmpty() {
		return this.items.length === 0;
	}

	// 큐의 원소 개수 반환
	size() {
		return this.items.length;
	}

	print() {
		console.log(this.items.toString());
	}
}

// const queue = new Queue();
// console.log('is empty?', queue.isEmpty());
// queue.enqueue(1);
// queue.enqueue(2);
// queue.enqueue(3);
// queue.print();
// console.log('size', queue.size());
// console.log('front', queue.front());
// queue.dequeue();
// queue.dequeue();
// console.log('size', queue.size());
// console.log('front', queue.front());
// queue.print();
// console.log('is empty?', queue.isEmpty());
module.exports = {
	Queue,
};
