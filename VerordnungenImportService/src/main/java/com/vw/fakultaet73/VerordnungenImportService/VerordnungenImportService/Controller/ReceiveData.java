package com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService.Controller;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService.entitites.DecreeEntity;
import com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService.services.ImportService;


@EnableScheduling
@RestController
public class ReceiveData {
	
	@Autowired
	private ImportService importService;
	
	private final String GET_URL = "http://dataservice:8080/decrees";
	
	@CrossOrigin("*")
	@GetMapping("/maches/{state}")
	@ResponseStatus(HttpStatus.OK)
	public List<DecreeEntity> saveList(@PathVariable String state) {
			return this.importService.saveDecrees((parse(state)));
	}
	
	
	private List<DecreeEntity> parse(String state) {
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
		DecreeEntity[] response;
		if(state.length() == 0 || state == null) {
			response = restTemplate.getForObject(this.GET_URL,DecreeEntity[].class);
		} else {
			String URL = this.GET_URL + "/" + state;
			response = restTemplate.getForObject(URL,DecreeEntity[].class);
		}
		
		List<DecreeEntity> decreesList = new ArrayList<>();
		for (DecreeEntity decreeEntity : response) {
			decreesList.add(decreeEntity);
		}
		return decreesList;
	}
	
}
