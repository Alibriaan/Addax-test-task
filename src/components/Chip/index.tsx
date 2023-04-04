import styled, { ComponentWithCss, css } from 'styled-components';

export interface ChipProps {
  color: string;
  label: string;
}

export const CHIP_CLASSNAMES = {
  chip: 'chip',
}

export const Chip = styled.div.attrs(() => ({
  classNames: CHIP_CLASSNAMES.chip,
}))<ComponentWithCss<ChipProps>>`
  background: ${props => props.color};
  border-radius: 10px;
  height: 25px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.11) 0px 0px 3px 1px

  ${props => props.css && css(props.css)}
`;