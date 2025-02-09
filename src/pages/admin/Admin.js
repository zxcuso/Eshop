import React from 'react'
import styles from "./Admin.module.scss"
import Navbar from '../../components/admin/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../../components/admin/home/Home'
import ViewProduct from '../../components/admin/viewProduct/ViewProduct'
import AddProduct from '../../components/admin/addProduct/AddProduct'
import Orders from '../../components/admin/orders/Orders'

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar/>
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path='home' element={<Home/>}/>
          <Route  path='all-products' element={<ViewProduct/>}/>
          <Route  path='add-product' element={<AddProduct/>}/>
          <Route  path='order' element={<Orders/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Admin