import { useSelector, useDispatch } from 'react-redux';
import {
  addCoin,
  clearKeypad,
  selectKeypadAvailableCoins,
  selectKeypadCoins,
  selectKeypadChange,
  selectKeypadTotal
} from '../state/CashAcceptorReducer';
import {
  selectMachineCurrency
} from '../state/MachineReducer';
import {
  addEvent,
} from '../state/EventStreamReducer';
import { Avatar, Button, Card, Center, Group, Text, Title } from '@mantine/core';
import useSound from 'use-sound';
import clickSound from '../sound/click.wav';
import coinSound from '../sound/coin.wav';
import coinDropSound from '../sound/coinDrop.wav';
import { useEffect } from 'react';
import StdTitle from './StdTitle';
import { formatNumber } from '../VMSdk'

/**
 * VMUI CashAcceptor Component
 * @author Vorachet Jaroensawas
 * @returns React component
 */
export default function CashAcceptor({ showTitle = true }) {
  const [soundClick] = useSound(clickSound);
  const [soundCoin] = useSound(coinSound);
  const [coindCoinDrop] = useSound(coinDropSound);
  const total = useSelector(selectKeypadTotal);
  const change = useSelector(selectKeypadChange);
  const coins = useSelector(selectKeypadCoins);
  const availableCoins = useSelector(selectKeypadAvailableCoins);
  const machineCurrency = useSelector(selectMachineCurrency);
  const dispatch = useDispatch();

  useEffect(() => {
    if (change > 0) coindCoinDrop();
  }, [change, coindCoinDrop])

  function tabToAddCoin(amount) {
    dispatch(addEvent({
      time: Date.now(),
      name: "addCoin" + amount,
      data: {
        amount: amount,
        currency: machineCurrency
      }
    }));
    dispatch(addCoin(amount));
    soundCoin();
  }

  return (
    <Card p={20}>
      {showTitle && <StdTitle title="Cash Acceptor" />}
      <Group position='center' my={20}>
        <Title order={4}>Total: {machineCurrency}{formatNumber(total)}</Title>
      </Group>

      {availableCoins.map(ac => (
        <Group my={10} position="apart" key={'coin' + ac}>
          <Avatar.Group spacing="sm">
            <Avatar
              radius="50%"
              size="lg"
              style={{ cursor: "pointer" }}
              onClick={() => tabToAddCoin(ac)}><Text size="sm">+{machineCurrency}{ac}</Text>
            </Avatar>
          </Avatar.Group>
          <Text weight={500}>{coins[ac]}</Text>
        </Group>
      ))}

      <Center>
        <Button fullWidth
          mt={20}
          variant='filled'
          style={{
            height: 60
          }}
          onClick={() => {
            soundClick();
            dispatch(clearKeypad());
          }}>Clear</Button>
      </Center>


    </Card>)
}