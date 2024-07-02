const { djb2HashCode } = require('./hash-functions');
const { LinkedList } = require('../linked-list/linked-list');

// key, value를 저장하는 역할
class ValuePair {
	constructor(key, value) {
		this.key = key;
		this.value = value;
	}
}

// 체이닝을 통해서 충돌을 해결하는 해시 테이블
class HashTable {
	#table = [];

	// 원소를 추가
	put(key, value) {
		const position = djb2HashCode(key);
		if (!this.#table[position]) {
			this.#table[position] = new LinkedList();
		}
		this.#table[position].append(new ValuePair(key, value));
	}

	// 키에 해당하는 원소를 찾아서 그 값을 반환
	get(key) {
		const position = djb2HashCode(key);
		if (!this.#table[position]) {
			return undefined;
		}
		let current = this.#table[position].getHead();
		do {
			if (current.element.key === key) {
				return current.element.value;
			}
			current = current.next;
		} while (current);

		return undefined;
	}

	// 키에 대한 원소를 찾아 삭제
	remove(key) {
		const position = djb2HashCode(key);
		if (!this.#table[position]) {
			return false;
		}
		let current = this.#table[position].getHead();
		do {
			if (current.element.key === key) {
				this.#table[position].remove(current.element);
				if (this.#table[position].isEmpty()) {
					this.#table[position] = undefined;
				}
				return true;
			}
			current = current.next;
		} while (current);

		return false;
	}
}

const hashTable = new HashTable();
hashTable.put('John', 'john@email.com');
hashTable.put('Tyrion', 'tyrion@email.com');
hashTable.put('Aaron', 'aaron@email.com');
hashTable.put('Donnie', 'donnie@email.com');
hashTable.put('Ana', 'ana@email.com');
console.log(hashTable.get('Donnie'));
console.log(hashTable.get('Ana'));
console.log(hashTable.get('John'));
console.log(hashTable.remove('Ana'));
console.log(hashTable.get('Ana'));
console.log(hashTable.remove('Ana'));
