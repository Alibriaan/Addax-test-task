import styled from 'styled-components';
import { Card } from '../../components/Card';

export const HolidayCard = styled(Card).attrs(() => ({
  variant: 'paper',
}))`
  padding: 10px;
  background: ${props => props.theme.palette.secondary.main};
  color: ${props => props.theme.palette.common.white};
`;