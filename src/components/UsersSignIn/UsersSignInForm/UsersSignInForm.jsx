import React, {  useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import "./UsersSignInForm.css";
import { SellerSignUpBtn } from "../../UsersButton/Seller_Btn/SellerSignUpBtn";
import { BuyerSignUpBtn } from "../../UsersButton/Buyer_Btn/BuyerSignUpBtn";
import { BrokerSignUpBtn } from "../../UsersButton/Broker_Btn/BrokerSignUpBtn";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LogininSchema from "../../Yup/Schema/LogininSchema";
import UserServices from "../../../Context/user-context/user.service";
import UserAuth from "../../../Context/user-auth/UserAuthContext";
import axiosInstance from "../../../Context/axios-config/axios-user-config";
import GeneralUserAuth from "../../../Context/user-auth/GeneralUserAuth";

export const UsersSignInForm = () => {
		const {userAuth, setUserAuth, user, setUser} = GeneralUserAuth()
		
		const [errorso, setErrorso] = useState("")
		const [successo, setSuccesso] = useState("")


		const navigate = useNavigate()
		const location = useLocation()
		const from = location.state?.from?.pathname || "/farmerdashboardpage";


		//const localToken = JSON.parse(localStorage.getItem("token"))
		//const tokenExist = localToken?.length > 0;

		
	   

	const handleLoginAuth = async (values)=> {
		try {
			const response = await axiosInstance.post("/v1/auth/login", values)
			const accessToken = response.data.tokens.access.token
			const refreshToken = response.data.tokens.refresh.token
			//const roles = response.data.
			setUserAuth({accessToken, refreshToken, values, })
			setUser(response.data.user)
			//JSON.parse(localStorage.setItem('token', accessToken))
			setSuccesso('Account Created Successfully')
			console.log("Congratulation")
			console.log(userAuth)
			console.log(setUserAuth)
			console.log(response.data)
			if (userAuth) {
				navigate(from, { replace: true})
			}
		}
		catch (error) {
			if (!error.response) {
				console.log("Server down")
			} else if (error.response.status === 400) {
				console.log('I don see enough shege')
			} else if (error.response.status === 401) {
				setErrorso("Incorrect Email or Password")
				console.log('I don see enough')
			} else if (error.response.status === 409) {
				console.log('I don see ')
			}
		}
	}



	return (
		<div>
			<Formik
        initialValues={
          {
            email: '',
            password: ''
          }
        }

        validationSchema={LogininSchema}

        validate={(values) => {
          const {email, password} = values

          //"Key": errorMesssage
          const errors = {}
          if(!email) (errors.email = <small className='text-red-500'>Email cannot be empty</small>)

          if(!password) (errors.password = <small className='text-red-500'>Password cannot be empty</small>)

          return errors
        }}

        //onSubmitting
        onSubmit={(values, { setSubmitting, resetForm}) => {
            setTimeout(() => {
              console.log((JSON.stringify(values, null, 2)));
              setSubmitting(false)
			  handleLoginAuth(values)
              resetForm()
			  
            }, 4000)
        }}
      >

		
        {({
          values, 
          errors,
          touched,
          handleChange,
          handleBlur,
          handleReset,
          handleSubmit,
          isSubmitting,
        }) => (
		<React.Fragment>
			<div className='user_signin_form'>
				<form>
					<h2 className='user_signin_form_title'>Welcome to AgroEase</h2>
					<small className="text-red-500 flex justify-center">{errorso}</small>
						<small className="text-green-500 flex justify-center">{successo}</small>
					<label >Email Address</label>
					<input
						id='email'
						name='email'
						type='email'
						placeholder='Email*'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.email}
					/>
					{errors.email && touched.email && errors.email}

					<label>Password</label>
					<input
						id='password'
						name='password'
						type='password'
						placeholder='Password*'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.password}
					/>
					{errors.password && touched.password && errors.password}

					<button 
							className='user_signin_btn' 
							type='button'
							disabled={isSubmitting}
              				onClick={handleSubmit}
							>
								{
									isSubmitting? ( "Submitting...") : ("SignIn")
								}
					</button>
					<div className='reset_password_div'>
						<Link to={"/resetPassword"}>Reset Password</Link>
						<Link to={"/forgetPassword"}>Forgot Password</Link>
					</div>

					<h4 className='or'>OR</h4>

					<div className='signUp_Btns'>
						{/* <Link to={"/UsersSignUp"}>
							<SellerSignUpBtn />
						</Link> */}
						<Link to={"/UsersSignUp"}>
							<BuyerSignUpBtn />
						</Link>
						<Link to={"/UsersSignUp"}>
							<BrokerSignUpBtn />
						</Link>
					</div>
				</form>
			</div>
		</React.Fragment>
		 )}
		 </Formik>
		</div>
	);
};
