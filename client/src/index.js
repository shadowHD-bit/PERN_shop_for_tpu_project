import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ProductStore from './store/ProductStore';
import UserStore from './store/UserStore'
import './index.scss'
import BasketStoreStore from './store/BasketStore';
import SliderStore from './store/SliderStore';

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        product: new ProductStore(),
        basket: new BasketStoreStore(),
        slider: new SliderStore(),
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);

