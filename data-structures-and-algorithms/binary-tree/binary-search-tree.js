class Node {
	constructor(key) {
		this.key = key;
		this.left = null;
		this.right = null;
	}
}

class BinarySearchTree {
	#root = null;

	// 트리의 최소 값/키를 반환한다.
	get min() {
		let node = this.#root;
		while (node?.left) {
			node = node.left;
		}
		return node?.key;
	}

	// 트리의 최대 값/키를 반환한다.
	get max() {
		let node = this.#root;
		while (node?.right) {
			node = node.right;
		}
		return node?.key;
	}

	// 새 키를 삽입한다.
	insert(key) {
		const newNode = new Node(key);
		if (!this.#root) {
			this.#root = newNode;
			return;
		}
		this.#insertNode(this.#root, newNode);
	}

	// 새로운 노드를 추가할 위치를 찾는 함수
	#insertNode(node, newNode) {
		// 새로운 노드가 현재 노드보다 작으면 왼쪽에 위치해야한다.
		if (newNode.key < node.key) {
			// 현재 노드에 자식이 있다면 insertNode를 다시 호출한다.
			if (node.left) {
				// 현재 노드의 왼쪽 자식과 비교한다.
				this.#insertNode(node.left, newNode);
			} else {
				// 현재 노드에 자식이 없다면 새로운 노드를 넣어준다.
				node.left = newNode;
			}
			// 새로운 노드가 현재 노드보다 크면 오른쪽에 위치해야한다.
		} else {
			// 현재 노드에 자식이 있다면 insertNode를 다시 호출한다.
			if (node.right) {
				// 현재 노드의 오른쪽 자식과 비교한다.
				this.#insertNode(node.right, newNode);
			} else {
				// 현재 노드에 자식이 없다면 새로운 노드를 넣어준다.
				node.right = newNode;
			}
		}
	}

	// 해당 키를 가진 노드가 존재하는지 여부 판단
	search(key, node = this.#root) {
		if (!node) {
			return false;
		}

		if (key === node.key) {
			return true;
		}

		// 작으면 왼쪽
		if (key < node.key) {
			return this.search(key, node.left);
		} else {
			return this.search(key, node.right);
		}
	}

	// 중위 순회 방식으로 트리의 전체 노드를 방문 (오름차순 방문)
	inOrderTraverse(callback) {
		this.#inOrderTraverseNode(this.#root, callback);
	}

	#inOrderTraverseNode(node, callback) {
		if (!node) {
			return;
		}
		this.#inOrderTraverseNode(node.left, callback);
		callback(node.key);
		this.#inOrderTraverseNode(node.right, callback);
	}

	// 전위 순회 방식으로 트리 전체 노드를 방문 (자기 자신을 먼저 방문하고 자식을 방문)
	preOrderTraverse(callback) {
		this.#preOrderTraverseNode(this.#root, callback);
	}

	#preOrderTraverseNode(node, callback) {
		if (!node) {
			return;
		}
		callback(node.key);
		this.#preOrderTraverseNode(node.left, callback);
		this.#preOrderTraverseNode(node.right, callback);
	}

	// 후위 순회 방식으로 트리 전체 노드를 방문
	postOrderTraverse(callback) {
		this.#postOrderTraverseNode(this.#root, callback);
	}

	#postOrderTraverseNode(node, callback) {
		if (!node) {
			return;
		}
		this.#postOrderTraverseNode(node.left, callback);
		this.#postOrderTraverseNode(node.right, callback);
		callback(node.key);
	}

	// 키를 삭제한다.
	remove(key) {
		this.#root = this.#removeNode(this.#root, key);
	}

	#removeNode(node, key) {
		if (!node) {
			return null;
		}

		if (key === node.key) {
			// 리프 노드인 경우
			if (!node.left && !node.right) {
				node = null;
				return node;
			}

			// 자식이 하나인 경우
			if (!node.left) {
				node = node.right;
				return node;
			}

			if (!node.right) {
				node = node.left;
				return node;
			}

			// 자식이 둘인 경우
			const aux = this.#findMinNode(node.right); // 우측 서브트리에서 최소 값을 찾는다.
			node.key = aux.key; // 위에서 찾은 최소 노드로 바꿔준다. key가 바뀌면서 node가 트리에서 제거된다.
			node.right = this.#removeNode(node.right, aux.key); // 서브트리에서 동일한 키를 가진 노드를 제거해준다. (위에서 찾은 aux가 아직 서브트리에 존재한다.)
			return node;
		}

		if (key < node.key) {
			node.left = this.#removeNode(node.left, key);
			return node;
		} else {
			node.right = this.#removeNode(node.right, key);
			return node;
		}
	}

	#findMinNode(node) {
		while (node?.left) {
			node = node.left;
		}
		return node;
	}
}

const tree = new BinarySearchTree();
console.log('min', tree.min);
console.log('max', tree.max);
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(13);
tree.insert(20);
console.log('min', tree.min);
console.log('max', tree.max);
console.log('search 15', tree.search(15));
console.log('remove 15');
tree.remove(15);
console.log('search 15', tree.search(15));
console.log('in order traverse');
tree.inOrderTraverse(console.log);
console.log('pre order traverse');
tree.preOrderTraverse(console.log);
console.log('post order traverse');
tree.postOrderTraverse(console.log);
