import { useReducer } from "react";
import { createContext, useState } from "react";
import { allProducts } from "../../pages/Home/HomePageCard";
import { ProductReducer } from "./ProductReducer";

export const ProductContext = createContext();
// addToCart: () => {},
// category: "",
// changeCategory: () => {},

export const ProductProvider = ({ children }) => {
  const [category, changeCategory] = useState(null);
  const products = allProducts;
  const initialState = {
    // category: category,
    // changeCategory: changeCategory,
    products,
    cart: [],
  };

  const [state, dispatch] = useReducer(ProductReducer, initialState);
  return (
    <ProductContext.Provider
      value={{
        category: category,
        changeCategory: changeCategory,
        state,
        dispatch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
