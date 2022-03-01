import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import { registerApplication, start } from 'single-spa';
import './index.css';
import App from './App';
import Blog from './Blog';

async function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// 主应用中注册子应用
registerApplication(
  'childApp', // childname
  async () => {
    // 加载子应用：这里通过加载webpack打包的umd模块的react代码，再return出子应用的生命周期
    // systemJS
    console.log('加载子应用');
    // 加载umd模块singleReact
    await loadScript('//localhost:3001/static/js/bundle.js');
    return window.singleReact;
  },
  location => location.pathname.startsWith('/childApp') // 匹配路径的函数
);

// 必须执行这个
start();

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
