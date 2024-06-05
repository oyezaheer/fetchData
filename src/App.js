// src/App.js
import React, { useState } from 'react';
import ItemList from './components/ItemList';
import { Container, Button, ButtonGroup } from '@mui/material';

const App = () => {
  const [apiType, setApiType] = useState('weather');

  return (
    <Container>
      <ButtonGroup variant="contained" color="primary">
        <Button onClick={() => setApiType('weather')}>Weather</Button>
        <Button onClick={() => setApiType('jsonPlaceholder')}>Posts</Button>
        <Button onClick={() => setApiType('dogAPI')}>Dog Images</Button>
      </ButtonGroup>
      <ItemList apiType={apiType} />
    </Container>
  );
};

export default App;
