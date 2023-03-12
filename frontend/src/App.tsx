import React from 'react';
import 'bulma/css/bulma.min.css';
import { useState } from "react"
import './App.css';
import api from "../src/Service/api"
import { Form, Button } from 'react-bulma-components';
import { Helmet } from 'react-helmet';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {

  const { Input, Field, Control, Label } = Form

  const [ link, setLink ] = useState("")
  const [ summary, setSummary ] = useState("")
  const [ password, setPassword ] = useState("")
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
        password: password,
      })
      setSummary(data)
      setPassword("")

    } catch (error) {
      console.log('Error:', error);
      notify()
    } finally {
      setLoading(false);
    }
  }
  const notify = () => {
    toast.error("An error ocurred. Try again.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored", 
    });
  };


  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Article Summarizer</title>
      </Helmet>
      <header>        
        <h1>Article Summarizer</h1>
      </header>
      <main className="App-main">
        <body>
          <Field>
            <Label className="text-label">
            Enter the link from the Article that you want to be summarized
            </Label>
            <Control>
              <Input
                className='input-text' 
                type="text" 
                name="link" 
                id="link" 
                placeholder="Please, paste the link here" 
                value={link} 
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setLink(e.target.value)}
              />
              <Input
                className='input-password' 
                type="password" 
                name="password" 
                id="password" 
                placeholder="Please, insert password" 
                value={password} 
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
              />
            </Control>
          </Field>
          <Button
            type="button" 
            className="button is-success" 
            onClick={handleOnClick}
            disabled={loading}
          >
            {loading ? 'Summarizing...' : 'Summarize'} 
          </Button>
          <ToastContainer autoClose={8000} />
          {summary && (
            <div className="summary-card">
                {summary}
            </div>
          )}
        </body> 
      </main>
      <footer className="App-footer">
        <p>Develop by <a href='https://github.com/brenogbestrella' target="_blank" rel="noreferrer">Breno Estrella</a></p>
      </footer>
    </div>
  );
}

export default App;
