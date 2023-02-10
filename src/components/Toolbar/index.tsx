import { useState } from 'react';
import { MdOutlineAdd, MdSearch, MdOutlineReplay, MdRemove } from 'react-icons/md';
import { GiTreeRoots } from 'react-icons/gi';
import Tooltip from '../Tooltip';
import * as S from'./styles';
import ToolbarItem from '../ToolbarItem';

interface Props {
  addTreeNode: (data: number) => void
  findRoot: () => void;
  resetTree: () => void
  preOrder: () => void
  postOrder: () => void
  inOrder: () => void
  removeTreeNode: (data: number) => void
}

export default function Toolbar({addTreeNode, removeTreeNode, findRoot, resetTree, preOrder, postOrder, inOrder}: Props) {
	const [openedMenu, setOpenedMenu] = useState<number | null>(null);

	return (
		<S.Container>
			<Tooltip content='Insert Value' shouldRender={openedMenu !== 0}>
				<ToolbarItem
					icon={<MdOutlineAdd size={24}/>}
					action={() => setOpenedMenu(prev => prev === 0 ? null : 0)}
					addTreeNode={addTreeNode} />
			</Tooltip>

			<Tooltip content='Remove Value' shouldRender={openedMenu !== 1}>
				<ToolbarItem
					icon={<MdRemove size={24}/>}
					action={() => setOpenedMenu(prev => prev === 1 ? null : 1)}
					removeTreeNode={removeTreeNode} />
			</Tooltip>

			<Tooltip content='Search in Tree' shouldRender={openedMenu !== 2}>
				<ToolbarItem
					icon={<MdSearch size={24}/>}
					action={() => setOpenedMenu(prev => prev === 2 ? null : 2)}
					openedMenu={openedMenu}
					preOrder={preOrder}
					postOrder={postOrder}
					inOrder={inOrder}
					addTreeNode={addTreeNode}
					removeTreeNode={removeTreeNode}/>
			</Tooltip>

			<Tooltip content='Find Root' shouldRender={openedMenu !== 1}>
				<ToolbarItem icon={<GiTreeRoots size={24}/>} action={findRoot} />
			</Tooltip>

			<Tooltip content='Reset Tree' shouldRender={openedMenu !== 1}>
				<ToolbarItem icon={<MdOutlineReplay size={24}/>} action={resetTree} />
			</Tooltip>
		</S.Container>
	);
}
