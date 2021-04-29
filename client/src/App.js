import './App.css';
import React, { useState, useEffect } from 'react';
import './socket';
import LoginModal from './Components/loginModal';
import TextChat from './Components/textChat.js';
import MediaContainer from './Components/mediaContainer';
import { Container, Box, Grid } from '@material-ui/core';

function App() {

  return (
    <>
    <div className="App">
      <body>
      <LoginModal/>
        <Grid className="content">
              <MediaContainer/>
              <TextChat/>
        </Grid>
      </body>
    </div>
    </>
  );
}

export default App;
