import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

// action creators
export const fetchCartData = () => {
    // redux toolkit gives automatically dispatch function we don't need to import from react-redux
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://reactproject-999-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response) {
        throw new Error("Could not fetch the cart data");
      }
      const responseData = await response.json();
      return responseData;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
          totalAmount: cartData.totalAmount,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "error!",
          message: "Failed to fetch the cart data!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.setNotification({
        status: "pending",
        title: "Sending..",
        message: "Sending cart data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://reactproject-999-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
            totalAmount: cart.totalAmount,
          }),
        }
      );
      if (!response) {
        throw new Error("Sending cart data failed");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.setNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
