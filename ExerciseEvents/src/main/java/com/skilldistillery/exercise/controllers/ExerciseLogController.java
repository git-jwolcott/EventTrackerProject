package com.skilldistillery.exercise.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.exercise.services.ExerciseLogService;

@RequestMapping("api")
@RestController
public class ExerciseLogController {
	
	@Autowired
	private ExerciseLogService eventSvc;
	
	@GetMapping("ping")
	public String ping() {
		return "pong";
	}

}
