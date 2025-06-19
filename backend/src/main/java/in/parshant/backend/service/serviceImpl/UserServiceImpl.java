package in.parshant.backend.service.serviceImpl;

import in.parshant.backend.dto.UserDTO;
import in.parshant.backend.entity.UserEntity;
import in.parshant.backend.repository.UserRepository;
import in.parshant.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public UserDTO saveUser(UserDTO userDTO) {
        Optional<UserEntity> optionalUser = userRepository.findByClerkId(userDTO.getClerkId());
        if (optionalUser.isPresent()) {
            UserEntity existingUser = optionalUser.get();
            existingUser.setEmail(userDTO.getEmail());
            existingUser.setFirstName(userDTO.getFirstName());
            existingUser.setLastName(userDTO.getLastName());
            existingUser.setPhotoUrl(userDTO.getPhotoUrl());
            if(userDTO.getCredits() != null) {
                existingUser.setCredits(userDTO.getCredits());
            }


            existingUser = userRepository.save(existingUser);
            return mapToDTO(existingUser);
        } else {
            UserEntity newUser = mapToEntity(userDTO);
            userRepository.save(newUser);
           return mapToDTO(newUser);
        }
    }

    @Override
    public UserDTO getUserByClerkId(String clerkId) {
        UserEntity userEntity = userRepository.findByClerkId(clerkId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return mapToDTO(userEntity);
    }

    @Override
    public void deleteUserByClerkId(String clerkId) {
        UserEntity userEntity = userRepository.findByClerkId(clerkId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        userRepository.delete(userEntity);
    }

    private UserDTO mapToDTO(UserEntity newUser) {
        return UserDTO.builder()
                .clerkId(newUser.getClerkId())
                .email(newUser.getEmail())
                .credits(newUser.getCredits())
                .firstName(newUser.getFirstName())
                .lastName(newUser.getLastName())
                .credits(newUser.getCredits())
                .photoUrl(newUser.getPhotoUrl())
                .build();
    }

    private UserEntity mapToEntity(UserDTO userDTO){
        return UserEntity.builder()
                .clerkId(userDTO.getClerkId())
                .email(userDTO.getEmail())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .photoUrl(userDTO.getPhotoUrl())
                .build();
    }

}
