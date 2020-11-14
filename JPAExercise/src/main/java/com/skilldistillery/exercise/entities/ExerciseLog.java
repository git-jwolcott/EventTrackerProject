package com.skilldistillery.exercise.entities;

import java.sql.Time;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ExerciseLog {
	//Fields
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String type;
	private Date date;
	
	@Column(name="start_time")
	private Time startTime;
	@Column(name="end_time")
	private Time endTime;
	private Double latitude;
	private Double longitude;
	@Column(name="calories_burned")
	private Integer caloriesBurned;
	private Double distance;
	@Column(name="average_pace")
	private Time averagePace;
	@Column(name="elevation_gain")
	private Integer elevationGain;
	
	//Constructors
	public ExerciseLog() {
		super();
	}

	//Get/Set Methods
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Time getStartTime() {
		return startTime;
	}

	public void setStartTime(Time startTime) {
		this.startTime = startTime;
	}

	public Time getEndTime() {
		return endTime;
	}

	public void setEndTime(Time endTime) {
		this.endTime = endTime;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public Integer getCaloriesBurned() {
		return caloriesBurned;
	}

	public void setCaloriesBurned(Integer caloriesBurned) {
		this.caloriesBurned = caloriesBurned;
	}

	public Double getDistance() {
		return distance;
	}

	public void setDistance(Double distance) {
		this.distance = distance;
	}

	public Time getAveragePace() {
		return averagePace;
	}

	public void setAveragePace(Time averagePace) {
		this.averagePace = averagePace;
	}

	public Integer getElevationGain() {
		return elevationGain;
	}

	public void setElevationGain(Integer elevationGain) {
		this.elevationGain = elevationGain;
	}

//Other Methods
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ExerciseLog other = (ExerciseLog) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("ExerciseLog [id=");
		builder.append(id);
		builder.append(", type=");
		builder.append(type);
		builder.append(", date=");
		builder.append(date);
		builder.append(", startTime=");
		builder.append(startTime);
		builder.append(", endTime=");
		builder.append(endTime);
		builder.append(", latitude=");
		builder.append(latitude);
		builder.append(", longitude=");
		builder.append(longitude);
		builder.append(", caloriesBurned=");
		builder.append(caloriesBurned);
		builder.append(", distance=");
		builder.append(distance);
		builder.append(", averagePace=");
		builder.append(averagePace);
		builder.append(", elevationGain=");
		builder.append(elevationGain);
		builder.append("]");
		return builder.toString();
	}

	}
