package com.skilldistillery.exercise.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.exercise.entities.ExerciseLog;

public interface ExerciseLogRepository extends JpaRepository<ExerciseLog, Integer> {
	


}
