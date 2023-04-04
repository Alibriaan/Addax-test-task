import { css, CssProp } from "styled-components"

export const ScrollbarStyles: CssProp = {
  '&::-webkit-scrollbar-track': {
    borderRadius: '10px',
    backgroundColor: '#2c2c2c00',
  },

  '&::-webkit-scrollbar': {
    width: '2px',
    height: '2px',
    backgroundColor: 'transparent',
  },

  '&::-webkit-scrollbar-thumb': {
    borderRadius: '10px',
    backgroundColor: '#cfcfcf',
  }
};

export const SccrollbarInterpolatedStyles = css(ScrollbarStyles);

export const HiddenScrollbarStyles: CssProp = {
  '&::-webkit-scrollbar': {
    display: 'none',
  },

  '&': {
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
  }
}

export const HiddenScrollbarInterpolatedStyles = css(HiddenScrollbarStyles);