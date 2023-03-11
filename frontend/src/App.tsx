import React from 'react';
import 'bulma/css/bulma.min.css';
import { useState } from "react"
import './App.css';
import api from "../src/Service/api"
import { Form, Button, Heading } from 'react-bulma-components';

function App() {

  const { Input, Field, Control, Label } = Form

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
        <Heading className="text-heading">         
          News Summarizer
        </Heading>
        <Field>
          <Label className="text-label">
          Enter the link from the News that you want to be summarized
          </Label>
          <Control>
            <Input 
              type="text" 
              name="link" 
              id="link" 
              placeholder="Please, paste the link here" 
              value={link} 
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setLink(e.target.value)}
            />
          </Control>
        </Field>
        <Button
          type="button" 
          className="button is-success" 
          onClick={handleOnClick}
          disabled={loading}
        >
          {loading ? 'Summarizing...' : 'Summarize the text'} 
        </Button>
        {summary && (
          <div className="summary-card">
              {summary}
          </div>
        )}

        
      </header>
    </div>
  );
}

export default App;
