import React from 'react';
import { useState } from "react"
import './App.css';
import api from "../src/Service/api"

function App() {

  const [ link, setLink ] = useState("")

  async function handleOnClick(e: { preventDefault: () => void; }) {
    if (!link) return;

    console.log(link)

    const {data} = await api.post("/", {
      url: link
    })
  }


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Enter the link from the News that you want to be summarized
        </p>
        <input 
          type="text" 
          name="link" 
          id="link" 
          placeholder="Please, paste the link here" 
          value={link} 
          onChange={(e) => setLink(e.target.value)}
        />
        <button 
          type="button" 
          className="submit-summary" 
          onClick={handleOnClick}
        >
          Summarize the text 
        </button>

        
      </header>
    </div>
  );
}

export default App;
