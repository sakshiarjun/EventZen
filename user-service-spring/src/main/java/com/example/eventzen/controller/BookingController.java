package com.example.eventzen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.eventzen.service.BookingService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.eventzen.dto.BookingRequest;
import com.example.eventzen.dto.BookingResponse;
import com.example.eventzen.entity.Booking;
import java.util.List;
import com.example.eventzen.repository.BookingRepository;
 

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    
    @Autowired
    private BookingService bookingService;

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping
    public Booking createBooking(@RequestBody BookingRequest booking) {
        return bookingService.createBooking(booking);
    }

    @GetMapping
    public List<BookingResponse> getAll() {

        return bookingService.getAllBookings();
    }

    @PutMapping("/{id}")
    public Booking updateStatus(
        @PathVariable Long id,
        @RequestBody Booking b) {

    return bookingService.updateStatus(id, b.getStatus());
}
}
