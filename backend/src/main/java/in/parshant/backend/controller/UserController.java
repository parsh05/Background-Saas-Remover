package in.parshant.backend.controller;

import in.parshant.backend.dto.UserDTO;
import in.parshant.backend.response.RemoveBgResponse;
import in.parshant.backend.service.UserService;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> createOrUpdateUser(@RequestBody UserDTO userDTO, Authentication authentication) {
        RemoveBgResponse response = null;
        try {
            if (!authentication.getName().equals(userDTO.getClerkId())) {
                response = RemoveBgResponse.builder()
                        .success(false)
                        .data("User does not have permission to access the resource")
                        .statusCode(HttpStatus.FORBIDDEN)
                        .build();
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            UserDTO user = userService.saveUser(userDTO);
            response =  RemoveBgResponse.builder()
                    .success(true)
                    .data(user)
                    .statusCode(HttpStatus.CREATED)
                    .build();
            return ResponseEntity.status(HttpStatus.OK)
                    .body(response);
        } catch (Exception e) {
            response =  RemoveBgResponse.builder()
                    .success(false)
                    .data(e.getMessage())
                    .statusCode(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
