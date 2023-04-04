import { useEffect, useRef, useState } from 'react';
import { Color, ColorResult, TwitterPicker } from 'react-color';
import styled from 'styled-components';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { ColorSquare } from '../ColorSquare';

export interface ColorPickerProps {
  color?: string;
  onChange?: (color: ColorResult) => void;
}

interface ColorPickerContainerProps {
  isVisible: boolean;
}

export const COLLOR_PICKER_CLASSES = {
  colorPicker: 'color-picker',
};


const CollorPickerWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const ColorPickerContainer = styled.div<ColorPickerContainerProps>`
  position: absolute;
  top: 150%;
  left: 0%;
  z-index: 1;
  opacity: ${props => props.isVisible ? 1 : 0};
  pointer-events: ${props => props.isVisible ? 'all' : 'none'};
  transition: opacity 0.2s ease-in-out;
`;

export function ColorPicker(props: ColorPickerProps) {
  const [ colorPickerVisibility, setColorPickerVisibility ] = useState(false);
  const [ color, setColor ] = useState<Color>('');
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const toggleCollorPickerVisibility = () => {
    setColorPickerVisibility(!colorPickerVisibility);
  };

  const closeColorPicker = () => setColorPickerVisibility(false);

  const onChange = (color: ColorResult) => {
    props.onChange && props.onChange(color);
    setColor(() => color.hex);
  };

  useOutsideClick(colorPickerRef, closeColorPicker);

  useEffect(() => {
    if(props.color) {
      setColor(props.color);
    }
  }, [props])

  return (
      <CollorPickerWrapper ref={colorPickerRef} className={COLLOR_PICKER_CLASSES.colorPicker}>
        <ColorSquare
          className='collor-square'
          onClick={toggleCollorPickerVisibility}
          color={color.toString()}
        >
        </ColorSquare >
        <ColorPickerContainer isVisible={colorPickerVisibility}>
          <TwitterPicker onChange={onChange} color={color} /> 
        </ColorPickerContainer>
      </CollorPickerWrapper>
  )
}