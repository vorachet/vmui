import { VMUI } from "../vmdk/ui/VMUI"
import { VMSdk } from "../vmdk/VMSdk"
import { Code, Container, SimpleGrid } from "@mantine/core"
import ReactMarkdown from 'react-markdown'

const TRAY_MODEL = VMSdk.buildTrayModel("Simple Machine", [[10, 10], [10, 10]]);
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
 * VMUI SimpleMachine
 * @author Vorachet Jaroensawas
 * @returns React Component
 */
function SimpleMachine() {
  const doc = `## Simple Machine 
  ~~~
  import { VMUI } from "../vmdk/ui/VMUI"
  import { VMSdk } from "../vmdk/VMSdk"
  const TRAY_MODEL = VMSdk.buildTrayModel(
    "Simple Machine",
    [[10, 10], [10, 10]]);
  const DISPENSER_DB = {...}
  function SimpleMachine() {
    return (
      <VMUI.Assortment 
        trayModel={TRAY_MODEL}
        dispenserDB={DISPENSER_DB} />
      <VMUI.CashAcceptor />
      <VMUI.Pickup />
    )
  }
  ~~~
  `
  return (
    <Container fluid style={{minWidth: 1200}}>
      <SimpleGrid cols={4}>
        <Code><ReactMarkdown>{doc}</ReactMarkdown></Code>
        <VMUI.Assortment trayModel={TRAY_MODEL} dispenserDB={DISPENSER_DB} />
        <VMUI.CashAcceptor />
        <VMUI.Pickup />
      </SimpleGrid>
    </Container>
  );
}

export default SimpleMachine;


