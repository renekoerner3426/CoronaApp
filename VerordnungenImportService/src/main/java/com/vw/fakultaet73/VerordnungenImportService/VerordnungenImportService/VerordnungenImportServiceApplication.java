package com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService.entitites.DecreeEntity;
import com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService.repositories.DecreeEntityRepository;

@SpringBootApplication
@RestController
public class VerordnungenImportServiceApplication {
	@Autowired
	DecreeEntityRepository decreeEntityRepository;

	public static void main(String[] args) {
		SpringApplication.run(VerordnungenImportServiceApplication.class, args);
	}
	
	@PostMapping("/newDecree")
	@ResponseStatus(HttpStatus.OK)
	public  DecreeEntity getDecrees(@RequestBody DecreeEntity decreeEntity) {
		return decreeEntityRepository.save(decreeEntity);
	}
	
}
