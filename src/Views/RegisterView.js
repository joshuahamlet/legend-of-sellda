import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../Actions/userAction';
import { motion } from 'framer-motion'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './RegisterView.css'

function RegisterView(props) {

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

////////////////////////////////////////////////////////////////
  const validationSchema = Yup.object({
    name: Yup.string().min(6, "Must be at least 6 characters").required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
    repassword: Yup.string().matches(rePassword, { message: "Passwords must match"})
  })

const initialValues = {
  name: '',
  email: '',
  password: ''
}
////////////////////////////////////////////////////////////////
console.log("reSETPASSWORD", rePassword)
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

  <div className="form-container" >

    <motion.div className="form-card" 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
    >  
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={
        (values, { setSubmitting, resetForm }) => {
        console.log(values)
        dispatch(register(values.name, values.email, values.password))
        setSubmitting(true)
        resetForm()
      }}
      enableReinitialize
    >
    {  
    formik => {
      setRePassword(formik.values.password)
      console.log(formik)
      console.log("rePassword", rePassword)
      console.log(formik.values.name)
      console.log(formik.values.email)
      return <Form autoComplete="off">
      <h2>REGISTER</h2>
      <li>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
      </li>
      <div className='form-control'>
          <label htmlFor='name'>Name</label>
          <Field type='name' id='name' name='name' />
          {
            !formik.errors.name || !formik.touched.name ?
            <div >&zwnj;</div> :
            <ErrorMessage className="form-error" name='name' component='div' />
          }
        </div>

        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <Field type='email' id='email' name='email' />
          {
            !formik.errors.email || !formik.touched.email ?
            <div >&zwnj;</div> :
            <ErrorMessage className="form-error" name='email' component='div' />
          }
        </div>

        <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <Field type='password' id='password' name='password' />
          {
            !formik.errors.password || !formik.touched.password ?
            <div >&zwnj;</div> :
            <ErrorMessage className="form-error" name='password' component='div' />
          }
        </div>

        <div className='form-control'>
          <label htmlFor='repassword'>Re-Enter Password</label>
          <Field type='password' id='repassword' name='repassword' />
          {
            !formik.errors.repassword || !formik.touched.repassword ?
            <div >&zwnj;</div> :
            <ErrorMessage className="form-error" name='repassword' component='div' />
          }
        </div>

        <motion.button 
        type="submit" 
        className="form-button" 
        style={{marginBottom: "10px"}}
        whileHover={{
          scale: 1.05,
          transition: { duration: .25 },
        }}
        >
          Create Account
        </motion.button>
      </Form>
      }}
    </Formik>
    <div style={{marginBottom: "15px"}}>Already have an account?</div>
    <motion.div
    style={{display: 'inline-block'}}
    whileHover={{
      scale: [1, 1.04, 1, 1.04],
      transition: { duration: 1 },
    }}
    >
    <Link 
    to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} 
    className="register-link" 
    >
      Sign In &#187;&#187;
    </Link>
    </motion.div>

    </motion.div>

  </div>
)}
export default RegisterView;