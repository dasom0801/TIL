// 1항, 2항은 1이다.
// n(n >2) = (n - 1) + (n - 2)
const fibWithRecursion = (num) => {
	if (num === 1 || num === 2) {
		return 1;
	}
	return fibWithRecursion(num - 1) + fibWithRecursion(num - 2);
};

const fibWithoutRecursion = (num) => {
	let n1 = 1,
		n2 = 1,
		n = 1;
	for (var i = 3; i <= num; i++) {
		n = n1 + n2;
		n1 = n2;
		n2 = n;
	}
	return n;
};

console.log(fibWithRecursion(9));
console.log(fibWithoutRecursion(9));
