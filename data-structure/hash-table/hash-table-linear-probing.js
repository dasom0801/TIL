const { djb2HashCode } = require('./hash-functions');

// key, value를 저장하는 역할
class ValuePair {
	constructor(key, value) {
		this.key = key;
		this.value = value;
	}
}

// 선형 탐사를 통해서 충돌을 해결하는 해시 테이블
class HashTable {
	#table = [];

	// 원소를 추가
	put(key, value) {
		let position = djb2HashCode(key);
		// 해당 위치에 이미 다른 원소가 있는 상태라면 비어있는 위치를 찾을 때까지 숫자를 올려간다.
		if (this.#table[position]) {
			while (this.#table[position]) {
				position++;
			}
		}
		this.#table[position] = new ValuePair(key, value);
	}

	// 키에 해당하는 원소를 찾아서 그 값을 반환
	get(key) {
		let position = djb2HashCode(key);
		while (this.#table[position]) {
			if (this.#table[position].key === key) {
				return this.#table[position].value;
			}
			position++;
		}
		return undefined;
	}

	// 키에 대한 원소를 찾아 삭제
	remove(key) {
		let position = djb2HashCode(key);
		while (this.#table[position]) {
			if (this.#table[position].key === key) {
				this.#table[position] = undefined;
				return true;
			}
			position++;
		}
		return false;
	}

	print() {
		this.#table.forEach((v, i) => v && console.log(i, ':', v));
	}
}

const hashTable = new HashTable();
hashTable.put('Jonathan', 'jonathan@email.com');
hashTable.put('Jamie', 'jamie@email.com');
hashTable.put('Sue', 'sue@email.com');
hashTable.put('Tyrion', 'tyrion@email.com');
hashTable.put('Aaron', 'aaron@email.com');
hashTable.put('Donnie', 'donnie@email.com');
hashTable.put('Ana', 'ana@email.com');
console.log('get', hashTable.get('Sue'));
console.log('get', hashTable.get('*'));
console.log('remove', hashTable.remove('Sue'));
console.log('remove', hashTable.remove('*'));
hashTable.print();
