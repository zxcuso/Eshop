import styles from './Navbar.module.scss'
import { FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserName } from '../../../redux/slice/authSlice';


const activeLink = ({isActive}) => (isActive ? `${styles.active}` : "")


const Navbar = () => {
    const userName = useSelector(selectUserName);
    console.log(userName);
  return (
    <div className={styles.navbar}> 
    <div className={styles.user}>
        <FaUserCircle size={40} color='#fff'/>
        <h4>
        {userName}
        </h4> 
    </div>
    <nav>
      <ul>
        <li>
          <NavLink to="/admin/home" className={activeLink}>
            Home
          </NavLink>
        </li>

        <li>
        <NavLink to="/admin/all-products" className={activeLink}>
            All Products
        </NavLink>
        </li>

        <li>
        <NavLink to="/admin/add-product" className={activeLink}>
            Add Product
        </NavLink>
        </li>

        <li>
        <NavLink to="/admin/order" className={activeLink}>
            Orders
        </NavLink>
        </li>

      </ul>
    </nav>
</div>
  )
}

export default Navbar