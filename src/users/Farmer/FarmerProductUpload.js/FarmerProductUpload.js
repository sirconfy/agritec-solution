
import { useFormik } from "formik";
import * as Yup from "yup";
import "./FarmerProductUpload.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axios-config/axios-user-config";
import UserAuth from "../../../Context/user-auth/UserAuthContext";



export const FarmerProductUpload = () => {
  const { userAuth, setUserAuth, user, setUser } = useContext(UserAuth);
  // const [errorso, setErrorso] = useState("")
  const [successo, setSuccesso] = useState("");
  const { accessToken, refreshToken } = userAuth;

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const navigate = useNavigate();


  const handleProductSubmit = async (values) => {
    const {
      name,
      description,
      quantity,
      price,
      cost,
      actualPrice,
      CategoryName,
    } = values;
    const productInfo = {
      name,
      description,
      quantity,
      price ,
      cost: 40000,
      actualPrice: 500,
      CategoryName,
    };
    console.log(values);
    console.log(productInfo);
    try {
      const response = await axiosInstance.post(
        "v1/product",
        productInfo,
        config
      );
      const accessToken = response.data.tokens.access.token;
      setUserAuth({ accessToken });
      setUser(response.data.user);
      // JSON.parse(localStorage.setItem('token', accessToken))
      setSuccesso("Account Created Successfully");

      if (userAuth) {
        navigate("/farmerproductpage");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    name: "",
    description: "",
    quantity: "",
    price: "",
    cost: 500,
    actualPrice: 45000000,
    CategoryName: "",
    // unit_input: "",
    // file: [],
  };


  const validationSchema = Yup.object({
    name: Yup.string().required("product name required").max(50),
    description: Yup.string().required("Product description required").max(200),
    quantity: Yup.string().required("The quantity must not be zero").max(2),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      handleProductSubmit(values)
    },
  });

  return (
    <>
      <section className="farmers-product">
        <h5 className="farmers-product-title">New Product</h5>
        <form action="" method="post" onSubmit={formik.handleSubmit}>
          <div className="product-name-type">
            <div className="product-name label_input">
              <label htmlFor="product-name" className="name">
                Name of Product
              </label>
              <input
                type="text"
                className="product"
                placeholder="name of product"
                id="name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name ? (
                <div className="product_upload_error">{formik.errors.name}</div>
              ) : null}
            </div>

            <div className="product-type label_input">
              <label htmlFor="CategoryName" className="name">
                Type of Product
              </label>
              <select
                name="CategoryName"
                id="CategoryName"
                onChange={formik.handleChange}
                value={formik.values.CategoryName}
                className="lopo"
              >
                select
                <option value="" disabled>
                  Select
                </option>
                <option value="uploaded_farm_input">Farm Input</option>
                <option value="uploaded_crop">Crops</option>
                <option value="Poultry">Poultry</option>
                <option value="Livestock">LiveStock</option>
                <option value="Product">Product</option>
              </select>
            </div>
          </div>

          <div className="default-unit-cost">
            {/* <div className="default-unit-div label_input">
              <label htmlFor="unit_input" className="name">
                Default Unit
              </label>

              <select 
							id="unit_input" 
							name="unit_input" 
							onChange={formik.handleChange}
              value={formik.values.unit_input}
							>
                <option value="" disabled>
                  Select
                </option>
                <option value="uploaded_kilo">Kg</option>
                <option value="uploaded_tons">tons</option>
                <option value="uploaded_crate">crates</option>
                <option value="uploaded_bags">Bag</option>
                <option value="uploaded_basket">Basket</option>
                <option value="uploaded_unit">Unit</option>
              </select>

             
            </div> */}
            <div className="unit-cost label_input">
              <label htmlFor="unit-cost" className="name">
                Unit Cost of item (₦)
              </label>
              <input
                type="text"
                className="unit-cost-type"
                placeholder="0"
                name="price"
                id="price"
                onChange={formik.handleChange}
                value={formik.values.price}
              />
            </div>
          </div>

          <div className="default-unit-cost upload_photo_qty">
            {/* <div className="default-unit-div label_input">
              <label htmlFor="unit-input upload_photo" className="name">
							Upload Photo
              </label>

              <input
                type="file" 
								className="choose_file"
								id="file"
								name="file"
								onChange={formik.handleChange}
								value={formik.values.file}
                multiple
                required
								/>
								 {formik.errors.file ? <div className="product_upload_error">{formik.errors.file}</div> : null}
            </div> */}
            <div className="unit-cost label_input">
              <label htmlFor="unit-cost" className="name">
                Quantity of Item
              </label>
              <input
                type="number"
                placeholder="0"
                id="quantity"
                name="quantity"
                onChange={formik.handleChange}
                value={formik.values.quantity}
              />
              {formik.errors.quantity ? (
                <div className="product_upload_error">
                  {formik.errors.quantity}
                </div>
              ) : null}
            </div>
          </div>

          <div className="textarea-text label_input">
            <label htmlFor="product-desc" className="name">
              Product Description
            </label>
            <textarea
              // id="product-desc"
              cols={30}
              rows={10}
              placeholder="product description"
              id="description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            {formik.errors.description ? (
              <div className="product_upload_error">
                {formik.errors.description}
              </div>
            ) : null}
          </div>

          <div className="add-product-btn">
            {/* <Link to="/farmerproductpage"> */}
            <button
              type="submit"
              // onClick={transferValue}
            >
              Add Product
            </button>
            {/* </Link> */}
          </div>
        </form>
      </section>
    </>
  );
};
