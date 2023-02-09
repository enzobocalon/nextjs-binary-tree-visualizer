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
		if (currentNode === null) return;

		setNodes(nodes => [
			...nodes,
			{
				id: currentNode.id,
				position: {
					x: currentNode.getCoordX(),
					y: currentNode.getCoordY()
				},
				data: { label: currentNode.data },
			} as Node
		]);
		setEdges(edges => [
			...edges,
			{
				id: crypto.randomUUID(),
				source: currentNode.parentID,
				target: currentNode.id,
				type: 'straight'
			} as Edge
		]);
	}, [nodes, edges]);

	const findRoot = useCallback(() => {
		setDisplayTitle('Root');
		if (!binaryTree.root) {
			setDisplayContent('No tree found.');
			const timeout = setTimeout(() => {
				setDisplayTitle(null);
				setDisplayContent(null);
				clearTimeout(timeout);
			}, 3000);
			return;
		}
		setDisplayContent(binaryTree.root.data);
		setNodes(nodes => nodes.map((node: Node) => {
			if (node.data.label === binaryTree.root!.data) {
				return {
					...node,
					className: 'active'
				};
			}
			return node;
		}));
		const timeout = setTimeout(() => {
			setNodes(nodes => nodes.map((node: Node) => {
				if (node.data.label === binaryTree.root!.data) {
					return {
						...node,
						className: ''
					};
				}
				return node;
			}));
			clearTimeout(timeout);
		}, 1000);

	}, []);

	const resetTree = useCallback(() => {
		binaryTree.treeReset();
		binaryTree.resetDataSet();
		setNodes([]);
		setEdges([]);
	}, [nodes, edges]);


	return (
		<S.Container>
			<Toolbar
				addTreeNode={addTreeNode}
				resetTree={resetTree}
				findRoot={findRoot}
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
			<Display title={displayTitle} content={displayContent} setDisplayTitle={setDisplayTitle}/>
		</S.Container>
	);
}
