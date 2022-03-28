import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import {BrowserRouter} from 'react-router-dom'
import { Context } from '.';
import AppRouter from './components/AppRouter';
import Header from './components/Header/Header';
import {Spinner} from "react-bootstrap";
import { checkAuth } from './http/userAPI';


const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth().then(data => {
        user.setUser(true)
        user.setIsAuth(true)
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
      </BrowserRouter>
    </div>
  );
})

export default App;
