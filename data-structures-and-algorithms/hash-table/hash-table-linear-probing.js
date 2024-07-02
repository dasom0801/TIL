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
		let position = this.#loseloseHashCode(key);
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
		let position = this.#loseloseHashCode(key);
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
		let position = this.#loseloseHashCode(key);
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
hashTable.put('Jonathan', 'jonathan@email.com'); // 5에 추가
hashTable.put('Jamie', 'jamie@email.com'); // 5: 충돌 발생 > 6에 추가
hashTable.put('Sue', 'sue@email.com'); // 5: 충돌 발생 > 6: 충돌 발생 > 7에 추가
hashTable.put('Tyrion', 'tyrion@email.com'); // 16에 추가
hashTable.put('Aaron', 'aaron@email.com'); // 16: 충돌 발생 > 17에 추가
hashTable.put('Donnie', 'donnie@email.com'); // 13에 추가
hashTable.put('Ana', 'ana@email.com'); // 13: 충돌 발생 > 14에 추가
console.log('get', hashTable.get('Sue')); // 해시 값: 5, index: 7
console.log('get', hashTable.get('*')); // 해시 값: 5, 존재하지 않는 값
console.log('remove', hashTable.remove('Sue'));
console.log('remove', hashTable.remove('*'));
hashTable.print();
