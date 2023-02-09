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
	}, [binaryTree, nodes, edges, setNodes, setEdges]);

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
		setNodes(nodes => nodes.map((node: Node) => {
			if (node.data.label === binaryTree.root?.data) {
				return {
					...node,
					className: 'active'
				};
			}
			return node;
		}));
		setTimeout(() => {
			setNodes(nodes => nodes.map((node: Node) => {
				if (node.data.label === binaryTree.root?.data) {
					return {
						...node,
						className: ''
					};
				}
				return node;
			}));
		}, 1000);
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

		setDisplayTitle(null);
		setDisplayContent(null);
		setTimeout(() => {
			setDisplayTitle(order);
		}, 300);

		const orderArray = order === 'Pre Order' ?
      	binaryTree.preorder(binaryTree.root) :
      	order === 'In Order' ?
      		binaryTree.inorder(binaryTree.root) :
      		binaryTree.postorder(binaryTree.root);

		orderArray.map((arrayNode, index) => {
			if (!arrayNode) return;
			setDisplayContent((prev) => (prev ? `${prev} - ${arrayNode.data}` : arrayNode.data));
			setTimeout(() => {
				setNodes((nodes) =>
					nodes.map((node: Node) =>
						node.data.label === arrayNode.data
							? { ...node, className: 'active' }
							: node
					)
				);
			}, index * 1000);
			setTimeout(() => {
				setNodes((nodes) =>
					nodes.map((node: Node) =>
						node.data.label === arrayNode.data
							? { ...node, className: '' }
							: node
					)
				);
			}, (index + 1) * 1000);
		});
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


	return (
		<S.Container>
			<Toolbar
				addTreeNode={addTreeNode}
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
