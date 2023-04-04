import classNames from 'classnames';
import styled, { css } from 'styled-components';

export type ButtonVariants = 'paper';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: ButtonVariants;
}

const PaperVariant = css`
  padding: 8px 16px;
  background-color: ${props => props.theme.palette.primary.light};
  border-radius: 16px;
  color: ${props => props.theme.palette.secondary.light};
  border: none;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 7px 1px;

  &:active {
    background: #dddddd;
  }


  &:disabled {
    background: #a0a0a0;
  }
`;

export const BUTTON_CLASSES = {
  button: 'button',
  paper: 'paper',
}

export const Button = styled.button.attrs<ButtonProps>((props) => ({
  className: classNames(
    BUTTON_CLASSES.button,
    {
      [BUTTON_CLASSES.paper]: props.variant === 'paper',
    },
  ),
}))<React.PropsWithChildren<ButtonProps>>`
  ${props =>props.variant === 'paper' && PaperVariant}
`;