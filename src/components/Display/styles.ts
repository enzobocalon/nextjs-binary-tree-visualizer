import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  position: fixed;
  bottom: 25px;
  left: 25px;

  max-width: 100vw;
  box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
  padding: .5rem 0;
  border-radius: .5rem;
  background-color: white;
`;

export const TitleContainer = styled.div`
  border-bottom: 1px solid #e6e6e6;
  padding: .25rem .5rem;
  font-weight: bold;
  color: #4e4e4e;
  letter-spacing: .4px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  svg {
    cursor: pointer;

    :hover {
      color: #A35AFE;
    }
  }
`;

export const ContentContainer = styled.div`
  padding: .25rem .5rem;
  color: #2a3d66;

`;
