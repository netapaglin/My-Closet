import cartItemModel from "../models/cartItem.model";
import ProductModel from "../models/product.model";

// Products State - products data needed in the application level:
export class CartProductsState {
  public cartProducts: cartItemModel[] = [];
}

// Products Action Type - any action which can be done on the above products state:
export enum CartProductsActionType {
  FetchCartProducts = "FetchCartProducts",
  AddCartProduct = "AddCartProduct",
  UpdateCartProduct = "UpdateCartProduct",
  DeleteCartProduct = "DeleteCartProduct",
  DeleteAllCartProducts = "DeleteAllCartProducts"
}

// Products Action - any single object sent to the store during "dispatch":
export interface CartProductsAction {
  type: CartProductsActionType;
  payload?: any;
}

// Products Action Creators - function for creating ProductsAction objects. each function creates one Action object:
export function fetchCartProductsAction(cartProducts: cartItemModel[]): CartProductsAction {
  return { type: CartProductsActionType.FetchCartProducts, payload: cartProducts };
}

export function addCartProductAction(cartProducts: cartItemModel): CartProductsAction {
  return { type: CartProductsActionType.AddCartProduct, payload: cartProducts };
}
export function updateCartProductAction(cartProducts: cartItemModel): CartProductsAction {
  return { type: CartProductsActionType.UpdateCartProduct, payload: cartProducts };
}
export function deleteCartProductAction(id: number): CartProductsAction {
  return { type: CartProductsActionType.DeleteCartProduct, payload: id };
}
export function deleteAllCartProductAction(): CartProductsAction {
  return { type: CartProductsActionType.DeleteAllCartProducts };
}

// Products Reducer - the main function performing any action on products state:
// the new ProductsState() is a default value for the first time only
export function productsCartReducer(currentState = new CartProductsState(), action: CartProductsAction): CartProductsState {

  // Must duplicate the current state and not touch the given current state:
  const newState = { ...currentState };

  switch (action.type) {

    case CartProductsActionType.FetchCartProducts:
      newState.cartProducts = action.payload; // Here the payload is the products list.
      break;

    case CartProductsActionType.AddCartProduct:
      newState.cartProducts.push(action.payload); // Here the payload is a single object to add.
      break;

    case CartProductsActionType.UpdateCartProduct:
      const indexToUpdate = newState.cartProducts.findIndex(p => p.id === action.payload.id); // Here the payload is a single object to update.
      if (indexToUpdate >= 0) {
        newState.cartProducts[indexToUpdate] = action.payload;
      }
      break;

    case CartProductsActionType.DeleteCartProduct:
      const indexToDelete = newState.cartProducts.findIndex(p => p.id === action.payload); // Here the payload is the id to delete.
      if (indexToDelete >= 0) {
        newState.cartProducts.splice(indexToDelete, 1);
      }
      break;

    case CartProductsActionType.DeleteAllCartProducts:
      newState.cartProducts = [];
      break;
  }

  return newState;
}
