package com.skilldistillery.exercise.services;

import java.time.Duration;
import java.time.LocalDateTime;
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
		
		LocalDateTime startTime = log.getStartTime();
		LocalDateTime endTime = log.getEndTime();
		Integer duration = (int) Duration.between(startTime, endTime).toMillis()/1000;
		Double pace = (double) Math.round((duration/log.getDistance()/60)*100)/100;
		log.setDuration(duration);
		log.setPace(pace);
		repo.saveAndFlush(log);
		return log;
	}

	@Override
	public ExerciseLog updateExerciseLog(Integer logId, ExerciseLog exerciseLog) {
		Optional<ExerciseLog> logOpt = repo.findById(logId);
		ExerciseLog log = null;
		if(logOpt.isPresent()) {
			log = logOpt.get();
	
			
			if(exerciseLog.getDuration() != null) {
			log.setDuration(exerciseLog.getDuration());
			}
			if(exerciseLog.getCaloriesBurned() != null) {
				log.setCaloriesBurned(exerciseLog.getCaloriesBurned());
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
