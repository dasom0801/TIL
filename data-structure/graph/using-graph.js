const { Graph } = require('./graph');

const executeGraph1 = () => {
	const graph = new Graph();
	const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

	vertices.forEach((vertex) => graph.addVertex(vertex));
	graph.addEdge('A', 'B');
	graph.addEdge('A', 'C');
	graph.addEdge('A', 'D');
	graph.addEdge('C', 'D');
	graph.addEdge('C', 'G');
	graph.addEdge('D', 'G');
	graph.addEdge('D', 'H');
	graph.addEdge('B', 'E');
	graph.addEdge('B', 'F');
	graph.addEdge('E', 'I');

	const printNode = (value) => {
		console.log('탐색한 정점:', value);
	};

	// graph.print();
	// graph.bfs(vertices[0], printNode);

	// 다른 정점까지의 경로 출력
	const printPathFrom = (fromVertex) => {
		const shortestPath = graph.BFS(fromVertex);
		const path = new Stack();

		// 자신과의 경로는 출력할 필요 없기 때문에 필터
		vertices
			.filter((v) => v !== fromVertex)
			.forEach((toVertex) => {
				const result = [];

				// predecessor로 이전에 방문했던 노드를 찾다가 목적지까지 도달하면 루프를 종료한다.
				for (
					let v = toVertex;
					v !== fromVertex;
					v = shortestPath.predecessor[v]
				) {
					path.push(v);
				}
				path.push(fromVertex);
				while (!path.isEmpty()) {
					result.push(path.pop());
				}
				console.log(result.join(' - '));
			});
	};
	printPathFrom(vertices[1]);
	// graph.dfs(printNode);
};

const executeGraph2 = () => {
	const graph = new Graph();
	const vertices = ['A', 'B', 'C', 'D', 'E', 'F'];
	vertices.forEach((vertex) => graph.addVertex(vertex));
	graph.addEdge('A', 'C');
	graph.addEdge('A', 'D');
	graph.addEdge('B', 'D');
	graph.addEdge('B', 'E');
	graph.addEdge('C', 'F');
	graph.addEdge('F', 'E');

	const printPath = () => {
		debugger;
		const result = graph.DFS();
		var fTimes = result.finished;
		const paths = [];
		vertices.forEach(() => {
			let max = 0;
			let maxName = null;
			vertices.forEach((v) => {
				if (fTimes[v] > max) {
					max = fTimes[v];
					maxName = v;
				}
			});
			paths.push(maxName);
			delete fTimes[maxName];
		});
		console.log(paths.join(' - '));
	};

	printPath();
};

executeGraph2();
