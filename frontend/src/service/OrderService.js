import axios from "axios";
import { toast } from "react-hot-toast";

/**
 * Place a new order and initialize Razorpay payment
 */
export const placeOrder = async ({
  planId,
  getToken,
  onSuccess,
  backendUrl,
}) => {
  try {
    const token = await getToken();

    const response = await axios.post(
      `${backendUrl}/orders?planId=${planId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Always initialize payment if response is successful (2xx)
    if (response.status >= 200 && response.status < 300) {
      initializePayment({
        order: response.data.data,
        getToken,
        onSuccess,
        backendUrl,
      });
    } else {
      toast.error("Failed to create order. Please try again.");
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
  }
};

/**
 * Initialize Razorpay payment flow
 */
const initializePayment = ({ order, getToken, onSuccess, backendUrl }) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount, // Already in paise
    currency: order.currency,
    name: "Credit Payment",
    description: "Purchase credits",
    order_id: order.id,
    handler: async (paymentDetails) => {
      try {
        const token = await getToken();
        const response = await axios.post(
          `${backendUrl}/orders/verify`,
          paymentDetails,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status >= 200 && response.status < 300) {
          toast.success("Credits added successfully!");
          onSuccess?.();
        } else {
          toast.error("Payment verification failed.");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
