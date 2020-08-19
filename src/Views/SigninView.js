import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../Actions/userAction';
import { motion } from 'framer-motion'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

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

////////////////////////////////////////////////////////////////
const validationSchema = Yup.object({
  email: Yup.string()
  .email('Invalid email format')
  .required('Required'),
  password: Yup.string().required('Required'),
})

//const [formValues, setFormValues] = useState(null)

const initialValues = {
  email: '',
  password: ''
}

// const onSubmit = (e, email, password) => {
//   e.preventDefault();
//   dispatch(signin(email,password));
// }
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

    <div className="form-card">
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
      return <Form>
      <h2>SIGN IN</h2>
        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <Field type='email' id='email' name='email' />
          <ErrorMessage className="form-error" name='email' component='div' />
        </div>

        <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <Field type='password' id='password' name='password' />
          <ErrorMessage className="form-error" name='password' component='div' />
        </div>
        <button type="submit" className="form-button">Sign in</button>
      </Form>
      }}
    </Formik>
    <div>Don't have an account?</div>
    <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center" >Create your LoS account</Link>
    </div>


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