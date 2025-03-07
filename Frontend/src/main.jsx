import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { store } from './store/store'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner';
// import { Toaster } from 'react-hot-toast';

// void the login at every render or reload
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
const persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
    <StrictMode >
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
                <Toaster />
            </PersistGate>
        </Provider>
    </StrictMode>,
)