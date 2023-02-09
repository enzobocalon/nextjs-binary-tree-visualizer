import Button from '../Button';
import * as S from './styles';
import { MutableRefObject, ReactNode } from 'react';
interface Props {
  label: string;
  icon: ReactNode;
  action: () => void;
  reference: MutableRefObject<HTMLInputElement | null>
}

export default function Input({label, icon, action, reference}: Props) {

	const handleSubmit = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			action();
		}
	};

	return (
		<S.Container
			initial={{opacity: 0, translateX: '-100px', translateY: '-80%' }}
			animate={{opacity: 1, translateX: '0', translateY: '-80%' }}
			exit={{opacity: 0, translateX: '-100px', translateY: '-80%' }}
			transition={{type: 'spring', stiffness: 60}}>
			<S.InputLabel htmlFor='input'>
				<S.StyledInput id='input' ref={reference} type='number' onKeyDown={handleSubmit}/>
				<S.StyledSpan>
					{label}
				</S.StyledSpan>
			</S.InputLabel>
			<Button onClick={action}>
				{icon}
			</Button>
		</S.Container>
	);
}
