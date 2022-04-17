import { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Context } from '..'
import { authRoutes, publicRoutes, adminRoutes } from '../routes'

function AppRouter() {
  const {user} = useContext(Context)
  return (
    <Routes>
      {user.isAuth === true && authRoutes.map(({path, element}) =>
        <Route key={path} path={path} element={element} exact/>
      )}
      {user.isAuth === true && user.isAdmin === true && adminRoutes.map(({path, element}) =>
        <Route key={path} path={path} element={element} exact/>
      )}
      {publicRoutes.map(({path, element}) =>
        <Route key={path} path={path} element={element} exact/>
      )}
      <Route path="*" element={<Navigate to="/" replace />}/>
    </Routes>
  )
}

export default AppRouter