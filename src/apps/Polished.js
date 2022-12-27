import React from "react";
import { Card, Container, Grid, Group, SimpleGrid } from '@mantine/core';
import { VMUI } from "../vmdk/ui/VMUI"
import { VMSdk } from "../vmdk/VMSdk";
import StdTitle from "../vmdk/ui/StdTitle";

const TRAY_MODEL = VMSdk.buildTrayModel("Polished Machine", [
  [10, 10, 10, 10, 10],
  [5, 5, 5, 5, 5, 5],
  [1, 1]
]);
const DISPENSER_DB =
{
  "1-1": {
    "socket": "1-1",
    "limit": 10,
    "name": "Redbull",
    "price": 26,
    "image": "/images/redbull.png",
    "qty": 10
  },
  "1-2": {
    "socket": "1-2",
    "limit": 10,
    "name": "Redbull",
    "price": 26,
    "image": "/images/redbull.png",
    "qty": 10
  },
  "1-3": {
    "socket": "1-3",
    "limit": 10,
    "name": "Gum",
    "price": 26,
    "image": "/images/gum.png",
    "qty": 10
  },
  "1-4": {
    "socket": "1-4",
    "limit": 10,
    "name": "Snack",
    "price": 26,
    "image": "/images/snack.png",
    "qty": 10
  },
  "1-5": {
    "socket": "1-5",
    "limit": 10,
    "name": "Snack",
    "price": 40,
    "image": "/images/snack.png",
    "qty": 10
  },
  "2-1": {
    "socket": "2-1",
    "limit": 5,
    "name": "Cola",
    "price": 40,
    "image": "/images/cola.png",
    "qty": 5
  },
  "2-2": {
    "socket": "2-2",
    "limit": 5,
    "name": "Cola",
    "price": 40,
    "image": "/images/cola.png",
    "qty": 5
  },
  "2-3": {
    "socket": "2-3",
    "limit": 5,
    "name": "Snack",
    "price": 40,
    "image": "/images/snack.png",
    "qty": 5
  },
  "2-4": {
    "socket": "2-4",
    "limit": 5,
    "name": "Redbull",
    "price": 26,
    "image": "/images/redbull.png",
    "qty": 5
  },
  "2-5": {
    "socket": "2-5",
    "limit": 5,
    "name": "Cola",
    "price": 14,
    "image": "/images/gum.png",
    "qty": 5
  },
  "2-6": {
    "socket": "2-6",
    "limit": 5,
    "name": "Gum",
    "price": 37,
    "image": "/images/gum.png",
    "qty": 5
  },
  "3-1": {
    "socket": "3-1",
    "limit": 1,
    "name": "PC",
    "price": 800,
    "image": "/images/laptop.png",
    "qty": 1
  },
  "3-2": {
    "socket": "3-2",
    "limit": 1,
    "name": "iMac",
    "price": 1000,
    "image": "/images/computer.png",
    "qty": 1
  }
}

/**
 * VMUI Polished
 * @author Vorachet Jaroensawas
 * @returns React Component
 */
function Polished() {
  return (
    <Container style={{minWidth: 1200}}>
      <StdTitle title="A Polished Machine" />
      <Group position="apart">
        <Group>
          <VMUI.SetCurrency />
          <VMUI.SetPredefinedCoins />
        </Group>
        <Group>
          <VMUI.InventoryModalButton />
        </Group>
      </Group>
      <Card withBorder shadow="xl" style={{ background: "gray" }} my={10}>
        <Grid>
          <Grid.Col span={8}>
            <VMUI.Assortment
              showTitle={false}
              showSocket={false}
              trayModel={TRAY_MODEL}
              dispenserDB={DISPENSER_DB} />
          </Grid.Col>
          <Grid.Col span={4}>
            <SimpleGrid cols={2}>
              <VMUI.CashAcceptor showTitle={false} />
              <VMUI.Pickup showTitle={false}/>
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Card>      
    </Container>
  );
}

export default Polished;
