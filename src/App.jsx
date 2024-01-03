import { Navigate, Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./redux/features/authSlice";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const ForgotPWPage = lazy(() => import("./pages/ForgotPWPage"));
const EnterNewPWPage = lazy(() => import("./pages/EnterNewPWPage"));
const CheckMailPage = lazy(() => import("./pages/CheckMailPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AdminLayout = lazy(() => import("./layout/AdminLayout"));
const CategoryManage = lazy(() => import("./module/category/CategoryManage"));
const BrandManage = lazy(() => import("./module/brand/BrandManage"));
const VoucherManage = lazy(() => import("./module/voucher/VoucherManage"));
const PaymentManage = lazy(() => import("./module/payment/PaymentManage"));
const DiscountManage = lazy(() => import("./module/discount/DiscountManage"));
const ProblemManage = lazy(() => import("./module/problem/ProblemManage"));
const FeedbackManage = lazy(() => import("./module/feedback/FeedbackManage"));
const EvalueateManage = lazy(() => import("./module/evaluate/EvalueateManage"));
const ColorManage = lazy(() => import("./module/color/ColorManage"));
const VoucherPage = lazy(() => import("./pages/VoucherPage"));
const ProductManagePage = lazy(() => import("./module/product/ProductManage"));
const ProductCEPage = lazy(() => import("./module/product/ProductCEPage"));
const OrderManage = lazy(() => import("./module/order/OrderManage"));
const ProductAddPage = lazy(() => import("./module/product/ProductAddPage"));
const AccountManage = lazy(() => import("./module/account/AccountManage"));
const HashtagManage = lazy(() => import("./module/hashtag/HashtagManage"));
const Information = lazy(() => import("./module/dashboard/Information"));
const AccountOrder = lazy(() => import("./module/information/AccountOrder"));
const AccountInfo = lazy(() => import("./module/information/AccountInfo"));
const AccountLayout = lazy(() => import("./layout/AccountLayout"));
const AccountAddress = lazy(() =>
  import("./module/information/AccountAddress")
);
const AccountChangePassword = lazy(() =>
  import("./module/information/AccountChangePassword")
);

function App() {
  return (
    <>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
          <Route path="/about" element={<AboutUsPage></AboutUsPage>}></Route>
          <Route path="/product" element={<ProductPage></ProductPage>}></Route>
          <Route path="/cart" element={<CartPage></CartPage>}></Route>
          <Route
            path="/product/:productId"
            element={<ProductDetailPage></ProductDetailPage>}
          ></Route>
          <Route path="/login" element={<SignInPage></SignInPage>}></Route>
          <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
          <Route
            path="/forgotPW"
            element={<ForgotPWPage></ForgotPWPage>}
          ></Route>
          <Route
            path="/enterNewPW"
            element={<EnterNewPWPage></EnterNewPWPage>}
          ></Route>
          <Route
            path="/checkmail"
            element={<CheckMailPage></CheckMailPage>}
          ></Route>
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <CheckoutPage></CheckoutPage>
              </PrivateRoute>
            }
          ></Route>
          <Route path="/voucher" element={<VoucherPage></VoucherPage>}></Route>

          <Route element={<AdminLayout></AdminLayout>}>
            <Route
              path="/admin"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/admin/product"
              element={<ProductManagePage></ProductManagePage>}
            ></Route>
            <Route
              path="/admin/product/add"
              element={<ProductAddPage></ProductAddPage>}
            ></Route>
            <Route
              path="/admin/product/edit/:id"
              element={<ProductCEPage></ProductCEPage>}
            ></Route>
            <Route
              path="/admin/account"
              element={<AccountManage></AccountManage>}
            ></Route>
            <Route
              path="/admin/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>
            <Route
              path="/admin/brand"
              element={<BrandManage></BrandManage>}
            ></Route>
            <Route
              path="/admin/payment"
              element={<PaymentManage></PaymentManage>}
            ></Route>
            <Route
              path="/admin/problem"
              element={<ProblemManage></ProblemManage>}
            ></Route>
            <Route
              path="/admin/feedback"
              element={<FeedbackManage></FeedbackManage>}
            ></Route>
            <Route
              path="/admin/discount"
              element={<DiscountManage></DiscountManage>}
            ></Route>
            <Route
              path="/admin/evaluate"
              element={<EvalueateManage></EvalueateManage>}
            ></Route>
            <Route
              path="/admin/order"
              element={<OrderManage></OrderManage>}
            ></Route>
            <Route
              path="/admin/color"
              element={<ColorManage></ColorManage>}
            ></Route>
            <Route
              path="/admin/profile"
              element={<Information></Information>}
            ></Route>
            <Route
              path="/admin/hashtag"
              element={<HashtagManage></HashtagManage>}
            ></Route>
          </Route>
          <Route element={<AccountLayout></AccountLayout>}>
            <Route
              path="/user"
              element={
                <PrivateRoute>
                  <AccountInfo></AccountInfo>
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/user/address"
              element={
                <PrivateRoute>
                  <AccountAddress></AccountAddress>
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/user/order"
              element={
                <PrivateRoute>
                  <AccountOrder></AccountOrder>
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/user/changePassword"
              element={
                <PrivateRoute>
                  <AccountChangePassword></AccountChangePassword>
                </PrivateRoute>
              }
            ></Route>
          </Route>
          <Route element={<AdminLayout></AdminLayout>}>
            <Route
              path="/admin"
              element={
                <ProtectRoute>
                  <DashboardPage></DashboardPage>
                </ProtectRoute>
              }
            ></Route>
            <Route
              path="/admin/account"
              element={
                <ProtectRoute>
                  <AccountManage></AccountManage>
                </ProtectRoute>
              }
            ></Route>
            <Route
              path="/admin/category"
              element={
                <ProtectRoute>
                  <CategoryManage></CategoryManage>
                </ProtectRoute>
              }
            ></Route>
            <Route
              path="/admin/brand"
              element={
                <ProtectRoute>
                  <BrandManage></BrandManage>
                </ProtectRoute>
              }
            ></Route>
            <Route
              path="/admin/voucher"
              element={
                <ProtectRoute>
                  <VoucherManage></VoucherManage>
                </ProtectRoute>
              }
            ></Route>
            <Route
              path="/admin/payment"
              element={
                <ProtectRoute>
                  <PaymentManage></PaymentManage>
                </ProtectRoute>
              }
            ></Route>
            <Route
              path="/admin/problem"
              element={
                <ProtectRoute>
                  <ProblemManage></ProblemManage>
                </ProtectRoute>
              }
            ></Route>
            <Route
              path="/admin/feedback"
              element={
                <ProtectRoute>
                  <FeedbackManage></FeedbackManage>
                </ProtectRoute>
              }
            ></Route>
            <Route
              path="/admin/discount"
              element={
                <ProtectRoute>
                  <DiscountManage></DiscountManage>
                </ProtectRoute>
              }
            ></Route>
            <Route
              path="/admin/evaluate"
              element={
                <ProtectRoute>
                  <EvalueateManage></EvalueateManage>
                </ProtectRoute>
              }
            ></Route>
            <Route
              path="/admin/order"
              element={
                <ProtectRoute>
                  <OrderManage></OrderManage>
                </ProtectRoute>
              }
            ></Route>
            <Route
              path="/admin/color"
              element={
                <ProtectRoute>
                  <ColorManage></ColorManage>
                </ProtectRoute>
              }
            ></Route>
            <Route
              path="/admin/profile"
              element={
                <ProtectRoute>
                  <Information></Information>
                </ProtectRoute>
              }
            ></Route>
            <Route
              path="/admin/hashtag"
              element={
                <ProtectRoute>
                  <HashtagManage></HashtagManage>
                </ProtectRoute>
              }
            ></Route>
          </Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = user && user.path === 2;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

const ProtectRoute = ({ children }) => {
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = user && (user.path === 0 || user.path == 1);

  if (!isAuthenticated) {
    return <Navigate to="/pagenotfound" />;
  }
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.any,
};

ProtectRoute.propTypes = {
  children: PropTypes.any,
};

export default App;
