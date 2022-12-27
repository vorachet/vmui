import { TextInput } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrency,
  selectMachineCurrency,
} from '../state/MachineReducer'

/**
 * VMUI SetCurrency Component
 * @author Vorachet Jaroensawas
 * @returns React component
 */
export default function SetCurrency() {
  const dispatch = useDispatch();
  const machineCurrency = useSelector(selectMachineCurrency);

  return (<TextInput
    label="Currency"
    defaultValue={machineCurrency}
    onChange={(event) => {
      dispatch(setCurrency(event.target.value));
    }} />)
}
