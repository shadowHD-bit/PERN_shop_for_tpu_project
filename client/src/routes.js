import Admin from './pages/Admin'
import Basket from './pages/Basket'

import Shop from './pages/MainPage/Shop'
import Auth from './pages/Auth/Auth'
import ProguctPage from './pages/ProductPage'
import Register from './pages/Registration/RegisterPage'
import Location from './pages/LocationPage/Location'

import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from './utils/consts'
import { LOCATIONPLACES_ROUTE } from './utils/consts'

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        element: <Admin />
    },
    {
        path: BASKET_ROUTE,
        element: <Basket />
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        element: <Shop />
    },
    {
        path: LOGIN_ROUTE,
        element: <Auth />
    },
    {
        path: REGISTRATION_ROUTE,
        element: <Register />
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        element: <ProguctPage />
    },
    {
        path: LOCATIONPLACES_ROUTE,
        element: <Location />
    }
]