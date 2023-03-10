import { AnimatePresence } from 'framer-motion';
import { forwardRef, useRef } from 'react';
import { MdDone } from 'react-icons/md';
import Actions from '../Actions';
import Input from '../Input';
import * as S from './styles';

interface Props {
  icon: React.ReactNode
  action: () => void
  openedMenu?: number | null;
  preOrder?: () => void
  postOrder?: () => void
  inOrder?: () => void
  addTreeNode?: (data: number) => void
  removeTreeNode?: (data: number) => void
}

export const ToolbarItem = forwardRef<HTMLDivElement, Props>((
	{
		action,
		icon,
		openedMenu,
		preOrder,
		postOrder,
		inOrder,
		addTreeNode,
		removeTreeNode,
		...props
	}: Props,
	forwardedRef) => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleAdd = () => {
		if (!inputRef) return;
		if (!inputRef.current) return;
		if (Number(inputRef.current.value)) {
			addTreeNode!(parseInt(inputRef.current.value));
			inputRef.current.value = '';
		}
	};

	const handleRemove = () => {
		if (!inputRef) return;
		if (!inputRef.current) return;
		if (Number(inputRef.current.value)) {
			removeTreeNode!(parseInt(inputRef.current.value));
			inputRef.current.value = '';
		}
	};

	return (
		<S.ItemContainer ref={forwardedRef} {...props}>
			<S.Item onClick={action}>
				{icon}
			</S.Item>
			<AnimatePresence>
				{
					openedMenu === 0 && (
						<Input
							label='Insert a value'
							preset='add'
							action={handleAdd}
							icon={<MdDone />}
							reference={inputRef}
							key={'input'}/>
					)
				}
				{
					openedMenu === 1 && (
						<Input
							label='Remove a value'
							preset='remove'
							action={handleRemove}
							icon={<MdDone />}
							reference={inputRef}
							key={'input'}/>
					)
				}
				{
					openedMenu === 2 && (
						<Actions
							key={'actions'}
							preOrder={preOrder!}
							postOrder={postOrder!}
							inOrder={inOrder!}/>
					)
				}
			</AnimatePresence>
		</S.ItemContainer>
	);
});

ToolbarItem.displayName = 'ToolbarItem';
export default ToolbarItem;
