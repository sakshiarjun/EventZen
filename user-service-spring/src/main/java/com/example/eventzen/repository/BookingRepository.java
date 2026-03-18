package com.example.eventzen.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.eventzen.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

}
