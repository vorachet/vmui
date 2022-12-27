import { useSelector, useDispatch } from 'react-redux';
import {
  pickup,
  selectPickupItem,
} from '../state/PickupReducer';
import {
  addEvent,
} from '../state/EventStreamReducer';
import {
  clearKeypad,
  selectKeypadChange
} from '../state/CashAcceptorReducer';
import {
  selectMachineCurrency
} from '../state/MachineReducer';
import { Button, Card, Center, Group, Image, Paper, Title } from '@mantine/core';
import useSound from 'use-sound';
import pickupSound from '../sound/pickup.wav';
import thankyouSound from '../sound/thankyou.mp3';
import StdTitle from './StdTitle';
import { formatNumber } from '../VMSdk'

const TRUNK_HEIGHT = 200;

/**
 * VMUI Pickup Component
 * @author Vorachet Jaroensawas
 * @returns React component
 */
export default function Pickup({showTitle = true}) {
  const [soundPickup] = useSound(pickupSound);
  const [soundThankyou] = useSound(thankyouSound);
  const currency = useSelector(selectMachineCurrency);
  const keypadChange = useSelector(selectKeypadChange);
  const item = useSelector(selectPickupItem);
  const dispatch = useDispatch();

  function confirmPickup() {
    soundPickup();
    soundThankyou();
    dispatch(pickup());
    dispatch(clearKeypad());
    dispatch(addEvent({
      time: Date.now(),
      name: "pickup",
      data: {
        change: keypadChange,
        name: item.name,
        price: item.price,
        qty: item.qty
      }
    }));
  }

  return (
    <Card p={20}>
      { showTitle && <StdTitle title="Pickup"/>}
      <Group position="center" my={20}>
        <Title order={4}>Change: {currency}{formatNumber(keypadChange)}</Title>
        <Paper withBorder my={10} py={40}
          style={{
            minHeight: TRUNK_HEIGHT,
            width: "100%",
          }}>
          {item && (
            <Center>
              <Image alt="" src={item.image}
                style={{ width: 120, height: 120 }} />
            </Center>
          )}
        </Paper>

      </Group>
      {item && (
        <Button
          variant="filled"
          style={{
            height: 60
          }}
          onClick={confirmPickup} fullWidth>Pickup</Button>
      )}
    </Card>)
}