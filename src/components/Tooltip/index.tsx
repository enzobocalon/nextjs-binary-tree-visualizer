import { ReactNode } from 'react';
import * as S from './styles';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface Props {
  children: ReactNode
  content: string
}
export default function Tooltip({children, content}: Props) {
	return (
		<S.MainContainer>
			<TooltipPrimitive.Provider>
				<TooltipPrimitive.Root>
					<TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
					<TooltipPrimitive.Content side="right" align="center" className='TooltipContent'>
						{content}
					</TooltipPrimitive.Content>
				</TooltipPrimitive.Root>
			</TooltipPrimitive.Provider>
		</S.MainContainer>
	);
}