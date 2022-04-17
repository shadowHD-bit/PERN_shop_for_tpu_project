import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import {BrowserRouter} from 'react-router-dom'
import { Context } from '.';
import AppRouter from './components/AppRouter';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import {Spinner} from "react-bootstrap";
import { checkAuth } from './http/userAPI';


const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth().then(data => {
        user.setUser(data)
        user.setIsAdmin(data.role == 'ADMIN' ? true : false)
        user.setIsAuth(true)
        console.log(data)
    }).finally(() => setLoading(false))
}, [])

if (loading) {
    return <Spinner animation={"grow"}/>
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
