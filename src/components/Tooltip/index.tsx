import { ReactNode } from 'react';
import * as S from './styles';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface Props {
  children: ReactNode;
  content: string;
  shouldRender: boolean;
}
export default function Tooltip({children, content, shouldRender}: Props) {
	return (
		<S.MainContainer>
			<TooltipPrimitive.Provider>
				<TooltipPrimitive.Root>
					<TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
					<TooltipPrimitive.Content side="right" align="center" className='TooltipContent' style={!shouldRender ? {display: 'none'} : {}}>
						{content}
					</TooltipPrimitive.Content>
				</TooltipPrimitive.Root>
			</TooltipPrimitive.Provider>
		</S.MainContainer>
	);
}
