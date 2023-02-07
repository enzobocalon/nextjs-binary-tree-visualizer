import { useRef, useState } from 'react';
import { MdDone, MdOutlineAdd, MdRemove, MdSearch } from 'react-icons/md';
import Input from '../Input';
import Tooltip from '../Tooltip';
import * as S from'./styles';

interface Props {
  addTreeNode: (data: number) => void
}

export default function Toolbar({addTreeNode}: Props) {
	const [openedMenu, setOpenedMenu] = useState<number | null>(0);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleAdd = () => {
		if (!inputRef) return;
		if (!inputRef.current) return;
		if (Number(inputRef.current.value)) {
			addTreeNode(parseInt(inputRef.current.value));
		}
	};

	const handleRemove = () => {
		if (!inputRef) return;
		if (!inputRef.current) return;
	};


	return (
		<S.Container>
			<Tooltip content='Insert value' shouldRender={openedMenu !== 0}>
				<S.ItemContainer>
					<S.Item onClick={() => setOpenedMenu(prev => prev === 0 ? null : 0)}>
						<MdOutlineAdd size={24}/>
					</S.Item>
					{
						openedMenu === 0 && (
							<Input label='Insert a value' action={handleAdd} icon={<MdDone />} reference={inputRef}/>
						)
					}
				</S.ItemContainer>
			</Tooltip>

			<Tooltip content='Remove Value' shouldRender={openedMenu !== 1}>
				<S.ItemContainer>
					<S.Item onClick={() => setOpenedMenu(prev => prev === 1 ? null : 1)}>
						<MdRemove size={24}/>
					</S.Item>
					{
						openedMenu === 1 && (
							<Input label='Remove a value' action={handleRemove} icon={<MdDone />} reference={inputRef}/>
						)
					}
				</S.ItemContainer>
			</Tooltip>

			<Tooltip content='Search in Tree' shouldRender={openedMenu !== 2}>
				<S.ItemContainer>
					<S.Item>
						<MdSearch size={24}/>
					</S.Item>
				</S.ItemContainer>
			</Tooltip>
		</S.Container>
	);
}
