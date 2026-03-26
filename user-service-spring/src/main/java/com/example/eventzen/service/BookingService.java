package com.example.eventzen.service;

import com.example.eventzen.dto.*;
import com.example.eventzen.entity.*;
import com.example.eventzen.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service

public class BookingService {

    private RestTemplate restTemplate = new RestTemplate();

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

        booking.setStatus(0);
        booking.setActive(true);

        Booking saved =
                bookingRepository.save(booking);

        // save attendees

        for (AttendeeDTO dto : req.getAttendees()) {

            Attendee a = new Attendee();

            a.setBookingId(saved.getId());
            a.setUserId(req.getUserId());
            a.setEventId(req.getEventId());
            a.setBooked_by(req.getUserName());
            a.setEvent_name(req.getEventName());


            a.setName(dto.getName());
            a.setEmail(dto.getEmail());
            a.setPhone(dto.getPhone());

            a.setStatus(0);
            a.setActive(true);

            a.setCreatedAt(
                new Timestamp(System.currentTimeMillis())
            );

            attendeeRepository.save(a);
        }

        return saved;
    }

    @Value("${node.url}")
    private String nodeUrl;
    public List<BookingResponse> getAllBookings() {

        List<Booking> bookings = bookingRepository.findAll();

        List<BookingResponse> list = new ArrayList<>();

        for (Booking b : bookings) {

        BookingResponse r = new BookingResponse();

        r.setBooking(b);

        List<Attendee> atts =
                attendeeRepository.findByBookingId(b.getId());

        r.setAttendees(atts);

        // ✅ call Node service

        try {

            String url = nodeUrl + "/events/" + b.getEventId();

            Object event =
                restTemplate.getForObject(url, Object.class);

            r.setEvent(event);

        } catch (Exception e) {

            System.out.println(
                "Event fetch failed for id "
                + b.getEventId()
            );

        }

        list.add(r);
    }

    return list;
}

    public Booking updateStatus(
        Long id,
        Integer status) {

    Booking b =
        bookingRepository
            .findById(id)
            .orElseThrow();

    b.setStatus(status);

    return bookingRepository.save(b);
}
}