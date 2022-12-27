import { Button, Group, Modal, Textarea, Title } from '@mantine/core';
import { IconDatabase } from '@tabler/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  setTrayModelJSONViewOpened,
  selectMachineTrayModelJSONViewOpened,
  selectMachineTrayModel
} from '../state/MachineReducer'
import stringify from "json-stringify-pretty-compact";

/**
 * VMUI ViewTrayModelButton Component
 * @author Vorachet Jaroensawas
 * @returns React component
 */
export default function ViewTrayModelButton() {
  const dispatch = useDispatch();
  const machineTrayModelJSONViewOpened = useSelector(selectMachineTrayModelJSONViewOpened);
  const machineTrayModel = useSelector(selectMachineTrayModel);

  const trayModelJSONViewModal = <Modal
    size={"lg"}
    centered
    withCloseButton={false}
    title={<Title>Tray Model</Title>}
    opened={machineTrayModelJSONViewOpened}
    onClose={() => dispatch(setTrayModelJSONViewOpened(false))}
  >
    {machineTrayModel && (
      <Group>
        <Textarea
          minRows={20}
          style={{ width: "100%" }}
          readOnly
          value={stringify(machineTrayModel)} />
      </Group>
    )}
  </Modal>

  return (<>
    <Button
      leftIcon={<IconDatabase />}
      onClick={() => {
        dispatch(setTrayModelJSONViewOpened(true));
      }}>Tray Model</Button>
    {trayModelJSONViewModal}
  </>)
}
