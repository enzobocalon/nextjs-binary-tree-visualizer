import Node from './Node';

export class BinaryTree {
	root: Node | null;
	private dataSet: Set<number>;
	private width: number;
	constructor () {
		this.root = null;
		this.dataSet = new Set();
		this.width = 800;
	}

	insert(data: number) {
		const isDuplicate = this.getDataFromSet(data);
		if (isDuplicate) {
			return null;
		}

		const newNode = new Node(data);

		if (this.root === null) {
			this.root = newNode;
			this.setDataSet(data);
			return newNode;

		} else {
			return this.insertNode(this.root, newNode);
		}
	}

	insertNode(node: Node, newNode: Node): Node | null {
		if (newNode.data < node.data) { // goes to left
			if (node.left === null) {

				node.left = newNode;
				this.setDataSet(newNode.data);

				const nodeLevel = this.getNodeHeight(this.root, newNode.data, 0);

				newNode.setCoordinates(node.getCoordX() - (this.width / Math.pow(2, nodeLevel)) - 2, node.getCoordY() + 100);
				newNode.setParentID(node.id);
				newNode.setParent(node);
				return newNode;
			} else {
				return this.insertNode(node.left, newNode);
			}
		} else { // goes to right
			if (node.right === null) {
				node.right = newNode;
				this.setDataSet(newNode.data);

				const nodeLevel = this.getNodeHeight(this.root, newNode.data, 0);

				newNode.setCoordinates(node.getCoordX() + (this.width / Math.pow(2, nodeLevel)) - 2, node.getCoordY() + 100);
				newNode.setParentID(node.id);
				newNode.setParent(node);
				return newNode;
			} else {
				return this.insertNode(node.right, newNode);
			}
		}
	}

	getNodeHeight(root: Node | null, data: number, height: number): number {
		if (root === null) {
			return -1;
		}

		if (data < root.data) {
			height++;
			return this.getNodeHeight(root.left, data, height);
		}

		if (data > root.data) {
			height++;
			return this.getNodeHeight(root.right, data, height);
		}

		return height;
	}

	setDataSet(data: number) {
		this.dataSet.add(data);
	}

	resetDataSet() {
		this.dataSet.clear();
	}

	getDataFromSet(data: number) {
		return this.dataSet.has(data);
	}

	getDataSet() {
		return this.dataSet;
	}

	setWidth(width: number) {
		this.width = width;
	}

	treeReset() {
		this.root = null;
	}

	minValue(root: Node) {
		let minv = root.data;
		while (root.left != null)
		{
			minv = root.left.data;
			root = root.left;
		}
		return minv;
	}

	search(node: Node | null, data: number): Node | null {
		if(node === null)
			return null;

		else if(data < node.data)
			return this.search(node.left, data);

		else if(data > node.data)
			return this.search(node.right, data);

		else
			return node;
	}

	preorder(node: Node | null) {
		if(node !== null)
		{
			console.log(node.data);
			this.preorder(node.left);
			this.preorder(node.right);
		}
	}

	inorder(node: Node | null) {
		if(node !== null) {
			const leftNodes: Node[] = this.inorder(node.left);
			const rightNodes: Node[] = this.inorder(node.right);
			return [...leftNodes, node, ...rightNodes];
		}
		return [];

		//   let nodes: Node[] = [];
	// 	if(node !== null)
	// 	{
	// 		const leftNodes: Node[] = this.inorder(node.left);
	// 		const rightNodes: Node[] = this.inorder(node.right);
	// 		nodes = leftNodes.concat([node]).concat(rightNodes);
	// 	}
	// 	return nodes;
	//
	}

}


// Code based on https://www.geeksforgeeks.org/implementation-binary-search-tree-javascript/
