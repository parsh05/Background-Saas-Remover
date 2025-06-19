package in.parshant.backend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import in.parshant.backend.dto.UserDTO;
import in.parshant.backend.entity.UserEntity;
import in.parshant.backend.response.RemoveBgResponse;
import in.parshant.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/webhooks")
@RequiredArgsConstructor
public class ClerkWebhookController {

    @Value("${clerk.webhook.secret}")
    private String webhookSecret;

    private final UserService userService;

    @PostMapping("/clerk")
    public ResponseEntity<?> handleClerkWebhook(@RequestHeader("svix-id") String svixId,
                                                @RequestHeader("svix-timestamp") String svixTimestamp,
                                                @RequestHeader("svix-signature") String svixSignature,
                                                @RequestBody String payload) {
        RemoveBgResponse response = null;
        try {
            boolean isValid = verifyWebhookSignature(svixId, svixTimestamp, svixSignature, payload);
            if (!isValid) {
                 response = RemoveBgResponse.builder()
                        .statusCode(HttpStatus.UNAUTHORIZED)
                        .data("Invalid webhook signature")
                        .success(false)
                        .build();

                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(response);
            }

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(payload);

            String eventType = rootNode.path("type").asText();

            switch (eventType) {
                case "user.created" -> {
                    handleUserCreated(rootNode.path("data"));
                    break;
                }
                case "user.updated" -> {
                    handleUserUpdated(rootNode.path("data"));
                    break;
                }
                case "user.deleted" -> {
                    handleUserDeleted(rootNode.path("data"));
                    break;
                }

            }
            return ResponseEntity.ok().body(response);

        } catch (Exception e) {
            response = RemoveBgResponse.builder().
                    statusCode(HttpStatus.INTERNAL_SERVER_ERROR)
                            .data("Something went wrong")
                                    .success(false)
                                            .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(response);
        } 
    }

    private void handleUserDeleted(JsonNode data) {

        String clerkId = data.path("id").asText();
        userService.deleteUserByClerkId(clerkId);
    }

    private void handleUserUpdated(JsonNode data) {
        String clerkId = data.path("id").asText();
        UserDTO existingUser = userService.getUserByClerkId(clerkId);

        existingUser.setEmail(data.path("email_addresses").path(0)
                .path("email_address").asText());

        existingUser.setFirstName(data.path("first_name").asText());
        existingUser.setLastName(data.path("last_name").asText());
        existingUser.setPhotoUrl(data.path("image_url").asText());

        userService.saveUser(existingUser);
    }

    private void handleUserCreated(JsonNode data) {
        UserDTO newUser = UserDTO.builder()
                .clerkId(data.path("id").asText())
                .email(data.path("email_address").path(0)
                        .path("email_address").asText())
                .firstName(data.path("first_name").asText())
                .lastName(data.path("last_name").asText())
                .build();

        userService.saveUser(newUser);

    }

    private boolean verifyWebhookSignature(String svixId, String svixTimestamp, String svixSignature, String payload) {
        //TODO: verify properly using Proper Documentation later
        return true;
    }

}
