import {useState} from 'react'
import styles from "./auth.module.scss"
import loginImg from "../../assets/login.png"
import { Link, useNavigate } from 'react-router-dom'
import {FaGoogle} from 'react-icons/fa'
import Card from '../../components/card/Card'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {auth} from "../../firebase/config"
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader'


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsloading] = useState(false)

  const navigate = useNavigate();

  const loginUser = (e) => {
      e.preventDefault()
      setIsloading(true)

      signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    // const user = userCredential.user;
    setIsloading(false)
    toast.success("Login Success")
    navigate("/")

    // ...
  })
  .catch((error) => {
         setIsloading(false)
         toast.error("please check ur password")
        // toast.error("please check ur password")
        
  });
  }
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    // const user = result.user;
    toast.success("Successfuly login")
    navigate("/")
    
  }).catch((error) => {
    // Handle Errors here.
    toast.error("error.message")
  });
  };

  return (
    <>
     {isLoading && <Loader />}
  <section className={`container ${styles.auth}`}> 
    <div className={styles.img}>
      <img src={loginImg} alt='login' width="400"/>
    </div>
    <Card>
      <div className={styles.form}>
        <h2>Login</h2>
        <form onSubmit={loginUser}>
          <input 
          type="text" 
          placeholder='Email' 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <input 
          type="password" 
          placeholder='password' 
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
          <button type='submit' className='--btn --btn-primary --btn-block'>Login</button>

          <div className={styles.links}>
            <Link to="/reset"> Reset Password</Link>
          </div>
          <p>-- or --</p>
        </form>
        
        <button className='--btn --btn-danger --btn-block' onClick={signInWithGoogle}> <FaGoogle color='#fff'/> 
        Login With Google
        </button>
        <span className={styles.register}>
          <p>Don't have an account?</p>
          <Link to="/register"> Register</Link>
        </span>
      </div>
      </Card>
  </section>
  </>
  )
}

export default Login