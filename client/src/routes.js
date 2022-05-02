import Admin from './pages/Admin'
import Basket from './components/Basket/BasketCard'

import Shop from './pages/MainPage/Shop'
import Auth from './pages/Auth/Auth'
import ProguctPage from './pages/ProductPage/ProductPage'
import Register from './pages/Registration/RegisterPage'
import Location from './pages/LocationPage/Location'
import About from './pages/AboutUs/AboutUs'
import SimleProduct from './pages/SpecialProductPage/SimpleProductPage'
import RulesPage from './pages/RulesPage/Rules'

import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE, RULES_ROUTE, SHOP_ROUTE, USERPROFILE_ROUTE } from './utils/consts'
import { LOCATIONPLACES_ROUTE } from './utils/consts'
import { ABOUT_ROUTE } from './utils/consts'
import UserProfile from './pages/UserProfile/UserProfile'

export const authRoutes = [
    {
        path: BASKET_ROUTE,
        element: <Basket />
    },
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        element: <Admin />
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
        element: <SimleProduct />
    },
    {
        path: LOCATIONPLACES_ROUTE,
        element: <Location />
    },
    {
        path: ABOUT_ROUTE,
        element: <About />
    },
    {
        path: PRODUCT_ROUTE,
        element: <ProguctPage />
    },
    {
        path: RULES_ROUTE,
        element: <RulesPage />
    },
    {
        path: USERPROFILE_ROUTE,
        element: <UserProfile />
    },
]