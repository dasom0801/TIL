// enqueue 할 때 우선순위에 따라서 요소를 추가하는 방법
// 숫자가 낮으면 우선순위가 높다고 판단한다.
class QueueElement {
	constructor(element, priority) {
		this.element = element;
		this.priority = priority;
	}
}

class PriorityQueue {
	constructor() {
		this.items = [];
	}

	enqueue(element, priority) {
		const queueElement = new QueueElement(element, priority);
		if (this.isEmpty()) {
			this.items.push(queueElement);
		} else {
			// priority 값이 더 큰(=우선순위가 낮음) 요소의 index를 찾는다.
			const index = this.items.findIndex(
				(item) => item.priority > queueElement.priority
			);
			if (index !== -1) {
				this.items.splice(index, 0, queueElement);
			} else {
				this.items.push(queueElement);
			}
		}
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
		console.log(
			this.items.map((item) => `${item.element}(${item.priority})`).toString()
		);
	}
}

const priorityQueue = new PriorityQueue();
priorityQueue.enqueue('우선순위 3-1', 3);
priorityQueue.enqueue('우선순위 1-1', 1);
priorityQueue.enqueue('우선순위 3-2', 3);
priorityQueue.enqueue('우선순위 1-2', 1);
priorityQueue.enqueue('우선순위 2-1', 2);
priorityQueue.enqueue('우선순위 1-3', 1);
priorityQueue.print();
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
