import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  position: absolute;
  left: 80px;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 8px;
  gap: 1rem;
  width: max-content;
  z-index: 500;

  ::before {
      content: '';
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-right: 10px solid white;
      overflow: hidden;
      position: absolute;
      left: -10px;
      top: 50%;
      transform: translateY(-50%);
      filter: drop-shadow( -6.5px 2px 4px rgba(0, 0, 0, 0.24));
    }

    button {
      min-width: 32px;
      height: 32px;
    }

`;

export const Title = styled.div`
  padding: 0;
  border-bottom: 1px solid #e6e6e6;
  margin-block: .4rem;
  padding-inline: 1.25rem;
  font-weight: bold;
  color: #4e4e4e;
  letter-spacing: .4px;

  & ~ & {
   margin-top: 1rem;
  }
`;

export const ItemContainer = styled.div`
  padding-inline: .75rem;

`;

export const Item = styled.div`
  width: 100%;
  cursor: pointer;
  margin-block: .5rem;
  padding: .25rem .5rem;
  border-radius: 8px;
  transition: all .3s ease;
  letter-spacing: .5px;
  font-size: .95rem;
  border: 1px solid transparent;
  :hover {
    transition: all .3s ease;
    border: 1px solid #A35AFE;
    color: #A35AFE;
  }
`;
