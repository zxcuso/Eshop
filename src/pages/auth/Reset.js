import React, { useState } from 'react'
import resetImg from "../../assets/forgot.png"
import Card from '../../components/card/Card'
import styles from "./auth.module.scss"
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'


function Reset() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsloading] = useState(false)

//   const resetPassword = (e) => {
//     e.preventDefault()
//     setIsloading(true)
//     sendPasswordResetEmail(auth, email)
//   .then(() => {
//     setIsloading(false)
//     toast.success("check ur email for rest link")
//   })
//   .catch((error) => {
//     setIsloading(false)
//     // toast.error(error.message);
//     // toast.error("please check ur password")
//     // const errorCode = error.code;
//     toast.error(error.message);
//   });
// }

  const resetPassword =(e) => {
    e.preventDefault();
    setIsloading(true);
          sendPasswordResetEmail(auth, email)
          .then(() => {
            setIsloading(false)
            toast.success("check email for reset details")
          })
          .catch((error) => {
            setIsloading(false)
            toast.error(error.message)
          });
  };
  

  

  return (
  <>
  {isLoading && <Loader/>}
  <section className={`container ${styles.auth}`}> 
  <div className={styles.img}>
    <img src={resetImg} alt='Reset pass' width="400"/>
  </div>
  <Card>
    <div className={styles.form}>
      <h2>Reset Password</h2>
      <form onSubmit={resetPassword}>
        <input 
        type="text" 
        placeholder='Email' 
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>
        <button className='--btn --btn-primary --btn-block' type='submit'>Reset Password</button>

        <div className={styles.links}>
          <p> <Link to="/login">--Login</Link></p>
          <p> <Link to="/register">--Register</Link></p>
         
        </div>
       
      </form>

    </div>
    </Card>
</section>
</>
);
};

export default Reset