const { Queue } = require('../queue/queue');
const { Stack2: Stack } = require('../stack/stack');

class Graph {
	#vertices = []; // 정점 명칭 저장
	#adjacencyList = new Map(); // 인접 리스트 저장
	#time = 0;

	// 그래프에 정점을 추가
	addVertex(v) {
		this.#vertices.push(v);
		this.#adjacencyList.set(v, []);
	}

	// 간선을 추가하는 메소드
	addEdge(v, w) {
		this.#adjacencyList.get(v).push(w);
		// this.#adjacencyList.get(w).push(v);
	}

	// 그래프 출력 용도
	#toString() {
		return this.#vertices.reduce((result, vertex) => {
			const neighbors = this.#adjacencyList.get(vertex);
			return `${result}\n${vertex} -> ${neighbors.join(' ')}`;
		}, '');
	}

	print() {
		console.log(this.#toString());
	}

	// 모든 정점을 방문하지 않은 상태(=white)로 초기화
	#initializeColor() {
		return this.#vertices.reduce((color, vertex) => {
			color[vertex] = 'white';
			return color;
		}, {});
	}

	bfs(v, callback) {
		const color = this.#initializeColor();
		const queue = new Queue();
		queue.enqueue(v);

		while (!queue.isEmpty()) {
			const u = queue.dequeue();
			const neighbors = this.#adjacencyList.get(u); // 정점의 인접 리스트를 가져온다.
			color[u] = 'grey'; // 정점을 '방문했음'으로 표시

			// 인접 리스트를 방문
			neighbors.forEach((w) => {
				if (color[w] === 'white') {
					color[w] = 'grey';
					queue.enqueue(w);
				}
			});

			// 해당 정점과 인접 정점의 확인이 끝나면 '탐색했음'으로 표시
			color[u] = 'black';
			if (callback) {
				callback(u);
			}
		}
	}

	// 최단 경로 찾기
	BFS(v) {
		const color = this.#initializeColor();
		const queue = new Queue();
		const distances = {}; // 정점 간 거리를 저장
		const predecessor = {}; // 특정 노드에 오기 직전의 노드
		queue.enqueue(v);

		this.#vertices.forEach((vertex) => {
			distances[vertex] = 0;
			predecessor[vertex] = null;
		});

		while (!queue.isEmpty()) {
			const u = queue.dequeue();
			const neighbors = this.#adjacencyList.get(u); // 정점의 인접 리스트를 가져온다.
			color[u] = 'grey'; // 정점을 '방문했음'으로 표시

			// 인접 리스트를 방문
			neighbors.forEach((w) => {
				if (color[w] === 'white') {
					color[w] = 'grey';
					distances[w] = distances[u] + 1;
					predecessor[w] = u;
					queue.enqueue(w);
				}
			});
			color[u] = 'black';
		}
		return {
			distances,
			predecessor,
		};
	}

	dfs(callback) {
		const color = this.#initializeColor();
		this.#vertices.forEach((vertex) => {
			if (color[vertex] === 'white') {
				this.#dfsVisit(vertex, color, callback);
			}
		});
	}

	#dfsVisit(u, color, callback) {
		color[u] = 'grey';
		if (callback) {
			callback(u);
		}
		const neighbors = this.#adjacencyList.get(u);
		neighbors.forEach((vertex) => {
			if (color[vertex] === 'white') {
				this.#dfsVisit(vertex, color, callback);
			}
		});
		color[u] = 'black';
	}

	DFS() {
		const color = this.#initializeColor();
		const discovery = {}; // 방문 시간
		const finished = {}; // 탐색 시간
		const predecessors = {}; // 선행자

		this.#vertices.forEach((vertex) => {
			finished[vertex] = 0;
			discovery[vertex] = 0;
			predecessors[vertex] = null;
		});

		this.#vertices.forEach((vertex) => {
			if (color[vertex] === 'white') {
				this.#DFSVisit(vertex, color, discovery, finished, predecessors);
			}
		});

		return {
			discovery,
			finished,
			predecessors,
		};
	}

	#DFSVisit(u, color, d, f, p) {
		console.log('방문', u);
		color[u] = 'grey';
		d[u] = ++this.#time;
		const neighbors = this.#adjacencyList.get(u);
		neighbors.forEach((vertex) => {
			if (color[vertex] === 'white') {
				p[vertex] = u;
				this.#DFSVisit(vertex, color, d, f, p);
			}
		});
		color[u] = 'black';
		f[u] = ++this.#time;
		console.log('탐색', u);
	}
}

module.exports = {
	Graph,
};
