package com.example.eventzen.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.eventzen.repository.UserRepository;
import com.example.eventzen.entity.User;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User register(User user) {
        user.setActive(true);
        user.setStatus(1);
        user.setRole("USER");

        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
}
