import React, { useReducer } from "react";
import { allProducts } from "../../pages/Home/HomePageCard";
import BuyerContext from "./BuyerContext";
import { BuyerReducer } from "./BuyerReducer";
import { ADD_TO_CART } from "./BuyerType";

export const BuyerState = ({ Children }) => {
	const initialState = {
		product: allProducts.default,
		cart: [],
		isCheckoutedOut: false,
	};

	const [state, dispatch] = useReducer(BuyerReducer, initialState);

	const addCart = (cartObj) => {
		dispatch({ type: ADD_TO_CART, payload: cartObj });
	};

	return (
		<BuyerContext.Provider
			value={{
				cart: state.cart,
				isCheckoutedOut: state.isCheckoutedOut,
				addCart,
				...state,
			}}>
			{Children}
		</BuyerContext.Provider>
	);
};
