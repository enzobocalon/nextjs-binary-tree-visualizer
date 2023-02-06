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

	getDataFromSet(data: number) {
		return this.dataSet.has(data);
	}

	setWidth(width: number) {
		this.width = width;
	}
}


// Code based on https://www.geeksforgeeks.org/implementation-binary-search-tree-javascript/
