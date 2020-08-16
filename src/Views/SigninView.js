import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../Actions/userAction';
import { motion } from 'framer-motion'

function SigninView(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo, props.history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  }

  const containerVariants = {
    hidden: {
        opacity: 0,
        x: '200vw'
    },
    visible: {
        opacity: 1,
        x: '0vw',
        transition: { delay: .1, duration: .75 }
    },
    exit: {
        x: '-200vw',
        transition: { delay: .1, duration: .75 }
    }
  }
  
  console.log("SIGNINPROPS", props)

  return (
  
    <div className="form-container">

        <motion.form onSubmit={submitHandler} 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        >
          <ul className="form-card">
            <li>
              <h2>SIGN IN</h2>
            </li>
            <li>
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
            </li>
            <li>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
              </input>
            </li>
            <li>
              <button type="submit" className="button primary">Sign in</button>
            </li>
            <li>
              Don't have an account?
            </li>
            <li>
              <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center" >Create your LoS account</Link>
            </li>
          </ul>
        </motion.form>

  </div>
)}
export default SigninView;