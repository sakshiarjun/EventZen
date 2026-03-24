package com.example.eventzen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.eventzen.service.AttendeeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.eventzen.entity.Attendee;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/attendees")
public class AttendeeController {
    @Autowired
    private AttendeeService attendeeService;
    
    @GetMapping("/{id}")
    public List<Attendee> getAttendeesByBookingId(@PathVariable Long id) {
        return attendeeService.getAttendeesByBookingId(id);
    }

    @PostMapping
    public Attendee saveAttendee(@RequestBody Attendee attendee) {
        return attendeeService.saveAttendee(attendee);
    }

    @PutMapping("/{id}")
public Attendee updateStatus(
        @PathVariable Long id,
        @RequestBody Map<String, Object> body
) {

    Integer status =
        (Integer) body.get("status");

    return attendeeService.updateStatus(id, status);
}

    @PutMapping("/deactivate/{id}")
    public Attendee deactivate(@PathVariable Long id) {
        return attendeeService.deactivate(id);
    }

}
