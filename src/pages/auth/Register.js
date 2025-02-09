
import React, { useState } from 'react'
import Card from '../../components/card/Card'
import styles from "./auth.module.scss"
import registerImg from "../../assets/register.png"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from "../../firebase/config"
import Loader from '../../components/loader/Loader'


const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cpassword, setCpassword] = useState("")
  const [isLoading, setIsloading] = useState(false)

  const navigate = useNavigate()

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cpassword) {
        toast.error("Password do not match")
    }
    setIsloading(true)

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    setIsloading(false)
    toast.success("Registration Successful...")
    navigate("/login")
    // ...
  })
  .catch((error) => {
        toast.error(error.message)
        setIsloading(false)
    // ..
  });
  };

  return (
    <>
     {/* <ToastContainer className={styles.alerty}
     position="bottom-left"
     theme="dark"
     autoClose={4000}
     /> */}
     {isLoading && <Loader />}
     <section className={`container ${styles.auth}`}> 

     <Card>
      <div className={styles.form}>
        <h2>Register</h2>
        <form onSubmit={registerUser}>
          <input 
          type="text" 
          placeholder='Email' 
          required 
          value={email} 
          onChange={(e)=> setEmail(e.target.value)}
          />

          <input 
          type="password" 
          placeholder='password' 
          required
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          />

          <input 
          type="password" 
          placeholder='comfirm password' 
          required
          value={cpassword}
          onChange={(e)=> setCpassword(e.target.value)}
          />
          <button type='submit' className='--btn --btn-primary --btn-block'>Register</button>
        </form>
       
        <span className={styles.register}>
          <p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </span>
      </div>
      </Card>

      <div className={styles.img}>
      <img src={registerImg} alt='Register' width="400"/>
    </div>
   </section>
  </>
  )
}

export default Register