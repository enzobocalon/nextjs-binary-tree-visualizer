import * as S from './styles';

interface Props {
  preOrder: () => void
  postOrder: () => void
  inOrder: () => void
}

export default function Actions({inOrder, postOrder, preOrder}: Props) {
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
				<S.Item onClick={preOrder}>
        Pre Order
				</S.Item>
				<S.Item onClick={postOrder}>
        Post Order
				</S.Item>
				<S.Item onClick={inOrder}>
        In Order
				</S.Item>
			</S.ItemContainer>
		</S.Container>
	);
}
