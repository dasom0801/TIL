class Node {
	constructor(element) {
		this.element = element;
		this.next = null;
		this.prev = null;
	}
}

class DoublyLinkedList {
	length = 0;
	head = null;
	tail = null;

	append(element) {
		const node = new Node(element);
		if (this.head === null) {
			this.head = node;
			this.tail = node;
		} else {
			this.tail.next = node;
			node.prev = this.tail;
			this.tail = node;
		}
		this.length++;
	}

	// 해당 위치에 원소 삽입
	insert(position, element) {
		const node = new Node(element);

		if (position < 0 || position > this.length) {
			return false;
		}

		// 첫 번째 위치에 추가
		if (position === 0) {
			if (this.head) {
				this.head.prev = node;
				node.next = this.head;
				this.head = node;
			} else {
				this.head = node;
				this.tail = node;
			}
		} else if (position === this.length) {
			// 마지막 위치에 추가
			node.prev = this.tail;
			this.tail.next = node;
			this.tail = node;
		} else {
			let current = this.head;
			let previous = null;

			for (let i = 0; i < position; i++) {
				previous = current;
				current = previous.next;
			}
			node.next = current;
			current.prev = node;
			node.prev = previous;
			previous.next = node;
		}

		this.length++;
		return true;
	}

	removeAt(position) {
		if (position < 0 || position >= this.length) {
			return null;
		}
		let current = null;
		// 첫번째 원소 삭제
		if (position === 0) {
			current = this.head;
			this.head = current.next;
			if (this.length === 1) {
				// 원소가 하나뿐인 경우 this.head는 위에서 이미 null이 되었음
				// tail만 업데이트 해준다.
				this.tail = null;
			} else {
				this.head.prev = null;
			}
		} else if (position === this.length - 1) {
			// 마지막 원소 삭제
			current = this.tail;
			this.tail = current.prev;
			this.tail.next = null;
		} else {
			current = this.head;
			let previous = null;
			for (let i = 0; i < position; i++) {
				previous = current;
				current = current.next;
			}
			previous.next = current.next;
			current.next.prev = previous;
		}
		this.length--;
		return current.element;
	}

	toString() {
		let current = this.head;
		const elements = [];
		while (current) {
			elements.push(current.element);
			current = current.next;
		}
		return elements.join(', ');
	}

	print() {
		console.log(this.toString());
	}

	getHead() {
		return this.head;
	}

	getTail() {
		return this.tail;
	}
}

const list = new DoublyLinkedList();
list.append(1);
list.append(2);
list.insert(1, 1.5);
list.append(3);
list.print();
list.removeAt(2);
list.removeAt(1);
list.print();
console.log('head', list.getHead().element);
console.log('tail', list.getTail().element);
