import React, { useEffect, useState } from 'react'
import styles from "./Header.module.scss"
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {FaShoppingCart, FaTimes, FaUserCircle} from "react-icons/fa"
import {HiOutlineMenuAlt3} from "react-icons/hi"
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';

//relating to redux 
import { useDispatch } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddinL';
import  { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute';






const logo = (
<div className={styles.logo}>
<Link to="/">
  <h2>
    e<span>Shop</span>.
  </h2>
</Link>
</div>
)

const cart = (
<span className={styles.cart}>
            <NavLink to="/cart" className={({isActive}) => (isActive ? `${styles.active}` : "")}>
              Cart
              <FaShoppingCart />
              <p>0</p>
            </NavLink>
          </span>
)

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [uName, setUName] = useState("");

  //Redux
  const dispatch = useDispatch()

  const navigate = useNavigate()

  //Monitor currently signed in user
  useEffect(() =>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // const uid = user.uid;
        // console.log(user.displayName);

        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const upName = u1.charAt(0).toUpperCase() + u1.slice(1)
          console.log(upName);
          setUName(upName)
        }else{
          setUName(user.displayName)
        }
       

        dispatch(
          SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName ? user.displayName : uName,
          userID: user.uid,
        }))
        
        // ...
      } else {
        // User is signed out
        setUName("")
        dispatch(REMOVE_ACTIVE_USER())
      }
    });
    
  }, [dispatch, uName])

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  };

  const hideMenu = () => {
    setShowMenu(false)
  };

  const logOutUser = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      toast.success("Logout Success")
      navigate("/")
    }).catch((error) => {
      // An error happened.
      toast.error("error.message")
    });
  }




  return (
    <header>
      <div className={styles.header}>
       {logo}

       <nav className={
        showMenu 
        ? `${styles["show-nav"]}` 
       : `${styles["hide-nav"]}`}>

        <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` 
        : `${styles["nav-wrapper"]}`}
        onClick={hideMenu}
        ></div>

        <ul onClick={hideMenu}>
        <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu}/>
          </li>

        {/* for admin button */}
        <AdminOnlyLink>
          <Link to="/admin/home">
          <li>
            <button className='--btn --btn-primary'> Admin</button>
          </li>
          </Link>
        </AdminOnlyLink>

          <li>
            <NavLink to="/" className={({isActive}) => 
              (
                isActive ? `${styles.active}` : ""
              )}>
                Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" className={({isActive}) => 
            (
              isActive ? `${styles.active}` : ""
            )}>
                Contact Us
            </NavLink>
          </li>

        </ul>
        <div className={styles["header-right"]} onClick={hideMenu}>
          <span className={styles.links}>
            
            <ShowOnLogout>
            <NavLink to="/login"
              className={({isActive}) => (isActive ? `${styles.active}` : "")}>
              Login
            </NavLink>
            </ShowOnLogout>
            
            <ShowOnLogin>
            <a href='#home' style={{color: 'greenyellow'}}>
              <FaUserCircle size={16}  />
              Hi, {uName}
            </a>
            </ShowOnLogin>

            {/* <NavLink to="/register" 
              className={({isActive}) => (isActive ? `${styles.active}` : "")}>
                Register
            </NavLink> */}

            <ShowOnLogin>
            <NavLink to="/order-history"
              className={({isActive}) => (isActive ? `${styles.active}` : "")}>
                My Orders
            </NavLink>
            </ShowOnLogin>

           <ShowOnLogin>
            <NavLink to="/"
              onClick={logOutUser}>
                Logout
            </NavLink>
            </ShowOnLogin>

          </span>
          {cart}
        </div>
       
       </nav>

       <div className={styles["menu-icon"]}>
        {cart}
        <HiOutlineMenuAlt3 size={28} onClick={toggleMenu}/>
       </div>

      </div>
    </header>
  );
};

export default Header