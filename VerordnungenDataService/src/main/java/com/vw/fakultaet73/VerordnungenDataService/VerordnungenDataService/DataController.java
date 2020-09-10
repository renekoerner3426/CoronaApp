package com.vw.fakultaet73.VerordnungenDataService.VerordnungenDataService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

@RestController
public class DataController {

    @Autowired
    private CSVReader csvReader;

    @GetMapping("/decrees")
	@ResponseStatus(HttpStatus.OK)
	public  List<DecreeEntity> getDecrees() {
    	System.out.println("111111111111111111111111" + csvReader.getDecreesList());
		return csvReader.getDecreesList();
	}
}
