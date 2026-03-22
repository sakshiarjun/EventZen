package com.example.eventzen.dto;

import java.util.List;

public class BookingRequest {

    private Long userId;
    private Long eventId;
    private Integer attendeeCount;
    private String userName;
    private String eventName;

    private List<AttendeeDTO> attendees;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getEventId() { return eventId; }
    public void setEventId(Long eventId) { this.eventId = eventId; }

    public Integer getAttendeeCount() { return attendeeCount; }
    public void setAttendeeCount(Integer attendeeCount) { this.attendeeCount = attendeeCount; }

    public List<AttendeeDTO> getAttendees() { return attendees; }
    public void setAttendees(List<AttendeeDTO> attendees) { this.attendees = attendees; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getEventName() { return eventName; }
    public void setEventName(String eventName) { this.eventName = eventName; }
}