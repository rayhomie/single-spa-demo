import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import singleSpaReact from 'single-spa-react';

// 通过single-spa-react工具快速构建子应用
const appOpts = {
  React,
  ReactDOM,
  rootComponent: App,
  errorBoundary(err, info, props) {
    // https://reactjs.org/docs/error-boundaries.html
    return <div>This renders when a catastrophic error occurs</div>;
  },
};

// 让子应用可以独立运行
const reactLifecycles = singleSpaReact(appOpts);
if (!window.singleSpaNavigate) {
  delete appOpts.rootComponent;
  ReactDOM.render(<App />, document.getElementById('root'));
}

// 导出主应用加载子应用时需要调的生命周期函数
export const bootstrap = reactLifecycles.bootstrap;
export const mount = reactLifecycles.mount;
export const unmount = reactLifecycles.unmount;
