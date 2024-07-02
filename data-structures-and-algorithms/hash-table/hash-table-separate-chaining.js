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
		const position = this.#loseloseHashCode(key);
		console.log(key, position);
		if (!this.#table[position]) {
			this.#table[position] = new LinkedList();
		}
		this.#table[position].append(new ValuePair(key, value));
	}

	// 키에 해당하는 원소를 찾아서 그 값을 반환
	get(key) {
		const position = this.#loseloseHashCode(key);
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
		const position = this.#loseloseHashCode(key);
		debugger;
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

	// 해시 함수
	// 키를 구성하는 문자의 아스키 값을 단순히 더한다.
	#loseloseHashCode(key) {
		const hash = key
			.split('')
			.reduce((acc, _, i) => acc + key.charCodeAt(i), 0);
		return hash % 37; // hash를 임의의 숫자로 나눈 나머지를 최종값으로 반환
	}
}

const hashTable = new HashTable();
hashTable.put('John', 'john@email.com');
hashTable.put('Tyrion', 'tyrion@email.com'); // 16: 충돌 발생
hashTable.put('Aaron', 'aaron@email.com'); // 16: 충돌 발생
hashTable.put('Donnie', 'donnie@email.com'); // 13: 충돌 발생
hashTable.put('Ana', 'ana@email.com'); // 13: 충돌 발생
console.log(hashTable.get('Donnie'));
console.log(hashTable.get('Ana'));
console.log(hashTable.get('John'));
console.log(hashTable.remove('Ana'));
console.log(hashTable.get('Ana'));
console.log(hashTable.remove('Ana'));
