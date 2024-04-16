import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PrivateRoute from '@/components/PrivateRoute';
import Sidebar from '@/components/Sidebar';
import ScreensCart from './Cart';
import ScreensHome from './Home';
import ScreensLogin from './Login';
import ScreensNotFound from './NotFound';
import ScreensProductCreate from './Product/Create';
import ScreensProductEdit from './Product/Edit';
import ScreensProduct from './Product/Product';
import ScreensProfileEdit from './Profile/Edit';
import ScreensProfile from './Profile/Profile';
import ScreensRegister from './Register';
import ScreensShopCreate from './Shop/Create';
import ScreensShopEdit from './Shop/Edit';
import ScreensShopList from './Shop/List';
import ScreensShopMyList from './Shop/MyList';
import ScreensShop from './Shop/Shop';

const ScreensRoot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative bg-light">
      {/*  Sidebar  */}
      <Sidebar closeSidebar={() => setIsOpen(false)} isOpen={isOpen} />

      <main className="min-h-screen flex flex-col">
        {/* Header */}
        <Header openSidebar={() => setIsOpen(true)} />

        {/* Main */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<ScreensHome />} />
            <Route path="/shops/all" element={<ScreensShopList />} />
            <Route path="/shops/:shopId" element={<ScreensShop />} />
            <Route path="/cart" element={<ScreensCart />} />
            <Route path="/product/:productId" element={<ScreensProduct />} />

            <Route path="/login" element={<ScreensLogin />} />
            <Route path="/register" element={<ScreensRegister />} />

            <Route
              path="/profile/me"
              element={<PrivateRoute component={ScreensProfile} />}
            />

            <Route
              path="/profile/me/edit"
              element={<PrivateRoute component={ScreensProfileEdit} />}
            />

            <Route
              path="/seller/:shopId/product/create"
              element={<PrivateRoute component={ScreensProductCreate} />}
            />
            <Route
              path="/seller/:shopId/:productId/edit"
              element={<PrivateRoute component={ScreensProductEdit} />}
            />

            <Route
              path="/seller/shops"
              element={<PrivateRoute component={ScreensShopMyList} />}
            />
            <Route
              path="/seller/shop/create"
              element={<PrivateRoute component={ScreensShopCreate} />}
            />
            <Route
              path="/seller/shop/:shopId/edit"
              element={<PrivateRoute component={ScreensShopEdit} />}
            />

            <Route path="*" element={<ScreensNotFound />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default ScreensRoot;
