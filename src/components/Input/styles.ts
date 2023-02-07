import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  left: 80px;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  padding: .5rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 4px;
  display: flex;
  gap: 1rem;
  width: 250px;
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

    @media (max-width: 425px) {
      width: 60vw;
    }
`;

export const InputLabel = styled.label`
  position: relative;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: .4rem .5rem;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  outline: none;
  background-color: white;
  font-family: inherit;
`;

export const StyledSpan = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(.5rem, -50%);
  background-color: white;
  font-size: .8rem;
  color: #A35AFE;
  font-weight: bold;
  letter-spacing: .5px;
`;
