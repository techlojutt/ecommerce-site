import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import toast, { Toaster } from 'react-hot-toast';
import './index.css'
import App from './App.jsx'
import { store } from './store/store.js'


createRoot(document.getElementById('root')).render(
<Provider store={store}>
  <BrowserRouter>
    <App />
    <Toaster />
  </BrowserRouter>
</Provider>  
)
