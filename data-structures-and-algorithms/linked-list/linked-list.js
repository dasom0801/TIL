class Node {
	constructor(element) {
		this.element = element;
		this.next = null;
	}
}

class LinkedList {
	length = 0; // 연결 리스트에 담긴 원소의 개수
	head = null; // 연결이 시작되는 지점을 참조

	// 리스트의 맨 끝에 원소를 추가
	append(element) {
		const node = new Node(element);

		if (this.head === null) {
			// 리스트가 비어있는 경우
			this.head = node;
		} else {
			let current = this.head;

			// 마지막 원소를 발견할 때까지 계속 루프를 순환한다.
			// 마지막 원소의 next는 null(node를 만들 때 next는 null이기 때문에)
			while (current.next) {
				current = current.next;
			}

			// 새로 추가한 노드를 리스트에 연결할 수 있도록 현재 마지막 노드의 next에 할당한다.
			current.next = node;
		}
		this.length++; // 리스트의 크기를 업데이트 한다.
	}

	// 해당 위치에 있는 원소를 삭제
	removeAt(position) {
		// 범위 외의 값인지 확인
		if (position < 0 || position >= this.length) {
			return null;
		}

		let current = this.head;

		// 첫 번째 원소 삭제
		if (position === 0) {
			this.head = current.next;
		} else {
			let previous = null;
			for (let i = 0; i < position; i++) {
				previous = current;
				current = current.next;
			}
			// 이전 노드와 다음 노드를 연결 > current 노드는 연결이 끊어진다.
			previous.next = current.next;
			this.length--;
		}
		return current.element;
	}

	// 원소의 값으로 해당 원소를 삭제
	remove(element) {
		const index = this.indexOf(element);
		return this.removeAt(index);
	}

	// 해당 위치에 원소를 삽입
	insert(position, element) {
		// 범위 외의 값인지 확인
		if (position < 0 || position > this.length) {
			return false;
		}
		const node = new Node(element);
		let current = this.head;

		// 첫 번째 위치에 추가
		if (position === 0) {
			node.next = this.head;
			this.head = node;
		} else {
			let previous;
			for (let i = 0; i < position; i++) {
				previous = current;
				current = previous.next;
			}
			// previous와 current를 새로 삽입할 node와 연결한다.
			previous.next = node;
			node.next = current;
		}
		this.length++;
		return true;
	}

	// 원소값을 인자로 받아 해당 원소의 인덱스를 반환, 없으면 -1을 반환
	indexOf(element) {
		let current = this.head;
		let index = 0;
		while (current) {
			if (current.element === element) {
				return index;
			}
			index++;
			current = current.next;
		}
		return -1;
	}

	// LinkedList를 문자열로 반환
	toString() {
		let current = this.head;
		const elements = [];
		while (current) {
			elements.push(current.element);
			current = current.next;
		}
		return elements.join();
	}

	print() {
		console.log(this.toString());
	}

	isEmpty() {
		return this.length === 0;
	}

	size() {
		return this.length;
	}

	getHead() {
		return this.head;
	}
}

// const list = new LinkedList();
// console.log('isEmpty', list.isEmpty());
// list.append(15);
// list.append(10);
// list.append(5);
// list.append(0);
// list.print();
// console.log(list.removeAt(3));
// list.print();
// list.insert(3, 1);
// list.print();
// console.log(list.indexOf(0));
// console.log(list.indexOf(10));
// list.remove(15);
// list.print();
// console.log('isEmpty', list.isEmpty());
// console.log('size', list.size());
// console.log('head', list.getHead());

module.exports = {
	LinkedList,
};
