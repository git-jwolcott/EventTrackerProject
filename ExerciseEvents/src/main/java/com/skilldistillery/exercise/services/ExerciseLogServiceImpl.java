package com.skilldistillery.exercise.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.exercise.entities.ExerciseLog;
import com.skilldistillery.exercise.repositories.ExerciseLogRepository;


@Service
public class ExerciseLogServiceImpl implements ExerciseLogService {
	
	@Autowired
	private ExerciseLogRepository repo;

	@Override
	public List<ExerciseLog> index() {
		List<ExerciseLog> logs = repo.findAll();
		return logs;
	}

	@Override
	public ExerciseLog findById(Integer logId) {
		Optional<ExerciseLog> logOpt = repo.findById(logId);
		ExerciseLog log = null;
		if(logOpt.isPresent()) {
			log = logOpt.get();
		}
		return log;
	}

	@Override
	public ExerciseLog createExerciseLog(ExerciseLog log) {
		log.setEnabled(1);
		repo.saveAndFlush(log);
		return log;
	}

	@Override
	public ExerciseLog updateExerciseLog(Integer logId, ExerciseLog exerciseLog) {
		Optional<ExerciseLog> logOpt = repo.findById(logId);
		ExerciseLog log = null;
		if(logOpt.isPresent()) {
			log = logOpt.get();
			if(exerciseLog.getAveragePace() != null) {
			log.setAveragePace(exerciseLog.getAveragePace());
			}
			if(exerciseLog.getCaloriesBurned() != null) {
				log.setCaloriesBurned(exerciseLog.getCaloriesBurned());
			}
			if(exerciseLog.getDate() != null) {
			log.setDate(exerciseLog.getDate());
			}
			if(exerciseLog.getDistance() != null) {
			log.setDistance(exerciseLog.getDistance());
			}
			if(exerciseLog.getElevationGain() != null) {
				log.setElevationGain(exerciseLog.getElevationGain());
			}
			if(exerciseLog.getEndTime() != null) {
				log.setEndTime(exerciseLog.getEndTime());
			}
			if(exerciseLog.getLatitude() != null) {
			log.setLatitude(exerciseLog.getLatitude());
			}
			if(exerciseLog.getLongitude() != null) {
			log.setLongitude(exerciseLog.getLongitude());
			}
			if(exerciseLog.getStartTime() != null) {
			log.setStartTime(exerciseLog.getStartTime());
			}
			if(exerciseLog.getType() != null) {
			log.setType(exerciseLog.getType());
			}
		}
		repo.saveAndFlush(log);
		return log;
	}

	@Override
	public boolean exerciseLogDeleted(Integer logId) {
		boolean deleted = false;
		Optional<ExerciseLog> logOpt = repo.findById(logId);
		ExerciseLog log = null;
		if(logOpt.isPresent()) {
			log = logOpt.get();
			log.setEnabled(0);
			deleted = true;
		}
		repo.saveAndFlush(log);
		return deleted;
	}
	
}