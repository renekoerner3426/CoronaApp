package com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService.entitites.DecreeEntity;
import com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService.services.ExportService;
import com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService.services.ImportService;

@SpringBootApplication
@RestController
public class VerordnungenImportServiceApplication {
	@Autowired
	ExportService exportService;
	
	@Autowired
	ImportService importService;

	public static void main(String[] args) {
		SpringApplication.run(VerordnungenImportServiceApplication.class, args);
	}
	
	@CrossOrigin("*")
	@PostMapping("/newDecree")
	@ResponseStatus(HttpStatus.OK)
	public  DecreeEntity getDecrees(@RequestBody DecreeEntity decreeEntity) {
		return importService.addNewDecree(decreeEntity);
	}
	
	@CrossOrigin("*")
	@GetMapping("/decrees")
	@ResponseStatus(HttpStatus.OK)
	public List<DecreeEntity> getDecrees() {
		return exportService.getDecreeList();
	}
	
}
