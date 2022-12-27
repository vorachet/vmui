import { Button, Divider, Group, Header, Modal, Paper, Title } from "@mantine/core";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import useSound from 'use-sound';
import About from "./About";
import clickSound from './vmdk/sound/click.wav';

/**
 * Nav
 * @author Vorachet Jaroensawas
 * @returns React component
 */
export default function Nav() {
  const [soundClick] = useSound(clickSound);
  const [aboutOpended, setAboutOpened] = useState();
  const aboutModal = <Modal
    fullScreen
    centered
    title={<Title>About</Title>}
    opened={aboutOpended}
    onClose={() => setAboutOpened(false)}
  >
    <About />
  </Modal>

  return (
    <Paper>
      <Header py={5} px={10}>
        <Group position="apart">
          <Group>
            <Link to="/">
              <Button variant="subtle" size="lg" onClick={() => { soundClick() }}>VMUI</Button>
            </Link>
            <Divider orientation="vertical" />
            <Link to="/comps">
              <Button variant="subtle" onClick={() => { soundClick() }}>VMUI Components</Button>
            </Link>
            <Link to="/simpmach">
              <Button variant="subtle" onClick={() => { soundClick() }}>Write a Simple Machine</Button>
            </Link>
            <Link to="/simpmachwithctrls">
              <Button variant="subtle" onClick={() => { soundClick() }}>Write a Simple Machine with Controls</Button>
            </Link>
            <Link to="/polished">
              <Button variant="subtle" onClick={() => { soundClick() }}>A Polished Machine</Button>
            </Link>

          </Group>
          <Group>
            <Link to="/about">
              <Button variant="subtle" onClick={() => { soundClick() }}>About</Button>
            </Link>
          </Group>
        </Group>
      </Header>
      {aboutModal}
      <Paper p={10}><Outlet /></Paper>
    </Paper>
  );
}