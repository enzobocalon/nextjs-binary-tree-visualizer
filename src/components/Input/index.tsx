import Button from '../Button';
import {MdDone} from 'react-icons/md';
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
		<S.Container>
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

// https://codepen.io/meodai/pen/rNedxBa
