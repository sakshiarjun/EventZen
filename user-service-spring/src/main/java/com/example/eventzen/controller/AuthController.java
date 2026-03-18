package com.example.eventzen.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.eventzen.service.UserService;
import com.example.eventzen.entity.User;
import com.example.eventzen.entity.Booking;
import com.example.eventzen.service.BookingService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.eventzen.dto.LoginRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;    

    @Autowired
    private BookingService bookingService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {        
        Optional<User> existingUser = userService.findByEmail(request.getEmail());
        
        if (existingUser.isPresent() && existingUser.get().getPassword().equals(request.getPassword())) {
            return "Login successful";
        } else {
            return "Invalid email or password";
        }
    }
    
    @GetMapping("/bookings")
    public Iterable<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }
    
}
