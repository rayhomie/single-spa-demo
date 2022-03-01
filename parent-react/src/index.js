import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import { registerApplication, start } from 'single-spa';
import './index.css';
import App from './App';
import Blog from './Blog';
import reportWebVitals from './reportWebVitals';

function loadScript(url) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  console.log(document.body);
  document.body.appendChild(script);
}

registerApplication(
  'childApp',
  async () => {
    // systemJS
    console.log('加载子应用');
    loadScript('//localhost:3000/static/js/bundle.js');
  },
  location => location.pathname.startsWith('/childApp')
);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Link to='/'>app</Link>
      <Link to='/blog'>blog</Link>
      <Link to='/childApp'>childApp</Link>
      <Routes>
        <Route exact path='/' element={<App />}></Route>
        <Route path='/blog' element={<Blog />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
