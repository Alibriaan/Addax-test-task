import type * as CSS from 'csstype';
import styled, { ComponentWithCss, css } from 'styled-components';

export interface DividerProps {
  color?: string;
  width?: CSS.Properties['width'];
  height?: CSS.Properties['height'];
}

export const DIVIDER_CLASSES = {
  divider: 'divider',
};

export const Divider = styled.div.attrs(() => ({
  className: DIVIDER_CLASSES.divider,
}))<ComponentWithCss<DividerProps>>`
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.color};

  ${props => props.css && css(props.css)}
`;