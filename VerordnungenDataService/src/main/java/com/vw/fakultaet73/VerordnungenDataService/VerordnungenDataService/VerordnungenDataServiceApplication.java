package com.vw.fakultaet73.VerordnungenDataService.VerordnungenDataService;

import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
@RestController
public class VerordnungenDataServiceApplication {
	private static VerordnungenDataServiceApplication host;
	private CSVReader csvReader;
	
	public static void main(String[] args) {
		SpringApplication.run(VerordnungenDataServiceApplication.class, args);
		
		host = new VerordnungenDataServiceApplication();
		host.csvReader = new CSVReader();
	}
	
	@GetMapping("/decrees")
	@ResponseStatus(HttpStatus.OK)
	public  List<String[]> getDecrees() {
		System.out.println(host.csvReader.readFromCSV());
		return host.csvReader.readFromCSV();
	}

}
