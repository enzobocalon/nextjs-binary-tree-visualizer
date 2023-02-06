import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index: 100;
  top: 25px;
  left: 25px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: .5rem 1rem;
  border-radius: .5rem;
`;

export const Item = styled.div`
  cursor: pointer;
  position: relative;
  padding: .5rem;

  &:hover {
    svg {
      color: #A35AFE;
    }
  }

  & ~ & {
    margin-top: 1rem;
  }
`;
