import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { store } from './utils/store';
import './utils/i18n.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <ChakraProvider>
        <Provider store={store}>
          <Suspense fallback={'loading'}>
            <App />
          </Suspense>
        </Provider>
      </ChakraProvider>
    </CookiesProvider>
  </React.StrictMode>
);
