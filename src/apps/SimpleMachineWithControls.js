import { VMUI } from "../vmdk/ui/VMUI"
import { VMSdk } from "../vmdk/VMSdk"
import { Code, Container, Paper, SimpleGrid, Stack } from "@mantine/core"
import ReactMarkdown from 'react-markdown'

const TRAY_MODEL = VMSdk.buildTrayModel(
  "Simple Machine", [[10, 10], [10, 10]]);
const DISPENSER_DB =
{
  "1-1": {
    "socket": "1-1",
    "limit": 10,
    "name": "Gum",
    "price": 12,
    "image": "/images/gum.png",
    "qty": 3
  },
  "1-2": {
    "socket": "1-2",
    "limit": 10,
    "name": "Snack",
    "price": 20,
    "image": "/images/snack.png",
    "qty": 3
  },
  "2-1": {
    "socket": "2-1",
    "limit": 10,
    "name": "Redbull",
    "price": 30,
    "image": "/images/redbull.png",
    "qty": 3
  },
  "2-2": {
    "socket": "2-2",
    "limit": 10,
    "name": "Cola",
    "descr": "Cola",
    "price": 40,
    "image": "/images/cola.png",
    "qty": 3
  }
}

/**
 * VMUI SimpleMachineWithControls
 * @author Vorachet Jaroensawas
 * @returns React Component
 */
function SimpleMachineWithControls() {
  const doc = `## Simple Machine with Controls 
  ~~~
  import { VMUI } from "../vmdk/ui/VMUI"
  import { VMSdk } from "../vmdk/VMSdk"
  const TRAY_MODEL = 
    VMSdk.buildTrayModel(
      "Simple Machine with Controls",
      [[10, 10], [10, 10]]);
  const DISPENSER_DB = {...}
  function SimpleMachine() {
    return (
      {/* Main Machine Components */}
      <VMUI.Assortment 
        trayModel={TRAY_MODEL}
        dispenserDB={DISPENSER_DB} />
      <VMUI.CashAcceptor />
      <VMUI.Pickup />

      {/* Controls */}
      <VMUI.InventoryModalButton />
      <VMUI.PlaygroundEditorModalButton />
      <VMUI.GenerateDispenserDBButton />
      <VMUI.ViewDispenserButton />
      <VMUI.ViewTrayModelButton />
      <VMUI.ImageSizeAdjustmentSlider />
      <VMUI.OutOfStockWarningAdjustmentSlider />
      <VMUI.SetCurrency />
      <VMUI.SetPredefinedCoins />
    )
  }
  ~~~`

  return (
    <Container fluid style={{ minWidth: 1200 }}>
      <SimpleGrid cols={4} spacing={10}>
        <Code><ReactMarkdown>{doc}</ReactMarkdown></Code>
        <VMUI.Assortment trayModel={TRAY_MODEL} dispenserDB={DISPENSER_DB} />
        <Stack spacing={5}>
          <VMUI.CashAcceptor />
          <VMUI.Pickup />
        </Stack>

        <Paper withBorder p={20}>
          <VMUI.Title title="Controls" />
          <Stack mt={10} my={20}>
            {/* Controls */}
            <VMUI.InventoryModalButton />
            <VMUI.PlaygroundEditorModalButton />
            <VMUI.GenerateDispenserDBButton />
            <VMUI.ViewDispenserButton />
            <VMUI.ViewTrayModelButton />
            <Paper mt={20} py={10}><VMUI.ImageSizeAdjustmentSlider /></Paper>
            <Paper mt={20} py={10}><VMUI.OutOfStockWarningAdjustmentSlider /></Paper>
            <VMUI.SetCurrency />
            <VMUI.SetPredefinedCoins />
            <VMUI.EventStreamView />
          </Stack>
        </Paper>
       


      </SimpleGrid>

    </Container>
  );
}

export default SimpleMachineWithControls;


