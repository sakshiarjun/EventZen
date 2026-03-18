package com.example.eventzen.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.eventzen.repository.BookingRepository;
import com.example.eventzen.entity.Booking;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    
    public Booking createBooking(Booking booking) {
        booking.setActive(true);
        booking.setStatus(1);
        return bookingRepository.save(booking);
    }

    public Iterable<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
