import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectMachineTrayModel,
} from '../state/MachineReducer'
import {
  setDispenserDB,
} from '../state/InventoryReducer'
import { showNotification } from '@mantine/notifications';
import { VMSdk } from "../VMSdk"

/**
 * VMUI GenerateDispenserDBButton Component
 * @author Vorachet Jaroensawas
 * @returns React component
 */
export default function GenerateDispenserDBButton() {
  const dispatch = useDispatch();
  const machineTrayModel = useSelector(selectMachineTrayModel);

  function generateDispenderDB() {
    createDispenserDB(true);
  }

  function createDispenserDB(generate = false) {
    if (!machineTrayModel) {
      return showNotification({
        title: 'Machine Error',
        message: 'Tray model must be installed',
        color: 'red',
      })
    }
    const dbkv = VMSdk.createDispenserDB(machineTrayModel, generate);
    console.log("dbkv", dbkv)
    dispatch(setDispenserDB(dbkv));
  }

  return (<>
    <Button
      leftIcon={<IconPlus />}
      onClick={() => {
        generateDispenderDB();
      }}>Generate Dispenser DB</Button>
  </>)
}