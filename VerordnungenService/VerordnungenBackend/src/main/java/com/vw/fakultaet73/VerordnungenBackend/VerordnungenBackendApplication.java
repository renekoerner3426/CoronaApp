package com.vw.fakultaet73.VerordnungenBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@EnableScheduling
public class VerordnungenBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(VerordnungenBackendApplication.class, args);
	}
}
