// 키를 구성하는 문자의 아스키 값을 단순히 더한다. > 잦은 충돌을 야기한다.
const loseloseHashCode = (key) => {
	const hash = key.split('').reduce((acc, _, i) => acc + key.charCodeAt(i), 0);
	return hash % 37; // hash를 임의의 숫자로 나눈 나머지를 최종값으로 반환
};

const djb2HashCode = (key) => {
	const hash = key.split('').reduce((acc, _, i) => {
		return acc * 33 + key.charCodeAt(i); // 매직넘버와 곱한 뒤 아스키 값과 더한다.
	}, 5381); // hash 값을 임의의 소수로 초기화
	return hash % 1013; // HashTable 인스턴스가 가질 수 있는 크기보다 더 큰 소수로 나눈다.
};

module.exports = {
	loseloseHashCode,
	djb2HashCode,
};
