import { BinaryTree } from '@/lib/BinaryTree';
import {useMemo, useState, useCallback} from 'react';
import ReactFlow, {
	FitViewOptions,
	Node,
	Edge,
	Background,
	useEdgesState,
	useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import Display from '../Display';
import Toolbar from '../Toolbar';
import * as S from './styles';

const fitViewOptions: FitViewOptions = {
	padding: 1,
};

export default function Layout() {
	const binaryTree = useMemo(() => new BinaryTree(), []);
	const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

	const [displayTitle, setDisplayTitle] = useState<string | null>(null);
	const [displayContent, setDisplayContent] = useState<string | number | null>(null);

	const addTreeNode = useCallback((data: number) => {
		const currentNode = binaryTree.insert(data);
		if (!currentNode) return;

		setNodes(nodes => [
			...nodes,
			{
				id: currentNode.id,
				position: {
					x: currentNode.getCoordX(),
					y: currentNode.getCoordY(),
				},
				data: { label: currentNode.data },
				className: '',
			} as Node,
		]);
		setEdges(edges => [
			...edges,
			{
				id: crypto.randomUUID(),
				source: currentNode.parentID,
				target: currentNode.id,
				type: 'straight',
			} as Edge,
		]);
	}, []);

	const highlightNode = (nodeData: number, index: number | null) => {
		setTimeout(() => {
			setNodes(nodes =>
				nodes.map((node: Node) =>
					node.data.label === nodeData
						? { ...node, className: 'active' }
						: node
				)
			);
		}, index ? index * 1000 : 0);
		setTimeout(() => {
			setNodes(nodes =>
				nodes.map((node: Node) =>
					node.data.label === nodeData
						? { ...node, className: '' }
						: node
				)
			);
		}, index ? (index + 1) * 1000 : 1000);
	};

	const findRoot = useCallback(() => {
		setDisplayTitle('Root');
		if (!binaryTree.root) {
			setDisplayContent('Tree is empty');
			setTimeout(() => {
				setDisplayTitle(null);
				setDisplayContent(null);
			}, 3000);
			return;
		}
		setDisplayContent(binaryTree.root.data);
		highlightNode(binaryTree.root.data, null);
	}, []);

	const handleOrder = (order: string) => {
		if (!binaryTree.root) {
			setDisplayTitle(null);
			setTimeout(() => {
				setDisplayTitle(order);
				setDisplayContent('Tree is empty');
			}, 300);
			setTimeout(() => {
				setDisplayTitle(null);
			}, 2300);
			return;
		}
		setDisplayTitle(order);
		setDisplayContent(null);

		const orderArray = order === 'Pre Order' ?
			binaryTree.preorder(binaryTree.root) :
			order === 'In Order' ?
				binaryTree.inorder(binaryTree.root) :
				binaryTree.postorder(binaryTree.root);

		console.log('orderArray', orderArray);
		let displayContent = '';
		orderArray.forEach((arrayNode, index) => {
			if (!arrayNode) return;
			displayContent += arrayNode.data + ' - ';
			highlightNode(arrayNode.data, index);
		});
		setDisplayContent(displayContent.slice(0, -3));
	};

	const preOrder = useCallback(() => handleOrder('Pre Order'), []);
	const postOrder = useCallback(() => handleOrder('Post Order'), []);
	const inOrder = useCallback(() => handleOrder('In Order'), []);

	const resetTree = useCallback(() => {
		binaryTree.treeReset();
		binaryTree.resetDataSet();
		setNodes([]);
		setEdges([]);
		setDisplayTitle(null);
		setDisplayContent(null);
	}, []);

	const removeTreeNode = useCallback((data: number) => {
		const nodeExists = binaryTree.search(binaryTree.root, data);
		if (!nodeExists) return;

		binaryTree.remove(data);
		const newTree = binaryTree.preorder(binaryTree.root);
		if (!newTree) return;

		resetTree();
		newTree.forEach(node => addTreeNode(node.data));
	}, []);

	return (
		<S.Container>
			<Toolbar
				addTreeNode={addTreeNode}
				removeTreeNode={removeTreeNode}
				resetTree={resetTree}
				findRoot={findRoot}
				preOrder={preOrder}
				postOrder={postOrder}
				inOrder={inOrder}
			/>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				fitView
				fitViewOptions={fitViewOptions}
			>
				<Background />
			</ReactFlow>
			<Display
				title={displayTitle}
				content={displayContent}
				setDisplayTitle={setDisplayTitle}/>
		</S.Container>
	);
}
