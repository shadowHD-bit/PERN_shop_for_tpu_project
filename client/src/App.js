import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import {BrowserRouter} from 'react-router-dom'
import { Context } from '.';
import AppRouter from './components/AppRouter';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import {Spinner} from "react-bootstrap";
import { checkAuth, getData } from './http/userAPI';
import { getProductFromBasket } from './http/productAPI';
import { fetchSlider } from './http/sliderAPI';


const App = observer(() => {
  const {user, basket, slider} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth().then(data => {
        user.setUser(data)
        user.setIsAdmin(data.role == 'ADMIN' ? true : false)
        user.setIsAuth(true)
    }).finally(() => setLoading(false))
}, [])


useEffect(() => {
  fetchSlider().then((data) => {
    slider.setSlider(data);
  })
}, [loading, user.isAuth])

//Loading Basket
useEffect(() => {
  if(user.isAuth === false) {
      basket.setDeleteAllProductFromBasket();
      const savedBasket = JSON.parse(localStorage.getItem("basket"));
      for (let key in savedBasket) {
          basket.setBasket(savedBasket[key]);
      }
  } else if(user.isAuth === true){
      basket.setDeleteAllProductFromBasket();
      getProductFromBasket().then(data => {
          for (let key in data) {
              basket.setBasket(data[key], true);
          }
      })
  }
}, [basket, user.isAuth]);

if (loading) {
    return (
      <div style={{height: '100vh'}} className='d-flex justify-content-center align-items-center'>
        <h1 className='spinner__text'>To Be Sure Yourself....</h1>
        <Spinner animation="border" variant="danger" />
      </div>
    )
}

  return (
    <div>
      <BrowserRouter>
        <Header />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </div>
  );
})

export default App;
