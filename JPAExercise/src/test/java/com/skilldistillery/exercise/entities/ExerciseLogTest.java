package com.skilldistillery.exercise.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ExerciseLogTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private ExerciseLog log;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("ExercisePU");
		
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		log = em.find(ExerciseLog.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		log = null;
	}

	@Test
	@DisplayName("testing run entity")
	void test() {
		assertNotNull(log);
		assertEquals("hiking", log.getType());
		assertEquals(2020, log.getDate().getYear());
		assertEquals(01, log.getDate().getMonthValue());
		assertEquals(4, log.getDate().getDayOfMonth());
		assertEquals(11, log.getStartTime().getHour());
		assertEquals(16, log.getStartTime().getMinute());
		assertEquals(13, log.getEndTime().getHour());
		assertEquals(37, log.getEndTime().getMinute());
		assertEquals(0, log.getAveragePace().getHour());
		assertEquals(28, log.getAveragePace().getMinute());
		assertEquals(21, log.getAveragePace().getSecond());
		
	}

}
