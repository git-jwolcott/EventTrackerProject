package com.skilldistillery.exercise.services;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;

import com.skilldistillery.exercise.entities.ExerciseLog;
import com.skilldistillery.exercise.repositories.ExerciseLogRepository;


@Service
public class ExerciseLogServiceImpl implements ExerciseLogService {
	
	@Autowired
	private ExerciseLogRepository repo;
	
	@Override
	public List<ExerciseLog> getList() {
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
		if(log.getCaloriesBurned() == null) {
			log.setCaloriesBurned(0);
		}
		if(log.getElevationGain() == null) {
			log.setElevationGain(0);
		}
		if(log.getLatitude() == null) {
			log.setLatitude(0.0);
		}
		if(log.getLongitude() == null) {
			log.setLongitude(0.0);
		}
		repo.saveAndFlush(log);
		return log;
	}

	@Override
	public ExerciseLog updateExerciseLog(Integer logId, ExerciseLog exerciseLog) {
		Optional<ExerciseLog> logOpt = repo.findById(logId);
		ExerciseLog log = null;
		if(logOpt.isPresent()) {
			log = logOpt.get();
	
			LocalDateTime startTime = log.getStartTime();
			LocalDateTime endTime = log.getEndTime();
			Integer duration = (int) Duration.between(startTime, endTime).toMillis()/1000;
			Double pace = (double) Math.round((duration/log.getDistance()/60)*100)/100;
			log.setDuration(duration);
			log.setPace(pace);
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
			if(exerciseLog.getTitle() != null) {
				log.setTitle(exerciseLog.getTitle());
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
