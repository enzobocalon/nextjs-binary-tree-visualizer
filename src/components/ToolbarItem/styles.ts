import styled from 'styled-components';

export const ItemContainer = styled.div`
  position: relative;
  border-radius: 8px;
`;

export const Item = styled.div`
  cursor: pointer;
  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .3s ease;

  border-radius: 6px;
  border: 1px solid transparent;

  &:hover {
    svg {
      color: #A35AFE;
    }
    border: 1px solid #A35AFE;
    transition: all .3s ease;
  }
`;
