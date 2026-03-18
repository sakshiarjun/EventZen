package com.example.eventzen.repository;

import com.example.eventzen.entity.Attendee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendeeRepository
        extends JpaRepository<Attendee, Long> {

    List<Attendee> findByBookingId(Long bookingId);

}