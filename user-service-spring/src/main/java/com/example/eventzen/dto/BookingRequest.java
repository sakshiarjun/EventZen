package com.example.eventzen.dto;

import java.util.List;

public class BookingRequest {

    private Long userId;
    private Long eventId;
    private Integer attendeeCount;

    private List<AttendeeDTO> attendees;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getEventId() { return eventId; }
    public void setEventId(Long eventId) { this.eventId = eventId; }

    public Integer getAttendeeCount() { return attendeeCount; }
    public void setAttendeeCount(Integer attendeeCount) { this.attendeeCount = attendeeCount; }

    public List<AttendeeDTO> getAttendees() { return attendees; }
    public void setAttendees(List<AttendeeDTO> attendees) { this.attendees = attendees; }
}