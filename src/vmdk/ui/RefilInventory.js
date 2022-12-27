import { useSelector, useDispatch } from 'react-redux';
// Reducers
import {
  deductInventory,
  refilInventory,
  selectInventoryDispenserDB
} from '../state/InventoryReducer';
import {
  selectMachineCurrency,
  selectMachineOutOfStockWarning
} from '../state/MachineReducer';
// App stuff
import {
  ActionIcon,
  Avatar,
  Card,
  Center,
  Divider,
  Group,
  Image,
  Paper,
  ScrollArea,
  Text,
  Title
} from '@mantine/core';
import { IconAlertCircle, IconMinus, IconPlus } from '@tabler/icons';
import useSound from 'use-sound';
import clickSound from '../sound/click.wav';

const STOCK_MIN_ITEMS_DISPLAY = 3;
const STOCK_IMAGE_WIDTH = 40;
const CARD_MIN_WIDTH = 250;
const CARD_MIN_HEIGHT = 180;
const OUTOFSTOCK_COLOR = "orange";
const WARN_COLOR = "yellow";

/**
 * VMUI RefilInventory Component
 * @author Vorachet Jaroensawas
 * @returns React component
 */
export default function RefilInventory() {
  const inventoryDispenserDB = useSelector(selectInventoryDispenserDB);
  const machineCurrency = useSelector(selectMachineCurrency);
  const machineOutOfStockWarning = useSelector(selectMachineOutOfStockWarning);
  const dispatch = useDispatch();
  // Sounds
  const [soundClick] = useSound(clickSound);

  function fillImages(qty, src) {
    const isGreaterThanFive = qty > STOCK_MIN_ITEMS_DISPLAY;
    const diff = isGreaterThanFive ? qty - STOCK_MIN_ITEMS_DISPLAY : 0
    return (
      <>
        {Array(isGreaterThanFive ? STOCK_MIN_ITEMS_DISPLAY : qty).fill().map((_, i) => (
          <Image src={src} style={{ width: STOCK_IMAGE_WIDTH }} key={'disImg' + i} />
        ))}
        {diff > 0 && (
          <Avatar radius="50%" color="gray.6" variant="outline">
            <Text weight={300}>+{diff}</Text></Avatar>
        )}
      </>
    )
  }

  function createNumberInput(key) {
    const outOfStock = inventoryDispenserDB[key].qty === 0;
    const warningNeeded = inventoryDispenserDB[key].qty <= machineOutOfStockWarning;
    const disabledMinusBtn = inventoryDispenserDB[key].qty <= 0;
    const disabledPlusBtn = inventoryDispenserDB[key].qty >= inventoryDispenserDB[key].limit;
    return (
      <Card key={'socket' + key} shadow="xs" withBorder
        p={10}
        style={{
          minWidth: CARD_MIN_WIDTH,
          minHeight: CARD_MIN_HEIGHT,
          background: warningNeeded ? (outOfStock ? OUTOFSTOCK_COLOR : WARN_COLOR) : ""
        }}>
        <Text size="xs" color={warningNeeded ? "red" : "dimmed"}>
          {warningNeeded ? <IconAlertCircle color="red" stroke={2} size={20} /> : ""}
          Socket {key}
          <Divider />
        </Text>

        <Group position="apart">
          <Text size="xs" color="dimmed">
            {inventoryDispenserDB[key].name} ({machineCurrency}{inventoryDispenserDB[key].price}/unit)</Text>
          <Text size="xs" color="dimmed">
            Qty: {inventoryDispenserDB[key].qty}/{inventoryDispenserDB[key].limit}
          </Text>
        </Group>
        <Group noWrap p={10} style={{ minHeight: 100 }}>
          {inventoryDispenserDB[key].qty === 0 && (
            <Title order={5} align="center">No Items</Title>
          )}
          {fillImages(inventoryDispenserDB[key].qty, inventoryDispenserDB[key].image)}
        </Group>
        <Group position='apart'>
          {!disabledMinusBtn && (
            <ActionIcon size='xs' variant="filled"
              onClick={() => {
                soundClick();
                dispatch(deductInventory(key));
              }}><IconMinus /></ActionIcon>
          )}

          {!disabledPlusBtn && (
            <ActionIcon size='xs' variant="filled"
              onClick={() => {
                soundClick();
                dispatch(refilInventory(key));
              }}><IconPlus /></ActionIcon>
          )}

        </Group>

      </Card>
    )
  }

  return (
    <Paper>
      <ScrollArea style={{ height: "100%", width: "100%" }}>
        {inventoryDispenserDB ? (
          <Group>
            {Object.keys(inventoryDispenserDB).map((key) => createNumberInput(key))}
          </Group>
        ) : (
          <Center>
            <Text size="sm" color="red">No Dispenser DB</Text>
          </Center>
        )}
      </ScrollArea>
    </Paper>
  )
}