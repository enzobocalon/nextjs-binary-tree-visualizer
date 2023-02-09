import * as S from './styles';

export default function Actions() {
	return (
		<S.Container
			initial={{opacity: 0, translateX: '-100px', translateY: '-50%' }}
			animate={{opacity: 1, translateX: '0', translateY: '-50%' }}
			exit={{opacity: 0, translateX: '-100px', translateY: '-50%' }}
			transition={{type: 'spring', stiffness: 60}}>
			<S.Title>
        Tree Search
			</S.Title>
			<S.ItemContainer>
				<S.Item>
        Pre Order
				</S.Item>
				<S.Item>
        Pos Order
				</S.Item>
				<S.Item>
        In Order
				</S.Item>
			</S.ItemContainer>
		</S.Container>
	);
}
