import {Routes, BrowserRouter, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./layout/Layout";
import NotificationPage from "./pages/NotificationPage";
import ProfilePage from "./pages/ProfilePage";
import AddProductPage from "./pages/AddProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import StartPage from "./pages/StartPage";
import ProductPage from "./pages/productPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductUserPage from "./pages/productUserPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<StartPage />} />
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="notifications" element={<NotificationPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="catalog" element={<ProductPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="add" element={<AddProductPage />} />
            <Route path="details/:productID" element={<ProductDetailPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route
              path="/productUserPage/:userID"
              element={<ProductUserPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
