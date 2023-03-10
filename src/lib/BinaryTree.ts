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

	resetDataSet() {
		this.dataSet.clear();
	}

	getDataFromSet(data: number) {
		return this.dataSet.has(data);
	}

	getDataSet() {
		return this.dataSet;
	}

	treeReset() {
		this.root = null;
	}

	preorder(node: Node | null) {
		if(node !== null)
		{
			const leftNodes: Node[] = this.preorder(node.left);
			const rightNodes: Node[] = this.preorder(node.right);
			return [node, ...leftNodes, ...rightNodes];
		}
		return [];
	}

	inorder(node: Node | null) {
		if(node !== null) {
			const leftNodes: Node[] = this.inorder(node.left);
			const rightNodes: Node[] = this.inorder(node.right);
			return [...leftNodes, node, ...rightNodes];
		}
		return [];
	}

	postorder(node: Node | null) {
		if(node !== null) {
			const leftNodes: Node[] = this.postorder(node.left);
			const rightNodes: Node[] = this.postorder(node.right);
			return [...leftNodes, ...rightNodes, node];
		}
		return [];
	}

	remove(key: number)
	{
		this.root = this.deleteRec(this.root, key);
		return this.root;
	}

	deleteRec(root: Node | null,key: number): Node | null
	{
		if (root == null)
			return root;

		if (key < root.data)
			root.left = this.deleteRec(root.left, key);
		else if (key > root.data)
			root.right = this.deleteRec(root.right, key);
		else {
			if (root.left == null) {
				return root.right;
			}
			else if (root.right == null)
				return root.left;

			root.data = this.minValue(root.right);

			// Delete the inorder successor
			root.right = this.deleteRec(root.right, root.data);
		}

		return root;
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
}


// Code based on https://www.geeksforgeeks.org/implementation-binary-search-tree-javascript/
