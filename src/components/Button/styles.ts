import styled from 'styled-components';

export const Button = styled.button`
  background-color: transparent;
  color: #A35AFE;
  border-radius: .5rem;
  border: 1px solid transparent;
  outline: none;
  font-family: inherit;
  font-weight: bold;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .3s ease;

  :hover {
    border: 1px solid #A35AFE;
    transition: all .3s ease;
  }
`;
