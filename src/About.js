import { Container, Image } from '@mantine/core';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import docPath from './About.md'

/**
 * About this project
 * @author Vorachet Jaroensawas
 * @returns React component
 */
export default function About() {
  const [doc, setDoc] = useState();
  const renderers = {
    image: () => (<Image style={{ width: 475 }} />),
  };
  useEffect(() => {
    fetch(docPath).then((response) => response.text()).then((text) => {
      setDoc(text);
    })
  }, [])

  return (
    <Container fluid>
      <ReactMarkdown renderers={renderers}>{doc}</ReactMarkdown>
    </Container>
  );
}