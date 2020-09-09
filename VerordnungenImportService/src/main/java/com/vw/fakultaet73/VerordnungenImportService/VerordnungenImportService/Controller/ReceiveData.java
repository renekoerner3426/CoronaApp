package com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService.Controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

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
	
	public List<DecreeEntity> parse() {
		Client client = ClientBuilder.newClient();
		Response response = client.target(GET_URL)
			.request(MediaType.APPLICATION_JSON)
			.get();
		return response.readEntity(new GenericType<List<DecreeEntity>>() {});

		
	}
}
