// This component is one big reference for mui grid component;
import classNames from 'classnames';
import React from 'react';
import styled, { ComponentWithCss, StyledComponentPropsWithRef , css } from 'styled-components';

export enum GridDefaultBreakpoints {
  xs = 0,
  sm = 600,
  md = 960,
  lg = 1280,
  xl = 1920,
};

export const DEFAULT_COLUMNS = 12;

export type GridBreakpointKeys = keyof typeof GridDefaultBreakpoints;

export interface GridProps extends ComponentWithCss<StyledComponentPropsWithRef<'div'>> {
  container?: boolean;
  item?: boolean;
  children?: React.ReactNode | React.ReactNode[];
  columns?: number;
  size?: {
    [key in GridBreakpointKeys]?: number;
  }
  breakpoints?: {
    [key in GridBreakpointKeys]?: number;
  }
};

export const GRID_CLASSES = {
  grid: 'grid',
  container: 'grid-container',
  item: 'grid-item',
}

const createBreakpoints = (props: GridProps) => {
  const breakpoints = Object.keys(props.size || {}) as GridBreakpointKeys[];
  const styles = breakpoints
    .map((breakpoint) => {
      if(!props.size || !(breakpoint in props.size)) {
        return null;
      }

      const size = props.size[breakpoint];

      if(!size) {
        return null;
      }

      const columns = props.columns || DEFAULT_COLUMNS;
      const width = (size * 100 / columns);
      const breakpointValue = (props.breakpoints && props.breakpoints[breakpoint]) || GridDefaultBreakpoints[breakpoint];

      return css({
        [`@media (min-width: ${breakpointValue}px)`]: {
          width: `${width}%`,
          flexBasis: `${width}%`,
        }
      })
  })
  .filter((breakpoint) => !!breakpoint);

  return styles;
};

export const GridWrapper = styled('div').attrs<ComponentWithCss<GridProps>>((props) => ({
  className: classNames(
    GRID_CLASSES.grid,
    {
      [GRID_CLASSES.container]: props.container,
      [GRID_CLASSES.item]: props.item,
    },
  ),
  item: props.item || false,
  container: props.container || false,
}))<ComponentWithCss<GridProps>>`
  &.${GRID_CLASSES.container} {
    display: flex;
    flex-wrap: wrap;
  }

  ${props => createBreakpoints(props)}
  ${props => props.css && css(props.css)}
`

// It's (a mui grid reference) how we can pass columns to children items;
const GridContext = React.createContext(DEFAULT_COLUMNS);

export const Grid = React.forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const columnsContext = React.useContext(GridContext);
  const columns = props.container ? props.columns || DEFAULT_COLUMNS : columnsContext;

  return (
    <GridContext.Provider value={columns}>
      <GridWrapper
        ref={ref}
        columns={columns}
        size={props.size}
        container={props.container || false}
        item={props.item || false}
        css={props.css}
      >
        { props.children }
      </GridWrapper>
    </GridContext.Provider>
  );
});