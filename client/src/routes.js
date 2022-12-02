import Admin from './pages/Admin/Admin'
import Basket from './components/Basket/BasketCard'

import Shop from './pages/MainPage/Shop'
import Auth from './pages/Auth/Auth'
import ProguctPage from './pages/ProductPage/ProductPage'
import Register from './pages/Registration/RegisterPage'
import Location from './pages/LocationPage/Location'
import About from './pages/AboutUs/AboutUs'
import SimleProduct from './pages/SpecialProductPage/SimpleProductPage'
import RulesPage from './pages/RulesPage/Rules'

import { ADMIN_BADGE_ROUTE, ADMIN_BRANDANDTYPE_ROUTE, ADMIN_BUTTONS_ROUTE, ADMIN_COLORS_ROUTE, ADMIN_EXCEL_ROUTE, ADMIN_IMG_ROUTE, ADMIN_LOCATION_ROUTE, ADMIN_ORDER_ROUTE, ADMIN_PRODUCT_ROUTE, ADMIN_QUESTION_ROUTE, ADMIN_REVIEW_ROUTE, ADMIN_ROUTE, ADMIN_RULES_ROUTE, ADMIN_SIZE_ROUTE, ADMIN_SLIDER_ROUTE, ADMIN_STATISTIC_ROUTE, ADMIN_USER_ROUTE, BASKET_ROUTE, CHECKOUTING_ROUTE, CHECKOUT_ROUTE, FORGOT_PASSWORD_ROUTE, LIKES_ROUTER, LOGIN_ROUTE, NOTIFICATION_ROUTE, ORDERS_ROUTE, PRODUCT_ROUTE, QUESTION_ROUTE, REGISTRATION_ROUTE, RESET_PASSWORD_ROUTE, RULES_ROUTE, SHOP_ROUTE, USERPROFILE_ROUTE } from './utils/consts'
import { LOCATIONPLACES_ROUTE } from './utils/consts'
import { ABOUT_ROUTE } from './utils/consts'
import UserProfile from './pages/UserProfile/UserProfile'
import Checkouting from './pages/Checkout/Checkouting'
import ResultCheckout from './pages/Checkout/ResultCheckout'
import Order from './pages/Order/Order'
import AdminBrandAndType from './pages/Admin/AdminCatalog/BrandAndType/AdminBrandAndType'
import LikesPage from './pages/LikesPage/LikesPage'
import AdminProduct from './pages/Admin/AdminCatalog/Product/AdminProduct'
import AdminDocument from './pages/Admin/AdminCatalog/Document/AdminDocument'
import AdminOrder from './pages/Admin/AdminCatalog/Order/AdminOrder'
import AdminSlider from './pages/Admin/AdminCatalog/Slider/AdminSlider'
import AdminQuestion from './pages/Admin/AdminCatalog/Question/AdminQuestion'
import ReviewAdmin from './pages/Admin/AdminCatalog/Review/ReviewAdmin'
import SizeAdmin from './pages/Admin/AdminCatalog/SizeAdmin/SizeAdmin'
import BadgeAdmin from './pages/Admin/AdminCatalog/Badge/Badgeadmin'
import AdminColors from './pages/Admin/AdminCatalog/Colors/AdminColors'
import AdminButtons from './pages/Admin/AdminCatalog/Buttons/AdminButtons'
import AdminImage from './pages/Admin/AdminCatalog/AdminImage/AdminImage'
import AdminRules from './pages/Admin/AdminCatalog/Rules/AdminRules'
import QuestionPage from './pages/QuestionPage/QuestionPage'
import NotificationPage from './pages/NotificationPage/NotificationPage'
import AdminStatistic from './pages/Admin/AdminCatalog/Statistics/AdminStatistic'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ForgotPasswordIndividualPage from './pages/ForgotPassword/ForgotPasswordIndividualPage'
import LocationAdmin from './pages/Admin/AdminCatalog/Location/LocationAdmin'

export const authRoutes = [
    {
        path: BASKET_ROUTE,
        element: <Basket />
    },
    {
        path: USERPROFILE_ROUTE,
        element: <UserProfile />
    },
    {
        path: CHECKOUTING_ROUTE,
        element: <Checkouting />
    },
    {
        path: CHECKOUT_ROUTE,
        element: <ResultCheckout />
    },
    {
        path: ORDERS_ROUTE,
        element: <Order />
    },
    {
        path: LIKES_ROUTER,
        element: <LikesPage />
    },
    {
        path: NOTIFICATION_ROUTE,
        element: <NotificationPage />
    },
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        element: <Admin />
    },
    {
        path: ADMIN_REVIEW_ROUTE,
        element: <ReviewAdmin />
    },
    {
        path: ADMIN_BRANDANDTYPE_ROUTE,
        element: <AdminBrandAndType />
    },
    {
        path: ADMIN_PRODUCT_ROUTE,
        element: <AdminProduct />
    },
    {
        path: ADMIN_QUESTION_ROUTE,
        element: <AdminQuestion />
    },
    {
        path: ADMIN_SLIDER_ROUTE,
        element: <AdminSlider />
    },
    {
        path: ADMIN_ORDER_ROUTE,
        element: <AdminOrder />
    },
    {
        path: ADMIN_EXCEL_ROUTE,
        element: <AdminDocument />
    },
    {
        path: ADMIN_SIZE_ROUTE,
        element: <SizeAdmin />
    },
    {
        path: ADMIN_BADGE_ROUTE,
        element: <BadgeAdmin />
    },
    {
        path: ADMIN_COLORS_ROUTE,
        element: <AdminColors />
    },
    {
        path: ADMIN_BUTTONS_ROUTE,
        element: <AdminButtons />
    },
    {
        path: ADMIN_IMG_ROUTE,
        element: <AdminImage />
    },
    {
        path: ADMIN_RULES_ROUTE,
        element: <AdminRules />
    },
    {
        path: ADMIN_STATISTIC_ROUTE,
        element: <AdminStatistic />
    },
    {
        path: ADMIN_LOCATION_ROUTE,
        element: <LocationAdmin />
    },
]


export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        element: <Shop />
    },
    {
        path: FORGOT_PASSWORD_ROUTE,
        element: <ForgotPassword />
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
        path: RESET_PASSWORD_ROUTE + '/:token',
        element: <ForgotPasswordIndividualPage />
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
        path: QUESTION_ROUTE,
        element: <QuestionPage />
    },
]