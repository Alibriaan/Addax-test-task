import styled, { ComponentWithCss, css } from 'styled-components';
import type * as CSS from 'csstype';

interface StackProps {
  children?: React.ReactNode | React.ReactNode[];
  display?: CSS.Properties['display'];
  justifyContent?: CSS.Properties['justifyContent'];
  alignItems?: CSS.Properties['alignItems'];
  flexDirection?: CSS.Properties['flexDirection'];
  flexWrap?: CSS.Properties['flexWrap'];
  spacing?: number;
}

export const STACK_CLASSES = {
  stack: 'stack',
};


export const Stack = styled.div.attrs(() => ({
  className: STACK_CLASSES.stack,
}))<ComponentWithCss<StackProps>>`
  display: ${props => props.display || 'flex'};
  flex-direction: ${props => props.flexDirection || 'column'};
  justify-content: ${props => props.justifyContent || ''};
  align-items: ${props => props.alignItems || ''};
  flex-wrap: ${props => props.flexWrap || 'nowrap'};

  & > *:first-child {
    margin-top: 0;
    margin-left: 0;
  }

  & > * {
    ${(props) => {
        const spacing = props.spacing || 0;
        const isColumnDirection = props.flexDirection === 'column' || !props.flexDirection;
        const marginLeft = props.flexDirection === 'row' ? spacing : 0;
        const marginTop = isColumnDirection ? spacing : 0;

        return css({ marginTop, marginLeft});
      }
    }
  }

  ${props => props.css && css(props.css)}
`;