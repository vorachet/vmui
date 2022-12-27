import { Button, Group, List, Paper, ScrollArea } from '@mantine/core';
import stringify from 'json-stringify-pretty-compact';
import { useSelector, useDispatch } from 'react-redux';
import {
  purgeEvents,
  selectEventStream
} from '../state/EventStreamReducer';
import StdTitle from './StdTitle';

/**
 * VMUI EventStreamView Component
 * @author Vorachet Jaroensawas
 * @returns React component
 */
export default function EventStreamView() {
  const eventStream = useSelector(selectEventStream);
  const dispatch = useDispatch();

  function renderEvents(event) {
    return (
      <List.Item key={"t_" + event.time + "_n_" + event.name}>
        {event.time}, {event.name}, {stringify(event.data)}
      </List.Item>
    )
  }

  return (
    <Paper withBorder p={20}>
      <Group position="apart">
        <StdTitle title="Event Stream" />
        <Button size="xs" onClick={() => {
          dispatch(purgeEvents());
        }}>Purge</Button>
      </Group>

      <ScrollArea mt={20} style={{ height: "100%" }}>
        <List size="xs" type="ordered">
          {eventStream.map((e) => renderEvents(e))}
        </List>
      </ScrollArea>
    </Paper>)
}