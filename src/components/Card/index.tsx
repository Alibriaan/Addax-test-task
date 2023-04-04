import classNames from 'classnames';
import styled, { ComponentWithCss, css } from 'styled-components';

export type CardVariants = 'paper' | 'outlined';

export interface CardProps {
  variant?: CardVariants;
  children?: React.ReactNode | React.ReactNode[];
}


export const CARD_CLASSES = {
  card: 'card',
  paper: 'paper',
  outlined: 'outlined',
}

const PaperVariant = css`
  border-radius: ${props => props.theme.border.radius};
  box-shadow: rgb(0 0 0 / 25%) 0px 0px 7px 1px;
`;

const OutlinedVariant = css`
  border-radius: ${props => props.theme.border.radius};
  border: 1px solid rgba(0, 0, 0, 0.12);
`;  

export const Card = styled.div.attrs<ComponentWithCss<CardProps>>((props) => ({
  className: classNames(
    CARD_CLASSES.card,
    {
      [CARD_CLASSES.paper]: props.variant === 'paper',
      [CARD_CLASSES.outlined]: props.variant === 'outlined',
    }
  ),
}))<ComponentWithCss<CardProps>>`
  background: #ffffff;
  
  ${props => props.variant === 'paper' && PaperVariant}
  ${props => props.variant === 'outlined' && OutlinedVariant}
  ${props => props.css && css(props.css)}
`;