package com.example.eventzen.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;  

import java.util.List;

import com.example.eventzen.repository.AttendeeRepository;
import com.example.eventzen.entity.Attendee;

@Service
public class AttendeeService {

    @Autowired
    private AttendeeRepository attendeeRepository;

    public List<Attendee> getAttendeesByBookingId(Long bookingId) {
        return attendeeRepository.findByBookingId(bookingId);
    }

    public Attendee saveAttendee(Attendee attendee) {
        return attendeeRepository.save(attendee);
    }

    public Attendee updateStatus(
            Long id,
            int status
    ) {

        Attendee a =
            attendeeRepository.findById(id).orElseThrow();

        a.setStatus(status);

        return attendeeRepository.save(a);
    }

    public Attendee deactivate(Long id) {

        Attendee a =
            attendeeRepository.findById(id).orElseThrow();

        a.setActive(false);

        return attendeeRepository.save(a);
    }
    
}
