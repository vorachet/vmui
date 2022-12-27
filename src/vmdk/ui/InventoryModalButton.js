import { Button, Modal, Title } from '@mantine/core';
import { IconTable } from '@tabler/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  setInventoryViewOpened,
  selectMachineInventoryViewOpened,
} from '../state/MachineReducer'
import {
  selectInventoryDispenserDB
} from '../state/InventoryReducer'
import RefilInventory from './RefilInventory';
import { showNotification } from '@mantine/notifications';

/**
 * VMUI InventoryModalButton Component
 * @author Vorachet Jaroensawas
 * @returns React component
 */
export default function InventoryModalButton() {
  const dispatch = useDispatch();
  const inventoryDispenserDB = useSelector(selectInventoryDispenserDB);
  const machineInventoryViewOpened = useSelector(selectMachineInventoryViewOpened);

  const inventoryModal = <Modal
    fullScreen
    centered
    title={<Title>Inventory</Title>}
    opened={machineInventoryViewOpened}
    onClose={() => dispatch(setInventoryViewOpened(false))}
  >
    <RefilInventory />
  </Modal>

  return (<>
    <Button
      leftIcon={<IconTable />}
      onClick={() => {
        if (!inventoryDispenserDB) {
          return showNotification({
            title: 'Machine Error',
            message: 'No Dispenser DB',
            color: 'red',
          })
        }
        dispatch(setInventoryViewOpened(true))
      }}>
      Inventory
    </Button>
    {inventoryModal}
  </>)
}
