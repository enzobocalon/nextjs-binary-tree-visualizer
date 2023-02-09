import * as S from './styles';

import { MdClose } from 'react-icons/md';

import {AnimatePresence} from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  title: string | null;
  content: string | number | null;
  setDisplayTitle: Dispatch<SetStateAction<string | null>>
}

export default function Display({title, content, setDisplayTitle}: Props) {
	return (
		<AnimatePresence mode='wait'>
			{title !== null && (
				<S.Container
					key={'displayModal'}
					initial={{opacity: 0, translateX: '-200%'}}
					animate={{opacity: 1, translateX: '0'}}
					exit={{opacity: 0, translateX: '-200%'}}
					transition={{type: 'spring', stiffness: 60}}>
					<S.TitleContainer>
						{title}
						<MdClose onClick={() => setDisplayTitle(null)}/>
					</S.TitleContainer>
					<S.ContentContainer>
						{content}
					</S.ContentContainer>
				</S.Container>
			)}
		</AnimatePresence>
	);
}
