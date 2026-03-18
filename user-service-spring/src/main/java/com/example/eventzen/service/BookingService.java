package com.example.eventzen.service;

import com.example.eventzen.dto.*;
import com.example.eventzen.entity.*;
import com.example.eventzen.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private AttendeeRepository attendeeRepository;

    public Booking createBooking(BookingRequest req) {

        // save booking

        Booking booking = new Booking();

        booking.setUserId(req.getUserId());
        booking.setEventId(req.getEventId());
        booking.setAttendeeCount(req.getAttendeeCount());

        booking.setStatus(1);
        booking.setActive(true);

        Booking saved =
                bookingRepository.save(booking);

        // save attendees

        for (AttendeeDTO dto : req.getAttendees()) {

            Attendee a = new Attendee();

            a.setBookingId(saved.getId());
            a.setUserId(req.getUserId());
            a.setEventId(req.getEventId());

            a.setName(dto.getName());
            a.setEmail(dto.getEmail());
            a.setPhone(dto.getPhone());

            a.setStatus(1);
            a.setActive(true);

            a.setCreatedAt(
                new Timestamp(System.currentTimeMillis())
            );

            attendeeRepository.save(a);
        }

        return saved;
    }

    public List<BookingResponse> getAllBookings() {

    List<Booking> bookings =
            bookingRepository.findAll();

    List<BookingResponse> list =
            new ArrayList<>();

    for (Booking b : bookings) {

        BookingResponse r =
                new BookingResponse();

        r.setBooking(b);

        List<Attendee> atts =
                attendeeRepository
                        .findByBookingId(b.getId());

        r.setAttendees(atts);

        list.add(r);
    }

    return list;
}
}