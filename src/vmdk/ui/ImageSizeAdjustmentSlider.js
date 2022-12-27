import { Slider } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  setImageSize,
  selectMachineImageSize,
} from '../state/MachineReducer'

const imageSizeScale = [
  { value: 35, label: 'sm' },
  { value: 65, label: 'md' },
  { value: 80, label: 'lg' }
];

/**
 * VMUI ImageSizeAdjustmentSlider Component
 * @author Vorachet Jaroensawas
 * @returns React component
 */
export default function ImageSizeAdjustmentSlider() {
  const dispatch = useDispatch();
  const machineImageSize = useSelector(selectMachineImageSize);

  return (<Slider
    label={`Img size ${machineImageSize} `}
    labelAlwaysOn
    style={{ width: "100%" }}
    defaultValue={machineImageSize}
    min={imageSizeScale[0].value}
    max={imageSizeScale[imageSizeScale.length - 1].value}
    onChange={(value) => {
      dispatch(setImageSize(value));
    }}></Slider>)
}
