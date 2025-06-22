package in.parshant.backend.service;

import com.razorpay.Order;
import com.razorpay.RazorpayException;

import java.util.Map;

public interface RazorpayService {
    Order createOrder(Double amount, String currency) throws RazorpayException;

    Map<String, Object> verifyPayment(String orderId) throws RazorpayException;
}
