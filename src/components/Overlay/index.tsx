import styled from 'styled-components';

export const OVERLAY_CLASSES = {
  overlay: 'overlay',
};

export const Overlay = styled.div.attrs(() => ({
  className: OVERLAY_CLASSES.overlay,
}))`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;