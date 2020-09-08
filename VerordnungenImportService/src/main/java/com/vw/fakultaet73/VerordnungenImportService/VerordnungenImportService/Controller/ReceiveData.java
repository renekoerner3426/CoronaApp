package com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService.Controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
	
	private List<String[]> getData() throws IOException {

			List<String[]> dataList = new ArrayList<>();
			StringBuilder result = new StringBuilder();
			URL url = new URL(GET_URL);
		    URLConnection conn = url.openConnection(); 
	     
	      BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
	      String line;

	      while ((line = rd.readLine()) != null) {
			 result.append(line);
		  }
		  
	     String[] decreeAsWeirdString = seperateData(result);
	     for (String string : decreeAsWeirdString) {
			 	dataList.add(createGoodDecreeString(string));
		}
	      rd.close();
	      return dataList;
	}

	private String[] seperateData(StringBuilder result) {
		return result.toString().split(",");
	}

	private String[] createGoodDecreeString(String string) {
		string = string.replace("[", "");
		string = string.replace("]", "");
		string = string.replace("\"", "");
		String [] decree = string.split(";");
		return decree;
	}
	
	private List<DecreeEntity> getList(List<String[]> list) {
		List<DecreeEntity> decreeList = new ArrayList<>();
		for (String[] string : list) {
			decreeList.add(new DecreeEntity(0L,string[2], string[1], string[3]));
		}
		return decreeList;
	}
	
	@GetMapping("/maches")
	@ResponseStatus(HttpStatus.OK)
	public void saveList() {
		try {
			this.importService.saveDecrees(getList(getData()));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
