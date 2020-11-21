package com.skilldistillery.exercise.controllers;

import static org.springframework.test.web.client.match.MockRestRequestMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.ResultMatcher;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skilldistillery.exercise.entities.ExerciseLog;
import com.skilldistillery.exercise.services.ExerciseLogServiceImpl;

@ExtendWith(SpringExtension.class)
@WebMvcTest
class ExerciseControllerTest {
	
	private final static String URI = "api";
	
	@Autowired
	private MockMvc mockMVC;
	
	@MockBean
	private ExerciseLogServiceImpl exerciseServiceImpl;
	private static List<ExerciseLog> logs;
	private static ExerciseLog exLog;
	
	private static ObjectMapper mapper = new ObjectMapper();

	@BeforeEach
	static void setUp() throws Exception {
		logs = new ArrayList<>();
		exLog = new ExerciseLog();
		exLog.setId(2);
		exLog.setType("biking");
		logs.add(exLog);
		
		Optional<ExerciseLog> logOpt = Optional.of(exLog);
	}
	
	@AfterEach
	void tearDown() throws Exception {
		exLog = null;
		logs = null;
	}
	@Test
	@DisplayName("test get pong")
	void test() {
		try {
			mockMVC.perform(get("pong")).andExpect((ResultMatcher) ((ResultActions) status().isOk()).andExpect((ResultMatcher) jsonPath("$", Matchers.hasToString("pong"))));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test
	@DisplayName("test get index()")
	void test1() {
		Mockito.when(exerciseServiceImpl.index()).thenReturn(logs);
		try {
			mockMVC.perform(get("logs")).andExpect(status().isOk()).andExpect((ResultMatcher) jsonPath("$", Matchers.hasSize(1))).andExpect((ResultMatcher) jsonPath("[0].type", Matchers.equalTo("biking")));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
//	@Test
//	@DisplayName("test get by ID")
//	void test2() {
//		Mockito.when(exerciseServiceImpl.findById(2).thenReturn(exLog));
//		mockMVC.perform(get("logs/{logId}")).andExpect(status().isOk()).andExpect((ResultMatcher) jsonPath("$.id", Matchers.equalTo(2))).andExpect((ResultMatcher) jsonPath("[0].type", Matchers.equalTo("biking")));
//	}

}
