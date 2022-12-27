import { Button, Group, Modal, Text, Textarea, Title } from '@mantine/core';
import { IconDatabase } from '@tabler/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  setDispenserJSONViewOpened,
  selectMachineDispenserJSONViewOpened,
} from '../state/MachineReducer'
import {
  selectInventoryDispenserDB
} from '../state/InventoryReducer'
import { showNotification } from '@mantine/notifications';
import stringify from "json-stringify-pretty-compact";

/**
 * VMUI ViewDispenserButton Component
 * @author Vorachet Jaroensawas
 * @returns React component
 */
export default function ViewDispenserButton() {
  const dispatch = useDispatch();
  const machineDispenserJSONViewOpened = useSelector(selectMachineDispenserJSONViewOpened);
  const inventoryDispenserDB = useSelector(selectInventoryDispenserDB);

  const dispenserDBJSONModal = <Modal
    size="lg"
    centered
    withCloseButton={false}
    title={<Title>Dispenser DB</Title>}
    opened={inventoryDispenserDB && machineDispenserJSONViewOpened}
    onClose={() => dispatch(setDispenserJSONViewOpened(false))}
  >
    {inventoryDispenserDB && (
      <Group>
        <Textarea
          minRows={20}
          style={{ width: "100%" }}
          readOnly
          value={stringify(inventoryDispenserDB)} />
      </Group>
    )}
  </Modal>

  return (<>
    {inventoryDispenserDB ? (
    <Button
      leftIcon={<IconDatabase />}
      onClick={() => {
        if (inventoryDispenserDB) {
          dispatch(setDispenserJSONViewOpened(true));
        } else {
          showNotification({
            title: 'Vending Machine',
            message: `Dispenser DB empty`,
            color: "red"
          });
        }
      }}>Dispenser DB</Button>
    ) : <Text size="xs" color="dimmed">No Dispenser DB</Text>}
    {dispenserDBJSONModal}
  </>)
}
