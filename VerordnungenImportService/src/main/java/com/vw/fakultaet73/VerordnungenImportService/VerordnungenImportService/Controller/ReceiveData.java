package com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService.Controller;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService.entitites.DecreeEntity;
import com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService.services.ImportService;



@RestController
public class ReceiveData {
	
	@Autowired
	private ImportService importService;
	
	private final String GET_URL = "http://dataservice:8080/decrees";
	
	
	@CrossOrigin("*")
	@GetMapping("/maches")
	@ResponseStatus(HttpStatus.OK)
	public List<DecreeEntity> saveList() {
			return this.importService.saveDecrees((parse()));
	}
	
	private List<DecreeEntity> parse() {
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
		DecreeEntity[] response = restTemplate.getForObject(this.GET_URL,DecreeEntity[].class);
		List<DecreeEntity> decreesList = new ArrayList<>();
		for (DecreeEntity decreeEntity : response) {
			decreesList.add(decreeEntity);
		}
		return decreesList;
	}
	
}
