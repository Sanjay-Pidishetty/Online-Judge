import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState(`
    // Include the input/output stream library
    #include <iostream> 
  
    // Define the main function
    int main() { 
        // Output "Hello World!" to the console
        std::cout << "Hello World!"; 
        
        // Return 0 to indicate successful execution
        return 0; 
    }`);
    const [output, setOutput] = useState('');
  
    const handleSubmit = async () => {
      const payload = {
        language: 'cpp',
        code
      };
  
      try {
        const { data } = await axios.post('http://localhost:5000/run', payload);
        console.log(data);
        setOutput(data.output);
      } catch (error) {
        console.log(error.response);
      }
    }
  return (
    <>
      <div>
      <h1>Online Code Compiler</h1>
      <select>
        <option value='cpp'>C++</option>
        <option value='c'>C</option>
        <option value='py'>Python</option>
        <option value='java'>Java</option>
      </select>
      <br />
      {<div style={{ height: '300px', overflowY: 'auto' }}>
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            outline: 'none',
            border: 'none',
            backgroundColor: '#f7fafc',
            height: '100%',
            overflowY: 'auto'
          }}
        />
      </div>}

      <button onClick={handleSubmit} type="button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 me-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
        </svg>
        Run
      </button>

      {output &&
        <div>
          <p style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}>{output}</p>
        </div>
      }
    </div>
    </>
  )
}

export default App
