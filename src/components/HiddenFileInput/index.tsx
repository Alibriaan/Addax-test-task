import styled from 'styled-components';

export const HiddenFileInput = styled.input.attrs((props) => ({
  type: 'file',
  ref: props.ref,
}))`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;