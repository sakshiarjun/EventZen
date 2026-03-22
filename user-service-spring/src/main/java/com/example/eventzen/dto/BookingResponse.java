package com.example.eventzen.dto;

import com.example.eventzen.entity.Attendee;
import com.example.eventzen.entity.Booking;

import java.util.List;

public class BookingResponse {

    private Booking booking;
    private List<Attendee> attendees;
    private Object event; 

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public List<Attendee> getAttendees() {
        return attendees;
    }

    public void setAttendees(List<Attendee> attendees) {
        this.attendees = attendees;
    }

    public Object getEvent() {
    return event;
}

    public void setEvent(Object event) {
    this.event = event;
}
}
