// // 최소 동전 교환 문제
// // 주어진 금액을 동전으로 바꿔줄 때 필요한 동전의 최소 개수를 찾는 문제

// class MinCoinChange {
// 	constructor(coins) {
// 		this.coins = coins;
// 		this.cache = {};
// 	}

// 	makeChange(amount) {
// 		if (!amount) {
// 			return [];
// 		}

// 		if (this.cache[amount]) {
// 			return this.cache[amount];
// 		}

// 		let min = [],
// 			newMin,
// 			newAmount;
// 		this.coins.forEach((coin) => {
// 			newAmount = amount - coin;
// 			if (newAmount >= 0) {
// 				newMin = this.makeChange(newAmount);
// 			}

// 			if (
// 				newAmount >= 0 &&
// 				(newMin.length < min.length - 1 || !min.length) &&
// 				(newMin.length || !newAmount)
// 			) {
// 				min = [coin, ...newMin];
// 				console.log('new Min' + min + ' for ' + amount);
// 			}
// 		});
// 		return (this.cache[amount] = min);
// 	}
// }

// const coin = new MinCoinChange([1, 5, 10, 25]);
// console.log(coin.makeChange(36));

class MinCoinChange {
	constructor(coins) {
		this.coins = coins;
	}

	makeChange(amount) {
		const change = [];
		let total = 0;
		for (let i = this.coins.length; i >= 0; i--) {
			const coin = this.coins[i];
			while (total + coin <= amount) {
				change.push(coin);
				total += coin;
			}
		}
		return change;
	}
}

const coin = new MinCoinChange([1, 5, 10, 25]);
console.log(coin.makeChange(36));
