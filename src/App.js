import "./App.css";
import { RouterProvider, createBrowserRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Authmiddleware from "./middleware/Authmiddleware";
import Register from "./pages/register";
import OTPRegister from "./pages/otpRegister";
import OTPResetPassword from "./pages/otpResetPassword";
import ResetPasswordBaru from "./pages/resetPasswordBaru";
import ResetPassword from "./pages/resetPassword";
import Riwayat from "./pages/Riwayat/Riwayat";
import Beranda from './pages/Beranda/Beranda';
import Chekout from './pages/Payment/chekout';
import Payment from './pages/Payment/payment';
import Success from './pages/Payment/payment-success';
import TiketHabis from "./components/TiketHabis";
import BerandaLoading from "./components/BerandaLoading";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import PencarianEmpty from "./components/PencarianEmpty";
import HasilPencarian from "./components/HasilPencarian";
import Cookies from 'universal-cookie';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";

function App() {
  const cookies = new Cookies()

  const token = cookies.get('token')


  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path ="/" element={<Beranda />}/> */}
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/otp-register" element={<OTPRegister />} />
          <Route path="/otp-reset-password" element={<OTPResetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password-baru" element={<ResetPassword />} />
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/BerandaLoading" element={<BerandaLoading />} />
          <Route path="/TiketHabis" element={<TiketHabis />} />
          <Route path="/PencarianEmpty" element={<PencarianEmpty />} />
          <Route path="/HasilPencarian" element={<HasilPencarian />} />
          <Route path="/riwayat" element={<Riwayat />} />
          <Route path='/checkout' exact Component={Chekout} />
          <Route path='/payment' exact Component={Payment} />
          <Route path='/payment-success' exact Component={Success} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
