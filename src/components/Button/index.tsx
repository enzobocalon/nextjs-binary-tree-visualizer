import { ReactNode } from 'react';
import * as S from './styles';

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

export default function Button({children, onClick}: Props) {
	return (
		<S.Button>
			{children}
		</S.Button>
	);
}