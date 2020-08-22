import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../Actions/userAction';
import { motion } from 'framer-motion'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import './RegisterView.css'
import * as Yup from 'yup'

function SigninView(props) {

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

////////////////////////////////////////////////////////////////
const validationSchema = Yup.object({
  email: Yup.string()
  .email('Invalid email format')
  .required('Required'),
  password: Yup.string().required('Required'),
})

const initialValues = {
  email: '',
  password: ''
}
////////////////////////////////////////////////////////////////

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
        dispatch(signin(values.email, values.password))
        setSubmitting(true)
        resetForm()
      }}
      enableReinitialize
    >
    {  
    formik => {
      console.log('Formik props', formik)
      console.log(formik.values.email)
      console.log("FOMRVAL",)
      return <Form autoComplete="off">
      <h2>SIGN IN</h2>
      <li>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
      </li>
        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <Field type='email' id='email' name='email' />
          {
            !formik.errors.email || !formik.touched.email ?
            <div>&zwnj;</div> :
            <ErrorMessage className="form-error" name='email' component='div' />
          }
        </div>

        <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <Field type='password' id='password' name='password' />
          {
            !formik.errors.password || !formik.touched.password ?
            <div>&zwnj;</div> :
            <ErrorMessage className="form-error" name='password' component='div' />
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
          Sign in
        </motion.button>
      </Form>
      }}
    </Formik>
    <div style={{marginBottom: "15px"}}> Don't have an account?</div>
    <motion.div
    style={{display: 'inline-block'}}
    whileHover={{
      scale: [1, 1.02, 1, 1.02],
      transition: { duration: 1 },
    }}
    >
    <Link 
    to={redirect === "/" ? "register" : "register?redirect=" + redirect} 
    className="register-link" 
    >
      Create your account &#187;&#187;
    </Link>
    </motion.div>

    </motion.div>

  </div>
)}
export default SigninView;