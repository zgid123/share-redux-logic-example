import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { StrictMode } from 'react';
import { Global } from '@emotion/react';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';
import reportWebVitals from './reportWebVitals';
import theme, { globalCss } from './constants/chakraTheme';

ReactDOM.render(
  <StrictMode>
    <ChakraProvider theme={theme} resetCSS={true}>
      <Global styles={globalCss} />
      <App />
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
