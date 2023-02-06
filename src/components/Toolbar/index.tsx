import { useState } from 'react';
import { MdOutlineAdd, MdRemove, MdSearch } from 'react-icons/md';
import Input from '../Input';
import Tooltip from '../Tooltip';
import * as S from'./styles';

export default function Toolbar() {
	const [openedMenu, setOpenedMenu] = useState(0);
	return (
		<S.Container>
			<Tooltip content='Insert value'>
				<S.Item>
					<MdOutlineAdd size={24}/>
					{
						openedMenu === 0 && (
							<Input />
						)
					}
				</S.Item>
			</Tooltip>

			<Tooltip content='Remove Value'>
				<S.Item>
					<MdRemove size={24}/>
				</S.Item>
			</Tooltip>

			<S.Item>
				<MdSearch size={24}/>
			</S.Item>
		</S.Container>
	);
}
