package com.example.RegistrationLogin.Controllers;

import com.example.RegistrationLogin.Models.DTO.RegistrationFormDTO;
import com.example.RegistrationLogin.Models.DTO.LoginFormDTO;
import com.example.RegistrationLogin.Models.User;
import com.example.RegistrationLogin.Repositories.UserRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUserFromSession(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@Valid @RequestBody RegistrationFormDTO registrationForm, HttpSession session) {
        // Check if passwords match
        if (!registrationForm.getPassword().equals(registrationForm.getVerifyPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        // Check if username already exists
        if (userRepository.findByUsername(registrationForm.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        // Create new user
        User user = new User();
        user.setUsername(registrationForm.getUsername());
        user.setPassword(passwordEncoder.encode(registrationForm.getPassword()));

        // Save user to database
        userRepository.save(user);

        // Set user in session
        session.setAttribute("user", user);

        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@Valid @RequestBody LoginFormDTO loginForm, HttpSession session) {
        // Find user by username
        User user = userRepository.findByUsername(loginForm.getUsername());

        // Check if user exists and password matches
        if (user != null && passwordEncoder.matches(loginForm.getPassword(), user.getPassword())) {
            // Set user in session
            session.setAttribute("user", user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpSession session) {
        session.invalidate(); // Invalidate session
        return ResponseEntity.ok("Logged out successfully");
    }
}



//User Endpoint (GET):
//
//URL: http://localhost:8080/user
//Method: GET
//Register Endpoint (POST):
//
//URL: http://localhost:8080/register
//Method: POST
//Login Endpoint (POST):
//
//URL: http://localhost:8080/login
//Method: POST