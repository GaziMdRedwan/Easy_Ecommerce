import React, { useEffect, useState, Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppURL from '../api/AppURL';
import AboutPage from '../pages/AboutPage';
import CartPage from '../pages/CartPage';
import ContactPage from '../pages/ContactPage';
import FavouritePage from '../pages/FavouritePage';
import ForgetPasswordPage from '../pages/ForgetPasswordPage';
import HomePage from '../pages/HomePage';
import NotificationPage from '../pages/NotificationPage';
import PrivacyPage from '../pages/PrivacyPage';
import ProductCategoryPage from '../pages/ProductCategoryPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import ProductSubCategoryPage from '../pages/ProductSubCategoryPage';
import ProfilePage from '../pages/ProfilePage';
import PurchasePage from '../pages/PurchasePage';
import RefundPage from '../pages/RefundPage';
import RegisterPage from '../pages/RegisterPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import SearchPage from '../pages/SearchPage';
import UserLoginPage from '../pages/UserLoginPage';
import OrderListPage from '../pages/OrderListPage';
import axios from 'axios';
import NavMenuDesktop from '../components/common/NavMenuDesktop';

const AppRoute = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get(AppURL.UserData)
            .then((response) => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []); // Empty dependency array to mimic componentDidMount

    return (
        <Fragment>
            <NavMenuDesktop user={user} setUser={setUser} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<UserLoginPage user={user} setUser={setUser} />} />
                <Route path="/register" element={<RegisterPage user={user} setUser={setUser} />} />
                <Route path="/forget" element={<ForgetPasswordPage />} />
                <Route path="/reset/:id" element={<ResetPasswordPage />} />
                <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/purchase" element={<PurchasePage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/refund" element={<RefundPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/productdetails/:code" element={<ProductDetailsPage user={user} />} />
                <Route path="/notification" element={<NotificationPage />} />
                <Route path="/favourite" element={<FavouritePage user={user} />} />
                <Route path="/cart" element={<CartPage user={user} />} />
                <Route path="/productcategory/:category" element={<ProductCategoryPage />} />
                <Route path="/productsubcategory/:category/:subcategory" element={<ProductSubCategoryPage />} />
                <Route path="/productbysearch/:searchkey" element={<SearchPage />} />
                <Route path="/orderlist" element={<OrderListPage user={user} />} /> {/* Corrected this line */}
            </Routes>
        </Fragment>
    );
};

export default AppRoute;
