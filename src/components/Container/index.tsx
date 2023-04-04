import styled, { ComponentWithCss, css } from 'styled-components';

export const CONTAINER_CLASSES = {
  container: 'container',
};

export const Container = styled.div.attrs(() => ({
  className: CONTAINER_CLASSES.container,
}))<ComponentWithCss>`
  ${props => props.css && css(props.css)}
`;