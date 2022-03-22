import { Route, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'

function AppRouter() {
  const isAuth = false
  return (
    <Routes>
      {isAuth === true && authRoutes.map(({path, element}) =>
        <Route key={path} path={path} element={element} exact/>
      )}
      {publicRoutes.map(({path, element}) =>
        <Route key={path} path={path} element={element} exact/>
      )}
      
    </Routes>
  )
}

export default AppRouter