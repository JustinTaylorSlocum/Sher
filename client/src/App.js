import './App.css';
import React, { useState, useEffect } from 'react';
import TextChat from './Components/textChat.js'
import './socket';

function App() {

  return (
    <div className="App">
      <body>
            <TextChat/>
      </body>
    </div>
  );
}

export default App;
