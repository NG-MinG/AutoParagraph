import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [data, setData] = useState({ input: '', max_length: 0 });
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/generate', { data: {
      input: data.input,
      max_length: data.max_length
      } }, {
        headers: {
          contentType: 'application/json'
        }
      })
    .then((res) => setResponse(res.data.message))
    .catch((err) => console.log(err));
  };

  const handleChange = (e) => { 
    setData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <h1>Auto Paragraph</h1>
      <form onSubmit={handleSubmit}>
        <textarea name='input' onChange={handleChange} placeholder='Paragraph'></textarea>
        <input type='number' name='max_length' onChange={handleChange} placeholder='max length' />
        <button type='submit'>Generate</button>
      </form>
      <div>{response}</div>
    </>
  );
}

export default App;
