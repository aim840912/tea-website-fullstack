import React from 'react';
import { Routes, Route } from 'react-router-dom'

import MainNavigation from './shared/components/Navigation/MainNavigation';

import HomePage from './user/pages/HomePage';

import Feedback from './user/pages/Feedback/Feedback';
import FeedbackList from './user/pages/Feedback/FeedbackList';

import Contact from './user/pages/Contact/Contact';
import ContactList from './user/pages/Contact/ContactList'

import TwitchLogin from './user/components/TwitchLogin';
import FacebookLogin from './user/components/FacebookLogin';
import Login from './user/components/Login';
import Testuploadimg from './user/components/Testuploadimg';

import BulletinDatail from './user/pages/Bulletin/BulletinDetail';
import BulletinList from './user/pages/Bulletin/BulletinList';
import NewBulletin from './user/pages/Bulletin/NewBulletin';
import UpdateBulletin from './user/pages/Bulletin/UpdateBulletin'

import ProductList from './user/pages/Product/ProductList';
import ProductDetail from './user/pages/Product/ProductDetail';
import NewProduct from './user/pages/Product/NewProduct'
import UpdateProduct from './user/pages/Product/UpdateProduct';

import Footer from './shared/components/Footer/Footer'

import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

function App() {
  const { token, login, logout, userId } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/twitchLogin" element={<TwitchLogin />}></Route>
          <Route path="/authenticate/facebook" element={<FacebookLogin />}></Route>

          <Route path="/feedback" element={<Feedback />}></Route>
          <Route path="/feedback/list" element={<FeedbackList />}></Route>

          <Route path="/bulletin/list" element={<BulletinList />}></Route>
          <Route path="/bulletin/new" element={<NewBulletin />}></Route>
          <Route path="/bulletin/:bulletinId" element={<BulletinDatail />}></Route>
          <Route path="/bulletin/update/:bulletinId" element={<UpdateBulletin />}></Route>

          <Route path="/contact/new" element={<Contact />}></Route>
          <Route path="/contact/list" element={<ContactList /> } exact></Route>
       

          <Route path="/product/list" element={<ProductList />}></Route>
          <Route path="/product/:productId" element={<ProductDetail />}></Route>
          <Route path="/product/update/:productId" element={<UpdateProduct />}></Route>
          <Route path="/product/new" element={<NewProduct />}></Route>

          <Route path="/testuploadimg" element={<Testuploadimg />}></Route>
        </Routes>
      </main>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
