import { TextInput } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  setBrand,
  selectMachineBrand,
} from '../state/MachineReducer'

/**
 * VMUI SetBrand Component
 * @author Vorachet Jaroensawas
 * @returns React component
 */
export default function SetBrand() {
  const dispatch = useDispatch();
  const machineBrand = useSelector(selectMachineBrand);

  return (<TextInput
    label="Brand"
    defaultValue={machineBrand}
    onChange={(event) => {
      dispatch(setBrand(event.target.value));
    }} />)
}
