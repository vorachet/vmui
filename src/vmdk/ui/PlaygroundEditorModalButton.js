import { Button, Drawer, Group, Textarea, Title } from '@mantine/core';
import { useDispatch } from 'react-redux';
import {
  setTrayModel,
} from '../state/MachineReducer'
import { showNotification } from '@mantine/notifications';
import { VMSdk } from "../VMSdk"
import { useState } from 'react';
import { IconSettings } from '@tabler/icons';
import stringify from 'json-stringify-pretty-compact';

/**
 * VMUI PlaygroundEditorModalButton Component
 * @author Vorachet Jaroensawas
 * @returns React component
 */
export default function PlaygroundEditorModalButton() {
  const dispatch = useDispatch();
  const [playgroundModel, setPlaygroundModel] = useState();
  const [playgroundViewOpened, setPlaygroundViewOpened] = useState();
  const [model, setModel] = useState();

  function installPlaygroundModel() {
    try {
      const pgTrayModel = VMSdk.buildTrayModel(
        "playground", JSON.parse(playgroundModel)
      )
      if (pgTrayModel.error) {
        showNotification({
          title: 'Machine Error',
          message: 'Invalid Tray Model',
          color: 'red',
        })
        return false;
      }
      dispatch(setTrayModel(pgTrayModel))
      showNotification({
        title: 'Playground Tray Model',
        message: 'Valid Tray Model',
      })
      return true;
    } catch (error) {
      showNotification({
        title: 'Machine Error',
        message: 'Invalid Tray JSON',
        color: 'red',
      })
      return false;
    }
  }

  function genereateTrayModel() {
    const trayModel = [
      Array(VMSdk.randomInt(1,8)).fill().map((_, i) => VMSdk.randomInt(5,24)),
      Array(VMSdk.randomInt(1,8)).fill().map((_, i) => VMSdk.randomInt(5,24)),
      Array(VMSdk.randomInt(1,8)).fill().map((_, i) => VMSdk.randomInt(5,24)),
      Array(VMSdk.randomInt(1,8)).fill().map((_, i) => VMSdk.randomInt(5,24))
    ];
    setModel(stringify(trayModel));
    const pgTrayModel = VMSdk.buildTrayModel("playground", trayModel)    
    dispatch(setTrayModel(pgTrayModel))
  }

  const playgroundDrawer = <Drawer
    opened={playgroundViewOpened}
    onClose={() => setPlaygroundViewOpened(false)}
    title={<Title order={2}>Playground Editor</Title>}
    padding="xl"
    size="xl"
    position="left"
    overlayOpacity={0.2}
  >
    <Group>
      <Textarea
        label={`Manually write your Tray Model`}
        placeholder="[[1], [1,1], [1,1,1]]"
        minRows={8}
        style={{ width: "100%" }}
        onChange={(event) => {
          setPlaygroundModel(event.target.value);
        }} />
      
      <Button onClick={() => {
        installPlaygroundModel();
      }}>Validate & Install</Button>
      <Button onClick={() => {
        genereateTrayModel();
      }}>Randomly Generate Tray Model</Button>
      {model && (
        <Textarea
          readOnly
          minRows={8}
          value={model}
          style={{ width: "100%" }}
        />
      )}
    </Group>
  </Drawer>

  return (<>
    <Button
      leftIcon={<IconSettings />}
      onClick={() => {
        setPlaygroundViewOpened(true);
      }}>
      Playground
    </Button>
    {playgroundDrawer}
  </>)
}
