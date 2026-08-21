package com.lostfound.controller;

import com.lostfound.dto.MatchResultDTO;
import com.lostfound.service.MatchingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
public class MatchingController {

    private final MatchingService matchingService;

    public MatchingController(MatchingService matchingService) {
        this.matchingService = matchingService;
    }

    @GetMapping("/{lostItemId}")
    public ResponseEntity<List<MatchResultDTO>> getMatches(@PathVariable("lostItemId") String lostItemId) {
        return ResponseEntity.ok(matchingService.findMatches(lostItemId));
    }
}
