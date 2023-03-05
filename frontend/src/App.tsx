import React from 'react';
import { useState } from "react"
import './App.css';
import api from "../src/Service/api"

function App() {

  const [ link, setLink ] = useState("")
  const [ summary, setSummary ] = useState("")
  const [ loading, setLoading ] = useState(false)

  async function handleOnClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> 
  ) {
    e.preventDefault();
    if (!link) return;
  
    setLoading(true);
    try {
      const { data } = await api.post('/', {
        url: link,
      })
      console.log(typeof data)
      console.log(data.lenght)
      setSummary(data)
      // console.log(data, "data do frontend!")

    } catch (error) {
      console.log('Error:', error);
      alert('An error ocurred while summarizing the text. Please try again.');
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
        >
          {loading ? 'Summarizing...' : 'Summarize the text'} 
        </button>
        {summary && (
          <div style={{ backgroundColor: 'white', padding: '10px', color: 'black' }}>
            <p>{summary}</p>
          </div>
        )}

        
      </header>
    </div>
  );
}

export default App;
