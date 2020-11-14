package com.skilldistillery.exercise.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.exercise.entities.ExerciseLog;
import com.skilldistillery.exercise.repositories.ExerciseLogRepository;


@Service
public class ExerciseLogServiceImpl implements ExerciseLogService {
	
	@Autowired
	private ExerciseLogRepository repo;

	@Override
	public List<ExerciseLog> getAllEvents() {
		List<ExerciseLog> events = repo.findAll();
		return events;
	}
	
	

}
