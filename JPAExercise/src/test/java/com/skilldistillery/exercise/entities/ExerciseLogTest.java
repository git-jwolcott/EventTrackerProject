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

import com.skilldistillery.exercise.entities.ExerciseLog;

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
		assertEquals("hiking", log);
	}

}
