import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput]= useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  }
  return (
    <div className="root">
      <Head>
        <title>Writoor by @WholesomeBruh</title>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6366457075080576"
     crossorigin="anonymous"></script>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>HELLO, MATE</h1>
          </div>
          <div className="header-subtitle">
            <h2>Life’s good, you should get one.</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
           placeholder="Type your doubts...."
           className="prompt-box"
           value={userInput}
           onChange={onUserChangedText} 
          />
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
              {isGenerating ? <span class="loader"></span> : <p>Answer</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
          <div className="output">
            <div className='output-header-container'>
              <div className="output-header">
                <h3>Solution:</h3>
              </div>
            </div>  
          <div className="output-content">
            <p>{apiOutput}</p>
          </div>
          <div>
          <h3>Provided by <a href="https://twitter.com/WholesomeBruh" target= "_blank">@WholesomeBruh 😎</a></h3>
          </div>
        </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Home;
