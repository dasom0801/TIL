class ArrayList {
	#array = [];

	get length() {
		return this.#array.length;
	}

	insert(item) {
		this.#array.push(item);
	}

	toString() {
		return this.#array.join();
	}

	// 버블 정렬
	bubbleSort() {
		for (let i = 0; i < this.length; i++) {
			for (let j = 0; j < this.length - 1 - i; j++) {
				if (this.#array[j] > this.#array[j + 1]) {
					this.#swap(j, j + 1);
				}
			}
		}
	}

	// 선택 정렬
	selectionSort() {
		let indexMin;
		for (let i = 0; i < this.length - 1; i++) {
			indexMin = i;
			for (let j = i; j < this.length; j++) {
				if (this.#array[indexMin] > this.#array[j]) {
					indexMin = j;
				}
			}
			if (i !== indexMin) {
				this.#swap(i, indexMin);
			}
		}
	}

	#swap(index1, index2) {
		[this.#array[index2], this.#array[index1]] = [
			this.#array[index1],
			this.#array[index2],
		];
	}

	// 삽입 정렬
	insertionSort() {
		let temp, j;
		for (let i = 1; i < this.length; i++) {
			j = i;
			temp = this.#array[i];

			while (j > 0 && this.#array[j - 1] > temp) {
				this.#array[j] = this.#array[j - 1];
				j--;
			}

			this.#array[j] = temp;
		}
	}

	// 병합 정렬
	mergeSort() {
		this.#array = this.#mergeSortRec(this.#array);
	}

	#mergeSortRec(array) {
		const length = array.length;
		if (length === 1) {
			return array;
		}
		const mid = Math.floor(length / 2);
		const left = array.slice(0, mid);
		const right = array.slice(mid, length);

		return this.#merge(this.#mergeSortRec(left), this.#mergeSortRec(right));
	}

	#merge(left, right) {
		const result = [];
		let il = 0;
		let ir = 0;
		while (il < left.length && ir < right.length) {
			if (left[il] < right[ir]) {
				result.push(left[il++]);
			} else {
				result.push(right[ir++]);
			}
		}

		while (il < left.length) {
			result.push(left[il++]);
		}

		while (ir < right.length) {
			result.push(right[ir++]);
		}

		return result;
	}

	quickSort() {
		this.#quick(this.#array, 0, this.length - 1);
	}

	#quick(array, left, right) {
		let index;

		if (array.length > 1) {
			index = this.#partition(array, left, right);
		}

		if (left < index - 1) {
			this.#quick(array, left, index - 1);
		}

		if (index < right) {
			this.#quick(array, index, right);
		}
	}

	#partition(array, left, right) {
		const pivot = array[Math.floor((right + left) / 2)];
		let i = left,
			j = right;

		while (i <= j) {
			while (array[i] < pivot) {
				i++;
			}

			while (array[j] > pivot) {
				j--;
			}
			if (i <= j) {
				this.#swapQuickSort(array, i, j);
				i++;
				j--;
			}
		}
		return i;
	}

	#swapQuickSort(array, index1, index2) {
		[array[index1], array[index2]] = [array[index2], array[index1]];
	}

	sequentialSearch(item) {
		for (let i = 0; i < this.length; i++) {
			if (item === this.#array[i]) {
				return i;
			}
		}
		return -1;
	}

	binarySearch(item) {
		this.quickSort();

		let low = 0,
			high = this.length - 1,
			mid,
			element;
		while (low <= high) {
			mid = Math.floor((low + high) / 2);
			element = this.#array[mid];
			if (element < item) {
				low = mid + 1;
			} else if (element > item) {
				high = mid - 1;
			} else {
				return mid;
			}
		}
		return -1;
	}
}

const createNonSortedArray = (size) => {
	const array = new ArrayList();
	for (let i = size; i > 0; i--) {
		array.insert(i);
	}
	return array;
};

const array = createNonSortedArray(5);
// console.log(array.toString());
// array.bubbleSort();
// array.selectionSort();
// array.insertionSort();
// array.mergeSort();
// array.quickSort();
// console.log(array.toString());
// console.log(array.sequentialSearch(3));
// console.log(array.sequentialSearch(0));
console.log(array.binarySearch(3));
console.log(array.binarySearch(0));
