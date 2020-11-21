package com.skilldistillery.exercise.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.exercise.entities.ExerciseLog;
import com.skilldistillery.exercise.services.ExerciseLogService;

@RequestMapping("api")
@RestController
public class ExerciseLogController {
	
	@Autowired
	private ExerciseLogService logSvc;
	
	@GetMapping("ping")
	public String ping() {
		return "pong";
	}
	
	@GetMapping("logs")
	public List<ExerciseLog> index(){
		return logSvc.index();
	}

	@GetMapping("logs/{logId}")
	public ExerciseLog show(@PathVariable Integer logId, HttpServletResponse response) {
		ExerciseLog log = logSvc.findById(logId);
		if(log == null) {
			response.setStatus(404);
		}
		return log;
	}
	
	@PostMapping("logs")
	public ExerciseLog createExerciseLog(@RequestBody ExerciseLog log, HttpServletResponse response, HttpServletRequest request) {
		try {
			if(log.getTitle() == "" || log.getStartTime().toString() == "" || log.getEndTime().toString() == "" || log.getDuration() < 0) {
				response.setStatus(400);
				log = null;
			}
			log = logSvc.createExerciseLog(log);
			if(log == null) {
				response.setStatus(404);
			} else {
				StringBuffer url = request.getRequestURL();
				url.append("/").append(log.getId());
				String urlstr = url.toString();
				response.setStatus(201);
				response.setHeader("Location", urlstr);
			}
		} catch (Exception e) {
			response.setStatus(400);
			log = null;
		}
		return log;
	}
	
	@PutMapping("logs/{logId}")
	public ExerciseLog updateLog(@PathVariable Integer logId, @RequestBody ExerciseLog exerciseLog, HttpServletResponse response) {
		try {
			exerciseLog = logSvc.updateExerciseLog(logId, exerciseLog);
			if(exerciseLog == null) {
				response.setStatus(404);
			}
		} catch (Exception e) {
			response.setStatus(400);
			exerciseLog = null;
		}
		return exerciseLog;
	}
	
	@DeleteMapping("logs/{logId}")
	public void delete(@PathVariable Integer logId, HttpServletResponse response) {
		try {
			if(logSvc.exerciseLogDeleted(logId)) {
				response.setStatus(204);
			} else {
				response.setStatus(404);
			}
		} catch (Exception e) {
			response.setStatus(400);
		}
	}
}
