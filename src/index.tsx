import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Main from './components/Main';
import reportWebVitals from './reportWebVitals';
// Style
// import 'antd/dist/antd.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Suspense fallback={<></>}>
      <Main />
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
