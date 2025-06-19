package in.parshant.backend.service;

import in.parshant.backend.dto.UserDTO;

public interface UserService {
    UserDTO saveUser(UserDTO userDTO);

    UserDTO getUserByClerkId(String clerkId);

    void deleteUserByClerkId(String clerkId);
}
