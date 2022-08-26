import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Main from './components/Main';
import { RecoilRoot } from 'recoil';
import reportWebVitals from './reportWebVitals';
// Style
import { createGlobalStyle } from 'styled-components';
// Style
const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Suspense fallback={<></>}>
        <GlobalStyle />
        <Main />
      </Suspense>
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
