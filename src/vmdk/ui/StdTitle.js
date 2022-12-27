import { Divider, Text } from "@mantine/core";

/**
 * VMUI StdTitle Component
 * @author Vorachet Jaroensawas
 * @returns React component
 */
export default function StdTitle({title}) {
  return (
    <Text size="sm" weight={900} 
      color="dimmed">{title}<Divider/></Text>
  )
}
