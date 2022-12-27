import { VMUI } from "../vmdk/ui/VMUI"
import { VMSdk } from "../vmdk/VMSdk"
import { Container, Grid, ScrollArea, Tabs, Text, Title } from "@mantine/core"

/**
 * VMUI ComponentsDemo
 * @author Vorachet Jaroensawas
 * @returns React Component
 */
function ComponentsDemo() {
  const comps = [
    {
      name: "PlaygroundEditorModalButton", comp: VMUI.PlaygroundEditorModalButton,
    },
    {
      name: "GenerateDispenserDBButton", comp: VMUI.GenerateDispenserDBButton,
    },
    {
      name: "InventoryModalButton", comp: VMUI.InventoryModalButton,
    },
    {
      name: "ViewDispenserButton", comp: VMUI.ViewDispenserButton,
    },
    {
      name: "ViewTrayModelButton", comp: VMUI.ViewTrayModelButton,
    },
    {
      name: "SetCurrency", comp: VMUI.SetCurrency,
    },
    {
      name: "SetPredefinedCoins", comp: VMUI.SetPredefinedCoins,
    },
    {
      name: "Pickup", comp: VMUI.Pickup,
    },
    {
      name: "CashAcceptor", comp: VMUI.CashAcceptor,
    },
    {
      name: "RefilInventory", comp: VMUI.RefilInventory,
    },
    {
      name: "EventStreamView", comp: VMUI.EventStreamView,
    },
    {
      name: "ImageSizeAdjustmentSlider", comp: VMUI.ImageSizeAdjustmentSlider,
    },
    {
      name: "OutOfStockWarningAdjustmentSlider", comp: VMUI.OutOfStockWarningAdjustmentSlider,
    },
  ];

  return (
    <Container fluid style={{minWidth: 1200}}>
      <Grid>
        <Grid.Col span={5}>
          <Title order={4} mb={10}>VMUI Components</Title>
          <Text size="sm" my={10}>
          Guide: Use the Playground Editor to experience the VMUI Tray Render Engine, 
          and then generate the Dispenser DB for installing products on the vending machine.
          Note that the collection of demo apps with this mini-project uses a shared Reducx store.
          </Text>
          <Tabs defaultValue={comps[0].name} orientation="vertical" variant="outline">
            <Tabs.List>
              {comps.map((c, idx) => (
                <Tabs.Tab value={c.name} key={'tab' + idx}>
                  <Text size="xs" color="dimmed">{c.name}</Text>
                </Tabs.Tab>))}
            </Tabs.List>
            {comps.map((c, idx) => (
            <Tabs.Panel value={c.name} px={20} 
              key={'panel' + idx}>
              <ScrollArea style={{ height: 600 }}>
                {c.comp({showTitle: true})}
              </ScrollArea>
            </Tabs.Panel>))}
          </Tabs>
        </Grid.Col>
        <Grid.Col span={7}>
          <fieldset>
            <legend><Text size="xs" color="dimmed">VMUI.Assortment</Text></legend>
            <VMUI.Assortment trayModel={TRAY_MODEL} />
          </fieldset>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default ComponentsDemo;

const TRAY_MODEL = VMSdk.buildTrayModel(
  "Components Demo", [
  [8, 8, 12, 12, 5, 5],
  [8, 8, 12, 12, 5, 5],
  [10, 10, 10, 10],
  [10, 10, 5, 5]
]);
