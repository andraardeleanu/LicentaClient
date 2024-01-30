import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { store } from './utils/store';
import moment from 'moment';
import 'moment/locale/ro';

const root = ReactDOM.createRoot(document.getElementById('root'));
moment.locale('ro');
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
