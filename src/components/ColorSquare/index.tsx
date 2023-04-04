import styled, { ComponentWithCss, css } from 'styled-components';

export interface ColorSquareProps {
  color: string;
}

export const ColorSquare = styled.div<ComponentWithCss<ColorSquareProps>>`
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: ${props => props.color};
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);

  ${props => props.css && css(props.css)}
`;
