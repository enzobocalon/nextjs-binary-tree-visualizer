import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  .react-flow__node-default {
    display: flex;
    align-items:  center;
    justify-content: center;

    width: 100%;
    max-width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #A35AFE;
    font-weight: bold;
    transition: border .3s ease;

    padding: 0;
  }

  .react-flow__handle {
    background-color: hsl(250, 43.0%, 48.0%);
  }

  .active {
    border: 2px solid #2a3d66;
    transition: border .3s ease;
  }
`;
