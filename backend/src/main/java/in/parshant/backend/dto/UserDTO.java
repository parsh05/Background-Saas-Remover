package in.parshant.backend.dto;


import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {

    private String clerkId;
    private String email;
    private String firstName;
    private String lastName;
    private String photoUrl;
    private Integer credits;
}
