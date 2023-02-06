import { BinaryTree } from '@/lib/BinaryTree';
import {useEffect, useMemo} from 'react';
import ReactFlow, {
	FitViewOptions,
	Node,
	Edge,
	Background,
	useEdgesState,
	useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import Toolbar from '../Toolbar';
import * as S from './styles';
const fitViewOptions: FitViewOptions = {
	padding: 1,
};


export default function Layout() {
	const binaryTree = useMemo(() => new BinaryTree(), []);
	const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

	const addTreeNode = (data: number) => {
		const currentNode = binaryTree.insert(data);
		console.log(currentNode);
		if (currentNode === null) {
			return;
		}

		console.log('passou no addTreeNode');
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
	};

	// useEffect(() => {
	// 	console.log(binaryTree);
	// 	console.log(nodes);
	// 	console.log('===================');
	// }, [nodes]);

	return (
		<S.Container>
			<button onClick={() => addTreeNode(10 - Math.ceil((Math.random() * 9)))}>Debug</button>
			<Toolbar />
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
		</S.Container>
	);
}
