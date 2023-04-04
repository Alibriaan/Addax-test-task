import styled, { ComponentWithCss, css } from 'styled-components';

export const INPUT_CLASSES = {
  input: 'input',
};

export const Input = styled.input.attrs(() => ({
  className: INPUT_CLASSES.input,
}))<ComponentWithCss>`
  padding: 10px 5px;
  outline: none;
  border: none;
  border-bottom: 2px solid #ccc;
  color: #333;
  font-size: 16px;

  &:focus {
    border-bottom: 2px solid ${props => props.theme.palette.primary.main};
  }

  ${props => props.css && css(props.css)}
`;