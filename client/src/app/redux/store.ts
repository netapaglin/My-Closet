import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import {productsCartReducer} from "./cart-products-state"
import { productsReducer } from "./products-state";



// Creating reducers object from all our reducers:
const reducers = combineReducers({
 productsCartState: productsCartReducer,
 authState: authReducer,
 productsState: productsReducer
});


const store = createStore(reducers);

export default store;

