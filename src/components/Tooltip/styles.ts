import styled from 'styled-components';

export const MainContainer = styled.div`
  .TooltipContent {

    font-size: .95rem;
    color: hsl(250, 43.0%, 48.0%);
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 4px;
    padding: .5rem;
    margin-left: 1.75rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    position: relative;
    animation-duration: .3s;
    animation-name: slideRight;
    animation-timing-function: ease-in-out;

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
    }

    @keyframes slideRight {
      from {
        opacity: 0;
        transform: translateX(-10%);
      }
       to {
        opacity: 1;
        transform: translateX(0);
       }
    }
  }
`;
