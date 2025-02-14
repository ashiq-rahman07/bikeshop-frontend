import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
       <Provider store={store}>
        <div className="bg-gray-100 text-[#2D3436]  dark:bg-gray-950 dark:text-white duration-200">
          <App />
        </div>
        </Provider>
  </StrictMode>,
)
