import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setTrayModel,
  selectMachineTrayModel,
  selectMachineIsOwnerMode,
  selectMachineCurrency,
  selectMachineImageSize,
} from '../state/MachineReducer';
import { setDispenserDB, selectInventoryDispenserDB } from '../state/InventoryReducer';
import { check, selectKeypadTotal } from '../state/CashAcceptorReducer';
import { deductInventory } from '../state/InventoryReducer';
import { setPickupItem } from '../state/PickupReducer';
import { addEvent } from '../state/EventStreamReducer';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Image,
  Modal,
  Paper,
  Stack,
  Text,
  Title
} from '@mantine/core';
import useSound from 'use-sound';
import clickSound from '../sound/click.wav';
import pickupSound from '../sound/pickup.wav';
import StdTitle from './StdTitle';
import { formatNumber } from '../VMSdk'

/**
 * VMUI Assortment Component
 * @author Vorachet Jaroensawas
 * @returns React component
 */
export default function Assortment({ trayModel, dispenserDB, trayOnly, showSocket = true, showTitle = true }) {
  const [soundClick] = useSound(clickSound);
  const [soundPickup] = useSound(pickupSound);
  const dispatch = useDispatch();
  const machineTrayModel = useSelector(selectMachineTrayModel);
  const machineIsOwnerMode = useSelector(selectMachineIsOwnerMode);
  const machineCurrency = useSelector(selectMachineCurrency);
  const machineImageSize = useSelector(selectMachineImageSize);
  const inventoryDispenserDB = useSelector(selectInventoryDispenserDB);
  const keypadTotal = useSelector(selectKeypadTotal);
  const [productDetailModalOpened, setProductDetailModalOpened] = useState()
  const [selectedDispenserDBItem, setSelectedDispenserDBItem] = useState()
  const [runtimeDispenserDB, setRuntimeDispenserDB] = useState({})

  useEffect(() => {
    if (trayModel) dispatch(setTrayModel(trayModel))
  }, [trayModel, dispatch])

  useEffect(() => {
    if (dispenserDB) dispatch(setDispenserDB(dispenserDB))
  }, [dispenserDB, dispatch])


  function selectProduct(socket) {
    soundClick();
    setSelectedDispenserDBItem(inventoryDispenserDB[socket.socket]);
  }

  useEffect(() => {
    if (inventoryDispenserDB) {
      const selections = Object.keys(inventoryDispenserDB).length
      if (selections > 0) {
        setRuntimeDispenserDB(inventoryDispenserDB);
      }
    }
  }, [inventoryDispenserDB])

  function isBuyable(socket) {
    if (!socket) return false;
    const dispenser = runtimeDispenserDB[socket.socket];
    if (!dispenser) return false;
    return keypadTotal >= dispenser.price && dispenser.qty > 0;
  }

  const tray2Grid = (<Paper mt={10}>
    {machineTrayModel ? (
      <>
        {machineTrayModel.rowsContent.map((r) => (
          <Card key={"trayRow" + r.row}>
            <Grid grow >
              {r.sockets.map((s) => (
                <Grid.Col key={"socket" + s.socket} span="content">{socketToGridContent(s)}</Grid.Col>
              ))}
            </Grid>
          </Card>
        ))}
      </>
    ) : (<Text size="sm" color="red">No Machine Model</Text>)}

  </Paper>)

  function socketToGridContent(socket) {
    const dispenser = runtimeDispenserDB[socket.socket];
    const outOfStock = dispenser ? (dispenser.qty === 0) : true;
    return (
      <Group position="center" grow>
        <Card
          withBorder={!trayOnly && isBuyable(socket)}
          style={{
            minHeight: 70,
            background: isBuyable(socket) ? "green" : ""
          }} >
          {!trayOnly && dispenser && (
            <Card.Section p={10}>
              <Center>
                <Text weight={900} color={isBuyable(socket) ? "white" : ""}>
                  {dispenser.name}
                  {outOfStock && (
                    <>
                      <Divider />
                      <Text size="xs" color="red" weight={600}>Out of stock</Text>
                    </>
                  )}
                </Text>

              </Center>
            </Card.Section>
          )}
          <Card.Section p={5}>
            <Center>
              {dispenser && !trayOnly
                ? (<Image
                  src={dispenser.image}
                  style={{
                    opacity: outOfStock ? 0.1 : 1,
                    minHeight: machineImageSize > 50 ? machineImageSize : machineImageSize
                  }}
                  width={machineImageSize}
                  color="dark" />
                )
                : (
                  <Avatar
                    size={machineImageSize}
                    mt={20}
                    radius="50%"
                    color="dark">{socket.limit}</Avatar>
                )
              }

            </Center>
          </Card.Section>

          {dispenser && !trayOnly && (
            <Card.Section p={10}>
              <Center>
                <Badge
                  onClick={() => {
                    if (isBuyable(socket)) {
                      selectProduct(socket);
                      setProductDetailModalOpened(true);
                    }
                  }}
                  style={{ cursor: isBuyable(socket) ? "pointer" : "" }}
                  size={isBuyable(socket) ? "md" : "sm"}
                  variant={isBuyable(socket) ? "filled" : "outline"}
                >{isBuyable(socket) ? "Buy" : ""} {machineCurrency}{formatNumber(dispenser.price)}</Badge>
              </Center>
            </Card.Section>
          )}

          {showSocket && (
            <Card.Section p={10}>
              <Center>
                <Text size="xs">
                  <Divider />{socket.socket}
                </Text>
              </Center>
            </Card.Section>
          )}

        </Card>
      </Group >
    )
  }

  const buyModal = <Modal
    size="lg"
    centered
    withCloseButton={false}
    opened={productDetailModalOpened}
    onClose={() => setProductDetailModalOpened(false)}
  >
    {selectedDispenserDBItem && (
      <>
        <Group position='apart' grow>
          <Image src={selectedDispenserDBItem.image} width={200} />
          <Stack>
            <Text size="xl" transform="uppercase" weight={700} color="dimmed">
              {selectedDispenserDBItem.name} <Divider /> {machineCurrency} {selectedDispenserDBItem.price}
            </Text>
            <Button
              variant="filled"
              color="green"
              style={{
                height: 40
              }}
              onClick={() => {
                soundPickup();
                dispatch(deductInventory(selectedDispenserDBItem.socket));
                dispatch(setPickupItem(selectedDispenserDBItem));
                dispatch(check(selectedDispenserDBItem.price));
                dispatch(addEvent({
                  time: Date.now(),
                  name: "buy",
                  data: selectedDispenserDBItem
                }));
                setProductDetailModalOpened(false);
              }}>Buy</Button>
          </Stack>

        </Group>

      </>
    )}
  </Modal>

  if (!machineTrayModel) {
    return (
      <Title order={4} align='center' color="red">No Tray Model</Title>
    )
  }

  return (
    <Card p={20}>
      {showTitle && <StdTitle title="Assortment" />}
      {!trayOnly && (
          <Group position='apart'>
            <Group>
              <Text size="sm" color="dimmed">{machineTrayModel.model} </Text>
              <Divider orientation='vertical' size="xs" />
              <Text size="sm" color="dimmed">Capacity Units = {machineTrayModel.capacityUnits}</Text>
              <Text size="sm" color="dimmed">Selections = {machineTrayModel.selections}</Text>
              <Text size="sm" color="dimmed">Trays = {machineTrayModel.rows}</Text>
            </Group>
            <Group>
              {machineIsOwnerMode && (<Badge>Owner Mode</Badge>)}
            </Group>
          </Group>
      )}
      {tray2Grid}
      {buyModal}
    </Card>)
}