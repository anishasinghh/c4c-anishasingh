// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormEvent, useState } from 'react';
import { useCallback } from 'react';
import styles from './app.module.css';
import axios from 'axios';
import { Button, Container, Heading, Input, UnorderedList, ListItem, Link } from '@chakra-ui/react';


import NxWelcome from './nx-welcome';

type Shortened = {
  original: string;
  short: string;
};


export function App() {
  const [urls, setUrls] = useState<Array<Shortened>>([]);
  const [inputUrl, setInputUrl] = useState<string>('');

  const onSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      const response = await axios.post(`http://localhost:3333/api/shorten`, {
        original: inputUrl,
      });
      const newUrl = response.data as Shortened;


      setUrls([newUrl, ...urls]);
      setInputUrl('');
      console.log(event);
    },
    [urls, setUrls, inputUrl, setInputUrl]
  );

  return (
    <Container maxW="lg" centerContent mt={8}>
      <Heading as="h1" mb={4}>My URL Shortener</Heading>
      <form onSubmit={onSubmit} style={{ width: '100%' }}>
        <Input
          value={inputUrl}
          onChange={(e) => {
            setInputUrl(e.target.value);
          }}
          placeholder="www.my-super-long-url-here.com/12345"
          backgroundColor='lightgray'
          color='black'
          borderRadius='4px' />
        <Button type="submit" colorScheme='purple' mt={4} w='100%'>Generate</Button>
      </form>

      <UnorderedList mt={8} width="100%" >
        {urls.map((u) => (
          <ListItem mb={4}>
            <Link href={u.short} color="teal" textDecoration="underline">
              {u.short}
            </Link>{' '}
            - {u.original}
          </ListItem>
        )
        )}
      </UnorderedList>
    </Container>
  );
}

export default App;

