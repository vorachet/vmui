import { Slider } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  setOutOfStockWarning,
  selectMachineOutOfStockWarning,
} from '../state/MachineReducer'

const outOfStockWarningScale = [
  { value: 0, label: '0' },
  { value: 3, label: '3' },
  { value: 5, label: '5' },
  { value: 10, label: '10' }
];

/**
 * VMUI OutOfStockWarningAdjustmentSlider Component
 * @author Vorachet Jaroensawas
 * @returns React component
 */
export default function OutOfStockWarningAdjustmentSlider() {
  const dispatch = useDispatch();
  const machineOutOfStockWarning = useSelector(selectMachineOutOfStockWarning);

  return (<Slider
    label={`Stock warn ${machineOutOfStockWarning} `}
    labelAlwaysOn
    style={{ width: "100%" }}
    defaultValue={machineOutOfStockWarning}
    min={outOfStockWarningScale[0].value}
    max={outOfStockWarningScale[outOfStockWarningScale.length - 1].value}
    onChange={(value) => {
      dispatch(setOutOfStockWarning(value));
    }}
  />)
}
