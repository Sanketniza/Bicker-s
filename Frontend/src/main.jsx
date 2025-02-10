import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Use BrowserRouter from react-router-dom
import './index.css';
import App from './App.jsx';

import { store } from './store/store';
import { Provider } from 'react-redux';
// import { Toaster } from './components/ui/sonner';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        {/* <Toaster /> */}
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);