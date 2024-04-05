
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Header from "./components/header/Header";
// import Footer from "./components/footer/Footer";
// import Home from "./pages/home/Home";
// import Contact from "./pages/contact/Contact";

import {Home, Contact , Login, Register, Reset, Admin} from "./pages/Index"
import {Header, Footer, } from "./components/Index"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";


function App() {
  
  return (
    <>
      <BrowserRouter>
      <ToastContainer
      position="bottom-center"
      theme="dark"
      autoClose={4000}/>
      <Header />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/reset" element={<Reset/>}/>


            <Route path="/admin/*" element={<AdminOnlyRoute><Admin /></AdminOnlyRoute>}/>

          </Routes>
      <Footer />
      </BrowserRouter>
     
    </>
  );
}

export default App;
