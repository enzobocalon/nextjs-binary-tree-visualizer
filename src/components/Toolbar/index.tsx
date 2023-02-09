import { useRef, useState } from 'react';
import { MdDone, MdOutlineAdd, MdSearch, MdOutlineReplay } from 'react-icons/md';
import { GiTreeRoots } from 'react-icons/gi';
import Input from '../Input';
import Tooltip from '../Tooltip';
import * as S from'./styles';
import Actions from '../Actions';
import { AnimatePresence } from 'framer-motion';

interface Props {
  addTreeNode: (data: number) => void
  findRoot: () => void;
  resetTree: () => void
  preOrder: () => void
  postOrder: () => void
  inOrder: () => void
}

export default function Toolbar({addTreeNode, findRoot, resetTree, preOrder, postOrder, inOrder}: Props) {
	const [openedMenu, setOpenedMenu] = useState<number | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleAdd = () => {
		if (!inputRef) return;
		if (!inputRef.current) return;
		if (Number(inputRef.current.value)) {
			addTreeNode(parseInt(inputRef.current.value));
			inputRef.current.value = '';
		}
	};

	return (
		<S.Container>
			<Tooltip content='Insert value' shouldRender={openedMenu !== 0}>
				<S.ItemContainer>
					<S.Item onClick={() => setOpenedMenu(prev => prev === 0 ? null : 0)}>
						<MdOutlineAdd size={24}/>
					</S.Item>
					<AnimatePresence>
						{
							openedMenu === 0 && (
								<Input
									label='Insert a value'
									action={handleAdd}
									icon={<MdDone />}
									reference={inputRef}
									key={'input'}/>
							)
						}
					</AnimatePresence>
				</S.ItemContainer>
			</Tooltip>

			<Tooltip content='Search in Tree' shouldRender={openedMenu !== 1}>
				<S.ItemContainer>
					<S.Item onClick={() => setOpenedMenu(prev => prev === 1 ? null : 1)}>
						<MdSearch size={24}/>
					</S.Item>
					<AnimatePresence>
						{
							openedMenu === 1 && (
								<Actions
									key={'actions'}
									preOrder={preOrder}
									postOrder={postOrder}
									inOrder={inOrder}/>
							)
						}
					</AnimatePresence>
				</S.ItemContainer>
			</Tooltip>

			<Tooltip content='Find Root' shouldRender={openedMenu !== 1}>
				<S.ItemContainer>
					<S.Item onClick={findRoot}>
						<GiTreeRoots size={24}/>
					</S.Item>
				</S.ItemContainer>
			</Tooltip>

			<Tooltip content='Reset Tree' shouldRender={openedMenu !== 1}>
				<S.ItemContainer>
					<S.Item onClick={resetTree}>
						<MdOutlineReplay size={24}/>
					</S.Item>
				</S.ItemContainer>
			</Tooltip>
		</S.Container>
	);
}
