import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./BuyerPaymentCSS/Shipping.css";
import { Progress } from "./BuyerPayementComponent/Progress";
import Footer from "../../../components/Footer/Footer";
import { Buyernav } from "./BuyerPayementComponent/Buyernav";
import { useFormik } from "formik";

// import { countryList } from "./BuyerPayementComponent/countryModule";
import { stateList } from "./BuyerPayementComponent/countryModule";
// import shippingSchema from "../../../components/Yup/Schema/ShippingSchema";
import * as yup from "yup";

export const BuyerShipping = () => {
	const navigate = useNavigate();
	const {
		handleBlur,
		handleChange,
		handleSubmit,
		touched,
		values,
		errors,
		isSubmitting,
	} = useFormik({
		initialValues: {
			username: "",
			phone: "",
			country: "",
			state: "",
			city: "",
			zip: "",
			address: "",
		},
		validationSchema: yup.object().shape({
			username: yup.string().required("Required"),
			phone: yup.number().required("Required"),
			country: yup.string().required("Required"),
			state: yup.string().required("Required"),
			city: yup.string().required("Required"),
			zip: yup.string().required("Required"),
			address: yup.string().required("Required"),
		}),
		onSubmit: (values, { resetForm, setSubmitting }) => {
			setTimeout(() => {
				console.log(JSON.stringify(values, null, 2));
				setSubmitting(false);
				resetForm();
				//   handleUserRegistration(values)
				navigate("/BuyerPayment");
			}, 4000);
		},
	});

	return (
		<>
			<Buyernav />
			<div className='shipping-container'>
				<Progress />

				<form
					onSubmit={handleSubmit}
					className='shipping-form shipping-form-active shipping-form-step'>
					<h3>Shipping Details</h3>
					<div className='shipping-form-group'>
						<label htmlFor='name'>Name</label>
						<input
							className='username'
							type='text'
							name='username'
							value={values.username}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder='Godswill Chibuzor'
						/>
						{errors.username && touched.username ? (
							<span className='text-red-500'>{errors.username}</span>
						) : null}
					</div>
					<div className='shipping-form-group password'>
						{/* <i class="fa-solid fa-eye"></i> */}
						<label htmlFor='shipping-Phone'>Mobile Number</label>
						<input
							className='userphone'
							type='text'
							name='phone'
							value={values.phone}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder='08033456756'
						/>
						{errors.phone && touched.phone ? (
							<span className='text-red-500'>{errors.phone}</span>
						) : null}
					</div>
					<div className='shipping-form-group state'>
						<div className='state-content'>
							<label htmlFor='state'>Country</label>
							<select
								className='shipping_slect'
								type='text'
								name='country'
								value={values.country}
								onChange={handleChange}
								onBlur={handleBlur}>
								{/* {countryList.map((country, index) => {
									return <option key={index}>{country}</option>;
								})} */}
								<option>Select Country</option>
								<option>Nigeria</option>
							</select>
							{errors.country && touched.country ? (
								<span className='text-red-500'>{errors.country}</span>
							) : null}
							{/* <CountrySelector className='shipping_slect' /> */}
						</div>
						<div className='state-content'>
							<label htmlFor='state'>State</label>
							<select
								className='shipping_slect'
								type='text'
								name='state'
								value={values.state}
								onChange={handleChange}
								onBlur={handleBlur}>
								{stateList.map((state, index) => {
									return <option key={index}>{state}</option>;
								})}
							</select>
							{errors.state && touched.state ? (
								<span className='text-red-500'>{errors.state}</span>
							) : null}
						</div>
					</div>
					<div className='shipping-form-group state'>
						<div className='state-content'>
							<label htmlFor='local-gov'>City</label>
							<input
								className='userstate'
								type='text'
								name='city'
								value={values.city}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder='Lagos'
							/>
							{errors.city && touched.city ? (
								<span className='text-red-500'>{errors.city}</span>
							) : null}
						</div>
						<div className='state-content'>
							<label htmlFor='local-gov'>Zip</label>

							<input
								className='userlga'
								type='text'
								name='zip'
								value={values.zip}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder='342420'
							/>
							{errors.zip && touched.zip ? (
								<span className='text-red-500'>{errors.zip}</span>
							) : null}
						</div>
					</div>
					<div className='shipping-form-group shipping-form-step'>
						<label htmlFor='shipping-address'>Address</label>
						<input
							className='useradd'
							type='text'
							name='address'
							value={values.address}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder='Ijora'
						/>
						{errors.address && touched.address ? (
							<span className='text-red-500'>{errors.address}</span>
						) : null}
					</div>
					<div className='shipping-form-group-btn'>
						{/* <button class="shipping-proceed-btn btn-prev" type="submit">Back</button> */}
						{/* <Link to={"/BuyerPayment"}> */}
						<button
							className='shipping-proceed-btn '
							type='submit'
							isSubmitting>
							Next
						</button>
						{/* </Link> */}
					</div>
				</form>
			</div>
			<Footer />
		</>
	);
};
