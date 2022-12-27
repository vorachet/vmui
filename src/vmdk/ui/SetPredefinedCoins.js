import { MultiSelect } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectMachineCurrency,
} from '../state/MachineReducer'
import {
  addCoinType,
  setCoinType,
  selectKeypadAvailableCoins,
} from '../state/CashAcceptorReducer'
import { showNotification } from '@mantine/notifications';
import { formatNumber } from '../VMSdk'

const MAX_AMOUNT = 5000;

/**
 * VMUI SetPredefinedCoins Component
 * @author Vorachet Jaroensawas
 * @returns React component
 */
export default function SetPredefinedCoins() {
  const dispatch = useDispatch();
  const machineCurrency = useSelector(selectMachineCurrency);
  const cashAcceptorAvailableCoins = useSelector(selectKeypadAvailableCoins);

  return (<MultiSelect
    label="Accepted Coins"
    data={cashAcceptorAvailableCoins.map(c => {
      return {
        value: "" + c,
        label: machineCurrency + formatNumber(c)
      }
    })}
    defaultValue={cashAcceptorAvailableCoins.map(c => "" + c)}
    creatable
    searchable
    getCreateLabel={(query) => `+ Create ${query}`}
    onChange={(arrayOfSelectValues) => {
      dispatch(setCoinType(arrayOfSelectValues));
    }}
    onCreate={(query) => {
      const newNumberValue = parseInt(query)
      if (newNumberValue > MAX_AMOUNT) {
        return showNotification({
          title: 'Machine Error',
          message: `${query} must be less than ${formatNumber(MAX_AMOUNT)}`,
          color: 'red',
        })
      }
      dispatch(addCoinType(newNumberValue));
      return {
        value: "" + newNumberValue,
        label: machineCurrency + newNumberValue
      }

    }}
  />)
}
