import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  .react-flow__node-default {
    width: 100%;
    max-width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #A35AFE;
    font-weight: bold;
  }

  .react-flow__handle {
    background-color: hsl(250, 43.0%, 48.0%);
  }
`;
