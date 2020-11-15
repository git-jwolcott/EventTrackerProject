package com.skilldistillery.exercise.services;

import java.util.List;

import com.skilldistillery.exercise.entities.ExerciseLog;



public interface ExerciseLogService {
	List<ExerciseLog> index();
	ExerciseLog findById(Integer logId);
	ExerciseLog createExerciseLog(ExerciseLog log);
	ExerciseLog updateExerciseLog(Integer logId, ExerciseLog log);
	boolean exerciseLogDeleted(Integer logId);
}
