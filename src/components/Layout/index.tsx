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

	const preOrder = useCallback(() => {
		if (displayTitle !== null || displayContent !== null) {
			setDisplayTitle(null);
			setDisplayContent(null);
			const timeout = setTimeout(() => {
				setDisplayTitle('Pre Order');
				clearInterval(timeout);
			}, 300);
		} else {
			setDisplayTitle('Pre Order');
		}

		const preOrderArray = binaryTree.preorder(binaryTree.root);
		if (preOrderArray) {
			preOrderArray.map(node => {
				if (node !== null) {
					setDisplayContent(prev => `${prev !== null ? prev + ' -' : ''} ${node.data}`);
				}
			});
		}
		preOrderArray.map((arrayNode, index) => {
			const timeout1 = setTimeout(() => {
				setNodes(nodes => nodes.map((node: Node) => {
					if (node.data.label === arrayNode.data) {
						return {
							...node,
							className: 'active'
						};
					}
					return node;
				}));
				clearTimeout(timeout1);
			}, index * 1000);
			const timeout = setTimeout(() => {
				setNodes(nodes => nodes.map((node: Node) => {
					if (node.data.label === arrayNode.data){
						return {
							...node,
							className: ''
						};
					}
					return node;
				}));
				clearTimeout(timeout);
			}, (index + 1) * 1000);
		});
		return;
	}, [displayContent, displayTitle]);

	const postOrder = useCallback(() => {
		if (displayTitle !== null || displayContent !== null) {
			setDisplayTitle(null);
			setDisplayContent(null);
			const timeout = setTimeout(() => {
				setDisplayTitle('Post Order');
				clearInterval(timeout);
			}, 300);
		} else {
			setDisplayTitle('Post Order');
		}

		const postOrderArray = binaryTree.postorder(binaryTree.root);
		if (postOrderArray) {
			postOrderArray.map(node => {
				if (node !== null) {
					setDisplayContent(prev => `${prev !== null ? prev + ' -' : ''} ${node.data}`);
				}
			});
		}
		postOrderArray.map((arrayNode, index) => {
			const timeout1 = setTimeout(() => {
				setNodes(nodes => nodes.map((node: Node) => {
					if (node.data.label === arrayNode.data) {
						return {
							...node,
							className: 'active'
						};
					}
					return node;
				}));
				clearTimeout(timeout1);
			}, index * 1000);
			const timeout = setTimeout(() => {
				setNodes(nodes => nodes.map((node: Node) => {
					if (node.data.label === arrayNode.data){
						return {
							...node,
							className: ''
						};
					}
					return node;
				}));
				clearTimeout(timeout);
			}, (index + 1) * 1000);
		});
		return;
	}, [displayContent, displayTitle]);

	const inOrder = useCallback(() => {
		if (displayTitle !== null || displayContent !== null) {
			setDisplayTitle(null);
			setDisplayContent(null);
			const timeout = setTimeout(() => {
				setDisplayTitle('In Order');
				clearInterval(timeout);
			}, 300);
		} else {
			setDisplayTitle('In Order');
		}

		const inOrderArray = binaryTree.inorder(binaryTree.root);
		if (inOrderArray) {
			inOrderArray.map(node => {
				if (node !== null) {
					setDisplayContent(prev => `${prev !== null ? prev + ' -' : ''} ${node.data}`);
				}
			});
		}
		inOrderArray.map((arrayNode, index) => {
			const timeout = setTimeout(() => {
				setNodes(nodes => nodes.map((node: Node) => {
					if (node.data.label === arrayNode.data) {
						return {
							...node,
							className: 'active'
						};
					}
					return node;
				}));
				clearTimeout(timeout);
			}, index * 1000);
			const timeoutRemove = setTimeout(() => {
				setNodes(nodes => nodes.map((node: Node) => {
					if (node.data.label === arrayNode.data){
						return {
							...node,
							className: ''
						};
					}
					return node;
				}));
				clearTimeout(timeoutRemove);
			}, (index + 1) * 1000);
		});

	}, [displayContent, displayTitle]);

	const resetTree = useCallback(() => {
		binaryTree.treeReset();
		binaryTree.resetDataSet();
		setNodes([]);
		setEdges([]);
		setDisplayTitle(null);
		setDisplayContent(null);
	}, [nodes, edges]);


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
