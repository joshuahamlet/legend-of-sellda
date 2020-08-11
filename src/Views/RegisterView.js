import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../Actions/userAction';
import { motion } from 'framer-motion'
import './RegisterView.css'

function RegisterView(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfoNew, error } = userRegister;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

  useEffect(() => {
    if (userInfoNew) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfoNew, props.history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
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
                <h2>Register</h2>
              </li>
              <li>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}>
                </input>
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
                <label htmlFor="rePassword">Re-Enter Password</label>
                <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}>
                </input>
              </li>
              <li>
                <button disabled={password === rePassword ? false : true} type="submit" className="button primary">Register</button>
              </li>
              <li>
                Already have an account?
              </li>
              <li>
                <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center" >Sign in</Link>
              </li>
            </ul>
        </motion.form>

  </div>
)}
export default RegisterView;