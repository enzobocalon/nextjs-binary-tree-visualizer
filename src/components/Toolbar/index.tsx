import { useState } from 'react';
import { MdOutlineAdd, MdSearch, MdOutlineReplay } from 'react-icons/md';
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
}

export default function Toolbar({addTreeNode, findRoot, resetTree, preOrder, postOrder, inOrder}: Props) {
	const [openedMenu, setOpenedMenu] = useState<number | null>(null);

	return (
		<S.Container>
			<Tooltip content='Insert Value' shouldRender={openedMenu !== 0}>
				<ToolbarItem
					icon={<MdOutlineAdd size={24}/>}
					action={() => setOpenedMenu(prev => prev === 0 ? null : 0)}
					addTreeNode={addTreeNode} />
			</Tooltip>

			<Tooltip content='Search in Tree' shouldRender={openedMenu !== 1}>
				<ToolbarItem
					icon={<MdSearch size={24}/>}
					action={() => setOpenedMenu(prev => prev === 1 ? null : 1)}
					openedMenu={openedMenu}
					preOrder={preOrder}
					postOrder={postOrder}
					inOrder={inOrder}
					addTreeNode={addTreeNode}/>
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
