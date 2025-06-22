package in.parshant.backend.service.serviceImpl;

import com.razorpay.Order;
import com.razorpay.RazorpayException;
import in.parshant.backend.entity.OrderEntity;
import in.parshant.backend.repository.OrderRepository;
import in.parshant.backend.service.OrderService;
import in.parshant.backend.service.RazorpayService;
import in.parshant.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;


@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final RazorpayService razorpayService;

    private final OrderRepository orderRepository;

    private static  final Map<String, PlanDetails> PLAN_DETAILS = Map.of(
            "1", new PlanDetails("Basic", 100, 499.00),
            "2", new PlanDetails("Premium", 250, 899.00),
            "3", new PlanDetails("Ultimate", 1000, 1499.00)
    );

    private record PlanDetails(String name, int credits, double amount) {

    }

    @Override
    public Order createOrder(String planId, String clerkId) throws RazorpayException {
        PlanDetails details = PLAN_DETAILS.getOrDefault(planId, null);
        if (details == null) {
            throw new IllegalArgumentException("Invalid planId " + planId);
        }
        try {
            Order razorpayOrder = razorpayService.createOrder(details.amount, "INR");
            OrderEntity newOrder = OrderEntity.builder()
                    .clerkId(clerkId)
                    .plan(details.name())
                    .credits(details.credits())
                    .amount(details.amount())
                    .orderId(razorpayOrder.get("id"))
                    .build();

            orderRepository.save(newOrder);
            return razorpayOrder;
        } catch (RazorpayException e) {
            throw new RazorpayException("Error while creating the order", e);
        }

    }
}
